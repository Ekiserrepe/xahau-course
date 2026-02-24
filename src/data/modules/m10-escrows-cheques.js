export default {
  id: "m10",
  icon: "🔐",
  title: {
    es: "Otras transacciones disponibles",
    en: "",
    jp: "",
  },
  lessons: [
    {
      id: "m10l1",
      title: {
        es: "Escrows: pagos condicionales",
        en: "",
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
      id: "m10l2",
      title: {
        es: "Cheques: pagos diferidos",
        en: "",
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
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear un cheque",
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
    {
      id: "m10l3",
      title: {
        es: "Tickets: secuencias fuera de orden",
        en: "",
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
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Crear Tickets y usarlos para encadenar múltiples pagos",
            en: "",
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
          title: { es: "¿Qué es un Ticket?", en: "", jp: "" },
          content: {
            es: "Reserva números de secuencia por adelantado\n\n• Permite transacciones fuera de orden\n• Sequence: 0 + TicketSequence: N\n• Se destruye al usarse\n• Máximo 250 por cuenta\n\nCada Ticket consume reserva de propietario",
            en: "",
            jp: "",
          },
          visual: "🎫",
        },
        {
          title: { es: "Casos de uso", en: "", jp: "" },
          content: {
            es: "• Transacciones paralelas sin bloqueo\n• Pre-firmar txs para enviar después\n• Multi-signing independiente\n• Contingencias y respaldos\n\nTicketCreate → Reservar (1-250)\nUsar → Sequence: 0 + TicketSequence\nCancelar → AccountSet vacío con Ticket",
            en: "",
            jp: "",
          },
          visual: "🔀",
        },
        {
          title: { es: "Tickets vs Secuencia normal", en: "", jp: "" },
          content: {
            es: "Secuencia normal:\n• Estricto orden: 1, 2, 3, 4...\n• Si falla la 2, la 3 se bloquea\n\nCon Tickets:\n• Cualquier orden: 3, 1, 2...\n• Independientes entre sí\n• Cada uno consume owner reserve\n• Se liberan al usarse o cancelarse",
            en: "",
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
        en: "",
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
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Reclamar recompensas de la red",
            en: "",
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
          title: { es: "ClaimReward", en: "", jp: "" },
          content: {
            es: "Recompensas nativas de Xahau\n\n• Se acumulan según tu balance de XAH\n• No requiere staking ni nodos\n• ClaimReward para reclamarlas\n• Se suman directamente a tu balance\n\nReclamar periódicamente (diario/semanal)",
            en: "",
            jp: "",
          },
          visual: "🎁",
        },
        {
          title: { es: "Cómo reclamar", en: "", jp: "" },
          content: {
            es: "1ª vez → Activa tu cuenta para recompensas\nSiguientes → Reclama lo acumulado\n\nCampos:\n• Account: tu cuenta\n• Issuer: genesis account de la red\n• Flags: 0 (reclamar) / 1 (desactivar)\n\nFee estándar, compatible con Hooks",
            en: "",
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
        en: "",
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
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Invocar un Hook en otra cuenta",
            en: "",
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
          title: { es: "Invoke", en: "", jp: "" },
          content: {
            es: "Activar un Hook directamente\n\n• No transfiere fondos\n• Solo es un trigger para el Hook\n• Sin Destination → tus propios Hooks\n• Con Destination → Hooks de otra cuenta\n\nEl Hook debe tener Invoke en su HookOn",
            en: "",
            jp: "",
          },
          visual: "📡",
        },
        {
          title: { es: "Invoke como Cron", en: "", jp: "" },
          content: {
            es: "Patrón para tareas programadas:\n\n1. Hook comprueba si pasó el intervalo\n2. Si sí → ejecuta lógica (emit, state...)\n3. Servicio externo envía Invoke periódico\n\nUsos: pagos recurrentes, comprobaciones,\nactualizaciones de estado, mantenimiento",
            en: "",
            jp: "",
          },
          visual: "⏰",
        },
      ],
    },
    {
      id: "m10l6",
      title: {
        es: "Remarks: datos arbitrarios en el ledger",
        en: "",
        jp: "",
      },
      theory: {
        es: `La transacción \`Remark\` permite almacenar **datos arbitrarios** directamente en el ledger de Xahau. Es un mecanismo para registrar información on-chain sin que implique transferencia de fondos ni cambios de estado de la cuenta.

### ¿Qué es una Remark?

Una \`Remark\` es un tipo de transacción que sirve para escribir datos en la blockchain de forma permanente. No modifica balances, no crea objetos en el ledger y no altera el estado de la cuenta más allá del número de secuencia y el fee consumido.

### ¿Para qué sirve?

- **Registro inmutable**: Guardar un hash, un mensaje o cualquier dato que quieras que quede registrado de forma permanente en la blockchain
- **Prueba de existencia**: Demostrar que un dato existía en un momento determinado (timestamping)
- **Mensajes on-chain**: Enviar datos o mensajes a otra cuenta que se registran en el ledger
- **Notarizaciones**: Registrar hashes de documentos, contratos o eventos para auditoría
- **Metadata para Hooks**: Un Hook puede reaccionar a una \`Remark\` y procesar los datos incluidos en los Memos

### Transacción Remark

| Campo | Descripción |
|---|---|
| \`TransactionType\` | \`"Remark"\` |
| \`Account\` | Cuenta que envía la remark |
| \`Destination\` | (Opcional) Cuenta de destino |
| \`Memos\` | Array de memos con los datos a registrar |

Los datos se incluyen en el campo \`Memos\`, que es un array de objetos \`Memo\` con tres campos opcionales:

- \`MemoType\`: Tipo/categoría del dato (en hexadecimal)
- \`MemoData\`: El dato en sí (en hexadecimal)
- \`MemoFormat\`: Formato del dato, por ejemplo \`text/plain\` o \`application/json\` (en hexadecimal)

### Remark vs Payment con Memos

Podrías pensar en usar un \`Payment\` de 1 drop con Memos para lograr algo similar. Sin embargo, \`Remark\` tiene ventajas:

- **No transfiere fondos**: No necesitas enviar ni 1 drop
- **Intención clara**: Es semánticamente correcto — el propósito es registrar datos, no pagar
- **Compatible con Hooks**: Los Hooks pueden filtrar específicamente transacciones \`Remark\` con \`HookOn\`
- **Sin efectos secundarios**: No altera balances de ninguna cuenta

### Consideraciones

- El fee es estándar, como cualquier otra transacción
- Los datos en los Memos están en hexadecimal — necesitas convertir strings a hex
- El tamaño de los Memos tiene un límite según el protocolo
- Los datos son **públicos** — cualquiera puede leerlos en el ledger`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Registrar datos en el ledger con Remark",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// Función auxiliar para convertir strings a hexadecimal
function stringToHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function sendRemark() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Ejemplo 1: Registrar un hash de documento (notarización)
  const documentHash = "a1b2c3d4e5f6..."; // Hash SHA-256 de tu documento

  const remark = {
    TransactionType: "Remark",
    Account: wallet.address,
    Destination: "rCuentaDeDestinoOpcional",
    Memos: [
      {
        Memo: {
          MemoType: stringToHex("document/hash"),
          MemoData: stringToHex(documentHash),
          MemoFormat: stringToHex("text/plain"),
        },
      },
      {
        Memo: {
          MemoType: stringToHex("document/name"),
          MemoData: stringToHex("Contrato de servicio v2.1"),
          MemoFormat: stringToHex("text/plain"),
        },
      },
    ],
  };

  const prepared = await client.autofill(remark);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Remark ===");
  console.log("Resultado:", txResult);
  console.log("Hash de la transacción:", signed.hash);

  if (txResult === "tesSUCCESS") {
    console.log("\\nDatos registrados permanentemente en el ledger.");
    console.log("Cualquiera puede verificar la existencia de este registro");
    console.log("consultando la transacción:", signed.hash);
  }

  await client.disconnect();
}

sendRemark();`,
        },
      ],
      slides: [
        {
          title: { es: "Remark", en: "", jp: "" },
          content: {
            es: "Datos arbitrarios en el ledger\n\n• No transfiere fondos\n• Registra datos permanentes on-chain\n• Los datos van en Memos (hex)\n• Destination opcional\n\nUsos: notarización, timestamping,\nmensajes on-chain, metadata para Hooks",
            en: "",
            jp: "",
          },
          visual: "📋",
        },
        {
          title: { es: "Remark vs Payment con Memos", en: "", jp: "" },
          content: {
            es: "Payment + Memos:\n• Transfiere fondos (mínimo 1 drop)\n• Propósito: enviar dinero\n\nRemark:\n• No transfiere nada\n• Propósito: registrar datos\n• Intención semántica clara\n• Hooks pueden filtrar por tipo Remark\n• Sin efectos en balances",
            en: "",
            jp: "",
          },
          visual: "⚖️",
        },
      ],
    },
    {
      id: "m10l7",
      title: {
        es: "Remit: transacción multi-función",
        en: "",
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
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Remit: pago + minteo de URIToken en una sola transacción",
            en: "",
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
      URI: stringToHex("https://example.com/nft/metadata.json"),
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
        {
          title: {
            es: "Remit: enviar múltiples divisas + transferir URITokens",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function remitMultiple() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Remit combinando: XAH + IOU + transferencia de URITokens
  const remit = {
    TransactionType: "Remit",
    Account: wallet.address,
    Destination: "rDireccionDelDestinatario",
    // Enviar XAH + un IOU
    Amounts: [
      {
        AmountEntry: {
          Amount: xahToDrops(10), // 10 XAH
        },
      },
      {
        AmountEntry: {
          Amount: {
            currency: "USD",
            issuer: "rEmisorDelToken",
            value: "50", // 50 USD
          },
        },
      },
    ],
    // Transferir URITokens existentes
    URITokenIDs: [
      "A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4E5F6A1B2",
    ],
  };

  const prepared = await client.autofill(remit);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("=== Remit múltiple ===");
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("\\nTodo en una sola transacción atómica:");
    console.log("- 10 XAH enviados");
    console.log("- 50 USD enviados (TrustLine creada si no existía)");
    console.log("- URIToken transferido al destino");
  }

  await client.disconnect();
}

remitMultiple();`,
        },
      ],
      slides: [
        {
          title: { es: "Remit — Transacción multi-función", en: "", jp: "" },
          content: {
            es: "Una transacción para todo:\n\n• Activar cuentas nuevas\n• Enviar hasta 32 pagos (XAH + IOUs)\n• Transferir hasta 32 URITokens\n• Mintear un URIToken en el destino\n\nTodo atómico: ocurre junto o no ocurre",
            en: "",
            jp: "",
          },
          visual: "📦",
        },
        {
          title: { es: "Remit paga las reservas", en: "", jp: "" },
          content: {
            es: "El emisor cubre todos los costes:\n\n• Activación de cuenta destino\n• Creación de TrustLines necesarias\n• Reservas de URITokens\n• Fee estándar de la transacción\n\nAhorra fees y garantiza atomicidad\nvs múltiples transacciones separadas",
            en: "",
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
        en: "",
        jp: "",
      },
      theory: {
        es: `La transacción \`CronSet\` permite programar la **ejecución automática y periódica** de un Hook directamente desde el protocolo de Xahau, sin depender de ningún servicio externo. Es el mecanismo nativo de cron jobs de la red.

### ¿Qué es CronSet?

Con \`CronSet\` puedes indicar a Xahau que ejecute el Hook de tu cuenta de forma recurrente: cada X segundos, a partir de una fecha concreta, un número determinado de veces. Todo queda registrado en el ledger y la red se encarga de la ejecución.

A diferencia del patrón \`Invoke\` periódico (donde un servicio externo envía transacciones), \`CronSet\` es **completamente on-chain**: no necesitas ningún script externo que esté corriendo constantemente.

### Requisitos previos

Antes de usar \`CronSet\` debes preparar tu cuenta en dos pasos:

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
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Activar TSH Collect y programar un CronSet",
            en: "",
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
            en: "",
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
          title: { es: "¿Qué es CronSet?", en: "", jp: "" },
          content: {
            es: "Ejecución periódica de Hooks on-chain\n\n• Sin servicios externos\n• StartTime: cuándo empieza\n• DelaySeconds: cada cuánto\n• RepeatCount: cuántas veces (máx 256)\n\nRequiere Hook con hsfCOLLECT + TSH Collect activo",
            en: "",
            jp: "",
          },
          visual: "⏱️",
        },
        {
          title: { es: "Configurar CronSet", en: "", jp: "" },
          content: {
            es: "Pasos:\n1. Instalar Hook con flag hsfCOLLECT\n2. AccountSet SetFlag: 11 (asfTshCollect)\n3. Enviar CronSet con:\n   • StartTime: 0 (inmediato) o Ripple Epoch\n   • DelaySeconds: intervalo en segundos\n   • RepeatCount: nº de ejecuciones\n\nEliminar: CronSet con Flags: 1 (tfCronUnset)",
            en: "",
            jp: "",
          },
          visual: "🔧",
        },
        {
          title: { es: "Invoke vs CronSet", en: "", jp: "" },
          content: {
            es: "Invoke periódico:\n• Trigger externo (script, servidor)\n• Flexible, cualquier intervalo\n• Depende de un servicio activo\n\nCronSet:\n• Completamente on-chain\n• Sin infraestructura extra\n• Máx 256 repeticiones por tx\n• Límite: DelaySeconds ≤ 365 días\n\nCronSet = autonomía total del Hook",
            en: "",
            jp: "",
          },
          visual: "⚖️",
        },
      ],
    },
  ],
}
