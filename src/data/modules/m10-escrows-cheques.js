export default {
  id: "m10",
  icon: "🔐",
  title: {
    es: "Otras transacciones disponibles",
    en: "Other Available Transactions",
    jp: "",
  },
  lessons: [
    {
      id: "m10l1",
      title: {
        es: "Escrows: pagos condicionales",
        en: "Escrows: Conditional Payments",
        jp: "",
      },
      theory: {
        es: `Un **Escrow** es un mecanismo de pago condicional que bloquea fondos hasta que se cumplan ciertas condiciones. Es como un sobre sellado con dinero que solo se puede abrir bajo circunstancias específicas. Una caja fuerte condicional.

### Casos de uso

- **Pagos programados**: Liberar fondos en una fecha futura determinada
- **Atomic swaps**: Intercambios condicionales entre partes que no confían entre sí
- **Liberación condicional**: Fondos que solo se liberan cuando se proporciona una prueba criptográfica
- **Vesting**: Distribución gradual de tokens a lo largo del tiempo

### EscrowCreate: crear un escrow

El tipo de transacción \`EscrowCreate\` bloquea una cantidad de XAH con condiciones:

| Campo | Descripción |
|---|---|
| \`Amount\` | Cantidad de XAH u otros activos a bloquear (en drops para XAH, objeto Amount para tokens) |
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
        en: `An **Escrow** is a conditional payment mechanism that locks funds until certain conditions are met. Like a sealed envelope with money that can only be opened under specific circumstances — a conditional safe.

### Use cases

- **Scheduled payments**: Release funds on a specific future date
- **Atomic swaps**: Conditional exchanges between parties that don't trust each other
- **Conditional release**: Funds only released when a cryptographic proof is provided
- **Vesting**: Gradual token distribution over time

### EscrowCreate: creating an escrow

The \`EscrowCreate\` transaction type locks an amount of XAH with conditions:

| Field | Description |
|---|---|
| \`Amount\` | Amount of XAH or other assets to lock (drops for XAH, Amount object for tokens) |
| \`Destination\` | Account that will receive the funds |
| \`FinishAfter\` | Minimum timestamp to complete the escrow |
| \`CancelAfter\` | Timestamp from which it can be cancelled |
| \`Condition\` | Optional crypto-condition for release |

**Important rules**:
- You must specify at least \`FinishAfter\` or \`Condition\` (or both)
- If you use \`CancelAfter\`, it must be after \`FinishAfter\`
- Timestamps use **Ripple Epoch** (seconds since 01/01/2000 00:00:00 UTC)

### EscrowFinish: completing the escrow

Any account can execute \`EscrowFinish\` to release the funds to the recipient:
- Only works after \`FinishAfter\` (if specified)
- If there is a \`Condition\`, the correct \`Fulfillment\` must be provided
- The \`Owner\` and \`OfferSequence\` fields identify which escrow to complete

### EscrowCancel: cancelling the escrow

With \`EscrowCancel\` the funds are returned to the creator:
- Only works after \`CancelAfter\`
- Any account can execute the cancellation
- Funds go back to the account that created the escrow

### Crypto-conditions

Xahau supports crypto-conditions from the **Interledger (ILP)** protocol:
- Based on the **PREIMAGE-SHA-256** standard
- The creator generates a \`Condition\` (hash) and saves the \`Fulfillment\` (preimage)
- To complete the escrow, the \`Fulfillment\` matching the \`Condition\` must be provided
- This allows escrows only released when someone proves they know a secret`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear un escrow con bloqueo temporal (FinishAfter = 5 minutos)",
            en: "Create an escrow with time lock (FinishAfter = 2 minutes)",
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

  // FinishAfter: 2 minutos en el futuro
  const finishAfter = now - RIPPLE_EPOCH_OFFSET + 2 * 60;
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
    console.log(\`Tu dirección: \${sender.address}\`);

  }

  await client.disconnect();
}

createTimeLockedEscrow();`,
        },
        {
          title: {
            es: "Completar (finish) un escrow después del tiempo de bloqueo",
            en: "Complete (finish) an escrow after the lock period",
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
          title: { es: "¿Qué es un Escrow?", en: "What is an Escrow?", jp: "" },
          content: {
            es: "Pago condicional que bloquea fondos\n\n• Bloqueo temporal (FinishAfter)\n• Cancelación automática (CancelAfter)\n• Condición criptográfica (Condition)\n\nUsos: pagos programados, vesting, atomic swaps",
            en: "Conditional payment that locks funds\n\n• Time lock (FinishAfter)\n• Automatic cancellation (CancelAfter)\n• Cryptographic condition (Condition)\n\nUses: scheduled payments, vesting, atomic swaps",
            jp: "",
          },
          visual: "🔐",
        },
        {
          title: { es: "Ciclo de vida del Escrow", en: "Escrow lifecycle", jp: "" },
          content: {
            es: "1. EscrowCreate → Bloquea los fondos\n     ↓ (pasa el tiempo)\n2. EscrowFinish → Libera al destinatario\n     ó\n2. EscrowCancel → Devuelve al creador\n\n• FinishAfter debe pasar antes de Finish\n• CancelAfter debe pasar antes de Cancel",
            en: "1. EscrowCreate → Locks the funds\n     ↓ (time passes)\n2. EscrowFinish → Releases to recipient\n     or\n2. EscrowCancel → Returns to creator\n\n• FinishAfter must pass before Finish\n• CancelAfter must pass before Cancel",
            jp: "",
          },
          visual: "⏳",
        },
        {
          title: { es: "Crypto-condiciones", en: "Crypto-conditions", jp: "" },
          content: {
            es: "Escrows con prueba criptográfica:\n\n• Condition = hash SHA-256\n• Fulfillment = preimagen secreta\n• Solo quien conozca el secreto puede completar\n• Basado en Interledger Protocol\n\nIdeal para intercambios trustless entre partes",
            en: "Escrows with cryptographic proof:\n\n• Condition = SHA-256 hash\n• Fulfillment = secret preimage\n• Only those who know the secret can complete\n• Based on Interledger Protocol\n\nIdeal for trustless exchanges between parties",
            jp: "",
          },
          visual: "🔑",
        },
      ],
    },
    {
      id: "m10l2",
      title: {
        es: "Cheques: pagos diferidos",
        en: "Checks: Deferred Payments",
        jp: "",
      },
      theory: {
        es: `Un **Check** (cheque) es similar a un cheque bancario tradicional: el emisor crea un cheque por una cantidad determinada, y el receptor puede cobrarlo cuando lo desee. A diferencia de un pago directo, los fondos **no se transfieren inmediatamente**, el receptor debe ejecutar una acción para cobrar el cheque.

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
        en: `A **Check** is similar to a traditional bank check: the sender creates a check for a certain amount, and the recipient can cash it whenever they wish. Unlike a direct payment, funds are **not transferred immediately** — the recipient must take action to cash the check.

### Why use Checks instead of direct payments?

- **The recipient controls when they cash it**: Useful when the recipient wants to decide the exact timing
- **Does not require the recipient to be active**: The check stays in the ledger waiting to be cashed
- **Allows partial payments**: The recipient can cash less than the total check amount
- **Supports native XAH and IOUs**: You can create checks in both XAH and tokens

### CheckCreate: creating a check

| Field | Description |
|---|---|
| \`TransactionType\` | \`"CheckCreate"\` |
| \`Account\` | Account issuing the check |
| \`Destination\` | Account that can cash the check |
| \`SendMax\` | Maximum amount that can be cashed |
| \`Expiration\` | (Optional) Timestamp after which the check expires |
| \`InvoiceID\` | (Optional) 256-bit hash to identify the purpose of the check |

\`SendMax\` can be a string (XAH drops) or an Amount object for IOUs:
\`\`\`
// Check in native XAH
"SendMax": "10000000"  // 10 XAH in drops

// Check in IOU
"SendMax": {
  "currency": "USD",
  "issuer": "rTokenIssuerAddress",
  "value": "100"
}
\`\`\`

### CheckCash: cashing a check

The recipient cashes the check with \`CheckCash\`. It has two modes:

1. **Amount**: Cash an exact amount (must be ≤ SendMax)
2. **DeliverMin**: Cash at least this amount (useful with IOUs whose value may fluctuate)

| Field | Description |
|---|---|
| \`TransactionType\` | \`"CheckCash"\` |
| \`Account\` | Recipient account (the one cashing) |
| \`CheckID\` | ID of the check in the ledger |
| \`Amount\` | Exact amount to cash (option 1) |
| \`DeliverMin\` | Minimum acceptable amount (option 2) |

**Important**: You must use \`Amount\` **or** \`DeliverMin\`, never both.

### CheckCancel: cancelling a check

Either party (sender or recipient) can cancel a check. An expired check can also be cancelled.

| Field | Description |
|---|---|
| \`TransactionType\` | \`"CheckCancel"\` |
| \`Account\` | Account executing the cancellation |
| \`CheckID\` | ID of the check to cancel |

### Common errors

- \`tecNO_ENTRY\`: The CheckID does not exist (already cashed or cancelled)
- \`tecNO_LINE\`: For IOUs, the recipient has no TrustLine with the token issuer
- \`tecUNFUNDED\`: The check issuer has insufficient funds at the time of cashing
- \`tecEXPIRED\`: The check has expired`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear un cheque",
            en: "Create a check",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function checkExample() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const receiverAddress = "rDireccionDelReceptor"; // Reemplaza con la dirección del receptor y guarda la seed de esa cuenta en tu .env como CASH_SEED para el próximo ejemplo

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
      console.log("\\nGuarda este CheckID para poder cobrar el cheque de tu cuenta. " + sender.address);
    }
  }

  await client.disconnect();
}

checkExample();`,
        },
        {
          title: {
            es: "Cobrar (cash) un cheque recibido",
            en: "Cash (collect) a received check",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function cashCheck(checkID) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // El receptor cobra el cheque
  const receiver = Wallet.fromSeed(process.env.CASH_SEED, {algorithm: 'secp256k1'});

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
          title: { es: "¿Qué es un Check?", en: "What is a Check?", jp: "" },
          content: {
            es: "Similar a un cheque bancario tradicional\n\n• El emisor crea el cheque (CheckCreate)\n• El receptor lo cobra cuando quiera (CheckCash)\n• Los fondos NO se transfieren al crear\n• Soporta XAH nativo e IOUs\n• Puede tener fecha de expiración",
            en: "Similar to a traditional bank check\n\n• Sender creates the check (CheckCreate)\n• Recipient cashes it whenever (CheckCash)\n• Funds are NOT transferred at creation\n• Supports native XAH and IOUs\n• Can have an expiration date",
            jp: "",
          },
          visual: "📝",
        },
        {
          title: { es: "Ciclo de vida del Check", en: "Check lifecycle", jp: "" },
          content: {
            es: "1. CheckCreate → Emisor crea el cheque\n     ↓ (el receptor decide cuándo)\n2. CheckCash → Receptor cobra el cheque\n     ó\n2. CheckCancel → Cualquiera lo cancela\n\n• Amount = cobro exacto\n• DeliverMin = cobro mínimo aceptable\n• Cheques expirados se pueden cancelar",
            en: "1. CheckCreate → Sender creates the check\n     ↓ (recipient decides when)\n2. CheckCash → Recipient cashes the check\n     or\n2. CheckCancel → Either party cancels it\n\n• Amount = exact amount to cash\n• DeliverMin = minimum acceptable amount\n• Expired checks can be cancelled",
            jp: "",
          },
          visual: "🔄",
        },
        {
          title: { es: "Check vs Payment vs Escrow", en: "Check vs Payment vs Escrow", jp: "" },
          content: {
            es: "Payment → Transferencia inmediata\n\nEscrow → Fondos bloqueados con condiciones\n• Tiempo, crypto-condición o ambos\n• Fondos realmente bloqueados\n\nCheck → Promesa de pago diferido\n• Receptor decide cuándo cobrar\n• Fondos NO bloqueados (pueden gastarse)\n• Más flexible, menos garantías",
            en: "Payment → Immediate transfer\n\nEscrow → Funds locked with conditions\n• Time, crypto-condition or both\n• Funds actually locked\n\nCheck → Deferred payment promise\n• Recipient decides when to cash\n• Funds NOT locked (can be spent)\n• More flexible, fewer guarantees",
            jp: "",
          },
          visual: "⚖️",
        },
      ],
    },
    {
      id: "m10l3",
      title: {
        es: "Tickets: secuencias fuera de orden",
        en: "Tickets: Out-of-Order Sequences",
        jp: "",
      },
      theory: {
        es: `Un **Ticket** es un mecanismo que permite enviar transacciones **fuera del orden secuencial** normal. Normalmente, cada transacción en Xahau debe usar el siguiente número de \`Sequence\` de la cuenta. Los Tickets eliminan esa restricción reservando números de secuencia por adelantado.

### ¿Qué es un Ticket?

Cada cuenta en Xahau tiene un número de \`Sequence\` que se incrementa con cada transacción. Esto significa que las transacciones deben procesarse estrictamente en orden. Los Tickets solucionan este problema:

- Un Ticket **reserva** un número de secuencia para uso futuro
- La transacción que usa un Ticket especifica \`TicketSequence\` en lugar de \`Sequence\`
- Los Tickets se pueden usar en **cualquier orden**, no importa cuándo fueron creados

### ¿Para qué sirven los Tickets?

- **Transacciones paralelas**: Preparar y firmar múltiples transacciones sin depender del orden
- **Transacciones pre-firmadas**: Firmar transacciones por adelantado y enviarlas cuando convenga
- **Multi-signing**: Diferentes firmantes pueden preparar transacciones independientes sin bloquear la secuencia
- **Contingencias**: Tener transacciones de respaldo listas sin consumir la secuencia normal

### TicketCreate: reservar Tickets

La transacción \`TicketCreate\` reserva uno o más números de secuencia:

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"TicketCreate"\` |
| \`Account\` | Cuenta que reserva los tickets |
| \`TicketCount\` | Número de tickets a crear (1-250) |

### Coste de reserva

Cada Ticket creado consume una **reserva de propietario** (owner reserve) de la cuenta, igual que una TrustLine o una oferta en el DEX. Esto significa que por cada Ticket activo, necesitas tener XAH adicional bloqueado en tu cuenta. El Ticket se elimina (y la reserva se libera) cuando se usa o cuando se cancela.

### Límites

- **Máximo por transacción**: Puedes crear hasta **250 Tickets** en una sola transacción \`TicketCreate\`
- **Máximo por cuenta**: Una cuenta puede tener hasta **250 Tickets** activos simultáneamente
- Los Tickets **no caducan** — permanecen en el ledger hasta que se usan o se cancelan

### Usar un Ticket en una transacción

Para usar un Ticket, incluye estos campos en tu transacción:
- \`Sequence: 0\` — indica que no se usa la secuencia normal
- \`TicketSequence: N\` — el número del Ticket a consumir

El Ticket se destruye automáticamente al usarse, liberando la reserva.

### Cancelar Tickets no usados

Si ya no necesitas un Ticket, puedes cancelarlo para liberar la reserva. No existe una transacción específica para cancelar Tickets. En su lugar, puedes usar una transacción \`AccountSet\` vacía (sin cambios) que consuma el Ticket.`,
        en: `A **Ticket** is a mechanism that allows sending transactions **outside the normal sequential order**. Normally, each transaction on Xahau must use the next \`Sequence\` number of the account. Tickets eliminate this restriction by reserving sequence numbers in advance.

### What is a Ticket?

Each account on Xahau has a \`Sequence\` number that increments with each transaction. This means transactions must be processed in strict order. Tickets solve this problem:

- A Ticket **reserves** a sequence number for future use
- The transaction using a Ticket specifies \`TicketSequence\` instead of \`Sequence\`
- Tickets can be used in **any order**, regardless of when they were created

### What are Tickets for?

- **Parallel transactions**: Prepare and sign multiple transactions without depending on order
- **Pre-signed transactions**: Sign transactions in advance and send them when convenient
- **Multi-signing**: Different signers can prepare independent transactions without blocking the sequence
- **Contingencies**: Have backup transactions ready without consuming the normal sequence

### TicketCreate: reserving Tickets

The \`TicketCreate\` transaction reserves one or more sequence numbers:

| Field | Description |
|---|---|
| \`TransactionType\` | \`"TicketCreate"\` |
| \`Account\` | Account reserving the tickets |
| \`TicketCount\` | Number of tickets to create (1-250) |

### Reserve cost

Each Ticket created consumes an **owner reserve** from the account, just like a TrustLine or a DEX offer. This means for each active Ticket you need additional XAH locked in your account. The Ticket is deleted (and the reserve released) when used or cancelled.

### Limits

- **Maximum per transaction**: You can create up to **250 Tickets** in a single \`TicketCreate\` transaction
- **Maximum per account**: An account can have up to **250 Tickets** active simultaneously
- Tickets **do not expire** — they remain in the ledger until used or cancelled

### Using a Ticket in a transaction

To use a Ticket, include these fields in your transaction:
- \`Sequence: 0\` — indicates the normal sequence is not used
- \`TicketSequence: N\` — the Ticket number to consume

The Ticket is automatically destroyed when used, releasing the reserve.

### Cancelling unused Tickets

If you no longer need a Ticket, you can cancel it to release the reserve. There is no specific transaction to cancel Tickets. Instead, you can use an empty \`AccountSet\` transaction (no changes) that consumes the Ticket.`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear Tickets y usarlos para encadenar múltiples pagos",
            en: "Create Tickets and use them to chain multiple payments",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function paymentsWithTickets() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // === PASO 1: Crear 3 Tickets ===
  console.log("=== Paso 1: Crear Tickets ===");
  const ticketCreate = {
    TransactionType: "TicketCreate",
    Account: sender.address,
    TicketCount: 3, // Reservar 3 tickets
  };

  const prepTicket = await client.autofill(ticketCreate);
  const signedTicket = sender.sign(prepTicket);
  const resultTicket = await client.submitAndWait(signedTicket.tx_blob);

  console.log("TicketCreate:", resultTicket.result.meta.TransactionResult);

  if (resultTicket.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error creando tickets.");
    await client.disconnect();
    return;
  }

  // Extraer los TicketSequence de los nodos creados
  const ticketSequences = resultTicket.result.meta.AffectedNodes
    .filter((n) => n.CreatedNode?.LedgerEntryType === "Ticket")
    .map((n) => n.CreatedNode.NewFields.TicketSequence)
    .sort((a, b) => a - b);

  console.log("Tickets creados:", ticketSequences);

  // === PASO 2: Usar los Tickets para enviar pagos (en cualquier orden) ===
  console.log("\\n=== Paso 2: Enviar pagos con Tickets ===");

  const destinations = [
    { address: "rDestino1XXXXXXXXXXXXXXXXXXXXXXXXX", amount: 5,  label: "Pago A" },
    { address: "rDestino2XXXXXXXXXXXXXXXXXXXXXXXXX", amount: 10, label: "Pago B" },
    { address: "rDestino3XXXXXXXXXXXXXXXXXXXXXXXXX", amount: 15, label: "Pago C" },
  ];

  // Podemos enviarlos en cualquier orden, incluso en paralelo
  // Aquí los enviamos en orden inverso para demostrar la flexibilidad
  for (let i = destinations.length - 1; i >= 0; i--) {
    const dest = destinations[i];
    const ticketSeq = ticketSequences[i];

    const payment = {
      TransactionType: "Payment",
      Account: sender.address,
      Destination: dest.address,
      Amount: xahToDrops(dest.amount),
      Sequence: 0,               // No usar secuencia normal
      TicketSequence: ticketSeq,  // Usar el Ticket reservado
    };

    const prepared = await client.autofill(payment);
    // autofill puede sobreescribir Sequence, así que lo forzamos
    prepared.Sequence = 0;
    prepared.TicketSequence = ticketSeq;

    const signed = sender.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const txResult = result.result.meta.TransactionResult;
    console.log(\`\${dest.label} (Ticket \${ticketSeq}): \${txResult} → \${dest.amount} XAH\`);
  }

  console.log("\\n¡Todos los pagos enviados con Tickets!");
  console.log("Los Tickets usados se han destruido y la reserva liberada.");

  await client.disconnect();
}

paymentsWithTickets();`,
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es un Ticket?", en: "What is a Ticket?", jp: "" },
          content: {
            es: "Reserva números de secuencia por adelantado\n\n• Permite transacciones fuera de orden\n• Sequence: 0 + TicketSequence: N\n• Se destruye al usarse\n• Máximo 250 por cuenta\n\nCada Ticket consume reserva de propietario",
            en: "Reserves sequence numbers in advance\n\n• Allows out-of-order transactions\n• Sequence: 0 + TicketSequence: N\n• Destroyed when used\n• Maximum 250 per account\n\nEach Ticket consumes owner reserve",
            jp: "",
          },
          visual: "🎫",
        },
        {
          title: { es: "Casos de uso", en: "Use cases", jp: "" },
          content: {
            es: "• Transacciones paralelas sin bloqueo\n• Pre-firmar txs para enviar después\n• Multi-signing independiente\n• Contingencias y respaldos\n\nTicketCreate → Reservar (1-250)\nUsar → Sequence: 0 + TicketSequence\nCancelar → AccountSet vacío con Ticket",
            en: "• Parallel transactions without blocking\n• Pre-sign txs to send later\n• Independent multi-signing\n• Contingencies and fallbacks\n\nTicketCreate → Reserve (1-250)\nUse → Sequence: 0 + TicketSequence\nCancel → Empty AccountSet with Ticket",
            jp: "",
          },
          visual: "🔀",
        },
        {
          title: { es: "Tickets vs Secuencia normal", en: "Tickets vs Normal Sequence", jp: "" },
          content: {
            es: "Secuencia normal:\n• Estricto orden: 1, 2, 3, 4...\n• Si falla la 2, la 3 se bloquea\n\nCon Tickets:\n• Cualquier orden: 3, 1, 2...\n• Independientes entre sí\n• Cada uno consume owner reserve\n• Se liberan al usarse o cancelarse",
            en: "Normal sequence:\n• Strict order: 1, 2, 3, 4...\n• If 2 fails, 3 is blocked\n\nWith Tickets:\n• Any order: 3, 1, 2...\n• Independent from each other\n• Each consumes owner reserve\n• Released when used or cancelled",
            jp: "",
          },
          visual: "⚖️",
        },
      ],
    },
    {
      id: "m10l4",
      title: {
        es: "ClaimReward: reclamar recompensas de la red",
        en: "ClaimReward: Claiming Network Rewards",
        jp: "",
      },
      theory: {
        es: `Xahau cuenta con un sistema de **recompensas nativas** que distribuye XAH a las cuentas que participan activamente en la red. La transacción \`ClaimReward\` permite reclamar estas recompensas acumuladas.

### ¿Cómo funcionan las recompensas en Xahau?

A diferencia de blockchains Proof of Stake donde necesitas hacer staking, en Xahau las recompensas se distribuyen a cuentas que mantienen un balance activo en la red. El mecanismo funciona así:

- Las recompensas se acumulan automáticamente en función de tu balance de XAH
- Para recibirlas, debes enviar periódicamente una transacción \`ClaimReward\`
- Al reclamar, las recompensas se añaden directamente al balance de tu cuenta
- No necesitas delegar, bloquear fondos ni ejecutar un nodo validador

### Transacción ClaimReward

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"ClaimReward"\` |
| \`Account\` | Tu cuenta que reclama la recompensa |
| \`Issuer\` | La dirección del emisor de recompensas (genesis account de la red) |
| \`Flags\` |  \`1\` para cancelar el recibir recompensas |

### Activar y reclamar recompensas

La primera vez que envías \`ClaimReward\`, **activas** tu cuenta para recibir recompensas. Las siguientes ejecuciones reclaman las recompensas acumuladas desde la última vez. Es recomendable reclamar periódicamente (por ejemplo, una vez al día o a la semana) para mantener tus recompensas al día.

### Desactivar recompensas

Si por algún motivo quieres dejar de participar en el sistema de recompensas, puedes enviar \`ClaimReward\` con \`Flags: 1\`. Esto desactiva tu cuenta del sistema de recompensas.

### Consideraciones

- Las recompensas dependen del balance y del tiempo transcurrido desde la última reclamación
- El fee de la transacción \`ClaimReward\` es estándar (como cualquier otra transacción)
- Es compatible con cuentas que tengan Hooks instalados
- La dirección de \`Issuer\` es específica de cada red (testnet vs mainnet)`,
        en: `Xahau has a **native rewards system** that distributes XAH to accounts that actively participate in the network. The \`ClaimReward\` transaction allows you to claim these accumulated rewards.

### How do rewards work on Xahau?

Unlike Proof of Stake blockchains where you need to stake, on Xahau rewards are distributed to accounts that maintain an active XAH balance. The mechanism works as follows:

- Rewards accumulate automatically based on your XAH balance
- To receive them, you must periodically send a \`ClaimReward\` transaction
- When claiming, rewards are added directly to your account balance
- You don't need to delegate, lock funds, or run a validator node

### ClaimReward transaction

| Field | Description |
|---|---|
| \`TransactionType\` | \`"ClaimReward"\` |
| \`Account\` | Your account claiming the reward |
| \`Issuer\` | The reward issuer address (network genesis account) |
| \`Flags\` | \`1\` to stop receiving rewards |

### Activating and claiming rewards

The first time you send \`ClaimReward\`, you **activate** your account to receive rewards. Subsequent executions claim the rewards accumulated since the last time. It is recommended to claim periodically (for example, once a day or week) to keep your rewards up to date.

### Deactivating rewards

If for any reason you want to stop participating in the rewards system, you can send \`ClaimReward\` with \`Flags: 1\`. This deactivates your account from the rewards system.

### Considerations

- Rewards depend on the balance and time elapsed since the last claim
- The \`ClaimReward\` transaction fee is standard (like any other transaction)
- Compatible with accounts that have Hooks installed
- The \`Issuer\` address is specific to each network (testnet vs mainnet)`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Reclamar recompensas de la red",
            en: "Claim network rewards",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function claimReward() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Consultar información de la cuenta antes de reclamar
  const accountInfo = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balanceBefore = Number(accountInfo.result.account_data.Balance) / 1_000_000;
  console.log("=== Estado antes de reclamar ===");
  console.log("Cuenta:", wallet.address);
  console.log("Balance actual:", balanceBefore, "XAH");

  // Enviar ClaimReward
  // Issuer: cuenta genesis de la red (varía entre testnet y mainnet)
  const claimReward = {
    TransactionType: "ClaimReward",
    Account: wallet.address,
    Issuer: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh", // Genesis account testnet
  };

  const prepared = await client.autofill(claimReward);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("\\n=== ClaimReward ===");
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    // Consultar balance después
    const accountAfter = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const balanceAfter = Number(accountAfter.result.account_data.Balance) / 1_000_000;
    console.log("\\n=== Estado después de reclamar ===");
    console.log("Balance nuevo:", balanceAfter, "XAH");
    console.log("Recompensa obtenida:", (balanceAfter - balanceBefore).toFixed(6), "XAH");
  }

  await client.disconnect();
}

claimReward();`,
        },
      ],
      slides: [
        {
          title: { es: "ClaimReward", en: "ClaimReward", jp: "" },
          content: {
            es: "Recompensas nativas de Xahau\n\n• Se acumulan según tu balance de XAH\n• No requiere staking ni nodos\n• ClaimReward para reclamarlas\n• Se suman directamente a tu balance\n\nReclamar periódicamente (diario/semanal)",
            en: "Native Xahau rewards\n\n• Accumulated based on your XAH balance\n• No staking or nodes required\n• ClaimReward to collect them\n• Added directly to your balance\n\nClaim periodically (daily/weekly)",
            jp: "",
          },
          visual: "🎁",
        },
        {
          title: { es: "Cómo reclamar", en: "How to claim", jp: "" },
          content: {
            es: "1ª vez → Activa tu cuenta para recompensas\nSiguientes → Reclama lo acumulado\n\nCampos:\n• Account: tu cuenta\n• Issuer: genesis account de la red\n• Flags: 0 (reclamar) / 1 (desactivar)\n\nFee estándar, compatible con Hooks",
            en: "1st time → Activates your account for rewards\nSubsequent → Claims accumulated amount\n\nFields:\n• Account: your account\n• Issuer: network genesis account\n• Flags: 0 (claim) / 1 (deactivate)\n\nStandard fee, compatible with Hooks",
            jp: "",
          },
          visual: "💰",
        },
      ],
    },
    {
      id: "m10l5",
      title: {
        es: "Invoke: activar Hooks bajo demanda",
        en: "Invoke: Activating Hooks on Demand",
        jp: "",
      },
      theory: {
        es: `La transacción \`Invoke\` es un tipo de transacción exclusivo de Xahau que permite **activar un Hook deliberadamente**, sin necesidad de enviar un pago u otra transacción con efecto económico. Es la forma de "llamar" a un Hook de forma directa.

### ¿Por qué existe Invoke?

Los Hooks se ejecutan reactivamente cuando una transacción pasa por la cuenta. Pero hay situaciones donde necesitas activar un Hook **sin que ocurra ninguna otra acción**:

- **Cron jobs / tareas programadas**: Un Hook que necesita ejecutarse periódicamente para comprobar condiciones o emitir transacciones
- **Triggers manuales**: Activar la lógica de un Hook cuando lo decides, sin enviar fondos
- **Hooks de servicio**: Hooks diseñados para ser invocados directamente y que realizan una acción autónoma en respuesta

### Transacción Invoke

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"Invoke"\` |
| \`Account\` | Cuenta que envía el Invoke |
| \`Destination\` | (Opcional) Cuenta cuyo Hook queremos activar. Si no se especifica, activa los Hooks de la propia cuenta |

### Invoke como mecanismo

Podemos usar Invoke por distintos motivos:

- Que un Hook emita un \`Invoke\` para activar otro Hook distinto
- Utilizar el \`Invoke\` como un trigger manual para activar la lógica de un Hook cuando lo necesitemos cada cierto tiempo
- Añadir información en la transacción \`Invoke\` (por ejemplo, en \`Memos\` o \`HookParameters\`) para pasar información a un Hook

### Invoke a tu propia cuenta vs a otra cuenta

- **Sin Destination**: El \`Invoke\` activa los Hooks de tu propia cuenta. Útil para Hooks de mantenimiento o auto-gestión
- **Con Destination**: El \`Invoke\` activa los Hooks de la cuenta de destino. El Hook de destino puede distinguir quién envió el Invoke y actuar en consecuencia

### Consideraciones

- \`Invoke\` no transfiere fondos, es solo un trigger
- El Hook que queramos activar, deberá tener \`Invoke\` habilitado en su \`HookOn\` para reaccionar.
- El fee es estándar, como cualquier otra transacción
- Más adelante se implementó en Xahau la transacción \`CronSet\` para programar tareas de forma nativa, pero \`Invoke\` sigue siendo útil para casos personalizados o para activar Hooks de otras cuentas`,
        en: `The \`Invoke\` transaction is a transaction type exclusive to Xahau that allows **deliberately activating a Hook**, without needing to send a payment or any other transaction with economic effect. It is the way to "call" a Hook directly.

### Why does Invoke exist?

Hooks execute reactively when a transaction passes through the account. But there are situations where you need to activate a Hook **without any other action occurring**.

### Invoke transaction

| Field | Description |
|---|---|
| \`TransactionType\` | \`"Invoke"\` |
| \`Account\` | Account sending the Invoke |
| \`Destination\` | (Optional) Account whose Hook we want to activate. If not specified, activates the Hooks of the account itself |

### Invoke as a mechanism

We can use Invoke for different purposes:

- A Hook emits an \`Invoke\` to activate a different Hook
- Use \`Invoke\` as a manual trigger to activate a Hook's logic when needed
- Add information to the \`Invoke\` transaction (for example, in \`Memos\` or \`HookParameters\`) to pass data to a Hook

### Invoke to your own account vs another account

- **Without Destination**: The \`Invoke\` activates the Hooks of your own account. Useful for maintenance or self-management Hooks
- **With Destination**: The \`Invoke\` activates the Hooks of the destination account. The destination Hook can identify who sent the Invoke and act accordingly

### Considerations

- \`Invoke\` does not transfer funds, it is only a trigger
- The Hook we want to activate must have \`Invoke\` enabled in its \`HookOn\` to react
- The fee is standard, like any other transaction
- Later, Xahau implemented the \`CronSet\` transaction for native task scheduling, but \`Invoke\` remains useful for custom cases or for activating Hooks on other accounts`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Invocar un Hook en otra cuenta",
            en: "Invoke a Hook on another account",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function invokeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Invoke a otra cuenta que tiene un Hook instalado
  const invoke = {
    TransactionType: "Invoke",
    Account: wallet.address,
    Destination: "rCuentaConHookInstalado", // Cuenta cuyo Hook queremos activar
  };

  const prepared = await client.autofill(invoke);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Invoke ===");
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("Si había un Hook instalado, comprueba si se ha invocado correctamente.");
  }

  await client.disconnect();
}

