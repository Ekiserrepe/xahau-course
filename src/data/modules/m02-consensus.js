export default {
  id: "m2",
  icon: "🤝",
  title: {
    es: "Cómo funciona el consenso en una blockchain",
    en: "How consensus works in a blockchain",
    jp: "ブロックチェーンにおけるコンセンサスの仕組み",
    ko: "블록체인에서 합의가 작동하는 방식",
    zh: "区块链中共识机制的工作原理",
  },
  lessons: [
    {
      id: "m2l1",
      title: {
        es: "Mecanismos de consenso",
        en: "Consensus mechanisms",
        jp: "コンセンサスメカニズム",
        ko: "합의 메커니즘",
        zh: "共识机制",
      },
      theory: {
        es: `El **consenso** es el mecanismo por el cual todos los nodos de una red blockchain se ponen de acuerdo sobre cuál es el estado válido del ledger. Sin consenso, no hay blockchain.

### ¿Por qué es necesario el consenso?

En una red descentralizada, no hay una autoridad central que decida qué transacciones son válidas. El consenso resuelve el problema de cómo múltiples nodos independientes pueden acordar un estado único sin confiar los unos en los otros.

### El problema del doble gasto

El **doble gasto** es el problema fundamental que todo sistema de dinero digital debe resolver: ¿cómo evitar que alguien gaste el mismo dinero dos veces?

Con dinero físico esto no es posible, si le das un billete a alguien, ya no lo tienes. Pero los datos digitales se pueden copiar. Sin un mecanismo de consenso, Alice podría enviar sus 10 XAH a Bob y simultáneamente enviar esos mismos 10 XAH a Carol. Ambas transacciones parecerían válidas por separado.

El consenso resuelve esto: todos los nodos de la red acuerdan **un único orden** de transacciones. Si la transacción a Bob se procesa primero, la transacción a Carol se rechaza porque Alice ya no tiene esos fondos.

### El Problema de los Generales Bizantinos

El doble gasto es un caso particular de un problema más general de la informática distribuida: el **Problema de los Generales Bizantinos** (1982, Lamport, Shostak y Pease).

Imagina varios generales de un ejército rodeando una ciudad enemiga. Deben coordinar si atacar o retirarse, si solo algunos atacan, perderán. El problema es que se comunican por mensajeros y **algunos generales pueden ser traidores** que envían órdenes contradictorias para provocar el caos.

Trasladado a una blockchain:
- Los **generales** son los **nodos/validadores** de la red
- Los **mensajes** son las **transacciones y propuestas**
- Los **traidores** son **nodos maliciosos** que intentan hacer trampas (por ejemplo, aprobar un doble gasto)

Un protocolo de consenso debe funcionar correctamente **incluso si una parte de los participantes miente o falla**. Esto se llama **Tolerancia a Fallos Bizantinos (BFT)**. Cada mecanismo de consenso lo resuelve de forma diferente:
- **PoW**: Hace que mentir sea extremadamente caro (requiere gastar energía)
- **PoS**: Hace que mentir tenga consecuencias económicas (pierdes tu stake)
- **Consenso federado (Xahau)**: Requiere que al menos el 80% de los validadores de confianza estén de acuerdo

### Tipos principales de consenso

**Proof of Work (PoW)** — Bitcoin
- Los mineros compiten resolviendo problemas matemáticos
- Alto consumo energético
- Finalidad probabilística (hay que esperar varias confirmaciones)

**Proof of Stake (PoS)** — Ethereum
- Los validadores ponen en juego (stake) sus tokens
- Más eficiente que PoW
- Finalidad más rápida pero con posibles reorganizaciones

**Consenso federado / UNL** — Xahau
- Los validadores votan sobre las transacciones válidas
- No requiere minería ni staking
- Finalidad determinística en segundos
- Bajo consumo energético

### ¿Qué hace diferente al consenso de Xahau?

Xahau no se basa en competencia (como PoW) ni en capital bloqueado (como PoS), sino en **confianza entre validadores** a través de listas UNL.`,
        en: `**Consensus** is the mechanism by which all nodes in a blockchain network agree on the valid state of the ledger. Without consensus, there is no blockchain.

### Why is consensus necessary?

In a decentralized network, there is no central authority to decide which transactions are valid. Consensus solves the problem of how multiple independent nodes can agree on a single state without trusting each other.

### The double spending problem

**Double spending** is the fundamental problem that every digital money system must solve: how do you prevent someone from spending the same money twice?

With physical money this is not possible, if you give a bill to someone, you no longer have it. But digital data can be copied. Without a consensus mechanism, Alice could send her 10 XAH to Bob and simultaneously send those same 10 XAH to Carol. Both transactions would appear valid separately.

Consensus solves this: all nodes in the network agree on **a single order** of transactions. If the transaction to Bob is processed first, the transaction to Carol is rejected because Alice no longer has those funds.

### The Byzantine Generals Problem

Double spending is a specific case of a more general problem in distributed computing: the **Byzantine Generals Problem** (1982, Lamport, Shostak, and Pease).

Imagine several army generals surrounding an enemy city. They must coordinate whether to attack or retreat — if only some attack, they will lose. The problem is that they communicate via messengers and **some generals may be traitors** who send contradictory orders to cause chaos.

Applied to a blockchain:
- The **generals** are the network's **nodes/validators**
- The **messages** are the **transactions and proposals**
- The **traitors** are **malicious nodes** that try to cheat (for example, approving a double spend)

A consensus protocol must work correctly **even if some participants lie or fail**. This is called **Byzantine Fault Tolerance (BFT)**. Each consensus mechanism solves it differently:
- **PoW**: Makes lying extremely expensive (requires spending energy)
- **PoS**: Makes lying have economic consequences (you lose your stake)
- **Federated consensus (Xahau)**: Requires at least 80% of trusted validators to agree

### Main types of consensus

**Proof of Work (PoW)** — Bitcoin
- Miners compete by solving mathematical problems
- High energy consumption
- Probabilistic finality (you must wait for several confirmations)

**Proof of Stake (PoS)** — Ethereum
- Validators put their tokens at stake
- More efficient than PoW
- Faster finality but with possible reorganizations

**Federated consensus / UNL** — Xahau
- Validators vote on valid transactions
- No mining or staking required
- Deterministic finality in seconds
- Low energy consumption

### What makes Xahau's consensus different?

Xahau is not based on competition (like PoW) or locked capital (like PoS), but on **trust between validators** through UNL lists.`,
        jp: `**コンセンサス**は、ブロックチェーンネットワークのすべてのノードがレジャーの有効な状態について合意するメカニズムです。コンセンサスなくして、ブロックチェーンは存在しません。

### なぜコンセンサスが必要なのか？

分散型ネットワークには、どのトランザクションが有効かを決定する中央機関が存在しません。コンセンサスは、複数の独立したノードが互いを信頼せずにどのように単一の状態に合意できるかという問題を解決します。

### 二重支払い問題

**二重支払い**はすべてのデジタルマネーシステムが解決しなければならない根本的な問題です。同じお金を2回使われるのを防ぐにはどうしたらいいでしょうか？

物理的なお金ではこれは不可能です。誰かに紙幣を渡したら、自分はもう持っていません。しかしデジタルデータはコピーできます。コンセンサスメカニズムがなければ、アリスは10 XAHをボブに送ると同時に、その同じ10 XAHをキャロルに送ることができてしまいます。両方のトランザクションが別々に有効に見えます。

コンセンサスはこれを解決します。ネットワークのすべてのノードがトランザクションの**一意の順序**について合意します。ボブへのトランザクションが最初に処理されれば、アリスにはもうその資金がないのでキャロルへのトランザクションは拒否されます。

### ビザンチン将軍問題

二重支払いは分散コンピューティングのより一般的な問題である**ビザンチン将軍問題**（1982年、ランポート、ショスタク、ピース）の1つのケースです。

敵の都市を包囲した軍の複数の将軍を想像してみましょう。攻撃するか撤退するかを調整しなければなりません。一部だけが攻撃すると負けます。問題は、彼らは使者を通じて通信し、**一部の将軍は混乱を引き起こすために矛盾した命令を送る裏切り者かもしれない**ことです。

ブロックチェーンに当てはめると：
- **将軍**は**ノード/バリデーター**
- **メッセージ**は**トランザクションと提案**
- **裏切り者**は不正を試みる**悪意のあるノード**（例：二重支払いの承認）

コンセンサスプロトコルは**参加者の一部が嘘をついたり失敗しても**正しく機能しなければなりません。これを**ビザンチン障害耐性（BFT）**と呼びます。各コンセンサスメカニズムはこれを異なる方法で解決します。
- **PoW**：嘘をつくことを非常に高価にする（エネルギーの消費が必要）
- **PoS**：嘘をつくことに経済的な結果をもたらす（ステークを失う）
- **連合型コンセンサス（Xahau）**：信頼できるバリデーターの少なくとも80%の合意が必要

### 主なコンセンサスの種類

**Proof of Work (PoW)** — Bitcoin
- マイナーが数学的問題を解いて競争する
- 高エネルギー消費
- 確率的なファイナリティ(最終性)（複数の確認を待つ必要がある）

**Proof of Stake (PoS)** — Ethereum
- バリデーターがトークンをステーク（担保）に入れる
- PoWより効率的
- より高速なファイナリティだが再編成の可能性あり

**Federated consensus / UNL** — Xahau
- バリデーターが有効なトランザクションに投票する
- マイニングもステーキングも不要
- 数秒での決定論的なファイナリティ
- 低エネルギー消費

### Xahauのコンセンサスは何が違うのか？

Xahauは（PoWのような）競争にも、（PoSのような）ロックされた資本にも基づいていません。UNLリストを通じた**バリデーター間の信頼**に基づいています。`,
        ko: `**합의**는 블록체인 네트워크의 모든 노드가 원장의 유효한 상태에 동의하는 메커니즘입니다. 합의 없이는 블록체인도 없습니다.

### 왜 합의가 필요한가?

탈중앙화 네트워크에는 어떤 트랜잭션이 유효한지 결정할 중앙 기관이 없습니다. 합의는 여러 독립 노드가 서로를 신뢰하지 않고도 단일 상태에 동의할 수 있는 방법의 문제를 해결합니다.

### 이중 지불 문제

**이중 지불**은 모든 디지털 화폐 시스템이 해결해야 하는 근본적인 문제입니다. 같은 돈을 두 번 사용하는 것을 어떻게 막을 수 있을까요?

실물 화폐로는 이것이 불가능합니다. 누군가에게 지폐를 주면 자신은 더 이상 갖지 않습니다. 그러나 디지털 데이터는 복사할 수 있습니다. 합의 메커니즘이 없다면 앨리스는 10 XAH를 밥에게 보내는 동시에 같은 10 XAH를 캐롤에게도 보낼 수 있습니다. 두 트랜잭션 모두 개별적으로 유효해 보입니다.

합의가 이것을 해결합니다. 네트워크의 모든 노드가 트랜잭션의 **단일 순서**에 동의합니다. 밥에 대한 트랜잭션이 먼저 처리되면 앨리스에게 더 이상 해당 자금이 없기 때문에 캐롤에 대한 트랜잭션은 거부됩니다.

### 비잔틴 장군 문제

이중 지불은 분산 컴퓨팅의 더 일반적인 문제의 특수한 경우입니다. 바로 **비잔틴 장군 문제**(1982년, Lamport, Shostak, Pease)입니다.

적의 도시를 포위한 여러 군 장군을 상상해보세요. 이기려면 동시 공격을 조율해야 합니다. 일부만 공격하면 지게 됩니다. 문제는 그들이 전령을 통해 통신하며 **일부 장군이 혼란을 일으키기 위해 모순된 명령을 보내는 반역자**일 수 있다는 것입니다.

블록체인에 적용하면:
- **장군**은 네트워크의 **노드/검증자**
- **메시지**는 **트랜잭션 및 제안**
- **반역자**는 속임수를 시도하는 **악의적인 노드** (예: 이중 지불 승인)

합의 프로토콜은 **일부 참가자가 거짓말을 하거나 실패하더라도** 올바르게 작동해야 합니다. 이를 **비잔틴 장애 허용(BFT)**이라고 합니다. 각 합의 메커니즘은 이를 다르게 해결합니다.
- **PoW**: 거짓말을 매우 비싸게 만듦 (에너지 소비 필요)
- **PoS**: 거짓말에 경제적 결과를 초래함 (스테이크 손실)
- **연합 합의 (Xahau)**: 신뢰할 수 있는 검증자의 최소 80% 동의 필요

### 주요 합의 유형

**Proof of Work (PoW)** — Bitcoin
- 채굴자들이 수학 문제를 풀어 경쟁
- 높은 에너지 소비
- 확률적 최종성 (여러 확인을 기다려야 함)

**Proof of Stake (PoS)** — Ethereum
- 검증자들이 토큰을 스테이크에 예치
- PoW보다 효율적
- 더 빠른 최종성이지만 재구성 가능성 있음

**연합 합의 / UNL** — Xahau
- 검증자들이 유효한 트랜잭션에 투표
- 채굴 또는 스테이킹 불필요
- 초 단위의 결정론적 최종성
- 낮은 에너지 소비

### Xahau의 합의가 다른 점은?

Xahau는 경쟁(PoW처럼)이나 잠긴 자본(PoS처럼)에 기반하지 않고, UNL 목록을 통한 **검증자 간의 신뢰**에 기반합니다.`,
        zh: `**共识**是区块链网络中所有节点就账本有效状态达成一致的机制。没有共识，就没有区块链。

### 为什么需要共识？

在去中心化网络中，没有中央机构来决定哪些交易是有效的。共识解决了多个独立节点在互不信任的情况下如何就单一状态达成一致的问题。

### 双重支付问题

**双重支付**是每个数字货币系统必须解决的根本问题：如何防止有人用同一笔钱支付两次？

对于实物货币，这是不可能的——如果你把钞票给了某人，你自己就没有了。但数字数据可以复制。如果没有共识机制，Alice 可以同时将 10 XAH 发给 Bob，也将同样的 10 XAH 发给 Carol。两笔交易单独来看都是有效的。

共识解决了这个问题：网络中所有节点就交易的**唯一顺序**达成一致。如果发给 Bob 的交易先被处理，那么发给 Carol 的交易就会被拒绝，因为 Alice 已经没有那笔资金了。

### 拜占庭将军问题

双重支付是分布式计算中一个更普遍问题的特例：**拜占庭将军问题**（1982年，Lamport、Shostak 和 Pease）。

想象几位将军率军包围了一座敌城。他们必须协调是进攻还是撤退——如果只有部分人进攻，他们就会失败。问题在于他们通过信使通信，而**某些将军可能是叛徒**，会发出相互矛盾的命令制造混乱。

应用到区块链中：
- **将军**是网络的**节点/验证者**
- **消息**是**交易和提案**
- **叛徒**是试图作弊的**恶意节点**（例如：批准双重支付）

共识协议必须**即使部分参与者撒谎或失败**也能正常工作。这称为**拜占庭容错（BFT）**。每种共识机制的解决方式不同：
- **PoW**：让撒谎的代价极其高昂（需要消耗能源）
- **PoS**：让撒谎产生经济后果（损失质押金）
- **联邦共识（Xahau）**：要求至少 80% 的可信验证者达成一致

### 主要共识类型

**工作量证明（PoW）** — Bitcoin
- 矿工通过解决数学难题来竞争
- 高能耗
- 概率性终局性（需要等待多次确认）

**权益证明（PoS）** — Ethereum
- 验证者质押代币
- 比 PoW 更高效
- 终局性更快，但存在重组可能

**联邦共识 / UNL** — Xahau
- 验证者对有效交易进行投票
- 无需挖矿或质押
- 秒级确定性终局性
- 低能耗

### Xahau 的共识有何不同？

Xahau 不依赖竞争（如 PoW）或锁定资金（如 PoS），而是通过 UNL 列表建立**验证者之间的信任**。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar el estado de los validadores",
            en: "Query the validator status",
            jp: "バリデーターのステータスを照会する",
            ko: "검증자 상태 조회",
            zh: "查询验证者状态",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function getValidators() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  // Consultar información del servidor incluyendo validadores
  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("Estado del consenso:");
  console.log("  Ledger validado:", info.validated_ledger.seq);
  console.log("  Hash:", info.validated_ledger.hash);
  console.log("  Quorum:", info.validation_quorum);

  await client.disconnect();
}

getValidators();`,
            en: `const { Client } = require("xahau");

async function getValidators() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  // Query server information including validators
  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("Consensus status:");
  console.log("  Validated ledger:", info.validated_ledger.seq);
  console.log("  Hash:", info.validated_ledger.hash);
  console.log("  Quorum:", info.validation_quorum);

  await client.disconnect();
}

getValidators();`,
            jp: `const { Client } = require("xahau");

async function getValidators() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  // バリデーター情報を含むサーバー情報を照会する
  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("コンセンサスの状態：");
  console.log("  検証済みレジャー：", info.validated_ledger.seq);
  console.log("  ハッシュ：", info.validated_ledger.hash);
  console.log("  クォーラム：", info.validation_quorum);

  await client.disconnect();
}

getValidators();`,
            ko: `const { Client } = require("xahau");

async function getValidators() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  // 검증자 정보를 포함한 서버 정보 조회
  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("합의 상태:");
  console.log("  검증된 원장:", info.validated_ledger.seq);
  console.log("  해시:", info.validated_ledger.hash);
  console.log("  쿼럼:", info.validation_quorum);

  await client.disconnect();
}

getValidators();`,
            zh: `const { Client } = require("xahau");

async function getValidators() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  // 查询包含验证者信息的服务器状态
  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("共识状态:");
  console.log("  已验证账本:", info.validated_ledger.seq);
  console.log("  哈希:", info.validated_ledger.hash);
  console.log("  法定人数:", info.validation_quorum);

  await client.disconnect();
}

getValidators();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es el consenso?", en: "What is consensus?", jp: "コンセンサスとは？", ko: "합의란 무엇인가?", zh: "什么是共识？" },
          content: {
            es: "El mecanismo por el cual los nodos\nacuerdan el estado válido del ledger\n\n• Sin consenso, no hay blockchain\n• Resuelve el problema de la confianza\n• Cada red usa un mecanismo diferente",
            en: "The mechanism by which nodes\nagree on the valid state of the ledger\n\n• Without consensus, there is no blockchain\n• Solves the trust problem\n• Each network uses a different mechanism",
            jp: "ノードがレジャーの有効な状態に\n合意するメカニズム\n\n• コンセンサスなくしてブロックチェーンは存在しない\n• 信頼の問題を解決する\n• ネットワークごとに異なるメカニズムを使用",
            ko: "노드들이 원장의 유효한 상태에\n동의하는 메커니즘\n\n• 합의 없이는 블록체인이 없음\n• 신뢰 문제를 해결함\n• 각 네트워크는 다른 메커니즘을 사용함",
            zh: "节点就账本有效状态\n达成一致的机制\n\n• 没有共识就没有区块链\n• 解决了信任问题\n• 每个网络使用不同的机制",
          },
          visual: "🤝",
        },
        {
          title: { es: "PoW vs PoS vs Federated", en: "PoW vs PoS vs Federated", jp: "PoW vs PoS vs 連合型コンセンサス", ko: "PoW vs PoS vs 연합 합의", zh: "PoW vs PoS vs 联邦共识" },
          content: {
            es: "⛏️ PoW → Minería (Bitcoin)\n💰 PoS → Staking (Ethereum)\n🗳️ Federado → Votación (Xahau)\n\nXahau: sin minería, sin staking\nFinalidad determinística en segundos",
            en: "⛏️ PoW → Mining (Bitcoin)\n💰 PoS → Staking (Ethereum)\n🗳️ Federated → Voting (Xahau)\n\nXahau: no mining, no staking\nDeterministic finality in seconds",
            jp: "⛏️ PoW → マイニング（Bitcoin）\n💰 PoS → ステーキング（Ethereum）\n🗳️ 連合型コンセンサス → 投票（Xahau）\n\nXahau：マイニングなし、ステーキングなし\n数秒での決定論的なファイナリティ",
            ko: "⛏️ PoW → 채굴 (Bitcoin)\n💰 PoS → 스테이킹 (Ethereum)\n🗳️ 연합 합의 → 투표 (Xahau)\n\nXahau: 채굴 없음, 스테이킹 없음\n초 단위의 결정론적 최종성",
            zh: "⛏️ PoW → 挖矿（Bitcoin）\n💰 PoS → 质押（Ethereum）\n🗳️ 联邦共识 → 投票（Xahau）\n\nXahau：无需挖矿，无需质押\n秒级确定性终局性",
          },
          visual: "⚡",
        },
        {
          title: { es: "¿Por qué consenso federado?", en: "Why federated consensus?", jp: "なぜ連合型コンセンサスなのか？", ko: "왜 연합 합의인가?", zh: "为什么选择联邦共识？" },
          content: {
            es: "Xahau eligió consenso federado por:\n\n• Velocidad → Finalidad en 3-5 segundos\n• Eficiencia energética → Sin minería costosa\n• Finalidad determinística → Sin reorgs ni forks\n• Sin barreras económicas → No requiere staking\n• Confianza distribuida → Validadores diversos\n\nIdeal para pagos y aplicaciones financieras",
            en: "Xahau chose federated consensus for:\n\n• Speed → Finality in 3-5 seconds\n• Energy efficiency → No costly mining\n• Deterministic finality → No reorgs or forks\n• No economic barriers → No staking required\n• Distributed trust → Diverse validators\n\nIdeal for payments and financial applications",
            jp: "Xahauが連合型コンセンサスを選んだ理由：\n\n• 速度 → 3〜5秒でのファイナリティ\n• エネルギー効率 → コストのかかるマイニング不要\n• 決定論的なファイナリティ → 再編成やフォークなし\n• 経済的障壁なし → ステーキング不要\n• 分散した信頼 → 多様なバリデーター\n\n支払いと金融アプリケーションに最適",
            ko: "Xahau가 연합 합의를 선택한 이유:\n\n• 속도 → 3~5초 내 최종성\n• 에너지 효율 → 비용이 큰 채굴 없음\n• 결정론적 최종성 → 재구성이나 포크 없음\n• 경제적 장벽 없음 → 스테이킹 불필요\n• 분산된 신뢰 → 다양한 검증자\n\n결제 및 금융 애플리케이션에 이상적",
            zh: "Xahau 选择联邦共识的原因：\n\n• 速度 → 3~5 秒内完成终局\n• 能效 → 无需高耗能挖矿\n• 确定性终局 → 无重组或分叉\n• 无经济门槛 → 无需质押\n• 分布式信任 → 多元化验证者\n\n非常适合支付和金融应用",
          },
          visual: "🏆",
        },
      ],
    },
    {
      id: "m2l2",
      title: {
        es: "El protocolo de consenso de Xahau",
        en: "The Xahau consensus protocol",
        jp: "Xahauのコンセンサスプロトコル",
        ko: "Xahau 합의 프로토콜",
        zh: "Xahau 共识协议",
      },
      theory: {
        es: `Xahau utiliza el **Mecanísmo de Consenso Federado**. Este protocolo se basa en el concepto de **UNL (Unique Node List)**, una lista de validadores en los que cada nodo confía.

### ¿Cómo funciona?

1. **Propuesta**: Los validadores proponen un conjunto de transacciones para incluir en el próximo ledger
2. **Votación**: Los validadores comparan sus propuestas con las de otros validadores de su UNL
3. **Convergencia**: A través de varias rondas, los validadores convergen hacia un conjunto común de transacciones
4. **Validación**: Cuando al menos el **80%** de los validadores de la UNL están de acuerdo, el ledger se valida
5. **Cierre**: El nuevo ledger se cierra y se convierte en el estado oficial de la red

### UNL (Unique Node List)

Cada nodo mantiene una **UNL**, la lista de validadores cuyas opiniones considera fiables. No todos los nodos necesitan confiar en los mismos validadores, pero debe haber suficiente **solapamiento** entre las UNLs para que la red converja.

### Propiedades del consenso en Xahau

- **Finalidad determinística**: Una vez que un ledger se valida, es final. No hay reorganizaciones (a diferencia de Bitcoin/Ethereum)
- **Velocidad**: El ledger se cierra cada **3-5 segundos**
- **Eficiencia energética**: No requiere cálculos intensivos como PoW
- **Sin staking**: Los validadores no necesitan bloquear capital
- **Tolerancia a fallos**: La red funciona mientras al menos el 80% de los validadores de la UNL estén operativos

### Diferencia con Proof of Stake

En PoS, la seguridad está respaldada por capital económico (tokens en staking). En el consenso de Xahau, la seguridad está respaldada por la **reputación y diversidad** de los validadores. Los validadores son operados por entidades independientes (universidades, empresas, fundaciones o particulares).`,
        en: `Xahau uses the **Federated Consensus Mechanism**. This protocol is based on the concept of **UNL (Unique Node List)**, a list of validators that each node trusts.

### How does it work?

1. **Proposal**: Validators propose a set of transactions to include in the next ledger
2. **Voting**: Validators compare their proposals with those of other validators in their UNL
3. **Convergence**: Through several rounds, validators converge toward a common set of transactions
4. **Validation**: When at least **80%** of the UNL validators agree, the ledger is validated
5. **Closing**: The new ledger is closed and becomes the official state of the network

### UNL (Unique Node List)

Each node maintains a **UNL**, the list of validators whose opinions it considers reliable. Not all nodes need to trust the same validators, but there must be enough **overlap** between UNLs for the network to converge.

### Properties of consensus in Xahau

- **Deterministic finality**: Once a ledger is validated, it is final. There are no reorganizations (unlike Bitcoin/Ethereum)
- **Speed**: The ledger closes every **3-5 seconds**
- **Energy efficiency**: Does not require intensive computations like PoW
- **No staking**: Validators do not need to lock up capital
- **Fault tolerance**: The network works as long as at least 80% of the UNL validators are operational

### Difference from Proof of Stake

In PoS, security is backed by economic capital (staked tokens). In Xahau's consensus, security is backed by the **reputation and diversity** of validators. Validators are operated by independent entities (universities, companies, foundations, or individuals).`,
        jp: `Xahauは**連合型コンセンサスメカニズム**を使用しています。このプロトコルは、各ノードが信頼するバリデーターのリストである**UNL（Unique Node List）**の概念に基づいています。

### どのように機能するのか？

1. **提案**：バリデーターが次のレジャーに含めるトランザクションのセットを提案する
2. **投票**：バリデーターが自分のUNLの他のバリデーターの提案と比較する
3. **収束**：複数のラウンドを通じて、バリデーターは共通のトランザクションセットに収束する
4. **検証**：UNLバリデーターの少なくとも**80%**が合意すると、レジャーが検証される
5. **閉鎖**：新しいレジャーがクローズし、ネットワークの公式状態となる

### UNL（Unique Node List）

各ノードは**UNL**（意見を信頼できると考えるバリデーターのリスト）を維持します。すべてのノードが同じバリデーターを信頼する必要はありませんが、ネットワークが収束するには、UNL間に十分な**重複**が必要です。

### Xahauのコンセンサスの特性

- **決定論的なファイナリティ**：レジャーが検証されると、それは最終的です。再編成はありません（Bitcoin/Ethereumとは異なる）
- **速度**：レジャーは**3〜5秒**ごとにクローズする
- **エネルギー効率**：PoWのような集中的な計算を必要としない
- **ステーキング不要**：バリデーターは資本をロックする必要がない
- **障害耐性**：UNLバリデーターの少なくとも80%が稼働している限りネットワークは機能する

### Proof of Stakeとの違い

PoSでは、セキュリティは経済的資本（ステークされたトークン）によって裏付けられています。Xahauのコンセンサスでは、セキュリティはバリデーターの**評判と多様性**によって裏付けられています。バリデーターは独立した組織（大学、企業、財団、または個人）によって運営されています。`,
        ko: `Xahau는 **연합 합의 메커니즘**을 사용합니다. 이 프로토콜은 각 노드가 신뢰하는 검증자 목록인 **UNL(Unique Node List)**의 개념에 기반합니다.

### 어떻게 작동하는가?

1. **제안**: 검증자들이 다음 원장에 포함할 트랜잭션 집합을 제안합니다
2. **투표**: 검증자들이 자신의 UNL에 있는 다른 검증자들의 제안과 비교합니다
3. **수렴**: 여러 라운드를 통해 검증자들이 공통 트랜잭션 집합으로 수렴합니다
4. **검증**: UNL 검증자의 최소 **80%**가 동의하면 원장이 검증됩니다
5. **종결**: 새 원장이 닫히고 네트워크의 공식 상태가 됩니다

### UNL (Unique Node List)

각 노드는 **UNL**, 즉 의견을 신뢰할 수 있다고 여기는 검증자 목록을 유지합니다. 모든 노드가 동일한 검증자를 신뢰할 필요는 없지만, 네트워크가 수렴하려면 UNL 간에 충분한 **중복**이 있어야 합니다.

### Xahau 합의의 특성

- **결정론적 최종성**: 원장이 검증되면 최종입니다. 재구성이 없습니다 (Bitcoin/Ethereum과 달리)
- **속도**: 원장은 **3~5초**마다 닫힙니다
- **에너지 효율**: PoW처럼 집중적인 계산이 필요하지 않습니다
- **스테이킹 없음**: 검증자는 자본을 잠글 필요가 없습니다
- **장애 허용**: UNL 검증자의 최소 80%가 운영 중인 한 네트워크가 작동합니다

### Proof of Stake와의 차이점

PoS에서 보안은 경제적 자본(스테이킹된 토큰)으로 뒷받침됩니다. Xahau의 합의에서 보안은 검증자의 **명성과 다양성**으로 뒷받침됩니다. 검증자는 독립적인 기관(대학, 기업, 재단 또는 개인)에 의해 운영됩니다.`,
        zh: `Xahau 使用**联邦共识机制**。该协议基于 **UNL（唯一节点列表）**的概念——即每个节点所信任的验证者列表。

### 如何运作？

1. **提案**：验证者提出一组要纳入下一个账本的交易
2. **投票**：验证者将自己的提案与 UNL 中其他验证者的提案进行比较
3. **收敛**：经过多轮投票，验证者逐渐就共同的交易集达成一致
4. **验证**：当至少 **80%** 的 UNL 验证者达成一致时，账本被验证
5. **关闭**：新账本关闭，成为网络的官方状态

### UNL（唯一节点列表）

每个节点维护一个 **UNL**，即其认为可信赖的验证者列表。并非所有节点都需要信任相同的验证者，但各 UNL 之间必须有足够的**重叠**，网络才能收敛。

### Xahau 共识的特性

- **确定性终局性**：账本一旦验证即为最终状态，不会发生重组（与 Bitcoin/Ethereum 不同）
- **速度**：账本每 **3~5 秒**关闭一次
- **能效**：无需像 PoW 那样进行密集计算
- **无需质押**：验证者不需要锁定资金
- **容错性**：只要至少 80% 的 UNL 验证者在线，网络就能正常运行

### 与权益证明的区别

在 PoS 中，安全性由经济资本（质押代币）支撑。在 Xahau 的共识中，安全性由验证者的**声誉和多样性**支撑。验证者由独立机构（大学、企业、基金会或个人）运营。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Monitorizar el cierre de ledgers en tiempo real",
            en: "Monitor ledger closing in real time",
            jp: "レジャーのクローズをリアルタイムで監視する",
            ko: "실시간 원장 종결 모니터링",
            zh: "实时监控账本关闭",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function monitorLedgers() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  console.log("Monitorizando el cierre de ledgers...");
  console.log("(Cada cierre = una ronda de consenso completada)");

  // Suscribirse a eventos de ledger
  await client.request({
    command: "subscribe",
    streams: ["ledger"]
  });

  client.on("ledgerClosed", (ledger) => {
    console.log(\`Ledger #\${ledger.ledger_index} cerrado\`);
    console.log(\`  Hash: \${ledger.ledger_hash}\`);
    console.log(\`  Transacciones: \${ledger.txn_count}\`);
    console.log(\`  Hora: \${new Date().toISOString()}\`);
  });

  // Detener después de 30 segundos
  setTimeout(async () => {
    console.log("Deteniendo monitorización...");
    await client.disconnect();
  }, 30000);
}

monitorLedgers();`,
            en: `const { Client } = require("xahau");

async function monitorLedgers() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  console.log("Monitoring ledger closing...");
  console.log("(Each close = a completed consensus round)");

  // Subscribe to ledger events
  await client.request({
    command: "subscribe",
    streams: ["ledger"]
  });

  client.on("ledgerClosed", (ledger) => {
    console.log(\`Ledger #\${ledger.ledger_index} closed\`);
    console.log(\`  Hash: \${ledger.ledger_hash}\`);
    console.log(\`  Transactions: \${ledger.txn_count}\`);
    console.log(\`  Time: \${new Date().toISOString()}\`);
  });

  // Stop after 30 seconds
  setTimeout(async () => {
    console.log("Stopping monitoring...");
    await client.disconnect();
  }, 30000);
}

monitorLedgers();`,
            jp: `const { Client } = require("xahau");

async function monitorLedgers() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  console.log("レジャーのクローズを監視中...");
  console.log("（各クローズ = コンセンサスラウンドの完了）");

  // レジャーイベントをサブスクライブする
  await client.request({
    command: "subscribe",
    streams: ["ledger"]
  });

  client.on("ledgerClosed", (ledger) => {
    console.log(\`レジャー #\${ledger.ledger_index} クローズ\`);
    console.log(\`  ハッシュ: \${ledger.ledger_hash}\`);
    console.log(\`  トランザクション数: \${ledger.txn_count}\`);
    console.log(\`  時刻: \${new Date().toISOString()}\`);
  });

  // 30秒後に停止する
  setTimeout(async () => {
    console.log("監視を停止しています...");
    await client.disconnect();
  }, 30000);
}

monitorLedgers();`,
            ko: `const { Client } = require("xahau");

async function monitorLedgers() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  console.log("원장 종결 모니터링 중...");
  console.log("(각 종결 = 완료된 합의 라운드)");

  // 원장 이벤트 구독
  await client.request({
    command: "subscribe",
    streams: ["ledger"]
  });

  client.on("ledgerClosed", (ledger) => {
    console.log(\`원장 #\${ledger.ledger_index} 종결\`);
    console.log(\`  해시: \${ledger.ledger_hash}\`);
    console.log(\`  트랜잭션: \${ledger.txn_count}\`);
    console.log(\`  시간: \${new Date().toISOString()}\`);
  });

  // 30초 후 중지
  setTimeout(async () => {
    console.log("모니터링 중지 중...");
    await client.disconnect();
  }, 30000);
}

monitorLedgers();`,
            zh: `const { Client } = require("xahau");

async function monitorLedgers() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  console.log("正在监控账本关闭...");
  console.log("（每次关闭 = 完成一轮共识）");

  // 订阅账本事件
  await client.request({
    command: "subscribe",
    streams: ["ledger"]
  });

  client.on("ledgerClosed", (ledger) => {
    console.log(\`账本 #\${ledger.ledger_index} 已关闭\`);
    console.log(\`  哈希: \${ledger.ledger_hash}\`);
    console.log(\`  交易数: \${ledger.txn_count}\`);
    console.log(\`  时间: \${new Date().toISOString()}\`);
  });

  // 30 秒后停止
  setTimeout(async () => {
    console.log("正在停止监控...");
    await client.disconnect();
  }, 30000);
}

monitorLedgers();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "UNL: Unique Node List", en: "UNL: Unique Node List", jp: "UNL：ユニークノードリスト", ko: "UNL: 고유 노드 목록", zh: "UNL：唯一节点列表" },
          content: {
            es: "Cada nodo tiene una lista de validadores\nen los que confía (UNL)\n\n• Los validadores proponen transacciones\n• Votan en múltiples rondas\n• 80% de acuerdo → Ledger validado\n• Finalidad en 3-5 segundos",
            en: "Each node has a list of validators\nthat it trusts (UNL)\n\n• Validators propose transactions\n• They vote in multiple rounds\n• 80% agreement → Validated ledger\n• Finality in 3-5 seconds",
            jp: "各ノードは信頼するバリデーターの\nリスト（UNL）を持つ\n\n• バリデーターがトランザクションを提案する\n• 複数のラウンドで投票する\n• 80%の合意 → レジャーが検証される\n• 3〜5秒での最終性",
            ko: "각 노드는 신뢰하는 검증자\n목록(UNL)을 보유\n\n• 검증자들이 트랜잭션을 제안\n• 여러 라운드에서 투표\n• 80% 동의 → 원장 검증\n• 3~5초 내 최종성",
            zh: "每个节点维护一份\n可信验证者列表（UNL）\n\n• 验证者提出交易\n• 多轮投票\n• 80% 同意 → 账本验证\n• 3~5 秒内完成终局",
          },
          visual: "🗳️",
        },
        {
          title: { es: "Propiedades del consenso", en: "Consensus properties", jp: "コンセンサスの特性", ko: "합의 특성", zh: "共识特性" },
          content: {
            es: "✅ Finalidad determinística (sin reorgs)\n✅ Cierre cada 3-5 segundos\n✅ Sin minería ni staking\n✅ Bajo consumo energético\n✅ Tolerante a fallos (80% quorum)",
            en: "✅ Deterministic finality (no reorgs)\n✅ Closes every 3-5 seconds\n✅ No mining or staking\n✅ Low energy consumption\n✅ Fault tolerant (80% quorum)",
            jp: "✅ 決定論的な最終性（再編成なし）\n✅ 3〜5秒ごとにクローズ\n✅ マイニングもステーキングも不要\n✅ 低エネルギー消費\n✅ 障害耐性あり（80%クォーラム）",
            ko: "✅ 결정론적 최종성 (재구성 없음)\n✅ 3~5초마다 종결\n✅ 채굴 또는 스테이킹 없음\n✅ 낮은 에너지 소비\n✅ 장애 허용 (80% 쿼럼)",
            zh: "✅ 确定性终局性（无重组）\n✅ 每 3~5 秒关闭一次\n✅ 无需挖矿或质押\n✅ 低能耗\n✅ 容错性（80% 法定人数）",
          },
          visual: "🛡️",
        },
        {
          title: { es: "Las 5 fases del consenso", en: "The 5 phases of consensus", jp: "コンセンサスの5つのフェーズ", ko: "합의의 5단계", zh: "共识的 5 个阶段" },
          content: {
            es: "1️⃣ Propuesta → Validadores proponen transacciones\n2️⃣ Votación → Comparan propuestas con su UNL\n3️⃣ Convergencia → Varias rondas hasta coincidir\n4️⃣ Validación → 80% de acuerdo en la UNL\n5️⃣ Cierre → Nuevo ledger oficial e irreversible\n\nTodo el proceso tarda 3-5 segundos",
            en: "1️⃣ Proposal → Validators propose transactions\n2️⃣ Voting → Compare proposals with their UNL\n3️⃣ Convergence → Multiple rounds until agreement\n4️⃣ Validation → 80% agreement in the UNL\n5️⃣ Closing → New official and irreversible ledger\n\nThe entire process takes 3-5 seconds",
            jp: "1️⃣ 提案 → バリデーターがトランザクションを提案する\n2️⃣ 投票 → UNLの提案と比較する\n3️⃣ 収束 → 合意するまで複数ラウンド繰り返す\n4️⃣ 検証 → UNLの80%が合意する\n5️⃣ クローズ → 新しい公式かつ不可逆のレジャー\n\nプロセス全体は3〜5秒",
            ko: "1️⃣ 제안 → 검증자들이 트랜잭션 제안\n2️⃣ 투표 → UNL과 제안 비교\n3️⃣ 수렴 → 동의할 때까지 여러 라운드 반복\n4️⃣ 검증 → UNL의 80% 동의\n5️⃣ 종결 → 새롭고 공식적이며 불가역적인 원장\n\n전체 과정은 3~5초 소요",
            zh: "1️⃣ 提案 → 验证者提出交易\n2️⃣ 投票 → 与 UNL 的提案进行比较\n3️⃣ 收敛 → 多轮投票直至达成一致\n4️⃣ 验证 → UNL 80% 同意\n5️⃣ 关闭 → 新的官方且不可逆的账本\n\n整个过程耗时 3~5 秒",
          },
          visual: "🔄",
        },
      ],
    },
    {
      id: "m2l3",
      title: {
        es: "Tolerancia a fallos bizantinos",
        en: "Byzantine Fault Tolerance",
        jp: "ビザンチン障害耐性",
        ko: "비잔틴 장애 허용",
        zh: "拜占庭容错",
      },
      theory: {
        es: `La seguridad de una blockchain depende de su capacidad para funcionar correctamente incluso cuando algunos participantes fallan o actúan de forma maliciosa. Este concepto se conoce como **Tolerancia a Fallos Bizantinos (BFT)**.

### El Problema de los Generales Bizantinos

Imagina varios generales de un ejército que rodean una ciudad enemiga. Deben coordinar un ataque simultáneo para ganar: si solo algunos atacan, perderán. El problema es que se comunican por mensajeros, y **algunos generales pueden ser traidores** que envían mensajes contradictorios.

Este es el **Problema de los Generales Bizantinos**, formulado en 1982 por Lamport, Shostak y Pease. Trasladado a blockchain:
- Los **generales** son los **validadores**
- Los **mensajes** son las **propuestas de transacciones**
- Los **traidores** son **nodos maliciosos o defectuosos**

### ¿Qué significa BFT?

Un sistema tiene **Tolerancia a Fallos Bizantinos** cuando puede llegar a un consenso correcto aunque una fracción de sus participantes actúe de forma arbitraria (envíe datos incorrectos, no responda, o intente sabotear la red).

### ¿Cómo maneja Xahau los fallos bizantinos?

El protocolo de consenso de Xahau requiere que al menos el **80% de los validadores de la UNL** estén de acuerdo para validar un ledger. Esto significa que la red puede tolerar hasta un **20% de validadores defectuosos o maliciosos** y seguir funcionando correctamente.

Escenarios que Xahau maneja:
- **Validador caído**: Si un validador deja de responder, los demás continúan sin él
- **Validador malicioso**: Si un validador propone transacciones inválidas, el 80% restante lo ignora
- **Partición de red**: Si un grupo de validadores pierde conectividad, el grupo mayoritario (>80%) sigue validando

### ¿Qué pasa cuando los validadores no están de acuerdo?

Cuando no se alcanza el umbral del 80%, el ledger simplemente **no se cierra**. Las transacciones en disputa se posponen hasta la siguiente ronda de consenso. No hay "ganador parcial", o hay consenso completo o no hay cierre. Si no se llega a un acuerdo, la blockchain se para antes que equivocarse `,
        en: `The security of a blockchain depends on its ability to function correctly even when some participants fail or act maliciously. This concept is known as **Byzantine Fault Tolerance (BFT)**.

### The Byzantine Generals Problem

Imagine several army generals surrounding an enemy city. They must coordinate a simultaneous attack to win: if only some attack, they will lose. The problem is that they communicate via messengers, and **some generals may be traitors** who send contradictory messages.

This is the **Byzantine Generals Problem**, formulated in 1982 by Lamport, Shostak, and Pease. Applied to blockchain:
- The **generals** are the **validators**
- The **messages** are the **transaction proposals**
- The **traitors** are **malicious or faulty nodes**

### What does BFT mean?

A system has **Byzantine Fault Tolerance** when it can reach correct consensus even if a fraction of its participants acts arbitrarily (sends incorrect data, does not respond, or tries to sabotage the network).

### How does Xahau handle Byzantine faults?

Xahau's consensus protocol requires at least **80% of the UNL validators** to agree in order to validate a ledger. This means the network can tolerate up to **20% of faulty or malicious validators** and continue functioning correctly.

Scenarios that Xahau handles:
- **Downed validator**: If a validator stops responding, the others continue without it
- **Malicious validator**: If a validator proposes invalid transactions, the remaining 80% ignores it
- **Network partition**: If a group of validators loses connectivity, the majority group (>80%) continues validating

### What happens when validators disagree?

When the 80% threshold is not reached, the ledger simply **does not close**. Disputed transactions are postponed until the next consensus round. There is no "partial winner" — either there is full consensus or there is no closing. If agreement cannot be reached, the blockchain halts rather than making an error.`,
        jp: `ブロックチェーンのセキュリティは、一部の参加者が失敗したり悪意を持って行動したりしても正しく機能する能力に依存しています。この概念は**ビザンチン障害耐性（BFT）**として知られています。

### ビザンチン将軍問題

敵の都市を包囲した軍の複数の将軍を想像してください。勝つには同時攻撃を調整しなければなりません。一部だけが攻撃すると負けます。問題は、使者を通じて通信しており、**一部の将軍が矛盾したメッセージを送る裏切り者かもしれない**ことです。

これが1982年にランポート、ショスタク、ピースが定式化した**ビザンチン将軍問題**です。ブロックチェーンに当てはめると次のようになります。
- **将軍**は**バリデーター**
- **メッセージ**は**トランザクションの提案**
- **裏切り者**は**悪意のあるまたは欠陥のあるノード**

### BFTとは何を意味するのか？

参加者の一部が任意に行動（誤ったデータを送信する、応答しない、またはネットワークを妨害しようとする）しても、システムが正しいコンセンサスに達できる場合、そのシステムは**ビザンチン障害耐性**を持っています。

### XahauはBFをどのように処理するのか？

Xahauのコンセンサスプロトコルは、レジャーを検証するためにUNLバリデーターの少なくとも**80%**の合意を必要とします。これはネットワークが最大**20%の欠陥または悪意のあるバリデーター**を許容し、正しく機能し続けられることを意味します。

Xahauが処理するシナリオ：
- **ダウンしたバリデーター**：バリデーターが応答を停止しても、他のバリデーターはそれなしで続行する
- **悪意のあるバリデーター**：バリデーターが無効なトランザクションを提案しても、残りの80%はそれを無視する
- **ネットワーク分断**：バリデーターのグループが接続性を失っても、多数派グループ（>80%）は検証を続ける

### バリデーターが合意しない場合はどうなるのか？

80%の閾値に達しない場合、レジャーは単純に**クローズしません**。係争中のトランザクションは次のコンセンサスラウンドまで延期されます。「部分的な勝者」は存在しません。完全なコンセンサスがあるか、クローズしないかのどちらかです。合意に達しない場合、ブロックチェーンはエラーを犯すよりも停止することを選択します。`,
        ko: `블록체인의 보안은 일부 참가자가 실패하거나 악의적으로 행동하더라도 올바르게 작동하는 능력에 달려 있습니다. 이 개념은 **비잔틴 장애 허용(BFT)**으로 알려져 있습니다.

### 비잔틴 장군 문제

적의 도시를 포위한 여러 군 장군을 상상해보세요. 이기려면 동시 공격을 조율해야 합니다. 일부만 공격하면 지게 됩니다. 문제는 그들이 전령을 통해 통신하며 **일부 장군이 모순된 메시지를 보내는 반역자**일 수 있다는 것입니다.

이것이 1982년 Lamport, Shostak, Pease가 정식화한 **비잔틴 장군 문제**입니다. 블록체인에 적용하면:
- **장군**은 **검증자**
- **메시지**는 **트랜잭션 제안**
- **반역자**는 **악의적이거나 결함이 있는 노드**

### BFT는 무엇을 의미하는가?

참가자 일부가 임의로 행동(잘못된 데이터 전송, 무응답, 또는 네트워크 방해 시도)하더라도 시스템이 올바른 합의에 도달할 수 있을 때 **비잔틴 장애 허용**을 갖추었다고 합니다.

### Xahau는 비잔틴 장애를 어떻게 처리하는가?

Xahau의 합의 프로토콜은 원장을 검증하기 위해 UNL 검증자의 최소 **80%**의 동의를 필요로 합니다. 이는 네트워크가 최대 **20%의 결함 또는 악의적인 검증자**를 허용하면서도 올바르게 작동할 수 있음을 의미합니다.

Xahau가 처리하는 시나리오:
- **다운된 검증자**: 검증자가 응답을 중지해도 다른 검증자들이 계속 진행
- **악의적인 검증자**: 검증자가 유효하지 않은 트랜잭션을 제안해도 나머지 80%가 무시
- **네트워크 분리**: 검증자 그룹이 연결을 잃어도 다수 그룹(>80%)이 계속 검증

### 검증자들이 동의하지 않으면 어떻게 되는가?

80% 임계값에 도달하지 못하면 원장은 단순히 **닫히지 않습니다**. 분쟁 중인 트랜잭션은 다음 합의 라운드까지 연기됩니다. "부분적인 승자"는 없습니다. 완전한 합의가 있거나 종결이 없거나 둘 중 하나입니다. 합의에 도달할 수 없으면 블록체인은 오류를 범하기보다 멈춥니다.`,
        zh: `区块链的安全性取决于其即使在部分参与者失效或恶意行事时也能正常运作的能力。这个概念被称为**拜占庭容错（BFT）**。

### 拜占庭将军问题

想象几位将军率军包围了一座敌城。他们必须协调同时进攻才能获胜——如果只有部分人进攻，他们就会失败。问题在于他们通过信使通信，而**某些将军可能是叛徒**，会发出相互矛盾的消息。

这就是 1982 年 Lamport、Shostak 和 Pease 提出的**拜占庭将军问题**。应用到区块链中：
- **将军**是**验证者**
- **消息**是**交易提案**
- **叛徒**是**恶意或有缺陷的节点**

### BFT 是什么意思？

当一个系统即使部分参与者任意行事（发送错误数据、不响应或试图破坏网络）也能达成正确共识时，该系统具有**拜占庭容错**能力。

### Xahau 如何处理拜占庭故障？

Xahau 的共识协议要求至少 **80% 的 UNL 验证者**同意才能验证账本。这意味着网络可以容忍多达 **20% 的有缺陷或恶意验证者**，同时仍能正常运行。

Xahau 能处理的场景：
- **验证者宕机**：某个验证者停止响应，其余验证者继续运行
- **恶意验证者**：某个验证者提出无效交易，其余 80% 将其忽略
- **网络分区**：某组验证者失去连接，多数组（>80%）继续验证

### 验证者不同意时会发生什么？

当未能达到 80% 的阈值时，账本简单地**不会关闭**。有争议的交易被推迟到下一轮共识。没有"部分胜者"——要么完全达成共识，要么不关闭。如果无法达成一致，区块链会停止运行而不是产生错误。`,
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "El Problema de los Generales Bizantinos", en: "The Byzantine Generals Problem", jp: "ビザンチン将軍問題", ko: "비잔틴 장군 문제", zh: "拜占庭将军问题" },
          content: {
            es: "Generales deben coordinar un ataque\npero algunos pueden ser traidores\n\nEn blockchain:\n🏛️ Generales = Validadores\n📨 Mensajes = Propuestas de transacciones\n🦹 Traidores = Nodos maliciosos\n\nBFT = funcionar correctamente\nincluso con actores maliciosos",
            en: "Generals must coordinate an attack\nbut some may be traitors\n\nIn blockchain:\n🏛️ Generals = Validators\n📨 Messages = Transaction proposals\n🦹 Traitors = Malicious nodes\n\nBFT = functioning correctly\neven with malicious actors",
            jp: "将軍たちは攻撃を調整しなければならないが\n一部は裏切り者かもしれない\n\nブロックチェーンでは：\n🏛️ 将軍 = バリデーター\n📨 メッセージ = トランザクションの提案\n🦹 裏切り者 = 悪意のあるノード\n\nBFT = 悪意のある行為者がいても\n正しく機能すること",
            ko: "장군들은 공격을 조율해야 하지만\n일부는 반역자일 수 있음\n\n블록체인에서:\n🏛️ 장군 = 검증자\n📨 메시지 = 트랜잭션 제안\n🦹 반역자 = 악의적인 노드\n\nBFT = 악의적인 행위자가 있어도\n올바르게 작동하는 것",
            zh: "将军们必须协调进攻\n但部分可能是叛徒\n\n在区块链中：\n🏛️ 将军 = 验证者\n📨 消息 = 交易提案\n🦹 叛徒 = 恶意节点\n\nBFT = 即使存在恶意行为者\n也能正确运作",
          },
          visual: "🏛️",
        },
        {
          title: { es: "Xahau y la tolerancia a fallos", en: "Xahau and fault tolerance", jp: "Xahauと障害耐性", ko: "Xahau와 장애 허용", zh: "Xahau 与容错性" },
          content: {
            es: "Xahau tolera hasta 20% de fallos\n\n• 80% de la UNL debe estar de acuerdo\n• Validador caído → los demás continúan\n• Validador malicioso → es ignorado\n• Sin consenso → el ledger no se cierra\n  (nunca se fuerza un resultado parcial)",
            en: "Xahau tolerates up to 20% failures\n\n• 80% of the UNL must agree\n• Downed validator → the others continue\n• Malicious validator → it is ignored\n• No consensus → the ledger does not close\n  (a partial result is never forced)",
            jp: "Xahauは最大20%の障害を許容する\n\n• UNLの80%が合意しなければならない\n• ダウンしたバリデーター → 他が続行する\n• 悪意のあるバリデーター → 無視される\n• コンセンサスなし → レジャーはクローズしない\n  （部分的な結果は強制されない）",
            ko: "Xahau는 최대 20% 장애를 허용\n\n• UNL의 80%가 동의해야 함\n• 다운된 검증자 → 다른 검증자들이 계속\n• 악의적인 검증자 → 무시됨\n• 합의 없음 → 원장이 닫히지 않음\n  (부분적인 결과는 강제되지 않음)",
            zh: "Xahau 可容忍最多 20% 的故障\n\n• UNL 的 80% 必须同意\n• 宕机验证者 → 其余继续运行\n• 恶意验证者 → 被忽略\n• 无共识 → 账本不会关闭\n  （从不强制产生部分结果）",
          },
          visual: "🛡️",
        }
      ],
    },
    {
      id: "m2l4",
      title: {
        es: "Validadores en la práctica",
        en: "Validators in practice",
        jp: "実践におけるバリデーター",
        ko: "실제 검증자",
        zh: "实践中的验证者",
      },
      theory: {
        es: `Hasta ahora hemos hablado de validadores de forma teórica. En esta lección veremos cómo funcionan **en la práctica**: quién los opera, qué se necesita para ejecutar uno, y cómo la red evoluciona a través del sistema de enmiendas.

### ¿Quién opera validadores en Xahau?

La fortaleza de una red descentralizada depende de la **diversidad de sus validadores**. En Xahau, los validadores son operados por:

- **Fundaciones y organizaciones** del ecosistema
- **Empresas** que construyen sobre la red
- **Desarrolladores independientes** de la comunidad

La clave es que los validadores sean operados por entidades **independientes** en distintas jurisdicciones y con diferentes motivaciones, lo que dificulta la colusión.

### Requisitos para operar un validador

Para ejecutar un nodo validador en Xahau necesitas:

- **Hardware**: Servidor con al menos 8 GB de RAM, 4 CPUs, y almacenamiento SSD rápido
- **Red**: Conexión a internet estable con baja latencia y alta disponibilidad
- **Software**: El software \`xahaud\` (daemon de Xahau) configurado en modo validador
- **Disponibilidad**: El validador debe estar online 24/7 con un uptime superior al 99%
- **Mantenimiento**: Actualizaciones regulares del software cuando se publican nuevas versiones

No se requiere ningún depósito ni staking de tokens para ser validador.

### UNL por defecto vs UNL personalizada

**UNL por defecto (Default UNL / dUNL)**:
- Es la lista de validadores recomendada publicada por los operadores principales de la red
- Los nodos nuevos usan esta lista por defecto
- Se actualiza periódicamente para añadir o eliminar validadores

**UNL personalizada**:
- Cada operador de nodo puede crear su propia UNL
- Permite elegir en qué validadores confiar específicamente
- Debe tener suficiente solapamiento con otras UNLs para mantener la convergencia
- Útil para operadores avanzados que quieren mayor control

### ¿Qué pasa si un validador se desconecta?

Cuando un validador de la UNL deja de responder:
1. Los otros validadores simplemente continúan sin él
2. El quorum se calcula sobre los validadores **activos**
3. Si demasiados validadores caen (<80% disponible), la red **deja de validar** nuevos ledgers (no se corrompe, solo se pausa)
4. Cuando suficientes validadores vuelven, la red reanuda automáticamente

### Enmiendas (Amendments) y votación de protocolo

Las **enmiendas** son el mecanismo por el cual Xahau actualiza su protocolo de forma descentralizada:

1. Un desarrollador propone un cambio al protocolo y lo implementa con un ID de enmienda único
2. Los validadores **votan** si apoyan la activación de esa enmienda
3. Si una enmienda recibe apoyo del **80% de los validadores** durante **5 días consecutivos**, se activa automáticamente
4. Una vez activada, es permanente e irreversible

Ejemplos de enmiendas incluyen: nuevos tipos de transacciones, nuevas características de la blockchain.

### Métricas de descentralización

¿Cómo medir si una red es realmente descentralizada? Algunas métricas clave:

- **Coeficiente Nakamoto**: El número mínimo de entidades que tendrían que coludirse para comprometer la red. Cuanto más alto, mejor
- **Distribución geográfica**: Validadores en diferentes países y continentes
- **Diversidad de operadores**: Diferentes tipos de entidades (empresas, universidades, individuos)
- **Diversidad de infraestructura**: Diferentes proveedores de hosting, no todos en AWS o Google Cloud
- **Solapamiento de UNL**: Qué porcentaje de validadores comparten las diferentes UNLs`,
        en: `So far we have talked about validators theoretically. In this lesson we will see how they work **in practice**: who operates them, what is needed to run one, and how the network evolves through the amendments system.

### Who operates validators on Xahau?

The strength of a decentralized network depends on the **diversity of its validators**. On Xahau, validators are operated by:

- **Foundations and organizations** in the ecosystem
- **Companies** building on the network
- **Independent developers** from the community

The key is that validators are operated by **independent** entities in different jurisdictions and with different motivations, making collusion difficult.

### Requirements to operate a validator

To run a validator node on Xahau you need:

- **Hardware**: A server with at least 8 GB of RAM, 4 CPUs, and fast SSD storage
- **Network**: A stable internet connection with low latency and high availability
- **Software**: The \`xahaud\` software (Xahau daemon) configured in validator mode
- **Availability**: The validator must be online 24/7 with uptime above 99%
- **Maintenance**: Regular software updates when new versions are released

No deposit or token staking is required to be a validator.

### Default UNL vs custom UNL

**Default UNL (dUNL)**:
- It is the recommended validator list published by the main network operators
- New nodes use this list by default
- It is updated periodically to add or remove validators

**Custom UNL**:
- Each node operator can create their own UNL
- Allows choosing which validators to specifically trust
- Must have enough overlap with other UNLs to maintain convergence
- Useful for advanced operators who want more control

### What happens if a validator disconnects?

When a UNL validator stops responding:
1. The other validators simply continue without it
2. The quorum is calculated based on **active** validators
3. If too many validators go down (<80% available), the network **stops validating** new ledgers (it does not get corrupted, it just pauses)
4. When enough validators come back, the network resumes automatically

### Amendments and protocol voting

**Amendments** are the mechanism by which Xahau updates its protocol in a decentralized way:

1. A developer proposes a change to the protocol and implements it with a unique amendment ID
2. Validators **vote** on whether they support activating that amendment
3. If an amendment receives support from **80% of validators** for **5 consecutive days**, it is automatically activated
4. Once activated, it is permanent and irreversible

Examples of amendments include: new transaction types, new blockchain features.

### Decentralization metrics

How do you measure if a network is truly decentralized? Some key metrics:

- **Nakamoto Coefficient**: The minimum number of entities that would need to collude to compromise the network. The higher, the better
- **Geographic distribution**: Validators in different countries and continents
- **Operator diversity**: Different types of entities (companies, universities, individuals)
- **Infrastructure diversity**: Different hosting providers, not all on AWS or Google Cloud
- **UNL overlap**: What percentage of validators the different UNLs share`,
        jp: `これまでバリデーターについて理論的に話してきました。このレッスンでは、誰が運営するか、1つ実行するために何が必要か、そしてネットワークがエンメントメントシステムを通じてどのように進化するか、など**実践的に**どのように機能するかを見ていきます。

### Xahauで誰がバリデーターを運営するのか？

分散型ネットワークの強さはその**バリデーターの多様性**に依存します。Xahauでは、バリデーターは次のような組織によって運営されます。

- エコシステムの**財団と組織**
- ネットワーク上に構築する**企業**
- コミュニティの**独立した開発者**

重要なのは、バリデーターが異なる管轄区域で異なる動機を持つ**独立した**組織によって運営されることです。これにより共謀が困難になります。

### バリデーターを運営するための要件

Xahauでバリデーターノードを実行するには次のような要件があります。

- **ハードウェア**：少なくとも8GBのRAM、4つのCPU、高速SSDストレージを持つサーバー
- **ネットワーク**：低遅延と高可用性の安定したインターネット接続
- **ソフトウェア**：バリデーターモードで設定された\`xahaud\`ソフトウェア（Xahauデーモン）
- **可用性**：99%以上のアップタイムで24時間365日オンライン
- **メンテナンス**：新バージョン公開時の定期的なソフトウェア更新

バリデーターになるためにデポジットやトークンのステーキングは必要ありません。

### デフォルトUNL vs カスタムUNL

**デフォルトUNL（dUNL）**：
- ネットワークの主要オペレーターが公開する推奨バリデーターリスト
- 新しいノードはデフォルトでこのリストを使用する
- バリデーターを追加・削除するために定期的に更新される

**カスタムUNL**：
- 各ノードオペレーターは独自のUNLを作成できる
- 具体的にどのバリデーターを信頼するかを選択できる
- 収束を維持するために他のUNLと十分な重複が必要
- より多くのコントロールを望む上級オペレーターに有用

### バリデーターが切断された場合はどうなるのか？

UNLバリデーターが応答を停止した場合
1. 他のバリデーターはそれなしで続行する
2. 閾値は**アクティブな**バリデーターに基づいて計算される
3. あまりにも多くのバリデーターがダウンした場合（80%未満）、ネットワークは新しいレジャーの**検証を停止する**（破損せず、一時停止するだけ）
4. 十分なバリデーターが戻ると、ネットワークは自動的に再開する

### Amendment（修正案）とプロトコル投票

**Amendment**はXahauが分散型の方法でプロトコルを更新するメカニズムです：

1. 開発者がプロトコルへの変更を提案し、一意のAmendmentIDで実装する
2. バリデーターがそのAmendmentのアクティベーションを支持するかどうか**投票する**
3. Amendmentが**5日間連続して**バリデーターの**80%のサポート**を受けると、自動的にアクティベートされる
4. 一度アクティベートされると、永続的かつ不可逆です

Amendmentの例：新しいトランザクションタイプ、新しいブロックチェーン機能。

### 分散化の指標

ネットワークが本当に分散化されているかどうかをどのように測定するか？主要な指標は次の通りです。

- **中本係数**：ネットワークを侵害するために共謀する必要がある最小エンティティ数。高いほど良い
- **地理的分布**：異なる国や大陸のバリデーター
- **オペレーターの多様性**：異なる種類のエンティティ（企業、大学、個人）
- **インフラの多様性**：異なるホスティングプロバイダー、すべてAWSやGoogleクラウドではない
- **UNLの重複**：異なるUNLが共有するバリデーターの割合`,
        ko: `지금까지 검증자에 대해 이론적으로 이야기했습니다. 이 레슨에서는 **실제로** 어떻게 작동하는지 알아봅니다. 누가 운영하는지, 운영하려면 무엇이 필요한지, 그리고 수정안 시스템을 통해 네트워크가 어떻게 진화하는지를 살펴봅니다.

### Xahau에서 검증자를 누가 운영하는가?

탈중앙화 네트워크의 강점은 **검증자의 다양성**에 달려 있습니다. Xahau에서 검증자는 다음과 같은 조직이 운영합니다.

- 생태계의 **재단 및 조직**
- 네트워크에서 개발하는 **기업**
- 커뮤니티의 **독립 개발자**

핵심은 검증자가 서로 다른 관할 구역에서 서로 다른 동기를 가진 **독립적인** 기관에 의해 운영되어 담합이 어렵다는 것입니다.

### 검증자 운영 요건

Xahau에서 검증자 노드를 실행하려면:

- **하드웨어**: 최소 8GB RAM, 4개 CPU, 빠른 SSD 스토리지를 갖춘 서버
- **네트워크**: 낮은 지연 시간과 높은 가용성의 안정적인 인터넷 연결
- **소프트웨어**: 검증자 모드로 구성된 \`xahaud\` 소프트웨어 (Xahau 데몬)
- **가용성**: 가동률 99% 이상으로 24/7 온라인 유지
- **유지 관리**: 새 버전 출시 시 정기적인 소프트웨어 업데이트

검증자가 되기 위해 예치금이나 토큰 스테이킹이 필요하지 않습니다.

### 기본 UNL vs 커스텀 UNL

**기본 UNL (dUNL)**:
- 주요 네트워크 운영자가 게시하는 권장 검증자 목록
- 새 노드는 기본적으로 이 목록을 사용
- 검증자를 추가하거나 제거하기 위해 주기적으로 업데이트

**커스텀 UNL**:
- 각 노드 운영자가 자체 UNL을 만들 수 있음
- 특별히 신뢰할 검증자를 선택 가능
- 수렴을 유지하려면 다른 UNL과 충분한 중복이 있어야 함
- 더 많은 제어를 원하는 고급 운영자에게 유용

### 검증자가 연결 끊기면 어떻게 되는가?

UNL 검증자가 응답을 중지하면:
1. 다른 검증자들이 그것 없이 계속 진행
2. 쿼럼은 **활성** 검증자를 기준으로 계산
3. 너무 많은 검증자가 다운되면 (<80% 가용), 네트워크는 새 원장 **검증을 중단** (손상되지 않고 일시 중지만 됨)
4. 충분한 검증자가 돌아오면 네트워크가 자동으로 재개

### 수정안(Amendments)과 프로토콜 투표

**수정안**은 Xahau가 탈중앙화 방식으로 프로토콜을 업데이트하는 메커니즘입니다.

1. 개발자가 프로토콜 변경을 제안하고 고유한 수정안 ID로 구현
2. 검증자들이 해당 수정안 활성화를 지지하는지 **투표**
3. 수정안이 **5일 연속** 검증자의 **80% 지지**를 받으면 자동으로 활성화
4. 활성화되면 영구적이고 불가역적

수정안의 예: 새로운 트랜잭션 유형, 새로운 블록체인 기능.

### 탈중앙화 지표

네트워크가 진정으로 탈중앙화되었는지 어떻게 측정할까요? 몇 가지 핵심 지표:

- **나카모토 계수**: 네트워크를 침해하기 위해 공모해야 하는 최소 기관 수. 높을수록 좋음
- **지리적 분포**: 다른 국가 및 대륙의 검증자
- **운영자 다양성**: 다양한 유형의 기관 (기업, 대학, 개인)
- **인프라 다양성**: 다른 호스팅 제공업체, 모두 AWS 또는 Google Cloud가 아님
- **UNL 중복**: 서로 다른 UNL이 공유하는 검증자의 비율`,
        zh: `前面我们已经从理论层面介绍了验证者。本课将了解验证者**在实践中**如何运作：谁来运营、运行节点需要什么，以及网络如何通过修正案系统演进。

### 谁在 Xahau 上运营验证者？

去中心化网络的强度取决于**验证者的多样性**。在 Xahau 上，验证者由以下机构运营：

- 生态系统的**基金会和组织**
- 在网络上开发应用的**企业**
- 社区的**独立开发者**

关键在于验证者由不同司法管辖区、具有不同动机的**独立**实体运营，这使得串通作弊十分困难。

### 运营验证者的要求

在 Xahau 上运行验证者节点需要：

- **硬件**：至少 8GB RAM、4 个 CPU 和高速 SSD 存储的服务器
- **网络**：稳定的互联网连接，低延迟、高可用性
- **软件**：以验证者模式配置的 \`xahaud\` 软件（Xahau 守护进程）
- **可用性**：7×24 小时在线，正常运行时间超过 99%
- **维护**：新版本发布时定期更新软件

成为验证者无需存入保证金或质押代币。

### 默认 UNL 与自定义 UNL

**默认 UNL（dUNL）**：
- 由主要网络运营者发布的推荐验证者列表
- 新节点默认使用此列表
- 定期更新以添加或删除验证者

**自定义 UNL**：
- 每个节点运营者可以创建自己的 UNL
- 可以自行选择具体信任哪些验证者
- 必须与其他 UNL 有足够的重叠才能保持网络收敛
- 适合希望更多控制权的高级运营者

### 如果验证者断开连接会发生什么？

当某个 UNL 验证者停止响应时：
1. 其他验证者继续运行，不受影响
2. 法定人数根据**活跃**验证者计算
3. 如果太多验证者宕机（可用率 <80%），网络**停止验证**新账本（不会损坏，只是暂停）
4. 足够多的验证者恢复后，网络自动继续

### 修正案（Amendments）与协议投票

**修正案**是 Xahau 以去中心化方式更新协议的机制：

1. 开发者提出对协议的修改，并以唯一的修正案 ID 实现
2. 验证者**投票**决定是否支持激活该修正案
3. 如果修正案连续 **5 天**获得 **80% 的验证者**支持，则自动激活
4. 一旦激活，永久且不可逆

修正案示例：新的交易类型、新的区块链特性。

### 去中心化指标

如何衡量一个网络是否真正去中心化？几个关键指标：

- **中本系数**：攻击网络所需串通的最少实体数，越高越好
- **地理分布**：不同国家和大陆的验证者
- **运营商多样性**：不同类型的实体（企业、大学、个人）
- **基础设施多样性**：不同的托管服务商，而非全部使用 AWS 或 Google Cloud
- **UNL 重叠**：不同 UNL 共享的验证者占比`,
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar server_info y campos de validadores",
            en: "Query server_info and validator fields",
            jp: "server_infoとバリデーターフィールドを照会する",
            ko: "server_info 및 검증자 필드 조회",
            zh: "查询 server_info 与验证者字段",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function inspectValidatorInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;

  console.log("=== Información del servidor ===");
  console.log("Versión del servidor:", info.build_version);
  console.log("Estado:", info.server_state);
  console.log("");

  console.log("=== Estado del consenso ===");
  console.log("Quorum de validación:", info.validation_quorum);
  console.log("Ledger validado:", info.validated_ledger.seq);
  console.log("Hash del ledger:", info.validated_ledger.hash);
  console.log("Antigüedad del ledger:", info.validated_ledger.age, "segundos");
  console.log("Reserva base:", info.validated_ledger.reserve_base_xrp, "XAH");
  console.log("Reserva por objeto:", info.validated_ledger.reserve_inc_xrp, "XAH");
  console.log("");

  console.log("=== Métricas de red ===");
  console.log("Peers conectados:", info.peers);
  console.log("Tiempo en línea:", info.uptime, "segundos");
  console.log("Carga del servidor:", info.load_factor);

  await client.disconnect();
}

inspectValidatorInfo();`,
            en: `const { Client } = require("xahau");

async function inspectValidatorInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;

  console.log("=== Server information ===");
  console.log("Server version:", info.build_version);
  console.log("Status:", info.server_state);
  console.log("");

  console.log("=== Consensus status ===");
  console.log("Validation quorum:", info.validation_quorum);
  console.log("Validated ledger:", info.validated_ledger.seq);
  console.log("Ledger hash:", info.validated_ledger.hash);
  console.log("Ledger age:", info.validated_ledger.age, "seconds");
  console.log("Base reserve:", info.validated_ledger.reserve_base_xrp, "XAH");
  console.log("Reserve per object:", info.validated_ledger.reserve_inc_xrp, "XAH");
  console.log("");

  console.log("=== Network metrics ===");
  console.log("Connected peers:", info.peers);
  console.log("Uptime:", info.uptime, "seconds");
  console.log("Server load:", info.load_factor);

  await client.disconnect();
}

inspectValidatorInfo();`,
            jp: `const { Client } = require("xahau");

async function inspectValidatorInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;

  console.log("=== サーバー情報 ===");
  console.log("サーバーバージョン：", info.build_version);
  console.log("ステータス：", info.server_state);
  console.log("");

  console.log("=== コンセンサスの状態 ===");
  console.log("検証クォーラム：", info.validation_quorum);
  console.log("検証済みレジャー：", info.validated_ledger.seq);
  console.log("レジャーハッシュ：", info.validated_ledger.hash);
  console.log("レジャーの経過時間：", info.validated_ledger.age, "秒");
  console.log("基本リザーブ：", info.validated_ledger.reserve_base_xrp, "XAH");
  console.log("オブジェクトごとのリザーブ：", info.validated_ledger.reserve_inc_xrp, "XAH");
  console.log("");

  console.log("=== ネットワーク指標 ===");
  console.log("接続済みピア：", info.peers);
  console.log("稼働時間：", info.uptime, "秒");
  console.log("サーバー負荷：", info.load_factor);

  await client.disconnect();
}

inspectValidatorInfo();`,
            ko: `const { Client } = require("xahau");

async function inspectValidatorInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;

  console.log("=== 서버 정보 ===");
  console.log("서버 버전:", info.build_version);
  console.log("상태:", info.server_state);
  console.log("");

  console.log("=== 합의 상태 ===");
  console.log("검증 쿼럼:", info.validation_quorum);
  console.log("검증된 원장:", info.validated_ledger.seq);
  console.log("원장 해시:", info.validated_ledger.hash);
  console.log("원장 경과 시간:", info.validated_ledger.age, "초");
  console.log("기본 예비금:", info.validated_ledger.reserve_base_xrp, "XAH");
  console.log("객체당 예비금:", info.validated_ledger.reserve_inc_xrp, "XAH");
  console.log("");

  console.log("=== 네트워크 지표 ===");
  console.log("연결된 피어:", info.peers);
  console.log("가동 시간:", info.uptime, "초");
  console.log("서버 부하:", info.load_factor);

  await client.disconnect();
}

