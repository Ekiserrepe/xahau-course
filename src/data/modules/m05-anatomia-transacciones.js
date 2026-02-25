export default {
  id: "m5b",
  icon: "🔬",
  title: {
    es: "Anatomía de una transacción",
    en: "Anatomy of a transaction",
    jp: "",
  },
  lessons: [
    {
      id: "m5bl1",
      title: {
        es: "Ciclo de vida de una transacción",
        en: "Lifecycle of a transaction",
        jp: "",
      },
      theory: {
        es: `Antes de profundizar en tokens, NFTs o smart contracts, es fundamental entender **cómo funciona una transacción de principio a fin** en Xahau. Este conocimiento te ayudará a diagnosticar problemas y construir aplicaciones robustas.

### El flujo completo

Una transacción en Xahau pasa por **5 fases** desde que la creas hasta que queda registrada permanentemente en el ledger:

1. **Construir** — Defines los campos de la transacción (tipo, origen, destino, cantidad, etc.)
2. **Preparar (autofill)** — El cliente rellena automáticamente campos técnicos (Fee, Sequence, LastLedgerSequence, NetworkID)
3. **Firmar** — Tu clave privada genera una firma criptográfica que demuestra que autorizas la transacción
4. **Enviar** — La transacción firmada se envía a un nodo de la red
5. **Validar** — Los validadores la incluyen en un ledger mediante consenso y el resultado es final

### Fase 1: Construir

Defines un objeto JavaScript con los campos de la transacción:

\`\`\`
const tx = {
  TransactionType: "Payment",
  Account: "rOrigen...",
  Destination: "rDestino...",
  Amount: "1000000",
};
\`\`\`

Solo necesitas los campos **esenciales**. Los campos técnicos se rellenan automáticamente en la siguiente fase.

### Fase 2: Preparar (autofill)

El método \`client.autofill(tx)\` consulta el nodo y rellena los campos que faltan:

- **Fee**: El coste de la transacción (en drops). Se calcula según la carga actual de la red
- **Sequence**: El número de secuencia de tu cuenta (se incrementa con cada transacción)
- **LastLedgerSequence**: El ledger máximo en el que la transacción puede ser incluida (protección contra transacciones "fantasma")
- **NetworkID**: Identificador de la red (testnet vs mainnet)

### Fase 3: Firmar

El método \`wallet.sign(prepared)\` genera:
- Una **firma digital** usando tu clave privada (ed25519 o secp256k1)
- El **tx_blob**: la transacción serializada en formato hexadecimal, lista para enviar

La firma demuestra que **tú y solo tú** autorizaste esta transacción. Nadie puede modificar la transacción después de firmada sin invalidar la firma.

### Fase 4: Enviar

La transacción firmada se envía al nodo con \`client.submit(tx_blob)\` o \`client.submitAndWait(tx_blob)\`:

- **submit**: Envía y devuelve el resultado preliminar inmediatamente
- **submitAndWait**: Envía y **espera** hasta que la transacción sea validada o rechazada

El nodo la propaga a otros nodos de la red.

### Fase 5: Validar (Consenso)

Los validadores de la red deciden si incluir la transacción en el próximo ledger:

1. La transacción llega a las **colas de los validadores**
2. Los validadores proponen incluirla en el próximo ledger
3. Si al menos el **80% de la UNL** está de acuerdo, se incluye
4. El ledger se cierra y el resultado es **final e irreversible**

### ¿Cuánto tarda?

El tiempo desde enviar hasta validar es normalmente de **3 a 5 segundos**, el tiempo que tarda en cerrarse un ledger en Xahau. No hay bloques de 10 minutos como en Bitcoin ni tiempos de confirmación variables.

### Finality: resultados irreversibles

A diferencia de blockchains con finalidad probabilística (Bitcoin, Ethereum), en Xahau el resultado es **determinista**:
- Si una transacción es incluida en un ledger validado, es **final**
- No hay reorgs, ni forks, ni "confirmaciones pendientes"
- \`tesSUCCESS\` = éxito garantizado, para siempre`,
        en: `Before diving into tokens, NFTs, or smart contracts, it is essential to understand **how a transaction works from start to finish** in Xahau. This knowledge will help you diagnose issues and build robust applications.

### The complete flow

A transaction in Xahau goes through **5 phases** from the moment you create it until it is permanently recorded in the ledger:

1. **Build** — You define the transaction fields (type, source, destination, amount, etc.)
2. **Prepare (autofill)** — The client automatically fills in technical fields (Fee, Sequence, LastLedgerSequence, NetworkID)
3. **Sign** — Your private key generates a cryptographic signature proving you authorize the transaction
4. **Submit** — The signed transaction is sent to a network node
5. **Validate** — Validators include it in a ledger through consensus and the result is final

### Phase 1: Build

You define a JavaScript object with the transaction fields:

\`\`\`
const tx = {
  TransactionType: "Payment",
  Account: "rSource...",
  Destination: "rDestination...",
  Amount: "1000000",
};
\`\`\`

You only need the **essential** fields. The technical fields are automatically filled in during the next phase.

### Phase 2: Prepare (autofill)

The \`client.autofill(tx)\` method queries the node and fills in the missing fields:

- **Fee**: The transaction cost (in drops). It is calculated based on the current network load
- **Sequence**: Your account's sequence number (incremented with each transaction)
- **LastLedgerSequence**: The maximum ledger in which the transaction can be included (protection against "ghost" transactions)
- **NetworkID**: Network identifier (testnet vs mainnet)

### Phase 3: Sign

The \`wallet.sign(prepared)\` method generates:
- A **digital signature** using your private key (ed25519 or secp256k1)
- The **tx_blob**: the serialized transaction in hexadecimal format, ready to send

The signature proves that **you and only you** authorized this transaction. No one can modify the transaction after signing without invalidating the signature.

### Phase 4: Submit

The signed transaction is sent to the node using \`client.submit(tx_blob)\` or \`client.submitAndWait(tx_blob)\`:

- **submit**: Sends and returns the preliminary result immediately
- **submitAndWait**: Sends and **waits** until the transaction is validated or rejected

The node propagates it to other nodes in the network.

### Phase 5: Validate (Consensus)

The network validators decide whether to include the transaction in the next ledger:

1. The transaction reaches the **validators' queues**
2. Validators propose including it in the next ledger
3. If at least **80% of the UNL** agrees, it is included
4. The ledger closes and the result is **final and irreversible**

### How long does it take?

The time from submission to validation is typically **3 to 5 seconds**, the time it takes to close a ledger in Xahau. There are no 10-minute blocks like Bitcoin, nor variable confirmation times.

### Finality: irreversible results

Unlike blockchains with probabilistic finality (Bitcoin, Ethereum), in Xahau the result is **deterministic**:
- If a transaction is included in a validated ledger, it is **final**
- There are no reorgs, no forks, no "pending confirmations"
- \`tesSUCCESS\` = guaranteed success, forever`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "El flujo completo paso a paso",
            en: "The complete flow step by step",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function flujoCompleto() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // =============================================
  // FASE 1: Construir la transacción
  // =============================================
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rMXEZJecFdn1dVtE21pZ8duZz2E36KGaCp",
    Amount: "5000000", // 5 XAH en drops
  };

  console.log("1. Transacción construida:");
  console.log("   Tipo:", tx.TransactionType);
  console.log("   Campos definidos:", Object.keys(tx).length);

  // =============================================
  // FASE 2: Preparar (autofill)
  // =============================================
  const prepared = await client.autofill(tx);

  console.log("\\n2. Transacción preparada (autofill):");
  console.log("   Fee:", prepared.Fee, "drops");
  console.log("   Sequence:", prepared.Sequence);
  console.log("   LastLedgerSequence:", prepared.LastLedgerSequence);
  console.log("   NetworkID:", prepared.NetworkID);
  console.log("   Campos totales:", Object.keys(prepared).length);

  // =============================================
  // FASE 3: Firmar
  // =============================================
  const signed = wallet.sign(prepared);

  console.log("\\n3. Transacción firmada:");
  console.log("   Hash:", signed.hash);
  console.log("   tx_blob (primeros 60 chars):", signed.tx_blob.substring(0, 60) + "...");
  console.log("   Longitud del blob:", signed.tx_blob.length, "caracteres hex");

  // =============================================
  // FASE 4: Enviar
  // =============================================
  console.log("\\n4. Enviando al nodo...");
  const result = await client.submitAndWait(signed.tx_blob);

  // =============================================
  // FASE 5: Resultado validado
  // =============================================
  console.log("\\n5. Resultado validado:");
  console.log("   TransactionResult:", result.result.meta.TransactionResult);
  console.log("   Ledger:", result.result.ledger_index);
  console.log("   Nodos afectados:", result.result.meta.AffectedNodes.length);

  await client.disconnect();
}

flujoCompleto().catch(console.error);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function flujoCompleto() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // =============================================
  // PHASE 1: Build the transaction
  // =============================================
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rMXEZJecFdn1dVtE21pZ8duZz2E36KGaCp",
    Amount: "5000000", // 5 XAH in drops
  };

  console.log("1. Transaction built:");
  console.log("   Type:", tx.TransactionType);
  console.log("   Fields defined:", Object.keys(tx).length);

  // =============================================
  // PHASE 2: Prepare (autofill)
  // =============================================
  const prepared = await client.autofill(tx);

  console.log("\\n2. Transacción preparada (autofill):");
  console.log("   Fee:", prepared.Fee, "drops");
  console.log("   Sequence:", prepared.Sequence);
  console.log("   LastLedgerSequence:", prepared.LastLedgerSequence);
  console.log("   NetworkID:", prepared.NetworkID);
  console.log("   Total fields:", Object.keys(prepared).length);

  // =============================================
  // PHASE 3: Sign
  // =============================================
  const signed = wallet.sign(prepared);

  console.log("\\n3. Transacción firmada:");
  console.log("   Hash:", signed.hash);
  console.log("   tx_blob (first 60 chars):", signed.tx_blob.substring(0, 60) + "...");
  console.log("   Blob length:", signed.tx_blob.length, "caracteres hex");

  // =============================================
  // PHASE 4: Submit
  // =============================================
  console.log("\\n4. Enviando al nodo...");
  const result = await client.submitAndWait(signed.tx_blob);

  // =============================================
  // PHASE 5: Validated result
  // =============================================
  console.log("\\n5. Resultado validado:");
  console.log("   TransactionResult:", result.result.meta.TransactionResult);
  console.log("   Ledger:", result.result.ledger_index);
  console.log("   Affected nodes:", result.result.meta.AffectedNodes.length);

  await client.disconnect();
}

