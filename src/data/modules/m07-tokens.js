import { deriveCodeTranslations } from "../code-i18n.js";
import { addNewWords } from "../glossary.js";
import { addDistributeToken } from "../token-distribution.js";

const moduleData = {
  id: "m6",
  icon: "🪙",
  title: {
    es: "Creación y gestión de tokens propios",
    pt: "Criação e gestão de tokens próprios",
    en: "Creating and managing your own tokens",
    jp: "独自トークンの作成と管理",
    ko: "나만의 토큰 생성 및 관리",
    zh: "创建和管理自定义代币",
  },
  lessons: [
    {
      id: "m6l1",
      title: {
        es: "TrustLines y el modelo de tokens en Xahau",
        pt: "TrustLines e ou modelo de tokens na Xahau",
        en: "TrustLines and the token model in Xahau",
        jp: "トラストラインとXahauのトークンモデル",
        ko: "TrustLine과 Xahau의 토큰 모델",
        zh: "TrustLine 与 Xahau 的代币模型",
      },
      theory: {
        es: `En Xahau, los tokens fungibles funcionan de manera diferente a ERC-20 en Ethereum. No necesitas desplegar un smart contract para crear un token. En su lugar, se usa un sistema basado en **TrustLines** (líneas de confianza).

### ¿Cómo funciona?

1. **Emisor (Issuer)**: Cualquier cuenta puede emitir un token. La cuenta emisora se convierte en el "banco central" de ese token
2. **TrustLine**: Para recibir un token, el receptor debe crear primero una **TrustLine** hacia el emisor. Esto es como decir "confío en esta cuenta hasta X cantidad de este token"
3. **Transferencia**: Una vez que existe la TrustLine, el emisor puede enviar tokens al receptor mediante un Payment

### Identificación de tokens

Cada token se identifica por dos campos:
- **currency**: Código de 3 caracteres (ej: "USD", "EUR") o código hexadecimal de 40 caracteres para nombres largos
- **issuer**: Dirección de la cuenta emisora

Dos tokens con el mismo \`currency\` pero diferente \`issuer\` son **tokens completamente diferentes**.

### TrustLine vs ERC-20

| Característica | ERC-20 (Ethereum) | TrustLine (Xahau) |
|---|---|---|
| Crear token | Desplegar contrato Solidity | Simplemente emitir desde tu cuenta |
| Recibir token | Automático (sin permiso) | Requiere crear TrustLine (opt-in) |
| Límite de cantidad | Definido en el contrato | Definido por el receptor en la TrustLine |
| Transferencia | Función del contrato | Transacción nativa Payment |
| Coste | Gas costoso | Fee mínimo (~12 drops) |

### Reserva de cuenta

Cada TrustLine consume una **reserva de propietario** (owner reserve) de la cuenta. Esto significa que necesitas tener XAH adicional bloqueado por cada TrustLine que crees.

### Configuraciones del emisor al crear un token

Una de las ventajas del sistema de tokens de Xahau es que la cuenta emisora puede configurar diversas propiedades **antes o después** de emitir tokens, usando transacciones \`AccountSet\`. Estas configuraciones definen cómo se comporta el token en la red:

| Configuración | Flag / Campo | Descripción |
|---|---|---|
| **DefaultRipple** | \`SetFlag: 8\` | Permite que el token se transfiera libremente entre terceros. Sin este flag, los tokens solo pueden ir y volver al emisor |
| **TransferFee** | \`TransferRate\` | Cobra un porcentaje en cada transferencia entre terceros (ej: 0.1%). El fee va al emisor |
| **RequireAuth** | \`SetFlag: 2\` | El emisor debe autorizar cada TrustLine antes de que un holder pueda recibir tokens. Ideal para tokens con KYC |
| **Freeze** | \`SetFlag: 7\` (global) | Permite congelar TrustLines individuales o todas a la vez, impidiendo transferencias |
| **NoFreeze** | \`SetFlag: 6\` | Renuncia **permanente** e irreversible a la capacidad de congelar. Señal de confianza |
| **Clawback** | \`SetFlag: 17\` | Permite al emisor recuperar tokens de cualquier holder. Debe activarse **antes** de crear cualquier TrustLine |

**Importante**: Algunas configuraciones son irreversibles (\`NoFreeze\`) y otras deben activarse antes de emitir tokens (\`Clawback\`). Planifica la configuración de tu emisor cuidadosamente antes de comenzar a distribuir tokens.

Veremos cada una de estas configuraciones en detalle en las secciones siguientes del módulo.

### Ejecutar los scripts de esta lección

Los dos scripts forman un par: el primero firma con \`WALLET_SEED\` y confía en ISSUER para USD; el segundo firma con \`ISSUER_SEED\` y emite 100 USD a \`WALLET\`. \`create-accounts.js\` ([módulo 3](?m=3&l=1)) crea las dos cuentas. Salida en testnet: primero el script de emisión solo, luego los dos en orden:

\`\`\`
Result: tecPATH_DRY

Result: tesSUCCESS
TrustLine created successfully!
You can now receive from the issuer at your account rBLuS1gEPkFMvyogRRyPyMQWZPfSMRZCqU

Result: tesSUCCESS
Tokens issued successfully!
\`\`\`

- **\`tecPATH_DRY\`**: la emisión se ejecutó antes de que \`WALLET\` tuviera una TrustLine de USD hacia ISSUER, así que el pago no tenía camino. No se emitió nada.
- **TrustLine \`tesSUCCESS\`**: \`WALLET\` acepta ahora USD de ISSUER, hasta su límite.
- **Emisión \`tesSUCCESS\`**: ISSUER creó 100 USD en la TrustLine de \`WALLET\`. Un emisor nunca tiene su propio token: pagarlo es lo que lo crea.`,
        pt: `Na Xahau, os tokens fungíveis funcionam de maneira diferente dos ERC-20 no Ethereum. Você não precisa fazer deploy de um smart contract para criar um token. Em vez disso, usa-se um sistema baseado em **TrustLines** (linhas de confiança).
### Como funciona?
1. **Emissor (Issuer)**: Qualquer conta pode emitir um token. A conta emissora se torna no "banco central" de esse token
2. **TrustLine**: Para receber um token, o receptor deve criar primeiro uma **TrustLine** para o emissor. Isso é como dizer "confio nesta conta até X quantidade desse token"
3. **Transferencia**: Uma vez que existe a TrustLine, o emissor pode enviar tokens ao receptor por meio de um Payment
### Identificação de tokens
Cada token se identifica por dos campos:
- **currency**: Código de 3 caracteres (ej: "USD", "EUR") ou código hexadecimal de 40 caracteres para nomes largos
- **issuer**: Endereço da conta emissora
Dois tokens com o mesmo \`currency\` mas diferente \`issuer\` são **tokens completamente diferentes**.
### TrustLine vs ERC-20
| Característica | ERC-20 (Ethereum) | TrustLine (Xahau) |
|---|---|---|
| Criar token | Fazer deploy de contrato Solidity | Simplesmente emitir a partir da sua conta |
| Receber token | Automático (sem permissão) | Requer criar TrustLine (opt-in) |
| Limite de quantidade | Definido no contrato | Definido pelo receptor na TrustLine |
| Transferencia | Função do contrato | Transação nativa Payment |
| Custo | Gas caro | Fee mínima (~12 drops) |
### Reserva de conta
Cada TrustLine consome uma **reserva de proprietário** (owner reserve) da conta. Isso significa que você precisa ter XAH adicional bloqueado por cada TrustLine que criar.
### Configurações do emissor ao criar um token
Uma das vantagens do sistema de tokens de Xahau é que a conta emissora pode configurar diversas propriedades **antes ou depois** de emitir tokens, usando transações \`AccountSet\`. Essas configurações definem como se comporta o token na rede:
| Configuração | Flag / Campo | Descrição |
|---|---|---|
| **DefaultRipple** | \`SetFlag: 8\` | Permite que o token se transfira livremente entre terceiros. Sem este flag, os tokens só podem ir e voltar ao emissor |
| **TransferFee** | \`TransferRate\` | Cobra um percentual em cada transferência entre terceiros (ej: 0.1%). O fee vai para o emissor |
| **RequireAuth** | \`SetFlag: 2\` | O emissor deve autorizar cada TrustLine antes que um holder possa receber tokens. Ideal para tokens com KYC |
| **Freeze** | \`SetFlag: 7\` (global) | Permite congelar TrustLines individuais ou todas de uma vez, impedindo transferências |
| **NoFreeze** | \`SetFlag: 6\` | Renúncia **permanente** e irreversível à capacidade de congelar. Sinal de confiança |
| **Clawback** | \`SetFlag: 17\` | Permite ao emissor recuperar tokens de qualquer holder. Deve ser ativado **antes** de criar qualquer TrustLine |
**Importante**: Algumas configurações são irreversíveis (\`NoFreeze\`) e outras devem ser ativadas antes de emitir tokens (\`Clawback\`). Planeje a configuração de seu emissor com cuidado antes de começar a distribuir tokens.
Cada uma dessas configurações é detalhada nas próximas seções do módulo.

### Executar os scripts desta lição

Os dois scripts formam um par: o primeiro assina com \`WALLET_SEED\` e confia no ISSUER para USD; o segundo assina com \`ISSUER_SEED\` e emite 100 USD para a \`WALLET\`. \`create-accounts.js\` ([módulo 3](?m=3&l=1)) cria as duas contas. Saída na testnet: primeiro o script de emissão sozinho, depois os dois em ordem:

\`\`\`
Result: tecPATH_DRY

Result: tesSUCCESS
TrustLine created successfully!
You can now receive from the issuer at your account rBLuS1gEPkFMvyogRRyPyMQWZPfSMRZCqU

Result: tesSUCCESS
Tokens issued successfully!
\`\`\`

- **\`tecPATH_DRY\`**: a emissão rodou antes de a \`WALLET\` ter uma TrustLine de USD para o ISSUER, então o pagamento não tinha caminho. Nada foi emitido.
- **TrustLine \`tesSUCCESS\`**: a \`WALLET\` agora aceita USD do ISSUER, até o limite.
- **Emissão \`tesSUCCESS\`**: o ISSUER criou 100 USD na TrustLine da \`WALLET\`. Um emissor nunca tem o próprio token: pagá-lo é o que o cria.`,
        en: `In Xahau, fungible tokens work differently from ERC-20 on Ethereum. You don't need to deploy a smart contract to create a token. Instead, a system based on **TrustLines** is used.

### How does it work?

1. **Issuer**: Any account can issue a token. The issuing account becomes the "central bank" of that token
2. **TrustLine**: To receive a token, the recipient must first create a **TrustLine** toward the issuer. This is like saying "I trust this account for up to X amount of this token"
3. **Transfer**: Once the TrustLine exists, the issuer can send tokens to the recipient via a Payment

### Token identification

Each token is identified by two fields:
- **currency**: A 3-character code (e.g., "USD", "EUR") or a 40-character hexadecimal code for longer names
- **issuer**: The address of the issuing account

Two tokens with the same \`currency\` but different \`issuer\` are **completely different tokens**.

### TrustLine vs ERC-20

| Feature | ERC-20 (Ethereum) | TrustLine (Xahau) |
|---|---|---|
| Create token | Deploy Solidity contract | Simply issue from your account |
| Receive token | Automatic (permissionless) | Requires creating a TrustLine (opt-in) |
| Amount limit | Defined in the contract | Defined by the recipient in the TrustLine |
| Transfer | Contract function | Native Payment transaction |
| Cost | Expensive gas | Minimal fee (~12 drops) |

### Account reserve

Each TrustLine consumes an **owner reserve** from the account. This means you need to have additional XAH locked for each TrustLine you create.

### Issuer configurations when creating a token

One of the advantages of Xahau's token system is that the issuing account can configure various properties **before or after** issuing tokens, using \`AccountSet\` transactions. These configurations define how the token behaves on the network:

| Configuration | Flag / Field | Description |
|---|---|---|
| **DefaultRipple** | \`SetFlag: 8\` | Allows the token to be freely transferred between third parties. Without this flag, tokens can only go to and from the issuer |
| **TransferFee** | \`TransferRate\` | Charges a percentage on each transfer between third parties (e.g., 0.1%). The fee goes to the issuer |
| **RequireAuth** | \`SetFlag: 2\` | The issuer must authorize each TrustLine before a holder can receive tokens. Ideal for tokens with KYC |
| **Freeze** | \`SetFlag: 7\` (global) | Allows freezing individual TrustLines or all at once, preventing transfers |
| **NoFreeze** | \`SetFlag: 6\` | **Permanent** and irreversible renunciation of the ability to freeze. A signal of trust |
| **Clawback** | \`SetFlag: 17\` | Allows the issuer to recover tokens from any holder. Must be activated **before** creating any TrustLine |

**Important**: Some configurations are irreversible (\`NoFreeze\`) and others must be activated before issuing tokens (\`Clawback\`). Plan your issuer's configuration carefully before you start distributing tokens.

We will cover each of these configurations in detail in the following sections of this module.

### Run this lesson's scripts

The two scripts are a pair: the first signs with \`WALLET_SEED\` and trusts ISSUER for USD; the second signs with \`ISSUER_SEED\` and issues 100 USD to \`WALLET\`. \`create-accounts.js\` ([Module 3](?m=3&l=1)) creates both accounts. Output on testnet: the issue script run first, then both in order:

\`\`\`
Result: tecPATH_DRY

Result: tesSUCCESS
TrustLine created successfully!
You can now receive from the issuer at your account rBLuS1gEPkFMvyogRRyPyMQWZPfSMRZCqU

Result: tesSUCCESS
Tokens issued successfully!
\`\`\`

- **\`tecPATH_DRY\`**: the issue ran before \`WALLET\` had a USD TrustLine to ISSUER, so there was no path for the payment. Nothing was issued.
- **TrustLine \`tesSUCCESS\`**: \`WALLET\` now accepts USD from ISSUER, up to its limit.
- **Issue \`tesSUCCESS\`**: ISSUER created 100 USD in \`WALLET\`'s TrustLine. An issuer never holds its own token: paying it out is what creates it.`,
        jp: `Xahauの(代替可能)トークンは、EthereumのERC-20とは異なる仕組みで動作します。トークンを作成するためにスマートコントラクトをデプロイする必要はありません。代わりに、**TrustLine**（トラストライン）に基づくシステムが使用されます。

### 仕組み

1. **発行者（Issuer）**: どのアカウントもトークンを発行できます。発行アカウントはそのトークンの「中央銀行」となります
2. **トラストライン**: トークンを受け取るには、受取人が先に発行者への**トラストライン**を作成する必要があります。これは「このアカウントをこのトークンのX量まで信頼する」と宣言するようなものです
3. **転送**: トラストラインが存在すれば、発行者はPaymentトランザクションで受取人にトークンを送ることができます

### トークンの識別

各トークンは次の2つのフィールドで識別されます。
- **currency**: 3文字のコード（例："USD"、"EUR"）または長い名前用の40文字の16進数コード
- **issuer**: 発行アカウントのアドレス

同じ\`currency\`でも\`issuer\`が異なれば、それは**まったく別のトークン**です。

### トラストライン vs ERC-20

| 特徴 | ERC-20 (Ethereum) | トラストライン (Xahau) |
|---|---|---|
| トークン作成 | Solidityコントラクトのデプロイ | アカウントから直接発行 |
| トークン受取 | 自動（許可不要） | トラストラインの作成が必要（オプトイン） |
| 数量制限 | コントラクトで定義 | 受取人がトラストラインで定義 |
| 転送 | コントラクト関数 | ネイティブPaymentトランザクション |
| コスト | 高価なガス代 | 最小限のFee（〜12 drops） |

### アカウント準備金

各トラストラインはアカウントの**所有者準備金**を消費します。つまり、作成するトラストラインごとに追加のXAHをロックしておく必要があります。

### トークン作成時の発行者設定

Xahauのトークンシステムの利点の一つは、発行アカウントがトークン発行**前後**に\`AccountSet\`トランザクションを使って様々なプロパティを設定できることです。これらの設定はネットワーク上でのトークンの動作を定義します。

| 設定 | Flag / フィールド | 説明 |
|---|---|---|
| **DefaultRipple** | \`SetFlag: 8\` | 第三者間でトークンを自由に転送できるようにします。このフラグなしでは、トークンは発行者との間でしか移動できません |
| **TransferFee** | \`TransferRate\` | 第三者間の転送ごとに割合（例：0.1%）を徴収します。手数料は発行者に入ります |
| **RequireAuth** | \`SetFlag: 2\` | ホルダーがトークンを受け取れるようにする前に、発行者が各トラストラインを承認する必要があります。KYCを必要とするトークンに最適 |
| **Freeze** | \`SetFlag: 7\`（グローバル） | 個別またはすべてのトラストラインを凍結して転送を防ぐことができます |
| **NoFreeze** | \`SetFlag: 6\` | 凍結能力の**恒久的**かつ取り消し不能な放棄。信頼のシグナル |
| **Clawback** | \`SetFlag: 17\` | 発行者がどのホルダーからもトークンを回収できるようにします。トラストラインを作成する**前**に有効化が必要 |

**重要**: 一部の設定は取り消し不能（\`NoFreeze\`）で、一部はトークン発行前に有効化する必要があります（\`Clawback\`）。トークンの発行を開始する前に、発行者の設定を慎重に計画してください。

これらの設定の詳細は、このモジュールの以降のセクションで説明します。

### このレッスンのスクリプトを実行する

2つのスクリプトは対になっています。1つ目は \`WALLET_SEED\` で署名し、USD について ISSUER を信頼します。2つ目は \`ISSUER_SEED\` で署名し、\`WALLET\` に 100 USD を発行します。両方のアカウントは\`create-accounts.js\`（[モジュール3](?m=3&l=1)）が作成します。テストネットでの出力:まず発行スクリプトだけを実行し、次に2つを順番に実行した結果です。

\`\`\`
Result: tecPATH_DRY

Result: tesSUCCESS
TrustLine created successfully!
You can now receive from the issuer at your account rBLuS1gEPkFMvyogRRyPyMQWZPfSMRZCqU

Result: tesSUCCESS
Tokens issued successfully!
\`\`\`

- **\`tecPATH_DRY\`**: \`WALLET\` が ISSUER への USD の TrustLine を持つ前に発行したため、支払いの経路がありませんでした。何も発行されていません。
- **TrustLine の \`tesSUCCESS\`**: \`WALLET\` は上限まで ISSUER の USD を受け入れるようになりました。
- **発行の \`tesSUCCESS\`**: ISSUER が \`WALLET\` の TrustLine に 100 USD を作成しました。発行者は自分のトークンを保有しません。支払うことがトークンを作ることです。`,
        ko: `Xahau의 발행형 토큰은 Ethereum의 ERC-20과 다르게 동작합니다. 토큰을 받기 전에는 먼저 **TrustLine**을 열어야 하며, 이는 발행자와 수신자 사이의 신뢰 관계를 나타냅니다.

### 핵심 개념

- 토큰은 발행자 계정이 정의합니다
- 수신자는 먼저 \`TrustSet\`으로 TrustLine을 만듭니다
- TrustLine에는 한도, 상태, 플래그가 포함됩니다
- 발행자는 직접 토큰을 “민팅”하기보다 잔액 관계를 생성합니다

Xahau 토큰 모델을 이해하려면 “토큰 컨트랙트”가 아니라 “계정 간 관계”라는 관점이 중요합니다.

### 이 레슨의 스크립트 실행

두 스크립트는 한 쌍입니다. 첫 번째는 \`WALLET_SEED\`로 서명해 USD에 대해 ISSUER를 신뢰하고, 두 번째는 \`ISSUER_SEED\`로 서명해 \`WALLET\`에 100 USD를 발행합니다. 두 계정은 \`create-accounts.js\`([모듈 3](?m=3&l=1))가 만듭니다. 테스트넷 출력: 먼저 발행 스크립트만 실행한 뒤 두 스크립트를 순서대로 실행한 결과입니다.

\`\`\`
Result: tecPATH_DRY

Result: tesSUCCESS
TrustLine created successfully!
You can now receive from the issuer at your account rBLuS1gEPkFMvyogRRyPyMQWZPfSMRZCqU

Result: tesSUCCESS
Tokens issued successfully!
\`\`\`

- **\`tecPATH_DRY\`**: \`WALLET\`에 ISSUER로 향하는 USD TrustLine이 생기기 전에 발행을 실행해서 결제 경로가 없었습니다. 아무것도 발행되지 않았습니다.
- **TrustLine \`tesSUCCESS\`**: 이제 \`WALLET\`은 한도까지 ISSUER의 USD를 받습니다.
- **발행 \`tesSUCCESS\`**: ISSUER가 \`WALLET\`의 TrustLine에 100 USD를 만들었습니다. 발행자는 자기 토큰을 보유하지 않으며, 지불하는 것이 곧 토큰을 만드는 것입니다.`,
        zh: `Xahau 的发行型代币与 Ethereum 的 ERC-20 不同。用户在接收代币之前，必须先建立 **TrustLine**，它表示发行方与接收方之间的信任关系。

### 核心概念

- 代币由发行账户定义
- 接收方先通过 \`TrustSet\` 创建 TrustLine
- TrustLine 包含额度、状态和标志
- 发行方不是直接“铸造”代币，而是建立余额关系

理解 Xahau 的代币模型时，重点不是“代币合约”，而是“账户之间的关系”。

### 运行本课的脚本

这两个脚本是一对：第一个用 \`WALLET_SEED\` 签名，为 USD 信任 ISSUER；第二个用 \`ISSUER_SEED\` 签名，向 \`WALLET\` 发行 100 USD。两个账户都由 \`create-accounts.js\`（[模块3](?m=3&l=1)） 创建。测试网上的输出：先单独运行发行脚本，再按顺序运行两个脚本：

\`\`\`
Result: tecPATH_DRY

Result: tesSUCCESS
TrustLine created successfully!
You can now receive from the issuer at your account rBLuS1gEPkFMvyogRRyPyMQWZPfSMRZCqU

Result: tesSUCCESS
Tokens issued successfully!
\`\`\`

- **\`tecPATH_DRY\`**：发行时 \`WALLET\` 还没有指向 ISSUER 的 USD TrustLine，付款没有路径，什么都没有发行。
- **TrustLine \`tesSUCCESS\`**：\`WALLET\` 现在接受 ISSUER 的 USD，直到其上限。
- **发行 \`tesSUCCESS\`**：ISSUER 在 \`WALLET\` 的 TrustLine 上创建了 100 USD。发行者从不持有自己的代币：付出去的那一刻就是创建它的时候。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear una TrustLine hacia un emisor de tokens",
            pt: "Criar uma TrustLine para um emissor de tokens",
            en: "Create a TrustLine toward a token issuer",
            jp: "トークン発行者へのTrustLineを作成する",
            ko: "토큰 발행자에 대한 TrustLine 생성",
            zh: "为代币发行方创建 TrustLine",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
const { Client, Wallet } = require("xahau");

async function createTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Wallet del receptor (quien quiere recibir el token)
  const receiver = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Crear TrustLine: "confío en el emisor para hasta 1,000,000 USD"
  const trustSet = {
    TransactionType: "TrustSet",
    Account: receiver.address,
    LimitAmount: {
      currency: "USD",
      issuer: Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address,
      value: "1000000", // Límite máximo que acepto
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡TrustLine creada con éxito!");
    console.log("Ahora puedes recibir del emisor desde tu cuenta "+ receiver.address);
  }

  await client.disconnect();
}

createTrustLine();`,
            pt: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
const { Client, Wallet } = require("xahau");
async function criateTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // Wallet do destinatário (quem quer receber o token)
  const receiver = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // Criar TrustLine: "confio no emissor para até 1,000,000 USD"
  const trustSet = {
    TransactionType: "TrustSet",
    Account: receiver.address,
    LimitAmount: {
      currency: "USD",
      issuer: Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address,
      value: "1000000", // Limite máximo que aceito
    },
  };
  const prepared = await client.autofill(trustSet);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("TrustLine criada com sucesso!");
    console.log("Agora você pode receber do emissor na sua conta "+ receiver.address);
  }
  await client.disconnect();
}
criateTrustLine();`,
            en: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
const { Client, Wallet } = require("xahau");

async function createTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Wallet of the recipient (who wants to receive the token)
  const receiver = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Create TrustLine: "I trust the issuer for up to 1,000,000 USD"
  const trustSet = {
    TransactionType: "TrustSet",
    Account: receiver.address,
    LimitAmount: {
      currency: "USD",
      issuer: Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address,
      value: "1000000", // Maximum limit I accept
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("TrustLine created successfully!");
    console.log("You can now receive from the issuer at your account "+ receiver.address);
  }

  await client.disconnect();
}

createTrustLine();`,
            jp: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
const { Client, Wallet } = require("xahau");

async function createTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 受取人のウォレット（トークンを受け取りたい人）
  const receiver = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // TrustLineを作成：「発行者を最大1,000,000まで信頼する」
  const trustSet = {
    TransactionType: "TrustSet",
    Account: receiver.address,
    LimitAmount: {
      currency: "USD",
      issuer: Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address,
      value: "1000000", // 受け入れる最大限度額
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("TrustLineを正常に作成しました！");
    console.log("あなたのアカウント "+ receiver.address + " から発行者のトークンを受け取れるようになりました");
  }

  await client.disconnect();
}

createTrustLine();`,
            ko: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)");
const { Client, Wallet } = require("xahau");

async function createTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 토큰을 받으려는 수신자 지갑
  const receiver = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // TrustLine 생성: "발행자를 최대 1,000,000까지 신뢰"
  const trustSet = {
    TransactionType: "TrustSet",
    Account: receiver.address,
    LimitAmount: {
      currency: "USD",
      issuer: Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address,
      value: "1000000", // 수락할 최대 한도
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("TrustLine이 성공적으로 생성되었습니다!");
    console.log("이제 계정 " + receiver.address + " 로 발행자의 토큰을 받을 수 있습니다");
  }

  await client.disconnect();
}

createTrustLine();`,
            zh: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
const { Client, Wallet } = require("xahau");

async function createTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 想要接收代币的接收者钱包
  const receiver = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 创建 TrustLine: “我最多信任该发行方 1,000,000 单位”
  const trustSet = {
    TransactionType: "TrustSet",
    Account: receiver.address,
    LimitAmount: {
      currency: "USD",
      issuer: Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address,
      value: "1000000", // 我愿意接受的最大额度
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("TrustLine 创建成功！");
    console.log("现在你的账户 " + receiver.address + " 可以接收该发行方的代币了");
  }

  await client.disconnect();
}

createTrustLine();`,
          },
        },
        {
          title: {
            es: "Emitir (enviar) tokens a una cuenta con TrustLine",
            pt: "Emitir (enviar) tokens a uma conta com TrustLine",
            en: "Issue (send) tokens to an account with a TrustLine",
            jp: "TrustLineを持つアカウントへトークンを発行（送信）する",
            ko: "TrustLine이 있는 계정에 토큰 발행(전송)",
            zh: "向已建立 TrustLine 的账户发行代币",
          },
          language: "javascript",
          code: {
            es: `// Falla con tecPATH_DRY hasta que WALLET tenga una TrustLine de USD hacia ISSUER: ejecuta antes el script de la TrustLine
require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
const { Client, Wallet } = require("xahau");

async function issueTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Wallet del emisor del token
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});

  // Enviar 100 USD al receptor (que ya tiene TrustLine)
  const payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address,
    Amount: {
      currency: "USD",
      issuer: issuer.address,
      value: "100", // 100 USD
    },
  };

  const prepared = await client.autofill(payment);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Tokens emitidos con éxito!");
  }

  await client.disconnect();
}

issueTokens();`,
            pt: `// Falha com tecPATH_DRY até que a WALLET tenha uma TrustLine de USD para o ISSUER: execute antes o script da TrustLine
require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
const { Client, Wallet } = require("xahau");
async function issueTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // Wallet do emissor do token
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  // Enviar 100 USD ao receptor (que já tem TrustLine)
  const payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address,
    Amount: {
      currency: "USD",
      issuer: issuer.address,
      value: "100", // 100 USD
    },
  };
  const prepared = await client.autofill(payment);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Tokens emitidos com sucesso!");
  }
  await client.disconnect();
}
issueTokens();`,
            en: `// Fails with tecPATH_DRY until WALLET has a USD TrustLine to ISSUER: run the TrustLine script first
