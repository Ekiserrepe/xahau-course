const moduleData = {
  id: "m1",
  icon: "🧱",
  title: {
    es: "Arquitectura básica de una blockchain No-EVM",
    pt: "Arquitetura básica de uma blockchain Não-EVM",
    en: "Basic Architecture of a Non-EVM Blockchain",
    jp: "Non-EVMブロックチェーンの基本アーキテクチャ",
    ko: "비 EVM 블록체인의 기본 구조",
    zh: "非EVM区块链的基本架构",
  },
  lessons: [
    {
      id: "m1l0",
      title: {
        es: "¿Qué es una blockchain?",
        pt: "O que é uma blockchain?",
        en: "What is a Blockchain?",
        jp: "ブロックチェーンとは？",
        ko: "블록체인이란 무엇인가?",
        zh: "什么是区块链？",
      },
      theory: {
        es: `Antes de hablar de blockchains No-EVM, necesitamos entender **qué es una blockchain** y por qué esta tecnología es revolucionaria.

### Definición simple

Una **blockchain** (cadena de bloques) es un **libro de registros digital, distribuido e inmutable**. Imagina un cuaderno contable que:
- Está **copiado en miles de ordenadores** por todo el mundo (distribuido)
- **Nadie puede borrar ni alterar** lo que ya se ha escrito (inmutable)
- **Cualquiera puede verificar** que los datos son correctos (transparente)
- **No necesita un intermediario** como un banco o una empresa (descentralizado)

### ¿Cómo funciona?

Los datos se agrupan en **bloques**. Cada bloque contiene:
1. Un conjunto de **transacciones** (por ejemplo: "Alice envía 10 tokens a Bob")
2. Un **hash** (huella digital única) del bloque
3. El **hash del bloque anterior**, creando así una cadena

Esta estructura hace que modificar un bloque antiguo sea prácticamente imposible, porque cambiaría su hash y rompería toda la cadena posterior.

### Conceptos clave

**Descentralización**
No hay un servidor central. La red está formada por **nodos** (ordenadores) que mantienen una copia del libro de registros. No hay un punto único de fallo.

**Inmutabilidad**
Una vez que una transacción se incluye en un bloque y se valida, **no se puede modificar ni eliminar**. Esto garantiza un historial fiable.

**Consenso**
Los nodos necesitan un mecanismo para ponerse de acuerdo sobre qué transacciones son válidas. Esto se llama **protocolo de consenso** (lo veremos en detalle en el módulo 2).

**Criptografía**
La blockchain usa funciones criptográficas para:
- **Hashes**: Identificar bloques y verificar integridad de datos
- **Firmas digitales**: Demostrar que una transacción fue autorizada por el propietario
- **Claves público/privada**: Cada usuario tiene un par de claves que actúa como su identidad

**Transacciones**
Son las operaciones que modifican el estado de la blockchain: enviar tokens, crear un contrato, registrar un dato, etc. Cada transacción está **firmada digitalmente** por su emisor.

### Blockchain vs Base de datos tradicional

| Característica | Base de datos tradicional | Blockchain |
|---|---|---|
| Control | Una empresa (centralizada) | Red de nodos (descentralizada) |
| Modificación | Cualquiera con acceso puede editar | Inmutable una vez validado |
| Confianza | Confías en la empresa | Confías en la criptografía y el consenso |
| Transparencia | Privada por defecto | Pública y verificable |
| Intermediario | Necesario (banco, servidor) | No necesario (peer-to-peer) |

### ¿Para qué sirve?

Las blockchains se usan para:
- **Criptomonedas**: Enviar dinero sin bancos (Bitcoin, XAH)
- **Tokens**: Crear activos digitales propios
- **NFTs**: Certificar la propiedad de objetos digitales únicos
- **Smart contracts**: Ejecutar lógica programable de forma automática y confiable
- **Trazabilidad**: Registrar cadenas de suministro, certificados, votaciones, etc.

### Tipos de blockchain

- **Públicas**: Cualquiera puede participar (Bitcoin, Ethereum, Xahau)
- **Privadas/Permisionadas**: Solo miembros autorizados participan (Hyperledger)
- **Híbridas**: Combinan elementos de ambas

En este curso nos centraremos en **Xahau**, una blockchain **pública** diseñada para pagos rápidos, tokens y smart contracts eficientes.`,
        pt: `Antes de falar de blockchains No-EVM, precisamos entender **o que é uma blockchain** e por que esta tecnologia é revolucionária.
### Definição simples
Uma **blockchain** (cadeia de blocos) é um **livro de registros digital, distribuído e imutável**. Imagine um caderno contábil que:
- Está **copiado em milhares de computadores** por todo o mundo (distribuído)
- **Ninguém pode apagar nem alterar** o que já foi escrito (imutável)
- **Qualquer pessoa pode verificar** que os dados são corretos (transparente)
- **Não precisa um intermediário** como um banco ou uma empresa (descentralizado)
### Como funciona?
Os dados são agrupados em **blocos**. Cada bloco contém:
1. Um conjunto de **transações** (por exemplo: "Alice envia 10 tokens a Bob")
2. Um **hash** (impressão digital única) do bloco
3. O **hash do bloco anterior**, criando assim uma cadeia
Esta estrutura faz com que modificar um bloco antigo seja praticamente impossível, porque mudaria seu hash e quebraria toda a cadeia posterior.
### Conceitos-chave
**Descentralização**
Não há um servidor central. A rede está formada por **nós** (ordenadores) que mantêm uma cópia do livro de registros. Não há um ponto único de falha.
**Imutabilidade**
Uma vez que uma transação ela é incluída em um bloco e se valida, **não pode ser modificar nem excluir**. Isso garante um histórico confiável.
**Consenso**
Os nós precisam um mecanismo para chegar a um acordo sobre quais transações são válidas. Isso se chama **protocolo de consenso** (veremos em detalhes no módulo 2).
**Criptografia**
A blockchain usa funções criptográficas para:
- **Hashes**: Identificar blocos e verificar integridade de dados
- **Assinaturas digitais**: Demonstrar que uma transação foi autorizada por o proprietário
- **Chaves pública/privada**: Cada usuário tem um par de chaves que atua como sua identidadee
**Transações**
São as operações que modificam o estado da blockchain: enviar tokens, criar um contrato, registrar um dado, etc. Cada transação está **assinada digitalmente** pelo emissor.
### Blockchain vs Base de dados tradicional
| Característica | Base de dados tradicional | Blockchain |
|---|---|---|
| Control | Uma empresa (centralizada) | Rede de nós (descentralizada) |
| Modificação | Qualquer pessoa com acceso pode editar | Imutável uma vez validado |
| Confiança | Você confia na empresa | Você confia na criptografia e o consenso |
| Transparência | Privada por padrão | Pública e verificável |
| Intermediario | Necessário (banco, servidor) | Não necessário (peer-to-peer) |
### Para que serve?
As blockchains são usadas para:
- **Criptomoedas**: Enviar dinheiro sem bancos (Bitcoin, XAH)
- **Tokens**: Criar ativos digitais próprios
- **NFTs**: Certificar a propriedade de objetos digitais únicos
- **Smart contracts**: Executar lógica programável de forma automática e confiável
- **Rastreabilidade**: Registrar cadeias de suministro, certificados, votações, etc.
### Tipos de blockchain
- **Públicas**: Qualquer pessoa pode participar (Bitcoin, Ethereum, Xahau)
- **Privadas/Permissionadas**: Somente membros autorizados participam (Hyperledger)
- **Híbridas**: Combinam elementos de ambas
Neste curso nos concentraremos em **Xahau**, uma blockchain **pública** projetada para pagamentos rápidos, tokens e smart contracts eficientes.`,
        en: `Before talking about Non-EVM blockchains, we need to understand **what a blockchain is** and why this technology is revolutionary.

### Simple Definition

A **blockchain** is a **digital, distributed, and immutable ledger**. Imagine an accounting book that:
- Is **copied across thousands of computers** around the world (distributed)
- **Nobody can erase or alter** what has already been written (immutable)
- **Anyone can verify** that the data is correct (transparent)
- **Does not need an intermediary** like a bank or a company (decentralized)

### How Does It Work?

Data is grouped into **blocks**. Each block contains:
1. A set of **transactions** (for example: "Alice sends 10 tokens to Bob")
2. A **hash** (unique digital fingerprint) of the block
3. The **hash of the previous block**, thus creating a chain

This structure makes modifying an old block practically impossible, because it would change its hash and break the entire subsequent chain.

### Key Concepts

**Decentralization**
There is no central server. The network is made up of **nodes** (computers) that maintain a copy of the ledger. There is no single point of failure.

**Immutability**
Once a transaction is included in a block and validated, **it cannot be modified or deleted**. This guarantees a reliable history.

**Consensus**
Nodes need a mechanism to agree on which transactions are valid. This is called a **consensus protocol** (we will cover this in detail in module 2).

**Cryptography**
The blockchain uses cryptographic functions for:
- **Hashes**: Identifying blocks and verifying data integrity
- **Digital signatures**: Proving that a transaction was authorized by its owner
- **Public/private keys**: Each user has a key pair that acts as their identity

**Transactions**
These are the operations that modify the state of the blockchain: sending tokens, creating a contract, registering data, etc. Each transaction is **digitally signed** by its sender.

### Blockchain vs Traditional Database

| Feature | Traditional Database | Blockchain |
|---|---|---|
| Control | A company (centralized) | Network of nodes (decentralized) |
| Modification | Anyone with access can edit | Immutable once validated |
| Trust | You trust the company | You trust cryptography and consensus |
| Transparency | Private by default | Public and verifiable |
| Intermediary | Required (bank, server) | Not required (peer-to-peer) |

### What Is It Used For?

Blockchains are used for:
- **Cryptocurrencies**: Sending money without banks (Bitcoin, XAH)
- **Tokens**: Creating your own digital assets
- **NFTs**: Certifying ownership of unique digital objects
- **Smart contracts**: Executing programmable logic automatically and reliably
- **Traceability**: Recording supply chains, certificates, votes, etc.

### Types of Blockchain

- **Public**: Anyone can participate (Bitcoin, Ethereum, Xahau)
- **Private/Permissioned**: Only authorized members participate (Hyperledger)
- **Hybrid**: Combine elements of both

In this course we will focus on **Xahau**, a **public** blockchain designed for fast payments, tokens, and efficient smart contracts.`,
        jp: `Non-EVMブロックチェーンの話をする前に、**ブロックチェーンとは何か**、そしてなぜこの技術が革命的なのかを理解する必要があります。

### シンプルな定義

**ブロックチェーン**（ブロックの連鎖）とは、**デジタルで分散された不変の台帳**です。次のような帳簿をイメージしてください：
- 世界中の**何千ものコンピュータにコピー**されている（分散型）
- すでに書かれた内容を**誰も消したり変更したりできない**（不変性）
- データが正しいことを**誰でも検証できる**（透明性）
- 銀行や企業のような**仲介者が不要**（分散化）

### どのように機能するのか？

データは**ブロック**にまとめられます。各ブロックには以下が含まれます：
1. **トランザクション**のセット: 例：「アリスがボブに10トークンを送る」
2. ブロックの**ハッシュ**: ユニークなデジタル指紋
3. **前のブロックのハッシュ**: これによってチェーンが形成されます

この構造により、古いブロックを改ざんすることは事実上不可能です。変更するとそのハッシュが変わり、その後のチェーン全体が壊れてしまうからです。

### 主要概念

**分散化**
中央サーバーは存在しません。ネットワークは台帳のコピーを保持する**ノード**（コンピュータ）で構成されています。単一障害点はありません。

**不変性**
トランザクションがブロックに含まれ検証されると、**変更も削除もできません**。これにより信頼できる履歴が保証されます。

**コンセンサス**
ノードはどのトランザクションが有効かについて合意するメカニズムを必要とします。これを**コンセンサスプロトコル**と呼びます（モジュール2で詳しく説明します）。

**暗号技術**
ブロックチェーンは以下のために暗号関数を使用します：
- **ハッシュ**：ブロックの識別とデータの整合性検証
- **デジタル署名**：トランザクションが所有者によって承認されたことの証明
- **公開鍵/秘密鍵**：各ユーザーはアイデンティティとして機能する鍵ペアを持つ

**トランザクション**
トークンの送信、コントラクトの作成、データの記録などブロックチェーンの状態を変更する操作です。各トランザクションは送信者によって**デジタル署名**されています。

### ブロックチェーン vs 従来のデータベース

| 特徴 | 従来のデータベース | ブロックチェーン |
|---|---|---|
| 管理 | 企業（中央集権） | ノードのネットワーク（分散型） |
| 変更 | アクセス権を持つ誰でも編集可能 | 検証後は不変 |
| 信頼 | 企業を信頼する | 暗号技術とコンセンサスを信頼する |
| 透明性 | デフォルトで非公開 | 公開かつ検証可能 |
| 仲介者 | 必要（銀行、サーバー） | 不要（ピアツーピア） |

### 何に使われるのか？

ブロックチェーンは次のような用途に使用されます。
- **暗号通貨**：銀行なしでお金を送る（Bitcoin、XAH）
- **トークン**：独自のデジタル資産を作成する
- **NFT**：ユニークなデジタルオブジェクトの所有権を証明する
- **スマートコントラクト**：プログラマブルなロジックを自動かつ信頼性高く実行する
- **トレーサビリティ**：サプライチェーン、証明書、投票などの記録

### ブロックチェーンの種類

- **パブリック**：誰でも参加できる（Bitcoin、Ethereum、Xahau）
- **プライベート/許可型**：承認されたメンバーのみが参加する（Hyperledger）
- **ハイブリッド**：両方の要素を組み合わせる

このコースでは**Xahau**に焦点を当てます。Xahauは高速な支払い、トークン、効率的なスマートコントラクトのために設計された**パブリック**ブロックチェーンです。`,
        ko: `비 EVM 블록체인을 이야기하기 전에, 먼저 **블록체인이 무엇인지** 그리고 왜 이 기술이 혁신적인지 이해해야 합니다.

### 간단한 정의

**블록체인**은 **디지털이고, 분산되어 있으며, 변경하기 어려운 원장**입니다. 다음과 같은 회계 장부를 떠올려 보세요:
- 전 세계 **수천 대의 컴퓨터에 복사**되어 있음
- 이미 기록된 내용을 **누구도 지우거나 바꾸기 어려움**
- **누구나 데이터의 정확성을 검증**할 수 있음
- 은행이나 회사 같은 **중개자가 필요 없음**

### 어떻게 동작할까?

데이터는 **블록**으로 묶입니다. 각 블록에는 다음이 들어 있습니다:
1. **트랜잭션** 집합
2. 블록의 **해시**
3. **이전 블록의 해시**

이 구조 덕분에 과거 블록을 수정하면 이후 체인이 모두 깨지므로 위변조가 매우 어렵습니다.

### 핵심 개념

**탈중앙화**
네트워크는 원장 복사본을 유지하는 **노드**들로 구성됩니다. 단일 장애 지점이 없습니다.

**불변성**
트랜잭션이 포함되고 검증되면 **수정하거나 삭제할 수 없습니다**.

**합의**
노드들은 어떤 트랜잭션이 유효한지 서로 동의해야 하며, 이를 **합의 프로토콜**이라고 합니다.

**암호학**
블록체인은 다음 용도로 암호 기술을 사용합니다:
- **해시**: 블록 식별과 데이터 무결성 검증
- **디지털 서명**: 트랜잭션이 실제 소유자에 의해 승인되었음을 증명
- **공개키/개인키**: 사용자의 네트워크 신원

**트랜잭션**
토큰 전송, 데이터 기록, 계약 실행 같은 상태 변경 작업입니다. 각 트랜잭션은 **디지털 서명**으로 보호됩니다.

### 전통적 데이터베이스와의 차이

| 특징 | 전통적 데이터베이스 | 블록체인 |
|---|---|---|
| 통제 | 한 회사가 관리 | 노드 네트워크가 관리 |
| 수정 | 권한이 있으면 수정 가능 | 검증 후 변경 어려움 |
| 신뢰 | 운영 주체를 신뢰 | 암호학과 합의를 신뢰 |
| 투명성 | 기본적으로 비공개 | 공개적이고 검증 가능 |
| 중개자 | 필요 | 불필요 |

### 어디에 쓰일까?

- **암호화폐**: 은행 없이 돈 전송
- **토큰**: 디지털 자산 발행
- **NFT**: 고유한 디지털 자산의 소유권 증명
- **스마트 컨트랙트**: 자동 실행되는 프로그래밍 로직
- **추적성**: 공급망, 인증서, 투표 등의 기록

### 블록체인의 유형

- **퍼블릭 블록체인**: 누구나 참여 가능
- **프라이빗/허가형 블록체인**: 승인된 참여자만 사용
- **하이브리드 블록체인**: 두 특성을 혼합

이 강좌에서는 빠른 결제, 토큰, 효율적인 스마트 컨트랙트를 위해 설계된 **퍼블릭 블록체인 Xahau**를 중심으로 배웁니다.`,
        zh: `在讨论非EVM区块链之前，我们需要先理解**什么是区块链**，以及为什么这项技术具有革命性意义。

### 简单定义

**区块链**是一种**数字化、分布式且不可篡改的账本**。可以把它想象成一本记账册：
- **复制在全球数千台计算机上**（分布式）
- **任何人都无法删除或修改**已写入的内容（不可篡改）
- **任何人都可以验证**数据的正确性（透明）
- **不需要银行或公司等中间人**（去中心化）

### 它是如何工作的？

数据被分组成**区块**，每个区块包含：
1. 一批**交易**（例如："Alice 向 Bob 发送 10 个代币"）
2. 该区块的**哈希值**（唯一数字指纹）
3. **前一个区块的哈希值**，从而形成链条

这种结构使得修改旧区块几乎不可能，因为任何修改都会改变其哈希值并破坏后续整条链。

### 核心概念

**去中心化**
没有中央服务器。网络由维护账本副本的**节点**（计算机）组成，不存在单点故障。

**不可篡改性**
一旦交易被包含在区块中并经过验证，**就无法修改或删除**，从而保证了可靠的历史记录。

**共识**
节点需要一种机制来就哪些交易有效达成一致，这称为**共识协议**（将在模块2中详细介绍）。

**密码学**
区块链使用密码学函数来实现：
- **哈希**：标识区块并验证数据完整性
- **数字签名**：证明交易已由所有者授权
- **公钥/私钥**：每个用户都有一对密钥作为其身份标识

**交易**
这些是改变区块链状态的操作：发送代币、创建合约、记录数据等。每笔交易都由发送者进行**数字签名**。

### 区块链 vs 传统数据库

| 特性 | 传统数据库 | 区块链 |
|---|---|---|
| 控制 | 一家公司（中心化） | 节点网络（去中心化） |
| 修改 | 有权限者可编辑 | 验证后不可篡改 |
| 信任 | 信任运营公司 | 信任密码学与共识 |
| 透明度 | 默认私有 | 公开可验证 |
| 中间人 | 需要（银行、服务器） | 不需要（点对点） |

### 有什么用途？

区块链被用于：
- **加密货币**：无需银行的转账（比特币、XAH）
- **代币**：创建自己的数字资产
- **NFT**：证明独特数字对象的所有权
- **智能合约**：自动可靠地执行可编程逻辑
- **溯源**：记录供应链、证书、投票等

### 区块链的类型

- **公链**：任何人都可以参与（比特币、以太坊、Xahau）
- **私链/联盟链**：只有授权成员参与（Hyperledger）
- **混合链**：结合两者的特点

本课程将重点介绍 **Xahau**，这是一条专为快速支付、代币发行和高效智能合约设计的**公链**。`,
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "¿Qué es una blockchain?", pt: "O que é uma blockchain?", en: "What is a Blockchain?", jp: "ブロックチェーンとは？", ko: "블록체인이란 무엇인가?", zh: "什么是区块链？" },
          content: {
            es: "Un libro de registros digital:\n\n• Distribuido → Copiado en miles de nodos\n• Inmutable → No se puede alterar\n• Transparente → Cualquiera puede verificar\n• Descentralizado → Sin intermediarios",
            pt: "Um livro de registros digital:\n\n• Distribuído → Copiado em milhares de nós\n• Imutável → Não é possível alterar\n• Transparente → Qualquer pessoa pode verificar\n• Descentralizado → Sem intermediários",
            en: "A digital ledger:\n\n• Distributed → Copied across thousands of nodes\n• Immutable → Cannot be altered\n• Transparent → Anyone can verify\n• Decentralized → No intermediaries",
            jp: "デジタル台帳：\n\n• 分散型 → 何千ものノードにコピー\n• 不変性 → 改ざん不可能\n• 透明性 → 誰でも検証可能\n• 分散化 → 仲介者不要",
            ko: "디지털 원장:\n\n• 분산형 → 수천 개 노드에 복사됨\n• 불변성 → 쉽게 변경 불가\n• 투명성 → 누구나 검증 가능\n• 탈중앙화 → 중개자 없음",
            zh: "数字账本：\n\n• 分布式 → 复制到数千个节点\n• 不可篡改 → 无法被更改\n• 透明 → 任何人都可以验证\n• 去中心化 → 无需中间人",
          },
          visual: "📒",
        },
        {
          title: { es: "Cadena de bloques", pt: "Cadeia de blocos", en: "Chain of Blocks", jp: "ブロックの連鎖", ko: "블록의 연결", zh: "区块链条" },
          content: {
            es: "Bloque 1 → Bloque 2 → Bloque 3 → ...\n\nCada bloque contiene:\n• Transacciones\n• Hash propio (huella digital)\n• Hash del bloque anterior\n\nCambiar un bloque rompe toda la cadena",
            pt: "Bloco 1 → Bloco 2 → Bloco 3 → ...\n\nCada bloco contém:\n• Transações\n• Hash próprio (impressão digital)\n• Hash do bloco anterior\n\nAlterar um bloco quebra toda a cadeia",
            en: "Block 1 → Block 2 → Block 3 → ...\n\nEach block contains:\n• Transactions\n• Its own hash (digital fingerprint)\n• Hash of the previous block\n\nChanging a block breaks the entire chain",
            jp: "ブロック1 → ブロック2 → ブロック3 → ...\n\n各ブロックには：\n• トランザクション\n• 固有のハッシュ（デジタル指紋）\n• 前のブロックのハッシュ\n\nブロックを変更するとチェーン全体が壊れる",
            ko: "블록 1 → 블록 2 → 블록 3 → ...\n\n각 블록에는 다음이 포함됩니다:\n• 트랜잭션\n• 자신의 해시 (디지털 지문)\n• 이전 블록의 해시\n\n하나를 바꾸면 전체 체인이 깨집니다",
            zh: "区块1 → 区块2 → 区块3 → ...\n\n每个区块包含：\n• 交易记录\n• 自身的哈希值（数字指纹）\n• 前一个区块的哈希值\n\n修改任一区块会导致整条链断裂",
          },
          visual: "🔗",
        },
        {
          title: { es: "Conceptos clave", pt: "Conceitos-chave", en: "Key Concepts", jp: "主要概念", ko: "핵심 개념", zh: "核心概念" },
          content: {
            es: "🔐 Criptografía → Hashes y firmas digitales\n🤝 Consenso → Nodos se ponen de acuerdo\n🔑 Claves → Tu identidad en la red\n📝 Transacciones → Operaciones firmadas",
            pt: "🔐 Criptografia → Hashes e assinaturas digitais\n🤝 Consenso → Nós chegam a um acordo\n🔑 Chaves → Sua identidade na rede\n📝 Transações → Operações assinadas",
            en: "🔐 Cryptography → Hashes and digital signatures\n🤝 Consensus → Nodes agree with each other\n🔑 Keys → Your identity on the network\n📝 Transactions → Signed operations",
            jp: "🔐 暗号技術 → ハッシュとデジタル署名\n🤝 コンセンサス → ノードが合意する\n🔑 鍵 → ネットワーク上のアイデンティティ\n📝 トランザクション → 署名された操作",
            ko: "🔐 암호학 → 해시와 디지털 서명\n🤝 합의 → 노드 간 동의\n🔑 키 → 네트워크에서의 신원\n📝 트랜잭션 → 서명된 작업",
            zh: "🔐 密码学 → 哈希与数字签名\n🤝 共识 → 节点达成一致\n🔑 密钥 → 你在网络中的身份\n📝 交易 → 已签名的操作",
          },
          visual: "🧩",
        },
        {
          title: { es: "¿Para qué sirve?", pt: "¿Para quais serve?", en: "What Is It Used For?", jp: "何に使われるのか？", ko: "어디에 사용될까?", zh: "有什么用途？" },
          content: {
            es: "• 💰 Criptomonedas (pagos sin bancos)\n• 🪙 Tokens (activos digitales)\n• 🎨 NFTs (objetos únicos)\n• 🪝 Smart contracts (lógica programable)\n• 📦 Trazabilidad (registros verificables)",
            pt: "• 💰 Criptomoedas (pagamentos sem bancos)\n• 🪙 Tokens (ativos digitais)\n• 🎨 NFTs (objetos únicos)\n• 🪝 Smart contracts (lógica programável)\n• 📦 Rastreabilidade (registros verificáveis)",
            en: "• 💰 Cryptocurrencies (payments without banks)\n• 🪙 Tokens (digital assets)\n• 🎨 NFTs (unique objects)\n• 🪝 Smart contracts (programmable logic)\n• 📦 Traceability (verifiable records)",
            jp: "• 💰 暗号通貨（銀行なしの支払い）\n• 🪙 トークン（デジタル資産）\n• 🎨 NFT（ユニークなオブジェクト）\n• 🪝 スマートコントラクト（プログラマブルなロジック）\n• 📦 トレーサビリティ（検証可能な記録）",
            ko: "• 💰 암호화폐 (은행 없는 결제)\n• 🪙 토큰 (디지털 자산)\n• 🎨 NFT (고유 자산)\n• 🪝 스마트 컨트랙트 (프로그래밍 가능한 로직)\n• 📦 추적성 (검증 가능한 기록)",
            zh: "• 💰 加密货币（无需银行的转账）\n• 🪙 代币（数字资产）\n• 🎨 NFT（独特的数字对象）\n• 🪝 智能合约（可编程逻辑）\n• 📦 溯源（可验证的记录）",
          },
          visual: "🌐",
        },
      ],
    },
    {
      id: "m1l1",
      title: {
        es: "¿Qué es una blockchain No-EVM?",
        pt: "O que é uma blockchain Não-EVM?",
        en: "What is a Non-EVM Blockchain?",
        jp: "Non-EVMブロックチェーンとは？",
        ko: "비 EVM 블록체인이란 무엇인가?",
        zh: "什么是非EVM区块链？",
      },
      theory: {
        es: `Cuando hablamos de blockchains, la mayoría de desarrolladores piensan en **Ethereum** y su máquina virtual (**EVM**). Sin embargo, existen blockchains que funcionan de manera completamente diferente, sin usar la EVM ni Solidity.

### EVM vs No-EVM

| Característica | Blockchain EVM | Blockchain No-EVM (Xahau) |
|---|---|---|
| Lenguaje de contratos | Solidity / Vyper | C (compilado a WebAssembly) |
| Máquina virtual | EVM (Ethereum Virtual Machine) | No usa VM, ejecución nativa WASM |
| Modelo de estado | Cuentas con storage arbitrario | Objetos del ledger tipados |
| Gas / Fees | Gas variable y costoso | Fees fijos y predecibles |
| Modelo de datos | Key-value en storage | Objetos nativos (AccountRoot, TrustLine, etc.) |

### ¿Por qué No-EVM?

Las blockchains No-EVM como **Xahau** fueron diseñadas desde cero para casos de uso específicos: pagos rápidos, tokenización y lógica programable eficiente. No intentan ser "computadoras de propósito general" como Ethereum, sino que optimizan para **rendimiento, bajo coste y finalidad rápida**.

### Xahau: una blockchain No-EVM

**Xahau** es una blockchain de capa 1 que hereda la arquitectura del **XRP Ledger (XRPL)** y le añade la capacidad de ejecutar **Hooks**, smart contracts ligeros escritos en C y compilados a WebAssembly.

A diferencia de las redes EVM, en Xahau:
- Las transacciones son **nativas y tipadas** (Payment, TrustSet, OfferCreate, etc.)
- El ledger mantiene **objetos estructurados**, no estados arbitrarios
- Los smart contracts (Hooks) se ejecutan como **filtros reactivos** sobre las transacciones
- El token nativo es **XAH**`,
        pt: `Quando falamos de blockchains, a maioria dos desenvolvedores pensa em **Ethereum** e sua máquina virtual (**EVM**). No entanto, existem blockchains que funcionam de maneira completamente diferente, sem usar a EVM nem Solidity.
### EVM vs Não-EVM
| Característica | Blockchain EVM | Blockchain No-EVM (Xahau) |
|---|---|---|
| Linguagem de contratos | Solidity / Vyper | C (compilado a WebAssembly) |
| Máquina virtual | EVM (Ethereum Virtual Machine) | Não usa VM, execução nativa WASM |
| Modelo de estado | Contas com storage arbitrário | Objetos do ledger tipados |
| Gas / Fees | Gas variável e caro | Fees fixos e previsíveis |
| Modelo de dados | Key-value em storage | Objetos nativos (AccountRoot, TrustLine, etc.) |
### Por que Não-EVM?
As blockchains No-EVM como **Xahau** foram projetadas desde cero para casos de uso específicos: pagamentos rápidos, tokenização e lógica programável eficiente. No intentan ser "computadoras de propósito geral" como Ethereum, sino que optimizan para **rendimiento, bajo custo e finalidad rápida**.
### Xahau: uma blockchain Não-EVM
**Xahau** é uma blockchain de capa 1 que hereda a arquitectura do **XRP Ledger (XRPL)** e le añade a capacidad de executar **Hooks**, smart contracts ligeros escritos em C e compilados a WebAssembly.
Diferentemente das redes EVM, na Xahau:
- As transações são **nativas e tipadas** (Payment, TrustSet, OfferCreate, etc.)
- O ledger mantem **objetos estruturados**, no estados arbitrários
- Os smart contracts (Hooks) é executadan como **filtros reactivos** sobre as transações
- O token nativo é **XAH**`,
        en: `When we talk about blockchains, most developers think of **Ethereum** and its virtual machine (**EVM**). However, there are blockchains that work in a completely different way, without using the EVM or Solidity.

### EVM vs Non-EVM

| Feature | EVM Blockchain | Non-EVM Blockchain (Xahau) |
|---|---|---|
| Contract language | Solidity / Vyper | C (compiled to WebAssembly) |
| Virtual machine | EVM (Ethereum Virtual Machine) | No VM, native WASM execution |
| State model | Accounts with arbitrary storage | Typed ledger objects |
| Gas / Fees | Variable and expensive gas | Fixed and predictable fees |
| Data model | Key-value in storage | Native objects (AccountRoot, TrustLine, etc.) |

### Why Non-EVM?

Non-EVM blockchains like **Xahau** were designed from scratch for specific use cases: fast payments, tokenization, and efficient programmable logic. They do not try to be "general-purpose computers" like Ethereum, but instead optimize for **performance, low cost, and fast finality**.

### Xahau: a Non-EVM Blockchain

**Xahau** is a layer 1 blockchain that inherits the architecture of the **XRP Ledger (XRPL)** and adds the ability to execute **Hooks**, lightweight smart contracts written in C and compiled to WebAssembly.

Unlike EVM networks, in Xahau:
- Transactions are **native and typed** (Payment, TrustSet, OfferCreate, etc.)
- The ledger maintains **structured objects**, not arbitrary states
- Smart contracts (Hooks) execute as **reactive filters** on transactions
- The native token is **XAH**`,
        jp: `ブロックチェーンと言えば、ほとんどの開発者は**Ethereum**とその仮想マシン（**EVM**）を思い浮かべます。しかし、EVMやSolidityを使わず、まったく異なる方法で機能するブロックチェーンも存在します。

### EVM vs Non-EVM

| 特徴 | EVMブロックチェーン | Non-EVMブロックチェーン（Xahau） |
|---|---|---|
| コントラクト言語 | Solidity / Vyper | C（WebAssemblyにコンパイル） |
| 仮想マシン | EVM（Ethereum Virtual Machine） | VMなし、ネイティブWASM実行 |
| 状態モデル | 任意ストレージを持つアカウント | 型付きレジャーオブジェクト |
| ガス/手数料 | 変動的で高価なガス | 固定で予測可能な手数料 |
| データモデル | ストレージのキーバリュー | ネイティブオブジェクト（AccountRoot、TrustLineなど） |

### なぜNon-EVMなのか？

**Xahau**のようなNon-EVMブロックチェーンは、高速な支払い、トークン化、効率的なプログラマブルロジックなど特定のユースケースのためにゼロから設計されました。Ethereumのような「汎用コンピュータ」を目指すのではなく、**パフォーマンス、低コスト、高速な最終性**に最適化しています。

### Xahau：Non-EVMブロックチェーン

**Xahau**は**XRP Ledger（XRPL）**のアーキテクチャを継承し、**Hooks**（Cで書かれWebAssemblyにコンパイルされた軽量スマートコントラクト）を実行する能力を追加したレイヤー1ブロックチェーンです。

EVMネットワークとは異なり、Xahauでは次の特徴があります。
- トランザクションは**ネイティブかつ型付き**（Payment、TrustSet、OfferCreateなど）
- レジャーは**構造化されたオブジェクト**を維持し、任意の状態ではない
- スマートコントラクト（Hooks）はトランザクションに対する**リアクティブフィルタ**として実行される
- ネイティブトークンは**XAH**`,
        ko: `블록체인을 이야기할 때 많은 개발자는 **Ethereum**과 그 가상 머신인 **EVM**을 먼저 떠올립니다. 하지만 EVM이나 Solidity를 사용하지 않고 전혀 다른 방식으로 동작하는 체인도 있습니다.

### EVM vs 비 EVM

| 특징 | EVM 블록체인 | 비 EVM 블록체인 (Xahau) |
|---|---|---|
| 컨트랙트 언어 | Solidity / Vyper | C (WebAssembly로 컴파일) |
| 가상 머신 | EVM | 별도 VM 없이 WASM 실행 |
| 상태 모델 | 임의 storage를 가진 계정 | 타입이 있는 레저 객체 |
| 가스 / 수수료 | 가변적이고 비쌈 | 고정적이고 예측 가능 |
| 데이터 모델 | key-value storage | 네이티브 객체 중심 |

### 왜 비 EVM일까?

Xahau 같은 비 EVM 체인은 빠른 결제, 토큰화, 효율적인 프로그래밍 로직처럼 특정 사용 사례를 위해 설계되었습니다. Ethereum처럼 범용 컴퓨터를 목표로 하기보다 **성능, 저비용, 빠른 최종성**에 최적화되어 있습니다.

### Xahau: 비 EVM 블록체인

**Xahau**는 **XRP Ledger (XRPL)**의 구조를 계승하면서, C로 작성해 WebAssembly로 컴파일하는 가벼운 스마트 컨트랙트인 **Hooks**를 추가한 레이어 1 블록체인입니다.

EVM 계열과 달리 Xahau에서는:
- 트랜잭션이 **네이티브이며 타입이 명확함**
- 레저가 **구조화된 객체**를 유지함
- Hooks가 트랜잭션 위에서 **반응형 필터**처럼 실행됨
- 네이티브 토큰은 **XAH**임`,
        zh: `谈到区块链，大多数开发者首先想到的是 **以太坊** 及其虚拟机（**EVM**）。然而，也存在完全不同的区块链，它们不使用EVM或Solidity。

### EVM vs 非EVM

| 特性 | EVM区块链 | 非EVM区块链（Xahau） |
|---|---|---|
| 合约语言 | Solidity / Vyper | C（编译为WebAssembly） |
| 虚拟机 | EVM（以太坊虚拟机） | 无VM，原生WASM执行 |
| 状态模型 | 账户拥有任意存储 | 类型化的账本对象 |
| Gas / 手续费 | 可变且昂贵的Gas | 固定且可预测的费用 |
| 数据模型 | 存储中的键值对 | 原生对象（AccountRoot、TrustLine等） |

### 为什么选择非EVM？

**Xahau** 这样的非EVM区块链从一开始就针对特定用例设计：快速支付、代币化和高效的可编程逻辑。它们不追求像以太坊那样的"通用计算机"目标，而是针对**性能、低成本和快速最终确定性**进行了优化。

### Xahau：一条非EVM区块链

**Xahau** 是一条继承了 **XRP账本（XRPL）** 架构的L1区块链，并增加了执行 **Hooks** 的能力——Hooks 是用C语言编写并编译为WebAssembly的轻量级智能合约。

与EVM网络不同，在Xahau中：
- 交易是**原生且类型化的**（Payment、TrustSet、OfferCreate等）
- 账本维护**结构化对象**，而非任意状态
- 智能合约（Hooks）作为交易上的**响应式过滤器**执行
- 原生代币是 **XAH**`,
      },
      codeBlocks: [
        {
          title: {
            es: "Conectar a un nodo Xahau y ver info del servidor",
            pt: "Conectar a um nó Xahau e ver info do servidor",
            en: "Connect to a Xahau node and view server info",
            jp: "Xahauノードに接続してサーバー情報を表示する",
            ko: "Xahau 노드에 연결하고 서버 정보 보기",
            zh: "连接到 Xahau 节点并查看服务器信息",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function serverInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("Red:", info.network_id);
  console.log("Versión:", info.build_version);
  console.log("Ledger actual:", info.validated_ledger.seq);
  console.log("Tipo de red: No-EVM (blockchain Xahau)");

  await client.disconnect();
}

serverInfo();`,
            pt: `const { Client } = require("xahau");
async function serverInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();
  const response = await client.request({
    command: "server_info"
  });
  const info = response.result.info;
  console.log("Rede:", info.network_id);
  console.log("Versión:", info.build_version);
  console.log("Ledger atual:", info.validated_ledger.seq);
  console.log("Tipo de rede: Não-EVM (blockchain Xahau)");
  await client.disconnect();
}
serverInfo();`,
            en: `const { Client } = require("xahau");

async function serverInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("Network:", info.network_id);
  console.log("Version:", info.build_version);
  console.log("Current ledger:", info.validated_ledger.seq);
  console.log("Network type: Non-EVM (Xahau blockchain)");

  await client.disconnect();
}

serverInfo();`,
            jp: `const { Client } = require("xahau");

async function serverInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("ネットワーク:", info.network_id);
  console.log("バージョン:", info.build_version);
  console.log("現在のレジャー:", info.validated_ledger.seq);
  console.log("ネットワーク種別: Non-EVM（Xahauブロックチェーン）");

  await client.disconnect();
}

