export default {
  id: "m7",
  icon: "🎨",
  title: {
    es: "Creación y uso de NFTs",
    en: "",
    jp: "",
  },
  lessons: [
    {
      id: "m7l1",
      title: {
        es: "URITokens: NFTs nativos en Xahau",
        en: "",
        jp: "",
      },
      theory: {
        es: `En Xahau, los NFTs se implementan como **URITokens** — objetos nativos del ledger que representan tokens no fungibles con una URI asociada.

### ¿Qué es un URIToken?

Un URIToken es un objeto del ledger que contiene:
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
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear (mintear) un URIToken",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function mintURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const creator = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

  // Crear un URIToken con una URI que apunta a los metadatos
  const mint = {
    TransactionType: "URITokenMint",
    Account: creator.address,
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
    }
  }

  await client.disconnect();
}

mintURIToken();`,
        },
        {
          title: {
            es: "Consultar los URITokens de una cuenta",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client } = require("xahau");

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

getURITokens("rTuDireccionAqui");`,
        },
      ],
      slides: [
        {
          title: { es: "URITokens en Xahau", en: "", jp: "" },
          content: {
            es: "NFTs nativos del ledger de Xahau\n\n• URI → Enlace a metadatos\n• Digest → Hash de verificación\n• Owner → Propietario actual\n• Issuer → Creador original\n\nSin necesidad de smart contracts",
            en: "",
            jp: "",
          },
          visual: "🎨",
        },
        {
          title: { es: "Operaciones con URITokens", en: "", jp: "" },
          content: {
            es: "• URITokenMint → Crear NFT\n• URITokenBurn → Destruir NFT\n• URITokenCreateSellOffer → Vender\n• URITokenCancelSellOffer → Cancelar venta\n• URITokenBuy → Comprar",
            en: "",
            jp: "",
          },
          visual: "🔧",
        },
        {
          title: { es: "URIToken vs ERC-721", en: "", jp: "" },
          content: {
            es: "URIToken (Xahau):\n• Nativo del ledger, sin contratos\n• Fee mínimo (~12 drops)\n• Digest nativo para verificación\n\nERC-721 (Ethereum):\n• Requiere contrato Solidity\n• Gas costoso y variable\n• Verificación depende del contrato",
            en: "",
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
        en: "",
        jp: "",
      },
      theory: {
        es: `Xahau incluye un sistema nativo para la compra-venta de URITokens, sin necesidad de marketplaces externos ni smart contracts.

### Flujo de venta

1. El propietario crea una **oferta de venta** con \`URITokenCreateSellOffer\`, indicando el precio en XAH
2. Cualquiera puede **comprar** el URIToken con \`URITokenBuy\`, pagando el precio establecido
3. El propietario puede **cancelar** la oferta con \`URITokenCancelSellOffer\`

### Venta a un destinatario específico

Puedes crear una oferta de venta dirigida a una cuenta específica usando el campo \`Destination\`. Solo esa cuenta podrá comprar el URIToken.

### Transferencia gratuita

Para transferir un URIToken sin coste (regalar), puedes crear una oferta de venta con \`Amount: "0"\` y un \`Destination\` específico.

### Quemar un URIToken

El propietario actual siempre puede quemar (destruir) su URIToken con \`URITokenBurn\`. Si el token fue creado con el flag \`tfBurnable\`, el emisor original también puede quemarlo.`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Poner un URIToken a la venta",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet, xahToDrops } = require("xahau");

async function sellURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const owner = Wallet.fromSeed("sEdVxxxSeedDelPropietario", {algorithm: 'secp256k1'});

  // Crear oferta de venta por 50 XAH
  const sellOffer = {
    TransactionType: "URITokenCreateSellOffer",
    Account: owner.address,
    URITokenID: "TU_URITOKEN_ID_AQUI", // ID del URIToken a vender
    Amount: xahToDrops(50), // Precio: 50 XAH
  };

  const prepared = await client.autofill(sellOffer);
  const signed = owner.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken puesto a la venta por 50 XAH!");
  }

  await client.disconnect();
}

sellURIToken();`,
        },
        {
          title: {
            es: "Comprar un URIToken que está a la venta",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet, xahToDrops } = require("xahau");

async function buyURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const buyer = Wallet.fromSeed("sEdVxxxSeedDelComprador", {algorithm: 'secp256k1'});

  // Comprar el URIToken pagando el precio de venta
  const buy = {
    TransactionType: "URITokenBuy",
    Account: buyer.address,
    URITokenID: "TU_URITOKEN_ID_AQUI", // ID del URIToken a comprar
    Amount: xahToDrops(50), // Debe coincidir con el precio de venta
  };

  const prepared = await client.autofill(buy);
  const signed = buyer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken comprado con éxito!");
    console.log("El NFT ahora es tuyo.");
  }

  await client.disconnect();
}

buyURIToken();`,
        },
      ],
      slides: [
        {
          title: { es: "Flujo de venta", en: "", jp: "" },
          content: {
            es: "1️⃣ URITokenCreateSellOffer → Poner precio\n2️⃣ URITokenBuy → Comprador paga\n3️⃣ Transferencia automática\n\nTodo nativo, sin marketplace externo",
            en: "",
            jp: "",
          },
          visual: "💰",
        },
        {
          title: { es: "Transferir y quemar", en: "", jp: "" },
          content: {
            es: "Transferir gratis:\n• SellOffer con Amount: 0 + Destination\n\nQuemar (destruir):\n• URITokenBurn por el propietario\n• O por el emisor si tiene flag tfBurnable",
            en: "",
            jp: "",
          },
          visual: "🔥",
        },
        {
          title: { es: "Quemar URITokens en detalle", en: "", jp: "" },
          content: {
            es: "Flag tfBurnable (1) al mintear:\n• Permite al emisor quemar el token\n• Incluso si ya no es propietario\n\nSin tfBurnable:\n• Solo el propietario actual puede quemar\n\nUsos: eliminar errores de minteo,\ncontenido expirado, tokens revocables",
            en: "",
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
        en: "",
        jp: "",
      },
      theory: {
        es: `Los metadatos son la clave para que un NFT sea útil y verificable. En Xahau, los URITokens usan los campos **URI** y **Digest** para enlazar y verificar el contenido asociado.

### El campo URI: qué poner en él

La URI es un enlace que apunta al contenido o metadatos del NFT. Hay varias opciones:

- **IPFS links** (\`ipfs://QmXxx...\`): Almacenamiento descentralizado. El contenido es inmutable y direccionado por hash. Es la opción **recomendada** para producción
- **HTTPS links** (\`https://mi-servidor.com/metadata/1.json\`): Almacenamiento centralizado. Fácil de implementar pero depende de que el servidor esté disponible
- **Data URIs** (\`data:application/json;base64,...\`): Para datos pequeños incrustados directamente. Útil para metadatos simples sin dependencia externa

### El campo Digest: verificación de integridad

El **Digest** es un hash SHA-256 del contenido al que apunta la URI. Permite a cualquiera verificar que el contenido no ha sido alterado desde que se creó el NFT. Se almacena como una cadena hexadecimal de 64 caracteres en el ledger.

### Estándar de metadatos JSON

Siguiendo un estándar similar a ERC-721, los metadatos JSON de un URIToken típicamente incluyen:

\`\`\`json
{
  "name": "Mi NFT #1",
  "description": "Descripción del NFT",
  "image": "ipfs://QmXxxImageHash...",
  "attributes": [
    { "trait_type": "Color", "value": "Azul" },
    { "trait_type": "Rareza", "value": "Legendario" },
    { "trait_type": "Poder", "value": 95 }
  ]
}
\`\`\`

### Opciones de almacenamiento

| Opción | Ventajas | Desventajas |
|---|---|---|
| **IPFS** | Descentralizado, inmutable, direccionado por hash | Necesita pinning para persistencia |
| **Arweave** | Permanente, pago único | Coste por almacenamiento |
| **Servidor centralizado** | Simple, rápido | Punto único de fallo, mutable |

### Buenas prácticas

- **Siempre establece el Digest**: Permite verificar la integridad del contenido en cualquier momento
- **Usa IPFS para producción**: La inmutabilidad y descentralización protegen el valor del NFT
- **Mantén el JSON consistente**: Sigue el estándar de metadatos para compatibilidad con marketplaces y exploradores
- **No pongas datos sensibles en la URI**: Todo es público en el ledger`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Mintear un URIToken con URI de IPFS y Digest",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");
const crypto = require("crypto");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function mintWithIPFSAndDigest() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const creator = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

  // Metadatos JSON del NFT (esto se sube a IPFS)
  const metadata = JSON.stringify({
    name: "Xahau NFT #1",
    description: "Mi primer NFT en Xahau con IPFS",
    image: "ipfs://QmExampleImageHash123456789",
    attributes: [
      { trait_type: "Colección", value: "Xahau Academy" },
      { trait_type: "Número", value: 1 },
    ],
  });

  // Calcular el digest SHA-256 del contenido
  const digest = crypto
    .createHash("sha256")
    .update(metadata)
    .digest("hex")
    .toUpperCase();

  console.log("Digest SHA-256:", digest);

  // URI apuntando al JSON en IPFS (después de subirlo)
  const ipfsURI = "ipfs://QmExampleMetadataHash123456789";

  const mint = {
    TransactionType: "URITokenMint",
    Account: creator.address,
    URI: toHex(ipfsURI),
    Digest: digest,
    Flags: 1, // tfBurnable
  };

  const prepared = await client.autofill(mint);
  const signed = creator.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken creado con IPFS URI y Digest!");

    const created = result.result.meta.AffectedNodes.find(
      (n) => n.CreatedNode?.LedgerEntryType === "URIToken"
    );
    if (created) {
      console.log("URIToken ID:", created.CreatedNode.LedgerIndex);
    }
  }

  await client.disconnect();
}