require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
const { Client, Wallet } = require("xahau");

async function issueTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Token issuer wallet
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});

  // Send 100 USD to the recipient (who already has a TrustLine)
  const payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address,
    Amount: {
      currency: "USD",
      issuer: issuer.address,
      value: "100", // 100 USD
    },
  };

  const prepared = await client.autofill(payment);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Tokens issued successfully!");
  }

  await client.disconnect();
}

issueTokens();`,
            jp: `// WALLET が ISSUER への USD の TrustLine を持つまでは tecPATH_DRY で失敗します。先に TrustLine のスクリプトを実行してください
require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
const { Client, Wallet } = require("xahau");

async function issueTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // トークン発行者のウォレット
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});

  // 受取人（すでにTrustLineを持っている）に100 USDを送信
  const payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address,
    Amount: {
      currency: "USD",
      issuer: issuer.address,
      value: "100", // 100 USD
    },
  };

  const prepared = await client.autofill(payment);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("トークンを正常に発行しました！");
  }

  await client.disconnect();
}

issueTokens();`,
            ko: `// WALLET에 ISSUER로 향하는 USD TrustLine이 생기기 전에는 tecPATH_DRY로 실패합니다. 먼저 TrustLine 스크립트를 실행하세요
require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)");
const { Client, Wallet } = require("xahau");

async function issueTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 토큰 발행자 지갑
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});

  // 수신자(이미 TrustLine 보유)에게 100 USD 전송
  const payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address,
    Amount: {
      currency: "USD",
      issuer: issuer.address,
      value: "100", // 100 USD
    },
  };

  const prepared = await client.autofill(payment);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("토큰이 성공적으로 발행되었습니다!");
  }

  await client.disconnect();
}

issueTokens();`,
            zh: `// 在 WALLET 建立指向 ISSUER 的 USD TrustLine 之前，会以 tecPATH_DRY 失败：请先运行 TrustLine 脚本
require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
const { Client, Wallet } = require("xahau");

async function issueTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 代币发行方钱包
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});

  // 向接收方发送 100 USD（对方已拥有 TrustLine）
  const payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address,
    Amount: {
      currency: "USD",
      issuer: issuer.address,
      value: "100", // 100 USD
    },
  };

  const prepared = await client.autofill(payment);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("代币发行成功！");
  }

  await client.disconnect();
}

issueTokens();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Modelo de tokens en Xahau", pt: "Modelo de tokens na Xahau", en: "Token model in Xahau", jp: "Xahauのトークンモデル", ko: "Xahau의 토큰 모델", zh: "Xahau 的代币模型" },
          content: {
            es: "No necesitas smart contracts para crear tokens\n\n1️⃣ Emisor: Cualquier cuenta\n2️⃣ TrustLine: El receptor opta-in\n3️⃣ Payment: Transferencia nativa\n\nTokens = currency + issuer",
            pt: "Você não precisa de smart contracts para criar tokens\n\n1️⃣ Emissor: Qualquer conta\n2️⃣ TrustLine: O receptor opta-in\n3️⃣ Payment: Transferência nativa\n\nTokens = currency + issuer",
            en: "No smart contracts needed to create tokens\n\n1️⃣ Issuer: Any account\n2️⃣ TrustLine: Recipient opts-in\n3️⃣ Payment: Native transfer\n\nTokens = currency + issuer",
            jp: "トークン作成にスマートコントラクト不要\n\n1️⃣ 発行者：どのアカウントでも可\n2️⃣ TrustLine：受取人がオプトイン\n3️⃣ Payment：ネイティブ転送\n\nトークン = currency + issuer",
            ko: "토큰 생성에 스마트 컨트랙트가 필요 없음\n\n1️⃣ 발행자: 어떤 계정이든 가능\n2️⃣ TrustLine: 수신자가 opt-in\n3️⃣ Payment: 네이티브 전송\n\n토큰 = currency + issuer",
            zh: "创建代币不需要智能合约\n\n1️⃣ 发行方：任何账户都可以\n2️⃣ TrustLine：接收方主动选择接收\n3️⃣ Payment：原生转账\n\n代币 = currency + issuer",
          },
          visual: "🪙",
        },
        {
          title: { es: "TrustLine = Opt-in", pt: "TrustLine = Opt-in", en: "TrustLine = Opt-in", jp: "TrustLine = オプトイン", ko: "TrustLine = Opt-in", zh: "TrustLine = 主动加入" },
          content: {
            es: "El receptor ELIGE recibir un token\n\n• Crea una TrustLine hacia el emisor\n• Define el límite máximo\n• Consume reserva de propietario\n• Protege contra spam de tokens",
            pt: "O receptor ESCOLHE receber um token\n\n• Cria uma TrustLine para o emissor\n• Define o limite máximo\n• Consome reserva de proprietário\n• Protege contra spam de tokens",
            en: "The recipient CHOOSES to receive a token\n\n• Creates a TrustLine toward the issuer\n• Defines the maximum limit\n• Consumes owner reserve\n• Protects against token spam",
            jp: "受取人がトークンを受け取ることを選択する\n\n• 発行者へのTrustLineを作成\n• 最大限度額を定義\n• オーナーリザーブを消費\n• トークンスパムから保護",
            ko: "수신자가 토큰 수령을 직접 선택함\n\n• 발행자에 대한 TrustLine 생성\n• 최대 한도 정의\n• owner reserve 소비\n• 토큰 스팸 방지",
            zh: "接收方主动选择是否接收代币\n\n• 向发行方创建 TrustLine\n• 定义最大信任额度\n• 会占用 owner reserve\n• 防止代币垃圾信息",
          },
          visual: "🤝",
        },
        {
          title: { es: "Sistema de reservas", pt: "Sistema de reservas", en: "Reserve system", jp: "リザーブシステム", ko: "Reserve 시스템", zh: "储备机制" },
          content: {
            es: "Cada TrustLine aumenta la reserva de la cuenta\n\n• Reserva base + reserva por objeto\n• Más TrustLines = más XAH bloqueado\n• Los usuarios deben planificar sus TrustLines\n• Eliminar TrustLine (balance 0) libera reserva\n• Impacto directo en el XAH disponible",
            pt: "Cada TrustLine aumenta a reserva da conta\n\n• Reserva base + reserva por objeto\n• Mais TrustLines = mais XAH bloqueado\n• Os usuários devem planejar suas TrustLines\n• Remover TrustLine (saldo 0) libera reserva\n• Impacto direto no XAH disponível",
            en: "Each TrustLine increases the account reserve\n\n• Base reserve + per-object reserve\n• More TrustLines = more XAH locked\n• Users must plan their TrustLines\n• Removing a TrustLine (balance 0) frees reserve\n• Direct impact on available XAH",
            jp: "各TrustLineはアカウントリザーブを増やします\n\n• ベースリザーブ＋オブジェクトごとのリザーブ\n• TrustLineが多いほどXAHがロックされる\n• ユーザーはTrustLineを計画的に\n• TrustLine削除（残高0）でリザーブが解放\n• 利用可能XAHへの直接影響",
            ko: "각 TrustLine은 계정 reserve를 증가시킴\n\n• 기본 reserve + 객체당 reserve\n• TrustLine이 많을수록 더 많은 XAH가 잠김\n• 사용자는 TrustLine을 계획적으로 만들어야 함\n• TrustLine 제거(잔액 0) 시 reserve 해제\n• 사용 가능한 XAH에 직접 영향",
            zh: "每条 TrustLine 都会增加账户储备\n\n• 基础储备 + 每个对象的额外储备\n• TrustLine 越多，锁定的 XAH 越多\n• 用户应规划好自己的 TrustLine\n• 删除 TrustLine（余额为 0）可释放储备\n• 会直接影响可用的 XAH",
          },
          visual: "💎",
        },
      ],
    },
    {
      id: "m6l1b",
      title: {
        es: "Proceso completo: crear y distribuir tu propio token",
        pt: "Processo completo: criar e distribuir seu próprio token",
        en: "Complete process: create and distribute your own token",
        jp: "完全なプロセス：独自トークンの作成と配布",
        ko: "전체 과정: 나만의 토큰 생성 및 배포",
        zh: "完整流程：创建并分发你的代币",
      },
      theory: {
        es: `Ahora que entiendes cómo funcionan las TrustLines, vamos a ver el proceso completo para crear tu propio token y distribuirlo. A diferencia de otras blockchains, en Xahau **no necesitas desplegar ningún contrato**. El proceso se realiza enteramente con transacciones nativas.

### Visión general del proceso

El flujo completo para crear y distribuir un token es:

1. **Preparar la cuenta emisora**: Crear (o usar) una cuenta dedicada exclusivamente a emitir el token
2. **Configurar flags del emisor**: Activar \`DefaultRipple\` para que el token sea transferible entre terceros
3. **Preparar la cuenta de reserva/distribución**: Crear (o usar) una segunda cuenta que recibirá el supply inicial y desde la cual se distribuirán los tokens
4. **Crear TrustLine desde la cuenta de reserva**: La cuenta de distribución crea una TrustLine hacia el emisor
5. **Emitir los tokens**: El emisor envía el supply total a la cuenta de reserva mediante un Payment
6. **Distribuir**: Desde la cuenta de reserva se distribuyen los tokens a los usuarios finales (que previamente deben tener TrustLine)

### ¿Por qué usar dos cuentas separadas?

Es una buena práctica separar la **cuenta emisora** de la **cuenta de distribución**:

- **Cuenta emisora**: Solo se usa para emitir y para configurar el token (freeze, clawback, etc.). Se puede proteger con multi-signing o desactivar la clave maestra una vez configurada
- **Cuenta de distribución/reserva**: Tiene el supply circulante y se usa para operar día a día (vender en el DEX, distribuir a usuarios, etc.)

Esta separación reduce el riesgo: si la cuenta de distribución se ve comprometida, el emisor puede congelar los tokens. Si todo estuviera en una sola cuenta, una brecha comprometería tanto la emisión como la distribución.

### Código de moneda: 3 caracteres vs hex

- Tokens con nombre de **3 caracteres** (ej: \`USD\`, \`EUR\`, \`EKI\`) se usan directamente
- Tokens con nombre **más largo** (ej: \`EURZ\`, \`MyToken\`) deben convertirse a un código hexadecimal de 40 caracteres

\`\`\`
// Función para convertir nombre largo a hex de 40 chars
function currencyToHex(name) {
  const hex = Buffer.from(name, "ascii").toString("hex").toUpperCase();
  return hex.padEnd(40, "0");
}

console.log(currencyToHex("EURZ"));

// "EURZ" → "4555525A00000000000000000000000000000000"
\`\`\`

### Resumen de transacciones necesarias

| Paso | Transacción | Cuenta que ejecuta |
|---|---|---|
| Configurar emisor | \`AccountSet\` (SetFlag: 8) | Emisor |
| Crear TrustLine | \`TrustSet\` | Cuenta de reserva |
| Emitir supply | \`Payment\` (Amount como IOU) | Emisor |
| Distribuir | \`Payment\` (Amount como IOU) | Cuenta de reserva |`,
        pt: `Agora que você entende como funcionam as TrustLines, vamos ver o processo completo para criar seu próprio token e distribuí-lo. Diferentemente de outras blockchains, na Xahau **você não precisa fazer deploy nenhum contrato**. O processo é realizado inteiramente com transações nativas.
### Visão geral do processo
O fluxo completo para criar e distribuir um token é:
1. **Preparar a conta emissora**: Criar (ou usar) uma conta dedicada exclusivamente a emitir o token
2. **Configurar flags do emissor**: Ativar \`DefaultRipple\` para que o token seja transferível entre terceiros
3. **Preparar a conta de reserva/distribuição**: Criar (ou usar) uma segunda conta que receberá o supply inicial e a partir da qual serão distribuídos os tokens
4. **Criar TrustLine desde a conta de reserva**: A conta de distribuição cria uma TrustLine para o emissor
5. **Emitir os tokens**: O emissor envíao supply total à conta de reserva por meio de um Payment
6. **Distribuir**: a partir da conta de reserva, os tokens são distribuídos aos usuários finais (que antes precisam ter uma TrustLine)
### Por que usar dois contas separadas?
É uma boa prática separar a **conta emissora** da **conta de distribuição**:
- **Conta emissora**: Só é usada para emitir e para configurar o token (freeze, clawback, etc.). Se pode proteger com multi-signing ou desativar a chave mestra uma vez configurada
- **Conta de distribuição/reserva**: Mantém o supply circulante e é usada para operar no dia a dia (vender no DEX, distribuir a usuários, etc.)
Esta separação reduz o risco: se a conta de distribuição for comprometida, o emissor pode congelar os tokens. Se tudo estivesse em uma única conta, uma falha comprometeria tanto a emissão como a distribuição.
### Código de moeda: 3 caracteres vs hex
- Tokens com nome de **3 caracteres** (ej: \`USD\`, \`EUR\`, \`EKI\`) se usam diretamente
- Tokens com nome **mais longo** (ex.: \`EURZ\`, \`MyToken\`) devem ser convertidos em um código hexadecimal de 40 caracteres
\`\`\`
// Função para converter nome largo a hex de 40 chars
function currencyToHex(name) {
  const hex = Buffer.from(name, "ascii").toString("hex").toUpperCase();
  return hex.padEnd(40, "0");
}
console.log(currencyToHex("EURZ"));
// "EURZ" → "4555525A00000000000000000000000000000000"
\`\`\`
### Resumo de transações necessárias
| Paso | Transação | Conta que executa |
|---|---|---|
| Configurar emissor | \`AccountSet\` (SetFlag: 8) | Emissor |
| Criar TrustLine | \`TrustSet\` | Conta de reserva |
| Emitir supply | \`Payment\` (Amount como IOU) | Emissor |
| Distribuir | \`Payment\` (Amount como IOU) | Conta de reserva |`,
        en: `Now that you understand how TrustLines work, let's look at the complete process for creating your own token and distributing it. Unlike other blockchains, in Xahau **you don't need to deploy any contract**. The process is done entirely with native transactions.

### Process overview

The complete flow to create and distribute a token is:

1. **Prepare the issuing account**: Create (or use) an account dedicated exclusively to issuing the token
2. **Configure issuer flags**: Activate \`DefaultRipple\` so the token is transferable between third parties
3. **Prepare the reserve/distribution account**: Create (or use) a second account that will receive the initial supply and from which tokens will be distributed
4. **Create TrustLine from the reserve account**: The distribution account creates a TrustLine toward the issuer
5. **Issue the tokens**: The issuer sends the total supply to the reserve account via a Payment
6. **Distribute**: From the reserve account, tokens are distributed to end users (who must have a TrustLine beforehand)

### Why use two separate accounts?

It is a best practice to separate the **issuing account** from the **distribution account**:

- **Issuing account**: Only used to issue and configure the token (freeze, clawback, etc.). It can be protected with multi-signing or by disabling the master key once configured
- **Distribution/reserve account**: Holds the circulating supply and is used for day-to-day operations (selling on the DEX, distributing to users, etc.)

This separation reduces risk: if the distribution account is compromised, the issuer can freeze the tokens. If everything were in a single account, a breach would compromise both issuance and distribution.

### Currency code: 3 characters vs hex

- Tokens with a **3-character** name (e.g., \`USD\`, \`EUR\`, \`EKI\`) are used directly
- Tokens with a **longer** name (e.g., \`EURZ\`, \`MyToken\`) must be converted to a 40-character hexadecimal code

\`\`\`
// Function to convert a long name to 40-char hex
function currencyToHex(name) {
  const hex = Buffer.from(name, "ascii").toString("hex").toUpperCase();
  return hex.padEnd(40, "0");
}

console.log(currencyToHex("EURZ"));

// "EURZ" -> "4555525A00000000000000000000000000000000"
\`\`\`

### Summary of required transactions

| Step | Transaction | Executing account |
|---|---|---|
| Configure issuer | \`AccountSet\` (SetFlag: 8) | Issuer |
| Create TrustLine | \`TrustSet\` | Reserve account |
| Issue supply | \`Payment\` (Amount as IOU) | Issuer |
| Distribute | \`Payment\` (Amount as IOU) | Reserve account |`,
        jp: `トラストラインの仕組みを理解したところで、独自トークンを作成して配布するための完全なプロセスを見ていきましょう。他のブロックチェーンとは異なり、Xahauでは**コントラクトをデプロイする必要はありません**。プロセスはすべてネイティブトランザクションで行われます。

### プロセスの概要

トークンを作成して配布するための完全なフローは以下の通りです：

1. **発行アカウントの準備**: トークン発行専用のアカウントを作成（または使用）する
2. **発行者フラグの設定**: 第三者間でトークンが転送できるよう\`DefaultRipple\`を有効化する
3. **リザーブ/配布アカウントの準備**: 初期サプライを受け取り、トークンを配布するための2つ目のアカウントを作成（または使用）する
4. **リザーブアカウントからトラストラインを作成**: 配布アカウントが発行者へのトラストラインを作成する
5. **トークンの発行**: 発行者がPaymentトランザクションでリザーブアカウントに全供給量を送信する
6. **配布**: リザーブアカウントからエンドユーザーにトークンを配布する（ユーザーはあらかじめトラストラインを持っている必要がある）

### なぜ2つのアカウントを分けるのか？

**発行アカウント**と**配布アカウント**を分けることはベストプラクティスとして推奨されています。

- **発行アカウント**: トークンの発行と設定（freeze、clawbackなど）にのみ使用。マルチサインで保護したり、設定完了後にマスターキーを無効化することができる
- **配布/リザーブアカウント**: 流通供給量を保持し、日常業務（DEXでの販売、ユーザーへの配布など）に使用する

この分離によりリスクが低減されます。配布アカウントが侵害された場合、発行者がトークンを凍結できます。すべてが1つのアカウントにある場合、侵害により発行と配布の両方が危険にさらされます。

### 通貨コード：3文字 vs 16進数

- **3文字**の名前のトークン（例：\`USD\`、\`EUR\`、\`EKI\`）はそのまま使用できる
- **より長い**名前のトークン（例：\`EURZ\`、\`MyToken\`）は40文字の16進数コードに変換する必要がある

\`\`\`
// 長い名前を40文字の16進数に変換する関数
function currencyToHex(name) {
  const hex = Buffer.from(name, "ascii").toString("hex").toUpperCase();
  return hex.padEnd(40, "0");
}

console.log(currencyToHex("EURZ"));

// "EURZ" -> "4555525A00000000000000000000000000000000"
\`\`\`

### 必要なトランザクションのまとめ

| ステップ | トランザクション | 実行アカウント |
|---|---|---|
| 発行者を設定 | \`AccountSet\` (SetFlag: 8) | 発行者 |
| トラストラインを作成 | \`TrustSet\` | リザーブアカウント |
| 供給量を発行 | \`Payment\`（IOUとしてAmount） | 発行者 |
| 配布 | \`Payment\`（IOUとしてAmount） | リザーブアカウント |`,
        ko: `자신의 토큰을 만들고 배포하려면 몇 단계가 필요합니다. 단순히 발행만 하는 것이 아니라 계정 설정과 수신자 준비까지 포함됩니다.

### 일반적인 흐름

1. 발행자 계정과 운영 계정을 준비
2. 필요 플래그 설정 (\`DefaultRipple\`, \`RequireAuth\` 등)
3. 수신자가 TrustLine 생성
4. 발행자가 토큰 지급
5. 익스플로러나 \`account_lines\`로 상태 확인

### 왜 두 개의 계정을 쓰기도 하나요?

발행자와 운영 계정을 분리하면 보안과 운영 관리가 쉬워집니다. 실무에서는 발행 계정을 더 엄격하게 보호하는 경우가 많습니다.`,
        zh: `要创建并分发自己的代币，通常需要几个步骤。它不只是“发行代币”，还包括账户配置与接收方准备。

### 常见流程

1. 准备发行账户和运营账户
2. 设置必要标志（如 \`DefaultRipple\`、\`RequireAuth\`）
3. 接收方创建 TrustLine
4. 发行方向外发送代币
5. 用区块浏览器或 \`account_lines\` 检查状态

### 为什么经常使用两个账户？

把发行账户和运营账户分开，能让安全和日常运营更容易管理。实际项目里，发行账户通常会受到更严格的保护。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Proceso completo: configurar emisor, crear TrustLine, emitir y distribuir token",
            pt: "Processo completo: configurar o emissor, criar a TrustLine, emitir e distribuir o token",
            en: "Complete process: configure issuer, create TrustLine, issue and distribute token",
            jp: "完全なプロセス：発行者の設定、トラストラインの作成、トークンの発行と配布",
            ko: "전체 과정: 발행자 설정, TrustLine 생성, 토큰 발행 및 배포",
            zh: "完整流程：配置发行方、创建 TrustLine、发行并分发代币",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
const { Client, Wallet, xahToDrops } = require("xahau");

// Necesitas dos wallets con fondos en testnet y definelas en tu .env:
//   ISSUER_SEED  → Cuenta emisora del token
//   RESERVE_SEED  → Cuenta de reserva/distribución
// create-accounts.js (módulo 3, lección 2) crea las dos.

// Si token_currency > 3 chars, convertir a hex de 40 (relleno con 0)
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3 o menos: standard currency code
  if (cur.length <= 3) return cur;

  // >3: convertir a hex y pad a 40 (20 bytes) con 0 a la derecha
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency demasiado largo: "\${cur}" -> hex \${hex.length} (>40). Máx ~20 bytes en UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createAndDistributeToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // === CUENTAS ===
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const reserve = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  const TOKEN_CURRENCY_INPUT = "YourTokenName";          // Nombre del token (3 chars) o hex de 40 chars para nombres largos
  const TOTAL_SUPPLY = "1000000";        // Supply total a emitir
  
  const TOKEN_CURRENCY = normalizeCurrency(TOKEN_CURRENCY_INPUT);


  console.log("=== Creación de token ===");
  console.log("Emisor:", issuer.address);
  console.log("Reserva:", reserve.address);
  console.log("Token:", TOKEN_CURRENCY);
  console.log("Supply:", TOTAL_SUPPLY);

  // === PASO 1: Configurar la cuenta emisora con DefaultRipple ===
  console.log("--- Paso 1: Configurar DefaultRipple en el emisor ---");
  const accountSet = {
    TransactionType: "AccountSet",
    Account: issuer.address,
    SetFlag: 8, // asfDefaultRipple
  };

  const prep1 = await client.autofill(accountSet);
  const signed1 = issuer.sign(prep1);
  const result1 = await client.submitAndWait(signed1.tx_blob);
  console.log("DefaultRipple:", result1.result.meta.TransactionResult);

  if (result1.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error configurando el emisor. Abortando.");
    await client.disconnect();
    return;
  }

  // === PASO 2: La cuenta de reserva crea TrustLine hacia el emisor ===
  console.log("--- Paso 2: Crear TrustLine (reserva → emisor) ---");
  const trustSet = {
    TransactionType: "TrustSet",
    Account: reserve.address,
    LimitAmount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY, // Aceptar hasta el supply total
    },
  };

  const prep2 = await client.autofill(trustSet);
  const signed2 = reserve.sign(prep2);
  const result2 = await client.submitAndWait(signed2.tx_blob);
  console.log("TrustLine:", result2.result.meta.TransactionResult);

  if (result2.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error creando TrustLine. Abortando.");
    await client.disconnect();
    return;
  }

  // === PASO 3: El emisor envía todo el supply a la cuenta de reserva ===
  console.log("--- Paso 3: Emitir tokens (emisor → reserva) ---");
  const issuePayment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: reserve.address,
    Amount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY,
    },
  };

  const prep3 = await client.autofill(issuePayment);
  const signed3 = issuer.sign(prep3);
  const result3 = await client.submitAndWait(signed3.tx_blob);
  console.log("Emisión:", result3.result.meta.TransactionResult);

  if (result3.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error emitiendo tokens. Abortando.");
    await client.disconnect();
    return;
  }

  console.log("¡Token creado y distribuido a la cuenta de reserva!");
  console.log("Supply total:", TOTAL_SUPPLY, TOKEN_CURRENCY);

  // === VERIFICAR: Consultar balance de la cuenta de reserva ===
  console.log("--- Verificación ---");
  const lines = await client.request({
    command: "account_lines",
    account: reserve.address,
    ledger_index: "validated",
  });

  const tokenLine = lines.result.lines.find(
    (l) => l.currency === TOKEN_CURRENCY && l.account === issuer.address
  );

  if (tokenLine) {
    console.log("Balance de reserva:", tokenLine.balance, TOKEN_CURRENCY);
    console.log("Emisor:", tokenLine.account);
    console.log("Límite:", tokenLine.limit, TOKEN_CURRENCY);
  }

  // Siguiente paso: distribute-token.js envía parte del supply a un holder.

  await client.disconnect();
}

createAndDistributeToken();`,
            pt: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
const { Client, Wallet, xahToDrops } = require("xahau");
// Você precisa de duas wallets com fundos na testnet, definidas no seu .env:
//   ISSUER_SEED  → Conta emissora do token
//   RESERVE_SEED  → Conta de reserva/distribuição
// create-accounts.js (módulo 3, lição 2) cria as duas.
// Se token_currency > 3 caracteres, converter para hex de 40 (preenchido com 0)
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;
  const cur = token_currency.trim();
  // 3 ou menos: standard currency code
  if (cur.length <= 3) return cur;
  // >3: converter a hex e pad a 40 (20 bytes) com 0 à direita
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();
  if (hex.length > 40) {
    throw new Error(
      \`token_currency demasiado largo: "\${cur}" -> hex \${hex.length} (>40). Máx ~20 bytes em UTF-8.\`
    );
  }
  return hex.padEnd(40, "0");
}
async function criateAndDistributeToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // === CONTAS ===
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const reserve = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});
  const TOKEN_CURRENCY_INPUT = "YourTokenName";          // Nome do token (3 caracteres) ou hex de 40 caracteres para nomes longos
  const TOTAL_SUPPLY = "1000000";        // Supply total a emitir
  const TOKEN_CURRENCY = normalizeCurrency(TOKEN_CURRENCY_INPUT);
  console.log("=== Criação do token ===");
  console.log("Emissor:", issuer.address);
  console.log("Reserva:", reserve.address);
  console.log("Token:", TOKEN_CURRENCY);
  console.log("Supply:", TOTAL_SUPPLY);
  // === PASSO 1: Configurar a conta emissora com DefaultRipple ===
  console.log("--- Passo 1: Configurar DefaultRipple no emissor ---");
  const accountSet = {
    TransactionType: "AccountSet",
    Account: issuer.address,
    SetFlag: 8, // asfDefaultRipple
  };
  const prep1 = await client.autofill(accountSet);
  const signed1 = issuer.sign(prep1);
  const result1 = await client.submitAndWait(signed1.tx_blob);
  console.log("DefaultRipple:", result1.result.meta.TransactionResult);
  if (result1.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Erro configurando o emissor. Abortando.");
    await client.disconnect();
    return;
  }
  // === PASSO 2: A conta de reserva cria TrustLine para o emissor ===
  console.log("--- Passo 2: Criar TrustLine (reserva → emissor) ---");
  const trustSet = {
    TransactionType: "TrustSet",
    Account: reserve.address,
    LimitAmount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY, // Aceitar até o supply total
    },
  };
  const prep2 = await client.autofill(trustSet);
  const signed2 = reserve.sign(prep2);
  const result2 = await client.submitAndWait(signed2.tx_blob);
  console.log("TrustLine:", result2.result.meta.TransactionResult);
  if (result2.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Erro criando TrustLine. Abortando.");
    await client.disconnect();
    return;
  }
  // === PASSO 3: O emissor envia todo ou supply à conta de reserva ===
  console.log("--- Passo 3: Emitir tokens (emissor → reserva) ---");
  const issuePayment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: reserve.address,
    Amount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY,
    },
  };
  const prep3 = await client.autofill(issuePayment);
  const signed3 = issuer.sign(prep3);
  const result3 = await client.submitAndWait(signed3.tx_blob);
  console.log("Emissão:", result3.result.meta.TransactionResult);
  if (result3.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Erro emitiendo tokens. Abortando.");
    await client.disconnect();
    return;
  }
  console.log("Token criado e distribuído para a conta de reserva!");
  console.log("Supply total:", TOTAL_SUPPLY, TOKEN_CURRENCY);
  // === VERIFICAR: Consultar saldo da conta de reserva ===
  console.log("--- Verificação ---");
  const lines = await client.request({
    command: "account_lines",
    account: reserve.address,
    ledger_index: "validated",
  });
  const tokenLine = lines.result.lines.find(
    (l) => l.currency === TOKEN_CURRENCY && l.account === issuer.address
  );
  if (tokenLine) {
    console.log("Saldo de reserva:", tokenLine.balance, TOKEN_CURRENCY);
    console.log("Emissor:", tokenLine.account);
    console.log("Límite:", tokenLine.limit, TOKEN_CURRENCY);
  }
  // === PASSO 4 (exemplo): Distribuir tokens a um usuário final ===
  // O usuário final deve criar primeiro sua TrustLine para o emissor
  // Depois, a conta de reserva envia os tokens a ele:
  //
  // const distribution = {
  //   TransactionType: "Payment",
  //   Account: reserve.address,
  //   Destination: "rDireccionDelUsuarioFinal",
  //   Amount: {
  //     currency: TOKEN_CURRENCY,
  //     issuer: issuer.address,
  //     value: "100",
  //   },
  // };
  await client.disconnect();
}
criateAndDistributeToken();`,
            en: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
const { Client, Wallet, xahToDrops } = require("xahau");

// You need two wallets with funds on testnet, define them in your .env:
//   ISSUER_SEED  → Token issuer account
//   RESERVE_SEED  → Reserve/distribution account
// create-accounts.js (Module 3, lesson 2) creates both.

// If token_currency > 3 chars, convert to 40 hex (padded with 0)
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3 or less: standard currency code
  if (cur.length <= 3) return cur;

  // >3: convert to hex and pad to 40 (20 bytes) with 0 on the right
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). Max ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createAndDistributeToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // === ACCOUNTS ===
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const reserve = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  const TOKEN_CURRENCY_INPUT = "YourTokenName";          // Token name (3 chars) or 40-char hex for longer names
  const TOTAL_SUPPLY = "1000000";        // Total supply to issue

  const TOKEN_CURRENCY = normalizeCurrency(TOKEN_CURRENCY_INPUT);


  console.log("=== Token creation ===");
  console.log("Issuer:", issuer.address);
  console.log("Reserve:", reserve.address);
  console.log("Token:", TOKEN_CURRENCY);
  console.log("Supply:", TOTAL_SUPPLY);

  // === STEP 1: Configure the issuer account with DefaultRipple ===
  console.log("--- Step 1: Configure DefaultRipple on the issuer ---");
  const accountSet = {
    TransactionType: "AccountSet",
    Account: issuer.address,
    SetFlag: 8, // asfDefaultRipple
  };

  const prep1 = await client.autofill(accountSet);
  const signed1 = issuer.sign(prep1);
  const result1 = await client.submitAndWait(signed1.tx_blob);
  console.log("DefaultRipple:", result1.result.meta.TransactionResult);

  if (result1.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error configuring the issuer. Aborting.");
    await client.disconnect();
    return;
  }

  // === STEP 2: The reserve account creates a TrustLine toward the issuer ===
  console.log("--- Step 2: Create TrustLine (reserve → issuer) ---");
  const trustSet = {
    TransactionType: "TrustSet",
    Account: reserve.address,
    LimitAmount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY, // Accept up to the total supply
    },
  };

  const prep2 = await client.autofill(trustSet);
  const signed2 = reserve.sign(prep2);
  const result2 = await client.submitAndWait(signed2.tx_blob);
  console.log("TrustLine:", result2.result.meta.TransactionResult);

  if (result2.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error creating TrustLine. Aborting.");
    await client.disconnect();
    return;
  }

  // === STEP 3: The issuer sends the entire supply to the reserve account ===
  console.log("--- Step 3: Issue tokens (issuer → reserve) ---");
  const issuePayment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: reserve.address,
    Amount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY,
    },
  };

  const prep3 = await client.autofill(issuePayment);
  const signed3 = issuer.sign(prep3);
  const result3 = await client.submitAndWait(signed3.tx_blob);
  console.log("Issuance:", result3.result.meta.TransactionResult);

  if (result3.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error issuing tokens. Aborting.");
    await client.disconnect();
    return;
  }

  console.log("Token created and distributed to the reserve account!");
  console.log("Total supply:", TOTAL_SUPPLY, TOKEN_CURRENCY);

  // === VERIFY: Query reserve account balance ===
  console.log("--- Verification ---");
  const lines = await client.request({
    command: "account_lines",
    account: reserve.address,
    ledger_index: "validated",
  });

  const tokenLine = lines.result.lines.find(
    (l) => l.currency === TOKEN_CURRENCY && l.account === issuer.address
  );

  if (tokenLine) {
    console.log("Reserve balance:", tokenLine.balance, TOKEN_CURRENCY);
    console.log("Issuer:", tokenLine.account);
    console.log("Limit:", tokenLine.limit, TOKEN_CURRENCY);
  }

  // Next: distribute-token.js sends part of the supply to a holder.

  await client.disconnect();
}

