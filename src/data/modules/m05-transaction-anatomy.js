const moduleData = {
  id: "m5b",
  icon: "🔬",
  title: {
    es: "Anatomía de una transacción",
    pt: "Anatomia de uma transação",
    en: "Anatomy of a transaction",
    jp: "トランザクションの解剖",
    ko: "트랜잭션 해부",
    zh: "交易剖析",
  },
  lessons: [
    {
      id: "m5bl1",
      title: {
        es: "Ciclo de vida de una transacción",
        pt: "Ciclo de vida de uma transação",
        en: "Lifecycle of a transaction",
        jp: "トランザクションのライフサイクル",
        ko: "트랜잭션의 생명주기",
        zh: "交易生命周期",
      },
      theory: {
        es: `Antes de profundizar en tokens, NFTs o smart contracts, es fundamental entender **cómo funciona una transacción de principio a fin** en Xahau. Este conocimiento te ayudará a diagnosticar problemas y construir aplicaciones robustas.

### El flujo completo

Una transacción en Xahau pasa por **5 fases** desde que la creas hasta que queda registrada permanentemente en el ledger:

1. **Construir**: Defines los campos de la transacción (tipo, origen, destino, cantidad, etc.)
2. **Preparar (autofill)**: El cliente rellena automáticamente campos técnicos (Fee, Sequence, LastLedgerSequence, NetworkID)
3. **Firmar**: Tu clave privada genera una firma criptográfica que demuestra que autorizas la transacción
4. **Enviar**: La transacción firmada se envía a un nodo de la red
5. **Validar**: Los validadores la incluyen en un ledger mediante consenso y el resultado es final

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
        pt: `Antes de se aprofundar em tokens, NFTs ou smart contracts, é fundamental entender **como funciona uma transação do início ao fim** na Xahau. Esse conhecimento ajudará você a diagnosticar problemas e construir aplicações robustas.
### O fluxo completo
Uma transação na Xahau passa por **5 fases** desde que você a cria até ela ficar registrada permanentemente no ledger:
1. **Construir**: Você define os campos da transação (tipo, origem, destino, quantidade, etc.)
2. **Preparar (autofill)**: O cliente preenche automaticamente campos técnicos (Fee, Sequence, LastLedgerSequence, NetworkID)
3. **Assinar**: Sua chave privada gera uma assinatura criptográfica que demonstra que você autoriza a transação
4. **Enviar**: A transação assinada é enviada a um nó da rede
5. **Validar**: Os validadores a incluem em um ledger por meio de consenso e o resultado é final
### Fase 1: Construir
Você define um objeto JavaScript com os campos da transação:
\`\`\`
const tx = {
  TransactionType: "Payment",
  Account: "rOrigem...",
  Destination: "rDestino...",
  Amount: "1000000",
};
\`\`\`
Você só precisa dos campos **essenciais**. Os campos técnicos são preenchidos automaticamente na fase seguinte.
### Fase 2: Preparar (autofill)
O método \`client.autofill(tx)\` consulta o nó e preenche os campos ausentes:
- **Fee**: O custo da transação (em drops). É calculado de acordo com a carga atual da rede
- **Sequence**: O número de sequência da sua conta (incrementa a cada transação)
- **LastLedgerSequence**: O ledger máximo em que a transação pode ser incluída (proteção contra transações "fantasma")
- **NetworkID**: Identificador da rede (testnet vs mainnet)
### Fase 3: Assinar
O método \`wallet.sign(prepared)\` gera:
- Uma **assinatura digital** usando sua chave privada (ed25519 ou secp256k1)
- O **tx_blob**: a transação serializada em formato hexadecimal, pronta para enviar
A assinatura demonstra que **você e somente você** autorizou esta transação. Ninguém pode modificar a transação depois de assinada sem invalidar a assinatura.
### Fase 4: Enviar
A transação assinada é enviada ao nó com \`client.submit(tx_blob)\` ou \`client.submitAndWait(tx_blob)\`:
- **submit**: Envia e retorna o resultado preliminar imediatamente
- **submitAndWait**: Envia e **espera** até que a transação seja validada ou rejeitada
O nó a propaga para outros nós da rede.
### Fase 5: Validar (Consenso)
Os validadores da rede decidem se incluem a transação no próximo ledger:
1. A transação chega às **filas dos validadores**
2. Os validadores propõem incluí-la no próximo ledger
3. Se ao menos **80% da UNL** estão de acordo, ela é incluída
4. O ledger é fechado e o resultado é **final e irreversível**
### Quanto tempo leva?
O tempo entre enviar e validar é normalmente de **3 a 5 segundos**, o tempo que um ledger leva para fechar na Xahau. Não há blocos de 10 minutos como em Bitcoin nem tempos de confirmação variáveis.
### Finality: resultados irreversíveis
Diferentemente de blockchains com finalidade probabilística (Bitcoin, Ethereum), na Xahau o resultado é **determinístico**:
- Se uma transação é incluída em um ledger validado, é **final**
- Não há reorgs, nem forks, nem "confirmações pendentes"
- \`tesSUCCESS\` = sucesso garantido, para sempre`,
        en: `Before diving into tokens, NFTs, or smart contracts, it is essential to understand **how a transaction works from start to finish** in Xahau. This knowledge will help you diagnose issues and build robust applications.

### The complete flow

A transaction in Xahau goes through **5 phases** from the moment you create it until it is permanently recorded in the ledger:

1. **Build**: You define the transaction fields (type, source, destination, amount, etc.)
2. **Prepare (autofill)**: The client automatically fills in technical fields (Fee, Sequence, LastLedgerSequence, NetworkID)
3. **Sign**: Your private key generates a cryptographic signature proving you authorize the transaction
4. **Submit**: The signed transaction is sent to a network node
5. **Validate**: Validators include it in a ledger through consensus and the result is final

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
        jp: `トークン、NFT、スマートコントラクトに深入りする前に、Xahauにおける**トランザクションが最初から最後までどのように機能するか**を理解することが重要です。この知識は、問題の診断と堅牢なアプリケーションの構築に役立ちます。

### 完全なフロー

Xahauのトランザクションは、作成されてからレジャーに永久に記録されるまで、**5つのフェーズ**を経ます。

1. **構築（Build）**: トランザクションのフィールドを定義します（タイプ、送信元、宛先、金額など）
2. **準備（autofill）**: クライアントが技術的フィールドを自動的に埋めます（Fee、Sequence、LastLedgerSequence、NetworkID）
3. **署名（Sign）**: 秘密鍵がトランザクションを認可したことを証明する暗号署名を生成します
4. **送信（Submit）**: 署名済みトランザクションをネットワークノードに送信します
5. **検証（Validate）**: バリデーターがコンセンサスによりレジャーに含め、結果は最終的なものになります

### フェーズ1：構築

トランザクションのフィールドを含むJavaScriptオブジェクトを定義します。

\`\`\`
const tx = {
  TransactionType: "Payment",
  Account: "rSource...",
  Destination: "rDestination...",
  Amount: "1000000",
};
\`\`\`

**必須フィールド**だけが必要です。技術的フィールドは次のフェーズで自動的に埋められます。

### フェーズ2：準備（autofill）

\`client.autofill(tx)\`メソッドがノードに問い合わせて不足しているフィールドを埋めます。

- **Fee**: トランザクションコスト（drops単位）。現在のネットワーク負荷に基づいて計算されます
- **Sequence**: アカウントのシーケンス番号（トランザクションを送信するごとに増加）
- **LastLedgerSequence**: トランザクションを含められる最大レジャー番号（「ゴースト」トランザクションからの保護）
- **NetworkID**: ネットワーク識別子（testnet/mainnetなど）

### フェーズ3：署名

\`wallet.sign(prepared)\`メソッドが以下を生成します：
- **デジタル署名**：秘密鍵（ed25519またはsecp256k1）を使用
- **tx_blob**：16進数形式でシリアライズされたトランザクション（送信可能な状態）

署名は、**あなただけが**このトランザクションを認可したことを証明します。署名後にトランザクションを変更すると署名が無効になります。

### フェーズ4：送信

署名済みトランザクションは\`client.submit(tx_blob)\`または\`client.submitAndWait(tx_blob)\`でノードに送信されます：

- **submit**：送信して即座に暫定結果を返します
- **submitAndWait**：送信して、トランザクションが検証または拒否されるまで**待機**します

ノードは他のネットワークノードにトランザクションを伝播します。

### フェーズ5：検証（コンセンサス）

ネットワークバリデーターが次のレジャーにトランザクションを含めるか決定します：

1. トランザクションが**バリデーターのキュー**に届きます
2. バリデーターが次のレジャーへの組み込みを提案します
3. **UNLの80%以上**が合意すると、組み込まれます
4. レジャーが閉じられ、結果は**最終的かつ不可逆**です

### 処理にはどのくらいの時間がかかる？

送信から検証まで、通常**3〜5秒**かかります。これはXahauでレジャーが閉じるまでの時間です。ビットコインの10分ブロックや可変確認時間はありません。

### ファイナリティ：不可逆の結果

確率的なファイナリティを持つブロックチェーン（ビットコイン、イーサリアム）とは異なり、Xahauの結果は**決定論的**です：
- 検証済みレジャーに含まれたトランザクションは**最終的**です
- リオーグなし、フォークなし、「保留中の確認」なし
- \`tesSUCCESS\` = 永遠に保証された成功`,
        ko: `토큰, NFT, 스마트 컨트랙트를 깊게 보기 전에, Xahau에서 **트랜잭션이 처음부터 끝까지 어떻게 동작하는지** 이해하는 것이 매우 중요합니다. 이 지식은 문제를 진단하고 안정적인 애플리케이션을 만드는 데 도움이 됩니다.

### 전체 흐름

Xahau의 트랜잭션은 생성된 순간부터 ledger에 영구 기록될 때까지 **5단계**를 거칩니다:

1. **구성(Build)**: 트랜잭션 필드(유형, 출발지, 목적지, 금액 등)를 정의합니다
2. **준비(autofill)**: 클라이언트가 기술 필드(Fee, Sequence, LastLedgerSequence, NetworkID)를 자동으로 채웁니다
3. **서명(Sign)**: 개인 키가 트랜잭션을 승인한다는 암호학적 서명을 생성합니다
4. **제출(Submit)**: 서명된 트랜잭션을 네트워크 노드로 보냅니다
5. **검증(Validate)**: 검증자들이 합의를 통해 ledger에 포함시키고 결과가 최종 확정됩니다

### 1단계: 구성

트랜잭션 필드를 가진 JavaScript 객체를 정의합니다:

\`\`\`
const tx = {
  TransactionType: "Payment",
  Account: "rSource...",
  Destination: "rDestination...",
  Amount: "1000000",
};
\`\`\`

**핵심 필드**만 있으면 됩니다. 기술 필드는 다음 단계에서 자동으로 채워집니다.

### 2단계: 준비(autofill)

\`client.autofill(tx)\` 메서드는 노드에 질의해 빠진 필드를 채웁니다:

- **Fee**: 트랜잭션 비용(drops 단위). 현재 네트워크 부하에 따라 계산됩니다
- **Sequence**: 계정의 시퀀스 번호(트랜잭션마다 증가)
- **LastLedgerSequence**: 트랜잭션이 포함될 수 있는 최대 ledger 번호("유령" 트랜잭션 방지)
- **NetworkID**: 네트워크 식별자(testnet vs mainnet)

### 3단계: 서명

\`wallet.sign(prepared)\` 메서드는 다음을 생성합니다:
- 개인 키(ed25519 또는 secp256k1)를 사용한 **디지털 서명**
- 전송 가능한 16진수 직렬화 트랜잭션인 **tx_blob**

이 서명은 **오직 본인만** 이 트랜잭션을 승인했다는 것을 증명합니다. 서명 뒤에 트랜잭션이 조금이라도 바뀌면 서명이 무효가 됩니다.

### 4단계: 제출

서명된 트랜잭션은 \`client.submit(tx_blob)\` 또는 \`client.submitAndWait(tx_blob)\`로 노드에 전송됩니다:

- **submit**: 즉시 전송하고 예비 결과를 반환
- **submitAndWait**: 전송 후 트랜잭션이 검증되거나 거부될 때까지 **대기**

노드는 이 트랜잭션을 다른 네트워크 노드로 전파합니다.

### 5단계: 검증(합의)

네트워크 검증자들이 다음 ledger에 트랜잭션을 포함할지 결정합니다:

1. 트랜잭션이 **검증자 큐**에 도착합니다
2. 검증자들이 다음 ledger에 포함하자고 제안합니다
3. **UNL의 최소 80%** 가 동의하면 포함됩니다
4. ledger가 닫히고 결과는 **최종적이며 되돌릴 수 없습니다**

### 얼마나 걸릴까?

전송부터 검증까지는 보통 **3~5초** 정도 걸립니다. 이것이 Xahau에서 ledger 하나가 닫히는 시간입니다. 비트코인처럼 10분 블록도 없고, 가변 확인 시간도 없습니다.

### 파이널리티: 되돌릴 수 없는 결과

확률적 finality를 가진 블록체인(비트코인, 이더리움)과 달리, Xahau의 결과는 **결정적**입니다:
- 검증된 ledger에 포함되면 그 트랜잭션은 **최종 결과**입니다
- reorg도, fork도, "확인 대기"도 없습니다
- \`tesSUCCESS\` = 영구적으로 성공`,
        zh: `在深入学习代币、NFT 或智能合约之前，先理解 Xahau 中**一笔交易从开始到结束是如何运作的**非常重要。这些知识能帮助你排查问题，并构建更稳健的应用。

### 完整流程

在 Xahau 中，一笔交易从创建到永久写入账本，会经历 **5 个阶段**：

1. **构建**：定义交易字段（类型、来源、目标、金额等）
2. **准备（autofill）**：客户端自动补全技术字段（Fee、Sequence、LastLedgerSequence、NetworkID）
3. **签名**：你的私钥生成加密签名，证明交易由你授权
4. **提交**：将已签名交易发送到网络节点
5. **验证**：验证者通过共识将其写入账本，结果成为最终结果

### 阶段 1：构建

你需要定义一个包含交易字段的 JavaScript 对象：

\`\`\`
const tx = {
  TransactionType: "Payment",
  Account: "rSource...",
  Destination: "rDestination...",
  Amount: "1000000",
};
\`\`\`

你只需要填写**核心字段**。技术字段会在下一阶段自动补全。

### 阶段 2：准备（autofill）

\`client.autofill(tx)\` 方法会查询节点并补上缺失字段：

- **Fee**：交易成本（以 drops 计）。根据当前网络负载计算
- **Sequence**：账户的序列号（每发出一笔交易就递增）
- **LastLedgerSequence**：交易可被纳入的最大账本序号（防止“幽灵交易”）
- **NetworkID**：网络标识符（testnet 与 mainnet）

### 阶段 3：签名

\`wallet.sign(prepared)\` 方法会生成：
- 使用私钥（ed25519 或 secp256k1）的**数字签名**
- **tx_blob**：序列化后的十六进制交易，可直接发送

这个签名证明**只有你本人**授权了这笔交易。签名后任何人都无法修改交易内容，否则签名会失效。

### 阶段 4：提交

已签名交易通过 \`client.submit(tx_blob)\` 或 \`client.submitAndWait(tx_blob)\` 提交到节点：

- **submit**：立即发送并返回初步结果
- **submitAndWait**：发送后**等待**交易被验证或拒绝

节点会把这笔交易传播给网络中的其他节点。

### 阶段 5：验证（共识）

网络验证者会决定是否将该交易纳入下一个账本：

1. 交易进入**验证者队列**
2. 验证者提议将其写入下一个账本
3. 如果至少 **80% 的 UNL** 同意，交易就会被纳入
4. 账本关闭，结果变为**最终且不可逆**

### 需要多久？

从提交到验证通常只需 **3 到 5 秒**，这正是 Xahau 关闭一个账本所需的时间。它不像 Bitcoin 那样有 10 分钟区块，也没有不稳定的确认时间。

### Finality：不可逆的结果

与采用概率最终性的区块链（Bitcoin、Ethereum）不同，Xahau 的结果是**确定性的**：
- 交易一旦进入已验证账本，就是**最终结果**
- 没有 reorg、没有分叉、也没有“等待确认”
- \`tesSUCCESS\` = 永久成功`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear .env con la semilla de tu wallet",
            pt: "Criar .env com a seed de sua wallet",
            en: "Create .env with your wallet seed",
            jp: "ウォレットのシードで.envを作成",
            ko: "지갑 시드로 .env 만들기",
            zh: "用钱包种子创建 .env",
          },
          language: "bash",
          code: {
            es: `#Visita https://xahau-test.net/wallet para crear una wallet de testnet y obtener su seed
#Crea un fichero ".env" en tu carpeta
WALLET_SEED=sTuSeed`,
            pt: `# Visite https://xahau-test.net/wallet para criar uma wallet de testnet e obter sua seed
# Crie um arquivo ".env" na sua pasta
WALLET_SEED=sSuaSeed`,
            en: `#Visit https://xahau-test.net/wallet to create a wallet on testnet y obtain your seed
#Create a ".env" file in your project folder
WALLET_SEED=sYourSeed`,
            jp: `#テストネットウォレットを作成してシードを取得するには https://xahau-test.net/wallet を訪問してください
#プロジェクトフォルダに".env"ファイルを作成してください
WALLET_SEED=sYourSeed`,
            ko: `# https://xahau-test.net/wallet 에서 testnet 지갑을 만들고 시드를 받으세요
# 프로젝트 폴더에 ".env" 파일을 만드세요
WALLET_SEED=sYourSeed`,
            zh: `# 访问 https://xahau-test.net/wallet 创建 testnet 钱包并获取种子
# 在项目文件夹中创建 ".env" 文件
WALLET_SEED=sYourSeed`,
          },
        },
        {
          title: {
            es: "El flujo completo paso a paso",
            pt: "O fluxo completo passo a passo",
            en: "The complete flow step by step",
            jp: "ステップバイステップの完全フロー",
            ko: "전체 흐름 단계별 보기",
            zh: "完整流程逐步演示",
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

  console.log("2. Transacción preparada (autofill):");
  console.log("   Fee:", prepared.Fee, "drops");
  console.log("   Sequence:", prepared.Sequence);
  console.log("   LastLedgerSequence:", prepared.LastLedgerSequence);
  console.log("   NetworkID:", prepared.NetworkID);
  console.log("   Campos totales:", Object.keys(prepared).length);

  // =============================================
  // FASE 3: Firmar
  // =============================================
  const signed = wallet.sign(prepared);

  console.log("3. Transacción firmada:");
  console.log("   Hash:", signed.hash);
  console.log("   tx_blob (primeros 60 chars):", signed.tx_blob.substring(0, 60) + "...");
  console.log("   Longitud del blob:", signed.tx_blob.length, "caracteres hex");

  // =============================================
  // FASE 4: Enviar
  // =============================================
  console.log("4. Enviando al nodo...");
  const result = await client.submitAndWait(signed.tx_blob);

  // =============================================
  // FASE 5: Resultado validado
  // =============================================
  console.log("5. Resultado validado:");
  console.log("   TransactionResult:", result.result.meta.TransactionResult);
  console.log("   Ledger:", result.result.ledger_index);
  console.log("   Nodos afectados:", result.result.meta.AffectedNodes.length);

  await client.disconnect();
}

flujoCompleto().catch(console.error);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function flujoCompleto() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // =============================================
  // FASE 1: Construir a transação
  // =============================================
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rMXEZJecFdn1dVtE21pZ8duZz2E36KGaCp",
    Amount: "5000000", // 5 XAH em drops
  };
  console.log("1. Transação construída:");
  console.log("   Tipo:", tx.TransactionType);
  console.log("   Campos definidos:", Object.keys(tx).length);
  // =============================================
  // FASE 2: Preparar (autofill)
  // =============================================
  const prepared = await client.autofill(tx);
  console.log("2. Transação preparada (autofill):");
  console.log("   Fee:", prepared.Fee, "drops");
  console.log("   Sequence:", prepared.Sequence);
  console.log("   LastLedgerSequence:", prepared.LastLedgerSequence);
  console.log("   NetworkID:", prepared.NetworkID);
  console.log("   Campos totais:", Object.keys(prepared).length);
  // =============================================
  // FASE 3: Assinar
  // =============================================
  const signed = wallet.sign(prepared);
  console.log("3. Transação assinada:");
  console.log("   Hash:", signed.hash);
  console.log("   tx_blob (primeiroos 60 chars):", signed.tx_blob.substring(0, 60) + "...");
  console.log("   Longitud do blob:", signed.tx_blob.length, "caracteres hex");
  // =============================================
  // FASE 4: Enviar
  // =============================================
  console.log("4. Enviando ao nó...");
  const result = await client.submitAndWait(signed.tx_blob);
  // =============================================
  // FASE 5: Resultado validado
  // =============================================
  console.log("5. Resultado validado:");
  console.log("   TransactionResult:", result.result.meta.TransactionResult);
  console.log("   Ledger:", result.result.ledger_index);
  console.log("   Nós afectados:", result.result.meta.AffectedNodes.length);
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

  console.log("2. Transacción preparada (autofill):");
  console.log("   Fee:", prepared.Fee, "drops");
  console.log("   Sequence:", prepared.Sequence);
  console.log("   LastLedgerSequence:", prepared.LastLedgerSequence);
  console.log("   NetworkID:", prepared.NetworkID);
  console.log("   Total fields:", Object.keys(prepared).length);

  // =============================================
  // PHASE 3: Sign
  // =============================================
  const signed = wallet.sign(prepared);

  console.log("3. Transacción firmada:");
  console.log("   Hash:", signed.hash);
  console.log("   tx_blob (first 60 chars):", signed.tx_blob.substring(0, 60) + "...");
  console.log("   Blob length:", signed.tx_blob.length, "caracteres hex");

  // =============================================
  // PHASE 4: Submit
  // =============================================
  console.log("4. Enviando al nodo...");
  const result = await client.submitAndWait(signed.tx_blob);

  // =============================================
  // PHASE 5: Validated result
  // =============================================
  console.log("5. Resultado validado:");
  console.log("   TransactionResult:", result.result.meta.TransactionResult);
  console.log("   Ledger:", result.result.ledger_index);
  console.log("   Affected nodes:", result.result.meta.AffectedNodes.length);

  await client.disconnect();
}

flujoCompleto().catch(console.error);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function completeFlow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // =============================================
  // フェーズ1：トランザクションの構築
  // =============================================
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rMXEZJecFdn1dVtE21pZ8duZz2E36KGaCp",
    Amount: "5000000", // 5 XAH（drops単位）
  };

  console.log("1. トランザクション構築完了：");
  console.log("   タイプ：", tx.TransactionType);
  console.log("   定義フィールド数：", Object.keys(tx).length);

  // =============================================
  // フェーズ2：準備（autofill）
  // =============================================
  const prepared = await client.autofill(tx);

  console.log("2. トランザクション準備完了（autofill）：");
  console.log("   Fee：", prepared.Fee, "drops");
  console.log("   Sequence：", prepared.Sequence);
  console.log("   LastLedgerSequence：", prepared.LastLedgerSequence);
  console.log("   NetworkID：", prepared.NetworkID);
  console.log("   総フィールド数：", Object.keys(prepared).length);

  // =============================================
  // フェーズ3：署名
  // =============================================
  const signed = wallet.sign(prepared);

  console.log("3. トランザクション署名完了：");
  console.log("   ハッシュ：", signed.hash);
  console.log("   tx_blob（最初の60文字）：", signed.tx_blob.substring(0, 60) + "...");
  console.log("   blob長：", signed.tx_blob.length, "16進数文字");

  // =============================================
  // フェーズ4：送信
  // =============================================
  console.log("4. ノードに送信中...");
  const result = await client.submitAndWait(signed.tx_blob);

  // =============================================
  // フェーズ5：検証済み結果
  // =============================================
  console.log("5. 検証済み結果：");
  console.log("   TransactionResult：", result.result.meta.TransactionResult);
  console.log("   レジャー：", result.result.ledger_index);
  console.log("   影響ノード数：", result.result.meta.AffectedNodes.length);

  await client.disconnect();
}

completeFlow().catch(console.error);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function completeFlow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // =============================================
  // 1단계: 트랜잭션 구성
  // =============================================
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rMXEZJecFdn1dVtE21pZ8duZz2E36KGaCp",
    Amount: "5000000", // 5 XAH in drops
  };

  console.log("1. 트랜잭션 구성 완료:");
  console.log("   유형:", tx.TransactionType);
  console.log("   정의된 필드 수:", Object.keys(tx).length);

  // =============================================
  // 2단계: 준비 (autofill)
  // =============================================
  const prepared = await client.autofill(tx);

  console.log("2. 트랜잭션 준비 완료 (autofill):");
  console.log("   Fee:", prepared.Fee, "drops");
  console.log("   Sequence:", prepared.Sequence);
  console.log("   LastLedgerSequence:", prepared.LastLedgerSequence);
  console.log("   NetworkID:", prepared.NetworkID);
  console.log("   전체 필드 수:", Object.keys(prepared).length);

  // =============================================
  // 3단계: 서명
  // =============================================
  const signed = wallet.sign(prepared);

  console.log("3. 트랜잭션 서명 완료:");
  console.log("   Hash:", signed.hash);
  console.log("   tx_blob (앞 60글자):", signed.tx_blob.substring(0, 60) + "...");
  console.log("   blob 길이:", signed.tx_blob.length, "hex 문자");

  // =============================================
  // 4단계: 제출
  // =============================================
  console.log("4. 노드로 전송 중...");
  const result = await client.submitAndWait(signed.tx_blob);

  // =============================================
  // 5단계: 검증 결과
  // =============================================
  console.log("5. 검증된 결과:");
  console.log("   TransactionResult:", result.result.meta.TransactionResult);
  console.log("   Ledger:", result.result.ledger_index);
  console.log("   영향 받은 노드 수:", result.result.meta.AffectedNodes.length);

  await client.disconnect();
}

completeFlow().catch(console.error);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function completeFlow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // =============================================
  // 第 1 阶段：构建交易
  // =============================================
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rMXEZJecFdn1dVtE21pZ8duZz2E36KGaCp",
    Amount: "5000000", // 5 XAH（单位：drops）
  };

  console.log("1. 交易已构建：");
  console.log("   类型：", tx.TransactionType);
  console.log("   已定义字段数：", Object.keys(tx).length);

  // =============================================
  // 第 2 阶段：准备（autofill）
  // =============================================
  const prepared = await client.autofill(tx);

  console.log("2. 交易已准备完成（autofill）：");
  console.log("   Fee：", prepared.Fee, "drops");
  console.log("   Sequence：", prepared.Sequence);
  console.log("   LastLedgerSequence：", prepared.LastLedgerSequence);
  console.log("   NetworkID：", prepared.NetworkID);
  console.log("   总字段数：", Object.keys(prepared).length);

  // =============================================
  // 第 3 阶段：签名
  // =============================================
  const signed = wallet.sign(prepared);

  console.log("3. 交易已签名：");
  console.log("   Hash：", signed.hash);
  console.log("   tx_blob（前 60 个字符）：", signed.tx_blob.substring(0, 60) + "...");
  console.log("   blob 长度：", signed.tx_blob.length, "个十六进制字符");

  // =============================================
  // 第 4 阶段：提交
  // =============================================
  console.log("4. 正在发送到节点...");
  const result = await client.submitAndWait(signed.tx_blob);

  // =============================================
  // 第 5 阶段：验证结果
  // =============================================
  console.log("5. 已验证结果：");
  console.log("   TransactionResult：", result.result.meta.TransactionResult);
  console.log("   Ledger：", result.result.ledger_index);
  console.log("   受影响节点数：", result.result.meta.AffectedNodes.length);

  await client.disconnect();
}

