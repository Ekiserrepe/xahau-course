export default {
  id: "m5",
  icon: "💸",
  title: {
    es: "Creación y uso de pagos",
    en: "Creating and using payments",
    jp: "",
  },
  lessons: [
    {
      id: "m5l1",
      title: {
        es: "Anatomía de una transacción de pago",
        en: "Anatomy of a payment transaction",
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

### Enviar IOUs (tokens) en lugar de XAH nativo

Cuando envías XAH nativo, el campo \`Amount\` es un **string** con la cantidad en drops. Pero cuando envías un **IOU** (token emitido por una cuenta, como USD, EUR, etc.), \`Amount\` pasa a ser un **objeto** con tres campos:

\`\`\`
{
  "currency": "USD",       // Código de la moneda (3 caracteres o hex de 40)
  "issuer": "rDireccionDelEmisor",  // Cuenta que emitió el token
  "value": "100"           // Cantidad como string
}
\`\`\`

**Requisitos previos para enviar IOUs:**
- **El emisor debe tener fondos**: Tu cuenta debe poseer saldo de ese IOU. Puedes obtenerlo mediante un pago previo, un intercambio en el DEX, o directamente del emisor del token.
- **El receptor debe tener una TrustLine**: La cuenta de destino debe haber creado previamente una TrustLine (\`TrustSet\`) para ese IOU con el mismo emisor. Sin TrustLine, el pago fallará con \`tecPATH_DRY\` o \`tecNO_LINE\`.

### ¿Por qué los IOUs o tokens diferentes de XAH necesitan estos campos?

Puede darse el caso de que varias entidades emitan el mismo tipo de IOU. Por ejemplo, distintos bancos podrían emitir su propio EUR o USD token. La única forma de diferenciarlos sería especificando quién es el emisor si comparten el mismo nombre de token.



### Más información sobre Payment

La transacción Payment tiene muchos más campos opcionales, flags y posibles errores de los que cubrimos aquí. Para una referencia completa consulta la [documentación oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/payment/)

Allí encontrarás:
- Todos los campos opcionales (SendMax, DeliverMin, InvoiceID, etc.)
- Flags disponibles (tfPartialPayment, tfLimitQuality, etc.)
- Lista completa de códigos de error y sus causas
- Casos especiales y comportamientos avanzados`,
        en: `The **Payment** is the most fundamental transaction on Xahau. It allows you to send XAH (or tokens) from one account to another.

### Payment transaction fields

| Field | Description |
|---|---|
| \`TransactionType\` | Always \`"Payment"\` |
| \`Account\` | Sender address (the payer) |
| \`Destination\` | Recipient address |
| \`Amount\` | Amount to send (in drops for native XAH) |
| \`Fee\` | Transaction cost (in drops) |
| \`Sequence\` | Sequence number of the sending account |
| \`NetworkID\` | Network identifier (required on Xahau) |

### Drops vs XAH

Native XAH amounts are expressed in **drops**:
- 1 XAH = **1,000,000 drops**
- The \`Amount\` field for native XAH is a **string** with the number of drops
- Example: \`"10000000"\` = 10 XAH

### Fees (transaction costs)

Fees on Xahau are extremely low and predictable:
- A typical payment costs **12 drops** (0.000012 XAH)
- Fees are **burned** (destroyed), they do not go to any validator
- The \`xahau\` library can calculate the fee automatically with \`autofill()\`

### Sending IOUs (tokens) instead of native XAH

When you send native XAH, the \`Amount\` field is a **string** with the amount in drops. But when you send an **IOU** (a token issued by an account, such as USD, EUR, etc.), \`Amount\` becomes an **object** with three fields:

\`\`\`
{
  "currency": "USD",       // Currency code (3 characters or 40-char hex)
  "issuer": "rIssuerAddress",  // Account that issued the token
  "value": "100"           // Amount as a string
}
\`\`\`

**Prerequisites for sending IOUs:**
- **The sender must have funds**: Your account must hold a balance of that IOU. You can obtain it through a previous payment, a DEX trade, or directly from the token issuer.
- **The recipient must have a TrustLine**: The destination account must have previously created a TrustLine (\`TrustSet\`) for that IOU with the same issuer. Without a TrustLine, the payment will fail with \`tecPATH_DRY\` or \`tecNO_LINE\`.

### Why do IOUs or tokens other than XAH need these fields?

It is possible for multiple entities to issue the same type of IOU. For example, different banks could issue their own EUR or USD token. The only way to differentiate them is by specifying the issuer if they share the same token name.



### More information about Payment

The Payment transaction has many more optional fields, flags, and possible errors than we cover here. For a complete reference, see the [official documentation](https://xahau.network/docs/protocol-reference/transactions/transaction-types/payment/)

There you will find:
- All optional fields (SendMax, DeliverMin, InvoiceID, etc.)
- Available flags (tfPartialPayment, tfLimitQuality, etc.)
- Complete list of error codes and their causes
- Special cases and advanced behaviors`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Enviar un pago de XAH entre dos cuentas",
            en: "Send an XAH payment between two accounts",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function sendPayment() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Wallet del emisor (usa tu seed de testnet), si tienes una seed que no es secp256k1, elimina la parte ", {algorithm: 'secp256k1'}" 
  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Construir la transacción de pago
  const payment = {
    TransactionType: "Payment",
    Account: sender.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
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
        {
          title: {
            es: "Enviar un pago de IOU (token) entre dos cuentas",
            en: "Send an IOU (token) payment between two accounts",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// El código no va a funcionar a no ser que tengas saldo del IOU y el destino tenga TrustLine activa. Modifica los campos según tu configuración de testnet.
async function sendIOUPayment() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Wallet del emisor (usa tu seed de testnet), si tienes una seed que no es secp256k1, elimina la parte ", {algorithm: 'secp256k1'}" 
  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Para enviar un IOU, Amount es un objeto con currency, issuer y value
  // Requisitos:
  //   1. El sender debe tener saldo de este IOU
  //   2. El destino debe tener una TrustLine para este IOU
  const payment = {
    TransactionType: "Payment",
    Account: sender.address,
    Destination: "rDireccionDelDestinatario",
    //Aquí modificarías el currency, issuer y value según el token que quieras enviar
    Amount: {
      currency: "USD",
      issuer: "rDireccionDelEmisorDelToken",
      value: "50", // 50 USD
    },
  };

  const prepared = await client.autofill(payment);
  const signed = sender.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("¡Pago de IOU enviado con éxito!");
  } else if (txResult === "tecPATH_DRY") {
    console.log("Error: No hay ruta de pago. ¿Tiene el destino una TrustLine?");
  } else if (txResult === "tecUNFUNDED_PAYMENT") {
    console.log("Error: No tienes suficiente saldo de este IOU.");
  }

  await client.disconnect();
}

sendIOUPayment();`,
        },
      ],
      slides: [
        {
          title: { es: "Transacción Payment", en: "Payment Transaction", jp: "" },
          content: {
            es: "La transacción más básica de Xahau\n\n• Account → Quien envía\n• Destination → Quien recibe\n• Amount → Cantidad (en drops para XAH)\n• 1 XAH = 1,000,000 drops",
            en: "The most basic transaction on Xahau\n\n• Account → The sender\n• Destination → The receiver\n• Amount → Quantity (in drops for XAH)\n• 1 XAH = 1,000,000 drops",
            jp: "",
          },
          visual: "💸",
        },
        {
          title: { es: "Envío de IOUs (tokens)", en: "Sending IOUs (tokens)", jp: "" },
          content: {
            es: "Amount pasa a ser un objeto:\n\n• currency → Código del token (USD, EUR...)\n• issuer → Cuenta emisora del token\n• value → Cantidad como string\n\nRequisitos:\n• Tener saldo del IOU\n• Destino con TrustLine activa",
            en: "Amount becomes an object:\n\n• currency → Token code (USD, EUR...)\n• issuer → Token issuer account\n• value → Amount as a string\n\nRequirements:\n• Hold a balance of the IOU\n• Destination with an active TrustLine",
            jp: "",
          },
          visual: "🪙",
        },
        {
          title: { es: "Documentación oficial", en: "Official documentation", jp: "" },
          content: {
            es: "Referencia completa de Payment:\ https://xahau.network/docs/technical/protocol-reference/transactions/transaction-types/payment\n\n• Campos opcionales (SendMax, DeliverMin...)\n• Flags (tfPartialPayment, tfLimitQuality...)\n• Códigos de error completos\n• Casos especiales y avanzados",
            en: "Complete Payment reference:\ https://xahau.network/docs/technical/protocol-reference/transactions/transaction-types/payment\n\n• Optional fields (SendMax, DeliverMin...)\n• Flags (tfPartialPayment, tfLimitQuality...)\n• Complete error codes\n• Special cases and advanced behaviors",
            jp: "",
          },
          visual: "📖",
        },
      ],
    },
    {
      id: "m5l2",
      title: {
        es: "Pagos con Destination Tag y memos",
        en: "Payments with Destination Tag and memos",
        jp: "",
      },
      theory: {
        es: `Además del pago básico, Xahau soporta campos adicionales que permiten añadir contexto y funcionalidad a los pagos.

### Destination Tag

El **Destination Tag** es un número entero que permite al receptor identificar pagos individuales. Es especialmente útil para:
- **Exchanges**: Identificar a qué usuario pertenece un depósito
- **Servicios**: Asociar un pago con un pedido o factura
- Si una cuenta tiene activado el flag \`RequireDestTag\`, **no puedes enviarle un pago sin tag**

El sistema permite hasta 32 bits para el Destination Tag, lo que significa que puedes usar números enteros de hasta 4,294,967,295. Es importante que siempre verifiques con el receptor cuál es el Destination Tag correcto antes de enviar un pago, ya que enviar un pago sin tag o con un tag incorrecto a una cuenta que lo requiere puede resultar en la pérdida de fondos.

Además existe el **Source Tag**, que cumple la misma función pero para el emisor. Sin embargo, el Destination Tag es mucho más común y ampliamente utilizado en la práctica.

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
        en: `In addition to the basic payment, Xahau supports additional fields that allow you to add context and functionality to payments.

### Destination Tag

The **Destination Tag** is an integer that allows the receiver to identify individual payments. It is especially useful for:
- **Exchanges**: Identifying which user a deposit belongs to
- **Services**: Associating a payment with an order or invoice
- If an account has the \`RequireDestTag\` flag enabled, **you cannot send it a payment without a tag**

The system allows up to 32 bits for the Destination Tag, which means you can use integers up to 4,294,967,295. It is important to always verify with the recipient what the correct Destination Tag is before sending a payment, as sending a payment without a tag or with an incorrect tag to an account that requires one can result in loss of funds.

There is also the **Source Tag**, which serves the same purpose but for the sender. However, the Destination Tag is much more common and widely used in practice.

### Memos

**Memos** allow you to attach arbitrary data to a transaction:
- \`MemoType\`: Type of the memo (e.g., "text/plain", "application/json")
- \`MemoData\`: The memo content
- Memos are encoded in **hexadecimal**
- They are public and visible to everyone on the ledger

### Transaction results

Each transaction returns a result code:
- \`tesSUCCESS\`: The transaction was successful
- \`tecUNFUNDED_PAYMENT\`: Insufficient funds
- \`tecNO_DST\`: The destination account does not exist
- \`tecDST_TAG_NEEDED\`: Destination Tag is required
- \`tecNO_DST_INSUF_XAH\`: The destination does not have enough XAH for the reserve`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Pago con Source, Destination Tag y Memos",
            en: "Payment with Source Tag, Destination Tag, and Memos",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

// Función auxiliar para convertir texto a hexadecimal
function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}
function hexToString(hex) {
  if (!hex) return null;
  return Buffer.from(hex, "hex").toString("utf8");
}

async function sendPaymentWithMemo() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Wallet del emisor (usa tu seed de testnet), si tienes una seed que no es secp256k1, elimina la parte ", {algorithm: 'secp256k1'}"
  const sender = Wallet.fromSeed(process.env.WALLET_SEED, {
    algorithm: "secp256k1",
  });

  const payment = {
    TransactionType: "Payment",
    Account: sender.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: xahToDrops(5), // 5 XAH
    SourceTag: 1, // Tag del emisor para identificar el pago
    DestinationTag: 12345, // Tag de destino para identificar el pago
    Memos: [
      {
        Memo: {
          MemoType: toHex("text/plain"),
          MemoData: toHex("Pago del curso de Xahau"),
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
    const lookup = await client.request({
      command: "tx",
      transaction: signed.hash,
    });

    const tx = lookup.result.tx_json ?? lookup.result;
    console.log("Source Tag:", tx.SourceTag);
    console.log("Destination Tag:", tx.DestinationTag);

    if (tx.Memos) {
      tx.Memos.forEach((memoWrapper, index) => {
        const memo = memoWrapper.Memo;

        const memoType = hexToString(memo.MemoType);
        const memoData = hexToString(memo.MemoData);

        console.log("MemoType:", memoType);
        console.log("MemoData:", memoData);
      });
    }
  }

  await client.disconnect();
}

sendPaymentWithMemo();`,
        },
        {
          title: {
            es: "Verificar un pago recibido",
            en: "Verify a received payment",
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
// Ejemplo de hash de transacción: "4B56BD61E7E7F59FF191A779FC0C9ACF68DC25C174930FCB906AC06EB812F38C"
verifyPayment("TU_HASH_DE_TRANSACCION_AQUI");`,
        },
      ],
      slides: [
        {
          title: { es: "Destination Tag", en: "Destination Tag", jp: "" },
          content: {
            es: "Número para identificar pagos individuales\n\n• Usado por exchanges y servicios\n• Asocia pagos con usuarios/pedidos\n• Algunas cuentas lo requieren\n• Es un número entero (uint32)",
            en: "A number to identify individual payments\n\n• Used by exchanges and services\n• Associates payments with users/orders\n• Some accounts require it\n• It is an integer (uint32)",
            jp: "",
          },
          visual: "🏷️",
        },
        {
          title: { es: "Memos", en: "Memos", jp: "" },
          content: {
            es: "Datos adjuntos a una transacción\n\n• MemoType → Tipo (text/plain, etc.)\n• MemoData → Contenido\n• Codificados en hexadecimal\n• Públicos en el ledger",
            en: "Data attached to a transaction\n\n• MemoType → Type (text/plain, etc.)\n• MemoData → Content\n• Encoded in hexadecimal\n• Public on the ledger",
            jp: "",
          },
          visual: "📝",
        },
        {
          title: { es: "Seguridad del DestinationTag", en: "Destination Tag security", jp: "" },
          content: {
            es: "• Flag RequireDestTag en la cuenta destino\n• Sin tag → error tecDST_TAG_NEEDED\n• Exchanges exigen tag para depósitos\n• Sin tag correcto = fondos perdidos\n• Siempre valida el tag antes de enviar\n• Maneja errores: tecNO_DST, tecUNFUNDED",
            en: "• RequireDestTag flag on the destination account\n• No tag → error tecDST_TAG_NEEDED\n• Exchanges require a tag for deposits\n• Wrong or missing tag = lost funds\n• Always validate the tag before sending\n• Handle errors: tecNO_DST, tecUNFUNDED",
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
        en: "Cross-currency payments and pathfinding",
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
        en: `Xahau not only allows sending native XAH or same-type tokens: it also supports **cross-currency payments**, where the sender sends one currency and the receiver gets a different one. This is possible thanks to the **built-in DEX** and the **pathfinding** system.

### Cross-currency payments

A cross-currency payment allows, for example, the sender to pay in XAH and the receiver to get USD. Xahau automatically finds the best path through the DEX to convert the currencies.

### The pathfinding system

Pathfinding is the mechanism that finds conversion routes between currencies:
- Xahau searches for **paths** through trust lines and DEX orders
- It can chain multiple intermediate conversions
- It always tries to find the **best rate** available

### Key fields in cross-currency payments

| Field | Description |
|---|---|
| \`Amount\` | What the receiver should receive (destination currency) |
| \`SendMax\` | Maximum the sender is willing to spend (source currency) |
| \`DeliverMin\` | Minimum the receiver must receive (with partial payments) |
| \`Paths\` | Conversion routes found by pathfinding |

### The ripple_path_find command

Before sending a cross-currency payment, use \`ripple_path_find\` to:
- Check if a path exists between the two currencies
- Obtain the \`Paths\` needed for the transaction
- Know the estimated cost (\`source_amount\`)

### Partial payments (tfPartialPayment)

The \`tfPartialPayment\` flag (value: \`0x00020000\`) allows a payment to deliver **less** than what is specified in \`Amount\`:
- Useful when liquidity may vary between the query and execution
- Use \`DeliverMin\` to set an acceptable minimum
- **IMPORTANT**: When receiving payments, always check \`delivered_amount\` in the metadata, **not** the \`Amount\` field. An attacker could send a partial payment that shows a high \`Amount\` but delivers much less`,
        jp: "",
      },
      codeBlocks: [
        
      ],
      slides: [
        {
          title: { es: "Pagos cross-currency", en: "Cross-currency payments", jp: "" },
          content: {
            es: "Envía una moneda, el receptor recibe otra\n\n• El DEX integrado convierte automáticamente\n• Amount = lo que recibe el receptor\n• SendMax = máximo que paga el emisor\n• Paths = rutas de conversión",
            en: "Send one currency, the receiver gets another\n\n• The built-in DEX converts automatically\n• Amount = what the receiver gets\n• SendMax = maximum the sender pays\n• Paths = conversion routes",
            jp: "",
          },
          visual: "🔄",
        },
        {
          title: { es: "Pathfinding", en: "Pathfinding", jp: "" },
          content: {
            es: "ripple_path_find busca rutas de conversión\n\n1. Indica cuenta origen y destino\n2. Especifica la moneda y cantidad destino\n3. Obtén alternativas con coste estimado\n4. Usa paths_computed en tu Payment",
            en: "ripple_path_find searches for conversion routes\n\n1. Specify source and destination accounts\n2. Specify the destination currency and amount\n3. Get alternatives with estimated cost\n4. Use paths_computed in your Payment",
            jp: "",
          },
          visual: "🗺️",
        },
        {
          title: { es: "Pagos parciales", en: "Partial payments", jp: "" },
          content: {
            es: "Flag tfPartialPayment permite entregar menos\n\n• Útil cuando la liquidez varía\n• DeliverMin = mínimo aceptable\n• SIEMPRE verificar delivered_amount\n• NUNCA confiar en el campo Amount\n\n⚠️ Riesgo de seguridad si no se verifica",
            en: "tfPartialPayment flag allows delivering less\n\n• Useful when liquidity varies\n• DeliverMin = acceptable minimum\n• ALWAYS verify delivered_amount\n• NEVER trust the Amount field\n\n⚠️ Security risk if not verified",
            jp: "",
          },
          visual: "⚠️",
        },
      ],
    },
  ],
}