createAndDistributeToken();`,
            jp: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
const { Client, Wallet, xahToDrops } = require("xahau");

// テストネットで資金のある2つのウォレットが必要です。.envに定義してください：
//   ISSUER_SEED  → トークン発行者アカウント
//   RESERVE_SEED  → リザーブ/配布アカウント
// create-accounts.js（モジュール3・レッスン2）が両方を作成します。

// token_currencyが3文字超の場合、40文字のhex（右側0埋め）に変換
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3文字以下：標準通貨コード
  if (cur.length <= 3) return cur;

  // 3文字超：hexに変換して40文字（20バイト）に右側0埋め
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currencyが長すぎます: "\${cur}" -> hex \${hex.length} (>40). 最大〜20バイト（UTF-8）.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createAndDistributeToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // === アカウント ===
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const reserve = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  const TOKEN_CURRENCY_INPUT = "YourTokenName";          // トークン名（3文字）または長い名前用の40文字hex
  const TOTAL_SUPPLY = "1000000";        // 発行する総供給量

  const TOKEN_CURRENCY = normalizeCurrency(TOKEN_CURRENCY_INPUT);


  console.log("=== トークン作成 ===");
  console.log("発行者:", issuer.address);
  console.log("リザーブ:", reserve.address);
  console.log("トークン:", TOKEN_CURRENCY);
  console.log("供給量:", TOTAL_SUPPLY);

  // === ステップ1：発行者アカウントにDefaultRippleを設定 ===
  console.log("--- ステップ1：発行者にDefaultRippleを設定 ---");
  const accountSet = {
    TransactionType: "AccountSet",
    Account: issuer.address,
    SetFlag: 8, // asfDefaultRipple
  };

  const prep1 = await client.autofill(accountSet);
  const signed1 = issuer.sign(prep1);
  const result1 = await client.submitAndWait(signed1.tx_blob);
  console.log("DefaultRipple:", result1.result.meta.TransactionResult);

  if (result1.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("発行者の設定エラー。中止します。");
    await client.disconnect();
    return;
  }

  // === ステップ2：リザーブアカウントが発行者へTrustLineを作成 ===
  console.log("--- ステップ2：TrustLineを作成（リザーブ → 発行者）---");
  const trustSet = {
    TransactionType: "TrustSet",
    Account: reserve.address,
    LimitAmount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY, // 総供給量まで受け入れる
    },
  };

  const prep2 = await client.autofill(trustSet);
  const signed2 = reserve.sign(prep2);
  const result2 = await client.submitAndWait(signed2.tx_blob);
  console.log("TrustLine:", result2.result.meta.TransactionResult);

  if (result2.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("TrustLine作成エラー。中止します。");
    await client.disconnect();
    return;
  }

  // === ステップ3：発行者がリザーブアカウントに全サプライを送信 ===
  console.log("--- ステップ3：トークンを発行（発行者 → リザーブ）---");
  const issuePayment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: reserve.address,
    Amount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY,
    },
  };

  const prep3 = await client.autofill(issuePayment);
  const signed3 = issuer.sign(prep3);
  const result3 = await client.submitAndWait(signed3.tx_blob);
  console.log("発行:", result3.result.meta.TransactionResult);

  if (result3.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("トークン発行エラー。中止します。");
    await client.disconnect();
    return;
  }

  console.log("トークンを作成してリザーブアカウントに配布しました！");
  console.log("総供給量:", TOTAL_SUPPLY, TOKEN_CURRENCY);

  // === 確認：リザーブアカウントの残高を照会 ===
  console.log("--- 確認 ---");
  const lines = await client.request({
    command: "account_lines",
    account: reserve.address,
    ledger_index: "validated",
  });

  const tokenLine = lines.result.lines.find(
    (l) => l.currency === TOKEN_CURRENCY && l.account === issuer.address
  );

  if (tokenLine) {
    console.log("リザーブ残高:", tokenLine.balance, TOKEN_CURRENCY);
    console.log("発行者:", tokenLine.account);
    console.log("限度額:", tokenLine.limit, TOKEN_CURRENCY);
  }

  // 次へ: distribute-token.js が供給量の一部を保有者に送ります。

  await client.disconnect();
}

createAndDistributeToken();`,
            ko: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)");
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)");
const { Client, Wallet, xahToDrops } = require("xahau");

// 테스트넷에서 자금이 있는 두 개의 지갑이 필요합니다. .env에 정의하세요:
//   ISSUER_SEED  → 토큰 발행자 계정
//   RESERVE_SEED → reserve/배포 계정
// create-accounts.js (모듈 3, 레슨 2)가 둘 다 만듭니다.

// token_currency가 3자를 넘으면 40자리 hex로 변환
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();
  if (cur.length <= 3) return cur;

  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency가 너무 깁니다: "\${cur}" -> hex \${hex.length} (>40). 최대 약 20 bytes (UTF-8).\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createAndDistributeToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // === 계정 ===
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const reserve = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  const TOKEN_CURRENCY_INPUT = "YourTokenName";
  const TOTAL_SUPPLY = "1000000";
  const TOKEN_CURRENCY = normalizeCurrency(TOKEN_CURRENCY_INPUT);

  console.log("=== 토큰 생성 ===");
  console.log("발행자:", issuer.address);
  console.log("리저브:", reserve.address);
  console.log("토큰:", TOKEN_CURRENCY);
  console.log("공급량:", TOTAL_SUPPLY);

  // === STEP 1: 발행자에 DefaultRipple 설정 ===
  console.log("--- Step 1: 발행자에 DefaultRipple 설정 ---");
  const accountSet = {
    TransactionType: "AccountSet",
    Account: issuer.address,
    SetFlag: 8,
  };

  const prep1 = await client.autofill(accountSet);
  const signed1 = issuer.sign(prep1);
  const result1 = await client.submitAndWait(signed1.tx_blob);
  console.log("DefaultRipple:", result1.result.meta.TransactionResult);

  if (result1.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("발행자 설정 오류. 중단합니다.");
    await client.disconnect();
    return;
  }

  // === STEP 2: 리저브 계정이 발행자에 대한 TrustLine 생성 ===
  console.log("--- Step 2: TrustLine 생성 (reserve → issuer) ---");
  const trustSet = {
    TransactionType: "TrustSet",
    Account: reserve.address,
    LimitAmount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY,
    },
  };

  const prep2 = await client.autofill(trustSet);
  const signed2 = reserve.sign(prep2);
  const result2 = await client.submitAndWait(signed2.tx_blob);
  console.log("TrustLine:", result2.result.meta.TransactionResult);

  if (result2.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("TrustLine 생성 오류. 중단합니다.");
    await client.disconnect();
    return;
  }

  // === STEP 3: 발행자가 전체 공급량을 리저브 계정에 전송 ===
  console.log("--- Step 3: 토큰 발행 (issuer → reserve) ---");
  const issuePayment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: reserve.address,
    Amount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY,
    },
  };

  const prep3 = await client.autofill(issuePayment);
  const signed3 = issuer.sign(prep3);
  const result3 = await client.submitAndWait(signed3.tx_blob);
  console.log("발행:", result3.result.meta.TransactionResult);

  if (result3.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("토큰 발행 오류. 중단합니다.");
    await client.disconnect();
    return;
  }

  console.log("토큰이 생성되어 리저브 계정에 배포되었습니다!");
  console.log("총 공급량:", TOTAL_SUPPLY, TOKEN_CURRENCY);

  // === 검증 ===
  console.log("--- 검증 ---");
  const lines = await client.request({
    command: "account_lines",
    account: reserve.address,
    ledger_index: "validated",
  });

  const tokenLine = lines.result.lines.find(
    (l) => l.currency === TOKEN_CURRENCY && l.account === issuer.address
  );

  if (tokenLine) {
    console.log("리저브 잔액:", tokenLine.balance, TOKEN_CURRENCY);
    console.log("발행자:", tokenLine.account);
    console.log("한도:", tokenLine.limit, TOKEN_CURRENCY);
  }

  await client.disconnect();
}

createAndDistributeToken();`,
            zh: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
const { Client, Wallet, xahToDrops } = require("xahau");

// 你需要两个在测试网上有资金的钱包，并在 .env 中定义：
//   ISSUER_SEED   → 代币发行账户
//   RESERVE_SEED  → 储备/分发账户
// create-accounts.js（模块 3，第 2 课）会创建这两个账户。

// 如果 token_currency 超过 3 个字符，则转成 40 位十六进制
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();
  if (cur.length <= 3) return cur;

  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency 太长: "\${cur}" -> hex \${hex.length} (>40). UTF-8 最多约 20 bytes。\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createAndDistributeToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // === 账户 ===
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const reserve = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  const TOKEN_CURRENCY_INPUT = "YourTokenName";
  const TOTAL_SUPPLY = "1000000";
  const TOKEN_CURRENCY = normalizeCurrency(TOKEN_CURRENCY_INPUT);

  console.log("=== 创建代币 ===");
  console.log("发行方:", issuer.address);
  console.log("储备账户:", reserve.address);
  console.log("代币:", TOKEN_CURRENCY);
  console.log("总供应量:", TOTAL_SUPPLY);

  // === 步骤 1：为发行方开启 DefaultRipple ===
  console.log("--- 步骤 1：为发行方配置 DefaultRipple ---");
  const accountSet = {
    TransactionType: "AccountSet",
    Account: issuer.address,
    SetFlag: 8,
  };

  const prep1 = await client.autofill(accountSet);
  const signed1 = issuer.sign(prep1);
  const result1 = await client.submitAndWait(signed1.tx_blob);
  console.log("DefaultRipple:", result1.result.meta.TransactionResult);

  if (result1.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("发行方配置失败，终止。");
    await client.disconnect();
    return;
  }

  // === 步骤 2：储备账户为发行方创建 TrustLine ===
  console.log("--- 步骤 2：创建 TrustLine（reserve → issuer）---");
  const trustSet = {
    TransactionType: "TrustSet",
    Account: reserve.address,
    LimitAmount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY,
    },
  };

  const prep2 = await client.autofill(trustSet);
  const signed2 = reserve.sign(prep2);
  const result2 = await client.submitAndWait(signed2.tx_blob);
  console.log("TrustLine:", result2.result.meta.TransactionResult);

  if (result2.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("创建 TrustLine 失败，终止。");
    await client.disconnect();
    return;
  }

  // === 步骤 3：发行方向储备账户发送全部供应量 ===
  console.log("--- 步骤 3：发行代币（issuer → reserve）---");
  const issuePayment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: reserve.address,
    Amount: {
      currency: TOKEN_CURRENCY,
      issuer: issuer.address,
      value: TOTAL_SUPPLY,
    },
  };

  const prep3 = await client.autofill(issuePayment);
  const signed3 = issuer.sign(prep3);
  const result3 = await client.submitAndWait(signed3.tx_blob);
  console.log("发行结果:", result3.result.meta.TransactionResult);

  if (result3.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("代币发行失败，终止。");
    await client.disconnect();
    return;
  }

  console.log("代币已创建并分发到储备账户！");
  console.log("总供应量:", TOTAL_SUPPLY, TOKEN_CURRENCY);

  // === 验证 ===
  console.log("--- 验证 ---");
  const lines = await client.request({
    command: "account_lines",
    account: reserve.address,
    ledger_index: "validated",
  });

  const tokenLine = lines.result.lines.find(
    (l) => l.currency === TOKEN_CURRENCY && l.account === issuer.address
  );

  if (tokenLine) {
    console.log("储备余额:", tokenLine.balance, TOKEN_CURRENCY);
    console.log("发行方:", tokenLine.account);
    console.log("额度:", tokenLine.limit, TOKEN_CURRENCY);
  }

  await client.disconnect();
}

createAndDistributeToken();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Proceso de creación de un token", pt: "Processo de criação de um token", en: "Token creation process", jp: "トークン作成プロセス", ko: "토큰 생성 과정", zh: "代币创建流程" },
          content: {
            es: "No necesitas smart contracts\n\n1️⃣ Configurar emisor (DefaultRipple)\n2️⃣ Crear TrustLine desde cuenta reserva\n3️⃣ Emitir supply (Payment del emisor)\n4️⃣ Distribuir a usuarios finales\n\nTodo con transacciones nativas",
            pt: `Você não precisa de smart contracts

1️⃣ Configurar emissor (DefaultRipple)
2️⃣ Criar TrustLine a partir de conta reserva
3️⃣ Emitir supply (Payment do emissor)
4️⃣ Distribuir aos usuários finais

Tudo com transações nativas`,
            en: "No smart contracts needed\n\n1️⃣ Configure issuer (DefaultRipple)\n2️⃣ Create TrustLine from reserve account\n3️⃣ Issue supply (Payment from issuer)\n4️⃣ Distribute to end users\n\nAll with native transactions",
            jp: "スマートコントラクト不要\n\n1️⃣ 発行者を設定（DefaultRipple）\n2️⃣ リザーブアカウントからTrustLineを作成\n3️⃣ サプライを発行（発行者からPayment）\n4️⃣ エンドユーザーに配布\n\nすべてネイティブトランザクションで",
            ko: "스마트 컨트랙트가 필요 없음\n\n1️⃣ 발행자 설정 (DefaultRipple)\n2️⃣ reserve 계정에서 TrustLine 생성\n3️⃣ 공급량 발행 (발행자의 Payment)\n4️⃣ 최종 사용자에게 배포\n\n모두 네이티브 트랜잭션으로 처리",
            zh: "不需要智能合约\n\n1️⃣ 配置发行方（DefaultRipple）\n2️⃣ 从储备账户创建 TrustLine\n3️⃣ 发行供应量（发行方发起 Payment）\n4️⃣ 分发给最终用户\n\n全部使用原生交易完成",
          },
          visual: "🏭",
        },
        {
          title: { es: "Dos cuentas: emisor + reserva", pt: "Duas contas: emissor + reserva", en: "Two accounts: issuer + reserve", jp: "2つのアカウント：発行者 + リザーブ", ko: "두 개의 계정: 발행자 + reserve", zh: "两个账户：发行方 + 储备账户" },
          content: {
            es: "Buena práctica: separar responsabilidades\n\n• Emisor: solo configura y emite\n  → Proteger con multi-sign\n  → Desactivar clave maestra\n\n• Reserva: opera día a día\n  → Distribuye a usuarios\n  → Vende en el DEX\n\nSi la reserva se compromete, el emisor puede congelar",
            pt: "Boa prática: separar responsabilidades\n\n• Emissor: apenas configura e emite\n  → Proteger com multi-sign\n  → Desativar chave mestra\n\n• Reserva: opera dia a dia\n  → Distribui a usuários\n  → Vende no DEX\n\nSe a reserva for comprometida, o emissor pode congelar",
            en: "Best practice: separate responsibilities\n\n• Issuer: only configures and issues\n  -> Protect with multi-sign\n  -> Disable master key\n\n• Reserve: day-to-day operations\n  -> Distributes to users\n  -> Sells on the DEX\n\nIf reserve is compromised, the issuer can freeze",
            jp: "ベストプラクティス：責任を分離\n\n• 発行者：設定と発行のみ\n  -> マルチサインで保護\n  -> マスターキーを無効化\n\n• リザーブ：日常業務\n  -> ユーザーへの配布\n  -> DEXでの販売\n\nリザーブが侵害されたら発行者が凍結可能",
            ko: "모범 사례: 역할 분리\n\n• 발행자: 설정과 발행만 담당\n  → 멀티서명으로 보호\n  → 마스터 키 비활성화 가능\n\n• Reserve: 일상 운영 담당\n  → 사용자에게 배포\n  → DEX에서 판매\n\nreserve가 침해되면 발행자가 동결 가능",
            zh: "最佳实践：分离职责\n\n• 发行方：只负责配置与发行\n  → 用多重签名保护\n  → 可停用主密钥\n\n• 储备账户：负责日常运营\n  → 向用户分发\n  → 在 DEX 上出售\n\n如果储备账户被攻破，发行方还能冻结代币",
          },
          visual: "🔐",
        },
        {
          title: { es: "Resumen de transacciones", pt: "Resumo das transações", en: "Transaction summary", jp: "トランザクションまとめ", ko: "트랜잭션 요약", zh: "交易总结" },
          content: {
            es: "AccountSet → DefaultRipple en emisor\nTrustSet → Reserva confía en emisor\nPayment → Emisor envía supply a reserva\nPayment → Reserva distribuye a usuarios\n\nUsuarios finales necesitan TrustLine\nantes de poder recibir el token",
            pt: `AccountSet → DefaultRipple em emissor
TrustSet → A reserva confia no emissor
Payment → Emissor envia supply a reserva
Payment → A reserva distribui aos usuários

Usuários finais precisam de TrustLine
antes de poder receber ou token`,
            en: "AccountSet -> DefaultRipple on issuer\nTrustSet -> Reserve trusts issuer\nPayment -> Issuer sends supply to reserve\nPayment -> Reserve distributes to users\n\nEnd users need a TrustLine\nbefore they can receive the token",
            jp: "AccountSet -> 発行者にDefaultRipple\nTrustSet -> リザーブが発行者を信頼\nPayment -> 発行者がリザーブにサプライを送信\nPayment -> リザーブがユーザーに配布\n\nエンドユーザーはトークンを\n受け取る前にTrustLineが必要",
            ko: "AccountSet → 발행자에 DefaultRipple 설정\nTrustSet → reserve가 발행자를 신뢰\nPayment → 발행자가 reserve에 공급량 전송\nPayment → reserve가 사용자에게 배포\n\n최종 사용자는 토큰을 받기 전에\nTrustLine이 필요함",
            zh: "AccountSet → 为发行方开启 DefaultRipple\nTrustSet → 储备账户信任发行方\nPayment → 发行方向储备账户发送供应量\nPayment → 储备账户向用户分发\n\n最终用户在接收代币前\n必须先建立 TrustLine",
          },
          visual: "📋",
        },
      ],
    },
    {
      id: "m6l2",
      title: {
        es: "Gestão avançada de tokens",
        pt: "Gestão avançada de tokens",
        en: "Advanced token management",
        jp: "高度なトークン管理",
        ko: "고급 토큰 관리",
        zh: "高级代币管理",
      },
      theory: {
        es: `Una vez creado tu token, puedes gestionar diversos aspectos: consultar balances, configurar la cuenta emisora y transferir tokens entre usuarios.

### Consultar TrustLines y balances

