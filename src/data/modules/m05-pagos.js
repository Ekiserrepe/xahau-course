export default {
  id: "m5",
  icon: "💸",
  title: {
    es: "Creación y uso de pagos",
    en: "",
    jp: "",
  },
  lessons: [
    {
      id: "m5l1",
      title: {
        es: "Anatomía de una transacción de pago",
        en: "",
        jp: "",
      },
      theory: {
        es: `El **Payment** es la transacción más fundamental de Xahau. Permite enviar XAH (o tokens) de una cuenta a otra.

### Campos de una transacción Payment

| Campo | Descripción |
|---|---|
| \`TransactionType\` | Siempre \`"Payment"\` |
| \`Account\` | Dirección del emisor (quien paga) |
| \`Destination\` | Dirección del receptor |
| \`Amount\` | Cantidad a enviar (en drops para XAH nativo) |
| \`Fee\` | Coste de la transacción (en drops) |
| \`Sequence\` | Número de secuencia de la cuenta emisora |
| \`NetworkID\` | Identificador de la red (necesario en Xahau) |

### Drops vs XAH

Las cantidades de XAH nativo se expresan en **drops**:
- 1 XAH = **1,000,000 drops**
- El campo \`Amount\` para XAH nativo es un **string** con el número de drops
- Ejemplo: \`"10000000"\` = 10 XAH

### Fees (costes de transacción)

Los fees en Xahau son extremadamente bajos y predecibles:
- Un pago típico cuesta **12 drops** (0.000012 XAH)
- Los fees se **queman** (destruyen), no van a ningún validador
- La librería \`xahau\` puede calcular el fee automáticamente con \`autofill()\`

### Ciclo de vida de una transacción

1. **Construir**: Crear el objeto de transacción con los campos necesarios
2. **Autofill**: Rellenar automáticamente Fee, Sequence y NetworkID
3. **Firmar**: Firmar con la clave privada del emisor
4. **Enviar**: Enviar la transacción firmada al nodo
5. **Validar**: Esperar a que se incluya en un ledger validado`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Enviar un pago de XAH entre dos cuentas",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet, xahToDrops } = require("xahau");

async function sendPayment() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Wallet del emisor (usa tu seed de testnet)
  const sender = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

  // Construir la transacción de pago
  const payment = {
    TransactionType: "Payment",
    Account: sender.address,
    Destination: "rDireccionDelDestinatario",
    Amount: xahToDrops(10), // 10 XAH
  };

  // Autofill agrega Fee, Sequence, NetworkID automáticamente
  const prepared = await client.autofill(payment);
  console.log("Transacción preparada:", prepared);

  // Firmar la transacción
  const signed = sender.sign(prepared);
  console.log("Hash de la tx:", signed.hash);

  // Enviar y esperar validación
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Pago enviado con éxito!");
  } else {
    console.log("Error en el pago");
  }

  await client.disconnect();
}

sendPayment();`,
        },
      ],
      slides: [
        {
          title: { es: "Transacción Payment", en: "", jp: "" },
          content: {
            es: "La transacción más básica de Xahau\n\n• Account → Quien envía\n• Destination → Quien recibe\n• Amount → Cantidad (en drops)\n• 1 XAH = 1,000,000 drops",
            en: "",
            jp: "",
          },
          visual: "💸",
        },
        {
          title: { es: "Ciclo de vida", en: "", jp: "" },
          content: {
            es: "1️⃣ Construir → Campos de la tx\n2️⃣ Autofill → Fee, Sequence, NetworkID\n3️⃣ Firmar → Con tu clave privada\n4️⃣ Enviar → submitAndWait()\n5️⃣ Validar → tesSUCCESS = éxito",
            en: "",
            jp: "",
          },
          visual: "🔄",
        },
        {
          title: { es: "De submit a resultado final", en: "", jp: "" },
          content: {
            es: "• Submit → Tx enviada al nodo\n• Nodo propaga a la red de validadores\n• Consenso → Incluida en un ledger\n• Resultado final en meta.TransactionResult\n• Fee se quema (no va a validadores)\n• submitAndWait espera la validación",
            en: "",
            jp: "",
          },
          visual: "✅",
        },
      ],
    },
    {
      id: "m5l2",
      title: {
        es: "Pagos con Destination Tag y memos",
        en: "",
        jp: "",
      },
      theory: {
        es: `Además del pago básico, Xahau soporta campos adicionales que permiten añadir contexto y funcionalidad a los pagos.

### Destination Tag

El **Destination Tag** es un número entero que permite al receptor identificar pagos individuales. Es especialmente útil para:
- **Exchanges**: Identificar a qué usuario pertenece un depósito
- **Servicios**: Asociar un pago con un pedido o factura
- Si una cuenta tiene activado el flag \`RequireDestTag\`, **no puedes enviarle un pago sin tag**

### Memos

Los **Memos** permiten adjuntar datos arbitrarios a una transacción:
- \`MemoType\`: Tipo del memo (ej: "text/plain", "application/json")
- \`MemoData\`: El contenido del memo
- Los memos se codifican en **hexadecimal**
- Son públicos y visibles para todos en el ledger

### Resultados de transacción

Cada transacción devuelve un código de resultado:
- \`tesSUCCESS\`: La transacción fue exitosa
- \`tecUNFUNDED_PAYMENT\`: No hay fondos suficientes
- \`tecNO_DST\`: La cuenta de destino no existe
- \`tecDST_TAG_NEEDED\`: Se requiere Destination Tag
- \`tecNO_DST_INSUF_XAH\`: El destino no tiene suficiente XAH para la reserva`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Pago con Destination Tag y Memos",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet, xahToDrops } = require("xahau");

// Función auxiliar para convertir texto a hexadecimal
function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function sendPaymentWithMemo() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

  const payment = {
    TransactionType: "Payment",
    Account: sender.address,
    Destination: "rDireccionDelDestinatario",
    Amount: xahToDrops(5), // 5 XAH
    DestinationTag: 12345, // Tag para identificar el pago
    Memos: [
      {
        Memo: {
          MemoType: toHex("text/plain"),
          MemoData: toHex("Pago del curso de Xahau - Módulo 5"),
        },
      },
    ],
  };

  const prepared = await client.autofill(payment);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("¡Pago con memo enviado!");
    console.log("Hash:", signed.hash);
    console.log("Destination Tag:", 12345);
  }

  await client.disconnect();
}

