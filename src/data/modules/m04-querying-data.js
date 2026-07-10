const moduleData = {
  id: "m4",
  icon: "🔍",
  title: {
    es: "Consulta de datos a un nodo de la red",
    pt: "Consulta de dados a um nó da rede",
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
        pt: "Conexão a nós Xahau",
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
        pt: `Para ler dados da blockchain Xahau, você precisa se conectar a um **nó da rede** por meio de **WebSocket**. Os nós expõem uma API JSON-RPC que permite consultar toda a informação do ledger.
### Tipos de nós
- **Nós públicos**: Mantidos pela comunidade, acessíveis para qualquer pessoa. Ideais para desenvolvimento
- **Nós próprios**: Você pode executar seu próprio nó para maior controle e confiabilidade
### Endpoints principais
| Rede | WebSocket URL |
|---|---|
| Mainnet | \`wss://xahau.network\` |
| Testnet | \`wss://xahau-test.net\` |
### Tipos de consultas
A API da Xahau oferece comandos para consultar:
- **Informação do servidor**: \`server_info\`, \`server_state\`
- **Contas**: \`account_info\`, \`account_lines\`, \`account_objects\`, \`account_tx\`
- **Ledger**: \`ledger\`, \`ledger_data\`, \`ledger_entry\`
- **Transações**: \`tx\`, \`transaction_entry\`
- **Suscripciones**: \`subscribe\` / \`unsubscribe\` para eventos em tempo real
### Conceitos importantes
- **Ledger index**: Você pode consultar um ledger específico por seu número, ou usar \`"validated"\` para o último validado
- **Drops**: As quantidades de XAH são expressas em drops (1 XAH = 1,000,000 drops)
- **Marcadores (Markers)**: Para paginar resultados grandes, a API usa marcadores`,
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
            pt: "Conectar e consultar informação do servidor",
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
            pt: `const { Client } = require("xahau");
async function getServerInfo() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const response = await client.request({
    command: "server_info"
  });
  const info = response.result.info;
  console.log("=== Informação do servidor ===");
  console.log("Versión:", info.build_version);
  console.log("ID de rede:", info.network_id);
  console.log("Estado:", info.server_state);
  console.log("Peers conectados:", info.peers);
  console.log("Ledger validado:", info.validated_ledger.seq);
  console.log("Quorum de validação:", info.validation_quorum);
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
            pt: "Consultar informação detallada de uma conta",
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
            pt: `const { Client } = require("xahau");
async function getAccountInfo(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const response = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  });
  const data = response.result.account_data;
  console.log("=== Dados da conta ===");
  console.log("Endereçou:", data.Account);
  console.log("Saldo:", Number(data.Saldo) / 1_000_000, "XAH");
  console.log("Sequência:", data.Sequence);
  console.log("Objetos do proprietário:", data.OwnerCount);
  console.log("Flags:", data.Flags);
  // Verificar se tem Namespaces instalados
  if (data.HookNamespaces) {
    console.log("Namespaces instalados: Sí");
    console.log("Namespaces:", data.HookNamespaces);
  } else {
    console.log("Namespaces instalados: Não");
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
          title: { es: "Conexión a Xahau", pt: "Conexão com Xahau", en: "Connecting to Xahau", jp: "Xahauへの接続", ko: "Xahau 연결", zh: "连接到 Xahau" },
          content: {
            es: "Conexión vía WebSocket a nodos públicos\n\n🌐 Mainnet: wss://xahau.network\n🧪 Testnet: wss://xahau-test.net\n\nAPI JSON-RPC para todas las consultas",
            pt: "Conexão vía WebSocket a nós públicos\n\n🌐 Mainnet: wss://xahau.network\n🧪 Testnet: wss://xahau-test.net\n\nAPI JSON-RPC para todas as consultas",
            en: "WebSocket connection to public nodes\n\n🌐 Mainnet: wss://xahau.network\n🧪 Testnet: wss://xahau-test.net\n\nJSON-RPC API for all queries",
            jp: "パブリックノードへのWebSocket接続\n\n🌐 メインネット：wss://xahau.network\n🧪 テストネット：wss://xahau-test.net\n\nすべての照会にJSON-RPC API",
            ko: "공용 노드에 WebSocket으로 연결\n\n🌐 Mainnet: wss://xahau.network\n🧪 Testnet: wss://xahau-test.net\n\n모든 조회에 사용하는 JSON-RPC API",
            zh: "通过 WebSocket 连接到公共节点\n\n🌐 主网: wss://xahau.network\n🧪 测试网: wss://xahau-test.net\n\n所有查询都通过 JSON-RPC API 完成",
          },
          visual: "🔌",
        },
        {
          title: { es: "Comandos principales", pt: "Comandos principais", en: "Main commands", jp: "主要なコマンド", ko: "주요 명령", zh: "主要命令" },
          content: {
            es: "• server_info → Estado del nodo\n• account_info → Datos de cuenta\n• account_lines → TrustLines\n• account_objects → Objetos de la cuenta\n• account_tx → Historial de transacciones\n• ledger → Info del ledger",
            pt: "• server_info → Estado do nó\n• account_info → Dados de conta\n• account_lines → TrustLines\n• account_objects → Objetos da conta\n• account_tx → Histórico de transações\n• ledger → Informações do ledger",
            en: "• server_info → Node status\n• account_info → Account data\n• account_lines → TrustLines\n• account_objects → Account objects\n• account_tx → Transaction history\n• ledger → Ledger info",
            jp: "• server_info → ノードの状態\n• account_info → アカウントデータ\n• account_lines → TrustLine\n• account_objects → アカウントオブジェクト\n• account_tx → トランザクション履歴\n• ledger → レジャー情報",
            ko: "• server_info → 노드 상태\n• account_info → 계정 데이터\n• account_lines → TrustLine\n• account_objects → 계정 객체\n• account_tx → 트랜잭션 기록\n• ledger → Ledger 정보",
            zh: "• server_info → 节点状态\n• account_info → 账户数据\n• account_lines → TrustLines\n• account_objects → 账户对象\n• account_tx → 交易历史\n• ledger → 账本信息",
          },
          visual: "📡",
        },
        {
          title: { es: "Buenas prácticas de conexión", pt: "Boas práticas de conexão", en: "Connection best practices", jp: "接続のベストプラクティス", ko: "연결 모범 사례", zh: "连接最佳实践" },
          content: {
            es: "• Envuelve conexiones en try/catch\n• Implementa reconexión automática\n• Escucha el evento 'disconnected'\n• Testnet para desarrollo, Mainnet para producción\n• Configura timeouts razonables\n• Valida respuestas antes de procesar",
            pt: "• Envolva conexões em try/catch\n• Implementa reconexão automática\n• Escute o evento 'disconnected'\n• Testnet para desenvolvimento, Mainnet para produção\n• Configura timeouts razoáveis\n• Valida respostas antes de processar",
            en: "• Wrap connections in try/catch\n• Implement automatic reconnection\n• Listen for the 'disconnected' event\n• Testnet for development, Mainnet for production\n• Configure reasonable timeouts\n• Validate responses before processing",
            jp: "• try/catchで接続をラップする\n• 自動再接続を実装する\n• 'disconnected'イベントをリッスンする\n• 開発にはTestnet、本番にはMainnet\n• 適切なタイムアウトを設定する\n• 処理前にレスポンスを検証する",
            ko: "• 연결 로직을 try/catch로 감싸기\n• 자동 재연결 구현\n• 'disconnected' 이벤트 감지\n• 개발은 Testnet, 운영은 Mainnet 사용\n• 적절한 timeout 설정\n• 처리 전에 응답 검증",
            zh: "• 用 try/catch 包裹连接逻辑\n• 实现自动重连\n• 监听 'disconnected' 事件\n• 开发用 Testnet，生产用 Mainnet\n• 设置合理的 timeout\n• 处理前先验证响应",
          },
          visual: "🛡️",
        },
      ],
    },
    {
      id: "m4l2",
      title: {
        es: "Consultas avanzadas y suscripciones",
        pt: "Consultas avançadas e assinaturas",
        en: "Advanced queries and subscriptions",
        jp: "高度な照会とサブスクリプション",
        ko: "고급 조회와 구독",
        zh: "高级查询与订阅",
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
        pt: `Além das consultas básicas, Xahau permite consultar objetos específicos do ledger, o histórico de transações de uma conta e assinar eventos em tempo real.
### Histórico de transações
O comando \`account_tx\` retorna as transações associadas a uma conta. Você pode paginar os resultados usando o campo \`marker\`.
### Objetos de uma conta
O comando \`account_objects\` retorna todos os objetos do ledger associados a uma conta:
- TrustLines (linhas de confiança)
- Offers (ordens no DEX)
- URITokens (NFTs)
- Hooks instalados
- Estados de Hooks
### Assinaturas em tempo real
Com o comando \`subscribe\` você pode receber notificações quando eventos ocorrem:
- **ledger**: Notificação sempre que um novo ledger é fechado
- **transactions**: Todas as transações da rede
- **accounts**: Transações que afetam contas específicas
### Consulta de transações individuais
Você pode consultar os detalhes de uma transação específica usando seu **hash** com o comando \`tx\`.`,
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
        zh: `除了基础查询外，Xahau 还允许你查询特定账本对象、某个账户的交易历史，并订阅实时事件。

### 交易历史

\`account_tx\` 命令会返回与某个账户相关的交易。你可以使用 \`marker\` 字段对结果进行分页。

### 账户对象

\`account_objects\` 命令会返回与某个账户关联的所有账本对象：
- TrustLines
- Offers（DEX 订单）
- URITokens（NFT）
- 已安装的 Hooks
- Hook 状态

### 实时订阅

通过 \`subscribe\` 命令，你可以在事件发生时收到通知：
- **ledger**：每次有新账本关闭时通知
- **transactions**：网络中的所有交易
- **accounts**：影响特定账户的交易

### 查询单笔交易

你可以使用 \`tx\` 命令，通过交易的 **hash** 查询某一笔交易的详细信息。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar historial de transacciones de una cuenta",
            pt: "Consultar histórico de transações de uma conta",
            en: "Query an account's transaction history",
            jp: "アカウントのトランザクション履歴を照会する",
            ko: "계정 트랜잭션 기록 조회",
            zh: "查询账户交易历史",
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
            pt: `const { Client } = require("xahau");
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
  console.log("=== Últimas transações ===");
  for (const item of response.result.transactions) {
    const tx = item.tx;
    console.log(\`Tipo: \${tx.TransactionType}\`);
    console.log(\`  Hash: \${item.tx.hash}\`);
    console.log(\`  Fecha: \${new Date((tx.date + 946684800) * 1000).toISOString()}\`);
    console.log(\`  Resultado: \${item.meta.TransactionResult}\`);
    if (tx.TransactionType === "Payment") {
      console.log(\`  De: \${tx.Account}\`);
      console.log(\`  A: \${tx.Destination}\`);
      console.log(\`  Quantidade: \${Number(tx.Amount) / 1_000_000} XAH\`);
    }
  }
  await client.disconnect();
}
//Exemplo de endereçou: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
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
            zh: `const { Client } = require("xahau");

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

  console.log("=== 最近交易 ===");
  for (const item of response.result.transactions) {
    const tx = item.tx;
    console.log(\`类型: \${tx.TransactionType}\`);
    console.log(\`  Hash: \${item.tx.hash}\`);
    console.log(\`  日期: \${new Date((tx.date + 946684800) * 1000).toISOString()}\`);
    console.log(\`  结果: \${item.meta.TransactionResult}\`);

    if (tx.TransactionType === "Payment") {
      console.log(\`  从: \${tx.Account}\`);
      console.log(\`  到: \${tx.Destination}\`);
      console.log(\`  金额: \${Number(tx.Amount) / 1_000_000} XAH\`);
    }
  }

  await client.disconnect();
}
//示例地址: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
getAccountTransactions("rYourAddressHere");`,
          },
        },
        {
          title: {
            es: "Consultar objetos de una cuenta y suscribirse a eventos",
            pt: "Consultar objetos de uma conta e assinar eventos",
            en: "Query account objects and subscribe to events",
            jp: "アカウントオブジェクトの照会とイベントのサブスクリプション",
            ko: "계정 객체 조회와 이벤트 구독",
            zh: "查询账户对象并订阅事件",
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
            pt: `const { Client } = require("xahau");
async function getAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // Consultar todos os objetos da conta
  const response = await client.request({
    command: "account_objects",
    account: address,
    ledger_index: "validated",
  });
  console.log("=== Objetos da conta ===");
  for (const obj of response.result.account_objects) {
    console.log(\`Tipo: \${obj.LedgerEntryType}\`);
    if (obj.LedgerEntryType === "RippleState") {
      console.log(\`  Token: \${obj.Saldo.currency}\`);
      console.log(\`  Saldo: \${obj.Saldo.value}\`);
    } else if (obj.LedgerEntryType === "URIToken") {
      console.log(\`  URI: \${obj.URI}\`);
    }
  }
  // Suscribirse a as transações de esta conta
  console.log("Suscrito a as transações da conta...");
  await client.request({
    command: "subscribe",
    accounts: [address]
  });
  client.on("transaction", (tx) => {
    console.log("¡Nova transação detectada!");
    console.log("Tipo:", tx.transaction.TransactionType);
    console.log("Resultado:", tx.meta.TransactionResult);
  });
  // Mantener conexão abierta 60 segundos
  setTimeout(() => client.disconnect(), 60000);
}
//Exemplo de endereçou: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
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
            zh: `const { Client } = require("xahau");

async function getAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 查询该账户的所有对象
  const response = await client.request({
    command: "account_objects",
    account: address,
    ledger_index: "validated",
  });

  console.log("=== 账户对象 ===");
  for (const obj of response.result.account_objects) {
    console.log(\`类型: \${obj.LedgerEntryType}\`);

    if (obj.LedgerEntryType === "RippleState") {
      console.log(\`  代币: \${obj.Balance.currency}\`);
      console.log(\`  余额: \${obj.Balance.value}\`);
    } else if (obj.LedgerEntryType === "URIToken") {
      console.log(\`  URI: \${obj.URI}\`);
    }
  }

  // 订阅该账户的交易
  console.log("已订阅该账户的交易...");
  await client.request({
    command: "subscribe",
    accounts: [address]
  });

  client.on("transaction", (tx) => {
    console.log("检测到新交易！");
    console.log("类型:", tx.transaction.TransactionType);
    console.log("结果:", tx.meta.TransactionResult);
  });

  // 保持连接 60 秒
  setTimeout(() => client.disconnect(), 60000);
}
//示例地址: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
getAccountObjects("rYourAddressHere");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Historial de transacciones", pt: "Histórico de transações", en: "Transaction history", jp: "トランザクション履歴", ko: "트랜잭션 기록", zh: "交易历史" },
          content: {
            es: "account_tx → Historial de una cuenta\n\n• Paginar con marker\n• Filtrar por tipo de transacción\n• Ver resultados (éxito/fallo)\n• Consultar metadatos detallados",
            pt: "account_tx → Histórico de uma conta\n\n• Paginar com marker\n• Filtrar por tipo de transação\n• Ver resultados (sucesso/falha)\n• Consultar metadados detalhados",
            en: "account_tx → Account history\n\n• Paginate with marker\n• Filter by transaction type\n• View results (success/failure)\n• Query detailed metadata",
            jp: "account_tx → アカウントの履歴\n\n• markerでページング\n• トランザクションタイプでフィルタリング\n• 結果を確認（成功/失敗）\n• 詳細なメタデータを照会",
            ko: "account_tx → 계정 기록\n\n• marker로 페이지네이션\n• 트랜잭션 유형별 필터링\n• 결과 확인(성공/실패)\n• 상세 메타데이터 조회",
            zh: "account_tx → 账户历史\n\n• 使用 marker 分页\n• 按交易类型过滤\n• 查看结果（成功/失败）\n• 查询详细 metadata",
          },
          visual: "📜",
        },
        {
          title: { es: "Tiempo real", pt: "Tempo real", en: "Real time", jp: "リアルタイム", ko: "실시간", zh: "实时" },
          content: {
            es: "subscribe → Eventos en tiempo real\n\n• ledger → Cierre de ledgers\n• transactions → Todas las txs\n• accounts → Txs de cuentas específicas\n\nIdeal para monitorizar actividad",
            pt: "subscribe → Eventos em tempo real\n\n• ledger → Fechamento de ledgers\n• transactions → Todas as txs\n• accounts → Txs de contas específicas\n\nIdeal para monitorar atividade",
            en: "subscribe → Real-time events\n\n• ledger → Ledger closings\n• transactions → All txs\n• accounts → Txs for specific accounts\n\nIdeal for monitoring activity",
            jp: "subscribe → リアルタイムイベント\n\n• ledger → レジャーのクローズ\n• transactions → すべてのtx\n• accounts → 特定アカウントのtx\n\nアクティビティの監視に最適",
            ko: "subscribe → 실시간 이벤트\n\n• ledger → ledger 닫힘 알림\n• transactions → 모든 tx\n• accounts → 특정 계정 tx\n\n활동 모니터링에 적합",
            zh: "subscribe → 实时事件\n\n• ledger → 账本关闭通知\n• transactions → 所有交易\n• accounts → 特定账户的交易\n\n非常适合监控活动",
          },
          visual: "⚡",
        },
        {
          title: { es: "Suscripciones en detalle", pt: "Assinaturas em detalhe", en: "Subscriptions in detail", jp: "サブスクリプションの詳細", ko: "구독 상세", zh: "订阅详解" },
          content: {
            es: "Comando subscribe para eventos en tiempo real:\n\n• Evento ledger → Nuevo ledger cerrado\n• Evento transaction → Tx confirmada\n• Escucha con client.on('transaction')\n• unsubscribe para dejar de escuchar\n• Mantén la conexión WebSocket abierta",
            pt: "Comando subscribe para eventos em tempo real:\n\n• Evento ledger → Novo ledger cerrado\n• Evento transaction → Tx conassinaturada\n• Escute com client.on('transaction')\n• unsubscribe para dejar de escuchar\n• Mantén a conexão WebSocket abierta",
            en: "subscribe command for real-time events:\n\n• ledger event → New ledger closed\n• transaction event → Tx confirmed\n• Listen with client.on('transaction')\n• unsubscribe to stop listening\n• Keep the WebSocket connection open",
            jp: "リアルタイムイベントのsubscribeコマンド：\n\n• ledgerイベント → 新しいレジャーがクローズ\n• transactionイベント → txが確認済み\n• client.on('transaction')でリッスン\n• unsubscribeでリッスン停止\n• WebSocket接続を開いたままにする",
            ko: "실시간 이벤트용 subscribe 명령:\n\n• ledger 이벤트 → 새 ledger 닫힘\n• transaction 이벤트 → tx 확인\n• client.on('transaction')로 수신\n• unsubscribe로 중지\n• WebSocket 연결을 계속 유지",
            zh: "用于实时事件的 subscribe 命令：\n\n• ledger 事件 → 新账本关闭\n• transaction 事件 → 交易已确认\n• 用 client.on('transaction') 监听\n• 使用 unsubscribe 停止监听\n• 保持 WebSocket 连接处于打开状态",
          },
          visual: "📡",
        },
      ],
    },
    {
      id: "m4l3",
      title: {
        es: "Paginación y manejo de errores",
        pt: "Paginação e tratamento de erros",
        en: "Pagination and error handling",
        jp: "ページネーションとエラー処理",
        ko: "페이지네이션과 오류 처리",
        zh: "分页与错误处理",
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
        pt: `Quando você trabalha com a API de Xahau, é fundamental dominar dois aspectos: a **paginação** de resultados grandes e o **tratamento de erros** para construir aplicações robustas.
### O sistema de marcadores (marker)
Muitos comandos da API retornam resultados paginados. Quando há mais dados do que cabem em uma única resposta, a API inclui um campo \`marker\` no resultado. Para obter a página seguinte, você deve enviar o mesmo comando incluindo esse \`marker\`.
- O campo \`limit\` controla quantos resultados por página (máximo varia conforme o comando, geralmente 200-400)
- Se a resposta inclui \`marker\`, há mais páginas disponíveis
- Se no há \`marker\` na resposta, has chegou ao final
- O valor do \`marker\` é opaco: não o modifique, simplesmente passe-o como está
### Erros comuns da API
| Erro | Significado |
|---|---|
| \`actNotFound\` | A conta consultada não existe no ledger |
| \`lgrNotFound\` | O ledger solicitado não foi encontrado |
| \`invalidParams\` | Parâmetros incorretos na requisição |
| \`noCurrent\` | O servidor não tem um ledger atual disponível |
| \`noNetwork\` | O servidor não está conectado à rede |
| \`tooBusy\` | O servidor está sobrecarregado |
### Boas práticas
- **Sempre envolva as requisições em try/catch**: Os erros de rede, timeouts e erros de API devem ser tratados sempre
- **Implemente novas tentativas**: Para erros transitórios como \`tooBusy\` ou timeouts, tente novamente com backoff exponencial
- **Valide as respostas**: Verifique se \`result.status === "success"\` antes de processar dados
- **Trate desconexões**: Escute o evento \`disconnected\` do cliente e reconecte automaticamente
- **Rate limiting**: Os nós públicos podem limitar as requisições. Adicione pausas entre requisições massivas
- **Timeouts**: Configure um timeout razoável para evitar que sua aplicação fique travada`,
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
        zh: `在使用 Xahau API 时，有两个方面尤其重要：处理大结果集时的**分页**，以及构建稳健应用所需的**错误处理**。

### marker 系统

很多 API 命令返回的是分页结果。当数据量超过单次响应可容纳的范围时，API 会在结果中包含一个 \`marker\` 字段。要获取下一页，你必须发送同一个命令，并带上这个 \`marker\`。

- \`limit\` 字段控制每页返回多少结果（最大值视命令而定，通常为 200 到 400）
- 如果响应中包含 \`marker\`，说明后面还有更多页面
- 如果响应中没有 \`marker\`，说明已经到最后一页
- \`marker\` 的值是不透明的：不要修改它，直接原样传回即可

### 常见 API 错误

| Error | 含义 |
|---|---|
| \`actNotFound\` | 查询的账户在账本中不存在 |
| \`lgrNotFound\` | 请求的账本未找到 |
| \`invalidParams\` | 请求参数不正确 |
| \`noCurrent\` | 服务器当前没有可用账本 |
| \`noNetwork\` | 服务器未连接到网络 |
| \`tooBusy\` | 服务器负载过高 |

### 最佳实践

- **始终用 try/catch 包裹请求**：网络错误、timeout 和 API 错误都必须处理
- **实现重试机制**：对于 \`tooBusy\` 或 timeout 这类瞬时错误，使用指数退避重试
- **验证响应内容**：在处理数据前先确认 \`result.status === "success"\`
- **处理断线情况**：监听客户端的 \`disconnected\` 事件并自动重连
- **考虑速率限制**：公共节点可能会限制请求频率，批量请求之间应适当暂停
- **设置合理 timeout**：防止应用程序长时间卡住`,
      },
      codeBlocks: [
        {
          title: {
            es: "Paginar todos los objetos de una cuenta usando marker",
            pt: "Paginar todos os objetos de uma conta usando marker",
            en: "Paginate all account objects using marker",
            jp: "markerを使用してアカウントのすべてのオブジェクトをページングする",
            ko: "marker로 계정 객체 전체 페이지네이션",
            zh: "使用 marker 分页获取账户全部对象",
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
            pt: `const { Client } = require("xahau");
async function getAllAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  let allObjects = [];
  let marker = undefined;
  let page = 1;
  console.log("=== Obtendo todos os objetos de", address, "===");
  do {
    const request = {
      command: "account_objects",
      account: address,
      ledger_index: "validated",
      limit: 100,
    };
    // Incluir marker apenas se existe (não na primeiroa requisição)
    if (marker) {
      request.marker = marker;
    }
    const response = await client.request(request);
    const objects = response.result.account_objects;
    allObjects = allObjects.concat(objects);
    console.log(\`Página \${page}: \${objects.length} objetos recibidos\`);
    // Actualizar marker parà próximo página
    marker = response.result.marker;
    page++;
    // Pequeña pausa para não saturar ou nó
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
  console.log("Resumo por tipo:");
  for (const [type, count] of Object.entries(byType)) {
    console.log(\`  \${type}: \${count}\`);
  }
  await client.disconnect();
}
//Exemplo de conta: rHh1YJN4kwRdw4Y29Xu1EY9qW8u36vAYLc
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
            zh: `const { Client } = require("xahau");

async function getAllAccountObjects(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  let allObjects = [];
  let marker = undefined;
  let page = 1;

  console.log("=== 正在获取", address, "的全部对象 ===");

  do {
    const request = {
      command: "account_objects",
      account: address,
      ledger_index: "validated",
      limit: 100,
    };

    // 只有 marker 存在时才加入（第一次请求不加）
    if (marker) {
      request.marker = marker;
    }

    const response = await client.request(request);
    const objects = response.result.account_objects;
    allObjects = allObjects.concat(objects);

    console.log(\`第 \${page} 页: 收到 \${objects.length} 个对象\`);

    // 更新下一页所需的 marker
    marker = response.result.marker;
    page++;

    // 短暂停顿，避免压垮节点
    if (marker) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  } while (marker);

  console.log(\`总共获取对象数: \${allObjects.length}\`);

  // 按类型分组
  const byType = {};
  for (const obj of allObjects) {
    const type = obj.LedgerEntryType;
    byType[type] = (byType[type] || 0) + 1;
  }

  console.log("按类型汇总:");
  for (const [type, count] of Object.entries(byType)) {
    console.log(\`  \${type}: \${count}\`);
  }

  await client.disconnect();
}
//示例账户: rHh1YJN4kwRdw4Y29Xu1EY9qW8u36vAYLc
getAllAccountObjects("rYourAddressHere");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Paginación con marker", pt: "Paginação com marker", en: "Pagination with marker", jp: "markerによるページネーション", ko: "marker 페이지네이션", zh: "使用 marker 分页" },
          content: {
            es: "Cuando hay muchos resultados, la API pagina:\n\n1. Envía tu consulta con limit\n2. Si la respuesta tiene marker, hay más datos\n3. Reenvía la consulta incluyendo el marker\n4. Repite hasta que no haya marker\n\nNunca modifiques el valor del marker",
            pt: "Quando há muitos resultados, a API pagina:\n\n1. Envie sua consulta com limit\n2. Se a resposta tem marker, há mais dados\n3. Reenvia a consulta incluindo o marker\n4. Repita até que não haja marker\n\nNunca modifique o valor do marker",
            en: "When there are many results, the API paginates:\n\n1. Send your query with limit\n2. If the response has a marker, there is more data\n3. Resend the query including the marker\n4. Repeat until there is no marker\n\nNever modify the marker value",
            jp: "多くの結果がある場合、APIはページングします：\n\n1. limitをつけてクエリを送信\n2. レスポンスにmarkerがあればデータが続く\n3. markerを含めてクエリを再送信\n4. markerがなくなるまで繰り返す\n\nmarkerの値を絶対に変更しない",
            ko: "결과가 많으면 API가 페이지를 나눕니다:\n\n1. limit와 함께 요청 전송\n2. 응답에 marker가 있으면 다음 데이터 존재\n3. marker를 포함해 다시 요청\n4. marker가 없어질 때까지 반복\n\nmarker 값은 절대 수정하지 마세요",
            zh: "当结果很多时，API 会分页：\n\n1. 带上 limit 发送请求\n2. 如果响应里有 marker，说明还有更多数据\n3. 带着 marker 再发一次请求\n4. 重复直到 marker 消失\n\n永远不要修改 marker 的值",
          },
          visual: "📄",
        },
        {
          title: { es: "Errores comunes", pt: "Erros comuns", en: "Common errors", jp: "よくあるエラー", ko: "흔한 오류", zh: "常见错误" },
          content: {
            es: "• actNotFound → Cuenta no existe\n• lgrNotFound → Ledger no encontrado\n• invalidParams → Parámetros incorrectos\n• noCurrent → Sin ledger actual\n• noNetwork → Sin conexión a la red\n• tooBusy → Servidor sobrecargado",
            pt: "• actNotFound → Conta não existe\n• lgrNotFound → Ledger não encontrado\n• invalidParams → Parâmetros incorretos\n• noCurrent → Sem ledger atual\n• noNetwork → Sem conexão à rede\n• tooBusy → Servidor sobrecargado",
            en: "• actNotFound → Account does not exist\n• lgrNotFound → Ledger not found\n• invalidParams → Incorrect parameters\n• noCurrent → No current ledger\n• noNetwork → No network connection\n• tooBusy → Server overloaded",
            jp: "• actNotFound → アカウントが存在しない\n• lgrNotFound → レジャーが見つからない\n• invalidParams → パラメータが正しくない\n• noCurrent → 現在のレジャーなし\n• noNetwork → ネットワーク接続なし\n• tooBusy → サーバーが過負荷",
            ko: "• actNotFound → 계정이 존재하지 않음\n• lgrNotFound → ledger를 찾지 못함\n• invalidParams → 잘못된 파라미터\n• noCurrent → 현재 ledger 없음\n• noNetwork → 네트워크 연결 없음\n• tooBusy → 서버 과부하",
            zh: "• actNotFound → 账户不存在\n• lgrNotFound → 未找到账本\n• invalidParams → 参数错误\n• noCurrent → 当前没有账本\n• noNetwork → 未连接到网络\n• tooBusy → 服务器过载",
          },
          visual: "⚠️",
        },
        {
          title: { es: "Buenas prácticas", pt: "Boas práticas", en: "Best practices", jp: "ベストプラクティス", ko: "모범 사례", zh: "最佳实践" },
          content: {
            es: "• Siempre usar try/catch en las peticiones\n• Reintentar con backoff exponencial\n• Validar result.status === 'success'\n• Escuchar evento 'disconnected'\n• Pausar entre peticiones masivas\n• Configurar timeouts razonables",
            pt: "• Sempre usar try/catch nas requisições\n• Tentar novamente com backoff exponencial\n• Validar result.status === 'success'\n• Escutar evento 'disconnected'\n• Pausar entre requisições massivas\n• Configurar timeouts razoáveis",
            en: "• Always use try/catch for requests\n• Retry with exponential backoff\n• Validate result.status === 'success'\n• Listen for the 'disconnected' event\n• Pause between bulk requests\n• Configure reasonable timeouts",
            jp: "• リクエストには常にtry/catchを使用\n• 指数バックオフでリトライする\n• result.status === 'success'を検証する\n• 'disconnected'イベントをリッスンする\n• 大量リクエスト間に間隔を設ける\n• 適切なタイムアウトを設定する",
            ko: "• 요청은 항상 try/catch 사용\n• 지수 백오프로 재시도\n• result.status === 'success' 검증\n• 'disconnected' 이벤트 감지\n• 대량 요청 사이에 잠시 대기\n• 적절한 timeout 설정",
            zh: "• 请求始终放在 try/catch 中\n• 用指数退避重试\n• 验证 result.status === 'success'\n• 监听 'disconnected' 事件\n• 批量请求之间稍作暂停\n• 设置合理 timeout",
          },
          visual: "🛡️",
        },
      ],
    },
    {
      id: "m4l4",
      title: {
        es: "Trabajando con objetos del ledger",
        pt: "Trabalhando com objetos do ledger",
        en: "Working with ledger objects",
        jp: "レジャーオブジェクトの操作",
        ko: "레저 객체 다루기",
        zh: "处理账本对象",
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
        pt: `O ledger da Xahau armazena toda a informação em forma de **objetos** (ledger entries). Cada objeto tem um tipo, um índice único (hash) e campos específicos. Nesta lição aprenderemos a consultar e trabalhar com esses objetos diretamente.
### O comando ledger_entry
Com \`ledger_entry\` você pode consultar um objeto específico do ledger usando seu **índice** (hash de 64 caracteres hex). Isso é útil quando você já conhece o identificador exato do objeto que você precisa.
### Tipos de objetos consultáveis
| Tipo | Descrição |
|---|---|
| \`AccountRoot\` | Dados principais de uma conta |
| \`RippleState\` | Linha de confiança entre duas contas |
| \`Offer\` | Ordem ativa no DEX |
| \`URIToken\` | Token não fungível (NFT de Xahau) |
| \`Hook\` | Definição de um Hook instalado |
| \`HookState\` | Estado armazenado por um Hook |
### O comando account_objects com filtro de tipo
O comando \`account_objects\` aceita o parâmetro \`type\` para filtrar apenas os objetos de um tipo específico. Os valores válidos incluem:
- \`"state"\` → RippleState (trust lines)
- \`"offer"\` → Offers (ordens do DEX)
- \`"uri_token"\` → URITokens
- \`"hook"\` → Hooks instalados
### Entendendo os índices do ledger
Cada objeto no ledger tem um **índice único** calculado como um hash SHA-512Half dos seus dados identificadores. Por exemplo:
- O índice de um AccountRoot é calculado a partir do endereço da conta
- O índice de um RippleState é calculado a partir das duas contas e a moeda
Esses índices são determinísticos: você sempre pode recalculá-los se conhecer os dados de entrada.`,
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
        zh: `Xahau 的账本会把所有信息存储为**对象**（ledger entries）。每个对象都有类型、唯一索引（hash）以及专属字段。在这一课里，我们会学习如何直接查询和处理这些对象。

### ledger_entry 命令

使用 \`ledger_entry\`，你可以通过对象的**索引**（64 个十六进制字符的 hash）查询账本中的某个特定对象。当你已经知道对象的精确标识符时，这个命令非常有用。

### 可查询的对象类型

| 类型 | 说明 |
|---|---|
| \`AccountRoot\` | 账户的主要数据 |
| \`RippleState\` | 两个账户之间的 trust line |
| \`Offer\` | DEX 上的活跃订单 |
| \`URIToken\` | 非同质化代币（Xahau NFT） |
| \`Hook\` | 已安装 Hook 的定义 |
| \`HookState\` | Hook 存储的状态 |

### 带类型过滤的 account_objects 命令

\`account_objects\` 命令接受 \`type\` 参数，用来只筛选某一类对象。有效值包括：
- \`"state"\` → RippleState（trust lines）
- \`"offer"\` → Offers（DEX 订单）
- \`"uri_token"\` → URITokens
- \`"hook"\` → 已安装 Hooks

### 理解 ledger 索引

账本中的每个对象都拥有一个**唯一索引**，它是根据对象的标识数据通过 SHA-512Half 哈希计算出来的。例如：
- AccountRoot 的索引由账户地址计算得到
- RippleState 的索引由两个账户和货币共同计算得到

这些索引是确定性的：只要你知道输入数据，就可以随时重新计算出来。`,
      },
      codeBlocks: [

        {
          title: {
            es: "Consultar account_objects filtrados por tipo",
            pt: "Consultar account_objects filtrados por tipo",
            en: "Query account_objects filtered by type",
            jp: "タイプでフィルタリングされたaccount_objectsを照会する",
            ko: "type으로 필터링한 account_objects 조회",
            zh: "按类型过滤查询 account_objects",
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
            pt: `const { Client } = require("xahau");
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
        const currency = obj.Saldo.currency;
        const balance = obj.Saldo.value;
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
// Exemplos de uso:
// Ver trust lines
getObjectsByType("rDk1xiArDMjDqnrR2yWypwQAKg4mKnQYvs", "state");
// Ver ordens DEX
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
            zh: `const { Client } = require("xahau");

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
  console.log(\`总数: \${allObjects.length}\`);

  for (const obj of allObjects) {
    switch (type) {
      case "state": // RippleState (trust lines)
        const currency = obj.Balance.currency;
        const balance = obj.Balance.value;
        const peer = obj.HighLimit.issuer === address
          ? obj.LowLimit.issuer
          : obj.HighLimit.issuer;
        console.log(\`  \${currency}: 余额 \${balance} (对手方: \${peer})\`);
        break;

      case "offer":
        const pays = typeof obj.TakerPays === "string"
          ? \`\${Number(obj.TakerPays) / 1_000_000} XAH\`
          : \`\${obj.TakerPays.value} \${obj.TakerPays.currency}\`;
        const gets = typeof obj.TakerGets === "string"
          ? \`\${Number(obj.TakerGets) / 1_000_000} XAH\`
          : \`\${obj.TakerGets.value} \${obj.TakerGets.currency}\`;
        console.log(\`  Offer: 支付 \${pays} → 获得 \${gets}\`);
        break;

      case "uri_token":
        const uri = Buffer.from(obj.URI || "", "hex").toString("utf8");
        console.log(\`  URIToken: \${uri}\`);
        console.log(\`    索引: \${obj.index}\`);
        break;

      default:
        console.log(\`  \${obj.LedgerEntryType}: \${obj.index}\`);
    }
  }

  await client.disconnect();
}

// 使用示例:
// 查看 trust lines
getObjectsByType("rDk1xiArDMjDqnrR2yWypwQAKg4mKnQYvs", "state");

// 查看 DEX 订单
// getObjectsByType("rfmPQz4eSmisCVnWJkKj82hHKQdrUPv3Px", "offer");

// 查看 URITokens
// getObjectsByType("rfPMnDQEzb5StPXj3Dkd34oKY4BVAJCwsn", "uri_token");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Objetos del ledger", pt: "Objetos do ledger", en: "Ledger objects", jp: "レジャーオブジェクト", ko: "레저 객체", zh: "账本对象" },
          content: {
            es: "Todo en Xahau se almacena como objetos:\n\n• AccountRoot → Datos de cuenta\n• RippleState → Trust lines\n• Offer → Órdenes DEX\n• URIToken → NFTs\n• Hook → Hooks instalados\n\nCada objeto tiene un índice único (hash)",
            pt: "Tudo na Xahau é armazenado como objetos:\n\n• AccountRoot → Dados de conta\n• RippleState → Trust lines\n• Offer → Ordens DEX\n• URIToken → NFTs\n• Hook → Hooks instalados\n\nCada objeto tem um índice único (hash)",
            en: "Everything in Xahau is stored as objects:\n\n• AccountRoot → Account data\n• RippleState → Trust lines\n• Offer → DEX orders\n• URIToken → NFTs\n• Hook → Installed Hooks\n\nEach object has a unique index (hash)",
            jp: "Xahauのすべてはオブジェクトとして保存される：\n\n• AccountRoot → アカウントデータ\n• RippleState → トラストライン\n• Offer → DEXの注文\n• URIToken → NFT\n• Hook → インストールされたHook\n\n各オブジェクトは一意のインデックス（ハッシュ）を持つ",
            ko: "Xahau의 모든 것은 객체로 저장됩니다:\n\n• AccountRoot → 계정 데이터\n• RippleState → Trust line\n• Offer → DEX 주문\n• URIToken → NFT\n• Hook → 설치된 Hook\n\n각 객체는 고유 인덱스(hash)를 가집니다",
            zh: "Xahau 中的一切都以对象形式存储：\n\n• AccountRoot → 账户数据\n• RippleState → Trust lines\n• Offer → DEX 订单\n• URIToken → NFT\n• Hook → 已安装 Hooks\n\n每个对象都有唯一索引（hash）",
          },
          visual: "🗂️",
        },
        {
          title: { es: "Consultas por tipo", pt: "Consultas por tipo", en: "Queries by type", jp: "タイプ別照会", ko: "유형별 조회", zh: "按类型查询" },
          content: {
            es: "account_objects + type = filtro eficiente\n\n• type: 'state' → Trust lines\n• type: 'offer' → Órdenes DEX\n• type: 'uri_token' → NFTs\n• type: 'hook' → Hooks\n\nCombina con marker para paginar",
            pt: "account_objects + type = filtro eficiente\n\n• type: 'state' → Trust lines\n• type: 'offer' → Ordens DEX\n• type: 'uri_token' → NFTs\n• type: 'hook' → Hooks\n\nCombina com marker para paginar",
            en: "account_objects + type = efficient filtering\n\n• type: 'state' → Trust lines\n• type: 'offer' → DEX orders\n• type: 'uri_token' → NFTs\n• type: 'hook' → Hooks\n\nCombine with marker to paginate",
            jp: "account_objects + type = 効率的なフィルタリング\n\n• type: 'state' → トラストライン\n• type: 'offer' → DEXの注文\n• type: 'uri_token' → NFT\n• type: 'hook' → Hook\n\nmarkerと組み合わせてページングする",
            ko: "account_objects + type = 효율적인 필터링\n\n• type: 'state' → Trust line\n• type: 'offer' → DEX 주문\n• type: 'uri_token' → NFT\n• type: 'hook' → Hook\n\nmarker와 함께 사용해 페이지네이션",
            zh: "account_objects + type = 高效过滤\n\n• type: 'state' → Trust lines\n• type: 'offer' → DEX 订单\n• type: 'uri_token' → NFT\n• type: 'hook' → Hooks\n\n可与 marker 结合进行分页",
          },
          visual: "🔎",
        },
      ],
    },
  ],
}

const arabicModuleTranslations = {
  title: "استعلام البيانات من عقدة الشبكة",
  lessons: {
    m4l1: {
      title: "الاتصال بعقد Xahau",
      theory: `لقراءة بيانات من بلوكتشين Xahau تحتاج إلى الاتصال بـ **عقدة شبكة** عبر **WebSocket**. العقدة تعرض API بنمط JSON-RPC يسمح لك بقراءة معلومات ledger، الحسابات، المعاملات، وobjects.

### أنواع العقد

- **عقد عامة**: متاحة للمطورين ومناسبة للتجارب.
- **عقد خاصة**: تشغلها بنفسك للحصول على تحكم وموثوقية أعلى.

### Endpoints مهمة

| الشبكة | WebSocket URL |
|---|---|
| Mainnet | \`wss://xahau.network\` |
| Testnet | \`wss://xahau-test.net\` |

### أوامر الاستعلام

تستخدم API أوامر مثل \`server_info\` و \`account_info\` و \`account_lines\` و \`account_objects\` و \`account_tx\` و \`ledger\` و \`tx\`. وللأحداث الحية توجد أوامر \`subscribe\` و \`unsubscribe\`.

### مفاهيم مهمة

\`ledger_index: "validated"\` يعني آخر ledger تم التحقق منه. كميات XAH تظهر غالبا بوحدة drops، حيث 1 XAH = 1,000,000 drops. وعند وجود نتائج كثيرة تستخدم API \`marker\` للصفحات.`,
      codeTitles: [
        "الاتصال واستعلام معلومات الخادم",
        "استعلام معلومات تفصيلية عن حساب",
      ],
      code: [
        `const { Client } = require("xahau");

async function serverInfo() {
  // الاتصال بعقدة testnet أثناء التطوير
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // server_info يعرض حالة العقدة والشبكة والـ ledger الحالي
  const response = await client.request({
    command: "server_info",
  });

  const info = response.result.info;
  console.log("الشبكة:", info.network_id);
  console.log("حالة الخادم:", info.server_state);
  console.log("الإصدار:", info.build_version);
  console.log("آخر ledger:", info.validated_ledger?.seq);

  await client.disconnect();
}

serverInfo().catch(console.error);`,
        `const { Client, dropsToXah } = require("xahau");

async function accountInfo() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const account = "rYourAddressHere";

  // account_info يرجع AccountRoot إذا كان الحساب مفعلا
  const response = await client.request({
    command: "account_info",
    account,
    ledger_index: "validated",
  });

  const data = response.result.account_data;
  console.log("الحساب:", data.Account);
  console.log("الرصيد:", dropsToXah(data.Balance), "XAH");
  console.log("Sequence:", data.Sequence);
  console.log("OwnerCount:", data.OwnerCount);

  await client.disconnect();
}

accountInfo().catch(console.error);`,
      ],
      slides: [
        {
          title: "الاتصال بـ Xahau",
          content: "الاتصال يتم عبر WebSocket إلى عقد عامة\n\nMainnet: wss://xahau.network\nTestnet: wss://xahau-test.net\n\nكل الاستعلامات تستخدم JSON-RPC API.",
        },
        {
          title: "الأوامر الرئيسية",
          content: "• server_info → حالة العقدة\n• account_info → بيانات الحساب\n• account_lines → TrustLines\n• account_objects → Objects الحساب\n• account_tx → تاريخ المعاملات\n• ledger → معلومات ledger",
        },
        {
          title: "أفضل ممارسات الاتصال",
          content: "• استخدم try/catch\n• افصل الاتصال بعد الانتهاء\n• استخدم testnet للتطوير\n• اقرأ من validated ledger\n• تحقق من الرد قبل معالجة البيانات",
        },
      ],
    },
    m4l2: {
      title: "استعلامات متقدمة واشتراكات",
      theory: `بعد الاستعلامات الأساسية، يمكنك قراءة تاريخ معاملات الحساب، objects المرتبطة به، أو الاشتراك في أحداث حية من الشبكة.

### account_tx

\`account_tx\` يعرض معاملات حساب معين. قد تكون النتائج كثيرة، لذلك تدعم API pagination باستخدام \`marker\`.

### account_objects

\`account_objects\` يعرض objects التي يملكها الحساب مثل Offers، TrustLines، أو HookState حسب نوع الحساب وما أنشأه.

### subscribe

الاشتراك يسمح لك باستقبال أحداث مباشرة مثل إغلاق ledger جديد أو معاملة لحساب معين. هذا مفيد للتطبيقات التي تحتاج مراقبة deposits أو نشاط المستخدمين في الوقت الحقيقي.

### متى تستخدم كل نوع؟

استخدم الاستعلام العادي عندما تحتاج لقطة حالية أو تاريخ. استخدم \`subscribe\` عندما تحتاج إلى متابعة مستمرة بدون polling متكرر.`,
      codeTitles: [
        "استعلام تاريخ معاملات حساب",
        "استعلام account objects والاشتراك في الأحداث",
      ],
      code: [
        `const { Client } = require("xahau");

async function accountTransactions() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const account = "rYourAddressHere";

  // account_tx يعرض تاريخ معاملات الحساب
  const response = await client.request({
    command: "account_tx",
    account,
    ledger_index_min: -1,
    ledger_index_max: -1,
    limit: 10,
  });

  for (const item of response.result.transactions) {
    console.log("Hash:", item.tx?.hash || item.tx_json?.hash);
    console.log("Result:", item.meta?.TransactionResult);
  }

  await client.disconnect();
}

accountTransactions().catch(console.error);`,
        `const { Client } = require("xahau");

async function objectsAndSubscribe() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const account = "rYourAddressHere";

  // قراءة objects الحالية للحساب
  const objects = await client.request({
    command: "account_objects",
    account,
    ledger_index: "validated",
  });
  console.log("عدد objects:", objects.result.account_objects.length);

  // الاشتراك في معاملات هذا الحساب
  await client.request({
    command: "subscribe",
    accounts: [account],
  });

  client.on("transaction", (event) => {
    console.log("معاملة جديدة:", event.transaction?.hash);
  });
}

objectsAndSubscribe().catch(console.error);`,
      ],
      slides: [
        {
          title: "تاريخ المعاملات",
          content: "account_tx → تاريخ حساب\n\n• pagination باستخدام marker\n• عرض نتيجة المعاملة\n• قراءة metadata\n• مناسب لتتبع deposits أو نشاط المستخدم",
        },
        {
          title: "الوقت الحقيقي",
          content: "subscribe → أحداث حية\n\n• ledger → إغلاق ledgers\n• transactions → معاملات\n• accounts → معاملات حسابات محددة\n\nمفيد للمراقبة المستمرة.",
        },
        {
          title: "الاشتراكات بالتفصيل",
          content: "استخدم subscribe ثم استمع للأحداث:\n\nclient.on('transaction', ...)\nclient.on('ledgerClosed', ...)\n\nاستخدم unsubscribe عند التوقف، وحافظ على WebSocket مفتوحا.",
        },
      ],
    },
    m4l3: {
      title: "Pagination ومعالجة الأخطاء",
      theory: `عند العمل مع واجهة Xahau البرمجية (API)، من الضروري إتقان جانبين أساسيين: **pagination** (تقسيم النتائج إلى صفحات) للنتائج الكبيرة، و**معالجة الأخطاء** لبناء تطبيقات مستقرة.

### نظام marker

العديد من أوامر API تُرجع نتائج مقسّمة إلى صفحات. عندما تكون البيانات أكثر مما يتسع في استجابة واحدة، تُضمّن API حقل \`marker\` في النتيجة. للحصول على الصفحة التالية، يجب إرسال نفس الأمر مع تضمين ذلك الـ \`marker\`.

- حقل \`limit\` يتحكم في عدد النتائج لكل صفحة (الحد الأقصى يختلف حسب الأمر، وعادة يكون بين 200 و400)
- إذا تضمّنت الاستجابة \`marker\`، فهذا يعني أن هناك صفحات إضافية متاحة
- إذا لم يكن هناك \`marker\` في الاستجابة، فقد وصلت إلى النهاية
- قيمة \`marker\` غير شفافة (opaque): لا تُعدّلها، فقط مرّرها كما هي

### أخطاء API الشائعة

| الخطأ | المعنى |
|---|---|
| \`actNotFound\` | الحساب المطلوب غير موجود في ledger |
| \`lgrNotFound\` | لم يتم العثور على ledger المطلوب |
| \`invalidParams\` | معاملات غير صحيحة في الطلب |
| \`noCurrent\` | الخادم لا يملك ledger حاليا متاحا |
| \`noNetwork\` | الخادم غير متصل بالشبكة |
| \`tooBusy\` | الخادم محمّل بشكل زائد |

### أفضل الممارسات

- **لف الطلبات دائما بـ try/catch**: يجب دائما معالجة أخطاء الشبكة وtimeouts وأخطاء API
- **تنفيذ إعادة المحاولة (retries)**: بالنسبة للأخطاء المؤقتة مثل \`tooBusy\` أو timeout، أعد المحاولة باستخدام exponential backoff
- **التحقق من صحة الاستجابات**: تأكد من أن \`result.status === "success"\` قبل معالجة البيانات
- **معالجة الانقطاعات**: استمع لحدث \`disconnected\` الخاص بالعميل وأعد الاتصال تلقائيا
- **Rate limiting**: قد تحد العقد العامة (public nodes) من الطلبات. أضف فترات انتظار بين الطلبات الكبيرة
- **Timeouts**: اضبط timeout معقول لمنع تعليق تطبيقك`,
      codeTitles: [
        "تصفح كل account objects باستخدام marker",
      ],
      code: [
        `const { Client } = require("xahau");

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

    // تضمين marker فقط إذا كان موجودا (ليس في الطلب الأول)
    if (marker) {
      request.marker = marker;
    }

    const response = await client.request(request);
    const objects = response.result.account_objects;
    allObjects = allObjects.concat(objects);

    console.log(\`Page \${page}: \${objects.length} objects received\`);

    // تحديث marker للصفحة التالية
    marker = response.result.marker;
    page++;

    // توقف قصير لتجنب إرهاق العقدة (node)
    if (marker) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  } while (marker);

  console.log(\`Total objects retrieved: \${allObjects.length}\`);

  // تجميع حسب النوع
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
      ],
      slides: [
        {
          title: "Pagination باستخدام marker",
          content: "الطلبات الكبيرة ترجع على صفحات\n\n1. أرسل limit\n2. اقرأ النتائج\n3. إذا عاد marker، أرسله في الطلب التالي\n4. كرر حتى يختفي marker",
        },
        {
          title: "أخطاء شائعة",
          content: "actNotFound → الحساب غير موجود\nlgrNotFound → ledger غير متاح\ntooBusy → العقدة مشغولة\nTimeout → مشكلة شبكة\n\nتعامل معها في try/catch.",
        },
        {
          title: "أفضل الممارسات",
          content: "• لا تستخدم limit كبيرا جدا\n• أضف retries بتدرج زمني\n• اقرأ من validated\n• تحقق من وجود marker\n• افصل الاتصال عند الانتهاء",
        },
      ],
    },
    m4l4: {
      title: "العمل مع ledger objects",
      theory: `الـ ledger في Xahau يحتوي على objects مهيكلة. قراءة هذه objects هي أساس فهم حالة الحسابات والتطبيقات.

### أمثلة objects

- **AccountRoot**: الحساب الأساسي.
- **RippleState**: TrustLine بين حسابين.
- **Offer**: أمر في DEX.
- **URIToken**: token مرتبط بـ URI.
- **HookState**: بيانات يخزنها Hook.

### التصفية حسب النوع

يمكنك استخدام \`account_objects\` مع حقل \`type\` لتقليل النتائج. مثلا يمكنك طلب offers فقط أو state objects فقط. هذا يجعل الاستعلام أسرع وأسهل في المعالجة.

### لماذا هذا مهم؟

بدلا من البحث في كل بيانات الحساب، يمكنك قراءة النوع الذي يهم تطبيقك فقط: TrustLines لتطبيق tokens، Offers لتطبيق DEX، أو HookState لتطبيقات Hooks.`,
      codeTitles: [
        "استعلام account_objects مع تصفية حسب النوع",
      ],
      code: [
        `const { Client } = require("xahau");

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
      case "state": // RippleState (خطوط الثقة)
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

// أمثلة الاستخدام:
// عرض trust lines
getObjectsByType("rDk1xiArDMjDqnrR2yWypwQAKg4mKnQYvs", "state");

// عرض أوامر DEX
// getObjectsByType("rfmPQz4eSmisCVnWJkKj82hHKQdrUPv3Px", "offer");

// عرض URITokens
// getObjectsByType("rfPMnDQEzb5StPXj3Dkd34oKY4BVAJCwsn", "uri_token");`,
      ],
      slides: [
        {
          title: "Ledger objects",
          content: "حالة Xahau مخزنة في objects typed\n\n• AccountRoot\n• RippleState\n• Offer\n• URIToken\n• HookState\n\nكل نوع له fields محددة.",
        },
        {
          title: "استعلامات حسب النوع",
          content: "account_objects يمكنه التصفية:\n\n• type: offer\n• type: state\n• type: hook\n\nالفائدة: نتائج أقل ومعالجة أوضح.",
        },
      ],
    },
  },
};

function applyArabicTranslations(module) {
  module.title.ar = arabicModuleTranslations.title;

  for (const lesson of module.lessons) {
    const translation = arabicModuleTranslations.lessons[lesson.id];
    if (!translation) continue;

    lesson.title.ar = translation.title;
    lesson.theory.ar = translation.theory;

    lesson.codeBlocks?.forEach((block, index) => {
      block.title.ar = translation.codeTitles[index];
      block.code.ar = translation.code[index];
    });

    lesson.slides?.forEach((slide, index) => {
      slide.title.ar = translation.slides[index].title;
      slide.content.ar = translation.slides[index].content;
    });
  }
}

applyArabicTranslations(moduleData);

const frenchModuleTranslations = {
  title: "Consulter les données depuis un noeud du réseau",
  lessons: {
    m4l1: {
      title: "Connexion aux noeuds Xahau",
      theory: `Pour lire des données de Xahau, ton application se connecte à un noeud via WebSocket. Le noeud expose des commandes comme \`server_info\`, \`account_info\`, \`ledger\` ou \`account_objects\`.

Une requête ne modifie pas le ledger : elle lit l'état validé ou courant. C'est la base pour vérifier un solde, inspecter un compte ou comprendre ce que le réseau voit.

Ferme toujours la connexion quand ton script a terminé, et utilise \`ledger_index: "validated"\` quand tu veux une réponse confirmée.`,
      codeTitles: ["Se connecter et consulter les informations du serveur", "Consulter les détails d'un compte"],
      code: [
`// Connexion à un noeud Xahau et lecture de server_info
const { Client } = require("xahau");

async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({ command: "server_info" });
  console.log("État :", response.result.info.server_state);
  console.log("Ledger validé :", response.result.info.validated_ledger.seq);

  await client.disconnect();
}

main().catch(console.error);`,
`// Lire les informations détaillées d'un compte
const { Client, dropsToXah } = require("xahau");

async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const account = "rYourAddressHere";
  const response = await client.request({
    command: "account_info",
    account,
    ledger_index: "validated",
  });

  const data = response.result.account_data;
  console.log("Adresse :", data.Account);
  console.log("Solde :", dropsToXah(data.Balance), "XAH");
  console.log("Sequence :", data.Sequence);

  await client.disconnect();
}

main().catch(console.error);`,
      ],
      slides: [
        ["Connexion à Xahau", "Les scripts se connectent à un noeud WebSocket\n\n• wss://xahau-test.net pour testnet\n• Client.connect()\n• client.request(...)\n• client.disconnect()"],
        ["Commandes principales", "server_info : état du noeud\naccount_info : données d'un compte\nledger : informations du ledger\naccount_objects : objets liés au compte"],
        ["Bonnes pratiques de connexion", "• Utilise validated pour les données confirmées\n• Ferme la connexion\n• Gère les erreurs réseau\n• Ne fais pas confiance à une seule réponse sans contexte"],
      ],
    },
    m4l2: {
      title: "Requêtes avancées et abonnements",
      theory: `Certaines commandes retournent l'historique ou les objets liés à un compte. \`account_tx\` liste les transactions, tandis que \`account_objects\` montre les objets comme trustlines, escrows ou hooks.

Les abonnements permettent de recevoir des événements en temps réel. Au lieu de demander en boucle, tu t'abonnes à un stream et le noeud envoie les nouveaux événements.

C'est utile pour suivre des paiements entrants, surveiller les ledgers ou construire une interface qui réagit dès qu'une transaction est validée.`,
      codeTitles: ["Consulter l'historique des transactions d'un compte", "Consulter les objets du compte et s'abonner aux événements"],
      code: [
`// Lire l'historique des transactions d'un compte
const { Client } = require("xahau");

async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_tx",
    account: "rYourAddressHere",
    ledger_index_min: -1,
    ledger_index_max: -1,
    limit: 10,
  });

  for (const item of response.result.transactions) {
    console.log(item.tx.TransactionType, item.tx.hash);
  }

  await client.disconnect();
}

main().catch(console.error);`,
`// Lire les objets d'un compte et s'abonner à ses transactions
const { Client } = require("xahau");

async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const address = "rYourAddressHere";

  // Consulter tous les objets du compte
  const response = await client.request({
    command: "account_objects",
    account: address,
    ledger_index: "validated",
  });

  console.log("=== Objets du compte ===");
  for (const obj of response.result.account_objects) {
    console.log(\`Type : \${obj.LedgerEntryType}\`);

    if (obj.LedgerEntryType === "RippleState") {
      console.log(\`  Token : \${obj.Balance.currency}\`);
      console.log(\`  Solde : \${obj.Balance.value}\`);
    } else if (obj.LedgerEntryType === "URIToken") {
      console.log(\`  URI : \${obj.URI}\`);
    }
  }

  // S'abonner aux transactions de ce compte
  console.log("Abonné aux transactions du compte...");
  await client.request({
    command: "subscribe",
    accounts: [address],
  });

  client.on("transaction", (tx) => {
    console.log("Nouvelle transaction détectée !");
    console.log("Type :", tx.transaction.TransactionType);
    console.log("Résultat :", tx.meta.TransactionResult);
  });

  // Garder la connexion ouverte pendant 60 secondes
  setTimeout(() => client.disconnect(), 60000);
}

main().catch(console.error);`,
      ],
      slides: [
        ["Historique de transactions", "account_tx permet de lire les transactions d'un compte\n\nUtilise limit et marker pour parcourir l'historique sans tout charger d'un coup."],
        ["Temps réel", "subscribe ouvre un flux d'événements\n\n• ledgers fermés\n• transactions\n• comptes suivis\n\nPratique pour dashboards et bots."],
        ["Les abonnements en détail", "Un abonnement reste actif tant que la connexion WebSocket reste ouverte\n\nPrévois reconnexion et gestion des erreurs pour une application réelle."],
      ],
    },
    m4l3: {
      title: "Pagination et gestion d'erreurs",
      theory: `Lorsque tu travailles avec l'API de Xahau, il est essentiel de maîtriser deux aspects : la **pagination** des résultats volumineux et la **gestion des erreurs** pour construire des applications robustes.

### Le système de marker

De nombreuses commandes de l'API retournent des résultats paginés. Lorsqu'il y a plus de données que ce qui tient dans une seule réponse, l'API inclut un champ \`marker\` dans le résultat. Pour obtenir la page suivante, tu dois envoyer la même commande en incluant ce \`marker\`.

- Le champ \`limit\` contrôle le nombre de résultats par page (le maximum varie selon la commande, généralement entre 200 et 400)
- Si la réponse inclut un \`marker\`, d'autres pages sont disponibles
- S'il n'y a pas de \`marker\` dans la réponse, tu as atteint la fin
- La valeur du \`marker\` est opaque : ne la modifie pas, transmets-la telle quelle

### Erreurs courantes de l'API

| Erreur | Signification |
|---|---|
| \`actNotFound\` | Le compte demandé n'existe pas dans le ledger |
| \`lgrNotFound\` | Le ledger demandé n'a pas été trouvé |
| \`invalidParams\` | Paramètres incorrects dans la requête |
| \`noCurrent\` | Le serveur n'a pas de ledger actuel disponible |
| \`noNetwork\` | Le serveur n'est pas connecté au réseau |
| \`tooBusy\` | Le serveur est surchargé |

### Bonnes pratiques

- **Toujours encapsuler les requêtes dans try/catch** : les erreurs réseau, les timeouts et les erreurs d'API doivent toujours être gérées
- **Implémenter des tentatives (retries)** : pour les erreurs transitoires comme \`tooBusy\` ou les timeouts, relance avec un backoff exponentiel
- **Valider les réponses** : vérifie que \`result.status === "success"\` avant de traiter les données
- **Gérer les déconnexions** : écoute l'événement \`disconnected\` du client et reconnecte-toi automatiquement
- **Rate limiting** : les noeuds publics peuvent limiter les requêtes. Ajoute des pauses entre les requêtes massives
- **Timeouts** : configure un timeout raisonnable pour éviter que ton application ne reste bloquée`,
      codeTitles: ["Paginer tous les objets d'un compte avec marker"],
      code: [
`const { Client } = require("xahau");

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

    // Inclure le marker seulement s'il existe (pas lors de la première requête)
    if (marker) {
      request.marker = marker;
    }

    const response = await client.request(request);
    const objects = response.result.account_objects;
    allObjects = allObjects.concat(objects);

    console.log(\`Page \${page}: \${objects.length} objects received\`);

    // Mettre à jour le marker pour la page suivante
    marker = response.result.marker;
    page++;

    // Petite pause pour ne pas surcharger le noeud
    if (marker) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  } while (marker);

  console.log(\`Total objects retrieved: \${allObjects.length}\`);

  // Regrouper par type
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
      ],
      slides: [
        ["Pagination avec marker", "Si une réponse contient marker, il reste des données\n\nRelance la même commande avec ce marker pour lire la page suivante."],
        ["Erreurs courantes", "• Adresse invalide\n• Compte non activé\n• Noeud indisponible\n• Limite trop élevée\n• Mauvais type d'objet"],
        ["Bonnes pratiques", "• Utilise try/catch\n• Affiche des messages clairs\n• Garde les limites raisonnables\n• Prévois les comptes sans objets\n• Ferme toujours la connexion"],
      ],
    },
    m4l4: {
      title: "Travailler avec les objets de ledger",
      theory: `Le ledger de Xahau stocke toutes les informations sous forme d'**objets** (ledger entries). Chaque objet possède un type, un index unique (hash) et des champs spécifiques. Dans cette leçon, nous allons apprendre à interroger et manipuler ces objets directement.

### La commande ledger_entry

Avec \`ledger_entry\`, tu peux consulter un objet spécifique du ledger en utilisant son **index** (hash hexadécimal de 64 caractères). C'est utile lorsque tu connais déjà l'identifiant exact de l'objet dont tu as besoin.

### Types d'objets consultables

| Type | Description |
|---|---|
| \`AccountRoot\` | Données principales d'un compte |
| \`RippleState\` | Ligne de confiance (trust line) entre deux comptes |
| \`Offer\` | Ordre actif sur le DEX |
| \`URIToken\` | Jeton non fongible (NFT Xahau) |
| \`Hook\` | Définition d'un Hook installé |
| \`HookState\` | État stocké par un Hook |

### La commande account_objects avec filtre de type

La commande \`account_objects\` accepte le paramètre \`type\` pour filtrer uniquement les objets d'un type spécifique. Les valeurs valides sont notamment :
- \`"state"\` → RippleState (trust lines)
- \`"offer"\` → Offers (ordres du DEX)
- \`"uri_token"\` → URITokens
- \`"hook"\` → Hooks installés

### Comprendre les index du ledger

Chaque objet du ledger possède un **index unique** calculé comme un hash SHA-512Half de ses données identifiantes. Par exemple :
- L'index d'un AccountRoot est calculé à partir de l'adresse du compte
- L'index d'un RippleState est calculé à partir des deux comptes et de la devise

Ces index sont déterministes : tu peux toujours les recalculer si tu connais les données d'entrée.`,
      codeTitles: ["Consulter account_objects filtré par type"],
      code: [
`const { Client } = require("xahau");

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
      case "state": // RippleState (lignes de confiance)
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

// Exemples d'utilisation :
// Voir les trust lines
getObjectsByType("rDk1xiArDMjDqnrR2yWypwQAKg4mKnQYvs", "state");

// Voir les ordres DEX
// getObjectsByType("rfmPQz4eSmisCVnWJkKj82hHKQdrUPv3Px", "offer");

// Voir les URITokens
// getObjectsByType("rfPMnDQEzb5StPXj3Dkd34oKY4BVAJCwsn", "uri_token");`,
      ],
      slides: [
        ["Objets de ledger", "Le ledger n'est pas seulement une liste de transactions\n\nIl contient des objets persistants qui décrivent l'état actuel du réseau."],
        ["Requêtes par type", "Filtrer par type aide à inspecter ce qui t'intéresse\n\nTrustlines, escrows, checks, offers ou autres objets selon le cas."],
      ],
    },
  },
};

function applyFrenchTranslations(module) {
  module.title.fr = frenchModuleTranslations.title;

  for (const lesson of module.lessons) {
    const translation = frenchModuleTranslations.lessons[lesson.id];
    if (!translation) continue;

    lesson.title.fr = translation.title;
    lesson.theory.fr = translation.theory;

    lesson.codeBlocks?.forEach((block, index) => {
      block.title.fr = translation.codeTitles[index];
      if (typeof block.code === "string") {
        block.code = { en: block.code };
      }
      block.code.fr = translation.code[index];
    });

    lesson.slides?.forEach((slide, index) => {
      const slideTranslation = translation.slides[index];
      if (!slideTranslation) return;
      slide.title.fr = slideTranslation[0];
      slide.content.fr = slideTranslation[1];
    });
  }
}

applyFrenchTranslations(moduleData);

export default moduleData;
