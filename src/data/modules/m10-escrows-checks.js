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
- \`tecNO_ENTRY\`: el Oracle no existe al intentar eliminarlo`,
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
- \`tecNO_ENTRY\`: o Oracle não existe ao tentar removê-lo`,
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
- \`tecNO_ENTRY\`: the Oracle object does not exist when trying to delete it`,
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
- \`tecNO_ENTRY\`: 削除対象のOracleが存在しない`,
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
- \`tecNO_ENTRY\`: 삭제하려는 Oracle이 존재하지 않음`,
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
- \`tecNO_ENTRY\`: 删除时 Oracle 对象不存在`,
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

Necesitas la enmienda \`IOURewardClaim\` activa, una trustline entre \`Account\` y \`ClaimCurrency.issuer\`, un Hook instalado en \`Issuer\`, que ese Hook se dispare en \`ClaimReward\`, y \`ClaimCurrency\` no puede ser XAH. Errores habituales: \`temDISABLED\`, \`temMALFORMED\`, \`tecNO_ISSUER\`, \`tecNO_TARGET\` y \`tecNO_LINE\`.`,
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

Você precisa da emenda \`IOURewardClaim\` ativa, uma trustline entre \`Account\` e \`ClaimCurrency.issuer\`, um Hook instalado em \`Issuer\`, esse Hook disparando em \`ClaimReward\`, e \`ClaimCurrency\` não pode ser XAH. Erros comuns: \`temDISABLED\`, \`temMALFORMED\`, \`tecNO_ISSUER\`, \`tecNO_TARGET\` e \`tecNO_LINE\`.`,
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
- \`tecNO_LINE\`: no trustline exists for the requested IOU`,
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

\`IOURewardClaim\` amendment、\`Account\` と \`ClaimCurrency.issuer\` のtrustline、\`Issuer\` にインストールされたHook、そのHookが \`ClaimReward\` で発火すること、そして \`ClaimCurrency\` がXAHではないことが必要です。よくあるエラーは \`temDISABLED\`、\`temMALFORMED\`、\`tecNO_ISSUER\`、\`tecNO_TARGET\`、\`tecNO_LINE\` です。`,
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

\`IOURewardClaim\` amendment 활성화, \`Account\` 와 \`ClaimCurrency.issuer\` 사이의 trustline, \`Issuer\` 에 설치된 Hook, 그 Hook이 \`ClaimReward\` 에서 실행되는 것, 그리고 \`ClaimCurrency\` 가 XAH가 아니어야 합니다. 흔한 오류는 \`temDISABLED\`, \`temMALFORMED\`, \`tecNO_ISSUER\`, \`tecNO_TARGET\`, \`tecNO_LINE\` 입니다.`,
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

需要启用 \`IOURewardClaim\` amendment；\`Account\` 和 \`ClaimCurrency.issuer\` 之间需要 trustline；\`Issuer\` 上需要安装 Hook；该 Hook 必须在 \`ClaimReward\` 时触发；且 \`ClaimCurrency\` 不能是 XAH。常见错误包括 \`temDISABLED\`、\`temMALFORMED\`、\`tecNO_ISSUER\`、\`tecNO_TARGET\` 和 \`tecNO_LINE\`。`,
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

const makeIouRewardClaimCode = (comments) => `require("dotenv").config();
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

const makeIouRewardTrustlineCode = (comments) => `require("dotenv").config();
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

const makeIouRewardInspectCode = (comments) => `require("dotenv").config();
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
    inspect: "Consultamos la TrustLine del holder contra el issuer real de RWD.",
  },
  pt: {
    existingToken: "Este exercicio aponta para o token RWD ja criado no exemplo Learning Xahau.",
    existingHook: "O ClaimReward chama uma conta RESERVE que ja tem o Hook de reward programme instalado.",
    rewardIssuer: "conta com o Hook de recompensas instalado",
    tokenIssuer: "issuer real do token RWD",
    trustline: "O holder precisa de uma TrustLine para o issuer real do token RWD antes de reclamar.",
    inspect: "Consultamos a TrustLine do holder contra o issuer real de RWD.",
  },
  en: {
    existingToken: "This exercise points to the RWD token already created in the Learning Xahau example.",
    existingHook: "ClaimReward calls a RESERVE account that already has the reward programme Hook installed.",
    rewardIssuer: "account with the reward Hook installed",
    tokenIssuer: "real issuer of the RWD token",
    trustline: "The holder needs a TrustLine to the real RWD token issuer before claiming.",
    inspect: "We query the holder TrustLine against the real RWD issuer.",
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
  Object.entries(iouRewardComments).map(([lang, comments]) => [lang, makeIouRewardClaimCode(comments)])
);
const iouRewardTrustlineCode = Object.fromEntries(
  Object.entries(iouRewardComments).map(([lang, comments]) => [lang, makeIouRewardTrustlineCode(comments)])
);
const iouRewardInspectCode = Object.fromEntries(
  Object.entries(iouRewardComments).map(([lang, comments]) => [lang, makeIouRewardInspectCode(comments)])
);

const makePriceOracleSetCode = (comments) => `require("dotenv").config();
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

const makePriceOracleDeleteCode = (comments) => `require("dotenv").config();
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
    aggregate: "get_aggregate_price calcula mediana/media a partir de varios provedores.",
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
  Object.entries(priceOracleComments).map(([lang, comments]) => [lang, makePriceOracleSetCode(comments)])
);
const priceOracleQueryCode = Object.fromEntries(
  Object.entries(priceOracleComments).map(([lang, comments]) => [lang, makePriceOracleQueryCode(comments)])
);
const priceOracleDeleteCode = Object.fromEntries(
  Object.entries(priceOracleComments).map(([lang, comments]) => [lang, makePriceOracleDeleteCode(comments)])
);

export default {
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
        pt: "Escrows: pagamentos condicionales",
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
- Esto permite escrows que solo se liberan cuando alguien demuestra conocer un secreto`,
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
| \`Amount\` | Quantidade de XAH u otros ativos a bloquear (em drops para XAH, objeto Amount para tokens) |
| \`Destination\` | Conta que receberá os fundos |
| \`FinishAfter\` | Timestamp mínimo para completar o escrow |
| \`CancelAfter\` | Timestamp a partir do cual se pode cancelar |
| \`Condition\` | Crypto-condição opcional para a liberacioun |
**Reglas importantes**:
- Você deve especificar ao menos \`FinishAfter\` ou \`Condition\` (ou ambos)
- Se usas \`CancelAfter\`, deve ser posterior a \`FinishAfter\`
- Os timestamps usan a **Ripple Epoch** (segundos desde 01/01/2000 00:00:00 UTC)
### EscrowFinish: completar o escrow
Qualquer conta pode executar \`EscrowFinish\` para liberar os fundos ao destinatário:
- Sou funciona depois de \`FinishAfter\` (se foi especificado)
- Se houver \`Condition\`, deve ser fornecido o \`Fulfillment\` correto
- Os campos \`Owner\` e \`OfferSequence\` identifican qué escrow completar
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
- Isso permite escrows que sou são liberados quando alguém demonstra conhecer um segredo`,
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
- This allows escrows only released when someone proves they know a secret`,
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
- これにより、秘密を知っている人だけがリリースできるエスクローが可能になります`,
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

