export default {
  id: "m11",
  icon: "🔐",
  title: {
    es: "Escrows y Cheques",
    en: "",
    jp: "",
  },
  lessons: [
    {
      id: "m11l1",
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
          code: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function createTimeLockedEscrow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

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
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function finishEscrow(ownerAddress, escrowSequence) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Cualquier cuenta puede ejecutar el EscrowFinish
  const executor = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

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
    {
      id: "m11l2",
      title: {
        es: "Cheques: pagos diferidos",
        en: "",
        jp: "",
      },
      theory: {
        es: `Un **Check** (cheque) es similar a un cheque bancario tradicional: el emisor crea un cheque por una cantidad determinada, y el receptor puede cobrarlo cuando lo desee. A diferencia de un pago directo, los fondos **no se transfieren inmediatamente** — el receptor debe ejecutar una acción para cobrar el cheque.

### ¿Por qué usar Cheques en lugar de pagos directos?

- **El receptor controla cuándo cobra**: Útil cuando el receptor quiere decidir el momento exacto
- **No requiere que el receptor esté activo**: El cheque queda en el ledger esperando a ser cobrado
- **Permite pagos parciales**: El receptor puede cobrar menos de la cantidad total del cheque
- **Soporta XAH nativo e IOUs**: Puedes crear cheques tanto en XAH como en tokens

### CheckCreate: crear un cheque

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"CheckCreate"\` |
| \`Account\` | Cuenta que emite el cheque |
| \`Destination\` | Cuenta que puede cobrar el cheque |
| \`SendMax\` | Cantidad máxima que se puede cobrar |
| \`Expiration\` | (Opcional) Timestamp tras el cual el cheque caduca |
| \`InvoiceID\` | (Opcional) Hash de 256 bits para identificar el motivo del cheque |

\`SendMax\` puede ser un string (drops de XAH) o un objeto Amount para IOUs:
\`\`\`
// Cheque en XAH nativo
"SendMax": "10000000"  // 10 XAH en drops

// Cheque en IOU
"SendMax": {
  "currency": "USD",
  "issuer": "rDireccionDelEmisorDelToken",
  "value": "100"
}
\`\`\`

### CheckCash: cobrar un cheque

El receptor cobra el cheque con \`CheckCash\`. Tiene dos modos:

1. **Amount**: Cobra una cantidad exacta (debe ser ≤ SendMax)
2. **DeliverMin**: Cobra al menos esta cantidad (útil con IOUs cuyo valor puede fluctuar)

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"CheckCash"\` |
| \`Account\` | Cuenta del receptor (quien cobra) |
| \`CheckID\` | ID del cheque en el ledger |
| \`Amount\` | Cantidad exacta a cobrar (opción 1) |
| \`DeliverMin\` | Cantidad mínima aceptable (opción 2) |

**Importante**: Debes usar \`Amount\` **o** \`DeliverMin\`, nunca ambos.

### CheckCancel: cancelar un cheque

Cualquiera de las dos partes (emisor o receptor) puede cancelar un cheque. También se puede cancelar un cheque expirado.

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"CheckCancel"\` |
| \`Account\` | Cuenta que ejecuta la cancelación |
| \`CheckID\` | ID del cheque a cancelar |

### Errores comunes

- \`tecNO_ENTRY\`: El CheckID no existe (ya fue cobrado o cancelado)
- \`tecNO_LINE\`: Para IOUs, el receptor no tiene TrustLine con el emisor del token
- \`tecUNFUNDED\`: El emisor del cheque no tiene fondos suficientes al momento de cobrar
- \`tecEXPIRED\`: El cheque ha expirado`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear un cheque y cobrarlo",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = "rDireccionDelReceptor";

  // === 1. Crear el cheque ===
  const RIPPLE_EPOCH_OFFSET = 946684800;
  const expiration = Math.floor(Date.now() / 1000) - RIPPLE_EPOCH_OFFSET + 7 * 24 * 60 * 60; // Expira en 7 días

  const checkCreate = {
    TransactionType: "CheckCreate",
    Account: sender.address,
    Destination: receiverAddress,
    SendMax: xahToDrops(50), // Hasta 50 XAH
    Expiration: expiration,
  };

  const prepared = await client.autofill(checkCreate);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("=== CheckCreate ===");
  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    // Buscar el CheckID en los nodos afectados
    const createdNode = result.result.meta.AffectedNodes.find(
      (node) => node.CreatedNode && node.CreatedNode.LedgerEntryType === "Check"
    );

    if (createdNode) {
      const checkID = createdNode.CreatedNode.LedgerIndex;
      console.log("CheckID:", checkID);
      console.log("\\nGuarda este CheckID para poder cobrar el cheque.");
    }
  }

  await client.disconnect();
}

checkExample();`,
        },
        {
          title: {
            es: "Cobrar (cash) un cheque recibido",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function cashCheck(checkID) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // El receptor cobra el cheque
  const receiver = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Opción 1: Cobrar una cantidad exacta
  const checkCash = {
    TransactionType: "CheckCash",
    Account: receiver.address,
    CheckID: checkID,
    Amount: xahToDrops(50), // Cobrar exactamente 50 XAH
  };

  // Opción 2 (alternativa): Cobrar al menos una cantidad mínima
  // const checkCash = {
  //   TransactionType: "CheckCash",
  //   Account: receiver.address,
  //   CheckID: checkID,
  //   DeliverMin: xahToDrops(40), // Al menos 40 XAH
  // };

  const prepared = await client.autofill(checkCash);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== CheckCash ===");
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("¡Cheque cobrado con éxito!");
    const delivered = result.result.meta.delivered_amount;
    if (typeof delivered === "string") {
      console.log("Cantidad recibida:", Number(delivered) / 1_000_000, "XAH");
    } else {
      console.log("Cantidad recibida:", delivered.value, delivered.currency);
    }
  } else if (txResult === "tecNO_ENTRY") {
    console.log("El cheque no existe. Puede haber sido cancelado o ya cobrado.");
  } else if (txResult === "tecUNFUNDED") {
    console.log("El emisor no tiene fondos suficientes.");
  }

  await client.disconnect();
}

// Usa el CheckID obtenido al crear el cheque
cashCheck("TU_CHECK_ID_AQUI");`,
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es un Check?", en: "", jp: "" },
          content: {
            es: "Similar a un cheque bancario tradicional\n\n• El emisor crea el cheque (CheckCreate)\n• El receptor lo cobra cuando quiera (CheckCash)\n• Los fondos NO se transfieren al crear\n• Soporta XAH nativo e IOUs\n• Puede tener fecha de expiración",
            en: "",
            jp: "",
          },
          visual: "📝",
        },
        {
          title: { es: "Ciclo de vida del Check", en: "", jp: "" },
          content: {
            es: "1. CheckCreate → Emisor crea el cheque\n     ↓ (el receptor decide cuándo)\n2. CheckCash → Receptor cobra el cheque\n     ó\n2. CheckCancel → Cualquiera lo cancela\n\n• Amount = cobro exacto\n• DeliverMin = cobro mínimo aceptable\n• Cheques expirados se pueden cancelar",
            en: "",
            jp: "",
          },
          visual: "🔄",
        },
        {
          title: { es: "Check vs Payment vs Escrow", en: "", jp: "" },
          content: {
            es: "Payment → Transferencia inmediata\n\nEscrow → Fondos bloqueados con condiciones\n• Tiempo, crypto-condición o ambos\n• Fondos realmente bloqueados\n\nCheck → Promesa de pago diferido\n• Receptor decide cuándo cobrar\n• Fondos NO bloqueados (pueden gastarse)\n• Más flexible, menos garantías",
            en: "",
            jp: "",
          },
          visual: "⚖️",
        },
      ],
    },
  ],
}
