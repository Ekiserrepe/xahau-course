export default {
  id: "m9",
  icon: "📊",
  title: {
    es: "El DEX nativo de Xahau",
    en: "",
    jp: "",
  },
  lessons: [
    {
      id: "m9l1",
      title: {
        es: "¿Qué es un DEX y cómo funciona en Xahau?",
        en: "",
        jp: "",
      },
      theory: {
        es: `Un **DEX** (Decentralized Exchange) es un exchange descentralizado que permite intercambiar tokens sin intermediarios. Lo que hace especial al DEX de Xahau es que está **integrado directamente en el protocolo** — no necesitas smart contracts para operar.

### DEX nativo vs DEX basado en contratos

| Característica | DEX EVM (Uniswap, etc.) | DEX Xahau |
|---|---|---|
| Implementación | Smart contract | Nativo del protocolo |
| Modelo | AMM (Automated Market Maker) | Order Book (libro de órdenes) |
| Despliegue | Necesitas desplegar contratos | Ya existe en cada cuenta |
| Fees de swap | Fee del protocolo + fee del contrato | Solo fee de transacción estándar |
| Liquidez | Pools de liquidez | Órdenes individuales |

### Modelo de libro de órdenes (Order Book)

A diferencia de los AMM populares en Ethereum, Xahau usa un **modelo de libro de órdenes**:

- Los **makers** colocan órdenes en el libro (ofertas de compra o venta)
- Los **takers** llenan esas órdenes al operar contra ellas
- Las órdenes se emparejan automáticamente por el protocolo cuando los precios coinciden

### Pares de divisas

En el DEX de Xahau puedes operar:
- **Token contra XAH** (ej: USD/XAH, EUR/XAH)
- **Token contra token** (ej: USD/EUR)
- Cualquier token emitido en Xahau puede ser intercambiado

### Auto-bridging

Cuando no hay liquidez directa entre dos tokens, Xahau usa **auto-bridging**:
- El protocolo enruta automáticamente a través de XAH como intermediario
- Ejemplo: Si quieres vender EUR por USD pero no hay ofertas directas, el DEX busca EUR→XAH y luego XAH→USD
- Esto sucede automáticamente — no necesitas hacer nada especial

### Fees

El DEX de Xahau es extremadamente eficiente en costos:
- Solo pagas el **fee de transacción estándar** (fracciones de XAH)
- No hay fees de swap adicionales como en Uniswap (0.3%)
- No hay fees de proveedor de liquidez
- Esto hace que el trading sea mucho más barato que en DEXs basados en contratos`,
        en: "",
        jp: "",
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "¿Qué es el DEX de Xahau?", en: "", jp: "" },
          content: {
            es: "Exchange descentralizado nativo del protocolo\n\n• No necesita smart contracts\n• Modelo de libro de órdenes (Order Book)\n• Cualquier token puede ser intercambiado\n• Solo fee de transacción estándar",
            en: "",
            jp: "",
          },
          visual: "📊",
        },
        {
          title: { es: "Order Book vs AMM", en: "", jp: "" },
          content: {
            es: "Xahau: Order Book\n• Makers colocan órdenes\n• Takers llenan órdenes\n• Emparejamiento automático\n\nEVM (Uniswap): AMM\n• Pools de liquidez\n• Fórmula matemática (x*y=k)\n• Fees de swap del 0.3%+",
            en: "",
            jp: "",
          },
          visual: "📖",
        },
        {
          title: { es: "Auto-bridging", en: "", jp: "" },
          content: {
            es: "Xahau enruta automáticamente a través de XAH\n\n• EUR → XAH → USD (automático)\n• Aumenta la liquidez efectiva\n• No requiere acción del usuario\n• El protocolo busca la mejor ruta",
            en: "",
            jp: "",
          },
          visual: "🌉",
        },
      ],
    },
    {
      id: "m9l2",
      title: {
        es: "Consultar el libro de órdenes",
        en: "",
        jp: "",
      },
      theory: {
        es: `Antes de operar en el DEX, necesitas poder **consultar el libro de órdenes** para ver qué ofertas existen y a qué precios.

### El comando book_offers

El comando \`book_offers\` te permite consultar las órdenes disponibles para un par de divisas:

- **taker_pays**: lo que el taker paga (lo que tú ofreces)
- **taker_gets**: lo que el taker recibe (lo que tú quieres)

Si quieres **comprar USD con XAH**, entonces:
- \`taker_pays\` = XAH (lo que ofreces)
- \`taker_gets\` = USD (lo que quieres)

### Bids y Asks

El libro de órdenes tiene dos lados:
- **Bids (ofertas de compra)**: personas que quieren comprar el token base
- **Asks (ofertas de venta)**: personas que quieren vender el token base

### Estructura de una oferta

Cada oferta en el libro tiene:
- **TakerPays**: lo que el creador de la oferta quiere recibir
- **TakerGets**: lo que el creador ofrece dar
- **quality**: la relación TakerPays/TakerGets (el precio)
- **Account**: la cuenta que creó la oferta
- **Sequence**: número de secuencia de la oferta (su identificador)

### Calcular el precio

El precio efectivo de una oferta se calcula como:

\`\`\`
precio = TakerPays / TakerGets
\`\`\`

Para tokens con decimales, necesitas tener en cuenta que XAH se expresa en **drops** (1 XAH = 1,000,000 drops) y los tokens IOU tienen su propia precisión.

### Top of Book

La **mejor oferta** (top of book) es:
- Para compras: la oferta con el **precio más bajo** (comprar barato)
- Para ventas: la oferta con el **precio más alto** (vender caro)

Las ofertas se devuelven ordenadas por calidad (precio), así que la primera oferta es siempre la mejor disponible.`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar el libro de órdenes para un par token/XAH",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client } = require("xahau");

async function getOrderBook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Consultar ofertas: comprar USD (del emisor rIssuer...)
  // pagando con XAH
  const response = await client.request({
    command: "book_offers",
    taker_pays: {
      currency: "XAH",
    },
    taker_gets: {
      currency: "USD",
      issuer: "rIssuerAddressHere",
    },
    limit: 10,
    ledger_index: "validated",
  });

  const offers = response.result.offers;
  console.log("=== Libro de órdenes: USD/XAH ===");
  console.log("Ofertas disponibles:", offers.length);
  console.log();

  for (const offer of offers) {
    // TakerPays = XAH (en drops)
    const paysDrops = typeof offer.TakerPays === "string"
      ? Number(offer.TakerPays)
      : Number(offer.TakerPays.value);

    // TakerGets = USD
    const getsValue = typeof offer.TakerGets === "string"
      ? Number(offer.TakerGets) / 1000000
      : Number(offer.TakerGets.value);

    const paysXAH = paysDrops / 1000000;
    const price = paysXAH / getsValue;

    console.log("Cuenta:", offer.Account);
    console.log("  Ofrece:", getsValue, "USD");
    console.log("  Pide:", paysXAH, "XAH");
    console.log("  Precio:", price.toFixed(4), "XAH por USD");
    console.log();
  }

  await client.disconnect();
}

getOrderBook();`,
        },
        {
          title: {
            es: "Top 5 mejores ofertas de compra y venta",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client } = require("xahau");

async function showTopOfBook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = "rIssuerAddressHere";
  const currency = "USD";

  // Lado de compra: ofertas que venden USD por XAH
  // (taker paga XAH, recibe USD)
  const buyBook = await client.request({
    command: "book_offers",
    taker_pays: { currency: "XAH" },
    taker_gets: { currency, issuer },
    limit: 5,
    ledger_index: "validated",
  });

  // Lado de venta: ofertas que compran USD con XAH
  // (taker paga USD, recibe XAH)
  const sellBook = await client.request({
    command: "book_offers",
    taker_pays: { currency, issuer },
    taker_gets: { currency: "XAH" },
    limit: 5,
    ledger_index: "validated",
  });

  // Función para calcular precio
  function calcPrice(pays, gets) {
    const paysVal = typeof pays === "string"
      ? Number(pays) / 1000000
      : Number(pays.value);
    const getsVal = typeof gets === "string"
      ? Number(gets) / 1000000
      : Number(gets.value);
    return { paysVal, getsVal };
  }

  console.log("=== TOP 5 OFERTAS DE COMPRA (Buy USD) ===");
  for (let i = 0; i < buyBook.result.offers.length; i++) {
    const o = buyBook.result.offers[i];
    const { paysVal, getsVal } = calcPrice(o.TakerPays, o.TakerGets);
    console.log(
      \`  #\${i + 1} | \${getsVal.toFixed(2)} USD a \${(paysVal / getsVal).toFixed(4)} XAH/USD\`
    );
  }

  console.log();
  console.log("=== TOP 5 OFERTAS DE VENTA (Sell USD) ===");
  for (let i = 0; i < sellBook.result.offers.length; i++) {
    const o = sellBook.result.offers[i];
    const { paysVal, getsVal } = calcPrice(o.TakerPays, o.TakerGets);
    console.log(
      \`  #\${i + 1} | \${paysVal.toFixed(2)} USD a \${(getsVal / paysVal).toFixed(4)} XAH/USD\`
    );
  }

  const bestBuy = buyBook.result.offers[0];
  const bestSell = sellBook.result.offers[0];

  if (bestBuy && bestSell) {
    const buy = calcPrice(bestBuy.TakerPays, bestBuy.TakerGets);
    const sell = calcPrice(bestSell.TakerPays, bestSell.TakerGets);
    const buyPrice = buy.paysVal / buy.getsVal;
    const sellPrice = sell.getsVal / sell.paysVal;
    const spread = ((buyPrice - sellPrice) / sellPrice * 100).toFixed(2);
    console.log(\`\\nSpread: \${spread}%\`);
  }

  await client.disconnect();
}

showTopOfBook();`,
        },
      ],
      slides: [
        {
          title: { es: "Consultar el libro de órdenes", en: "", jp: "" },
          content: {
            es: "Comando: book_offers\n\n• taker_pays → Lo que ofreces\n• taker_gets → Lo que quieres\n• Resultado: lista de ofertas ordenadas por precio\n• La primera oferta = mejor precio",
            en: "",
            jp: "",
          },
          visual: "🔍",
        },
        {
          title: { es: "Anatomía de una oferta", en: "", jp: "" },
          content: {
            es: "Cada oferta contiene:\n\n• TakerPays → Lo que el maker quiere recibir\n• TakerGets → Lo que el maker ofrece\n• quality → Precio (TakerPays / TakerGets)\n• Account → Creador de la oferta\n• Sequence → Identificador de la oferta",
            en: "",
            jp: "",
          },
          visual: "📄",
        },
        {
          title: { es: "Precio, top of book y spread", en: "", jp: "" },
          content: {
            es: "Calcular el precio:\n• precio = TakerPays / TakerGets\n• XAH en drops (1 XAH = 1,000,000 drops)\n\nTop of book:\n• Primera oferta = mejor precio disponible\n• Compra: precio más bajo\n• Venta: precio más alto\n\nBid/Ask spread = diferencia entre mejor compra y mejor venta",
            en: "",
            jp: "",
          },
          visual: "💹",
        },
      ],
    },
    {
      id: "m9l3",
      title: {
        es: "Crear y gestionar ofertas",
        en: "",
        jp: "",
      },
      theory: {
        es: `Para operar en el DEX de Xahau, creas ofertas usando la transacción **OfferCreate**. Estas ofertas se publican en el libro de órdenes y pueden ser llenadas por otros participantes.

### OfferCreate — Crear una oferta

La transacción \`OfferCreate\` tiene dos campos principales:

- **TakerPays**: lo que quieres recibir (tu lado de compra)
- **TakerGets**: lo que ofreces dar (tu lado de venta)

Si quieres **comprar 100 USD pagando con XAH a un precio de 2 XAH por USD**:
- \`TakerPays\` = 100 USD (lo que quieres)
- \`TakerGets\` = 200 XAH (lo que ofreces)

### Matching automático

Cuando creas una oferta, el protocolo busca automáticamente ofertas existentes que coincidan:
- Si hay ofertas al precio que pides (o mejor), tu oferta se **llena inmediatamente**
- Si no hay coincidencias, tu oferta queda en el libro esperando
- Las ofertas pueden llenarse **parcialmente**: si pides 100 USD pero solo hay 50 disponibles, recibes 50 y el resto queda como oferta abierta

### Flags importantes

| Flag | Efecto |
|---|---|
| **tfImmediateOrCancel** | Si no se llena inmediatamente (total o parcial), se cancela el resto |
| **tfFillOrKill** | Si no se puede llenar completamente de inmediato, se cancela toda la oferta |
| **tfPassive** | No consume ofertas existentes; solo se publica en el libro |
| **tfSell** | Trata TakerGets como la cantidad exacta a vender (el resto puede variar) |

### OfferCancel — Cancelar una oferta

Para cancelar una oferta abierta, usas \`OfferCancel\` con el \`OfferSequence\` (número de secuencia) de la oferta que quieres cancelar.

### Consultar tus ofertas abiertas

Usa el comando \`account_offers\` para ver todas las ofertas abiertas de una cuenta.

### Expiración automática

Puedes agregar un campo **Expiration** a tu oferta con un timestamp. Cuando el ledger supere ese tiempo, la oferta se elimina automáticamente. El timestamp es en formato "Ripple epoch" (segundos desde el 1 de enero del 2000).`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear una oferta de compra (comprar USD con XAH)",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function createBuyOffer() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

  // Crear oferta: comprar 50 USD a 2 XAH por USD
  // TakerPays = lo que quiero (50 USD)
  // TakerGets = lo que ofrezco (100 XAH = 100000000 drops)
  const offerCreate = {
    TransactionType: "OfferCreate",
    Account: wallet.address,
    TakerPays: {
      currency: "USD",
      issuer: "rIssuerAddressHere",
      value: "50",
    },
    TakerGets: "100000000", // 100 XAH en drops
  };

  const prepared = await client.autofill(offerCreate);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    // Verificar si la oferta se llenó o quedó abierta
    const affectedNodes = result.result.meta.AffectedNodes;
    const createdOffer = affectedNodes.find(
      (n) => n.CreatedNode && n.CreatedNode.LedgerEntryType === "Offer"
    );

    if (createdOffer) {
      console.log("Oferta publicada en el libro de órdenes.");
      console.log("Sequence:", result.result.Sequence);
    } else {
      console.log("¡Oferta llenada inmediatamente!");
    }
  }

  await client.disconnect();
}

