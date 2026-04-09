export default {
  id: "m2",
  icon: "🤝",
  title: {
    es: "Cómo funciona el consenso en una blockchain",
    en: "How consensus works in a blockchain",
    jp: "ブロックチェーンにおけるコンセンサスの仕組み",
  },
  lessons: [
    {
      id: "m2l1",
      title: {
        es: "Mecanismos de consenso",
        en: "Consensus mechanisms",
        jp: "コンセンサスメカニズム",
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
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar el estado de los validadores",
            en: "Query the validator status",
            jp: "バリデーターのステータスを照会する",
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
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es el consenso?", en: "What is consensus?", jp: "コンセンサスとは？" },
          content: {
            es: "El mecanismo por el cual los nodos\nacuerdan el estado válido del ledger\n\n• Sin consenso, no hay blockchain\n• Resuelve el problema de la confianza\n• Cada red usa un mecanismo diferente",
            en: "The mechanism by which nodes\nagree on the valid state of the ledger\n\n• Without consensus, there is no blockchain\n• Solves the trust problem\n• Each network uses a different mechanism",
            jp: "ノードがレジャーの有効な状態に\n合意するメカニズム\n\n• コンセンサスなくしてブロックチェーンは存在しない\n• 信頼の問題を解決する\n• ネットワークごとに異なるメカニズムを使用",
          },
          visual: "🤝",
        },
        {
          title: { es: "PoW vs PoS vs Federated", en: "PoW vs PoS vs Federated", jp: "PoW vs PoS vs 連合型コンセンサス" },
          content: {
            es: "⛏️ PoW → Minería (Bitcoin)\n💰 PoS → Staking (Ethereum)\n🗳️ Federado → Votación (Xahau)\n\nXahau: sin minería, sin staking\nFinalidad determinística en segundos",
            en: "⛏️ PoW → Mining (Bitcoin)\n💰 PoS → Staking (Ethereum)\n🗳️ Federated → Voting (Xahau)\n\nXahau: no mining, no staking\nDeterministic finality in seconds",
            jp: "⛏️ PoW → マイニング（Bitcoin）\n💰 PoS → ステーキング（Ethereum）\n🗳️ 連合型コンセンサス → 投票（Xahau）\n\nXahau：マイニングなし、ステーキングなし\n数秒での決定論的なファイナリティ",
          },
          visual: "⚡",
        },
        {
          title: { es: "¿Por qué consenso federado?", en: "Why federated consensus?", jp: "なぜ連合型コンセンサスなのか？" },
          content: {
            es: "Xahau eligió consenso federado por:\n\n• Velocidad → Finalidad en 3-5 segundos\n• Eficiencia energética → Sin minería costosa\n• Finalidad determinística → Sin reorgs ni forks\n• Sin barreras económicas → No requiere staking\n• Confianza distribuida → Validadores diversos\n\nIdeal para pagos y aplicaciones financieras",
            en: "Xahau chose federated consensus for:\n\n• Speed → Finality in 3-5 seconds\n• Energy efficiency → No costly mining\n• Deterministic finality → No reorgs or forks\n• No economic barriers → No staking required\n• Distributed trust → Diverse validators\n\nIdeal for payments and financial applications",
            jp: "Xahauが連合型コンセンサスを選んだ理由：\n\n• 速度 → 3〜5秒でのファイナリティ\n• エネルギー効率 → コストのかかるマイニング不要\n• 決定論的なファイナリティ → 再編成やフォークなし\n• 経済的障壁なし → ステーキング不要\n• 分散した信頼 → 多様なバリデーター\n\n支払いと金融アプリケーションに最適",
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
      },
      codeBlocks: [
        {
          title: {
            es: "Monitorizar el cierre de ledgers en tiempo real",
            en: "Monitor ledger closing in real time",
            jp: "レジャーのクローズをリアルタイムで監視する",
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
          },
        },
      ],
      slides: [
        {
          title: { es: "UNL: Unique Node List", en: "UNL: Unique Node List", jp: "UNL：ユニークノードリスト" },
          content: {
            es: "Cada nodo tiene una lista de validadores\nen los que confía (UNL)\n\n• Los validadores proponen transacciones\n• Votan en múltiples rondas\n• 80% de acuerdo → Ledger validado\n• Finalidad en 3-5 segundos",
            en: "Each node has a list of validators\nthat it trusts (UNL)\n\n• Validators propose transactions\n• They vote in multiple rounds\n• 80% agreement → Validated ledger\n• Finality in 3-5 seconds",
            jp: "各ノードは信頼するバリデーターの\nリスト（UNL）を持つ\n\n• バリデーターがトランザクションを提案する\n• 複数のラウンドで投票する\n• 80%の合意 → レジャーが検証される\n• 3〜5秒での最終性",
          },
          visual: "🗳️",
        },
        {
          title: { es: "Propiedades del consenso", en: "Consensus properties", jp: "コンセンサスの特性" },
          content: {
            es: "✅ Finalidad determinística (sin reorgs)\n✅ Cierre cada 3-5 segundos\n✅ Sin minería ni staking\n✅ Bajo consumo energético\n✅ Tolerante a fallos (80% quorum)",
            en: "✅ Deterministic finality (no reorgs)\n✅ Closes every 3-5 seconds\n✅ No mining or staking\n✅ Low energy consumption\n✅ Fault tolerant (80% quorum)",
            jp: "✅ 決定論的な最終性（再編成なし）\n✅ 3〜5秒ごとにクローズ\n✅ マイニングもステーキングも不要\n✅ 低エネルギー消費\n✅ 障害耐性あり（80%クォーラム）",
          },
          visual: "🛡️",
        },
        {
          title: { es: "Las 5 fases del consenso", en: "The 5 phases of consensus", jp: "コンセンサスの5つのフェーズ" },
          content: {
            es: "1️⃣ Propuesta → Validadores proponen transacciones\n2️⃣ Votación → Comparan propuestas con su UNL\n3️⃣ Convergencia → Varias rondas hasta coincidir\n4️⃣ Validación → 80% de acuerdo en la UNL\n5️⃣ Cierre → Nuevo ledger oficial e irreversible\n\nTodo el proceso tarda 3-5 segundos",
            en: "1️⃣ Proposal → Validators propose transactions\n2️⃣ Voting → Compare proposals with their UNL\n3️⃣ Convergence → Multiple rounds until agreement\n4️⃣ Validation → 80% agreement in the UNL\n5️⃣ Closing → New official and irreversible ledger\n\nThe entire process takes 3-5 seconds",
            jp: "1️⃣ 提案 → バリデーターがトランザクションを提案する\n2️⃣ 投票 → UNLの提案と比較する\n3️⃣ 収束 → 合意するまで複数ラウンド繰り返す\n4️⃣ 検証 → UNLの80%が合意する\n5️⃣ クローズ → 新しい公式かつ不可逆のレジャー\n\nプロセス全体は3〜5秒",
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
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "El Problema de los Generales Bizantinos", en: "The Byzantine Generals Problem", jp: "ビザンチン将軍問題" },
          content: {
            es: "Generales deben coordinar un ataque\npero algunos pueden ser traidores\n\nEn blockchain:\n🏛️ Generales = Validadores\n📨 Mensajes = Propuestas de transacciones\n🦹 Traidores = Nodos maliciosos\n\nBFT = funcionar correctamente\nincluso con actores maliciosos",
            en: "Generals must coordinate an attack\nbut some may be traitors\n\nIn blockchain:\n🏛️ Generals = Validators\n📨 Messages = Transaction proposals\n🦹 Traitors = Malicious nodes\n\nBFT = functioning correctly\neven with malicious actors",
            jp: "将軍たちは攻撃を調整しなければならないが\n一部は裏切り者かもしれない\n\nブロックチェーンでは：\n🏛️ 将軍 = バリデーター\n📨 メッセージ = トランザクションの提案\n🦹 裏切り者 = 悪意のあるノード\n\nBFT = 悪意のある行為者がいても\n正しく機能すること",
          },
          visual: "🏛️",
        },
        {
          title: { es: "Xahau y la tolerancia a fallos", en: "Xahau and fault tolerance", jp: "Xahauと障害耐性" },
          content: {
            es: "Xahau tolera hasta 20% de fallos\n\n• 80% de la UNL debe estar de acuerdo\n• Validador caído → los demás continúan\n• Validador malicioso → es ignorado\n• Sin consenso → el ledger no se cierra\n  (nunca se fuerza un resultado parcial)",
            en: "Xahau tolerates up to 20% failures\n\n• 80% of the UNL must agree\n• Downed validator → the others continue\n• Malicious validator → it is ignored\n• No consensus → the ledger does not close\n  (a partial result is never forced)",
            jp: "Xahauは最大20%の障害を許容する\n\n• UNLの80%が合意しなければならない\n• ダウンしたバリデーター → 他が続行する\n• 悪意のあるバリデーター → 無視される\n• コンセンサスなし → レジャーはクローズしない\n  （部分的な結果は強制されない）",
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
3. Si una enmienda recibe apoyo del **80% de los validadores** durante **2 semanas consecutivas**, se activa automáticamente
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
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar server_info y campos de validadores",
            en: "Query server_info and validator fields",
            jp: "server_infoとバリデーターフィールドを照会する",
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
          },
        },
        {
          title: {
            es: "Consultar las tarifas actuales de la red",
            en: "Query current network fees",
            jp: "現在のネットワーク手数料を照会する",
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
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Quién opera los validadores?", en: "Who operates the validators?", jp: "誰がバリデーターを運営するのか？" },
          content: {
            es: "La diversidad es clave para la seguridad:\n\n🏛️ Fundaciones del ecosistema\n🏢 Empresas que construyen sobre Xahau\n🎓 Universidades e instituciones\n👩‍💻 Desarrolladores independientes\n\nIndependientes, en distintas jurisdicciones\nSin requisito de staking",
            en: "Diversity is key to security:\n\n🏛️ Ecosystem foundations\n🏢 Companies building on Xahau\n🎓 Universities and institutions\n👩‍💻 Independent developers\n\nIndependent, in different jurisdictions\nNo staking requirement",
            jp: "多様性がセキュリティの鍵：\n\n🏛️ エコシステムの財団\n🏢 Xahau上に構築する企業\n🎓 大学と機関\n👩‍💻 独立した開発者\n\n異なる管轄区域で独立\nステーキング要件なし",
          },
          visual: "🌐",
        },
        {
          title: { es: "Enmiendas: gobernanza descentralizada", en: "Amendments: decentralized governance", jp: "エンメントメント：分散型ガバナンス" },
          content: {
            es: "Las actualizaciones del protocolo\nse votan de forma descentralizada:\n\n1. Se propone un cambio (amendment)\n2. Los validadores votan a favor o en contra\n3. 80% de apoyo durante 2 semanas\n4. Se activa automáticamente\n5. Es permanente e irreversible",
            en: "Protocol updates\nare voted on in a decentralized way:\n\n1. A change is proposed (amendment)\n2. Validators vote for or against\n3. 80% support for 5 days\n4. It is activated automatically\n5. It is permanent and irreversible",
            jp: "プロトコルの更新は\n分散型の方法で投票される：\n\n1. 変更（エンメントメント）を提案する\n2. バリデーターが賛否を投票する\n3. 5日間、80%の支持を得る\n4. 自動的にアクティベートされる\n5. 永続的かつ不可逆",
          },
          visual: "🗳️",
        },
        {
          title: { es: "Midiendo la descentralización", en: "Measuring decentralization", jp: "分散化の測定" },
          content: {
            es: "Métricas clave:\n\n📊 Coeficiente Nakamoto (mín. entidades para atacar)\n🌍 Distribución geográfica\n🏛️ Diversidad de operadores\n☁️ Diversidad de infraestructura\n🔗 Solapamiento de UNLs\n\nMás diversidad = más seguridad",
            en: "Key metrics:\n\n📊 Nakamoto Coefficient (min. entities to attack)\n🌍 Geographic distribution\n🏛️ Operator diversity\n☁️ Infrastructure diversity\n🔗 UNL overlap\n\nMore diversity = more security",
            jp: "主要な指標：\n\n📊 中本係数（攻撃に必要な最小エンティティ数）\n🌍 地理的分布\n🏛️ オペレーターの多様性\n☁️ インフラの多様性\n🔗 UNLの重複\n\nより多様性 = より高いセキュリティ",
          },
          visual: "📊",
        },
      ],
    },
  ],
}
