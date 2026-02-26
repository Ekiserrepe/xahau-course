export default {
  id: "m7",
  icon: "🎨",
  title: {
    es: "Creación y uso de NFTs",
    en: "Creating and Using NFTs",
    jp: "",
  },
  lessons: [
    {
      id: "m7l1",
      title: {
        es: "URITokens: NFTs nativos en Xahau",
        en: "URITokens: Native NFTs on Xahau",
        jp: "",
      },
      theory: {
        es: `En Xahau, los NFTs se implementan como **URITokens**, objetos nativos del ledger que representan tokens no fungibles con una URI asociada.

### ¿Qué es un URIToken?

Un URIToken es un objeto **único** en el ledger que contiene:
- **ID**: Identificador único del token (LedgerIndex)
- **URI**: Un enlace a los metadatos o contenido del NFT (imagen, JSON, etc.)
- **Digest**: Hash opcional del contenido al que apunta la URI (para verificar integridad)
- **Owner**: La cuenta propietaria actual
- **Issuer**: La cuenta que lo creó originalmente

### URIToken vs ERC-721

| Característica | ERC-721 (Ethereum) | URIToken (Xahau) |
|---|---|---|
| Crear colección | Desplegar contrato Solidity | No necesario |
| Mintear NFT | Función del contrato | Transacción \`URITokenMint\` |
| Transferir | Función del contrato | Transacción \`URITokenBuy\` |
| Metadata | tokenURI en contrato | URI nativa en el objeto |
| Coste | Gas costoso | Fee mínimo (~12 drops) |
| Verificación | Depende del contrato | Digest nativo en el ledger |

### Transacciones relacionadas con URITokens

- **URITokenMint**: Crear un nuevo URIToken
- **URITokenBurn**: Destruir un URIToken
- **URITokenCreateSellOffer**: Poner un URIToken a la venta
- **URITokenCancelSellOffer**: Cancelar la oferta de venta
- **URITokenBuy**: Comprar un URIToken que está a la venta

### Flags de URITokenMint

- **tfBurnable (1)**: Permite que el emisor pueda quemar el token aunque ya no sea el propietario`,
        en: `On Xahau, NFTs are implemented as **URITokens**, native ledger objects that represent non-fungible tokens with an associated URI.

### What Is a URIToken?

A URIToken is a **unique** object on the ledger that contains:
- **ID**: Unique token identifier (LedgerIndex)
- **URI**: A link to the NFT's metadata or content (image, JSON, etc.)
- **Digest**: Optional hash of the content the URI points to (for integrity verification)
- **Owner**: The current owner account
- **Issuer**: The account that originally created it

### URIToken vs ERC-721

| Feature | ERC-721 (Ethereum) | URIToken (Xahau) |
|---|---|---|
| Create collection | Deploy Solidity contract | Not required |
| Mint NFT | Contract function | \`URITokenMint\` transaction |
| Transfer | Contract function | \`URITokenBuy\` transaction |
| Metadata | tokenURI in contract | Native URI on the object |
| Cost | Expensive gas | Minimal fee (~12 drops) |
| Verification | Depends on contract | Native Digest on the ledger |

### URIToken-Related Transactions

- **URITokenMint**: Create a new URIToken
- **URITokenBurn**: Destroy a URIToken
- **URITokenCreateSellOffer**: List a URIToken for sale
- **URITokenCancelSellOffer**: Cancel a sell offer
- **URITokenBuy**: Buy a URIToken that is listed for sale

### URITokenMint Flags

- **tfBurnable (1)**: Allows the issuer to burn the token even if they are no longer the owner`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear (mintear) un URIToken",
            en: "Create (Mint) a URIToken",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function mintURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const creator = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Crear un URIToken con una URI que apunta a los metadatos
  const mint = {
    TransactionType: "URITokenMint",
    Account: creator.address,
    // URI de ejemplo (puede ser IPFS, HTTPS, etc.) - Ejemplo: ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json
    URI: toHex("https://ejemplo.com/nft/metadata.json"),
    Flags: 1, // tfBurnable: el emisor puede quemar el token
  };

  const prepared = await client.autofill(mint);
  const signed = creator.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken creado con éxito!");
    console.log("Hash tx:", signed.hash);

    // Buscar el URIToken creado en los nodos afectados
    const created = result.result.meta.AffectedNodes.find(
      (n) => n.CreatedNode?.LedgerEntryType === "URIToken"
    );
    if (created) {
      console.log("URIToken ID:", created.CreatedNode.LedgerIndex);
      console.log("Address:", creator.address);

    }
  }

  await client.disconnect();
}

mintURIToken();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function mintURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const creator = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Create a URIToken with a URI pointing to the metadata
  const mint = {
    TransactionType: "URITokenMint",
    Account: creator.address,
    // Example URI (can be IPFS, HTTPS, etc.) - Example: ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json
    URI: toHex("https://example.com/nft/metadata.json"),
    Flags: 1, // tfBurnable: the issuer can burn the token
  };

  const prepared = await client.autofill(mint);
  const signed = creator.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken created successfully!");
    console.log("Tx hash:", signed.hash);

    // Find the created URIToken in the affected nodes
    const created = result.result.meta.AffectedNodes.find(
      (n) => n.CreatedNode?.LedgerEntryType === "URIToken"
    );
    if (created) {
      console.log("URIToken ID:", created.CreatedNode.LedgerIndex);
            console.log("Address:", creator.address);
    }
  }

  await client.disconnect();
}

