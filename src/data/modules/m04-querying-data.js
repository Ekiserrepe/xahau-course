import { deriveCodeTranslations } from "../code-i18n.js";
import { addNewWords } from "../glossary.js";
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
        es: `Un script no lee el ledger directamente: pregunta a un **nodo**, un servidor que ejecuta \`xahaud\` y tiene una copia del ledger. Esta lección explica cómo funciona esa conversación y las ideas que usa cualquier consulta.

### Hablar con un nodo

La librería xahau abre una conexión **WebSocket** con un nodo y la mantiene abierta. Cada petición es un mensaje JSON con un \`command\` y sus parámetros, y el nodo responde con un resultado JSON:

\`\`\`json
{ "command": "account_info", "account": "r...", "ledger_index": "validated" }
\`\`\`

Los nodos públicos bastan para desarrollar y para este curso:

| Red | URL WebSocket | ID de red |
|---|---|---|
| Mainnet | \`wss://xahau.network\` | 21337 |
| Testnet | \`wss://xahau-test.net\` | 21338 |

En producción puedes ejecutar tu propio nodo: su disponibilidad, sus límites de peticiones y su historial dejan de depender de otros.

### Los comandos

| Para leer | Comandos |
|---|---|
| El nodo y la red | \`server_info\`, \`fee\` |
| Una cuenta | \`account_info\`, \`account_lines\`, \`account_objects\`, \`account_tx\` |
| Un ledger o un objeto | \`ledger\`, \`ledger_entry\` |
| Una transacción | \`tx\` |
| Eventos en el momento | \`subscribe\`, \`unsubscribe\` |

### Tres ideas que usa cualquier consulta

- **Qué ledger.** \`ledger_index: "validated"\` lee el último ledger en el que la red se puso de acuerdo: sus datos no cambiarán. \`"current"\` lee el ledger en curso, que todavía puede cambiar. Usa \`"validated"\` salvo que necesites lo más reciente.
- **Drops.** Los importes en XAH viajan como cadenas en **drops**: 1 XAH = 1.000.000 drops. \`"5000000"\` son 5 XAH.
- **Markers.** Un resultado largo llega por páginas. Cuando una respuesta incluye un \`marker\`, envía la misma petición con ese marker para obtener la página siguiente.

### Los ejemplos

El primer ejemplo pregunta al nodo de testnet por sí mismo. Salida:

\`\`\`
=== Información del servidor ===
Versión: 2026.6.21-release+3350
ID de red: 21338
Estado: full
Peers conectados: 3
Ledger validado: 12676349
Quorum de validación: 2
\`\`\`

\`full\` significa que el nodo sigue a la red y tiene el ledger actual. El quórum de validación es cuántos validadores de confianza deben ponerse de acuerdo sobre un ledger. El segundo ejemplo lee una cuenta con \`account_info\`, el objeto \`AccountRoot\` de la [lección 1.3](?m=1&l=2).`,
        pt: `Um script não lê o ledger diretamente: ele pergunta a um **nó**, um servidor que executa o \`xahaud\` e tem uma cópia do ledger. Esta lição explica como funciona essa conversa e as ideias que qualquer consulta usa.

### Conversar com um nó

A biblioteca xahau abre uma conexão **WebSocket** com um nó e a mantém aberta. Cada requisição é uma mensagem JSON com um \`command\` e os seus parâmetros, e o nó responde com um resultado JSON:

\`\`\`json
{ "command": "account_info", "account": "r...", "ledger_index": "validated" }
\`\`\`

Os nós públicos bastam para desenvolver e para este curso:

| Rede | URL WebSocket | ID de rede |
|---|---|---|
| Mainnet | \`wss://xahau.network\` | 21337 |
| Testnet | \`wss://xahau-test.net\` | 21338 |

Em produção você pode executar o seu próprio nó: a disponibilidade, os limites de requisições e o histórico deixam de depender de terceiros.

### Os comandos

| Para ler | Comandos |
|---|---|
| O nó e a rede | \`server_info\`, \`fee\` |
| Uma conta | \`account_info\`, \`account_lines\`, \`account_objects\`, \`account_tx\` |
| Um ledger ou um objeto | \`ledger\`, \`ledger_entry\` |
| Uma transação | \`tx\` |
| Eventos no momento | \`subscribe\`, \`unsubscribe\` |

### Três ideias que qualquer consulta usa

- **Qual ledger.** \`ledger_index: "validated"\` lê o último ledger em que a rede chegou a acordo: os seus dados não vão mudar. \`"current"\` lê o ledger em andamento, que ainda pode mudar. Use \`"validated"\`, a não ser que precise do mais recente.
- **Drops.** Os valores em XAH viajam como strings em **drops**: 1 XAH = 1.000.000 drops. \`"5000000"\` são 5 XAH.
- **Markers.** Um resultado longo chega em páginas. Quando uma resposta inclui um \`marker\`, envie a mesma requisição com esse marker para obter a página seguinte.

### Os exemplos

O primeiro exemplo pergunta ao nó da testnet sobre si mesmo. Saída:

\`\`\`
=== Informação do servidor ===
Versão: 2026.6.21-release+3350
ID de rede: 21338
Estado: full
Peers conectados: 3
Ledger validado: 12676350
Quorum de validação: 2
\`\`\`

\`full\` significa que o nó acompanha a rede e tem o ledger atual. O quórum de validação é quantos validadores confiáveis precisam concordar sobre um ledger. O segundo exemplo lê uma conta com \`account_info\`, o objeto \`AccountRoot\` da [lição 1.3](?m=1&l=2).`,
        en: `A script doesn't read the ledger directly: it asks a **node**, a server that runs \`xahaud\` and holds a copy of the ledger. This lesson explains how that conversation works and the ideas every query uses.

### Talking to a node

The xahau library opens a **WebSocket** connection to a node and keeps it open. Each request is a JSON message with a \`command\` and its parameters, and the node answers with a JSON result:

\`\`\`json
{ "command": "account_info", "account": "r...", "ledger_index": "validated" }
\`\`\`

The public nodes are enough for development and for this course:

| Network | WebSocket URL | Network ID |
|---|---|---|
| Mainnet | \`wss://xahau.network\` | 21337 |
| Testnet | \`wss://xahau-test.net\` | 21338 |

For production you can run your own node: its availability, rate limits and history no longer depend on someone else.

### The commands

| To read | Commands |
|---|---|
| The node and the network | \`server_info\`, \`fee\` |
| An account | \`account_info\`, \`account_lines\`, \`account_objects\`, \`account_tx\` |
| A ledger or one object | \`ledger\`, \`ledger_entry\` |
| A transaction | \`tx\` |
| Events as they happen | \`subscribe\`, \`unsubscribe\` |

### Three ideas every query uses

- **Which ledger.** \`ledger_index: "validated"\` reads the last ledger the network agreed on: its data won't change. \`"current"\` reads the ledger in progress, which can still change. Use \`"validated"\` unless you need the very latest.
- **Drops.** Amounts of XAH travel as strings in **drops**: 1 XAH = 1,000,000 drops. \`"5000000"\` is 5 XAH.
- **Markers.** A long result comes in pages. When a response includes a \`marker\`, send the same request with that marker to get the next page.

### The examples

The first example asks the testnet node about itself. Output:

\`\`\`
=== Server Information ===
Version: 2026.6.21-release+3350
Network ID: 21338
State: full
Connected peers: 3
Validated ledger: 12676349
Validation quorum: 2
\`\`\`

\`full\` means the node follows the network and has the current ledger. The validation quorum is how many trusted validators must agree on a ledger. The second example reads an account with \`account_info\`, the \`AccountRoot\` object of [lesson 1.3](?m=1&l=2).`,
        jp: `スクリプトは台帳を直接読むわけではありません。\`xahaud\` を実行し台帳のコピーを持つサーバー、つまり**ノード**に問い合わせます。このレッスンでは、そのやり取りの仕組みと、どの照会でも使う考え方を説明します。

### ノードとのやり取り

xahau ライブラリはノードとの **WebSocket** 接続を開き、開いたままにします。各リクエストは \`command\` とそのパラメータを持つ JSON メッセージで、ノードは JSON の結果を返します。

\`\`\`json
{ "command": "account_info", "account": "r...", "ledger_index": "validated" }
\`\`\`

開発とこのコースには公開ノードで十分です。

| ネットワーク | WebSocket URL | ネットワーク ID |
|---|---|---|
| メインネット | \`wss://xahau.network\` | 21337 |
| テストネット | \`wss://xahau-test.net\` | 21338 |

本番環境では自分のノードを運用することもできます。可用性、リクエスト制限、履歴が他者に左右されなくなります。

### コマンド

| 読むもの | コマンド |
|---|---|
| ノードとネットワーク | \`server_info\`、\`fee\` |
| アカウント | \`account_info\`、\`account_lines\`、\`account_objects\`、\`account_tx\` |
| 台帳や1つのオブジェクト | \`ledger\`、\`ledger_entry\` |
| トランザクション | \`tx\` |
| 発生中のイベント | \`subscribe\`、\`unsubscribe\` |

### どの照会でも使う3つの考え方

- **どの台帳か。** \`ledger_index: "validated"\` は、ネットワークが合意した最後の台帳を読みます。そのデータは変わりません。\`"current"\` は進行中の台帳を読み、まだ変わる可能性があります。最新の状態が必要な場合を除き、\`"validated"\` を使います。
- **drops。** XAH の金額は **drops** 単位の文字列でやり取りします。1 XAH = 1,000,000 drops です。\`"5000000"\` は 5 XAH です。
- **marker。** 長い結果はページに分かれて届きます。レスポンスに \`marker\` が含まれていたら、その marker を付けて同じリクエストを送ると次のページが得られます。

### 例

最初の例は、テストネットのノードにノード自身の情報を問い合わせます。出力です。

\`\`\`
=== サーバー情報 ===
バージョン： 2026.6.21-release+3350
ネットワークID： 21338
状態： full
接続ピア数： 3
検証済みレジャー： 12676350
検証クォーラム： 2
\`\`\`

\`full\` は、ノードがネットワークに追従し、現在の台帳を持っていることを意味します。検証クォーラムは、1つの台帳について合意しなければならない信頼済みバリデータの数です。2つ目の例は \`account_info\` でアカウント、つまり[レッスン 1.3](?m=1&l=2) の \`AccountRoot\` オブジェクトを読みます。`,
        ko: `스크립트는 원장을 직접 읽지 않습니다. \`xahaud\`를 실행하고 원장 사본을 가진 서버, 즉 **노드**에 묻습니다. 이 레슨에서는 그 대화가 어떻게 이루어지는지와 모든 조회에 쓰이는 개념을 설명합니다.

### 노드와 대화하기

xahau 라이브러리는 노드와 **WebSocket** 연결을 열고 열어 둡니다. 각 요청은 \`command\`와 파라미터를 담은 JSON 메시지이며, 노드는 JSON 결과로 응답합니다.

\`\`\`json
{ "command": "account_info", "account": "r...", "ledger_index": "validated" }
\`\`\`

개발과 이 강좌에는 공개 노드로 충분합니다.

| 네트워크 | WebSocket URL | 네트워크 ID |
|---|---|---|
| 메인넷 | \`wss://xahau.network\` | 21337 |
| 테스트넷 | \`wss://xahau-test.net\` | 21338 |

프로덕션에서는 직접 노드를 운영할 수 있습니다. 가용성, 요청 제한, 이력이 더 이상 다른 사람에게 좌우되지 않습니다.

### 명령

| 읽을 대상 | 명령 |
|---|---|
| 노드와 네트워크 | \`server_info\`, \`fee\` |
| 계정 | \`account_info\`, \`account_lines\`, \`account_objects\`, \`account_tx\` |
| 원장 또는 객체 하나 | \`ledger\`, \`ledger_entry\` |
| 트랜잭션 | \`tx\` |
| 발생하는 이벤트 | \`subscribe\`, \`unsubscribe\` |

### 모든 조회에 쓰이는 세 가지 개념

- **어느 원장인가.** \`ledger_index: "validated"\`는 네트워크가 합의한 마지막 원장을 읽습니다. 그 데이터는 바뀌지 않습니다. \`"current"\`는 진행 중인 원장을 읽으며, 아직 바뀔 수 있습니다. 가장 최신 상태가 필요한 경우가 아니면 \`"validated"\`를 씁니다.
- **drops.** XAH 금액은 **drops** 단위 문자열로 오갑니다. 1 XAH = 1,000,000 drops입니다. \`"5000000"\`은 5 XAH입니다.
- **marker.** 긴 결과는 페이지로 나뉘어 옵니다. 응답에 \`marker\`가 있으면, 그 marker를 넣어 같은 요청을 보내 다음 페이지를 받습니다.

### 예제

첫 번째 예제는 테스트넷 노드에 노드 자신의 정보를 묻습니다. 출력입니다.

\`\`\`
=== 서버 정보 ===
버전: 2026.6.21-release+3350
네트워크 ID: 21338
상태: full
연결된 피어 수: 3
검증된 ledger: 12676350
검증 쿼럼: 2
\`\`\`

\`full\`은 노드가 네트워크를 따라가며 현재 원장을 가지고 있다는 뜻입니다. 검증 쿼럼은 한 원장에 대해 합의해야 하는 신뢰 검증자의 수입니다. 두 번째 예제는 \`account_info\`로 계정, 즉 [레슨 1.3](?m=1&l=2)의 \`AccountRoot\` 객체를 읽습니다.`,
        zh: `脚本并不直接读取账本：它向一个**节点**发出请求，节点是运行 \`xahaud\` 并持有账本副本的服务器。本课说明这种通信如何进行，以及每次查询都会用到的概念。

### 与节点通信

xahau 库会与节点建立一个 **WebSocket** 连接并保持打开。每个请求都是一条带有 \`command\` 及其参数的 JSON 消息，节点返回一个 JSON 结果：

\`\`\`json
{ "command": "account_info", "account": "r...", "ledger_index": "validated" }
\`\`\`

开发和本课程使用公共节点就足够了：

| 网络 | WebSocket URL | 网络 ID |
|---|---|---|
| 主网 | \`wss://xahau.network\` | 21337 |
| 测试网 | \`wss://xahau-test.net\` | 21338 |

在生产环境中，你可以运行自己的节点：它的可用性、请求限制和历史数据不再依赖他人。

### 命令

| 要读取的内容 | 命令 |
|---|---|
| 节点与网络 | \`server_info\`、\`fee\` |
| 一个账户 | \`account_info\`、\`account_lines\`、\`account_objects\`、\`account_tx\` |
| 一个账本或一个对象 | \`ledger\`、\`ledger_entry\` |
| 一笔交易 | \`tx\` |
| 实时事件 | \`subscribe\`、\`unsubscribe\` |

### 每次查询都会用到的三个概念

- **哪个账本。** \`ledger_index: "validated"\` 读取网络已达成一致的最新账本：它的数据不会再变。\`"current"\` 读取正在进行中的账本，数据仍可能变化。除非需要最新状态，否则使用 \`"validated"\`。
- **Drops。** XAH 金额以 **drops** 为单位、以字符串形式传递：1 XAH = 1,000,000 drops。\`"5000000"\` 就是 5 XAH。
- **Marker。** 较长的结果会分页返回。当响应中包含 \`marker\` 时，带上这个 marker 再发送同样的请求，即可获得下一页。

### 示例

第一个示例向测试网节点查询它自身的信息。输出：

\`\`\`
=== 服务器信息 ===
版本: 2026.6.21-release+3350
网络 ID: 21338
状态: full
已连接节点数: 3
已验证账本: 12676350
验证法定人数: 2
\`\`\`

\`full\` 表示节点正在跟随网络，并拥有当前账本。验证法定人数是指必须就一个账本达成一致的受信任验证者数量。第二个示例用 \`account_info\` 读取一个账户，也就是[第 1.3 课](?m=1&l=2)中的 \`AccountRoot\` 对象。`,
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
  console.log("Versão:", info.build_version);
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
            pt: "Consultar informações detalhadas de uma conta",
            en: "Query detailed account information",
            jp: "アカウントの詳細情報を照会する",
            ko: "계정 상세 정보 조회",
            zh: "查询账户详细信息",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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

