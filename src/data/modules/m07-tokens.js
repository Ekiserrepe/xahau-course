export default {
  id: "m6",
  icon: "🪙",
  title: {
    es: "Creación y gestión de tokens propios",
    en: "Creating and managing your own tokens",
    jp: "独自トークンの作成と管理",
  },
  lessons: [
    {
      id: "m6l1",
      title: {
        es: "TrustLines y el modelo de tokens en Xahau",
        en: "TrustLines and the token model in Xahau",
        jp: "トラストラインとXahauのトークンモデル",
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

Veremos cada una de estas configuraciones en detalle en las secciones siguientes del módulo.`,
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

We will cover each of these configurations in detail in the following sections of this module.`,
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

これらの設定の詳細は、このモジュールの以降のセクションで説明します。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear una TrustLine hacia un emisor de tokens",
            en: "Create a TrustLine toward a token issuer",
            jp: "トークン発行者へのTrustLineを作成する",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
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
      currency: "YourTokenName",
      issuer: "YourIssuerAddress",
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
            en: `require("dotenv").config();
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
      currency: "YourTokenName",
      issuer: "YourIssuerAddress",
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
      currency: "YourTokenName",
      issuer: "YourIssuerAddress",
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
          },
        },
        {
          title: {
            es: "Emitir (enviar) tokens a una cuenta con TrustLine",
            en: "Issue (send) tokens to an account with a TrustLine",
            jp: "TrustLineを持つアカウントへトークンを発行（送信）する",
          },
          language: "javascript",
          code: {
            es: `//Este código fallará si no dispones de los tokens que quieres enviar.
require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function issueTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Wallet del emisor del token
  const issuer = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Enviar 100 USD al receptor (que ya tiene TrustLine)
  const payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: "rDireccionDelReceptor",
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
            en: `//This code is going to fail if you dont own those tokens
require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function issueTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Token issuer wallet
  const issuer = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Send 100 USD to the recipient (who already has a TrustLine)
  const payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: "rRecipientAddress",
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
            jp: `//このコードは、対象のトークンを所持していない場合は失敗します
require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function issueTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // トークン発行者のウォレット
  const issuer = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 受取人（すでにTrustLineを持っている）に100 USDを送信
  const payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: "rRecipientAddress",
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
          },
        },
      ],
      slides: [
        {
          title: { es: "Modelo de tokens en Xahau", en: "Token model in Xahau", jp: "Xahauのトークンモデル" },
          content: {
            es: "No necesitas smart contracts para crear tokens\n\n1️⃣ Emisor: Cualquier cuenta\n2️⃣ TrustLine: El receptor opta-in\n3️⃣ Payment: Transferencia nativa\n\nTokens = currency + issuer",
            en: "No smart contracts needed to create tokens\n\n1️⃣ Issuer: Any account\n2️⃣ TrustLine: Recipient opts-in\n3️⃣ Payment: Native transfer\n\nTokens = currency + issuer",
            jp: "トークン作成にスマートコントラクト不要\n\n1️⃣ 発行者：どのアカウントでも可\n2️⃣ TrustLine：受取人がオプトイン\n3️⃣ Payment：ネイティブ転送\n\nトークン = currency + issuer",
          },
          visual: "🪙",
        },
        {
          title: { es: "TrustLine = Opt-in", en: "TrustLine = Opt-in", jp: "TrustLine = オプトイン" },
          content: {
            es: "El receptor ELIGE recibir un token\n\n• Crea una TrustLine hacia el emisor\n• Define el límite máximo\n• Consume reserva de propietario\n• Protege contra spam de tokens",
            en: "The recipient CHOOSES to receive a token\n\n• Creates a TrustLine toward the issuer\n• Defines the maximum limit\n• Consumes owner reserve\n• Protects against token spam",
            jp: "受取人がトークンを受け取ることを選択する\n\n• 発行者へのTrustLineを作成\n• 最大限度額を定義\n• オーナーリザーブを消費\n• トークンスパムから保護",
          },
          visual: "🤝",
        },
        {
          title: { es: "Sistema de reservas", en: "Reserve system", jp: "リザーブシステム" },
          content: {
            es: "Cada TrustLine aumenta la reserva de la cuenta\n\n• Reserva base + reserva por objeto\n• Más TrustLines = más XAH bloqueado\n• Los usuarios deben planificar sus TrustLines\n• Eliminar TrustLine (balance 0) libera reserva\n• Impacto directo en el XAH disponible",
            en: "Each TrustLine increases the account reserve\n\n• Base reserve + per-object reserve\n• More TrustLines = more XAH locked\n• Users must plan their TrustLines\n• Removing a TrustLine (balance 0) frees reserve\n• Direct impact on available XAH",
            jp: "各TrustLineはアカウントリザーブを増やします\n\n• ベースリザーブ＋オブジェクトごとのリザーブ\n• TrustLineが多いほどXAHがロックされる\n• ユーザーはTrustLineを計画的に\n• TrustLine削除（残高0）でリザーブが解放\n• 利用可能XAHへの直接影響",
          },
          visual: "💎",
        },
      ],
    },
    {
      id: "m6l1b",
      title: {
        es: "Proceso completo: crear y distribuir tu propio token",
        en: "Complete process: create and distribute your own token",
        jp: "完全なプロセス：独自トークンの作成と配布",
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
      },
      codeBlocks: [
        {
          title: {
            es: "Proceso completo: configurar emisor, crear TrustLine, emitir y distribuir token",
            en: "Complete process: configure issuer, create TrustLine, issue and distribute token",
            jp: "完全なプロセス：発行者の設定、トラストラインの作成、トークンの発行と配布",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

// Necesitas dos wallets con fondos en testnet y definelas en tu .env:
//   ISSUER_SEED  → Cuenta emisora del token
//   RESERVE_SEED  → Cuenta de reserva/distribución
// Puedes obtener fondos del faucet: https://xahau-test.net

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

  // === PASO 4 (ejemplo): Distribuir tokens a un usuario final ===
  // El usuario final debe crear primero su TrustLine hacia el emisor
  // Luego la cuenta de reserva le envía tokens:
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

createAndDistributeToken();`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

// You need two wallets with funds on testnet, define them in your .env:
//   ISSUER_SEED  → Token issuer account
//   RESERVE_SEED  → Reserve/distribution account
// You can get funds from the faucet: https://xahau-test.net

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

  // === STEP 4 (example): Distribute tokens to an end user ===
  // The end user must first create their TrustLine toward the issuer
  // Then the reserve account sends them tokens:
  //
  // const distribution = {
  //   TransactionType: "Payment",
  //   Account: reserve.address,
  //   Destination: "rEndUserAddress",
  //   Amount: {
  //     currency: TOKEN_CURRENCY,
  //     issuer: issuer.address,
  //     value: "100",
  //   },
  // };

  await client.disconnect();
}

createAndDistributeToken();`,
            jp: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

// テストネットで資金のある2つのウォレットが必要です。.envに定義してください：
//   ISSUER_SEED  → トークン発行者アカウント
//   RESERVE_SEED  → リザーブ/配布アカウント
// ファウセットから資金を取得できます: https://xahau-test.net

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

  // === ステップ4（例）：エンドユーザーにトークンを配布 ===
  // エンドユーザーは先に発行者へのTrustLineを作成する必要があります
  // その後、リザーブアカウントからトークンを送信：
  //
  // const distribution = {
  //   TransactionType: "Payment",
  //   Account: reserve.address,
  //   Destination: "rEndUserAddress",
  //   Amount: {
  //     currency: TOKEN_CURRENCY,
  //     issuer: issuer.address,
  //     value: "100",
  //   },
  // };

  await client.disconnect();
}

createAndDistributeToken();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Proceso de creación de un token", en: "Token creation process", jp: "トークン作成プロセス" },
          content: {
            es: "No necesitas smart contracts\n\n1️⃣ Configurar emisor (DefaultRipple)\n2️⃣ Crear TrustLine desde cuenta reserva\n3️⃣ Emitir supply (Payment del emisor)\n4️⃣ Distribuir a usuarios finales\n\nTodo con transacciones nativas",
            en: "No smart contracts needed\n\n1️⃣ Configure issuer (DefaultRipple)\n2️⃣ Create TrustLine from reserve account\n3️⃣ Issue supply (Payment from issuer)\n4️⃣ Distribute to end users\n\nAll with native transactions",
            jp: "スマートコントラクト不要\n\n1️⃣ 発行者を設定（DefaultRipple）\n2️⃣ リザーブアカウントからTrustLineを作成\n3️⃣ サプライを発行（発行者からPayment）\n4️⃣ エンドユーザーに配布\n\nすべてネイティブトランザクションで",
          },
          visual: "🏭",
        },
        {
          title: { es: "Dos cuentas: emisor + reserva", en: "Two accounts: issuer + reserve", jp: "2つのアカウント：発行者 + リザーブ" },
          content: {
            es: "Buena práctica: separar responsabilidades\n\n• Emisor: solo configura y emite\n  → Proteger con multi-sign\n  → Desactivar clave maestra\n\n• Reserva: opera día a día\n  → Distribuye a usuarios\n  → Vende en el DEX\n\nSi la reserva se compromete, el emisor puede congelar",
            en: "Best practice: separate responsibilities\n\n• Issuer: only configures and issues\n  -> Protect with multi-sign\n  -> Disable master key\n\n• Reserve: day-to-day operations\n  -> Distributes to users\n  -> Sells on the DEX\n\nIf reserve is compromised, the issuer can freeze",
            jp: "ベストプラクティス：責任を分離\n\n• 発行者：設定と発行のみ\n  -> マルチサインで保護\n  -> マスターキーを無効化\n\n• リザーブ：日常業務\n  -> ユーザーへの配布\n  -> DEXでの販売\n\nリザーブが侵害されたら発行者が凍結可能",
          },
          visual: "🔐",
        },
        {
          title: { es: "Resumen de transacciones", en: "Transaction summary", jp: "トランザクションまとめ" },
          content: {
            es: "AccountSet → DefaultRipple en emisor\nTrustSet → Reserva confía en emisor\nPayment → Emisor envía supply a reserva\nPayment → Reserva distribuye a usuarios\n\nUsuarios finales necesitan TrustLine\nantes de poder recibir el token",
            en: "AccountSet -> DefaultRipple on issuer\nTrustSet -> Reserve trusts issuer\nPayment -> Issuer sends supply to reserve\nPayment -> Reserve distributes to users\n\nEnd users need a TrustLine\nbefore they can receive the token",
            jp: "AccountSet -> 発行者にDefaultRipple\nTrustSet -> リザーブが発行者を信頼\nPayment -> 発行者がリザーブにサプライを送信\nPayment -> リザーブがユーザーに配布\n\nエンドユーザーはトークンを\n受け取る前にTrustLineが必要",
          },
          visual: "📋",
        },
      ],
    },
    {
      id: "m6l2",
      title: {
        es: "Gestión avanzada de tokens",
        en: "Advanced token management",
        jp: "高度なトークン管理",
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
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar los tokens (TrustLines) de una cuenta",
            en: "Query the tokens (TrustLines) of an account",
            jp: "アカウントのトークン（TrustLine）を照会する",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

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

getTokenBalances("rTuDireccionAqui");`,
            en: `const { Client } = require("xahau");

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

getTokenBalances("rYourAddressHere");`,
            jp: `const { Client } = require("xahau");

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

getTokenBalances("rYourAddressHere");`,
          },
        },

      ],
      slides: [
        {
          title: { es: "Consultar tokens", en: "Query tokens", jp: "トークンの照会" },
          content: {
            es: "account_lines → TrustLines de una cuenta\n\n• currency → Código del token\n• account → Emisor\n• balance → Balance actual\n• limit → Límite de confianza",
            en: "account_lines -> TrustLines of an account\n\n• currency -> Token code\n• account -> Issuer\n• balance -> Current balance\n• limit -> Trust limit",
            jp: "account_lines -> アカウントのTrustLine\n\n• currency -> トークンコード\n• account -> 発行者\n• balance -> 現在の残高\n• limit -> 信頼限度額",
          },
          visual: "📊",
        },
        {
          title: { es: "DefaultRipple", en: "DefaultRipple", jp: "DefaultRipple" },
          content: {
            es: "Flag esencial para emisores de tokens\n\n• Sin DefaultRipple → Solo ida y vuelta al emisor\n• Con DefaultRipple → Transferible entre terceros\n\nActívalo ANTES de emitir tokens",
            en: "Essential flag for token issuers\n\n• Without DefaultRipple -> Only back and forth to issuer\n• With DefaultRipple -> Transferable between third parties\n\nActivate it BEFORE issuing tokens",
            jp: "トークン発行者に不可欠なフラグ\n\n• DefaultRippleなし -> 発行者との間でのみ\n• DefaultRippleあり -> 第三者間で転送可能\n\nトークン発行前に有効化すること",
          },
          visual: "🔀",
        },
        {
          title: { es: "Flags importantes para emisores", en: "Important flags for issuers", jp: "発行者の重要なフラグ" },
          content: {
            es: "RequireAuth (asfRequireAuth):\n• El emisor autoriza cada TrustLine\n• Ideal para tokens con KYC\n\nDefaultRipple (asfDefaultRipple):\n• Permite transferencia entre terceros\n\nConfigurar ANTES de emitir tokens\nUsar AccountSet con SetFlag/ClearFlag",
            en: "RequireAuth (asfRequireAuth):\n• Issuer authorizes each TrustLine\n• Ideal for tokens with KYC\n\nDefaultRipple (asfDefaultRipple):\n• Allows transfer between third parties\n\nConfigure BEFORE issuing tokens\nUse AccountSet with SetFlag/ClearFlag",
            jp: "RequireAuth（asfRequireAuth）：\n• 発行者が各TrustLineを承認\n• KYCトークンに最適\n\nDefaultRipple（asfDefaultRipple）：\n• 第三者間の転送を許可\n\nトークン発行前に設定する\nAccountSetにSetFlag/ClearFlagを使用",
          },
          visual: "🚩",
        },
      ],
    },
    {
      id: "m6l3",
      title: {
        es: "Trading en el DEX nativo",
        en: "Trading on the native DEX",
        jp: "ネイティブDEXでのトレーディング",
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
- **tfSell**: Indica que la orden es una venta (en lugar de una compra). Afecta cómo se interpreta TakerPays y TakerGets.

Visita más información sobre los flags en la [documentación oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/#offercreate-flags).

### Consultar el libro de órdenes: book_offers

El comando \`book_offers\` permite ver las órdenes abiertas para un par de tokens. Devuelve las mejores ofertas ordenadas por precio.

### Auto-bridging a través de XAH

El DEX de Xahau puede enrutar operaciones multi-salto automáticamente a través de XAH. Si quieres intercambiar USD por EUR y no hay ofertas directas USD/EUR, el DEX puede:
1. Vender USD por XAH
2. Comprar EUR con XAH

Todo en una sola transacción, de forma transparente. Esto mejora la liquidez del DEX significativamente.`,
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

All in a single transaction, transparently. This significantly improves DEX liquidity.`,
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

これによりDEXの流動性が大幅に向上します。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar el libro de órdenes de un par de tokens (USD/XAH)",
            en: "Query the order book for a token pair (USD/XAH)",
            jp: "トークンペアの注文書を照会する（EVR/XAH）",
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
          },
        },
        {
          title: {
            es: "Crear una oferta en el DEX (vender 100 Tokens por XAH)",
            en: "Create an offer on the DEX (sell 100 Tokens for XAH)",
            jp: "DEXに注文を出す（100トークンをXAHで売る）",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
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

  const issuerAddress = "rDireccionDelEmisorToken";
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
            en: `require("dotenv").config();
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
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). MMax ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}