invokeHook();`,
        },
        
      ],
      slides: [
        {
          title: { es: "Invoke", en: "Invoke", jp: "" },
          content: {
            es: "Activar un Hook directamente\n\n• No transfiere fondos\n• Solo es un trigger para el Hook\n• Sin Destination → tus propios Hooks\n• Con Destination → Hooks de otra cuenta\n\nEl Hook debe tener Invoke en su HookOn",
            en: "Activate a Hook directly\n\n• Does not transfer funds\n• Just a trigger for the Hook\n• No Destination → your own Hooks\n• With Destination → another account's Hooks\n\nThe Hook must have Invoke enabled in HookOn",
            jp: "",
          },
          visual: "📡",
        },
        {
          title: { es: "Casos de uso de Invoke", en: "Invoke use cases", jp: "" },
          content: {
            es: "• Hook emite un Invoke para activar\n  otro Hook distinto\n• Trigger manual: activar lógica de un\n  Hook cuando lo necesites\n• Pasar datos al Hook via Memos\n  o HookParameters en el Invoke\n\nPara scheduling nativo usa CronSet.\nInvoke sigue siendo útil para casos\npersonalizados o Hooks de otras cuentas",
            en: "• A Hook emits an Invoke to activate\n  another Hook\n• Manual trigger: activate a Hook's logic\n  whenever you need it\n• Pass data to the Hook via Memos\n  or HookParameters in the Invoke\n\nFor native scheduling use CronSet.\nInvoke is still useful for custom cases\nor activating other accounts' Hooks",
            jp: "",
          },
          visual: "⚡",
        },
      ],
    },
    {
      id: "m10l6",
      title: {
        es: "SetRemarks: metadata en objetos del ledger",
        en: "SetRemarks: Metadata on Ledger Objects",
        jp: "",
      },
      theory: {
        es: `La transacción \`SetRemarks\` permite adjuntar **pares clave-valor** a objetos existentes del ledger de Xahau. No es una forma de enviar mensajes ni de registrar datos en transacciones: es un mecanismo para **anotar objetos del ledger** (cuentas, ofertas, escrows, cheques, URITokens, TrustLines...) con metadata que queda asociada al propio objeto.

### ¿Qué tipos de objetos admiten Remarks?

\`SetRemarks\` puede adjuntar metadata a los siguientes tipos de objetos del ledger:

- **AccountRoot** — la cuenta en sí (dirección, balance, flags)
- **Offer** — ofertas en el DEX
- **Escrow** — pagos condicionales
- **Ticket** — tickets de secuencia
- **PayChannel** — canales de pago
- **Check** — cheques
- **DepositPreauth** — preautorizaciones de depósito
- **URIToken** — tokens no fungibles
- **RippleState** — TrustLines

Solo el **propietario o emisor** del objeto puede modificar sus Remarks (excepto en URITokens y TrustLines, donde es el emisor del token quien tiene permiso).

### Campos de SetRemarks

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| \`TransactionType\` | String | Sí | \`"SetRemarks"\` |
| \`Account\` | String | Sí | Cuenta que envía la transacción (debe ser propietario/emisor del objeto) |
| \`ObjectID\` | Hash256 | Sí | ID del objeto del ledger al que se adjuntan las Remarks |
| \`Remarks\` | Array | Sí | Array de objetos \`Remark\` a crear, modificar o eliminar |

### Estructura de cada Remark

Cada elemento del array contiene un objeto \`Remark\` con:

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| \`RemarkName\` | Blob | Sí | Nombre/clave de la Remark (1–256 bytes). Debe ser único por objeto |
| \`RemarkValue\` | Blob | No | Valor de la Remark (1–256 bytes). **Omitir para eliminar** la Remark |
| \`Flags\` | UInt32 | No | \`1\` (\`tfImmutable\`) hace la Remark **permanente e inmodificable** |

Los valores de \`RemarkName\` y \`RemarkValue\` se expresan en **hexadecimal**.

### Obtener el ObjectID de una cuenta

Para adjuntar Remarks a tu propia cuenta (AccountRoot), necesitas su \`ObjectID\`, que es el campo \`index\` del objeto en el ledger:

\`\`\`javascript
const info = await client.request({
  command: "account_info",
  account: wallet.address,
  ledger_index: "validated",
});
const objectID = info.result.account_data.index;
\`\`\`

Para otros objetos (Escrow, Check, Offer...) el \`ObjectID\` es el \`LedgerIndex\` que aparece en los \`AffectedNodes\` al crear el objeto.

### Eliminar una Remark

Omite \`RemarkValue\` en el objeto \`Remark\` correspondiente. Xahau eliminará esa entrada del objeto.

### Remarks inmutables

Si añades \`Flags: 1\` (\`tfImmutable\`) al crear una Remark, **no podrá ser modificada ni eliminada** en el futuro. Útil para certificaciones o datos que deban quedar sellados permanentemente.

### Límites y costes

- **Máximo 32 Remarks** por objeto del ledger
- **Fee adicional**: 1 drop por cada byte de \`RemarkName\` + \`RemarkValue\` en la transacción
- Nombre y valor: entre 1 y 256 bytes cada uno
- Los nombres deben ser únicos dentro del mismo objeto

### Errores comunes

| Error | Causa |
|---|---|
| \`temDISABLED\` | La amendment Remarks no está activa en la red |
| \`tecNO_PERMISSION\` | La cuenta no es propietaria/emisora del objeto |
| \`tecIMMUTABLE\` | Se intenta modificar una Remark con \`tfImmutable\` |
| \`tecTOO_MANY_REMARKS\` | El objeto ya tiene 32 Remarks (el máximo permitido) |`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Añadir y actualizar Remarks en tu cuenta (AccountRoot)",
            en: "Add and update Remarks on your account (AccountRoot)",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// Los RemarkName y RemarkValue se expresan en hexadecimal