flujoCompleto().catch(console.error);`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "5 fases de una transacción", en: "5 phases of a transaction", jp: "" },
          content: {
            es: "1. Construir → Definir campos (tipo, origen, destino)\n2. Preparar → autofill (Fee, Sequence, NetworkID)\n3. Firmar → Firma digital con clave privada\n4. Enviar → submit / submitAndWait\n5. Validar → Consenso → Resultado final",
            en: "1. Build → Define fields (type, source, destination)\n2. Prepare → autofill (Fee, Sequence, NetworkID)\n3. Sign → Digital signature with private key\n4. Submit → submit / submitAndWait\n5. Validate → Consensus → Final result",
            jp: "",
          },
          visual: "📋",
        },
        {
          title: { es: "Autofill: campos automáticos", en: "Autofill: automatic fields", jp: "" },
          content: {
            es: "client.autofill() rellena por ti:\n\n• Fee → Coste según carga de red\n• Sequence → Número de tx de tu cuenta\n• LastLedgerSequence → Protección anti-fantasma\n• NetworkID → Testnet vs Mainnet",
            en: "client.autofill() fills in for you:\n\n• Fee → Cost based on network load\n• Sequence → Your account's tx number\n• LastLedgerSequence → Anti-ghost protection\n• NetworkID → Testnet vs Mainnet",
            jp: "",
          },
          visual: "⚙️",
        },
        {
          title: { es: "Finalidad determinista", en: "Deterministic finality", jp: "" },
          content: {
            es: "Validación en 3-5 segundos\n\n• Sin reorgs ni forks\n• Sin confirmaciones pendientes\n• tesSUCCESS = éxito para siempre\n• Resultado final e irreversible\n\nDiferente a Bitcoin/Ethereum (probabilístico)",
            en: "Validation in 3-5 seconds\n\n• No reorgs or forks\n• No pending confirmations\n• tesSUCCESS = success forever\n• Final and irreversible result\n\nDifferent from Bitcoin/Ethereum (probabilistic)",
            jp: "",
          },
          visual: "✅",
        },
      ],
    },
    {
      id: "m5bl2",
      title: {
        es: "Campos de una transacción",
        en: "Transaction fields",
        jp: "",
      },
      theory: {
        es: `Cada transacción en Xahau es un **objeto con campos específicos**. Algunos campos son obligatorios, otros opcionales, y otros los rellena \`autofill()\`. Entender cada campo te dará control total sobre tus transacciones.

### Campos comunes a todas las transacciones

Estos campos existen en **todo tipo de transacción**:

| Campo | Obligatorio | Descripción |
|---|---|---|
| **TransactionType** | Sí | Tipo: "Payment", "TrustSet", "OfferCreate", etc. |
| **Account** | Sí | Tu dirección (rXXX...) — quién envía la transacción |
| **Fee** | Autofill | Coste en drops (1 XAH = 1,000,000 drops) |
| **Sequence** | Autofill | Número de secuencia de tu cuenta |
| **LastLedgerSequence** | Autofill | Ledger máximo para incluir la tx |
| **NetworkID** | Autofill | ID de la red (21337 para mainnet Xahau) |
| **SigningPubKey** | Auto (firma) | Tu clave pública (se añade al firmar) |
| **TxnSignature** | Auto (firma) | La firma digital (se añade al firmar) |

### TransactionType — Tipos de transacción

Xahau soporta muchos tipos de transacción. Los más comunes:

- [Payment](https://xahau.network/docs/protocol-reference/transactions/transaction-types/payment/) — Enviar XAH o tokens
- [TrustSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/trustset/) — Crear o modificar una trust line
- [OfferCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/) — Crear una oferta en el DEX
- [OfferCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercancel/) — Cancelar una oferta del DEX
- [AccountSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/accountset/) — Configurar flags de tu cuenta
- [SetHook](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/) — Instalar o gestionar Hooks (smart contracts)
- [URITokenMint](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenmint/) — Crear un NFT (URIToken)
- [URITokenBuy](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenbuy/) — Comprar un URIToken
- [URITokenCreateSellOffer](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokencreateselloffer/) — Poner a la venta un URIToken
- [EscrowCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcreate/) — Crear un pago condicional
- [EscrowFinish](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowfinish/) — Completar un escrow
- [EscrowCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcancel/) — Cancelar un escrow

### Fee — El coste de la transacción

El Fee en Xahau funciona diferente a otras blockchains:

- Se expresa en **drops** (1 XAH = 1,000,000 drops)
- El fee base es **12 drops** (0.000012 XAH) — extremadamente barato
- El fee **se quema** — no va a validadores ni a nadie. Se destruye
- Cuando la red está congestionada, el fee puede subir temporalmente (**fee escalation**)
- \`autofill()\` calcula el fee óptimo según la carga actual de la red

### Sequence — Orden de transacciones

El Sequence es un **contador incremental** de tu cuenta:

- Empieza en el número asignado al activar la cuenta
- Se incrementa en 1 con cada transacción exitosa
- Garantiza que las transacciones se procesen **en orden**
- Si envías dos transacciones con el mismo Sequence, solo una se procesará
- Si falta un Sequence intermedio (ej: envías 5, 6, 8 sin 7), las transacciones 8+ quedan en cola hasta que la 7 se resuelva

### LastLedgerSequence — Protección contra fantasmas

El campo LastLedgerSequence es una **fecha de caducidad** para tu transacción:

- Especifica el **número de ledger máximo** en el que puede ser incluida
- Si el ledger actual supera este número y la transacción no se ha procesado, se descarta
- Evita que transacciones "perdidas" se ejecuten minutos u horas después
- \`autofill()\` lo establece automáticamente (normalmente ledger actual + 20)

### Flags — Modificadores de comportamiento

Muchos tipos de transacción aceptan un campo **Flags** que modifica su comportamiento:

- Los flags son **valores numéricos** que se combinan con operaciones de bits
- Ejemplo: \`Flags: 1\` en URITokenMint activa \`tfBurnable\`
- Ejemplo: \`Flags: 131072\` en OfferCreate activa \`tfImmediateOrCancel\`
- Puedes combinar flags sumando sus valores

### Memos — Datos adjuntos

Puedes adjuntar datos a cualquier transacción usando el campo **Memos**:

- **MemoType**: Tipo MIME en hexadecimal (ej: "text/plain")
- **MemoData**: El contenido en hexadecimal
- Los memos son **públicos** y permanentes en el ledger
- No afectan la lógica de la transacción, solo almacenan información adicional
- Si no tienes la necesidad de hacerlo, se recomienda no usar estos campos para no almacenar datos innecesarios en la blockchain`,
        en: `Every transaction in Xahau is an **object with specific fields**. Some fields are required, others are optional, and others are filled in by \`autofill()\`. Understanding each field will give you full control over your transactions.

### Fields common to all transactions

These fields exist in **every transaction type**:

| Field | Required | Description |
|---|---|---|
| **TransactionType** | Yes | Type: "Payment", "TrustSet", "OfferCreate", etc. |
| **Account** | Yes | Your address (rXXX...) — who sends the transaction |
| **Fee** | Autofill | Cost in drops (1 XAH = 1,000,000 drops) |
| **Sequence** | Autofill | Your account's sequence number |
| **LastLedgerSequence** | Autofill | Maximum ledger to include the tx |
| **NetworkID** | Autofill | Network ID (21337 for Xahau mainnet) |
| **SigningPubKey** | Auto (sign) | Your public key (added when signing) |
| **TxnSignature** | Auto (sign) | The digital signature (added when signing) |

### TransactionType — Transaction types

Xahau supports many transaction types. The most common:

- [Payment](https://xahau.network/docs/protocol-reference/transactions/transaction-types/payment/) — Send XAH or tokens
- [TrustSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/trustset/) — Create or modify a trust line
- [OfferCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/) — Create an offer on the DEX
- [OfferCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercancel/) — Cancel a DEX offer
- [AccountSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/accountset/) — Configure your account flags
- [SetHook](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/) — Install or manage Hooks (smart contracts)
- [URITokenMint](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenmint/) — Create an NFT (URIToken)
- [URITokenBuy](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenbuy/) — Buy a URIToken
- [URITokenCreateSellOffer](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokencreateselloffer/) — List a URIToken for sale
- [EscrowCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcreate/) — Create a conditional payment
- [EscrowFinish](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowfinish/) — Complete an escrow
- [EscrowCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcancel/) — Cancel an escrow

### Fee — The transaction cost

The Fee in Xahau works differently from other blockchains:

- It is expressed in **drops** (1 XAH = 1,000,000 drops)
- The base fee is **12 drops** (0.000012 XAH) — extremely cheap
- The fee is **burned** — it does not go to validators or anyone. It is destroyed
- When the network is congested, the fee can temporarily increase (**fee escalation**)
- \`autofill()\` calculates the optimal fee based on the current network load

### Sequence — Transaction ordering

The Sequence is an **incremental counter** for your account:

- It starts at the number assigned when the account is activated
- It increments by 1 with each successful transaction
- It ensures transactions are processed **in order**
- If you send two transactions with the same Sequence, only one will be processed
- If an intermediate Sequence is missing (e.g., you send 5, 6, 8 without 7), transactions 8+ are queued until 7 is resolved

### LastLedgerSequence — Protection against ghost transactions

The LastLedgerSequence field is an **expiration date** for your transaction:

- It specifies the **maximum ledger number** in which it can be included
- If the current ledger exceeds this number and the transaction has not been processed, it is discarded
- It prevents "lost" transactions from executing minutes or hours later
- \`autofill()\` sets it automatically (typically current ledger + 20)

### Flags — Behavior modifiers

Many transaction types accept a **Flags** field that modifies their behavior:

- Flags are **numeric values** combined using bitwise operations
- Example: \`Flags: 1\` in URITokenMint enables \`tfBurnable\`
- Example: \`Flags: 131072\` in OfferCreate enables \`tfImmediateOrCancel\`
- You can combine flags by adding their values

### Memos — Attached data

You can attach data to any transaction using the **Memos** field:

- **MemoType**: MIME type in hexadecimal (e.g., "text/plain")
- **MemoData**: The content in hexadecimal
- Memos are **public** and permanent on the ledger
- They do not affect the transaction logic, they only store additional information
- If you do not need to use them, it is recommended to avoid these fields to prevent storing unnecessary data on the blockchain`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Inspeccionar los campos antes y después de autofill",
            en: "Inspect fields before and after autofill",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `const { Client, Wallet } = require("xahau");

async function inspeccionarCampos() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Transacción con solo los campos esenciales
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rDestinoAqui",
    Amount: "1000000", // 1 XAH
  };

  console.log("=== ANTES de autofill ===");
  console.log("Campos definidos:", Object.keys(tx));
  console.log(JSON.stringify(tx, null, 2));

  // Autofill rellena los campos técnicos
  const prepared = await client.autofill(tx);

  console.log("\\n=== DESPUÉS de autofill ===");
  console.log("Campos totales:", Object.keys(prepared));
  console.log(JSON.stringify(prepared, null, 2));

  // Mostrar los campos que autofill añadió
  const camposNuevos = Object.keys(prepared).filter(
    (k) => !Object.keys(tx).includes(k)
  );
  console.log("\\n=== Campos añadidos por autofill ===");
  for (const campo of camposNuevos) {
    console.log("  " + campo + ":", prepared[campo]);
  }

  await client.disconnect();
}

inspeccionarCampos().catch(console.error);`,
            en: `const { Client, Wallet } = require("xahau");

async function inspeccionarCampos() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Transaction with only the essential fields
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rDestinationHere",
    Amount: "1000000", // 1 XAH
  };

  console.log("=== BEFORE autofill ===");
  console.log("Defined fields:", Object.keys(tx));
  console.log(JSON.stringify(tx, null, 2));

  // Autofill fills in the technical fields
  const prepared = await client.autofill(tx);

  console.log("\\n=== DESPUÉS de autofill ===");
  console.log("Total fields:", Object.keys(prepared));
  console.log(JSON.stringify(prepared, null, 2));

  // Show the fields that autofill added
  const newFields = Object.keys(prepared).filter(
    (k) => !Object.keys(tx).includes(k)
  );
  console.log("\\n=== Campos añadidos por autofill ===");
  for (const field of newFields) {
    console.log("  " + field + ":", prepared[field]);
  }

  await client.disconnect();
}

inspeccionarCampos().catch(console.error);`,
            jp: "",
          },
        },
        {
          title: {
            es: "Construir distintos tipos de transacción",
            en: "Build different transaction types",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `// Ejemplos de cómo se construyen distintos tipos de transacción.
// Solo mostramos los campos esenciales — autofill() rellena el resto.

// --- Payment: enviar XAH ---
const payment = {
  TransactionType: "Payment",
  Account: "rOrigen...",
  Destination: "rDestino...",
  Amount: "5000000", // 5 XAH en drops
};

// --- Payment: enviar token ---
const tokenPayment = {
  TransactionType: "Payment",
  Account: "rOrigen...",
  Destination: "rDestino...",
  Amount: {
    currency: "USD",
    value: "100",
    issuer: "rEmisor...",
  },
};

// --- TrustSet: crear trust line ---
const trustSet = {
  TransactionType: "TrustSet",
  Account: "rReceptor...",
  LimitAmount: {
    currency: "USD",
    value: "10000",
    issuer: "rEmisor...",
  },
};

// --- OfferCreate: crear oferta en el DEX ---
const offer = {
  TransactionType: "OfferCreate",
  Account: "rTrader...",
  TakerPays: { currency: "USD", value: "50", issuer: "rEmisor..." },
  TakerGets: "100000000", // 100 XAH
};

// --- AccountSet: activar flag ---
const accountSet = {
  TransactionType: "AccountSet",
  Account: "rMiCuenta...",
  SetFlag: 8, // asfDefaultRipple
};

// --- URITokenMint: crear NFT ---
const mint = {
  TransactionType: "URITokenMint",
  Account: "rCreador...",
  URI: "68747470733A2F2F...", // URL en hexadecimal
  Flags: 1, // tfBurnable
};

console.log("Cada tipo tiene sus campos específicos.");
console.log("Todos comparten: TransactionType, Account, Fee, Sequence.");`,
            en: `// Examples of how different transaction types are built.
// We only show essential fields — autofill() fills in the rest.

// --- Payment: send XAH ---
const payment = {
  TransactionType: "Payment",
  Account: "rOrigin...",
  Destination: "rDestination...",
  Amount: "5000000", // 5 XAH in drops
};

// --- Payment: send token ---
const tokenPayment = {
  TransactionType: "Payment",
  Account: "rOrigin...",
  Destination: "rDestination...",
  Amount: {
    currency: "USD",
    value: "100",
    issuer: "rIssuer...",
  },
};

// --- TrustSet: create trust line ---
const trustSet = {
  TransactionType: "TrustSet",
  Account: "rReceiver...",
  LimitAmount: {
    currency: "USD",
    value: "10000",
    issuer: "rIssuer...",
  },
};

// --- OfferCreate: create offer on the DEX ---
const offer = {
  TransactionType: "OfferCreate",
  Account: "rTrader...",
  TakerPays: { currency: "USD", value: "50", issuer: "rIssuer..." },
  TakerGets: "100000000", // 100 XAH
};

// --- AccountSet: activate flag ---
const accountSet = {
  TransactionType: "AccountSet",
  Account: "rMyAccount...",
  SetFlag: 8, // asfDefaultRipple
};

// --- URITokenMint: create NFT ---
const mint = {
  TransactionType: "URITokenMint",
  Account: "rCreator...",
  URI: "68747470733A2F2F...", // URL in hexadecimal
  Flags: 1, // tfBurnable
};

console.log("Each type has its specific fields.");
console.log("All share: TransactionType, Account, Fee, Sequence.");`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "Campos comunes", en: "Common fields", jp: "" },
          content: {
            es: "Toda transacción tiene:\n\n• TransactionType → Tipo de operación\n• Account → Quién envía\n• Fee → Coste (en drops, se quema)\n• Sequence → Orden de txs de la cuenta\n• LastLedgerSequence → Caducidad\n• NetworkID → Red (testnet/mainnet)",
            en: "Every transaction has:\n\n• TransactionType → Type of operation\n• Account → Who sends it\n• Fee → Cost (in drops, burned)\n• Sequence → Account tx ordering\n• LastLedgerSequence → Expiration\n• NetworkID → Network (testnet/mainnet)",
            jp: "",
          },
          visual: "📝",
        },
        {
          title: { es: "Tipos de transacción", en: "Transaction types", jp: "" },
          content: {
            es: "• Payment → Enviar XAH o tokens\n• TrustSet → Trust lines\n• OfferCreate/Cancel → DEX\n• AccountSet → Configurar cuenta\n• SetHook → Smart contracts\n• URITokenMint/Buy → NFTs\n• EscrowCreate/Finish → Pagos condicionales",
            en: "• Payment → Send XAH or tokens\n• TrustSet → Trust lines\n• OfferCreate/Cancel → DEX\n• AccountSet → Configure account\n• SetHook → Smart contracts\n• URITokenMint/Buy → NFTs\n• EscrowCreate/Finish → Conditional payments",
            jp: "",
          },
          visual: "📦",
        },
        {
          title: { es: "Fee, Sequence y Flags", en: "Fee, Sequence and Flags", jp: "" },
          content: {
            es: "Fee: 12 drops base (~gratis), se quema\n\nSequence: contador incremental\n• Garantiza orden de ejecución\n• Sin huecos: txs quedan en cola\n\nFlags: modifican comportamiento\n• Se combinan sumando valores\n• Cada tipo tiene sus flags propios",
            en: "Fee: 12 drops base (~free), burned\n\nSequence: incremental counter\n• Ensures execution order\n• No gaps: txs are queued\n\nFlags: modify behavior\n• Combined by adding values\n• Each type has its own flags",
            jp: "",
          },
          visual: "🔢",
        },
      ],
    },
    {
      id: "m5bl3",
      title: {
        es: "Firma digital y serialización",
        en: "Digital signature and serialization",
        jp: "",
      },
      theory: {
        es: `La firma digital es el mecanismo que garantiza que **solo tú puedes autorizar transacciones** desde tu cuenta. Entender cómo funciona te ayudará a comprender la seguridad de Xahau y a depurar problemas de firma.

### ¿Qué es una firma digital?

Una firma digital es una prueba matemática de que:
1. **Tú creaste la transacción** (autenticación)
2. **Nadie la modificó** después de firmarla (integridad)
3. **No puedes negar** haberla firmado (no repudio)

### Algoritmos de firma en Xahau

Xahau soporta dos algoritmos criptográficos:

| Algoritmo | Prefijo del seed | Características |
|---|---|---|
| **ed25519** | sEd... | Más rápido, moderno, recomendado |
| **secp256k1** | s... (sin Ed) | Compatible con Bitcoin/Ethereum, más antiguo |

Cuando generas una wallet con \`Wallet.generate()\`, por defecto se usa **ed25519**. Los seeds que empiezan por \`sEd\` usan ed25519.

### El proceso de firma paso a paso

1. **Serialización**: La transacción (objeto JSON) se convierte a **formato binario** siguiendo el protocolo de Xahau. Cada campo tiene un código de tipo y un orden específico.

2. **Hashing**: El binario serializado se pasa por una función hash (SHA-512 half) para obtener un **resumen de 32 bytes**.

3. **Firma**: Tu clave privada genera una firma criptográfica sobre ese hash. Esta firma solo puede verificarse con tu clave pública.

4. **Ensamblaje**: La firma (\`TxnSignature\`) y tu clave pública (\`SigningPubKey\`) se añaden a la transacción serializada, generando el **tx_blob** final.

### tx_blob: la transacción lista para enviar

El \`tx_blob\` es una cadena hexadecimal que contiene **toda la transacción** (campos + firma) en formato binario. Es lo que realmente se envía a la red:

\`\`\`
wallet.sign(prepared)
// Devuelve: { tx_blob: "1200002280000000...", hash: "A1B2C3..." }
\`\`\`

- **tx_blob**: La transacción serializada y firmada (hex)
- **hash**: El identificador único de la transacción (para buscarla después)

### Verificación de la firma

Cuando un nodo recibe tu tx_blob:

1. Deserializa el blob para extraer los campos
2. Extrae la \`SigningPubKey\` y la \`TxnSignature\`
3. Verifica que la firma corresponde a los datos y la clave pública
4. Verifica que la clave pública corresponde a la dirección \`Account\`
5. Si todo coincide, la transacción es válida

Si alguien modifica **un solo bit** del tx_blob, la firma deja de ser válida y la transacción es rechazada.

### Firma offline

Puedes firmar transacciones **sin conexión a internet**:

1. En un dispositivo conectado: prepara la transacción con \`autofill()\`
2. Copia la transacción preparada a un dispositivo offline
3. En el dispositivo offline: firma con \`wallet.sign()\`
4. Copia el \`tx_blob\` de vuelta al dispositivo conectado
5. Envía con \`client.submit(tx_blob)\`

Esto es útil para **cold wallets** — las claves privadas nunca tocan un dispositivo con internet.

### Multi-firma (MultiSign)

Xahau soporta **multi-firma**: una transacción que requiere la firma de **múltiples cuentas** para ser válida. Se configura con \`SignerListSet\`:

- Defines una lista de firmantes (SignerList) con sus pesos
- Estableces un quórum mínimo
- Cada firmante firma la transacción por separado
- Las firmas se combinan y se envían juntas
- Útil para cuentas compartidas, DAOs, o seguridad adicional`,
        en: `The digital signature is the mechanism that ensures **only you can authorize transactions** from your account. Understanding how it works will help you grasp Xahau's security and debug signing issues.

### What is a digital signature?

A digital signature is a mathematical proof that:
1. **You created the transaction** (authentication)
2. **No one modified it** after signing (integrity)
3. **You cannot deny** having signed it (non-repudiation)

### Signing algorithms in Xahau

Xahau supports two cryptographic algorithms:

| Algorithm | Seed prefix | Characteristics |
|---|---|---|
| **ed25519** | sEd... | Faster, modern, recommended |
| **secp256k1** | s... (no Ed) | Compatible with Bitcoin/Ethereum, older |

When you generate a wallet with \`Wallet.generate()\`, **ed25519** is used by default. Seeds starting with \`sEd\` use ed25519.

### The signing process step by step

1. **Serialization**: The transaction (JSON object) is converted to **binary format** following the Xahau protocol. Each field has a type code and a specific order.

2. **Hashing**: The serialized binary is passed through a hash function (SHA-512 half) to obtain a **32-byte digest**.

3. **Signing**: Your private key generates a cryptographic signature over that hash. This signature can only be verified with your public key.

4. **Assembly**: The signature (\`TxnSignature\`) and your public key (\`SigningPubKey\`) are added to the serialized transaction, generating the final **tx_blob**.

### tx_blob: the transaction ready to send

The \`tx_blob\` is a hexadecimal string containing **the entire transaction** (fields + signature) in binary format. It is what is actually sent to the network:

\`\`\`
wallet.sign(prepared)
// Returns: { tx_blob: "1200002280000000...", hash: "A1B2C3..." }
\`\`\`

- **tx_blob**: The serialized and signed transaction (hex)
- **hash**: The unique transaction identifier (to look it up later)

### Signature verification

When a node receives your tx_blob:

1. It deserializes the blob to extract the fields
2. It extracts the \`SigningPubKey\` and the \`TxnSignature\`
3. It verifies that the signature matches the data and the public key
4. It verifies that the public key corresponds to the \`Account\` address
5. If everything matches, the transaction is valid

If someone modifies **a single bit** of the tx_blob, the signature becomes invalid and the transaction is rejected.

### Offline signing

You can sign transactions **without an internet connection**:

1. On a connected device: prepare the transaction with \`autofill()\`
2. Copy the prepared transaction to an offline device
3. On the offline device: sign with \`wallet.sign()\`
4. Copy the \`tx_blob\` back to the connected device
5. Submit with \`client.submit(tx_blob)\`

This is useful for **cold wallets** — the private keys never touch an internet-connected device.

### Multi-signing (MultiSign)

Xahau supports **multi-signing**: a transaction that requires signatures from **multiple accounts** to be valid. It is configured with \`SignerListSet\`:

- You define a list of signers (SignerList) with their weights
- You set a minimum quorum
- Each signer signs the transaction separately
- The signatures are combined and submitted together
- Useful for shared accounts, DAOs, or additional security`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Firma y verificación del tx_blob",
            en: "Signing and verifying the tx_blob",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function firmaDetallada() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  console.log("=== INFORMACIÓN DE LA WALLET ===");
  console.log("Dirección:", wallet.address);
  console.log("Clave pública:", wallet.publicKey);
  console.log("Algoritmo:", wallet.publicKey.startsWith("ED") ? "ed25519" : "secp256k1");

  // Construir y preparar
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  };

  const prepared = await client.autofill(tx);

  // Firmar
  const signed = wallet.sign(prepared);

  console.log("\\n=== RESULTADO DE LA FIRMA ===");
  console.log("Hash (ID de la tx):", signed.hash);
  console.log("tx_blob completo:", signed.tx_blob);
  console.log("Longitud:", signed.tx_blob.length, "caracteres hex");
  console.log("Tamaño:", signed.tx_blob.length / 2, "bytes");

  // Verificar que la transacción es válida
  // (el nodo hace esto internamente al recibir el submit)
  console.log("\\n=== VERIFICACIÓN ===");

  // Decodificar el blob para inspeccionar
  const decoded = client.request({
    command: "tx",
    transaction: signed.hash,
  }).catch(() => {
    // La tx aún no existe en el ledger, es normal
    console.log("La tx aún no se ha enviado (solo firmada).");
  });

  // Enviar
  console.log("\\nEnviando tx_blob al nodo...");
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);

  // Ahora sí podemos buscarla por hash
  const txInfo = await client.request({
    command: "tx",
    transaction: signed.hash,
  });

  console.log("\\n=== TX EN EL LEDGER ===");
  console.log("Tipo:", txInfo.result.TransactionType);
  console.log("SigningPubKey:", txInfo.result.SigningPubKey);
  console.log("Ledger:", txInfo.result.ledger_index);

  await client.disconnect();
}

