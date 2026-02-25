export default {
  id: "m3",
  icon: "👛",
  title: {
    es: "Generación de tu primera wallet",
    en: "Generating your first wallet",
    jp: "",
  },
  lessons: [
    {
      id: "m3l1",
      title: {
        es: "Criptografía y claves en Xahau",
        en: "Cryptography and keys in Xahau",
        jp: "",
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
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Generar una wallet nueva",
            en: "Generate a new wallet",
            jp: "",
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
console.log("\n=== Wallet ed25519 ===");
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
console.log("\n=== Wallet ed25519 ===");
console.log("Address:", wallet2.address);
console.log("Public key:", wallet2.publicKey);
console.log("Seed:", wallet2.seed);`,
            jp: "",
          },
        },
        {
          title: {
            es: "Restaurar una wallet desde un seed existente",
            en: "Restore a wallet from an existing seed",
            jp: "",
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
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es una Wallet?", en: "What is a Wallet?", jp: "" },
          content: {
            es: "Un par de claves criptográficas:\n\n🔑 Clave privada (seed) → Firmar transacciones\n📢 Clave pública → Verificar firmas\n📍 Dirección (r...) → Tu identidad en la red",
            en: "A pair of cryptographic keys:\n\n🔑 Private key (seed) → Sign transactions\n📢 Public key → Verify signatures\n📍 Address (r...) → Your identity on the network",
            jp: "",
          },
          visual: "👛",
        },
        {
          title: { es: "Algoritmos de firma", en: "Signing algorithms", jp: "" },
          content: {
            es: "Xahau soporta dos algoritmos:\n\n• secp256k1 → Igual que Bitcoin (por defecto)\n• ed25519 → Más moderno y eficiente\n\nAmbos son seguros y válidos",
            en: "Xahau supports two algorithms:\n\n• secp256k1 → Same as Bitcoin (default)\n• ed25519 → More modern and efficient\n\nBoth are secure and valid",
            jp: "",
          },
          visual: "🔐",
        },
        {
          title: { es: "Activación de cuenta", en: "Account activation", jp: "" },
          content: {
            es: "Una cuenta NO existe hasta que recibe\nsu primer depósito\n\n• Mínimo 1 XAH de reserva base\n• Este XAH queda bloqueado\n• En testnet: usa el faucet gratuito",
            en: "An account does NOT exist until it receives\nits first deposit\n\n• Minimum 1 XAH base reserve\n• This XAH remains locked\n• On testnet: use the free faucet",
            jp: "",
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
        jp: "",
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
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear y activar una wallet en testnet usando el faucet",
            en: "Create and activate a wallet on testnet using the faucet",
            jp: "",
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
  console.log("\\nSolicitando fondos del faucet...");
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
  console.log("\\nDatos de la cuenta en el ledger:");
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
  console.log("\\nRequesting funds from faucet...");
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
  console.log("\\nAccount data on the ledger:");
  console.log("  Balance:", account.Balance, "drops");
  console.log("  Balance:", Number(account.Balance) / 1_000_000, "XAH");
  console.log("  Sequence:", account.Sequence);

  await client.disconnect();
}

createTestnetWallet();`,
            jp: "",
          },
        },
        {
          title: {
            es: "Consultar el balance de una cuenta existente",
            en: "Check the balance of an existing account",
            jp: "",
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
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "Testnet de Xahau", en: "Xahau Testnet", jp: "" },
          content: {
            es: "Red de pruebas para desarrollo\n\n• Tokens sin valor real\n• Faucet gratuito para obtener test XAH\n• Funciona igual que mainnet\n• Perfecto para aprender",
            en: "Test network for development\n\n• Tokens with no real value\n• Free faucet to get test XAH\n• Works the same as mainnet\n• Perfect for learning",
            jp: "",
          },
          visual: "🧪",
        },
        {
          title: { es: "Flujo de activación", en: "Activation flow", jp: "" },
          content: {
            es: "1️⃣ Generar wallet (par de claves)\n2️⃣ Obtener XAH del faucet\n3️⃣ El faucet envía un pago\n4️⃣ La cuenta se crea en el ledger\n5️⃣ ¡Lista para usar!",
            en: "1️⃣ Generate wallet (key pair)\n2️⃣ Get XAH from the faucet\n3️⃣ The faucet sends a payment\n4️⃣ The account is created on the ledger\n5️⃣ Ready to use!",
            jp: "",
          },
          visual: "🚀",
        },
        {
          title: { es: "Verificar con account_info", en: "Verify with account_info", jp: "" },
          content: {
            es: "Comando account_info para confirmar activación:\n\n• Balance → XAH disponible (en drops)\n• Sequence → Número de próxima transacción\n• Flags → Configuración de la cuenta\n• OwnerCount → Objetos en el ledger\n\nSi la cuenta no existe: error actNotFound\n1 XAH = 1,000,000 drops",
            en: "account_info command to confirm activation:\n\n• Balance → Available XAH (in drops)\n• Sequence → Next transaction number\n• Flags → Account configuration\n• OwnerCount → Objects on the ledger\n\nIf the account does not exist: actNotFound error\n1 XAH = 1,000,000 drops",
            jp: "",
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
        jp: "",
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
        jp: "",
      },
            codeBlocks: [],
      slides: [
        {
          title: { es: "¿Qué es un block explorer?", en: "What is a block explorer?", jp: "" },
          content: {
            es: "Una herramienta web para consultar la blockchain\nsin escribir código\n\n• Ver balances y tokens de cualquier cuenta\n• Consultar historial de transacciones\n• Inspeccionar detalles de cada operación\n• Verificar resultados y errores",
            en: "A web tool to query the blockchain\nwithout writing code\n\n• View balances and tokens of any account\n• Check transaction history\n• Inspect details of each operation\n• Verify results and errors",
            jp: "",
          },
          visual: "🔍",
        },
        {
          title: { es: "Exploradores de Xahau", en: "Xahau Explorers", jp: "" },
          content: {
            es: "Mainnet:\n• xahauexplorer.com\n• xahau.xrplwin.com\n• explorer.xahau.network\n• xahscan.com\n\nTestnet (para el curso):\n• test.xahauexplorer.com\n• xahau-testnet.xrplwin.com\n• explorer.xahau-test.net",
            en: "Mainnet:\n• xahauexplorer.com\n• xahau.xrplwin.com\n• explorer.xahau.network\n• xahscan.com\n\nTestnet (for the course):\n• test.xahauexplorer.com\n• xahau-testnet.xrplwin.com\n• explorer.xahau-test.net",
            jp: "",
          },
          visual: "🌐",
        },
        {
          title: { es: "Cómo consultar tu cuenta", en: "How to check your account", jp: "" },
          content: {
            es: "1️⃣ Abre un explorer de testnet\n2️⃣ Pega tu dirección (r...)\n3️⃣ Verás:\n   • Balance en XAH\n   • Tokens y trust lines\n   • Historial de transacciones\n   • Flags y configuración\n\nTambién puedes buscar por hash de transacción",
            en: "1️⃣ Open a testnet explorer\n2️⃣ Paste your address (r...)\n3️⃣ You will see:\n   • Balance in XAH\n   • Tokens and trust lines\n   • Transaction history\n   • Flags and configuration\n\nYou can also search by transaction hash",
            jp: "",
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
        jp: "",
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
        jp: "",
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "La regla de oro", en: "The golden rule", jp: "" },
          content: {
            es: "NUNCA compartas tu seed/clave privada\n\n❌ No por chat ni email\n❌ No en sitios web dudosos\n❌ No en texto plano en tu PC\n❌ No en capturas de pantalla\n\nQuien tiene tu seed\ntiene TODOS tus fondos",
            en: "NEVER share your seed/private key\n\n❌ Not via chat or email\n❌ Not on suspicious websites\n❌ Not in plain text on your PC\n❌ Not in screenshots\n\nWhoever has your seed\nhas ALL your funds",
            jp: "",
          },
          visual: "🔒",
        },
        {
          title: { es: "Hot Wallet vs Cold Wallet", en: "Hot Wallet vs Cold Wallet", jp: "" },
          content: {
            es: "🔥 Hot Wallet (conectada)\n• Conveniente para uso diario\n• Mayor riesgo\n• Apps, bots de trading\n\n🧊 Cold Wallet (desconectada)\n• Máxima seguridad\n• Almacenamiento largo plazo\n• Hardware wallet, papel, metal",
            en: "🔥 Hot Wallet (connected)\n• Convenient for daily use\n• Higher risk\n• Apps, trading bots\n\n🧊 Cold Wallet (disconnected)\n• Maximum security\n• Long-term storage\n• Hardware wallet, paper, metal",
            jp: "",
          },
          visual: "🔥",
        },
        {
          title: { es: "Estafas comunes", en: "Common scams", jp: "" },
          content: {
            es: "🎣 Phishing → Sitios web falsos\n🤖 Fake dApps → Rendimientos irreales\n🎭 Ingeniería social → Falso soporte\n🪂 Airdrops falsos → Tokens trampa\n\nRegla: NADIE legítimo te pedirá\ntu clave privada. Jamás.",
            en: "🎣 Phishing → Fake websites\n🤖 Fake dApps → Unrealistic returns\n🎭 Social engineering → Fake support\n🪂 Fake airdrops → Trap tokens\n\nRule: NOBODY legitimate will ask\nfor your private key. Ever.",
            jp: "",
          },
          visual: "⚠️",
        },
        {
          title: { es: "Seguridad avanzada en Xahau", en: "Advanced security in Xahau", jp: "" },
          content: {
            es: "🔑 Regular Key\n  Clave alternativa para firmar\n  (se puede cambiar sin cambiar dirección)\n\n🚫 Master Key Disable\n  Desactivar la clave maestra\n  (capa extra de protección)\n\n👥 Multi-signing\n  Múltiples firmas requeridas\n  (ideal para organizaciones)",
            en: "🔑 Regular Key\n  Alternative key for signing\n  (can be changed without changing address)\n\n🚫 Master Key Disable\n  Disable the master key\n  (extra layer of protection)\n\n👥 Multi-signing\n  Multiple signatures required\n  (ideal for organizations)",
            jp: "",
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
        jp: "",
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

### Account Delete: eliminar tu cuenta

En Xahau es posible **eliminar una cuenta** del ledger para recuperar parte de la reserva:

Requisitos:
- El número de secuencia de la cuenta debe ser al menos 256
- La cuenta no debe poseer objetos en el ledger (ofertas, trust lines, etc.)
- Se debe especificar una cuenta de destino para los fondos restantes
- Se cobra una tarifa especial de 2 XAH (que se destruye)
- La reserva base se envía a la cuenta de destino

Después de eliminarse, la dirección queda libre pero no se puede reutilizar con la misma seed (por seguridad).

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

### Account Delete: deleting your account

In Xahau it is possible to **delete an account** from the ledger to recover part of the reserve:

Requirements:
- The account's sequence number must be at least 256
- The account must not own any objects on the ledger (offers, trust lines, etc.)
- A destination account must be specified for the remaining funds
- A special fee of 2 XAH is charged (which is destroyed)
- The base reserve is sent to the destination account

After deletion, the address becomes free but cannot be reused with the same seed (for security).

### Flags as bits

Account flags are stored as a numeric field where each bit represents a flag. You can enable flags with the \`SetFlag\` field and disable them with \`ClearFlag\` in the AccountSet transaction.

| Flag | ID | Purpose |
|------|----|---------|
| asfRequireDest | 1 | Require Destination Tag |
| asfRequireAuth | 2 | Require trust line authorization |
| asfDisallowXRP | 3 | Signal that XAH is not desired |
| asfDisableMaster | 4 | Disable master key |
| asfDefaultRipple | 8 | Allow rippling of issued tokens |`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Activar el flag RequireDestTag en tu cuenta",
            en: "Enable the RequireDestTag flag on your account",
            jp: "",
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

  console.log("\\nResultado:", result.result.meta.TransactionResult);

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
    console.log("\\nFlags de la cuenta (número):", flags);

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

  console.log("\\nResult:", result.result.meta.TransactionResult);

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
    console.log("\\nAccount flags (number):", flags);

    // lsfRequireDestTag = 0x00020000 = 131072
    const requireDestTag = (flags & 0x00020000) !== 0;
    console.log("RequireDestTag active:", requireDestTag);
  }

  await client.disconnect();
}

setRequireDestTag();`,
            jp: "",
          },
        },
        {
          title: {
            es: "Leer e interpretar los flags de una cuenta",
            en: "Read and interpret account flags",
            jp: "",
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
        console.log(\`  ✅ \${flag.name}: \${flag.desc}\`);
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
        console.log(\`  ✅ \${flag.name}: \${flag.desc}\`);
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
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "AccountSet: configura tu cuenta", en: "AccountSet: configure your account", jp: "" },
          content: {
            es: "La transacción AccountSet modifica\nlos flags y propiedades de tu cuenta\n\nFlags principales:\n🏷️ RequireDestTag → Exigir tag en pagos\n🚫 DisallowXAH → Señal de no recibir XAH\n🔄 DefaultRipple → Para emisores de tokens\n🔐 RequireAuth → Autorizar trust lines",
            en: "The AccountSet transaction modifies\nyour account's flags and properties\n\nMain flags:\n🏷️ RequireDestTag → Require tag on payments\n🚫 DisallowXAH → Signal not to receive XAH\n🔄 DefaultRipple → For token issuers\n🔐 RequireAuth → Authorize trust lines",
            jp: "",
          },
          visual: "⚙️",
        },
        {
          title: { es: "Flags como bits", en: "Flags as bits", jp: "" },
          content: {
            es: "Los flags se almacenan como un número binario\nCada bit = un flag diferente\n\nActivar: campo SetFlag + ID del flag\nDesactivar: campo ClearFlag + ID del flag\n\n| Flag | ID |\n| RequireDest | 1 |\n| RequireAuth | 2 |\n| DisallowXRP | 3 |\n| DisableMaster | 4 |\n| DefaultRipple | 8 |",
            en: "Flags are stored as a binary number\nEach bit = a different flag\n\nEnable: SetFlag field + flag ID\nDisable: ClearFlag field + flag ID\n\n| Flag | ID |\n| RequireDest | 1 |\n| RequireAuth | 2 |\n| DisallowXRP | 3 |\n| DisableMaster | 4 |\n| DefaultRipple | 8 |",
            jp: "",
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
        jp: "",
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

### Add the Xahau network in Xaman

By default, Xaman connects to **XRPL Mainnet**. To work with **Xahau**, you need to add the network:

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
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Generar una wallet y preparar datos para importar en Xaman",
            en: "Generate a wallet and prepare data for importing into Xaman",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `const { Client, Wallet } = require("xahau");

async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Generar y financiar una wallet
  const wallet = Wallet.generate();
  console.log("Generando wallet de testnet...\\n");
  await client.fundWallet(wallet);

  // Verificar balance
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== Datos para importar en Xaman ===\\n");
  console.log("Dirección:", wallet.address);
  console.log("Seed:", wallet.seed);
  console.log("Balance:", balance, "XAH");
  console.log("\\n=== Instrucciones ===");
  console.log("1. Abre Xaman en tu móvil");
  console.log("2. Toca 'Añadir cuenta' → 'Importar cuenta existente'");
  console.log("4. Selecciona Acceso Completo");
  console.log("5. Selecciona 'Family Seed (s...)'");
  console.log("6. Introduce el seed:", wallet.seed);
  console.log("\\n⚠️  Recuerda: estamos en TESTNET.");
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
  console.log("Generating testnet wallet...\\n");
  await client.fundWallet(wallet);

  // Check balance
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== Data for importing into Xaman ===\\n");
  console.log("Address:", wallet.address);
  console.log("Seed:", wallet.seed);
  console.log("Balance:", balance, "XAH");
  console.log("\\n=== Instructions ===");
  console.log("1. Open Xaman on your phone");
  console.log("2. Tap 'Add account' → 'Import existing account'");
  console.log("4. Select Full Access");
  console.log("5. Select 'Family Seed (s...)'");
  console.log("6. Enter the seed:", wallet.seed);
  console.log("\\n⚠️  Remember: we are on TESTNET.");
  console.log("    Make sure to select the Xahau Testnet network in Xaman.");

  await client.disconnect();
}

prepareForXaman();`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es Xaman?", en: "What is Xaman?", jp: "" },
          content: {
            es: "Wallet móvil del ecosistema XRPL/Xahau\n\n• iOS y Android\n• Almacena claves de forma segura\n• Firma transacciones desde el móvil\n• Gestiona múltiples cuentas\n• Acceso a xApps\n\nDescarga: xaman.app",
            en: "Mobile wallet for the XRPL/Xahau ecosystem\n\n• iOS and Android\n• Stores keys securely\n• Sign transactions from your phone\n• Manage multiple accounts\n• Access to xApps\n\nDownload: xaman.app",
            jp: "",
          },
          visual: "📱",
        },
        {
          title: { es: "Importar tu cuenta", en: "Import your account", jp: "" },
          content: {
            es: "1️⃣ Abre Xaman → 'Añadir cuenta'\n2️⃣ 'Importar cuenta existente'\n3️⃣ Elige 'Acceso completo'\n4️⃣ Selecciona 'Family Seed (s...)\n5️⃣ Introduce tu seed\n6️⃣ Confirma con PIN/biometría\n\n⚠️ Selecciona red Xahau Testnet\nen Ajustes → Redes",
            en: "1️⃣ Open Xaman → 'Add account'\n2️⃣ 'Import existing account'\n3️⃣ Choose 'Full access'\n4️⃣ Select 'Family Seed (s...)'\n5️⃣ Enter your seed\n6️⃣ Confirm with PIN/biometrics\n\n⚠️ Select Xahau Testnet network\nin Settings → Networks",
            jp: "",
          },
          visual: "🔑",
        },
        {
          title: { es: "Seguridad en Xaman", en: "Security in Xaman", jp: "" },
          content: {
            es: "🔐 El seed NUNCA sale del dispositivo\n📲 Firma local (no envía claves a servidores)\n🔒 Almacenamiento encriptado (Keychain/Keystore)\n\nModos de importación:\n• Acceso completo → Firmar transacciones\n• Solo lectura → Solo ver balance\n\n💡 Guarda siempre una copia del seed\nfuera del dispositivo",
            en: "🔐 The seed NEVER leaves the device\n📲 Local signing (does not send keys to servers)\n🔒 Encrypted storage (Keychain/Keystore)\n\nImport modes:\n• Full access → Sign transactions\n• Read-only → Only view balance\n\n💡 Always keep a copy of the seed\noutside the device",
            jp: "",
          },
          visual: "🛡️",
        },
      ],
    },
  ],
}