function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function setAccountRemarks() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Obtener el ObjectID del AccountRoot (campo "index" de account_info)
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;

  console.log("=== SetRemarks en AccountRoot ===");
  console.log("Cuenta:", wallet.address);
  console.log("ObjectID:", objectID);

  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("nombre"),
          RemarkValue: toHex("Xahau Academy Demo"),
        },
      },
      {
        Remark: {
          RemarkName: toHex("web"),
          RemarkValue: toHex("https://xahau.academy"),
        },
      },
      {
        // Remark inmutable: no se podrá modificar ni eliminar nunca
        Remark: {
          RemarkName: toHex("creado"),
          RemarkValue: toHex(new Date().toISOString()),
          Flags: 1, // tfImmutable
        },
      },
    ],
  };

  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("\\nResultado:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("\\nRemarks adjuntadas al AccountRoot.");
    console.log("Nota: la Remark 'creado' es inmutable y no se podrá cambiar.");
  }

  await client.disconnect();
}

setAccountRemarks();`,
        },
        {
          title: {
            es: "Eliminar una Remark (omitir RemarkValue)",
            en: "Delete a Remark (omit RemarkValue)",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function deleteRemark() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Obtener el ObjectID del AccountRoot
  const info = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const objectID = info.result.account_data.index;

  // Para eliminar una Remark: incluir solo RemarkName, sin RemarkValue
  const setRemarks = {
    TransactionType: "SetRemarks",
    Account: wallet.address,
    ObjectID: objectID,
    Remarks: [
      {
        Remark: {
          RemarkName: toHex("web"), // Eliminar la Remark con nombre "web"
          // Sin RemarkValue → se elimina la entrada
        },
      },
      {
        Remark: {
          RemarkName: toHex("nombre"), // Actualizar el valor de "nombre"
          RemarkValue: toHex("Cuenta actualizada"),
        },
      },
    ],
  };

  const prepared = await client.autofill(setRemarks);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Eliminar/actualizar Remarks ===");
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("Remark 'web' eliminada.");
    console.log("Remark 'nombre' actualizada.");
  } else if (txResult === "tecIMMUTABLE") {
    console.log("No se puede modificar: alguna Remark tiene el flag tfImmutable.");
  }

  await client.disconnect();
}

deleteRemark();`,
        },
      ],
      slides: [
        {
          title: { es: "SetRemarks", en: "SetRemarks", jp: "" },
          content: {
            es: "Metadata clave-valor en objetos del ledger\n\n• Adjunta Remarks a: AccountRoot, Offer,\n  Escrow, Check, URIToken, TrustLine...\n• RemarkName + RemarkValue (en hex)\n• Solo el propietario/emisor puede modificar\n• Máximo 32 Remarks por objeto\n\nNo es un mensaje: es metadata del objeto",
            en: "Key-value metadata on ledger objects\n\n• Attach Remarks to: AccountRoot, Offer,\n  Escrow, Check, URIToken, TrustLine...\n• RemarkName + RemarkValue (in hex)\n• Only the owner/issuer can modify\n• Maximum 32 Remarks per object\n\nNot a message: it is object metadata",
            jp: "",
          },
          visual: "🏷️",
        },
        {
          title: { es: "Crear, modificar y eliminar", en: "Create, modify and delete", jp: "" },
          content: {
            es: "Crear / actualizar:\n  → RemarkName + RemarkValue\n\nEliminar:\n  → Solo RemarkName, sin RemarkValue\n\nInmutable (tfImmutable = Flags: 1):\n  → No se puede modificar ni eliminar nunca\n\nFee extra: 1 drop por byte de nombre + valor",
            en: "Create / update:\n  → RemarkName + RemarkValue\n\nDelete:\n  → RemarkName only, no RemarkValue\n\nImmutable (tfImmutable = Flags: 1):\n  → Cannot be modified or deleted ever\n\nExtra fee: 1 drop per byte of name + value",
            jp: "",
          },
          visual: "✏️",
        },
        {
          title: { es: "ObjectID: ¿qué objeto anotar?", en: "ObjectID: which object to annotate?", jp: "" },
          content: {
            es: "Cada objeto del ledger tiene un ID único:\n\n• AccountRoot → account_data.index\n• Escrow, Check, Offer → LedgerIndex\n  de los AffectedNodes al crear el objeto\n\nSetRemarks necesita ese ID para saber\na qué objeto adjuntar la metadata",
            en: "Each ledger object has a unique ID:\n\n• AccountRoot → account_data.index\n• Escrow, Check, Offer → LedgerIndex\n  from AffectedNodes when creating the object\n\nSetRemarks needs that ID to know\nwhich object to attach the metadata to",
            jp: "",
          },
          visual: "🔍",
        },
      ],
    },
    {
      id: "m10l7",
      title: {
        es: "Remit: transacción multi-función",
        en: "Remit: Multi-function Transaction",
        jp: "",
      },
      theory: {
        es: `La transacción \`Remit\` es una operación exclusiva de Xahau que combina múltiples acciones en una sola transacción. Puede **activar cuentas**, **enviar pagos** (XAH o IOUs) y realizar **operaciones con URITokens** (transferir o mintear), todo de una vez. Además, **paga todos los fees** de activación de cuenta, TrustLines y reservas de URITokens.

### ¿Por qué usar Remit?

En lugar de enviar varias transacciones separadas (una para activar la cuenta, otra para pagar, otra para transferir un URIToken), \`Remit\` lo hace todo en una sola transacción atómica. Esto ahorra tiempo, fees y garantiza que todas las operaciones ocurren juntas o ninguna.

### Campos de Remit

| Campo | Requerido | Descripción |
|---|---|---|
| \`Account\` | Sí | Cuenta que envía la transacción |
| \`Destination\` | Sí | Cuenta de destino |
| \`Amounts\` | No | Array de hasta **32** objetos \`AmountEntry\` con pagos |
| \`URITokenIDs\` | No | Array de hasta **32** IDs de URITokens a transferir |
| \`MintURIToken\` | No | Objeto para mintear un nuevo URIToken directamente en el destino |
| \`DestinationTag\` | No | Tag numérico para el destino |
| \`Inform\` | No | Cuenta con Hook que será notificada de la transacción |
| \`Blob\` | No | Datos arbitrarios en hex (hasta 128 KB) para uso de Hooks |
| \`InvoiceID\` | No | Identificador de 256 bits para el motivo de la transacción |

### AmountEntry

Cada entrada del array \`Amounts\` contiene un campo \`Amount\` que puede ser XAH nativo (string de drops) o un IOU (objeto con \`currency\`, \`issuer\`, \`value\`):

\`\`\`
"Amounts": [
  { "AmountEntry": { "Amount": "50000000" } },              // 50 XAH
  { "AmountEntry": { "Amount": {                             // 100 USD
    "currency": "USD",
    "issuer": "rEmisorDelToken",
    "value": "100"
  }}}
]
\`\`\`

No se permiten cantidades duplicadas de la misma divisa en el array.

### MintURIToken

El campo \`MintURIToken\` permite crear un nuevo URIToken que se asigna directamente a la cuenta de destino:

| Campo | Descripción |
|---|---|
| \`URI\` | URI del token (máximo 256 bytes, en hex) |
| \`Digest\` | (Opcional) Hash del contenido apuntado por el URI |
| \`Flags\` | (Opcional) \`1\` (\`tfBurnable\`) permite al emisor quemar el token posteriormente |

### Transferir URITokens

Con \`URITokenIDs\` puedes transferir hasta 32 URITokens existentes al destino en una sola transacción. Los URITokens deben pertenecer a la cuenta que envía y tener los permisos necesarios.

### Fees y reservas

Remit paga automáticamente los costes adicionales asociados a cada acción:
- **Activación de cuenta**: Si la cuenta de destino no existe, se activa con la reserva base
- **TrustLines**: Si se envían IOUs y la cuenta de destino necesita nuevas TrustLines, se crean y se cubre la reserva
- **Reservas de URITokens**: Las reservas por URITokens transferidos o minteados se cubren automáticamente

Todos estos costes se deducen de la cuenta que envía la transacción (\`Account\`), además del fee estándar de la transacción.

### Más información

Para una referencia completa de \`Remit\`, incluyendo todos los campos y errores posibles, consulta la [documentación oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/remit/).`,
        en: `The \`Remit\` transaction is an operation exclusive to Xahau that combines multiple actions in a single transaction. It can **activate accounts**, **send payments** (XAH or IOUs) and perform **URIToken operations** (transfer or mint), all at once. It also **pays all fees** for account activation, TrustLines and URIToken reserves.

### Why use Remit?

Instead of sending several separate transactions (one to activate the account, one to pay, one to transfer a URIToken), \`Remit\` does it all in a single atomic transaction. This saves time, fees and ensures all operations happen together or not at all.

### Remit fields

| Field | Required | Description |
|---|---|---|
| \`Account\` | Yes | Account sending the transaction |
| \`Destination\` | Yes | Destination account |
| \`Amounts\` | No | Array of up to **32** \`AmountEntry\` objects with payments |
| \`URITokenIDs\` | No | Array of up to **32** URIToken IDs to transfer |
| \`MintURIToken\` | No | Object to mint a new URIToken directly at the destination |
| \`DestinationTag\` | No | Numeric tag for the destination |
| \`Inform\` | No | Account with Hook that will be notified of the transaction |
| \`Blob\` | No | Arbitrary data in hex (up to 128 KB) for Hook use |
| \`InvoiceID\` | No | 256-bit identifier for the reason of the transaction |

### AmountEntry

Each entry in the \`Amounts\` array contains an \`Amount\` field that can be native XAH (drops string) or an IOU (object with \`currency\`, \`issuer\`, \`value\`):

\`\`\`
"Amounts": [
  { "AmountEntry": { "Amount": "50000000" } },              // 50 XAH
  { "AmountEntry": { "Amount": {                             // 100 USD
    "currency": "USD",
    "issuer": "rTokenIssuer",
    "value": "100"
  }}}
]
\`\`\`

Duplicate amounts in the same currency are not allowed in the array.

### MintURIToken

The \`MintURIToken\` field allows creating a new URIToken assigned directly to the destination account:

| Field | Description |
|---|---|
| \`URI\` | Token URI (maximum 256 bytes, in hex) |
| \`Digest\` | (Optional) Hash of the content pointed to by the URI |
| \`Flags\` | (Optional) \`1\` (\`tfBurnable\`) allows the issuer to burn the token later |

### Transferring URITokens

With \`URITokenIDs\` you can transfer up to 32 existing URITokens to the destination in a single transaction. The URITokens must belong to the sending account and have the necessary permissions.

### Fees and reserves

Remit automatically pays the additional costs associated with each action:
- **Account activation**: If the destination account does not exist, it is activated with the base reserve
- **TrustLines**: If IOUs are sent and the destination account needs new TrustLines, they are created and the reserve is covered
- **URIToken reserves**: Reserves for transferred or minted URITokens are covered automatically

All these costs are deducted from the sending account (\`Account\`), plus the standard transaction fee.

### More information

For a complete reference to \`Remit\`, including all fields and possible errors, see the [official documentation](https://xahau.network/docs/protocol-reference/transactions/transaction-types/remit/).`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Remit: pago + minteo de URIToken en una sola transacción",
            en: "Remit: payment + URIToken minting in a single transaction",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function sendRemit() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Remit: enviar 25 XAH + mintear un URIToken para el destino
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: "rDireccionDelDestinatario",
    // Enviar 25 XAH
    Amounts: [
      {
        AmountEntry: {
          Amount: xahToDrops(25),
        },
      },
    ],
    // Mintear un URIToken directamente en la cuenta de destino
    MintURIToken: {
      URI: stringToHex("ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json"),
      Digest: "A".repeat(64), // Hash SHA-256 del contenido (64 hex chars)
      Flags: 1, // tfBurnable: el emisor puede quemar el token
    },
  };

  const prepared = await client.autofill(remit);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Remit ===");
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("\\nEn una sola transacción:");
    console.log("- Enviados 25 XAH al destino");
    console.log("- URIToken minteado directamente en la cuenta destino");
    console.log("- Fees de reservas cubiertos automáticamente");
  }

  await client.disconnect();
}