firmaDetallada().catch(console.error);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function firmaDetallada() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  console.log("=== WALLET INFORMATION ===");
  console.log("Address:", wallet.address);
  console.log("Public key:", wallet.publicKey);
  console.log("Algorithm:", wallet.publicKey.startsWith("ED") ? "ed25519" : "secp256k1");

  // Build and prepare
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  };

  const prepared = await client.autofill(tx);

  // Sign
  const signed = wallet.sign(prepared);

  console.log("\\n=== RESULTADO DE LA FIRMA ===");
  console.log("Hash (tx ID):", signed.hash);
  console.log("Full tx_blob:", signed.tx_blob);
  console.log("Length:", signed.tx_blob.length, "hex characters");
  console.log("Size:", signed.tx_blob.length / 2, "bytes");

  // Verify that the transaction is valid
  // (the node does this internally upon receiving the submit)
  console.log("\\n=== VERIFICACIÓN ===");

  // Decode the blob to inspect
  const decoded = client.request({
    command: "tx",
    transaction: signed.hash,
  }).catch(() => {
    // The tx doesn't exist in the ledger yet, this is normal
    console.log("The tx has not been submitted yet (only signed).");
  });

  // Submit
  console.log("\\nEnviando tx_blob al nodo...");
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Result:", result.result.meta.TransactionResult);

  // Now we can look it up by hash
  const txInfo = await client.request({
    command: "tx",
    transaction: signed.hash,
  });

  console.log("\\n=== TX EN EL LEDGER ===");
  console.log("Type:", txInfo.result.TransactionType);
  console.log("SigningPubKey:", txInfo.result.SigningPubKey);
  console.log("Ledger:", txInfo.result.ledger_index);

  await client.disconnect();
}