async function createOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = "rTokenIssuerAddress";
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
  const issuerAddress = "rTokenIssuerAddress";
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
          },
        },
        {
          title: {
            es: "Cancelar una oferta existente en el DEX",
            en: "Cancel an existing offer on the DEX",
            jp: "DEXの既存注文をキャンセルする",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function cancelOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  // Cancelar una oferta usando su OfferSequence
  const cancel = {
    TransactionType: "OfferCancel",
    Account: trader.address,
    OfferSequence: 12345, // Sequence de la oferta a cancelar
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
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function cancelOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  // Cancel an offer using its OfferSequence
  const cancel = {
    TransactionType: "OfferCancel",
    Account: trader.address,
    OfferSequence: 12345, // Sequence of the offer to cancel
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
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function cancelOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});

  // OfferSequenceを使って注文をキャンセルする
  const cancel = {
    TransactionType: "OfferCancel",
    Account: trader.address,
    OfferSequence: 12345, // キャンセルする注文のSequence
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
          },
        },
      ],
      slides: [
        {
          title: { es: "DEX nativo de Xahau", en: "Xahau native DEX", jp: "XahauネイティブDEX" },
          content: {
            es: "Exchange descentralizado integrado en el protocolo\n\n• Sin smart contracts\n• Sin plataformas externas\n• Liquidación atómica\n• Auto-bridging a través de XAH\n\nTodo con transacciones nativas",
            en: "Decentralized exchange built into the protocol\n\n• No smart contracts\n• No external platforms\n• Atomic settlement\n• Auto-bridging through XAH\n\nAll with native transactions",
            jp: "プロトコルに組み込まれた分散型取引所\n\n• スマートコントラクト不要\n• 外部プラットフォーム不要\n• アトミック決済\n• XAHを通じたオートブリッジング\n\nすべてネイティブトランザクションで",
          },
          visual: "📈",
        },
        {
          title: { es: "OfferCreate: anatomía de una orden", en: "OfferCreate: anatomy of an order", jp: "OfferCreate：注文の構造" },
          content: {
            es: "TakerPays → Lo que quieres RECIBIR\nTakerGets → Lo que estás dispuesto a DAR\n\nFlags especiales:\n• tfImmediateOrCancel → Ejecutar o cancelar\n• tfPassive → Solo match existente\n• tfFillOrKill → Ejecutar todo o nada\n• tfSell → Indica que es una venta\n\nOfferCancel → Cancelar orden abierta",
            en: "TakerPays -> What you want to RECEIVE\nTakerGets -> What you are willing to GIVE\n\nSpecial flags:\n• tfImmediateOrCancel -> Execute or cancel\n• tfPassive -> Only match existing\n• tfFillOrKill -> Execute all or nothing\n• tfSell -> Receive as much as TakerGets amount\n\nOfferCancel -> Cancel open order",
            jp: "TakerPays -> 受け取りたいもの\nTakerGets -> 提供する意思があるもの\n\n特殊フラグ：\n• tfImmediateOrCancel -> 実行またはキャンセル\n• tfPassive -> 既存注文にのみマッチ\n• tfFillOrKill -> 全量実行またはキャンセル\n• tfSell -> 可能な限り多くの金額を受け取る\n\nOfferCancel -> 未決注文をキャンセル",
          },
          visual: "🔄",
        },
        {
          title: { es: "Auto-bridging y order book", en: "Auto-bridging and order book", jp: "オートブリッジングと注文書" },
          content: {
            es: "El DEX enruta trades multi-salto vía XAH\n\nEjemplo: USD → XAH → EUR\n\n• book_offers → Ver el libro de órdenes\n• Bids y Asks se cruzan automáticamente\n• Ejecución parcial o total\n• Liquidez compartida entre pares",
            en: "The DEX routes multi-hop trades via XAH\n\nExample: USD -> XAH -> EUR\n\n• book_offers -> View the order book\n• Bids and Asks cross automatically\n• Partial or full execution\n• Shared liquidity across pairs",
            jp: "DEXはXAHを経由してマルチホップ取引をルーティング\n\n例：USD -> XAH -> EUR\n\n• book_offers -> 注文書を表示\n• BidsとAsksが自動的に交差\n• 部分または全量実行\n• ペア間で流動性を共有",
          },
          visual: "🌐",
        },
      ],
    },
    {
      id: "m6l4",
      title: {
        es: "Control avanzado de tokens: Freeze y Clawback",
        en: "Advanced token control: Freeze and Clawback",
        jp: "高度なトークン制御：FreezeとClawback",
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
- Ejemplo: Con 0.1% de fee, al enviar 100 tokens se cobran 100.1 del remitente

### Authorized TrustLines: RequireAuth

El flag \`RequireAuth\` (asfRequireAuth) en la cuenta emisora requiere que el emisor **autorice explícitamente** cada TrustLine antes de que un holder pueda recibir tokens. Útil para tokens que necesitan KYC o verificación previa.`,
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

The \`RequireAuth\` flag (asfRequireAuth) on the issuing account requires the issuer to **explicitly authorize** each TrustLine before a holder can receive tokens. Useful for tokens that need KYC or prior verification.`,
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

発行アカウントの\`RequireAuth\`フラグ（asfRequireAuth）は、ホルダーがトークンを受け取れるようになる前に、発行者が**各トラストラインを明示的に承認**することを要求します。KYCや事前確認が必要なトークンに便利です。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear una TrustLine desde un holder hacia el emisor",
            en: "Create a TrustLine from a holder toward the issuer",
            jp: "ホルダーから発行者へのTrustLineを作成する",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
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
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). MMax ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createHolderTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // El holder que quiere recibir el token y luego congelaremos su TrustLine si es necesario
  const holder = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = "rDireccionDelEmisor";
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
            en: `require("dotenv").config();
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
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). MMax ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createHolderTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // The holder who wants to receive the token; their TrustLine can be frozen later if needed
  const holder = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = "rIssuerAddress";
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
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). MMax ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function createHolderTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // トークンを受け取り、必要に応じてTrustLineを凍結されるホルダー
  const holder = Wallet.fromSeed(process.env.FROZEN_SEED, {algorithm: 'secp256k1'});
  const issuerAddress = "rIssuerAddress";
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
          },
        },
        {
          title: {
            es: "Congelar la TrustLine de un usuario específico",
            en: "Freeze a specific user's TrustLine",
            jp: "特定ユーザーのTrustLineを凍結する",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
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
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). MMax ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function freezeTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const holderAddress = "rDireccionDelHolder";
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
            en: `require("dotenv").config();
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
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). MMax ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function freezeTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const holderAddress = "rHolderAddress";
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
      \`token_currency too long: "\${cur}" -> hex \${hex.length} (>40). MMax ~20 bytes in UTF-8.\`
    );
  }

  return hex.padEnd(40, "0");
}

async function freezeTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const holderAddress = "rHolderAddress";
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
          },
        },
      ],
      slides: [
        {
          title: { es: "Freeze: congelación de tokens", en: "Freeze: token freezing", jp: "Freeze：トークンの凍結" },
          content: {
            es: "El emisor puede congelar transferencias\n\n• Individual Freeze → Una TrustLine específica\n• Global Freeze → TODAS las TrustLines\n• NoFreeze → Renunciar permanentemente\n\nCasos: regulación, seguridad, disputas",
            en: "The issuer can freeze transfers\n\n• Individual Freeze -> A specific TrustLine\n• Global Freeze -> ALL TrustLines\n• NoFreeze -> Permanently renounce\n\nUse cases: regulation, security, disputes",
            jp: "発行者は転送を凍結できます\n\n• 個別Freeze -> 特定のTrustLine\n• グローバルFreeze -> すべてのTrustLine\n• NoFreeze -> 恒久的に放棄\n\nユースケース：規制、セキュリティ、紛争",
          },
          visual: "🧊",
        },
        {
          title: { es: "Clawback: recuperación forzada", en: "Clawback: forced recovery", jp: "Clawback：強制回収" },
          content: {
            es: "Reclamar tokens de cualquier holder\n\n1️⃣ Activar asfAllowTrustLineClawback\n2️⃣ Usar transacción Clawback\n\n⚠️ Debe activarse ANTES de emitir tokens\n⚠️ Incompatible con NoFreeze",
            en: "Reclaim tokens from any holder\n\n1️⃣ Activate asfAllowTrustLineClawback\n2️⃣ Use Clawback transaction\n\n⚠️ Must be activated BEFORE issuing tokens\n⚠️ Incompatible with NoFreeze",
            jp: "任意のホルダーからトークンを回収\n\n1️⃣ asfAllowTrustLineClawbackを有効化\n2️⃣ Clawbackトランザクションを使用\n\n⚠️ トークン発行前に有効化が必要\n⚠️ NoFreezeとは非互換",
          },
          visual: "🔙",
        },
        {
          title: { es: "Transfer fees y RequireAuth", en: "Transfer fees and RequireAuth", jp: "Transfer feesとRequireAuth" },
          content: {
            es: "Transfer fees:\n• TransferRate en AccountSet\n• Porcentaje en cada transferencia entre terceros\n• Ejemplo: 0.1% → 1001000000\n\nRequireAuth:\n• El emisor autoriza cada TrustLine\n• Ideal para tokens con KYC",
            en: "Transfer fees:\n• TransferRate in AccountSet\n• Percentage on each transfer between third parties\n• Example: 0.1% -> 1001000000\n\nRequireAuth:\n• Issuer authorizes each TrustLine\n• Ideal for tokens with KYC",
            jp: "Transfer fees：\n• AccountSetのTransferRate\n• 第三者間転送ごとに割合を徴収\n• 例：0.1% -> 1001000000\n\nRequireAuth：\n• 発行者が各TrustLineを承認\n• KYCトークンに最適",
          },
          visual: "🔐",
        },
      ],
    },
  ],
}