El comando \`account_lines\` devuelve todas las TrustLines de una cuenta, mostrando cada token que posee o ha emitido, con su balance actual.

### Configuración del emisor

La cuenta emisora puede configurar flags importantes:

- **DefaultRipple**: Permite que los tokens se transfieran entre terceros sin pasar por el emisor. **Es necesario activarlo** si quieres que tus tokens sean libremente transferibles
- **RequireAuth**: Requiere que el emisor autorice cada TrustLine antes de que alguien pueda recibir tokens

### Transferencia entre terceros (Rippling)

Sin el flag **DefaultRipple**, los tokens solo se pueden transferir de vuelta al emisor. Con él activado, los tokens pueden "ripplear" — es decir, transferirse entre cuentas que tienen TrustLine con el mismo emisor.

### Códigos de moneda especiales

Para nombres de token de más de 3 caracteres, se usa un código hexadecimal de 40 caracteres:
- Formato: el nombre convertido a hex, rellenado con ceros
- Ejemplo: "EURZ" → hex → relleno a 40 chars`,
        pt: `Uma vez criado seu token, você pode gerenciar diversos aspectos: consultar saldos, configurar a conta emissora e transferir tokens entre usuários.
### Consultar TrustLines e saldos
O comando \`account_lines\` retorna todas as TrustLines de uma conta, mostrando cada token que ela possui ou emitiu, com o saldo atual.
### Configuração do emissor
A conta emissora pode configurar flags importantes:
- **DefaultRipple**: permite que os tokens sejam transferidos entre terceiros sem passar pelo emissor. **É necessário ativá-lo** se você quer que seus tokens sejam livremente transferíveis
- **RequireAuth**: exige que o emissor autorize cada TrustLine antes que alguém possa receber tokens
### Transferencia entre terceiros (Rippling)
Sem o flag **DefaultRipple**, os tokens só podem ser transferidos de volta ao emissor. Com ele ativado, os tokens podem "ripplear" — ou seja, ser transferidos entre contas que têm TrustLine com o mesmo emissor.
### Códigos de moeda especiales
Para nomes de token com mais de 3 caracteres, usa-se um código hexadecimal de 40 caracteres:
- Formato: o nome convertido para hex, preenchido com zeros
- Exemplo: "EURZ" → hex → preenchido até 40 caracteres`,
        en: `Once your token is created, you can manage various aspects: query balances, configure the issuing account, and transfer tokens between users.

### Querying TrustLines and balances

The \`account_lines\` command returns all TrustLines for an account, showing each token it holds or has issued, along with its current balance.

### Issuer configuration

The issuing account can configure important flags:

- **DefaultRipple**: Allows tokens to be transferred between third parties without going through the issuer. **It must be activated** if you want your tokens to be freely transferable
- **RequireAuth**: Requires the issuer to authorize each TrustLine before someone can receive tokens

### Transfer between third parties (Rippling)

Without the **DefaultRipple** flag, tokens can only be transferred back to the issuer. With it activated, tokens can "ripple" — that is, transfer between accounts that have a TrustLine with the same issuer.

### Special currency codes

For token names longer than 3 characters, a 40-character hexadecimal code is used:
- Format: the name converted to hex, padded with zeros
- Example: "EURZ" -> hex -> padded to 40 chars`,
        jp: `トークンを作成したら、残高の照会、発行アカウントの設定、ユーザー間のトークン転送など、さまざまな側面を管理できます。

### トラストラインと残高の照会

\`account_lines\`コマンドはアカウントのすべてのトラストラインを返し、保有または発行した各トークンの現在の残高を表示します。

### 発行者の設定

発行アカウントで重要なフラグを設定できます：

- **DefaultRipple**: 発行者を経由せずに第三者間でトークンを転送できるようにします。トークンを自由に転送可能にしたい場合は**有効化が必要**です
- **RequireAuth**: 誰かがトークンを受け取れるようにする前に、発行者が各トラストラインを承認する必要があります

### 第三者間の転送（Rippling）

**DefaultRipple**フラグなしでは、トークンは発行者にしか送り返せません。有効化すると、トークンは「ripple(波及)」できます。つまり、同じ発行者へのトラストラインを持つアカウント間で転送できるようになります。

### 特殊な通貨コード

3文字を超えるトークン名には、40文字の16進数コードが使用されます。
- 形式：名前を16進数に変換し、ゼロで埋める
- 例："EURZ" -> hex -> 40文字に埋める`,
        ko: `토큰 운영이 시작되면 발행, 배포 외에도 다양한 **관리 작업**이 필요합니다. 이 단계에서는 발행자 권한과 TrustLine 상태를 이해해야 합니다.

### 자주 다루는 관리 항목

- 특정 TrustLine 승인 또는 거부
- 발행 계정 설정 변경
- 보유 한도와 사용자 상태 확인
- 토큰 흐름 모니터링

### 운영 관점의 포인트

토큰은 한 번 배포했다고 끝나지 않습니다. 정책, 보안, 규정, 사용자 경험을 고려해 발행자 계정을 지속적으로 관리해야 합니다.`,
        zh: `当代币开始运行后，除了发行和分发，还需要处理各种 **管理工作**。这一阶段需要理解发行方权限以及 TrustLine 的状态。

### 常见管理内容

- 批准或拒绝某条 TrustLine
- 调整发行账户配置
- 检查持有额度与用户状态
- 监控代币流向

### 运营视角下的重点

代币并不是发出去就结束了。你需要持续管理发行账户，同时考虑策略、安全、合规和用户体验。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar los tokens (TrustLines) de una cuenta",
            pt: "Consultar os tokens (TrustLines) de uma conta",
            en: "Query the tokens (TrustLines) of an account",
            jp: "アカウントのトークン（TrustLine）を照会する",
            ko: "계정의 토큰(TrustLine) 조회",
            zh: "查询账户的代币（TrustLine）",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function getTokenBalances(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_lines",
    account: address,
    ledger_index: "validated",
  });

  console.log("=== Tokens de la cuenta ===");
  console.log("Dirección:", address);

  if (response.result.lines.length === 0) {
    console.log("No tiene TrustLines (tokens).");
  }

  for (const line of response.result.lines) {
    console.log(\`Token: \${line.currency}\`);
    console.log(\`  Emisor: \${line.account}\`);
    console.log(\`  Balance: \${line.balance}\`);
    console.log(\`  Límite: \${line.limit}\`);
  }

  await client.disconnect();
}

// La cuenta a consultar: el primer argumento, o WALLET de .env
getTokenBalances(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function getTokenSaldos(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const response = await client.request({
    command: "account_lines",
    account: address,
    ledger_index: "validated",
  });
  console.log("=== Tokens da conta ===");
  console.log("Endereço:", address);
  if (response.result.lines.length === 0) {
    console.log("Não tem TrustLines (tokens).");
  }
  for (const line of response.result.lines) {
    console.log(\`Token: \${line.currency}\`);
    console.log(\`  Emissor: \${line.account}\`);
    console.log(\`  Saldo: \${line.balance}\`);
    console.log(\`  Límite: \${line.limit}\`);
  }
  await client.disconnect();
}
// A conta a consultar: o primeiro argumento, ou a WALLET do .env
getTokenSaldos(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function getTokenBalances(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_lines",
    account: address,
    ledger_index: "validated",
  });

  console.log("=== Account tokens ===");
  console.log("Address:", address);

  if (response.result.lines.length === 0) {
    console.log("No TrustLines (tokens) found.");
  }

  for (const line of response.result.lines) {
    console.log(\`Token: \${line.currency}\`);
    console.log(\`  Issuer: \${line.account}\`);
    console.log(\`  Balance: \${line.balance}\`);
    console.log(\`  Limit: \${line.limit}\`);
  }

  await client.disconnect();
}

// The account to inspect: the first argument, or WALLET from .env
getTokenBalances(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function getTokenBalances(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_lines",
    account: address,
    ledger_index: "validated",
  });

  console.log("=== アカウントのトークン ===");
  console.log("アドレス:", address);

  if (response.result.lines.length === 0) {
    console.log("TrustLine（トークン）が見つかりません。");
  }

  for (const line of response.result.lines) {
    console.log(\`トークン: \${line.currency}\`);
    console.log(\`  発行者: \${line.account}\`);
    console.log(\`  残高: \${line.balance}\`);
    console.log(\`  限度額: \${line.limit}\`);
  }

  await client.disconnect();
}

// 調べるアカウント：最初の引数、または .env の WALLET
getTokenBalances(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function getTokenBalances(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_lines",
    account: address,
    ledger_index: "validated",
  });

  console.log("=== 계정 토큰 ===");
  console.log("주소:", address);

  if (response.result.lines.length === 0) {
    console.log("TrustLine(토큰)을 찾지 못했습니다.");
  }

  for (const line of response.result.lines) {
    console.log(\`토큰: \${line.currency}\`);
    console.log(\`  발행자: \${line.account}\`);
    console.log(\`  잔액: \${line.balance}\`);
    console.log(\`  한도: \${line.limit}\`);
  }

  await client.disconnect();
}

// 조회할 계정: 첫 번째 인수, 또는 .env의 WALLET
getTokenBalances(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function getTokenBalances(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_lines",
    account: address,
    ledger_index: "validated",
  });

  console.log("=== 账户代币 ===");
  console.log("地址:", address);

  if (response.result.lines.length === 0) {
    console.log("没有找到 TrustLine（代币）。");
  }

  for (const line of response.result.lines) {
    console.log(\`代币: \${line.currency}\`);
    console.log(\`  发行方: \${line.account}\`);
    console.log(\`  余额: \${line.balance}\`);
    console.log(\`  限额: \${line.limit}\`);
  }

  await client.disconnect();
}

// 要查看的账户：第一个参数，或 .env 中的 WALLET
getTokenBalances(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
          },
        },

      ],
      slides: [
        {
          title: { es: "Consultar tokens", pt: "Consultar tokens", en: "Query tokens", jp: "トークンの照会", ko: "토큰 조회", zh: "查询代币" },
          content: {
            es: "account_lines → TrustLines de una cuenta\n\n• currency → Código del token\n• account → Emisor\n• balance → Balance actual\n• limit → Límite de confianza",
            pt: "account_lines → TrustLines de uma conta\n\n• currency → Código do token\n• account → Emissor\n• saldo → Saldo atual\n• limit → Límite de confianza",
            en: "account_lines -> TrustLines of an account\n\n• currency -> Token code\n• account -> Issuer\n• balance -> Current balance\n• limit -> Trust limit",
            jp: "account_lines -> アカウントのTrustLine\n\n• currency -> トークンコード\n• account -> 発行者\n• balance -> 現在の残高\n• limit -> 信頼限度額",
            ko: "account_lines → 계정의 TrustLine\n\n• currency → 토큰 코드\n• account → 발행자\n• balance → 현재 잔액\n• limit → 신뢰 한도",
            zh: "account_lines → 账户的 TrustLine\n\n• currency → 代币代码\n• account → 发行方\n• balance → 当前余额\n• limit → 信任额度",
          },
          visual: "📊",
        },
        {
          title: { es: "DefaultRipple", pt: "DefaultRipple", en: "DefaultRipple", jp: "DefaultRipple", ko: "DefaultRipple", zh: "DefaultRipple" },
          content: {
            es: "Flag esencial para emisores de tokens\n\n• Sin DefaultRipple → Solo ida y vuelta al emisor\n• Con DefaultRipple → Transferible entre terceros\n\nActívalo ANTES de emitir tokens",
            pt: "Flag esencial para emissores de tokens\n\n• Sem DefaultRipple → Apenas ida e volta ao emissor\n• Com DefaultRipple → Transferível entre terceiros\n\nAtive-o ANTES de emitir tokens",
            en: "Essential flag for token issuers\n\n• Without DefaultRipple -> Only back and forth to issuer\n• With DefaultRipple -> Transferable between third parties\n\nActivate it BEFORE issuing tokens",
            jp: "トークン発行者に不可欠なフラグ\n\n• DefaultRippleなし -> 発行者との間でのみ\n• DefaultRippleあり -> 第三者間で転送可能\n\nトークン発行前に有効化すること",
            ko: "토큰 발행자에게 필수적인 플래그\n\n• DefaultRipple 없음 → 발행자와의 왕복만 가능\n• DefaultRipple 있음 → 제3자 간 전송 가능\n\n토큰 발행 전에 활성화해야 함",
            zh: "代币发行方的重要标志\n\n• 没有 DefaultRipple → 只能与发行方之间往返\n• 有 DefaultRipple → 可在第三方之间转移\n\n必须在发行代币前启用",
          },
          visual: "🔀",
        },
        {
          title: { es: "Flags importantes para emisores", pt: "Flags importantes para emissores", en: "Important flags for issuers", jp: "発行者の重要なフラグ", ko: "발행자를 위한 중요한 플래그", zh: "发行方的重要标志" },
          content: {
            es: "RequireAuth (asfRequireAuth):\n• El emisor autoriza cada TrustLine\n• Ideal para tokens con KYC\n\nDefaultRipple (asfDefaultRipple):\n• Permite transferencia entre terceros\n\nConfigurar ANTES de emitir tokens\nUsar AccountSet con SetFlag/ClearFlag",
            pt: "RequireAuth (asfRequireAuth):\n• O emissor autoriza cada TrustLine\n• Ideal para tokens com KYC\n\nDefaultRipple (asfDefaultRipple):\n• Permite transferência entre terceiros\n\nConfigurar ANTES de emitir tokens\nUsar AccountSet com SetFlag/ClearFlag",
            en: "RequireAuth (asfRequireAuth):\n• Issuer authorizes each TrustLine\n• Ideal for tokens with KYC\n\nDefaultRipple (asfDefaultRipple):\n• Allows transfer between third parties\n\nConfigure BEFORE issuing tokens\nUse AccountSet with SetFlag/ClearFlag",
            jp: "RequireAuth（asfRequireAuth）：\n• 発行者が各TrustLineを承認\n• KYCトークンに最適\n\nDefaultRipple（asfDefaultRipple）：\n• 第三者間の転送を許可\n\nトークン発行前に設定する\nAccountSetにSetFlag/ClearFlagを使用",
            ko: "RequireAuth (asfRequireAuth):\n• 발행자가 각 TrustLine을 승인\n• KYC가 필요한 토큰에 적합\n\nDefaultRipple (asfDefaultRipple):\n• 제3자 간 전송 허용\n\n토큰 발행 전 설정 필요\nAccountSet의 SetFlag/ClearFlag 사용",
            zh: "RequireAuth（asfRequireAuth）：\n• 发行方批准每一条 TrustLine\n• 适合需要 KYC 的代币\n\nDefaultRipple（asfDefaultRipple）：\n• 允许第三方之间转移\n\n应在发行代币前完成配置\n使用带 SetFlag/ClearFlag 的 AccountSet",
          },
          visual: "🚩",
        },
      ],
    },
    {
      id: "m6l3",
      title: {
        es: "Trading en el DEX nativo",
        pt: "Trading no DEX nativo",
        en: "Trading on the native DEX",
        jp: "ネイティブDEXでのトレーディング",
        ko: "네이티브 DEX에서 거래하기",
        zh: "在原生 DEX 上交易",
      },
      theory: {
        es: `Xahau incluye un **exchange descentralizado (DEX) nativo** directamente en el protocolo. No necesitas smart contracts ni plataformas externas para intercambiar tokens, todo se hace con transacciones nativas.

### OfferCreate: colocar órdenes en el DEX