firmaDetallada().catch(console.error);`,
            jp: "",
          },
        },
        {
          title: {
            es: "Firma offline: preparar en un lado, firmar en otro",
            en: "Offline signing: prepare on one side, sign on another",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// =============================================
// PASO 1: En el dispositivo CONECTADO
// Preparar la transacción (necesita conexión)
// =============================================
async function prepararOnline() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const tx = {
    TransactionType: "Payment",
    Account: "rTuDireccionAqui",
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "10000000", // 10 XAH
  };

  const prepared = await client.autofill(tx);
  await client.disconnect();

  // Guardar como JSON para transferir al dispositivo offline
  const txParaFirmar = JSON.stringify(prepared, null, 2);
  console.log("=== COPIA ESTE JSON AL DISPOSITIVO OFFLINE ===");
  console.log(txParaFirmar);

  return prepared;
}

// =============================================
// PASO 2: En el dispositivo OFFLINE (sin internet)
// Firmar la transacción
// =============================================
function firmarOffline(preparedJSON) {
  // La clave privada SOLO existe en el dispositivo offline
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const signed = wallet.sign(preparedJSON);

  console.log("\\n=== COPIA ESTE tx_blob AL DISPOSITIVO CONECTADO ===");
  console.log("tx_blob:", signed.tx_blob);
  console.log("hash:", signed.hash);

  return signed;
}

// =============================================
// PASO 3: En el dispositivo CONECTADO
// Enviar la transacción firmada
// =============================================
async function enviarOnline(txBlob) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const result = await client.submitAndWait(txBlob);
  console.log("\\nResultado:", result.result.meta.TransactionResult);

  await client.disconnect();
}

// Demo del flujo completo (en un solo script para simplicidad)
async function demo() {
  const prepared = await prepararOnline();
  const signed = firmarOffline(prepared);
  await enviarOnline(signed.tx_blob);
}

demo().catch(console.error);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// =============================================
// STEP 1: On the CONNECTED device
// Prepare the transaction (requires connection)
// =============================================
async function prepararOnline() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const tx = {
    TransactionType: "Payment",
    Account: "rYourAddressHere",
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "10000000", // 10 XAH
  };

  const prepared = await client.autofill(tx);
  await client.disconnect();

  // Save as JSON to transfer to the offline device
  const txParaFirmar = JSON.stringify(prepared, null, 2);
  console.log("=== COPY THIS JSON TO THE OFFLINE DEVICE ===");
  console.log(txParaFirmar);

  return prepared;
}

// =============================================
// STEP 2: On the OFFLINE device (no internet)
// Sign the transaction
// =============================================
function firmarOffline(preparedJSON) {
  // The private key ONLY exists on the offline device
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const signed = wallet.sign(preparedJSON);

  console.log("\\n=== COPIA ESTE tx_blob AL DISPOSITIVO CONECTADO ===");
  console.log("tx_blob:", signed.tx_blob);
  console.log("hash:", signed.hash);

  return signed;
}

// =============================================
// STEP 3: On the CONNECTED device
// Submit the signed transaction
// =============================================
async function enviarOnline(txBlob) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const result = await client.submitAndWait(txBlob);
  console.log("\\nResultado:", result.result.meta.TransactionResult);

  await client.disconnect();
}

// Demo of the complete flow (in a single script for simplicity)
async function demo() {
  const prepared = await prepararOnline();
  const signed = firmarOffline(prepared);
  await enviarOnline(signed.tx_blob);
}

demo().catch(console.error);`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es una firma digital?", en: "What is a digital signature?", jp: "" },
          content: {
            es: "Prueba matemática de que:\n\n• Tú creaste la transacción (autenticación)\n• Nadie la modificó (integridad)\n• No puedes negar haberla firmado (no repudio)\n\nAlgoritmos: ed25519 (sEd...) o secp256k1 (s...)",
            en: "Mathematical proof that:\n\n• You created the transaction (authentication)\n• No one modified it (integrity)\n• You cannot deny having signed it (non-repudiation)\n\nAlgorithms: ed25519 (sEd...) or secp256k1 (s...)",
            jp: "",
          },
          visual: "🔏",
        },
        {
          title: { es: "El proceso de firma", en: "The signing process", jp: "" },
          content: {
            es: "1. Serializar → JSON a binario\n2. Hash → SHA-512 half (32 bytes)\n3. Firmar → Clave privada genera firma\n4. Ensamblar → tx_blob (hex)\n\nwallet.sign(prepared)\n→ { tx_blob: \"1200...\", hash: \"A1B2...\" }",
            en: "1. Serialize → JSON to binary\n2. Hash → SHA-512 half (32 bytes)\n3. Sign → Private key generates signature\n4. Assemble → tx_blob (hex)\n\nwallet.sign(prepared)\n→ { tx_blob: \"1200...\", hash: \"A1B2...\" }",
            jp: "",
          },
          visual: "🔐",
        },
        {
          title: { es: "Firma offline y multi-firma", en: "Offline signing and multi-signing", jp: "" },
          content: {
            es: "Firma offline (cold wallet):\n• Preparar online → Firmar offline → Enviar online\n• Claves nunca tocan internet\n\nMulti-firma (MultiSign):\n• Múltiples firmantes con pesos\n• Quórum mínimo configurable\n• Ideal para cuentas compartidas",
            en: "Offline signing (cold wallet):\n• Prepare online → Sign offline → Submit online\n• Keys never touch the internet\n\nMulti-signing (MultiSign):\n• Multiple signers with weights\n• Configurable minimum quorum\n• Ideal for shared accounts",
            jp: "",
          },
          visual: "🧊",
        },
      ],
    },
    {
      id: "m5bl4",
      title: {
        es: "Envío, validación y resultados",
        en: "Submission, validation and results",
        jp: "",
      },
      theory: {
        es: `Una vez firmada la transacción, hay que enviarla a la red y entender los posibles resultados. Xahau tiene un sistema de **códigos de resultado** muy detallado que te indica exactamente qué pasó.

### submit vs submitAndWait

La librería \`xahau\` ofrece dos métodos para enviar transacciones:

**client.submit(tx_blob)**:
- Envía la transacción y devuelve **inmediatamente**
- El resultado preliminar indica si la transacción fue aceptada por el nodo (no si fue validada)
- Necesitas consultar después con \`tx\` para ver el resultado final
- Útil cuando quieres enviar muchas transacciones rápidamente

**client.submitAndWait(tx_blob)**:
- Envía la transacción y **espera** a que sea incluida en un ledger validado
- Devuelve el resultado final directamente
- Más cómodo para la mayoría de casos
- Puede tardar 3-10 segundos (1-2 ledgers)

### Categorías de códigos de resultado

Los resultados de una transacción se dividen en categorías según su **prefijo**:

### tes — Éxito

\`tesSUCCESS\` es el único código de éxito. Significa que la transacción se procesó correctamente y los cambios se aplicaron al ledger.

### tec — Transacción incluida pero falló

Los códigos \`tec\` significan que la transacción fue **incluida en un ledger** (y se cobró el fee), pero la operación **no se ejecutó**:

| Código | Significado |
|---|---|
| **tecUNFUNDED_PAYMENT** | No tienes suficiente balance para el pago |
| **tecNO_LINE** | No existe trust line para el token |
| **tecNO_DST** | La cuenta destino no existe |
| **tecDST_TAG_NEEDED** | La cuenta destino requiere DestinationTag |
| **tecNO_PERMISSION** | No tienes permiso para esta operación |
| **tecINSUFFICIENT_RESERVE** | No tienes suficiente XAH para la reserva del nuevo objeto |
| **tecPATH_DRY** | No se encontró una ruta de pago viable |
| **tecKILLED** | Oferta cancelada por flag tfFillOrKill |

**Importante**: En los errores \`tec\`, el fee **sí se cobra** aunque la operación falle.

### tef — Error antes del procesamiento

Los códigos \`tef\` indican que la transacción fue **rechazada antes de ser procesada**. El fee **no se cobra**:

| Código | Significado |
|---|---|
| **tefPAST_SEQ** | El Sequence ya se usó (transacción duplicada) |
| **tefMAX_LEDGER** | LastLedgerSequence ya pasó (transacción caducada) |
| **tefALREADY** | La transacción ya está en la cola |

### tem — Error de formato

Los códigos \`tem\` indican que la transacción está **mal formada** y nunca podría ser válida:

| Código | Significado |
|---|---|
| **temMALFORMED** | Campos inválidos o formato incorrecto |
| **temBAD_AMOUNT** | Cantidad inválida (negativa, cero en XAH, etc.) |
| **temBAD_FEE** | Fee inválido |
| **temDISABLED** | La funcionalidad está desactivada en esta red |
| **temINVALID_FLAG** | Flag no válido para este tipo de transacción |

### ter — Error temporal (reintentar)

Los códigos \`ter\` indican un error **temporal** que podría resolverse si reintentas:

| Código | Significado |
|---|---|
| **terPRE_SEQ** | Hay una transacción anterior pendiente (Sequence previo) |
| **terQUEUED** | La transacción está en cola esperando (demasiadas en vuelo) |
| **terINSUF_FEE_B** | Fee insuficiente dada la carga actual |

### Leer el resultado completo

El objeto de resultado contiene toda la información que necesitas:

\`\`\`
result.result.meta.TransactionResult  → El código (tesSUCCESS, etc.)
result.result.meta.AffectedNodes      → Qué cambió en el ledger
result.result.ledger_index             → En qué ledger se incluyó
result.result.hash                     → Hash único de la transacción
\`\`\``,
        en: `Once the transaction is signed, you need to send it to the network and understand the possible outcomes. Xahau has a very detailed **result code** system that tells you exactly what happened.

### submit vs submitAndWait

The \`xahau\` library offers two methods for sending transactions:

**client.submit(tx_blob)**:
- Sends the transaction and returns **immediately**
- The preliminary result indicates whether the transaction was accepted by the node (not whether it was validated)
- You need to query later with \`tx\` to see the final result
- Useful when you want to send many transactions quickly

**client.submitAndWait(tx_blob)**:
- Sends the transaction and **waits** until it is included in a validated ledger
- Returns the final result directly
- More convenient for most cases
- May take 3-10 seconds (1-2 ledgers)

### Result code categories

Transaction results are divided into categories based on their **prefix**:

### tes — Success

\`tesSUCCESS\` is the only success code. It means the transaction was processed correctly and the changes were applied to the ledger.

### tec — Transaction included but failed

\`tec\` codes mean the transaction was **included in a ledger** (and the fee was charged), but the operation **was not executed**:

| Code | Meaning |
|---|---|
| **tecUNFUNDED_PAYMENT** | You do not have enough balance for the payment |
| **tecNO_LINE** | No trust line exists for the token |
| **tecNO_DST** | The destination account does not exist |
| **tecDST_TAG_NEEDED** | The destination account requires a DestinationTag |
| **tecNO_PERMISSION** | You do not have permission for this operation |
| **tecINSUFFICIENT_RESERVE** | You do not have enough XAH for the new object's reserve |
| **tecPATH_DRY** | No viable payment path was found |
| **tecKILLED** | Offer canceled by tfFillOrKill flag |

**Important**: For \`tec\` errors, the fee **is still charged** even though the operation fails.

### tef — Error before processing

\`tef\` codes indicate the transaction was **rejected before being processed**. The fee is **not charged**:

| Code | Meaning |
|---|---|
| **tefPAST_SEQ** | The Sequence was already used (duplicate transaction) |
| **tefMAX_LEDGER** | LastLedgerSequence has already passed (expired transaction) |
| **tefALREADY** | The transaction is already in the queue |

### tem — Malformed error

\`tem\` codes indicate the transaction is **malformed** and could never be valid:

| Code | Meaning |
|---|---|
| **temMALFORMED** | Invalid fields or incorrect format |
| **temBAD_AMOUNT** | Invalid amount (negative, zero in XAH, etc.) |
| **temBAD_FEE** | Invalid fee |
| **temDISABLED** | The feature is disabled on this network |
| **temINVALID_FLAG** | Invalid flag for this transaction type |

### ter — Temporary error (retry)

\`ter\` codes indicate a **temporary** error that may resolve if you retry:

| Code | Meaning |
|---|---|
| **terPRE_SEQ** | A previous transaction is pending (prior Sequence) |
| **terQUEUED** | The transaction is queued waiting (too many in flight) |
| **terINSUF_FEE_B** | Insufficient fee given the current load |

### Reading the complete result

The result object contains all the information you need:

\`\`\`
result.result.meta.TransactionResult  → The code (tesSUCCESS, etc.)
result.result.meta.AffectedNodes      → What changed in the ledger
result.result.ledger_index             → Which ledger it was included in
result.result.hash                     → Unique transaction hash
\`\`\``,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Manejar todos los tipos de resultado",
            en: "Handle all result types",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function enviarConManejo() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  };

  try {
    const prepared = await client.autofill(tx);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const codigo = result.result.meta.TransactionResult;

    // Analizar el resultado por categoría
    if (codigo === "tesSUCCESS") {
      console.log("ÉXITO: Transacción procesada correctamente.");
      console.log("Ledger:", result.result.ledger_index);
      console.log("Hash:", signed.hash);

    } else if (codigo.startsWith("tec")) {
      // La tx se incluyó en el ledger pero la operación falló
      // El fee SÍ se cobró
      console.log("FALLO (tec):", codigo);
      console.log("La operación no se ejecutó pero el fee se cobró.");

      // Diagnóstico específico
      switch (codigo) {
        case "tecUNFUNDED_PAYMENT":
          console.log("→ No tienes suficiente balance.");
          break;
        case "tecNO_DST":
          console.log("→ La cuenta destino no existe.");
          break;
        case "tecDST_TAG_NEEDED":
          console.log("→ Falta el DestinationTag.");
          break;
        case "tecINSUFFICIENT_RESERVE":
          console.log("→ No tienes suficiente XAH para la reserva.");
          break;
        default:
          console.log("→ Consulta la documentación para:", codigo);
      }

    } else if (codigo.startsWith("tef")) {
      console.log("RECHAZADA (tef):", codigo);
      console.log("La transacción fue rechazada antes de procesarse.");
      console.log("El fee NO se cobró.");

    } else if (codigo.startsWith("tem")) {
      console.log("MAL FORMADA (tem):", codigo);
      console.log("La transacción tiene un error de formato.");
      console.log("Revisa los campos y los valores.");

    } else if (codigo.startsWith("ter")) {
      console.log("ERROR TEMPORAL (ter):", codigo);
      console.log("Puedes reintentar en unos segundos.");
    }

  } catch (error) {
    console.error("Error de conexión o envío:", error.message);
  }

  await client.disconnect();
}