completeFlow().catch(console.error);`,
          },
        },
      ],
      slides: [
        {
          title: { es: "5 fases de una transacción", pt: "5 fases de uma transação", en: "5 phases of a transaction", jp: "トランザクションの5フェーズ", ko: "트랜잭션의 5단계", zh: "交易的 5 个阶段" },
          content: {
            es: "1. Construir → Definir campos (tipo, origen, destino)\n2. Preparar → autofill (Fee, Sequence, NetworkID)\n3. Firmar → Firma digital con clave privada\n4. Enviar → submit / submitAndWait\n5. Validar → Consenso → Resultado final",
            pt: "1. Construir → Definir campos (tipo, origem, destino)\n2. Preparar → autofill (Fee, Sequence, NetworkID)\n3. Assinar → Assinatura digital com chave privada\n4. Enviar → submit / submitAndWait\n5. Validar → Consenso → Resultado final",
            en: "1. Build → Define fields (type, source, destination)\n2. Prepare → autofill (Fee, Sequence, NetworkID)\n3. Sign → Digital signature with private key\n4. Submit → submit / submitAndWait\n5. Validate → Consensus → Final result",
            jp: "1. 構築 → フィールド定義（タイプ、送信元、宛先）\n2. 準備 → autofill（Fee、Sequence、NetworkID）\n3. 署名 → 秘密鍵でデジタル署名\n4. 送信 → submit / submitAndWait\n5. 検証 → コンセンサス → 最終結果",
            ko: "1. 구성 → 필드 정의 (유형, 출발지, 목적지)\n2. 준비 → autofill (Fee, Sequence, NetworkID)\n3. 서명 → 개인 키로 디지털 서명\n4. 제출 → submit / submitAndWait\n5. 검증 → 합의 → 최종 결과",
            zh: "1. 构建 → 定义字段（类型、来源、目标）\n2. 准备 → autofill（Fee、Sequence、NetworkID）\n3. 签名 → 使用私钥生成数字签名\n4. 提交 → submit / submitAndWait\n5. 验证 → 共识 → 最终结果",
          },
          visual: "📋",
        },
        {
          title: { es: "Autofill: campos automáticos", pt: "Autofill: campos automáticos", en: "Autofill: automatic fields", jp: "Autofill：自動フィールド", ko: "Autofill: 자동 필드", zh: "Autofill：自动字段" },
          content: {
            es: "client.autofill() rellena por ti:\n\n• Fee → Coste según carga de red\n• Sequence → Número de tx de tu cuenta\n• LastLedgerSequence → Protección anti-fantasma\n• NetworkID → Testnet vs Mainnet",
            pt: "client.autofill() preenche para você:\n\n• Fee → Custo conforme a carga da redee\n• Sequence → Número de tx da sua conta\n• LastLedgerSequence → Proteção anti-fantasma\n• NetworkID → Testnet vs Mainnet",
            en: "client.autofill() fills in for you:\n\n• Fee → Cost based on network load\n• Sequence → Your account's tx number\n• LastLedgerSequence → Anti-ghost protection\n• NetworkID → Testnet vs Mainnet",
            jp: "client.autofill()が自動入力：\n\n• Fee → ネットワーク負荷に基づくコスト\n• Sequence → アカウントのトランザクション番号\n• LastLedgerSequence → ゴースト対策保護\n• NetworkID → Testnet対Mainnet",
            ko: "client.autofill()가 자동으로 채웁니다:\n\n• Fee → 네트워크 부하 기반 비용\n• Sequence → 계정의 tx 번호\n• LastLedgerSequence → 유령 tx 방지\n• NetworkID → Testnet vs Mainnet",
            zh: "client.autofill() 会自动补全：\n\n• Fee → 基于网络负载计算的成本\n• Sequence → 你的账户交易序号\n• LastLedgerSequence → 防幽灵交易保护\n• NetworkID → Testnet 与 Mainnet",
          },
          visual: "⚙️",
        },
        {
          title: { es: "Finalidad determinista", pt: "Finalidade determinística", en: "Deterministic finality", jp: "決定論的ファイナリティ", ko: "결정적 파이널리티", zh: "确定性终局性" },
          content: {
            es: "Validación en 3-5 segundos\n\n• Sin reorgs ni forks\n• Sin confirmaciones pendientes\n• tesSUCCESS = éxito para siempre\n• Resultado final e irreversible\n\nDiferente a Bitcoin/Ethereum (probabilístico)",
            pt: "Validação em 3-5 segundos\n\n• Sem reorgs nem forks\n• Sem conassinaturaciones pendientes\n• tesSUCCESS = éxito para sempre\n• Resultado final e irreversível\n\nDiferente a Bitcoin/Ethereum (probabilístico)",
            en: "Validation in 3-5 seconds\n\n• No reorgs or forks\n• No pending confirmations\n• tesSUCCESS = success forever\n• Final and irreversible result\n\nDifferent from Bitcoin/Ethereum (probabilistic)",
            jp: "3〜5秒で検証\n\n• リオーグやフォークなし\n• 保留中の確認なし\n• tesSUCCESS = 永遠の成功\n• 最終的かつ不可逆の結果\n\nビットコイン/イーサリアム（確率的）と異なる",
            ko: "3~5초 안에 검증\n\n• reorg와 fork 없음\n• 확인 대기 없음\n• tesSUCCESS = 영구적인 성공\n• 최종적이고 되돌릴 수 없는 결과\n\n비트코인/이더리움과 다른 결정적 구조",
            zh: "3 到 5 秒内完成验证\n\n• 没有 reorg 或分叉\n• 没有等待确认\n• tesSUCCESS = 永久成功\n• 结果最终且不可逆\n\n这点与 Bitcoin/Ethereum 的概率最终性不同",
          },
          visual: "✅",
        },
      ],
    },
    {
      id: "m5bl2",
      title: {
        es: "Campos de una transacción",
        pt: "Campos de uma transação",
        en: "Transaction fields",
        jp: "トランザクションのフィールド",
        ko: "트랜잭션 필드",
        zh: "交易字段",
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

### TransactionType: Tipos de transacción

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

### Fee: El coste de la transacción

El Fee en Xahau funciona diferente a otras blockchains:

- Se expresa en **drops** (1 XAH = 1,000,000 drops)
- El fee base es **12 drops** (0.000012 XAH) — extremadamente barato
- El fee **se quema** — no va a validadores ni a nadie. Se destruye
- Cuando la red está congestionada, el fee puede subir temporalmente (**fee escalation**)
- \`autofill()\` calcula el fee óptimo según la carga actual de la red

### Sequence: Orden de transacciones

El Sequence es un **contador incremental** de tu cuenta:

- Empieza en el número asignado al activar la cuenta
- Se incrementa en 1 con cada transacción exitosa
- Garantiza que las transacciones se procesen **en orden**
- Si envías dos transacciones con el mismo Sequence, solo una se procesará
- Si falta un Sequence intermedio (ej: envías 5, 6, 8 sin 7), las transacciones 8+ quedan en cola hasta que la 7 se resuelva

### LastLedgerSequence: Protección contra fantasmas

El campo LastLedgerSequence es una **fecha de caducidad** para tu transacción:

- Especifica el **número de ledger máximo** en el que puede ser incluida
- Si el ledger actual supera este número y la transacción no se ha procesado, se descarta
- Evita que transacciones "perdidas" se ejecuten minutos u horas después
- \`autofill()\` lo establece automáticamente (normalmente ledger actual + 20)

### Flags: Modificadores de comportamiento

Muchos tipos de transacción aceptan un campo **Flags** que modifica su comportamiento:

- Los flags son **valores numéricos** que se combinan con operaciones de bits
- Ejemplo: \`Flags: 1\` en URITokenMint activa \`tfBurnable\`
- Ejemplo: \`Flags: 131072\` en OfferCreate activa \`tfImmediateOrCancel\`
- Puedes combinar flags sumando sus valores

### Memos: Datos adjuntos

Puedes adjuntar datos a cualquier transacción usando el campo **Memos**:

- **MemoType**: Tipo MIME en hexadecimal (ej: "text/plain")
- **MemoData**: El contenido en hexadecimal
- Los memos son **públicos** y permanentes guardados como datos de transacción
- No afectan la lógica de la transacción, solo almacenan información adicional
- Si no tienes la necesidad de hacerlo, se recomienda no usar estos campos para no almacenar datos innecesarios en la blockchain`,
        pt: `Cada transação na Xahau é um **objeto com campos específicos**. Alguns campos são obrigatórios, outros opcionais, e outros são preenchidos por \`autofill()\`. Entender cada campo dará a você controle total sobre suas transações.
### Campos comuns a todas as transações
Esses campos existem em **todo tipo de transação**:
| Campo | Obrigatório | Descrição |
|---|---|---|
| **TransactionType** | Sim | Tipo: "Payment", "TrustSet", "OfferCreate", etc. |
| **Account** | Sim | Seu endereço (rXXX...) — quem envia a transação |
| **Fee** | Autofill | Custo em drops (1 XAH = 1,000,000 drops) |
| **Sequence** | Autofill | Número de sequência de sua conta |
| **LastLedgerSequence** | Autofill | Ledger máximo para incluir a tx |
| **NetworkID** | Autofill | ID da rede (21337 para mainnet Xahau) |
| **SigningPubKey** | Auto (assinatura) | Sua chave pública (é adicionada ao assinar) |
| **TxnSignature** | Auto (assinatura) | A assinatura digital (é adicionada ao assinar) |
### TransactionType: Tipos de transação
Xahau suporta muitos tipos de transação. Os mais comuns:
- [Payment](https://xahau.network/docs/protocol-reference/transactions/transaction-types/payment/) — Enviar XAH ou tokens
- [TrustSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/trustset/) — Criar ou modificar uma trust line
- [OfferCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/) — Criar uma oferta no DEX
- [OfferCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercancel/) — Cancelar uma oferta do DEX
- [AccountSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/accountset/) — Configurar flags da sua conta
- [SetHook](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/) — Instalar ou gerenciar Hooks (smart contracts)
- [URITokenMint](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenmint/) — Criar um NFT (URIToken)
- [URITokenBuy](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenbuy/) — Comprar um URIToken
- [URITokenCreateSellOffer](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokencreateselloffer/) — Colocar à venda um URIToken
- [EscrowCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcreate/) — Criar um pagamento condicional
- [EscrowFinish](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowfinish/) — Completar um escrow
- [EscrowCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcancel/) — Cancelar um escrow
### Fee: O custo da transação
O Fee na Xahau funciona diferente de outras blockchains:
- É expresso em **drops** (1 XAH = 1,000,000 drops)
- O fee base é **12 drops** (0.000012 XAH) — extremamente barato
- O fee **é queimado** — não vai para validadores nem para ninguém. Ele é destruído
- Quando a rede está congestionada, o fee pode subir temporariamente (**fee escalation**)
- \`autofill()\` calcula o fee ideal conforme a carga atual da rede
### Sequence: Ordem de transações
O Sequence é um **contador incremental** de sua conta:
- Começa no número atribuído ao ativar a conta
- Se incrementa em 1 com cada transação exitosa
- Garante que as transações sejam processadas **em ordem**
- Se você enviar duas transações com o mesmo Sequence, apenas uma será processada
- Se faltar um Sequence intermediário (ex.: você envia 5, 6, 8 sem 7), as transações 8+ ficam na fila até que a 7 seja resolvida
### LastLedgerSequence: Proteção contra fantasmas
O campo LastLedgerSequence é uma **data de expiração** para sua transação:
- Especifica o **número de ledger máximo** em que ela pode ser incluída
- Se o ledger atual ultrapassar esse número e a transação não foi processada, ela é descartada
- Evita que transações "perdidas" sejam executadas minutos ou horas depois
- \`autofill()\` define automaticamente esse campo (normalmente ledger atual + 20)
### Flags: Modificadores de comportamento
Muitos tipos de transação aceitam um campo **Flags** que modifica seu comportamento:
- Os flags são **valores numéricos** que são combinados com operações de bits
- Exemplo: \`Flags: 1\` em URITokenMint ativa \`tfBurnable\`
- Exemplo: \`Flags: 131072\` em OfferCreate ativa \`tfImmediateOrCancel\`
- Você pode combinar flags somando seus valores
### Memos: Dados adjuntos
Você pode anexar dados a qualquer transação usando o campo **Memos**:
- **MemoType**: Tipo MIME em hexadecimal (ex.: "text/plain")
- **MemoData**: O conteúdo em hexadecimal
- Os memos são **públicos** e permanentes guardados como dados de transação
- Não afetam a lógica da transação, apenas armazenam informações adicionais
- Se você não precisa disso, recomenda-se não usar esses campos para não armazenar dados desnecessários na blockchain`,
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

### TransactionType: Transaction types

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

### Fee: The transaction cost

The Fee in Xahau works differently from other blockchains:

- It is expressed in **drops** (1 XAH = 1,000,000 drops)
- The base fee is **12 drops** (0.000012 XAH) — extremely cheap
- The fee is **burned** — it does not go to validators or anyone. It is destroyed
- When the network is congested, the fee can temporarily increase (**fee escalation**)
- \`autofill()\` calculates the optimal fee based on the current network load

### Sequence: Transaction ordering

The Sequence is an **incremental counter** for your account:

- It starts at the number assigned when the account is activated
- It increments by 1 with each successful transaction
- It ensures transactions are processed **in order**
- If you send two transactions with the same Sequence, only one will be processed
- If an intermediate Sequence is missing (e.g., you send 5, 6, 8 without 7), transactions 8+ are queued until 7 is resolved

### LastLedgerSequence: Protection against ghost transactions

The LastLedgerSequence field is an **expiration date** for your transaction:

- It specifies the **maximum ledger number** in which it can be included
- If the current ledger exceeds this number and the transaction has not been processed, it is discarded
- It prevents "lost" transactions from executing minutes or hours later
- \`autofill()\` sets it automatically (typically current ledger + 20)

### Flags: Behavior modifiers

Many transaction types accept a **Flags** field that modifies their behavior:

- Flags are **numeric values** combined using bitwise operations
- Example: \`Flags: 1\` in URITokenMint enables \`tfBurnable\`
- Example: \`Flags: 131072\` in OfferCreate enables \`tfImmediateOrCancel\`
- You can combine flags by adding their values

### Memos: Attached data

You can attach data to any transaction using the **Memos** field:

- **MemoType**: MIME type in hexadecimal (e.g., "text/plain")
- **MemoData**: The content in hexadecimal
- Memos are **public** and permanently stored as transaction data
- They do not affect the transaction logic, they only store additional information
- If you do not need to use them, it is recommended to avoid these fields to prevent storing unnecessary data on the blockchain`,
        jp: `Xahauのすべてのトランザクションは**特定のフィールドを持つオブジェクト**です。必須フィールド、任意フィールド、\`autofill()\`が埋めるフィールドがあります。各フィールドを理解することで、トランザクションを完全に制御できるようになります。

### すべてのトランザクションに共通するフィールド

これらのフィールドは**すべてのトランザクションタイプ**に存在します。

| フィールド | 必須 | 説明 |
|---|---|---|
| **TransactionType** | はい | タイプ："Payment"、"TrustSet"、"OfferCreate"など |
| **Account** | はい | あなたのアドレス（rXXX...）—トランザクションの送信者 |
| **Fee** | 自動入力 | drops単位のコスト（1 XAH = 1,000,000 drops） |
| **Sequence** | 自動入力 | アカウントのシーケンス番号 |
| **LastLedgerSequence** | 自動入力 | トランザクションを含める最大レジャー番号 |
| **NetworkID** | 自動入力 | ネットワークID（Xahau mainnetは21337） |
| **SigningPubKey** | 自動（署名） | 公開鍵（署名時に追加） |
| **TxnSignature** | 自動（署名） | デジタル署名（署名時に追加） |

### TransactionType：トランザクションタイプ

Xahauは多くのトランザクションタイプをサポートしています。最も一般的なものは次の通りです。

- [Payment](https://xahau.network/docs/protocol-reference/transactions/transaction-types/payment/) — XAHまたはトークンの送金
- [TrustSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/trustset/) — トラストラインの作成または変更
- [OfferCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/) — DEXでのオファー作成
- [OfferCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercancel/) — DEXオファーのキャンセル
- [AccountSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/accountset/) — アカウントフラグの設定
- [SetHook](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/) — Hookのインストールまたは管理（スマートコントラクト）
- [URITokenMint](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenmint/) — NFTの作成（URIToken）
- [URITokenBuy](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenbuy/) — URITokenの購入
- [URITokenCreateSellOffer](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokencreateselloffer/) — URITokenの売却オファーの作成
- [EscrowCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcreate/) — エスクローの作成
- [EscrowFinish](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowfinish/) — エスクローの完了
- [EscrowCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcancel/) — エスクローのキャンセル

### Fee：トランザクションコスト

XahauのFeeは他のブロックチェーンとは異なります：

- **drops**で表現されます（1 XAH = 1,000,000 drops）
- 基本Feeは**12 drops**（0.000012 XAH）—非常に安価
- Feeは**バーン**されます—バリデーターや誰かに渡るのではなく、消却されます
- ネットワークが混雑すると、Feeが一時的に上昇します（**フィーエスカレーション**）
- \`autofill()\`が現在のネットワーク負荷に基づいて最適なFeeを計算します

### Sequence：トランザクションの順序

Sequenceはアカウントの**インクリメンタルカウンター**です。

- アカウント有効化時に割り当てられた番号から開始します
- トランザクションを送信し、ネットワークに登録されるごとに1増加します
- トランザクションが**順序通りに**処理されることを保証します
- 同じSequenceで2つのトランザクションを送信した場合、1つだけ処理されます
- 中間のSequenceが欠落した場合（例：5、6、8を送信して7がない）、7が解決されるまで8以降のトランザクションはキューに入ります

### LastLedgerSequence：ゴーストトランザクション対策

LastLedgerSequenceフィールドはトランザクションの**有効期限**です。

- 含められる**最大レジャー番号**を指定します
- 現在のレジャーがこの番号を超えてもトランザクションが処理されていない場合、廃棄されます
- 「消えた」トランザクションが何分・何時間後かに実行されるのを防ぎます
- \`autofill()\`が自動的に設定します（通常、現在のレジャー + 20）

### Flags：動作修飾子

多くのトランザクションタイプは、動作を変更する**Flags**フィールドを受け付けます。

- FlagsはビットOR演算で組み合わせる**数値**です
- 例：URITokenMintの\`Flags: 1\`で\`tfBurnable\`を有効化
- 例：OfferCreateの\`Flags: 131072\`で\`tfImmediateOrCancel\`を有効化
- 値を加算してフラグを組み合わせられます

### Memos：添付データ

**Memos**フィールドを使ってトランザクションにデータを添付できます。

- **MemoType**：16進数のMIMEタイプ（例："text/plain"）
- **MemoData**：16進数のコンテンツ
- Memosは**公開情報**でトランザクション情報として永久に保存されます
- トランザクションのロジックには影響せず、追加情報を保存するだけです
- 必要でない場合は、ブロックチェーンに不必要なデータを保存しないためにこれらのフィールドの使用を避けることを推奨します`,
        ko: `모든 Xahau 트랜잭션은 **특정 필드를 가진 객체**입니다. 어떤 필드는 필수이고, 어떤 필드는 선택이며, 또 어떤 필드는 \`autofill()\`이 채워 줍니다. 각 필드를 이해하면 트랜잭션을 완전히 제어할 수 있습니다.

### 모든 트랜잭션에 공통인 필드

다음 필드는 **모든 트랜잭션 유형**에 존재합니다:

| 필드 | 필수 | 설명 |
|---|---|---|
| **TransactionType** | 예 | 유형: "Payment", "TrustSet", "OfferCreate" 등 |
| **Account** | 예 | 내 주소(rXXX...) — 트랜잭션 발신자 |
| **Fee** | Autofill | drops 단위 비용 (1 XAH = 1,000,000 drops) |
| **Sequence** | Autofill | 계정의 시퀀스 번호 |
| **LastLedgerSequence** | Autofill | tx가 포함될 최대 ledger |
| **NetworkID** | Autofill | 네트워크 ID (Xahau mainnet은 21337) |
| **SigningPubKey** | 자동(서명) | 공개 키 (서명 시 추가) |
| **TxnSignature** | 자동(서명) | 디지털 서명 (서명 시 추가) |

### TransactionType: 트랜잭션 유형

Xahau는 많은 트랜잭션 유형을 지원합니다. 가장 흔한 예시는:

- [Payment](https://xahau.network/docs/protocol-reference/transactions/transaction-types/payment/) — XAH 또는 토큰 전송
- [TrustSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/trustset/) — trust line 생성 또는 수정
- [OfferCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/) — DEX에 오퍼 생성
- [OfferCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercancel/) — DEX 오퍼 취소
- [AccountSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/accountset/) — 계정 플래그 설정
- [SetHook](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/) — Hook 설치 또는 관리
- [URITokenMint](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenmint/) — NFT(URIToken) 생성
- [URITokenBuy](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenbuy/) — URIToken 구매
- [URITokenCreateSellOffer](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokencreateselloffer/) — URIToken 판매 오퍼 생성
- [EscrowCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcreate/) — 조건부 결제 생성
- [EscrowFinish](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowfinish/) — escrow 완료
- [EscrowCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcancel/) — escrow 취소

### Fee: 트랜잭션 비용

Xahau의 Fee는 다른 블록체인과 다르게 동작합니다:

- **drops** 단위로 표현됩니다 (1 XAH = 1,000,000 drops)
- 기본 fee는 **12 drops** (0.000012 XAH)로 매우 저렴합니다
- fee는 **소각**됩니다. 검증자나 누구에게도 가지 않습니다
- 네트워크가 혼잡하면 fee가 일시적으로 올라갈 수 있습니다 (**fee escalation**)
- \`autofill()\`이 현재 네트워크 부하에 맞는 최적 fee를 계산합니다

### Sequence: 트랜잭션 순서

Sequence는 계정의 **증가 카운터**입니다:

- 계정이 활성화될 때 받은 번호에서 시작합니다
- 성공한 트랜잭션마다 1씩 증가합니다
- 트랜잭션이 **순서대로** 처리되게 보장합니다
- 같은 Sequence로 두 개를 보내면 하나만 처리됩니다
- 중간 Sequence가 비면(예: 5, 6, 8을 보내고 7이 없음), 8 이후는 7이 해결될 때까지 대기합니다

### LastLedgerSequence: 유령 트랜잭션 방지

LastLedgerSequence는 트랜잭션의 **만료 시점**입니다:

- 트랜잭션이 포함될 수 있는 **최대 ledger 번호**를 지정합니다
- 현재 ledger가 이 번호를 넘었는데 tx가 처리되지 않았다면 버려집니다
- "사라진" 트랜잭션이 몇 분 또는 몇 시간 뒤 실행되는 것을 막아 줍니다
- \`autofill()\`이 자동 설정합니다 (보통 현재 ledger + 20)

### Flags: 동작 수정자

많은 트랜잭션 유형은 동작을 바꾸는 **Flags** 필드를 받습니다:

- flags는 비트 연산으로 조합하는 **숫자 값**입니다
- 예: URITokenMint의 \`Flags: 1\` 은 \`tfBurnable\` 활성화
- 예: OfferCreate의 \`Flags: 131072\` 는 \`tfImmediateOrCancel\` 활성화
- 값을 더해 여러 flag를 조합할 수 있습니다

### Memos: 첨부 데이터

**Memos** 필드로 어떤 트랜잭션에도 데이터를 붙일 수 있습니다:

- **MemoType**: 16진수 MIME 타입 (예: "text/plain")
- **MemoData**: 16진수 콘텐츠
- memos는 **공개 데이터**이며 트랜잭션 데이터로 영구 저장됩니다
- 트랜잭션 로직에 영향은 없고 추가 정보만 저장합니다
- 꼭 필요하지 않다면 블록체인에 불필요한 데이터를 남기지 않도록 사용을 피하는 것이 좋습니다`,
        zh: `Xahau 中的每笔交易都是一个**包含特定字段的对象**。有些字段是必填的，有些是可选的，还有一些由 \`autofill()\` 自动补全。理解这些字段后，你就能完全掌控自己的交易。

### 所有交易通用的字段

这些字段存在于**所有交易类型**中：

| 字段 | 必填 | 说明 |
|---|---|---|
| **TransactionType** | 是 | 类型："Payment"、"TrustSet"、"OfferCreate" 等 |
| **Account** | 是 | 你的地址（rXXX...）—— 发起交易的账户 |
| **Fee** | Autofill | 交易成本（单位：drops，1 XAH = 1,000,000 drops） |
| **Sequence** | Autofill | 账户的序列号 |
| **LastLedgerSequence** | Autofill | 交易可被纳入的最大账本号 |
| **NetworkID** | Autofill | 网络 ID（Xahau 主网为 21337） |
| **SigningPubKey** | 自动（签名时） | 你的公钥（签名时加入） |
| **TxnSignature** | 自动（签名时） | 数字签名（签名时加入） |

### TransactionType：交易类型

Xahau 支持很多交易类型。最常见的有：

- [Payment](https://xahau.network/docs/protocol-reference/transactions/transaction-types/payment/) — 发送 XAH 或代币
- [TrustSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/trustset/) — 创建或修改 trust line
- [OfferCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/) — 在 DEX 上创建报价
- [OfferCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercancel/) — 取消 DEX 报价
- [AccountSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/accountset/) — 配置账户标志
- [SetHook](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/) — 安装或管理 Hooks（智能合约）
- [URITokenMint](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenmint/) — 创建 NFT（URIToken）
- [URITokenBuy](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenbuy/) — 购买 URIToken
- [URITokenCreateSellOffer](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokencreateselloffer/) — 挂售 URIToken
- [EscrowCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcreate/) — 创建条件支付
- [EscrowFinish](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowfinish/) — 完成 escrow
- [EscrowCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcancel/) — 取消 escrow

### Fee：交易成本

Xahau 的 Fee 与其他区块链不同：

- 以 **drops** 表示（1 XAH = 1,000,000 drops）
- 基础 fee 为 **12 drops**（0.000012 XAH），非常便宜
- fee 会被**销毁**，不会给验证者或其他任何人
- 网络拥堵时，fee 可能会暂时上涨（**fee escalation**）
- \`autofill()\` 会根据当前网络负载计算最优 fee

### Sequence：交易顺序

Sequence 是你账户的**递增计数器**：

- 从账户激活时分配的编号开始
- 每笔成功交易后加 1
- 确保交易按**顺序**处理
- 如果你发送两笔相同 Sequence 的交易，只会处理其中一笔
- 如果中间缺少某个 Sequence（例如发送了 5、6、8，没有 7），那么 8 及之后的交易会排队等待 7 解决

### LastLedgerSequence：防止幽灵交易

LastLedgerSequence 字段是交易的**有效期**：

- 指定交易可被纳入的**最大账本号**
- 如果当前账本号超过它而交易仍未处理，交易会被丢弃
- 防止“丢失”的交易在几分钟甚至几小时后才执行
- \`autofill()\` 会自动设置它（通常是当前账本 + 20）

### Flags：行为修饰符

很多交易类型接受 **Flags** 字段来修改行为：

- Flags 是通过位运算组合的**数值**
- 例如：在 URITokenMint 中，\`Flags: 1\` 会启用 \`tfBurnable\`
- 例如：在 OfferCreate 中，\`Flags: 131072\` 会启用 \`tfImmediateOrCancel\`
- 你可以把多个 flag 的值相加来组合它们

### Memos：附加数据

你可以通过 **Memos** 字段给任何交易附加数据：

- **MemoType**：十六进制表示的 MIME 类型（例如 "text/plain"）
- **MemoData**：十六进制内容
- memo 是**公开的**，会作为交易数据永久保存在链上
- 它们不会影响交易逻辑，只是用于存储附加信息
- 如果没有明确需要，建议不要使用这些字段，以免在区块链上保存不必要的数据`,
      },
      codeBlocks: [
        {
          title: {
            es: "Inspeccionar los campos antes y después de autofill",
            pt: "Inspecionar os campos antes e depois de autofill",
            en: "Inspect fields before and after autofill",
            jp: "autofill前後のフィールドを確認",
            ko: "autofill 전후 필드 확인",
            zh: "查看 autofill 前后的字段",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function inspeccionarCampos() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Transacción con solo los campos esenciales
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rPTkQoZDeKMbwhs8QsRA1wL6gGA9Ee4C4",
    Amount: "1000000", // 1 XAH
  };

  console.log("=== ANTES de autofill ===");
  console.log("Campos definidos:", Object.keys(tx));
  console.log(JSON.stringify(tx, null, 2));

  // Autofill rellena los campos técnicos
  const prepared = await client.autofill(tx);

  console.log("=== DESPUÉS de autofill ===");
  console.log("Campos totales:", Object.keys(prepared));
  console.log(JSON.stringify(prepared, null, 2));

  // Mostrar los campos que autofill añadió
  const camposNuevos = Object.keys(prepared).filter(
    (k) => !Object.keys(tx).includes(k)
  );
  console.log("=== Campos añadidos por autofill ===");
  for (const campo of camposNuevos) {
    console.log("  " + campo + ":", prepared[campo]);
  }

  await client.disconnect();
}

inspeccionarCampos().catch(console.error);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function inspeccionarCampos() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // Transação apenas com os campos essenciais
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rPTkQoZDeKMbwhs8QsRA1wL6gGA9Ee4C4",
    Amount: "1000000", // 1 XAH
  };
  console.log("=== ANTES de autofill ===");
  console.log("Campos definidos:", Object.keys(tx));
  console.log(JSON.stringify(tx, null, 2));
  // Autofill preenche os campos técnicos
  const prepared = await client.autofill(tx);
  console.log("=== DEPOIS do autofill ===");
  console.log("Campos totais:", Object.keys(prepared));
  console.log(JSON.stringify(prepared, null, 2));
  // Mostrar os campos que ou autofill adicionou
  const camposNovos = Object.keys(prepared).filter(
    (k) => !Object.keys(tx).includes(k)
  );
  console.log("=== Campos añadidos por autofill ===");
  for (const campo of camposNovos) {
    console.log("  " + campo + ":", prepared[campo]);
  }
  await client.disconnect();
}
inspeccionarCampos().catch(console.error);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function checkFields() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Transaction with only the essential fields
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rPTkQoZDeKMbwhs8QsRA1wL6gGA9Ee4C4",
    Amount: "1000000", // 1 XAH
  };

  console.log("=== BEFORE autofill ===");
  console.log("Defined fields:", Object.keys(tx));
  console.log(JSON.stringify(tx, null, 2));

  // Autofill fills in the technical fields
  const prepared = await client.autofill(tx);

  console.log("=== AFTER autofill ===");
  console.log("Total fields:", Object.keys(prepared));
  console.log(JSON.stringify(prepared, null, 2));

  // Show the fields that autofill added
  const newFields = Object.keys(prepared).filter(
    (k) => !Object.keys(tx).includes(k)
  );
  console.log("=== Fields added by autofill ===");
  for (const field of newFields) {
    console.log("  " + field + ":", prepared[field]);
  }

  await client.disconnect();
}

checkFields().catch(console.error);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function checkFields() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 必須フィールドのみのトランザクション
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rPTkQoZDeKMbwhs8QsRA1wL6gGA9Ee4C4",
    Amount: "1000000", // 1 XAH
  };

  console.log("=== autofill前 ===");
  console.log("定義フィールド：", Object.keys(tx));
  console.log(JSON.stringify(tx, null, 2));

  // autofillが技術的フィールドを埋める
  const prepared = await client.autofill(tx);

  console.log("=== autofill後 ===");
  console.log("総フィールド：", Object.keys(prepared));
  console.log(JSON.stringify(prepared, null, 2));

  // autofillが追加したフィールドを表示
  const newFields = Object.keys(prepared).filter(
    (k) => !Object.keys(tx).includes(k)
  );
  console.log("=== autofillが追加したフィールド ===");
  for (const field of newFields) {
    console.log("  " + field + ":", prepared[field]);
  }

  await client.disconnect();
}

checkFields().catch(console.error);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function checkFields() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 필수 필드만 가진 트랜잭션
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rPTkQoZDeKMbwhs8QsRA1wL6gGA9Ee4C4",
    Amount: "1000000", // 1 XAH
  };

  console.log("=== autofill 전 ===");
  console.log("정의된 필드:", Object.keys(tx));
  console.log(JSON.stringify(tx, null, 2));

  // autofill이 기술 필드를 채움
  const prepared = await client.autofill(tx);

  console.log("=== autofill 후 ===");
  console.log("전체 필드:", Object.keys(prepared));
  console.log(JSON.stringify(prepared, null, 2));

  // autofill이 추가한 필드 확인
  const newFields = Object.keys(prepared).filter(
    (k) => !Object.keys(tx).includes(k)
  );
  console.log("=== autofill이 추가한 필드 ===");
  for (const field of newFields) {
    console.log("  " + field + ":", prepared[field]);
  }

  await client.disconnect();
}

checkFields().catch(console.error);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function checkFields() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 只包含核心字段的交易
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rPTkQoZDeKMbwhs8QsRA1wL6gGA9Ee4C4",
    Amount: "1000000", // 1 XAH
  };

  console.log("=== autofill 之前 ===");
  console.log("已定义字段：", Object.keys(tx));
  console.log(JSON.stringify(tx, null, 2));

  // autofill 会补齐技术字段
  const prepared = await client.autofill(tx);

  console.log("=== autofill 之后 ===");
  console.log("总字段：", Object.keys(prepared));
  console.log(JSON.stringify(prepared, null, 2));

  // 显示 autofill 新增的字段
  const newFields = Object.keys(prepared).filter(
    (k) => !Object.keys(tx).includes(k)
  );
  console.log("=== autofill 新增的字段 ===");
  for (const field of newFields) {
    console.log("  " + field + ":", prepared[field]);
  }

  await client.disconnect();
}

checkFields().catch(console.error);`,
          },
        },
        {
          title: {
            es: "Construir distintos tipos de transacción",
            pt: "Construir distintos tipos de transação",
            en: "Build different transaction types",
            jp: "異なるトランザクションタイプの構築",
            ko: "여러 트랜잭션 유형 구성하기",
            zh: "构建不同类型的交易",
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
            pt: `// Exemplos de como construir distintos tipos de transação.
