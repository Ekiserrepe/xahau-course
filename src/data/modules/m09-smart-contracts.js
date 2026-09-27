import { deriveCodeTranslations } from "../code-i18n.js";
import { addNewWords } from "../glossary.js";
const moduleData = {
  id: "m8",
  icon: "🪝",
  title: {
    es: "Introducción a smart contracts en entornos No-EVM",
    pt: "Introdução a smart contracts em ambientes não EVM",
    en: "Introduction to smart contracts in Non-EVM environments",
    jp: "Non-EVM環境におけるスマートコントラクト入門",
    ko: "비 EVM 환경의 스마트 컨트랙트 입문",
    zh: "非 EVM 环境中的智能合约入门",
  },
  lessons: [
    {
      id: "m8l1",
      title: {
        es: "¿Qué son los Hooks?",
        pt: "O que são os Hooks?",
        en: "What are Hooks?",
        jp: "Hooksとは何か？",
        ko: "Hooks란 무엇인가?",
        zh: "什么是 Hooks？",
      },
      theory: {
        es: `Los **Hooks** son el sistema de smart contracts nativo de Xahau. A diferencia de Solidity en Ethereum, los Hooks se escriben en **C** y se compilan a **WebAssembly (WASM)**.

### Hooks vs Smart Contracts EVM

| Característica | Smart Contracts EVM | Hooks (Xahau) |
|---|---|---|
| Lenguaje | Solidity / Vyper | C |
| Compilación | Bytecode EVM | WebAssembly (WASM) |
| Ejecución | En la EVM | Directamente en el nodo |
| Modelo | Se invocan activamente | Se ejecutan reactivamente |
| Gas/Fees | Gas variable | Fees fijos y bajos |
| Almacenamiento | Storage ilimitado | Estado con namespace |
| Despliegue | Transacción de creación | Transacción SetHook |

### Modelo reactivo

La diferencia más importante es el **modelo de ejecución**:

- En Ethereum, **tú llamas** al smart contract enviando una transacción al contrato
- En Xahau, los Hooks se **ejecutan automáticamente** cuando una transacción pasa por una cuenta que tiene un Hook instalado

Los Hooks son como **filtros** o **interceptores** que reaccionan a las transacciones. Entre muchas opciones, pueden:
- **Aceptar** la transacción (\`accept()\`)
- **Rechazar** la transacción (\`rollback()\`)
- **Emitir** nuevas transacciones (\`emit()\`)
- **Leer y escribir** estado persistente (\`state()\`, \`state_set()\`)

### Algunas datos curiosos

- Máximo **10 Hooks** por cuenta
- Cada Hook tiene su propio **namespace** para guardar información, pero puede utilizar otros que no son el propio  si tiene permisos
- La primera vez que se instala un Hook, el código WASM se almacena en el ledger y se le asigna un hash. Si otro usuario quiere instalar el mismo Hook, puede hacer uso del identificador y no necesita tener acceso al código fuente para instalarlo.

### Funciones obligatorias

Todo Hook debe implementar dos funciones:
- \`hook(uint32_t reserved)\` — Se ejecuta cuando una transacción llega a la cuenta. Es obligatoria
- \`cbak(uint32_t reserved)\` — Se ejecuta como callback de transacciones emitidas por el Hook. Es opcional

### Guard (\`_g\`)

Cada Hook debe incluir una llamada a \`_g(id, maxiter)\` para evitar bucles infinitos. El guard define el máximo de iteraciones que puede ejecutar el Hook.`,
        pt: `Os **Hooks** são o sistema de smart contracts nativo de Xahau. Diferentemente de Solidity em Ethereum, os Hooks é escriton em **C** e se compilan a **WebAssembly (WASM)**.
### Hooks vs Smart Contracts EVM
| Característica | Smart Contracts EVM | Hooks (Xahau) |
|---|---|---|
| Linguagem | Solidity / Vyper | C |
| Compilação | Bytecode EVM | WebAssembly (WASM) |
| Execução | Na EVM | Diretamente no nó |
| Modelo | São invocados ativamente | São executados reativamente |
| Gas/Fees | Gas variável | Fees fixas e baixas |
| Armazenamento | Storage ilimitado | Estado com namespace |
| Deploy | Transação de criação | Transação SetHook |
### Modelo reativo
A diferença mais importante é o **modelo de execução**:
- No Ethereum, **você chama** o smart contract enviando uma transação ao contrato
- Em Xahau, os Hooks se **executam automaticamente** quando uma transação acontece por uma conta que tem um Hook instalado
Os Hooks são como **filtros** ou **interceptores** que reagem às transações. Entre muitas opções, podem:
- **Aceitar** a transação (\`accept()\`)
- **Rejeitar** a transação (\`rollback()\`)
- **Emitir** novas transações (\`emit()\`)
- **Ler e escrever** estado persistente (\`state()\`, \`state_set()\`)
### Algunas dados curiosos
- Máximo **10 Hooks** por conta
- Cada Hook tem seu próprio **namespace** para guardar informação, mas pode usar outros que não são o próprio  se tiver permissões
- A primeira vez que se instala um Hook, o código WASM é armazenado no ledger e é atribuído um hash. Se outro usuário quiser instalar o mesmo Hook, pode usar o identificador e não precisa ter acesso ao código-fonte para instalá-lo.
### Funções obligatorias
Todo Hook deve implementar dos funções:
- \`hook(uint32_t reserved)\` — executada quando uma transação chega à conta. É obrigatória
- \`cbak(uint32_t reserved)\` — Se executa como callback de transações emitidas por o Hook. É opcional
### Guard (\`_g\`)
Cada Hook deve incluir uma chamada \`_g(id, maxiter)\` para evitar loops infinitos. O guard define o máximo de iterações que o Hook pode executar.`,
        en: `Hooks are Xahau's native smart contract system. Unlike Solidity in Ethereum, Hooks are written in **C** and compiled to **WebAssembly (WASM)**.

### Hooks vs EVM Smart Contracts

| Feature | EVM Smart Contracts | Hooks (Xahau) |
|---|---|---|
| Language | Solidity / Vyper | C |
| Compilation | EVM Bytecode | WebAssembly (WASM) |
| Execution | On the EVM | Directly on the node |
| Model | Actively invoked | Reactively executed |
| Gas/Fees | Variable gas | Fixed low fees |
| Storage | Unlimited storage | State with namespace |
| Deployment | Creation transaction | SetHook transaction |

### Reactive model

The most important difference is the **execution model**:

- In Ethereum, **you call** the smart contract by sending a transaction to the contract
- In Xahau, Hooks **execute automatically** when a transaction passes through an account that has a Hook installed

Hooks are like **filters** or **interceptors** that react to transactions. Among many options, they can:
- **Accept** the transaction (\`accept()\`)
- **Reject** the transaction (\`rollback()\`)
- **Emit** new transactions (\`emit()\`)
- **Read and write** persistent state (\`state()\`, \`state_set()\`)

### Some interesting facts

- Maximum **10 Hooks** per account
- Each Hook has its own **namespace** for storing information, but can use others that aren't its own if it has permissions
- The first time a Hook is installed, the WASM code is stored in the ledger and assigned a hash. If another user wants to install the same Hook, they can use the identifier and don't need access to the source code to install it.

### Mandatory functions

Every Hook must implement two functions:
- \`hook(uint32_t reserved)\` — Executes when a transaction reaches the account. Mandatory
- \`cbak(uint32_t reserved)\` — Executes as a callback for transactions emitted by the Hook. Optional

### Guard (\`_g\`)

Every Hook must include a call to \`_g(id, maxiter)\` to prevent infinite loops. The guard defines the maximum number of iterations the Hook can execute.`,
        jp: `**Hooks**はXahauのネイティブスマートコントラクトシステムです。EthereumのSolidityとは異なり、Hooksは**C言語**で記述され、**WebAssembly（WASM）**にコンパイルされます。

### Hooks vs EVMスマートコントラクト

| 特徴 | EVMスマートコントラクト | Hooks（Xahau） |
|---|---|---|
| 言語 | Solidity / Vyper | C |
| コンパイル | EVMバイトコード | WebAssembly（WASM） |
| 実行 | EVM上で | ノード上で直接 |
| モデル | 能動的に呼び出す | リアクティブに実行 |
| ガス/手数料 | 可変ガス | 固定の低手数料 |
| ストレージ | 無制限ストレージ | 名前空間付きステート |
| デプロイ | 作成トランザクション | SetHookトランザクション |

### リアクティブモデル

最も重要な違いは**実行モデル**です。

- Ethereumでは、コントラクトにトランザクションを送ることで**あなたがスマートコントラクトを呼び出す**
- Xahauでは、Hookがインストールされたアカウントにトランザクションが通過するとき、Hooksが**自動的に実行される**

Hooksはトランザクションに反応する**フィルター**や**インターセプター**のようなものです。多くのオプションの中で、次のようなことができます。
- トランザクションを**承認**する（\`accept()\`）
- トランザクションを**拒否**する（\`rollback()\`）
- 新しいトランザクションを**発行**する（\`emit()\`）
- 永続的なステートを**読み書き**する（\`state()\`、\`state_set()\`）

### 興味深い事実

- アカウントあたり最大**10個のHooks**
- 各Hookには情報を保存するための独自の**名前空間**があるが、権限があれば自分以外の名前空間にもアクセスできる
- Hookが初めてインストールされると、WASMコードがレジャーに保存されてハッシュが割り当てられる。別のユーザーが同じHookをインストールしたい場合、識別子を使用できるため、インストールするためにソースコードへのアクセスは不要

### 必須関数

すべてのHookは次の2つの関数を実装する必要があります。
- \`hook(uint32_t reserved)\` — アカウントにトランザクションが到着したときに実行される。必須
- \`cbak(uint32_t reserved)\` — Hookが発行したトランザクションのコールバックとして実行される。任意

### ガード（\`_g\`）

すべてのHookは無限ループを防ぐために\`_g(id, maxiter)\`の呼び出しを含む必要があります。ガードはHookが実行できる最大反復回数を定義します。`,
        ko: `**Hook**은 Xahau 계정에 설치되는 가벼운 스마트 컨트랙트입니다. Ethereum의 Solidity와 달리 Hook은 **C 언어**로 작성되고 **WebAssembly(WASM)** 로 컴파일됩니다.

### Hook의 특징

- 계정 단위로 설치
- 트랜잭션을 **수락**하거나 **거부**할 수 있음
- 영속 상태를 읽고 쓸 수 있음
- 필요하면 새 트랜잭션을 발행할 수 있음

### 핵심 차이

가장 큰 차이는 **실행 방식**입니다.

- Ethereum에서는 사용자가 컨트랙트를 호출합니다
- Xahau에서는 Hook이 설치된 계정을 지나는 트랜잭션에 반응해 자동 실행됩니다

### 필수 함수

- \`hook(uint32_t reserved)\`: 필수
- \`cbak(uint32_t reserved)\`: 선택

### Guard

모든 Hook은 무한 루프를 방지하기 위해 \`_g(id, maxiter)\` 를 포함해야 합니다.`,
        zh: `**Hook** 是安装在 Xahau 账户上的轻量级智能合约。与 Ethereum 的 Solidity 不同，Hook 使用 **C 语言** 编写，并编译为 **WebAssembly（WASM）**。

### Hook 的特点

- 以账户为单位安装
- 可以接受或拒绝交易
- 可以读写持久状态
- 在需要时还能自行发出新交易

### 核心差异

最大的区别在于**执行方式**：

- 在 Ethereum 中，用户主动调用合约
- 在 Xahau 中，交易经过安装了 Hook 的账户时，Hook 会自动响应执行

### 必要函数

- \`hook(uint32_t reserved)\`：必需
- \`cbak(uint32_t reserved)\`：可选

### Guard

所有 Hook 都必须包含 \`_g(id, maxiter)\`，用于防止无限循环。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Hook mínimo. Acepta todas las transacciones",
            pt: "Hook mínimo. Aceita todas as transações",
            en: "Minimal Hook. Accepts all transactions",
            jp: "最小限のHook。すべてのトランザクションを承認する",
            ko: "최소 Hook. 모든 트랜잭션 수락",
            zh: "最小 Hook：接受所有交易",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

/**
 * Hook: accept_all.c
 * El Hook más simple posible.
 * Acepta todas las transacciones sin condiciones.
 */

int64_t hook(uint32_t reserved) {
    // Aceptar la transacción con un mensaje
    accept(SBUF("accept_all: Transacción aceptada."), __LINE__);

    // Guard: nunca se llega aquí, pero es obligatorio
    _g(1, 1);
    return 0;
}`,
            pt: `#include "hookapi.h"
/**
 * Hook: accept_all.c
 * O Hook mais simples possível.
 * Aceita todas as transações sem condições.
 */
int64_t hook(uint32_t reserved) {
    // Aceitar a transação com um mensagem
    accept(SBUF("accept_all: Transação aceitada."), __LINE__);
    // Guard: nunca se chega aqui, mas é obrigatório
    _g(1, 1);
    return 0;
}`,
            en: `#include "hookapi.h"

/**
 * Hook: accept_all.c
 * The simplest possible Hook.
 * Accepts all transactions without conditions.
 */

int64_t hook(uint32_t reserved) {
    // Accept the transaction with a message
    accept(SBUF("accept_all: Transaction accepted."), __LINE__);

    // Guard: never reached here, but mandatory
    _g(1, 1);
    return 0;
}`,
            jp: `#include "hookapi.h"

/**
 * Hook: accept_all.c
 * 最もシンプルなHook。
 * すべてのトランザクションを条件なく承認する。
 */

int64_t hook(uint32_t reserved) {
    // メッセージ付きでトランザクションを承認する
    accept(SBUF("accept_all: トランザクション承認済み。"), __LINE__);

    // ガード：ここには到達しないが、必須
    _g(1, 1);
    return 0;
}`,
            ko: `#include "hookapi.h"

/**
 * Hook: accept_all.c
 * 가장 단순한 Hook 예제.
 * 모든 트랜잭션을 조건 없이 수락한다.
 */

int64_t hook(uint32_t reserved) {
    // 메시지와 함께 트랜잭션 수락
    accept(SBUF("accept_all: 트랜잭션이 수락되었습니다."), __LINE__);

    // Guard: 여기에는 도달하지 않지만 필수
    _g(1, 1);
    return 0;
}`,
            zh: `#include "hookapi.h"

/**
 * Hook: accept_all.c
 * 最简单的 Hook 示例。
 * 无条件接受所有交易。
 */

int64_t hook(uint32_t reserved) {
    // 带消息接受交易
    accept(SBUF("accept_all: 交易已接受。"), __LINE__);

    // Guard：虽然这里不会执行到，但它是必需的
    _g(1, 1);
    return 0;
}`,
          },
        },
        {
          title: {
            es: "Hook que rechaza pagos menores a un mínimo",
            pt: "Hook que rechaza pagamentos menores a um mínimo",
            en: "Hook that rejects payments below a minimum",
            jp: "最低金額未満の支払いを拒否するHook",
            ko: "최소 금액 미만 결제를 거부하는 Hook",
            zh: "拒绝低于最小金额付款的 Hook",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

/**
 * Hook: min_payment.c
 * Rechaza pagos de XAH menores a 10 XAH.
 * Acepta todas las demás transacciones.
 */

int64_t hook(uint32_t reserved) {
    // Obtener el tipo de transacción
    int64_t tt = otxn_type();

    // Si no es un pago (tipo 0), aceptar
    if (tt != 0) {
        accept(SBUF("min_payment: No es un pago."), __LINE__);
    }

    // Obtener la cantidad del pago
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // Si no es XAH nativo (8 bytes), aceptar
    if (amount_len != 8) {
        accept(SBUF("min_payment: Pago no-XAH."), __LINE__);
    }

    // Convertir a drops y comparar
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops

    if (drops < min_drops) {
        // Rechazar: el pago es muy pequeño
        rollback(
            SBUF("min_payment: Pago rechazado. Mínimo 10 XAH."),
            __LINE__
        );
    }

    // Aceptar: el pago cumple el mínimo
    accept(SBUF("min_payment: Pago aceptado."), __LINE__);

    _g(1, 1);
    return 0;
}`,
            pt: `#include "hookapi.h"
/**
 * Hook: min_payment.c
 * Rejeita pagamentos em XAH menores que 10 XAH.
 * Aceita todas as demás transações.
 */
int64_t hook(uint32_t reserved) {
    // Obter ou tipo de transação
    int64_t tt = otxn_type();
    // Se não é um pagamento (tipo 0), aceitar
    if (tt != 0) {
        accept(SBUF("min_payment: nao e um pagamento."), __LINE__);
    }
    // Obter a quantidade do pagamento
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    // Se não é XAH nativo (8 bytes), aceitar
    if (amount_len != 8) {
        accept(SBUF("min_payment: pagamento nao-XAH."), __LINE__);
    }
    // Converter para drops e comparar
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops
    if (drops < min_drops) {
        // Rejeitar: o pagamento é pequeno demais
        rollback(
            SBUF("min_payment: pagamento rejeitado. Minimo 10 XAH."),
            __LINE__
        );
    }
    // Aceitar: ou pagamento cumple ou mínimo
    accept(SBUF("min_payment: pagamento aceito."), __LINE__);
    _g(1, 1);
    return 0;
}`,
            en: `#include "hookapi.h"

/**
 * Hook: min_payment.c
 * Reject payments of XAH below 10 XAH.
 * Accepts all other transactions.
 */

int64_t hook(uint32_t reserved) {
    // Obtain the transaction type
    int64_t tt = otxn_type();

    // If not a payment (type 0), accept
    if (tt != 0) {
        accept(SBUF("min_payment: Not a payment."), __LINE__);
    }

    // Obtain the payment amount
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // If not native XAH (8 bytes), accept
    if (amount_len != 8) {
        accept(SBUF("min_payment: Not native XAH."), __LINE__);
    }

    // Convert to drops and compare
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops

    if (drops < min_drops) {
        // Reject: the payment is too small
        rollback(
            SBUF("min_payment: Payment rejected. Minimum 10 XAH."),
            __LINE__
        );
    }

    // Accept: the payment meets the minimum
    accept(SBUF("min_payment: Payment accepted."), __LINE__);

    _g(1, 1);
    return 0;
}`,
            jp: `#include "hookapi.h"

/**
 * Hook: min_payment.c
 * 10 XAH未満のXAH支払いを拒否する。
 * その他すべてのトランザクションを承認する。
 */

int64_t hook(uint32_t reserved) {
    // トランザクションタイプを取得する
    int64_t tt = otxn_type();

    // 支払いでない場合（タイプ0）、承認する
    if (tt != 0) {
        accept(SBUF("min_payment: 支払いではありません。"), __LINE__);
    }

    // 支払い金額を取得する
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // ネイティブXAHでない場合（8バイト）、承認する
    if (amount_len != 8) {
        accept(SBUF("min_payment: ネイティブXAHではありません。"), __LINE__);
    }

    // dropsに変換して比較する
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops

    if (drops < min_drops) {
        // 拒否：支払い金額が少なすぎる
        rollback(
            SBUF("min_payment: 支払い拒否。最低10 XAH必要。"),
            __LINE__
        );
    }

    // 承認：支払いが最低金額を満たしている
    accept(SBUF("min_payment: 支払い承認済み。"), __LINE__);

    _g(1, 1);
    return 0;
}`,
            ko: `#include "hookapi.h"

/**
 * Hook: min_payment.c
 * 10 XAH 미만의 XAH 결제를 거부한다.
 * 그 외 트랜잭션은 모두 수락한다.
 */

int64_t hook(uint32_t reserved) {
    // 트랜잭션 타입 확인
    int64_t tt = otxn_type();

    // 결제가 아니면 수락
    if (tt != 0) {
        accept(SBUF("min_payment: 결제 트랜잭션이 아닙니다."), __LINE__);
    }

    // 결제 금액 읽기
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // 네이티브 XAH가 아니면 수락
    if (amount_len != 8) {
        accept(SBUF("min_payment: 네이티브 XAH가 아닙니다."), __LINE__);
    }

    // drops 단위로 변환 후 비교
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops

    if (drops < min_drops) {
        rollback(
            SBUF("min_payment: 결제가 거부되었습니다. 최소 10 XAH 필요."),
            __LINE__
        );
    }

    accept(SBUF("min_payment: 결제가 수락되었습니다."), __LINE__);

    _g(1, 1);
    return 0;
}`,
            zh: `#include "hookapi.h"

/**
 * Hook: min_payment.c
 * 拒绝低于 10 XAH 的 XAH 付款。
 * 其他交易全部接受。
 */

int64_t hook(uint32_t reserved) {
    // 读取交易类型
    int64_t tt = otxn_type();

    // 如果不是 Payment（类型 0），直接接受
    if (tt != 0) {
        accept(SBUF("min_payment: 这不是付款交易。"), __LINE__);
    }

    // 读取付款金额
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // 如果不是原生 XAH（8 字节），直接接受
    if (amount_len != 8) {
        accept(SBUF("min_payment: 不是原生 XAH。"), __LINE__);
    }

    // 转换为 drops 并比较
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops

    if (drops < min_drops) {
        rollback(
            SBUF("min_payment: 付款被拒绝，最低为 10 XAH。"),
            __LINE__
        );
    }

    accept(SBUF("min_payment: 付款已接受。"), __LINE__);

    _g(1, 1);
    return 0;
}`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Hooks vs Smart Contracts EVM", pt: "Hooks vs Smart Contracts EVM", en: "Hooks vs EVM Smart Contracts", jp: "Hooks vs EVMスマートコントラクト", ko: "Hooks vs EVM 스마트 컨트랙트", zh: "Hooks vs EVM 智能合约" },
          content: {
            es: "Smart contracts nativos de Xahau\n\n• Escritos en C, compilados a WebAssembly\n• Modelo reactivo (no se invocan, reaccionan)\n• Fees fijos y bajos (no gas variable)\n• Estado aislado con namespaces\n• Despliegue con transacción SetHook",
            pt: `Smart contracts nativos da Xahau

• Escritos em C, compilados a WebAssembly
• Modelo reativo (não são invocados, reagem)
• Fees fixas e baixas (não gas variável)
• Estado isolado com namespaces
• Deploy com transação SetHook`,
            en: "Xahau native smart contracts\n\n• Written in C, compiled to WebAssembly\n• Reactive model (not invoked, they react)\n• Fixed low fees (no variável gas)\n• Isolated state with namespaces\n• Deployment with SetHook transaction",
            jp: "Xahauのネイティブスマートコントラクト\n\n• C言語で記述、WebAssemblyにコンパイル\n• リアクティブモデル（呼び出しではなく反応）\n• 固定の低手数料（可変ガスなし）\n• 名前空間による分離されたステート\n• SetHookトランザクションでデプロイ",
            ko: "Xahau의 네이티브 스마트 컨트랙트\n\n• C로 작성하고 WebAssembly로 컴파일\n• 호출형이 아닌 반응형 실행 모델\n• 가변 가스 대신 고정되고 낮은 수수료\n• namespace로 분리된 상태\n• SetHook 트랜잭션으로 배포",
            zh: "Xahau 的原生智能合约\n\n• 用 C 编写并编译为 WebAssembly\n• 采用响应式执行模型，而不是主动调用\n• 费用固定且较低，不使用可变 Gas\n• 使用 namespace 隔离状态\n• 通过 SetHook 交易部署",
          },
          visual: "🪝",
        },
        {
          title: { es: "Modelo reactivo y funciones", pt: "Modelo reativo e funções", en: "Reactive model and functions", jp: "リアクティブモデルと関数", ko: "반응형 모델과 함수", zh: "响应式模型与函数" },
          content: {
            es: "EVM: Tú llamas al contrato\nHooks: Se ejecutan automáticamente\n\n• accept() → Aceptar transacción\n• rollback() → Rechazar transacción\n• emit() → Emitir nueva transacción\n• state() / state_set() → Estado persistente\n\nhook() obligatoria | cbak() opcional | _g() guard",
            pt: `EVM: você chama o contrato
Hooks: Se executam automaticamente

• accept() → Aceitar transação
• rollback() → Rejeitar transação
• emit() → Emitir nova transação
• state() / state_set() → Estado persistente

hook() obrigatória | cbak() opcional | _g() guard`,
            en: "EVM: You call the contract\nHooks: Execute automatically\n\n• accept() → Accept transaction\n• rollback() → Reject transaction\n• emit() → Emit new transaction\n• state() / state_set() → Persistent state\n\nhook() mandatory | cbak() optional | _g() guard",
            jp: "EVM：あなたがコントラクトを呼び出す\nHooks：自動的に実行される\n\n• accept() → トランザクションを承認\n• rollback() → トランザクションを拒否\n• emit() → 新しいトランザクションを発行\n• state() / state_set() → 永続的なステート\n\nhook() 必須 | cbak() 任意 | _g() ガード",
            ko: "EVM: 사용자가 컨트랙트를 호출\nHooks: 트랜잭션에 반응해 자동 실행\n\n• accept() → 트랜잭션 수락\n• rollback() → 트랜잭션 거부\n• emit() → 새 트랜잭션 발행\n• state() / state_set() → 영속 상태\n\nhook() 필수 | cbak() 선택 | _g() guard",
            zh: "EVM：由用户调用合约\nHooks：对交易自动作出响应\n\n• accept() → 接受交易\n• rollback() → 拒绝交易\n• emit() → 发出新交易\n• state() / state_set() → 持久状态\n\nhook() 必需 | cbak() 可选 | _g() 为 guard",
          },
          visual: "⚡",
        },
        {
          title: { es: "Datos clave sobre Hooks", pt: "Dados-chave sobre Hooks", en: "Key facts about Hooks", jp: "Hooksの主要な事実", ko: "Hooks 핵심 정보", zh: "Hooks 关键事实" },
          content: {
            es: "• Hasta 10 Hooks por cuenta\n• Cada Hook tiene su propio namespace\n• Puede acceder a namespaces ajenos con permisos\n• WASM deduplicado: mismo codigo = mismo hash\n• Instalar por HookHash sin acceso al codigo fuente",
            pt: "• Até 10 Hooks por conta\n• Cada Hook tem sua próprio namespace\n• Pode acessar a namespaces externos com permissões\n• WASM deduplicado: mesmo código = mesmo hash\n• Instalar por HookHash sem acesso ao código fonte",
            en: "• Up to 10 Hooks per account\n• Each Hook has its own namespace\n• Can access other namespaces with permissions\n• WASM deduplicated: same code = same hash\n• Install by HookHash without source code access",
            jp: "• アカウントあたり最大10個のHooks\n• 各Hookには独自の名前空間がある\n• 権限があれば他の名前空間にもアクセス可能\n• WASMの重複排除：同じコード = 同じハッシュ\n• ソースコードなしでHookHashによりインストール可能",
            ko: "• 계정당 최대 10개의 Hook\n• 각 Hook은 자체 namespace를 가짐\n• 권한이 있으면 다른 namespace도 접근 가능\n• 같은 WASM은 같은 해시로 중복 제거됨\n• 소스코드 없이 HookHash로 설치 가능",
            zh: "• 每个账户最多可安装 10 个 Hook\n• 每个 Hook 都有自己的 namespace\n• 有权限时也可以访问其他 namespace\n• 相同 WASM 会被去重，对应相同哈希\n• 可通过 HookHash 安装，无需源码",
          },
          visual: "📐",
        },
      ],
    },
    {
      id: "m8l2",
      title: {
        es: "Despliegue de un Hook en Xahau",
        pt: "Deploy de um Hook na Xahau",
        en: "Deploying a Hook on Xahau",
        jp: "XahauへのHookのデプロイ",
        ko: "Xahau에 Hook 배포하기",
        zh: "在 Xahau 上部署 Hook",
      },
      theory: {
        es: `Una vez que tienes tu Hook escrito en C, necesitas **compilarlo a WebAssembly** y **desplegarlo** en tu cuenta de Xahau mediante una transacción \`SetHook\`.

### Opciones de desarrollo

**1. Hooks Builder (Online)**
La forma más rápida de empezar. [builder.xahau.network](https://builder.xahau.network) te permite escribir, compilar y desplegar Hooks desde el navegador. Incluye ejemplos, documentación y un entorno de desarrollo integrado. Ideal para pruebas rápidas y aprendizaje. Solo disponible para **Xahau Testnet**.

**2. Desarrollo local**
Para desarrollo local (y posteriormente Xahau Mainnet) necesitas [hooks-toolkit](https://hooks-toolkit.com/), incluye una librería completa para poder compilar tus hooks y desplegarlos con scripts personalizados.

### Desplegar un Hook

Una vez que tienes un hook listo para desplegar, el proceso general es generar una transacción \`SetHook\` con los campos adecuados, firmarla y enviarla a la red. El campo principal para el código del Hook es \`CreateCode\`, donde debes incluir el binario WASM en formato hexadecimal si es la primera vez que este Hook va a existir en la red.

Los entornos de prueba como [Hooks Builder](https://builder.xahau.network) te permiten compilar el código y subirlo usando un interfaz gráfico. Existen otros entornos graficos para tanto Xahau Testnet como Mainnnet, que te obligarán a usar tu seed para firmar la transacción de despliegue, como [xahau-testnet.xrplwin.com/tools](https://xahau-testnet.xrplwin.com/tools). Solo se recomienda utilizarlos en entorno de pruebas. Como práctica habitual, se recomienda aprender a utilizar la transacción \`SetHook\` con scripts personalizados usando la librería de \`xahau js\`, para posteriormente poder automatizar despliegues, actualizaciones y gestión de Hooks en producción.

### Transacción SetHook

La transacción \`SetHook\` es la única transacción necesaria para gestionar Hooks. Con ella puedes **instalar**, **actualizar** y **eliminar** Hooks de tu cuenta. Los campos principales del objeto Hook dentro del array \`Hooks\` son:

| Campo | Descripción |
|---|---|
| \`CreateCode\` | El binario WASM del Hook (en hexadecimal) |
| \`HookHash\` | Hash del Hook ya existente en el ledger (alternativa a CreateCode) |
| \`HookOn\` | Cadena que define qué tipos de transacción activan el Hook |
| \`HookNamespace\` | Nombre para el estado del Hook (32 bytes hex) |
| \`HookApiVersion\` | Versión de la API de Hooks (actualmente 0) |
| \`HookParameters\` | Parámetros de configuración opcionales |
| \`HookCanEmit\` | Lista de transacciones que el Hook puede emitir (seguridad) |
| \`Flags\` | Flags de control (\`hsfOverride\`, \`hsfNSDelete\`, \`hsfCollect\`) |

### Fases de gestión de un Hook

### 1. Instalar un Hook por primera vez (con CreateCode)

Cuando despliegas un Hook nuevo que nunca ha existido en la red, usas el campo \`CreateCode\` con el binario WASM completo. El nodo calcula el hash del WASM y almacena el código en el ledger. Si otro usuario ya desplegó el mismo código exacto, Xahau reutiliza la definición existente (deduplicación automática).

\`\`\`
Hook: {
  CreateCode: "0061736D...",     // WASM en hex
  HookOn: "0000000000000000",    // Todos los tipos de tx
  HookNamespace: "00...00",      // 64 chars hex
  HookApiVersion: 0,
  Flags: 1,                      // hsfOverride
}
\`\`\`

### 2. Instalar un Hook existente por HookHash

Si un Hook ya fue desplegado antes (por ti o por otra cuenta), puedes instalarlo en tu cuenta **sin enviar todo el WASM otra vez**. Solo necesitas el \`HookHash\` (el hash SHA-256 del binario). Esto ahorra espacio y fees.

\`\`\`
Hook: {
  HookHash: "A5B6C7D8...",      // Hash del Hook existente
  HookOn: "0000000000000000",
  HookNamespace: "00...00",
  Flags: 1,                      // hsfOverride
}
\`\`\`

El \`HookHash\` lo puedes obtener consultando los Hooks de una cuenta con \`account_objects\` o desde un explorador de bloques como [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com).

### 3. Actualizar un Hook (Update Operation)

La operación de actualización se activa cuando el Hook ya existe en la posición, **no** se envía \`HookHash\` ni \`CreateCode\`, y se incluye al menos uno de estos campos: \`HookNamespace\`, \`HookParameters\` o \`HookGrants\`. Esto permite modificar la configuración del Hook **sin reemplazar el código WASM**.

**Lo que puedes modificar**:

- **HookNamespace**: Si envías un \`HookNamespace\` diferente al actual, el namespace del Hook se actualiza. Si además incluyes el flag \`hsfNSDelete\` (valor 2), **todas las entradas de estado del namespace anterior se eliminan**.
- **HookParameters**: Para cada entrada en \`HookParameters\`:
  - Si envías un parámetro con nombre y **sin valor**, ese parámetro se **elimina** del Hook
  - Si envías un parámetro con nombre **y valor**, se **añade o actualiza** ese parámetro
- **HookGrants**: Si incluyes \`HookGrants\`, el array completo de grants del Hook se **reemplaza** por el nuevo array proporcionado

\`\`\`
// Ejemplo: actualizar solo los parámetros de un Hook existente
Hook: {
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "4D494E",        // "MIN"
        HookParameterValue: "00E1F505"      // Nuevo valor
      }
    },
    {
      HookParameter: {
        HookParameterName: "4D4158",        // "MAX" — eliminar
        // Sin HookParameterValue = se elimina
      }
    }
  ]
}
\`\`\`

**Para reemplazar completamente un Hook** por otro código WASM diferente, envía un nuevo \`SetHook\` con \`CreateCode\` (o \`HookHash\`) en la misma posición y el flag \`hsfOverride\` (valor 1). El estado previo del Hook se **mantiene** si el namespace no cambia.

### 4. Eliminar un Hook (Delete Operation)

Para eliminar un Hook de una posición, deben cumplirse estas condiciones: el Hook debe existir en esa posición, el flag \`hsfOverride\` debe estar activo, **no** se envía \`HookHash\`, y \`CreateCode\` debe estar presente pero **vacío**:

\`\`\`
Hook: {
  CreateCode: "",       // Vacío = eliminar
  Flags: 1,             // hsfOverride
}
\`\`\`

Al eliminar:
- El **contador de referencias** del \`HookDefinition\` se decrementa. Si llega a cero (ninguna otra cuenta usa ese código), la definición se elimina del ledger
- El objeto Hook en esa posición se **elimina**, dejando la posición vacía

Si además quieres **limpiar todo el estado** del namespace de ese Hook, añade el flag \`hsfNSDelete\` (valor 2) combinado con \`hsfOverride\`: \`Flags: 3\`. Esto eliminará todas las entradas de \`HookState\` del namespace asociado.

### Flags de SetHook

| Flag | Valor | Descripción |
|---|---|---|
| \`hsfOverride\` | 1 | Permite reemplazar o eliminar un Hook existente en esa posición |
| \`hsfNSDelete\` | 2 | Elimina todo el estado del namespace al desinstalar |
| \`hsfCollect\` | 4 | Permite ejecución como weakTSH |

### HookOn: Filtro de transacciones

El campo \`HookOn\` controla en qué tipos de transacción se activa el Hook:
- Puedes configurar bits específicos para activar o desactivar tipos usando esta [calculadora](https://richardah.github.io/xrpl-hookon-calculator/)
- Si marcamos solo que se active en transacciones de pago, el Hook solo se ejecutará cuando la cuenta reciba o envíe un pago. El resultado en la calculadora es \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. Debemos eliminar la parte de \`0x\`y pasar el resultado a mayúsculas para usarlo en el campo HookOn. Por ejemplo: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Se pueden marcar varias transacciones a la vez. Se recomienda precaución al configurar HookOn para no activar el Hook en tipos de transacción que no necesitas, ya que esto puede generar fees innecesarios y aumentar el riesgo de acciones que no esperemos.

### HookCanEmit: Control de emisión de transacciones

El campo \`HookCanEmit\` es un mecanismo de seguridad fundamental que limita qué transacciones puede emitir un Hook. Por defecto, un Hook tiene la capacidad de emitir transacciones autónomas (usando la función \`emit()\`), lo que podría representar un riesgo si el Hook tiene un bug o ha sido instalado sin revisar su código.

\`HookCanEmit\` es un array que define explícitamente qué tipos de transacción puede emitir el Hook. Si se configura, el Hook **solo podrá emitir las transacciones listadas**, cualquier intento de emitir un tipo no incluido será rechazado por la red. Funciona igual que \`HookOn\`, pero en lugar de controlar la activación del Hook, controla su capacidad de emisión.

- Puedes configurar bits específicos para activar o desactivar tipos usando esta [calculadora](https://richardah.github.io/xrpl-hookon-calculator/)
- Si marcamos solo que se permita emisión de transacciones de pago, el resultado en la calculadora es \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. Debemos eliminar la parte de \`0x\`y pasar el resultado a mayúsculas para usarlo en el campo \`HookCanEmit\`. Por ejemplo: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Aunque \`HookCanEmit\` es un campo opcional, se recomienda utilizarlo para no permitir que un Hook emita transacciones no deseadas, ya que esto puede generar acciones no desesadas de un Hook malicioso.

**¿Por qué es importante para la seguridad?**

- **Principio de mínimo privilegio**: Un Hook debería tener solo los permisos que necesita. Si tu Hook solo necesita enviar pagos, no debería poder emitir \`SetHook\`, \`AccountDelete\` u otras transacciones sensibles.
- **Protección ante bugs**: Si un Hook tiene una vulnerabilidad, \`HookCanEmit\` limita el daño potencial al restringir las acciones que puede ejecutar.
- **Auditoría y transparencia**: Al revisar un Hook instalado en una cuenta, \`HookCanEmit\` permite verificar rápidamente qué operaciones puede realizar de forma autónoma.
- **Buena práctica**: Siempre configura \`HookCanEmit\` con el conjunto mínimo de transacciones necesarias para la lógica de tu Hook.

### Más información

Para una referencia completa de \`SetHook\`, incluyendo todos los campos, flags, reglas de validación y casos especiales, consulta la [documentación oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/).`,
        pt: `Depois que você tem seu Hook escrito em C, você precisa **compilá-lo a WebAssembly** e **fazer deploy dele** em sua conta de Xahau por meio de uma transação \`SetHook\`.
### Opções de desenvolvimento
**1. Hooks Builder (Online)**
A forma mais rápida de começar. [builder.xahau.network](https://builder.xahau.network) permite que você escrever, compilar e fazer deploy de Hooks a partir do navegador. Inclui exemplos, documentação e um ambiente de desenvolvimento integrado. Ideal para testes rápidos e aprendizado. Disponível apenas para **Xahau Testnet**.
**2. Desenvolvimento local**
Para desenvolvimento local (e posteriormente Xahau Mainnet) você precisa [hooks-toolkit](https://hooks-toolkit.com/), inclui uma biblioteca completa para poder compilar seus hooks e fazer deploy deles com scripts personalizados.
### Fazer deploy de um Hook
Depois que você tem um Hook pronto para fazer deploy, o processo geral é gerar uma transação \`SetHook\` com os campos adequados, assiná-la e enviá-la à rede. O campo principal para o código do Hook é \`CreateCode\`, onde você deve incluir o binário WASM em formato hexadecimal se for a primeira vez que este Hook vai existir na rede.
Os ambientes de teste como [Hooks Builder](https://builder.xahau.network) permitem que você compile o código e enviá-lo usando uma interface gráfica. Existem outros ambientes gráficos tanto para Xahau Testnet como Mainnet, que obrigarão você a usar sua seed para assinar a transação de deploy, como [xahau-testnet.xrplwin.com/tools](https://xahau-testnet.xrplwin.com/tools). Recomenda-se usá-los apenas em ambiente de testes. Como prática habitual, recomenda-se aprender a utilizar a transação \`SetHook\` com scripts personalizados usando a biblioteca de \`xahau js\`, para posteriormente poder automatizar deploys, atualizações e gestão de Hooks em produção.
### Transação SetHook
A transação \`SetHook\` é a única transação necessária para gerenciar Hooks. Com ela você pode **instalar**, **atualizar** e **remover** Hooks da sua conta. Os campos principais do objeto Hook dentro do array \`Hooks\` são:
| Campo | Descrição |
|---|---|
| \`CreateCode\` | O binário WASM do Hook (em hexadecimal) |
| \`HookHash\` | Hash do Hook já existente no ledger (alternativa a CreateCode) |
| \`HookOn\` | String que define quais tipos de transação ativam o Hook |
| \`HookNamespace\` | Nome para o estado do Hook (32 bytes hex) |
| \`HookApiVersion\` | Versão da API de Hooks (atualmente 0) |
| \`HookParameters\` | Parâmetros de configuração opcionais |
| \`HookCanEmit\` | Lista de transações que o Hook pode emitir (segurança) |
| \`Flags\` | Flags de controle (\`hsfOverride\`, \`hsfNSDelete\`, \`hsfCollect\`) |
### Fases de gestão de um Hook
### 1. Instalar um Hook por primeira vez (com CreateCode)
Quando faz deploy de um Hook novo que nunca existiu na rede, você usa o campo \`CreateCode\` com o binário WASM completo. O nó calcula o hash do WASM e armazena o código no ledger. Se outro usuário já fez deploy do mesmo código exato, Xahau reutiliza a definição existente (deduplicação automática).
\`\`\`
Hook: {
  CreateCode: "0061736D...",     // WASM em hex
  HookOn: "0000000000000000",    // Todos os tipos de tx
  HookNamespace: "00...00",      // 64 chars hex
  HookApiVersion: 0,
  Flags: 1,                      // hsfOverride
}
\`\`\`
### 2. Instalar um Hook existente por HookHash
Se um Hook já teve deploy feito antes (para você ou por outra conta), você pode instalá-lo em sua conta **sem enviar todo o WASM outra vez**. Você só precisa do \`HookHash\` (o hash SHA-256 do binário). Isso economiza espaço e fees.
\`\`\`
Hook: {
  HookHash: "A5B6C7D8...",      // Hash do Hook existente
  HookOn: "0000000000000000",
  HookNamespace: "00...00",
  Flags: 1,                      // hsfOverride
}
\`\`\`
O \`HookHash\` você pode obtê-lo consultando os Hooks de uma conta com \`account_objects\` ou desde um explorador de blocos como [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com).
### 3. Atualizar um Hook (Update Operation)
A operação de atualização é ativada quando o Hook já existe na posição, **não** se envia \`HookHash\` nem \`CreateCode\`, e ela é incluída ao menos um destes campos: \`HookNamespace\`, \`HookParameters\` ou \`HookGrants\`. Isso permite modificar a configuração do Hook **sem substituir o código WASM**.
**O que você pode modificar**:
- **HookNamespace**: Se você enviar um \`HookNamespace\` diferente ao atual, o namespace do Hook é atualizado. Se você também incluir o flag \`hsfNSDelete\` (valor 2), **todas as entradas de estado do namespace anterior são eliminadas**.
- **HookParameters**: Para cada entrada em \`HookParameters\`:
  - Se você enviar um parâmetro com nome e **sem valor**, esse parâmetro é **removido** do Hook
  - Se você enviar um parâmetro com nome **e valor**, esse parâmetro é **adicionado ou atualizado**
- **HookGrants**: Se você incluir \`HookGrants\`, o array completo de grants do Hook é **substituído** pelo novo array fornecido
\`\`\`
// Exemplo: atualizar apenas os parâmetros de um Hook existente
Hook: {
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "4D494E",        // "MIN"
        HookParameterValue: "00E1F505"      // Novo valor
      }
    },
    {
      HookParameter: {
        HookParameterName: "4D4158",        // "MAX" — eliminar
        // Sem HookParameterValue = é removido
      }
    }
  ]
}
\`\`\`
**Para substituir completamente um Hook** por outro código WASM diferente, envie um novo \`SetHook\` com \`CreateCode\` (ou \`HookHash\`) na mesma posição e o flag \`hsfOverride\` (valor 1). O estado anterior do Hook é **mantido** se o namespace não mudar.
### 4. Remover um Hook (Delete Operation)
Para remover um Hook de uma posição, devem ser cumpridas estas condições: o Hook deve existir nessa posição, o flag \`hsfOverride\` deve estar ativo, **não** se envia \`HookHash\`, e \`CreateCode\` deve estar presente mas **vazio**:
\`\`\`
Hook: {
  CreateCode: "",       // Vazio = eliminar
  Flags: 1,             // hsfOverride
}
\`\`\`
Ao eliminar:
- O **contador de referências** do \`HookDefinition\` é decrementado. Se chegar a zero (nenhuma outra conta usa esse código), a definição é removida do ledger
- O objeto Hook nessa posição é **removido**, deixando a posição vazia
Se você também quiser **limpar todo o estado** do namespace de esse Hook, adicione o flag \`hsfNSDelete\` (valor 2) combinado com \`hsfOverride\`: \`Flags: 3\`. Isso eliminará todas as entradas de \`HookState\` do namespace associado.
### Flags de SetHook
| Flag | Valor | Descrição |
|---|---|---|
| \`hsfOverride\` | 1 | Permite substituir ou remover um Hook existente nessa posição |
| \`hsfNSDelete\` | 2 | Remove todo o estado do namespace ao desinstalar |
| \`hsfCollect\` | 4 | Permite execução como weakTSH |
### HookOn: Filtro de transações
O campo \`HookOn\` controla em quais tipos de transação se ativa o Hook:
- Você pode configurar bits específicos para ativar ou desativar tipos usando esta [calculadora](https://richardah.github.io/xrpl-hookon-calculator/)
- Se marcarmos apenas que ele seja ativado em transações de pagamento, o Hook só será executado quando a conta receber ou enviar um pagamento. O resultado na calculadora é \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. Devemos eliminar a parte de \`0x\`e passar o resultado para maiúsculas para usá-lo no campo HookOn. Por exemplo: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Se podem marcar várias transações à vez. Recomenda-se cautela ao configurar HookOn para não ativar o Hook em tipos de transação que você não precisa, já que isso pode gerar fees innecessários e aumentar o risco de ações inesperadas.
### HookCanEmit: Controle de emissão de transações
O campo \`HookCanEmit\` é um mecanismo de segurança fundamental que limita quais transações um Hook pode emitir. Por padrão, um Hook tem a capacidade de emitir transações autônomas (usando a função \`emit()\`), o que poderia representar um risco se o Hook tiver um bug ou tiver sido instalado sem revisão do código.
\`HookCanEmit\` é um array que define explicitamente quais tipos de transação o Hook pode emitir. Se estiver configurado, o Hook **só poderá emitir as transações listadas**; qualquer tentativa de emitir um tipo não incluído será rejeitada pela rede. Funciona como o \`HookOn\`, mas, em vez de controlar a ativação do Hook, controla sua capacidade de emissão.
- Você pode configurar bits específicos para ativar ou desativar tipos usando esta [calculadora](https://richardah.github.io/xrpl-hookon-calculator/)
- Se marcarmos apenas a emissão de transações de pagamento, o resultado na calculadora é \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. Devemos remover a parte \`0x\` e passar o resultado para maiúsculas para usá-lo no campo \`HookCanEmit\`. Por exemplo: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Embora \`HookCanEmit\` é um campo opcional, se recomienda utilizarlo para não permitir que um Hook emita transações indesejadas, já que isso pode gerar ações indesejadas de um Hook malicioso.
**Por que é importante para a segurança?**
- **Princípio do menor privilégio**: um Hook deve ter apenas as permissões de que precisa. Se seu Hook só precisa enviar pagamentos, não deve poder emitir \`SetHook\`, \`AccountDelete\` ou outras transações sensíveis.
- **Proteção contra bugs**: se um Hook tiver uma vulnerabilidade, \`HookCanEmit\` limita o dano potencial ao restringir as ações que ele pode executar.
- **Auditoria e transparência**: ao revisar um Hook instalado em uma conta, \`HookCanEmit\` permite verificar rapidamente quais operações ele pode realizar de forma autônoma.
- **Boa prática**: configure sempre \`HookCanEmit\` com o conjunto mínimo de transações necessárias para a lógica do seu Hook.
### Mais informação
Para uma referência completa de \`SetHook\`, incluindo todos os campos, flags, regras de validação e casos especiais, consulte a [documentação oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/).`,
        en: `Once you have your Hook written in C, you need to **compile it to WebAssembly** and **deploy it** to your Xahau account via a \`SetHook\` transaction.

### Development options

**1. Hooks Builder (Online)**
The fastest way to get started. [builder.xahau.network](https://builder.xahau.network) lets you write, compile and deploy Hooks from the browser. It includes examples, documentation and an integrated development environment. Ideal for quick tests and learning. Only available for **Xahau Testnet**.

**2. Local development**
For local development (and later Xahau Mainnet) you need [hooks-toolkit](https://hooks-toolkit.com/), which includes a complete library to compile your hooks and deploy them with custom scripts.

### Deploying a Hook

Once you have a hook ready to deploy, the general process is to generate a \`SetHook\` transaction with the appropriate fields, sign it and send it to the network. The main field for the Hook code is \`CreateCode\`, where you must include the WASM binary in hexadecimal format if this is the first time this Hook will exist on the network.

Testing environments like [Hooks Builder](https://builder.xahau.network) allow you to compile the code and upload it using a graphical interface. Other graphical environments exist for both Xahau Testnet and Mainnet, which require you to use your seed to sign the deployment transaction, such as [xahau-testnet.xrplwin.com/tools](https://xahau-testnet.xrplwin.com/tools). These are only recommended for test environments. As a common practice, it is recommended to learn how to use the \`SetHook\` transaction with custom scripts using the \`xahau js\` library, to later automate deployments, updates and Hook management in production.

### SetHook transaction

The \`SetHook\` transaction is the only transaction needed to manage Hooks. With it you can **install**, **update** and **delete** Hooks from your account. The main fields of the Hook object within the \`Hooks\` array are:

| Field | Description |
|---|---|
| \`CreateCode\` | The Hook WASM binary (in hexadecimal) |
| \`HookHash\` | Hash of an already existing Hook in the ledger (alternative to CreateCode) |
| \`HookOn\` | String defining which transaction types activate the Hook |
| \`HookNamespace\` | Name for the Hook state (32 bytes hex) |
| \`HookApiVersion\` | Hooks API version (currently 0) |
| \`HookParameters\` | Optional configuration parameters |
| \`HookCanEmit\` | List of transactions the Hook can emit (security) |
| \`Flags\` | Control flags (\`hsfOverride\`, \`hsfNSDelete\`, \`hsfCollect\`) |

### Hook management phases

### 1. Install a Hook for the first time (with CreateCode)

When you deploy a new Hook that has never existed on the network, you use the \`CreateCode\` field with the full WASM binary. The node calculates the WASM hash and stores the code in the ledger. If another user already deployed the exact same code, Xahau reuses the existing definition (automatic deduplication).

\`\`\`
Hook: {
  CreateCode: "0061736D...",     // WASM in hex
  HookOn: "0000000000000000",    // All tx types
  HookNamespace: "00...00",      // 64 chars hex
  HookApiVersion: 0,
  Flags: 1,                      // hsfOverride
}
\`\`\`

### 2. Install an existing Hook by HookHash

If a Hook was already deployed before (by you or another account), you can install it on your account **without sending the entire WASM again**. You only need the \`HookHash\` (the SHA-256 hash of the binary). This saves space and fees.

\`\`\`
Hook: {
  HookHash: "A5B6C7D8...",      // Hash of existing Hook
  HookOn: "0000000000000000",
  HookNamespace: "00...00",
  Flags: 1,                      // hsfOverride
}
\`\`\`

You can get the \`HookHash\` by querying an account's Hooks with \`account_objects\` or from a block explorer like [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com).

### 3. Update a Hook (Update Operation)

The update operation is triggered when the Hook already exists at the position, **no** \`HookHash\` or \`CreateCode\` is sent, and at least one of these fields is included: \`HookNamespace\`, \`HookParameters\` or \`HookGrants\`. This allows modifying the Hook configuration **without replacing the WASM code**.

**What you can modify**:

- **HookNamespace**: If you send a different \`HookNamespace\` than the current one, the Hook's namespace is updated. If you also include the \`hsfNSDelete\` flag (value 2), **all state entries from the previous namespace are deleted**.
- **HookParameters**: For each entry in \`HookParameters\`:
  - If you send a parameter with a name and **no value**, that parameter is **deleted** from the Hook
  - If you send a parameter with a name **and value**, that parameter is **added or updated**
- **HookGrants**: If you include \`HookGrants\`, the Hook's full grants array is **replaced** by the new array provided

\`\`\`
// Example: update only the parameters of an existing Hook
Hook: {
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "4D494E",        // "MIN"
        HookParameterValue: "00E1F505"      // New value
      }
    },
    {
      HookParameter: {
        HookParameterName: "4D4158",        // "MAX" — delete
        // No HookParameterValue = deleted
      }
    }
  ]
}
\`\`\`

**To completely replace a Hook** with different WASM code, send a new \`SetHook\` with \`CreateCode\` (or \`HookHash\`) at the same position and the \`hsfOverride\` flag (value 1). The previous Hook state is **maintained** if the namespace doesn't change.

### 4. Delete a Hook (Delete Operation)

To delete a Hook from a position, these conditions must be met: the Hook must exist at that position, the \`hsfOverride\` flag must be active, **no** \`HookHash\` is sent, and \`CreateCode\` must be present but **empty**:

\`\`\`
Hook: {
  CreateCode: "",       // Empty = delete
  Flags: 1,             // hsfOverride
}
\`\`\`

Upon deletion:
- The **reference counter** of the \`HookDefinition\` is decremented. If it reaches zero (no other account uses that code), the definition is removed from the ledger
- The Hook object at that position is **deleted**, leaving the position empty

If you also want to **clean all state** from that Hook's namespace, add the \`hsfNSDelete\` flag (value 2) combined with \`hsfOverride\`: \`Flags: 3\`. This will delete all \`HookState\` entries from the associated namespace.

### SetHook Flags

| Flag | Value | Description |
|---|---|---|
| \`hsfOverride\` | 1 | Allows replacing or deleting an existing Hook at that position |
| \`hsfNSDelete\` | 2 | Deletes all namespace state upon uninstall |
| \`hsfCollect\` | 4 | Allow execution as weakTSH. |

### HookOn: Transaction filter

The \`HookOn\` field controles which transaction types activate the Hook:
- You can configure specific bits to enable or disable types using this [calculator](https://richardah.github.io/xrpl-hookon-calculator/)
- If we mark only activation on payment transactions, the Hook will only execute when the account receives or sends a payment. The result in the calculator is \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. We must remove the \`0x\` part and convert the result to uppercase to use it in the HookOn field. For example: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Multiple transactions can be marked at once. Caution is recommended when configuring HookOn to avoid activating the Hook on transaction types you don't need, as this can generate unnecessary fees and increase the risk of unexpected actions.

### HookCanEmit: Transaction emission controle

The \`HookCanEmit\` field is a fundamental security mechanism that limits which transactions a Hook can emit. By default, a Hook has the ability to emit autonomous transactions (using the \`emit()\` function), which could represent a risk if the Hook has a bug or was installed without reviewing its code.

\`HookCanEmit\` is an array that explicitly defines which transaction types the Hook can emit. If configured, the Hook **can only emit the listed transactions**, and any attempt to emit a type not included will be rejected by the network. It works just like \`HookOn\`, but instead of controleling Hook activation, it controles its emission capability.

- You can configure specific bits to enable or disable types using this [calculator](https://richardah.github.io/xrpl-hookon-calculator/)
- If we mark only emission of payment transactions, the calculator result is \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. We must remove the \`0x\` part and convert to uppercase to use it in the \`HookCanEmit\` field. For example: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Although \`HookCanEmit\` is an optional field, it is recommended to use it to prevent a Hook from emitting unwanted transactions, as this can generate unwanted actions from a malicious Hook.

**Why is it important for security?**

- **Principle of least privilege**: A Hook should only have the permissions it needs. If your Hook only needs to send payments, it shouldn't be able to emit \`SetHook\`, \`AccountDelete\` or other sensitive transactions.
- **Protection against bugs**: If a Hook has a vulnerability, \`HookCanEmit\` limits the potential damage by restricting the actions it can execute.
- **Audit and transparency**: When reviewing a Hook installed on an account, \`HookCanEmit\` allows quickly verifying what operations it can perform autonomously.
- **Best practice**: Always configure \`HookCanEmit\` with the minimum set of transactions necessary for your Hook's logic.

### More information

For a complete reference on \`SetHook\`, including all fields, flags, validation rules and special cases, see the [official documentation](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/).`,
        jp: `CでHookを記述したら、**WebAssemblyにコンパイル**し、\`SetHook\`トランザクションを使ってXahauアカウントに**デプロイ**する必要があります。

### 開発オプション

**1. Hooks Builder（オンライン）**
最も早く始められる方法。[builder.xahau.network](https://builder.xahau.network) ではブラウザからHooksを記述、コンパイル、デプロイできます。例、ドキュメント、統合開発環境が含まれています。クイックテストと学習に最適。**Xahau Testnet**専用。

**2. ローカル開発**
ローカル開発（Xahau Mainnetへのデプロイを含む）には[hooks-toolkit](https://hooks-toolkit.com/)が必要です。Hooksのコンパイルとカスタムスクリプトでのデプロイに必要な完全なライブラリが含まれています。

### Hookのデプロイ

デプロイ可能なHookが準備できたら、一般的なプロセスは適切なフィールドを持つ\`SetHook\`トランザクションを生成し、署名してネットワークに送信することです。Hookコードの主なフィールドは\`CreateCode\`で、このHookがネットワークに初めて存在する場合はWASMバイナリを16進数形式で含める必要があります。

[Hooks Builder](https://builder.xahau.network)のようなテスト環境では、グラフィカルインターフェースを使ってコードをコンパイルしてアップロードできます。Xahau TestnetとMainnet両方向けのグラフィカル環境が存在し、デプロイトランザクションに署名するためにシードの使用が必要です（[xahau-testnet.xrplwin.com/tools](https://xahau-testnet.xrplwin.com/tools)など）。これらはテスト環境のみで推奨されます。一般的な実践として、\`xahau js\`ライブラリを使用したカスタムスクリプトで\`SetHook\`トランザクションの使い方を習得し、後でデプロイ、アップデート、本番環境でのHook管理を自動化できるようにすることを推奨します。

### SetHookトランザクション

\`SetHook\`トランザクションはHookを管理するために必要な唯一のトランザクションです。これを使ってアカウントのHooksを**インストール**、**更新**、**削除**できます。\`Hooks\`配列内のHookオブジェクトの主なフィールドは次のとおりです。

| フィールド | 説明 |
|---|---|
| \`CreateCode\` | HookのWASMバイナリ（16進数） |
| \`HookHash\` | レジャーに既存のHookのハッシュ（CreateCodeの代替） |
| \`HookOn\` | Hookを起動するトランザクションタイプを定義する文字列 |
| \`HookNamespace\` | Hookステートの名前（32バイトhex） |
| \`HookApiVersion\` | Hooks APIバージョン（現在は0） |
| \`HookParameters\` | オプションの設定パラメーター |
| \`HookCanEmit\` | Hookが発行できるトランザクションのリスト（セキュリティ） |
| \`Flags\` | 制御フラグ（\`hsfOverride\`、\`hsfNSDelete\`、\`hsfCollect\`） |

### Hooksの管理フェーズ

### 1. Hookを初めてインストールする（CreateCodeを使用）

ネットワークに存在したことのない新しいHookをデプロイする場合、完全なWASMバイナリとともに\`CreateCode\`フィールドを使用します。ノードはWASMハッシュを計算してコードをレジャーに保存します。別のユーザーが全く同じコードをすでにデプロイしていた場合、Xahauは既存の定義を再利用します（自動重複排除）。

\`\`\`
Hook: {
  CreateCode: "0061736D...",     // WASMをhex形式で
  HookOn: "0000000000000000",    // すべてのtxタイプ
  HookNamespace: "00...00",      // 64文字hex
  HookApiVersion: 0,
  Flags: 1,                      // hsfOverride
}
\`\`\`

### 2. HookHashで既存のHookをインストールする

Hookが以前にデプロイされていた場合（あなたまたは別のアカウントによって）、**WASM全体を再送信せずに**アカウントにインストールできます。\`HookHash\`（バイナリのSHA-256ハッシュ）だけが必要です。これによりスペースと手数料を節約できます。

\`\`\`
Hook: {
  HookHash: "A5B6C7D8...",      // 既存Hookのハッシュ
  HookOn: "0000000000000000",
  HookNamespace: "00...00",
  Flags: 1,                      // hsfOverride
}
\`\`\`

\`HookHash\`は\`account_objects\`でアカウントのHooksを照会するか、[xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)のようなブロックエクスプローラーから取得できます。

### 3. Hookを更新する（Update操作）

更新操作は、Hookがその位置に既に存在し、\`HookHash\`も\`CreateCode\`も送信せず、\`HookNamespace\`、\`HookParameters\`、\`HookGrants\`のいずれかを含める場合にトリガーされます。これにより**WASMコードを置き換えずに**Hookの設定を変更できます。

**変更できる内容**：

- **HookNamespace**：現在とは異なる\`HookNamespace\`を送信すると、HookのNamespaceが更新されます。\`hsfNSDelete\`フラグ（値2）も含める場合、**前のNamespaceのすべてのステートエントリが削除されます**。
- **HookParameters**：\`HookParameters\`の各エントリについて：
  - 名前だけで**値なし**のパラメーターを送信すると、そのパラメーターはHookから**削除される**
  - 名前**と値**があるパラメーターを送信すると、そのパラメーターは**追加または更新される**
- **HookGrants**：\`HookGrants\`を含める場合、HookのGrantsの完全な配列が提供された新しい配列に**置き換えられる**

\`\`\`
// 例：既存のHookのパラメーターのみを更新する
Hook: {
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "4D494E",        // "MIN"
        HookParameterValue: "00E1F505"      // 新しい値
      }
    },
    {
      HookParameter: {
        HookParameterName: "4D4158",        // "MAX" — 削除
        // HookParameterValueなし = 削除される
      }
    }
  ]
}
\`\`\`

**Hookを完全に置き換える**には、同じ位置に新しい\`SetHook\`を\`CreateCode\`（または\`HookHash\`）と\`hsfOverride\`フラグ（値1）とともに送信します。Namespaceが変わらない場合、前のHookステートは**維持されます**。

### 4. Hookを削除する（Delete操作）

配列の特定の位置のHookを削除するには、次の条件を満たす必要があります。その位置にHookが存在すること、\`hsfOverride\`フラグが有効であること、\`HookHash\`を設定しないこと、\`CreateCode\`が存在するが**空**であること。

\`\`\`
Hook: {
  CreateCode: "",       // 空 = 削除
  Flags: 1,             // hsfOverride
}
\`\`\`

削除時：
- \`HookDefinition\`の**参照カウンター**が減少します。ゼロに達すると（そのコードを使用している他のアカウントがない）、\`HookDefinition\`はレジャーから削除されます
- その位置のHookオブジェクトが**削除**され、その位置が空になります

そのHookのNamespaceからすべてのステートを**クリア**したい場合は、\`hsfNSDelete\`フラグ（値2）と\`hsfOverride\`を組み合わせて追加します：\`Flags: 3\`。これにより関連するNamespaceのすべての\`HookState\`エントリが削除されます。

### SetHookフラグ

| フラグ | 値 | 説明 |
|---|---|---|
| \`hsfOverride\` | 1 | その位置の既存のHookを置き換えまたは削除することを許可する |
| \`hsfNSDelete\` | 2 | アンインストール時にNamespaceのすべてのステートを削除する |
| \`hsfCollect\` | 4 | weakTSHとしての実行を許可する |

### HookOn：トランザクションフィルター

\`HookOn\`フィールドは、Hookがどのトランザクションタイプで起動するかを制御します。
- この[HookOn計算機](https://richardah.github.io/xrpl-hookon-calculator/)を使って特定のビットを設定してHookを実行するトランザクションタイプを有効または無効にできます
- Paymentトランザクションのみで起動するように設定すると、アカウントが支払いを受信または送信したときにのみHookが実行されます。この場合、計算機の結果は\`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`です。\`0x\`の部分を削除し、結果を大文字に変換してHookOnフィールドで使用します。例：\`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`。
- 複数のトランザクションを同時にマークできます。不要なトランザクションタイプでHookが起動しないようにHookOnの設定には注意が必要です。これにより不要な手数料が発生し、予期しないアクションのリスクが増加する可能性があります。

### HookCanEmit：トランザクション発行の制御

\`HookCanEmit\`フィールドは、Hookが発行できるトランザクションを制限する基本的なセキュリティメカニズムです。デフォルトでは、Hookは自律的なトランザクションを発行する能力があります（\`emit()\`関数を使用）が、Hookにバグがあったりコードをレビューせずにインストールされた場合にリスクとなる可能性があります。

\`HookCanEmit\`は、Hookが発行できるトランザクションタイプを明示的に定義する配列です。設定されている場合、Hookは**リストされたトランザクションのみを発行でき**、含まれていないタイプを発行しようとするとネットワークによって拒否されます。\`HookOn\`と同様に機能しますが、Hookの起動を制御する代わりに発行能力を制御します。

- HookOnと同じ[計算機](https://richardah.github.io/xrpl-hookon-calculator/)を使って特定のビットを設定してemitを許可するトランザクションタイプを有効または無効にできます
- Paymentトランザクションの発行のみを許可するようにマークすると、計算機の結果は\`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`です。\`0x\`の部分を削除し、結果を大文字に変換して\`HookCanEmit\`フィールドで使用します。例：\`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`。
- \`HookCanEmit\`は任意フィールドですが、悪意のあるHookからの望ましくないアクションを防ぐために使用することが推奨されます。

**なぜセキュリティに重要か？**

- **最小権限の原則**：Hookは必要な権限のみを持つべきです。Hookが支払いの送信のみが必要な場合、\`SetHook\`、\`AccountDelete\`やその他の**重要度が高い**トランザクションを発行できるべきではありません。
- **バグに対する保護**：Hookに脆弱性がある場合、\`HookCanEmit\`は実行できるアクションを制限することで潜在的な被害を制限します。
- **監査と透明性**：アカウントにインストールされたHookをレビューする際、\`HookCanEmit\`により自律的に実行できる操作を迅速に確認できます。
- **ベストプラクティス**：Hookのロジックに必要な最小限のトランザクションセットで\`HookCanEmit\`を常に設定します。

### 詳細情報

すべてのフィールド、フラグ、バリデーションルール、特殊ケースを含む\`SetHook\`の完全なリファレンスについては、[公式ドキュメント](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/)をご覧ください。`,
        ko: `Hook을 작성한 뒤에는 **WebAssembly로 컴파일**하고 \`SetHook\` 트랜잭션으로 계정에 **배포**해야 합니다.

### 일반적인 흐름

1. Hook 코드를 작성
2. WASM으로 컴파일
3. \`HookOn\`, \`HookNamespace\`, \`HookParameters\` 등 설정
4. \`SetHook\` 제출
5. 계정 객체나 익스플로러에서 설치 확인

### 중요한 필드

- \`CreateCode\`: 처음 배포할 때 WASM 바이너리
- \`HookHash\`: 이미 존재하는 Hook 재사용
- \`HookOn\`: 어떤 트랜잭션이 Hook을 실행할지
- \`HookCanEmit\`: 어떤 트랜잭션을 발행할 수 있는지
- \`HookNamespace\`: 상태를 분리하는 네임스페이스
- \`Flags\`: 덮어쓰기, 삭제 등 제어 옵션

### 관리 작업

- 새 Hook 설치
- 기존 HookHash로 설치
- 파라미터나 namespace 업데이트
- 빈 \`CreateCode\` 로 삭제

설정을 잘못하면 Hook이 전혀 실행되지 않거나 원하지 않는 트랜잭션에서 작동할 수 있으므로, 배포 전 필드 확인이 매우 중요합니다.`,
        zh: `写好 Hook 之后，需要先将其**编译为 WebAssembly**，再通过 \`SetHook\` 交易**部署**到账户上。

### 一般流程

1. 编写 Hook 代码
2. 编译为 WASM
3. 配置 \`HookOn\`、\`HookNamespace\`、\`HookParameters\` 等字段
4. 提交 \`SetHook\`
5. 通过账户对象或区块浏览器确认是否安装成功

### 重要字段

- \`CreateCode\`：首次部署时使用的 WASM 二进制
- \`HookHash\`：复用已经存在的 Hook
- \`HookOn\`：决定哪些交易会触发 Hook
- \`HookCanEmit\`：决定它可以发出哪些交易
- \`HookNamespace\`：用于隔离状态的命名空间
- \`Flags\`：覆盖、删除等控制选项

### 管理操作

- 安装新的 Hook
- 通过已有 HookHash 安装
- 更新参数或 namespace
- 用空的 \`CreateCode\` 删除 Hook

如果字段配置错误，Hook 可能完全不会执行，或者会在你不希望的交易上触发，因此部署前务必仔细检查。`,
      },
      codeBlocks: [

        {
          title: {
            es: "Desplegar un Hook desde fichero .wasm con xahau.js",
            pt: "Fazer deploy de um Hook a partir de arquivo .wasm com xahau.js",
            en: "Deploy a Hook from a .wasm file with xahau.js",
            jp: "xahau.jsで.wasmファイルからHookをデプロイする",
            ko: "xahau.js로 .wasm 파일에서 Hook 배포하기",
            zh: "使用 xahau.js 从 .wasm 文件部署 Hook",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Tu cuenta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Leer el WASM compilado del Hook
  const wasmBytes = fs.readFileSync("base.wasm"); // Utiliza el nombre del fichero .wasm que quieres desplegar, https://bqsoczh.dlvr.cloud/base.wasm
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // Construir la transacción SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64), // Todos los tipos de tx
          HookCanEmit: "0".repeat(64), // Todos los tipos de tx
          HookNamespace: "0".repeat(64), // Namespace por defecto
          HookApiVersion: 0,
          Flags: 1, // Flag hsfOVERRIDE para que el nuevo hook reemplace cualquier hook anterior en la cuenta
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Hook desplegado con éxito en la cuenta!", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");
async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // Sua conta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // Ler ou WASM compilado do Hook
  const wasmBytes = fs.readFileSync("base.wasm"); // Use o nome do arquivo .wasm que você quer implantar, https://bqsoczh.dlvr.cloud/base.wasm
  const hookBinary = wasmBytes.toString("hex").toUpperCase();
  // Construir a transação SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64), // Todos os tipos de tx
          HookCanEmit: "0".repeat(64), // Todos os tipos de tx
          HookNamespace: "0".repeat(64), // Namespace padrão
          HookApiVersion: 0,
          Flags: 1, // Flag hsfOVERRIDE para que o novo hook substitua qualquer hook anterior na conta
        },
      },
    ],
  };
  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook implantado com sucesso na conta!", account.address);
  }
  await client.disconnect();
}
deployHook();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Your testnet account
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Read the compiled WASM file for the Hook
  const wasmBytes = fs.readFileSync("base.wasm"); // Use the name of the .wasm file you want to deploy, e.g., https://bqsoczh.dlvr.cloud/base.wasm
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // Build the SetHook transaction
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64), // All the types of transactions
          HookCanEmit: "0".repeat(64), // All the types of tx
          HookNamespace: "0".repeat(64), // Namespace by default
          HookApiVersion: 0,
          Flags: 1, // Flag hsfOVERRIDE so the new hook replaces any previous hook on the account
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook deployed successfully on account:", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // テストネットのアカウント
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // HookのコンパイルされたWASMファイルを読み込む
  const wasmBytes = fs.readFileSync("base.wasm"); // デプロイしたい.wasmファイル名を使用、例：https://bqsoczh.dlvr.cloud/base.wasm
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // SetHookトランザクションを構築する
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64), // すべてのtxタイプ
          HookCanEmit: "0".repeat(64), // すべてのtxタイプ
          HookNamespace: "0".repeat(64), // デフォルト名前空間
          HookApiVersion: 0,
          Flags: 1, // 新しいhookがアカウントの既存のhookを置き換えるhsfOVERRIDEフラグ
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("アカウントへのHookのデプロイに成功しました！", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 테스트넷 계정
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 컴파일된 Hook WASM 파일 읽기
  const wasmBytes = fs.readFileSync("base.wasm"); // 배포할 .wasm 파일명 사용
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // SetHook 트랜잭션 구성
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64), // 모든 tx 타입
          HookCanEmit: "0".repeat(64), // 모든 tx 타입
          HookNamespace: "0".repeat(64), // 기본 namespace
          HookApiVersion: 0,
          Flags: 1, // 기존 Hook을 덮어쓰기
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("계정에 Hook이 성공적으로 배포되었습니다!", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Testnet 账户
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 读取编译后的 Hook WASM 文件
  const wasmBytes = fs.readFileSync("base.wasm"); // 使用你要部署的 .wasm 文件名
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // 构建 SetHook 交易
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64),
          HookCanEmit: "0".repeat(64),
          HookNamespace: "0".repeat(64),
          HookApiVersion: 0,
          Flags: 1,
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook 已成功部署到账户上！", account.address);
  }

  await client.disconnect();
}

deployHook();`,
          },
        },{
          title: {
            es: "Borrar un Hook de una cuenta con xahau.js",
            pt: "Borrar um Hook de uma conta com xahau.js",
            en: "Delete a Hook from an account with xahau.js",
            jp: "xahau.jsでアカウントからHookを削除する",
            ko: "xahau.js로 계정에서 Hook 삭제하기",
            zh: "使用 xahau.js 从账户删除 Hook",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Tu cuenta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Construir la transacción SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "", // Si está vacío, se asume que quieres borrar el hook que está en esta posición del array.
          Flags: 1, // Flag hsfOVERRIDE para que el nuevo hook reemplace cualquier hook anterior en la cuenta
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Hook eliminado con éxito en la cuenta!", account.address);
  }

  await client.disconnect();
}

removeHook();`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");
async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // Sua conta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // Construir a transação SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "", // Se estiver vazio, entende-se que você quer remover o hook nesta posição do array.
          Flags: 1, // Flag hsfOVERRIDE para que o novo hook substitua qualquer hook anterior na conta
        },
      },
    ],
  };
  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook removido da conta com sucesso!", account.address);
  }
  await client.disconnect();
}
removeHook();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Your account on Testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Build the SetHook transaction
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "", // If it's empty, it assumes you want to remove the hook in this position of the array.
          Flags: 1, // Flag hsfOVERRIDE so the new hook replaces any previous hook on the account
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook successfully removed from the account!", account.address);
  }

  await client.disconnect();
}

removeHook();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // テストネットのアカウント
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // SetHookトランザクションを構築する
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "", // 空の場合、配列のこの位置のhookを削除することを意味する
          Flags: 1, // 新しいhookがアカウントの既存のhookを置き換えるhsfOVERRIDEフラグ
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("アカウントからHookを正常に削除しました！", account.address);
  }

  await client.disconnect();
}

removeHook();`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 테스트넷 계정
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // SetHook 트랜잭션 구성
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "", // 비어 있으면 이 위치의 Hook 삭제
          Flags: 1, // 기존 Hook 덮어쓰기 허용
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("계정에서 Hook이 정상적으로 삭제되었습니다!", account.address);
  }

  await client.disconnect();
}

removeHook();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "",
          Flags: 1,
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook 已成功从账户中删除！", account.address);
  }

  await client.disconnect();
}

removeHook();`,
          },
        },
        {
          title: {
            es: "Instalar un Hook con el HookHash con xahau.js",
            pt: "Instalar um Hook com ou HookHash com xahau.js",
            en: "Install a Hook by HookHash with xahau.js",
            jp: "xahau.jsでHookHashによりHookをインストールする",
            ko: "xahau.js로 HookHash를 이용해 Hook 설치하기",
            zh: "使用 xahau.js 通过 HookHash 安装 Hook",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Tu cuenta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Construir la transacción SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227", // El hash del hook que queremos instalar. Es necesario que se haya instalado previamente y esté disponible en la red en la que trabajamos.
          HookOn: "0".repeat(64), // Todos los tipos de tx
          HookCanEmit: "0".repeat(64), // Todos los tipos de tx
          HookNamespace: "0".repeat(64), // Namespace por defecto
          Flags: 1, // Flag hsfOVERRIDE para que el nuevo hook reemplace cualquier hook anterior en la cuenta
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Hook desplegado con éxito en la cuenta!", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");
async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // Sua conta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // Construir a transação SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227", // O hash do hook a instalar. Ele já precisa ter sido instalado antes e estar disponível na rede usada.
          HookOn: "0".repeat(64), // Todos os tipos de tx
          HookCanEmit: "0".repeat(64), // Todos os tipos de tx
          HookNamespace: "0".repeat(64), // Namespace padrão
          Flags: 1, // Flag hsfOVERRIDE para que o novo hook substitua qualquer hook anterior na conta
        },
      },
    ],
  };
  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook implantado com sucesso na conta!", account.address);
  }
  await client.disconnect();
}
deployHook();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Your Testnet account
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Build your SetHook transaction
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227", // The hook's hash. It must be installed previously and available in the network we are working on.
          HookOn: "0".repeat(64), // All transaction types
          HookCanEmit: "0".repeat(64), // All transaction types
          HookNamespace: "0".repeat(64), // Default namespace
          Flags: 1, // Flag hsfOVERRIDE to replace any previous hook in the account
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook installed successfully on account:", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // テストネットのアカウント
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // SetHookトランザクションを構築する
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227", // インストールしたいhookのハッシュ。ネットワークに既にデプロイされている必要がある
          HookOn: "0".repeat(64), // すべてのtxタイプ
          HookCanEmit: "0".repeat(64), // すべてのtxタイプ
          HookNamespace: "0".repeat(64), // デフォルト名前空間
          Flags: 1, // 新しいhookがアカウントの既存のhookを置き換えるhsfOVERRIDEフラグ
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("アカウントへのHookのインストールに成功しました！", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 테스트넷 계정
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // SetHook 트랜잭션 구성
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227", // 네트워크에 이미 존재하는 Hook 해시
          HookOn: "0".repeat(64), // 모든 tx 타입
          HookCanEmit: "0".repeat(64), // 모든 tx 타입
          HookNamespace: "0".repeat(64), // 기본 namespace
          Flags: 1, // 기존 Hook 덮어쓰기 허용
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("계정에 Hook이 성공적으로 설치되었습니다!", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227",
          HookOn: "0".repeat(64),
          HookCanEmit: "0".repeat(64),
          HookNamespace: "0".repeat(64),
          Flags: 1,
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook 已成功安装到账户上！", account.address);
  }

  await client.disconnect();
}

deployHook();`,
          },
        },
        {
          title: {
            es: "Verificar los Hooks instalados en una cuenta",
            pt: "Verificar os Hooks instalados em uma conta",
            en: "Check installed Hooks on an account",
            jp: "アカウントにインストールされたHooksを確認する",
            ko: "계정에 설치된 Hook 확인하기",
            zh: "检查账户上已安装的 Hook",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });

  const hooks = response.result.account_objects;
  console.log(\`=== Hooks de \${address} ===\`);
  console.log(\`Total instalados: \${hooks.length}
\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); //Si quieres ver toda la info del hook, descomenta esta línea

    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;
      // Los campos que el SetHook no incluyó vienen de la HookDefinition
      const def = (await client.request({ command: "ledger_entry", hook_definition: installedHook.HookHash })).result.node;

      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn ?? def.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace ?? def.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit ?? def.HookCanEmit ?? "-"}\`);
    }

    console.log();
  }

  await client.disconnect();
}
// Una dirección de ejemplo con un Hook en Testnet: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
// La cuenta a consultar: el primer argumento, o WALLET de .env
checkHooks(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });
  const hooks = response.result.account_objects;
  console.log(\`=== Hooks de \${address} ===\`);
  console.log(\`Total instalados: \${hooks.length}
\`);
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); //Se você quiser ver todà info do hook, descomenta esta linha
    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;
      // Os campos que o SetHook não incluiu vêm da HookDefinition
      const def = (await client.request({ command: "ledger_entry", hook_definition: installedHook.HookHash })).result.node;
      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn ?? def.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace ?? def.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit ?? def.HookCanEmit ?? "-"}\`);
    }
    console.log();
  }
  await client.disconnect();
}
// Um endereço de exemplo com um Hook em Testnet: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
// A conta a consultar: o primeiro argumento, ou a WALLET do .env
checkHooks(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });

  const hooks = response.result.account_objects;
  console.log(\`=== Hooks of \${address} ===\`);
  console.log(\`Total installed: \${hooks.length}
\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); //If you want to see all hook info, uncomment this line

    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;
      // Fields the SetHook left out come from the HookDefinition
      const def = (await client.request({ command: "ledger_entry", hook_definition: installedHook.HookHash })).result.node;

      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn ?? def.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace ?? def.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit ?? def.HookCanEmit ?? "-"}\`);
    }

    console.log();
  }

  await client.disconnect();
}
// Example addres with a Hook in Testnet: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
// The account to inspect: the first argument, or WALLET from .env
checkHooks(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });

  const hooks = response.result.account_objects;
  console.log(\`=== \${address} のHooks ===\`);
  console.log(\`合計インストール数: \${hooks.length}
\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); // hookの全情報を見たい場合はこの行をコメント解除

    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;
      // SetHook で省略したフィールドは HookDefinition から取得します
      const def = (await client.request({ command: "ledger_entry", hook_definition: installedHook.HookHash })).result.node;

      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn ?? def.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace ?? def.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit ?? def.HookCanEmit ?? "-"}\`);
    }

    console.log();
  }

  await client.disconnect();
}
// TestnetでHookを持つアドレスの例: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
// 調べるアカウント：最初の引数、または .env の WALLET
checkHooks(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });

  const hooks = response.result.account_objects;
  console.log(\`=== \${address} 의 Hooks ===\`);
  console.log(\`설치된 총 수: \${hooks.length}
\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); // 전체 정보를 보려면 주석 해제

    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;
      // SetHook에서 생략한 필드는 HookDefinition에서 가져옵니다
      const def = (await client.request({ command: "ledger_entry", hook_definition: installedHook.HookHash })).result.node;

      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn ?? def.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace ?? def.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit ?? def.HookCanEmit ?? "-"}\`);
    }

    console.log();
  }

  await client.disconnect();
}
// Testnet 예시 주소: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
// 조회할 계정: 첫 번째 인수, 또는 .env의 WALLET
checkHooks(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });

  const hooks = response.result.account_objects;
  console.log(\`=== \${address} 的 Hooks ===\`);
  console.log(\`已安装总数: \${hooks.length}
\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); // 如需查看完整信息可取消注释

    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;
      // SetHook 中省略的字段来自 HookDefinition
      const def = (await client.request({ command: "ledger_entry", hook_definition: installedHook.HookHash })).result.node;

      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn ?? def.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace ?? def.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit ?? def.HookCanEmit ?? "-"}\`);
    }

    console.log();
  }

  await client.disconnect();
}
// Testnet 示例地址: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
// 要查看的账户：第一个参数，或 .env 中的 WALLET
checkHooks(process.argv[2] ?? Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'}).address);`,
          },
        },
      ],
      slides: [
        {
          title: { es: "SetHook: campos principales", pt: "SetHook: campos principais", en: "SetHook: main fields", jp: "SetHook：主要フィールド", ko: "SetHook: 주요 필드", zh: "SetHook：主要字段" },
          content: {
            es: "Transaccion unica para gestionar Hooks\n\n• CreateCode: WASM en hex\n• HookHash: instalar Hook existente por hash\n• HookOn: filtro de transacciones\n• HookNamespace: aislamiento de estado\n• HookParameters: configuracion sin recompilar\n• HookCanEmit: control de emisiones (seguridad)\n• Flags: hsfOverride | hsfNSDelete | hsfCollect",
            pt: `Transação única para gerenciar Hooks

• CreateCode: WASM em hex
• HookHash: instalar Hook existente por hash
• HookOn: filtro de transações
• HookNamespace: isolamento de estado
• HookParameters: configuração sem recompilar
• HookCanEmit: controle de emissões (segurança)
• Flags: hsfOverride | hsfNSDelete | hsfCollect`,
            en: "Single transaction to manage Hooks\n\n• CreateCode: WASM in hex\n• HookHash: install existing Hook by hash\n• HookOn: transaction filter\n• HookNamespace: state isolation\n• HookParameters: configuration without recompiling\n• HookCanEmit: emission controle (security)\n• Flags: hsfOverride | hsfNSDelete | hsfCollect",
            jp: "Hooksを管理する単一トランザクション\n\n• CreateCode: WASMをhex形式で\n• HookHash: 既存HookをHashでインストール\n• HookOn: トランザクションフィルター\n• HookNamespace: ステートの分離\n• HookParameters: 再コンパイルなしで設定\n• HookCanEmit: 発行制御（セキュリティ）\n• Flags: hsfOverride | hsfNSDelete | hsfCollect",
            ko: "Hook을 관리하는 단일 트랜잭션\n\n• CreateCode: hex 형식의 WASM\n• HookHash: 기존 Hook 해시로 설치\n• HookOn: 트랜잭션 필터\n• HookNamespace: 상태 분리\n• HookParameters: 재컴파일 없는 설정 변경\n• HookCanEmit: 발행 제어\n• Flags: hsfOverride | hsfNSDelete | hsfCollect",
            zh: "管理 Hook 的单一交易\n\n• CreateCode：十六进制格式的 WASM\n• HookHash：通过已有 Hook 哈希安装\n• HookOn：交易过滤器\n• HookNamespace：状态隔离\n• HookParameters：无需重新编译即可修改配置\n• HookCanEmit：发交易控制\n• Flags：hsfOverride | hsfNSDelete | hsfCollect",
          },
          visual: "⚙️",
        },
        {
          title: { es: "4 fases de gestion de un Hook", pt: "4 fases de gestion de um Hook", en: "4 Hook management phases", jp: "Hookの管理4フェーズ", ko: "Hook 관리의 4단계", zh: "Hook 管理的 4 个阶段" },
          content: {
            es: "1. Instalar (CreateCode) → WASM completo\n2. Instalar por HookHash → sin enviar WASM\n3. Actualizar (Update) → modificar namespace,\n   parametros o grants sin cambiar codigo\n4. Eliminar (Delete) → CreateCode vacio\n   + hsfOverride. hsfNSDelete limpia estado",
            pt: "1. Instalar (CreateCode) → WASM completo\n2. Instalar por HookHash → sem enviar WASM\n3. Atualizar (Update) → modificar namespace,\n   parametros ou grants sem mudar código\n4. Eliminar (Delete) → CreateCode vacio\n   + hsfOverride. hsfNSDelete limpia estado",
            en: "1. Install (CreateCode) → full WASM\n2. Install by HookHash → without sending WASM\n3. Update → modify namespace,\n   parameters or grants without changing code\n4. Delete → empty CreateCode\n   + hsfOverride. hsfNSDelete clears state",
            jp: "1. インストール（CreateCode）→ 完全なWASM\n2. HookHashでインストール → WASMを送信せずに\n3. 更新（Update）→ 名前空間、\n   パラメーターやGrantsをコード変更なしで修正\n4. 削除（Delete）→ 空のCreateCode\n   + hsfOverride。hsfNSDeleteでステートをクリア",
            ko: "1. 설치(CreateCode) → 전체 WASM 사용\n2. HookHash로 설치 → WASM 재전송 없음\n3. 업데이트(Update) → 코드 변경 없이 namespace,\n   파라미터, grants 수정\n4. 삭제(Delete) → 빈 CreateCode\n   + hsfOverride, 필요 시 hsfNSDelete로 상태 정리",
            zh: "1. 安装（CreateCode）→ 使用完整 WASM\n2. 通过 HookHash 安装 → 无需重新发送 WASM\n3. 更新（Update）→ 不改代码，只改 namespace、参数或 grants\n4. 删除（Delete）→ 使用空的 CreateCode\n   + hsfOverride，必要时用 hsfNSDelete 清理状态",
          },
          visual: "🔄",
        },
        {
          title: { es: "HookOn y HookCanEmit", pt: "HookOn e HookCanEmit", en: "HookOn and HookCanEmit", jp: "HookOnとHookCanEmit", ko: "HookOn과 HookCanEmit", zh: "HookOn 与 HookCanEmit" },
          content: {
            es: "HookOn: que transacciones activan el Hook\nHookCanEmit: que transacciones puede emitir\n\n• Ambos usan la misma calculadora\n• Resultado hex sin 0x, en mayusculas\n• Principio de minimo privilegio\n• HookCanEmit opcional pero recomendado",
            pt: `HookOn: que transações ativan ou Hook
HookCanEmit: que transações pode emitir

• Os dois usam a mesma calculadora
• Resultado hex sem 0x, em maiúsculas
• Principio de mínimo privilegio
• HookCanEmit opcional mas recomendado`,
            en: "HookOn: which transactions activate the Hook\nHookCanEmit: which transactions it can emit\n\n• Both use the same calculator\n• Hex result without 0x, uppercase\n• Principle of least privilege\n• HookCanEmit optional but recommended",
            jp: "HookOn: どのトランザクションがHookを起動するか\nHookCanEmit: どのトランザクションを発行できるか\n\n• 両方とも同じ計算機を使用\n• 0xなしhex結果、大文字\n• 最小権限の原則\n• HookCanEmitはオプションだが推奨",
            ko: "HookOn: 어떤 트랜잭션이 Hook을 실행하는가\nHookCanEmit: 어떤 트랜잭션을 발행할 수 있는가\n\n• 둘 다 같은 계산기 사용\n• 0x 없는 대문자 hex 사용\n• 최소 권한 원칙 적용\n• HookCanEmit은 선택이지만 권장",
            zh: "HookOn：哪些交易会触发 Hook\nHookCanEmit：它可以发出哪些交易\n\n• 两者都使用同一个计算器\n• 使用不带 0x 的大写十六进制\n• 应遵循最小权限原则\n• HookCanEmit 可选，但强烈推荐",
          },
          visual: "🎯",
        },
      ],
    },
    {
      id: "m8l3",
      title: {
        es: "Estado persistente en Hooks",
        pt: "Estado persistente em Hooks",
        en: "Persistent state in Hooks",
        jp: "Hooksの永続的なステート",
        ko: "Hooks의 영속 상태",
        zh: "Hooks 中的持久状态",
      },
      theory: {
        es: `Los Hooks pueden almacenar **datos persistentes** entre ejecuciones usando el sistema de estado (\`state\`). Esto permite que un Hook tenga información disponible con la que trabajar en uno o varios \`Namespace\`.

### Estructura del estado

El Namespace se identifica con 32 bytes (256 bits) en hexadecimal. El estado se organiza como pares **clave-valor**:

- **Clave**: 32 bytes (256 bits). Si tu clave es más corta, se rellena con ceros
- **Valor**: hasta 256 bytes por entrada
- Cada entrada de estado se identifica por su clave dentro de un **Namespace**

### Limitaciones

- Una cuenta puede almacenar un máximo de 256 namespaces.
- Los registros de clave-valor dependerá de tus reservas de XAH.

### Funciones de estado

Estas son algunas funciones que podemos utilizar para leer o escribir información en \`Namespace\`.

- [state()](https://xahau.network/docs/hooks/functions/state/state/): Lee un valor del estado usando una clave
- [state_set()](https://xahau.network/docs/hooks/functions/state/state_set/): Escribe un valor en el estado para una clave
- [state_foreign()](https://xahau.network/docs/hooks/functions/state/state_foreign/): Lee el estado de un \`Namespace\`que no es el propio.
- [state_foreign_set()](https://xahau.network/docs/hooks/functions/state/state_foreign_set/): Escribe un valor en el estado de un \`Namespace\`que no es el propio.

### Usos prácticos del estado

- **Contadores**: contar transacciones procesadas, pagos recibidos, etc.
- **Listas blancas/negras**: almacenar direcciones permitidas o bloqueadas
- **Configuración**: guardar parámetros que el Hook consulta en cada ejecución
- **Tracking**: registrar la última transacción procesada, timestamps, etc.
- **Acumuladores**: sumar montos, promediar valores, llevar balances internos`,
        pt: `Os Hooks podem armazenar **dados persistentes** entre execuções usando o sistema de estado (\`state\`). Isso permite que um Hook tenha informação disponível com a que trabalhar em um ou vários \`Namespace\`.
### Estrutura do estado
O Namespace se identifica com 32 bytes (256 bits) em hexadecimal. O estado se organiza como pares **chave-valor**:
- **Chave**: 32 bytes (256 bits). Se sua chave é mais curta, ela é preenchida com zeros
- **Valor**: até 256 bytes por entrada
- Cada entrada de estado se identifica por sua chave dentro de um **Namespace**
### Limitações
- Uma conta pode armazenar um máximo de 256 namespaces.
- Os registros de chave-valor dependerão das suas reservas de XAH.
### Funções de estado
Estas são algumas funções que podemos usar para ler ou escrever informações em \`Namespace\`.
- [state()](https://xahau.network/docs/hooks/functions/state/state/): Lê um valor do estado usando uma chave
- [state_set()](https://xahau.network/docs/hooks/functions/state/state_set/): Escreve um valor no estado para uma chave
- [state_foreign()](https://xahau.network/docs/hooks/functions/state/state_foreign/): Lê o estado de um \`Namespace\`que no é o próprio.
- [state_foreign_set()](https://xahau.network/docs/hooks/functions/state/state_foreign_set/): Escreve um valor no estado de um \`Namespace\`que no é o próprio.
### Usos práticos do estado
- **Contadores**: contar transações processadas, pagamentos recebidos, etc.
- **Listas brancas/negras**: armazenar endereços permitidas ou bloqueadas
- **Configuração**: guardar parâmetros que o Hook consulta em cada execução
- **Tracking**: registrar a última transação processada, timestamps, etc.
- **Acumuladores**: somar valores, calcular médias e manter saldos internos`,
        en: `Hooks can store **persistent data** between executions using the state system (\`state\`). This allows a Hook to have information available to work with in one or more \`Namespace\`s.

### State structure

The Namespace is identified with 32 bytes (256 bits) in hexadecimal. State is organized as **key-value** pairs:

- **Key**: 32 bytes (256 bits). If your key is shorter, it is padded with zeros
- **Value**: up to 256 bytes per entry
- Each state entry is identified by its key within a **Namespace**

### Limitations

- An account can store a maximum of 256 namespaces.
- Key-value records will depend on your XAH reserves.

### State functions

Here are some functions we can use to read or write information in \`Namespace\`.

- [state()](https://xahau.network/docs/hooks/functions/state/state/): Reads a value from state using a key
- [state_set()](https://xahau.network/docs/hooks/functions/state/state_set/): Writes a value to state for a key
- [state_foreign()](https://xahau.network/docs/hooks/functions/state/state_foreign/): Reads the state of a \`Namespace\` that is not its own.
- [state_foreign_set()](https://xahau.network/docs/hooks/functions/state/state_foreign_set/): Writes a value to the state of a \`Namespace\` that is not its own.

### Practical uses of state

- **Counters**: count processed transactions, received payments, etc.
- **Whitelists/blacklists**: store allowed or blocked addresses
- **Configuration**: save parameters that the Hook queries on each execution
- **Tracking**: record the last processed transaction, timestamps, etc.
- **Accumulators**: sum amounts, average values, keep internal balances`,
        jp: `Hooksは状態システム（\`state\`）を使って実行間で**永続的なデータ**を保存できます。これにより1つ以上の\`Namespace\`で作業するための情報をHookが持てるようになります。

### ステートの構造

Namespaceは16進数の32バイト（256ビット）で識別されます。ステートは**キーと値**のペアとして管理されます。

- **キー**：32バイト（256ビット）。キーが短い場合はゼロで埋められる
- **値**：エントリあたり最大256バイト
- 各ステートエントリは**Namespace**内のキーで識別される

### 制限事項

- アカウントは最大256個のNamespaceを保存できる。
- キーと値のレコード数はXAHの準備金に依存する。

### ステート関数

\`Namespace\`で情報を読み書きするために使用できる関数のいくつかを以下に示します。

- [state()](https://xahau.network/docs/hooks/functions/state/state/)：キーを使ってステートから値を読み取る
- [state_set()](https://xahau.network/docs/hooks/functions/state/state_set/)：キーに対してステートに値を書き込む
- [state_foreign()](https://xahau.network/docs/hooks/functions/state/state_foreign/)：自身のものでない\`Namespace\`のステートを読み取る。
- [state_foreign_set()](https://xahau.network/docs/hooks/functions/state/state_foreign_set/)：自身のものでない\`Namespace\`のステートに値を書き込む。

### ステートの実用的な用途

- **カウンター**：処理されたトランザクション、受信した支払いなどをカウントする
- **ホワイトリスト/ブラックリスト**：許可または拒否されたアドレスを保存する
- **設定**：各実行時にHookが照会するパラメーターを保存する
- **トラッキング**：最後に処理したトランザクション、タイムスタンプなどを記録する
- **アキュムレーター**：金額を合計し、値を平均し、内部残高を管理する`,
        ko: `Hook은 \`state\` 시스템을 사용해 실행 사이에 **영속 데이터**를 저장할 수 있습니다. 이 덕분에 단순 반응형 로직을 넘어 상태 기반 로직을 만들 수 있습니다.

### 상태 구조

- 키: 32바이트
- 값: 항목당 최대 256바이트
- 모든 값은 특정 **namespace** 안에 저장됨

### 자주 쓰는 함수

- \`state()\`: 값 읽기
- \`state_set()\`: 값 저장
- \`state_foreign()\`: 다른 namespace 읽기
- \`state_foreign_set()\`: 다른 namespace 쓰기

### 활용 예시

- 카운터 유지
- 화이트리스트/블랙리스트
- 동적 설정 저장
- 마지막 처리 결과 기록
- 내부 잔액이나 누적값 관리

저장 공간과 준비금 비용이 있으므로 상태 구조는 처음부터 간결하게 설계하는 편이 좋습니다.`,
        zh: `Hook 可以通过 \`state\` 系统在多次执行之间保存**持久数据**。这让你不仅能写简单的响应式逻辑，还能构建真正依赖状态的逻辑。

### 状态结构

- 键：32 字节
- 值：每项最多 256 字节
- 所有值都存储在特定的 **namespace** 中

### 常用函数

- \`state()\`：读取值
- \`state_set()\`：写入值
- \`state_foreign()\`：读取其他 namespace
- \`state_foreign_set()\`：写入其他 namespace

### 典型用途

- 维护计数器
- 白名单 / 黑名单
- 保存动态配置
- 记录最后一次处理结果
- 管理内部余额或累计值

由于存储空间和储备金都有成本，状态结构最好从一开始就设计得尽量精简。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Hook que cuenta pagos procesados",
            pt: "Hook que conta pagamentos procesados",
            en: "Hook that counts processed payments",
            jp: "処理された支払いをカウントするHook",
            ko: "처리한 결제를 세는 Hook",
            zh: "统计已处理付款数量的 Hook",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

/**
 * Hook: payment_counter.c
 * Cuenta cuántos pagos ha procesado la cuenta.
 * Almacena el contador en el estado del Hook.
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // Solo contar pagos (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: No es un pago."), __LINE__);
    }

    // Clave de estado para el contador (32 bytes, rellena con ceros)
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C'; // 'C' de Counter

    // Leer el contador actual del estado
    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));

    if (bytes_read == 8) {
        // El contador ya existe, leer su valor
        counter = *((int64_t*)counter_buf);
    }

    // Incrementar el contador
    counter++;

    // Escribir el nuevo valor en el estado
    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));

    if (result < 0) {
        rollback(SBUF("payment_counter: Error al guardar estado."), __LINE__);
    }

    // Aceptar la transacción
    accept(SBUF("payment_counter: Pago contado."), __LINE__);
    return 0;
}`,
            pt: `#include "hookapi.h"
/**
 * Hook: payment_counter.c
 * Conta quantos pagamentos a conta já processou.
 * Armazena o contador no estado do Hook.
 */
int64_t hook(uint32_t reserved) {
    _g(1, 1);
    // Apenas contar pagamentos (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: nao e um pagamento."), __LINE__);
    }
    // Chave de estado para o contador (32 bytes, preenche com zeros)
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C'; // 'C' de Counter
    // Ler ou contador atual do estado
    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));
    if (bytes_read == 8) {
        // O contador já existe, ler seu valor
        counter = *((int64_t*)counter_buf);
    }
    // Incrementar ou contador
    counter++;
    // Escrever o novo valor no estado
    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));
    if (result < 0) {
        rollback(SBUF("payment_counter: erro ao gravar o estado."), __LINE__);
    }
    // Aceitar a transação
    accept(SBUF("payment_counter: pagamento contado."), __LINE__);
    return 0;
}`,
            en: `#include "hookapi.h"

/**
 * Hook: payment_counter.c
 * Counts how many payments have been processed by the account.
 * Stores the counter in the Hook's state.
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // Only count payments (type 0)
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: It's not a payment."), __LINE__);
    }

    // Key for the counter state (32 bytes, filled with zeros)
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C'; // 'C' of Counter

    // Read the current counter value from state
    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));

    if (bytes_read == 8) {
        // The counter already exists, read its value
        counter = *((int64_t*)counter_buf);
    }

    // Increment the counter
    counter++;

    // Write the new value to state
    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));

    if (result < 0) {
        rollback(SBUF("payment_counter: error saving state."), __LINE__);
    }

    // Accept the transaction
    accept(SBUF("payment_counter: Payment counted."), __LINE__);
    return 0;
}`,
            jp: `#include "hookapi.h"

/**
 * Hook: payment_counter.c
 * アカウントが処理した支払いの数をカウントする。
 * カウンターをHookのステートに保存する。
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // 支払い（タイプ0）のみカウントする
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: 支払いではありません。"), __LINE__);
    }

    // カウンターステートのキー（32バイト、ゼロで埋める）
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C'; // 'C' はカウンター（Counter）の頭文字

    // ステートから現在のカウンター値を読み取る
    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));

    if (bytes_read == 8) {
        // カウンターが既に存在する場合、その値を読み取る
        counter = *((int64_t*)counter_buf);
    }

    // カウンターをインクリメントする
    counter++;

    // 新しい値をステートに書き込む
    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));

    if (result < 0) {
        rollback(SBUF("payment_counter: ステート保存エラー。"), __LINE__);
    }

    // トランザクションを承認する
    accept(SBUF("payment_counter: 支払いカウント済み。"), __LINE__);
    return 0;
}`,
            ko: `#include "hookapi.h"

/**
 * Hook: payment_counter.c
 * 계정이 처리한 결제 수를 센다.
 * 카운터는 Hook 상태에 저장된다.
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // 결제(type 0)만 카운트
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: 결제가 아닙니다."), __LINE__);
    }

    // 카운터 상태 키
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C';

    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));

    if (bytes_read == 8) {
        counter = *((int64_t*)counter_buf);
    }

    counter++;

    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));

    if (result < 0) {
        rollback(SBUF("payment_counter: 상태 저장 오류."), __LINE__);
    }

    accept(SBUF("payment_counter: 결제가 카운트되었습니다."), __LINE__);
    return 0;
}`,
            zh: `#include "hookapi.h"

/**
 * Hook: payment_counter.c
 * 统计账户处理过多少笔付款。
 * 计数器保存在 Hook 的状态中。
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // 只统计付款（type 0）
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: 这不是付款。"), __LINE__);
    }

    // 计数器状态键
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C';

    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));

    if (bytes_read == 8) {
        counter = *((int64_t*)counter_buf);
    }

    counter++;

    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));

    if (result < 0) {
        rollback(SBUF("payment_counter: 保存状态时出错。"), __LINE__);
    }

    accept(SBUF("payment_counter: 付款已计数。"), __LINE__);
    return 0;
}`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Sistema de estado en Hooks", pt: "Sistema de estado em Hooks", en: "Hook state system", jp: "Hooksのステートシステム", ko: "Hook 상태 시스템", zh: "Hook 状态系统" },
          content: {
            es: "Datos persistentes entre ejecuciones\n\n• state() → Leer valor por clave\n• state_set() → Escribir valor\n• state_foreign() → Leer estado de otra cuenta\n\nClave: 32 bytes | Valor: hasta 256 bytes\nCada entrada vive dentro de un namespace",
            pt: "Dados persistentes entre execuções\n\n• state() → Ler valor por chave\n• state_set() → Escrever valor\n• state_foreign() → Ler estado de outra conta\n\nChave: 32 bytes | Valor: até 256 bytes\nCada entrada vive dentro de um namespace",
            en: "Persistent data between executions\n\n• state() → Read value by key\n• state_set() → Write value\n• state_foreign() → Read state of another account\n\nKey: 32 bytes | Value: up to 256 bytes\nEach entry lives within a namespace",
            jp: "実行間の永続的なデータ\n\n• state() → キーで値を読み取る\n• state_set() → 値を書き込む\n• state_foreign() → 別のアカウントのステートを読む\n\nキー：32バイト | 値：最大256バイト\n各エントリは名前空間内に存在する",
            ko: "실행 사이에 유지되는 영속 데이터\n\n• state() → 키로 값 읽기\n• state_set() → 값 쓰기\n• state_foreign() → 다른 계정 상태 읽기\n\n키: 32바이트 | 값: 최대 256바이트\n각 항목은 namespace 안에 저장됨",
            zh: "在多次执行之间保留的持久数据\n\n• state() → 通过键读取值\n• state_set() → 写入值\n• state_foreign() → 读取其他账户的状态\n\n键：32 字节 | 值：最多 256 字节\n每一项都位于某个 namespace 内",
          },
          visual: "💾",
        },
        {
          title: { es: "Namespace y aislamiento", pt: "Namespace e isolamento", en: "Namespace and isolation", jp: "名前空間と分離", ko: "Namespace와 분리", zh: "Namespace 与隔离" },
          content: {
            es: "HookNamespace (32 bytes hex):\n\n• Aisla el estado de cada Hook\n• Distinto namespace = estado separado\n• Mismo namespace = estado compartido\n• Se define al instalar con SetHook\n\nstate_foreign() lee estado ajeno (solo lectura)",
            pt: `HookNamespace (32 bytes hex):

• Isola o estado de cada Hook
• Distinto namespace = estado separado
• Mesmo namespace = estado compartilhado
• Se define ao instalar com SetHook

state_foreign() lê estado externo (apenas leitura)`,
            en: "HookNamespace (32 bytes hex):\n\n• Isolates state of each Hook\n• Different namespace = separate state\n• Same namespace = shared state\n• Defined at install time with SetHook\n\nstate_foreign() reads external state (read-only)",
            jp: "HookNamespace（32バイトhex）：\n\n• 各Hookのステートを分離する\n• 異なる名前空間 = 別のステート\n• 同じ名前空間 = 共有ステート\n• SetHookでインストール時に定義\n\nstate_foreign()は外部ステートを読む（読み取り専用）",
            ko: "HookNamespace(32바이트 hex):\n\n• 각 Hook의 상태를 분리\n• 다른 namespace = 별도 상태\n• 같은 namespace = 공유 상태\n• SetHook 설치 시 정의\n\nstate_foreign()은 외부 상태를 읽는 용도",
            zh: "HookNamespace（32 字节 hex）：\n\n• 用于隔离每个 Hook 的状态\n• 不同 namespace = 独立状态\n• 相同 namespace = 共享状态\n• 在 SetHook 安装时定义\n\nstate_foreign() 用于读取外部状态",
          },
          visual: "🔒",
        },
        {
          title: { es: "Usos practicos del estado", pt: "Usos práticos do estado", en: "Practical uses of state", jp: "ステートの実用的な用途", ko: "상태의 실전 활용", zh: "状态的实际用途" },
          content: {
            es: "• Contadores de transacciones\n• Listas blancas / negras de direcciones\n• Configuracion dinamica del Hook\n• Tracking: ultima tx, timestamps\n• Acumuladores y balances internos",
            pt: "• Contadores de transações\n• Listas blancas / negras de endereços\n• Configuracion dinâmica do Hook\n• Tracking: ultima tx, timestamps\n• Acumuladores e saldos internos",
            en: "• Transaction counters\n• Address whitelists / blacklists\n• Dynamic Hook configuration\n• Tracking: last tx, timestamps\n• Accumulators and internal balances",
            jp: "• トランザクションカウンター\n• アドレスのホワイトリスト/ブラックリスト\n• Hookの動的設定\n• トラッキング：最後のtx、タイムスタンプ\n• アキュムレーターと内部残高",
            ko: "• 트랜잭션 카운터\n• 주소 화이트리스트 / 블랙리스트\n• 동적 Hook 설정\n• 마지막 tx, timestamp 추적\n• 누적값과 내부 잔액 관리",
            zh: "• 交易计数器\n• 地址白名单 / 黑名单\n• 动态 Hook 配置\n• 追踪最后一笔 tx、时间戳等\n• 累积值与内部余额管理",
          },
          visual: "📋",
        },
      ],
    },
    {
      id: "m8l4",
      title: {
        es: "Emitir transacciones desde un Hook",
        pt: "Emitir transações a partir de um Hook",
        en: "Emitting transactions from a Hook",
        jp: "HookからのトランザクションのEmit",
        ko: "Hook에서 트랜잭션 발행하기",
        zh: "从 Hook 中发出交易",
      },
      theory: {
        es: `Una de las capacidades más poderosas de los Hooks es la posibilidad de **emitir transacciones nuevas** de forma autónoma. Cuando un Hook emite una transacción, esta se ejecuta como si la cuenta del Hook la hubiera enviado.

### La función emit()

La función \`emit()\` permite que un Hook cree y envíe una **transacción emitida (etxn)**. Estas transacciones:
- Son creadas por el Hook, no por un usuario
- Se ejecutan de forma autónoma en el ledger
- Pueden ser pagos, ofertas, o cualquier tipo de transacción soportado

### Reservar espacio con etxn_reserve()

Antes de emitir, debes **reservar** cuántas transacciones vas a emitir en esta ejecución:

\`\`\`
etxn_reserve(1);  // Reservar espacio para 1 emisión
\`\`\`

Esto es obligatorio. Si intentas emitir sin reservar, el Hook fallará.

### Paso a paso para emitir

1. **\`etxn_reserve(N)\`**: Reservar espacio para N emisiones
2. **Construir la transacción**: Llenar un buffer con los campos de la transacción serializada
3. **\`etxn_details()\`**: Preparar los detalles de emisión (genera el hash de emisión)
4. **\`emit()\`**: Enviar la transacción al ledger

### La función cbak()

Cuando una transacción emitida se **completa** (con éxito o fallo), Xahau llama a la función \`cbak()\` del Hook que la emitió:

- \`cbak()\` recibe información sobre el resultado de la emisión
- Puedes usar \`cbak()\` para actualizar estado, registrar resultados, o tomar acciones adicionales
- Si no necesitas hacer nada, \`cbak()\` puede simplemente retornar 0

### Casos de uso

- **Auto-forwarding**: reenviar automáticamente un porcentaje de cada pago recibido
- **Splitting**: dividir un pago entrante entre varias cuentas
- **Refunds**: devolver pagos que no cumplen ciertas condiciones
- **Acciones programadas**: emitir transacciones basadas en condiciones de estado

### Limitaciones

- Existe un **máximo de emisiones por ejecución** del Hook
- Las transacciones emitidas tienen **requisitos de fees** propios
- Las emisiones aumentan la carga computacional del Hook

### Construir el Payment emitido

Los ejemplos antiguos construyen la transacción con la macro \`PREPARE_PAYMENT_SIMPLE\`. Las cabeceras que escribe hoy \`hooks-cli init\` (versión 2.1.0) no la incluyen, así que el reenviador construye su Payment a mano, con funciones que declaran todas las cabeceras. Hacerlo a mano muestra además exactamente qué contiene una transacción emitida:

| Campo | Bytes | Valor | Por qué |
|---|---|---|---|
| TransactionType | 3 | 0 (Payment) | El tipo de transacción |
| Flags | 5 | tfCanonical | El flag estándar de formato de firma canónico |
| Sequence | 5 | 0 | Una transacción emitida no usa el Sequence de la cuenta |
| FirstLedgerSequence, LastLedgerSequence | 6 + 6 | el siguiente ledger y 4 más | La ventana en la que la red puede aplicarla |
| Amount | 9 | el 10% del pago, en drops | El bit 62 marca una cantidad nativa positiva |
| Fee | 9 | \`etxn_fee_base()\` | Solo se conoce con la transacción completa, por eso se escribe al final |
| SigningPubKey | 35 | vacío | Las transacciones emitidas no se firman: su autoridad es el Hook que las emite |
| Account, Destination | 22 + 22 | la cuenta del Hook, \`forward_to\` | Quién paga y quién recibe |
| EmitDetails | 116 | lo escribe \`etxn_details()\` | Vincula la transacción emitida con la que la provocó |

Los campos deben ir en **orden canónico**: por código de tipo y después por código de campo. Es el orden de la tabla, y el mismo en que el ledger los serializa.

**Caso a vigilar: el tamaño del buffer.** \`EmitDetails\` ocupa 116 bytes, o 138 cuando el Hook tiene \`cbak()\`. \`etxn_details()\` rechaza un buffer menor y devuelve un error, y entonces el reenviador hace rollback en lugar de emitir. Por eso \`TX_SIZE\` es \`FIELDS_SIZE + 116\`: si añades un \`cbak()\` a este Hook, debe pasar a 138.

Resultado en testnet, pagando 10 XAH a una cuenta con el Hook instalado (instalado como en la [lección 9.2](?m=9&l=1), con \`forward_to\` apuntando a una segunda cuenta):

\`\`\`
TransactionResult: tesSUCCESS
HookResult:        3
HookReturnString:  forwarder: 10% resent correctly
HookEmitCount:     1
forward_to balance: +1 XAH
\`\`\`

- **\`tesSUCCESS\`**: el pago entrante se aplicó.
- **\`HookResult: 3\`**: el Hook terminó con \`accept()\`. Un \`rollback()\` habría rechazado el pago entero.
- **\`HookEmitCount: 1\`**: el Hook emitió una transacción. Se aplica en un ledger posterior, no dentro del pago entrante.
- **\`+1 XAH\`**: exactamente el 10% de 10 XAH llegó a \`forward_to\`. El fee de la transacción emitida lo paga la cuenta del Hook.

### Enlaces útiles

- [Xahau Hooks 101](https://github.com/Handy4ndy/XahauHooks101): Una colección de hooks básicos para aprender a programar Hooks, entre ellos varios ejemplos de emisión por [@handy_andy](https://x.com/Handy_4ndy).
- [Xahau Hook Tx Builder](https://tx-builder.xahau.tools/): Un traductor de transacciones JSON a lenguaje C para Hooks por [@_tequ_](https://x.com/_tequ_).

`,
        pt: `Uma das capacidadees mais poderosas dos Hooks é a possibilidade de **emitir transações novas** de forma autônoma. Quando um Hook emite uma transação, esta é executada como se a conta do Hook a tivesse enviado.
### A função emit()
A função \`emit()\` permite que um Hook crie e envie uma **transação emitida (etxn)**. Essas transações:
- São criadas pelo Hook, não por um usuário
- Se executam de forma autônoma no ledger
- Podem ser pagamentos, ofertas ou qualquer tipo de transação suportado
### Reservar espaço com etxn_reserve()
Antes de emitir, você deve **reservar** quantas transações você vai emitir nesta execução:
\`\`\`
etxn_reserve(1);  // Reservar espaço para 1 emissão
\`\`\`
Isso é obrigatório. Se você tentar emitir sem reservar, o Hook falhará.
### Passo a passo para emitir
1. **\`etxn_reserve(N)\`**: reservar espaço para N emissões
2. **Construir a transação**: preencher um buffer com os campos da transação serializada
3. **\`etxn_details()\`**: Preparar os detalhes de emissão (gera o hash de emissão)
4. **\`emit()\`**: Enviar a transação ao ledger
### A função cbak()
Quando uma transação emitida é **concluída** (com sucesso ou falha), a Xahau chama a função \`cbak()\` do Hook que a emitiu:
- \`cbak()\` recebe informações sobre o resultado da emissão
- Você pode usar \`cbak()\` para atualizar o estado, registrar resultados ou tomar ações adicionais
- Se você não precisa fazer nada, \`cbak()\` pode simplesmente retornar 0
### Casos de uso
- **Auto-forwarding**: reenviar automaticamente uma porcentagem de cada pagamento recebido
- **Splitting**: dividir um pagamento recebido entre várias contas
- **Refunds**: devolver pagamentos que não cumprem certas condições
- **Ações programadas**: emitir transações com base em condições de estado
### Limitações
- Existe um **máximo de emissões por execução** do Hook
- As transações emitidas têm **requisitos de fees** próprios
- As emissões aumentam a carga computacional do Hook
### Montar o Payment emitido

Exemplos antigos montam a transação com a macro \`PREPARE_PAYMENT_SIMPLE\`. Os cabeçalhos que \`hooks-cli init\` escreve hoje (versão 2.1.0) não a incluem, então o encaminhador monta seu Payment à mão, com funções que todos os cabeçalhos declaram. Fazer à mão também mostra exatamente o que uma transação emitida contém:

| Campo | Bytes | Valor | Por quê |
|---|---|---|---|
| TransactionType | 3 | 0 (Payment) | O tipo de transação |
| Flags | 5 | tfCanonical | O flag padrão de formato de assinatura canônico |
| Sequence | 5 | 0 | Uma transação emitida não usa o Sequence da conta |
| FirstLedgerSequence, LastLedgerSequence | 6 + 6 | o próximo ledger e mais 4 | A janela em que a rede pode aplicá-la |
| Amount | 9 | 10% do pagamento, em drops | O bit 62 marca uma quantia nativa positiva |
| Fee | 9 | \`etxn_fee_base()\` | Só é conhecido com a transação completa, por isso é escrito por último |
| SigningPubKey | 35 | vazio | Transações emitidas não são assinadas: sua autoridade é o Hook que as emite |
| Account, Destination | 22 + 22 | a conta do Hook, \`forward_to\` | Quem paga e quem recebe |
| EmitDetails | 116 | escrito por \`etxn_details()\` | Liga a transação emitida àquela que a provocou |

Os campos devem estar em **ordem canônica**: por código de tipo e depois por código de campo. É a ordem da tabela, e a mesma em que o ledger os serializa.

**Caso para observar: o tamanho do buffer.** \`EmitDetails\` ocupa 116 bytes, ou 138 quando o Hook tem \`cbak()\`. \`etxn_details()\` recusa um buffer menor e retorna um erro, e o encaminhador faz rollback em vez de emitir. Por isso \`TX_SIZE\` é \`FIELDS_SIZE + 116\`: se você adicionar um \`cbak()\` a este Hook, ele precisa passar a 138.

Resultado na testnet, pagando 10 XAH a uma conta com o Hook instalado (instalado como na [lição 9.2](?m=9&l=1), com \`forward_to\` apontando para uma segunda conta):

\`\`\`
TransactionResult: tesSUCCESS
HookResult:        3
HookReturnString:  forwarder: 10% resent correctly
HookEmitCount:     1
forward_to balance: +1 XAH
\`\`\`

- **\`tesSUCCESS\`**: o pagamento recebido foi aplicado.
- **\`HookResult: 3\`**: o Hook terminou com \`accept()\`. Um \`rollback()\` teria rejeitado o pagamento inteiro.
- **\`HookEmitCount: 1\`**: o Hook emitiu uma transação. Ela é aplicada em um ledger posterior, não dentro do pagamento recebido.
- **\`+1 XAH\`**: exatamente 10% de 10 XAH chegou a \`forward_to\`. O fee da transação emitida é pago pela conta do Hook.

### Links úteis
- [Xahau Hooks 101](https://github.com/Handy4ndy/XahauHooks101): uma coleção de hooks básicos para aprender a programar Hooks, incluindo vários exemplos de emissão, por [@handy_andy](https://x.com/Handy_4ndy).
- [Xahau Hook Tx Builder](https://tx-builder.xahau.tools/): um tradutor de transações JSON para linguagem C para Hooks, por [@_tequ_](https://x.com/_tequ_).`,
        en: `One of the most powerful capabilities of Hooks is the ability to **emit new transactions** autonomously. When a Hook emits a transaction, it executes as if the Hook's account had sent it.

### The emit() function

The \`emit()\` function allows a Hook to create and send an **emitted transaction (etxn)**. These transactions:
- Are created by the Hook, not by a user
- Execute autonomously on the ledger
- Can be payments, offers, or any supported transaction type

### Reserve space with etxn_reserve()

Before emitting, you must **reserve** how many transactions you're going to emit in this execution:

\`\`\`
etxn_reserve(1);  // Reserve space for 1 emission
\`\`\`

This is mandatory. If you try to emit without reserving, the Hook will fail.

### Step by step to emit

1. **\`etxn_reserve(N)\`**: Reserve space for N emissions
2. **Build the transaction**: Fill a buffer with the serialized transaction fields
3. **\`etxn_details()\`**: Prepare emission details (generates the emission hash)
4. **\`emit()\`**: Send the transaction to the ledger

### The cbak() function

When an emitted transaction **completes** (with success or failure), Xahau calls the \`cbak()\` function of the Hook that emitted it:

- \`cbak()\` receives information about the emission result
- You can use \`cbak()\` to update state, record results, or take additional actions
- If you don't need to do anything, \`cbak()\` can simply return 0

### Use cases

- **Auto-forwarding**: automatically forward a percentage of each received payment
- **Splitting**: split an incoming payment between multiple accounts
- **Refunds**: return payments that don't meet certain conditions
- **Scheduled actions**: emit transactions based on state conditions

### Limitations

- There is a **maximum number of emissions per Hook execution**
- Emitted transactions have **their own fee requirements**
- Emissions increase the Hook's computational load

### Building the emitted Payment

Older examples build the transaction with the \`PREPARE_PAYMENT_SIMPLE\` macro. The headers \`hooks-cli init\` writes today (version 2.1.0) don't include it, so the forwarder builds its Payment by hand, with functions every header set declares. Doing it by hand also shows exactly what an emitted transaction contains:

| Field | Bytes | Value | Why |
|---|---|---|---|
| TransactionType | 3 | 0 (Payment) | The transaction type |
| Flags | 5 | tfCanonical | The standard flag for a canonical signature format |
| Sequence | 5 | 0 | An emitted transaction doesn't use the account's Sequence |
| FirstLedgerSequence, LastLedgerSequence | 6 + 6 | next ledger, 4 more | The window in which the network may apply it |
| Amount | 9 | 10% of the payment, in drops | Bit 62 marks a positive native amount |
| Fee | 9 | \`etxn_fee_base()\` | Only known once the whole transaction exists, so it is written last |
| SigningPubKey | 35 | empty | Emitted transactions are not signed: their authority is the Hook that emitted them |
| Account, Destination | 22 + 22 | the Hook's account, \`forward_to\` | Who pays and who receives |
| EmitDetails | 116 | written by \`etxn_details()\` | Ties the emitted transaction to the one that triggered it |

The fields must be in **canonical order**: by type code, then by field code. That is the order of the table, and the order the ledger itself serializes them in.

**Case to watch: the buffer size.** \`EmitDetails\` takes 116 bytes, or 138 when the Hook has a \`cbak()\`. \`etxn_details()\` refuses a smaller buffer and returns an error, and the forwarder then rolls back instead of emitting. That is why \`TX_SIZE\` is \`FIELDS_SIZE + 116\`: add a \`cbak()\` to this Hook and it must become 138.

Result on testnet, paying 10 XAH to an account with the Hook installed (installed as in [lesson 9.2](?m=9&l=1), with \`forward_to\` set to a second account):

\`\`\`
TransactionResult: tesSUCCESS
HookResult:        3
HookReturnString:  forwarder: 10% resent correctly
HookEmitCount:     1
forward_to balance: +1 XAH
\`\`\`

- **\`tesSUCCESS\`**: the incoming payment was applied.
- **\`HookResult: 3\`**: the Hook ended with \`accept()\`. A \`rollback()\` would have rejected the whole payment.
- **\`HookEmitCount: 1\`**: the Hook emitted one transaction. It is applied in a later ledger, not inside the incoming payment.
- **\`+1 XAH\`**: exactly 10% of 10 XAH reached \`forward_to\`. The emitted transaction's fee is paid by the Hook's account.

### Useful links

- [Xahau Hooks 101](https://github.com/Handy4ndy/XahauHooks101): A collection of basic hooks for learning to program Hooks, including several emission examples by [@handy_andy](https://x.com/Handy_4ndy).
- [Xahau Hook Tx Builder](https://tx-builder.xahau.tools/): A JSON transaction to C language translator for Hooks by [@_tequ_](https://x.com/_tequ_).

`,
        jp: `Hooksが持つ最も強力な機能の一つは、自律的に**新しいトランザクションを発行する**能力です。HookがトランザクションをEmitすると、Hookのアカウントが送信したかのように実行されます。

### emit()関数

\`emit()\`関数は、HookがEmitトランザクション（etxn）を作成して送信することを可能にします。これらのトランザクションは：
- ユーザーではなくHookによって作成される
- レジャー上で自律的に実行される
- 支払い、オファー、またはサポートされているあらゆるトランザクションタイプになれる

### etxn_reserve()でスペースを確保する

Emitする前に、この実行で何個のトランザクションをEmitするかを**確保**する必要があります。

\`\`\`
etxn_reserve(1);  // 1回のEmitのためのスペースを確保
\`\`\`

これは必須です。確保せずにEmitしようとすると、Hookは失敗します。

### Emitのステップバイステップ

1. **\`etxn_reserve(N)\`**：N回のEmitのためのスペースを確保
2. **トランザクションを構築する**：シリアライズされたトランザクションフィールドをバッファに埋める
3. **\`etxn_details()\`**：Emit詳細を準備する（Emitハッシュを生成）
4. **\`emit()\`**：レジャーにトランザクションを送信

### cbak()関数

EmitされたトランザクションがEmitしたHookの**完了**（成功または失敗）時に、Xahauは\`cbak()\`関数を呼び出します。

- \`cbak()\`はEmit結果に関する情報を受け取る
- \`cbak()\`を使用してステートを更新したり、結果を記録したり、追加のアクションを取ったりできる
- 何もする必要がない場合、\`cbak()\`は単に0を返して良い

### ユースケース

- **自動転送**：受信した各支払いの一定割合を自動的に転送する
- **分割**：受信した支払いを複数のアカウントに分割する
- **返金**：特定の条件を満たさない支払いを返金する
- **スケジュールされたアクション**：ステート条件に基づいてトランザクションをEmitする

### 制限事項

- Hook実行あたりの**最大Emit回数**がある
- EmitされたトランザクションにはEmit**固有の手数料要件**がある
- Emitはの回数が増えるほどHookの計算負荷が増加する

### Emit する Payment を組み立てる

古い例では \`PREPARE_PAYMENT_SIMPLE\` マクロでトランザクションを組み立てます。現在 \`hooks-cli init\` が書き出すヘッダー（バージョン 2.1.0）にはこのマクロがないため、転送 Hook はどのヘッダーでも宣言されている関数だけを使い、Payment を手作業で組み立てます。手作業で組み立てると、Emit されるトランザクションの中身も正確にわかります。

| フィールド | バイト | 値 | 理由 |
|---|---|---|---|
| TransactionType | 3 | 0（Payment） | トランザクションの種類 |
| Flags | 5 | tfCanonical | 正規の署名形式を示す標準フラグ |
| Sequence | 5 | 0 | Emit されたトランザクションはアカウントの Sequence を使わない |
| FirstLedgerSequence, LastLedgerSequence | 6 + 6 | 次のレジャーから4つ先まで | ネットワークが適用できる期間 |
| Amount | 9 | 支払いの10%（drops） | bit 62 は正のネイティブ金額を示す |
| Fee | 9 | \`etxn_fee_base()\` | トランザクションが完成するまでわからないので最後に書く |
| SigningPubKey | 35 | 空 | Emit されたトランザクションは署名されない。権限は Emit した Hook にある |
| Account, Destination | 22 + 22 | Hook のアカウント、\`forward_to\` | 支払う側と受け取る側 |
| EmitDetails | 116 | \`etxn_details()\` が書き込む | Emit されたトランザクションを、きっかけとなったトランザクションに結び付ける |

フィールドは**正規の順序**で並べる必要があります。型コード順、次にフィールドコード順です。表の順序であり、レジャー自体がシリアライズする順序でもあります。

**注意するケース: バッファのサイズ。** \`EmitDetails\` は 116 バイト、Hook に \`cbak()\` があるときは 138 バイトを使います。\`etxn_details()\` はそれより小さいバッファを拒否してエラーを返し、転送 Hook は Emit せずにロールバックします。そのため \`TX_SIZE\` は \`FIELDS_SIZE + 116\` です。この Hook に \`cbak()\` を追加するなら 138 にする必要があります。

テストネットでの結果（[レッスン9.2](?m=9&l=1)の方法で Hook をインストールし、\`forward_to\` を別のアカウントにして 10 XAH を支払った場合）:

\`\`\`
TransactionResult: tesSUCCESS
HookResult:        3
HookReturnString:  forwarder: 10% resent correctly
HookEmitCount:     1
forward_to balance: +1 XAH
\`\`\`

- **\`tesSUCCESS\`**: 受け取った支払いが適用されました。
- **\`HookResult: 3\`**: Hook は \`accept()\` で終了しました。\`rollback()\` なら支払い全体が拒否されていました。
- **\`HookEmitCount: 1\`**: Hook は1つのトランザクションを Emit しました。受け取った支払いの中ではなく、後のレジャーで適用されます。
- **\`+1 XAH\`**: 10 XAH のちょうど10%が \`forward_to\` に届きました。Emit されたトランザクションの手数料は Hook のアカウントが払います。

### 有用なリンク

- [Xahau Hooks 101](https://github.com/Handy4ndy/XahauHooks101)：Hooksのプログラミングを学ぶための基本的なhooksのコレクション、[@handy_andy](https://x.com/Handy_4ndy)によるEmitの例を含む。
- [Xahau Hook Tx Builder](https://tx-builder.xahau.tools/)：[@_tequ_](https://x.com/_tequ_)によるHooks用のJSONトランザクションからC言語への変換ツール。

`,
        ko: `Hook의 가장 강력한 기능 중 하나는 **새 트랜잭션을 스스로 발행**할 수 있다는 점입니다. 발행된 트랜잭션은 Hook이 설치된 계정이 보낸 것처럼 처리됩니다.

### emit() 흐름

1. \`etxn_reserve(N)\` 로 발행 수 예약
2. 직렬화된 트랜잭션 버퍼 구성
3. \`etxn_details()\` 로 발행 세부정보 준비
4. \`emit()\` 으로 레저에 제출

### cbak()의 역할

발행된 트랜잭션이 완료되면 \`cbak()\` 가 호출되어 결과를 확인하고 상태를 갱신할 수 있습니다.

### 발행할 Payment 만들기

예전 예제들은 \`PREPARE_PAYMENT_SIMPLE\` 매크로로 트랜잭션을 만듭니다. 지금 \`hooks-cli init\`이 만드는 헤더(버전 2.1.0)에는 이 매크로가 없으므로, 전달 Hook은 모든 헤더가 선언하는 함수만으로 Payment를 직접 만듭니다. 직접 만들면 발행된 트랜잭션에 정확히 무엇이 들어가는지도 알 수 있습니다.

| 필드 | 바이트 | 값 | 이유 |
|---|---|---|---|
| TransactionType | 3 | 0 (Payment) | 트랜잭션 종류 |
| Flags | 5 | tfCanonical | 정규 서명 형식을 뜻하는 표준 플래그 |
| Sequence | 5 | 0 | 발행된 트랜잭션은 계정의 Sequence를 쓰지 않음 |
| FirstLedgerSequence, LastLedgerSequence | 6 + 6 | 다음 레저부터 4개 더 | 네트워크가 적용할 수 있는 기간 |
| Amount | 9 | 결제액의 10% (drops) | bit 62는 양의 네이티브 금액을 표시 |
| Fee | 9 | \`etxn_fee_base()\` | 트랜잭션이 완성되어야 알 수 있으므로 마지막에 씀 |
| SigningPubKey | 35 | 비어 있음 | 발행된 트랜잭션은 서명하지 않으며, 권한은 발행한 Hook에 있음 |
| Account, Destination | 22 + 22 | Hook의 계정, \`forward_to\` | 지불하는 쪽과 받는 쪽 |
| EmitDetails | 116 | \`etxn_details()\`가 씀 | 발행된 트랜잭션을 그것을 촉발한 트랜잭션에 연결 |

필드는 **정규 순서**여야 합니다. 타입 코드 순, 그다음 필드 코드 순입니다. 표의 순서이자 레저가 직접 직렬화하는 순서입니다.

**주의할 경우: 버퍼 크기.** \`EmitDetails\`는 116바이트, Hook에 \`cbak()\`이 있으면 138바이트를 차지합니다. \`etxn_details()\`는 더 작은 버퍼를 거부하고 오류를 반환하며, 그러면 전달 Hook은 발행하지 않고 롤백합니다. 그래서 \`TX_SIZE\`는 \`FIELDS_SIZE + 116\`입니다. 이 Hook에 \`cbak()\`을 추가하면 138로 바꿔야 합니다.

테스트넷 결과 ([레슨 9.2](?m=9&l=1)처럼 Hook을 설치하고 \`forward_to\`를 두 번째 계정으로 정한 계정에 10 XAH를 지불):

\`\`\`
TransactionResult: tesSUCCESS
HookResult:        3
HookReturnString:  forwarder: 10% resent correctly
HookEmitCount:     1
forward_to balance: +1 XAH
\`\`\`

- **\`tesSUCCESS\`**: 들어온 결제가 적용되었습니다.
- **\`HookResult: 3\`**: Hook이 \`accept()\`로 끝났습니다. \`rollback()\`이었다면 결제 전체가 거부되었을 것입니다.
- **\`HookEmitCount: 1\`**: Hook이 트랜잭션 하나를 발행했습니다. 들어온 결제 안에서가 아니라 이후 레저에서 적용됩니다.
- **\`+1 XAH\`**: 10 XAH의 정확히 10%가 \`forward_to\`에 도착했습니다. 발행된 트랜잭션의 수수료는 Hook 계정이 냅니다.

### 활용 예시

- 받은 결제의 일부 자동 전달
- 여러 계정으로 분할 송금
- 조건 불충족 결제 자동 환불
- 상태 기반 후속 작업 실행

강력한 기능이지만 수수료와 복잡도가 함께 올라가므로, 발행 권한과 실행 흐름을 신중히 설계해야 합니다.`,
        zh: `Hook 最强大的能力之一，是可以**自行发出新的交易**。这些交易会被当作安装了 Hook 的账户亲自发送的一样处理。

### emit() 的流程

1. 用 \`etxn_reserve(N)\` 预留发交易数量
2. 构造序列化交易缓冲区
3. 用 \`etxn_details()\` 准备发出细节
4. 用 \`emit()\` 提交到账本

### cbak() 的作用

当发出的交易完成后，\`cbak()\` 会被调用，用来检查结果并更新状态。

### 构建要发出的 Payment

旧示例用 \`PREPARE_PAYMENT_SIMPLE\` 宏构建交易。如今 \`hooks-cli init\` 写出的头文件（2.1.0 版）不包含它，所以转发 Hook 只用所有头文件都声明的函数，手动构建 Payment。手动构建也能让你准确看到一笔发出的交易包含什么：

| 字段 | 字节 | 值 | 原因 |
|---|---|---|---|
| TransactionType | 3 | 0（Payment） | 交易类型 |
| Flags | 5 | tfCanonical | 表示规范签名格式的标准标志 |
| Sequence | 5 | 0 | 发出的交易不使用账户的 Sequence |
| FirstLedgerSequence、LastLedgerSequence | 6 + 6 | 下一个账本起再 4 个 | 网络可以应用它的时间窗口 |
| Amount | 9 | 付款的 10%，以 drops 计 | bit 62 表示正的原生金额 |
| Fee | 9 | \`etxn_fee_base()\` | 交易完整后才知道，所以最后写入 |
| SigningPubKey | 35 | 空 | 发出的交易不签名：它的权限来自发出它的 Hook |
| Account、Destination | 22 + 22 | Hook 的账户、\`forward_to\` | 谁付款、谁收款 |
| EmitDetails | 116 | 由 \`etxn_details()\` 写入 | 把发出的交易与触发它的交易关联起来 |

字段必须按**规范顺序**排列：先按类型代码，再按字段代码。这就是表格的顺序，也是账本自己序列化它们的顺序。

**需要注意的情况：缓冲区大小。** \`EmitDetails\` 占 116 字节，Hook 有 \`cbak()\` 时占 138。\`etxn_details()\` 会拒绝更小的缓冲区并返回错误，转发 Hook 就会回滚而不是发出。所以 \`TX_SIZE\` 是 \`FIELDS_SIZE + 116\`：给这个 Hook 加上 \`cbak()\`，就必须改为 138。

测试网上的结果（按[第 9.2 课](?m=9&l=1)的方式安装 Hook，\`forward_to\` 设为第二个账户，然后向它支付 10 XAH）：

\`\`\`
TransactionResult: tesSUCCESS
HookResult:        3
HookReturnString:  forwarder: 10% resent correctly
HookEmitCount:     1
forward_to balance: +1 XAH
\`\`\`

- **\`tesSUCCESS\`**：收到的付款已被应用。
- **\`HookResult: 3\`**：Hook 以 \`accept()\` 结束。若是 \`rollback()\`，整笔付款都会被拒绝。
- **\`HookEmitCount: 1\`**：Hook 发出了一笔交易。它在之后的账本中应用，而不是在收到的付款之内。
- **\`+1 XAH\`**：10 XAH 的正好 10% 到达了 \`forward_to\`。发出交易的手续费由 Hook 账户支付。

### 常见用途

- 自动转发收到付款的一部分
- 拆分转账到多个账户
- 对不符合条件的付款自动退款
- 基于状态触发后续动作

这个功能非常强大，但也会带来更高的费用和复杂度，因此必须谨慎设计发交易权限与执行流程。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Hook que reenvía el 10% de cada pago recibido",
            pt: "Hook que reenvíao 10% de cada pagamento recibido",
            en: "Hook that forwards 10% of each received payment",
            jp: "受信した各支払いの10%を転送するHook",
            ko: "받은 결제의 10%를 전달하는 Hook",
            zh: "将收到付款的 10% 自动转发的 Hook",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

/**
 * Hook: ten_percent_forwarder.c
 *
 * Cuando la cuenta recibe un pago en XAH, reenvía automáticamente
 * el 10% a la dirección hardcodeada en forward_to[].
 *
 * ── Cómo configurar la dirección destino ─────────────────────────────────
 * La dirección debe estar en formato Account ID (20 bytes en hex),
 * NO en formato rAddress. Para convertir usa una de estas herramientas:
 *   https://hooks.services/tools/raddress-to-accountid
 *   https://transia-rnd.github.io/xrpl-hex-visualizer/
 *
 * Ejemplo:
 *   rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
 *   → 4B50699E253C5098DEFE3A0872A79D129172F496
 *   → { 0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U }
 * ─────────────────────────────────────────────────────────────────────────
 */

// El Payment emitido: 122 bytes de campos y después los 116 bytes de
// EmitDetails que escribe etxn_details() (138 si el Hook tuviera cbak())
#define FIELDS_SIZE 122
#define TX_SIZE (FIELDS_SIZE + 116)

int64_t hook(uint32_t reserved)
{
    //Las iteraciones de nuestro Hook, en este caso solo 1, ya que solo emitiremos una transacción y no tenemos bucles
    _g(1, 1);
    // Reservar espacio para 1 emisión
    etxn_reserve(1);

    // Dirección destino del 10% — reemplaza estos bytes con los de tu cuenta
    // rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r - Saca tu traducción en https://hooks.services/tools/raddress-to-accountid
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };

    // Solo procesar pagos (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: no es un pago"), __LINE__);

    // Obtener el destino de la transacción entrante
    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: no se pudo leer el destino"), __LINE__);

    // Obtener el Account ID de la cuenta que tiene el Hook instalado
    uint8_t hook_accid[20];
    hook_account(SBUF(hook_accid));

    // Solo actuar si el Hook es el destinatario del pago (pago entrante)
    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: pago saliente, ignorar"), __LINE__);

    // Leer el Amount — XAH nativo ocupa exactamente 8 bytes
    unsigned char amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: no es XAH nativo"), __LINE__);

    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);

    // Calcular el 10%
    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);

    if (drops_to_forward < 1)
        accept(SBUF("forwarder: importe demasiado pequeño"), __LINE__);

    // ── Construir el Payment, campo a campo ─────────────────────────────────
    // Los campos van en orden canónico: por código de tipo y luego por código de campo.
    // Cada uno empieza con el/los byte(s) de ID del campo y después el valor.
    uint8_t tx[TX_SIZE];
    uint8_t* p = tx;
    uint32_t seq = (uint32_t)ledger_seq();

    // TransactionType (UInt16) = 0, Payment
    p[0] = 0x12U; p[1] = 0x00U; p[2] = 0x00U; p += 3;
    // Flags (UInt32) = tfCanonical
    p[0] = 0x22U; UINT32_TO_BUF(p + 1, tfCANONICAL); p += 5;
    // Sequence (UInt32) = 0: una transacción emitida no usa el Sequence de la cuenta
    p[0] = 0x24U; UINT32_TO_BUF(p + 1, 0); p += 5;
    // FirstLedgerSequence y LastLedgerSequence: válida desde el siguiente ledger y 4 más
    p[0] = 0x20U; p[1] = 0x1AU; UINT32_TO_BUF(p + 2, seq + 1); p += 6;
    p[0] = 0x20U; p[1] = 0x1BU; UINT32_TO_BUF(p + 2, seq + 5); p += 6;
    // Amount (nativo): 8 bytes; el bit 62 activo significa "cantidad positiva de XAH en drops"
    p[0] = 0x61U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL + (uint64_t)drops_to_forward); p += 9;
    // Fee: se escribe 0 por ahora y se rellena cuando la transacción está completa
    uint8_t* fee_ptr = p;
    p[0] = 0x68U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL); p += 9;
    // SigningPubKey: vacío (33 bytes a cero). Las transacciones emitidas no se firman
    p[0] = 0x73U; p[1] = 0x21U;
    for (int i = 0; GUARD(33), i < 33; ++i) p[2 + i] = 0;
    p += 35;
    // Account (la propia cuenta del Hook) y Destination
    p[0] = 0x81U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = hook_accid[i];
    p += 22;
    p[0] = 0x83U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = forward_to[i];
    p += 22;

    // EmitDetails: etxn_details() lo escribe al final del buffer.
    // Necesita 116 bytes (138 con cbak()) o devuelve un error
    if (etxn_details((uint32_t)p, TX_SIZE - FIELDS_SIZE) < 0)
        rollback(SBUF("forwarder: etxn_details failed"), __LINE__);

    // Con la transacción completa, pide su fee y escríbelo
    int64_t fee = etxn_fee_base(SBUF(tx));
    UINT64_TO_BUF(fee_ptr + 1, 0x4000000000000000ULL + (uint64_t)fee);

    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));

    if (emit_result < 0)
        rollback(SBUF("forwarder: error al emitir el pago"), __LINE__);

    accept(SBUF("forwarder: 10% reenviado correctamente"), __LINE__);
    return 0;
}`,
            pt: `#include "hookapi.h"
/**
 * Hook: ten_percent_forwarder.c
 *
 * Quando a conta recebe um pagamento em XAH, reenvia automaticamente
 * o 10% à endereço hardcodeada em forward_to[].
 *
 * ── Como configurar o endereço destino ─────────────────────────────────
 * O endereço deve estar em formato Account ID (20 bytes em hex),
 * NÃO em formato rAddress. Para converter usa uma de estas ferramentas:
 *   https://hooks.services/tools/raddress-to-accountid
 *   https://transia-rnd.github.io/xrpl-hex-visualizer/
 *
 * Exemplo:
 *   rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
 *   → 4B50699E253C5098DEFE3A0872A79D129172F496
 *   → { 0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U }
 * ─────────────────────────────────────────────────────────────────────────
 */
// O Payment emitido: 122 bytes de campos e depois os 116 bytes de
// EmitDetails que etxn_details() escreve (138 se o Hook tivesse cbak())
#define FIELDS_SIZE 122
#define TX_SIZE (FIELDS_SIZE + 116)

int64_t hook(uint32_t reserved)
{
    // As iterações do Hook: apenas 1, pois ele não tem loops e emite uma única transação
    _g(1, 1);
    // Reservar espaço para 1 emissão
    etxn_reserve(1);
    // Endereço de destino dos 10%: substitua estes bytes pelos da sua conta
    // rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r. Converta o seu em https://hooks.services/tools/raddress-to-accountid
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };
    // Apenas processar pagamentos (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: nao e um pagamento"), __LINE__);
    // Obter o destino da transação recebida
    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: não foi possível ler o destino"), __LINE__);
    // Obter ou Account ID da conta que tno Hook instalado
    uint8_t hook_accid[20];
    hook_account(SBUF(hook_accid));
    // Só continuar se o Hook for o destinatário do pagamento (pagamento recebido)
    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: pagamento de saida, ignorar"), __LINE__);
    // Ler ou Amount — XAH nativo ocupa exatamente 8 bytes
    unsigned char amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: no é XAH nativo"), __LINE__);
    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);
    // Calcular ou 10%
    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);
    if (drops_to_forward < 1)
        accept(SBUF("forwarder: montante pequeno demais"), __LINE__);
    // ── Montar o Payment, campo a campo ─────────────────────────────────
    // Os campos seguem a ordem canônica: por código de tipo e depois por código de campo.
    // Cada um começa com o(s) byte(s) de ID do campo e depois o valor.
    uint8_t tx[TX_SIZE];
    uint8_t* p = tx;
    uint32_t seq = (uint32_t)ledger_seq();

    // TransactionType (UInt16) = 0, Payment
    p[0] = 0x12U; p[1] = 0x00U; p[2] = 0x00U; p += 3;
    // Flags (UInt32) = tfCanonical
    p[0] = 0x22U; UINT32_TO_BUF(p + 1, tfCANONICAL); p += 5;
    // Sequence (UInt32) = 0: uma transação emitida não usa o Sequence da conta
    p[0] = 0x24U; UINT32_TO_BUF(p + 1, 0); p += 5;
    // FirstLedgerSequence e LastLedgerSequence: válida a partir do próximo ledger por mais 4
    p[0] = 0x20U; p[1] = 0x1AU; UINT32_TO_BUF(p + 2, seq + 1); p += 6;
    p[0] = 0x20U; p[1] = 0x1BU; UINT32_TO_BUF(p + 2, seq + 5); p += 6;
    // Amount (nativo): 8 bytes; o bit 62 ativo significa "quantia positiva de XAH em drops"
    p[0] = 0x61U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL + (uint64_t)drops_to_forward); p += 9;
    // Fee: escrito como 0 por enquanto e preenchido quando a transação estiver completa
    uint8_t* fee_ptr = p;
    p[0] = 0x68U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL); p += 9;
    // SigningPubKey: vazio (33 bytes zero). Transações emitidas não são assinadas
    p[0] = 0x73U; p[1] = 0x21U;
    for (int i = 0; GUARD(33), i < 33; ++i) p[2 + i] = 0;
    p += 35;
    // Account (a própria conta do Hook) e Destination
    p[0] = 0x81U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = hook_accid[i];
    p += 22;
    p[0] = 0x83U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = forward_to[i];
    p += 22;

    // EmitDetails: etxn_details() o escreve no fim do buffer.
    // Precisa de 116 bytes (138 com cbak()) ou retorna um erro
    if (etxn_details((uint32_t)p, TX_SIZE - FIELDS_SIZE) < 0)
        rollback(SBUF("forwarder: etxn_details failed"), __LINE__);

    // Com a transação completa, peça o fee e escreva-o
    int64_t fee = etxn_fee_base(SBUF(tx));
    UINT64_TO_BUF(fee_ptr + 1, 0x4000000000000000ULL + (uint64_t)fee);
    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));
    if (emit_result < 0)
        rollback(SBUF("forwarder: erro ao emitir o pagamento"), __LINE__);
    accept(SBUF("forwarder: 10% reenviado corretamente"), __LINE__);
    return 0;
}`,
            en: `#include "hookapi.h"

/**
 * Hook: ten_percent_forwarder.c
 *
 * When the account receives a payment in XAH, it automatically forwards 10%
 * to the hardcoded address in forward_to[].
 *
 * ── How to configure the destination address ──────────────────────────────
 * The address must be in Account ID format (20 bytes in hex),
 * NOT in rAddress format. To convert, use one of these tools:
 *   https://hooks.services/tools/raddress-to-accountid
 *   https://transia-rnd.github.io/xrpl-hex-visualizer/
 *
 * Example:
 *   rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
 *   → 4B50699E253C5098DEFE3A0872A79D129172F496
 *   → { 0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U }
 * ─────────────────────────────────────────────────────────────────────────
 */

// The emitted Payment: 122 bytes of fields, then the 116 bytes of
// EmitDetails that etxn_details() writes (138 if the Hook had a cbak())
#define FIELDS_SIZE 122
#define TX_SIZE (FIELDS_SIZE + 116)

int64_t hook(uint32_t reserved)
{
    // The Hook's iterations: 1, because there are no loops and it emits one transaction
    _g(1, 1);
    // Reserve 1 space for the emission
    etxn_reserve(1);

    // Destination address for 10%: replace these bytes with your account
    // rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r. Convert yours at https://hooks.services/tools/raddress-to-accountid
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };

    // Only proceed with payment transactions (type 0)
    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: not a payment"), __LINE__);

    // Obtain the destination of the incoming transaction
    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: not able to find the destination"), __LINE__);

    // Obtain the Account ID of the account that has the Hook installed
    uint8_t hook_accid[20];
    hook_account(SBUF(hook_accid));

    // Only proceed if the Hook is the destination of the payment (incoming payment)
    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: outgoing payment, ignore"), __LINE__);

    // Read the Amount: native XAH is 8 bytes long
    uint8_t amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: not native XAH"), __LINE__);

    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);

    // Calculate the 10%
    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);

    if (drops_to_forward < 1)
        accept(SBUF("forwarder: amount too small"), __LINE__);

    // ── Build the Payment, field by field ─────────────────────────────────
    // Fields go in canonical order: by type code, then by field code.
    // Each starts with its field ID byte(s), then the value.
    uint8_t tx[TX_SIZE];
    uint8_t* p = tx;
    uint32_t seq = (uint32_t)ledger_seq();

    // TransactionType (UInt16) = 0, Payment
    p[0] = 0x12U; p[1] = 0x00U; p[2] = 0x00U; p += 3;
    // Flags (UInt32) = tfCanonical
    p[0] = 0x22U; UINT32_TO_BUF(p + 1, tfCANONICAL); p += 5;
    // Sequence (UInt32) = 0: an emitted transaction doesn't use the account's Sequence
    p[0] = 0x24U; UINT32_TO_BUF(p + 1, 0); p += 5;
    // FirstLedgerSequence and LastLedgerSequence: valid from the next ledger for 4 more
    p[0] = 0x20U; p[1] = 0x1AU; UINT32_TO_BUF(p + 2, seq + 1); p += 6;
    p[0] = 0x20U; p[1] = 0x1BU; UINT32_TO_BUF(p + 2, seq + 5); p += 6;
    // Amount (native): 8 bytes, bit 62 set means "positive XAH amount in drops"
    p[0] = 0x61U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL + (uint64_t)drops_to_forward); p += 9;
    // Fee: written as 0 for now, filled in once the whole transaction exists
    uint8_t* fee_ptr = p;
    p[0] = 0x68U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL); p += 9;
    // SigningPubKey: empty (33 zero bytes). Emitted transactions are not signed
    p[0] = 0x73U; p[1] = 0x21U;
    for (int i = 0; GUARD(33), i < 33; ++i) p[2 + i] = 0;
    p += 35;
    // Account (the Hook's own account) and Destination
    p[0] = 0x81U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = hook_accid[i];
    p += 22;
    p[0] = 0x83U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = forward_to[i];
    p += 22;

    // EmitDetails: etxn_details() writes it at the end of the buffer.
    // It needs 116 bytes (138 with a cbak()) or it returns an error
    if (etxn_details((uint32_t)p, TX_SIZE - FIELDS_SIZE) < 0)
        rollback(SBUF("forwarder: etxn_details failed"), __LINE__);

    // Now that the transaction is complete, ask for its fee and write it in
    int64_t fee = etxn_fee_base(SBUF(tx));
    UINT64_TO_BUF(fee_ptr + 1, 0x4000000000000000ULL + (uint64_t)fee);

    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));

    if (emit_result < 0)
        rollback(SBUF("forwarder: error emitting the payment"), __LINE__);

    accept(SBUF("forwarder: 10% resent correctly"), __LINE__);
    return 0;
}`,
            jp: `#include "hookapi.h"

/**
 * Hook: ten_percent_forwarder.c
 *
 * アカウントがXAHで支払いを受け取ると、自動的に10%を
 * forward_to[]にハードコードされたアドレスに転送する。
 *
 * ── 転送先アドレスの設定方法 ─────────────────────────────────
 * アドレスはAccount ID形式（hexの20バイト）である必要があります。
 * rAddress形式ではありません。変換するには以下のツールを使用：
 *   https://hooks.services/tools/raddress-to-accountid
 *   https://transia-rnd.github.io/xrpl-hex-visualizer/
 *
 * 例：
 *   rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
 *   → 4B50699E253C5098DEFE3A0872A79D129172F496
 *   → { 0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U }
 * ─────────────────────────────────────────────────────────────────────────
 */

// Emit する Payment: 122 バイトのフィールドの後に、etxn_details() が書き込む
// 116 バイトの EmitDetails（Hook に cbak() があれば 138）
#define FIELDS_SIZE 122
#define TX_SIZE (FIELDS_SIZE + 116)

int64_t hook(uint32_t reserved)
{
    // Hookのイテレーション数。ここでは1、ループなしで1つのトランザクションのみEmitするため
    _g(1, 1);
    // 1回のEmitのためのスペースを確保する
    etxn_reserve(1);

    // 10%の転送先アドレス — これらのバイトを自分のアカウントのものに置き換える
    // rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r - 変換はこちら: https://hooks.services/tools/raddress-to-accountid
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };

    // 支払いトランザクション（タイプ0）のみ処理する
    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: 支払いではありません"), __LINE__);

    // 着信トランザクションの宛先を取得する
    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: 宛先を読み取れませんでした"), __LINE__);

    // HookがインストールされているアカウントのAccount IDを取得する
    uint8_t hook_accid[20];
    hook_account(SBUF(hook_accid));

    // Hookが支払いの受取人である場合のみ処理する（着信支払い）
    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: 送信支払い、無視する"), __LINE__);

    // Amountを読み取る — ネイティブXAHはちょうど8バイト
    unsigned char amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: ネイティブXAHではありません"), __LINE__);

    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);

    // 10%を計算する
    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);

    if (drops_to_forward < 1)
        accept(SBUF("forwarder: 金額が少なすぎます"), __LINE__);

    // ── Payment をフィールドごとに組み立てる ─────────────────────────────────
    // フィールドは正規の順序で並べる: 型コード順、次にフィールドコード順。
    // 各フィールドはフィールド ID のバイトで始まり、その後に値が続く。
    uint8_t tx[TX_SIZE];
    uint8_t* p = tx;
    uint32_t seq = (uint32_t)ledger_seq();

    // TransactionType (UInt16) = 0、Payment
    p[0] = 0x12U; p[1] = 0x00U; p[2] = 0x00U; p += 3;
    // Flags (UInt32) = tfCanonical
    p[0] = 0x22U; UINT32_TO_BUF(p + 1, tfCANONICAL); p += 5;
    // Sequence (UInt32) = 0: Emit されたトランザクションはアカウントの Sequence を使わない
    p[0] = 0x24U; UINT32_TO_BUF(p + 1, 0); p += 5;
    // FirstLedgerSequence と LastLedgerSequence: 次のレジャーから4レジャーの間有効
    p[0] = 0x20U; p[1] = 0x1AU; UINT32_TO_BUF(p + 2, seq + 1); p += 6;
    p[0] = 0x20U; p[1] = 0x1BU; UINT32_TO_BUF(p + 2, seq + 5); p += 6;
    // Amount（ネイティブ）: 8 バイト。bit 62 が立っていれば「drops 単位の正の XAH 金額」
    p[0] = 0x61U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL + (uint64_t)drops_to_forward); p += 9;
    // Fee: いったん 0 を書き、トランザクションが完成してから埋める
    uint8_t* fee_ptr = p;
    p[0] = 0x68U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL); p += 9;
    // SigningPubKey: 空（33 バイトのゼロ）。Emit されたトランザクションは署名されない
    p[0] = 0x73U; p[1] = 0x21U;
    for (int i = 0; GUARD(33), i < 33; ++i) p[2 + i] = 0;
    p += 35;
    // Account（Hook 自身のアカウント）と Destination
    p[0] = 0x81U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = hook_accid[i];
    p += 22;
    p[0] = 0x83U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = forward_to[i];
    p += 22;

    // EmitDetails: etxn_details() がバッファの末尾に書き込む。
    // 116 バイト（cbak() があれば 138）必要で、足りなければエラーを返す
    if (etxn_details((uint32_t)p, TX_SIZE - FIELDS_SIZE) < 0)
        rollback(SBUF("forwarder: etxn_details failed"), __LINE__);

    // トランザクションが完成したら fee を求めて書き込む
    int64_t fee = etxn_fee_base(SBUF(tx));
    UINT64_TO_BUF(fee_ptr + 1, 0x4000000000000000ULL + (uint64_t)fee);

    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));

    if (emit_result < 0)
        rollback(SBUF("forwarder: 支払いのEmitエラー"), __LINE__);

    accept(SBUF("forwarder: 10%を正常に転送しました"), __LINE__);
    return 0;
}`,
            ko: `#include "hookapi.h"

/**
 * Hook: ten_percent_forwarder.c
 *
 * 계정이 XAH 결제를 받으면 자동으로 10%를
 * forward_to[] 에 지정된 주소로 전달한다.
 */

// 발행할 Payment: 122바이트의 필드 다음에 etxn_details()가 쓰는
// 116바이트의 EmitDetails (Hook에 cbak()이 있으면 138)
#define FIELDS_SIZE 122
#define TX_SIZE (FIELDS_SIZE + 116)

int64_t hook(uint32_t reserved)
{
    // 루프 없이 한 번만 발행하므로 1회 guard
    _g(1, 1);
    etxn_reserve(1);

    // 10%를 보낼 목적지 주소
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };

    // 결제(type 0)만 처리
    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: 결제가 아닙니다"), __LINE__);

    // 들어온 트랜잭션의 목적지 확인
    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: 목적지를 읽을 수 없습니다"), __LINE__);

    uint8_t hook_accid[20];
    hook_account(SBUF(hook_accid));

    // Hook 계정이 실제 수신자인 경우만 처리
    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: 송신 결제이므로 무시"), __LINE__);

    // 네이티브 XAH 금액 읽기
    unsigned char amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: 네이티브 XAH가 아닙니다"), __LINE__);

    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);

    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);

    if (drops_to_forward < 1)
        accept(SBUF("forwarder: 금액이 너무 작습니다"), __LINE__);

    // ── Payment를 필드별로 만들기 ─────────────────────────────────
    // 필드는 정규 순서로: 타입 코드 순, 그다음 필드 코드 순.
    // 각 필드는 필드 ID 바이트로 시작하고 그 뒤에 값이 옴.
    uint8_t tx[TX_SIZE];
    uint8_t* p = tx;
    uint32_t seq = (uint32_t)ledger_seq();

    // TransactionType (UInt16) = 0, Payment
    p[0] = 0x12U; p[1] = 0x00U; p[2] = 0x00U; p += 3;
    // Flags (UInt32) = tfCanonical
    p[0] = 0x22U; UINT32_TO_BUF(p + 1, tfCANONICAL); p += 5;
    // Sequence (UInt32) = 0: 발행된 트랜잭션은 계정의 Sequence를 쓰지 않음
    p[0] = 0x24U; UINT32_TO_BUF(p + 1, 0); p += 5;
    // FirstLedgerSequence와 LastLedgerSequence: 다음 레저부터 4개 레저 동안 유효
    p[0] = 0x20U; p[1] = 0x1AU; UINT32_TO_BUF(p + 2, seq + 1); p += 6;
    p[0] = 0x20U; p[1] = 0x1BU; UINT32_TO_BUF(p + 2, seq + 5); p += 6;
    // Amount (네이티브): 8바이트, bit 62가 켜져 있으면 "drops 단위의 양의 XAH 금액"
    p[0] = 0x61U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL + (uint64_t)drops_to_forward); p += 9;
    // Fee: 우선 0으로 쓰고 트랜잭션이 완성되면 채움
    uint8_t* fee_ptr = p;
    p[0] = 0x68U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL); p += 9;
    // SigningPubKey: 비어 있음 (0으로 된 33바이트). 발행된 트랜잭션은 서명하지 않음
    p[0] = 0x73U; p[1] = 0x21U;
    for (int i = 0; GUARD(33), i < 33; ++i) p[2 + i] = 0;
    p += 35;
    // Account (Hook 자신의 계정)와 Destination
    p[0] = 0x81U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = hook_accid[i];
    p += 22;
    p[0] = 0x83U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = forward_to[i];
    p += 22;

    // EmitDetails: etxn_details()가 버퍼 끝에 씀.
    // 116바이트(cbak()이 있으면 138)가 필요하며 부족하면 오류를 반환
    if (etxn_details((uint32_t)p, TX_SIZE - FIELDS_SIZE) < 0)
        rollback(SBUF("forwarder: etxn_details failed"), __LINE__);

    // 트랜잭션이 완성되면 fee를 구해 써 넣음
    int64_t fee = etxn_fee_base(SBUF(tx));
    UINT64_TO_BUF(fee_ptr + 1, 0x4000000000000000ULL + (uint64_t)fee);

    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));

    if (emit_result < 0)
        rollback(SBUF("forwarder: 결제 발행 오류"), __LINE__);

    accept(SBUF("forwarder: 10%가 정상적으로 전달되었습니다"), __LINE__);
    return 0;
}`,
            zh: `#include "hookapi.h"

/**
 * Hook: ten_percent_forwarder.c
 *
 * 当账户收到 XAH 付款时，会自动将 10%
 * 转发到 forward_to[] 中指定的地址。
 */

// 发出的 Payment：122 字节的字段，之后是 etxn_details() 写入的
// 116 字节 EmitDetails（Hook 有 cbak() 时为 138）
#define FIELDS_SIZE 122
#define TX_SIZE (FIELDS_SIZE + 116)

int64_t hook(uint32_t reserved)
{
    // 没有循环，且只发出一笔交易，所以 guard 为 1 次
    _g(1, 1);
    etxn_reserve(1);

    // 10% 转发目标地址
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };

    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: 这不是付款"), __LINE__);

    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: 无法读取目标地址"), __LINE__);

    uint8_t hook_accid[20];
    hook_account(SBUF(hook_accid));

    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: 这是转出付款，忽略"), __LINE__);

    unsigned char amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: 不是原生 XAH"), __LINE__);

    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);

    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);

    if (drops_to_forward < 1)
        accept(SBUF("forwarder: 金额太小"), __LINE__);

    // ── 逐个字段构建 Payment ─────────────────────────────────
    // 字段按规范顺序排列：先按类型代码，再按字段代码。
    // 每个字段先写字段 ID 字节，再写值。
    uint8_t tx[TX_SIZE];
    uint8_t* p = tx;
    uint32_t seq = (uint32_t)ledger_seq();

    // TransactionType (UInt16) = 0，Payment
    p[0] = 0x12U; p[1] = 0x00U; p[2] = 0x00U; p += 3;
    // Flags (UInt32) = tfCanonical
    p[0] = 0x22U; UINT32_TO_BUF(p + 1, tfCANONICAL); p += 5;
    // Sequence (UInt32) = 0：发出的交易不使用账户的 Sequence
    p[0] = 0x24U; UINT32_TO_BUF(p + 1, 0); p += 5;
    // FirstLedgerSequence 和 LastLedgerSequence：从下一个账本起的 4 个账本内有效
    p[0] = 0x20U; p[1] = 0x1AU; UINT32_TO_BUF(p + 2, seq + 1); p += 6;
    p[0] = 0x20U; p[1] = 0x1BU; UINT32_TO_BUF(p + 2, seq + 5); p += 6;
    // Amount（原生）：8 字节，设置 bit 62 表示“以 drops 计的正 XAH 金额”
    p[0] = 0x61U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL + (uint64_t)drops_to_forward); p += 9;
    // Fee：先写 0，交易完整后再填入
    uint8_t* fee_ptr = p;
    p[0] = 0x68U; UINT64_TO_BUF(p + 1, 0x4000000000000000ULL); p += 9;
    // SigningPubKey：为空（33 个零字节）。发出的交易不签名
    p[0] = 0x73U; p[1] = 0x21U;
    for (int i = 0; GUARD(33), i < 33; ++i) p[2 + i] = 0;
    p += 35;
    // Account（Hook 自己的账户）和 Destination
    p[0] = 0x81U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = hook_accid[i];
    p += 22;
    p[0] = 0x83U; p[1] = 0x14U;
    for (int i = 0; GUARD(20), i < 20; ++i) p[2 + i] = forward_to[i];
    p += 22;

    // EmitDetails：由 etxn_details() 写在缓冲区末尾。
    // 需要 116 字节（有 cbak() 时为 138），否则返回错误
    if (etxn_details((uint32_t)p, TX_SIZE - FIELDS_SIZE) < 0)
        rollback(SBUF("forwarder: etxn_details failed"), __LINE__);

    // 交易完整后，获取它的 fee 并写入
    int64_t fee = etxn_fee_base(SBUF(tx));
    UINT64_TO_BUF(fee_ptr + 1, 0x4000000000000000ULL + (uint64_t)fee);

    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));

    if (emit_result < 0)
        rollback(SBUF("forwarder: 发出付款时出错"), __LINE__);

    accept(SBUF("forwarder: 已成功转发 10%"), __LINE__);
    return 0;
}`,
          },
        },

      ],
      slides: [
        {
          title: { es: "emit() — Transacciones autonomas", pt: "emit() — Transações autonomas", en: "emit() — Autonomous transactions", jp: "emit() — 自律的なトランザクション", ko: "emit() — 자율 트랜잭션", zh: "emit() — 自主交易" },
          content: {
            es: "Los Hooks pueden crear transacciones nuevas\n\n• emit() envia transacciones al ledger\n• Se ejecutan como si la cuenta las enviara\n• Pagos, ofertas, cualquier tipo soportado\n• etxn_reserve(N) obligatorio antes de emitir",
            pt: "Os Hooks podem criar transações novas\n\n• emit() envia transações ao ledger\n• Se executam como se a conta as tivesse enviado\n• Pagamentos, ofertas, qualquer tipo suportado\n• etxn_reserve(N) obrigatório antes de emitir",
            en: "Hooks can create new transactions\n\n• emit() sends transactions to the ledger\n• Execute as if the account sent them\n• Payments, offers, any supported type\n• etxn_reserve(N) mandatory before emitting",
            jp: "Hooksは新しいトランザクションを作成できる\n\n• emit() はレジャーにトランザクションを送信する\n• アカウントが送信したかのように実行される\n• 支払い、オファー、サポートされているあらゆるタイプ\n• etxn_reserve(N) はEmit前に必須",
            ko: "Hook은 새 트랜잭션을 만들 수 있음\n\n• emit() 으로 레저에 전송\n• 계정이 직접 보낸 것처럼 실행\n• 결제, 오퍼 등 지원되는 모든 타입 가능\n• emit 전에 etxn_reserve(N) 필수",
            zh: "Hook 可以创建新的交易\n\n• 使用 emit() 发送到账本\n• 执行方式如同账户亲自发送\n• 可用于付款、挂单等任意支持的类型\n• emit 前必须先调用 etxn_reserve(N)",
          },
          visual: "📤",
        },
        {
          title: { es: "Flujo de emision", pt: "Fluxo de emissão", en: "Emission flow", jp: "Emitのフロー", ko: "Emit 흐름", zh: "发出流程" },
          content: {
            es: "1. etxn_reserve(N) → Reservar espacio\n2. Construir tx serializada en buffer\n3. etxn_details() → Preparar detalles\n4. emit() → Enviar al ledger\n\ncbak() se ejecuta cuando la emision\ncompleta (exito o fallo)",
            pt: `1. etxn_reserve(N) → Reservar espaço
2. Construir tx serializada em buffer
3. etxn_details() → Preparar detalhes
4. emit() → Enviar ao ledger

cbak() é executada quando a emissão
concluída (sucesso ou falha)`,
            en: "1. etxn_reserve(N) → Reserve space\n2. Build serialized tx in buffer\n3. etxn_details() → Prepare details\n4. emit() → Send to ledger\n\ncbak() executes when emission\ncompletes (success or failure)",
            jp: "1. etxn_reserve(N) → スペースを確保\n2. バッファにシリアライズされたtxを構築\n3. etxn_details() → 詳細を準備\n4. emit() → レジャーに送信\n\ncbak() はEmitが完了したときに実行\n（成功または失敗）",
            ko: "1. etxn_reserve(N) → 공간 예약\n2. 버퍼에 직렬화된 tx 구성\n3. etxn_details() → 세부정보 준비\n4. emit() → 레저에 전송\n\ncbak() 은 발행 완료 후\n성공/실패 결과를 받음",
            zh: "1. etxn_reserve(N) → 预留空间\n2. 在缓冲区中构建序列化交易\n3. etxn_details() → 准备细节\n4. emit() → 发送到账本\n\ncbak() 会在发出完成后收到\n成功或失败结果",
          },
          visual: "📝",
        },
        {
          title: { es: "Casos de uso y limitaciones", pt: "Casos de uso e limitações", en: "Use cases and limitations", jp: "ユースケースと制限事項", ko: "활용 사례와 제한사항", zh: "使用场景与限制" },
          content: {
            es: "Casos de uso:\n• Auto-forwarding de pagos\n• Splitting entre varias cuentas\n• Refunds automaticos\n• Acciones programadas\n\nLimitaciones:\n• Maximo de emisiones por ejecucion\n• Fees propios por emision\n• _g() previene emisiones infinitas",
            pt: `Casos de uso:
• Auto-forwarding de pagamentos
• Splitting entre várias contas
• Refunds automaticos
• Ações programadas

Limitações:
• Máximo de emissões por execução
• Fees próprias por emissão
• _g() impede emissões infinitas`,
            en: "Use cases:\n• Auto-forwarding of payments\n• Splitting between multiple accounts\n• Automatic refunds\n• Scheduled actions\n\nLimitations:\n• Maximum emissions per execution\n• Own fees per emission\n• _g() prevents infinite emissions",
            jp: "ユースケース：\n• 支払いの自動転送\n• 複数アカウント間の分割\n• 自動返金\n• スケジュールされたアクション\n\n制限事項：\n• 実行ごとの最大Emit回数\n• Emit固有の手数料\n• _g() は無限Emitを防ぐ",
            ko: "활용 예시:\n• 결제 자동 전달\n• 여러 계정으로 분할 송금\n• 자동 환불\n• 예약된 후속 작업\n\n제한사항:\n• 실행당 발행 횟수 제한\n• 발행 자체 수수료 발생\n• _g() 가 무한 발행 방지",
            zh: "使用场景：\n• 自动转发付款\n• 拆分到多个账户\n• 自动退款\n• 计划好的后续动作\n\n限制：\n• 每次执行可发出的交易数有限\n• 发出的交易本身也会产生费用\n• _g() 可防止无限发出",
          },
          visual: "🔀",
        },
      ],
    },
    {
      id: "m8l5",
      title: {
        es: "Parámetros, funciones y gestión de Hooks",
        pt: "Parâmetros, funções e gestão de Hooks",
        en: "Parameters, functions and Hook management",
        jp: "Hooksのパラメーター、関数と管理",
        ko: "파라미터, 함수, Hook 관리",
        zh: "参数、函数与 Hook 管理",
      },
      theory: {
        es: `El comportamiento de un Hook puede depender de datos que llegan con cada transacción, no solo de su código. Esos datos viajan en **parámetros**: pares nombre/valor, ambos en hex. Hay dos clases y responden a preguntas distintas:

| | Parámetros del Hook (\`hook_param()\`) | Parámetros de la transacción (\`otxn_param()\`) |
|---|---|---|
| **Se fijan en** | El \`SetHook\` que instala el Hook | El campo \`HookParameters\` de cada transacción |
| **Los fija** | Quien instala el Hook | Quien envía la transacción |
| **Cambian** | Solo al reinstalar el Hook | Con cada transacción |
| **Úsalos para** | Configuración: límites, direcciones, comisiones | Instrucciones: un modo de operación, una referencia, un código |

Esta lección trata los parámetros de la transacción: quien envía le dice al Hook qué hacer con ese pago concreto.

### Leer un parámetro con otxn_param()

\`\`\`c
int64_t otxn_param(
    uint32_t write_ptr,  // buffer the value is written to
    uint32_t write_len,  // size of that buffer
    uint32_t read_ptr,   // the parameter's name
    uint32_t read_len    // length of the name
);
\`\`\`

Busca el nombre en los \`HookParameters\` de la transacción que activó el Hook y copia el valor en tu buffer. El valor de retorno indica qué pasó:

- **Positivo**: el número de bytes escritos. Úsalo como longitud del valor, no el tamaño del buffer: el resto del buffer sigue a ceros.
- **Negativo**: el parámetro no está, o el buffer es demasiado pequeño para él. El Hook tiene que manejar este caso; la transacción puede sencillamente no traer el parámetro.

Los nombres y valores se comparan como bytes exactos: \`ACCION\` y \`accion\` son nombres distintos.

### Pruébalo

La pestaña Código tiene los dos lados: un Hook que lee el parámetro \`ACCION\` y lo traza, y \`send-parameters.js\`, que envía un Payment de 1 XAH con ese parámetro.

1. Compila el Hook e instálalo en una cuenta, activado con Payments, como en la [lección 9.2](?m=9&l=1) (o con hooks-cli, [lección 9.8](?m=9&l=7)).
2. Abre el debug stream de la cuenta del Hook y después envía el pago, pasando la cuenta del Hook como argumento:

\`\`\`bash
hooks-cli debug "Hook" <HookAccount>     # terminal 1: el debug stream del Hook
node send-parameters.js <HookAccount>   # terminal 2: envía un Payment con el parámetro
\`\`\`

El debug stream es donde va la salida de \`trace()\`; lo explica la [lección 9.6](?m=9&l=5), y Hooks Builder muestra el mismo stream en el navegador. Sin una dirección válida, \`send-parameters.js\` se detiene antes de enviar nada y dice qué pasar.

### Qué significa la salida

\`send-parameters.js\` en testnet (con la versión en inglés del ejemplo, que usa \`ACTION = hello\`):

\`\`\`
Sending Payment with HookParameters...
  Param name (hex):  414354494F4E  = ACTION
  Param value (hex):  68656C6C6F
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: parameter read and plotted
\`\`\`

- **\`414354494F4E\`**: "ACTION" en hex. \`68656C6C6F\` es "hello".
- **\`Result: tesSUCCESS\`**: el pago se aplicó y el Hook se ejecutó como parte de él.
- **\`Hook result: 3 | …\`**: leído de los metadatos de la transacción. \`3\` significa que el Hook terminó con \`accept()\`, y el texto es la cadena que pasó a \`accept()\`. Así confirma un script lo que hizo un Hook sin mirar el debug stream.

El debug stream del mismo pago (prefijos acortados):

\`\`\`
HookTrace: otxn_param_demo: hook() initiated:
HookTrace: param_name: 414354494F4E
HookTrace: value_len: 5
HookTrace: param_value: 68656C6C6F000000000000000000000000000000000000000000000000000000
HookTrace: otxn_param_demo: ACTION value (text): : hello
HookTrace: otxn_param_demo: ACTION value (hex): : 68656C6C6F
HookInfo: ACCEPT RS: 'otxn_param_demo: parameter read and plotted'
\`\`\`

- **\`param_name: 414354494F4E\`**: \`TRACEHEX\` del nombre que se busca.
- **\`value_len: 5\`**: \`otxn_param()\` encontró el parámetro y escribió 5 bytes.
- **\`param_value: 68656C6C…0000\`**: \`TRACEHEX\` imprime el buffer entero de 32 bytes, ceros incluidos. Por eso el Hook traza el valor usando \`value_len\`.
- **\`(text): hello\` y \`(hex): 68656C6C6F\`**: los mismos 5 bytes, como texto y como hex.
- **\`ACCEPT RS: …\`**: el Hook aceptó la transacción con esa cadena de retorno.

### Casos a vigilar

- **Falta el parámetro.** Un pago sin \`HookParameters\` hace que \`otxn_param()\` devuelva un valor negativo, y este Hook acepta indicando el motivo en vez de leer un buffer vacío. En testnet:

\`\`\`
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: no ACTION parameter
\`\`\`

- **\`TRACEVAR\` sobre un array imprime su dirección.** \`TRACEVAR(param_name)\` imprime un número como \`66744\`: la dirección de memoria del buffer, no su contenido. Usa \`TRACEVAR\` para números (como \`value_len\`) y \`TRACEHEX\` para buffers.
- **La misma ejecución puede aparecer varias veces en el debug stream.** Un nodo aplica una transacción más de una vez antes de que se valide su ledger. Solo cuenta el resultado validado, el de los metadatos.
- **Las cabeceras antiguas no declaran \`otxn_param\`.** El Hook la declara él mismo después del include, lo que funciona con cualquier conjunto de cabeceras (la [lección 9.8](?m=9&l=7) explica por qué).

### Recursos

- [HookOn Calculator](https://richardah.github.io/xrpl-hookon-calculator/): calcula los campos HookOn y HookCanEmit
- [HEX Visualizer](https://transia-rnd.github.io/xrpl-hex-visualizer/): convierte texto a hex y al revés, en varios formatos
- [Time Visualizer](https://transia-rnd.github.io/xrpl-time-visualizer/): convierte entre el formato de tiempo de Xahau (Ripple Epoch) y fechas legibles
- [Hooks Services](https://hooks.services/): conversores de valores y formatos usados por los Hooks
- [Transaction Builder](https://tx-builder.xahau.tools/): genera el código C de una transacción a emitir a partir de su JSON
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools): herramientas visuales para instalar y gestionar Hooks`,
        pt: `O comportamento de um Hook pode depender de dados que chegam com cada transação, não só do seu código. Esses dados viajam em **parâmetros**: pares nome/valor, ambos em hex. Há dois tipos, e eles respondem a perguntas diferentes:

| | Parâmetros do Hook (\`hook_param()\`) | Parâmetros da transação (\`otxn_param()\`) |
|---|---|---|
| **Definidos em** | O \`SetHook\` que instala o Hook | O campo \`HookParameters\` de cada transação |
| **Quem define** | Quem instala o Hook | Quem envia a transação |
| **Mudam** | Só ao reinstalar o Hook | A cada transação |
| **Use para** | Configuração: limites, endereços, taxas | Instruções: um modo de operação, uma referência, um código |

Esta lição trata dos parâmetros da transação: quem envia diz ao Hook o que fazer com aquele pagamento específico.

### Ler um parâmetro com otxn_param()

\`\`\`c
int64_t otxn_param(
    uint32_t write_ptr,  // buffer the value is written to
    uint32_t write_len,  // size of that buffer
    uint32_t read_ptr,   // the parameter's name
    uint32_t read_len    // length of the name
);
\`\`\`

Ela procura o nome nos \`HookParameters\` da transação que ativou o Hook e copia o valor para o seu buffer. O valor de retorno diz o que aconteceu:

- **Positivo**: o número de bytes escritos. Use-o como comprimento do valor, não o tamanho do buffer: o resto do buffer continua com zeros.
- **Negativo**: o parâmetro não está lá, ou o buffer é pequeno demais para ele. O Hook precisa tratar esse caso; a transação pode simplesmente não trazer o parâmetro.

Nomes e valores são comparados como bytes exatos: \`ACCION\` e \`accion\` são nomes diferentes.

### Experimente

A aba Código tem os dois lados: um Hook que lê o parâmetro \`ACCION\` e o rastreia, e \`send-parameters.js\`, que envia um Payment de 1 XAH com esse parâmetro.

1. Compile o Hook e instale-o em uma conta, disparando com Payments, como na [lição 9.2](?m=9&l=1) (ou com hooks-cli, [lição 9.8](?m=9&l=7)).
2. Abra o debug stream da conta do Hook e depois envie o pagamento, passando a conta do Hook como argumento:

\`\`\`bash
hooks-cli debug "Hook" <HookAccount>     # terminal 1: o debug stream do Hook
node send-parameters.js <HookAccount>   # terminal 2: envia um Payment com o parâmetro
\`\`\`

O debug stream é para onde vai a saída de \`trace()\`; a [lição 9.6](?m=9&l=5) trata dele, e o Hooks Builder mostra o mesmo stream no navegador. Sem um endereço válido, \`send-parameters.js\` para antes de enviar e diz o que passar.

### O que a saída significa

\`send-parameters.js\` na testnet (com a versão em inglês do exemplo, que usa \`ACTION = hello\`):

\`\`\`
Sending Payment with HookParameters...
  Param name (hex):  414354494F4E  = ACTION
  Param value (hex):  68656C6C6F
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: parameter read and plotted
\`\`\`

- **\`414354494F4E\`**: "ACTION" em hex. \`68656C6C6F\` é "hello".
- **\`Result: tesSUCCESS\`**: o pagamento foi aplicado, e o Hook rodou como parte dele.
- **\`Hook result: 3 | …\`**: lido dos metadados da transação. \`3\` significa que o Hook terminou com \`accept()\`, e o texto é a string que ele passou para \`accept()\`. É assim que um script confirma o que um Hook fez sem olhar o debug stream.

O debug stream do mesmo pagamento (prefixos encurtados):

\`\`\`
HookTrace: otxn_param_demo: hook() initiated:
HookTrace: param_name: 414354494F4E
HookTrace: value_len: 5
HookTrace: param_value: 68656C6C6F000000000000000000000000000000000000000000000000000000
HookTrace: otxn_param_demo: ACTION value (text): : hello
HookTrace: otxn_param_demo: ACTION value (hex): : 68656C6C6F
HookInfo: ACCEPT RS: 'otxn_param_demo: parameter read and plotted'
\`\`\`

- **\`param_name: 414354494F4E\`**: \`TRACEHEX\` do nome procurado.
- **\`value_len: 5\`**: \`otxn_param()\` encontrou o parâmetro e escreveu 5 bytes.
- **\`param_value: 68656C6C…0000\`**: \`TRACEHEX\` imprime o buffer inteiro de 32 bytes, zeros incluídos. Por isso o Hook rastreia o valor usando \`value_len\`.
- **\`(text): hello\` e \`(hex): 68656C6C6F\`**: os mesmos 5 bytes, como texto e como hex.
- **\`ACCEPT RS: …\`**: o Hook aceitou a transação com essa string de retorno.

### Casos para observar

- **O parâmetro está ausente.** Um pagamento sem \`HookParameters\` faz \`otxn_param()\` retornar um valor negativo, e este Hook aceita informando o motivo em vez de ler um buffer vazio. Na testnet:

\`\`\`
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: no ACTION parameter
\`\`\`

- **\`TRACEVAR\` em um array imprime seu endereço.** \`TRACEVAR(param_name)\` imprime um número como \`66744\`: o endereço de memória do buffer, não seu conteúdo. Use \`TRACEVAR\` para números (como \`value_len\`) e \`TRACEHEX\` para buffers.
- **A mesma execução pode aparecer mais de uma vez no debug stream.** Um nó aplica uma transação mais de uma vez antes de o ledger dela ser validado. Só conta o resultado validado, o dos metadados.
- **Cabeçalhos antigos não declaram \`otxn_param\`.** O Hook a declara por conta própria depois do include, o que funciona com qualquer conjunto de cabeçalhos (a [lição 9.8](?m=9&l=7) explica por quê).

### Recursos

- [HookOn Calculator](https://richardah.github.io/xrpl-hookon-calculator/): calcula os campos HookOn e HookCanEmit
- [HEX Visualizer](https://transia-rnd.github.io/xrpl-hex-visualizer/): converte texto para hex e vice-versa, em vários formatos
- [Time Visualizer](https://transia-rnd.github.io/xrpl-time-visualizer/): converte entre o formato de tempo da Xahau (Ripple Epoch) e datas legíveis
- [Hooks Services](https://hooks.services/): conversores de valores e formatos usados pelos Hooks
- [Transaction Builder](https://tx-builder.xahau.tools/): gera o código C de uma transação a emitir a partir do JSON
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools): ferramentas visuais para instalar e gerenciar Hooks`,
        en: `A Hook's behaviour can depend on data that arrives with each transaction, not only on its code. That data travels in **parameters**: name/value pairs, both in hex. There are two kinds, and they answer different questions:

| | Hook parameters (\`hook_param()\`) | Transaction parameters (\`otxn_param()\`) |
|---|---|---|
| **Set in** | The \`SetHook\` that installs the Hook | The \`HookParameters\` field of each transaction |
| **Set by** | Whoever installs the Hook | Whoever sends the transaction |
| **Changes** | Only when the Hook is reinstalled | With every transaction |
| **Use it for** | Configuration: limits, addresses, fees | Instructions: an operation mode, a reference, a code |

This lesson covers transaction parameters: the sender tells the Hook what to do with this particular payment.

### Reading a parameter with otxn_param()

\`\`\`c
int64_t otxn_param(
    uint32_t write_ptr,  // buffer the value is written to
    uint32_t write_len,  // size of that buffer
    uint32_t read_ptr,   // the parameter's name
    uint32_t read_len    // length of the name
);
\`\`\`

It looks for the name in the \`HookParameters\` of the transaction that triggered the Hook and copies the value into your buffer. The return value tells you what happened:

- **Positive**: the number of bytes written. Use it, not the buffer's size, as the value's length: the rest of the buffer is still zeros.
- **Negative**: the parameter isn't there, or the buffer is too small for it. The Hook must handle this case; the transaction may simply not carry the parameter.

Parameter names and values are compared as exact bytes: \`ACTION\` and \`action\` are different names.

### Try it

The Code tab has the two sides: a Hook that reads the \`ACTION\` parameter and traces it, and \`send-parameters.js\`, which sends a 1 XAH Payment carrying \`ACTION = hello\`.

1. Compile the Hook and install it on an account, firing on Payments, as in [lesson 9.2](?m=9&l=1) (or with hooks-cli, [lesson 9.8](?m=9&l=7)).
2. Open the Hook account's debug stream, then send the payment, passing the Hook's account as the argument:

\`\`\`bash
hooks-cli debug "Hook" <HookAccount>     # terminal 1: the Hook's debug stream
node send-parameters.js <HookAccount>   # terminal 2: send a Payment with ACTION = hello
\`\`\`

The debug stream is where \`trace()\` output goes; [lesson 9.6](?m=9&l=5) covers it, and Hooks Builder shows the same stream in the browser. Without a valid address, \`send-parameters.js\` stops before submitting and says what to pass.

### What the output means

\`send-parameters.js\` on testnet:

\`\`\`
Sending Payment with HookParameters...
  Param name (hex):  414354494F4E  = ACTION
  Param value (hex):  68656C6C6F
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: parameter read and plotted
\`\`\`

- **\`414354494F4E\`**: "ACTION" in hex. \`68656C6C6F\` is "hello".
- **\`Result: tesSUCCESS\`**: the payment was applied, and the Hook ran as part of it.
- **\`Hook result: 3 | …\`**: read from the transaction metadata. \`3\` means the Hook ended with \`accept()\`, and the text is the string it passed to \`accept()\`. This is how a script confirms what a Hook did without the debug stream.

The debug stream for the same payment (prefixes shortened):

\`\`\`
HookTrace: otxn_param_demo: hook() initiated:
HookTrace: param_name: 414354494F4E
HookTrace: value_len: 5
HookTrace: param_value: 68656C6C6F000000000000000000000000000000000000000000000000000000
HookTrace: otxn_param_demo: ACTION value (text): : hello
HookTrace: otxn_param_demo: ACTION value (hex): : 68656C6C6F
HookInfo: ACCEPT RS: 'otxn_param_demo: parameter read and plotted'
\`\`\`

- **\`param_name: 414354494F4E\`**: \`TRACEHEX\` of the name being looked up.
- **\`value_len: 5\`**: \`otxn_param()\` found the parameter and wrote 5 bytes.
- **\`param_value: 68656C6C…0000\`**: \`TRACEHEX\` prints the whole 32-byte buffer, zeros included. That is why the Hook traces the value with \`value_len\` instead.
- **\`(text): hello\` and \`(hex): 68656C6C6F\`**: the same 5 bytes, as text and as hex.
- **\`ACCEPT RS: …\`**: the Hook accepted the transaction with that return string.

### Cases to watch

- **The parameter is missing.** A payment without \`HookParameters\` makes \`otxn_param()\` return a negative value, and this Hook accepts with a reason instead of reading an empty buffer. On testnet:

\`\`\`
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: no ACTION parameter
\`\`\`

- **\`TRACEVAR\` on an array prints its address.** \`TRACEVAR(param_name)\` prints a number like \`66744\`: the buffer's memory address, not its contents. Use \`TRACEVAR\` for numbers (like \`value_len\`) and \`TRACEHEX\` for buffers.
- **The same execution can appear more than once in the debug stream.** A node applies a transaction more than once before its ledger is validated. Only the validated result, the one in the metadata, counts.
- **Older headers don't declare \`otxn_param\`.** The Hook declares it itself after the include, which works with any header set ([lesson 9.8](?m=9&l=7) explains why).

### Resources

- [HookOn Calculator](https://richardah.github.io/xrpl-hookon-calculator/): build the HookOn and HookCanEmit fields
- [HEX Visualizer](https://transia-rnd.github.io/xrpl-hex-visualizer/): convert text to hex and back, in several formats
- [Time Visualizer](https://transia-rnd.github.io/xrpl-time-visualizer/): convert between Xahau's time format (Ripple Epoch) and readable dates
- [Hooks Services](https://hooks.services/): converters for values and formats used by Hooks
- [Transaction Builder](https://tx-builder.xahau.tools/): generate the C code of a transaction to emit from its JSON
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools): visual tools to install and manage Hooks`,
        jp: `Hook の動作は、コードだけでなく、トランザクションごとに届くデータにも左右できます。そのデータは**パラメータ**で運ばれます。名前と値の組で、どちらも hex です。パラメータには2種類あり、答える問いが異なります。

| | Hook パラメータ（\`hook_param()\`） | トランザクションパラメータ（\`otxn_param()\`） |
|---|---|---|
| **設定する場所** | Hook をインストールする \`SetHook\` | 各トランザクションの \`HookParameters\` フィールド |
| **設定する人** | Hook をインストールする人 | トランザクションを送る人 |
| **変わるタイミング** | Hook を再インストールしたときだけ | トランザクションごと |
| **用途** | 設定: 上限、アドレス、手数料 | 指示: 動作モード、参照番号、コード |

このレッスンではトランザクションパラメータを扱います。送信者が、その支払いをどう扱うかを Hook に伝えます。

### otxn_param() でパラメータを読む

\`\`\`c
int64_t otxn_param(
    uint32_t write_ptr,  // buffer the value is written to
    uint32_t write_len,  // size of that buffer
    uint32_t read_ptr,   // the parameter's name
    uint32_t read_len    // length of the name
);
\`\`\`

Hook を起動したトランザクションの \`HookParameters\` から名前を探し、値をバッファにコピーします。戻り値で何が起きたかがわかります。

- **正の値**: 書き込んだバイト数。値の長さにはバッファのサイズではなくこれを使います。バッファの残りはゼロのままです。
- **負の値**: パラメータがないか、バッファが小さすぎます。Hook はこのケースを処理しなければなりません。トランザクションにパラメータが付いていないことは普通にあります。

名前と値はバイト単位で完全一致で比較されます。\`ACTION\` と \`action\` は別の名前です。

### 試してみる

コードタブには両側があります。\`ACTION\` パラメータを読んでトレースする Hook と、\`ACTION = hello\` を付けて 1 XAH の Payment を送る \`send-parameters.js\` です。

1. [レッスン9.2](?m=9&l=1)（または hooks-cli の[レッスン9.8](?m=9&l=7)）のように Hook をコンパイルし、Payment で起動するようアカウントにインストールします。
2. Hook アカウントの debug stream を開き、Hook のアカウントを引数にして支払いを送ります。

\`\`\`bash
hooks-cli debug "Hook" <HookAccount>     # ターミナル1: Hook の debug stream
node send-parameters.js <HookAccount>   # ターミナル2: ACTION = hello 付きの Payment を送る
\`\`\`

debug stream は \`trace()\` の出力先です。[レッスン9.6](?m=9&l=5)で説明しており、Hooks Builder でもブラウザで同じ stream を見られます。有効なアドレスがない場合、\`send-parameters.js\` は何も送信せずに停止し、渡すべき値を表示します。

### 出力の意味

テストネットでの \`send-parameters.js\`:

\`\`\`
Sending Payment with HookParameters...
  Param name (hex):  414354494F4E  = ACTION
  Param value (hex):  68656C6C6F
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: parameter read and plotted
\`\`\`

- **\`414354494F4E\`**: hex の "ACTION"。\`68656C6C6F\` は "hello" です。
- **\`Result: tesSUCCESS\`**: 支払いが適用され、その一部として Hook が実行されました。
- **\`Hook result: 3 | …\`**: トランザクションのメタデータから読み取ったもの。\`3\` は Hook が \`accept()\` で終了したことを示し、テキストは \`accept()\` に渡した文字列です。debug stream を見なくても、スクリプトで Hook の動作を確認できます。

同じ支払いの debug stream（プレフィックスは短縮）:

\`\`\`
HookTrace: otxn_param_demo: hook() initiated:
HookTrace: param_name: 414354494F4E
HookTrace: value_len: 5
HookTrace: param_value: 68656C6C6F000000000000000000000000000000000000000000000000000000
HookTrace: otxn_param_demo: ACTION value (text): : hello
HookTrace: otxn_param_demo: ACTION value (hex): : 68656C6C6F
HookInfo: ACCEPT RS: 'otxn_param_demo: parameter read and plotted'
\`\`\`

- **\`param_name: 414354494F4E\`**: 探している名前の \`TRACEHEX\`。
- **\`value_len: 5\`**: \`otxn_param()\` がパラメータを見つけ、5 バイトを書き込みました。
- **\`param_value: 68656C6C…0000\`**: \`TRACEHEX\` は 32 バイトのバッファ全体をゼロも含めて表示します。そのため Hook は \`value_len\` を使って値をトレースします。
- **\`(text): hello\` と \`(hex): 68656C6C6F\`**: 同じ 5 バイトを、テキストと hex で表示したもの。
- **\`ACCEPT RS: …\`**: Hook はこの戻り文字列でトランザクションを受け入れました。

### 注意するケース

- **パラメータがない。** \`HookParameters\` のない支払いでは \`otxn_param()\` が負の値を返し、この Hook は空のバッファを読む代わりに理由を示して accept します。テストネットでは:

\`\`\`
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: no ACTION parameter
\`\`\`

- **配列に \`TRACEVAR\` を使うとアドレスが表示される。** \`TRACEVAR(param_name)\` は \`66744\` のような数値を表示します。これはバッファのメモリアドレスで、中身ではありません。数値（\`value_len\` など）には \`TRACEVAR\`、バッファには \`TRACEHEX\` を使ってください。
- **同じ実行が debug stream に複数回現れることがある。** ノードはレジャーが検証される前に、トランザクションを複数回適用します。意味を持つのは検証済みの結果、つまりメタデータの結果だけです。
- **古いヘッダーは \`otxn_param\` を宣言していない。** Hook は include の後で自分で宣言しており、どのヘッダーでも動きます（理由は[レッスン9.8](?m=9&l=7)）。

### リソース

- [HookOn Calculator](https://richardah.github.io/xrpl-hookon-calculator/): HookOn と HookCanEmit フィールドを作成
- [HEX Visualizer](https://transia-rnd.github.io/xrpl-hex-visualizer/): テキストと hex を相互に変換（複数の形式）
- [Time Visualizer](https://transia-rnd.github.io/xrpl-time-visualizer/): Xahau の時刻形式（Ripple Epoch）と読みやすい日付を相互に変換
- [Hooks Services](https://hooks.services/): Hooks で使う値や形式の変換ツール
- [Transaction Builder](https://tx-builder.xahau.tools/): Emit するトランザクションの C コードを JSON から生成
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools): Hook をインストール・管理するビジュアルツール`,
        ko: `Hook의 동작은 코드뿐 아니라 트랜잭션마다 함께 오는 데이터에 따라서도 달라질 수 있습니다. 그 데이터는 **파라미터**로 전달됩니다. 이름/값 쌍이며 둘 다 hex입니다. 파라미터는 두 종류이고, 답하는 질문이 다릅니다.

| | Hook 파라미터 (\`hook_param()\`) | 트랜잭션 파라미터 (\`otxn_param()\`) |
|---|---|---|
| **설정 위치** | Hook을 설치하는 \`SetHook\` | 각 트랜잭션의 \`HookParameters\` 필드 |
| **설정하는 사람** | Hook을 설치하는 사람 | 트랜잭션을 보내는 사람 |
| **바뀌는 때** | Hook을 다시 설치할 때만 | 트랜잭션마다 |
| **용도** | 설정: 한도, 주소, 수수료 | 지시: 동작 모드, 참조 번호, 코드 |

이 레슨은 트랜잭션 파라미터를 다룹니다. 보내는 사람이 바로 그 결제를 어떻게 처리할지 Hook에 알려 줍니다.

### otxn_param()으로 파라미터 읽기

\`\`\`c
int64_t otxn_param(
    uint32_t write_ptr,  // buffer the value is written to
    uint32_t write_len,  // size of that buffer
    uint32_t read_ptr,   // the parameter's name
    uint32_t read_len    // length of the name
);
\`\`\`

Hook을 실행한 트랜잭션의 \`HookParameters\`에서 이름을 찾아 값을 버퍼에 복사합니다. 반환값이 무슨 일이 일어났는지 알려 줍니다.

- **양수**: 쓴 바이트 수. 값의 길이로는 버퍼 크기가 아니라 이것을 쓰세요. 버퍼의 나머지는 여전히 0입니다.
- **음수**: 파라미터가 없거나 버퍼가 너무 작습니다. Hook은 이 경우를 처리해야 합니다. 트랜잭션에 파라미터가 없는 경우는 흔합니다.

이름과 값은 바이트 단위로 정확히 비교됩니다. \`ACTION\`과 \`action\`은 다른 이름입니다.

### 직접 해 보기

코드 탭에 양쪽이 있습니다. \`ACTION\` 파라미터를 읽고 추적하는 Hook, 그리고 \`ACTION = hello\`를 담아 1 XAH Payment를 보내는 \`send-parameters.js\`입니다.

1. [레슨 9.2](?m=9&l=1)(또는 hooks-cli는 [레슨 9.8](?m=9&l=7))처럼 Hook을 컴파일하고, Payment에서 실행되도록 계정에 설치합니다.
2. Hook 계정의 debug stream을 연 다음, Hook 계정을 인자로 넘겨 결제를 보냅니다.

\`\`\`bash
hooks-cli debug "Hook" <HookAccount>     # 터미널 1: Hook의 debug stream
node send-parameters.js <HookAccount>   # 터미널 2: ACTION = hello를 담은 Payment 전송
\`\`\`

debug stream은 \`trace()\` 출력이 가는 곳입니다. [레슨 9.6](?m=9&l=5)에서 다루며, Hooks Builder도 브라우저에서 같은 stream을 보여 줍니다. 유효한 주소가 없으면 \`send-parameters.js\`는 아무것도 제출하지 않고 멈추며 무엇을 전달해야 하는지 알려 줍니다.

### 출력의 의미

테스트넷에서의 \`send-parameters.js\`:

\`\`\`
Sending Payment with HookParameters...
  Param name (hex):  414354494F4E  = ACTION
  Param value (hex):  68656C6C6F
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: parameter read and plotted
\`\`\`

- **\`414354494F4E\`**: hex로 된 "ACTION". \`68656C6C6F\`는 "hello"입니다.
- **\`Result: tesSUCCESS\`**: 결제가 적용되었고, 그 일부로 Hook이 실행되었습니다.
- **\`Hook result: 3 | …\`**: 트랜잭션 메타데이터에서 읽은 값입니다. \`3\`은 Hook이 \`accept()\`로 끝났다는 뜻이고, 텍스트는 \`accept()\`에 넘긴 문자열입니다. debug stream 없이도 스크립트로 Hook이 한 일을 확인할 수 있습니다.

같은 결제의 debug stream(접두사는 줄임):

\`\`\`
HookTrace: otxn_param_demo: hook() initiated:
HookTrace: param_name: 414354494F4E
HookTrace: value_len: 5
HookTrace: param_value: 68656C6C6F000000000000000000000000000000000000000000000000000000
HookTrace: otxn_param_demo: ACTION value (text): : hello
HookTrace: otxn_param_demo: ACTION value (hex): : 68656C6C6F
HookInfo: ACCEPT RS: 'otxn_param_demo: parameter read and plotted'
\`\`\`

- **\`param_name: 414354494F4E\`**: 찾는 이름의 \`TRACEHEX\`.
- **\`value_len: 5\`**: \`otxn_param()\`이 파라미터를 찾아 5바이트를 썼습니다.
- **\`param_value: 68656C6C…0000\`**: \`TRACEHEX\`는 0을 포함해 32바이트 버퍼 전체를 출력합니다. 그래서 Hook은 \`value_len\`으로 값을 추적합니다.
- **\`(text): hello\`와 \`(hex): 68656C6C6F\`**: 같은 5바이트를 텍스트와 hex로 표시한 것.
- **\`ACCEPT RS: …\`**: Hook이 이 반환 문자열로 트랜잭션을 수락했습니다.

### 주의할 경우

- **파라미터가 없음.** \`HookParameters\`가 없는 결제에서는 \`otxn_param()\`이 음수를 반환하고, 이 Hook은 빈 버퍼를 읽는 대신 이유를 남기고 수락합니다. 테스트넷에서:

\`\`\`
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: no ACTION parameter
\`\`\`

- **배열에 \`TRACEVAR\`를 쓰면 주소가 출력됩니다.** \`TRACEVAR(param_name)\`은 \`66744\` 같은 숫자를 출력하는데, 이는 버퍼의 메모리 주소이지 내용이 아닙니다. 숫자(\`value_len\` 등)에는 \`TRACEVAR\`, 버퍼에는 \`TRACEHEX\`를 쓰세요.
- **같은 실행이 debug stream에 여러 번 나타날 수 있습니다.** 노드는 레저가 검증되기 전에 트랜잭션을 여러 번 적용합니다. 의미가 있는 것은 검증된 결과, 즉 메타데이터에 있는 결과뿐입니다.
- **오래된 헤더는 \`otxn_param\`을 선언하지 않습니다.** Hook이 include 다음에 직접 선언하므로 어떤 헤더로도 동작합니다(이유는 [레슨 9.8](?m=9&l=7)).

### 자료

- [HookOn Calculator](https://richardah.github.io/xrpl-hookon-calculator/): HookOn과 HookCanEmit 필드 만들기
- [HEX Visualizer](https://transia-rnd.github.io/xrpl-hex-visualizer/): 텍스트와 hex를 여러 형식으로 상호 변환
- [Time Visualizer](https://transia-rnd.github.io/xrpl-time-visualizer/): Xahau 시간 형식(Ripple Epoch)과 읽기 쉬운 날짜 상호 변환
- [Hooks Services](https://hooks.services/): Hook에서 쓰는 값과 형식 변환기
- [Transaction Builder](https://tx-builder.xahau.tools/): 발행할 트랜잭션의 C 코드를 JSON에서 생성
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools): Hook 설치·관리용 시각 도구`,
        zh: `Hook 的行为不仅取决于它的代码，还可以取决于每笔交易附带的数据。这些数据通过**参数**传递：名称/值对，两者都是 hex。参数有两种，回答不同的问题：

| | Hook 参数（\`hook_param()\`） | 交易参数（\`otxn_param()\`） |
|---|---|---|
| **设置位置** | 安装 Hook 的 \`SetHook\` | 每笔交易的 \`HookParameters\` 字段 |
| **由谁设置** | 安装 Hook 的人 | 发送交易的人 |
| **何时变化** | 仅在重新安装 Hook 时 | 每笔交易都可能不同 |
| **用途** | 配置：限额、地址、费用 | 指令：操作模式、参考编号、代码 |

本课讲交易参数：发送方告诉 Hook 如何处理这一笔具体的付款。

### 用 otxn_param() 读取参数

\`\`\`c
int64_t otxn_param(
    uint32_t write_ptr,  // buffer the value is written to
    uint32_t write_len,  // size of that buffer
    uint32_t read_ptr,   // the parameter's name
    uint32_t read_len    // length of the name
);
\`\`\`

它在触发 Hook 的交易的 \`HookParameters\` 中查找该名称，并把值复制到你的缓冲区。返回值说明发生了什么：

- **正数**：写入的字节数。用它而不是缓冲区大小作为值的长度：缓冲区其余部分仍是零。
- **负数**：参数不存在，或者缓冲区太小。Hook 必须处理这种情况；交易完全可能不带这个参数。

名称和值按字节精确比较：\`ACTION\` 和 \`action\` 是不同的名称。

### 动手试试

代码标签页包含两端：一个读取并追踪 \`ACTION\` 参数的 Hook，以及发送附带 \`ACTION = hello\` 的 1 XAH Payment 的 \`send-parameters.js\`。

1. 像[第 9.2 课](?m=9&l=1)（或用 hooks-cli，[第 9.8 课](?m=9&l=7)）那样编译 Hook，并安装到一个账户上，在 Payment 时触发。
2. 打开 Hook 账户的 debug stream，然后发送付款，把 Hook 账户作为参数传入：

\`\`\`bash
hooks-cli debug "Hook" <HookAccount>     # 终端 1：Hook 的 debug stream
node send-parameters.js <HookAccount>   # 终端 2：发送带 ACTION = hello 的 Payment
\`\`\`

debug stream 是 \`trace()\` 输出的去处；[第 9.6 课](?m=9&l=5)讲解它，Hooks Builder 也在浏览器中显示同样的 stream。没有有效地址时，\`send-parameters.js\` 会在提交前停止，并说明应传入什么。

### 输出的含义

测试网上的 \`send-parameters.js\`：

\`\`\`
Sending Payment with HookParameters...
  Param name (hex):  414354494F4E  = ACTION
  Param value (hex):  68656C6C6F
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: parameter read and plotted
\`\`\`

- **\`414354494F4E\`**：hex 形式的 "ACTION"。\`68656C6C6F\` 是 "hello"。
- **\`Result: tesSUCCESS\`**：付款已被应用，Hook 作为其中一部分运行。
- **\`Hook result: 3 | …\`**：从交易元数据读取。\`3\` 表示 Hook 以 \`accept()\` 结束，文本是它传给 \`accept()\` 的字符串。脚本就是这样在不看 debug stream 的情况下确认 Hook 做了什么。

同一笔付款的 debug stream（前缀已缩短）：

\`\`\`
HookTrace: otxn_param_demo: hook() initiated:
HookTrace: param_name: 414354494F4E
HookTrace: value_len: 5
HookTrace: param_value: 68656C6C6F000000000000000000000000000000000000000000000000000000
HookTrace: otxn_param_demo: ACTION value (text): : hello
HookTrace: otxn_param_demo: ACTION value (hex): : 68656C6C6F
HookInfo: ACCEPT RS: 'otxn_param_demo: parameter read and plotted'
\`\`\`

- **\`param_name: 414354494F4E\`**：所查找名称的 \`TRACEHEX\`。
- **\`value_len: 5\`**：\`otxn_param()\` 找到了参数并写入 5 个字节。
- **\`param_value: 68656C6C…0000\`**：\`TRACEHEX\` 打印整个 32 字节缓冲区，包括零。这就是 Hook 用 \`value_len\` 追踪值的原因。
- **\`(text): hello\` 和 \`(hex): 68656C6C6F\`**：同样的 5 个字节，分别以文本和 hex 显示。
- **\`ACCEPT RS: …\`**：Hook 以这个返回字符串接受了交易。

### 需要注意的情况

- **缺少参数。** 没有 \`HookParameters\` 的付款会让 \`otxn_param()\` 返回负值，这个 Hook 会说明原因后接受，而不是去读空缓冲区。测试网上：

\`\`\`
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: no ACTION parameter
\`\`\`

- **对数组使用 \`TRACEVAR\` 会打印它的地址。** \`TRACEVAR(param_name)\` 打印类似 \`66744\` 的数字：那是缓冲区的内存地址，不是内容。数字（如 \`value_len\`）用 \`TRACEVAR\`，缓冲区用 \`TRACEHEX\`。
- **同一次执行可能在 debug stream 中出现多次。** 在账本验证之前，节点会多次应用同一笔交易。只有验证后的结果，也就是元数据中的结果才算数。
- **旧版头文件没有声明 \`otxn_param\`。** Hook 在 include 之后自己声明了它，因此适用于任何头文件（原因见[第 9.8 课](?m=9&l=7)）。

### 资源

- [HookOn Calculator](https://richardah.github.io/xrpl-hookon-calculator/): 生成 HookOn 和 HookCanEmit 字段
- [HEX Visualizer](https://transia-rnd.github.io/xrpl-hex-visualizer/): 在多种格式下互转文本与 hex
- [Time Visualizer](https://transia-rnd.github.io/xrpl-time-visualizer/): 在 Xahau 时间格式（Ripple Epoch）和可读日期之间转换
- [Hooks Services](https://hooks.services/): Hooks 所用数值与格式的转换工具
- [Transaction Builder](https://tx-builder.xahau.tools/): 根据 JSON 生成要发出的交易的 C 代码
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools): 安装和管理 Hook 的可视化工具`,
      },
      codeBlocks: [
        {
          title: {
            es: "Hook que lee un otxn_param y lo muestra con TRACE",
            pt: "Hook que lê um otxn_param e o mostra com TRACE",
            en: "Hook that reads an otxn_param and displays it with TRACE",
            jp: "otxn_paramを読み取りTRACEで表示するHook",
            ko: "otxn_param을 읽어 TRACE로 보여주는 Hook",
            zh: "读取 otxn_param 并用 TRACE 显示的 Hook",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

// Las copias antiguas de las cabeceras de Hooks no declaran otxn_param. Declararla aquí
// permite compilar este Hook con cualquier cabecera: una declaración duplicada idéntica es C válido
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);

/**
 * Hook: otxn_param_demo.c
 *
 * Lee el parámetro "ACCION" de la transacción que activa el Hook
 * y muestra su valor por el Debug Stream con trace().
 *
 * Para probarlo, envía una transacción con HookParameters:
 *   HookParameterName:  "414343494F4E"  (= "ACCION" en hex)
 *   HookParameterValue: "01"            (cualquier valor hex)
 *
 * Convierte strings a hex en: https://transia-rnd.github.io/xrpl-hex-visualizer/
 */

int64_t hook(uint32_t reserved)
{
    // Guard obligatorio: (id_iteracion, max_iteraciones)
    // Como no hay bucles en este Hook, basta con _g(1, 1)
    _g(1, 1);

    // Traza de inicio con 5 argumentos: (label_ptr, label_len, data_ptr, data_len, as_hex)
    // Cuando data_ptr y data_len son 0, solo se imprime la etiqueta
    trace(SBUF("otxn_param_demo: hook() iniciado"), 0, 0, 0);

    // ── Definir el nombre del parámetro a buscar ──────────────────────────────
    // "ACCION" en ASCII: A=41 C=43 C=43 I=49 O=4F N=4E
    // Usa https://transia-rnd.github.io/xrpl-hex-visualizer/ para convertir tus propios nombres,
    uint8_t param_name[]    = { 0x41U, 0x43U, 0x43U, 0x49U, 0x4FU, 0x4EU };

    // Buffer de salida donde otxn_param() escribirá el valor encontrado (máx. 32 bytes)
    uint8_t param_value[32] = { 0 };

    // ── Leer el parámetro de la transacción originante ────────────────────────
    // otxn_param() busca en los HookParameters de la tx que activó este Hook.
    // Devuelve: bytes escritos (>0) si encontrado | negativo si error o no existe
    int64_t value_len = otxn_param(
        SBUF(param_value),   // buffer donde se escribe el valor del parámetro
        SBUF(param_name)     // nombre del parámetro que queremos leer
    );

    // Sin parámetro ACCION (value_len < 0): no hay nada que leer, así que acepta y di por qué
    if (value_len < 0)
        accept(SBUF("otxn_param_demo: no hay parametro ACCION"), __LINE__);

    // ── Trazar el nombre del parámetro buscado ────────────────────────────────
    // TRACEHEX muestra el contenido del buffer en formato hexadecimal
    // Verás: 414343494F4E → que corresponde a "ACCION"
    TRACEHEX(param_name);

    // ── Trazar el valor recibido ──────────────────────────────────────────────
    // TRACEVAR imprime un número: aquí, la longitud leída. (Con un array imprimiría su dirección de memoria, no sus bytes)
    TRACEVAR(value_len);
    // TRACEHEX del valor — muestra los bytes exactos que envió el emisor de la tx
    TRACEHEX(param_value);

    // ── Mostrar el valor en dos formatos con trace() de 5 argumentos ─────────
    // trace(label_ptr, label_len, data_ptr, data_len, as_hex)
    //   as_hex = 0 → interpreta data como texto ASCII (legible si el valor es texto)
    //   as_hex = 1 → muestra data como cadena hexadecimal (siempre legible)

    // Como texto: útil cuando el valor es un string ("ON", "OFF", "MODO1", etc.)
    trace(SBUF("otxn_param_demo: valor ACCION (texto): "), (uint32_t)param_value, (uint32_t)value_len, 0);

    // Como hex: siempre muestra los bytes exactos, ideal para valores binarios
    trace(SBUF("otxn_param_demo: valor ACCION (hex): "),   (uint32_t)param_value, (uint32_t)value_len, 1);

    // Acepta la transacción. __LINE__ indica el número de línea exacto en el log,
    // lo que facilita saber por qué camino salió el Hook en el Debug Stream
    accept(SBUF("otxn_param_demo: parametro leido y trazado"), __LINE__);
    return 0;
}`,
            pt: `#include "hookapi.h"

// Cópias antigas dos cabeçalhos de Hooks não declaram otxn_param. Declará-la aqui
// permite compilar este Hook com qualquer cabeçalho: uma declaração duplicada idêntica é C válido
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);
/**
 * Hook: otxn_param_demo.c
 *
 * Lee o parâmetro "ACCION" da transação que ativa o Hook
 * e mostra seu valor pelo Debug Stream com trace().
 *
 * Para testá-lo, envie uma transação com HookParameters:
 *   HookParameterName:  "414343494F4E"  (= "ACCION" em hex)
 *   HookParameterValue: "01"            (qualquer valor hex)
 *
 * Convierte strings a hex em: https://transia-rnd.github.io/xrpl-hex-visualizer/
 */
int64_t hook(uint32_t reserved)
{
    // Guard obrigatório: (id_iteracao, max_iteracoes)
    // Como este Hook não tem loops, basta _g(1, 1)
    _g(1, 1);
    // Traço inicial com 5 argumentos: (label_ptr, label_len, data_ptr, data_len, as_hex)
    // Quando data_ptr e data_len são 0, apenas se imprime a etiqueta
    trace(SBUF("otxn_param_demo: hook() iniciado"), 0, 0, 0);
    // ── Definir ou nome do parâmetro a buscar ──────────────────────────────
    // "ACCION" em ASCII: A=41 C=43 C=43 I=49 OU=4F N=4E
    // Usa https://transia-rnd.github.io/xrpl-hex-visualizer/ para converter seus próprios nomes,
    uint8_t param_name[]    = { 0x41U, 0x43U, 0x43U, 0x49U, 0x4FU, 0x4EU };
    // Buffer de saída onde otxn_param() escreverá o valor encontrado (máx. 32 bytes)
    uint8_t param_value[32] = { 0 };
    // ── Ler ou parâmetro da transação originante ────────────────────────
    // otxn_param() procura nos HookParameters da tx que ativou este Hook.
    // Retorna: bytes escritos (>0) se encontrado | negativo se erro ou não existe
    int64_t value_len = otxn_param(
        SBUF(param_value),   // buffer onde é escrito o valor do parâmetro
        SBUF(param_name)     // nome do parâmetro a ler
    );

    // Sem parâmetro ACCION (value_len < 0): não há nada para ler, então aceite e diga por quê
    if (value_len < 0)
        accept(SBUF("otxn_param_demo: sem parametro ACCION"), __LINE__);
    // ── Rastrear o nome do parâmetro procurado ─────────────────────────────
    // TRACEHEX mostra o conteúdo do buffer em formato hexadecimal
    // Você verá: 414343494F4E → que corresponda "ACCION"
    TRACEHEX(param_name);
    // ── Traçar o valor recebido ──────────────────────────────────────────────
    // TRACEVAR imprime um número: aqui, o comprimento lido. (Com um array, imprimiria o endereço de memória, não os bytes)
    TRACEVAR(value_len);
    // TRACEHEX do valor — mostra os bytes exatos que envió o emissor da tx
    TRACEHEX(param_value);
    // ── Mostrar o valor em dois formatos com trace() de 5 argumentos ─────────
    // trace(label_ptr, label_len, data_ptr, data_len, as_hex)
    //   as_hex = 0 → interpreta data como texto ASCII (legível se o valor é texto)
    //   as_hex = 1 → mostra data como string hexadecimal (sempre legível)
    // Como texto: útil quando o valor é um string ("ON", "OFF", "MODO1", etc.)
    trace(SBUF("otxn_param_demo: valor ACCION (texto): "), (uint32_t)param_value, (uint32_t)value_len, 0);
    // Como hex: sempre mostra os bytes exatos, ideal para valores binários
    trace(SBUF("otxn_param_demo: valor ACCION (hex): "),   (uint32_t)param_value, (uint32_t)value_len, 1);
    // Aceita a transação. __LINE__ indica o número de linha exato no log,
    // o que facilita saber por qual caminho o Hook saiu no Debug Stream
    accept(SBUF("otxn_param_demo: parametro lido e rastreado"), __LINE__);
    return 0;
}`,
            en: `#include "hookapi.h"

// Older copies of the Hooks headers don't declare otxn_param. Declaring it here keeps
// this Hook compiling with any header set: a matching duplicate declaration is valid C
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);

/**
 * Hook: otxn_param_demo.c
 *
 * Read the "ACTION" parameter from the transaction that triggered the Hook
 * and display its value in the Debug Stream using trace().
 *
 * To test it, send a transaction with HookParameters:
 *   HookParameterName:  "414354494F4E"  (= "ACTION" in hex)
 *   HookParameterValue: "01"            (any hex value)
 *
 * Convert strings to hex: https://transia-rnd.github.io/xrpl-hex-visualizer/
 */

int64_t hook(uint32_t reserved)
{
    // Mandatory Guard : (id_iteration, max_iterations)
    // There are no loops, so _g(1, 1)
    _g(1, 1);

    // Initial trace with 5 arguments: (label_ptr, label_len, data_ptr, data_len, as_hex)
    // When data_ptr and data_len are 0, only the label is printed
    trace(SBUF("otxn_param_demo: hook() initiated"), 0, 0, 0);

    // ── Define the name of the parameter to look for ──────────────────────────────
    // "ACTION" to ASCII: A=41 C=43 T=54 I=49 O=4F N=4E
    // Use https://transia-rnd.github.io/xrpl-hex-visualizer/ to convert your own names,
    uint8_t param_name[]    = { 0x41U, 0x43U, 0x54U, 0x49U, 0x4FU, 0x4EU };

    // Outgoing buffer where otxn_param() will write the found value (max. 32 bytes)
    uint8_t param_value[32] = { 0 };

    // ── Read the originating transaction parameter ────────────────────────
    // otxn_param() looks in the HookParameters of the transaction that activated this Hook.
    // Returns: bytes written (>0) if found | negative if error or does not exist
    int64_t value_len = otxn_param(
        SBUF(param_value),   // buffer where the parameter value is written
        SBUF(param_name)     // name of the parameter we want to read
    );

    // No ACTION parameter (value_len < 0): there is nothing to read, so accept and say why
    if (value_len < 0)
        accept(SBUF("otxn_param_demo: no ACTION parameter"), __LINE__);

    // ── Trace the name of the parameter being searched for ────────────────────────────────
    // TRACEHEX displays the buffer contents in hexadecimal format
    // 414354494F4E → matches "ACTION"
    TRACEHEX(param_name);

    // ── Trace the value received ──────────────────────────────────────────────
    // TRACEVAR prints a number: here, the length read. (On an array it would print its memory address, not its bytes)
    TRACEVAR(value_len);
    // TRACEHEX of value — shows the exact bytes sent by the sender of the tx
    TRACEHEX(param_value);

    // ── Display the value in two formats using a 5-argument trace() ─────────
    // trace(label_ptr, label_len, data_ptr, data_len, as_hex)
    //   as_hex = 0 → interprets data as ASCII text (readable if the value is text)
    //   as_hex = 1 → displays data as a hexadecimal string (always readable)

    // As text: useful when the value is a string ("ON", "OFF", "MODE1", etc.)
    trace(SBUF("otxn_param_demo: ACTION value (text): "), (uint32_t)param_value, (uint32_t)value_len, 0);

    // As hex: always displays the exact bytes, ideal for binary values
    trace(SBUF("otxn_param_demo: ACTION value (hex): "),   (uint32_t)param_value, (uint32_t)value_len, 1);

    // Accept the transaction. __LINE__ indicates the exact line number in the log.
    // This makes it easier to know which path the Hook took in the Debug Stream
    accept(SBUF("otxn_param_demo: parameter read and plotted"), __LINE__);
    return 0;
}`,
            jp: `#include "hookapi.h"

// 古い Hooks ヘッダーは otxn_param を宣言していない。ここで宣言すれば、どのヘッダーでも
// この Hook をコンパイルできる（同一の重複宣言は正しい C）
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);

/**
 * Hook: otxn_param_demo.c
 *
 * Hookを起動したトランザクションから "ACTION" パラメーターを読み取り
 * trace()を使ってDebug Streamに値を表示する。
 *
 * テストするには、HookParametersを持つトランザクションを送信する：
 *   HookParameterName:  "414354494F4E"  (= hex の "ACTION")
 *   HookParameterValue: "01"            (任意のhex値)
 *
 * 文字列をhexに変換: https://transia-rnd.github.io/xrpl-hex-visualizer/
 */

int64_t hook(uint32_t reserved)
{
    // 必須ガード: (イテレーションID, 最大イテレーション数)
    // このHookにはループがないため _g(1, 1) で十分
    _g(1, 1);

    // 4引数での初期トレース: (label_ptr, label_len, data_ptr, data_len, as_hex)
    // data_ptrとdata_lenが0の場合、ラベルのみが出力される
    trace(SBUF("otxn_param_demo: hook() 開始"), 0, 0, 0);

    // ── 検索するパラメーター名を定義する ──────────────────────────────
    // "ACTION" のASCII: A=41 C=43 T=54 I=49 O=4F N=4E
    // https://transia-rnd.github.io/xrpl-hex-visualizer/ で独自の名前を変換できる
    uint8_t param_name[]    = { 0x41U, 0x43U, 0x54U, 0x49U, 0x4FU, 0x4EU };

    // otxn_param()が見つかった値を書き込む出力バッファ（最大32バイト）
    uint8_t param_value[32] = { 0 };

    // ── 発信元トランザクションパラメーターを読み取る ────────────────────────
    // otxn_param()はこのHookを起動したtxのHookParametersを検索する。
    // 返り値: 見つかった場合は書き込まれたバイト数(>0) | エラーまたは存在しない場合は負の値
    int64_t value_len = otxn_param(
        SBUF(param_value),   // パラメーター値が書き込まれるバッファ
        SBUF(param_name)     // 読み取りたいパラメーター名
    );

    // ACTION パラメータがない（value_len < 0）: 読むものがないので、理由を示して accept する
    if (value_len < 0)
        accept(SBUF("otxn_param_demo: no ACTION parameter"), __LINE__);

    // ── 検索しているパラメーター名をトレースする ────────────────────────────────
    // TRACEHEXはバッファの内容を16進数形式で表示する
    // 表示: 414354494F4E → "ACTION"に対応
    TRACEHEX(param_name);

    // ── 受け取った値をトレースする ──────────────────────────────────────────────
    // TRACEVAR は数値を表示する: ここでは読み取った長さ。（配列に使うと中身ではなくメモリアドレスを表示する）
    TRACEVAR(value_len);
    // 値のTRACEHEX — txの送信者が送った正確なバイトを表示
    TRACEHEX(param_value);

    // ── 5引数のtrace()を使って値を2つの形式で表示する ─────────
    // trace(label_ptr, label_len, data_ptr, data_len, as_hex)
    //   as_hex = 0 → データをASCIIテキストとして解釈（値がテキストの場合に読みやすい）
    //   as_hex = 1 → データを16進数文字列として表示（常に読みやすい）

    // テキストとして: 値が文字列の場合に便利（"ON"、"OFF"、"MODE1"など）
    trace(SBUF("otxn_param_demo: ACTION値（テキスト）: "), (uint32_t)param_value, (uint32_t)value_len, 0);

    // hexとして: 常に正確なバイトを表示、バイナリ値に最適
    trace(SBUF("otxn_param_demo: ACTION値（hex）: "),   (uint32_t)param_value, (uint32_t)value_len, 1);

    // トランザクションを承認する。__LINE__はログの正確な行番号を示す。
    // これによりDebug StreamでHookがどのパスを通ったかを確認しやすくなる
    accept(SBUF("otxn_param_demo: パラメーターを読み取りトレースしました"), __LINE__);
    return 0;
}`,
            ko: `#include "hookapi.h"

// 오래된 Hooks 헤더는 otxn_param을 선언하지 않음. 여기서 선언하면 어떤 헤더로도
// 이 Hook을 컴파일할 수 있음 (동일한 중복 선언은 올바른 C)
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);

/**
 * Hook: otxn_param_demo.c
 *
 * Hook을 실행한 트랜잭션에서 "ACTION" 파라미터를 읽고
 * trace()로 Debug Stream에 출력한다.
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    trace(SBUF("otxn_param_demo: hook() 시작"), 0, 0, 0);

    uint8_t param_name[]    = { 0x41U, 0x43U, 0x54U, 0x49U, 0x4FU, 0x4EU };
    uint8_t param_value[32] = { 0 };

    int64_t value_len = otxn_param(
        SBUF(param_value),
        SBUF(param_name)
    );

    // ACTION 파라미터 없음 (value_len < 0): 읽을 것이 없으므로 이유를 남기고 accept
    if (value_len < 0)
        accept(SBUF("otxn_param_demo: no ACTION parameter"), __LINE__);

    TRACEHEX(param_name);
    TRACEHEX(param_value);
    TRACEVAR(value_len);

    trace(SBUF("otxn_param_demo: ACTION 값(텍스트): "), (uint32_t)param_value, (uint32_t)value_len, 0);
    trace(SBUF("otxn_param_demo: ACTION 값(hex): "), (uint32_t)param_value, (uint32_t)value_len, 1);

    accept(SBUF("otxn_param_demo: 파라미터를 읽고 추적했습니다"), __LINE__);
    return 0;
}`,
            zh: `#include "hookapi.h"

// 旧版的 Hooks 头文件没有声明 otxn_param。在这里声明后，用任何头文件
// 都能编译这个 Hook（签名相同的重复声明是合法的 C）
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);

/**
 * Hook: otxn_param_demo.c
 *
 * 读取触发 Hook 的交易中的 "ACTION" 参数，
 * 并通过 trace() 输出到 Debug Stream。
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    trace(SBUF("otxn_param_demo: hook() 已启动"), 0, 0, 0);

    uint8_t param_name[]    = { 0x41U, 0x43U, 0x54U, 0x49U, 0x4FU, 0x4EU };
    uint8_t param_value[32] = { 0 };

    int64_t value_len = otxn_param(
        SBUF(param_value),
        SBUF(param_name)
    );

    // 没有 ACTION 参数（value_len < 0）：没有可读的内容，所以 accept 并说明原因
    if (value_len < 0)
        accept(SBUF("otxn_param_demo: no ACTION parameter"), __LINE__);

    TRACEHEX(param_name);
    TRACEHEX(param_value);
    TRACEVAR(value_len);

    trace(SBUF("otxn_param_demo: ACTION 值（文本）: "), (uint32_t)param_value, (uint32_t)value_len, 0);
    trace(SBUF("otxn_param_demo: ACTION 值（hex）: "), (uint32_t)param_value, (uint32_t)value_len, 1);

    accept(SBUF("otxn_param_demo: 参数已读取并追踪"), __LINE__);
    return 0;
}`,
          },
        },
        {
          title: {
            es: "Enviar una transacción con HookParameters desde JavaScript",
            pt: "Enviar uma transação com HookParameters a partir de JavaScript",
            en: "Send a transaction with HookParameters from JavaScript",
            jp: "JavaScriptからHookParameters付きトランザクションを送信する",
            ko: "JavaScript에서 HookParameters 포함 트랜잭션 보내기",
            zh: "从 JavaScript 发送带 HookParameters 的交易",
          },
          language: "javascript",
          code: {
            es: `// Archivo: send-parameters.js
// node send-parameters.js <HookAccount>
require("dotenv").config();
const { Client, Wallet, isValidClassicAddress } = require("xahau");

const HOOK_ACCOUNT = process.argv[2];
if (!isValidClassicAddress(HOOK_ACCOUNT ?? "")) {
  throw new Error("Pasa la dirección de la cuenta que tiene el Hook instalado: node send-parameters.js <HookAccount>");
}

async function enviarConParametro() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Convertir el nombre y valor del parámetro a hexadecimal
  // "ACCION" → 414343494F4E  (usa https://hooks.services/tools/ascii-to-hex)
  const paramName  = Buffer.from("ACCION").toString("hex").toUpperCase();
  const paramValue = "D204"; // Valor 1234 en Hex 

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000", // 1 XAH en drops
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,   // "414343494F4E"
          HookParameterValue: paramValue,  // "01"
        },
      },
    ],
  };

  console.log("Enviando Payment con HookParameters...");
  console.log("  Nombre param (hex): ", paramName, " = ACCION");
  console.log("  Valor param  (hex): ", paramValue);

  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("TX enviada. Revisa el Debug Stream en Hooks Builder");
    console.log("Deberías ver las trazas del Hook con el valor del parámetro de tu cuenta. "+wallet.address);
  }

  // Lo que devolvió el Hook, leído de los metadatos de la transacción
  for (const { HookExecution: h } of result.result.meta.HookExecutions ?? []) {
    console.log("Hook result:", h.HookResult, "|", Buffer.from(h.HookReturnString, "hex").toString());
  }

  await client.disconnect();
}

// Enviar con acción 01
enviarConParametro();`,
            pt: `// Arquivo: send-parameters.js
// node send-parameters.js <HookAccount>
require("dotenv").config();
const { Client, Wallet, isValidClassicAddress } = require("xahau");

const HOOK_ACCOUNT = process.argv[2];
if (!isValidClassicAddress(HOOK_ACCOUNT ?? "")) {
  throw new Error("Passe o endereço da conta com o Hook instalado: node send-parameters.js <HookAccount>");
}
async function enviarConParametro() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });
  // Converter o nome e valor do parâmetro a hexadecimal
  // "ACCION" → 414343494F4E  (usa https://hooks.services/tools/ascii-to-hex)
  const paramName  = Buffer.from("ACCION").toString("hex").toUpperCase();
  const paramValue = "D204"; // Valor 1234 em Hex
  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000", // 1 XAH em drops
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,   // "414343494F4E"
          HookParameterValue: paramValue,  // "01"
        },
      },
    ],
  };
  console.log("Enviando Payment com HookParameters...");
  console.log("  Nome param (hex): ", paramName, " = ACCION");
  console.log("  Valor param  (hex): ", paramValue);
  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);
  const txResult = result.result.meta.TransactionResult;
  console.log("Resultado:", txResult);
  if (txResult === "tesSUCCESS") {
    console.log("TX enviada. Revisao Debug Stream em Hooks Builder");
    console.log("Você deveria ver as traces do Hook com o valor do parâmetro da sua conta. "+wallet.address);
  }

  // O que o Hook retornou, lido dos metadados da transação
  for (const { HookExecution: h } of result.result.meta.HookExecutions ?? []) {
    console.log("Hook result:", h.HookResult, "|", Buffer.from(h.HookReturnString, "hex").toString());
  }

  await client.disconnect();
}
// Enviar com ação 01
enviarConParametro();`,
            en: `// File: send-parameters.js
// node send-parameters.js <HookAccount>
require("dotenv").config();
const { Client, Wallet, isValidClassicAddress } = require("xahau");

const HOOK_ACCOUNT = process.argv[2];
if (!isValidClassicAddress(HOOK_ACCOUNT ?? "")) {
  throw new Error("Pass the address of the account with the Hook installed: node send-parameters.js <HookAccount>");
}

async function sendParameters() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Translate the name and value to hex
  // "ACTION" → 414354494F4E  (use https://hooks.services/tools/ascii-to-hex)
  const paramName  = Buffer.from("ACTION").toString("hex").toUpperCase();
  const paramValue = "68656C6C6F"; // hello value in Hex

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000", // 1 XAH in drops
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,   // "414354494F4E"
          HookParameterValue: paramValue,  // "68656C6C6F"
        },
      },
    ],
  };

  console.log("Sending Payment with HookParameters...");
  console.log("  Param name (hex): ", paramName, " = ACTION");
  console.log("  Param value (hex): ", paramValue);

  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Result:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("TX sent. Check the Debug Stream in Hooks Builder");
    console.log("You should see Hook traces with the parameter value from your account: "+wallet.address);
  }

  // What the Hook returned, read from the transaction metadata
  for (const { HookExecution: h } of result.result.meta.HookExecutions ?? []) {
    console.log("Hook result:", h.HookResult, "|", Buffer.from(h.HookReturnString, "hex").toString());
  }

  await client.disconnect();
}

sendParameters();`,
            jp: `// ファイル: send-parameters.js
// node send-parameters.js <HookAccount>
require("dotenv").config();
const { Client, Wallet, isValidClassicAddress } = require("xahau");

const HOOK_ACCOUNT = process.argv[2];
if (!isValidClassicAddress(HOOK_ACCOUNT ?? "")) {
  throw new Error("Hook をインストールしたアカウントのアドレスを渡してください: node send-parameters.js <HookAccount>");
}

async function sendParameters() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // 名前と値をhexに変換する
  // "ACTION" → 414354494F4E  (https://hooks.services/tools/ascii-to-hex を使用)
  const paramName  = Buffer.from("ACTION").toString("hex").toUpperCase();
  const paramValue = "68656C6C6F"; // hello のhex値

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000", // 1 XAH（drops単位）
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,   // "414354494F4E"
          HookParameterValue: paramValue,  // "68656C6C6F"
        },
      },
    ],
  };

  console.log("HookParameters付きPaymentを送信中...");
  console.log("  パラメーター名（hex）: ", paramName, " = ACTION");
  console.log("  パラメーター値（hex）: ", paramValue);

  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("結果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("TX送信済み。Hooks BuilderのDebug Streamを確認してください");
    console.log("あなたのアカウントからのパラメーター値でHookのトレースが表示されるはずです: "+wallet.address);
  }

  // Hook が返した内容（トランザクションのメタデータから読み取る）
  for (const { HookExecution: h } of result.result.meta.HookExecutions ?? []) {
    console.log("Hook result:", h.HookResult, "|", Buffer.from(h.HookReturnString, "hex").toString());
  }

  await client.disconnect();
}

sendParameters();`,
            ko: `// 파일: send-parameters.js
// node send-parameters.js <HookAccount>
require("dotenv").config();
const { Client, Wallet, isValidClassicAddress } = require("xahau");

const HOOK_ACCOUNT = process.argv[2];
if (!isValidClassicAddress(HOOK_ACCOUNT ?? "")) {
  throw new Error("Hook이 설치된 계정의 주소를 전달하세요: node send-parameters.js <HookAccount>");
}

async function sendParameters() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // 이름과 값을 hex로 변환
  const paramName  = Buffer.from("ACTION").toString("hex").toUpperCase();
  const paramValue = "68656C6C6F"; // hello

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000",
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,
          HookParameterValue: paramValue,
        },
      },
    ],
  };

  console.log("HookParameters가 포함된 Payment 전송 중...");
  console.log("  파라미터 이름(hex): ", paramName, " = ACTION");
  console.log("  파라미터 값(hex): ", paramValue);

  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("결과:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("TX 전송 완료. Hooks Builder의 Debug Stream을 확인하세요");
    console.log("계정에서 보낸 파라미터 값이 Hook trace에 표시되어야 합니다: " + wallet.address);
  }

  // Hook이 반환한 내용 (트랜잭션 메타데이터에서 읽음)
  for (const { HookExecution: h } of result.result.meta.HookExecutions ?? []) {
    console.log("Hook result:", h.HookResult, "|", Buffer.from(h.HookReturnString, "hex").toString());
  }

  await client.disconnect();
}

sendParameters();`,
            zh: `// 文件: send-parameters.js
// node send-parameters.js <HookAccount>
require("dotenv").config();
const { Client, Wallet, isValidClassicAddress } = require("xahau");

const HOOK_ACCOUNT = process.argv[2];
if (!isValidClassicAddress(HOOK_ACCOUNT ?? "")) {
  throw new Error("请传入安装了 Hook 的账户地址：node send-parameters.js <HookAccount>");
}

async function sendParameters() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  const paramName  = Buffer.from("ACTION").toString("hex").toUpperCase();
  const paramValue = "68656C6C6F";

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000",
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,
          HookParameterValue: paramValue,
        },
      },
    ],
  };

  console.log("正在发送带 HookParameters 的 Payment...");
  console.log("  参数名(hex): ", paramName, " = ACTION");
  console.log("  参数值(hex): ", paramValue);

  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("结果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("TX 已发送，请检查 Hooks Builder 的 Debug Stream");
    console.log("你应该能看到来自该账户参数值的 Hook trace: " + wallet.address);
  }

  // Hook 的返回内容，从交易元数据中读取
  for (const { HookExecution: h } of result.result.meta.HookExecutions ?? []) {
    console.log("Hook result:", h.HookResult, "|", Buffer.from(h.HookReturnString, "hex").toString());
  }

  await client.disconnect();
}

sendParameters();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "hook_param vs otxn_param", pt: "hook_param vs otxn_param", en: "hook_param vs otxn_param", jp: "hook_param vs otxn_param", ko: "hook_param vs otxn_param", zh: "hook_param vs otxn_param" },
          content: {
            es: "Dos sistemas de parámetros distintos:\n\nhook_param() — configuración estática\n• Se define en SetHook al instalar\n• Almacenado junto al Hook en el ledger\n• Cambia solo al actualizar el Hook\n• Ideal para umbrales, direcciones fijas\n\notxn_param() — datos dinámicos\n• Viene en la transacción que activa el Hook\n• Lo envía el emisor de cada tx\n• Cambia en cada ejecución\n• Ideal para instrucciones, modos, referencias",
            pt: "Dois sistemas de parâmetros distintos:\n\nhook_param() — configuração estática\n• Se define em SetHook ao instalar\n• Armazenado junto ao Hook no ledger\n• Muda apenas ao atualizar o Hook\n• Ideal para limiares, endereços fixos\n\notxn_param() — dados dinâmicos\n• Vem na transação que ativa o Hook\n• É enviado pelo emissor de cada tx\n• Muda em cada execução\n• Ideal para instruções, modos, referências",
            en: "Two different parameter systems:\n\nhook_param() — static configuration\n• Defined in SetHook at installation\n• Stored alongside the Hook in the ledger\n• Changes only when updating the Hook\n• Ideal for thresholds, fixed addresses\n\notxn_param() — dynamic data\n• Comes in the transaction that activates the Hook\n• Sent by the sender of each tx\n• Changes with each execution\n• Ideal for instructions, modes, references",
            jp: "2つの異なるParameterシステム：\n\nhook_param() — 静的設定\n• インストール時のSetHookで定義\n• レジャーのHookと一緒に保存\n• Hookを更新するときのみ変更\n• 閾値、固定アドレスに最適\n\notxn_param() — 動的データ\n• Hookを起動するトランザクションに含まれる\n• 各txの送信者が送信する\n• 各実行で変わる\n• 命令、モード、参照に最適",
            ko: "두 가지 파라미터 시스템:\n\nhook_param() — 정적 설정\n• 설치 시 SetHook에서 정의\n• Hook과 함께 레저에 저장\n• Hook 업데이트 때만 변경\n• 임계값, 고정 주소에 적합\n\notxn_param() — 동적 데이터\n• Hook을 실행한 트랜잭션에 포함\n• 각 tx 발신자가 전달\n• 실행마다 달라짐\n• 명령, 모드, 참조값에 적합",
            zh: "两种不同的参数系统：\n\nhook_param() — 静态配置\n• 在安装时通过 SetHook 定义\n• 与 Hook 一起存储在账本中\n• 仅在更新 Hook 时变化\n• 适合阈值、固定地址\n\notxn_param() — 动态数据\n• 包含在触发 Hook 的交易中\n• 由每笔 tx 的发送者提供\n• 每次执行都可能变化\n• 适合命令、模式、引用值",
          },
          visual: "🎛️",
        },
        {
          title: { es: "otxn_param: firma y retornos", pt: "otxn_param: assinatura e retornos", en: "otxn_param: signature and return values", jp: "otxn_param：シグネチャと戻り値", ko: "otxn_param: 시그니처와 반환값", zh: "otxn_param：签名与返回值" },
          content: {
            es: "int64_t otxn_param(\n  write_ptr, write_len,  // buffer salida\n  read_ptr,  read_len    // nombre del param\n);\n\nRetornos:\n• > 0 → bytes escritos (encontrado)\n• DOESNT_EXIST → no está en la tx\n• TOO_SMALL → nombre vacío\n• TOO_BIG → nombre > 32 bytes\n• OUT_OF_BOUNDS → punteros inválidos\n\nNombre y valor en HEX en la transacción",
            pt: "int64_t otxn_param(\n  write_ptr, write_len,  // buffer de saída\n  read_ptr,  read_len    // nome do param\n);\n\nRetornos:\n• > 0 → bytes escritos (encontrado)\n• DOESNT_EXIST → não está na tx\n• TOO_SMALL → nome vazio\n• TOO_BIG → nome > 32 bytes\n• OUT_OF_BOUNDS → ponteiros inválidos\n\nNome e valor em HEX na transação",
            en: "int64_t otxn_param(\n  write_ptr, write_len,  // output buffer\n  read_ptr,  read_len    // param name\n);\n\nReturn values:\n• > 0 → bytes written (found)\n• DOESNT_EXIST → not in the tx\n• TOO_SMALL → empty name\n• TOO_BIG → name > 32 bytes\n• OUT_OF_BOUNDS → invalid pointers\n\nName and value in HEX in the transaction",
            jp: "int64_t otxn_param(\n  write_ptr, write_len,  // 出力バッファ\n  read_ptr,  read_len    // パラメーター名\n);\n\n戻り値：\n• > 0 → 書き込まれたバイト数（見つかった）\n• DOESNT_EXIST → txに存在しない\n• TOO_SMALL → 空の名前\n• TOO_BIG → 名前が32バイト超\n• OUT_OF_BOUNDS → 無効なポインター\n\nトランザクション内の名前と値はHEXで",
            ko: "int64_t otxn_param(\n  write_ptr, write_len,  // 출력 버퍼\n  read_ptr,  read_len    // 파라미터 이름\n);\n\n반환값:\n• > 0 → 기록된 바이트 수(찾음)\n• DOESNT_EXIST → tx에 없음\n• TOO_SMALL → 빈 이름\n• TOO_BIG → 이름이 32바이트 초과\n• OUT_OF_BOUNDS → 잘못된 포인터\n\n트랜잭션 안의 이름과 값은 HEX 형식",
            zh: "int64_t otxn_param(\n  write_ptr, write_len,  // 输出缓冲区\n  read_ptr,  read_len    // 参数名\n);\n\n返回值：\n• > 0 → 已写入的字节数（找到）\n• DOESNT_EXIST → 交易中不存在\n• TOO_SMALL → 名称为空\n• TOO_BIG → 名称超过 32 字节\n• OUT_OF_BOUNDS → 指针无效\n\n交易中的名称和值都使用 HEX 格式",
          },
          visual: "📨",
        },
        {
          title: { es: "Namespace y recursos", pt: "Namespace e recursos", en: "Namespace and resources", jp: "Namespaceとリソース", ko: "Namespace와 리소스", zh: "Namespace 与资源" },
          content: {
            es: "HookNamespace (32 bytes hex):\n• Distinto namespace = estado aislado\n• Mismo namespace = estado compartido\n• SHA-256 del nombre → namespace único\n\nRecursos:\n• hooks.services → string ↔ hex\n• HookOn calculator\n• Visualizador tiempo (Ripple Epoch)\n• tx-builder.xahau.tools → C desde JSON",
            pt: `HookNamespace (32 bytes hex):
• Distinto namespace = estado isolado
• Mesmo namespace = estado compartilhado
• SHA-256 do nome → namespace único

Recursos:
• hooks.services → string ↔ hex
• HookOn calculator
• Visualizador de tempo (Ripple Epoch)
• tx-builder.xahau.tools → C a partir de JSON`,
            en: "HookNamespace (32 bytes hex):\n• Different namespace = isolated state\n• Same namespace = shared state\n• SHA-256 of name → unique namespace\n\nResources:\n• hooks.services → string ↔ hex\n• HookOn calculator\n• Time visualizer (Ripple Epoch)\n• tx-builder.xahau.tools → C from JSON",
            jp: "HookNamespace（32バイトhex）：\n• 異なる名前空間 = 分離されたステート\n• 同じ名前空間 = 共有ステート\n• 名前のSHA-256 → ユニークな名前空間\n\nリソース：\n• hooks.services → 文字列 ↔ hex\n• HookOn計算機\n• 時間ビジュアライザー（Ripple Epoch）\n• tx-builder.xahau.tools → JSONからC言語",
            ko: "HookNamespace(32바이트 hex):\n• 다른 namespace = 분리된 상태\n• 같은 namespace = 공유 상태\n• 이름의 SHA-256 → 고유 namespace\n\n리소스:\n• hooks.services → 문자열 ↔ hex\n• HookOn 계산기\n• Ripple Epoch 시간 변환기\n• tx-builder.xahau.tools → JSON을 C로 변환",
            zh: "HookNamespace（32 字节 hex）：\n• 不同 namespace = 隔离状态\n• 相同 namespace = 共享状态\n• 名称的 SHA-256 → 唯一 namespace\n\n资源：\n• hooks.services → 字符串 ↔ hex\n• HookOn 计算器\n• Ripple Epoch 时间转换器\n• tx-builder.xahau.tools → 从 JSON 生成 C",
          },
          visual: "🔧",
        },
      ],
    },
    {
      id: "m8l6",
      title: {
        es: "Trazabilidad y debugging de Hooks",
        pt: "Rastreamento e depuração de Hooks",
        en: "Hook tracing and debugging",
        jp: "Hooksのトレースとデバッグ",
        ko: "Hook 추적과 디버깅",
        zh: "Hook 的追踪与调试",
      },
      theory: {
        es: `Un Hook se ejecuta dentro de cada nodo que procesa la transacción, en un sandbox de WebAssembly, sin consola y sin un depurador que conectar. Para saber qué hizo un Hook tienes dos fuentes:

- **Los metadatos de la transacción.** Cada ejecución deja un registro \`HookExecution\`: cómo terminó el Hook, con qué mensaje y con qué código. Está en el ledger, y cualquier nodo lo devuelve.
- **Los mensajes de traza.** \`trace()\`, \`trace_num()\` y \`trace_float()\` escriben líneas en el debug stream del nodo mientras el Hook se ejecuta. Muestran valores intermedios, y no se guardan en el ledger.

Empieza por los metadatos: responden a la mayoría de las preguntas. Añade trazas cuando necesites ver dentro del Hook.

### Qué registran los metadatos

El Hook de ejemplo de esta lección acepta pagos en XAH y rechaza todo lo demás. Resultado en testnet, pagándole 12 XAH (instalado como en la [lección 9.2](?m=9&l=1)):

\`\`\`
TransactionResult:    tesSUCCESS
HookResult:           3
HookReturnString:     debug_demo:ok
HookReturnCode:       51
HookInstructionCount: 94
\`\`\`

- **\`HookResult\`**: cómo terminó el Hook. \`3\` es \`accept()\`; \`2\` es \`rollback()\`, y entonces la transacción falla con \`tecHOOK_REJECTED\`.
- **\`HookReturnString\`**: el mensaje que se pasó a \`accept()\` o \`rollback()\`. Los metadatos lo guardan en hex. Decodificado, termina en un byte cero, porque \`SBUF()\` cuenta el terminador de la cadena.
- **\`HookReturnCode\`**: el número que se pasó como segundo argumento, en hex. \`0x51\` es 81: la línea del \`accept()\` final del archivo, porque el Hook pasa \`__LINE__\`. Con \`__LINE__\` en cada \`accept()\` y \`rollback()\`, el código te dice por dónde salió el Hook.
- **\`HookInstructionCount\`**: cuántas instrucciones de WebAssembly se ejecutaron (\`0x94\` = 148).

Un rechazo queda registrado igual. El Hook \`min_payment\` de la [lección 9.1](?m=9&l=0), al pagarle 5 XAH, da \`tecHOOK_REJECTED\`, \`HookResult: 2\` y su mensaje de rechazo.

Para leer estos campos desde un script, consulta la transacción y decodifica la cadena:

\`\`\`js
const { result } = await client.request({ command: "tx", transaction: hash });
const run = result.meta.HookExecutions[0].HookExecution;
console.log(run.HookResult, Buffer.from(run.HookReturnString, "hex").toString());
\`\`\`

### Las funciones de traza

Los metadatos te dicen cómo terminó el Hook, no qué vio por el camino. Para eso, el Hook escribe líneas de traza. Trazar no cambia el resultado ni el ledger. Las tres funciones, tal como las declara \`extern.h\`:

\`\`\`c
int64_t trace(uint32_t mread_ptr, uint32_t mread_len,
              uint32_t dread_ptr, uint32_t dread_len, uint32_t as_hex);
int64_t trace_num(uint32_t read_ptr, uint32_t read_len, int64_t number);
int64_t trace_float(uint32_t read_ptr, uint32_t read_len, int64_t float1);
\`\`\`

Cada una recibe una etiqueta como puntero y longitud. \`SBUF(x)\` se expande a los dos, y por eso las llamadas parecen cortas.

**\`trace()\`** escribe la etiqueta y un buffer de datos. Con \`as_hex\` a \`1\`, los datos aparecen en hex: así se leen valores binarios como un AccountID, que luego puedes comparar con lo que muestra un explorador. Para un mensaje sin más, no pases datos:

\`\`\`c
trace(SBUF("debug_demo:hook() iniciado"), 0, 0, 0);

uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);
\`\`\`

**\`trace_num()\`** escribe la etiqueta y un entero de 64 bits: importes en drops, contadores y los valores que devuelven las funciones de la Hook API. Esas funciones devuelven un número negativo si hay error, así que trazar el resultado de \`state_set()\` o \`emit()\` muestra un fallo que de otro modo pasaría en silencio:

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("debug_demo:drops recibidos: "), drops);
\`\`\`

**\`trace_float()\`** escribe un número en XFL, el formato de coma flotante que usan los Hooks para importes que no son enteros. \`float_set(exponente, mantisa)\` construye uno: \`float_set(-6, drops)\` es el importe en XAH.

\`\`\`c
trace_float(SBUF("debug_demo:XAH recibidos: "), float_set(-6, drops));
\`\`\`

### Dónde aparecen las trazas

Las trazas van al debug stream del nodo, no a la transacción. En testnet, abre el **Debug Stream** de Hooks Builder, selecciona la cuenta del Hook y después envía la transacción: las líneas aparecen mientras el nodo la procesa. En un nodo propio, aparecen en su log.

Un Hook que termina en \`rollback()\` también escribe sus trazas, así que el debug stream es donde ves los valores que llevaron a un rechazo.

### Las macros de depuración

\`hookapi.h\` incluye \`macro.h\`, que define cuatro macros sobre las funciones de traza. Cada una usa el nombre de la variable como etiqueta, así que \`TRACEVAR(drops)\` escribe \`drops\` y su valor sin que escribas la etiqueta:

| Macro | Función que llama | Para |
|---|---|---|
| \`TRACEVAR(v)\` | \`trace_num()\` | Enteros: drops, contadores, códigos de retorno |
| \`TRACEHEX(v)\` | \`trace(…, 1)\` | Buffers binarios: AccountIDs, hashes, claves |
| \`TRACEXFL(v)\` | \`trace_float()\` | Importes XFL |
| \`TRACESTR(v)\` | \`trace(…, 0)\` | Buffers de texto: parámetros, memos |

Las macros solo actúan cuando \`DEBUG\` vale \`1\`. \`macro.h\` fija \`DEBUG\` a partir de \`NDEBUG\`: sin \`NDEBUG\`, vale \`1\`. Para compilar sin ellas, define \`NDEBUG\` antes de incluir la cabecera:

\`\`\`c
#define NDEBUG        // DEBUG = 0: las macros TRACE no hacen nada
#include "hookapi.h"
\`\`\`

Con \`DEBUG\` a \`0\`, \`if (DEBUG)\` siempre es falso y el compilador quita esas llamadas del WASM. Las llamadas directas a \`trace()\`, \`trace_num()\` y \`trace_float()\` no se ven afectadas: quítalas tú.

### Las trazas y Mainnet

Cada llamada de traza es código que se ejecuta: hace el WASM más grande y la ejecución más larga. Mantén las trazas mientras pruebas en testnet. Antes de instalar el Hook en Mainnet, define \`NDEBUG\` y quita las llamadas de traza directas. Conserva los códigos \`__LINE__\`: no añaden nada a la ejecución y mantienen útiles los metadatos.`,
        pt: `Um Hook é executado dentro de cada nó que processa a transação, num sandbox de WebAssembly, sem console e sem um depurador para conectar. Para saber o que um Hook fez, você tem duas fontes:

- **Os metadados da transação.** Cada execução deixa um registro \`HookExecution\`: como o Hook terminou, com que mensagem e com que código. Ele fica no ledger, e qualquer nó o devolve.
- **As mensagens de trace.** \`trace()\`, \`trace_num()\` e \`trace_float()\` escrevem linhas no debug stream do nó enquanto o Hook é executado. Mostram valores intermediários e não ficam gravadas no ledger.

Comece pelos metadados: eles respondem à maioria das perguntas. Adicione traces quando precisar ver dentro do Hook.

### O que os metadados registram

O Hook de exemplo desta lição aceita pagamentos em XAH e rejeita todo o resto. Resultado na testnet, pagando 12 XAH a ele (instalado como na [lição 9.2](?m=9&l=1)):

\`\`\`
TransactionResult:    tesSUCCESS
HookResult:           3
HookReturnString:     debug_demo:ok
HookReturnCode:       45
HookInstructionCount: 94
\`\`\`

- **\`HookResult\`**: como o Hook terminou. \`3\` é \`accept()\`; \`2\` é \`rollback()\`, e então a transação falha com \`tecHOOK_REJECTED\`.
- **\`HookReturnString\`**: a mensagem passada a \`accept()\` ou \`rollback()\`. Os metadados a guardam em hex. Decodificada, termina num byte zero, porque \`SBUF()\` conta o terminador da string.
- **\`HookReturnCode\`**: o número passado como segundo argumento, em hex. \`0x45\` é 69: a linha do \`accept()\` final do arquivo, porque o Hook passa \`__LINE__\`. Com \`__LINE__\` em cada \`accept()\` e \`rollback()\`, o código diz por onde o Hook saiu.
- **\`HookInstructionCount\`**: quantas instruções de WebAssembly foram executadas (\`0x94\` = 148).

Uma rejeição fica registrada da mesma forma. O Hook \`min_payment\` da [lição 9.1](?m=9&l=0), ao receber 5 XAH, dá \`tecHOOK_REJECTED\`, \`HookResult: 2\` e sua mensagem de rejeição.

Para ler estes campos num script, consulte a transação e decodifique a string:

\`\`\`js
const { result } = await client.request({ command: "tx", transaction: hash });
const run = result.meta.HookExecutions[0].HookExecution;
console.log(run.HookResult, Buffer.from(run.HookReturnString, "hex").toString());
\`\`\`

### As funções de trace

Os metadados dizem como o Hook terminou, não o que ele viu pelo caminho. Para isso, o Hook escreve linhas de trace. O trace não muda o resultado nem o ledger. As três funções, como \`extern.h\` as declara:

\`\`\`c
int64_t trace(uint32_t mread_ptr, uint32_t mread_len,
              uint32_t dread_ptr, uint32_t dread_len, uint32_t as_hex);
int64_t trace_num(uint32_t read_ptr, uint32_t read_len, int64_t number);
int64_t trace_float(uint32_t read_ptr, uint32_t read_len, int64_t float1);
\`\`\`

Cada uma recebe um rótulo como ponteiro e comprimento. \`SBUF(x)\` se expande para os dois, e por isso as chamadas parecem curtas.

**\`trace()\`** escreve o rótulo e um buffer de dados. Com \`as_hex\` igual a \`1\`, os dados aparecem em hex: é assim que se leem valores binários como um AccountID, que depois você pode comparar com o que um explorador mostra. Para uma mensagem simples, não passe dados:

\`\`\`c
trace(SBUF("debug_demo:hook() iniciado"), 0, 0, 0);

uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);
\`\`\`

**\`trace_num()\`** escreve o rótulo e um inteiro de 64 bits: valores em drops, contadores e os valores de retorno das funções da Hook API. Essas funções devolvem um número negativo em caso de erro, então fazer trace do resultado de \`state_set()\` ou \`emit()\` mostra uma falha que de outro modo passaria em silêncio:

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("debug_demo:drops recebidos: "), drops);
\`\`\`

**\`trace_float()\`** escreve um número em XFL, o formato de ponto flutuante que os Hooks usam para valores que não são inteiros. \`float_set(expoente, mantissa)\` constrói um: \`float_set(-6, drops)\` é o valor em XAH.

\`\`\`c
trace_float(SBUF("debug_demo:XAH recebidos: "), float_set(-6, drops));
\`\`\`

### Onde os traces aparecem

Os traces vão para o debug stream do nó, não para a transação. Na testnet, abra o **Debug Stream** do Hooks Builder, selecione a conta do Hook e depois envie a transação: as linhas aparecem enquanto o nó a processa. Num nó próprio, elas aparecem no log dele.

Um Hook que termina em \`rollback()\` também escreve seus traces, então o debug stream é onde você vê os valores que levaram a uma rejeição.

### As macros de depuração

\`hookapi.h\` inclui \`macro.h\`, que define quatro macros sobre as funções de trace. Cada uma usa o nome da variável como rótulo, então \`TRACEVAR(drops)\` escreve \`drops\` e seu valor sem que você escreva o rótulo:

| Macro | Função que chama | Para |
|---|---|---|
| \`TRACEVAR(v)\` | \`trace_num()\` | Inteiros: drops, contadores, códigos de retorno |
| \`TRACEHEX(v)\` | \`trace(…, 1)\` | Buffers binários: AccountIDs, hashes, chaves |
| \`TRACEXFL(v)\` | \`trace_float()\` | Valores XFL |
| \`TRACESTR(v)\` | \`trace(…, 0)\` | Buffers de texto: parâmetros, memos |

As macros só agem quando \`DEBUG\` vale \`1\`. \`macro.h\` define \`DEBUG\` a partir de \`NDEBUG\`: sem \`NDEBUG\`, vale \`1\`. Para compilar sem elas, defina \`NDEBUG\` antes de incluir o cabeçalho:

\`\`\`c
#define NDEBUG        // DEBUG = 0: as macros TRACE não fazem nada
#include "hookapi.h"
\`\`\`

Com \`DEBUG\` em \`0\`, \`if (DEBUG)\` é sempre falso e o compilador remove essas chamadas do WASM. As chamadas diretas a \`trace()\`, \`trace_num()\` e \`trace_float()\` não são afetadas: remova-as você mesmo.

### Os traces e a Mainnet

Cada chamada de trace é código que é executado: deixa o WASM maior e a execução mais longa. Mantenha os traces enquanto testa na testnet. Antes de instalar o Hook na Mainnet, defina \`NDEBUG\` e remova as chamadas de trace diretas. Mantenha os códigos \`__LINE__\`: não acrescentam nada à execução e mantêm os metadados úteis.`,
        en: `A Hook runs inside every node that processes the transaction, in a WebAssembly sandbox, with no console and no debugger to attach. To know what a Hook did, you have two sources:

- **The transaction metadata.** Every execution leaves a \`HookExecution\` record: how the Hook ended, with which message and which code. It is on the ledger, and any node returns it.
- **Trace messages.** \`trace()\`, \`trace_num()\` and \`trace_float()\` write lines to the node's debug stream while the Hook runs. They show intermediate values, and they are not stored on the ledger.

Start with the metadata: it answers most questions. Add traces when you need to see inside the Hook.

### What the metadata records

The example Hook of this lesson accepts payments in XAH and rejects everything else. Result on testnet, paying it 12 XAH (installed as in [lesson 9.2](?m=9&l=1)):

\`\`\`
TransactionResult:    tesSUCCESS
HookResult:           3
HookReturnString:     debug_demo:ok
HookReturnCode:       43
HookInstructionCount: 94
\`\`\`

- **\`HookResult\`**: how the Hook ended. \`3\` is \`accept()\`; \`2\` is \`rollback()\`, and then the transaction fails with \`tecHOOK_REJECTED\`.
- **\`HookReturnString\`**: the message passed to \`accept()\` or \`rollback()\`. The metadata stores it in hex. Decoded, it ends in a zero byte, because \`SBUF()\` counts the string's terminator.
- **\`HookReturnCode\`**: the number passed as the second argument, in hex. \`0x43\` is 67: the line of the final \`accept()\` in the file, because the Hook passes \`__LINE__\`. With \`__LINE__\` in every \`accept()\` and \`rollback()\`, the code tells you where the Hook exited.
- **\`HookInstructionCount\`**: how many WebAssembly instructions ran (\`0x94\` = 148).

A rejection is recorded the same way. The \`min_payment\` Hook of [lesson 9.1](?m=9&l=0), paid 5 XAH, gives \`tecHOOK_REJECTED\`, \`HookResult: 2\` and its rejection message.

To read these fields from a script, query the transaction and decode the string:

\`\`\`js
const { result } = await client.request({ command: "tx", transaction: hash });
const run = result.meta.HookExecutions[0].HookExecution;
console.log(run.HookResult, Buffer.from(run.HookReturnString, "hex").toString());
\`\`\`

### The trace functions

The metadata tells you how the Hook ended, not what it saw on the way. For that, the Hook writes trace lines. Tracing doesn't change the result or the ledger. The three functions, as \`extern.h\` declares them:

\`\`\`c
int64_t trace(uint32_t mread_ptr, uint32_t mread_len,
              uint32_t dread_ptr, uint32_t dread_len, uint32_t as_hex);
int64_t trace_num(uint32_t read_ptr, uint32_t read_len, int64_t number);
int64_t trace_float(uint32_t read_ptr, uint32_t read_len, int64_t float1);
\`\`\`

Each one takes a label as a pointer and a length. \`SBUF(x)\` expands to both, which is why the calls look short.

**\`trace()\`** writes the label and a data buffer. With \`as_hex\` set to \`1\`, the data appears in hex: that is how to read binary values such as an AccountID, which you can then compare with what an explorer shows. For a plain message, pass no data:

\`\`\`c
trace(SBUF("debug_demo:hook() initiated"), 0, 0, 0);

uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);
\`\`\`

**\`trace_num()\`** writes the label and a 64-bit integer: amounts in drops, counters, and the return values of Hook API functions. Those functions return a negative number on error, so tracing the result of \`state_set()\` or \`emit()\` shows a failure that would otherwise pass silently:

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("debug_demo:drops received: "), drops);
\`\`\`

**\`trace_float()\`** writes a number in XFL, the float format Hooks use for amounts that aren't integers. \`float_set(exponent, mantissa)\` builds one: \`float_set(-6, drops)\` is the amount in XAH.

\`\`\`c
trace_float(SBUF("debug_demo:XAH received: "), float_set(-6, drops));
\`\`\`

### Where the traces appear

Traces go to the node's debug stream, not to the transaction. On testnet, open the **Debug Stream** in Hooks Builder, select the Hook's account, and then send the transaction: the lines appear as the node processes it. On a node you run yourself, they appear in its log.

A Hook that ends in \`rollback()\` also writes its traces, so the debug stream is where you see the values that led to a rejection.

### The debug macros

\`hookapi.h\` includes \`macro.h\`, which defines four macros around the trace functions. Each one uses the variable's name as the label, so \`TRACEVAR(drops)\` writes \`drops\` and its value without you typing the label:

| Macro | Function it calls | For |
|---|---|---|
| \`TRACEVAR(v)\` | \`trace_num()\` | Integers: drops, counters, return codes |
| \`TRACEHEX(v)\` | \`trace(…, 1)\` | Binary buffers: AccountIDs, hashes, keys |
| \`TRACEXFL(v)\` | \`trace_float()\` | XFL amounts |
| \`TRACESTR(v)\` | \`trace(…, 0)\` | Text buffers: parameters, memos |

The macros only act when \`DEBUG\` is \`1\`. \`macro.h\` sets \`DEBUG\` from \`NDEBUG\`: without \`NDEBUG\`, it is \`1\`. To compile without them, define \`NDEBUG\` before including the header:

\`\`\`c
#define NDEBUG        // DEBUG = 0: the TRACE macros do nothing
#include "hookapi.h"
\`\`\`

With \`DEBUG\` at \`0\`, \`if (DEBUG)\` is always false and the compiler drops those calls from the WASM. Direct calls to \`trace()\`, \`trace_num()\` and \`trace_float()\` are not affected: remove them yourself.

### Traces and Mainnet

Each trace call is code that runs: it makes the WASM bigger and the execution longer. Keep the traces while you test on testnet. Before installing the Hook on Mainnet, define \`NDEBUG\` and remove the direct trace calls. Keep the \`__LINE__\` codes: they add nothing to the execution and keep the metadata useful.`,
        jp: `Hook はトランザクションを処理するすべてのノードの中で、WebAssembly のサンドボックスとして実行されます。コンソールも、接続できるデバッガーもありません。Hook が何をしたかを知る手段は2つあります。

- **トランザクションのメタデータ。** 実行のたびに \`HookExecution\` レコードが残ります。Hook がどう終了したか、どのメッセージとどのコードで終了したかが記録されます。これは台帳に保存され、どのノードからも取得できます。
- **トレースメッセージ。** \`trace()\`、\`trace_num()\`、\`trace_float()\` は、Hook の実行中にノードの debug stream へ行を書き出します。途中の値を確認できますが、台帳には保存されません。

まずメタデータから確認します。ほとんどの疑問はこれで解決します。Hook の内部を見る必要があるときにトレースを追加します。

### メタデータに記録される内容

このレッスンの Hook の例は、XAH での支払いを受け入れ、それ以外をすべて拒否します。テストネットで 12 XAH を支払った結果です（[レッスン 9.2](?m=9&l=1) と同じ方法でインストール）。

\`\`\`
TransactionResult:    tesSUCCESS
HookResult:           3
HookReturnString:     debug_demo:ok
HookReturnCode:       44
HookInstructionCount: 94
\`\`\`

- **\`HookResult\`**：Hook の終了方法です。\`3\` は \`accept()\`、\`2\` は \`rollback()\` で、この場合トランザクションは \`tecHOOK_REJECTED\` で失敗します。
- **\`HookReturnString\`**：\`accept()\` または \`rollback()\` に渡したメッセージです。メタデータには hex で保存されます。デコードすると末尾にゼロバイトが付きます。\`SBUF()\` が文字列の終端文字も数えるためです。
- **\`HookReturnCode\`**：2番目の引数として渡した数値を hex で表したものです。\`0x44\` は 68 で、ファイル内の最後の \`accept()\` の行番号です。Hook が \`__LINE__\` を渡しているためです。すべての \`accept()\` と \`rollback()\` に \`__LINE__\` を渡しておけば、Hook がどこで終了したかがこのコードでわかります。
- **\`HookInstructionCount\`**：実行された WebAssembly 命令の数です（\`0x94\` = 148）。

拒否も同じように記録されます。[レッスン 9.1](?m=9&l=0) の \`min_payment\` Hook に 5 XAH を支払うと、\`tecHOOK_REJECTED\`、\`HookResult: 2\` と拒否メッセージが記録されます。

スクリプトからこれらのフィールドを読むには、トランザクションを照会して文字列をデコードします。

\`\`\`js
const { result } = await client.request({ command: "tx", transaction: hash });
const run = result.meta.HookExecutions[0].HookExecution;
console.log(run.HookResult, Buffer.from(run.HookReturnString, "hex").toString());
\`\`\`

### トレース関数

メタデータからわかるのは Hook がどう終了したかであり、途中で何を見たかではありません。それを知るために、Hook はトレース行を書き出します。トレースは結果にも台帳にも影響しません。\`extern.h\` での3つの関数の宣言は次のとおりです。

\`\`\`c
int64_t trace(uint32_t mread_ptr, uint32_t mread_len,
              uint32_t dread_ptr, uint32_t dread_len, uint32_t as_hex);
int64_t trace_num(uint32_t read_ptr, uint32_t read_len, int64_t number);
int64_t trace_float(uint32_t read_ptr, uint32_t read_len, int64_t float1);
\`\`\`

どの関数もラベルをポインタと長さで受け取ります。\`SBUF(x)\` はその2つに展開されるため、呼び出しが短く見えます。

**\`trace()\`** はラベルとデータバッファを書き出します。\`as_hex\` を \`1\` にするとデータが hex で表示されます。AccountID のようなバイナリ値はこの方法で読み、エクスプローラーの表示と比較できます。メッセージだけを書く場合は、データを渡しません。

\`\`\`c
trace(SBUF("debug_demo:hook() 開始"), 0, 0, 0);

uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF("debug_demo:hook_account（20バイト）: "), SBUF(hook_acc), 1);
\`\`\`

**\`trace_num()\`** はラベルと 64 ビット整数を書き出します。drops 単位の金額、カウンター、Hook API 関数の戻り値などに使います。これらの関数はエラー時に負の数を返すため、\`state_set()\` や \`emit()\` の結果をトレースすれば、見過ごされがちな失敗がわかります。

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("debug_demo:受信したdrops: "), drops);
\`\`\`

**\`trace_float()\`** は XFL 形式の数値を書き出します。XFL は、Hooks が整数でない金額に使う浮動小数点形式です。\`float_set(exponent, mantissa)\` で作成でき、\`float_set(-6, drops)\` は XAH 単位の金額になります。

\`\`\`c
trace_float(SBUF("debug_demo:受信したXAH: "), float_set(-6, drops));
\`\`\`

### トレースが表示される場所

トレースはトランザクションではなく、ノードの debug stream に送られます。テストネットでは、Hooks Builder の **Debug Stream** を開いて Hook のアカウントを選択し、その後でトランザクションを送信します。ノードが処理するのに合わせて行が表示されます。自分で運用するノードでは、そのログに表示されます。

\`rollback()\` で終了する Hook もトレースを書き出します。拒否に至った値は debug stream で確認できます。

### デバッグマクロ

\`hookapi.h\` は \`macro.h\` を読み込み、\`macro.h\` はトレース関数をラップする4つのマクロを定義しています。どのマクロも変数名をラベルとして使うため、\`TRACEVAR(drops)\` と書くだけで、ラベルを入力しなくても \`drops\` とその値が書き出されます。

| マクロ | 呼び出す関数 | 用途 |
|---|---|---|
| \`TRACEVAR(v)\` | \`trace_num()\` | 整数：drops、カウンター、戻り値のコード |
| \`TRACEHEX(v)\` | \`trace(…, 1)\` | バイナリバッファ：AccountID、ハッシュ、鍵 |
| \`TRACEXFL(v)\` | \`trace_float()\` | XFL の金額 |
| \`TRACESTR(v)\` | \`trace(…, 0)\` | テキストバッファ：パラメータ、メモ |

マクロが動作するのは \`DEBUG\` が \`1\` のときだけです。\`macro.h\` は \`NDEBUG\` に応じて \`DEBUG\` を設定し、\`NDEBUG\` がなければ \`1\` になります。マクロなしでコンパイルするには、ヘッダーを読み込む前に \`NDEBUG\` を定義します。

\`\`\`c
#define NDEBUG        // DEBUG = 0：TRACE マクロは何もしない
#include "hookapi.h"
\`\`\`

\`DEBUG\` が \`0\` なら \`if (DEBUG)\` は常に偽になり、コンパイラはその呼び出しを WASM から取り除きます。\`trace()\`、\`trace_num()\`、\`trace_float()\` を直接呼び出している箇所には影響しないため、自分で削除します。

### トレースとメインネット

トレースの呼び出しはそれぞれ実行されるコードであり、WASM を大きくし、実行を長くします。テストネットで試している間はトレースを残しておきます。メインネットに Hook をインストールする前に \`NDEBUG\` を定義し、トレース関数の直接呼び出しを削除します。\`__LINE__\` のコードは残します。実行の負担を増やさず、メタデータを役立つ状態に保ちます。`,
        ko: `Hook은 트랜잭션을 처리하는 모든 노드 안에서 WebAssembly 샌드박스로 실행됩니다. 콘솔도 없고 연결할 디버거도 없습니다. Hook이 무엇을 했는지 알 수 있는 방법은 두 가지입니다.

- **트랜잭션 메타데이터.** 실행될 때마다 \`HookExecution\` 레코드가 남습니다. Hook이 어떻게 끝났는지, 어떤 메시지와 어떤 코드로 끝났는지가 기록됩니다. 이 레코드는 원장에 저장되며 어느 노드에서나 조회할 수 있습니다.
- **트레이스 메시지.** \`trace()\`, \`trace_num()\`, \`trace_float()\`는 Hook이 실행되는 동안 노드의 debug stream에 줄을 기록합니다. 중간 값을 보여 주지만 원장에는 저장되지 않습니다.

먼저 메타데이터를 확인하세요. 대부분의 질문은 여기서 답을 얻을 수 있습니다. Hook 내부를 봐야 할 때 트레이스를 추가합니다.

### 메타데이터에 기록되는 내용

이 레슨의 예제 Hook은 XAH 결제는 수락하고 나머지는 모두 거부합니다. 테스트넷에서 12 XAH를 결제한 결과입니다([레슨 9.2](?m=9&l=1)와 같은 방법으로 설치).

\`\`\`
TransactionResult:    tesSUCCESS
HookResult:           3
HookReturnString:     debug_demo:ok
HookReturnCode:       31
HookInstructionCount: 94
\`\`\`

- **\`HookResult\`**: Hook이 끝난 방식입니다. \`3\`은 \`accept()\`, \`2\`는 \`rollback()\`이며, 이 경우 트랜잭션은 \`tecHOOK_REJECTED\`로 실패합니다.
- **\`HookReturnString\`**: \`accept()\`나 \`rollback()\`에 전달한 메시지입니다. 메타데이터에는 hex로 저장됩니다. 디코딩하면 끝에 0 바이트가 붙는데, \`SBUF()\`가 문자열 종료 문자까지 세기 때문입니다.
- **\`HookReturnCode\`**: 두 번째 인수로 전달한 숫자를 hex로 나타낸 값입니다. \`0x31\`은 49로, 파일에서 마지막 \`accept()\`가 있는 줄 번호입니다. Hook이 \`__LINE__\`을 전달하기 때문입니다. 모든 \`accept()\`와 \`rollback()\`에 \`__LINE__\`을 전달하면 이 코드로 Hook이 어디서 종료했는지 알 수 있습니다.
- **\`HookInstructionCount\`**: 실행된 WebAssembly 명령어 수입니다(\`0x94\` = 148).

거부도 같은 방식으로 기록됩니다. [레슨 9.1](?m=9&l=0)의 \`min_payment\` Hook에 5 XAH를 결제하면 \`tecHOOK_REJECTED\`, \`HookResult: 2\`와 거부 메시지가 기록됩니다.

스크립트에서 이 필드를 읽으려면 트랜잭션을 조회하고 문자열을 디코딩합니다.

\`\`\`js
const { result } = await client.request({ command: "tx", transaction: hash });
const run = result.meta.HookExecutions[0].HookExecution;
console.log(run.HookResult, Buffer.from(run.HookReturnString, "hex").toString());
\`\`\`

### 트레이스 함수

메타데이터는 Hook이 어떻게 끝났는지를 알려 줄 뿐, 도중에 무엇을 보았는지는 알려 주지 않습니다. 그래서 Hook이 트레이스 줄을 기록합니다. 트레이스는 결과나 원장을 바꾸지 않습니다. \`extern.h\`에 선언된 세 함수는 다음과 같습니다.

\`\`\`c
int64_t trace(uint32_t mread_ptr, uint32_t mread_len,
              uint32_t dread_ptr, uint32_t dread_len, uint32_t as_hex);
int64_t trace_num(uint32_t read_ptr, uint32_t read_len, int64_t number);
int64_t trace_float(uint32_t read_ptr, uint32_t read_len, int64_t float1);
\`\`\`

각 함수는 레이블을 포인터와 길이로 받습니다. \`SBUF(x)\`가 이 둘로 펼쳐지기 때문에 호출이 짧아 보입니다.

**\`trace()\`**는 레이블과 데이터 버퍼를 기록합니다. \`as_hex\`를 \`1\`로 하면 데이터가 hex로 표시됩니다. AccountID 같은 바이너리 값은 이렇게 읽고, 익스플로러에 표시되는 값과 비교할 수 있습니다. 메시지만 기록하려면 데이터를 전달하지 않습니다.

\`\`\`c
trace(SBUF("debug_demo:hook() 시작"), 0, 0, 0);

uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);
\`\`\`

**\`trace_num()\`**은 레이블과 64비트 정수를 기록합니다. drops 단위 금액, 카운터, Hook API 함수의 반환값에 사용합니다. 이 함수들은 오류가 나면 음수를 반환하므로, \`state_set()\`이나 \`emit()\`의 결과를 트레이스하면 그냥 지나칠 수 있는 실패가 드러납니다.

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("debug_demo:수신한 drops: "), drops);
\`\`\`

**\`trace_float()\`**는 XFL 형식의 숫자를 기록합니다. XFL은 Hooks가 정수가 아닌 금액에 쓰는 부동소수점 형식입니다. \`float_set(exponent, mantissa)\`로 만들 수 있으며, \`float_set(-6, drops)\`는 XAH 단위 금액입니다.

\`\`\`c
trace_float(SBUF("debug_demo:수신한 XAH: "), float_set(-6, drops));
\`\`\`

### 트레이스가 표시되는 곳

트레이스는 트랜잭션이 아니라 노드의 debug stream으로 갑니다. 테스트넷에서는 Hooks Builder의 **Debug Stream**을 열고 Hook 계정을 선택한 다음 트랜잭션을 보냅니다. 노드가 트랜잭션을 처리하면서 줄이 표시됩니다. 직접 운영하는 노드에서는 그 노드의 로그에 표시됩니다.

\`rollback()\`으로 끝나는 Hook도 트레이스를 기록하므로, 거부로 이어진 값은 debug stream에서 확인할 수 있습니다.

### 디버그 매크로

\`hookapi.h\`는 \`macro.h\`를 포함하며, \`macro.h\`는 트레이스 함수를 감싸는 매크로 네 개를 정의합니다. 각 매크로는 변수 이름을 레이블로 사용하므로, \`TRACEVAR(drops)\`만 써도 레이블을 입력하지 않고 \`drops\`와 그 값이 기록됩니다.

| 매크로 | 호출하는 함수 | 용도 |
|---|---|---|
| \`TRACEVAR(v)\` | \`trace_num()\` | 정수: drops, 카운터, 반환 코드 |
| \`TRACEHEX(v)\` | \`trace(…, 1)\` | 바이너리 버퍼: AccountID, 해시, 키 |
| \`TRACEXFL(v)\` | \`trace_float()\` | XFL 금액 |
| \`TRACESTR(v)\` | \`trace(…, 0)\` | 텍스트 버퍼: 파라미터, 메모 |

매크로는 \`DEBUG\`가 \`1\`일 때만 동작합니다. \`macro.h\`는 \`NDEBUG\`에 따라 \`DEBUG\`를 정하며, \`NDEBUG\`가 없으면 \`1\`이 됩니다. 매크로 없이 컴파일하려면 헤더를 포함하기 전에 \`NDEBUG\`를 정의합니다.

\`\`\`c
#define NDEBUG        // DEBUG = 0: TRACE 매크로가 아무것도 하지 않음
#include "hookapi.h"
\`\`\`

\`DEBUG\`가 \`0\`이면 \`if (DEBUG)\`는 항상 거짓이 되고, 컴파일러가 그 호출을 WASM에서 제거합니다. \`trace()\`, \`trace_num()\`, \`trace_float()\`를 직접 호출한 부분은 영향을 받지 않으므로 직접 제거해야 합니다.

### 트레이스와 메인넷

트레이스 호출은 모두 실행되는 코드이므로 WASM을 키우고 실행 시간을 늘립니다. 테스트넷에서 시험하는 동안에는 트레이스를 유지합니다. 메인넷에 Hook을 설치하기 전에 \`NDEBUG\`를 정의하고 트레이스 함수의 직접 호출을 제거합니다. \`__LINE__\` 코드는 남겨 둡니다. 실행 부담을 늘리지 않고 메타데이터를 유용하게 유지합니다.`,
        zh: `Hook 在处理交易的每个节点内部运行，运行在 WebAssembly 沙箱中，没有控制台，也没有可以连接的调试器。要了解 Hook 做了什么，有两个来源：

- **交易元数据。** 每次执行都会留下一条 \`HookExecution\` 记录：Hook 如何结束、使用了什么消息和什么代码。它保存在账本上，任何节点都能返回它。
- **跟踪消息。** \`trace()\`、\`trace_num()\` 和 \`trace_float()\` 会在 Hook 运行时向节点的 debug stream 写入行。它们显示中间值，但不会保存在账本上。

先看元数据：它能回答大多数问题。需要查看 Hook 内部时，再添加跟踪。

### 元数据记录了什么

本课的示例 Hook 接受 XAH 付款，拒绝其他所有交易。在测试网上向它支付 12 XAH 的结果（按[第 9.2 课](?m=9&l=1)的方法安装）：

\`\`\`
TransactionResult:    tesSUCCESS
HookResult:           3
HookReturnString:     debug_demo:ok
HookReturnCode:       32
HookInstructionCount: 94
\`\`\`

- **\`HookResult\`**：Hook 的结束方式。\`3\` 表示 \`accept()\`；\`2\` 表示 \`rollback()\`，此时交易以 \`tecHOOK_REJECTED\` 失败。
- **\`HookReturnString\`**：传给 \`accept()\` 或 \`rollback()\` 的消息。元数据以 hex 保存它。解码后末尾有一个零字节，因为 \`SBUF()\` 把字符串的结束符也计算在内。
- **\`HookReturnCode\`**：作为第二个参数传入的数字，以 hex 表示。\`0x32\` 是 50：文件中最后一个 \`accept()\` 所在的行号，因为 Hook 传入的是 \`__LINE__\`。在每个 \`accept()\` 和 \`rollback()\` 中都传入 \`__LINE__\`，这个代码就能告诉你 Hook 从哪里退出。
- **\`HookInstructionCount\`**：执行的 WebAssembly 指令数（\`0x94\` = 148）。

拒绝也会以同样的方式记录。向[第 9.1 课](?m=9&l=0)的 \`min_payment\` Hook 支付 5 XAH，会得到 \`tecHOOK_REJECTED\`、\`HookResult: 2\` 和它的拒绝消息。

要在脚本中读取这些字段，查询交易并解码字符串：

\`\`\`js
const { result } = await client.request({ command: "tx", transaction: hash });
const run = result.meta.HookExecutions[0].HookExecution;
console.log(run.HookResult, Buffer.from(run.HookReturnString, "hex").toString());
\`\`\`

### 跟踪函数

元数据告诉你 Hook 如何结束，但不告诉你它在执行过程中看到了什么。为此，Hook 会写入跟踪行。跟踪不会改变结果，也不会改变账本。\`extern.h\` 中这三个函数的声明如下：

\`\`\`c
int64_t trace(uint32_t mread_ptr, uint32_t mread_len,
              uint32_t dread_ptr, uint32_t dread_len, uint32_t as_hex);
int64_t trace_num(uint32_t read_ptr, uint32_t read_len, int64_t number);
int64_t trace_float(uint32_t read_ptr, uint32_t read_len, int64_t float1);
\`\`\`

每个函数都以指针和长度的形式接收一个标签。\`SBUF(x)\` 会展开成这两个参数，所以调用看起来很短。

**\`trace()\`** 写入标签和一个数据缓冲区。把 \`as_hex\` 设为 \`1\`，数据会以 hex 显示：AccountID 这样的二进制值就是这样读取的，之后可以和浏览器中显示的值进行比较。如果只写一条消息，就不传数据：

\`\`\`c
trace(SBUF("debug_demo:hook() 已启动"), 0, 0, 0);

uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);
\`\`\`

**\`trace_num()\`** 写入标签和一个 64 位整数：以 drops 为单位的金额、计数器，以及 Hook API 函数的返回值。这些函数出错时返回负数，所以跟踪 \`state_set()\` 或 \`emit()\` 的结果，能发现原本会悄悄发生的失败：

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("debug_demo:收到的 drops: "), drops);
\`\`\`

**\`trace_float()\`** 写入一个 XFL 格式的数字。XFL 是 Hooks 用于非整数金额的浮点格式。\`float_set(exponent, mantissa)\` 可以构造一个：\`float_set(-6, drops)\` 就是以 XAH 为单位的金额。

\`\`\`c
trace_float(SBUF("debug_demo:收到的 XAH: "), float_set(-6, drops));
\`\`\`

### 跟踪显示在哪里

跟踪写入节点的 debug stream，而不是写入交易。在测试网上，打开 Hooks Builder 的 **Debug Stream**，选择 Hook 所在的账户，然后发送交易：节点处理交易时，这些行就会出现。在你自己运行的节点上，它们会出现在节点日志中。

以 \`rollback()\` 结束的 Hook 同样会写入跟踪，所以导致拒绝的那些值可以在 debug stream 中看到。

### 调试宏

\`hookapi.h\` 包含了 \`macro.h\`，\`macro.h\` 在跟踪函数之上定义了四个宏。每个宏都把变量名用作标签，所以 \`TRACEVAR(drops)\` 会写出 \`drops\` 及其值，而无需你输入标签：

| 宏 | 调用的函数 | 用途 |
|---|---|---|
| \`TRACEVAR(v)\` | \`trace_num()\` | 整数：drops、计数器、返回码 |
| \`TRACEHEX(v)\` | \`trace(…, 1)\` | 二进制缓冲区：AccountID、哈希、密钥 |
| \`TRACEXFL(v)\` | \`trace_float()\` | XFL 金额 |
| \`TRACESTR(v)\` | \`trace(…, 0)\` | 文本缓冲区：参数、备注 |

只有当 \`DEBUG\` 为 \`1\` 时，这些宏才会起作用。\`macro.h\` 根据 \`NDEBUG\` 设置 \`DEBUG\`：没有 \`NDEBUG\` 时为 \`1\`。要在编译时去掉它们，在包含头文件之前定义 \`NDEBUG\`：

\`\`\`c
#define NDEBUG        // DEBUG = 0：TRACE 宏不做任何事
#include "hookapi.h"
\`\`\`

当 \`DEBUG\` 为 \`0\` 时，\`if (DEBUG)\` 永远为假，编译器会把这些调用从 WASM 中移除。直接调用的 \`trace()\`、\`trace_num()\` 和 \`trace_float()\` 不受影响：需要你自己删除。

### 跟踪与主网

每个跟踪调用都是会执行的代码：它会让 WASM 变大、执行变长。在测试网上测试时保留跟踪。把 Hook 安装到主网之前，定义 \`NDEBUG\` 并删除直接的跟踪调用。保留 \`__LINE__\` 代码：它们不会增加执行负担，还能让元数据保持有用。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Hook instrumentado con todas las funciones de traza",
            pt: "Hook instrumentado com todas as funções de trace",
            en: "Hook instrumented with all trace functions",
            jp: "すべてのトレース関数を利用したHook",
            ko: "모든 trace 함수를 사용하는 Hook",
            zh: "使用全部 trace 函数的 Hook",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

/**
 * Hook: debug_demo.c
 *
 * Objetivo:
 *  - Demostrar el uso de trace(), trace_num() y trace_float()
 *    para inspeccionar la ejecución del Hook en tiempo real.
 *  - Solo acepta pagos en XAH (monto nativo en 8 bytes).
 *
 * Importante (por tu error de compilación):
 *  - En el HookAPI actual, trace() requiere 5 argumentos:
 *      trace(msg_ptr, msg_len, data_ptr, data_len, as_hex)
 *
 *    Por eso NO vale:
 *      trace(SBUF("hola"), 0);     // <- 3 args (2 + 1)
 *
 *    Lo correcto para "solo mensaje" es:
 *      trace(SBUF("hola"), 0, 0, 0);
 *
 *    Y para "mensaje + buffer en hex":
 *      trace(SBUF("label: "), SBUF(buffer), 1);
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);

    // ── 1. Traza de inicio (solo mensaje) ───────────────────────────────────
    trace(SBUF("debug_demo:hook() iniciado"), 0, 0, 0);

    // ── 2. Trazar la cuenta donde está instalado el Hook ────────────────────
    // hook_account() llena 20 bytes con el AccountID (raw)
    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));

    // Mostrarlo como HEX. Ponemos un mensaje "label" y el buffer a la derecha.
    trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);

    // ── 3. Tipo de transacción entrante ─────────────────────────────────────
    // otxn_type() devuelve el tipo numérico. En Hooks:
    //  0 = Payment
    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:tipo de tx (0=Payment): "), tt);

    // Si no es Payment, no hacemos nada “malo”: simplemente aceptamos y salimos.
    if (tt != 0)
    {
        trace(SBUF("debug_demo:no es un pago — saliendo"), 0, 0, 0);
        accept(SBUF("debug_demo:ok (no payment)"), __LINE__);
    }

    trace(SBUF("debug_demo:rama pago alcanzada"), 0, 0, 0);

    // ── 4. Obtener el Amount del Payment ────────────────────────────────────
    // En Xahau, sfAmount:
    //  - Si es nativo (XAH), otxn_field devuelve 8 bytes.
    //  - Si es IOU/token, devuelve más (no 8).
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:bytes leidos del Amount: "), amount_len);

    // Solo permitimos XAH nativo. Si no es de 8 bytes, rechazamos.
    if (amount_len != 8)
    {
        trace(SBUF("debug_demo:Amount no es XAH (8 bytes) — rechazando"), 0, 0, 0);
        rollback(SBUF("debug_demo:solo XAH nativo"), __LINE__);
    }

    // ── 5. Trazar el valor en drops ─────────────────────────────────────────
    // amount_buf contiene el Amount nativo codificado; AMOUNT_TO_DROPS lo pasa a int64 (drops)
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:drops recibidos: "), drops);

    // El mismo importe en XAH, como XFL: drops × 10^-6
    trace_float(SBUF("debug_demo:XAH recibidos: "), float_set(-6, drops));

    // ── 6. Aceptar y terminar ───────────────────────────────────────────────
    // __LINE__ te deja rastrear exactamente desde qué línea saliste
    trace(SBUF("debug_demo:pago aceptado, saliendo"), 0, 0, 0);
    accept(SBUF("debug_demo:ok"), __LINE__);

    // Nunca llega aquí porque accept/rollback terminan el hook,
    // pero lo dejamos por buena forma.
    return 0;
}`,
            pt: `#include "hookapi.h"
/**
 * Hook: debug_demo.c
 *
 * Objetivo:
 *  - Demostrar o uso de trace(), trace_num() e trace_float()
 *    para inspecionar a execução do Hook em tempo real.
 *  - Só aceita pagamentos em XAH (valor nativo em 8 bytes).
 *
 * Importante (pelo seu erro de compilação):
 *  - Em o HookAPI atual, trace() exige 5 argumentos:
 *      trace(msg_ptr, msg_len, data_ptr, data_len, as_hex)
 *
 *    Por isso NÃO vale:
 *      trace(SBUF("hola"), 0);     // <- 3 args (2 + 1)
 *
 *    O correto para "apenas mensagem" é:
 *      trace(SBUF("hola"), 0, 0, 0);
 *
 *    E para "mensagem + buffer em hex":
 *      trace(SBUF("label: "), SBUF(buffer), 1);
 */
int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    // ── 1. Trace inicial (apenas mensagem) ──────────────────────────────────
    trace(SBUF("debug_demo:hook() iniciado"), 0, 0, 0);
    // ── 2. Rastrear a conta onde o Hook está instalado ─────────────
    // hook_account() preenche 20 bytes com o AccountID (bruto)
    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));
    // Mostrá-lo como HEX. Colocamos um mensagem "label" e o buffer à direita.
    trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);
    // ── 3. Tipo da transação recebida ─────────────────────────────────────
    // otxn_type() retornao tipo numérico. Em Hooks:
    //  0 = Payment
    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:tipo de tx (0=Payment): "), tt);
    // Se não for Payment, nada de "mau" acontece: simplesmente aceita e sai.
    if (tt != 0)
    {
        trace(SBUF("debug_demo: nao e um pagamento, saindo"), 0, 0, 0);
        accept(SBUF("debug_demo:ok (no payment)"), __LINE__);
    }
    trace(SBUF("debug_demo:ramo de pagamento alcançado"), 0, 0, 0);
    // ── 4. Obter ou Amount do Payment ────────────────────────────────────
    // Em Xahau, sfAmount:
    //  - Se é nativo (XAH), otxn_field retorna 8 bytes.
    //  - Se é IOU/token, retorna mais (não 8).
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:bytes leidos do Amount: "), amount_len);
    // Apenas permitimos XAH nativo. Se não é de 8 bytes, rechazamos.
    if (amount_len != 8)
    {
        trace(SBUF("debug_demo:Amount no é XAH (8 bytes) — rechazando"), 0, 0, 0);
        rollback(SBUF("debug_demo: apenas XAH nativo"), __LINE__);
    }
    // ── 5. Traçar o valor em drops ─────────────────────────────────────────
    // amount_buf contém o Amount nativo codificado; AMOUNT_TO_DROPS o converte para int64 (drops)
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:drops recebidos: "), drops);

    // O mesmo valor em XAH, como XFL: drops × 10^-6
    trace_float(SBUF("debug_demo:XAH recebidos: "), float_set(-6, drops));
    // ── 6. Aceitar e terminar ───────────────────────────────────────────────
    // __LINE__ permite rastrear exatamente a partir de qual linha saiu
    trace(SBUF("debug_demo: pagamento aceito, saindo"), 0, 0, 0);
    accept(SBUF("debug_demo:ok"), __LINE__);
    // Nunca chega aqui, porque accept/rollback encerram o hook,
    // mas fica aqui por boa prática.
    return 0;
}`,
            en: `#include "hookapi.h"

/**
 * Hook: debug_demo.c
 *
 * Goal:
 *  - How to use trace(), trace_num() and trace_float() to inspect the Hook execution in real time.
 *  - Only accepts payments in XAH (native amount in 8 bytes).
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);

    // ── 1. Initial trace (message only) ───────────────────────────────────
    trace(SBUF("debug_demo:hook() initiated"), 0, 0, 0);

    // ── 2. Trace the account where the Hook is installed ────────────────────
    // hook_account() fills  20 bytes with the AccountID (raw)
    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));

    // Show it as HEX. Put "label" and the buffer to the right.
    trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);

    // ── 3. Type of transaction ─────────────────────────────────────
    // otxn_type() returns a number type. In Hooks:
    //  0 = Payment
    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:tx type (0=Payment): "), tt);

    // If it's not Payment, we leave.
    if (tt != 0)
    {
        trace(SBUF("debug_demo:not a payment — exiting"), 0, 0, 0);
        accept(SBUF("debug_demo:ok (no payment)"), __LINE__);
    }

    trace(SBUF("debug_demo:payment branch reached"), 0, 0, 0);

    // ── 4. Obtain Amount of Payment ────────────────────────────────────
    // In Xahau, sfAmount:
    //  - If its (XAH), otxn_field returns 8 bytes.
    //  - If its an IOU/token, returns more (no 8).
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:bytes read from Amount: "), amount_len);

    // Only XAH allowed. If not, we deny.
    if (amount_len != 8)
    {
        trace(SBUF("debug_demo:Amount not XAH (8 bytes) — rejecting"), 0, 0, 0);
        rollback(SBUF("debug_demo:only XAH native"), __LINE__);
    }

    // ── 5. Trace the value in drops ─────────────────────────────────────────
    // amount_buf contains the Amount coded; AMOUNT_TO_DROPS translates to int64 (drops)
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:drops received: "), drops);

    // The same amount in XAH, as an XFL: drops × 10^-6
    trace_float(SBUF("debug_demo:XAH received: "), float_set(-6, drops));

    // ── 6. Accept and finish ───────────────────────────────────────────────
    // __LINE__ allows you to track exactly from which line you exited
    trace(SBUF("debug_demo:payment accepted, exiting"), 0, 0, 0);
    accept(SBUF("debug_demo:ok"), __LINE__);

    // Never reaches here because accept/rollback finish the  hook,
    return 0;
}`,
            jp: `#include "hookapi.h"

/**
 * Hook: debug_demo.c
 *
 * 目標：
 *  - trace()、trace_num()、trace_float()を使って
 *    Hookの実行をリアルタイムで検査する方法を示す。
 *  - XAH（8バイトのネイティブ金額）の支払いのみを承認する。
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);

    // ── 1. 初期トレース（メッセージのみ）───────────────────────────────────
    trace(SBUF("debug_demo:hook() 開始"), 0, 0, 0);

    // ── 2. Hookがインストールされているアカウントをトレースする ────────────────────
    // hook_account() はAccountID（RAW）で20バイトを埋める
    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));

    // HEXとして表示する。「ラベル」とバッファを右側に置く。
    trace(SBUF("debug_demo:hook_account（20バイト）: "), SBUF(hook_acc), 1);

    // ── 3. 受信トランザクションのタイプ ─────────────────────────────────────
    // otxn_type()は数値タイプを返す。Hooksでは：
    //  0 = Payment
    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:txタイプ（0=Payment）: "), tt);

    // Paymentでない場合は終了する
    if (tt != 0)
    {
        trace(SBUF("debug_demo:支払いではない — 終了"), 0, 0, 0);
        accept(SBUF("debug_demo:ok（支払いなし）"), __LINE__);
    }

    trace(SBUF("debug_demo:支払いブランチに到達"), 0, 0, 0);

    // ── 4. PaymentのAmountを取得する ────────────────────────────────────
    // Xahauでは、sfAmount：
    //  - ネイティブ（XAH）の場合、otxn_fieldは8バイトを返す。
    //  - IOU/tokenの場合、より多く返す（8ではない）。
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:Amountから読み取ったバイト数: "), amount_len);

    // ネイティブXAHのみを許可する。8バイトでない場合は拒否する。
    if (amount_len != 8)
    {
        trace(SBUF("debug_demo:AmountはXAHではない（8バイト）— 拒否"), 0, 0, 0);
        rollback(SBUF("debug_demo:ネイティブXAHのみ"), __LINE__);
    }

    // ── 5. drops単位の値をトレースする ─────────────────────────────────────────
    // amount_bufにはエンコードされたネイティブAmountが含まれる; AMOUNT_TO_DROPSがint64（drops）に変換
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:受信したdrops: "), drops);

    // 同じ金額を XAH 単位の XFL で：drops × 10^-6
    trace_float(SBUF("debug_demo:受信したXAH: "), float_set(-6, drops));

    // ── 6. 承認して終了する ───────────────────────────────────────────────
    // __LINE__を使うとどの行から終了したかを正確にトレースできる
    trace(SBUF("debug_demo:支払いを承認、終了"), 0, 0, 0);
    accept(SBUF("debug_demo:ok"), __LINE__);

    // accept/rollbackがhookを終了させるのでここには到達しない
    return 0;
}`,
            ko: `#include "hookapi.h"

/**
 * Hook: debug_demo.c
 *
 * 목표:
 *  - trace(), trace_num(), trace_float() 로 Hook 실행을 실시간 점검한다.
 *  - 네이티브 XAH 결제만 수락한다.
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);

    trace(SBUF("debug_demo:hook() 시작"), 0, 0, 0);

    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));
    trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);

    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:tx 타입 (0=Payment): "), tt);

    if (tt != 0)
    {
        trace(SBUF("debug_demo:결제가 아님 - 종료"), 0, 0, 0);
        accept(SBUF("debug_demo:ok (no payment)"), __LINE__);
    }

    trace(SBUF("debug_demo:payment 분기 진입"), 0, 0, 0);

    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:Amount 바이트 수: "), amount_len);

    if (amount_len != 8)
    {
        trace(SBUF("debug_demo:Amount가 네이티브 XAH가 아님"), 0, 0, 0);
        rollback(SBUF("debug_demo:네이티브 XAH만 허용"), __LINE__);
    }

    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:수신한 drops: "), drops);

    // 같은 금액을 XAH 단위 XFL로: drops × 10^-6
    trace_float(SBUF("debug_demo:수신한 XAH: "), float_set(-6, drops));

    trace(SBUF("debug_demo:결제 수락, 종료"), 0, 0, 0);
    accept(SBUF("debug_demo:ok"), __LINE__);
    return 0;
}`,
            zh: `#include "hookapi.h"

/**
 * Hook: debug_demo.c
 *
 * 目标：
 *  - 演示如何使用 trace()、trace_num() 和 trace_float()
 *    来实时检查 Hook 的执行。
 *  - 只接受原生 XAH 付款。
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);

    trace(SBUF("debug_demo:hook() 已启动"), 0, 0, 0);

    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));
    trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);

    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:tx 类型 (0=Payment): "), tt);

    if (tt != 0)
    {
        trace(SBUF("debug_demo:不是付款 - 退出"), 0, 0, 0);
        accept(SBUF("debug_demo:ok (no payment)"), __LINE__);
    }

    trace(SBUF("debug_demo:进入 payment 分支"), 0, 0, 0);

    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:Amount 字节数: "), amount_len);

    if (amount_len != 8)
    {
        trace(SBUF("debug_demo:Amount 不是原生 XAH"), 0, 0, 0);
        rollback(SBUF("debug_demo:仅允许原生 XAH"), __LINE__);
    }

    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:收到的 drops: "), drops);

    // 同一金额以 XAH 为单位的 XFL：drops × 10^-6
    trace_float(SBUF("debug_demo:收到的 XAH: "), float_set(-6, drops));

    trace(SBUF("debug_demo:付款已接受，退出"), 0, 0, 0);
    accept(SBUF("debug_demo:ok"), __LINE__);
    return 0;
}`,
          },
        },
      ],
      slides: [
        {
          title: { es: `Metadatos y trazas`, pt: `Metadados e traces`, en: `Metadata and traces`, jp: `メタデータとトレース`, ko: `메타데이터와 트레이스`, zh: `元数据与跟踪` },
          content: {
            es: `Metadatos (en el ledger, siempre):
• HookResult: 3 = accept, 2 = rollback
• HookReturnString: el mensaje de salida
• HookReturnCode: el código de salida, en hex

Trazas (debug stream, mientras pruebas):
• Los valores que vio el Hook por el camino
• No se guardan en el ledger`,
            pt: `Metadados (no ledger, sempre):
• HookResult: 3 = accept, 2 = rollback
• HookReturnString: a mensagem de saída
• HookReturnCode: o código de saída, em hex

Traces (debug stream, durante os testes):
• Os valores que o Hook viu pelo caminho
• Não ficam gravados no ledger`,
            en: `Metadata (on the ledger, always):
• HookResult: 3 = accept, 2 = rollback
• HookReturnString: the exit message
• HookReturnCode: the exit code, in hex

Traces (debug stream, while testing):
• The values the Hook saw on the way
• Not stored on the ledger`,
            jp: `メタデータ（台帳に常に記録）：
• HookResult：3 = accept、2 = rollback
• HookReturnString：終了メッセージ
• HookReturnCode：終了コード（hex）

トレース（テスト中の debug stream）：
• Hook が途中で見た値
• 台帳には保存されない`,
            ko: `메타데이터(원장에 항상 기록):
• HookResult: 3 = accept, 2 = rollback
• HookReturnString: 종료 메시지
• HookReturnCode: 종료 코드(hex)

트레이스(테스트 중 debug stream):
• Hook이 도중에 본 값
• 원장에 저장되지 않음`,
            zh: `元数据（始终记录在账本上）：
• HookResult：3 = accept，2 = rollback
• HookReturnString：退出消息
• HookReturnCode：退出代码（hex）

跟踪（测试时的 debug stream）：
• Hook 执行过程中看到的值
• 不保存在账本上`,
          },
          visual: "🔍",
        },
        {
          title: { es: `Las tres funciones trace*`, pt: `As três funções trace*`, en: `The three trace* functions`, jp: `3つのtrace*関数`, ko: `세 가지 trace* 함수`, zh: `三种 trace* 函数` },
          content: {
            es: `trace(SBUF("etiqueta"), 0, 0, 0);
→ Un mensaje

trace(SBUF("etiqueta"), SBUF(buf), 1);
→ Etiqueta + buffer en hex

trace_num(SBUF("etiqueta"), n);
→ Etiqueta + entero (drops, valores de retorno)

trace_float(SBUF("etiqueta"), xfl);
→ Etiqueta + importe XFL`,
            pt: `trace(SBUF("rótulo"), 0, 0, 0);
→ Uma mensagem

trace(SBUF("rótulo"), SBUF(buf), 1);
→ Rótulo + buffer em hex

trace_num(SBUF("rótulo"), n);
→ Rótulo + inteiro (drops, valores de retorno)

trace_float(SBUF("rótulo"), xfl);
→ Rótulo + valor XFL`,
            en: `trace(SBUF("label"), 0, 0, 0);
→ A message

trace(SBUF("label"), SBUF(buf), 1);
→ Label + buffer in hex

trace_num(SBUF("label"), n);
→ Label + integer (drops, return values)

trace_float(SBUF("label"), xfl);
→ Label + XFL amount`,
            jp: `trace(SBUF("ラベル"), 0, 0, 0);
→ メッセージ

trace(SBUF("ラベル"), SBUF(buf), 1);
→ ラベル + hex のバッファ

trace_num(SBUF("ラベル"), n);
→ ラベル + 整数（drops、戻り値）

trace_float(SBUF("ラベル"), xfl);
→ ラベル + XFL の金額`,
            ko: `trace(SBUF("레이블"), 0, 0, 0);
→ 메시지

trace(SBUF("레이블"), SBUF(buf), 1);
→ 레이블 + hex 버퍼

trace_num(SBUF("레이블"), n);
→ 레이블 + 정수(drops, 반환값)

trace_float(SBUF("레이블"), xfl);
→ 레이블 + XFL 금액`,
            zh: `trace(SBUF("标签"), 0, 0, 0);
→ 一条消息

trace(SBUF("标签"), SBUF(buf), 1);
→ 标签 + hex 缓冲区

trace_num(SBUF("标签"), n);
→ 标签 + 整数（drops、返回值）

trace_float(SBUF("标签"), xfl);
→ 标签 + XFL 金额`,
          },
          visual: "📡",
        },
        {
          title: { es: `Hábitos de depuración`, pt: `Hábitos de depuração`, en: `Debugging habits`, jp: `デバッグの習慣`, ko: `디버깅 습관`, zh: `调试习惯` },
          content: {
            es: `• __LINE__ en accept/rollback → la línea de salida en HookReturnCode
• trace_num del retorno de cada llamada a la Hook API
  (negativo = error)
• Lee las trazas en Hooks Builder → Debug Stream
• Macros TRACE: se apagan con #define NDEBUG
• Antes de Mainnet: NDEBUG, y quita las llamadas de traza directas`,
            pt: `• __LINE__ em accept/rollback → a linha de saída em HookReturnCode
• trace_num do retorno de cada chamada à Hook API
  (negativo = erro)
• Leia os traces no Hooks Builder → Debug Stream
• Macros TRACE: desligadas com #define NDEBUG
• Antes da Mainnet: NDEBUG, e remova as chamadas de trace diretas`,
            en: `• __LINE__ in accept/rollback → the exit line in HookReturnCode
• trace_num the return of each Hook API call
  (negative = error)
• Read traces in Hooks Builder → Debug Stream
• TRACE macros: off with #define NDEBUG
• Before Mainnet: NDEBUG, and remove direct trace calls`,
            jp: `• accept/rollback に __LINE__ → HookReturnCode に終了行
• Hook API の呼び出しごとに戻り値を trace_num
  （負の値 = エラー）
• トレースは Hooks Builder → Debug Stream で読む
• TRACE マクロ：#define NDEBUG で無効化
• メインネットの前に：NDEBUG を定義し、trace の直接呼び出しを削除`,
            ko: `• accept/rollback에 __LINE__ → HookReturnCode에 종료 줄
• Hook API 호출마다 반환값을 trace_num
  (음수 = 오류)
• 트레이스는 Hooks Builder → Debug Stream에서 확인
• TRACE 매크로: #define NDEBUG로 끔
• 메인넷 전: NDEBUG 정의, trace 직접 호출 제거`,
            zh: `• accept/rollback 中使用 __LINE__ → HookReturnCode 中的退出行
• 对每个 Hook API 调用的返回值使用 trace_num
  （负数 = 错误）
• 在 Hooks Builder → Debug Stream 中读取跟踪
• TRACE 宏：用 #define NDEBUG 关闭
• 上主网前：定义 NDEBUG，并删除直接的 trace 调用`,
          },
          visual: "🐛",
        },
      ],
    },
    {
      id: "m8l7",
      title: {
        es: "Hooks Builder: Desarrollo online",
        pt: "Hooks Builder: Desenvolvimento online",
        en: "Hooks Builder: Online development",
        jp: "Hooks Builder：オンライン開発",
        ko: "Hooks Builder: 온라인 개발",
        zh: "Hooks Builder：在线开发",
      },
      theory: {
        es: `[Hooks Builder](https://builder.xahau.network) es el entorno de desarrollo online para Hooks en **Xahau Testnet**. Permite escribir, compilar, desplegar y probar Hooks directamente desde el navegador sin necesidad de instalar nada en tu equipo. **Nota:** Recuerda guardar tus avances y seeds antes de cerrar el navegador, puede que no se guarden una vez cerrada la sesión.

### Pestañas principales

El Builder tiene tres pestañas principales que cubren todo el flujo de desarrollo:

- **Develop**: Escribir y compilar Hooks en C
- **Deploy**: Gestionar cuentas y desplegar Hooks
- **Test**: Generar transacciones de prueba y ver logs

### Paso 1: Gestionar cuentas en Deploy

Antes de desarrollar, necesitas al menos una cuenta de testnet. En la pestaña **Deploy**:

**Crear una cuenta nueva**
1. Haz clic en **"Generate Account"** o el botón de crear cuenta
2. El Builder generará automáticamente un par de claves (dirección + seed) y fondeará la cuenta con XAH de testnet a través del faucet
3. Guarda el seed en un lugar seguro, lo necesitarás si cierras el navegador

**Importar una cuenta existente**
1. Haz clic en **"Import Account"** o el botón de importar
2. Introduce el **seed** (secret) de tu cuenta de testnet
3. La cuenta aparecerá en la lista con su balance y Hooks instalados

Es recomendable tener al menos **dos cuentas**: una para instalar el Hook y otra para enviarle transacciones de prueba. **No utilices seeds de cuentas de Xahau Mainnet en el Builder por seguridad**, si necesitas una nueva seed, genérala dentro del Builder o visita [xahau-test.net](https://xahau-test.net/).

### Paso 2: Desarrollar y compilar en Develop

En la pestaña **Develop**:

1. **Selecciona un ejemplo** del menú lateral o crea un archivo nuevo
2. **Escribe tu Hook en C**, el editor tiene resaltado de sintaxis y autocompletado básico
3. Haz clic en **"Compile To WASM"** para compilar el código C a WebAssembly
4. Si hay errores, aparecerán en la consola inferior, revisa la línea y el mensaje de error
5. Si la compilación es exitosa, recibirás el mensaje \`File xxxx.c compiled successfully. Ready to deploy.Go to deploy\`. El WASM resultante estará listo para desplegarse

**Consejos**:
- Empieza con los ejemplos incluidos para familiarizarte con la API
- Los errores de compilación más comunes son: olvidar incluir \`hookapi.h\`, no declarar el guard \`_g()\`, o errores de tipos en las funciones de la API

### Paso 3: Desplegar en Deploy

Una vez compilado tu Hook, vuelve a la pestaña **Deploy**:

1. **Selecciona la cuenta** donde quieres instalar el Hook y pulsa **Set Hook** para abrir el formulario de instalación
2. **Configura los parámetros**:
   - **Account**: la cuenta donde se instalará el Hook (ya seleccionada)
   - **Sequence**: deja que el Builder lo complete automáticamente
   - **Invoke on transactions** (HookOn): elige los tipos de transacción que activarán el Hook (puedes elegir varias)
   - **Hook Namespace Seed**: el nombre en string que quieres usar como seed para el Namespace.
   - **Hook Namespace (sha256)**: El sha256 generado a partir de la Seed utilizada en el campo anterior (no tocar).
   - **Hook Parameters**: si tu Hook usa parámetros, configúralos aquí (nombre y valor en hex)
   - **Fee**: pulsa en **Suggest** si el Hook da error de fee insuficiente, el Builder calculará el fee recomendado.
3. Haz clic en **"Set Hook"** para enviar la transacción \`SetHook\`
4. Confirma que el resultado es \`tesSUCCESS\` en la consola

### Paso 4: Probar en Test

La pestaña **Test** es donde verificas que tu Hook funciona correctamente:

1. **Transaction type**: Elige el tipo de transacción que quieres enviar (Payment, OfferCreate, etc.).
2. **Account**: El emisor de la transacción.
3. **Sequence**: Deja que el Builder lo complete automáticamente.
4. **Flags**: Configura los flags necesarios para la transacción.
5. **Destination**: La dirección de destino de la transacción.
6. **Amount**: El monto a enviar y el tipo (XAH o IOU), si aplica para la transacción.
7. **Fee**: Pulsa en **Suggest** para que el Builder calcule el fee recomendado.
8. **Hook parameters**: Si tu Hook usa parámetros, configúralos aquí (nombre y valor en hex).
9. **Memos**: Si tu transacción necesita memos, añádelos aquí (opcional).
10. Haz click en **Run Test**.

Deberás estar atento en las pantallas de **Development Log** y **Debug Stream**. En **Debug Stream** puedes elegir que parte del escenario quieres revisar: eligiendo la cuenta si hay varias implicadas.

**Flujo de pruebas recomendado**:

- **Casos positivos**: envía transacciones que deberían ser aceptadas y verifica que pasa.
- **Casos negativos**: envía transacciones que no deberían influir y verifica que es así.
- **Casos límite**: prueba con montos exactos al límite, transacciones de tipos no esperados, etc.
- **Casos no esperados**: prueba transacciones que no esperes por si el Hook las maneja de forma inesperada.
- **Revisa el estado**: si tu Hook usa \`state()\`, verifica que los valores se guardan correctamente consultando \`account_objects\` o la información de estado en el Builder

Una gran y consistente batería de pruebas es clave para asegurar que tu Hook se comporta correctamente en todas las situaciones. Si puedes, pide a otras personas que tambièn prueben tu Hook con casos que tú no hayas considerado.

### Limitaciones del Builder

- Solo funciona con **Xahau Testnet**, no con Mainnet
- Para desarrollo más avanzado o despliegue en producción, necesitarás un entorno local
- El estado de tus cuentas y Hooks se mantiene entre sesiones si no limpias el navegador. No suele ocurrir lo mismo con los Hooks.`,
        pt: `[Hooks Builder](https://builder.xahau.network) é o ambiente de desenvolvimento online para Hooks em **Xahau Testnet**. Permite escrever, compilar, fazer deploy e testar Hooks diretamente a partir do navegador sem necessidade de instalar nada no seu computador. **Nota:** Lembre-se de salvar seus avanços e seeds antes de fechar o navegador, pode ser que não sejam salvos uma vez encerrada a sessão.
### Abas principais
O Builder tem três abas principais que cobrem todo o fluxo de desenvolvimento:
- **Develop**: Escrever e compilar Hooks em C
- **Deploy**: Gerenciar contas e fazer deploy de Hooks
- **Test**: Gerar transações de teste e ver logs
### Passo 1: Gerenciar contas em Deploy
Antes de desenvolver, você precisa ao menos uma conta de testnet. Na aba **Deploy**:
**Criar uma conta nova**
1. Clique em **"Generate Account"** ou o botão de criar conta
2. O Builder gerará automaticamente um par de chaves (endereço + seed) e financiará a conta com XAH de testnet por meio do faucet
3. Guarde a seed em um lugar seguro, você precisará dela se fechar o navegador
**Importar uma conta existente**
1. Clique em **"Import Account"** ou o botão de importar
2. Insira a **seed** (secret) de sua conta de testnet
3. A conta aparecerá na lista com seu saldo e Hooks instalados
É recomendável ter ao menos **duas contas**: uma para instalar o Hook e outra para enviar a ela transações de teste. **Não use seeds de contas de Xahau Mainnet no Builder por segurança**, se você precisar de uma nova seed, gere-a dentro do Builder ou visite [xahau-test.net](https://xahau-test.net/).
### Passo 2: Desenvolver e compilar em Develop
Na aba **Develop**:
1. **Selecione um exemplo** do menu lateral ou crie um arquivo novo
2. **Escreva seu Hook em C**, o editor tem realce de sintaxe e autocompletar básico
3. Clique em **"Compile To WASM"** para compilar o código C a WebAssembly
4. Se houver erros, eles aparecerão no console inferior; revise a linha e a mensagem de erro
5. Se a compilação for bem-sucedida, você receberá a mensagem \`File xxxx.c compiled successfully. Ready to deploy.Go to deploy\`. O WASM resultante estará pronto para deploy
**Dicas**:
- Comece com os exemplos incluídos para se familiarizar com a API
- Os erros de compilação mais comuns são: esquecer de incluir \`hookapi.h\`, não declarar o guard \`_g()\`, ou erros de tipos nas funções da API
### Passo 3: Fazer deploy em Deploy
Uma vez compilado seu Hook, volte à aba **Deploy**:
1. **Selecione a conta** onde você quer instalar o Hook e pressione **Set Hook** para abrir o formulario de instalação
2. **Configure os parâmetros**:
   - **Account**: a conta onde o Hook será instalado (já selecionada)
   - **Sequence**: deixe que o Builder o complete automaticamente
   - **Invoke on transactions** (HookOn): escolha os tipos de transação que ativarão o Hook (você pode escolher várias)
   - **Hook Namespace Seed**: o nome em string que você quer usar como seed para o Namespace.
   - **Hook Namespace (sha256)**: O sha256 gerado a partir da Seed utilizada no campo anterior (não tocar).
   - **Hook Parameters**: se seu Hook usa parâmetros, configure-os aqui (nome e valor em hex)
   - **Fee**: pressione em **Suggest** se o Hook der erro de fee insuficiente, o Builder calculará o fee recomendado.
3. Clique em **"Set Hook"** para enviar a transação \`SetHook\`
4. Confirma que o resultado é \`tesSUCCESS\` na console
### Passo 4: Testar em Test
A aba **Test** é onde verifica que seu Hook funciona corretamente:
1. **Transaction type**: Escolha o tipo de transação que você quer enviar (Payment, OfferCreate, etc.).
2. **Account**: O emissor da transação.
3. **Sequence**: Deixe que o Builder o complete automaticamente.
4. **Flags**: Configura os flags necessários para a transação.
5. **Destination**: O endereço de destino da transação.
6. **Amount**: O valor a enviar e o tipo (XAH ou IOU), se aplica para a transação.
7. **Fee**: Pressione em **Suggest** para que o Builder calcule o fee recomendado.
8. **Hook parameters**: Se seu Hook usa parâmetros, configure-os aqui (nome e valor em hex).
9. **Memos**: Se sua transação precisa memos, adicione-os aqui (opcional).
10. Clique em **Run Test**.
Você deverá ficar atento nas telas de **Development Log** e **Debug Stream**. Em **Debug Stream** você pode escolher qual parte do cenário quer revisar, escolhendo a conta se houver várias envolvidas.
**Fluxo de testes recomendado**:
- **Casos positivos**: envia transações que deveriam ser aceitadas e verifica que acontece.
- **Casos negativos**: envia transações que não deveriam influenciar e verifica que é assim.
- **Casos limite**: teste com valores exatos no limite, transações de tipos inesperados, etc.
- **Casos inesperados**: teste transações que você não espera, para ver se o Hook as trata de forma inesperada.
- **Revise o estado**: se seu Hook usa \`state()\`, verifique se os valores são salvos corretamente consultando \`account_objects\` ou a informação de estado no Builder
Uma bateria grande e consistente de testes é chave para garantir que seu Hook se comporta corretamente em todas as situações. Se você pode, peça a outras pessoas que também testem seu Hook com casos que você não tenha considerado.
### Limitações do Builder
- Funciona apenas com **Xahau Testnet**, no com Mainnet
- Para desenvolvimento mais avançado ou deploy em produção, você precisará de um ambiente local
- O estado de suas contas e Hooks é mantido entre sessões se você não limpar o navegador. O mesmo normalmente não acontece com os Hooks.`,
        en: `[Hooks Builder](https://builder.xahau.network) is the online development environment for Hooks on **Xahau Testnet**. It allows you to write, compile, deploy and test Hooks directly from the browser without needing to install anything on your machine. **Note:** Remember to save your progress and seeds before closing the browser, as they may not be saved once the session is closed.

### Main tabs

The Builder has three main tabs that cover the entire development workflow:

- **Develop**: Write and compile Hooks in C
- **Deploy**: Manage accounts and deploy Hooks
- **Test**: Generate test transactions and view logs

### Step 1: Manage accounts in Deploy

Before developing, you need at least one testnet account. In the **Deploy** tab:

**Create a new account**
1. Click **"Generate Account"** or the create account button
2. The Builder will automatically generate a key pair (address + seed) and fund the account with testnet XAH through the faucet
3. Save the seed in a safe place, you'll need it if you close the browser

**Import an existing account**
1. Click **"Import Account"** or the import button
2. Enter the **seed** (secret) of your testnet account
3. The account will appear in the list with its balance and installed Hooks

It is recommended to have at least **two accounts**: one to install the Hook and another to send test transactions to it. **Do not use seeds from Xahau Mainnet accounts in the Builder for security reasons**, if you need a new seed, generate it within the Builder or visit [xahau-test.net](https://xahau-test.net/).

### Step 2: Develop and compile in Develop

In the **Develop** tab:

1. **Select an example** from the side menu or create a new file
2. **Write your Hook in C**, the editor has syntax highlighting and basic autocomplete
3. Click **"Compile To WASM"** to compile the C code to WebAssembly
4. If there are errors, they will appear in the bottom console, check the line and error message
5. If compilation is successful, you'll receive the message \`File xxxx.c compiled successfully. Ready to deploy.Go to deploy\`. The resulting WASM will be ready to deploy

**Tips**:
- Start with the included examples to familiarize yourself with the API
- The most common compilation errors are: forgetting to include \`hookapi.h\`, not declaring the \`_g()\` guard, or type errors in API functions

### Step 3: Deploy in Deploy

Once your Hook is compiled, go back to the **Deploy** tab:

1. **Select the account** where you want to install the Hook and click **Set Hook** to open the installation form
2. **Configure the parameters**:
   - **Account**: the account where the Hook will be installed (already selected)
   - **Sequence**: let the Builder fill this in automatically
   - **Invoke on transactions** (HookOn): choose the transaction types that will activate the Hook (you can choose multiple)
   - **Hook Namespace Seed**: the string name you want to use as seed for the Namespace.
   - **Hook Namespace (sha256)**: The sha256 generated from the Seed used in the previous field (do not modify).
   - **Hook Parameters**: if your Hook uses parameters, configure them here (name and value in hex)
   - **Fee**: click **Suggest** if the Hook gives a fee insufficient error, the Builder will calculate the recommended fee.
3. Click **"Set Hook"** to send the \`SetHook\` transaction
4. Confirm that the result is \`tesSUCCESS\` in the console

### Step 4: Test in Test

The **Test** tab is where you verify that your Hook works correctly:

1. **Transaction type**: Choose the transaction type you want to send (Payment, OfferCreate, etc.).
2. **Account**: The sender of the transaction.
3. **Sequence**: Let the Builder fill this in automatically.
4. **Flags**: Configure the necessary flags for the transaction.
5. **Destination**: The destination address of the transaction.
6. **Amount**: The amount to send and the type (XAH or IOU), if applicable for the transaction.
7. **Fee**: Click **Suggest** for the Builder to calculate the recommended fee.
8. **Hook parameters**: If your Hook uses parameters, configure them here (name and value in hex).
9. **Memos**: If your transaction needs memos, add them here (optional).
10. Click **Run Test**.

You should watch the **Development Log** and **Debug Stream** screens. In **Debug Stream** you can choose which part of the scenario to review: selecting the account if multiple are involved.

**Recommended test flow**:

- **Positive cases**: send transactions that should be accepted and verify they pass.
- **Negative cases**: send transactions that should not have an effect and verify they don't.
- **Edge cases**: test with amounts exactly at the limit, unexpected transaction types, etc.
- **Unexpected cases**: test transactions you don't expect in case the Hook handles them unexpectedly.
- **Check state**: if your Hook uses \`state()\`, verify that values are saved correctly by querying \`account_objects\` or the state information in the Builder

A large and consistent test suite is key to ensuring your Hook behaves correctly in all situations. If you can, ask other people to also test your Hook with cases you may not have considered.

### Builder limitations

- Only works with **Xahau Testnet**, not with Mainnet
- For more advanced development or production deployment, you'll need a local environment
- Your accounts and Hooks state persists between sessions if you don't clear the browser. The same does not usually apply to Hooks.`,
        jp: `[Hooks Builder](https://builder.xahau.network)は、**Xahau Testnet**上のHooks向けオンライン開発環境です。ブラウザから直接Hooksを記述、コンパイル、デプロイ、テストできます。端末に何もインストールする必要はありません。**注意：** ブラウザを閉じる前に進捗とシードを保存してください。セッションが閉じられると保存されない場合があります。

### メインタブ

BuilderはHooks開発ワークフロー全体をカバーする次の3つのメインタブを持っています。

- **Develop**：C言語でHooksを記述およびコンパイルする
- **Deploy**：アカウントを管理しHooksをデプロイする
- **Test**：テストトランザクションを生成してログを確認する

### ステップ1：Deployでアカウントを管理する

開発を始める前に、少なくとも1つのTestnetアカウントが必要です。**Deploy**タブでは次のことができます。

**新しいアカウントを作成する**
1. **"Generate Account"**またはアカウント作成ボタンをクリックする
2. Builderは自動的にキーペア（アドレス + シード）を生成し、FaucetからTestnet XAHでアカウントに資金を提供する
3. ブラウザを閉じたときに必要になるので、シードを安全な場所に保存する

**既存のアカウントをインポートする**
1. **"Import Account"**またはインポートボタンをクリックする
2. Testnetアカウントの**シード**（secret）を入力する
3. アカウントはその残高とインストールされたHooksとともにリストに表示される

少なくとも**2つのアカウント**を持つことを推奨します：1つはHookのインストール用、もう1つはテストトランザクションの送信用。**セキュリティのためBuilderでXahau Mainnetアカウントのシードを使用しないでください**。新しいシードが必要な場合は、Builder内で生成するか[xahau-test.net](https://xahau-test.net/)を利用してください。

### ステップ2：Developで開発およびコンパイルする

**Develop**タブでは次のことができます。

1. サイドメニューから**例を選択する**か、新しいファイルを作成する
2. **CでHookを記述する**、エディターにはシンタックスハイライトと基本的な自動補完がある
3. **"Compile To WASM"**をクリックしてCコードをWebAssemblyにコンパイルする
4. エラーがある場合は下部のコンソールに表示される。行とエラーメッセージを確認する
5. コンパイルが成功すると\`File xxxx.c compiled successfully. Ready to deploy.Go to deploy\`というメッセージが表示される。生成されたWASMはデプロイ可能な状態になる

**ヒント**：
- APIに慣れるために付属の例から始める
- 最も一般的なコンパイルエラーは：\`hookapi.h\`のinclude忘れ、\`_g()\`ガードの宣言忘れ、またはAPI関数の型エラー

### ステップ3：Deployでデプロイする

HookのコンパイルができたらDeploy**タブに戻ります。

1. Hookをインストールする**アカウントを選択**し、**Set Hook**をクリックしてインストールフォームを開く
2. **パラメーターを設定する**：
   - **Account**：Hookがインストールされるアカウント（すでに選択済み）
   - **Sequence**：Builderが自動的に入力する
   - **Invoke on transactions**（HookOn）：Hookを起動するトランザクションタイプを選択する（複数選択可）
   - **Hook Namespace Seed**：Namespaceのシードとして使用したいstring名
   - **Hook Namespace (sha256)**：前のフィールドのSeedから生成されたsha256（変更しないこと）
   - **Hook Parameters**：HookがParametersを使用する場合、ここで設定する（名前と値はhexで）
   - **Fee**：Hookで手数料不足エラーが出た場合は**Suggest**をクリックし、Builderが推奨手数料を計算する
3. **"Set Hook"**をクリックして\`SetHook\`トランザクションを送信する
4. コンソールで結果が\`tesSUCCESS\`であることを確認する

### ステップ4：Testでテストする

**Test**タブでHookが正しく機能することを確認します。

1. **Transaction type**：送信したいトランザクションタイプを選択する（Payment、OfferCreateなど）。
2. **Account**：トランザクションの送信者。
3. **Sequence**：Builderが自動的に入力する。
4. **Flags**：トランザクションに必要なフラグを設定する。
5. **Destination**：トランザクションの宛先アドレス。
6. **Amount**：トランザクションに該当する場合、送信する金額とタイプ（XAHまたはIOU）。
7. **Fee**：BuilderがSuggestで推奨手数料を計算するためクリックする。
8. **Hook parameters**：HookがParametersを使用する場合、ここで設定する（名前と値はhexで）。
9. **Memos**：トランザクションにメモが必要な場合は追加する（任意）。
10. **Run Test**をクリックする。

**Development Log**と**Debug Stream**の画面を注視する必要があります。**Debug Stream**では、複数のアカウントが関与している場合はアカウントを選択して、シナリオのどの部分を確認するかを選べます。

**推奨テストフロー**：

- **正常ケース**：承認されるべきトランザクションを送信し、通過することを確認する。
- **異常ケース**：影響を与えてはいけないトランザクションを送信し、そうならないことを確認する。
- **境界ケース**：制限ぴったりの金額、予期しないトランザクションタイプなどをテストする。
- **予期しないケース**：Hookが予期しない方法で処理する場合に備えて、予期しないトランザクションをテストする。
- **ステートを確認する**：Hookが\`state()\`を使用する場合、\`account_objects\`またはBuilderのステート情報を照会して値が正しく保存されることを確認する

大規模で一貫したテストスイートは、Hookがすべての状況で正しく動作することを確認するための鍵です。可能であれば、あなたが考慮していないケースでHookをテストするように他の人にも依頼してください。

### Builderの制限事項

- **Xahau Testnet**のみで動作し、Mainnetでは動作しない
- より高度な開発や本番環境へのデプロイには、ローカル環境が必要になる
- ブラウザをクリアしない限り、セッション間でアカウントとHooksの状態は維持される。Hooksの場合は通常そうではない。`,
        ko: `[Hooks Builder](https://builder.xahau.network)는 **Xahau Testnet**용 온라인 Hook 개발 환경입니다. 브라우저만으로 작성, 컴파일, 배포, 테스트까지 빠르게 진행할 수 있습니다.

### 주요 탭

- **Develop**: Hook 코드 작성과 컴파일
- **Deploy**: 계정 관리와 Hook 설치
- **Test**: 테스트 트랜잭션 실행과 로그 확인

### 실습 팁

- 최소 두 개 이상의 테스트 계정을 준비
- 브라우저를 닫기 전에 seed와 진행 상태 저장
- 배포 후에는 Debug Stream과 결과 메타데이터를 함께 확인
- 정상, 실패, 경계, 예외 케이스를 모두 테스트

빠르게 학습하고 실험하기에는 Hooks Builder가 가장 쉬운 진입점이지만, 메인넷 운영이나 자동화에는 한계가 있습니다.`,
        zh: `[Hooks Builder](https://builder.xahau.network) 是面向 **Xahau Testnet** 的在线 Hook 开发环境。只用浏览器就能快速完成编写、编译、部署和测试。

### 主要标签页

- **Develop**：编写与编译 Hook 代码
- **Deploy**：管理账户并安装 Hook
- **Test**：执行测试交易并查看日志

### 实操建议

- 至少准备两个测试账户
- 关闭浏览器前保存好 seed 和当前进度
- 部署后同时查看 Debug Stream 与结果元数据
- 覆盖正常、失败、边界和异常场景

Hooks Builder 是学习和快速实验最容易的入口，但在主网运维或自动化方面仍然有限制。`,
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "Hooks Builder — Entorno online", pt: "Hooks Builder — Ambiente online", en: "Hooks Builder — Online environment", jp: "Hooks Builder — オンライン環境", ko: "Hooks Builder — 온라인 환경", zh: "Hooks Builder — 在线环境" },
          content: {
            es: "builder.xahau.network (solo Testnet)\n\nTres pestanas:\n• Develop: escribir y compilar Hooks en C\n• Deploy: gestionar cuentas y desplegar\n• Test: probar con transacciones reales\n\nGuarda tus seeds antes de cerrar el navegador",
            pt: `builder.xahau.network (apenas Testnet)

Tres pestanas:
• Develop: escrever e compilar Hooks em C
• Deploy: gerenciar contas e fazer deploy
• Test: testar com transações reais

Guarde suas seeds antes de fechar o navegador`,
            en: "builder.xahau.network (Testnet only)\n\nThree tabs:\n• Develop: write and compile Hooks in C\n• Deploy: manage accounts and deploy\n• Test: test with real transactions\n\nSave your seeds before closing the browser",
            jp: "builder.xahau.network（Testnetのみ）\n\n3つのタブ：\n• Develop：C言語でHooksを記述およびコンパイル\n• Deploy：アカウントを管理してデプロイ\n• Test：実際のトランザクションでテスト\n\nブラウザを閉じる前にシードを保存する",
            ko: "builder.xahau.network (Testnet 전용)\n\n세 가지 탭:\n• Develop: C로 Hook 작성 및 컴파일\n• Deploy: 계정 관리와 배포\n• Test: 실제 트랜잭션으로 테스트\n\n브라우저를 닫기 전에 seed를 저장",
            zh: "builder.xahau.network（仅限 Testnet）\n\n三个标签页：\n• Develop：用 C 编写并编译 Hook\n• Deploy：管理账户并部署\n• Test：用真实交易测试\n\n关闭浏览器前记得保存 seed",
          },
          visual: "🌐",
        },
        {
          title: { es: "Deploy: cuentas e instalacion", pt: "Deploy: contas e instalação", en: "Deploy: accounts and installation", jp: "Deploy：アカウントとインストール", ko: "Deploy: 계정과 설치", zh: "Deploy：账户与安装" },
          content: {
            es: "Cuentas:\n• Generate Account → nueva con faucet\n• Import Account → seed existente de testnet\n• Minimo 2 cuentas (Hook + pruebas)\n\nInstalacion:\n• Seleccionar cuenta + Set Hook\n• Configurar HookOn, Namespace, Parameters\n• Fee → Suggest si hay error de fee",
            pt: `Contas:
• Generate Account → nova com faucet
• Import Account → seed existente de testnet
• Mínimo 2 contas (Hook + testes)

Instalacion:
• Selecionar conta + Set Hook
• Configurar HookOn, Namespace, Parameters
• Fee → Suggest se houver erro de fee`,
            en: "Accounts:\n• Generate Account → new with faucet\n• Import Account → existing testnet seed\n• Minimum 2 accounts (Hook + testing)\n\nInstallation:\n• Select account + Set Hook\n• Configure HookOn, Namespace, Parameters\n• Fee → Suggest if fee error",
            jp: "アカウント：\n• Generate Account → フォーセットで新規作成\n• Import Account → 既存のTestnetシード\n• 最低2つのアカウント（Hook + テスト用）\n\nインストール：\n• アカウントを選択 + Set Hook\n• HookOn、Namespace、Parametersを設定\n• Fee → 手数料エラーの場合はSuggest",
            ko: "계정:\n• Generate Account → faucet으로 새 계정 생성\n• Import Account → 기존 testnet seed 가져오기\n• 최소 2개 계정 필요(Hook + 테스트)\n\n설치:\n• 계정 선택 후 Set Hook\n• HookOn, Namespace, Parameters 설정\n• 수수료 오류 시 Suggest 사용",
            zh: "账户：\n• Generate Account → 通过 faucet 创建新账户\n• Import Account → 导入已有 testnet seed\n• 至少需要 2 个账户（Hook + 测试）\n\n安装：\n• 选择账户后点击 Set Hook\n• 配置 HookOn、Namespace、Parameters\n• 如遇费用错误可使用 Suggest",
          },
          visual: "🚀",
        },
        {
          title: { es: "Test: verificar tu Hook", pt: "Test: verificar seu Hook", en: "Test: verify your Hook", jp: "Test：HookをVerify", ko: "Test: Hook 검증", zh: "Test：验证你的 Hook" },
          content: {
            es: "• Elegir tipo de tx, cuenta origen, destino\n• Configurar Amount, Flags, Memos\n• Run Test → revisar Development Log\n• Debug Stream: elegir cuenta a monitorear\n\nPruebas recomendadas:\n  Positivos | Negativos | Limites | No esperados",
            pt: `• Escolher tipo de tx, conta de origem, destino
• Configurar Amount, Flags, Memos
• Run Test → revisar Development Log
• Debug Stream: escolher a conta a monitorar

Testes recomendados:
  Positivos | Negativos | Limites | Não esperados`,
            en: "• Choose tx type, sender account, destination\n• Configure Amount, Flags, Memos\n• Run Test → check Development Log\n• Debug Stream: choose account to monitor\n\nRecommended tests:\n  Positive | Negative | Edge cases | Unexpected",
            jp: "• txタイプ、送信者アカウント、宛先を選択\n• Amount、Flags、Memosを設定\n• Run Test → Development Logを確認\n• Debug Stream：監視するアカウントを選択\n\n推奨テスト：\n  正常 | 異常 | 境界 | 予期しない",
            ko: "• tx 타입, 발신 계정, 목적지 선택\n• Amount, Flags, Memos 설정\n• Run Test → Development Log 확인\n• Debug Stream에서 모니터링할 계정 선택\n\n권장 테스트:\n  정상 | 실패 | 경계값 | 예외 케이스",
            zh: "• 选择 tx 类型、发送账户和目标地址\n• 配置 Amount、Flags、Memos\n• Run Test → 查看 Development Log\n• 在 Debug Stream 中选择要监控的账户\n\n推荐测试：\n  正常 | 失败 | 边界值 | 异常情况",
          },
          visual: "🧪",
        },
      ],
    },
    {
      id: "m8l8",
      title: {
        es: "Desarrollo local de Hooks con hooks-cli",
        pt: "Desenvolvimento local de Hooks com hooks-cli",
        en: "Local Hook development with hooks-cli",
        jp: "hooks-cliによるHooksのローカル開発",
        ko: "hooks-cli를 사용한 로컬 Hook 개발",
        zh: "使用 hooks-cli 进行本地 Hook 开发",
      },
      theory: {
        es: `[Hooks Builder](?m=9&l=6) funciona en el navegador y es la forma más rápida de probar un Hook. Para un Hook que guardas en control de versiones, revisas y despliegas en **Xahau Mainnet**, lo que quieres es un proyecto local. [hooks-cli](https://github.com/Xahau/hooks-cli) es la herramienta oficial de línea de comandos para eso.

### Hooks Builder o hooks-cli

| | Hooks Builder | hooks-cli |
|---|---|---|
| Dónde vive el código | En el navegador | Archivos en tu proyecto, bajo control de versiones |
| Compilación | Integrada | \`hooks-cli compile-c\`, que envía los archivos C a un servicio de compilación y devuelve el \`.wasm\` |
| Cabeceras | Su propio conjunto | Las escribe \`hooks-cli init\` en \`contracts/include\` |
| Despliegue | Integrado (testnet) | Tu propia transacción \`SetHook\`, como en la [lección 9.2](?m=9&l=1) |
| Ideal para | Aprender y pruebas rápidas | Proyectos reales y mainnet |

Como la compilación ocurre en el servicio, no instalas clang ni ninguna herramienta de WebAssembly, pero \`compile-c\` necesita conexión a internet.

### 1. Instalar hooks-cli

\`\`\`bash
npm install -g @xahau/hooks-cli
\`\`\`

El paquete es **\`@xahau/hooks-cli\`**. En npm existe también un paquete sin relación llamado \`hooks-cli\` (sin el scope), así que instala siempre el nombre con scope. Después, el comando \`hooks-cli\` queda disponible en tu terminal.

### 2. Crear el proyecto

\`\`\`bash
hooks-cli init c my-hook-project
cd my-hook-project
npm install
\`\`\`

\`init c\` crea un proyecto para Hooks escritos en C e imprime:

\`\`\`
Created CHooks project in …/my-hook-project
Header files saved to contracts/include.
Secrets saved to .env file.
\`\`\`

- **\`Header files saved to contracts/include\`**: las cabeceras de la Hooks API (\`hookapi.h\` y los archivos que incluye). Tus archivos C las incluyen y el compilador las lee de aquí.
- **\`Secrets saved to .env file\`**: la dirección del servicio de compilación, la red y un seed de prueba para el script de despliegue en TypeScript. Es un seed de testnet; nunca pongas un seed de mainnet en este archivo.

El proyecto queda así:

\`\`\`
my-hook-project/
├── contracts/
│   ├── base.c           ← tu Hook, en C
│   └── include/         ← hookapi.h, extern.h, macro.h, sfcodes.h…
├── src/index.ts         ← script de despliegue opcional en TypeScript
├── .env                 ← servicio de compilación, red y un seed de prueba
├── package.json
└── tsconfig.json
\`\`\`

\`npm install\` instala lo que necesita el script opcional de despliegue en TypeScript. La compilación no depende de él.

### 3. Compilar

\`\`\`bash
npm run build
# equivale a: hooks-cli compile-c contracts build/ --headers contracts/include
\`\`\`

Cada archivo \`.c\` de \`contracts/\` se convierte en un \`.wasm\` en \`build/\`: \`contracts/base.c\` da \`build/base.wasm\`. Ese binario es lo que instala una transacción \`SetHook\`. Un error de compilación se imprime con su archivo y línea, y no se escribe \`.wasm\` para ese archivo.

### 4. Desplegar

Despliega el \`.wasm\` con la librería \`xahau\`, igual que en la [lección 9.2](?m=9&l=1). Su transacción \`SetHook\` lee el archivo y fija estos campos:

\`\`\`javascript
const setHook = {
  TransactionType: "SetHook",
  Account: wallet.address,
  Hooks: [
    {
      Hook: {
        CreateCode: fs.readFileSync("build/base.wasm").toString("hex").toUpperCase(),
        HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
        HookCanEmit: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFBFFFFF",
        HookNamespace: crypto.createHash("sha256").update("base").digest("hex").toUpperCase(),
        HookApiVersion: 0,
        Flags: 1,
      },
    },
  ],
};
\`\`\`

| Campo | Valor aquí | Qué hace |
|---|---|---|
| \`CreateCode\` | el \`.wasm\` en hex | El código del Hook. Instalar el mismo código otra vez reutiliza la copia guardada |
| \`HookOn\` | se activa solo con **Cron** | Qué tipos de transacción ejecutan el Hook. Calcúlalo con la [calculadora de HookOn](https://richardah.github.io/xrpl-hookon-calculator/): cada bit es un tipo de transacción |
| \`HookCanEmit\` | solo **ClaimReward** | Qué tipos de transacción puede emitir el Hook. Todo lo demás se rechaza, así que un error no puede hacerle emitir un Payment |
| \`HookNamespace\` | SHA-256 de \`"base"\` | Dónde guarda el Hook su estado. Los Hooks que comparten namespace comparten estado |
| \`HookApiVersion\` | \`0\` | La versión de la Hooks API para la que está escrito el código |
| \`Flags\` | \`1\` (hsfOverride) | Reemplaza el Hook que ya haya en esa posición |

Los dos mapas de bits tienen 64 caracteres hex (256 bits). Un valor con un carácter de más o de menos está mal formado y el \`SetHook\` falla.

### Casos a vigilar al compilar en local

- **Las funciones auxiliares desaparecen.** Tras compilar, \`hook-cleaner\` conserva solo \`hook()\` y \`cbak()\` y elimina del \`.wasm\` cualquier otra función. Las llamadas a una función auxiliar apuntan entonces a nada y el \`SetHook\` falla con \`temMALFORMED\`. Marca cada función auxiliar para que el compilador la copie dentro de quien la llama:

\`\`\`c
static inline __attribute__((always_inline)) int is_payment(void) { ... }
\`\`\`

- **\`otxn_param\` puede no estar declarada.** Las copias antiguas de las cabeceras de Hooks no la declaran, y un Hook que lee parámetros de la transacción falla entonces con "call to undeclared function 'otxn_param'". Las cabeceras que escribe \`hooks-cli init\` (versión 2.1.0) sí la declaran. Declararla tú después del include, como hace el Hook de parámetros de la [lección 9.5](?m=9&l=4), funciona con cualquiera de las dos, porque una declaración duplicada idéntica es C válido:

\`\`\`c
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);
\`\`\`

- **\`PREPARE_PAYMENT_SIMPLE\` puede faltar.** Los ejemplos antiguos construyen los pagos emitidos con esta macro, que las cabeceras de \`hooks-cli init\` (versión 2.1.0) no definen: compilarlos falla con "use of undeclared identifier 'PREPARE_PAYMENT_SIMPLE_SIZE'". Construye la transacción a mano, como el reenviador de la [lección 9.4](?m=9&l=3); compila con cualquier conjunto de cabeceras.
- **El script \`deploy\` de la plantilla llama a \`yarn\`.** \`npm run build\` funciona solo con npm; \`npm run deploy\` necesita yarn instalado, o ejecuta \`npm run build\` y después \`npx ts-node src/index.ts\`.

### Referencia y documentación

- **hooks-cli**: [github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli), el repositorio oficial con instrucciones de instalación y uso.
- **Hooks Toolkit**: [hooks-toolkit.com](https://hooks-toolkit.com/), guías, la referencia de la Hooks API (\`hookapi.h\`), ejemplos y herramientas para desarrollar Hooks.`,
        pt: `O [Hooks Builder](?m=9&l=6) funciona no navegador e é a forma mais rápida de testar um Hook. Para um Hook que você mantém sob controle de versão, revisa e implanta na **Xahau Mainnet**, o que você quer é um projeto local. O [hooks-cli](https://github.com/Xahau/hooks-cli) é a ferramenta oficial de linha de comando para isso.

### Hooks Builder ou hooks-cli

| | Hooks Builder | hooks-cli |
|---|---|---|
| Onde fica o código | No navegador | Arquivos no seu projeto, sob controle de versão |
| Compilação | Integrada | \`hooks-cli compile-c\`, que envia os arquivos C a um serviço de compilação e devolve o \`.wasm\` |
| Cabeçalhos | Conjunto próprio | Escritos por \`hooks-cli init\` em \`contracts/include\` |
| Implantação | Integrada (testnet) | Sua própria transação \`SetHook\`, como na [lição 9.2](?m=9&l=1) |
| Ideal para | Aprender e testes rápidos | Projetos reais e mainnet |

Como a compilação acontece no serviço, você não instala clang nem nenhuma ferramenta de WebAssembly, mas \`compile-c\` precisa de conexão com a internet.

### 1. Instalar o hooks-cli

\`\`\`bash
npm install -g @xahau/hooks-cli
\`\`\`

O pacote é **\`@xahau/hooks-cli\`**. Também existe no npm um pacote sem relação chamado \`hooks-cli\` (sem o escopo), então instale sempre o nome com escopo. Depois disso, o comando \`hooks-cli\` fica disponível no seu terminal.

### 2. Criar o projeto

\`\`\`bash
hooks-cli init c my-hook-project
cd my-hook-project
npm install
\`\`\`

\`init c\` cria um projeto para Hooks escritos em C e imprime:

\`\`\`
Created CHooks project in …/my-hook-project
Header files saved to contracts/include.
Secrets saved to .env file.
\`\`\`

- **\`Header files saved to contracts/include\`**: os cabeçalhos da Hooks API (\`hookapi.h\` e os arquivos que ele inclui). Seus arquivos C os incluem, e o compilador os lê daqui.
- **\`Secrets saved to .env file\`**: o endereço do serviço de compilação, a rede e uma seed de teste para o script de implantação em TypeScript. É uma seed de testnet; nunca coloque uma seed de mainnet neste arquivo.

O projeto fica assim:

\`\`\`
my-hook-project/
├── contracts/
│   ├── base.c           ← seu Hook, em C
│   └── include/         ← hookapi.h, extern.h, macro.h, sfcodes.h…
├── src/index.ts         ← script opcional de implantação em TypeScript
├── .env                 ← serviço de compilação, rede e uma seed de teste
├── package.json
└── tsconfig.json
\`\`\`

\`npm install\` instala o que o script opcional de implantação em TypeScript precisa. A compilação não depende dele.

### 3. Compilar

\`\`\`bash
npm run build
# equivale a: hooks-cli compile-c contracts build/ --headers contracts/include
\`\`\`

Cada arquivo \`.c\` em \`contracts/\` vira um \`.wasm\` em \`build/\`: \`contracts/base.c\` gera \`build/base.wasm\`. Esse binário é o que uma transação \`SetHook\` instala. Um erro de compilação é impresso com arquivo e linha, e nenhum \`.wasm\` é escrito para esse arquivo.

### 4. Implantar

Implante o \`.wasm\` com a biblioteca \`xahau\`, exatamente como na [lição 9.2](?m=9&l=1). Sua transação \`SetHook\` lê o arquivo e define estes campos:

\`\`\`javascript
const setHook = {
  TransactionType: "SetHook",
  Account: wallet.address,
  Hooks: [
    {
      Hook: {
        CreateCode: fs.readFileSync("build/base.wasm").toString("hex").toUpperCase(),
        HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
        HookCanEmit: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFBFFFFF",
        HookNamespace: crypto.createHash("sha256").update("base").digest("hex").toUpperCase(),
        HookApiVersion: 0,
        Flags: 1,
      },
    },
  ],
};
\`\`\`

| Campo | Valor aqui | O que faz |
|---|---|---|
| \`CreateCode\` | o \`.wasm\` em hex | O código do Hook. Instalar o mesmo código de novo reaproveita a cópia armazenada |
| \`HookOn\` | dispara só com **Cron** | Quais tipos de transação executam o Hook. Calcule com a [calculadora de HookOn](https://richardah.github.io/xrpl-hookon-calculator/): cada bit é um tipo de transação |
| \`HookCanEmit\` | só **ClaimReward** | Quais tipos de transação o Hook pode emitir. O resto é recusado, então um bug não consegue fazê-lo emitir um Payment |
| \`HookNamespace\` | SHA-256 de \`"base"\` | Onde o Hook guarda seu estado. Hooks que compartilham o namespace compartilham o estado |
| \`HookApiVersion\` | \`0\` | A versão da Hooks API para a qual o código foi escrito |
| \`Flags\` | \`1\` (hsfOverride) | Substitui o Hook que já estiver nessa posição |

Os dois bitmaps têm 64 caracteres hex (256 bits). Um valor com um caractere a mais ou a menos é malformado, e o \`SetHook\` falha.

### Casos para observar ao compilar localmente

- **As funções auxiliares desaparecem.** Depois de compilar, o \`hook-cleaner\` mantém só \`hook()\` e \`cbak()\` e remove do \`.wasm\` qualquer outra função. As chamadas a uma função auxiliar passam a apontar para nada e o \`SetHook\` falha com \`temMALFORMED\`. Marque cada função auxiliar para que o compilador a copie dentro de quem a chama:

\`\`\`c
static inline __attribute__((always_inline)) int is_payment(void) { ... }
\`\`\`

- **\`otxn_param\` pode não estar declarada.** Cópias antigas dos cabeçalhos de Hooks não a declaram, e um Hook que lê parâmetros da transação falha com "call to undeclared function 'otxn_param'". Os cabeçalhos que \`hooks-cli init\` escreve (versão 2.1.0) a declaram. Declará-la você mesmo depois do include, como faz o Hook de parâmetros da [lição 9.5](?m=9&l=4), funciona com qualquer um dos dois, porque uma declaração duplicada idêntica é C válido:

\`\`\`c
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);
\`\`\`

- **\`PREPARE_PAYMENT_SIMPLE\` pode faltar.** Exemplos antigos montam pagamentos emitidos com essa macro, que os cabeçalhos de \`hooks-cli init\` (versão 2.1.0) não definem: compilá-los falha com "use of undeclared identifier 'PREPARE_PAYMENT_SIMPLE_SIZE'". Monte a transação à mão, como o encaminhador da [lição 9.4](?m=9&l=3); ele compila com qualquer conjunto de cabeçalhos.
- **O script \`deploy\` do modelo chama \`yarn\`.** \`npm run build\` funciona só com npm; \`npm run deploy\` precisa do yarn instalado, ou execute \`npm run build\` e depois \`npx ts-node src/index.ts\`.

### Referência e documentação

- **hooks-cli**: [github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli), o repositório oficial com instruções de instalação e uso.
- **Hooks Toolkit**: [hooks-toolkit.com](https://hooks-toolkit.com/), guias, a referência da Hooks API (\`hookapi.h\`), exemplos e ferramentas para desenvolver Hooks.`,
        en: `[Hooks Builder](?m=9&l=6) runs in the browser and is the fastest way to try a Hook. For a Hook you keep in version control, review, and deploy to **Xahau Mainnet**, you want it in a local project instead. [hooks-cli](https://github.com/Xahau/hooks-cli) is the official command-line tool for that.

### Hooks Builder or hooks-cli

| | Hooks Builder | hooks-cli |
|---|---|---|
| Where the code lives | In the browser | Files in your project, under version control |
| Compiling | Built in | \`hooks-cli compile-c\`, which sends the C files to a compile service and writes back the \`.wasm\` |
| Headers | Its own set | Written into \`contracts/include\` by \`hooks-cli init\` |
| Deploying | Built in (testnet) | Your own \`SetHook\` transaction, as in [lesson 9.2](?m=9&l=1) |
| Best for | Learning and quick tests | Real projects and mainnet |

Because compiling happens on the service, you don't install clang or any WebAssembly toolchain, but \`compile-c\` needs an internet connection.

### 1. Install hooks-cli

\`\`\`bash
npm install -g @xahau/hooks-cli
\`\`\`

The package is **\`@xahau/hooks-cli\`**. An unrelated package called \`hooks-cli\` (without the scope) also exists on npm, so always install the scoped name. Afterwards the \`hooks-cli\` command is available in your terminal.

### 2. Create the project

\`\`\`bash
hooks-cli init c my-hook-project
cd my-hook-project
npm install
\`\`\`

\`init c\` creates a project for Hooks written in C and prints:

\`\`\`
Created CHooks project in …/my-hook-project
Header files saved to contracts/include.
Secrets saved to .env file.
\`\`\`

- **\`Header files saved to contracts/include\`**: the Hooks API headers (\`hookapi.h\` and the files it includes). Your C files include them, and the compiler reads them from here.
- **\`Secrets saved to .env file\`**: the address of the compile service, the network, and a test seed for the TypeScript deploy script. It is a testnet seed; never put a mainnet seed in this file.

The project looks like this:

\`\`\`
my-hook-project/
├── contracts/
│   ├── base.c           ← your Hook, in C
│   └── include/         ← hookapi.h, extern.h, macro.h, sfcodes.h…
├── src/index.ts         ← optional TypeScript deploy script
├── .env                 ← compile service, network and a test seed
├── package.json
└── tsconfig.json
\`\`\`

\`npm install\` installs what the optional TypeScript deploy script needs. Compiling doesn't depend on it.

### 3. Compile

\`\`\`bash
npm run build
# same as: hooks-cli compile-c contracts build/ --headers contracts/include
\`\`\`

Every \`.c\` file in \`contracts/\` becomes a \`.wasm\` file in \`build/\`: \`contracts/base.c\` gives \`build/base.wasm\`. That binary is what a \`SetHook\` transaction installs. A compile error is printed with its file and line, and no \`.wasm\` is written for that file.

### 4. Deploy

Deploy the \`.wasm\` with the \`xahau\` library, exactly as [lesson 9.2](?m=9&l=1) does. Its \`SetHook\` transaction reads the file and sets these fields:

\`\`\`javascript
const setHook = {
  TransactionType: "SetHook",
  Account: wallet.address,
  Hooks: [
    {
      Hook: {
        CreateCode: fs.readFileSync("build/base.wasm").toString("hex").toUpperCase(),
        HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
        HookCanEmit: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFBFFFFF",
        HookNamespace: crypto.createHash("sha256").update("base").digest("hex").toUpperCase(),
        HookApiVersion: 0,
        Flags: 1,
      },
    },
  ],
};
\`\`\`

| Field | Value here | What it does |
|---|---|---|
| \`CreateCode\` | the \`.wasm\` in hex | The Hook's code. Installing the same code again reuses the stored copy |
| \`HookOn\` | fires on **Cron** only | Which transaction types run the Hook. Build it with the [HookOn calculator](https://richardah.github.io/xrpl-hookon-calculator/): each bit is a transaction type |
| \`HookCanEmit\` | **ClaimReward** only | Which transaction types the Hook may emit. Anything else is refused, so a bug can't make it emit a Payment |
| \`HookNamespace\` | SHA-256 of \`"base"\` | Where the Hook keeps its state. Hooks sharing a namespace share state |
| \`HookApiVersion\` | \`0\` | The Hooks API the code is written for |
| \`Flags\` | \`1\` (hsfOverride) | Replace whatever Hook is already in this position |

Both bitmaps are 64 hex characters (256 bits). A value one character too long or too short is malformed and the \`SetHook\` fails.

### Cases to watch when compiling locally

- **Helper functions disappear.** After compiling, \`hook-cleaner\` keeps only \`hook()\` and \`cbak()\` and strips every other function from the \`.wasm\`. Calls to a helper then point at nothing, and the \`SetHook\` fails with \`temMALFORMED\`. Mark every helper so the compiler copies it into its callers:

\`\`\`c
static inline __attribute__((always_inline)) int is_payment(void) { ... }
\`\`\`

- **\`otxn_param\` may be undeclared.** Older copies of the Hooks headers don't declare it, and a Hook that reads transaction parameters then fails with "call to undeclared function 'otxn_param'". The headers \`hooks-cli init\` writes (version 2.1.0) do declare it. Declaring it yourself after the include, as the parameters Hook in [lesson 9.5](?m=9&l=4) does, works with either set, because a matching duplicate declaration is valid C:

\`\`\`c
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);
\`\`\`

- **\`PREPARE_PAYMENT_SIMPLE\` may be missing.** Older examples build emitted payments with this macro, which the headers \`hooks-cli init\` writes (version 2.1.0) don't define: compiling them fails with "use of undeclared identifier 'PREPARE_PAYMENT_SIMPLE_SIZE'". Build the transaction by hand, as the forwarder in [lesson 9.4](?m=9&l=3) does; it compiles with any header set.
- **The template's \`deploy\` script calls \`yarn\`.** \`npm run build\` works with npm alone; \`npm run deploy\` needs yarn installed, or run \`npm run build\` and then \`npx ts-node src/index.ts\`.

### Reference and documentation

- **hooks-cli**: [github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli), the official repository with installation and usage instructions.
- **Hooks Toolkit**: [hooks-toolkit.com](https://hooks-toolkit.com/), guides, the Hooks API reference (\`hookapi.h\`), examples and tools for Hook development.`,
        jp: `[Hooks Builder](?m=9&l=6) はブラウザで動き、Hook を試すには最速の方法です。バージョン管理し、レビューし、**Xahau Mainnet** にデプロイする Hook なら、ローカルのプロジェクトで扱うべきです。そのための公式コマンドラインツールが [hooks-cli](https://github.com/Xahau/hooks-cli) です。

### Hooks Builder と hooks-cli

| | Hooks Builder | hooks-cli |
|---|---|---|
| コードの置き場所 | ブラウザ内 | プロジェクト内のファイル（バージョン管理下） |
| コンパイル | 内蔵 | \`hooks-cli compile-c\`。C ファイルをコンパイルサービスに送り、\`.wasm\` を受け取る |
| ヘッダー | 独自のセット | \`hooks-cli init\` が \`contracts/include\` に書き出す |
| デプロイ | 内蔵（テストネット） | [レッスン9.2](?m=9&l=1) のように自分で \`SetHook\` を送る |
| 向いている用途 | 学習と手早いテスト | 実際のプロジェクトとメインネット |

コンパイルはサービス側で行うため、clang や WebAssembly のツールをインストールする必要はありませんが、\`compile-c\` にはインターネット接続が必要です。

### 1. hooks-cli をインストールする

\`\`\`bash
npm install -g @xahau/hooks-cli
\`\`\`

パッケージ名は **\`@xahau/hooks-cli\`** です。npm にはスコープなしの \`hooks-cli\` という無関係なパッケージも存在するため、必ずスコープ付きの名前でインストールしてください。インストール後、ターミナルで \`hooks-cli\` コマンドが使えます。

### 2. プロジェクトを作成する

\`\`\`bash
hooks-cli init c my-hook-project
cd my-hook-project
npm install
\`\`\`

\`init c\` は C で書く Hook 用のプロジェクトを作成し、次のように表示します。

\`\`\`
Created CHooks project in …/my-hook-project
Header files saved to contracts/include.
Secrets saved to .env file.
\`\`\`

- **\`Header files saved to contracts/include\`**: Hooks API のヘッダー（\`hookapi.h\` とそれがインクルードするファイル）。C ファイルがこれをインクルードし、コンパイラはここから読み込みます。
- **\`Secrets saved to .env file\`**: コンパイルサービスのアドレス、ネットワーク、TypeScript のデプロイスクリプト用のテスト seed。テストネットの seed です。このファイルにメインネットの seed を入れないでください。

プロジェクトの構成:

\`\`\`
my-hook-project/
├── contracts/
│   ├── base.c           ← C で書いた Hook
│   └── include/         ← hookapi.h、extern.h、macro.h、sfcodes.h…
├── src/index.ts         ← 任意の TypeScript デプロイスクリプト
├── .env                 ← コンパイルサービス、ネットワーク、テスト seed
├── package.json
└── tsconfig.json
\`\`\`

\`npm install\` は任意の TypeScript デプロイスクリプトが必要とするものをインストールします。コンパイルはこれに依存しません。

### 3. コンパイルする

\`\`\`bash
npm run build
# 次と同じ: hooks-cli compile-c contracts build/ --headers contracts/include
\`\`\`

\`contracts/\` の各 \`.c\` ファイルが \`build/\` の \`.wasm\` になります。\`contracts/base.c\` からは \`build/base.wasm\` ができます。このバイナリを \`SetHook\` トランザクションがインストールします。コンパイルエラーはファイル名と行番号付きで表示され、そのファイルの \`.wasm\` は書き出されません。

### 4. デプロイする

[レッスン9.2](?m=9&l=1) と同じく、\`xahau\` ライブラリで \`.wasm\` をデプロイします。その \`SetHook\` トランザクションはファイルを読み込み、次のフィールドを設定します。

\`\`\`javascript
const setHook = {
  TransactionType: "SetHook",
  Account: wallet.address,
  Hooks: [
    {
      Hook: {
        CreateCode: fs.readFileSync("build/base.wasm").toString("hex").toUpperCase(),
        HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
        HookCanEmit: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFBFFFFF",
        HookNamespace: crypto.createHash("sha256").update("base").digest("hex").toUpperCase(),
        HookApiVersion: 0,
        Flags: 1,
      },
    },
  ],
};
\`\`\`

| フィールド | この例の値 | 役割 |
|---|---|---|
| \`CreateCode\` | \`.wasm\` の hex | Hook のコード。同じコードを再度インストールすると保存済みのコピーを再利用する |
| \`HookOn\` | **Cron** でのみ起動 | Hook を実行するトランザクションの種類。[HookOn 計算機](https://richardah.github.io/xrpl-hookon-calculator/)で作る。各ビットが1つのトランザクションの種類 |
| \`HookCanEmit\` | **ClaimReward** のみ | Hook が Emit できるトランザクションの種類。それ以外は拒否されるので、バグがあっても Payment を Emit することはない |
| \`HookNamespace\` | \`"base"\` の SHA-256 | Hook が状態を保存する場所。namespace を共有する Hook は状態も共有する |
| \`HookApiVersion\` | \`0\` | コードが対象とする Hooks API のバージョン |
| \`Flags\` | \`1\`（hsfOverride） | その位置にある Hook を置き換える |

どちらのビットマップも hex 64 文字（256 ビット）です。1文字でも多すぎたり少なすぎたりすると不正な値になり、\`SetHook\` は失敗します。

### ローカルでコンパイルするときの注意点

- **ヘルパー関数が消える。** コンパイル後、\`hook-cleaner\` は \`hook()\` と \`cbak()\` だけを残し、それ以外の関数を \`.wasm\` から削除します。ヘルパーへの呼び出しは何も指さなくなり、\`SetHook\` は \`temMALFORMED\` で失敗します。コンパイラが呼び出し元に展開するよう、すべてのヘルパーに次の指定を付けてください。

\`\`\`c
static inline __attribute__((always_inline)) int is_payment(void) { ... }
\`\`\`

- **\`otxn_param\` が宣言されていないことがある。** 古い Hooks ヘッダーはこれを宣言しておらず、トランザクションのパラメータを読む Hook は「call to undeclared function 'otxn_param'」で失敗します。\`hooks-cli init\` が書き出すヘッダー（バージョン 2.1.0）は宣言しています。[レッスン9.5](?m=9&l=4)のパラメータ Hook のように include の後で自分で宣言すれば、同一の重複宣言は正しい C なので、どちらのヘッダーでも動きます。

\`\`\`c
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);
\`\`\`

- **\`PREPARE_PAYMENT_SIMPLE\` がないことがある。** 古い例ではこのマクロで Emit する支払いを組み立てますが、\`hooks-cli init\` のヘッダー（バージョン 2.1.0）には定義がなく、コンパイルすると「use of undeclared identifier 'PREPARE_PAYMENT_SIMPLE_SIZE'」で失敗します。[レッスン9.4](?m=9&l=3) の転送 Hook のように、トランザクションを手作業で組み立ててください。どのヘッダーでもコンパイルできます。
- **テンプレートの \`deploy\` スクリプトは \`yarn\` を呼ぶ。** \`npm run build\` は npm だけで動きます。\`npm run deploy\` には yarn が必要です。代わりに \`npm run build\` の後で \`npx ts-node src/index.ts\` を実行してください。

### リファレンスとドキュメント

- **hooks-cli**: [github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli)。インストールと使い方を説明した公式リポジトリ。
- **Hooks Toolkit**: [hooks-toolkit.com](https://hooks-toolkit.com/)。ガイド、Hooks API リファレンス（\`hookapi.h\`）、例、Hook 開発用のツール。`,
        ko: `[Hooks Builder](?m=9&l=6)는 브라우저에서 동작하며 Hook을 시험해 보는 가장 빠른 방법입니다. 버전 관리하고, 리뷰하고, **Xahau Mainnet**에 배포할 Hook이라면 로컬 프로젝트에서 다뤄야 합니다. 이를 위한 공식 명령줄 도구가 [hooks-cli](https://github.com/Xahau/hooks-cli)입니다.

### Hooks Builder와 hooks-cli

| | Hooks Builder | hooks-cli |
|---|---|---|
| 코드 위치 | 브라우저 안 | 프로젝트의 파일(버전 관리 대상) |
| 컴파일 | 내장 | \`hooks-cli compile-c\`: C 파일을 컴파일 서비스로 보내고 \`.wasm\`을 받아 옴 |
| 헤더 | 자체 세트 | \`hooks-cli init\`이 \`contracts/include\`에 씀 |
| 배포 | 내장(테스트넷) | [레슨 9.2](?m=9&l=1)처럼 직접 보내는 \`SetHook\` 트랜잭션 |
| 적합한 용도 | 학습과 빠른 테스트 | 실제 프로젝트와 메인넷 |

컴파일은 서비스에서 이루어지므로 clang이나 WebAssembly 도구를 설치할 필요가 없지만, \`compile-c\`는 인터넷 연결이 필요합니다.

### 1. hooks-cli 설치

\`\`\`bash
npm install -g @xahau/hooks-cli
\`\`\`

패키지 이름은 **\`@xahau/hooks-cli\`**입니다. npm에는 스코프 없는 \`hooks-cli\`라는 무관한 패키지도 있으므로 항상 스코프가 붙은 이름으로 설치하세요. 설치 후 터미널에서 \`hooks-cli\` 명령을 쓸 수 있습니다.

### 2. 프로젝트 만들기

\`\`\`bash
hooks-cli init c my-hook-project
cd my-hook-project
npm install
\`\`\`

\`init c\`는 C로 작성하는 Hook용 프로젝트를 만들고 다음을 출력합니다.

\`\`\`
Created CHooks project in …/my-hook-project
Header files saved to contracts/include.
Secrets saved to .env file.
\`\`\`

- **\`Header files saved to contracts/include\`**: Hooks API 헤더(\`hookapi.h\`와 그것이 포함하는 파일)입니다. C 파일이 이를 포함하고, 컴파일러는 여기서 읽습니다.
- **\`Secrets saved to .env file\`**: 컴파일 서비스 주소, 네트워크, TypeScript 배포 스크립트용 테스트 seed입니다. 테스트넷 seed이므로 이 파일에 메인넷 seed를 넣지 마세요.

프로젝트 구조:

\`\`\`
my-hook-project/
├── contracts/
│   ├── base.c           ← C로 작성한 Hook
│   └── include/         ← hookapi.h, extern.h, macro.h, sfcodes.h…
├── src/index.ts         ← 선택 사항인 TypeScript 배포 스크립트
├── .env                 ← 컴파일 서비스, 네트워크, 테스트 seed
├── package.json
└── tsconfig.json
\`\`\`

\`npm install\`은 선택 사항인 TypeScript 배포 스크립트에 필요한 것을 설치합니다. 컴파일은 이에 의존하지 않습니다.

### 3. 컴파일

\`\`\`bash
npm run build
# 다음과 같음: hooks-cli compile-c contracts build/ --headers contracts/include
\`\`\`

\`contracts/\`의 각 \`.c\` 파일은 \`build/\`의 \`.wasm\`이 됩니다. \`contracts/base.c\`에서 \`build/base.wasm\`이 나옵니다. 이 바이너리를 \`SetHook\` 트랜잭션이 설치합니다. 컴파일 오류는 파일과 줄 번호와 함께 출력되고, 그 파일의 \`.wasm\`은 만들어지지 않습니다.

### 4. 배포

[레슨 9.2](?m=9&l=1)와 똑같이 \`xahau\` 라이브러리로 \`.wasm\`을 배포합니다. 그 \`SetHook\` 트랜잭션은 파일을 읽고 다음 필드를 설정합니다.

\`\`\`javascript
const setHook = {
  TransactionType: "SetHook",
  Account: wallet.address,
  Hooks: [
    {
      Hook: {
        CreateCode: fs.readFileSync("build/base.wasm").toString("hex").toUpperCase(),
        HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
        HookCanEmit: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFBFFFFF",
        HookNamespace: crypto.createHash("sha256").update("base").digest("hex").toUpperCase(),
        HookApiVersion: 0,
        Flags: 1,
      },
    },
  ],
};
\`\`\`

| 필드 | 여기서의 값 | 하는 일 |
|---|---|---|
| \`CreateCode\` | \`.wasm\`의 hex | Hook의 코드. 같은 코드를 다시 설치하면 저장된 사본을 재사용 |
| \`HookOn\` | **Cron**에서만 실행 | Hook을 실행하는 트랜잭션 종류. [HookOn 계산기](https://richardah.github.io/xrpl-hookon-calculator/)로 만들며, 각 비트가 트랜잭션 종류 하나 |
| \`HookCanEmit\` | **ClaimReward**만 | Hook이 발행할 수 있는 트랜잭션 종류. 나머지는 거부되므로 버그가 있어도 Payment를 발행할 수 없음 |
| \`HookNamespace\` | \`"base"\`의 SHA-256 | Hook이 상태를 저장하는 곳. namespace를 공유하는 Hook은 상태도 공유 |
| \`HookApiVersion\` | \`0\` | 코드가 대상으로 하는 Hooks API 버전 |
| \`Flags\` | \`1\` (hsfOverride) | 그 위치에 이미 있는 Hook을 교체 |

두 비트맵 모두 hex 64자(256비트)입니다. 한 글자라도 길거나 짧으면 잘못된 값이 되어 \`SetHook\`이 실패합니다.

### 로컬에서 컴파일할 때 주의할 경우

- **헬퍼 함수가 사라집니다.** 컴파일 후 \`hook-cleaner\`는 \`hook()\`과 \`cbak()\`만 남기고 다른 함수는 모두 \`.wasm\`에서 제거합니다. 그러면 헬퍼 호출이 아무것도 가리키지 않게 되고 \`SetHook\`이 \`temMALFORMED\`로 실패합니다. 컴파일러가 호출하는 곳에 복사해 넣도록 모든 헬퍼를 이렇게 표시하세요.

\`\`\`c
static inline __attribute__((always_inline)) int is_payment(void) { ... }
\`\`\`

- **\`otxn_param\`이 선언되지 않았을 수 있습니다.** 오래된 Hooks 헤더는 이를 선언하지 않아, 트랜잭션 파라미터를 읽는 Hook이 "call to undeclared function 'otxn_param'"으로 실패합니다. \`hooks-cli init\`이 만드는 헤더(버전 2.1.0)는 선언합니다. [레슨 9.5](?m=9&l=4)의 파라미터 Hook처럼 include 다음에 직접 선언하면, 동일한 중복 선언은 올바른 C이므로 어느 헤더에서도 동작합니다.

\`\`\`c
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);
\`\`\`

- **\`PREPARE_PAYMENT_SIMPLE\`이 없을 수 있습니다.** 예전 예제들은 이 매크로로 발행할 결제를 만드는데, \`hooks-cli init\`의 헤더(버전 2.1.0)에는 정의가 없어서 컴파일하면 "use of undeclared identifier 'PREPARE_PAYMENT_SIMPLE_SIZE'"로 실패합니다. [레슨 9.4](?m=9&l=3)의 전달 Hook처럼 트랜잭션을 직접 만드세요. 어떤 헤더로도 컴파일됩니다.
- **템플릿의 \`deploy\` 스크립트는 \`yarn\`을 호출합니다.** \`npm run build\`는 npm만으로 동작합니다. \`npm run deploy\`에는 yarn이 필요하니, 대신 \`npm run build\` 후 \`npx ts-node src/index.ts\`를 실행하세요.

### 참고 자료와 문서

- **hooks-cli**: [github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli), 설치와 사용법이 있는 공식 저장소.
- **Hooks Toolkit**: [hooks-toolkit.com](https://hooks-toolkit.com/), 가이드, Hooks API 레퍼런스(\`hookapi.h\`), 예제, Hook 개발 도구.`,
        zh: `[Hooks Builder](?m=9&l=6) 在浏览器中运行，是试用 Hook 最快的方式。对于要纳入版本控制、经过审查并部署到 **Xahau Mainnet** 的 Hook，你需要一个本地项目。[hooks-cli](https://github.com/Xahau/hooks-cli) 就是为此提供的官方命令行工具。

### Hooks Builder 还是 hooks-cli

| | Hooks Builder | hooks-cli |
|---|---|---|
| 代码在哪里 | 浏览器中 | 项目里的文件，纳入版本控制 |
| 编译 | 内置 | \`hooks-cli compile-c\`：把 C 文件发送到编译服务，取回 \`.wasm\` |
| 头文件 | 自带一套 | 由 \`hooks-cli init\` 写入 \`contracts/include\` |
| 部署 | 内置（测试网） | 你自己的 \`SetHook\` 交易，如[第 9.2 课](?m=9&l=1) |
| 适合 | 学习和快速测试 | 真实项目和主网 |

由于编译在服务端完成，你不需要安装 clang 或任何 WebAssembly 工具链，但 \`compile-c\` 需要联网。

### 1. 安装 hooks-cli

\`\`\`bash
npm install -g @xahau/hooks-cli
\`\`\`

包名是 **\`@xahau/hooks-cli\`**。npm 上还有一个名为 \`hooks-cli\`（不带作用域）的无关包，所以一定要安装带作用域的名称。安装后，终端里就可以使用 \`hooks-cli\` 命令。

### 2. 创建项目

\`\`\`bash
hooks-cli init c my-hook-project
cd my-hook-project
npm install
\`\`\`

\`init c\` 创建一个用 C 编写 Hook 的项目，并输出：

\`\`\`
Created CHooks project in …/my-hook-project
Header files saved to contracts/include.
Secrets saved to .env file.
\`\`\`

- **\`Header files saved to contracts/include\`**：Hooks API 头文件（\`hookapi.h\` 及其包含的文件）。你的 C 文件包含它们，编译器从这里读取。
- **\`Secrets saved to .env file\`**：编译服务地址、网络，以及供 TypeScript 部署脚本使用的测试 seed。这是测试网 seed；绝不要把主网 seed 放进这个文件。

项目结构如下：

\`\`\`
my-hook-project/
├── contracts/
│   ├── base.c           ← 用 C 编写的 Hook
│   └── include/         ← hookapi.h、extern.h、macro.h、sfcodes.h…
├── src/index.ts         ← 可选的 TypeScript 部署脚本
├── .env                 ← 编译服务、网络和测试 seed
├── package.json
└── tsconfig.json
\`\`\`

\`npm install\` 安装可选的 TypeScript 部署脚本所需的依赖。编译不依赖它。

### 3. 编译

\`\`\`bash
npm run build
# 等同于： hooks-cli compile-c contracts build/ --headers contracts/include
\`\`\`

\`contracts/\` 中的每个 \`.c\` 文件都会在 \`build/\` 中生成一个 \`.wasm\`：\`contracts/base.c\` 生成 \`build/base.wasm\`。\`SetHook\` 交易安装的就是这个二进制文件。编译错误会带着文件名和行号打印出来，该文件不会生成 \`.wasm\`。

### 4. 部署

与[第 9.2 课](?m=9&l=1)完全相同，用 \`xahau\` 库部署 \`.wasm\`。其 \`SetHook\` 交易读取文件并设置以下字段：

\`\`\`javascript
const setHook = {
  TransactionType: "SetHook",
  Account: wallet.address,
  Hooks: [
    {
      Hook: {
        CreateCode: fs.readFileSync("build/base.wasm").toString("hex").toUpperCase(),
        HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
        HookCanEmit: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFBFFFFF",
        HookNamespace: crypto.createHash("sha256").update("base").digest("hex").toUpperCase(),
        HookApiVersion: 0,
        Flags: 1,
      },
    },
  ],
};
\`\`\`

| 字段 | 此处的值 | 作用 |
|---|---|---|
| \`CreateCode\` | \`.wasm\` 的 hex | Hook 的代码。再次安装相同代码会复用已存储的副本 |
| \`HookOn\` | 仅在 **Cron** 时触发 | 哪些交易类型会运行 Hook。用 [HookOn 计算器](https://richardah.github.io/xrpl-hookon-calculator/)生成：每一位对应一种交易类型 |
| \`HookCanEmit\` | 仅 **ClaimReward** | Hook 可以发出哪些交易类型。其余一律拒绝，所以即使有 bug 也无法让它发出 Payment |
| \`HookNamespace\` | \`"base"\` 的 SHA-256 | Hook 保存状态的位置。共享 namespace 的 Hook 共享状态 |
| \`HookApiVersion\` | \`0\` | 代码所针对的 Hooks API 版本 |
| \`Flags\` | \`1\`（hsfOverride） | 替换该位置上已有的 Hook |

两个位图都是 64 个 hex 字符（256 位）。多一个或少一个字符的值都是格式错误的，\`SetHook\` 会失败。

### 本地编译时需要注意的情况

- **辅助函数会消失。** 编译后，\`hook-cleaner\` 只保留 \`hook()\` 和 \`cbak()\`，并从 \`.wasm\` 中删除其他所有函数。对辅助函数的调用于是指向空处，\`SetHook\` 会以 \`temMALFORMED\` 失败。给每个辅助函数加上如下标记，让编译器把它内联到调用处：

\`\`\`c
static inline __attribute__((always_inline)) int is_payment(void) { ... }
\`\`\`

- **\`otxn_param\` 可能未声明。** 旧版 Hooks 头文件没有声明它，读取交易参数的 Hook 就会失败：“call to undeclared function 'otxn_param'”。\`hooks-cli init\` 写出的头文件（2.1.0 版）已声明它。像[第 9.5 课](?m=9&l=4)的参数 Hook 那样在 include 之后自己声明，两套头文件都能用，因为签名相同的重复声明是合法的 C：

\`\`\`c
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);
\`\`\`

- **\`PREPARE_PAYMENT_SIMPLE\` 可能缺失。** 旧示例用这个宏构建要发出的付款，而 \`hooks-cli init\` 的头文件（2.1.0 版）没有定义它，编译会失败：“use of undeclared identifier 'PREPARE_PAYMENT_SIMPLE_SIZE'”。像[第 9.4 课](?m=9&l=3)的转发 Hook 那样手动构建交易，它在任何头文件下都能编译。
- **模板的 \`deploy\` 脚本调用 \`yarn\`。** \`npm run build\` 只用 npm 就能运行；\`npm run deploy\` 需要安装 yarn，或者先运行 \`npm run build\`，再运行 \`npx ts-node src/index.ts\`。

### 参考与文档

- **hooks-cli**：[github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli)，包含安装和使用说明的官方仓库。
- **Hooks Toolkit**：[hooks-toolkit.com](https://hooks-toolkit.com/)，指南、Hooks API 参考（\`hookapi.h\`）、示例和 Hook 开发工具。`,
      },
      codeBlocks: [

      ],
      slides: [
        {
          title: { es: "hooks-cli — Desarrollo local", pt: "hooks-cli — Desenvolvimento local", en: "hooks-cli — Local development", jp: "hooks-cli — ローカル開発", ko: "hooks-cli — 로컬 개발", zh: "hooks-cli — 本地开发" },
          content: {
            es: "CLI oficial para compilar Hooks\n\nnpm install -g @xahau/hooks-cli\nhooks-cli init c mi-proyecto\ncd mi-proyecto && npm install\nnpm run build\n\nPara desarrollo profesional y Mainnet",
            pt: "CLI oficial para compilar Hooks\n\nnpm install -g @xahau/hooks-cli\nhooks-cli init c mi-projeto\ncd mi-projeto && npm install\nnpm run build\n\nPara desenvolvimento profissional e Mainnet",
            en: "Official CLI to compile Hooks\n\nnpm install -g @xahau/hooks-cli\nhooks-cli init c my-project\ncd my-project && npm install\nnpm run build\n\nFor professional development and Mainnet",
            jp: "HooksをコンパイルするためのCLI\n\nnpm install -g @xahau/hooks-cli\nhooks-cli init c my-project\ncd my-project && npm install\nnpm run build\n\nプロフェッショナルな開発とMainnet向け",
            ko: "Hook 컴파일용 공식 CLI\n\nnpm install -g @xahau/hooks-cli\nhooks-cli init c my-project\ncd my-project && npm install\nnpm run build\n\n전문 개발과 Mainnet 배포에 적합",
            zh: "用于编译 Hook 的官方 CLI\n\nnpm install -g @xahau/hooks-cli\nhooks-cli init c my-project\ncd my-project && npm install\nnpm run build\n\n适合专业开发与 Mainnet 部署",
          },
          visual: "🔨",
        },
        {
          title: { es: "Estructura del proyecto", pt: "Estrutura do projeto", en: "Project structure", jp: "プロジェクト構造", ko: "프로젝트 구조", zh: "项目结构" },
          content: {
            es: "hooks-cli init c genera:\n\nmi-proyecto-hook/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\nCompilar: npm run build\nAlternativa: hooks-cli compile-c contracts build/ --headers contracts/include",
            pt: "hooks-cli init c gera:\n\nmi-projeto-hook/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\nCompilar: npm run build\nAlternativa: hooks-cli compile-c contracts build/ --headers contracts/include",
            en: "hooks-cli init c generates:\n\nmy-hook-project/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\nCompile: npm run build\nAlternative: hooks-cli compile-c contracts build/ --headers contracts/include",
            jp: "hooks-cli init c が生成するもの：\n\nmy-hook-project/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\nコンパイル: npm run build\n代替: hooks-cli compile-c contracts build/ --headers contracts/include",
            ko: "hooks-cli init c 로 생성되는 구조:\n\nmy-hook-project/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\n컴파일: npm run build\n대안: hooks-cli compile-c contracts build/ --headers contracts/include",
            zh: "hooks-cli init c 会生成如下结构：\n\nmy-hook-project/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\n编译：npm run build\n替代方式：hooks-cli compile-c contracts build/ --headers contracts/include",
          },
          visual: "📁",
        },
        {
          title: { es: "Despliegue y referencia", pt: "Deploy e referência", en: "Deployment and reference", jp: "デプロイとリファレンス", ko: "배포와 참고자료", zh: "部署与参考资料" },
          content: {
            es: "SetHook con xahau.js:\n• Leer .wasm → hex → CreateCode\n• Configurar HookOn, HookCanEmit, Namespace\n• crypto.createHash('sha256') para namespace\n\nReferencia:\n• github.com/Xahau/hooks-cli\n• hooks-toolkit.com",
            pt: `SetHook com xahau.js:
• Ler .wasm → hex → CreateCode
• Configurar HookOn, HookCanEmit, Namespace
• crypto.criateHash('sha256') para namespace

Referência:
• github.com/Xahau/hooks-cli
• hooks-toolkit.com`,
            en: "SetHook with xahau.js:\n• Read .wasm → hex → CreateCode\n• Configure HookOn, HookCanEmit, Namespace\n• crypto.createHash('sha256') for namespace\n\nReference:\n• github.com/Xahau/hooks-cli\n• hooks-toolkit.com",
            jp: "xahau.jsでSetHook：\n• .wasmを読み込む → hex → CreateCode\n• HookOn、HookCanEmit、Namespaceを設定\n• Namespace用にcrypto.createHash('sha256')\n\nリファレンス：\n• github.com/Xahau/hooks-cli\n• hooks-toolkit.com",
            ko: "xahau.js로 SetHook 배포:\n• .wasm 읽기 → hex → CreateCode\n• HookOn, HookCanEmit, Namespace 설정\n• namespace용 crypto.createHash('sha256') 사용\n\n참고:\n• github.com/Xahau/hooks-cli\n• hooks-toolkit.com",
            zh: "使用 xahau.js 部署 SetHook：\n• 读取 .wasm → 转 hex → CreateCode\n• 配置 HookOn、HookCanEmit、Namespace\n• 对 namespace 使用 crypto.createHash('sha256')\n\n参考：\n• github.com/Xahau/hooks-cli\n• hooks-toolkit.com",
          },
          visual: "📚",
        },
      ],
    },
  ],
}

const arabicModuleTranslations = {
  title: "مقدمة إلى smart contracts في بيئات غير EVM",
  lessons: {
    m8l1: {
      title: "ما هي Hooks؟",
      theory: `**Hooks** هي نظام smart contracts الأصلي في Xahau. بخلاف Solidity في Ethereum، تكتب Hooks بلغة **C** وتترجم إلى **WebAssembly (WASM)**.

### Hooks مقابل EVM smart contracts

في EVM ترسل معاملة إلى contract لاستدعائه. في Xahau، Hook مثبت على حساب ويعمل **تلقائيا** عندما تمر معاملة بهذا الحساب. لذلك النموذج تفاعلي: Hook يشبه فلتر أو interceptor للمعاملات.

يمكن لـ Hook أن:

- يقبل المعاملة باستخدام \`accept()\`
- يرفضها باستخدام \`rollback()\`
- يصدر معاملات جديدة باستخدام \`emit()\`
- يقرأ ويكتب حالة دائمة باستخدام \`state()\` و \`state_set()\`

### حقائق مهمة

يمكن للحساب تثبيت عدة Hooks. لكل Hook namespace لحالته. عند تثبيت WASM لأول مرة، يخزن الكود في ledger ويأخذ HookHash. لاحقا يمكن تثبيت نفس Hook بالـ hash دون إعادة رفع الكود.

كل Hook يحتاج دالة \`hook(uint32_t reserved)\`. ودالة \`cbak\` اختيارية لمعالجة callbacks من معاملات emit. كما يجب استخدام guard مثل \`_g(id, maxiter)\` لتجنب loops غير محدودة.`,
      codeTitles: [
        "Hook بسيط يقبل كل المعاملات",
        "Hook يرفض المدفوعات الأقل من حد أدنى",
      ],
      slides: [
        {
          title: "Hooks مقابل EVM Smart Contracts",
          content: "EVM:\n• استدعاء مباشر للcontract\n• Solidity\n• Gas متغير\n\nHooks:\n• تعمل تلقائيا على الحساب\n• C → WASM\n• نموذج تفاعلي\n• رسوم قابلة للتوقع",
        },
        {
          title: "النموذج التفاعلي والدوال",
          content: "Hook يرى المعاملة ويفعل أحد الأشياء:\n\n• accept()\n• rollback()\n• emit()\n• state()/state_set()\n\nهو فلتر ذكي على الحساب.",
        },
        {
          title: "حقائق أساسية عن Hooks",
          content: "• حتى 10 Hooks لكل حساب\n• لكل Hook namespace\n• الكود يخزن كـ WASM\n• يمكن إعادة استخدام HookHash\n• _g guard ضروري",
        },
      ],
    },
    m8l2: {
      title: "نشر Hook على Xahau",
      theory: `بمجرد أن يصبح Hook الخاص بك مكتوبا بلغة C، تحتاج إلى **تجميعه إلى WebAssembly** و**نشره** على حسابك في Xahau عبر معاملة \`SetHook\`.

### خيارات التطوير

**1. Hooks Builder (عبر الإنترنت)**
الطريقة الأسرع للبدء. يتيح لك [builder.xahau.network](https://builder.xahau.network) كتابة وتجميع ونشر Hooks مباشرة من المتصفح. يتضمن أمثلة وتوثيقا وبيئة تطوير متكاملة. مثالي للاختبارات السريعة والتعلم. متاح فقط على **Xahau Testnet**.

**2. التطوير المحلي**
للتطوير المحلي (ولاحقا على Xahau Mainnet) تحتاج إلى [hooks-toolkit](https://hooks-toolkit.com/)، الذي يتضمن مكتبة كاملة لتجميع Hooks الخاصة بك ونشرها باستخدام سكربتات مخصصة.

### نشر Hook

بمجرد أن يصبح Hook جاهزا للنشر، العملية العامة هي إنشاء معاملة \`SetHook\` بالحقول المناسبة، توقيعها وإرسالها إلى الشبكة. الحقل الرئيسي لكود Hook هو \`CreateCode\`، حيث يجب تضمين ملف WASM الثنائي بصيغة hex إذا كانت هذه هي المرة الأولى التي يوجد فيها هذا Hook على الشبكة.

بيئات الاختبار مثل [Hooks Builder](https://builder.xahau.network) تتيح لك تجميع الكود ورفعه باستخدام واجهة رسومية. توجد بيئات رسومية أخرى لكل من Xahau Testnet وMainnet، تتطلب منك استخدام seed حسابك لتوقيع معاملة النشر، مثل [xahau-testnet.xrplwin.com/tools](https://xahau-testnet.xrplwin.com/tools). يوصى باستخدامها فقط في بيئة الاختبار. كممارسة معتادة، يوصى بتعلم استخدام معاملة \`SetHook\` عبر سكربتات مخصصة باستخدام مكتبة \`xahau js\`، حتى تتمكن لاحقا من أتمتة عمليات النشر والتحديث وإدارة Hooks في بيئة الإنتاج.

### معاملة SetHook

معاملة \`SetHook\` هي المعاملة الوحيدة اللازمة لإدارة Hooks. من خلالها يمكنك **تثبيت** و**تحديث** و**حذف** Hooks من حسابك. الحقول الرئيسية لكائن Hook داخل مصفوفة \`Hooks\` هي:

| الحقل | الوصف |
|---|---|
| \`CreateCode\` | ملف WASM الثنائي لـ Hook (بصيغة hex) |
| \`HookHash\` | هاش Hook موجود مسبقا في الـ ledger (بديل لـ CreateCode) |
| \`HookOn\` | سلسلة تحدد أنواع المعاملات التي تفعّل Hook |
| \`HookNamespace\` | اسم لحالة Hook (32 بايت hex) |
| \`HookApiVersion\` | إصدار واجهة برمجة Hooks (حاليا 0) |
| \`HookParameters\` | معاملات إعداد اختيارية |
| \`HookCanEmit\` | قائمة المعاملات التي يمكن لـ Hook إصدارها (أمان) |
| \`Flags\` | أعلام التحكم (\`hsfOverride\`، \`hsfNSDelete\`، \`hsfCollect\`) |

### مراحل إدارة Hook

### 1. تثبيت Hook لأول مرة (باستخدام CreateCode)

عندما تنشر Hook جديدا لم يوجد من قبل على الشبكة، تستخدم حقل \`CreateCode\` مع ملف WASM الثنائي الكامل. تحسب العقدة هاش WASM وتخزن الكود في الـ ledger. إذا كان مستخدم آخر قد نشر بالفعل نفس الكود تماما، تعيد Xahau استخدام التعريف الموجود (إزالة تكرار تلقائية).

\`\`\`
Hook: {
  CreateCode: "0061736D...",     // WASM بصيغة hex
  HookOn: "0000000000000000",    // كل أنواع المعاملات
  HookNamespace: "00...00",      // 64 حرف hex
  HookApiVersion: 0,
  Flags: 1,                      // hsfOverride
}
\`\`\`

### 2. تثبيت Hook موجود عبر HookHash

إذا كان Hook قد نُشر مسبقا (من طرفك أو من حساب آخر)، يمكنك تثبيته على حسابك **دون إرسال WASM بالكامل مرة أخرى**. تحتاج فقط إلى \`HookHash\` (هاش SHA-256 للملف الثنائي). هذا يوفر المساحة والرسوم.

\`\`\`
Hook: {
  HookHash: "A5B6C7D8...",      // هاش Hook الموجود
  HookOn: "0000000000000000",
  HookNamespace: "00...00",
  Flags: 1,                      // hsfOverride
}
\`\`\`

يمكنك الحصول على \`HookHash\` باستعلام Hooks حساب ما عبر \`account_objects\` أو من مستكشف كتل مثل [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com).

### 3. تحديث Hook (عملية Update)

يتم تفعيل عملية التحديث عندما يكون Hook موجودا بالفعل في الموضع، و**لا** يُرسل \`HookHash\` ولا \`CreateCode\`، ويتم تضمين حقل واحد على الأقل من: \`HookNamespace\` أو \`HookParameters\` أو \`HookGrants\`. هذا يسمح بتعديل إعدادات Hook **دون استبدال كود WASM**.

**ما يمكنك تعديله**:

- **HookNamespace**: إذا أرسلت \`HookNamespace\` مختلفا عن الحالي، يتم تحديث namespace الخاص بـ Hook. إذا أضفت أيضا العلم \`hsfNSDelete\` (القيمة 2)، **تُحذف جميع إدخالات الحالة من namespace السابق**.
- **HookParameters**: لكل إدخال في \`HookParameters\`:
  - إذا أرسلت معاملا باسم **دون قيمة**، يُحذف ذلك المعامل من Hook
  - إذا أرسلت معاملا باسم **وقيمة**، تتم **إضافة أو تحديث** ذلك المعامل
- **HookGrants**: إذا أدرجت \`HookGrants\`، تُستبدل مصفوفة grants الكاملة لـ Hook بالمصفوفة الجديدة المقدمة

\`\`\`
// مثال: تحديث معاملات Hook موجود فقط
Hook: {
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "4D494E",        // "MIN"
        HookParameterValue: "00E1F505"      // قيمة جديدة
      }
    },
    {
      HookParameter: {
        HookParameterName: "4D4158",        // "MAX" — حذف
        // بدون HookParameterValue = يُحذف
      }
    }
  ]
}
\`\`\`

**لاستبدال Hook بالكامل** بكود WASM مختلف، أرسل \`SetHook\` جديدا مع \`CreateCode\` (أو \`HookHash\`) في نفس الموضع مع العلم \`hsfOverride\` (القيمة 1). تُحفظ حالة Hook السابقة إذا لم يتغير namespace.

### 4. حذف Hook (عملية Delete)

لحذف Hook من موضع ما، يجب استيفاء هذه الشروط: يجب أن يكون Hook موجودا في ذلك الموضع، ويجب أن يكون العلم \`hsfOverride\` مفعّلا، و**لا** يُرسل \`HookHash\`، ويجب أن يكون \`CreateCode\` موجودا لكن **فارغا**:

\`\`\`
Hook: {
  CreateCode: "",       // فارغ = حذف
  Flags: 1,             // hsfOverride
}
\`\`\`

عند الحذف:
- يتم إنقاص **عداد المراجع** الخاص بـ \`HookDefinition\`. إذا وصل إلى صفر (لا يستخدم أي حساب آخر ذلك الكود)، يُحذف التعريف من الـ ledger
- يُحذف كائن Hook في ذلك الموضع، تاركا الموضع فارغا

إذا أردت أيضا **تنظيف كل حالة** namespace ذلك Hook، أضف العلم \`hsfNSDelete\` (القيمة 2) مدمجا مع \`hsfOverride\`: \`Flags: 3\`. سيؤدي هذا إلى حذف جميع إدخالات \`HookState\` من namespace المرتبط.

### أعلام SetHook

| العلم | القيمة | الوصف |
|---|---|---|
| \`hsfOverride\` | 1 | يسمح باستبدال أو حذف Hook موجود في ذلك الموضع |
| \`hsfNSDelete\` | 2 | يحذف كل حالة namespace عند إزالة التثبيت |
| \`hsfCollect\` | 4 | يسمح بالتنفيذ كـ weakTSH |

### HookOn: مرشح المعاملات

يتحكم حقل \`HookOn\` في أنواع المعاملات التي تفعّل Hook:
- يمكنك إعداد بتات محددة لتفعيل أو تعطيل الأنواع باستخدام هذه [الآلة الحاسبة](https://richardah.github.io/xrpl-hookon-calculator/)
- إذا حددنا التفعيل فقط عند معاملات الدفع، سيُنفَّذ Hook فقط عندما يستقبل الحساب أو يرسل دفعة. نتيجة الآلة الحاسبة هي \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. يجب حذف جزء \`0x\` وتحويل النتيجة إلى أحرف كبيرة لاستخدامها في حقل HookOn. مثال: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- يمكن تحديد عدة معاملات في آن واحد. يُنصح بالحذر عند إعداد HookOn لتجنب تفعيل Hook على أنواع معاملات لا تحتاجها، لأن ذلك قد يولد رسوما غير ضرورية ويزيد من خطر حدوث إجراءات غير متوقعة.

### HookCanEmit: التحكم في إصدار المعاملات

حقل \`HookCanEmit\` هو آلية أمان أساسية تحد من المعاملات التي يمكن لـ Hook إصدارها. بشكل افتراضي، يمتلك Hook القدرة على إصدار معاملات مستقلة (باستخدام دالة \`emit()\`)، وهو ما قد يمثل خطرا إذا كان Hook يحتوي على خلل أو تم تثبيته دون مراجعة كوده.

\`HookCanEmit\` هو مصفوفة تحدد صراحة أنواع المعاملات التي يمكن لـ Hook إصدارها. إذا تم إعداده، **يمكن لـ Hook إصدار المعاملات المدرجة فقط**، وسيُرفض أي محاولة لإصدار نوع غير مدرج من قِبل الشبكة. يعمل تماما مثل \`HookOn\`، لكن بدلا من التحكم في تفعيل Hook، يتحكم في قدرته على الإصدار.

- يمكنك إعداد بتات محددة لتفعيل أو تعطيل الأنواع باستخدام نفس [الآلة الحاسبة](https://richardah.github.io/xrpl-hookon-calculator/)
- إذا حددنا السماح فقط بإصدار معاملات الدفع، نتيجة الآلة الحاسبة هي \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. يجب حذف جزء \`0x\` وتحويل النتيجة إلى أحرف كبيرة لاستخدامها في حقل \`HookCanEmit\`. مثال: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- على الرغم من أن \`HookCanEmit\` حقل اختياري، يُنصح باستخدامه لمنع Hook من إصدار معاملات غير مرغوب فيها، لأن ذلك قد يولد إجراءات غير مرغوب فيها من Hook خبيث.

**لماذا هو مهم للأمان؟**

- **مبدأ أقل امتياز**: يجب ألا يمتلك Hook سوى الأذونات التي يحتاجها. إذا كان Hook الخاص بك يحتاج فقط إلى إرسال مدفوعات، يجب ألا يكون قادرا على إصدار \`SetHook\` أو \`AccountDelete\` أو معاملات حساسة أخرى.
- **الحماية من الأخطاء**: إذا كان Hook يحتوي على ثغرة، يحد \`HookCanEmit\` من الضرر المحتمل من خلال تقييد الإجراءات التي يمكنه تنفيذها.
- **التدقيق والشفافية**: عند مراجعة Hook مثبت على حساب، يتيح \`HookCanEmit\` التحقق سريعا من العمليات التي يمكنه تنفيذها بشكل مستقل.
- **ممارسة جيدة**: قم دائما بإعداد \`HookCanEmit\` بأقل مجموعة من المعاملات اللازمة لمنطق Hook الخاص بك.

### مزيد من المعلومات

للحصول على مرجع كامل لـ \`SetHook\`، بما في ذلك جميع الحقول والأعلام وقواعد التحقق والحالات الخاصة، راجع [التوثيق الرسمي](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/).`,
      codeTitles: [
        "نشر Hook من ملف .wasm باستخدام xahau.js",
        "حذف Hook من حساب باستخدام xahau.js",
        "تثبيت Hook باستخدام HookHash",
        "فحص Hooks المثبتة على حساب",
      ],
      slides: [
        {
          title: "SetHook: الحقول الرئيسية",
          content: "معاملة واحدة لإدارة Hooks\n\n• CreateCode: WASM بصيغة hex\n• HookHash: تثبيت Hook موجود عبر الهاش\n• HookOn: مرشح المعاملات\n• HookNamespace: عزل الحالة\n• HookParameters: إعداد بدون إعادة تجميع\n• HookCanEmit: التحكم في الإصدار (أمان)\n• Flags: hsfOverride | hsfNSDelete | hsfCollect",
        },
        {
          title: "4 مراحل لإدارة Hook",
          content: "1. Compile C إلى WASM\n2. Deploy عبر SetHook\n3. Inspect باستخدام account_objects\n4. Update أو Delete عند الحاجة",
        },
        {
          title: "HookOn و HookCanEmit",
          content: "HookOn يحدد أنواع المعاملات التي تفعّل Hook\n\nHookCanEmit يحدد هل يمكن للـ Hook إصدار معاملات جديدة أم لا.",
        },
      ],
    },
    m8l3: {
      title: "الحالة الدائمة في Hooks",
      theory: `يمكن لـ Hooks تخزين **بيانات دائمة** بين مرات التنفيذ باستخدام نظام الحالة (\`state\`). هذا يتيح لـ Hook امتلاك معلومات متاحة للعمل بها في واحد أو أكثر من \`Namespace\`.

### بنية الحالة

يُعرَّف Namespace بـ 32 بايت (256 بت) بصيغة hex. تُنظَّم الحالة كأزواج **مفتاح-قيمة**:

- **المفتاح**: 32 بايت (256 بت). إذا كان مفتاحك أقصر، يُملأ بالأصفار
- **القيمة**: حتى 256 بايت لكل إدخال
- يُعرَّف كل إدخال حالة بمفتاحه داخل **Namespace**

### القيود

- يمكن لحساب تخزين 256 namespace كحد أقصى.
- تعتمد سجلات المفتاح-القيمة على احتياطياتك من XAH.

### دوال الحالة

هذه بعض الدوال التي يمكننا استخدامها لقراءة أو كتابة المعلومات في \`Namespace\`.

- [state()](https://xahau.network/docs/hooks/functions/state/state/): يقرأ قيمة من الحالة باستخدام مفتاح
- [state_set()](https://xahau.network/docs/hooks/functions/state/state_set/): يكتب قيمة في الحالة لمفتاح معين
- [state_foreign()](https://xahau.network/docs/hooks/functions/state/state_foreign/): يقرأ حالة \`Namespace\` ليس ملكه.
- [state_foreign_set()](https://xahau.network/docs/hooks/functions/state/state_foreign_set/): يكتب قيمة في حالة \`Namespace\` ليس ملكه.

### استخدامات عملية للحالة

- **العدادات**: عد المعاملات المعالجة، المدفوعات المستلمة، إلخ.
- **القوائم البيضاء/السوداء**: تخزين العناوين المسموح بها أو المحظورة
- **الإعدادات**: حفظ المعاملات التي يستعلم عنها Hook في كل تنفيذ
- **التتبع**: تسجيل آخر معاملة تمت معالجتها، الطوابع الزمنية، إلخ.
- **المجمِّعات**: جمع المبالغ، حساب متوسط القيم، إدارة أرصدة داخلية`,
      codeTitles: ["Hook يعد المدفوعات التي عالجها"],
      slides: [
        {
          title: "نظام Hook state",
          content: "Hooks يمكنها حفظ بيانات دائمة\n\n• state() للقراءة\n• state_set() للكتابة\n• البيانات تعيش في ledger\n• مناسبة للعدادات والإعدادات",
        },
        {
          title: "Namespace والعزل",
          content: "كل Hook له namespace\n\nهذا يمنع تصادم keys بين Hooks مختلفة\nويساعد على تنظيم state بأمان.",
        },
        {
          title: "استخدامات عملية للstate",
          content: "• عداد معاملات\n• cooldown\n• حدود يومية\n• قائمة سماح\n• إعدادات برنامج مكافآت\n• آخر وقت تنفيذ",
        },
      ],
    },
    m8l4: {
      title: "إصدار معاملات من Hook",
      theory: `إحدى أقوى قدرات Hooks هي القدرة على **إصدار معاملات جديدة** بشكل مستقل. عندما يصدر Hook معاملة، تُنفَّذ كما لو أن حساب Hook هو من أرسلها.

### دالة emit()

تتيح دالة \`emit()\` لـ Hook إنشاء وإرسال **معاملة صادرة (etxn)**. هذه المعاملات:
- يُنشئها Hook، وليس مستخدما
- تُنفَّذ بشكل مستقل على الـ ledger
- يمكن أن تكون مدفوعات أو عروضا أو أي نوع معاملة مدعوم

### حجز مساحة باستخدام etxn_reserve()

قبل الإصدار، يجب عليك **حجز** عدد المعاملات التي ستصدرها في هذا التنفيذ:

\`\`\`
etxn_reserve(1);  // حجز مساحة لإصدار واحد
\`\`\`

هذا إلزامي. إذا حاولت الإصدار دون حجز، سيفشل Hook.

### خطوات الإصدار

1. **\`etxn_reserve(N)\`**: حجز مساحة لـ N إصدارات
2. **بناء المعاملة**: ملء buffer بحقول المعاملة المتسلسلة
3. **\`etxn_details()\`**: تحضير تفاصيل الإصدار (يولد هاش الإصدار)
4. **\`emit()\`**: إرسال المعاملة إلى الـ ledger

### دالة cbak()

عندما **تكتمل** معاملة صادرة (بنجاح أو فشل)، تستدعي Xahau دالة \`cbak()\` الخاصة بـ Hook الذي أصدرها:

- تستقبل \`cbak()\` معلومات عن نتيجة الإصدار
- يمكنك استخدام \`cbak()\` لتحديث الحالة أو تسجيل النتائج أو اتخاذ إجراءات إضافية
- إذا لم تكن بحاجة لفعل أي شيء، يمكن لـ \`cbak()\` ببساطة إرجاع 0

### حالات الاستخدام

- **إعادة التوجيه التلقائي**: إعادة توجيه نسبة مئوية من كل دفعة مستلمة تلقائيا
- **التقسيم**: تقسيم دفعة واردة بين عدة حسابات
- **الاسترداد**: إعادة المدفوعات التي لا تستوفي شروطا معينة
- **الإجراءات المجدولة**: إصدار معاملات بناء على شروط الحالة

### القيود

- يوجد **حد أقصى للإصدارات لكل تنفيذ** لـ Hook
- المعاملات الصادرة لها **متطلبات رسوم خاصة بها**
- تزيد الإصدارات من الحمل الحسابي لـ Hook

### بناء الـ Payment المُصدَرة

تبني الأمثلة القديمة المعاملة بالماكرو \`PREPARE_PAYMENT_SIMPLE\`. الملفات الرأسية التي يكتبها \`hooks-cli init\` اليوم (الإصدار 2.1.0) لا تتضمنه، لذلك يبني Hook التحويل الـ Payment يدويًا، بدوال تصرّح بها كل الملفات الرأسية. والبناء اليدوي يوضح أيضًا بالضبط ما تحتويه المعاملة المُصدَرة:

| الحقل | البايتات | القيمة | السبب |
|---|---|---|---|
| TransactionType | 3 | 0 (Payment) | نوع المعاملة |
| Flags | 5 | tfCanonical | العلامة القياسية لصيغة التوقيع القانونية |
| Sequence | 5 | 0 | المعاملة المُصدَرة لا تستخدم Sequence الحساب |
| FirstLedgerSequence, LastLedgerSequence | 6 + 6 | الـ ledger التالي وأربعة بعده | النافذة التي يمكن للشبكة تطبيقها فيها |
| Amount | 9 | 10% من الدفعة بالـ drops | البت 62 يشير إلى مبلغ أصلي موجب |
| Fee | 9 | \`etxn_fee_base()\` | لا تُعرف إلا بعد اكتمال المعاملة، لذلك تُكتب أخيرًا |
| SigningPubKey | 35 | فارغ | المعاملات المُصدَرة لا تُوقَّع: سلطتها من الـ Hook الذي أصدرها |
| Account, Destination | 22 + 22 | حساب الـ Hook، و \`forward_to\` | من يدفع ومن يستلم |
| EmitDetails | 116 | تكتبها \`etxn_details()\` | تربط المعاملة المُصدَرة بالمعاملة التي أطلقتها |

يجب أن تأتي الحقول **بالترتيب القانوني**: حسب رمز النوع ثم رمز الحقل. هذا هو ترتيب الجدول، وهو الترتيب الذي يسلسلها به الـ ledger نفسه.

**حالة يجب الانتباه لها: حجم المخزن.** يشغل \`EmitDetails\` مساحة 116 بايت، أو 138 حين يحتوي الـ Hook على \`cbak()\`. ترفض \`etxn_details()\` أي مخزن أصغر وتعيد خطأ، فيتراجع Hook التحويل (rollback) بدل الإصدار. لهذا فإن \`TX_SIZE\` يساوي \`FIELDS_SIZE + 116\`: إن أضفت \`cbak()\` إلى هذا الـ Hook فيجب أن يصبح 138.

النتيجة على testnet، عند دفع 10 XAH إلى حساب مثبت عليه الـ Hook (مثبت كما في [الدرس 9.2](?m=9&l=1)، مع ضبط \`forward_to\` على حساب ثانٍ):

\`\`\`
TransactionResult: tesSUCCESS
HookResult:        3
HookReturnString:  forwarder: 10% resent correctly
HookEmitCount:     1
forward_to balance: +1 XAH
\`\`\`

- **\`tesSUCCESS\`**: طُبّقت الدفعة الواردة.
- **\`HookResult: 3\`**: انتهى الـ Hook بـ \`accept()\`. لو كان \`rollback()\` لرُفضت الدفعة كلها.
- **\`HookEmitCount: 1\`**: أصدر الـ Hook معاملة واحدة، تُطبَّق في ledger لاحق وليس داخل الدفعة الواردة.
- **\`+1 XAH\`**: وصل إلى \`forward_to\` بالضبط 10% من 10 XAH. رسوم المعاملة المُصدَرة يدفعها حساب الـ Hook.

### روابط مفيدة

- [Xahau Hooks 101](https://github.com/Handy4ndy/XahauHooks101): مجموعة من Hooks الأساسية لتعلم برمجة Hooks، تتضمن عدة أمثلة على الإصدار بواسطة [@handy_andy](https://x.com/Handy_4ndy).
- [Xahau Hook Tx Builder](https://tx-builder.xahau.tools/): مترجم من معاملات JSON إلى لغة C لـ Hooks بواسطة [@_tequ_](https://x.com/_tequ_).`,
      codeTitles: ["Hook يحول 10% من كل دفعة مستلمة"],
      slides: [
        {
          title: "emit() — معاملات ذاتية",
          content: "Hook يمكنه إصدار معاملة جديدة\n\n• بناء tx داخل Hook\n• استدعاء emit()\n• النتيجة تصل إلى cbak\n• يحتاج صلاحيات وحدود",
        },
        {
          title: "تدفق emission",
          content: "1. معاملة أصلية\n2. Hook يعمل\n3. Hook يصدر tx\n4. الشبكة تعالج tx\n5. cbak يستقبل النتيجة",
        },
        {
          title: "الاستخدامات والقيود",
          content: "استخدامات:\n• رسوم تلقائية\n• توزيع مكافآت\n• forwarding\n\nقيود:\n• reserve و fees\n• تجنب loops\n• HookCanEmit مطلوب",
        },
      ],
    },
    m8l5: {
      title: "Parameters ودوال وإدارة Hook",
      theory: `يمكن أن يعتمد سلوك الـ Hook على بيانات تصل مع كل معاملة، لا على الكود وحده. تنتقل هذه البيانات في **معاملات (parameters)**: أزواج اسم/قيمة، وكلاهما بصيغة hex. هناك نوعان، ويجيبان عن سؤالين مختلفين:

| | معاملات الـ Hook (\`hook_param()\`) | معاملات المعاملة (\`otxn_param()\`) |
|---|---|---|
| **تُضبط في** | معاملة \`SetHook\` التي تثبّت الـ Hook | حقل \`HookParameters\` في كل معاملة |
| **يضبطها** | من يثبّت الـ Hook | من يرسل المعاملة |
| **تتغير** | فقط عند إعادة تثبيت الـ Hook | مع كل معاملة |
| **تُستخدم لـ** | الإعدادات: الحدود والعناوين والرسوم | التعليمات: وضع تشغيل أو مرجع أو رمز |

يتناول هذا الدرس معاملات المعاملة: يخبر المرسل الـ Hook بما يفعله بهذه الدفعة تحديدًا.

### قراءة معامل بـ otxn_param()

\`\`\`c
int64_t otxn_param(
    uint32_t write_ptr,  // buffer the value is written to
    uint32_t write_len,  // size of that buffer
    uint32_t read_ptr,   // the parameter's name
    uint32_t read_len    // length of the name
);
\`\`\`

تبحث عن الاسم في \`HookParameters\` الخاصة بالمعاملة التي أطلقت الـ Hook وتنسخ القيمة إلى المخزن. وتخبرك القيمة المعادة بما حدث:

- **موجبة**: عدد البايتات المكتوبة. استخدمها طولًا للقيمة، لا حجم المخزن: بقية المخزن تبقى أصفارًا.
- **سالبة**: المعامل غير موجود، أو المخزن أصغر من اللازم. يجب أن يعالج الـ Hook هذه الحالة؛ فقد لا تحمل المعاملة المعامل ببساطة.

تُقارن الأسماء والقيم بايتًا ببايت: \`ACTION\` و \`action\` اسمان مختلفان.

### جرّبه

يحتوي تبويب الكود على الطرفين: Hook يقرأ المعامل \`ACTION\` ويتتبعه، و \`send-parameters.js\` الذي يرسل Payment بقيمة 1 XAH تحمل \`ACTION = hello\`.

1. ترجم الـ Hook وثبّته على حساب ليعمل مع Payments، كما في [الدرس 9.2](?m=9&l=1) (أو بـ hooks-cli في [الدرس 9.8](?m=9&l=7)).
2. افتح debug stream لحساب الـ Hook، ثم أرسل الدفعة مع تمرير حساب الـ Hook كوسيط:

\`\`\`bash
hooks-cli debug "Hook" <HookAccount>     # الطرفية 1: debug stream للـ Hook
node send-parameters.js <HookAccount>   # الطرفية 2: أرسل Payment تحمل ACTION = hello
\`\`\`

إلى debug stream تذهب مخرجات \`trace()\`؛ يشرحه [الدرس 9.6](?m=9&l=5)، ويعرض Hooks Builder الـ stream نفسه في المتصفح. بدون عنوان صالح يتوقف \`send-parameters.js\` قبل الإرسال ويوضح ما يجب تمريره.

### معنى المخرجات

\`send-parameters.js\` على testnet:

\`\`\`
Sending Payment with HookParameters...
  Param name (hex):  414354494F4E  = ACTION
  Param value (hex):  68656C6C6F
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: parameter read and plotted
\`\`\`

- **\`414354494F4E\`**: كلمة "ACTION" بصيغة hex، و \`68656C6C6F\` هي "hello".
- **\`Result: tesSUCCESS\`**: طُبّقت الدفعة، وعمل الـ Hook ضمنها.
- **\`Hook result: 3 | …\`**: مقروءة من البيانات الوصفية للمعاملة. \`3\` تعني أن الـ Hook انتهى بـ \`accept()\`، والنص هو ما مرّره إلى \`accept()\`. هكذا يتحقق سكربت مما فعله الـ Hook دون debug stream.

الـ debug stream للدفعة نفسها (مع اختصار البادئات):

\`\`\`
HookTrace: otxn_param_demo: hook() initiated:
HookTrace: param_name: 414354494F4E
HookTrace: value_len: 5
HookTrace: param_value: 68656C6C6F000000000000000000000000000000000000000000000000000000
HookTrace: otxn_param_demo: ACTION value (text): : hello
HookTrace: otxn_param_demo: ACTION value (hex): : 68656C6C6F
HookInfo: ACCEPT RS: 'otxn_param_demo: parameter read and plotted'
\`\`\`

- **\`param_name: 414354494F4E\`**: ناتج \`TRACEHEX\` للاسم المبحوث عنه.
- **\`value_len: 5\`**: وجدت \`otxn_param()\` المعامل وكتبت 5 بايتات.
- **\`param_value: 68656C6C…0000\`**: يطبع \`TRACEHEX\` المخزن كاملًا بطول 32 بايت بما فيه الأصفار. لهذا يتتبع الـ Hook القيمة باستخدام \`value_len\`.
- **\`(text): hello\` و \`(hex): 68656C6C6F\`**: البايتات الخمسة نفسها، نصًا و hex.
- **\`ACCEPT RS: …\`**: قبل الـ Hook المعاملة بسلسلة الإرجاع هذه.

### حالات يجب الانتباه لها

- **المعامل غير موجود.** دفعة بدون \`HookParameters\` تجعل \`otxn_param()\` تعيد قيمة سالبة، فيقبل هذا الـ Hook مع ذكر السبب بدل قراءة مخزن فارغ. على testnet:

\`\`\`
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: no ACTION parameter
\`\`\`

- **\`TRACEVAR\` على مصفوفة يطبع عنوانها.** يطبع \`TRACEVAR(param_name)\` رقمًا مثل \`66744\`: عنوان المخزن في الذاكرة، لا محتواه. استخدم \`TRACEVAR\` للأرقام (مثل \`value_len\`) و \`TRACEHEX\` للمخازن.
- **قد يظهر التنفيذ نفسه أكثر من مرة في debug stream.** تطبّق العقدة المعاملة أكثر من مرة قبل التحقق من الـ ledger الخاص بها. المهم فقط هو النتيجة المُتحقَّق منها، أي الموجودة في البيانات الوصفية.
- **الملفات الرأسية القديمة لا تصرّح بـ \`otxn_param\`.** يصرّح بها الـ Hook بنفسه بعد include، وهذا يعمل مع أي ملفات رأسية ([الدرس 9.8](?m=9&l=7) يشرح السبب).

### مصادر

- [HookOn Calculator](https://richardah.github.io/xrpl-hookon-calculator/): إنشاء حقلي HookOn و HookCanEmit
- [HEX Visualizer](https://transia-rnd.github.io/xrpl-hex-visualizer/): تحويل النص إلى hex والعكس بعدة صيغ
- [Time Visualizer](https://transia-rnd.github.io/xrpl-time-visualizer/): التحويل بين صيغة وقت Xahau (Ripple Epoch) والتواريخ المقروءة
- [Hooks Services](https://hooks.services/): محوّلات للقيم والصيغ المستخدمة في Hooks
- [Transaction Builder](https://tx-builder.xahau.tools/): توليد كود C لمعاملة ستُصدر من JSON الخاص بها
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools): أدوات مرئية لتثبيت Hooks وإدارتها`,
      codeTitles: [
        "Hook يقرأ otxn_param ويعرضه باستخدام TRACE",
        "إرسال معاملة مع HookParameters من JavaScript",
      ],
      slides: [
        {
          title: "hook_param مقابل otxn_param",
          content: "نظاما parameters مختلفان:\n\nhook_param() — إعداد ثابت\n• يُعرَّف في SetHook عند التثبيت\n• يُخزَّن مع Hook في ledger\n• يتغير فقط عند تحديث Hook\n• مثالي للعتبات والعناوين الثابتة\n\notxn_param() — بيانات ديناميكية\n• يأتي في المعاملة التي تفعّل Hook\n• يرسله مرسل كل tx\n• يتغير مع كل تنفيذ\n• مثالي للتعليمات والأوضاع والمراجع",
        },
        {
          title: "otxn_param: التوقيع والقيم المُرجعة",
          content: "int64_t otxn_param(\n  write_ptr, write_len,  // buffer الإخراج\n  read_ptr,  read_len    // اسم المعامل\n);\n\nالقيم المُرجعة:\n• > 0 → عدد البايتات المكتوبة (وُجد)\n• DOESNT_EXIST → غير موجود في tx\n• TOO_SMALL → اسم فارغ\n• TOO_BIG → الاسم > 32 بايت\n• OUT_OF_BOUNDS → مؤشرات غير صالحة\n\nالاسم والقيمة بصيغة HEX في المعاملة",
        },
        {
          title: "Namespace والموارد",
          content: "HookNamespace (32 بايت hex):\n• namespace مختلف = حالة معزولة\n• نفس namespace = حالة مشتركة\n• SHA-256 للاسم → namespace فريد\n\nالموارد:\n• hooks.services → نص ↔ hex\n• HookOn calculator\n• محول الوقت (Ripple Epoch)\n• tx-builder.xahau.tools → C من JSON",
        },
      ],
    },
    m8l6: {
      title: "تتبع Hooks وتصحيح الأخطاء",
      theory: `يعمل الـ Hook داخل كل عقدة تعالج المعاملة، في بيئة WebAssembly معزولة، بلا console ولا مصحح أخطاء يمكن ربطه. لمعرفة ما فعله الـ Hook لديك مصدران:

- **البيانات الوصفية للمعاملة.** كل تنفيذ يترك سجل \`HookExecution\`: كيف انتهى الـ Hook، وبأي رسالة وأي رمز. هذا السجل محفوظ في الـ ledger، وتعيده أي عقدة.
- **رسائل التتبع.** تكتب \`trace()\` و\`trace_num()\` و\`trace_float()\` أسطرًا في الـ debug stream الخاص بالعقدة أثناء تنفيذ الـ Hook. تُظهر القيم الوسيطة، ولا تُحفظ في الـ ledger.

ابدأ بالبيانات الوصفية: فهي تجيب عن معظم الأسئلة. أضف التتبع عندما تحتاج إلى رؤية ما يحدث داخل الـ Hook.

### ما تسجله البيانات الوصفية

يقبل الـ Hook المثال في هذا الدرس المدفوعات بالـ XAH ويرفض كل ما عداها. النتيجة على testnet عند دفع 12 XAH له (مثبت كما في [الدرس 9.2](?m=9&l=1)):

\`\`\`
TransactionResult:    tesSUCCESS
HookResult:           3
HookReturnString:     debug_demo:ok
HookReturnCode:       43
HookInstructionCount: 94
\`\`\`

- **\`HookResult\`**: كيف انتهى الـ Hook. \`3\` تعني \`accept()\`؛ و\`2\` تعني \`rollback()\`، وعندها تفشل المعاملة بـ \`tecHOOK_REJECTED\`.
- **\`HookReturnString\`**: الرسالة الممررة إلى \`accept()\` أو \`rollback()\`. تحفظها البيانات الوصفية بصيغة hex. بعد فك ترميزها تنتهي ببايت صفري، لأن \`SBUF()\` يحسب محرف نهاية السلسلة.
- **\`HookReturnCode\`**: الرقم الممرر كوسيط ثانٍ، بصيغة hex. \`0x43\` تساوي 67: رقم سطر آخر \`accept()\` في الملف، لأن الـ Hook يمرر \`__LINE__\`. عندما تمرر \`__LINE__\` في كل \`accept()\` و\`rollback()\`، يخبرك الرمز من أين خرج الـ Hook.
- **\`HookInstructionCount\`**: عدد تعليمات WebAssembly التي نُفذت (\`0x94\` = 148).

يُسجَّل الرفض بالطريقة نفسها. الـ Hook \`min_payment\` من [الدرس 9.1](?m=9&l=0)، عند دفع 5 XAH له، يعطي \`tecHOOK_REJECTED\` و\`HookResult: 2\` ورسالة الرفض الخاصة به.

لقراءة هذه الحقول من سكربت، استعلم عن المعاملة وفك ترميز السلسلة:

\`\`\`js
const { result } = await client.request({ command: "tx", transaction: hash });
const run = result.meta.HookExecutions[0].HookExecution;
console.log(run.HookResult, Buffer.from(run.HookReturnString, "hex").toString());
\`\`\`

### دوال التتبع

تخبرك البيانات الوصفية كيف انتهى الـ Hook، لا ما رآه في الطريق. لذلك يكتب الـ Hook أسطر تتبع. التتبع لا يغيّر النتيجة ولا الـ ledger. هذه هي الدوال الثلاث كما يعرّفها \`extern.h\`:

\`\`\`c
int64_t trace(uint32_t mread_ptr, uint32_t mread_len,
              uint32_t dread_ptr, uint32_t dread_len, uint32_t as_hex);
int64_t trace_num(uint32_t read_ptr, uint32_t read_len, int64_t number);
int64_t trace_float(uint32_t read_ptr, uint32_t read_len, int64_t float1);
\`\`\`

تستقبل كل دالة تسمية على شكل مؤشر وطول. يتوسع \`SBUF(x)\` إلى الاثنين، ولهذا تبدو الاستدعاءات قصيرة.

**\`trace()\`** تكتب التسمية ومخزن بيانات. عندما تكون \`as_hex\` مساوية لـ \`1\` تظهر البيانات بصيغة hex: هكذا تُقرأ القيم الثنائية مثل AccountID، ويمكنك بعدها مقارنتها بما يعرضه مستكشف الكتل. لرسالة بسيطة، لا تمرر أي بيانات:

\`\`\`c
trace(SBUF("debug_demo:hook() initiated"), 0, 0, 0);

uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);
\`\`\`

**\`trace_num()\`** تكتب التسمية وعددًا صحيحًا من 64 بت: المبالغ بالـ drops، والعدادات، والقيم التي تعيدها دوال Hook API. تعيد هذه الدوال رقمًا سالبًا عند الخطأ، لذا فإن تتبع نتيجة \`state_set()\` أو \`emit()\` يكشف فشلًا كان سيمر بصمت:

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("debug_demo:drops received: "), drops);
\`\`\`

**\`trace_float()\`** تكتب رقمًا بصيغة XFL، وهي صيغة الفاصلة العائمة التي تستخدمها الـ Hooks للمبالغ غير الصحيحة. تنشئ \`float_set(exponent, mantissa)\` رقمًا منها: \`float_set(-6, drops)\` هو المبلغ بالـ XAH.

\`\`\`c
trace_float(SBUF("debug_demo:XAH received: "), float_set(-6, drops));
\`\`\`

### أين تظهر أسطر التتبع

تذهب أسطر التتبع إلى الـ debug stream الخاص بالعقدة، لا إلى المعاملة. على testnet، افتح **Debug Stream** في Hooks Builder، واختر حساب الـ Hook، ثم أرسل المعاملة: تظهر الأسطر بينما تعالجها العقدة. على عقدة تشغّلها بنفسك، تظهر في سجلها.

الـ Hook الذي ينتهي بـ \`rollback()\` يكتب أسطر تتبعه أيضًا، لذا فالـ debug stream هو المكان الذي ترى فيه القيم التي أدت إلى الرفض.

### ماكروهات التصحيح

يتضمن \`hookapi.h\` الملف \`macro.h\`، الذي يعرّف أربع ماكروهات حول دوال التتبع. يستخدم كل منها اسم المتغير كتسمية، لذا يكتب \`TRACEVAR(drops)\` الاسم \`drops\` وقيمته دون أن تكتب التسمية بنفسك:

| الماكرو | الدالة التي يستدعيها | الاستخدام |
|---|---|---|
| \`TRACEVAR(v)\` | \`trace_num()\` | الأعداد الصحيحة: drops، العدادات، رموز الإرجاع |
| \`TRACEHEX(v)\` | \`trace(…, 1)\` | المخازن الثنائية: AccountID، الهاشات، المفاتيح |
| \`TRACEXFL(v)\` | \`trace_float()\` | مبالغ XFL |
| \`TRACESTR(v)\` | \`trace(…, 0)\` | المخازن النصية: المعاملات، الـ memos |

لا تعمل الماكروهات إلا عندما تكون قيمة \`DEBUG\` هي \`1\`. يضبط \`macro.h\` قيمة \`DEBUG\` بناءً على \`NDEBUG\`: من دون \`NDEBUG\` تكون \`1\`. للترجمة من دونها، عرّف \`NDEBUG\` قبل تضمين الملف الرأسي:

\`\`\`c
#define NDEBUG        // DEBUG = 0: ماكروهات TRACE لا تفعل شيئًا
#include "hookapi.h"
\`\`\`

عندما تكون \`DEBUG\` مساوية لـ \`0\`، يكون \`if (DEBUG)\` خاطئًا دائمًا ويحذف المترجم تلك الاستدعاءات من الـ WASM. لا يتأثر الاستدعاء المباشر لـ \`trace()\` و\`trace_num()\` و\`trace_float()\`: احذفه بنفسك.

### التتبع والـ Mainnet

كل استدعاء تتبع هو شيفرة تُنفَّذ: يكبّر الـ WASM ويطيل التنفيذ. احتفظ بأسطر التتبع أثناء الاختبار على testnet. قبل تثبيت الـ Hook على Mainnet، عرّف \`NDEBUG\` واحذف الاستدعاءات المباشرة لدوال التتبع. احتفظ برموز \`__LINE__\`: لا تضيف شيئًا إلى التنفيذ وتُبقي البيانات الوصفية مفيدة.`,
      codeTitles: ["Hook مزود بكل دوال trace"],
      slides: [
        {
          title: `البيانات الوصفية والتتبع`,
          content: `البيانات الوصفية (في الـ ledger دائمًا):
• HookResult: 3 = accept، 2 = rollback
• HookReturnString: رسالة الخروج
• HookReturnCode: رمز الخروج بصيغة hex

التتبع (الـ debug stream أثناء الاختبار):
• القيم التي رآها الـ Hook في الطريق
• لا يُحفظ في الـ ledger`,
        },
        {
          title: `دوال trace الثلاث`,
          content: `trace(SBUF("label"), 0, 0, 0);
← رسالة

trace(SBUF("label"), SBUF(buf), 1);
← تسمية + مخزن بصيغة hex

trace_num(SBUF("label"), n);
← تسمية + عدد صحيح (drops، قيم الإرجاع)

trace_float(SBUF("label"), xfl);
← تسمية + مبلغ XFL`,
        },
        {
          title: `عادات التصحيح`,
          content: `• __LINE__ في accept/rollback ← سطر الخروج في HookReturnCode
• استخدم trace_num لقيمة إرجاع كل استدعاء لـ Hook API
  (سالب = خطأ)
• اقرأ التتبع في Hooks Builder ← Debug Stream
• ماكروهات TRACE: تُعطَّل بـ #define NDEBUG
• قبل Mainnet: NDEBUG، واحذف الاستدعاءات المباشرة للتتبع`,
        },
      ],
    },
    m8l7: {
      title: "Hooks Builder: تطوير عبر الإنترنت",
      theory: `[Hooks Builder](https://builder.xahau.network) هو بيئة التطوير عبر الإنترنت لـ Hooks على **Xahau Testnet**. يتيح لك كتابة، ترجمة (compile)، نشر واختبار Hooks مباشرة من المتصفح دون الحاجة إلى تثبيت أي شيء على جهازك. **ملاحظة:** تذكر حفظ تقدمك و seeds قبل إغلاق المتصفح، لأنها قد لا تُحفظ بعد إغلاق الجلسة.

### التبويبات الرئيسية

يحتوي Builder على ثلاثة تبويبات رئيسية تغطي كامل سير عمل التطوير:

- **Develop**: كتابة وترجمة Hooks بلغة C
- **Deploy**: إدارة الحسابات ونشر Hooks
- **Test**: توليد معاملات اختبار وعرض السجلات

### الخطوة 1: إدارة الحسابات في Deploy

قبل التطوير، تحتاج إلى حساب testnet واحد على الأقل. في تبويب **Deploy**:

**إنشاء حساب جديد**
1. اضغط **"Generate Account"** أو زر إنشاء الحساب
2. سيُنشئ Builder تلقائيا زوج مفاتيح (عنوان + seed) ويموّل الحساب بـ XAH على testnet عبر الـ faucet
3. احفظ الـ seed في مكان آمن، ستحتاجه إذا أغلقت المتصفح

**استيراد حساب موجود**
1. اضغط **"Import Account"** أو زر الاستيراد
2. أدخل **seed** (السر) لحساب testnet الخاص بك
3. سيظهر الحساب في القائمة مع رصيده وHooks المثبتة عليه

يُنصح بامتلاك **حسابين على الأقل**: واحد لتثبيت Hook وآخر لإرسال معاملات اختبار إليه. **لا تستخدم seeds من حسابات Xahau Mainnet في Builder لأسباب أمنية**، إذا احتجت seed جديدا، أنشئه داخل Builder أو زر [xahau-test.net](https://xahau-test.net/).

### الخطوة 2: التطوير والترجمة في Develop

في تبويب **Develop**:

1. **اختر مثالا** من القائمة الجانبية أو أنشئ ملفا جديدا
2. **اكتب Hook الخاص بك بلغة C**، المحرر يحتوي على تلوين الصيغة وإكمال تلقائي أساسي
3. اضغط **"Compile To WASM"** لترجمة كود C إلى WebAssembly
4. إذا وُجدت أخطاء، ستظهر في وحدة التحكم أسفل الشاشة، تحقق من رقم السطر ورسالة الخطأ
5. إذا نجحت الترجمة، ستتلقى الرسالة \`File xxxx.c compiled successfully. Ready to deploy.Go to deploy\`. سيكون WASM الناتج جاهزا للنشر

**نصائح**:
- ابدأ بالأمثلة المضمّنة للتعرّف على الـ API
- أكثر أخطاء الترجمة شيوعا: نسيان تضمين \`hookapi.h\`، عدم تعريف guard \`_g()\`، أو أخطاء نوع في دوال الـ API

### الخطوة 3: النشر في Deploy

بمجرد ترجمة Hook الخاص بك، عد إلى تبويب **Deploy**:

1. **اختر الحساب** الذي تريد تثبيت Hook عليه واضغط **Set Hook** لفتح نموذج التثبيت
2. **اضبط المعاملات**:
   - **Account**: الحساب الذي سيُثبَّت عليه Hook (مُختار مسبقا)
   - **Sequence**: اترك Builder يملأه تلقائيا
   - **Invoke on transactions** (HookOn): اختر أنواع المعاملات التي ستفعّل Hook (يمكن اختيار عدة أنواع)
   - **Hook Namespace Seed**: اسم النص الذي تريد استخدامه كـ seed لـ Namespace
   - **Hook Namespace (sha256)**: الـ sha256 المُولَّد من Seed المستخدم في الحقل السابق (لا تعدّله)
   - **Hook Parameters**: إذا كان Hook الخاص بك يستخدم parameters، اضبطها هنا (الاسم والقيمة بصيغة hex)
   - **Fee**: اضغط **Suggest** إذا أعطى Hook خطأ رسوم غير كافية، سيحسب Builder الرسوم الموصى بها
3. اضغط **"Set Hook"** لإرسال معاملة \`SetHook\`
4. تأكد أن النتيجة هي \`tesSUCCESS\` في وحدة التحكم

### الخطوة 4: الاختبار في Test

تبويب **Test** هو حيث تتحقق من أن Hook الخاص بك يعمل بشكل صحيح:

1. **نوع المعاملة**: اختر نوع المعاملة التي تريد إرسالها (Payment، OfferCreate، إلخ)
2. **Account**: مُرسِل المعاملة
3. **Sequence**: اترك Builder يملأه تلقائيا
4. **Flags**: اضبط الأعلام اللازمة للمعاملة
5. **Destination**: عنوان وجهة المعاملة
6. **Amount**: المبلغ المُرسَل ونوعه (XAH أو IOU)، إن كان ذلك مناسبا للمعاملة
7. **Fee**: اضغط **Suggest** ليحسب Builder الرسوم الموصى بها
8. **Hook parameters**: إذا كان Hook الخاص بك يستخدم parameters، اضبطها هنا (الاسم والقيمة بصيغة hex)
9. **Memos**: إذا احتاجت معاملتك memos، أضفها هنا (اختياري)
10. اضغط **Run Test**

يجب أن تراقب شاشتي **Development Log** و**Debug Stream**. في **Debug Stream** يمكنك اختيار أي جزء من السيناريو تريد مراجعته: باختيار الحساب إذا كان هناك عدة حسابات متضمّنة.

**سير الاختبار الموصى به**:

- **حالات إيجابية**: أرسل معاملات يجب أن تُقبَل وتحقق من نجاحها
- **حالات سلبية**: أرسل معاملات يجب ألا يكون لها تأثير وتحقق من ذلك
- **حالات حدّية**: اختبر بمبالغ عند الحد بالضبط، أنواع معاملات غير متوقعة، إلخ
- **حالات غير متوقعة**: اختبر معاملات لا تتوقعها في حال تعامل Hook معها بشكل غير متوقع
- **تحقق من state**: إذا كان Hook الخاص بك يستخدم \`state()\`، تحقق من حفظ القيم بشكل صحيح باستعلام \`account_objects\` أو معلومات state في Builder

مجموعة اختبارات كبيرة ومتّسقة هي المفتاح لضمان تصرف Hook الخاص بك بشكل صحيح في جميع الحالات. إذا استطعت، اطلب من أشخاص آخرين اختبار Hook الخاص بك بحالات قد لا تكون فكرت فيها.

### قيود Builder

- يعمل فقط مع **Xahau Testnet**، وليس مع Mainnet
- للتطوير الأكثر تقدما أو النشر في الإنتاج، ستحتاج بيئة محلية
- تبقى حساباتك وحالة Hooks بين الجلسات إذا لم تمسح المتصفح. هذا لا ينطبق عادة على Hooks نفسها.`,
      codeTitles: [],
      slides: [
        {
          title: "Hooks Builder — بيئة online",
          content: "• كتابة كود C\n• Compile إلى WASM\n• اختبار traces\n• نشر على testnet\n• مناسب للتعلم السريع",
        },
        {
          title: "Deploy: الحسابات والتثبيت",
          content: "تحتاج:\n\n• حساب testnet ممول\n• Hook C code\n• WASM ناتج\n• SetHook transaction\n\nاستخدم testnet فقط للتجارب.",
        },
        {
          title: "Test: تحقق من Hook",
          content: "بعد النشر:\n\n• أرسل معاملة مناسبة\n• راقب result code\n• اقرأ traces\n• تحقق من state إذا كان Hook يكتب بيانات",
        },
      ],
    },
    m8l8: {
      title: "تطوير Hooks محليا باستخدام hooks-cli",
      theory: `يعمل [Hooks Builder](?m=9&l=6) في المتصفح، وهو أسرع طريقة لتجربة Hook. أما الـ Hook الذي تحفظه في نظام إدارة الإصدارات وتراجعه وتنشره على **Xahau Mainnet**، فمكانه مشروع محلي. [hooks-cli](https://github.com/Xahau/hooks-cli) هي أداة سطر الأوامر الرسمية لذلك.

### Hooks Builder أم hooks-cli

| | Hooks Builder | hooks-cli |
|---|---|---|
| مكان الكود | داخل المتصفح | ملفات في مشروعك تحت إدارة الإصدارات |
| الترجمة | مدمجة | \`hooks-cli compile-c\`، التي ترسل ملفات C إلى خدمة ترجمة وتعيد \`.wasm\` |
| الملفات الرأسية | مجموعة خاصة به | يكتبها \`hooks-cli init\` في \`contracts/include\` |
| النشر | مدمج (testnet) | معاملة \`SetHook\` خاصة بك، كما في [الدرس 9.2](?m=9&l=1) |
| الأنسب لـ | التعلّم والاختبارات السريعة | المشاريع الحقيقية و mainnet |

لأن الترجمة تتم على الخدمة، لا تحتاج إلى تثبيت clang أو أي أدوات WebAssembly، لكن \`compile-c\` تحتاج إلى اتصال بالإنترنت.

### 1. تثبيت hooks-cli

\`\`\`bash
npm install -g @xahau/hooks-cli
\`\`\`

اسم الحزمة هو **\`@xahau/hooks-cli\`**. توجد على npm أيضًا حزمة لا علاقة لها باسم \`hooks-cli\` (بدون النطاق)، لذلك ثبّت دائمًا الاسم مع النطاق. بعد ذلك يصبح الأمر \`hooks-cli\` متاحًا في الطرفية.

### 2. إنشاء المشروع

\`\`\`bash
hooks-cli init c my-hook-project
cd my-hook-project
npm install
\`\`\`

ينشئ \`init c\` مشروعًا لـ Hooks مكتوبة بلغة C ويطبع:

\`\`\`
Created CHooks project in …/my-hook-project
Header files saved to contracts/include.
Secrets saved to .env file.
\`\`\`

- **\`Header files saved to contracts/include\`**: الملفات الرأسية لـ Hooks API (\`hookapi.h\` والملفات التي يتضمنها). تتضمنها ملفات C الخاصة بك، ويقرأها المترجم من هنا.
- **\`Secrets saved to .env file\`**: عنوان خدمة الترجمة، والشبكة، و seed تجريبي لسكربت النشر بـ TypeScript. إنه seed لـ testnet؛ لا تضع أبدًا seed لـ mainnet في هذا الملف.

يبدو المشروع هكذا:

\`\`\`
my-hook-project/
├── contracts/
│   ├── base.c           ← الـ Hook الخاص بك، بلغة C
│   └── include/         ← hookapi.h, extern.h, macro.h, sfcodes.h…
├── src/index.ts         ← سكربت نشر اختياري بـ TypeScript
├── .env                 ← خدمة الترجمة والشبكة و seed تجريبي
├── package.json
└── tsconfig.json
\`\`\`

يثبّت \`npm install\` ما يحتاجه سكربت النشر الاختياري بـ TypeScript. الترجمة لا تعتمد عليه.

### 3. الترجمة

\`\`\`bash
npm run build
# مكافئ لـ: hooks-cli compile-c contracts build/ --headers contracts/include
\`\`\`

كل ملف \`.c\` في \`contracts/\` يصبح ملف \`.wasm\` في \`build/\`: من \`contracts/base.c\` ينتج \`build/base.wasm\`. هذا الملف الثنائي هو ما تثبّته معاملة \`SetHook\`. يُطبع خطأ الترجمة مع اسم الملف ورقم السطر، ولا يُكتب \`.wasm\` لذلك الملف.

### 4. النشر

انشر ملف \`.wasm\` بمكتبة \`xahau\`، تمامًا كما في [الدرس 9.2](?m=9&l=1). تقرأ معاملة \`SetHook\` الملف وتضبط هذه الحقول:

\`\`\`javascript
const setHook = {
  TransactionType: "SetHook",
  Account: wallet.address,
  Hooks: [
    {
      Hook: {
        CreateCode: fs.readFileSync("build/base.wasm").toString("hex").toUpperCase(),
        HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
        HookCanEmit: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFBFFFFF",
        HookNamespace: crypto.createHash("sha256").update("base").digest("hex").toUpperCase(),
        HookApiVersion: 0,
        Flags: 1,
      },
    },
  ],
};
\`\`\`

| الحقل | القيمة هنا | ما يفعله |
|---|---|---|
| \`CreateCode\` | ملف \`.wasm\` بصيغة hex | كود الـ Hook. تثبيت الكود نفسه مرة أخرى يعيد استخدام النسخة المخزّنة |
| \`HookOn\` | يعمل مع **Cron** فقط | أنواع المعاملات التي تشغّل الـ Hook. أنشئه بـ [حاسبة HookOn](https://richardah.github.io/xrpl-hookon-calculator/): كل بت يمثل نوع معاملة |
| \`HookCanEmit\` | **ClaimReward** فقط | أنواع المعاملات التي يمكن للـ Hook إصدارها. يُرفض الباقي، فلا يستطيع خطأ برمجي أن يجعله يصدر Payment |
| \`HookNamespace\` | SHA-256 لـ \`"base"\` | مكان حفظ حالة الـ Hook. الـ Hooks التي تتشارك namespace تتشارك الحالة |
| \`HookApiVersion\` | \`0\` | إصدار Hooks API الذي كُتب له الكود |
| \`Flags\` | \`1\` (hsfOverride) | يستبدل أي Hook موجود في هذا الموضع |

كلا الحقلين بطول 64 حرف hex (256 بت). القيمة الزائدة أو الناقصة بحرف واحد غير صالحة، ويفشل \`SetHook\`.

### حالات يجب الانتباه لها عند الترجمة محليًا

- **الدوال المساعدة تختفي.** بعد الترجمة يُبقي \`hook-cleaner\` على \`hook()\` و \`cbak()\` فقط ويحذف أي دالة أخرى من \`.wasm\`. عندها تشير استدعاءات الدالة المساعدة إلى لا شيء ويفشل \`SetHook\` بالنتيجة \`temMALFORMED\`. علّم كل دالة مساعدة حتى ينسخها المترجم داخل من يستدعيها:

\`\`\`c
static inline __attribute__((always_inline)) int is_payment(void) { ... }
\`\`\`

- **قد لا تكون \`otxn_param\` مُصرَّحًا بها.** النسخ القديمة من ملفات Hooks الرأسية لا تصرّح بها، فيفشل Hook يقرأ معاملات المعاملة بالرسالة "call to undeclared function 'otxn_param'". أما الملفات التي يكتبها \`hooks-cli init\` (الإصدار 2.1.0) فتصرّح بها. التصريح بها بنفسك بعد include، كما يفعل Hook المعاملات في [الدرس 9.5](?m=9&l=4)، يعمل مع المجموعتين، لأن التصريح المكرر المطابق صحيح في C:

\`\`\`c
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);
\`\`\`

- **قد يغيب \`PREPARE_PAYMENT_SIMPLE\`.** تبني الأمثلة القديمة الدفعات المُصدَرة بهذا الماكرو، الذي لا تعرّفه ملفات \`hooks-cli init\` (الإصدار 2.1.0)، فتفشل ترجمتها بالرسالة "use of undeclared identifier 'PREPARE_PAYMENT_SIMPLE_SIZE'". ابنِ المعاملة يدويًا كما يفعل Hook التحويل في [الدرس 9.4](?m=9&l=3)؛ فهو يُترجم مع أي مجموعة ملفات رأسية.
- **سكربت \`deploy\` في القالب يستدعي \`yarn\`.** يعمل \`npm run build\` بـ npm وحده؛ أما \`npm run deploy\` فيحتاج إلى تثبيت yarn، أو شغّل \`npm run build\` ثم \`npx ts-node src/index.ts\`.

### المراجع والتوثيق

- **hooks-cli**: [github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli)، المستودع الرسمي مع تعليمات التثبيت والاستخدام.
- **Hooks Toolkit**: [hooks-toolkit.com](https://hooks-toolkit.com/)، أدلة ومرجع Hooks API (\`hookapi.h\`) وأمثلة وأدوات لتطوير Hooks.`,
      codeTitles: [],
      slides: [
        {
          title: "hooks-cli — تطوير محلي",
          content: "مناسب عندما تريد:\n\n• Git workflow\n• build محلي\n• scripts للنشر\n• إدارة إصدارات Hook\n• اختبارات متكررة",
        },
        {
          title: "هيكل المشروع",
          content: "مثال:\n\nsrc/\n  hook.c\nbuild/\n  hook.wasm\nscripts/\n  deploy.js\n\nاحتفظ بالكود والـ WASM منظمين.",
        },
        {
          title: "النشر والمرجع",
          content: "بعد compile:\n\n• انشر بـ SetHook\n• سجل HookHash\n• سجل الحساب والnamespace\n• وثق HookOn و HookCanEmit\n• اختبر على testnet أولا",
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
  title: "Introduction aux smart contracts dans les environnements non-EVM",
  lessons: {
    m8l1: {
      title: "Que sont les Hooks ?",
      theory: `Les **Hooks** sont le système de smart contracts natif de Xahau. Contrairement à Solidity sur Ethereum, les Hooks sont écrits en **C** et compilés en **WebAssembly (WASM)**.

### Hooks vs Smart Contracts EVM

| Caractéristique | Smart Contracts EVM | Hooks (Xahau) |
|---|---|---|
| Langage | Solidity / Vyper | C |
| Compilation | Bytecode EVM | WebAssembly (WASM) |
| Exécution | Sur l'EVM | Directement sur le nœud |
| Modèle | Invoqués activement | Exécutés de manière réactive |
| Gas/Frais | Gas variable | Frais fixes et bas |
| Stockage | Stockage illimité | État avec namespace |
| Déploiement | Transaction de création | Transaction SetHook |

### Modèle réactif

La différence la plus importante est le **modèle d'exécution** :

- Sur Ethereum, **tu appelles** le smart contract en envoyant une transaction au contrat
- Sur Xahau, les Hooks **s'exécutent automatiquement** lorsqu'une transaction passe par un compte sur lequel un Hook est installé

Les Hooks sont comme des **filtres** ou des **intercepteurs** qui réagissent aux transactions. Parmi de nombreuses options, ils peuvent :
- **Accepter** la transaction (\`accept()\`)
- **Rejeter** la transaction (\`rollback()\`)
- **Émettre** de nouvelles transactions (\`emit()\`)
- **Lire et écrire** un état persistant (\`state()\`, \`state_set()\`)

### Quelques faits intéressants

- Maximum **10 Hooks** par compte
- Chaque Hook possède son propre **namespace** pour stocker des informations, mais peut utiliser d'autres namespaces qui ne lui appartiennent pas s'il en a les permissions
- La première fois qu'un Hook est installé, le code WASM est stocké dans le ledger et un hash lui est attribué. Si un autre utilisateur souhaite installer le même Hook, il peut utiliser cet identifiant et n'a pas besoin d'accéder au code source pour l'installer.

### Fonctions obligatoires

Chaque Hook doit implémenter deux fonctions :
- \`hook(uint32_t reserved)\` — S'exécute lorsqu'une transaction atteint le compte. Obligatoire
- \`cbak(uint32_t reserved)\` — S'exécute comme callback des transactions émises par le Hook. Optionnelle

### Guard (\`_g\`)

Chaque Hook doit inclure un appel à \`_g(id, maxiter)\` pour éviter les boucles infinies. Le guard définit le nombre maximal d'itérations que le Hook peut exécuter.`,
      codeTitles: ["Hook minimal : accepte toutes les transactions", "Hook qui rejette les paiements sous un minimum"],
      slides: [["Hooks vs smart contracts EVM", "EVM : contrats appelés explicitement\nHooks : logique attachée à un compte et déclenchée par les transactions"], ["Modèle réactif et fonctions", "EVM : tu appelles le contrat\nHooks : s'exécutent automatiquement\n\n• accept() → Accepter la transaction\n• rollback() → Rejeter la transaction\n• emit() → Émettre une nouvelle transaction\n• state() / state_set() → État persistant\n\nhook() obligatoire | cbak() optionnelle | _g() guard"], ["Points clés sur les Hooks", "• WebAssembly\n• Installés avec SetHook\n• Exécutés par le protocole\n• Ressources limitées\n• Très adaptés aux règles de compte"]],
    },
    m8l2: {
      title: "Déployer un Hook sur Xahau",
      theory: `Une fois que ton Hook est écrit en C, tu dois **le compiler en WebAssembly** puis **le déployer** sur ton compte Xahau via une transaction \`SetHook\`.

### Options de développement

**1. Hooks Builder (en ligne)**
La façon la plus rapide de démarrer. [builder.xahau.network](https://builder.xahau.network) te permet d'écrire, compiler et déployer des Hooks depuis le navigateur. Il inclut des exemples, de la documentation et un environnement de développement intégré. Idéal pour des tests rapides et l'apprentissage. Disponible uniquement pour **Xahau Testnet**.

**2. Développement local**
Pour le développement local (et plus tard sur Xahau Mainnet), tu as besoin de [hooks-toolkit](https://hooks-toolkit.com/), qui inclut une bibliothèque complète pour compiler tes hooks et les déployer avec des scripts personnalisés.

### Déployer un Hook

Une fois qu'un hook est prêt à être déployé, le processus général consiste à générer une transaction \`SetHook\` avec les champs appropriés, à la signer et à l'envoyer au réseau. Le champ principal pour le code du Hook est \`CreateCode\`, où tu dois inclure le binaire WASM au format hexadécimal si c'est la première fois que ce Hook existe sur le réseau.

Des environnements de test comme [Hooks Builder](https://builder.xahau.network) te permettent de compiler le code et de l'envoyer via une interface graphique. D'autres environnements graphiques existent, aussi bien pour Xahau Testnet que pour Mainnet, qui t'obligent à utiliser ta seed pour signer la transaction de déploiement, comme [xahau-testnet.xrplwin.com/tools](https://xahau-testnet.xrplwin.com/tools). Il est recommandé de ne les utiliser qu'en environnement de test. En pratique courante, il est recommandé d'apprendre à utiliser la transaction \`SetHook\` avec des scripts personnalisés en utilisant la bibliothèque \`xahau js\`, afin de pouvoir ensuite automatiser les déploiements, les mises à jour et la gestion des Hooks en production.

### Transaction SetHook

La transaction \`SetHook\` est la seule transaction nécessaire pour gérer les Hooks. Avec elle, tu peux **installer**, **mettre à jour** et **supprimer** des Hooks de ton compte. Les principaux champs de l'objet Hook dans le tableau \`Hooks\` sont :

| Champ | Description |
|---|---|
| \`CreateCode\` | Le binaire WASM du Hook (en hexadécimal) |
| \`HookHash\` | Hash d'un Hook déjà existant dans le ledger (alternative à CreateCode) |
| \`HookOn\` | Chaîne définissant quels types de transaction activent le Hook |
| \`HookNamespace\` | Nom pour l'état du Hook (32 octets hex) |
| \`HookApiVersion\` | Version de l'API Hooks (actuellement 0) |
| \`HookParameters\` | Paramètres de configuration optionnels |
| \`HookCanEmit\` | Liste des transactions que le Hook peut émettre (sécurité) |
| \`Flags\` | Flags de contrôle (\`hsfOverride\`, \`hsfNSDelete\`, \`hsfCollect\`) |

### Phases de gestion d'un Hook

### 1. Installer un Hook pour la première fois (avec CreateCode)

Quand tu déploies un nouveau Hook qui n'a jamais existé sur le réseau, tu utilises le champ \`CreateCode\` avec le binaire WASM complet. Le nœud calcule le hash du WASM et stocke le code dans le ledger. Si un autre utilisateur a déjà déployé exactement le même code, Xahau réutilise la définition existante (déduplication automatique).

\`\`\`
Hook: {
  CreateCode: "0061736D...",     // WASM en hex
  HookOn: "0000000000000000",    // Tous les types de tx
  HookNamespace: "00...00",      // 64 caractères hex
  HookApiVersion: 0,
  Flags: 1,                      // hsfOverride
}
\`\`\`

### 2. Installer un Hook existant par HookHash

Si un Hook a déjà été déployé auparavant (par toi ou par un autre compte), tu peux l'installer sur ton compte **sans renvoyer tout le WASM**. Tu as seulement besoin du \`HookHash\` (le hash SHA-256 du binaire). Cela économise de l'espace et des frais.

\`\`\`
Hook: {
  HookHash: "A5B6C7D8...",      // Hash du Hook existant
  HookOn: "0000000000000000",
  HookNamespace: "00...00",
  Flags: 1,                      // hsfOverride
}
\`\`\`

Tu peux obtenir le \`HookHash\` en interrogeant les Hooks d'un compte avec \`account_objects\` ou depuis un explorateur de blocs comme [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com).

### 3. Mettre à jour un Hook (opération Update)

L'opération de mise à jour se déclenche lorsque le Hook existe déjà à cette position, qu'**aucun** \`HookHash\` ni \`CreateCode\` n'est envoyé, et qu'au moins un de ces champs est inclus : \`HookNamespace\`, \`HookParameters\` ou \`HookGrants\`. Cela permet de modifier la configuration du Hook **sans remplacer le code WASM**.

**Ce que tu peux modifier** :

- **HookNamespace** : Si tu envoies un \`HookNamespace\` différent de l'actuel, le namespace du Hook est mis à jour. Si tu inclus aussi le flag \`hsfNSDelete\` (valeur 2), **toutes les entrées d'état de l'ancien namespace sont supprimées**.
- **HookParameters** : Pour chaque entrée dans \`HookParameters\` :
  - Si tu envoies un paramètre avec un nom et **sans valeur**, ce paramètre est **supprimé** du Hook
  - Si tu envoies un paramètre avec un nom **et une valeur**, ce paramètre est **ajouté ou mis à jour**
- **HookGrants** : Si tu inclus \`HookGrants\`, le tableau complet des grants du Hook est **remplacé** par le nouveau tableau fourni

\`\`\`
// Exemple : mettre à jour uniquement les paramètres d'un Hook existant
Hook: {
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "4D494E",        // "MIN"
        HookParameterValue: "00E1F505"      // Nouvelle valeur
      }
    },
    {
      HookParameter: {
        HookParameterName: "4D4158",        // "MAX" — suppression
        // Pas de HookParameterValue = supprimé
      }
    }
  ]
}
\`\`\`

**Pour remplacer complètement un Hook** par un autre code WASM, envoie un nouveau \`SetHook\` avec \`CreateCode\` (ou \`HookHash\`) à la même position et le flag \`hsfOverride\` (valeur 1). L'état précédent du Hook est **conservé** si le namespace ne change pas.

### 4. Supprimer un Hook (opération Delete)

Pour supprimer un Hook d'une position, ces conditions doivent être remplies : le Hook doit exister à cette position, le flag \`hsfOverride\` doit être actif, **aucun** \`HookHash\` n'est envoyé, et \`CreateCode\` doit être présent mais **vide** :

\`\`\`
Hook: {
  CreateCode: "",       // Vide = suppression
  Flags: 1,             // hsfOverride
}
\`\`\`

Lors de la suppression :
- Le **compteur de références** du \`HookDefinition\` est décrémenté. S'il atteint zéro (aucun autre compte n'utilise ce code), la définition est retirée du ledger
- L'objet Hook à cette position est **supprimé**, laissant la position vide

Si tu veux aussi **nettoyer tout l'état** du namespace de ce Hook, ajoute le flag \`hsfNSDelete\` (valeur 2) combiné avec \`hsfOverride\` : \`Flags: 3\`. Cela supprimera toutes les entrées \`HookState\` du namespace associé.

### Flags de SetHook

| Flag | Valeur | Description |
|---|---|---|
| \`hsfOverride\` | 1 | Permet de remplacer ou supprimer un Hook existant à cette position |
| \`hsfNSDelete\` | 2 | Supprime tout l'état du namespace lors de la désinstallation |
| \`hsfCollect\` | 4 | Autorise l'exécution en tant que weakTSH |

### HookOn : filtre de transactions

Le champ \`HookOn\` contrôle sur quels types de transaction le Hook s'active :
- Tu peux configurer des bits spécifiques pour activer ou désactiver des types avec cette [calculatrice](https://richardah.github.io/xrpl-hookon-calculator/)
- Si nous ne marquons l'activation que sur les transactions de paiement, le Hook ne s'exécutera que lorsque le compte reçoit ou envoie un paiement. Le résultat dans la calculatrice est \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. Nous devons retirer la partie \`0x\` et convertir le résultat en majuscules pour l'utiliser dans le champ HookOn. Par exemple : \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Plusieurs transactions peuvent être marquées à la fois. Il est recommandé d'être prudent en configurant HookOn afin de ne pas activer le Hook sur des types de transaction dont tu n'as pas besoin, car cela peut générer des frais inutiles et augmenter le risque d'actions inattendues.

### HookCanEmit : contrôle de l'émission de transactions

Le champ \`HookCanEmit\` est un mécanisme de sécurité fondamental qui limite les transactions qu'un Hook peut émettre. Par défaut, un Hook a la capacité d'émettre des transactions autonomes (via la fonction \`emit()\`), ce qui pourrait représenter un risque si le Hook a un bug ou a été installé sans revue de son code.

\`HookCanEmit\` est un tableau qui définit explicitement les types de transaction que le Hook peut émettre. S'il est configuré, le Hook **ne pourra émettre que les transactions listées**, toute tentative d'émettre un type non inclus sera rejetée par le réseau. Il fonctionne comme \`HookOn\`, mais au lieu de contrôler l'activation du Hook, il contrôle sa capacité d'émission.

- Tu peux configurer des bits spécifiques pour activer ou désactiver des types avec cette même [calculatrice](https://richardah.github.io/xrpl-hookon-calculator/)
- Si nous n'autorisons que l'émission de transactions de paiement, le résultat dans la calculatrice est \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. Nous devons retirer la partie \`0x\` et convertir le résultat en majuscules pour l'utiliser dans le champ \`HookCanEmit\`. Par exemple : \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Bien que \`HookCanEmit\` soit un champ optionnel, il est recommandé de l'utiliser pour empêcher un Hook d'émettre des transactions indésirables, car cela peut générer des actions indésirables de la part d'un Hook malveillant.

**Pourquoi est-ce important pour la sécurité ?**

- **Principe du moindre privilège** : Un Hook ne devrait avoir que les permissions dont il a besoin. Si ton Hook n'a besoin que d'envoyer des paiements, il ne devrait pas pouvoir émettre \`SetHook\`, \`AccountDelete\` ou d'autres transactions sensibles.
- **Protection contre les bugs** : Si un Hook a une vulnérabilité, \`HookCanEmit\` limite les dégâts potentiels en restreignant les actions qu'il peut exécuter.
- **Audit et transparence** : Lors de la revue d'un Hook installé sur un compte, \`HookCanEmit\` permet de vérifier rapidement quelles opérations il peut effectuer de façon autonome.
- **Bonne pratique** : Configure toujours \`HookCanEmit\` avec l'ensemble minimal de transactions nécessaires à la logique de ton Hook.

### Plus d'informations

Pour une référence complète de \`SetHook\`, incluant tous les champs, flags, règles de validation et cas particuliers, consulte la [documentation officielle](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/).`,
      codeTitles: ["Déployer un Hook depuis un fichier .wasm avec xahau.js", "Supprimer un Hook d'un compte avec xahau.js", "Installer un Hook par HookHash avec xahau.js", "Vérifier les Hooks installés sur un compte"],
      slides: [["SetHook : champs principaux", "Transaction unique pour gérer les Hooks\n\n• CreateCode : WASM en hex\n• HookHash : installer un Hook existant par hash\n• HookOn : filtre de transactions\n• HookNamespace : isolation de l'état\n• HookParameters : configuration sans recompiler\n• HookCanEmit : contrôle des émissions (sécurité)\n• Flags : hsfOverride | hsfNSDelete | hsfCollect"], ["4 phases de gestion d'un Hook", "Compiler\nInstaller\nTester\nMettre à jour ou supprimer\n\nChaque étape doit être testée sur testnet."], ["HookOn et HookCanEmit", "HookOn définit les transactions observées\nHookCanEmit définit les émissions autorisées\n\nCes limites réduisent les surprises au runtime."]],
    },
    m8l3: {
      title: "État persistant dans les Hooks",
      theory: `Les Hooks peuvent stocker des **données persistantes** entre les exécutions grâce au système d'état (\`state\`). Cela permet à un Hook de disposer d'informations avec lesquelles travailler dans un ou plusieurs \`Namespace\`.

### Structure de l'état

Le Namespace est identifié par 32 octets (256 bits) en hexadécimal. L'état est organisé en paires **clé-valeur** :

- **Clé** : 32 octets (256 bits). Si ta clé est plus courte, elle est complétée par des zéros
- **Valeur** : jusqu'à 256 octets par entrée
- Chaque entrée d'état est identifiée par sa clé au sein d'un **Namespace**

### Limitations

- Un compte peut stocker un maximum de 256 namespaces.
- Le nombre d'enregistrements clé-valeur dépend de tes réserves de XAH.

### Fonctions d'état

Voici quelques fonctions que nous pouvons utiliser pour lire ou écrire des informations dans un \`Namespace\`.

- [state()](https://xahau.network/docs/hooks/functions/state/state/) : Lit une valeur de l'état à partir d'une clé
- [state_set()](https://xahau.network/docs/hooks/functions/state/state_set/) : Écrit une valeur dans l'état pour une clé
- [state_foreign()](https://xahau.network/docs/hooks/functions/state/state_foreign/) : Lit l'état d'un \`Namespace\` qui n'est pas le sien.
- [state_foreign_set()](https://xahau.network/docs/hooks/functions/state/state_foreign_set/) : Écrit une valeur dans l'état d'un \`Namespace\` qui n'est pas le sien.

### Usages pratiques de l'état

- **Compteurs** : compter les transactions traitées, les paiements reçus, etc.
- **Listes blanches/noires** : stocker des adresses autorisées ou bloquées
- **Configuration** : sauvegarder des paramètres que le Hook consulte à chaque exécution
- **Suivi (tracking)** : enregistrer la dernière transaction traitée, des timestamps, etc.
- **Accumulateurs** : additionner des montants, calculer des moyennes, tenir des soldes internes`,
      codeTitles: ["Hook qui compte les paiements traités"],
      slides: [["Système d'état des Hooks", "state() lit une valeur\nstate_set() écrit une valeur\n\nL'état persiste entre les transactions."], ["Namespace et isolation", "Le namespace sépare les données\n\nDeux Hooks ne doivent pas se marcher dessus si leurs namespaces sont bien choisis."], ["Usages pratiques de l'état", "Compteurs, quotas, paramètres, listes simples, progression de programmes de récompense."]],
    },
    m8l4: {
      title: "Émettre des transactions depuis un Hook",
      theory: `L'une des capacités les plus puissantes des Hooks est la possibilité d'**émettre de nouvelles transactions** de manière autonome. Lorsqu'un Hook émet une transaction, celle-ci s'exécute comme si le compte du Hook l'avait envoyée.

### La fonction emit()

La fonction \`emit()\` permet à un Hook de créer et d'envoyer une **transaction émise (etxn)**. Ces transactions :
- Sont créées par le Hook, et non par un utilisateur
- S'exécutent de manière autonome sur le ledger
- Peuvent être des paiements, des offres, ou tout autre type de transaction pris en charge

### Réserver de l'espace avec etxn_reserve()

Avant d'émettre, tu dois **réserver** le nombre de transactions que tu vas émettre lors de cette exécution :

\`\`\`
etxn_reserve(1);  // Réserver l'espace pour 1 émission
\`\`\`

Ceci est obligatoire. Si tu essaies d'émettre sans réserver, le Hook échouera.

### Étapes pour émettre

1. **\`etxn_reserve(N)\`** : Réserver l'espace pour N émissions
2. **Construire la transaction** : Remplir un buffer avec les champs de la transaction sérialisée
3. **\`etxn_details()\`** : Préparer les détails d'émission (génère le hash d'émission)
4. **\`emit()\`** : Envoyer la transaction au ledger

### La fonction cbak()

Lorsqu'une transaction émise **se termine** (avec succès ou échec), Xahau appelle la fonction \`cbak()\` du Hook qui l'a émise :

- \`cbak()\` reçoit des informations sur le résultat de l'émission
- Tu peux utiliser \`cbak()\` pour mettre à jour l'état, enregistrer des résultats, ou effectuer des actions supplémentaires
- Si tu n'as rien à faire, \`cbak()\` peut simplement retourner 0

### Cas d'usage

- **Auto-forwarding** : transférer automatiquement un pourcentage de chaque paiement reçu
- **Splitting** : diviser un paiement entrant entre plusieurs comptes
- **Remboursements** : renvoyer les paiements qui ne remplissent pas certaines conditions
- **Actions planifiées** : émettre des transactions en fonction de conditions d'état

### Limitations

- Il existe un **nombre maximum d'émissions par exécution** du Hook
- Les transactions émises ont **leurs propres exigences de frais**
- Les émissions augmentent la charge de calcul du Hook

### Construire le Payment émis

Les anciens exemples construisent la transaction avec la macro \`PREPARE_PAYMENT_SIMPLE\`. Les en-têtes écrits aujourd'hui par \`hooks-cli init\` (version 2.1.0) ne l'incluent pas : le Hook de transfert construit donc son Payment à la main, avec des fonctions que tous les jeux d'en-têtes déclarent. Le faire à la main montre aussi exactement ce que contient une transaction émise :

| Champ | Octets | Valeur | Pourquoi |
|---|---|---|---|
| TransactionType | 3 | 0 (Payment) | Le type de transaction |
| Flags | 5 | tfCanonical | Le flag standard de format de signature canonique |
| Sequence | 5 | 0 | Une transaction émise n'utilise pas le Sequence du compte |
| FirstLedgerSequence, LastLedgerSequence | 6 + 6 | le ledger suivant, puis 4 de plus | La fenêtre dans laquelle le réseau peut l'appliquer |
| Amount | 9 | 10 % du paiement, en drops | Le bit 62 marque un montant natif positif |
| Fee | 9 | \`etxn_fee_base()\` | Connu seulement une fois la transaction complète, donc écrit en dernier |
| SigningPubKey | 35 | vide | Les transactions émises ne sont pas signées : leur autorité est le Hook qui les émet |
| Account, Destination | 22 + 22 | le compte du Hook, \`forward_to\` | Qui paie et qui reçoit |
| EmitDetails | 116 | écrit par \`etxn_details()\` | Relie la transaction émise à celle qui l'a déclenchée |

Les champs doivent être dans l'**ordre canonique** : par code de type, puis par code de champ. C'est l'ordre du tableau, et celui dans lequel le ledger les sérialise.

**Cas à surveiller : la taille du buffer.** \`EmitDetails\` occupe 116 octets, ou 138 quand le Hook a un \`cbak()\`. \`etxn_details()\` refuse un buffer plus petit et renvoie une erreur ; le Hook fait alors un rollback au lieu d'émettre. C'est pourquoi \`TX_SIZE\` vaut \`FIELDS_SIZE + 116\` : ajoute un \`cbak()\` à ce Hook et il doit passer à 138.

Résultat sur le testnet, en payant 10 XAH à un compte où le Hook est installé (installé comme dans la [leçon 9.2](?m=9&l=1), avec \`forward_to\` réglé sur un second compte) :

\`\`\`
TransactionResult: tesSUCCESS
HookResult:        3
HookReturnString:  forwarder: 10% resent correctly
HookEmitCount:     1
forward_to balance: +1 XAH
\`\`\`

- **\`tesSUCCESS\`** : le paiement entrant a été appliqué.
- **\`HookResult: 3\`** : le Hook s'est terminé par \`accept()\`. Un \`rollback()\` aurait rejeté tout le paiement.
- **\`HookEmitCount: 1\`** : le Hook a émis une transaction. Elle est appliquée dans un ledger ultérieur, pas à l'intérieur du paiement entrant.
- **\`+1 XAH\`** : exactement 10 % de 10 XAH sont arrivés à \`forward_to\`. Les frais de la transaction émise sont payés par le compte du Hook.

### Liens utiles

- [Xahau Hooks 101](https://github.com/Handy4ndy/XahauHooks101) : Une collection de hooks basiques pour apprendre à programmer des Hooks, incluant plusieurs exemples d'émission par [@handy_andy](https://x.com/Handy_4ndy).
- [Xahau Hook Tx Builder](https://tx-builder.xahau.tools/) : Un traducteur de transactions JSON vers le langage C pour les Hooks par [@_tequ_](https://x.com/_tequ_).`,
      codeTitles: ["Hook qui transfère 10 % de chaque paiement reçu"],
      slides: [["emit() - transactions autonomes", "emit() prépare une transaction générée par le Hook\n\nLe protocole applique des limites strictes."], ["Flux d'émission", "Transaction entrante → Hook → décision → émission → validation selon les règles du réseau"], ["Cas d'usage et limites", "Cashback, routage, frais, automatisation\n\nMais attention aux coûts, permissions et cas d'échec."]],
    },
    m8l5: {
      title: "Paramètres, fonctions et gestion des Hooks",
      theory: `Le comportement d'un Hook peut dépendre de données qui arrivent avec chaque transaction, pas seulement de son code. Ces données voyagent dans des **paramètres** : des paires nom/valeur, toutes deux en hex. Il en existe deux sortes, qui répondent à des questions différentes :

| | Paramètres du Hook (\`hook_param()\`) | Paramètres de la transaction (\`otxn_param()\`) |
|---|---|---|
| **Définis dans** | Le \`SetHook\` qui installe le Hook | Le champ \`HookParameters\` de chaque transaction |
| **Définis par** | Celui qui installe le Hook | Celui qui envoie la transaction |
| **Changent** | Seulement quand le Hook est réinstallé | À chaque transaction |
| **À utiliser pour** | La configuration : limites, adresses, frais | Des instructions : un mode d'opération, une référence, un code |

Cette leçon traite des paramètres de transaction : l'expéditeur dit au Hook quoi faire de ce paiement précis.

### Lire un paramètre avec otxn_param()

\`\`\`c
int64_t otxn_param(
    uint32_t write_ptr,  // buffer the value is written to
    uint32_t write_len,  // size of that buffer
    uint32_t read_ptr,   // the parameter's name
    uint32_t read_len    // length of the name
);
\`\`\`

Elle cherche le nom dans les \`HookParameters\` de la transaction qui a déclenché le Hook et copie la valeur dans ton buffer. La valeur de retour indique ce qui s'est passé :

- **Positive** : le nombre d'octets écrits. Utilise-la comme longueur de la valeur, pas la taille du buffer : le reste du buffer reste à zéro.
- **Négative** : le paramètre est absent, ou le buffer est trop petit pour lui. Le Hook doit gérer ce cas ; la transaction peut tout simplement ne pas contenir le paramètre.

Les noms et valeurs sont comparés octet par octet : \`ACTION\` et \`action\` sont des noms différents.

### Essaie

L'onglet Code contient les deux côtés : un Hook qui lit le paramètre \`ACTION\` et le trace, et \`send-parameters.js\`, qui envoie un Payment de 1 XAH portant \`ACTION = hello\`.

1. Compile le Hook et installe-le sur un compte, déclenché par les Payments, comme dans la [leçon 9.2](?m=9&l=1) (ou avec hooks-cli, [leçon 9.8](?m=9&l=7)).
2. Ouvre le debug stream du compte du Hook, puis envoie le paiement en passant le compte du Hook en argument :

\`\`\`bash
hooks-cli debug "Hook" <HookAccount>     # terminal 1 : le debug stream du Hook
node send-parameters.js <HookAccount>   # terminal 2 : envoie un Payment avec ACTION = hello
\`\`\`

Le debug stream reçoit la sortie de \`trace()\` ; la [leçon 9.6](?m=9&l=5) le présente, et Hooks Builder affiche le même flux dans le navigateur. Sans adresse valide, \`send-parameters.js\` s'arrête avant d'envoyer quoi que ce soit et indique quoi passer.

### Ce que signifie la sortie

\`send-parameters.js\` sur le testnet :

\`\`\`
Sending Payment with HookParameters...
  Param name (hex):  414354494F4E  = ACTION
  Param value (hex):  68656C6C6F
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: parameter read and plotted
\`\`\`

- **\`414354494F4E\`** : « ACTION » en hex. \`68656C6C6F\` vaut « hello ».
- **\`Result: tesSUCCESS\`** : le paiement a été appliqué, et le Hook s'est exécuté pendant celui-ci.
- **\`Hook result: 3 | …\`** : lu dans les métadonnées de la transaction. \`3\` signifie que le Hook s'est terminé par \`accept()\`, et le texte est la chaîne passée à \`accept()\`. C'est ainsi qu'un script vérifie ce qu'a fait un Hook sans regarder le debug stream.

Le debug stream du même paiement (préfixes raccourcis) :

\`\`\`
HookTrace: otxn_param_demo: hook() initiated:
HookTrace: param_name: 414354494F4E
HookTrace: value_len: 5
HookTrace: param_value: 68656C6C6F000000000000000000000000000000000000000000000000000000
HookTrace: otxn_param_demo: ACTION value (text): : hello
HookTrace: otxn_param_demo: ACTION value (hex): : 68656C6C6F
HookInfo: ACCEPT RS: 'otxn_param_demo: parameter read and plotted'
\`\`\`

- **\`param_name: 414354494F4E\`** : \`TRACEHEX\` du nom recherché.
- **\`value_len: 5\`** : \`otxn_param()\` a trouvé le paramètre et écrit 5 octets.
- **\`param_value: 68656C6C…0000\`** : \`TRACEHEX\` affiche tout le buffer de 32 octets, zéros compris. C'est pourquoi le Hook trace la valeur avec \`value_len\`.
- **\`(text): hello\` et \`(hex): 68656C6C6F\`** : les mêmes 5 octets, en texte et en hex.
- **\`ACCEPT RS: …\`** : le Hook a accepté la transaction avec cette chaîne de retour.

### Cas à surveiller

- **Le paramètre manque.** Un paiement sans \`HookParameters\` fait renvoyer à \`otxn_param()\` une valeur négative, et ce Hook accepte en donnant la raison au lieu de lire un buffer vide. Sur le testnet :

\`\`\`
Result: tesSUCCESS
Hook result: 3 | otxn_param_demo: no ACTION parameter
\`\`\`

- **\`TRACEVAR\` sur un tableau affiche son adresse.** \`TRACEVAR(param_name)\` affiche un nombre comme \`66744\` : l'adresse mémoire du buffer, pas son contenu. Utilise \`TRACEVAR\` pour les nombres (comme \`value_len\`) et \`TRACEHEX\` pour les buffers.
- **La même exécution peut apparaître plusieurs fois dans le debug stream.** Un nœud applique une transaction plus d'une fois avant que son ledger soit validé. Seul compte le résultat validé, celui des métadonnées.
- **Les anciens en-têtes ne déclarent pas \`otxn_param\`.** Le Hook la déclare lui-même après l'include, ce qui fonctionne avec n'importe quel jeu d'en-têtes (la [leçon 9.8](?m=9&l=7) explique pourquoi).

### Ressources

- [HookOn Calculator](https://richardah.github.io/xrpl-hookon-calculator/): calcule les champs HookOn et HookCanEmit
- [HEX Visualizer](https://transia-rnd.github.io/xrpl-hex-visualizer/): convertit du texte en hex et inversement, dans plusieurs formats
- [Time Visualizer](https://transia-rnd.github.io/xrpl-time-visualizer/): convertit entre le format de temps de Xahau (Ripple Epoch) et des dates lisibles
- [Hooks Services](https://hooks.services/): convertisseurs de valeurs et de formats utilisés par les Hooks
- [Transaction Builder](https://tx-builder.xahau.tools/): génère le code C d'une transaction à émettre à partir de son JSON
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools): outils visuels pour installer et gérer des Hooks`,
      codeTitles: ["Hook qui lit un otxn_param et l'affiche avec TRACE", "Envoyer une transaction avec HookParameters depuis JavaScript"],
      slides: [["hook_param vs otxn_param", "Deux systèmes de paramètres différents :\n\nhook_param() — configuration statique\n• Défini dans SetHook à l'installation\n• Stocké avec le Hook dans le ledger\n• Change seulement lors de la mise à jour du Hook\n• Idéal pour des seuils, adresses fixes\n\notxn_param() — données dynamiques\n• Arrive dans la transaction qui active le Hook\n• Envoyé par l'expéditeur de chaque tx\n• Change à chaque exécution\n• Idéal pour instructions, modes, références"], ["otxn_param : signature et valeurs de retour", "int64_t otxn_param(\n  write_ptr, write_len,  // buffer de sortie\n  read_ptr,  read_len    // nom du param\n);\n\nValeurs de retour :\n• > 0 → octets écrits (trouvé)\n• DOESNT_EXIST → absent de la tx\n• TOO_SMALL → nom vide\n• TOO_BIG → nom > 32 octets\n• OUT_OF_BOUNDS → pointeurs invalides\n\nNom et valeur en HEX dans la transaction"], ["Namespace et ressources", "HookNamespace (32 octets hex) :\n• Namespace différent = état isolé\n• Même namespace = état partagé\n• SHA-256 du nom → namespace unique\n\nRessources :\n• hooks.services → chaîne ↔ hex\n• HookOn calculator\n• Convertisseur de temps (Ripple Epoch)\n• tx-builder.xahau.tools → C depuis JSON"]],
    },
    m8l6: {
      title: "Tracing et débogage des Hooks",
      theory: `Un Hook s'exécute dans chaque nœud qui traite la transaction, dans un sandbox WebAssembly, sans console et sans débogueur à connecter. Pour savoir ce qu'a fait un Hook, tu as deux sources :

- **Les métadonnées de la transaction.** Chaque exécution laisse un enregistrement \`HookExecution\` : comment le Hook s'est terminé, avec quel message et quel code. Il est dans le ledger, et n'importe quel nœud le renvoie.
- **Les messages de trace.** \`trace()\`, \`trace_num()\` et \`trace_float()\` écrivent des lignes dans le debug stream du nœud pendant l'exécution du Hook. Elles montrent des valeurs intermédiaires et ne sont pas enregistrées dans le ledger.

Commence par les métadonnées : elles répondent à la plupart des questions. Ajoute des traces quand tu as besoin de voir à l'intérieur du Hook.

### Ce qu'enregistrent les métadonnées

Le Hook d'exemple de cette leçon accepte les paiements en XAH et rejette tout le reste. Résultat sur le testnet, en lui payant 12 XAH (installé comme dans la [leçon 9.2](?m=9&l=1)) :

\`\`\`
TransactionResult:    tesSUCCESS
HookResult:           3
HookReturnString:     debug_demo:ok
HookReturnCode:       43
HookInstructionCount: 94
\`\`\`

- **\`HookResult\`** : comment le Hook s'est terminé. \`3\` correspond à \`accept()\` ; \`2\` à \`rollback()\`, et la transaction échoue alors avec \`tecHOOK_REJECTED\`.
- **\`HookReturnString\`** : le message passé à \`accept()\` ou \`rollback()\`. Les métadonnées le stockent en hex. Une fois décodé, il se termine par un octet nul, car \`SBUF()\` compte le terminateur de la chaîne.
- **\`HookReturnCode\`** : le nombre passé en second argument, en hex. \`0x43\` vaut 67 : la ligne du dernier \`accept()\` du fichier, car le Hook passe \`__LINE__\`. Avec \`__LINE__\` dans chaque \`accept()\` et \`rollback()\`, le code t'indique par où le Hook est sorti.
- **\`HookInstructionCount\`** : le nombre d'instructions WebAssembly exécutées (\`0x94\` = 148).

Un rejet est enregistré de la même façon. Le Hook \`min_payment\` de la [leçon 9.1](?m=9&l=0), payé 5 XAH, donne \`tecHOOK_REJECTED\`, \`HookResult: 2\` et son message de rejet.

Pour lire ces champs depuis un script, interroge la transaction et décode la chaîne :

\`\`\`js
const { result } = await client.request({ command: "tx", transaction: hash });
const run = result.meta.HookExecutions[0].HookExecution;
console.log(run.HookResult, Buffer.from(run.HookReturnString, "hex").toString());
\`\`\`

### Les fonctions de trace

Les métadonnées disent comment le Hook s'est terminé, pas ce qu'il a vu en chemin. Pour cela, le Hook écrit des lignes de trace. Tracer ne change ni le résultat ni le ledger. Les trois fonctions, telles que \`extern.h\` les déclare :

\`\`\`c
int64_t trace(uint32_t mread_ptr, uint32_t mread_len,
              uint32_t dread_ptr, uint32_t dread_len, uint32_t as_hex);
int64_t trace_num(uint32_t read_ptr, uint32_t read_len, int64_t number);
int64_t trace_float(uint32_t read_ptr, uint32_t read_len, int64_t float1);
\`\`\`

Chacune reçoit un libellé sous forme de pointeur et de longueur. \`SBUF(x)\` produit les deux, c'est pourquoi les appels paraissent courts.

**\`trace()\`** écrit le libellé et un buffer de données. Avec \`as_hex\` à \`1\`, les données apparaissent en hex : c'est ainsi qu'on lit des valeurs binaires comme un AccountID, que tu peux ensuite comparer avec ce qu'affiche un explorateur. Pour un simple message, ne passe aucune donnée :

\`\`\`c
trace(SBUF("debug_demo:hook() initiated"), 0, 0, 0);

uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);
\`\`\`

**\`trace_num()\`** écrit le libellé et un entier de 64 bits : montants en drops, compteurs et valeurs de retour des fonctions de la Hook API. Ces fonctions renvoient un nombre négatif en cas d'erreur : tracer le résultat de \`state_set()\` ou d'\`emit()\` montre donc un échec qui passerait sinon inaperçu :

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("debug_demo:drops received: "), drops);
\`\`\`

**\`trace_float()\`** écrit un nombre en XFL, le format à virgule flottante qu'utilisent les Hooks pour les montants non entiers. \`float_set(exposant, mantisse)\` en construit un : \`float_set(-6, drops)\` est le montant en XAH.

\`\`\`c
trace_float(SBUF("debug_demo:XAH received: "), float_set(-6, drops));
\`\`\`

### Où apparaissent les traces

Les traces vont dans le debug stream du nœud, pas dans la transaction. Sur le testnet, ouvre le **Debug Stream** de Hooks Builder, sélectionne le compte du Hook, puis envoie la transaction : les lignes apparaissent pendant que le nœud la traite. Sur ton propre nœud, elles apparaissent dans son journal.

Un Hook qui se termine par \`rollback()\` écrit aussi ses traces : le debug stream est donc l'endroit où voir les valeurs qui ont mené à un rejet.

### Les macros de débogage

\`hookapi.h\` inclut \`macro.h\`, qui définit quatre macros autour des fonctions de trace. Chacune utilise le nom de la variable comme libellé : \`TRACEVAR(drops)\` écrit \`drops\` et sa valeur sans que tu tapes le libellé :

| Macro | Fonction appelée | Pour |
|---|---|---|
| \`TRACEVAR(v)\` | \`trace_num()\` | Entiers : drops, compteurs, codes de retour |
| \`TRACEHEX(v)\` | \`trace(…, 1)\` | Buffers binaires : AccountIDs, hashes, clés |
| \`TRACEXFL(v)\` | \`trace_float()\` | Montants XFL |
| \`TRACESTR(v)\` | \`trace(…, 0)\` | Buffers de texte : paramètres, memos |

Les macros n'agissent que si \`DEBUG\` vaut \`1\`. \`macro.h\` fixe \`DEBUG\` à partir de \`NDEBUG\` : sans \`NDEBUG\`, il vaut \`1\`. Pour compiler sans elles, définis \`NDEBUG\` avant d'inclure l'en-tête :

\`\`\`c
#define NDEBUG        // DEBUG = 0 : les macros TRACE ne font rien
#include "hookapi.h"
\`\`\`

Avec \`DEBUG\` à \`0\`, \`if (DEBUG)\` est toujours faux et le compilateur retire ces appels du WASM. Les appels directs à \`trace()\`, \`trace_num()\` et \`trace_float()\` ne sont pas concernés : retire-les toi-même.

### Les traces et le Mainnet

Chaque appel de trace est du code exécuté : il agrandit le WASM et allonge l'exécution. Garde les traces pendant tes tests sur le testnet. Avant d'installer le Hook sur le Mainnet, définis \`NDEBUG\` et retire les appels de trace directs. Garde les codes \`__LINE__\` : ils n'ajoutent rien à l'exécution et gardent les métadonnées utiles.`,
      codeTitles: ["Hook instrumenté avec toutes les fonctions trace"],
      slides: [[`Métadonnées et traces`, `Métadonnées (dans le ledger, toujours) :
• HookResult : 3 = accept, 2 = rollback
• HookReturnString : le message de sortie
• HookReturnCode : le code de sortie, en hex

Traces (debug stream, pendant les tests) :
• Les valeurs que le Hook a vues en chemin
• Non enregistrées dans le ledger`], [`Les trois fonctions trace*`, `trace(SBUF("libellé"), 0, 0, 0);
→ Un message

trace(SBUF("libellé"), SBUF(buf), 1);
→ Libellé + buffer en hex

trace_num(SBUF("libellé"), n);
→ Libellé + entier (drops, valeurs de retour)

trace_float(SBUF("libellé"), xfl);
→ Libellé + montant XFL`], [`Habitudes de débogage`, `• __LINE__ dans accept/rollback → la ligne de sortie dans HookReturnCode
• trace_num du retour de chaque appel à la Hook API
  (négatif = erreur)
• Lis les traces dans Hooks Builder → Debug Stream
• Macros TRACE : désactivées avec #define NDEBUG
• Avant le Mainnet : NDEBUG, et retire les appels de trace directs`]],
    },
    m8l7: {
      title: "Hooks Builder : développement en ligne",
      theory: `[Hooks Builder](https://builder.xahau.network) est l'environnement de développement en ligne pour les Hooks sur **Xahau Testnet**. Il te permet d'écrire, compiler, déployer et tester des Hooks directement depuis le navigateur, sans rien installer sur ta machine. **Remarque :** pense à sauvegarder ta progression et tes seeds avant de fermer le navigateur, car elles peuvent ne pas être conservées après la fermeture de la session.

### Onglets principaux

Le Builder a trois onglets principaux qui couvrent tout le flux de développement :

- **Develop** : écrire et compiler des Hooks en C
- **Deploy** : gérer les comptes et déployer les Hooks
- **Test** : générer des transactions de test et consulter les logs

### Étape 1 : gérer les comptes dans Deploy

Avant de développer, tu as besoin d'au moins un compte testnet. Dans l'onglet **Deploy** :

**Créer un nouveau compte**
1. Clique sur **"Generate Account"** ou le bouton de création de compte
2. Le Builder génère automatiquement une paire de clés (adresse + seed) et finance le compte en XAH testnet via le faucet
3. Sauvegarde la seed dans un endroit sûr, tu en auras besoin si tu fermes le navigateur

**Importer un compte existant**
1. Clique sur **"Import Account"** ou le bouton d'import
2. Saisis la **seed** (secret) de ton compte testnet
3. Le compte apparaîtra dans la liste avec son solde et ses Hooks installés

Il est recommandé d'avoir au moins **deux comptes** : un pour installer le Hook et un autre pour lui envoyer des transactions de test. **N'utilise pas de seeds de comptes Xahau Mainnet dans le Builder pour des raisons de sécurité** ; si tu as besoin d'une nouvelle seed, génère-la dans le Builder ou visite [xahau-test.net](https://xahau-test.net/).

### Étape 2 : développer et compiler dans Develop

Dans l'onglet **Develop** :

1. **Sélectionne un exemple** dans le menu latéral ou crée un nouveau fichier
2. **Écris ton Hook en C**, l'éditeur propose la coloration syntaxique et l'autocomplétion de base
3. Clique sur **"Compile To WASM"** pour compiler le code C en WebAssembly
4. En cas d'erreurs, elles apparaissent dans la console en bas, vérifie la ligne et le message d'erreur
5. Si la compilation réussit, tu reçois le message \`File xxxx.c compiled successfully. Ready to deploy.Go to deploy\`. Le WASM résultant est prêt à être déployé

**Astuces** :
- Commence avec les exemples inclus pour te familiariser avec l'API
- Les erreurs de compilation les plus courantes : oublier d'inclure \`hookapi.h\`, ne pas déclarer le guard \`_g()\`, ou des erreurs de type dans les fonctions de l'API

### Étape 3 : déployer dans Deploy

Une fois ton Hook compilé, reviens à l'onglet **Deploy** :

1. **Sélectionne le compte** où tu veux installer le Hook et clique sur **Set Hook** pour ouvrir le formulaire d'installation
2. **Configure les paramètres** :
   - **Account** : le compte où le Hook sera installé (déjà sélectionné)
   - **Sequence** : laisse le Builder le remplir automatiquement
   - **Invoke on transactions** (HookOn) : choisis les types de transaction qui activeront le Hook (plusieurs choix possibles)
   - **Hook Namespace Seed** : le nom de chaîne que tu veux utiliser comme seed pour le Namespace
   - **Hook Namespace (sha256)** : le sha256 généré depuis la Seed utilisée dans le champ précédent (ne le modifie pas)
   - **Hook Parameters** : si ton Hook utilise des paramètres, configure-les ici (nom et valeur en hex)
   - **Fee** : clique sur **Suggest** si le Hook renvoie une erreur de fee insuffisant, le Builder calculera le fee recommandé
3. Clique sur **"Set Hook"** pour envoyer la transaction \`SetHook\`
4. Vérifie que le résultat est \`tesSUCCESS\` dans la console

### Étape 4 : tester dans Test

L'onglet **Test** est l'endroit où tu vérifies que ton Hook fonctionne correctement :

1. **Type de transaction** : choisis le type de transaction à envoyer (Payment, OfferCreate, etc.)
2. **Account** : l'émetteur de la transaction
3. **Sequence** : laisse le Builder le remplir automatiquement
4. **Flags** : configure les flags nécessaires pour la transaction
5. **Destination** : l'adresse de destination de la transaction
6. **Amount** : le montant à envoyer et son type (XAH ou IOU), si applicable
7. **Fee** : clique sur **Suggest** pour que le Builder calcule le fee recommandé
8. **Hook parameters** : si ton Hook utilise des paramètres, configure-les ici (nom et valeur en hex)
9. **Memos** : si ta transaction a besoin de memos, ajoute-les ici (optionnel)
10. Clique sur **Run Test**

Tu dois surveiller les écrans **Development Log** et **Debug Stream**. Dans **Debug Stream**, tu peux choisir quelle partie du scénario examiner : en sélectionnant le compte si plusieurs sont impliqués.

**Flux de test recommandé** :

- **Cas positifs** : envoie des transactions qui devraient être acceptées et vérifie qu'elles passent
- **Cas négatifs** : envoie des transactions qui ne devraient pas avoir d'effet et vérifie que c'est le cas
- **Cas limites** : teste avec des montants exactement à la limite, des types de transaction inattendus, etc.
- **Cas inattendus** : teste des transactions que tu n'attends pas, au cas où le Hook les gérerait de façon inattendue
- **Vérifier le state** : si ton Hook utilise \`state()\`, vérifie que les valeurs sont bien sauvegardées en interrogeant \`account_objects\` ou les informations de state dans le Builder

Une suite de tests large et cohérente est essentielle pour garantir que ton Hook se comporte correctement dans toutes les situations. Si possible, demande à d'autres personnes de tester aussi ton Hook avec des cas que tu n'aurais pas envisagés.

### Limites du Builder

- Fonctionne uniquement avec **Xahau Testnet**, pas avec Mainnet
- Pour un développement plus avancé ou un déploiement en production, tu auras besoin d'un environnement local
- Tes comptes et l'état des Hooks persistent entre les sessions si tu ne vides pas le navigateur. Ce n'est généralement pas le cas pour les Hooks eux-mêmes.`,
      slides: [["Hooks Builder - environnement en ligne", "Éditeur, compilation et tests dans le navigateur\n\nIdéal pour premiers Hooks et prototypes."], ["Deploy : comptes et installation", "Comptes :\n• Generate Account → nouveau compte financé par le faucet\n• Import Account → seed testnet existante\n• Minimum 2 comptes (Hook + tests)\n\nInstallation :\n• Sélectionner le compte + Set Hook\n• Configurer HookOn, Namespace, Parameters\n• Fee → Suggest en cas d'erreur de fee"], ["Test : vérifier ton Hook", "Envoie des transactions de test, lis les traces et vérifie que le Hook accepte ou rejette comme prévu."]],
    },
    m8l8: {
      title: "Développement local de Hooks avec hooks-cli",
      theory: `[Hooks Builder](?m=9&l=6) fonctionne dans le navigateur et reste le moyen le plus rapide d'essayer un Hook. Pour un Hook que tu gardes sous gestion de versions, que tu relis et que tu déploies sur le **Xahau Mainnet**, il te faut plutôt un projet local. [hooks-cli](https://github.com/Xahau/hooks-cli) est l'outil officiel en ligne de commande pour cela.

### Hooks Builder ou hooks-cli

| | Hooks Builder | hooks-cli |
|---|---|---|
| Où vit le code | Dans le navigateur | Des fichiers de ton projet, sous gestion de versions |
| Compilation | Intégrée | \`hooks-cli compile-c\`, qui envoie les fichiers C à un service de compilation et récupère le \`.wasm\` |
| En-têtes | Son propre jeu | Écrits dans \`contracts/include\` par \`hooks-cli init\` |
| Déploiement | Intégré (testnet) | Ta propre transaction \`SetHook\`, comme dans la [leçon 9.2](?m=9&l=1) |
| Idéal pour | Apprendre et tester vite | Les vrais projets et le mainnet |

Comme la compilation se fait sur le service, tu n'installes ni clang ni outils WebAssembly, mais \`compile-c\` a besoin d'une connexion internet.

### 1. Installer hooks-cli

\`\`\`bash
npm install -g @xahau/hooks-cli
\`\`\`

Le paquet est **\`@xahau/hooks-cli\`**. Il existe aussi sur npm un paquet sans rapport nommé \`hooks-cli\` (sans le scope) : installe toujours le nom avec scope. Ensuite, la commande \`hooks-cli\` est disponible dans ton terminal.

### 2. Créer le projet

\`\`\`bash
hooks-cli init c my-hook-project
cd my-hook-project
npm install
\`\`\`

\`init c\` crée un projet pour des Hooks écrits en C et affiche :

\`\`\`
Created CHooks project in …/my-hook-project
Header files saved to contracts/include.
Secrets saved to .env file.
\`\`\`

- **\`Header files saved to contracts/include\`** : les en-têtes de la Hooks API (\`hookapi.h\` et les fichiers qu'il inclut). Tes fichiers C les incluent et le compilateur les lit ici.
- **\`Secrets saved to .env file\`** : l'adresse du service de compilation, le réseau et un seed de test pour le script de déploiement TypeScript. C'est un seed de testnet ; ne mets jamais un seed de mainnet dans ce fichier.

Le projet ressemble à ceci :

\`\`\`
my-hook-project/
├── contracts/
│   ├── base.c           ← ton Hook, en C
│   └── include/         ← hookapi.h, extern.h, macro.h, sfcodes.h…
├── src/index.ts         ← script de déploiement TypeScript optionnel
├── .env                 ← service de compilation, réseau et seed de test
├── package.json
└── tsconfig.json
\`\`\`

\`npm install\` installe ce dont a besoin le script de déploiement TypeScript optionnel. La compilation n'en dépend pas.

### 3. Compiler

\`\`\`bash
npm run build
# équivaut à : hooks-cli compile-c contracts build/ --headers contracts/include
\`\`\`

Chaque fichier \`.c\` de \`contracts/\` devient un \`.wasm\` dans \`build/\` : \`contracts/base.c\` donne \`build/base.wasm\`. C'est ce binaire qu'installe une transaction \`SetHook\`. Une erreur de compilation s'affiche avec son fichier et sa ligne, et aucun \`.wasm\` n'est écrit pour ce fichier.

### 4. Déployer

Déploie le \`.wasm\` avec la bibliothèque \`xahau\`, exactement comme dans la [leçon 9.2](?m=9&l=1). Sa transaction \`SetHook\` lit le fichier et fixe ces champs :

\`\`\`javascript
const setHook = {
  TransactionType: "SetHook",
  Account: wallet.address,
  Hooks: [
    {
      Hook: {
        CreateCode: fs.readFileSync("build/base.wasm").toString("hex").toUpperCase(),
        HookOn: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF",
        HookCanEmit: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFBFFFFF",
        HookNamespace: crypto.createHash("sha256").update("base").digest("hex").toUpperCase(),
        HookApiVersion: 0,
        Flags: 1,
      },
    },
  ],
};
\`\`\`

| Champ | Valeur ici | Rôle |
|---|---|---|
| \`CreateCode\` | le \`.wasm\` en hex | Le code du Hook. Réinstaller le même code réutilise la copie stockée |
| \`HookOn\` | se déclenche seulement sur **Cron** | Les types de transaction qui exécutent le Hook. Calcule-le avec le [calculateur HookOn](https://richardah.github.io/xrpl-hookon-calculator/) : chaque bit est un type de transaction |
| \`HookCanEmit\` | seulement **ClaimReward** | Les types de transaction que le Hook peut émettre. Le reste est refusé : un bug ne peut pas lui faire émettre un Payment |
| \`HookNamespace\` | SHA-256 de \`"base"\` | L'endroit où le Hook garde son état. Des Hooks qui partagent un namespace partagent leur état |
| \`HookApiVersion\` | \`0\` | La version de la Hooks API visée par le code |
| \`Flags\` | \`1\` (hsfOverride) | Remplace le Hook déjà présent à cette position |

Les deux masques font 64 caractères hex (256 bits). Une valeur avec un caractère de trop ou de moins est mal formée, et le \`SetHook\` échoue.

### Cas à surveiller en compilant en local

- **Les fonctions auxiliaires disparaissent.** Après la compilation, \`hook-cleaner\` ne garde que \`hook()\` et \`cbak()\` et retire du \`.wasm\` toute autre fonction. Les appels à une fonction auxiliaire ne pointent alors plus sur rien, et le \`SetHook\` échoue avec \`temMALFORMED\`. Marque chaque fonction auxiliaire pour que le compilateur la recopie dans ses appelants :

\`\`\`c
static inline __attribute__((always_inline)) int is_payment(void) { ... }
\`\`\`

- **\`otxn_param\` peut ne pas être déclarée.** Les anciennes copies des en-têtes Hooks ne la déclarent pas, et un Hook qui lit les paramètres de la transaction échoue alors avec « call to undeclared function 'otxn_param' ». Les en-têtes écrits par \`hooks-cli init\` (version 2.1.0) la déclarent. La déclarer toi-même après l'include, comme le fait le Hook de paramètres de la [leçon 9.5](?m=9&l=4), fonctionne avec les deux, car une déclaration en double identique est du C valide :

\`\`\`c
extern int64_t otxn_param(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);
\`\`\`

- **\`PREPARE_PAYMENT_SIMPLE\` peut manquer.** Les anciens exemples construisent les paiements émis avec cette macro, que les en-têtes de \`hooks-cli init\` (version 2.1.0) ne définissent pas : les compiler échoue avec « use of undeclared identifier 'PREPARE_PAYMENT_SIMPLE_SIZE' ». Construis la transaction à la main, comme le Hook de transfert de la [leçon 9.4](?m=9&l=3) ; il compile avec n'importe quel jeu d'en-têtes.
- **Le script \`deploy\` du modèle appelle \`yarn\`.** \`npm run build\` fonctionne avec npm seul ; \`npm run deploy\` demande yarn, ou lance \`npm run build\` puis \`npx ts-node src/index.ts\`.

### Référence et documentation

- **hooks-cli** : [github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli), le dépôt officiel avec les instructions d'installation et d'utilisation.
- **Hooks Toolkit** : [hooks-toolkit.com](https://hooks-toolkit.com/), guides, référence de la Hooks API (\`hookapi.h\`), exemples et outils pour développer des Hooks.`,
      slides: [["hooks-cli - développement local", "CLI officielle pour compiler des Hooks\n\nnpm install -g @xahau/hooks-cli\nhooks-cli init c my-project\ncd my-project && npm install\nnpm run build\n\nPour le développement professionnel et Mainnet"], ["Structure de projet", "Code source, fichiers de configuration, build WASM, scripts de déploiement et tests."], ["Déploiement et référence", "Compile localement, déploie sur testnet, vérifie HookHash et documente les paramètres utilisés."]],
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
      if (typeof block.code === "string") block.code = { en: block.code };
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

addNewWords(moduleData, 9);
export default moduleData;