enviarConManejo().catch(console.error);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function enviarConManejo() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  };

  try {
    const prepared = await client.autofill(tx);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const codigo = result.result.meta.TransactionResult;

    // Analyze the result by category
    if (codigo === "tesSUCCESS") {
      console.log("SUCCESS: Transaction processed correctly.");
      console.log("Ledger:", result.result.ledger_index);
      console.log("Hash:", signed.hash);

    } else if (codigo.startsWith("tec")) {
      // The tx was included in the ledger but the operation failed
      // The fee WAS charged
      console.log("FAILURE (tec):", codigo);
      console.log("The operation did not execute but the fee was charged.");

      // Specific diagnosis
      switch (codigo) {
        case "tecUNFUNDED_PAYMENT":
          console.log("→ Insufficient balance.");
          break;
        case "tecNO_DST":
          console.log("→ Destination account does not exist.");
          break;
        case "tecDST_TAG_NEEDED":
          console.log("→ DestinationTag is missing.");
          break;
        case "tecINSUFFICIENT_RESERVE":
          console.log("→ Insufficient XAH for the reserve.");
          break;
        default:
          console.log("→ Check the documentation for:", codigo);
      }

    } else if (codigo.startsWith("tef")) {
      console.log("REJECTED (tef):", codigo);
      console.log("The transaction was rejected before processing.");
      console.log("The fee was NOT charged.");

    } else if (codigo.startsWith("tem")) {
      console.log("MALFORMED (tem):", codigo);
      console.log("The transaction has a format error.");
      console.log("Check the fields and values.");

    } else if (codigo.startsWith("ter")) {
      console.log("TEMPORARY ERROR (ter):", codigo);
      console.log("You can retry in a few seconds.");
    }

  } catch (error) {
    console.error("Connection or submission error:", error.message);
  }

  await client.disconnect();
}