La transacción \`OfferCreate\` permite colocar una orden de compra o venta en el libro de órdenes del DEX. Tiene dos campos clave:

- **TakerPays**: Lo que quieres **recibir** (lo que el "taker" paga)
- **TakerGets**: Lo que estás **dispuesto a dar** (lo que el "taker" obtiene)

Por ejemplo, si quieres vender 100 USD por XAH, configurarías:
- TakerPays: cantidad de XAH que quieres recibir
- TakerGets: 100 USD (lo que entregas)

### OfferCancel: cancelar órdenes abiertas

Si tienes una orden abierta en el DEX que aún no se ha ejecutado, puedes cancelarla con \`OfferCancel\`, especificando el \`OfferSequence\` de la orden original.

### Cómo funciona el libro de órdenes

El DEX mantiene un **order book** (libro de órdenes) para cada par de tokens:
- **Bids (ofertas de compra)**: Órdenes que quieren comprar un token
- **Asks (ofertas de venta)**: Órdenes que quieren vender un token

Cuando una nueva orden coincide con una existente (el precio se cruza), se ejecuta automáticamente, total o parcialmente.

### Flags especiales de OfferCreate

- **tfImmediateOrCancel**: La orden se ejecuta inmediatamente contra las órdenes existentes. Lo que no se llene se cancela al instante. No queda nada en el libro de órdenes
- **tfPassive**: La orden solo se ejecuta contra órdenes existentes que tengan un precio igual o mejor. No se coloca en el libro si no hay match inmediato
- **tfFillOrKill**: La orden se ejecuta completamente o se cancela. No se permiten ejecuciones parciales.
- **tfSell**: Intercambia la cantidad total de TakerGets, incluso si eso significa obtener más de la cantidad de TakerPays a cambio.

Visita más información sobre los flags en la [documentación oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/#offercreate-flags).

### Consultar el libro de órdenes: book_offers

El comando \`book_offers\` permite ver las órdenes abiertas para un par de tokens. Devuelve las mejores ofertas ordenadas por precio.

### Auto-bridging a través de XAH

El DEX de Xahau puede enrutar operaciones multi-salto automáticamente a través de XAH. Si quieres intercambiar USD por EUR y no hay ofertas directas USD/EUR, el DEX puede:
1. Vender USD por XAH
2. Comprar EUR con XAH

Todo en una sola transacción, de forma transparente. Esto mejora la liquidez del DEX significativamente.

### Ejecutar los scripts de esta lección

Los dos scripts firman con \`RESERVE_SEED\`, que tiene el token después del [proceso completo](?m=7&l=1), y leen la dirección de ISSUER de \`ISSUER_SEED\`. \`create-accounts.js\` ([módulo 3](?m=3&l=1)) crea las dos. Ejecuta primero el script de la oferta. Salida en testnet:

\`\`\`
Result: tesSUCCESS
Offer created on the DEX!
Selling 100 Tokens for 50 XAH (0.5 XAH/Token)
Offer Sequence: 843750863
\`\`\`

El **Sequence** de la oferta la identifica. \`cancel-offer.js\` lo recibe como argumento:

\`\`\`bash
node cancel-offer.js 843750863
\`\`\`

Imprime \`Result: tesSUCCESS\` y \`Offer cancelled successfully!\`. Sin un Sequence válido se detiene antes de enviar nada y dice qué pasar.

**Caso a vigilar:** \`OfferCancel\` también devuelve \`tesSUCCESS\` cuando la oferta ya no existe (ya se ejecutó o ya se canceló). Una cancelación exitosa no prueba que la oferta no se negociara: consulta \`account_offers\` antes de cancelar si eso importa.`,
        pt: `Xahau inclui um **exchange descentralizado (DEX) nativo** diretamente no protocolo. Você não precisa de smart contracts nem plataformas externas para trocar tokens, tudo é feito com transações nativas.
### OfferCreate: colocar ordens no DEX
A transação \`OfferCreate\` permite colocar uma ordem de compra ou venda no livro de ofertas do DEX. Tem dois campos chave:
- **TakerPays**: o que você quer **receber** (o que o "taker" paga)
- **TakerGets**: o que você está **disposto a dar** (o que o "taker" obtém)
Por exemplo, se você quer vender 100 USD por XAH, configuraria:
- TakerPays: quantidade de XAH que você quer receber
- TakerGets: 100 USD (o que você entrega)
### OfferCancel: cancelar ordens abertas
Se você tem uma ordem aberta no DEX que ainda não foi executada, você pode cancelá-la com \`OfferCancel\`, especificando o \`OfferSequence\` da ordem original.
### Como funciona o livro de ofertas
O DEX mantiene um **order book** (livro de ofertas) para cada par de tokens:
- **Bids (ofertas de compra)**: ordens que querem comprar um token
- **Asks (ofertas de venda)**: ordens que querem vender um token
Quando uma nova ordem coincide com uma existente (o preço cruza), é executada automaticamente, total ou parcialmente.
### Flags especiais de OfferCreate
- **tfImmediateOrCancel**: A ordem é executada imediatamente contra as ordens existentes. O que não for preenchido é cancelado no instante. Não fica nada no livro de ofertas
- **tfPassive**: A ordem só é executada contra ordens existentes que tenham um preço igual ou melhor. Não é colocada no livro se não há match imediato
- **tfFillOrKill**: A ordem é executada completamente ou é cancelada. Não são permitidas execuções parciais.
- **tfSell**: Troca a quantidade total de TakerGets, mesmo que isso signifique obter mais do que a quantidade de TakerPays em troca.
Veja mais informações sobre os flags na [documentação oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/#offercreate-flags).
### Consultar o livro de ofertas: book_offers
O comando \`book_offers\` permite ver as ordens abertas para um par de tokens. Retorna as melhores ofertas ordenadas por preço.
### Auto-bridging por meio de XAH
O DEX de Xahau pode rotear operações multi-salto automaticamente por meio de XAH. Se você quiser trocar USD por EUR e não há ofertas diretas USD/EUR, o DEX pode:
1. Vender USD por XAH
2. Comprar EUR com XAH
Todo em uma única transação, de forma transparente. Isso melhora a liquidez do DEX significativamente.

### Executar os scripts desta lição

Os dois scripts assinam com \`RESERVE_SEED\`, que tem o token depois do [processo completo](?m=7&l=1), e leem o endereço do ISSUER de \`ISSUER_SEED\`. \`create-accounts.js\` ([módulo 3](?m=3&l=1)) cria as duas. Execute primeiro o script da oferta. Saída na testnet:

\`\`\`
Result: tesSUCCESS
Offer created on the DEX!
Selling 100 Tokens for 50 XAH (0.5 XAH/Token)
Offer Sequence: 843750863
\`\`\`

O **Sequence** da oferta a identifica. \`cancel-offer.js\` o recebe como argumento:

\`\`\`bash
node cancel-offer.js 843750863
\`\`\`

Ele imprime \`Result: tesSUCCESS\` e \`Offer cancelled successfully!\`. Sem um Sequence válido, para antes de enviar e diz o que passar.

**Caso para observar:** \`OfferCancel\` também retorna \`tesSUCCESS\` quando a oferta não existe mais (já executada ou já cancelada). Um cancelamento bem-sucedido não prova que a oferta não foi negociada: consulte \`account_offers\` antes de cancelar se isso importar.`,
        en: `Xahau includes a **native decentralized exchange (DEX)** directly in the protocol. You don't need smart contracts or external platforms to exchange tokens, everything is done with native transactions.

### OfferCreate: placing orders on the DEX

The \`OfferCreate\` transaction allows you to place a buy or sell order on the DEX order book. It has two key fields:

- **TakerPays**: What you want to **receive** (what the "taker" pays)
- **TakerGets**: What you are **willing to give** (what the "taker" gets)

For example, if you want to sell 100 USD for XAH, you would set:
- TakerPays: amount of XAH you want to receive
- TakerGets: 100 USD (what you give away)

### OfferCancel: canceling open orders

If you have an open order on the DEX that hasn't been executed yet, you can cancel it with \`OfferCancel\`, specifying the \`OfferSequence\` of the original order.

### How the order book works

The DEX maintains an **order book** for each token pair:
- **Bids (buy offers)**: Orders that want to buy a token
- **Asks (sell offers)**: Orders that want to sell a token

When a new order matches an existing one (prices cross), it is automatically executed, either fully or partially.

### Special OfferCreate flags

- **tfImmediateOrCancel**: The order executes immediately against existing orders. Whatever isn't filled is canceled instantly. Nothing remains in the order book
- **tfPassive**: The order only executes against existing orders with an equal or better price. It is not placed in the book if there's no immediate match
- **tfFillOrKill**: The order is either fully executed or canceled. Partial executions are not allowed
- **tfSell**: Exchange the entire TakerGets amount, even if it means obtaining more than the TakerPays amount in exchange.

Visit more information about flags in the [official documentation](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/#offercreate-flags).

### Querying the order book: book_offers

The \`book_offers\` command lets you view open orders for a token pair. It returns the best offers sorted by price.

### Auto-bridging through XAH

The Xahau DEX can automatically route multi-hop trades through XAH. If you want to exchange USD for EUR and there are no direct USD/EUR offers, the DEX can:
1. Sell USD for XAH
2. Buy EUR with XAH

All in a single transaction, transparently. This significantly improves DEX liquidity.

### Run this lesson's scripts

Both scripts sign with \`RESERVE_SEED\`, which holds the token after [the complete process](?m=7&l=1), and read ISSUER's address from \`ISSUER_SEED\`. \`create-accounts.js\` ([Module 3](?m=3&l=1)) creates both. Run the offer script first. Output on testnet:

\`\`\`
Result: tesSUCCESS
Offer created on the DEX!
Selling 100 Tokens for 50 XAH (0.5 XAH/Token)
Offer Sequence: 843750863
\`\`\`

The offer's **Sequence** identifies it. \`cancel-offer.js\` takes it as its argument:

\`\`\`bash
node cancel-offer.js 843750863
\`\`\`

It prints \`Result: tesSUCCESS\` and \`Offer cancelled successfully!\`. Without a valid Sequence it stops before submitting and says what to pass.

**Case to watch:** \`OfferCancel\` also returns \`tesSUCCESS\` when the offer no longer exists (already filled, or already cancelled). A successful cancel doesn't prove the offer never traded: read \`account_offers\` before cancelling if that matters.`,
        jp: `Xahauにはプロトコルに直接組み込まれた**ネイティブ分散型取引所（DEX）**があります。トークンを交換するためにスマートコントラクトや外部プラットフォームは不要で、すべてネイティブトランザクションで行われます。

### OfferCreate：DEXに注文を出す

\`OfferCreate\`トランザクションにより、DEXのオーダーブックに買いまたは売り注文を出すことができます。次の2つの主要フィールドがあります。

- **TakerPays**: **受け取りたい**もの（「テイカー」が支払うもの）
- **TakerGets**: **提供する意思がある**もの（「テイカー」が受け取るもの）

例えば、100 USDをXAHで売りたい場合は次のように設定します。
- TakerPays: 受け取りたいXAHの量
- TakerGets: 100 USD（提供するもの）

### OfferCancel：未決注文をキャンセルする

まだ実行されていない未決注文がDEXにある場合、元の注文の\`OfferSequence\`を指定して\`OfferCancel\`でキャンセルできます。

### 注文書の仕組み

DEXは各トークンペアの**オーダーブック**を管理します。
- **Bids（買い注文）**: トークンを買いたい注文
- **Asks（売り注文）**: トークンを売りたい注文

新しい注文が既存の注文と一致（価格が交差）した場合、完全にまたは部分的に自動的に約定します。

### OfferCreateの特殊フラグ

- **tfImmediateOrCancel**: 注文は既存の注文に対して即座に約定します。約定しななかった部分は即座にキャンセルされます。オーダーブックには注文は残りません
- **tfPassive**: 注文は同等またはより良い価格の既存注文に対してのみ約定します。即時マッチがない場合、オーダーブックには追加されません
- **tfFillOrKill**: 注文は完全に約定されるかキャンセルされます。部分的な約定は許可されません
- **tfSell**: TakerPaysの金額よりも多く取得することになっても、TakerGetsの金額を約定します。

フラグの詳細については[公式ドキュメント](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/#offercreate-flags)をご覧ください。

### オーダーブックの照会：book_offers

\`book_offers\`コマンドでトークンペアの未決注文を表示できます。最良の注文を価格順に返します。

### XAHを通じたオートブリッジング

XahauのDEXはXAHを通じてマルチホップ取引を自動的にルーティングできます。USDをEURに交換したいが直接USD/EUR注文がない場合、DEXは次の処理を1つのトランザクションで透過的に行います。
1. USDをXAHに売る
2. XAHでEURを買う

これによりDEXの流動性が大幅に向上します。

### このレッスンのスクリプトを実行する

2つのスクリプトは、[完全なプロセス](?m=7&l=1)の後にトークンを保有する \`RESERVE_SEED\` で署名し、ISSUER のアドレスを \`ISSUER_SEED\` から読み取ります。両方とも\`create-accounts.js\`（[モジュール3](?m=3&l=1)）が作成します。先に注文スクリプトを実行します。テストネットでの出力:

\`\`\`
Result: tesSUCCESS
Offer created on the DEX!
Selling 100 Tokens for 50 XAH (0.5 XAH/Token)
Offer Sequence: 843750863
\`\`\`

注文は **Sequence** で識別されます。\`cancel-offer.js\` はそれを引数に取ります。

\`\`\`bash
node cancel-offer.js 843750863
\`\`\`

\`Result: tesSUCCESS\` と \`Offer cancelled successfully!\` が表示されます。有効な Sequence がない場合は、何も送信せずに停止し、渡すべき値を表示します。

**注意するケース:** \`OfferCancel\` は注文がもう存在しない場合（約定済み、またはキャンセル済み）にも \`tesSUCCESS\` を返します。キャンセルの成功は、注文が約定しなかったことの証明になりません。それが重要なら、キャンセル前に \`account_offers\` を確認してください。`,
        ko: `Xahau에는 네이티브 DEX가 있어 별도 스마트 컨트랙트 없이도 토큰 거래가 가능합니다. 거래는 오퍼북과 경로 탐색을 기반으로 이루어집니다.

### 기본 구성요소

- \`OfferCreate\`: 매수/매도 주문 생성
- \`OfferCancel\`: 주문 취소
- 오더북: 자산 쌍별 대기 주문 집합
- 경로 탐색: 여러 중간 자산을 거친 변환 경로 계산

### 실무에서 주의할 점

- 가격과 수량 단위를 정확히 이해해야 합니다
- 부분 체결 가능성을 고려해야 합니다
- 유동성이 적으면 원하는 가격으로 체결되지 않을 수 있습니다

### 이 레슨의 스크립트 실행

두 스크립트는 [전체 과정](?m=7&l=1) 후 토큰을 보유한 \`RESERVE_SEED\`로 서명하고, ISSUER의 주소는 \`ISSUER_SEED\`에서 읽습니다. 둘 다 \`create-accounts.js\`([모듈 3](?m=3&l=1))가 만듭니다. 오퍼 스크립트를 먼저 실행하세요. 테스트넷 출력:

\`\`\`
Result: tesSUCCESS
Offer created on the DEX!
Selling 100 Tokens for 50 XAH (0.5 XAH/Token)
Offer Sequence: 843750863
\`\`\`

오퍼는 **Sequence**로 식별됩니다. \`cancel-offer.js\`는 이를 인자로 받습니다.

\`\`\`bash
node cancel-offer.js 843750863
\`\`\`

\`Result: tesSUCCESS\`와 \`Offer cancelled successfully!\`가 출력됩니다. 유효한 Sequence가 없으면 아무것도 제출하지 않고 멈추며 무엇을 전달해야 하는지 알려 줍니다.

**주의할 경우:** \`OfferCancel\`은 오퍼가 더 이상 없을 때(이미 체결되었거나 이미 취소됨)도 \`tesSUCCESS\`를 반환합니다. 취소 성공이 오퍼가 체결되지 않았다는 증거는 아닙니다. 그게 중요하다면 취소 전에 \`account_offers\`를 확인하세요.`,
        zh: `Xahau 内置原生 DEX，因此无需额外的智能合约也能进行代币交易。交易基于订单簿和路径查找机制。

### 基本组成

- \`OfferCreate\`：创建买单或卖单
- \`OfferCancel\`：取消订单
- 订单簿：按资产对保存挂单
- 路径查找：计算经过多个中间资产的兑换路径

### 实务中的注意点

- 必须准确理解价格和数量单位
- 要考虑部分成交的可能性
- 如果流动性不足，可能无法按理想价格成交

### 运行本课的脚本

两个脚本都用 \`RESERVE_SEED\` 签名（它在[完整流程](?m=7&l=1)之后持有代币），并从 \`ISSUER_SEED\` 读取 ISSUER 的地址。两者都由 \`create-accounts.js\`（[模块3](?m=3&l=1)） 创建。先运行挂单脚本。测试网上的输出：

\`\`\`
Result: tesSUCCESS
Offer created on the DEX!
Selling 100 Tokens for 50 XAH (0.5 XAH/Token)
Offer Sequence: 843750863
\`\`\`

订单由其 **Sequence** 标识。\`cancel-offer.js\` 把它作为参数：

\`\`\`bash
node cancel-offer.js 843750863
\`\`\`

它会打印 \`Result: tesSUCCESS\` 和 \`Offer cancelled successfully!\`。没有有效的 Sequence 时，它在提交前就停止，并说明应传入什么。

**需要注意的情况：** 当订单已不存在（已成交或已取消）时，\`OfferCancel\` 同样返回 \`tesSUCCESS\`。取消成功并不能证明订单没有成交；如果这很重要，取消前先查询 \`account_offers\`。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar el libro de órdenes de un par de tokens (USD/XAH)",
            pt: "Consultar o livro de ofertas de um par de tokens (USD/XAH)",
            en: "Query the order book for a token pair (USD/XAH)",
            jp: "トークンペアの注文書を照会する（EVR/XAH）",
            ko: "토큰 쌍의 오더북 조회 (EVR/XAH)",
            zh: "查询代币对的订单簿（EVR/XAH）",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function viewOrderBook() {
 //Nos conectamos a Xahau Mainnet para este ejemplo que habrá más posibilidadesde que el DEX esté activo. En testnet suele haber poca actividad en el DEX, pero puedes probar con ambos.
  const client = new Client("wss://xahau.network");
  await client.connect();

  const issuerAddress = "rEvernodee8dJLaFsujS6q1EiXvZYmHXr8";

  // Consultar ofertas: ¿quién vende EVR a cambio de XAH?
  const response = await client.request({
    command: "book_offers",
    taker_pays: {
      currency: "XAH",
    },
    taker_gets: {
      currency: "EVR",
      issuer: issuerAddress,
    },
    limit: 10,
  });

  console.log("=== Libro de órdenes: EVR → XAH ===");
  console.log(\`Ofertas encontradas: \${response.result.offers.length}\`);

  for (const offer of response.result.offers) {
    const getsUSD = offer.TakerGets.value || offer.TakerGets;
    const paysXAH =
      typeof offer.TakerPays === "string"
        ? Number(offer.TakerPays) / 1_000_000
        : offer.TakerPays.value;

    console.log(\`Cuenta: \${offer.Account}\`);
    console.log(\`  Vende: \${getsUSD} EVR\`);
    console.log(\`  Pide:  \${paysXAH} XAH\`);
    console.log(\`  Sequence: \${offer.Sequence}\`);
  }

  await client.disconnect();
}

viewOrderBook();`,
            pt: `const { Client } = require("xahau");
async function viewOrderBook() {
 //Conectamo-nos a Xahau Mainnet para este exemplo que haverá mais possibilidade de o DEX estar ativo. Em testnet costuma haver pouca atividade no DEX, mas você pode testar com ambos.
  const client = new Client("wss://xahau.network");
  await client.connect();
  const issuerAddress = "rEvernodee8dJLaFsujS6q1EiXvZYmHXr8";
  // Consultar ofertas: quem vende EVR em troca de XAH?
  const response = await client.request({
    command: "book_offers",
    taker_pays: {
      currency: "XAH",
    },
    taker_gets: {
      currency: "EVR",
      issuer: issuerAddress,
    },
    limit: 10,
  });
  console.log("=== Libro de ordens: EVR → XAH ===");
  console.log(\`Ofertas encontradas: \${response.result.offers.length}\`);
  for (const offer of response.result.offers) {
    const getsUSD = offer.TakerGets.value || offer.TakerGets;
    const paysXAH =
      typeof offer.TakerPays === "string"
        ? Number(offer.TakerPays) / 1_000_000
        : offer.TakerPays.value;
    console.log(\`Conta: \${offer.Account}\`);
    console.log(\`  Vende: \${getsUSD} EVR\`);
    console.log(\`  Pide:  \${paysXAH} XAH\`);
    console.log(\`  Sequence: \${offer.Sequence}\`);
  }
  await client.disconnect();
}
viewOrderBook();`,
            en: `const { Client } = require("xahau");

async function viewOrderBook() {
 //We connect to Xahau Mainnet for this example since the DEX is more likely to be active there. On testnet there is usually little DEX activity, but you can try both.
  const client = new Client("wss://xahau.network");
  await client.connect();

  const issuerAddress = "rEvernodee8dJLaFsujS6q1EiXvZYmHXr8";

  // Query offers: who is selling EVR in exchange for XAH?
  const response = await client.request({
    command: "book_offers",
    taker_pays: {
      currency: "XAH",
    },
    taker_gets: {
      currency: "EVR",
      issuer: issuerAddress,
    },
    limit: 10,
  });

  console.log("=== Order book: EVR → XAH ===");
  console.log(\`Offers found: \${response.result.offers.length}\`);

  for (const offer of response.result.offers) {
    const getsUSD = offer.TakerGets.value || offer.TakerGets;
    const paysXAH =
      typeof offer.TakerPays === "string"
        ? Number(offer.TakerPays) / 1_000_000
        : offer.TakerPays.value;

    console.log(\`Account: \${offer.Account}\`);
    console.log(\`  Sells: \${getsUSD} EVR\`);
    console.log(\`  Wants: \${paysXAH} XAH\`);
    console.log(\`  Sequence: \${offer.Sequence}\`);
  }

  await client.disconnect();
}

viewOrderBook();`,
            jp: `const { Client } = require("xahau");

async function viewOrderBook() {
 //このサンプルではXahau Mainnetに接続します。DEXが活発に動いている可能性が高いためです。テストネットはDEX活動が少ない傾向がありますが、両方で試すことができます。
  const client = new Client("wss://xahau.network");
  await client.connect();

  const issuerAddress = "rEvernodee8dJLaFsujS6q1EiXvZYmHXr8";

  // 注文を照会：XAHと引き換えにEVRを売っているのは誰か？
  const response = await client.request({
    command: "book_offers",
    taker_pays: {
      currency: "XAH",
    },
    taker_gets: {
      currency: "EVR",
      issuer: issuerAddress,
    },
    limit: 10,
  });

  console.log("=== 注文書：EVR → XAH ===");
  console.log(\`見つかった注文数: \${response.result.offers.length}\`);

  for (const offer of response.result.offers) {
    const getsUSD = offer.TakerGets.value || offer.TakerGets;
    const paysXAH =
      typeof offer.TakerPays === "string"
        ? Number(offer.TakerPays) / 1_000_000
        : offer.TakerPays.value;

    console.log(\`アカウント: \${offer.Account}\`);
    console.log(\`  売り: \${getsUSD} EVR\`);
    console.log(\`  希望: \${paysXAH} XAH\`);
    console.log(\`  Sequence: \${offer.Sequence}\`);
  }

  await client.disconnect();
}

viewOrderBook();`,
            ko: `const { Client } = require("xahau");

async function viewOrderBook() {
 // 이 예제는 DEX 활동이 더 활발할 가능성이 높은 Xahau Mainnet에 연결합니다.
  const client = new Client("wss://xahau.network");
  await client.connect();

  const issuerAddress = "rEvernodee8dJLaFsujS6q1EiXvZYmHXr8";

  // 오퍼 조회: 누가 EVR을 XAH와 교환해 판매 중인가?
  const response = await client.request({
    command: "book_offers",
    taker_pays: {
      currency: "XAH",
    },
    taker_gets: {
      currency: "EVR",
      issuer: issuerAddress,
    },
    limit: 10,
  });

  console.log("=== 오더북: EVR → XAH ===");
  console.log(\`발견된 오퍼 수: \${response.result.offers.length}\`);

  for (const offer of response.result.offers) {
    const getsUSD = offer.TakerGets.value || offer.TakerGets;
    const paysXAH =
      typeof offer.TakerPays === "string"
        ? Number(offer.TakerPays) / 1_000_000
        : offer.TakerPays.value;

    console.log(\`계정: \${offer.Account}\`);
    console.log(\`  판매: \${getsUSD} EVR\`);
    console.log(\`  희망 수령: \${paysXAH} XAH\`);
    console.log(\`  Sequence: \${offer.Sequence}\`);
  }

  await client.disconnect();
}

viewOrderBook();`,
            zh: `const { Client } = require("xahau");

async function viewOrderBook() {
 // 此示例连接到 Xahau Mainnet，因为那里的 DEX 更可能有活跃订单。
  const client = new Client("wss://xahau.network");
  await client.connect();

  const issuerAddress = "rEvernodee8dJLaFsujS6q1EiXvZYmHXr8";

  // 查询挂单：谁在用 EVR 换取 XAH？
  const response = await client.request({
    command: "book_offers",
    taker_pays: {
      currency: "XAH",
    },
    taker_gets: {
      currency: "EVR",
      issuer: issuerAddress,
    },
    limit: 10,
  });

  console.log("=== 订单簿: EVR → XAH ===");
  console.log(\`找到的挂单数: \${response.result.offers.length}\`);

  for (const offer of response.result.offers) {
    const getsUSD = offer.TakerGets.value || offer.TakerGets;
    const paysXAH =
      typeof offer.TakerPays === "string"
        ? Number(offer.TakerPays) / 1_000_000
        : offer.TakerPays.value;

    console.log(\`账户: \${offer.Account}\`);
    console.log(\`  卖出: \${getsUSD} EVR\`);
    console.log(\`  想要: \${paysXAH} XAH\`);
    console.log(\`  Sequence: \${offer.Sequence}\`);
  }

  await client.disconnect();
}

viewOrderBook();`,
          },
        },
        {
          title: {
            es: "Crear una oferta en el DEX (vender 100 Tokens por XAH)",
            pt: "Criar uma oferta no DEX (vender 100 Tokens por XAH)",
            en: "Create an offer on the DEX (sell 100 Tokens for XAH)",
            jp: "DEXに注文を出す（100トークンをXAHで売る）",
            ko: "DEX에 오퍼 생성 (100 토큰을 XAH로 판매)",
            zh: "在 DEX 上创建订单（卖出 100 个代币换取 XAH）",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
const { Client, Wallet, xahToDrops } = require("xahau");

// Si token_currency > 3 chars, convertir a hex de 40 (relleno con 0)
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3 o menos: standard currency code
  if (cur.length <= 3) return cur;

  // >3: convertir a hex y pad a 40 (20 bytes) con 0 a la derecha
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency demasiado largo: "\${cur}" -> hex \${hex.length} (>40). Máx ~20 bytes en UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";

  const token_currency = normalizeCurrency(tokenCurrencyInput);


  // Vender 100 Token a cambio de 50 XAH
  const offer = {
    TransactionType: "OfferCreate",
    Account: trader.address,
    // Lo que quiero recibir: 50 XAH
    TakerPays: xahToDrops(50),
    // Lo que estoy dispuesto a dar: 100 Tokens
    TakerGets: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "100",
    },
  };

  const prepared = await client.autofill(offer);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Oferta creada en el DEX!");
    console.log(\`Vendiendo 100 Tokens por 50 XAH (0.5 XAH/Token)\`);
    console.log(\`Sequence de la oferta: \${prepared.Sequence}\`);
  }

  await client.disconnect();
}

createOffer();`,
            pt: `require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
const { Client, Wallet, xahToDrops } = require("xahau");
// Se token_currency > 3 caracteres, converter para hex de 40 (preenchido com 0)
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;
  const cur = token_currency.trim();
  // 3 ou menos: standard currency code
  if (cur.length <= 3) return cur;
  // >3: converter a hex e pad a 40 (20 bytes) com 0 à direita
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();
  if (hex.length > 40) {
    throw new Error(
      \`token_currency demasiado largo: "\${cur}" -> hex \${hex.length} (>40). Máx ~20 bytes em UTF-8.\`
    );
  }
  return hex.padEnd(40, "0");
}
async function criateOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";
  const token_currency = normalizeCurrency(tokenCurrencyInput);
  // Vender 100 Token a alteração de 50 XAH
  const offer = {
    TransactionType: "OfferCreate",
    Account: trader.address,
    // O que quero receber: 50 XAH
    TakerPays: xahToDrops(50),
    // O que estou disposto a dar: 100 tokens
    TakerGets: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "100",
    },
  };
  const prepared = await client.autofill(offer);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Oferta criada no DEX!");
    console.log(\`Vendiendo 100 Tokens por 50 XAH (0.5 XAH/Token)\`);
    console.log(\`Sequence da oferta: \${prepared.Sequence}\`);
  }
  await client.disconnect();
}
criateOffer();`,
            en: `require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
const { Client, Wallet, xahToDrops } = require("xahau");

// If token_currency > 3 chars, convert to 40 hex
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3 or less: standard currency code
  if (cur.length <= 3) return cur;

  // >3: convert to hex and pad to 40 (20 bytes) with 0 on the right
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). Max ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}


async function createOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";

  const token_currency = normalizeCurrency(tokenCurrencyInput);

  // Sell 100 Tokens in exchange for 50 XAH
  const offer = {
    TransactionType: "OfferCreate",
    Account: trader.address,
    // What I want to receive: 50 XAH
    TakerPays: xahToDrops(50),
    // What I am willing to give: 100 Tokens
    TakerGets: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "100",
    },
  };

  const prepared = await client.autofill(offer);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Offer created on the DEX!");
    console.log(\`Selling 100 Tokens for 50 XAH (0.5 XAH/Token)\`);
    console.log(\`Offer Sequence: \${prepared.Sequence}\`);
  }

  await client.disconnect();
}

createOffer();`,
            jp: `require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
const { Client, Wallet, xahToDrops } = require("xahau");

// token_currencyが3文字超の場合、40文字のhex（右側0埋め）に変換
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3文字以下：標準通貨コード
  if (cur.length <= 3) return cur;

  // 3文字超：hexに変換して40文字（20バイト）に右側0埋め
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currencyが長すぎます: "\${cur}" -> hex \${hex.length} (>40). 最大〜20バイト（UTF-8）.\`
    );
  }

  return hex.padEnd(40, "0");
}


async function createOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";

  const token_currency = normalizeCurrency(tokenCurrencyInput);

  // 100トークンを50 XAHと引き換えに売る
  const offer = {
    TransactionType: "OfferCreate",
    Account: trader.address,
    // 受け取りたいもの：50 XAH
    TakerPays: xahToDrops(50),
    // 提供するもの：100トークン
    TakerGets: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "100",
    },
  };

  const prepared = await client.autofill(offer);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("DEXに注文を出しました！");
    console.log(\`100トークンを50 XAHで売ります（0.5 XAH/トークン）\`);
    console.log(\`注文のSequence: \${prepared.Sequence}\`);
  }

  await client.disconnect();
}

createOffer();`,
            ko: `require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)");
const { Client, Wallet, xahToDrops } = require("xahau");

// token_currency가 3자를 넘으면 40자리 hex로 변환
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();
  if (cur.length <= 3) return cur;

  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency가 너무 깁니다: "\${cur}" -> hex \${hex.length} (>40). 최대 약 20 bytes (UTF-8).\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";
  const token_currency = normalizeCurrency(tokenCurrencyInput);

  // 100 토큰을 50 XAH에 판매
  const offer = {
    TransactionType: "OfferCreate",
    Account: trader.address,
    // 받고 싶은 것: 50 XAH
    TakerPays: xahToDrops(50),
    // 내가 주는 것: 100 토큰
    TakerGets: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "100",
    },
  };

  const prepared = await client.autofill(offer);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("DEX에 오퍼를 생성했습니다!");
    console.log(\`100 토큰을 50 XAH에 판매합니다 (0.5 XAH/토큰)\`);
    console.log(\`오퍼 Sequence: \${prepared.Sequence}\`);
  }

  await client.disconnect();
}

createOffer();`,
            zh: `require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
const { Client, Wallet, xahToDrops } = require("xahau");

// 如果 token_currency 超过 3 个字符，则转成 40 位十六进制
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();
  if (cur.length <= 3) return cur;

  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency 太长: "\${cur}" -> hex \${hex.length} (>40). UTF-8 最多约 20 bytes。\`
    );
  }

  return hex.padEnd(40, "0");
}


async function createOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";

  const token_currency = normalizeCurrency(tokenCurrencyInput);

  // 卖出 100 个代币，换取 50 XAH
  const offer = {
    TransactionType: "OfferCreate",
    Account: trader.address,
    // 我想收到的：50 XAH
    TakerPays: xahToDrops(50),
    // 我愿意给出的：100 个代币
    TakerGets: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "100",
    },
  };

  const prepared = await client.autofill(offer);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("DEX 订单已创建！");
    console.log(\`卖出 100 个代币，换取 50 XAH（0.5 XAH/代币）\`);
    console.log(\`订单 Sequence: \${prepared.Sequence}\`);
  }

  await client.disconnect();
}

createOffer();`,
          },
        },
        {
          title: {
            es: "Cancelar una oferta existente en el DEX",
            pt: "Cancelar uma oferta existente no DEX",
            en: "Cancel an existing offer on the DEX",
            jp: "DEXの既存注文をキャンセルする",
            ko: "DEX의 기존 오퍼 취소",
            zh: "取消 DEX 上已有的订单",
          },
          language: "javascript",
          code: {
            es: `// Archivo: cancel-offer.js
// node cancel-offer.js <OfferSequence>
require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
const { Client, Wallet } = require("xahau");
const offerSequence = Number(process.argv[2]);
if (!Number.isInteger(offerSequence) || offerSequence <= 0) {
  throw new Error("Pasa el Sequence de la oferta a cancelar (lo imprime el script que crea la oferta): node cancel-offer.js <OfferSequence>");
}

async function cancelOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  // Cancelar una oferta usando su OfferSequence
  const cancel = {
    TransactionType: "OfferCancel",
    Account: trader.address,
    OfferSequence: offerSequence,
  };

  const prepared = await client.autofill(cancel);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Oferta cancelada con éxito!");
    console.log("Dirección del trader:", trader.address);
  }

  await client.disconnect();
}

cancelOffer();`,
            pt: `// Arquivo: cancel-offer.js
// node cancel-offer.js <OfferSequence>
require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
const { Client, Wallet } = require("xahau");
const offerSequence = Number(process.argv[2]);
if (!Number.isInteger(offerSequence) || offerSequence <= 0) {
  throw new Error("Passe o Sequence da oferta a cancelar (o script que cria a oferta o imprime): node cancel-offer.js <OfferSequence>");
}
async function cancelOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});
  // Cancelar uma oferta usando sua OfferSequence
  const cancel = {
    TransactionType: "OfferCancel",
    Account: trader.address,
    OfferSequence: offerSequence,
  };
  const prepared = await client.autofill(cancel);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Oferta cancelada com sucesso!");
    console.log("Endereço do trader:", trader.address);
  }
  await client.disconnect();
}
cancelOffer();`,
            en: `// File: cancel-offer.js
// node cancel-offer.js <OfferSequence>
require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
const { Client, Wallet } = require("xahau");
const offerSequence = Number(process.argv[2]);
if (!Number.isInteger(offerSequence) || offerSequence <= 0) {
  throw new Error("Pass the Sequence of the offer to cancel (the create-offer script prints it): node cancel-offer.js <OfferSequence>");
}

async function cancelOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  // Cancel an offer using its OfferSequence
  const cancel = {
    TransactionType: "OfferCancel",
    Account: trader.address,
    OfferSequence: offerSequence,
  };

  const prepared = await client.autofill(cancel);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Offer cancelled successfully!");
    console.log("Address of the trader:", trader.address);

  }

  await client.disconnect();
}

cancelOffer();`,
            jp: `// ファイル: cancel-offer.js
// node cancel-offer.js <OfferSequence>
require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
const { Client, Wallet } = require("xahau");
const offerSequence = Number(process.argv[2]);
if (!Number.isInteger(offerSequence) || offerSequence <= 0) {
  throw new Error("キャンセルする注文の Sequence を渡してください（注文作成スクリプトが表示します）: node cancel-offer.js <OfferSequence>");
}

async function cancelOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  // OfferSequenceを使って注文をキャンセルする
  const cancel = {
    TransactionType: "OfferCancel",
    Account: trader.address,
    OfferSequence: offerSequence,
  };

  const prepared = await client.autofill(cancel);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("注文を正常にキャンセルしました！");
    console.log("トレーダーのアドレス:", trader.address);

  }

  await client.disconnect();
}

cancelOffer();`,
            ko: `// 파일: cancel-offer.js
// node cancel-offer.js <OfferSequence>
require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)");
const { Client, Wallet } = require("xahau");
const offerSequence = Number(process.argv[2]);
if (!Number.isInteger(offerSequence) || offerSequence <= 0) {
  throw new Error("취소할 오퍼의 Sequence를 전달하세요 (오퍼 생성 스크립트가 출력합니다): node cancel-offer.js <OfferSequence>");
}

async function cancelOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  // OfferSequence를 사용해 오퍼 취소
  const cancel = {
    TransactionType: "OfferCancel",
    Account: trader.address,
    OfferSequence: offerSequence,
  };

  const prepared = await client.autofill(cancel);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("오퍼가 성공적으로 취소되었습니다!");
    console.log("트레이더 주소:", trader.address);
  }

  await client.disconnect();
}

cancelOffer();`,
            zh: `// 文件: cancel-offer.js
// node cancel-offer.js <OfferSequence>
require("dotenv").config();
if (!process.env.RESERVE_SEED) throw new Error("RESERVE_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
const { Client, Wallet } = require("xahau");
const offerSequence = Number(process.argv[2]);
if (!Number.isInteger(offerSequence) || offerSequence <= 0) {
  throw new Error("请传入要取消的订单的 Sequence（创建订单的脚本会打印）：node cancel-offer.js <OfferSequence>");
}

async function cancelOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  // 使用 OfferSequence 取消订单
  const cancel = {
    TransactionType: "OfferCancel",
    Account: trader.address,
    OfferSequence: offerSequence,
  };

  const prepared = await client.autofill(cancel);
  const signed = trader.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("订单已成功取消！");
    console.log("交易者地址:", trader.address);
  }

  await client.disconnect();
}

cancelOffer();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "DEX nativo de Xahau", pt: "DEX nativo da Xahau", en: "Xahau native DEX", jp: "XahauネイティブDEX", ko: "Xahau 네이티브 DEX", zh: "Xahau 原生 DEX" },
          content: {
            es: "Exchange descentralizado integrado en el protocolo\n\n• Sin smart contracts\n• Sin plataformas externas\n• Liquidación atómica\n• Auto-bridging a través de XAH\n\nTodo con transacciones nativas",
            pt: "Exchange descentralizado integrado no protocolo\n\n• Sem smart contracts\n• Sem plataformas externas\n• Liquidação atômica\n• Auto-bridging por meio de XAH\n\nTudo com transações nativas",
            en: "Decentralized exchange built into the protocol\n\n• No smart contracts\n• No external platforms\n• Atomic settlement\n• Auto-bridging through XAH\n\nAll with native transactions",
            jp: "プロトコルに組み込まれた分散型取引所\n\n• スマートコントラクト不要\n• 外部プラットフォーム不要\n• アトミック決済\n• XAHを通じたオートブリッジング\n\nすべてネイティブトランザクションで",
            ko: "프로토콜에 내장된 탈중앙화 거래소\n\n• 스마트 컨트랙트 불필요\n• 외부 플랫폼 불필요\n• 원자적 결제\n• XAH를 통한 자동 브리징\n\n모두 네이티브 트랜잭션으로 동작",
            zh: "集成在协议中的去中心化交易所\n\n• 不需要智能合约\n• 不需要外部平台\n• 原子结算\n• 通过 XAH 自动桥接\n\n全部使用原生交易完成",
          },
          visual: "📈",
        },
        {
          title: { es: "OfferCreate: anatomía de una orden", pt: "OfferCreate: anatomia de uma ordem", en: "OfferCreate: anatomy of an order", jp: "OfferCreate：注文の構造", ko: "OfferCreate: 주문 구조", zh: "OfferCreate：订单结构" },
          content: {
            es: "TakerPays → Lo que quieres RECIBIR\nTakerGets → Lo que estás dispuesto a DAR\n\nFlags especiales:\n• tfImmediateOrCancel → Ejecutar o cancelar\n• tfPassive → Solo match existente\n• tfFillOrKill → Ejecutar todo o nada\n• tfSell → Recibe tanto como la cantidad de TakerGets\n\nOfferCancel → Cancelar orden abierta",
            pt: "TakerPays → O que você quer RECEBER\nTakerGets → O que você está disposto a DAR\n\nFlags especiais:\n• tfImmediateOrCancel → Executar ou cancelar\n• tfPassive → Apenas match existente\n• tfFillOrKill → Executar tudo ou nada\n• tfSell → Recebe tanto como a quantidade de TakerGets\n\nOfferCancel → Cancelar ordem aberta",
            en: "TakerPays -> What you want to RECEIVE\nTakerGets -> What you are willing to GIVE\n\nSpecial flags:\n• tfImmediateOrCancel -> Execute or cancel\n• tfPassive -> Only match existing\n• tfFillOrKill -> Execute all or nothing\n• tfSell -> Receive as much as TakerGets amount\n\nOfferCancel -> Cancel open order",
            jp: "TakerPays -> 受け取りたいもの\nTakerGets -> 提供する意思があるもの\n\n特殊フラグ：\n• tfImmediateOrCancel -> 実行またはキャンセル\n• tfPassive -> 既存注文にのみマッチ\n• tfFillOrKill -> 全量実行またはキャンセル\n• tfSell -> 可能な限り多くの金額を受け取る\n\nOfferCancel -> 未決注文をキャンセル",
            ko: "TakerPays → 내가 받고 싶은 것\nTakerGets → 내가 내놓을 것\n\n특수 플래그:\n• tfImmediateOrCancel → 즉시 실행 아니면 취소\n• tfPassive → 기존 주문과만 매칭\n• tfFillOrKill → 전량 체결 아니면 취소\n• tfSell → TakerGets 전량 기준으로 매도\n\nOfferCancel → 열린 주문 취소",
            zh: "TakerPays → 你想收到的东西\nTakerGets → 你愿意给出的东西\n\n特殊标志：\n• tfImmediateOrCancel → 立即执行否则取消\n• tfPassive → 只与现有订单撮合\n• tfFillOrKill → 全部成交否则取消\n• tfSell → 以 TakerGets 全量为基准卖出\n\nOfferCancel → 取消未成交订单",
          },
          visual: "🔄",
        },
        {
          title: { es: "Auto-bridging y order book", pt: "Auto-bridging e order book", en: "Auto-bridging and order book", jp: "オートブリッジングと注文書", ko: "자동 브리징과 오더북", zh: "自动桥接与订单簿" },
          content: {
            es: "El DEX enruta trades multi-salto vía XAH\n\nEjemplo: USD → XAH → EUR\n\n• book_offers → Ver el libro de órdenes\n• Bids y Asks se cruzan automáticamente\n• Ejecución parcial o total\n• Liquidez compartida entre pares",
            pt: "O DEX roteia trades multi-hop via XAH\n\nExemplo: USD → XAH → EUR\n\n• book_offers → Ver o livro de ordens\n• Bids e Asks se cruzam automaticamente\n• Execução parcial ou total\n• Liquidez compartida entre pares",
            en: "The DEX routes multi-hop trades via XAH\n\nExample: USD -> XAH -> EUR\n\n• book_offers -> View the order book\n• Bids and Asks cross automatically\n• Partial or full execution\n• Shared liquidity across pairs",
            jp: "DEXはXAHを経由してマルチホップ取引をルーティング\n\n例：USD -> XAH -> EUR\n\n• book_offers -> 注文書を表示\n• BidsとAsksが自動的に交差\n• 部分または全量実行\n• ペア間で流動性を共有",
            ko: "DEX는 XAH를 통해 멀티홉 거래를 라우팅함\n\n예: USD → XAH → EUR\n\n• book_offers → 오더북 보기\n• 매수/매도 주문 자동 매칭\n• 부분 또는 전량 체결\n• 거래쌍 간 유동성 공유",
            zh: "DEX 会通过 XAH 路由多跳交易\n\n示例：USD → XAH → EUR\n\n• book_offers → 查看订单簿\n• 买单和卖单会自动撮合\n• 可部分成交或完全成交\n• 不同交易对之间共享流动性",
          },
          visual: "🌐",
        },
      ],
    },
    {
      id: "m6l4",
      title: {
        es: "Control avanzado de tokens: Freeze y Clawback",
        pt: "Controle avançado de tokens: Freeze e Clawback",
        en: "Advanced token control: Freeze and Clawback",
        jp: "高度なトークン制御：FreezeとClawback",
        ko: "고급 토큰 제어: Freeze와 Clawback",
        zh: "高级代币控制：Freeze 与 Clawback",
      },
      theory: {
        es: `Xahau ofrece a los emisores de tokens herramientas avanzadas de control: **Freeze** (congelación), **Clawback** (recuperación forzada), **Transfer fees** (comisiones de transferencia) y **Authorized TrustLines** (líneas de confianza autorizadas).

### Freeze: congelar líneas de confianza

El emisor de un token puede congelar TrustLines para impedir que los holders transfieran sus tokens. Hay tres niveles:

### Freeze individual
Congela una TrustLine específica entre el emisor y un holder. Se hace con \`TrustSet\` usando el flag \`tfSetFreeze\`. El holder no podrá enviar ni recibir ese token mientras esté congelado. Para descongelar, se usa \`tfClearFreeze\`.

### Global Freeze
Congela **todas** las TrustLines de tu token emitido. Se activa con \`AccountSet\` usando \`SetFlag: 7\` (asfGlobalFreeze). Todos los holders quedan congelados simultáneamente. Se puede desactivar con \`ClearFlag: 7\`.

### NoFreeze (irreversible)
Al activar \`SetFlag: 6\` (asfNoFreeze) en \`AccountSet\`, el emisor renuncia **permanentemente** a la capacidad de congelar. Esto no se puede deshacer. Es una señal de confianza para los holders.

### Casos de uso para Freeze
- **Cumplimiento regulatorio**: Congelar fondos ante una orden judicial
- **Brechas de seguridad**: Detener transferencias si una cuenta es comprometida
- **Resolución de disputas**: Congelar temporalmente mientras se investiga

### Clawback: recuperar tokens de holders

El **Clawback** permite al emisor reclamar tokens de vuelta desde cualquier holder. Es una herramienta poderosa que debe configurarse **antes** de emitir tokens:

1. Activar \`asfAllowTrustLineClawback\` (flag 17) con \`AccountSet\` **antes** de crear cualquier TrustLine
2. Una vez activado, usar la transacción \`Clawback\` para reclamar tokens
3. **No se puede combinar** con NoFreeze — si renuncias a congelar, no puedes hacer clawback

### Transfer fees: comisiones en transferencias

El emisor puede cobrar un porcentaje en cada transferencia de su token entre terceros:

- Se configura con el campo \`TransferRate\` en \`AccountSet\`
- El valor es un entero: 1000000000 = 0%, 1001000000 = 0.1%, 1010000000 = 1%
- Solo aplica en transferencias entre terceros, no cuando envías al emisor
- Ejemplo: Con 0.1% de fee, al enviar 100 tokens se cobran 99.9 del receptor

### Authorized TrustLines: RequireAuth

El flag \`RequireAuth\` (asfRequireAuth) en la cuenta emisora requiere que el emisor **autorice explícitamente** cada TrustLine antes de que un holder pueda recibir tokens. Útil para tokens que necesitan KYC o verificación previa.

### Ejecutar los scripts de esta lección

El primer script firma con \`FROZEN_SEED\` y crea la TrustLine del holder; el segundo firma con \`ISSUER_SEED\` y la congela. \`create-accounts.js\` ([módulo 3](?m=3&l=1)) crea las dos cuentas, y los dos scripts leen de \`.env\` la dirección de la otra parte. Ejecútalos en este orden. Salida en testnet:

\`\`\`
Result: tesSUCCESS
TrustLine created!
Holder: r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
Issuer: rDSFWxUH586ztyZ25SwUZzvArdicYJf82z

Result: tesSUCCESS
Token TrustLine frozen for r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
The holder cannot send or receive this token
\`\`\`

- **Primer \`tesSUCCESS\`**: el holder tiene ahora una TrustLine hacia ISSUER para el token. Un freeze se aplica a una TrustLine, así que primero tiene que existir.
- **Segundo \`tesSUCCESS\`**: el emisor activó el freeze en su lado de esa línea. El holder aún puede devolver el token al emisor, pero no enviarlo a nadie más.`,
        pt: `A Xahau oferece aos emissores de tokens ferramentas avançadas de controle: **Freeze** (congelamento), **Clawback** (recuperação forçada), **Transfer fees** (taxas de transferência) e **Authorized TrustLines** (linhas de confiança autorizadas).
### Freeze: congelar linhas de confiança
O emissor de um token pode congelar TrustLines para impedir que os holders transfiram seus tokens. Há três níveis:
### Freeze individual
Congela uma TrustLine específica entre o emissor e um holder. É feito com \`TrustSet\` usando o flag \`tfSetFreeze\`. O holder não poderá enviar nem receber esse token enquanto estiver congelado. Para descongelar, se usa \`tfClearFreeze\`.
### Global Freeze
Congela **todas** as TrustLines de seu token emitido. Se ativa com \`AccountSet\` usando \`SetFlag: 7\` (asfGlobalFreeze). Todos os holders ficam congelados simultaneamente. Se pode desativar com \`ClearFlag: 7\`.
### NoFreeze (irreversível)
Ao ativar \`SetFlag: 6\` (asfNoFreeze) em \`AccountSet\`, o emissor renuncia **permanentemente** à capacidade de congelar. Isso não pode ser desfeito. É um sinal de confiança para os holders.
### Casos de uso para Freeze
- **Conformidade regulatória**: Congelar fundos diante de uma ordem judicial
- **Brechas de segurança**: Deter transferências se uma conta é comprometida
- **Resolução de disputas**: congelar temporariamente enquanto se investiga
### Clawback: recuperar tokens de holders
O **Clawback** permite ao emissor recuperar tokens de qualquer holder. É uma ferramenta poderosa que deve ser configurada **antes** de emitir tokens:
1. Ativar \`asfAllowTrustLineClawback\` (flag 17) com \`AccountSet\` **antes** de criar qualquer TrustLine
2. Uma vez ativado, usar a transação \`Clawback\` para reclamar tokens
3. **Não é possível combinar** com NoFreeze — se você renuncia a congelar, você não pode fazer clawback
### Transfer fees: taxas sobre transferências
O emissor pode cobrar um percentual em cada transferência de seu token entre terceiros:
- É configurada com o campo \`TransferRate\` em \`AccountSet\`
- O valor é um inteiro: 1000000000 = 0%, 1001000000 = 0.1%, 1010000000 = 1%
- Só se aplica em transferências entre terceiros, não quando você envia ao emissor
- Exemplo: Com 0.1% de fee, ao enviar 100 tokens é cobradon 99.9 do receptor
### Authorized TrustLines: RequireAuth
O flag \`RequireAuth\` (asfRequireAuth) na conta emissora exige que o emissor **autorize explicitamente** cada TrustLine antes que um holder possa receber tokens. Útil para tokens que precisam de KYC ou verificação prévia.

### Executar os scripts desta lição

O primeiro script assina com \`FROZEN_SEED\` e cria a TrustLine do holder; o segundo assina com \`ISSUER_SEED\` e a congela. \`create-accounts.js\` ([módulo 3](?m=3&l=1)) cria as duas contas, e os dois scripts leem do \`.env\` o endereço da outra parte. Execute-os nesta ordem. Saída na testnet:

\`\`\`
Result: tesSUCCESS
TrustLine created!
Holder: r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
Issuer: rDSFWxUH586ztyZ25SwUZzvArdicYJf82z

Result: tesSUCCESS
Token TrustLine frozen for r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
The holder cannot send or receive this token
\`\`\`

- **Primeiro \`tesSUCCESS\`**: o holder agora tem uma TrustLine para o ISSUER para o token. Um freeze se aplica a uma TrustLine, então ela precisa existir antes.
- **Segundo \`tesSUCCESS\`**: o emissor ativou o freeze do seu lado dessa linha. O holder ainda pode devolver o token ao emissor, mas não enviá-lo a mais ninguém.`,
        en: `Xahau offers token issuers advanced control tools: **Freeze** (freezing), **Clawback** (forced recovery), **Transfer fees**, and **Authorized TrustLines**.

### Freeze: freezing trust lines

The issuer of a token can freeze TrustLines to prevent holders from transferring their tokens. There are three levels:

### Individual Freeze
Freezes a specific TrustLine between the issuer and a holder. This is done with \`TrustSet\` using the \`tfSetFreeze\` flag. The holder will not be able to send or receive that token while it is frozen. To unfreeze, use \`tfClearFreeze\`.

### Global Freeze
Freezes **all** TrustLines of your issued token. It is activated with \`AccountSet\` using \`SetFlag: 7\` (asfGlobalFreeze). All holders are frozen simultaneously. It can be deactivated with \`ClearFlag: 7\`.

### NoFreeze (irreversible)
By activating \`SetFlag: 6\` (asfNoFreeze) in \`AccountSet\`, the issuer **permanently** renounces the ability to freeze. This cannot be undone. It is a signal of trust for holders.

### Use cases for Freeze
- **Regulatory compliance**: Freeze funds in response to a court order
- **Security breaches**: Stop transfers if an account is compromised
- **Dispute resolution**: Temporarily freeze while investigating

### Clawback: recovering tokens from holders

**Clawback** allows the issuer to reclaim tokens from any holder. It is a powerful tool that must be configured **before** issuing tokens:

1. Activate \`asfAllowTrustLineClawback\` (flag 17) with \`AccountSet\` **before** creating any TrustLine
2. Once activated, use the \`Clawback\` transaction to reclaim tokens
3. **Cannot be combined** with NoFreeze — if you renounce freezing, you cannot clawback

### Transfer fees: commissions on transfers

The issuer can charge a percentage on each transfer of their token between third parties:

- Configured with the \`TransferRate\` field in \`AccountSet\`
- The value is an integer: 1000000000 = 0%, 1001000000 = 0.1%, 1010000000 = 1%
- Only applies to transfers between third parties, not when sending to the issuer
- Example: With a 0.1% fee, sending 100 tokens receives 99.9 tokens from the receiver (charges 0.1 from the receiver)

### Authorized TrustLines: RequireAuth

The \`RequireAuth\` flag (asfRequireAuth) on the issuing account requires the issuer to **explicitly authorize** each TrustLine before a holder can receive tokens. Useful for tokens that need KYC or prior verification.

### Run this lesson's scripts

The first script signs with \`FROZEN_SEED\` and creates the holder's TrustLine; the second signs with \`ISSUER_SEED\` and freezes it. \`create-accounts.js\` ([Module 3](?m=3&l=1)) creates both accounts, and both scripts read the other side's address from \`.env\`. Run them in this order. Output on testnet:

\`\`\`
Result: tesSUCCESS
TrustLine created!
Holder: r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
Issuer: rDSFWxUH586ztyZ25SwUZzvArdicYJf82z

Result: tesSUCCESS
Token TrustLine frozen for r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
The holder cannot send or receive this token
\`\`\`

- **First \`tesSUCCESS\`**: the holder now has a TrustLine to ISSUER for the token. A freeze applies to a TrustLine, so there must be one first.
- **Second \`tesSUCCESS\`**: the issuer set the freeze flag on its side of that line. The holder can still send the token back to the issuer, but not to anyone else.`,
        jp: `Xahauはトークン発行者に**Freeze**（凍結）、**Clawback**（強制回収）、**Transfer fees**（転送手数料）、**Authorized TrustLines**（承認済みトラストライン）のような高度な制御ツールを提供します。

### Freeze：トラストラインの凍結

トークンの発行者はトラストラインを凍結して、ホルダーがトークンを転送できないようにすることができます。次の3つのレベルがあります。

### 個別Freeze
発行者とホルダー間の特定のトラストラインを凍結します。\`tfSetFreeze\`フラグを使った\`TrustSet\`で行います。凍結中はホルダーそのトークンを送受信できません。解除するには\`tfClearFreeze\`を使います。

### グローバルFreeze
発行したトークンの**すべての**トラストラインを凍結します。\`SetFlag: 7\`（asfGlobalFreeze）を使った\`AccountSet\`で有効化します。すべてのホルダーが同時に凍結されます。\`ClearFlag: 7\`で解除できます。

### NoFreeze（取り消し不能）
\`AccountSet\`で\`SetFlag: 6\`（asfNoFreeze）を有効化すると、発行者は凍結能力を**恒久的**に放棄します。これは取り消せません。ホルダーへの信頼のシグナルです。

### Freezeのユースケース
- **規制遵守**: 裁判所命令に応じて資金を凍結
- **セキュリティ侵害**: アカウントが侵害された場合に転送を停止
- **紛争解決**: 調査中に一時的に凍結

### Clawback：ホルダーからのトークン回収

**Clawback**は発行者が任意のホルダーからトークンを回収できるようにします。これは強力なツールで、トークン発行**前**に設定する必要があります。

1. \`AccountSet\`で\`asfAllowTrustLineClawback\`（フラグ17）を**トラストライン作成前**に有効化する
2. 有効化後、\`Clawback\`トランザクションを使ってトークンを回収する
3. **NoFreezeとは組み合わせ不可** — 凍結を放棄した場合、Clawbackもできません

### Transfer fees：転送手数料

発行者は第三者間のトークン転送ごとに割合を徴収できます。

- \`AccountSet\`の\`TransferRate\`フィールドで設定
- 値は整数で指定：1000000000 = 0%、1001000000 = 0.1%、1010000000 = 1%
- 発行者への送信時ではなく、第三者間の転送にのみ適用
- 例：0.1%の手数料で100トークン送信すると、受信者に99.9トークンが入金され（受信者から0.1が徴収される）

### Authorized TrustLines：RequireAuth

発行アカウントの\`RequireAuth\`フラグ（asfRequireAuth）は、ホルダーがトークンを受け取れるようになる前に、発行者が**各トラストラインを明示的に承認**することを要求します。KYCや事前確認が必要なトークンに便利です。

### このレッスンのスクリプトを実行する

1つ目のスクリプトは \`FROZEN_SEED\` で署名して保有者の TrustLine を作成し、2つ目は \`ISSUER_SEED\` で署名してそれを凍結します。両方のアカウントは\`create-accounts.js\`（[モジュール3](?m=3&l=1)）が作成し、各スクリプトは相手側のアドレスを \`.env\` から読み取ります。この順番で実行してください。テストネットでの出力:

\`\`\`
Result: tesSUCCESS
TrustLine created!
Holder: r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
Issuer: rDSFWxUH586ztyZ25SwUZzvArdicYJf82z

Result: tesSUCCESS
Token TrustLine frozen for r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
The holder cannot send or receive this token
\`\`\`

- **1つ目の \`tesSUCCESS\`**: 保有者はトークンについて ISSUER への TrustLine を持ちました。凍結は TrustLine に対して行うため、先に TrustLine が必要です。
- **2つ目の \`tesSUCCESS\`**: 発行者がそのラインの自分側に凍結フラグを設定しました。保有者はトークンを発行者に返すことはできますが、他の誰にも送れません。`,
        ko: `일부 발행자는 규정 준수나 운영상 이유로 더 강한 통제 기능이 필요합니다. Xahau는 **Freeze**와 **Clawback** 같은 고급 제어 기능을 제공합니다.

### 주요 기능

- **Freeze**: 특정 TrustLine 또는 토큰 사용을 제한
- **Global Freeze**: 전체 발행 토큰 흐름을 광범위하게 제한
- **Clawback**: 특정 조건에서 토큰을 회수

### 왜 민감한가?

이 기능들은 강력하지만 사용자 신뢰와 직결됩니다. 발행자는 언제, 왜, 어떤 범위로 사용할지 명확한 정책을 가져야 하며, 사용자도 해당 토큰의 중앙화 수준을 이해해야 합니다.

### 이 레슨의 스크립트 실행

첫 번째 스크립트는 \`FROZEN_SEED\`로 서명해 보유자의 TrustLine을 만들고, 두 번째는 \`ISSUER_SEED\`로 서명해 그 라인을 동결합니다. 두 계정은 \`create-accounts.js\`([모듈 3](?m=3&l=1))가 만들며, 각 스크립트는 상대방 주소를 \`.env\`에서 읽습니다. 이 순서로 실행하세요. 테스트넷 출력:

\`\`\`
Result: tesSUCCESS
TrustLine created!
Holder: r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
Issuer: rDSFWxUH586ztyZ25SwUZzvArdicYJf82z

Result: tesSUCCESS
Token TrustLine frozen for r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
The holder cannot send or receive this token
\`\`\`

- **첫 번째 \`tesSUCCESS\`**: 보유자에게 이제 토큰에 대한 ISSUER 방향 TrustLine이 있습니다. 동결은 TrustLine에 적용되므로 먼저 라인이 있어야 합니다.
- **두 번째 \`tesSUCCESS\`**: 발행자가 그 라인의 자기 쪽에 동결 플래그를 설정했습니다. 보유자는 토큰을 발행자에게 돌려보낼 수는 있지만 다른 누구에게도 보낼 수 없습니다.`,
        zh: `有些发行方出于合规或运营原因，需要更强的控制能力。Xahau 提供了 **Freeze** 和 **Clawback** 等高级控制功能。

### 主要功能

- **Freeze**：限制某条 TrustLine 或代币的使用
- **Global Freeze**：大范围限制整个已发行代币的流动
- **Clawback**：在特定条件下回收代币

### 为什么这很敏感？

这些功能非常强大，也直接影响用户信任。发行方需要明确说明何时、为何以及在多大范围内使用它们，用户也应了解该代币的中心化程度。

### 运行本课的脚本

第一个脚本用 \`FROZEN_SEED\` 签名，创建持有者的 TrustLine；第二个用 \`ISSUER_SEED\` 签名并冻结它。两个账户都由 \`create-accounts.js\`（[模块3](?m=3&l=1)） 创建，每个脚本都从 \`.env\` 读取对方的地址。按这个顺序运行。测试网上的输出：

\`\`\`
Result: tesSUCCESS
TrustLine created!
Holder: r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
Issuer: rDSFWxUH586ztyZ25SwUZzvArdicYJf82z

Result: tesSUCCESS
Token TrustLine frozen for r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
The holder cannot send or receive this token
\`\`\`

- **第一个 \`tesSUCCESS\`**：持有者现在有了针对该代币、指向 ISSUER 的 TrustLine。冻结作用于 TrustLine，所以必须先有一条。
- **第二个 \`tesSUCCESS\`**：发行者在这条线自己的一侧设置了冻结标志。持有者仍可以把代币退回给发行者，但不能发送给其他任何人。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear una TrustLine desde un holder hacia el emisor",
            pt: "Criar uma TrustLine a partir de um holder para o emissor",
            en: "Create a TrustLine from a holder toward the issuer",
            jp: "ホルダーから発行者へのTrustLineを作成する",
            ko: "홀더에서 발행자로 TrustLine 생성",
            zh: "从持有人到发行方创建 TrustLine",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
const { Client, Wallet } = require("xahau");

// Este código crea una TrustLine desde una cuenta (holder)
// hacia un emisor de token. Es necesario para que luego
// el emisor pueda congelar esa TrustLine si lo necesita.

// If token_currency > 3 chars, convert to 40 hex
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3 or less: standard currency code
  if (cur.length <= 3) return cur;

  // >3: convert to hex and pad to 40 (20 bytes) with 0 on the right
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). Max ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createHolderTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // El holder que quiere recibir el token y luego congelaremos su TrustLine si es necesario
  const holder = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";

  const token_currency = normalizeCurrency(tokenCurrencyInput);

  const trustSet = {
    TransactionType: "TrustSet",
    Account: holder.address,
    LimitAmount: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "1000000", // Límite máximo que acepto
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = holder.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡TrustLine creada!");
    console.log("Holder:", holder.address);
    console.log("Emisor:", issuerAddress);
    console.log("\\nAhora el emisor puede enviar el token a esta cuenta.");
    console.log("También puede congelar esta TrustLine si lo necesita.");
  }

  await client.disconnect();
}

createHolderTrustLine();`,
            pt: `require("dotenv").config();
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
const { Client, Wallet } = require("xahau");
// Este código cria uma TrustLine a partir de uma conta (holder)
// para um emissor de token. É necessário para que depois
// o emissor possa congelar essa TrustLine se precisar.
// If token_currency > 3 chars, convert to 40 hex
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;
  const cur = token_currency.trim();
  // 3 or less: standard currency code
  if (cur.length <= 3) return cur;
  // >3: convert to hex and pad to 40 (20 bytes) with 0 on the right
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();
  if (hex.length > 40) {
    throw new Error(
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). Max ~20 bytes in UTF-8.\`
    );
  }
  return hex.padEnd(40, "0");
}
async function criateHolderTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // O holder que quer receber o token; depois a TrustLine dele poderá ser congelada, se necessário
  const holder = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";
  const token_currency = normalizeCurrency(tokenCurrencyInput);
  const trustSet = {
    TransactionType: "TrustSet",
    Account: holder.address,
    LimitAmount: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "1000000", // Limite máximo que aceito
    },
  };
  const prepared = await client.autofill(trustSet);
  const signed = holder.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("TrustLine criada!");
    console.log("Holder:", holder.address);
    console.log("Emissor:", issuerAddress);
    console.log("\\nAhorao emissor pode enviar ou token a esta conta.");
    console.log("Também pode congelar esta TrustLine se precisar.");
  }
  await client.disconnect();
}
criateHolderTrustLine();`,
            en: `require("dotenv").config();
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
const { Client, Wallet } = require("xahau");

// This code creates a TrustLine from an account (holder)
// toward a token issuer. This is required so the issuer
// can later freeze that TrustLine if needed.

// If token_currency > 3 chars, convert to 40 hex
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3 or less: standard currency code
  if (cur.length <= 3) return cur;

  // >3: convert to hex and pad to 40 (20 bytes) with 0 on the right
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). Max ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createHolderTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // The holder who wants to receive the token; their TrustLine can be frozen later if needed
  const holder = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";

  const token_currency = normalizeCurrency(tokenCurrencyInput);

  const trustSet = {
    TransactionType: "TrustSet",
    Account: holder.address,
    LimitAmount: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "1000000", // Maximum limit I accept
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = holder.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("TrustLine created!");
    console.log("Holder:", holder.address);
    console.log("Issuer:", issuerAddress);
    console.log("\\nThe issuer can now send the token to this account.");
    console.log("They can also freeze this TrustLine if needed.");
  }

  await client.disconnect();
}

createHolderTrustLine();`,
            jp: `require("dotenv").config();
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
const { Client, Wallet } = require("xahau");

// このコードはアカウント（ホルダー）からトークン発行者への
// TrustLineを作成します。必要な場合に発行者がそのTrustLineを
// 凍結できるようにするために必要です。

// token_currencyが3文字超の場合、40文字のhex（右側0埋め）に変換
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3文字以下：標準通貨コード
  if (cur.length <= 3) return cur;

  // 3文字超：hexに変換して40文字（20バイト）に右側0埋め
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). Max ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createHolderTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // トークンを受け取り、必要に応じてTrustLineを凍結されるホルダー
  const holder = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";

  const token_currency = normalizeCurrency(tokenCurrencyInput);

  const trustSet = {
    TransactionType: "TrustSet",
    Account: holder.address,
    LimitAmount: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "1000000", // 受け入れる最大限度額
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = holder.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("TrustLineを作成しました！");
    console.log("ホルダー:", holder.address);
    console.log("発行者:", issuerAddress);
    console.log("\\n発行者はこのアカウントにトークンを送れるようになりました。");
    console.log("必要な場合はこのTrustLineを凍結することもできます。");
  }

  await client.disconnect();
}

createHolderTrustLine();`,
            ko: `require("dotenv").config();
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)");
const { Client, Wallet } = require("xahau");

// 이 코드는 계정(홀더)에서 토큰 발행자로 향하는 TrustLine을 생성합니다.
// 이후 발행자가 필요 시 이 TrustLine을 동결할 수 있게 됩니다.

function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();
  if (cur.length <= 3) return cur;

  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();
  if (hex.length > 40) {
    throw new Error(
      \`token_currency가 너무 깁니다: "\${cur}" -> hex \${hex.length} (>40). 최대 약 20 bytes (UTF-8).\`
    );
  }
  return hex.padEnd(40, "0");
}

async function createHolderTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const holder = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";
  const token_currency = normalizeCurrency(tokenCurrencyInput);

  const trustSet = {
    TransactionType: "TrustSet",
    Account: holder.address,
    LimitAmount: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "1000000",
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = holder.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("TrustLine이 생성되었습니다!");
    console.log("홀더:", holder.address);
    console.log("발행자:", issuerAddress);
    console.log("\\n이제 발행자는 이 계정으로 토큰을 보낼 수 있습니다.");
    console.log("필요하다면 이 TrustLine을 동결할 수도 있습니다.");
  }

  await client.disconnect();
}

createHolderTrustLine();`,
            zh: `require("dotenv").config();
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
const { Client, Wallet } = require("xahau");

// 这段代码会从一个账户（持有人）指向代币发行方创建 TrustLine。
// 这样发行方之后在有需要时就可以冻结这条 TrustLine。

function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();
  if (cur.length <= 3) return cur;

  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();
  if (hex.length > 40) {
    throw new Error(
      \`token_currency 太长: "\${cur}" -> hex \${hex.length} (>40). UTF-8 最多约 20 bytes。\`
    );
  }
  return hex.padEnd(40, "0");
}

async function createHolderTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const holder = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";
  const token_currency = normalizeCurrency(tokenCurrencyInput);

  const trustSet = {
    TransactionType: "TrustSet",
    Account: holder.address,
    LimitAmount: {
      currency: token_currency,
      issuer: issuerAddress,
      value: "1000000",
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = holder.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("TrustLine 已创建！");
    console.log("持有人:", holder.address);
    console.log("发行方:", issuerAddress);
    console.log("\\n现在发行方可以向这个账户发送代币。");
    console.log("如有需要，也可以冻结这条 TrustLine。");
  }

  await client.disconnect();
}

createHolderTrustLine();`,
          },
        },
        {
          title: {
            es: "Congelar la TrustLine de un usuario específico",
            pt: "Congelar a TrustLine de um usuário específico",
            en: "Freeze a specific user's TrustLine",
            jp: "特定ユーザーのTrustLineを凍結する",
            ko: "특정 사용자의 TrustLine 동결",
            zh: "冻结某个用户的 TrustLine",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)");
const { Client, Wallet } = require("xahau");

// If token_currency > 3 chars, convert to 40 hex
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3 or less: standard currency code
  if (cur.length <= 3) return cur;

  // >3: convert to hex and pad to 40 (20 bytes) with 0 on the right
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). Max ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function freezeTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const holderAddress = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";

  const token_currency = normalizeCurrency(tokenCurrencyInput);

  // Congelar la TrustLine de USD con este holder
  const trustSet = {
    TransactionType: "TrustSet",
    Account: issuer.address,
    LimitAmount: {
      currency: token_currency,
      issuer: holderAddress,
      value: "0", // No importa el valor para freeze
    },
    Flags: 1048576, // tfSetFreeze
  };

  const prepared = await client.autofill(trustSet);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log(\`TrustLine de USD congelada para \${holderAddress}\`);
    console.log("El holder no puede enviar ni recibir este token");
  }

  await client.disconnect();
}

freezeTrustLine();`,
            pt: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)");