mintURIToken();`,
            jp: "",
          },
        },
        {
          title: {
            es: "Consultar los URITokens de una cuenta",
            en: "Query URITokens for an Account",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function getURITokens(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "uri_token",
    ledger_index: "validated",
  });

  const tokens = response.result.account_objects;
  console.log(\`=== URITokens de \${address} ===\`);
  console.log(\`Total: \${tokens.length}\\n\`);

  for (const token of tokens) {
    const uri = Buffer.from(token.URI, "hex").toString("utf8");
    console.log(\`URIToken ID: \${token.index}\`);
    console.log(\`  URI: \${uri}\`);
    console.log(\`  Emisor: \${token.Issuer}\`);
    console.log(\`  Owner: \${token.Owner}\`);
    if (token.Digest) {
      console.log(\`  Digest: \${token.Digest}\`);
    }
    if (token.Amount) {
      console.log(\`  En venta por: \${Number(token.Amount) / 1_000_000} XAH\`);
    }
    console.log();
  }

  await client.disconnect();
}
// Reemplaza con la dirección que quieres consultar, por ejemplo r9oB9E7jnRjp88fTrxHzngAietepwCCcqV
getURITokens("rTuDireccionAqui");`,
            en: `const { Client } = require("xahau");

async function getURITokens(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "uri_token",
    ledger_index: "validated",
  });

  const tokens = response.result.account_objects;
  console.log(\`=== URITokens of \${address} ===\`);
  console.log(\`Total: \${tokens.length}\\n\`);

  for (const token of tokens) {
    const uri = Buffer.from(token.URI, "hex").toString("utf8");
    console.log(\`URIToken ID: \${token.index}\`);
    console.log(\`  URI: \${uri}\`);
    console.log(\`  Issuer: \${token.Issuer}\`);
    console.log(\`  Owner: \${token.Owner}\`);
    if (token.Digest) {
      console.log(\`  Digest: \${token.Digest}\`);
    }
    if (token.Amount) {
      console.log(\`  For sale at: \${Number(token.Amount) / 1_000_000} XAH\`);
    }
    console.log();
  }

  await client.disconnect();
}
// Insert the address you want to query, for example r9oB9E7jnRjp88fTrxHzngAietepwCCcqV
getURITokens("rYourAddressHere");`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "URITokens en Xahau", en: "URITokens on Xahau", jp: "" },
          content: {
            es: "NFTs nativos del ledger de Xahau\n\n• URI → Enlace a metadatos\n• Digest → Hash de verificación\n• Owner → Propietario actual\n• Issuer → Creador original\n\nSin necesidad de smart contracts",
            en: "Native NFTs on the Xahau ledger\n\n• URI → Link to metadata\n• Digest → Verification hash\n• Owner → Current owner\n• Issuer → Original creator\n\nNo smart contracts needed",
            jp: "",
          },
          visual: "🎨",
        },
        {
          title: { es: "Operaciones con URITokens", en: "URIToken Operations", jp: "" },
          content: {
            es: "• URITokenMint → Crear NFT\n• URITokenBurn → Destruir NFT\n• URITokenCreateSellOffer → Vender\n• URITokenCancelSellOffer → Cancelar venta\n• URITokenBuy → Comprar",
            en: "• URITokenMint → Create NFT\n• URITokenBurn → Destroy NFT\n• URITokenCreateSellOffer → Sell\n• URITokenCancelSellOffer → Cancel sale\n• URITokenBuy → Buy",
            jp: "",
          },
          visual: "🔧",
        },
        {
          title: { es: "URIToken vs ERC-721", en: "URIToken vs ERC-721", jp: "" },
          content: {
            es: "URIToken (Xahau):\n• Nativo del ledger, sin contratos\n• Fee mínimo (~12 drops)\n• Digest nativo para verificación\n\nERC-721 (Ethereum):\n• Requiere contrato Solidity\n• Gas costoso y variable\n• Verificación depende del contrato",
            en: "URIToken (Xahau):\n• Native to the ledger, no contracts\n• Minimal fee (~12 drops)\n• Native Digest for verification\n\nERC-721 (Ethereum):\n• Requires Solidity contract\n• Expensive and variable gas\n• Verification depends on contract",
            jp: "",
          },
          visual: "⚖️",
        },
      ],
    },
    {
      id: "m7l2",
      title: {
        es: "Compra-venta de URITokens",
        en: "Buying and Selling URITokens",
        jp: "",
      },
      theory: {
        es: `Xahau incluye un sistema nativo para la compra-venta de URITokens, sin necesidad de marketplaces externos ni smart contracts.

### Flujo de venta

1. El propietario crea una **oferta de venta** con \`URITokenCreateSellOffer\`, indicando el precio en XAH o en otra divisa.
2. Cualquiera puede **comprar** el URIToken con \`URITokenBuy\`, pagando el precio establecido
3. El propietario puede **cancelar** la oferta con \`URITokenCancelSellOffer\`

### Venta a un destinatario específico

Puedes crear una oferta de venta dirigida a una cuenta específica usando el campo \`Destination\`. Solo esa cuenta podrá comprar el URIToken.

### Transferencia gratuita

Para transferir un URIToken sin coste (regalar), puedes crear una oferta de venta con \`Amount: "0"\` y un \`Destination\` específico.

### Quemar un URIToken

El propietario actual siempre puede quemar (destruir) su URIToken con \`URITokenBurn\`. Si el token fue creado con el flag \`tfBurnable\`, el emisor original también puede quemarlo.`,
        en: `Xahau includes a native system for buying and selling URITokens, with no need for external marketplaces or smart contracts.

### Sale Flow

1. The owner creates a **sell offer** with \`URITokenCreateSellOffer\`, specifying the price in XAH or another currency.
2. Anyone can **buy** the URIToken with \`URITokenBuy\`, paying the listed price
3. The owner can **cancel** the offer with \`URITokenCancelSellOffer\`

### Sale to a Specific Recipient

You can create a sell offer directed at a specific account using the \`Destination\` field. Only that account will be able to buy the URIToken.

### Free Transfer

To transfer a URIToken at no cost (as a gift), you can create a sell offer with \`Amount: "0"\` and a specific \`Destination\`.

### Burning a URIToken

The current owner can always burn (destroy) their URIToken with \`URITokenBurn\`. If the token was created with the \`tfBurnable\` flag, the original issuer can also burn it.`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Poner un URIToken a la venta",
            en: "List a URIToken for Sale",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function sellURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const owner = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Crear oferta de venta por 50 XAH
  const sellOffer = {
    TransactionType: "URITokenCreateSellOffer",
    Account: owner.address,
    URITokenID: "TU_URITOKEN_ID_AQUI", // ID del URIToken a vender
    Amount: xahToDrops(5), // Precio: 5 XAH
  };

  const prepared = await client.autofill(sellOffer);
  const signed = owner.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken puesto a la venta por 5 XAH!");
  }

  await client.disconnect();
}