enviarConManejo().catch(console.error);`,
            jp: "",
          },
        },
        {
          title: {
            es: "Diferencia entre submit y submitAndWait",
            en: "Difference between submit and submitAndWait",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function comparar() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // --- Método 1: submitAndWait (recomendado) ---
  console.log("=== submitAndWait ===");
  const tx1 = await client.autofill({
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  });
  const signed1 = wallet.sign(tx1);

  console.log("Enviando y esperando...");
  const inicio1 = Date.now();
  const result1 = await client.submitAndWait(signed1.tx_blob);
  const tiempo1 = Date.now() - inicio1;

  console.log("Resultado:", result1.result.meta.TransactionResult);
  console.log("Tiempo:", tiempo1, "ms");
  console.log("Ledger:", result1.result.ledger_index);

  // --- Método 2: submit (sin esperar) ---
  console.log("\\n=== submit (sin esperar) ===");
  const tx2 = await client.autofill({
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  });
  const signed2 = wallet.sign(tx2);

  console.log("Enviando...");
  const inicio2 = Date.now();
  const result2 = await client.submit(signed2.tx_blob);
  const tiempo2 = Date.now() - inicio2;

  console.log("Resultado preliminar:", result2.result.engine_result);
  console.log("Tiempo:", tiempo2, "ms (mucho más rápido)");
  console.log("NOTA: Este resultado es PRELIMINAR, no final.");

  // Para ver el resultado final, hay que consultar después:
  console.log("\\nEsperando 5 segundos para consultar el resultado final...");
  await new Promise((r) => setTimeout(r, 5000));

  const txInfo = await client.request({
    command: "tx",
    transaction: signed2.hash,
  });
  console.log("Resultado final:", txInfo.result.meta.TransactionResult);

  await client.disconnect();
}

comparar().catch(console.error);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function comparar() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // --- Method 1: submitAndWait (recommended) ---
  console.log("=== submitAndWait ===");
  const tx1 = await client.autofill({
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  });
  const signed1 = wallet.sign(tx1);

  console.log("Sending and waiting...");
  const inicio1 = Date.now();
  const result1 = await client.submitAndWait(signed1.tx_blob);
  const tiempo1 = Date.now() - inicio1;

  console.log("Result:", result1.result.meta.TransactionResult);
  console.log("Time:", tiempo1, "ms");
  console.log("Ledger:", result1.result.ledger_index);

  // --- Method 2: submit (without waiting) ---
  console.log("\\n=== submit (sin esperar) ===");
  const tx2 = await client.autofill({
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  });
  const signed2 = wallet.sign(tx2);

  console.log("Sending...");
  const inicio2 = Date.now();
  const result2 = await client.submit(signed2.tx_blob);
  const tiempo2 = Date.now() - inicio2;

  console.log("Preliminary result:", result2.result.engine_result);
  console.log("Time:", tiempo2, "ms (much faster)");
  console.log("NOTE: This result is PRELIMINARY, not final.");

  // To see the final result, query afterwards:
  console.log("\\nEsperando 5 segundos para consultar el resultado final...");
  await new Promise((r) => setTimeout(r, 5000));

  const txInfo = await client.request({
    command: "tx",
    transaction: signed2.hash,
  });
  console.log("Final result:", txInfo.result.meta.TransactionResult);

  await client.disconnect();
}

comparar().catch(console.error);`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "submit vs submitAndWait", en: "submit vs submitAndWait", jp: "" },
          content: {
            es: "submit():\n• Envía y devuelve inmediatamente\n• Resultado preliminar (no final)\n• Rápido, para enviar muchas txs\n\nsubmitAndWait():\n• Envía y espera validación (3-10s)\n• Resultado final directo\n• Recomendado para la mayoría de casos",
            en: "submit():\n• Sends and returns immediately\n• Preliminary result (not final)\n• Fast, for sending many txs\n\nsubmitAndWait():\n• Sends and waits for validation (3-10s)\n• Direct final result\n• Recommended for most cases",
            jp: "",
          },
          visual: "📤",
        },
        {
          title: { es: "Códigos de resultado", en: "Result codes", jp: "" },
          content: {
            es: "• tesSUCCESS → Éxito\n• tec... → Incluida pero falló (fee cobrado)\n• tef... → Rechazada (fee NO cobrado)\n• tem... → Mal formada (error de formato)\n• ter... → Error temporal (reintentar)\n\nSiempre verifica meta.TransactionResult",
            en: "• tesSUCCESS → Success\n• tec... → Included but failed (fee charged)\n• tef... → Rejected (fee NOT charged)\n• tem... → Malformed (format error)\n• ter... → Temporary error (retry)\n\nAlways check meta.TransactionResult",
            jp: "",
          },
          visual: "🏷️",
        },
        {
          title: { es: "Errores tec más comunes", en: "Most common tec errors", jp: "" },
          content: {
            es: "• tecUNFUNDED_PAYMENT → Sin balance\n• tecNO_DST → Destino no existe\n• tecDST_TAG_NEEDED → Falta tag\n• tecNO_LINE → Sin trust line\n• tecINSUFFICIENT_RESERVE → Sin reserva\n• tecPATH_DRY → Sin ruta de pago\n\nEl fee SE cobra en errores tec",
            en: "• tecUNFUNDED_PAYMENT → No balance\n• tecNO_DST → Destination doesn't exist\n• tecDST_TAG_NEEDED → Missing tag\n• tecNO_LINE → No trust line\n• tecINSUFFICIENT_RESERVE → No reserve\n• tecPATH_DRY → No payment path\n\nThe fee IS charged on tec errors",
            jp: "",
          },
          visual: "⚠️",
        },
      ],
    },
    {
      id: "m5bl5",
      title: {
        es: "Transacciones a nivel del ledger",
        en: "Transactions at the ledger level",
        jp: "",
      },
      theory: {
        es: `Para entender realmente cómo funcionan las transacciones, necesitas ver lo que ocurre **dentro del ledger** cuando una transacción se procesa. Esto te ayudará a depurar problemas complejos y a entender la metadata.

### ¿Cómo modifica una transacción el ledger?

Cuando una transacción se procesa con éxito, modifica el **estado del ledger** — los objetos almacenados en la base de datos del ledger. Estos cambios se registran en la **metadata** de la transacción.

### AffectedNodes — La huella de la transacción

El campo \`meta.AffectedNodes\` es un array que describe **exactamente qué cambió** en el ledger. Cada nodo afectado puede ser de tres tipos:

### CreatedNode — Objeto nuevo

Se creó un nuevo objeto en el ledger:

\`\`\`
{
  "CreatedNode": {
    "LedgerEntryType": "RippleState",  // Tipo de objeto
    "LedgerIndex": "ABC123...",         // ID único del objeto
    "NewFields": {                      // Los campos del nuevo objeto
      "Balance": { "value": "100" },
      "LowLimit": { ... },
      "HighLimit": { ... }
    }
  }
}
\`\`\`

Ejemplos: nueva trust line, nueva oferta en el DEX, nuevo URIToken.

### ModifiedNode — Objeto modificado

Se modificó un objeto existente:

\`\`\`
{
  "ModifiedNode": {
    "LedgerEntryType": "AccountRoot",
    "LedgerIndex": "DEF456...",
    "PreviousFields": {                // Estado ANTES
      "Balance": "100000000"
    },
    "FinalFields": {                   // Estado DESPUÉS
      "Balance": "95000000",
      "Sequence": 43
    }
  }
}
\`\`\`

\`PreviousFields\` solo muestra los campos que **cambiaron** (no todos los campos del objeto). \`FinalFields\` muestra el estado completo después del cambio.

### DeletedNode — Objeto eliminado

Se eliminó un objeto del ledger:

\`\`\`
{
  "DeletedNode": {
    "LedgerEntryType": "Offer",
    "LedgerIndex": "GHI789...",
    "FinalFields": {                   // Estado al momento de eliminación
      "TakerPays": "0",
      "TakerGets": "0"
    }
  }
}
\`\`\`

Ejemplos: oferta completada/cancelada, trust line eliminada (balance 0), URIToken quemado.

### Balance changes — Seguir el dinero

En una transacción de pago, puedes rastrear exactamente cómo se movió el dinero observando los \`ModifiedNode\` de tipo \`AccountRoot\`:

- La cuenta de origen: \`Balance\` disminuye (envió XAH)
- La cuenta de destino: \`Balance\` aumenta (recibió XAH)
- La diferencia entre los balances es el \`Amount\` + \`Fee\`

Para tokens (IOUs), los cambios se ven en los \`ModifiedNode\` de tipo \`RippleState\`.

### Reserves — El sistema de reservas

El ledger de Xahau usa un sistema de **reservas** que afecta tu balance disponible:

- **Reserva base**: 1 XAH — mínimo para que una cuenta exista
- **Reserva por objeto**: 0.2 XAH por cada objeto que tu cuenta posee

Cada objeto en el ledger (trust line, oferta, URIToken, Hook) aumenta tu reserva. El XAH reservado no se puede gastar hasta que elimines el objeto.

### Orden de procesamiento en un ledger

Dentro de un ledger, las transacciones se procesan en un **orden determinista**:

1. Las transacciones se ordenan por **hash canónico** (no por Sequence ni por hora de envío)
2. Se procesan secuencialmente en ese orden
3. Cada transacción ve el estado del ledger después de la transacción anterior
4. Si dos transacciones compiten por los mismos recursos, la primera (por hash) gana

Esto garantiza que **todos los validadores calculen exactamente el mismo resultado**, independientemente del orden en que recibieron las transacciones.

### El hash del ledger

Cuando se cierra un ledger, se calcula un **hash** que resume:
- El hash del ledger anterior (cadena de ledgers)
- Todas las transacciones incluidas y sus metadatas
- El estado completo del ledger (árbol de estado)

Si un validador calcula un hash diferente al 80% de la UNL, su ledger se descarta, esto garantiza la consistencia de la red.`,
        en: `To truly understand how transactions work, you need to see what happens **inside the ledger** when a transaction is processed. This will help you debug complex issues and understand metadata.

### How does a transaction modify the ledger?

When a transaction is successfully processed, it modifies the **ledger state** — the objects stored in the ledger database. These changes are recorded in the transaction's **metadata**.

### AffectedNodes — The transaction's footprint

The \`meta.AffectedNodes\` field is an array that describes **exactly what changed** in the ledger. Each affected node can be one of three types:

### CreatedNode — New object

A new object was created in the ledger:

\`\`\`
{
  "CreatedNode": {
    "LedgerEntryType": "RippleState",  // Object type
    "LedgerIndex": "ABC123...",         // Unique object ID
    "NewFields": {                      // The new object's fields
      "Balance": { "value": "100" },
      "LowLimit": { ... },
      "HighLimit": { ... }
    }
  }
}
\`\`\`

Examples: new trust line, new DEX offer, new URIToken.

### ModifiedNode — Modified object

An existing object was modified:

\`\`\`
{
  "ModifiedNode": {
    "LedgerEntryType": "AccountRoot",
    "LedgerIndex": "DEF456...",
    "PreviousFields": {                // State BEFORE
      "Balance": "100000000"
    },
    "FinalFields": {                   // State AFTER
      "Balance": "95000000",
      "Sequence": 43
    }
  }
}
\`\`\`

\`PreviousFields\` only shows the fields that **changed** (not all the object's fields). \`FinalFields\` shows the complete state after the change.

### DeletedNode — Deleted object

An object was removed from the ledger:

\`\`\`
{
  "DeletedNode": {
    "LedgerEntryType": "Offer",
    "LedgerIndex": "GHI789...",
    "FinalFields": {                   // State at the time of deletion
      "TakerPays": "0",
      "TakerGets": "0"
    }
  }
}
\`\`\`

Examples: completed/canceled offer, deleted trust line (zero balance), burned URIToken.

### Balance changes — Follow the money

In a payment transaction, you can trace exactly how money moved by observing the \`ModifiedNode\` entries of type \`AccountRoot\`:

- The source account: \`Balance\` decreases (sent XAH)
- The destination account: \`Balance\` increases (received XAH)
- The difference between balances is the \`Amount\` + \`Fee\`

For tokens (IOUs), changes are visible in the \`ModifiedNode\` entries of type \`RippleState\`.

### Reserves — The reserve system

The Xahau ledger uses a **reserve** system that affects your available balance:

- **Base reserve**: 1 XAH — minimum for an account to exist
- **Owner reserve**: 0.2 XAH for each object your account owns

Each object in the ledger (trust line, offer, URIToken, Hook) increases your reserve. Reserved XAH cannot be spent until you remove the object.

### Processing order within a ledger

Within a ledger, transactions are processed in a **deterministic order**:

1. Transactions are sorted by **canonical hash** (not by Sequence or submission time)
2. They are processed sequentially in that order
3. Each transaction sees the ledger state after the previous transaction
4. If two transactions compete for the same resources, the first one (by hash) wins

This ensures that **all validators compute exactly the same result**, regardless of the order in which they received the transactions.

### The ledger hash

When a ledger closes, a **hash** is calculated that summarizes:
- The previous ledger's hash (chain of ledgers)
- All included transactions and their metadata
- The complete ledger state (state tree)

If a validator computes a different hash from 80% of the UNL, its ledger is discarded — this guarantees network consistency.`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Analizar los AffectedNodes de una transacción",
            en: "Analyze a transaction's AffectedNodes",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function analizarMetadata() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Enviar un pago para analizar su metadata
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "5000000", // 5 XAH
  };

  const prepared = await client.autofill(tx);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const meta = result.result.meta;
  console.log("=== ANÁLISIS DE METADATA ===\\n");
  console.log("Resultado:", meta.TransactionResult);
  console.log("Nodos afectados:", meta.AffectedNodes.length);

  // Clasificar los nodos afectados
  const creados = [];
  const modificados = [];
  const eliminados = [];

  for (const node of meta.AffectedNodes) {
    if (node.CreatedNode) {
      creados.push(node.CreatedNode);
    } else if (node.ModifiedNode) {
      modificados.push(node.ModifiedNode);
    } else if (node.DeletedNode) {
      eliminados.push(node.DeletedNode);
    }
  }

  // Mostrar objetos creados
  if (creados.length > 0) {
    console.log("\\n--- OBJETOS CREADOS ---");
    for (const n of creados) {
      console.log("  +", n.LedgerEntryType);
      console.log("   Index:", n.LedgerIndex);
    }
  }

  // Mostrar objetos modificados
  if (modificados.length > 0) {
    console.log("\\n--- OBJETOS MODIFICADOS ---");
    for (const n of modificados) {
      console.log("  ~", n.LedgerEntryType);
      if (n.PreviousFields && n.FinalFields) {
        // Mostrar cambios en balance (AccountRoot)
        if (n.PreviousFields.Balance && n.FinalFields.Balance) {
          const antes = Number(n.PreviousFields.Balance) / 1000000;
          const despues = Number(n.FinalFields.Balance) / 1000000;
          const diff = despues - antes;
          console.log("   Balance:", antes, "→", despues, "XAH");
          console.log("   Cambio:", diff > 0 ? "+" : "", diff.toFixed(6), "XAH");
        }
        // Mostrar cambio de Sequence
        if (n.FinalFields.Sequence) {
          console.log("   Sequence:", n.FinalFields.Sequence);
        }
      }
    }
  }

  // Mostrar objetos eliminados
  if (eliminados.length > 0) {
    console.log("\\n--- OBJETOS ELIMINADOS ---");
    for (const n of eliminados) {
      console.log("  -", n.LedgerEntryType);
    }
  }

  // Resumen de balance
  console.log("\\n--- RESUMEN ---");
  console.log("Fee pagado:", Number(result.result.Fee) / 1000000, "XAH");
  console.log("El fee se quemó (no fue a ninguna cuenta).");

  await client.disconnect();
}

