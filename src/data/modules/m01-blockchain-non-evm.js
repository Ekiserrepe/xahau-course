export default {
  id: "m1",
  icon: "🧱",
  title: {
    es: "Arquitectura básica de una blockchain No-EVM",
    en: "Basic Architecture of a Non-EVM Blockchain",
    jp: "Non-EVMブロックチェーンの基本アーキテクチャ",
  },
  lessons: [
    {
      id: "m1l0",
      title: {
        es: "¿Qué es una blockchain?",
        en: "What is a Blockchain?",
        jp: "ブロックチェーンとは？",
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
1. **トランザクション**のセット（例：「アリスがボブに10トークンを送る」）
2. ブロックの**ハッシュ**（ユニークなデジタル指紋）
3. **前のブロックのハッシュ**、これによってチェーンが形成される

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
ブロックチェーンの状態を変更する操作です：トークンの送信、コントラクトの作成、データの記録など。各トランザクションは送信者によって**デジタル署名**されています。

### ブロックチェーン vs 従来のデータベース

| 特徴 | 従来のデータベース | ブロックチェーン |
|---|---|---|
| 管理 | 企業（中央集権） | ノードのネットワーク（分散型） |
| 変更 | アクセス権を持つ誰でも編集可能 | 検証後は不変 |
| 信頼 | 企業を信頼する | 暗号技術とコンセンサスを信頼する |
| 透明性 | デフォルトで非公開 | 公開かつ検証可能 |
| 仲介者 | 必要（銀行、サーバー） | 不要（ピアツーピア） |

### 何に使われるのか？

ブロックチェーンは以下に使用されます：
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
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "¿Qué es una blockchain?", en: "What is a Blockchain?", jp: "ブロックチェーンとは？" },
          content: {
            es: "Un libro de registros digital:\n\n• Distribuido → Copiado en miles de nodos\n• Inmutable → No se puede alterar\n• Transparente → Cualquiera puede verificar\n• Descentralizado → Sin intermediarios",
            en: "A digital ledger:\n\n• Distributed → Copied across thousands of nodes\n• Immutable → Cannot be altered\n• Transparent → Anyone can verify\n• Decentralized → No intermediaries",
            jp: "デジタル台帳：\n\n• 分散型 → 何千ものノードにコピー\n• 不変性 → 改ざん不可能\n• 透明性 → 誰でも検証可能\n• 分散化 → 仲介者不要",
          },
          visual: "📒",
        },
        {
          title: { es: "Cadena de bloques", en: "Chain of Blocks", jp: "ブロックの連鎖" },
          content: {
            es: "Bloque 1 → Bloque 2 → Bloque 3 → ...\n\nCada bloque contiene:\n• Transacciones\n• Hash propio (huella digital)\n• Hash del bloque anterior\n\nCambiar un bloque rompe toda la cadena",
            en: "Block 1 → Block 2 → Block 3 → ...\n\nEach block contains:\n• Transactions\n• Its own hash (digital fingerprint)\n• Hash of the previous block\n\nChanging a block breaks the entire chain",
            jp: "ブロック1 → ブロック2 → ブロック3 → ...\n\n各ブロックには：\n• トランザクション\n• 固有のハッシュ（デジタル指紋）\n• 前のブロックのハッシュ\n\nブロックを変更するとチェーン全体が壊れる",
          },
          visual: "🔗",
        },
        {
          title: { es: "Conceptos clave", en: "Key Concepts", jp: "主要概念" },
          content: {
            es: "🔐 Criptografía → Hashes y firmas digitales\n🤝 Consenso → Nodos se ponen de acuerdo\n🔑 Claves → Tu identidad en la red\n📝 Transacciones → Operaciones firmadas",
            en: "🔐 Cryptography → Hashes and digital signatures\n🤝 Consensus → Nodes agree with each other\n🔑 Keys → Your identity on the network\n📝 Transactions → Signed operations",
            jp: "🔐 暗号技術 → ハッシュとデジタル署名\n🤝 コンセンサス → ノードが合意する\n🔑 鍵 → ネットワーク上のアイデンティティ\n📝 トランザクション → 署名された操作",
          },
          visual: "🧩",
        },
        {
          title: { es: "¿Para qué sirve?", en: "What Is It Used For?", jp: "何に使われるのか？" },
          content: {
            es: "• 💰 Criptomonedas (pagos sin bancos)\n• 🪙 Tokens (activos digitales)\n• 🎨 NFTs (objetos únicos)\n• 🪝 Smart contracts (lógica programable)\n• 📦 Trazabilidad (registros verificables)",
            en: "• 💰 Cryptocurrencies (payments without banks)\n• 🪙 Tokens (digital assets)\n• 🎨 NFTs (unique objects)\n• 🪝 Smart contracts (programmable logic)\n• 📦 Traceability (verifiable records)",
            jp: "• 💰 暗号通貨（銀行なしの支払い）\n• 🪙 トークン（デジタル資産）\n• 🎨 NFT（ユニークなオブジェクト）\n• 🪝 スマートコントラクト（プログラマブルなロジック）\n• 📦 トレーサビリティ（検証可能な記録）",
          },
          visual: "🌐",
        },
      ],
    },
    {
      id: "m1l1",
      title: {
        es: "¿Qué es una blockchain No-EVM?",
        en: "What is a Non-EVM Blockchain?",
        jp: "Non-EVMブロックチェーンとは？",
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

**Xahau**のようなNon-EVMブロックチェーンは、特定のユースケースのためにゼロから設計されました：高速な支払い、トークン化、効率的なプログラマブルロジック。Ethereumのような「汎用コンピュータ」を目指すのではなく、**パフォーマンス、低コスト、高速な最終性**に最適化しています。

### Xahau：Non-EVMブロックチェーン

**Xahau**は**XRP Ledger（XRPL）**のアーキテクチャを継承し、**Hooks**（Cで書かれWebAssemblyにコンパイルされた軽量スマートコントラクト）を実行する能力を追加したレイヤー1ブロックチェーンです。

EVMネットワークとは異なり、Xahauでは：
- トランザクションは**ネイティブかつ型付き**（Payment、TrustSet、OfferCreateなど）
- レジャーは**構造化されたオブジェクト**を維持し、任意の状態ではない
- スマートコントラクト（Hooks）はトランザクションに対する**リアクティブフィルタ**として実行される
- ネイティブトークンは**XAH**`,
      },
      codeBlocks: [
        {
          title: {
            es: "Conectar a un nodo Xahau y ver info del servidor",
            en: "Connect to a Xahau node and view server info",
            jp: "Xahauノードに接続してサーバー情報を表示する",
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
          },
        },
      ],
      slides: [
        {
          title: { es: "EVM vs No-EVM", en: "EVM vs Non-EVM", jp: "EVM vs Non-EVM" },
          content: {
            es: "EVM (Ethereum)\n• Solidity → Bytecode EVM\n• Gas variable\n• Estado arbitrario\n\nNo-EVM (Xahau)\n• C → WebAssembly\n• Fees fijos\n• Objetos tipados del ledger",
            en: "EVM (Ethereum)\n• Solidity → EVM Bytecode\n• Variable gas\n• Arbitrary state\n\nNon-EVM (Xahau)\n• C → WebAssembly\n• Fixed fees\n• Typed ledger objects",
            jp: "EVM（Ethereum）\n• Solidity → EVMバイトコード\n• 変動ガス\n• 任意の状態\n\nNon-EVM（Xahau）\n• C → WebAssembly\n• 固定手数料\n• 型付きレジャーオブジェクト",
          },
          visual: "⚖️",
        },
        {
          title: { es: "¿Qué es Xahau?", en: "What is Xahau?", jp: "Xahauとは？" },
          content: {
            es: "Blockchain de capa 1 basada en XRPL\n\n• Smart Contracts nativos (Hooks)\n• Token nativo: XAH\n• Transacciones tipadas\n• Fees bajos y predecibles\n• Finalidad en 3-5 segundos",
            en: "Layer 1 blockchain based on XRPL\n\n• Native Smart Contracts (Hooks)\n• Native token: XAH\n• Typed transactions\n• Low and predictable fees\n• Finality in 3-5 seconds",
            jp: "XRPLベースのレイヤー1ブロックチェーン\n\n• ネイティブスマートコントラクト（Hooks）\n• ネイティブトークン：XAH\n• 型付きトランザクション\n• 低く予測可能な手数料\n• 3〜5秒での最終確定",
          },
          visual: "🧱",
        },
        {
          title: { es: "Arquitectura del Ledger", en: "Ledger Architecture", jp: "レジャーアーキテクチャ" },
          content: {
            es: "El ledger de Xahau contiene objetos nativos:\n\n• AccountRoot → Cuentas\n• TrustLine → Líneas de confianza\n• Offer → Órdenes de intercambio\n• URIToken → NFTs\n• Hook → Smart contracts\n• HookState → Estado de los Hooks",
            en: "The Xahau ledger contains native objects:\n\n• AccountRoot → Accounts\n• TrustLine → Trust lines\n• Offer → Trade orders\n• URIToken → NFTs\n• Hook → Smart contracts\n• HookState → Hook state data",
            jp: "Xahauレジャーにはネイティブオブジェクトが含まれる：\n\n• AccountRoot → アカウント\n• TrustLine → トラストライン\n• Offer → 取引注文\n• URIToken → NFT\n• Hook → スマートコントラクト\n• HookState → Hookの状態データ",
          },
          visual: "📦",
        },
      ],
    },
    {
      id: "m1l2",
      title: {
        es: "Estructura del ledger en Xahau",
        en: "Ledger Structure in Xahau",
        jp: "Xahauのレジャー構造",
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
- **Offer**：ネイティブDEXでの売買注文
- **URIToken**：関連するURIを持つ非代替可能トークン
- **HookDefinition**：デプロイされたHookのWASMコード
- **HookState**：Hookによって格納された永続的なデータ

### EVMとの主要な違い

Ethereumでは、状態は各アカウントが独自の**ストレージ**（任意のキーバリュー）を持つ**アカウントツリー**です。Xahauでは、状態は事前定義されたフィールドを持つ**型付きオブジェクト**です。これはより制限的ですが、はるかに効率的でクエリが容易です。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar información del ledger actual",
            en: "Query current ledger information",
            jp: "現在のレジャー情報を照会する",
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
          },
        },
      ],
      slides: [
        {
          title: { es: "El Ledger de Xahau", en: "The Xahau Ledger", jp: "Xahauのレジャー" },
          content: {
            es: "Base de datos distribuida con el estado completo\n\n• Cada ledger tiene un número de secuencia\n• Se cierra cada 3-5 segundos\n• Contiene todos los objetos del estado\n• Inmutable una vez validado",
            en: "Distributed database with the complete state\n\n• Each ledger has a sequence number\n• Closes every 3-5 seconds\n• Contains all state objects\n• Immutable once validated",
            jp: "完全な状態を持つ分散データベース\n\n• 各レジャーにはシーケンス番号がある\n• 3〜5秒ごとにクローズする\n• すべての状態オブジェクトを含む\n• 検証後は不変",
          },
          visual: "📖",
        },
        {
          title: { es: "Objetos del Ledger", en: "Ledger Objects", jp: "レジャーオブジェクト" },
          content: {
            es: "Objetos tipados y estructurados:\n\n• AccountRoot → Cuentas\n• RippleState → TrustLines\n• Offer → Órdenes DEX\n• URIToken → NFTs\n• HookDefinition → Código de Hooks\n• HookState → Estado de Hooks",
            en: "Typed and structured objects:\n\n• AccountRoot → Accounts\n• RippleState → TrustLines\n• Offer → DEX orders\n• URIToken → NFTs\n• HookDefinition → Hook code\n• HookState → Hook state data",
            jp: "型付きかつ構造化されたオブジェクト：\n\n• AccountRoot → アカウント\n• RippleState → トラストライン\n• Offer → DEX注文\n• URIToken → NFT\n• HookDefinition → Hookコード\n• HookState → Hookの状態データ",
          },
          visual: "🗂️",
        },
        {
          title: { es: "Detalle de objetos del Ledger", en: "Ledger Object Details", jp: "レジャーオブジェクトの詳細" },
          content: {
            es: "Cada objeto tiene campos predefinidos:\n\n• AccountRoot → Balance, Sequence, Flags, Hooks\n• RippleState → Saldo entre dos cuentas para un token\n• Offer → Precio, cantidad, par de intercambio\n• DirectoryNode → Índice que conecta objetos\n\nDiferencia con EVM:\n• Sin storage arbitrario (key-value)\n• Campos fijos → consultas más eficientes",
            en: "Each object has predefined fields:\n\n• AccountRoot → Balance, Sequence, Flags, Hooks\n• RippleState → Balance between two accounts for a token\n• Offer → Price, amount, trading pair\n• DirectoryNode → Index connecting objects\n\nDifference from EVM:\n• No arbitrary storage (key-value)\n• Fixed fields → more efficient queries",
            jp: "各オブジェクトには事前定義されたフィールドがある：\n\n• AccountRoot → 残高、シーケンス、フラグ、Hooks\n• RippleState → 2つのアカウント間のトークン残高\n• Offer → 価格、数量、取引ペア\n• DirectoryNode → オブジェクトを接続するインデックス\n\nEVMとの違い：\n• 任意ストレージなし（キーバリュー）\n• 固定フィールド → より効率的なクエリ",
          },
          visual: "🔍",
        },
      ],
    },
    {
      id: "m1l3",
      title: {
        es: "Historia de las blockchains: de Bitcoin a Xahau",
        en: "History of Blockchains: from Bitcoin to Xahau",
        jp: "ブロックチェーンの歴史：ビットコインからXahauまで",
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

すべては**サトシ・ナカモト**が公開した9ページの文書から始まりました。タイトルは*「Bitcoin: A Peer-to-Peer Electronic Cash System」*。アイデアはシンプルかつ革命的でした：**仲介者なしのデジタルマネー**。

Bitcoinが導入したもの：
- **プルーフ・オブ・ワーク（PoW）**：マイナーが数学的問題を解いてトランザクションを検証する
- **完全な分散化**：銀行なし、中央サーバーなし
- **不変性**：確認されたトランザクションは取り消せない
- **デジタル希少性**：Bitcoinは2,100万枚しか存在しない

限界：Bitcoinは遅く（毎秒約7トランザクション）、スクリプト言語は非常に限定的。複雑なロジックを実行するために設計されていない。

### 2012年 — XRP Ledger：マイニングなしの速度

後に**XRP Ledger（XRPL）**が作られました。**プルーフ・オブ・ワークを使用しない**最初の主要なブロックチェーンです。代わりに、**信頼できるバリデーター（UNL）**に基づくコンセンサスプロトコルを使用します。

XRPLが導入したもの：
- **マイニングなしのコンセンサス**：3〜5秒でトランザクションが確認される
- **ネイティブDEX**：プロトコルに統合された分散取引所
- **ネイティブトークン**：スマートコントラクトなしでトークンを作成
- **最小手数料**：トランザクションあたり数セントの何分の一

限界：XRPLにはスマートコントラクト（カスタムプログラマブルロジック）を実行する能力がなかった。

### 2015年 — Ethereum：ワールドコンピュータ

**ヴィタリック・ブテリン**は野心的なアイデアを持つEthereumホワイトペーパーを発表しました：**あらゆるプログラム**を実行できるブロックチェーン。こうして**Ethereum Virtual Machine（EVM）**が誕生しました。

Ethereumが導入したもの：
- **スマートコントラクト**：ブロックチェーン上に存在し自動的に実行されるプログラム
- **Solidity**：コントラクトを書くためのプログラミング言語
- **EVM**：コントラクトコードを実行する仮想マシン
- **ERC-20 / ERC-721**：代替可能トークンとNFTの標準
- **DeFi**：分散型金融（貸付、取引所、ステーブルコイン）

限界：高価で変動するガス、低速（約15 TPS）、限られたスケーラビリティ。

### 2020年以降 — L1とL2の爆発

Ethereumの問題が新しいブロックチェーンの波を引き起こしました：

- **Solana**（2020年）：プルーフ・オブ・ヒストリーによる高速（理論値約65,000 TPS）
- **Avalanche**（2020年）：高速コンセンサスによるカスタマイズ可能なサブネット
- **Polygon**（2020年）：Ethereumをスケールするためのレイヤー2ソリューション
- **Arbitrum / Optimism**（2021年）：Ethereum外でトランザクションを処理するロールアップ
- **Cosmos / Polkadot**：相互接続されたブロックチェーンのエコシステム

これらのネットワークのほとんどは**EVM互換**で、SolidityとEthereumのツールを使用します。

### 2023年 — Xahau：XRPL + スマートコントラクト

**Xahau**は**XRP Ledgerのフォーク**として誕生し、XRPLが常に必要としていた機能を追加しました：**スマートコントラクト**（**Hooks**と呼ばれる）。当初XahauはXRP Ledgerの一部になる予定でHooksがXRP Ledgerに組み込まれる予定でしたが、Rippleはコミュニティのこの改善を受け入れませんでした。何年もかけてきた作業を無駄にしないために、Xahauが誕生しました。

Xahauが導入したもの：
- **Hooks**：Cで書かれWebAssemblyにコンパイルされたスマートコントラクト
- **XAH**：エミッション/報酬システムを持つネイティブトークン
- **XRPLの継承**：速度、ネイティブDEX、低手数料を維持
- **EVMなし**：独自のアーキテクチャ、Solidityと非互換

### なぜXahauはXRPLのフォークなのか？

XRPLのフォークとして、Xahauは支払いとトークンのために実証され最適化されたブロックチェーンのすべての利点を活用し、欠けていたピースを追加します：プロトコル内で直接プログラマブルロジックを実行する能力。

1. **実証済みの基盤**：XRPLは2012年から大きな中断なく稼働している
2. **ネイティブな速度**：XRPLのコンセンサスはすでに3〜5秒の最終確定を提供する
3. **統合DEX**：分散取引所をゼロから構築する必要がない
4. **ネイティブトークン**：TrustLinesとトークンシステムはすでに存在し機能している
5. **既存のコミュニティ**：XRPLの開発者とツールが適応できる

### 年表まとめ

| 年 | マイルストーン | 主要なイノベーション |
|---|---|---|
| 2008 | Bitcoin | 分散型デジタルマネー |
| 2012 | XRP Ledger | マイニングなしのコンセンサス、ネイティブDEX |
| 2015 | Ethereum | スマートコントラクト（EVM + Solidity） |
| 2017 | ICOブーム | ERC-20トークン、分散型資金調達 |
| 2020 | DeFiサマー | Ethereum上の分散型金融 |
| 2020年以降 | L1s/L2s | Solana、Avalanche、Polygon、ロールアップ |
| 2023 | Xahau | XRPL + Hooks（C/WASMのスマートコントラクト） |`,
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "2008-2015: Los orígenes", en: "2008-2015: The Origins", jp: "2008-2015年：起源" },
          content: {
            es: "2008 — Bitcoin\n• Primer dinero digital descentralizado\n• Proof of Work, lento pero revolucionario\n\n2012 — XRP Ledger\n• Sin minería, consenso en 3-5 segundos\n• DEX nativo y tokens integrados\n\n2015 — Ethereum\n• Smart contracts con Solidity\n• La EVM como computadora mundial",
            en: "2008 — Bitcoin\n• First decentralized digital money\n• Proof of Work, slow but revolutionary\n\n2012 — XRP Ledger\n• No mining, consensus in 3-5 seconds\n• Native DEX and integrated tokens\n\n2015 — Ethereum\n• Smart contracts with Solidity\n• The EVM as a world computer",
            jp: "2008年 — Bitcoin\n• 最初の分散型デジタルマネー\n• プルーフ・オブ・ワーク、遅いが革命的\n\n2012年 — XRP Ledger\n• マイニングなし、3〜5秒でコンセンサス\n• ネイティブDEXと統合トークン\n\n2015年 — Ethereum\n• Solidityによるスマートコントラクト\n• ワールドコンピュータとしてのEVM",
          },
          visual: "📜",
        },
        {
          title: { es: "2020+: La explosión", en: "2020+: The Explosion", jp: "2020年以降：爆発" },
          content: {
            es: "Los problemas de Ethereum impulsan nuevas redes:\n\n• Solana → Alta velocidad\n• Avalanche → Subredes personalizables\n• Polygon → Layer 2 para Ethereum\n• Arbitrum/Optimism → Rollups\n\nLa mayoría son compatibles con EVM (Solidity)",
            en: "Ethereum's problems drive new networks:\n\n• Solana → High speed\n• Avalanche → Customizable subnets\n• Polygon → Layer 2 for Ethereum\n• Arbitrum/Optimism → Rollups\n\nMost are EVM-compatible (Solidity)",
            jp: "Ethereumの問題が新しいネットワークを生む：\n\n• Solana → 高速\n• Avalanche → カスタマイズ可能なサブネット\n• Polygon → Ethereum用レイヤー2\n• Arbitrum/Optimism → ロールアップ\n\nほとんどがEVM互換（Solidity）",
          },
          visual: "🚀",
        },
        {
          title: { es: "2023: Nace Xahau", en: "2023: Xahau Is Born", jp: "2023年：Xahauの誕生" },
          content: {
            es: "Fork de XRPL + Smart Contracts (Hooks)\n\n¿Por qué un fork de XRPL?\n• Base probada desde 2012\n• Velocidad nativa (3-5 seg)\n• DEX y tokens integrados\n• Solo faltaban smart contracts\n\nHooks = C compilado a WebAssembly\nSin EVM, sin Solidity",
            en: "Fork of XRPL + Smart Contracts (Hooks)\n\nWhy a fork of XRPL?\n• Proven foundation since 2012\n• Native speed (3-5 sec)\n• Integrated DEX and tokens\n• Only smart contracts were missing\n\nHooks = C compiled to WebAssembly\nNo EVM, no Solidity",
            jp: "XRPLのフォーク + スマートコントラクト（Hooks）\n\nなぜXRPLのフォークなのか？\n• 2012年からの実証済みの基盤\n• ネイティブな速度（3〜5秒）\n• DEXとトークンが統合済み\n• スマートコントラクトだけが欠けていた\n\nHooks = CをWebAssemblyにコンパイル\nEVMなし、Solidityなし",
          },
          visual: "🧱",
        },
        {
          title: { es: "Línea temporal completa", en: "Complete Timeline", jp: "完全な年表" },
          content: {
            es: "2008 → Bitcoin (PoW, dinero digital)\n2012 → XRPL (sin minería, DEX)\n2015 → Ethereum (EVM, Solidity)\n2017 → Boom de ICOs y tokens\n2020 → DeFi + nuevas L1s/L2s\n2023 → Xahau (XRPL + Hooks)\n\nCada generación resolvió limitaciones de la anterior",
            en: "2008 → Bitcoin (PoW, digital money)\n2012 → XRPL (no mining, DEX)\n2015 → Ethereum (EVM, Solidity)\n2017 → ICO and token boom\n2020 → DeFi + new L1s/L2s\n2023 → Xahau (XRPL + Hooks)\n\nEach generation solved limitations of the previous one",
            jp: "2008年 → Bitcoin（PoW、デジタルマネー）\n2012年 → XRPL（マイニングなし、DEX）\n2015年 → Ethereum（EVM、Solidity）\n2017年 → ICOとトークンのブーム\n2020年 → DeFi + 新しいL1s/L2s\n2023年 → Xahau（XRPL + Hooks）\n\n各世代は前の世代の限界を解決した",
          },
          visual: "⏳",
        },
      ],
    },
    {
      id: "m1l4",
      title: {
        es: "El ecosistema Xahau",
        en: "The Xahau Ecosystem",
        jp: "Xahauエコシステム",
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

**XAH**はXahauのネイティブ暗号通貨です。XRPLのXRPとは異なり、XAHには**インフレ型エミッションシステム**があります：アクティブなアカウントの保有者は定期的にXAHの報酬をリクエストできます。これによりネットワークへの参加と利用が奨励されます。

XAHの特徴：
- **手数料**（トランザクション手数料）の支払いに使用される
- アクティブなアカウントを維持するために**最小リザーブ**が必要
- **エミッションシステム**がリクエストしたアクティブなアカウントにXAHを配布する
- 送信、交換、Hooksでの使用が可能

### Xaman（旧XUMM）：メインウォレット

**Xaman**（以前はXUMMとして知られていた）はXRPL/Xahauエコシステムで最も広く使用されているウォレットです。以下を可能にするモバイルアプリケーションです：

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

**エクスプローラー**はブロックチェーン上で起きていることをすべて視覚的に確認できます：

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
| フォーセット | あり（テスト用の無料XAH） | なし |
| データ | 定期的にリセットされる場合がある | 永続的 |

**このコースでは常にtestnetを使用します。** Testnetのトークンには実際の価値がないため、お金を失うリスクなく自由に実験できます。

Testnet XAHを取得するには、**フォーセット**（蛇口）を使用します：テストアカウントに無料トークンを送るツールです。これは後のモジュールで詳しく説明します。`,
      },
      codeBlocks: [
      ],
      slides: [
        {
          title: { es: "XAH y el sistema de emisiones", en: "XAH and the Emission System", jp: "XAHとエミッションシステム" },
          content: {
            es: "XAH = Token nativo de Xahau\n\n• Pagar fees (comisiones)\n• Reserva mínima para cuentas\n• Sistema de emisión inflaccionario\n  → Los usuarios que lo soliciten, reciben XAH periódicamente",
            en: "XAH = Native token of Xahau\n\n• Pay fees (transaction fees)\n• Minimum reserve for accounts\n• Inflationary emission system\n  → Users who request it receive XAH periodically",
            jp: "XAH = Xahauのネイティブトークン\n\n• 手数料（取引手数料）の支払い\n• アカウントの最小リザーブ\n• インフレ型エミッションシステム\n  → リクエストしたユーザーは定期的にXAHを受け取る",
          },
          visual: "💰",
        },
        {
          title: { es: "Herramientas del ecosistema", en: "Ecosystem Tools", jp: "エコシステムツール" },
          content: {
            es: "Xaman → Wallet móvil (iOS/Android)\n  xaman.app\n\nHooks Builder → IDE online para smart contracts\n  builder.xahau.network\n\nExplorer → Exploradores de bloques\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → Documentación oficial\n  xahau.network/docs",
            en: "Xaman → Mobile wallet (iOS/Android)\n  xaman.app\n\nHooks Builder → Online IDE for smart contracts\n  builder.xahau.network\n\nExplorer → Block explorers\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → Official documentation\n  xahau.network/docs",
            jp: "Xaman → モバイルウォレット（iOS/Android）\n  xaman.app\n\nHooks Builder → スマートコントラクト用オンラインIDE\n  builder.xahau.network\n\nエクスプローラー → ブロックエクスプローラー\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → 公式ドキュメント\n  xahau.network/docs",
          },
          visual: "🛠️",
        },
        {
          title: { es: "Testnet vs Mainnet", en: "Testnet vs Mainnet", jp: "Testnet vs Mainnet" },
          content: {
            es: "Testnet (desarrollo)\n• wss://xahau-test.net\n• XAH sin valor real\n• Faucet para obtener tokens gratis\n\nMainnet (producción)\n• wss://xahau.network\n• XAH con valor real\n• Sin faucet\n\nEn este curso usamos SIEMPRE testnet",
            en: "Testnet (development)\n• wss://xahau-test.net\n• XAH with no real value\n• Faucet to get free tokens\n\nMainnet (production)\n• wss://xahau.network\n• XAH with real value\n• No faucet\n\nIn this course we ALWAYS use testnet",
            jp: "Testnet（開発）\n• wss://xahau-test.net\n• 実際の価値のないXAH\n• 無料トークンを取得するフォーセット\n\nMainnet（本番）\n• wss://xahau.network\n• 実際の価値のあるXAH\n• フォーセットなし\n\nこのコースでは常にtestnetを使用する",
          },
          visual: "🌐",
        },
      ],
    },
  ],
}
