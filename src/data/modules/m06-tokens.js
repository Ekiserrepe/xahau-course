export default {
  id: "m6",
  icon: "🪙",
  title: {
    es: "Creación y gestión de tokens propios",
    en: "",
    jp: "",
  },
  lessons: [
    {
      id: "m6l1",
      title: {
        es: "TrustLines y el modelo de tokens en Xahau",
        en: "",
        jp: "",
      },
      theory: {
        es: `En Xahau (y XRPL), los tokens fungibles funcionan de manera diferente a ERC-20 en Ethereum. No necesitas desplegar un smart contract para crear un token. En su lugar, se usa un sistema basado en **TrustLines** (líneas de confianza).

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

Cada TrustLine consume una **reserva de propietario** (owner reserve) de la cuenta. Esto significa que necesitas tener XAH adicional bloqueado por cada TrustLine que crees.`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear una TrustLine hacia un emisor de tokens",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function createTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Wallet del receptor (quien quiere recibir el token)
  const receiver = Wallet.fromSeed("sEdVxxxTuSeedReceptor", {algorithm: 'secp256k1'});

  // Crear TrustLine: "confío en el emisor para hasta 1,000,000 USD"
  const trustSet = {
    TransactionType: "TrustSet",
    Account: receiver.address,
    LimitAmount: {
      currency: "USD",
      issuer: "rDireccionDelEmisor",
      value: "1000000", // Límite máximo que acepto
    },
  };

  const prepared = await client.autofill(trustSet);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡TrustLine creada con éxito!");
    console.log("Ahora puedes recibir USD del emisor");
  }

  await client.disconnect();
}

createTrustLine();`,
        },
        {
          title: {
            es: "Emitir (enviar) tokens a una cuenta con TrustLine",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function issueTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Wallet del emisor del token
  const issuer = Wallet.fromSeed("sEdVxxxSeedDelEmisor", {algorithm: 'secp256k1'});

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
    console.log("¡100 USD emitidos con éxito!");
  }

  await client.disconnect();
}

issueTokens();`,
        },
      ],
      slides: [
        {
          title: { es: "Modelo de tokens en Xahau", en: "", jp: "" },
          content: {
            es: "No necesitas smart contracts para crear tokens\n\n1️⃣ Emisor: Cualquier cuenta\n2️⃣ TrustLine: El receptor opta-in\n3️⃣ Payment: Transferencia nativa\n\nTokens = currency + issuer",
            en: "",
            jp: "",
          },
          visual: "🪙",
        },
        {
          title: { es: "TrustLine = Opt-in", en: "", jp: "" },
          content: {
            es: "El receptor ELIGE recibir un token\n\n• Crea una TrustLine hacia el emisor\n• Define el límite máximo\n• Consume reserva de propietario\n• Protege contra spam de tokens",
            en: "",
            jp: "",
          },
          visual: "🤝",
        },
        {
          title: { es: "Sistema de reservas", en: "", jp: "" },
          content: {
            es: "Cada TrustLine aumenta la reserva de la cuenta\n\n• Reserva base + reserva por objeto\n• Más TrustLines = más XAH bloqueado\n• Los usuarios deben planificar sus TrustLines\n• Eliminar TrustLine (balance 0) libera reserva\n• Impacto directo en el XAH disponible",
            en: "",
            jp: "",
          },
          visual: "💎",
        },
      ],
    },
    {
      id: "m6l2",
      title: {
        es: "Gestión avanzada de tokens",
        en: "",
        jp: "",
      },
      theory: {
        es: `Una vez creado tu token, puedes gestionar diversos aspectos: consultar balances, configurar la cuenta emisora y transferir tokens entre usuarios.

### Consultar TrustLines y balances

El comando \`account_lines\` devuelve todas las TrustLines de una cuenta, mostrando cada token que posee o ha emitido, con su balance actual.

### Configuración del emisor

La cuenta emisora puede configurar flags importantes:

- **DefaultRipple**: Permite que los tokens se transfieran entre terceros sin pasar por el emisor. **Es necesario activarlo** si quieres que tus tokens sean libremente transferibles
- **RequireAuth**: Requiere que el emisor autorice cada TrustLine antes de que alguien pueda recibir tokens
- **DisallowXRP**: Señala que la cuenta no quiere recibir XAH (es solo una señal, no lo bloquea técnicamente)

### Transferencia entre terceros (Rippling)

Sin el flag **DefaultRipple**, los tokens solo se pueden transferir de vuelta al emisor. Con él activado, los tokens pueden "ripplear" — es decir, transferirse entre cuentas que tienen TrustLine con el mismo emisor.

### Códigos de moneda especiales

Para nombres de token de más de 3 caracteres, se usa un código hexadecimal de 40 caracteres:
- Formato: el nombre convertido a hex, rellenado con ceros
- Ejemplo: "XAHAU" → hex → relleno a 40 chars`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar los tokens (TrustLines) de una cuenta",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client } = require("xahau");

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
    console.log(\`\\nToken: \${line.currency}\`);
    console.log(\`  Emisor: \${line.account}\`);
    console.log(\`  Balance: \${line.balance}\`);
    console.log(\`  Límite: \${line.limit}\`);
  }

  await client.disconnect();
}

getTokenBalances("rTuDireccionAqui");`,
        },
        {
          title: {
            es: "Configurar cuenta emisora con DefaultRipple",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function configureIssuer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed("sEdVxxxSeedDelEmisor", {algorithm: 'secp256k1'});

  // Activar DefaultRipple para que los tokens
  // se puedan transferir entre terceros
  const accountSet = {
    TransactionType: "AccountSet",
    Account: issuer.address,
    SetFlag: 8, // asfDefaultRipple
  };

  const prepared = await client.autofill(accountSet);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡DefaultRipple activado!");
    console.log("Tus tokens ahora son libremente transferibles");
  }

  await client.disconnect();
}

configureIssuer();`,
        },
      ],
      slides: [
        {
          title: { es: "Consultar tokens", en: "", jp: "" },
          content: {
            es: "account_lines → TrustLines de una cuenta\n\n• currency → Código del token\n• account → Emisor\n• balance → Balance actual\n• limit → Límite de confianza",
            en: "",
            jp: "",
          },
          visual: "📊",
        },
        {
          title: { es: "DefaultRipple", en: "", jp: "" },
          content: {
            es: "Flag esencial para emisores de tokens\n\n• Sin DefaultRipple → Solo ida y vuelta al emisor\n• Con DefaultRipple → Transferible entre terceros\n\nActívalo ANTES de emitir tokens",
            en: "",
            jp: "",
          },
          visual: "🔀",
        },
        {
          title: { es: "Flags importantes para emisores", en: "", jp: "" },
          content: {
            es: "RequireAuth (asfRequireAuth):\n• El emisor autoriza cada TrustLine\n• Ideal para tokens con KYC\n\nDefaultRipple (asfDefaultRipple):\n• Permite transferencia entre terceros\n\nConfigurar ANTES de emitir tokens\nUsar AccountSet con SetFlag/ClearFlag",
            en: "",
            jp: "",
          },
          visual: "🚩",
        },
      ],
    },
    {
      id: "m6l3",
      title: {
        es: "Trading en el DEX nativo",
        en: "",
        jp: "",
      },
      theory: {
        es: `Xahau incluye un **exchange descentralizado (DEX) nativo** directamente en el protocolo. No necesitas smart contracts ni plataformas externas para intercambiar tokens — todo se hace con transacciones nativas.

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

Cuando una nueva orden coincide con una existente (el precio se cruza), se ejecuta automáticamente — total o parcialmente.

### Flags especiales de OfferCreate

- **tfImmediateOrCancel**: La orden se ejecuta inmediatamente contra las órdenes existentes. Lo que no se llene se cancela al instante. No queda nada en el libro de órdenes
- **tfPassive**: La orden solo se ejecuta contra órdenes existentes que tengan un precio igual o mejor. No se coloca en el libro si no hay match inmediato

### Consultar el libro de órdenes: book_offers

El comando \`book_offers\` permite ver las órdenes abiertas para un par de tokens. Devuelve las mejores ofertas ordenadas por precio.

### Auto-bridging a través de XAH

El DEX de Xahau puede enrutar operaciones multi-salto automáticamente a través de XAH. Si quieres intercambiar USD por EUR y no hay ofertas directas USD/EUR, el DEX puede:
1. Vender USD por XAH
2. Comprar EUR con XAH

Todo en una sola transacción, de forma transparente. Esto mejora la liquidez del DEX significativamente.`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar el libro de órdenes de un par de tokens (USD/XAH)",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client } = require("xahau");

async function viewOrderBook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuerAddress = "rDireccionDelEmisorUSD";

  // Consultar ofertas: ¿quién vende USD a cambio de XAH?
  const response = await client.request({
    command: "book_offers",
    taker_pays: {
      currency: "XAH",
    },
    taker_gets: {
      currency: "USD",
      issuer: issuerAddress,
    },
    limit: 10,
  });

  console.log("=== Libro de órdenes: USD → XAH ===");
  console.log(\`Ofertas encontradas: \${response.result.offers.length}\\n\`);

  for (const offer of response.result.offers) {
    const getsUSD = offer.TakerGets.value || offer.TakerGets;
    const paysXAH =
      typeof offer.TakerPays === "string"
        ? Number(offer.TakerPays) / 1_000_000
        : offer.TakerPays.value;

    console.log(\`Cuenta: \${offer.Account}\`);
    console.log(\`  Vende: \${getsUSD} USD\`);
    console.log(\`  Pide:  \${paysXAH} XAH\`);
    console.log(\`  Sequence: \${offer.Sequence}\\n\`);
  }

  await client.disconnect();
}

viewOrderBook();`,
        },
        {
          title: {
            es: "Crear una oferta en el DEX (vender 100 USD por XAH)",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet, xahToDrops } = require("xahau");

async function createOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});
  const issuerAddress = "rDireccionDelEmisorUSD";

  // Vender 100 USD a cambio de 500 XAH
  const offer = {
    TransactionType: "OfferCreate",
    Account: trader.address,
    // Lo que quiero recibir: 500 XAH
    TakerPays: xahToDrops(500),
    // Lo que estoy dispuesto a dar: 100 USD
    TakerGets: {
      currency: "USD",
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
    console.log(\`Vendiendo 100 USD por 500 XAH (5 XAH/USD)\`);
    console.log(\`Sequence de la oferta: \${prepared.Sequence}\`);
  }

  await client.disconnect();
}

createOffer();`,
        },
        {
          title: {
            es: "Cancelar una oferta existente en el DEX",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function cancelOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const trader = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

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
  }

  await client.disconnect();
}

cancelOffer();`,
        },
      ],
      slides: [
        {
          title: { es: "DEX nativo de Xahau", en: "", jp: "" },
          content: {
            es: "Exchange descentralizado integrado en el protocolo\n\n• Sin smart contracts\n• Sin plataformas externas\n• Liquidación atómica\n• Auto-bridging a través de XAH\n\nTodo con transacciones nativas",
            en: "",
            jp: "",
          },
          visual: "📈",
        },
        {
          title: { es: "OfferCreate: anatomía de una orden", en: "", jp: "" },
          content: {
            es: "TakerPays → Lo que quieres RECIBIR\nTakerGets → Lo que estás dispuesto a DAR\n\nFlags especiales:\n• tfImmediateOrCancel → Ejecutar o cancelar\n• tfPassive → Solo match existente\n\nOfferCancel → Cancelar orden abierta",
            en: "",
            jp: "",
          },
          visual: "🔄",
        },
        {
          title: { es: "Auto-bridging y order book", en: "", jp: "" },
          content: {
            es: "El DEX enruta trades multi-salto vía XAH\n\nEjemplo: USD → XAH → EUR\n\n• book_offers → Ver el libro de órdenes\n• Bids y Asks se cruzan automáticamente\n• Ejecución parcial o total\n• Liquidez compartida entre pares",
            en: "",
            jp: "",
          },
          visual: "🌐",
        },
      ],
    },
    {
      id: "m6l4",
      title: {
        es: "Control avanzado de tokens: Freeze y Clawback",
        en: "",
        jp: "",
      },
      theory: {
        es: `Xahau ofrece a los emisores de tokens herramientas avanzadas de control: **Freeze** (congelación), **Clawback** (recuperación forzada), **Transfer fees** (comisiones de transferencia) y **Authorized TrustLines** (líneas de confianza autorizadas).

### Freeze: congelar líneas de confianza

El emisor de un token puede congelar TrustLines para impedir que los holders transfieran sus tokens. Hay tres niveles:

#### Freeze individual
Congela una TrustLine específica entre el emisor y un holder. Se hace con \`TrustSet\` usando el flag \`tfSetFreeze\`. El holder no podrá enviar ni recibir ese token mientras esté congelado. Para descongelar, se usa \`tfClearFreeze\`.

#### Global Freeze
Congela **todas** las TrustLines de tu token emitido. Se activa con \`AccountSet\` usando \`SetFlag: 7\` (asfGlobalFreeze). Todos los holders quedan congelados simultáneamente. Se puede desactivar con \`ClearFlag: 7\`.

#### NoFreeze (irreversible)
Al activar \`SetFlag: 6\` (asfNoFreeze) en \`AccountSet\`, el emisor renuncia **permanentemente** a la capacidad de congelar. Esto no se puede deshacer. Es una señal de confianza para los holders.

### Casos de uso para Freeze
- **Cumplimiento regulatorio**: Congelar fondos ante una orden judicial
- **Brechas de seguridad**: Detener transferencias si una cuenta es comprometida
- **Resolución de disputas**: Congelar temporalmente mientras se investiga

### Clawback: recuperar tokens de holders

El **Clawback** permite al emisor reclamar tokens de vuelta desde cualquier holder. Es una herramienta poderosa que debe configurarse **antes** de emitir tokens:

1. Activar \`asfAllowTrustLineClawback\` (flag 16) con \`AccountSet\` **antes** de crear cualquier TrustLine
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
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Congelar la TrustLine de un usuario específico",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function freezeTrustLine() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed("sEdVxxxSeedDelEmisor", {algorithm: 'secp256k1'});
  const holderAddress = "rDireccionDelHolder";

  // Congelar la TrustLine de USD con este holder
  const trustSet = {
    TransactionType: "TrustSet",
    Account: issuer.address,
    LimitAmount: {
      currency: "USD",
      issuer: holderAddress,
      value: "0", // No importa el valor para freeze
    },
    Flags: 0x00100000, // tfSetFreeze
  };

  const prepared = await client.autofill(trustSet);
  const signed = issuer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log(\`TrustLine de USD congelada para \${holderAddress}\`);
    console.log("El holder no puede enviar ni recibir este token");
  }

  // Para descongelar, usar flag tfClearFreeze (0x00200000)
  // const unfreeze = { ...trustSet, Flags: 0x00200000 };

  await client.disconnect();
}

freezeTrustLine();`,
        },
        {
          title: {
            es: "Activar Clawback y recuperar tokens de un holder",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function enableClawbackAndReclaim() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed("sEdVxxxSeedDelEmisor", {algorithm: 'secp256k1'});

  // PASO 1: Activar clawback (ANTES de emitir tokens)
  const enableClawback = {
    TransactionType: "AccountSet",
    Account: issuer.address,
    SetFlag: 16, // asfAllowTrustLineClawback
  };

  const prep1 = await client.autofill(enableClawback);
  const signed1 = issuer.sign(prep1);
  const result1 = await client.submitAndWait(signed1.tx_blob);

  console.log("Activar Clawback:", result1.result.meta.TransactionResult);

  if (result1.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error: ¿Ya tienes TrustLines creadas?");
    console.log("Clawback solo se puede activar ANTES de emitir tokens.");
    await client.disconnect();
    return;
  }

  // PASO 2: Recuperar 50 USD de un holder
  const clawback = {
    TransactionType: "Clawback",
    Account: issuer.address,
    Amount: {
      currency: "USD",
      issuer: "rDireccionDelHolder", // De quién reclamar
      value: "50", // Cantidad a recuperar
    },
  };

  const prep2 = await client.autofill(clawback);
  const signed2 = issuer.sign(prep2);
  const result2 = await client.submitAndWait(signed2.tx_blob);

  console.log("Clawback:", result2.result.meta.TransactionResult);

  if (result2.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡50 USD recuperados del holder!");
  }

  await client.disconnect();
}

enableClawbackAndReclaim();`,
        },
      ],
      slides: [
        {
          title: { es: "Freeze: congelación de tokens", en: "", jp: "" },
          content: {
            es: "El emisor puede congelar transferencias\n\n• Individual Freeze → Una TrustLine específica\n• Global Freeze → TODAS las TrustLines\n• NoFreeze → Renunciar permanentemente\n\nCasos: regulación, seguridad, disputas",
            en: "",
            jp: "",
          },
          visual: "🧊",
        },
        {
          title: { es: "Clawback: recuperación forzada", en: "", jp: "" },
          content: {
            es: "Reclamar tokens de cualquier holder\n\n1️⃣ Activar asfAllowTrustLineClawback\n2️⃣ Usar transacción Clawback\n\n⚠️ Debe activarse ANTES de emitir tokens\n⚠️ Incompatible con NoFreeze",
            en: "",
            jp: "",
          },
          visual: "🔙",
        },
        {
          title: { es: "Transfer fees y RequireAuth", en: "", jp: "" },
          content: {
            es: "Transfer fees:\n• TransferRate en AccountSet\n• Porcentaje en cada transferencia entre terceros\n• Ejemplo: 0.1% → 1001000000\n\nRequireAuth:\n• El emisor autoriza cada TrustLine\n• Ideal para tokens con KYC",
            en: "",
            jp: "",
          },
          visual: "🔐",
        },
      ],
    },
  ],
}