analizarMetadata().catch(console.error);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function analizarMetadata() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Send a payment to analyze its metadata
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "5000000", // 5 XAH
  };

  const prepared = await client.autofill(tx);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const meta = result.result.meta;
  console.log("=== ANÁLISIS DE METADATA ===\\n");
  console.log("Result:", meta.TransactionResult);
  console.log("Affected nodes:", meta.AffectedNodes.length);

  // Classify the affected nodes
  const created = [];
  const modified = [];
  const deleted = [];

  for (const node of meta.AffectedNodes) {
    if (node.CreatedNode) {
      created.push(node.CreatedNode);
    } else if (node.ModifiedNode) {
      modified.push(node.ModifiedNode);
    } else if (node.DeletedNode) {
      deleted.push(node.DeletedNode);
    }
  }

  // Show created objects
  if (created.length > 0) {
    console.log("\\n--- OBJETOS CREADOS ---");
    for (const n of created) {
      console.log("  +", n.LedgerEntryType);
      console.log("   Index:", n.LedgerIndex);
    }
  }

  // Show modified objects
  if (modified.length > 0) {
    console.log("\\n--- OBJETOS MODIFICADOS ---");
    for (const n of modified) {
      console.log("  ~", n.LedgerEntryType);
      if (n.PreviousFields && n.FinalFields) {
        // Show balance changes (AccountRoot)
        if (n.PreviousFields.Balance && n.FinalFields.Balance) {
          const before = Number(n.PreviousFields.Balance) / 1000000;
          const after = Number(n.FinalFields.Balance) / 1000000;
          const diff = after - before;
          console.log("   Balance:", before, "→", after, "XAH");
          console.log("   Change:", diff > 0 ? "+" : "", diff.toFixed(6), "XAH");
        }
        // Show Sequence change
        if (n.FinalFields.Sequence) {
          console.log("   Sequence:", n.FinalFields.Sequence);
        }
      }
    }
  }

  // Show deleted objects
  if (deleted.length > 0) {
    console.log("\\n--- OBJETOS ELIMINADOS ---");
    for (const n of deleted) {
      console.log("  -", n.LedgerEntryType);
    }
  }

  // Balance summary
  console.log("\\n--- RESUMEN ---");
  console.log("Fee paid:", Number(result.result.Fee) / 1000000, "XAH");
  console.log("The fee was burned (it didn't go to any account).");

  await client.disconnect();
}

