export default {
  id: "m11",
  icon: "🎓",
  title: {
    es: "Proyecto final",
    en: "",
    jp: "",
  },
  lessons: [
    {
      id: "m11l1",
      title: {
        es: "Diseño del proyecto",
        en: "",
        jp: "",
      },
      theory: {
        es: `En este módulo final vamos a construir un **sistema de pagos completo** en Xahau testnet que demuestra todo lo aprendido durante el curso.

### ¿Qué vamos a construir?

Un conjunto de scripts que, ejecutados en orden, demuestran las capacidades fundamentales de Xahau:
1. Crear y financiar wallets
2. Enviar pagos en XAH
3. Emitir tokens personalizados
4. Mintear y transferir NFTs (URITokens)
5. Operar en el DEX

### Arquitectura del proyecto

El proyecto consiste en **5 scripts independientes** que se ejecutan secuencialmente:

\`\`\`
proyecto-final/
├── 01-setup.js      → Crear y financiar dos wallets (A y B)
├── 02-payment.js    → Enviar XAH de A a B
├── 03-token.js      → Emitir token "CURSO" de A a B
├── 04-nft.js        → Mintear URIToken en A, transferir a B
└── 05-dex.js        → Colocar orden en el DEX
\`\`\`

### Flujo del proyecto

1. **01-setup.js**: Crea dos wallets y las financia con el faucet de testnet. Guarda los seeds para los siguientes scripts.

2. **02-payment.js**: Wallet A envía XAH a Wallet B. Verificamos que el balance de B aumentó.

3. **03-token.js**: Wallet A se configura como emisor de tokens. Wallet B crea una trust line. A emite 1000 tokens "CURSO" a B.

4. **04-nft.js**: Wallet A mintea un URIToken. Lo pone a la venta. Wallet B lo compra. Verificamos que B es el nuevo propietario.

5. **05-dex.js**: Wallet B coloca una oferta en el DEX para vender tokens CURSO por XAH. Consultamos el order book.

### Prerequisitos

- Node.js instalado
- Librería \`xahau\` instalada (\`npm install xahau\`)
- Conexión a internet (para conectar con testnet)
- Todo lo aprendido en los módulos 0-10

### Nota importante

Todo el proyecto se ejecuta en **testnet**. Los tokens y NFTs no tienen valor real. Es un entorno seguro para experimentar sin riesgos.`,
        en: "",
        jp: "",
      },
      codeBlocks: [],
      slides: [
        {
          title: {
            es: "Proyecto final: sistema de pagos",
            en: "",
            jp: "",
          },
          content: {
            es: "Vamos a construir un sistema completo que demuestra:\n\n• Creación de wallets\n• Pagos en XAH\n• Emisión de tokens\n• NFTs (URITokens)\n• Trading en el DEX",
            en: "",
            jp: "",
          },
          visual: "🏗️",
        },
        {
          title: {
            es: "Arquitectura: 5 scripts",
            en: "",
            jp: "",
          },
          content: {
            es: "01-setup.js → Crear wallets A y B\n02-payment.js → Enviar XAH\n03-token.js → Emitir token CURSO\n04-nft.js → Mintear y transferir NFT\n05-dex.js → Operar en el DEX\n\nCada script construye sobre el anterior",
            en: "",
            jp: "",
          },
          visual: "📋",
        },
        {
          title: {
            es: "Todo en testnet",
            en: "",
            jp: "",
          },
          content: {
            es: "El proyecto completo se ejecuta en testnet\n\n• Sin riesgo — tokens sin valor real\n• Faucet gratuito para financiar wallets\n• Entorno seguro para experimentar\n• Mismo código que mainnet, distinto servidor",
            en: "",
            jp: "",
          },
          visual: "🧪",
        },
      ],
    },
    {
      id: "m11l2",
      title: {
        es: "Paso 1: Crear y financiar wallets",
        en: "",
        jp: "",
      },
      theory: {
        es: `El primer paso de nuestro proyecto es crear dos wallets y financiarlas con XAH de testnet.

### Crear wallets programáticamente

Usaremos \`Wallet.generate()\` para crear dos wallets nuevas. Cada wallet tiene:
- **Dirección pública** (rXXXXX...): para recibir fondos
- **Seed/secreto** (sEdXXX...): para firmar transacciones

### Financiar con el faucet

El faucet de testnet nos da XAH gratis para probar. La librería \`xahau\` incluye un método \`fundWallet()\` que:
1. Genera o usa una wallet existente
2. Solicita fondos al faucet
3. Espera a que la cuenta se active en el ledger
4. Devuelve la wallet financiada

### Guardar la configuración

Los seeds de las wallets se necesitan en los siguientes scripts. En un proyecto real usarías variables de entorno o un archivo de configuración seguro. Para este ejercicio, simplemente mostramos los seeds en consola para copiarlos.

### Verificar las cuentas

Después de crear y financiar las wallets, verificamos que existen en el ledger consultando su información con \`account_info\`.`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "01-setup.js: Crear y financiar dos wallets",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function setup() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  console.log("Conectado a Xahau Testnet\\n");

  // --- Crear Wallet A ---
  console.log("Creando Wallet A...");
  const walletA = Wallet.generate();
  console.log("Wallet A generada:");
  console.log("  Direccion:", walletA.address);
  console.log("  Seed:", walletA.seed);

  // Financiar Wallet A con el faucet
  console.log("Financiando Wallet A con el faucet...");
  await client.fundWallet(walletA);
  console.log("Wallet A financiada\\n");

  // --- Crear Wallet B ---
  console.log("Creando Wallet B...");
  const walletB = Wallet.generate();
  console.log("Wallet B generada:");
  console.log("  Direccion:", walletB.address);
  console.log("  Seed:", walletB.seed);

  // Financiar Wallet B con el faucet
  console.log("Financiando Wallet B con el faucet...");
  await client.fundWallet(walletB);
  console.log("Wallet B financiada\\n");

  // --- Verificar ambas cuentas ---
  console.log("=== VERIFICACION ===\\n");

  const infoA = await client.request({
    command: "account_info",
    account: walletA.address,
  });
  console.log("Wallet A - Balance:", Number(infoA.result.account_data.Balance) / 1000000, "XAH");

  const infoB = await client.request({
    command: "account_info",
    account: walletB.address,
  });
  console.log("Wallet B - Balance:", Number(infoB.result.account_data.Balance) / 1000000, "XAH");

  // --- Mostrar configuracion para los siguientes scripts ---
  console.log("\\n=== CONFIGURACION (copia para los siguientes scripts) ===\\n");
  console.log("const CONFIG = {");
  console.log('  walletA_seed: "' + walletA.seed + '",');
  console.log('  walletA_address: "' + walletA.address + '",');
  console.log('  walletB_seed: "' + walletB.seed + '",');
  console.log('  walletB_address: "' + walletB.address + '",');
  console.log("};");

  await client.disconnect();
  console.log("\\nDesconectado. Guarda la configuracion para los siguientes pasos.");
}

setup().catch(console.error);`,
        },
      ],
      slides: [
        {
          title: {
            es: "Crear wallets programáticamente",
            en: "",
            jp: "",
          },
          content: {
            es: "Wallet.generate() crea un par de claves:\n\n• Dirección pública (rXXX...) → para recibir\n• Seed/secreto (sEdXXX...) → para firmar\n\nfundWallet() financia con XAH de testnet",
            en: "",
            jp: "",
          },
          visual: "👛",
        },
        {
          title: {
            es: "Verificar y guardar",
            en: "",
            jp: "",
          },
          content: {
            es: "Después de crear las wallets:\n\n1. Verificar con account_info que existen\n2. Comprobar que tienen balance\n3. Guardar los seeds para los siguientes scripts\n4. ¡Nunca compartir seeds en producción!",
            en: "",
            jp: "",
          },
          visual: "✅",
        },
        {
          title: {
            es: "Seguridad al manejar seeds",
            en: "",
            jp: "",
          },
          content: {
            es: "Buenas prácticas con claves privadas:\n\n• Nunca hacer console.log del seed en producción\n• Usar variables de entorno (.env)\n• Nunca subir seeds a repositorios (git)\n• Testnet: puedes ser flexible\n• Mainnet: máxima precaución, fondos reales en riesgo",
            en: "",
            jp: "",
          },
          visual: "🔐",
        },
      ],
    },
    {
      id: "m11l3",
      title: {
        es: "Paso 2: Enviar pagos y emitir tokens",
        en: "",
        jp: "",
      },
      theory: {
        es: `En este paso combinamos dos operaciones fundamentales: enviar un pago en XAH y emitir un token personalizado llamado "CURSO".

### Enviar XAH de Wallet A a Wallet B

Un pago en XAH es la transacción más básica:
1. Creamos una transacción \`Payment\`
2. Especificamos origen, destino y cantidad
3. Firmamos con la wallet de origen
4. Enviamos y esperamos validación
5. Verificamos que el balance de B aumentó

### Configurar Wallet A como emisor de tokens

Para emitir tokens, Wallet A necesita activar el flag **DefaultRipple**:
- \`DefaultRipple\` permite que los tokens emitidos por A puedan ser transferidos entre cuentas
- Se activa con una transacción \`AccountSet\`
- Sin este flag, los tokens quedarían "atrapados" y no podrían circular

### Crear trust line de B hacia A

Antes de recibir tokens, Wallet B debe crear una **trust line** hacia Wallet A:
- La trust line indica que B confía en A como emisor del token "CURSO"
- Especifica un límite máximo de tokens que B acepta
- Se crea con una transacción \`TrustSet\`

### Emitir tokens CURSO

Con la trust line creada, Wallet A puede emitir tokens:
1. A envía un \`Payment\` con el token "CURSO" a B
2. La cantidad se especifica como un objeto con \`currency\`, \`value\` e \`issuer\`
3. Los tokens aparecen en el balance de B

### Verificar el resultado

Al final verificamos:
- El balance de XAH de ambas wallets
- El balance de tokens CURSO de Wallet B
- Que la trust line existe y tiene el límite correcto`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "02-payment.js + 03-token.js: Pagos XAH y emisión de tokens",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

// PEGA AQUI los seeds del script 01-setup.js
const CONFIG = {
  walletA_seed: "sEdXXXXXXXXXXXXX", // <-- tu seed de Wallet A
  walletB_seed: "sEdYYYYYYYYYYYYY", // <-- tu seed de Wallet B
};

async function pagosYTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const walletA = Wallet.fromSeed(CONFIG.walletA_seed, {algorithm: 'secp256k1'});
  const walletB = Wallet.fromSeed(CONFIG.walletB_seed, {algorithm: 'secp256k1'});

  console.log("Wallet A:", walletA.address);
  console.log("Wallet B:", walletB.address);

  // =============================================
  // PASO 1: Enviar 100 XAH de A a B
  // =============================================
  console.log("\\n=== PASO 1: Enviar 100 XAH de A a B ===\\n");

  const payment = {
    TransactionType: "Payment",
    Account: walletA.address,
    Destination: walletB.address,
    Amount: "100000000", // 100 XAH en drops
  };

  const payResult = await client.submitAndWait(payment, { wallet: walletA });
  console.log("Pago XAH:", payResult.result.meta.TransactionResult);

  // Verificar balance de B
  const infoB = await client.request({
    command: "account_info",
    account: walletB.address,
  });
  console.log("Balance de B:", Number(infoB.result.account_data.Balance) / 1000000, "XAH");

  // =============================================
  // PASO 2: Configurar A como emisor (DefaultRipple)
  // =============================================
  console.log("\\n=== PASO 2: Configurar A como emisor de tokens ===\\n");

  const accountSet = {
    TransactionType: "AccountSet",
    Account: walletA.address,
    SetFlag: 8, // asfDefaultRipple
  };

  const setResult = await client.submitAndWait(accountSet, { wallet: walletA });
  console.log("DefaultRipple activado:", setResult.result.meta.TransactionResult);

  // =============================================
  // PASO 3: Crear trust line de B para token CURSO
  // =============================================
  console.log("\\n=== PASO 3: Crear trust line B -> A para CURSO ===\\n");

  const trustSet = {
    TransactionType: "TrustSet",
    Account: walletB.address,
    LimitAmount: {
      currency: "CURSO",
      value: "10000",
      issuer: walletA.address,
    },
  };

  const trustResult = await client.submitAndWait(trustSet, { wallet: walletB });
  console.log("Trust line creada:", trustResult.result.meta.TransactionResult);

  // =============================================
  // PASO 4: Emitir 1000 CURSO de A a B
  // =============================================
  console.log("\\n=== PASO 4: Emitir 1000 CURSO de A a B ===\\n");

  const issueToken = {
    TransactionType: "Payment",
    Account: walletA.address,
    Destination: walletB.address,
    Amount: {
      currency: "CURSO",
      value: "1000",
      issuer: walletA.address,
    },
  };

  const issueResult = await client.submitAndWait(issueToken, { wallet: walletA });
  console.log("Tokens emitidos:", issueResult.result.meta.TransactionResult);

  // =============================================
  // VERIFICACION FINAL
  // =============================================
  console.log("\\n=== VERIFICACION FINAL ===\\n");

  const lines = await client.request({
    command: "account_lines",
    account: walletB.address,
  });

  for (const line of lines.result.lines) {
    if (line.currency === "CURSO") {
      console.log("Token CURSO en Wallet B:");
      console.log("  Balance:", line.balance);
      console.log("  Limite:", line.limit);
      console.log("  Emisor:", line.account);
    }
  }

  await client.disconnect();
  console.log("\\nCompletado. Wallet B tiene XAH y tokens CURSO.");
}

pagosYTokens().catch(console.error);`,
        },
      ],
      slides: [
        {
          title: {
            es: "Pagos y tokens en un solo script",
            en: "",
            jp: "",
          },
          content: {
            es: "Este script combina:\n\n1. Payment de XAH (A → B)\n2. AccountSet: activar DefaultRipple en A\n3. TrustSet: B confía en A para CURSO\n4. Payment de tokens CURSO (A → B)\n\nCada paso construye sobre el anterior",
            en: "",
            jp: "",
          },
          visual: "💸",
        },
        {
          title: {
            es: "Verificar el resultado",
            en: "",
            jp: "",
          },
          content: {
            es: "Después de ejecutar:\n\n• account_info → verificar balance XAH\n• account_lines → verificar tokens CURSO\n• Wallet B tiene 1000 CURSO\n• Trust line con límite de 10000",
            en: "",
            jp: "",
          },
          visual: "🔎",
        },
        {
          title: {
            es: "4 transacciones clave",
            en: "",
            jp: "",
          },
          content: {
            es: "Tipos de transacción usados:\n\n• Payment (XAH) → transferencia nativa\n• AccountSet → activar DefaultRipple en emisor\n• TrustSet → B autoriza recibir token CURSO\n• Payment (token) → A emite CURSO a B\n\nOrden obligatorio: AccountSet → TrustSet → Payment token",
            en: "",
            jp: "",
          },
          visual: "🔗",
        },
      ],
    },
    {
      id: "m11l4",
      title: {
        es: "Paso 3: NFTs y trading",
        en: "",
        jp: "",
      },
      theory: {
        es: `En este paso final del proyecto, combinamos NFTs (URITokens) y el DEX para demostrar las capacidades avanzadas de Xahau.

### Mintear un URIToken

Wallet A va a crear un NFT que representa un "certificado de curso":
- La URI apunta a los metadatos del NFT
- Se marca como \`tfBurnable\` para que el emisor pueda quemarlo si es necesario

### Transferir el URIToken a Wallet B

La transferencia de URITokens en Xahau funciona así:
1. El propietario (A) crea una **oferta de venta** con \`URITokenCreateSellOffer\`
2. Puede especificar un precio (en XAH o tokens) o precio 0 para transferencia gratuita
3. Puede especificar un destinatario específico
4. El comprador (B) acepta con \`URITokenBuy\`
5. La propiedad cambia de A a B

### Operar en el DEX

El DEX (Decentralized Exchange) de Xahau permite intercambiar cualquier par de tokens:
- Wallet B va a crear una oferta para vender tokens CURSO por XAH
- Usamos \`OfferCreate\` para colocar la orden
- Consultamos el \`book_offers\` para ver el order book
- Finalmente, cancelamos la oferta con \`OfferCancel\`

### Verificación final

Al terminar verificamos:
- Que el URIToken ahora pertenece a Wallet B
- Que la oferta del DEX se creó correctamente
- Que pudimos cancelar la oferta limpiamente`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "04-nft.js + 05-dex.js: NFTs y trading en el DEX",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

// PEGA AQUI los seeds del script 01-setup.js
const CONFIG = {
  walletA_seed: "sEdXXXXXXXXXXXXX", // <-- tu seed de Wallet A
  walletB_seed: "sEdYYYYYYYYYYYYY", // <-- tu seed de Wallet B
};

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function nftsYDex() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const walletA = Wallet.fromSeed(CONFIG.walletA_seed, {algorithm: 'secp256k1'});
  const walletB = Wallet.fromSeed(CONFIG.walletB_seed, {algorithm: 'secp256k1'});

  console.log("Wallet A:", walletA.address);
  console.log("Wallet B:", walletB.address);

  // =============================================
  // PASO 1: Mintear un URIToken desde Wallet A
  // =============================================
  console.log("\\n=== PASO 1: Mintear URIToken (NFT) ===\\n");

  const mintTx = {
    TransactionType: "URITokenMint",
    Account: walletA.address,
    URI: toHex("https://xahau-course.example/certificate/final-project.json"),
    Flags: 1, // tfBurnable
  };

  const mintResult = await client.submitAndWait(mintTx, { wallet: walletA });
  console.log("Mint:", mintResult.result.meta.TransactionResult);

  // Obtener el ID del URIToken creado
  const uriTokenID = mintResult.result.meta.AffectedNodes
    .filter(n => n.CreatedNode && n.CreatedNode.LedgerEntryType === "URIToken")
    .map(n => n.CreatedNode.LedgerIndex)[0];
  console.log("URIToken ID:", uriTokenID);

  // =============================================
  // PASO 2: Crear oferta de venta (gratis, solo para B)
  // =============================================
  console.log("\\n=== PASO 2: Crear oferta de venta ===\\n");

  const sellOffer = {
    TransactionType: "URITokenCreateSellOffer",
    Account: walletA.address,
    URITokenID: uriTokenID,
    Amount: "0", // Transferencia gratuita
    Destination: walletB.address, // Solo B puede comprar
  };

  const sellResult = await client.submitAndWait(sellOffer, { wallet: walletA });
  console.log("Oferta de venta:", sellResult.result.meta.TransactionResult);

  // =============================================
  // PASO 3: Wallet B compra el URIToken
  // =============================================
  console.log("\\n=== PASO 3: Wallet B compra el URIToken ===\\n");

  const buyTx = {
    TransactionType: "URITokenBuy",
    Account: walletB.address,
    URITokenID: uriTokenID,
    Amount: "0",
  };

  const buyResult = await client.submitAndWait(buyTx, { wallet: walletB });
  console.log("Compra:", buyResult.result.meta.TransactionResult);

  // Verificar que B es el propietario
  const tokensB = await client.request({
    command: "account_objects",
    account: walletB.address,
    type: "uri_token",
  });

  const owned = tokensB.result.account_objects.find(obj => obj.index === uriTokenID);
  console.log("B es propietario:", owned ? "SI" : "NO");

  // =============================================
  // PASO 4: Crear oferta en el DEX (vender CURSO por XAH)
  // =============================================
  console.log("\\n=== PASO 4: Crear oferta en el DEX ===\\n");

  const offerCreate = {
    TransactionType: "OfferCreate",
    Account: walletB.address,
    TakerPays: "50000000", // Quiero recibir 50 XAH
    TakerGets: {
      currency: "CURSO",
      value: "100",
      issuer: walletA.address,
    }, // Ofrezco 100 CURSO
  };

  const offerResult = await client.submitAndWait(offerCreate, { wallet: walletB });
  console.log("Oferta DEX:", offerResult.result.meta.TransactionResult);

  // Obtener el Sequence de la oferta para poder cancelarla
  const offerSequence = offerResult.result.Sequence;

  // =============================================
  // PASO 5: Consultar el order book
  // =============================================
  console.log("\\n=== PASO 5: Order book CURSO/XAH ===\\n");

  const book = await client.request({
    command: "book_offers",
    taker_pays: { currency: "XAH" },
    taker_gets: {
      currency: "CURSO",
      issuer: walletA.address,
    },
    limit: 10,
  });

  console.log("Ofertas en el order book:", book.result.offers.length);
  for (const offer of book.result.offers) {
    const gets = typeof offer.TakerGets === "string"
      ? Number(offer.TakerGets) / 1000000 + " XAH"
      : offer.TakerGets.value + " " + offer.TakerGets.currency;
    const pays = typeof offer.TakerPays === "string"
      ? Number(offer.TakerPays) / 1000000 + " XAH"
      : offer.TakerPays.value + " " + offer.TakerPays.currency;
    console.log("  Oferta: vende", gets, "por", pays);
  }

  // =============================================
  // PASO 6: Cancelar la oferta (limpiar)
  // =============================================
  console.log("\\n=== PASO 6: Cancelar oferta del DEX ===\\n");

  const offerCancel = {
    TransactionType: "OfferCancel",
    Account: walletB.address,
    OfferSequence: offerSequence,
  };

  const cancelResult = await client.submitAndWait(offerCancel, { wallet: walletB });
  console.log("Oferta cancelada:", cancelResult.result.meta.TransactionResult);

  await client.disconnect();
  console.log("\\nProyecto final completado!");
}

nftsYDex().catch(console.error);`,
        },
      ],
      slides: [
        {
          title: {
            es: "NFTs: mintear y transferir",
            en: "",
            jp: "",
          },
          content: {
            es: "Flujo de URITokens:\n\n1. A mintea el URIToken (URITokenMint)\n2. A crea oferta de venta (URITokenCreateSellOffer)\n3. B compra el URIToken (URITokenBuy)\n4. Verificar: B es el nuevo propietario",
            en: "",
            jp: "",
          },
          visual: "🎨",
        },
        {
          title: {
            es: "DEX: trading descentralizado",
            en: "",
            jp: "",
          },
          content: {
            es: "Operar en el DEX de Xahau:\n\n1. OfferCreate: vender 100 CURSO por 50 XAH\n2. book_offers: consultar el order book\n3. OfferCancel: cancelar la oferta\n\nTodo on-chain, sin intermediarios",
            en: "",
            jp: "",
          },
          visual: "📊",
        },
        {
          title: {
            es: "Flujo completo del DEX",
            en: "",
            jp: "",
          },
          content: {
            es: "Ciclo de vida de una oferta:\n\n• OfferCreate → publicar en el order book\n• book_offers → verificar que aparece\n• OfferCancel → retirar la oferta\n\nLimpiar ofertas importa:\n• Cada oferta abierta = +0.2 XAH de reserva\n• Ofertas huérfanas bloquean fondos innecesariamente",
            en: "",
            jp: "",
          },
          visual: "♻️",
        },
      ],
    },
    {
      id: "m11l5",
      title: {
        es: "Resumen y próximos pasos",
        en: "",
        jp: "",
      },
      theory: {
        es: `Has completado el curso de desarrollo en Xahau. Repasemos todo lo que has aprendido y exploremos los próximos pasos.

### Resumen del curso

A lo largo de 12 módulos has aprendido:

- **Módulo 0 - Setup**: Configurar tu entorno de desarrollo con Node.js y la librería xahau

- **Módulo 1 - Blockchain**: La arquitectura de Xahau, diferencias con blockchains EVM, el XRP Ledger como base

- **Módulo 2 - Consenso**: El protocolo de consenso federado, UNLs, validadores, y cómo se cierran los ledgers

- **Módulo 3 - Wallets**: Crear wallets, pares de claves, family seeds, activación de cuentas y reservas

- **Módulo 4 - Consulta de datos**: Conectar con el ledger, consultar cuentas, transacciones, objetos y suscribirse a eventos

- **Módulo 5 - Pagos**: Enviar pagos en XAH, destination tags, memos, y manejo de errores

- **Módulo 6 - Tokens**: Emitir tokens personalizados, trust lines, DefaultRipple, y gestión de tokens

- **Módulo 7 - NFTs**: URITokens nativos, mintear, transferir y quemar NFTs en Xahau

- **Módulo 8 - Smart Contracts**: Hooks en C, compilación a WebAssembly, despliegue con SetHook, y la API de Hooks

- **Módulo 9 - DEX**: El exchange descentralizado nativo, crear y cancelar ofertas, order books, auto-bridging

- **Módulo 10 - Herramientas**: Xaman wallet, exploradores de bloques, Hooks Builder, y recursos del ecosistema

- **Módulo 11 - Proyecto final**: Sistema completo que integra wallets, pagos, tokens, NFTs y DEX

### Próximos pasos

Ahora que dominas los fundamentos, aquí tienes ideas para seguir aprendiendo:

#### 1. Escribe tu propio Hook en C
Profundiza en los smart contracts de Xahau:
- Aprende la API de Hooks en detalle
- Experimenta con \`state()\` para almacenar datos
- Crea un Hook que implemente lógica de negocio real
- Optimiza el uso de gas (instrucciones WASM)

#### 2. Construye una dApp con Xaman
Crea una aplicación web que:
- Se conecte a Xahau via WebSocket
- Use el SDK de Xaman para firma de transacciones
- Tenga una interfaz de usuario amigable
- Implemente una funcionalidad útil (marketplace, votación, etc.)

#### 3. Participa en la comunidad
- Únete al Discord de Xahau
- Contribuye a discusiones técnicas
- Ayuda a otros desarrolladores que están empezando
- Propón mejoras al protocolo

#### 4. Contribuye a proyectos open source
- Revisa los repositorios de Xahau en GitHub
- Reporta bugs o sugiere mejoras
- Contribuye código a las librerías del ecosistema
- Crea herramientas que ayuden a otros desarrolladores

#### 5. Explora mainnet (con precaución)
Cuando estés listo para mainnet:
- Recuerda que las transacciones tienen valor real
- Empieza con cantidades pequeñas
- Verifica todo en testnet antes de ir a mainnet
- Asegura tus claves privadas con máxima seguridad

### Felicitaciones

Has recorrido un largo camino desde configurar Node.js hasta construir un sistema de pagos completo en Xahau. Tienes las herramientas y conocimientos para construir aplicaciones reales en esta blockchain.

**Xahau es una blockchain joven y en crecimiento** — hay enormes oportunidades para desarrolladores que entienden su tecnología. Lo que has aprendido aquí te da una base sólida para ser parte de ese futuro.

¡Bienvenido al ecosistema Xahau!`,
        en: "",
        jp: "",
      },
      codeBlocks: [],
      slides: [
        {
          title: {
            es: "Lo que has aprendido",
            en: "",
            jp: "",
          },
          content: {
            es: "12 módulos completados:\n\n• Setup, Blockchain, Consenso\n• Wallets, Consultas, Pagos\n• Tokens, NFTs, Smart Contracts\n• DEX, Herramientas, Proyecto Final\n\nDe cero a desarrollador Xahau",
            en: "",
            jp: "",
          },
          visual: "📚",
        },
        {
          title: {
            es: "Próximos pasos",
            en: "",
            jp: "",
          },
          content: {
            es: "Sigue creciendo como desarrollador:\n\n• Escribe Hooks en C más complejos\n• Construye una dApp con Xaman SDK\n• Participa en la comunidad (Discord, GitHub)\n• Contribuye a proyectos open source\n• Explora mainnet cuando estés listo",
            en: "",
            jp: "",
          },
          visual: "🚀",
        },
        {
          title: {
            es: "¡Felicitaciones!",
            en: "",
            jp: "",
          },
          content: {
            es: "Has completado el curso de Xahau Academy\n\n• Tienes las herramientas para construir en Xahau\n• El ecosistema está creciendo y necesita desarrolladores\n• Lo que aprendiste es una base sólida\n\n¡Bienvenido al ecosistema Xahau!",
            en: "",
            jp: "",
          },
          visual: "🎓",
        },
      ],
    },
  ],
}