sendRemit();`,
        },
      ],
      slides: [
        {
          title: { es: "Remit — Transacción multi-función", en: "Remit — Multi-function Transaction", jp: "" },
          content: {
            es: "Una transacción para todo:\n\n• Activar cuentas nuevas\n• Enviar hasta 32 pagos (XAH + IOUs)\n• Transferir hasta 32 URITokens\n• Mintear un URIToken en el destino\n\nTodo atómico: ocurre junto o no ocurre",
            en: "One transaction for everything:\n\n• Activate new accounts\n• Send up to 32 payments (XAH + IOUs)\n• Transfer up to 32 URITokens\n• Mint a URIToken at the destination\n\nAll atomic: happens together or not at all",
            jp: "",
          },
          visual: "📦",
        },
        {
          title: { es: "Remit paga las reservas", en: "Remit pays the reserves", jp: "" },
          content: {
            es: "El emisor cubre todos los costes:\n\n• Activación de cuenta destino\n• Creación de TrustLines necesarias\n• Reservas de URITokens\n• Fee estándar de la transacción\n\nAhorra fees y garantiza atomicidad\nvs múltiples transacciones separadas",
            en: "The sender covers all costs:\n\n• Destination account activation\n• Creation of required TrustLines\n• URIToken reserves\n• Standard transaction fee\n\nSaves fees and guarantees atomicity\nvs multiple separate transactions",
            jp: "",
          },
          visual: "💸",
        },
      ],
    },
    {
      id: "m10l8",
      title: {
        es: "CronSet: ejecución automática de Hooks",
        en: "CronSet: Automatic Hook Execution",
        jp: "",
      },
      theory: {
        es: `La transacción \`CronSet\` permite programar la **ejecución automática y periódica** de un Hook directamente desde el protocolo de Xahau, sin depender de ningún servicio externo. Es el mecanismo nativo de cron jobs de la red.

### ¿Qué es CronSet?

Con \`CronSet\` puedes indicar a Xahau que ejecute el Hook de tu cuenta de forma recurrente: cada X segundos, a partir de una fecha concreta, un número determinado de veces. Todo queda registrado en el ledger y la red se encarga de la ejecución.

A diferencia del patrón \`Invoke\` periódico (donde un servicio externo envía transacciones), \`CronSet\` es **completamente on-chain**: no necesitas ningún script externo que esté corriendo constantemente.

### Requisitos previos

Antes de usar \`CronSet\` debes preparar la cuenta con tu Hook en dos pasos:

1. **Instalar un Hook con el flag \`hsfCOLLECT\`**: Este flag indica que el Hook está diseñado para ser invocado automáticamente por el sistema de crons de la red.

2. **Activar TSH Collect en tu cuenta** (\`asfTshCollect\`, \`SetFlag: 11\`): Permite que la red ejecute tu Hook mediante el mecanismo de Transaction Signature Hook Collection.

\`\`\`javascript
// Activar TSH Collect
const accountSet = {
  TransactionType: "AccountSet",
  Account: wallet.address,
  SetFlag: 11, // asfTshCollect
};
\`\`\`

### Campos de CronSet

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| \`TransactionType\` | String | Sí | \`"CronSet"\` |
| \`Account\` | String | Sí | La cuenta cuyo Hook se ejecutará periódicamente |
| \`StartTime\` | Number | No | Ripple Epoch del primer disparo. Usa \`0\` para ejecución inmediata. Omitir al eliminar |
| \`RepeatCount\` | Number | No | Número de veces que se ejecutará el Hook (máximo 256 por transacción). Omitir al eliminar |
| \`DelaySeconds\` | Number | No | Segundos entre cada ejecución. Omitir al eliminar |

**Reglas importantes**:
- \`DelaySeconds\` y \`RepeatCount\` deben estar presentes los dos, o ausentes los dos
- Para eliminar un cron activo: omite todos los campos de programación y añade \`Flags: 1\` (\`tfCronUnset\`)
- No puedes combinar \`tfCronUnset\` con campos de programación

### Tiempo en Ripple Epoch

Xahau usa la **Ripple Epoch** (segundos desde el 1 de enero de 2000 UTC), no el Unix timestamp:

\`\`\`javascript
// Convertir fecha actual a Ripple Epoch
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// Programar para dentro de 1 hora
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

Usa \`0\` en \`StartTime\` para que el cron empiece a ejecutarse desde el próximo ledger válido.

### Límites y restricciones

| Parámetro | Límite |
|---|---|
| \`RepeatCount\` máximo por transacción | 256 |
| \`DelaySeconds\` máximo | 31.536.000 s (365 días) |
| \`StartTime\` máximo hacia el futuro | 365 días |
| \`StartTime\` en el pasado | No permitido (\`tecEXPIRED\`) |

Si necesitas más de 256 repeticiones, envía otro \`CronSet\` antes de que se agoten para ampliar el contador.

### Eliminar un CronSet

Para cancelar un cron activo, envía \`CronSet\` con \`Flags: 1\`:

\`\`\`javascript
const cronDelete = {
  TransactionType: "CronSet",
  Account: wallet.address,
  Flags: 1, // tfCronUnset — elimina el cron activo
};
\`\`\`

### Errores comunes

| Error | Causa |
|---|---|
| \`temDISABLED\` | La feature CronSet no está activada en la red |
| \`temMALFORMED\` | Combinación de campos inválida (p.ej. solo uno de \`DelaySeconds\`/\`RepeatCount\`) |
| \`tecEXPIRED\` | \`StartTime\` en el pasado o más de 365 días en el futuro |
| \`tefBAD_LEDGER\` | No existe el objeto Cron que se intenta eliminar |`,
        en: `The \`CronSet\` transaction allows scheduling the **automatic and periodic execution** of a Hook directly from the Xahau protocol, without depending on any external service. It is the network's native cron job mechanism.

### What is CronSet?

With \`CronSet\` you can instruct Xahau to execute your account's Hook recurrently: every X seconds, starting from a specific date, a certain number of times. Everything is recorded in the ledger and the network handles the execution.

Unlike the periodic \`Invoke\` pattern (where an external service sends transactions), \`CronSet\` is **completely on-chain**: you don't need any external script running constantly.

### Prerequisites

Before using \`CronSet\` you must prepare the account with your Hook in two steps:

1. **Install a Hook with the \`hsfCOLLECT\` flag**: This flag indicates the Hook is designed to be invoked automatically by the network's cron system.

2. **Enable TSH Collect on your account** (\`asfTshCollect\`, \`SetFlag: 11\`): Allows the network to execute your Hook via the Transaction Signature Hook Collection mechanism.

\`\`\`javascript
// Enable TSH Collect
const accountSet = {
  TransactionType: "AccountSet",
  Account: wallet.address,
  SetFlag: 11, // asfTshCollect
};
\`\`\`

### CronSet fields

| Field | Type | Required | Description |
|---|---|---|---|
| \`TransactionType\` | String | Yes | \`"CronSet"\` |
| \`Account\` | String | Yes | The account whose Hook will run periodically |
| \`StartTime\` | Number | No | Ripple Epoch of the first trigger. Use \`0\` for immediate execution. Omit when deleting |
| \`RepeatCount\` | Number | No | Number of times the Hook will execute (maximum 256 per transaction). Omit when deleting |
| \`DelaySeconds\` | Number | No | Seconds between each execution. Omit when deleting |

**Important rules**:
- \`DelaySeconds\` and \`RepeatCount\` must both be present, or both absent
- To delete an active cron: omit all scheduling fields and add \`Flags: 1\` (\`tfCronUnset\`)
- You cannot combine \`tfCronUnset\` with scheduling fields

### Time in Ripple Epoch

Xahau uses the **Ripple Epoch** (seconds since January 1, 2000 UTC), not the Unix timestamp:

\`\`\`javascript
// Convert current date to Ripple Epoch
const rippleEpoch = Math.floor(Date.now() / 1000) - 946684800;

// Schedule for 1 hour from now
const startIn1Hour = rippleEpoch + 3600;
\`\`\`

Use \`0\` in \`StartTime\` for the cron to start executing from the next valid ledger.

### Limits and restrictions

| Parameter | Limit |
|---|---|
| Maximum \`RepeatCount\` per transaction | 256 |
| Maximum \`DelaySeconds\` | 31,536,000 s (365 days) |
| Maximum \`StartTime\` into the future | 365 days |
| \`StartTime\` in the past | Not allowed (\`tecEXPIRED\`) |

If you need more than 256 repetitions, send another \`CronSet\` before they run out to extend the counter.

### Deleting a CronSet

To cancel an active cron, send \`CronSet\` with \`Flags: 1\`:

\`\`\`javascript
const cronDelete = {
  TransactionType: "CronSet",
  Account: wallet.address,
  Flags: 1, // tfCronUnset — deletes the active cron
};
\`\`\`

### Common errors

| Error | Cause |
|---|---|
| \`temDISABLED\` | The CronSet feature is not enabled on the network |
| \`temMALFORMED\` | Invalid field combination (e.g. only one of \`DelaySeconds\`/\`RepeatCount\`) |
| \`tecEXPIRED\` | \`StartTime\` in the past or more than 365 days into the future |
| \`tefBAD_LEDGER\` | The Cron object being deleted does not exist |`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Activar TSH Collect y programar un CronSet",
            en: "Enable TSH Collect and schedule a CronSet",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function setupCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  console.log("Cuenta:", wallet.address);

  // === PASO 1: Activar TSH Collect en la cuenta ===
  // Necesario para que la red pueda ejecutar el Hook automáticamente
  console.log("\\n=== Paso 1: Activar TSH Collect (asfTshCollect) ===");

  const accountSet = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    SetFlag: 11, // asfTshCollect
  };

  const prepAccountSet = await client.autofill(accountSet);
  const signedAccountSet = wallet.sign(prepAccountSet);
  const resultAccountSet = await client.submitAndWait(signedAccountSet.tx_blob);

  console.log("AccountSet resultado:", resultAccountSet.result.meta.TransactionResult);

  if (resultAccountSet.result.meta.TransactionResult !== "tesSUCCESS") {
    console.log("Error activando TSH Collect.");
    await client.disconnect();
    return;
  }

  // === PASO 2: Crear el CronSet ===
  // El Hook debe estar instalado con hsfCOLLECT antes de este paso
  console.log("\\n=== Paso 2: Crear CronSet ===");

  // Ripple Epoch: segundos desde 01/01/2000 00:00:00 UTC
  const RIPPLE_EPOCH_OFFSET = 946684800;

  const cronSet = {
    TransactionType: "CronSet",
    Account: wallet.address,
    StartTime: 0,       // 0 = comenzar desde el próximo ledger válido
    DelaySeconds: 3600, // Ejecutar cada 1 hora (3600 segundos)
    RepeatCount: 24,    // Ejecutar 24 veces en total (= 24 horas)
  };

  const prepCron = await client.autofill(cronSet);
  const signedCron = wallet.sign(prepCron);
  const resultCron = await client.submitAndWait(signedCron.tx_blob);

  const txResult = resultCron.result.meta.TransactionResult;
  console.log("CronSet resultado:", txResult);
  console.log("Hash:", signedCron.hash);

  if (txResult === "tesSUCCESS") {
    console.log("\\n¡CronSet creado correctamente!");
    console.log("El Hook se ejecutará automáticamente cada 1 hora durante 24 horas.");
    console.log("Asegúrate de que el Hook está instalado con el flag hsfCOLLECT.");
  }

  await client.disconnect();
}