// Apenas mostramos os campos essenciais — autofill() preenche o resto.
// --- Payment: enviar XAH ---
const payment = {
  TransactionType: "Payment",
  Account: "rOrigem...",
  Destination: "rDestino...",
  Amount: "5000000", // 5 XAH em drops
};
// --- Payment: enviar token ---
const tokenPayment = {
  TransactionType: "Payment",
  Account: "rOrigem...",
  Destination: "rDestino...",
  Amount: {
    currency: "USD",
    value: "100",
    issuer: "rEmisor...",
  },
};
// --- TrustSet: criar trust line ---
const trustSet = {
  TransactionType: "TrustSet",
  Account: "rReceptor...",
  LimitAmount: {
    currency: "USD",
    value: "10000",
    issuer: "rEmisor...",
  },
};
// --- OfferCreate: criar oferta no DEX ---
const offer = {
  TransactionType: "OfferCreate",
  Account: "rTrader...",
  TakerPays: { currency: "USD", value: "50", issuer: "rEmisor..." },
  TakerGets: "100000000", // 100 XAH
};
// --- AccountSet: ativar flag ---
const accountSet = {
  TransactionType: "AccountSet",
  Account: "rMiCuenta...",
  SetFlag: 8, // asfDefaultRipple
};
// --- URITokenMint: criar NFT ---
const mint = {
  TransactionType: "URITokenMint",
  Account: "rCreador...",
  URI: "68747470733A2F2F...", // URL em hexadecimal
  Flags: 1, // tfBurnable
};
console.log("Cada tipo tem suas campos específicos.");
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
            jp: `// 異なるトランザクションタイプの構築例。
// 必須フィールドのみを示します — autofill()が残りを埋めます。

// --- Payment: XAHの送金 ---
const payment = {
  TransactionType: "Payment",
  Account: "rOrigin...",
  Destination: "rDestination...",
  Amount: "5000000", // 5 XAH（drops単位）
};

// --- Payment: トークンの送金 ---
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

// --- TrustSet: トラストラインの作成 ---
const trustSet = {
  TransactionType: "TrustSet",
  Account: "rReceiver...",
  LimitAmount: {
    currency: "USD",
    value: "10000",
    issuer: "rIssuer...",
  },
};

// --- OfferCreate: DEXでのオファー作成 ---
const offer = {
  TransactionType: "OfferCreate",
  Account: "rTrader...",
  TakerPays: { currency: "USD", value: "50", issuer: "rIssuer..." },
  TakerGets: "100000000", // 100 XAH
};

// --- AccountSet: フラグの有効化 ---
const accountSet = {
  TransactionType: "AccountSet",
  Account: "rMyAccount...",
  SetFlag: 8, // asfDefaultRipple
};

// --- URITokenMint: NFTの作成 ---
const mint = {
  TransactionType: "URITokenMint",
  Account: "rCreator...",
  URI: "68747470733A2F2F...", // 16進数のURL
  Flags: 1, // tfBurnable
};

console.log("各タイプには固有のフィールドがあります。");
console.log("共通フィールド：TransactionType、Account、Fee、Sequence。");`,
            ko: `// 여러 트랜잭션 유형을 어떻게 구성하는지 보여 주는 예시입니다.
// 핵심 필드만 보여 줍니다 — 나머지는 autofill()이 채웁니다.

// --- Payment: XAH 보내기 ---
const payment = {
  TransactionType: "Payment",
  Account: "rOrigin...",
  Destination: "rDestination...",
  Amount: "5000000", // 5 XAH in drops
};

// --- Payment: 토큰 보내기 ---
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

// --- TrustSet: trust line 생성 ---
const trustSet = {
  TransactionType: "TrustSet",
  Account: "rReceiver...",
  LimitAmount: {
    currency: "USD",
    value: "10000",
    issuer: "rIssuer...",
  },
};

// --- OfferCreate: DEX 오퍼 생성 ---
const offer = {
  TransactionType: "OfferCreate",
  Account: "rTrader...",
  TakerPays: { currency: "USD", value: "50", issuer: "rIssuer..." },
  TakerGets: "100000000", // 100 XAH
};

// --- AccountSet: flag 활성화 ---
const accountSet = {
  TransactionType: "AccountSet",
  Account: "rMyAccount...",
  SetFlag: 8, // asfDefaultRipple
};

// --- URITokenMint: NFT 생성 ---
const mint = {
  TransactionType: "URITokenMint",
  Account: "rCreator...",
  URI: "68747470733A2F2F...", // URL in hexadecimal
  Flags: 1, // tfBurnable
};

console.log("각 유형은 고유한 필드를 가집니다.");
console.log("공통 필드: TransactionType, Account, Fee, Sequence.");`,
            zh: `// 展示不同交易类型的构建方式。
// 这里只展示核心字段，其他字段由 autofill() 补齐。

// --- Payment：发送 XAH ---
const payment = {
  TransactionType: "Payment",
  Account: "rOrigin...",
  Destination: "rDestination...",
  Amount: "5000000", // 5 XAH（单位：drops）
};

// --- Payment：发送代币 ---
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

// --- TrustSet：创建 trust line ---
const trustSet = {
  TransactionType: "TrustSet",
  Account: "rReceiver...",
  LimitAmount: {
    currency: "USD",
    value: "10000",
    issuer: "rIssuer...",
  },
};

// --- OfferCreate：在 DEX 上创建报价 ---
const offer = {
  TransactionType: "OfferCreate",
  Account: "rTrader...",
  TakerPays: { currency: "USD", value: "50", issuer: "rIssuer..." },
  TakerGets: "100000000", // 100 XAH
};

// --- AccountSet：启用标志 ---
const accountSet = {
  TransactionType: "AccountSet",
  Account: "rMyAccount...",
  SetFlag: 8, // asfDefaultRipple
};

// --- URITokenMint：创建 NFT ---
const mint = {
  TransactionType: "URITokenMint",
  Account: "rCreator...",
  URI: "68747470733A2F2F...", // 十六进制 URL
  Flags: 1, // tfBurnable
};

console.log("每种类型都有自己的专属字段。");
console.log("它们都共享：TransactionType、Account、Fee、Sequence。");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Campos comunes", pt: "Campos comuns", en: "Common fields", jp: "共通フィールド", ko: "공통 필드", zh: "通用字段" },
          content: {
            es: "Toda transacción tiene:\n\n• TransactionType → Tipo de operación\n• Account → Quién envía\n• Fee → Coste (en drops, se quema)\n• Sequence → Orden de txs de la cuenta\n• LastLedgerSequence → Caducidad\n• NetworkID → Red (testnet/mainnet)",
            pt: "Toda transação tem:\n\n• TransactionType → Tipo de operação\n• Account → Quem envia\n• Fee → Custo (em drops, é queimado)\n• Sequence → Ordem das txs da conta\n• LastLedgerSequence → Expiração\n• NetworkID → Rede (testnet/mainnet)",
            en: "Every transaction has:\n\n• TransactionType → Type of operation\n• Account → Who sends it\n• Fee → Cost (in drops, burned)\n• Sequence → Account tx ordering\n• LastLedgerSequence → Expiration\n• NetworkID → Network (testnet/mainnet)",
            jp: "すべてのトランザクションに含まれる：\n\n• TransactionType → 操作タイプ\n• Account → 送信者\n• Fee → コスト（drops単位、バーン）\n• Sequence → アカウントのトランザクション順序\n• LastLedgerSequence → 有効期限\n• NetworkID → ネットワーク（testnet/mainnet）",
            ko: "모든 트랜잭션에는 다음이 있습니다:\n\n• TransactionType → 작업 유형\n• Account → 보내는 주체\n• Fee → 비용 (drops, 소각됨)\n• Sequence → 계정 tx 순서\n• LastLedgerSequence → 만료 시점\n• NetworkID → 네트워크 (testnet/mainnet)",
            zh: "每笔交易都包含：\n\n• TransactionType → 操作类型\n• Account → 发送方\n• Fee → 成本（单位：drops，会被销毁）\n• Sequence → 账户交易顺序\n• LastLedgerSequence → 过期上限\n• NetworkID → 网络（testnet/mainnet）",
          },
          visual: "📝",
        },
        {
          title: { es: "Tipos de transacción", pt: "Tipos de transação", en: "Transaction types", jp: "トランザクションタイプ", ko: "트랜잭션 유형", zh: "交易类型" },
          content: {
            es: "• Payment → Enviar XAH o tokens\n• TrustSet → Trust lines\n• OfferCreate/Cancel → DEX\n• AccountSet → Configurar cuenta\n• SetHook → Smart contracts\n• URITokenMint/Buy → NFTs\n• EscrowCreate/Finish → Pagos condicionales",
            pt: "• Payment → Enviar XAH ou tokens\n• TrustSet → Trust lines\n• OfferCreate/Cancel → DEX\n• AccountSet → Configurar conta\n• SetHook → Smart contracts\n• URITokenMint/Buy → NFTs\n• EscrowCreate/Finish → Pagamentos condicionales",
            en: "• Payment → Send XAH or tokens\n• TrustSet → Trust lines\n• OfferCreate/Cancel → DEX\n• AccountSet → Configure account\n• SetHook → Smart contracts\n• URITokenMint/Buy → NFTs\n• EscrowCreate/Finish → Conditional payments",
            jp: "• Payment → XAHまたはトークンの送金\n• TrustSet → トラストライン\n• OfferCreate/Cancel → DEX\n• AccountSet → アカウント設定\n• SetHook → スマートコントラクト\n• URITokenMint/Buy → NFT\n• EscrowCreate/Finish → 条件付き支払い",
            ko: "• Payment → XAH 또는 토큰 전송\n• TrustSet → Trust line\n• OfferCreate/Cancel → DEX\n• AccountSet → 계정 설정\n• SetHook → 스마트 컨트랙트\n• URITokenMint/Buy → NFT\n• EscrowCreate/Finish → 조건부 결제",
            zh: "• Payment → 发送 XAH 或代币\n• TrustSet → Trust lines\n• OfferCreate/Cancel → DEX\n• AccountSet → 配置账户\n• SetHook → 智能合约\n• URITokenMint/Buy → NFT\n• EscrowCreate/Finish → 条件支付",
          },
          visual: "📦",
        },
        {
          title: { es: "Fee, Sequence y Flags", pt: "Fee, Sequence e Flags", en: "Fee, Sequence and Flags", jp: "Fee、Sequence、Flags", ko: "Fee, Sequence, Flags", zh: "Fee、Sequence 与 Flags" },
          content: {
            es: "Fee: 12 drops base (~gratis), se quema\n\nSequence: contador incremental\n• Garantiza orden de ejecución\n• Sin huecos: txs quedan en cola\n\nFlags: modifican comportamiento\n• Se combinan sumando valores\n• Cada tipo tiene sus flags propios",
            pt: "Fee: 12 drops base (~quase grátis), é queimado\n\nSequence: contador incremental\n• Garante ordem de execução\n• Sem lacunas: txs ficam na fila\n\nFlags: modificam comportamento\n• Se combinan sumando valores\n• Cada tipo tem suas próprias flags",
            en: "Fee: 12 drops base (~free), burned\n\nSequence: incremental counter\n• Ensures execution order\n• No gaps: txs are queued\n\nFlags: modify behavior\n• Combined by adding values\n• Each type has its own flags",
            jp: "Fee：12 drops基本（ほぼ無料）、バーン\n\nSequence：インクリメンタルカウンター\n• 実行順序を保証\n• 欠番はキューに入る\n\nFlags：動作を変更\n• 値を加算して組み合わせ\n• 各タイプ固有のフラグ",
            ko: "Fee: 기본 12 drops (~거의 무료), 소각됨\n\nSequence: 증가 카운터\n• 실행 순서를 보장\n• 중간 번호가 비면 tx가 대기함\n\nFlags: 동작을 수정\n• 값을 더해 조합\n• 각 유형마다 고유 flag 보유",
            zh: "Fee：基础 12 drops（几乎免费），会被销毁\n\nSequence：递增计数器\n• 保证执行顺序\n• 不能跳号，否则交易会排队\n\nFlags：修改行为\n• 通过数值相加组合\n• 每种交易都有自己的 flags",
          },
          visual: "🔢",
        },
      ],
    },
    {
      id: "m5bl3",
      title: {
        es: "Firma digital y serialización",
        pt: "Assinatura digital e serialização",
        en: "Digital signature and serialization",
        jp: "デジタル署名とシリアライゼーション",
        ko: "디지털 서명과 직렬화",
        zh: "数字签名与序列化",
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
        pt: `A assinatura digital é o mecanismo que garante que **somente você pode autorizar transações** a partir da sua conta. Entender como ela funciona ajudará você a compreender a segurança de Xahau e a depurar problemas de assinatura.
### O que é uma assinatura digital?
Uma assinatura digital é uma prova matemática de que:
1. **Você criou a transação** (autenticação)
2. **Ninguém a modificou** depois de assiná-la (integridadee)
3. **Você não pode negar** que a assinou (não repúdio)
### Algoritmos de assinatura na Xahau
Xahau suporta dois algoritmos criptográficos:
| Algoritmo | Prefixo do seed | Características |
|---|---|---|
| **ed25519** | sEd... | Mais rápido, moderno, recomendado |
| **secp256k1** | s... (sem Ed) | Compatível com Bitcoin/Ethereum, mais antigo |
Quando você gera uma wallet com \`Wallet.generate()\`, por padrão usa-se **ed25519**. Os seeds que começam com \`sEd\` usam ed25519.
### O processo de assinatura passo a passo
1. **Serialização**: A transação (objeto JSON) é convertida a **formato binário** seguindo o protocolo de Xahau. Cada campo tem um código de tipo e uma ordem específica.
2. **Hashing**: O binário serializado passa por uma função hash (SHA-512 half) para obter um **resumo de 32 bytes**.
3. **Assinatura**: Sua chave privada gera uma assinatura criptográfica sobre esse hash. Esta assinatura só pode ser verificada com sua chave pública.
4. **Montagem**: A assinatura (\`TxnSignature\`) e sua chave pública (\`SigningPubKey\`) são adicionadas à transação serializada, gerando o **tx_blob** final.
### tx_blob: a transação pronta para enviar
O \`tx_blob\` é uma string hexadecimal que contém **toda a transação** (campos + assinatura) em formato binário. É o que realmente é enviado à rede:
\`\`\`
wallet.sign(prepared)
// Retorna: { tx_blob: "1200002280000000...", hash: "A1B2C3..." }
\`\`\`
- **tx_blob**: A transação serializada e firmada (hex)
- **hash**: O identificador único da transação (para encontrá-la depois)
### Verificação da assinatura
Quando um nó recebe seu tx_blob:
1. Desserializa o blob para extrair os campos
2. Extrai a \`SigningPubKey\` e a \`TxnSignature\`
3. Verifique se a assinatura corresponde aos dados e a chave pública
4. Verifique se a chave pública corresponde ao endereço \`Account\`
5. Se tudo coincidir, a transação é válida
Se alguém modificar **um único bit** do tx_blob, a assinatura deixa de ser válida e a transação é rejeitada.
### Assinatura offline
Você pode assinar transações **sem conexão à internet**:
1. Em um dispositivo conectado: prepare a transação com \`autofill()\`
2. Copie a transação preparada para um dispositivo offline
3. No dispositivo offline: assine com \`wallet.sign()\`
4. Copia o \`tx_blob\` de vuelta ao dispositivo conectado
5. Envia com \`client.submit(tx_blob)\`
Isso é útil para **cold wallets** — as chaves privadas nunca tocam um dispositivo com internet.
### Multi-assinatura (MultiSign)
Xahau suporta **multi-assinatura**: uma transação que exige a assinatura de **múltiplas contas** para ser válida. É configurada com \`SignerListSet\`:
- Você define uma lista de signatários (SignerList) com seus pesos
- Estableces um quórum mínimo
- Cada signatário assina a transação separadamente
- As assinaturas se combinan e se envían juntas
- Útil para contas compartilhadas, DAOs, ou segurança adicional`,
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
        jp: `デジタル署名は、アカウントから**あなただけがトランザクションを認可できる**ことを保証するメカニズムです。その仕組みを理解することで、Xahauのセキュリティを把握し、署名の問題をデバッグするのに役立ちます。

### デジタル署名とは？

デジタル署名は次のことを証明する数学的証明です。
1. **あなたがトランザクションを作成した**（認証）
2. **署名後に誰も変更していない**（完全性）
3. **署名したことを否定できない**（否認不可）

### Xahauの署名アルゴリズム

Xahauは2つの暗号アルゴリズムをサポートしています：

| アルゴリズム | シードプレフィックス | 特徴 |
|---|---|---|
| **ed25519** | sEd... | 高速、最新、推奨 |
| **secp256k1** | s...（Edなし） | ビットコイン/イーサリアム互換、古い |

\`Wallet.generate()\`でウォレットを生成すると、デフォルトで**ed25519**が使用されます。\`sEd\`で始まるシードはed25519を使用します。

### 署名プロセスのステップバイステップ

1. **シリアライゼーション**：トランザクション（JSONオブジェクト）がXahauプロトコルに従って**バイナリ形式**に変換されます。各フィールドにはタイプコードと特定の順序があります。

2. **ハッシュ**：シリアライズされたバイナリがハッシュ関数（SHA-512 half）にかけられ、**32バイトのダイジェスト**が得られます。

3. **署名**：秘密鍵がそのハッシュに対して暗号署名を生成します。この署名は公開鍵でのみ検証できます。

4. **アセンブリ**：署名（\`TxnSignature\`）と公開鍵（\`SigningPubKey\`）がシリアライズされたトランザクションに追加され、最終的な**tx_blob**が生成されます。

### tx_blob：送信可能なトランザクション

\`tx_blob\`はバイナリ形式で**トランザクション全体**（フィールド+署名）を含む16進数文字列です。これが実際にネットワークに送信されるものです：

\`\`\`
wallet.sign(prepared)
// 結果：{ tx_blob: "1200002280000000...", hash: "A1B2C3..." }
\`\`\`

- **tx_blob**：シリアライズされた署名済みトランザクション（16進数）
- **hash**：トランザクションの一意識別子（後で検索するため）

### 署名の検証

ノードがtx_blobを受信すると次のようになります。

1. blobをデシリアライズしてフィールドを抽出します
2. \`SigningPubKey\`と\`TxnSignature\`を取り出します
3. 署名がデータと公開鍵に対応することを検証します
4. 公開鍵が\`Account\`アドレスに対応することを検証します
5. すべてが一致すれば、トランザクションは有効です

tx_blobの**1ビットでも**変更されると、署名が無効になりトランザクションは拒否されます。

### オフライン署名

**インターネット接続なし**でトランザクションに署名できます。

1. 接続デバイスで：\`autofill()\`でトランザクションを準備します
2. 準備済みトランザクションをオフラインデバイスにコピーします
3. オフラインデバイスで：\`wallet.sign()\`で署名します
4. \`tx_blob\`を接続デバイスにコピーします
5. \`client.submit(tx_blob)\`で送信します

これは**コールドウォレット**からトランザクションに署名する場合に役立ちます。秘密鍵がインターネット接続デバイスに触れることはありません。

### マルチシグ（MultiSign）

Xahauは**マルチシグ**をサポートしています。**複数のアカウントの署名**を必要とするためには\`SignerListSet\`トランザクションを使用します。

- 重みを持つ署名者リスト（SignerList）を定義します
- 最小の閾値を設定します
- 各署名者がトランザクションに個別に署名します
- 署名を組み合わせて一緒に送信します
- 共有アカウント、DAO、または追加セキュリティに役立ちます`,
        ko: `디지털 서명은 **오직 본인만 계정에서 트랜잭션을 승인할 수 있다**는 것을 보장하는 메커니즘입니다. 이 동작 원리를 이해하면 Xahau의 보안을 더 잘 이해하고 서명 문제를 디버깅하는 데 도움이 됩니다.

### 디지털 서명이란?

디지털 서명은 다음을 증명하는 수학적 증거입니다:
1. **본인이 트랜잭션을 만들었다** (인증)
2. **서명 후 아무도 수정하지 않았다** (무결성)
3. **서명 사실을 부인할 수 없다** (부인 방지)

### Xahau의 서명 알고리즘

Xahau는 두 가지 암호 알고리즘을 지원합니다:

| 알고리즘 | 시드 접두사 | 특징 |
|---|---|---|
| **ed25519** | sEd... | 더 빠르고 현대적이며 권장됨 |
| **secp256k1** | s... (Ed 없음) | 비트코인/이더리움과 호환, 더 오래된 방식 |

\`Wallet.generate()\`로 지갑을 만들면 기본적으로 **ed25519**가 사용됩니다. \`sEd\`로 시작하는 시드는 ed25519입니다.

### 서명 과정 단계별 보기

1. **직렬화(Serialization)**: 트랜잭션(JSON 객체)을 Xahau 프로토콜에 따라 **바이너리 형식**으로 변환합니다. 각 필드에는 타입 코드와 정해진 순서가 있습니다.

2. **해싱(Hashing)**: 직렬화된 바이너리에 해시 함수(SHA-512 half)를 적용해 **32바이트 다이제스트**를 만듭니다.

3. **서명(Signing)**: 개인 키가 그 해시에 대해 암호학적 서명을 생성합니다. 이 서명은 공개 키로만 검증할 수 있습니다.

4. **조립(Assembly)**: 서명(\`TxnSignature\`)과 공개 키(\`SigningPubKey\`)가 직렬화된 트랜잭션에 추가되어 최종 **tx_blob**가 만들어집니다.

### tx_blob: 전송 가능한 트랜잭션

\`tx_blob\`는 **트랜잭션 전체**(필드 + 서명)를 바이너리 형식으로 담은 16진수 문자열입니다. 실제로 네트워크에 보내는 것은 이것입니다:

\`\`\`
wallet.sign(prepared)
// Returns: { tx_blob: "1200002280000000...", hash: "A1B2C3..." }
\`\`\`

- **tx_blob**: 직렬화되고 서명된 트랜잭션(16진수)
- **hash**: 트랜잭션의 고유 식별자(나중에 조회할 때 사용)

### 서명 검증

노드가 tx_blob를 받으면:

1. blob를 역직렬화해 필드를 추출합니다
2. \`SigningPubKey\`와 \`TxnSignature\`를 추출합니다
3. 서명이 데이터와 공개 키에 맞는지 검증합니다
4. 공개 키가 \`Account\` 주소와 대응하는지 검증합니다
5. 모두 일치하면 트랜잭션은 유효합니다

누군가 tx_blob의 **단 1비트라도** 바꾸면 서명은 무효가 되고 트랜잭션은 거부됩니다.

### 오프라인 서명

**인터넷 연결 없이도** 트랜잭션에 서명할 수 있습니다:

1. 온라인 장치에서 \`autofill()\`로 트랜잭션을 준비합니다
2. 준비된 트랜잭션을 오프라인 장치로 옮깁니다
3. 오프라인 장치에서 \`wallet.sign()\`으로 서명합니다
4. \`tx_blob\`를 다시 온라인 장치로 옮깁니다
5. \`client.submit(tx_blob)\`로 전송합니다

이 방식은 **콜드 월렛**에 유용합니다. 개인 키가 인터넷 연결 장치에 닿지 않습니다.

### 멀티서명(MultiSign)

Xahau는 **멀티서명**을 지원합니다. **여러 계정의 서명**이 필요하도록 \`SignerListSet\`으로 구성할 수 있습니다:

- 가중치를 가진 서명자 목록(SignerList)을 정의합니다
- 최소 quorum을 설정합니다
- 각 서명자가 트랜잭션에 개별 서명합니다
- 서명들을 합쳐 함께 전송합니다
- 공동 계정, DAO, 추가 보안에 유용합니다`,
        zh: `数字签名是一种机制，用来保证**只有你本人可以从自己的账户授权交易**。理解它的工作方式，有助于你掌握 Xahau 的安全模型，并排查签名相关问题。

### 什么是数字签名？

数字签名是一种数学证明，用来说明：
1. **这笔交易是你创建的**（认证）
2. **签名后没有人修改它**（完整性）
3. **你无法否认自己签过名**（不可抵赖）

### Xahau 中的签名算法

Xahau 支持两种加密算法：

| 算法 | 种子前缀 | 特点 |
|---|---|---|
| **ed25519** | sEd... | 更快、更现代、推荐使用 |
| **secp256k1** | s...（不带 Ed） | 与 Bitcoin/Ethereum 兼容，较早期 |

当你使用 \`Wallet.generate()\` 创建钱包时，默认会使用 **ed25519**。以 \`sEd\` 开头的种子就是 ed25519。

### 签名过程逐步说明

1. **序列化**：交易（JSON 对象）会按照 Xahau 协议转换为**二进制格式**。每个字段都有自己的类型编码和固定顺序。

2. **哈希**：序列化后的二进制数据会经过哈希函数（SHA-512 half），得到一个 **32 字节摘要**。

3. **签名**：你的私钥会对这个哈希生成加密签名。该签名只能用你的公钥验证。

4. **组装**：签名（\`TxnSignature\`）和你的公钥（\`SigningPubKey\`）会被加入已序列化交易中，生成最终的 **tx_blob**。

### tx_blob：可直接发送的交易

\`tx_blob\` 是一个十六进制字符串，包含了**整笔交易**（字段 + 签名）的二进制表示。这才是真正发送到网络上的内容：

\`\`\`
wallet.sign(prepared)
// Returns: { tx_blob: "1200002280000000...", hash: "A1B2C3..." }
\`\`\`

- **tx_blob**：序列化并签名后的交易（十六进制）
- **hash**：交易的唯一标识符（之后可用来查询）

### 签名验证

当节点收到你的 tx_blob 时：

1. 它会反序列化 blob，提取各个字段
2. 提取 \`SigningPubKey\` 和 \`TxnSignature\`
3. 验证签名是否与数据和公钥匹配
4. 验证该公钥是否对应 \`Account\` 地址
5. 如果全部一致，交易就是有效的

如果有人改动 tx_blob 中**哪怕一个 bit**，签名都会失效，交易会被拒绝。

### 离线签名

你可以在**没有网络连接**的情况下签名交易：

1. 在联网设备上：用 \`autofill()\` 准备交易
2. 把准备好的交易复制到离线设备
3. 在离线设备上：用 \`wallet.sign()\` 完成签名
4. 把 \`tx_blob\` 再复制回联网设备
5. 用 \`client.submit(tx_blob)\` 发送

这对**冷钱包**非常有用，因为私钥永远不会接触联网设备。

### 多重签名（MultiSign）

Xahau 支持**多重签名**：一笔交易需要**多个账户共同签名**才有效。它通过 \`SignerListSet\` 配置：

- 你可以定义一个签名人列表（SignerList）及其权重
- 设置最小法定票数（quorum）
- 每个签名人分别对交易签名
- 所有签名会组合后一起提交
- 适用于共享账户、DAO 或额外安全防护`,
      },
      codeBlocks: [
        {
          title: {
            es: "Firma y verificación del tx_blob",
            pt: "Assinatura e verificação do tx_blob",
            en: "Signing and verifying the tx_blob",
            jp: "tx_blobの署名と検証",
            ko: "tx_blob 서명과 검증",
            zh: "tx_blob 的签名与验证",
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

  console.log("=== RESULTADO DE LA FIRMA ===");
  console.log("Hash (ID de la tx):", signed.hash);
  console.log("tx_blob completo:", signed.tx_blob);
  console.log("Longitud:", signed.tx_blob.length, "caracteres hex");
  console.log("Tamaño:", signed.tx_blob.length / 2, "bytes");

  // Verificar que la transacción es válida
  // (el nodo hace esto internamente al recibir el submit)
  console.log("=== VERIFICACIÓN ===");

  // Decodificar el blob para inspeccionar
  const decoded = client.request({
    command: "tx",
    transaction: signed.hash,
  }).catch(() => {
    // La tx aún no existe en el ledger, es normal
    console.log("La tx aún no se ha enviado (solo firmada).");
  });

  // Enviar
  console.log("Enviando tx_blob al nodo...");
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);

  // Ahora sí podemos buscarla por hash
  const txInfo = await client.request({
    command: "tx",
    transaction: signed.hash,
  });

  console.log("=== TX EN EL LEDGER ===");
  console.log("Tipo:", txInfo.result.TransactionType);
  console.log("SigningPubKey:", txInfo.result.SigningPubKey);
  console.log("Ledger:", txInfo.result.ledger_index);

  await client.disconnect();
}

firmaDetallada().catch(console.error);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function assinaturaDetalhada() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  console.log("=== INFORMAÇÃO DE A WALLET ===");
  console.log("Endereçou:", wallet.address);
  console.log("Chave pública:", wallet.publicKey);
  console.log("Algoritmo:", wallet.publicKey.startsWith("ED") ? "ed25519" : "secp256k1");
  // Construir e preparar
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  };
  const prepared = await client.autofill(tx);
  // Assinar
  const signed = wallet.sign(prepared);
  console.log("=== RESULTADO DE A ASSINATURA ===");
  console.log("Hash (ID da tx):", signed.hash);
  console.log("tx_blob completo:", signed.tx_blob);
  console.log("Longitud:", signed.tx_blob.length, "caracteres hex");
  console.log("Tamañou:", signed.tx_blob.length / 2, "bytes");
  // Verificar que a transação é válida
  // (ou nó faz isto internamente ao receber ou submit)
  console.log("=== VERIFICACIÓN ===");
  // Decodificar ou blob para inspeccionar
  const decoded = client.request({
    command: "tx",
    transaction: signed.hash,
  }).catch(() => {
    // A tx aún não existe no ledger, é normal
    console.log("A tx aún não se ha enviado (apenas assinada).");
  });
  // Enviar
  console.log("Enviando tx_blob ao nó...");
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  // Ahora sí podemos buscarla por hash
  const txInfo = await client.request({
    command: "tx",
    transaction: signed.hash,
  });
  console.log("=== TX EM O LEDGER ===");
  console.log("Tipo:", txInfo.result.TransactionType);
  console.log("SigningPubKey:", txInfo.result.SigningPubKey);
  console.log("Ledger:", txInfo.result.ledger_index);
  await client.disconnect();
}
assinaturaDetalhada().catch(console.error);`,
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

  console.log("=== SIGNATURE RESULT ===");
  console.log("Hash (tx ID):", signed.hash);
  console.log("Full tx_blob:", signed.tx_blob);
  console.log("Length:", signed.tx_blob.length, "hex characters");
  console.log("Size:", signed.tx_blob.length / 2, "bytes");

  // Verify that the transaction is valid
  // (the node does this internally upon receiving the submit)
  console.log("=== VERIFICATION ===");

  // Decode the blob to inspect
  const decoded = client.request({
    command: "tx",
    transaction: signed.hash,
  }).catch(() => {
    // The tx doesn't exist in the ledger yet, this is normal
    console.log("The tx has not been submitted yet (only signed).");
  });

  // Submit
  console.log("Sending tx_blob to the node...");
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Result:", result.result.meta.TransactionResult);

  // Now we can look it up by hash
  const txInfo = await client.request({
    command: "tx",
    transaction: signed.hash,
  });

  console.log("=== TX IN THE LEDGER ===");
  console.log("Type:", txInfo.result.TransactionType);
  console.log("SigningPubKey:", txInfo.result.SigningPubKey);
  console.log("Ledger:", txInfo.result.ledger_index);

  await client.disconnect();
}

firmaDetallada().catch(console.error);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function detailedSigning() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  console.log("=== ウォレット情報 ===");
  console.log("アドレス：", wallet.address);
  console.log("公開鍵：", wallet.publicKey);
  console.log("アルゴリズム：", wallet.publicKey.startsWith("ED") ? "ed25519" : "secp256k1");

  // 構築と準備
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  };

  const prepared = await client.autofill(tx);

  // 署名
  const signed = wallet.sign(prepared);

  console.log("=== 署名結果 ===");
  console.log("ハッシュ（トランザクションID）：", signed.hash);
  console.log("完全なtx_blob：", signed.tx_blob);
  console.log("長さ：", signed.tx_blob.length, "16進数文字");
  console.log("サイズ：", signed.tx_blob.length / 2, "バイト");

  // トランザクションが有効であることを確認
  // （ノードはsubmitを受信すると内部でこれを行う）
  console.log("=== 検証 ===");

  // blobをデコードして確認
  const decoded = client.request({
    command: "tx",
    transaction: signed.hash,
  }).catch(() => {
    // txはまだレジャーに存在しない、これは正常
    console.log("txはまだ送信されていません（署名のみ）。");
  });

  // 送信
  console.log("ノードにtx_blobを送信中...");
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("結果：", result.result.meta.TransactionResult);

  // ハッシュで検索できるようになった
  const txInfo = await client.request({
    command: "tx",
    transaction: signed.hash,
  });

  console.log("=== レジャー内のトランザクション ===");
  console.log("タイプ：", txInfo.result.TransactionType);
  console.log("SigningPubKey：", txInfo.result.SigningPubKey);
  console.log("レジャー：", txInfo.result.ledger_index);

  await client.disconnect();
}

detailedSigning().catch(console.error);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function detailedSigning() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  console.log("=== 지갑 정보 ===");
  console.log("주소:", wallet.address);
  console.log("공개 키:", wallet.publicKey);
  console.log("알고리즘:", wallet.publicKey.startsWith("ED") ? "ed25519" : "secp256k1");

  // 구성 및 준비
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  };

  const prepared = await client.autofill(tx);

  // 서명
  const signed = wallet.sign(prepared);

  console.log("=== 서명 결과 ===");
  console.log("Hash (tx ID):", signed.hash);
  console.log("전체 tx_blob:", signed.tx_blob);
  console.log("길이:", signed.tx_blob.length, "hex 문자");
  console.log("크기:", signed.tx_blob.length / 2, "bytes");

  // 트랜잭션 유효성 확인
  // (노드는 submit을 받으면 내부적으로 이것을 수행)
  console.log("=== 검증 ===");

  // blob를 확인하기 위한 조회
  const decoded = client.request({
    command: "tx",
    transaction: signed.hash,
  }).catch(() => {
    // tx가 아직 ledger에 없음. 정상
    console.log("tx는 아직 제출되지 않았습니다 (서명만 완료).");
  });

  // 제출
  console.log("노드에 tx_blob 전송 중...");
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("결과:", result.result.meta.TransactionResult);

  // 이제 hash로 조회 가능
  const txInfo = await client.request({
    command: "tx",
    transaction: signed.hash,
  });

  console.log("=== LEDGER 안의 TX ===");
  console.log("유형:", txInfo.result.TransactionType);
  console.log("SigningPubKey:", txInfo.result.SigningPubKey);
  console.log("Ledger:", txInfo.result.ledger_index);

  await client.disconnect();
}

detailedSigning().catch(console.error);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function detailedSigning() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  console.log("=== 钱包信息 ===");
  console.log("地址：", wallet.address);
  console.log("公钥：", wallet.publicKey);
  console.log("算法：", wallet.publicKey.startsWith("ED") ? "ed25519" : "secp256k1");

  // 构建并准备交易
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  };

  const prepared = await client.autofill(tx);

  // 签名
  const signed = wallet.sign(prepared);

  console.log("=== 签名结果 ===");
  console.log("Hash（交易 ID）：", signed.hash);
  console.log("完整 tx_blob：", signed.tx_blob);
  console.log("长度：", signed.tx_blob.length, "个十六进制字符");
  console.log("大小：", signed.tx_blob.length / 2, "bytes");

  // 验证交易是否有效
  // （节点在收到 submit 时会在内部执行）
  console.log("=== 验证 ===");

  // 尝试按 hash 查询以检查状态
  const decoded = client.request({
    command: "tx",
    transaction: signed.hash,
  }).catch(() => {
    // 交易还未进入账本，这是正常现象
    console.log("该交易尚未提交到网络（当前仅完成签名）。");
  });

  // 提交
  console.log("正在将 tx_blob 发送到节点...");
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("结果：", result.result.meta.TransactionResult);

  // 现在可以通过 hash 查询
  const txInfo = await client.request({
    command: "tx",
    transaction: signed.hash,
  });

  console.log("=== 账本中的交易 ===");
  console.log("类型：", txInfo.result.TransactionType);
  console.log("SigningPubKey：", txInfo.result.SigningPubKey);
  console.log("Ledger：", txInfo.result.ledger_index);

  await client.disconnect();
}

detailedSigning().catch(console.error);`,
          },
        },
        {
          title: {
            es: "Firma offline: preparar en un lado, firmar en otro",
            pt: "Assinatura offline: preparar em um lado, assinar em otro",
            en: "Offline signing: prepare on one side, sign on another",
            jp: "オフライン署名：一方で準備し、他方で署名",
            ko: "오프라인 서명: 한쪽에서 준비, 다른 쪽에서 서명",
            zh: "离线签名：一边准备，另一边签名",
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

  console.log("=== COPIA ESTE tx_blob AL DISPOSITIVO CONECTADO ===");
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
  console.log("Resultado:", result.result.meta.TransactionResult);

  await client.disconnect();
}

// Demo del flujo completo (en un solo script para simplicidad)
async function demo() {
  const prepared = await prepararOnline();
  const signed = firmarOffline(prepared);
  await enviarOnline(signed.tx_blob);
}

demo().catch(console.error);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
// =============================================
// PASSO 1: No dispositivo CONECTADO
// Preparar a transação (precisa de conexão)
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
  // Salvar como JSON para transferir ao dispositivo offline
  const txParaFirmar = JSON.stringify(prepared, null, 2);
  console.log("=== COPIA ESTE JSON AO DISPOSITIVO OFFLINE ===");
  console.log(txParaFirmar);
  return prepared;
}
// =============================================
// PASSO 2: No dispositivo OFFLINE (sem internet)
// Assinar a transação
// =============================================
function firmarOffline(preparedJSON) {
  // A chave privada APENAS existe no dispositivo offline
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  const signed = wallet.sign(preparedJSON);
  console.log("=== COPIA ESTE tx_blob AO DISPOSITIVO CONECTADO ===");
  console.log("tx_blob:", signed.tx_blob);
  console.log("hash:", signed.hash);
  return signed;
}
// =============================================
// PASSO 3: No dispositivo CONECTADO
// Enviar a transação assinada
// =============================================
async function enviarOnline(txBlob) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const result = await client.submitAndWait(txBlob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  await client.disconnect();
}
// Demo do flujo completo (em um apenas script para simplicidad)
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
async function prepareOnline() {
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
function signOffline(preparedJSON) {
  // The private key ONLY exists on the offline device
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const signed = wallet.sign(preparedJSON);

  console.log("=== COPY THIS tx_blob TO THE CONNECTED DEVICE ===");
  console.log("tx_blob:", signed.tx_blob);
  console.log("hash:", signed.hash);

  return signed;
}

// =============================================
// STEP 3: On the CONNECTED device
// Submit the signed transaction
// =============================================
async function sendOnline(txBlob) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const result = await client.submitAndWait(txBlob);
  console.log("Result:", result.result.meta.TransactionResult);

  await client.disconnect();
}