mintWithIPFSAndDigest();`,
        },
        {
          title: {
            es: "Leer un URIToken y verificar su Digest contra el contenido",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client } = require("xahau");
const crypto = require("crypto");
const https = require("https");

async function verifyURITokenDigest(ownerAddress, uriTokenID) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Obtener los URITokens de la cuenta
  const response = await client.request({
    command: "account_objects",
    account: ownerAddress,
    type: "uri_token",
    ledger_index: "validated",
  });

  // Buscar el URIToken específico
  const token = response.result.account_objects.find(
    (t) => t.index === uriTokenID
  );

  if (!token) {
    console.log("URIToken no encontrado");
    await client.disconnect();
    return;
  }

  const uri = Buffer.from(token.URI, "hex").toString("utf8");
  const digestOnLedger = token.Digest;

  console.log("=== Verificación de URIToken ===");
  console.log("ID:", token.index);
  console.log("URI:", uri);
  console.log("Digest en ledger:", digestOnLedger);

  if (!digestOnLedger) {
    console.log("\\n⚠ Este URIToken no tiene Digest. No se puede verificar.");
    await client.disconnect();
    return;
  }

  // Simular la obtención del contenido (en producción,
  // descargarías el contenido real de la URI)
  const contenidoSimulado = '{"name":"Xahau NFT #1","description":"Ejemplo"}';

  // Calcular el hash del contenido descargado
  const digestCalculado = crypto
    .createHash("sha256")
    .update(contenidoSimulado)
    .digest("hex")
    .toUpperCase();

  console.log("Digest calculado:", digestCalculado);

  if (digestCalculado === digestOnLedger) {
    console.log("\\n✓ ¡Verificación exitosa! El contenido es auténtico.");
  } else {
    console.log("\\n✗ ¡ATENCIÓN! El contenido ha sido modificado.");
    console.log("El digest no coincide con el registrado en el ledger.");
  }

  await client.disconnect();
}

verifyURITokenDigest("rDireccionDelOwner", "URI_TOKEN_ID_AQUI");`,
        },
      ],
      slides: [
        {
          title: { es: "El campo URI: opciones de enlace", en: "", jp: "" },
          content: {
            es: "¿A dónde apunta tu NFT?\n\n• ipfs://Qm... → Descentralizado e inmutable\n• https://... → Centralizado pero simple\n• data:... → Datos inline pequeños\n\nRecomendado: IPFS para producción",
            en: "",
            jp: "",
          },
          visual: "🔗",
        },
        {
          title: { es: "Digest: verificación de integridad", en: "", jp: "" },
          content: {
            es: "SHA-256 del contenido → grabado en el ledger\n\n• Cualquiera puede verificar\n• Detecta alteraciones\n• 64 caracteres hexadecimales\n\nSiempre establece el Digest para proteger tu NFT",
            en: "",
            jp: "",
          },
          visual: "🔏",
        },
        {
          title: { es: "Estándar de metadatos JSON", en: "", jp: "" },
          content: {
            es: "Estructura recomendada (similar a ERC-721):\n\n• name → Nombre del NFT\n• description → Descripción\n• image → Enlace a la imagen\n• attributes → Array de propiedades\n\nConsistencia = compatibilidad con exploradores",
            en: "",
            jp: "",
          },
          visual: "📋",
        },
      ],
    },
    {
      id: "m7l4",
      title: {
        es: "Proyecto práctico: crear una colección de NFTs",
        en: "",
        jp: "",
      },
      theory: {
        es: `En esta lección práctica vamos a crear una colección completa de NFTs en Xahau: desde el minteo programático hasta la transferencia, pasando por la consulta y gestión de los tokens.

### Planificando tu colección de NFTs

Antes de mintear, define:
- **Nombre de la colección** y tema visual
- **Cantidad de NFTs**: Cuántos tokens vas a crear
- **Metadatos**: Estructura JSON consistente para todos los NFTs
- **Almacenamiento**: Dónde guardar las imágenes y metadatos (IPFS recomendado)
- **Flags**: ¿Quieres que sean quemables por el emisor? (tfBurnable)

### Minteo programático: crear múltiples URITokens

Para crear una colección, iteras sobre tus metadatos y ejecutas \`URITokenMint\` para cada uno. Es importante esperar la confirmación de cada transacción antes de enviar la siguiente para evitar problemas de secuencia.

### Listar todos los URITokens de un emisor

Usando \`account_objects\` con filtro \`type: "uri_token"\` puedes obtener todos los URITokens de una cuenta. Esto te permite construir un catálogo o galería de tu colección.

### Construir una galería simple

Con la lista de URITokens puedes:
1. Obtener cada URI
2. Descargar los metadatos JSON
3. Mostrar nombre, descripción, imagen y atributos

### Flujo de transferencia

Para transferir un URIToken a otro usuario:
1. El propietario crea una **oferta de venta** (\`URITokenCreateSellOffer\`) — puede ser con precio 0 para regalo, o con \`Destination\` para venta privada
2. El comprador ejecuta \`URITokenBuy\` pagando el monto establecido
3. La propiedad se transfiere automáticamente

### Quemar URITokens no deseados

Si necesitas eliminar URITokens de tu colección (errores de minteo, tokens sobrantes), usa \`URITokenBurn\`. El propietario siempre puede quemar sus tokens. Si se usó \`tfBurnable\` al mintear, el emisor original también puede hacerlo.`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Mintear un lote de 3 URITokens con diferentes metadatos",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");
const crypto = require("crypto");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function mintCollection() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const creator = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

  // Definir los metadatos de cada NFT de la colección
  const collection = [
    {
      name: "Xahau Warrior #1",
      description: "Guerrero legendario de la colección Xahau",
      image: "ipfs://QmImageHash1",
      attributes: [
        { trait_type: "Clase", value: "Guerrero" },
        { trait_type: "Poder", value: 85 },
      ],
    },
    {
      name: "Xahau Mage #2",
      description: "Mago ancestral de la colección Xahau",
      image: "ipfs://QmImageHash2",
      attributes: [
        { trait_type: "Clase", value: "Mago" },
        { trait_type: "Poder", value: 92 },
      ],
    },
    {
      name: "Xahau Healer #3",
      description: "Sanador sagrado de la colección Xahau",
      image: "ipfs://QmImageHash3",
      attributes: [
        { trait_type: "Clase", value: "Sanador" },
        { trait_type: "Poder", value: 78 },
      ],
    },
  ];

  const mintedTokens = [];

  for (let i = 0; i < collection.length; i++) {
    const metadata = JSON.stringify(collection[i]);

    // Calcular digest del contenido
    const digest = crypto
      .createHash("sha256")
      .update(metadata)
      .digest("hex")
      .toUpperCase();

    // En producción, subirías metadata a IPFS y usarías el CID real
    const uri = \`ipfs://QmCollectionMetadata\${i + 1}\`;

    const mint = {
      TransactionType: "URITokenMint",
      Account: creator.address,
      URI: toHex(uri),
      Digest: digest,
      Flags: 1, // tfBurnable
    };

    const prepared = await client.autofill(mint);
    const signed = creator.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const txResult = result.result.meta.TransactionResult;
    console.log(\`[\${i + 1}/\${collection.length}] \${collection[i].name}: \${txResult}\`);

    if (txResult === "tesSUCCESS") {
      const created = result.result.meta.AffectedNodes.find(
        (n) => n.CreatedNode?.LedgerEntryType === "URIToken"
      );
      if (created) {
        mintedTokens.push({
          id: created.CreatedNode.LedgerIndex,
          name: collection[i].name,
        });
      }
    }
  }

  console.log("\\n=== Colección minteada ===");
  for (const token of mintedTokens) {
    console.log(\`  \${token.name} → ID: \${token.id}\`);
  }

  await client.disconnect();
}

mintCollection();`,
        },
        {
          title: {
            es: "Listar todos los URITokens de una cuenta con sus metadatos",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client } = require("xahau");

async function listCollectionWithMetadata(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "uri_token",
    ledger_index: "validated",
  });

  const tokens = response.result.account_objects;
  console.log(\`=== Colección de NFTs de \${address} ===\`);
  console.log(\`Total: \${tokens.length} URITokens\\n\`);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const uri = Buffer.from(token.URI, "hex").toString("utf8");

    console.log(\`--- NFT #\${i + 1} ---\`);
    console.log(\`  ID:     \${token.index}\`);
    console.log(\`  URI:    \${uri}\`);
    console.log(\`  Emisor: \${token.Issuer}\`);

    if (token.Digest) {
      console.log(\`  Digest: \${token.Digest}\`);
    }

    if (token.Amount) {
      const precio = Number(token.Amount) / 1_000_000;
      console.log(\`  Estado: En venta por \${precio} XAH\`);
    } else {
      console.log(\`  Estado: No está a la venta\`);
    }

    // En producción, aquí descargarías el JSON de la URI
    // y mostrarías name, description, image, attributes
    // const metadata = await fetch(convertIPFStoHTTP(uri));
    // console.log("  Nombre:", metadata.name);

    console.log();
  }

  await client.disconnect();
}

listCollectionWithMetadata("rTuDireccionAqui");`,
        },
        {
          title: {
            es: "Transferir un URIToken a otra cuenta (venta + compra)",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet, xahToDrops } = require("xahau");

async function transferURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const seller = Wallet.fromSeed("sEdVxxxSeedDelVendedor", {algorithm: 'secp256k1'});
  const buyer = Wallet.fromSeed("sEdVxxxSeedDelComprador", {algorithm: 'secp256k1'});

  const uriTokenID = "TU_URITOKEN_ID_AQUI";
  const precioXAH = 25; // Precio de venta: 25 XAH

  // PASO 1: El vendedor crea la oferta de venta
  console.log("Paso 1: Creando oferta de venta...");
  const sellOffer = {
    TransactionType: "URITokenCreateSellOffer",
    Account: seller.address,
    URITokenID: uriTokenID,
    Amount: xahToDrops(precioXAH),
    Destination: buyer.address, // Venta dirigida al comprador
  };

  const prepSell = await client.autofill(sellOffer);
  const signedSell = seller.sign(prepSell);
  const resultSell = await client.submitAndWait(signedSell.tx_blob);

  console.log("Oferta de venta:", resultSell.result.meta.TransactionResult);

  if (resultSell.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error al crear la oferta de venta");
    await client.disconnect();
    return;
  }

  // PASO 2: El comprador acepta y compra el URIToken
  console.log("\\nPaso 2: Comprando el URIToken...");
  const buyTx = {
    TransactionType: "URITokenBuy",
    Account: buyer.address,
    URITokenID: uriTokenID,
    Amount: xahToDrops(precioXAH),
  };

  const prepBuy = await client.autofill(buyTx);
  const signedBuy = buyer.sign(prepBuy);
  const resultBuy = await client.submitAndWait(signedBuy.tx_blob);

  console.log("Compra:", resultBuy.result.meta.TransactionResult);

  if (resultBuy.result.meta.TransactionResult === "tesSUCCESS") {
    console.log(\`\\n¡Transferencia completada!\`);
    console.log(\`El URIToken ahora pertenece a \${buyer.address}\`);
    console.log(\`El vendedor recibió \${precioXAH} XAH\`);
  }

  await client.disconnect();
}

transferURIToken();`,
        },
      ],
      slides: [
        {
          title: { es: "Planificar tu colección de NFTs", en: "", jp: "" },
          content: {
            es: "Antes de mintear, define:\n\n• Nombre y tema de la colección\n• Cantidad de NFTs a crear\n• Estructura de metadatos JSON\n• Almacenamiento: IPFS recomendado\n• Flags: tfBurnable si necesitas control",
            en: "",
            jp: "",
          },
          visual: "📝",
        },
        {
          title: { es: "Minteo y gestión programática", en: "", jp: "" },
          content: {
            es: "Crear colección en un loop:\n\n1️⃣ Preparar metadatos para cada NFT\n2️⃣ Calcular Digest SHA-256\n3️⃣ URITokenMint por cada uno\n4️⃣ Esperar confirmación entre cada mint\n\naccount_objects → Listar toda la colección",
            en: "",
            jp: "",
          },
          visual: "⚙️",
        },
        {
          title: { es: "Transferencia y ciclo de vida", en: "", jp: "" },
          content: {
            es: "Flujo de transferencia:\n\n1️⃣ Vendedor → URITokenCreateSellOffer\n2️⃣ Comprador → URITokenBuy\n3️⃣ Propiedad transferida automáticamente\n\nQuemar: URITokenBurn para eliminar\nGratis: Amount 0 + Destination",
            en: "",
            jp: "",
          },
          visual: "🔄",
        },
      ],
    },
  ],
}