inspectValidatorInfo();`,
            zh: `const { Client } = require("xahau");

async function inspectValidatorInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;

  console.log("=== 服务器信息 ===");
  console.log("服务器版本:", info.build_version);
  console.log("状态:", info.server_state);
  console.log("");

  console.log("=== 共识状态 ===");
  console.log("验证法定人数:", info.validation_quorum);
  console.log("已验证账本:", info.validated_ledger.seq);
  console.log("账本哈希:", info.validated_ledger.hash);
  console.log("账本经过时间:", info.validated_ledger.age, "秒");
  console.log("基础储备:", info.validated_ledger.reserve_base_xrp, "XAH");
  console.log("每对象储备:", info.validated_ledger.reserve_inc_xrp, "XAH");
  console.log("");

  console.log("=== 网络指标 ===");
  console.log("已连接节点:", info.peers);
  console.log("运行时间:", info.uptime, "秒");
  console.log("服务器负载:", info.load_factor);

  await client.disconnect();
}

inspectValidatorInfo();`,
          },
        },
        {
          title: {
            es: "Consultar las tarifas actuales de la red",
            en: "Query current network fees",
            jp: "現在のネットワーク手数料を照会する",
            ko: "현재 네트워크 수수료 조회",
            zh: "查询当前网络手续费",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function checkNetworkFees() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  // Comando fee: muestra las tarifas actuales de la red
  const feeResponse = await client.request({
    command: "fee"
  });

  const fee = feeResponse.result;
  console.log("=== Tarifas actuales de la red ===");
  console.log("Tarifa base (drops):", fee.drops.base_fee);
  console.log("Tarifa mediana (drops):", fee.drops.median_fee);
  console.log("Tarifa mínima (drops):", fee.drops.minimum_fee);
  console.log("Tarifa ledger abierto (drops):", fee.drops.open_ledger_fee);
  console.log("");

  // Convertir drops a XAH (1 XAH = 1,000,000 drops)
  const baseFeeXAH = Number(fee.drops.base_fee) / 1_000_000;
  const medianFeeXAH = Number(fee.drops.median_fee) / 1_000_000;
  console.log("=== En XAH ===");
  console.log("Tarifa base:", baseFeeXAH, "XAH");
  console.log("Tarifa mediana:", medianFeeXAH, "XAH");
  console.log("");

  console.log("=== Estado del ledger ===");
  console.log("Ledger actual:", fee.ledger_current_index);
  console.log("Niveles de carga esperados:", fee.levels.median_level);

  await client.disconnect();
}

checkNetworkFees();`,
            en: `const { Client } = require("xahau");

async function checkNetworkFees() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  // Fee command: shows current network fees
  const feeResponse = await client.request({
    command: "fee"
  });

  const fee = feeResponse.result;
  console.log("=== Current network fees ===");
  console.log("Base fee (drops):", fee.drops.base_fee);
  console.log("Median fee (drops):", fee.drops.median_fee);
  console.log("Minimum fee (drops):", fee.drops.minimum_fee);
  console.log("Open ledger fee (drops):", fee.drops.open_ledger_fee);
  console.log("");

  // Convert drops to XAH (1 XAH = 1,000,000 drops)
  const baseFeeXAH = Number(fee.drops.base_fee) / 1_000_000;
  const medianFeeXAH = Number(fee.drops.median_fee) / 1_000_000;
  console.log("=== In XAH ===");
  console.log("Base fee:", baseFeeXAH, "XAH");
  console.log("Median fee:", medianFeeXAH, "XAH");
  console.log("");

  console.log("=== Ledger status ===");
  console.log("Current ledger:", fee.ledger_current_index);
  console.log("Expected load levels:", fee.levels.median_level);

  await client.disconnect();
}

checkNetworkFees();`,
            jp: `const { Client } = require("xahau");

async function checkNetworkFees() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  // feeコマンド：現在のネットワーク手数料を表示する
  const feeResponse = await client.request({
    command: "fee"
  });

  const fee = feeResponse.result;
  console.log("=== 現在のネットワーク手数料 ===");
  console.log("基本手数料（drops）：", fee.drops.base_fee);
  console.log("中央値手数料（drops）：", fee.drops.median_fee);
  console.log("最低手数料（drops）：", fee.drops.minimum_fee);
  console.log("オープンレジャー手数料（drops）：", fee.drops.open_ledger_fee);
  console.log("");

  // dropsをXAHに変換する（1 XAH = 1,000,000 drops）
  const baseFeeXAH = Number(fee.drops.base_fee) / 1_000_000;
  const medianFeeXAH = Number(fee.drops.median_fee) / 1_000_000;
  console.log("=== XAH換算 ===");
  console.log("基本手数料：", baseFeeXAH, "XAH");
  console.log("中央値手数料：", medianFeeXAH, "XAH");
  console.log("");

  console.log("=== レジャーの状態 ===");
  console.log("現在のレジャー：", fee.ledger_current_index);
  console.log("予想負荷レベル：", fee.levels.median_level);

  await client.disconnect();
}

checkNetworkFees();`,
            ko: `const { Client } = require("xahau");

async function checkNetworkFees() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  // fee 명령: 현재 네트워크 수수료를 표시
  const feeResponse = await client.request({
    command: "fee"
  });

  const fee = feeResponse.result;
  console.log("=== 현재 네트워크 수수료 ===");
  console.log("기본 수수료 (drops):", fee.drops.base_fee);
  console.log("중간값 수수료 (drops):", fee.drops.median_fee);
  console.log("최소 수수료 (drops):", fee.drops.minimum_fee);
  console.log("열린 원장 수수료 (drops):", fee.drops.open_ledger_fee);
  console.log("");

  // drops를 XAH로 변환 (1 XAH = 1,000,000 drops)
  const baseFeeXAH = Number(fee.drops.base_fee) / 1_000_000;
  const medianFeeXAH = Number(fee.drops.median_fee) / 1_000_000;
  console.log("=== XAH 환산 ===");
  console.log("기본 수수료:", baseFeeXAH, "XAH");
  console.log("중간값 수수료:", medianFeeXAH, "XAH");
  console.log("");

  console.log("=== 원장 상태 ===");
  console.log("현재 원장:", fee.ledger_current_index);
  console.log("예상 부하 수준:", fee.levels.median_level);

  await client.disconnect();
}

checkNetworkFees();`,
            zh: `const { Client } = require("xahau");

async function checkNetworkFees() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  // fee 命令：显示当前网络手续费
  const feeResponse = await client.request({
    command: "fee"
  });

  const fee = feeResponse.result;
  console.log("=== 当前网络手续费 ===");
  console.log("基础手续费 (drops):", fee.drops.base_fee);
  console.log("中位数手续费 (drops):", fee.drops.median_fee);
  console.log("最低手续费 (drops):", fee.drops.minimum_fee);
  console.log("开放账本手续费 (drops):", fee.drops.open_ledger_fee);
  console.log("");

  // 将 drops 转换为 XAH（1 XAH = 1,000,000 drops）
  const baseFeeXAH = Number(fee.drops.base_fee) / 1_000_000;
  const medianFeeXAH = Number(fee.drops.median_fee) / 1_000_000;
  console.log("=== 换算为 XAH ===");
  console.log("基础手续费:", baseFeeXAH, "XAH");
  console.log("中位数手续费:", medianFeeXAH, "XAH");
  console.log("");

  console.log("=== 账本状态 ===");
  console.log("当前账本:", fee.ledger_current_index);
  console.log("预期负载级别:", fee.levels.median_level);

  await client.disconnect();
}

checkNetworkFees();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Quién opera los validadores?", en: "Who operates the validators?", jp: "誰がバリデーターを運営するのか？", ko: "검증자를 누가 운영하는가?", zh: "谁在运营验证者？" },
          content: {
            es: "La diversidad es clave para la seguridad:\n\n🏛️ Fundaciones del ecosistema\n🏢 Empresas que construyen sobre Xahau\n🎓 Universidades e instituciones\n👩‍💻 Desarrolladores independientes\n\nIndependientes, en distintas jurisdicciones\nSin requisito de staking",
            en: "Diversity is key to security:\n\n🏛️ Ecosystem foundations\n🏢 Companies building on Xahau\n🎓 Universities and institutions\n👩‍💻 Independent developers\n\nIndependent, in different jurisdictions\nNo staking requirement",
            jp: "多様性がセキュリティの鍵：\n\n🏛️ エコシステムの財団\n🏢 Xahau上に構築する企業\n🎓 大学と機関\n👩‍💻 独立した開発者\n\n異なる管轄区域で独立\nステーキング要件なし",
            ko: "다양성이 보안의 핵심:\n\n🏛️ 생태계 재단\n🏢 Xahau에서 개발하는 기업\n🎓 대학 및 기관\n👩‍💻 독립 개발자\n\n서로 다른 관할 구역에서 독립적\n스테이킹 요건 없음",
            zh: "多样性是安全的关键：\n\n🏛️ 生态系统基金会\n🏢 在 Xahau 上开发的企业\n🎓 大学及机构\n👩‍💻 独立开发者\n\n在不同司法管辖区独立运营\n无质押要求",
          },
          visual: "🌐",
        },
        {
          title: { es: "Enmiendas: gobernanza descentralizada", en: "Amendments: decentralized governance", jp: "エンメントメント：分散型ガバナンス", ko: "수정안: 탈중앙화 거버넌스", zh: "修正案：去中心化治理" },
          content: {
            es: "Las actualizaciones del protocolo\nse votan de forma descentralizada:\n\n1. Se propone un cambio (amendment)\n2. Los validadores votan a favor o en contra\n3. 80% de apoyo durante 5 días\n4. Se activa automáticamente\n5. Es permanente e irreversible",
            en: "Protocol updates\nare voted on in a decentralized way:\n\n1. A change is proposed (amendment)\n2. Validators vote for or against\n3. 80% support for 5 days\n4. It is activated automatically\n5. It is permanent and irreversible",
            jp: "プロトコルの更新は\n分散型の方法で投票される：\n\n1. 変更（エンメントメント）を提案する\n2. バリデーターが賛否を投票する\n3. 5日間、80%の支持を得る\n4. 自動的にアクティベートされる\n5. 永続的かつ不可逆",
            ko: "프로토콜 업데이트는\n탈중앙화 방식으로 투표:\n\n1. 변경(수정안)이 제안됨\n2. 검증자들이 찬성 또는 반대 투표\n3. 5일 동안 80% 지지\n4. 자동으로 활성화\n5. 영구적이고 불가역적",
            zh: "协议更新以去中心化方式进行投票：\n\n1. 提出一项变更（修正案）\n2. 验证者投赞成或反对票\n3. 连续 5 天获 80% 支持\n4. 自动激活\n5. 永久且不可逆",
          },
          visual: "🗳️",
        },
        {
          title: { es: "Midiendo la descentralización", en: "Measuring decentralization", jp: "分散化の測定", ko: "탈중앙화 측정", zh: "衡量去中心化程度" },
          content: {
            es: "Métricas clave:\n\n📊 Coeficiente Nakamoto (mín. entidades para atacar)\n🌍 Distribución geográfica\n🏛️ Diversidad de operadores\n☁️ Diversidad de infraestructura\n🔗 Solapamiento de UNLs\n\nMás diversidad = más seguridad",
            en: "Key metrics:\n\n📊 Nakamoto Coefficient (min. entities to attack)\n🌍 Geographic distribution\n🏛️ Operator diversity\n☁️ Infrastructure diversity\n🔗 UNL overlap\n\nMore diversity = more security",
            jp: "主要な指標：\n\n📊 中本係数（攻撃に必要な最小エンティティ数）\n🌍 地理的分布\n🏛️ オペレーターの多様性\n☁️ インフラの多様性\n🔗 UNLの重複\n\nより多様性 = より高いセキュリティ",
            ko: "핵심 지표:\n\n📊 나카모토 계수 (공격에 필요한 최소 기관 수)\n🌍 지리적 분포\n🏛️ 운영자 다양성\n☁️ 인프라 다양성\n🔗 UNL 중복\n\n더 많은 다양성 = 더 높은 보안",
            zh: "关键指标：\n\n📊 中本系数（攻击所需的最少实体数）\n🌍 地理分布\n🏛️ 运营商多样性\n☁️ 基础设施多样性\n🔗 UNL 重叠度\n\n越多样性 = 越高安全性",
          },
          visual: "📊",
        },
      ],
    },
  ],
}