// Demo of the complete flow (in a single script for simplicity)
async function demo() {
  const prepared = await prepareOnline();
  const signed = signOffline(prepared);
  await sendOnline(signed.tx_blob);
}

demo().catch(console.error);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// =============================================
// ステップ1：接続デバイスで
// トランザクションを準備（接続が必要）
// =============================================
async function prepareOnline() {
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

  // オフラインデバイスに転送するためJSONとして保存
  const txToSign = JSON.stringify(prepared, null, 2);
  console.log("=== このJSONをオフラインデバイスにコピー ===");
  console.log(txToSign);

  return prepared;
}

// =============================================
// ステップ2：オフラインデバイスで（インターネットなし）
// トランザクションに署名
// =============================================
function signOffline(preparedJSON) {
  // 秘密鍵はオフラインデバイスにのみ存在する
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const signed = wallet.sign(preparedJSON);

  console.log("=== このtx_blobを接続デバイスにコピー ===");
  console.log("tx_blob：", signed.tx_blob);
  console.log("hash：", signed.hash);

  return signed;
}

// =============================================
// ステップ3：接続デバイスで
// 署名済みトランザクションを送信
// =============================================
async function sendOnline(txBlob) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const result = await client.submitAndWait(txBlob);
  console.log("結果：", result.result.meta.TransactionResult);

  await client.disconnect();
}

// 完全フローのデモ（シンプルさのため1スクリプトで）
async function demo() {
  const prepared = await prepareOnline();
  const signed = signOffline(prepared);
  await sendOnline(signed.tx_blob);
}

demo().catch(console.error);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// =============================================
// STEP 1: 온라인 장치에서
// 트랜잭션 준비 (연결 필요)
// =============================================
async function prepareOnline() {
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

  // 오프라인 장치로 옮기기 위해 JSON으로 저장
  const txToSign = JSON.stringify(prepared, null, 2);
  console.log("=== 이 JSON을 오프라인 장치로 복사하세요 ===");
  console.log(txToSign);

  return prepared;
}

// =============================================
// STEP 2: 오프라인 장치에서 (인터넷 없음)
// 트랜잭션 서명
// =============================================
function signOffline(preparedJSON) {
  // 개인 키는 오프라인 장치에만 존재
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const signed = wallet.sign(preparedJSON);

  console.log("=== 이 tx_blob를 온라인 장치로 복사하세요 ===");
  console.log("tx_blob:", signed.tx_blob);
  console.log("hash:", signed.hash);

  return signed;
}

// =============================================
// STEP 3: 온라인 장치에서
// 서명된 트랜잭션 전송
// =============================================
async function sendOnline(txBlob) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const result = await client.submitAndWait(txBlob);
  console.log("결과:", result.result.meta.TransactionResult);

  await client.disconnect();
}

// 전체 흐름 데모 (간단히 한 스크립트로)
async function demo() {
  const prepared = await prepareOnline();
  const signed = signOffline(prepared);
  await sendOnline(signed.tx_blob);
}

demo().catch(console.error);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// =============================================
// 第 1 步：在联网设备上
// 准备交易（需要联网）
// =============================================
async function prepareOnline() {
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

  // 保存为 JSON，以便传到离线设备
  const txToSign = JSON.stringify(prepared, null, 2);
  console.log("=== 把这段 JSON 复制到离线设备 ===");
  console.log(txToSign);

  return prepared;
}

// =============================================
// 第 2 步：在离线设备上（无网络）
// 对交易进行签名
// =============================================
function signOffline(preparedJSON) {
  // 私钥只存在于离线设备
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const signed = wallet.sign(preparedJSON);

  console.log("=== 把这个 tx_blob 复制回联网设备 ===");
  console.log("tx_blob:", signed.tx_blob);
  console.log("hash:", signed.hash);

  return signed;
}

// =============================================
// 第 3 步：在联网设备上
// 提交已签名交易
// =============================================
async function sendOnline(txBlob) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const result = await client.submitAndWait(txBlob);
  console.log("结果:", result.result.meta.TransactionResult);

  await client.disconnect();
}

// 完整流程演示（为了简单放在一个脚本里）
async function demo() {
  const prepared = await prepareOnline();
  const signed = signOffline(prepared);
  await sendOnline(signed.tx_blob);
}

demo().catch(console.error);`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es una firma digital?", pt: "¿Qué é uma assinatura digital?", en: "What is a digital signature?", jp: "デジタル署名とは？", ko: "디지털 서명이란?", zh: "什么是数字签名？" },
          content: {
            es: "Prueba matemática de que:\n\n• Tú creaste la transacción (autenticación)\n• Nadie la modificó (integridad)\n• No puedes negar haberla firmado (no repudio)\n\nAlgoritmos: ed25519 (sEd...) o secp256k1 (s...)",
            pt: "Prova matemática de que:\n\n• Você criou a transação (autenticação)\n• Ninguém a modificou (integridade)\n• Você não pode negar que a assinou (não repúdio)\n\nAlgoritmos: ed25519 (sEd...) ou secp256k1 (s...)",
            en: "Mathematical proof that:\n\n• You created the transaction (authentication)\n• No one modified it (integrity)\n• You cannot deny having signed it (non-repudiation)\n\nAlgorithms: ed25519 (sEd...) or secp256k1 (s...)",
            jp: "以下を証明する数学的証明：\n\n• あなたがトランザクションを作成（認証）\n• 誰も変更していない（完全性）\n• 署名したことを否定できない（否認不可）\n\nアルゴリズム：ed25519（sEd...）またはsecp256k1（s...）",
            ko: "다음을 증명하는 수학적 증거:\n\n• 본인이 트랜잭션을 만들었다 (인증)\n• 누구도 수정하지 않았다 (무결성)\n• 서명 사실을 부인할 수 없다 (부인 방지)\n\n알고리즘: ed25519 (sEd...) 또는 secp256k1 (s...)",
            zh: "一种数学证明，用来说明：\n\n• 交易是你创建的（认证）\n• 没有人修改过它（完整性）\n• 你无法否认自己签过名（不可抵赖）\n\n算法：ed25519（sEd...）或 secp256k1（s...）",
          },
          visual: "🔏",
        },
        {
          title: { es: "El proceso de firma", pt: "O processo de assinatura", en: "The signing process", jp: "署名プロセス", ko: "서명 과정", zh: "签名过程" },
          content: {
            es: "1. Serializar → JSON a binario\n2. Hash → SHA-512 half (32 bytes)\n3. Firmar → Clave privada genera firma\n4. Ensamblar → tx_blob (hex)\n\nwallet.sign(prepared)\n→ { tx_blob: \"1200...\", hash: \"A1B2...\" }",
            pt: "1. Serializar → JSON para binário\n2. Hash → SHA-512 half (32 bytes)\n3. Assinar → Chave privada gera assinatura\n4. Montar → tx_blob (hex)\n\nwallet.sign(prepared)\n→ { tx_blob: \"1200...\", hash: \"A1B2...\" }",
            en: "1. Serialize → JSON to binary\n2. Hash → SHA-512 half (32 bytes)\n3. Sign → Private key generates signature\n4. Assemble → tx_blob (hex)\n\nwallet.sign(prepared)\n→ { tx_blob: \"1200...\", hash: \"A1B2...\" }",
            jp: "1. シリアライズ → JSONをバイナリに\n2. ハッシュ → SHA-512 half（32バイト）\n3. 署名 → 秘密鍵が署名を生成\n4. アセンブリ → tx_blob（16進数）\n\nwallet.sign(prepared)\n→ { tx_blob: \"1200...\", hash: \"A1B2...\" }",
            ko: "1. 직렬화 → JSON을 바이너리로\n2. 해시 → SHA-512 half (32 bytes)\n3. 서명 → 개인 키로 서명 생성\n4. 조립 → tx_blob (hex)\n\nwallet.sign(prepared)\n→ { tx_blob: \"1200...\", hash: \"A1B2...\" }",
            zh: "1. 序列化 → JSON 转为二进制\n2. 哈希 → SHA-512 half（32 bytes）\n3. 签名 → 私钥生成签名\n4. 组装 → tx_blob（hex）\n\nwallet.sign(prepared)\n→ { tx_blob: \"1200...\", hash: \"A1B2...\" }",
          },
          visual: "🔐",
        },
        {
          title: { es: "Firma offline y multi-firma", pt: "Assinatura offline e multiassinatura", en: "Offline signing and multi-signing", jp: "オフライン署名とマルチ署名", ko: "오프라인 서명과 멀티서명", zh: "离线签名与多重签名" },
          content: {
            es: "Firma offline (cold wallet):\n• Preparar online → Firmar offline → Enviar online\n• Claves nunca tocan internet\n\nMulti-firma (MultiSign):\n• Múltiples firmantes con pesos\n• Quórum mínimo configurable\n• Ideal para cuentas compartidas",
            pt: "Assinatura offline (cold wallet):\n• Preparar online → Assinar offline → Enviar online\n• Chaves nunca tocam a internet\n\nMulti-assinatura (MultiSign):\n• Múltiplos signatários com pesos\n• Quórum mínimo configurável\n• Ideal para contas compartilhadas",
            en: "Offline signing (cold wallet):\n• Prepare online → Sign offline → Submit online\n• Keys never touch the internet\n\nMulti-signing (MultiSign):\n• Multiple signers with weights\n• Configurable minimum quorum\n• Ideal for shared accounts",
            jp: "オフライン署名（コールドウォレット）：\n• オンライン準備 → オフライン署名 → オンライン送信\n• 秘密鍵がインターネットに触れない\n\nマルチ署名（MultiSign）：\n• 重み付き複数署名者\n• 設定可能な最小クォーラム\n• 共有アカウントに最適",
            ko: "오프라인 서명 (콜드 월렛):\n• 온라인 준비 → 오프라인 서명 → 온라인 제출\n• 키가 인터넷에 닿지 않음\n\n멀티서명 (MultiSign):\n• 가중치를 가진 여러 서명자\n• 최소 quorum 설정 가능\n• 공동 계정에 적합",
            zh: "离线签名（冷钱包）：\n• 在线准备 → 离线签名 → 在线提交\n• 私钥永不接触互联网\n\n多重签名（MultiSign）：\n• 多个签名人及其权重\n• 最小 quorum 可配置\n• 非常适合共享账户",
          },
          visual: "🧊",
        },
      ],
    },
    {
      id: "m5bl4",
      title: {
        es: "Envío, validación y resultados",
        pt: "Envio, validação e resultados",
        en: "Submission, validation and results",
        jp: "送信、検証、結果",
        ko: "제출, 검증, 결과",
        zh: "提交、验证与结果",
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

### tes: Éxito

\`tesSUCCESS\` es el único código de éxito. Significa que la transacción se procesó correctamente y los cambios se aplicaron al ledger.

### tec: Transacción incluida pero falló

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

### tef: Error antes del procesamiento

Los códigos \`tef\` indican que la transacción fue **rechazada antes de ser procesada**. El fee **no se cobra**:

| Código | Significado |
|---|---|
| **tefPAST_SEQ** | El Sequence ya se usó (transacción duplicada) |
| **tefMAX_LEDGER** | LastLedgerSequence ya pasó (transacción caducada) |
| **tefALREADY** | La transacción ya está en la cola |

### tem: Error de formato

Los códigos \`tem\` indican que la transacción está **mal formada** y nunca podría ser válida:

| Código | Significado |
|---|---|
| **temMALFORMED** | Campos inválidos o formato incorrecto |
| **temBAD_AMOUNT** | Cantidad inválida (negativa, cero en XAH, etc.) |
| **temBAD_FEE** | Fee inválido |
| **temDISABLED** | La funcionalidad está desactivada en esta red |
| **temINVALID_FLAG** | Flag no válido para este tipo de transacción |

### ter: Error temporal (reintentar)

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
        pt: `Depois que a transação é assinada, é preciso enviá-la à rede e entender os possíveis resultados. A Xahau tem um sistema de **códigos de resultado** muito detalhado que indica exatamente o que aconteceu.
### submit vs submitAndWait
A biblioteca \`xahau\` oferece dois métodos para enviar transações:
**client.submit(tx_blob)**:
- Envia a transação e retorna **imediatamente**
- O resultado preliminar indica se a transação foi aceita pelo nó (não se foi validada)
- Você precisa consultar depois com \`tx\` para ver o resultado final
- Útil quando você quer enviar muitas transações rapidamente
**client.submitAndWait(tx_blob)**:
- Envia a transação e **espera** até que seja incluída em um ledger validado
- Retorna o resultado final diretamente
- Mais cômodo para a maioria de casos
- Pode levar 3-10 segundos (1-2 ledgers)
### Categorias de códigos de resultado
Os resultados de uma transação se dividem em categorias conforme seu **prefixo**:
### tes: Sucesso
\`tesSUCCESS\` é o único código de sucesso. Significa que a transação foi processada corretamente e as alterações foram aplicadas ao ledger.
### tec: Transação incluída mas falhou
Os códigos \`tec\` significam que a transação foi **incluída em um ledger** (e o fee foi cobrado), mas a operação **não foi executada**:
| Código | Significado |
|---|---|
| **tecUNFUNDED_PAYMENT** | Não há saldo suficiente para o pagamento |
| **tecNO_LINE** | Não existe trust line para o token |
| **tecNO_DST** | A conta de destino não existe |
| **tecDST_TAG_NEEDED** | A conta de destino exige DestinationTag |
| **tecNO_PERMISSION** | No tems permiso para esta operação |
| **tecINSUFFICIENT_RESERVE** | No tems suficiente XAH para a reserva do novo objeto |
| **tecPATH_DRY** | Não foi encontrada uma rota de pagamento viável |
| **tecKILLED** | Oferta cancelada por flag tfFillOrKill |
**Importante**: Em os erros \`tec\`, o fee **sí é cobrado** aunque a operação falle.
### tef: Erro antes do processamento
Os códigos \`tef\` indican que a transação foi **rejeitada antes de ser processada**. O fee **no é cobrado**:
| Código | Significado |
|---|---|
| **tefPAST_SEQ** | O Sequence ya se usó (transação duplicada) |
| **tefMAX_LEDGER** | LastLedgerSequence ya pasó (transação caducada) |
| **tefALREADY** | A transação ya está na cola |
### tem: Erro de formato
Os códigos \`tem\` indican que a transação está **malformada** e nunca poderia ser válida:
| Código | Significado |
|---|---|
| **temMALFORMED** | Campos inválidos ou formato incorreto |
| **temBAD_AMOUNT** | Quantidade inválida (negativa, cero em XAH, etc.) |
| **temBAD_FEE** | Fee inválido |
| **temDISABLED** | A funcionalidade está desativada em esta rede |
| **temINVALID_FLAG** | Flag no válido para este tipo de transação |
### ter: Erro temporário (tente novamente)
Os códigos \`ter\` indicam um erro **temporário** que pode ser resolvido ao tentar novamente:
| Código | Significado |
|---|---|
| **terPRE_SEQ** | Há uma transação anterior pendente (Sequence anterior) |
| **terQUEUED** | A transação está em cola esperando (demasiadas em vuelo) |
| **terINSUF_FEE_B** | Fee insuficiente para a carga atual |
### Ler o resultado completo
O objeto de resultado contem toda a informação que você precisa:
\`\`\`
result.result.meta.TransactionResult  → O código (tesSUCCESS, etc.)
result.result.meta.AffectedNodes      → Qué mudou no ledger
result.result.ledger_index             → Em qué ledger se incluyó
result.result.hash                     → Hash único da transação
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

### tes: Success

\`tesSUCCESS\` is the only success code. It means the transaction was processed correctly and the changes were applied to the ledger.

### tec: Transaction included but failed

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

### tef: Error before processing

\`tef\` codes indicate the transaction was **rejected before being processed**. The fee is **not charged**:

| Code | Meaning |
|---|---|
| **tefPAST_SEQ** | The Sequence was already used (duplicate transaction) |
| **tefMAX_LEDGER** | LastLedgerSequence has already passed (expired transaction) |
| **tefALREADY** | The transaction is already in the queue |

### tem: Malformed error

\`tem\` codes indicate the transaction is **malformed** and could never be valid:

| Code | Meaning |
|---|---|
| **temMALFORMED** | Invalid fields or incorrect format |
| **temBAD_AMOUNT** | Invalid amount (negative, zero in XAH, etc.) |
| **temBAD_FEE** | Invalid fee |
| **temDISABLED** | The feature is disabled on this network |
| **temINVALID_FLAG** | Invalid flag for this transaction type |

### ter: Temporary error (retry)

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
        jp: `トランザクションに署名したら、ネットワークに送信して可能な結果を理解する必要があります。Xahauには、何が起きたかを正確に教える非常に詳細な**結果コード**システムがあります。

### submit対submitAndWait

\`xahau\`ライブラリはトランザクション送信に次の2つのメソッドを提供します。

**client.submit(tx_blob)**：
- トランザクションを送信して**即座に**返します
- 暫定結果はノードがトランザクションを受け入れたかどうかを示します（検証されたかどうかではない）
- 最終結果を見るには後で\`tx\`でクエリする必要があります
- 多くのトランザクションを素早く送信したい時に便利

**client.submitAndWait(tx_blob)**：
- トランザクションを送信して、検証済みレジャーに含まれるまで**待機**します
- 最終結果を直接返します
- ほとんどの場合に便利
- 3〜10秒かかる可能性があります（1〜2レジャー）

### 結果コードのカテゴリ

トランザクション結果は**接頭辞**に基づいてカテゴリに分けられます：

### tes：成功

\`tesSUCCESS\`は唯一の成功コードです。トランザクションが正常に処理され、変更がレジャーに適用されたことを意味します。

### tec：含まれたが失敗

\`tec\`コードは、トランザクションが**レジャーに含まれた**（Feeが徴収された）が、操作が**実行されなかった**ことを意味します：

| コード | 意味 |
|---|---|
| **tecUNFUNDED_PAYMENT** | 支払いのための残高が不足 |
| **tecNO_LINE** | トークンのトラストラインが存在しない |
| **tecNO_DST** | 宛先アカウントが存在しない |
| **tecDST_TAG_NEEDED** | 宛先アカウントがDestinationTagを必要とする |
| **tecNO_PERMISSION** | この操作の権限がない |
| **tecINSUFFICIENT_RESERVE** | 新しいオブジェクトのリザーブに十分なXAHがない |
| **tecPATH_DRY** | 実行可能な支払いルートが見つからない |
| **tecKILLED** | tfFillOrKillフラグによりオファーがキャンセル |

**重要**：\`tec\`エラーでは、操作が失敗しても**Feeは徴収されます**。

### tef：処理前のエラー

\`tef\`コードはトランザクションが**処理される前に拒否された**ことを示します。Feeは**徴収されません**：

| コード | 意味 |
|---|---|
| **tefPAST_SEQ** | Sequenceがすでに使用済み（重複トランザクション） |
| **tefMAX_LEDGER** | LastLedgerSequenceがすでに過去（トランザクション期限切れ） |
| **tefALREADY** | トランザクションはすでにキューにある |

### tem：形式エラー

\`tem\`コードはトランザクションが**不正な形式**で、有効になり得ないことを示します：

| コード | 意味 |
|---|---|
| **temMALFORMED** | 無効なフィールドまたは不正な形式 |
| **temBAD_AMOUNT** | 無効な金額（負数、XAHでゼロなど） |
| **temBAD_FEE** | 無効なFee |
| **temDISABLED** | このネットワークで機能が無効 |
| **temINVALID_FLAG** | このトランザクションタイプに対して無効なフラグ |

### ter：一時的エラー（リトライ）

\`ter\`コードはリトライすれば解決するかもしれない**一時的な**エラーを示します：

| コード | 意味 |
|---|---|
| **terPRE_SEQ** | 前のトランザクションが保留中（前のSequence） |
| **terQUEUED** | トランザクションはキューで待機中（処理中のトランザクションが多すぎる） |
| **terINSUF_FEE_B** | 現在の負荷に対してFeeが不足 |

### 完全な結果の読み取り

結果オブジェクトには必要なすべての情報が含まれています。

\`\`\`
result.result.meta.TransactionResult  → コード（tesSUCCESSなど）
result.result.meta.AffectedNodes      → レジャーで何が変わったか
result.result.ledger_index             → どのレジャーに含まれたか
result.result.hash                     → トランザクションの一意ハッシュ
\`\`\``,
        ko: `트랜잭션에 서명했다면, 이제 네트워크에 제출하고 가능한 결과를 이해해야 합니다. Xahau는 **결과 코드** 체계가 매우 상세해서 정확히 무엇이 일어났는지 알려 줍니다.

### submit vs submitAndWait

\`xahau\` 라이브러리는 트랜잭션 전송에 두 가지 메서드를 제공합니다:

**client.submit(tx_blob)**:
- 트랜잭션을 보내고 **즉시** 반환합니다
- 예비 결과는 노드가 트랜잭션을 받아들였는지만 알려 줍니다 (검증 여부는 아님)
- 최종 결과를 보려면 나중에 \`tx\`로 조회해야 합니다
- 많은 트랜잭션을 빠르게 보낼 때 유용합니다

**client.submitAndWait(tx_blob)**:
- 트랜잭션을 보내고 검증된 ledger에 포함될 때까지 **대기**합니다
- 최종 결과를 바로 반환합니다
- 대부분의 경우 더 편리합니다
- 3~10초 정도 걸릴 수 있습니다 (1~2 ledger)

### 결과 코드 분류

트랜잭션 결과는 **접두사**에 따라 나뉩니다:

### tes: 성공

\`tesSUCCESS\`는 유일한 성공 코드입니다. 트랜잭션이 정상 처리되어 ledger에 변경이 적용되었다는 뜻입니다.

### tec: ledger에는 포함됐지만 실패

\`tec\` 코드는 트랜잭션이 **ledger에 포함되었고** (fee도 청구됨), 그러나 실제 동작은 **수행되지 않았다**는 의미입니다:

| 코드 | 의미 |
|---|---|
| **tecUNFUNDED_PAYMENT** | 결제에 필요한 잔액 부족 |
| **tecNO_LINE** | 해당 토큰의 trust line이 없음 |
| **tecNO_DST** | 목적지 계정이 존재하지 않음 |
| **tecDST_TAG_NEEDED** | 목적지 계정이 DestinationTag를 요구함 |
| **tecNO_PERMISSION** | 이 작업에 대한 권한이 없음 |
| **tecINSUFFICIENT_RESERVE** | 새 객체 reserve에 필요한 XAH 부족 |
| **tecPATH_DRY** | 유효한 결제 경로를 찾지 못함 |
| **tecKILLED** | tfFillOrKill 플래그 때문에 오퍼 취소 |

**중요**: \`tec\` 오류에서는 동작이 실패해도 fee는 **청구됩니다**.

### tef: 처리 전 거부

\`tef\` 코드는 트랜잭션이 **처리되기 전에 거부되었다**는 뜻입니다. fee는 **청구되지 않습니다**:

| 코드 | 의미 |
|---|---|
| **tefPAST_SEQ** | Sequence가 이미 사용됨 (중복 tx) |
| **tefMAX_LEDGER** | LastLedgerSequence가 이미 지남 (만료 tx) |
| **tefALREADY** | 트랜잭션이 이미 큐에 있음 |

### tem: 형식 오류

\`tem\` 코드는 트랜잭션 형식이 **잘못되어** 유효할 수 없다는 뜻입니다:

| 코드 | 의미 |
|---|---|
| **temMALFORMED** | 잘못된 필드 또는 형식 |
| **temBAD_AMOUNT** | 잘못된 금액 (음수, XAH에서 0 등) |
| **temBAD_FEE** | 잘못된 fee |
| **temDISABLED** | 이 네트워크에서 기능이 비활성화됨 |
| **temINVALID_FLAG** | 이 유형에 유효하지 않은 flag |

### ter: 일시적 오류 (재시도 가능)

\`ter\` 코드는 재시도하면 해결될 수 있는 **일시적** 오류입니다:

| 코드 | 의미 |
|---|---|
| **terPRE_SEQ** | 이전 Sequence 트랜잭션이 대기 중 |
| **terQUEUED** | 트랜잭션이 큐에서 대기 중 (동시 진행 tx 과다) |
| **terINSUF_FEE_B** | 현재 부하에 비해 fee 부족 |

### 전체 결과 읽기

결과 객체에는 필요한 정보가 모두 들어 있습니다:

\`\`\`
result.result.meta.TransactionResult  → 코드 (tesSUCCESS 등)
result.result.meta.AffectedNodes      → ledger에서 무엇이 바뀌었는지
result.result.ledger_index             → 어떤 ledger에 포함됐는지
result.result.hash                     → 고유 트랜잭션 hash
\`\`\``,
        zh: `交易签名完成后，下一步就是将它发送到网络，并理解可能出现的结果。Xahau 拥有一套非常详细的**结果代码**系统，可以准确告诉你发生了什么。

### submit 与 submitAndWait

\`xahau\` 库提供两种提交交易的方法：

**client.submit(tx_blob)**：
- 发送交易后会**立即**返回
- 返回的是初步结果，只表示节点是否接受了该交易（不代表已验证）
- 你之后还需要通过 \`tx\` 查询最终结果
- 适合需要快速发送大量交易的场景

**client.submitAndWait(tx_blob)**：
- 发送交易后会**等待**它被写入已验证账本
- 直接返回最终结果
- 对大多数场景更方便
- 通常需要 3 到 10 秒（1 到 2 个账本周期）

### 结果代码分类

交易结果会根据其**前缀**分成不同类别：

### tes：成功

\`tesSUCCESS\` 是唯一的成功代码，表示交易已被正确处理，变更已写入账本。

### tec：交易已被纳入，但执行失败

\`tec\` 代码表示交易**已经被写入账本**（而且 fee 已收取），但实际操作**没有执行成功**：

| 代码 | 含义 |
|---|---|
| **tecUNFUNDED_PAYMENT** | 余额不足，无法完成支付 |
| **tecNO_LINE** | 该代币不存在 trust line |
| **tecNO_DST** | 目标账户不存在 |
| **tecDST_TAG_NEEDED** | 目标账户要求 DestinationTag |
| **tecNO_PERMISSION** | 你没有执行该操作的权限 |
| **tecINSUFFICIENT_RESERVE** | 没有足够的 XAH 来满足新对象的 reserve |
| **tecPATH_DRY** | 没有找到可行的支付路径 |
| **tecKILLED** | 报价因 tfFillOrKill 标志被取消 |

**重要**：出现 \`tec\` 错误时，即使操作失败，fee **仍然会被收取**。

### tef：处理前被拒绝

\`tef\` 代码表示交易在**真正处理之前就被拒绝**。这种情况下 fee **不会被收取**：

| 代码 | 含义 |
|---|---|
| **tefPAST_SEQ** | Sequence 已被使用（重复交易） |
| **tefMAX_LEDGER** | LastLedgerSequence 已经过期 |
| **tefALREADY** | 该交易已在队列中 |

### tem：格式错误

\`tem\` 代码表示交易**格式不正确**，因此永远不可能有效：

| 代码 | 含义 |
|---|---|
| **temMALFORMED** | 字段无效或格式错误 |
| **temBAD_AMOUNT** | 金额无效（负数、XAH 为 0 等） |
| **temBAD_FEE** | Fee 无效 |
| **temDISABLED** | 当前网络禁用了该功能 |
| **temINVALID_FLAG** | 此类交易使用了无效 flag |

### ter：临时错误（可重试）

\`ter\` 代码表示一种**临时性**错误，稍后重试可能解决：

| 代码 | 含义 |
|---|---|
| **terPRE_SEQ** | 前一个 Sequence 的交易仍在等待中 |
| **terQUEUED** | 交易正在队列中等待（同时在途交易过多） |
| **terINSUF_FEE_B** | 以当前网络负载来看 fee 不足 |

### 读取完整结果

结果对象中包含了你需要的全部信息：

\`\`\`
result.result.meta.TransactionResult  → 结果代码（tesSUCCESS 等）
result.result.meta.AffectedNodes      → 账本中发生了哪些变化
result.result.ledger_index             → 被纳入了哪个账本
result.result.hash                     → 交易唯一 hash
\`\`\``,
      },
      codeBlocks: [
        {
          title: {
            es: "Manejar todos los tipos de resultado",
            pt: "Tratar todos os tipos de resultado",
            en: "Handle all result types",
            jp: "すべての結果タイプの処理",
            ko: "모든 결과 유형 처리하기",
            zh: "处理所有结果类型",
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
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function enviarComTratamento() {
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
    // Analizar o resultado por categoría
    if (codigo === "tesSUCCESS") {
      console.log("ÉXITO: Transação processada corretamente.");
      console.log("Ledger:", result.result.ledger_index);
      console.log("Hash:", signed.hash);
    } else if (codigo.startsWith("tec")) {
      // A tx foi incluída no ledger, mas a operação falhou
      // O fee SÍ foi cobrado
      console.log("FALLO (tec):", codigo);
      console.log("A operação não foi executada, mas o fee foi cobrado.");
      // Diagnóstico específico
      switch (codigo) {
        case "tecUNFUNDED_PAYMENT":
          console.log("→ Não tems suficiente saldo.");
          break;
        case "tecNO_DST":
          console.log("→ A conta de destino não existe.");
          break;
        case "tecDST_TAG_NEEDED":
          console.log("→ Faltao DestinationTag.");
          break;
        case "tecINSUFFICIENT_RESERVE":
          console.log("→ Não tems suficiente XAH parà reserva.");
          break;
        default:
          console.log("→ Consultà documentación para:", codigo);
      }
    } else if (codigo.startsWith("tef")) {
      console.log("REJEITADA (tef):", codigo);
      console.log("A transação foi rejeitada antes de procesarse.");
      console.log("O fee NÃO foi cobrado.");
    } else if (codigo.startsWith("tem")) {
      console.log("MAL FORMADA (tem):", codigo);
      console.log("A transação tem um erro de formato.");
      console.log("Revisa os campos e os valores.");
    } else if (codigo.startsWith("ter")) {
      console.log("ERRO TEMPORAL (ter):", codigo);
      console.log("Você pode tente novamenter em unos segundos.");
    }
  } catch (error) {
    console.error("Erro de conexão ou envíou:", error.message);
  }
  await client.disconnect();
}
enviarComTratamento().catch(console.error);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function sendChecking() {
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

sendChecking().catch(console.error);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function sendWithHandling() {
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

    const code = result.result.meta.TransactionResult;

    // カテゴリ別に結果を分析
    if (code === "tesSUCCESS") {
      console.log("成功：トランザクションが正常に処理されました。");
      console.log("レジャー：", result.result.ledger_index);
      console.log("ハッシュ：", signed.hash);

    } else if (code.startsWith("tec")) {
      // txはレジャーに含まれたが操作は失敗
      // Feeは徴収された
      console.log("失敗（tec）：", code);
      console.log("操作は実行されませんでしたが、Feeは徴収されました。");

      // 個別の診断
      switch (code) {
        case "tecUNFUNDED_PAYMENT":
          console.log("→ 残高が不足しています。");
          break;
        case "tecNO_DST":
          console.log("→ 宛先アカウントが存在しません。");
          break;
        case "tecDST_TAG_NEEDED":
          console.log("→ DestinationTagがありません。");
          break;
        case "tecINSUFFICIENT_RESERVE":
          console.log("→ リザーブに十分なXAHがありません。");
          break;
        default:
          console.log("→ ドキュメントを確認してください：", code);
      }

    } else if (code.startsWith("tef")) {
      console.log("拒否（tef）：", code);
      console.log("トランザクションは処理前に拒否されました。");
      console.log("Feeは徴収されませんでした。");

    } else if (code.startsWith("tem")) {
      console.log("不正形式（tem）：", code);
      console.log("トランザクションにフォームエラーがあります。");
      console.log("フィールドと値を確認してください。");

    } else if (code.startsWith("ter")) {
      console.log("一時的エラー（ter）：", code);
      console.log("数秒後に再試行できます。");
    }

  } catch (error) {
    console.error("接続または送信エラー：", error.message);
  }

  await client.disconnect();
}

sendWithHandling().catch(console.error);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function sendChecking() {
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

    const code = result.result.meta.TransactionResult;

    // 카테고리별로 결과 분석
    if (code === "tesSUCCESS") {
      console.log("성공: 트랜잭션이 정상 처리되었습니다.");
      console.log("Ledger:", result.result.ledger_index);
      console.log("Hash:", signed.hash);

    } else if (code.startsWith("tec")) {
      // tx는 ledger에 포함되었지만 작업은 실패
      // fee는 청구됨
      console.log("실패 (tec):", code);
      console.log("동작은 실행되지 않았지만 fee는 청구되었습니다.");

      // 구체적인 진단
      switch (code) {
        case "tecUNFUNDED_PAYMENT":
          console.log("→ 잔액이 부족합니다.");
          break;
        case "tecNO_DST":
          console.log("→ 목적지 계정이 존재하지 않습니다.");
          break;
        case "tecDST_TAG_NEEDED":
          console.log("→ DestinationTag가 없습니다.");
          break;
        case "tecINSUFFICIENT_RESERVE":
          console.log("→ reserve에 필요한 XAH가 부족합니다.");
          break;
        default:
          console.log("→ 문서를 확인하세요:", code);
      }

    } else if (code.startsWith("tef")) {
      console.log("거부됨 (tef):", code);
      console.log("트랜잭션이 처리 전에 거부되었습니다.");
      console.log("fee는 청구되지 않았습니다.");

    } else if (code.startsWith("tem")) {
      console.log("형식 오류 (tem):", code);
      console.log("트랜잭션 형식에 문제가 있습니다.");
      console.log("필드와 값을 확인하세요.");

    } else if (code.startsWith("ter")) {
      console.log("일시적 오류 (ter):", code);
      console.log("몇 초 후 다시 시도할 수 있습니다.");
    }

  } catch (error) {
    console.error("연결 또는 제출 오류:", error.message);
  }

  await client.disconnect();
}

sendChecking().catch(console.error);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function sendChecking() {
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

    const code = result.result.meta.TransactionResult;

    // 按类别分析结果
    if (code === "tesSUCCESS") {
      console.log("成功：交易已被正确处理。");
      console.log("Ledger:", result.result.ledger_index);
      console.log("Hash:", signed.hash);

    } else if (code.startsWith("tec")) {
      // 交易已被写入账本，但操作失败
      // fee 已收取
      console.log("失败 (tec):", code);
      console.log("操作未执行成功，但 fee 已被收取。");

      // 具体诊断
      switch (code) {
        case "tecUNFUNDED_PAYMENT":
          console.log("→ 余额不足。");
          break;
        case "tecNO_DST":
          console.log("→ 目标账户不存在。");
          break;
        case "tecDST_TAG_NEEDED":
          console.log("→ 缺少 DestinationTag。");
          break;
        case "tecINSUFFICIENT_RESERVE":
          console.log("→ 没有足够的 XAH 用于 reserve。");
          break;
        default:
          console.log("→ 请查阅文档了解:", code);
      }

    } else if (code.startsWith("tef")) {
      console.log("被拒绝 (tef):", code);
      console.log("交易在处理前就被拒绝了。");
      console.log("fee 未被收取。");

    } else if (code.startsWith("tem")) {
      console.log("格式错误 (tem):", code);
      console.log("交易存在格式问题。");
      console.log("请检查字段和值。");

    } else if (code.startsWith("ter")) {
      console.log("临时错误 (ter):", code);
      console.log("你可以几秒后重试。");
    }

  } catch (error) {
    console.error("连接或提交错误:", error.message);
  }

  await client.disconnect();
}

