import { deriveCodeTranslations } from "../code-i18n.js";
import { addNewWords } from "../glossary.js";
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
Los nodos necesitan un mecanismo para ponerse de acuerdo sobre qué transacciones son válidas. Esto se llama **protocolo de consenso** (lo verás en detalle en el [módulo 2](?m=2&l=1)).

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
Os nós precisam um mecanismo para chegar a um acordo sobre quais transações são válidas. Isso se chama **protocolo de consenso** (você verá em detalhes no [módulo 2](?m=2&l=1)).
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
| Modificação | Qualquer pessoa com acesso pode editar | Imutável depois de validado |
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
Nodes need a mechanism to agree on which transactions are valid. This is called a **consensus protocol** (covered in detail in [Module 2](?m=2&l=1)).

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
ノードはどのトランザクションが有効かについて合意するメカニズムを必要とします。これを**コンセンサスプロトコル**と呼びます（[モジュール2](?m=2&l=1)で詳しく説明します）。

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
节点需要一种机制来就哪些交易有效达成一致，这称为**共识协议**（将在[模块2](?m=2&l=1)中详细介绍）。

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
          title: { es: "¿Para qué sirve?", pt: "Para que servem?", en: "What Is It Used For?", jp: "何に使われるのか？", ko: "어디에 사용될까?", zh: "有什么用途？" },
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
        es: `La mayoría de las plataformas de smart contracts siguen a Ethereum: una máquina virtual, la **EVM**, ejecuta el código del contrato en cada transacción que lo llama. Xahau funciona de otra manera. Esta lección explica la diferencia, porque condiciona todo lo que construyes en este curso.

### Cómo funciona una cadena EVM

En Ethereum, un contrato es una cuenta con código y su propio almacenamiento, un espacio clave-valor libre. Una transacción llama a una función de ese código, y la EVM la ejecuta instrucción a instrucción. Cada instrucción cuesta **gas**, así que el fee depende de cuánto código se ejecuta, y un token, un exchange o un NFT es código de contrato que alguien escribió.

### Cómo funciona Xahau

En Xahau, las operaciones habituales forman parte del propio protocolo. Hay un tipo de transacción para cada una: \`Payment\`, \`TrustSet\` para tokens, \`OfferCreate\` para el exchange, \`URITokenMint\` para NFTs. La red sabe qué hace cada tipo y qué campos tiene, y guarda el resultado como **objetos tipados del ledger**: una cuenta es un \`AccountRoot\` con un saldo, una trust line es un \`RippleState\`.

La lógica propia viene de los **Hooks**: programas pequeños escritos en C, compilados a WebAssembly e instalados en una cuenta. Un Hook no espera a que lo llamen como una función de un contrato. Se ejecuta cuando una transacción toca su cuenta, y puede aceptarla, rechazarla o emitir transacciones nuevas.

| | Cadena EVM | Xahau |
|---|---|---|
| Operaciones habituales | Código de contratos (tokens, exchanges, NFTs) | Tipos de transacción integrados |
| Lógica propia | Contratos en Solidity, ejecutados por la EVM | Hooks en C, ejecutados como WebAssembly |
| Cuándo se ejecuta | Cuando una transacción llama al contrato | Cuando una transacción toca la cuenta del Hook |
| Estado | Almacenamiento libre del contrato | Objetos tipados, más el estado clave-valor de los Hooks |
| Fee | Gas usado × precio del gas | Conocido antes de enviar: fee base, más los Hooks que activa |

Xahau hereda este diseño del **XRP Ledger** y añade los Hooks. Su moneda nativa es **XAH**, y un ledger se cierra cada pocos segundos.

### El ejemplo

El ejemplo se conecta a un nodo de Mainnet e imprime lo que informa de sí mismo. Salida:

\`\`\`
Network: 21337
Version: 2026.6.21-release+3350
Current ledger: 26104801
\`\`\`

\`21337\` es el ID de red de Xahau Mainnet; el de testnet es \`21338\`. Cada transacción lleva este ID, así que una transacción firmada para una red no se puede aplicar en la otra.`,
        pt: `A maioria das plataformas de smart contracts segue o Ethereum: uma máquina virtual, a **EVM**, executa o código do contrato em cada transação que o chama. A Xahau funciona de outra forma. Esta lição explica a diferença, porque ela condiciona tudo o que você constrói neste curso.

### Como funciona uma cadeia EVM

No Ethereum, um contrato é uma conta com código e o seu próprio armazenamento, um espaço chave-valor livre. Uma transação chama uma função desse código, e a EVM a executa instrução por instrução. Cada instrução custa **gas**, então o fee depende de quanto código é executado, e um token, uma exchange ou um NFT é código de contrato que alguém escreveu.

### Como funciona a Xahau

Na Xahau, as operações comuns fazem parte do próprio protocolo. Há um tipo de transação para cada uma: \`Payment\`, \`TrustSet\` para tokens, \`OfferCreate\` para a exchange, \`URITokenMint\` para NFTs. A rede sabe o que cada tipo faz e que campos tem, e guarda o resultado como **objetos tipados do ledger**: uma conta é um \`AccountRoot\` com um saldo, uma trust line é um \`RippleState\`.

A lógica própria vem dos **Hooks**: pequenos programas escritos em C, compilados para WebAssembly e instalados numa conta. Um Hook não espera ser chamado como uma função de contrato. Ele é executado quando uma transação toca a sua conta, e pode aceitá-la, rejeitá-la ou emitir novas transações.

| | Cadeia EVM | Xahau |
|---|---|---|
| Operações comuns | Código de contratos (tokens, exchanges, NFTs) | Tipos de transação integrados |
| Lógica própria | Contratos em Solidity, executados pela EVM | Hooks em C, executados como WebAssembly |
| Quando é executada | Quando uma transação chama o contrato | Quando uma transação toca a conta do Hook |
| Estado | Armazenamento livre do contrato | Objetos tipados, mais o estado chave-valor dos Hooks |
| Fee | Gas usado × preço do gas | Conhecido antes de enviar: fee base, mais os Hooks que aciona |

A Xahau herda este design do **XRP Ledger** e acrescenta os Hooks. A sua moeda nativa é o **XAH**, e um ledger fecha a cada poucos segundos.

### O exemplo

O exemplo se conecta a um nó da Mainnet e imprime o que ele informa sobre si mesmo. Saída:

\`\`\`
Network: 21337
Version: 2026.6.21-release+3350
Current ledger: 26104801
\`\`\`

\`21337\` é o ID de rede da Xahau Mainnet; o da testnet é \`21338\`. Cada transação leva este ID, então uma transação assinada para uma rede não pode ser aplicada na outra.`,
        en: `Most smart-contract platforms follow Ethereum: a virtual machine, the **EVM**, runs contract code for every transaction that calls it. Xahau works differently. This lesson explains the difference, because it shapes everything you build in this course.

### How an EVM chain works

On Ethereum, a contract is an account with code and its own storage, a free-form key-value space. A transaction calls a function of that code, and the EVM executes it instruction by instruction. Each instruction costs **gas**, so the fee depends on how much code runs, and a token, an exchange or an NFT is contract code that someone wrote.

### How Xahau works

On Xahau, the common operations are part of the protocol itself. There is a transaction type for each one: \`Payment\`, \`TrustSet\` for tokens, \`OfferCreate\` for the exchange, \`URITokenMint\` for NFTs. The network knows what each type does and what fields it has, and it stores the result as **typed ledger objects**: an account is an \`AccountRoot\` with a balance, a trust line is a \`RippleState\`.

Custom logic comes from **Hooks**: small programs written in C, compiled to WebAssembly and installed on an account. A Hook doesn't wait to be called like a contract function. It runs when a transaction touches its account, and it can accept it, reject it, or emit new transactions.

| | EVM chain | Xahau |
|---|---|---|
| Common operations | Contract code (tokens, exchanges, NFTs) | Built-in transaction types |
| Custom logic | Contracts in Solidity, run by the EVM | Hooks in C, run as WebAssembly |
| When logic runs | When a transaction calls the contract | When a transaction touches the Hook's account |
| State | Free-form contract storage | Typed objects, plus key-value Hook state |
| Fee | Gas used × gas price | Known before sending: base fee, plus the Hooks it triggers |

Xahau inherits this design from the **XRP Ledger** and adds Hooks. Its native currency is **XAH**, and a ledger closes every few seconds.

### The example

The example connects to a Mainnet node and prints what it reports about itself. Output:

\`\`\`
Network: 21337
Version: 2026.6.21-release+3350
Current ledger: 26104801
\`\`\`

\`21337\` is the network ID of Xahau Mainnet; testnet is \`21338\`. Every transaction carries this ID, so a transaction signed for one network can't be applied on the other.`,
        jp: `ほとんどのスマートコントラクトプラットフォームは Ethereum にならっています。仮想マシンである **EVM** が、コントラクトを呼び出すトランザクションのたびにそのコードを実行します。Xahau の仕組みは異なります。この違いはこのコースで作るものすべてに関わるため、このレッスンで説明します。

### EVM チェーンの仕組み

Ethereum では、コントラクトはコードと独自のストレージ（自由なキーバリュー空間）を持つアカウントです。トランザクションがそのコードの関数を呼び出し、EVM が命令を1つずつ実行します。命令ごとに **gas** がかかるため、手数料は実行されるコードの量によって決まります。トークンも取引所も NFT も、誰かが書いたコントラクトのコードです。

### Xahau の仕組み

Xahau では、よく使う操作がプロトコル自体に組み込まれています。操作ごとにトランザクションタイプがあります。\`Payment\`、トークン用の \`TrustSet\`、取引所用の \`OfferCreate\`、NFT 用の \`URITokenMint\` などです。ネットワークは各タイプが何をするか、どんなフィールドを持つかを知っており、結果を**型付きの台帳オブジェクト**として保存します。アカウントは残高を持つ \`AccountRoot\`、トラストラインは \`RippleState\` です。

独自のロジックは **Hooks** で実現します。C で書いて WebAssembly にコンパイルし、アカウントにインストールする小さなプログラムです。Hook はコントラクトの関数のように呼ばれるのを待ちません。トランザクションがそのアカウントに触れたときに実行され、トランザクションを受け入れる、拒否する、新しいトランザクションを発行する、のいずれかを行えます。

| | EVM チェーン | Xahau |
|---|---|---|
| よく使う操作 | コントラクトのコード（トークン、取引所、NFT） | 組み込みのトランザクションタイプ |
| 独自のロジック | Solidity のコントラクトを EVM が実行 | C の Hook を WebAssembly として実行 |
| ロジックが動くとき | トランザクションがコントラクトを呼んだとき | トランザクションが Hook のアカウントに触れたとき |
| 状態 | コントラクトの自由なストレージ | 型付きオブジェクトと、Hook のキーバリュー状態 |
| 手数料 | 使った gas × gas 価格 | 送信前にわかる：基本手数料と、起動する Hook の分 |

Xahau はこの設計を **XRP Ledger** から受け継ぎ、Hooks を加えています。ネイティブ通貨は **XAH** で、台帳は数秒ごとに閉じられます。

### 例

この例はメインネットのノードに接続し、ノードが自分について報告する内容を表示します。出力です。

\`\`\`
Network: 21337
Version: 2026.6.21-release+3350
Current ledger: 26104801
\`\`\`

\`21337\` は Xahau メインネットのネットワーク ID で、テストネットは \`21338\` です。すべてのトランザクションがこの ID を持つため、一方のネットワーク用に署名したトランザクションをもう一方で適用することはできません。`,
        ko: `대부분의 스마트 컨트랙트 플랫폼은 Ethereum을 따릅니다. 가상 머신인 **EVM**이 컨트랙트를 호출하는 트랜잭션마다 그 코드를 실행합니다. Xahau는 다르게 동작합니다. 이 차이는 이 강좌에서 만드는 모든 것에 영향을 주므로 이 레슨에서 설명합니다.

### EVM 체인의 동작 방식

Ethereum에서 컨트랙트는 코드와 자체 저장소(자유로운 키-값 공간)를 가진 계정입니다. 트랜잭션이 그 코드의 함수를 호출하면 EVM이 명령을 하나씩 실행합니다. 명령마다 **gas**가 들기 때문에 수수료는 실행되는 코드의 양에 따라 달라지며, 토큰도 거래소도 NFT도 누군가 작성한 컨트랙트 코드입니다.

### Xahau의 동작 방식

Xahau에서는 흔히 쓰는 작업이 프로토콜 자체에 들어 있습니다. 작업마다 트랜잭션 타입이 있습니다. \`Payment\`, 토큰용 \`TrustSet\`, 거래소용 \`OfferCreate\`, NFT용 \`URITokenMint\` 등입니다. 네트워크는 각 타입이 무엇을 하고 어떤 필드를 가지는지 알고 있으며, 결과를 **타입이 있는 원장 객체**로 저장합니다. 계정은 잔액을 가진 \`AccountRoot\`이고, 트러스트 라인은 \`RippleState\`입니다.

맞춤 로직은 **Hooks**로 만듭니다. C로 작성해 WebAssembly로 컴파일하고 계정에 설치하는 작은 프로그램입니다. Hook은 컨트랙트 함수처럼 호출되기를 기다리지 않습니다. 트랜잭션이 그 계정에 닿으면 실행되며, 트랜잭션을 수락하거나 거부하거나 새 트랜잭션을 발행할 수 있습니다.

| | EVM 체인 | Xahau |
|---|---|---|
| 흔한 작업 | 컨트랙트 코드(토큰, 거래소, NFT) | 내장된 트랜잭션 타입 |
| 맞춤 로직 | Solidity 컨트랙트를 EVM이 실행 | C로 작성한 Hook을 WebAssembly로 실행 |
| 로직이 실행되는 때 | 트랜잭션이 컨트랙트를 호출할 때 | 트랜잭션이 Hook 계정에 닿을 때 |
| 상태 | 컨트랙트의 자유로운 저장소 | 타입이 있는 객체와 Hook의 키-값 상태 |
| 수수료 | 사용한 gas × gas 가격 | 보내기 전에 알 수 있음: 기본 수수료와 실행되는 Hook 비용 |

Xahau는 이 설계를 **XRP Ledger**에서 물려받고 Hooks를 더했습니다. 기본 통화는 **XAH**이며, 원장은 몇 초마다 닫힙니다.

### 예제

이 예제는 메인넷 노드에 연결해 노드가 자신에 대해 알려 주는 정보를 출력합니다. 출력입니다.

\`\`\`
Network: 21337
Version: 2026.6.21-release+3350
Current ledger: 26104801
\`\`\`

\`21337\`은 Xahau 메인넷의 네트워크 ID이고, 테스트넷은 \`21338\`입니다. 모든 트랜잭션에 이 ID가 들어가므로, 한 네트워크용으로 서명한 트랜잭션은 다른 네트워크에 적용할 수 없습니다.`,
        zh: `大多数智能合约平台都沿用 Ethereum 的模式：由虚拟机 **EVM** 在每一笔调用合约的交易中执行合约代码。Xahau 的工作方式不同。这个区别影响你在本课程中构建的一切，所以本课先说明它。

### EVM 链如何工作

在 Ethereum 上，合约是一个带有代码和自有存储（自由的键值空间）的账户。交易调用这段代码中的一个函数，EVM 逐条执行其中的指令。每条指令都要消耗 **gas**，所以手续费取决于运行了多少代码；代币、交易所或 NFT 都是某人编写的合约代码。

### Xahau 如何工作

在 Xahau 上，常用操作是协议本身的一部分。每种操作都有对应的交易类型：\`Payment\`、用于代币的 \`TrustSet\`、用于交易所的 \`OfferCreate\`、用于 NFT 的 \`URITokenMint\`。网络知道每种类型做什么、有哪些字段，并把结果保存为**有类型的账本对象**：账户是带余额的 \`AccountRoot\`，信任线是 \`RippleState\`。

自定义逻辑来自 **Hooks**：用 C 编写、编译成 WebAssembly 并安装在账户上的小程序。Hook 不会像合约函数那样等待被调用。当一笔交易涉及它所在的账户时，它就会运行，并可以接受这笔交易、拒绝它，或发出新的交易。

| | EVM 链 | Xahau |
|---|---|---|
| 常用操作 | 合约代码（代币、交易所、NFT） | 内置的交易类型 |
| 自定义逻辑 | Solidity 合约，由 EVM 执行 | C 编写的 Hook，以 WebAssembly 运行 |
| 逻辑何时运行 | 交易调用合约时 | 交易涉及 Hook 所在账户时 |
| 状态 | 合约的自由存储 | 有类型的对象，加上 Hook 的键值状态 |
| 手续费 | 消耗的 gas × gas 价格 | 发送前即可知道：基础手续费，加上触发的 Hook |

Xahau 从 **XRP Ledger** 继承了这种设计，并加入了 Hooks。它的原生货币是 **XAH**，账本每隔几秒关闭一次。

### 示例

示例连接到一个主网节点，并打印节点报告的自身信息。输出：

\`\`\`
Network: 21337
Version: 2026.6.21-release+3350
Current ledger: 26104801
\`\`\`

\`21337\` 是 Xahau 主网的网络 ID；测试网是 \`21338\`。每笔交易都带有这个 ID，所以为一个网络签名的交易不能在另一个网络上应用。`,
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
  console.log("Versão:", info.build_version);
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
            es: `EVM (Ethereum)
• Solidity → Bytecode EVM
• Gas variable
• Estado arbitrario

No-EVM (Xahau)
• C → WebAssembly
• Fees conocidos antes de enviar
• Objetos tipados del ledger`,
            pt: `EVM (Ethereum)
• Solidity → Bytecode EVM
• Gas variável
• Estado arbitrário

No-EVM (Xahau)
• C → WebAssembly
• Fees conhecidos antes de enviar
• Objetos tipados do ledger`,
            en: `EVM (Ethereum)
• Solidity → EVM Bytecode
• Variable gas
• Arbitrary state

Non-EVM (Xahau)
• C → WebAssembly
• Fees known before sending
• Typed ledger objects`,
            jp: `EVM（Ethereum）
• Solidity → EVMバイトコード
• 変動ガス
• 任意の状態

Non-EVM（Xahau）
• C → WebAssembly
• 送信前にわかる手数料
• 型付きレジャーオブジェクト`,
            ko: `EVM (Ethereum)
• Solidity → EVM 바이트코드
• 가변 가스
• 임의 상태 저장

비 EVM (Xahau)
• C → WebAssembly
• 보내기 전에 알 수 있는 수수료
• 타입이 있는 레저 객체`,
            zh: `EVM (Ethereum)
• Solidity → EVM 字节码
• 可变 Gas
• 任意状态

非EVM (Xahau)
• C → WebAssembly
• 发送前即可知道的手续费
• 类型化账本对象`,
          },
          visual: "⚖️",
        },
        {
          title: { es: "¿Qué es Xahau?", pt: "O que é Xahau?", en: "What is Xahau?", jp: "Xahauとは？", ko: "Xahau란?", zh: "什么是 Xahau？" },
          content: {
            es: "Blockchain de capa 1 basada en XRPL\n\n• Smart Contracts nativos (Hooks)\n• Token nativo: XAH\n• Transacciones tipadas\n• Fees bajos y predecibles\n• Finalidad en 3-5 segundos",
            pt: `Blockchain de camada 1 baseada no XRPL

• Smart Contracts nativos (Hooks)
• Token nativo: XAH
• Transações tipadas
• Fees baixos e previsíveis
• Finalidade em 3-5 segundos`,
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
            es: "El ledger contiene objetos nativos:\n\n• AccountRoot → Cuentas\n• TrustLine → Líneas de confianza\n• Offer → Órdenes de intercambio\n• URIToken → NFTs\n• Hook → Smart contracts\n• HookState → Estado de los Hooks",
            pt: "O ledger contém objetos nativos:\n\n• AccountRoot → Contas\n• TrustLine → Linhas de confiança\n• Offer → Ordens de negociação\n• URIToken → NFTs\n• Hook → Smart contracts\n• HookState → Estado dos Hooks",
            en: "The ledger contains native objects:\n\n• AccountRoot → Accounts\n• TrustLine → Trust lines\n• Offer → Trade orders\n• URIToken → NFTs\n• Hook → Smart contracts\n• HookState → Hook state data",
            jp: "レジャーにはネイティブオブジェクトが含まれる：\n\n• AccountRoot → アカウント\n• TrustLine → トラストライン\n• Offer → 取引注文\n• URIToken → NFT\n• Hook → スマートコントラクト\n• HookState → Hookの状態データ",
            ko: "레저에는 네이티브 객체가 있습니다:\n\n• AccountRoot → 계정\n• TrustLine → 신뢰선\n• Offer → 거래 주문\n• URIToken → NFT\n• Hook → 스마트 컨트랙트\n• HookState → Hook 상태 데이터",
            zh: "账本包含原生对象:\n\n• AccountRoot → 账户\n• TrustLine → 信任线\n• Offer → 交易挂单\n• URIToken → NFT\n• Hook → 智能合约\n• HookState → Hook 状态数据",
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
        es: `A menudo se describe una blockchain como una cadena de bloques. En Xahau la unidad es el **ledger**: una foto completa del estado de la red, que se cierra cada pocos segundos. Esta lección explica qué contiene un ledger y cómo son los objetos que hay en él.

### Una versión del ledger

Cada versión del ledger tiene un **número de secuencia**, uno más que la anterior, y tres partes:

- **La cabecera**: la secuencia, el hash del ledger, el hash del ledger anterior, la hora de cierre y el total de XAH existente. El hash anterior enlaza cada ledger con el previo, así que cambiar un ledger antiguo cambiaría todos los hashes posteriores.
- **Las transacciones** aplicadas en este ledger, cada una con sus metadatos: lo que cambió.
- **El estado**: todos los objetos que existen en ese momento, los haya cambiado este ledger o no.

Una vez validado, un ledger no cambia. El siguiente parte de su estado y aplica transacciones nuevas.

### Objetos tipados

El estado no son datos libres. Cada objeto tiene un tipo, y cada tipo tiene campos fijos:

| Tipo | Qué es | Algunos campos |
|---|---|---|
| \`AccountRoot\` | Una cuenta | \`Balance\`, \`Sequence\`, \`OwnerCount\`, \`Flags\` |
| \`RippleState\` | Una trust line entre dos cuentas, para un token | \`Balance\`, \`LowLimit\`, \`HighLimit\` |
| \`Offer\` | Una orden en el DEX | \`TakerPays\`, \`TakerGets\` |
| \`URIToken\` | Un NFT | \`Owner\`, \`Issuer\`, \`URI\` |
| \`Hook\` | Los Hooks instalados en una cuenta | \`Hooks\` |
| \`HookDefinition\` | El código WebAssembly de un Hook, compartido por todas las cuentas que lo instalan | \`HookHash\`, \`CreateCode\` |
| \`HookState\` | Una entrada clave-valor guardada por un Hook | \`HookStateKey\`, \`HookStateData\` |

Como los tipos son fijos, un nodo puede responder directamente preguntas sobre ellos: todas las trust lines de una cuenta, una oferta por su ID, el estado de un Hook. En una cadena EVM, los mismos datos están en el almacenamiento de cada contrato, con la estructura que eligió su autor, y leerlos exige conocer ese contrato.

### El ejemplo

El ejemplo pide a un nodo de Mainnet el último ledger validado. Salida:

\`\`\`
Ledger Seq: 26104801
Hash: 3B59866DCB52A63DFBC84935280BA5FD724739BF325263C1E43BBABCE47E8AB5
Closed: 2026-Sep-27 05:27:11.000000000 UTC
\`\`\`

\`Ledger Seq\` es el número de secuencia. \`Hash\` identifica este ledger exacto: dos nodos con el mismo hash para la misma secuencia tienen exactamente el mismo estado.`,
        pt: `Uma blockchain costuma ser descrita como uma cadeia de blocos. Na Xahau a unidade é o **ledger**: uma foto completa do estado da rede, fechada a cada poucos segundos. Esta lição explica o que um ledger contém e como são os objetos dentro dele.

### Uma versão do ledger

Cada versão do ledger tem um **número de sequência**, um a mais que a anterior, e três partes:

- **O cabeçalho**: a sequência, o hash do ledger, o hash do ledger anterior, a hora de fechamento e o total de XAH existente. O hash anterior liga cada ledger ao anterior, então mudar um ledger antigo mudaria todos os hashes seguintes.
- **As transações** aplicadas neste ledger, cada uma com os seus metadados: o que ela mudou.
- **O estado**: todos os objetos que existem naquele momento, tenham ou não sido mudados por este ledger.

Depois de validado, um ledger não muda. O seguinte parte do seu estado e aplica novas transações.

### Objetos tipados

O estado não são dados livres. Cada objeto tem um tipo, e cada tipo tem campos fixos:

| Tipo | O que é | Alguns campos |
|---|---|---|
| \`AccountRoot\` | Uma conta | \`Balance\`, \`Sequence\`, \`OwnerCount\`, \`Flags\` |
| \`RippleState\` | Uma trust line entre duas contas, para um token | \`Balance\`, \`LowLimit\`, \`HighLimit\` |
| \`Offer\` | Uma ordem no DEX | \`TakerPays\`, \`TakerGets\` |
| \`URIToken\` | Um NFT | \`Owner\`, \`Issuer\`, \`URI\` |
| \`Hook\` | Os Hooks instalados numa conta | \`Hooks\` |
| \`HookDefinition\` | O código WebAssembly de um Hook, compartilhado por todas as contas que o instalam | \`HookHash\`, \`CreateCode\` |
| \`HookState\` | Uma entrada chave-valor guardada por um Hook | \`HookStateKey\`, \`HookStateData\` |

Como os tipos são fixos, um nó pode responder diretamente a perguntas sobre eles: todas as trust lines de uma conta, uma oferta pelo seu ID, o estado de um Hook. Numa cadeia EVM, os mesmos dados ficam no armazenamento de cada contrato, com a estrutura que o seu autor escolheu, e lê-los exige conhecer esse contrato.

### O exemplo

O exemplo pede a um nó da Mainnet o último ledger validado. Saída:

\`\`\`
Ledger Seq: 26104801
Hash: 3B59866DCB52A63DFBC84935280BA5FD724739BF325263C1E43BBABCE47E8AB5
Closed: 2026-Sep-27 05:27:11.000000000 UTC
\`\`\`

\`Ledger Seq\` é o número de sequência. \`Hash\` identifica exatamente este ledger: dois nós com o mesmo hash para a mesma sequência têm exatamente o mesmo estado.`,
        en: `A blockchain is often described as a chain of blocks. On Xahau the unit is the **ledger**: a complete snapshot of the network's state, closed every few seconds. This lesson explains what a ledger contains and what the objects in it look like.

### A ledger version

Each ledger version has a **sequence number**, one higher than the previous one, and three parts:

- **The header**: the sequence, the ledger's hash, the hash of the previous ledger, the close time and the total XAH in existence. The previous hash links each ledger to the one before, so changing an old ledger would change every hash after it.
- **The transactions** applied in this ledger, each with its metadata: what it changed.
- **The state**: every object that exists at that point, whether or not this ledger changed it.

Once validated, a ledger doesn't change. The next one starts from its state and applies new transactions.

### Typed objects

The state isn't free-form data. Each object has a type, and each type has fixed fields:

| Type | What it is | Some fields |
|---|---|---|
| \`AccountRoot\` | An account | \`Balance\`, \`Sequence\`, \`OwnerCount\`, \`Flags\` |
| \`RippleState\` | A trust line between two accounts, for one token | \`Balance\`, \`LowLimit\`, \`HighLimit\` |
| \`Offer\` | An order on the DEX | \`TakerPays\`, \`TakerGets\` |
| \`URIToken\` | An NFT | \`Owner\`, \`Issuer\`, \`URI\` |
| \`Hook\` | The Hooks installed on an account | \`Hooks\` |
| \`HookDefinition\` | The WebAssembly code of a Hook, shared by every account that installs it | \`HookHash\`, \`CreateCode\` |
| \`HookState\` | One key-value entry stored by a Hook | \`HookStateKey\`, \`HookStateData\` |

Because the types are fixed, a node can answer questions about them directly: all the trust lines of an account, one offer by its ID, the state of a Hook. On an EVM chain, the same data sits in each contract's own storage, in whatever layout its author chose, and reading it means knowing that contract.

### The example

The example asks a Mainnet node for the last validated ledger. Output:

\`\`\`
Ledger Seq: 26104801
Hash: 3B59866DCB52A63DFBC84935280BA5FD724739BF325263C1E43BBABCE47E8AB5
Closed: 2026-Sep-27 05:27:11.000000000 UTC
\`\`\`

\`Ledger Seq\` is the sequence number. \`Hash\` identifies this exact ledger: two nodes with the same hash for the same sequence hold exactly the same state.`,
        jp: `ブロックチェーンはよく「ブロックの鎖」と説明されます。Xahau での単位は**台帳**（ledger）です。ネットワークの状態を丸ごと写したもので、数秒ごとに閉じられます。このレッスンでは、台帳に何が含まれ、その中のオブジェクトがどのようなものかを説明します。

### 台帳のバージョン

台帳の各バージョンには、前のバージョンより1つ大きい**シーケンス番号**があり、3つの部分で構成されます。

- **ヘッダー**：シーケンス、台帳のハッシュ、前の台帳のハッシュ、クローズ時刻、存在する XAH の総量。前のハッシュが各台帳を1つ前の台帳につなぐため、古い台帳を変えるとそれ以降のすべてのハッシュが変わります。
- **この台帳で適用されたトランザクション**：それぞれメタデータ（何を変えたか）付きです。
- **状態**：その時点で存在するすべてのオブジェクトです。この台帳で変更されたかどうかは関係ありません。

検証された台帳は変わりません。次の台帳はその状態から始まり、新しいトランザクションを適用します。

### 型付きオブジェクト

状態は自由な形式のデータではありません。各オブジェクトには型があり、型ごとにフィールドが決まっています。

| 型 | 内容 | 主なフィールド |
|---|---|---|
| \`AccountRoot\` | アカウント | \`Balance\`、\`Sequence\`、\`OwnerCount\`、\`Flags\` |
| \`RippleState\` | 2つのアカウント間の、1つのトークンのトラストライン | \`Balance\`、\`LowLimit\`、\`HighLimit\` |
| \`Offer\` | DEX の注文 | \`TakerPays\`、\`TakerGets\` |
| \`URIToken\` | NFT | \`Owner\`、\`Issuer\`、\`URI\` |
| \`Hook\` | アカウントにインストールされた Hooks | \`Hooks\` |
| \`HookDefinition\` | Hook の WebAssembly コード。インストールしたすべてのアカウントで共有 | \`HookHash\`、\`CreateCode\` |
| \`HookState\` | Hook が保存したキーバリューの1エントリ | \`HookStateKey\`、\`HookStateData\` |

型が決まっているため、ノードはそれらに関する問いに直接答えられます。アカウントのすべてのトラストライン、ID で指定した1つのオファー、Hook の状態などです。EVM チェーンでは、同じデータが各コントラクトのストレージに作者の選んだ形で置かれており、読むにはそのコントラクトを知っている必要があります。

### 例

この例はメインネットのノードに、最後に検証された台帳を問い合わせます。出力です。

\`\`\`
Ledger Seq: 26104801
Hash: 3B59866DCB52A63DFBC84935280BA5FD724739BF325263C1E43BBABCE47E8AB5
Closed: 2026-Sep-27 05:27:11.000000000 UTC
\`\`\`

\`Ledger Seq\` はシーケンス番号です。\`Hash\` はこの台帳そのものを識別します。同じシーケンスで同じハッシュを持つ2つのノードは、まったく同じ状態を持っています。`,
        ko: `블록체인은 흔히 블록의 사슬로 설명됩니다. Xahau에서 단위는 **원장**(ledger)입니다. 네트워크 상태 전체를 담은 스냅숏으로, 몇 초마다 닫힙니다. 이 레슨에서는 원장에 무엇이 들어 있고 그 안의 객체가 어떤 모습인지 설명합니다.

### 원장 버전

원장의 각 버전에는 이전 버전보다 하나 큰 **시퀀스 번호**가 있고, 세 부분으로 이루어집니다.

- **헤더**: 시퀀스, 원장 해시, 이전 원장의 해시, 마감 시각, 존재하는 XAH 총량. 이전 해시가 각 원장을 바로 앞 원장과 연결하므로, 오래된 원장을 바꾸면 그 뒤의 모든 해시가 바뀝니다.
- **이 원장에서 적용된 트랜잭션**: 각각 메타데이터(무엇을 바꿨는지)와 함께 들어 있습니다.
- **상태**: 그 시점에 존재하는 모든 객체입니다. 이 원장에서 바뀌었는지와 상관없습니다.

검증된 원장은 바뀌지 않습니다. 다음 원장은 그 상태에서 시작해 새 트랜잭션을 적용합니다.

### 타입이 있는 객체

상태는 자유로운 형식의 데이터가 아닙니다. 각 객체에는 타입이 있고, 타입마다 필드가 정해져 있습니다.

| 타입 | 내용 | 주요 필드 |
|---|---|---|
| \`AccountRoot\` | 계정 | \`Balance\`, \`Sequence\`, \`OwnerCount\`, \`Flags\` |
| \`RippleState\` | 두 계정 사이의 토큰 하나에 대한 트러스트 라인 | \`Balance\`, \`LowLimit\`, \`HighLimit\` |
| \`Offer\` | DEX 주문 | \`TakerPays\`, \`TakerGets\` |
| \`URIToken\` | NFT | \`Owner\`, \`Issuer\`, \`URI\` |
| \`Hook\` | 계정에 설치된 Hooks | \`Hooks\` |
| \`HookDefinition\` | Hook의 WebAssembly 코드. 설치한 모든 계정이 공유 | \`HookHash\`, \`CreateCode\` |
| \`HookState\` | Hook이 저장한 키-값 항목 하나 | \`HookStateKey\`, \`HookStateData\` |

타입이 정해져 있으므로 노드는 이에 대한 질문에 바로 답할 수 있습니다. 한 계정의 모든 트러스트 라인, ID로 지정한 오퍼 하나, Hook의 상태 등입니다. EVM 체인에서는 같은 데이터가 각 컨트랙트의 저장소에 작성자가 고른 구조로 들어 있어, 읽으려면 그 컨트랙트를 알아야 합니다.

### 예제

이 예제는 메인넷 노드에 마지막으로 검증된 원장을 요청합니다. 출력입니다.

\`\`\`
Ledger Seq: 26104801
Hash: 3B59866DCB52A63DFBC84935280BA5FD724739BF325263C1E43BBABCE47E8AB5
Closed: 2026-Sep-27 05:27:11.000000000 UTC
\`\`\`

\`Ledger Seq\`는 시퀀스 번호입니다. \`Hash\`는 바로 이 원장을 식별합니다. 같은 시퀀스에 같은 해시를 가진 두 노드는 정확히 같은 상태를 가지고 있습니다.`,
        zh: `区块链常被描述为一串区块。在 Xahau 上，基本单位是**账本**（ledger）：网络状态的完整快照，每隔几秒关闭一次。本课说明一个账本包含什么，以及其中的对象是什么样子。

### 一个账本版本

每个账本版本都有一个**序列号**，比上一个版本大一，并由三部分组成：

- **账本头**：序列号、账本哈希、上一个账本的哈希、关闭时间以及现存的 XAH 总量。上一个哈希把每个账本与前一个账本连接起来，所以修改一个旧账本会改变其后所有的哈希。
- **本账本应用的交易**，每笔都带有元数据：它改变了什么。
- **状态**：此刻存在的所有对象，无论本账本是否改变了它们。

账本一经验证就不再改变。下一个账本从它的状态开始，应用新的交易。

### 有类型的对象

状态不是自由格式的数据。每个对象都有类型，每种类型都有固定的字段：

| 类型 | 是什么 | 部分字段 |
|---|---|---|
| \`AccountRoot\` | 一个账户 | \`Balance\`、\`Sequence\`、\`OwnerCount\`、\`Flags\` |
| \`RippleState\` | 两个账户之间某一代币的信任线 | \`Balance\`、\`LowLimit\`、\`HighLimit\` |
| \`Offer\` | DEX 上的一个订单 | \`TakerPays\`、\`TakerGets\` |
| \`URIToken\` | 一个 NFT | \`Owner\`、\`Issuer\`、\`URI\` |
| \`Hook\` | 安装在账户上的 Hooks | \`Hooks\` |
| \`HookDefinition\` | Hook 的 WebAssembly 代码，由所有安装它的账户共享 | \`HookHash\`、\`CreateCode\` |
| \`HookState\` | Hook 保存的一条键值记录 | \`HookStateKey\`、\`HookStateData\` |

由于类型是固定的，节点可以直接回答与之相关的问题：一个账户的所有信任线、按 ID 查询的某个报价、某个 Hook 的状态。在 EVM 链上，同样的数据存放在各个合约自己的存储中，结构由作者决定，读取它们需要了解那个合约。

### 示例

示例向一个主网节点请求最新的已验证账本。输出：

\`\`\`
Ledger Seq: 26104801
Hash: 3B59866DCB52A63DFBC84935280BA5FD724739BF325263C1E43BBABCE47E8AB5
Closed: 2026-Sep-27 05:27:11.000000000 UTC
\`\`\`

\`Ledger Seq\` 是序列号。\`Hash\` 标识的正是这个账本：同一序列号下哈希相同的两个节点，持有完全相同的状态。`,
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
  console.log("Fechado:", ledger.close_time_human);
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
          title: { es: "El ledger", pt: "O ledger", en: "The Ledger", jp: "レジャー", ko: "레저", zh: "账本" },
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
            pt: `Objetos tipados e estruturados:

• AccountRoot → Contas
• RippleState → TrustLines
• Offer → Ordens no DEX
• URIToken → NFTs
• HookDefinition → Código de Hooks
• HookState → Estado de Hooks`,
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
            es: `Cada objeto tiene campos predefinidos:

• AccountRoot → Balance, Sequence, Flags, OwnerCount
• RippleState → Saldo entre dos cuentas para un token
• Offer → Precio, cantidad, par de intercambio
• DirectoryNode → Índice que conecta objetos

Diferencia con EVM:
• Sin storage arbitrario (key-value)
• Campos fijos → consultas más eficientes`,
            pt: `Cada objeto tem campos predefinidos:

• AccountRoot → Saldo, Sequence, Flags, OwnerCount
• RippleState → Saldo entre duas contas para um token
• Offer → Preço, quantidade, par de negociação
• DirectoryNode → Índice que conecta objetos

Diferença com EVM:
• Sem storage arbitrário (key-value)
• Campos fixos → consultas mais eficientes`,
            en: `Each object has predefined fields:

• AccountRoot → Balance, Sequence, Flags, OwnerCount
• RippleState → Balance between two accounts for a token
• Offer → Price, amount, trading pair
• DirectoryNode → Index connecting objects

Difference from EVM:
• No arbitrary storage (key-value)
• Fixed fields → more efficient queries`,
            jp: `各オブジェクトには事前定義されたフィールドがある：

• AccountRoot → 残高、シーケンス、フラグ、OwnerCount
• RippleState → 2つのアカウント間のトークン残高
• Offer → 価格、数量、取引ペア
• DirectoryNode → オブジェクトを接続するインデックス

EVMとの違い：
• 任意ストレージなし（キーバリュー）
• 固定フィールド → より効率的なクエリ`,
            ko: `각 객체는 미리 정의된 필드를 가집니다:

• AccountRoot → 잔액, 시퀀스, 플래그, OwnerCount
• RippleState → 두 계정 간 토큰 잔액
• Offer → 가격, 수량, 거래 쌍
• DirectoryNode → 객체를 연결하는 인덱스

EVM과의 차이:
• 임의 storage 없음 (key-value)
• 고정 필드 → 더 효율적인 조회`,
            zh: `每个对象都有预定义字段:

• AccountRoot → 余额, 序列号, 标志位, OwnerCount
• RippleState → 两账户间某代币余额
• Offer → 价格, 数量, 交易对
• DirectoryNode → 连接对象的索引

与 EVM 的区别:
• 无任意存储 (key-value)
• 固定字段 → 查询更高效`,
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
- **Escassez digital**: só existirão 21 milhões de BTC
Limitação: o Bitcoin é lento (~7 transações por segundo) e sua linguagem de scripting é muito limitada. Ele não foi projetado para executar lógica complexa.
### 2012 — XRP Ledger: velocidade sem mineração
Mais tarde foi criado o **XRP Ledger (ou XRPL)**, a primeira blockchain importante que **não usa Proof of Work**. Em seu lugar, usa um protocolo de consenso baseado em **validadores de confiança (UNL)**.
XRPL introduziu:
- **Consenso sem mineração**: Transações confirmadas em 3-5 segundos
- **DEX nativo**: Interalteração descentralizado integrado no protocolo
- **Tokens nativos**: criar tokens sem necessidade de smart contracts
- **Fees mínimas**: frações de centavo por transação
Limitação: o XRPL não tinha capacidade de executar smart contracts (lógica programável personalizada).
### 2015 — Ethereum: o computador mundial
**Vitalik Buterin** publicou o whitepaper do Ethereum com uma ideia ambiciosa: uma blockchain que pudesse executar **qualquer programa**. Assim nasceu a **Ethereum Virtual Machine (EVM)**.
Ethereum introduziu:
- **Smart contracts**: programas que vivem na blockchain e são executados automaticamente
- **Solidity**: linguagem de programação para escrever contratos
- **EVM**: Máquina virtual que executa o código dos contratos
- **ERC-20 / ERC-721**: padrões para tokens fungíveis e NFTs
- **DeFi**: finanças descentralizadas (empréstimos, exchanges, stablecoins)
Limitação: gas caro e variável, baixa velocidade (~15 TPS), escalabilidade limitada.
### 2020+ — Explosão de L1s e L2s
Os problemas do Ethereum impulsionaram uma onda de novas blockchains:
- **Solana** (2020): Alta velocidade (~65,000 TPS teóricos) com Proof of History
- **Avalanche** (2020): sub-redes personalizáveis com consenso rápido
- **Polygon** (2020): solução Layer 2 para escalar o Ethereum
- **Arbitrum / Optimism** (2021): Rollups que procesan transações fora de Ethereum
- **Cosmos / Polkadot**: Ecosistemas de blockchains interconectadas
A maioria dessas redes é **compatível com EVM** e usa Solidity e ferramentas do Ethereum.
### 2023 — Xahau: XRPL + Smart Contracts
A **Xahau** nasce como um **fork do XRP Ledger** que acrescenta a capacidade de que o XRPL sempre precisou: **smart contracts**, chamados **Hooks**. Inicialmente a Xahau não existiria: os Hooks fariam parte do XRP Ledger, mas a Ripple não quis aceitar essa melhoria da comunidade. Para não desperdiçar anos de trabalho, nasceu a Xahau.
Xahau introduziu:
- **Hooks**: Smart contracts escritos em C e compilados a WebAssembly
- **XAH**: Token nativo com sistema de emissões/recompensas
- **Herencia de XRPL**: Conserva a velocidade, o DEX nativo e os fees baixos
- **Sem EVM**: arquitetura própria, não compatível com Solidity
### Por que Xahau é um fork de XRPL?
Por ser um fork do XRPL, a Xahau aproveita todas as vantagens de uma blockchain testada e otimizada para pagamentos e tokens, e acrescenta a peça que faltava: a capacidade de executar lógica programável diretamente no protocolo.
1. **Base testada**: o XRPL funciona desde 2012 sem interrupções graves
2. **Velocidade nativa**: o consenso do XRPL já oferece 3-5 segundos de finalidade
3. **DEX integrado**: não é preciso construir uma exchange descentralizada do zero
4. **Tokens nativos**: o sistema de TrustLines e tokens já existe e funciona
5. **Comunidade existente**: desenvolvedores e ferramentas do XRPL podem se adaptar
### Línea temporal resumida
| Ano | Marco | Inovação-chave |
|---|---|---|
| 2008 | Bitcoin | Dinero digital descentralizado |
| 2012 | XRP Ledger | Consenso sem mineração, DEX nativo |
| 2015 | Ethereum | Smart contracts (EVM + Solidity) |
| 2017 | Boom das ICOs | Tokens ERC-20, financiamento descentralizado |
| 2020 | DeFi Summer | Finanças descentralizadas no Ethereum |
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
            pt: `2008 — Bitcoin
• Primer dinheiro digital descentralizado
• Proof of Work, lento, mas revolucionário

2012 — XRP Ledger
• Sem mineração, consenso em 3-5 segundos
• DEX nativo e tokens integrados

2015 — Ethereum
• Smart contracts com Solidity
• A EVM como computador mundial`,
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
            pt: `Os problemas de Ethereum impulsan novas redes:

• Solana → Alta velocidade
• Avalanche → Sub-redes personalizáveis
• Polygon → Layer 2 para Ethereum
• Arbitrum/Optimism → Rollups

A maioria são compatíveis com EVM (Solidity)`,
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
            pt: `Fork de XRPL + Smart Contracts (Hooks)

Por que um fork de XRPL?
• Base probadà partir de 2012
• Velocidade nativa (3-5 seg)
• DEX e tokens integrados
• Apenas faltaban smart contracts

Hooks = C compilado a WebAssembly
Sem EVM, sem Solidity`,
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
            pt: `2008 → Bitcoin (PoW, dinheiro digital)
2012 → XRPL (sem mineração, DEX)
2015 → Ethereum (EVM, Solidity)
2017 → Boom de ICOs e tokens
2020 → DeFi + novas L1s/L2s
2023 → Xahau (XRPL + Hooks)

Cada geração resolveu limitações da anterior`,
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

Para obtener XAH de testnet, usa el **faucet** (grifo): una herramienta que te envía tokens gratuitos a tu cuenta de prueba. Cómo usarlo, paso a paso: [módulo 3](?m=3&l=1).`,
        pt: `Xahau não é apenas uma blockchain, é um **ecossistema completo** com ferramentas, wallets, exploradores e uma comunidade ativa. Nesta lição você conhecerá as peças fundamentais do ecossistema para saber onde buscar informações e como interagir com a rede.
### XAH: o token nativo
**XAH** é a criptomoeda nativa de Xahau. Diferentemente de XRP no XRPL, XAH tem um sistema de **emissão inflacionária**: os titulares de contas ativas podem solicitar recompensas periódicas em XAH. Isso incentiva a participação na rede e o uso de rede.
Características de XAH:
- É usada para pagar **fees** (taxas de transação)
- É necessário uma **reserva mínima** para manter uma conta ativa
- O sistema de **emissões** distribui XAH a contas ativas que solicitarem
- Se pode enviar, negociar e usar em Hooks
### Xaman (antes XUMM): a wallet principal
A **Xaman** (antes conhecida como XUMM) é a wallet mais usada no ecossistema XRPL/Xahau. É um aplicativo móvel que permite:
- Criar e gerenciar contas na Xahau e no XRPL
- Enviar e receber XAH e tokens
- Assinar transações de forma segura
- Interagir com aplicações descentralizadas (xApps)
- Disponível para **iOS** e **Android**
Download: [xaman.app](https://xaman.app)
### Hooks Builder: IDE online para smart contracts
O **Hooks Builder** é um ambiente de desenvolvimento integrado (IDE) que funciona no navegador e permite escrever, compilar e fazer deploy de Hooks na Xahau Testnet sem instalar nada no seu computador.
Características:
- Editor de código com destaque de sintaxe para C
- Compilador de C a WebAssembly integrado
- Despliegue direto à testnet de Xahau
- Exemplos e modelos para começar rápido
URL: [builder.xahau.network/](https://builder.xahau.network/)
### Exploradores de blocos
Os **exploradores** permitem ver de forma visual tudo o que acontece na blockchain:
- Buscar transações por hash
- Ver o estado de qualquer conta (balance, tokens, hooks)
- Explorar ledgers e seu conteúdo
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
- **Documentação oficial**: [xahau.network/docs/](https://xahau.network/docs/) Guias, referência da API e tutoriais
- **GitHub**: [https://github.com/xahau](https://github.com/xahau) Código fonte do nó, bibliotecas e ferramentas
- **Discord**: [https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj) Comunidade ativa onde fazer perguntas e compartilhar projetos
- **X**: [https://x.com/XahauNetwork](https://x.com/XahauNetwork) Conta oficial da blockchain Xahau para notícias e atualizações
- **Biblioteca xahau js**: [https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau) A biblioteca JavaScript que usamos em este curso para interagir com a rede
### Testnet vs Mainnet
Xahau tem dos redes principais:
| Característica | Testnet | Mainnet |
|---|---|---|
| URL WebSocket | wss://xahau-test.net | wss://xahau.network |
| Token | XAH (sem valor real) | XAH (com valor real) |
| Propósito | Desenvolvimento e testes | Produção |
| Faucet | Sim (XAH grátis para testar) | Não |
| Dados | Podem ser reiniciados periodicamente | Permanentes |
**Para este curso usaremos sempre a testnet.** Os tokens de testnet não têm valor real, então você pode experimentar livremente sem risco de perder dinheiro.
Para obter XAH de testnet, use o **faucet** (torneira): uma ferramenta que envia tokens gratuitos para a sua conta de teste. Como usá-lo, passo a passo: [módulo 3](?m=3&l=1).`,
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

To obtain testnet XAH, use the **faucet**: a tool that sends free tokens to your test account. How to use it, step by step: [Module 3](?m=3&l=1).`,
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

Testnet XAHを取得するには、**faucet**（テストアカウントにテスト用トークンを送るツール）を使用します。使い方は[モジュール3](?m=3&l=1)で順を追って説明します。`,
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

테스트용 XAH가 필요하면 **faucet**을 사용하세요. 사용 방법은 [모듈 3](?m=3&l=1)에서 단계별로 다룹니다.`,
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

要获取测试网 XAH，请使用**水龙头（faucet）**：一个向你的测试账户发送免费代币的工具。具体用法见[模块3](?m=3&l=1)。`,
      },
      codeBlocks: [
      ],
      slides: [
        {
          title: { es: "XAH y el sistema de emisiones", pt: "XAH e ou sistema de emissões", en: "XAH and the Emission System", jp: "XAHとエミッションシステム", ko: "XAH와 발행 시스템", zh: "XAH 与发行系统" },
          content: {
            es: "XAH = Token nativo de Xahau\n\n• Pagar fees (comisiones)\n• Reserva mínima para cuentas\n• Sistema de emisión inflaccionario\n  → Los usuarios que lo soliciten, reciben XAH periódicamente",
            pt: `XAH = Token nativo da Xahau

• Pagar fees (taxas)
• Reserva mínima para contas
• Sistema de emissão inflacionária
  → Os usuários que solicitarem recebem XAH periodicamente`,
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

**الإجماع** هو الطريقة التي تتفق بها العقد على أي معاملات صحيحة وأي حالة ledger هي الحالة المعتمدة. تفاصيل ذلك في [الوحدة 2](?m=2&l=1).

**التشفير** يستخدم في hashes، والتوقيعات الرقمية، وأزواج المفاتيح العامة والخاصة. بهذه الأدوات يمكن إثبات أن صاحب الحساب هو من وافق على المعاملة.

**المعاملات** هي العمليات التي تغير حالة البلوكتشين: إرسال tokens، إنشاء أصل، تسجيل بيانات، أو تشغيل منطق برمجي.

### البلوكتشين مقابل قاعدة بيانات تقليدية

في قاعدة البيانات التقليدية تثق غالبا في شركة أو خادم مركزي. في البلوكتشين تثق في التشفير، والإجماع، وتكرار البيانات عبر الشبكة. هذا يجعلها مناسبة للأنظمة التي تحتاج إلى سجل مشترك يمكن التحقق منه دون وسيط.

### ما استخداماتها؟

تستخدم البلوكتشين في العملات الرقمية، tokens، NFTs، smart contracts، تتبع سلاسل الإمداد، الشهادات، التصويت، وأنظمة الدفع المفتوحة.

في هذه الدورة سنركز على **Xahau**: بلوكتشين عامة مصممة للمدفوعات السريعة، tokens، و smart contracts فعالة.`,
      codeTitles: [],
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
      theory: `تتبع معظم منصات العقود الذكية نموذج Ethereum: آلة افتراضية، هي **EVM**، تنفّذ شيفرة العقد في كل معاملة تستدعيه. أما Xahau فتعمل بطريقة مختلفة. يشرح هذا الدرس الفرق، لأنه يحدد شكل كل ما تبنيه في هذه الدورة.

### كيف تعمل سلسلة EVM

في Ethereum، العقد حساب له شيفرة ومساحة تخزين خاصة به، أي مساحة مفتاح-قيمة حرة. تستدعي المعاملة دالة من تلك الشيفرة، وتنفّذها الـ EVM تعليمة تلو الأخرى. لكل تعليمة كلفة من **الـ gas**، لذا تعتمد الرسوم على مقدار الشيفرة المنفَّذة، والـ token أو منصة التداول أو الـ NFT كلها شيفرة عقود كتبها أحدهم.

### كيف تعمل Xahau

في Xahau، العمليات الشائعة جزء من البروتوكول نفسه. لكل منها نوع معاملة: \`Payment\`، و\`TrustSet\` للـ tokens، و\`OfferCreate\` لمنصة التداول، و\`URITokenMint\` للـ NFTs. تعرف الشبكة ما يفعله كل نوع وما حقوله، وتخزّن النتيجة على شكل **كائنات ledger محددة النوع**: الحساب هو \`AccountRoot\` له رصيد، وخط الثقة هو \`RippleState\`.

يأتي المنطق المخصص من **الـ Hooks**: برامج صغيرة تُكتب بلغة C وتُترجم إلى WebAssembly وتُثبَّت على حساب. لا ينتظر الـ Hook أن يُستدعى مثل دالة في عقد. بل يعمل عندما تمس معاملة حسابه، ويمكنه قبولها أو رفضها أو إصدار معاملات جديدة.

| | سلسلة EVM | Xahau |
|---|---|---|
| العمليات الشائعة | شيفرة عقود (tokens، منصات تداول، NFTs) | أنواع معاملات مدمجة |
| المنطق المخصص | عقود Solidity تنفّذها الـ EVM | Hooks بلغة C تعمل كـ WebAssembly |
| متى يعمل المنطق | عندما تستدعي معاملة العقد | عندما تمس معاملة حساب الـ Hook |
| الحالة | تخزين حر للعقد | كائنات محددة النوع، وحالة مفتاح-قيمة للـ Hooks |
| الرسوم | الـ gas المستهلك × سعر الـ gas | معروفة قبل الإرسال: الرسوم الأساسية والـ Hooks التي تُطلقها |

ترث Xahau هذا التصميم من **XRP Ledger** وتضيف إليه الـ Hooks. عملتها الأصلية هي **XAH**، ويُغلق الـ ledger كل بضع ثوانٍ.

### المثال

يتصل المثال بعقدة على Mainnet ويطبع ما تعلنه عن نفسها. المخرجات:

\`\`\`
Network: 21337
Version: 2026.6.21-release+3350
Current ledger: 26104801
\`\`\`

الرقم \`21337\` هو معرّف شبكة Xahau Mainnet، ومعرّف testnet هو \`21338\`. تحمل كل معاملة هذا المعرّف، لذا لا يمكن تطبيق معاملة موقَّعة لشبكة على الشبكة الأخرى.`,
      codeTitles: [
        "الاتصال بعقدة Xahau وعرض معلومات الخادم",
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
      theory: `كثيرًا ما تُوصف البلوكشين بأنها سلسلة من الكتل. في Xahau الوحدة هي **الـ ledger**: لقطة كاملة لحالة الشبكة، تُغلق كل بضع ثوانٍ. يشرح هذا الدرس ما يحتويه الـ ledger وشكل الكائنات الموجودة فيه.

### نسخة من الـ ledger

لكل نسخة من الـ ledger **رقم تسلسلي** يزيد بواحد على النسخة السابقة، وتتكون من ثلاثة أجزاء:

- **الترويسة**: الرقم التسلسلي، وهاش الـ ledger، وهاش الـ ledger السابق، ووقت الإغلاق، وإجمالي XAH الموجود. يربط الهاش السابق كل ledger بالذي قبله، لذا فإن تغيير ledger قديم يغيّر كل الهاشات التي تليه.
- **المعاملات** المطبّقة في هذا الـ ledger، ولكل منها بياناتها الوصفية: ما الذي غيّرته.
- **الحالة**: كل الكائنات الموجودة في تلك اللحظة، سواء غيّرها هذا الـ ledger أم لا.

بعد اعتماد الـ ledger لا يتغير. يبدأ التالي من حالته ويطبّق معاملات جديدة.

### كائنات محددة النوع

الحالة ليست بيانات حرة. لكل كائن نوع، ولكل نوع حقول ثابتة:

| النوع | ما هو | بعض الحقول |
|---|---|---|
| \`AccountRoot\` | حساب | \`Balance\`، \`Sequence\`، \`OwnerCount\`، \`Flags\` |
| \`RippleState\` | خط ثقة بين حسابين لـ token واحد | \`Balance\`، \`LowLimit\`، \`HighLimit\` |
| \`Offer\` | أمر على الـ DEX | \`TakerPays\`، \`TakerGets\` |
| \`URIToken\` | NFT | \`Owner\`، \`Issuer\`، \`URI\` |
| \`Hook\` | الـ Hooks المثبتة على حساب | \`Hooks\` |
| \`HookDefinition\` | شيفرة WebAssembly لـ Hook، تتشاركها كل الحسابات التي تثبّته | \`HookHash\`، \`CreateCode\` |
| \`HookState\` | مُدخل مفتاح-قيمة واحد يخزّنه Hook | \`HookStateKey\`، \`HookStateData\` |

لأن الأنواع ثابتة، تستطيع العقدة الإجابة مباشرة عن أسئلة تخصها: كل خطوط الثقة لحساب، أو عرض واحد بمعرّفه، أو حالة Hook. في سلسلة EVM توجد البيانات نفسها في تخزين كل عقد، بالبنية التي اختارها كاتبه، وقراءتها تتطلب معرفة ذلك العقد.

### المثال

يطلب المثال من عقدة على Mainnet آخر ledger معتمد. المخرجات:

\`\`\`
Ledger Seq: 26104801
Hash: 3B59866DCB52A63DFBC84935280BA5FD724739BF325263C1E43BBABCE47E8AB5
Closed: 2026-Sep-27 05:27:11.000000000 UTC
\`\`\`

\`Ledger Seq\` هو الرقم التسلسلي. ويعرّف \`Hash\` هذا الـ ledger بعينه: عقدتان لهما الهاش نفسه للرقم التسلسلي نفسه تحملان الحالة نفسها تمامًا.`,
      codeTitles: [
        "استعلام معلومات الـ ledger الحالي",
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

للحصول على XAH في testnet، استخدم **faucet** (الحنفية): أداة ترسل tokens مجانية إلى حسابك التجريبي. طريقة استخدامه خطوة بخطوة في [الوحدة 3](?m=3&l=1).`,
      codeTitles: [],
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
Les noeuds ont besoin d'un mécanisme pour se mettre d'accord sur les transactions valides. On appelle cela un **protocole de consensus** (détaillé dans le [module 2](?m=2&l=1)).

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
      theory: `La plupart des plateformes de smart contracts suivent Ethereum : une machine virtuelle, l'**EVM**, exécute le code du contrat à chaque transaction qui l'appelle. Xahau fonctionne autrement. Cette leçon explique la différence, car elle conditionne tout ce que tu construis dans ce cours.

### Comment fonctionne une chaîne EVM

Sur Ethereum, un contrat est un compte avec du code et son propre stockage, un espace clé-valeur libre. Une transaction appelle une fonction de ce code, et l'EVM l'exécute instruction par instruction. Chaque instruction coûte du **gas** : les frais dépendent donc de la quantité de code exécutée, et un token, un exchange ou un NFT est du code de contrat que quelqu'un a écrit.

### Comment fonctionne Xahau

Sur Xahau, les opérations courantes font partie du protocole lui-même. Il existe un type de transaction pour chacune : \`Payment\`, \`TrustSet\` pour les tokens, \`OfferCreate\` pour l'exchange, \`URITokenMint\` pour les NFT. Le réseau sait ce que fait chaque type et quels champs il possède, et il enregistre le résultat sous forme d'**objets typés du ledger** : un compte est un \`AccountRoot\` avec un solde, une trust line est un \`RippleState\`.

La logique personnalisée vient des **Hooks** : de petits programmes écrits en C, compilés en WebAssembly et installés sur un compte. Un Hook n'attend pas d'être appelé comme une fonction de contrat. Il s'exécute quand une transaction touche son compte, et il peut l'accepter, la rejeter ou émettre de nouvelles transactions.

| | Chaîne EVM | Xahau |
|---|---|---|
| Opérations courantes | Code de contrats (tokens, exchanges, NFT) | Types de transaction intégrés |
| Logique personnalisée | Contrats en Solidity, exécutés par l'EVM | Hooks en C, exécutés en WebAssembly |
| Quand elle s'exécute | Quand une transaction appelle le contrat | Quand une transaction touche le compte du Hook |
| État | Stockage libre du contrat | Objets typés, plus l'état clé-valeur des Hooks |
| Frais | Gas utilisé × prix du gas | Connus avant l'envoi : frais de base, plus les Hooks déclenchés |

Xahau hérite cette conception du **XRP Ledger** et y ajoute les Hooks. Sa monnaie native est le **XAH**, et un ledger se ferme toutes les quelques secondes.

### L'exemple

L'exemple se connecte à un nœud du Mainnet et affiche ce qu'il indique sur lui-même. Sortie :

\`\`\`
Network: 21337
Version: 2026.6.21-release+3350
Current ledger: 26104801
\`\`\`

\`21337\` est l'ID réseau du Mainnet de Xahau ; celui du testnet est \`21338\`. Chaque transaction porte cet ID : une transaction signée pour un réseau ne peut donc pas être appliquée sur l'autre.`,
      codeTitles: ["Se connecter à un noeud Xahau et afficher server_info"],
      slides: [
        ["EVM vs non-EVM", "EVM : smart contracts Solidity exécutés dans une VM commune\n\nNon-EVM : modèle propre au protocole\n\nXahau utilise des transactions natives, des objets de ledger et des Hooks."],
        ["Qu'est-ce que Xahau ?", "Xahau est une blockchain compatible avec l'écosystème XRPL, orientée paiements, actifs et logique on-chain via Hooks."],
        ["Architecture du ledger", "Le ledger contient des comptes et des objets structurés\n\nLes transactions modifient ces objets selon des règles natives du protocole."],
      ],
    },
    m1l2: {
      title: "Structure du ledger dans Xahau",
      theory: `On décrit souvent une blockchain comme une chaîne de blocs. Sur Xahau, l'unité est le **ledger** : un instantané complet de l'état du réseau, clôturé toutes les quelques secondes. Cette leçon explique ce que contient un ledger et à quoi ressemblent les objets qu'il renferme.

### Une version du ledger

Chaque version du ledger a un **numéro de séquence**, supérieur d'un à la précédente, et trois parties :

- **L'en-tête** : la séquence, le hash du ledger, le hash du ledger précédent, l'heure de clôture et le total de XAH existant. Le hash précédent relie chaque ledger au précédent : modifier un ancien ledger changerait tous les hashes suivants.
- **Les transactions** appliquées dans ce ledger, chacune avec ses métadonnées : ce qu'elle a modifié.
- **L'état** : tous les objets qui existent à ce moment-là, que ce ledger les ait modifiés ou non.

Une fois validé, un ledger ne change plus. Le suivant part de son état et applique de nouvelles transactions.

### Des objets typés

L'état n'est pas un ensemble de données libres. Chaque objet a un type, et chaque type a des champs fixes :

| Type | Ce que c'est | Quelques champs |
|---|---|---|
| \`AccountRoot\` | Un compte | \`Balance\`, \`Sequence\`, \`OwnerCount\`, \`Flags\` |
| \`RippleState\` | Une trust line entre deux comptes, pour un token | \`Balance\`, \`LowLimit\`, \`HighLimit\` |
| \`Offer\` | Un ordre sur le DEX | \`TakerPays\`, \`TakerGets\` |
| \`URIToken\` | Un NFT | \`Owner\`, \`Issuer\`, \`URI\` |
| \`Hook\` | Les Hooks installés sur un compte | \`Hooks\` |
| \`HookDefinition\` | Le code WebAssembly d'un Hook, partagé par tous les comptes qui l'installent | \`HookHash\`, \`CreateCode\` |
| \`HookState\` | Une entrée clé-valeur enregistrée par un Hook | \`HookStateKey\`, \`HookStateData\` |

Comme les types sont fixes, un nœud peut répondre directement aux questions qui les concernent : toutes les trust lines d'un compte, une offre par son ID, l'état d'un Hook. Sur une chaîne EVM, les mêmes données se trouvent dans le stockage de chaque contrat, organisées comme son auteur l'a choisi, et les lire exige de connaître ce contrat.

### L'exemple

L'exemple demande à un nœud du Mainnet le dernier ledger validé. Sortie :

\`\`\`
Ledger Seq: 26104801
Hash: 3B59866DCB52A63DFBC84935280BA5FD724739BF325263C1E43BBABCE47E8AB5
Closed: 2026-Sep-27 05:27:11.000000000 UTC
\`\`\`

\`Ledger Seq\` est le numéro de séquence. \`Hash\` identifie ce ledger précis : deux nœuds avec le même hash pour la même séquence détiennent exactement le même état.`,
      codeTitles: ["Consulter les informations du ledger courant"],
      slides: [
        ["Le ledger", "Le ledger est une photo validée de l'état du réseau\n\n• Comptes\n• Soldes\n• Objets\n• Paramètres\n• Historique de modifications"],
        ["Objets de ledger", "Exemples :\n\nAccountRoot\nTrustLine\nOffer\nEscrow\nCheck\nHook\n\nChaque type a ses champs et ses règles."],
        ["Détails d'un objet", `Chaque objet possède des champs prédéfinis :

• AccountRoot → Solde, Sequence, Flags, OwnerCount
• RippleState → Solde entre deux comptes pour un token
• Offer → Prix, quantité, paire d'échange
• DirectoryNode → Index reliant les objets

Différence avec l'EVM :
• Pas de stockage arbitraire (clé-valeur)
• Champs fixes → requêtes plus efficaces`],
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

Pour obtenir des XAH de testnet, utilise le **faucet** (robinet) : un outil qui envoie des tokens gratuits à ton compte de test. Son utilisation, pas à pas : [module 3](?m=3&l=1).`,
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

addNewWords(moduleData, 1);
export default moduleData;
