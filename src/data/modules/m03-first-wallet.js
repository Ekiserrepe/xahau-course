export default {
  id: "m3",
  icon: "👛",
  title: {
    es: "Generación de tu primera wallet",
    en: "Generating your first wallet",
    jp: "初めてのウォレット生成",
  },
  lessons: [
    {
      id: "m3l1",
      title: {
        es: "Criptografía y claves en Xahau",
        en: "Cryptography and keys in Xahau",
        jp: "Xahauの暗号技術と鍵",
      },
      theory: {
        es: `Antes de interactuar con Xahau, necesitas una **wallet** (cartera). Una wallet no es más que un par de claves criptográficas que te permiten firmar transacciones y demostrar la propiedad de tu cuenta.

### Par de claves

En Xahau (y en muchas otras blockchains), cada cuenta se basa en criptografía de curva elíptica:

- **Clave privada (Secret/Seed)**: Un valor secreto que NUNCA debes compartir. Se usa para firmar transacciones. Suele representarse como un "family seed" que empieza por \`s\` (ej: \`sEdV....\`)
- **Clave pública**: Se deriva de la clave privada. Se usa para verificar firmas
- **Dirección (Account)**: Se deriva de la clave pública. Empieza por \`r\` (ej: \`rHb9CJ...\`). Es tu identificador público en la red

### Algoritmos soportados

Xahau soporta dos algoritmos de firma:
- **secp256k1**: El mismo que usa Bitcoin. Es el algoritmo por defecto
- **ed25519**: Más moderno y eficiente. Recomendado para nuevas cuentas

**Nota:** La librería \`xahau js\`, deriva por defecto en **ed25519** si no se especifica el algoritmo. El faucet de [xahau-test.net](https://xahau-test.net) genera las wallets con **secp256k1**, por lo que verás que los ejemplos de código de este curso se especifica este algoritmo cuando generamos las wallets.

### Activación de cuenta

A diferencia de Ethereum, en Xahau una cuenta **no existe en el ledger hasta que recibe su primer depósito**. Se necesita un mínimo de **1 XAH** (reserve base) para activar una cuenta. Este XAH queda bloqueado como reserva mientras la cuenta exista.

### Seguridad

- Nunca compartas tu clave privada (seed/secret)
- Usa la **testnet** para pruebas (tokens sin valor real)
- Guarda tus seeds de mainnet en un lugar seguro y offline`,
        en: `Before interacting with Xahau, you need a **wallet**. A wallet is simply a pair of cryptographic keys that allow you to sign transactions and prove ownership of your account.

### Key pair

In Xahau (and many other blockchains), each account is based on elliptic curve cryptography:

- **Private key (Secret/Seed)**: A secret value that you should NEVER share. It is used to sign transactions. It is usually represented as a "family seed" starting with \`s\` (e.g.: \`sEdV....\`)
- **Public key**: Derived from the private key. Used to verify signatures
- **Address (Account)**: Derived from the public key. Starts with \`r\` (e.g.: \`rHb9CJ...\`). It is your public identifier on the network

### Supported algorithms

Xahau supports two signing algorithms:
- **secp256k1**: The same one used by Bitcoin. It is the default algorithm
- **ed25519**: More modern and efficient. Recommended for new accounts

**Note:** The \`xahau js\` library derives by default to **ed25519** if no algorithm is specified. The faucet at [xahau-test.net](https://xahau-test.net) generates wallets with **secp256k1**, so you will see that the code examples in this course specify this algorithm when generating wallets.

### Account activation

Unlike Ethereum, in Xahau an account **does not exist on the ledger until it receives its first deposit**. A minimum of **1 XAH** (base reserve) is needed to activate an account. This XAH remains locked as a reserve as long as the account exists.

### Security

- Never share your private key (seed/secret)
- Use the **testnet** for testing (tokens with no real value)
- Store your mainnet seeds in a secure, offline location`,
        jp: `Xahauと対話する前に、**ウォレット**が必要です。ウォレットはトランザクションに署名しアカウントの所有権を証明するための暗号鍵ペアにすぎません。

### 鍵ペア

Xahau（および多くの他のブロックチェーン）では、各アカウントは楕円曲線暗号に基づいています。

- **秘密鍵（Secret/Seed）**：絶対に共有してはならない秘密の値。トランザクションの署名に使用される。通常 \`s\` で始まる「ファミリーシード」として表される（例：\`sEdV....\`）
- **公開鍵**：秘密鍵から導出される。署名の検証に使用される
- **アドレス（Account）**：公開鍵から導出される。\`r\` で始まる（例：\`rHb9CJ...\`）。ネットワーク上のあなたの公開識別子

### サポートされているアルゴリズム

Xahauは2つの署名アルゴリズムをサポートしています：
- **secp256k1**：Bitcoinが使用するものと同じ。デフォルトのアルゴリズム
- **ed25519**：より新しく効率的。新しいアカウントに推奨

**注意：** \`xahau js\` ライブラリはアルゴリズムが指定されない場合、デフォルトで **ed25519** を使用します。[xahau-test.net](https://xahau-test.net) のフォーセットは **secp256k1** でウォレットを生成するため、このコースのコード例ではウォレット生成時にこのアルゴリズムを指定しています。

### アカウントのアクティベーション

Ethereumとは異なり、Xahauではアカウントは**最初の入金を受け取るまでレジャーに存在しません**。アカウントをアクティベートするには最低 **1 XAH**（基本準備金）が必要です。このXAHはアカウントが存在する限り準備金としてロックされます。

### セキュリティ

- 秘密鍵（seed/secret）を絶対に共有しないこと
- テストには**テストネット**を使用する（実際の価値のないトークン）
- メインネットのシードは安全なオフラインの場所に保管すること`,
      },
      codeBlocks: [
        {
          title: {
            es: "Generar una wallet nueva",
            en: "Generate a new wallet",
            jp: "新しいウォレットを生成する",
          },
          language: "javascript",
          code: {
            es: `const { ECDSA, Wallet } = require("xahau");

// Generar wallet con el algoritmo por defecto (secp256k1)
const wallet1 = Wallet.generate(ECDSA.secp256k1);
console.log("=== Wallet secp256k1 ===");
console.log("Dirección:", wallet1.address);
console.log("Clave pública:", wallet1.publicKey);
console.log("Seed:", wallet1.seed);

// Generar wallet con el algoritmo ed25519
const wallet2 = Wallet.generate();
console.log("=== Wallet ed25519 ===");
console.log("Dirección:", wallet2.address);
console.log("Clave pública:", wallet2.publicKey);
console.log("Seed:", wallet2.seed);`,
            en: `const { ECDSA, Wallet } = require("xahau");

// Generate wallet with default algorithm (secp256k1)
const wallet1 = Wallet.generate(ECDSA.secp256k1);
console.log("=== Wallet secp256k1 ===");
console.log("Address:", wallet1.address);
console.log("Public key:", wallet1.publicKey);
console.log("Seed:", wallet1.seed);

// Generate wallet with ed25519 algorithm
const wallet2 = Wallet.generate();
console.log("=== Wallet ed25519 ===");
console.log("Address:", wallet2.address);
console.log("Public key:", wallet2.publicKey);
console.log("Seed:", wallet2.seed);`,
            jp: `const { ECDSA, Wallet } = require("xahau");

// デフォルトアルゴリズム（secp256k1）でウォレットを生成する
const wallet1 = Wallet.generate(ECDSA.secp256k1);
console.log("=== Wallet secp256k1 ===");
console.log("アドレス：", wallet1.address);
console.log("公開鍵：", wallet1.publicKey);
console.log("シード：", wallet1.seed);

// ed25519アルゴリズムでウォレットを生成する
const wallet2 = Wallet.generate();
console.log("=== Wallet ed25519 ===");
console.log("アドレス：", wallet2.address);
console.log("公開鍵：", wallet2.publicKey);
console.log("シード：", wallet2.seed);`,
          },
        },
        {
          title: {
            es: "Restaurar una wallet desde un seed existente",
            en: "Restore a wallet from an existing seed",
            jp: "既存のシードからウォレットを復元する",
          },
          language: "javascript",
          code: {
            es: `const { Wallet } = require("xahau");

// Restaurar wallet desde un seed existente
// (usa tu propio seed de testnet)
const seed = "sEdVHBhkL2next8NH9cMPyPJoXXXXXX";
// Si prefieres derivarla en ed25519, elimina {algorithm: 'secp256k1'} ya que usará ed25519 por defecto
const wallet = Wallet.fromSeed(seed, {algorithm: 'secp256k1'});

console.log("Dirección:", wallet.address);
console.log("Clave pública:", wallet.publicKey);
console.log("Seed:", wallet.seed);

// El mismo seed siempre genera la misma dirección
// ¡Nunca compartas tu seed!`,
            en: `const { Wallet } = require("xahau");

// Restore wallet from an existing seed
// (use your own testnet seed)
const seed = "sEdVHBhkL2next8NH9cMPyPJoXXXXXX";
// If you prefer to derive it in ed25519, remove {algorithm: 'secp256k1'} since it will use ed25519 by default
const wallet = Wallet.fromSeed(seed, {algorithm: 'secp256k1'});

console.log("Address:", wallet.address);
console.log("Public key:", wallet.publicKey);
console.log("Seed:", wallet.seed);

// The same seed always generates the same address
// Never share your seed!`,
            jp: `const { Wallet } = require("xahau");

// 既存のシードからウォレットを復元する
// （自分のテストネットシードを使用すること）
const seed = "sEdVHBhkL2next8NH9cMPyPJoXXXXXX";
// ed25519で導出したい場合は {algorithm: 'secp256k1'} を削除する（デフォルトでed25519を使用）
const wallet = Wallet.fromSeed(seed, {algorithm: 'secp256k1'});

console.log("アドレス：", wallet.address);
console.log("公開鍵：", wallet.publicKey);
console.log("シード：", wallet.seed);

// 同じシードは常に同じアドレスを生成する
// シードを絶対に共有しないこと！`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es una Wallet?", en: "What is a Wallet?", jp: "ウォレットとは？" },
          content: {
            es: "Un par de claves criptográficas:\n\n🔑 Clave privada (seed) → Firmar transacciones\n📢 Clave pública → Verificar firmas\n📍 Dirección (r...) → Tu identidad en la red",
            en: "A pair of cryptographic keys:\n\n🔑 Private key (seed) → Sign transactions\n📢 Public key → Verify signatures\n📍 Address (r...) → Your identity on the network",
            jp: "暗号鍵のペア：\n\n🔑 秘密鍵（シード） → トランザクションに署名\n📢 公開鍵 → 署名を検証\n📍 アドレス（r...） → ネットワーク上のあなたの識別子",
          },
          visual: "👛",
        },
        {
          title: { es: "Algoritmos de firma", en: "Signing algorithms", jp: "署名アルゴリズム" },
          content: {
            es: "Xahau soporta dos algoritmos:\n\n• secp256k1 → Igual que Bitcoin (por defecto)\n• ed25519 → Más moderno y eficiente\n\nAmbos son seguros y válidos",
            en: "Xahau supports two algorithms:\n\n• secp256k1 → Same as Bitcoin (default)\n• ed25519 → More modern and efficient\n\nBoth are secure and valid",
            jp: "Xahauは2つのアルゴリズムをサポート：\n\n• secp256k1 → Bitcoinと同じ（デフォルト）\n• ed25519 → より新しく効率的\n\nどちらも安全で有効",
          },
          visual: "🔐",
        },
        {
          title: { es: "Activación de cuenta", en: "Account activation", jp: "アカウントのアクティベーション" },
          content: {
            es: "Una cuenta NO existe hasta que recibe\nsu primer depósito\n\n• Mínimo 1 XAH de reserva base\n• Este XAH queda bloqueado\n• En testnet: usa el faucet gratuito",
            en: "An account does NOT exist until it receives\nits first deposit\n\n• Minimum 1 XAH base reserve\n• This XAH remains locked\n• On testnet: use the free faucet",
            jp: "アカウントは最初の入金を受け取るまで\n存在しない\n\n• 最低1 XAHのベースリザーブが必要\n• このXAHはロックされる\n• テストネット：無料フォーセットを使用",
          },
          visual: "✨",
        },
      ],
    },
    {
      id: "m3l2",
      title: {
        es: "Activar tu wallet en testnet",
        en: "Activate your wallet on testnet",
        jp: "テストネットでウォレットをアクティベートする",
      },
      theory: {
        es: `Ahora que sabes generar una wallet, el siguiente paso es **activarla** en la red. Para desarrollo y pruebas, usaremos la **testnet de Xahau** donde los tokens no tienen valor real.

### ¿Qué es la testnet?

La testnet es una copia de la red Xahau diseñada para desarrollo:
- Los tokens (test XAH) **no tienen valor real**
- Puedes obtener tokens gratis desde el **faucet**
- Las transacciones funcionan igual que en mainnet
- Es el lugar perfecto para aprender y experimentar

### Faucet

El faucet es un servicio que envía tokens de prueba a tu wallet. Puedes usarlo directamente desde código con la librería \`xahau\`. También puedes conseguir una wallet con test XAH desde la interfaz web del faucet: [xahau-test.net](https://xahau-test.net). Puedes utilizar la seed después en tu código o importarla a Xaman.

### Verificar tu cuenta

Una vez activada tu cuenta, puedes verificar su existencia consultando el comando \`account_info\`. Este te mostrará:
- **Balance**: Cantidad de XAH en tu cuenta (en drops: 1 XAH = 1,000,000 drops)
- **Sequence**: Número de secuencia para la próxima transacción
- **Flags**: Configuración de la cuenta
- **OwnerCount**: Número de objetos que posee la cuenta en el ledger`,
        en: `Now that you know how to generate a wallet, the next step is to **activate** it on the network. For development and testing, we will use the **Xahau testnet** where tokens have no real value.

### What is the testnet?

The testnet is a copy of the Xahau network designed for development:
- Tokens (test XAH) **have no real value**
- You can get free tokens from the **faucet**
- Transactions work the same as on mainnet
- It is the perfect place to learn and experiment

### Faucet

The faucet is a service that sends test tokens to your wallet. You can use it directly from code with the \`xahau\` library. You can also get a wallet with test XAH from the faucet web interface: [xahau-test.net](https://xahau-test.net). You can then use the seed in your code or import it into Xaman.

### Verify your account

Once your account is activated, you can verify its existence by querying the \`account_info\` command. It will show you:
- **Balance**: Amount of XAH in your account (in drops: 1 XAH = 1,000,000 drops)
- **Sequence**: Sequence number for the next transaction
- **Flags**: Account configuration
- **OwnerCount**: Number of objects the account owns on the ledger`,
        jp: `ウォレットの生成方法がわかったので、次のステップはネットワーク上で**アクティベート**することです。開発とテストには、トークンに実際の価値がない **Xahauテストネット**を使用します。

### テストネットとは？

テストネットは開発用に設計されたXahauネットワークのコピーです。
- トークン（テストXAH）は**実際の価値がない**
- **Faucet**から無料でトークンを取得できる
- トランザクションはメインネットと同様に機能する
- 学習と実験に最適な場所

### Faucet

Faucetはテストトークンをウォレットに送るサービスです。\`xahau\` ライブラリを使ってコードから直接使用できます。FaucetのWebインターフェース([xahau-test.net](https://xahau-test.net))からテストXAH付きのウォレットを取得することもできます。その後、シードをコードで使用するか、Xamanにインポートできます。

### アカウントの確認

アカウントがアクティベートされたら、\`account_info\` コマンドを照会してその存在を確認できます。以下の情報が表示されます。
- **Balance**：アカウントのXAH残高（dropsで：1 XAH = 1,000,000 drops）
- **Sequence**：次のトランザクションのシーケンス番号
- **Flags**：アカウントの設定
- **OwnerCount**：アカウントがレジャーに持つオブジェクト数`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear y activar una wallet en testnet usando el faucet",
            en: "Create and activate a wallet on testnet using the faucet",
            jp: "フォーセットを使ってテストネットでウォレットを作成・アクティベートする",
          },
          language: "javascript",
          code: {
            es: `const { Client, Wallet } = require("xahau");

async function createTestnetWallet() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Generar una nueva wallet
  const wallet = Wallet.generate();
  console.log("Wallet generada:");
  console.log("  Dirección:", wallet.address);
  console.log("  Seed:", wallet.seed);

  // Solicitar fondos del faucet de testnet
  console.log("Solicitando fondos del faucet...");
  const fundResult = await client.fundWallet(wallet);

  console.log("¡Wallet financiada!");
  console.log("  Balance:", fundResult.balance, "XAH");

  // Verificar la cuenta en el ledger
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const account = response.result.account_data;
  console.log("Datos de la cuenta en el ledger:");
  console.log("  Balance:", account.Balance, "drops");
  console.log("  Balance:", Number(account.Balance) / 1_000_000, "XAH");
  console.log("  Secuencia:", account.Sequence);

  await client.disconnect();
}

createTestnetWallet();`,
            en: `const { Client, Wallet } = require("xahau");

async function createTestnetWallet() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Generate a new wallet
  const wallet = Wallet.generate();
  console.log("Wallet generated:");
  console.log("  Address:", wallet.address);
  console.log("  Seed:", wallet.seed);

  // Request funds from the testnet faucet
  console.log("Requesting funds from faucet...");
  const fundResult = await client.fundWallet(wallet);

  console.log("Wallet funded!");
  console.log("  Balance:", fundResult.balance, "XAH");

  // Verify the account on the ledger
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const account = response.result.account_data;
  console.log("Account data on the ledger:");
  console.log("  Balance:", account.Balance, "drops");
  console.log("  Balance:", Number(account.Balance) / 1_000_000, "XAH");
  console.log("  Sequence:", account.Sequence);

  await client.disconnect();
}

createTestnetWallet();`,
            jp: `const { Client, Wallet } = require("xahau");

async function createTestnetWallet() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 新しいウォレットを生成する
  const wallet = Wallet.generate();
  console.log("ウォレットが生成されました：");
  console.log("  アドレス：", wallet.address);
  console.log("  シード：", wallet.seed);

  // テストネットフォーセットから資金をリクエストする
  console.log("フォーセットから資金をリクエスト中...");
  const fundResult = await client.fundWallet(wallet);

  console.log("ウォレットに資金が追加されました！");
  console.log("  残高：", fundResult.balance, "XAH");

  // レジャーのアカウントを確認する
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const account = response.result.account_data;
  console.log("レジャーのアカウントデータ：");
  console.log("  残高：", account.Balance, "drops");
  console.log("  残高：", Number(account.Balance) / 1_000_000, "XAH");
  console.log("  シーケンス：", account.Sequence);

  await client.disconnect();
}

createTestnetWallet();`,
          },
        },
        {
          title: {
            es: "Consultar el balance de una cuenta existente",
            en: "Check the balance of an existing account",
            jp: "既存アカウントの残高を確認する",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function checkBalance(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    console.log("Cuenta:", account.Account);
    console.log("Balance:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("Secuencia:", account.Sequence);
    console.log("Objetos del propietario:", account.OwnerCount);
  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("La cuenta no existe en el ledger.");
      console.log("Necesita recibir al menos 1 XAH para activarse.");
    } else {
      console.error("Error:", error.message);
    }
  }

  await client.disconnect();
}

// Reemplaza con tu dirección de testnet
checkBalance("rYourXahauAddressHere");`,
            en: `const { Client } = require("xahau");

async function checkBalance(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    console.log("Account:", account.Account);
    console.log("Balance:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("Sequence:", account.Sequence);
    console.log("Owner Count:", account.OwnerCount);
  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("The account does not exist on the ledger.");
      console.log("It needs to receive at least 1 XAH to be activated.");
    } else {
      console.error("Error:", error.message);
    }
  }

  await client.disconnect();
}

// Replace with your testnet address
checkBalance("rYourXahauAddressHere");`,
            jp: `const { Client } = require("xahau");

async function checkBalance(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    console.log("アカウント：", account.Account);
    console.log("残高：", Number(account.Balance) / 1_000_000, "XAH");
    console.log("シーケンス：", account.Sequence);
    console.log("オーナー数：", account.OwnerCount);
  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("アカウントがレジャーに存在しません。");
      console.log("アクティベートには少なくとも1 XAHを受け取る必要があります。");
    } else {
      console.error("エラー：", error.message);
    }
  }

  await client.disconnect();
}

// テストネットのアドレスに置き換えてください
checkBalance("rYourXahauAddressHere");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Testnet de Xahau", en: "Xahau Testnet", jp: "Xahauテストネット" },
          content: {
            es: "Red de pruebas para desarrollo\n\n• Tokens sin valor real\n• Faucet gratuito para obtener test XAH\n• Funciona igual que mainnet\n• Perfecto para aprender",
            en: "Test network for development\n\n• Tokens with no real value\n• Free faucet to get test XAH\n• Works the same as mainnet\n• Perfect for learning",
            jp: "開発用テストネットワーク\n\n• 実際の価値のないトークン\n• テストXAHを取得する無料フォーセット\n• メインネットと同様に機能する\n• 学習に最適",
          },
          visual: "🧪",
        },
        {
          title: { es: "Flujo de activación", en: "Activation flow", jp: "アクティベーションフロー" },
          content: {
            es: "1️⃣ Generar wallet (par de claves)\n2️⃣ Obtener XAH del faucet\n3️⃣ El faucet envía un pago\n4️⃣ La cuenta se crea en el ledger\n5️⃣ ¡Lista para usar!",
            en: "1️⃣ Generate wallet (key pair)\n2️⃣ Get XAH from the faucet\n3️⃣ The faucet sends a payment\n4️⃣ The account is created on the ledger\n5️⃣ Ready to use!",
            jp: "1️⃣ ウォレットを生成する（鍵ペア）\n2️⃣ フォーセットからXAHを取得する\n3️⃣ フォーセットが支払いを送る\n4️⃣ アカウントがレジャーに作成される\n5️⃣ 使用準備完了！",
          },
          visual: "🚀",
        },
        {
          title: { es: "Verificar con account_info", en: "Verify with account_info", jp: "account_infoで確認する" },
          content: {
            es: "Comando account_info para confirmar activación:\n\n• Balance → XAH disponible (en drops)\n• Sequence → Número de próxima transacción\n• Flags → Configuración de la cuenta\n• OwnerCount → Objetos en el ledger\n\nSi la cuenta no existe: error actNotFound\n1 XAH = 1,000,000 drops",
            en: "account_info command to confirm activation:\n\n• Balance → Available XAH (in drops)\n• Sequence → Next transaction number\n• Flags → Account configuration\n• OwnerCount → Objects on the ledger\n\nIf the account does not exist: actNotFound error\n1 XAH = 1,000,000 drops",
            jp: "アクティベーションを確認するaccount_infoコマンド：\n\n• Balance → 利用可能なXAH（dropsで）\n• Sequence → 次のトランザクション番号\n• Flags → アカウント設定\n• OwnerCount → レジャー上のオブジェクト\n\nアカウントが存在しない場合：actNotFoundエラー\n1 XAH = 1,000,000 drops",
          },
          visual: "🔎",
        },
      ],
    },
    {
      id: "m3l2b",
      title: {
        es: "Comprobar tu cuenta en exploradores de bloques",
        en: "Check your account on block explorers",
        jp: "ブロックエクスプローラーでアカウントを確認する",
      },
      theory: {
        es: `Una vez que tu cuenta está activada en la testnet (o en mainnet), puedes verificar su estado usando **exploradores de bloques**: aplicaciones web que permiten consultar cualquier cuenta, transacción o ledger de forma visual y sin necesidad de escribir código.

### ¿Qué es un explorador de bloques?

Un **explorador de bloques** es una herramienta web que se conecta a los nodos de Xahau y te presenta la información de la blockchain de forma legible. Es como un "buscador" de la blockchain.

Con un explorer puedes:
- Ver el **balance** y los **tokens** de cualquier cuenta
- Consultar el **historial de transacciones** completo
- Inspeccionar los **detalles** de cualquier transacción (hash, campos, resultado)
- Ver los **objetos del ledger** asociados a una cuenta (trust lines, ofertas, hooks)
- Verificar si una transacción se procesó correctamente

### Exploradores de Xahau Mainnet

**Xahau Explorer** — [xahauexplorer.com](https://xahauexplorer.com)
**XRPLWin Xahau** — [xahau.xrplwin.com](https://xahau.xrplwin.com)
**Xahau Network Explorer** — [explorer.xahau.network](https://explorer.xahau.network)
**XahScan** — [xahscan.com](https://xahscan.com)


### Exploradores de Xahau Testnet

Para consultar cuentas de la **testnet** (que es la que usamos en el curso), usa estos exploradores:

- [test.xahauexplorer.com](https://test.xahauexplorer.com)
- [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
- [explorer.xahau-test.net](https://explorer.xahau-test.net)

### Cómo consultar tu cuenta

1. Abre cualquiera de los exploradores de testnet
2. En la barra de búsqueda, pega tu **dirección** (empieza por \`r\`)
3. Pulsa Enter o haz clic en buscar
4. Verás la información de tu cuenta:
   - **Balance** en XAH
   - **Tokens** que posees (trust lines)
   - **Transacciones** recientes
   - **Flags** y configuración de la cuenta
   - **Objetos** del ledger asociados

### Consultar una transacción

Cada transacción tiene un **hash** único (una cadena hexadecimal larga). Puedes buscar ese hash en el explorer para ver:
- **Tipo** de transacción (Payment, TrustSet, AccountSet, etc.)
- **Cuenta origen** y **destino**
- **Cantidad** enviada
- **Resultado** (tesSUCCESS, tecPATH_DRY, etc.)
- **Fee** pagado
- **Ledger** en el que se incluyó
- **Cambios** en el estado del ledger (AffectedNodes)

### ¿Por qué usar explorers?

- **Verificación visual**: Confirmar que una transacción se procesó correctamente sin escribir código
- **Depuración**: Cuando algo falla, el explorer muestra todos los detalles del error
- **Transparencia**: Cualquier persona puede verificar cualquier operación en la blockchain
- **Aprendizaje**: Ver transacciones reales te ayuda a entender cómo funciona la red por dentro`,
        en: `Once your account is activated on the testnet (or on mainnet), you can verify its status using **block explorers**: web applications that allow you to query any account, transaction, or ledger visually and without writing code.

### What is a block explorer?

A **block explorer** is a web tool that connects to Xahau nodes and presents blockchain information in a readable format. It is like a "search engine" for the blockchain.

With an explorer you can:
- View the **balance** and **tokens** of any account
- Check the complete **transaction history**
- Inspect the **details** of any transaction (hash, fields, result)
- View the **ledger objects** associated with an account (trust lines, offers, hooks)
- Verify if a transaction was processed successfully

### Xahau Mainnet Explorers

**Xahau Explorer** — [xahauexplorer.com](https://xahauexplorer.com)
**XRPLWin Xahau** — [xahau.xrplwin.com](https://xahau.xrplwin.com)
**Xahau Network Explorer** — [explorer.xahau.network](https://explorer.xahau.network)
**XahScan** — [xahscan.com](https://xahscan.com)


### Xahau Testnet Explorers

To check accounts on the **testnet** (which is the one we use in this course), use these explorers:

- [test.xahauexplorer.com](https://test.xahauexplorer.com)
- [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
- [explorer.xahau-test.net](https://explorer.xahau-test.net)

### How to check your account

1. Open any of the testnet explorers
2. In the search bar, paste your **address** (starts with \`r\`)
3. Press Enter or click search
4. You will see your account information:
   - **Balance** in XAH
   - **Tokens** you hold (trust lines)
   - Recent **transactions**
   - **Flags** and account configuration
   - Associated ledger **objects**

### Check a transaction

Each transaction has a unique **hash** (a long hexadecimal string). You can search for that hash in the explorer to see:
- Transaction **type** (Payment, TrustSet, AccountSet, etc.)
- **Source** and **destination** account
- **Amount** sent
- **Result** (tesSUCCESS, tecPATH_DRY, etc.)
- **Fee** paid
- **Ledger** it was included in
- **Changes** to the ledger state (AffectedNodes)

### Why use explorers?

- **Visual verification**: Confirm that a transaction was processed successfully without writing code
- **Debugging**: When something fails, the explorer shows all error details
- **Transparency**: Anyone can verify any operation on the blockchain
- **Learning**: Viewing real transactions helps you understand how the network works internally`,
        jp: `テストネット（またはメインネット）でアカウントをアクティベートしたら、**ブロックエクスプローラー**を使ってその状態を確認できます。ブロックエクスプローラーとは、コードを書くことなく、任意のアカウント・トランザクション・レジャーを視覚的に照会できるWebアプリケーションです。

### ブロックエクスプローラーとは？

**ブロックエクスプローラー**は、Xahauのノードに接続し、ブロックチェーンの情報を読みやすい形式で表示するWebツールです。ブロックチェーンのための「検索エンジン」のようなものです。

エクスプローラーでできること：
- 任意のアカウントの**残高**と**トークン**を確認
- 完全な**トランザクション履歴**を照会
- 任意のトランザクションの**詳細**（ハッシュ、フィールド、結果）を確認
- アカウントに関連する**レジャーオブジェクト**（トラストライン、オファー、フック）を確認
- トランザクションが正常に処理されたかを検証

### Xahauメインネットのエクスプローラー

**Xahau Explorer** — [xahauexplorer.com](https://xahauexplorer.com)
**XRPLWin Xahau** — [xahau.xrplwin.com](https://xahau.xrplwin.com)
**Xahau Network Explorer** — [explorer.xahau.network](https://explorer.xahau.network)
**XahScan** — [xahscan.com](https://xahscan.com)


### Xahauテストネットのエクスプローラー

**テストネット**（このコースで使用するもの）のアカウントを確認するには、以下のエクスプローラーを使用してください。

- [test.xahauexplorer.com](https://test.xahauexplorer.com)
- [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
- [explorer.xahau-test.net](https://explorer.xahau-test.net)

### アカウントの確認方法

1. テストネットのエクスプローラーを開く
2. 検索バーに**アドレス**（\`r\`で始まる文字列）を貼り付ける
3. Enterキーを押すか検索ボタンをクリック
4. アカウント情報が表示されます。
   - XAHの**残高**
   - 保有している**トークン**（トラストライン）
   - 最近の**トランザクション**
   - **フラグ**とアカウント設定
   - 関連するレジャー**オブジェクト**

### トランザクションの確認

各トランザクションには一意の**ハッシュ**（長い16進数の文字列）があります。そのハッシュをエクスプローラーで検索すると、以下が確認できます。
- トランザクションの**タイプ**（Payment、TrustSet、AccountSetなど）
- **送信元**と**送信先**のアカウント
- 送信された**金額**
- **結果**（tesSUCCESS、tecPATH_DRYなど）
- 支払われた**手数料**
- 含まれた**レジャー**
- レジャー状態の**変更**（AffectedNodes）

### エクスプローラーを使う理由

- **視覚的な確認**：コードを書かずにトランザクションが正常に処理されたことを確認できる
- **デバッグ**：何か失敗した場合、エクスプローラーにエラーの詳細がすべて表示される
- **透明性**：誰でもブロックチェーン上のすべての操作を確認できる
- **学習**：実際のトランザクションを見ることで、ネットワークの内部動作を理解できる`,
      },
            codeBlocks: [],
      slides: [
        {
          title: { es: "¿Qué es un block explorer?", en: "What is a block explorer?", jp: "ブロックエクスプローラーとは？" },
          content: {
            es: "Una herramienta web para consultar la blockchain\nsin escribir código\n\n• Ver balances y tokens de cualquier cuenta\n• Consultar historial de transacciones\n• Inspeccionar detalles de cada operación\n• Verificar resultados y errores",
            en: "A web tool to query the blockchain\nwithout writing code\n\n• View balances and tokens of any account\n• Check transaction history\n• Inspect details of each operation\n• Verify results and errors",
            jp: "コードを書かずにブロックチェーンを照会できるWebツール\n\n• 任意のアカウントの残高とトークンを確認\n• トランザクション履歴を照会\n• 各操作の詳細を確認\n• 結果とエラーを検証",
          },
          visual: "🔍",
        },
        {
          title: { es: "Exploradores de Xahau", en: "Xahau Explorers", jp: "Xahauのエクスプローラー" },
          content: {
            es: "Mainnet:\n• xahauexplorer.com\n• xahau.xrplwin.com\n• explorer.xahau.network\n• xahscan.com\n\nTestnet (para el curso):\n• test.xahauexplorer.com\n• xahau-testnet.xrplwin.com\n• explorer.xahau-test.net",
            en: "Mainnet:\n• xahauexplorer.com\n• xahau.xrplwin.com\n• explorer.xahau.network\n• xahscan.com\n\nTestnet (for the course):\n• test.xahauexplorer.com\n• xahau-testnet.xrplwin.com\n• explorer.xahau-test.net",
            jp: "メインネット：\n• xahauexplorer.com\n• xahau.xrplwin.com\n• explorer.xahau.network\n• xahscan.com\n\nテストネット（コース用）：\n• test.xahauexplorer.com\n• xahau-testnet.xrplwin.com\n• explorer.xahau-test.net",
          },
          visual: "🌐",
        },
        {
          title: { es: "Cómo consultar tu cuenta", en: "How to check your account", jp: "アカウントの確認方法" },
          content: {
            es: "1️⃣ Abre un explorer de testnet\n2️⃣ Pega tu dirección (r...)\n3️⃣ Verás:\n   • Balance en XAH\n   • Tokens y trust lines\n   • Historial de transacciones\n   • Flags y configuración\n\nTambién puedes buscar por hash de transacción",
            en: "1️⃣ Open a testnet explorer\n2️⃣ Paste your address (r...)\n3️⃣ You will see:\n   • Balance in XAH\n   • Tokens and trust lines\n   • Transaction history\n   • Flags and configuration\n\nYou can also search by transaction hash",
            jp: "1️⃣ テストネットのエクスプローラーを開く\n2️⃣ アドレス（r...）を貼り付ける\n3️⃣ 表示される情報：\n   • XAHの残高\n   • トークンとトラストライン\n   • トランザクション履歴\n   • フラグと設定\n\nトランザクションハッシュで検索することもできます",
          },
          visual: "📋",
        },
      ],
    },
    {
      id: "m3l3",
      title: {
        es: "Seguridad de wallets y buenas prácticas",
        en: "Wallet security and best practices",
        jp: "ウォレットのセキュリティとベストプラクティス",
      },
      theory: {
        es: `La seguridad de tu wallet es lo más importante al trabajar con blockchain. Una wallet comprometida significa la **pérdida total e irreversible** de tus fondos. En esta lección aprenderás las mejores prácticas para proteger tu cuenta.

### Nunca compartas tu seed/clave secreta

Tu seed (clave privada) es la **única forma de controlar tu cuenta**. Quien tenga tu seed puede firmar cualquier transacción en tu nombre: enviar todos tus fondos, cambiar configuraciones, etc. No hay forma de revertir esto.

Reglas fundamentales:
- **Nunca** envíes tu seed por chat, email o ningún medio digital
- **Nunca** la introduzcas en sitios web o aplicaciones que no sean de absoluta confianza
- **Nunca** la guardes en texto plano en tu ordenador
- **Nunca** hagas captura de pantalla o foto de tu seed

### Hot Wallet vs Cold Wallet

**Hot Wallet (cartera caliente)**:
- Conectada a internet permanentemente
- Conveniente para transacciones frecuentes
- Mayor riesgo de ser comprometida
- Ejemplo: wallet en una aplicación web, bot de trading

**Cold Wallet (cartera fría)**:
- Desconectada de internet
- Máxima seguridad para almacenamiento a largo plazo
- Menos conveniente para uso diario
- Ejemplo: wallet generada offline, hardware wallet, paper wallet

### Buenas prácticas para almacenar seeds

1. **Offline**: Genera y guarda seeds en un dispositivo que nunca se conecte a internet
2. **Hardware wallet**: Dispositivos especializados (Ledger, Trezor) que almacenan claves de forma segura
3. **Paper wallet**: Escribe la seed en papel y guárdala en un lugar seguro (caja fuerte, caja de seguridad bancaria)
4. **Múltiples copias**: Guarda copias en diferentes ubicaciones físicas por si hay incendio, inundación, etc.
5. **Metal backup**: Graba tu seed en una placa de metal resistente al fuego y al agua

### Seeds de testnet: la excepción

Las seeds de **testnet** son seguras de compartir en contextos educativos porque:
- Los tokens de testnet **no tienen valor real**
- La testnet se puede resetear en cualquier momento
- Son útiles para depurar problemas con otros desarrolladores

Aun así, es buena práctica tratarlas con cuidado para crear buenos hábitos.

### Estafas comunes y cómo evitarlas

**Phishing**:
- Sitios web falsos que imitan interfaces legítimas
- Te piden ingresar tu seed para "verificar" tu cuenta
- Siempre verifica la URL y no hagas clic en enlaces sospechosos

**Fake dApps**:
- Aplicaciones que prometen rendimientos irreales
- Piden permisos excesivos o tu seed directamente
- Investiga siempre el código fuente y la reputación del proyecto

**Ingeniería social**:
- Personas que se hacen pasar por soporte técnico
- Ofrecen "ayuda" a cambio de tu seed
- Ningún soporte legítimo te pedirá jamás tu clave privada

**Airdrops falsos**:
- Tokens que aparecen en tu wallet sin pedirlos
- Al intentar interactuar con ellos, te redirigen a sitios maliciosos
- Ignora tokens desconocidos que no esperabas recibir

### Regular Keys: cambiar la clave de firma

Xahau ofrece una funcionalidad avanzada llamada **Regular Key**: puedes asignar un **par de claves alternativo** que tenga permiso para firmar transacciones en nombre de tu cuenta.

Ventajas:
- Si la regular key se compromete, puedes cambiarla por otra nueva sin cambiar tu dirección
- Puedes desactivar la clave maestra y usar solo la regular key para operaciones diarias
- La dirección de tu cuenta permanece igual

### Master Key Disable: seguridad avanzada

Para máxima seguridad, puedes **desactivar tu clave maestra** (master key disable):
1. Primero, configuras una regular key
2. Luego, desactivas la master key con un flag de cuenta
3. Ahora solo la regular key puede firmar transacciones
4. Si la regular key se compromete, puedes reactivar la master key para recuperar el control

Esto añade una capa extra de protección: incluso si alguien obtiene tu master seed, no podrá usarlo mientras esté desactivado.

### Multi-signing: múltiples firmas

Para cuentas de alto valor o gobernanza, Xahau soporta **multi-signing**:

- Se configura una lista de firmantes autorizados con un **quorum** (peso mínimo requerido)
- Cada firmante tiene un peso asignado
- Una transacción solo es válida si recibe suficientes firmas para alcanzar el quorum
- Ejemplo: 3 firmantes con peso 1 cada uno, quorum de 2 → se necesitan al menos 2 de 3 firmas

Multi-signing es ideal para:
- Tesorerías de organizaciones
- Cuentas compartidas entre socios
- Cualquier situación donde una sola persona no debería tener control total`,
        en: `Wallet security is the most important thing when working with blockchain. A compromised wallet means the **total and irreversible loss** of your funds. In this lesson you will learn the best practices to protect your account.

### Never share your seed/secret key

Your seed (private key) is the **only way to control your account**. Anyone who has your seed can sign any transaction on your behalf: send all your funds, change configurations, etc. There is no way to reverse this.

Fundamental rules:
- **Never** send your seed via chat, email, or any digital medium
- **Never** enter it on websites or applications that are not absolutely trustworthy
- **Never** store it in plain text on your computer
- **Never** take a screenshot or photo of your seed

### Hot Wallet vs Cold Wallet

**Hot Wallet**:
- Permanently connected to the internet
- Convenient for frequent transactions
- Higher risk of being compromised
- Example: wallet in a web application, trading bot

**Cold Wallet**:
- Disconnected from the internet
- Maximum security for long-term storage
- Less convenient for daily use
- Example: wallet generated offline, hardware wallet, paper wallet

### Best practices for storing seeds

1. **Offline**: Generate and store seeds on a device that never connects to the internet
2. **Hardware wallet**: Specialized devices (Ledger, Trezor) that store keys securely
3. **Paper wallet**: Write the seed on paper and store it in a safe place (safe, bank safety deposit box)
4. **Multiple copies**: Keep copies in different physical locations in case of fire, flood, etc.
5. **Metal backup**: Engrave your seed on a fire-resistant and water-resistant metal plate

### Testnet seeds: the exception

**Testnet** seeds are safe to share in educational contexts because:
- Testnet tokens **have no real value**
- The testnet can be reset at any time
- They are useful for debugging issues with other developers

Even so, it is good practice to treat them carefully to build good habits.

### Common scams and how to avoid them

**Phishing**:
- Fake websites that imitate legitimate interfaces
- They ask you to enter your seed to "verify" your account
- Always verify the URL and do not click on suspicious links

**Fake dApps**:
- Applications that promise unrealistic returns
- They request excessive permissions or your seed directly
- Always investigate the source code and the project's reputation

**Social engineering**:
- People pretending to be technical support
- They offer "help" in exchange for your seed
- No legitimate support will ever ask for your private key

**Fake airdrops**:
- Tokens that appear in your wallet without requesting them
- When trying to interact with them, they redirect you to malicious sites
- Ignore unknown tokens that you did not expect to receive

### Regular Keys: changing the signing key

Xahau offers an advanced feature called **Regular Key**: you can assign an **alternative key pair** that has permission to sign transactions on behalf of your account.

Advantages:
- If the regular key is compromised, you can change it to a new one without changing your address
- You can disable the master key and use only the regular key for daily operations
- Your account address remains the same

### Master Key Disable: advanced security

For maximum security, you can **disable your master key** (master key disable):
1. First, you set up a regular key
2. Then, you disable the master key with an account flag
3. Now only the regular key can sign transactions
4. If the regular key is compromised, you can reactivate the master key to regain control

This adds an extra layer of protection: even if someone obtains your master seed, they cannot use it while it is disabled.

### Multi-signing: multiple signatures

For high-value or governance accounts, Xahau supports **multi-signing**:

- A list of authorized signers is configured with a **quorum** (minimum required weight)
- Each signer has an assigned weight
- A transaction is only valid if it receives enough signatures to reach the quorum
- Example: 3 signers with weight 1 each, quorum of 2 → at least 2 of 3 signatures are needed

Multi-signing is ideal for:
- Organization treasuries
- Shared accounts between partners
- Any situation where a single person should not have total control`,
        jp: `ブロックチェーンで作業する際、ウォレットのセキュリティは最も重要なことです。ウォレットが侵害されると、資金の**完全かつ永久的な損失**を意味します。このレッスンでは、アカウントを保護するためのベストプラクティスを学びます。

### シード／秘密鍵を絶対に共有しないこと

あなたのシード（秘密鍵）は、**アカウントをコントロールする唯一の方法**です。あなたのシードを持っている人は、あなたの代わりにすべての資金を送ったり、設定を変更したりなどあらゆるトランザクションに署名できます。これを元に戻す方法はありません。

基本ルール：
- チャット、メール、その他のデジタル手段でシードを**絶対に**送らない
- 絶対に信頼できないWebサイトやアプリケーションには**絶対に**入力しない
- コンピュータにプレーンテキストで**絶対に**保存しない
- シードのスクリーンショットや写真を**絶対に**撮らない

### ホットウォレット vs コールドウォレット

**ホットウォレット（Hot Wallet）**：
- 常時インターネットに接続している
- 頻繁なトランザクションに便利
- 侵害されるリスクが高い
- 例：Webアプリケーション内のウォレット、トレーディングボット

**コールドウォレット（Cold Wallet）**：
- インターネットから切断されている
- 長期保管のための最高のセキュリティ
- 日常使用には不便
- 例：オフラインで生成されたウォレット、ハードウェアウォレット、ペーパーウォレット

### シードの保管に関するベストプラクティス

1. **オフライン**：インターネットに接続したことのないデバイスでシードを生成・保管する
2. **ハードウェアウォレット**：鍵を安全に保管する専用デバイス（Ledger、Trezorなど）
3. **ペーパーウォレット**：シードを紙に書き、安全な場所（金庫、銀行の貸金庫）に保管する
4. **複数のコピー**：火災、洪水などに備えて、異なる物理的な場所にコピーを保管する
5. **メタルバックアップ**：耐火・耐水性のある金属プレートにシードを刻む

### テストネットのシード：例外

**テストネット**のシードは教育的なコンテキストでは共有しても安全です。理由は次の通りです。
- テストネットのトークンは**実際の価値がない**
- テストネットはいつでもリセットできる
- 他の開発者との問題のデバッグに役立つ

それでも、良い習慣を身につけるために、注意して扱うことが推奨されます。

### よくある詐欺とその回避方法

**フィッシング**：
- 正規のインターフェースを模倣した偽のWebサイト
- アカウントを「確認する」ためにシードを入力するよう求める
- URLを必ず確認し、不審なリンクはクリックしない

**偽のdApps**：
- 非現実的なリターンを約束するアプリケーション
- 過剰な権限やシードを直接要求する
- 常にソースコードとプロジェクトの評判を調査する

**ソーシャルエンジニアリング**：
- テクニカルサポートを装った人物
- シードと引き換えに「助け」を申し出る
- 正規のサポートはあなたの秘密鍵を求めることは絶対にない

**偽のエアドロップ**：
- 要求していないのにウォレットに現れるトークン
- 操作しようとすると悪意のあるサイトにリダイレクトされる
- 受け取ることを期待していない未知のトークンは無視する

### レギュラーキー：署名鍵の変更

Xahauは**レギュラーキー（Regular Key）**と呼ばれる高度な機能を提供しています：アカウントの代わりにトランザクションに署名する権限を持つ**代替キーペア**を割り当てることができます。

利点：
- レギュラーキーが侵害されても、アドレスを変更せずに新しいキーに変更できる
- マスターキーを無効にして、日常業務にはレギュラーキーのみを使用できる
- アカウントのアドレスは変わらない

### マスターキーの無効化：高度なセキュリティ

最高のセキュリティのために、**マスターキーを無効化**（master key disable）することができます：
1. まず、レギュラーキーを設定する
2. 次に、アカウントフラグでマスターキーを無効にする
3. これにより、レギュラーキーのみがトランザクションに署名できる
4. レギュラーキーが侵害された場合、マスターキーを再アクティベートしてコントロールを取り戻せる

これは追加の保護レイヤーを加えます。誰かがマスターシードを入手しても、無効化されている間は使用できません。

### マルチシグ：複数の署名

高額アカウントやガバナンス用に、Xahauは**マルチシグ（multi-signing）**をサポートしています。

- 承認された署名者のリストと**閾値**（必要な最小ウェイト）を設定する
- 各署名者には重みが割り当てられる
- トランザクションは閾値に達するのに十分な署名を受け取った場合にのみ有効
- 例：各重み1の3人の署名者、閾値2 → 3人中少なくとも2人の署名が必要

マルチシグに適した用途：
- 組織の資金管理
- パートナー間の共有アカウント
- 一人の人物が完全な管理権を持つべきでない状況`,
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "La regla de oro", en: "The golden rule", jp: "黄金のルール" },
          content: {
            es: "NUNCA compartas tu seed/clave privada\n\n❌ No por chat ni email\n❌ No en sitios web dudosos\n❌ No en texto plano en tu PC\n❌ No en capturas de pantalla\n\nQuien tiene tu seed\ntiene TODOS tus fondos",
            en: "NEVER share your seed/private key\n\n❌ Not via chat or email\n❌ Not on suspicious websites\n❌ Not in plain text on your PC\n❌ Not in screenshots\n\nWhoever has your seed\nhas ALL your funds",
            jp: "シード／秘密鍵を絶対に共有しない\n\n❌ チャットやメールでの共有禁止\n❌ 怪しいWebサイトへの入力禁止\n❌ PCにプレーンテキストで保存禁止\n❌ スクリーンショット撮影禁止\n\nあなたのシードを持っている人が\nあなたの全財産を持っている",
          },
          visual: "🔒",
        },
        {
          title: { es: "Hot Wallet vs Cold Wallet", en: "Hot Wallet vs Cold Wallet", jp: "ホットウォレット vs コールドウォレット" },
          content: {
            es: "🔥 Hot Wallet (conectada)\n• Conveniente para uso diario\n• Mayor riesgo\n• Apps, bots de trading\n\n🧊 Cold Wallet (desconectada)\n• Máxima seguridad\n• Almacenamiento largo plazo\n• Hardware wallet, papel, metal",
            en: "🔥 Hot Wallet (connected)\n• Convenient for daily use\n• Higher risk\n• Apps, trading bots\n\n🧊 Cold Wallet (disconnected)\n• Maximum security\n• Long-term storage\n• Hardware wallet, paper, metal",
            jp: "🔥 ホットウォレット（接続済み）\n• 日常使用に便利\n• リスクが高い\n• アプリ、トレーディングボット\n\n🧊 コールドウォレット（切断済み）\n• 最高のセキュリティ\n• 長期保管\n• ハードウェアウォレット、紙、金属",
          },
          visual: "🔥",
        },
        {
          title: { es: "Estafas comunes", en: "Common scams", jp: "よくある詐欺" },
          content: {
            es: "🎣 Phishing → Sitios web falsos\n🤖 Fake dApps → Rendimientos irreales\n🎭 Ingeniería social → Falso soporte\n🪂 Airdrops falsos → Tokens trampa\n\nRegla: NADIE legítimo te pedirá\ntu clave privada. Jamás.",
            en: "🎣 Phishing → Fake websites\n🤖 Fake dApps → Unrealistic returns\n🎭 Social engineering → Fake support\n🪂 Fake airdrops → Trap tokens\n\nRule: NOBODY legitimate will ask\nfor your private key. Ever.",
            jp: "🎣 フィッシング → 偽のWebサイト\n🤖 偽のdApps → 非現実的なリターン\n🎭 ソーシャルエンジニアリング → 偽サポート\n🪂 偽のエアドロップ → トラップトークン\n\nルール：正規の関係者が\nあなたの秘密鍵を求めることは絶対にない",
          },
          visual: "⚠️",
        },
        {
          title: { es: "Seguridad avanzada en Xahau", en: "Advanced security in Xahau", jp: "Xahauの高度なセキュリティ" },
          content: {
            es: "🔑 Regular Key\n  Clave alternativa para firmar\n  (se puede cambiar sin cambiar dirección)\n\n🚫 Master Key Disable\n  Desactivar la clave maestra\n  (capa extra de protección)\n\n👥 Multi-signing\n  Múltiples firmas requeridas\n  (ideal para organizaciones)",
            en: "🔑 Regular Key\n  Alternative key for signing\n  (can be changed without changing address)\n\n🚫 Master Key Disable\n  Disable the master key\n  (extra layer of protection)\n\n👥 Multi-signing\n  Multiple signatures required\n  (ideal for organizations)",
            jp: "🔑 レギュラーキー\n  署名用の代替キー\n  （アドレスを変えずに変更可能）\n\n🚫 マスターキーの無効化\n  マスターキーを無効にする\n  （追加の保護レイヤー）\n\n👥 マルチシグニング\n  複数の署名が必要\n  （組織に最適）",
          },
          visual: "🛡️",
        },
      ],
    },
    {
      id: "m3l4",
      title: {
        es: "Configuración de tu cuenta con AccountSet",
        en: "Configuring your account with AccountSet",
        jp: "AccountSetを使ったアカウント設定",
      },
      theory: {
        es: `En Xahau, tu cuenta tiene múltiples opciones de configuración que puedes activar o desactivar usando la transacción **AccountSet**. Estas configuraciones controlan el comportamiento de tu cuenta frente a pagos entrantes, trust lines, y más.

### La transacción AccountSet

\`AccountSet\` es el tipo de transacción que te permite modificar las propiedades de tu cuenta. No envía ni recibe fondos, simplemente cambia los **flags** (banderas) y otros campos de configuración de tu cuenta.

### Flags importantes

**asfRequireDest (RequireDestTag)**
- Requiere que todos los pagos entrantes incluyan un **Destination Tag**
- Útil para exchanges y servicios que usan un tag para identificar al usuario
- Sin este flag, alguien podría enviarte XAH sin tag y sería imposible saber de quién viene
- Flag ID: \`1\`

**asfDisallowXRP (DisallowXAH)**
- Señala que tu cuenta **no desea recibir XAH directamente**
- Es solo una señal, técnicamente los pagos aún pueden llegar
- Útil para cuentas que solo trabajan con tokens emitidos (IOUs)
- Flag ID: \`3\`

**asfDefaultRipple**
- Relevante para **emisores de tokens** (lo veremos en profundidad en el módulo de tokens)
- Permite que los tokens emitidos por tu cuenta puedan fluir entre terceros (rippling)
- Sin este flag, los tokens solo pueden moverse directamente hacia/desde el emisor
- Flag ID: \`8\`

**asfRequireAuth**
- Requiere que tu cuenta **autorice** cada trust line antes de que alguien pueda mantener tus tokens
- Útil para tokens regulados donde necesitas controlar quién puede poseerlos
- Flag ID: \`2\`

### Otros campos configurables

**Domain**: Puedes asociar un dominio web a tu cuenta. Se almacena como el valor hexadecimal del dominio. Esto permite verificar que la cuenta pertenece al dueño de ese dominio.

**EmailHash**: Hash MD5 de tu email, utilizado para mostrar un avatar (como Gravatar). No expone tu email directamente.

### Flags como bits

Los flags de cuenta se almacenan como un campo numérico donde cada bit representa un flag. Puedes activar flags con el campo \`SetFlag\` y desactivarlos con \`ClearFlag\` en la transacción AccountSet.

| Flag | ID | Propósito |
|------|----|-----------|
| asfRequireDest | 1 | Requerir Destination Tag |
| asfRequireAuth | 2 | Requerir autorización de trust lines |
| asfDisallowXRP | 3 | Señalar que no se desea recibir XAH |
| asfDisableMaster | 4 | Desactivar clave maestra |
| asfDefaultRipple | 8 | Permitir rippling de tokens emitidos |`,
        en: `In Xahau, your account has multiple configuration options that you can enable or disable using the **AccountSet** transaction. These settings control your account's behavior regarding incoming payments, trust lines, and more.

### The AccountSet transaction

\`AccountSet\` is the transaction type that allows you to modify your account's properties. It does not send or receive funds; it simply changes the **flags** and other configuration fields of your account.

### Important flags

**asfRequireDest (RequireDestTag)**
- Requires that all incoming payments include a **Destination Tag**
- Useful for exchanges and services that use a tag to identify the user
- Without this flag, someone could send you XAH without a tag and it would be impossible to know who it came from
- Flag ID: \`1\`

**asfDisallowXRP (DisallowXAH)**
- Signals that your account **does not wish to receive XAH directly**
- It is only a signal; technically, payments can still arrive
- Useful for accounts that only work with issued tokens (IOUs)
- Flag ID: \`3\`

**asfDefaultRipple**
- Relevant for **token issuers** (we will cover this in depth in the tokens module)
- Allows tokens issued by your account to flow between third parties (rippling)
- Without this flag, tokens can only move directly to/from the issuer
- Flag ID: \`8\`

**asfRequireAuth**
- Requires your account to **authorize** each trust line before someone can hold your tokens
- Useful for regulated tokens where you need to control who can hold them
- Flag ID: \`2\`

### Other configurable fields

**Domain**: You can associate a web domain with your account. It is stored as the hexadecimal value of the domain. This allows verification that the account belongs to the owner of that domain.

**EmailHash**: MD5 hash of your email, used to display an avatar (like Gravatar). It does not expose your email directly.

### Flags as bits

Account flags are stored as a numeric field where each bit represents a flag. You can enable flags with the \`SetFlag\` field and disable them with \`ClearFlag\` in the AccountSet transaction.

| Flag | ID | Purpose |
|------|----|---------|
| asfRequireDest | 1 | Require Destination Tag |
| asfRequireAuth | 2 | Require trust line authorization |
| asfDisallowXRP | 3 | Signal that XAH is not desired |
| asfDisableMaster | 4 | Disable master key |
| asfDefaultRipple | 8 | Allow rippling of issued tokens |`,
        jp: `Xahauでは、**AccountSet**トランザクションを使用して、アカウントの複数の設定オプションを有効化または無効化できます。これらの設定は、着信ペイメント、トラストラインなどに対するアカウントの動作を制御します。

### AccountSetトランザクション

\`AccountSet\`はアカウントのプロパティを変更できるトランザクションタイプです。資金の送受信は行わず、アカウントの**フラグ**やその他の設定フィールドを変更するだけです。

### 重要なフラグ

**asfRequireDest（RequireDestTag）**
- すべての着信ペイメントに**宛先タグ**を含めることを要求する
- タグを使用してユーザーを識別する取引所やサービスに役立つ
- このフラグがないと、タグなしでXAHを送ることができ、誰から来たかを知ることができなくなる
- フラグID：\`1\`

**asfDisallowXRP（DisallowXAH）**
- アカウントが**XAHを直接受け取ることを希望しない**ことを示す
- これは情報提供に過ぎず、技術的にはペイメントはまだ到達できる
- 発行されたトークン（IOU）のみを扱うアカウントに役立つ
- フラグID：\`3\`

**asfDefaultRipple**
- **トークン発行者**に関連（トークンモジュールで詳しく学びます）
- アカウントが発行したトークンが第三者間で流れることを可能にする（リップリング）
- このフラグがないと、トークンは発行者との間でのみ直接移動できる
- フラグID：\`8\`

**asfRequireAuth**
- 誰かがあなたのトークンを保有できる前に、アカウントが各トラストラインを**承認**することを要求する
- 保有者をコントロールする必要がある規制されたトークンに役立つ
- フラグID：\`2\`

### その他の設定可能なフィールド

**ドメイン**：アカウントにWebドメインを関連付けることができます。ドメインの16進数値として保存されます。これにより、アカウントがそのドメインの所有者に属することを確認できます。

**EmailHash**：メールのMD5ハッシュで、（Gravatarのような）アバターの表示に使用されます。メールアドレスを直接公開しません。

### ビットフラグ

アカウントフラグは、各ビットがフラグを表す数値フィールドとして保存されます。AccountSetトランザクションの\`SetFlag\`フィールドでフラグを有効化し、\`ClearFlag\`で無効化できます。

| フラグ | ID | 目的 |
|--------|-----|------|
| asfRequireDest | 1 | 宛先タグを要求 |
| asfRequireAuth | 2 | トラストラインの承認を要求 |
| asfDisallowXRP | 3 | XAHの受け取りを希望しないことを示す |
| asfDisableMaster | 4 | マスターキーを無効化 |
| asfDefaultRipple | 8 | 発行されたトークンのリップリングを許可 |`,
      },
      codeBlocks: [
        {
          title: {
            es: "Activar el flag RequireDestTag en tu cuenta",
            en: "Enable the RequireDestTag flag on your account",
            jp: "アカウントにRequireDestTagフラグを設定する",
          },
          language: "javascript",
          code: {
            es: `const { Client, Wallet } = require("xahau");

async function setRequireDestTag() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Usa tu wallet de testnet (reemplaza con tu seed)
  const wallet = Wallet.fromSeed("sEdVHBhkL2next8NH9cMPyPJoXXXXXX", {algorithm: 'secp256k1'});

  // AccountSet con SetFlag para activar RequireDestTag
  const tx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // asfRequireDest = 1
    SetFlag: 1,
  };
  console.log("Cuenta: ",wallet.address);
  console.log("Enviando transacción AccountSet...");
  console.log("  Activando flag: RequireDestTag (asfRequireDest = 1)");

  const result = await client.submitAndWait(tx, { wallet });

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Flag RequireDestTag activado con éxito!");
    console.log("Ahora todos los pagos entrantes deben incluir un DestinationTag.");

    // Verificar que el flag fue activado
    const accountInfo = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const flags = accountInfo.result.account_data.Flags;
    console.log("Flags de la cuenta (número):", flags);

    // lsfRequireDestTag = 0x00020000 = 131072
    const requireDestTag = (flags & 0x00020000) !== 0;
    console.log("RequireDestTag activo:", requireDestTag);
  }

  await client.disconnect();
}

setRequireDestTag();`,
            en: `const { Client, Wallet } = require("xahau");

async function setRequireDestTag() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Use your testnet wallet (replace with your seed)
  const wallet = Wallet.fromSeed("sEdVHBhkL2next8NH9cMPyPJoXXXXXX", {algorithm: 'secp256k1'});

  // AccountSet with SetFlag to enable RequireDestTag
  const tx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // asfRequireDest = 1
    SetFlag: 1,
  };
  console.log("Account: ",wallet.address);
  console.log("Sending AccountSet transaction...");
  console.log("  Enabling flag: RequireDestTag (asfRequireDest = 1)");

  const result = await client.submitAndWait(tx, { wallet });

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("RequireDestTag flag enabled successfully!");
    console.log("Now all incoming payments must include a DestinationTag.");

    // Verify that the flag was enabled
    const accountInfo = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const flags = accountInfo.result.account_data.Flags;
    console.log("Account flags (number):", flags);

    // lsfRequireDestTag = 0x00020000 = 131072
    const requireDestTag = (flags & 0x00020000) !== 0;
    console.log("RequireDestTag active:", requireDestTag);
  }

  await client.disconnect();
}

setRequireDestTag();`,
            jp: `const { Client, Wallet } = require("xahau");

async function setRequireDestTag() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // テストネットのウォレットを使用（シードを置き換えてください）
  const wallet = Wallet.fromSeed("sEdVHBhkL2next8NH9cMPyPJoXXXXXX", {algorithm: 'secp256k1'});

  // RequireDestTagを有効にするためのSetFlagを持つAccountSet
  const tx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // asfRequireDest = 1
    SetFlag: 1,
  };
  console.log("アカウント：", wallet.address);
  console.log("AccountSetトランザクションを送信中...");
  console.log("  フラグを有効化：RequireDestTag (asfRequireDest = 1)");

  const result = await client.submitAndWait(tx, { wallet });

  console.log("結果：", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("RequireDestTagフラグが正常に有効化されました！");
    console.log("すべての着信ペイメントにDestinationTagが必要になりました。");

    // フラグが有効化されたことを確認
    const accountInfo = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const flags = accountInfo.result.account_data.Flags;
    console.log("アカウントのフラグ（数値）：", flags);

    // lsfRequireDestTag = 0x00020000 = 131072
    const requireDestTag = (flags & 0x00020000) !== 0;
    console.log("RequireDestTag有効：", requireDestTag);
  }

  await client.disconnect();
}

setRequireDestTag();`,
          },
        },
        {
          title: {
            es: "Leer e interpretar los flags de una cuenta",
            en: "Read and interpret account flags",
            jp: "アカウントのフラグを読み取り・解釈する",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function readAccountFlags(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    const flags = account.Flags;

    console.log("=== Información de la cuenta ===");
    console.log("Dirección:", account.Account);
    console.log("Balance:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("Flags (valor numérico):", flags);
    console.log("");

    // Interpretar cada flag individual
    // Los flags del ledger (lsf) tienen valores distintos a los de AccountSet (asf)
    const flagDefinitions = [
      { name: "lsfRequireDestTag", mask: 0x00020000, desc: "Requiere Destination Tag" },
      { name: "lsfRequireAuth", mask: 0x00040000, desc: "Requiere autorización de trust line" },
      { name: "lsfDisallowXRP", mask: 0x00080000, desc: "No desea recibir XAH" },
      { name: "lsfDisableMaster", mask: 0x00100000, desc: "Clave maestra desactivada" },
      { name: "lsfDefaultRipple", mask: 0x00800000, desc: "Rippling por defecto activado" },
    ];

    console.log("=== Flags activos ===");
    let anyActive = false;
    for (const flag of flagDefinitions) {
      const active = (flags & flag.mask) !== 0;
      if (active) {
        console.log(\` \${flag.name}: \${flag.desc}\`);
        anyActive = true;
      }
    }

    if (!anyActive) {
      console.log("  Sin flags especiales activos (configuración por defecto)");
    }

    console.log("");
    console.log("=== Otros campos ===");
    console.log("Dominio:", account.Domain
      ? Buffer.from(account.Domain, "hex").toString("utf-8")
      : "(no configurado)");
    console.log("EmailHash:", account.EmailHash || "(no configurado)");
    console.log("RegularKey:", account.RegularKey || "(no configurado)");
    console.log("Secuencia:", account.Sequence);
    console.log("Objetos propios:", account.OwnerCount);

  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("La cuenta no existe en el ledger.");
    } else {
      console.error("Error:", error.message);
    }
  }

  await client.disconnect();
}

// Reemplaza con una dirección de testnet
readAccountFlags("rYourXahauAddressHere");`,
            en: `const { Client } = require("xahau");

async function readAccountFlags(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    const flags = account.Flags;

    console.log("=== Account information ===");
    console.log("Address:", account.Account);
    console.log("Balance:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("Flags (numeric value):", flags);
    console.log("");

    // Interpret each individual flag
    // Ledger flags (lsf) have different values than AccountSet flags (asf)
    const flagDefinitions = [
      { name: "lsfRequireDestTag", mask: 0x00020000, desc: "Requires Destination Tag" },
      { name: "lsfRequireAuth", mask: 0x00040000, desc: "Requires trust line authorization" },
      { name: "lsfDisallowXRP", mask: 0x00080000, desc: "Does not wish to receive XAH" },
      { name: "lsfDisableMaster", mask: 0x00100000, desc: "Master key disabled" },
      { name: "lsfDefaultRipple", mask: 0x00800000, desc: "Default rippling enabled" },
    ];

    console.log("=== Active flags ===");
    let anyActive = false;
    for (const flag of flagDefinitions) {
      const active = (flags & flag.mask) !== 0;
      if (active) {
        console.log(\` \${flag.name}: \${flag.desc}\`);
        anyActive = true;
      }
    }

    if (!anyActive) {
      console.log("  No special flags active (default configuration)");
    }

    console.log("");
    console.log("=== Other fields ===");
    console.log("Domain:", account.Domain
      ? Buffer.from(account.Domain, "hex").toString("utf-8")
      : "(not configured)");
    console.log("EmailHash:", account.EmailHash || "(not configured)");
    console.log("RegularKey:", account.RegularKey || "(not configured)");
    console.log("Sequence:", account.Sequence);
    console.log("OwnerCount:", account.OwnerCount);

  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("The account does not exist on the ledger.");
    } else {
      console.error("Error:", error.message);
    }
  }

  await client.disconnect();
}

// Replace with a testnet address
readAccountFlags("rYourXahauAddressHere");`,
            jp: `const { Client } = require("xahau");

async function readAccountFlags(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    const flags = account.Flags;

    console.log("=== アカウント情報 ===");
    console.log("アドレス：", account.Account);
    console.log("残高：", Number(account.Balance) / 1_000_000, "XAH");
    console.log("フラグ（数値）：", flags);
    console.log("");

    // 各フラグを個別に解釈する
    // レジャーフラグ（lsf）はAccountSetフラグ（asf）とは異なる値を持つ
    const flagDefinitions = [
      { name: "lsfRequireDestTag", mask: 0x00020000, desc: "デスティネーションタグを要求" },
      { name: "lsfRequireAuth", mask: 0x00040000, desc: "トラストラインの承認を要求" },
      { name: "lsfDisallowXRP", mask: 0x00080000, desc: "XAHを受け取ることを希望しない" },
      { name: "lsfDisableMaster", mask: 0x00100000, desc: "マスターキーが無効" },
      { name: "lsfDefaultRipple", mask: 0x00800000, desc: "デフォルトリップリングが有効" },
    ];

    console.log("=== 有効なフラグ ===");
    let anyActive = false;
    for (const flag of flagDefinitions) {
      const active = (flags & flag.mask) !== 0;
      if (active) {
        console.log(\` \${flag.name}: \${flag.desc}\`);
        anyActive = true;
      }
    }

    if (!anyActive) {
      console.log("  特別なフラグなし（デフォルト設定）");
    }

    console.log("");
    console.log("=== その他のフィールド ===");
    console.log("ドメイン：", account.Domain
      ? Buffer.from(account.Domain, "hex").toString("utf-8")
      : "（未設定）");
    console.log("EmailHash：", account.EmailHash || "（未設定）");
    console.log("RegularKey：", account.RegularKey || "（未設定）");
    console.log("シーケンス：", account.Sequence);
    console.log("OwnerCount：", account.OwnerCount);

  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("アカウントはレジャーに存在しません。");
    } else {
      console.error("エラー：", error.message);
    }
  }

  await client.disconnect();
}

// テストネットのアドレスに置き換えてください
readAccountFlags("rYourXahauAddressHere");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "AccountSet: configura tu cuenta", en: "AccountSet: configure your account", jp: "AccountSet：アカウントを設定する" },
          content: {
            es: "La transacción AccountSet modifica\nlos flags y propiedades de tu cuenta\n\nFlags principales:\n🏷️ RequireDestTag → Exigir tag en pagos\n🚫 DisallowXAH → Señal de no recibir XAH\n🔄 DefaultRipple → Para emisores de tokens\n🔐 RequireAuth → Autorizar trust lines",
            en: "The AccountSet transaction modifies\nyour account's flags and properties\n\nMain flags:\n🏷️ RequireDestTag → Require tag on payments\n🚫 DisallowXAH → Signal not to receive XAH\n🔄 DefaultRipple → For token issuers\n🔐 RequireAuth → Authorize trust lines",
            jp: "AccountSetトランザクションは\nアカウントのフラグとプロパティを変更する\n\n主なフラグ：\n🏷️ RequireDestTag → ペイメントにタグを要求\n🚫 DisallowXAH → XAHを受け取らない信号\n🔄 DefaultRipple → トークン発行者向け\n🔐 RequireAuth → トラストラインを承認する",
          },
          visual: "⚙️",
        },
        {
          title: { es: "Flags como bits", en: "Flags as bits", jp: "ビットとしてのフラグ" },
          content: {
            es: "Los flags se almacenan como un número binario\nCada bit = un flag diferente\n\nActivar: campo SetFlag + ID del flag\nDesactivar: campo ClearFlag + ID del flag\n\n| Flag | ID |\n| RequireDest | 1 |\n| RequireAuth | 2 |\n| DisallowXRP | 3 |\n| DisableMaster | 4 |\n| DefaultRipple | 8 |",
            en: "Flags are stored as a binary number\nEach bit = a different flag\n\nEnable: SetFlag field + flag ID\nDisable: ClearFlag field + flag ID\n\n| Flag | ID |\n| RequireDest | 1 |\n| RequireAuth | 2 |\n| DisallowXRP | 3 |\n| DisableMaster | 4 |\n| DefaultRipple | 8 |",
            jp: "フラグはバイナリ数値として保存される\n各ビット = 異なるフラグ\n\n有効化：SetFlagフィールド + フラグID\n無効化：ClearFlagフィールド + フラグID\n\n| フラグ | ID |\n| RequireDest | 1 |\n| RequireAuth | 2 |\n| DisallowXRP | 3 |\n| DisableMaster | 4 |\n| DefaultRipple | 8 |",
          },
          visual: "🔢",
        },
      ],
    },
    {
      id: "m3l5",
      title: {
        es: "Cómo importar tu cuenta en Xaman",
        en: "How to import your account into Xaman",
        jp: "Xamanへのアカウントのインポート方法",
      },
      theory: {
        es: `**Xaman** (anteriormente XUMM) es la wallet móvil más utilizada del ecosistema XRPL y Xahau. Hasta ahora hemos trabajado con wallets desde código JavaScript, pero para gestionar tu cuenta de forma visual, firmar transacciones desde el móvil e interactuar con aplicaciones descentralizadas, necesitas importar tu cuenta en Xaman.

### ¿Qué es Xaman?

Xaman es una aplicación móvil disponible para **iOS** y **Android** que funciona como:
- **Wallet**: Almacena tus claves de forma segura en tu dispositivo
- **Firmador de transacciones**: Puedes aprobar transacciones escaneando un QR o desde una xApp
- **Gestor de cuentas**: Puedes gestionar múltiples cuentas de Xahau y XRPL
- **Puerta de entrada a xApps**: Aplicaciones descentralizadas integradas en Xaman

Descarga: [xaman.app](https://xaman.app)

### Instalar Xaman

1. Abre la **App Store** (iOS) o **Google Play** (Android)
2. Busca **"Xaman"** (antes se llamaba XUMM)
3. Descarga e instala la aplicación
4. Abre Xaman y sigue la configuración inicial:
   - Configura un **código PIN** o **biometría** (huella/Face ID)
   - Acepta los términos de uso

### Importar tu cuenta de testnet

Una vez instalado Xaman, puedes importar la cuenta que generaste por código usando tu **family seed** (la cadena que empieza por \`s\`):

1. Abre Xaman
2. Toca el botón **"Añadir cuenta"** (o el icono \`+\` arriba)
3. Selecciona **"Importar una cuenta existente"**
4. Selecciona **"Family Seed (s...)"** como método de importación
5. Introduce tu seed (la cadena que empieza por \`s\` que obtuviste al generar la wallet)
6. Selecciona el nivel de acceso:
   - **Acceso completo**: Puedes firmar transacciones (necesitas el seed)
   - **Solo lectura**: Solo puedes ver el balance y transacciones (solo necesitas la dirección)
7. Confirma con tu PIN o biometría
8. Tu cuenta aparecerá en la lista de cuentas de Xaman

### Añadir la red Xahau en Xaman

Por defecto, Xaman se conecta a **XRPL Mainnet**. Para trabajar con **Xahau**, debes añadir la red:

1. En Xaman, ve a **Ajustes** (icono de engranaje)
2. Busca la sección **"Advanced"** o **"Avanzado"**
3. Busca la sección **"Debug"**
4. Activa **Developer Mode** o **Modo Desarrollador**
5. Selecciona **Xahau Testnet** como red activa en el menú principal pulsando en la esquina superior derecha.
6. Ahora tu cuenta mostrará el balance de XAH en testnet

### Verificar la importación

Después de importar, verifica que todo es correcto:
- La **dirección** que muestra Xaman debe coincidir con la que generaste por código
- Puedes enviar una pequeña transacción de prueba para confirmar que la firma funciona

### Firmar transacciones con Xaman

Xaman puede firmar transacciones de dos formas:

**Desde la propia app**:
- Puedes enviar pagos directamente desde Xaman
- Toca **"Enviar"**, introduce la dirección destino y la cantidad
- Confirma con tu PIN o biometría

**Desde una xApp o sitio web (QR)**:
- Algunas aplicaciones muestran un código QR
- Escaneas el QR con Xaman
- Xaman te muestra los detalles de la transacción
- Apruebas o rechazas firmando con tu PIN

### Seguridad en Xaman

- Tu seed **nunca sale de tu dispositivo**. Xaman almacena las claves de forma encriptada en el almacenamiento seguro del sistema operativo (Keychain en iOS, Keystore en Android)
- Las transacciones se **firman localmente** en tu dispositivo
- Xaman **nunca envía** tu clave privada a ningún servidor
- Si pierdes tu dispositivo, puedes restaurar tu cuenta en otro dispositivo usando tu seed
- **Guarda siempre una copia de tu seed fuera del dispositivo** (papel, metal backup)
- Xaman no permite exportar tu seed desde la app por seguridad, así que asegúrate de tenerlo guardado antes de importar


### Importar con solo lectura

Si solo quieres **monitorizar** una cuenta sin poder firmar transacciones:

1. En Xaman, toca **"Añadir cuenta"**
2. Selecciona **"Importar una cuenta existente"**
3. Selecciona **"Dirección de la cuenta (r...)"**
4. Introduce la dirección \`r...\` (no el seed)
5. La cuenta se añade en modo solo lectura

Esto es útil para:
- Monitorizar cuentas de otros (exchanges, contratos)
- Vigilar tu cuenta de mainnet sin exponer el seed en el móvil
- Comprobar balances rápidamente`,
        en: `**Xaman** (formerly XUMM) is the most widely used mobile wallet in the XRPL and Xahau ecosystem. So far we have been working with wallets from JavaScript code, but to manage your account visually, sign transactions from your phone, and interact with decentralized applications, you need to import your account into Xaman.

### What is Xaman?

Xaman is a mobile application available for **iOS** and **Android** that works as:
- **Wallet**: Stores your keys securely on your device
- **Transaction signer**: You can approve transactions by scanning a QR or from an xApp
- **Account manager**: You can manage multiple Xahau and XRPL accounts
- **Gateway to xApps**: Decentralized applications integrated into Xaman

Download: [xaman.app](https://xaman.app)

### Install Xaman

1. Open the **App Store** (iOS) or **Google Play** (Android)
2. Search for **"Xaman"** (it was previously called XUMM)
3. Download and install the application
4. Open Xaman and follow the initial setup:
   - Set up a **PIN code** or **biometrics** (fingerprint/Face ID)
   - Accept the terms of use

### Import your testnet account

Once Xaman is installed, you can import the account you generated via code using your **family seed** (the string starting with \`s\`):

1. Open Xaman
2. Tap the **"Add account"** button (or the \`+\` icon at the top)
3. Select **"Import an existing account"**
4. Select **"Family Seed (s...)"** as the import method
5. Enter your seed (the string starting with \`s\` that you obtained when generating the wallet)
6. Select the access level:
   - **Full access**: You can sign transactions (requires the seed)
   - **Read-only**: You can only view balance and transactions (only requires the address)
7. Confirm with your PIN or biometrics
8. Your account will appear in the Xaman account list

### Add the Xahau Testnet in Xaman

By default, Xaman connects to **XRPL Mainnet**. To work with **Xahau Testnet**, you need to add the network:

1. In Xaman, go to **Settings** (gear icon)
2. Find the **"Advanced"** section
3. Find the **"Debug"** section
4. Enable **Developer Mode**
5. Select **Xahau Testnet** as the active network in the main menu by tapping in the upper right corner.
6. Now your account will show the XAH balance on testnet

### Verify the import

After importing, verify that everything is correct:
- The **address** shown in Xaman should match the one you generated via code
- You can send a small test transaction to confirm that signing works

### Sign transactions with Xaman

Xaman can sign transactions in two ways:

**From the app itself**:
- You can send payments directly from Xaman
- Tap **"Send"**, enter the destination address and amount
- Confirm with your PIN or biometrics

**From an xApp or website (QR)**:
- Some applications display a QR code
- You scan the QR with Xaman
- Xaman shows you the transaction details
- You approve or reject by signing with your PIN

### Security in Xaman

- Your seed **never leaves your device**. Xaman stores keys in encrypted form in the operating system's secure storage (Keychain on iOS, Keystore on Android)
- Transactions are **signed locally** on your device
- Xaman **never sends** your private key to any server
- If you lose your device, you can restore your account on another device using your seed
- **Always keep a copy of your seed outside the device** (paper, metal backup)
- Xaman does not allow exporting your seed from the app for security, so make sure you have it saved before importing


### Import as read-only

If you only want to **monitor** an account without being able to sign transactions:

1. In Xaman, tap **"Add account"**
2. Select **"Import an existing account"**
3. Select **"Account address (r...)"**
4. Enter the address \`r...\` (not the seed)
5. The account is added in read-only mode

This is useful for:
- Monitoring other accounts (exchanges, contracts)
- Watching your mainnet account without exposing the seed on your phone
- Checking balances quickly`,
        jp: `**Xaman**（以前はXumm）は、XRPLおよびXahauエコシステムで最も広く使用されているモバイルウォレットです。これまでJavaScriptコードからウォレットを操作してきましたが、アカウントを視覚的に管理し、スマートフォンからトランザクションに署名し、分散型アプリケーションと対話するには、アカウントをXamanにインポートする必要があります。

### Xamanとは？

Xamanは**iOS**と**Android**で利用できるモバイルアプリケーションで、次のような機能を提供します：
- **ウォレット**：デバイス上に鍵を安全に保存
- **トランザクションへの署名**：QRコードのスキャンまたはxAppからトランザクションを承認できる
- **アカウント**：複数のXahauおよびXRPLアカウントを管理できる
- **xAppsへのゲートウェイ**：Xamanに統合された分散型アプリケーション

ダウンロード：[xaman.app](https://xaman.app)

### Xamanのインストール

1. **App Store**（iOS）または**Google Play**（Android）を開く
2. **「Xaman」**を検索
3. アプリをダウンロードしてインストール
4. Xamanを開き、初期設定に従う：
   - **PINコード**または**生体認証**（指紋/Face ID）を設定する
   - 利用規約に同意する

### テストネットアカウントのインポート

Xamanをインストールしたら、コードで生成したアカウントを**ファミリーシード**（\`s\`で始まる文字列）を使用してインポートできます：

1. Xamanを開く
2. **「アカウントを追加」**ボタン（または上部の\`+\`アイコン）をタップ
3. **「既存のアカウントをインポート」**を選択
4. インポート方法として**「Family Seed（s...）」**を選択
5. シード（ウォレット生成時に取得した\`s\`で始まる文字列）を入力
6. アクセスレベルを選択：
   - **フルアクセス**：トランザクションに署名できる（シードが必要）
   - **読み取り専用**：残高とトランザクションのみ確認できる（アドレスのみ必要）
7. PINまたは生体認証で確認
8. アカウントがXamanのアカウントリストに表示される

### XamanにXahauテストネットを追加する

デフォルトでは、Xamanは**XRPLメインネット**に接続しています。**Xahauテストネット**で作業するには、ネットワークを追加する必要があります：

1. Xamanで**設定**（歯車アイコン）に移動
2. **「Advanced」（詳細）**セクションを見つける
3. **「Debug」**セクションを見つける
4. **開発者モード（Developer Mode）**を有効にする
5. メインメニューで右上隅をタップして**Xahau Testnet**をアクティブネットワークとして選択する
6. これでアカウントにテストネットのXAH残高が表示される

### インポートの確認

インポート後、すべてが正しいことを確認する：
- Xamanが表示する**アドレス**がコードで生成したものと一致するか確認する
- 署名が機能することを確認するために、小さなテストトランザクションを送信できる

### Xamanでトランザクションに署名する

Xamanは次の2つの方法でトランザクションに署名できます。

**アプリから直接**：
- Xamanから直接ペイメントを送れる
- **「送信」**をタップし、送信先アドレスと金額を入力
- PINまたは生体認証で確認

**xAppまたはWebサイト（QR）から**：
- 一部のアプリケーションがQRコードを表示する
- XamanでQRをスキャンする
- Xamanがトランザクションの詳細を表示する
- PINで署名して承認または拒否する

### Xamanのセキュリティ

- シードは**デバイスから絶対に出ない**。Xamanはオペレーティングシステムのセキュアストレージ（iOSではKeychain、AndroidではKeystore）に暗号化された形式で鍵を保存する
- トランザクションはデバイス上で**ローカルに署名される**
- Xamanは秘密鍵をサーバーに**送信することはない**
- デバイスを紛失した場合、シードを使用して別のデバイスでアカウントを復元できる
- **シードのコピーを常にデバイス外に保管する**（紙、金属バックアップ）
- Xamanはセキュリティのためにアプリからシードをエクスポートできないため、インポート前に保存してあることを確認すること


### 読み取り専用でのインポート

トランザクションに署名せずにアカウントを**監視**だけしたい場合は次のようにします。

1. Xamanで**「アカウントを追加」**をタップ
2. **「既存のアカウントをインポート」**を選択
3. **「アカウントアドレス（r...）」**を選択
4. アドレス\`r...\`を入力（シードではない）
5. アカウントが読み取り専用モードで追加される

これは次のような場合に役立ちます。
- 他のアカウント（取引所、コントラクト）の監視
- スマートフォンでシードを公開せずにメインネットアカウントを監視する
- 残高をすばやく確認する`,
      },
      codeBlocks: [
        {
          title: {
            es: "Generar una wallet y preparar datos para importar en Xaman",
            en: "Generate a wallet and prepare data for importing into Xaman",
            jp: "ウォレットを生成してXamanにインポートするためのデータを準備する",
          },
          language: "javascript",
          code: {
            es: `const { Client, Wallet } = require("xahau");

async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Generar y financiar una wallet
  const wallet = Wallet.generate();
  console.log("Generando wallet de testnet...");
  await client.fundWallet(wallet);

  // Verificar balance
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== Datos para importar en Xaman ===");
  console.log("Dirección:", wallet.address);
  console.log("Seed:", wallet.seed);
  console.log("Balance:", balance, "XAH");
  console.log("=== Instrucciones ===");
  console.log("1. Abre Xaman en tu móvil");
  console.log("2. Toca 'Añadir cuenta' → 'Importar cuenta existente'");
  console.log("4. Selecciona Acceso Completo");
  console.log("5. Selecciona 'Family Seed (s...)'");
  console.log("6. Introduce el seed:", wallet.seed);
  console.log("  Recuerda: estamos en TESTNET.");
  console.log("    Asegúrate de seleccionar la red Xahau Testnet en Xaman.");

  await client.disconnect();
}

prepareForXaman();`,
            en: `const { Client, Wallet } = require("xahau");

async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Generate and fund a wallet
  const wallet = Wallet.generate();
  console.log("Generating testnet wallet...");
  await client.fundWallet(wallet);

  // Check balance
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== Data for importing into Xaman ===");
  console.log("Address:", wallet.address);
  console.log("Seed:", wallet.seed);
  console.log("Balance:", balance, "XAH");
  console.log("=== Instructions ===");
  console.log("1. Open Xaman on your phone");
  console.log("2. Tap 'Add account' → 'Import existing account'");
  console.log("4. Select Full Access");
  console.log("5. Select 'Family Seed (s...)'");
  console.log("6. Enter the seed:", wallet.seed);
  console.log("  Remember: we are on TESTNET.");
  console.log("    Make sure to select the Xahau Testnet network in Xaman.");

  await client.disconnect();
}

prepareForXaman();`,
            jp: `const { Client, Wallet } = require("xahau");

async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // ウォレットを生成して資金を供給する
  const wallet = Wallet.generate();
  console.log("テストネットウォレットを生成中...");
  await client.fundWallet(wallet);

  // 残高を確認する
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== Xamanにインポートするためのデータ ===");
  console.log("アドレス：", wallet.address);
  console.log("シード：", wallet.seed);
  console.log("残高：", balance, "XAH");
  console.log("=== 手順 ===");
  console.log("1. スマートフォンでXamanを開く");
  console.log("2. 「アカウントを追加」→「既存のアカウントをインポート」をタップ");
  console.log("4. 「フルアクセス」を選択");
  console.log("5. 「Family Seed（s...）」を選択");
  console.log("6. シードを入力：", wallet.seed);
  console.log("  注意：テストネットを使用しています。");
  console.log("    Xamanで必ずXahau Testnetネットワークを選択してください。");

  await client.disconnect();
}

prepareForXaman();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es Xaman?", en: "What is Xaman?", jp: "Xamanとは？" },
          content: {
            es: "Wallet móvil del ecosistema XRPL/Xahau\n\n• iOS y Android\n• Almacena claves de forma segura\n• Firma transacciones desde el móvil\n• Gestiona múltiples cuentas\n• Acceso a xApps\n\nDescarga: xaman.app",
            en: "Mobile wallet for the XRPL/Xahau ecosystem\n\n• iOS and Android\n• Stores keys securely\n• Sign transactions from your phone\n• Manage multiple accounts\n• Access to xApps\n\nDownload: xaman.app",
            jp: "XRPL/Xahauエコシステムのモバイルウォレット\n\n• iOSとAndroid\n• 鍵を安全に保存\n• スマートフォンからトランザクションに署名\n• 複数のアカウントを管理\n• xAppsへのアクセス\n\nダウンロード：xaman.app",
          },
          visual: "📱",
        },
        {
          title: { es: "Importar tu cuenta", en: "Import your account", jp: "アカウントのインポート" },
          content: {
            es: "1️⃣ Abre Xaman → 'Añadir cuenta'\n2️⃣ 'Importar cuenta existente'\n3️⃣ Elige 'Acceso completo'\n4️⃣ Selecciona 'Family Seed (s...)\n5️⃣ Introduce tu seed\n6️⃣ Confirma con PIN/biometría\n\n⚠️ Selecciona red Xahau Testnet\nen Ajustes → Redes",
            en: "1️⃣ Open Xaman → 'Add account'\n2️⃣ 'Import existing account'\n3️⃣ Choose 'Full access'\n4️⃣ Select 'Family Seed (s...)'\n5️⃣ Enter your seed\n6️⃣ Confirm with PIN/biometrics\n\n⚠️ Select Xahau Testnet network\nin Settings → Networks",
            jp: "1️⃣ Xamanを開く → 「アカウントを追加」\n2️⃣ 「既存のアカウントをインポート」\n3️⃣ 「フルアクセス」を選択\n4️⃣ 「Family Seed（s...）」を選択\n5️⃣ シードを入力\n6️⃣ PINまたは生体認証で確認\n\n⚠️ 設定 → ネットワークで\nXahau Testnetネットワークを選択",
          },
          visual: "🔑",
        },
        {
          title: { es: "Seguridad en Xaman", en: "Security in Xaman", jp: "Xamanのセキュリティ" },
          content: {
            es: "🔐 El seed NUNCA sale del dispositivo\n📲 Firma local (no envía claves a servidores)\n🔒 Almacenamiento encriptado (Keychain/Keystore)\n\nModos de importación:\n• Acceso completo → Firmar transacciones\n• Solo lectura → Solo ver balance\n\n💡 Guarda siempre una copia del seed\nfuera del dispositivo",
            en: "🔐 The seed NEVER leaves the device\n📲 Local signing (does not send keys to servers)\n🔒 Encrypted storage (Keychain/Keystore)\n\nImport modes:\n• Full access → Sign transactions\n• Read-only → Only view balance\n\n💡 Always keep a copy of the seed\noutside the device",
            jp: "🔐 シードはデバイスから絶対に出ない\n📲 ローカル署名（サーバーに鍵を送信しない）\n🔒 暗号化されたストレージ（Keychain/Keystore）\n\nインポートモード：\n• フルアクセス → トランザクションに署名\n• 読み取り専用 → 残高のみ確認\n\n💡 シードのコピーを\n常にデバイス外に保管する",
          },
          visual: "🛡️",
        },
      ],
    },
  ],
}