시간 조건과 암호 조건을 잘 이해해야 안전하게 사용할 수 있습니다.`,
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

安全使用 Escrow 的关键是理解时间条件和加密条件。`,
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

async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

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
    Destination: "rDireccionDelDestinatario",
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
async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
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
    Destination: "rDireccionDelDestinatario",
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
    console.log("¡Salvao Sequence! Lo você precisa para EscrowFinish.");
    console.log(\`Sequence do escrow: \${prepared.Sequence}\`);
    console.log(\`Seu endereço: \${sender.address}\`);
  }
  await client.disconnect();
}
createTimeLockedEscrow();`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

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
    Destination: "rDestinationAddress",
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
    console.log("\Save the Sequence! You need it for EscrowFinish.");
    console.log(\`Escrow Sequence: \${prepared.Sequence}\`);
    console.log(\`Your address: \${sender.address}\`);

  }

  await client.disconnect();
}

createTimeLockedEscrow();`,
            jp: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

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
    Destination: "rDestinationAddress",
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

async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

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
    Destination: "rDestinationAddress",
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

// Usa la dirección del creador y el Sequence del EscrowCreate
finishEscrow("rDireccionDelCreador", 12345);`,
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
  console.log("O tempo de bloqueio ha pasado. Completando escrow...");
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
    console.log("¡Escrow completado! Os fundos foram entregues.");
    console.log("Hash:", signed.hash);
  } else if (txResult === "tecNO_TARGET") {
    console.log("O escrow não foi encontrado. Pode ter sido cancelado.");
  }
  await client.disconnect();
}
// Use o endereço do criador e o Sequence do EscrowCreate
finishEscrow("rDireccionDelCreador", 12345);`,
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

// Use the creator's address and the Sequence from EscrowCreate
finishEscrow("rCreatorAddress", 12345);`,
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

// 作成者のアドレスとEscrowCreateのSequenceを使用
finishEscrow("rCreatorAddress", 12345);`,
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

// 使用创建者地址和 EscrowCreate 的 Sequence
finishEscrow("rCreatorAddress", 12345);`,
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
- \`tecEXPIRED\`: El cheque ha expirado`,
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
| \`Expiration\` | (Opcional) Timestamp tras o cual o cheque caduca |
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
Qualquera das dos partes (emissor ou receptor) pode cancelar um cheque. También se pode cancelar um cheque expirado.
| Campo | Descrição |
|---|---|
| \`TransactionType\` | \`"CheckCancel"\` |
| \`Account\` | Conta que executa a cancelacioun |
| \`CheckID\` | ID do cheque a cancelar |
### Erroes comunes
- \`tecNO_ENTRY\`: O CheckID não existe (ya foi cobrado ou cancelado)
- \`tecNO_LINE\`: Para IOUs, o receptor não tem TrustLine com o emissor do token
- \`tecUNFUNDED\`: O emissor do cheque não tem fundos suficientes ao momento de cobrar
- \`tecEXPIRED\`: O cheque ha expirado`,
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
- \`tecEXPIRED\`: The check has expired`,
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
- \`tecEXPIRED\`：チェックが失効しています`,
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

즉시 결제보다 유연하지만, 만료와 잔액 상태를 함께 관리해야 합니다.`,
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

它比即时支付更灵活，但也需要一起管理到期时间和余额状态。`,
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
const { Client, Wallet, xahToDrops } = require("xahau");

async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = "rDireccionDelReceptor"; // Reemplaza con la dirección del receptor y guarda la seed de esa cuenta en tu .env como CASH_SEED para el próximo ejemplo

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
      console.log("Guarda este CheckID para poder cobrar el cheque de tu cuenta. " + sender.address);
    }
  }

  await client.disconnect();
}

checkExample();`,
            pt: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = "rDireccionDelReceptor"; // Reemplaza com a endereço do receptor e guarda a seed de esa conta em tu .env como CASH_SEED para o prouximo exemplo
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
      console.log("Salva este CheckID para poder cobrar o cheque de seu conta. " + sender.address);
    }
  }
  await client.disconnect();
}
checkExample();`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = "rReceiverAddress"; // Replace with the recipient's address and save that account's seed in your .env as CASH_SEED for the next example

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
      console.log("Save this CheckID to cash the check from your account: " + sender.address);
    }
  }

  await client.disconnect();
}