const { Client, Wallet } = require("xahau");
// If token_currency > 3 chars, convert to 40 hex
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;
  const cur = token_currency.trim();
  // 3 or less: standard currency code
  if (cur.length <= 3) return cur;
  // >3: convert to hex and pad to 40 (20 bytes) with 0 on the right
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();
  if (hex.length > 40) {
    throw new Error(
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). Max ~20 bytes in UTF-8.\`
    );
  }
  return hex.padEnd(40, "0");
}
async function freezeTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const holderAddress = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";
  const token_currency = normalizeCurrency(tokenCurrencyInput);
  // Congelar a TrustLine de USD com este holder
  const trustSet = {
    TransactionType: "TrustSet",
    Account: issuer.address,
    LimitAmount: {
      currency: token_currency,
      issuer: holderAddress,
      value: "0", // Não importa o valor para freeze
    },
    Flags: 1048576, // tfSetFreeze
  };
  const prepared = await client.autofill(trustSet);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log(\`TrustLine de USD congelada para \${holderAddress}\`);
    console.log("O holder não pode enviar nem receber esse token");
  }
  await client.disconnect();
}
freezeTrustLine();`,
            en: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED is not in .env: run create-accounts.js first (Module 3, lesson 2)");
const { Client, Wallet } = require("xahau");

// If token_currency > 3 chars, convert to 40 hex
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3 or less: standard currency code
  if (cur.length <= 3) return cur;

  // >3: convert to hex and pad to 40 (20 bytes) with 0 on the right
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). Max ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function freezeTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const holderAddress = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";

  const token_currency = normalizeCurrency(tokenCurrencyInput);

  // Freeze the token TrustLine with this holder
  const trustSet = {
    TransactionType: "TrustSet",
    Account: issuer.address,
    LimitAmount: {
      currency: token_currency,
      issuer: holderAddress,
      value: "0", // Value does not matter for freeze
    },
    Flags: 1048576, // tfSetFreeze
  };

  const prepared = await client.autofill(trustSet);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log(\`Token TrustLine frozen for \${holderAddress}\`);
    console.log("The holder cannot send or receive this token");
  }

  await client.disconnect();
}

freezeTrustLine();`,
            jp: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）");
const { Client, Wallet } = require("xahau");

// token_currencyが3文字超の場合、40文字のhex（右側0埋め）に変換
function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;

  const cur = token_currency.trim();

  // 3文字以下：標準通貨コード
  if (cur.length <= 3) return cur;

  // 3文字超：hexに変換して40文字（20バイト）に右側0埋め
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();

  if (hex.length > 40) {
    throw new Error(
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). Max ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function freezeTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const holderAddress = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";

  const token_currency = normalizeCurrency(tokenCurrencyInput);

  // このホルダーとのトークンTrustLineを凍結する
  const trustSet = {
    TransactionType: "TrustSet",
    Account: issuer.address,
    LimitAmount: {
      currency: token_currency,
      issuer: holderAddress,
      value: "0", // Freeze時は値は重要でない
    },
    Flags: 1048576, // tfSetFreeze
  };

  const prepared = await client.autofill(trustSet);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log(\`\${holderAddress} のトークンTrustLineを凍結しました\`);
    console.log("ホルダーはこのトークンを送受信できません");
  }

  await client.disconnect();
}

freezeTrustLine();`,
            ko: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)");
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)");
const { Client, Wallet } = require("xahau");

function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;
  const cur = token_currency.trim();
  if (cur.length <= 3) return cur;
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();
  if (hex.length > 40) {
    throw new Error(
      \`token_currency가 너무 깁니다: "\${cur}" -> hex \${hex.length} (>40). 최대 약 20 bytes (UTF-8).\`
    );
  }
  return hex.padEnd(40, "0");
}

async function freezeTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const holderAddress = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";
  const token_currency = normalizeCurrency(tokenCurrencyInput);

  // 이 홀더의 토큰 TrustLine 동결
  const trustSet = {
    TransactionType: "TrustSet",
    Account: issuer.address,
    LimitAmount: {
      currency: token_currency,
      issuer: holderAddress,
      value: "0",
    },
    Flags: 1048576, // tfSetFreeze
  };

  const prepared = await client.autofill(trustSet);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log(\`\${holderAddress} 의 토큰 TrustLine이 동결되었습니다\`);
    console.log("홀더는 이 토큰을 보내거나 받을 수 없습니다");
  }

  await client.disconnect();
}

freezeTrustLine();`,
            zh: `require("dotenv").config();
if (!process.env.ISSUER_SEED) throw new Error("ISSUER_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
if (!process.env.FROZEN_SEED) throw new Error("FROZEN_SEED 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）");
const { Client, Wallet } = require("xahau");

function normalizeCurrency(token_currency) {
  if (typeof token_currency !== "string") return token_currency;
  const cur = token_currency.trim();
  if (cur.length <= 3) return cur;
  const hex = Buffer.from(cur, "utf8").toString("hex").toUpperCase();
  if (hex.length > 40) {
    throw new Error(
      \`token_currency 太长: "\${cur}" -> hex \${hex.length} (>40). UTF-8 最多约 20 bytes。\`
    );
  }
  return hex.padEnd(40, "0");
}

async function freezeTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const holderAddress = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'}).address;
  const tokenCurrencyInput = "YourTokenName";
  const token_currency = normalizeCurrency(tokenCurrencyInput);

  // 冻结该持有人的代币 TrustLine
  const trustSet = {
    TransactionType: "TrustSet",
    Account: issuer.address,
    LimitAmount: {
      currency: token_currency,
      issuer: holderAddress,
      value: "0",
    },
    Flags: 1048576, // tfSetFreeze
  };

  const prepared = await client.autofill(trustSet);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log(\`\${holderAddress} 的代币 TrustLine 已被冻结\`);
    console.log("该持有人将无法发送或接收此代币");
  }

  await client.disconnect();
}

freezeTrustLine();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Freeze: congelación de tokens", pt: "Freeze: congelamento de tokens", en: "Freeze: token freezing", jp: "Freeze：トークンの凍結", ko: "Freeze: 토큰 동결", zh: "Freeze：代币冻结" },
          content: {
            es: "El emisor puede congelar transferencias\n\n• Individual Freeze → Una TrustLine específica\n• Global Freeze → TODAS las TrustLines\n• NoFreeze → Renunciar permanentemente\n\nCasos: regulación, seguridad, disputas",
            pt: `O emissor pode congelar transferências

• Individual Freeze → Uma TrustLine específica
• Global Freeze → TODAS as TrustLines
• NoFreeze → Renunciar permanentemente

Casos: regulação, segurança, disputas`,
            en: "The issuer can freeze transfers\n\n• Individual Freeze -> A specific TrustLine\n• Global Freeze -> ALL TrustLines\n• NoFreeze -> Permanently renounce\n\nUse cases: regulation, security, disputes",
            jp: "発行者は転送を凍結できます\n\n• 個別Freeze -> 特定のTrustLine\n• グローバルFreeze -> すべてのTrustLine\n• NoFreeze -> 恒久的に放棄\n\nユースケース：規制、セキュリティ、紛争",
            ko: "발행자는 전송을 동결할 수 있습니다\n\n• 개별 Freeze → 특정 TrustLine\n• Global Freeze → 모든 TrustLine\n• NoFreeze → 영구적으로 권한 포기\n\n사례: 규제, 보안, 분쟁",
            zh: "发行方可以冻结转账\n\n• Individual Freeze → 某一条特定 TrustLine\n• Global Freeze → 所有 TrustLine\n• NoFreeze → 永久放弃冻结权\n\n使用场景：合规、安全、争议处理",
          },
          visual: "🧊",
        },
        {
          title: { es: "Clawback: recuperación forzada", pt: "Clawback: recuperação forçada", en: "Clawback: forced recovery", jp: "Clawback：強制回収", ko: "Clawback: 강제 회수", zh: "Clawback：强制追回" },
          content: {
            es: "Reclamar tokens de cualquier holder\n\n1️⃣ Activar asfAllowTrustLineClawback\n2️⃣ Usar transacción Clawback\n\n⚠️ Debe activarse ANTES de emitir tokens\n⚠️ Incompatible con NoFreeze",
            pt: "Reclamar tokens de qualquer holder\n\n1️⃣ Ativar asfAllowTrustLineClawback\n2️⃣ Usar transação Clawback\n\n⚠️ Deve ser ativado ANTES de emitir tokens\n⚠️ Incompatible com NoFreeze",
            en: "Reclaim tokens from any holder\n\n1️⃣ Activate asfAllowTrustLineClawback\n2️⃣ Use Clawback transaction\n\n⚠️ Must be activated BEFORE issuing tokens\n⚠️ Incompatible with NoFreeze",
            jp: "任意のホルダーからトークンを回収\n\n1️⃣ asfAllowTrustLineClawbackを有効化\n2️⃣ Clawbackトランザクションを使用\n\n⚠️ トークン発行前に有効化が必要\n⚠️ NoFreezeとは非互換",
            ko: "어떤 홀더에게서도 토큰 회수 가능\n\n1️⃣ asfAllowTrustLineClawback 활성화\n2️⃣ Clawback 트랜잭션 사용\n\n⚠️ 토큰 발행 전에 활성화해야 함\n⚠️ NoFreeze와 호환되지 않음",
            zh: "可以从任何持有人处追回代币\n\n1️⃣ 启用 asfAllowTrustLineClawback\n2️⃣ 使用 Clawback 交易\n\n⚠️ 必须在发行代币前启用\n⚠️ 与 NoFreeze 不兼容",
          },
          visual: "🔙",
        },
        {
          title: { es: "Transfer fees y RequireAuth", pt: "Transfer fees e RequireAuth", en: "Transfer fees and RequireAuth", jp: "Transfer feesとRequireAuth", ko: "Transfer fees와 RequireAuth", zh: "Transfer fees 与 RequireAuth" },
          content: {
            es: "Transfer fees:\n• TransferRate en AccountSet\n• Porcentaje en cada transferencia entre terceros\n• Ejemplo: 0.1% → 1001000000\n\nRequireAuth:\n• El emisor autoriza cada TrustLine\n• Ideal para tokens con KYC",
            pt: "Transfer fees:\n• TransferRate em AccountSet\n• Porcentaje em cada transferência entre terceiros\n• Exemplo: 0.1% → 1001000000\n\nRequireAuth:\n• O emissor autoriza cada TrustLine\n• Ideal para tokens com KYC",
            en: "Transfer fees:\n• TransferRate in AccountSet\n• Percentage on each transfer between third parties\n• Example: 0.1% -> 1001000000\n\nRequireAuth:\n• Issuer authorizes each TrustLine\n• Ideal for tokens with KYC",
            jp: "Transfer fees：\n• AccountSetのTransferRate\n• 第三者間転送ごとに割合を徴収\n• 例：0.1% -> 1001000000\n\nRequireAuth：\n• 発行者が各TrustLineを承認\n• KYCトークンに最適",
            ko: "Transfer fees:\n• AccountSet의 TransferRate 사용\n• 제3자 간 전송마다 비율 적용\n• 예: 0.1% → 1001000000\n\nRequireAuth:\n• 발행자가 각 TrustLine 승인\n• KYC가 필요한 토큰에 적합",
            zh: "Transfer fees：\n• 在 AccountSet 中使用 TransferRate\n• 对第三方之间的每次转账收取比例费用\n• 示例：0.1% → 1001000000\n\nRequireAuth：\n• 发行方批准每一条 TrustLine\n• 适合需要 KYC 的代币",
          },
          visual: "🔐",
        },
      ],
    },
  ],
}

const arabicModuleTranslations = {
  title: "إنشاء وإدارة tokens خاصة بك",
  lessons: {
    m6l1: {
      title: "TrustLines ونموذج tokens في Xahau",
      theory: `في Xahau، تعمل tokens القابلة للاستبدال (fungible) بشكل مختلف عن ERC-20 في Ethereum. لست بحاجة إلى نشر (deploy) smart contract لإنشاء token. بدلاً من ذلك، يُستخدم نظام يعتمد على **TrustLines**.

### كيف يعمل؟

1. **المُصدر (Issuer)**: يمكن لأي حساب أن يُصدر token. يصبح الحساب المُصدر بمثابة "البنك المركزي" لهذا الـtoken
2. **TrustLine**: لاستقبال token، يجب على المستلم أولاً إنشاء **TrustLine** نحو المُصدر. هذا أشبه بالقول: "أثق بهذا الحساب حتى مقدار X من هذا الـtoken"
3. **التحويل**: بمجرد وجود TrustLine، يمكن للمُصدر إرسال tokens إلى المستلم عبر معاملة Payment

### تحديد هوية tokens

يُحدد كل token بحقلين:
- **currency**: رمز مكون من 3 أحرف (مثل "USD"، "EUR") أو رمز hex من 40 حرفًا للأسماء الأطول
- **issuer**: عنوان الحساب المُصدر

token بنفس \`currency\` ولكن بـ\`issuer\` مختلف يُعتبر **token مختلفًا تمامًا**.

### TrustLine مقابل ERC-20

| الخاصية | ERC-20 (Ethereum) | TrustLine (Xahau) |
|---|---|---|
| إنشاء token | نشر عقد Solidity | الإصدار مباشرة من حسابك |
| استقبال token | تلقائي (بدون إذن) | يتطلب إنشاء TrustLine (opt-in) |
| حد الكمية | مُعرّف في العقد | يُحدده المستلم في TrustLine |
| التحويل | دالة في العقد | معاملة Payment أصلية |
| التكلفة | غاز مرتفع التكلفة | fee ضئيل (~12 drops) |

### احتياطي الحساب (Reserve)

كل TrustLine تستهلك **احتياطي مالك** (owner reserve) من الحساب. هذا يعني أنك بحاجة إلى XAH إضافي محجوز مقابل كل TrustLine تنشئها.

### إعدادات المُصدر عند إنشاء token

من مزايا نظام tokens في Xahau أن الحساب المُصدر يمكنه ضبط خصائص متعددة **قبل أو بعد** إصدار tokens، باستخدام معاملات \`AccountSet\`. تُحدد هذه الإعدادات كيفية سلوك الـtoken على الشبكة:

| الإعداد | Flag / الحقل | الوصف |
|---|---|---|
| **DefaultRipple** | \`SetFlag: 8\` | يسمح بتحويل الـtoken بحرية بين أطراف ثالثة. بدون هذا الـflag، لا يمكن لـtokens إلا الذهاب والعودة إلى المُصدر فقط |
| **TransferFee** | \`TransferRate\` | يفرض نسبة مئوية على كل تحويل بين أطراف ثالثة (مثال: 0.1%). يذهب الـfee إلى المُصدر |
| **RequireAuth** | \`SetFlag: 2\` | يجب على المُصدر أن يُصرّح كل TrustLine قبل أن يتمكن holder من استقبال tokens. مثالي لـtokens التي تتطلب KYC |
| **Freeze** | \`SetFlag: 7\` (عام) | يسمح بتجميد TrustLines فردية أو جميعها دفعة واحدة، مما يمنع التحويلات |
| **NoFreeze** | \`SetFlag: 6\` | تنازل **دائم** ولا رجعة فيه عن القدرة على التجميد. إشارة ثقة |
| **Clawback** | \`SetFlag: 17\` | يسمح للمُصدر باسترداد tokens من أي holder. يجب تفعيله **قبل** إنشاء أي TrustLine |

**مهم**: بعض الإعدادات لا رجعة فيها (\`NoFreeze\`) وأخرى يجب تفعيلها قبل إصدار tokens (\`Clawback\`). خطط لإعدادات المُصدر الخاص بك بعناية قبل البدء في توزيع tokens.

سنتناول كل واحد من هذه الإعدادات بالتفصيل في الأقسام التالية من هذه الوحدة.

### تشغيل سكربتات هذا الدرس

السكربتان زوج: الأول يوقّع بـ \`WALLET_SEED\` ويثق بـ ISSUER لعملة USD، والثاني يوقّع بـ \`ISSUER_SEED\` ويُصدر 100 USD إلى \`WALLET\`. ينشئ \`create-accounts.js\` ([الوحدة 3](?m=3&l=1)) الحسابين. المخرجات على testnet: سكربت الإصدار وحده أولًا، ثم الاثنان بالترتيب:

\`\`\`
Result: tecPATH_DRY

Result: tesSUCCESS
TrustLine created successfully!
You can now receive from the issuer at your account rBLuS1gEPkFMvyogRRyPyMQWZPfSMRZCqU

Result: tesSUCCESS
Tokens issued successfully!
\`\`\`

- **\`tecPATH_DRY\`**: شُغّل الإصدار قبل أن يملك \`WALLET\` خط TrustLine لـ USD نحو ISSUER، فلم يكن للدفعة مسار. لم يُصدر شيء.
- **TrustLine \`tesSUCCESS\`**: أصبح \`WALLET\` يقبل USD من ISSUER حتى حده.
- **الإصدار \`tesSUCCESS\`**: أنشأ ISSUER مبلغ 100 USD في TrustLine الخاصة بـ \`WALLET\`. المُصدر لا يملك الـ token الخاص به أبدًا: دفعه هو ما ينشئه.`,
      codeTitles: [
        "إنشاء TrustLine نحو issuer",
        "إصدار tokens إلى حساب لديه TrustLine",
      ],
      slides: [
        {
          title: "نموذج tokens في Xahau",
          content: "لا تحتاج ERC-20 contract\n\n• issuer يصدر العملة\n• holder ينشئ TrustLine\n• Payment ينقل IOUs\n• token = currency + issuer",
        },
        {
          title: "TrustLine = Opt-in",
          content: "الحساب يختار tokens التي يقبلها\n\n• يحدد issuer\n• يحدد limit\n• يمنع spam tokens\n• يحتاج owner reserve",
        },
        {
          title: "نظام reserve",
          content: "كل TrustLine تزيد objects الحساب\n\n• تحتاج XAH محجوزة\n• تقلل spam\n• يمكن تحريرها عند حذف TrustLine إذا أصبح الرصيد صفر",
        },
      ],
    },
    m6l1b: {
      title: "العملية الكاملة: إنشاء وتوزيع token خاص بك",
      theory: `الآن بعد أن فهمت كيف تعمل TrustLines، لنلقِ نظرة على العملية الكاملة لإنشاء token خاص بك وتوزيعه. على عكس بلوك تشينات أخرى، في Xahau **لست بحاجة إلى نشر أي عقد (contract)**. تتم العملية بالكامل عبر معاملات أصلية (native transactions).

### نظرة عامة على العملية

المسار الكامل لإنشاء token وتوزيعه هو:

1. **تجهيز الحساب المُصدر**: إنشاء (أو استخدام) حساب مخصص حصريًا لإصدار الـtoken
2. **ضبط flags المُصدر**: تفعيل \`DefaultRipple\` حتى يكون الـtoken قابلاً للتحويل بين أطراف ثالثة
3. **تجهيز حساب الاحتياطي/التوزيع**: إنشاء (أو استخدام) حساب ثانٍ يستقبل العرض الأولي ومنه تُوزَّع tokens
4. **إنشاء TrustLine من حساب الاحتياطي**: يُنشئ حساب التوزيع TrustLine نحو المُصدر
5. **إصدار tokens**: يرسل المُصدر إجمالي العرض إلى حساب الاحتياطي عبر معاملة Payment
6. **التوزيع**: من حساب الاحتياطي، تُوزَّع tokens على المستخدمين النهائيين (الذين يجب أن يكون لديهم TrustLine مسبقًا)

### لماذا استخدام حسابين منفصلين؟

من الممارسات الجيدة الفصل بين **الحساب المُصدر** و**حساب التوزيع**:

- **الحساب المُصدر**: يُستخدم فقط للإصدار وضبط إعدادات الـtoken (freeze، clawback، إلخ). يمكن حمايته بواسطة multi-signing أو تعطيل المفتاح الرئيسي (master key) بعد ضبط الإعدادات
- **حساب التوزيع/الاحتياطي**: يحتفظ بالعرض المتداول ويُستخدم للعمليات اليومية (البيع على DEX، التوزيع على المستخدمين، إلخ)

هذا الفصل يُقلل من المخاطر: إذا تعرض حساب التوزيع للاختراق، يمكن للمُصدر تجميد tokens. لو كان كل شيء في حساب واحد، لأدى أي اختراق إلى تعريض كل من الإصدار والتوزيع للخطر.

### رمز العملة: 3 أحرف مقابل hex

- tokens ذات اسم من **3 أحرف** (مثل \`USD\`، \`EUR\`، \`EKI\`) تُستخدم مباشرة
- tokens ذات اسم **أطول** (مثل \`EURZ\`، \`MyToken\`) يجب تحويلها إلى رمز hex من 40 حرفًا

\`\`\`
// دالة لتحويل اسم طويل إلى hex من 40 حرفًا
function currencyToHex(name) {
  const hex = Buffer.from(name, "ascii").toString("hex").toUpperCase();
  return hex.padEnd(40, "0");
}

console.log(currencyToHex("EURZ"));

// "EURZ" -> "4555525A00000000000000000000000000000000"
\`\`\`

### ملخص المعاملات المطلوبة

| الخطوة | المعاملة | الحساب المُنفّذ |
|---|---|---|
| ضبط المُصدر | \`AccountSet\` (SetFlag: 8) | المُصدر |
| إنشاء TrustLine | \`TrustSet\` | حساب الاحتياطي |
| إصدار العرض | \`Payment\` (Amount كـIOU) | المُصدر |
| التوزيع | \`Payment\` (Amount كـIOU) | حساب الاحتياطي |`,
      codeTitles: [
        "العملية الكاملة: إعداد issuer وإنشاء TrustLine وإصدار وتوزيع token",
      ],
      slides: [
        {
          title: "عملية إنشاء token",
          content: "1. إعداد issuer\n2. اختيار flags\n3. إنشاء TrustLine\n4. إصدار token عبر Payment\n5. توزيعه أو تداوله",
        },
        {
          title: "حسابان: issuer + reserve",
          content: "issuer = مصدر token والثقة\nreserve/distributor = حساب توزيع وتشغيل\n\nهذا يقلل استخدام issuer في العمليات اليومية.",
        },
        {
          title: "ملخص المعاملات",
          content: "AccountSet → إعداد issuer\nTrustSet → قبول token\nPayment → إصدار ونقل token\nOfferCreate → التداول في DEX",
        },
      ],
    },
    m6l2: {
      title: "إدارة tokens المتقدمة",
      theory: `بعد إصدار token، تحتاج إلى قراءة TrustLines وإعدادات issuer. أهم أمر هنا هو \`account_lines\` لعرض tokens المرتبطة بالحساب.

### account_lines

يعرض TrustLines لحساب معين: العملة، issuer/counterparty، الرصيد، limit، وبعض flags.

### DefaultRipple

\`DefaultRipple\` يسمح بانتقال IOUs بين أطراف ثالثة. بدونه، قد يكون token محدودا بالحركة من وإلى issuer فقط. غالبا تحتاجه إذا أردت token قابلا للتداول.

### flags مهمة للـ issuer

\`RequireAuth\` للتحكم في من يستطيع فتح TrustLine فعالة، \`TransferRate\` لرسوم تحويل، \`Freeze\` لتجميد خطوط معينة، و\`Clawback\` لاسترداد tokens في سيناريوهات منظمة.`,
      codeTitles: [
        "استعلام tokens / TrustLines لحساب",
      ],
      slides: [
        {
          title: "استعلام tokens",
          content: "account_lines يعرض TrustLines\n\n• currency\n• issuer/counterparty\n• balance\n• limit\n• flags\n\nمفيد لمعرفة tokens التي يملكها الحساب.",
        },
        {
          title: "DefaultRipple",
          content: "يسمح للـ IOU بالانتقال بين holders\n\nبدونه، الحركة قد تكون محدودة بالـ issuer\n\nمهم للـ tokens القابلة للتداول.",
        },
        {
          title: "Flags مهمة للـ issuers",
          content: "RequireAuth (asfRequireAuth):\n• المُصدر يُصرّح كل TrustLine\n• مثالي لـtokens التي تتطلب KYC\n\nDefaultRipple (asfDefaultRipple):\n• يسمح بالتحويل بين أطراف ثالثة\n\nاضبطها قبل إصدار tokens\nاستخدم AccountSet مع SetFlag/ClearFlag",
        },
      ],
    },
    m6l3: {
      title: "التداول على DEX الأصلي",
      theory: `يتضمن Xahau **بورصة لامركزية (DEX) أصلية** مدمجة مباشرة في البروتوكول. لست بحاجة إلى smart contracts أو منصات خارجية لتبادل tokens، فكل شيء يتم عبر معاملات أصلية.

### OfferCreate: وضع الأوامر في DEX

تسمح معاملة \`OfferCreate\` بوضع أمر شراء أو بيع في دفتر أوامر DEX. تحتوي على حقلين أساسيين:

- **TakerPays**: ما تريد **استلامه** (ما يدفعه "الـtaker")
- **TakerGets**: ما أنت **مستعد لتقديمه** (ما يحصل عليه "الـtaker")

على سبيل المثال، إذا أردت بيع 100 USD مقابل XAH، فستضبط:
- TakerPays: كمية XAH التي تريد استلامها
- TakerGets: 100 USD (ما تُسلّمه)

### OfferCancel: إلغاء الأوامر المفتوحة

إذا كان لديك أمر مفتوح في DEX لم يُنفَّذ بعد، يمكنك إلغاءه باستخدام \`OfferCancel\`، مع تحديد \`OfferSequence\` الخاص بالأمر الأصلي.

### كيف يعمل دفتر الأوامر

يحتفظ DEX بـ**دفتر أوامر (order book)** لكل زوج من tokens:
- **Bids (أوامر شراء)**: أوامر تريد شراء token
- **Asks (أوامر بيع)**: أوامر تريد بيع token

عندما يتطابق أمر جديد مع أمر موجود (يتقاطع السعر)، يُنفَّذ تلقائيًا، بشكل كامل أو جزئي.

### flags خاصة بـ OfferCreate

- **tfImmediateOrCancel**: يُنفَّذ الأمر فورًا مقابل الأوامر الموجودة. أي جزء غير مُنفَّذ يُلغى فورًا. لا يبقى شيء في دفتر الأوامر
- **tfPassive**: يُنفَّذ الأمر فقط مقابل الأوامر الموجودة التي لها سعر مساوٍ أو أفضل. لا يُوضع في الدفتر إذا لم يوجد تطابق فوري
- **tfFillOrKill**: يُنفَّذ الأمر بالكامل أو يُلغى. لا يُسمح بالتنفيذ الجزئي
- **tfSell**: يُبادل كامل كمية TakerGets، حتى لو كان ذلك يعني الحصول على أكثر من كمية TakerPays مقابل ذلك

يمكنك زيارة المزيد من المعلومات حول الـflags في [الوثائق الرسمية](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/#offercreate-flags).

### استعلام دفتر الأوامر: book_offers

يتيح لك أمر \`book_offers\` عرض الأوامر المفتوحة لزوج من tokens. يُعيد أفضل العروض مرتبة حسب السعر.

### Auto-bridging عبر XAH

يمكن لـDEX في Xahau توجيه عمليات متعددة القفزات تلقائيًا عبر XAH. إذا أردت تبادل USD مقابل EUR ولم تكن هناك عروض مباشرة USD/EUR، يمكن لـDEX أن:
1. يبيع USD مقابل XAH
2. يشتري EUR بواسطة XAH

كل ذلك في معاملة واحدة، بشكل شفاف. هذا يُحسّن سيولة DEX بشكل كبير.

### تشغيل سكربتات هذا الدرس

يوقّع السكربتان بـ \`RESERVE_SEED\` الذي يحمل الـ token بعد [العملية الكاملة](?m=7&l=1)، ويقرآن عنوان ISSUER من \`ISSUER_SEED\`. ينشئ \`create-accounts.js\` ([الوحدة 3](?m=3&l=1)) الحسابين. شغّل سكربت العرض أولًا. المخرجات على testnet:

\`\`\`
Result: tesSUCCESS
Offer created on the DEX!
Selling 100 Tokens for 50 XAH (0.5 XAH/Token)
Offer Sequence: 843750863
\`\`\`

الـ **Sequence** يعرّف العرض. يأخذه \`cancel-offer.js\` كوسيط:

\`\`\`bash
node cancel-offer.js 843750863
\`\`\`

يطبع \`Result: tesSUCCESS\` و \`Offer cancelled successfully!\`. بدون Sequence صالح يتوقف قبل الإرسال ويوضح ما يجب تمريره.

**حالة يجب الانتباه لها:** يعيد \`OfferCancel\` النتيجة \`tesSUCCESS\` أيضًا حين لا يعود العرض موجودًا (نُفّذ أو أُلغي مسبقًا). نجاح الإلغاء لا يثبت أن العرض لم يُتداول: راجع \`account_offers\` قبل الإلغاء إن كان ذلك مهمًا.`,
      codeTitles: [
        "استعلام order book لزوج token / XAH",
        "إنشاء offer على DEX",
        "إلغاء offer موجود",
      ],
      slides: [
        {
          title: "DEX الأصلي في Xahau",
          content: "التداول مدمج في البروتوكول\n\n• OfferCreate\n• OfferCancel\n• Order books\n• IOU/XAH أو IOU/IOU\n• لا يحتاج smart contract منفصل",
        },
        {
          title: "OfferCreate: تشريح order",
          content: "TakerPays -> ما تريد استلامه\nTakerGets -> ما أنت مستعد لتقديمه\n\nflags خاصة:\n• tfImmediateOrCancel -> تنفيذ أو إلغاء\n• tfPassive -> مطابقة الأوامر الموجودة فقط\n• tfFillOrKill -> تنفيذ كامل أو لا شيء\n• tfSell -> استلام بقدر كمية TakerGets\n\nOfferCancel -> إلغاء أمر مفتوح",
        },
        {
          title: "Auto-bridging و order book",
          content: "يمكن للشبكة استخدام XAH كجسر للسيولة\n\nالهدف: إيجاد أفضل مسار تداول متاح بين assets.",
        },
      ],
    },
    m6l4: {
      title: "تحكم متقدم في tokens: Freeze و Clawback",
      theory: `يوفر Xahau لمُصدري tokens أدوات تحكم متقدمة: **Freeze** (التجميد)، **Clawback** (الاسترداد القسري)، **Transfer fees** (رسوم التحويل)، و**Authorized TrustLines** (خطوط الثقة المُصرَّح بها).

### Freeze: تجميد خطوط الثقة

يمكن لمُصدر token تجميد TrustLines لمنع holders من تحويل tokens الخاصة بهم. توجد ثلاثة مستويات:

### Freeze فردي
يُجمِّد TrustLine محددة بين المُصدر وholder. يتم ذلك باستخدام \`TrustSet\` مع flag \`tfSetFreeze\`. لن يتمكن holder من إرسال أو استقبال ذلك الـtoken أثناء تجميده. لإلغاء التجميد، يُستخدم \`tfClearFreeze\`.

### Global Freeze
يُجمِّد **جميع** TrustLines الخاصة بـtoken الذي أصدرته. يُفعَّل باستخدام \`AccountSet\` مع \`SetFlag: 7\` (asfGlobalFreeze). يُجمَّد جميع holders في آن واحد. يمكن إلغاء تفعيله بـ\`ClearFlag: 7\`.

### NoFreeze (لا رجعة فيه)
عند تفعيل \`SetFlag: 6\` (asfNoFreeze) في \`AccountSet\`، يتنازل المُصدر **بشكل دائم** عن القدرة على التجميد. لا يمكن التراجع عن هذا. إنها إشارة ثقة لـholders.

### حالات استخدام Freeze
- **الامتثال التنظيمي**: تجميد الأموال استجابة لأمر قضائي
- **خروقات أمنية**: إيقاف التحويلات إذا تم اختراق حساب
- **حل النزاعات**: تجميد مؤقت أثناء التحقيق

### Clawback: استرداد tokens من holders

يسمح **Clawback** للمُصدر باسترداد tokens من أي holder. إنها أداة قوية يجب ضبطها **قبل** إصدار tokens:

1. تفعيل \`asfAllowTrustLineClawback\` (flag 17) باستخدام \`AccountSet\` **قبل** إنشاء أي TrustLine
2. بعد التفعيل، استخدم معاملة \`Clawback\` لاسترداد tokens
3. **لا يمكن الجمع بينها** وبين NoFreeze — إذا تنازلت عن التجميد، لا يمكنك تنفيذ clawback

### Transfer fees: عمولات على التحويلات

يمكن للمُصدر فرض نسبة مئوية على كل تحويل لـtoken الخاص به بين أطراف ثالثة:

- تُضبط عبر حقل \`TransferRate\` في \`AccountSet\`
- القيمة عدد صحيح: 1000000000 = 0%، 1001000000 = 0.1%، 1010000000 = 1%
- تُطبَّق فقط على التحويلات بين أطراف ثالثة، وليس عند الإرسال إلى المُصدر
- مثال: بعمولة 0.1%، عند إرسال 100 token يستلم المستقبل 99.9 (يُخصم 0.1 من المستقبل)

### Authorized TrustLines: RequireAuth

يتطلب flag \`RequireAuth\` (asfRequireAuth) على الحساب المُصدر أن يُصرِّح المُصدر **صراحة** كل TrustLine قبل أن يتمكن holder من استقبال tokens. مفيد لـtokens التي تحتاج KYC أو تحققًا مسبقًا.

### تشغيل سكربتات هذا الدرس

السكربت الأول يوقّع بـ \`FROZEN_SEED\` وينشئ TrustLine الحامل، والثاني يوقّع بـ \`ISSUER_SEED\` ويجمّدها. ينشئ \`create-accounts.js\` ([الوحدة 3](?m=3&l=1)) الحسابين، ويقرأ كل سكربت عنوان الطرف الآخر من \`.env\`. شغّلهما بهذا الترتيب. المخرجات على testnet:

\`\`\`
Result: tesSUCCESS
TrustLine created!
Holder: r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
Issuer: rDSFWxUH586ztyZ25SwUZzvArdicYJf82z

Result: tesSUCCESS
Token TrustLine frozen for r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
The holder cannot send or receive this token
\`\`\`

- **أول \`tesSUCCESS\`**: أصبح لدى الحامل TrustLine نحو ISSUER لهذا الـ token. التجميد يُطبَّق على TrustLine، لذلك يجب أن توجد أولًا.
- **ثاني \`tesSUCCESS\`**: فعّل المُصدر علامة التجميد على جهته من الخط. ما زال بإمكان الحامل إعادة الـ token إلى المُصدر، لكن لا يمكنه إرساله إلى أي أحد آخر.`,
      codeTitles: [
        "إنشاء TrustLine من holder نحو issuer",
        "تجميد TrustLine لمستخدم محدد",
      ],
      slides: [
        {
          title: "Freeze: تجميد token",
          content: "Freeze يسمح للـ issuer بتقييد TrustLine\n\n• تجميد محدد\n• تجميد عام\n• مفيد للامتثال\n• يجب استخدامه بشفافية",
        },
        {
          title: "Clawback: استرداد قسري",
          content: "Clawback يسمح باسترداد tokens من holder\n\n• يحتاج تفعيل مبكر\n• مناسب لبعض الأصول المنظمة\n• حساس جدا للمستخدمين\n• يجب توضيحه قبل الإصدار",
        },
        {
          title: "Transfer fees و RequireAuth",
          content: "TransferRate → fee على transfers بين holders\nRequireAuth → issuer يصرح TrustLines\n\nهذه أدوات سياسة token وليست مجرد تفاصيل تقنية.",
        },
      ],
    },
  },
};

