import { deriveCodeTranslations } from "../code-i18n.js";
import { addNewWords } from "../glossary.js";
import { applyKoreanM10 } from "../m10-ko.js";
import { MISSING_ROLE } from "../course-accounts.js";

// The line that stops a script when .env lacks the account it signs with
const missingRole = (lang, role) =>
  `if (!process.env.${role}) throw new Error(${JSON.stringify((MISSING_ROLE[lang] ?? MISSING_ROLE.en)(role))});`;

const allLanguages = (value) => ({
  es: value,
  pt: value,
  en: value,
  jp: value,
  ko: value,
  zh: value,
});

const priceOracleLessonTitle = {
  es: "Price Oracle: fuentes de precios on-chain",
  pt: "Price Oracle: feeds de preço on-chain",
  en: "Price Oracle: On-Chain Price Feeds",
  jp: "Price Oracle：オンチェーン価格フィード",
  ko: "Price Oracle: 온체인 가격 피드",
  zh: "Price Oracle：链上价格源",
};

const priceOracleCodeTitles = {
  set: {
    es: "Crear o actualizar un feed de precios Oracle",
    pt: "Criar ou atualizar um feed de preço Oracle",
    en: "Create or update an Oracle price feed",
    jp: "Oracle価格フィードを作成または更新",
    ko: "Oracle 가격 피드 생성 또는 업데이트",
    zh: "创建或更新 Oracle 价格源",
  },
  query: {
    es: "Consultar precios agregados de varios Oracles",
    pt: "Consultar preços agregados de vários Oracles",
    en: "Query aggregate prices from several Oracles",
    jp: "複数Oracleの集約価格を照会",
    ko: "여러 Oracle의 집계 가격 조회",
    zh: "查询多个 Oracle 的聚合价格",
  },
  delete: {
    es: "Eliminar un feed de precios Oracle",
    pt: "Excluir um feed de preço Oracle",
    en: "Delete an Oracle price feed",
    jp: "Oracle価格フィードを削除",
    ko: "Oracle 가격 피드 삭제",
    zh: "删除 Oracle 价格源",
  },
};

const priceOracleTheory = {
  es: `Un **Price Oracle** es un objeto del ledger que permite a una cuenta publicar precios de activos directamente en Xahau. Las aplicaciones y los Hooks pueden leer esos precios desde el ledger, sin depender de un valor fijo en el código ni de un único servidor privado.

### ¿Qué problema resuelve?

Las aplicaciones DeFi necesitan precios para pares como XAH/USD, BTC/USD, token/USD, ratios de colateral, conversiones de recompensas o umbrales de liquidación. Un Price Oracle convierte esos datos externos de mercado en un dato on-chain que otra lógica puede inspeccionar.

La enmienda PriceOracle añade dos transacciones principales:

| Transacción | Propósito |
|---|---|
| \`OracleSet\` | Crear o actualizar un objeto Oracle del ledger |
| \`OracleDelete\` | Eliminar un objeto Oracle y liberar su reserva de propietario |

### Objeto Oracle

El objeto Oracle pertenece a la cuenta que envió \`OracleSet\`. La misma cuenta puede publicar varios documentos usando distintos valores de \`OracleDocumentID\`.

Campos clave:

| Campo | Descripción |
|---|---|
| \`Owner\` | Cuenta propietaria del objeto Oracle |
| \`OracleDocumentID\` | Identificador único dentro de esa cuenta |
| \`Provider\` | Nombre del proveedor codificado en hexadecimal |
| \`AssetClass\` | Categoría del activo codificada en hexadecimal, por ejemplo \`currency\` |
| \`LastUpdateTime\` | Marca temporal de la última actualización |
| \`PriceDataSeries\` | Lista de 1 a 10 pares de precio |
| \`URI\` | URI opcional en hexadecimal con contexto off-chain |

Cada entrada de \`PriceDataSeries\` incluye \`BaseAsset\`, \`QuoteAsset\`, \`AssetPrice\` y \`Scale\`. El precio real se interpreta como:

\`\`\`
AssetPrice * 10^(-Scale)
\`\`\`

Por ejemplo, \`AssetPrice: 74560\` y \`Scale: 4\` significa \`7.456\`.

### OracleSet y OracleDelete

\`OracleSet\` crea un Oracle nuevo o actualiza uno existente si se usa la misma cuenta y el mismo \`OracleDocumentID\`. Al crear, \`Provider\` y \`AssetClass\` son obligatorios; \`PriceDataSeries\` debe tener entre 1 y 10 entradas; \`BaseAsset\` y \`QuoteAsset\` deben ser distintos; \`Scale\` debe estar entre 0 y 10; y una actualización debe usar un \`LastUpdateTime\` más reciente. Si se omite \`AssetPrice\` para un par existente, ese par se elimina.

\`OracleDelete\` elimina el Oracle identificado por \`Account\` y \`OracleDocumentID\`. Solo puede hacerlo la cuenta propietaria, y al eliminarlo se libera la reserva de propietario.

### Reserva y agregación

Un Oracle consume 1 reserva de propietario si guarda entre 1 y 5 pares, y 2 reservas si guarda entre 6 y 10. En producción no conviene depender de un único proveedor: Xahau expone \`get_aggregate_price\` para consultar varias cuentas Oracle y documentos, y calcular valores como mediana y media. Las opciones \`trim\` y \`time_threshold\` ayudan a reducir valores extremos o feeds desactualizados.

### Errores comunes

- \`temDISABLED\`: la enmienda PriceOracle no está activa
- \`temMALFORMED\`: proveedor, clase de activo, escala o par base/cotización no válido
- \`temARRAY_EMPTY\`: no se enviaron pares de precio
- \`temARRAY_TOO_LARGE\`: se enviaron más de 10 pares
- \`tecINVALID_UPDATE_TIME\`: la marca temporal no es más reciente
- \`tecINSUFFICIENT_RESERVE\`: la cuenta no tiene reserva suficiente
- \`tecNO_ENTRY\`: el Oracle no existe al intentar eliminarlo

### Ejecutar los scripts de esta lección

Estos scripts firman con \`ORACLE_SEED\` de \`.env\`, que crea \`create-accounts.js\` ([módulo 3](?m=3&l=1)). Una cuenta aparte mantiene el objeto Oracle, y la reserva que bloquea, separados de tu cuenta principal. Si falta la variable, los scripts se detienen antes de enviar nada y dicen qué ejecutar.`,
  pt: `Um **Price Oracle** é um objeto do ledger que permite que uma conta publique preços de ativos diretamente na Xahau. Aplicações e Hooks podem ler esses preços do ledger, sem depender de um valor fixo no código nem de um único servidor privado.

### Que problema ele resolve?

Aplicações DeFi precisam de preços como XAH/USD, BTC/USD, token/USD, índices de colateral, conversões de recompensas e limites de liquidação. Um Price Oracle transforma esses dados externos de mercado em um dado on-chain que outras lógicas podem consultar.

A emenda PriceOracle adiciona duas transações principais:

| Transação | Objetivo |
|---|---|
| \`OracleSet\` | Criar ou atualizar um objeto Oracle do ledger |
| \`OracleDelete\` | Remover um objeto Oracle e liberar sua reserva de proprietário |

### Objeto Oracle

O objeto Oracle pertence à conta que enviou \`OracleSet\`. A mesma conta pode publicar vários documentos usando valores diferentes de \`OracleDocumentID\`.

Campos principais:

| Campo | Descrição |
|---|---|
| \`Owner\` | Conta dona do objeto Oracle |
| \`OracleDocumentID\` | ID único dentro dessa conta |
| \`Provider\` | Nome do provedor codificado em hexadecimal |
| \`AssetClass\` | Categoria do ativo em hexadecimal, como \`currency\` |
| \`LastUpdateTime\` | Timestamp da última atualização |
| \`PriceDataSeries\` | Lista de 1 a 10 pares de preço |
| \`URI\` | URI opcional em hexadecimal com contexto off-chain |

Cada item de \`PriceDataSeries\` inclui \`BaseAsset\`, \`QuoteAsset\`, \`AssetPrice\` e \`Scale\`. O preço real é interpretado assim:

\`\`\`
AssetPrice * 10^(-Scale)
\`\`\`

Por exemplo, \`AssetPrice: 74560\` e \`Scale: 4\` significa \`7.456\`.

### OracleSet e OracleDelete

\`OracleSet\` cria um novo Oracle ou atualiza um existente quando a mesma conta e o mesmo \`OracleDocumentID\` são usados. Ao criar, \`Provider\` e \`AssetClass\` são obrigatórios; \`PriceDataSeries\` deve ter entre 1 e 10 entradas; \`BaseAsset\` e \`QuoteAsset\` devem ser diferentes; \`Scale\` deve ficar entre 0 e 10; e uma atualização deve usar um \`LastUpdateTime\` mais recente. Se \`AssetPrice\` for omitido para um par existente, esse par é removido.

\`OracleDelete\` remove o Oracle identificado por \`Account\` e \`OracleDocumentID\`. Só a conta proprietária pode removê-lo, e a reserva de proprietário é liberada.

### Reserva e agregação

Um Oracle consome 1 reserva de proprietário quando armazena de 1 a 5 pares, e 2 reservas quando armazena de 6 a 10. Em produção, o ideal é consultar vários provedores: a Xahau expõe \`get_aggregate_price\` para passar contas Oracle e IDs de documentos e calcular valores como mediana e média. As opções \`trim\` e \`time_threshold\` ajudam a reduzir outliers ou feeds desatualizados.

### Erros comuns

- \`temDISABLED\`: a emenda PriceOracle não está ativa
- \`temMALFORMED\`: provedor, classe de ativo, escala ou par base/cotação inválido
- \`temARRAY_EMPTY\`: nenhum par de preço foi enviado
- \`temARRAY_TOO_LARGE\`: mais de 10 pares foram enviados
- \`tecINVALID_UPDATE_TIME\`: o timestamp não é mais recente
- \`tecINSUFFICIENT_RESERVE\`: a conta não tem reserva suficiente
- \`tecNO_ENTRY\`: o Oracle não existe ao tentar removê-lo

### Executar os scripts desta lição

Estes scripts assinam com \`ORACLE_SEED\` do \`.env\`, criada por \`create-accounts.js\` ([módulo 3](?m=3&l=1)). Uma conta separada mantém o objeto Oracle, e a reserva que ele bloqueia, longe da sua conta principal. Se a variável faltar, os scripts param antes de enviar e dizem o que executar.`,
  en: `A **Price Oracle** is a ledger object that lets an account publish asset prices directly on Xahau. Applications and Hooks can then read those prices from the ledger instead of trusting a hard-coded value or a single private server.

### What problem does it solve?

DeFi applications often need prices: XAH/USD, BTC/USD, token/USD, collateral ratios, reward conversions, liquidation thresholds, and more. A Price Oracle turns that external market data into an on-chain data point that other logic can inspect.

The PriceOracle amendment adds two main transaction types:

| Transaction | Purpose |
|---|---|
| \`OracleSet\` | Create or update an Oracle ledger object |
| \`OracleDelete\` | Delete an Oracle object and release its owner reserve |

### Oracle object

An Oracle object is owned by the account that submitted \`OracleSet\`. The same account can publish multiple oracle documents by using different \`OracleDocumentID\` values.

Key fields include \`Owner\`, \`OracleDocumentID\`, \`Provider\`, \`AssetClass\`, \`LastUpdateTime\`, \`PriceDataSeries\`, and optional \`URI\`.

Each \`PriceDataSeries\` entry includes \`BaseAsset\`, \`QuoteAsset\`, \`AssetPrice\`, and \`Scale\`. The real price is:

\`\`\`
AssetPrice * 10^(-Scale)
\`\`\`

For example, \`AssetPrice: 74560\` and \`Scale: 4\` means \`7.456\`.

### OracleSet and OracleDelete

\`OracleSet\` creates a new Oracle object if it does not exist yet, or updates an existing one if the same account and \`OracleDocumentID\` are used again. \`Provider\` and \`AssetClass\` are required when creating; \`PriceDataSeries\` must contain 1 to 10 entries; \`BaseAsset\` and \`QuoteAsset\` must be different; \`Scale\` must be between 0 and 10; and updates must use a newer \`LastUpdateTime\`. Omitting \`AssetPrice\` for an existing pair deletes that pair.

\`OracleDelete\` removes the Oracle object identified by \`Account\` and \`OracleDocumentID\`. Only the owner can delete it, and the owner reserve is released.

### Reserve and aggregation

Oracle objects consume 1 owner reserve for 1-5 price pairs, and 2 owner reserves for 6-10 pairs. Production systems usually query several providers and aggregate them. Xahau exposes \`get_aggregate_price\`, where you pass oracle accounts and document IDs, then the node computes values such as median and mean. \`trim\` and \`time_threshold\` help reduce outliers or stale feeds.

### Common errors

- \`temDISABLED\`: PriceOracle amendment is not enabled
- \`temMALFORMED\`: invalid provider, asset class, duplicate pair, invalid scale, or invalid base/quote combination
- \`temARRAY_EMPTY\`: no price pairs were provided
- \`temARRAY_TOO_LARGE\`: more than 10 price pairs were provided
- \`tecINVALID_UPDATE_TIME\`: update timestamp is invalid or not newer
- \`tecINSUFFICIENT_RESERVE\`: the account does not have enough reserve
- \`tecNO_ENTRY\`: the Oracle object does not exist when trying to delete it

### Run this lesson's scripts

These scripts sign with \`ORACLE_SEED\` from \`.env\`, created by \`create-accounts.js\` ([Module 3](?m=3&l=1)). A separate account keeps the Oracle object, and the reserve it locks, apart from your main account. If the variable is missing, the scripts stop before submitting and say what to run.`,
  jp: `**Price Oracle** は、アカウントが資産価格をXahau上へ直接公開できるledgerオブジェクトです。アプリケーションやHooksは、コードに固定された値や単一の非公開サーバーではなく、ledger上の価格を参照できます。

### 何を解決するのか？

DeFiアプリケーションでは、XAH/USD、BTC/USD、token/USD、担保比率、報酬換算、清算しきい値などの価格が必要になります。Price Oracleは外部マーケットデータを、他のロジックが検証できるオンチェーンデータに変換します。

PriceOracle amendmentは主に2つのトランザクションを追加します。

| トランザクション | 目的 |
|---|---|
| \`OracleSet\` | Oracle ledgerオブジェクトを作成または更新する |
| \`OracleDelete\` | Oracleオブジェクトを削除し、owner reserveを解放する |

### Oracleオブジェクト

Oracleオブジェクトは \`OracleSet\` を送信したアカウントが所有します。同じアカウントでも、異なる \`OracleDocumentID\` を使えば複数のOracleドキュメントを公開できます。

主なフィールドは \`Owner\`、\`OracleDocumentID\`、\`Provider\`、\`AssetClass\`、\`LastUpdateTime\`、\`PriceDataSeries\`、任意の \`URI\` です。

\`PriceDataSeries\` の各エントリには \`BaseAsset\`、\`QuoteAsset\`、\`AssetPrice\`、\`Scale\` が含まれます。実際の価格は次の式で解釈します。

\`\`\`
AssetPrice * 10^(-Scale)
\`\`\`

例：\`AssetPrice: 74560\`、\`Scale: 4\` は \`7.456\` を意味します。

### OracleSetとOracleDelete

\`OracleSet\` は、まだ存在しない場合は新しいOracleを作成し、同じアカウントと \`OracleDocumentID\` が使われた場合は既存のOracleを更新します。作成時には \`Provider\` と \`AssetClass\` が必須です。\`PriceDataSeries\` は1から10件、\`BaseAsset\` と \`QuoteAsset\` は別の値、\`Scale\` は0から10、更新時の \`LastUpdateTime\` は保存済みの値より新しい必要があります。既存ペアで \`AssetPrice\` を省略すると、そのペアは削除されます。

\`OracleDelete\` は \`Account\` と \`OracleDocumentID\` で特定されるOracleを削除します。削除できるのは所有者だけで、削除後にowner reserveが解放されます。

### 予約金と集約

Oracleは価格ペア1から5件でowner reserveを1つ、6から10件で2つ消費します。本番環境では複数プロバイダーを問い合わせて集約するのが一般的です。Xahauの \`get_aggregate_price\` はOracleアカウントとドキュメントIDを受け取り、中央値や平均値を計算できます。\`trim\` と \`time_threshold\` は外れ値や古いfeedの影響を減らします。

### よくあるエラー

- \`temDISABLED\`: PriceOracle amendmentが有効ではない
- \`temMALFORMED\`: provider、asset class、scale、base/quoteの組み合わせなどが不正
- \`temARRAY_EMPTY\`: 価格ペアが指定されていない
- \`temARRAY_TOO_LARGE\`: 価格ペアが10件を超えている
- \`tecINVALID_UPDATE_TIME\`: 更新時刻が新しくない
- \`tecINSUFFICIENT_RESERVE\`: 予約金が不足している
- \`tecNO_ENTRY\`: 削除対象のOracleが存在しない

### このレッスンのスクリプトを実行する

これらのスクリプトは、\`create-accounts.js\`（[モジュール3](?m=3&l=1)）が作成する \`.env\` の \`ORACLE_SEED\` で署名します。別のアカウントを使うことで、Oracle オブジェクトとそれがロックするリザーブをメインアカウントから切り離せます。変数がない場合、スクリプトは送信前に停止し、何を実行すべきかを表示します。`,
  ko: `**Price Oracle**는 계정이 자산 가격을 Xahau에 직접 게시할 수 있게 해 주는 ledger 객체입니다. 애플리케이션과 Hooks는 코드에 고정된 값이나 단일 사설 서버 대신 ledger의 가격을 읽을 수 있습니다.

### 어떤 문제를 해결하나요?

DeFi 애플리케이션은 XAH/USD, BTC/USD, token/USD, 담보 비율, 보상 환산, 청산 기준 같은 가격 정보가 필요합니다. Price Oracle은 외부 시장 데이터를 다른 로직이 확인할 수 있는 온체인 데이터로 바꿉니다.

PriceOracle amendment는 두 가지 주요 트랜잭션을 추가합니다.

| 트랜잭션 | 목적 |
|---|---|
| \`OracleSet\` | Oracle ledger 객체 생성 또는 업데이트 |
| \`OracleDelete\` | Oracle 객체 삭제 및 owner reserve 반환 |

### Oracle 객체

Oracle 객체는 \`OracleSet\` 을 제출한 계정이 소유합니다. 같은 계정도 서로 다른 \`OracleDocumentID\` 를 사용해 여러 Oracle 문서를 게시할 수 있습니다.

주요 필드는 \`Owner\`, \`OracleDocumentID\`, \`Provider\`, \`AssetClass\`, \`LastUpdateTime\`, \`PriceDataSeries\`, 선택 사항인 \`URI\` 입니다.

\`PriceDataSeries\` 의 각 항목에는 \`BaseAsset\`, \`QuoteAsset\`, \`AssetPrice\`, \`Scale\` 이 들어갑니다. 실제 가격은 다음처럼 해석합니다.

\`\`\`
AssetPrice * 10^(-Scale)
\`\`\`

예를 들어 \`AssetPrice: 74560\`, \`Scale: 4\` 는 \`7.456\` 을 의미합니다.

### OracleSet과 OracleDelete

\`OracleSet\` 은 Oracle이 없으면 새로 만들고, 같은 계정과 \`OracleDocumentID\` 를 다시 사용하면 기존 Oracle을 업데이트합니다. 생성 시 \`Provider\` 와 \`AssetClass\` 는 필수이고, \`PriceDataSeries\` 는 1개에서 10개 항목이어야 하며, \`BaseAsset\` 과 \`QuoteAsset\` 은 서로 달라야 합니다. \`Scale\` 은 0에서 10 사이이고, 업데이트의 \`LastUpdateTime\` 은 저장된 값보다 최신이어야 합니다. 기존 쌍에서 \`AssetPrice\` 를 생략하면 해당 쌍이 삭제됩니다.

\`OracleDelete\` 는 \`Account\` 와 \`OracleDocumentID\` 로 식별되는 Oracle을 삭제합니다. 소유자만 삭제할 수 있고, 삭제하면 owner reserve가 반환됩니다.

### 예치금과 집계

Oracle은 가격 쌍 1-5개에 owner reserve 1개, 6-10개에 owner reserve 2개를 사용합니다. 운영 환경에서는 보통 여러 제공자를 조회해 집계합니다. Xahau의 \`get_aggregate_price\` 는 Oracle 계정과 문서 ID 목록을 받아 중앙값과 평균 같은 값을 계산합니다. \`trim\` 과 \`time_threshold\` 는 이상치나 오래된 feed의 영향을 줄이는 데 도움이 됩니다.

### 흔한 오류

- \`temDISABLED\`: PriceOracle amendment가 활성화되지 않음
- \`temMALFORMED\`: provider, asset class, scale, base/quote 조합 등이 잘못됨
- \`temARRAY_EMPTY\`: 가격 쌍이 없음
- \`temARRAY_TOO_LARGE\`: 가격 쌍이 10개를 초과함
- \`tecINVALID_UPDATE_TIME\`: 업데이트 시간이 더 최신이 아님
- \`tecINSUFFICIENT_RESERVE\`: reserve가 부족함
- \`tecNO_ENTRY\`: 삭제하려는 Oracle이 존재하지 않음

### 이 레슨의 스크립트 실행

이 스크립트들은 \`create-accounts.js\`([모듈 3](?m=3&l=1))가 만든 \`.env\`의 \`ORACLE_SEED\`로 서명합니다. 별도 계정을 쓰면 Oracle 객체와 그것이 묶는 준비금을 메인 계정과 분리할 수 있습니다. 변수가 없으면 스크립트는 제출 전에 멈추고 무엇을 실행해야 하는지 알려 줍니다.`,
  zh: `**Price Oracle** 是一种 ledger 对象，允许账户直接在 Xahau 上发布资产价格。应用和 Hooks 可以从 ledger 读取这些价格，而不必依赖代码里的固定值或单个私有服务器。

### 它解决什么问题？

DeFi 应用经常需要 XAH/USD、BTC/USD、token/USD、抵押率、奖励换算、清算阈值等价格。Price Oracle 会把外部市场数据变成其他逻辑可以检查的链上数据点。

PriceOracle amendment 增加了两种主要交易：

| 交易 | 用途 |
|---|---|
| \`OracleSet\` | 创建或更新 Oracle ledger 对象 |
| \`OracleDelete\` | 删除 Oracle 对象并释放 owner reserve |

### Oracle 对象

Oracle 对象由提交 \`OracleSet\` 的账户拥有。同一个账户可以使用不同的 \`OracleDocumentID\` 发布多个 Oracle 文档。

关键字段包括 \`Owner\`、\`OracleDocumentID\`、\`Provider\`、\`AssetClass\`、\`LastUpdateTime\`、\`PriceDataSeries\`，以及可选的 \`URI\`。

\`PriceDataSeries\` 的每个条目包含 \`BaseAsset\`、\`QuoteAsset\`、\`AssetPrice\` 和 \`Scale\`。真实价格按下面的公式解释：

\`\`\`
AssetPrice * 10^(-Scale)
\`\`\`

例如，\`AssetPrice: 74560\` 且 \`Scale: 4\` 表示 \`7.456\`。

### OracleSet 和 OracleDelete

\`OracleSet\` 会在 Oracle 不存在时创建新对象；如果再次使用同一账户和同一个 \`OracleDocumentID\`，则更新已有对象。创建时 \`Provider\` 和 \`AssetClass\` 必填；\`PriceDataSeries\` 必须有 1 到 10 个条目；\`BaseAsset\` 和 \`QuoteAsset\` 必须不同；\`Scale\` 必须在 0 到 10 之间；更新时 \`LastUpdateTime\` 必须比已存值更新。如果对已有价格对省略 \`AssetPrice\`，该价格对会被删除。

\`OracleDelete\` 删除由 \`Account\` 和 \`OracleDocumentID\` 标识的 Oracle。只有所有者可以删除，删除后会释放 owner reserve。

### Reserve 与聚合

Oracle 存储 1 到 5 个价格对时消耗 1 个 owner reserve，存储 6 到 10 个价格对时消耗 2 个。生产系统通常会查询多个提供者并聚合结果。Xahau 提供 \`get_aggregate_price\` RPC 方法，可以传入 Oracle 账户和文档 ID，然后由节点计算中位数、平均值等。\`trim\` 和 \`time_threshold\` 可以减少异常值或过期 feed 的影响。

### 常见错误

- \`temDISABLED\`: PriceOracle amendment 未启用
- \`temMALFORMED\`: provider、asset class、scale 或 base/quote 组合无效
- \`temARRAY_EMPTY\`: 没有提供价格对
- \`temARRAY_TOO_LARGE\`: 价格对超过 10 个
- \`tecINVALID_UPDATE_TIME\`: 更新时间不是更新的时间
- \`tecINSUFFICIENT_RESERVE\`: 账户 reserve 不足
- \`tecNO_ENTRY\`: 删除时 Oracle 对象不存在

### 运行本课的脚本

这些脚本使用 \`.env\` 中由 \`create-accounts.js\`（[模块3](?m=3&l=1)） 创建的 \`ORACLE_SEED\` 签名。使用单独的账户，可以让 Oracle 对象及其锁定的储备与主账户分开。缺少该变量时，脚本会在提交前停止，并说明应运行什么。`,
};

const iouRewardLessonTitle = {
  es: "IOURewardClaim: recompensas personalizadas para tokens",
  pt: "IOURewardClaim: recompensas personalizadas para tokens",
  en: "IOURewardClaim: Custom Token Rewards",
  jp: "IOURewardClaim：カスタムトークン報酬",
  ko: "IOURewardClaim: 맞춤형 토큰 보상",
  zh: "IOURewardClaim：自定义代币奖励",
};

const iouRewardCodeTitles = {
  trustline: {
    es: "Crear la TrustLine del holder necesaria para recompensas IOU",
    pt: "Criar a TrustLine do holder necessária para recompensas IOU",
    en: "Create the holder trustline required for IOU rewards",
    jp: "IOU報酬に必要なholderのTrustLineを作成",
    ko: "IOU 보상에 필요한 holder TrustLine 생성",
    zh: "创建 IOU 奖励所需的 holder TrustLine",
  },
  claim: {
    es: "Reclamar una recompensa IOU con ClaimReward y ClaimCurrency",
    pt: "Resgatar uma recompensa IOU com ClaimReward e ClaimCurrency",
    en: "Claim an IOU reward with ClaimReward + ClaimCurrency",
    jp: "ClaimRewardとClaimCurrencyでIOU報酬を請求",
    ko: "ClaimReward와 ClaimCurrency로 IOU 보상 청구",
    zh: "使用 ClaimReward 和 ClaimCurrency 领取 IOU 奖励",
  },
  inspect: {
    es: "Inspeccionar la TrustLine IOU del holder",
    pt: "Inspecionar a TrustLine IOU do holder",
    en: "Inspect the holder's IOU trustline",
    jp: "holderのIOU TrustLineを確認",
    ko: "holder의 IOU trustline 확인",
    zh: "检查 holder 的 IOU trustline",
  },
};

const iouRewardClaimTheory = {
  es: `La funcionalidad se llama **IOURewardClaim**, pero la transacción que se envía sigue siendo **ClaimReward**. La enmienda extiende \`ClaimReward\` para que los emisores de tokens puedan ejecutar programas de recompensas personalizados para holders de IOUs.

### ¿Qué problema resuelve?

Las recompensas nativas de XAH están ligadas a XAH y al sistema de recompensas génesis. IOURewardClaim lleva un mecanismo similar de seguimiento de recompensas a monedas emitidas: tokens de fidelización, recibos de staking, puntos DAO, IOUs con rendimiento o monedas de juego.

No existe \`TransactionType: "IOURewardClaim"\`. Se usa \`ClaimReward\` con \`ClaimCurrency\`. El campo \`Issuer\` apunta a la cuenta que ejecuta el Hook del programa de recompensas; \`ClaimCurrency.issuer\` apunta al emisor real del IOU.

En muchos programas intervienen tres cuentas:

| Cuenta | Rol |
|---|---|
| Emisor del token | Crea la moneda IOU |
| Emisor de recompensas / reserva | Tiene el Hook instalado y paga la recompensa |
| Holder | Mantiene el IOU y envía \`ClaimReward\` |

### Cómo funciona

El holder debe tener una trustline para el IOU. La cuenta de recompensas debe tener un Hook que se dispare con \`ClaimReward\`. En el primer claim, Xahau inicializa contadores de recompensa en el objeto \`RippleState\` de la trustline. A medida que cambia el balance, el ledger actualiza \`TrustLineRewardAccumulator\`. En claims posteriores, el ledger resetea los contadores y dispara el Hook del issuer. El Hook lee el valor acumulado y emite el pago real.

Esto separa el **seguimiento** de la **lógica de pago**: el ledger mide balance por tiempo; el Hook decide cuánto pagar, con qué token, cooldowns, límites y reglas de negocio.

### Requisitos y errores comunes

Necesitas la enmienda \`IOURewardClaim\` activa, una trustline entre \`Account\` y \`ClaimCurrency.issuer\`, un Hook instalado en \`Issuer\`, que ese Hook se dispare en \`ClaimReward\`, y \`ClaimCurrency\` no puede ser XAH. Errores habituales: \`temDISABLED\`, \`temMALFORMED\`, \`tecNO_ISSUER\`, \`tecNO_TARGET\` y \`tecNO_LINE\`.

### Ejecutar los scripts de esta lección

Estos scripts firman con \`HOLDER_SEED\` de \`.env\`, que crea \`create-accounts.js\` ([módulo 3](?m=3&l=1)). El holder solo necesita XAH para la reserva de la TrustLine y los fees; el emisor de RWD y el programa de recompensas son cuentas de testnet ya existentes. Si falta la variable, los scripts se detienen antes de enviar nada y dicen qué ejecutar.`,
  pt: `O recurso se chama **IOURewardClaim**, mas a transação enviada continua sendo **ClaimReward**. A emenda estende \`ClaimReward\` para que emissores de tokens possam criar programas de recompensa personalizados para holders de IOUs.

### Que problema ele resolve?

As recompensas nativas de XAH são ligadas ao XAH e ao sistema de recompensas genesis. IOURewardClaim leva um mecanismo parecido de rastreamento de recompensas para moedas emitidas: tokens de fidelidade, recibos de staking, pontos de DAO, IOUs com rendimento ou moedas de jogos.

Não existe \`TransactionType: "IOURewardClaim"\`. Você usa \`ClaimReward\` com \`ClaimCurrency\`. O campo \`Issuer\` aponta para a conta que executa o Hook do programa de recompensas; \`ClaimCurrency.issuer\` aponta para o emissor real do IOU.

Muitos programas usam três contas:

| Conta | Papel |
|---|---|
| Emissor do token | Cria a moeda IOU |
| Emissor de recompensas / reserva | Tem o Hook instalado e paga a recompensa |
| Holder | Mantém o IOU e envia \`ClaimReward\` |

### Como funciona

O holder precisa ter uma trustline para o IOU. A conta de recompensas precisa ter um Hook que dispare em \`ClaimReward\`. No primeiro claim, a Xahau inicializa contadores de recompensa no objeto \`RippleState\` da trustline. Conforme o saldo muda, o ledger atualiza \`TrustLineRewardAccumulator\`. Em claims posteriores, o ledger reinicia os contadores e dispara o Hook do issuer. O Hook lê o valor acumulado e emite o pagamento real.

Isso separa **rastreamento** de **lógica de pagamento**: o ledger mede saldo ao longo do tempo; o Hook decide quanto pagar, com qual token, cooldowns, limites e regras de negócio.

### Requisitos e erros comuns

Você precisa da emenda \`IOURewardClaim\` ativa, uma trustline entre \`Account\` e \`ClaimCurrency.issuer\`, um Hook instalado em \`Issuer\`, esse Hook disparando em \`ClaimReward\`, e \`ClaimCurrency\` não pode ser XAH. Erros comuns: \`temDISABLED\`, \`temMALFORMED\`, \`tecNO_ISSUER\`, \`tecNO_TARGET\` e \`tecNO_LINE\`.

### Executar os scripts desta lição

Estes scripts assinam com \`HOLDER_SEED\` do \`.env\`, criada por \`create-accounts.js\` ([módulo 3](?m=3&l=1)). O holder só precisa de XAH para a reserva da TrustLine e os fees; o emissor de RWD e o programa de recompensas são contas de testnet já existentes. Se a variável faltar, os scripts param antes de enviar e dizem o que executar.`,
  en: `The feature is called **IOURewardClaim**, but the transaction you submit is still **ClaimReward**. The amendment extends \`ClaimReward\` so token issuers can run custom reward programs for IOU holders.

### What problem does it solve?

Native XAH balance rewards are tied to XAH and the genesis reward system. IOURewardClaim brings a similar reward-tracking mechanism to issued currencies:

- Loyalty tokens
- Staking receipt tokens
- DAO participation points
- Yield-bearing IOUs
- Game or app reward currencies

Instead of building a separate off-chain tracker, the ledger stores reward counters on the trustline and the issuer's Hook decides what payout to send.

### Not a separate transaction type

There is no \`TransactionType: "IOURewardClaim"\`. You use:

\`\`\`json
{
  "TransactionType": "ClaimReward",
  "Account": "rHOLDER...",
  "Issuer": "rREWARD_PROGRAM...",
  "ClaimCurrency": {
    "currency": "RWD",
    "issuer": "rTOKEN_ISSUER..."
  }
}

\`\`\`

### Fields

| Field | Description |
|---|---|
| \`TransactionType\` | Always \`"ClaimReward"\` |
| \`Account\` | The holder claiming the reward |
| \`Issuer\` | The account running the reward program Hook |
| \`ClaimCurrency\` | The IOU currency being claimed for |

The \`Issuer\` field is easy to misunderstand. For IOU rewards, it is the account whose Hook should run. It can be the token issuer, but it can also be a separate reserve, treasury, or rewards account.

\`ClaimCurrency.issuer\` identifies the issuer of the IOU itself. In many reward systems, you use three accounts:

| Account | Role |
|---|---|
| Token issuer | Creates the IOU currency |
| Reward issuer / reserve | Holds reward supply and has the Hook installed |
| Holder | Holds the IOU and submits \`ClaimReward\` |

### How IOU rewards work

1. A holder must have a trustline for the IOU currency.
2. The reward issuer account must have a Hook that fires on \`ClaimReward\`.
3. The holder submits \`ClaimReward\` with \`ClaimCurrency\`.
4. On the first claim, Xahau initializes reward-tracking counters on the \`RippleState\` trustline object.
5. As the trustline balance changes over time, the ledger updates the \`TrustLineRewardAccumulator\`.
6. On later claims, the ledger resets the counters and fires the issuer's Hook.
7. The Hook reads the accumulated value and emits the actual reward payment.

This separates **tracking** from **payout logic**. The ledger tracks balance over time; the Hook decides how much to pay, which token to pay with, cooldowns, caps, and any business rules.

### Key differences from XAH rewards

| XAH genesis rewards | IOU rewards |
|---|---|
| Counters live on \`AccountRoot\` | Counters live on \`RippleState\` trustlines |
| Payout is handled by the genesis reward Hook | Payout is handled by the issuer's Hook |
| Uses XAH balance | Uses IOU trustline balance |
| Issuer is the genesis account | Issuer can be any non-AMM account with the right Hook |

### Requirements

- \`IOURewardClaim\` amendment enabled
- A trustline between \`Account\` and \`ClaimCurrency.issuer\`
- A Hook installed on \`Issuer\`
- That Hook must fire on \`ClaimReward\`
- \`ClaimCurrency\` cannot be XAH
- The issuer account cannot be an AMM account

### Common errors

- \`temDISABLED\`: required amendment is not enabled
- \`temMALFORMED\`: invalid \`ClaimCurrency\`, XAH used as \`ClaimCurrency\`, or issuer equals account
- \`temBAD_ISSUER\`: invalid genesis-account combination for IOU rewards
- \`tecNO_ISSUER\`: the \`Issuer\` account does not exist
- \`tecNO_PERMISSION\`: the issuer is an AMM account
- \`tecNO_TARGET\`: issuer has no Hook, or no Hook fires on \`ClaimReward\`
- \`tecNO_LINE\`: no trustline exists for the requested IOU

### Run this lesson's scripts

These scripts sign with \`HOLDER_SEED\` from \`.env\`, created by \`create-accounts.js\` ([Module 3](?m=3&l=1)). The holder only needs XAH for the TrustLine reserve and fees; the RWD issuer and the reward programme are existing testnet accounts. If the variable is missing, the scripts stop before submitting and say what to run.`,
  jp: `この機能の名前は **IOURewardClaim** ですが、送信するトランザクションは **ClaimReward** のままです。このamendmentは \`ClaimReward\` を拡張し、トークン発行者がIOU holder向けのカスタム報酬プログラムを実行できるようにします。

### 何を解決するのか？

ネイティブXAHの報酬はXAHとgenesis報酬システムに結び付いています。IOURewardClaimは、同様の報酬トラッキングを発行通貨へ持ち込みます。ロイヤルティトークン、staking receipt、DAO参加ポイント、利回り付きIOU、ゲーム内通貨などに使えます。

\`TransactionType: "IOURewardClaim"\` は存在しません。\`ClaimReward\` に \`ClaimCurrency\` を付けて使います。\`Issuer\` は報酬プログラムのHookを実行するアカウントを指し、\`ClaimCurrency.issuer\` はIOUそのものの発行者を指します。

多くの報酬システムでは3つのアカウントを使います。

| アカウント | 役割 |
|---|---|
| トークン発行者 | IOU通貨を作成する |
| 報酬issuer / reserve | Hookを持ち、報酬を支払う |
| Holder | IOUを保持し \`ClaimReward\` を送信する |

### 仕組み

holderにはIOUのtrustlineが必要です。報酬issuerアカウントには \`ClaimReward\` で発火するHookが必要です。最初のclaimで、Xahauはtrustlineの \`RippleState\` オブジェクトに報酬カウンターを初期化します。trustline残高が時間とともに変化すると、ledgerは \`TrustLineRewardAccumulator\` を更新します。次回以降のclaimでは、ledgerがカウンターをリセットしてissuerのHookを発火します。Hookは蓄積値を読み、実際の報酬支払いを発行します。

これにより **トラッキング** と **支払いロジック** が分離されます。ledgerは時間あたりの残高を追跡し、Hookは支払額、支払いトークン、cooldown、上限、ビジネスルールを決めます。

### 要件とよくあるエラー

\`IOURewardClaim\` amendment、\`Account\` と \`ClaimCurrency.issuer\` のtrustline、\`Issuer\` にインストールされたHook、そのHookが \`ClaimReward\` で発火すること、そして \`ClaimCurrency\` がXAHではないことが必要です。よくあるエラーは \`temDISABLED\`、\`temMALFORMED\`、\`tecNO_ISSUER\`、\`tecNO_TARGET\`、\`tecNO_LINE\` です。

### このレッスンのスクリプトを実行する

これらのスクリプトは、\`create-accounts.js\`（[モジュール3](?m=3&l=1)）が作成する \`.env\` の \`HOLDER_SEED\` で署名します。保有者に必要なのは TrustLine のリザーブと手数料のための XAH だけです。RWD の発行者とリワードプログラムはテストネット上の既存のアカウントです。変数がない場合、スクリプトは送信前に停止し、何を実行すべきかを表示します。`,
  ko: `이 기능의 이름은 **IOURewardClaim** 이지만, 제출하는 트랜잭션은 여전히 **ClaimReward** 입니다. 이 amendment는 토큰 발행자가 IOU holder를 위한 맞춤형 보상 프로그램을 실행할 수 있도록 \`ClaimReward\` 를 확장합니다.

### 어떤 문제를 해결하나요?

네이티브 XAH 보상은 XAH와 genesis 보상 시스템에 연결되어 있습니다. IOURewardClaim은 비슷한 보상 추적 메커니즘을 발행 통화로 가져옵니다. 로열티 토큰, staking receipt 토큰, DAO 참여 포인트, 수익형 IOU, 게임 또는 앱 보상 통화에 사용할 수 있습니다.

\`TransactionType: "IOURewardClaim"\` 은 없습니다. \`ClaimReward\` 에 \`ClaimCurrency\` 를 추가해 사용합니다. \`Issuer\` 필드는 보상 프로그램 Hook을 실행할 계정을 가리키고, \`ClaimCurrency.issuer\` 는 IOU 자체의 발행자를 가리킵니다.

많은 보상 시스템은 세 계정을 사용합니다.

| 계정 | 역할 |
|---|---|
| 토큰 발행자 | IOU 통화를 생성 |
| 보상 issuer / reserve | Hook이 설치되어 있고 보상을 지급 |
| Holder | IOU를 보유하고 \`ClaimReward\` 제출 |

### 작동 방식

holder는 IOU 통화에 대한 trustline이 있어야 합니다. 보상 issuer 계정에는 \`ClaimReward\` 에서 실행되는 Hook이 있어야 합니다. 첫 claim에서 Xahau는 trustline의 \`RippleState\` 객체에 보상 추적 카운터를 초기화합니다. trustline 잔액이 시간에 따라 바뀌면 ledger는 \`TrustLineRewardAccumulator\` 를 업데이트합니다. 이후 claim에서는 ledger가 카운터를 재설정하고 issuer의 Hook을 실행합니다. Hook은 누적 값을 읽고 실제 보상 지급을 발생시킵니다.

이 구조는 **추적** 과 **지급 로직** 을 분리합니다. ledger는 시간에 따른 잔액을 추적하고, Hook은 지급량, 지급 토큰, cooldown, 한도, 비즈니스 규칙을 결정합니다.

### 요구 사항과 흔한 오류

\`IOURewardClaim\` amendment 활성화, \`Account\` 와 \`ClaimCurrency.issuer\` 사이의 trustline, \`Issuer\` 에 설치된 Hook, 그 Hook이 \`ClaimReward\` 에서 실행되는 것, 그리고 \`ClaimCurrency\` 가 XAH가 아니어야 합니다. 흔한 오류는 \`temDISABLED\`, \`temMALFORMED\`, \`tecNO_ISSUER\`, \`tecNO_TARGET\`, \`tecNO_LINE\` 입니다.

### 이 레슨의 스크립트 실행

이 스크립트들은 \`create-accounts.js\`([모듈 3](?m=3&l=1))가 만든 \`.env\`의 \`HOLDER_SEED\`로 서명합니다. 보유자에게는 TrustLine 준비금과 수수료를 위한 XAH만 있으면 됩니다. RWD 발행자와 보상 프로그램은 테스트넷에 이미 있는 계정입니다. 변수가 없으면 스크립트는 제출 전에 멈추고 무엇을 실행해야 하는지 알려 줍니다.`,
  zh: `这个功能叫 **IOURewardClaim**，但实际提交的交易仍然是 **ClaimReward**。该 amendment 扩展了 \`ClaimReward\`，让代币发行方可以为 IOU holder 运行自定义奖励程序。

### 它解决什么问题？

原生 XAH 奖励与 XAH 和 genesis 奖励系统绑定。IOURewardClaim 把类似的奖励跟踪机制带到已发行货币中，例如忠诚度代币、staking receipt、DAO 参与积分、收益型 IOU、游戏或应用奖励货币。

不存在 \`TransactionType: "IOURewardClaim"\`。你使用的是带有 \`ClaimCurrency\` 的 \`ClaimReward\`。\`Issuer\` 字段指向运行奖励程序 Hook 的账户；\`ClaimCurrency.issuer\` 指向 IOU 本身的发行方。

很多奖励系统会使用三个账户：

| 账户 | 角色 |
|---|---|
| 代币发行方 | 创建 IOU 货币 |
| 奖励 issuer / reserve | 安装 Hook 并支付奖励 |
| Holder | 持有 IOU 并提交 \`ClaimReward\` |

### 工作方式

holder 必须拥有该 IOU 的 trustline。奖励 issuer 账户必须安装一个会在 \`ClaimReward\` 时触发的 Hook。第一次 claim 时，Xahau 会在 trustline 的 \`RippleState\` 对象上初始化奖励计数器。随着 trustline 余额随时间变化，ledger 会更新 \`TrustLineRewardAccumulator\`。之后再次 claim 时，ledger 会重置计数器并触发 issuer 的 Hook。Hook 读取累计值并发出实际奖励支付。

这把 **跟踪** 和 **支付逻辑** 分开了：ledger 负责按时间跟踪余额，Hook 决定支付多少、用哪种 token、冷却时间、上限和业务规则。

### 要求与常见错误

需要启用 \`IOURewardClaim\` amendment；\`Account\` 和 \`ClaimCurrency.issuer\` 之间需要 trustline；\`Issuer\` 上需要安装 Hook；该 Hook 必须在 \`ClaimReward\` 时触发；且 \`ClaimCurrency\` 不能是 XAH。常见错误包括 \`temDISABLED\`、\`temMALFORMED\`、\`tecNO_ISSUER\`、\`tecNO_TARGET\` 和 \`tecNO_LINE\`。

### 运行本课的脚本

这些脚本使用 \`.env\` 中由 \`create-accounts.js\`（[模块3](?m=3&l=1)） 创建的 \`HOLDER_SEED\` 签名。持有者只需要支付 TrustLine 储备和手续费的 XAH；RWD 发行者和奖励计划都是测试网上已有的账户。缺少该变量时，脚本会在提交前停止，并说明应运行什么。`,
};

const priceOracleSlides = [
  {
    title: { es: "Price Oracle", pt: "Price Oracle", en: "Price Oracle", jp: "Price Oracle", ko: "Price Oracle", zh: "Price Oracle" },
    content: {
      es: "Feed de precios on-chain\n\n• Propiedad de una cuenta\n• Identificado por OracleDocumentID\n• Guarda 1-10 pares de precio\n• Provider y AssetClass van en hexadecimal\n• Útil para apps, Hooks y lógica DeFi",
      pt: "Feed de preço on-chain\n\n• Pertence a uma conta\n• Identificado por OracleDocumentID\n• Armazena 1-10 pares de preço\n• Provider e AssetClass vão em hexadecimal\n• Usado por apps, Hooks e lógica DeFi",
      en: "On-chain price feed\n\n• Owned by one account\n• Identified by OracleDocumentID\n• Stores 1-10 price pairs\n• Provider and AssetClass are hex strings\n• Used by apps, Hooks, and DeFi logic",
      jp: "オンチェーン価格フィード\n\n• 1つのアカウントが所有\n• OracleDocumentIDで識別\n• 1-10件の価格ペアを保存\n• ProviderとAssetClassはhex文字列\n• アプリ、Hooks、DeFiロジックで使用",
      ko: "온체인 가격 피드\n\n• 한 계정이 소유\n• OracleDocumentID로 식별\n• 1-10개의 가격 쌍 저장\n• Provider와 AssetClass는 hex 문자열\n• 앱, Hooks, DeFi 로직에서 사용",
      zh: "链上价格源\n\n• 由一个账户拥有\n• 通过 OracleDocumentID 标识\n• 存储 1-10 个价格对\n• Provider 和 AssetClass 是十六进制字符串\n• 可用于应用、Hooks 和 DeFi 逻辑",
    },
    visual: "📈",
  },
  {
    title: { es: "OracleSet vs OracleDelete", pt: "OracleSet vs OracleDelete", en: "OracleSet vs OracleDelete", jp: "OracleSet vs OracleDelete", ko: "OracleSet vs OracleDelete", zh: "OracleSet vs OracleDelete" },
    content: {
      es: "OracleSet\n• Crea o actualiza el objeto Oracle\n• Publica PriceDataSeries\n• Las actualizaciones necesitan un LastUpdateTime más reciente\n\nOracleDelete\n• Elimina el objeto Oracle\n• Solo puede hacerlo el propietario\n• Libera la reserva de propietario",
      pt: "OracleSet\n• Cria ou atualiza o objeto Oracle\n• Publica PriceDataSeries\n• Atualizações precisam de LastUpdateTime mais recente\n\nOracleDelete\n• Remove o objeto Oracle\n• Só o proprietário pode remover\n• Libera a reserva de proprietário",
      en: "OracleSet\n• Creates or updates the Oracle object\n• Publishes PriceDataSeries\n• Updates must use newer LastUpdateTime\n\nOracleDelete\n• Removes the Oracle object\n• Only owner can delete\n• Releases owner reserve",
      jp: "OracleSet\n• Oracleオブジェクトを作成または更新\n• PriceDataSeriesを公開\n• 更新にはより新しいLastUpdateTimeが必要\n\nOracleDelete\n• Oracleオブジェクトを削除\n• 所有者だけが削除可能\n• owner reserveを解放",
      ko: "OracleSet\n• Oracle 객체 생성 또는 업데이트\n• PriceDataSeries 게시\n• 업데이트에는 더 최신 LastUpdateTime 필요\n\nOracleDelete\n• Oracle 객체 삭제\n• 소유자만 삭제 가능\n• owner reserve 반환",
      zh: "OracleSet\n• 创建或更新 Oracle 对象\n• 发布 PriceDataSeries\n• 更新必须使用更新的 LastUpdateTime\n\nOracleDelete\n• 删除 Oracle 对象\n• 只有所有者可以删除\n• 释放 owner reserve",
    },
    visual: "🛰️",
  },
  {
    title: { es: "Leer precios", pt: "Ler preços", en: "Reading prices", jp: "価格を読む", ko: "가격 읽기", zh: "读取价格" },
    content: {
      es: "Formato del precio:\nAssetPrice * 10^(-Scale)\n\nEjemplo:\n74560 con Scale 4 = 7.456\n\nEn producción:\n• Consulta varios proveedores\n• Usa get_aggregate_price\n• Recorta outliers\n• Filtra feeds antiguos con time_threshold",
      pt: "Formato do preço:\nAssetPrice * 10^(-Scale)\n\nExemplo:\n74560 com Scale 4 = 7.456\n\nEm produção:\n• Consulte vários provedores\n• Use get_aggregate_price\n• Remova outliers\n• Filtre feeds antigos com time_threshold",
      en: "Price format:\nAssetPrice * 10^(-Scale)\n\nExample:\n74560 with Scale 4 = 7.456\n\nFor production:\n• Query multiple providers\n• Use get_aggregate_price\n• Trim outliers\n• Filter stale updates with time_threshold",
      jp: "価格形式：\nAssetPrice * 10^(-Scale)\n\n例：\nScale 4で74560 = 7.456\n\n本番環境：\n• 複数プロバイダーを照会\n• get_aggregate_priceを使用\n• 外れ値をtrim\n• time_thresholdで古い更新を除外",
      ko: "가격 형식:\nAssetPrice * 10^(-Scale)\n\n예:\nScale 4에서 74560 = 7.456\n\n운영 환경:\n• 여러 제공자 조회\n• get_aggregate_price 사용\n• 이상치 제거\n• time_threshold로 오래된 업데이트 필터링",
      zh: "价格格式：\nAssetPrice * 10^(-Scale)\n\n示例：\nScale 为 4 时 74560 = 7.456\n\n生产环境：\n• 查询多个提供者\n• 使用 get_aggregate_price\n• 裁剪异常值\n• 用 time_threshold 过滤过期更新",
    },
    visual: "🧮",
  },
];

const iouRewardSlides = [
  {
    title: { es: "IOURewardClaim", pt: "IOURewardClaim", en: "IOURewardClaim", jp: "IOURewardClaim", ko: "IOURewardClaim", zh: "IOURewardClaim" },
    content: {
      es: "No es un TransactionType separado\n\n• Usa ClaimReward\n• Añade ClaimCurrency\n• Issuer apunta a la cuenta con el Hook de recompensas\n• ClaimCurrency.issuer apunta al emisor del IOU\n\nRecompensas personalizadas con seguimiento nativo",
      pt: "Não é um TransactionType separado\n\n• Usa ClaimReward\n• Adiciona ClaimCurrency\n• Issuer aponta para a conta com o Hook de recompensas\n• ClaimCurrency.issuer aponta para o emissor do IOU\n\nRecompensas personalizadas com rastreamento nativo",
      en: "Not a separate TransactionType\n\n• Uses ClaimReward\n• Adds ClaimCurrency\n• Issuer points to the reward Hook account\n• ClaimCurrency.issuer points to the IOU issuer\n\nCustom token rewards with native tracking",
      jp: "別のTransactionTypeではない\n\n• ClaimRewardを使用\n• ClaimCurrencyを追加\n• Issuerは報酬Hookアカウントを指す\n• ClaimCurrency.issuerはIOU発行者を指す\n\nネイティブ追跡によるカスタムトークン報酬",
      ko: "별도의 TransactionType이 아님\n\n• ClaimReward 사용\n• ClaimCurrency 추가\n• Issuer는 보상 Hook 계정을 가리킴\n• ClaimCurrency.issuer는 IOU 발행자를 가리킴\n\n네이티브 추적 기반 맞춤형 토큰 보상",
      zh: "不是单独的 TransactionType\n\n• 使用 ClaimReward\n• 添加 ClaimCurrency\n• Issuer 指向奖励 Hook 账户\n• ClaimCurrency.issuer 指向 IOU 发行方\n\n带原生跟踪的自定义代币奖励",
    },
    visual: "🎁",
  },
  {
    title: { es: "Dónde viven los contadores", pt: "Onde ficam os contadores", en: "Where Counters Live", jp: "カウンターの保存場所", ko: "카운터가 저장되는 위치", zh: "计数器存在哪里" },
    content: {
      es: "Recompensas XAH:\n• Contadores en AccountRoot\n• Pago por el Hook de recompensas génesis\n\nRecompensas IOU:\n• Contadores en la trustline RippleState\n• Pago por el Hook del issuer\n• Sigue el balance en el tiempo por holder",
      pt: "Recompensas XAH:\n• Contadores em AccountRoot\n• Pagamento pelo Hook de recompensas genesis\n\nRecompensas IOU:\n• Contadores na trustline RippleState\n• Pagamento pelo Hook do issuer\n• Rastreia saldo ao longo do tempo por holder",
      en: "XAH rewards:\n• Counters on AccountRoot\n• Payout by genesis reward Hook\n\nIOU rewards:\n• Counters on RippleState trustline\n• Payout by issuer Hook\n• Tracks balance over time per token holder",
      jp: "XAH報酬：\n• カウンターはAccountRoot上\n• genesis報酬Hookが支払い\n\nIOU報酬：\n• カウンターはRippleState trustline上\n• issuer Hookが支払い\n• holderごとの残高を時間で追跡",
      ko: "XAH 보상:\n• 카운터는 AccountRoot에 저장\n• genesis 보상 Hook이 지급\n\nIOU 보상:\n• 카운터는 RippleState trustline에 저장\n• issuer Hook이 지급\n• holder별 잔액을 시간에 따라 추적",
      zh: "XAH 奖励：\n• 计数器在 AccountRoot 上\n• 由 genesis 奖励 Hook 支付\n\nIOU 奖励：\n• 计数器在 RippleState trustline 上\n• 由 issuer Hook 支付\n• 按 holder 跟踪余额随时间变化",
    },
    visual: "📊",
  },
  {
    title: { es: "Configuración necesaria", pt: "Configuração necessária", en: "Required Setup", jp: "必要なセットアップ", ko: "필수 설정", zh: "所需配置" },
    content: {
      es: "1. Enmienda IOURewardClaim activa\n2. El holder tiene trustline del token\n3. La cuenta Issuer tiene un Hook\n4. El Hook se dispara con ClaimReward\n5. El holder envía ClaimReward con ClaimCurrency\n\nEl Hook define las reglas de pago",
      pt: "1. Emenda IOURewardClaim ativa\n2. O holder tem trustline do token\n3. A conta Issuer tem um Hook\n4. O Hook dispara com ClaimReward\n5. O holder envia ClaimReward com ClaimCurrency\n\nO Hook define as regras de pagamento",
      en: "1. IOURewardClaim amendment enabled\n2. Holder has token trustline\n3. Issuer account has a Hook\n4. Hook fires on ClaimReward\n5. Holder submits ClaimReward with ClaimCurrency\n\nThe Hook defines the payout rules",
      jp: "1. IOURewardClaim amendmentが有効\n2. holderにtoken trustlineがある\n3. IssuerアカウントにHookがある\n4. HookがClaimRewardで発火する\n5. holderがClaimCurrency付きClaimRewardを送信\n\nHookが支払いルールを定義する",
      ko: "1. IOURewardClaim amendment 활성화\n2. holder가 token trustline 보유\n3. Issuer 계정에 Hook 설치\n4. Hook이 ClaimReward에서 실행\n5. holder가 ClaimCurrency와 함께 ClaimReward 제출\n\nHook이 지급 규칙을 정의",
      zh: "1. 启用 IOURewardClaim amendment\n2. holder 拥有 token trustline\n3. Issuer 账户安装 Hook\n4. Hook 会在 ClaimReward 时触发\n5. holder 提交带 ClaimCurrency 的 ClaimReward\n\nHook 定义支付规则",
    },
    visual: "🔧",
  },
];

const makeIouRewardClaimCode = (comments, lang) => `require("dotenv").config();
${missingRole(lang, "HOLDER_SEED")}
const { Client, Wallet } = require("xahau");

function normalizeCurrency(currency) {
  if (currency.length <= 3) return currency;

  const hex = Buffer.from(currency, "utf8").toString("hex").toUpperCase();
  if (hex.length > 40) {
    throw new Error("Currency code is too long for Xahau IOU format.");
  }

  return hex.padEnd(40, "0");
}

async function claimIouReward() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const holder = Wallet.fromSeed(process.env.HOLDER_SEED, { algorithm: "secp256k1" });

  // ${comments.existingToken}
  // ${comments.existingHook}
  const rewardIssuer = "rQDaZ361xnkezCjgUxKsuLjLckqu4kw6nm";
  const tokenIssuer = "rHjU4oLTNBmsUV4CtifNhHVGWJTJfGC9vf";
  const currency = normalizeCurrency("RWD");

  const claimReward = {
    TransactionType: "ClaimReward",
    Account: holder.address,
    Issuer: rewardIssuer, // ${comments.rewardIssuer}
    ClaimCurrency: {
      currency,
      issuer: tokenIssuer, // ${comments.tokenIssuer}
    },
  };

  const prepared = await client.autofill(claimReward);
  const signed = holder.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("=== IOU Reward Claim ===");
  console.log("Holder:", holder.address);
  console.log("Reward issuer:", rewardIssuer);
  console.log("Token issuer:", tokenIssuer);
  console.log("Currency:", currency);
  console.log("Result:", result.result.meta.TransactionResult);
  console.log("Hash:", signed.hash);

  await client.disconnect();
}

claimIouReward().catch(console.error);`;

const makeIouRewardTrustlineCode = (comments, lang) => `require("dotenv").config();
${missingRole(lang, "HOLDER_SEED")}
const { Client, Wallet } = require("xahau");

async function createRewardTrustline() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const holder = Wallet.fromSeed(process.env.HOLDER_SEED, { algorithm: "secp256k1" });

  // ${comments.trustline}
  const tokenIssuer = "rHjU4oLTNBmsUV4CtifNhHVGWJTJfGC9vf";

  const trustSet = {
    TransactionType: "TrustSet",
    Account: holder.address,
    LimitAmount: {
      currency: "RWD",
      issuer: tokenIssuer, // ${comments.tokenIssuer}
      value: "1000000",
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = holder.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("=== Reward TrustLine ===");
  console.log("Result:", result.result.meta.TransactionResult);
  console.log("Hash:", signed.hash);

  await client.disconnect();
}

createRewardTrustline().catch(console.error);`;

const makeIouRewardInspectCode = (comments, lang) => `require("dotenv").config();
${missingRole(lang, "HOLDER_SEED")}
const { Client, Wallet } = require("xahau");

async function inspectRewardTrustline() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const holder = Wallet.fromSeed(process.env.HOLDER_SEED, { algorithm: "secp256k1" });
  // ${comments.inspect}
  const tokenIssuer = "rHjU4oLTNBmsUV4CtifNhHVGWJTJfGC9vf";
  const currency = "RWD";

  const response = await client.request({
    command: "account_lines",
    account: holder.address,
    ledger_index: "validated",
  });

  const line = response.result.lines.find(
    (item) => item.account === tokenIssuer && item.currency === currency
  );

  if (!line) {
    console.log("No trustline found for this token.");
  } else {
    console.log("=== TrustLine ===");
    console.log("Balance:", line.balance, line.currency);
    console.log("Issuer:", line.account);
    console.log("Limit:", line.limit);
  }

  await client.disconnect();
}

inspectRewardTrustline().catch(console.error);`;

const iouRewardComments = {
  es: {
    existingToken: "Este ejercicio apunta al token RWD ya creado en el ejemplo de Learning Xahau.",
    existingHook: "El ClaimReward llama a una cuenta RESERVE que ya tiene instalado el Hook de reward programme.",
    rewardIssuer: "cuenta con el Hook de recompensas instalado",
    tokenIssuer: "issuer real del token RWD",
    trustline: "El holder necesita una TrustLine hacia el issuer real del token RWD antes de reclamar.",
    inspect: "Consulta la TrustLine del holder hacia el issuer real de RWD.",
  },
  pt: {
    existingToken: "Este exercicio aponta para o token RWD ja criado no exemplo Learning Xahau.",
    existingHook: "O ClaimReward chama uma conta RESERVE que ja tem o Hook de reward programme instalado.",
    rewardIssuer: "conta com o Hook de recompensas instalado",
    tokenIssuer: "issuer real do token RWD",
    trustline: "O holder precisa de uma TrustLine para o issuer real do token RWD antes de reclamar.",
    inspect: "Consulte a TrustLine do holder para o issuer real de RWD.",
  },
  en: {
    existingToken: "This exercise points to the RWD token already created in the Learning Xahau example.",
    existingHook: "ClaimReward calls a RESERVE account that already has the reward programme Hook installed.",
    rewardIssuer: "account with the reward Hook installed",
    tokenIssuer: "real issuer of the RWD token",
    trustline: "The holder needs a TrustLine to the real RWD token issuer before claiming.",
    inspect: "Query the holder's TrustLine to the real RWD issuer.",
  },
  jp: {
    existingToken: "この演習は Learning Xahau の例で作成済みの RWD トークンを参照します。",
    existingHook: "ClaimReward は reward programme Hook がすでにインストールされた RESERVE アカウントを呼び出します。",
    rewardIssuer: "reward Hook がインストールされたアカウント",
    tokenIssuer: "RWD トークンの実際の issuer",
    trustline: "claim する前に、holder は RWD の実 issuer への TrustLine が必要です。",
    inspect: "holder の TrustLine を RWD の実 issuer に対して確認します。",
  },
  ko: {
    existingToken: "이 예제는 Learning Xahau 예제에서 이미 생성된 RWD 토큰을 가리킵니다.",
    existingHook: "ClaimReward는 reward programme Hook이 이미 설치된 RESERVE 계정을 호출합니다.",
    rewardIssuer: "reward Hook이 설치된 계정",
    tokenIssuer: "RWD 토큰의 실제 issuer",
    trustline: "claim 전에 holder는 실제 RWD 토큰 issuer와 TrustLine이 필요합니다.",
    inspect: "holder의 TrustLine을 실제 RWD issuer 기준으로 조회합니다.",
  },
  zh: {
    existingToken: "本练习指向 Learning Xahau 示例中已经创建好的 RWD token。",
    existingHook: "ClaimReward 会调用已经安装 reward programme Hook 的 RESERVE 账户。",
    rewardIssuer: "已安装 reward Hook 的账户",
    tokenIssuer: "RWD token 的真实 issuer",
    trustline: "claim 之前，holder 需要先建立指向真实 RWD issuer 的 TrustLine。",
    inspect: "查询 holder 与真实 RWD issuer 之间的 TrustLine。",
  },
};

const iouRewardClaimCode = Object.fromEntries(
  Object.entries(iouRewardComments).map(([lang, comments]) => [lang, makeIouRewardClaimCode(comments, lang)])
);
const iouRewardTrustlineCode = Object.fromEntries(
  Object.entries(iouRewardComments).map(([lang, comments]) => [lang, makeIouRewardTrustlineCode(comments, lang)])
);
const iouRewardInspectCode = Object.fromEntries(
  Object.entries(iouRewardComments).map(([lang, comments]) => [lang, makeIouRewardInspectCode(comments, lang)])
);

const makePriceOracleSetCode = (comments, lang) => `require("dotenv").config();
${missingRole(lang, "ORACLE_SEED")}
const { Client, Wallet } = require("xahau");

function toHex(value) {
  return Buffer.from(value, "utf8").toString("hex").toUpperCase();
}

async function setOraclePrice() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // ${comments.oracleSeed}
  const oracle = Wallet.fromSeed(process.env.ORACLE_SEED, { algorithm: "secp256k1" });

  const oracleSet = {
    TransactionType: "OracleSet",
    Account: oracle.address,
    OracleDocumentID: 1, // ${comments.documentId}
    Provider: toHex("CourseOracle"), // ${comments.provider}
    AssetClass: toHex("currency"), // ${comments.assetClass}
    LastUpdateTime: Math.floor(Date.now() / 1000), // ${comments.updateTime}
    PriceDataSeries: [
      {
        PriceData: {
          BaseAsset: "XAH", // ${comments.baseAsset}
          QuoteAsset: "USD", // ${comments.quoteAsset}
          AssetPrice: 74560,
          Scale: 4, // ${comments.scale}
        },
      },
    ],
  };

  const prepared = await client.autofill(oracleSet);
  const signed = oracle.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("=== OracleSet ===");
  console.log("Account:", oracle.address);
  console.log("Result:", result.result.meta.TransactionResult);
  console.log("Hash:", signed.hash);

  await client.disconnect();
}

setOraclePrice().catch(console.error);`;

const makePriceOracleQueryCode = (comments) => `const { Client } = require("xahau");

async function queryAggregatePrice() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // ${comments.knownOracles}
  // ${comments.aggregate}
  const response = await client.request({
    command: "get_aggregate_price",
    ledger_index: "current",
    base_asset: "XAH",
    quote_asset: "USD",
    trim: 20, // ${comments.trim}
    time_threshold: 300, // ${comments.timeThreshold}
    oracles: [
      { account: "rEhZSNh9pVRTcA79tQjYezg9V44HfcToR1", oracle_document_id: 1 },
      { account: "rD1rh9ffewxVb9QBqkr5ph98QXqCM1xsEP", oracle_document_id: 1 },
      { account: "r35gjkjZL4mhqyrabpxVUE9K9T5JW1nng9", oracle_document_id: 1 },
    ],
  });

  console.log("=== Aggregate Price ===");
  console.log("Median:", response.result.median);
  console.log("Mean:", response.result.entire_set?.mean);
  console.log("Trimmed mean:", response.result.trimmed_set?.mean);
  console.log("Oracle count:", response.result.entire_set?.size);

  await client.disconnect();
}

queryAggregatePrice().catch(console.error);`;

const makePriceOracleDeleteCode = (comments, lang) => `require("dotenv").config();
${missingRole(lang, "ORACLE_SEED")}
const { Client, Wallet } = require("xahau");

async function deleteOracle() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // ${comments.onlyOwner}
  const oracle = Wallet.fromSeed(process.env.ORACLE_SEED, { algorithm: "secp256k1" });

  const oracleDelete = {
    TransactionType: "OracleDelete",
    Account: oracle.address,
    OracleDocumentID: 1, // ${comments.documentId}
  };

  const prepared = await client.autofill(oracleDelete);
  const signed = oracle.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("=== OracleDelete ===");
  console.log("Result:", result.result.meta.TransactionResult);
  console.log("Hash:", signed.hash);

  await client.disconnect();
}

deleteOracle().catch(console.error);`;

const priceOracleComments = {
  es: {
    oracleSeed: "Esta seed firma como proveedor del Oracle que publica los precios.",
    documentId: "ID unico del documento Oracle dentro de esta cuenta",
    provider: "nombre del proveedor codificado en hex",
    assetClass: "categoria del activo codificada en hex",
    updateTime: "OracleSet exige un timestamp reciente",
    baseAsset: "activo cuyo precio se publica",
    quoteAsset: "moneda en la que expresamos el precio",
    scale: "74560 * 10^-4 = 7.456 USD",
    knownOracles: "Estas son direcciones publicas de Oracles ya publicados en el ejemplo Learning Xahau.",
    aggregate: "get_aggregate_price calcula mediana/media a partir de varios proveedores.",
    trim: "recorta outliers antes de calcular el promedio recortado",
    timeThreshold: "ignora updates demasiado antiguos",
    onlyOwner: "Solo la cuenta que creo el Oracle puede borrarlo.",
  },
  pt: {
    oracleSeed: "Esta seed assina como provedor do Oracle que publica os precos.",
    documentId: "ID unico do documento Oracle dentro desta conta",
    provider: "nome do provedor codificado em hex",
    assetClass: "categoria do ativo codificada em hex",
    updateTime: "OracleSet exige um timestamp recente",
    baseAsset: "ativo cujo preco e publicado",
    quoteAsset: "moeda em que expressamos o preco",
    scale: "74560 * 10^-4 = 7.456 USD",
    knownOracles: "Estas sao direcoes publicas de Oracles ja publicados no exemplo Learning Xahau.",
    aggregate: "get_aggregate_price calcula mediana/média a partir de vários provedores.",
    trim: "remove outliers antes de calcular a media aparada",
    timeThreshold: "ignora updates antigos demais",
    onlyOwner: "Apenas a conta que criou o Oracle pode apaga-lo.",
  },
  en: {
    oracleSeed: "This seed signs as the Oracle provider that publishes prices.",
    documentId: "unique Oracle document ID within this account",
    provider: "provider name encoded as hex",
    assetClass: "asset category encoded as hex",
    updateTime: "OracleSet requires a recent timestamp",
    baseAsset: "asset whose price is being published",
    quoteAsset: "currency used to express the price",
    scale: "74560 * 10^-4 = 7.456 USD",
    knownOracles: "These are public Oracle addresses already published in the Learning Xahau example.",
    aggregate: "get_aggregate_price calculates median/mean from several providers.",
    trim: "trims outliers before calculating the trimmed mean",
    timeThreshold: "ignores updates that are too old",
    onlyOwner: "Only the account that created the Oracle can delete it.",
  },
  jp: {
    oracleSeed: "この seed は価格を公開する Oracle provider として署名します。",
    documentId: "このアカウント内で一意の Oracle document ID",
    provider: "hex エンコードされた provider 名",
    assetClass: "hex エンコードされた asset category",
    updateTime: "OracleSet には新しい timestamp が必要です",
    baseAsset: "価格を公開する対象 asset",
    quoteAsset: "価格表示に使う通貨",
    scale: "74560 * 10^-4 = 7.456 USD",
    knownOracles: "Learning Xahau の例で公開済みの Oracle アドレスです。",
    aggregate: "get_aggregate_price は複数 provider から median/mean を計算します。",
    trim: "trimmed mean の前に outlier を除外します",
    timeThreshold: "古すぎる update を無視します",
    onlyOwner: "Oracle を削除できるのは作成したアカウントだけです。",
  },
  ko: {
    oracleSeed: "이 seed는 가격을 게시하는 Oracle provider로 서명합니다.",
    documentId: "이 계정 안에서 고유한 Oracle document ID",
    provider: "hex로 인코딩된 provider 이름",
    assetClass: "hex로 인코딩된 asset category",
    updateTime: "OracleSet에는 최근 timestamp가 필요합니다",
    baseAsset: "가격을 게시하는 asset",
    quoteAsset: "가격을 표시하는 currency",
    scale: "74560 * 10^-4 = 7.456 USD",
    knownOracles: "Learning Xahau 예제에서 이미 게시된 공개 Oracle 주소입니다.",
    aggregate: "get_aggregate_price는 여러 provider에서 median/mean을 계산합니다.",
    trim: "trimmed mean 계산 전에 outlier를 제거합니다",
    timeThreshold: "너무 오래된 update를 무시합니다",
    onlyOwner: "Oracle을 만든 계정만 삭제할 수 있습니다.",
  },
  zh: {
    oracleSeed: "这个 seed 会作为发布价格的 Oracle provider 签名。",
    documentId: "该账户内唯一的 Oracle document ID",
    provider: "用 hex 编码的 provider 名称",
    assetClass: "用 hex 编码的 asset category",
    updateTime: "OracleSet 需要较新的 timestamp",
    baseAsset: "正在发布价格的 asset",
    quoteAsset: "用来表示价格的 currency",
    scale: "74560 * 10^-4 = 7.456 USD",
    knownOracles: "这些是 Learning Xahau 示例中已经发布的公开 Oracle 地址。",
    aggregate: "get_aggregate_price 会根据多个 provider 计算 median/mean。",
    trim: "计算 trimmed mean 前先裁剪 outlier",
    timeThreshold: "忽略过旧的 update",
    onlyOwner: "只有创建 Oracle 的账户可以删除它。",
  },
};

const priceOracleSetCode = Object.fromEntries(
  Object.entries(priceOracleComments).map(([lang, comments]) => [lang, makePriceOracleSetCode(comments, lang)])
);
const priceOracleQueryCode = Object.fromEntries(
  Object.entries(priceOracleComments).map(([lang, comments]) => [lang, makePriceOracleQueryCode(comments, lang)])
);
const priceOracleDeleteCode = Object.fromEntries(
  Object.entries(priceOracleComments).map(([lang, comments]) => [lang, makePriceOracleDeleteCode(comments, lang)])
);

const moduleData = {
  id: "m10",
  icon: "🔐",
  title: {
    es: "Otras transacciones disponibles",
    pt: "Outras transações disponíveis",
    en: "Other Available Transactions",
    jp: "その他の利用可能なトランザクション",
    ko: "기타 사용 가능한 트랜잭션",
    zh: "其他可用的交易",
  },
  lessons: [
    {
      id: "m10l1",
      title: {
        es: "Escrows: pagos condicionales",
        pt: "Escrows: pagamentos condicionais",
        en: "Escrows: Conditional Payments",
        jp: "エスクロー：条件付き支払い",
        ko: "Escrow: 조건부 결제",
        zh: "Escrow：条件支付",
      },
      theory: {
        es: `Un **Escrow** es un mecanismo de pago condicional que bloquea fondos hasta que se cumplan ciertas condiciones. Es como un sobre sellado con dinero que solo se puede abrir bajo circunstancias específicas. Una caja fuerte condicional.

### Casos de uso

- **Pagos programados**: Liberar fondos en una fecha futura determinada
- **Atomic swaps**: Intercambios condicionales entre partes que no confían entre sí
- **Liberación condicional**: Fondos que solo se liberan cuando se proporciona una prueba criptográfica
- **Vesting**: Distribución gradual de tokens a lo largo del tiempo

### EscrowCreate: crear un escrow

El tipo de transacción \`EscrowCreate\` bloquea una cantidad de XAH con condiciones:

| Campo | Descripción |
|---|---|
| \`Amount\` | Cantidad de XAH u otros activos a bloquear (en drops para XAH, objeto Amount para tokens) |
| \`Destination\` | Cuenta que recibirá los fondos |
| \`FinishAfter\` | Timestamp mínimo para completar el escrow |
| \`CancelAfter\` | Timestamp a partir del cual se puede cancelar |
| \`Condition\` | Crypto-condición opcional para la liberación |

**Reglas importantes**:
- Debes especificar al menos \`FinishAfter\` o \`Condition\` (o ambos)
- Si usas \`CancelAfter\`, debe ser posterior a \`FinishAfter\`
- Los timestamps usan la **Ripple Epoch** (segundos desde 01/01/2000 00:00:00 UTC)

### EscrowFinish: completar el escrow

Cualquier cuenta puede ejecutar \`EscrowFinish\` para liberar los fondos al destinatario:
- Solo funciona después de \`FinishAfter\` (si se especificó)
- Si hay \`Condition\`, debe proporcionarse el \`Fulfillment\` correcto
- Los campos \`Owner\` y \`OfferSequence\` identifican qué escrow completar

### EscrowCancel: cancelar el escrow

Con \`EscrowCancel\` se devuelven los fondos al creador:
- Solo funciona después de \`CancelAfter\`
- Cualquier cuenta puede ejecutar la cancelación
- Los fondos vuelven a la cuenta que creó el escrow

### Crypto-condiciones

Xahau soporta crypto-condiciones del protocolo **Interledger (ILP)**:
- Basadas en el estándar **PREIMAGE-SHA-256**
- El creador genera un \`Condition\` (hash) y guarda el \`Fulfillment\` (preimagen)
- Para completar el escrow, se debe proporcionar el \`Fulfillment\` que corresponda al \`Condition\`
- Esto permite escrows que solo se liberan cuando alguien demuestra conocer un secreto

### Ejecutar los ejemplos

El primer ejemplo crea el escrow desde \`WALLET\` e imprime su \`Sequence\`. Cuando pasen los dos minutos de \`FinishAfter\`, ejecuta el segundo ejemplo con ese \`Sequence\` como primer argumento. Antes de ese momento, el script imprime cuántos segundos faltan.`,
        pt: `Um **Escrow** é um mecanismo de pagamento condicional que bloqueia fundos até que se cumpram certas condições. É como um sobre selado com dinheiro que sou pode abrir sob circunstâncias específicas. Uma cofre condicional.
### Casos de uso
- **Pagamentos programados**: Liberar fundos em uma data futura determinada
- **Atomic swaps**: Trocas condicionais entre partes que não confiam entre si
- **Liberação condicional**: Fundos que só são liberados quando se fornece uma prova criptográfica
- **Vesting**: Distribuição gradual de tokens ao longo do tempo
### EscrowCreate: criar um escrow
O tipo de transação \`EscrowCreate\` bloqueia uma quantidade de XAH com condições:
| Campo | Descrição |
|---|---|
| \`Amount\` | Quantidade de XAH ou outros ativos a bloquear (em drops para XAH, objeto Amount para tokens) |
| \`Destination\` | Conta que receberá os fundos |
| \`FinishAfter\` | Timestamp mínimo para completar o escrow |
| \`CancelAfter\` | Timestamp a partir do cual se pode cancelar |
| \`Condition\` | Crypto-condição opcional para a liberacioun |
**Regras importantes**:
- Você deve especificar ao menos \`FinishAfter\` ou \`Condition\` (ou ambos)
- Se usas \`CancelAfter\`, deve ser posterior a \`FinishAfter\`
- Os timestamps usam a **Ripple Epoch** (segundos desde 01/01/2000 00:00:00 UTC)
### EscrowFinish: completar o escrow
Qualquer conta pode executar \`EscrowFinish\` para liberar os fundos ao destinatário:
- Sou funciona depois de \`FinishAfter\` (se foi especificado)
- Se houver \`Condition\`, deve ser fornecido o \`Fulfillment\` correto
- Os campos \`Owner\` e \`OfferSequence\` identificam qual escrow concluir
### EscrowCancel: cancelar o escrow
Com \`EscrowCancel\` se retornam os fundos ao criador:
- Sou funciona depois de \`CancelAfter\`
- Qualquer conta pode executar a cancelacioun
- Os fundos voltam à conta que criou o escrow
### Crypto-condições
Xahau suporta condições criptográficas do protocolo **Interledger (ILP)**:
- Baseadas no padrão **PREIMAGE-SHA-256**
- O criador gera um \`Condition\` (hash) e guarda o \`Fulfillment\` (pré-imagem)
- Para completar o escrow, se deve proporcionar o \`Fulfillment\` que corresponda ao \`Condition\`
- Isso permite escrows que sou são liberados quando alguém demonstra conhecer um segredo

### Executar os exemplos

O primeiro exemplo cria o escrow a partir da \`WALLET\` e imprime o seu \`Sequence\`. Quando passarem os dois minutos de \`FinishAfter\`, execute o segundo exemplo com esse \`Sequence\` como primeiro argumento. Antes disso, o script imprime quantos segundos faltam.`,
        en: `An **Escrow** is a conditional payment mechanism that locks funds until certain conditions are met. Like a sealed envelope with money that can only be opened under specific circumstances, a conditional safe.

### Use cases

- **Scheduled payments**: Release funds on a specific future date
- **Atomic swaps**: Conditional exchanges between parties that don't trust each other
- **Conditional release**: Funds only released when a cryptographic proof is provided
- **Vesting**: Gradual token distribution over time

### EscrowCreate: creating an escrow

The \`EscrowCreate\` transaction type locks an amount of XAH with conditions:

| Field | Description |
|---|---|
| \`Amount\` | Amount of XAH or other assets to lock (drops for XAH, Amount object for tokens) |
| \`Destination\` | Account that will receive the funds |
| \`FinishAfter\` | Minimum timestamp to complete the escrow |
| \`CancelAfter\` | Timestamp from which it can be cancelled |
| \`Condition\` | Optional crypto-condition for release |

**Important rules**:
- You must specify at least \`FinishAfter\` or \`Condition\` (or both)
- If you use \`CancelAfter\`, it must be after \`FinishAfter\`
- Timestamps use **Ripple Epoch** (seconds since 01/01/2000 00:00:00 UTC)

### EscrowFinish: completing the escrow

Any account can execute \`EscrowFinish\` to release the funds to the recipient:
- Only works after \`FinishAfter\` (if specified)
- If there is a \`Condition\`, the correct \`Fulfillment\` must be provided
- The \`Owner\` and \`OfferSequence\` fields identify which escrow to complete

### EscrowCancel: cancelling the escrow

With \`EscrowCancel\` the funds are returned to the creator:
- Only works after \`CancelAfter\`
- Any account can execute the cancellation
- Funds go back to the account that created the escrow

### Crypto-conditions

Xahau supports crypto-conditions from the **Interledger (ILP)** protocol:
- Based on the **PREIMAGE-SHA-256** standard
- The creator generates a \`Condition\` (hash) and saves the \`Fulfillment\` (preimage)
- To complete the escrow, the \`Fulfillment\` matching the \`Condition\` must be provided
- This allows escrows only released when someone proves they know a secret

### Running the examples

The first example creates the escrow from \`WALLET\` and prints its \`Sequence\`. When the two minutes of \`FinishAfter\` have passed, run the second example with that \`Sequence\` as its first argument. Before that, the script prints how many seconds remain.`,
        jp: `**エスクロー**は、特定の条件が満たされるまで資金をロックする条件付き支払いメカニズムです。特定の状況下でのみ開封できる封筒のようなもので、条件付き金庫と言えます。

### ユースケース

- **スケジュール支払い**：将来の特定の日に資金をリリース
- **アトミックスワップ**：互いを信頼しない当事者間の条件付き交換
- **条件付きリリース**：暗号証明が提供された場合にのみ資金をリリース
- **ベスティング**：時間をかけたトークンの段階的な配布

### EscrowCreate：エスクローの作成

\`EscrowCreate\`トランザクションタイプは、条件付きでXAH/IOUの金額をロックします。

| フィールド | 説明 |
|---|---|
| \`Amount\` | ロックするXAHまたはその他の資産の量（XAHの場合はdrops、トークンの場合はAmountオブジェクト） |
| \`Destination\` | 資金を受け取るアカウント |
| \`FinishAfter\` | エスクローを完了するための最小タイムスタンプ |
| \`CancelAfter\` | キャンセル可能になるタイムスタンプ |
| \`Condition\` | リリースのためのオプションの暗号条件 |

**重要なルール**：
- \`FinishAfter\`または\`Condition\`（または両方）のいずれかを指定する必要があります
- \`CancelAfter\`を使用する場合は、\`FinishAfter\`より後でなければなりません
- タイムスタンプは**Ripple Epoch**（2000年01月01日00:00:00 UTCからの秒数）を使用します

### EscrowFinish：エスクローの完了

任意のアカウントが\`EscrowFinish\`を実行して受取人に資金をリリースできます。
- \`FinishAfter\`後にのみ機能します（指定されている場合）
- \`Condition\`がある場合は、正しい\`Fulfillment\`を提供する必要があります
- \`Owner\`と\`OfferSequence\`フィールドが完了するエスクローを特定します

### EscrowCancel：エスクローのキャンセル

\`EscrowCancel\`で資金が作成者に返還されます。
- \`CancelAfter\`後にのみ機能します
- 任意のアカウントがキャンセルを実行できます
- 資金はエスクローを作成したアカウントに戻ります

### 暗号条件

Xahauは**Interledger (ILP)**プロトコルの暗号条件をサポートします。
- **PREIMAGE-SHA-256**標準に基づいています
- 作成者は\`Condition\`（ハッシュ）を生成し、\`Fulfillment\`（プリイメージ）を保存します
- エスクローを完了するには、\`Condition\`に一致する\`Fulfillment\`を提供する必要があります
- これにより、秘密を知っている人だけがリリースできるエスクローが可能になります

### 例の実行

最初の例は \`WALLET\` から escrow を作成し、その \`Sequence\` を表示します。\`FinishAfter\` の2分が過ぎたら、その \`Sequence\` を最初の引数にして2つ目の例を実行します。それより前に実行すると、スクリプトは残り秒数を表示します。`,
        ko: `**Escrow**는 조건이 충족될 때까지 자금을 잠가 두는 메커니즘입니다. 미래 시점 지급이나 조건부 정산처럼 즉시 송금이 적합하지 않을 때 유용합니다.

### 대표 사용 사례

- 예약 지급
- 조건부 자금 해제
- 해시 조건 기반 교환
- 베스팅

### 핵심 트랜잭션

- \`EscrowCreate\`: 자금 잠금
- \`EscrowFinish\`: 조건 충족 후 해제
- \`EscrowCancel\`: 취소 가능 시점 이후 취소

시간 조건과 암호 조건을 잘 이해해야 안전하게 사용할 수 있습니다.

### 예제 실행

첫 번째 예제는 \`WALLET\`에서 escrow를 만들고 그 \`Sequence\`를 출력합니다. \`FinishAfter\`의 2분이 지나면 그 \`Sequence\`를 첫 번째 인수로 두 번째 예제를 실행합니다. 그 전에 실행하면 스크립트가 남은 초를 출력합니다.`,
        zh: `**Escrow** 是一种在满足条件之前锁定资金的机制，适合未来付款或条件结算等不适合立即转账的场景。

### 常见用途

- 预约付款
- 条件释放资金
- 基于哈希条件的交换
- 代币归属期发放

### 核心交易

- \`EscrowCreate\`：锁定资金
- \`EscrowFinish\`：条件满足后释放
- \`EscrowCancel\`：在可取消时间后撤销

安全使用 Escrow 的关键是理解时间条件和加密条件。

### 运行示例

第一个示例从 \`WALLET\` 创建 escrow 并打印它的 \`Sequence\`。\`FinishAfter\` 的两分钟过后，把这个 \`Sequence\` 作为第一个参数运行第二个示例。在此之前运行，脚本会打印剩余的秒数。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear un escrow con bloqueo temporal (FinishAfter = 5 minutos)",
            pt: "Criar um escrow com bloqueio temporal (FinishAfter = 5 minutos)",
            en: "Create an escrow with time lock (FinishAfter = 2 minutes)",
            jp: "タイムロック付きエスクローの作成（FinishAfter = 2分）",
            zh: "创建带时间锁的 Escrow（FinishAfter = 2 分钟）",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");

async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // La cuenta CASH de .env recibe los fondos
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // Ripple Epoch: segundos desde 01/01/2000 00:00:00 UTC
  // Diferencia con Unix Epoch: 946684800 segundos
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const now = Math.floor(Date.now() / 1000);

  // FinishAfter: 2 minutos en el futuro
  const finishAfter = now - RIPPLE_EPOCH_OFFSET + 2 * 60;
  // CancelAfter: 24 horas en el futuro (si nadie lo completa, se puede cancelar)
  const cancelAfter = now - RIPPLE_EPOCH_OFFSET + 24 * 60 * 60;

  const escrowCreate = {
    TransactionType: "EscrowCreate",
    Account: sender.address,
    Destination: receiver,
    Amount: xahToDrops(10), // Bloquear 10 XAH
    FinishAfter: finishAfter,
    CancelAfter: cancelAfter,
  };

  const prepared = await client.autofill(escrowCreate);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== EscrowCreate ===");
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("Hash:", signed.hash);
    console.log("Sequence:", prepared.Sequence);
    console.log(
      "FinishAfter:",
      new Date((finishAfter + RIPPLE_EPOCH_OFFSET) * 1000).toISOString()
    );
    console.log(
      "CancelAfter:",
      new Date((cancelAfter + RIPPLE_EPOCH_OFFSET) * 1000).toISOString()
    );
    console.log("¡Guarda el Sequence! Lo necesitas para EscrowFinish.");
    console.log(\`Sequence del escrow: \${prepared.Sequence}\`);
    console.log(\`Tu dirección: \${sender.address}\`);

  }

  await client.disconnect();
}

createTimeLockedEscrow();`,
            pt: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // A conta CASH do .env recebe os fundos
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;
  // Ripple Epoch: segundos a partir de 01/01/2000 00:00:00 UTC
  // Diferencia com Unix Epoch: 946684800 segundos
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const now = Math.floor(Date.now() / 1000);
  // FinishAfter: 2 minutos no futuro
  const finishAfter = now - RIPPLE_EPOCH_OFFSET + 2 * 60;
  // CancelAfter: 24 horas no futuro (se ninguém o completa, é possivel cancelar)
  const cancelAfter = now - RIPPLE_EPOCH_OFFSET + 24 * 60 * 60;
  const escrowCreate = {
    TransactionType: "EscrowCreate",
    Account: sender.address,
    Destination: receiver,
    Amount: xahToDrops(10), // Bloquear 10 XAH
    FinishAfter: finishAfter,
    CancelAfter: cancelAfter,
  };
  const prepared = await client.autofill(escrowCreate);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  const txResult = result.result.meta.TransactionResult;
  console.log("=== EscrowCreate ===");
  console.log("Resultado:", txResult);
  if (txResult === "tesSUCCESS") {
    console.log("Hash:", signed.hash);
    console.log("Sequence:", prepared.Sequence);
    console.log(
      "FinishAfter:",
      new Date((finishAfter + RIPPLE_EPOCH_OFFSET) * 1000).toISOString()
    );
    console.log(
      "CancelAfter:",
      new Date((cancelAfter + RIPPLE_EPOCH_OFFSET) * 1000).toISOString()
    );
    console.log("Guarde o Sequence! Você precisa dele para o EscrowFinish.");
    console.log(\`Sequence do escrow: \${prepared.Sequence}\`);
    console.log(\`Seu endereço: \${sender.address}\`);
  }
  await client.disconnect();
}
createTimeLockedEscrow();`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");

async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // The CASH account from .env receives the funds
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // Ripple Epoch: seconds since 01/01/2000 00:00:00 UTC
  // Difference from Unix Epoch: 946684800 seconds
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const now = Math.floor(Date.now() / 1000);

  // FinishAfter: 2 minutes in the future
  const finishAfter = now - RIPPLE_EPOCH_OFFSET + 2 * 60;
  // CancelAfter: 24 hours in the future (if nobody finishes it, it can be cancelled)
  const cancelAfter = now - RIPPLE_EPOCH_OFFSET + 24 * 60 * 60;

  const escrowCreate = {
    TransactionType: "EscrowCreate",
    Account: sender.address,
    Destination: receiver,
    Amount: xahToDrops(10), // Lock 10 XAH
    FinishAfter: finishAfter,
    CancelAfter: cancelAfter,
  };

  const prepared = await client.autofill(escrowCreate);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== EscrowCreate ===");
  console.log("Result:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("Hash:", signed.hash);
    console.log("Sequence:", prepared.Sequence);
    console.log(
      "FinishAfter:",
      new Date((finishAfter + RIPPLE_EPOCH_OFFSET) * 1000).toISOString()
    );
    console.log(
      "CancelAfter:",
      new Date((cancelAfter + RIPPLE_EPOCH_OFFSET) * 1000).toISOString()
    );
    console.log("Save the Sequence! You need it for EscrowFinish.");
    console.log(\`Escrow Sequence: \${prepared.Sequence}\`);
    console.log(\`Your address: \${sender.address}\`);

  }

  await client.disconnect();
}

createTimeLockedEscrow();`,
            jp: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");

async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // .env の CASH アカウントが資金を受け取ります
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // Ripple Epoch: 2000年01月01日00:00:00 UTCからの秒数
  // Unix Epochとの差: 946684800秒
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const now = Math.floor(Date.now() / 1000);

  // FinishAfter: 2分後
  const finishAfter = now - RIPPLE_EPOCH_OFFSET + 2 * 60;
  // CancelAfter: 24時間後（誰も完了しなければキャンセル可能）
  const cancelAfter = now - RIPPLE_EPOCH_OFFSET + 24 * 60 * 60;

  const escrowCreate = {
    TransactionType: "EscrowCreate",
    Account: sender.address,
    Destination: receiver,
    Amount: xahToDrops(10), // 10 XAHをロック
    FinishAfter: finishAfter,
    CancelAfter: cancelAfter,
  };

  const prepared = await client.autofill(escrowCreate);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== EscrowCreate ===");
  console.log("結果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("Hash:", signed.hash);
    console.log("Sequence:", prepared.Sequence);
    console.log(
      "FinishAfter:",
      new Date((finishAfter + RIPPLE_EPOCH_OFFSET) * 1000).toISOString()
    );
    console.log(
      "CancelAfter:",
      new Date((cancelAfter + RIPPLE_EPOCH_OFFSET) * 1000).toISOString()
    );
    console.log("Sequenceを保存してください！EscrowFinishに必要です。");
    console.log(\`エスクローのSequence: \${prepared.Sequence}\`);
    console.log(\`あなたのアドレス: \${sender.address}\`);

  }

  await client.disconnect();
}

createTimeLockedEscrow();`,
            zh: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");

async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // .env 中的 CASH 账户接收资金
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // Ripple Epoch：自 2000/01/01 00:00:00 UTC 起的秒数
  // 与 Unix Epoch 相差 946684800 秒
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const now = Math.floor(Date.now() / 1000);

  // FinishAfter：2 分钟后
  const finishAfter = now - RIPPLE_EPOCH_OFFSET + 2 * 60;
  // CancelAfter：24 小时后（若无人完成，可取消）
  const cancelAfter = now - RIPPLE_EPOCH_OFFSET + 24 * 60 * 60;

  const escrowCreate = {
    TransactionType: "EscrowCreate",
    Account: sender.address,
    Destination: receiver,
    Amount: xahToDrops(10), // 锁定 10 XAH
    FinishAfter: finishAfter,
    CancelAfter: cancelAfter,
  };

  const prepared = await client.autofill(escrowCreate);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== EscrowCreate ===");
  console.log("结果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("Hash:", signed.hash);
    console.log("Sequence:", prepared.Sequence);
    console.log(
      "FinishAfter:",
      new Date((finishAfter + RIPPLE_EPOCH_OFFSET) * 1000).toISOString()
    );
    console.log(
      "CancelAfter:",
      new Date((cancelAfter + RIPPLE_EPOCH_OFFSET) * 1000).toISOString()
    );
    console.log("请保存这个 Sequence！EscrowFinish 会用到它。");
    console.log(\`Escrow Sequence: \${prepared.Sequence}\`);
    console.log(\`你的地址: \${sender.address}\`);

  }

  await client.disconnect();
}

createTimeLockedEscrow();`,
          },
        },
        {
          title: {
            es: "Completar (finish) un escrow después del tiempo de bloqueo",
            pt: "Completar (finish) um escrow depois do tempo de bloqueio",
            en: "Complete (finish) an escrow after the lock period",
            jp: "ロック期間後にエスクローを完了（finish）する",
            zh: "在锁定期结束后完成（finish）Escrow",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function finishEscrow(ownerAddress, escrowSequence) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Cualquier cuenta puede ejecutar el EscrowFinish
  const executor = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Primero, verificar que el escrow existe consultando account_objects
  const objects = await client.request({
    command: "account_objects",
    account: ownerAddress,
    type: "escrow",
    ledger_index: "validated",
  });

  const escrow = objects.result.account_objects.find(
    (obj) => obj.PreviousTxnLgrSeq !== undefined
  );

  if (!escrow) {
    console.log("No se encontró el escrow. Puede que ya haya sido completado o cancelado.");
    await client.disconnect();
    return;
  }

  console.log("=== Escrow encontrado ===");
  console.log("Amount:", Number(escrow.Amount) / 1_000_000, "XAH");
  console.log("Destination:", escrow.Destination);

  // Verificar si ya pasó el FinishAfter
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const now = Math.floor(Date.now() / 1000);
  const finishAfterUnix = escrow.FinishAfter + RIPPLE_EPOCH_OFFSET;

  if (now < finishAfterUnix) {
    const remaining = finishAfterUnix - now;
    console.log(
      \`Aún no puedes completar este escrow. Faltan \${remaining} segundos.\`
    );
    console.log(
      \`Disponible a partir de: \${new Date(finishAfterUnix * 1000).toISOString()}\`
    );
    await client.disconnect();
    return;
  }

  console.log("El tiempo de bloqueo ha pasado. Completando escrow...");

  const escrowFinish = {
    TransactionType: "EscrowFinish",
    Account: executor.address,
    Owner: ownerAddress,
    OfferSequence: escrowSequence,
  };

  const prepared = await client.autofill(escrowFinish);
  const signed = executor.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== EscrowFinish ===");
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("¡Escrow completado! Los fondos han sido entregados.");
    console.log("Hash:", signed.hash);
  } else if (txResult === "tecNO_TARGET") {
    console.log("El escrow no fue encontrado. Puede haber sido cancelado.");
  }

  await client.disconnect();
}

// El dueño del escrow del ejemplo anterior es WALLET
// Su Sequence, que imprimió EscrowCreate, es el primer argumento
const escrowSequence = Number(process.argv[2]);
if (!Number.isInteger(escrowSequence)) throw new Error("Pasa como primer argumento el Sequence del escrow que imprimió EscrowCreate");
finishEscrow(Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address, escrowSequence);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function finishEscrow(ownerAddress, escrowSequence) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // Qualquer conta pode executar o EscrowFinish
  const executor = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // Primeiro, verificar que o escrow existe consultando account_objects
  const objects = await client.request({
    command: "account_objects",
    account: ownerAddress,
    type: "escrow",
    ledger_index: "validated",
  });
  const escrow = objects.result.account_objects.find(
    (obj) => obj.PreviousTxnLgrSeq !== undefined
  );
  if (!escrow) {
    console.log("Não se encontrou o escrow. Pode ser que já tenha sido completado ou cancelado.");
    await client.disconnect();
    return;
  }
  console.log("=== Escrow encontrado ===");
  console.log("Amount:", Number(escrow.Amount) / 1_000_000, "XAH");
  console.log("Destination:", escrow.Destination);
  // Verificar se já passou o FinishAfter
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const now = Math.floor(Date.now() / 1000);
  const finishAfterUnix = escrow.FinishAfter + RIPPLE_EPOCH_OFFSET;
  if (now < finishAfterUnix) {
    const remaining = finishAfterUnix - now;
    console.log(
      \`Você ainda não pode completar este escrow. Faltam \${remaining} segundos.\`
    );
    console.log(
      \`Disponível a partir de: \${new Date(finishAfterUnix * 1000).toISOString()}\`
    );
    await client.disconnect();
    return;
  }
  console.log("O tempo de bloqueio já passou. Concluindo o escrow...");
  const escrowFinish = {
    TransactionType: "EscrowFinish",
    Account: executor.address,
    Owner: ownerAddress,
    OfferSequence: escrowSequence,
  };
  const prepared = await client.autofill(escrowFinish);
  const signed = executor.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  const txResult = result.result.meta.TransactionResult;
  console.log("=== EscrowFinish ===");
  console.log("Resultado:", txResult);
  if (txResult === "tesSUCCESS") {
    console.log("Escrow concluído! Os fundos foram entregues.");
    console.log("Hash:", signed.hash);
  } else if (txResult === "tecNO_TARGET") {
    console.log("O escrow não foi encontrado. Pode ter sido cancelado.");
  }
  await client.disconnect();
}
// O dono do escrow do exemplo anterior é a WALLET
// O Sequence dele, impresso pelo EscrowCreate, é o primeiro argumento
const escrowSequence = Number(process.argv[2]);
if (!Number.isInteger(escrowSequence)) throw new Error("Passe como primeiro argumento o Sequence do escrow impresso pelo EscrowCreate");
finishEscrow(Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address, escrowSequence);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function finishEscrow(ownerAddress, escrowSequence) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Any account can execute the EscrowFinish
  const executor = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // First, verify the escrow exists by querying account_objects
  const objects = await client.request({
    command: "account_objects",
    account: ownerAddress,
    type: "escrow",
    ledger_index: "validated",
  });

  const escrow = objects.result.account_objects.find(
    (obj) => obj.PreviousTxnLgrSeq !== undefined
  );

  if (!escrow) {
    console.log("Escrow not found. It may have already been completed or cancelled.");
    await client.disconnect();
    return;
  }

  console.log("=== Escrow found ===");
  console.log("Amount:", Number(escrow.Amount) / 1_000_000, "XAH");
  console.log("Destination:", escrow.Destination);

  // Check whether FinishAfter has already passed
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const now = Math.floor(Date.now() / 1000);
  const finishAfterUnix = escrow.FinishAfter + RIPPLE_EPOCH_OFFSET;

  if (now < finishAfterUnix) {
    const remaining = finishAfterUnix - now;
    console.log(
      \`Cannot finish this escrow yet. \${remaining} seconds remaining.\`
    );
    console.log(
      \`Available from: \${new Date(finishAfterUnix * 1000).toISOString()}\`
    );
    await client.disconnect();
    return;
  }

  console.log("The lock period has passed. Finishing escrow...");

  const escrowFinish = {
    TransactionType: "EscrowFinish",
    Account: executor.address,
    Owner: ownerAddress,
    OfferSequence: escrowSequence,
  };

  const prepared = await client.autofill(escrowFinish);
  const signed = executor.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== EscrowFinish ===");
  console.log("Result:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("Escrow finished! Funds have been delivered.");
    console.log("Hash:", signed.hash);
  } else if (txResult === "tecNO_TARGET") {
    console.log("Escrow not found. It may have been cancelled.");
  }

  await client.disconnect();
}

// The owner of the escrow from the previous example is WALLET
// Its Sequence, printed by EscrowCreate, is the first argument
const escrowSequence = Number(process.argv[2]);
if (!Number.isInteger(escrowSequence)) throw new Error("Pass the escrow Sequence printed by EscrowCreate as the first argument");
finishEscrow(Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address, escrowSequence);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function finishEscrow(ownerAddress, escrowSequence) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 任意のアカウントがEscrowFinishを実行できます
  const executor = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // まず、account_objectsを照会してエスクローが存在することを確認
  const objects = await client.request({
    command: "account_objects",
    account: ownerAddress,
    type: "escrow",
    ledger_index: "validated",
  });

  const escrow = objects.result.account_objects.find(
    (obj) => obj.PreviousTxnLgrSeq !== undefined
  );

  if (!escrow) {
    console.log("エスクローが見つかりません。すでに完了またはキャンセルされた可能性があります。");
    await client.disconnect();
    return;
  }

  console.log("=== エスクロー検出 ===");
  console.log("Amount:", Number(escrow.Amount) / 1_000_000, "XAH");
  console.log("Destination:", escrow.Destination);

  // FinishAfterが既に過ぎているか確認
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const now = Math.floor(Date.now() / 1000);
  const finishAfterUnix = escrow.FinishAfter + RIPPLE_EPOCH_OFFSET;

  if (now < finishAfterUnix) {
    const remaining = finishAfterUnix - now;
    console.log(
      \`このエスクローはまだ完了できません。残り\${remaining}秒。\`
    );
    console.log(
      \`利用可能時刻: \${new Date(finishAfterUnix * 1000).toISOString()}\`
    );
    await client.disconnect();
    return;
  }

  console.log("ロック期間が経過しました。エスクローを完了しています...");

  const escrowFinish = {
    TransactionType: "EscrowFinish",
    Account: executor.address,
    Owner: ownerAddress,
    OfferSequence: escrowSequence,
  };

  const prepared = await client.autofill(escrowFinish);
  const signed = executor.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== EscrowFinish ===");
  console.log("結果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("エスクロー完了！資金が送付されました。");
    console.log("Hash:", signed.hash);
  } else if (txResult === "tecNO_TARGET") {
    console.log("エスクローが見つかりません。キャンセルされた可能性があります。");
  }

  await client.disconnect();
}

// 前の例の escrow の所有者は WALLET です
// EscrowCreate が表示した Sequence を最初の引数として渡します
const escrowSequence = Number(process.argv[2]);
if (!Number.isInteger(escrowSequence)) throw new Error("EscrowCreate が表示した escrow の Sequence を最初の引数として渡してください");
finishEscrow(Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address, escrowSequence);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function finishEscrow(ownerAddress, escrowSequence) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 任何账户都可以执行 EscrowFinish
  const executor = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 先查询 account_objects，确认 escrow 仍然存在
  const objects = await client.request({
    command: "account_objects",
    account: ownerAddress,
    type: "escrow",
    ledger_index: "validated",
  });

  const escrow = objects.result.account_objects.find(
    (obj) => obj.PreviousTxnLgrSeq !== undefined
  );

  if (!escrow) {
    console.log("未找到 escrow。它可能已经完成或被取消。");
    await client.disconnect();
    return;
  }

  console.log("=== 找到 Escrow ===");
  console.log("Amount:", Number(escrow.Amount) / 1_000_000, "XAH");
  console.log("Destination:", escrow.Destination);

  // 检查是否已经过了 FinishAfter
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const now = Math.floor(Date.now() / 1000);
  const finishAfterUnix = escrow.FinishAfter + RIPPLE_EPOCH_OFFSET;

  if (now < finishAfterUnix) {
    const remaining = finishAfterUnix - now;
    console.log(
      \`现在还不能完成这个 escrow。还需等待 \${remaining} 秒。\`
    );
    console.log(
      \`可执行时间: \${new Date(finishAfterUnix * 1000).toISOString()}\`
    );
    await client.disconnect();
    return;
  }

  console.log("锁定时间已过，正在完成 escrow...");

  const escrowFinish = {
    TransactionType: "EscrowFinish",
    Account: executor.address,
    Owner: ownerAddress,
    OfferSequence: escrowSequence,
  };

  const prepared = await client.autofill(escrowFinish);
  const signed = executor.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== EscrowFinish ===");
  console.log("结果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("Escrow 已完成，资金已发送给接收方。");
    console.log("Hash:", signed.hash);
  } else if (txResult === "tecNO_TARGET") {
    console.log("未找到该 escrow，可能已经被取消。");
  }

  await client.disconnect();
}

// 上一个示例中 escrow 的所有者是 WALLET
// 它的 Sequence 由 EscrowCreate 打印，作为第一个参数传入
const escrowSequence = Number(process.argv[2]);
if (!Number.isInteger(escrowSequence)) throw new Error("请将 EscrowCreate 打印的 escrow Sequence 作为第一个参数传入");
finishEscrow(Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address, escrowSequence);`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es un Escrow?", pt: "O que é um Escrow?", en: "What is an Escrow?", jp: "エスクローとは？", zh: "什么是 Escrow？" },
          content: {
            es: "Pago condicional que bloquea fondos\n\n• Bloqueo temporal (FinishAfter)\n• Cancelación automática (CancelAfter)\n• Condición criptográfica (Condition)\n\nUsos: pagos programados, vesting, atomic swaps",
            pt: "Pagamento condicional que bloqueia fundos\n\n• Bloqueo temporal (FinishAfter)\n• Cancelamento automática (CancelAfter)\n• Condição criptográfica (Condition)\n\nUsos: pagamentos programados, vesting, atomic swaps",
            en: "Conditional payment that locks funds\n\n• Time lock (FinishAfter)\n• Automatic cancellation (CancelAfter)\n• Cryptographic condition (Condition)\n\nUses: scheduled payments, vesting, atomic swaps",
            jp: "資金をロックする条件付き支払い\n\n• 時間ロック（FinishAfter）\n• 自動キャンセル（CancelAfter）\n• 暗号条件（Condition）\n\n用途：スケジュール支払い、ベスティング、アトミックスワップ",
            zh: "锁定资金的条件支付\n\n• 时间锁（FinishAfter）\n• 自动取消（CancelAfter）\n• 加密条件（Condition）\n\n用途：预约付款、归属期发放、原子交换",
          },
          visual: "🔐",
        },
        {
          title: { es: "Ciclo de vida del Escrow", pt: "Ciclo de vida do Escrow", en: "Escrow lifecycle", jp: "エスクローのライフサイクル", zh: "Escrow 生命周期" },
          content: {
            es: "1. EscrowCreate → Bloquea los fondos\n     ↓ (pasa el tiempo)\n2. EscrowFinish → Libera al destinatario\n     ó\n2. EscrowCancel → Devuelve al creador\n\n• FinishAfter debe pasar antes de Finish\n• CancelAfter debe pasar antes de Cancel",
            pt: "1. EscrowCreate → Bloqueia os fundos\n     ↓ (passa o tempo)\n2. EscrowFinish → Libera ao destinatário\n     ou\n2. EscrowCancel → Retorna ao criador\n\n• FinishAfter deve passar antes de Finish\n• CancelAfter deve passar antes de Cancel",
            en: "1. EscrowCreate → Locks the funds\n     ↓ (time passes)\n2. EscrowFinish → Releases to recipient\n     or\n2. EscrowCancel → Returns to creator\n\n• FinishAfter must pass before Finish\n• CancelAfter must pass before Cancel",
            jp: "1. EscrowCreate → 資金をロック\n     ↓ （時間経過）\n2. EscrowFinish → 受取人にリリース\n     または\n2. EscrowCancel → 作成者に返還\n\n• Finish前にFinishAfterが必要\n• Cancel前にCancelAfterが必要",
            zh: "1. EscrowCreate → 锁定资金\n     ↓（等待时间经过）\n2. EscrowFinish → 释放给接收方\n     或\n2. EscrowCancel → 退还给创建者\n\n• 必须先过 FinishAfter 才能 Finish\n• 必须先过 CancelAfter 才能 Cancel",
          },
          visual: "⏳",
        },
        {
          title: { es: "Crypto-condiciones", pt: "Crypto-conditions", en: "Crypto-conditions", jp: "暗号条件", zh: "加密条件" },
          content: {
            es: "Escrows con prueba criptográfica:\n\n• Condition = hash SHA-256\n• Fulfillment = preimagen secreta\n• Solo quien conozca el secreto puede completar\n• Basado en Interledger Protocol\n\nIdeal para intercambios trustless entre partes",
            pt: "Escrows com prova criptográfica:\n\n• Condition = hash SHA-256\n• Fulfillment = pré-imagem secreta\n• Apenas quem conhece o segredo pode completar\n• Baseado em Interledger Protocol\n\nIdeal para trocas trustless entre partes",
            en: "Escrows with cryptographic proof:\n\n• Condition = SHA-256 hash\n• Fulfillment = secret preimage\n• Only those who know the secret can complete\n• Based on Interledger Protocol\n\nIdeal for trustless exchanges between parties",
            jp: "暗号証明付きエスクロー：\n\n• Condition = SHA-256ハッシュ\n• Fulfillment = 秘密のプリイメージ\n• 秘密を知る者だけが完了可能\n• Interledgerプロトコルに基づく\n\n当事者間のトラストレス交換に最適",
            zh: "带加密证明的 Escrow：\n\n• Condition = SHA-256 哈希\n• Fulfillment = 秘密原像\n• 只有知道秘密的人才能完成\n• 基于 Interledger 协议\n\n适合双方互不信任的交换场景",
          },
          visual: "🔑",
        },
      ],
    },
    {
      id: "m10l2",
      title: {
        es: "Cheques: pagos diferidos",
        pt: "Cheques: pagamentos diferidos",
        en: "Checks: Deferred Payments",
        jp: "チェック：遅延支払い",
        ko: "Checks: 지연 결제",
        zh: "Checks：延迟支付",
      },
      theory: {
        es: `Un **Check** (cheque) es similar a un cheque bancario tradicional: el emisor crea un cheque por una cantidad determinada, y el receptor puede cobrarlo cuando lo desee. A diferencia de un pago directo, los fondos **no se transfieren inmediatamente**, el receptor debe ejecutar una acción para cobrar el cheque.

### ¿Por qué usar Cheques en lugar de pagos directos?

- **El receptor controla cuándo cobra**: Útil cuando el receptor quiere decidir el momento exacto
- **No requiere que el receptor esté activo**: El cheque queda en el ledger esperando a ser cobrado
- **Permite pagos parciales**: El receptor puede cobrar menos de la cantidad total del cheque
- **Soporta XAH nativo e IOUs**: Puedes crear cheques tanto en XAH como en tokens

### CheckCreate: crear un cheque

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"CheckCreate"\` |
| \`Account\` | Cuenta que emite el cheque |
| \`Destination\` | Cuenta que puede cobrar el cheque |
| \`SendMax\` | Cantidad máxima que se puede cobrar |
| \`Expiration\` | (Opcional) Timestamp tras el cual el cheque caduca |
| \`InvoiceID\` | (Opcional) Hash de 256 bits para identificar el motivo del cheque |

\`SendMax\` puede ser un string (drops de XAH) o un objeto Amount para IOUs:
\`\`\`
// Cheque en XAH nativo
"SendMax": "10000000"  // 10 XAH en drops

// Cheque en IOU
"SendMax": {
  "currency": "USD",
  "issuer": "rDireccionDelEmisorDelToken",
  "value": "100"
}
\`\`\`

### CheckCash: cobrar un cheque

El receptor cobra el cheque con \`CheckCash\`. Tiene dos modos:

1. **Amount**: Cobra una cantidad exacta (debe ser ≤ SendMax)
2. **DeliverMin**: Cobra al menos esta cantidad (útil con IOUs cuyo valor puede fluctuar)

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"CheckCash"\` |
| \`Account\` | Cuenta del receptor (quien cobra) |
| \`CheckID\` | ID del cheque en el ledger |
| \`Amount\` | Cantidad exacta a cobrar (opción 1) |
| \`DeliverMin\` | Cantidad mínima aceptable (opción 2) |

**Importante**: Debes usar \`Amount\` **o** \`DeliverMin\`, nunca ambos.

### CheckCancel: cancelar un cheque

Cualquiera de las dos partes (emisor o receptor) puede cancelar un cheque. También se puede cancelar un cheque expirado.

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"CheckCancel"\` |
| \`Account\` | Cuenta que ejecuta la cancelación |
| \`CheckID\` | ID del cheque a cancelar |

### Errores comunes

- \`tecNO_ENTRY\`: El CheckID no existe (ya fue cobrado o cancelado)
- \`tecNO_LINE\`: Para IOUs, el receptor no tiene TrustLine con el emisor del token
- \`tecUNFUNDED\`: El emisor del cheque no tiene fondos suficientes al momento de cobrar
- \`tecEXPIRED\`: El cheque ha expirado

### Ejecutar los scripts de esta lección

El script de CheckCreate firma con \`WALLET_SEED\` y extiende el Check a la cuenta \`CASH_SEED\`; \`cash-check.js\` firma con \`CASH_SEED\`, que crea \`create-accounts.js\` ([módulo 3](?m=3&l=1)). El primer script imprime el comando exacto para el segundo. Salida en testnet:

\`\`\`
=== CheckCreate ===
Result: tesSUCCESS
CheckID: CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A
Cash it as CASH with: node cash-check.js CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A

=== CheckCash ===
Result: tesSUCCESS
Check cashed successfully!
Amount received: 50 XAH
\`\`\`

- **CheckCreate \`tesSUCCESS\`**: ahora existe un objeto Check; todavía no se ha movido XAH. Su **CheckID** es el índice de ese objeto en el ledger.
- **CheckCash \`tesSUCCESS\`**: CASH cobró exactamente 50 XAH y el objeto Check se eliminó. Cobrarlo otra vez devuelve \`tecNO_ENTRY\`.

\`cash-check.js\` no envía nada sin un CheckID hex de 64 caracteres y dice qué pasar.`,
        pt: `Um **Check** (cheque) é similar a um cheque bancário tradicional: o emissor cria um cheque por uma quantidade determinada, e o receptor pode cobrá-lo quando quiser. Diferentemente de um pagamento direto, os fundos **não são transferidos imediatamente**, o receptor deve executar uma accioun para cobrar o cheque.
### Por que usar Cheques em vez de pagamentos diretos?
- **O receptor controla quando cobra**: Útil quando o receptor quer decidir o momento exato
- **Não exige que o receptor esteja ativo**: O cheque fica no ledger esperando a ser cobrado
- **Permite pagamentos parciais**: O receptor pode cobrar menos da quantidade total do cheque
- **Suporta XAH nativo e IOUs**: Você pode criar cheques tanto em XAH como em tokens
### CheckCreate: criar um cheque
| Campo | Descrição |
|---|---|
| \`TransactionType\` | \`"CheckCreate"\` |
| \`Account\` | Conta que emite o cheque |
| \`Destination\` | Conta que pode cobrar o cheque |
| \`SendMax\` | Quantidade máxima que se pode cobrar |
| \`Expiration\` | (Opcional) Timestamp após o qual o cheque expira |
| \`InvoiceID\` | (Opcional) Hash de 256 bits para identificar o motivo do cheque |
\`SendMax\` pode ser um string (drops de XAH) ou um objeto Amount para IOUs:
\`\`\`
// Cheque em XAH nativo
"SendMax": "10000000"  // 10 XAH em drops
// Cheque em IOU
"SendMax": {
  "currency": "USD",
  "issuer": "rDireccionDelEmisorDelToken",
  "value": "100"
}
\`\`\`
### CheckCash: cobrar um cheque
O receptor cobra o cheque com \`CheckCash\`. Tem dois modos:
1. **Amount**: Cobra uma quantidade exata (deve ser ≤ SendMax)
2. **DeliverMin**: Cobra ao menos esta quantidade (útil com IOUs cujo valor pode flutuar)
| Campo | Descrição |
|---|---|
| \`TransactionType\` | \`"CheckCash"\` |
| \`Account\` | Conta do receptor (quem cobra) |
| \`CheckID\` | ID do cheque no ledger |
| \`Amount\` | Quantidade exactà cobrar (opcioun 1) |
| \`DeliverMin\` | Quantidade mínima aceitable (opcioun 2) |
**Importante**: Você deve usar \`Amount\` **ou** \`DeliverMin\`, nunca ambos.
### CheckCancel: cancelar um cheque
Qualquer uma das duas partes (emissor ou destinatário) pode cancelar um cheque. Também é possível cancelar um cheque expirado.
| Campo | Descrição |
|---|---|
| \`TransactionType\` | \`"CheckCancel"\` |
| \`Account\` | Conta que executa a cancelacioun |
| \`CheckID\` | ID do cheque a cancelar |
### Erros comuns
- \`tecNO_ENTRY\`: o CheckID não existe (já foi descontado ou cancelado)
- \`tecNO_LINE\`: Para IOUs, o receptor não tem TrustLine com o emissor do token
- \`tecUNFUNDED\`: O emissor do cheque não tem fundos suficientes ao momento de cobrar
- \`tecEXPIRED\`: o cheque expirou

### Executar os scripts desta lição

O script de CheckCreate assina com \`WALLET_SEED\` e emite o Check para a conta \`CASH_SEED\`; \`cash-check.js\` assina com \`CASH_SEED\`, criada por \`create-accounts.js\` ([módulo 3](?m=3&l=1)). O primeiro script imprime o comando exato para o segundo. Saída na testnet:

\`\`\`
=== CheckCreate ===
Result: tesSUCCESS
CheckID: CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A
Cash it as CASH with: node cash-check.js CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A

=== CheckCash ===
Result: tesSUCCESS
Check cashed successfully!
Amount received: 50 XAH
\`\`\`

- **CheckCreate \`tesSUCCESS\`**: agora existe um objeto Check; nenhum XAH se moveu ainda. Seu **CheckID** é o índice desse objeto no ledger.
- **CheckCash \`tesSUCCESS\`**: a CASH descontou exatamente 50 XAH e o objeto Check foi removido. Descontá-lo de novo retorna \`tecNO_ENTRY\`.

\`cash-check.js\` não envia nada sem um CheckID hex de 64 caracteres e diz o que passar.`,
        en: `A **Check** is similar to a traditional bank check: the sender creates a check for a certain amount, and the recipient can cash it whenever they wish. Unlike a direct payment, funds are **not transferred immediately** — the recipient must take action to cash the check.

### Why use Checks instead of direct payments?

- **The recipient controls when they cash it**: Useful when the recipient wants to decide the exact timing
- **Does not require the recipient to be active**: The check stays in the ledger waiting to be cashed
- **Allows partial payments**: The recipient can cash less than the total check amount
- **Supports native XAH and IOUs**: You can create checks in both XAH and tokens

### CheckCreate: creating a check

| Field | Description |
|---|---|
| \`TransactionType\` | \`"CheckCreate"\` |
| \`Account\` | Account issuing the check |
| \`Destination\` | Account that can cash the check |
| \`SendMax\` | Maximum amount that can be cashed |
| \`Expiration\` | (Optional) Timestamp after which the check expires |
| \`InvoiceID\` | (Optional) 256-bit hash to identify the purpose of the check |

\`SendMax\` can be a string (XAH drops) or an Amount object for IOUs:
\`\`\`
// Check in native XAH
"SendMax": "10000000"  // 10 XAH in drops

// Check in IOU
"SendMax": {
  "currency": "USD",
  "issuer": "rTokenIssuerAddress",
  "value": "100"
}
\`\`\`

### CheckCash: cashing a check

The recipient cashes the check with \`CheckCash\`. It has two modes:

1. **Amount**: Cash an exact amount (must be ≤ SendMax)
2. **DeliverMin**: Cash at least this amount (useful with IOUs whose value may fluctuate)

| Field | Description |
|---|---|
| \`TransactionType\` | \`"CheckCash"\` |
| \`Account\` | Recipient account (the one cashing) |
| \`CheckID\` | ID of the check in the ledger |
| \`Amount\` | Exact amount to cash (option 1) |
| \`DeliverMin\` | Minimum acceptable amount (option 2) |

**Important**: You must use \`Amount\` **or** \`DeliverMin\`, never both.

### CheckCancel: cancelling a check

Either party (sender or recipient) can cancel a check. An expired check can also be cancelled.

| Field | Description |
|---|---|
| \`TransactionType\` | \`"CheckCancel"\` |
| \`Account\` | Account executing the cancellation |
| \`CheckID\` | ID of the check to cancel |

### Common errors

- \`tecNO_ENTRY\`: The CheckID does not exist (already cashed or cancelled)
- \`tecNO_LINE\`: For IOUs, the recipient has no TrustLine with the token issuer
- \`tecUNFUNDED\`: The check issuer has insufficient funds at the time of cashing
- \`tecEXPIRED\`: The check has expired

### Run this lesson's scripts

The CheckCreate script signs with \`WALLET_SEED\` and writes the Check to the \`CASH_SEED\` account; \`cash-check.js\` signs with \`CASH_SEED\`, created by \`create-accounts.js\` ([Module 3](?m=3&l=1)). The first script prints the exact command for the second. Output on testnet:

\`\`\`
=== CheckCreate ===
Result: tesSUCCESS
CheckID: CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A
Cash it as CASH with: node cash-check.js CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A

=== CheckCash ===
Result: tesSUCCESS
Check cashed successfully!
Amount received: 50 XAH
\`\`\`

- **CheckCreate \`tesSUCCESS\`**: a Check object now exists; no XAH has moved yet. Its **CheckID** is the ledger index of that object.
- **CheckCash \`tesSUCCESS\`**: CASH claimed exactly 50 XAH and the Check object was removed. Cashing it again returns \`tecNO_ENTRY\`.

\`cash-check.js\` refuses to submit without a 64-character hex CheckID and says what to pass.`,
        jp: `**チェック**は従来の銀行小切手に似ています。送信者は特定の金額のチェックを作成し、受取人はいつでも換金できます。直接支払いとは異なり、資金は**即座に転送されません**。受取人がチェックを換金するための行動を取る必要があります。

### 直接支払いの代わりにチェックを使う理由は？

- **受取人が換金タイミングをコントロール**：受取人が正確な時期を決めたい場合に便利
- **受取人がアクティブである必要がない**：チェックは換金を待ってレジャーに残ります
- **部分支払いが可能**：受取人はチェックの合計金額より少ない金額を換金できます
- **ネイティブXAHとIOUをサポート**：XAHとトークンの両方でチェックを作成できます

### CheckCreate：チェックの作成

| フィールド | 説明 |
|---|---|
| \`TransactionType\` | \`"CheckCreate"\` |
| \`Account\` | チェックを発行するアカウント |
| \`Destination\` | チェックを換金できるアカウント |
| \`SendMax\` | 換金可能な最大金額 |
| \`Expiration\` | （オプション）チェックが失効するタイムスタンプ |
| \`InvoiceID\` | （オプション）チェックの目的を識別する256ビットのハッシュ |

\`SendMax\`はIOUの場合、文字列（XAH drops）またはAmountオブジェクトになります。
\`\`\`
// ネイティブXAHのチェック
"SendMax": "10000000"  // 10 XAH（drops単位）

// IOUのチェック
"SendMax": {
  "currency": "USD",
  "issuer": "rTokenIssuerAddress",
  "value": "100"
}
\`\`\`

### CheckCash：チェックの換金

受取人は\`CheckCash\`でチェックを換金します。次の2つのモードが存在します。

1. **Amount**：正確な金額を換金（SendMax以下でなければなりません）
2. **DeliverMin**：少なくともこの金額を換金（価値が変動する可能性のあるIOUで便利）

| フィールド | 説明 |
|---|---|
| \`TransactionType\` | \`"CheckCash"\` |
| \`Account\` | 受取アカウント（換金する側） |
| \`CheckID\` | レジャー内のチェックのID |
| \`Amount\` | 換金する正確な金額（オプション1） |
| \`DeliverMin\` | 最低許容金額（オプション2） |

**重要**：\`Amount\`**または**\`DeliverMin\`を使用し、両方は使用しないでください。

### CheckCancel：チェックのキャンセル

どちらの当事者（送信者または受取人）もチェックをキャンセルできます。期限切れのチェックもキャンセルできます。

| フィールド | 説明 |
|---|---|
| \`TransactionType\` | \`"CheckCancel"\` |
| \`Account\` | キャンセルを実行するアカウント |
| \`CheckID\` | キャンセルするチェックのID |

### よくあるエラー

- \`tecNO_ENTRY\`：CheckIDが存在しません（すでに換金またはキャンセル済み）
- \`tecNO_LINE\`：IOUの場合、受取人がトークン発行者とのTrustLineを持っていません
- \`tecUNFUNDED\`：換金時にチェック発行者の残高が不足しています
- \`tecEXPIRED\`：チェックが失効しています

### このレッスンのスクリプトを実行する

CheckCreate スクリプトは \`WALLET_SEED\` で署名し、\`CASH_SEED\` のアカウント宛てに Check を振り出します。\`cash-check.js\` は\`create-accounts.js\`（[モジュール3](?m=3&l=1)）が作成する \`CASH_SEED\` で署名します。1つ目のスクリプトが2つ目の正確なコマンドを表示します。テストネットでの出力:

\`\`\`
=== CheckCreate ===
Result: tesSUCCESS
CheckID: CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A
Cash it as CASH with: node cash-check.js CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A

=== CheckCash ===
Result: tesSUCCESS
Check cashed successfully!
Amount received: 50 XAH
\`\`\`

- **CheckCreate の \`tesSUCCESS\`**: Check オブジェクトができましたが、XAH はまだ動いていません。**CheckID** はそのオブジェクトのレジャーインデックスです。
- **CheckCash の \`tesSUCCESS\`**: CASH がちょうど 50 XAH を受け取り、Check オブジェクトは削除されました。もう一度換金すると \`tecNO_ENTRY\` が返ります。

\`cash-check.js\` は64文字の hex CheckID がなければ送信せず、渡すべき値を表示します。`,
        ko: `**Check**는 은행 수표처럼 발행자가 금액을 약속하고, 수신자가 나중에 이를 현금화하는 방식입니다. 즉시 송금과 달리 수신자가 실행 시점을 결정합니다.

### 장점

- 수신자가 원하는 시점에 현금화 가능
- 부분 현금화 지원
- XAH와 IOU 모두 가능
- 수신자가 즉시 온라인일 필요 없음

### 관련 트랜잭션

- \`CheckCreate\`
- \`CheckCash\`
- \`CheckCancel\`

즉시 결제보다 유연하지만, 만료와 잔액 상태를 함께 관리해야 합니다.

### 이 레슨의 스크립트 실행

CheckCreate 스크립트는 \`WALLET_SEED\`로 서명해 \`CASH_SEED\` 계정 앞으로 Check를 발행하고, \`cash-check.js\`는 \`create-accounts.js\`([모듈 3](?m=3&l=1))가 만든 \`CASH_SEED\`로 서명합니다. 첫 번째 스크립트가 두 번째 스크립트의 정확한 명령을 출력합니다. 테스트넷 출력:

\`\`\`
=== CheckCreate ===
Result: tesSUCCESS
CheckID: CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A
Cash it as CASH with: node cash-check.js CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A

=== CheckCash ===
Result: tesSUCCESS
Check cashed successfully!
Amount received: 50 XAH
\`\`\`

- **CheckCreate \`tesSUCCESS\`**: 이제 Check 객체가 있지만 아직 XAH는 움직이지 않았습니다. **CheckID**는 그 객체의 레저 인덱스입니다.
- **CheckCash \`tesSUCCESS\`**: CASH가 정확히 50 XAH를 받았고 Check 객체는 삭제되었습니다. 다시 현금화하면 \`tecNO_ENTRY\`가 반환됩니다.

\`cash-check.js\`는 64자 hex CheckID가 없으면 제출하지 않고 무엇을 전달해야 하는지 알려 줍니다.`,
        zh: `**Check** 类似银行支票：发送方承诺一笔金额，接收方稍后再去兑现。与即时转账不同，兑现时机由接收方决定。

### 优点

- 接收方可以自行决定兑现时间
- 支持部分兑现
- 同时支持 XAH 和 IOU
- 接收方不必当下在线

### 相关交易

- \`CheckCreate\`
- \`CheckCash\`
- \`CheckCancel\`

它比即时支付更灵活，但也需要一起管理到期时间和余额状态。

### 运行本课的脚本

CheckCreate 脚本用 \`WALLET_SEED\` 签名，向 \`CASH_SEED\` 账户开出 Check；\`cash-check.js\` 用由 \`create-accounts.js\`（[模块3](?m=3&l=1)） 创建的 \`CASH_SEED\` 签名。第一个脚本会打印第二个脚本的确切命令。测试网上的输出：

\`\`\`
=== CheckCreate ===
Result: tesSUCCESS
CheckID: CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A
Cash it as CASH with: node cash-check.js CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A

=== CheckCash ===
Result: tesSUCCESS
Check cashed successfully!
Amount received: 50 XAH
\`\`\`

- **CheckCreate \`tesSUCCESS\`**：现在有了一个 Check 对象，但还没有任何 XAH 转移。它的 **CheckID** 就是该对象在账本中的索引。
- **CheckCash \`tesSUCCESS\`**：CASH 恰好领取了 50 XAH，Check 对象被删除。再次兑现会返回 \`tecNO_ENTRY\`。

没有 64 字符的 hex CheckID 时，\`cash-check.js\` 不会提交，并说明应传入什么。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear un cheque",
            pt: "Criar um cheque",
            en: "Create a check",
            jp: "チェックの作成",
            zh: "创建 Check",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
if (!process.env.CASH_SEED) throw new Error("CASH_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
const { Client, Wallet, xahToDrops } = require("xahau");

async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // === 1. Crear el cheque ===
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const expiration = Math.floor(Date.now() / 1000) - RIPPLE_EPOCH_OFFSET + 7 * 24 * 60 * 60; // Expira en 7 días

  const checkCreate = {
    TransactionType: "CheckCreate",
    Account: sender.address,
    Destination: receiverAddress,
    SendMax: xahToDrops(50), // Hasta 50 XAH
    Expiration: expiration,
  };

  const prepared = await client.autofill(checkCreate);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("=== CheckCreate ===");
  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    // Buscar el CheckID en los nodos afectados
    const createdNode = result.result.meta.AffectedNodes.find(
      (node) => node.CreatedNode && node.CreatedNode.LedgerEntryType === "Check"
    );

    if (createdNode) {
      const checkID = createdNode.CreatedNode.LedgerIndex;
      console.log("CheckID:", checkID);
      console.log("Cóbralo como CASH con:", "node cash-check.js " + checkID);
    }
  }

  await client.disconnect();
}

checkExample();`,
            pt: `require("dotenv").config();
if (!process.env.CASH_SEED) throw new Error("CASH_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
const { Client, Wallet, xahToDrops } = require("xahau");
async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;
  // === 1. Criar o cheque ===
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const expiration = Math.floor(Date.now() / 1000) - RIPPLE_EPOCH_OFFSET + 7 * 24 * 60 * 60; // Expira em 7 dias
  const checkCreate = {
    TransactionType: "CheckCreate",
    Account: sender.address,
    Destination: receiverAddress,
    SendMax: xahToDrops(50), // Até 50 XAH
    Expiration: expiration,
  };
  const prepared = await client.autofill(checkCreate);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("=== CheckCreate ===");
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    // Buscar o CheckID nos nós afetados
    const createdNode = result.result.meta.AffectedNodes.find(
      (node) => node.CreatedNode && node.CreatedNode.LedgerEntryType === "Check"
    );
    if (createdNode) {
      const checkID = createdNode.CreatedNode.LedgerIndex;
      console.log("CheckID:", checkID);
      console.log("Desconte-o como CASH com:", "node cash-check.js " + checkID);
    }
  }
  await client.disconnect();
}
checkExample();`,
            en: `require("dotenv").config();
if (!process.env.CASH_SEED) throw new Error("CASH_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
const { Client, Wallet, xahToDrops } = require("xahau");

async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // === 1. Create the check ===
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const expiration = Math.floor(Date.now() / 1000) - RIPPLE_EPOCH_OFFSET + 7 * 24 * 60 * 60; // Expires in 7 days

  const checkCreate = {
    TransactionType: "CheckCreate",
    Account: sender.address,
    Destination: receiverAddress,
    SendMax: xahToDrops(50), // Up to 50 XAH
    Expiration: expiration,
  };

  const prepared = await client.autofill(checkCreate);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("=== CheckCreate ===");
  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    // Find the CheckID in the affected nodes
    const createdNode = result.result.meta.AffectedNodes.find(
      (node) => node.CreatedNode && node.CreatedNode.LedgerEntryType === "Check"
    );

    if (createdNode) {
      const checkID = createdNode.CreatedNode.LedgerIndex;
      console.log("CheckID:", checkID);
      console.log("Cash it as CASH with:", "node cash-check.js " + checkID);
    }
  }

  await client.disconnect();
}

checkExample();`,
            jp: `require("dotenv").config();
if (!process.env.CASH_SEED) throw new Error("CASH_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
const { Client, Wallet, xahToDrops } = require("xahau");

async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // === 1. チェックの作成 ===
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const expiration = Math.floor(Date.now() / 1000) - RIPPLE_EPOCH_OFFSET + 7 * 24 * 60 * 60; // 7日後に失効

  const checkCreate = {
    TransactionType: "CheckCreate",
    Account: sender.address,
    Destination: receiverAddress,
    SendMax: xahToDrops(50), // 最大50 XAH
    Expiration: expiration,
  };

  const prepared = await client.autofill(checkCreate);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("=== CheckCreate ===");
  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    // 影響を受けたノードからCheckIDを検索
    const createdNode = result.result.meta.AffectedNodes.find(
      (node) => node.CreatedNode && node.CreatedNode.LedgerEntryType === "Check"
    );

    if (createdNode) {
      const checkID = createdNode.CreatedNode.LedgerIndex;
      console.log("CheckID:", checkID);
      console.log("CASH として換金するには:", "node cash-check.js " + checkID);
    }
  }

  await client.disconnect();
}

checkExample();`,
            zh: `require("dotenv").config();
if (!process.env.CASH_SEED) throw new Error("CASH_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
const { Client, Wallet, xahToDrops } = require("xahau");

async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // === 1. 创建 Check ===
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const expiration = Math.floor(Date.now() / 1000) - RIPPLE_EPOCH_OFFSET + 7 * 24 * 60 * 60; // 7 天后过期

  const checkCreate = {
    TransactionType: "CheckCreate",
    Account: sender.address,
    Destination: receiverAddress,
    SendMax: xahToDrops(50), // 最多 50 XAH
    Expiration: expiration,
  };

  const prepared = await client.autofill(checkCreate);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("=== CheckCreate ===");
  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    // 在受影响节点中查找 CheckID
    const createdNode = result.result.meta.AffectedNodes.find(
      (node) => node.CreatedNode && node.CreatedNode.LedgerEntryType === "Check"
    );

    if (createdNode) {
      const checkID = createdNode.CreatedNode.LedgerIndex;
      console.log("CheckID:", checkID);
      console.log("以 CASH 身份兑现：", "node cash-check.js " + checkID);
    }
  }

  await client.disconnect();
}

checkExample();`,
          },
        },
        {
          title: {
            es: "Cobrar (cash) un cheque recibido",
            pt: "Cobrar (cash) um cheque recibido",
            en: "Cash (collect) a received check",
            jp: "受け取ったチェックを換金（cash）する",
            zh: "兑现收到的 Check",
          },
          language: "javascript",
          code: {
            es: `// Archivo: cash-check.js
// node cash-check.js <CheckID>
require("dotenv").config();
if (!process.env.CASH_SEED) throw new Error("CASH_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
const { Client, Wallet, xahToDrops } = require("xahau");
const checkID = process.argv[2];
if (!/^[0-9A-F]{64}$/i.test(checkID ?? "")) {
  throw new Error("Pasa el CheckID que imprimió el script de CheckCreate: node cash-check.js <CheckID>");
}

async function cashCheck(checkID) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // El receptor cobra el cheque
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'});

  // Opción 1: Cobrar una cantidad exacta
  const checkCash = {
    TransactionType: "CheckCash",
    Account: receiver.address,
    CheckID: checkID,
    Amount: xahToDrops(50), // Cobrar exactamente 50 XAH
  };

  // Opción 2 (alternativa): Cobrar al menos una cantidad mínima
  // const checkCash = {
  //   TransactionType: "CheckCash",
  //   Account: receiver.address,
  //   CheckID: checkID,
  //   DeliverMin: xahToDrops(40), // Al menos 40 XAH
  // };

  const prepared = await client.autofill(checkCash);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== CheckCash ===");
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("¡Cheque cobrado con éxito!");
    const delivered = result.result.meta.delivered_amount;
    if (typeof delivered === "string") {
      console.log("Cantidad recibida:", Number(delivered) / 1_000_000, "XAH");
    } else {
      console.log("Cantidad recibida:", delivered.value, delivered.currency);
    }
  } else if (txResult === "tecNO_ENTRY") {
    console.log("El cheque no existe. Puede haber sido cancelado o ya cobrado.");
  } else if (txResult === "tecUNFUNDED") {
    console.log("El emisor no tiene fondos suficientes.");
  }

  await client.disconnect();
}

// Usa el CheckID obtenido al crear el cheque
cashCheck(checkID);`,
            pt: `// Arquivo: cash-check.js
// node cash-check.js <CheckID>
require("dotenv").config();
if (!process.env.CASH_SEED) throw new Error("CASH_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
const { Client, Wallet, xahToDrops } = require("xahau");
const checkID = process.argv[2];
if (!/^[0-9A-F]{64}$/i.test(checkID ?? "")) {
  throw new Error("Passe o CheckID que o script de CheckCreate imprimiu: node cash-check.js <CheckID>");
}
async function cashCheck(checkID) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // O receptor cobra o cheque
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'});
  // Opcioun 1: Cobrar uma quantidade exata
  const checkCash = {
    TransactionType: "CheckCash",
    Account: receiver.address,
    CheckID: checkID,
    Amount: xahToDrops(50), // Cobrar exatamente 50 XAH
  };
  // Opcioun 2 (alternativa): Cobrar ao menos uma quantidade mínima
  // const checkCash = {
  //   TransactionType: "CheckCash",
  //   Account: receiver.address,
  //   CheckID: checkID,
  //   DeliverMin: xahToDrops(40), // Ao menos 40 XAH
  // };
  const prepared = await client.autofill(checkCash);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  const txResult = result.result.meta.TransactionResult;
  console.log("=== CheckCash ===");
  console.log("Resultado:", txResult);
  if (txResult === "tesSUCCESS") {
    console.log("Cheque descontado com sucesso!");
    const delivered = result.result.meta.delivered_amount;
    if (typeof delivered === "string") {
      console.log("Quantidade recebida:", Number(delivered) / 1_000_000, "XAH");
    } else {
      console.log("Quantidade recebida:", delivered.value, delivered.currency);
    }
  } else if (txResult === "tecNO_ENTRY") {
    console.log("O cheque não existe. Pode ter sido cancelado ou já cobrado.");
  } else if (txResult === "tecUNFUNDED") {
    console.log("O emissor não tem fundos suficientes.");
  }
  await client.disconnect();
}
// Use o CheckID obtido ao criar o cheque
cashCheck(checkID);`,
            en: `// File: cash-check.js
// node cash-check.js <CheckID>
require("dotenv").config();
if (!process.env.CASH_SEED) throw new Error("CASH_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
const { Client, Wallet, xahToDrops } = require("xahau");
const checkID = process.argv[2];
if (!/^[0-9A-F]{64}$/i.test(checkID ?? "")) {
  throw new Error("Pass the CheckID the CheckCreate script printed: node cash-check.js <CheckID>");
}

async function cashCheck(checkID) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // The recipient cashes the check
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'});

  // Option 1: Cash an exact amount
  const checkCash = {
    TransactionType: "CheckCash",
    Account: receiver.address,
    CheckID: checkID,
    Amount: xahToDrops(50), // Cash exactly 50 XAH
  };

  // Option 2 (alternative): Cash at least a minimum amount
  // const checkCash = {
  //   TransactionType: "CheckCash",
  //   Account: receiver.address,
  //   CheckID: checkID,
  //   DeliverMin: xahToDrops(40), // At least 40 XAH
  // };

  const prepared = await client.autofill(checkCash);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== CheckCash ===");
  console.log("Result:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("Check cashed successfully!");
    const delivered = result.result.meta.delivered_amount;
    if (typeof delivered === "string") {
      console.log("Amount received:", Number(delivered) / 1_000_000, "XAH");
    } else {
      console.log("Amount received:", delivered.value, delivered.currency);
    }
  } else if (txResult === "tecNO_ENTRY") {
    console.log("Check not found. It may have been cancelled or already cashed.");
  } else if (txResult === "tecUNFUNDED") {
    console.log("The check issuer has insufficient funds.");
  }

  await client.disconnect();
}

// Use the CheckID obtained when creating the check
cashCheck(checkID);`,
            jp: `// ファイル: cash-check.js
// node cash-check.js <CheckID>
require("dotenv").config();
if (!process.env.CASH_SEED) throw new Error("CASH_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
const { Client, Wallet, xahToDrops } = require("xahau");
const checkID = process.argv[2];
if (!/^[0-9A-F]{64}$/i.test(checkID ?? "")) {
  throw new Error("CheckCreate スクリプトが表示した CheckID を渡してください: node cash-check.js <CheckID>");
}

async function cashCheck(checkID) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 受取人がチェックを換金
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'});

  // オプション1: 正確な金額を換金
  const checkCash = {
    TransactionType: "CheckCash",
    Account: receiver.address,
    CheckID: checkID,
    Amount: xahToDrops(50), // 正確に50 XAHを換金
  };

  // オプション2（代替）: 最低金額以上を換金
  // const checkCash = {
  //   TransactionType: "CheckCash",
  //   Account: receiver.address,
  //   CheckID: checkID,
  //   DeliverMin: xahToDrops(40), // 少なくとも40 XAH
  // };

  const prepared = await client.autofill(checkCash);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== CheckCash ===");
  console.log("結果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("チェックの換金に成功しました！");
    const delivered = result.result.meta.delivered_amount;
    if (typeof delivered === "string") {
      console.log("受取金額:", Number(delivered) / 1_000_000, "XAH");
    } else {
      console.log("受取金額:", delivered.value, delivered.currency);
    }
  } else if (txResult === "tecNO_ENTRY") {
    console.log("チェックが見つかりません。キャンセルされたかすでに換金済みの可能性があります。");
  } else if (txResult === "tecUNFUNDED") {
    console.log("チェック発行者の残高が不足しています。");
  }

  await client.disconnect();
}

// チェック作成時に取得したCheckIDを使用
cashCheck(checkID);`,
            zh: `// 文件: cash-check.js
// node cash-check.js <CheckID>
require("dotenv").config();
if (!process.env.CASH_SEED) throw new Error("CASH_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
const { Client, Wallet, xahToDrops } = require("xahau");
const checkID = process.argv[2];
if (!/^[0-9A-F]{64}$/i.test(checkID ?? "")) {
  throw new Error("请传入 CheckCreate 脚本打印的 CheckID：node cash-check.js <CheckID>");
}

async function cashCheck(checkID) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 接收方兑现支票
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'});

  // 方案 1：兑现准确金额
  const checkCash = {
    TransactionType: "CheckCash",
    Account: receiver.address,
    CheckID: checkID,
    Amount: xahToDrops(50), // 精确兑现 50 XAH
  };

  // 方案 2（可选）：至少兑现某个最小金额
  // const checkCash = {
  //   TransactionType: "CheckCash",
  //   Account: receiver.address,
  //   CheckID: checkID,
  //   DeliverMin: xahToDrops(40), // 至少 40 XAH
  // };

  const prepared = await client.autofill(checkCash);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== CheckCash ===");
  console.log("结果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("支票兑现成功！");
    const delivered = result.result.meta.delivered_amount;
    if (typeof delivered === "string") {
      console.log("收到金额:", Number(delivered) / 1_000_000, "XAH");
    } else {
      console.log("收到金额:", delivered.value, delivered.currency);
    }
  } else if (txResult === "tecNO_ENTRY") {
    console.log("未找到该支票。它可能已被取消或已经兑现。");
  } else if (txResult === "tecUNFUNDED") {
    console.log("出票方余额不足。");
  }

  await client.disconnect();
}

// 使用创建支票时得到的 CheckID
cashCheck(checkID);`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es un Check?", pt: "O que é um Check?", en: "What is a Check?", jp: "チェックとは？", zh: "什么是 Check？" },
          content: {
            es: "Similar a un cheque bancario tradicional\n\n• El emisor crea el cheque (CheckCreate)\n• El receptor lo cobra cuando quiera (CheckCash)\n• Los fondos NO se transfieren al crear\n• Soporta XAH nativo e IOUs\n• Puede tener fecha de expiración",
            pt: "Similar a um cheque bancário tradicional\n\n• O emissor cria o cheque (CheckCreate)\n• O receptor o cobra quando quiser (CheckCash)\n• Os fundos NÃO são transferidos ao criar\n• Suporta XAH nativo e IOUs\n• Pode ter data de expiração",
            en: "Similar to a traditional bank check\n\n• Sender creates the check (CheckCreate)\n• Recipient cashes it whenever (CheckCash)\n• Funds are NOT transferred at creation\n• Supports native XAH and IOUs\n• Can have an expiration date",
            jp: "従来の銀行小切手に似ています\n\n• 送信者がチェックを作成（CheckCreate）\n• 受取人がいつでも換金（CheckCash）\n• 作成時に資金は転送されない\n• ネイティブXAHとIOUをサポート\n• 有効期限を設定可能",
            zh: "类似传统银行支票\n\n• 发送方创建支票（CheckCreate）\n• 接收方在需要时兑现（CheckCash）\n• 创建时不会立刻转移资金\n• 支持原生 XAH 和 IOU\n• 可以设置过期时间",
          },
          visual: "📝",
        },
        {
          title: { es: "Ciclo de vida del Check", pt: "Ciclo de vida do Check", en: "Check lifecycle", jp: "チェックのライフサイクル", zh: "Check 生命周期" },
          content: {
            es: "1. CheckCreate → Emisor crea el cheque\n     ↓ (el receptor decide cuándo)\n2. CheckCash → Receptor cobra el cheque\n     ó\n2. CheckCancel → Cualquiera lo cancela\n\n• Amount = cobro exacto\n• DeliverMin = cobro mínimo aceptable\n• Cheques expirados se pueden cancelar",
            pt: "1. CheckCreate → Emissor cria o cheque\n     ↓ (o receptor decide quando)\n2. CheckCash → Receptor cobra o cheque\n     ou\n2. CheckCancel → Qualquer pessoa o cancela\n\n• Amount = cobrança exata\n• DeliverMin = cobrança mínima aceitável\n• Cheques expirados podem ser cancelados",
            en: "1. CheckCreate → Sender creates the check\n     ↓ (recipient decides when)\n2. CheckCash → Recipient cashes the check\n     or\n2. CheckCancel → Either party cancels it\n\n• Amount = exact amount to cash\n• DeliverMin = minimum acceptable amount\n• Expired checks can be cancelled",
            jp: "1. CheckCreate → 送信者がチェックを作成\n     ↓ （受取人が決めるまで）\n2. CheckCash → 受取人がチェックを換金\n     または\n2. CheckCancel → どちらの当事者もキャンセル可能\n\n• Amount = 換金する正確な金額\n• DeliverMin = 最低許容金額\n• 期限切れのチェックはキャンセル可能",
            zh: "1. CheckCreate → 发送方创建支票\n     ↓（由接收方决定何时兑现）\n2. CheckCash → 接收方兑现支票\n     或\n2. CheckCancel → 任一方取消支票\n\n• Amount = 精确兑现的金额\n• DeliverMin = 可接受的最小金额\n• 过期支票可以被取消",
          },
          visual: "🔄",
        },
        {
          title: { es: "Check vs Payment vs Escrow", pt: "Check vs Payment vs Escrow", en: "Check vs Payment vs Escrow", jp: "チェック vs 支払い vs エスクロー", zh: "Check vs Payment vs Escrow" },
          content: {
            es: "Payment → Transferencia inmediata\n\nEscrow → Fondos bloqueados con condiciones\n• Tiempo, crypto-condición o ambos\n• Fondos realmente bloqueados\n\nCheck → Promesa de pago diferido\n• Receptor decide cuándo cobrar\n• Fondos NO bloqueados (pueden gastarse)\n• Más flexible, menos garantías",
            pt: "Payment → Transferência imediata\n\nEscrow → Fundos bloqueados com condições\n• Tempo, crypto-condição ou ambos\n• Fundos realmente bloqueados\n\nCheck → Promessa de pagamento diferido\n• Receptor decide quando cobrar\n• Fundos NÃO bloqueados (podem ser gastos)\n• Mais flexível, menos garantias",
            en: "Payment → Immediate transfer\n\nEscrow → Funds locked with conditions\n• Time, crypto-condition or both\n• Funds actually locked\n\nCheck → Deferred payment promise\n• Recipient decides when to cash\n• Funds NOT locked (can be spent)\n• More flexible, fewer guarantees",
            jp: "Payment → 即時転送\n\nEscrow → 条件付きで資金をロック\n• 時間、暗号条件、または両方\n• 資金は実際にロックされる\n\nCheck → 遅延支払いの約束\n• 受取人が換金タイミングを決める\n• 資金はロックされない（使用可能）\n• より柔軟、保証は少ない",
            zh: "Payment → 立即转账\n\nEscrow → 带条件的资金锁定\n• 时间条件、加密条件，或两者都有\n• 资金会真实锁住\n\nCheck → 延迟支付承诺\n• 由接收方决定何时兑现\n• 资金不会被锁定（仍可花费）\n• 更灵活，但保障更少",
          },
          visual: "⚖️",
        },
      ],
    },
    {
      id: "m10l3",
      title: {
        es: "Tickets: secuencias fuera de orden",
        pt: "Tickets: sequências fora de ordem",
        en: "Tickets: Out-of-Order Sequences",
        jp: "チケット：順序外のシーケンス",
        ko: "Tickets: 순서와 무관한 시퀀스",
        zh: "Tickets：无序序列",
      },
      theory: {
        es: `Un **Ticket** es un mecanismo que permite enviar transacciones **fuera del orden secuencial** normal. Normalmente, cada transacción en Xahau debe usar el siguiente número de \`Sequence\` de la cuenta. Los Tickets eliminan esa restricción reservando números de secuencia por adelantado.

### ¿Qué es un Ticket?

Cada cuenta en Xahau tiene un número de \`Sequence\` que se incrementa con cada transacción. Esto significa que las transacciones deben procesarse estrictamente en orden. Los Tickets solucionan este problema:

- Un Ticket **reserva** un número de secuencia para uso futuro
- La transacción que usa un Ticket especifica \`TicketSequence\` en lugar de \`Sequence\`
- Los Tickets se pueden usar en **cualquier orden**, no importa cuándo fueron creados

### ¿Para qué sirven los Tickets?

- **Transacciones paralelas**: Preparar y firmar múltiples transacciones sin depender del orden
- **Transacciones pre-firmadas**: Firmar transacciones por adelantado y enviarlas cuando convenga
- **Multi-signing**: Diferentes firmantes pueden preparar transacciones independientes sin bloquear la secuencia
- **Contingencias**: Tener transacciones de respaldo listas sin consumir la secuencia normal

### TicketCreate: reservar Tickets

La transacción \`TicketCreate\` reserva uno o más números de secuencia:

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"TicketCreate"\` |
| \`Account\` | Cuenta que reserva los tickets |
| \`TicketCount\` | Número de tickets a crear (1-250) |

### Coste de reserva

Cada Ticket creado consume una **reserva de propietario** (owner reserve) de la cuenta, igual que una TrustLine o una oferta en el DEX. Esto significa que por cada Ticket activo, necesitas tener XAH adicional bloqueado en tu cuenta. El Ticket se elimina (y la reserva se libera) cuando se usa o cuando se cancela.

### Límites

- **Máximo por transacción**: Puedes crear hasta **250 Tickets** en una sola transacción \`TicketCreate\`
- **Máximo por cuenta**: Una cuenta puede tener hasta **250 Tickets** activos simultáneamente
- Los Tickets **no caducan** — permanecen en el ledger hasta que se usan o se cancelan

### Usar un Ticket en una transacción

Para usar un Ticket, incluye estos campos en tu transacción:
- \`Sequence: 0\` — indica que no se usa la secuencia normal
- \`TicketSequence: N\` — el número del Ticket a consumir

El Ticket se destruye automáticamente al usarse, liberando la reserva.

### Cancelar Tickets no usados

Si ya no necesitas un Ticket, puedes cancelarlo para liberar la reserva. No existe una transacción específica para cancelar Tickets. En su lugar, puedes usar una transacción \`AccountSet\` vacía (sin cambios) que consuma el Ticket.`,
        pt: `Um **Ticket** é um mecanismo que permite enviar transações **fora do ordem sequencial** normal. Normalmente, cada transação na Xahau deve usar o seguinte número de \`Sequence\` da conta. Os Tickets eliminam essa restrição reservando números de sequência antecipadamente.
### O que é um Ticket?
Cada conta na Xahau tem um número de \`Sequence\` que incrementa a cada transação. Isso significa que as transações devem ser processadas estritamente em ordem. Os Tickets resolvem este problema:
- Um Ticket **reserva** um número de sequência para uso futuro
- A transação que usa um Ticket especifica \`TicketSequence\` em lugar de \`Sequence\`
- Os Tickets se podem usar em **qualquer ordem**, não importa quando foram criados
### Para que servem os Tickets?
- **Transações paralelas**: Preparar e assinar múltiplas transações sem depender do ordem
- **Transações pre-firmadas**: Assinar transações antecipadamente e enviá-las quando convier
- **Multi-signing**: diferentes signatários podem preparar transações independentes sem bloquear a sequência
- **Contingências**: ter transações de reserva prontas sem consumir a sequência normal
### TicketCreate: reservar Tickets
A transação \`TicketCreate\` reserva um ou mais números de sequência:
| Campo | Descrição |
|---|---|
| \`TransactionType\` | \`"TicketCreate"\` |
| \`Account\` | Conta que reserva os tickets |
| \`TicketCount\` | Número de tickets a criar (1-250) |
### Custo de reserva
Cada Ticket criado consome uma **reserva de proprietário** (owner reserve) da conta, assim como uma TrustLine ou uma oferta no DEX. Isso significa que por cada Ticket ativo, você precisa ter XAH adicional bloqueado em sua conta. O Ticket é removido (e a reserva é liberada) quando é usado ou cancelado.
### Limites
- **Máximo por transação**: Você pode criar até **250 Tickets** em uma única transação \`TicketCreate\`
- **Máximo por conta**: Uma conta pode ter até **250 Tickets** ativos simultáneamente
- Os Tickets **não expiram** — permanecem no ledger até que sejam usados ou cancelados
### Usar um Ticket em uma transação
Para usar um Ticket, inclua estes campos na sua transação:
- \`Sequence: 0\` — indica que não se usa a sequência normal
- \`TicketSequence: N\` — o número do Ticket a consumir
O Ticket é destruído automaticamente ao ser usado, liberando a reserva.
### Cancelar Tickets não usados
Se você não precisa mais de um Ticket, pode cancelá-lo para liberar a reserva. Não existe uma transação específica para cancelar Tickets. Em vez disso, você pode usar uma transação \`AccountSet\` vazia (sem alterações) que consuma o Ticket.`,
        en: `A **Ticket** is a mechanism that allows sending transactions **outside the normal sequential order**. Normally, each transaction on Xahau must use the next \`Sequence\` number of the account. Tickets eliminate this restriction by reserving sequence numbers in advance.

### What is a Ticket?

Each account on Xahau has a \`Sequence\` number that increments with each transaction. This means transactions must be processed in strict order. Tickets solve this problem:

- A Ticket **reserves** a sequence number for future use
- The transaction using a Ticket specifies \`TicketSequence\` instead of \`Sequence\`
- Tickets can be used in **any order**, regardless of when they were created

### What are Tickets for?

- **Parallel transactions**: Prepare and sign multiple transactions without depending on order
- **Pre-signed transactions**: Sign transactions in advance and send them when convenient
- **Multi-signing**: Different signers can prepare independent transactions without blocking the sequence
- **Contingencies**: Have backup transactions ready without consuming the normal sequence

### TicketCreate: reserving Tickets

The \`TicketCreate\` transaction reserves one or more sequence numbers:

| Field | Description |
|---|---|
| \`TransactionType\` | \`"TicketCreate"\` |
| \`Account\` | Account reserving the tickets |
| \`TicketCount\` | Number of tickets to create (1-250) |

### Reserve cost

Each Ticket created consumes an **owner reserve** from the account, just like a TrustLine or a DEX offer. This means for each active Ticket you need additional XAH locked in your account. The Ticket is deleted (and the reserve released) when used or cancelled.

### Limits

- **Maximum per transaction**: You can create up to **250 Tickets** in a single \`TicketCreate\` transaction
- **Maximum per account**: An account can have up to **250 Tickets** active simultaneously
- Tickets **do not expire** — they remain in the ledger until used or cancelled

### Using a Ticket in a transaction

To use a Ticket, include these fields in your transaction:
- \`Sequence: 0\` — indicates the normal sequence is not used
- \`TicketSequence: N\` — the Ticket number to consume

The Ticket is automatically destroyed when used, releasing the reserve.

### Cancelling unused Tickets

If you no longer need a Ticket, you can cancel it to release the reserve. There is no specific transaction to cancel Tickets. Instead, you can use an empty \`AccountSet\` transaction (no changes) that consumes the Ticket.`,
        jp: `**チケット**は、通常の順次シーケンス**の外で**トランザクションを送信するためのメカニズムです。通常、Xahauの各トランザクションはアカウントの次の\`Sequence\`番号を使用する必要があります。チケットはシーケンス番号を事前に予約することでこの制限をなくします。

### チケットとは？

Xahauの各アカウントには、トランザクションごとにインクリメントされる\`Sequence\`番号があります。これはトランザクションが厳密な順序で処理される必要があることを意味します。チケットはこの問題を解決します。

- チケットは将来の使用のためにシーケンス番号を**予約**します
- チケットを使用するトランザクションは\`Sequence\`の代わりに\`TicketSequence\`を指定します
- チケットはいつ作成されたかに関わらず**任意の順序**で使用できます

### チケットの用途は？

- **並行トランザクション**：順序に依存せずに複数のトランザクションを準備して署名
- **事前署名トランザクション**：事前にトランザクションに署名し、便利なときに送信
- **マルチサイニング**：異なる署名者がシーケンスをブロックせずに独立したトランザクションを準備
- **コンティンジェンシー**：通常のシーケンスを消費せずにバックアップトランザクションを準備

### TicketCreate：チケットの予約

\`TicketCreate\`トランザクションは1つ以上のシーケンス番号を予約します。

| フィールド | 説明 |
|---|---|
| \`TransactionType\` | \`"TicketCreate"\` |
| \`Account\` | チケットを予約するアカウント |
| \`TicketCount\` | 作成するチケット数（1〜250） |

### 予約コスト

作成された各チケットは、トラストラインやDEXのオファーと同様に、アカウントの**所有者準備金**を消費します。つまり、アクティブなチケットごとにアカウントに追加のXAHをロックしておく必要があります。チケットは使用またはキャンセルされたときに削除され（所有者準備金が解放されます）。

### 制限

- **トランザクションあたりの最大数**：単一の\`TicketCreate\`トランザクションで最大**250チケット**を作成可能
- **アカウントあたりの最大数**：アカウントは最大**250チケット**を同時にアクティブにできます
- チケットは**失効しません**：使用またはキャンセルされるまでレジャーに残ります

### トランザクションでのチケットの使用

チケットを使用するには、トランザクションにこれらのフィールドを含めます：
- \`Sequence: 0\` — 通常のシーケンスを使用しないことを示す
- \`TicketSequence: N\` — 消費するチケット番号

チケットは使用時に自動的に破棄され、所有者準備金が解放されます。

### 未使用チケットのキャンセル

チケットが不要になった場合、キャンセルして所有者準備金を解放できます。チケットをキャンセルするための特定のトランザクションはありません。代わりに、チケットを消費する空の\`AccountSet\`トランザクション（変更なし）を使用できます。`,
        ko: `**Ticket**은 계정의 일반 \`Sequence\` 흐름과 별도로 트랜잭션을 준비할 수 있게 해 줍니다. 여러 거래를 순서 의존 없이 준비해야 할 때 매우 유용합니다.

### Ticket의 장점

- 병렬 트랜잭션 준비
- 사전 서명 흐름
- 멀티사인 작업 분리
- 비상용 백업 트랜잭션 준비

### 핵심 구조

- \`TicketCreate\`로 티켓 예약
- 실제 거래에서는 \`Sequence\` 대신 \`TicketSequence\` 사용

고급 운영 시나리오에서는 일반 시퀀스보다 훨씬 유연한 도구가 됩니다.`,
        zh: `**Ticket** 让你可以脱离账户正常的 \`Sequence\` 流程来准备交易，在需要无顺序依赖地准备多笔交易时非常有用。

### Ticket 的优势

- 可并行准备交易
- 适合预签名流程
- 便于分离多签工作
- 可以提前准备应急备用交易

### 核心结构

- 用 \`TicketCreate\` 预留 Ticket
- 实际交易中使用 \`TicketSequence\` 代替 \`Sequence\`

在高级运营场景中，它比普通序列机制灵活得多。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear Tickets y usarlos para encadenar múltiples pagos",
            pt: "Criar Tickets e usarlos para encadenar múltiplas pagamentos",
            en: "Create Tickets and use them to chain multiple payments",
            jp: "チケットを作成して複数の支払いに使用する",
            zh: "创建 Tickets 并用它们串联多笔支付",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
if (!process.env.BUYER_SEED) throw new Error("BUYER_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
if (!process.env.HOLDER_SEED) throw new Error("HOLDER_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");

async function paymentsWithTickets() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // === PASO 1: Crear 3 Tickets ===
  console.log("=== Paso 1: Crear Tickets ===");
  const ticketCreate = {
    TransactionType: "TicketCreate",
    Account: sender.address,
    TicketCount: 3, // Reservar 3 tickets
  };

  const prepTicket = await client.autofill(ticketCreate);
  const signedTicket = sender.sign(prepTicket);
  const resultTicket = await client.submitAndWait(signedTicket.tx_blob);

  console.log("TicketCreate:", resultTicket.result.meta.TransactionResult);

  if (resultTicket.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error creando tickets.");
    await client.disconnect();
    return;
  }

  // Extraer los TicketSequence de los nodos creados
  const ticketSequences = resultTicket.result.meta.AffectedNodes
    .filter((n) => n.CreatedNode?.LedgerEntryType === "Ticket")
    .map((n) => n.CreatedNode.NewFields.TicketSequence)
    .sort((a, b) => a - b);

  console.log("Tickets creados:", ticketSequences);

  // === PASO 2: Usar los Tickets para enviar pagos (en cualquier orden) ===
  console.log("=== Paso 2: Enviar pagos con Tickets ===");

  // Tres cuentas del curso en .env reciben los pagos
  const addressOf = (role) => Wallet.fromSeed(process.env[\`\${role}_SEED\`], {algorithm: 'secp256k1'}).address;
  const destinations = [
    { address: addressOf("CASH"), amount: 5,  label: "Pago A" },
    { address: addressOf("BUYER"), amount: 10, label: "Pago B" },
    { address: addressOf("HOLDER"), amount: 15, label: "Pago C" },
  ];

  // Podemos enviarlos en cualquier orden, incluso en paralelo
  // Aquí los enviamos en orden inverso para demostrar la flexibilidad
  for (let i = destinations.length - 1; i >= 0; i--) {
    const dest = destinations[i];
    const ticketSeq = ticketSequences[i];

    const payment = {
      TransactionType: "Payment",
      Account: sender.address,
      Destination: dest.address,
      Amount: xahToDrops(dest.amount),
      Sequence: 0,               // No usar secuencia normal
      TicketSequence: ticketSeq,  // Usar el Ticket reservado
    };

    const prepared = await client.autofill(payment);
    // autofill puede sobreescribir Sequence, así que lo forzamos
    prepared.Sequence = 0;
    prepared.TicketSequence = ticketSeq;

    const signed = sender.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const txResult = result.result.meta.TransactionResult;
    console.log(\`\${dest.label} (Ticket \${ticketSeq}): \${txResult} → \${dest.amount} XAH\`);
  }

  console.log("¡Todos los pagos enviados con Tickets!");
  console.log("Los Tickets usados se han destruido y la reserva liberada.");

  await client.disconnect();
}

paymentsWithTickets();`,
            pt: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
if (!process.env.BUYER_SEED) throw new Error("BUYER_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
if (!process.env.HOLDER_SEED) throw new Error("HOLDER_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
async function paymentsWithTickets() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // === PASSO 1: Criar 3 Tickets ===
  console.log("=== Passo 1: Criar Tickets ===");
  const ticketCreate = {
    TransactionType: "TicketCreate",
    Account: sender.address,
    TicketCount: 3, // Reservar 3 tickets
  };
  const prepTicket = await client.autofill(ticketCreate);
  const signedTicket = sender.sign(prepTicket);
  const resultTicket = await client.submitAndWait(signedTicket.tx_blob);
  console.log("TicketCreate:", resultTicket.result.meta.TransactionResult);
  if (resultTicket.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Erro criando tickets.");
    await client.disconnect();
    return;
  }
  // Extraer os TicketSequence dos nós criados
  const ticketSequences = resultTicket.result.meta.AffectedNodes
    .filter((n) => n.CreatedNode?.LedgerEntryType === "Ticket")
    .map((n) => n.CreatedNode.NewFields.TicketSequence)
    .sort((a, b) => a - b);
  console.log("Tickets criados:", ticketSequences);
  // === PASSO 2: Usar os Tickets para enviar pagamentos (em qualquer ordem) ===
  console.log("=== Passo 2: Enviar pagamentos com Tickets ===");
  // Três contas do curso no .env recebem os pagamentos
  const addressOf = (role) => Wallet.fromSeed(process.env[\`\${role}_SEED\`], {algorithm: 'secp256k1'}).address;
  const destinations = [
    { address: addressOf("CASH"), amount: 5,  label: "Pagamento A" },
    { address: addressOf("BUYER"), amount: 10, label: "Pagamento B" },
    { address: addressOf("HOLDER"), amount: 15, label: "Pagamento C" },
  ];
  // Podemos enviá-los em qualquer ordem, inclusive em paralelo
  // Aqui eles são enviados em ordem inversa para mostrar essa flexibilidade
  for (let i = destinations.length - 1; i >= 0; i--) {
    const dest = destinations[i];
    const ticketSeq = ticketSequences[i];
    const payment = {
      TransactionType: "Payment",
      Account: sender.address,
      Destination: dest.address,
      Amount: xahToDrops(dest.amount),
      Sequence: 0,               // Não usar sequência normal
      TicketSequence: ticketSeq,  // Usar o Ticket reservado
    };
    const prepared = await client.autofill(payment);
    // o autofill pode sobrescrever o Sequence, então ele é forçado
    prepared.Sequence = 0;
    prepared.TicketSequence = ticketSeq;
    const signed = sender.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
    const txResult = result.result.meta.TransactionResult;
    console.log(\`\${dest.label} (Ticket \${ticketSeq}): \${txResult} → \${dest.amount} XAH\`);
  }
  console.log("Todos os pagamentos enviados com Tickets!");
  console.log("Os Tickets usados foram destruídos e a reserva foi liberada.");
  await client.disconnect();
}
paymentsWithTickets();`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
if (!process.env.BUYER_SEED) throw new Error("BUYER_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
if (!process.env.HOLDER_SEED) throw new Error("HOLDER_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");

async function paymentsWithTickets() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // === STEP 1: Create 3 Tickets ===
  console.log("=== Step 1: Create Tickets ===");
  const ticketCreate = {
    TransactionType: "TicketCreate",
    Account: sender.address,
    TicketCount: 3, // Reserve 3 tickets
  };

  const prepTicket = await client.autofill(ticketCreate);
  const signedTicket = sender.sign(prepTicket);
  const resultTicket = await client.submitAndWait(signedTicket.tx_blob);

  console.log("TicketCreate:", resultTicket.result.meta.TransactionResult);

  if (resultTicket.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error creating tickets.");
    await client.disconnect();
    return;
  }

  // Extract TicketSequence values from created nodes
  const ticketSequences = resultTicket.result.meta.AffectedNodes
    .filter((n) => n.CreatedNode?.LedgerEntryType === "Ticket")
    .map((n) => n.CreatedNode.NewFields.TicketSequence)
    .sort((a, b) => a - b);

  console.log("Tickets created:", ticketSequences);

  // === STEP 2: Use the Tickets to send payments (in any order) ===
  console.log("=== Step 2: Send payments with Tickets ===");

  // Three course accounts from .env receive the payments
  const addressOf = (role) => Wallet.fromSeed(process.env[\`\${role}_SEED\`], {algorithm: 'secp256k1'}).address;
  const destinations = [
    { address: addressOf("CASH"), amount: 5,  label: "Payment A" },
    { address: addressOf("BUYER"), amount: 10, label: "Payment B" },
    { address: addressOf("HOLDER"), amount: 15, label: "Payment C" },
  ];

  // We can send them in any order, even in parallel
  // Here we send them in reverse order to demonstrate the flexibility
  for (let i = destinations.length - 1; i >= 0; i--) {
    const dest = destinations[i];
    const ticketSeq = ticketSequences[i];

    const payment = {
      TransactionType: "Payment",
      Account: sender.address,
      Destination: dest.address,
      Amount: xahToDrops(dest.amount),
      Sequence: 0,               // Do not use normal sequence
      TicketSequence: ticketSeq,  // Use the reserved Ticket
    };

    const prepared = await client.autofill(payment);
    // autofill may overwrite Sequence, so we force it
    prepared.Sequence = 0;
    prepared.TicketSequence = ticketSeq;

    const signed = sender.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const txResult = result.result.meta.TransactionResult;
    console.log(\`\${dest.label} (Ticket \${ticketSeq}): \${txResult} → \${dest.amount} XAH\`);
  }

  console.log("All payments sent with Tickets!");
  console.log("Used Tickets have been destroyed and the reserve released.");

  await client.disconnect();
}

paymentsWithTickets();`,
            jp: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
if (!process.env.BUYER_SEED) throw new Error("BUYER_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
if (!process.env.HOLDER_SEED) throw new Error("HOLDER_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");

async function paymentsWithTickets() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // === ステップ1: 3つのチケットを作成 ===
  console.log("=== ステップ1: チケットの作成 ===");
  const ticketCreate = {
    TransactionType: "TicketCreate",
    Account: sender.address,
    TicketCount: 3, // 3チケットを予約
  };

  const prepTicket = await client.autofill(ticketCreate);
  const signedTicket = sender.sign(prepTicket);
  const resultTicket = await client.submitAndWait(signedTicket.tx_blob);

  console.log("TicketCreate:", resultTicket.result.meta.TransactionResult);

  if (resultTicket.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("チケットの作成エラー。");
    await client.disconnect();
    return;
  }

  // 作成されたノードからTicketSequence値を抽出
  const ticketSequences = resultTicket.result.meta.AffectedNodes
    .filter((n) => n.CreatedNode?.LedgerEntryType === "Ticket")
    .map((n) => n.CreatedNode.NewFields.TicketSequence)
    .sort((a, b) => a - b);

  console.log("作成されたチケット:", ticketSequences);

  // === ステップ2: チケットを使って支払いを送信（任意の順序で）===
  console.log("=== ステップ2: チケットで支払いを送信 ===");

  // .env にある講座の3つのアカウントが支払いを受け取ります
  const addressOf = (role) => Wallet.fromSeed(process.env[\`\${role}_SEED\`], {algorithm: 'secp256k1'}).address;
  const destinations = [
    { address: addressOf("CASH"), amount: 5,  label: "支払いA" },
    { address: addressOf("BUYER"), amount: 10, label: "支払いB" },
    { address: addressOf("HOLDER"), amount: 15, label: "支払いC" },
  ];

  // 任意の順序で、並行して送信することもできます
  // 柔軟性を示すために逆順で送信します
  for (let i = destinations.length - 1; i >= 0; i--) {
    const dest = destinations[i];
    const ticketSeq = ticketSequences[i];

    const payment = {
      TransactionType: "Payment",
      Account: sender.address,
      Destination: dest.address,
      Amount: xahToDrops(dest.amount),
      Sequence: 0,               // 通常のシーケンスを使用しない
      TicketSequence: ticketSeq,  // 予約済みチケットを使用
    };

    const prepared = await client.autofill(payment);
    // autofillがSequenceを上書きする可能性があるため強制設定
    prepared.Sequence = 0;
    prepared.TicketSequence = ticketSeq;

    const signed = sender.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const txResult = result.result.meta.TransactionResult;
    console.log(\`\${dest.label} (Ticket \${ticketSeq}): \${txResult} → \${dest.amount} XAH\`);
  }

  console.log("すべての支払いをチケットで送信しました！");
  console.log("使用済みチケットは破棄され、リザーブが解放されました。");

  await client.disconnect();
}

paymentsWithTickets();`,
            zh: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
if (!process.env.BUYER_SEED) throw new Error("BUYER_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
if (!process.env.HOLDER_SEED) throw new Error("HOLDER_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");

async function paymentsWithTickets() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // === 第 1 步：创建 3 个 Ticket ===
  console.log("=== 第 1 步：创建 Tickets ===");
  const ticketCreate = {
    TransactionType: "TicketCreate",
    Account: sender.address,
    TicketCount: 3, // 预留 3 个 Ticket
  };

  const prepTicket = await client.autofill(ticketCreate);
  const signedTicket = sender.sign(prepTicket);
  const resultTicket = await client.submitAndWait(signedTicket.tx_blob);

  console.log("TicketCreate:", resultTicket.result.meta.TransactionResult);

  if (resultTicket.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("创建 Ticket 时出错。");
    await client.disconnect();
    return;
  }

  // 从已创建节点中提取 TicketSequence
  const ticketSequences = resultTicket.result.meta.AffectedNodes
    .filter((n) => n.CreatedNode?.LedgerEntryType === "Ticket")
    .map((n) => n.CreatedNode.NewFields.TicketSequence)
    .sort((a, b) => a - b);

  console.log("已创建 Tickets:", ticketSequences);

  // === 第 2 步：用 Tickets 发送支付（顺序可任意）===
  console.log("=== 第 2 步：使用 Tickets 发送支付 ===");

  // .env 中的三个课程账户接收这些付款
  const addressOf = (role) => Wallet.fromSeed(process.env[\`\${role}_SEED\`], {algorithm: 'secp256k1'}).address;
  const destinations = [
    { address: addressOf("CASH"), amount: 5,  label: "支付 A" },
    { address: addressOf("BUYER"), amount: 10, label: "支付 B" },
    { address: addressOf("HOLDER"), amount: 15, label: "支付 C" },
  ];

  // 可以按任意顺序发送，甚至并行发送
  // 这里故意倒序发送，以展示灵活性
  for (let i = destinations.length - 1; i >= 0; i--) {
    const dest = destinations[i];
    const ticketSeq = ticketSequences[i];

    const payment = {
      TransactionType: "Payment",
      Account: sender.address,
      Destination: dest.address,
      Amount: xahToDrops(dest.amount),
      Sequence: 0,               // 不使用普通序列
      TicketSequence: ticketSeq,  // 使用预留的 Ticket
    };

    const prepared = await client.autofill(payment);
    // autofill 可能会覆盖 Sequence，所以这里强制设回去
    prepared.Sequence = 0;
    prepared.TicketSequence = ticketSeq;

    const signed = sender.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const txResult = result.result.meta.TransactionResult;
    console.log(\`\${dest.label} (Ticket \${ticketSeq}): \${txResult} → \${dest.amount} XAH\`);
  }

  console.log("所有支付都已通过 Tickets 发送！");
  console.log("已使用的 Ticket 会被销毁，预留金也会释放。");

  await client.disconnect();
}

paymentsWithTickets();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es un Ticket?", pt: "O que é um Ticket?", en: "What is a Ticket?", jp: "チケットとは？", zh: "什么是 Ticket？" },
          content: {
            es: "Reserva números de secuencia por adelantado\n\n• Permite transacciones fuera de orden\n• Sequence: 0 + TicketSequence: N\n• Se destruye al usarse\n• Máximo 250 por cuenta\n\nCada Ticket consume reserva de propietario",
            pt: "Reserva números de sequência antecipadamente\n\n• Permite transações fora de ordem\n• Sequence: 0 + TicketSequence: N\n• É destruído ao ser usado\n• Máximo 250 por conta\n\nCada Ticket consome reserva de proprietário",
            en: "Reserves sequence numbers in advance\n\n• Allows out-of-order transactions\n• Sequence: 0 + TicketSequence: N\n• Destroyed when used\n• Maximum 250 per account\n\nEach Ticket consumes owner reserve",
            jp: "シーケンス番号を事前に予約\n\n• 順序外のトランザクションを許可\n• Sequence: 0 + TicketSequence: N\n• 使用時に破棄\n• アカウントあたり最大250\n\n各チケットはオーナーリザーブを消費",
            zh: "提前预留序列号\n\n• 允许无序交易\n• Sequence: 0 + TicketSequence: N\n• 使用后会被销毁\n• 每个账户最多 250 个\n\n每个 Ticket 都会占用 owner reserve",
          },
          visual: "🎫",
        },
        {
          title: { es: "Casos de uso", pt: "Casos de uso", en: "Use cases", jp: "ユースケース", zh: "使用场景" },
          content: {
            es: "• Transacciones paralelas sin bloqueo\n• Pre-firmar txs para enviar después\n• Multi-signing independiente\n• Contingencias y respaldos\n\nTicketCreate → Reservar (1-250)\nUsar → Sequence: 0 + TicketSequence\nCancelar → AccountSet vacío con Ticket",
            pt: "• Transações paralelas sem bloqueio\n• Pre-assinar txs para enviar depois\n• Multi-signing independiente\n• Contingências e backups\n\nTicketCreate → Reservar (1-250)\nUsar → Sequence: 0 + TicketSequence\nCancelar → AccountSet vazio com Ticket",
            en: "• Parallel transactions without blocking\n• Pre-sign txs to send later\n• Independent multi-signing\n• Contingencies and fallbacks\n\nTicketCreate → Reserve (1-250)\nUse → Sequence: 0 + TicketSequence\nCancel → Empty AccountSet with Ticket",
            jp: "• ブロックなしの並行トランザクション\n• 後で送信するための事前署名tx\n• 独立したマルチサイニング\n• コンティンジェンシーとバックアップ\n\nTicketCreate → 予約（1〜250）\n使用 → Sequence: 0 + TicketSequence\nキャンセル → チケット付き空のAccountSet",
            zh: "• 无阻塞的并行交易\n• 预签名后再发送交易\n• 独立进行多签\n• 应急与备用方案\n\nTicketCreate → 预留（1-250）\n使用 → Sequence: 0 + TicketSequence\n取消 → 带 Ticket 的空 AccountSet",
          },
          visual: "🔀",
        },
        {
          title: { es: "Tickets vs Secuencia normal", pt: "Tickets vs Sequência normal", en: "Tickets vs Normal Sequence", jp: "チケット vs 通常のシーケンス", zh: "Tickets vs 普通序列" },
          content: {
            es: "Secuencia normal:\n• Estricto orden: 1, 2, 3, 4...\n• Si falla la 2, la 3 se bloquea\n\nCon Tickets:\n• Cualquier orden: 3, 1, 2...\n• Independientes entre sí\n• Cada uno consume owner reserve\n• Se liberan al usarse o cancelarse",
            pt: "Sequência normal:\n• Estrita ordem: 1, 2, 3, 4...\n• Se falhar 2, a 3 se bloqueia\n\nCom Tickets:\n• Qualquer ordem: 3, 1, 2...\n• Independentes entre si\n• Cada um consome owner reserve\n• São liberados ao ser usado ou cancelado",
            en: "Normal sequence:\n• Strict order: 1, 2, 3, 4...\n• If 2 fails, 3 is blocked\n\nWith Tickets:\n• Any order: 3, 1, 2...\n• Independent from each other\n• Each consumes owner reserve\n• Released when used or cancelled",
            jp: "通常のシーケンス：\n• 厳格な順序：1, 2, 3, 4...\n• 2が失敗すると3はブロックされる\n\nチケット使用時：\n• 任意の順序：3, 1, 2...\n• 互いに独立\n• 各チケットはオーナーリザーブを消費\n• 使用またはキャンセル時に解放",
            zh: "普通序列：\n• 必须严格按顺序：1, 2, 3, 4...\n• 如果 2 失败，3 会被卡住\n\n使用 Tickets：\n• 可以任意顺序：3, 1, 2...\n• 彼此独立\n• 每个都会占用 owner reserve\n• 使用或取消后释放",
          },
          visual: "⚖️",
        },
      ],
    },
    {
      id: "m10l4",
      title: {
        es: "ClaimReward: reclamar recompensas de la red",
        pt: "ClaimReward: reclamar recompensas da rede",
        en: "ClaimReward: Claiming Network Rewards",
        jp: "ClaimReward：ネットワーク報酬の請求",
        ko: "ClaimReward: 네트워크 보상 청구",
        zh: "ClaimReward：领取网络奖励",
      },
      theory: {
        es: `Xahau cuenta con un sistema de **recompensas nativas** que distribuye XAH a las cuentas que participan activamente en la red. La transacción \`ClaimReward\` permite reclamar estas recompensas acumuladas.

### ¿Cómo funcionan las recompensas en Xahau?

A diferencia de blockchains Proof of Stake donde necesitas hacer staking, en Xahau las recompensas se distribuyen a cuentas que mantienen un balance activo en la red. El mecanismo funciona así:

- Las recompensas se acumulan automáticamente en función de tu balance de XAH
- Para recibirlas, debes enviar periódicamente una transacción \`ClaimReward\`
- Al reclamar, las recompensas se añaden directamente al balance de tu cuenta
- No necesitas delegar, bloquear fondos ni ejecutar un nodo validador

### Transacción ClaimReward

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"ClaimReward"\` |
| \`Account\` | Tu cuenta que reclama la recompensa |
| \`Issuer\` | La dirección del emisor de recompensas (genesis account de la red) |
| \`Flags\` |  \`1\` para cancelar el recibir recompensas |

### Activar y reclamar recompensas

La primera vez que envías \`ClaimReward\`, **activas** tu cuenta para recibir recompensas. Las siguientes ejecuciones reclaman las recompensas acumuladas desde la última vez. Es recomendable reclamar periódicamente (por ejemplo, una vez al día o a la semana) para mantener tus recompensas al día.

### Desactivar recompensas

Si por algún motivo quieres dejar de participar en el sistema de recompensas, puedes enviar \`ClaimReward\` con \`Flags: 1\`. Esto desactiva tu cuenta del sistema de recompensas.

### Consideraciones

- Las recompensas dependen del balance y del tiempo transcurrido desde la última reclamación
- El fee de la transacción \`ClaimReward\` es estándar (como cualquier otra transacción)
- Es compatible con cuentas que tengan Hooks instalados
- La dirección de \`Issuer\` es específica de cada red (testnet vs mainnet)

### ClaimReward en testnet

En testnet la cuenta génesis no tiene instalado el Hook de recompensas, así que el ejemplo devuelve \`tecNO_TARGET\`: la transacción es válida, pero no hay nada que reclamar. En mainnet la cuenta génesis lleva los Hooks que calculan las recompensas, y la misma transacción las reclama.`,
        pt: `A Xahau tem um sistema de **recompensas nativas** que distribui XAH às contas que participam ativamente da rede. A transação \`ClaimReward\` permite reclamar essas recompensas acumuladas.
### Como funcionam as recompensas na Xahau?
Diferentemente de blockchains Proof of Stake em que você precisa fazer staking, na Xahau as recompensas são distribuídas a contas que mantêm um saldo ativo na rede. O mecanismo funciona assim:
- As recompensas se acumulan automaticamente em função de seu saldo de XAH
- Para recebê-las, você deve enviar periodicamente uma transação \`ClaimReward\`
- Ao reclamar, as recompensas são adicionadas diretamente ao saldo de sua conta
- Você não precisa delegar, bloquear fundos nem executar um nó validador
### Transação ClaimReward
| Campo | Descrição |
|---|---|
| \`TransactionType\` | \`"ClaimReward"\` |
| \`Account\` | Sua conta, que reclama a recompensa |
| \`Issuer\` | A endereço do emissor de recompensas (genesis account da rede) |
| \`Flags\` |  \`1\` para cancelar o receber recompensas |
### Ativar e reclamar recompensas
Na primeira vez que você envia \`ClaimReward\`, **ativa** sua conta para receber recompensas. As execuções seguintes reivindicam as recompensas acumuladas desde a última vez. É recomendável reclamar periodicamente (por exemplo, uma vez por dia ou por semana) para manter suas recompensas em dia.
### Desativar recompensas
Se por algum motivo quiser deixar de participar no sistema de recompensas, você pode enviar \`ClaimReward\` com \`Flags: 1\`. Isso desativa sua conta do sistema de recompensas.
### Considerações
- As recompensas dependem do saldo e do tempo transcorrido desde a última reivindicação
- O fee da transação \`ClaimReward\` é padrão (como qualquer outra transação)
- É compatible com contas que tenham Hooks instalados
- O endereço de \`Issuer\` é específico de cada rede (testnet vs mainnet)

### ClaimReward na testnet

Na testnet a conta gênese não tem o Hook de recompensas instalado, então o exemplo retorna \`tecNO_TARGET\`: a transação é válida, mas não há nada para reivindicar. Na mainnet a conta gênese carrega os Hooks que calculam as recompensas, e a mesma transação as reivindica.`,
        en: `Xahau has a **native rewards system** that distributes XAH to accounts that actively participate in the network. The \`ClaimReward\` transaction allows you to claim these accumulated rewards.

### How do rewards work on Xahau?

Unlike Proof of Stake blockchains where you need to stake, on Xahau rewards are distributed to accounts that maintain an active XAH balance. The mechanism works as follows:

- Rewards accumulate automatically based on your XAH balance
- To receive them, you must periodically send a \`ClaimReward\` transaction
- When claiming, rewards are added directly to your account balance
- You don't need to delegate, lock funds, or run a validator node

### ClaimReward transaction

| Field | Description |
|---|---|
| \`TransactionType\` | \`"ClaimReward"\` |
| \`Account\` | Your account claiming the reward |
| \`Issuer\` | The reward issuer address (network genesis account) |
| \`Flags\` | \`1\` to stop receiving rewards |

### Activating and claiming rewards

The first time you send \`ClaimReward\`, you **activate** your account to receive rewards. Subsequent executions claim the rewards accumulated since the last time. It is recommended to claim periodically (for example, once a day or week) to keep your rewards up to date.

### Deactivating rewards

If for any reason you want to stop participating in the rewards system, you can send \`ClaimReward\` with \`Flags: 1\`. This deactivates your account from the rewards system.

### Considerations

- Rewards depend on the balance and time elapsed since the last claim
- The \`ClaimReward\` transaction fee is standard (like any other transaction)
- Compatible with accounts that have Hooks installed
- The \`Issuer\` address is specific to each network (testnet vs mainnet)

### ClaimReward on testnet

On testnet the genesis account has no reward Hook installed, so the example returns \`tecNO_TARGET\`: the transaction is valid, but there is nothing to claim from. On mainnet the genesis account carries the Hooks that compute rewards, and the same transaction claims them.`,
        jp: `Xahauには、ネットワークに積極的に参加するアカウントにXAHを配布する**ネイティブ報酬システム**があります。\`ClaimReward\`トランザクションにより、これらの累積報酬を請求できます。

### Xahauの報酬の仕組みは？

ステーキングが必要なProof of Stakeブロックチェーンとは異なり、Xahauではアクティブなバランスを維持するアカウントに報酬が配布されます。仕組みは以下の通りです。

- XAHの残高に基づいて報酬が自動的に累積されます
- 受け取るには、定期的に\`ClaimReward\`トランザクションを送信する必要があります
- 請求時に報酬がアカウントの残高に直接追加されます
- デリゲート、資金のロック、バリデータノードの実行は不要です

### ClaimRewardトランザクション

| フィールド | 説明 |
|---|---|
| \`TransactionType\` | \`"ClaimReward"\` |
| \`Account\` | 報酬を請求するあなたのアカウント |
| \`Issuer\` | 報酬発行者のアドレス（ネットワークのジェネシスアカウント） |
| \`Flags\` | 報酬の受け取りを停止するには\`1\` |

### 報酬の有効化と請求

\`ClaimReward\`を初めて送信すると、報酬を受け取るためのアカウントが**有効化**されます。以降の実行では最後の請求以降に累積された報酬を請求します。報酬を最新の状態に保つために定期的に（例えば毎日または毎週）請求することをお勧めします。

### 報酬の無効化

何らかの理由で報酬システムへの参加を停止したい場合は、\`Flags: 1\`を付けて\`ClaimReward\`を送信できます。これによりアカウントが報酬システムから無効化されます。

### 注意事項

- 報酬はバランスと最後の請求からの経過時間によって異なります
- \`ClaimReward\`トランザクションのfeeは標準（他のトランザクションと同様）です
- Hooksがインストールされたアカウントと互換性があります
- \`Issuer\`アドレスは各ネットワーク（testnet / mainnet）によって異なります

### テストネットでの ClaimReward

テストネットではジェネシスアカウントに報酬 Hook がインストールされていないため、この例は \`tecNO_TARGET\` を返します。トランザクション自体は有効ですが、請求できる報酬がありません。メインネットではジェネシスアカウントに報酬を計算する Hooks があり、同じトランザクションで報酬を請求できます。`,
        ko: `Xahau는 네트워크 참여 계정에 XAH를 분배하는 **네이티브 보상 시스템**을 가지고 있습니다. \`ClaimReward\`는 누적 보상을 청구하는 트랜잭션입니다.

### 동작 방식

- 계정 잔액에 따라 보상이 누적
- 주기적으로 \`ClaimReward\`를 보내 수령
- 첫 실행은 보상 수신 활성화 역할도 수행

### 특징

- 스테이킹이나 위임이 필요 없음
- 보상은 계정 잔액으로 바로 반영
- 중지하려면 특정 플래그로 비활성화 가능

정확한 운영 정책은 네트워크 규칙에 따라 달라질 수 있으므로 항상 최신 문서를 확인하는 것이 좋습니다.

### 테스트넷의 ClaimReward

테스트넷에서는 제네시스 계정에 보상 Hook이 설치되어 있지 않아 이 예제는 \`tecNO_TARGET\`을 반환합니다. 트랜잭션 자체는 유효하지만 청구할 보상이 없습니다. 메인넷에서는 제네시스 계정에 보상을 계산하는 Hooks가 있어 같은 트랜잭션으로 보상을 청구합니다.`,
        zh: `Xahau 拥有一个向网络参与账户分配 XAH 的**原生奖励系统**。\`ClaimReward\` 用来领取累计奖励。

### 工作方式

- 奖励会根据账户余额持续累积
- 需要定期发送 \`ClaimReward\` 才能领取
- 第一次执行也会启用奖励接收

### 特点

- 不需要质押或委托
- 奖励直接计入账户余额
- 如需停止接收，可通过特定标志关闭

具体规则可能会随网络政策变化，因此最好始终查看最新文档。

### 测试网上的 ClaimReward

在测试网上，创世账户没有安装奖励 Hook，所以示例返回 \`tecNO_TARGET\`：交易本身有效，但没有可以领取的奖励。在主网上，创世账户带有计算奖励的 Hooks，同一笔交易就能领取奖励。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Reclamar recompensas de la red",
            pt: "Reclamar recompensas da rede",
            en: "Claim network rewards",
            jp: "ネットワーク報酬の請求",
            zh: "领取网络奖励",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function claimReward() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Consultar información de la cuenta antes de reclamar
  const accountInfo = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balanceBefore = Number(accountInfo.result.account_data.Balance) / 1_000_000;
  console.log("=== Estado antes de reclamar ===");
  console.log("Cuenta:", wallet.address);
  console.log("Balance actual:", balanceBefore, "XAH");

  // Enviar ClaimReward
  // Issuer: cuenta genesis de la red (varía entre testnet y mainnet)
  const claimReward = {
    TransactionType: "ClaimReward",
    Account: wallet.address,
    Issuer: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", // Genesis account testnet
  };

  const prepared = await client.autofill(claimReward);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== ClaimReward ===");
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    // Consultar balance después
    const accountAfter = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const balanceAfter = Number(accountAfter.result.account_data.Balance) / 1_000_000;
    console.log("=== Estado después de reclamar ===");
    console.log("Balance nuevo:", balanceAfter, "XAH");
    console.log("Recompensa obtenida:", (balanceAfter - balanceBefore).toFixed(6), "XAH");
  }

  await client.disconnect();
}

claimReward();`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function claimReward() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // Consultar informação da conta antes de reclamar
  const accountInfo = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const saldoBefore = Number(accountInfo.result.account_data.Balance) / 1_000_000;
  console.log("=== Estado antes de reclamar ===");
  console.log("Conta:", wallet.address);
  console.log("Saldo atual:", saldoBefore, "XAH");
  // Enviar ClaimReward
  // Issuer: conta genesis da rede (varia entre testnet e mainnet)
  const claimReward = {
    TransactionType: "ClaimReward",
    Account: wallet.address,
    Issuer: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", // Genesis account testnet
  };
  const prepared = await client.autofill(claimReward);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  const txResult = result.result.meta.TransactionResult;
  console.log("=== ClaimReward ===");
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);
  if (txResult === "tesSUCCESS") {
    // Consultar saldo depois
    const accountAfter = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });
    const saldoAfter = Number(accountAfter.result.account_data.Balance) / 1_000_000;
    console.log("=== Estado depois de reclamar ===");
    console.log("Saldo novo:", saldoAfter, "XAH");
    console.log("Recompensa obtenida:", (saldoAfter - saldoBefore).toFixed(6), "XAH");
  }
  await client.disconnect();
}
claimReward();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function claimReward() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Query account info before claiming
  const accountInfo = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balanceBefore = Number(accountInfo.result.account_data.Balance) / 1_000_000;
  console.log("=== State before claiming ===");
  console.log("Account:", wallet.address);
  console.log("Current balance:", balanceBefore, "XAH");

  // Send ClaimReward
  // Issuer: network genesis account (varies between testnet and mainnet)
  const claimReward = {
    TransactionType: "ClaimReward",
    Account: wallet.address,
    Issuer: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", // Genesis account testnet
  };

  const prepared = await client.autofill(claimReward);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== ClaimReward ===");
  console.log("Result:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    // Query balance after
    const accountAfter = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const balanceAfter = Number(accountAfter.result.account_data.Balance) / 1_000_000;
    console.log("=== State after claiming ===");
    console.log("New balance:", balanceAfter, "XAH");
    console.log("Reward received:", (balanceAfter - balanceBefore).toFixed(6), "XAH");
  }

  await client.disconnect();
}

claimReward();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function claimReward() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // 請求前にアカウント情報を照会
  const accountInfo = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balanceBefore = Number(accountInfo.result.account_data.Balance) / 1_000_000;
  console.log("=== 請求前の状態 ===");
  console.log("アカウント:", wallet.address);
  console.log("現在の残高:", balanceBefore, "XAH");

  // ClaimRewardを送信
  // Issuer: ネットワークのジェネシスアカウント（testnetとmainnetで異なる）
  const claimReward = {
    TransactionType: "ClaimReward",
    Account: wallet.address,
    Issuer: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", // testnetジェネシスアカウント
  };

  const prepared = await client.autofill(claimReward);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== ClaimReward ===");
  console.log("結果:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    // 請求後の残高を照会
    const accountAfter = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const balanceAfter = Number(accountAfter.result.account_data.Balance) / 1_000_000;
    console.log("=== 請求後の状態 ===");
    console.log("新しい残高:", balanceAfter, "XAH");
    console.log("受取報酬:", (balanceAfter - balanceBefore).toFixed(6), "XAH");
  }

  await client.disconnect();
}

claimReward();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function claimReward() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // 领取前先查询账户信息
  const accountInfo = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balanceBefore = Number(accountInfo.result.account_data.Balance) / 1_000_000;
  console.log("=== 领取前状态 ===");
  console.log("账户:", wallet.address);
  console.log("当前余额:", balanceBefore, "XAH");

  // 发送 ClaimReward
  // Issuer：网络的 genesis 账户（testnet 和 mainnet 不同）
  const claimReward = {
    TransactionType: "ClaimReward",
    Account: wallet.address,
    Issuer: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", // testnet genesis 账户
  };

  const prepared = await client.autofill(claimReward);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== ClaimReward ===");
  console.log("结果:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    // 领取后再查询余额
    const accountAfter = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const balanceAfter = Number(accountAfter.result.account_data.Balance) / 1_000_000;
    console.log("=== 领取后状态 ===");
    console.log("新余额:", balanceAfter, "XAH");
    console.log("获得奖励:", (balanceAfter - balanceBefore).toFixed(6), "XAH");
  }

  await client.disconnect();
}

claimReward();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "ClaimReward", pt: "ClaimReward", en: "ClaimReward", jp: "ClaimReward", zh: "ClaimReward" },
          content: {
            es: "Recompensas nativas de Xahau\n\n• Se acumulan según tu balance de XAH\n• No requiere staking ni nodos\n• ClaimReward para reclamarlas\n• Se suman directamente a tu balance\n\nReclamar periódicamente (diario/semanal)",
            pt: "Recompensas nativa da Xahau\n\n• Acumulam-se conforme seu saldo de XAH\n• Não exige staking nem nós\n• ClaimReward para reivindicá-las\n• São somadas diretamente a seu saldo\n\nReclamar periodicamente (diariamente/semanalmente)",
            en: "Native Xahau rewards\n\n• Accumulated based on your XAH balance\n• No staking or nodes required\n• ClaimReward to collect them\n• Added directly to your balance\n\nClaim periodically (daily/weekly)",
            jp: "Xahauのネイティブ報酬\n\n• XAHバランスに基づいて累積\n• ステーキングもノードも不要\n• ClaimRewardで請求\n• バランスに直接追加\n\n定期的に請求（毎日・毎週）",
            zh: "Xahau 原生奖励\n\n• 根据你的 XAH 余额累积\n• 不需要质押或运行节点\n• 用 ClaimReward 领取\n• 直接加入你的余额\n\n建议定期领取（每日或每周）",
          },
          visual: "🎁",
        },
        {
          title: { es: "Cómo reclamar", pt: "Como reivindicar", en: "How to claim", jp: "請求方法", zh: "如何领取" },
          content: {
            es: "1ª vez → Activa tu cuenta para recompensas\nSiguientes → Reclama lo acumulado\n\nCampos:\n• Account: tu cuenta\n• Issuer: genesis account de la red\n• Flags: 0 (reclamar) / 1 (desactivar)\n\nFee estándar, compatible con Hooks",
            pt: `1ª vez → Activa sua conta para recompensas
Próximos → Reclame o acumulado

Campos:
• Account: sua conta
• Issuer: genesis account da rede
• Flags: 0 (reclamar) / 1 (desativar)

Fee padrão, compatible com Hooks`,
            en: "1st time → Activates your account for rewards\nSubsequent → Claims accumulated amount\n\nFields:\n• Account: your account\n• Issuer: network genesis account\n• Flags: 0 (claim) / 1 (deactivate)\n\nStandard fee, compatible with Hooks",
            jp: "1回目 → アカウントを報酬システムに有効化\n以降 → 累積分を請求\n\nフィールド：\n• Account: あなたのアカウント\n• Issuer: ネットワークのジェネシスアカウント\n• Flags: 0（請求）/ 1（無効化）\n\n標準fee、Hooksと互換",
            zh: "第一次 → 启用你的奖励账户\n之后 → 领取累计金额\n\n字段：\n• Account: 你的账户\n• Issuer: 网络 genesis 账户\n• Flags: 0（领取）/ 1（停用）\n\n手续费为标准费用，兼容 Hooks",
          },
          visual: "💰",
        },
      ],
    },
    {
      id: "m10l5",
      title: {
        es: "Invoke: activar Hooks bajo demanda",
        pt: "Invoke: ativar Hooks sob demanda",
        en: "Invoke: Activating Hooks on Demand",
        jp: "Invoke：オンデマンドでのHooksの実行",
        ko: "Invoke: 필요 시 Hook 활성화",
        zh: "Invoke：按需触发 Hook",
      },
      theory: {
        es: `La transacción \`Invoke\` es un tipo de transacción exclusivo de Xahau que permite **activar un Hook deliberadamente**, sin necesidad de enviar un pago u otra transacción con efecto económico. Es la forma de "llamar" a un Hook de forma directa.

### ¿Por qué existe Invoke?

Los Hooks se ejecutan reactivamente cuando una transacción pasa por la cuenta. Pero hay situaciones donde necesitas activar un Hook **sin que ocurra ninguna otra acción**:

### Transacción Invoke

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"Invoke"\` |
| \`Account\` | Cuenta que envía el Invoke |
| \`Destination\` | (Opcional) Cuenta cuyo Hook queremos activar. Si no se especifica, activa los Hooks de la propia cuenta |

### Invoke como mecanismo

Podemos usar Invoke por distintos motivos:

- Que un Hook emita un \`Invoke\` para activar otro Hook distinto
- Utilizar el \`Invoke\` como un trigger manual para activar la lógica de un Hook cuando lo necesitemos cada cierto tiempo
- Añadir información en la transacción \`Invoke\` (por ejemplo, en \`Memos\` o \`HookParameters\`) para pasar información a un Hook

### Invoke a tu propia cuenta vs a otra cuenta

- **Sin Destination**: El \`Invoke\` activa los Hooks de tu propia cuenta. Útil para Hooks de mantenimiento o auto-gestión
- **Con Destination**: El \`Invoke\` activa los Hooks de la cuenta de destino. El Hook de destino puede distinguir quién envió el Invoke y actuar en consecuencia

### Consideraciones

- \`Invoke\` no transfiere fondos, es solo un trigger
- El Hook que queramos activar, deberá tener \`Invoke\` habilitado en su \`HookOn\` para reaccionar.
- El fee es estándar, como cualquier otra transacción
- Más adelante se implementó en Xahau la transacción \`CronSet\` para programar tareas de forma nativa, pero \`Invoke\` sigue siendo útil para casos personalizados o para activar Hooks de otras cuentas`,
        pt: `A transação \`Invoke\` é um tipo de transação exclusivo da Xahau que permite **ativar um Hook deliberadamente**, sem precisar enviar um pagamento ou outra transação com efeito econômico. É a forma de "chamar" um Hook diretamente.
### Por que existe Invoke?
Os Hooks são executados de forma reativa quando uma transação passa pela conta. Mas há situações em que você precisa ativar um Hook **sem que ocorra nenhuma outra ação**:
### Transação Invoke
| Campo | Descrição |
|---|---|
| \`TransactionType\` | \`"Invoke"\` |
| \`Account\` | Conta que envíao Invoke |
| \`Destination\` | (Opcional) Conta cujo Hook se quer ativar. Se não for especificada, ativa os Hooks da própria conta |
### Invoke como mecanismo
Podemos usar Invoke por distintos motivos:
- Que um Hook emita um \`Invoke\` para ativar outro Hook distinto
- Utilizar o \`Invoke\` como um trigger manual para ativar a lógica de um Hook quando precisarmos dele periodicamente
- Adicionar informação à transação \`Invoke\` (por exemplo, em \`Memos\` ou \`HookParameters\`) para passar dados a um Hook
### Invoke a seu própria conta vs a outra conta
- **Sem Destination**: O \`Invoke\` ativa os Hooks de sua própria conta. Útil para Hooks de manutenção ou autogestão
- **Com Destination**: o \`Invoke\` ativa os Hooks da conta de destino. O Hook de destino pode distinguir quem enviou o Invoke e agir de acordo
### Considerações
- \`Invoke\` não transfere fundos, é apenas um trigger
- O Hook que você quer ativar precisa ter \`Invoke\` habilitado no seu \`HookOn\` para reagir.
- O fee é padrão, como qualquer outra transação
- Mais adiante se implementou na Xahau a transação \`CronSet\` para programar tarefas de forma nativa, mas \`Invoke\` continua sendo útil para casos personalizados ou para ativar Hooks de outras contas`,
        en: `The \`Invoke\` transaction is a transaction type exclusive to Xahau that allows **deliberately activating a Hook**, without needing to send a payment or any other transaction with economic effect. It is the way to "call" a Hook directly.

### Why does Invoke exist?

Hooks execute reactively when a transaction passes through the account. But there are situations where you need to activate a Hook **without any other action occurring**.

### Invoke transaction

| Field | Description |
|---|---|
| \`TransactionType\` | \`"Invoke"\` |
| \`Account\` | Account sending the Invoke |
| \`Destination\` | (Optional) Account whose Hook we want to activate. If not specified, activates the Hooks of the account itself |

### Invoke as a mechanism

We can use Invoke for different purposes:

- A Hook emits an \`Invoke\` to activate a different Hook
- Use \`Invoke\` as a manual trigger to activate a Hook's logic when needed
- Add information to the \`Invoke\` transaction (for example, in \`Memos\` or \`HookParameters\`) to pass data to a Hook

### Invoke to your own account vs another account

- **Without Destination**: The \`Invoke\` activates the Hooks of your own account. Useful for maintenance or self-management Hooks
- **With Destination**: The \`Invoke\` activates the Hooks of the destination account. The destination Hook can identify who sent the Invoke and act accordingly

### Considerations

- \`Invoke\` does not transfer funds, it is only a trigger
- The Hook we want to activate must have \`Invoke\` enabled in its \`HookOn\` to react
- The fee is standard, like any other transaction
- Later, Xahau implemented the \`CronSet\` transaction for native task scheduling, but \`Invoke\` remains useful for custom cases or for activating Hooks on other accounts`,
        jp: `\`Invoke\`トランザクションは、Xahau独自のトランザクションタイプで、支払いや経済的効果のある他のトランザクションを送信することなく、**意図的にHookを実行**できます。これはHookを直接「呼び出す」方法です。

### なぜInvokeが存在するのか？

Hooksはトランザクションがアカウントを通過したときにリアクティブに実行されます。しかし、**他のアクションを発生させることなく**Hookを実行する必要がある状況があります。

### Invokeトランザクション

| フィールド | 説明 |
|---|---|
| \`TransactionType\` | \`"Invoke"\` |
| \`Account\` | Invokeを送信するアカウント |
| \`Destination\` | （オプション）実行したいHookを持つアカウント。指定しない場合、アカウント自身のHooksを実行します |

### InvokeのメカニズムInvokeはさまざまな目的で使用できます

- HookがInvokeを発行して別のHookを実行する
- 必要なときにHookのロジックを実行するための手動トリガーとして\`Invoke\`を使用する
- \`Invoke\`トランザクションに情報を追加（例えば\`Memos\`や\`HookParameters\`）してHookにデータを渡す

### 自分のアカウントへのInvoke vs 他のアカウントへのInvoke

- **Destinationなし**：\`Invoke\`はあなた自身のアカウントのHooksを実行します。メンテナンスや自己管理Hooksに便利です。
- **Destinationあり**：\`Invoke\`は宛先アカウントのHooksを実行します。宛先HookはInvokeを送った人を識別して適切に対応できます。

### 注意事項

- \`Invoke\`は資金を転送しません、これはトリガーにすぎません
- 実行したいHookは、反応するために\`HookOn\`で\`Invoke\`が有効になっている必要があります
- feeは他のトランザクションと同様に標準です
- 後にXahauはネイティブタスクスケジューリングのために\`CronSet\`トランザクションを実装しましたが、\`Invoke\`はカスタムケースや他のアカウントのHooksを実行するために依然として便利です`,
        ko: `**Invoke**는 Xahau 전용 트랜잭션으로, 경제적 결제 없이도 Hook을 **의도적으로 호출**할 수 있게 합니다.

### 왜 필요한가?

Hook은 보통 계정을 통과하는 트랜잭션에 반응하지만, 때로는 별도 트리거가 필요합니다. 이때 Invoke가 유용합니다.

### 활용 예시

- 관리용 Hook 수동 실행
- 다른 Hook을 깨우는 트리거
- \`Memos\`나 \`HookParameters\`로 데이터 전달

Destination이 없으면 자기 계정 Hook을, 있으면 대상 계정 Hook을 활성화합니다.`,
        zh: `**Invoke** 是 Xahau 专有交易，即使没有经济性支付，也能**主动触发** Hook。

### 为什么需要它？

Hook 通常会对经过账户的交易作出反应，但有时我们需要额外的触发器，这时就可以使用 Invoke。

### 常见用途

- 手动执行维护型 Hook
- 作为唤醒另一个 Hook 的触发器
- 通过 \`Memos\` 或 \`HookParameters\` 传递数据

没有 Destination 时触发自己的 Hook；有 Destination 时触发目标账户上的 Hook。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Invocar un Hook en otra cuenta",
            pt: "Invocar um Hook em outra conta",
            en: "Invoke a Hook on another account",
            jp: "別のアカウントのHookをInvokeする",
            zh: "调用另一账户上的 Hook",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function invokeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // Una cuenta con un Hook: el primer argumento, o una cuenta de testnet con un Hook Accept
  const hookAccount = process.argv[2] ?? "rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN";

  // Invoke a otra cuenta que tiene un Hook instalado
  const invoke = {
    TransactionType: "Invoke",
    Account: wallet.address,
    Destination: hookAccount, // Cuenta cuyo Hook queremos activar
  };

  const prepared = await client.autofill(invoke);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Invoke ===");
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("Si había un Hook instalado, comprueba si se ha invocado correctamente.");
  }

  await client.disconnect();
}

invokeHook();`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function invokeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // Uma conta com um Hook: o primeiro argumento, ou uma conta da testnet com um Hook Accept
  const hookAccount = process.argv[2] ?? "rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN";
  // Invoke a outra conta que tem um Hook instalado
  const invoke = {
    TransactionType: "Invoke",
    Account: wallet.address,
    Destination: hookAccount, // Conta cujo Hook se quer ativar
  };
  const prepared = await client.autofill(invoke);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  const txResult = result.result.meta.TransactionResult;
  console.log("=== Invoke ===");
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);
  if (txResult === "tesSUCCESS") {
    console.log("Se havia um Hook instalado, verifique se ele foi invocado corretamente.");
  }
  await client.disconnect();
}
invokeHook();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function invokeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // An account with a Hook: the first argument, or a testnet account with an Accept Hook
  const hookAccount = process.argv[2] ?? "rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN";

  // Invoke on another account that has a Hook installed
  const invoke = {
    TransactionType: "Invoke",
    Account: wallet.address,
    Destination: hookAccount, // Account whose Hook we want to activate
  };

  const prepared = await client.autofill(invoke);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Invoke ===");
  console.log("Result:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("If a Hook was installed, check whether it was invoked correctly.");
  }

  await client.disconnect();
}

invokeHook();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function invokeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // Hook を持つアカウント：最初の引数、または Accept Hook を持つテストネットのアカウント
  const hookAccount = process.argv[2] ?? "rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN";

  // Hookがインストールされている他のアカウントにInvoke
  const invoke = {
    TransactionType: "Invoke",
    Account: wallet.address,
    Destination: hookAccount, // 実行したいHookを持つアカウント
  };

  const prepared = await client.autofill(invoke);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Invoke ===");
  console.log("結果:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("Hookがインストールされていた場合、正しく呼び出されたか確認してください。");
  }

  await client.disconnect();
}

invokeHook();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function invokeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // 带有 Hook 的账户：第一个参数，或带有 Accept Hook 的测试网账户
  const hookAccount = process.argv[2] ?? "rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN";

  // 对安装了 Hook 的另一个账户发送 Invoke
  const invoke = {
    TransactionType: "Invoke",
    Account: wallet.address,
    Destination: hookAccount, // 要触发其 Hook 的账户
  };

  const prepared = await client.autofill(invoke);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Invoke ===");
  console.log("结果:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("如果目标账户安装了 Hook，请检查它是否已被正确触发。");
  }

  await client.disconnect();
}

invokeHook();`,
          },
        },

      ],
      slides: [
        {
          title: { es: "Invoke", pt: "Invoke", en: "Invoke", jp: "Invoke", zh: "Invoke" },
          content: {
            es: "Activar un Hook directamente\n\n• No transfiere fondos\n• Solo es un trigger para el Hook\n• Sin Destination → tus propios Hooks\n• Con Destination → Hooks de otra cuenta\n\nEl Hook debe tener Invoke en su HookOn",
            pt: "Ativar um Hook diretamente\n\n• Não transfere fundos\n• Apenas é um trigger para o Hook\n• Sem Destination → seus próprios Hooks\n• Com Destination → Hooks de outra conta\n\nO Hook deve ter Invoke em sua HookOn",
            en: "Activate a Hook directly\n\n• Does not transfer funds\n• Just a trigger for the Hook\n• No Destination → your own Hooks\n• With Destination → another account's Hooks\n\nThe Hook must have Invoke enabled in HookOn",
            jp: "Hookを直接実行\n\n• 資金を転送しない\n• Hookのトリガーのみ\n• Destinationなし → 自身のHooks\n• Destinationあり → 他のアカウントのHooks\n\nHookはHookOnでInvokeが有効になっている必要あり",
            zh: "直接触发 Hook\n\n• 不会转移资金\n• 只是 Hook 的触发器\n• 无 Destination → 触发自己的 Hooks\n• 有 Destination → 触发他人账户的 Hooks\n\n目标 Hook 需要在 HookOn 中启用 Invoke",
          },
          visual: "📡",
        },
        {
          title: { es: "Casos de uso de Invoke", pt: "Casos de uso de Invoke", en: "Invoke use cases", jp: "Invokeのユースケース", zh: "Invoke 的使用场景" },
          content: {
            es: "• Hook emite un Invoke para activar\n  otro Hook distinto\n• Trigger manual: activar lógica de un\n  Hook cuando lo necesites\n• Pasar datos al Hook via Memos\n  o HookParameters en el Invoke\n\nPara scheduling nativo usa CronSet.\nInvoke sigue siendo útil para casos\npersonalizados o Hooks de otras cuentas",
            pt: "• Hook emite um Invoke para ativar\n  outro Hook distinto\n• Trigger manual: ativar lógica de um\n  Hook quando precisar dele\n• Passar dados ao Hook via Memos\n  ou HookParameters no Invoke\n\nPara scheduling nativo usa CronSet.\nInvoke continua sendo útil para casos\npersonalizados ou Hooks de outras contas",
            en: "• A Hook emits an Invoke to activate\n  another Hook\n• Manual trigger: activate a Hook's logic\n  whenever you need it\n• Pass data to the Hook via Memos\n  or HookParameters in the Invoke\n\nFor native scheduling use CronSet.\nInvoke is still useful for custom cases\nor activating other accounts' Hooks",
            jp: "• HookがInvokeを発行して\n  別のHookを実行\n• 手動トリガー：必要なときに\n  Hookのロジックを実行\n• InvokeのMemosまたは\n  HookParametersでHookにデータを渡す\n\nネイティブスケジューリングにはCronSetを使用。\nInvokeはカスタムケースや\n他のアカウントのHooksに引き続き有効",
            zh: "• 一个 Hook 发出 Invoke 去触发\n  另一个 Hook\n• 手动触发：在需要时运行某个 Hook\n  的逻辑\n• 通过 Invoke 中的 Memos\n  或 HookParameters 传递数据\n\n原生定时任务建议用 CronSet。\nInvoke 仍然适合自定义场景\n或触发其他账户上的 Hooks",
          },
          visual: "⚡",
        },
      ],
    },
    {
      id: "m10l6",
      title: {
        es: "SetRemarks: metadata en objetos del ledger",
        pt: "SetRemarks: metadados em objetos do ledger",
        en: "SetRemarks: Metadata on Ledger Objects",
        jp: "SetRemarks：レジャーオブジェクトへのメタデータ",
        ko: "SetRemarks: 레저 객체 메타데이터",
        zh: "SetRemarks：账本对象元数据",
      },
      theory: {
        es: `La transacción \`SetRemarks\` permite adjuntar **pares clave-valor** a objetos existentes del ledger en la red Xahau. No es una forma de enviar mensajes ni de registrar datos en transacciones: es un mecanismo para **anotar objetos del ledger** (cuentas, ofertas, escrows, cheques, URITokens, TrustLines...) con metadata que queda asociada al propio objeto.

### ¿Qué tipos de objetos admiten Remarks?

\`SetRemarks\` puede adjuntar metadata a los siguientes tipos de objetos del ledger:

- **AccountRoot** — la cuenta en sí (dirección, balance, flags)
- **Offer** — ofertas en el DEX
- **Escrow** — pagos condicionales
- **Ticket** — tickets de secuencia
- **PayChannel** — canales de pago
- **Check** — cheques
- **DepositPreauth** — preautorizaciones de depósito
- **URIToken** — tokens no fungibles
- **RippleState** — TrustLines

Solo el **propietario o emisor** del objeto puede modificar sus Remarks (excepto en URITokens y TrustLines, donde es el emisor del token quien tiene permiso).

### Campos de SetRemarks

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| \`TransactionType\` | String | Sí | \`"SetRemarks"\` |
| \`Account\` | String | Sí | Cuenta que envía la transacción (debe ser propietario/emisor del objeto) |
| \`ObjectID\` | Hash256 | Sí | ID del objeto del ledger al que se adjuntan las Remarks |
| \`Remarks\` | Array | Sí | Array de objetos \`Remark\` a crear, modificar o eliminar |

### Estructura de cada Remark

Cada elemento del array contiene un objeto \`Remark\` con:

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| \`RemarkName\` | Blob | Sí | Nombre/clave de la Remark (1–256 bytes). Debe ser único por objeto |
| \`RemarkValue\` | Blob | No | Valor de la Remark (1–256 bytes). **Omitir para eliminar** la Remark |
| \`Flags\` | UInt32 | No | \`1\` (\`tfImmutable\`) hace la Remark **permanente e inmodificable** |

Los valores de \`RemarkName\` y \`RemarkValue\` se expresan en **hexadecimal**.

### Obtener el ObjectID de una cuenta

Para adjuntar Remarks a tu propia cuenta (AccountRoot), necesitas su \`ObjectID\`, que es el campo \`index\` del objeto en el ledger:

\`\`\`javascript
const info = await client.request({
  command: "account_info",
  account: wallet.address,
  ledger_index: "validated",
});
const objectID = info.result.account_data.index;
\`\`\`

Para otros objetos (Escrow, Check, Offer...) el \`ObjectID\` es el \`LedgerIndex\` que aparece en los \`AffectedNodes\` al crear el objeto.

### Eliminar una Remark

Omite \`RemarkValue\` en el objeto \`Remark\` correspondiente. Xahau eliminará esa entrada del objeto.

### Remarks inmutables

Si añades \`Flags: 1\` (\`tfImmutable\`) al crear una Remark, **no podrá ser modificada ni eliminada** en el futuro. Útil para certificaciones o datos que deban quedar sellados permanentemente.

### Límites y costes

- **Máximo 32 Remarks** por objeto del ledger
- **Fee adicional**: 1 drop por cada byte de \`RemarkName\` + \`RemarkValue\` en la transacción
- Nombre y valor: entre 1 y 256 bytes cada uno
- Los nombres deben ser únicos dentro del mismo objeto

### Errores comunes

| Error | Causa |
|---|---|
| \`temDISABLED\` | La amendment Remarks no está activa en la red |
| \`tecNO_PERMISSION\` | La cuenta no es propietaria/emisora del objeto |
| \`tecIMMUTABLE\` | Se intenta modificar una Remark con \`tfImmutable\` |
| \`tecTOO_MANY_REMARKS\` | El objeto ya tiene 32 Remarks (el máximo permitido) |`,
        pt: `A transação \`SetRemarks\` permite anexar **pares chave-valor** a objetos existentes do ledger na rede Xahau. Não é uma forma de enviar mensagens nem de registrar dados em transações: é um mecanismo para **anotar objetos do ledger** (contas, ofertas, escrows, cheques, URITokens, TrustLines...) com metadados que fica associada ao próprio objeto.
### Que tipos de objetos aceitam Remarks?
\`SetRemarks\` pode anexar metadados aos seguintes tipos de objetos do ledger:
- **AccountRoot** — a conta em si (endereço, saldo, flags)
- **Offer** — ofertas no DEX
- **Escrow** — pagamentos condicionais
- **Ticket** — tickets de sequência
- **PayChannel** — canales de pagamento
- **Check** — cheques
- **DepositPreauth** — pré-autorizações de depósito
- **URIToken** — tokens não fungíveis
- **RippleState** — TrustLines
Somente o **proprietário ou emissor** do objeto pode modificar suas Remarks (exceto em URITokens e TrustLines, em que é o emissor do token quem tem permissão).
### Campos de SetRemarks
| Campo | Tipo | Requerido | Descrição |
|---|---|---|---|
| \`TransactionType\` | String | Sim | \`"SetRemarks"\` |
| \`Account\` | String | Sim | Conta que envíà transação (deve ser proprietário/emissor do objeto) |
| \`ObjectID\` | Hash256 | Sim | ID do objeto do ledger ao que se adjuntan as Remarks |
| \`Remarks\` | Array | Sim | Array de objetos \`Remark\` a criar, modificar ou eliminar |
### Estrutura de cada Remark
Cada elemento do array contem um objeto \`Remark\` com:
| Campo | Tipo | Requerido | Descrição |
|---|---|---|---|
| \`RemarkName\` | Blob | Sim | Nome/chave da Remark (1–256 bytes). Deve ser único por objeto |
| \`RemarkValue\` | Blob | Não | Valor da Remark (1–256 bytes). **Omitir para eliminar** a Remark |
| \`Flags\` | UInt32 | Não | \`1\` (\`tfImmutable\`) torna a Remark **permanente e imodificável** |
Os valores de \`RemarkName\` e \`RemarkValue\` são expressas em **hexadecimal**.
### Obter ou ObjectID de uma conta
Para anexar Remarks à sua própria conta (AccountRoot), você precisa do \`ObjectID\` dela, que é o campo \`index\` do objeto no ledger:
\`\`\`javascript
const info = await client.request({
  command: "account_info",
  account: wallet.address,
  ledger_index: "validated",
});
const objectID = info.result.account_data.index;
\`\`\`
Para outros objetos (Escrow, Check, Offer...), o \`ObjectID\` é o \`LedgerIndex\` que aparece nos \`AffectedNodes\` ao criar o objeto.
### Eliminar uma Remark
Omita \`RemarkValue\` no objeto \`Remark\` correspondente. A Xahau removerá essa entrada do objeto.
### Remarks imutávels
Se você adicionar \`Flags: 1\` (\`tfImmutable\`) ao criar uma Remark, ela **não poderá ser modificada nem removida** no futuro. Útil para certificações ou dados que devem ficar selados permanentemente.
### Limites e custos
- **Máximo 32 Remarks** por objeto do ledger
- **Fee adicional**: 1 drop por cada byte de \`RemarkName\` + \`RemarkValue\` na transação
- Nome e valor: entre 1 e 256 bytes cada um
- Os nomes devem ser únicos dentro do mesmo objeto
### Erros comuns
| Erro | Causa |
|---|---|
| \`temDISABLED\` | A amendment Remarks no está ativa na rede |
| \`tecNO_PERMISSION\` | A conta no é propietaria/emissora do objeto |
| \`tecIMMUTABLE\` | Se intenta modificar uma Remark com \`tfImmutable\` |
| \`tecTOO_MANY_REMARKS\` | O objeto já tem 32 Remarks (o máximo permitido) |`,
        en: `The \`SetRemarks\` transaction allows you to attach **key-value pairs** to existing ledger objects on the Xahau Network. It is not a way to send messages or record data in transactions: it is a mechanism to **annotate ledger objects** (accounts, offers, escrows, checks, URITokens, TrustLines...) with metadados that remains associated with the object itself.

### What types of objects support Remarks?

\`SetRemarks\` can attach metadados to the following ledger object types:

- **AccountRoot** — the account itself (address, balance, flags)
- **Offer** — DEX offers
- **Escrow** — conditional payments
- **Ticket** — sequence tickets
- **PayChannel** — payment channels
- **Check** — checks
- **DepositPreauth** — deposit pre-authorizations
- **URIToken** — non-fungible tokens
- **RippleState** — TrustLines

Only the **owner or issuer** of the object can modify its Remarks (except for URITokens and TrustLines, where the token issuer has permission).

### SetRemarks Fields

| Field | Type | Required | Description |
|---|---|---|---|
| \`TransactionType\` | String | Yes | \`"SetRemarks"\` |
| \`Account\` | String | Yes | Account sending the transaction (must be owner/issuer of the object) |
| \`ObjectID\` | Hash256 | Yes | ID of the ledger object to attach the Remarks to |
| \`Remarks\` | Array | Yes | Array of \`Remark\` objects to create, modify, or delete |

### Structure of each Remark

Each array element contains a \`Remark\` object with:

| Field | Type | Required | Description |
|---|---|---|---|
| \`RemarkName\` | Blob | Yes | Name/key of the Remark (1–256 bytes). Must be unique per object |
| \`RemarkValue\` | Blob | No | Value of the Remark (1–256 bytes). **Omit to delete** the Remark |
| \`Flags\` | UInt32 | No | \`1\` (\`tfImmutable\`) makes the Remark **permanent and unmodifiable** |

The values of \`RemarkName\` and \`RemarkValue\` are expressed in **hexadecimal**.

### Getting the ObjectID of an account

To attach Remarks to your own account (AccountRoot), you need its \`ObjectID\`, which is the \`index\` field of the object in the ledger:

\`\`\`javascript
const info = await client.request({
  command: "account_info",
  account: wallet.address,
  ledger_index: "validated",
});
const objectID = info.result.account_data.index;
\`\`\`

For other objects (Escrow, Check, Offer...) the \`ObjectID\` is the \`LedgerIndex\` that appears in the \`AffectedNodes\` when the object is created.

### Deleting a Remark

Omit \`RemarkValue\` in the corresponding \`Remark\` object. Xahau will remove that entry from the object.

### Immutable Remarks

If you add \`Flags: 1\` (\`tfImmutable\`) when creating a Remark, **it cannot be modified or deleted** in the future. Useful for certifications or data that must remain permanently sealed.

### Limits and costs

- **Maximum 32 Remarks** per ledger object
- **Additional fee**: 1 drop per byte of \`RemarkName\` + \`RemarkValue\` in the transaction
- Name and value: between 1 and 256 bytes each
- Names must be unique within the same object

### Common errors

| Error | Cause |
|---|---|
| \`temDISABLED\` | The Remarks amendment is not active on the network |
| \`tecNO_PERMISSION\` | The account is not the owner/issuer of the object |
| \`tecIMMUTABLE\` | Attempting to modify a Remark with \`tfImmutable\` |
| \`tecTOO_MANY_REMARKS\` | The object already has 32 Remarks (the maximum allowed) |`,
        jp: `\`SetRemarks\`トランザクションは、Xahauの既存のオブジェクトに**キーと値のペア**を添付します。これはトランザクションでメッセージを送ったりデータを記録したりする方法ではありません。これはレジャーオブジェクト（アカウント、オファー、エスクロー、チェック、URIToken、トラストライン...）にオブジェクト自体に関連付けられたメタデータを**注釈する**メカニズムです。

### どのタイプのオブジェクトがRemarksをサポートするか？

\`SetRemarks\`は以下のタイプのオブジェクトにメタデータを添付できます。

- **AccountRoot** — アカウント自体（アドレス、残高、フラグ）
- **Offer** — DEXのオファー
- **Escrow** — 条件付き支払い
- **Ticket** — シーケンスチケット
- **PayChannel** — ペイメントチャンネル
- **Check** — チェック
- **DepositPreauth** — デポジット事前承認
- **URIToken** — 非代替性トークン
- **RippleState** — トラストライン

オブジェクトの**所有者または発行者**のみがRemarksを変更できます（トラストラインを除き、発行者が権限を持ちます）。

### SetRemarksのフィールド

| フィールド | タイプ | 必須 | 説明 |
|---|---|---|---|
| \`TransactionType\` | String | Yes | \`"SetRemarks"\` |
| \`Account\` | String | Yes | トランザクションを送信するアカウント（オブジェクトの発行者でなければなりません） |
| \`ObjectID\` | Hash256 | Yes | Remarksを添付するレジャーオブジェクトのID |
| \`Remarks\` | Array | Yes | 作成、変更、または削除する\`Remark\`オブジェクトの配列 |

### 各Remarkの構造

配列の各要素には以下を持つ\`Remark\`オブジェクトが含まれます：

| フィールド | タイプ | 必須 | 説明 |
|---|---|---|---|
| \`RemarkName\` | Blob | Yes | Remarkの名前/キー（1〜256バイト）。オブジェクトごとに一意でなければなりません |
| \`RemarkValue\` | Blob | No | Remarkの値（1〜256バイト）。Remarkを**削除するには省略** |
| \`Flags\` | UInt32 | No | \`1\`（\`tfImmutable\`）はRemarkを**永続的かつ変更不可**にします |

\`RemarkName\`と\`RemarkValue\`の値は**16進数**で表されます。

### アカウントのObjectIDの取得

自分のアカウント（AccountRoot）にRemarksを添付するには、レジャー内のオブジェクトの\`index\`フィールドである\`ObjectID\`が必要です：

\`\`\`javascript
const info = await client.request({
  command: "account_info",
  account: wallet.address,
  ledger_index: "validated",
});
const objectID = info.result.account_data.index;
\`\`\`

他のオブジェクト（Escrow、Check、Offer...）の場合、\`ObjectID\`はオブジェクト作成時の\`AffectedNodes\`に表示される\`LedgerIndex\`です。

### Remarkの削除

対応する\`Remark\`オブジェクトの\`RemarkValue\`を省略します。Xahauはオブジェクトからそのエントリを削除します。

### 不変のRemarks

Remarkを作成するときに\`Flags: 1\`（\`tfImmutable\`）を追加すると、将来的に**変更または削除できなく**なります。永続的に封印する必要のある証明書やデータに便利です。

### 制限とコスト

- レジャーオブジェクトあたり最大**32 Remarks**
- **追加fee**：トランザクション内の\`RemarkName\` + \`RemarkValue\`の各バイトあたり1 drop
- 名前と値：それぞれ1〜256バイト
- 名前は同じオブジェクト内で一意でなければなりません

### よくあるエラー

| エラー | 原因 |
|---|---|
| \`temDISABLED\` | Remarks Amendmentがネットワークで有効になっていない |
| \`tecNO_PERMISSION\` | アカウントがオブジェクトの発行者ではない |
| \`tecIMMUTABLE\` | \`tfImmutable\`フラグ付きのRemarkを変更しようとしている |
| \`tecTOO_MANY_REMARKS\` | オブジェクトにすでに32個のRemarks（最大許容数）がある |`,
        ko: `**SetRemarks**는 레저 객체 자체에 **키-값 메타데이터**를 붙이는 트랜잭션입니다. 단순 메시지 기록이 아니라 객체 수준의 주석 또는 부가 정보를 저장하는 기능에 가깝습니다.

### 적용 가능한 객체 예시

- \`AccountRoot\`
- \`Offer\`
- \`Escrow\`
- \`Ticket\`
- \`Check\`
- \`URIToken\`
- \`RippleState\`

### 언제 유용한가?

- 내부 식별자 연결
- 운영 상태 표시
- 외부 시스템과 객체 매핑

Remarks를 설계할 때는 누가 수정 권한을 가지는지와 값 구조를 명확히 정하는 것이 중요합니다.`,
        zh: `**SetRemarks** 是把**键值元数据**附加到账本对象本身的交易。它不是普通消息记录，而更像是在对象层面保存注释或附加信息。

### 可应用的对象示例

- \`AccountRoot\`
- \`Offer\`
- \`Escrow\`
- \`Ticket\`
- \`Check\`
- \`URIToken\`
- \`RippleState\`

### 什么时候有用？

- 关联内部标识符
- 标记运营状态
- 将外部系统与链上对象建立映射

设计 Remarks 时，关键是先明确谁有修改权限，以及值结构如何定义。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Añadir y actualizar Remarks en tu cuenta (AccountRoot)",
            pt: "Adicionar e atualizar Remarks na sua conta (AccountRoot)",
            en: "Add and update Remarks on your account (AccountRoot)",
            jp: "アカウント（AccountRoot）へのRemarksの追加と更新",
            zh: "在你的账户上添加和更新 Remarks（AccountRoot）",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// Los RemarkName y RemarkValue se expresan en hexadecimal
function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function setAccountRemarks() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Obtener el ObjectID del AccountRoot (campo "index" de account_info)
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;

  console.log("=== SetRemarks en AccountRoot ===");
  console.log("Cuenta:", wallet.address);
  console.log("ObjectID:", objectID);

  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("nombre"),
          RemarkValue: toHex("Learn Xahau Demo"),
        },
      },
      {
        Remark: {
          RemarkName: toHex("web"),
          RemarkValue: toHex("https://learnxahau.inftf.org"),
        },
      },
      {
        // Remark inmutable: no se podrá modificar ni eliminar nunca
        Remark: {
          RemarkName: toHex("creado"),
          RemarkValue: toHex(new Date().toISOString()),
          Flags: 1, // tfImmutable
        },
      },
    ],
  };

  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("Remarks adjuntadas al AccountRoot.");
    console.log("Nota: la Remark 'creado' es inmutable y no se podrá cambiar.");
  }

  await client.disconnect();
}

setAccountRemarks();`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
// Os RemarkName e RemarkValue são expressas em hexadecimal
function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}
async function setAccountRemarks() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // Obter ou ObjectID do AccountRoot (campo "index" de account_info)
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;
  console.log("=== SetRemarks em AccountRoot ===");
  console.log("Conta:", wallet.address);
  console.log("ObjectID:", objectID);
  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("nome"),
          RemarkValue: toHex("Learn Xahau Demo"),
        },
      },
      {
        Remark: {
          RemarkName: toHex("web"),
          RemarkValue: toHex("https://learnxahau.inftf.org"),
        },
      },
      {
        // Remark imutável: nunca poderá ser modificada nem removida
        Remark: {
          RemarkName: toHex("criado"),
          RemarkValue: toHex(new Date().toISOString()),
          Flags: 1, // tfImmutable
        },
      },
    ],
  };
  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  const txResult = result.result.meta.TransactionResult;
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);
  if (txResult === "tesSUCCESS") {
    console.log("Remarks adjuntadas ao AccountRoot.");
    console.log("Nota: a Remark 'criado' é imutável e não poderá mudar.");
  }
  await client.disconnect();
}
setAccountRemarks();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// RemarkName and RemarkValue are expressed in hexadecimal
function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function setAccountRemarks() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Get the ObjectID of the AccountRoot (the "index" field from account_info)
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;

  console.log("=== SetRemarks on AccountRoot ===");
  console.log("Account:", wallet.address);
  console.log("ObjectID:", objectID);

  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("name"),
          RemarkValue: toHex("Learn Xahau Demo"),
        },
      },
      {
        Remark: {
          RemarkName: toHex("web"),
          RemarkValue: toHex("https://learnxahau.inftf.org"),
        },
      },
      {
        // Immutable Remark: cannot be modified or deleted ever
        Remark: {
          RemarkName: toHex("created"),
          RemarkValue: toHex(new Date().toISOString()),
          Flags: 1, // tfImmutable
        },
      },
    ],
  };

  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Result:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("Remarks attached to the AccountRoot.");
    console.log("Note: the 'created' Remark is immutable and cannot be changed.");
  }

  await client.disconnect();
}

setAccountRemarks();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// RemarkNameとRemarkValueは16進数で表されます
function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function setAccountRemarks() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // AccountRootのObjectIDを取得（account_infoの"index"フィールド）
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;

  console.log("=== AccountRootへのSetRemarks ===");
  console.log("アカウント:", wallet.address);
  console.log("ObjectID:", objectID);

  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("名前"),
          RemarkValue: toHex("Learn Xahau Demo"),
        },
      },
      {
        Remark: {
          RemarkName: toHex("web"),
          RemarkValue: toHex("https://learnxahau.inftf.org"),
        },
      },
      {
        // 不変のRemark：今後変更・削除不可
        Remark: {
          RemarkName: toHex("作成日"),
          RemarkValue: toHex(new Date().toISOString()),
          Flags: 1, // tfImmutable
        },
      },
    ],
  };

  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("結果:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("AccountRootにRemarksが添付されました。");
    console.log("注意：'作成日'のRemarkは不変で変更できません。");
  }

  await client.disconnect();
}

setAccountRemarks();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// RemarkName 和 RemarkValue 需要用十六进制表示
function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function setAccountRemarks() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // 获取 AccountRoot 的 ObjectID（account_info 返回中的 "index" 字段）
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;

  console.log("=== 在 AccountRoot 上执行 SetRemarks ===");
  console.log("账户:", wallet.address);
  console.log("ObjectID:", objectID);

  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("name"),
          RemarkValue: toHex("Learn Xahau Demo"),
        },
      },
      {
        Remark: {
          RemarkName: toHex("web"),
          RemarkValue: toHex("https://learnxahau.inftf.org"),
        },
      },
      {
        // 不可变 Remark：之后不能再修改或删除
        Remark: {
          RemarkName: toHex("created"),
          RemarkValue: toHex(new Date().toISOString()),
          Flags: 1, // tfImmutable
        },
      },
    ],
  };

  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("结果:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("Remarks 已附加到 AccountRoot。");
    console.log("注意：'created' 这条 Remark 是不可变的，之后无法修改。");
  }

  await client.disconnect();
}

setAccountRemarks();`,
          },
        },
        {
          title: {
            es: "Eliminar una Remark (omitir RemarkValue)",
            pt: "Eliminar uma Remark (omitir RemarkValue)",
            en: "Delete a Remark (omit RemarkValue)",
            jp: "Remarkの削除（RemarkValueを省略）",
            zh: "删除一条 Remark（省略 RemarkValue）",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function deleteRemark() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Obtener el ObjectID del AccountRoot
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;

  // Para eliminar una Remark: incluir solo RemarkName, sin RemarkValue
  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("web"), // Eliminar la Remark con nombre "web"
          // Sin RemarkValue → se elimina la entrada
        },
      },
      {
        Remark: {
          RemarkName: toHex("nombre"), // Actualizar el valor de "nombre"
          RemarkValue: toHex("Cuenta actualizada"),
        },
      },
    ],
  };

  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Eliminar/actualizar Remarks ===");
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("Remark 'web' eliminada.");
    console.log("Remark 'nombre' actualizada.");
  } else if (txResult === "tecIMMUTABLE") {
    console.log("No se puede modificar: alguna Remark tiene el flag tfImmutable.");
  }

  await client.disconnect();
}

deleteRemark();`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}
async function deleteRemark() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // Obter ou ObjectID do AccountRoot
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;
  // Para eliminar uma Remark: incluir apenas RemarkName, sem RemarkValue
  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("web"), // Eliminar a Remark com nome "web"
          // Sem RemarkValue → se eliminà entrada
        },
      },
      {
        Remark: {
          RemarkName: toHex("nome"), // Atualizar o valor de "nome"
          RemarkValue: toHex("Conta actualizada"),
        },
      },
    ],
  };
  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  const txResult = result.result.meta.TransactionResult;
  console.log("=== Eliminar/atualizar Remarks ===");
  console.log("Resultado:", txResult);
  if (txResult === "tesSUCCESS") {
    console.log("Remark 'web' eliminada.");
    console.log("Remark 'nome' actualizada.");
  } else if (txResult === "tecIMMUTABLE") {
    console.log("Não é possivel modificar: alguna Remark tno flag tfImmutable.");
  }
  await client.disconnect();
}
deleteRemark();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function deleteRemark() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Get the ObjectID of the AccountRoot
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;

  // To delete a Remark: include only RemarkName, without RemarkValue
  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("web"), // Delete the Remark named "web"
          // No RemarkValue → the entry is deleted
        },
      },
      {
        Remark: {
          RemarkName: toHex("name"), // Update the value of "name"
          RemarkValue: toHex("Updated account"),
        },
      },
    ],
  };

  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Delete/update Remarks ===");
  console.log("Result:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("Remark 'web' deleted.");
    console.log("Remark 'name' updated.");
  } else if (txResult === "tecIMMUTABLE") {
    console.log("Cannot modify: one of the Remarks has the tfImmutable flag.");
  }

  await client.disconnect();
}

deleteRemark();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function deleteRemark() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // AccountRootのObjectIDを取得
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;

  // Remarkの削除：RemarkValueなしでRemarkNameのみ含める
  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("ウェブ"), // "ウェブ"という名前のRemarkを削除
          // RemarkValueなし → エントリが削除される
        },
      },
      {
        Remark: {
          RemarkName: toHex("名前"), // "名前"の値を更新
          RemarkValue: toHex("更新済みアカウント"),
        },
      },
    ],
  };

  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Remarksの削除/更新 ===");
  console.log("結果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("'ウェブ'のRemarkが削除されました。");
    console.log("'名前'のRemarkが更新されました。");
  } else if (txResult === "tecIMMUTABLE") {
    console.log("変更不可：いずれかのRemarkにtfImmutableフラグが設定されています。");
  }

  await client.disconnect();
}

deleteRemark();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function deleteRemark() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // 获取 AccountRoot 的 ObjectID
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;

  // 删除 Remark：只传 RemarkName，不传 RemarkValue
  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("web"), // 删除名为 "web" 的 Remark
          // 没有 RemarkValue -> 会删除这条记录
        },
      },
      {
        Remark: {
          RemarkName: toHex("name"), // 更新 "name" 的值
          RemarkValue: toHex("Updated account"),
        },
      },
    ],
  };

  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== 删除/更新 Remarks ===");
  console.log("结果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("Remark 'web' 已删除。");
    console.log("Remark 'name' 已更新。");
  } else if (txResult === "tecIMMUTABLE") {
    console.log("无法修改：其中一条 Remark 带有 tfImmutable 标志。");
  }

  await client.disconnect();
}

deleteRemark();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "SetRemarks", pt: "SetRemarks", en: "SetRemarks", jp: "SetRemarks", zh: "SetRemarks" },
          content: {
            es: "Metadata clave-valor en objetos del ledger\n\n• Adjunta Remarks a: AccountRoot, Offer,\n  Escrow, Check, URIToken, TrustLine...\n• RemarkName + RemarkValue (en hex)\n• Solo el propietario/emisor puede modificar\n• Máximo 32 Remarks por objeto\n\nNo es un mensaje: es metadata del objeto",
            pt: "Metadata chave-valor em objetos do ledger\n\n• Anexa Remarks a: AccountRoot, Offer,\n  Escrow, Check, URIToken, TrustLine...\n• RemarkName + RemarkValue (em hex)\n• Apenas o proprietário/emissor pode modificar\n• Máximo 32 Remarks por objeto\n\nNão é uma mensagem: é metadados do objeto",
            en: `Key-value metadata on ledger objects

• Attach Remarks to: AccountRoot, Offer,
  Escrow, Check, URIToken, TrustLine...
• RemarkName + RemarkValue (in hex)
• Only the owner/issuer can modify
• Maximum 32 Remarks per object

Not a message: it is object metadata`,
            jp: "レジャーオブジェクトへのキーと値のメタデータ\n\n• Remarksの添付先：AccountRoot、Offer、\n  Escrow、Check、URIToken、TrustLine...\n• RemarkName + RemarkValue（16進数）\n• 所有者/発行者のみ変更可能\n• オブジェクトあたり最大32 Remarks\n\nメッセージではない：オブジェクトのメタデータです",
            zh: "账本对象上的键值元数据\n\n• 可附加到：AccountRoot、Offer、\n  Escrow、Check、URIToken、TrustLine...\n• RemarkName + RemarkValue（十六进制）\n• 只有所有者/发行者可以修改\n• 每个对象最多 32 条 Remarks\n\n它不是消息，而是对象元数据",
          },
          visual: "🏷️",
        },
        {
          title: { es: "Crear, modificar y eliminar", pt: "Criar, modificar e eliminar", en: "Create, modify and delete", jp: "作成、変更、削除", zh: "创建、修改和删除" },
          content: {
            es: "Crear / actualizar:\n  → RemarkName + RemarkValue\n\nEliminar:\n  → Solo RemarkName, sin RemarkValue\n\nInmutable (tfImmutable = Flags: 1):\n  → No se puede modificar ni eliminar nunca\n\nFee extra: 1 drop por byte de nombre + valor",
            pt: "Criar / atualizar:\n  → RemarkName + RemarkValue\n\nEliminar:\n  → Apenas RemarkName, sem RemarkValue\n\nImutável (tfImmutable = Flags: 1):\n  → Não é possivel modificar nem eliminar nunca\n\nFee extra: 1 drop por byte de nome + valor",
            en: "Create / update:\n  → RemarkName + RemarkValue\n\nDelete:\n  → RemarkName only, no RemarkValue\n\nImmutable (tfImmutable = Flags: 1):\n  → Cannot be modified or deleted ever\n\nExtra fee: 1 drop per byte of name + value",
            jp: "作成 / 更新：\n  → RemarkName + RemarkValue\n\n削除：\n  → RemarkNameのみ、RemarkValueなし\n\n不変（tfImmutable = Flags: 1）：\n  → 今後変更・削除不可\n\n追加fee：名前 + 値のバイトあたり1 drop",
            zh: "创建 / 更新：\n  → RemarkName + RemarkValue\n\n删除：\n  → 只传 RemarkName，不传 RemarkValue\n\n不可变（tfImmutable = Flags: 1）：\n  → 以后都不能修改或删除\n\n额外手续费：名称 + 值每字节 1 drop",
          },
          visual: "✏️",
        },
        {
          title: { es: "ObjectID: ¿qué objeto anotar?", pt: "ObjectID: qual objeto anotar?", en: "ObjectID: which object to annotate?", jp: "ObjectID：どのオブジェクトに注釈するか？", zh: "ObjectID：要标注哪个对象？" },
          content: {
            es: "Cada objeto del ledger tiene un ID único:\n\n• AccountRoot → account_data.index\n• Escrow, Check, Offer → LedgerIndex\n  de los AffectedNodes al crear el objeto\n\nSetRemarks necesita ese ID para saber\na qué objeto adjuntar la metadata",
            pt: "Cada objeto do ledger tem um ID único:\n\n• AccountRoot → account_data.index\n• Escrow, Check, Offer → LedgerIndex\n  dos AffectedNodes ao criar o objeto\n\nSetRemarks precisa esse ID para saber\na qual objeto anexar a metadados",
            en: `Each ledger object has a unique ID:

• AccountRoot → account_data.index
• Escrow, Check, Offer → LedgerIndex
  from AffectedNodes when creating the object

SetRemarks needs that ID to know
which object to attach the metadata to`,
            jp: "各レジャーオブジェクトには一意のIDがあります：\n\n• AccountRoot → account_data.index\n• Escrow、Check、Offer → オブジェクト作成時の\n  AffectedNodesのLedgerIndex\n\nSetRemarksはそのIDを使用して\nどのオブジェクトにメタデータを\n添付するかを識別します",
            zh: "每个账本对象都有唯一 ID：\n\n• AccountRoot → account_data.index\n• Escrow、Check、Offer → 创建对象时\n  AffectedNodes 中的 LedgerIndex\n\nSetRemarks 需要这个 ID，才能知道\n要把元数据附加到哪个对象",
          },
          visual: "🔍",
        },
      ],
    },
    {
      id: "m10l7",
      title: {
        es: "Remit: transacción multi-función",
        pt: "Remit: transação multi-função",
        en: "Remit: Multi-function Transaction",
        jp: "Remit：マルチ機能トランザクション",
        ko: "Remit: 다기능 트랜잭션",
        zh: "Remit：多功能交易",
      },
      theory: {
        es: `La transacción \`Remit\` es una operación exclusiva de Xahau que combina múltiples acciones en una sola transacción. Puede **activar cuentas**, **enviar pagos** (XAH o IOUs) y realizar **operaciones con URITokens** (transferir o mintear), todo de una vez. Además, **paga todos los fees** de activación de cuenta, TrustLines y reservas de URITokens.

### ¿Por qué usar Remit?

En lugar de enviar varias transacciones separadas (una para activar la cuenta, otra para pagar, otra para transferir un URIToken), \`Remit\` lo hace todo en una sola transacción atómica. Esto ahorra tiempo, fees y garantiza que todas las operaciones ocurren juntas o ninguna.

### Campos de Remit

| Campo | Requerido | Descripción |
|---|---|---|
| \`Account\` | Sí | Cuenta que envía la transacción |
| \`Destination\` | Sí | Cuenta de destino |
| \`Amounts\` | No | Array de hasta **32** objetos \`AmountEntry\` con pagos |
| \`URITokenIDs\` | No | Array de hasta **32** IDs de URITokens a transferir |
| \`MintURIToken\` | No | Objeto para mintear un nuevo URIToken directamente en el destino |
| \`DestinationTag\` | No | Tag numérico para el destino |
| \`Inform\` | No | Cuenta con Hook que será notificada de la transacción |
| \`Blob\` | No | Datos arbitrarios en hex (hasta 128 KB) para uso de Hooks |
| \`InvoiceID\` | No | Identificador de 256 bits para el motivo de la transacción |

### AmountEntry

Cada entrada del array \`Amounts\` contiene un campo \`Amount\` que puede ser XAH nativo (string de drops) o un IOU (objeto con \`currency\`, \`issuer\`, \`value\`):

\`\`\`
"Amounts": [
  { "AmountEntry": { "Amount": "50000000" } },              // 50 XAH
  { "AmountEntry": { "Amount": {                             // 100 USD
    "currency": "USD",
    "issuer": "rEmisorDelToken",
    "value": "100"
  }}}
]
\`\`\`

No se permiten cantidades duplicadas de la misma divisa en el array.

### MintURIToken

El campo \`MintURIToken\` permite crear un nuevo URIToken que se asigna directamente a la cuenta de destino:

| Campo | Descripción |
|---|---|
| \`URI\` | URI del token (máximo 256 bytes, en hex) |
| \`Digest\` | (Opcional) Hash del contenido apuntado por el URI |
| \`Flags\` | (Opcional) \`1\` (\`tfBurnable\`) permite al emisor quemar el token posteriormente |

### Transferir URITokens

Con \`URITokenIDs\` puedes transferir hasta 32 URITokens existentes al destino en una sola transacción. Los URITokens deben pertenecer a la cuenta que envía y tener los permisos necesarios.

### Fees y reservas

Remit paga automáticamente los costes adicionales asociados a cada acción:
- **Activación de cuenta**: Si la cuenta de destino no existe, se activa con la reserva base
- **TrustLines**: Si se envían IOUs y la cuenta de destino necesita nuevas TrustLines, se crean y se cubre la reserva
- **Reservas de URITokens**: Las reservas por URITokens transferidos o minteados se cubren automáticamente

Todos estos costes se deducen de la cuenta que envía la transacción (\`Account\`), además del fee estándar de la transacción.

### Más información

Para una referencia completa de \`Remit\`, incluyendo todos los campos y errores posibles, consulta la [documentación oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/remit/).

### Ejecutar el ejemplo dos veces

El ID de un URIToken sale de su emisor y de su URI. Una segunda ejecución del ejemplo con la misma URI devuelve \`tecDUPLICATE\`, y tampoco se envía el pago: falla el Remit entero. Para ejecutarlo de nuevo, cambia la URI.`,
        pt: `A transação \`Remit\` é uma operação exclusiva de Xahau que combina múltiplas ações em uma única transação. Pode **ativar contas**, **enviar pagamentos** (XAH ou IOUs) e realizar **operações com URITokens** (transferir ou mintar), tudo de uma vez. Além disso, **paga todos os fees** de ativação de conta, TrustLines e reservas de URITokens.
### Por que usar Remit?
Em lugar de enviar várias transações separadas (uma para ativar a conta, outra para pagar, outra para transferir um URIToken), \`Remit\` faz tudo em uma única transação atômica. Isso economiza tempo, fees e garante que todas as operações ocorrem juntas ou nenhuma ocorre.
### Campos de Remit
| Campo | Requerido | Descrição |
|---|---|---|
| \`Account\` | Sim | Conta que envíà transação |
| \`Destination\` | Sim | Conta de destino |
| \`Amounts\` | Não | Array de até **32** objetos \`AmountEntry\` com pagamentos |
| \`URITokenIDs\` | Não | Array de até **32** IDs de URITokens a transferir |
| \`MintURIToken\` | Não | Objeto para mintar um novo URIToken diretamente no destino |
| \`DestinationTag\` | Não | Tag numérico para o destino |
| \`Inform\` | Não | Conta com Hook que será notificada da transação |
| \`Blob\` | Não | Dados arbitrarios em hex (até 128 KB) para uso de Hooks |
| \`InvoiceID\` | Não | Identificador de 256 bits para o motivo da transação |
### AmountEntry
Cada entrada do array \`Amounts\` contem um campo \`Amount\` que pode ser XAH nativo (string de drops) ou um IOU (objeto com \`currency\`, \`issuer\`, \`value\`):
\`\`\`
"Amounts": [
  { "AmountEntry": { "Amount": "50000000" } },              // 50 XAH
  { "AmountEntry": { "Amount": {                             // 100 USD
    "currency": "USD",
    "issuer": "rEmisorDelToken",
    "value": "100"
  }}}
]
\`\`\`
Não são permitidas quantidades duplicadas da mesma moeda no array.
### MintURIToken
O campo \`MintURIToken\` permite criar um novo URIToken que se asigna diretamente à conta de destino:
| Campo | Descrição |
|---|---|
| \`URI\` | URI do token (máximo 256 bytes, em hex) |
| \`Digest\` | (Opcional) Hash do contenido apuntado por o URI |
| \`Flags\` | (Opcional) \`1\` (\`tfBurnable\`) permite ao emissor quemar o token posteriormente |
### Transferir URITokens
Com \`URITokenIDs\` você pode transferir até 32 URITokens existentes ao destino em uma única transação. Os URITokens devem pertenecer à conta que envia e ter os permisos necesarios.
### Fees e reservas
O Remit paga automaticamente os custos adicionais associados a cada ação:
- **Ativação de conta**: Se a conta de destino não existe, se ativa com a reserva base
- **TrustLines**: se forem enviados IOUs e a conta de destino precisar de novas TrustLines, elas são criadas e a reserva é coberta
- **Reservas de URITokens**: As reservas por URITokens transferidos ou minteados são cobertas automaticamente
Todos esses custos são deduzidos da conta que envia a transação (\`Account\`), além da fee padrão da transação.
### Mais informação
Para uma referência completa do \`Remit\`, incluindo todos os campos e erros possíveis, consulte a [documentação oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/remit/).

### Executar o exemplo duas vezes

O ID de um URIToken vem do seu emissor e da sua URI. Uma segunda execução do exemplo com a mesma URI retorna \`tecDUPLICATE\`, e o pagamento também não é enviado: o Remit inteiro falha. Para executá-lo de novo, mude a URI.`,
        en: `The \`Remit\` transaction is an operation exclusive to Xahau that combines multiple actions in a single transaction. It can **activate accounts**, **send payments** (XAH or IOUs) and perform **URIToken operations** (transfer or mint), all at once. It also **pays all fees** for account activation, TrustLines and URIToken reserves.

### Why use Remit?

Instead of sending several separate transactions (one to activate the account, one to pay, one to transfer a URIToken), \`Remit\` does it all in a single atomic transaction. This saves time, fees and ensures all operations happen together or not at all.

### Remit fields

| Field | Required | Description |
|---|---|---|
| \`Account\` | Yes | Account sending the transaction |
| \`Destination\` | Yes | Destination account |
| \`Amounts\` | No | Array of up to **32** \`AmountEntry\` objects with payments |
| \`URITokenIDs\` | No | Array of up to **32** URIToken IDs to transfer |
| \`MintURIToken\` | No | Object to mint a new URIToken directly at the destination |
| \`DestinationTag\` | No | Numeric tag for the destination |
| \`Inform\` | No | Account with Hook that will be notified of the transaction |
| \`Blob\` | No | Arbitrary data in hex (up to 128 KB) for Hook use |
| \`InvoiceID\` | No | 256-bit identifier for the reason of the transaction |

### AmountEntry

Each entry in the \`Amounts\` array contains an \`Amount\` field that can be native XAH (drops string) or an IOU (object with \`currency\`, \`issuer\`, \`value\`):

\`\`\`
"Amounts": [
  { "AmountEntry": { "Amount": "50000000" } },              // 50 XAH
  { "AmountEntry": { "Amount": {                             // 100 USD
    "currency": "USD",
    "issuer": "rTokenIssuer",
    "value": "100"
  }}}
]
\`\`\`

Duplicate amounts in the same currency are not allowed in the array.

### MintURIToken

The \`MintURIToken\` field allows creating a new URIToken assigned directly to the destination account:

| Field | Description |
|---|---|
| \`URI\` | Token URI (maximum 256 bytes, in hex) |
| \`Digest\` | (Optional) Hash of the content pointed to by the URI |
| \`Flags\` | (Optional) \`1\` (\`tfBurnable\`) allows the issuer to burn the token later |

### Transferring URITokens

With \`URITokenIDs\` you can transfer up to 32 existing URITokens to the destination in a single transaction. The URITokens must belong to the sending account and have the necessary permissions.

### Fees and reserves

Remit automatically pays the additional costs associated with each action:
- **Account activation**: If the destination account does not exist, it is activated with the base reserve
- **TrustLines**: If IOUs are sent and the destination account needs new TrustLines, they are created and the reserve is covered
- **URIToken reserves**: Reserves for transferred or minted URITokens are covered automatically

All these costs are deducted from the sending account (\`Account\`), plus the standard transaction fee.

### More information

For a complete reference to \`Remit\`, including all fields and possible errors, see the [official documentation](https://xahau.network/docs/protocol-reference/transactions/transaction-types/remit/).

### Running the example twice

The ID of a URIToken comes from its issuer and its URI. A second run of the example with the same URI returns \`tecDUPLICATE\`, and the payment isn't sent either: the whole Remit fails. To run it again, change the URI.`,
        jp: `\`Remit\`トランザクションは、Xahau独自の操作で、単一のトランザクションに複数のアクションを組み合わせます。**アカウントの有効化**、**支払いの送信**（XAHまたはIOU）、**URIToken操作**（転送またはミント）をすべて一度に実行できます。また、アカウントの有効化、トラストライン、URITokenの準備金のための**すべてのfeeを支払います**。

### なぜRemitを使うのか？

複数の別々のトランザクション（アカウントの有効化、支払い、URITokenの転送）を送信する代わりに、\`Remit\`は単一のアトミックトランザクションでそれをすべて行います。時間とfeeを節約し、すべての操作が一緒に行われるかまったく行われないかを保証します。

### Remitのフィールド

| フィールド | 必須 | 説明 |
|---|---|---|
| \`Account\` | Yes | トランザクションを送信するアカウント |
| \`Destination\` | Yes | 宛先アカウント |
| \`Amounts\` | No | 支払いを含む最大**32**個の\`AmountEntry\`オブジェクトの配列 |
| \`URITokenIDs\` | No | 転送する最大**32**個のURIToken IDの配列 |
| \`MintURIToken\` | No | 宛先に対して直接ミントする新しいURITokenの情報 |
| \`DestinationTag\` | No | 宛先タグ |
| \`Inform\` | No | トランザクションの通知を受けるHookを持つアカウント |
| \`Blob\` | No | Hookで使用するための任意の16進数データ（最大128 KB） |
| \`InvoiceID\` | No | トランザクションの追加情報を示す256ビットの識別子 |

### AmountEntry

\`Amounts\`配列の各エントリには、次のようにネイティブXAH（drops文字列）またはIOU（\`currency\`、\`issuer\`、\`value\`を持つオブジェクト）の\`Amount\`フィールドが含まれます。

\`\`\`
"Amounts": [
  { "AmountEntry": { "Amount": "50000000" } },              // 50 XAH
  { "AmountEntry": { "Amount": {                             // 100 USD
    "currency": "USD",
    "issuer": "rTokenIssuer",
    "value": "100"
  }}}
]
\`\`\`

配列内で同じ通貨を複数回指定することはできません。

### MintURIToken

\`MintURIToken\`フィールドを利用することで、宛先アカウントに対して直接新しいURITokenをミントすることができます。

| フィールド | 説明 |
|---|---|
| \`URI\` | トークンURI（最大256バイト、16進数） |
| \`Digest\` | （オプション）URIが指すコンテンツのハッシュ |
| \`Flags\` | （オプション）\`1\`（\`tfBurnable\`）は発行者が後でトークンを焼却できるようにします |

### URITokenの転送

\`URITokenIDs\`を使用すると、単一のトランザクションで最大32個の既存URITokenを宛先に転送できます。URITokenは送信アカウントが保有し、必要な権限を持っている必要があります。

### feeと準備金

Remitは各アクションに関連する追加コストを自動的に支払います。
- **アカウントの有効化**：宛先アカウントが存在しない場合、基本準備金で有効化されます
- **トラストライン**：IOUが送信され、宛先アカウントが新しいトラストラインを必要とする場合、作成されて準備金がカバーされます
- **URIToken準備金**：転送またはミントされたURITokenの準備金が自動的にカバーされます

これらのコストはすべて送信アカウント（\`Account\`）から差し引かれ、標準のトランザクション手数料に加算されます。

### 詳細情報

すべてのフィールドと考えられるエラーを含む\`Remit\`の完全なリファレンスは、[公式ドキュメント](https://xahau.network/docs/protocol-reference/transactions/transaction-types/remit/)を参照してください。

### 例を2回実行する場合

URIToken の ID は発行者と URI から決まります。同じ URI で例をもう一度実行すると \`tecDUPLICATE\` が返り、支払いも送られません。Remit 全体が失敗します。もう一度実行するには URI を変更します。`,
        ko: `**Remit**는 Xahau 전용 다기능 트랜잭션입니다. 하나의 작업으로 **계정 활성화, 결제, URIToken 전송 또는 민팅**까지 묶어 처리할 수 있습니다.

### 장점

- 여러 작업을 **원자적으로** 실행
- 별도 트랜잭션 여러 개보다 간결
- 계정 활성화와 관련 준비금/수수료까지 함께 처리 가능

### 주요 필드

- \`Amounts\`
- \`URITokenIDs\`
- \`MintURIToken\`
- \`DestinationTag\`
- \`Inform\`
- \`Blob\`

복잡한 온보딩 흐름이나 다중 자산 전송에 특히 유용합니다.

### 예제를 두 번 실행하는 경우

URIToken의 ID는 발행자와 URI로 정해집니다. 같은 URI로 예제를 다시 실행하면 \`tecDUPLICATE\`가 반환되고 결제도 전송되지 않습니다. Remit 전체가 실패합니다. 다시 실행하려면 URI를 바꿉니다.`,
        zh: `**Remit** 是 Xahau 专有的多功能交易。它可以把**账户激活、支付、URIToken 转移或铸造**合并成一次操作。

### 优点

- 以**原子方式**执行多个动作
- 比发送多笔独立交易更简洁
- 连同账户激活相关准备金和费用一起处理

### 主要字段

- \`Amounts\`
- \`URITokenIDs\`
- \`MintURIToken\`
- \`DestinationTag\`
- \`Inform\`
- \`Blob\`

它尤其适合复杂的 onboarding 流程或多资产转移。

### 第二次运行示例

URIToken 的 ID 由发行方和 URI 决定。用同一个 URI 再次运行示例会返回 \`tecDUPLICATE\`，付款也不会发送：整个 Remit 都会失败。要再次运行，请修改 URI。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Remit: pago + minteo de URIToken en una sola transacción",
            pt: "Remit: pagamento + mint de URIToken em uma única transação",
            en: "Remit: payment + URIToken minting in a single transaction",
            jp: "Remit：単一トランザクションでの支払い + URITokenのミント",
            zh: "Remit：在单笔交易中完成支付 + URIToken 铸造",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");

function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function sendRemit() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // La cuenta CASH de .env recibe los fondos
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // Remit: enviar 25 XAH + mintear un URIToken para el destino
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: receiver,
    // Enviar 25 XAH
    Amounts: [
      {
        AmountEntry: {
          Amount: xahToDrops(25),
        },
      },
    ],
    // Mintear un URIToken directamente en la cuenta de destino
    MintURIToken: {
      URI: stringToHex("ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json"),
      Digest: "A".repeat(64), // Hash SHA-256 del contenido (64 hex chars)
      Flags: 1, // tfBurnable: el emisor puede quemar el token
    },
  };

  const prepared = await client.autofill(remit);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Remit ===");
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("En una sola transacción:");
    console.log("- Enviados 25 XAH al destino");
    console.log("- URIToken minteado directamente en la cuenta destino");
    console.log("- Fees de reservas cubiertos automáticamente");
  }

  await client.disconnect();
}

sendRemit();`,
            pt: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}
async function sendRemit() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // A conta CASH do .env recebe os fundos
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;
  // Remit: enviar 25 XAH + mintar um URIToken para o destino
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: receiver,
    // Enviar 25 XAH
    Amounts: [
      {
        AmountEntry: {
          Amount: xahToDrops(25),
        },
      },
    ],
    // Mintar um URIToken diretamente na conta de destino
    MintURIToken: {
      URI: stringToHex("ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json"),
      Digest: "A".repeat(64), // Hash SHA-256 do contenido (64 hex chars)
      Flags: 1, // tfBurnable: o emissor pode quemar o token
    },
  };
  const prepared = await client.autofill(remit);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  const txResult = result.result.meta.TransactionResult;
  console.log("=== Remit ===");
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);
  if (txResult === "tesSUCCESS") {
    console.log("Em uma sou transação:");
    console.log("- Enviados 25 XAH ao destino");
    console.log("- URIToken minteado diretamente na conta destino");
    console.log("- Fees de reservas cubiertos automaticamente");
  }
  await client.disconnect();
}
sendRemit();`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");

function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function sendRemit() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // The CASH account from .env receives the funds
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // Remit: send 25 XAH + mint a URIToken for the destination
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: receiver,
    // Send 25 XAH
    Amounts: [
      {
        AmountEntry: {
          Amount: xahToDrops(25),
        },
      },
    ],
    // Mint a URIToken directly in the destination account
    MintURIToken: {
      URI: stringToHex("ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json"),
      Digest: "A".repeat(64), // SHA-256 hash of the content (64 hex chars)
      Flags: 1, // tfBurnable: the issuer can burn the token
    },
  };

  const prepared = await client.autofill(remit);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Remit ===");
  console.log("Result:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("In a single transaction:");
    console.log("- 25 XAH sent to the destination");
    console.log("- URIToken minted directly in the destination account");
    console.log("- Reserve fees covered automatically");
  }

  await client.disconnect();
}

sendRemit();`,
            jp: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");

function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function sendRemit() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // .env の CASH アカウントが資金を受け取ります
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // Remit: 25 XAHの送信 + 宛先にURITokenをミント
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: receiver,
    // 25 XAHを送信
    Amounts: [
      {
        AmountEntry: {
          Amount: xahToDrops(25),
        },
      },
    ],
    // 宛先アカウントに直接URITokenをミント
    MintURIToken: {
      URI: stringToHex("ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json"),
      Digest: "A".repeat(64), // コンテンツのSHA-256ハッシュ（64 hex文字）
      Flags: 1, // tfBurnable：発行者がトークンを焼却できる
    },
  };

  const prepared = await client.autofill(remit);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Remit ===");
  console.log("結果:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("単一のトランザクションで：");
    console.log("- 25 XAHが宛先に送信されました");
    console.log("- URITokenが宛先アカウントに直接ミントされました");
    console.log("- リザーブfeeが自動的にカバーされました");
  }

  await client.disconnect();
}

sendRemit();`,
            zh: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
if (!process.env.CASH_SEED) throw new Error("CASH_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");

function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function sendRemit() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // .env 中的 CASH 账户接收资金
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'}).address;

  // Remit：发送 25 XAH，并为目标账户铸造一个 URIToken
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: receiver,
    // 发送 25 XAH
    Amounts: [
      {
        AmountEntry: {
          Amount: xahToDrops(25),
        },
      },
    ],
    // 直接在目标账户中铸造 URIToken
    MintURIToken: {
      URI: stringToHex("ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json"),
      Digest: "A".repeat(64), // 内容的 SHA-256 哈希（64 位十六进制字符）
      Flags: 1, // tfBurnable：发行者之后可以销毁该代币
    },
  };

  const prepared = await client.autofill(remit);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Remit ===");
  console.log("结果:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("在一笔交易中完成：");
    console.log("- 向目标地址发送了 25 XAH");
    console.log("- 直接在目标账户中铸造了 URIToken");
    console.log("- 相关准备金费用已自动支付");
  }

  await client.disconnect();
}

sendRemit();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Remit — Transacción multi-función", pt: "Remit — Transação multifunção", en: "Remit — Multi-function Transaction", jp: "Remit — マルチ機能トランザクション", zh: "Remit — 多功能交易" },
          content: {
            es: "Una transacción para todo:\n\n• Activar cuentas nuevas\n• Enviar hasta 32 pagos (XAH + IOUs)\n• Transferir hasta 32 URITokens\n• Mintear un URIToken en el destino\n\nTodo atómico: ocurre junto o no ocurre",
            pt: "Uma transação para tudo:\n\n• Ativar contas novas\n• Enviar até 32 pagamentos (XAH + IOUs)\n• Transferir até 32 URITokens\n• Mintar um URIToken no destino\n\nTudo atômico: ocorre junto ou não ocorre",
            en: "One transaction for everything:\n\n• Activate new accounts\n• Send up to 32 payments (XAH + IOUs)\n• Transfer up to 32 URITokens\n• Mint a URIToken at the destination\n\nAll atomic: happens together or not at all",
            jp: "あらゆることを1つのトランザクションで：\n\n• 新しいアカウントを有効化\n• 最大32件の支払いを送信（XAH + IOU）\n• 最大32個のURITokenを転送\n• 宛先でURITokenをミント\n\nすべてアトミック：一緒に行われるかまったく行われないか",
            zh: "一笔交易完成所有操作：\n\n• 激活新账户\n• 最多发送 32 笔付款（XAH + IOU）\n• 最多转移 32 个 URIToken\n• 在目标账户中铸造一个 URIToken\n\n全部原子执行：要么一起成功，要么全部不生效",
          },
          visual: "📦",
        },
        {
          title: { es: "Remit paga las reservas", pt: "Remit paga as reservas", en: "Remit pays the reserves", jp: "Remitはリザーブを支払う", zh: "Remit 支付准备金" },
          content: {
            es: "El emisor cubre todos los costes:\n\n• Activación de cuenta destino\n• Creación de TrustLines necesarias\n• Reservas de URITokens\n• Fee estándar de la transacción\n\nAhorra fees y garantiza atomicidad\nvs múltiples transacciones separadas",
            pt: `O emissor cobre todos os custos:

• Ativação de conta destino
• Criação de TrustLines necessárias
• Reservas de URITokens
• Fee padrão da transação

Economiza fees e garante atomicidade
vs múltiplas transações separadas`,
            en: "The sender covers all costs:\n\n• Destination account activation\n• Creation of required TrustLines\n• URIToken reserves\n• Standard transaction fee\n\nSaves fees and guarantees atomicity\nvs multiple separate transactions",
            jp: "送信者がすべてのコストをカバー：\n\n• 宛先アカウントの有効化\n• 必要なTrustLineの作成\n• URITokenのリザーブ\n• 標準トランザクションfee\n\n複数の別々のトランザクションと比較して\nfeeを節約しアトミック性を保証",
            zh: "发送方承担所有成本：\n\n• 目标账户激活\n• 创建所需 TrustLines\n• URIToken 准备金\n• 标准交易手续费\n\n相比多笔分开的交易，\n它更省手续费，也能保证原子性",
          },
          visual: "💸",
        },
      ],
    },
    {
      id: "m10l8",
      title: {
        es: "CronSet: ejecución automática de Hooks",
        pt: "CronSet: execução automática de Hooks",
        en: "CronSet: Automatic Hook Execution",
        jp: "CronSet：Hooksの自動実行",
        ko: "CronSet: 자동 Hook 실행",
        zh: "CronSet：自动执行 Hook",
      },
      theory: {
        es: `\`CronSet\` hace que la red ejecute el Hook de tu cuenta según un calendario, sin un servicio externo que envíe transacciones. Esta lección explica cómo lo hace la red, qué necesitan el Hook y la cuenta, y cuánto cuesta cada campo y cada ejecución.

### Cómo se ejecuta un cron

\`CronSet\` guarda un objeto **Cron** en tu cuenta: cuándo ejecutar, cada cuántos segundos y cuántas veces más. Cuando llega ese momento, la propia red crea una **pseudotransacción \`Cron\`**. Nadie la firma y no tiene fee; su campo \`Owner\` es tu cuenta. Esa transacción activa el Hook de tu cuenta. Después el objeto Cron pasa al siguiente momento, hasta que no quedan repeticiones y desaparece.

Una cuenta tiene como mucho un Cron. Un \`CronSet\` nuevo sustituye al actual.

### Qué necesitan el Hook y la cuenta

Tu cuenta no envía la transacción \`Cron\`, así que tu Hook se ejecuta como **transactional stakeholder débil** (TSH débil): se le informa de la transacción y no puede rechazarla. Una ejecución débil es una **collect call**, que paga la cuenta del Hook. Solo ocurre cuando las dos partes lo permiten:

1. **El Hook permite collect calls**: instalado con el flag \`hsfCOLLECT\` (\`4\`). Con \`hsfOVERRIDE\` (\`1\`), \`Flags: 5\`. Su \`HookOn\` también debe incluir el tipo de transacción \`Cron\`, \`92\`.
2. **La cuenta permite collect calls**: \`AccountSet\` con \`SetFlag: 11\` (\`asfTshCollect\`).

Si falta uno de los dos, \`CronSet\` sigue devolviendo \`tesSUCCESS\` y el cron sigue agotándose, pero el Hook nunca se ejecuta. Nada lo avisa: comprueba que ambos están configurados.

Un Hook que cuenta sus ejecuciones de Cron, y los campos para instalarlo como en la [lección 9.2](?m=9&l=1):

\`\`\`c
int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    if (otxn_type() != 92)   // 92 = ttCRON: solo cuenta la transacción Cron
        accept(SBUF("cron_counter: not a Cron"), __LINE__);

    // El contador vive en el estado del Hook, bajo la clave "CRON"
    uint8_t key[32] = { 'C', 'R', 'O', 'N' };
    uint64_t count = 0;
    state(SVAR(count), SBUF(key));
    count++;
    if (state_set(SVAR(count), SBUF(key)) < 0)
        rollback(SBUF("cron_counter: state_set failed"), __LINE__);
    accept(SBUF("cron_counter: counted"), __LINE__);
    return 0;
}
\`\`\`

\`\`\`javascript
Hook: {
  CreateCode: wasmHex,
  // Solo lo activa Cron (bit 92). El bit 22 (SetHook) funciona al revés: 0 = no se activa
  HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
  HookNamespace: namespace,
  HookApiVersion: 0,
  Flags: 5, // hsfOVERRIDE (1) + hsfCOLLECT (4)
}
\`\`\`

Resultado en testnet, con \`StartTime: 0\`, \`DelaySeconds: 10\` y \`RepeatCount: 2\`, leyendo el estado del Hook 50 segundos después:

\`\`\`
SetHook      tesSUCCESS   Flags: 5, HookOn with bit 92
AccountSet   tesSUCCESS   SetFlag: 11 (asfTshCollect)
CronSet      tesSUCCESS   Fee: 40 drops
Cron         StartTime: 843801161, DelaySeconds: 10, RepeatCount: 2
50 s después  estado del Hook CRON = 3
\`\`\`

- **\`RepeatCount: 2\` dio 3 ejecuciones**: la primera en \`StartTime\` y después 2 repeticiones.
- **\`StartTime: 0\`** pasó a ser la hora de cierre del ledger anterior: "ahora".
- **La misma prueba sin \`asfTshCollect\`, o con \`Flags: 1\`**, devuelve el mismo \`tesSUCCESS\` y no deja estado: el Hook nunca se ejecutó.

### Los campos

| Campo | Obligatorio | Significado |
|---|---|---|
| \`StartTime\` | Sí, para crear | Primera ejecución, en segundos desde el Ripple Epoch. \`0\` = ahora. Como mucho 365 días en el futuro |
| \`DelaySeconds\` | Con \`RepeatCount\` | Segundos entre ejecuciones, hasta 31.536.000 (365 días) |
| \`RepeatCount\` | Con \`DelaySeconds\` | Ejecuciones después de la primera, de 1 a 256 |
| \`Flags\` | Para borrar | \`1\` (\`tfCronUnset\`), sin ninguno de los campos anteriores |

\`DelaySeconds\` y \`RepeatCount\` van juntos o no van. Solo con \`StartTime\`, el Hook se ejecuta una vez. Con los dos, se ejecuta \`1 + RepeatCount\` veces. Para más de 257 ejecuciones, envía un \`CronSet\` nuevo antes de que termine el actual: lo sustituye.

Borrar siempre tiene éxito, aunque no haya ningún Cron.

### El tiempo en Ripple Epoch

\`StartTime\` cuenta segundos desde el 1 de enero de 2000 UTC, no desde 1970 como un timestamp de Unix:

\`\`\`javascript
// La hora actual en Ripple Epoch
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// Empezar dentro de una hora
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

### Cuánto cuesta un cron

- **El fee del \`CronSet\`** cubre la transacción y las ejecuciones que programa: el fee base × (2 + \`RepeatCount\`). Con un fee base de 10 drops y \`RepeatCount: 2\`, 40 drops, como en el resultado de arriba.
- **La reserva**: el objeto Cron cuenta en \`OwnerCount\` mientras existe.
- **Cada ejecución** es una collect call que se cobra a la cuenta. Si el saldo no la cubre por encima de la reserva, esa ejecución del Hook se omite.

### Los ejemplos

El primer ejemplo activa TSH Collect en \`WALLET\` y programa su Hook cada hora con \`RepeatCount: 24\`: 25 ejecuciones. Solo ejecuta algo si \`WALLET\` tiene un Hook instalado como el de arriba. El segundo ejemplo borra el cron con \`tfCronUnset\`.

### Errores

| Error | Causa |
|---|---|
| \`temMALFORMED\` | Falta \`StartTime\` al crear; solo uno de \`DelaySeconds\` y \`RepeatCount\`; \`RepeatCount\` 0 o mayor que 256; \`DelaySeconds\` de más de 365 días; \`tfCronUnset\` con otros campos |
| \`temINVALID_FLAG\` | Un flag distinto de \`tfCronUnset\` |
| \`tecEXPIRED\` | \`StartTime\` en el pasado, o a más de 365 días |
| \`tecINSUFFICIENT_RESERVE\` | El saldo no cubre la reserva de un objeto más |
| \`temDISABLED\` | La amendment Cron no está activada en la red |`,
        pt: `\`CronSet\` faz a rede executar o Hook da sua conta segundo um calendário, sem um serviço externo enviando transações. Esta lição explica como a rede faz isso, o que o Hook e a conta precisam e quanto custa cada campo e cada execução.

### Como um cron é executado

\`CronSet\` guarda um objeto **Cron** na sua conta: quando executar, a cada quantos segundos e quantas vezes mais. Quando esse momento chega, a própria rede cria uma **pseudotransação \`Cron\`**. Ninguém a assina e ela não tem fee; o seu campo \`Owner\` é a sua conta. Essa transação aciona o Hook da sua conta. Depois o objeto Cron passa para o próximo momento, até não restarem repetições, e desaparece.

Uma conta tem no máximo um Cron. Um \`CronSet\` novo substitui o atual.

### O que o Hook e a conta precisam

A sua conta não envia a transação \`Cron\`, então o seu Hook é executado como **transactional stakeholder fraco** (TSH fraco): ele é informado da transação e não pode rejeitá-la. Uma execução fraca é uma **collect call**, paga pela conta do Hook. Ela só acontece quando os dois lados permitem:

1. **O Hook permite collect calls**: instalado com a flag \`hsfCOLLECT\` (\`4\`). Com \`hsfOVERRIDE\` (\`1\`), \`Flags: 5\`. O seu \`HookOn\` também precisa incluir o tipo de transação \`Cron\`, \`92\`.
2. **A conta permite collect calls**: \`AccountSet\` com \`SetFlag: 11\` (\`asfTshCollect\`).

Se faltar um dos dois, \`CronSet\` continua devolvendo \`tesSUCCESS\` e o cron continua se esgotando, mas o Hook nunca é executado. Nada avisa: verifique se os dois estão configurados.

Um Hook que conta as suas execuções de Cron, e os campos para instalá-lo como na [lição 9.2](?m=9&l=1):

\`\`\`c
int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    if (otxn_type() != 92)   // 92 = ttCRON: só a transação Cron conta
        accept(SBUF("cron_counter: not a Cron"), __LINE__);

    // O contador fica no estado do Hook, na chave "CRON"
    uint8_t key[32] = { 'C', 'R', 'O', 'N' };
    uint64_t count = 0;
    state(SVAR(count), SBUF(key));
    count++;
    if (state_set(SVAR(count), SBUF(key)) < 0)
        rollback(SBUF("cron_counter: state_set failed"), __LINE__);
    accept(SBUF("cron_counter: counted"), __LINE__);
    return 0;
}
\`\`\`

\`\`\`javascript
Hook: {
  CreateCode: wasmHex,
  // Só Cron (bit 92) o aciona. O bit 22 (SetHook) funciona ao contrário: 0 = não aciona
  HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
  HookNamespace: namespace,
  HookApiVersion: 0,
  Flags: 5, // hsfOVERRIDE (1) + hsfCOLLECT (4)
}
\`\`\`

Resultado na testnet, com \`StartTime: 0\`, \`DelaySeconds: 10\` e \`RepeatCount: 2\`, lendo o estado do Hook 50 segundos depois:

\`\`\`
SetHook      tesSUCCESS   Flags: 5, HookOn with bit 92
AccountSet   tesSUCCESS   SetFlag: 11 (asfTshCollect)
CronSet      tesSUCCESS   Fee: 40 drops
Cron         StartTime: 843801161, DelaySeconds: 10, RepeatCount: 2
50 s depois  estado do Hook CRON = 3
\`\`\`

- **\`RepeatCount: 2\` deu 3 execuções**: a primeira em \`StartTime\` e depois 2 repetições.
- **\`StartTime: 0\`** virou a hora de fechamento do ledger anterior: "agora".
- **O mesmo teste sem \`asfTshCollect\`, ou com \`Flags: 1\`**, devolve o mesmo \`tesSUCCESS\` e não deixa estado: o Hook nunca foi executado.

### Os campos

| Campo | Obrigatório | Significado |
|---|---|---|
| \`StartTime\` | Sim, para criar | Primeira execução, em segundos desde o Ripple Epoch. \`0\` = agora. No máximo 365 dias no futuro |
| \`DelaySeconds\` | Com \`RepeatCount\` | Segundos entre execuções, até 31.536.000 (365 dias) |
| \`RepeatCount\` | Com \`DelaySeconds\` | Execuções depois da primeira, de 1 a 256 |
| \`Flags\` | Para excluir | \`1\` (\`tfCronUnset\`), sem nenhum dos campos acima |

\`DelaySeconds\` e \`RepeatCount\` vão juntos ou não vão. Só com \`StartTime\`, o Hook é executado uma vez. Com os dois, é executado \`1 + RepeatCount\` vezes. Para mais de 257 execuções, envie um \`CronSet\` novo antes que o atual termine: ele o substitui.

Excluir sempre funciona, mesmo quando não há nenhum Cron.

### O tempo em Ripple Epoch

\`StartTime\` conta segundos desde 1 de janeiro de 2000 UTC, não desde 1970 como um timestamp Unix:

\`\`\`javascript
// A hora atual em Ripple Epoch
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// Começar daqui a uma hora
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

### Quanto custa um cron

- **O fee do \`CronSet\`** cobre a transação e as execuções que ela agenda: o fee base × (2 + \`RepeatCount\`). Com um fee base de 10 drops e \`RepeatCount: 2\`, 40 drops, como no resultado acima.
- **A reserva**: o objeto Cron conta em \`OwnerCount\` enquanto existe.
- **Cada execução** é uma collect call cobrada da conta. Se o saldo não a cobre acima da reserva, essa execução do Hook é pulada.

### Os exemplos

O primeiro exemplo ativa o TSH Collect na \`WALLET\` e agenda o seu Hook a cada hora com \`RepeatCount: 24\`: 25 execuções. Ele só executa algo se a \`WALLET\` tiver um Hook instalado como o de cima. O segundo exemplo exclui o cron com \`tfCronUnset\`.

### Erros

| Erro | Causa |
|---|---|
| \`temMALFORMED\` | Falta \`StartTime\` ao criar; só um de \`DelaySeconds\` e \`RepeatCount\`; \`RepeatCount\` 0 ou acima de 256; \`DelaySeconds\` acima de 365 dias; \`tfCronUnset\` com outros campos |
| \`temINVALID_FLAG\` | Uma flag diferente de \`tfCronUnset\` |
| \`tecEXPIRED\` | \`StartTime\` no passado, ou a mais de 365 dias |
| \`tecINSUFFICIENT_RESERVE\` | O saldo não cobre a reserva de mais um objeto |
| \`temDISABLED\` | A amendment Cron não está ativada na rede |`,
        en: `\`CronSet\` makes the network run your account's Hook on a schedule, with no external service sending transactions. This lesson explains how the network does it, what the Hook and the account need, and what each field and each execution costs.

### How a cron runs

\`CronSet\` stores a **Cron** object in your account: when to run, every how many seconds, and how many more times. When that time arrives, the network itself creates a **\`Cron\` pseudo-transaction**. Nobody signs it and it has no fee; its \`Owner\` field is your account. That transaction triggers your account's Hook. Then the Cron object moves to the next time, until no repetitions remain, and it disappears.

An account has one Cron at most. A new \`CronSet\` replaces the current one.

### What the Hook and the account need

Your account doesn't send the \`Cron\` transaction, so your Hook runs as a **weak transactional stakeholder** (weak TSH): it is told about the transaction and cannot reject it. A weak execution is a **collect call**, paid by the Hook's account. It only happens when both sides allow it:

1. **The Hook allows collect calls**: installed with the \`hsfCOLLECT\` flag (\`4\`). With \`hsfOVERRIDE\` (\`1\`), \`Flags: 5\`. Its \`HookOn\` must also include the \`Cron\` transaction type, \`92\`.
2. **The account allows collect calls**: \`AccountSet\` with \`SetFlag: 11\` (\`asfTshCollect\`).

If one of them is missing, \`CronSet\` still returns \`tesSUCCESS\` and the cron still runs out, but the Hook never executes. Nothing reports it: check that both are set.

A Hook that counts its Cron executions, and the fields to install it as in [lesson 9.2](?m=9&l=1):

\`\`\`c
int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    if (otxn_type() != 92)   // 92 = ttCRON: only the Cron transaction counts
        accept(SBUF("cron_counter: not a Cron"), __LINE__);

    // The counter lives in the Hook state, under the key "CRON"
    uint8_t key[32] = { 'C', 'R', 'O', 'N' };
    uint64_t count = 0;
    state(SVAR(count), SBUF(key));
    count++;
    if (state_set(SVAR(count), SBUF(key)) < 0)
        rollback(SBUF("cron_counter: state_set failed"), __LINE__);
    accept(SBUF("cron_counter: counted"), __LINE__);
    return 0;
}
\`\`\`

\`\`\`javascript
Hook: {
  CreateCode: wasmHex,
  // Only Cron (bit 92) triggers it. Bit 22 (SetHook) works the other way round: 0 = not triggered
  HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
  HookNamespace: namespace,
  HookApiVersion: 0,
  Flags: 5, // hsfOVERRIDE (1) + hsfCOLLECT (4)
}
\`\`\`

Result on testnet, with \`StartTime: 0\`, \`DelaySeconds: 10\` and \`RepeatCount: 2\`, reading the Hook state 50 seconds later:

\`\`\`
SetHook      tesSUCCESS   Flags: 5, HookOn with bit 92
AccountSet   tesSUCCESS   SetFlag: 11 (asfTshCollect)
CronSet      tesSUCCESS   Fee: 40 drops
Cron         StartTime: 843801161, DelaySeconds: 10, RepeatCount: 2
50 s later  Hook state CRON = 3
\`\`\`

- **\`RepeatCount: 2\` gave 3 executions**: the first one at \`StartTime\`, then 2 repetitions.
- **\`StartTime: 0\`** became the close time of the previous ledger: "now".
- **The same run without \`asfTshCollect\`, or with \`Flags: 1\`**, returns the same \`tesSUCCESS\` and leaves no state: the Hook never ran.

### The fields

| Field | Required | Meaning |
|---|---|---|
| \`StartTime\` | Yes, to create | First execution, in seconds since the Ripple Epoch. \`0\` = now. At most 365 days ahead |
| \`DelaySeconds\` | With \`RepeatCount\` | Seconds between executions, up to 31,536,000 (365 days) |
| \`RepeatCount\` | With \`DelaySeconds\` | Executions after the first one, from 1 to 256 |
| \`Flags\` | To delete | \`1\` (\`tfCronUnset\`), with none of the fields above |

\`DelaySeconds\` and \`RepeatCount\` go together or not at all. With \`StartTime\` alone, the Hook runs once. With both, it runs \`1 + RepeatCount\` times. For more than 257 executions, send a new \`CronSet\` before the current one ends: it replaces it.

Deleting always succeeds, even when there is no Cron.

### Time in Ripple Epoch

\`StartTime\` counts seconds from 1 January 2000 UTC, not from 1970 like a Unix timestamp:

\`\`\`javascript
// The current time in Ripple Epoch
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// Start in one hour
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

### What a cron costs

- **The \`CronSet\` fee** covers the transaction and the executions it schedules: the base fee × (2 + \`RepeatCount\`). With a base fee of 10 drops and \`RepeatCount: 2\`, 40 drops, as in the result above.
- **The reserve**: the Cron object counts in \`OwnerCount\` while it exists.
- **Each execution** is a collect call, charged to the account. When the balance can't cover it above the reserve, that execution of the Hook is skipped.

### The examples

The first example enables TSH Collect on \`WALLET\` and schedules its Hook every hour with \`RepeatCount: 24\`: 25 executions. It only runs something if \`WALLET\` has a Hook installed as above. The second example deletes the cron with \`tfCronUnset\`.

### Errors

| Error | Cause |
|---|---|
| \`temMALFORMED\` | No \`StartTime\` when creating; only one of \`DelaySeconds\` and \`RepeatCount\`; \`RepeatCount\` 0 or over 256; \`DelaySeconds\` over 365 days; \`tfCronUnset\` with other fields |
| \`temINVALID_FLAG\` | A flag other than \`tfCronUnset\` |
| \`tecEXPIRED\` | \`StartTime\` in the past, or more than 365 days ahead |
| \`tecINSUFFICIENT_RESERVE\` | The balance doesn't cover the reserve for one more object |
| \`temDISABLED\` | The Cron amendment isn't enabled on the network |`,
        jp: `\`CronSet\` を使うと、外部サービスがトランザクションを送らなくても、ネットワークがスケジュールに従ってアカウントの Hook を実行します。このレッスンでは、ネットワークがそれをどう行うか、Hook とアカウントに何が必要か、各フィールドと各実行にどれだけコストがかかるかを説明します。

### cron の実行の仕組み

\`CronSet\` はアカウントに **Cron** オブジェクトを保存します。いつ実行するか、何秒ごとか、あと何回かを記録します。その時刻になると、ネットワーク自身が **\`Cron\` 疑似トランザクション**を作成します。誰も署名せず、手数料もありません。\`Owner\` フィールドがあなたのアカウントです。このトランザクションがアカウントの Hook を起動します。その後 Cron オブジェクトは次の時刻に移り、繰り返しが残っていなければ消えます。

1つのアカウントが持てる Cron は最大1つです。新しい \`CronSet\` は現在のものを置き換えます。

### Hook とアカウントに必要なもの

\`Cron\` トランザクションを送るのはあなたのアカウントではないため、Hook は**弱い transactional stakeholder**（弱い TSH）として実行されます。トランザクションの通知は受けますが、拒否はできません。弱い実行は **collect call** で、Hook のアカウントが支払います。双方が許可している場合にだけ実行されます。

1. **Hook が collect call を許可する**：\`hsfCOLLECT\` フラグ（\`4\`）付きでインストールします。\`hsfOVERRIDE\`（\`1\`）と合わせて \`Flags: 5\` です。\`HookOn\` には \`Cron\` トランザクションタイプ \`92\` も含める必要があります。
2. **アカウントが collect call を許可する**：\`SetFlag: 11\`（\`asfTshCollect\`）の \`AccountSet\` を送ります。

どちらかが欠けていても、\`CronSet\` は \`tesSUCCESS\` を返し、cron も回数を使い切りますが、Hook は一度も実行されません。何も通知されないので、両方が設定されていることを確認します。

Cron による実行を数える Hook と、[レッスン 9.2](?m=9&l=1) と同じ方法でインストールするためのフィールドです。

\`\`\`c
int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    if (otxn_type() != 92)   // 92 = ttCRON：Cron トランザクションだけを数える
        accept(SBUF("cron_counter: not a Cron"), __LINE__);

    // カウンターは Hook の状態のキー "CRON" に保存される
    uint8_t key[32] = { 'C', 'R', 'O', 'N' };
    uint64_t count = 0;
    state(SVAR(count), SBUF(key));
    count++;
    if (state_set(SVAR(count), SBUF(key)) < 0)
        rollback(SBUF("cron_counter: state_set failed"), __LINE__);
    accept(SBUF("cron_counter: counted"), __LINE__);
    return 0;
}
\`\`\`

\`\`\`javascript
Hook: {
  CreateCode: wasmHex,
  // Cron（ビット 92）だけで起動する。ビット 22（SetHook）は逆で、0 = 起動しない
  HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
  HookNamespace: namespace,
  HookApiVersion: 0,
  Flags: 5, // hsfOVERRIDE (1) + hsfCOLLECT (4)
}
\`\`\`

テストネットで \`StartTime: 0\`、\`DelaySeconds: 10\`、\`RepeatCount: 2\` とし、50秒後に Hook の状態を読んだ結果です。

\`\`\`
SetHook      tesSUCCESS   Flags: 5, HookOn with bit 92
AccountSet   tesSUCCESS   SetFlag: 11 (asfTshCollect)
CronSet      tesSUCCESS   Fee: 40 drops
Cron         StartTime: 843801161, DelaySeconds: 10, RepeatCount: 2
50 秒後   Hook の状態 CRON = 3
\`\`\`

- **\`RepeatCount: 2\` で3回実行されました**。\`StartTime\` に1回目、その後2回の繰り返しです。
- **\`StartTime: 0\`** は前の台帳のクローズ時刻、つまり「今」になりました。
- **\`asfTshCollect\` なし、または \`Flags: 1\` で同じテストをすると**、同じ \`tesSUCCESS\` が返りますが、状態は残りません。Hook は一度も実行されていません。

### フィールド

| フィールド | 必須 | 意味 |
|---|---|---|
| \`StartTime\` | 作成時は必須 | 最初の実行。Ripple Epoch からの秒数。\`0\` = 今。最大 365 日先まで |
| \`DelaySeconds\` | \`RepeatCount\` とセット | 実行の間隔（秒）。最大 31,536,000（365 日） |
| \`RepeatCount\` | \`DelaySeconds\` とセット | 1回目の後の実行回数。1〜256 |
| \`Flags\` | 削除時 | \`1\`（\`tfCronUnset\`）。上のフィールドは指定しない |

\`DelaySeconds\` と \`RepeatCount\` は両方指定するか、両方省略します。\`StartTime\` だけなら Hook は1回実行されます。両方指定すると \`1 + RepeatCount\` 回実行されます。257回を超えて実行するには、現在の cron が終わる前に新しい \`CronSet\` を送って置き換えます。

削除は、Cron がなくても常に成功します。

### Ripple Epoch での時刻

\`StartTime\` は Unix タイムスタンプのような 1970 年からではなく、2000年1月1日 UTC からの秒数です。

\`\`\`javascript
// 現在時刻を Ripple Epoch で
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// 1時間後に開始する
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

### cron のコスト

- **\`CronSet\` の手数料**は、トランザクションとそれが予約する実行をまとめて支払います。基本手数料 × (2 + \`RepeatCount\`) です。基本手数料が 10 drops で \`RepeatCount: 2\` なら、上の結果のとおり 40 drops です。
- **リザーブ**：Cron オブジェクトは存在する間 \`OwnerCount\` に数えられます。
- **各実行**は collect call で、アカウントに課金されます。リザーブを超える残高で賄えない場合、その回の Hook の実行はスキップされます。

### 例

最初の例は \`WALLET\` で TSH Collect を有効にし、\`RepeatCount: 24\` で Hook を1時間ごとに予約します。合計25回です。\`WALLET\` に上のようにインストールされた Hook がある場合にだけ、何かが実行されます。2つ目の例は \`tfCronUnset\` で cron を削除します。

### エラー

| エラー | 原因 |
|---|---|
| \`temMALFORMED\` | 作成時に \`StartTime\` がない、\`DelaySeconds\` と \`RepeatCount\` の片方だけ、\`RepeatCount\` が 0 または 256 超、\`DelaySeconds\` が 365 日超、\`tfCronUnset\` と他のフィールドの併用 |
| \`temINVALID_FLAG\` | \`tfCronUnset\` 以外のフラグ |
| \`tecEXPIRED\` | \`StartTime\` が過去、または 365 日より先 |
| \`tecINSUFFICIENT_RESERVE\` | オブジェクトを1つ増やすリザーブを残高で賄えない |
| \`temDISABLED\` | ネットワークで Cron の amendment が有効になっていない |`,
        ko: `\`CronSet\`을 쓰면 외부 서비스가 트랜잭션을 보내지 않아도 네트워크가 일정에 따라 계정의 Hook을 실행합니다. 이 레슨에서는 네트워크가 이를 어떻게 하는지, Hook과 계정에 무엇이 필요한지, 각 필드와 각 실행에 드는 비용을 설명합니다.

### cron이 실행되는 방식

\`CronSet\`은 계정에 **Cron** 객체를 저장합니다. 언제 실행할지, 몇 초마다 실행할지, 앞으로 몇 번 더 실행할지를 기록합니다. 그때가 되면 네트워크가 직접 **\`Cron\` 의사 트랜잭션**을 만듭니다. 아무도 서명하지 않고 수수료도 없으며, \`Owner\` 필드가 내 계정입니다. 이 트랜잭션이 계정의 Hook을 실행합니다. 그다음 Cron 객체는 다음 시각으로 넘어가고, 반복이 남지 않으면 사라집니다.

한 계정은 Cron을 최대 하나만 가집니다. 새 \`CronSet\`은 현재 것을 대체합니다.

### Hook과 계정에 필요한 것

\`Cron\` 트랜잭션을 보내는 것은 내 계정이 아니므로, Hook은 **약한 transactional stakeholder**(약한 TSH)로 실행됩니다. 트랜잭션을 통보받지만 거부할 수는 없습니다. 약한 실행은 **collect call**이며 Hook 계정이 비용을 냅니다. 양쪽이 모두 허용할 때만 실행됩니다.

1. **Hook이 collect call을 허용**: \`hsfCOLLECT\` 플래그(\`4\`)로 설치합니다. \`hsfOVERRIDE\`(\`1\`)와 합쳐 \`Flags: 5\`입니다. \`HookOn\`에도 \`Cron\` 트랜잭션 타입 \`92\`가 포함되어야 합니다.
2. **계정이 collect call을 허용**: \`SetFlag: 11\`(\`asfTshCollect\`)로 \`AccountSet\`을 보냅니다.

둘 중 하나라도 빠지면 \`CronSet\`은 여전히 \`tesSUCCESS\`를 반환하고 cron도 횟수를 소진하지만, Hook은 한 번도 실행되지 않습니다. 아무것도 알려 주지 않으므로 둘 다 설정되어 있는지 확인하세요.

Cron 실행 횟수를 세는 Hook과, [레슨 9.2](?m=9&l=1)와 같은 방법으로 설치하기 위한 필드입니다.

\`\`\`c
int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    if (otxn_type() != 92)   // 92 = ttCRON: Cron 트랜잭션만 셈
        accept(SBUF("cron_counter: not a Cron"), __LINE__);

    // 카운터는 Hook 상태의 "CRON" 키에 저장됨
    uint8_t key[32] = { 'C', 'R', 'O', 'N' };
    uint64_t count = 0;
    state(SVAR(count), SBUF(key));
    count++;
    if (state_set(SVAR(count), SBUF(key)) < 0)
        rollback(SBUF("cron_counter: state_set failed"), __LINE__);
    accept(SBUF("cron_counter: counted"), __LINE__);
    return 0;
}
\`\`\`

\`\`\`javascript
Hook: {
  CreateCode: wasmHex,
  // Cron(비트 92)만 실행시킴. 비트 22(SetHook)는 반대: 0 = 실행 안 함
  HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
  HookNamespace: namespace,
  HookApiVersion: 0,
  Flags: 5, // hsfOVERRIDE (1) + hsfCOLLECT (4)
}
\`\`\`

테스트넷에서 \`StartTime: 0\`, \`DelaySeconds: 10\`, \`RepeatCount: 2\`로 설정하고 50초 뒤 Hook 상태를 읽은 결과입니다.

\`\`\`
SetHook      tesSUCCESS   Flags: 5, HookOn with bit 92
AccountSet   tesSUCCESS   SetFlag: 11 (asfTshCollect)
CronSet      tesSUCCESS   Fee: 40 drops
Cron         StartTime: 843801161, DelaySeconds: 10, RepeatCount: 2
50초 뒤    Hook 상태 CRON = 3
\`\`\`

- **\`RepeatCount: 2\`로 3번 실행되었습니다**: \`StartTime\`에 첫 번째, 이후 2번 반복입니다.
- **\`StartTime: 0\`**은 이전 원장의 마감 시각, 즉 "지금"이 되었습니다.
- **\`asfTshCollect\` 없이, 또는 \`Flags: 1\`로 같은 테스트를 하면** 같은 \`tesSUCCESS\`가 반환되지만 상태가 남지 않습니다. Hook이 한 번도 실행되지 않은 것입니다.

### 필드

| 필드 | 필수 | 의미 |
|---|---|---|
| \`StartTime\` | 생성 시 필수 | 첫 실행 시각, Ripple Epoch 기준 초. \`0\` = 지금. 최대 365일 뒤까지 |
| \`DelaySeconds\` | \`RepeatCount\`와 함께 | 실행 간격(초), 최대 31,536,000(365일) |
| \`RepeatCount\` | \`DelaySeconds\`와 함께 | 첫 실행 이후의 실행 횟수, 1~256 |
| \`Flags\` | 삭제 시 | \`1\`(\`tfCronUnset\`), 위 필드는 넣지 않음 |

\`DelaySeconds\`와 \`RepeatCount\`는 둘 다 넣거나 둘 다 뺍니다. \`StartTime\`만 있으면 Hook은 한 번 실행됩니다. 둘 다 있으면 \`1 + RepeatCount\`번 실행됩니다. 257번이 넘게 실행하려면 현재 cron이 끝나기 전에 새 \`CronSet\`을 보내 대체합니다.

삭제는 Cron이 없어도 항상 성공합니다.

### Ripple Epoch 시간

\`StartTime\`은 Unix 타임스탬프처럼 1970년이 아니라 2000년 1월 1일 UTC부터 센 초입니다.

\`\`\`javascript
// 현재 시각을 Ripple Epoch로
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// 한 시간 뒤에 시작
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

### cron의 비용

- **\`CronSet\` 수수료**는 트랜잭션과 그것이 예약하는 실행을 함께 냅니다. 기본 수수료 × (2 + \`RepeatCount\`)입니다. 기본 수수료가 10 drops이고 \`RepeatCount: 2\`이면 위 결과처럼 40 drops입니다.
- **Reserve**: Cron 객체는 존재하는 동안 \`OwnerCount\`에 포함됩니다.
- **각 실행**은 collect call로 계정에 청구됩니다. reserve를 넘는 잔액으로 충당할 수 없으면 그 회차의 Hook 실행은 건너뜁니다.

### 예제

첫 번째 예제는 \`WALLET\`에서 TSH Collect를 켜고 \`RepeatCount: 24\`로 Hook을 매시간 예약합니다. 모두 25번입니다. \`WALLET\`에 위와 같이 설치된 Hook이 있을 때만 무언가가 실행됩니다. 두 번째 예제는 \`tfCronUnset\`으로 cron을 삭제합니다.

### 오류

| 오류 | 원인 |
|---|---|
| \`temMALFORMED\` | 생성 시 \`StartTime\` 없음, \`DelaySeconds\`와 \`RepeatCount\` 중 하나만 있음, \`RepeatCount\`가 0 또는 256 초과, \`DelaySeconds\`가 365일 초과, \`tfCronUnset\`과 다른 필드를 함께 사용 |
| \`temINVALID_FLAG\` | \`tfCronUnset\`이 아닌 플래그 |
| \`tecEXPIRED\` | \`StartTime\`이 과거이거나 365일보다 뒤 |
| \`tecINSUFFICIENT_RESERVE\` | 객체 하나를 더 두기 위한 reserve를 잔액이 충당하지 못함 |
| \`temDISABLED\` | 네트워크에서 Cron amendment가 활성화되지 않음 |`,
        zh: `\`CronSet\` 让网络按计划运行你账户上的 Hook，不需要外部服务发送交易。本课说明网络如何做到这一点、Hook 和账户需要什么，以及每个字段和每次执行的成本。

### cron 如何运行

\`CronSet\` 在你的账户中存储一个 **Cron** 对象：何时运行、每隔多少秒、还要运行多少次。时间一到，网络自己会创建一笔 **\`Cron\` 伪交易**。没有人签名，也没有手续费；它的 \`Owner\` 字段就是你的账户。这笔交易触发你账户上的 Hook。之后 Cron 对象移到下一个时间点，直到没有剩余的重复次数，然后消失。

一个账户最多有一个 Cron。新的 \`CronSet\` 会替换当前的那个。

### Hook 和账户需要什么

\`Cron\` 交易不是由你的账户发送的，所以你的 Hook 以**弱交易利益相关方**（弱 TSH）的身份运行：它会得知这笔交易，但不能拒绝它。弱执行是一次 **collect call**，由 Hook 所在的账户付费。只有双方都允许时才会发生：

1. **Hook 允许 collect call**：安装时带上 \`hsfCOLLECT\` 标志（\`4\`）。加上 \`hsfOVERRIDE\`（\`1\`），即 \`Flags: 5\`。它的 \`HookOn\` 还必须包含 \`Cron\` 交易类型 \`92\`。
2. **账户允许 collect call**：发送 \`SetFlag: 11\`（\`asfTshCollect\`）的 \`AccountSet\`。

缺少其中任何一个，\`CronSet\` 仍然返回 \`tesSUCCESS\`，cron 也仍会用完次数，但 Hook 一次都不会执行。没有任何提示：请确认两者都已设置。

一个统计 Cron 执行次数的 Hook，以及按[第 9.2 课](?m=9&l=1)的方法安装它所用的字段：

\`\`\`c
int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    if (otxn_type() != 92)   // 92 = ttCRON：只统计 Cron 交易
        accept(SBUF("cron_counter: not a Cron"), __LINE__);

    // 计数器保存在 Hook 状态中，键为 "CRON"
    uint8_t key[32] = { 'C', 'R', 'O', 'N' };
    uint64_t count = 0;
    state(SVAR(count), SBUF(key));
    count++;
    if (state_set(SVAR(count), SBUF(key)) < 0)
        rollback(SBUF("cron_counter: state_set failed"), __LINE__);
    accept(SBUF("cron_counter: counted"), __LINE__);
    return 0;
}
\`\`\`

\`\`\`javascript
Hook: {
  CreateCode: wasmHex,
  // 只有 Cron（第 92 位）会触发它。第 22 位（SetHook）正好相反：0 = 不触发
  HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
  HookNamespace: namespace,
  HookApiVersion: 0,
  Flags: 5, // hsfOVERRIDE (1) + hsfCOLLECT (4)
}
\`\`\`

在测试网上使用 \`StartTime: 0\`、\`DelaySeconds: 10\` 和 \`RepeatCount: 2\`，50 秒后读取 Hook 状态的结果：

\`\`\`
SetHook      tesSUCCESS   Flags: 5, HookOn with bit 92
AccountSet   tesSUCCESS   SetFlag: 11 (asfTshCollect)
CronSet      tesSUCCESS   Fee: 40 drops
Cron         StartTime: 843801161, DelaySeconds: 10, RepeatCount: 2
50 秒后    Hook 状态 CRON = 3
\`\`\`

- **\`RepeatCount: 2\` 产生了 3 次执行**：第一次在 \`StartTime\`，然后重复 2 次。
- **\`StartTime: 0\`** 变成了上一个账本的关闭时间，即“现在”。
- **不设置 \`asfTshCollect\`，或使用 \`Flags: 1\` 做同样的测试**，会返回同样的 \`tesSUCCESS\`，但不会留下任何状态：Hook 从未执行。

### 字段

| 字段 | 是否必需 | 含义 |
|---|---|---|
| \`StartTime\` | 创建时必需 | 第一次执行，以 Ripple Epoch 起的秒数表示。\`0\` = 现在。最多 365 天之后 |
| \`DelaySeconds\` | 与 \`RepeatCount\` 一起 | 两次执行之间的秒数，最多 31,536,000（365 天） |
| \`RepeatCount\` | 与 \`DelaySeconds\` 一起 | 第一次之后的执行次数，1 到 256 |
| \`Flags\` | 删除时 | \`1\`（\`tfCronUnset\`），不带上面任何字段 |

\`DelaySeconds\` 和 \`RepeatCount\` 要么同时出现，要么都不出现。只有 \`StartTime\` 时，Hook 运行一次。两者都有时，运行 \`1 + RepeatCount\` 次。如需超过 257 次执行，在当前 cron 结束前发送新的 \`CronSet\` 替换它。

删除总是成功，即使没有 Cron。

### Ripple Epoch 时间

\`StartTime\` 从 2000 年 1 月 1 日 UTC 开始计秒，而不是像 Unix 时间戳那样从 1970 年开始：

\`\`\`javascript
// 以 Ripple Epoch 表示的当前时间
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// 一小时后开始
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

### cron 的成本

- **\`CronSet\` 的手续费**同时支付这笔交易和它安排的执行：基础手续费 × (2 + \`RepeatCount\`)。基础手续费为 10 drops、\`RepeatCount: 2\` 时为 40 drops，与上面的结果一致。
- **储备金**：Cron 对象存在期间计入 \`OwnerCount\`。
- **每次执行**都是一次 collect call，向账户收费。如果余额在储备金之上不足以支付，这一次的 Hook 执行会被跳过。

### 示例

第一个示例在 \`WALLET\` 上启用 TSH Collect，并用 \`RepeatCount: 24\` 安排它的 Hook 每小时运行一次：共 25 次。只有当 \`WALLET\` 装有像上面那样安装的 Hook 时，才会真正执行内容。第二个示例用 \`tfCronUnset\` 删除 cron。

### 错误

| 错误 | 原因 |
|---|---|
| \`temMALFORMED\` | 创建时缺少 \`StartTime\`；只有 \`DelaySeconds\` 和 \`RepeatCount\` 中的一个；\`RepeatCount\` 为 0 或超过 256；\`DelaySeconds\` 超过 365 天；\`tfCronUnset\` 与其他字段同时使用 |
| \`temINVALID_FLAG\` | 使用了 \`tfCronUnset\` 以外的标志 |
| \`tecEXPIRED\` | \`StartTime\` 在过去，或超过 365 天之后 |
| \`tecINSUFFICIENT_RESERVE\` | 余额不足以支付多一个对象的储备金 |
| \`temDISABLED\` | 网络上未启用 Cron amendment |`,
      },
      codeBlocks: [
        {
          title: {
            es: "Activar TSH Collect y programar un CronSet",
            pt: "Ativar TSH Collect e programar um CronSet",
            en: "Enable TSH Collect and schedule a CronSet",
            jp: "TSH Collectを有効化してCronSetをスケジュールする",
            zh: "启用 TSH Collect 并设置 CronSet",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function setupCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  console.log("Cuenta:", wallet.address);

  // === PASO 1: Activar TSH Collect en la cuenta ===
  // Necesario para que la red pueda ejecutar el Hook automáticamente
  console.log("=== Paso 1: Activar TSH Collect (asfTshCollect) ===");

  const accountSet = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    SetFlag: 11, // asfTshCollect
  };

  const prepAccountSet = await client.autofill(accountSet);
  const signedAccountSet = wallet.sign(prepAccountSet);
  const resultAccountSet = await client.submitAndWait(signedAccountSet.tx_blob);

  console.log("AccountSet resultado:", resultAccountSet.result.meta.TransactionResult);

  if (resultAccountSet.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error activando TSH Collect.");
    await client.disconnect();
    return;
  }

  // === PASO 2: Crear el CronSet ===
  // El Hook debe estar instalado con hsfCOLLECT antes de este paso
  console.log("=== Paso 2: Crear CronSet ===");

  const cronSet = {
    TransactionType: "CronSet",
    Account: wallet.address,
    StartTime: 0,       // 0 = comenzar desde el próximo ledger válido
    DelaySeconds: 3600, // Ejecutar cada 1 hora (3600 segundos)
    RepeatCount: 24,    // 24 ejecuciones más después de la primera: 25 en total
  };

  const prepCron = await client.autofill(cronSet);
  const signedCron = wallet.sign(prepCron);
  const resultCron = await client.submitAndWait(signedCron.tx_blob);

  const txResult = resultCron.result.meta.TransactionResult;
  console.log("CronSet resultado:", txResult);
  console.log("Hash:", signedCron.hash);

  if (txResult === "tesSUCCESS") {
    console.log("¡CronSet creado correctamente!");
    console.log("El Hook se ejecutará ahora y después cada hora: 25 ejecuciones.");
    console.log("Asegúrate de que el Hook está instalado con el flag hsfCOLLECT.");
  }

  await client.disconnect();
}

setupCron();`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function setupCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  console.log("Conta:", wallet.address);
  // === PASSO 1: Ativar TSH Collect na conta ===
  // Necessário para que a rede possa executar o Hook automaticamente
  console.log("=== Passo 1: Ativar TSH Collect (asfTshCollect) ===");
  const accountSet = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    SetFlag: 11, // asfTshCollect
  };
  const prepAccountSet = await client.autofill(accountSet);
  const signedAccountSet = wallet.sign(prepAccountSet);
  const resultAccountSet = await client.submitAndWait(signedAccountSet.tx_blob);
  console.log("AccountSet resultado:", resultAccountSet.result.meta.TransactionResult);
  if (resultAccountSet.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Erro ativando TSH Collect.");
    await client.disconnect();
    return;
  }
  // === PASSO 2: Criar ou CronSet ===
  // O Hook deve estar instalado com hsfCOLLECT antes deste passo
  console.log("=== Passo 2: Criar CronSet ===");

  const cronSet = {
    TransactionType: "CronSet",
    Account: wallet.address,
    StartTime: 0,       // 0 = começar a partir do próximo ledger válido
    DelaySeconds: 3600, // Executar a cada 1 hora (3600 segundos)
    RepeatCount: 24,    // 24 execuções a mais depois da primeira: 25 no total
  };
  const prepCron = await client.autofill(cronSet);
  const signedCron = wallet.sign(prepCron);
  const resultCron = await client.submitAndWait(signedCron.tx_blob);
  const txResult = resultCron.result.meta.TransactionResult;
  console.log("CronSet resultado:", txResult);
  console.log("Hash:", signedCron.hash);
  if (txResult === "tesSUCCESS") {
    console.log("CronSet criado corretamente!");
    console.log("O Hook será executado agora e depois a cada hora: 25 execuções.");
    console.log("Certifique-se de que o Hook está instalado com a flag hsfCOLLECT.");
  }
  await client.disconnect();
}
setupCron();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function setupCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  console.log("Account:", wallet.address);

  // === STEP 1: Enable TSH Collect on the account ===
  // Required so the network can execute the Hook automatically
  console.log("=== Step 1: Enable TSH Collect (asfTshCollect) ===");

  const accountSet = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    SetFlag: 11, // asfTshCollect
  };

  const prepAccountSet = await client.autofill(accountSet);
  const signedAccountSet = wallet.sign(prepAccountSet);
  const resultAccountSet = await client.submitAndWait(signedAccountSet.tx_blob);

  console.log("AccountSet result:", resultAccountSet.result.meta.TransactionResult);

  if (resultAccountSet.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error enabling TSH Collect.");
    await client.disconnect();
    return;
  }

  // === STEP 2: Create the CronSet ===
  // The Hook must be installed with hsfCOLLECT before this step
  console.log("=== Step 2: Create CronSet ===");

  const cronSet = {
    TransactionType: "CronSet",
    Account: wallet.address,
    StartTime: 0,       // 0 = start from the next valid ledger
    DelaySeconds: 3600, // Execute every 1 hour (3600 seconds)
    RepeatCount: 24,    // 24 more runs after the first: 25 executions
  };

  const prepCron = await client.autofill(cronSet);
  const signedCron = wallet.sign(prepCron);
  const resultCron = await client.submitAndWait(signedCron.tx_blob);

  const txResult = resultCron.result.meta.TransactionResult;
  console.log("CronSet result:", txResult);
  console.log("Hash:", signedCron.hash);

  if (txResult === "tesSUCCESS") {
    console.log("CronSet created successfully!");
    console.log("The Hook will run now and then every hour: 25 executions.");
    console.log("Make sure the Hook is installed with the hsfCOLLECT flag.");
  }

  await client.disconnect();
}

setupCron();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function setupCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  console.log("アカウント:", wallet.address);

  // === ステップ1: アカウントでTSH Collectを有効化 ===
  // ネットワークがHookを自動的に実行できるようにするために必要
  console.log("=== ステップ1: TSH Collectを有効化（asfTshCollect）===");

  const accountSet = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    SetFlag: 11, // asfTshCollect
  };

  const prepAccountSet = await client.autofill(accountSet);
  const signedAccountSet = wallet.sign(prepAccountSet);
  const resultAccountSet = await client.submitAndWait(signedAccountSet.tx_blob);

  console.log("AccountSet結果:", resultAccountSet.result.meta.TransactionResult);

  if (resultAccountSet.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("TSH Collectの有効化エラー。");
    await client.disconnect();
    return;
  }

  // === ステップ2: CronSetを作成 ===
  // このステップの前にhsfCOLLECTフラグ付きでHookをインストールしておく必要があります
  console.log("=== ステップ2: CronSetを作成 ===");

  const cronSet = {
    TransactionType: "CronSet",
    Account: wallet.address,
    StartTime: 0,       // 0 = 次の有効なレジャーから開始
    DelaySeconds: 3600, // 1時間ごとに実行（3600秒）
    RepeatCount: 24,    // 最初の実行の後にさらに24回：合計25回
  };

  const prepCron = await client.autofill(cronSet);
  const signedCron = wallet.sign(prepCron);
  const resultCron = await client.submitAndWait(signedCron.tx_blob);

  const txResult = resultCron.result.meta.TransactionResult;
  console.log("CronSet結果:", txResult);
  console.log("Hash:", signedCron.hash);

  if (txResult === "tesSUCCESS") {
    console.log("CronSetが正常に作成されました！");
    console.log("Hook は今すぐ実行され、その後1時間ごとに実行されます（合計25回）。");
    console.log("HookがhsfCOLLECTフラグ付きでインストールされていることを確認してください。");
  }

  await client.disconnect();
}

setupCron();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function setupCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  console.log("账户:", wallet.address);

  // === 第 1 步：在账户上启用 TSH Collect ===
  // 这样网络才能自动执行 Hook
  console.log("=== 第 1 步：启用 TSH Collect（asfTshCollect） ===");

  const accountSet = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    SetFlag: 11, // asfTshCollect
  };

  const prepAccountSet = await client.autofill(accountSet);
  const signedAccountSet = wallet.sign(prepAccountSet);
  const resultAccountSet = await client.submitAndWait(signedAccountSet.tx_blob);

  console.log("AccountSet 结果:", resultAccountSet.result.meta.TransactionResult);

  if (resultAccountSet.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("启用 TSH Collect 时出错。");
    await client.disconnect();
    return;
  }

  // === 第 2 步：创建 CronSet ===
  // 在此之前，Hook 必须已用 hsfCOLLECT 安装好
  console.log("=== 第 2 步：创建 CronSet ===");

  const cronSet = {
    TransactionType: "CronSet",
    Account: wallet.address,
    StartTime: 0,       // 0 = 从下一个有效账本开始
    DelaySeconds: 3600, // 每 1 小时执行一次
    RepeatCount: 24,    // 第一次之后再执行 24 次：共 25 次
  };

  const prepCron = await client.autofill(cronSet);
  const signedCron = wallet.sign(prepCron);
  const resultCron = await client.submitAndWait(signedCron.tx_blob);

  const txResult = resultCron.result.meta.TransactionResult;
  console.log("CronSet 结果:", txResult);
  console.log("Hash:", signedCron.hash);

  if (txResult === "tesSUCCESS") {
    console.log("CronSet 创建成功！");
    console.log("Hook 将立即执行，之后每小时执行一次：共 25 次。");
    console.log("请确认 Hook 已使用 hsfCOLLECT 标志安装。");
  }

  await client.disconnect();
}

setupCron();`,
          },
        },
        {
          title: {
            es: "Eliminar un CronSet activo",
            pt: "Eliminar um CronSet ativo",
            en: "Delete an active CronSet",
            jp: "アクティブなCronSetを削除する",
            zh: "删除一个活动中的 CronSet",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function deleteCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  console.log("=== Eliminar CronSet activo ===");
  console.log("Cuenta:", wallet.address);

  // Para eliminar un cron: omitir todos los campos de programación
  // y añadir Flags: 1 (tfCronUnset)
  const cronDelete = {
    TransactionType: "CronSet",
    Account: wallet.address,
    Flags: 1, // tfCronUnset — elimina el cron activo
  };

  const prepared = await client.autofill(cronDelete);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("CronSet eliminado. El Hook ya no se ejecutará automáticamente.");
  } else {
    console.log("El CronSet no se aplicó.");
  }

  await client.disconnect();
}

deleteCron();`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function deleteCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  console.log("=== Eliminar CronSet ativo ===");
  console.log("Conta:", wallet.address);
  // Para eliminar um cron: omitir todos os campos de programação
  // e adicionar Flags: 1 (tfCronUnset)
  const cronDelete = {
    TransactionType: "CronSet",
    Account: wallet.address,
    Flags: 1, // tfCronUnset — remova o cron ativo
  };
  const prepared = await client.autofill(cronDelete);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  const txResult = result.result.meta.TransactionResult;
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);
  if (txResult === "tesSUCCESS") {
    console.log("CronSet eliminado. O Hook não será mais executado automaticamente.");
  } else {
    console.log("O CronSet não foi aplicado.");
  }
  await client.disconnect();
}
deleteCron();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function deleteCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  console.log("=== Delete active CronSet ===");
  console.log("Account:", wallet.address);

  // To delete a cron: omit all scheduling fields
  // and add Flags: 1 (tfCronUnset)
  const cronDelete = {
    TransactionType: "CronSet",
    Account: wallet.address,
    Flags: 1, // tfCronUnset — deletes the active cron
  };

  const prepared = await client.autofill(cronDelete);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Result:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("CronSet deleted. The Hook will no longer run automatically.");
  } else {
    console.log("The CronSet was not applied.");
  }

  await client.disconnect();
}

deleteCron();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function deleteCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  console.log("=== アクティブなCronSetの削除 ===");
  console.log("アカウント:", wallet.address);

  // cronを削除：すべてのスケジューリングフィールドを省略
  // Flags: 1（tfCronUnset）を追加
  const cronDelete = {
    TransactionType: "CronSet",
    Account: wallet.address,
    Flags: 1, // tfCronUnset — アクティブなcronを削除
  };

  const prepared = await client.autofill(cronDelete);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("結果:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("CronSetが削除されました。Hookは自動的に実行されなくなります。");
  } else {
    console.log("CronSet は適用されませんでした。");
  }

  await client.disconnect();
}

deleteCron();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function deleteCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  console.log("=== 删除活动中的 CronSet ===");
  console.log("账户:", wallet.address);

  // 删除 cron：省略所有调度字段
  // 并添加 Flags: 1（tfCronUnset）
  const cronDelete = {
    TransactionType: "CronSet",
    Account: wallet.address,
    Flags: 1, // tfCronUnset — 删除当前活动 cron
  };

  const prepared = await client.autofill(cronDelete);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("结果:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("CronSet 已删除。该 Hook 将不再自动执行。");
  } else {
    console.log("CronSet 未被应用。");
  }

  await client.disconnect();
}

deleteCron();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es CronSet?", pt: `O que é o CronSet?`, en: "What is CronSet?", jp: `CronSet とは？`, zh: "什么是 CronSet？" },
          content: {
            es: `La red ejecuta tu Hook según un calendario

• CronSet guarda un objeto Cron en tu cuenta
• En cada momento, la red crea una
  pseudotransacción Cron que activa el Hook
• StartTime: primera ejecución (0 = ahora)
• DelaySeconds + RepeatCount: las repeticiones
• Ejecuciones = 1 + RepeatCount (máx. 256)`,
            pt: `A rede executa o seu Hook segundo um calendário

• CronSet guarda um objeto Cron na sua conta
• Em cada momento, a rede cria uma
  pseudotransação Cron que aciona o Hook
• StartTime: primeira execução (0 = agora)
• DelaySeconds + RepeatCount: as repetições
• Execuções = 1 + RepeatCount (máx. 256)`,
            en: `The network runs your Hook on a schedule

• CronSet stores a Cron object in your account
• At each time, the network creates a Cron
  pseudo-transaction that triggers the Hook
• StartTime: first run (0 = now)
• DelaySeconds + RepeatCount: the repetitions
• Executions = 1 + RepeatCount (max 256)`,
            jp: `ネットワークがスケジュールどおりに Hook を実行

• CronSet はアカウントに Cron オブジェクトを保存
• その時刻ごとに、ネットワークが Cron
  疑似トランザクションを作り Hook を起動
• StartTime：最初の実行（0 = 今）
• DelaySeconds + RepeatCount：繰り返し
• 実行回数 = 1 + RepeatCount（最大 256）`,
            zh: `网络按计划运行你的 Hook

• CronSet 在账户中存储一个 Cron 对象
• 每到时间，网络创建一笔 Cron
  伪交易来触发 Hook
• StartTime：第一次运行（0 = 现在）
• DelaySeconds + RepeatCount：重复
• 执行次数 = 1 + RepeatCount（最多 256）`,
          },
          visual: "⏱️",
        },
        {
          title: { es: `Configurar um cron`, pt: `Configurar um cron`, en: `Setting up a cron`, jp: `cron の設定`, zh: `设置 cron` },
          content: {
            es: `1. Hook con Flags: 5 (hsfOVERRIDE + hsfCOLLECT)
   y HookOn que incluya Cron (tipo 92)
2. AccountSet SetFlag: 11 (asfTshCollect)
3. CronSet con StartTime
   (+ DelaySeconds y RepeatCount)

Sin 1 o 2 → tesSUCCESS, el Hook nunca se ejecuta
Borrar: CronSet con Flags: 1 (tfCronUnset)
Fee: base × (2 + RepeatCount)`,
            pt: `1. Hook com Flags: 5 (hsfOVERRIDE + hsfCOLLECT)
   e HookOn incluindo Cron (tipo 92)
2. AccountSet SetFlag: 11 (asfTshCollect)
3. CronSet com StartTime
   (+ DelaySeconds e RepeatCount)

Sem 1 ou 2 → tesSUCCESS, o Hook nunca é executado
Excluir: CronSet com Flags: 1 (tfCronUnset)
Fee: base × (2 + RepeatCount)`,
            en: `1. Hook with Flags: 5 (hsfOVERRIDE + hsfCOLLECT)
   and HookOn including Cron (type 92)
2. AccountSet SetFlag: 11 (asfTshCollect)
3. CronSet with StartTime
   (+ DelaySeconds and RepeatCount)

Missing 1 or 2 → tesSUCCESS, Hook never runs
Delete: CronSet with Flags: 1 (tfCronUnset)
Fee: base × (2 + RepeatCount)`,
            jp: `1. Flags: 5（hsfOVERRIDE + hsfCOLLECT）で、
   HookOn に Cron（タイプ 92）を含む Hook
2. AccountSet SetFlag: 11（asfTshCollect）
3. StartTime を指定した CronSet
   （+ DelaySeconds と RepeatCount）

1 か 2 が欠けると → tesSUCCESS でも Hook は実行されない
削除：Flags: 1（tfCronUnset）の CronSet
手数料：基本 × (2 + RepeatCount)`,
            zh: `1. Flags: 5（hsfOVERRIDE + hsfCOLLECT）
   且 HookOn 包含 Cron（类型 92）的 Hook
2. AccountSet SetFlag: 11（asfTshCollect）
3. 带 StartTime 的 CronSet
   （+ DelaySeconds 和 RepeatCount）

缺少 1 或 2 → tesSUCCESS，但 Hook 从不运行
删除：Flags: 1（tfCronUnset）的 CronSet
手续费：基础 × (2 + RepeatCount)`,
          },
          visual: "🔧",
        },
        {
          title: { es: "Invoke vs CronSet", pt: "Invoke vs CronSet", en: "Invoke vs CronSet", jp: "Invoke vs CronSet", zh: "Invoke vs CronSet" },
          content: {
            es: "Invoke periódico:\n• Trigger externo (script, servidor)\n• Flexible, cualquier intervalo\n• Depende de un servicio activo\n\nCronSet:\n• Completamente on-chain\n• Sin infraestructura extra\n• Máx 256 repeticiones por tx\n• Límite: DelaySeconds ≤ 365 días\n\nCronSet = autonomía total del Hook",
            pt: "Invoke periódico:\n• Trigger externo (script, servidor)\n• Flexível, qualquer intervalo\n• Depende de um serviço ativo\n\nCronSet:\n• Completamente on-chain\n• Sem infraestrutura extra\n• Máx 256 repetições por tx\n• Limite: DelaySeconds ≤ 365 dias\n\nCronSet = autonomia total do Hook",
            en: "Periodic Invoke:\n• External trigger (script, server)\n• Flexible, any interval\n• Depends on an active service\n\nCronSet:\n• Fully on-chain\n• No extra infrastructure\n• Max 256 repetitions per tx\n• Limit: DelaySeconds ≤ 365 days\n\nCronSet = full Hook autonomy",
            jp: "定期的なInvoke：\n• 外部トリガー（スクリプト、サーバー）\n• 柔軟、任意の間隔\n• アクティブなサービスに依存\n\nCronSet：\n• 完全にオンチェーン\n• 追加インフラ不要\n• 1txあたり最大256回の繰り返し\n• 制限：DelaySeconds ≤ 365日\n\nCronSet = Hookの完全な自律性",
            zh: "周期性 Invoke：\n• 依赖外部触发器（脚本、服务器）\n• 更灵活，间隔可任意\n• 需要持续运行的服务\n\nCronSet：\n• 完全链上\n• 不需要额外基础设施\n• 每笔交易最多 256 次重复\n• 限制：DelaySeconds ≤ 365 天\n\nCronSet = Hook 的完全自主调度",
          },
          visual: "⚖️",
        },
      ],
    },
    {
      id: "m10l9",
      title: priceOracleLessonTitle,
      theory: priceOracleTheory,
      codeBlocks: [
        {
          title: priceOracleCodeTitles.set,
          language: "javascript",
          code: priceOracleSetCode,
        },
        {
          title: priceOracleCodeTitles.query,
          language: "javascript",
          code: priceOracleQueryCode,
        },
        {
          title: priceOracleCodeTitles.delete,
          language: "javascript",
          code: priceOracleDeleteCode,
        },
      ],
      slides: priceOracleSlides,
    },
    {
      id: "m10l10",
      title: iouRewardLessonTitle,
      theory: iouRewardClaimTheory,
      codeBlocks: [
        {
          title: iouRewardCodeTitles.trustline,
          language: "javascript",
          code: iouRewardTrustlineCode,
        },
        {
          title: iouRewardCodeTitles.claim,
          language: "javascript",
          code: iouRewardClaimCode,
        },
        {
          title: iouRewardCodeTitles.inspect,
          language: "javascript",
          code: iouRewardInspectCode,
        },
      ],
      slides: iouRewardSlides,
    },
  ],
};



const arabicModuleTranslations = {
  title: "معاملات أخرى متاحة",
  lessons: {
    m10l1: {
      title: "Escrows: مدفوعات مشروطة",
      theory: "Escrow هو دفع يتم حجزه على السجل إلى أن يتحقق شرط محدد. تستخدم EscrowCreate لإنشاء الحجز، وEscrowFinish لتحرير الأموال، وEscrowCancel لإلغائه عند السماح بذلك.\n\nFinishAfter يمنع الإنهاء قبل وقت معين، وCancelAfter يسمح بالإلغاء بعد وقت معين. ويمكن أيضا ربط Escrow بشرط تشفيري بحيث لا يتم تحرير القيمة إلا عند تقديم fulfillment صحيح.\n\nهذا مفيد للمدفوعات المؤجلة، الاتفاقيات ذات المهلة، أو أي تدفق يحتاج إلى ضمان أن القيمة موجودة قبل تسليمها.",
      codeTitles: ["إنشاء Escrow بقفل زمني (FinishAfter = دقيقتان)", "إنهاء Escrow بعد فترة القفل"],
      slides: [
        ["ما هو Escrow؟", "دفع محجوز على السجل\n\n• المرسل يودع القيمة\n• المستلم لا يستلمها فوراً\n• EscrowFinish يحررها عند تحقق الشرط\n• EscrowCancel يلغيها إذا وصلنا إلى وقت الإلغاء"],
        ["دورة حياة Escrow", "1. EscrowCreate يحجز القيمة\n2. ينتظر الوقت أو الشرط\n3. EscrowFinish يرسل القيمة إلى Destination\n4. أو EscrowCancel يعيدها إلى المرسل\n\nكل خطوة موثقة كمعاملة على السجل"],
        ["الشروط التشفيرية", "يمكن إضافة Condition وFulfillment\n\n• Condition يصف الشرط المطلوب\n• Fulfillment يثبت أن الشرط تحقق\n• الشبكة تتحقق من الإثبات قبل تحرير الأموال\n\nهذا يسمح بتدفقات أكثر أمانا من مجرد مؤقت زمني"],
      ],
    },
    m10l2: {
      title: "Checks: مدفوعات مؤجلة",
      theory: "Check هو تفويض دفع يمكن للمستلم صرفه لاحقا. المرسل يحدد الحد الأقصى في SendMax، لكن الأموال لا تنتقل عند إنشاء Check.\n\nيستخدم المستلم CheckCash عندما يريد تحصيله، ويمكن إلغاء Check إذا انتهت صلاحيته أو لم يعد مطلوبا.\n\nالفرق المهم عن Payment هو أن المستلم يتحكم في لحظة التحصيل، وهذا مناسب للفواتير أو المدفوعات التي تحتاج موافقة لاحقة.",
      codeTitles: ["إنشاء Check", "صرف Check مستلم"],
      slides: [
        ["ما هو Check؟", "Check هو وعد قابل للصرف لاحقا\n\n• لا ينقل الأموال فورا\n• المستلم يقرر متى يصرفه\n• SendMax يحدد الحد الأعلى\n• يمكن أن يكون له Expiration"],
        ["دورة حياة Check", "1. CheckCreate ينشئ كائنا على السجل\n2. المستلم يجد CheckID\n3. CheckCash يحاول التحصيل\n4. CheckCancel يلغي الكائن عند الحاجة"],
        ["Check vs Payment vs Escrow", "Payment: تحويل فوري\nCheck: المستلم يصرف لاحقا\nEscrow: القيمة محجوزة حتى شرط\n\nاختر Check عندما تريد تفويضا مرنا بدلا من تسليم فوري"],
      ],
    },
    m10l3: {
      title: "Tickets: تسلسلات خارج الترتيب",
      theory: `**Ticket** هو آلية تسمح بإرسال معاملات **خارج الترتيب التسلسلي** العادي. عادة، يجب أن تستخدم كل معاملة على Xahau رقم \`Sequence\` التالي للحساب. تزيل Tickets هذا القيد عن طريق حجز أرقام تسلسل مسبقا.

### ما هو Ticket؟

كل حساب على Xahau لديه رقم \`Sequence\` يزداد مع كل معاملة. هذا يعني أن المعاملات يجب أن تُعالج بترتيب صارم. تحل Tickets هذه المشكلة:

- يقوم Ticket **بحجز** رقم تسلسل للاستخدام لاحقا
- المعاملة التي تستخدم Ticket تحدد \`TicketSequence\` بدلا من \`Sequence\`
- يمكن استخدام Tickets **بأي ترتيب**، بغض النظر عن وقت إنشائها

### فيم تُستخدم Tickets؟

- **معاملات متوازية**: تجهيز وتوقيع عدة معاملات دون الاعتماد على الترتيب
- **معاملات موقعة مسبقا**: توقيع معاملات مسبقا وإرسالها عند الحاجة
- **التوقيع المتعدد**: يمكن لموقّعين مختلفين تجهيز معاملات مستقلة دون حجب Sequence
- **حالات الطوارئ**: تجهيز معاملات احتياطية جاهزة دون استهلاك التسلسل العادي

### TicketCreate: حجز Tickets

معاملة \`TicketCreate\` تحجز رقم تسلسل واحدا أو أكثر:

| الحقل | الوصف |
|---|---|
| \`TransactionType\` | \`"TicketCreate"\` |
| \`Account\` | الحساب الذي يحجز التذاكر |
| \`TicketCount\` | عدد التذاكر المراد إنشاؤها (1-250) |

### تكلفة الحجز

كل Ticket يتم إنشاؤه يستهلك **احتياطي مالك** من الحساب، تماما مثل TrustLine أو عرض على DEX. هذا يعني أنه لكل Ticket نشط تحتاج إلى XAH إضافي مقفل في حسابك. يُحذف Ticket (ويُطلق الاحتياطي) عند استخدامه أو إلغائه.

### الحدود

- **الحد الأقصى لكل معاملة**: يمكنك إنشاء ما يصل إلى **250 Ticket** في معاملة \`TicketCreate\` واحدة
- **الحد الأقصى لكل حساب**: يمكن لحساب أن يمتلك ما يصل إلى **250 Ticket** نشط في نفس الوقت
- Tickets **لا تنتهي صلاحيتها** — تبقى في السجل حتى تُستخدم أو تُلغى

### استخدام Ticket في معاملة

لاستخدام Ticket، أضف هذه الحقول في معاملتك:
- \`Sequence: 0\` — يشير إلى أن التسلسل العادي غير مستخدم
- \`TicketSequence: N\` — رقم Ticket المراد استهلاكه

يُدمَّر Ticket تلقائيا عند استخدامه، مما يُطلق الاحتياطي.

### إلغاء Tickets غير المستخدمة

إذا لم تعد بحاجة إلى Ticket، يمكنك إلغاءه لتحرير الاحتياطي. لا توجد معاملة محددة لإلغاء Tickets. بدلا من ذلك، يمكنك استخدام معاملة \`AccountSet\` فارغة (بدون تغييرات) تستهلك Ticket.`,
      codeTitles: ["إنشاء Tickets واستخدامها لربط عدة مدفوعات"],
      slides: [
        ["ما هو Ticket؟", "Ticket هو رقم تسلسل بديل\n\n• ينشأ بواسطة TicketCreate\n• يستخدم في TicketSequence\n• يسمح بالمعاملات المتوازية\n• يقلل الاعتماد على Sequence واحد"],
        ["حالات الاستخدام", "مناسب لـ:\n\n• إرسال عدة معاملات في نفس الوقت\n• تطبيقات backend عالية النشاط\n• تجنب انتظار معاملة سابقة\n• إعداد معاملات مسبقا"],
        ["Tickets vs Sequence العادي", "Sequence العادي يجب أن يتقدم بالترتيب\n\nTicket يسمح بمعاملة محددة أن تستخدم رقما محفوظا مسبقا\n\nهذا يمنح مرونة أكبر، لكنه يحتاج تتبعا جيدا للأرقام المستخدمة"],
      ],
    },
    m10l4: {
      title: "ClaimReward: المطالبة بمكافآت الشبكة",
      theory: "ClaimReward تطالب بالمكافآت المتاحة للحساب على شبكة Xahau. في الاستخدام الأساسي، لا تحتاج إلى وجهة أو مبلغ: الحساب يطلب من الشبكة تسوية المكافأة المتاحة له.\n\nتوجد صيغة أخرى مخصصة مع IOURewardClaim في الدرس الأخير من هذا المودول، حيث يتم تمرير Issuer وClaimCurrency لبرنامج مكافآت مبني بواسطة Hook.",
      codeTitles: ["المطالبة بمكافآت الشبكة"],
      slides: [
        ["ClaimReward", "معاملة للمطالبة بالمكافآت\n\n• الحساب يوقع الطلب\n• الشبكة تحسب المتاح\n• النتيجة تظهر في metadata\n• لا تحدد Amount يدويا"],
        ["كيف تطالب؟", "1. جهز Wallet\n2. أنشئ ClaimReward\n3. استخدم autofill\n4. وقع وأرسل submitAndWait\n\nبعدها افحص نتيجة المعاملة والرصيد"],
      ],
    },
    m10l5: {
      title: "Invoke: تفعيل Hooks عند الطلب",
      theory: "Invoke يرسل إشارة إلى حساب يحتوي على Hook حتى ينفذ منطقه بدون الحاجة إلى Payment عادي. يمكن تمرير Blob اختياري كبيانات إدخال.\n\nاستخدمه عندما تريد تشغيل Hook إداريا، اختبار مسار معين، أو تنفيذ منطق on-chain بناء على طلب مباشر من حساب آخر.",
      codeTitles: ["استدعاء Hook على حساب آخر"],
      slides: [
        ["Invoke", "معاملة لتشغيل Hook مباشرة\n\n• Destination هو حساب الـ Hook\n• Blob يحمل بيانات اختيارية\n• لا يلزم تحويل قيمة\n• النتيجة تعتمد على منطق Hook"],
        ["استخدامات Invoke", "• Hook يصدر Invoke لتفعيل Hook آخر\n• Trigger يدوي: تفعيل منطق Hook\n  عند الحاجة إليه\n• تمرير بيانات إلى Hook عبر Memos\n  أو HookParameters في Invoke\n\nللجدولة الأصلية استخدم CronSet.\nيبقى Invoke مفيدا للحالات المخصصة\nأو لتفعيل Hooks حسابات أخرى"],
      ],
    },
    m10l6: {
      title: "SetRemarks: بيانات وصفية على كائنات السجل",
      theory: "SetRemarks تضيف أو تحدث أو تحذف Remarks مرتبطة بحساب أو كائن Ledger معين. RemarkName هو المفتاح، وRemarkValue هي القيمة.\n\nإذا أرسلت RemarkName بدون RemarkValue فذلك يعني حذف ذلك الـ Remark. ويمكن استخدام ObjectID عندما تريد التعليق على كائن محدد بدلا من AccountRoot.",
      codeTitles: ["إضافة وتحديث Remarks على الحساب (AccountRoot)", "حذف Remark (بدون RemarkValue)"],
      slides: [
        ["SetRemarks", "طريقة لإضافة بيانات وصفية خفيفة\n\n• مفاتيح وقيم\n• مرتبطة بالحساب أو ObjectID\n• قابلة للتحديث\n• تحذف بحذف RemarkValue"],
        ["إنشاء وتعديل وحذف", "إنشاء: RemarkName + RemarkValue\nتعديل: نفس RemarkName بقيمة جديدة\nحذف: RemarkName فقط\n\nهذا يجعلها مناسبة للوسوم أو المراجع الخارجية"],
        ["ObjectID: أي كائن نعلّق عليه؟", "بدون ObjectID يتم استخدام AccountRoot\n\nمع ObjectID يمكن استهداف كائن Ledger محدد مثل Check أو Escrow أو غيره\n\nاختر الهدف حسب البيانات التي تريد توثيقها"],
      ],
    },
    m10l7: {
      title: "Remit: معاملة متعددة الوظائف",
      theory: "Remit تجمع عدة أفعال في معاملة واحدة. يمكنها إرسال قيمة، التعامل مع URITokens، ودفع احتياطيات معينة نيابة عن المستلم حسب الإعداد.\n\nالفكرة هي تقليل عدد المعاملات المطلوبة لتدفقات مركبة، خصوصا عند إنشاء أصول أو تسليم قيمة ومعلومة في خطوة واحدة.",
      codeTitles: ["Remit: دفع + إنشاء URIToken في معاملة واحدة"],
      slides: [
        ["Remit - معاملة متعددة الوظائف", "Remit ليست Payment عادية فقط\n\n• يمكن أن ترسل قيمة\n• يمكن أن تنشئ أو تنقل URIToken\n• مناسبة لتدفقات مركبة\n• تقلل عدد الخطوات على السجل"],
        ["Remit يدفع الاحتياطيات", "في بعض السيناريوهات يمكن للمرسل تحمل احتياطي كائنات معينة\n\nهذا يجعل تجربة المستلم أسهل، خصوصا عندما لا تريد إجباره على تجهيز احتياطي قبل الاستلام"],
      ],
    },
    m10l8: {
      title: "CronSet: تنفيذ تلقائي للـ Hooks",
      theory: "CronSet يحدد جدولة on-chain لتشغيل Hook بشكل دوري. لكي يعمل، يحتاج الحساب إلى Hook مثبت مع hsfCOLLECT وأن يكون TSH Collect مفعلا.\n\nStartTime يحدد البداية، DelaySeconds يحدد الفاصل، وRepeatCount يحدد عدد مرات التكرار. ويمكن حذف الجدولة باستخدام tfCronUnset.",
      codeTitles: ["تفعيل TSH Collect وجدولة CronSet", "حذف CronSet نشط"],
      slides: [
        ["ما هو CronSet؟", `تشغّل الشبكة الـ Hook وفق جدول زمني

• يخزّن CronSet كائن Cron في حسابك
• في كل موعد، تنشئ الشبكة معاملة Cron
  زائفة تُطلق الـ Hook
• StartTime: أول تنفيذ (0 = الآن)
• DelaySeconds + RepeatCount: التكرارات
• عدد مرات التنفيذ = 1 + RepeatCount (حتى 256)`],
        [`إعداد cron`, `1. Hook مع Flags: 5 (hsfOVERRIDE + hsfCOLLECT)
   وHookOn يتضمن Cron (النوع 92)
2. AccountSet مع SetFlag: 11 (asfTshCollect)
3. CronSet مع StartTime
   (+ DelaySeconds وRepeatCount)

غياب 1 أو 2 ← tesSUCCESS لكن الـ Hook لا يعمل أبدًا
الحذف: CronSet مع Flags: 1 (tfCronUnset)
الرسوم: الأساسية × (2 + RepeatCount)`],
        ["Invoke vs CronSet", "Invoke يحتاج محفزا خارجيا\n\nCronSet يعمل بالكامل on-chain\n\nInvoke أكثر مرونة للفواصل الحرة، بينما CronSet يمنح استقلالية كاملة حتى عدد تكرارات محدود"],
      ],
    },
    m10l9: {
      title: "Price Oracle: تغذيات أسعار على السجل",
      theory: "Price Oracle يسمح لحساب موثوق بنشر أسعار على السجل باستخدام OracleSet. كل مستند OracleDocumentID يحتوي PriceDataSeries، حيث يصف BaseAsset وQuoteAsset الزوج، وAssetPrice مع Scale يعطيان السعر.\n\nOracleDelete يحذف مستند السعر عندما لا يعود ضروريا. وللقراءة، يمكن استخدام get_aggregate_price لتجميع أسعار من عدة Oracles بدلا من الاعتماد على مصدر واحد.\n\nهذا مفيد للتطبيقات التي تحتاج سعرا قابلا للتحقق داخل Xahau، مثل الضمانات، التسويات، أو Hooks التي تعتمد على سعر أصل.",
      codeTitles: ["إنشاء أو تحديث تغذية سعر Oracle", "قراءة أسعار مجمعة من عدة Oracles", "حذف تغذية سعر Oracle"],
      slides: [
        ["Price Oracle", "كائنات Oracle تنشر أسعارا على السجل\n\n• الحساب الناشر يوقع OracleSet\n• OracleDocumentID يميز المستند\n• PriceDataSeries يحمل أزواج الأسعار\n• Scale يحدد عدد المنازل العشرية"],
        ["OracleSet vs OracleDelete", "OracleSet ينشئ أو يحدث السعر\n\nOracleDelete يحذف المستند\n\nاستخدم تحديثات منتظمة عندما تتغير الأسعار، واحذف المستندات القديمة لتقليل الحالة غير الضرورية"],
        ["قراءة الأسعار", "get_aggregate_price يجمع عدة مصادر\n\n• يقلل الاعتماد على Oracle واحد\n• يعيد بيانات مجمعة\n• مناسب للـ Hooks والتطبيقات التي تحتاج سعرا موثوقا"],
      ],
    },
    m10l10: {
      title: "IOURewardClaim: مكافآت مخصصة لتوكنات",
      theory: "IOURewardClaim يستخدم معاملة ClaimReward لكن يضيف Issuer وClaimCurrency للمطالبة بمكافأة توكن مخصص. في مثال Learning Xahau، التوكن RWD موجود مسبقا، والبرنامج نفسه موجود على حساب يحتوي Hook.\n\nIssuer في ClaimReward هو حساب برنامج المكافآت الذي يحتوي الـ Hook: rQDaZ361xnkezCjgUxKsuLjLckqu4kw6nm. أما ClaimCurrency.issuer فهو issuer توكن RWD: rHjU4oLTNBmsUV4CtifNhHVGWJTJfGC9vf.\n\nقبل المطالبة، يجب أن يمتلك المستخدم Trustline نحو RWD. بعد المطالبة، يمكن فحص account_lines للتأكد من الرصيد.",
      codeTitles: ["إنشاء Trustline المطلوبة لمكافآت IOU", "المطالبة بمكافأة IOU عبر ClaimReward + ClaimCurrency", "فحص Trustline الخاصة بالمستخدم"],
      slides: [
        ["IOURewardClaim", "مطالبة بمكافآت توكن مخصص\n\n• تستخدم ClaimReward\n• Issuer يشير إلى حساب برنامج المكافآت\n• ClaimCurrency يحدد التوكن\n• يحتاج المستخدم Trustline قبل الاستلام"],
        ["أين تعيش العدادات؟", "برنامج المكافآت عادة يكون Hook\n\nالـ Hook يقرر من يستحق المكافأة وكم يستحق\n\nالمطالبة لا تنشئ التوكن من الصفر؛ بل تستدعي منطق برنامج موجود"],
        ["الإعداد المطلوب", "لهذا التمرين:\n\n• Hook reward programme: rQDaZ361xnkezCjgUxKsuLjLckqu4kw6nm\n• RWD issuer: rHjU4oLTNBmsUV4CtifNhHVGWJTJfGC9vf\n• المستخدم يحتاج Trustline نحو RWD\n• بعدها يرسل ClaimReward"],
      ],
    },
  },
};

function applyArabicTranslations(data) {
  data.title.ar = arabicModuleTranslations.title;

  for (const lesson of data.lessons) {
    const translation = arabicModuleTranslations.lessons[lesson.id];
    if (!translation) continue;

    lesson.title.ar = translation.title;
    lesson.theory.ar = translation.theory;

    lesson.codeBlocks?.forEach((block, index) => {
      block.title.ar = translation.codeTitles[index] ?? block.title.en ?? block.title.es;
      if (typeof block.code === "string") {
        block.code = { en: block.code };
      }
    });

    lesson.slides?.forEach((slide, index) => {
      const slideTranslation = translation.slides[index];
      if (!slideTranslation) return;
      slide.title.ar = slideTranslation[0];
      slide.content.ar = slideTranslation[1];
    });
  }
}

applyArabicTranslations(moduleData);

const frenchModuleTranslations = {
  title: "Autres transactions disponibles",
  lessons: {
    m10l1: { title: "Escrows : paiements conditionnels", theory: "Un Escrow verrouille des fonds sur le ledger jusqu'à ce qu'une condition soit remplie. FinishAfter impose un temps minimum avant libération, CancelAfter permet l'annulation après une date, et les crypto-conditions ajoutent une preuve cryptographique.", codeTitles: ["Créer un escrow avec verrou temporel (FinishAfter = 2 minutes)", "Terminer un escrow après la période de verrouillage"], slides: [["Qu'est-ce qu'un Escrow ?", "Paiement bloqué jusqu'à une condition\n\n• Valeur réservée\n• Destination définie\n• Libération avec EscrowFinish\n• Annulation possible selon les champs"], ["Cycle de vie Escrow", "EscrowCreate → attente → EscrowFinish ou EscrowCancel\n\nChaque étape est une transaction validée."], ["Crypto-conditions", "Condition décrit l'exigence\nFulfillment prouve qu'elle est satisfaite\n\nLe ledger vérifie avant de libérer les fonds."]] },
    m10l2: { title: "Checks : paiements différés", theory: "Un Check est une autorisation de paiement que le destinataire peut encaisser plus tard. Le créateur fixe SendMax, le destinataire utilise CheckCash, et le Check peut être annulé si nécessaire.", codeTitles: ["Créer un check", "Encaisser un check reçu"], slides: [["Qu'est-ce qu'un Check ?", "Promesse de paiement encaissable plus tard\n\nLe destinataire contrôle le moment de l'encaissement."], ["Cycle de vie Check", "1. CheckCreate → L'émetteur crée le chèque\n     ↓ (le destinataire décide quand)\n2. CheckCash → Le destinataire encaisse le chèque\n     ou\n2. CheckCancel → L'une ou l'autre partie l'annule\n\n• Amount = montant exact à encaisser\n• DeliverMin = montant minimum acceptable\n• Les chèques expirés peuvent être annulés"], ["Check vs Payment vs Escrow", "Payment → Transfert immédiat\n\nEscrow → Fonds bloqués avec conditions\n• Temps, crypto-condition ou les deux\n• Fonds réellement bloqués\n\nCheck → Promesse de paiement différé\n• Le destinataire décide quand encaisser\n• Fonds NON bloqués (peuvent être dépensés)\n• Plus flexible, moins de garanties"]] },
    m10l3: { title: "Tickets : séquences hors ordre", theory: "Les Tickets permettent de préparer des transactions qui n'utilisent pas la Sequence normale suivante. Une transaction peut utiliser TicketSequence avec Sequence: 0 pour être soumise indépendamment de l'ordre principal.", codeTitles: ["Créer des Tickets et les utiliser pour enchaîner plusieurs paiements"], slides: [["Qu'est-ce qu'un Ticket ?", "Réserve des numéros de séquence à l'avance\n\n• Permet des transactions hors ordre\n• Sequence: 0 + TicketSequence: N\n• Détruit lors de son utilisation\n• Maximum 250 par compte\n\nChaque Ticket consomme une réserve de propriétaire"], ["Cas d'usage", "Transactions parallèles, backends actifs, réduction des blocages dus à une Sequence en attente."], ["Tickets vs Sequence normale", "La Sequence normale avance dans l'ordre\nTicketSequence permet une transaction préparée hors ordre."]] },
    m10l4: { title: "ClaimReward : réclamer les récompenses réseau", theory: "ClaimReward demande au réseau de régler les récompenses disponibles pour un compte. Dans sa forme simple, il n'est pas nécessaire de préciser de montant.", codeTitles: ["Réclamer les récompenses réseau"], slides: [["ClaimReward", "Récompenses natives de Xahau\n\n• Accumulées selon ton solde de XAH\n• Aucun staking ni nœud requis\n• ClaimReward pour les récupérer\n• Ajoutées directement à ton solde\n\nÀ réclamer périodiquement (quotidien/hebdomadaire)"], ["Comment réclamer", "1ère fois → Active ton compte pour les récompenses\nEnsuite → Réclame le montant accumulé\n\nChamps :\n• Account : ton compte\n• Issuer : compte genesis du réseau\n• Flags : 0 (réclamer) / 1 (désactiver)\n\nFee standard, compatible avec les Hooks"]] },
    m10l5: { title: "Invoke : activer des Hooks à la demande", theory: "Invoke déclenche un Hook sur un compte de destination sans envoyer un paiement classique. Un Blob optionnel peut transporter des données pour le Hook.", codeTitles: ["Invoquer un Hook sur un autre compte"], slides: [["Invoke", "Activer un Hook directement\n\n• Ne transfère pas de fonds\n• C'est simplement un déclencheur pour le Hook\n• Sans Destination → tes propres Hooks\n• Avec Destination → Hooks d'un autre compte\n\nLe Hook doit avoir Invoke activé dans HookOn"], ["Usages de Invoke", "• Un Hook émet un Invoke pour activer\n  un autre Hook\n• Déclencheur manuel : activer la logique\n  d'un Hook quand tu en as besoin\n• Passer des données au Hook via Memos\n  ou HookParameters dans l'Invoke\n\nPour une planification native, utilise CronSet.\nInvoke reste utile pour des cas personnalisés\nou pour activer les Hooks d'autres comptes"]] },
    m10l6: { title: "SetRemarks : métadonnées sur objets de ledger", theory: "SetRemarks ajoute, modifie ou supprime des remarques associées à un compte ou à un objet de ledger. Omettre RemarkValue supprime la remarque.", codeTitles: ["Ajouter et mettre à jour des Remarks sur le compte (AccountRoot)", "Supprimer une Remark (omettre RemarkValue)"], slides: [["SetRemarks", "Métadonnées clé-valeur sur les objets du ledger\n\n• Attache des Remarks à : AccountRoot, Offer,\n  Escrow, Check, URIToken, TrustLine...\n• RemarkName + RemarkValue (en hex)\n• Seul le propriétaire/émetteur peut modifier\n• Maximum 32 Remarks par objet\n\nCe n'est pas un message : c'est une métadonnée de l'objet"], ["Créer, modifier et supprimer", "Créer / mettre à jour :\n  → RemarkName + RemarkValue\n\nSupprimer :\n  → RemarkName seul, sans RemarkValue\n\nImmuable (tfImmutable = Flags: 1) :\n  → Ne peut plus jamais être modifié ni supprimé\n\nFee supplémentaire : 1 drop par octet de nom + valeur"], ["ObjectID : quel objet annoter ?", "Chaque objet du ledger a un ID unique :\n\n• AccountRoot → account_data.index\n• Escrow, Check, Offer → LedgerIndex\n  des AffectedNodes lors de la création de l'objet\n\nSetRemarks a besoin de cet ID pour savoir\nà quel objet attacher la métadonnée"]] },
    m10l7: { title: "Remit : transaction multifonction", theory: "Remit combine plusieurs actions, par exemple un paiement et des opérations liées aux URITokens. Elle réduit le nombre de transactions nécessaires dans des flux composés.", codeTitles: ["Remit : paiement + mint URIToken dans une seule transaction"], slides: [["Remit - transaction multifonction", "Une seule transaction pour tout faire :\n\n• Activer de nouveaux comptes\n• Envoyer jusqu'à 32 paiements (XAH + IOUs)\n• Transférer jusqu'à 32 URITokens\n• Créer (mint) un URIToken à la destination\n\nTout est atomique : tout se produit ensemble, ou rien ne se produit"], ["Remit paie les réserves", "Certains flux permettent au remettant de couvrir des réserves nécessaires au destinataire."]] },
    m10l8: { title: "CronSet : exécution automatique de Hooks", theory: "CronSet planifie l'exécution périodique d'un Hook on-chain. Il nécessite un Hook compatible hsfCOLLECT et TSH Collect activé.", codeTitles: ["Activer TSH Collect et planifier un CronSet", "Supprimer un CronSet actif"], slides: [["Qu'est-ce que CronSet ?", `Le réseau exécute ton Hook selon un calendrier

• CronSet enregistre un objet Cron dans ton compte
• À chaque échéance, le réseau crée une
  pseudo-transaction Cron qui déclenche le Hook
• StartTime : première exécution (0 = maintenant)
• DelaySeconds + RepeatCount : les répétitions
• Exécutions = 1 + RepeatCount (max 256)`], [`Configurer un cron`, `1. Hook avec Flags: 5 (hsfOVERRIDE + hsfCOLLECT)
   et un HookOn incluant Cron (type 92)
2. AccountSet SetFlag: 11 (asfTshCollect)
3. CronSet avec StartTime
   (+ DelaySeconds et RepeatCount)

Sans 1 ou 2 → tesSUCCESS, le Hook ne s'exécute jamais
Supprimer : CronSet avec Flags: 1 (tfCronUnset)
Frais : base × (2 + RepeatCount)`], ["Invoke vs CronSet", "Invoke dépend d'un déclencheur externe\nCronSet fonctionne on-chain avec un nombre de répétitions défini."]] },
    m10l9: { title: "Price Oracle : flux de prix on-chain", theory: "Price Oracle publie des prix sur le ledger avec OracleSet. Chaque OracleDocumentID contient une série de prix. OracleDelete supprime un document, et get_aggregate_price permet de lire un prix agrégé depuis plusieurs Oracles.", codeTitles: ["Créer ou mettre à jour un flux de prix Oracle", "Consulter des prix agrégés depuis plusieurs Oracles", "Supprimer un flux de prix Oracle"], slides: [["Price Oracle", "Flux de prix on-chain\n\n• Détenu par un seul compte\n• Identifié par OracleDocumentID\n• Stocke 1 à 10 paires de prix\n• Provider et AssetClass sont des chaînes hex\n• Utilisé par les apps, les Hooks et la logique DeFi"], ["OracleSet vs OracleDelete", "OracleSet\n• Crée ou met à jour l'objet Oracle\n• Publie PriceDataSeries\n• Les mises à jour doivent utiliser un LastUpdateTime plus récent\n\nOracleDelete\n• Supprime l'objet Oracle\n• Seul le propriétaire peut le supprimer\n• Libère la réserve de propriétaire"], ["Lire les prix", "get_aggregate_price agrège plusieurs sources pour éviter de dépendre d'un seul Oracle."]] },
    m10l10: { title: "IOURewardClaim : récompenses personnalisées de tokens", theory: "IOURewardClaim utilise ClaimReward avec Issuer et ClaimCurrency pour réclamer une récompense d'un token personnalisé. Dans l'exemple Learning Xahau, le token RWD existe déjà. Issuer pointe vers le compte Hook du programme de récompenses rQDaZ361xnkezCjgUxKsuLjLckqu4kw6nm, et ClaimCurrency.issuer pointe vers l'issuer RWD rHjU4oLTNBmsUV4CtifNhHVGWJTJfGC9vf. Le détenteur doit avoir une TrustLine vers RWD avant de réclamer.", codeTitles: ["Créer la TrustLine requise pour les récompenses IOU", "Réclamer une récompense IOU avec ClaimReward + ClaimCurrency", "Inspecter la TrustLine IOU du détenteur"], slides: [["IOURewardClaim", "Pas un TransactionType séparé\n\n• Utilise ClaimReward\n• Ajoute ClaimCurrency\n• Issuer pointe vers le compte du Hook de récompenses\n• ClaimCurrency.issuer pointe vers l'émetteur de l'IOU\n\nRécompenses de token personnalisées avec suivi natif"], ["Où vivent les compteurs", "Récompenses XAH :\n• Compteurs sur AccountRoot\n• Versées par le Hook de récompenses genesis\n\nRécompenses IOU :\n• Compteurs sur la trustline RippleState\n• Versées par le Hook de l'émetteur\n• Suit le solde dans le temps par détenteur"], ["Configuration requise", "Hook reward programme : rQDaZ361xnkezCjgUxKsuLjLckqu4kw6nm\nRWD issuer : rHjU4oLTNBmsUV4CtifNhHVGWJTJfGC9vf\nTrustLine RWD obligatoire."]] },
  },
};

function applyFrenchTranslations(module) {
  module.title.fr = frenchModuleTranslations.title;
  for (const lesson of module.lessons) {
    const translation = frenchModuleTranslations.lessons[lesson.id];
    if (!translation) continue;
    lesson.title.fr = translation.title;
    lesson.theory.fr = translation.theory;
    lesson.codeBlocks?.forEach((block, index) => {
      block.title.fr = translation.codeTitles[index];
      if (typeof block.code === "string") block.code = { en: block.code };
    });
    lesson.slides?.forEach((slide, index) => {
      const slideTranslation = translation.slides[index];
      if (!slideTranslation) return;
      slide.title.fr = slideTranslation[0];
      slide.content.fr = slideTranslation[1];
    });
  }
}

applyFrenchTranslations(moduleData);

const expandedM10Theory = {
  m10l1: {
    fr: `Un **Escrow** est un paiement conditionnel qui verrouille des fonds jusqu'à ce que des conditions précises soient remplies. C'est comparable à une enveloppe scellée contenant de l'argent, ou à un coffre qui ne s'ouvre que dans certaines circonstances.

### Cas d'usage

- **Paiements programmés** : libérer des fonds à une date future précise
- **Atomic swaps** : échanger entre parties qui ne se font pas confiance
- **Libération conditionnelle** : libérer seulement avec une preuve cryptographique
- **Vesting** : distribuer progressivement des tokens dans le temps

### EscrowCreate

\`EscrowCreate\` verrouille un montant avec des conditions. \`Amount\` indique ce qui est bloqué, \`Destination\` indique le destinataire, \`FinishAfter\` indique la date minimale de libération, \`CancelAfter\` la date à partir de laquelle on peut annuler, et \`Condition\` ajoute une crypto-condition optionnelle.

Règles importantes : il faut au moins \`FinishAfter\` ou \`Condition\`; si \`CancelAfter\` existe, il doit être après \`FinishAfter\`; les temps utilisent le Ripple Epoch, en secondes depuis le 01/01/2000 UTC.

### EscrowFinish et EscrowCancel

\`EscrowFinish\` libère les fonds vers le destinataire. Tout compte peut l'exécuter, mais seulement après \`FinishAfter\` et, s'il existe une \`Condition\`, avec le bon \`Fulfillment\`. \`Owner\` et \`OfferSequence\` identifient l'escrow.

\`EscrowCancel\` renvoie les fonds au créateur après \`CancelAfter\`. Toute personne peut envoyer l'annulation, mais les fonds retournent toujours au compte créateur.

### Crypto-conditions

Xahau supporte les crypto-conditions Interledger, notamment PREIMAGE-SHA-256. Le créateur génère une \`Condition\` et conserve le \`Fulfillment\`. Pour terminer l'escrow, il faut prouver que l'on connaît la preimage correspondant au hash.

### Exécuter les exemples

Le premier exemple crée l'escrow depuis \`WALLET\` et affiche son \`Sequence\`. Une fois les deux minutes de \`FinishAfter\` écoulées, exécute le second exemple avec ce \`Sequence\` en premier argument. Avant, le script affiche le nombre de secondes restantes.`,
    ar: `**Escrow** هو دفع مشروط يقفل الأموال إلى أن تتحقق شروط محددة. يمكن تخيله كظرف مختوم أو خزنة لا تفتح إلا في ظروف معينة.

### حالات الاستخدام

- **مدفوعات مجدولة**: تحرير الأموال في تاريخ مستقبلي
- **Atomic swaps**: تبادل مشروط بين أطراف لا تثق ببعضها
- **تحرير مشروط**: الدفع لا يخرج إلا عند تقديم دليل تشفيري
- **Vesting**: توزيع تدريجي للتوكنات عبر الزمن

### EscrowCreate

معاملة \`EscrowCreate\` تقفل مبلغا بشروط. \`Amount\` هو المبلغ، و\`Destination\` هو المستلم، و\`FinishAfter\` هو أقل وقت مسموح للإكمال، و\`CancelAfter\` هو الوقت الذي يسمح بعده بالإلغاء، و\`Condition\` تضيف شرطا تشفيريا اختياريا.

القواعد المهمة: يجب تحديد \`FinishAfter\` أو \`Condition\` على الأقل؛ إذا استخدمت \`CancelAfter\` فيجب أن يكون بعد \`FinishAfter\`; والأوقات تستخدم Ripple Epoch، أي الثواني منذ 01/01/2000 UTC.

### EscrowFinish و EscrowCancel

\`EscrowFinish\` يحرر الأموال إلى المستلم. يمكن لأي حساب تنفيذه، لكن فقط بعد \`FinishAfter\` ومع \`Fulfillment\` صحيح إذا كان هناك \`Condition\`. الحقول \`Owner\` و\`OfferSequence\` تحدد أي Escrow يتم إنهاؤه.

\`EscrowCancel\` يعيد الأموال إلى المنشئ بعد \`CancelAfter\`. يمكن لأي حساب إرسال الإلغاء، لكن الأموال ترجع دائما إلى الحساب الذي أنشأ Escrow.

### الشروط التشفيرية

يدعم Xahau شروط Interledger، خصوصا PREIMAGE-SHA-256. ينشئ المنشئ \`Condition\` ويحفظ \`Fulfillment\`. ولإنهاء Escrow يجب إثبات معرفة السر الذي يطابق ذلك الشرط.

### تشغيل الأمثلة

ينشئ المثال الأول الـ escrow من \`WALLET\` ويطبع الـ \`Sequence\` الخاص به. بعد مرور الدقيقتين الخاصتين بـ \`FinishAfter\`، شغّل المثال الثاني مع ذلك الـ \`Sequence\` كأول وسيط. قبل ذلك، يطبع السكربت عدد الثواني المتبقية.`,
  },
  m10l4: {
    fr: `Xahau possède un **système natif de récompenses** qui distribue du XAH aux comptes qui participent activement au réseau. La transaction \`ClaimReward\` sert à réclamer les récompenses accumulées.

Contrairement aux blockchains Proof of Stake, il n'est pas nécessaire de staker, déléguer ou exécuter un validateur. Les récompenses s'accumulent selon le solde XAH et le temps écoulé. Pour les recevoir, le compte envoie périodiquement \`ClaimReward\`; le montant est alors ajoute au solde.

### Champs

\`TransactionType\` vaut \`"ClaimReward"\`, \`Account\` est le compte qui réclame, \`Issuer\` est l'adresse de l'issuer des récompenses du réseau, et \`Flags: 1\` permet d'arrêter la participation.

### Activation, réclamation et désactivation

Le premier \`ClaimReward\` active le compte dans le système. Les suivants réclament ce qui s'est accumulé depuis la dernière réclamation. On peut réclamer régulièrement, par exemple chaque jour ou semaine. Pour se désactiver, envoyer \`ClaimReward\` avec \`Flags: 1\`.

### Considérations

Les récompenses dépendent du solde, du temps et du réseau. Les frais sont standards. Les comptes avec Hooks restent compatibles. L'adresse \`Issuer\` n'est pas universelle : elle dépend du réseau testnet ou mainnet.

### ClaimReward sur le testnet

Sur le testnet, le compte genèse n'a pas de Hook de récompenses installé : l'exemple renvoie donc \`tecNO_TARGET\`. La transaction est valide, mais il n'y a rien à réclamer. Sur le mainnet, le compte genèse porte les Hooks qui calculent les récompenses, et la même transaction les réclame.`,
    ar: `لدى Xahau **نظام مكافآت أصلي** يوزع XAH على الحسابات النشطة في الشبكة. تستخدم معاملة \`ClaimReward\` للمطالبة بالمكافآت المتراكمة.

على عكس شبكات Proof of Stake، لا تحتاج إلى staking أو delegation أو تشغيل validator. تتراكم المكافآت حسب رصيد XAH والوقت. لاستلامها يرسل الحساب \`ClaimReward\` دوريا، فتضاف المكافأة إلى الرصيد.

### الحقول

\`TransactionType\` يكون \`"ClaimReward"\`، و\`Account\` هو الحساب المطالب، و\`Issuer\` هو عنوان مصدر مكافآت الشبكة، و\`Flags: 1\` يستخدم لإيقاف المشاركة.

### التفعيل والمطالبة والإيقاف

أول \`ClaimReward\` يفعّل الحساب في النظام. المرات التالية تطالب بما تراكم منذ آخر مطالبة. يمكن المطالبة يوميا أو أسبوعيا. وللإيقاف، أرسل \`ClaimReward\` مع \`Flags: 1\`.

### اعتبارات

المكافآت تعتمد على الرصيد والوقت والشبكة. الرسوم عادية. الحسابات التي لديها Hooks متوافقة. عنوان \`Issuer\` يختلف بين testnet وmainnet.

### ClaimReward على testnet

على testnet لا يحمل حساب التكوين (genesis) Hook المكافآت، لذلك يعيد المثال \`tecNO_TARGET\`: المعاملة صالحة، لكن لا توجد مكافآت للمطالبة بها. على mainnet يحمل حساب التكوين الـ Hooks التي تحسب المكافآت، والمعاملة نفسها تطالب بها.`,
  },
  m10l5: {
    fr: `\`Invoke\` est une transaction propre à Xahau qui permet **d'activer volontairement un Hook** sans envoyer de paiement ni autre effet économique. C'est le mécanisme de déclenchement direct d'un Hook.

Les Hooks s'exécutent normalement de façon réactive quand une transaction traverse le compte. Mais il existe des cas où l'on veut déclencher la logique sans transfert : maintenance, recalcul, synchronisation, test ou activation d'un autre Hook.

### Champs

\`TransactionType\` vaut \`"Invoke"\`; \`Account\` est l'émetteur; \`Destination\` est optionnel. Sans \`Destination\`, les Hooks du compte émetteur s'activent. Avec \`Destination\`, les Hooks du compte destination sont appelÃ©s.

### Passer des données

On peut ajouter des données dans \`Memos\` ou \`HookParameters\` afin que le Hook sache quelle action effectuer. Un Hook peut aussi émettre un \`Invoke\` vers un autre compte.

### Considérations

\`Invoke\` ne transfère pas de fonds. Le Hook doit écouter Invoke dans \`HookOn\`. Les frais sont standards. \`CronSet\` couvre la planification native, mais \`Invoke\` reste utile pour les déclenchements manuels et les flux personnalisés.`,
    ar: `\`Invoke\` معاملة خاصة بـ Xahau تسمح **بتفعيل Hook عمدا** دون إرسال دفع أو أثر اقتصادي آخر. هي طريقة استدعاء Hook مباشرة.

عادة تعمل Hooks بشكل تفاعلي عندما تمر معاملة عبر الحساب. لكن أحيانا نحتاج تشغيل المنطق دون تحويل: صيانة، إعادة حساب، مزامنة، اختبار، أو تفعيل Hook آخر.

### الحقول

\`TransactionType\` هو \`"Invoke"\`، و\`Account\` هو المرسل، و\`Destination\` اختياري. بدون \`Destination\` يتم تفعيل Hooks الحساب نفسه. مع \`Destination\` يتم تفعيل Hooks حساب الوجهة.

### تمرير البيانات

يمكن إضافة بيانات في \`Memos\` أو \`HookParameters\` ليعرف Hook الإجراء المطلوب. كما يمكن لـ Hook أن يصدر \`Invoke\` إلى حساب آخر.

### اعتبارات

\`Invoke\` لا ينقل أموالا. يجب أن يكون Hook مستعدا لـ Invoke في \`HookOn\`. الرسوم عادية. \`CronSet\` يغطي الجدولة الأصلية، لكن \`Invoke\` يبقى مفيدا للتشغيل اليدوي والتدفقات الخاصة.`,
  },
  m10l6: {
    fr: `\`SetRemarks\` attache des **paires clé-valeur** à des objets existants du ledger sur le réseau Xahau. Ce n'est pas un système de messages dans les transactions : c'est une annotation persistante associée à l'objet lui-même.

### Objets compatibles

Remarks peut annoter AccountRoot, Offer, Escrow, Ticket, PayChannel, Check, DepositPreauth, URIToken et RippleState. Seul le propriétaire ou l'issuer de l'objet peut modifier ses Remarks, avec des règles particulières pour URITokens et TrustLines.

### Champs et structure

\`SetRemarks\` contient \`Account\`, \`ObjectID\` et un tableau \`Remarks\`. Chaque \`Remark\` contient \`RemarkName\` (clé hex, 1-256 bytes), \`RemarkValue\` optionnel (valeur hex, 1-256 bytes) et \`Flags\`. Omettre \`RemarkValue\` supprime la Remark. \`Flags: 1\` (\`tfImmutable\`) la rend permanente.

### ObjectID

Pour AccountRoot, l'ObjectID est le champ \`index\` retourne par \`account_info\`. Pour Escrow, Check, Offer et autres objets, il correspond au \`LedgerIndex\` visible dans les \`AffectedNodes\` lors de la création.

### Limites, coûts et erreurs

Maximum 32 Remarks par objet. Les frais ajoutent 1 drop par byte de nom et valeur. Les noms doivent être uniques par objet. Erreurs courantes : \`temDISABLED\`, \`tecNO_PERMISSION\`, \`tecIMMUTABLE\`, \`tecTOO_MANY_REMARKS\`.

### Pourquoi ce n'est pas un Memo

Un Memo est attaché à une transaction historique. Une Remark est attachée à un objet encore présent dans le ledger. Cela signifie qu'elle reste consultable avec l'objet, par exemple un AccountRoot, une TrustLine ou un URIToken, et qu'elle peut être mise à jour ou supprimée selon les règles.

### Champs en détail

\`ObjectID\` est obligatoire et pointe vers l'objet à annoter. \`Remarks\` est un tableau, ce qui permet de créer ou modifier plusieurs entrées dans une seule transaction. \`RemarkName\` doit être unique pour cet objet. \`RemarkValue\` est facultatif uniquement parce que son absence signifie suppression. \`tfImmutable\` doit être choisi avec prudence, car il rend l'entrée définitive.

### Conseils de conception

Utilise des noms courts et stables, encode proprement en hexadécimal, évite de stocker des données personnelles, et réserve les Remarks immutables aux certifications ou références qui ne doivent jamais changer.`,
    ar: `\`SetRemarks\` تضيف **أزواج مفتاح/قيمة** إلى كائنات موجودة في ledger شبكة Xahau. ليست رسائل داخل المعاملة، بل ملاحظات دائمة مرتبطة بالكائن نفسه.

### الكائنات المدعومة

يمكن التعليق على AccountRoot وOffer وEscrow وTicket وPayChannel وCheck وDepositPreauth وURIToken وRippleState. فقط المالك أو issuer يمكنه تعديل Remarks، مع قواعد خاصة لـ URITokens وTrustLines.

### الحقول والبنية

تحتوي \`SetRemarks\` على \`Account\` و\`ObjectID\` ومصفوفة \`Remarks\`. كل \`Remark\` تحتوي \`RemarkName\` كمفتاح hex من 1 إلى 256 بايت، و\`RemarkValue\` اختياري كقيمة hex، و\`Flags\`. حذف \`RemarkValue\` يحذف الملاحظة. \`Flags: 1\` (\`tfImmutable\`) يجعلها دائمة.

### ObjectID

بالنسبة إلى AccountRoot، يكون ObjectID هو حقل \`index\` من \`account_info\`. أما Escrow وCheck وOffer وغيرها فيظهر \`LedgerIndex\` داخل \`AffectedNodes\` عند الإنشاء.

### الحدود والتكاليف والأخطاء

الحد الأقصى 32 Remark لكل كائن. تضاف رسوم 1 drop لكل بايت من الاسم والقيمة. يجب أن تكون الأسماء فريدة. الأخطاء الشائعة: \`temDISABLED\`, \`tecNO_PERMISSION\`, \`tecIMMUTABLE\`, \`tecTOO_MANY_REMARKS\`.`,
  },
  m10l7: {
    fr: `\`Remit\` est une transaction exclusive à Xahau qui combine plusieurs actions en une seule opération atomique. Elle peut activer un compte, envoyer XAH ou IOUs, transférer des URITokens ou minter un URIToken directement à la destination.

### Pourquoi Remit ?

Au lieu d'envoyer plusieurs transactions séparées, Remit exécute tout ensemble. Cela économise du temps et des frais, et garantit que toutes les actions réussissent ensemble ou échouent ensemble.

### Champs principaux

\`Account\` et \`Destination\` sont requis. \`Amounts\` peut contenir jusqu'à 32 paiements, \`URITokenIDs\` jusqu'à 32 URITokens à transférer, \`MintURIToken\` décrit un NFT à créer, \`DestinationTag\`, \`Inform\`, \`Blob\` et \`InvoiceID\` ajoutent des options de routage, Hook ou référence.

### AmountEntry et URITokens

Chaque \`AmountEntry\` peut être du XAH en drops ou un IOU avec \`currency\`, \`issuer\` et \`value\`. Les montants dupliqués dans la même devise ne sont pas autorisés. \`MintURIToken\` contient \`URI\`, \`Digest\` optionnel et \`Flags\` comme \`tfBurnable\`.

### Frais et réserves

Remit couvre automatiquement l'activation du compte destination, les réserves des nouvelles TrustLines nécessaires et les réserves des URITokens transférés ou créés. Ces coûts sont déduits du compte émetteur, en plus des frais standards.

### Atomicité

L'intérêt principal de Remit est l'atomicité : si une partie du flux ne peut pas être exécutée, la transaction entière échoue. Cela évite les états intermédiaires où un compte serait activé mais sans recevoir l'actif attendu, ou un URIToken serait transféré sans le paiement associé.

### Amounts et doublons

Le tableau \`Amounts\` accepte plusieurs actifs, mais pas deux entrées équivalentes pour la même devise et le même issuer. Pour les IOUs, le destinataire peut avoir besoin d'une TrustLine ; Remit peut couvrir la réserve nécessaire selon les règles de la transaction.

### Inform et Blob

\`Inform\` permet de notifier un compte avec Hook. \`Blob\` transporte des données arbitraires en hex, jusqu'à une taille importante, pour que le Hook puisse comprendre le contexte de l'opération. Ces champs rendent Remit utile dans des workflows d'application, pas seulement dans des paiements simples.

### Exécuter l'exemple deux fois

L'ID d'un URIToken vient de son émetteur et de son URI. Une deuxième exécution de l'exemple avec la même URI renvoie \`tecDUPLICATE\`, et le paiement n'est pas envoyé non plus : tout le Remit échoue. Pour l'exécuter à nouveau, change l'URI.`,
    ar: `\`Remit\` معاملة خاصة بـ Xahau تجمع عدة أفعال في عملية ذرية واحدة. يمكنها تفعيل حساب، إرسال XAH أو IOUs، نقل URITokens، أو إنشاء URIToken مباشرة للوجهة.

### لماذا Remit؟

بدلا من عدة معاملات منفصلة، تنفذ Remit كل شيء معا. هذا يوفر الوقت والرسوم، ويضمن أن تنجح كل الأفعال معا أو تفشل معا.

### الحقول الرئيسية

\`Account\` و\`Destination\` مطلوبان. \`Amounts\` يمكن أن تحتوي حتى 32 دفعة، و\`URITokenIDs\` حتى 32 URIToken للنقل، و\`MintURIToken\` يصف NFT جديدا، بينما \`DestinationTag\` و\`Inform\` و\`Blob\` و\`InvoiceID\` تضيف خيارات للـ Hook أو المرجع.

### AmountEntry وURITokens

كل \`AmountEntry\` يمكن أن تكون XAH بالدروبس أو IOU يحتوي \`currency\` و\`issuer\` و\`value\`. لا يسمح بتكرار نفس العملة في القائمة. \`MintURIToken\` يحتوي \`URI\` و\`Digest\` اختياري و\`Flags\` مثل \`tfBurnable\`.

### الرسوم والاحتياطيات

تغطي Remit تلقائيا تفعيل حساب الوجهة، واحتياطيات TrustLines الجديدة اللازمة، واحتياطيات URITokens المنقولة أو المنشأة. تخصم هذه التكاليف من حساب المرسل إضافة إلى الرسوم العادية.`,
  },
  m10l2: {
    fr: `Un **Check** ressemble à un chèque bancaire : l'émetteur crée un chèque pour un montant donne, et le destinataire peut l'encaisser quand il le souhaite. Contrairement à un paiement direct, les fonds ne sont pas transférés immédiatement ; le destinataire doit exécuter \`CheckCash\`.

### Pourquoi utiliser Checks ?

Le destinataire contrôle le moment de l'encaissement, le check peut rester dans le ledger en attendant, il peut permettre un encaissement partiel, et il fonctionne avec XAH natif comme avec des IOUs.

### CheckCreate

\`CheckCreate\` contient \`Account\` (émetteur), \`Destination\` (compte qui peut encaisser), \`SendMax\` (montant maximum), \`Expiration\` optionnel et \`InvoiceID\` optionnel. \`SendMax\` peut être une string en drops pour XAH ou un objet Amount pour un IOU avec \`currency\`, \`issuer\` et \`value\`.

### CheckCash

Le destinataire encaisse avec \`CheckCash\`. Deux modes existent : \`Amount\` pour encaisser un montant exact, ou \`DeliverMin\` pour demander au moins un minimum, utile avec des IOUs. Il faut utiliser \`Amount\` ou \`DeliverMin\`, jamais les deux.

### CheckCancel et erreurs courantes

\`CheckCancel\` annule un check par son \`CheckID\`. L'émetteur ou le destinataire peut annuler, et un check expirÃ© peut aussi l'être. Erreurs typiques : \`tecNO_ENTRY\` si le check n'existe plus, \`tecNO_LINE\` si la TrustLine manque, \`tecUNFUNDED\` si l'émetteur n'a pas les fonds, \`tecEXPIRED\` si le check a expiré.

### Exemple de SendMax

Pour un check en XAH, \`SendMax\` est une string en drops, par exemple \`"10000000"\` pour 10 XAH. Pour un IOU, \`SendMax\` est un objet avec \`currency\`, \`issuer\` et \`value\`. Cela permet au même mécanisme de fonctionner avec l'actif natif et avec des tokens émis.

### Détails pratiques

Le \`CheckID\` est l'identifiant de l'objet Check dans le ledger. Après un \`CheckCreate\`, tu le récupérés en inspectant les objets créés dans les métadonnées ou avec les commandes de lecture du compte. Pour vérifier un encaissement, regarde toujours \`TransactionResult\` et les \`AffectedNodes\` afin de voir si le Check a été supprimé et si le solde a changé.

### Lancer les scripts de cette leçon

Le script CheckCreate signe avec \`WALLET_SEED\` et établit le Check au profit du compte \`CASH_SEED\` ; \`cash-check.js\` signe avec \`CASH_SEED\`, créé par \`create-accounts.js\` ([module 3](?m=3&l=1)). Le premier script affiche la commande exacte pour le second. Sortie sur le testnet :

\`\`\`
=== CheckCreate ===
Result: tesSUCCESS
CheckID: CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A
Cash it as CASH with: node cash-check.js CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A

=== CheckCash ===
Result: tesSUCCESS
Check cashed successfully!
Amount received: 50 XAH
\`\`\`

- **CheckCreate \`tesSUCCESS\`** : un objet Check existe maintenant ; aucun XAH n'a encore bougé. Son **CheckID** est l'index de cet objet dans le ledger.
- **CheckCash \`tesSUCCESS\`** : CASH a encaissé exactement 50 XAH et l'objet Check a été supprimé. L'encaisser à nouveau renvoie \`tecNO_ENTRY\`.

\`cash-check.js\` n'envoie rien sans CheckID hex de 64 caractères et indique quoi passer.`,
    ar: `**Check** يشبه الشيك البنكي: ينشئ المرسل شيكا بمبلغ معين، ويمكن للمستلم صرفه لاحقا. على عكس Payment، لا تنتقل الأموال فورا؛ يجب أن ينفذ المستلم \`CheckCash\`.

### لماذا نستخدم Checks؟

المستلم يتحكم في وقت الصرف، والشيك يبقى في ledger حتى يتم صرفه، ويمكن صرف جزء من المبلغ، كما يدعم XAH وIOUs.

### CheckCreate

تحتوي \`CheckCreate\` على \`Account\` مصدر الشيك، و\`Destination\` الحساب الذي يمكنه صرفه، و\`SendMax\` الحد الأعلى، و\`Expiration\` اختياري، و\`InvoiceID\` اختياري. يمكن أن يكون \`SendMax\` نصا بالدروبس لـ XAH أو كائن Amount لـ IOU يحتوي \`currency\` و\`issuer\` و\`value\`.

### CheckCash

يصرف المستلم الشيك بواسطة \`CheckCash\`. هناك وضعان: \`Amount\` لصرف مبلغ محدد، أو \`DeliverMin\` لقبول حد أدنى، وهذا مفيد مع IOUs. يجب استخدام واحد منهما فقط.

### CheckCancel والأخطاء

\`CheckCancel\` يلغي الشيك باستخدام \`CheckID\`. يمكن للمرسل أو المستلم الإلغاء، كما يمكن إلغاء الشيك المنتهي. من الأخطاء الشائعة: \`tecNO_ENTRY\` إذا لم يعد الشيك موجودا، \`tecNO_LINE\` عند غياب TrustLine، \`tecUNFUNDED\` إذا لم يملك المصدر الأموال، و\`tecEXPIRED\` إذا انتهت الصلاحية.`,
  },
  m10l3: {
    fr: `Un **Ticket** permet d'envoyer des transactions hors de l'ordre normal de \`Sequence\`. D'habitude, chaque transaction doit utiliser le prochain numéro de séquence du compte. Les Tickets réservent des numéros à l'avance pour éviter ce blocage.

Chaque compte a une \`Sequence\` qui augmente à chaque transaction. Un Ticket réserve une séquence future ; la transaction utilise alors \`TicketSequence\` et met \`Sequence: 0\`. Les Tickets peuvent être consommés dans n'importe quel ordre.

### Usages

Ils servent aux transactions parallèles, transactions pre-signées, multi-signing, opérations de secours et backends qui doivent préparer plusieurs transactions sans attendre que la précédente soit validée.

### TicketCreate, réserve et limites

\`TicketCreate\` prend \`TicketCount\`, de 1 à 250. Chaque Ticket actif consomme une owner réserve, comme une TrustLine ou une offre DEX. Un compte peut avoir au maximum 250 Tickets actifs et ils n'expirent pas. Quand un Ticket est utilisÃ©, il est détruit et la réserve est libérée.

### Annulation

Il n'existe pas de transaction dédiée pour annuler un Ticket. On peut utiliser une transaction \`AccountSet\` vide avec \`TicketSequence\` pour consommer le Ticket et libérer la réserve.`,
    ar: `**Ticket** هو آلية تسمح بإرسال معاملات **خارج الترتيب التسلسلي** العادي. عادة، يجب أن تستخدم كل معاملة على Xahau رقم \`Sequence\` التالي للحساب. تزيل Tickets هذا القيد عن طريق حجز أرقام تسلسل مسبقا.

### ما هو Ticket؟

كل حساب على Xahau لديه رقم \`Sequence\` يزداد مع كل معاملة. هذا يعني أن المعاملات يجب أن تُعالج بترتيب صارم. تحل Tickets هذه المشكلة:

- يقوم Ticket **بحجز** رقم تسلسل للاستخدام لاحقا
- المعاملة التي تستخدم Ticket تحدد \`TicketSequence\` بدلا من \`Sequence\`
- يمكن استخدام Tickets **بأي ترتيب**، بغض النظر عن وقت إنشائها

### فيم تُستخدم Tickets؟

- **معاملات متوازية**: تجهيز وتوقيع عدة معاملات دون الاعتماد على الترتيب
- **معاملات موقعة مسبقا**: توقيع معاملات مسبقا وإرسالها عند الحاجة
- **التوقيع المتعدد**: يمكن لموقّعين مختلفين تجهيز معاملات مستقلة دون حجب Sequence
- **حالات الطوارئ**: تجهيز معاملات احتياطية جاهزة دون استهلاك التسلسل العادي

### TicketCreate: حجز Tickets

معاملة \`TicketCreate\` تحجز رقم تسلسل واحدا أو أكثر:

| الحقل | الوصف |
|---|---|
| \`TransactionType\` | \`"TicketCreate"\` |
| \`Account\` | الحساب الذي يحجز التذاكر |
| \`TicketCount\` | عدد التذاكر المراد إنشاؤها (1-250) |

### تكلفة الحجز

كل Ticket يتم إنشاؤه يستهلك **احتياطي مالك** من الحساب، تماما مثل TrustLine أو عرض على DEX. هذا يعني أنه لكل Ticket نشط تحتاج إلى XAH إضافي مقفل في حسابك. يُحذف Ticket (ويُطلق الاحتياطي) عند استخدامه أو إلغائه.

### الحدود

- **الحد الأقصى لكل معاملة**: يمكنك إنشاء ما يصل إلى **250 Ticket** في معاملة \`TicketCreate\` واحدة
- **الحد الأقصى لكل حساب**: يمكن لحساب أن يمتلك ما يصل إلى **250 Ticket** نشط في نفس الوقت
- Tickets **لا تنتهي صلاحيتها** — تبقى في السجل حتى تُستخدم أو تُلغى

### استخدام Ticket في معاملة

لاستخدام Ticket، أضف هذه الحقول في معاملتك:
- \`Sequence: 0\` — يشير إلى أن التسلسل العادي غير مستخدم
- \`TicketSequence: N\` — رقم Ticket المراد استهلاكه

يُدمَّر Ticket تلقائيا عند استخدامه، مما يُطلق الاحتياطي.

### إلغاء Tickets غير المستخدمة

إذا لم تعد بحاجة إلى Ticket، يمكنك إلغاءه لتحرير الاحتياطي. لا توجد معاملة محددة لإلغاء Tickets. بدلا من ذلك، يمكنك استخدام معاملة \`AccountSet\` فارغة (بدون تغييرات) تستهلك Ticket.`,
  },
  m10l8: {
    fr: `\`CronSet\` fait exécuter par le réseau le Hook de ton compte selon un calendrier, sans service externe qui envoie des transactions. Cette leçon explique comment le réseau s'y prend, ce dont ont besoin le Hook et le compte, et ce que coûtent chaque champ et chaque exécution.

### Comment un cron s'exécute

\`CronSet\` enregistre un objet **Cron** dans ton compte : quand exécuter, toutes les combien de secondes et combien de fois encore. À ce moment-là, le réseau crée lui-même une **pseudo-transaction \`Cron\`**. Personne ne la signe et elle n'a pas de frais ; son champ \`Owner\` est ton compte. Cette transaction déclenche le Hook de ton compte. L'objet Cron passe ensuite au moment suivant, jusqu'à ce qu'il ne reste plus de répétitions, puis il disparaît.

Un compte a au plus un Cron. Un nouveau \`CronSet\` remplace l'actuel.

### Ce dont ont besoin le Hook et le compte

Ton compte n'envoie pas la transaction \`Cron\` : ton Hook s'exécute donc comme **transactional stakeholder faible** (TSH faible). Il est informé de la transaction et ne peut pas la rejeter. Une exécution faible est un **collect call**, payé par le compte du Hook. Elle n'a lieu que si les deux côtés l'autorisent :

1. **Le Hook autorise les collect calls** : installé avec le flag \`hsfCOLLECT\` (\`4\`). Avec \`hsfOVERRIDE\` (\`1\`), \`Flags: 5\`. Son \`HookOn\` doit aussi inclure le type de transaction \`Cron\`, \`92\`.
2. **Le compte autorise les collect calls** : \`AccountSet\` avec \`SetFlag: 11\` (\`asfTshCollect\`).

S'il en manque un, \`CronSet\` renvoie quand même \`tesSUCCESS\` et le cron s'épuise quand même, mais le Hook ne s'exécute jamais. Rien ne le signale : vérifie que les deux sont en place.

Un Hook qui compte ses exécutions de Cron, et les champs pour l'installer comme dans la [leçon 9.2](?m=9&l=1) :

\`\`\`c
int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    if (otxn_type() != 92)   // 92 = ttCRON : seule la transaction Cron compte
        accept(SBUF("cron_counter: not a Cron"), __LINE__);

    // Le compteur vit dans l'état du Hook, sous la clé "CRON"
    uint8_t key[32] = { 'C', 'R', 'O', 'N' };
    uint64_t count = 0;
    state(SVAR(count), SBUF(key));
    count++;
    if (state_set(SVAR(count), SBUF(key)) < 0)
        rollback(SBUF("cron_counter: state_set failed"), __LINE__);
    accept(SBUF("cron_counter: counted"), __LINE__);
    return 0;
}
\`\`\`

\`\`\`javascript
Hook: {
  CreateCode: wasmHex,
  // Seul Cron (bit 92) le déclenche. Le bit 22 (SetHook) fonctionne à l'inverse : 0 = pas déclenché
  HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
  HookNamespace: namespace,
  HookApiVersion: 0,
  Flags: 5, // hsfOVERRIDE (1) + hsfCOLLECT (4)
}
\`\`\`

Résultat sur le testnet, avec \`StartTime: 0\`, \`DelaySeconds: 10\` et \`RepeatCount: 2\`, en lisant l'état du Hook 50 secondes plus tard :

\`\`\`
SetHook      tesSUCCESS   Flags: 5, HookOn with bit 92
AccountSet   tesSUCCESS   SetFlag: 11 (asfTshCollect)
CronSet      tesSUCCESS   Fee: 40 drops
Cron         StartTime: 843801161, DelaySeconds: 10, RepeatCount: 2
50 s plus tard  état du Hook CRON = 3
\`\`\`

- **\`RepeatCount: 2\` a donné 3 exécutions** : la première à \`StartTime\`, puis 2 répétitions.
- **\`StartTime: 0\`** est devenu l'heure de clôture du ledger précédent : « maintenant ».
- **Le même essai sans \`asfTshCollect\`, ou avec \`Flags: 1\`**, renvoie le même \`tesSUCCESS\` et ne laisse aucun état : le Hook ne s'est jamais exécuté.

### Les champs

| Champ | Obligatoire | Signification |
|---|---|---|
| \`StartTime\` | Oui, pour créer | Première exécution, en secondes depuis le Ripple Epoch. \`0\` = maintenant. Au plus 365 jours dans le futur |
| \`DelaySeconds\` | Avec \`RepeatCount\` | Secondes entre les exécutions, jusqu'à 31 536 000 (365 jours) |
| \`RepeatCount\` | Avec \`DelaySeconds\` | Exécutions après la première, de 1 à 256 |
| \`Flags\` | Pour supprimer | \`1\` (\`tfCronUnset\`), sans aucun des champs ci-dessus |

\`DelaySeconds\` et \`RepeatCount\` vont ensemble ou pas du tout. Avec \`StartTime\` seul, le Hook s'exécute une fois. Avec les deux, il s'exécute \`1 + RepeatCount\` fois. Pour plus de 257 exécutions, envoie un nouveau \`CronSet\` avant la fin de l'actuel : il le remplace.

La suppression réussit toujours, même s'il n'y a aucun Cron.

### Le temps en Ripple Epoch

\`StartTime\` compte les secondes depuis le 1er janvier 2000 UTC, pas depuis 1970 comme un timestamp Unix :

\`\`\`javascript
// L'heure actuelle en Ripple Epoch
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// Commencer dans une heure
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

### Ce que coûte un cron

- **Les frais du \`CronSet\`** couvrent la transaction et les exécutions qu'elle programme : les frais de base × (2 + \`RepeatCount\`). Avec des frais de base de 10 drops et \`RepeatCount: 2\`, 40 drops, comme dans le résultat ci-dessus.
- **La réserve** : l'objet Cron compte dans \`OwnerCount\` tant qu'il existe.
- **Chaque exécution** est un collect call facturé au compte. Si le solde ne la couvre pas au-dessus de la réserve, cette exécution du Hook est sautée.

### Les exemples

Le premier exemple active TSH Collect sur \`WALLET\` et programme son Hook toutes les heures avec \`RepeatCount: 24\` : 25 exécutions. Il n'exécute quelque chose que si \`WALLET\` a un Hook installé comme ci-dessus. Le second exemple supprime le cron avec \`tfCronUnset\`.

### Erreurs

| Erreur | Cause |
|---|---|
| \`temMALFORMED\` | Pas de \`StartTime\` à la création ; un seul de \`DelaySeconds\` et \`RepeatCount\` ; \`RepeatCount\` à 0 ou au-delà de 256 ; \`DelaySeconds\` au-delà de 365 jours ; \`tfCronUnset\` avec d'autres champs |
| \`temINVALID_FLAG\` | Un flag autre que \`tfCronUnset\` |
| \`tecEXPIRED\` | \`StartTime\` dans le passé, ou à plus de 365 jours |
| \`tecINSUFFICIENT_RESERVE\` | Le solde ne couvre pas la réserve d'un objet de plus |
| \`temDISABLED\` | L'amendment Cron n'est pas activé sur le réseau |`,
    ar: `يجعل \`CronSet\` الشبكة تشغّل الـ Hook الخاص بحسابك وفق جدول زمني، من دون خدمة خارجية ترسل المعاملات. يشرح هذا الدرس كيف تفعل الشبكة ذلك، وما يحتاجه الـ Hook والحساب، وكم تكلّف كل خانة وكل تنفيذ.

### كيف يعمل الـ cron

يخزّن \`CronSet\` كائن **Cron** في حسابك: متى يُنفَّذ، وكل كم ثانية، وكم مرة أخرى. عندما يحين الوقت، تنشئ الشبكة نفسها **معاملة زائفة من نوع \`Cron\`**. لا يوقّعها أحد وليس لها رسوم؛ وحقل \`Owner\` فيها هو حسابك. تُطلق هذه المعاملة الـ Hook الخاص بحسابك. ثم ينتقل كائن Cron إلى الموعد التالي، إلى أن تنفد التكرارات فيختفي.

للحساب Cron واحد على الأكثر. أي \`CronSet\` جديد يحل محل الحالي.

### ما يحتاجه الـ Hook والحساب

حسابك لا يرسل معاملة \`Cron\`، لذا يعمل الـ Hook بصفته **صاحب مصلحة ضعيفًا في المعاملة** (weak TSH): يُبلَّغ بالمعاملة ولا يستطيع رفضها. التنفيذ الضعيف هو **collect call** يدفع تكلفته حساب الـ Hook. ولا يحدث إلا عندما يسمح به الطرفان:

1. **الـ Hook يسمح بالـ collect calls**: مثبّت بالـ flag \`hsfCOLLECT\` (\`4\`). ومع \`hsfOVERRIDE\` (\`1\`) تصبح \`Flags: 5\`. ويجب أن يتضمن \`HookOn\` نوع المعاملة \`Cron\`، أي \`92\`.
2. **الحساب يسمح بالـ collect calls**: \`AccountSet\` مع \`SetFlag: 11\` (\`asfTshCollect\`).

إذا غاب أحدهما، يظل \`CronSet\` يعيد \`tesSUCCESS\` ويستنفد الـ cron مراته، لكن الـ Hook لا يُنفَّذ أبدًا. لا شيء ينبّهك: تحقق من ضبط الاثنين.

Hook يعدّ مرات تنفيذه بواسطة Cron، والحقول اللازمة لتثبيته كما في [الدرس 9.2](?m=9&l=1):

\`\`\`c
int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    if (otxn_type() != 92)   // 92 = ttCRON: لا تُحسب إلا معاملة Cron
        accept(SBUF("cron_counter: not a Cron"), __LINE__);

    // يُحفظ العدّاد في حالة الـ Hook تحت المفتاح "CRON"
    uint8_t key[32] = { 'C', 'R', 'O', 'N' };
    uint64_t count = 0;
    state(SVAR(count), SBUF(key));
    count++;
    if (state_set(SVAR(count), SBUF(key)) < 0)
        rollback(SBUF("cron_counter: state_set failed"), __LINE__);
    accept(SBUF("cron_counter: counted"), __LINE__);
    return 0;
}
\`\`\`

\`\`\`javascript
Hook: {
  CreateCode: wasmHex,
  // لا يُطلقه إلا Cron (البت 92). البت 22 (SetHook) يعمل بالعكس: 0 = لا يُطلق
  HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
  HookNamespace: namespace,
  HookApiVersion: 0,
  Flags: 5, // hsfOVERRIDE (1) + hsfCOLLECT (4)
}
\`\`\`

النتيجة على testnet، مع \`StartTime: 0\` و\`DelaySeconds: 10\` و\`RepeatCount: 2\`، بقراءة حالة الـ Hook بعد 50 ثانية:

\`\`\`
SetHook      tesSUCCESS   Flags: 5, HookOn with bit 92
AccountSet   tesSUCCESS   SetFlag: 11 (asfTshCollect)
CronSet      tesSUCCESS   Fee: 40 drops
Cron         StartTime: 843801161, DelaySeconds: 10, RepeatCount: 2
بعد 50 ثانية  حالة الـ Hook: CRON = 3
\`\`\`

- **أعطى \`RepeatCount: 2\` ثلاث مرات تنفيذ**: الأولى عند \`StartTime\`، ثم تكراران.
- **أصبح \`StartTime: 0\`** وقت إغلاق الـ ledger السابق: "الآن".
- **الاختبار نفسه من دون \`asfTshCollect\`، أو مع \`Flags: 1\`**، يعيد \`tesSUCCESS\` نفسه ولا يترك أي حالة: لم يُنفَّذ الـ Hook قط.

### الحقول

| الحقل | إلزامي | المعنى |
|---|---|---|
| \`StartTime\` | نعم، عند الإنشاء | أول تنفيذ، بالثواني منذ Ripple Epoch. \`0\` = الآن. بحد أقصى 365 يومًا في المستقبل |
| \`DelaySeconds\` | مع \`RepeatCount\` | الثواني بين مرات التنفيذ، حتى 31,536,000 (365 يومًا) |
| \`RepeatCount\` | مع \`DelaySeconds\` | مرات التنفيذ بعد الأولى، من 1 إلى 256 |
| \`Flags\` | للحذف | \`1\` (\`tfCronUnset\`)، من دون أي من الحقول السابقة |

يأتي \`DelaySeconds\` و\`RepeatCount\` معًا أو لا يأتيان. مع \`StartTime\` وحده، يُنفَّذ الـ Hook مرة واحدة. ومع الاثنين، يُنفَّذ \`1 + RepeatCount\` مرة. لأكثر من 257 مرة، أرسل \`CronSet\` جديدًا قبل انتهاء الحالي: سيحل محله.

الحذف ينجح دائمًا، حتى إن لم يوجد أي Cron.

### الوقت بصيغة Ripple Epoch

يعدّ \`StartTime\` الثواني منذ 1 يناير 2000 UTC، لا منذ 1970 كطابع Unix الزمني:

\`\`\`javascript
// الوقت الحالي بصيغة Ripple Epoch
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// البدء بعد ساعة
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

### تكلفة الـ cron

- **رسوم \`CronSet\`** تغطي المعاملة ومرات التنفيذ التي تجدولها: الرسوم الأساسية × (2 + \`RepeatCount\`). مع رسوم أساسية قدرها 10 drops و\`RepeatCount: 2\` تكون 40 drops، كما في النتيجة أعلاه.
- **الاحتياطي**: يُحتسب كائن Cron في \`OwnerCount\` ما دام موجودًا.
- **كل تنفيذ** هو collect call يُحمَّل على الحساب. إذا لم يكفِ الرصيد فوق الاحتياطي لتغطيته، يُتخطى ذلك التنفيذ للـ Hook.

### الأمثلة

يفعّل المثال الأول TSH Collect على \`WALLET\` ويجدول الـ Hook الخاص به كل ساعة مع \`RepeatCount: 24\`: أي 25 مرة. ولا يُنفّذ شيئًا إلا إذا كان لدى \`WALLET\` Hook مثبّت كما سبق. ويحذف المثال الثاني الـ cron بـ \`tfCronUnset\`.

### الأخطاء

| الخطأ | السبب |
|---|---|
| \`temMALFORMED\` | غياب \`StartTime\` عند الإنشاء؛ وجود واحد فقط من \`DelaySeconds\` و\`RepeatCount\`؛ \`RepeatCount\` صفر أو أكثر من 256؛ \`DelaySeconds\` أكثر من 365 يومًا؛ \`tfCronUnset\` مع حقول أخرى |
| \`temINVALID_FLAG\` | flag غير \`tfCronUnset\` |
| \`tecEXPIRED\` | \`StartTime\` في الماضي، أو بعد أكثر من 365 يومًا |
| \`tecINSUFFICIENT_RESERVE\` | الرصيد لا يغطي احتياطي كائن إضافي |
| \`temDISABLED\` | تعديل Cron غير مفعّل على الشبكة |`,
  },
  m10l9: {
    fr: `Un **Price Oracle** est un objet de ledger qui permet à un compte de publier des prix d'actifs directement sur Xahau. Applications et Hooks peuvent lire ces prix depuis le ledger au lieu de dépendre d'une valeur codée en dur ou d'un serveur privé.

### Problème résolu

La DeFi a besoin de prix : XAH/USD, BTC/USD, token/USD, ratios de collateral, conversions de récompenses et seuils de liquidation. Price Oracle transforme ces données de marche externes en données on-chain inspectables.

### Transactions et objet Oracle

\`OracleSet\` crée ou met à jour un Oracle. \`OracleDelete\` supprime l'objet et libère la réserve. L'objet appartient au compte qui publie et un même compte peut avoir plusieurs \`OracleDocumentID\`.

Les champs principaux sont \`Owner\`, \`OracleDocumentID\`, \`Provider\`, \`AssetClass\`, \`LastUpdateTime\`, \`PriceDataSeries\` et \`URI\` optionnel. Chaque prix contient \`BaseAsset\`, \`QuoteAsset\`, \`AssetPrice\` et \`Scale\`. Le prix réel est \`AssetPrice * 10^(-Scale)\`; par exemple 74560 avec Scale 4 donne 7.456.

### Règles, réserve et aggregation

\`Provider\` et \`AssetClass\` sont requis à la création. \`PriceDataSeries\` doit contenir 1 à 10 entrées, base et quote doivent différer, \`Scale\` va de 0 à 10 et \`LastUpdateTime\` doit être plus récent. Omettre \`AssetPrice\` pour une paire existante la supprime.

Les Oracles consomment 1 owner réserve pour 1-5 paires et 2 réserves pour 6-10. En production, on agrégé plusieurs providers via \`get_aggregate_price\`; \`trim\` et \`time_threshold\` réduisent outliers et prix obsolètes. Erreurs : \`temDISABLED\`, \`temMALFORMED\`, \`temARRAY_EMPTY\`, \`temARRAY_TOO_LARGE\`, \`tecINVALID_UPDATE_TIME\`, \`tecINSUFFICIENT_RESERVE\`, \`tecNO_ENTRY\`.

### Lancer les scripts de cette leçon

Ces scripts signent avec \`ORACLE_SEED\` de \`.env\`, créé par \`create-accounts.js\` ([module 3](?m=3&l=1)). Un compte distinct garde l'objet Oracle, et la réserve qu'il bloque, à l'écart de ton compte principal. Si la variable manque, les scripts s'arrêtent avant d'envoyer quoi que ce soit et indiquent quoi lancer.`,
    ar: `**Price Oracle** هو كائن ledger يسمح لحساب بنشر أسعار الأصول مباشرة على Xahau. يمكن للتطبيقات وHooks قراءة هذه الأسعار من ledger بدلا من الاعتماد على قيمة ثابتة أو خادم خاص.

### المشكلة

تحتاج DeFi إلى أسعار مثل XAH/USD وBTC/USD وtoken/USD ونسب الضمان وتحويلات المكافآت وحدود التصفية. يحول Price Oracle بيانات السوق الخارجية إلى بيانات on-chain يمكن فحصها.

### المعاملات وكائن Oracle

\`OracleSet\` ينشئ أو يحدث Oracle. \`OracleDelete\` يحذف الكائن ويحرر الاحتياطي. الكائن مملوك للحساب الناشر، ويمكن لنفس الحساب استخدام عدة \`OracleDocumentID\`.

الحقول الرئيسية: \`Owner\`, \`OracleDocumentID\`, \`Provider\`, \`AssetClass\`, \`LastUpdateTime\`, \`PriceDataSeries\`, و\`URI\` اختياري. كل سعر يحتوي \`BaseAsset\`, \`QuoteAsset\`, \`AssetPrice\`, \`Scale\`. السعر الحقيقي هو \`AssetPrice * 10^(-Scale)\`; مثلا 74560 مع Scale 4 تعني 7.456.

### القواعد والاحتياطي والتجميع

\`Provider\` و\`AssetClass\` مطلوبان عند الإنشاء. \`PriceDataSeries\` من 1 إلى 10، ويجب اختلاف base وquote، و\`Scale\` من 0 إلى 10، و\`LastUpdateTime\` يجب أن يكون أحدث. حذف \`AssetPrice\` لزوج موجود يحذف الزوج.

تستهلك Oracles احتياطيا واحدا لـ 1-5 أزواج واحتياطيين لـ 6-10. في الإنتاج يتم تجميع عدة providers عبر \`get_aggregate_price\`; وتقلل \`trim\` و\`time_threshold\` القيم الشاذة والأسعار القديمة. الأخطاء: \`temDISABLED\`, \`temMALFORMED\`, \`temARRAY_EMPTY\`, \`temARRAY_TOO_LARGE\`, \`tecINVALID_UPDATE_TIME\`, \`tecINSUFFICIENT_RESERVE\`, \`tecNO_ENTRY\`.

### تشغيل سكربتات هذا الدرس

تُوقّع هذه السكربتات بـ \`ORACLE_SEED\` من \`.env\`، الذي ينشئه \`create-accounts.js\` ([الوحدة 3](?m=3&l=1)). حساب منفصل يُبقي كائن Oracle، والاحتياطي الذي يحجزه، بعيدًا عن حسابك الرئيسي. إذا كان المتغير مفقودًا تتوقف السكربتات قبل الإرسال وتوضح ما يجب تشغيله.`,
  },
  m10l10: {
    fr: `La fonctionnalité s'appelle **IOURewardClaim**, mais la transaction envoyée reste **ClaimReward**. L'amendment étend \`ClaimReward\` pour que des issuers de tokens puissent exécuter des programmes de récompenses personnalisés pour les détenteurs d'IOUs.

### Problème résolu

Les récompenses natives XAH sont liées au système genesis. IOURewardClaim apporte un suivi similaire aux devises émises : tokens de fidélité, reçus de staking, points DAO, IOUs à rendement, devises de jeux ou d'apps. Le ledger stocke les compteurs sur la TrustLine et le Hook de l'issuer décide du payout.

### Pas un type séparé

Il n'existe pas de \`TransactionType: "IOURewardClaim"\`. On utilise \`ClaimReward\` avec \`Account\`, \`Issuer\` et \`ClaimCurrency\`. \`Issuer\` est le compte dont le Hook de récompense doit s'exécuter. \`ClaimCurrency.issuer\` est l'issuer du token IOU lui-même.

Dans l'exemple Learning Xahau, le programme de récompenses est \`rQDaZ361xnkezCjgUxKsuLjLckqu4kw6nm\` et l'issuer RWD est \`rHjU4oLTNBmsUV4CtifNhHVGWJTJfGC9vf\`.

### Fonctionnement et différences

Le holder doit avoir une TrustLine. Le reward issuer doit avoir un Hook déclenche par \`ClaimReward\`. Au premier claim, Xahau initialise les compteurs sur \`RippleState\`. Quand le solde change, le ledger met à jour \`TrustLineRewardAccumulator\`. Aux claims suivants, le ledger remet les compteurs à zéro et déclenche le Hook, qui lit l'accumulation et émet la récompense.

XAH rewards stocke les compteurs sur \`AccountRoot\`; IOU rewards les stocke sur \`RippleState\`. Le payout XAH vient du Hook genesis; le payout IOU vient du Hook de l'issuer. Exigences : amendment actif, TrustLine, Hook sur \`Issuer\`, Hook actif sur \`ClaimReward\`, devise non-XAH et issuer non-AMM. Erreurs : \`temDISABLED\`, \`temMALFORMED\`, \`temBAD_ISSUER\`, \`tecNO_ISSUER\`, \`tecNO_PERMISSION\`, \`tecNO_TARGET\`, \`tecNO_LINE\`.

### Trois comptes typiques

Un système de récompenses IOU utilise souvent trois rôles : le token issuer qui crée la devise, le reward issuer ou réserve qui détient les fonds et installe le Hook, et le holder qui possède l'IOU et envoie \`ClaimReward\`. Ces rôles peuvent parfois être combines, mais les séparer rend le modèle plus clair.

### Séparation tracking / payout

Le ledger suit l'exposition du holder dans le temps via les compteurs de TrustLine. Le Hook ne fait pas ce suivi lui-même : il lit la valeur accumulée et applique la logique métier, comme cooldowns, plafonds, conversion vers un autre token ou refus si les conditions ne sont pas remplies.

### Erreurs de configuration fréquentes

Si \`Issuer\` pointe vers le mauvais compte, aucun Hook ne sera déclenche. Si \`ClaimCurrency.issuer\` ne correspond pas au token, la TrustLine attendue ne sera pas trouvée. Si le holder n'a pas créé de TrustLine RWD, la réclamation échouera avec une erreur de ligne manquante.

### Lancer les scripts de cette leçon

Ces scripts signent avec \`HOLDER_SEED\` de \`.env\`, créé par \`create-accounts.js\` ([module 3](?m=3&l=1)). Le détenteur n'a besoin de XAH que pour la réserve de la TrustLine et les frais ; l'émetteur de RWD et le programme de récompenses sont des comptes testnet existants. Si la variable manque, les scripts s'arrêtent avant d'envoyer quoi que ce soit et indiquent quoi lancer.`,
    ar: `تسمى الميزة **IOURewardClaim** لكن المعاملة المرسلة تبقى **ClaimReward**. يوسع amendment معاملة \`ClaimReward\` حتى يستطيع issuers للتوكنات تشغيل برامج مكافآت مخصصة لحاملي IOUs.

### المشكلة

مكافآت XAH الأصلية مرتبطة بنظام genesis. تضيف IOURewardClaim تتبعا مشابها للعملات الصادرة: توكنات ولاء، إيصالات staking، نقاط DAO، IOUs بعائد، أو عملات ألعاب وتطبيقات. يخزن ledger العدادات على TrustLine ويقرر Hook الخاص بالـ issuer الدفع.

### ليست معاملة منفصلة

لا يوجد \`TransactionType: \"IOURewardClaim\"\`. نستخدم \`ClaimReward\` مع \`Account\` و\`Issuer\` و\`ClaimCurrency\`. \`Issuer\` هو الحساب الذي يجب أن يعمل Hook المكافآت لديه. \`ClaimCurrency.issuer\` هو issuer للتوكن نفسه.

في مثال Learning Xahau، برنامج المكافآت هو \`rQDaZ361xnkezCjgUxKsuLjLckqu4kw6nm\` وissuer لتوكن RWD هو \`rHjU4oLTNBmsUV4CtifNhHVGWJTJfGC9vf\`.

### العمل والفروق

يجب أن يملك holder TrustLine. ويجب أن يملك reward issuer Hook يتفاعل مع \`ClaimReward\`. في أول مطالبة يهيئ Xahau العدادات على \`RippleState\`. عند تغير الرصيد يحدث ledger \`TrustLineRewardAccumulator\`. في المطالبات التالية يصفر ledger العدادات ويشغل Hook، فيقرأ التراكم ويصدر المكافأة.

مكافآت XAH تخزن العدادات في \`AccountRoot\`; أما IOU rewards ففي \`RippleState\`. دفع XAH عبر Hook genesis؛ ودفع IOU عبر Hook issuer. المتطلبات: amendment مفعل، TrustLine، Hook على \`Issuer\`، Hook يعمل على \`ClaimReward\`، عملة غير XAH، وissuer ليس AMM. الأخطاء: \`temDISABLED\`, \`temMALFORMED\`, \`temBAD_ISSUER\`, \`tecNO_ISSUER\`, \`tecNO_PERMISSION\`, \`tecNO_TARGET\`, \`tecNO_LINE\`.`,
  },
};

function applyExpandedM10Theory(module) {
  for (const lesson of module.lessons) {
    const expanded = expandedM10Theory[lesson.id];
    if (!expanded) continue;
    lesson.theory.fr = expanded.fr;
    lesson.theory.ar = expanded.ar;
  }
}

applyExpandedM10Theory(moduleData);

const additionalM10TheoryDetails = {
  m10l2: {
    fr: ``,
    ar: `\n\n### مثال SendMax\n\nفي Check بـ XAH يكون \`SendMax\` نصا بالدروبس مثل \`\"10000000\"\` لـ 10 XAH. أما IOU فيكون \`SendMax\` كائنا يحتوي \`currency\` و\`issuer\` و\`value\`. لذلك يعمل نفس النظام مع الأصل الأصلي والتوكنات الصادرة.\n\n### تفاصيل عملية\n\n\`CheckID\` هو معرف كائن Check في ledger. بعد \`CheckCreate\` يمكنك الحصول عليه من الكائنات المنشأة في metadata أو عبر أوامر قراءة الحساب. للتحقق من الصرف، اقرأ دائما \`TransactionResult\` و\`AffectedNodes\` لمعرفة هل حذف Check وهل تغير الرصيد.

### تشغيل سكربتات هذا الدرس

يوقّع سكربت CheckCreate بـ \`WALLET_SEED\` ويحرّر الـ Check لحساب \`CASH_SEED\`، ويوقّع \`cash-check.js\` بـ \`CASH_SEED\` الذي ينشئه \`create-accounts.js\` ([الوحدة 3](?m=3&l=1)). يطبع السكربت الأول الأمر الدقيق للثاني. المخرجات على testnet:

\`\`\`
=== CheckCreate ===
Result: tesSUCCESS
CheckID: CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A
Cash it as CASH with: node cash-check.js CA18586BA4A172DA953A8D35082FA0F43E022216618EED3310214B6D565B340A

=== CheckCash ===
Result: tesSUCCESS
Check cashed successfully!
Amount received: 50 XAH
\`\`\`

- **CheckCreate \`tesSUCCESS\`**: أصبح هناك كائن Check، ولم ينتقل أي XAH بعد. الـ **CheckID** هو فهرس ذلك الكائن في ledger.
- **CheckCash \`tesSUCCESS\`**: صرف CASH مبلغ 50 XAH بالضبط وحُذف كائن Check. صرفه مرة أخرى يعيد \`tecNO_ENTRY\`.

لا يرسل \`cash-check.js\` شيئًا بدون CheckID بصيغة hex من 64 حرفًا، ويوضح ما يجب تمريره.`,
  },
  m10l6: {
    fr: ``,
    ar: `\n\n### لماذا ليست Memo؟\n\nMemo مرتبط بمعاملة تاريخية. أما Remark فمرتبطة بكائن ما زال موجودا في ledger. لذلك تبقى قابلة للقراءة مع الكائن نفسه، مثل AccountRoot أو TrustLine أو URIToken، ويمكن تحديثها أو حذفها حسب القواعد.\n\n### تفاصيل الحقول\n\n\`ObjectID\` إلزامي ويشير إلى الكائن المراد التعليق عليه. \`Remarks\` مصفوفة، ولذلك يمكن إنشاء أو تعديل عدة إدخالات في معاملة واحدة. \`RemarkName\` يجب أن يكون فريدا داخل الكائن. \`RemarkValue\` اختياري فقط لأن غيابه يعني الحذف. \`tfImmutable\` يجب استخدامه بحذر لأنه يجعل الإدخال نهائيا.\n\n### نصائح تصميم\n\nاستخدم أسماء قصيرة وثابتة، ورمز القيم إلى hexadecimal بشكل صحيح، وتجنب البيانات الشخصية، واجعل Remarks غير القابلة للتعديل مخصصة للشهادات أو المراجع التي لا يجب أن تتغير.`,
  },
  m10l7: {
    fr: ``,
    ar: `

### الذرية

أهم ميزة في Remit هي الذرية: إذا تعذر تنفيذ جزء من التدفق تفشل المعاملة كلها. هذا يمنع حالات وسطية مثل تفعيل حساب دون استلام الأصل، أو نقل URIToken دون الدفع المرتبط به.

### Amounts والتكرار

تقبل \`Amounts\` عدة أصول، لكنها لا تقبل إدخالين مكافئين لنفس العملة ونفس issuer. بالنسبة إلى IOUs قد يحتاج المستلم TrustLine؛ ويمكن لـ Remit تغطية الاحتياطي اللازم حسب قواعد المعاملة.

### Inform وBlob

\`Inform\` يسمح بإخطار حساب لديه Hook. \`Blob\` ينقل بيانات عشوائية بصيغة hex حتى حجم كبير، حتى يفهم Hook سياق العملية. لذلك Remit مفيدة في workflows تطبيقية، وليس في المدفوعات البسيطة فقط.

### تشغيل المثال مرتين

يُشتق معرّف الـ URIToken من المُصدر والـ URI. تشغيل المثال مرة ثانية بالـ URI نفسه يعيد \`tecDUPLICATE\`، ولا تُرسل الدفعة أيضًا: يفشل الـ Remit بالكامل. لتشغيله مرة أخرى، غيّر الـ URI.`,
  },
  m10l8: {
    fr: ``,
    ar: ``,
  },
  m10l10: {
    fr: ``,
    ar: `\n\n### ثلاثة حسابات نموذجية\n\nيستخدم نظام مكافآت IOU غالبا ثلاثة أدوار: token issuer الذي ينشئ العملة، وreward issuer أو reserve الذي يحتفظ بالمكافآت ويثبت Hook، وholder الذي يملك IOU ويرسل \`ClaimReward\`. يمكن دمج بعض الأدوار، لكن فصلها يجعل النموذج أوضح.\n\n### فصل التتبع عن الدفع\n\nيتتبع ledger تعرض holder عبر الزمن بواسطة عدادات TrustLine. لا يقوم Hook بهذا التتبع بنفسه؛ بل يقرأ القيمة المتراكمة ويطبق منطق الأعمال مثل cooldowns والحدود والتحويل إلى توكن آخر أو الرفض إذا لم تتحقق الشروط.\n\n### أخطاء إعداد شائعة\n\nإذا أشار \`Issuer\` إلى حساب خاطئ فلن يعمل Hook. إذا لم يطابق \`ClaimCurrency.issuer\` issuer للتوكن فلن توجد TrustLine المتوقعة. وإذا لم ينشئ holder TrustLine لـ RWD فستفشل المطالبة بخطأ line مفقودة.

### تشغيل سكربتات هذا الدرس

تُوقّع هذه السكربتات بـ \`HOLDER_SEED\` من \`.env\`، الذي ينشئه \`create-accounts.js\` ([الوحدة 3](?m=3&l=1)). يحتاج الحامل إلى XAH فقط لاحتياطي TrustLine والرسوم؛ أما مُصدر RWD وبرنامج المكافآت فهما حسابان موجودان على testnet. إذا كان المتغير مفقودًا تتوقف السكربتات قبل الإرسال وتوضح ما يجب تشغيله.`,
  },
};

function applyAdditionalM10TheoryDetails(module) {
  for (const lesson of module.lessons) {
    const details = additionalM10TheoryDetails[lesson.id];
    if (!details) continue;
    lesson.theory.fr += details.fr;
    lesson.theory.ar += details.ar;
  }
}

applyAdditionalM10TheoryDetails(moduleData);

// French and Arabic code: the English code, line by line, with its prose translated
applyKoreanM10(moduleData);
deriveCodeTranslations(moduleData);

addNewWords(moduleData, 10);
export default moduleData;