sendChecking().catch(console.error);`,
          },
        },

      ],
      slides: [
        {
          title: { es: "submit vs submitAndWait", pt: "submit vs submitAndWait", en: "submit vs submitAndWait", jp: "submit対submitAndWait", ko: "submit vs submitAndWait", zh: "submit 与 submitAndWait" },
          content: {
            es: "submit():\n• Envía y devuelve inmediatamente\n• Resultado preliminar (no final)\n• Rápido, para enviar muchas txs\n\nsubmitAndWait():\n• Envía y espera validación (3-10s)\n• Resultado final directo\n• Recomendado para la mayoría de casos",
            pt: "submit():\n• Envia e retorna imediatamente\n• Resultado preliminar (não final)\n• Rápido, para enviar muchas txs\n\nsubmitAndWait():\n• Envia e espera validação (3-10s)\n• Resultado final direto\n• Recomendado parà maioría de casos",
            en: "submit():\n• Sends and returns immediately\n• Preliminary result (not final)\n• Fast, for sending many txs\n\nsubmitAndWait():\n• Sends and waits for validation (3-10s)\n• Direct final result\n• Recommended for most cases",
            jp: "submit()：\n• 送信して即座に返す\n• 暫定結果（最終でない）\n• 高速、多くのtxを送信する場合\n\nsubmitAndWait()：\n• 送信して検証を待つ（3〜10秒）\n• 直接最終結果\n• ほとんどの場合に推奨",
            ko: "submit():\n• 전송 후 즉시 반환\n• 예비 결과 (최종 아님)\n• 빠르며 많은 tx 전송에 적합\n\nsubmitAndWait():\n• 전송 후 검증까지 대기 (3~10초)\n• 최종 결과 바로 반환\n• 대부분의 경우 권장",
            zh: "submit():\n• 发送后立即返回\n• 返回初步结果（不是最终结果）\n• 很快，适合批量发送交易\n\nsubmitAndWait():\n• 发送后等待验证（3 到 10 秒）\n• 直接拿到最终结果\n• 适合大多数场景",
          },
          visual: "📤",
        },
        {
          title: { es: "Códigos de resultado", pt: "Códigos de resultado", en: "Result codes", jp: "結果コード", ko: "결과 코드", zh: "结果代码" },
          content: {
            es: "• tesSUCCESS → Éxito\n• tec... → Incluida pero falló (fee cobrado)\n• tef... → Rechazada (fee NO cobrado)\n• tem... → Mal formada (error de formato)\n• ter... → Error temporal (reintentar)\n\nSiempre verifica meta.TransactionResult",
            pt: "• tesSUCCESS → Sucesso\n• tec... → Incluída mas falhou (fee cobrado)\n• tef... → Rejeitada (fee NÃO cobrado)\n• tem... → Mal formada (erro de formato)\n• ter... → Erro temporário (tente novamente)\n\nSempre verifique meta.TransactionResult",
            en: "• tesSUCCESS → Success\n• tec... → Included but failed (fee charged)\n• tef... → Rejected (fee NOT charged)\n• tem... → Malformed (format error)\n• ter... → Temporary error (retry)\n\nAlways check meta.TransactionResult",
            jp: "• tesSUCCESS → 成功\n• tec... → 含まれたが失敗（Fee徴収）\n• tef... → 拒否（Fee未徴収）\n• tem... → 不正形式（フォームエラー）\n• ter... → 一時的エラー（リトライ）\n\n常にmeta.TransactionResultを確認",
            ko: "• tesSUCCESS → 성공\n• tec... → 포함됐지만 실패 (fee 청구)\n• tef... → 거부됨 (fee 미청구)\n• tem... → 형식 오류\n• ter... → 일시적 오류 (재시도)\n\n항상 meta.TransactionResult를 확인하세요",
            zh: "• tesSUCCESS → 成功\n• tec... → 已纳入账本但执行失败（fee 已收）\n• tef... → 被拒绝（fee 未收）\n• tem... → 格式错误\n• ter... → 临时错误（可重试）\n\n始终检查 meta.TransactionResult",
          },
          visual: "🏷️",
        },
        {
          title: { es: "Errores tec más comunes", pt: "Erros tec mais comuns", en: "Most common tec errors", jp: "最も一般的なtecエラー", ko: "가장 흔한 tec 오류", zh: "最常见的 tec 错误" },
          content: {
            es: "• tecUNFUNDED_PAYMENT → Sin balance\n• tecNO_DST → Destino no existe\n• tecDST_TAG_NEEDED → Falta tag\n• tecNO_LINE → Sin trust line\n• tecINSUFFICIENT_RESERVE → Sin reserva\n• tecPATH_DRY → Sin ruta de pago\n\nEl fee SE cobra en errores tec",
            pt: "• tecUNFUNDED_PAYMENT → Sem saldo\n• tecNO_DST → Destino não existe\n• tecDST_TAG_NEEDED → Falta tag\n• tecNO_LINE → Sem trust line\n• tecINSUFFICIENT_RESERVE → Sem reserva\n• tecPATH_DRY → Sem rota de pagamento\n\nO fee É cobrado em erros tec",
            en: "• tecUNFUNDED_PAYMENT → No balance\n• tecNO_DST → Destination doesn't exist\n• tecDST_TAG_NEEDED → Missing tag\n• tecNO_LINE → No trust line\n• tecINSUFFICIENT_RESERVE → No reserve\n• tecPATH_DRY → No payment path\n\nThe fee IS charged on tec errors",
            jp: "• tecUNFUNDED_PAYMENT → 残高なし\n• tecNO_DST → 宛先が存在しない\n• tecDST_TAG_NEEDED → タグなし\n• tecNO_LINE → トラストラインなし\n• tecINSUFFICIENT_RESERVE → リザーブなし\n• tecPATH_DRY → 支払いルートなし\n\ntecエラーではFeeが徴収される",
            ko: "• tecUNFUNDED_PAYMENT → 잔액 부족\n• tecNO_DST → 목적지 없음\n• tecDST_TAG_NEEDED → 태그 누락\n• tecNO_LINE → trust line 없음\n• tecINSUFFICIENT_RESERVE → reserve 부족\n• tecPATH_DRY → 결제 경로 없음\n\ntec 오류에서는 fee가 청구됩니다",
            zh: "• tecUNFUNDED_PAYMENT → 余额不足\n• tecNO_DST → 目标不存在\n• tecDST_TAG_NEEDED → 缺少标签\n• tecNO_LINE → 没有 trust line\n• tecINSUFFICIENT_RESERVE → reserve 不足\n• tecPATH_DRY → 没有支付路径\n\n出现 tec 错误时，fee 依然会被收取",
          },
          visual: "⚠️",
        },
      ],
    },
    {
      id: "m5bl5",
      title: {
        es: "Transacciones a nivel del ledger",
        pt: "Transações a nível do ledger",
        en: "Transactions at the ledger level",
        jp: "レジャーレベルのトランザクション",
        ko: "레저 수준의 트랜잭션",
        zh: "账本层级的交易",
      },
      theory: {
        es: `Para entender realmente cómo funcionan las transacciones, necesitas ver lo que ocurre **dentro del ledger** cuando una transacción se procesa. Esto te ayudará a depurar problemas complejos y a entender la metadata.

### ¿Cómo modifica una transacción el ledger?

Cuando una transacción se procesa con éxito, modifica el **estado del ledger**, los objetos almacenados en la base de datos del ledger. Estos cambios se registran en la **metadata** de la transacción.

### AffectedNodes: La huella de la transacción

El campo \`meta.AffectedNodes\` es un array que describe **exactamente qué cambió** en el ledger. Cada nodo afectado puede ser de tres tipos:

### CreatedNode: Objeto nuevo

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

### ModifiedNode: Objeto modificado

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

### DeletedNode: Objeto eliminado

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

### Balance changes: Seguir el dinero

En una transacción de pago, puedes rastrear exactamente cómo se movió el dinero observando los \`ModifiedNode\` de tipo \`AccountRoot\`:

- La cuenta de origen: \`Balance\` disminuye (envió XAH)
- La cuenta de destino: \`Balance\` aumenta (recibió XAH)
- La diferencia entre los balances es el \`Amount\` + \`Fee\`

Para tokens (IOUs), los cambios se ven en los \`ModifiedNode\` de tipo \`RippleState\`.

### Reserves: El sistema de reservas

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
        pt: `Para entender realmente como as transações funcionam, você precisa ver o que acontece **dentro do ledger** quando uma transação é processada. Isso ajudará você a depurar problemas complexos e entender a metadata.
### Como uma transação modifica o ledger?
Quando uma transação é processada com sucesso, modifica o **estado do ledger**, os objetos armazenados no banco de dados do ledger. Essas alterações são registradas na **metadata** da transação.
### AffectedNodes: A pegada da transação
O campo \`meta.AffectedNodes\` é um array que descreve **exatamente o que mudou** no ledger. Cada nó afetado pode ser de três tipos:
### CreatedNode: Objeto novo
Um novo objeto foi criado no ledger:
\`\`\`
{
  "CreatedNode": {
    "LedgerEntryType": "RippleState",  // Tipo de objeto
    "LedgerIndex": "ABC123...",         // ID único do objeto
    "NewFields": {                      // Os campos do novo objeto
      "Saldo": { "value": "100" },
      "LowLimit": { ... },
      "HighLimit": { ... }
    }
  }
}
\`\`\`
Exemplos: nova trust line, nova oferta no DEX, novo URIToken.
### ModifiedNode: Objeto modificado
Um objeto existente foi modificado:
\`\`\`
{
  "ModifiedNode": {
    "LedgerEntryType": "AccountRoot",
    "LedgerIndex": "DEF456...",
    "PreviousFields": {                // Estado ANTES
      "Saldo": "100000000"
    },
    "FinalFields": {                   // Estado DEPOIS
      "Saldo": "95000000",
      "Sequence": 43
    }
  }
}
\`\`\`
\`PreviousFields\` mostra apenas os campos que **mudaram** (não todos os campos do objeto). \`FinalFields\` mostra o estado completo depois da alteração.
### DeletedNode: Objeto eliminado
Um objeto foi eliminado do ledger:
\`\`\`
{
  "DeletedNode": {
    "LedgerEntryType": "Offer",
    "LedgerIndex": "GHI789...",
    "FinalFields": {                   // Estado no momento da eliminação
      "TakerPays": "0",
      "TakerGets": "0"
    }
  }
}
\`\`\`
Exemplos: oferta completada/cancelada, trust line eliminada (saldo 0), URIToken queimado.
### Mudanças de saldo: acompanhar o dinheiro
Em uma transação de pagamento, você pode rastrear exatamente como o dinheiro se moveu observando os \`ModifiedNode\` de tipo \`AccountRoot\`:
- A conta de origem: \`Saldo\` diminui (enviou XAH)
- A conta de destino: \`Saldo\` aumenta (recebeu XAH)
- A diferença entre os saldos é o \`Amount\` + \`Fee\`
Para tokens (IOUs), as alterações são vistas nos \`ModifiedNode\` de tipo \`RippleState\`.
### Reserves: O sistema de reservas
O ledger de Xahau usa um sistema de **reservas** que afeta seu saldo disponível:
- **Reserva base**: 1 XAH — mínimo para uma conta existir
- **Reserva por objeto**: 0.2 XAH por cada objeto que sua conta possui
Cada objeto no ledger (trust line, oferta, URIToken, Hook) aumenta sua reserva. O XAH reservado não pode ser gasto até que você elimine o objeto.
### Ordem de processamento em um ledger
Dentro de um ledger, as transações são processadas em uma **ordem determinística**:
1. As transações são ordenadas por **hash canônico** (não por Sequence nem por hora de envio)
2. São processadas sequencialmente nessa ordem
3. Cada transação vê o estado do ledger depois da transação anterior
4. Se duas transações competem pelos mesmos recursos, a primeira (por hash) vence
Isso garante que **todos os validadores calculem exatamente o mesmo resultado**, independentemente da ordem em que receberam as transações.
### O hash do ledger
Quando um ledger é fechado, é calculado um **hash** que resume:
- O hash do ledger anterior (cadeia de ledgers)
- Todas as transações incluídas e suas metadatas
- O estado completo do ledger (árvore de estado)
Se um validador calcula um hash diferente de 80% da UNL, seu ledger é descartado; isso garante a consistência da rede.`,
        en: `To truly understand how transactions work, you need to see what happens **inside the ledger** when a transaction is processed. This will help you debug complex issues and understand metadata.

### How does a transaction modify the ledger?

When a transaction is successfully processed, it modifies the **ledger state**, the objects stored in the ledger database. These changes are recorded in the transaction's **metadata**.

### AffectedNodes: The transaction's footprint

The \`meta.AffectedNodes\` field is an array that describes **exactly what changed** in the ledger. Each affected node can be one of three types:

### CreatedNode: New object

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

### ModifiedNode: Modified object

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

### DeletedNode: Deleted object

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

### Balance changes: Follow the money

In a payment transaction, you can trace exactly how money moved by observing the \`ModifiedNode\` entries of type \`AccountRoot\`:

- The source account: \`Balance\` decreases (sent XAH)
- The destination account: \`Balance\` increases (received XAH)
- The difference between balances is the \`Amount\` + \`Fee\`

For tokens (IOUs), changes are visible in the \`ModifiedNode\` entries of type \`RippleState\`.

### Reserves: The reserve system

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
        jp: `トランザクションがどのように機能するかを本当に理解するには、トランザクションが処理されるときに**レジャー内部で何が起こるか**を見る必要があります。これにより、複雑な問題をデバッグしてメタデータを理解するのに役立ちます。

### トランザクションはどのようにレジャーを変更するか？

トランザクションが正常に処理されると、**レジャーの状態**（レジャーデータベースに保存されているオブジェクト）が変更されます。これらの変更はトランザクションの**メタデータ**に記録されます。

### AffectedNodes：トランザクションの足跡

\`meta.AffectedNodes\`フィールドは、レジャーで**正確に何が変わったか**を説明する配列です。影響を受けた各ノードは次の3つのタイプのいずれかになります。

### CreatedNode：新しいオブジェクト

レジャーに新しいオブジェクトが作成された。

\`\`\`
{
  "CreatedNode": {
    "LedgerEntryType": "RippleState",  // オブジェクトタイプ
    "LedgerIndex": "ABC123...",         // オブジェクトの一意ID
    "NewFields": {                      // 新しいオブジェクトのフィールド
      "Balance": { "value": "100" },
      "LowLimit": { ... },
      "HighLimit": { ... }
    }
  }
}
\`\`\`

例：新しいトラストライン、新しいDEXオファー、新しいURIToken

### ModifiedNode：変更されたオブジェクト

既存のオブジェクトが変更された。

\`\`\`
{
  "ModifiedNode": {
    "LedgerEntryType": "AccountRoot",
    "LedgerIndex": "DEF456...",
    "PreviousFields": {                // 変更前の状態
      "Balance": "100000000"
    },
    "FinalFields": {                   // 変更後の状態
      "Balance": "95000000",
      "Sequence": 43
    }
  }
}
\`\`\`

\`PreviousFields\`は**変更された**フィールドのみを表示します（オブジェクトの全フィールドではない）。\`FinalFields\`は変更後の完全な状態を表示します。

### DeletedNode：削除されたオブジェクト

レジャーからオブジェクトが削除された。

\`\`\`
{
  "DeletedNode": {
    "LedgerEntryType": "Offer",
    "LedgerIndex": "GHI789...",
    "FinalFields": {                   // 削除時の状態
      "TakerPays": "0",
      "TakerGets": "0"
    }
  }
}
\`\`\`

例：完了/キャンセルされたオファー、削除されたトラストライン（残高ゼロ）、バーンされたURIToken

### 残高の変化：お金の流れを追う

Paymentトランザクションでは、\`AccountRoot\`タイプの\`ModifiedNode\`エントリを観察して、お金がどのように移動したかを正確に追跡できます。

- 送信元アカウント：\`Balance\`が減少（XAHを送信）
- 宛先アカウント：\`Balance\`が増加（XAHを受信）
- 残高の差は\`Amount\` + \`Fee\`です

トークン（IOU）の場合、変更は\`RippleState\`タイプの\`ModifiedNode\`エントリで確認できます。

### 準備金：準備金システム

Xahauでは利用可能な残高に影響する**準備金**システムを使用します。

- **基本準備金**：1 XAH — アカウントが存在するための最小値
- **所有者準備金**：アカウントが所有する各オブジェクトにつき0.2 XAH

レジャー内の各オブジェクト（トラストライン、オファー、URIToken、Hook）が準備金を増加させます。オブジェクトを削除するまで、準備金としてロックされたXAHは使用できません。

### レジャー内の処理順序

レジャー内で、トランザクションは**決定論的な順序**で処理されます：

1. トランザクションは**正規ハッシュ**で並べられます（Sequenceや送信時間ではない）
2. その順序で順次処理されます
3. 各トランザクションは前のトランザクション後のレジャー状態を見ます
4. 2つのトランザクションが同じリソースを競う場合、最初のもの（ハッシュ順）が勝ちます

これにより、**すべてのバリデーターが受け取ったトランザクションの順序に関係なく、まったく同じ結果を計算する**ことが保証されます。

### レジャーハッシュ

レジャーが閉じると、以下を要約した**ハッシュ**が計算されます。
- 前のレジャーのハッシュ（レジャーの連鎖）
- 含まれるすべてのトランザクションとそのメタデータ
- レジャーの完全な状態（状態ツリー）

バリデーターがUNLの80%と異なるハッシュを計算した場合、そのレジャーは破棄されます—これがネットワークの一貫性を保証します。`,
        ko: `트랜잭션이 실제로 어떻게 동작하는지 이해하려면, 트랜잭션이 처리될 때 **ledger 내부에서 무엇이 일어나는지** 봐야 합니다. 이것은 복잡한 문제를 디버깅하고 metadata를 이해하는 데 큰 도움이 됩니다.

### 트랜잭션은 ledger를 어떻게 바꾸는가?

트랜잭션이 성공적으로 처리되면 **ledger 상태**, 즉 ledger 데이터베이스에 저장된 객체들이 변경됩니다. 이 변화는 트랜잭션의 **metadata**에 기록됩니다.

### AffectedNodes: 트랜잭션의 흔적

\`meta.AffectedNodes\` 필드는 ledger에서 **정확히 무엇이 바뀌었는지** 설명하는 배열입니다. 각 affected node는 세 가지 유형 중 하나입니다:

### CreatedNode: 새 객체

ledger에 새 객체가 생성되었습니다:

\`\`\`
{
  "CreatedNode": {
    "LedgerEntryType": "RippleState",  // 객체 유형
    "LedgerIndex": "ABC123...",         // 고유 객체 ID
    "NewFields": {                      // 새 객체의 필드
      "Balance": { "value": "100" },
      "LowLimit": { ... },
      "HighLimit": { ... }
    }
  }
}
\`\`\`

예: 새 trust line, 새 DEX 오퍼, 새 URIToken

### ModifiedNode: 수정된 객체

기존 객체가 수정되었습니다:

\`\`\`
{
  "ModifiedNode": {
    "LedgerEntryType": "AccountRoot",
    "LedgerIndex": "DEF456...",
    "PreviousFields": {                // 변경 전 상태
      "Balance": "100000000"
    },
    "FinalFields": {                   // 변경 후 상태
      "Balance": "95000000",
      "Sequence": 43
    }
  }
}
\`\`\`

\`PreviousFields\`는 **바뀐 필드만** 보여 주고, \`FinalFields\`는 변경 후 전체 상태를 보여 줍니다.

### DeletedNode: 삭제된 객체

ledger에서 객체가 제거되었습니다:

\`\`\`
{
  "DeletedNode": {
    "LedgerEntryType": "Offer",
    "LedgerIndex": "GHI789...",
    "FinalFields": {                   // 삭제 시점의 상태
      "TakerPays": "0",
      "TakerGets": "0"
    }
  }
}
\`\`\`

예: 완료/취소된 오퍼, 삭제된 trust line(잔액 0), 소각된 URIToken

### 잔액 변화: 돈의 흐름 추적

Payment 트랜잭션에서는 \`AccountRoot\` 타입의 \`ModifiedNode\`를 보면 돈이 정확히 어떻게 움직였는지 추적할 수 있습니다:

- 출발 계정: \`Balance\` 감소 (XAH 전송)
- 도착 계정: \`Balance\` 증가 (XAH 수신)
- 두 잔액 차이는 \`Amount\` + \`Fee\`입니다

토큰(IOU)의 경우 변화는 \`RippleState\` 타입 \`ModifiedNode\`에 나타납니다.

### Reserve: reserve 시스템

Xahau ledger는 사용 가능한 잔액에 영향을 주는 **reserve** 시스템을 사용합니다:

- **기본 reserve**: 1 XAH — 계정이 존재하기 위한 최소값
- **객체 reserve**: 계정이 소유한 각 객체당 0.2 XAH

ledger의 각 객체(trust line, offer, URIToken, Hook)는 reserve를 늘립니다. reserve로 묶인 XAH는 해당 객체를 제거하기 전까지 사용할 수 없습니다.

### Ledger 내부 처리 순서

하나의 ledger 안에서 트랜잭션은 **결정적인 순서**로 처리됩니다:

1. 트랜잭션은 **canonical hash**로 정렬됩니다 (Sequence나 전송 시각 기준 아님)
2. 그 순서대로 하나씩 처리됩니다
3. 각 트랜잭션은 이전 트랜잭션 처리 후의 ledger 상태를 봅니다
4. 같은 자원을 두 tx가 경쟁하면 hash 기준 앞선 쪽이 이깁니다

이 구조 덕분에 **모든 검증자가 트랜잭션을 받은 순서와 상관없이 똑같은 결과를 계산**합니다.

### Ledger hash

ledger가 닫히면 다음을 요약하는 **hash**가 계산됩니다:
- 이전 ledger의 hash (ledger 체인)
- 포함된 모든 트랜잭션과 metadata
- 완전한 ledger 상태 (state tree)

검증자가 UNL의 80%와 다른 hash를 계산하면 그 ledger는 버려집니다. 이것이 네트워크 일관성을 보장합니다.`,
        zh: `如果你想真正理解交易是如何工作的，就需要看到交易被处理时**账本内部发生了什么**。这能帮助你调试复杂问题，也能更好理解 metadata。

### 一笔交易如何修改账本？

当一笔交易被成功处理后，它会修改**账本状态**，也就是账本数据库中存储的对象。这些变化会记录在交易的 **metadata** 中。

### AffectedNodes：交易留下的痕迹

\`meta.AffectedNodes\` 字段是一个数组，用来描述账本中**到底发生了哪些变化**。每个受影响节点都属于以下三种类型之一：

### CreatedNode：新对象

账本中新建了一个对象：

\`\`\`
{
  "CreatedNode": {
    "LedgerEntryType": "RippleState",  // 对象类型
    "LedgerIndex": "ABC123...",         // 对象唯一 ID
    "NewFields": {                      // 新对象的字段
      "Balance": { "value": "100" },
      "LowLimit": { ... },
      "HighLimit": { ... }
    }
  }
}
\`\`\`

例如：新的 trust line、新的 DEX 报价、新的 URIToken。

### ModifiedNode：已修改对象

一个已有对象被修改：

\`\`\`
{
  "ModifiedNode": {
    "LedgerEntryType": "AccountRoot",
    "LedgerIndex": "DEF456...",
    "PreviousFields": {                // 修改前状态
      "Balance": "100000000"
    },
    "FinalFields": {                   // 修改后状态
      "Balance": "95000000",
      "Sequence": 43
    }
  }
}
\`\`\`

\`PreviousFields\` 只展示**发生变化的字段**，而不是对象的全部字段。\`FinalFields\` 展示修改后的完整状态。

### DeletedNode：已删除对象

一个对象从账本中被移除：

\`\`\`
{
  "DeletedNode": {
    "LedgerEntryType": "Offer",
    "LedgerIndex": "GHI789...",
    "FinalFields": {                   // 删除时的状态
      "TakerPays": "0",
      "TakerGets": "0"
    }
  }
}
\`\`\`

例如：报价已完成或取消、trust line 被删除（余额为 0）、URIToken 被销毁。

### Balance changes：追踪资金流动

在 Payment 交易中，你可以通过查看 \`AccountRoot\` 类型的 \`ModifiedNode\`，准确追踪资金如何流动：

- 源账户：\`Balance\` 减少（发送了 XAH）
- 目标账户：\`Balance\` 增加（收到了 XAH）
- 两边余额差额等于 \`Amount\` + \`Fee\`

如果是代币（IOU），变化会出现在 \`RippleState\` 类型的 \`ModifiedNode\` 中。

### Reserves：reserve 系统

Xahau 账本使用一套会影响可用余额的 **reserve** 系统：

- **基础 reserve**：1 XAH —— 账户存在所需的最低值
- **对象 reserve**：账户每拥有一个对象，就要额外占用 0.2 XAH

账本中的每个对象（trust line、报价、URIToken、Hook）都会提高 reserve。被占用的 XAH 在删除对象之前无法使用。

### 一个账本中的处理顺序

在同一个账本内，交易会按**确定性的顺序**处理：

1. 交易按**规范哈希（canonical hash）**排序，而不是按 Sequence 或发送时间排序
2. 按该顺序逐笔处理
3. 每笔交易都会看到前一笔交易执行后的账本状态
4. 如果两笔交易争夺同一资源，哈希顺序靠前的那笔会获胜

这保证了**所有验证者都会计算出完全相同的结果**，无论他们接收交易的顺序如何。

### Ledger hash

一个账本关闭时，会计算一个**hash** 来汇总：
- 上一个账本的 hash（账本链）
- 所有被纳入的交易及其 metadata
- 完整账本状态（state tree）

如果某个验证者算出的 hash 与 UNL 中 80% 的结果不一致，它的账本就会被丢弃。这就是网络一致性的保障。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Analizar los AffectedNodes de una transacción",
            pt: "Analizar os AffectedNodes de uma transação",
            en: "Analyze a transaction's AffectedNodes",
            jp: "トランザクションのAffectedNodesを分析",
            ko: "트랜잭션의 AffectedNodes 분석",
            zh: "分析交易的 AffectedNodes",
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
  console.log("=== ANÁLISIS DE METADATA ===");
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
    console.log("--- OBJETOS CREADOS ---");
    for (const n of creados) {
      console.log("  +", n.LedgerEntryType);
      console.log("   Index:", n.LedgerIndex);
    }
  }

  // Mostrar objetos modificados
  if (modificados.length > 0) {
    console.log("--- OBJETOS MODIFICADOS ---");
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
    console.log("--- OBJETOS ELIMINADOS ---");
    for (const n of eliminados) {
      console.log("  -", n.LedgerEntryType);
    }
  }

  // Resumen de balance
  console.log("--- RESUMEN ---");
  console.log("Fee pagado:", Number(result.result.Fee) / 1000000, "XAH");
  console.log("El fee se quemó (no fue a ninguna cuenta).");

  await client.disconnect();
}

analizarMetadata().catch(console.error);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function analizarMetadata() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // Enviar um pagamento para analizar sua metadata
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
  console.log("=== ANÁLISIS DE METADATA ===");
  console.log("Resultado:", meta.TransactionResult);
  console.log("Nós afectados:", meta.AffectedNodes.length);
  // Clasificar os nós afectados
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
    console.log("--- OBJETOS CREADOS ---");
    for (const n of creados) {
      console.log("  +", n.LedgerEntryType);
      console.log("   Index:", n.LedgerIndex);
    }
  }
  // Mostrar objetos modificados
  if (modificados.length > 0) {
    console.log("--- OBJETOS MODIFICADOS ---");
    for (const n of modificados) {
      console.log("  ~", n.LedgerEntryType);
      if (n.PreviousFields && n.FinalFields) {
        // Mostrar alteraçãos em saldo (AccountRoot)
        if (n.PreviousFields.Saldo && n.FinalFields.Saldo) {
          const antes = Number(n.PreviousFields.Saldo) / 1000000;
          const despues = Number(n.FinalFields.Saldo) / 1000000;
          const diff = despues - antes;
          console.log("   Saldo:", antes, "→", despues, "XAH");
          console.log("   Cambio:", diff > 0 ? "+" : "", diff.toFixed(6), "XAH");
        }
        // Mostrar alteração de Sequence
        if (n.FinalFields.Sequence) {
          console.log("   Sequence:", n.FinalFields.Sequence);
        }
      }
    }
  }
  // Mostrar objetos eliminados
  if (eliminados.length > 0) {
    console.log("--- OBJETOS ELIMINADOS ---");
    for (const n of eliminados) {
      console.log("  -", n.LedgerEntryType);
    }
  }
  // Resumo de saldo
  console.log("--- RESUMO ---");
  console.log("Fee pagado:", Number(result.result.Fee) / 1000000, "XAH");
  console.log("O fee foi queimado (não foi a ninguma conta).");
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
  console.log("=== METADATA ANALYSIS ===");
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
    console.log("--- CREATED OBJECTS ---");
    for (const n of created) {
      console.log("  +", n.LedgerEntryType);
      console.log("   Index:", n.LedgerIndex);
    }
  }

  // Show modified objects
  if (modified.length > 0) {
    console.log("--- MODIFIED OBJECTS ---");
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
    console.log("--- DELETED OBJECTS ---");
    for (const n of deleted) {
      console.log("  -", n.LedgerEntryType);
    }
  }

  // Balance summary
  console.log("--- SUMMARY ---");
  console.log("Fee paid:", Number(result.result.Fee) / 1000000, "XAH");
  console.log("The fee was burned (it didn't go to any account).");

  await client.disconnect();
}

analizarMetadata().catch(console.error);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function analyzeMetadata() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // メタデータを分析するために支払いを送信
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
  console.log("=== メタデータ分析 ===");
  console.log("結果：", meta.TransactionResult);
  console.log("影響ノード数：", meta.AffectedNodes.length);

  // 影響ノードを分類
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

  // 作成されたオブジェクトを表示
  if (created.length > 0) {
    console.log("--- 作成されたオブジェクト ---");
    for (const n of created) {
      console.log("  +", n.LedgerEntryType);
      console.log("   インデックス：", n.LedgerIndex);
    }
  }

  // 変更されたオブジェクトを表示
  if (modified.length > 0) {
    console.log("--- 変更されたオブジェクト ---");
    for (const n of modified) {
      console.log("  ~", n.LedgerEntryType);
      if (n.PreviousFields && n.FinalFields) {
        // 残高の変化を表示（AccountRoot）
        if (n.PreviousFields.Balance && n.FinalFields.Balance) {
          const before = Number(n.PreviousFields.Balance) / 1000000;
          const after = Number(n.FinalFields.Balance) / 1000000;
          const diff = after - before;
          console.log("   残高：", before, "→", after, "XAH");
          console.log("   変化：", diff > 0 ? "+" : "", diff.toFixed(6), "XAH");
        }
        // Sequenceの変化を表示
        if (n.FinalFields.Sequence) {
          console.log("   Sequence：", n.FinalFields.Sequence);
        }
      }
    }
  }

  // 削除されたオブジェクトを表示
  if (deleted.length > 0) {
    console.log("--- 削除されたオブジェクト ---");
    for (const n of deleted) {
      console.log("  -", n.LedgerEntryType);
    }
  }

  // 残高の要約
  console.log("--- まとめ ---");
  console.log("支払ったFee：", Number(result.result.Fee) / 1000000, "XAH");
  console.log("Feeはバーンされました（どのアカウントにも渡らない）。");

  await client.disconnect();
}

analyzeMetadata().catch(console.error);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function analyzeMetadata() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // metadata 분석을 위해 payment 전송
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
  console.log("=== METADATA 분석 ===");
  console.log("결과:", meta.TransactionResult);
  console.log("영향 받은 노드 수:", meta.AffectedNodes.length);

  // 영향 노드 분류
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

  // 생성된 객체 출력
  if (created.length > 0) {
    console.log("--- 생성된 객체 ---");
    for (const n of created) {
      console.log("  +", n.LedgerEntryType);
      console.log("   인덱스:", n.LedgerIndex);
    }
  }

  // 수정된 객체 출력
  if (modified.length > 0) {
    console.log("--- 수정된 객체 ---");
    for (const n of modified) {
      console.log("  ~", n.LedgerEntryType);
      if (n.PreviousFields && n.FinalFields) {
        // 잔액 변화 표시 (AccountRoot)
        if (n.PreviousFields.Balance && n.FinalFields.Balance) {
          const before = Number(n.PreviousFields.Balance) / 1000000;
          const after = Number(n.FinalFields.Balance) / 1000000;
          const diff = after - before;
          console.log("   잔액:", before, "→", after, "XAH");
          console.log("   변화:", diff > 0 ? "+" : "", diff.toFixed(6), "XAH");
        }
        // Sequence 변화 표시
        if (n.FinalFields.Sequence) {
          console.log("   Sequence:", n.FinalFields.Sequence);
        }
      }
    }
  }

  // 삭제된 객체 출력
  if (deleted.length > 0) {
    console.log("--- 삭제된 객체 ---");
    for (const n of deleted) {
      console.log("  -", n.LedgerEntryType);
    }
  }

  // 잔액 요약
  console.log("--- 요약 ---");
  console.log("지불한 Fee:", Number(result.result.Fee) / 1000000, "XAH");
  console.log("Fee는 소각되었으며 어떤 계정에도 전달되지 않았습니다.");

  await client.disconnect();
}

analyzeMetadata().catch(console.error);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function analyzeMetadata() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 发送一笔 payment 以分析其 metadata
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
  console.log("=== METADATA 分析 ===");
  console.log("结果:", meta.TransactionResult);
  console.log("受影响节点数:", meta.AffectedNodes.length);

  // 对受影响节点分类
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

  // 显示新建对象
  if (created.length > 0) {
    console.log("--- 新建对象 ---");
    for (const n of created) {
      console.log("  +", n.LedgerEntryType);
      console.log("   Index:", n.LedgerIndex);
    }
  }

  // 显示修改对象
  if (modified.length > 0) {
    console.log("--- 已修改对象 ---");
    for (const n of modified) {
      console.log("  ~", n.LedgerEntryType);
      if (n.PreviousFields && n.FinalFields) {
        // 显示余额变化（AccountRoot）
        if (n.PreviousFields.Balance && n.FinalFields.Balance) {
          const before = Number(n.PreviousFields.Balance) / 1000000;
          const after = Number(n.FinalFields.Balance) / 1000000;
          const diff = after - before;
          console.log("   余额:", before, "→", after, "XAH");
          console.log("   变化:", diff > 0 ? "+" : "", diff.toFixed(6), "XAH");
        }
        // 显示 Sequence 变化
        if (n.FinalFields.Sequence) {
          console.log("   Sequence:", n.FinalFields.Sequence);
        }
      }
    }
  }

  // 显示删除对象
  if (deleted.length > 0) {
    console.log("--- 已删除对象 ---");
    for (const n of deleted) {
      console.log("  -", n.LedgerEntryType);
    }
  }

  // 余额摘要
  console.log("--- 摘要 ---");
  console.log("已支付 Fee:", Number(result.result.Fee) / 1000000, "XAH");
  console.log("该 Fee 已被销毁（不会进入任何账户）。");

  await client.disconnect();
}

analyzeMetadata().catch(console.error);`,
          },
        },
        {
          title: {
            es: "Consultar la reserva actual de tu cuenta",
            pt: "Consultar a reserva atual de seu conta",
            en: "Query your account's current reserve",
            jp: "アカウントの現在のリザーブを照会",
            ko: "계정의 현재 reserve 조회",
            zh: "查询你账户当前的 reserve",
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

  console.log("=== TU CUENTA ===");
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

  console.log("=== OBJETOS POR TIPO ===");
  for (const [tipo, cantidad] of Object.entries(porTipo)) {
    console.log("  " + tipo + ":", cantidad, "(reserva:", cantidad * reservaObjeto, "XAH)");
  }

  await client.disconnect();
}
//Puedes usar tu cuenta o rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
consultarReserva("rTuCuentaAqui");`,
            pt: `require("dotenv").config();
const { Client } = require("xahau");
async function consultarReserva(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // Obter info do servidor para as reservas atuales
  const serverInfo = await client.request({ command: "server_info" });
  const ledgerInfo = serverInfo.result.info.validated_ledger;
  const reservaBase = ledgerInfo.reserve_base_xrp; // Em XAH
  const reservaObjeto = ledgerInfo.reserve_inc_xrp; // Em XAH
  console.log("=== RESERVAS DE A REDE ===");
  console.log("Reserva base (por conta):", reservaBase, "XAH");
  console.log("Reserva por objeto:", reservaObjeto, "XAH");
  // Obter info da conta
  const accountInfo = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  });
  const account = accountInfo.result.account_data;
  const balance = Number(account.Saldo) / 1000000;
  const ownerCount = account.OwnerCount;
  const reservaTotal = reservaBase + (ownerCount * reservaObjeto);
  const disponible = balance - reservaTotal;
  console.log("=== SEU CONTA ===");
  console.log("Endereçou:", address);
  console.log("Saldo total:", balance, "XAH");
  console.log("Objetos no ledger:", ownerCount);
  console.log("Reserva total:", reservaTotal, "XAH");
  console.log("  →", reservaBase, "XAH (base)");
  console.log("  +", ownerCount, "x", reservaObjeto, "=", ownerCount * reservaObjeto, "XAH (objetos)");
  console.log("Disponível para gastar:", disponible, "XAH");
  // Mostrar qué objetos tems
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
  console.log("=== OBJETOS POR TIPO ===");
  for (const [tipo, quantidade] of Object.entries(porTipo)) {
    console.log("  " + tipo + ":", quantidade, "(reserva:", quantidade * reservaObjeto, "XAH)");
  }
  await client.disconnect();
}
//Você pode usar seu conta ou rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
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

  console.log("=== YOUR ACCOUNT ===");
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

  console.log("=== OBJECTS BY TYPE ===");
  for (const [tipo, count] of Object.entries(byType)) {
    console.log("  " + tipo + ":", count, "(reserve:", count * ownerReserve, "XAH)");
  }

  await client.disconnect();
}
//You can use your account or rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
consultarReserva("rYourAccountHere");`,
            jp: `require("dotenv").config();