sellURIToken();`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function sellURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const owner = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Create a sell offer for 5 XAH
  const sellOffer = {
    TransactionType: "URITokenCreateSellOffer",
    Account: owner.address,
    URITokenID: "YOUR_URITOKEN_ID_HERE", // ID of the URIToken to sell
    Amount: xahToDrops(5), // Price: 5 XAH
  };

  const prepared = await client.autofill(sellOffer);
  const signed = owner.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken listed for sale at 5 XAH!");
  }

  await client.disconnect();
}

sellURIToken();`,
            jp: "",
          },
        },
        {
          title: {
            es: "Comprar un URIToken que está a la venta",
            en: "Buy a URIToken That Is Listed for Sale",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function buyURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const buyer = Wallet.fromSeed(process.env.BUYER_SEED, {algorithm: 'secp256k1'});

  // Comprar el URIToken pagando el precio de venta
  const buy = {
    TransactionType: "URITokenBuy",
    Account: buyer.address,
    URITokenID: "TU_URITOKEN_ID_AQUI", // ID del URIToken a comprar
    Amount: xahToDrops(5), // Debe coincidir con el precio de venta
  };

  const prepared = await client.autofill(buy);
  const signed = buyer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken comprado con éxito!");
    console.log("El NFT ahora es tuyo.");
        console.log("Dirección del comprador:", buyer.address);
  }

  await client.disconnect();
}