checkExample();`,
            jp: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = "rReceiverAddress"; // 受取人のアドレスに置き換え、次の例のためにそのアカウントのシードを.envにCASH_SEEDとして保存

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
      console.log("このCheckIDを保存してください。あなたのアカウントでチェックを換金するために必要です: " + sender.address);
    }
  }

  await client.disconnect();
}

checkExample();`,
            zh: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = "rReceiverAddress"; // 替换成接收方地址，并把该账户 seed 保存到 .env 的 CASH_SEED，供下个示例使用

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
      console.log("请保存这个 CheckID，之后要用它从你的账户兑现支票: " + sender.address);
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
            es: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

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
cashCheck("TU_CHECK_ID_AQUI");`,
            pt: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
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
    console.log("¡Cheque cobrado com éxito!");
    const delivered = result.result.meta.delivered_amount;
    if (typeof delivered === "string") {
      console.log("Quantidade recibida:", Number(delivered) / 1_000_000, "XAH");
    } else {
      console.log("Quantidade recibida:", delivered.value, delivered.currency);
    }
  } else if (txResult === "tecNO_ENTRY") {
    console.log("O cheque não existe. Pode ter sido cancelado ou já cobrado.");
  } else if (txResult === "tecUNFUNDED") {
    console.log("O emissor não tem fundos suficientes.");
  }
  await client.disconnect();
}
// Use o CheckID obtido ao criar o cheque
cashCheck("TU_CHECK_ID_AQUI");`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

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
cashCheck("YOUR_CHECK_ID_HERE");`,
            jp: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

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
cashCheck("YOUR_CHECK_ID_HERE");`,
            zh: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

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
cashCheck("YOUR_CHECK_ID_HERE");`,
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
### ¿Para qué sirven os Tickets?
- **Transações paralelas**: Preparar e assinar múltiplas transações sem depender do ordem
- **Transações pre-firmadas**: Assinar transações antecipadamente e enviá-las quando convier
- **Multi-signing**: Diferentes firmantes podem preparar transações independemtes sem bloquear a sequência
- **Contingências**: Tener transações de respaldo listas sem consumir a sequência normal
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
Se ya no você precisa um Ticket, você pode cancelarlo para liberar a reserva. No existe uma transação específica para cancelar Tickets. Em su lugar, você pode usar uma transação \`AccountSet\` vacía (sem alteraçãos) que consuma o Ticket.`,
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

  const destinations = [
    { address: "rDestino1XXXXXXXXXXXXXXXXXXXXXXXXX", amount: 5,  label: "Pago A" },
    { address: "rDestino2XXXXXXXXXXXXXXXXXXXXXXXXX", amount: 10, label: "Pago B" },
    { address: "rDestino3XXXXXXXXXXXXXXXXXXXXXXXXX", amount: 15, label: "Pago C" },
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
  const destinations = [
    { address: "rDestino1XXXXXXXXXXXXXXXXXXXXXXXXX", amount: 5,  label: "Pagamento A" },
    { address: "rDestino2XXXXXXXXXXXXXXXXXXXXXXXXX", amount: 10, label: "Pagamento B" },
    { address: "rDestino3XXXXXXXXXXXXXXXXXXXXXXXXX", amount: 15, label: "Pagamento C" },
  ];
  // Podemos enviá-los em qualquer ordem, inclusive em paralelo
  // Aqui os enviamos em ordem inverso para demonstrar a flexibilidad
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
    // autofill pode sobreescribir Sequence, asi que lo forzamos
    prepared.Sequence = 0;
    prepared.TicketSequence = ticketSeq;
    const signed = sender.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
    const txResult = result.result.meta.TransactionResult;
    console.log(\`\${dest.label} (Ticket \${ticketSeq}): \${txResult} → \${dest.amount} XAH\`);
  }
  console.log("¡Todos os pagamentos enviados com Tickets!");
  console.log("Os Tickets usados se han destruido e a reserva liberada.");
  await client.disconnect();
}
paymentsWithTickets();`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

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

  const destinations = [
    { address: "rDestination1XXXXXXXXXXXXXXXXXXXXX", amount: 5,  label: "Payment A" },
    { address: "rDestination2XXXXXXXXXXXXXXXXXXXXX", amount: 10, label: "Payment B" },
    { address: "rDestination3XXXXXXXXXXXXXXXXXXXXX", amount: 15, label: "Payment C" },
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

  const destinations = [
    { address: "rDestination1XXXXXXXXXXXXXXXXXXXXX", amount: 5,  label: "支払いA" },
    { address: "rDestination2XXXXXXXXXXXXXXXXXXXXX", amount: 10, label: "支払いB" },
    { address: "rDestination3XXXXXXXXXXXXXXXXXXXXX", amount: 15, label: "支払いC" },
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

  const destinations = [
    { address: "rDestination1XXXXXXXXXXXXXXXXXXXXX", amount: 5,  label: "支付 A" },
    { address: "rDestination2XXXXXXXXXXXXXXXXXXXXX", amount: 10, label: "支付 B" },
    { address: "rDestination3XXXXXXXXXXXXXXXXXXXXX", amount: 15, label: "支付 C" },
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
- La dirección de \`Issuer\` es específica de cada red (testnet vs mainnet)`,
        pt: `Xahau conta com um sistema de **recompensas nativa** que distribuye XAH a as contas que participan ativamente na rede. A transação \`ClaimReward\` permite reclamar estas recompensas acumuladas.
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
| \`Account\` | Tu conta que reclama a recompensa |
| \`Issuer\` | A endereço do emissor de recompensas (genesis account da rede) |
| \`Flags\` |  \`1\` para cancelar o receber recompensas |
### Ativar e reclamar recompensas
Na primeira vez que você envia \`ClaimReward\`, **ativa** sua conta para receber recompensas. As execuções seguintes reivindicam as recompensas acumuladas desde a última vez. É recomendable reclamar periodicamente (por exemplo, uma vez em diao à semana) para manter suas recompensas em dia.
### Desativar recompensas
Se por algum motivo quiser deixar de participar no sistema de recompensas, você pode enviar \`ClaimReward\` com \`Flags: 1\`. Isso desativa sua conta do sistema de recompensas.
### Consideraciones
- As recompensas dependem do saldo e do tempo transcorrido desde a última reivindicação
- O fee da transação \`ClaimReward\` é padrão (como qualquer outra transação)
- É compatible com contas que tenham Hooks instalados
- A endereço de \`Issuer\` é específica de cada rede (testnet vs mainnet)`,
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
- The \`Issuer\` address is specific to each network (testnet vs mainnet)`,
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
- \`Issuer\`アドレスは各ネットワーク（testnet / mainnet）によって異なります`,
        ko: `Xahau는 네트워크 참여 계정에 XAH를 분배하는 **네이티브 보상 시스템**을 가지고 있습니다. \`ClaimReward\`는 누적 보상을 청구하는 트랜잭션입니다.

### 동작 방식

- 계정 잔액에 따라 보상이 누적
- 주기적으로 \`ClaimReward\`를 보내 수령
- 첫 실행은 보상 수신 활성화 역할도 수행

### 특징

- 스테이킹이나 위임이 필요 없음
- 보상은 계정 잔액으로 바로 반영
- 중지하려면 특정 플래그로 비활성화 가능

정확한 운영 정책은 네트워크 규칙에 따라 달라질 수 있으므로 항상 최신 문서를 확인하는 것이 좋습니다.`,
        zh: `Xahau 拥有一个向网络参与账户分配 XAH 的**原生奖励系统**。\`ClaimReward\` 用来领取累计奖励。

### 工作方式

- 奖励会根据账户余额持续累积
- 需要定期发送 \`ClaimReward\` 才能领取
- 第一次执行也会启用奖励接收

### 特点

- 不需要质押或委托
- 奖励直接计入账户余额
- 如需停止接收，可通过特定标志关闭

具体规则可能会随网络政策变化，因此最好始终查看最新文档。`,
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
  const saldoBefore = Number(accountInfo.result.account_data.Saldo) / 1_000_000;
  console.log("=== Estado antes de reclamar ===");
  console.log("Conta:", wallet.address);
  console.log("Saldo atual:", saldoBefore, "XAH");
  // Enviar ClaimReward
  // Issuer: conta genesis da rede (varía entre testnet e mainnet)
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
    const saldoAfter = Number(accountAfter.result.account_data.Saldo) / 1_000_000;
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
            pt: "1ª vez → Activa seu conta para recompensas\nProuximos → Reclama lo acumulado\n\nCampos:\n• Account: seu conta\n• Issuer: genesis account da rede\n• Flags: 0 (reclamar) / 1 (desativar)\n\nFee padrão, compatible com Hooks",
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
        pt: `A transação \`Invoke\` é um tipo de transação exclusivo de Xahau que permite **ativar um Hook deliberadamente**, sem necessidade de enviar um pagamento u outra transação com efecto econoumico. É a forma de "llamar" a um Hook de forma directa.
### Por que existe Invoke?
Os Hooks são executados reativamente cuando uma transação passa pela conta. Mas há situações em que você precisa ativar um Hook **sem que ocorra nenhuma outra ação**:
### Transação Invoke
| Campo | Descrição |
|---|---|
| \`TransactionType\` | \`"Invoke"\` |
| \`Account\` | Conta que envíao Invoke |
| \`Destination\` | (Opcional) Conta cujo Hook queremos ativar. Se não for especificada, ativa os Hooks da própria conta |
### Invoke como mecanismo
Podemos usar Invoke por distintos motivos:
- Que um Hook emita um \`Invoke\` para ativar outro Hook distinto
- Utilizar o \`Invoke\` como um trigger manual para ativar a lógica de um Hook quando precisarmos dele periodicamente
- Añadir informação na transação \`Invoke\` (por exemplo, em \`Memos\` ou \`HookParameters\`) para passar informação a um Hook
### Invoke a seu própria conta vs a outra conta
- **Sem Destination**: O \`Invoke\` ativa os Hooks de sua própria conta. Útil para Hooks de manutenção ou autogestão
- **Com Destination**: O \`Invoke\` ativa os Hooks da conta de destino. O Hook de destino pode distinguir quién enviou o Invoke e actuar em consecuencia
### Consideraciones
- \`Invoke\` não transfere fundos, é apenas um trigger
- O Hook que queramos ativar, deberá ter \`Invoke\` habilitado em su \`HookOn\` para reaccionar.
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

  // Invoke a otra cuenta que tiene un Hook instalado
  const invoke = {
    TransactionType: "Invoke",
    Account: wallet.address,
    Destination: "rCuentaConHookInstalado", // Cuenta cuyo Hook queremos activar
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
  // Invoke a outra conta que tem um Hook instalado
  const invoke = {
    TransactionType: "Invoke",
    Account: wallet.address,
    Destination: "rCuentaConHookInstalado", // Conta cujo Hook queremos ativar
  };
  const prepared = await client.autofill(invoke);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  const txResult = result.result.meta.TransactionResult;
  console.log("=== Invoke ===");
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);
  if (txResult === "tesSUCCESS") {
    console.log("Se había um Hook instalado, comteste se se ha invocado corretamente.");
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

  // Invoke on another account that has a Hook installed
  const invoke = {
    TransactionType: "Invoke",
    Account: wallet.address,
    Destination: "rAccountWithHookInstalled", // Account whose Hook we want to activate
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

  // Hookがインストールされている他のアカウントにInvoke
  const invoke = {
    TransactionType: "Invoke",
    Account: wallet.address,
    Destination: "rAccountWithHookInstalled", // 実行したいHookを持つアカウント
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

  // 对安装了 Hook 的另一个账户发送 Invoke
  const invoke = {
    TransactionType: "Invoke",
    Account: wallet.address,
    Destination: "rAccountWithHookInstalled", // 要触发其 Hook 的账户
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
        es: `La transacción \`SetRemarks\` permite adjuntar **pares clave-valor** a objetos existentes del ledger de Xahau. No es una forma de enviar mensajes ni de registrar datos en transacciones: es un mecanismo para **anotar objetos del ledger** (cuentas, ofertas, escrows, cheques, URITokens, TrustLines...) con metadata que queda asociada al propio objeto.

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
        pt: `A transação \`SetRemarks\` permite anexar **pares chave-valor** a objetos existentes do ledger de Xahau. Não é uma forma de enviar mensagens nem de registrar dados em transações: é um mecanismo para **anotar objetos do ledger** (contas, ofertas, escrows, cheques, URITokens, TrustLines...) com metadados que fica associada ao próprio objeto.
### ¿Qué tipos de objetos admiten Remarks?
\`SetRemarks\` pode anexar metadatà os siguientes tipos de objetos do ledger:
- **AccountRoot** — a conta em si (endereço, saldo, flags)
- **Offer** — ofertas no DEX
- **Escrow** — pagamentos condicionales
- **Ticket** — tickets de sequência
- **PayChannel** — canales de pagamento
- **Check** — cheques
- **DepositPreauth** — preautorizaciones de depousito
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
### Estructura de cada Remark
Cada elemento do array contem um objeto \`Remark\` com:
| Campo | Tipo | Requerido | Descrição |
|---|---|---|---|
| \`RemarkName\` | Blob | Sim | Nombre/chave da Remark (1–256 bytes). Debe ser único por objeto |
| \`RemarkValue\` | Blob | Não | Valor da Remark (1–256 bytes). **Omitir para eliminar** a Remark |
| \`Flags\` | UInt32 | Não | \`1\` (\`tfImmutable\`) hace a Remark **permanente e inmodificable** |
Os valores de \`RemarkName\` e \`RemarkValue\` são expressas em **hexadecimal**.
### Obter ou ObjectID de uma conta
Para anexar Remarks a sua própria conta (AccountRoot), você precisa su \`ObjectID\`, que é o campo \`index\` do objeto no ledger:
\`\`\`javascript
const info = await client.request({
  command: "account_info",
  account: wallet.address,
  ledger_index: "validated",
});
const objectID = info.result.account_data.index;
\`\`\`
Para otros objetos (Escrow, Check, Offer...) o \`ObjectID\` é o \`LedgerIndex\` que aparece nos \`AffectedNodes\` ao criar o objeto.
### Eliminar uma Remark
Omite \`RemarkValue\` no objeto \`Remark\` correspondiente. Xahau eliminará esa entrada do objeto.
### Remarks imutávels
Se adicionas \`Flags: 1\` (\`tfImmutable\`) ao criar uma Remark, **no podrá ser modificada nem eliminada** no futuro. Útil para certificaciones ou dados que deban quedar selados permanentemente.
### Limites e costes
- **Máximo 32 Remarks** por objeto do ledger
- **Fee adicional**: 1 drop por cada byte de \`RemarkName\` + \`RemarkValue\` na transação
- Nombre e valor: entre 1 e 256 bytes cada uno
- Os nomes devem ser únicos dentro do mismo objeto
### Erroes comunes
| Error | Causa |
|---|---|
| \`temDISABLED\` | A amendment Remarks no está ativa na rede |
| \`tecNO_PERMISSION\` | A conta no é propietaria/emissora do objeto |
| \`tecIMMUTABLE\` | Se intenta modificar uma Remark com \`tfImmutable\` |
| \`tecTOO_MANY_REMARKS\` | O objeto ya tem 32 Remarks (o máximo permitido) |`,
        en: `The \`SetRemarks\` transaction allows you to attach **key-value pairs** to existing Xahau ledger objects. It is not a way to send messages or record data in transactions: it is a mechanism to **annotate ledger objects** (accounts, offers, escrows, checks, URITokens, TrustLines...) with metadados that remains associated with the object itself.

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
            pt: "Añadir e atualizar Remarks em seu conta (AccountRoot)",
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
        // Remark imutável: não se podrá modificar nem eliminar nunca
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
            en: "Key-value metadados on ledger objects\n\n• Attach Remarks to: AccountRoot, Offer,\n  Escrow, Check, URIToken, TrustLine...\n• RemarkName + RemarkValue (in hex)\n• Only the owner/issuer can modify\n• Maximum 32 Remarks per object\n\nNot a message: it is object metadados",
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
          title: { es: "ObjectID: ¿qué objeto anotar?", pt: "ObjectID: ¿qual objeto anotar?", en: "ObjectID: which object to annotate?", jp: "ObjectID：どのオブジェクトに注釈するか？", zh: "ObjectID：要标注哪个对象？" },
          content: {
            es: "Cada objeto del ledger tiene un ID único:\n\n• AccountRoot → account_data.index\n• Escrow, Check, Offer → LedgerIndex\n  de los AffectedNodes al crear el objeto\n\nSetRemarks necesita ese ID para saber\na qué objeto adjuntar la metadata",
            pt: "Cada objeto do ledger tem um ID único:\n\n• AccountRoot → account_data.index\n• Escrow, Check, Offer → LedgerIndex\n  dos AffectedNodes ao criar o objeto\n\nSetRemarks precisa esse ID para saber\na qual objeto anexar a metadados",
            en: "Each ledger object has a unique ID:\n\n• AccountRoot → account_data.index\n• Escrow, Check, Offer → LedgerIndex\n  from AffectedNodes when creating the object\n\nSetRemarks needs that ID to know\nwhich object to attach the metadados to",
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

Para una referencia completa de \`Remit\`, incluyendo todos los campos y errores posibles, consulta la [documentación oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/remit/).`,
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
Remit paga automaticamente os costes adicionales asociados a cada accioun:
- **Ativação de conta**: Se a conta de destino não existe, se ativa com a reserva base
- **TrustLines**: Se se envían IOUs e a conta de destino precisa nuevas TrustLines, se crian e se cubre a reserva
- **Reservas de URITokens**: As reservas por URITokens transferidos ou minteados são cobertas automaticamente
Todos estos costes se deducen da conta que envíà transação (\`Account\`), además do fee padrão da transação.
### Mais informação
Para uma referencia completa de \`Remit\`, incluyendo todos os campos e errores posibles, consulta a [documentacioun oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/remit/).`,
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

For a complete reference to \`Remit\`, including all fields and possible errors, see the [official documentation](https://xahau.network/docs/protocol-reference/transactions/transaction-types/remit/).`,
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

すべてのフィールドと考えられるエラーを含む\`Remit\`の完全なリファレンスは、[公式ドキュメント](https://xahau.network/docs/protocol-reference/transactions/transaction-types/remit/)を参照してください。`,
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

복잡한 온보딩 흐름이나 다중 자산 전송에 특히 유용합니다.`,
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

它尤其适合复杂的 onboarding 流程或多资产转移。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Remit: pago + minteo de URIToken en una sola transacción",
            pt: "Remit: pagamento + minteo de URIToken em uma sou transação",
            en: "Remit: payment + URIToken minting in a single transaction",
            jp: "Remit：単一トランザクションでの支払い + URITokenのミント",
            zh: "Remit：在单笔交易中完成支付 + URIToken 铸造",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function sendRemit() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Remit: enviar 25 XAH + mintear un URIToken para el destino
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: "rDireccionDelDestinatario",
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
function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}
async function sendRemit() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // Remit: enviar 25 XAH + mintar um URIToken para o destino
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: "rDireccionDelDestinatario",
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

function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function sendRemit() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Remit: send 25 XAH + mint a URIToken for the destination
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: "rDestinationAddress",
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

function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function sendRemit() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Remit: 25 XAHの送信 + 宛先にURITokenをミント
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: "rDestinationAddress",
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

function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function sendRemit() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Remit：发送 25 XAH，并为目标账户铸造一个 URIToken
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: "rDestinationAddress",
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
            pt: "O emissor cubre todos os costes:\n\n• Ativação de conta destino\n• Criação de TrustLines necessárias\n• Reservas de URITokens\n• Fee padrão da transação\n\nAhorra fees e garante atomicidad\nvs múltiplas transações separadas",
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
        es: `La transacción \`CronSet\` permite programar la **ejecución automática y periódica** de un Hook directamente desde el protocolo de Xahau, sin depender de ningún servicio externo. Es el mecanismo nativo de cron jobs de la red.

### ¿Qué es CronSet?

Con \`CronSet\` puedes indicar a Xahau que ejecute el Hook de tu cuenta de forma recurrente: cada X segundos, a partir de una fecha concreta, un número determinado de veces. Todo queda registrado en el ledger y la red se encarga de la ejecución.

A diferencia del patrón \`Invoke\` periódico (donde un servicio externo envía transacciones), \`CronSet\` es **completamente on-chain**: no necesitas ningún script externo que esté corriendo constantemente.

### Requisitos previos

Antes de usar \`CronSet\` debes preparar la cuenta con tu Hook en dos pasos:

1. **Instalar un Hook con el flag \`hsfCOLLECT\`**: Este flag indica que el Hook está diseñado para ser invocado automáticamente por el sistema de crons de la red.

2. **Activar TSH Collect en tu cuenta** (\`asfTshCollect\`, \`SetFlag: 11\`): Permite que la red ejecute tu Hook mediante el mecanismo de Transaction Signature Hook Collection.

\`\`\`javascript
// Activar TSH Collect
const accountSet = {
  TransactionType: "AccountSet",
  Account: wallet.address,
  SetFlag: 11, // asfTshCollect
};
\`\`\`

### Campos de CronSet

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| \`TransactionType\` | String | Sí | \`"CronSet"\` |
| \`Account\` | String | Sí | La cuenta cuyo Hook se ejecutará periódicamente |
| \`StartTime\` | Number | No | Ripple Epoch del primer disparo. Usa \`0\` para ejecución inmediata. Omitir al eliminar |
| \`RepeatCount\` | Number | No | Número de veces que se ejecutará el Hook (máximo 256 por transacción). Omitir al eliminar |
| \`DelaySeconds\` | Number | No | Segundos entre cada ejecución. Omitir al eliminar |

**Reglas importantes**:
- \`DelaySeconds\` y \`RepeatCount\` deben estar presentes los dos, o ausentes los dos
- Para eliminar un cron activo: omite todos los campos de programación y añade \`Flags: 1\` (\`tfCronUnset\`)
- No puedes combinar \`tfCronUnset\` con campos de programación

### Tiempo en Ripple Epoch

Xahau usa la **Ripple Epoch** (segundos desde el 1 de enero de 2000 UTC), no el Unix timestamp:

\`\`\`javascript
// Convertir fecha actual a Ripple Epoch
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// Programar para dentro de 1 hora
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

Usa \`0\` en \`StartTime\` para que el cron empiece a ejecutarse desde el próximo ledger válido.

### Límites y restricciones

| Parámetro | Límite |
|---|---|
| \`RepeatCount\` máximo por transacción | 256 |
| \`DelaySeconds\` máximo | 31.536.000 s (365 días) |
| \`StartTime\` máximo hacia el futuro | 365 días |
| \`StartTime\` en el pasado | No permitido (\`tecEXPIRED\`) |

Si necesitas más de 256 repeticiones, envía otro \`CronSet\` antes de que se agoten para ampliar el contador.

### Eliminar un CronSet

Para cancelar un cron activo, envía \`CronSet\` con \`Flags: 1\`:

\`\`\`javascript
const cronDelete = {
  TransactionType: "CronSet",
  Account: wallet.address,
  Flags: 1, // tfCronUnset — elimina el cron activo
};
\`\`\`

### Errores comunes

| Error | Causa |
|---|---|
| \`temDISABLED\` | La feature CronSet no está activada en la red |
| \`temMALFORMED\` | Combinación de campos inválida (p.ej. solo uno de \`DelaySeconds\`/\`RepeatCount\`) |
| \`tecEXPIRED\` | \`StartTime\` en el pasado o más de 365 días en el futuro |`,
        pt: `A transação \`CronSet\` permite programar a **execução automática e periódica** de um Hook diretamente a partir do protocolo de Xahau, sem depender de nenhum serviço externo. É o mecanismo nativo de cron jobs da rede.
### O que é CronSet?
Com \`CronSet\` você pode indicar à Xahau que execute o Hook de sua conta de forma recorrente: cada X segundos, a partir de uma data específica, um número determinado de vezes. Todo fica registrado no ledger e a rede se encarrega da execução.
Diferentemente do padrão \`Invoke\` periódico (em que um serviço externo envia transações), \`CronSet\` é **completamente on-chain**: no você precisa nenhum script externo que esteja rodando constantemente.
### Requisitos previos
Antes de usar \`CronSet\` você deve preparar a conta com seu Hook em dois passos:
1. **Instalar um Hook com o flag \`hsfCOLLECT\`**: Este flag indica que o Hook está diseñado para ser invocado automaticamente por o sistema de crons da rede.
2. **Ativar TSH Collect em sua conta** (\`asfTshCollect\`, \`SetFlag: 11\`): Permite que a rede execute seu Hook por meio do mecanismo de Transaction Signature Hook Collection.
\`\`\`javascript
// Ativar TSH Collect
const accountSet = {
  TransactionType: "AccountSet",
  Account: wallet.address,
  SetFlag: 11, // asfTshCollect
};
\`\`\`
### Campos de CronSet
| Campo | Tipo | Requerido | Descrição |
|---|---|---|---|
| \`TransactionType\` | String | Sim | \`"CronSet"\` |
| \`Account\` | String | Sim | A conta cujo Hook é executadará periodicamente |
| \`StartTime\` | Number | Não | Ripple Epoch do primeiro disparo. Usa \`0\` para execução inmediata. Omitir ao eliminar |
| \`RepeatCount\` | Number | Não | Número de vezes que é executadará o Hook (máximo 256 por transação). Omitir ao eliminar |
| \`DelaySeconds\` | Number | Não | Segundos entre cada execução. Omitir ao eliminar |
**Reglas importantes**:
- \`DelaySeconds\` e \`RepeatCount\` devem estar presentes os dos, ou ausentes os dos
- Para eliminar um cron ativo: omite todos os campos de programacioun e adiciona \`Flags: 1\` (\`tfCronUnset\`)
- No você pode combinar \`tfCronUnset\` com campos de programacioun
### Tempo em Ripple Epoch
Xahau usa a **Ripple Epoch** (segundos desde o 1 de enero de 2000 UTC), no o Unix timestamp:
\`\`\`javascript
// Converter data atual a Ripple Epoch
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;
// Programar para dentro de 1 hora
const startIn1Hour = rippleEpoch + 3600;
\`\`\`
Usa \`0\` em \`StartTime\` para que o cron empiece a ejecutarse desde o prouximo ledger válido.
### Limites e restricciones
| Parámetro | Limite |
|---|---|
| \`RepeatCount\` máximo por transação | 256 |
| \`DelaySeconds\` máximo | 31.536.000 s (365 dias) |
| \`StartTime\` máximo hacia o futuro | 365 dias |
| \`StartTime\` no pasado | No permitido (\`tecEXPIRED\`) |
Se você precisa más de 256 repetições, envia otro \`CronSet\` antes de que se agoten para ampliar o contador.
### Eliminar um CronSet
Para cancelar um cron ativo, envia \`CronSet\` com \`Flags: 1\`:
\`\`\`javascript
const cronDelete = {
  TransactionType: "CronSet",
  Account: wallet.address,
  Flags: 1, // tfCronUnset — remova o cron ativo
};
\`\`\`
### Erroes comunes
| Error | Causa |
|---|---|
| \`temDISABLED\` | A feature CronSet não está ativada na rede |
| \`temMALFORMED\` | Combinação de campos inválida (por exemplo apenas um de \`DelaySeconds\`/\`RepeatCount\`) |
| \`tecEXPIRED\` | \`StartTime\` no pasado ou más de 365 dias no futuro |`,
        en: `The \`CronSet\` transaction allows scheduling the **automatic and periodic execution** of a Hook directly from the Xahau protocol, without depending on any external service. It is the network's native cron job mechanism.

### What is CronSet?

With \`CronSet\` you can instruct Xahau to execute your account's Hook recurrently: every X seconds, starting from a specific date, a certain number of times. Everything is recorded in the ledger and the network handles the execution.

Unlike the periodic \`Invoke\` pattern (where an external service sends transactions), \`CronSet\` is **completely on-chain**: you don't need any external script running constantly.

### Prerequisites

Before using \`CronSet\` you must prepare the account with your Hook in two steps:

1. **Install a Hook with the \`hsfCOLLECT\` flag**: This flag indicates the Hook is designed to be invoked automatically by the network's cron system.

2. **Enable TSH Collect on your account** (\`asfTshCollect\`, \`SetFlag: 11\`): Allows the network to execute your Hook via the Transaction Signature Hook Collection mechanism.

\`\`\`javascript
// Enable TSH Collect
const accountSet = {
  TransactionType: "AccountSet",
  Account: wallet.address,
  SetFlag: 11, // asfTshCollect
};
\`\`\`

### CronSet fields

| Field | Type | Required | Description |
|---|---|---|---|
| \`TransactionType\` | String | Yes | \`"CronSet"\` |
| \`Account\` | String | Yes | The account whose Hook will run periodically |
| \`StartTime\` | Number | No | Ripple Epoch of the first trigger. Use \`0\` for immediate execution. Omit when deleting |
| \`RepeatCount\` | Number | No | Number of times the Hook will execute (maximum 256 per transaction). Omit when deleting |
| \`DelaySeconds\` | Number | No | Seconds between each execution. Omit when deleting |

**Important rules**:
- \`DelaySeconds\` and \`RepeatCount\` must both be present, or both absent
- To delete an active cron: omit all scheduling fields and add \`Flags: 1\` (\`tfCronUnset\`)
- You cannot combine \`tfCronUnset\` with scheduling fields

### Time in Ripple Epoch

Xahau uses the **Ripple Epoch** (seconds since January 1, 2000 UTC), not the Unix timestamp:

\`\`\`javascript
// Convert current date to Ripple Epoch
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// Schedule for 1 hour from now
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

Use \`0\` in \`StartTime\` for the cron to start executing from the next valid ledger.

### Limits and restrictions

| Parameter | Limit |
|---|---|
| Maximum \`RepeatCount\` per transaction | 256 |
| Maximum \`DelaySeconds\` | 31,536,000 s (365 days) |
| Maximum \`StartTime\` into the future | 365 days |
| \`StartTime\` in the past | Not allowed (\`tecEXPIRED\`) |

If you need more than 256 repetitions, send another \`CronSet\` before they run out to extend the counter.

### Deleting a CronSet

To cancel an active cron, send \`CronSet\` with \`Flags: 1\`:

\`\`\`javascript
const cronDelete = {
  TransactionType: "CronSet",
  Account: wallet.address,
  Flags: 1, // tfCronUnset — deletes the active cron
};
\`\`\`

### Common errors

| Error | Cause |
|---|---|
| \`temDISABLED\` | The CronSet feature is not enabled on the network |
| \`temMALFORMED\` | Invalid field combination (e.g. only one of \`DelaySeconds\`/\`RepeatCount\`) |
| \`tecEXPIRED\` | \`StartTime\` in the past or more than 365 days into the future |`,
        jp: `\`CronSet\`トランザクションは、外部サービスに依存することなく、Xahauプロトコルから直接、Hookの**自動かつ定期的な実行**をスケジュールできます。これはネットワークのネイティブなcronジョブメカニズムです。

### CronSetとは？

\`CronSet\`を使用すると、XahauにアカウントのフックをX秒ごと、特定の日付から、特定の回数のように定期的に実行するよう指示することができます。すべてがレジャーに記録され、ネットワークが実行を担当します。

定期的な\`Invoke\`パターン（外部サービスがトランザクションを送信する場合）とは異なり、\`CronSet\`は**完全にオンチェーン**であり、常時実行のための外部スクリプトは不要です。

### 前提条件

\`CronSet\`を使用する前に、次の2つのステップでHookを持つアカウントを準備する必要があります。

1. **\`hsfCOLLECT\`フラグ付きのHookをインストール**：このフラグはHookがネットワークのcronシステムによって自動的に呼び出されるように設計されていることを示します。

2. **アカウントでTSH Collectを有効化**（\`asfTshCollect\`、\`SetFlag: 11\`）：ネットワークがHook Collectメカニズムを介してHookを実行できるようにします。

\`\`\`javascript
// TSH Collectを有効化
const accountSet = {
  TransactionType: "AccountSet",
  Account: wallet.address,
  SetFlag: 11, // asfTshCollect
};
\`\`\`

### CronSetのフィールド

| フィールド | タイプ | 必須 | 説明 |
|---|---|---|---|
| \`TransactionType\` | String | Yes | \`"CronSet"\` |
| \`Account\` | String | Yes | Hookが定期的に実行されるアカウント |
| \`StartTime\` | Number | No | 最初のトリガーのRipple Epoch。即時実行には\`0\`を使用。削除時は省略 |
| \`RepeatCount\` | Number | No | Hookが実行される回数（トランザクションあたり最大256回）。削除時は省略 |
| \`DelaySeconds\` | Number | No | 各実行間の秒数。削除時は省略 |

**重要なルール**：
- \`DelaySeconds\`と\`RepeatCount\`は両方存在するか、両方ないかでなければなりません
- アクティブなcronを削除するには：すべてのスケジューリングフィールドを省略して\`Flags: 1\`（\`tfCronUnset\`）を追加
- \`tfCronUnset\`とスケジューリングフィールドを組み合わせることはできません

### Ripple Epochの時刻

XahauはUnixタイムスタンプではなく**Ripple Epoch**（2000年1月1日 UTC からの秒数）を使用します：

\`\`\`javascript
// 現在の日付をRipple Epochに変換
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// 1時間後にスケジュール
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

\`StartTime\`に\`0\`を使用すると、次の有効なレジャーからcronの実行が開始されます。

### 制限と制約

| パラメーター | 制限 |
|---|---|
| トランザクションあたりの最大\`RepeatCount\` | 256 |
| 最大\`DelaySeconds\` | 31,536,000秒（365日） |
| \`StartTime\`の最大未来設定 | 365日 |
| 過去の\`StartTime\` | 不可（\`tecEXPIRED\`） |

256回以上の繰り返しが必要な場合は、カウンターが切れる前に別の\`CronSet\`を送信して延長してください。

### CronSetの削除

アクティブなcronをキャンセルするには、\`Flags: 1\`を付けて\`CronSet\`を送信します：

\`\`\`javascript
const cronDelete = {
  TransactionType: "CronSet",
  Account: wallet.address,
  Flags: 1, // tfCronUnset — アクティブなcronを削除
};
\`\`\`

### よくあるエラー

| エラー | 原因 |
|---|---|
| \`temDISABLED\` | CronSet機能がネットワークで有効になっていない |
| \`temMALFORMED\` | 無効なフィールドの組み合わせ（例：\`DelaySeconds\`/\`RepeatCount\`のどちらか一方のみ） |
| \`tecEXPIRED\` | \`StartTime\`が過去または365日以上先 |`,
        ko: `**CronSet**은 외부 서버 없이도 Hook을 **주기적으로 자동 실행**하도록 예약하는 Xahau의 네이티브 스케줄링 기능입니다.

### 장점

- 완전히 온체인 방식
- 외부 봇이나 cron 서버 의존도 감소
- 시작 시점, 주기, 횟수 같은 조건 설정 가능

### 사전 준비

- \`hsfCOLLECT\` 플래그를 가진 Hook 설치
- 계정에 \`asfTshCollect\` 활성화

자동 실행 기능은 강력하지만, 오작동 시 반복적으로 실행될 수 있으므로 테스트넷에서 충분히 검증한 뒤 사용하는 것이 좋습니다.`,
        zh: `**CronSet** 是 Xahau 的原生调度功能，可以在没有外部服务器的情况下，按周期**自动执行** Hook。

### 优点

- 完全链上执行
- 减少对外部机器人或 cron 服务器的依赖
- 可以设置开始时间、周期和执行次数

### 事前准备

- 安装带有 \`hsfCOLLECT\` 标志的 Hook
- 在账户上启用 \`asfTshCollect\`

自动执行功能很强大，但如果逻辑有误也可能反复运行，所以最好先在测试网充分验证。`,
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

  // Ripple Epoch: segundos desde 01/01/2000 00:00:00 UTC
  const RIPPLE_EPOCH_OFFSET = 946684800;

  const cronSet = {
    TransactionType: "CronSet",
    Account: wallet.address,
    StartTime: 0,       // 0 = comenzar desde el próximo ledger válido
    DelaySeconds: 3600, // Ejecutar cada 1 hora (3600 segundos)
    RepeatCount: 24,    // Ejecutar 24 veces en total (= 24 horas)
  };

  const prepCron = await client.autofill(cronSet);
  const signedCron = wallet.sign(prepCron);
  const resultCron = await client.submitAndWait(signedCron.tx_blob);

  const txResult = resultCron.result.meta.TransactionResult;
  console.log("CronSet resultado:", txResult);
  console.log("Hash:", signedCron.hash);

  if (txResult === "tesSUCCESS") {
    console.log("¡CronSet creado correctamente!");
    console.log("El Hook se ejecutará automáticamente cada 1 hora durante 24 horas.");
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
  // O Hook deve estar instalado com hsfCOLLECT antes de este passo
  console.log("=== Passo 2: Criar CronSet ===");
  // Ripple Epoch: segundos a partir de 01/01/2000 00:00:00 UTC
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const cronSet = {
    TransactionType: "CronSet",
    Account: wallet.address,
    StartTime: 0,       // 0 = comenzar desde o prouximo ledger válido
    DelaySeconds: 3600, // Ejecutar cada 1 hora (3600 segundos)
    RepeatCount: 24,    // Ejecutar 24 vezes em total (= 24 horas)
  };
  const prepCron = await client.autofill(cronSet);
  const signedCron = wallet.sign(prepCron);
  const resultCron = await client.submitAndWait(signedCron.tx_blob);
  const txResult = resultCron.result.meta.TransactionResult;
  console.log("CronSet resultado:", txResult);
  console.log("Hash:", signedCron.hash);
  if (txResult === "tesSUCCESS") {
    console.log("¡CronSet criado corretamente!");
    console.log("O Hook se executará automaticamente cada 1 hora durante 24 horas.");
    console.log("Certifique-se de que o Hook está instalado com ou flag hsfCOLLECT.");
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

  // Ripple Epoch: seconds since 01/01/2000 00:00:00 UTC
  const RIPPLE_EPOCH_OFFSET = 946684800;

  const cronSet = {
    TransactionType: "CronSet",
    Account: wallet.address,
    StartTime: 0,       // 0 = start from the next valid ledger
    DelaySeconds: 3600, // Execute every 1 hour (3600 seconds)
    RepeatCount: 24,    // Execute 24 times in total (= 24 hours)
  };

  const prepCron = await client.autofill(cronSet);
  const signedCron = wallet.sign(prepCron);
  const resultCron = await client.submitAndWait(signedCron.tx_blob);

  const txResult = resultCron.result.meta.TransactionResult;
  console.log("CronSet result:", txResult);
  console.log("Hash:", signedCron.hash);

  if (txResult === "tesSUCCESS") {
    console.log("CronSet created successfully!");
    console.log("The Hook will run automatically every 1 hour for 24 hours.");
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

  // Ripple Epoch: 2000年01月01日00:00:00 UTCからの秒数
  const RIPPLE_EPOCH_OFFSET = 946684800;

  const cronSet = {
    TransactionType: "CronSet",
    Account: wallet.address,
    StartTime: 0,       // 0 = 次の有効なレジャーから開始
    DelaySeconds: 3600, // 1時間ごとに実行（3600秒）
    RepeatCount: 24,    // 合計24回実行（= 24時間）
  };

  const prepCron = await client.autofill(cronSet);
  const signedCron = wallet.sign(prepCron);
  const resultCron = await client.submitAndWait(signedCron.tx_blob);

  const txResult = resultCron.result.meta.TransactionResult;
  console.log("CronSet結果:", txResult);
  console.log("Hash:", signedCron.hash);

  if (txResult === "tesSUCCESS") {
    console.log("CronSetが正常に作成されました！");
    console.log("Hookは24時間、1時間ごとに自動的に実行されます。");
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

  // Ripple Epoch：自 2000/01/01 00:00:00 UTC 起的秒数
  const RIPPLE_EPOCH_OFFSET = 946684800;

  const cronSet = {
    TransactionType: "CronSet",
    Account: wallet.address,
    StartTime: 0,       // 0 = 从下一个有效账本开始
    DelaySeconds: 3600, // 每 1 小时执行一次
    RepeatCount: 24,    // 总共执行 24 次（= 24 小时）
  };

  const prepCron = await client.autofill(cronSet);
  const signedCron = wallet.sign(prepCron);
  const resultCron = await client.submitAndWait(signedCron.tx_blob);

  const txResult = resultCron.result.meta.TransactionResult;
  console.log("CronSet 结果:", txResult);
  console.log("Hash:", signedCron.hash);

  if (txResult === "tesSUCCESS") {
    console.log("CronSet 创建成功！");
    console.log("该 Hook 将在 24 小时内每小时自动执行一次。");
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
    console.log("No existe un CronSet activo para esta cuenta.");
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
  // e añadir Flags: 1 (tfCronUnset)
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
    console.log("CronSet eliminado. O Hook já não se executará automaticamente.");
  } else {
    console.log("Não existe um CronSet ativo para esta conta.");
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
    console.log("No active CronSet found for this account.");
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
    console.log("このアカウントにアクティブなCronSetが見つかりません。");
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
    console.log("此账户没有找到活动中的 CronSet。");
  }

  await client.disconnect();
}

deleteCron();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es CronSet?", pt: "O que é CronSet?", en: "What is CronSet?", jp: "CronSetとは？", zh: "什么是 CronSet？" },
          content: {
            es: "Ejecución periódica de Hooks on-chain\n\n• Sin servicios externos\n• StartTime: cuándo empieza\n• DelaySeconds: cada cuánto\n• RepeatCount: cuántas veces (máx 256)\n\nRequiere Hook con hsfCOLLECT + TSH Collect activo",
            pt: "Execução periódica de Hooks on-chain\n\n• Sem serviços externos\n• StartTime: quando começa\n• DelaySeconds: a cada quanto tempo\n• RepeatCount: quantas vezes (máx 256)\n\nRequer Hook com hsfCOLLECT + TSH Collect ativo",
            en: "Periodic on-chain Hook execution\n\n• No external services\n• StartTime: when it starts\n• DelaySeconds: how often\n• RepeatCount: how many times (max 256)\n\nRequires Hook with hsfCOLLECT + TSH Collect enabled",
            jp: "オンチェーンでのHookの定期実行\n\n• 外部サービス不要\n• StartTime：いつ開始するか\n• DelaySeconds：どのくらいの間隔で\n• RepeatCount：何回（最大256）\n\nhsfCOLLECT付きのHook + TSH Collect有効化が必要",
            zh: "链上周期性执行 Hook\n\n• 不需要外部服务\n• StartTime：何时开始\n• DelaySeconds：间隔多久\n• RepeatCount：执行多少次（最多 256）\n\n需要带 hsfCOLLECT 的 Hook，并启用 TSH Collect",
          },
          visual: "⏱️",
        },
        {
          title: { es: "Configurar CronSet", pt: "Configurar CronSet", en: "Setting up CronSet", jp: "CronSetの設定", zh: "配置 CronSet" },
          content: {
            es: "Pasos:\n1. Instalar Hook con flag hsfCOLLECT\n2. AccountSet SetFlag: 11 (asfTshCollect)\n3. Enviar CronSet con:\n   • StartTime: 0 (inmediato) o Ripple Epoch\n   • DelaySeconds: intervalo en segundos\n   • RepeatCount: nº de ejecuciones\n\nEliminar: CronSet con Flags: 1 (tfCronUnset)",
            pt: "Passos:\n1. Instalar Hook com flag hsfCOLLECT\n2. AccountSet SetFlag: 11 (asfTshCollect)\n3. Enviar CronSet com:\n   • StartTime: 0 (imediato) ou Ripple Epoch\n   • DelaySeconds: intervalo em segundos\n   • RepeatCount: nº de execuções\n\nEliminar: CronSet com Flags: 1 (tfCronUnset)",
            en: "Steps:\n1. Install Hook with hsfCOLLECT flag\n2. AccountSet SetFlag: 11 (asfTshCollect)\n3. Send CronSet with:\n   • StartTime: 0 (immediate) or Ripple Epoch\n   • DelaySeconds: interval in seconds\n   • RepeatCount: number of executions\n\nDelete: CronSet with Flags: 1 (tfCronUnset)",
            jp: "手順：\n1. hsfCOLLECTフラグ付きでHookをインストール\n2. AccountSet SetFlag: 11（asfTshCollect）\n3. CronSetを送信：\n   • StartTime: 0（即時）またはRipple Epoch\n   • DelaySeconds: 秒単位の間隔\n   • RepeatCount: 実行回数\n\n削除：Flags: 1（tfCronUnset）付きのCronSet",
            zh: "步骤：\n1. 安装带 hsfCOLLECT 标志的 Hook\n2. 用 AccountSet 设置 SetFlag: 11（asfTshCollect）\n3. 发送 CronSet，并设置：\n   • StartTime: 0（立即）或 Ripple Epoch\n   • DelaySeconds: 间隔秒数\n   • RepeatCount: 执行次数\n\n删除：发送带 Flags: 1（tfCronUnset）的 CronSet",
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
}