const { Client } = require("xahau");

async function checkReserve(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 現在のリザーブのサーバー情報を取得
  const serverInfo = await client.request({ command: "server_info" });
  const ledgerInfo = serverInfo.result.info.validated_ledger;
  const baseReserve = ledgerInfo.reserve_base_xrp; // XAH単位
  const ownerReserve = ledgerInfo.reserve_inc_xrp; // XAH単位

  console.log("=== ネットワークリザーブ ===");
  console.log("基本リザーブ（アカウントごと）：", baseReserve, "XAH");
  console.log("所有者リザーブ（オブジェクトごと）：", ownerReserve, "XAH");

  // アカウント情報を取得
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

  console.log("=== あなたのアカウント ===");
  console.log("アドレス：", address);
  console.log("総残高：", balance, "XAH");
  console.log("レジャー内のオブジェクト数：", ownerCount);
  console.log("総リザーブ：", totalReserve, "XAH");
  console.log("  →", baseReserve, "XAH（基本）");
  console.log("  +", ownerCount, "x", ownerReserve, "=", ownerCount * ownerReserve, "XAH（オブジェクト）");
  console.log("使用可能残高：", available, "XAH");

  // 所有するオブジェクトを表示
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

  console.log("=== タイプ別オブジェクト ===");
  for (const [tipo, count] of Object.entries(byType)) {
    console.log("  " + tipo + "：", count, "（リザーブ：", count * ownerReserve, "XAH）");
  }

  await client.disconnect();
}
//あなたのアカウントまたはrf1NrYAsv92UPDd8nyCG4A3bez7dhYE61rを使用できます
checkReserve("rYourAccountHere");`,
            ko: `require("dotenv").config();
const { Client } = require("xahau");

async function checkReserve(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 현재 reserve를 위한 서버 정보 조회
  const serverInfo = await client.request({ command: "server_info" });
  const ledgerInfo = serverInfo.result.info.validated_ledger;
  const baseReserve = ledgerInfo.reserve_base_xrp; // XAH
  const ownerReserve = ledgerInfo.reserve_inc_xrp; // XAH

  console.log("=== 네트워크 RESERVE ===");
  console.log("기본 reserve (계정당):", baseReserve, "XAH");
  console.log("객체 reserve (객체당):", ownerReserve, "XAH");

  // 계정 정보 조회
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

  console.log("=== 내 계정 ===");
  console.log("주소:", address);
  console.log("총 잔액:", balance, "XAH");
  console.log("ledger 객체 수:", ownerCount);
  console.log("총 reserve:", totalReserve, "XAH");
  console.log("  →", baseReserve, "XAH (기본)");
  console.log("  +", ownerCount, "x", ownerReserve, "=", ownerCount * ownerReserve, "XAH (객체)");
  console.log("사용 가능 잔액:", available, "XAH");

  // 어떤 객체를 보유 중인지 확인
  const objects = await client.request({
    command: "account_objects",
    account: address,
    ledger_index: "validated",
  });

  const byType = {};
  for (const obj of objects.result.account_objects) {
    const type = obj.LedgerEntryType;
    byType[type] = (byType[type] || 0) + 1;
  }

  console.log("=== 유형별 객체 ===");
  for (const [type, count] of Object.entries(byType)) {
    console.log("  " + type + ":", count, "(reserve:", count * ownerReserve, "XAH)");
  }

  await client.disconnect();
}
// 자신의 계정 또는 rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r 를 사용할 수 있습니다
checkReserve("rYourAccountHere");`,
            zh: `require("dotenv").config();
const { Client } = require("xahau");

async function checkReserve(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 获取当前 reserve 的服务器信息
  const serverInfo = await client.request({ command: "server_info" });
  const ledgerInfo = serverInfo.result.info.validated_ledger;
  const baseReserve = ledgerInfo.reserve_base_xrp; // 单位：XAH
  const ownerReserve = ledgerInfo.reserve_inc_xrp; // 单位：XAH

  console.log("=== 网络 RESERVE ===");
  console.log("基础 reserve（每个账户）：", baseReserve, "XAH");
  console.log("对象 reserve（每个对象）：", ownerReserve, "XAH");

  // 获取账户信息
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

  console.log("=== 你的账户 ===");
  console.log("地址:", address);
  console.log("总余额:", balance, "XAH");
  console.log("账本中的对象数:", ownerCount);
  console.log("总 reserve:", totalReserve, "XAH");
  console.log("  →", baseReserve, "XAH（基础）");
  console.log("  +", ownerCount, "x", ownerReserve, "=", ownerCount * ownerReserve, "XAH（对象）");
  console.log("可用余额:", available, "XAH");

  // 显示你拥有哪些对象
  const objects = await client.request({
    command: "account_objects",
    account: address,
    ledger_index: "validated",
  });

  const byType = {};
  for (const obj of objects.result.account_objects) {
    const type = obj.LedgerEntryType;
    byType[type] = (byType[type] || 0) + 1;
  }

  console.log("=== 按类型统计对象 ===");
  for (const [type, count] of Object.entries(byType)) {
    console.log("  " + type + ":", count, "(reserve:", count * ownerReserve, "XAH)");
  }

  await client.disconnect();
}
// 你可以使用自己的账户，或 rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
checkReserve("rYourAccountHere");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "AffectedNodes", pt: "AffectedNodes", en: "AffectedNodes", jp: "AffectedNodes", ko: "AffectedNodes", zh: "AffectedNodes" },
          content: {
            es: "Cada transacción registra qué cambió:\n\n• CreatedNode → Nuevo objeto en el ledger\n• ModifiedNode → Objeto existente modificado\n  (PreviousFields → FinalFields)\n• DeletedNode → Objeto eliminado\n\nLa huella exacta de la transacción",
            pt: "Cada transação registra qué mudou:\n\n• CreatedNode → Novo objeto no ledger\n• ModifiedNode → Objeto existente modificado\n  (PreviousFields → FinalFields)\n• DeletedNode → Objeto eliminado\n\nLa pegada exata da transação",
            en: "Each transaction records what changed:\n\n• CreatedNode → New object in the ledger\n• ModifiedNode → Existing object modified\n  (PreviousFields → FinalFields)\n• DeletedNode → Object deleted\n\nThe exact footprint of the transaction",
            jp: "各トランザクションが変化を記録：\n\n• CreatedNode → レジャー内の新しいオブジェクト\n• ModifiedNode → 既存オブジェクトの変更\n  （PreviousFields → FinalFields）\n• DeletedNode → 削除されたオブジェクト\n\nトランザクションの正確な足跡",
            ko: "각 트랜잭션은 바뀐 내용을 기록합니다:\n\n• CreatedNode → ledger의 새 객체\n• ModifiedNode → 기존 객체 수정\n  (PreviousFields → FinalFields)\n• DeletedNode → 삭제된 객체\n\n트랜잭션의 정확한 흔적",
            zh: "每笔交易都会记录发生了什么变化：\n\n• CreatedNode → 账本中新建对象\n• ModifiedNode → 已有对象被修改\n  （PreviousFields → FinalFields）\n• DeletedNode → 对象被删除\n\n这就是交易的精确痕迹",
          },
          visual: "🔍",
        },
        {
          title: { es: "Sistema de reservas", pt: "Sistema de reservas", en: "Reserve system", jp: "リザーブシステム", ko: "Reserve 시스템", zh: "Reserve 系统" },
          content: {
            es: "Reserva base: 1 XAH por cuenta\nReserva por objeto: 0.2 XAH cada uno\n\nObjetos que consumen reserva:\n• Trust lines, Ofertas DEX\n• URITokens, Hooks\n\nEliminar objeto = liberar reserva\nDisponible = Balance - Reserva total",
            pt: "Reserva base: 1 XAH por conta\nReserva por objeto: 0.2 XAH cada um\n\nObjetos que consumen reserva:\n• Trust lines, Ofertas DEX\n• URITokens, Hooks\n\nEliminar objeto = liberar reserva\nDisponível = Saldo - Reserva total",
            en: "Base reserve: 1 XAH per account\nOwner reserve: 0.2 XAH each\n\nObjects that consume reserve:\n• Trust lines, DEX Offers\n• URITokens, Hooks\n\nDelete object = free reserve\nAvailable = Balance - Total reserve",
            jp: "基本リザーブ：アカウントごと1 XAH\n所有者リザーブ：オブジェクトごと0.2 XAH\n\nリザーブを消費するオブジェクト：\n• トラストライン、DEXオファー\n• URIToken、Hook\n\nオブジェクト削除 = リザーブ解放\n使用可能 = 残高 - 総リザーブ",
            ko: "기본 reserve: 계정당 1 XAH\n객체 reserve: 객체당 0.2 XAH\n\nreserve를 소비하는 객체:\n• Trust line, DEX 오퍼\n• URIToken, Hook\n\n객체 삭제 = reserve 해제\n사용 가능 = 잔액 - 총 reserve",
            zh: "基础 reserve：每个账户 1 XAH\n对象 reserve：每个对象 0.2 XAH\n\n会消耗 reserve 的对象：\n• Trust lines、DEX 报价\n• URITokens、Hooks\n\n删除对象 = 释放 reserve\n可用余额 = Balance - 总 reserve",
          },
          visual: "💰",
        },
        {
          title: { es: "Orden y consistencia", pt: "Ordem e consistência", en: "Order and consistency", jp: "順序と一貫性", ko: "순서와 일관성", zh: "顺序与一致性" },
          content: {
            es: "Dentro de un ledger:\n\n• Txs ordenadas por hash canónico\n• Procesadas secuencialmente\n• Mismo resultado en todos los nodos\n\nHash del ledger resume:\n• Ledger anterior + Txs + Estado\n• 80% UNL debe coincidir\n• Garantiza consistencia total",
            pt: "Dentro de um ledger:\n\n• Txs ordenadas por hash canônico\n• Processadas sequencialmente\n• Mesmo resultado em todos os nós\n\nHash do ledger resume:\n• Ledger anterior + Txs + Estado\n• 80% UNL deve coincidir\n• Garante consistência total",
            en: "Within a ledger:\n\n• Txs ordered by canonical hash\n• Processed sequentially\n• Same result on all nodes\n\nLedger hash summarizes:\n• Previous ledger + Txs + State\n• 80% UNL must agree\n• Guarantees total consistency",
            jp: "レジャー内：\n\n• 正規ハッシュで順序付け\n• 順次処理\n• すべてのノードで同じ結果\n\nレジャーハッシュが要約：\n• 前のレジャー + トランザクション + 状態\n• UNLの80%が一致必要\n• 完全な一貫性を保証",
            ko: "하나의 ledger 안에서:\n\n• tx는 canonical hash 순으로 정렬\n• 순차적으로 처리\n• 모든 노드에서 같은 결과\n\nledger hash는 다음을 요약:\n• 이전 ledger + tx + 상태\n• UNL의 80%가 일치해야 함\n• 완전한 일관성 보장",
            zh: "在一个 ledger 内：\n\n• 交易按 canonical hash 排序\n• 按顺序逐笔处理\n• 所有节点得到相同结果\n\nledger hash 汇总了：\n• 前一个 ledger + 交易 + 状态\n• 必须有 80% 的 UNL 一致\n• 这保证了完整一致性",
          },
          visual: "🔗",
        },
      ],
    },
  ],
}