serverInfo();`,
            ko: `const { Client } = require("xahau");

async function serverInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("네트워크:", info.network_id);
  console.log("버전:", info.build_version);
  console.log("현재 레저:", info.validated_ledger.seq);
  console.log("네트워크 유형: 비 EVM (Xahau 블록체인)");

  await client.disconnect();
}

serverInfo();`,
            zh: `const { Client } = require("xahau");

async function serverInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("网络:", info.network_id);
  console.log("版本:", info.build_version);
  console.log("当前账本:", info.validated_ledger.seq);
  console.log("网络类型: 非EVM (Xahau 区块链)");

  await client.disconnect();
}

serverInfo();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "EVM vs No-EVM", pt: "EVM vs No-EVM", en: "EVM vs Non-EVM", jp: "EVM vs Non-EVM", ko: "EVM vs 비 EVM", zh: "EVM vs 非EVM" },
          content: {
            es: "EVM (Ethereum)\n• Solidity → Bytecode EVM\n• Gas variable\n• Estado arbitrario\n\nNo-EVM (Xahau)\n• C → WebAssembly\n• Fees fijos\n• Objetos tipados del ledger",
            pt: "EVM (Ethereum)\n• Solidity → Bytecode EVM\n• Gas variável\n• Estado arbitrário\n\nNo-EVM (Xahau)\n• C → WebAssembly\n• Fees fixos\n• Objetos tipados do ledger",
            en: "EVM (Ethereum)\n• Solidity → EVM Bytecode\n• Variable gas\n• Arbitrary state\n\nNon-EVM (Xahau)\n• C → WebAssembly\n• Fixed fees\n• Typed ledger objects",
            jp: "EVM（Ethereum）\n• Solidity → EVMバイトコード\n• 変動ガス\n• 任意の状態\n\nNon-EVM（Xahau）\n• C → WebAssembly\n• 固定手数料\n• 型付きレジャーオブジェクト",
            ko: "EVM (Ethereum)\n• Solidity → EVM 바이트코드\n• 가변 가스\n• 임의 상태 저장\n\n비 EVM (Xahau)\n• C → WebAssembly\n• 고정 수수료\n• 타입이 있는 레저 객체",
            zh: "EVM (Ethereum)\n• Solidity → EVM 字节码\n• 可变 Gas\n• 任意状态\n\n非EVM (Xahau)\n• C → WebAssembly\n• 固定手续费\n• 类型化账本对象",
          },
          visual: "⚖️",
        },
        {
          title: { es: "¿Qué es Xahau?", pt: "O que é Xahau?", en: "What is Xahau?", jp: "Xahauとは？", ko: "Xahau란?", zh: "什么是 Xahau？" },
          content: {
            es: "Blockchain de capa 1 basada en XRPL\n\n• Smart Contracts nativos (Hooks)\n• Token nativo: XAH\n• Transacciones tipadas\n• Fees bajos y predecibles\n• Finalidad en 3-5 segundos",
            pt: "Blockchain de capa 1 baseada no XRPL\n\n• Smart Contracts nativos (Hooks)\n• Token nativo: XAH\n• Transações tipadas\n• Fees baixos e previsíveis\n• Finalidade em 3-5 segundos",
            en: "Layer 1 blockchain based on XRPL\n\n• Native Smart Contracts (Hooks)\n• Native token: XAH\n• Typed transactions\n• Low and predictable fees\n• Finality in 3-5 seconds",
            jp: "XRPLベースのレイヤー1ブロックチェーン\n\n• ネイティブスマートコントラクト（Hooks）\n• ネイティブトークン：XAH\n• 型付きトランザクション\n• 低く予測可能な手数料\n• 3〜5秒での最終確定",
            ko: "XRPL 기반의 레이어 1 블록체인\n\n• 네이티브 스마트 컨트랙트 (Hooks)\n• 네이티브 토큰: XAH\n• 타입이 있는 트랜잭션\n• 낮고 예측 가능한 수수료\n• 3~5초 최종성",
            zh: "基于 XRPL 的 L1 区块链\n\n• 原生智能合约 (Hooks)\n• 原生代币: XAH\n• 类型化交易\n• 低廉且可预测的手续费\n• 3-5 秒最终确认",
          },
          visual: "🧱",
        },
        {
          title: { es: "Arquitectura del Ledger", pt: "Arquitetura do Ledger", en: "Ledger Architecture", jp: "レジャーアーキテクチャ", ko: "레저 구조", zh: "账本架构" },
          content: {
            es: "El ledger de Xahau contiene objetos nativos:\n\n• AccountRoot → Cuentas\n• TrustLine → Líneas de confianza\n• Offer → Órdenes de intercambio\n• URIToken → NFTs\n• Hook → Smart contracts\n• HookState → Estado de los Hooks",
            pt: "O ledger da Xahau contém objetos nativos:\n\n• AccountRoot → Contas\n• TrustLine → Linhas de confiança\n• Offer → Ordens de negociação\n• URIToken → NFTs\n• Hook → Smart contracts\n• HookState → Estado dos Hooks",
            en: "The Xahau ledger contains native objects:\n\n• AccountRoot → Accounts\n• TrustLine → Trust lines\n• Offer → Trade orders\n• URIToken → NFTs\n• Hook → Smart contracts\n• HookState → Hook state data",
            jp: "Xahauレジャーにはネイティブオブジェクトが含まれる：\n\n• AccountRoot → アカウント\n• TrustLine → トラストライン\n• Offer → 取引注文\n• URIToken → NFT\n• Hook → スマートコントラクト\n• HookState → Hookの状態データ",
            ko: "Xahau 레저에는 네이티브 객체가 있습니다:\n\n• AccountRoot → 계정\n• TrustLine → 신뢰선\n• Offer → 거래 주문\n• URIToken → NFT\n• Hook → 스마트 컨트랙트\n• HookState → Hook 상태 데이터",
            zh: "Xahau 账本包含原生对象:\n\n• AccountRoot → 账户\n• TrustLine → 信任线\n• Offer → 交易挂单\n• URIToken → NFT\n• Hook → 智能合约\n• HookState → Hook 状态数据",
          },
          visual: "📦",
        },
      ],
    },
    {
      id: "m1l2",
      title: {
        es: "Estructura del ledger en Xahau",
        pt: "Estrutura do ledger na Xahau",
        en: "Ledger Structure in Xahau",
        jp: "Xahauのレジャー構造",
        ko: "Xahau의 레저 구조",
        zh: "Xahau 的账本结构",
      },
      theory: {
        es: `El **ledger** (libro mayor) de Xahau es una base de datos distribuida que almacena el estado completo de la red en un momento dado. Cada ledger tiene un **número de secuencia** único y contiene todos los objetos del estado actual.

### Componentes del Ledger

Cada versión del ledger incluye:
- **Ledger Header**: Metadatos (hash, secuencia, timestamp, fees)
- **State Tree**: Todos los objetos del ledger (cuentas, tokens, hooks, etc.)
- **Transaction Set**: Transacciones que produjeron este ledger

### Tipos de objetos del Ledger

Los objetos están **tipados**, cada tipo tiene campos específicos y predefinidos:

- **AccountRoot**: Representa una cuenta con su balance, secuencia, flags y hooks instalados
- **RippleState (TrustLine)**: Línea de confianza entre dos cuentas para un token
- **Offer**: Orden de compra/venta en el DEX nativo
- **URIToken**: Token no fungible con URI asociado
- **HookDefinition**: Código WASM de un Hook desplegado
- **HookState**: Datos persistentes almacenados por un Hook

### Diferencia clave con EVM

En Ethereum, el estado es un **árbol de cuentas** donde cada cuenta tiene su propio **storage** (key-value arbitrario). En Xahau, el estado son **objetos tipados** con campos predefinidos. Esto es más restrictivo pero mucho más eficiente y fácil de consultar.`,
        pt: `O **ledger** (livro-razão) de Xahau é um banco de dados distribuído que armazena o estado completo da rede em um momento dado. Cada ledger tem um **número de sequência** único e contém todos os objetos do estado atual.
### Componentes do Ledger
Cada versão do ledger inclui:
- **Ledger Header**: Metadados (hash, sequência, timestamp, fees)
- **State Tree**: Todos os objetos do ledger (contas, tokens, hooks, etc.)
- **Transaction Set**: Transações que produziram este ledger
### Tipos de objetos do Ledger
Os objetos estão **tipados**, cada tipo tem campos específicos e predefinidos:
- **AccountRoot**: Representa uma conta com seu saldo, sequência, flags e hooks instalados
- **RippleState (TrustLine)**: Linha de confiança entre duas contas para um token
- **Offer**: Ordem de compra/venda no DEX nativo
- **URIToken**: Token no fungible com URI associado
- **HookDefinition**: Código WASM de um Hook desplegado
- **HookState**: Dados persistentes armazenados por um Hook
### Diferença chave com EVM
Em Ethereum, o estado é um **árbol de contas** donde cada conta tem su próprio **storage** (key-value arbitrário). Em Xahau, o estado são **objetos tipados** com campos predefinidos. Esto é más restrictivo pero mucho más eficiente e fácil de consultar.`,
        en: `The Xahau **ledger** is a distributed database that stores the complete state of the network at a given point in time. Each ledger has a unique **sequence number** and contains all objects of the current state.

### Ledger Components

Each ledger version includes:
- **Ledger Header**: Metadata (hash, sequence, timestamp, fees)
- **State Tree**: All ledger objects (accounts, tokens, hooks, etc.)
- **Transaction Set**: Transactions that produced this ledger

### Ledger Object Types

Objects are **typed**, each type has specific, predefined fields:

- **AccountRoot**: Represents an account with its balance, sequence, flags, and installed hooks
- **RippleState (TrustLine)**: Trust line between two accounts for a token
- **Offer**: Buy/sell order on the native DEX
- **URIToken**: Non-fungible token with an associated URI
- **HookDefinition**: WASM code of a deployed Hook
- **HookState**: Persistent data stored by a Hook

### Key Difference from EVM

In Ethereum, the state is an **account tree** where each account has its own **storage** (arbitrary key-value). In Xahau, the state consists of **typed objects** with predefined fields. This is more restrictive but much more efficient and easier to query.`,
        jp: `Xahauの**レジャー**（台帳）は、特定の時点におけるネットワークの完全な状態を格納する分散データベースです。各レジャーには固有の**シーケンス番号**があり、現在の状態のすべてのオブジェクトが含まれています。

### レジャーのコンポーネント

各レジャーバージョンには以下が含まれます：
- **レジャーヘッダー**：メタデータ（ハッシュ、シーケンス、タイムスタンプ、手数料）
- **状態ツリー**：すべてのレジャーオブジェクト（アカウント、トークン、Hooksなど）
- **トランザクションセット**：このレジャーを生成したトランザクション

### レジャーオブジェクトの種類

オブジェクトは**型付き**されており、各種類には特定の事前定義されたフィールドがあります：

- **AccountRoot**：残高、シーケンス、フラグ、インストールされたHooksを持つアカウントを表す
- **RippleState（TrustLine）**：2つのアカウント間のトークンに対するトラストライン
- **Offer**：ネイティブDEXでの売買オファー
- **URIToken**：URIに紐づく非代替性トークン
- **HookDefinition**：デプロイされたHookのWASMコード
- **HookState**：Hookによって格納された永続的なデータ

### EVMとの主要な違い

Ethereumでは、状態は各アカウントが独自の**ストレージ**（任意のキーバリュー）を持つ**アカウントツリー**です。Xahauでは、状態は事前定義されたフィールドを持つ**型付きオブジェクト**です。これはより制限的ですが、はるかに効率的でクエリが容易です。`,
        ko: `Xahau의 **레저(ledger)**는 특정 시점의 네트워크 전체 상태를 저장하는 분산 데이터베이스입니다. 각 레저는 고유한 **시퀀스 번호**를 가지며 현재 상태의 모든 객체를 포함합니다.

### 레저 구성 요소

각 레저 버전에는 다음이 포함됩니다:
- **Ledger Header**: 해시, 시퀀스, 타임스탬프, 수수료 같은 메타데이터
- **State Tree**: 계정, 토큰, Hooks 등 모든 레저 객체
- **Transaction Set**: 이 레저를 만든 트랜잭션 집합

### 레저 객체 유형

Xahau의 객체는 **타입이 정해져 있으며**, 각 타입은 고정된 필드를 가집니다:

- **AccountRoot**: 잔액, 시퀀스, 플래그, 설치된 Hooks를 가진 계정
- **RippleState (TrustLine)**: 두 계정 사이의 토큰 신뢰선
- **Offer**: 네이티브 DEX의 매수/매도 주문
- **URIToken**: URI가 연결된 NFT
- **HookDefinition**: 배포된 Hook의 WASM 코드
- **HookState**: Hook이 저장한 영속 데이터

### EVM과의 핵심 차이

Ethereum에서는 상태가 각 계정의 임의 key-value storage로 표현됩니다. Xahau에서는 상태가 **미리 정의된 필드를 가진 타입 객체**로 표현됩니다. 더 제한적이지만 그만큼 효율적이고 조회가 쉽습니다.`,
        zh: `Xahau 的**账本（ledger）**是一个分布式数据库，存储了网络在某一时刻的完整状态。每个账本都有唯一的**序列号**，包含当前状态的所有对象。

### 账本组成

每个账本版本包括：
- **Ledger Header**：元数据（哈希、序列号、时间戳、手续费）
- **State Tree**：所有账本对象（账户、代币、Hooks 等）
- **Transaction Set**：生成此账本的交易集合

### 账本对象类型

对象是**类型化的**，每种类型有特定的预定义字段：

- **AccountRoot**：账户，含余额、序列号、标志位和已安装的 Hooks
- **RippleState (TrustLine)**：两个账户之间针对某代币的信任线
- **Offer**：原生 DEX 上的买/卖挂单
- **URIToken**：带关联 URI 的非同质化代币
- **HookDefinition**：已部署 Hook 的 WASM 代码
- **HookState**：Hook 存储的持久化数据

### 与 EVM 的核心区别

在以太坊中，状态是每个账户拥有自己**存储**（任意键值对）的**账户树**。在 Xahau 中，状态是带有预定义字段的**类型化对象**。这更受约束，但效率更高，查询也更方便。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar información del ledger actual",
            pt: "Consultar informação do ledger atual",
            en: "Query current ledger information",
            jp: "現在のレジャー情報を照会する",
            ko: "현재 레저 정보 조회하기",
            zh: "查询当前账本信息",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function getLedgerInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });

  const ledger = response.result.ledger;
  console.log("Seq del Ledger:", ledger.ledger_index);
  console.log("Hash:", ledger.ledger_hash);
  console.log("Cerrado:", ledger.close_time_human);

  await client.disconnect();
}

getLedgerInfo();`,
            pt: `const { Client } = require("xahau");
async function getLedgerInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();
  const response = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });
  const ledger = response.result.ledger;
  console.log("Seq do Ledger:", ledger.ledger_index);
  console.log("Hash:", ledger.ledger_hash);
  console.log("Cerrado:", ledger.close_time_human);
  await client.disconnect();
}
getLedgerInfo();`,
            en: `const { Client } = require("xahau");

async function getLedgerInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });

  const ledger = response.result.ledger;
  console.log("Ledger Seq:", ledger.ledger_index);
  console.log("Hash:", ledger.ledger_hash);
  console.log("Closed:", ledger.close_time_human);

  await client.disconnect();
}

getLedgerInfo();`,
            jp: `const { Client } = require("xahau");

async function getLedgerInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });

  const ledger = response.result.ledger;
  console.log("レジャーシーケンス:", ledger.ledger_index);
  console.log("ハッシュ:", ledger.ledger_hash);
  console.log("クローズ時刻:", ledger.close_time_human);

  await client.disconnect();
}

getLedgerInfo();`,
            ko: `const { Client } = require("xahau");

async function getLedgerInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });

  const ledger = response.result.ledger;
  console.log("레저 시퀀스:", ledger.ledger_index);
  console.log("해시:", ledger.ledger_hash);
  console.log("닫힌 시각:", ledger.close_time_human);

  await client.disconnect();
}

getLedgerInfo();`,
            zh: `const { Client } = require("xahau");

async function getLedgerInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });

  const ledger = response.result.ledger;
  console.log("账本序列号:", ledger.ledger_index);
  console.log("哈希值:", ledger.ledger_hash);
  console.log("关闭时间:", ledger.close_time_human);

  await client.disconnect();
}

getLedgerInfo();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "El Ledger de Xahau", pt: "O Ledger da Xahau", en: "The Xahau Ledger", jp: "Xahauのレジャー", ko: "Xahau의 레저", zh: "Xahau 账本" },
          content: {
            es: "Base de datos distribuida con el estado completo\n\n• Cada ledger tiene un número de secuencia\n• Se cierra cada 3-5 segundos\n• Contiene todos los objetos del estado\n• Inmutable una vez validado",
            pt: "Banco de dados distribuído com o estado completo\n\n• Cada ledger tem um número de sequência\n• É fechado cada 3-5 segundos\n• Contém todos os objetos do estado\n• Imutável uma vez validado",
            en: "Distributed database with the complete state\n\n• Each ledger has a sequence number\n• Closes every 3-5 seconds\n• Contains all state objects\n• Immutable once validated",
            jp: "完全な状態を持つ分散データベース\n\n• 各レジャーにはシーケンス番号がある\n• 3〜5秒ごとにクローズする\n• すべての状態オブジェクトを含む\n• 検証後は不変",
            ko: "전체 상태를 담은 분산 데이터베이스\n\n• 각 레저는 시퀀스 번호를 가짐\n• 3~5초마다 닫힘\n• 모든 상태 객체를 포함\n• 검증 후 변경 어려움",
            zh: "存储完整状态的分布式数据库\n\n• 每个账本有唯一序列号\n• 每 3-5 秒关闭一次\n• 包含所有状态对象\n• 验证后不可篡改",
          },
          visual: "📖",
        },
        {
          title: { es: "Objetos del Ledger", pt: "Objetos do Ledger", en: "Ledger Objects", jp: "レジャーオブジェクト", ko: "레저 객체", zh: "账本对象" },
          content: {
            es: "Objetos tipados y estructurados:\n\n• AccountRoot → Cuentas\n• RippleState → TrustLines\n• Offer → Órdenes DEX\n• URIToken → NFTs\n• HookDefinition → Código de Hooks\n• HookState → Estado de Hooks",
            pt: "Objetos tipados e estruturados:\n\n• AccountRoot → Contas\n• RippleState → TrustLines\n• Offer → Órdenes DEX\n• URIToken → NFTs\n• HookDefinition → Código de Hooks\n• HookState → Estado de Hooks",
            en: "Typed and structured objects:\n\n• AccountRoot → Accounts\n• RippleState → TrustLines\n• Offer → DEX orders\n• URIToken → NFTs\n• HookDefinition → Hook code\n• HookState → Hook state data",
            jp: "型付きかつ構造化されたオブジェクト：\n\n• AccountRoot → アカウント\n• RippleState → トラストライン\n• Offer → DEX注文\n• URIToken → NFT\n• HookDefinition → Hookコード\n• HookState → Hookの状態データ",
            ko: "타입이 정해진 구조화 객체:\n\n• AccountRoot → 계정\n• RippleState → TrustLine\n• Offer → DEX 주문\n• URIToken → NFT\n• HookDefinition → Hook 코드\n• HookState → Hook 상태 데이터",
            zh: "类型化且结构化的对象:\n\n• AccountRoot → 账户\n• RippleState → TrustLine\n• Offer → DEX 挂单\n• URIToken → NFT\n• HookDefinition → Hook 代码\n• HookState → Hook 状态数据",
          },
          visual: "🗂️",
        },
        {
          title: { es: "Detalle de objetos del Ledger", pt: "Detalhe dos objetos do Ledger", en: "Ledger Object Details", jp: "レジャーオブジェクトの詳細", ko: "레저 객체 상세", zh: "账本对象详情" },
          content: {
            es: "Cada objeto tiene campos predefinidos:\n\n• AccountRoot → Balance, Sequence, Flags, Hooks\n• RippleState → Saldo entre dos cuentas para un token\n• Offer → Precio, cantidad, par de intercambio\n• DirectoryNode → Índice que conecta objetos\n\nDiferencia con EVM:\n• Sin storage arbitrario (key-value)\n• Campos fijos → consultas más eficientes",
            pt: "Cada objeto tem campos predefinidos:\n\n• AccountRoot → Saldo, Sequence, Flags, Hooks\n• RippleState → Saldo entre duas contas para um token\n• Offer → Preço, quantidade, par de negociação\n• DirectoryNode → Índice que conecta objetos\n\nDiferença com EVM:\n• Sem storage arbitrário (key-value)\n• Campos fixos → consultas mais eficientes",
            en: "Each object has predefined fields:\n\n• AccountRoot → Balance, Sequence, Flags, Hooks\n• RippleState → Balance between two accounts for a token\n• Offer → Price, amount, trading pair\n• DirectoryNode → Index connecting objects\n\nDifference from EVM:\n• No arbitrary storage (key-value)\n• Fixed fields → more efficient queries",
            jp: "各オブジェクトには事前定義されたフィールドがある：\n\n• AccountRoot → 残高、シーケンス、フラグ、Hooks\n• RippleState → 2つのアカウント間のトークン残高\n• Offer → 価格、数量、取引ペア\n• DirectoryNode → オブジェクトを接続するインデックス\n\nEVMとの違い：\n• 任意ストレージなし（キーバリュー）\n• 固定フィールド → より効率的なクエリ",
            ko: "각 객체는 미리 정의된 필드를 가집니다:\n\n• AccountRoot → 잔액, 시퀀스, 플래그, Hooks\n• RippleState → 두 계정 간 토큰 잔액\n• Offer → 가격, 수량, 거래 쌍\n• DirectoryNode → 객체를 연결하는 인덱스\n\nEVM과의 차이:\n• 임의 storage 없음 (key-value)\n• 고정 필드 → 더 효율적인 조회",
            zh: "每个对象都有预定义字段:\n\n• AccountRoot → 余额, 序列号, 标志位, Hooks\n• RippleState → 两账户间某代币余额\n• Offer → 价格, 数量, 交易对\n• DirectoryNode → 连接对象的索引\n\n与 EVM 的区别:\n• 无任意存储 (key-value)\n• 固定字段 → 查询更高效",
          },
          visual: "🔍",
        },
      ],
    },
    {
      id: "m1l3",
      title: {
        es: "Historia de las blockchains: de Bitcoin a Xahau",
        pt: "História das blockchains: de Bitcoin a Xahau",
        en: "History of Blockchains: from Bitcoin to Xahau",
        jp: "ブロックチェーンの歴史：ビットコインからXahauまで",
        ko: "블록체인 역사: 비트코인에서 Xahau까지",
        zh: "区块链历史：从比特币到 Xahau",
      },
      theory: {
        es: `Para entender por qué Xahau existe y qué la hace diferente, necesitamos recorrer la **historia de las blockchains** y cómo cada generación resolvió problemas que la anterior no podía.

### 2008 — Bitcoin: el nacimiento

Todo empezó con un documento de 9 páginas publicado por **Satoshi Nakamoto** bajo el título *"Bitcoin: A Peer-to-Peer Electronic Cash System"*. La idea era simple y revolucionaria: **dinero digital sin intermediarios**.

Bitcoin introdujo:
- **Proof of Work (PoW)**: Los mineros resuelven problemas matemáticos para validar transacciones
- **Descentralización total**: Sin bancos, sin servidores centrales
- **Inmutabilidad**: Las transacciones confirmadas no se pueden revertir
- **Escasez digital**: Solo existirán 21 millones de BTC

Limitación: Bitcoin es lento (~7 transacciones por segundo) y su lenguaje de scripting es muy limitado. No fue diseñado para ejecutar lógica compleja.

### 2012 — XRP Ledger: velocidad sin minería

Más adelante se creó el **XRP Ledger (o XRPL)**, la primera blockchain importante que **no usa Proof of Work**. En su lugar, usa un protocolo de consenso basado en **validadores de confianza (UNL)**.

XRPL introdujo:
- **Consenso sin minería**: Transacciones confirmadas en 3-5 segundos
- **DEX nativo**: Intercambio descentralizado integrado en el protocolo
- **Tokens nativos**: Crear tokens sin necesidad de smart contracts
- **Fees mínimos**: Fracciones de centavo por transacción

Limitación: XRPL no tenía capacidad para ejecutar smart contracts (lógica programable personalizada).

### 2015 — Ethereum: la computadora mundial

**Vitalik Buterin** publicó el whitepaper de Ethereum con una idea ambiciosa: una blockchain que pudiera ejecutar **cualquier programa**. Así nació la **Ethereum Virtual Machine (EVM)**.

Ethereum introdujo:
- **Smart contracts**: Programas que viven en la blockchain y se ejecutan automáticamente
- **Solidity**: Lenguaje de programación para escribir contratos
- **EVM**: Máquina virtual que ejecuta el código de los contratos
- **ERC-20 / ERC-721**: Estándares para tokens fungibles y NFTs
- **DeFi**: Finanzas descentralizadas (préstamos, exchanges, stablecoins)

Limitación: Gas caro y variable, baja velocidad (~15 TPS), escalabilidad limitada.

### 2020+ — Explosión de L1s y L2s

Los problemas de Ethereum impulsaron una oleada de nuevas blockchains:

- **Solana** (2020): Alta velocidad (~65,000 TPS teóricos) con Proof of History
- **Avalanche** (2020): Subredes personalizables con consenso rápido
- **Polygon** (2020): Solución Layer 2 para escalar Ethereum
- **Arbitrum / Optimism** (2021): Rollups que procesan transacciones fuera de Ethereum
- **Cosmos / Polkadot**: Ecosistemas de blockchains interconectadas

La mayoría de estas redes son **compatibles con EVM** usan Solidity y herramientas de Ethereum.

### 2023 — Xahau: XRPL + Smart Contracts

**Xahau** nace como un **fork del XRP Ledger** que añade la capacidad que XRPL siempre necesitó: **smart contracts**, llamados **Hooks**. Inicialmente Xahau no iba a existir y los Hooks iban a ser parte de XRP Ledger pero Ripple no quiso aceptar esta mejora de la comunidad. Por no desaprovechar el trabajo realizado durante años, Xahau nació.

Xahau introdujo:
- **Hooks**: Smart contracts escritos en C y compilados a WebAssembly
- **XAH**: Token nativo con sistema de emisiones/recompensas
- **Herencia de XRPL**: Conserva la velocidad, el DEX nativo y los fees bajos
- **Sin EVM**: Arquitectura propia, no compatible con Solidity

### ¿Por qué Xahau es un fork de XRPL?

Xahau al ser un fork de XRPL, aprovecha todas las ventajas de una blockchain probada y optimizada para pagos y tokens, y le añade la pieza que faltaba: la capacidad de ejecutar lógica programable directamente en el protocolo.

1. **Base probada**: XRPL lleva funcionando desde 2012 sin interrupciones graves
2. **Velocidad nativa**: El consenso de XRPL ya ofrece 3-5 segundos de finalidad
3. **DEX integrado**: No hay que construir un exchange descentralizado desde cero
4. **Tokens nativos**: El sistema de TrustLines y tokens ya existe y funciona
5. **Comunidad existente**: Desarrolladores y herramientas de XRPL pueden adaptarse

### Línea temporal resumida

| Año | Hito | Innovación clave |
|---|---|---|
| 2008 | Bitcoin | Dinero digital descentralizado |
| 2012 | XRP Ledger | Consenso sin minería, DEX nativo |
| 2015 | Ethereum | Smart contracts (EVM + Solidity) |
| 2017 | ICO boom | Tokens ERC-20, financiación descentralizada |
| 2020 | DeFi Summer | Finanzas descentralizadas en Ethereum |
| 2020+ | L1s/L2s | Solana, Avalanche, Polygon, Rollups |
| 2023 | Xahau | XRPL + Hooks (smart contracts en C/WASM) |`,
        pt: `Para entender por que Xahau existe e o que a torna diferente, precisamos percorrer **história das blockchains** e como cada geração resolveu problemas que a anterior não conseguia.
### 2008 — Bitcoin: o nascimento
Todo começou com um documento de 9 páginas publicado por **Satoshi Nakamoto** com o título *"Bitcoin: A Peer-to-Peer Electronic Cash System"*. A ideia era simple e revolucionária: **dinheiro digital sem intermediários**.
Bitcoin introduziu:
- **Proof of Work (PoW)**: Os mineradores resolvem problemas matemáticos para validar transações
- **Descentralização total**: Sem bancos, sem servidores centrais
- **Imutabilidade**: As transações confirmadas não pode serm revertir
- **Escassez digital**: Só existirão 21 millones de BTC
Limitação: Bitcoin é lento (~7 transações por segundo) e su linguagem de scripting é muy limitado. No foi projetado para executar lógica complexa.
### 2012 — XRP Ledger: velocidade sem mineração
Más adelante se creó o **XRP Ledger (ou XRPL)**, a primera blockchain importante que **no usa Proof of Work**. Em su lugar, usa um protocolo de consenso basado em **validadores de confiança (UNL)**.
XRPL introduziu:
- **Consenso sem mineração**: Transações confirmadas em 3-5 segundos
- **DEX nativo**: Interalteração descentralizado integrado no protocolo
- **Tokens nativos**: Crear tokens sem necessidade de smart contracts
- **Fees mínimos**: Fracciones de centavo por transação
Limitação: XRPL no tenía capacidad para executar smart contracts (lógica programável personalizada).
### 2015 — Ethereum: a computadora mundial
**Vitalik Buterin** publicó o whitepaper de Ethereum com uma idea ambiciosa: uma blockchain que pudiera executar **cualquier programa**. Así nació a **Ethereum Virtual Machine (EVM)**.
Ethereum introduziu:
- **Smart contracts**: Programas que viven na blockchain e é executadan automáticamente
- **Solidity**: Lenguaje de programación para escrever contratos
- **EVM**: Máquina virtual que executa o código dos contratos
- **ERC-20 / ERC-721**: Estándares para tokens fungibles e NFTs
- **DeFi**: Finanzas descentralizadas (prredemos, exchanges, stablecoins)
Limitação: Gas caro e variable, baja velocidade (~15 TPS), escalabilidad limitada.
### 2020+ — Explosión de L1s e L2s
Os problemas de Ethereum impulsaron uma oleada de nuevas blockchains:
- **Solana** (2020): Alta velocidade (~65,000 TPS teóricos) com Proof of History
- **Avalanche** (2020): Subredes personalizables com consenso rápido
- **Polygon** (2020): Solución Layer 2 para escalar Ethereum
- **Arbitrum / Optimism** (2021): Rollups que procesan transações fora de Ethereum
- **Cosmos / Polkadot**: Ecosistemas de blockchains interconectadas
A maioria de estas redes são **compatíveis com EVM** usan Solidity e ferramentas de Ethereum.
### 2023 — Xahau: XRPL + Smart Contracts
**Xahau** nace como um **fork do XRP Ledger** que añade a capacidad que XRPL sempre necesitó: **smart contracts**, llamados **Hooks**. Inicialmente Xahau no ibà existir e os Hooks iban a ser parte de XRP Ledger pero Ripple no quiso aceitar esta mejora da comunidade. Por no desaprovechar o trabajo realizado durante años, Xahau nació.
Xahau introduziu:
- **Hooks**: Smart contracts escritos em C e compilados a WebAssembly
- **XAH**: Token nativo com sistema de emissões/recompensas
- **Herencia de XRPL**: Conserva a velocidade, o DEX nativo e os fees baixos
- **Sem EVM**: Arquitetura propia, no compatible com Solidity
### Por que Xahau é um fork de XRPL?
Xahau ao ser um fork de XRPL, aprovecha todas as ventajas de uma blockchain probada e optimizada para pagos e tokens, e le añade a pieza que faltaba: a capacidad de executar lógica programável diretamente no protocolo.
1. **Base probada**: XRPL lleva funcionando desde 2012 sem interrupciones graves
2. **Velocidade nativa**: O consenso de XRPL ya ofrece 3-5 segundos de finalidad
3. **DEX integrado**: Não há que construir um exchange descentralizado desde cero
4. **Tokens nativos**: O sistema de TrustLines e tokens ya existe e funciona
5. **Comunidad existente**: Desarrolladores e ferramentas de XRPL podem adaptarse
### Línea temporal resumida
| Añou | Hito | Innovación chave |
|---|---|---|
| 2008 | Bitcoin | Dinero digital descentralizado |
| 2012 | XRP Ledger | Consenso sem mineração, DEX nativo |
| 2015 | Ethereum | Smart contracts (EVM + Solidity) |
| 2017 | ICO boom | Tokens ERC-20, financiación descentralizada |
| 2020 | DeFi Summer | Finanzas descentralizadas em Ethereum |
| 2020+ | L1s/L2s | Solana, Avalanche, Polygon, Rollups |
| 2023 | Xahau | XRPL + Hooks (smart contracts em C/WASM) |`,
        en: `To understand why Xahau exists and what makes it different, we need to go through the **history of blockchains** and how each generation solved problems that the previous one could not.

### 2008 — Bitcoin: The Birth

It all started with a 9-page document published by **Satoshi Nakamoto** titled *"Bitcoin: A Peer-to-Peer Electronic Cash System"*. The idea was simple and revolutionary: **digital money without intermediaries**.

Bitcoin introduced:
- **Proof of Work (PoW)**: Miners solve mathematical problems to validate transactions
- **Total decentralization**: No banks, no central servers
- **Immutability**: Confirmed transactions cannot be reversed
- **Digital scarcity**: Only 21 million BTC will ever exist

Limitation: Bitcoin is slow (~7 transactions per second) and its scripting language is very limited. It was not designed to execute complex logic.

### 2012 — XRP Ledger: Speed Without Mining

Later, the **XRP Ledger (or XRPL)** was created, the first major blockchain that **does not use Proof of Work**. Instead, it uses a consensus protocol based on **trusted validators (UNL)**.

XRPL introduced:
- **Consensus without mining**: Transactions confirmed in 3-5 seconds
- **Native DEX**: Decentralized exchange integrated into the protocol
- **Native tokens**: Create tokens without needing smart contracts
- **Minimal fees**: Fractions of a cent per transaction

Limitation: XRPL did not have the ability to execute smart contracts (custom programmable logic).

### 2015 — Ethereum: The World Computer

**Vitalik Buterin** published the Ethereum whitepaper with an ambitious idea: a blockchain that could execute **any program**. Thus the **Ethereum Virtual Machine (EVM)** was born.

Ethereum introduced:
- **Smart contracts**: Programs that live on the blockchain and execute automatically
- **Solidity**: Programming language for writing contracts
- **EVM**: Virtual machine that executes contract code
- **ERC-20 / ERC-721**: Standards for fungible tokens and NFTs
- **DeFi**: Decentralized finance (lending, exchanges, stablecoins)

Limitation: Expensive and variable gas, low speed (~15 TPS), limited scalability.

### 2020+ — The L1 and L2 Explosion

Ethereum's problems drove a wave of new blockchains:

- **Solana** (2020): High speed (~65,000 theoretical TPS) with Proof of History
- **Avalanche** (2020): Customizable subnets with fast consensus
- **Polygon** (2020): Layer 2 solution for scaling Ethereum
- **Arbitrum / Optimism** (2021): Rollups that process transactions off Ethereum
- **Cosmos / Polkadot**: Ecosystems of interconnected blockchains

Most of these networks are **EVM-compatible**, they use Solidity and Ethereum tools.

### 2023 — Xahau: XRPL + Smart Contracts

**Xahau** was born as a **fork of the XRP Ledger** that adds the capability XRPL always needed: **smart contracts**, called **Hooks**. Initially Xahau was not going to exist and Hooks were going to be part of the XRP Ledger, but Ripple did not want to accept this community improvement. In order not to waste the work done over years, Xahau was born.

Xahau introduced:
- **Hooks**: Smart contracts written in C and compiled to WebAssembly
- **XAH**: Native token with an emission/reward system
- **XRPL inheritance**: Retains the speed, native DEX, and low fees
- **No EVM**: Its own architecture, not compatible with Solidity

### Why Is Xahau a Fork of XRPL?

As a fork of XRPL, Xahau leverages all the advantages of a proven blockchain optimized for payments and tokens, and adds the missing piece: the ability to execute programmable logic directly in the protocol.

1. **Proven foundation**: XRPL has been running since 2012 without major disruptions
2. **Native speed**: XRPL's consensus already offers 3-5 second finality
3. **Integrated DEX**: No need to build a decentralized exchange from scratch
4. **Native tokens**: The TrustLines and token system already exists and works
5. **Existing community**: XRPL developers and tools can adapt

### Timeline Summary

| Year | Milestone | Key Innovation |
|---|---|---|
| 2008 | Bitcoin | Decentralized digital money |
| 2012 | XRP Ledger | Consensus without mining, native DEX |
| 2015 | Ethereum | Smart contracts (EVM + Solidity) |
| 2017 | ICO boom | ERC-20 tokens, decentralized funding |
| 2020 | DeFi Summer | Decentralized finance on Ethereum |
| 2020+ | L1s/L2s | Solana, Avalanche, Polygon, Rollups |
| 2023 | Xahau | XRPL + Hooks (smart contracts in C/WASM) |`,
        jp: `Xahauがなぜ存在し、何が違うのかを理解するために、**ブロックチェーンの歴史**を振り返り、各世代が前の世代では解決できなかった問題をどのように解決したかを見ていきましょう。

### 2008年 — Bitcoin：誕生

すべては**サトシ・ナカモト**が公開した*「Bitcoin: A Peer-to-Peer Electronic Cash System」*というタイトルの9ページの文書から始まりました。アイデアは**仲介者なしのデジタルマネー**というシンプルかつ革命的なものでした。

Bitcoinが導入したものは次の通りです。
- **Proof of Work (PoW)**：マイナーが数学的問題を解いてトランザクションを検証する
- **完全な分散化**：銀行なし、中央サーバーなし
- **不変性**：確認されたトランザクションは取り消せない
- **デジタル希少性**：Bitcoinは2,100万枚しか存在しない

限界：Bitcoinは遅く（毎秒約7トランザクション）、スクリプト言語は非常に限定的。複雑なロジックを実行するために設計されていない。

### 2012年 — XRP Ledger：マイニングなしの速度

後に**XRP Ledger（XRPL）**が作られました。**PoWを使用しない**最初の主要なブロックチェーンです。代わりに、**信頼できるバリデーター（UNL）**に基づくコンセンサスプロトコルを使用します。

XRPLが導入したものは次の通りです。
- **マイニングなしのコンセンサス**：3〜5秒でトランザクションが確定する
- **ネイティブDEX**：プロトコルに統合された分散取引所
- **ネイティブのトークン発行**：スマートコントラクトなしでトークンを作成
- **少ない手数料**：トランザクションあたり数セント

限界：XRPLにはスマートコントラクト（カスタムプログラマブルロジック）を実行する能力がなかった。

### 2015年 — Ethereum：ワールドコンピュータ

**ヴィタリック・ブテリン**は**あらゆるプログラム**を実行できるブロックチェーンといった野心的なアイデアを持つEthereumホワイトペーパーを発表しました。こうして**Ethereum Virtual Machine（EVM）**が誕生しました。

Ethereumが導入したものは次の通りです。
- **スマートコントラクト**：ブロックチェーン上に存在し自動的に実行されるプログラム
- **Solidity**：コントラクトを書くためのプログラミング言語
- **EVM**：コントラクトコードを実行する仮想マシン
- **ERC-20 / ERC-721**：代替可能トークンとNFTの標準
- **DeFi**：分散型金融（貸付、取引所、ステーブルコイン）

限界：高価で変動するガス、低速（約15 TPS）、限られたスケーラビリティ。

### 2020年以降 — L1とL2の爆発

Ethereumの問題が新しいブロックチェーンの波を引き起こしました：

- **Solana**（2020年）：Proof of Historyによる高速（理論値約65,000 TPS）
- **Avalanche**（2020年）：高速コンセンサスによるカスタマイズ可能なサブネット
- **Polygon**（2020年）：Ethereumをスケールするためのレイヤー2ソリューション
- **Arbitrum / Optimism**（2021年）：Ethereum外でトランザクションを処理するロールアップ
- **Cosmos / Polkadot**：相互接続されたブロックチェーンのエコシステム

これらのネットワークのほとんどは**EVM互換**で、SolidityとEthereumのツールを使用します。

### 2023年 — Xahau：XRPL + スマートコントラクト

**Xahau**は**XRP Ledgerのフォーク**として誕生し、XRPLが常に必要としていた**スマートコントラクト**（**Hooks**と呼ばれる）機能を追加しました。当初XahauはXRP Ledgerの一部になる予定でHooksがXRP Ledgerに組み込まれる予定でしたが、Rippleはコミュニティのこの改善を受け入れませんでした。何年もかけてきた作業を無駄にしないために、Xahauが誕生しました。

Xahauが導入したもの：
- **Hooks**：Cで書かれWebAssemblyにコンパイルされたスマートコントラクト
- **XAH**：エミッション/報酬システムを持つネイティブトークン
- **XRPLの継承**：速度、ネイティブDEX、低手数料を維持
- **EVMなし**：独自のアーキテクチャ、Solidityと互換性なし

### なぜXahauはXRPLのフォークなのか？

XRPLのフォークとして、Xahauは支払いとトークンのために実証され最適化されたブロックチェーンのすべての利点を活用し、プロトコル内で直接プログラマブルロジックを実行するという欠けていたピースを追加しました。

1. **実証済みの基盤**：XRPLは2012年から大きな中断なく稼働している
2. **ネイティブな速度**：XRPLのコンセンサスはすでに3〜5秒の最終確定を提供する
3. **統合DEX**：分散取引所をゼロから構築する必要がない
4. **ネイティブのトークン発行**：トラストラインとトークンシステムはすでに存在し機能している
5. **既存のコミュニティ**：XRPLの開発者とツールが適応できる

### 年表まとめ

| 年 | マイルストーン | 主要なイノベーション |
|---|---|---|
| 2008 | Bitcoin | 分散型デジタルマネー |
| 2012 | XRP Ledger | マイニングなしのコンセンサス、ネイティブDEX |
| 2015 | Ethereum | スマートコントラクト（EVM + Solidity） |
| 2017 | ICOブーム | ERC-20トークン、分散型資金調達 |
| 2020 | DeFiサマー | Ethereum上の分散型金融 |
| 2020以降 | L1/L2 | Solana、Avalanche、Polygon、ロールアップ |
| 2023 | Xahau | XRPL + Hooks（C/WASMのスマートコントラクト） |`,
        ko: `Xahau가 왜 존재하게 되었고 무엇이 다른지 이해하려면, **블록체인의 역사**와 각 세대가 이전 세대의 한계를 어떻게 해결했는지 살펴봐야 합니다.

### 2008 — 비트코인: 시작

모든 것은 **사토시 나카모토**가 발표한 *"Bitcoin: A Peer-to-Peer Electronic Cash System"*에서 시작되었습니다. 핵심 아이디어는 **중개자 없는 디지털 화폐**였습니다.

비트코인이 가져온 변화:
- **작업증명(PoW)**: 채굴자가 계산 문제를 풀어 거래를 검증
- **완전한 탈중앙화**: 은행도 중앙 서버도 없음
- **불변성**: 확정된 거래는 되돌리기 어려움
- **디지털 희소성**: BTC는 2,100만 개로 제한

한계: 속도가 느리고(초당 약 7건), 스크립트 기능이 제한적이었습니다.

### 2012 — XRP Ledger: 채굴 없는 속도

이후 **XRP Ledger (XRPL)**가 등장했습니다. 이는 **작업증명을 사용하지 않는** 대표적 블록체인입니다. 대신 **신뢰된 검증자(UNL)** 기반 합의를 사용합니다.

XRPL이 도입한 것:
- **채굴 없는 합의**: 3~5초 내 트랜잭션 확정
- **네이티브 DEX**: 프로토콜에 통합된 탈중앙 거래소
- **네이티브 토큰 발행**: 스마트 컨트랙트 없이 토큰 생성
- **낮은 수수료**

한계: 사용자 정의 스마트 컨트랙트를 실행할 수 없었습니다.

### 2015 — Ethereum: 월드 컴퓨터

**비탈릭 부테린**은 **어떤 프로그램이든 실행할 수 있는 블록체인**이라는 비전을 제시했고, 그 결과 **Ethereum Virtual Machine (EVM)**이 탄생했습니다.

Ethereum이 도입한 것:
- **스마트 컨트랙트**
- **Solidity**
- **EVM**
- **ERC-20 / ERC-721**
- **DeFi**

한계: 비싸고 변동적인 가스비, 느린 속도, 제한된 확장성.

### 2020+ — L1과 L2의 확산

Ethereum의 한계는 새로운 블록체인들의 등장을 이끌었습니다:

- **Solana**: 높은 속도
- **Avalanche**: 맞춤형 서브넷
- **Polygon**: Ethereum용 Layer 2
- **Arbitrum / Optimism**: 롤업
- **Cosmos / Polkadot**: 상호 연결된 체인 생태계

이들 대부분은 여전히 **EVM 호환**이며 Solidity 도구를 사용합니다.

### 2023 — Xahau: XRPL + 스마트 컨트랙트

**Xahau**는 **XRP Ledger의 포크**로 탄생했고, XRPL이 오랫동안 필요로 했던 **스마트 컨트랙트 기능**, 즉 **Hooks**를 추가했습니다. 원래 Hooks는 XRPL에 직접 들어갈 가능성이 있었지만 받아들여지지 않았고, 수년간의 작업을 살리기 위해 Xahau가 만들어졌습니다.

Xahau가 도입한 것:
- **Hooks**: C로 작성해 WebAssembly로 컴파일하는 스마트 컨트랙트
- **XAH**: 보상/발행 시스템이 있는 네이티브 토큰
- **XRPL의 장점 계승**: 빠른 속도, 네이티브 DEX, 낮은 수수료
- **비 EVM 구조**: Solidity와 호환되지 않음

### 왜 XRPL의 포크인가?

Xahau는 XRPL이 이미 갖고 있던 강점을 활용하면서, 프로토콜 안에서 직접 프로그래밍 가능한 로직을 실행하는 기능을 더했습니다.

1. **검증된 기반**: XRPL은 2012년부터 안정적으로 운영
2. **네이티브 속도**: 이미 3~5초 최종성 제공
3. **통합 DEX**
4. **기존 토큰/TrustLine 시스템**
5. **기존 커뮤니티와 도구 활용 가능**

### 연표 요약

| 연도 | 이정표 | 핵심 혁신 |
|---|---|---|
| 2008 | Bitcoin | 탈중앙 디지털 화폐 |
| 2012 | XRP Ledger | 채굴 없는 합의, 네이티브 DEX |
| 2015 | Ethereum | 스마트 컨트랙트 (EVM + Solidity) |
| 2017 | ICO 붐 | ERC-20 토큰, 탈중앙 자금 조달 |
| 2020 | DeFi Summer | Ethereum 기반 탈중앙 금융 |
| 2020+ | L1/L2 | Solana, Avalanche, Polygon, Rollups |
| 2023 | Xahau | XRPL + Hooks (C/WASM 스마트 컨트랙트) |`,
        zh: `要理解 Xahau 为何存在以及它的独特之处，我们需要回顾**区块链的历史**，以及每一代如何解决前一代无法解决的问题。

### 2008 年 — 比特币：诞生

一切始于 **中本聪（Satoshi Nakamoto）** 发布的一篇名为 *"Bitcoin: A Peer-to-Peer Electronic Cash System"* 的 9 页文档。理念简单而革命性：**无需中间人的数字货币**。

比特币引入了：
- **工作量证明（PoW）**：矿工通过解决数学难题来验证交易
- **完全去中心化**：无银行，无中央服务器
- **不可篡改性**：已确认的交易无法被撤销
- **数字稀缺性**：比特币总量上限为 2100 万枚

局限性：比特币速度慢（约每秒 7 笔交易），脚本语言非常有限，并非为执行复杂逻辑而设计。

### 2012 年 — XRP 账本：无需挖矿的速度

随后，**XRP 账本（XRPL）** 诞生，它是第一个不使用工作量证明的主要区块链，采用基于**受信验证者（UNL）**的共识协议。

XRPL 引入了：
- **无挖矿共识**：交易在 3-5 秒内确认
- **原生 DEX**：去中心化交易所集成于协议层
- **原生代币**：无需智能合约即可创建代币
- **极低手续费**：每笔交易费用不到一美分

局限性：XRPL 不具备执行智能合约（自定义可编程逻辑）的能力。

### 2015 年 — 以太坊：世界计算机

**Vitalik Buterin** 发布了以太坊白皮书，提出了一个雄心勃勃的想法：一个可以执行**任何程序**的区块链。**以太坊虚拟机（EVM）**由此诞生。

以太坊引入了：
- **智能合约**：部署在区块链上并自动执行的程序
- **Solidity**：编写合约的编程语言
- **EVM**：执行合约代码的虚拟机
- **ERC-20 / ERC-721**：同质化代币和 NFT 的标准
- **DeFi**：去中心化金融（借贷、交易所、稳定币）

局限性：Gas 费用高且波动大，速度慢（约 15 TPS），可扩展性有限。

### 2020+ — L1 和 L2 的爆发

以太坊的问题推动了新一波区块链的涌现：

- **Solana**（2020）：基于历史证明的高速（理论约 65,000 TPS）
- **Avalanche**（2020）：可定制子网与快速共识
- **Polygon**（2020）：以太坊扩容的 Layer 2 方案
- **Arbitrum / Optimism**（2021）：在以太坊之外处理交易的 Rollup
- **Cosmos / Polkadot**：相互连接的区块链生态系统

这些网络大多数**兼容 EVM**，使用 Solidity 和以太坊工具。

### 2023 年 — Xahau：XRPL + 智能合约

**Xahau** 作为 **XRP 账本的分叉**诞生，添加了 XRPL 一直需要的功能：**智能合约**，即 **Hooks**。最初 Xahau 并不打算单独存在，Hooks 本应成为 XRP 账本的一部分，但 Ripple 不接受这一社区改进提案。为了不让多年的工作付诸东流，Xahau 应运而生。

Xahau 引入了：
- **Hooks**：用 C 语言编写并编译为 WebAssembly 的智能合约
- **XAH**：带有发行/奖励系统的原生代币
- **继承 XRPL 优势**：保留了速度、原生 DEX 和低手续费
- **无 EVM**：独立架构，不兼容 Solidity

### 为什么 Xahau 是 XRPL 的分叉？

作为 XRPL 的分叉，Xahau 利用了一条经过验证、针对支付和代币优化的区块链的全部优势，并添加了缺失的一块拼图：直接在协议中执行可编程逻辑的能力。

1. **经过验证的基础**：XRPL 自 2012 年运行至今，从未出现重大故障
2. **原生速度**：XRPL 的共识已实现 3-5 秒的最终确认
3. **集成 DEX**：无需从头构建去中心化交易所
4. **原生代币**：TrustLine 和代币系统已存在并运行
5. **现有社区**：XRPL 开发者和工具可直接适配

### 时间线摘要

| 年份 | 里程碑 | 核心创新 |
|---|---|---|
| 2008 | 比特币 | 去中心化数字货币 |
| 2012 | XRP 账本 | 无挖矿共识、原生 DEX |
| 2015 | 以太坊 | 智能合约（EVM + Solidity） |
| 2017 | ICO 热潮 | ERC-20 代币、去中心化融资 |
| 2020 | DeFi Summer | 以太坊上的去中心化金融 |
| 2020+ | L1/L2 | Solana、Avalanche、Polygon、Rollups |
| 2023 | Xahau | XRPL + Hooks（C/WASM 智能合约） |`,
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "2008-2015: Los orígenes", pt: "2008-2015: As origens", en: "2008-2015: The Origins", jp: "2008-2015年：起源", ko: "2008-2015: 시작", zh: "2008-2015：起源" },
          content: {
            es: "2008 — Bitcoin\n• Primer dinero digital descentralizado\n• Proof of Work, lento pero revolucionario\n\n2012 — XRP Ledger\n• Sin minería, consenso en 3-5 segundos\n• DEX nativo y tokens integrados\n\n2015 — Ethereum\n• Smart contracts con Solidity\n• La EVM como computadora mundial",
            pt: "2008 — Bitcoin\n• Primer dinheiro digital descentralizado\n• Proof of Work, lento, mas revolucionário\n\n2012 — XRP Ledger\n• Sem mineração, consenso em 3-5 segundos\n• DEX nativo e tokens integrados\n\n2015 — Ethereum\n• Smart contracts com Solidity\n• A EVM como computadora mundial",
            en: "2008 — Bitcoin\n• First decentralized digital money\n• Proof of Work, slow but revolutionary\n\n2012 — XRP Ledger\n• No mining, consensus in 3-5 seconds\n• Native DEX and integrated tokens\n\n2015 — Ethereum\n• Smart contracts with Solidity\n• The EVM as a world computer",
            jp: "2008年 — Bitcoin\n• 最初の分散型デジタルマネー\n• プルーフ・オブ・ワーク、遅いが革命的\n\n2012年 — XRP Ledger\n• マイニングなし、3〜5秒でコンセンサス\n• ネイティブDEXと統合トークン\n\n2015年 — Ethereum\n• Solidityによるスマートコントラクト\n• ワールドコンピュータとしてのEVM",
            ko: "2008 — Bitcoin\n• 최초의 탈중앙 디지털 화폐\n• 작업증명, 느리지만 혁신적\n\n2012 — XRP Ledger\n• 채굴 없음, 3~5초 합의\n• 네이티브 DEX와 토큰\n\n2015 — Ethereum\n• Solidity 기반 스마트 컨트랙트\n• 월드 컴퓨터로서의 EVM",
            zh: "2008 — 比特币\n• 第一个去中心化数字货币\n• 工作量证明，慢但具革命性\n\n2012 — XRP 账本\n• 无需挖矿，3-5 秒共识\n• 原生 DEX 与集成代币\n\n2015 — 以太坊\n• Solidity 智能合约\n• EVM 作为世界计算机",
          },
          visual: "📜",
        },
        {
          title: { es: "2020+: La explosión", pt: "2020+: A explosão", en: "2020+: The Explosion", jp: "2020年以降：爆発", ko: "2020+: 확산", zh: "2020+：爆发期" },
          content: {
            es: "Los problemas de Ethereum impulsan nuevas redes:\n\n• Solana → Alta velocidad\n• Avalanche → Subredes personalizables\n• Polygon → Layer 2 para Ethereum\n• Arbitrum/Optimism → Rollups\n\nLa mayoría son compatibles con EVM (Solidity)",
            pt: "Os problemas de Ethereum impulsan novas redes:\n\n• Solana → Alta velocidade\n• Avalanche → Subredes personalizables\n• Polygon → Layer 2 para Ethereum\n• Arbitrum/Optimism → Rollups\n\nA maioria são compatíveis com EVM (Solidity)",
            en: "Ethereum's problems drive new networks:\n\n• Solana → High speed\n• Avalanche → Customizable subnets\n• Polygon → Layer 2 for Ethereum\n• Arbitrum/Optimism → Rollups\n\nMost are EVM-compatible (Solidity)",
            jp: "Ethereumの問題が新しいネットワークを生む：\n\n• Solana → 高速\n• Avalanche → カスタマイズ可能なサブネット\n• Polygon → Ethereum用レイヤー2\n• Arbitrum/Optimism → ロールアップ\n\nほとんどがEVM互換（Solidity）",
            ko: "Ethereum의 문제는 새로운 네트워크를 낳았습니다:\n\n• Solana → 높은 속도\n• Avalanche → 맞춤형 서브넷\n• Polygon → Ethereum용 Layer 2\n• Arbitrum/Optimism → 롤업\n\n대부분은 EVM 호환 (Solidity 사용)",
            zh: "以太坊的问题催生了新网络:\n\n• Solana → 高速度\n• Avalanche → 可定制子网\n• Polygon → 以太坊 Layer 2\n• Arbitrum/Optimism → Rollups\n\n大多数兼容 EVM (使用 Solidity)",
          },
          visual: "🚀",
        },
        {
          title: { es: "2023: Nace Xahau", pt: "2023: Nasce a Xahau", en: "2023: Xahau Is Born", jp: "2023年：Xahauの誕生", ko: "2023: Xahau의 탄생", zh: "2023：Xahau 诞生" },
          content: {
            es: "Fork de XRPL + Smart Contracts (Hooks)\n\n¿Por qué un fork de XRPL?\n• Base probada desde 2012\n• Velocidad nativa (3-5 seg)\n• DEX y tokens integrados\n• Solo faltaban smart contracts\n\nHooks = C compilado a WebAssembly\nSin EVM, sin Solidity",
            pt: "Fork de XRPL + Smart Contracts (Hooks)\n\nPor que um fork de XRPL?\n• Base probadà partir de 2012\n• Velocidade nativa (3-5 seg)\n• DEX e tokens integrados\n• Apenas faltaban smart contracts\n\nHooks = C compilado a WebAssembly\nSin EVM, sem Solidity",
            en: "Fork of XRPL + Smart Contracts (Hooks)\n\nWhy a fork of XRPL?\n• Proven foundation since 2012\n• Native speed (3-5 sec)\n• Integrated DEX and tokens\n• Only smart contracts were missing\n\nHooks = C compiled to WebAssembly\nNo EVM, no Solidity",
            jp: "XRPLのフォーク + スマートコントラクト（Hooks）\n\nなぜXRPLのフォークなのか？\n• 2012年からの実証済みの基盤\n• ネイティブな速度（3〜5秒）\n• DEXとトークンが統合済み\n• スマートコントラクトだけが欠けていた\n\nHooks = CをWebAssemblyにコンパイル\nEVMなし、Solidityなし",
            ko: "XRPL의 포크 + 스마트 컨트랙트 (Hooks)\n\n왜 XRPL 포크인가?\n• 2012년부터 검증된 기반\n• 네이티브 속도 (3~5초)\n• 통합 DEX와 토큰\n• 부족했던 것은 스마트 컨트랙트뿐\n\nHooks = C를 WebAssembly로 컴파일\nEVM 없음, Solidity 없음",
            zh: "XRPL 分叉 + 智能合约 (Hooks)\n\n为什么选择 XRPL 分叉?\n• 2012 年起经过验证的基础\n• 原生速度 (3-5 秒)\n• 集成 DEX 与代币\n• 只缺少智能合约\n\nHooks = C 编译为 WebAssembly\n无 EVM，无 Solidity",
          },
          visual: "🧱",
        },
        {
          title: { es: "Línea temporal completa", pt: "Linha do tempo completa", en: "Complete Timeline", jp: "完全な年表", ko: "전체 타임라인", zh: "完整时间线" },
          content: {
            es: "2008 → Bitcoin (PoW, dinero digital)\n2012 → XRPL (sin minería, DEX)\n2015 → Ethereum (EVM, Solidity)\n2017 → Boom de ICOs y tokens\n2020 → DeFi + nuevas L1s/L2s\n2023 → Xahau (XRPL + Hooks)\n\nCada generación resolvió limitaciones de la anterior",
            pt: "2008 → Bitcoin (PoW, dinheiro digital)\n2012 → XRPL (sem mineração, DEX)\n2015 → Ethereum (EVM, Solidity)\n2017 → Boom de ICOs e tokens\n2020 → DeFi + novas L1s/L2s\n2023 → Xahau (XRPL + Hooks)\n\nCada geração resolveu limitaciones da anterior",
            en: "2008 → Bitcoin (PoW, digital money)\n2012 → XRPL (no mining, DEX)\n2015 → Ethereum (EVM, Solidity)\n2017 → ICO and token boom\n2020 → DeFi + new L1s/L2s\n2023 → Xahau (XRPL + Hooks)\n\nEach generation solved limitations of the previous one",
            jp: "2008年 → Bitcoin（PoW、デジタルマネー）\n2012年 → XRPL（マイニングなし、DEX）\n2015年 → Ethereum（EVM、Solidity）\n2017年 → ICOとトークンのブーム\n2020年 → DeFi + 新しいL1s/L2s\n2023年 → Xahau（XRPL + Hooks）\n\n各世代は前の世代の限界を解決した",
            ko: "2008 → Bitcoin (PoW, 디지털 화폐)\n2012 → XRPL (채굴 없음, DEX)\n2015 → Ethereum (EVM, Solidity)\n2017 → ICO와 토큰 붐\n2020 → DeFi + 새로운 L1/L2\n2023 → Xahau (XRPL + Hooks)\n\n각 세대는 이전 세대의 한계를 해결했습니다",
            zh: "2008 → 比特币 (PoW, 数字货币)\n2012 → XRPL (无挖矿, DEX)\n2015 → 以太坊 (EVM, Solidity)\n2017 → ICO 与代币热潮\n2020 → DeFi + 新 L1/L2\n2023 → Xahau (XRPL + Hooks)\n\n每一代都解决了上一代的局限",
          },
          visual: "⏳",
        },
      ],
    },
    {
      id: "m1l4",
      title: {
        es: "El ecosistema Xahau",
        pt: "O ecossistema Xahau",
        en: "The Xahau Ecosystem",
        jp: "Xahauエコシステム",
        ko: "Xahau 생태계",
        zh: "Xahau 生态系统",
      },
      theory: {
        es: `Xahau no es solo una blockchain, es un **ecosistema completo** con herramientas, wallets, exploradores y una comunidad activa. En esta lección conocerás las piezas fundamentales del ecosistema para saber dónde buscar información y cómo interactuar con la red.

### XAH: el token nativo

**XAH** es la criptomoneda nativa de Xahau. A diferencia de XRP en el XRPL, XAH tiene un sistema de **emisión inflaccionario**: los titulares de cuentas activas pueden solicitar recompensas periódicas en XAH. Esto incentiva la participación en la red y el uso de ésta.

Características de XAH:
- Se usa para pagar **fees** (comisiones de transacción)
- Se necesita una **reserva mínima** para mantener una cuenta activa
- El sistema de **emisiones** distribuye XAH a cuentas activas que lo soliciten
- Se puede enviar, intercambiar y usar en Hooks

### Xaman (antes XUMM): la wallet principal

**Xaman** (anteriormente conocida como XUMM) es la wallet más utilizada en el ecosistema XRPL/Xahau. Es una aplicación móvil que te permite:

- Crear y gestionar cuentas en Xahau y XRPL
- Enviar y recibir XAH y tokens
- Firmar transacciones de forma segura
- Interactuar con aplicaciones descentralizadas (xApps)
- Disponible para **iOS** y **Android**

Descarga: [xaman.app](https://xaman.app)

### Hooks Builder: IDE online para smart contracts

**Hooks Builder** es un entorno de desarrollo integrado (IDE) que funciona en el navegador y te permite escribir, compilar y desplegar Hooks sin instalar nada en tu ordenador en Xahau Testnet.

Características:
- Editor de código con resaltado de sintaxis para C
- Compilador de C a WebAssembly integrado
- Despliegue directo a la testnet de Xahau
- Ejemplos y plantillas para empezar rápido

URL: [builder.xahau.network/](https://builder.xahau.network/)

### Exploradores de bloques

Los **exploradores** te permiten ver todo lo que ocurre en la blockchain de forma visual:

- Buscar transacciones por hash
- Ver el estado de cualquier cuenta (balance, tokens, hooks)
- Explorar ledgers y sus contenidos
- Verificar el estado de la red

Para **Xahau Mainnet**:

URL: [xahauexplorer.com](https://xahauexplorer.com)
URL: [xahau.xrplwin.com](https://xahau.xrplwin.com)
URL: [explorer.xahau.network](https://explorer.xahau.network)
URL: [xahscan.com](https://xahscan.com)

Para **Xahau Testnet**:

URL: [test.xahauexplorer.com](https://test.xahauexplorer.com)
URL: [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
URL: [explorer.xahau-test.net](https://explorer.xahau-test.net)

### Recursos para desarrolladores

- **Documentación oficial**: [xahau.network/docs/](https://xahau.network/docs/) Guías, referencia de API y tutoriales
- **GitHub**: [https://github.com/xahau](https://github.com/xahau) Código fuente del nodo, librerías y herramientas
- **Discord**: [https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj) Comunidad activa donde hacer preguntas y compartir proyectos
- **X**: [https://x.com/XahauNetwork](https://x.com/XahauNetwork) Cuenta oficial de la blockchain Xahau para noticias y actualizaciones
- **Librería xahau js**: [https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau) La librería JavaScript que usamos en este curso para interactuar con la red

### Testnet vs Mainnet

Xahau tiene dos redes principales:

| Característica | Testnet | Mainnet |
|---|---|---|
| URL WebSocket | wss://xahau-test.net | wss://xahau.network |
| Token | XAH (sin valor real) | XAH (con valor real) |
| Propósito | Desarrollo y pruebas | Producción |
| Faucet | Sí (XAH gratis para probar) | No |
| Datos | Se pueden reiniciar periódicamente | Permanentes |

**Para este curso usaremos siempre la testnet.** Los tokens de testnet no tienen valor real, así que puedes experimentar libremente sin riesgo de perder dinero.

Para obtener XAH de testnet, usa el **faucet** (grifo): una herramienta que te envía tokens gratuitos a tu cuenta de prueba. Lo veremos en detalle en módulos posteriores.`,
        pt: `Xahau não é apenas uma blockchain, é um **ecossistema completo** com ferramentas, wallets, exploradores e uma comunidade ativa. Nesta lição você conhecerá as peças fundamentais do ecossistema para saber onde buscar informações e como interagir com a rede.
### XAH: o token nativo
**XAH** é a criptomoeda nativa de Xahau. Diferentemente de XRP no XRPL, XAH tem um sistema de **emissão inflacionária**: os titulares de contas ativas podem solicitar recompensas periódicas em XAH. Isso incentiva a participação na rede e o uso de rede.
Características de XAH:
- É usada para pagar **fees** (taxas de transação)
- É necessário uma **reserva mínima** para manter uma conta ativa
- O sistema de **emissões** distribui XAH a contas ativas que solicitarem
- Se pode enviar, negociar e usar em Hooks
### Xaman (antes XUMM): a wallet principal
**Xaman** (anteriormente conocida como XUMM) é a wallet más utilizada no ecossistema XRPL/Xahau. É uma aplicación móvel que te permite:
- Crear e gerenciar contas na Xahau e XRPL
- Enviar e recibir XAH e tokens
- Assinar transações de forma segura
- Interactuar com aplicaciones descentralizadas (xApps)
- Disponível para **iOS** e **Android**
Descarga: [xaman.app](https://xaman.app)
### Hooks Builder: IDE online para smart contracts
**Hooks Builder** é um entorno de desenvolvimento integrado (IDE) que funciona no navegador e te permite escrever, compilar e fazer deploy Hooks sem instalar nada em tu ordenador na Xahau Testnet.
Características:
- Editor de código com resaltado de sintaxis para C
- Compilador de C a WebAssembly integrado
- Despliegue direto à testnet de Xahau
- Ejemplos e plantillas para empezar rápido
URL: [builder.xahau.network/](https://builder.xahau.network/)
### Exploradores de blocos
Os **exploradores** permitem que você ver todo lo que ocurre na blockchain de forma visual:
- Buscar transações por hash
- Ver o estado de qualquer conta (balance, tokens, hooks)
- Explorar ledgers e sus contenidos
- Verificar o estado da rede
Para **Xahau Mainnet**:
URL: [xahauexplorer.com](https://xahauexplorer.com)
URL: [xahau.xrplwin.com](https://xahau.xrplwin.com)
URL: [explorer.xahau.network](https://explorer.xahau.network)
URL: [xahscan.com](https://xahscan.com)
Para **Xahau Testnet**:
URL: [test.xahauexplorer.com](https://test.xahauexplorer.com)
URL: [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
URL: [explorer.xahau-test.net](https://explorer.xahau-test.net)
### Recursos para desenvolvedores
- **Documentação oficial**: [xahau.network/docs/](https://xahau.network/docs/) Guías, referencia de API e tutoriales
- **GitHub**: [https://github.com/xahau](https://github.com/xahau) Código fonte do nó, bibliotecas e ferramentas
- **Discord**: [https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj) Comunidad ativa donde hacer preguntas e compartilhar proyectos
- **X**: [https://x.com/XahauNetwork](https://x.com/XahauNetwork) Conta oficial da blockchain Xahau para noticias e atualizaciones
- **Biblioteca xahau js**: [https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau) A biblioteca JavaScript que usamos em este curso para interagir com a rede
### Testnet vs Mainnet
Xahau tem dos redes principais:
| Característica | Testnet | Mainnet |
|---|---|---|
| URL WebSocket | wss://xahau-test.net | wss://xahau.network |
| Token | XAH (sem valor real) | XAH (com valor real) |
| Propósito | Desarrollo e pruebas | Producción |
| Faucet | Sí (XAH grátis para testar) | No |
| Dados | Se podem reiniciar periódicamente | Permanentes |
**Para este curso usaremos sempre a testnet.** Os tokens de testnet não têm valor real, então você pode experimentar livremente sem risco de perder dinheiro.
Para obter XAH de testnet, usa o **faucet** (grifo): uma herramienta que te envia tokens gratuitos a sua conta de prueba. Lo veremos em detalle em módulos posteriores.`,
        en: `Xahau is not just a blockchain, it is a **complete ecosystem** with tools, wallets, explorers, and an active community. In this lesson you will learn about the fundamental pieces of the ecosystem so you know where to find information and how to interact with the network.

### XAH: The Native Token

**XAH** is the native cryptocurrency of Xahau. Unlike XRP on XRPL, XAH has an **inflationary emission system**: holders of active accounts can request periodic rewards in XAH. This incentivizes participation in the network and its usage.

XAH characteristics:
- Used to pay **fees** (transaction fees)
- A **minimum reserve** is needed to maintain an active account
- The **emission system** distributes XAH to active accounts that request it
- It can be sent, exchanged, and used in Hooks

### Xaman (formerly XUMM): The Main Wallet

**Xaman** (formerly known as XUMM) is the most widely used wallet in the XRPL/Xahau ecosystem. It is a mobile application that allows you to:

- Create and manage accounts on Xahau and XRPL
- Send and receive XAH and tokens
- Sign transactions securely
- Interact with decentralized applications (xApps)
- Available for **iOS** and **Android**

Download: [xaman.app](https://xaman.app)

### Hooks Builder: Online IDE for Smart Contracts

**Hooks Builder** is an integrated development environment (IDE) that runs in the browser and allows you to write, compile, and deploy Hooks without installing anything on your computer on Xahau Testnet.

Features:
- Code editor with syntax highlighting for C
- Built-in C to WebAssembly compiler
- Direct deployment to the Xahau testnet
- Examples and templates to get started quickly

URL: [builder.xahau.network/](https://builder.xahau.network/)

### Block Explorers

**Explorers** allow you to visually see everything happening on the blockchain:

- Search transactions by hash
- View the state of any account (balance, tokens, hooks)
- Explore ledgers and their contents
- Verify the network status

For **Xahau Mainnet**:

URL: [xahauexplorer.com](https://xahauexplorer.com)
URL: [xahau.xrplwin.com](https://xahau.xrplwin.com)
URL: [explorer.xahau.network](https://explorer.xahau.network)
URL: [xahscan.com](https://xahscan.com)

For **Xahau Testnet**:

URL: [test.xahauexplorer.com](https://test.xahauexplorer.com)
URL: [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
URL: [explorer.xahau-test.net](https://explorer.xahau-test.net)

### Developer Resources

- **Official documentation**: [xahau.network/docs/](https://xahau.network/docs/) Guides, API reference, and tutorials
- **GitHub**: [https://github.com/xahau](https://github.com/xahau) Node source code, libraries, and tools
- **Discord**: [https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj) Active community for asking questions and sharing projects
- **X**: [https://x.com/XahauNetwork](https://x.com/XahauNetwork) Official Xahau blockchain account for news and updates
- **xahau js library**: [https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau) The JavaScript library we use in this course to interact with the network

### Testnet vs Mainnet

Xahau has two main networks:

| Feature | Testnet | Mainnet |
|---|---|---|
| WebSocket URL | wss://xahau-test.net | wss://xahau.network |
| Token | XAH (no real value) | XAH (real value) |
| Purpose | Development and testing | Production |
| Faucet | Yes (free XAH for testing) | No |
| Data | Can be reset periodically | Permanent |

**For this course we will always use the testnet.** Testnet tokens have no real value, so you can experiment freely without the risk of losing money.

To obtain testnet XAH, use the **faucet**: a tool that sends free tokens to your test account. We will cover this in detail in later modules.`,
        jp: `Xahauは単なるブロックチェーンではなく、ツール、ウォレット、エクスプローラー、活発なコミュニティを備えた**完全なエコシステム**です。このレッスンでは、情報をどこで探すか、ネットワークとどのようにやりとりするかを知るために、エコシステムの基本的な要素を学びます。

### XAH：ネイティブトークン

**XAH**はXahauのネイティブ暗号通貨です。XRPLのXRPとは異なり、XAHにはアクティブなアカウントの保有者は定期的にXAHの報酬をリクエスト可能な**インフレ型エミッションシステム**があります。これによりネットワークへの参加と利用が奨励されます。

XAHの特徴：
- **手数料**（トランザクション手数料）の支払いに使用される
- アクティブなアカウントを維持するために**少額の準備金**が必要
- **エミッションシステム**がリクエストしたアクティブなアカウントにXAHを配布する
- 送信、交換、Hooksでの使用が可能

### Xaman（旧XUMM）：メインウォレット

**Xaman**（以前はXUMMとして知られていた）はXRPL/Xahauエコシステムで最も広く使用されているウォレットです。次のことが可能なモバイルアプリケーションです。

- XahauとXRPLのアカウントを作成・管理する
- XAHとトークンを送受信する
- トランザクションを安全に署名する
- 分散型アプリケーション（xApps）と連携する
- **iOS**と**Android**で利用可能

ダウンロード：[xaman.app](https://xaman.app)

### Hooks Builder：スマートコントラクト用オンラインIDE

**Hooks Builder**はブラウザで動作する統合開発環境（IDE）で、コンピュータに何もインストールせずにXahau Testnet上でHooksを書き、コンパイルし、デプロイできます。

特徴：
- C言語のシンタックスハイライト付きコードエディタ
- 組み込みのCからWebAssemblyへのコンパイラ
- Xahau testnetへの直接デプロイ
- すぐに始めるためのサンプルとテンプレート

URL：[builder.xahau.network/](https://builder.xahau.network/)

### ブロックエクスプローラー

**エクスプローラー**はブロックチェーン上で起きていることをすべて視覚的に確認できます。

- ハッシュでトランザクションを検索する
- 任意のアカウントの状態を確認する（残高、トークン、Hooks）
- レジャーとその内容を探索する
- ネットワークの状態を確認する

**Xahau Mainnet**の場合：

URL：[xahauexplorer.com](https://xahauexplorer.com)
URL：[xahau.xrplwin.com](https://xahau.xrplwin.com)
URL：[explorer.xahau.network](https://explorer.xahau.network)
URL：[xahscan.com](https://xahscan.com)

**Xahau Testnet**の場合：

URL：[test.xahauexplorer.com](https://test.xahauexplorer.com)
URL：[xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
URL：[explorer.xahau-test.net](https://explorer.xahau-test.net)

### 開発者向けリソース

- **公式ドキュメント**：[xahau.network/docs/](https://xahau.network/docs/) ガイド、APIリファレンス、チュートリアル
- **GitHub**：[https://github.com/xahau](https://github.com/xahau) ノードのソースコード、ライブラリ、ツール
- **Discord**：[https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj) 質問やプロジェクト共有のための活発なコミュニティ
- **X**：[https://x.com/XahauNetwork](https://x.com/XahauNetwork) ニュースとアップデートのためのXahauブロックチェーン公式アカウント
- **xahau jsライブラリ**：[https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau) このコースでネットワークと連携するために使用するJavaScriptライブラリ

### TestnetとMainnet

Xahauには2つの主要なネットワークがあります：

| 特徴 | Testnet | Mainnet |
|---|---|---|
| WebSocket URL | wss://xahau-test.net | wss://xahau.network |
| トークン | XAH（実際の価値なし） | XAH（実際の価値あり） |
| 目的 | 開発とテスト | 本番環境 |
| faucet | あり（テスト用の無料XAH） | なし |
| データ | 定期的にリセットされる場合がある | 永続的 |

**このコースでは常にtestnetを使用します。** Testnetのトークンには実際の価値がないため、お金を失うリスクなく自由に実験できます。

Testnet XAHを取得するには、**faucet**（テストアカウントにテスト用トークンを送るツール）を使用します。これは後のモジュールで詳しく説明します。`,
        ko: `Xahau는 단순한 블록체인이 아니라 **도구, 지갑, 익스플로러, 커뮤니티**를 포함한 완전한 생태계입니다. 이 레슨에서는 정보를 어디서 찾고 네트워크와 어떻게 상호작용할지 이해하기 위한 핵심 요소를 살펴봅니다.

### XAH: 네이티브 토큰

**XAH**는 Xahau의 네이티브 암호화폐입니다. XRPL의 XRP와 달리 XAH는 **인플레이션형 발행 시스템**을 가지며, 활성 계정은 주기적인 보상을 요청할 수 있습니다.

XAH의 특징:
- **수수료** 지불에 사용
- 계정 유지에 **최소 준비금** 필요
- 발행 시스템이 활성 계정에 XAH를 분배
- 전송, 교환, Hooks에서 사용 가능

### Xaman (구 XUMM): 대표 지갑

**Xaman**은 XRPL/Xahau 생태계에서 가장 널리 사용되는 모바일 지갑입니다.

- Xahau와 XRPL 계정 생성/관리
- XAH와 토큰 송수신
- 안전한 트랜잭션 서명
- xApps와 상호작용
- **iOS** 및 **Android** 지원

다운로드: [xaman.app](https://xaman.app)

### Hooks Builder: 스마트 컨트랙트용 온라인 IDE

**Hooks Builder**는 브라우저에서 동작하는 개발 환경으로, Xahau Testnet에서 Hook을 작성, 컴파일, 배포할 수 있습니다.

특징:
- C 문법 하이라이트 에디터
- C → WebAssembly 컴파일러 내장
- Xahau testnet 직접 배포
- 빠르게 시작할 수 있는 예제와 템플릿

URL: [builder.xahau.network/](https://builder.xahau.network/)

### 블록 익스플로러

익스플로러를 사용하면 블록체인에서 벌어지는 일을 시각적으로 확인할 수 있습니다:

- 해시로 트랜잭션 검색
- 계정 상태 확인 (잔액, 토큰, Hooks)
- 레저와 그 내용 탐색
- 네트워크 상태 점검

### 개발자 리소스

- **공식 문서**: [xahau.network/docs/](https://xahau.network/docs/)
- **GitHub**: [https://github.com/xahau](https://github.com/xahau)
- **Discord**: [https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj)
- **X**: [https://x.com/XahauNetwork](https://x.com/XahauNetwork)
- **xahau js 라이브러리**: [https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau)

### Testnet vs Mainnet

| 특징 | Testnet | Mainnet |
|---|---|---|
| WebSocket URL | wss://xahau-test.net | wss://xahau.network |
| 토큰 | XAH (실제 가치 없음) | XAH (실제 가치 있음) |
| 목적 | 개발/테스트 | 운영 |
| Faucet | 있음 | 없음 |
| 데이터 | 주기적으로 초기화될 수 있음 | 영구적 |

**이 강좌에서는 항상 testnet을 사용합니다.** Testnet 토큰은 실제 가치가 없으므로 자유롭게 실험할 수 있습니다.

테스트용 XAH가 필요하면 **faucet**을 사용하세요. 이후 모듈에서 자세히 다룹니다.`,
        zh: `Xahau 不仅仅是一条区块链，它是一个拥有工具、钱包、浏览器和活跃社区的**完整生态系统**。本课将介绍该生态系统的基本组成部分，帮助你了解在哪里查找信息以及如何与网络交互。

### XAH：原生代币

**XAH** 是 Xahau 的原生加密货币。与 XRPL 上的 XRP 不同，XAH 具有**通胀型发行系统**：活跃账户持有者可以定期申请 XAH 奖励，从而激励网络参与和使用。

XAH 的特点：
- 用于支付**手续费**（交易费用）
- 维持活跃账户需要**最低准备金**
- **发行系统**向申请的活跃账户分发 XAH
- 可发送、兑换，并在 Hooks 中使用

### Xaman（原 XUMM）：主流钱包

**Xaman**（原名 XUMM）是 XRPL/Xahau 生态系统中使用最广泛的钱包，是一款移动应用，支持：

- 在 Xahau 和 XRPL 上创建和管理账户
- 发送和接收 XAH 及代币
- 安全地签名交易
- 与去中心化应用（xApps）交互
- 支持 **iOS** 和 **Android**

下载：[xaman.app](https://xaman.app)

### Hooks Builder：智能合约在线 IDE

**Hooks Builder** 是一个在浏览器中运行的集成开发环境（IDE），无需在本地安装任何软件即可在 Xahau 测试网上编写、编译和部署 Hooks。

特点：
- 支持 C 语言语法高亮的代码编辑器
- 内置 C 到 WebAssembly 编译器
- 直接部署到 Xahau 测试网
- 提供示例和模板，快速上手

URL：[builder.xahau.network/](https://builder.xahau.network/)

### 区块浏览器

**浏览器**让你能可视化地查看区块链上发生的一切：

- 通过哈希搜索交易
- 查看任意账户的状态（余额、代币、Hooks）
- 浏览账本及其内容
- 验证网络状态

**Xahau 主网**：

URL：[xahauexplorer.com](https://xahauexplorer.com)
URL：[xahau.xrplwin.com](https://xahau.xrplwin.com)
URL：[explorer.xahau.network](https://explorer.xahau.network)
URL：[xahscan.com](https://xahscan.com)

**Xahau 测试网**：

URL：[test.xahauexplorer.com](https://test.xahauexplorer.com)
URL：[xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
URL：[explorer.xahau-test.net](https://explorer.xahau-test.net)

### 开发者资源

- **官方文档**：[xahau.network/docs/](https://xahau.network/docs/) 指南、API 参考和教程
- **GitHub**：[https://github.com/xahau](https://github.com/xahau) 节点源代码、库和工具
- **Discord**：[https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj) 活跃社区，可提问和分享项目
- **X**：[https://x.com/XahauNetwork](https://x.com/XahauNetwork) Xahau 区块链官方账号，发布新闻和更新
- **xahau js 库**：[https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau) 本课程用于与网络交互的 JavaScript 库

### 测试网 vs 主网

Xahau 有两个主要网络：

| 特性 | 测试网 | 主网 |
|---|---|---|
| WebSocket URL | wss://xahau-test.net | wss://xahau.network |
| 代币 | XAH（无实际价值） | XAH（有实际价值） |
| 用途 | 开发与测试 | 生产环境 |
| 水龙头 | 有（免费获取测试 XAH） | 无 |
| 数据 | 可能定期重置 | 永久保存 |

**本课程始终使用测试网。** 测试网代币没有实际价值，你可以自由实验，无需担心损失资金。

要获取测试网 XAH，请使用**水龙头（faucet）**：一个向你的测试账户发送免费代币的工具。我们将在后续模块中详细介绍。`,
      },
      codeBlocks: [
      ],
      slides: [
        {
          title: { es: "XAH y el sistema de emisiones", pt: "XAH e ou sistema de emissões", en: "XAH and the Emission System", jp: "XAHとエミッションシステム", ko: "XAH와 발행 시스템", zh: "XAH 与发行系统" },
          content: {
            es: "XAH = Token nativo de Xahau\n\n• Pagar fees (comisiones)\n• Reserva mínima para cuentas\n• Sistema de emisión inflaccionario\n  → Los usuarios que lo soliciten, reciben XAH periódicamente",
            pt: "XAH = Token nativo da Xahau\n\n• Pagar fees (taxas)\n• Reserva mínima para contas\n• Sistema de emissão inflacionária\n  → Os usuários que solicitarem, reciben XAH periódicamente",
            en: "XAH = Native token of Xahau\n\n• Pay fees (transaction fees)\n• Minimum reserve for accounts\n• Inflationary emission system\n  → Users who request it receive XAH periodically",
            jp: "XAH = Xahauのネイティブトークン\n\n• 手数料（取引手数料）の支払い\n• アカウントの最小リザーブ\n• インフレ型エミッションシステム\n  → リクエストしたユーザーは定期的にXAHを受け取る",
            ko: "XAH = Xahau의 네이티브 토큰\n\n• 수수료 지불\n• 계정 최소 준비금\n• 인플레이션형 발행 시스템\n  → 요청한 사용자는 주기적으로 XAH를 받음",
            zh: "XAH = Xahau 的原生代币\n\n• 支付手续费\n• 账户最低准备金\n• 通胀型发行系统\n  → 申请的用户定期获得 XAH",
          },
          visual: "💰",
        },
        {
          title: { es: "Herramientas del ecosistema", pt: "Ferramentas do ecossistema", en: "Ecosystem Tools", jp: "エコシステムツール", ko: "생태계 도구", zh: "生态系统工具" },
          content: {
            es: "Xaman → Wallet móvil (iOS/Android)\n  xaman.app\n\nHooks Builder → IDE online para smart contracts\n  builder.xahau.network\n\nExplorer → Exploradores de bloques\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → Documentación oficial\n  xahau.network/docs",
            pt: "Xaman → Wallet móvel (iOS/Android)\n  xaman.app\n\nHooks Builder → IDE online para smart contracts\n  builder.xahau.network\n\nExplorer → Exploradores de blocos\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → Documentação oficial\n  xahau.network/docs",
            en: "Xaman → Mobile wallet (iOS/Android)\n  xaman.app\n\nHooks Builder → Online IDE for smart contracts\n  builder.xahau.network\n\nExplorer → Block explorers\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → Official documentation\n  xahau.network/docs",
            jp: "Xaman → モバイルウォレット（iOS/Android）\n  xaman.app\n\nHooks Builder → スマートコントラクト用オンラインIDE\n  builder.xahau.network\n\nエクスプローラー → ブロックエクスプローラー\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → 公式ドキュメント\n  xahau.network/docs",
            ko: "Xaman → 모바일 지갑 (iOS/Android)\n  xaman.app\n\nHooks Builder → 스마트 컨트랙트용 온라인 IDE\n  builder.xahau.network\n\nExplorer → 블록 익스플로러\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → 공식 문서\n  xahau.network/docs",
            zh: "Xaman → 移动钱包 (iOS/Android)\n  xaman.app\n\nHooks Builder → 智能合约在线 IDE\n  builder.xahau.network\n\n浏览器 → 区块浏览器\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → 官方文档\n  xahau.network/docs",
          },
          visual: "🛠️",
        },
        {
          title: { es: "Testnet vs Mainnet", pt: "Testnet vs Mainnet", en: "Testnet vs Mainnet", jp: "Testnet vs Mainnet", ko: "Testnet vs Mainnet", zh: "测试网 vs 主网" },
          content: {
            es: "Testnet (desarrollo)\n• wss://xahau-test.net\n• XAH sin valor real\n• Faucet para obtener tokens gratis\n\nMainnet (producción)\n• wss://xahau.network\n• XAH con valor real\n• Sin faucet\n\nEn este curso usamos SIEMPRE testnet",
            pt: "Testnet (desenvolvimento)\n• wss://xahau-test.net\n• XAH sem valor real\n• Faucet para obter tokens grátis\n\nMainnet (produção)\n• wss://xahau.network\n• XAH com valor real\n• Sem faucet\n\nNeste curso usamos SEMPRE a testnet",
            en: "Testnet (development)\n• wss://xahau-test.net\n• XAH with no real value\n• Faucet to get free tokens\n\nMainnet (production)\n• wss://xahau.network\n• XAH with real value\n• No faucet\n\nIn this course we ALWAYS use testnet",
            jp: "Testnet（開発）\n• wss://xahau-test.net\n• 実際の価値のないXAH\n• 無料トークンを取得するフォーセット\n\nMainnet（本番）\n• wss://xahau.network\n• 実際の価値のあるXAH\n• フォーセットなし\n\nこのコースでは常にtestnetを使用する",
            ko: "Testnet (개발)\n• wss://xahau-test.net\n• 실제 가치 없는 XAH\n• 무료 토큰용 faucet 제공\n\nMainnet (운영)\n• wss://xahau.network\n• 실제 가치 있는 XAH\n• faucet 없음\n\n이 강좌에서는 항상 testnet 사용",
            zh: "测试网 (开发)\n• wss://xahau-test.net\n• XAH 无实际价值\n• 水龙头可免费获取代币\n\n主网 (生产)\n• wss://xahau.network\n• XAH 有实际价值\n• 无水龙头\n\n本课程始终使用测试网",
          },
          visual: "🌐",
        },
      ],
    },
  ],
}

const arabicModuleTranslations = {
  title: "البنية الأساسية لبلوكتشين غير EVM",
  lessons: {
    m1l0: {
      title: "ما هي البلوكتشين؟",
      theory: `قبل الحديث عن بلوكتشينات غير EVM، نحتاج أولا إلى فهم **ما هي البلوكتشين** ولماذا تعد هذه التقنية مهمة.

### تعريف بسيط

**البلوكتشين** هي **دفتر سجلات رقمي، موزع، وغير قابل للتغيير**. تخيل دفترا محاسبيا:

- توجد منه نسخ على آلاف الحواسيب حول العالم
- لا يستطيع أحد حذف أو تعديل ما تم تسجيله بعد التحقق منه
- يستطيع أي شخص التحقق من صحة البيانات
- لا يحتاج إلى وسيط مركزي مثل بنك أو شركة

### كيف تعمل؟

تجمع البيانات في **كتل**. كل كتلة تحتوي عادة على:

1. مجموعة من **المعاملات**
2. **hash** يمثل بصمة رقمية فريدة للكتلة
3. **hash الكتلة السابقة**، وبذلك تتكون سلسلة

إذا حاول شخص تغيير كتلة قديمة، سيتغير hash الخاص بها، وهذا يكسر الرابط مع الكتل التالية. لذلك يصبح التلاعب بالتاريخ صعبا جدا.

### مفاهيم أساسية

**اللامركزية** تعني عدم وجود خادم واحد يتحكم في الشبكة. بدلا من ذلك، توجد **عقد** كثيرة تحتفظ بنسخ من دفتر السجلات.

**عدم القابلية للتغيير** يعني أن المعاملة، بعد إدراجها والتحقق منها، لا يمكن تعديلها أو حذفها بسهولة.

**الإجماع** هو الطريقة التي تتفق بها العقد على أي معاملات صحيحة وأي حالة ledger هي الحالة المعتمدة. سنفصل ذلك في الوحدة 2.

**التشفير** يستخدم في hashes، والتوقيعات الرقمية، وأزواج المفاتيح العامة والخاصة. بهذه الأدوات يمكن إثبات أن صاحب الحساب هو من وافق على المعاملة.

**المعاملات** هي العمليات التي تغير حالة البلوكتشين: إرسال tokens، إنشاء أصل، تسجيل بيانات، أو تشغيل منطق برمجي.

### البلوكتشين مقابل قاعدة بيانات تقليدية

في قاعدة البيانات التقليدية تثق غالبا في شركة أو خادم مركزي. في البلوكتشين تثق في التشفير، والإجماع، وتكرار البيانات عبر الشبكة. هذا يجعلها مناسبة للأنظمة التي تحتاج إلى سجل مشترك يمكن التحقق منه دون وسيط.

### ما استخداماتها؟

تستخدم البلوكتشين في العملات الرقمية، tokens، NFTs، smart contracts، تتبع سلاسل الإمداد، الشهادات، التصويت، وأنظمة الدفع المفتوحة.

في هذه الدورة سنركز على **Xahau**: بلوكتشين عامة مصممة للمدفوعات السريعة، tokens، و smart contracts فعالة.`,
      codeTitles: [],
      code: [],
      slides: [
        {
          title: "ما هي البلوكتشين؟",
          content: "دفتر سجلات رقمي وموزع وغير قابل للتغيير\n\n• موزع على آلاف العقد\n• لا يحتاج إلى وسيط مركزي\n• قابل للتحقق علنا\n• يعتمد على التشفير والإجماع",
        },
        {
          title: "سلسلة من الكتل",
          content: "كل كتلة تحتوي على:\n\n1. معاملات\n2. Hash خاص بالكتلة\n3. Hash الكتلة السابقة\n\nتغيير كتلة قديمة يكسر السلسلة التالية.",
        },
        {
          title: "مفاهيم أساسية",
          content: "اللامركزية → لا يوجد خادم واحد\nعدم القابلية للتغيير → التاريخ لا يعدل بسهولة\nالإجماع → اتفاق العقد على الحالة الصحيحة\nالتشفير → hashes وتوقيعات ومفاتيح",
        },
        {
          title: "فيم تستخدم؟",
          content: "• العملات الرقمية\n• Tokens وأصول رقمية\n• NFTs\n• Smart contracts\n• التتبع والشهادات\n• مدفوعات من شخص إلى شخص",
        },
      ],
    },
    m1l1: {
      title: "ما هي بلوكتشين غير EVM؟",
      theory: `عندما يسمع كثير من المطورين كلمة بلوكتشين، يفكرون مباشرة في Ethereum و **EVM**. لكن ليست كل البلوكتشينات تستخدم EVM أو Solidity.

### EVM مقابل غير EVM

في شبكات EVM، مثل Ethereum، يعمل smart contract داخل Ethereum Virtual Machine، وغالبا يكتب بلغة Solidity أو Vyper. النموذج العام يشبه "حاسوبا عالميا" يمكنه تنفيذ منطق عام مع storage واسع لكل عقد.

أما في بلوكتشين غير EVM مثل **Xahau**، فالتصميم مختلف:

- المعاملات native ولها أنواع واضحة مثل \`Payment\` و \`TrustSet\`
- حالة الشبكة مخزنة في ledger objects مهيكلة
- الرسوم عادة أكثر قابلية للتوقع
- smart contracts في Xahau تسمى **Hooks** وتكتب بلغة C ثم تترجم إلى WebAssembly

### لماذا غير EVM؟

الهدف ليس تقليد Ethereum، بل تحسين حالات استخدام محددة: مدفوعات سريعة، tokens، منطق خفيف وقابل للتوقع، ورسوم منخفضة. هذا يعطي Xahau طابعا أقرب إلى شبكة مالية سريعة مع برمجة مدمجة، وليس "حاسوبا عاما" مثل Ethereum.

### Xahau كبلوكتشين غير EVM

**Xahau** هي Layer 1 مبنية على بنية XRP Ledger، وتضيف إليها Hooks. هذه Hooks تعمل كمنطق تفاعلي حول المعاملات: يمكنها قبول، رفض، أو تنفيذ منطق مرتبط بالمعاملة.

العملة الأصلية للشبكة هي **XAH**. وسنستخدم في هذه الدورة مكتبة \`xahau\` في JavaScript للتفاعل مع العقد، قراءة بيانات ledger، وإرسال معاملات.`,
      codeTitles: [
        "الاتصال بعقدة Xahau وعرض معلومات الخادم",
      ],
      code: [
        `const { Client } = require("xahau");

async function serverInfo() {
  // الاتصال بعقدة Xahau على mainnet
  const client = new Client("wss://xahau.network");
  await client.connect();

  // طلب معلومات عامة عن الخادم والشبكة
  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("الشبكة:", info.network_id);
  console.log("الإصدار:", info.build_version);
  console.log("الـ ledger الحالي:", info.validated_ledger.seq);
  console.log("نوع الشبكة: غير EVM (بلوكتشين Xahau)");

  await client.disconnect();
}

serverInfo();`,
      ],
      slides: [
        {
          title: "EVM مقابل غير EVM",
          content: "EVM:\n• Solidity / Vyper\n• Ethereum Virtual Machine\n• Storage عام\n• Gas متغير\n\nXahau:\n• معاملات native\n• Ledger objects مهيكلة\n• Hooks بـ C/WASM\n• رسوم قابلة للتوقع",
        },
        {
          title: "ما هي Xahau؟",
          content: "Xahau = بلوكتشين Layer 1 غير EVM\n\n• مبنية على أفكار XRPL\n• عملتها الأصلية XAH\n• تضيف Hooks كـ smart contracts خفيفة\n• مصممة للمدفوعات و tokens والمنطق الفعال",
        },
        {
          title: "بنية الـ Ledger",
          content: "بدلا من storage عشوائي لكل عقد:\n\n• AccountRoot للحسابات\n• RippleState للـ TrustLines\n• Offer للـ DEX\n• HookDefinition و HookState للـ Hooks\n\nالبيانات typed ومنظمة.",
        },
      ],
    },
    m1l2: {
      title: "هيكل الـ Ledger في Xahau",
      theory: `في Xahau، كلمة **ledger** تعني لقطة كاملة من حالة الشبكة في لحظة معينة. كل ledger يحتوي على الحسابات، الأرصدة، TrustLines، العروض، Hooks، وحالة objects الأخرى.

### Ledger sequence و ledger hash

كل ledger له رقم تسلسلي يسمى \`ledger_index\` أو sequence. وكل نسخة مغلقة من ledger لها \`ledger_hash\`، وهو بصمة تشفيرية تسمح بالتحقق من محتواه.

عندما يغلق ledger جديد، يصبح هو الحالة المعتمدة التالية للشبكة. التطبيقات عادة تقرأ من \`validated\` ledger لأنها حالة تم الاتفاق عليها.

### Ledger objects

بدلا من تخزين كل شيء كمفاتيح وقيم عشوائية، تستخدم Xahau **objects ذات أنواع محددة**. أمثلة مهمة:

- **AccountRoot**: يمثل الحساب، رصيده، sequence، flags، و Hooks المثبتة
- **RippleState / TrustLine**: علاقة ثقة بين حسابين لعملة مصدرة
- **Offer**: أمر شراء أو بيع في الـ DEX الأصلي
- **URIToken**: أصل غير قابل للاستبدال مرتبط بـ URI
- **HookDefinition**: كود WASM الخاص بـ Hook منشور
- **HookState**: بيانات دائمة يخزنها Hook

### لماذا هذا مهم؟

في EVM، الحالة غالبا storage عام داخل contracts. في Xahau، الحالة أكثر تقييدا لكنها منظمة وقابلة للاستعلام بكفاءة. هذا مهم عندما تبني تطبيقات تحتاج إلى قراءة الحسابات، الأرصدة، tokens، و objects مباشرة من ledger.`,
      codeTitles: [
        "استعلام معلومات الـ ledger الحالي",
      ],
      code: [
        `const { Client } = require("xahau");

async function getLedgerInfo() {
  // الاتصال بعقدة Xahau
  const client = new Client("wss://xahau.network");
  await client.connect();

  // طلب آخر ledger تم التحقق منه
  const response = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });

  const ledger = response.result.ledger;
  console.log("رقم الـ Ledger:", ledger.ledger_index);
  console.log("Hash:", ledger.ledger_hash);
  console.log("وقت الإغلاق:", ledger.close_time_human);

  await client.disconnect();
}

getLedgerInfo();`,
      ],
      slides: [
        {
          title: "Ledger في Xahau",
          content: "Ledger = لقطة من حالة الشبكة\n\n• حسابات وأرصدة\n• TrustLines و Offers\n• Tokens و Hooks\n• لكل ledger رقم و hash\n• validated يعني متفق عليه",
        },
        {
          title: "Ledger Objects",
          content: "Xahau يستخدم objects typed:\n\n• AccountRoot\n• RippleState / TrustLine\n• Offer\n• URIToken\n• HookDefinition\n• HookState",
        },
        {
          title: "تفاصيل الـ Objects",
          content: "كل object له fields محددة مسبقا\n\nهذا يجعل القراءة والتحقق أسهل من storage عشوائي.\n\nالنتيجة: نموذج بيانات منظم، سريع، ومناسب للاستعلامات.",
        },
      ],
    },
    m1l3: {
      title: "تاريخ البلوكتشين: من Bitcoin إلى Xahau",
      theory: `لفهم سبب وجود Xahau وما الذي يجعلها مختلفة، نحتاج إلى استعراض **تاريخ البلوكتشين** وكيف حل كل جيل مشاكل لم يستطع الجيل السابق حلها.

### 2008 — Bitcoin: الميلاد

بدأ كل شيء بوثيقة من 9 صفحات نشرها **Satoshi Nakamoto** بعنوان *"Bitcoin: A Peer-to-Peer Electronic Cash System"*. كانت الفكرة بسيطة وثورية: **مال رقمي بلا وسيط**.

قدمت Bitcoin:
- **إثبات العمل (Proof of Work / PoW)**: يحل المعدّنون مسائل رياضية للتحقق من صحة المعاملات
- **لامركزية كاملة**: بلا بنوك وبلا خوادم مركزية
- **عدم القابلية للتغيير**: لا يمكن التراجع عن المعاملات المؤكدة
- **ندرة رقمية**: لن يوجد أكثر من 21 مليون BTC

القيود: Bitcoin بطيئة (نحو 7 معاملات في الثانية) ولغة السكربت الخاصة بها محدودة جدا. لم تصمم لتنفيذ منطق معقد.

### 2012 — XRP Ledger: سرعة بلا تعدين

لاحقا ظهر **XRP Ledger (أو XRPL)**، أول بلوكتشين مهمة **لا تستخدم إثبات العمل**. بدلا من ذلك، تستخدم بروتوكول إجماع يعتمد على **مدققين موثوقين (UNL)**.

قدمت XRPL:
- **إجماع بلا تعدين**: تأكيد المعاملات خلال 3-5 ثوان
- **DEX أصلي**: بورصة لامركزية مدمجة في البروتوكول
- **tokens أصلية**: إنشاء tokens دون الحاجة إلى smart contracts
- **رسوم ضئيلة**: أجزاء من السنت لكل معاملة

القيود: لم تكن XRPL تملك القدرة على تنفيذ smart contracts (منطق برمجي مخصص).

### 2015 — Ethereum: الحاسوب العالمي

نشر **Vitalik Buterin** ورقة Ethereum البيضاء بفكرة طموحة: بلوكتشين يمكنها تنفيذ **أي برنامج**. وهكذا ولدت **Ethereum Virtual Machine (EVM)**.

قدمت Ethereum:
- **Smart contracts**: برامج تعيش على البلوكتشين وتُنفَّذ تلقائيا
- **Solidity**: لغة برمجة لكتابة العقود
- **EVM**: آلة افتراضية تنفذ كود العقود
- **ERC-20 / ERC-721**: معايير للـ tokens القابلة للاستبدال وNFTs
- **DeFi**: التمويل اللامركزي (الإقراض، البورصات، العملات المستقرة)

القيود: gas مكلف ومتغير، سرعة منخفضة (نحو 15 TPS)، قابلية توسع محدودة.

### 2020 وما بعده — انفجار Layer 1 وLayer 2

دفعت مشاكل Ethereum موجة من البلوكتشينات الجديدة:

- **Solana** (2020): سرعة عالية (نحو 65,000 TPS نظريا) باستخدام Proof of History
- **Avalanche** (2020): subnets قابلة للتخصيص مع إجماع سريع
- **Polygon** (2020): حل Layer 2 لتوسيع Ethereum
- **Arbitrum / Optimism** (2021): rollups تعالج المعاملات خارج Ethereum
- **Cosmos / Polkadot**: أنظمة بلوكتشينات مترابطة

معظم هذه الشبكات **متوافقة مع EVM** وتستخدم Solidity وأدوات Ethereum.

### 2023 — Xahau: XRPL + Smart Contracts

ولدت **Xahau** كـ **fork من XRP Ledger** يضيف القدرة التي احتاجتها XRPL دائما: **smart contracts**، تسمى **Hooks**. في البداية لم يكن من المفترض أن توجد Xahau، وكان من المفترض أن تصبح Hooks جزءا من XRP Ledger، لكن Ripple رفضت قبول هذا التحسين المقدم من المجتمع. وحتى لا يضيع العمل المنجز على مدى سنوات، وُلدت Xahau.

قدمت Xahau:
- **Hooks**: smart contracts مكتوبة بلغة C ومترجمة إلى WebAssembly
- **XAH**: العملة الأصلية مع نظام إصدارات/مكافآت
- **وراثة من XRPL**: تحافظ على السرعة، وDEX الأصلي، والرسوم المنخفضة
- **بلا EVM**: بنية خاصة بها، غير متوافقة مع Solidity

### لماذا Xahau هي fork من XRPL؟

بما أن Xahau فرع من XRPL، فإنها تستفيد من كل مزايا بلوكتشين مُثبتة ومحسّنة للمدفوعات وtokens، وتضيف القطعة الناقصة: القدرة على تنفيذ منطق برمجي مباشرة داخل البروتوكول.

1. **أساس مُثبت**: تعمل XRPL منذ 2012 دون انقطاعات كبرى
2. **سرعة أصلية**: إجماع XRPL يوفر بالفعل finality خلال 3-5 ثوان
3. **DEX مدمج**: لا حاجة لبناء بورصة لامركزية من الصفر
4. **tokens أصلية**: نظام TrustLines وtokens موجود بالفعل ويعمل
5. **مجتمع موجود**: يمكن لمطوري وأدوات XRPL التكيف

### ملخص الخط الزمني

| السنة | الحدث | الابتكار الرئيسي |
|---|---|---|
| 2008 | Bitcoin | مال رقمي لامركزي |
| 2012 | XRP Ledger | إجماع بلا تعدين، DEX أصلي |
| 2015 | Ethereum | Smart contracts (EVM + Solidity) |
| 2017 | طفرة ICO | tokens من نوع ERC-20، تمويل لامركزي |
| 2020 | DeFi Summer | تمويل لامركزي على Ethereum |
| 2020+ | L1s/L2s | Solana، Avalanche، Polygon، Rollups |
| 2023 | Xahau | XRPL + Hooks (smart contracts بلغة C/WASM) |`,
      codeTitles: [],
      code: [],
      slides: [
        {
          title: "2008-2015: البدايات",
          content: "2008 → ورقة Bitcoin\n2009 → إطلاق Bitcoin\n2012 → XRP Ledger للمدفوعات السريعة\n2015 → Ethereum و smart contracts\n\nالبلوكتشين تنتقل من المال الرقمي إلى المنطق البرمجي.",
        },
        {
          title: "2020+: الانفجار",
          content: "• DeFi\n• NFTs\n• DAOs\n• Layer 1 جديدة\n• Layer 2 للتوسع\n\nالسوق بدأ يبحث عن أداء أفضل ورسوم أقل وتجارب تطوير مختلفة.",
        },
        {
          title: "2023: ولادة Xahau",
          content: "Xahau تضيف Hooks إلى نموذج مستوحى من XRPL\n\n• Layer 1\n• غير EVM\n• XAH كعملة أصلية\n• Smart contracts خفيفة بـ C/WASM",
        },
        {
          title: "الخط الزمني الكامل",
          content: "Bitcoin → أثبتت المال اللامركزي\nXRPL → مدفوعات سريعة ورسوم منخفضة\nEthereum → Smart contracts عامة\nXahau → Ledger سريع + Hooks فعالة",
        },
      ],
    },
    m1l4: {
      title: "منظومة Xahau",
      theory: `Xahau ليست مجرد بلوكتشين، بل هي **منظومة متكاملة** تضم أدوات ومحافظ ومتصفحات ومجتمعا نشطا. في هذا الدرس ستتعرف على العناصر الأساسية للمنظومة لتعرف أين تبحث عن المعلومات وكيف تتفاعل مع الشبكة.

### XAH: العملة الأصلية

**XAH** هي العملة الرقمية الأصلية لشبكة Xahau. على عكس XRP في XRPL، تمتلك XAH **نظام إصدار تضخمي**: يمكن لأصحاب الحسابات النشطة طلب مكافآت دورية بعملة XAH. هذا يحفز المشاركة في الشبكة واستخدامها.

خصائص XAH:
- تُستخدم لدفع **الرسوم** (رسوم المعاملات)
- تحتاج إلى **حد أدنى من الاحتياطي (reserve)** للحفاظ على نشاط الحساب
- يوزع نظام **الإصدارات (emissions)** عملة XAH على الحسابات النشطة التي تطلبها
- يمكن إرسالها وتبادلها واستخدامها في Hooks

### Xaman (سابقا XUMM): المحفظة الرئيسية

**Xaman** (المعروفة سابقا باسم XUMM) هي المحفظة الأكثر استخداما في منظومة XRPL/Xahau. إنها تطبيق للهاتف المحمول يتيح لك:

- إنشاء وإدارة حسابات على Xahau وXRPL
- إرسال واستقبال XAH وtokens
- توقيع المعاملات بأمان
- التفاعل مع التطبيقات اللامركزية (xApps)
- متوفر لنظامي **iOS** و**Android**

التحميل: [xaman.app](https://xaman.app)

### Hooks Builder: بيئة تطوير online للـ smart contracts

**Hooks Builder** هي بيئة تطوير متكاملة (IDE) تعمل في المتصفح وتتيح لك كتابة Hooks وترجمتها ونشرها على Xahau Testnet دون تثبيت أي شيء على جهازك.

الميزات:
- محرر أكواد مع تمييز صياغة (syntax highlighting) للغة C
- مترجم مدمج من C إلى WebAssembly
- نشر مباشر إلى testnet الخاصة بـ Xahau
- أمثلة وقوالب للبدء بسرعة

الرابط: [builder.xahau.network/](https://builder.xahau.network/)

### متصفحات الكتل (Block Explorers)

تتيح لك **المتصفحات** رؤية كل ما يحدث في البلوكتشين بشكل مرئي:

- البحث عن المعاملات باستخدام hash
- عرض حالة أي حساب (الرصيد، tokens، Hooks)
- استكشاف ledgers ومحتوياتها
- التحقق من حالة الشبكة

لشبكة **Xahau Mainnet**:

الرابط: [xahauexplorer.com](https://xahauexplorer.com)
الرابط: [xahau.xrplwin.com](https://xahau.xrplwin.com)
الرابط: [explorer.xahau.network](https://explorer.xahau.network)
الرابط: [xahscan.com](https://xahscan.com)

لشبكة **Xahau Testnet**:

الرابط: [test.xahauexplorer.com](https://test.xahauexplorer.com)
الرابط: [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
الرابط: [explorer.xahau-test.net](https://explorer.xahau-test.net)

### موارد للمطورين

- **الوثائق الرسمية**: [xahau.network/docs/](https://xahau.network/docs/) أدلة، مرجع API، ودروس تعليمية
- **GitHub**: [https://github.com/xahau](https://github.com/xahau) الكود المصدري للعقدة، المكتبات، والأدوات
- **Discord**: [https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj) مجتمع نشط لطرح الأسئلة ومشاركة المشاريع
- **X**: [https://x.com/XahauNetwork](https://x.com/XahauNetwork) الحساب الرسمي لبلوكتشين Xahau للأخبار والتحديثات
- **مكتبة xahau js**: [https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau) مكتبة JavaScript التي نستخدمها في هذه الدورة للتفاعل مع الشبكة

### Testnet مقابل Mainnet

تمتلك Xahau شبكتين رئيسيتين:

| الخاصية | Testnet | Mainnet |
|---|---|---|
| رابط WebSocket | wss://xahau-test.net | wss://xahau.network |
| العملة | XAH (بلا قيمة حقيقية) | XAH (بقيمة حقيقية) |
| الغرض | التطوير والاختبار | الإنتاج |
| Faucet | موجود (XAH مجاني للتجربة) | غير موجود |
| البيانات | يمكن إعادة تعيينها دوريا | دائمة |

**في هذه الدورة سنستخدم testnet دائما.** لا تملك tokens الـ testnet قيمة حقيقية، لذلك يمكنك التجربة بحرية دون خطر خسارة المال.

للحصول على XAH في testnet، استخدم **faucet** (الحنفية): أداة ترسل tokens مجانية إلى حسابك التجريبي. سنتناول ذلك بالتفصيل في وحدات لاحقة.`,
      codeTitles: [],
      code: [],
      slides: [
        {
          title: "XAH ونظام الإصدار",
          content: "XAH = العملة الأصلية لـ Xahau\n\n• دفع رسوم المعاملات\n• reserve أدنى للحسابات\n• نظام emission تضخمي\n  → المستخدمون الذين يطلبونه يمكن أن يستلموا XAH دوريا",
        },
        {
          title: "أدوات المنظومة",
          content: "Xaman → محفظة موبايل\n  xaman.app\n\nHooks Builder → IDE online للـ smart contracts\n  builder.xahau.network\n\nExplorers → متصفحات كتل\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → الوثائق الرسمية\n  xahau.network/docs",
        },
        {
          title: "Testnet مقابل Mainnet",
          content: "Testnet للتطوير\n• wss://xahau-test.net\n• XAH بلا قيمة حقيقية\n• Faucet للحصول على tokens مجانية\n\nMainnet للإنتاج\n• wss://xahau.network\n• XAH بقيمة حقيقية\n• بلا faucet\n\nفي هذه الدورة نستخدم testnet دائما.",
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
  title: "Architecture de base d'une blockchain non-EVM",
  lessons: {
    m1l0: {
      title: "Qu'est-ce qu'une blockchain ?",
      theory: `Avant de parler des blockchains non-EVM, nous devons comprendre **ce qu'est une blockchain** et pourquoi cette technologie est révolutionnaire.

### Définition simple

Une **blockchain** est un **registre numérique, distribué et immuable**. Imagine un livre de comptes qui :
- Est **copié sur des milliers d'ordinateurs** à travers le monde (distribué)
- **Personne ne peut effacer ni modifier** ce qui a déjà été écrit (immuable)
- **N'importe qui peut vérifier** que les données sont correctes (transparent)
- **Ne nécessite pas d'intermédiaire** comme une banque ou une entreprise (décentralisé)

### Comment ça fonctionne ?

Les données sont regroupées en **blocs**. Chaque bloc contient :
1. Un ensemble de **transactions** (par exemple : « Alice envoie 10 tokens à Bob »)
2. Un **hash** (empreinte numérique unique) du bloc
3. Le **hash du bloc précédent**, ce qui crée ainsi une chaîne

Cette structure rend la modification d'un ancien bloc pratiquement impossible, car cela changerait son hash et casserait toute la chaîne qui suit.

### Concepts clés

**Décentralisation**
Il n'y a pas de serveur central. Le réseau est composé de **noeuds** (ordinateurs) qui conservent une copie du registre. Il n'y a pas de point unique de défaillance.

**Immuabilité**
Une fois qu'une transaction est incluse dans un bloc et validée, **elle ne peut plus être modifiée ni supprimée**. Cela garantit un historique fiable.

**Consensus**
Les noeuds ont besoin d'un mécanisme pour se mettre d'accord sur les transactions valides. On appelle cela un **protocole de consensus** (nous verrons cela en détail dans le module 2).

**Cryptographie**
La blockchain utilise des fonctions cryptographiques pour :
- **Hashes** : identifier les blocs et vérifier l'intégrité des données
- **Signatures numériques** : prouver qu'une transaction a été autorisée par son propriétaire
- **Clés publique/privée** : chaque utilisateur possède une paire de clés qui fait office d'identité

**Transactions**
Ce sont les opérations qui modifient l'état de la blockchain : envoyer des tokens, créer un contrat, enregistrer une donnée, etc. Chaque transaction est **signée numériquement** par son émetteur.

### Blockchain vs base de données traditionnelle

| Caractéristique | Base de données traditionnelle | Blockchain |
|---|---|---|
| Contrôle | Une entreprise (centralisé) | Réseau de noeuds (décentralisé) |
| Modification | Quiconque a accès peut modifier | Immuable une fois validé |
| Confiance | Tu fais confiance à l'entreprise | Tu fais confiance à la cryptographie et au consensus |
| Transparence | Privée par défaut | Publique et vérifiable |
| Intermédiaire | Nécessaire (banque, serveur) | Non nécessaire (pair à pair) |

### À quoi ça sert ?

Les blockchains sont utilisées pour :
- **Cryptomonnaies** : envoyer de l'argent sans banque (Bitcoin, XAH)
- **Tokens** : créer ses propres actifs numériques
- **NFT** : certifier la propriété d'objets numériques uniques
- **Smart contracts** : exécuter une logique programmable de façon automatique et fiable
- **Traçabilité** : enregistrer des chaînes d'approvisionnement, des certificats, des votes, etc.

### Types de blockchain

- **Publiques** : n'importe qui peut y participer (Bitcoin, Ethereum, Xahau)
- **Privées/permissionnées** : seuls les membres autorisés y participent (Hyperledger)
- **Hybrides** : combinent des éléments des deux

Dans ce cours, nous nous concentrerons sur **Xahau**, une blockchain **publique** conçue pour des paiements rapides, des tokens et des smart contracts efficaces.`,
      slides: [
        ["Qu'est-ce qu'une blockchain ?", "Un registre partagé entre plusieurs noeuds\n\n• Historique vérifiable\n• Copies synchronisées\n• Transactions signées\n• Pas de base de données centrale unique"],
        ["Chaîne de blocs", "Chaque bloc contient des transactions et pointe vers le bloc précédent\n\nCette liaison rend l'historique difficile à modifier sans que le réseau le voie."],
        ["Concepts clés", "Compte\nTransaction\nLedger\nConsensus\nSignature\nValidateur\n\nCes pièces reviennent dans tout le cours."],
        ["À quoi ça sert ?", "• Paiements\n• Actifs numériques\n• Traçabilité\n• Automatisation avec Hooks\n• Applications qui ont besoin d'un état partagé et vérifiable"],
      ],
    },
    m1l1: {
      title: "Qu'est-ce qu'une blockchain non-EVM ?",
      theory: `Quand on parle de blockchains, la plupart des développeurs pensent à **Ethereum** et à sa machine virtuelle (**EVM**). Pourtant, il existe des blockchains qui fonctionnent d'une manière complètement différente, sans utiliser l'EVM ni Solidity.

### EVM vs non-EVM

| Caractéristique | Blockchain EVM | Blockchain non-EVM (Xahau) |
|---|---|---|
| Langage des contrats | Solidity / Vyper | C (compilé en WebAssembly) |
| Machine virtuelle | EVM (Ethereum Virtual Machine) | Pas de VM, exécution native en WASM |
| Modèle d'état | Comptes avec stockage arbitraire | Objets de ledger typés |
| Gas / Frais | Gas variable et coûteux | Frais fixes et prévisibles |
| Modèle de données | Clé-valeur dans le stockage | Objets natifs (AccountRoot, TrustLine, etc.) |

### Pourquoi non-EVM ?

Les blockchains non-EVM comme **Xahau** ont été conçues depuis le départ pour des cas d'usage spécifiques : paiements rapides, tokenisation et logique programmable efficace. Elles ne cherchent pas à être des « ordinateurs à usage général » comme Ethereum, mais optimisent plutôt la **performance, le faible coût et la finalité rapide**.

### Xahau : une blockchain non-EVM

**Xahau** est une blockchain de couche 1 qui hérite de l'architecture du **XRP Ledger (XRPL)** et y ajoute la capacité d'exécuter des **Hooks**, des smart contracts légers écrits en C et compilés en WebAssembly.

Contrairement aux réseaux EVM, dans Xahau :
- Les transactions sont **natives et typées** (Payment, TrustSet, OfferCreate, etc.)
- Le ledger maintient des **objets structurés**, et non des états arbitraires
- Les smart contracts (Hooks) s'exécutent comme des **filtres réactifs** sur les transactions
- Le token natif est **XAH**`,
      codeTitles: ["Se connecter à un noeud Xahau et afficher server_info"],
      code: [
`// Se connecter à un noeud Xahau et lire les informations du serveur
const { Client } = require("xahau");

async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const info = await client.request({ command: "server_info" });

  console.log("Connecté au réseau :", info.result.info.network_id);
  console.log("Ledger validé :", info.result.info.validated_ledger.seq);

  await client.disconnect();
}

main().catch(console.error);`,
      ],
      slides: [
        ["EVM vs non-EVM", "EVM : smart contracts Solidity exécutés dans une VM commune\n\nNon-EVM : modèle propre au protocole\n\nXahau utilise des transactions natives, des objets de ledger et des Hooks."],
        ["Qu'est-ce que Xahau ?", "Xahau est une blockchain compatible avec l'écosystème XRPL, orientée paiements, actifs et logique on-chain via Hooks."],
        ["Architecture du ledger", "Le ledger contient des comptes et des objets structurés\n\nLes transactions modifient ces objets selon des règles natives du protocole."],
      ],
    },
    m1l2: {
      title: "Structure du ledger dans Xahau",
      theory: `Le **ledger** est l'état actuel du réseau. Il contient les comptes, soldes, lignes de confiance, objets créés par les transactions et paramètres nécessaires au protocole.

Chaque nouvelle version validée du ledger reçoit un numéro. Les transactions acceptées modifient l'état précédent pour produire le ledger suivant.

Dans Xahau, on ne pense pas seulement en blocs : on pense en objets de ledger. Comprendre ces objets aide à lire les réponses de l'API et à prévoir l'effet d'une transaction.`,
      codeTitles: ["Consulter les informations du ledger courant"],
      code: [
`// Lire les informations du ledger validé le plus récent
const { Client } = require("xahau");

async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const ledger = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });

  console.log("Index du ledger :", ledger.result.ledger_index);
  console.log("Hash du ledger :", ledger.result.ledger_hash);

  await client.disconnect();
}

main().catch(console.error);`,
      ],
      slides: [
        ["Le ledger Xahau", "Le ledger est une photo validée de l'état du réseau\n\n• Comptes\n• Soldes\n• Objets\n• Paramètres\n• Historique de modifications"],
        ["Objets de ledger", "Exemples :\n\nAccountRoot\nTrustLine\nOffer\nEscrow\nCheck\nHook\n\nChaque type a ses champs et ses règles."],
        ["Détails d'un objet", "Chaque objet possède des champs prédéfinis :\n\n• AccountRoot → Solde, Sequence, Flags, Hooks\n• RippleState → Solde entre deux comptes pour un token\n• Offer → Prix, quantité, paire d'échange\n• DirectoryNode → Index reliant les objets\n\nDifférence avec l'EVM :\n• Pas de stockage arbitraire (clé-valeur)\n• Champs fixes → requêtes plus efficaces"],
      ],
    },
    m1l3: {
      title: "Histoire des blockchains : de Bitcoin à Xahau",
      theory: `Pour comprendre pourquoi Xahau existe et ce qui la rend différente, nous devons parcourir l'**histoire des blockchains** et voir comment chaque génération a résolu des problèmes que la précédente ne pouvait pas résoudre.

### 2008 — Bitcoin : la naissance

Tout a commencé avec un document de 9 pages publié par **Satoshi Nakamoto** intitulé *« Bitcoin: A Peer-to-Peer Electronic Cash System »*. L'idée était simple et révolutionnaire : **de l'argent numérique sans intermédiaire**.

Bitcoin a introduit :
- **Preuve de travail (Proof of Work, PoW)** : les mineurs résolvent des problèmes mathématiques pour valider les transactions
- **Décentralisation totale** : pas de banques, pas de serveurs centraux
- **Immuabilité** : les transactions confirmées ne peuvent pas être annulées
- **Rareté numérique** : il n'existera jamais plus de 21 millions de BTC

Limite : Bitcoin est lent (environ 7 transactions par seconde) et son langage de script est très limité. Il n'a pas été conçu pour exécuter une logique complexe.

### 2012 — XRP Ledger : la vitesse sans minage

Plus tard, le **XRP Ledger (ou XRPL)** a été créé, la première blockchain majeure à **ne pas utiliser la preuve de travail**. Elle utilise à la place un protocole de consensus basé sur des **validateurs de confiance (UNL)**.

XRPL a introduit :
- **Consensus sans minage** : transactions confirmées en 3 à 5 secondes
- **DEX natif** : échange décentralisé intégré au protocole
- **Tokens natifs** : créer des tokens sans avoir besoin de smart contracts
- **Frais minimes** : des fractions de centime par transaction

Limite : XRPL n'avait pas la capacité d'exécuter des smart contracts (logique programmable personnalisée).

### 2015 — Ethereum : l'ordinateur mondial

**Vitalik Buterin** a publié le livre blanc d'Ethereum avec une idée ambitieuse : une blockchain capable d'exécuter **n'importe quel programme**. C'est ainsi qu'est née l'**Ethereum Virtual Machine (EVM)**.

Ethereum a introduit :
- **Smart contracts** : des programmes qui vivent sur la blockchain et s'exécutent automatiquement
- **Solidity** : le langage de programmation pour écrire des contrats
- **EVM** : la machine virtuelle qui exécute le code des contrats
- **ERC-20 / ERC-721** : des standards pour les tokens fongibles et les NFT
- **DeFi** : la finance décentralisée (prêts, échanges, stablecoins)

Limite : gas coûteux et variable, faible vitesse (environ 15 TPS), scalabilité limitée.

### 2020+ — L'explosion des L1 et L2

Les problèmes d'Ethereum ont déclenché une vague de nouvelles blockchains :

- **Solana** (2020) : haute vitesse (environ 65 000 TPS théoriques) avec la Proof of History
- **Avalanche** (2020) : des sous-réseaux personnalisables avec un consensus rapide
- **Polygon** (2020) : une solution de couche 2 pour faire évoluer Ethereum
- **Arbitrum / Optimism** (2021) : des rollups qui traitent les transactions en dehors d'Ethereum
- **Cosmos / Polkadot** : des écosystèmes de blockchains interconnectées

La plupart de ces réseaux sont **compatibles avec l'EVM** et utilisent Solidity et les outils d'Ethereum.

### 2023 — Xahau : XRPL + Smart Contracts

**Xahau** est née comme un **fork du XRP Ledger** qui ajoute la capacité dont XRPL a toujours eu besoin : les **smart contracts**, appelés **Hooks**. À l'origine, Xahau n'était pas censée exister et les Hooks devaient faire partie du XRP Ledger, mais Ripple n'a pas voulu accepter cette amélioration proposée par la communauté. Pour ne pas gâcher le travail réalisé pendant des années, Xahau est née.

Xahau a introduit :
- **Hooks** : des smart contracts écrits en C et compilés en WebAssembly
- **XAH** : le token natif avec un système d'émission/récompenses
- **Héritage de XRPL** : conserve la vitesse, le DEX natif et les frais bas
- **Pas d'EVM** : une architecture propre, non compatible avec Solidity

### Pourquoi Xahau est-elle un fork de XRPL ?

En tant que fork de XRPL, Xahau tire parti de tous les avantages d'une blockchain éprouvée et optimisée pour les paiements et les tokens, et y ajoute la pièce manquante : la capacité d'exécuter une logique programmable directement dans le protocole.

1. **Base éprouvée** : XRPL fonctionne depuis 2012 sans interruption majeure
2. **Vitesse native** : le consensus de XRPL offre déjà une finalité en 3 à 5 secondes
3. **DEX intégré** : pas besoin de construire un échange décentralisé depuis zéro
4. **Tokens natifs** : le système de TrustLines et de tokens existe déjà et fonctionne
5. **Communauté existante** : les développeurs et outils de XRPL peuvent s'adapter

### Résumé de la chronologie

| Année | Étape | Innovation clé |
|---|---|---|
| 2008 | Bitcoin | Argent numérique décentralisé |
| 2012 | XRP Ledger | Consensus sans minage, DEX natif |
| 2015 | Ethereum | Smart contracts (EVM + Solidity) |
| 2017 | Boom des ICO | Tokens ERC-20, financement décentralisé |
| 2020 | DeFi Summer | Finance décentralisée sur Ethereum |
| 2020+ | L1/L2 | Solana, Avalanche, Polygon, Rollups |
| 2023 | Xahau | XRPL + Hooks (smart contracts en C/WASM) |`,
      slides: [
        ["2008-2015 : les origines", "Bitcoin introduit la rareté numérique et le consensus public\n\nEthereum ajoute les smart contracts généralistes avec l'EVM."],
        ["2020+ : l'explosion", "DeFi, NFT, bridges et nouvelles blockchains apparaissent\n\nLes développeurs explorent plusieurs modèles d'exécution."],
        ["2023 : naissance de Xahau", "Xahau apporte les Hooks à un environnement inspiré XRPL\n\nObjectif : logique on-chain efficace sans copier l'EVM."],
        ["Chronologie complète", "Bitcoin → Ethereum → XRPL → Hooks → Xahau\n\nChaque étape répond à un besoin différent : paiement, programmabilité, rapidité, automatisation."],
      ],
    },
    m1l4: {
      title: "L'écosystème Xahau",
      theory: `Xahau n'est pas seulement une blockchain, c'est un **écosystème complet** avec des outils, des wallets, des explorateurs et une communauté active. Dans cette leçon, tu découvriras les éléments fondamentaux de l'écosystème afin de savoir où trouver l'information et comment interagir avec le réseau.

### XAH : le token natif

**XAH** est la cryptomonnaie native de Xahau. Contrairement à XRP sur XRPL, XAH dispose d'un **système d'émission inflationniste** : les titulaires de comptes actifs peuvent demander des récompenses périodiques en XAH. Cela incite à la participation au réseau et à son utilisation.

Caractéristiques de XAH :
- Utilisé pour payer les **frais** (frais de transaction)
- Une **réserve minimale** est nécessaire pour maintenir un compte actif
- Le **système d'émissions** distribue des XAH aux comptes actifs qui en font la demande
- Peut être envoyé, échangé et utilisé dans les Hooks

### Xaman (anciennement XUMM) : le wallet principal

**Xaman** (anciennement connu sous le nom de XUMM) est le wallet le plus utilisé dans l'écosystème XRPL/Xahau. C'est une application mobile qui te permet de :

- Créer et gérer des comptes sur Xahau et XRPL
- Envoyer et recevoir des XAH et des tokens
- Signer des transactions en toute sécurité
- Interagir avec des applications décentralisées (xApps)
- Disponible sur **iOS** et **Android**

Téléchargement : [xaman.app](https://xaman.app)

### Hooks Builder : IDE en ligne pour les smart contracts

**Hooks Builder** est un environnement de développement intégré (IDE) qui fonctionne dans le navigateur et te permet d'écrire, de compiler et de déployer des Hooks sans rien installer sur ton ordinateur, sur Xahau Testnet.

Fonctionnalités :
- Éditeur de code avec coloration syntaxique pour le C
- Compilateur C vers WebAssembly intégré
- Déploiement direct sur le testnet de Xahau
- Exemples et modèles pour démarrer rapidement

URL : [builder.xahau.network/](https://builder.xahau.network/)

### Explorateurs de blocs

Les **explorateurs** te permettent de voir visuellement tout ce qui se passe sur la blockchain :

- Rechercher des transactions par hash
- Voir l'état de n'importe quel compte (solde, tokens, hooks)
- Explorer les ledgers et leur contenu
- Vérifier l'état du réseau

Pour **Xahau Mainnet** :

URL : [xahauexplorer.com](https://xahauexplorer.com)
URL : [xahau.xrplwin.com](https://xahau.xrplwin.com)
URL : [explorer.xahau.network](https://explorer.xahau.network)
URL : [xahscan.com](https://xahscan.com)

Pour **Xahau Testnet** :

URL : [test.xahauexplorer.com](https://test.xahauexplorer.com)
URL : [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
URL : [explorer.xahau-test.net](https://explorer.xahau-test.net)

### Ressources pour les développeurs

- **Documentation officielle** : [xahau.network/docs/](https://xahau.network/docs/) Guides, référence de l'API et tutoriels
- **GitHub** : [https://github.com/xahau](https://github.com/xahau) Code source du noeud, bibliothèques et outils
- **Discord** : [https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj) Communauté active pour poser des questions et partager des projets
- **X** : [https://x.com/XahauNetwork](https://x.com/XahauNetwork) Compte officiel de la blockchain Xahau pour les actualités et mises à jour
- **Bibliothèque xahau js** : [https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau) La bibliothèque JavaScript que nous utilisons dans ce cours pour interagir avec le réseau

### Testnet vs Mainnet

Xahau possède deux réseaux principaux :

| Caractéristique | Testnet | Mainnet |
|---|---|---|
| URL WebSocket | wss://xahau-test.net | wss://xahau.network |
| Token | XAH (sans valeur réelle) | XAH (avec valeur réelle) |
| Objectif | Développement et tests | Production |
| Faucet | Oui (XAH gratuits pour tester) | Non |
| Données | Peuvent être réinitialisées périodiquement | Permanentes |

**Pour ce cours, nous utiliserons toujours le testnet.** Les tokens de testnet n'ont pas de valeur réelle, tu peux donc expérimenter librement sans risque de perdre de l'argent.

Pour obtenir des XAH de testnet, utilise le **faucet** (robinet) : un outil qui envoie des tokens gratuits à ton compte de test. Nous verrons cela en détail dans les modules suivants.`,
      slides: [
        ["XAH et le système d'émission", "XAH est l'actif natif du réseau\n\nIl sert aux frais, réserves et opérations de base du protocole."],
        ["Outils de l'écosystème", "• SDK xahau\n• Explorateurs\n• Wallets comme Xaman\n• Noeuds publics\n• Hooks\n• Documentation développeur"],
        ["Testnet vs Mainnet", "Testnet : apprentissage et tests sans valeur réelle\n\nMainnet : réseau réel, fonds réels, sécurité obligatoire\n\nCommence toujours sur testnet."],
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