buyURIToken();`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function buyURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const buyer = Wallet.fromSeed(process.env.BUYER_SEED, {algorithm: 'secp256k1'});

  // Buy the URIToken by paying the sale price
  const buy = {
    TransactionType: "URITokenBuy",
    Account: buyer.address,
    URITokenID: "YOUR_URITOKEN_ID_HERE", // ID of the URIToken to buy
    Amount: xahToDrops(5), // Must match the sale price
  };

  const prepared = await client.autofill(buy);
  const signed = buyer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken purchased successfully!");
    console.log("The NFT is now yours.");
    console.log("Buyer Address:", buyer.address);
  }

  await client.disconnect();
}

buyURIToken();`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "Flujo de venta", en: "Sale Flow", jp: "" },
          content: {
            es: "1️⃣ URITokenCreateSellOffer → Poner precio\n2️⃣ URITokenBuy → Comprador paga\n3️⃣ Transferencia automática\n\nTodo nativo, sin marketplace externo",
            en: "1️⃣ URITokenCreateSellOffer → Set price\n2️⃣ URITokenBuy → Buyer pays\n3️⃣ Automatic transfer\n\nAll native, no external marketplace",
            jp: "",
          },
          visual: "💰",
        },
        {
          title: { es: "Transferir y quemar", en: "Transfer and Burn", jp: "" },
          content: {
            es: "Transferir gratis:\n• SellOffer con Amount: 0 + Destination\n\nQuemar (destruir):\n• URITokenBurn por el propietario\n• O por el emisor si tiene flag tfBurnable",
            en: "Free transfer:\n• SellOffer with Amount: 0 + Destination\n\nBurn (destroy):\n• URITokenBurn by the owner\n• Or by the issuer if tfBurnable flag is set",
            jp: "",
          },
          visual: "🔥",
        },
        {
          title: { es: "Quemar URITokens en detalle", en: "Burning URITokens in Detail", jp: "" },
          content: {
            es: "Flag tfBurnable (1) al mintear:\n• Permite al emisor quemar el token\n• Incluso si ya no es propietario\n\nSin tfBurnable:\n• Solo el propietario actual puede quemar\n\nUsos: eliminar errores de minteo,\ncontenido expirado, tokens revocables",
            en: "tfBurnable flag (1) at mint time:\n• Allows the issuer to burn the token\n• Even if they are no longer the owner\n\nWithout tfBurnable:\n• Only the current owner can burn\n\nUse cases: fix minting errors,\nexpired content, revocable tokens",
            jp: "",
          },
          visual: "🗑️",
        },
      ],
    },
    {
      id: "m7l3",
      title: {
        es: "Metadatos y estándares para URITokens",
        en: "Metadata and Standards for URITokens",
        jp: "",
      },
      theory: {
        es: `Los metadatos son la clave para que un NFT sea útil y verificable. En Xahau, los URITokens usan los campos **URI** y **Digest** para enlazar y verificar el contenido asociado.

### El campo URI: qué poner en él

La URI es un enlace que apunta al contenido o metadatos del NFT. Hay varias opciones:

- **IPFS links** (\`ipfs://QmXxx...\`): Almacenamiento descentralizado. El contenido es inmutable y direccionado por hash. Es la opción **recomendada** para producción
- **HTTPS links** (\`https://mi-servidor.com/metadata/1.json\`): Almacenamiento centralizado. Fácil de implementar pero depende de que el servidor esté disponible

### El campo Digest: verificación de integridad

El **Digest** es un hash SHA-256 del contenido al que apunta la URI. Permite a cualquiera verificar que el contenido no ha sido alterado desde que se creó el NFT. Se almacena como una cadena hexadecimal de 64 caracteres en el ledger.

### Estándar de metadatos JSON

Siguiendo un estándar similar a ERC-721, los metadatos JSON de un URIToken típicamente incluyen:

\`\`\`json
{
    "content": {
        "url": "ipfs://bafybeign6w3zkxxqohchtxyv4qot6zrwcrvosmmrz2c6ayijl67h42s3km/106.png"
    },
    "details": {
        "title": "Nombre de tu NFT",
        "categories": [
            "0001"
        ],
        "publisher": {
            "name": "Tu nombre",
            "url": "https://www.tuweb.com",
            "email": "tucorreo@gmail.com"
        },
        "group": {
            "title": "Título de tu colección"
        }
    }
}
\`\`\`

### Opciones de almacenamiento

| Opción | Ventajas | Desventajas |
|---|---|---|
| **IPFS** | Descentralizado, inmutable, direccionado por hash | Necesita pinning para persistencia |
| **Servidor centralizado** | Simple, rápido | Punto único de fallo, mutable |

### Buenas prácticas

- **Siempre establece el Digest**: Permite verificar la integridad del contenido en cualquier momento
- **Usa IPFS para producción**: La inmutabilidad y descentralización protegen el valor del NFT
- **Mantén el JSON consistente**: Sigue el estándar de metadatos para compatibilidad con marketplaces y exploradores
- **No pongas datos sensibles en la URI**: Todo es público en el ledger`,
        en: `Metadata is the key to making an NFT useful and verifiable. On Xahau, URITokens use the **URI** and **Digest** fields to link to and verify associated content.

### The URI Field: What to Put in It

The URI is a link that points to the NFT's content or metadata. There are several options:

- **IPFS links** (\`ipfs://QmXxx...\`): Decentralized storage. Content is immutable and hash-addressed. This is the **recommended** option for production
- **HTTPS links** (\`https://my-server.com/metadata/1.json\`): Centralized storage. Easy to implement but depends on server availability

### The Digest Field: Integrity Verification

The **Digest** is a SHA-256 hash of the content the URI points to. It allows anyone to verify that the content has not been altered since the NFT was created. It is stored as a 64-character hexadecimal string on the ledger.

### JSON Metadata Standard

Following a standard similar to ERC-721, the JSON metadata for a URIToken typically includes:

\`\`\`json
{
    "content": {
        "url": "ipfs://bafybeign6w3zkxxqohchtxyv4qot6zrwcrvosmmrz2c6ayijl67h42s3km/106.png"
    },
    "details": {
        "title": "Your NFT Name",
        "categories": [
            "0001"
        ],
        "publisher": {
            "name": "Your name",
            "url": "https://www.yourwebsite.com",
            "email": "youremail@gmail.com"
        },
        "group": {
            "title": "Your Collection Title"
        }
    }
}
\`\`\`

### Storage Options

| Option | Advantages | Disadvantages |
|---|---|---|
| **IPFS** | Decentralized, immutable, hash-addressed | Requires pinning for persistence |
| **Centralized server** | Simple, fast | Single point of failure, mutable |

### Best Practices

- **Always set the Digest**: Allows verifying content integrity at any time
- **Use IPFS for production**: Immutability and decentralization protect the NFT's value
- **Keep JSON consistent**: Follow the metadata standard for compatibility with marketplaces and explorers
- **Do not put sensitive data in the URI**: Everything is public on the ledger`,
        jp: "",
      },
      codeBlocks: [
        
      ],
      slides: [
        {
          title: { es: "El campo URI: opciones de enlace", en: "The URI Field: Link Options", jp: "" },
          content: {
            es: "¿A dónde apunta tu NFT?\n\n• ipfs://Qm... → Descentralizado e inmutable\n• https://... → Centralizado pero simple\n",
            en: "Where does your NFT point to?\n\n• ipfs://Qm... → Decentralized and immutable\n• https://... → Centralized but simple\n",
            jp: "",
          },
          visual: "🔗",
        },
        {
          title: { es: "Digest: verificación de integridad", en: "Digest: Integrity Verification", jp: "" },
          content: {
            es: "SHA-256 del contenido → grabado en el ledger\n\n• Cualquiera puede verificar\n• Detecta alteraciones\n• 64 caracteres hexadecimales\n\nSiempre establece el Digest para proteger tu NFT",
            en: "SHA-256 of the content → recorded on the ledger\n\n• Anyone can verify\n• Detects tampering\n• 64 hexadecimal characters\n\nAlways set the Digest to protect your NFT",
            jp: "",
          },
          visual: "🔏",
        },
        {
          title: { es: "Estándar de metadatos JSON", en: "JSON Metadata Standard", jp: "" },
          content: {
            es: "Estructura recomendada (similar a ERC-721):\n\n• name → Nombre del NFT\n• description → Descripción\n• image → Enlace a la imagen\n• attributes → Array de propiedades\n\nConsistencia = compatibilidad con exploradores",
            en: "Recommended structure (similar to ERC-721):\n\n• name → NFT name\n• description → Description\n• image → Link to image\n• attributes → Array of properties\n\nConsistency = compatibility with explorers",
            jp: "",
          },
          visual: "📋",
        },
      ],
    },
  ],
}