function applyArabicTranslations(module) {
  module.title.ar = arabicModuleTranslations.title;

  for (const lesson of module.lessons) {
    const translation = arabicModuleTranslations.lessons[lesson.id];
    if (!translation) continue;

    lesson.title.ar = translation.title;
    lesson.theory.ar = translation.theory;

    lesson.codeBlocks?.forEach((block, index) => {
      block.title.ar = translation.codeTitles[index];
    });

    lesson.slides?.forEach((slide, index) => {
      slide.title.ar = translation.slides[index].title;
      slide.content.ar = translation.slides[index].content;
    });
  }
}

applyArabicTranslations(moduleData);

const frenchModuleTranslations = {
  title: "Créer et gérer ses propres tokens",
  lessons: {
    m6l1: {
      title: "TrustLines et modèle de tokens dans Xahau",
      theory: `Dans Xahau, les tokens fongibles fonctionnent différemment des ERC-20 sur Ethereum. Tu n'as pas besoin de déployer un smart contract pour créer un token. À la place, un système basé sur les **TrustLines** est utilisé.

### Comment ça fonctionne ?

1. **Émetteur (Issuer)** : N'importe quel compte peut émettre un token. Le compte émetteur devient la « banque centrale » de ce token
2. **TrustLine** : Pour recevoir un token, le destinataire doit d'abord créer une **TrustLine** vers l'émetteur. C'est comme dire « je fais confiance à ce compte jusqu'à X unités de ce token »
3. **Transfert** : Une fois la TrustLine créée, l'émetteur peut envoyer des tokens au destinataire via un Payment

### Identification des tokens

Chaque token est identifié par deux champs :
- **currency** : un code de 3 caractères (ex. : « USD », « EUR ») ou un code hexadécimal de 40 caractères pour les noms plus longs
- **issuer** : l'adresse du compte émetteur

Deux tokens ayant la même \`currency\` mais un \`issuer\` différent sont des **tokens totalement différents**.

### TrustLine vs ERC-20

| Caractéristique | ERC-20 (Ethereum) | TrustLine (Xahau) |
|---|---|---|
| Créer un token | Déployer un contrat Solidity | Émettre simplement depuis ton compte |
| Recevoir un token | Automatique (sans permission) | Nécessite de créer une TrustLine (opt-in) |
| Limite de quantité | Définie dans le contrat | Définie par le destinataire dans la TrustLine |
| Transfert | Fonction du contrat | Transaction Payment native |
| Coût | Gas coûteux | Frais minimes (~12 drops) |

### Réserve de compte

Chaque TrustLine consomme une **réserve de propriétaire** (owner reserve) du compte. Cela signifie que tu dois avoir du XAH supplémentaire bloqué pour chaque TrustLine que tu crées.

### Configurations de l'émetteur lors de la création d'un token

L'un des avantages du système de tokens de Xahau est que le compte émetteur peut configurer diverses propriétés **avant ou après** l'émission des tokens, via des transactions \`AccountSet\`. Ces configurations définissent le comportement du token sur le réseau :

| Configuration | Flag / Champ | Description |
|---|---|---|
| **DefaultRipple** | \`SetFlag: 8\` | Permet au token d'être librement transféré entre tiers. Sans ce flag, les tokens ne peuvent qu'aller vers l'émetteur et en revenir |
| **TransferFee** | \`TransferRate\` | Prélève un pourcentage sur chaque transfert entre tiers (ex. : 0.1 %). Les frais reviennent à l'émetteur |
| **RequireAuth** | \`SetFlag: 2\` | L'émetteur doit autoriser chaque TrustLine avant qu'un détenteur puisse recevoir des tokens. Idéal pour les tokens avec KYC |
| **Freeze** | \`SetFlag: 7\` (global) | Permet de geler des TrustLines individuelles ou toutes à la fois, empêchant les transferts |
| **NoFreeze** | \`SetFlag: 6\` | Renonciation **permanente** et irréversible à la capacité de geler. Signal de confiance |
| **Clawback** | \`SetFlag: 17\` | Permet à l'émetteur de récupérer des tokens auprès de n'importe quel détenteur. Doit être activé **avant** de créer toute TrustLine |

**Important** : certaines configurations sont irréversibles (\`NoFreeze\`) et d'autres doivent être activées avant d'émettre des tokens (\`Clawback\`). Planifie soigneusement la configuration de ton émetteur avant de commencer à distribuer des tokens.

Nous verrons chacune de ces configurations en détail dans les sections suivantes de ce module.

### Lancer les scripts de cette leçon

Les deux scripts vont ensemble : le premier signe avec \`WALLET_SEED\` et fait confiance à ISSUER pour l'USD ; le second signe avec \`ISSUER_SEED\` et émet 100 USD vers \`WALLET\`. \`create-accounts.js\` ([module 3](?m=3&l=1)) crée les deux comptes. Sortie sur le testnet : d'abord le script d'émission seul, puis les deux dans l'ordre :

\`\`\`
Result: tecPATH_DRY

Result: tesSUCCESS
TrustLine created successfully!
You can now receive from the issuer at your account rBLuS1gEPkFMvyogRRyPyMQWZPfSMRZCqU

Result: tesSUCCESS
Tokens issued successfully!
\`\`\`

- **\`tecPATH_DRY\`** : l'émission a été lancée avant que \`WALLET\` ait une TrustLine USD vers ISSUER, le paiement n'avait donc pas de chemin. Rien n'a été émis.
- **TrustLine \`tesSUCCESS\`** : \`WALLET\` accepte désormais l'USD d'ISSUER, jusqu'à sa limite.
- **Émission \`tesSUCCESS\`** : ISSUER a créé 100 USD sur la TrustLine de \`WALLET\`. Un émetteur ne détient jamais son propre token : c'est en le payant qu'il le crée.`,
      codeTitles: ["Créer une TrustLine vers un émetteur de token", "Émettre des tokens vers un compte avec TrustLine"],
      slides: [
        ["Modèle de tokens dans Xahau", "Les tokens sont des IOUs émis par un compte\n\n• Pas de contrat ERC-20\n• Une devise + un issuer\n• Le détenteur accepte avec TrustLine\n• Le solde vit sur la ligne de confiance"],
        ["TrustLine = Opt-in", "Un compte ne reçoit pas un token au hasard\n\nIl crée d'abord une TrustLine avec une limite, puis l'émetteur peut envoyer le token."],
        ["Système de réserve", "Les objets de ledger consomment de la réserve\n\nUne TrustLine augmente les exigences de réserve du compte qui la crée."],
      ],
    },
    m6l1b: {
      title: "Processus complet : créer et distribuer ton propre token",
      theory: `Maintenant que tu comprends le fonctionnement des TrustLines, voyons le processus complet pour créer ton propre token et le distribuer. Contrairement à d'autres blockchains, dans Xahau **tu n'as besoin de déployer aucun contrat**. Le processus se fait entièrement avec des transactions natives.

### Vue d'ensemble du processus

Le flux complet pour créer et distribuer un token est :

1. **Préparer le compte émetteur** : créer (ou utiliser) un compte dédié exclusivement à l'émission du token
2. **Configurer les flags de l'émetteur** : activer \`DefaultRipple\` pour que le token soit transférable entre tiers
3. **Préparer le compte de réserve/distribution** : créer (ou utiliser) un second compte qui recevra l'offre initiale et depuis lequel les tokens seront distribués
4. **Créer une TrustLine depuis le compte de réserve** : le compte de distribution crée une TrustLine vers l'émetteur
5. **Émettre les tokens** : l'émetteur envoie l'offre totale au compte de réserve via un Payment
6. **Distribuer** : depuis le compte de réserve, les tokens sont distribués aux utilisateurs finaux (qui doivent au préalable avoir une TrustLine)

### Pourquoi utiliser deux comptes séparés ?

C'est une bonne pratique de séparer le **compte émetteur** du **compte de distribution** :

- **Compte émetteur** : utilisé uniquement pour émettre et configurer le token (freeze, clawback, etc.). Il peut être protégé par multi-signature ou en désactivant la clé maîtresse une fois configuré
- **Compte de distribution/réserve** : détient l'offre en circulation et sert aux opérations quotidiennes (vente sur le DEX, distribution aux utilisateurs, etc.)

Cette séparation réduit le risque : si le compte de distribution est compromis, l'émetteur peut geler les tokens. Si tout se trouvait sur un seul compte, une faille compromettrait à la fois l'émission et la distribution.

### Code de devise : 3 caractères vs hex

- Les tokens avec un nom de **3 caractères** (ex. : \`USD\`, \`EUR\`, \`EKI\`) sont utilisés directement
- Les tokens avec un nom **plus long** (ex. : \`EURZ\`, \`MyToken\`) doivent être convertis en un code hexadécimal de 40 caractères

\`\`\`
// Fonction pour convertir un nom long en hex de 40 caractères
function currencyToHex(name) {
  const hex = Buffer.from(name, "ascii").toString("hex").toUpperCase();
  return hex.padEnd(40, "0");
}

console.log(currencyToHex("EURZ"));

// "EURZ" -> "4555525A00000000000000000000000000000000"
\`\`\`

### Résumé des transactions nécessaires

| Étape | Transaction | Compte exécutant |
|---|---|---|
| Configurer l'émetteur | \`AccountSet\` (SetFlag: 8) | Émetteur |
| Créer la TrustLine | \`TrustSet\` | Compte de réserve |
| Émettre l'offre | \`Payment\` (Amount en IOU) | Émetteur |
| Distribuer | \`Payment\` (Amount en IOU) | Compte de réserve |`,
      codeTitles: ["Processus complet : configurer l'émetteur, créer la TrustLine, émettre et distribuer le token"],
      slides: [
        ["Processus de création du token", "1. Créer l'émetteur\n2. Créer le détenteur\n3. TrustSet vers l'émetteur\n4. Payment avec Amount IOU\n5. Vérifier account_lines"],
        ["Deux comptes : issuer + réserve", "L'issuer représente la source du token\n\nLe compte réserve/détenteur accepte le token et peut ensuite le distribuer."],
        ["Résumé des transactions", "AccountSet pour configurer\nTrustSet pour accepter\nPayment pour émettre\naccount_lines pour vérifier"],
      ],
    },
    m6l2: {
      title: "Gestion avancée des tokens",
      theory: `Une fois ton token créé, tu peux gérer plusieurs aspects : consulter les soldes, configurer le compte émetteur et transférer des tokens entre utilisateurs.

### Consulter les TrustLines et les soldes

La commande \`account_lines\` renvoie toutes les TrustLines d'un compte, en indiquant chaque token qu'il détient ou a émis, ainsi que son solde actuel.

### Configuration de l'émetteur

Le compte émetteur peut configurer des flags importants :

- **DefaultRipple** : permet aux tokens d'être transférés entre tiers sans passer par l'émetteur. **Il doit être activé** si tu veux que tes tokens soient librement transférables
- **RequireAuth** : exige que l'émetteur autorise chaque TrustLine avant que quelqu'un puisse recevoir des tokens

### Transfert entre tiers (Rippling)

Sans le flag **DefaultRipple**, les tokens ne peuvent être transférés que dans un sens, vers l'émetteur. Une fois activé, les tokens peuvent « rippler » — c'est-à-dire se transférer entre comptes ayant une TrustLine avec le même émetteur.

### Codes de devise spéciaux

Pour les noms de tokens de plus de 3 caractères, un code hexadécimal de 40 caractères est utilisé :
- Format : le nom converti en hex, complété par des zéros
- Exemple : « EURZ » -> hex -> complété jusqu'à 40 caractères`,
      codeTitles: ["Consulter les tokens (TrustLines) d'un compte"],
      slides: [
        ["Consulter les tokens", "account_lines liste les TrustLines d'un compte\n\nTu peux voir currency, issuer, balance, limit et flags."],
        ["DefaultRipple", "DefaultRipple permet le rippling par défaut sur les lignes de confiance\n\nÀ activer seulement si ton modèle de token le nécessite."],
        ["Flags importants pour les issuers", "RequireAuth, Freeze, GlobalFreeze, NoFreeze, TransferRate\n\nChaque option a des implications opérationnelles."],
      ],
    },
    m6l3: {
      title: "Trading sur le DEX natif",
      theory: `Xahau intègre un **échange décentralisé (DEX) natif** directement dans le protocole. Tu n'as besoin ni de smart contracts ni de plateformes externes pour échanger des tokens, tout se fait avec des transactions natives.

### OfferCreate : placer des ordres sur le DEX

La transaction \`OfferCreate\` permet de placer un ordre d'achat ou de vente dans le carnet d'ordres du DEX. Elle comporte deux champs clés :

- **TakerPays** : ce que tu veux **recevoir** (ce que le « taker » paie)
- **TakerGets** : ce que tu es **prêt à donner** (ce que le « taker » obtient)

Par exemple, si tu veux vendre 100 USD contre du XAH, tu configurerais :
- TakerPays : la quantité de XAH que tu veux recevoir
- TakerGets : 100 USD (ce que tu donnes)

### OfferCancel : annuler des ordres ouverts

Si tu as un ordre ouvert sur le DEX qui n'a pas encore été exécuté, tu peux l'annuler avec \`OfferCancel\`, en indiquant le \`OfferSequence\` de l'ordre original.

### Comment fonctionne le carnet d'ordres

Le DEX maintient un **carnet d'ordres** (order book) pour chaque paire de tokens :
- **Bids (ordres d'achat)** : ordres qui veulent acheter un token
- **Asks (ordres de vente)** : ordres qui veulent vendre un token

Quand un nouvel ordre correspond à un ordre existant (les prix se croisent), il est exécuté automatiquement, totalement ou partiellement.

### Flags spéciaux d'OfferCreate

- **tfImmediateOrCancel** : l'ordre s'exécute immédiatement contre les ordres existants. Ce qui n'est pas rempli est annulé instantanément. Rien ne reste dans le carnet d'ordres
- **tfPassive** : l'ordre ne s'exécute que contre des ordres existants ayant un prix égal ou meilleur. Il n'est pas placé dans le carnet s'il n'y a pas de correspondance immédiate
- **tfFillOrKill** : l'ordre est exécuté entièrement ou annulé. Les exécutions partielles ne sont pas autorisées
- **tfSell** : échange la totalité du montant TakerGets, même si cela signifie obtenir plus que le montant TakerPays en retour

Consulte plus d'informations sur les flags dans la [documentation officielle](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/#offercreate-flags).

### Consulter le carnet d'ordres : book_offers

La commande \`book_offers\` permet de voir les ordres ouverts pour une paire de tokens. Elle renvoie les meilleures offres triées par prix.

### Auto-bridging via XAH

Le DEX de Xahau peut router automatiquement des échanges multi-sauts via XAH. Si tu veux échanger des USD contre des EUR et qu'il n'y a pas d'offres directes USD/EUR, le DEX peut :
1. Vendre des USD contre du XAH
2. Acheter des EUR avec du XAH

Le tout en une seule transaction, de manière transparente. Cela améliore considérablement la liquidité du DEX.

### Lancer les scripts de cette leçon

Les deux scripts signent avec \`RESERVE_SEED\`, qui détient le token après le [processus complet](?m=7&l=1), et lisent l'adresse d'ISSUER dans \`ISSUER_SEED\`. \`create-accounts.js\` ([module 3](?m=3&l=1)) crée les deux. Lance d'abord le script de l'offre. Sortie sur le testnet :

\`\`\`
Result: tesSUCCESS
Offer created on the DEX!
Selling 100 Tokens for 50 XAH (0.5 XAH/Token)
Offer Sequence: 843750863
\`\`\`

Le **Sequence** de l'offre l'identifie. \`cancel-offer.js\` le prend en argument :

\`\`\`bash
node cancel-offer.js 843750863
\`\`\`

Il affiche \`Result: tesSUCCESS\` et \`Offer cancelled successfully!\`. Sans Sequence valide, il s'arrête avant d'envoyer quoi que ce soit et indique quoi passer.

**Cas à surveiller :** \`OfferCancel\` renvoie aussi \`tesSUCCESS\` quand l'offre n'existe plus (déjà exécutée ou déjà annulée). Une annulation réussie ne prouve pas que l'offre n'a pas été négociée : consulte \`account_offers\` avant d'annuler si c'est important.`,
      codeTitles: ["Consulter le carnet d'ordres d'une paire de tokens (USD/XAH)", "Créer une offre sur le DEX (vendre 100 tokens contre XAH)", "Annuler une offre existante sur le DEX"],
      slides: [
        ["DEX natif Xahau", "Le DEX est intégré au protocole\n\n• Pas de smart contract externe\n• Offres dans le ledger\n• Carnets consultables par API\n• Règlement atomique"],
        ["OfferCreate : anatomie d'un ordre", "TakerPays -> ce que tu veux RECEVOIR\nTakerGets -> ce que tu es prêt à DONNER\n\nFlags spéciaux :\n• tfImmediateOrCancel -> exécuter ou annuler\n• tfPassive -> ne correspond qu'aux ordres existants\n• tfFillOrKill -> tout exécuter ou rien\n• tfSell -> recevoir autant que le montant de TakerGets\n\nOfferCancel -> annuler un ordre ouvert"],
        ["Auto-bridging et carnet d'ordres", "Le protocole peut trouver des chemins de liquidité via XAH ou d'autres actifs selon les offres disponibles."],
      ],
    },
    m6l4: {
      title: "Contrôle avancé des tokens : Freeze et Clawback",
      theory: `Xahau offre aux émetteurs de tokens des outils de contrôle avancés : **Freeze** (gel), **Clawback** (récupération forcée), **Transfer fees** (frais de transfert) et **Authorized TrustLines** (TrustLines autorisées).

### Freeze : geler des lignes de confiance

L'émetteur d'un token peut geler des TrustLines pour empêcher les détenteurs de transférer leurs tokens. Il existe trois niveaux :

### Freeze individuel
Gèle une TrustLine spécifique entre l'émetteur et un détenteur. Cela se fait avec \`TrustSet\` en utilisant le flag \`tfSetFreeze\`. Le détenteur ne pourra ni envoyer ni recevoir ce token tant qu'il est gelé. Pour dégeler, utilise \`tfClearFreeze\`.

### Global Freeze
Gèle **toutes** les TrustLines de ton token émis. Il s'active avec \`AccountSet\` en utilisant \`SetFlag: 7\` (asfGlobalFreeze). Tous les détenteurs sont gelés simultanément. Il peut être désactivé avec \`ClearFlag: 7\`.

### NoFreeze (irréversible)
En activant \`SetFlag: 6\` (asfNoFreeze) dans \`AccountSet\`, l'émetteur renonce **définitivement** à la capacité de geler. Cela ne peut pas être annulé. C'est un signal de confiance pour les détenteurs.

### Cas d'usage de Freeze
- **Conformité réglementaire** : geler des fonds suite à une décision de justice
- **Failles de sécurité** : arrêter les transferts si un compte est compromis
- **Résolution de litiges** : geler temporairement pendant une enquête

### Clawback : récupérer des tokens auprès des détenteurs

**Clawback** permet à l'émetteur de récupérer des tokens auprès de n'importe quel détenteur. C'est un outil puissant qui doit être configuré **avant** l'émission des tokens :

1. Activer \`asfAllowTrustLineClawback\` (flag 17) avec \`AccountSet\` **avant** de créer toute TrustLine
2. Une fois activé, utiliser la transaction \`Clawback\` pour récupérer des tokens
3. **Ne peut pas être combiné** avec NoFreeze — si tu renonces au gel, tu ne peux pas faire de clawback

### Transfer fees : commissions sur les transferts

L'émetteur peut prélever un pourcentage sur chaque transfert de son token entre tiers :

- Configuré via le champ \`TransferRate\` dans \`AccountSet\`
- La valeur est un entier : 1000000000 = 0 %, 1001000000 = 0.1 %, 1010000000 = 1 %
- S'applique uniquement aux transferts entre tiers, pas lors d'un envoi vers l'émetteur
- Exemple : avec des frais de 0.1 %, l'envoi de 100 tokens fait recevoir 99.9 tokens au destinataire (0.1 est prélevé au destinataire)

### Authorized TrustLines : RequireAuth

Le flag \`RequireAuth\` (asfRequireAuth) sur le compte émetteur exige que l'émetteur **autorise explicitement** chaque TrustLine avant qu'un détenteur puisse recevoir des tokens. Utile pour les tokens nécessitant un KYC ou une vérification préalable.

### Lancer les scripts de cette leçon

Le premier script signe avec \`FROZEN_SEED\` et crée la TrustLine du détenteur ; le second signe avec \`ISSUER_SEED\` et la gèle. \`create-accounts.js\` ([module 3](?m=3&l=1)) crée les deux comptes, et chaque script lit dans \`.env\` l'adresse de l'autre partie. Lance-les dans cet ordre. Sortie sur le testnet :

\`\`\`
Result: tesSUCCESS
TrustLine created!
Holder: r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
Issuer: rDSFWxUH586ztyZ25SwUZzvArdicYJf82z

Result: tesSUCCESS
Token TrustLine frozen for r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7
The holder cannot send or receive this token
\`\`\`

- **Premier \`tesSUCCESS\`** : le détenteur a maintenant une TrustLine vers ISSUER pour le token. Un gel s'applique à une TrustLine, il en faut donc une d'abord.
- **Second \`tesSUCCESS\`** : l'émetteur a activé le gel de son côté de cette ligne. Le détenteur peut encore renvoyer le token à l'émetteur, mais pas l'envoyer à quelqu'un d'autre.`,
      codeTitles: ["Créer une TrustLine du détenteur vers l'émetteur", "Geler la TrustLine d'un utilisateur précis"],
      slides: [
        ["Freeze : gel de tokens", "Freeze bloque les mouvements sur une ligne de confiance\n\nUtile pour conformité, litiges ou incidents, mais très sensible pour l'utilisateur."],
        ["Clawback : récupération forcée", "Clawback permet à un issuer de récupérer des tokens émis sous conditions de protocole\n\nÀ utiliser seulement si le token annonce clairement cette règle."],
        ["Transfer fees et RequireAuth", "TransferRate ajoute des frais de transfert\nRequireAuth oblige l'issuer à autoriser les TrustLines\n\nCes options définissent le modèle économique et de contrôle."],
      ],
    },
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

// Step 4 of the complete process: the course's first IOU Payment
addDistributeToken(moduleData, "m6l1b");

// French and Arabic code: the English code, line by line, with its prose translated
deriveCodeTranslations(moduleData);

addNewWords(moduleData, 7);
export default moduleData;
