export default {
  id: "m4",
  icon: "🔍",
  title: {
    es: "Consulta de datos a un nodo de la red",
    en: "Querying data from a network node",
    jp: "ネットワークノードへのデータ照会",
    ko: "네트워크 노드에서 데이터 조회하기",
    zh: "从网络节点查询数据",
  },
  lessons: [
    {
      id: "m4l1",
      title: {
        es: "Conexión a nodos Xahau",
        en: "Connecting to Xahau nodes",
        jp: "Xahauノードへの接続",
        ko: "Xahau 노드에 연결하기",
        zh: "连接到 Xahau 节点",
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
        jp: `Xahauブロックチェーンからデータを読み取るには、**WebSocket**を使用して**ネットワークノード**に接続する必要があります。ノードはJSON-RPC APIを公開しており、レジャーのすべての情報を照会できます。

### ノードの種類

- **パブリックノード**：コミュニティによって維持管理され、誰でもアクセス可能。開発に最適
- **プライベートノード**：より高い制御性と信頼性のために自分のノードを実行できる

### 主要なエンドポイント

| ネットワーク | WebSocket URL |
|---|---|
| メインネット | \`wss://xahau.network\` |
| テストネット | \`wss://xahau-test.net\` |

### 照会の種類

Xahau APIは次のようなコマンドを提供しています。
- **サーバー情報**：\`server_info\`、\`server_state\`
- **アカウント**：\`account_info\`、\`account_lines\`、\`account_objects\`、\`account_tx\`
- **レジャー**：\`ledger\`、\`ledger_data\`、\`ledger_entry\`
- **トランザクション**：\`tx\`、\`transaction_entry\`
- **サブスクリプション**：リアルタイムイベント用の\`subscribe\`/\`unsubscribe\`

### 重要な概念

- **レジャーインデックス** (\`ledger_index\`)：番号で特定のレジャーを照会できる。最後に検証されたものには\`"validated"\`を使用
- **ドロップ（drops）**：XAHの量はドロップで表現される（1 XAH = 1,000,000ドロップ）
- **マーカー** (\`marker\`)：大量の結果をページングするために、APIはマーカーを使用する`,
        ko: `Xahau 블록체인에서 데이터를 읽으려면 **WebSocket**을 통해 **네트워크 노드**에 연결해야 합니다. 노드는 JSON-RPC API를 제공하며, 이를 통해 ledger의 모든 정보를 조회할 수 있습니다.

### 노드 유형

- **공용 노드**: 커뮤니티가 운영하며 누구나 접근할 수 있습니다. 개발에 적합합니다
- **자체 노드**: 더 높은 제어력과 안정성을 위해 직접 노드를 운영할 수 있습니다

### 주요 엔드포인트

| 네트워크 | WebSocket URL |
|---|---|
| Mainnet | \`wss://xahau.network\` |
| Testnet | \`wss://xahau-test.net\` |

### 조회 유형

Xahau API는 다음 명령을 제공합니다:
- **서버 정보**: \`server_info\`, \`server_state\`
- **계정**: \`account_info\`, \`account_lines\`, \`account_objects\`, \`account_tx\`
- **Ledger**: \`ledger\`, \`ledger_data\`, \`ledger_entry\`
- **트랜잭션**: \`tx\`, \`transaction_entry\`
- **구독**: 실시간 이벤트를 위한 \`subscribe\` / \`unsubscribe\`

### 중요한 개념

- **Ledger index**: 번호로 특정 ledger를 조회하거나, 마지막 검증 ledger에는 \`"validated"\`를 사용할 수 있습니다
- **Drops**: XAH 수량은 drops 단위로 표현됩니다 (1 XAH = 1,000,000 drops)
- **Markers**: 많은 결과를 페이지네이션할 때 API가 marker를 사용합니다`,
        zh: `要从 Xahau 区块链读取数据，你需要通过 **WebSocket** 连接到**网络节点**。节点暴露 JSON-RPC API，可查询账本的所有信息。

### 节点类型

- **公共节点**：由社区维护，任何人均可访问。适合开发使用
- **自有节点**：你可以运行自己的节点，以获得更高的控制力和可靠性

### 主要端点

| 网络 | WebSocket URL |
|---|---|
| 主网 | \`wss://xahau.network\` |
| 测试网 | \`wss://xahau-test.net\` |

### 查询类型

Xahau API 提供以下命令：
- **服务器信息**：\`server_info\`、\`server_state\`
- **账户**：\`account_info\`、\`account_lines\`、\`account_objects\`、\`account_tx\`
- **账本**：\`ledger\`、\`ledger_data\`、\`ledger_entry\`
- **交易**：\`tx\`、\`transaction_entry\`
- **订阅**：用于实时事件的 \`subscribe\` / \`unsubscribe\`

### 重要概念

- **账本索引（Ledger index）**：可按编号查询特定账本，或使用 \`"validated"\` 查询最新已验证账本
- **Drops**：XAH 数量以 drops 表示（1 XAH = 1,000,000 drops）
- **标记（Markers）**：对大量结果分页时，API 使用标记`,
      },
      codeBlocks: [
        {
          title: {
            es: "Conectar y consultar información del servidor",
            en: "Connect and query server information",
            jp: "サーバー情報の接続と照会",
            ko: "서버 정보 연결 및 조회",
            zh: "连接并查询服务器信息",
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
            jp: `const { Client } = require("xahau");

async function getServerInfo() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("=== サーバー情報 ===");
  console.log("バージョン：", info.build_version);
  console.log("ネットワークID：", info.network_id);
  console.log("状態：", info.server_state);
  console.log("接続ピア数：", info.peers);
  console.log("検証済みレジャー：", info.validated_ledger.seq);
  console.log("検証クォーラム：", info.validation_quorum);

  await client.disconnect();
}

getServerInfo();`,
            ko: `const { Client } = require("xahau");

async function getServerInfo() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("=== 서버 정보 ===");
  console.log("버전:", info.build_version);
  console.log("네트워크 ID:", info.network_id);
  console.log("상태:", info.server_state);
  console.log("연결된 피어 수:", info.peers);
  console.log("검증된 ledger:", info.validated_ledger.seq);
  console.log("검증 쿼럼:", info.validation_quorum);

  await client.disconnect();
}

getServerInfo();`,
            zh: `const { Client } = require("xahau");

async function getServerInfo() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("=== 服务器信息 ===");
  console.log("版本:", info.build_version);
  console.log("网络 ID:", info.network_id);
  console.log("状态:", info.server_state);
  console.log("已连接节点数:", info.peers);
  console.log("已验证账本:", info.validated_ledger.seq);
  console.log("验证法定人数:", info.validation_quorum);

  await client.disconnect();
}

getServerInfo();`,
          },
        },
        {
          title: {
            es: "Consultar información detallada de una cuenta",
            en: "Query detailed account information",
            jp: "アカウントの詳細情報を照会する",
            ko: "계정 상세 정보 조회",
            zh: "查询账户详细信息",
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
            jp: `const { Client } = require("xahau");

async function getAccountInfo(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  });

  const data = response.result.account_data;
  console.log("=== アカウントデータ ===");
  console.log("アドレス：", data.Account);
  console.log("残高：", Number(data.Balance) / 1_000_000, "XAH");
  console.log("シーケンス：", data.Sequence);
  console.log("OwnerCount：", data.OwnerCount);
  console.log("フラグ：", data.Flags);

  // Namespaceがインストールされているか確認
  if (data.HookNamespaces) {
    console.log("Namespaceインストール済み：はい");
    console.log("Namespace：", data.HookNamespaces);
  } else {
    console.log("Namespaceインストール済み：いいえ");
  }

  await client.disconnect();
}

getAccountInfo("rYourAddressHere");`,
            ko: `const { Client } = require("xahau");

async function getAccountInfo(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  });

  const data = response.result.account_data;
  console.log("=== 계정 데이터 ===");
  console.log("주소:", data.Account);
  console.log("잔액:", Number(data.Balance) / 1_000_000, "XAH");
  console.log("시퀀스:", data.Sequence);
  console.log("Owner Count:", data.OwnerCount);
  console.log("플래그:", data.Flags);

  // Namespace 설치 여부 확인
  if (data.HookNamespaces) {
    console.log("Namespace 설치됨: 예");
    console.log("Namespaces:", data.HookNamespaces);
  } else {
    console.log("Namespace 설치됨: 아니오");
  }

  await client.disconnect();
}

getAccountInfo("rYourAddressHere");`,
            zh: `const { Client } = require("xahau");

async function getAccountInfo(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  });

  const data = response.result.account_data;
  console.log("=== 账户数据 ===");
  console.log("地址:", data.Account);
  console.log("余额:", Number(data.Balance) / 1_000_000, "XAH");
  console.log("序列号:", data.Sequence);
  console.log("拥有者数量:", data.OwnerCount);
  console.log("标志位:", data.Flags);

  // 检查是否安装了 Namespace
  if (data.HookNamespaces) {
    console.log("已安装 Namespace: 是");
    console.log("Namespaces:", data.HookNamespaces);
  } else {
    console.log("已安装 Namespace: 否");
  }

  await client.disconnect();
}

getAccountInfo("rYourAddressHere");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Conexión a Xahau", en: "Connecting to Xahau", jp: "Xahauへの接続", ko: "Xahau 연결" },
          content: {
            es: "Conexión vía WebSocket a nodos públicos\n\n🌐 Mainnet: wss://xahau.network\n🧪 Testnet: wss://xahau-test.net\n\nAPI JSON-RPC para todas las consultas",
            en: "WebSocket connection to public nodes\n\n🌐 Mainnet: wss://xahau.network\n🧪 Testnet: wss://xahau-test.net\n\nJSON-RPC API for all queries",
            jp: "パブリックノードへのWebSocket接続\n\n🌐 メインネット：wss://xahau.network\n🧪 テストネット：wss://xahau-test.net\n\nすべての照会にJSON-RPC API",
            ko: "공용 노드에 WebSocket으로 연결\n\n🌐 Mainnet: wss://xahau.network\n🧪 Testnet: wss://xahau-test.net\n\n모든 조회에 사용하는 JSON-RPC API",
          },
          visual: "🔌",
        },
        {
          title: { es: "Comandos principales", en: "Main commands", jp: "主要なコマンド", ko: "주요 명령" },
          content: {
            es: "• server_info → Estado del nodo\n• account_info → Datos de cuenta\n• account_lines → TrustLines\n• account_objects → Objetos de la cuenta\n• account_tx → Historial de transacciones\n• ledger → Info del ledger",
            en: "• server_info → Node status\n• account_info → Account data\n• account_lines → TrustLines\n• account_objects → Account objects\n• account_tx → Transaction history\n• ledger → Ledger info",
            jp: "• server_info → ノードの状態\n• account_info → アカウントデータ\n• account_lines → TrustLine\n• account_objects → アカウントオブジェクト\n• account_tx → トランザクション履歴\n• ledger → レジャー情報",
            ko: "• server_info → 노드 상태\n• account_info → 계정 데이터\n• account_lines → TrustLine\n• account_objects → 계정 객체\n• account_tx → 트랜잭션 기록\n• ledger → Ledger 정보",
          },
          visual: "📡",
        },
        {
          title: { es: "Buenas prácticas de conexión", en: "Connection best practices", jp: "接続のベストプラクティス", ko: "연결 모범 사례" },
          content: {
            es: "• Envuelve conexiones en try/catch\n• Implementa reconexión automática\n• Escucha el evento 'disconnected'\n• Testnet para desarrollo, Mainnet para producción\n• Configura timeouts razonables\n• Valida respuestas antes de procesar",
            en: "• Wrap connections in try/catch\n• Implement automatic reconnection\n• Listen for the 'disconnected' event\n• Testnet for development, Mainnet for production\n• Configure reasonable timeouts\n• Validate responses before processing",
            jp: "• try/catchで接続をラップする\n• 自動再接続を実装する\n• 'disconnected'イベントをリッスンする\n• 開発にはTestnet、本番にはMainnet\n• 適切なタイムアウトを設定する\n• 処理前にレスポンスを検証する",
            ko: "• 연결 로직을 try/catch로 감싸기\n• 자동 재연결 구현\n• 'disconnected' 이벤트 감지\n• 개발은 Testnet, 운영은 Mainnet 사용\n• 적절한 timeout 설정\n• 처리 전에 응답 검증",
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
        jp: "高度な照会とサブスクリプション",
        ko: "고급 조회와 구독",
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
        jp: `基本的な照会を超えて、Xahauは特定のレジャーオブジェクト、アカウントのトランザクション履歴を照会し、リアルタイムイベントをサブスクライブすることができます。

### トランザクション履歴

\`account_tx\`コマンドはアカウントに関連するトランザクションを返します。\`marker\`フィールドを使用して結果をページングできます。

### アカウントオブジェクト

\`account_objects\`コマンドはアカウントに関連するすべてのレジャーオブジェクトを返します。
- TrustLine（トラストライン）
- Offer（DEXの注文）
- URIToken（NFT）
- インストールされたHook
- HookState

### リアルタイムサブスクリプション

\`subscribe\`コマンドを使用して、イベントが発生したときに通知を受け取ることができます。
- **ledger**：新しいレジャーが閉じるたびに通知
- **transactions**：ネットワークのすべてのトランザクション
- **accounts**：特定のアカウントに影響するトランザクション

### 個別トランザクションの照会

\`tx\`コマンドを使用して、**ハッシュ**から特定のトランザクションの詳細を照会できます。`,
        ko: `기본 조회를 넘어서, Xahau는 특정 ledger 객체, 계정의 트랜잭션 기록을 조회하고 실시간 이벤트를 구독할 수 있게 해 줍니다.

### 트랜잭션 기록

\`account_tx\` 명령은 계정과 관련된 트랜잭션을 반환합니다. \`marker\` 필드를 사용해 결과를 페이지네이션할 수 있습니다.

### 계정 객체

\`account_objects\` 명령은 계정과 연결된 모든 ledger 객체를 반환합니다:
- TrustLine
- Offer(DEX 주문)
- URIToken(NFT)
- 설치된 Hook
- Hook 상태

### 실시간 구독

\`subscribe\` 명령으로 이벤트가 발생할 때 알림을 받을 수 있습니다:
- **ledger**: 새 ledger가 닫힐 때마다 알림
- **transactions**: 네트워크의 모든 트랜잭션
- **accounts**: 특정 계정에 영향을 주는 트랜잭션

### 개별 트랜잭션 조회

\`tx\` 명령을 사용하면 **해시**로 특정 트랜잭션의 상세 정보를 조회할 수 있습니다.`,
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar historial de transacciones de una cuenta",
            en: "Query an account's transaction history",
            jp: "アカウントのトランザクション履歴を照会する",
            ko: "계정 트랜잭션 기록 조회",
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
            jp: `const { Client } = require("xahau");

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

  console.log("=== 最近のトランザクション ===");
  for (const item of response.result.transactions) {
    const tx = item.tx;
    console.log(\`タイプ：\${tx.TransactionType}\`);
    console.log(\`  ハッシュ：\${item.tx.hash}\`);
    console.log(\`  日時：\${new Date((tx.date + 946684800) * 1000).toISOString()}\`);
    console.log(\`  結果：\${item.meta.TransactionResult}\`);

    if (tx.TransactionType === "Payment") {
      console.log(\`  送信元：\${tx.Account}\`);
      console.log(\`  送信先：\${tx.Destination}\`);
      console.log(\`  金額：\${Number(tx.Amount) / 1_000_000} XAH\`);
    }
  }

  await client.disconnect();
}
//アドレスの例：rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
getAccountTransactions("rYourAddressHere");`,
            ko: `const { Client } = require("xahau");

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

  console.log("=== 최근 트랜잭션 ===");
  for (const item of response.result.transactions) {
    const tx = item.tx;
    console.log(\`유형: \${tx.TransactionType}\`);
    console.log(\`  해시: \${item.tx.hash}\`);
    console.log(\`  날짜: \${new Date((tx.date + 946684800) * 1000).toISOString()}\`);
    console.log(\`  결과: \${item.meta.TransactionResult}\`);

    if (tx.TransactionType === "Payment") {
      console.log(\`  보내는 계정: \${tx.Account}\`);
      console.log(\`  받는 계정: \${tx.Destination}\`);
      console.log(\`  금액: \${Number(tx.Amount) / 1_000_000} XAH\`);
    }
  }

  await client.disconnect();
}
//예시 주소: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
getAccountTransactions("rYourAddressHere");`,
          },
        },
        {
          title: {
            es: "Consultar objetos de una cuenta y suscribirse a eventos",
            en: "Query account objects and subscribe to events",
            jp: "アカウントオブジェクトの照会とイベントのサブスクリプション",
            ko: "계정 객체 조회와 이벤트 구독",
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
            jp: `const { Client } = require("xahau");

async function getAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // アカウントのすべてのオブジェクトを照会する
  const response = await client.request({
    command: "account_objects",
    account: address,
    ledger_index: "validated",
  });

  console.log("=== アカウントオブジェクト ===");
  for (const obj of response.result.account_objects) {
    console.log(\`タイプ：\${obj.LedgerEntryType}\`);

    if (obj.LedgerEntryType === "RippleState") {
      console.log(\`  トークン：\${obj.Balance.currency}\`);
      console.log(\`  残高：\${obj.Balance.value}\`);
    } else if (obj.LedgerEntryType === "URIToken") {
      console.log(\`  URI：\${obj.URI}\`);
    }
  }

  // このアカウントのトランザクションをサブスクライブする
  console.log("アカウントのトランザクションをサブスクライブ中...");
  await client.request({
    command: "subscribe",
    accounts: [address]
  });

  client.on("transaction", (tx) => {
    console.log("新しいトランザクションを検出！");
    console.log("タイプ：", tx.transaction.TransactionType);
    console.log("結果：", tx.meta.TransactionResult);
  });

  // 60秒間接続を維持する
  setTimeout(() => client.disconnect(), 60000);
}
//アドレスの例：rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
getAccountObjects("rYourAddressHere");`,
            ko: `const { Client } = require("xahau");

async function getAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 계정의 모든 객체 조회
  const response = await client.request({
    command: "account_objects",
    account: address,
    ledger_index: "validated",
  });

  console.log("=== 계정 객체 ===");
  for (const obj of response.result.account_objects) {
    console.log(\`유형: \${obj.LedgerEntryType}\`);

    if (obj.LedgerEntryType === "RippleState") {
      console.log(\`  토큰: \${obj.Balance.currency}\`);
      console.log(\`  잔액: \${obj.Balance.value}\`);
    } else if (obj.LedgerEntryType === "URIToken") {
      console.log(\`  URI: \${obj.URI}\`);
    }
  }

  // 이 계정의 트랜잭션 구독
  console.log("계정 트랜잭션 구독 중...");
  await client.request({
    command: "subscribe",
    accounts: [address]
  });

  client.on("transaction", (tx) => {
    console.log("새 트랜잭션 감지!");
    console.log("유형:", tx.transaction.TransactionType);
    console.log("결과:", tx.meta.TransactionResult);
  });

  // 60초 동안 연결 유지
  setTimeout(() => client.disconnect(), 60000);
}
//예시 주소: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
getAccountObjects("rYourAddressHere");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Historial de transacciones", en: "Transaction history", jp: "トランザクション履歴", ko: "트랜잭션 기록" },
          content: {
            es: "account_tx → Historial de una cuenta\n\n• Paginar con marker\n• Filtrar por tipo de transacción\n• Ver resultados (éxito/fallo)\n• Consultar metadatos detallados",
            en: "account_tx → Account history\n\n• Paginate with marker\n• Filter by transaction type\n• View results (success/failure)\n• Query detailed metadata",
            jp: "account_tx → アカウントの履歴\n\n• markerでページング\n• トランザクションタイプでフィルタリング\n• 結果を確認（成功/失敗）\n• 詳細なメタデータを照会",
            ko: "account_tx → 계정 기록\n\n• marker로 페이지네이션\n• 트랜잭션 유형별 필터링\n• 결과 확인(성공/실패)\n• 상세 메타데이터 조회",
          },
          visual: "📜",
        },
        {
          title: { es: "Tiempo real", en: "Real time", jp: "リアルタイム", ko: "실시간" },
          content: {
            es: "subscribe → Eventos en tiempo real\n\n• ledger → Cierre de ledgers\n• transactions → Todas las txs\n• accounts → Txs de cuentas específicas\n\nIdeal para monitorizar actividad",
            en: "subscribe → Real-time events\n\n• ledger → Ledger closings\n• transactions → All txs\n• accounts → Txs for specific accounts\n\nIdeal for monitoring activity",
            jp: "subscribe → リアルタイムイベント\n\n• ledger → レジャーのクローズ\n• transactions → すべてのtx\n• accounts → 特定アカウントのtx\n\nアクティビティの監視に最適",
            ko: "subscribe → 실시간 이벤트\n\n• ledger → ledger 닫힘 알림\n• transactions → 모든 tx\n• accounts → 특정 계정 tx\n\n활동 모니터링에 적합",
          },
          visual: "⚡",
        },
        {
          title: { es: "Suscripciones en detalle", en: "Subscriptions in detail", jp: "サブスクリプションの詳細", ko: "구독 상세" },
          content: {
            es: "Comando subscribe para eventos en tiempo real:\n\n• Evento ledger → Nuevo ledger cerrado\n• Evento transaction → Tx confirmada\n• Escucha con client.on('transaction')\n• unsubscribe para dejar de escuchar\n• Mantén la conexión WebSocket abierta",
            en: "subscribe command for real-time events:\n\n• ledger event → New ledger closed\n• transaction event → Tx confirmed\n• Listen with client.on('transaction')\n• unsubscribe to stop listening\n• Keep the WebSocket connection open",
            jp: "リアルタイムイベントのsubscribeコマンド：\n\n• ledgerイベント → 新しいレジャーがクローズ\n• transactionイベント → txが確認済み\n• client.on('transaction')でリッスン\n• unsubscribeでリッスン停止\n• WebSocket接続を開いたままにする",
            ko: "실시간 이벤트용 subscribe 명령:\n\n• ledger 이벤트 → 새 ledger 닫힘\n• transaction 이벤트 → tx 확인\n• client.on('transaction')로 수신\n• unsubscribe로 중지\n• WebSocket 연결을 계속 유지",
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
        jp: "ページネーションとエラー処理",
        ko: "페이지네이션과 오류 처리",
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
        jp: `Xahau APIを使用する際、大量の結果セットの**ページネーション**と、堅牢なアプリケーションを構築するための**エラー処理**といった2つの側面をマスターすることが不可欠です。

### マーカーシステム

多くのAPIコマンドはページングされた結果を返します。1つのレスポンスに収まらないデータがある場合、APIは結果に\`marker\`フィールドを含めます。次のページを取得するには、その\`marker\`を含めて同じコマンドを送信する必要があります。

- \`limit\`フィールドはページあたりの結果数を制御する（最大値はコマンドによって異なる、一般的に200〜400）
- レスポンスに\`marker\`が含まれている場合、さらにページがある
- レスポンスに\`marker\`がない場合、最後まで到達した
- \`marker\`の値は不透明：変更しないで、そのまま渡すこと

### よくあるAPIエラー

| エラー | 意味 |
|---|---|
| \`actNotFound\` | 照会されたアカウントがレジャーに存在しない |
| \`lgrNotFound\` | リクエストされたレジャーが見つからなかった |
| \`invalidParams\` | リクエストのパラメータが正しくない |
| \`noCurrent\` | サーバーに現在のレジャーが利用できない |
| \`noNetwork\` | サーバーがネットワークに接続されていない |
| \`tooBusy\` | サーバーが過負荷状態 |

### ベストプラクティス

- **常にリクエストをtry/catchでラップする**：ネットワークエラー、タイムアウト、APIエラーは常に処理する必要がある
- **リトライを実装する**：\`tooBusy\`やタイムアウトなどの一時的なエラーに対しては、指数バックオフでリトライする
- **レスポンスを検証する**：データを処理する前に\`result.status === "success"\`を確認する
- **切断を処理する**：クライアントの\`disconnected\`イベントをリッスンし、自動的に再接続する
- **レート制限**：パブリックノードはリクエストを制限する場合がある。大量リクエスト間には間隔を設ける
- **タイムアウト**：アプリケーションがハングしないよう、適切なタイムアウトを設定する`,
        ko: `Xahau API를 사용할 때는 두 가지를 꼭 익혀야 합니다. 많은 결과를 다룰 때의 **페이지네이션**과, 안정적인 애플리케이션을 위한 **오류 처리**입니다.

### marker 시스템

많은 API 명령은 페이지네이션된 결과를 반환합니다. 한 응답에 다 담기지 않는 데이터가 있으면 결과에 \`marker\` 필드가 포함됩니다. 다음 페이지를 가져오려면 같은 명령에 그 \`marker\`를 함께 보내야 합니다.

- \`limit\` 필드는 페이지당 결과 수를 제어합니다 (명령마다 최대치가 다르며 보통 200~400)
- 응답에 \`marker\`가 있으면 다음 페이지가 더 있습니다
- 응답에 \`marker\`가 없으면 마지막 페이지입니다
- \`marker\` 값은 불투명합니다. 수정하지 말고 그대로 다시 보내야 합니다

### 흔한 API 오류

| Error | 의미 |
|---|---|
| \`actNotFound\` | 조회한 계정이 ledger에 존재하지 않음 |
| \`lgrNotFound\` | 요청한 ledger를 찾지 못함 |
| \`invalidParams\` | 요청 파라미터가 올바르지 않음 |
| \`noCurrent\` | 현재 ledger를 사용할 수 없음 |
| \`noNetwork\` | 서버가 네트워크에 연결되지 않음 |
| \`tooBusy\` | 서버가 과부하 상태임 |

### 모범 사례

- **항상 요청을 try/catch로 감싸기**: 네트워크 오류, timeout, API 오류를 항상 처리해야 합니다
- **재시도 구현**: \`tooBusy\`나 timeout 같은 일시적 오류에는 지수 백오프로 재시도합니다
- **응답 검증**: 데이터를 처리하기 전에 \`result.status === "success"\`를 확인합니다
- **연결 끊김 처리**: 클라이언트의 \`disconnected\` 이벤트를 감지하고 자동 재연결합니다
- **Rate limiting 고려**: 공용 노드는 요청을 제한할 수 있으므로 대량 요청 사이에 간격을 둡니다
- **Timeout 설정**: 애플리케이션이 멈추지 않도록 적절한 timeout을 설정합니다`,
      },
      codeBlocks: [
        {
          title: {
            es: "Paginar todos los objetos de una cuenta usando marker",
            en: "Paginate all account objects using marker",
            jp: "markerを使用してアカウントのすべてのオブジェクトをページングする",
            ko: "marker로 계정 객체 전체 페이지네이션",
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
            jp: `const { Client } = require("xahau");

async function getAllAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  let allObjects = [];
  let marker = undefined;
  let page = 1;

  console.log("=== ", address, "のすべてのオブジェクトを取得中 ===");

  do {
    const request = {
      command: "account_objects",
      account: address,
      ledger_index: "validated",
      limit: 100,
    };

    // markerが存在する場合のみ含める（最初のリクエストでは含めない）
    if (marker) {
      request.marker = marker;
    }

    const response = await client.request(request);
    const objects = response.result.account_objects;
    allObjects = allObjects.concat(objects);

    console.log(\`ページ\${page}：\${objects.length}件のオブジェクトを受信\`);

    // 次のページのためにmarkerを更新する
    marker = response.result.marker;
    page++;

    // ノードに負荷をかけないための短い待機
    if (marker) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  } while (marker);

  console.log(\`取得したオブジェクトの合計：\${allObjects.length}\`);

  // タイプ別にグループ化
  const byType = {};
  for (const obj of allObjects) {
    const type = obj.LedgerEntryType;
    byType[type] = (byType[type] || 0) + 1;
  }

  console.log("タイプ別サマリー：");
  for (const [type, count] of Object.entries(byType)) {
    console.log(\`  \${type}: \${count}\`);
  }

  await client.disconnect();
}
//アカウントの例：rHh1YJN4kwRdw4Y29Xu1EY9qW8u36vAYLc
getAllAccountObjects("rYourAddressHere");`,
            ko: `const { Client } = require("xahau");

async function getAllAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  let allObjects = [];
  let marker = undefined;
  let page = 1;

  console.log("===", address, "의 모든 객체를 가져오는 중 ===");

  do {
    const request = {
      command: "account_objects",
      account: address,
      ledger_index: "validated",
      limit: 100,
    };

    // 첫 요청이 아니고 marker가 있을 때만 포함
    if (marker) {
      request.marker = marker;
    }

    const response = await client.request(request);
    const objects = response.result.account_objects;
    allObjects = allObjects.concat(objects);

    console.log(\`페이지 \${page}: \${objects.length}개 객체 수신\`);

    // 다음 페이지용 marker 갱신
    marker = response.result.marker;
    page++;

    // 노드 과부하 방지를 위한 짧은 대기
    if (marker) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  } while (marker);

  console.log(\`가져온 전체 객체 수: \${allObjects.length}\`);

  // 타입별 그룹화
  const byType = {};
  for (const obj of allObjects) {
    const type = obj.LedgerEntryType;
    byType[type] = (byType[type] || 0) + 1;
  }

  console.log("타입별 요약:");
  for (const [type, count] of Object.entries(byType)) {
    console.log(\`  \${type}: \${count}\`);
  }

  await client.disconnect();
}
//예시 계정: rHh1YJN4kwRdw4Y29Xu1EY9qW8u36vAYLc
getAllAccountObjects("rYourAddressHere");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Paginación con marker", en: "Pagination with marker", jp: "markerによるページネーション", ko: "marker 페이지네이션" },
          content: {
            es: "Cuando hay muchos resultados, la API pagina:\n\n1. Envía tu consulta con limit\n2. Si la respuesta tiene marker, hay más datos\n3. Reenvía la consulta incluyendo el marker\n4. Repite hasta que no haya marker\n\nNunca modifiques el valor del marker",
            en: "When there are many results, the API paginates:\n\n1. Send your query with limit\n2. If the response has a marker, there is more data\n3. Resend the query including the marker\n4. Repeat until there is no marker\n\nNever modify the marker value",
            jp: "多くの結果がある場合、APIはページングします：\n\n1. limitをつけてクエリを送信\n2. レスポンスにmarkerがあればデータが続く\n3. markerを含めてクエリを再送信\n4. markerがなくなるまで繰り返す\n\nmarkerの値を絶対に変更しない",
            ko: "결과가 많으면 API가 페이지를 나눕니다:\n\n1. limit와 함께 요청 전송\n2. 응답에 marker가 있으면 다음 데이터 존재\n3. marker를 포함해 다시 요청\n4. marker가 없어질 때까지 반복\n\nmarker 값은 절대 수정하지 마세요",
          },
          visual: "📄",
        },
        {
          title: { es: "Errores comunes", en: "Common errors", jp: "よくあるエラー", ko: "흔한 오류" },
          content: {
            es: "• actNotFound → Cuenta no existe\n• lgrNotFound → Ledger no encontrado\n• invalidParams → Parámetros incorrectos\n• noCurrent → Sin ledger actual\n• noNetwork → Sin conexión a la red\n• tooBusy → Servidor sobrecargado",
            en: "• actNotFound → Account does not exist\n• lgrNotFound → Ledger not found\n• invalidParams → Incorrect parameters\n• noCurrent → No current ledger\n• noNetwork → No network connection\n• tooBusy → Server overloaded",
            jp: "• actNotFound → アカウントが存在しない\n• lgrNotFound → レジャーが見つからない\n• invalidParams → パラメータが正しくない\n• noCurrent → 現在のレジャーなし\n• noNetwork → ネットワーク接続なし\n• tooBusy → サーバーが過負荷",
            ko: "• actNotFound → 계정이 존재하지 않음\n• lgrNotFound → ledger를 찾지 못함\n• invalidParams → 잘못된 파라미터\n• noCurrent → 현재 ledger 없음\n• noNetwork → 네트워크 연결 없음\n• tooBusy → 서버 과부하",
          },
          visual: "⚠️",
        },
        {
          title: { es: "Buenas prácticas", en: "Best practices", jp: "ベストプラクティス", ko: "모범 사례" },
          content: {
            es: "• Siempre usar try/catch en las peticiones\n• Reintentar con backoff exponencial\n• Validar result.status === 'success'\n• Escuchar evento 'disconnected'\n• Pausar entre peticiones masivas\n• Configurar timeouts razonables",
            en: "• Always use try/catch for requests\n• Retry with exponential backoff\n• Validate result.status === 'success'\n• Listen for the 'disconnected' event\n• Pause between bulk requests\n• Configure reasonable timeouts",
            jp: "• リクエストには常にtry/catchを使用\n• 指数バックオフでリトライする\n• result.status === 'success'を検証する\n• 'disconnected'イベントをリッスンする\n• 大量リクエスト間に間隔を設ける\n• 適切なタイムアウトを設定する",
            ko: "• 요청은 항상 try/catch 사용\n• 지수 백오프로 재시도\n• result.status === 'success' 검증\n• 'disconnected' 이벤트 감지\n• 대량 요청 사이에 잠시 대기\n• 적절한 timeout 설정",
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
        jp: "レジャーオブジェクトの操作",
        ko: "레저 객체 다루기",
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
        jp: `Xahauのレジャーはすべての情報を**オブジェクト**（レジャーエントリ）として保存します。各オブジェクトにはタイプ、一意のインデックス（ハッシュ）、および特定のフィールドがあります。このレッスンでは、これらのオブジェクトを直接照会して操作する方法を学びます。

### ledger_entryコマンド

\`ledger_entry\`を使用すると、**インデックス**（64文字の16進数ハッシュ）を使用してレジャーの特定のオブジェクトを照会できます。これは、必要なオブジェクトの正確な識別子がすでにわかっている場合に役立ちます。

### 照会可能なオブジェクトタイプの例

| タイプ | 説明 |
|---|---|
| \`AccountRoot\` | アカウントの主要データ |
| \`RippleState\` | 2つのアカウント間のトラストライン |
| \`Offer\` | DEXのアクティブな注文 |
| \`URIToken\` | 非代替性トークン（XahauのNFT） |
| \`Hook\` | インストールされたHookの定義 |
| \`HookState\` | Hookによって保存されたステート |

### タイプフィルターを使用したaccount_objectsコマンド

\`account_objects\`コマンドは、特定のタイプのオブジェクトのみをフィルタリングするために\`type\`パラメータを受け付けます。有効な値には次のようなものがあります。
- \`"state"\` → RippleState（トラストライン）
- \`"offer"\` → Offer（DEXの注文）
- \`"uri_token"\` → URIToken
- \`"hook"\` → インストールされたHook

### レジャーインデックスの理解

レジャーの各オブジェクトには、その識別データのSHA-512Halfハッシュとして計算された**一意のインデックス**があります。例えば次のようなものがあります。
- AccountRootのインデックスはアカウントアドレスから計算される
- RippleStateのインデックスは2つのアカウントと通貨から計算される

これらのインデックスは決定論的です。入力データがわかれば、いつでも再計算できます。`,
        ko: `Xahau의 ledger는 모든 정보를 **객체(ledger entry)** 형태로 저장합니다. 각 객체는 타입, 고유 인덱스(hash), 그리고 전용 필드를 가집니다. 이 레슨에서는 이런 객체를 직접 조회하고 다루는 방법을 배웁니다.

### ledger_entry 명령

\`ledger_entry\`를 사용하면 **인덱스**(64자 16진수 hash)로 특정 ledger 객체를 조회할 수 있습니다. 필요한 객체의 정확한 식별자를 이미 알고 있을 때 유용합니다.

### 조회 가능한 객체 유형

| 유형 | 설명 |
|---|---|
| \`AccountRoot\` | 계정의 주요 데이터 |
| \`RippleState\` | 두 계정 사이의 trust line |
| \`Offer\` | DEX의 활성 주문 |
| \`URIToken\` | 대체 불가능 토큰(Xahau NFT) |
| \`Hook\` | 설치된 Hook 정의 |
| \`HookState\` | Hook이 저장한 상태 |

### type 필터가 있는 account_objects 명령

\`account_objects\` 명령은 특정 유형의 객체만 필터링할 수 있도록 \`type\` 파라미터를 받습니다. 유효한 값은 다음과 같습니다:
- \`"state"\` → RippleState (trust line)
- \`"offer"\` → Offer (DEX 주문)
- \`"uri_token"\` → URIToken
- \`"hook"\` → 설치된 Hook

### Ledger 인덱스 이해하기

ledger의 각 객체는 식별 데이터에서 계산되는 SHA-512Half hash 기반의 **고유 인덱스**를 가집니다. 예를 들면:
- AccountRoot 인덱스는 계정 주소에서 계산됩니다
- RippleState 인덱스는 두 계정과 통화 정보에서 계산됩니다

이 인덱스는 결정적이므로 입력 데이터를 알고 있으면 언제든지 다시 계산할 수 있습니다.`,
      },
      codeBlocks: [

        {
          title: {
            es: "Consultar account_objects filtrados por tipo",
            en: "Query account_objects filtered by type",
            jp: "タイプでフィルタリングされたaccount_objectsを照会する",
            ko: "type으로 필터링한 account_objects 조회",
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
            jp: `const { Client } = require("xahau");

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

  console.log(\`=== \${type.toUpperCase()} （\${address}） ===\`);
  console.log(\`見つかった合計：\${allObjects.length}\`);

  for (const obj of allObjects) {
    switch (type) {
      case "state": // RippleState（トラストライン）
        const currency = obj.Balance.currency;
        const balance = obj.Balance.value;
        const peer = obj.HighLimit.issuer === address
          ? obj.LowLimit.issuer
          : obj.HighLimit.issuer;
        console.log(\`  \${currency}：残高 \${balance}（ピア：\${peer}）\`);
        break;

      case "offer":
        const pays = typeof obj.TakerPays === "string"
          ? \`\${Number(obj.TakerPays) / 1_000_000} XAH\`
          : \`\${obj.TakerPays.value} \${obj.TakerPays.currency}\`;
        const gets = typeof obj.TakerGets === "string"
          ? \`\${Number(obj.TakerGets) / 1_000_000} XAH\`
          : \`\${obj.TakerGets.value} \${obj.TakerGets.currency}\`;
        console.log(\`  Offer：支払い \${pays} → 受け取り \${gets}\`);
        break;

      case "uri_token":
        const uri = Buffer.from(obj.URI || "", "hex").toString("utf8");
        console.log(\`  URIToken：\${uri}\`);
        console.log(\`    インデックス：\${obj.index}\`);
        break;

      default:
        console.log(\`  \${obj.LedgerEntryType}：\${obj.index}\`);
    }
  }

  await client.disconnect();
}

// 使用例：
// トラストラインを確認
getObjectsByType("rDk1xiArDMjDqnrR2yWypwQAKg4mKnQYvs", "state");

// DEXの注文を確認
// getObjectsByType("rfmPQz4eSmisCVnWJkKj82hHKQdrUPv3Px", "offer");

// URITokensを確認
// getObjectsByType("rfPMnDQEzb5StPXj3Dkd34oKY4BVAJCwsn", "uri_token");`,
            ko: `const { Client } = require("xahau");

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
  console.log(\`총 개수: \${allObjects.length}\`);

  for (const obj of allObjects) {
    switch (type) {
      case "state": // RippleState (trust lines)
        const currency = obj.Balance.currency;
        const balance = obj.Balance.value;
        const peer = obj.HighLimit.issuer === address
          ? obj.LowLimit.issuer
          : obj.HighLimit.issuer;
        console.log(\`  \${currency}: 잔액 \${balance} (상대방: \${peer})\`);
        break;

      case "offer":
        const pays = typeof obj.TakerPays === "string"
          ? \`\${Number(obj.TakerPays) / 1_000_000} XAH\`
          : \`\${obj.TakerPays.value} \${obj.TakerPays.currency}\`;
        const gets = typeof obj.TakerGets === "string"
          ? \`\${Number(obj.TakerGets) / 1_000_000} XAH\`
          : \`\${obj.TakerGets.value} \${obj.TakerGets.currency}\`;
        console.log(\`  Offer: 지불 \${pays} → 수령 \${gets}\`);
        break;

      case "uri_token":
        const uri = Buffer.from(obj.URI || "", "hex").toString("utf8");
        console.log(\`  URIToken: \${uri}\`);
        console.log(\`    인덱스: \${obj.index}\`);
        break;

      default:
        console.log(\`  \${obj.LedgerEntryType}: \${obj.index}\`);
    }
  }

  await client.disconnect();
}

// 사용 예시:
// Trust line 보기
getObjectsByType("rDk1xiArDMjDqnrR2yWypwQAKg4mKnQYvs", "state");

// DEX 주문 보기
// getObjectsByType("rfmPQz4eSmisCVnWJkKj82hHKQdrUPv3Px", "offer");

// URIToken 보기
// getObjectsByType("rfPMnDQEzb5StPXj3Dkd34oKY4BVAJCwsn", "uri_token");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Objetos del ledger", en: "Ledger objects", jp: "レジャーオブジェクト", ko: "레저 객체" },
          content: {
            es: "Todo en Xahau se almacena como objetos:\n\n• AccountRoot → Datos de cuenta\n• RippleState → Trust lines\n• Offer → Órdenes DEX\n• URIToken → NFTs\n• Hook → Hooks instalados\n\nCada objeto tiene un índice único (hash)",
            en: "Everything in Xahau is stored as objects:\n\n• AccountRoot → Account data\n• RippleState → Trust lines\n• Offer → DEX orders\n• URIToken → NFTs\n• Hook → Installed Hooks\n\nEach object has a unique index (hash)",
            jp: "Xahauのすべてはオブジェクトとして保存される：\n\n• AccountRoot → アカウントデータ\n• RippleState → トラストライン\n• Offer → DEXの注文\n• URIToken → NFT\n• Hook → インストールされたHook\n\n各オブジェクトは一意のインデックス（ハッシュ）を持つ",
            ko: "Xahau의 모든 것은 객체로 저장됩니다:\n\n• AccountRoot → 계정 데이터\n• RippleState → Trust line\n• Offer → DEX 주문\n• URIToken → NFT\n• Hook → 설치된 Hook\n\n각 객체는 고유 인덱스(hash)를 가집니다",
          },
          visual: "🗂️",
        },
        {
          title: { es: "Consultas por tipo", en: "Queries by type", jp: "タイプ別照会", ko: "유형별 조회" },
          content: {
            es: "account_objects + type = filtro eficiente\n\n• type: 'state' → Trust lines\n• type: 'offer' → Órdenes DEX\n• type: 'uri_token' → NFTs\n• type: 'hook' → Hooks\n\nCombina con marker para paginar",
            en: "account_objects + type = efficient filtering\n\n• type: 'state' → Trust lines\n• type: 'offer' → DEX orders\n• type: 'uri_token' → NFTs\n• type: 'hook' → Hooks\n\nCombine with marker to paginate",
            jp: "account_objects + type = 効率的なフィルタリング\n\n• type: 'state' → トラストライン\n• type: 'offer' → DEXの注文\n• type: 'uri_token' → NFT\n• type: 'hook' → Hook\n\nmarkerと組み合わせてページングする",
            ko: "account_objects + type = 효율적인 필터링\n\n• type: 'state' → Trust line\n• type: 'offer' → DEX 주문\n• type: 'uri_token' → NFT\n• type: 'hook' → Hook\n\nmarker와 함께 사용해 페이지네이션",
          },
          visual: "🔎",
        },
      ],
    },
  ],
}