createBuyOffer();`,
        },
        {
          title: {
            es: "Listar todas las ofertas abiertas de tu cuenta",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client } = require("xahau");

async function listMyOffers(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_offers",
    account: address,
    ledger_index: "validated",
  });

  const offers = response.result.offers;
  console.log(\`=== Ofertas abiertas de \${address} ===\`);
  console.log(\`Total: \${offers.length}\\n\`);

  for (const offer of offers) {
    // Parsear TakerPays
    let paysStr;
    if (typeof offer.taker_pays === "string") {
      paysStr = (Number(offer.taker_pays) / 1000000).toFixed(2) + " XAH";
    } else {
      paysStr = offer.taker_pays.value + " " + offer.taker_pays.currency;
    }

    // Parsear TakerGets
    let getsStr;
    if (typeof offer.taker_gets === "string") {
      getsStr = (Number(offer.taker_gets) / 1000000).toFixed(2) + " XAH";
    } else {
      getsStr = offer.taker_gets.value + " " + offer.taker_gets.currency;
    }

    console.log(\`Oferta #\${offer.seq}:\`);
    console.log(\`  Quiero: \${paysStr}\`);
    console.log(\`  Ofrezco: \${getsStr}\`);
    if (offer.expiration) {
      const expDate = new Date((offer.expiration + 946684800) * 1000);
      console.log(\`  Expira: \${expDate.toISOString()}\`);
    }
    console.log();
  }

  await client.disconnect();
}

listMyOffers("rTuDireccionAqui");`,
        },
        {
          title: {
            es: "Cancelar una oferta por su número de secuencia",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function cancelOffer(offerSequence) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

  const offerCancel = {
    TransactionType: "OfferCancel",
    Account: wallet.address,
    OfferSequence: offerSequence,
  };

  const prepared = await client.autofill(offerCancel);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log(\`Oferta #\${offerSequence} cancelada con éxito.\`);
  } else {
    console.log("Error al cancelar la oferta.");
  }

  await client.disconnect();
}

// Cancelar la oferta con sequence 12345
cancelOffer(12345);`,
        },
      ],
      slides: [
        {
          title: { es: "OfferCreate", en: "", jp: "" },
          content: {
            es: "Crear ofertas en el DEX\n\n• TakerPays → Lo que quieres recibir\n• TakerGets → Lo que ofreces dar\n• Matching automático si hay coincidencia\n• Las ofertas pueden llenarse parcialmente",
            en: "",
            jp: "",
          },
          visual: "📝",
        },
        {
          title: { es: "Flags de ofertas", en: "", jp: "" },
          content: {
            es: "• tfImmediateOrCancel → Llena o cancela\n• tfFillOrKill → Todo o nada\n• tfPassive → Solo publica, no consume\n• tfSell → Cantidad exacta de venta\n\nExpiration → Cancelación automática por tiempo",
            en: "",
            jp: "",
          },
          visual: "🚩",
        },
        {
          title: { es: "Gestionar ofertas", en: "", jp: "" },
          content: {
            es: "• account_offers → Ver tus ofertas abiertas\n• OfferCancel → Cancelar por OfferSequence\n• Expiration → Auto-cancelación por tiempo\n• Cada oferta abierta aumenta tu reserva",
            en: "",
            jp: "",
          },
          visual: "🗂️",
        },
      ],
    },
    {
      id: "m9l4",
      title: {
        es: "Estrategias de trading y auto-bridging",
        en: "",
        jp: "",
      },
      theory: {
        es: `En esta lección veremos cómo funciona el **auto-bridging** en detalle, y las mejores prácticas para operar en el DEX de Xahau.

### Auto-bridging en detalle

Cuando operas con un par de tokens que no tiene liquidez directa, Xahau busca una ruta a través de **XAH**:

**Ejemplo**: Quieres vender EUR por USD
1. El DEX busca ofertas directas EUR/USD
2. Si no hay suficiente liquidez, busca EUR→XAH y XAH→USD
3. Combina ambas rutas para darte el mejor precio posible
4. Todo esto ocurre en una sola transacción

El auto-bridging **aumenta significativamente la liquidez** del DEX porque todos los pares de tokens se benefician de la liquidez XAH.

### Órdenes de mercado vs órdenes límite

- **Orden de mercado**: Quieres ejecutar inmediatamente al mejor precio disponible
  - Usa el flag \`tfImmediateOrCancel\`
  - La oferta se llena con las mejores ofertas del libro y el resto se cancela

- **Orden límite**: Quieres un precio específico y estás dispuesto a esperar
  - Crea una oferta sin flags especiales
  - La oferta permanece en el libro hasta que alguien la llene

### Spread y slippage

- **Spread**: La diferencia entre el mejor precio de compra y el mejor precio de venta
  - Un spread bajo indica buena liquidez
  - Un spread alto indica poca liquidez o volatilidad

- **Slippage**: La diferencia entre el precio esperado y el precio real de ejecución
  - Ocurre cuando tu orden es grande relativa a la liquidez disponible
  - Para órdenes grandes, puedes consultar el libro primero para estimar el slippage

### Mejores prácticas

1. **Consulta el libro antes de operar**: Usa \`book_offers\` para ver los precios actuales y estimar el slippage

2. **Usa tfImmediateOrCancel para órdenes de mercado**: Así evitas que una oferta parcialmente llenada quede abierta indefinidamente

3. **Monitorea tus ofertas abiertas**: Las ofertas que dejas en el libro pueden ejecutarse en cualquier momento. Usa \`account_offers\` regularmente

4. **Reservas de cuenta**: Cada oferta abierta en el DEX aumenta la **reserva** requerida de tu cuenta. Si tienes muchas ofertas abiertas, necesitarás más XAH en tu cuenta
   - Reserva base de cuenta: 1 XAH
   - Reserva por objeto (incluyendo ofertas): 0.2 XAH adicionales por oferta

5. **Expiración como protección**: Para ofertas límite, usa el campo \`Expiration\` para evitar que ofertas viejas se ejecuten a precios desactualizados

6. **Cuidado con el auto-bridging en tokens ilíquidos**: Si el par XAH intermedio también tiene poca liquidez, el precio final puede ser desfavorable`,
        en: "",
        jp: "",
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "Auto-bridging en detalle", en: "", jp: "" },
          content: {
            es: "Ruta automática a través de XAH\n\n• EUR → XAH → USD (automático)\n• Una sola transacción\n• Combina liquidez de ambos pares\n• Aumenta la liquidez efectiva del DEX",
            en: "",
            jp: "",
          },
          visual: "🌉",
        },
        {
          title: { es: "Tipos de órdenes", en: "", jp: "" },
          content: {
            es: "Orden de mercado:\n• tfImmediateOrCancel\n• Ejecución inmediata al mejor precio\n\nOrden límite:\n• Sin flags especiales\n• Espera en el libro al precio deseado\n• Usa Expiration como protección",
            en: "",
            jp: "",
          },
          visual: "⚖️",
        },
        {
          title: { es: "Mejores prácticas", en: "", jp: "" },
          content: {
            es: "• Consulta book_offers antes de operar\n• Monitorea tus ofertas abiertas\n• Cada oferta abierta = +0.2 XAH de reserva\n• Usa Expiration en ofertas límite\n• Cuidado con tokens ilíquidos",
            en: "",
            jp: "",
          },
          visual: "✅",
        },
      ],
    },
  ],
}