// La cuenta a consultar: el primer argumento, o WALLET de .env
getAccountInfo(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
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
  console.log("Endereço:", data.Account);
  console.log("Saldo:", Number(data.Balance) / 1_000_000, "XAH");
  console.log("Sequência:", data.Sequence);
  console.log("Objetos do proprietário:", data.OwnerCount);
  console.log("Flags:", data.Flags);
  // Verificar se tem Namespaces instalados
  if (data.HookNamespaces) {
    console.log("Namespaces instalados: Sim");
    console.log("Namespaces:", data.HookNamespaces);
  } else {
    console.log("Namespaces instalados: Não");
  }
  await client.disconnect();
}
// A conta a consultar: o primeiro argumento, ou a WALLET do .env
getAccountInfo(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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

// The account to inspect: the first argument, or WALLET from .env
getAccountInfo(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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

// 調べるアカウント：最初の引数、または .env の WALLET
getAccountInfo(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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

// 조회할 계정: 첫 번째 인수, 또는 .env의 WALLET
getAccountInfo(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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

// 要查看的账户：第一个参数，或 .env 中的 WALLET
getAccountInfo(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Conexión a Xahau", pt: "Conexão com Xahau", en: "Connecting to Xahau", jp: "Xahauへの接続", ko: "Xahau 연결", zh: "连接到 Xahau" },
          content: {
            es: `Conexión vía WebSocket a nodos públicos

🌐 Mainnet: wss://xahau.network
🧪 Testnet: wss://xahau-test.net

Peticiones y respuestas en JSON`,
            pt: `Conexão via WebSocket a nós públicos

🌐 Mainnet: wss://xahau.network
🧪 Testnet: wss://xahau-test.net

Requisições e respostas em JSON`,
            en: `WebSocket connection to public nodes

🌐 Mainnet: wss://xahau.network
🧪 Testnet: wss://xahau-test.net

Requests and responses in JSON`,
            jp: `パブリックノードへのWebSocket接続

🌐 メインネット：wss://xahau.network
🧪 テストネット：wss://xahau-test.net

リクエストとレスポンスは JSON`,
            ko: `공용 노드에 WebSocket으로 연결

🌐 Mainnet: wss://xahau.network
🧪 Testnet: wss://xahau-test.net

요청과 응답은 JSON`,
            zh: `通过 WebSocket 连接到公共节点

🌐 主网: wss://xahau.network
🧪 测试网: wss://xahau-test.net

请求和响应都是 JSON`,
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
        es: `La [lección 4.1](?m=4&l=0) leyó el estado actual de una cuenta. Esta lección lee su pasado, las transacciones que la llevaron hasta ahí, y su presente mientras cambia, con eventos que el nodo te envía.

### Historial de transacciones: account_tx

\`account_tx\` devuelve las transacciones que afectaron a una cuenta, de la más reciente a la más antigua, cada una con sus metadatos y su resultado. \`limit\` fija cuántas llegan por página. Si hay más, la respuesta incluye un \`marker\`: envía la misma petición con él para leer la página siguiente, hasta que no vuelva ningún \`marker\`.

Para leer una transacción por su hash, usa \`tx\`, como en la verificación del [Módulo 6](?m=6&l=1).

### Lo que posee una cuenta: account_objects

\`account_objects\` devuelve los objetos del ledger que posee una cuenta: trust lines (\`RippleState\`), ofertas, URITokens, Tickets, escrows, checks, sus Hooks. Cada uno cuenta en su \`OwnerCount\` y retiene parte de su reserva. El parámetro \`type\` reduce la lista a un tipo, por ejemplo \`type: "ticket"\`.

### Eventos en el momento: subscribe

Una consulta responde una vez. Para seguir una cuenta sin preguntar una y otra vez, \`subscribe\` pide al nodo que envíe eventos por la misma conexión WebSocket:

| Stream | Qué llega |
|---|---|
| \`streams: ["ledger"]\` | Un mensaje cada vez que se cierra un ledger |
| \`streams: ["transactions"]\` | Cada transacción validada de la red |
| \`accounts: [dirección]\` | Las transacciones que afectan a esas cuentas |

La librería xahau los entrega como eventos: \`client.on("transaction", …)\` se ejecuta con cada uno. La conexión debe seguir abierta para que lleguen, y \`unsubscribe\` los detiene.

### Los ejemplos

El primer ejemplo lista las 10 últimas transacciones de la cuenta. El segundo lista los objetos que posee y después se suscribe a sus transacciones durante 60 segundos. Con un pago enviado a la cuenta en ese tiempo, el final de la salida es:

\`\`\`
Suscrito a las transacciones de la cuenta...
¡Nueva transacción detectada!
Tipo: Payment
Resultado: tesSUCCESS
\`\`\`

La transacción llegó por la conexión abierta, sin una petición nueva.`,
        pt: `A [lição 4.1](?m=4&l=0) leu o estado atual de uma conta. Esta lição lê o seu passado, as transações que a levaram até ali, e o seu presente enquanto muda, com eventos que o nó envia para você.

### Histórico de transações: account_tx

\`account_tx\` devolve as transações que afetaram uma conta, da mais recente para a mais antiga, cada uma com os seus metadados e o seu resultado. \`limit\` define quantas chegam por página. Se houver mais, a resposta inclui um \`marker\`: envie a mesma requisição com ele para ler a página seguinte, até que nenhum \`marker\` volte.

Para ler uma transação pelo seu hash, use \`tx\`, como na verificação do [Módulo 6](?m=6&l=1).

### O que uma conta possui: account_objects

\`account_objects\` devolve os objetos do ledger que uma conta possui: trust lines (\`RippleState\`), ofertas, URITokens, Tickets, escrows, checks, os seus Hooks. Cada um conta no seu \`OwnerCount\` e retém parte da sua reserva. O parâmetro \`type\` reduz a lista a um tipo, por exemplo \`type: "ticket"\`.

### Eventos no momento: subscribe

Uma consulta responde uma vez. Para acompanhar uma conta sem perguntar de novo e de novo, \`subscribe\` pede ao nó que envie eventos pela mesma conexão WebSocket:

| Stream | O que chega |
|---|---|
| \`streams: ["ledger"]\` | Uma mensagem cada vez que um ledger fecha |
| \`streams: ["transactions"]\` | Cada transação validada da rede |
| \`accounts: [endereço]\` | As transações que afetam essas contas |

A biblioteca xahau os entrega como eventos: \`client.on("transaction", …)\` é executado para cada um. A conexão precisa continuar aberta para que cheguem, e \`unsubscribe\` os interrompe.

### Os exemplos

O primeiro exemplo lista as 10 últimas transações da conta. O segundo lista os objetos que ela possui e depois se inscreve nas suas transações por 60 segundos. Com um pagamento enviado à conta nesse tempo, o final da saída é:

\`\`\`
Suscrito a as transações da conta...
Nova transação detectada!
Tipo: Payment
Resultado: tesSUCCESS
\`\`\`

A transação chegou pela conexão aberta, sem uma nova requisição.`,
        en: `[Lesson 4.1](?m=4&l=0) read the current state of an account. This lesson reads its past, the transactions that brought it there, and its present as it changes, with events the node pushes to you.

### Transaction history: account_tx

\`account_tx\` returns the transactions that affected an account, newest first, each with its metadata and result. \`limit\` sets how many come per page. When there are more, the response includes a \`marker\`: send the same request with it to read the next page, until no \`marker\` comes back.

To read one transaction by its hash, use \`tx\`, as in the verification of [Module 6](?m=6&l=1).

### What an account owns: account_objects

\`account_objects\` returns the ledger objects an account owns: trust lines (\`RippleState\`), offers, URITokens, Tickets, escrows, checks, its Hooks. Each one counts in its \`OwnerCount\` and holds part of its reserve. The \`type\` parameter narrows the list to one type, for example \`type: "ticket"\`.

### Events as they happen: subscribe

A query answers once. To follow an account without asking again and again, \`subscribe\` asks the node to push events down the same WebSocket connection:

| Stream | What arrives |
|---|---|
| \`streams: ["ledger"]\` | A message each time a ledger closes |
| \`streams: ["transactions"]\` | Every validated transaction on the network |
| \`accounts: [address]\` | The transactions that affect those accounts |

The xahau library delivers them as events: \`client.on("transaction", …)\` runs for each one. The connection must stay open for them to arrive, and \`unsubscribe\` stops them.

### The examples

The first example lists the last 10 transactions of the account. The second lists the objects it owns and then subscribes to its transactions for 60 seconds. With a payment sent to the account during that time, the end of the output is:

\`\`\`
Subscribed to account transactions...
New transaction detected!
Type: Payment
Result: tesSUCCESS
\`\`\`

The transaction arrived through the open connection, without a new request.`,
        jp: `[レッスン 4.1](?m=4&l=0) ではアカウントの現在の状態を読みました。このレッスンでは、その過去、つまり現在に至るまでのトランザクションと、変化していく現在を、ノードから送られてくるイベントで読みます。

### トランザクション履歴：account_tx

\`account_tx\` はアカウントに影響したトランザクションを新しい順に返します。それぞれにメタデータと結果が付きます。\`limit\` で1ページあたりの件数を決めます。続きがある場合、レスポンスに \`marker\` が含まれます。その marker を付けて同じリクエストを送り、\`marker\` が返らなくなるまで次のページを読みます。

ハッシュで1つのトランザクションを読むには、[モジュール 6](?m=6&l=1) の確認と同じように \`tx\` を使います。

### アカウントが所有するもの：account_objects

\`account_objects\` はアカウントが所有する台帳オブジェクトを返します。トラストライン（\`RippleState\`）、オファー、URIToken、Ticket、エスクロー、チェック、その Hooks などです。どれも \`OwnerCount\` に数えられ、リザーブの一部を拘束します。\`type\` パラメータで1つの型に絞り込めます。例えば \`type: "ticket"\` です。

### 発生中のイベント：subscribe

照会は1回答えるだけです。何度も問い合わせずにアカウントを追うには、\`subscribe\` でノードに同じ WebSocket 接続でイベントを送ってもらいます。

| ストリーム | 届くもの |
|---|---|
| \`streams: ["ledger"]\` | 台帳が閉じるたびに1件のメッセージ |
| \`streams: ["transactions"]\` | ネットワーク上で検証されたすべてのトランザクション |
| \`accounts: [address]\` | それらのアカウントに影響するトランザクション |

xahau ライブラリはこれらをイベントとして渡し、\`client.on("transaction", …)\` がイベントごとに実行されます。届き続けるには接続を開いたままにする必要があり、\`unsubscribe\` で止めます。

### 例

最初の例はアカウントの直近 10 件のトランザクションを一覧表示します。2つ目の例は所有するオブジェクトを一覧表示し、その後 60 秒間アカウントのトランザクションを購読します。その間にアカウントへ支払いを送ると、出力の最後は次のようになります。

\`\`\`
アカウントのトランザクションをサブスクライブ中...
新しいトランザクションを検出！
タイプ： Payment
結果： tesSUCCESS
\`\`\`

トランザクションは新しいリクエストなしに、開いている接続を通じて届きました。`,
        ko: `[레슨 4.1](?m=4&l=0)에서는 계정의 현재 상태를 읽었습니다. 이 레슨에서는 그 과거, 즉 지금에 이르게 한 트랜잭션과, 바뀌어 가는 현재를 노드가 보내 주는 이벤트로 읽습니다.

### 트랜잭션 이력: account_tx

\`account_tx\`는 계정에 영향을 준 트랜잭션을 최신 순으로 반환하며, 각각 메타데이터와 결과가 함께 옵니다. \`limit\`으로 한 페이지에 몇 건을 받을지 정합니다. 더 있으면 응답에 \`marker\`가 포함됩니다. 그 marker를 넣어 같은 요청을 보내 다음 페이지를 읽고, \`marker\`가 더 이상 오지 않을 때까지 반복합니다.

해시로 트랜잭션 하나를 읽으려면 [모듈 6](?m=6&l=1)의 확인처럼 \`tx\`를 씁니다.

### 계정이 소유한 것: account_objects

\`account_objects\`는 계정이 소유한 원장 객체를 반환합니다. 트러스트 라인(\`RippleState\`), 오퍼, URIToken, Ticket, escrow, check, 그리고 Hooks 등입니다. 모두 \`OwnerCount\`에 포함되고 reserve의 일부를 묶어 둡니다. \`type\` 파라미터로 한 타입만 볼 수 있습니다. 예: \`type: "ticket"\`.

### 발생하는 이벤트: subscribe

조회는 한 번만 답합니다. 계속 묻지 않고 계정을 따라가려면 \`subscribe\`로 노드가 같은 WebSocket 연결로 이벤트를 보내도록 요청합니다.

| 스트림 | 도착하는 것 |
|---|---|
| \`streams: ["ledger"]\` | 원장이 닫힐 때마다 메시지 하나 |
| \`streams: ["transactions"]\` | 네트워크에서 검증된 모든 트랜잭션 |
| \`accounts: [address]\` | 그 계정들에 영향을 주는 트랜잭션 |

xahau 라이브러리는 이를 이벤트로 전달하며, \`client.on("transaction", …)\`이 이벤트마다 실행됩니다. 이벤트가 계속 오려면 연결이 열려 있어야 하고, \`unsubscribe\`로 멈춥니다.

### 예제

첫 번째 예제는 계정의 최근 트랜잭션 10건을 나열합니다. 두 번째 예제는 계정이 소유한 객체를 나열한 뒤 60초 동안 계정의 트랜잭션을 구독합니다. 그동안 계정으로 결제를 보내면 출력의 끝은 다음과 같습니다.

\`\`\`
계정 트랜잭션 구독 중...
새 트랜잭션 감지!
유형: Payment
결과: tesSUCCESS
\`\`\`

트랜잭션이 새 요청 없이 열린 연결을 통해 도착했습니다.`,
        zh: `[第 4.1 课](?m=4&l=0)读取了一个账户的当前状态。本课读取它的过去，也就是让它变成现在这样的那些交易；以及它不断变化的现在，通过节点推送给你的事件。

### 交易历史：account_tx

\`account_tx\` 按从新到旧的顺序返回影响过某个账户的交易，每笔都带有元数据和结果。\`limit\` 设置每页返回多少笔。如果还有更多，响应中会包含 \`marker\`：带上它再发送同样的请求来读取下一页，直到不再返回 \`marker\`。

要按哈希读取一笔交易，使用 \`tx\`，就像[模块 6](?m=6&l=1) 中的验证那样。

### 账户拥有的东西：account_objects

\`account_objects\` 返回账户拥有的账本对象：信任线（\`RippleState\`）、报价、URIToken、Ticket、托管、支票以及它的 Hooks。每一个都计入它的 \`OwnerCount\`，并占用一部分储备金。\`type\` 参数可以把列表限定为一种类型，例如 \`type: "ticket"\`。

### 实时事件：subscribe

一次查询只回答一次。要持续跟踪一个账户而不必反复询问，可以用 \`subscribe\` 请求节点通过同一个 WebSocket 连接推送事件：

| 数据流 | 收到什么 |
|---|---|
| \`streams: ["ledger"]\` | 每关闭一个账本收到一条消息 |
| \`streams: ["transactions"]\` | 网络上每一笔已验证的交易 |
| \`accounts: [address]\` | 影响这些账户的交易 |

xahau 库以事件的形式传递它们：每个事件都会执行一次 \`client.on("transaction", …)\`。连接必须保持打开，事件才能到达；\`unsubscribe\` 会停止推送。

### 示例

第一个示例列出账户最近的 10 笔交易。第二个示例列出它拥有的对象，然后订阅它的交易 60 秒。在此期间向该账户发送一笔付款，输出的结尾是：

\`\`\`
已订阅该账户的交易...
检测到新交易！
类型: Payment
结果: tesSUCCESS
\`\`\`

这笔交易是通过打开的连接到达的，无需发出新的请求。`,
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
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// La cuenta a consultar: el primer argumento, o WALLET de .env
getAccountTransactions(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
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
//Exemplo de endereço: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
// A conta a consultar: o primeiro argumento, ou a WALLET do .env
getAccountTransactions(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// The account to inspect: the first argument, or WALLET from .env
getAccountTransactions(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// 調べるアカウント：最初の引数、または .env の WALLET
getAccountTransactions(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// 조회할 계정: 첫 번째 인수, 또는 .env의 WALLET
getAccountTransactions(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// 要查看的账户：第一个参数，或 .env 中的 WALLET
getAccountTransactions(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
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
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// La cuenta a consultar: el primer argumento, o WALLET de .env
getAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
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
      console.log(\`  Token: \${obj.Balance.currency}\`);
      console.log(\`  Saldo: \${obj.Balance.value}\`);
    } else if (obj.LedgerEntryType === "URIToken") {
      console.log(\`  URI: \${obj.URI}\`);
    }
  }
  // Inscrever-se nas transações desta conta
  console.log("Suscrito a as transações da conta...");
  await client.request({
    command: "subscribe",
    accounts: [address]
  });
  client.on("transaction", (tx) => {
    console.log("Nova transação detectada!");
    console.log("Tipo:", tx.transaction.TransactionType);
    console.log("Resultado:", tx.meta.TransactionResult);
  });
  // Manter a conexão aberta por 60 segundos
  setTimeout(() => client.disconnect(), 60000);
}
//Exemplo de endereço: rDADDYfnLvVY9FBnS8zFXhwYFHPuU5q2Sk
// A conta a consultar: o primeiro argumento, ou a WALLET do .env
getAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
  console.log("Subscribed to account transactions...");
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
// The account to inspect: the first argument, or WALLET from .env
getAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// 調べるアカウント：最初の引数、または .env の WALLET
getAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// 조회할 계정: 첫 번째 인수, 또는 .env의 WALLET
getAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// 要查看的账户：第一个参数，或 .env 中的 WALLET
getAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Historial de transacciones", pt: "Histórico de transações", en: "Transaction history", jp: "トランザクション履歴", ko: "트랜잭션 기록", zh: "交易历史" },
          content: {
            es: `account_tx → Historial de una cuenta

• Paginar con marker
• Más recientes primero, limit por página
• Ver resultados (éxito/fallo)
• Consultar metadatos detallados`,
            pt: `account_tx → Histórico de uma conta

• Paginar com marker
• Mais recentes primeiro, limit por página
• Ver resultados (sucesso/falha)
• Consultar metadados detalhados`,
            en: `account_tx → Account history

• Paginate with marker
• Newest first, limit per page
• View results (success/failure)
• Query detailed metadata`,
            jp: `account_tx → アカウントの履歴

• markerでページング
• 新しい順、ページごとに limit
• 結果を確認（成功/失敗）
• 詳細なメタデータを照会`,
            ko: `account_tx → 계정 기록

• marker로 페이지네이션
• 최신 순, 페이지당 limit
• 결과 확인(성공/실패)
• 상세 메타데이터 조회`,
            zh: `account_tx → 账户历史

• 使用 marker 分页
• 从新到旧，每页 limit 条
• 查看结果（成功/失败）
• 查询详细 metadata`,
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
            pt: `Comando subscribe para eventos em tempo real:

• Evento ledger → Novo ledger fechado
• Evento transaction → Tx conassinaturada
• Escute com client.on('transaction')
• unsubscribe para dejar de escuchar
• Mantenha a conexão WebSocket aberta`,
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
- Se não houver \`marker\` na resposta, você chegou ao final
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
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// La cuenta a consultar: el primer argumento, o WALLET de .env
getAllAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
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
    // Pequena pausa para não sobrecarregar o nó
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
// A conta a consultar: o primeiro argumento, ou a WALLET do .env
getAllAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// The account to inspect: the first argument, or WALLET from .env
getAllAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// 調べるアカウント：最初の引数、または .env の WALLET
getAllAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// 조회할 계정: 첫 번째 인수, 또는 .env의 WALLET
getAllAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

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
// 要查看的账户：第一个参数，或 .env 中的 WALLET
getAllAccountObjects(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
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
        es: `En la red Xahau, el ledger almacena toda la información en forma de **objetos** (ledger entries). Cada objeto tiene un tipo, un índice único (hash) y campos específicos. En esta lección aprenderemos a consultar y trabajar con estos objetos directamente.

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
        pt: `Na rede Xahau, o ledger armazena toda a informação em forma de **objetos** (ledger entries). Cada objeto tem um tipo, um índice único (hash) e campos específicos. Nesta lição aprenderemos a consultar e trabalhar com esses objetos diretamente.
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
        en: `On the Xahau Network, the ledger stores all information as **objects** (ledger entries). Each object has a type, a unique index (hash), and specific fields. In this lesson we will learn how to query and work with these objects directly.

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
        jp: `Xahauネットワークでは、レジャーがすべての情報を**オブジェクト**（レジャーエントリ）として保存します。各オブジェクトにはタイプ、一意のインデックス（ハッシュ）、および特定のフィールドがあります。このレッスンでは、これらのオブジェクトを直接照会して操作する方法を学びます。

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
        zh: `在 Xahau 网络上，账本会把所有信息存储为**对象**（ledger entries）。每个对象都有类型、唯一索引（hash）以及专属字段。在这一课里，我们会学习如何直接查询和处理这些对象。

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
      theory: `لا يقرأ السكربت الـ ledger مباشرة: بل يسأل **عقدة**، أي خادمًا يشغّل \`xahaud\` ويحتفظ بنسخة من الـ ledger. يشرح هذا الدرس كيف تجري هذه المحادثة والأفكار التي يستخدمها كل استعلام.

### التحدث إلى عقدة

تفتح مكتبة xahau اتصال **WebSocket** مع عقدة وتُبقيه مفتوحًا. كل طلب رسالة JSON فيها \`command\` ومعاملاته، وتجيب العقدة بنتيجة JSON:

\`\`\`json
{ "command": "account_info", "account": "r...", "ledger_index": "validated" }
\`\`\`

تكفي العقد العامة للتطوير ولهذه الدورة:

| الشبكة | عنوان WebSocket | معرّف الشبكة |
|---|---|---|
| Mainnet | \`wss://xahau.network\` | 21337 |
| Testnet | \`wss://xahau-test.net\` | 21338 |

في بيئة الإنتاج يمكنك تشغيل عقدتك الخاصة: فلا يعود توفرها وحدود طلباتها وسجلها التاريخي معتمدًا على طرف آخر.

### الأوامر

| لقراءة | الأوامر |
|---|---|
| العقدة والشبكة | \`server_info\`، \`fee\` |
| حساب | \`account_info\`، \`account_lines\`، \`account_objects\`، \`account_tx\` |
| ledger أو كائن واحد | \`ledger\`، \`ledger_entry\` |
| معاملة | \`tx\` |
| الأحداث لحظة وقوعها | \`subscribe\`، \`unsubscribe\` |

### ثلاث أفكار يستخدمها كل استعلام

- **أي ledger.** يقرأ \`ledger_index: "validated"\` آخر ledger اتفقت عليه الشبكة: بياناته لن تتغير. ويقرأ \`"current"\` الـ ledger الجاري، الذي قد يتغير بعد. استخدم \`"validated"\` ما لم تحتج إلى الأحدث تمامًا.
- **الـ drops.** تنتقل مبالغ XAH كسلاسل نصية بوحدة **drops**: ‏1 XAH = 1,000,000 drops. و\`"5000000"\` تعني 5 XAH.
- **الـ markers.** تصل النتيجة الطويلة على صفحات. عندما يتضمن الرد \`marker\`، أرسل الطلب نفسه مع ذلك الـ marker للحصول على الصفحة التالية.

### الأمثلة

يسأل المثال الأول عقدة testnet عن نفسها. المخرجات:

\`\`\`
=== معلومات الخادم ===
الإصدار: 2026.6.21-release+3350
معرّف الشبكة: 21338
الحالة: full
الأقران المتصلون: 3
الـ ledger المُتحقَّق منه: 12676350
نصاب التحقق: 2
\`\`\`

تعني \`full\` أن العقدة تتابع الشبكة ولديها الـ ledger الحالي. ونصاب التحقق هو عدد المدققين الموثوقين الذين يجب أن يتفقوا على ledger. أما المثال الثاني فيقرأ حسابًا بـ \`account_info\`، أي كائن \`AccountRoot\` من [الدرس 1.3](?m=1&l=2).`,
      codeTitles: [
        "الاتصال واستعلام معلومات الخادم",
        "استعلام معلومات تفصيلية عن حساب",
      ],
      slides: [
        {
          title: "الاتصال بـ Xahau",
          content: `الاتصال يتم عبر WebSocket إلى عقد عامة

Mainnet: wss://xahau.network
Testnet: wss://xahau-test.net

الطلبات والردود بصيغة JSON.`,
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
      theory: `قرأ [الدرس 4.1](?m=4&l=0) الحالة الحالية لحساب. يقرأ هذا الدرس ماضيه، أي المعاملات التي أوصلته إلى حاله، وحاضره وهو يتغير، عبر أحداث ترسلها إليك العقدة.

### سجل المعاملات: account_tx

يعيد \`account_tx\` المعاملات التي أثرت في حساب، من الأحدث إلى الأقدم، ومع كل منها بياناتها الوصفية ونتيجتها. يحدد \`limit\` عدد المعاملات في كل صفحة. إذا وُجد المزيد، يتضمن الرد \`marker\`: أرسل الطلب نفسه معه لقراءة الصفحة التالية، حتى لا يعود أي \`marker\`.

لقراءة معاملة واحدة بالهاش الخاص بها، استخدم \`tx\`، كما في التحقق في [الوحدة 6](?m=6&l=1).

### ما يملكه الحساب: account_objects

يعيد \`account_objects\` كائنات الـ ledger التي يملكها الحساب: خطوط الثقة (\`RippleState\`)، والعروض، والـ URITokens، والـ Tickets، والـ escrows، والـ checks، والـ Hooks الخاصة به. كل منها يُحتسب في \`OwnerCount\` ويحجز جزءًا من احتياطيه. يقصر المعامل \`type\` القائمة على نوع واحد، مثل \`type: "ticket"\`.

### الأحداث لحظة وقوعها: subscribe

الاستعلام يجيب مرة واحدة. لمتابعة حساب دون السؤال مرارًا، يطلب \`subscribe\` من العقدة أن ترسل الأحداث عبر اتصال WebSocket نفسه:

| الـ stream | ما يصل |
|---|---|
| \`streams: ["ledger"]\` | رسالة في كل مرة يُغلق فيها ledger |
| \`streams: ["transactions"]\` | كل معاملة معتمدة على الشبكة |
| \`accounts: [address]\` | المعاملات التي تؤثر في تلك الحسابات |

تسلّمها مكتبة xahau على شكل أحداث: يُنفَّذ \`client.on("transaction", …)\` مع كل حدث. يجب أن يبقى الاتصال مفتوحًا حتى تصل، ويوقفها \`unsubscribe\`.

### الأمثلة

يسرد المثال الأول آخر 10 معاملات للحساب. ويسرد الثاني الكائنات التي يملكها ثم يشترك في معاملاته لمدة 60 ثانية. عند إرسال دفعة إلى الحساب خلال تلك المدة، تكون نهاية المخرجات:

\`\`\`
تم الاشتراك في معاملات الحساب...
تم رصد معاملة جديدة!
النوع: Payment
النتيجة: tesSUCCESS
\`\`\`

وصلت المعاملة عبر الاتصال المفتوح، دون طلب جديد.`,
      codeTitles: [
        "استعلام تاريخ معاملات حساب",
        "استعلام account objects والاشتراك في الأحداث",
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
      theory: `Un script ne lit pas le ledger directement : il interroge un **nœud**, un serveur qui exécute \`xahaud\` et détient une copie du ledger. Cette leçon explique comment se déroule cet échange et les notions qu'utilise toute requête.

### Parler à un nœud

La bibliothèque xahau ouvre une connexion **WebSocket** avec un nœud et la garde ouverte. Chaque requête est un message JSON avec une \`command\` et ses paramètres, et le nœud répond par un résultat JSON :

\`\`\`json
{ "command": "account_info", "account": "r...", "ledger_index": "validated" }
\`\`\`

Les nœuds publics suffisent pour développer et pour ce cours :

| Réseau | URL WebSocket | ID réseau |
|---|---|---|
| Mainnet | \`wss://xahau.network\` | 21337 |
| Testnet | \`wss://xahau-test.net\` | 21338 |

En production, tu peux exécuter ton propre nœud : sa disponibilité, ses limites de requêtes et son historique ne dépendent plus de quelqu'un d'autre.

### Les commandes

| Pour lire | Commandes |
|---|---|
| Le nœud et le réseau | \`server_info\`, \`fee\` |
| Un compte | \`account_info\`, \`account_lines\`, \`account_objects\`, \`account_tx\` |
| Un ledger ou un objet | \`ledger\`, \`ledger_entry\` |
| Une transaction | \`tx\` |
| Les événements en direct | \`subscribe\`, \`unsubscribe\` |

### Trois notions qu'utilise toute requête

- **Quel ledger.** \`ledger_index: "validated"\` lit le dernier ledger sur lequel le réseau s'est accordé : ses données ne changeront pas. \`"current"\` lit le ledger en cours, qui peut encore changer. Utilise \`"validated"\` sauf si tu as besoin du plus récent.
- **Les drops.** Les montants en XAH circulent sous forme de chaînes en **drops** : 1 XAH = 1 000 000 drops. \`"5000000"\` vaut 5 XAH.
- **Les markers.** Un long résultat arrive par pages. Quand une réponse contient un \`marker\`, renvoie la même requête avec ce marker pour obtenir la page suivante.

### Les exemples

Le premier exemple interroge le nœud du testnet sur lui-même. Sortie :

\`\`\`
=== Informations du serveur ===
Version : 2026.6.21-release+3350
ID réseau : 21338
État : full
Pairs connectés : 3
Ledger validé : 12676350
Quorum de validation : 2
\`\`\`

\`full\` signifie que le nœud suit le réseau et possède le ledger actuel. Le quorum de validation est le nombre de validateurs de confiance qui doivent s'accorder sur un ledger. Le second exemple lit un compte avec \`account_info\`, l'objet \`AccountRoot\` de la [leçon 1.3](?m=1&l=2).`,
      codeTitles: ["Se connecter et consulter les informations du serveur", "Consulter les détails d'un compte"],
      slides: [
        ["Connexion à Xahau", "Les scripts se connectent à un noeud WebSocket\n\n• wss://xahau-test.net pour testnet\n• Client.connect()\n• client.request(...)\n• client.disconnect()"],
        ["Commandes principales", "server_info : état du noeud\naccount_info : données d'un compte\nledger : informations du ledger\naccount_objects : objets liés au compte"],
        ["Bonnes pratiques de connexion", "• Utilise validated pour les données confirmées\n• Ferme la connexion\n• Gère les erreurs réseau\n• Ne fais pas confiance à une seule réponse sans contexte"],
      ],
    },
    m4l2: {
      title: "Requêtes avancées et abonnements",
      theory: `La [leçon 4.1](?m=4&l=0) a lu l'état actuel d'un compte. Cette leçon lit son passé, les transactions qui l'y ont mené, et son présent à mesure qu'il change, avec des événements que le nœud t'envoie.

### Historique des transactions : account_tx

\`account_tx\` renvoie les transactions qui ont touché un compte, de la plus récente à la plus ancienne, chacune avec ses métadonnées et son résultat. \`limit\` fixe combien arrivent par page. S'il y en a d'autres, la réponse contient un \`marker\` : renvoie la même requête avec lui pour lire la page suivante, jusqu'à ce qu'aucun \`marker\` ne revienne.

Pour lire une transaction par son hash, utilise \`tx\`, comme dans la vérification du [Module 6](?m=6&l=1).

### Ce que possède un compte : account_objects

\`account_objects\` renvoie les objets du ledger que possède un compte : trust lines (\`RippleState\`), offres, URITokens, Tickets, escrows, checks, ses Hooks. Chacun compte dans son \`OwnerCount\` et immobilise une partie de sa réserve. Le paramètre \`type\` réduit la liste à un type, par exemple \`type: "ticket"\`.

### Les événements en direct : subscribe

Une requête répond une seule fois. Pour suivre un compte sans redemander sans cesse, \`subscribe\` demande au nœud d'envoyer des événements par la même connexion WebSocket :

| Flux | Ce qui arrive |
|---|---|
| \`streams: ["ledger"]\` | Un message à chaque clôture de ledger |
| \`streams: ["transactions"]\` | Chaque transaction validée du réseau |
| \`accounts: [adresse]\` | Les transactions qui touchent ces comptes |

La bibliothèque xahau les livre sous forme d'événements : \`client.on("transaction", …)\` s'exécute pour chacun. La connexion doit rester ouverte pour qu'ils arrivent, et \`unsubscribe\` les arrête.

### Les exemples

Le premier exemple liste les 10 dernières transactions du compte. Le second liste les objets qu'il possède puis s'abonne à ses transactions pendant 60 secondes. Avec un paiement envoyé au compte pendant ce temps, la fin de la sortie est :

\`\`\`
Abonné aux transactions du compte...
Nouvelle transaction détectée !
Type : Payment
Résultat : tesSUCCESS
\`\`\`

La transaction est arrivée par la connexion ouverte, sans nouvelle requête.`,
      codeTitles: ["Consulter l'historique des transactions d'un compte", "Consulter les objets du compte et s'abonner aux événements"],
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
      slides: [
        ["Pagination avec marker", "Si une réponse contient marker, il reste des données\n\nRelance la même commande avec ce marker pour lire la page suivante."],
        ["Erreurs courantes", "• Adresse invalide\n• Compte non activé\n• Noeud indisponible\n• Limite trop élevée\n• Mauvais type d'objet"],
        ["Bonnes pratiques", "• Utilise try/catch\n• Affiche des messages clairs\n• Garde les limites raisonnables\n• Prévois les comptes sans objets\n• Ferme toujours la connexion"],
      ],
    },
    m4l4: {
      title: "Travailler avec les objets de ledger",
      theory: `Sur le réseau Xahau, le ledger stocke toutes les informations sous forme d'**objets** (ledger entries). Chaque objet possède un type, un index unique (hash) et des champs spécifiques. Dans cette leçon, nous allons apprendre à interroger et manipuler ces objets directement.

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

// French and Arabic code: the English code, line by line, with its prose translated
deriveCodeTranslations(moduleData);

addNewWords(moduleData, 4);
export default moduleData;
