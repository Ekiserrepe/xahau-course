export default {
  id: "m4",
  icon: "🔍",
  title: {
    es: "Consulta de datos a un nodo de la red",
    en: "Querying data from a network node",
    jp: "",
  },
  lessons: [
    {
      id: "m4l1",
      title: {
        es: "Conexión a nodos Xahau",
        en: "Connecting to Xahau nodes",
        jp: "",
      },
      theory: {
        es: `Para leer datos de la blockchain Xahau, necesitas conectarte a un **nodo de la red** mediante **WebSocket**. Los nodos exponen una API JSON-RPC que permite consultar toda la información del ledger.

### Tipos de nodos

- **Nodos públicos**: Mantenidos por la comunidad, accesibles para cualquiera. Ideales para desarrollo
- **Nodos propios**: Puedes ejecutar tu propio nodo para mayor control y fiabilidad

### Endpoints principales

| Red | WebSocket URL |
|---|---|
| Mainnet | \`wss://xahau.network\` |
| Testnet | \`wss://xahau-test.net\` |

### Tipos de consultas

La API de Xahau ofrece comandos para consultar:
- **Información del servidor**: \`server_info\`, \`server_state\`
- **Cuentas**: \`account_info\`, \`account_lines\`, \`account_objects\`, \`account_tx\`
- **Ledger**: \`ledger\`, \`ledger_data\`, \`ledger_entry\`
- **Transacciones**: \`tx\`, \`transaction_entry\`
- **Suscripciones**: \`subscribe\` / \`unsubscribe\` para eventos en tiempo real

### Conceptos importantes

- **Ledger index**: Puedes consultar un ledger específico por su número, o usar \`"validated"\` para el último validado
- **Drops**: Las cantidades de XAH se expresan en drops (1 XAH = 1,000,000 drops)
- **Marcadores (Markers)**: Para paginar resultados grandes, la API usa marcadores`,
        en: `To read data from the Xahau blockchain, you need to connect to a **network node** via **WebSocket**. Nodes expose a JSON-RPC API that allows you to query all ledger information.

### Node types

- **Public nodes**: Maintained by the community, accessible to anyone. Ideal for development
- **Private nodes**: You can run your own node for greater control and reliability

### Main endpoints

| Network | WebSocket URL |
|---|---|
| Mainnet | \`wss://xahau.network\` |
| Testnet | \`wss://xahau-test.net\` |

### Query types

The Xahau API provides commands to query:
- **Server information**: \`server_info\`, \`server_state\`
- **Accounts**: \`account_info\`, \`account_lines\`, \`account_objects\`, \`account_tx\`
- **Ledger**: \`ledger\`, \`ledger_data\`, \`ledger_entry\`
- **Transactions**: \`tx\`, \`transaction_entry\`
- **Subscriptions**: \`subscribe\` / \`unsubscribe\` for real-time events

### Important concepts

- **Ledger index**: You can query a specific ledger by its number, or use \`"validated"\` for the latest validated one
- **Drops**: XAH amounts are expressed in drops (1 XAH = 1,000,000 drops)
- **Markers**: To paginate large result sets, the API uses markers`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Conectar y consultar información del servidor",
            en: "Connect and query server information",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function getServerInfo() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("=== Información del servidor ===");
  console.log("Versión:", info.build_version);
  console.log("ID de red:", info.network_id);
  console.log("Estado:", info.server_state);
  console.log("Peers conectados:", info.peers);
  console.log("Ledger validado:", info.validated_ledger.seq);
  console.log("Quorum de validación:", info.validation_quorum);

  await client.disconnect();
}

getServerInfo();`,
            en: `const { Client } = require("xahau");

async function getServerInfo() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("=== Server Information ===");
  console.log("Version:", info.build_version);
  console.log("Network ID:", info.network_id);
  console.log("State:", info.server_state);
  console.log("Connected peers:", info.peers);
  console.log("Validated ledger:", info.validated_ledger.seq);
  console.log("Validation quorum:", info.validation_quorum);

  await client.disconnect();
}

getServerInfo();`,
            jp: "",
          },
        },
        {
          title: {
            es: "Consultar información detallada de una cuenta",
            en: "Query detailed account information",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function getAccountInfo(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  });

  const data = response.result.account_data;
  console.log("=== Datos de la cuenta ===");
  console.log("Dirección:", data.Account);
  console.log("Balance:", Number(data.Balance) / 1_000_000, "XAH");
  console.log("Secuencia:", data.Sequence);
  console.log("Objetos del propietario:", data.OwnerCount);
  console.log("Flags:", data.Flags);

  // Comprobar si tiene Namespaces instalados
  if (data.HookNamespaces) {
    console.log("Namespaces instalados: Sí");
    console.log("Namespaces:", data.HookNamespaces);
  } else {
    console.log("Namespaces instalados: No");
  }

  await client.disconnect();
}

getAccountInfo("rYourAddressHere");`,
            en: `const { Client } = require("xahau");

async function getAccountInfo(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  });

  const data = response.result.account_data;
  console.log("=== Account Data ===");
  console.log("Address:", data.Account);
  console.log("Balance:", Number(data.Balance) / 1_000_000, "XAH");
  console.log("Sequence:", data.Sequence);
  console.log("Owner Count:", data.OwnerCount);
  console.log("Flags:", data.Flags);

  // Check if Namespaces are installed
  if (data.HookNamespaces) {
    console.log("Namespaces installed: Yes");
    console.log("Namespaces:", data.HookNamespaces);
  } else {
    console.log("Namespaces installed: No");
  }

  await client.disconnect();
}

getAccountInfo("rYourAddressHere");`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "Conexión a Xahau", en: "Connecting to Xahau", jp: "" },
          content: {
            es: "Conexión vía WebSocket a nodos públicos\n\n🌐 Mainnet: wss://xahau.network\n🧪 Testnet: wss://xahau-test.net\n\nAPI JSON-RPC para todas las consultas",
            en: "WebSocket connection to public nodes\n\n🌐 Mainnet: wss://xahau.network\n🧪 Testnet: wss://xahau-test.net\n\nJSON-RPC API for all queries",
            jp: "",
          },
          visual: "🔌",
        },
        {
          title: { es: "Comandos principales", en: "Main commands", jp: "" },
          content: {
            es: "• server_info → Estado del nodo\n• account_info → Datos de cuenta\n• account_lines → TrustLines\n• account_objects → Objetos de la cuenta\n• account_tx → Historial de transacciones\n• ledger → Info del ledger",
            en: "• server_info → Node status\n• account_info → Account data\n• account_lines → TrustLines\n• account_objects → Account objects\n• account_tx → Transaction history\n• ledger → Ledger info",
            jp: "",
          },
          visual: "📡",
        },
        {
          title: { es: "Buenas prácticas de conexión", en: "Connection best practices", jp: "" },
          content: {
            es: "• Envuelve conexiones en try/catch\n• Implementa reconexión automática\n• Escucha el evento 'disconnected'\n• Testnet para desarrollo, Mainnet para producción\n• Configura timeouts razonables\n• Valida respuestas antes de procesar",
            en: "• Wrap connections in try/catch\n• Implement automatic reconnection\n• Listen for the 'disconnected' event\n• Testnet for development, Mainnet for production\n• Configure reasonable timeouts\n• Validate responses before processing",
            jp: "",
          },
          visual: "🛡️",
        },
      ],
    },
    {
      id: "m4l2",
      title: {
        es: "Consultas avanzadas y suscripciones",
        en: "Advanced queries and subscriptions",
        jp: "",
      },
      theory: {
        es: `Más allá de las consultas básicas, Xahau permite consultar objetos específicos del ledger, el historial de transacciones de una cuenta y suscribirse a eventos en tiempo real.

### Historial de transacciones

El comando \`account_tx\` devuelve las transacciones asociadas a una cuenta. Puedes paginar los resultados usando el campo \`marker\`.

### Objetos de una cuenta

El comando \`account_objects\` devuelve todos los objetos del ledger asociados a una cuenta:
- TrustLines (líneas de confianza)
- Offers (órdenes en el DEX)
- URITokens (NFTs)
- Hooks instalados
- Estados de Hooks

### Suscripciones en tiempo real

Con el comando \`subscribe\` puedes recibir notificaciones cuando ocurren eventos:
- **ledger**: Notificación cada vez que se cierra un nuevo ledger
- **transactions**: Todas las transacciones de la red
- **accounts**: Transacciones que afectan a cuentas específicas

### Consulta de transacciones individuales

Puedes consultar los detalles de una transacción específica usando su **hash** con el comando \`tx\`.`,
        en: `Beyond basic queries, Xahau allows you to query specific ledger objects, an account's transaction history, and subscribe to real-time events.

### Transaction history

The \`account_tx\` command returns the transactions associated with an account. You can paginate results using the \`marker\` field.

### Account objects

The \`account_objects\` command returns all ledger objects associated with an account:
- TrustLines
- Offers (DEX orders)
- URITokens (NFTs)
- Installed Hooks
- Hook states

### Real-time subscriptions

With the \`subscribe\` command you can receive notifications when events occur:
- **ledger**: Notification every time a new ledger closes
- **transactions**: All network transactions
- **accounts**: Transactions affecting specific accounts

### Querying individual transactions

You can query the details of a specific transaction using its **hash** with the \`tx\` command.`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar historial de transacciones de una cuenta",
            en: "Query an account's transaction history",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function getAccountTransactions(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_tx",
    account: address,
    ledger_index_min: -1,
    ledger_index_max: -1,
    limit: 10,
  });

  console.log("=== Últimas transacciones ===");
  for (const item of response.result.transactions) {
    const tx = item.tx;
    console.log(\`Tipo: \${tx.TransactionType}\`);
    console.log(\`  Hash: \${item.tx.hash}\`);
    console.log(\`  Fecha: \${new Date((tx.date + 946684800) * 1000).toISOString()}\`);
    console.log(\`  Resultado: \${item.meta.TransactionResult}\`);

    if (tx.TransactionType === "Payment") {
      console.log(\`  De: \${tx.Account}\`);
      console.log(\`  A: \${tx.Destination}\`);
      console.log(\`  Cantidad: \${Number(tx.Amount) / 1_000_000} XAH\`);
    }
  }

  await client.disconnect();
}
//Ejemplo de dirección: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
getAccountTransactions("rYourAddressHere");`,
            en: `const { Client } = require("xahau");

async function getAccountTransactions(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_tx",
    account: address,
    ledger_index_min: -1,
    ledger_index_max: -1,
    limit: 10,
  });

  console.log("=== Latest transactions ===");
  for (const item of response.result.transactions) {
    const tx = item.tx;
    console.log(\`Type: \${tx.TransactionType}\`);
    console.log(\`  Hash: \${item.tx.hash}\`);
    console.log(\`  Date: \${new Date((tx.date + 946684800) * 1000).toISOString()}\`);
    console.log(\`  Result: \${item.meta.TransactionResult}\`);

    if (tx.TransactionType === "Payment") {
      console.log(\`  From: \${tx.Account}\`);
      console.log(\`  To: \${tx.Destination}\`);
      console.log(\`  Amount: \${Number(tx.Amount) / 1_000_000} XAH\`);
    }
  }

  await client.disconnect();
}
//Example address: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
getAccountTransactions("rYourAddressHere");`,
            jp: "",
          },
        },
        {
          title: {
            es: "Consultar objetos de una cuenta y suscribirse a eventos",
            en: "Query account objects and subscribe to events",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function getAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Consultar todos los objetos de la cuenta
  const response = await client.request({
    command: "account_objects",
    account: address,
    ledger_index: "validated",
  });

  console.log("=== Objetos de la cuenta ===");
  for (const obj of response.result.account_objects) {
    console.log(\`Tipo: \${obj.LedgerEntryType}\`);

    if (obj.LedgerEntryType === "RippleState") {
      console.log(\`  Token: \${obj.Balance.currency}\`);
      console.log(\`  Balance: \${obj.Balance.value}\`);
    } else if (obj.LedgerEntryType === "URIToken") {
      console.log(\`  URI: \${obj.URI}\`);
    }
  }

  // Suscribirse a las transacciones de esta cuenta
  console.log("Suscrito a las transacciones de la cuenta...");
  await client.request({
    command: "subscribe",
    accounts: [address]
  });

  client.on("transaction", (tx) => {
    console.log("¡Nueva transacción detectada!");
    console.log("Tipo:", tx.transaction.TransactionType);
    console.log("Resultado:", tx.meta.TransactionResult);
  });

  // Mantener conexión abierta 60 segundos
  setTimeout(() => client.disconnect(), 60000);
}
//Ejemplo de dirección: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
getAccountObjects("rYourAddressHere");`,
            en: `const { Client } = require("xahau");

async function getAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Query all account objects
  const response = await client.request({
    command: "account_objects",
    account: address,
    ledger_index: "validated",
  });

  console.log("=== Account objects ===");
  for (const obj of response.result.account_objects) {
    console.log(\`Type: \${obj.LedgerEntryType}\`);

    if (obj.LedgerEntryType === "RippleState") {
      console.log(\`  Token: \${obj.Balance.currency}\`);
      console.log(\`  Balance: \${obj.Balance.value}\`);
    } else if (obj.LedgerEntryType === "URIToken") {
      console.log(\`  URI: \${obj.URI}\`);
    }
  }

  // Subscribe to transactions for this account
  console.log("\Subscribed to account transactions...");
  await client.request({
    command: "subscribe",
    accounts: [address]
  });

  client.on("transaction", (tx) => {
    console.log("New transaction detected!");
    console.log("Type:", tx.transaction.TransactionType);
    console.log("Result:", tx.meta.TransactionResult);
  });

  // Keep connection open for 60 seconds
  setTimeout(() => client.disconnect(), 60000);
}
//Example address: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
getAccountObjects("rYourAddressHere");`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "Historial de transacciones", en: "Transaction history", jp: "" },
          content: {
            es: "account_tx → Historial de una cuenta\n\n• Paginar con marker\n• Filtrar por tipo de transacción\n• Ver resultados (éxito/fallo)\n• Consultar metadatos detallados",
            en: "account_tx → Account history\n\n• Paginate with marker\n• Filter by transaction type\n• View results (success/failure)\n• Query detailed metadata",
            jp: "",
          },
          visual: "📜",
        },
        {
          title: { es: "Tiempo real", en: "Real time", jp: "" },
          content: {
            es: "subscribe → Eventos en tiempo real\n\n• ledger → Cierre de ledgers\n• transactions → Todas las txs\n• accounts → Txs de cuentas específicas\n\nIdeal para monitorizar actividad",
            en: "subscribe → Real-time events\n\n• ledger → Ledger closings\n• transactions → All txs\n• accounts → Txs for specific accounts\n\nIdeal for monitoring activity",
            jp: "",
          },
          visual: "⚡",
        },
        {
          title: { es: "Suscripciones en detalle", en: "Subscriptions in detail", jp: "" },
          content: {
            es: "Comando subscribe para eventos en tiempo real:\n\n• Evento ledger → Nuevo ledger cerrado\n• Evento transaction → Tx confirmada\n• Escucha con client.on('transaction')\n• unsubscribe para dejar de escuchar\n• Mantén la conexión WebSocket abierta",
            en: "subscribe command for real-time events:\n\n• ledger event → New ledger closed\n• transaction event → Tx confirmed\n• Listen with client.on('transaction')\n• unsubscribe to stop listening\n• Keep the WebSocket connection open",
            jp: "",
          },
          visual: "📡",
        },
      ],
    },
    {
      id: "m4l3",
      title: {
        es: "Paginación y manejo de errores",
        en: "Pagination and error handling",
        jp: "",
      },
      theory: {
        es: `Cuando trabajas con la API de Xahau, es fundamental dominar dos aspectos: la **paginación** de resultados grandes y el **manejo de errores** para construir aplicaciones robustas.

### El sistema de marcadores (marker)

Muchos comandos de la API devuelven resultados paginados. Cuando hay más datos de los que caben en una sola respuesta, la API incluye un campo \`marker\` en el resultado. Para obtener la siguiente página, debes enviar el mismo comando incluyendo ese \`marker\`.

- El campo \`limit\` controla cuántos resultados por página (máximo varía según el comando, generalmente 200-400)
- Si la respuesta incluye \`marker\`, hay más páginas disponibles
- Si no hay \`marker\` en la respuesta, has llegado al final
- El valor del \`marker\` es opaco: no lo modifiques, simplemente pásalo tal cual

### Errores comunes de la API

| Error | Significado |
|---|---|
| \`actNotFound\` | La cuenta consultada no existe en el ledger |
| \`lgrNotFound\` | El ledger solicitado no fue encontrado |
| \`invalidParams\` | Parámetros incorrectos en la petición |
| \`noCurrent\` | El servidor no tiene un ledger actual disponible |
| \`noNetwork\` | El servidor no está conectado a la red |
| \`tooBusy\` | El servidor está sobrecargado |

### Buenas prácticas

- **Siempre envuelve las peticiones en try/catch**: Los errores de red, timeouts y errores de API deben manejarse siempre
- **Implementa reintentos**: Para errores transitorios como \`tooBusy\` o timeouts, reintenta con backoff exponencial
- **Valida las respuestas**: Verifica que \`result.status === "success"\` antes de procesar datos
- **Maneja desconexiones**: Escucha el evento \`disconnected\` del cliente y reconecta automáticamente
- **Rate limiting**: Los nodos públicos pueden limitar las peticiones. Añade pausas entre peticiones masivas
- **Timeouts**: Configura un timeout razonable para evitar que tu aplicación se quede colgada`,
        en: `When working with the Xahau API, it is essential to master two aspects: **pagination** of large result sets and **error handling** to build robust applications.

### The marker system

Many API commands return paginated results. When there is more data than fits in a single response, the API includes a \`marker\` field in the result. To get the next page, you must send the same command including that \`marker\`.

- The \`limit\` field controls how many results per page (maximum varies by command, generally 200-400)
- If the response includes a \`marker\`, more pages are available
- If there is no \`marker\` in the response, you have reached the end
- The \`marker\` value is opaque: do not modify it, simply pass it as-is

### Common API errors

| Error | Meaning |
|---|---|
| \`actNotFound\` | The queried account does not exist in the ledger |
| \`lgrNotFound\` | The requested ledger was not found |
| \`invalidParams\` | Incorrect parameters in the request |
| \`noCurrent\` | The server does not have a current ledger available |
| \`noNetwork\` | The server is not connected to the network |
| \`tooBusy\` | The server is overloaded |

### Best practices

- **Always wrap requests in try/catch**: Network errors, timeouts, and API errors must always be handled
- **Implement retries**: For transient errors like \`tooBusy\` or timeouts, retry with exponential backoff
- **Validate responses**: Verify that \`result.status === "success"\` before processing data
- **Handle disconnections**: Listen for the client's \`disconnected\` event and reconnect automatically
- **Rate limiting**: Public nodes may throttle requests. Add pauses between bulk requests
- **Timeouts**: Configure a reasonable timeout to prevent your application from hanging`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Paginar todos los objetos de una cuenta usando marker",
            en: "Paginate all account objects using marker",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function getAllAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  let allObjects = [];
  let marker = undefined;
  let page = 1;

  console.log("=== Obteniendo todos los objetos de", address, "===");

  do {
    const request = {
      command: "account_objects",
      account: address,
      ledger_index: "validated",
      limit: 100,
    };

    // Incluir marker solo si existe (no en la primera petición)
    if (marker) {
      request.marker = marker;
    }

    const response = await client.request(request);
    const objects = response.result.account_objects;
    allObjects = allObjects.concat(objects);

    console.log(\`Página \${page}: \${objects.length} objetos recibidos\`);

    // Actualizar marker para la siguiente página
    marker = response.result.marker;
    page++;

    // Pequeña pausa para no saturar el nodo
    if (marker) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  } while (marker);

  console.log(\`nTotal de objetos obtenidos: \${allObjects.length}\`);

  // Agrupar por tipo
  const byType = {};
  for (const obj of allObjects) {
    const type = obj.LedgerEntryType;
    byType[type] = (byType[type] || 0) + 1;
  }

  console.log("Resumen por tipo:");
  for (const [type, count] of Object.entries(byType)) {
    console.log(\`  \${type}: \${count}\`);
  }

  await client.disconnect();
}
//Ejemplo de cuenta: rHh1YJN4kwRdw4Y29Xu1EY9qW8u36vAYLc
getAllAccountObjects("rYourAddressHere");`,
            en: `const { Client } = require("xahau");

async function getAllAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  let allObjects = [];
  let marker = undefined;
  let page = 1;

  console.log("=== Getting all objects for", address, "===");

  do {
    const request = {
      command: "account_objects",
      account: address,
      ledger_index: "validated",
      limit: 100,
    };

    // Include marker only if it exists (not on the first request)
    if (marker) {
      request.marker = marker;
    }

    const response = await client.request(request);
    const objects = response.result.account_objects;
    allObjects = allObjects.concat(objects);

    console.log(\`Page \${page}: \${objects.length} objects received\`);

    // Update marker for the next page
    marker = response.result.marker;
    page++;

    // Small pause to avoid overloading the node
    if (marker) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  } while (marker);

  console.log(\`Total objects retrieved: \${allObjects.length}\`);

  // Group by type
  const byType = {};
  for (const obj of allObjects) {
    const type = obj.LedgerEntryType;
    byType[type] = (byType[type] || 0) + 1;
  }

  console.log("Summary by type:");
  for (const [type, count] of Object.entries(byType)) {
    console.log(\`  \${type}: \${count}\`);
  }

  await client.disconnect();
}
//Example account: rHh1YJN4kwRdw4Y29Xu1EY9qW8u36vAYLc
getAllAccountObjects("rYourAddressHere");`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "Paginación con marker", en: "Pagination with marker", jp: "" },
          content: {
            es: "Cuando hay muchos resultados, la API pagina:\n\n1. Envía tu consulta con limit\n2. Si la respuesta tiene marker, hay más datos\n3. Reenvía la consulta incluyendo el marker\n4. Repite hasta que no haya marker\n\nNunca modifiques el valor del marker",
            en: "When there are many results, the API paginates:\n\n1. Send your query with limit\n2. If the response has a marker, there is more data\n3. Resend the query including the marker\n4. Repeat until there is no marker\n\nNever modify the marker value",
            jp: "",
          },
          visual: "📄",
        },
        {
          title: { es: "Errores comunes", en: "Common errors", jp: "" },
          content: {
            es: "• actNotFound → Cuenta no existe\n• lgrNotFound → Ledger no encontrado\n• invalidParams → Parámetros incorrectos\n• noCurrent → Sin ledger actual\n• noNetwork → Sin conexión a la red\n• tooBusy → Servidor sobrecargado",
            en: "• actNotFound → Account does not exist\n• lgrNotFound → Ledger not found\n• invalidParams → Incorrect parameters\n• noCurrent → No current ledger\n• noNetwork → No network connection\n• tooBusy → Server overloaded",
            jp: "",
          },
          visual: "⚠️",
        },
        {
          title: { es: "Buenas prácticas", en: "Best practices", jp: "" },
          content: {
            es: "• Siempre usar try/catch en las peticiones\n• Reintentar con backoff exponencial\n• Validar result.status === 'success'\n• Escuchar evento 'disconnected'\n• Pausar entre peticiones masivas\n• Configurar timeouts razonables",
            en: "• Always use try/catch for requests\n• Retry with exponential backoff\n• Validate result.status === 'success'\n• Listen for the 'disconnected' event\n• Pause between bulk requests\n• Configure reasonable timeouts",
            jp: "",
          },
          visual: "🛡️",
        },
      ],
    },
    {
      id: "m4l4",
      title: {
        es: "Trabajando con objetos del ledger",
        en: "Working with ledger objects",
        jp: "",
      },
      theory: {
        es: `El ledger de Xahau almacena toda la información en forma de **objetos** (ledger entries). Cada objeto tiene un tipo, un índice único (hash) y campos específicos. En esta lección aprenderemos a consultar y trabajar con estos objetos directamente.

### El comando ledger_entry

Con \`ledger_entry\` puedes consultar un objeto específico del ledger usando su **índice** (hash de 64 caracteres hex). Esto es útil cuando ya conoces el identificador exacto del objeto que necesitas.

### Tipos de objetos consultables

| Tipo | Descripción |
|---|---|
| \`AccountRoot\` | Datos principales de una cuenta |
| \`RippleState\` | Línea de confianza entre dos cuentas |
| \`Offer\` | Orden activa en el DEX |
| \`URIToken\` | Token no fungible (NFT de Xahau) |
| \`Hook\` | Definición de un Hook instalado |
| \`HookState\` | Estado almacenado por un Hook |

### El comando account_objects con filtro de tipo

El comando \`account_objects\` acepta el parámetro \`type\` para filtrar solo los objetos de un tipo específico. Los valores válidos incluyen:
- \`"state"\` → RippleState (trust lines)
- \`"offer"\` → Offers (órdenes del DEX)
- \`"uri_token"\` → URITokens
- \`"hook"\` → Hooks instalados

### Entendiendo los índices del ledger

Cada objeto en el ledger tiene un **índice único** calculado como un hash SHA-512Half de sus datos identificativos. Por ejemplo:
- El índice de un AccountRoot se calcula a partir de la dirección de la cuenta
- El índice de un RippleState se calcula a partir de las dos cuentas y la moneda

Estos índices son determinísticos: siempre puedes recalcularlos si conoces los datos de entrada.`,
        en: `The Xahau ledger stores all information as **objects** (ledger entries). Each object has a type, a unique index (hash), and specific fields. In this lesson we will learn how to query and work with these objects directly.

### The ledger_entry command

With \`ledger_entry\` you can query a specific ledger object using its **index** (64-character hex hash). This is useful when you already know the exact identifier of the object you need.

### Queryable object types

| Type | Description |
|---|---|
| \`AccountRoot\` | Main account data |
| \`RippleState\` | Trust line between two accounts |
| \`Offer\` | Active order on the DEX |
| \`URIToken\` | Non-fungible token (Xahau NFT) |
| \`Hook\` | Definition of an installed Hook |
| \`HookState\` | State stored by a Hook |

### The account_objects command with type filter

The \`account_objects\` command accepts the \`type\` parameter to filter only objects of a specific type. Valid values include:
- \`"state"\` → RippleState (trust lines)
- \`"offer"\` → Offers (DEX orders)
- \`"uri_token"\` → URITokens
- \`"hook"\` → Installed Hooks

### Understanding ledger indexes

Each object in the ledger has a **unique index** calculated as a SHA-512Half hash of its identifying data. For example:
- The index of an AccountRoot is calculated from the account address
- The index of a RippleState is calculated from the two accounts and the currency

These indexes are deterministic: you can always recalculate them if you know the input data.`,
        jp: "",
      },
      codeBlocks: [

        {
          title: {
            es: "Consultar account_objects filtrados por tipo",
            en: "Query account_objects filtered by type",
            jp: "",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function getObjectsByType(address, type) {
  const client = new Client("wss://xahau.network");
  await client.connect();

  let allObjects = [];
  let marker = undefined;

  do {
    const request = {
      command: "account_objects",
      account: address,
      type: type,
      ledger_index: "validated",
      limit: 100,
    };
    if (marker) request.marker = marker;

    const response = await client.request(request);
    allObjects = allObjects.concat(response.result.account_objects);
    marker = response.result.marker;
  } while (marker);

  console.log(\`=== \${type.toUpperCase()} para \${address} ===\`);
  console.log(\`Total encontrados: \${allObjects.length}\`);

  for (const obj of allObjects) {
    switch (type) {
      case "state": // RippleState (trust lines)
        const currency = obj.Balance.currency;
        const balance = obj.Balance.value;
        const peer = obj.HighLimit.issuer === address
          ? obj.LowLimit.issuer
          : obj.HighLimit.issuer;
        console.log(\`  \${currency}: balance \${balance} (peer: \${peer})\`);
        break;

      case "offer":
        const pays = typeof obj.TakerPays === "string"
          ? \`\${Number(obj.TakerPays) / 1_000_000} XAH\`
          : \`\${obj.TakerPays.value} \${obj.TakerPays.currency}\`;
        const gets = typeof obj.TakerGets === "string"
          ? \`\${Number(obj.TakerGets) / 1_000_000} XAH\`
          : \`\${obj.TakerGets.value} \${obj.TakerGets.currency}\`;
        console.log(\`  Offer: paga \${pays} → recibe \${gets}\`);
        break;

      case "uri_token":
        const uri = Buffer.from(obj.URI || "", "hex").toString("utf8");
        console.log(\`  URIToken: \${uri}\`);
        console.log(\`    Index: \${obj.index}\`);
        break;

      default:
        console.log(\`  \${obj.LedgerEntryType}: \${obj.index}\`);
    }
  }

  await client.disconnect();
}

// Ejemplos de uso:
// Ver trust lines
getObjectsByType("rDk1xiArDMjDqnrR2yWypwQAKg4mKnQYvs", "state");

// Ver órdenes DEX
// getObjectsByType("rfmPQz4eSmisCVnWJkKj82hHKQdrUPv3Px", "offer");

// Ver URITokens
// getObjectsByType("rfPMnDQEzb5StPXj3Dkd34oKY4BVAJCwsn", "uri_token");`,
            en: `const { Client } = require("xahau");

async function getObjectsByType(address, type) {
  const client = new Client("wss://xahau.network");
  await client.connect();

  let allObjects = [];
  let marker = undefined;

  do {
    const request = {
      command: "account_objects",
      account: address,
      type: type,
      ledger_index: "validated",
      limit: 100,
    };
    if (marker) request.marker = marker;

    const response = await client.request(request);
    allObjects = allObjects.concat(response.result.account_objects);
    marker = response.result.marker;
  } while (marker);

  console.log(\`=== \${type.toUpperCase()} for \${address} ===\`);
  console.log(\`Total found: \${allObjects.length}\`);

  for (const obj of allObjects) {
    switch (type) {
      case "state": // RippleState (trust lines)
        const currency = obj.Balance.currency;
        const balance = obj.Balance.value;
        const peer = obj.HighLimit.issuer === address
          ? obj.LowLimit.issuer
          : obj.HighLimit.issuer;
        console.log(\`  \${currency}: balance \${balance} (peer: \${peer})\`);
        break;

      case "offer":
        const pays = typeof obj.TakerPays === "string"
          ? \`\${Number(obj.TakerPays) / 1_000_000} XAH\`
          : \`\${obj.TakerPays.value} \${obj.TakerPays.currency}\`;
        const gets = typeof obj.TakerGets === "string"
          ? \`\${Number(obj.TakerGets) / 1_000_000} XAH\`
          : \`\${obj.TakerGets.value} \${obj.TakerGets.currency}\`;
        console.log(\`  Offer: pays \${pays} → receives \${gets}\`);
        break;

      case "uri_token":
        const uri = Buffer.from(obj.URI || "", "hex").toString("utf8");
        console.log(\`  URIToken: \${uri}\`);
        console.log(\`    Index: \${obj.index}\`);
        break;

      default:
        console.log(\`  \${obj.LedgerEntryType}: \${obj.index}\`);
    }
  }

  await client.disconnect();
}

// Usage examples:
// View trust lines
getObjectsByType("rDk1xiArDMjDqnrR2yWypwQAKg4mKnQYvs", "state");

// View DEX orders
// getObjectsByType("rfmPQz4eSmisCVnWJkKj82hHKQdrUPv3Px", "offer");

// View URITokens
// getObjectsByType("rfPMnDQEzb5StPXj3Dkd34oKY4BVAJCwsn", "uri_token");`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: { es: "Objetos del ledger", en: "Ledger objects", jp: "" },
          content: {
            es: "Todo en Xahau se almacena como objetos:\n\n• AccountRoot → Datos de cuenta\n• RippleState → Trust lines\n• Offer → Órdenes DEX\n• URIToken → NFTs\n• Hook → Hooks instalados\n\nCada objeto tiene un índice único (hash)",
            en: "Everything in Xahau is stored as objects:\n\n• AccountRoot → Account data\n• RippleState → Trust lines\n• Offer → DEX orders\n• URIToken → NFTs\n• Hook → Installed Hooks\n\nEach object has a unique index (hash)",
            jp: "",
          },
          visual: "🗂️",
        },
        {
          title: { es: "Consultas por tipo", en: "Queries by type", jp: "" },
          content: {
            es: "account_objects + type = filtro eficiente\n\n• type: 'state' → Trust lines\n• type: 'offer' → Órdenes DEX\n• type: 'uri_token' → NFTs\n• type: 'hook' → Hooks\n\nCombina con marker para paginar",
            en: "account_objects + type = efficient filtering\n\n• type: 'state' → Trust lines\n• type: 'offer' → DEX orders\n• type: 'uri_token' → NFTs\n• type: 'hook' → Hooks\n\nCombine with marker to paginate",
            jp: "",
          },
          visual: "🔎",
        },
      ],
    },
  ],
}