const arabicModuleTranslations = {
  title: "تشريح المعاملة",
  lessons: {
    m5bl1: {
      title: "دورة حياة المعاملة",
      theory: `قبل الخوض في الرموز (tokens) أو الرموز غير القابلة للاستبدال (NFTs) أو العقود الذكية، من الضروري فهم **كيف تعمل المعاملة من البداية إلى النهاية** في Xahau. هذه المعرفة ستساعدك على تشخيص المشاكل وبناء تطبيقات موثوقة.

### التدفق الكامل

تمر المعاملة في Xahau بـ **5 مراحل** من لحظة إنشائها حتى تُسجَّل بشكل دائم في الـ ledger:

1. **البناء (Build)**: تحدد حقول المعاملة (النوع، المصدر، الوجهة، المبلغ، إلخ)
2. **التحضير (autofill)**: يقوم العميل تلقائيًا بملء الحقول التقنية (Fee، Sequence، LastLedgerSequence، NetworkID)
3. **التوقيع (Sign)**: يولّد مفتاحك الخاص توقيعًا تشفيريًا يثبت أنك من قام بتفويض المعاملة
4. **الإرسال (Submit)**: تُرسَل المعاملة الموقّعة إلى عقدة في الشبكة
5. **التحقق (Validate)**: يقوم المدققون (validators) بإدراجها في ledger عبر الإجماع، وتصبح النتيجة نهائية

### المرحلة 1: البناء

تحدد كائن JavaScript يحتوي على حقول المعاملة:

\`\`\`
const tx = {
  TransactionType: "Payment",
  Account: "rSource...",
  Destination: "rDestination...",
  Amount: "1000000",
};
\`\`\`

أنت بحاجة فقط إلى الحقول **الأساسية**. الحقول التقنية تُملأ تلقائيًا في المرحلة التالية.

### المرحلة 2: التحضير (autofill)

تستعلم دالة \`client.autofill(tx)\` من العقدة وتملأ الحقول الناقصة:

- **Fee**: تكلفة المعاملة (بوحدة drops). تُحسب حسب الحمل الحالي على الشبكة
- **Sequence**: رقم تسلسل حسابك (يزداد مع كل معاملة)
- **LastLedgerSequence**: أقصى ledger يمكن أن تُدرج فيه المعاملة (حماية من المعاملات "الشبح")
- **NetworkID**: معرّف الشبكة (testnet مقابل mainnet)

### المرحلة 3: التوقيع

تولّد دالة \`wallet.sign(prepared)\`:
- **توقيعًا رقميًا** باستخدام مفتاحك الخاص (ed25519 أو secp256k1)
- **tx_blob**: المعاملة مُسلسَلة بصيغة سداسية عشرية، جاهزة للإرسال

يثبت التوقيع أنك **أنت وحدك** من فوّض هذه المعاملة. لا يمكن لأحد تعديل المعاملة بعد التوقيع دون إبطال التوقيع.

### المرحلة 4: الإرسال

تُرسَل المعاملة الموقّعة إلى العقدة باستخدام \`client.submit(tx_blob)\` أو \`client.submitAndWait(tx_blob)\`:

- **submit**: يرسل ويعيد النتيجة الأولية فورًا
- **submitAndWait**: يرسل و**ينتظر** حتى يتم التحقق من المعاملة أو رفضها

تنشر العقدة المعاملة إلى بقية عقد الشبكة.

### المرحلة 5: التحقق (الإجماع)

يقرر مدققو الشبكة ما إذا كانوا سيدرجون المعاملة في الـ ledger التالي:

1. تصل المعاملة إلى **طوابير المدققين**
2. يقترح المدققون إدراجها في الـ ledger التالي
3. إذا وافق **80% على الأقل من الـ UNL**، تُدرَج المعاملة
4. يُغلق الـ ledger وتصبح النتيجة **نهائية ولا رجعة فيها**

### كم يستغرق ذلك؟

الوقت من الإرسال حتى التحقق عادة ما يكون بين **3 و5 ثوانٍ**، وهو الوقت الذي يستغرقه إغلاق ledger في Xahau. لا توجد كتل كل 10 دقائق كما في Bitcoin، ولا أوقات تأكيد متغيرة.

### النهائية: نتائج لا رجعة فيها

على عكس البلوكتشينز ذات النهائية الاحتمالية (Bitcoin، Ethereum)، النتيجة في Xahau **حتمية**:
- إذا أُدرجت المعاملة في ledger مُتحقَّق منه، فهي **نهائية**
- لا توجد إعادة تنظيم (reorgs)، ولا تفرعات (forks)، ولا "تأكيدات معلقة"
- \`tesSUCCESS\` = نجاح مضمون، إلى الأبد`,
      codeTitles: [
        "إنشاء .env يحتوي seed الخاص بك",
        "التدفق الكامل خطوة بخطوة",
      ],
      code: [
        `# الملف: .env
# لا ترفع هذا الملف إلى Git

WALLET_SEED=your_testnet_seed_here
DESTINATION=rDestinationAddressHere
XAHAU_NODE=wss://xahau-test.net`,
        `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function fullTransactionFlow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // =============================================
  // المرحلة 1: بناء المعاملة
  // =============================================
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rMXEZJecFdn1dVtE21pZ8duZz2E36KGaCp",
    Amount: "5000000", // 5 XAH بوحدة drops
  };

  console.log("1. تم بناء المعاملة:");
  console.log("   النوع:", tx.TransactionType);
  console.log("   عدد الحقول المحددة:", Object.keys(tx).length);

  // =============================================
  // المرحلة 2: التحضير (autofill)
  // =============================================
  const prepared = await client.autofill(tx);

  console.log("2. تم تحضير المعاملة (autofill):");
  console.log("   Fee:", prepared.Fee, "drops");
  console.log("   Sequence:", prepared.Sequence);
  console.log("   LastLedgerSequence:", prepared.LastLedgerSequence);
  console.log("   NetworkID:", prepared.NetworkID);
  console.log("   إجمالي الحقول:", Object.keys(prepared).length);

  // =============================================
  // المرحلة 3: التوقيع
  // =============================================
  const signed = wallet.sign(prepared);

  console.log("3. تم توقيع المعاملة:");
  console.log("   Hash:", signed.hash);
  console.log("   tx_blob (أول 60 حرفًا):", signed.tx_blob.substring(0, 60) + "...");
  console.log("   طول الـ blob:", signed.tx_blob.length, "حرفًا سداسيًا عشريًا");

  // =============================================
  // المرحلة 4: الإرسال
  // =============================================
  console.log("4. جارٍ الإرسال إلى العقدة...");
  const result = await client.submitAndWait(signed.tx_blob);

  // =============================================
  // المرحلة 5: النتيجة المتحقَّق منها
  // =============================================
  console.log("5. النتيجة المتحقَّق منها:");
  console.log("   TransactionResult:", result.result.meta.TransactionResult);
  console.log("   Ledger:", result.result.ledger_index);
  console.log("   العقد المتأثرة:", result.result.meta.AffectedNodes.length);

  await client.disconnect();
}

fullTransactionFlow().catch(console.error);`,
      ],
      slides: [
        {
          title: "5 مراحل للمعاملة",
          content: "1. Build\n2. Autofill\n3. Sign\n4. Submit\n5. Validate\n\nكل مرحلة تضيف شيئا: الحقول، الرسوم، التوقيع، الإرسال، والنتيجة النهائية.",
        },
        {
          title: "Autofill: الحقول التلقائية",
          content: "autofill يضيف:\n\n• Fee\n• Sequence\n• LastLedgerSequence\n• NetworkID\n\nهذه الحقول تجعل المعاملة صالحة للشبكة الحالية.",
        },
        {
          title: "Finality حتمية",
          content: "submitAndWait ينتظر النتيجة validated\n\nعند ظهور المعاملة في validated ledger، تكون النتيجة نهائية عمليا: نجاح أو فشل واضح.",
        },
      ],
    },
    m5bl2: {
      title: "حقول المعاملة",
      theory: `كل معاملة في Xahau هي **كائن يحتوي حقولًا محددة**. بعض الحقول إلزامية، وبعضها اختياري، وبعضها يملؤه \`autofill()\`. فهم كل حقل سيمنحك تحكمًا كاملًا في معاملاتك.

### الحقول المشتركة بين جميع المعاملات

هذه الحقول موجودة في **كل نوع من أنواع المعاملات**:

| الحقل | إلزامي | الوصف |
|---|---|---|
| **TransactionType** | نعم | النوع: "Payment"، "TrustSet"، "OfferCreate"، إلخ |
| **Account** | نعم | عنوانك (rXXX...) — من يرسل المعاملة |
| **Fee** | Autofill | التكلفة بوحدة drops (1 XAH = 1,000,000 drops) |
| **Sequence** | Autofill | رقم تسلسل حسابك |
| **LastLedgerSequence** | Autofill | أقصى ledger يمكن إدراج المعاملة فيه |
| **NetworkID** | Autofill | معرّف الشبكة (21337 لـ mainnet Xahau) |
| **SigningPubKey** | تلقائي (عند التوقيع) | مفتاحك العام (يُضاف عند التوقيع) |
| **TxnSignature** | تلقائي (عند التوقيع) | التوقيع الرقمي (يُضاف عند التوقيع) |

### TransactionType: أنواع المعاملات

يدعم Xahau أنواعًا كثيرة من المعاملات. أكثرها شيوعًا:

- [Payment](https://xahau.network/docs/protocol-reference/transactions/transaction-types/payment/) — إرسال XAH أو رموز (tokens)
- [TrustSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/trustset/) — إنشاء أو تعديل trust line
- [OfferCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/) — إنشاء عرض في الـ DEX
- [OfferCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercancel/) — إلغاء عرض في الـ DEX
- [AccountSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/accountset/) — تهيئة أعلام (flags) حسابك
- [SetHook](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/) — تثبيت أو إدارة الـ Hooks (العقود الذكية)
- [URITokenMint](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenmint/) — إنشاء NFT (URIToken)
- [URITokenBuy](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenbuy/) — شراء URIToken
- [URITokenCreateSellOffer](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokencreateselloffer/) — عرض URIToken للبيع
- [EscrowCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcreate/) — إنشاء دفعة مشروطة
- [EscrowFinish](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowfinish/) — إتمام escrow
- [EscrowCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcancel/) — إلغاء escrow

### Fee: تكلفة المعاملة

يعمل الـ Fee في Xahau بشكل مختلف عن سلاسل الكتل الأخرى:

- يُعبَّر عنه بوحدة **drops** (1 XAH = 1,000,000 drops)
- الرسم الأساسي هو **12 drops** (0.000012 XAH) — رخيص للغاية
- الرسم **يُحرَق (يُتلَف)** — لا يذهب إلى المدققين ولا إلى أي أحد. يُدمَّر
- عندما تكون الشبكة مزدحمة، قد يرتفع الرسم مؤقتًا (**تصعيد الرسوم / fee escalation**)
- تحسب دالة \`autofill()\` الرسم الأمثل حسب الحمل الحالي على الشبكة

### Sequence: ترتيب المعاملات

الـ Sequence هو **عدّاد تصاعدي** لحسابك:

- يبدأ من الرقم المخصَّص عند تفعيل الحساب
- يزداد بمقدار 1 مع كل معاملة ناجحة
- يضمن معالجة المعاملات **بالترتيب**
- إذا أرسلت معاملتين بنفس رقم الـ Sequence، ستُعالَج واحدة فقط
- إذا فقد رقم تسلسل وسيط (مثلًا: أرسلت 5، 6، 8 دون 7)، تبقى المعاملات 8 وما بعدها في الانتظار حتى تُحل المعاملة رقم 7

### LastLedgerSequence: الحماية من المعاملات "الشبح"

حقل LastLedgerSequence هو **تاريخ انتهاء صلاحية** لمعاملتك:

- يحدد **أقصى رقم ledger** يمكن أن تُدرج فيه المعاملة
- إذا تجاوز الـ ledger الحالي هذا الرقم ولم تُعالَج المعاملة بعد، تُهمَل
- يمنع تنفيذ المعاملات "المفقودة" بعد دقائق أو ساعات
- تحدده دالة \`autofill()\` تلقائيًا (عادة الـ ledger الحالي + 20)

### Flags: معدِّلات السلوك

تقبل أنواع كثيرة من المعاملات حقل **Flags** يعدّل سلوكها:

- الـ flags هي **قيم رقمية** تُجمَع باستخدام عمليات bit
- مثال: \`Flags: 1\` في URITokenMint يفعّل \`tfBurnable\`
- مثال: \`Flags: 131072\` في OfferCreate يفعّل \`tfImmediateOrCancel\`
- يمكنك دمج عدة flags بجمع قيمها

### Memos: بيانات مرفقة

يمكنك إرفاق بيانات بأي معاملة باستخدام حقل **Memos**:

- **MemoType**: نوع MIME بصيغة سداسية عشرية (مثل "text/plain")
- **MemoData**: المحتوى بصيغة سداسية عشرية
- الـ memos **عامة** ومحفوظة بشكل دائم كبيانات معاملة
- لا تؤثر في منطق المعاملة، بل تخزّن معلومات إضافية فقط
- إذا لم تكن بحاجة لاستخدامها، يُنصح بتجنّب هذه الحقول لعدم تخزين بيانات غير ضرورية على البلوكتشين`,
      codeTitles: [
        "فحص الحقول قبل وبعد autofill",
        "بناء أنواع معاملات مختلفة",
      ],
      code: [
        `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function inspectFields() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: process.env.DESTINATION,
    Amount: xahToDrops("1"),
  };

  console.log("قبل autofill:", tx);

  const prepared = await client.autofill(tx);
  console.log("بعد autofill:", prepared);

  await client.disconnect();
}

inspectFields().catch(console.error);`,
        `// أمثلة عن كيفية بناء أنواع مختلفة من المعاملات.
// نعرض فقط الحقول الأساسية — تملأ autofill() الباقي.

// --- Payment: إرسال XAH ---
const payment = {
  TransactionType: "Payment",
  Account: "rOrigin...",
  Destination: "rDestination...",
  Amount: "5000000", // 5 XAH بوحدة drops
};

// --- Payment: إرسال رمز (token) ---
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

// --- TrustSet: إنشاء trust line ---
const trustSet = {
  TransactionType: "TrustSet",
  Account: "rReceiver...",
  LimitAmount: {
    currency: "USD",
    value: "10000",
    issuer: "rIssuer...",
  },
};

// --- OfferCreate: إنشاء عرض في الـ DEX ---
const offer = {
  TransactionType: "OfferCreate",
  Account: "rTrader...",
  TakerPays: { currency: "USD", value: "50", issuer: "rIssuer..." },
  TakerGets: "100000000", // 100 XAH
};

// --- AccountSet: تفعيل flag ---
const accountSet = {
  TransactionType: "AccountSet",
  Account: "rMyAccount...",
  SetFlag: 8, // asfDefaultRipple
};

// --- URITokenMint: إنشاء NFT ---
const mint = {
  TransactionType: "URITokenMint",
  Account: "rCreator...",
  URI: "68747470733A2F2F...", // الرابط بصيغة سداسية عشرية
  Flags: 1, // tfBurnable
};

console.log("لكل نوع حقوله الخاصة.");
console.log("جميعها تشترك في: TransactionType, Account, Fee, Sequence.");`,
      ],
      slides: [
        {
          title: "حقول مشتركة",
          content: "كل معاملة تحتاج حقولا مثل:\n\n• TransactionType\n• Account\n• Fee\n• Sequence\n• LastLedgerSequence\n• SigningPubKey\n• TxnSignature",
        },
        {
          title: "أنواع المعاملات",
          content: "Payment → إرسال XAH أو IOU\nTrustSet → TrustLine\nAccountSet → إعدادات الحساب\nOfferCreate → DEX\nSetHook → Hooks\n\nكل نوع له حقوله الخاصة.",
        },
        {
          title: "Fee و Sequence و Flags",
          content: "Fee → تكلفة المعاملة\nSequence → يمنع إعادة استخدام نفس المعاملة\nFlags → bits تغير السلوك\n\nهذه الحقول مهمة للتشخيص.",
        },
      ],
    },
    m5bl3: {
      title: "التوقيع الرقمي والـ serialization",
      theory: `التوقيع الرقمي هو الآلية التي تضمن أن **أنت فقط من يستطيع تفويض المعاملات** من حسابك. فهم كيفية عمله سيساعدك على استيعاب أمان Xahau وتشخيص مشاكل التوقيع.

### ما هو التوقيع الرقمي؟

التوقيع الرقمي هو إثبات رياضي على أن:
1. **أنت من أنشأ المعاملة** (المصادقة)
2. **لم يعدّلها أحد** بعد التوقيع (السلامة)
3. **لا يمكنك إنكار** توقيعك عليها (عدم الإنكار)

### خوارزميات التوقيع في Xahau

يدعم Xahau خوارزميتين تشفيريتين:

| الخوارزمية | بادئة الـ seed | الخصائص |
|---|---|---|
| **ed25519** | sEd... | أسرع، حديثة، موصى بها |
| **secp256k1** | s... (بدون Ed) | متوافقة مع Bitcoin/Ethereum، أقدم |

عند توليد wallet باستخدام \`Wallet.generate()\`، تُستخدم **ed25519** افتراضيًا. الـ seeds التي تبدأ بـ \`sEd\` تستخدم ed25519.

### عملية التوقيع خطوة بخطوة

1. **Serialization (التسلسل)**: تُحوَّل المعاملة (كائن JSON) إلى **صيغة ثنائية (binary)** وفق بروتوكول Xahau. لكل حقل رمز نوع وترتيب محدد.

2. **Hashing (التجزئة)**: يمر الشكل الثنائي المُسلسَل عبر دالة hash (SHA-512 half) للحصول على **ملخص من 32 بايت**.

3. **التوقيع**: يولّد مفتاحك الخاص توقيعًا تشفيريًا على ذلك الـ hash. لا يمكن التحقق من هذا التوقيع إلا بمفتاحك العام.

4. **التجميع**: يُضاف التوقيع (\`TxnSignature\`) ومفتاحك العام (\`SigningPubKey\`) إلى المعاملة المُسلسَلة، لتنتج **tx_blob** النهائي.

### tx_blob: المعاملة الجاهزة للإرسال

الـ \`tx_blob\` هو سلسلة سداسية عشرية تحتوي على **المعاملة كاملة** (الحقول + التوقيع) بصيغة ثنائية. وهو ما يُرسَل فعليًا إلى الشبكة:

\`\`\`
wallet.sign(prepared)
// تُعيد: { tx_blob: "1200002280000000...", hash: "A1B2C3..." }
\`\`\`

- **tx_blob**: المعاملة المُسلسَلة والموقّعة (سداسي عشري)
- **hash**: المعرّف الفريد للمعاملة (للبحث عنها لاحقًا)

### التحقق من التوقيع

عندما تستقبل عقدة الـ tx_blob الخاص بك:

1. تفكّ تسلسل الـ blob لاستخراج الحقول
2. تستخرج \`SigningPubKey\` و \`TxnSignature\`
3. تتحقق من أن التوقيع يطابق البيانات والمفتاح العام
4. تتحقق من أن المفتاح العام يطابق عنوان \`Account\`
5. إذا تطابق كل شيء، تكون المعاملة صالحة

إذا عدّل أحدهم **بت واحد فقط** من الـ tx_blob، يصبح التوقيع غير صالح وتُرفض المعاملة.

### التوقيع دون اتصال (Offline)

يمكنك توقيع المعاملات **دون اتصال بالإنترنت**:

1. على جهاز متصل: جهّز المعاملة باستخدام \`autofill()\`
2. انسخ المعاملة المجهّزة إلى جهاز غير متصل
3. على الجهاز غير المتصل: وقّع باستخدام \`wallet.sign()\`
4. انسخ الـ \`tx_blob\` مرة أخرى إلى الجهاز المتصل
5. أرسِله باستخدام \`client.submit(tx_blob)\`

هذا مفيد لمحافظ **cold wallets** — إذ لا تلامس المفاتيح الخاصة أبدًا جهازًا متصلًا بالإنترنت.

### التوقيع المتعدد (MultiSign)

يدعم Xahau **التوقيع المتعدد**: معاملة تتطلب توقيع **عدة حسابات** لتكون صالحة. يُعدّ باستخدام \`SignerListSet\`:

- تحدد قائمة موقّعين (SignerList) بأوزانهم
- تحدد حدًا أدنى للنصاب (quorum)
- يوقّع كل موقّع المعاملة بشكل منفصل
- تُجمَع التوقيعات وتُرسَل معًا
- مفيد للحسابات المشتركة، أو المنظمات اللامركزية (DAOs)، أو للأمان الإضافي`,
      codeTitles: [
        "التوقيع والتحقق من tx_blob",
        "توقيع offline: التحضير في جهة والتوقيع في جهة أخرى",
      ],
      code: [
        `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function detailedSigning() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  console.log("=== معلومات المحفظة ===");
  console.log("العنوان:", wallet.address);
  console.log("المفتاح العام:", wallet.publicKey);
  console.log("الخوارزمية:", wallet.publicKey.startsWith("ED") ? "ed25519" : "secp256k1");

  // البناء والتحضير
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  };

  const prepared = await client.autofill(tx);

  // التوقيع
  const signed = wallet.sign(prepared);

  console.log("=== نتيجة التوقيع ===");
  console.log("Hash (معرّف المعاملة):", signed.hash);
  console.log("tx_blob الكامل:", signed.tx_blob);
  console.log("الطول:", signed.tx_blob.length, "حرفًا سداسيًا عشريًا");
  console.log("الحجم:", signed.tx_blob.length / 2, "بايت");

  // التحقق من أن المعاملة صالحة
  // (تقوم العقدة بهذا داخليًا عند استقبال submit)
  console.log("=== التحقق ===");

  // فك ترميز الـ blob للفحص
  const decoded = client.request({
    command: "tx",
    transaction: signed.hash,
  }).catch(() => {
    // المعاملة لم تدخل الـ ledger بعد، هذا طبيعي
    console.log("لم تُرسَل المعاملة بعد (تم توقيعها فقط).");
  });

  // الإرسال
  console.log("جارٍ إرسال tx_blob إلى العقدة...");
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("النتيجة:", result.result.meta.TransactionResult);

  // الآن يمكننا البحث عنها بواسطة hash
  const txInfo = await client.request({
    command: "tx",
    transaction: signed.hash,
  });

  console.log("=== المعاملة في الـ ledger ===");
  console.log("النوع:", txInfo.result.TransactionType);
  console.log("SigningPubKey:", txInfo.result.SigningPubKey);
  console.log("Ledger:", txInfo.result.ledger_index);

  await client.disconnect();
}

detailedSigning().catch(console.error);`,
        `require("dotenv").config();
const { Client, Wallet } = require("xahau");

// =============================================
// الخطوة 1: على الجهاز المتصل
// تحضير المعاملة (يتطلب اتصالًا)
// =============================================
async function prepareOnline() {
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

  // حفظها كـ JSON لنقلها إلى الجهاز غير المتصل
  const txParaFirmar = JSON.stringify(prepared, null, 2);
  console.log("=== انسخ هذا الـ JSON إلى الجهاز غير المتصل ===");
  console.log(txParaFirmar);

  return prepared;
}

// =============================================
// الخطوة 2: على الجهاز غير المتصل (بدون إنترنت)
// توقيع المعاملة
// =============================================
function signOffline(preparedJSON) {
  // المفتاح الخاص موجود فقط على الجهاز غير المتصل
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const signed = wallet.sign(preparedJSON);

  console.log("=== انسخ هذا الـ tx_blob إلى الجهاز المتصل ===");
  console.log("tx_blob:", signed.tx_blob);
  console.log("hash:", signed.hash);

  return signed;
}

// =============================================
// الخطوة 3: على الجهاز المتصل
// إرسال المعاملة الموقّعة
// =============================================
async function sendOnline(txBlob) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const result = await client.submitAndWait(txBlob);
  console.log("النتيجة:", result.result.meta.TransactionResult);

  await client.disconnect();
}

// عرض توضيحي للتدفق الكامل (في سكربت واحد للتبسيط)
async function demo() {
  const prepared = await prepareOnline();
  const signed = signOffline(prepared);
  await sendOnline(signed.tx_blob);
}

demo().catch(console.error);`,
      ],
      slides: [
        {
          title: "ما هو التوقيع الرقمي؟",
          content: "إثبات تشفيري بأن صاحب seed وافق على المعاملة\n\n• لا يكشف المفتاح الخاص\n• يبطل إذا تغيرت المعاملة\n• يمكن لأي عقدة التحقق منه",
        },
        {
          title: "عملية التوقيع",
          content: "1. بناء transaction object\n2. Autofill\n3. Serialization\n4. توقيع بالمفتاح الخاص\n5. إنتاج tx_blob و hash",
        },
        {
          title: "Offline signing و multi-signing",
          content: "Offline signing:\n• الجهاز offline يوقع فقط\n• الجهاز online يرسل tx_blob\n\nMulti-signing:\n• عدة توقيعات لحسابات حساسة\n• يحتاج إعدادات إضافية",
        },
      ],
    },
    m5bl4: {
      title: "الإرسال والتحقق ونتائج المعاملات",
      theory: `بعد توقيع المعاملة، يجب إرسالها إلى الشبكة وفهم النتائج المحتملة. يمتلك Xahau نظام **رموز نتائج** مفصّلًا جدًا يخبرك بدقة بما حدث.

### submit مقابل submitAndWait

توفر مكتبة \`xahau\` طريقتين لإرسال المعاملات:

**client.submit(tx_blob)**:
- ترسل المعاملة وتعيد النتيجة **فورًا**
- النتيجة الأولية تشير إلى ما إذا قبلت العقدة المعاملة (وليس ما إذا تحقق منها)
- تحتاج للاستعلام لاحقًا بأمر \`tx\` لرؤية النتيجة النهائية
- مفيدة عندما تريد إرسال معاملات كثيرة بسرعة

**client.submitAndWait(tx_blob)**:
- ترسل المعاملة و**تنتظر** حتى تُدرج في ledger مُتحقَّق منه
- تعيد النتيجة النهائية مباشرة
- أكثر ملاءمة لمعظم الحالات
- قد تستغرق 3 إلى 10 ثوانٍ (1-2 ledger)

### تصنيفات رموز النتائج

تُقسَّم نتائج المعاملات إلى فئات حسب **بادئتها**:

### tes: نجاح

\`tesSUCCESS\` هو رمز النجاح الوحيد. يعني أن المعاملة عولجت بشكل صحيح وطُبِّقت التغييرات على الـ ledger.

### tec: أُدرجت المعاملة لكنها فشلت

رموز \`tec\` تعني أن المعاملة **أُدرجت في ledger** (وحُسِم الرسم)، لكن العملية **لم تُنفَّذ**:

| الرمز | المعنى |
|---|---|
| **tecUNFUNDED_PAYMENT** | لا يوجد رصيد كافٍ للدفع |
| **tecNO_LINE** | لا توجد trust line للرمز |
| **tecNO_DST** | حساب الوجهة غير موجود |
| **tecDST_TAG_NEEDED** | حساب الوجهة يتطلب DestinationTag |
| **tecNO_PERMISSION** | لا تملك صلاحية لهذه العملية |
| **tecINSUFFICIENT_RESERVE** | لا تملك XAH كافٍ لاحتياطي الكائن الجديد |
| **tecPATH_DRY** | لم يُعثر على مسار دفع صالح |
| **tecKILLED** | أُلغي العرض بسبب flag تفImmediateOrCancel/tfFillOrKill |

**مهم**: في أخطاء \`tec\`، **يُحسَم** الرسم رغم فشل العملية.

### tef: خطأ قبل المعالجة

رموز \`tef\` تشير إلى أن المعاملة **رُفضت قبل معالجتها**. **لا يُحسَم** الرسم:

| الرمز | المعنى |
|---|---|
| **tefPAST_SEQ** | رقم الـ Sequence استُخدم سابقًا (معاملة مكررة) |
| **tefMAX_LEDGER** | تجاوز الوقت LastLedgerSequence (معاملة منتهية الصلاحية) |
| **tefALREADY** | المعاملة موجودة بالفعل في الطابور |

### tem: خطأ في التنسيق

رموز \`tem\` تشير إلى أن المعاملة **مُشوَّهة** ولن تكون صالحة أبدًا:

| الرمز | المعنى |
|---|---|
| **temMALFORMED** | حقول غير صالحة أو تنسيق غير صحيح |
| **temBAD_AMOUNT** | مبلغ غير صالح (سالب، صفر بوحدة XAH، إلخ) |
| **temBAD_FEE** | رسم غير صالح |
| **temDISABLED** | الميزة معطّلة على هذه الشبكة |
| **temINVALID_FLAG** | flag غير صالح لهذا النوع من المعاملات |

### ter: خطأ مؤقت (أعد المحاولة)

رموز \`ter\` تشير إلى خطأ **مؤقت** قد يُحل إذا أعدت المحاولة:

| الرمز | المعنى |
|---|---|
| **terPRE_SEQ** | هناك معاملة سابقة معلّقة (Sequence أسبق) |
| **terQUEUED** | المعاملة في طابور الانتظار (عدد كبير قيد المعالجة) |
| **terINSUF_FEE_B** | الرسم غير كافٍ بالنظر إلى الحمل الحالي |

### قراءة النتيجة الكاملة

يحتوي كائن النتيجة على كل المعلومات التي تحتاجها:

\`\`\`
result.result.meta.TransactionResult  → الرمز (tesSUCCESS، إلخ)
result.result.meta.AffectedNodes      → ما الذي تغيّر في الـ ledger
result.result.ledger_index             → في أي ledger أُدرجت
result.result.hash                     → معرّف المعاملة الفريد
\`\`\``,
      codeTitles: [
        "التعامل مع كل أنواع النتائج",
      ],
      code: [
        `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function sendChecking() {
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

    // تحليل النتيجة حسب الفئة
    if (codigo === "tesSUCCESS") {
      console.log("نجاح: عولجت المعاملة بشكل صحيح.");
      console.log("Ledger:", result.result.ledger_index);
      console.log("Hash:", signed.hash);

    } else if (codigo.startsWith("tec")) {
      // أُدرجت المعاملة في الـ ledger لكن العملية فشلت
      // حُسِم الرسم فعلًا
      console.log("فشل (tec):", codigo);
      console.log("لم تُنفَّذ العملية لكن حُسِم الرسم.");

      // تشخيص محدد
      switch (codigo) {
        case "tecUNFUNDED_PAYMENT":
          console.log("→ رصيد غير كافٍ.");
          break;
        case "tecNO_DST":
          console.log("→ حساب الوجهة غير موجود.");
          break;
        case "tecDST_TAG_NEEDED":
          console.log("→ الـ DestinationTag مفقود.");
          break;
        case "tecINSUFFICIENT_RESERVE":
          console.log("→ XAH غير كافٍ للاحتياطي.");
          break;
        default:
          console.log("→ راجع التوثيق من أجل:", codigo);
      }

    } else if (codigo.startsWith("tef")) {
      console.log("مرفوضة (tef):", codigo);
      console.log("رُفضت المعاملة قبل المعالجة.");
      console.log("لم يُحسَم الرسم.");

    } else if (codigo.startsWith("tem")) {
      console.log("مُشوَّهة (tem):", codigo);
      console.log("المعاملة بها خطأ في التنسيق.");
      console.log("راجع الحقول والقيم.");

    } else if (codigo.startsWith("ter")) {
      console.log("خطأ مؤقت (ter):", codigo);
      console.log("يمكنك إعادة المحاولة خلال ثوانٍ.");
    }

  } catch (error) {
    console.error("خطأ في الاتصال أو الإرسال:", error.message);
  }

  await client.disconnect();
}

sendChecking().catch(console.error);`,
      ],
      slides: [
        {
          title: "submit مقابل submitAndWait",
          content: "submit:\n• يرسل ويرجع بسرعة\n• نتيجة أولية\n\nsubmitAndWait:\n• يرسل وينتظر validation\n• مناسب للسكربتات التعليمية\n• يعطي نتيجة نهائية أو timeout",
        },
        {
          title: "Result codes",
          content: "tesSUCCESS → نجاح\ntec... → فشل داخل ledger مع fee\ntem... → معاملة malformed\ntef... → فشل نهائي\ntel... → خطأ محلي أو مؤقت",
        },
        {
          title: "أشهر أخطاء tec",
          content: "tecUNFUNDED_PAYMENT → رصيد غير كاف\ntecNO_DST_INSUF_XAH → الوجهة غير مفعلة\ntecNO_LINE → TrustLine غير موجودة\ntecINSUFFICIENT_RESERVE → reserve غير كاف",
        },
      ],
    },
    m5bl5: {
      title: "المعاملات على مستوى الـ ledger",
      theory: `لكي تفهم فعليًا كيف تعمل المعاملات، تحتاج إلى رؤية ما يحدث **داخل الـ ledger** عند معالجة معاملة. هذا سيساعدك على تشخيص المشاكل المعقدة وفهم الـ metadata.

### كيف تعدّل المعاملة الـ ledger؟

عندما تُعالَج معاملة بنجاح، فإنها تعدّل **حالة الـ ledger**، أي الكائنات المخزّنة في قاعدة بيانات الـ ledger. تُسجَّل هذه التغييرات في **metadata** المعاملة.

### AffectedNodes: بصمة المعاملة

حقل \`meta.AffectedNodes\` هو مصفوفة تصف **بالضبط ما الذي تغيّر** في الـ ledger. يمكن أن تكون كل عقدة (node) متأثرة من أحد ثلاثة أنواع:

### CreatedNode: كائن جديد

أُنشئ كائن جديد في الـ ledger:

\`\`\`
{
  "CreatedNode": {
    "LedgerEntryType": "RippleState",  // نوع الكائن
    "LedgerIndex": "ABC123...",         // المعرّف الفريد للكائن
    "NewFields": {                      // حقول الكائن الجديد
      "Balance": { "value": "100" },
      "LowLimit": { ... },
      "HighLimit": { ... }
    }
  }
}
\`\`\`

أمثلة: trust line جديدة، عرض جديد في الـ DEX، URIToken جديد.

### ModifiedNode: كائن مُعدَّل

عُدِّل كائن موجود:

\`\`\`
{
  "ModifiedNode": {
    "LedgerEntryType": "AccountRoot",
    "LedgerIndex": "DEF456...",
    "PreviousFields": {                // الحالة قبل التعديل
      "Balance": "100000000"
    },
    "FinalFields": {                   // الحالة بعد التعديل
      "Balance": "95000000",
      "Sequence": 43
    }
  }
}
\`\`\`

يعرض \`PreviousFields\` فقط الحقول التي **تغيّرت** (وليس كل حقول الكائن). يعرض \`FinalFields\` الحالة الكاملة بعد التغيير.

### DeletedNode: كائن محذوف

أُزيل كائن من الـ ledger:

\`\`\`
{
  "DeletedNode": {
    "LedgerEntryType": "Offer",
    "LedgerIndex": "GHI789...",
    "FinalFields": {                   // الحالة وقت الحذف
      "TakerPays": "0",
      "TakerGets": "0"
    }
  }
}
\`\`\`

أمثلة: عرض مكتمل/ملغى، trust line محذوفة (رصيد صفر)، URIToken محروق.

### تتبع تغييرات الرصيد

في معاملة دفع، يمكنك تتبع بالضبط كيف تحرّكت الأموال بمراقبة عناصر \`ModifiedNode\` من نوع \`AccountRoot\`:

- الحساب المرسل: \`Balance\` ينخفض (أرسل XAH)
- الحساب المستقبل: \`Balance\` يرتفع (استقبل XAH)
- الفرق بين الأرصدة هو \`Amount\` + \`Fee\`

بالنسبة للرموز (IOUs)، تظهر التغييرات في عناصر \`ModifiedNode\` من نوع \`RippleState\`.

### Reserves: نظام الاحتياطي

يستخدم ledger في Xahau نظام **احتياطي (reserve)** يؤثر على رصيدك المتاح:

- **الاحتياطي الأساسي**: 1 XAH — الحد الأدنى لوجود حساب
- **احتياطي الكائن**: 0.2 XAH عن كل كائن يملكه حسابك

كل كائن في الـ ledger (trust line، عرض، URIToken، Hook) يزيد احتياطيك. لا يمكن إنفاق الـ XAH المحجوز حتى تحذف الكائن.

### ترتيب المعالجة داخل ledger

داخل ledger واحد، تُعالَج المعاملات بـ **ترتيب حتمي**:

1. تُرتَّب المعاملات حسب **hash قانوني (canonical hash)** (وليس حسب Sequence أو وقت الإرسال)
2. تُعالَج تسلسليًا وفق هذا الترتيب
3. ترى كل معاملة حالة الـ ledger بعد المعاملة السابقة
4. إذا تنافست معاملتان على نفس الموارد، تفوز الأولى (حسب الـ hash)

هذا يضمن أن **كل المدققين يحسبون النتيجة نفسها بالضبط**، بغض النظر عن الترتيب الذي استقبلوا به المعاملات.

### hash الـ ledger

عند إغلاق ledger، يُحسب **hash** يلخّص:
- hash الـ ledger السابق (سلسلة الـ ledgers)
- كل المعاملات المُدرجة و metadata الخاصة بها
- حالة الـ ledger الكاملة (شجرة الحالة)

إذا حسب أحد المدققين hash مختلفًا عن 80% من الـ UNL، يُهمَل ledger الخاص به، وهذا يضمن اتساق الشبكة.`,
      codeTitles: [
        "تحليل AffectedNodes لمعاملة",
        "استعلام reserve الحالي لحسابك",
      ],
      code: [
        `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function analizarMetadata() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // إرسال دفعة لتحليل الـ metadata الخاصة بها
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
  console.log("=== تحليل الـ METADATA ===");
  console.log("النتيجة:", meta.TransactionResult);
  console.log("العقد المتأثرة:", meta.AffectedNodes.length);

  // تصنيف العقد المتأثرة
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

  // عرض الكائنات المُنشأة
  if (created.length > 0) {
    console.log("--- الكائنات المُنشأة ---");
    for (const n of created) {
      console.log("  +", n.LedgerEntryType);
      console.log("   Index:", n.LedgerIndex);
    }
  }

  // عرض الكائنات المُعدَّلة
  if (modified.length > 0) {
    console.log("--- الكائنات المُعدَّلة ---");
    for (const n of modified) {
      console.log("  ~", n.LedgerEntryType);
      if (n.PreviousFields && n.FinalFields) {
        // عرض تغييرات الرصيد (AccountRoot)
        if (n.PreviousFields.Balance && n.FinalFields.Balance) {
          const before = Number(n.PreviousFields.Balance) / 1000000;
          const after = Number(n.FinalFields.Balance) / 1000000;
          const diff = after - before;
          console.log("   Balance:", before, "→", after, "XAH");
          console.log("   التغيير:", diff > 0 ? "+" : "", diff.toFixed(6), "XAH");
        }
        // عرض تغيير الـ Sequence
        if (n.FinalFields.Sequence) {
          console.log("   Sequence:", n.FinalFields.Sequence);
        }
      }
    }
  }

  // عرض الكائنات المحذوفة
  if (deleted.length > 0) {
    console.log("--- الكائنات المحذوفة ---");
    for (const n of deleted) {
      console.log("  -", n.LedgerEntryType);
    }
  }

  // ملخص الرصيد
  console.log("--- الملخص ---");
  console.log("الرسم المدفوع:", Number(result.result.Fee) / 1000000, "XAH");
  console.log("تم حرق الرسم (لم يذهب إلى أي حساب).");

  await client.disconnect();
}

analizarMetadata().catch(console.error);`,
        `require("dotenv").config();
const { Client } = require("xahau");

async function consultarReserva(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // الحصول على معلومات الخادم للاحتياطيات الحالية
  const serverInfo = await client.request({ command: "server_info" });
  const ledgerInfo = serverInfo.result.info.validated_ledger;
  const baseReserve = ledgerInfo.reserve_base_xrp; // بوحدة XAH
  const ownerReserve = ledgerInfo.reserve_inc_xrp; // بوحدة XAH

  console.log("=== احتياطيات الشبكة ===");
  console.log("الاحتياطي الأساسي (لكل حساب):", baseReserve, "XAH");
  console.log("احتياطي المالك (لكل كائن):", ownerReserve, "XAH");

  // الحصول على معلومات الحساب
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

  console.log("=== حسابك ===");
  console.log("العنوان:", address);
  console.log("الرصيد الكلي:", balance, "XAH");
  console.log("الكائنات في الـ ledger:", ownerCount);
  console.log("الاحتياطي الكلي:", totalReserve, "XAH");
  console.log("  →", baseReserve, "XAH (أساسي)");
  console.log("  +", ownerCount, "x", ownerReserve, "=", ownerCount * ownerReserve, "XAH (كائنات)");
  console.log("المتاح للإنفاق:", available, "XAH");

  // عرض الكائنات التي تملكها
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

  console.log("=== الكائنات حسب النوع ===");
  for (const [tipo, count] of Object.entries(byType)) {
    console.log("  " + tipo + ":", count, "(احتياطي:", count * ownerReserve, "XAH)");
  }

  await client.disconnect();
}
// يمكنك استخدام حسابك أو rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
consultarReserva("rYourAccountHere");`,
      ],
      slides: [
        {
          title: "AffectedNodes",
          content: "Metadata يوضح ما تغير:\n\n• CreatedNode\n• ModifiedNode\n• DeletedNode\n\nبه تعرف كيف أثرت المعاملة على ledger objects.",
        },
        {
          title: "نظام reserve",
          content: "الحساب يحتاج reserve أساسي\n\nكل object قد يزيد OwnerCount\nويحتاج reserve إضافيا\n\nالهدف: منع spam وجعل التخزين له تكلفة.",
        },
        {
          title: "الترتيب والاتساق",
          content: "Sequence يرتب معاملات الحساب\nConsensus يرتب معاملات الشبكة\nValidated ledger يعطي حالة واحدة متفق عليها\n\nالنتيجة: اتساق بين كل العقد.",
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
  title: "Anatomie d'une transaction",
  lessons: {
    m5bl1: {
      title: "Cycle de vie d'une transaction",
      theory: `Avant de se plonger dans les tokens, les NFT ou les smart contracts, il est essentiel de comprendre **comment fonctionne une transaction de bout en bout** sur Xahau. Cette connaissance t'aidera à diagnostiquer les problèmes et à construire des applications robustes.

### Le flux complet

Une transaction sur Xahau traverse **5 phases**, depuis sa création jusqu'à son enregistrement permanent dans le ledger :

1. **Construire** : tu définis les champs de la transaction (type, source, destination, montant, etc.)
2. **Préparer (autofill)** : le client remplit automatiquement les champs techniques (Fee, Sequence, LastLedgerSequence, NetworkID)
3. **Signer** : ta clé privée génère une signature cryptographique prouvant que tu autorises la transaction
4. **Soumettre** : la transaction signée est envoyée à un nœud du réseau
5. **Valider** : les validateurs l'incluent dans un ledger par consensus et le résultat devient final

### Phase 1 : Construire

Tu définis un objet JavaScript contenant les champs de la transaction :

\`\`\`
const tx = {
  TransactionType: "Payment",
  Account: "rSource...",
  Destination: "rDestination...",
  Amount: "1000000",
};
\`\`\`

Tu n'as besoin que des champs **essentiels**. Les champs techniques sont automatiquement remplis lors de la phase suivante.

### Phase 2 : Préparer (autofill)

La méthode \`client.autofill(tx)\` interroge le nœud et remplit les champs manquants :

- **Fee** : le coût de la transaction (en drops). Il est calculé selon la charge actuelle du réseau
- **Sequence** : le numéro de séquence de ton compte (incrémenté à chaque transaction)
- **LastLedgerSequence** : le ledger maximum dans lequel la transaction peut être incluse (protection contre les transactions « fantômes »)
- **NetworkID** : l'identifiant du réseau (testnet ou mainnet)

### Phase 3 : Signer

La méthode \`wallet.sign(prepared)\` génère :
- une **signature numérique** utilisant ta clé privée (ed25519 ou secp256k1)
- le **tx_blob** : la transaction sérialisée au format hexadécimal, prête à être envoyée

La signature prouve que **toi et toi seul** as autorisé cette transaction. Personne ne peut modifier la transaction après signature sans invalider la signature.

### Phase 4 : Soumettre

La transaction signée est envoyée au nœud avec \`client.submit(tx_blob)\` ou \`client.submitAndWait(tx_blob)\` :

- **submit** : envoie et retourne immédiatement le résultat préliminaire
- **submitAndWait** : envoie et **attend** que la transaction soit validée ou rejetée

Le nœud la propage aux autres nœuds du réseau.

### Phase 5 : Valider (Consensus)

Les validateurs du réseau décident d'inclure ou non la transaction dans le prochain ledger :

1. La transaction arrive dans les **files d'attente des validateurs**
2. Les validateurs proposent de l'inclure dans le prochain ledger
3. Si au moins **80 % de l'UNL** est d'accord, elle est incluse
4. Le ledger se ferme et le résultat devient **final et irréversible**

### Combien de temps cela prend-il ?

Le temps entre la soumission et la validation est généralement de **3 à 5 secondes**, le temps que met un ledger à se fermer sur Xahau. Il n'y a ni blocs de 10 minutes comme sur Bitcoin, ni temps de confirmation variables.

### Finalité : des résultats irréversibles

Contrairement aux blockchains à finalité probabiliste (Bitcoin, Ethereum), sur Xahau le résultat est **déterministe** :
- si une transaction est incluse dans un ledger validé, elle est **finale**
- il n'y a ni reorg, ni fork, ni « confirmations en attente »
- \`tesSUCCESS\` = succès garanti, pour toujours`,
      codeTitles: ["Créer .env avec le seed du wallet", "Le flux complet étape par étape"],
      code: [
`# fichier .env
# Ne publie jamais ce fichier
WALLET_SEED=sEdYourTestnetSeedHere
XAHAU_NODE=wss://xahau-test.net`,
`require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function fullTransactionFlow() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // =============================================
  // PHASE 1 : Construire la transaction
  // =============================================
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rMXEZJecFdn1dVtE21pZ8duZz2E36KGaCp",
    Amount: "5000000", // 5 XAH en drops
  };

  console.log("1. Transaction construite :");
  console.log("   Type :", tx.TransactionType);
  console.log("   Champs définis :", Object.keys(tx).length);

  // =============================================
  // PHASE 2 : Préparer (autofill)
  // =============================================
  const prepared = await client.autofill(tx);

  console.log("2. Transaction préparée (autofill) :");
  console.log("   Fee :", prepared.Fee, "drops");
  console.log("   Sequence :", prepared.Sequence);
  console.log("   LastLedgerSequence :", prepared.LastLedgerSequence);
  console.log("   NetworkID :", prepared.NetworkID);
  console.log("   Champs totaux :", Object.keys(prepared).length);

  // =============================================
  // PHASE 3 : Signer
  // =============================================
  const signed = wallet.sign(prepared);

  console.log("3. Transaction signée :");
  console.log("   Hash :", signed.hash);
  console.log("   tx_blob (60 premiers caractères) :", signed.tx_blob.substring(0, 60) + "...");
  console.log("   Longueur du blob :", signed.tx_blob.length, "caractères hex");

  // =============================================
  // PHASE 4 : Soumettre
  // =============================================
  console.log("4. Envoi au nœud...");
  const result = await client.submitAndWait(signed.tx_blob);

  // =============================================
  // PHASE 5 : Résultat validé
  // =============================================
  console.log("5. Résultat validé :");
  console.log("   TransactionResult :", result.result.meta.TransactionResult);
  console.log("   Ledger :", result.result.ledger_index);
  console.log("   Nœuds affectés :", result.result.meta.AffectedNodes.length);

  await client.disconnect();
}

fullTransactionFlow().catch(console.error);`,
      ],
      slides: [
        ["5 phases d'une transaction", "1. Construire le JSON\n2. Compléter avec autofill\n3. Signer\n4. Soumettre\n5. Lire le résultat validé"],
        ["Autofill : champs automatiques", "autofill ajoute les valeurs nécessaires\n\n• Fee\n• Sequence\n• LastLedgerSequence\n\nCela évite beaucoup d'erreurs manuelles."],
        ["Finalité déterministe", "Une transaction validée a un résultat clair\n\ntesSUCCESS signifie succès\nLes autres codes expliquent pourquoi elle n'a pas eu l'effet attendu."],
      ],
    },
    m5bl2: {
      title: "Champs d'une transaction",
      theory: `Chaque transaction sur Xahau est un **objet contenant des champs spécifiques**. Certains champs sont obligatoires, d'autres facultatifs, et d'autres encore sont remplis par \`autofill()\`. Comprendre chaque champ te donnera un contrôle total sur tes transactions.

### Champs communs à toutes les transactions

Ces champs existent dans **tous les types de transaction** :

| Champ | Obligatoire | Description |
|---|---|---|
| **TransactionType** | Oui | Type : "Payment", "TrustSet", "OfferCreate", etc. |
| **Account** | Oui | Ton adresse (rXXX...) — qui envoie la transaction |
| **Fee** | Autofill | Coût en drops (1 XAH = 1 000 000 drops) |
| **Sequence** | Autofill | Numéro de séquence de ton compte |
| **LastLedgerSequence** | Autofill | Ledger maximum pour inclure la tx |
| **NetworkID** | Autofill | Identifiant du réseau (21337 pour le mainnet Xahau) |
| **SigningPubKey** | Auto (signature) | Ta clé publique (ajoutée à la signature) |
| **TxnSignature** | Auto (signature) | La signature numérique (ajoutée à la signature) |

### TransactionType : les types de transaction

Xahau prend en charge de nombreux types de transaction. Les plus courants :

- [Payment](https://xahau.network/docs/protocol-reference/transactions/transaction-types/payment/) — Envoyer du XAH ou des tokens
- [TrustSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/trustset/) — Créer ou modifier une trust line
- [OfferCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercreate/) — Créer une offre sur le DEX
- [OfferCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/offercancel/) — Annuler une offre du DEX
- [AccountSet](https://xahau.network/docs/protocol-reference/transactions/transaction-types/accountset/) — Configurer les flags de ton compte
- [SetHook](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/) — Installer ou gérer des Hooks (smart contracts)
- [URITokenMint](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenmint/) — Créer un NFT (URIToken)
- [URITokenBuy](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokenbuy/) — Acheter un URIToken
- [URITokenCreateSellOffer](https://xahau.network/docs/protocol-reference/transactions/transaction-types/uritokencreateselloffer/) — Mettre en vente un URIToken
- [EscrowCreate](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcreate/) — Créer un paiement conditionnel
- [EscrowFinish](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowfinish/) — Finaliser un escrow
- [EscrowCancel](https://xahau.network/docs/protocol-reference/transactions/transaction-types/escrowcancel/) — Annuler un escrow

### Fee : le coût de la transaction

Le Fee sur Xahau fonctionne différemment des autres blockchains :

- Il est exprimé en **drops** (1 XAH = 1 000 000 drops)
- Le fee de base est de **12 drops** (0,000012 XAH) — extrêmement bon marché
- Le fee est **brûlé** — il ne va ni aux validateurs ni à personne. Il est détruit
- Lorsque le réseau est congestionné, le fee peut temporairement augmenter (**fee escalation**)
- \`autofill()\` calcule le fee optimal selon la charge actuelle du réseau

### Sequence : l'ordre des transactions

Le Sequence est un **compteur incrémental** de ton compte :

- Il commence au numéro attribué lors de l'activation du compte
- Il s'incrémente de 1 à chaque transaction réussie
- Il garantit que les transactions sont traitées **dans l'ordre**
- Si tu envoies deux transactions avec le même Sequence, une seule sera traitée
- Si un Sequence intermédiaire manque (ex. : tu envoies 5, 6, 8 sans le 7), les transactions 8 et suivantes restent en attente jusqu'à ce que la 7 soit résolue

### LastLedgerSequence : protection contre les transactions fantômes

Le champ LastLedgerSequence est une **date d'expiration** pour ta transaction :

- Il spécifie le **numéro de ledger maximum** dans lequel elle peut être incluse
- Si le ledger actuel dépasse ce numéro et que la transaction n'a pas été traitée, elle est écartée
- Cela évite que des transactions « perdues » s'exécutent des minutes ou des heures plus tard
- \`autofill()\` le définit automatiquement (généralement le ledger actuel + 20)

### Flags : modificateurs de comportement

De nombreux types de transaction acceptent un champ **Flags** qui modifie leur comportement :

- Les flags sont des **valeurs numériques** combinées par des opérations binaires
- Exemple : \`Flags: 1\` dans URITokenMint active \`tfBurnable\`
- Exemple : \`Flags: 131072\` dans OfferCreate active \`tfImmediateOrCancel\`
- Tu peux combiner des flags en additionnant leurs valeurs

### Memos : données jointes

Tu peux joindre des données à n'importe quelle transaction via le champ **Memos** :

- **MemoType** : type MIME en hexadécimal (ex. : "text/plain")
- **MemoData** : le contenu en hexadécimal
- Les memos sont **publics** et stockés de façon permanente en tant que données de transaction
- Ils n'affectent pas la logique de la transaction, ils stockent seulement des informations supplémentaires
- Si tu n'en as pas besoin, il est recommandé d'éviter ces champs pour ne pas stocker de données inutiles sur la blockchain`,
      codeTitles: ["Inspecter les champs avant et après autofill", "Construire différents types de transactions"],
      code: [
`// Comparer une transaction avant et après autofill
require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED);
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rDestinationAddressHere",
    Amount: xahToDrops("1"),
  };

  console.log("Avant autofill :", tx);
  const prepared = await client.autofill(tx);
  console.log("Après autofill :", prepared);

  await client.disconnect();
}

main().catch(console.error);`,
`// Exemples de construction de différents types de transaction.
// On ne montre que les champs essentiels — autofill() remplit le reste.

// --- Payment : envoyer du XAH ---
const payment = {
  TransactionType: "Payment",
  Account: "rOrigin...",
  Destination: "rDestination...",
  Amount: "5000000", // 5 XAH en drops
};

// --- Payment : envoyer un token ---
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

// --- TrustSet : créer une trust line ---
const trustSet = {
  TransactionType: "TrustSet",
  Account: "rReceiver...",
  LimitAmount: {
    currency: "USD",
    value: "10000",
    issuer: "rIssuer...",
  },
};

// --- OfferCreate : créer une offre sur le DEX ---
const offer = {
  TransactionType: "OfferCreate",
  Account: "rTrader...",
  TakerPays: { currency: "USD", value: "50", issuer: "rIssuer..." },
  TakerGets: "100000000", // 100 XAH
};

// --- AccountSet : activer un flag ---
const accountSet = {
  TransactionType: "AccountSet",
  Account: "rMyAccount...",
  SetFlag: 8, // asfDefaultRipple
};

// --- URITokenMint : créer un NFT ---
const mint = {
  TransactionType: "URITokenMint",
  Account: "rCreator...",
  URI: "68747470733A2F2F...", // URL en hexadécimal
  Flags: 1, // tfBurnable
};

console.log("Chaque type a ses champs spécifiques.");
console.log("Tous partagent : TransactionType, Account, Fee, Sequence.");`,
      ],
      slides: [
        ["Champs communs", "Account : compte qui signe\nFee : coût réseau\nSequence : ordre de transaction\nFlags : options\nMemos : données facultatives"],
        ["Types de transactions", "Payment, AccountSet, TrustSet, OfferCreate, EscrowCreate...\n\nChaque type a ses champs obligatoires et ses règles."],
        ["Fee, Sequence et Flags", "Fee paie le réseau\nSequence évite les doublons et ordonne\nFlags activent des variantes de comportement"],
      ],
    },
    m5bl3: {
      title: "Signature numérique et sérialisation",
      theory: `La signature numérique est le mécanisme qui garantit que **toi seul peux autoriser des transactions** depuis ton compte. Comprendre son fonctionnement t'aidera à saisir la sécurité de Xahau et à déboguer les problèmes de signature.

### Qu'est-ce qu'une signature numérique ?

Une signature numérique est une preuve mathématique que :
1. **Tu as créé la transaction** (authentification)
2. **Personne ne l'a modifiée** après signature (intégrité)
3. **Tu ne peux pas nier** l'avoir signée (non-répudiation)

### Algorithmes de signature sur Xahau

Xahau prend en charge deux algorithmes cryptographiques :

| Algorithme | Préfixe du seed | Caractéristiques |
|---|---|---|
| **ed25519** | sEd... | Plus rapide, moderne, recommandé |
| **secp256k1** | s... (sans Ed) | Compatible avec Bitcoin/Ethereum, plus ancien |

Lorsque tu génères un wallet avec \`Wallet.generate()\`, **ed25519** est utilisé par défaut. Les seeds commençant par \`sEd\` utilisent ed25519.

### Le processus de signature étape par étape

1. **Sérialisation** : la transaction (objet JSON) est convertie au **format binaire** selon le protocole Xahau. Chaque champ possède un code de type et un ordre précis.

2. **Hashing** : le binaire sérialisé passe par une fonction de hachage (SHA-512 half) pour obtenir un **résumé de 32 octets**.

3. **Signature** : ta clé privée génère une signature cryptographique sur ce hash. Cette signature ne peut être vérifiée qu'avec ta clé publique.

4. **Assemblage** : la signature (\`TxnSignature\`) et ta clé publique (\`SigningPubKey\`) sont ajoutées à la transaction sérialisée, produisant le **tx_blob** final.

### tx_blob : la transaction prête à envoyer

Le \`tx_blob\` est une chaîne hexadécimale contenant **la transaction entière** (champs + signature) au format binaire. C'est ce qui est réellement envoyé au réseau :

\`\`\`
wallet.sign(prepared)
// Retourne : { tx_blob: "1200002280000000...", hash: "A1B2C3..." }
\`\`\`

- **tx_blob** : la transaction sérialisée et signée (hex)
- **hash** : l'identifiant unique de la transaction (pour la retrouver plus tard)

### Vérification de la signature

Lorsqu'un nœud reçoit ton tx_blob :

1. Il désérialise le blob pour extraire les champs
2. Il extrait \`SigningPubKey\` et \`TxnSignature\`
3. Il vérifie que la signature correspond aux données et à la clé publique
4. Il vérifie que la clé publique correspond à l'adresse \`Account\`
5. Si tout correspond, la transaction est valide

Si quelqu'un modifie **ne serait-ce qu'un seul bit** du tx_blob, la signature devient invalide et la transaction est rejetée.

### Signature hors ligne

Tu peux signer des transactions **sans connexion internet** :

1. Sur un appareil connecté : prépare la transaction avec \`autofill()\`
2. Copie la transaction préparée sur un appareil hors ligne
3. Sur l'appareil hors ligne : signe avec \`wallet.sign()\`
4. Recopie le \`tx_blob\` sur l'appareil connecté
5. Soumets-le avec \`client.submit(tx_blob)\`

C'est utile pour les **cold wallets** — les clés privées ne touchent jamais un appareil connecté à internet.

### Signature multiple (MultiSign)

Xahau prend en charge la **signature multiple** : une transaction qui exige la signature de **plusieurs comptes** pour être valide. Elle se configure avec \`SignerListSet\` :

- Tu définis une liste de signataires (SignerList) avec leurs poids
- Tu définis un quorum minimum
- Chaque signataire signe la transaction séparément
- Les signatures sont combinées et soumises ensemble
- Utile pour les comptes partagés, les DAO, ou une sécurité supplémentaire`,
      codeTitles: ["Signer et vérifier le tx_blob", "Signature hors ligne : préparer d'un côté, signer de l'autre"],
      code: [
`require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function detailedSigning() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  console.log("=== INFORMATIONS DU WALLET ===");
  console.log("Adresse :", wallet.address);
  console.log("Clé publique :", wallet.publicKey);
  console.log("Algorithme :", wallet.publicKey.startsWith("ED") ? "ed25519" : "secp256k1");

  // Construire et préparer
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: "rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r",
    Amount: "1000000",
  };

  const prepared = await client.autofill(tx);

  // Signer
  const signed = wallet.sign(prepared);

  console.log("=== RÉSULTAT DE LA SIGNATURE ===");
  console.log("Hash (ID de la tx) :", signed.hash);
  console.log("tx_blob complet :", signed.tx_blob);
  console.log("Longueur :", signed.tx_blob.length, "caractères hex");
  console.log("Taille :", signed.tx_blob.length / 2, "octets");

  // Vérifier que la transaction est valide
  // (le nœud fait cela en interne à la réception du submit)
  console.log("=== VÉRIFICATION ===");

  // Décoder le blob pour inspection
  const decoded = client.request({
    command: "tx",
    transaction: signed.hash,
  }).catch(() => {
    // La tx n'existe pas encore dans le ledger, c'est normal
    console.log("La tx n'a pas encore été soumise (seulement signée).");
  });

  // Soumettre
  console.log("Envoi du tx_blob au nœud...");
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Résultat :", result.result.meta.TransactionResult);

  // Maintenant on peut la retrouver par son hash
  const txInfo = await client.request({
    command: "tx",
    transaction: signed.hash,
  });

  console.log("=== TX DANS LE LEDGER ===");
  console.log("Type :", txInfo.result.TransactionType);
  console.log("SigningPubKey :", txInfo.result.SigningPubKey);
  console.log("Ledger :", txInfo.result.ledger_index);

  await client.disconnect();
}

detailedSigning().catch(console.error);`,
`require("dotenv").config();
const { Client, Wallet } = require("xahau");

// =============================================
// ÉTAPE 1 : Sur l'appareil CONNECTÉ
// Préparer la transaction (nécessite une connexion)
// =============================================
async function prepareOnline() {
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

  // Sauvegarder en JSON pour le transférer sur l'appareil hors ligne
  const txParaFirmar = JSON.stringify(prepared, null, 2);
  console.log("=== COPIE CE JSON SUR L'APPAREIL HORS LIGNE ===");
  console.log(txParaFirmar);

  return prepared;
}

// =============================================
// ÉTAPE 2 : Sur l'appareil HORS LIGNE (sans internet)
// Signer la transaction
// =============================================
function signOffline(preparedJSON) {
  // La clé privée n'existe QUE sur l'appareil hors ligne
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const signed = wallet.sign(preparedJSON);

  console.log("=== COPIE CE tx_blob SUR L'APPAREIL CONNECTÉ ===");
  console.log("tx_blob :", signed.tx_blob);
  console.log("hash :", signed.hash);

  return signed;
}

// =============================================
// ÉTAPE 3 : Sur l'appareil CONNECTÉ
// Soumettre la transaction signée
// =============================================
async function sendOnline(txBlob) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const result = await client.submitAndWait(txBlob);
  console.log("Résultat :", result.result.meta.TransactionResult);

  await client.disconnect();
}

// Démo du flux complet (dans un seul script pour simplifier)
async function demo() {
  const prepared = await prepareOnline();
  const signed = signOffline(prepared);
  await sendOnline(signed.tx_blob);
}

demo().catch(console.error);`,
      ],
      slides: [
        ["Qu'est-ce qu'une signature numérique ?", "Une preuve cryptographique\n\n• Le seed reste secret\n• La clé privée signe\n• Le réseau vérifie avec la clé publique\n• Toute modification invalide la signature"],
        ["Le processus de signature", "1. Sérialiser → JSON vers binaire\n2. Hash → SHA-512 half (32 octets)\n3. Signer → La clé privée génère la signature\n4. Assembler → tx_blob (hex)\n\nwallet.sign(prepared)\n→ { tx_blob: \"1200...\", hash: \"A1B2...\" }"],
        ["Signature hors ligne et multi-signing", "La signature hors ligne réduit l'exposition du seed\n\nLe multi-signing permet d'exiger plusieurs signatures selon la configuration du compte."],
      ],
    },
    m5bl4: {
      title: "Soumission, validation et résultats",
      theory: `Une fois la transaction signée, il faut l'envoyer au réseau et comprendre les résultats possibles. Xahau dispose d'un système de **codes de résultat** très détaillé qui indique exactement ce qui s'est passé.

### submit vs submitAndWait

La librairie \`xahau\` propose deux méthodes pour envoyer des transactions :

**client.submit(tx_blob)** :
- Envoie la transaction et retourne **immédiatement**
- Le résultat préliminaire indique si la transaction a été acceptée par le nœud (pas si elle a été validée)
- Il faut ensuite interroger avec \`tx\` pour connaître le résultat final
- Utile quand tu veux envoyer beaucoup de transactions rapidement

**client.submitAndWait(tx_blob)** :
- Envoie la transaction et **attend** qu'elle soit incluse dans un ledger validé
- Retourne directement le résultat final
- Plus pratique dans la plupart des cas
- Peut prendre 3 à 10 secondes (1-2 ledgers)

### Catégories de codes de résultat

Les résultats de transaction sont répartis en catégories selon leur **préfixe** :

### tes : succès

\`tesSUCCESS\` est le seul code de succès. Il signifie que la transaction a été traitée correctement et que les changements ont été appliqués au ledger.

### tec : transaction incluse mais échouée

Les codes \`tec\` signifient que la transaction a été **incluse dans un ledger** (et le fee a été prélevé), mais que l'opération **n'a pas été exécutée** :

| Code | Signification |
|---|---|
| **tecUNFUNDED_PAYMENT** | Solde insuffisant pour le paiement |
| **tecNO_LINE** | Aucune trust line n'existe pour le token |
| **tecNO_DST** | Le compte destinataire n'existe pas |
| **tecDST_TAG_NEEDED** | Le compte destinataire exige un DestinationTag |
| **tecNO_PERMISSION** | Tu n'as pas la permission pour cette opération |
| **tecINSUFFICIENT_RESERVE** | XAH insuffisant pour la réserve du nouvel objet |
| **tecPATH_DRY** | Aucun chemin de paiement viable trouvé |
| **tecKILLED** | Offre annulée par le flag tfFillOrKill |

**Important** : pour les erreurs \`tec\`, le fee **est quand même prélevé** même si l'opération échoue.

### tef : erreur avant traitement

Les codes \`tef\` indiquent que la transaction a été **rejetée avant d'être traitée**. Le fee **n'est pas prélevé** :

| Code | Signification |
|---|---|
| **tefPAST_SEQ** | Le Sequence a déjà été utilisé (transaction dupliquée) |
| **tefMAX_LEDGER** | LastLedgerSequence est déjà dépassé (transaction expirée) |
| **tefALREADY** | La transaction est déjà dans la file d'attente |

### tem : erreur de format

Les codes \`tem\` indiquent que la transaction est **mal formée** et ne pourrait jamais être valide :

| Code | Signification |
|---|---|
| **temMALFORMED** | Champs invalides ou format incorrect |
| **temBAD_AMOUNT** | Montant invalide (négatif, zéro en XAH, etc.) |
| **temBAD_FEE** | Fee invalide |
| **temDISABLED** | La fonctionnalité est désactivée sur ce réseau |
| **temINVALID_FLAG** | Flag invalide pour ce type de transaction |

### ter : erreur temporaire (réessayer)

Les codes \`ter\` indiquent une erreur **temporaire** qui peut se résoudre en réessayant :

| Code | Signification |
|---|---|
| **terPRE_SEQ** | Une transaction antérieure est en attente (Sequence précédent) |
| **terQUEUED** | La transaction est en attente dans la file (trop de transactions en cours) |
| **terINSUF_FEE_B** | Fee insuffisant compte tenu de la charge actuelle |

### Lire le résultat complet

L'objet résultat contient toutes les informations dont tu as besoin :

\`\`\`
result.result.meta.TransactionResult  → Le code (tesSUCCESS, etc.)
result.result.meta.AffectedNodes      → Ce qui a changé dans le ledger
result.result.ledger_index             → Dans quel ledger elle a été incluse
result.result.hash                     → Hash unique de la transaction
\`\`\``,
      codeTitles: ["Gérer tous les types de résultats"],
      code: [
`require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function sendChecking() {
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

    // Analyser le résultat par catégorie
    if (codigo === "tesSUCCESS") {
      console.log("SUCCÈS : transaction traitée correctement.");
      console.log("Ledger :", result.result.ledger_index);
      console.log("Hash :", signed.hash);

    } else if (codigo.startsWith("tec")) {
      // La tx a été incluse dans le ledger mais l'opération a échoué
      // Le fee A ÉTÉ prélevé
      console.log("ÉCHEC (tec) :", codigo);
      console.log("L'opération n'a pas été exécutée mais le fee a été prélevé.");

      // Diagnostic spécifique
      switch (codigo) {
        case "tecUNFUNDED_PAYMENT":
          console.log("→ Solde insuffisant.");
          break;
        case "tecNO_DST":
          console.log("→ Le compte destinataire n'existe pas.");
          break;
        case "tecDST_TAG_NEEDED":
          console.log("→ Le DestinationTag est manquant.");
          break;
        case "tecINSUFFICIENT_RESERVE":
          console.log("→ XAH insuffisant pour la réserve.");
          break;
        default:
          console.log("→ Consulte la documentation pour :", codigo);
      }

    } else if (codigo.startsWith("tef")) {
      console.log("REJETÉE (tef) :", codigo);
      console.log("La transaction a été rejetée avant traitement.");
      console.log("Le fee N'A PAS été prélevé.");

    } else if (codigo.startsWith("tem")) {
      console.log("MAL FORMÉE (tem) :", codigo);
      console.log("La transaction contient une erreur de format.");
      console.log("Vérifie les champs et les valeurs.");

    } else if (codigo.startsWith("ter")) {
      console.log("ERREUR TEMPORAIRE (ter) :", codigo);
      console.log("Tu peux réessayer dans quelques secondes.");
    }

  } catch (error) {
    console.error("Erreur de connexion ou de soumission :", error.message);
  }

  await client.disconnect();
}

sendChecking().catch(console.error);`,
      ],
      slides: [
        ["submit vs submitAndWait", "submit : envoi rapide\nsubmitAndWait : attend le résultat validé\n\nPour apprendre, submitAndWait donne un retour plus clair."],
        ["Codes de résultat", "tesSUCCESS : succès\ntec... : inclus mais effet échoué\ntef... : échec final\ntem... : transaction mal formée\nter... : réessayer plus tard"],
        ["Erreurs tec courantes", "tecNO_DST_INSUF_XAH\ntecUNFUNDED_PAYMENT\ntecPATH_DRY\ntecNO_LINE\ntecINSUFFICIENT_RESERVE\n\nLis le code avant de deviner."],
      ],
    },
    m5bl5: {
      title: "Les transactions au niveau du ledger",
      theory: `Pour vraiment comprendre comment fonctionnent les transactions, tu dois voir ce qui se passe **à l'intérieur du ledger** quand une transaction est traitée. Cela t'aidera à déboguer des problèmes complexes et à comprendre les métadonnées.

### Comment une transaction modifie-t-elle le ledger ?

Quand une transaction est traitée avec succès, elle modifie l'**état du ledger**, c'est-à-dire les objets stockés dans la base de données du ledger. Ces changements sont enregistrés dans les **métadonnées** de la transaction.

### AffectedNodes : l'empreinte de la transaction

Le champ \`meta.AffectedNodes\` est un tableau qui décrit **exactement ce qui a changé** dans le ledger. Chaque nœud affecté peut être de l'un des trois types suivants :

### CreatedNode : nouvel objet

Un nouvel objet a été créé dans le ledger :

\`\`\`
{
  "CreatedNode": {
    "LedgerEntryType": "RippleState",  // Type d'objet
    "LedgerIndex": "ABC123...",         // ID unique de l'objet
    "NewFields": {                      // Les champs du nouvel objet
      "Balance": { "value": "100" },
      "LowLimit": { ... },
      "HighLimit": { ... }
    }
  }
}
\`\`\`

Exemples : nouvelle trust line, nouvelle offre sur le DEX, nouveau URIToken.

### ModifiedNode : objet modifié

Un objet existant a été modifié :

\`\`\`
{
  "ModifiedNode": {
    "LedgerEntryType": "AccountRoot",
    "LedgerIndex": "DEF456...",
    "PreviousFields": {                // État AVANT
      "Balance": "100000000"
    },
    "FinalFields": {                   // État APRÈS
      "Balance": "95000000",
      "Sequence": 43
    }
  }
}
\`\`\`

\`PreviousFields\` ne montre que les champs qui ont **changé** (pas tous les champs de l'objet). \`FinalFields\` montre l'état complet après le changement.

### DeletedNode : objet supprimé

Un objet a été retiré du ledger :

\`\`\`
{
  "DeletedNode": {
    "LedgerEntryType": "Offer",
    "LedgerIndex": "GHI789...",
    "FinalFields": {                   // État au moment de la suppression
      "TakerPays": "0",
      "TakerGets": "0"
    }
  }
}
\`\`\`

Exemples : offre complétée/annulée, trust line supprimée (solde nul), URIToken brûlé.

### Changements de solde : suivre l'argent

Dans une transaction de paiement, tu peux tracer exactement comment l'argent s'est déplacé en observant les entrées \`ModifiedNode\` de type \`AccountRoot\` :

- Le compte source : \`Balance\` diminue (a envoyé du XAH)
- Le compte destination : \`Balance\` augmente (a reçu du XAH)
- La différence entre les soldes correspond au \`Amount\` + \`Fee\`

Pour les tokens (IOUs), les changements sont visibles dans les entrées \`ModifiedNode\` de type \`RippleState\`.

### Reserves : le système de réserve

Le ledger Xahau utilise un système de **réserve** qui affecte ton solde disponible :

- **Réserve de base** : 1 XAH — minimum pour qu'un compte existe
- **Réserve par objet** : 0,2 XAH pour chaque objet possédé par ton compte

Chaque objet du ledger (trust line, offre, URIToken, Hook) augmente ta réserve. Le XAH réservé ne peut pas être dépensé tant que tu ne supprimes pas l'objet.

### Ordre de traitement au sein d'un ledger

À l'intérieur d'un ledger, les transactions sont traitées dans un **ordre déterministe** :

1. Les transactions sont triées par **hash canonique** (pas par Sequence ni par ordre de soumission)
2. Elles sont traitées séquentiellement dans cet ordre
3. Chaque transaction voit l'état du ledger après la transaction précédente
4. Si deux transactions se disputent les mêmes ressources, la première (par hash) l'emporte

Cela garantit que **tous les validateurs calculent exactement le même résultat**, quel que soit l'ordre dans lequel ils ont reçu les transactions.

### Le hash du ledger

Quand un ledger se ferme, un **hash** est calculé qui résume :
- Le hash du ledger précédent (chaîne de ledgers)
- Toutes les transactions incluses et leurs métadonnées
- L'état complet du ledger (state tree)

Si un validateur calcule un hash différent de celui de 80 % de l'UNL, son ledger est rejeté — cela garantit la cohérence du réseau.`,
      codeTitles: ["Analyser les AffectedNodes d'une transaction", "Consulter la réserve actuelle de ton compte"],
      code: [
`require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function analizarMetadata() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Envoyer un paiement pour analyser ses métadonnées
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
  console.log("=== ANALYSE DES MÉTADONNÉES ===");
  console.log("Résultat :", meta.TransactionResult);
  console.log("Nœuds affectés :", meta.AffectedNodes.length);

  // Classer les nœuds affectés
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

  // Afficher les objets créés
  if (created.length > 0) {
    console.log("--- OBJETS CRÉÉS ---");
    for (const n of created) {
      console.log("  +", n.LedgerEntryType);
      console.log("   Index :", n.LedgerIndex);
    }
  }

  // Afficher les objets modifiés
  if (modified.length > 0) {
    console.log("--- OBJETS MODIFIÉS ---");
    for (const n of modified) {
      console.log("  ~", n.LedgerEntryType);
      if (n.PreviousFields && n.FinalFields) {
        // Afficher les changements de solde (AccountRoot)
        if (n.PreviousFields.Balance && n.FinalFields.Balance) {
          const before = Number(n.PreviousFields.Balance) / 1000000;
          const after = Number(n.FinalFields.Balance) / 1000000;
          const diff = after - before;
          console.log("   Solde :", before, "→", after, "XAH");
          console.log("   Changement :", diff > 0 ? "+" : "", diff.toFixed(6), "XAH");
        }
        // Afficher le changement de Sequence
        if (n.FinalFields.Sequence) {
          console.log("   Sequence :", n.FinalFields.Sequence);
        }
      }
    }
  }

  // Afficher les objets supprimés
  if (deleted.length > 0) {
    console.log("--- OBJETS SUPPRIMÉS ---");
    for (const n of deleted) {
      console.log("  -", n.LedgerEntryType);
    }
  }

  // Résumé du solde
  console.log("--- RÉSUMÉ ---");
  console.log("Fee payé :", Number(result.result.Fee) / 1000000, "XAH");
  console.log("Le fee a été brûlé (il n'est allé à aucun compte).");

  await client.disconnect();
}

analizarMetadata().catch(console.error);`,
`require("dotenv").config();
const { Client } = require("xahau");

async function consultarReserva(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Obtenir les infos du serveur pour les réserves actuelles
  const serverInfo = await client.request({ command: "server_info" });
  const ledgerInfo = serverInfo.result.info.validated_ledger;
  const baseReserve = ledgerInfo.reserve_base_xrp; // En XAH
  const ownerReserve = ledgerInfo.reserve_inc_xrp; // En XAH

  console.log("=== RÉSERVES RÉSEAU ===");
  console.log("Réserve de base (par compte) :", baseReserve, "XAH");
  console.log("Réserve par objet :", ownerReserve, "XAH");

  // Obtenir les infos du compte
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

  console.log("=== TON COMPTE ===");
  console.log("Adresse :", address);
  console.log("Solde total :", balance, "XAH");
  console.log("Objets dans le ledger :", ownerCount);
  console.log("Réserve totale :", totalReserve, "XAH");
  console.log("  →", baseReserve, "XAH (base)");
  console.log("  +", ownerCount, "x", ownerReserve, "=", ownerCount * ownerReserve, "XAH (objets)");
  console.log("Disponible à dépenser :", available, "XAH");

  // Afficher les objets que tu possèdes
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

  console.log("=== OBJETS PAR TYPE ===");
  for (const [tipo, count] of Object.entries(byType)) {
    console.log("  " + tipo + " :", count, "(réserve :", count * ownerReserve, "XAH)");
  }

  await client.disconnect();
}
//Tu peux utiliser ton compte ou rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
consultarReserva("rTonCompteIci");`,
      ],
      slides: [
        ["AffectedNodes", "Liste des objets touchés par une transaction\n\n• CreatedNode\n• ModifiedNode\n• DeletedNode\n\nC'est la trace exacte de l'effet sur le ledger."],
        ["Système de réserve", "Un compte doit garder une réserve de base\n\nCertains objets augmentent la réserve requise\n\nCela évite de remplir le ledger gratuitement."],
        ["Ordre et cohérence", "Les transactions s'appliquent dans un ordre déterministe\n\nLe ledger validé final est le résultat commun accepté par le consensus."],
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