setupCron();`,
        },
        {
          title: {
            es: "Eliminar un CronSet activo",
            en: "Delete an active CronSet",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function deleteCron() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  console.log("=== Eliminar CronSet activo ===");
  console.log("Cuenta:", wallet.address);

  // Para eliminar un cron: omitir todos los campos de programación
  // y añadir Flags: 1 (tfCronUnset)
  const cronDelete = {
    TransactionType: "CronSet",
    Account: wallet.address,
    Flags: 1, // tfCronUnset — elimina el cron activo
  };

  const prepared = await client.autofill(cronDelete);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Resultado:", txResult);
  console.log("Hash:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("\\nCronSet eliminado. El Hook ya no se ejecutará automáticamente.");
  } else if (txResult === "tefBAD_LEDGER") {
    console.log("\\nNo existe un CronSet activo para esta cuenta.");
  }

  await client.disconnect();
}

deleteCron();`,
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es CronSet?", en: "What is CronSet?", jp: "" },
          content: {
            es: "Ejecución periódica de Hooks on-chain\n\n• Sin servicios externos\n• StartTime: cuándo empieza\n• DelaySeconds: cada cuánto\n• RepeatCount: cuántas veces (máx 256)\n\nRequiere Hook con hsfCOLLECT + TSH Collect activo",
            en: "Periodic on-chain Hook execution\n\n• No external services\n• StartTime: when it starts\n• DelaySeconds: how often\n• RepeatCount: how many times (max 256)\n\nRequires Hook with hsfCOLLECT + TSH Collect enabled",
            jp: "",
          },
          visual: "⏱️",
        },
        {
          title: { es: "Configurar CronSet", en: "Setting up CronSet", jp: "" },
          content: {
            es: "Pasos:\n1. Instalar Hook con flag hsfCOLLECT\n2. AccountSet SetFlag: 11 (asfTshCollect)\n3. Enviar CronSet con:\n   • StartTime: 0 (inmediato) o Ripple Epoch\n   • DelaySeconds: intervalo en segundos\n   • RepeatCount: nº de ejecuciones\n\nEliminar: CronSet con Flags: 1 (tfCronUnset)",
            en: "Steps:\n1. Install Hook with hsfCOLLECT flag\n2. AccountSet SetFlag: 11 (asfTshCollect)\n3. Send CronSet with:\n   • StartTime: 0 (immediate) or Ripple Epoch\n   • DelaySeconds: interval in seconds\n   • RepeatCount: number of executions\n\nDelete: CronSet with Flags: 1 (tfCronUnset)",
            jp: "",
          },
          visual: "🔧",
        },
        {
          title: { es: "Invoke vs CronSet", en: "Invoke vs CronSet", jp: "" },
          content: {
            es: "Invoke periódico:\n• Trigger externo (script, servidor)\n• Flexible, cualquier intervalo\n• Depende de un servicio activo\n\nCronSet:\n• Completamente on-chain\n• Sin infraestructura extra\n• Máx 256 repeticiones por tx\n• Límite: DelaySeconds ≤ 365 días\n\nCronSet = autonomía total del Hook",
            en: "Periodic Invoke:\n• External trigger (script, server)\n• Flexible, any interval\n• Depends on an active service\n\nCronSet:\n• Fully on-chain\n• No extra infrastructure\n• Max 256 repetitions per tx\n• Limit: DelaySeconds ≤ 365 days\n\nCronSet = full Hook autonomy",
            jp: "",
          },
          visual: "⚖️",
        },
      ],
    },
  ],
}