analizarMetadata().catch(console.error);`,
            jp: "",
          },
        },
        {
          title: {
            es: "Consultar la reserva actual de tu cuenta",
            en: "Query your account's current reserve",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client } = require("xahau");

async function consultarReserva(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Obtener info del servidor para las reservas actuales
  const serverInfo = await client.request({ command: "server_info" });
  const ledgerInfo = serverInfo.result.info.validated_ledger;
  const reservaBase = ledgerInfo.reserve_base_xrp; // En XAH
  const reservaObjeto = ledgerInfo.reserve_inc_xrp; // En XAH

  console.log("=== RESERVAS DE LA RED ===");
  console.log("Reserva base (por cuenta):", reservaBase, "XAH");
  console.log("Reserva por objeto:", reservaObjeto, "XAH");

  // Obtener info de la cuenta
  const accountInfo = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  });

  const account = accountInfo.result.account_data;
  const balance = Number(account.Balance) / 1000000;
  const ownerCount = account.OwnerCount;
  const reservaTotal = reservaBase + (ownerCount * reservaObjeto);
  const disponible = balance - reservaTotal;

  console.log("\n=== TU CUENTA ===");
  console.log("Dirección:", address);
  console.log("Balance total:", balance, "XAH");
  console.log("Objetos en el ledger:", ownerCount);
  console.log("Reserva total:", reservaTotal, "XAH");
  console.log("  →", reservaBase, "XAH (base)");
  console.log("  +", ownerCount, "x", reservaObjeto, "=", ownerCount * reservaObjeto, "XAH (objetos)");
  console.log("Disponible para gastar:", disponible, "XAH");

  // Mostrar qué objetos tienes
  const objects = await client.request({
    command: "account_objects",
    account: address,
    ledger_index: "validated",
  });

  const porTipo = {};
  for (const obj of objects.result.account_objects) {
    const tipo = obj.LedgerEntryType;
    porTipo[tipo] = (porTipo[tipo] || 0) + 1;
  }

  console.log("\n=== OBJETOS POR TIPO ===");
  for (const [tipo, cantidad] of Object.entries(porTipo)) {
    console.log("  " + tipo + ":", cantidad, "(reserva:", cantidad * reservaObjeto, "XAH)");
  }

  await client.disconnect();
}
//Puedes usar tu cuenta o rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
consultarReserva("rTuCuentaAqui");`,
            en: `require("dotenv").config();
const { Client } = require("xahau");

async function consultarReserva(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Get server info for current reserves
  const serverInfo = await client.request({ command: "server_info" });
  const ledgerInfo = serverInfo.result.info.validated_ledger;
  const baseReserve = ledgerInfo.reserve_base_xrp; // In XAH
  const ownerReserve = ledgerInfo.reserve_inc_xrp; // In XAH

  console.log("=== NETWORK RESERVES ===");
  console.log("Base reserve (per account):", baseReserve, "XAH");
  console.log("Owner reserve (per object):", ownerReserve, "XAH");

  // Get account info
  const accountInfo = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  });

  const account = accountInfo.result.account_data;
  const balance = Number(account.Balance) / 1000000;
  const ownerCount = account.OwnerCount;
  const totalReserve = baseReserve + (ownerCount * ownerReserve);
  const available = balance - totalReserve;

  console.log("\n=== YOUR ACCOUNT ===");
  console.log("Address:", address);
  console.log("Total balance:", balance, "XAH");
  console.log("Objects in the ledger:", ownerCount);
  console.log("Total reserve:", totalReserve, "XAH");
  console.log("  →", baseReserve, "XAH (base)");
  console.log("  +", ownerCount, "x", ownerReserve, "=", ownerCount * ownerReserve, "XAH (objects)");
  console.log("Available to spend:", available, "XAH");

  // Show what objects you have
  const objects = await client.request({
    command: "account_objects",
    account: address,
    ledger_index: "validated",
  });

  const byType = {};
  for (const obj of objects.result.account_objects) {
    const tipo = obj.LedgerEntryType;
    byType[tipo] = (byType[tipo] || 0) + 1;
  }

  console.log("\n=== OBJECTS BY TYPE ===");
  for (const [tipo, count] of Object.entries(byType)) {
    console.log("  " + tipo + ":", count, "(reserve:", count * ownerReserve, "XAH)");
  }

  await client.disconnect();
}
//You can use your account or rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
consultarReserva("rYourAccountHere");`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "AffectedNodes", en: "AffectedNodes", jp: "" },
          content: {
            es: "Cada transacción registra qué cambió:\n\n• CreatedNode → Nuevo objeto en el ledger\n• ModifiedNode → Objeto existente modificado\n  (PreviousFields → FinalFields)\n• DeletedNode → Objeto eliminado\n\nLa huella exacta de la transacción",
            en: "Each transaction records what changed:\n\n• CreatedNode → New object in the ledger\n• ModifiedNode → Existing object modified\n  (PreviousFields → FinalFields)\n• DeletedNode → Object deleted\n\nThe exact footprint of the transaction",
            jp: "",
          },
          visual: "🔍",
        },
        {
          title: { es: "Sistema de reservas", en: "Reserve system", jp: "" },
          content: {
            es: "Reserva base: 1 XAH por cuenta\nReserva por objeto: 0.2 XAH cada uno\n\nObjetos que consumen reserva:\n• Trust lines, Ofertas DEX\n• URITokens, Hooks\n\nEliminar objeto = liberar reserva\nDisponible = Balance - Reserva total",
            en: "Base reserve: 1 XAH per account\nOwner reserve: 0.2 XAH each\n\nObjects that consume reserve:\n• Trust lines, DEX Offers\n• URITokens, Hooks\n\nDelete object = free reserve\nAvailable = Balance - Total reserve",
            jp: "",
          },
          visual: "💰",
        },
        {
          title: { es: "Orden y consistencia", en: "Order and consistency", jp: "" },
          content: {
            es: "Dentro de un ledger:\n\n• Txs ordenadas por hash canónico\n• Procesadas secuencialmente\n• Mismo resultado en todos los nodos\n\nHash del ledger resume:\n• Ledger anterior + Txs + Estado\n• 80% UNL debe coincidir\n• Garantiza consistencia total",
            en: "Within a ledger:\n\n• Txs ordered by canonical hash\n• Processed sequentially\n• Same result on all nodes\n\nLedger hash summarizes:\n• Previous ledger + Txs + State\n• 80% UNL must agree\n• Guarantees total consistency",
            jp: "",
          },
          visual: "🔗",
        },
      ],
    },
  ],
}