sendPaymentWithMemo();`,
        },
        {
          title: {
            es: "Verificar un pago recibido",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client } = require("xahau");

async function verifyPayment(txHash) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "tx",
    transaction: txHash,
  });

  const tx = response.result;
  console.log("=== Detalles del pago ===");
  console.log("Tipo:", tx.TransactionType);
  console.log("De:", tx.Account);
  console.log("A:", tx.Destination);
  console.log("Cantidad:", Number(tx.Amount) / 1_000_000, "XAH");
  console.log("Fee:", Number(tx.Fee) / 1_000_000, "XAH");
  console.log("Resultado:", tx.meta.TransactionResult);
  console.log("Ledger:", tx.ledger_index);

  if (tx.DestinationTag !== undefined) {
    console.log("Destination Tag:", tx.DestinationTag);
  }

  if (tx.Memos) {
    for (const memo of tx.Memos) {
      const type = Buffer.from(memo.Memo.MemoType, "hex").toString("utf8");
      const data = Buffer.from(memo.Memo.MemoData, "hex").toString("utf8");
      console.log(\`Memo [\${type}]: \${data}\`);
    }
  }

  await client.disconnect();
}

verifyPayment("TU_HASH_DE_TRANSACCION_AQUI");`,
        },
      ],
      slides: [
        {
          title: { es: "Destination Tag", en: "", jp: "" },
          content: {
            es: "Número para identificar pagos individuales\n\n• Usado por exchanges y servicios\n• Asocia pagos con usuarios/pedidos\n• Algunas cuentas lo requieren\n• Es un número entero (uint32)",
            en: "",
            jp: "",
          },
          visual: "🏷️",
        },
        {
          title: { es: "Memos", en: "", jp: "" },
          content: {
            es: "Datos adjuntos a una transacción\n\n• MemoType → Tipo (text/plain, etc.)\n• MemoData → Contenido\n• Codificados en hexadecimal\n• Públicos en el ledger",
            en: "",
            jp: "",
          },
          visual: "📝",
        },
        {
          title: { es: "Seguridad del DestinationTag", en: "", jp: "" },
          content: {
            es: "• Flag RequireDestTag en la cuenta destino\n• Sin tag → error tecDST_TAG_NEEDED\n• Exchanges exigen tag para depósitos\n• Sin tag correcto = fondos perdidos\n• Siempre valida el tag antes de enviar\n• Maneja errores: tecNO_DST, tecUNFUNDED",
            en: "",
            jp: "",
          },
          visual: "🔒",
        },
      ],
    },
    {
      id: "m5l3",
      title: {
        es: "Pagos cross-currency y pathfinding",
        en: "",
        jp: "",
      },
      theory: {
        es: `Xahau no solo permite enviar XAH nativo o tokens del mismo tipo: también soporta **pagos cross-currency**, donde el emisor envía una moneda y el receptor recibe otra diferente. Esto es posible gracias al **DEX integrado** y al sistema de **pathfinding**.

### Pagos cross-currency

Un pago cross-currency permite, por ejemplo, que el emisor pague en XAH y el receptor reciba USD. Xahau busca automáticamente el mejor camino a través del DEX para convertir las monedas.

### El sistema de pathfinding

El pathfinding es el mecanismo que encuentra rutas de conversión entre monedas:
- Xahau busca **caminos** a través de trust lines y órdenes del DEX
- Puede encadenar múltiples conversiones intermedias
- Siempre intenta encontrar la **mejor tasa** disponible

### Campos clave en pagos cross-currency

| Campo | Descripción |
|---|---|
| \`Amount\` | Lo que el receptor debe recibir (moneda de destino) |
| \`SendMax\` | Máximo que el emisor está dispuesto a gastar (moneda de origen) |
| \`DeliverMin\` | Mínimo que el receptor debe recibir (con pagos parciales) |
| \`Paths\` | Rutas de conversión encontradas por pathfinding |

### El comando ripple_path_find

Antes de enviar un pago cross-currency, usa \`ripple_path_find\` para:
- Ver si existe un camino entre las dos monedas
- Obtener el \`Paths\` necesario para la transacción
- Conocer el coste estimado (\`source_amount\`)

### Pagos parciales (tfPartialPayment)

El flag \`tfPartialPayment\` (valor: \`0x00020000\`) permite que un pago entregue **menos** de lo especificado en \`Amount\`:
- Útil cuando la liquidez puede variar entre la consulta y la ejecución
- Usa \`DeliverMin\` para establecer un mínimo aceptable
- **IMPORTANTE**: Al recibir pagos, siempre verifica \`delivered_amount\` en los metadatos, **no** el campo \`Amount\`. Un atacante podría enviar un pago parcial que muestre un \`Amount\` alto pero entregue mucho menos`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Buscar rutas de pago entre monedas con ripple_path_find",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function findPaymentPaths() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const senderAddress = "rDireccionDelEmisor";
  const receiverAddress = "rDireccionDelReceptor";
  const issuerAddress = "rDireccionDelEmisorDeUSD";

  // Buscar rutas para entregar 100 USD al receptor
  const pathResponse = await client.request({
    command: "ripple_path_find",
    source_account: senderAddress,
    destination_account: receiverAddress,
    destination_amount: {
      currency: "USD",
      issuer: issuerAddress,
      value: "100",
    },
  });

  const alternatives = pathResponse.result.alternatives;
  console.log("=== Rutas de pago encontradas ===");
  console.log(\`Se encontraron \${alternatives.length} alternativas\\n\`);

  for (let i = 0; i < alternatives.length; i++) {
    const alt = alternatives[i];
    console.log(\`--- Alternativa \${i + 1} ---\`);

    // El coste para el emisor
    if (typeof alt.source_amount === "string") {
      // XAH nativo (en drops)
      const xah = Number(alt.source_amount) / 1_000_000;
      console.log(\`Coste: \${xah} XAH\`);
    } else {
      // Token
      console.log(
        \`Coste: \${alt.source_amount.value} \${alt.source_amount.currency}\`
      );
    }

    console.log(\`Paths: \${alt.paths_computed.length} saltos\`);

    // Mostrar los saltos intermedios
    for (const path of alt.paths_computed) {
      const steps = path.map((step) => {
        if (step.currency) return step.currency;
        if (step.account) return step.account.slice(0, 8) + "...";
        return "?";
      });
      console.log(\`  Ruta: \${steps.join(" → ")}\`);
    }
  }

  await client.disconnect();
}

findPaymentPaths();`,
        },
        {
          title: {
            es: "Enviar un pago cross-currency (XAH a USD token)",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function sendCrossCurrencyPayment() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});
  const receiverAddress = "rDireccionDelReceptor";
  const usdIssuer = "rDireccionDelEmisorDeUSD";

  // Primero, buscar rutas de pago
  const pathResponse = await client.request({
    command: "ripple_path_find",
    source_account: sender.address,
    destination_account: receiverAddress,
    destination_amount: {
      currency: "USD",
      issuer: usdIssuer,
      value: "50",
    },
  });

  if (pathResponse.result.alternatives.length === 0) {
    console.log("No se encontraron rutas de pago disponibles.");
    await client.disconnect();
    return;
  }

  const bestAlt = pathResponse.result.alternatives[0];
  console.log("Mejor ruta encontrada.");

  if (typeof bestAlt.source_amount === "string") {
    console.log(
      \`Coste estimado: \${Number(bestAlt.source_amount) / 1_000_000} XAH\`
    );
  } else {
    console.log(
      \`Coste estimado: \${bestAlt.source_amount.value} \${bestAlt.source_amount.currency}\`
    );
  }

  // Construir el pago cross-currency
  const payment = {
    TransactionType: "Payment",
    Account: sender.address,
    Destination: receiverAddress,
    // Lo que el receptor debe recibir
    Amount: {
      currency: "USD",
      issuer: usdIssuer,
      value: "50",
    },
    // Máximo que estamos dispuestos a gastar (añadir un 5% de margen)
    SendMax:
      typeof bestAlt.source_amount === "string"
        ? String(Math.ceil(Number(bestAlt.source_amount) * 1.05))
        : {
            currency: bestAlt.source_amount.currency,
            issuer: bestAlt.source_amount.issuer,
            value: String(Number(bestAlt.source_amount.value) * 1.05),
          },
    // Rutas de conversión
    Paths: bestAlt.paths_computed,
  };

  const prepared = await client.autofill(payment);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("\\nResultado:", txResult);

  if (txResult === "tesSUCCESS") {
    // Siempre verificar delivered_amount, no Amount
    const delivered = result.result.meta.delivered_amount;
    if (typeof delivered === "string") {
      console.log(
        \`Entregado: \${Number(delivered) / 1_000_000} XAH\`
      );
    } else {
      console.log(
        \`Entregado: \${delivered.value} \${delivered.currency}\`
      );
    }
  }

  await client.disconnect();
}

sendCrossCurrencyPayment();`,
        },
      ],
      slides: [
        {
          title: { es: "Pagos cross-currency", en: "", jp: "" },
          content: {
            es: "Envía una moneda, el receptor recibe otra\n\n• El DEX integrado convierte automáticamente\n• Amount = lo que recibe el receptor\n• SendMax = máximo que paga el emisor\n• Paths = rutas de conversión",
            en: "",
            jp: "",
          },
          visual: "🔄",
        },
        {
          title: { es: "Pathfinding", en: "", jp: "" },
          content: {
            es: "ripple_path_find busca rutas de conversión\n\n1. Indica cuenta origen y destino\n2. Especifica la moneda y cantidad destino\n3. Obtén alternativas con coste estimado\n4. Usa paths_computed en tu Payment",
            en: "",
            jp: "",
          },
          visual: "🗺️",
        },
        {
          title: { es: "Pagos parciales", en: "", jp: "" },
          content: {
            es: "Flag tfPartialPayment permite entregar menos\n\n• Útil cuando la liquidez varía\n• DeliverMin = mínimo aceptable\n• SIEMPRE verificar delivered_amount\n• NUNCA confiar en el campo Amount\n\n⚠️ Riesgo de seguridad si no se verifica",
            en: "",
            jp: "",
          },
          visual: "⚠️",
        },
      ],
    },
    {
      id: "m5l4",
      title: {
        es: "Escrows: pagos condicionales",
        en: "",
        jp: "",
      },
      theory: {
        es: `Un **Escrow** es un mecanismo de pago condicional que bloquea fondos hasta que se cumplan ciertas condiciones. Es como un sobre sellado con dinero que solo se puede abrir bajo circunstancias específicas.

### Casos de uso

- **Pagos programados**: Liberar fondos en una fecha futura determinada
- **Atomic swaps**: Intercambios condicionales entre partes que no confían entre sí
- **Liberación condicional**: Fondos que solo se liberan cuando se proporciona una prueba criptográfica
- **Vesting**: Distribución gradual de tokens a lo largo del tiempo

### EscrowCreate: crear un escrow

El tipo de transacción \`EscrowCreate\` bloquea una cantidad de XAH con condiciones:

| Campo | Descripción |
|---|---|
| \`Amount\` | Cantidad de XAH a bloquear (en drops) |
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
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear un escrow con bloqueo temporal (FinishAfter = 5 minutos)",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet, xahToDrops } = require("xahau");

async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

  // Ripple Epoch: segundos desde 01/01/2000 00:00:00 UTC
  // Diferencia con Unix Epoch: 946684800 segundos
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const now = Math.floor(Date.now() / 1000);

  // FinishAfter: 5 minutos en el futuro
  const finishAfter = now - RIPPLE_EPOCH_OFFSET + 5 * 60;
  // CancelAfter: 24 horas en el futuro (si nadie lo completa, se puede cancelar)
  const cancelAfter = now - RIPPLE_EPOCH_OFFSET + 24 * 60 * 60;

  const escrowCreate = {
    TransactionType: "EscrowCreate",
    Account: sender.address,
    Destination: "rDireccionDelDestinatario",
    Amount: xahToDrops(100), // Bloquear 100 XAH
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
    console.log("\\n¡Guarda el Sequence! Lo necesitas para EscrowFinish.");
    console.log(\`Sequence del escrow: \${prepared.Sequence}\`);
  }

  await client.disconnect();
}

createTimeLockedEscrow();`,
        },
        {
          title: {
            es: "Completar (finish) un escrow después del tiempo de bloqueo",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");

async function finishEscrow(ownerAddress, escrowSequence) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Cualquier cuenta puede ejecutar el EscrowFinish
  const executor = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

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
      \`\\nAún no puedes completar este escrow. Faltan \${remaining} segundos.\`
    );
    console.log(
      \`Disponible a partir de: \${new Date(finishAfterUnix * 1000).toISOString()}\`
    );
    await client.disconnect();
    return;
  }

  console.log("\\nEl tiempo de bloqueo ha pasado. Completando escrow...");

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
  console.log("\\n=== EscrowFinish ===");
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
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es un Escrow?", en: "", jp: "" },
          content: {
            es: "Pago condicional que bloquea fondos\n\n• Bloqueo temporal (FinishAfter)\n• Cancelación automática (CancelAfter)\n• Condición criptográfica (Condition)\n\nUsos: pagos programados, vesting, atomic swaps",
            en: "",
            jp: "",
          },
          visual: "🔐",
        },
        {
          title: { es: "Ciclo de vida del Escrow", en: "", jp: "" },
          content: {
            es: "1. EscrowCreate → Bloquea los fondos\n     ↓ (pasa el tiempo)\n2. EscrowFinish → Libera al destinatario\n     ó\n2. EscrowCancel → Devuelve al creador\n\n• FinishAfter debe pasar antes de Finish\n• CancelAfter debe pasar antes de Cancel",
            en: "",
            jp: "",
          },
          visual: "⏳",
        },
        {
          title: { es: "Crypto-condiciones", en: "", jp: "" },
          content: {
            es: "Escrows con prueba criptográfica:\n\n• Condition = hash SHA-256\n• Fulfillment = preimagen secreta\n• Solo quien conozca el secreto puede completar\n• Basado en Interledger Protocol\n\nIdeal para intercambios trustless entre partes",
            en: "",
            jp: "",
          },
          visual: "🔑",
        },
      ],
    },
  ],
}
