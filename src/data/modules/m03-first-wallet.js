const moduleData = {
  id: "m3",
  icon: "👛",
  title: {
    es: "Generación de tu primera wallet",
    pt: "Geração de seu primeira wallet",
    en: "Generating your first wallet",
    jp: "初めてのウォレット生成",
    ko: "첫 번째 지갑 만들기",
    zh: "生成你的第一个钱包",
  },
  lessons: [
    {
      id: "m3l1",
      title: {
        es: "Criptografía y claves en Xahau",
        pt: "Criptografia e chaves na Xahau",
        en: "Cryptography and keys in Xahau",
        jp: "Xahauの暗号技術と鍵",
        ko: "Xahau의 암호학과 키",
        zh: "Xahau中的密码学与密钥",
      },
      theory: {
        es: `Antes de interactuar con Xahau, necesitas una **wallet** (cartera). Una wallet no es más que un par de claves criptográficas que te permiten firmar transacciones y demostrar la propiedad de tu cuenta.

### Par de claves

En Xahau (y en muchas otras blockchains), cada cuenta se basa en criptografía de curva elíptica:

- **Clave privada (Secret/Seed)**: Un valor secreto que NUNCA debes compartir. Se usa para firmar transacciones. Suele representarse como un "family seed" que empieza por \`s\` (ej: \`sEdV....\`)
- **Clave pública**: Se deriva de la clave privada. Se usa para verificar firmas
- **Dirección (Account)**: Se deriva de la clave pública. Empieza por \`r\` (ej: \`rHb9CJ...\`). Es tu identificador público en la red

### Algoritmos soportados

Xahau soporta dos algoritmos de firma:
- **secp256k1**: El mismo que usa Bitcoin. Es el algoritmo por defecto
- **ed25519**: Más moderno y eficiente. Recomendado para nuevas cuentas

**Nota:** La librería \`xahau js\`, deriva por defecto en **ed25519** si no se especifica el algoritmo. El faucet de [xahau-test.net](https://xahau-test.net) genera las wallets con **secp256k1**, por lo que verás que los ejemplos de código de este curso se especifica este algoritmo cuando generamos las wallets.

### Activación de cuenta

A diferencia de Ethereum, en Xahau una cuenta **no existe en el ledger hasta que recibe su primer depósito**. Se necesita un mínimo de **1 XAH** (reserve base) para activar una cuenta. Este XAH queda bloqueado como reserva mientras la cuenta exista.

### Seguridad

- Nunca compartas tu clave privada (seed/secret)
- Usa la **testnet** para pruebas (tokens sin valor real)
- Guarda tus seeds de mainnet en un lugar seguro y offline`,
        pt: `Antes de interagir com Xahau, você precisa de uma **wallet** (carteira). Uma wallet nada mais é do que um par de chaves criptográficas que permitem que você assine transações e demonstre a propriedade de sua conta.
### Par de chaves
Em Xahau (e em muitas outras blockchains), cada conta se baseia em criptografia de curva elíptica:
- **Chave privada (Secret/Seed)**: Um valor secreto que NUNCA você deve compartilhar. É usada para assinar transações. Geralmente é representada como um "family seed" que começa com \`s\` (ex: \`sEdV....\`)
- **Chave pública**: Se deriva da chave privada. É usada para verificar assinaturas
- **Endereço (Account)**: Se deriva da chave pública. Começa com \`r\` (ex: \`rHb9CJ...\`). É seu identificador público na rede
### Algoritmos suportados
Xahau suporta dois algoritmos de assinatura:
- **secp256k1**: O mesmo que usa Bitcoin. É o algoritmo por padrão
- **ed25519**: Mais moderno e eficiente. Recomendado para novas contas
**Nota:** A biblioteca \`xahau js\`, deriva por padrão em **ed25519** se o algoritmo não for especificado o algoritmo. O faucet de [xahau-test.net](https://xahau-test.net) gera as wallets com **secp256k1**, por isso você verá que os exemplos de código de este curso especificam este algoritmo quando geramos as wallets.
### Ativação de conta
Diferentemente de Ethereum, na Xahau uma conta **não existe no ledger até que recebe seu primeiro depósito**. É necessário um mínimo de **1 XAH** (reserve base) para ativar uma conta. Este XAH queda blocoado como reserva enquanto a conta exista.
### Segurança
- Nunca compartilhe sua chave privada (seed/secret)
- Use a **testnet** para testes (tokens sem valor real)
- Guarde seus seeds de mainnet em um lugar seguro e offline`,
        en: `Before interacting with Xahau, you need a **wallet**. A wallet is simply a pair of cryptographic keys that allow you to sign transactions and prove ownership of your account.

### Key pair

In Xahau (and many other blockchains), each account is based on elliptic curve cryptography:

- **Private key (Secret/Seed)**: A secret value that you should NEVER share. It is used to sign transactions. It is usually represented as a "family seed" starting with \`s\` (e.g.: \`sEdV....\`)
- **Public key**: Derived from the private key. Used to verify signatures
- **Address (Account)**: Derived from the public key. Starts with \`r\` (e.g.: \`rHb9CJ...\`). It is your public identifier on the network

### Supported algorithms

Xahau supports two signing algorithms:
- **secp256k1**: The same one used by Bitcoin. It is the default algorithm
- **ed25519**: More modern and efficient. Recommended for new accounts

**Note:** The \`xahau js\` library derives by default to **ed25519** if no algorithm is specified. The faucet at [xahau-test.net](https://xahau-test.net) generates wallets with **secp256k1**, so you will see that the code examples in this course specify this algorithm when generating wallets.

### Account activation

Unlike Ethereum, in Xahau an account **does not exist on the ledger until it receives its first deposit**. A minimum of **1 XAH** (base reserve) is needed to activate an account. This XAH remains locked as a reserve as long as the account exists.

### Security

- Never share your private key (seed/secret)
- Use the **testnet** for testing (tokens with no real value)
- Store your mainnet seeds in a secure, offline location`,
        jp: `Xahauと対話する前に、**ウォレット**が必要です。ウォレットはトランザクションに署名しアカウントの所有権を証明するための暗号鍵ペアにすぎません。

### 鍵ペア

Xahau（および多くの他のブロックチェーン）では、各アカウントは楕円曲線暗号に基づいています。

- **秘密鍵（Secret/Seed）**：絶対に共有してはならない秘密の値。トランザクションの署名に使用される。通常 \`s\` で始まる「ファミリーシード」として表される（例：\`sEdV....\`）
- **公開鍵**：秘密鍵から導出される。署名の検証に使用される
- **アドレス（Account）**：公開鍵から導出される。\`r\` で始まる（例：\`rHb9CJ...\`）。ネットワーク上のあなたの公開識別子

### サポートされているアルゴリズム

Xahauは2つの署名アルゴリズムをサポートしています：
- **secp256k1**：Bitcoinが使用するものと同じ。デフォルトのアルゴリズム
- **ed25519**：より新しく効率的。新しいアカウントに推奨

**注意：** \`xahau js\` ライブラリはアルゴリズムが指定されない場合、デフォルトで **ed25519** を使用します。[xahau-test.net](https://xahau-test.net) のフォーセットは **secp256k1** でウォレットを生成するため、このコースのコード例ではウォレット生成時にこのアルゴリズムを指定しています。

### アカウントのアクティベーション

Ethereumとは異なり、Xahauではアカウントは**最初の入金を受け取るまでレジャーに存在しません**。アカウントをアクティベートするには最低 **1 XAH**（基本準備金）が必要です。このXAHはアカウントが存在する限り準備金としてロックされます。

### セキュリティ

- 秘密鍵（seed/secret）を絶対に共有しないこと
- テストには**テストネット**を使用する（実際の価値のないトークン）
- メインネットのシードは安全なオフラインの場所に保管すること`,
        ko: `Xahau와 상호작용하려면 먼저 **지갑(wallet)**이 필요합니다. 지갑은 계정에 연결된 암호학적 키 쌍이며, 트랜잭션에 서명하고 계정 소유권을 증명하는 데 사용됩니다.

### 키 쌍

Xahau(그리고 많은 다른 블록체인)에서 각 계정은 타원 곡선 암호학을 기반으로 합니다.

- **개인 키(Secret/Seed)**: 절대 공유하면 안 되는 비밀 값입니다. 트랜잭션 서명에 사용됩니다. 보통 \`s\`로 시작하는 "family seed" 형태로 표현됩니다. 예: \`sEdV....\`
- **공개 키**: 개인 키에서 파생되며 서명 검증에 사용됩니다
- **주소(Account)**: 공개 키에서 파생되며 \`r\`로 시작합니다. 예: \`rHb9CJ...\`. 네트워크에서 사용하는 공개 식별자입니다

### 지원 알고리즘

Xahau는 두 가지 서명 알고리즘을 지원합니다:
- **secp256k1**: 비트코인과 같은 알고리즘이며 기본값입니다
- **ed25519**: 더 현대적이고 효율적이며 새 계정에 권장됩니다

**참고:** \`xahau js\` 라이브러리는 알고리즘을 지정하지 않으면 기본적으로 **ed25519**를 사용합니다. [xahau-test.net](https://xahau-test.net)의 faucet은 **secp256k1**으로 지갑을 생성하므로, 이 강의의 코드 예제에서는 지갑 생성 시 이 알고리즘을 명시하는 경우가 있습니다.

### 계정 활성화

Ethereum과 달리 Xahau에서는 계정이 **첫 입금을 받기 전까지 ledger에 존재하지 않습니다**. 계정을 활성화하려면 최소 **1 XAH**(base reserve)가 필요합니다. 이 XAH는 계정이 존재하는 동안 준비금으로 잠겨 있습니다.

### 보안

- 개인 키(seed/secret)를 절대 공유하지 마세요
- 테스트에는 **testnet**을 사용하세요(실제 가치가 없는 토큰)
- mainnet 시드는 안전한 오프라인 장소에 보관하세요`,
        zh: `在与 Xahau 交互之前，你需要一个**钱包（wallet）**。钱包本质上是一对密码学密钥，用于对交易进行签名并证明对账户的所有权。

### 密钥对

在 Xahau（以及许多其他区块链）中，每个账户都基于椭圆曲线密码学：

- **私钥（Secret/Seed）**：绝对不能分享的秘密值，用于签名交易。通常以"family seed"形式表示，以 \`s\` 开头（例如：\`sEdV....\`）
- **公钥**：由私钥派生，用于验证签名
- **地址（Account）**：由公钥派生，以 \`r\` 开头（例如：\`rHb9CJ...\`）。这是你在网络上的公开标识符

### 支持的算法

Xahau 支持两种签名算法：
- **secp256k1**：与比特币相同，是默认算法
- **ed25519**：更现代、更高效，推荐用于新账户

**注意：** \`xahau js\` 库在未指定算法时默认使用 **ed25519**。[xahau-test.net](https://xahau-test.net) 的水龙头使用 **secp256k1** 生成钱包，因此本课程的代码示例在生成钱包时会明确指定该算法。

### 账户激活

与 Ethereum 不同，在 Xahau 中，账户**在收到第一笔存款之前不存在于账本中**。激活账户至少需要 **1 XAH**（基础储备金），该 XAH 在账户存在期间将被锁定为储备金。

### 安全

- 切勿分享你的私钥（seed/secret）
- 使用**测试网**进行测试（代币无实际价值）
- 将主网的 seed 保存在安全的离线位置`,
      },
      codeBlocks: [
        {
          title: {
            es: "Generar una wallet nueva",
            pt: "Gerar uma wallet nova",
            en: "Generate a new wallet",
            jp: "新しいウォレットを生成する",
            ko: "새 지갑 생성하기",
            zh: "生成新钱包",
          },
          language: "javascript",
          code: {
            es: `const { ECDSA, Wallet } = require("xahau");

// Generar wallet con el algoritmo por defecto (secp256k1)
const wallet1 = Wallet.generate(ECDSA.secp256k1);
console.log("=== Wallet secp256k1 ===");
console.log("Dirección:", wallet1.address);
console.log("Clave pública:", wallet1.publicKey);
console.log("Seed:", wallet1.seed);

// Generar wallet con el algoritmo ed25519
const wallet2 = Wallet.generate();
console.log("=== Wallet ed25519 ===");
console.log("Dirección:", wallet2.address);
console.log("Clave pública:", wallet2.publicKey);
console.log("Seed:", wallet2.seed);`,
            pt: `const { ECDSA, Wallet } = require("xahau");
// Gerar wallet com o algoritmo padrão (secp256k1)
const wallet1 = Wallet.generate(ECDSA.secp256k1);
console.log("=== Wallet secp256k1 ===");
console.log("Endereço:", wallet1.address);
console.log("Chave pública:", wallet1.publicKey);
console.log("Seed:", wallet1.seed);
// Gerar wallet com ou algoritmo ed25519
const wallet2 = Wallet.generate();
console.log("=== Wallet ed25519 ===");
console.log("Endereço:", wallet2.address);
console.log("Chave pública:", wallet2.publicKey);
console.log("Seed:", wallet2.seed);`,
            en: `const { ECDSA, Wallet } = require("xahau");

// Generate wallet with default algorithm (secp256k1)
const wallet1 = Wallet.generate(ECDSA.secp256k1);
console.log("=== Wallet secp256k1 ===");
console.log("Address:", wallet1.address);
console.log("Public key:", wallet1.publicKey);
console.log("Seed:", wallet1.seed);

// Generate wallet with ed25519 algorithm
const wallet2 = Wallet.generate();
console.log("=== Wallet ed25519 ===");
console.log("Address:", wallet2.address);
console.log("Public key:", wallet2.publicKey);
console.log("Seed:", wallet2.seed);`,
            jp: `const { ECDSA, Wallet } = require("xahau");

// デフォルトアルゴリズム（secp256k1）でウォレットを生成する
const wallet1 = Wallet.generate(ECDSA.secp256k1);
console.log("=== Wallet secp256k1 ===");
console.log("アドレス：", wallet1.address);
console.log("公開鍵：", wallet1.publicKey);
console.log("シード：", wallet1.seed);

// ed25519アルゴリズムでウォレットを生成する
const wallet2 = Wallet.generate();
console.log("=== Wallet ed25519 ===");
console.log("アドレス：", wallet2.address);
console.log("公開鍵：", wallet2.publicKey);
console.log("シード：", wallet2.seed);`,
            ko: `const { ECDSA, Wallet } = require("xahau");

// 기본 알고리즘(secp256k1)으로 지갑 생성
const wallet1 = Wallet.generate(ECDSA.secp256k1);
console.log("=== Wallet secp256k1 ===");
console.log("주소:", wallet1.address);
console.log("공개 키:", wallet1.publicKey);
console.log("시드:", wallet1.seed);

// ed25519 알고리즘으로 지갑 생성
const wallet2 = Wallet.generate();
console.log("=== Wallet ed25519 ===");
console.log("주소:", wallet2.address);
console.log("공개 키:", wallet2.publicKey);
console.log("시드:", wallet2.seed);`,
            zh: `const { ECDSA, Wallet } = require("xahau");

// 使用默认算法（secp256k1）生成钱包
const wallet1 = Wallet.generate(ECDSA.secp256k1);
console.log("=== Wallet secp256k1 ===");
console.log("地址:", wallet1.address);
console.log("公钥:", wallet1.publicKey);
console.log("Seed:", wallet1.seed);

// 使用 ed25519 算法生成钱包
const wallet2 = Wallet.generate();
console.log("=== Wallet ed25519 ===");
console.log("地址:", wallet2.address);
console.log("公钥:", wallet2.publicKey);
console.log("Seed:", wallet2.seed);`,
          },
        },
        {
          title: {
            es: "Restaurar una wallet desde un seed existente",
            pt: "Restaurar uma wallet a partir de um seed existente",
            en: "Restore a wallet from an existing seed",
            jp: "既存のシードからウォレットを復元する",
            ko: "기존 시드로 지갑 복원하기",
            zh: "从现有 seed 恢复钱包",
          },
          language: "javascript",
          code: {
            es: `const { Wallet } = require("xahau");

// Restaurar wallet desde un seed existente
// (usa tu propio seed de testnet)
const seed = "sEdVHBhkL2next8NH9cMPyPJoXXXXXX";
// Si prefieres derivarla en ed25519, elimina {algorithm: 'secp256k1'} ya que usará ed25519 por defecto
const wallet = Wallet.fromSeed(seed, {algorithm: 'secp256k1'});

console.log("Dirección:", wallet.address);
console.log("Clave pública:", wallet.publicKey);
console.log("Seed:", wallet.seed);

// El mismo seed siempre genera la misma dirección
// ¡Nunca compartas tu seed!`,
            pt: `const { Wallet } = require("xahau");
// Restaurar wallet a partir de um seed existente
// (usa seu próprio seed de testnet)
const seed = "sEdVHBhkL2next8NH9cMPyPJoXXXXXX";
// Se preferir derivá-la em ed25519, remova {algorithm: 'secp256k1'} já que usará ed25519 por padrão
const wallet = Wallet.fromSeed(seed, {algorithm: 'secp256k1'});
console.log("Endereço:", wallet.address);
console.log("Chave pública:", wallet.publicKey);
console.log("Seed:", wallet.seed);
// O mesmo seed sempre generà misma endereço
// ¡Nunca compartilhe seu seed!`,
            en: `const { Wallet } = require("xahau");

// Restore wallet from an existing seed
// (use your own testnet seed)
const seed = "sEdVHBhkL2next8NH9cMPyPJoXXXXXX";
// If you prefer to derive it in ed25519, remove {algorithm: 'secp256k1'} since it will use ed25519 by default
const wallet = Wallet.fromSeed(seed, {algorithm: 'secp256k1'});

console.log("Address:", wallet.address);
console.log("Public key:", wallet.publicKey);
console.log("Seed:", wallet.seed);

// The same seed always generates the same address
// Never share your seed!`,
            jp: `const { Wallet } = require("xahau");

// 既存のシードからウォレットを復元する
// （自分のテストネットシードを使用すること）
const seed = "sEdVHBhkL2next8NH9cMPyPJoXXXXXX";
// ed25519で導出したい場合は {algorithm: 'secp256k1'} を削除する（デフォルトでed25519を使用）
const wallet = Wallet.fromSeed(seed, {algorithm: 'secp256k1'});

console.log("アドレス：", wallet.address);
console.log("公開鍵：", wallet.publicKey);
console.log("シード：", wallet.seed);

// 同じシードは常に同じアドレスを生成する
// シードを絶対に共有しないこと！`,
            ko: `const { Wallet } = require("xahau");

// 기존 시드에서 지갑 복원
// (자신의 testnet 시드를 사용하세요)
const seed = "sEdVHBhkL2next8NH9cMPyPJoXXXXXX";
// ed25519로 파생하려면 {algorithm: 'secp256k1'} 를 제거하세요. 기본값은 ed25519입니다
const wallet = Wallet.fromSeed(seed, {algorithm: 'secp256k1'});

console.log("주소:", wallet.address);
console.log("공개 키:", wallet.publicKey);
console.log("시드:", wallet.seed);

// 같은 시드는 항상 같은 주소를 생성합니다
// 시드를 절대 공유하지 마세요!`,
            zh: `const { Wallet } = require("xahau");

// 从现有 seed 恢复钱包
// （请使用你自己的测试网 seed）
const seed = "sEdVHBhkL2next8NH9cMPyPJoXXXXXX";
// 如果想使用 ed25519，去掉 {algorithm: 'secp256k1'}，默认即为 ed25519
const wallet = Wallet.fromSeed(seed, {algorithm: 'secp256k1'});

console.log("地址:", wallet.address);
console.log("公钥:", wallet.publicKey);
console.log("Seed:", wallet.seed);

// 相同的 seed 始终生成相同的地址
// 切勿分享你的 seed！`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es una Wallet?", pt: "O que é uma Wallet?", en: "What is a Wallet?", jp: "ウォレットとは？", ko: "지갑이란 무엇인가?", zh: "什么是钱包？" },
          content: {
            es: "Un par de claves criptográficas:\n\n🔑 Clave privada (seed) → Firmar transacciones\n📢 Clave pública → Verificar firmas\n📍 Dirección (r...) → Tu identidad en la red",
            pt: "Um par de chaves criptográficas:\n\n🔑 Chave privada (seed) → Assinar transações\n📢 Chave pública → Verificar assinaturas\n📍 Endereço (r...) → Sua identidade na rede",
            en: "A pair of cryptographic keys:\n\n🔑 Private key (seed) → Sign transactions\n📢 Public key → Verify signatures\n📍 Address (r...) → Your identity on the network",
            jp: "暗号鍵のペア：\n\n🔑 秘密鍵（シード） → トランザクションに署名\n📢 公開鍵 → 署名を検証\n📍 アドレス（r...） → ネットワーク上のあなたの識別子",
            ko: "암호학적 키 쌍:\n\n🔑 개인 키(시드) → 트랜잭션 서명\n📢 공개 키 → 서명 검증\n📍 주소(r...) → 네트워크에서의 내 식별자",
            zh: "一对密码学密钥：\n\n🔑 私钥（seed） → 签名交易\n📢 公钥 → 验证签名\n📍 地址（r...） → 你在网络上的身份",
          },
          visual: "👛",
        },
        {
          title: { es: "Algoritmos de firma", pt: "Algoritmos de assinatura", en: "Signing algorithms", jp: "署名アルゴリズム", ko: "서명 알고리즘", zh: "签名算法" },
          content: {
            es: "Xahau soporta dos algoritmos:\n\n• secp256k1 → Igual que Bitcoin (por defecto)\n• ed25519 → Más moderno y eficiente\n\nAmbos son seguros y válidos",
            pt: "Xahau soporta dois algoritmos:\n\n• secp256k1 → Igual que Bitcoin (por padrão)\n• ed25519 → Mais moderno e eficiente\n\nAmbos são seguros e válidos",
            en: "Xahau supports two algorithms:\n\n• secp256k1 → Same as Bitcoin (default)\n• ed25519 → More modern and efficient\n\nBoth are secure and valid",
            jp: "Xahauは2つのアルゴリズムをサポート：\n\n• secp256k1 → Bitcoinと同じ（デフォルト）\n• ed25519 → より新しく効率的\n\nどちらも安全で有効",
            ko: "Xahau는 두 가지 알고리즘을 지원합니다:\n\n• secp256k1 → 비트코인과 동일(기본값)\n• ed25519 → 더 현대적이고 효율적\n\n둘 다 안전하고 유효합니다",
            zh: "Xahau 支持两种算法：\n\n• secp256k1 → 与比特币相同（默认）\n• ed25519 → 更现代、更高效\n\n两者均安全有效",
          },
          visual: "🔐",
        },
        {
          title: { es: "Activación de cuenta", pt: "Ativação da conta", en: "Account activation", jp: "アカウントのアクティベーション", ko: "계정 활성화", zh: "账户激活" },
          content: {
            es: "Una cuenta NO existe hasta que recibe\nsu primer depósito\n\n• Mínimo 1 XAH de reserva base\n• Este XAH queda bloqueado\n• En testnet: usa el faucet gratuito",
            pt: "Uma conta NÃO existe até que recebe\nsu primeiro depósito\n\n• Mínimo 1 XAH de reserva base\n• Este XAH queda blocoado\n• Em testnet: usao faucet gratuito",
            en: "An account does NOT exist until it receives\nits first deposit\n\n• Minimum 1 XAH base reserve\n• This XAH remains locked\n• On testnet: use the free faucet",
            jp: "アカウントは最初の入金を受け取るまで\n存在しない\n\n• 最低1 XAHのベースリザーブが必要\n• このXAHはロックされる\n• テストネット：無料フォーセットを使用",
            ko: "계정은 첫 입금을 받기 전까지\n존재하지 않습니다\n\n• 최소 1 XAH의 기본 준비금 필요\n• 이 XAH는 잠겨 있습니다\n• testnet에서는 무료 faucet 사용",
            zh: "账户在收到第一笔存款之前\n不存在于账本中\n\n• 至少需要 1 XAH 基础储备金\n• 该 XAH 将被锁定\n• 测试网：使用免费水龙头",
          },
          visual: "✨",
        },
      ],
    },
    {
      id: "m3l2",
      title: {
        es: "Activar tu wallet en testnet",
        pt: "Ativar sua wallet em testnet",
        en: "Activate your wallet on testnet",
        jp: "テストネットでウォレットをアクティベートする",
        ko: "테스트넷에서 지갑 활성화",
        zh: "在测试网激活钱包",
      },
      theory: {
        es: `Ahora que sabes generar una wallet, el siguiente paso es **activarla** en la red. Para desarrollo y pruebas, usaremos la **testnet de Xahau** donde los tokens no tienen valor real.

### ¿Qué es la testnet?

La testnet es una copia de la red Xahau diseñada para desarrollo:
- Los tokens (test XAH) **no tienen valor real**
- Puedes obtener tokens gratis desde el **faucet**
- Las transacciones funcionan igual que en mainnet
- Es el lugar perfecto para aprender y experimentar

### Faucet

El faucet es un servicio que envía tokens de prueba a tu wallet. Puedes usarlo directamente desde código con la librería \`xahau\`. También puedes conseguir una wallet con test XAH desde la interfaz web del faucet: [xahau-test.net](https://xahau-test.net). Puedes utilizar la seed después en tu código o importarla a Xaman.

### Verificar tu cuenta

Una vez activada tu cuenta, puedes verificar su existencia consultando el comando \`account_info\`. Este te mostrará:
- **Balance**: Cantidad de XAH en tu cuenta (en drops: 1 XAH = 1,000,000 drops)
- **Sequence**: Número de secuencia para la próxima transacción
- **Flags**: Configuración de la cuenta
- **OwnerCount**: Número de objetos que posee la cuenta en el ledger`,
        pt: `Agora que você sabe gerar uma wallet, o próximo passo é **ativá-la** na rede. Para desenvolvimento e testes, usaremos a **testnet de Xahau** onde os tokens não têm valor real.
### O que é a testnet?
A testnet é uma cópia da rede Xahau projetada para desenvolvimento:
- Os tokens (test XAH) **não têm valor real**
- Você pode obter tokens grátis desde o **faucet**
- As transações funcionan igual que em mainnet
- É o lugar perfecto para aprender e experimentar
### Faucet
O faucet é um servicio que envia tokens de pruebà tu wallet. Você pode usarlo diretamente desde código com a biblioteca \`xahau\`. También você pode conseguir uma wallet com test XAH desde a interfaz web do faucet: [xahau-test.net](https://xahau-test.net). Você pode utilizar a seed después em seu código ou importarlà Xaman.
### Verificar seu conta
Uma vez ativada sua conta, você pode verificar su existemcia consultando o comando \`account_info\`. Este te mostrará:
- **Saldo**: Quantidade de XAH em sua conta (em drops: 1 XAH = 1,000,000 drops)
- **Sequence**: Número de sequência para a próxima transação
- **Flags**: Configuração da conta
- **OwnerCount**: Número de objetos que posee a conta no ledger`,
        en: `Now that you know how to generate a wallet, the next step is to **activate** it on the network. For development and testing, we will use the **Xahau testnet** where tokens have no real value.

### What is the testnet?

The testnet is a copy of the Xahau network designed for development:
- Tokens (test XAH) **have no real value**
- You can get free tokens from the **faucet**
- Transactions work the same as on mainnet
- It is the perfect place to learn and experiment

### Faucet

The faucet is a service that sends test tokens to your wallet. You can use it directly from code with the \`xahau\` library. You can also get a wallet with test XAH from the faucet web interface: [xahau-test.net](https://xahau-test.net). You can then use the seed in your code or import it into Xaman.

### Verify your account

Once your account is activated, you can verify its existence by querying the \`account_info\` command. It will show you:
- **Balance**: Amount of XAH in your account (in drops: 1 XAH = 1,000,000 drops)
- **Sequence**: Sequence number for the next transaction
- **Flags**: Account configuration
- **OwnerCount**: Number of objects the account owns on the ledger`,
        jp: `ウォレットの生成方法がわかったので、次のステップはネットワーク上で**アクティベート**することです。開発とテストには、トークンに実際の価値がない **Xahauテストネット**を使用します。

### テストネットとは？

テストネットは開発用に設計されたXahauネットワークのコピーです。
- トークン（テストXAH）は**実際の価値がない**
- **Faucet**から無料でトークンを取得できる
- トランザクションはメインネットと同様に機能する
- 学習と実験に最適な場所

### Faucet

Faucetはテストトークンをウォレットに送るサービスです。\`xahau\` ライブラリを使ってコードから直接使用できます。FaucetのWebインターフェース([xahau-test.net](https://xahau-test.net))からテストXAH付きのウォレットを取得することもできます。その後、シードをコードで使用するか、Xamanにインポートできます。

### アカウントの確認

アカウントがアクティベートされたら、\`account_info\` コマンドを照会してその存在を確認できます。以下の情報が表示されます。
- **Balance**：アカウントのXAH残高（dropsで：1 XAH = 1,000,000 drops）
- **Sequence**：次のトランザクションのシーケンス番号
- **Flags**：アカウントの設定
- **OwnerCount**：アカウントがレジャーに持つオブジェクト数`,
        ko: `지갑을 만들었다면 다음 단계는 네트워크에서 **계정을 활성화**하는 것입니다. 개발과 테스트에는 실제 가치가 없는 토큰을 사용하는 **Xahau testnet**을 사용합니다.

### testnet이란?

testnet은 개발용으로 설계된 Xahau 네트워크의 복제본입니다:
- 토큰(test XAH)은 **실제 가치가 없습니다**
- **faucet**에서 무료 토큰을 받을 수 있습니다
- 트랜잭션은 mainnet과 동일하게 동작합니다
- 학습하고 실험하기에 가장 좋은 환경입니다

### Faucet

faucet은 테스트 토큰을 지갑으로 보내주는 서비스입니다. \`xahau\` 라이브러리를 사용하면 코드에서 직접 요청할 수 있습니다. 웹 인터페이스 [xahau-test.net](https://xahau-test.net) 에서도 test XAH가 포함된 지갑을 받을 수 있습니다. 이후 그 seed를 코드에서 사용하거나 Xaman으로 가져올 수 있습니다.

### 계정 확인

계정이 활성화된 뒤에는 \`account_info\` 명령으로 존재 여부를 확인할 수 있습니다. 여기에서 다음 정보를 볼 수 있습니다:
- **Balance**: 계정의 XAH 잔액(drops 단위, 1 XAH = 1,000,000 drops)
- **Sequence**: 다음 트랜잭션에 사용할 시퀀스 번호
- **Flags**: 계정 설정
- **OwnerCount**: ledger에서 계정이 보유한 객체 수`,
        zh: `了解了如何生成钱包之后，下一步是在网络上**激活**它。开发和测试时，我们使用 **Xahau 测试网**，其代币没有实际价值。

### 什么是测试网？

测试网是专为开发设计的 Xahau 网络副本：
- 代币（test XAH）**没有实际价值**
- 可以从**水龙头（faucet）**免费获取代币
- 交易的运行方式与主网完全相同
- 是学习和实验的理想环境

### 水龙头（Faucet）

水龙头是一种向你的钱包发送测试代币的服务。你可以使用 \`xahau\` 库直接在代码中请求，也可以通过水龙头的 Web 界面 [xahau-test.net](https://xahau-test.net) 获取带有 test XAH 的钱包，之后可在代码中使用该 seed 或将其导入 Xaman。

### 验证账户

账户激活后，可以通过查询 \`account_info\` 命令验证其是否存在。该命令会显示：
- **Balance**：账户的 XAH 余额（单位为 drops，1 XAH = 1,000,000 drops）
- **Sequence**：下一笔交易的序列号
- **Flags**：账户配置
- **OwnerCount**：账户在账本中拥有的对象数量`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear y activar una wallet en testnet usando el faucet",
            pt: "Criar e ativar uma wallet em testnet usando ou faucet",
            en: "Create and activate a wallet on testnet using the faucet",
            jp: "フォーセットを使ってテストネットでウォレットを作成・アクティベートする",
            ko: "faucet으로 테스트넷 지갑 생성 및 활성화",
            zh: "使用水龙头在测试网创建并激活钱包",
          },
          language: "javascript",
          code: {
            es: `const { Client, Wallet } = require("xahau");

async function createTestnetWallet() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Generar una nueva wallet
  const wallet = Wallet.generate();
  console.log("Wallet generada:");
  console.log("  Dirección:", wallet.address);
  console.log("  Seed:", wallet.seed);

  // Solicitar fondos del faucet de testnet
  console.log("Solicitando fondos del faucet...");
  const fundResult = await client.fundWallet(wallet);

  console.log("¡Wallet financiada!");
  console.log("  Balance:", fundResult.balance, "XAH");

  // Verificar la cuenta en el ledger
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const account = response.result.account_data;
  console.log("Datos de la cuenta en el ledger:");
  console.log("  Balance:", account.Balance, "drops");
  console.log("  Balance:", Number(account.Balance) / 1_000_000, "XAH");
  console.log("  Secuencia:", account.Sequence);

  await client.disconnect();
}

createTestnetWallet();`,
            pt: `const { Client, Wallet } = require("xahau");
async function createTestnetWallet() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // Generar uma nova wallet
  const wallet = Wallet.generate();
  console.log("Wallet gerada:");
  console.log("  Endereço:", wallet.address);
  console.log("  Seed:", wallet.seed);
  // Solicitar fondos do faucet de testnet
  console.log("Solicitando fondos do faucet...");
  const fundResult = await client.fundWallet(wallet);
  console.log("¡Wallet financiada!");
  console.log("  Saldo:", fundResult.balance, "XAH");
  // Verificar a conta no ledger
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const account = response.result.account_data;
  console.log("Dados da conta no ledger:");
  console.log("  Saldo:", account.Saldo, "drops");
  console.log("  Saldo:", Number(account.Saldo) / 1_000_000, "XAH");
  console.log("  Sequência:", account.Sequence);
  await client.disconnect();
}
createTestnetWallet();`,
            en: `const { Client, Wallet } = require("xahau");

async function createTestnetWallet() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Generate a new wallet
  const wallet = Wallet.generate();
  console.log("Wallet generated:");
  console.log("  Address:", wallet.address);
  console.log("  Seed:", wallet.seed);

  // Request funds from the testnet faucet
  console.log("Requesting funds from faucet...");
  const fundResult = await client.fundWallet(wallet);

  console.log("Wallet funded!");
  console.log("  Balance:", fundResult.balance, "XAH");

  // Verify the account on the ledger
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const account = response.result.account_data;
  console.log("Account data on the ledger:");
  console.log("  Balance:", account.Balance, "drops");
  console.log("  Balance:", Number(account.Balance) / 1_000_000, "XAH");
  console.log("  Sequence:", account.Sequence);

  await client.disconnect();
}

createTestnetWallet();`,
            jp: `const { Client, Wallet } = require("xahau");

async function createTestnetWallet() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 新しいウォレットを生成する
  const wallet = Wallet.generate();
  console.log("ウォレットが生成されました：");
  console.log("  アドレス：", wallet.address);
  console.log("  シード：", wallet.seed);

  // テストネットフォーセットから資金をリクエストする
  console.log("フォーセットから資金をリクエスト中...");
  const fundResult = await client.fundWallet(wallet);

  console.log("ウォレットに資金が追加されました！");
  console.log("  残高：", fundResult.balance, "XAH");

  // レジャーのアカウントを確認する
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const account = response.result.account_data;
  console.log("レジャーのアカウントデータ：");
  console.log("  残高：", account.Balance, "drops");
  console.log("  残高：", Number(account.Balance) / 1_000_000, "XAH");
  console.log("  シーケンス：", account.Sequence);

  await client.disconnect();
}

createTestnetWallet();`,
            ko: `const { Client, Wallet } = require("xahau");

async function createTestnetWallet() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 새 지갑 생성
  const wallet = Wallet.generate();
  console.log("생성된 지갑:");
  console.log("  주소:", wallet.address);
  console.log("  시드:", wallet.seed);

  // testnet faucet에서 자금 요청
  console.log("faucet에서 자금 요청 중...");
  const fundResult = await client.fundWallet(wallet);

  console.log("지갑에 자금이 지급되었습니다!");
  console.log("  잔액:", fundResult.balance, "XAH");

  // ledger에서 계정 확인
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const account = response.result.account_data;
  console.log("ledger의 계정 데이터:");
  console.log("  잔액:", account.Balance, "drops");
  console.log("  잔액:", Number(account.Balance) / 1_000_000, "XAH");
  console.log("  시퀀스:", account.Sequence);

  await client.disconnect();
}

createTestnetWallet();`,
            zh: `const { Client, Wallet } = require("xahau");

async function createTestnetWallet() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 生成新钱包
  const wallet = Wallet.generate();
  console.log("已生成钱包：");
  console.log("  地址:", wallet.address);
  console.log("  Seed:", wallet.seed);

  // 向测试网水龙头请求资金
  console.log("正在向水龙头请求资金...");
  const fundResult = await client.fundWallet(wallet);

  console.log("钱包已获得资金！");
  console.log("  余额:", fundResult.balance, "XAH");

  // 在账本中验证账户
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const account = response.result.account_data;
  console.log("账本中的账户数据：");
  console.log("  余额:", account.Balance, "drops");
  console.log("  余额:", Number(account.Balance) / 1_000_000, "XAH");
  console.log("  序列号:", account.Sequence);

  await client.disconnect();
}

createTestnetWallet();`,
          },
        },
        {
          title: {
            es: "Consultar el balance de una cuenta existente",
            pt: "Consultar ou saldo de uma conta existente",
            en: "Check the balance of an existing account",
            jp: "既存アカウントの残高を確認する",
            ko: "기존 계정 잔액 조회하기",
            zh: "查询现有账户余额",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function checkBalance(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    console.log("Cuenta:", account.Account);
    console.log("Balance:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("Secuencia:", account.Sequence);
    console.log("Objetos del propietario:", account.OwnerCount);
  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("La cuenta no existe en el ledger.");
      console.log("Necesita recibir al menos 1 XAH para activarse.");
    } else {
      console.error("Error:", error.message);
    }
  }

  await client.disconnect();
}

// Reemplaza con tu dirección de testnet
checkBalance("rYourXahauAddressHere");`,
            pt: `const { Client } = require("xahau");
async function checkSaldo(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });
    const account = response.result.account_data;
    console.log("Conta:", account.Account);
    console.log("Saldo:", Number(account.Saldo) / 1_000_000, "XAH");
    console.log("Sequência:", account.Sequence);
    console.log("Objetos do proprietário:", account.OwnerCount);
  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("A conta não existe no ledger.");
      console.log("Necesita receber ao menos 1 XAH para ativarse.");
    } else {
      console.error("Erro:", error.message);
    }
  }
  await client.disconnect();
}
// Reemplaza com seu endereço de testnet
checkSaldo("rYourXahauAddressHere");`,
            en: `const { Client } = require("xahau");

async function checkBalance(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    console.log("Account:", account.Account);
    console.log("Balance:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("Sequence:", account.Sequence);
    console.log("Owner Count:", account.OwnerCount);
  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("The account does not exist on the ledger.");
      console.log("It needs to receive at least 1 XAH to be activated.");
    } else {
      console.error("Error:", error.message);
    }
  }

  await client.disconnect();
}

// Replace with your testnet address
checkBalance("rYourXahauAddressHere");`,
            jp: `const { Client } = require("xahau");

async function checkBalance(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    console.log("アカウント：", account.Account);
    console.log("残高：", Number(account.Balance) / 1_000_000, "XAH");
    console.log("シーケンス：", account.Sequence);
    console.log("オーナー数：", account.OwnerCount);
  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("アカウントがレジャーに存在しません。");
      console.log("アクティベートには少なくとも1 XAHを受け取る必要があります。");
    } else {
      console.error("エラー：", error.message);
    }
  }

  await client.disconnect();
}

// テストネットのアドレスに置き換えてください
checkBalance("rYourXahauAddressHere");`,
            ko: `const { Client } = require("xahau");

async function checkBalance(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    console.log("계정:", account.Account);
    console.log("잔액:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("시퀀스:", account.Sequence);
    console.log("소유 객체 수:", account.OwnerCount);
  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("계정이 ledger에 존재하지 않습니다.");
      console.log("활성화하려면 최소 1 XAH를 받아야 합니다.");
    } else {
      console.error("오류:", error.message);
    }
  }

  await client.disconnect();
}

// 자신의 testnet 주소로 바꾸세요
checkBalance("rYourXahauAddressHere");`,
            zh: `const { Client } = require("xahau");

async function checkBalance(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    console.log("账户:", account.Account);
    console.log("余额:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("序列号:", account.Sequence);
    console.log("拥有对象数:", account.OwnerCount);
  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("账户不存在于账本中。");
      console.log("需要收到至少 1 XAH 才能激活。");
    } else {
      console.error("错误:", error.message);
    }
  }

  await client.disconnect();
}

// 替换为你的测试网地址
checkBalance("rYourXahauAddressHere");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Testnet de Xahau", pt: "Testnet de Xahau", en: "Xahau Testnet", jp: "Xahauテストネット", ko: "Xahau 테스트넷", zh: "Xahau 测试网" },
          content: {
            es: "Red de pruebas para desarrollo\n\n• Tokens sin valor real\n• Faucet gratuito para obtener test XAH\n• Funciona igual que mainnet\n• Perfecto para aprender",
            pt: "Rede de testes para desenvolvimento\n\n• Tokens sem valor real\n• Faucet gratuito para obter test XAH\n• Funciona igual à mainnet\n• Perfeito para aprender",
            en: "Test network for development\n\n• Tokens with no real value\n• Free faucet to get test XAH\n• Works the same as mainnet\n• Perfect for learning",
            jp: "開発用テストネットワーク\n\n• 実際の価値のないトークン\n• テストXAHを取得する無料フォーセット\n• メインネットと同様に機能する\n• 学習に最適",
            ko: "개발용 테스트 네트워크\n\n• 실제 가치가 없는 토큰\n• test XAH를 받을 수 있는 무료 faucet\n• mainnet과 동일하게 동작\n• 학습에 최적",
            zh: "面向开发的测试网络\n\n• 代币无实际价值\n• 免费水龙头获取 test XAH\n• 与主网运行方式相同\n• 非常适合学习",
          },
          visual: "🧪",
        },
        {
          title: { es: "Flujo de activación", pt: "Fluxo de ativação", en: "Activation flow", jp: "アクティベーションフロー", ko: "활성화 흐름", zh: "激活流程" },
          content: {
            es: "1️⃣ Generar wallet (par de claves)\n2️⃣ Obtener XAH del faucet\n3️⃣ El faucet envía un pago\n4️⃣ La cuenta se crea en el ledger\n5️⃣ ¡Lista para usar!",
            pt: "1️⃣ Gerar wallet (par de chaves)\n2️⃣ Obter XAH do faucet\n3️⃣ O faucet envia um pagamento\n4️⃣ A conta é criada no ledger\n5️⃣ Pronta para usar!",
            en: "1️⃣ Generate wallet (key pair)\n2️⃣ Get XAH from the faucet\n3️⃣ The faucet sends a payment\n4️⃣ The account is created on the ledger\n5️⃣ Ready to use!",
            jp: "1️⃣ ウォレットを生成する（鍵ペア）\n2️⃣ フォーセットからXAHを取得する\n3️⃣ フォーセットが支払いを送る\n4️⃣ アカウントがレジャーに作成される\n5️⃣ 使用準備完了！",
            ko: "1️⃣ 지갑 생성(키 쌍)\n2️⃣ faucet에서 XAH 받기\n3️⃣ faucet이 결제 전송\n4️⃣ 계정이 ledger에 생성됨\n5️⃣ 사용 준비 완료!",
            zh: "1️⃣ 生成钱包（密钥对）\n2️⃣ 从水龙头获取 XAH\n3️⃣ 水龙头发送一笔付款\n4️⃣ 账户在账本中创建\n5️⃣ 可以使用了！",
          },
          visual: "🚀",
        },
        {
          title: { es: "Verificar con account_info", pt: "Verificar com account_info", en: "Verify with account_info", jp: "account_infoで確認する", ko: "account_info로 확인하기", zh: "用 account_info 验证" },
          content: {
            es: "Comando account_info para confirmar activación:\n\n• Balance → XAH disponible (en drops)\n• Sequence → Número de próxima transacción\n• Flags → Configuración de la cuenta\n• OwnerCount → Objetos en el ledger\n\nSi la cuenta no existe: error actNotFound\n1 XAH = 1,000,000 drops",
            pt: "Comando account_info para conassinar ativação:\n\n• Saldo → XAH disponible (em drops)\n• Sequence → Número de próxima transação\n• Flags → Configuração da conta\n• OwnerCount → Objetos no ledger\n\nSi a conta não existe: erro actNotFound\n1 XAH = 1,000,000 drops",
            en: "account_info command to confirm activation:\n\n• Balance → Available XAH (in drops)\n• Sequence → Next transaction number\n• Flags → Account configuration\n• OwnerCount → Objects on the ledger\n\nIf the account does not exist: actNotFound error\n1 XAH = 1,000,000 drops",
            jp: "アクティベーションを確認するaccount_infoコマンド：\n\n• Balance → 利用可能なXAH（dropsで）\n• Sequence → 次のトランザクション番号\n• Flags → アカウント設定\n• OwnerCount → レジャー上のオブジェクト\n\nアカウントが存在しない場合：actNotFoundエラー\n1 XAH = 1,000,000 drops",
            ko: "활성화를 확인하는 account_info 명령:\n\n• Balance → 사용 가능한 XAH(drops 단위)\n• Sequence → 다음 트랜잭션 번호\n• Flags → 계정 설정\n• OwnerCount → ledger의 객체 수\n\n계정이 없으면: actNotFound 오류\n1 XAH = 1,000,000 drops",
            zh: "用 account_info 命令确认激活状态：\n\n• Balance → 可用 XAH（单位 drops）\n• Sequence → 下一笔交易编号\n• Flags → 账户配置\n• OwnerCount → 账本中的对象数\n\n账户不存在时：actNotFound 错误\n1 XAH = 1,000,000 drops",
          },
          visual: "🔎",
        },
      ],
    },
    {
      id: "m3l2b",
      title: {
        es: "Comprobar tu cuenta en exploradores de bloques",
        pt: "Verificar seu conta em exploradores de blocos",
        en: "Check your account on block explorers",
        jp: "ブロックエクスプローラーでアカウントを確認する",
        ko: "블록 익스플로러에서 계정 확인",
        zh: "在区块浏览器中查看账户",
      },
      theory: {
        es: `Una vez que tu cuenta está activada en la testnet (o en mainnet), puedes verificar su estado usando **exploradores de bloques**: aplicaciones web que permiten consultar cualquier cuenta, transacción o ledger de forma visual y sin necesidad de escribir código.

### ¿Qué es un explorador de bloques?

Un **explorador de bloques** es una herramienta web que se conecta a los nodos de Xahau y te presenta la información de la blockchain de forma legible. Es como un "buscador" de la blockchain.

Con un explorer puedes:
- Ver el **balance** y los **tokens** de cualquier cuenta
- Consultar el **historial de transacciones** completo
- Inspeccionar los **detalles** de cualquier transacción (hash, campos, resultado)
- Ver los **objetos del ledger** asociados a una cuenta (trust lines, ofertas, hooks)
- Verificar si una transacción se procesó correctamente

### Exploradores de Xahau Mainnet

**Xahau Explorer** — [xahauexplorer.com](https://xahauexplorer.com)
**XRPLWin Xahau** — [xahau.xrplwin.com](https://xahau.xrplwin.com)
**Xahau Network Explorer** — [explorer.xahau.network](https://explorer.xahau.network)
**XahScan** — [xahscan.com](https://xahscan.com)


### Exploradores de Xahau Testnet

Para consultar cuentas de la **testnet** (que es la que usamos en el curso), usa estos exploradores:

- [test.xahauexplorer.com](https://test.xahauexplorer.com)
- [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
- [explorer.xahau-test.net](https://explorer.xahau-test.net)

### Cómo consultar tu cuenta

1. Abre cualquiera de los exploradores de testnet
2. En la barra de búsqueda, pega tu **dirección** (empieza por \`r\`)
3. Pulsa Enter o haz clic en buscar
4. Verás la información de tu cuenta:
   - **Balance** en XAH
   - **Tokens** que posees (trust lines)
   - **Transacciones** recientes
   - **Flags** y configuración de la cuenta
   - **Objetos** del ledger asociados

### Consultar una transacción

Cada transacción tiene un **hash** único (una cadena hexadecimal larga). Puedes buscar ese hash en el explorer para ver:
- **Tipo** de transacción (Payment, TrustSet, AccountSet, etc.)
- **Cuenta origen** y **destino**
- **Cantidad** enviada
- **Resultado** (tesSUCCESS, tecPATH_DRY, etc.)
- **Fee** pagado
- **Ledger** en el que se incluyó
- **Cambios** en el estado del ledger (AffectedNodes)

### ¿Por qué usar explorers?

- **Verificación visual**: Confirmar que una transacción se procesó correctamente sin escribir código
- **Depuración**: Cuando algo falla, el explorer muestra todos los detalles del error
- **Transparencia**: Cualquier persona puede verificar cualquier operación en la blockchain
- **Aprendizaje**: Ver transacciones reales te ayuda a entender cómo funciona la red por dentro`,
        pt: `Uma vez que sua conta está ativada na testnet (ou em mainnet), você pode verificar seu estado usando **exploradores de blocos**: aplicações web que permitem consultar qualquer conta, transação ou ledger de forma visual e sem necessidade de escrever código.
### O que é um explorador de blocos?
Um **explorador de blocos** é uma herramienta web que se conectà os nós de Xahau e te presenta a informação da blockchain de forma legible. É como um "buscador" da blockchain.
Com um explorer você pode:
- Ver o **balance** e os **tokens** de qualquer conta
- Consultar o **histórico de transações** completo
- Inspecionar os **detalhes** de cualquier transação (hash, campos, resultado)
- Ver os **objetos do ledger** associados a uma conta (trust lines, ofertas, hooks)
- Verificar se uma transação se procesó corretamente
### Exploradores da Xahau Mainnet
**Xahau Explorer** — [xahauexplorer.com](https://xahauexplorer.com)
**XRPLWin Xahau** — [xahau.xrplwin.com](https://xahau.xrplwin.com)
**Xahau Network Explorer** — [explorer.xahau.network](https://explorer.xahau.network)
**XahScan** — [xahscan.com](https://xahscan.com)
### Exploradores da Xahau Testnet
Para consultar contas da **testnet** (que é a que usamos no curso), usa estos exploradores:
- [test.xahauexplorer.com](https://test.xahauexplorer.com)
- [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
- [explorer.xahau-test.net](https://explorer.xahau-test.net)
### Como consultar seu conta
1. Abra cualquiera dos exploradores de testnet
2. Em a barra de búsqueda, pega tu **endereço** (começa com \`r\`)
3. Pulsa Enter ou clique em buscar
4. Você verá a informação de sua conta:
   - **Saldo** em XAH
   - **Tokens** que posees (trust lines)
   - **Transações** recientes
   - **Flags** e configuração da conta
   - **Objetos** do ledger associados
### Consultar uma transação
Cada transação tem um **hash** único (uma string hexadecimal larga). Você pode buscar ese hash no explorer para ver:
- **Tipo** de transação (Payment, TrustSet, AccountSet, etc.)
- **Conta origem** e **destino**
- **Quantidade** enviada
- **Resultado** (tesSUCCESS, tecPATH_DRY, etc.)
- **Fee** pagado
- **Ledger** no que se incluyó
- **Cambios** no estado do ledger (AffectedNodes)
### Por que usar explorers?
- **Verificação visual**: Confirmar que uma transação se procesó corretamente sem escrever código
- **Depuración**: Cuando algo falla, o explorer muestra todos os detalhes do error
- **Transparência**: Cualquier persona pode verificar cualquier operação na blockchain
- **Aprendizaje**: Ver transações reais te ayudà entender como funciona a rede por dentro`,
        en: `Once your account is activated on the testnet (or on mainnet), you can verify its status using **block explorers**: web applications that allow you to query any account, transaction, or ledger visually and without writing code.

### What is a block explorer?

A **block explorer** is a web tool that connects to Xahau nodes and presents blockchain information in a readable format. It is like a "search engine" for the blockchain.

With an explorer you can:
- View the **balance** and **tokens** of any account
- Check the complete **transaction history**
- Inspect the **details** of any transaction (hash, fields, result)
- View the **ledger objects** associated with an account (trust lines, offers, hooks)
- Verify if a transaction was processed successfully

### Xahau Mainnet Explorers

**Xahau Explorer** — [xahauexplorer.com](https://xahauexplorer.com)
**XRPLWin Xahau** — [xahau.xrplwin.com](https://xahau.xrplwin.com)
**Xahau Network Explorer** — [explorer.xahau.network](https://explorer.xahau.network)
**XahScan** — [xahscan.com](https://xahscan.com)


### Xahau Testnet Explorers

To check accounts on the **testnet** (which is the one we use in this course), use these explorers:

- [test.xahauexplorer.com](https://test.xahauexplorer.com)
- [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
- [explorer.xahau-test.net](https://explorer.xahau-test.net)

### How to check your account

1. Open any of the testnet explorers
2. In the search bar, paste your **address** (starts with \`r\`)
3. Press Enter or click search
4. You will see your account information:
   - **Balance** in XAH
   - **Tokens** you hold (trust lines)
   - Recent **transactions**
   - **Flags** and account configuration
   - Associated ledger **objects**

### Check a transaction

Each transaction has a unique **hash** (a long hexadecimal string). You can search for that hash in the explorer to see:
- Transaction **type** (Payment, TrustSet, AccountSet, etc.)
- **Source** and **destination** account
- **Amount** sent
- **Result** (tesSUCCESS, tecPATH_DRY, etc.)
- **Fee** paid
- **Ledger** it was included in
- **Changes** to the ledger state (AffectedNodes)

### Why use explorers?

- **Visual verification**: Confirm that a transaction was processed successfully without writing code
- **Debugging**: When something fails, the explorer shows all error details
- **Transparency**: Anyone can verify any operation on the blockchain
- **Learning**: Viewing real transactions helps you understand how the network works internally`,
        jp: `テストネット（またはメインネット）でアカウントをアクティベートしたら、**ブロックエクスプローラー**を使ってその状態を確認できます。ブロックエクスプローラーとは、コードを書くことなく、任意のアカウント・トランザクション・レジャーを視覚的に照会できるWebアプリケーションです。

### ブロックエクスプローラーとは？

**ブロックエクスプローラー**は、Xahauのノードに接続し、ブロックチェーンの情報を読みやすい形式で表示するWebツールです。ブロックチェーンのための「検索エンジン」のようなものです。

エクスプローラーでできること：
- 任意のアカウントの**残高**と**トークン**を確認
- 完全な**トランザクション履歴**を照会
- 任意のトランザクションの**詳細**（ハッシュ、フィールド、結果）を確認
- アカウントに関連する**レジャーオブジェクト**（トラストライン、オファー、フック）を確認
- トランザクションが正常に処理されたかを検証

### Xahauメインネットのエクスプローラー

**Xahau Explorer** — [xahauexplorer.com](https://xahauexplorer.com)
**XRPLWin Xahau** — [xahau.xrplwin.com](https://xahau.xrplwin.com)
**Xahau Network Explorer** — [explorer.xahau.network](https://explorer.xahau.network)
**XahScan** — [xahscan.com](https://xahscan.com)


### Xahauテストネットのエクスプローラー

**テストネット**（このコースで使用するもの）のアカウントを確認するには、以下のエクスプローラーを使用してください。

- [test.xahauexplorer.com](https://test.xahauexplorer.com)
- [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
- [explorer.xahau-test.net](https://explorer.xahau-test.net)

### アカウントの確認方法

1. テストネットのエクスプローラーを開く
2. 検索バーに**アドレス**（\`r\`で始まる文字列）を貼り付ける
3. Enterキーを押すか検索ボタンをクリック
4. アカウント情報が表示されます。
   - XAHの**残高**
   - 保有している**トークン**（トラストライン）
   - 最近の**トランザクション**
   - **フラグ**とアカウント設定
   - 関連するレジャー**オブジェクト**

### トランザクションの確認

各トランザクションには一意の**ハッシュ**（長い16進数の文字列）があります。そのハッシュをエクスプローラーで検索すると、以下が確認できます。
- トランザクションの**タイプ**（Payment、TrustSet、AccountSetなど）
- **送信元**と**送信先**のアカウント
- 送信された**金額**
- **結果**（tesSUCCESS、tecPATH_DRYなど）
- 支払われた**手数料**
- 含まれた**レジャー**
- レジャー状態の**変更**（AffectedNodes）

### エクスプローラーを使う理由

- **視覚的な確認**：コードを書かずにトランザクションが正常に処理されたことを確認できる
- **デバッグ**：何か失敗した場合、エクスプローラーにエラーの詳細がすべて表示される
- **透明性**：誰でもブロックチェーン上のすべての操作を確認できる
- **学習**：実際のトランザクションを見ることで、ネットワークの内部動作を理解できる`,
        ko: `계정이 testnet(또는 mainnet)에서 활성화되면 **블록 익스플로러**를 사용해 상태를 시각적으로 확인할 수 있습니다. 블록 익스플로러는 코드를 작성하지 않고도 어떤 계정, 트랜잭션, ledger든 조회할 수 있는 웹 애플리케이션입니다.

### 블록 익스플로러란?

**블록 익스플로러**는 Xahau 노드에 연결해 블록체인 정보를 읽기 쉬운 형태로 보여 주는 웹 도구입니다. 블록체인의 "검색 엔진"이라고 생각하면 됩니다.

익스플로러로 할 수 있는 일:
- 모든 계정의 **잔액**과 **토큰** 확인
- 전체 **트랜잭션 기록** 조회
- 각 트랜잭션의 **세부 정보**(해시, 필드, 결과) 확인
- 계정과 연관된 **ledger 객체**(trust line, offer, hook) 확인
- 트랜잭션이 성공적으로 처리되었는지 검증

### Xahau Mainnet 익스플로러

**Xahau Explorer** — [xahauexplorer.com](https://xahauexplorer.com)
**XRPLWin Xahau** — [xahau.xrplwin.com](https://xahau.xrplwin.com)
**Xahau Network Explorer** — [explorer.xahau.network](https://explorer.xahau.network)
**XahScan** — [xahscan.com](https://xahscan.com)


### Xahau Testnet 익스플로러

이 강의에서 사용하는 **testnet** 계정을 확인하려면 다음 익스플로러를 사용하세요:

- [test.xahauexplorer.com](https://test.xahauexplorer.com)
- [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
- [explorer.xahau-test.net](https://explorer.xahau-test.net)

### 계정 확인 방법

1. testnet 익스플로러 중 하나를 엽니다
2. 검색창에 **주소**(\`r\`로 시작)를 붙여넣습니다
3. Enter를 누르거나 검색 버튼을 누릅니다
4. 다음 계정 정보를 볼 수 있습니다:
   - XAH **잔액**
   - 보유 중인 **토큰**(trust line)
   - 최근 **트랜잭션**
   - **플래그**와 계정 설정
   - 연관된 ledger **객체**

### 트랜잭션 확인

각 트랜잭션에는 고유한 **해시**(긴 16진수 문자열)가 있습니다. 이 해시를 익스플로러에서 검색하면 다음을 확인할 수 있습니다:
- 트랜잭션 **유형**(Payment, TrustSet, AccountSet 등)
- **출발** 계정과 **도착** 계정
- 전송된 **금액**
- **결과**(tesSUCCESS, tecPATH_DRY 등)
- 지불한 **수수료**
- 포함된 **ledger**
- ledger 상태의 **변경 사항**(AffectedNodes)

### 왜 익스플로러를 사용할까?

- **시각적 검증**: 코드를 작성하지 않고도 트랜잭션 성공 여부를 확인할 수 있습니다
- **디버깅**: 문제가 생기면 익스플로러가 오류 세부 정보를 보여 줍니다
- **투명성**: 누구나 블록체인의 모든 작업을 검증할 수 있습니다
- **학습**: 실제 트랜잭션을 보면 네트워크 내부 동작을 더 잘 이해할 수 있습니다`,
        zh: `账户在测试网（或主网）激活后，可以使用**区块浏览器**直观地查看其状态。区块浏览器是一种 Web 应用，无需编写代码即可查询任何账户、交易或账本信息。

### 什么是区块浏览器？

**区块浏览器**是一种连接到 Xahau 节点并以可读形式展示区块链信息的 Web 工具，相当于区块链的"搜索引擎"。

使用浏览器可以：
- 查看任意账户的**余额**和**代币**
- 查询完整的**交易历史**
- 检查任意交易的**详细信息**（哈希、字段、结果）
- 查看与账户关联的**账本对象**（trust line、offer、hook）
- 验证交易是否成功处理

### Xahau 主网浏览器

**Xahau Explorer** — [xahauexplorer.com](https://xahauexplorer.com)
**XRPLWin Xahau** — [xahau.xrplwin.com](https://xahau.xrplwin.com)
**Xahau Network Explorer** — [explorer.xahau.network](https://explorer.xahau.network)
**XahScan** — [xahscan.com](https://xahscan.com)


### Xahau 测试网浏览器

要查询本课程使用的**测试网**账户，请使用以下浏览器：

- [test.xahauexplorer.com](https://test.xahauexplorer.com)
- [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
- [explorer.xahau-test.net](https://explorer.xahau-test.net)

### 如何查询账户

1. 打开任意测试网浏览器
2. 在搜索栏中粘贴你的**地址**（以 \`r\` 开头）
3. 按 Enter 或点击搜索
4. 你将看到账户信息：
   - XAH **余额**
   - 持有的**代币**（trust line）
   - 最近的**交易**
   - **标志（Flags）**和账户配置
   - 关联的账本**对象**

### 查询交易

每笔交易都有唯一的**哈希**（一长串十六进制字符串）。在浏览器中搜索该哈希可查看：
- 交易**类型**（Payment、TrustSet、AccountSet 等）
- **发送方**和**接收方**账户
- 发送的**金额**
- **结果**（tesSUCCESS、tecPATH_DRY 等）
- 支付的**手续费**
- 所在的**账本**
- 账本状态的**变更**（AffectedNodes）

### 为什么使用浏览器？

- **可视化验证**：无需编写代码即可确认交易是否成功处理
- **调试**：出现问题时，浏览器会显示所有错误详情
- **透明性**：任何人都可以验证区块链上的任何操作
- **学习**：查看真实交易有助于理解网络内部的工作原理`,
      },
            codeBlocks: [],
      slides: [
        {
          title: { es: "¿Qué es un block explorer?", pt: "¿Qué é um block explorer?", en: "What is a block explorer?", jp: "ブロックエクスプローラーとは？", ko: "블록 익스플로러란?", zh: "什么是区块浏览器？" },
          content: {
            es: "Una herramienta web para consultar la blockchain\nsin escribir código\n\n• Ver balances y tokens de cualquier cuenta\n• Consultar historial de transacciones\n• Inspeccionar detalles de cada operación\n• Verificar resultados y errores",
            pt: "Uma ferramenta web para consultar a blockchain\nsem escrever código\n\n• Ver saldos e tokens de qualquer conta\n• Consultar histórico de transações\n• Inspecionar detalhes de cada operação\n• Verificar resultados e erros",
            en: "A web tool to query the blockchain\nwithout writing code\n\n• View balances and tokens of any account\n• Check transaction history\n• Inspect details of each operation\n• Verify results and errors",
            jp: "コードを書かずにブロックチェーンを照会できるWebツール\n\n• 任意のアカウントの残高とトークンを確認\n• トランザクション履歴を照会\n• 各操作の詳細を確認\n• 結果とエラーを検証",
            ko: "코드 없이 블록체인을 조회하는 웹 도구\n\n• 모든 계정의 잔액과 토큰 확인\n• 트랜잭션 기록 조회\n• 각 작업의 세부 정보 확인\n• 결과와 오류 검증",
            zh: "无需编写代码即可查询区块链的 Web 工具\n\n• 查看任意账户的余额和代币\n• 查询交易历史\n• 检查每个操作的详情\n• 验证结果和错误",
          },
          visual: "🔍",
        },
        {
          title: { es: "Exploradores de Xahau", pt: "Exploradores de Xahau", en: "Xahau Explorers", jp: "Xahauのエクスプローラー", ko: "Xahau 익스플로러", zh: "Xahau 浏览器" },
          content: {
            es: "Mainnet:\n• xahauexplorer.com\n• xahau.xrplwin.com\n• explorer.xahau.network\n• xahscan.com\n\nTestnet (para el curso):\n• test.xahauexplorer.com\n• xahau-testnet.xrplwin.com\n• explorer.xahau-test.net",
            pt: "Mainnet:\n• xahauexplorer.com\n• xahau.xrplwin.com\n• explorer.xahau.network\n• xahscan.com\n\nTestnet (para o curso):\n• test.xahauexplorer.com\n• xahau-testnet.xrplwin.com\n• explorer.xahau-test.net",
            en: "Mainnet:\n• xahauexplorer.com\n• xahau.xrplwin.com\n• explorer.xahau.network\n• xahscan.com\n\nTestnet (for the course):\n• test.xahauexplorer.com\n• xahau-testnet.xrplwin.com\n• explorer.xahau-test.net",
            jp: "メインネット：\n• xahauexplorer.com\n• xahau.xrplwin.com\n• explorer.xahau.network\n• xahscan.com\n\nテストネット（コース用）：\n• test.xahauexplorer.com\n• xahau-testnet.xrplwin.com\n• explorer.xahau-test.net",
            ko: "Mainnet:\n• xahauexplorer.com\n• xahau.xrplwin.com\n• explorer.xahau.network\n• xahscan.com\n\nTestnet(강의용):\n• test.xahauexplorer.com\n• xahau-testnet.xrplwin.com\n• explorer.xahau-test.net",
            zh: "主网：\n• xahauexplorer.com\n• xahau.xrplwin.com\n• explorer.xahau.network\n• xahscan.com\n\n测试网（课程使用）：\n• test.xahauexplorer.com\n• xahau-testnet.xrplwin.com\n• explorer.xahau-test.net",
          },
          visual: "🌐",
        },
        {
          title: { es: "Cómo consultar tu cuenta", pt: "Como consultar sua conta", en: "How to check your account", jp: "アカウントの確認方法", ko: "계정 확인 방법", zh: "如何查询账户" },
          content: {
            es: "1️⃣ Abre un explorer de testnet\n2️⃣ Pega tu dirección (r...)\n3️⃣ Verás:\n   • Balance en XAH\n   • Tokens y trust lines\n   • Historial de transacciones\n   • Flags y configuración\n\nTambién puedes buscar por hash de transacción",
            pt: "1️⃣ Abra um explorer de testnet\n2️⃣ Cole seu endereço (r...)\n3️⃣ Você verá:\n   • Saldo em XAH\n   • Tokens e trust lines\n   • Histórico de transações\n   • Flags e configuração\n\nTambién você pode buscar por hash de transação",
            en: "1️⃣ Open a testnet explorer\n2️⃣ Paste your address (r...)\n3️⃣ You will see:\n   • Balance in XAH\n   • Tokens and trust lines\n   • Transaction history\n   • Flags and configuration\n\nYou can also search by transaction hash",
            jp: "1️⃣ テストネットのエクスプローラーを開く\n2️⃣ アドレス（r...）を貼り付ける\n3️⃣ 表示される情報：\n   • XAHの残高\n   • トークンとトラストライン\n   • トランザクション履歴\n   • フラグと設定\n\nトランザクションハッシュで検索することもできます",
            ko: "1️⃣ testnet 익스플로러 열기\n2️⃣ 주소(r...) 붙여넣기\n3️⃣ 다음 정보를 확인:\n   • XAH 잔액\n   • 토큰과 trust line\n   • 트랜잭션 기록\n   • 플래그와 설정\n\n트랜잭션 해시로도 검색할 수 있습니다",
            zh: "1️⃣ 打开测试网浏览器\n2️⃣ 粘贴你的地址（r...）\n3️⃣ 你将看到：\n   • XAH 余额\n   • 代币和 trust line\n   • 交易历史\n   • 标志和配置\n\n也可以通过交易哈希搜索",
          },
          visual: "📋",
        },
      ],
    },
    {
      id: "m3l3",
      title: {
        es: "Seguridad de wallets y buenas prácticas",
        pt: "Segurança de wallets e boas práticas",
        en: "Wallet security and best practices",
        jp: "ウォレットのセキュリティとベストプラクティス",
        ko: "지갑 보안과 모범 사례",
        zh: "钱包安全与最佳实践",
      },
      theory: {
        es: `La seguridad de tu wallet es lo más importante al trabajar con blockchain. Una wallet comprometida significa la **pérdida total e irreversible** de tus fondos. En esta lección aprenderás las mejores prácticas para proteger tu cuenta.

### Nunca compartas tu seed/clave secreta

Tu seed (clave privada) es la **única forma de controlar tu cuenta**. Quien tenga tu seed puede firmar cualquier transacción en tu nombre: enviar todos tus fondos, cambiar configuraciones, etc. No hay forma de revertir esto.

Reglas fundamentales:
- **Nunca** envíes tu seed por chat, email o ningún medio digital
- **Nunca** la introduzcas en sitios web o aplicaciones que no sean de absoluta confianza
- **Nunca** la guardes en texto plano en tu ordenador
- **Nunca** hagas captura de pantalla o foto de tu seed

### Hot Wallet vs Cold Wallet

**Hot Wallet (cartera caliente)**:
- Conectada a internet permanentemente
- Conveniente para transacciones frecuentes
- Mayor riesgo de ser comprometida
- Ejemplo: wallet en una aplicación web, bot de trading

**Cold Wallet (cartera fría)**:
- Desconectada de internet
- Máxima seguridad para almacenamiento a largo plazo
- Menos conveniente para uso diario
- Ejemplo: wallet generada offline, hardware wallet, paper wallet

### Buenas prácticas para almacenar seeds

1. **Offline**: Genera y guarda seeds en un dispositivo que nunca se conecte a internet
2. **Hardware wallet**: Dispositivos especializados (Ledger, Trezor) que almacenan claves de forma segura
3. **Paper wallet**: Escribe la seed en papel y guárdala en un lugar seguro (caja fuerte, caja de seguridad bancaria)
4. **Múltiples copias**: Guarda copias en diferentes ubicaciones físicas por si hay incendio, inundación, etc.
5. **Metal backup**: Graba tu seed en una placa de metal resistente al fuego y al agua

### Seeds de testnet: la excepción

Las seeds de **testnet** son seguras de compartir en contextos educativos porque:
- Los tokens de testnet **no tienen valor real**
- La testnet se puede resetear en cualquier momento
- Son útiles para depurar problemas con otros desarrolladores

Aun así, es buena práctica tratarlas con cuidado para crear buenos hábitos.

### Estafas comunes y cómo evitarlas

**Phishing**:
- Sitios web falsos que imitan interfaces legítimas
- Te piden ingresar tu seed para "verificar" tu cuenta
- Siempre verifica la URL y no hagas clic en enlaces sospechosos

**Fake dApps**:
- Aplicaciones que prometen rendimientos irreales
- Piden permisos excesivos o tu seed directamente
- Investiga siempre el código fuente y la reputación del proyecto

**Ingeniería social**:
- Personas que se hacen pasar por soporte técnico
- Ofrecen "ayuda" a cambio de tu seed
- Ningún soporte legítimo te pedirá jamás tu clave privada

**Airdrops falsos**:
- Tokens que aparecen en tu wallet sin pedirlos
- Al intentar interactuar con ellos, te redirigen a sitios maliciosos
- Ignora tokens desconocidos que no esperabas recibir

### Regular Keys: cambiar la clave de firma

Xahau ofrece una funcionalidad avanzada llamada **Regular Key**: puedes asignar un **par de claves alternativo** que tenga permiso para firmar transacciones en nombre de tu cuenta.

Ventajas:
- Si la regular key se compromete, puedes cambiarla por otra nueva sin cambiar tu dirección
- Puedes desactivar la clave maestra y usar solo la regular key para operaciones diarias
- La dirección de tu cuenta permanece igual

### Master Key Disable: seguridad avanzada

Para máxima seguridad, puedes **desactivar tu clave maestra** (master key disable):
1. Primero, configuras una regular key
2. Luego, desactivas la master key con un flag de cuenta
3. Ahora solo la regular key puede firmar transacciones
4. Si la regular key se compromete, puedes reactivar la master key para recuperar el control

Esto añade una capa extra de protección: incluso si alguien obtiene tu master seed, no podrá usarlo mientras esté desactivado.

### Multi-signing: múltiples firmas

Para cuentas de alto valor o gobernanza, Xahau soporta **multi-signing**:

- Se configura una lista de firmantes autorizados con un **quorum** (peso mínimo requerido)
- Cada firmante tiene un peso asignado
- Una transacción solo es válida si recibe suficientes firmas para alcanzar el quorum
- Ejemplo: 3 firmantes con peso 1 cada uno, quorum de 2 → se necesitan al menos 2 de 3 firmas

Multi-signing es ideal para:
- Tesorerías de organizaciones
- Cuentas compartidas entre socios
- Cualquier situación donde una sola persona no debería tener control total`,
        pt: `A segurança da sua wallet é o mais importante ao trabalhar com blockchain. Uma wallet comprometida significa a **perda total e irreversível** de seus fundos. Nesta lição você aprenderá as melhores práticas para proteger sua conta.
### Nunca compartilhe seu seed/chave secreta
Tu seed (chave privada) é a **única forma de controlar sua conta**. Quem tenga tu seed pode assinar cualquier transação em tu nombre: enviar todos seus fundos, mudar configurações, etc. Não há forma de revertir esto.
Reglas fundamentales:
- **Nunca** envíé tu seed por chat, email ou ningún medio digital
- **Nunca** a introduzcas em sitios web ou aplicaciones que no sean de absoluta confiança
- **Nunca** a guardes em texto plano em tu ordenador
- **Nunca** hagas captura de pantallao foto de tu seed
### Hot Wallet vs Cold Wallet
**Hot Wallet (carteira caliente)**:
- Conectadà internet permanentemente
- Conveniente para transações frecuentes
- Mayor risco de ser comprometida
- Exemplo: wallet em uma aplicación web, bot de trading
**Cold Wallet (carteira fría)**:
- Desconectada de internet
- Máxima segurança para armazenamiento a largo plazo
- Menos conveniente para uso diario
- Exemplo: wallet gerada offline, hardware wallet, paper wallet
### Boas práticas para armazenar seeds
1. **Offline**: Genera e guarda seeds em um dispositivo que nunca se conecte a internet
2. **Hardware wallet**: Dispositivos especializados (Ledger, Trezor) que armazenan chaves de forma segura
3. **Paper wallet**: Escribe a seed em papel e guárdala em um lugar seguro (caja fuerte, caja de segurança bancaria)
4. **Múltiples cópias**: Guarda cópias em diferentes ubicaciones físicas por se hay incendio, inundación, etc.
5. **Metal backup**: Graba tu seed em uma placa de metal resistente ao fuego e ao agua
### Seeds de testnet: a excepción
As seeds de **testnet** são seguras de compartilhar em contextos educativos porque:
- Os tokens de testnet **não têm valor real**
- A testnet se pode resetear em cualquier momento
- São útiles para depurar problemas com otros desarrolladores
Aun así, é buena práctica tratarlas com cuidado para criar buenos hábitos.
### Estafas comunes e cómo evitarlas
**Phishing**:
- Sitios web falsos que imitan interfaces legítimas
- Te piden ingresar tu seed para "verificar" sua conta
- Sempre verifica a URL e no hagas clic em enlaces sospechosos
**Fake dApps**:
- Aplicaciones que prometen rendimientos irreais
- Piden permisos excesivos ou tu seed diretamente
- Investiga sempre o código-fonte e a reputación do projeto
**Ingeniería social**:
- Personas que se hacen pasar por soporte técnico
- Ofrecen "ayuda" a alteração de tu seed
- Ningún soporte legítimo te pedirá jamás sua chave privada
**Airdrops falsos**:
- Tokens que aparecen em tu wallet sem pedirlos
- Ao intentar interagir com ellos, te redirigen a sitios maliciosos
- Ignora tokens desconocidos que no esperabas recibir
### Regular Keys: mudar a chave de assinatura
Xahau ofrece uma funcionalidad avanzada llamada **Regular Key**: você pode asignar um **par de chaves alternativo** que tenga permiso para assinar transações em nombre de sua conta.
Ventajas:
- Se a regular key se compromete, você pode mudarla por otra nova sem mudar tu endereço
- Você pode desativar a chave maestra e usar solo a regular key para operações diarias
- A endereço de sua conta permanece igual
### Master Key Disable: segurança avanzada
Para máxima segurança, você pode **desativar sua chave maestra** (master key disable):
1. Primero, configuras uma regular key
2. Luego, desativas a master key com um flag de conta
3. Ahora solo a regular key pode assinar transações
4. Se a regular key se compromete, você pode reativar a master key para recuperar o control
Esto añade uma capa extra de proteção: mesmo se alguien obtem tu master seed, no podrá usarlo enquanto esté desativado.
### Multi-signing: múltiplas assinaturas
Para contas de alto valor ou gobernanza, Xahau soporta **multi-signing**:
- Se configura uma lista de firmantes autorizados com um **quorum** (peso mínimo exigido)
- Cada firmante tem um peso asignado
- Uma transação solo é válida se recibe suficientes assinaturas para alcanzar o quorum
- Exemplo: 3 firmantes com peso 1 cada uno, quorum de 2 → se precisam ao menos 2 de 3 assinaturas
Multi-signing é ideal para:
- Tesorerías de organizaciones
- Contas compartidas entre socios
- Cualquier situación donde uma sola persona no debería tener control total`,
        en: `Wallet security is the most important thing when working with blockchain. A compromised wallet means the **total and irreversible loss** of your funds. In this lesson you will learn the best practices to protect your account.

### Never share your seed/secret key

Your seed (private key) is the **only way to control your account**. Anyone who has your seed can sign any transaction on your behalf: send all your funds, change configurations, etc. There is no way to reverse this.

Fundamental rules:
- **Never** send your seed via chat, email, or any digital medium
- **Never** enter it on websites or applications that are not absolutely trustworthy
- **Never** store it in plain text on your computer
- **Never** take a screenshot or photo of your seed

### Hot Wallet vs Cold Wallet

**Hot Wallet**:
- Permanently connected to the internet
- Convenient for frequent transactions
- Higher risk of being compromised
- Example: wallet in a web application, trading bot

**Cold Wallet**:
- Disconnected from the internet
- Maximum security for long-term storage
- Less convenient for daily use
- Example: wallet generated offline, hardware wallet, paper wallet

### Best practices for storing seeds

1. **Offline**: Generate and store seeds on a device that never connects to the internet
2. **Hardware wallet**: Specialized devices (Ledger, Trezor) that store keys securely
3. **Paper wallet**: Write the seed on paper and store it in a safe place (safe, bank safety deposit box)
4. **Multiple copies**: Keep copies in different physical locations in case of fire, flood, etc.
5. **Metal backup**: Engrave your seed on a fire-resistant and water-resistant metal plate

### Testnet seeds: the exception

**Testnet** seeds are safe to share in educational contexts because:
- Testnet tokens **have no real value**
- The testnet can be reset at any time
- They are useful for debugging issues with other developers

Even so, it is good practice to treat them carefully to build good habits.

### Common scams and how to avoid them

**Phishing**:
- Fake websites that imitate legitimate interfaces
- They ask you to enter your seed to "verify" your account
- Always verify the URL and do not click on suspicious links

**Fake dApps**:
- Applications that promise unrealistic returns
- They request excessive permissions or your seed directly
- Always investigate the source code and the project's reputation

**Social engineering**:
- People pretending to be technical support
- They offer "help" in exchange for your seed
- No legitimate support will ever ask for your private key

**Fake airdrops**:
- Tokens that appear in your wallet without requesting them
- When trying to interact with them, they redirect you to malicious sites
- Ignore unknown tokens that you did not expect to receive

### Regular Keys: changing the signing key

Xahau offers an advanced feature called **Regular Key**: you can assign an **alternative key pair** that has permission to sign transactions on behalf of your account.

Advantages:
- If the regular key is compromised, you can change it to a new one without changing your address
- You can disable the master key and use only the regular key for daily operations
- Your account address remains the same

### Master Key Disable: advanced security

For maximum security, you can **disable your master key** (master key disable):
1. First, you set up a regular key
2. Then, you disable the master key with an account flag
3. Now only the regular key can sign transactions
4. If the regular key is compromised, you can reactivate the master key to regain control

This adds an extra layer of protection: even if someone obtains your master seed, they cannot use it while it is disabled.

### Multi-signing: multiple signatures

For high-value or governance accounts, Xahau supports **multi-signing**:

- A list of authorized signers is configured with a **quorum** (minimum required weight)
- Each signer has an assigned weight
- A transaction is only valid if it receives enough signatures to reach the quorum
- Example: 3 signers with weight 1 each, quorum of 2 → at least 2 of 3 signatures are needed

Multi-signing is ideal for:
- Organization treasuries
- Shared accounts between partners
- Any situation where a single person should not have total control`,
        jp: `ブロックチェーンで作業する際、ウォレットのセキュリティは最も重要なことです。ウォレットが侵害されると、資金の**完全かつ永久的な損失**を意味します。このレッスンでは、アカウントを保護するためのベストプラクティスを学びます。

### シード／秘密鍵を絶対に共有しないこと

あなたのシード（秘密鍵）は、**アカウントをコントロールする唯一の方法**です。あなたのシードを持っている人は、あなたの代わりにすべての資金を送ったり、設定を変更したりなどあらゆるトランザクションに署名できます。これを元に戻す方法はありません。

基本ルール：
- チャット、メール、その他のデジタル手段でシードを**絶対に**送らない
- 絶対に信頼できないWebサイトやアプリケーションには**絶対に**入力しない
- コンピュータにプレーンテキストで**絶対に**保存しない
- シードのスクリーンショットや写真を**絶対に**撮らない

### ホットウォレット vs コールドウォレット

**ホットウォレット（Hot Wallet）**：
- 常時インターネットに接続している
- 頻繁なトランザクションに便利
- 侵害されるリスクが高い
- 例：Webアプリケーション内のウォレット、トレーディングボット

**コールドウォレット（Cold Wallet）**：
- インターネットから切断されている
- 長期保管のための最高のセキュリティ
- 日常使用には不便
- 例：オフラインで生成されたウォレット、ハードウェアウォレット、ペーパーウォレット

### シードの保管に関するベストプラクティス

1. **オフライン**：インターネットに接続したことのないデバイスでシードを生成・保管する
2. **ハードウェアウォレット**：鍵を安全に保管する専用デバイス（Ledger、Trezorなど）
3. **ペーパーウォレット**：シードを紙に書き、安全な場所（金庫、銀行の貸金庫）に保管する
4. **複数のコピー**：火災、洪水などに備えて、異なる物理的な場所にコピーを保管する
5. **メタルバックアップ**：耐火・耐水性のある金属プレートにシードを刻む

### テストネットのシード：例外

**テストネット**のシードは教育的なコンテキストでは共有しても安全です。理由は次の通りです。
- テストネットのトークンは**実際の価値がない**
- テストネットはいつでもリセットできる
- 他の開発者との問題のデバッグに役立つ

それでも、良い習慣を身につけるために、注意して扱うことが推奨されます。

### よくある詐欺とその回避方法

**フィッシング**：
- 正規のインターフェースを模倣した偽のWebサイト
- アカウントを「確認する」ためにシードを入力するよう求める
- URLを必ず確認し、不審なリンクはクリックしない

**偽のdApps**：
- 非現実的なリターンを約束するアプリケーション
- 過剰な権限やシードを直接要求する
- 常にソースコードとプロジェクトの評判を調査する

**ソーシャルエンジニアリング**：
- テクニカルサポートを装った人物
- シードと引き換えに「助け」を申し出る
- 正規のサポートはあなたの秘密鍵を求めることは絶対にない

**偽のエアドロップ**：
- 要求していないのにウォレットに現れるトークン
- 操作しようとすると悪意のあるサイトにリダイレクトされる
- 受け取ることを期待していない未知のトークンは無視する

### レギュラーキー：署名鍵の変更

Xahauは**レギュラーキー（Regular Key）**と呼ばれる高度な機能を提供しています：アカウントの代わりにトランザクションに署名する権限を持つ**代替キーペア**を割り当てることができます。

利点：
- レギュラーキーが侵害されても、アドレスを変更せずに新しいキーに変更できる
- マスターキーを無効にして、日常業務にはレギュラーキーのみを使用できる
- アカウントのアドレスは変わらない

### マスターキーの無効化：高度なセキュリティ

最高のセキュリティのために、**マスターキーを無効化**（master key disable）することができます：
1. まず、レギュラーキーを設定する
2. 次に、アカウントフラグでマスターキーを無効にする
3. これにより、レギュラーキーのみがトランザクションに署名できる
4. レギュラーキーが侵害された場合、マスターキーを再アクティベートしてコントロールを取り戻せる

これは追加の保護レイヤーを加えます。誰かがマスターシードを入手しても、無効化されている間は使用できません。

### マルチシグ：複数の署名

高額アカウントやガバナンス用に、Xahauは**マルチシグ（multi-signing）**をサポートしています。

- 承認された署名者のリストと**閾値**（必要な最小ウェイト）を設定する
- 各署名者には重みが割り当てられる
- トランザクションは閾値に達するのに十分な署名を受け取った場合にのみ有効
- 例：各重み1の3人の署名者、閾値2 → 3人中少なくとも2人の署名が必要

マルチシグに適した用途：
- 組織の資金管理
- パートナー間の共有アカウント
- 一人の人物が完全な管理権を持つべきでない状況`,
        ko: `블록체인에서 지갑 보안은 가장 중요한 주제 중 하나입니다. 시드가 노출되면 자금과 권한을 **되돌릴 수 없이 잃을 수 있습니다**. 이 레슨에서는 계정을 보호하기 위한 모범 사례를 배웁니다.

### 시드/비밀키를 절대 공유하지 마세요

시드(개인 키)는 **계정을 제어하는 유일한 방법**입니다. 누군가 시드를 갖고 있으면, 당신을 대신해 모든 자금을 보내거나 설정을 변경하는 등 어떤 트랜잭션이든 서명할 수 있습니다. 이것은 되돌릴 수 없습니다.

기본 규칙:
- **절대** 채팅, 이메일 또는 어떤 디지털 수단으로도 시드를 보내지 마세요
- 완전히 신뢰할 수 없는 웹사이트나 앱에는 **절대** 입력하지 마세요
- 컴퓨터에 평문으로 **절대** 저장하지 마세요
- 시드의 스크린샷이나 사진을 **절대** 찍지 마세요

### Hot Wallet vs Cold Wallet

**Hot Wallet**:
- 항상 인터넷에 연결되어 있습니다
- 자주 거래할 때 편리합니다
- 침해될 위험이 더 높습니다
- 예: 웹 애플리케이션 지갑, 트레이딩 봇

**Cold Wallet**:
- 인터넷과 분리되어 있습니다
- 장기 보관에 가장 높은 보안을 제공합니다
- 일상적인 사용에는 덜 편리합니다
- 예: 오프라인 생성 지갑, 하드웨어 지갑, 종이 지갑

### 시드 보관 모범 사례

1. **오프라인**: 인터넷에 연결되지 않는 장치에서 시드를 생성하고 보관합니다
2. **하드웨어 지갑**: 키를 안전하게 보관하는 전용 장치(Ledger, Trezor 등)를 사용합니다
3. **종이 지갑**: 시드를 종이에 적어 안전한 장소(금고, 은행 금고)에 보관합니다
4. **여러 복사본**: 화재, 홍수 등에 대비해 다른 물리적 위치에 복사본을 보관합니다
5. **금속 백업**: 내화성과 방수성이 있는 금속판에 시드를 새깁니다

### Testnet 시드: 예외

**testnet** 시드는 교육용 상황에서는 공유해도 안전합니다:
- testnet 토큰은 **실제 가치가 없습니다**
- testnet은 언제든지 리셋될 수 있습니다
- 다른 개발자와 문제를 디버깅하는 데 유용합니다

그래도 좋은 습관을 만들기 위해 조심해서 다루는 것이 좋습니다.

### 흔한 사기와 예방법

**피싱**:
- 합법적인 인터페이스를 모방한 가짜 웹사이트
- 계정을 "확인"한다며 시드 입력을 요구함
- 항상 URL을 확인하고 수상한 링크를 클릭하지 마세요

**가짜 dApp**:
- 비현실적인 수익을 약속하는 애플리케이션
- 과도한 권한이나 시드를 직접 요구함
- 항상 소스 코드와 프로젝트 평판을 조사하세요

**사회공학**:
- 기술 지원을 사칭하는 사람들
- 시드를 대가로 "도움"을 제안함
- 정상적인 지원팀은 절대 개인 키를 요구하지 않습니다

**가짜 에어드롭**:
- 요청하지 않았는데 지갑에 나타나는 토큰
- 상호작용하려고 하면 악성 사이트로 이동시킴
- 예상하지 못한 알 수 없는 토큰은 무시하세요

### Regular Key: 서명 키 변경

Xahau는 **Regular Key**라는 고급 기능을 제공합니다. 계정을 대신해 트랜잭션에 서명할 권한이 있는 **대체 키 쌍**을 설정할 수 있습니다.

장점:
- regular key가 노출되더라도 주소를 바꾸지 않고 새 키로 교체할 수 있습니다
- master key를 비활성화하고 일상 작업에는 regular key만 사용할 수 있습니다
- 계정 주소는 그대로 유지됩니다

### Master Key Disable: 고급 보안

최대 보안을 위해 **master key를 비활성화**할 수 있습니다:
1. 먼저 regular key를 설정합니다
2. 그다음 account flag로 master key를 비활성화합니다
3. 이제 regular key만 트랜잭션에 서명할 수 있습니다
4. regular key가 노출되면 master key를 다시 활성화해 제어권을 회복할 수 있습니다

이것은 추가 보호 계층을 제공합니다. 누군가 master seed를 얻더라도 비활성화된 동안에는 사용할 수 없습니다.

### Multi-signing: 다중 서명

고가치 계정이나 거버넌스용 계정에 대해 Xahau는 **multi-signing**을 지원합니다:

- 승인된 서명자 목록을 **quorum**(최소 필요 가중치)과 함께 설정합니다
- 각 서명자에는 가중치가 할당됩니다
- quorum에 도달할 만큼 충분한 서명을 받아야만 트랜잭션이 유효합니다
- 예: 가중치 1의 서명자 3명, quorum 2 → 최소 3명 중 2명의 서명이 필요

Multi-signing은 다음에 적합합니다:
- 조직 재무 계정
- 파트너 간 공동 계정
- 한 사람에게 완전한 통제권을 주면 안 되는 모든 상황`,
        zh: `在区块链领域，钱包安全是最重要的事情。钱包一旦被攻破，意味着你的资金将**彻底且不可逆地损失**。本课将学习保护账户的最佳实践。

### 永远不要分享你的 seed/私钥

你的 seed（私钥）是**控制账户的唯一方式**。任何人拥有你的 seed，就可以以你的名义签署任何交易：发送所有资金、修改配置等，且无法撤销。

基本规则：
- **绝不**通过聊天、邮件或任何数字渠道发送 seed
- **绝不**在不完全信任的网站或应用中输入 seed
- **绝不**以明文形式保存在电脑中
- **绝不**对 seed 截图或拍照

### 热钱包 vs 冷钱包

**热钱包（Hot Wallet）**：
- 始终连接互联网
- 适合频繁交易
- 被攻击风险较高
- 例：Web 应用钱包、交易机器人

**冷钱包（Cold Wallet）**：
- 与互联网断开
- 长期存储的最高安全级别
- 日常使用不太方便
- 例：离线生成的钱包、硬件钱包、纸质钱包

### 保存 seed 的最佳实践

1. **离线**：在从未联网的设备上生成并保存 seed
2. **硬件钱包**：使用专用设备（Ledger、Trezor）安全存储密钥
3. **纸质钱包**：将 seed 写在纸上，存放在安全的地方（保险箱、银行保险柜）
4. **多份备份**：在不同物理位置保存副本，以防火灾、洪水等
5. **金属备份**：将 seed 刻在防火防水的金属板上

### 测试网 seed：例外情况

**测试网** seed 在教育场景中可以安全分享，因为：
- 测试网代币**没有实际价值**
- 测试网可以随时重置
- 有助于与其他开发者协作调试问题

即便如此，养成谨慎习惯仍然重要。

### 常见诈骗及防范

**钓鱼（Phishing）**：
- 模仿合法界面的假网站
- 要求输入 seed 来"验证"账户
- 始终检查 URL，不点击可疑链接

**假 dApp**：
- 承诺不切实际回报的应用
- 要求过度权限或直接索取 seed
- 始终调查源代码和项目声誉

**社会工程**：
- 冒充技术支持人员
- 以"提供帮助"为由索取 seed
- 任何合法支持人员都不会要求你提供私钥

**假空投（Fake Airdrops）**：
- 未经请求出现在钱包中的代币
- 尝试交互时会跳转到恶意网站
- 忽略不期而至的未知代币

### Regular Key：更换签名密钥

Xahau 提供名为 **Regular Key** 的高级功能：你可以设置一个**备用密钥对**，该密钥对有权代表账户签署交易。

优点：
- regular key 被泄露时，可以在不更改地址的情况下更换新密钥
- 可以禁用 master key，日常操作仅使用 regular key
- 账户地址保持不变

### Master Key Disable：高级安全

为获得最高安全级别，可以**禁用 master key**：
1. 首先设置 regular key
2. 然后通过账户标志禁用 master key
3. 此后只有 regular key 能签署交易
4. 若 regular key 被泄露，可重新激活 master key 恢复控制权

这提供了额外的保护层：即使有人获得了你的 master seed，在被禁用期间也无法使用。

### 多重签名（Multi-signing）

对于高价值账户或治理账户，Xahau 支持**多重签名**：

- 配置授权签名者列表及 **quorum**（所需最小权重）
- 每个签名者分配一个权重
- 只有获得足够签名以达到 quorum 时，交易才有效
- 例：3 名权重为 1 的签名者，quorum 为 2 → 至少需要 3 人中 2 人签名

多重签名适合：
- 组织资金账户
- 合伙人共同账户
- 任何不应由单人拥有完全控制权的场景`,
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "La regla de oro", pt: "A regra de ouro", en: "The golden rule", jp: "黄金のルール", ko: "황금률", zh: "黄金法则" },
          content: {
            es: "NUNCA compartas tu seed/clave privada\n\n❌ No por chat ni email\n❌ No en sitios web dudosos\n❌ No en texto plano en tu PC\n❌ No en capturas de pantalla\n\nQuien tiene tu seed\ntiene TODOS tus fondos",
            pt: "NUNCA compartilhe seu seed/chave privada\n\n❌ Não por chat nem email\n❌ Não em sitios web dudosos\n❌ Não em texto plano em seu PC\n❌ Não em capturas de pantalla\n\nQuien tem seu seed\ntem TODOS seus fondos",
            en: "NEVER share your seed/private key\n\n❌ Not via chat or email\n❌ Not on suspicious websites\n❌ Not in plain text on your PC\n❌ Not in screenshots\n\nWhoever has your seed\nhas ALL your funds",
            jp: "シード／秘密鍵を絶対に共有しない\n\n❌ チャットやメールでの共有禁止\n❌ 怪しいWebサイトへの入力禁止\n❌ PCにプレーンテキストで保存禁止\n❌ スクリーンショット撮影禁止\n\nあなたのシードを持っている人が\nあなたの全財産を持っている",
            ko: "시드/개인 키를 절대 공유하지 마세요\n\n❌ 채팅이나 이메일로 보내지 않기\n❌ 수상한 웹사이트에 입력하지 않기\n❌ PC에 평문으로 저장하지 않기\n❌ 스크린샷으로 남기지 않기\n\n시드를 가진 사람은\n당신의 모든 자금을 통제할 수 있습니다",
            zh: "绝对不要分享你的 seed/私钥\n\n❌ 不通过聊天或邮件发送\n❌ 不在可疑网站输入\n❌ 不以明文保存在电脑中\n❌ 不截图留存\n\n拥有你 seed 的人\n就拥有你所有的资金",
          },
          visual: "🔒",
        },
        {
          title: { es: "Hot Wallet vs Cold Wallet", pt: "Hot Wallet vs Cold Wallet", en: "Hot Wallet vs Cold Wallet", jp: "ホットウォレット vs コールドウォレット", ko: "핫 월렛 vs 콜드 월렛", zh: "热钱包 vs 冷钱包" },
          content: {
            es: "🔥 Hot Wallet (conectada)\n• Conveniente para uso diario\n• Mayor riesgo\n• Apps, bots de trading\n\n🧊 Cold Wallet (desconectada)\n• Máxima seguridad\n• Almacenamiento largo plazo\n• Hardware wallet, papel, metal",
            pt: "🔥 Hot Wallet (conectada)\n• Conveniente para uso diario\n• Mayor risco\n• Apps, bots de trading\n\n🧊 Cold Wallet (desconectada)\n• Máxima segurança\n• Armazenamiento largo plazo\n• Hardware wallet, papel, metal",
            en: "🔥 Hot Wallet (connected)\n• Convenient for daily use\n• Higher risk\n• Apps, trading bots\n\n🧊 Cold Wallet (disconnected)\n• Maximum security\n• Long-term storage\n• Hardware wallet, paper, metal",
            jp: "🔥 ホットウォレット（接続済み）\n• 日常使用に便利\n• リスクが高い\n• アプリ、トレーディングボット\n\n🧊 コールドウォレット（切断済み）\n• 最高のセキュリティ\n• 長期保管\n• ハードウェアウォレット、紙、金属",
            ko: "🔥 Hot Wallet(연결됨)\n• 일상 사용에 편리\n• 더 높은 위험\n• 앱, 트레이딩 봇\n\n🧊 Cold Wallet(오프라인)\n• 최고 수준 보안\n• 장기 보관용\n• 하드웨어 지갑, 종이, 금속 백업",
            zh: "🔥 热钱包（联网）\n• 适合日常使用\n• 风险较高\n• 应用、交易机器人\n\n🧊 冷钱包（离线）\n• 最高安全级别\n• 长期存储\n• 硬件钱包、纸质、金属备份",
          },
          visual: "🔥",
        },
        {
          title: { es: "Estafas comunes", pt: "Golpes comuns", en: "Common scams", jp: "よくある詐欺", ko: "흔한 사기", zh: "常见诈骗" },
          content: {
            es: "🎣 Phishing → Sitios web falsos\n🤖 Fake dApps → Rendimientos irreales\n🎭 Ingeniería social → Falso soporte\n🪂 Airdrops falsos → Tokens trampa\n\nRegla: NADIE legítimo te pedirá\ntu clave privada. Jamás.",
            pt: "🎣 Phishing → Sitios web falsos\n🤖 Fake dApps → Rendimientos irreais\n🎭 Ingeniería social → Falso soporte\n🪂 Airdrops falsos → Tokens trampa\n\nRegla: NADIE legítimo te pedirá\ntu chave privada. Jamás.",
            en: "🎣 Phishing → Fake websites\n🤖 Fake dApps → Unrealistic returns\n🎭 Social engineering → Fake support\n🪂 Fake airdrops → Trap tokens\n\nRule: NOBODY legitimate will ask\nfor your private key. Ever.",
            jp: "🎣 フィッシング → 偽のWebサイト\n🤖 偽のdApps → 非現実的なリターン\n🎭 ソーシャルエンジニアリング → 偽サポート\n🪂 偽のエアドロップ → トラップトークン\n\nルール：正規の関係者が\nあなたの秘密鍵を求めることは絶対にない",
            ko: "🎣 피싱 → 가짜 웹사이트\n🤖 가짜 dApp → 비현실적 수익 약속\n🎭 사회공학 → 가짜 지원팀\n🪂 가짜 에어드롭 → 함정 토큰\n\n원칙: 정상적인 누구도\n당신의 개인 키를 요구하지 않습니다",
            zh: "🎣 钓鱼 → 假网站\n🤖 假 dApp → 不切实际的回报\n🎭 社会工程 → 假技术支持\n🪂 假空投 → 陷阱代币\n\n原则：任何正规人员\n都不会要求你提供私钥",
          },
          visual: "⚠️",
        },
        {
          title: { es: "Seguridad avanzada en Xahau", pt: "Segurança avançada na Xahau", en: "Advanced security in Xahau", jp: "Xahauの高度なセキュリティ", ko: "Xahau의 고급 보안", zh: "Xahau 高级安全" },
          content: {
            es: "🔑 Regular Key\n  Clave alternativa para firmar\n  (se puede cambiar sin cambiar dirección)\n\n🚫 Master Key Disable\n  Desactivar la clave maestra\n  (capa extra de protección)\n\n👥 Multi-signing\n  Múltiples firmas requeridas\n  (ideal para organizaciones)",
            pt: "🔑 Regular Key\n  Chave alternativa para assinar\n  (é possível mudar sem mudar endereço)\n\n🚫 Master Key Disable\n  Desativar a chave maestra\n  (capa extra de proteção)\n\n👥 Multi-signing\n  Múltiples assinaturas requeridas\n  (ideal para organizaciones)",
            en: "🔑 Regular Key\n  Alternative key for signing\n  (can be changed without changing address)\n\n🚫 Master Key Disable\n  Disable the master key\n  (extra layer of protection)\n\n👥 Multi-signing\n  Multiple signatures required\n  (ideal for organizations)",
            jp: "🔑 レギュラーキー\n  署名用の代替キー\n  （アドレスを変えずに変更可能）\n\n🚫 マスターキーの無効化\n  マスターキーを無効にする\n  （追加の保護レイヤー）\n\n👥 マルチシグニング\n  複数の署名が必要\n  （組織に最適）",
            ko: "🔑 Regular Key\n  서명용 대체 키\n  (주소를 바꾸지 않고 교체 가능)\n\n🚫 Master Key Disable\n  master key 비활성화\n  (추가 보호 계층)\n\n👥 Multi-signing\n  여러 서명 필요\n  (조직 운영에 적합)",
            zh: "🔑 Regular Key\n  用于签名的备用密钥\n  （可在不更改地址的情况下更换）\n\n🚫 Master Key Disable\n  禁用主密钥\n  （额外的保护层）\n\n👥 多重签名\n  需要多个签名\n  （适合组织使用）",
          },
          visual: "🛡️",
        },
      ],
    },
    {
      id: "m3l4",
      title: {
        es: "Configuración de tu cuenta con AccountSet",
        pt: "Configuração de seu conta com AccountSet",
        en: "Configuring your account with AccountSet",
        jp: "AccountSetを使ったアカウント設定",
        ko: "AccountSet으로 계정 설정하기",
        zh: "使用 AccountSet 配置账户",
      },
      theory: {
        es: `En Xahau, tu cuenta tiene múltiples opciones de configuración que puedes activar o desactivar usando la transacción **AccountSet**. Estas configuraciones controlan el comportamiento de tu cuenta frente a pagos entrantes, trust lines, y más.

### La transacción AccountSet

\`AccountSet\` es el tipo de transacción que te permite modificar las propiedades de tu cuenta. No envía ni recibe fondos, simplemente cambia los **flags** (banderas) y otros campos de configuración de tu cuenta.

### Flags importantes

**asfRequireDest (RequireDestTag)**
- Requiere que todos los pagos entrantes incluyan un **Destination Tag**
- Útil para exchanges y servicios que usan un tag para identificar al usuario
- Sin este flag, alguien podría enviarte XAH sin tag y sería imposible saber de quién viene
- Flag ID: \`1\`

**asfDisallowXRP (DisallowXAH)**
- Señala que tu cuenta **no desea recibir XAH directamente**
- Es solo una señal, técnicamente los pagos aún pueden llegar
- Útil para cuentas que solo trabajan con tokens emitidos (IOUs)
- Flag ID: \`3\`

**asfDefaultRipple**
- Relevante para **emisores de tokens** (lo veremos en profundidad en el módulo de tokens)
- Permite que los tokens emitidos por tu cuenta puedan fluir entre terceros (rippling)
- Sin este flag, los tokens solo pueden moverse directamente hacia/desde el emisor
- Flag ID: \`8\`

**asfRequireAuth**
- Requiere que tu cuenta **autorice** cada trust line antes de que alguien pueda mantener tus tokens
- Útil para tokens regulados donde necesitas controlar quién puede poseerlos
- Flag ID: \`2\`

### Otros campos configurables

**Domain**: Puedes asociar un dominio web a tu cuenta. Se almacena como el valor hexadecimal del dominio. Esto permite verificar que la cuenta pertenece al dueño de ese dominio.

**EmailHash**: Hash MD5 de tu email, utilizado para mostrar un avatar (como Gravatar). No expone tu email directamente.

### Flags como bits

Los flags de cuenta se almacenan como un campo numérico donde cada bit representa un flag. Puedes activar flags con el campo \`SetFlag\` y desactivarlos con \`ClearFlag\` en la transacción AccountSet.

| Flag | ID | Propósito |
|------|----|-----------|
| asfRequireDest | 1 | Requerir Destination Tag |
| asfRequireAuth | 2 | Requerir autorización de trust lines |
| asfDisallowXRP | 3 | Señalar que no se desea recibir XAH |
| asfDisableMaster | 4 | Desactivar clave maestra |
| asfDefaultRipple | 8 | Permitir rippling de tokens emitidos |`,
        pt: `Em Xahau, sua conta tem múltiplas opções de configuração que você pode ativar ou desativar usando a transação **AccountSet**. Estas configurações controlan o comportamento de sua conta frente a pagamentos recebidos, trust lines, e muito mais.
### A transação AccountSet
\`AccountSet\` é o tipo de transação que te permite modificar as propriedadees de sua conta. No envia nem recibe fondos, simplemente muda os **flags** (banderas) e otros campos de configuração de sua conta.
### Flags importantes
**asfRequireDest (RequireDestTag)**
- Exige que todos os pagamentos recebidos incluyan um **Destination Tag**
- Útil para exchanges e servicios que usan um tag para identificar ao usuário
- Sem este flag, alguien poderia enviarte XAH sem tag e sería imposible saber de quién viene
- Flag ID: \`1\`
**asfDisallowXRP (DisallowXAH)**
- Señala que sua conta **no desea recibir XAH diretamente**
- É solo uma señao, técnicamente os pagos aún podem llegar
- Útil para contas que solo trabajan com tokens emitidos (IOUs)
- Flag ID: \`3\`
**asfDefaultRipple**
- Relevante para **emisores de tokens** (lo veremos em profundidad no módulo de tokens)
- Permite que os tokens emitidos por sua conta puedan fluir entre terceros (rippling)
- Sem este flag, os tokens solo podem moverse diretamente hacia/desde o emisor
- Flag ID: \`8\`
**asfRequireAuth**
- Exige que sua conta **autorice** cada trust line antes de que alguien pueda manter tus tokens
- Útil para tokens regulados donde você precisa controlar quién pode poseerlos
- Flag ID: \`2\`
### Otros campos configurables
**Domain**: Você pode asociar um dominio web a sua conta. Se armazena como o valor hexadecimal do dominio. Esto permite verificar que a conta pertenece ao dueñou de ese dominio.
**EmailHash**: Hash MD5 de tu email, utilizado para mostrar um avatar (como Gravatar). No expone tu email diretamente.
### Flags como bits
Os flags de conta são armazenados como um campo numérico donde cada bit representa um flag. Você pode ativar flags com o campo \`SetFlag\` e desativarlos com \`ClearFlag\` na transação AccountSet.
| Flag | ID | Propósito |
|------|----|-----------|
| asfRequireDest | 1 | Requerir Destination Tag |
| asfRequireAuth | 2 | Requerir autorización de trust lines |
| asfDisallowXRP | 3 | Señalar que no se desea recibir XAH |
| asfDisableMaster | 4 | Desativar chave maestra |
| asfDefaultRipple | 8 | Permitir rippling de tokens emitidos |`,
        en: `In Xahau, your account has multiple configuration options that you can enable or disable using the **AccountSet** transaction. These settings control your account's behavior regarding incoming payments, trust lines, and more.

### The AccountSet transaction

\`AccountSet\` is the transaction type that allows you to modify your account's properties. It does not send or receive funds; it simply changes the **flags** and other configuration fields of your account.

### Important flags

**asfRequireDest (RequireDestTag)**
- Requires that all incoming payments include a **Destination Tag**
- Useful for exchanges and services that use a tag to identify the user
- Without this flag, someone could send you XAH without a tag and it would be impossible to know who it came from
- Flag ID: \`1\`

**asfDisallowXRP (DisallowXAH)**
- Signals that your account **does not wish to receive XAH directly**
- It is only a signal; technically, payments can still arrive
- Useful for accounts that only work with issued tokens (IOUs)
- Flag ID: \`3\`

**asfDefaultRipple**
- Relevant for **token issuers** (we will cover this in depth in the tokens module)
- Allows tokens issued by your account to flow between third parties (rippling)
- Without this flag, tokens can only move directly to/from the issuer
- Flag ID: \`8\`

**asfRequireAuth**
- Requires your account to **authorize** each trust line before someone can hold your tokens
- Useful for regulated tokens where you need to control who can hold them
- Flag ID: \`2\`

### Other configurable fields

**Domain**: You can associate a web domain with your account. It is stored as the hexadecimal value of the domain. This allows verification that the account belongs to the owner of that domain.

**EmailHash**: MD5 hash of your email, used to display an avatar (like Gravatar). It does not expose your email directly.

### Flags as bits

Account flags are stored as a numeric field where each bit represents a flag. You can enable flags with the \`SetFlag\` field and disable them with \`ClearFlag\` in the AccountSet transaction.

| Flag | ID | Purpose |
|------|----|---------|
| asfRequireDest | 1 | Require Destination Tag |
| asfRequireAuth | 2 | Require trust line authorization |
| asfDisallowXRP | 3 | Signal that XAH is not desired |
| asfDisableMaster | 4 | Disable master key |
| asfDefaultRipple | 8 | Allow rippling of issued tokens |`,
        jp: `Xahauでは、**AccountSet**トランザクションを使用して、アカウントの複数の設定オプションを有効化または無効化できます。これらの設定は、着信ペイメント、トラストラインなどに対するアカウントの動作を制御します。

### AccountSetトランザクション

\`AccountSet\`はアカウントのプロパティを変更できるトランザクションタイプです。資金の送受信は行わず、アカウントの**フラグ**やその他の設定フィールドを変更するだけです。

### 重要なフラグ

**asfRequireDest（RequireDestTag）**
- すべての着信ペイメントに**宛先タグ**を含めることを要求する
- タグを使用してユーザーを識別する取引所やサービスに役立つ
- このフラグがないと、タグなしでXAHを送ることができ、誰から来たかを知ることができなくなる
- フラグID：\`1\`

**asfDisallowXRP（DisallowXAH）**
- アカウントが**XAHを直接受け取ることを希望しない**ことを示す
- これは情報提供に過ぎず、技術的にはペイメントはまだ到達できる
- 発行されたトークン（IOU）のみを扱うアカウントに役立つ
- フラグID：\`3\`

**asfDefaultRipple**
- **トークン発行者**に関連（トークンモジュールで詳しく学びます）
- アカウントが発行したトークンが第三者間で流れることを可能にする（リップリング）
- このフラグがないと、トークンは発行者との間でのみ直接移動できる
- フラグID：\`8\`

**asfRequireAuth**
- 誰かがあなたのトークンを保有できる前に、アカウントが各トラストラインを**承認**することを要求する
- 保有者をコントロールする必要がある規制されたトークンに役立つ
- フラグID：\`2\`

### その他の設定可能なフィールド

**ドメイン**：アカウントにWebドメインを関連付けることができます。ドメインの16進数値として保存されます。これにより、アカウントがそのドメインの所有者に属することを確認できます。

**EmailHash**：メールのMD5ハッシュで、（Gravatarのような）アバターの表示に使用されます。メールアドレスを直接公開しません。

### ビットフラグ

アカウントフラグは、各ビットがフラグを表す数値フィールドとして保存されます。AccountSetトランザクションの\`SetFlag\`フィールドでフラグを有効化し、\`ClearFlag\`で無効化できます。

| フラグ | ID | 目的 |
|--------|-----|------|
| asfRequireDest | 1 | 宛先タグを要求 |
| asfRequireAuth | 2 | トラストラインの承認を要求 |
| asfDisallowXRP | 3 | XAHの受け取りを希望しないことを示す |
| asfDisableMaster | 4 | マスターキーを無効化 |
| asfDefaultRipple | 8 | 発行されたトークンのリップリングを許可 |`,
        ko: `Xahau에서는 **AccountSet** 트랜잭션을 사용해 계정의 여러 설정을 켜거나 끌 수 있습니다. 이러한 설정은 들어오는 결제, trust line, 그 외 다양한 계정 동작에 영향을 줍니다.

### AccountSet 트랜잭션

\`AccountSet\`은 계정 속성을 수정하는 트랜잭션 유형입니다. 자금을 보내거나 받는 것이 아니라, 계정의 **플래그(flags)** 와 기타 설정 필드를 변경합니다.

### 중요한 플래그

**asfRequireDest (RequireDestTag)**
- 모든 수신 결제에 **Destination Tag**가 포함되도록 요구합니다
- tag로 사용자를 식별하는 거래소와 서비스에 유용합니다
- 이 플래그가 없으면 누군가 tag 없이 XAH를 보내도 누구의 입금인지 알기 어렵습니다
- Flag ID: \`1\`

**asfDisallowXRP (DisallowXAH)**
- 계정이 **직접 XAH를 받기를 원하지 않는다**는 신호를 보냅니다
- 단지 신호일 뿐이며, 기술적으로는 결제가 여전히 도착할 수 있습니다
- 발행 토큰(IOU)만 다루는 계정에 유용합니다
- Flag ID: \`3\`

**asfDefaultRipple**
- **토큰 발행자**에게 중요합니다(토큰 모듈에서 더 자세히 다룹니다)
- 계정이 발행한 토큰이 제3자 간에도 이동할 수 있게 합니다(rippling)
- 이 플래그가 없으면 토큰은 발행자와 직접 연결된 경로로만 이동합니다
- Flag ID: \`8\`

**asfRequireAuth**
- 누군가 당신의 토큰을 보유하기 전에 각 trust line을 계정에서 **승인**하도록 요구합니다
- 누가 토큰을 보유할 수 있는지 통제해야 하는 규제형 토큰에 유용합니다
- Flag ID: \`2\`

### 기타 설정 가능한 필드

**Domain**: 웹 도메인을 계정에 연결할 수 있습니다. 도메인의 16진수 값으로 저장되며, 해당 계정이 그 도메인 소유자와 연결되어 있음을 검증하는 데 도움이 됩니다.

**EmailHash**: 이메일의 MD5 해시입니다. Gravatar 같은 아바타 표시용으로 사용되며 이메일을 직접 노출하지 않습니다.

### 비트로 저장되는 플래그

계정 플래그는 각 비트가 하나의 플래그를 나타내는 숫자 값으로 저장됩니다. AccountSet 트랜잭션에서 \`SetFlag\`로 활성화하고 \`ClearFlag\`로 비활성화할 수 있습니다.

| Flag | ID | 목적 |
|------|----|-----------|
| asfRequireDest | 1 | Destination Tag 요구 |
| asfRequireAuth | 2 | trust line 승인 요구 |
| asfDisallowXRP | 3 | XAH 수신을 원하지 않는다는 신호 |
| asfDisableMaster | 4 | master key 비활성화 |
| asfDefaultRipple | 8 | 발행 토큰의 rippling 허용 |`,
        zh: `在 Xahau 中，你可以使用 **AccountSet** 交易开启或关闭账户的多种配置选项。这些设置控制账户对收款、trust line 等各种操作的行为。

### AccountSet 交易

\`AccountSet\` 是用于修改账户属性的交易类型。它不会发送或接收资金，只是更改账户的**标志（flags）**和其他配置字段。

### 重要标志

**asfRequireDest（RequireDestTag）**
- 要求所有收款都包含 **Destination Tag**
- 适合使用 tag 标识用户的交易所和服务
- 没有此标志，他人可在无 tag 的情况下向你发送 XAH，难以判断来源
- Flag ID：\`1\`

**asfDisallowXRP（DisallowXAH）**
- 表示账户**不希望直接接收 XAH**
- 这仅是一个信号，技术上付款仍可到达
- 适合只处理发行代币（IOU）的账户
- Flag ID：\`3\`

**asfDefaultRipple**
- 与**代币发行者**相关（将在代币模块中深入介绍）
- 允许账户发行的代币在第三方之间流转（rippling）
- 没有此标志，代币只能与发行者直接互转
- Flag ID：\`8\`

**asfRequireAuth**
- 要求账户在他人持有代币前先**授权**每条 trust line
- 适合需要控制持有者的受监管代币
- Flag ID：\`2\`

### 其他可配置字段

**Domain**：可以将 Web 域名与账户关联。以域名的十六进制值存储，可验证该账户属于该域名的所有者。

**EmailHash**：电子邮件的 MD5 哈希，用于显示头像（如 Gravatar），不会直接暴露邮件地址。

### 标志作为位字段

账户标志以数字形式存储，每一位代表一个标志。在 AccountSet 交易中，使用 \`SetFlag\` 字段启用标志，使用 \`ClearFlag\` 字段禁用标志。

| 标志 | ID | 用途 |
|------|----|------|
| asfRequireDest | 1 | 要求 Destination Tag |
| asfRequireAuth | 2 | 要求 trust line 授权 |
| asfDisallowXRP | 3 | 表示不希望接收 XAH |
| asfDisableMaster | 4 | 禁用主密钥 |
| asfDefaultRipple | 8 | 允许发行代币的 rippling |`,
      },
      codeBlocks: [
        {
          title: {
            es: "Activar el flag RequireDestTag en tu cuenta",
            pt: "Ativar ou flag RequireDestTag em seu conta",
            en: "Enable the RequireDestTag flag on your account",
            jp: "アカウントにRequireDestTagフラグを設定する",
            ko: "계정에 RequireDestTag 플래그 활성화",
            zh: "在账户上启用 RequireDestTag 标志",
          },
          language: "javascript",
          code: {
            es: `const { Client, Wallet } = require("xahau");

async function setRequireDestTag() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Usa tu wallet de testnet (reemplaza con tu seed)
  const wallet = Wallet.fromSeed("sEdVHBhkL2next8NH9cMPyPJoXXXXXX", {algorithm: 'secp256k1'});

  // AccountSet con SetFlag para activar RequireDestTag
  const tx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // asfRequireDest = 1
    SetFlag: 1,
  };
  console.log("Cuenta: ",wallet.address);
  console.log("Enviando transacción AccountSet...");
  console.log("  Activando flag: RequireDestTag (asfRequireDest = 1)");

  const result = await client.submitAndWait(tx, { wallet });

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Flag RequireDestTag activado con éxito!");
    console.log("Ahora todos los pagos entrantes deben incluir un DestinationTag.");

    // Verificar que el flag fue activado
    const accountInfo = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const flags = accountInfo.result.account_data.Flags;
    console.log("Flags de la cuenta (número):", flags);

    // lsfRequireDestTag = 0x00020000 = 131072
    const requireDestTag = (flags & 0x00020000) !== 0;
    console.log("RequireDestTag activo:", requireDestTag);
  }

  await client.disconnect();
}

setRequireDestTag();`,
            pt: `const { Client, Wallet } = require("xahau");
async function setRequireDestTag() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // Usa sua wallet de testnet (reemplaza com seu seed)
  const wallet = Wallet.fromSeed("sEdVHBhkL2next8NH9cMPyPJoXXXXXX", {algorithm: 'secp256k1'});
  // AccountSet com SetFlag para ativar RequireDestTag
  const tx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // asfRequireDest = 1
    SetFlag: 1,
  };
  console.log("Conta: ",wallet.address);
  console.log("Enviando transação AccountSet...");
  console.log("  Activando flag: RequireDestTag (asfRequireDest = 1)");
  const result = await client.submitAndWait(tx, { wallet });
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Flag RequireDestTag ativado com éxito!");
    console.log("Ahora todos os pagamentos entrantes devem incluir um DestinationTag.");
    // Verificar que ou flag foi ativado
    const accountInfo = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });
    const flags = accountInfo.result.account_data.Flags;
    console.log("Flags da conta (número):", flags);
    // lsfRequireDestTag = 0x00020000 = 131072
    const requireDestTag = (flags & 0x00020000) !== 0;
    console.log("RequireDestTag activo:", requireDestTag);
  }
  await client.disconnect();
}
setRequireDestTag();`,
            en: `const { Client, Wallet } = require("xahau");

async function setRequireDestTag() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Use your testnet wallet (replace with your seed)
  const wallet = Wallet.fromSeed("sEdVHBhkL2next8NH9cMPyPJoXXXXXX", {algorithm: 'secp256k1'});

  // AccountSet with SetFlag to enable RequireDestTag
  const tx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // asfRequireDest = 1
    SetFlag: 1,
  };
  console.log("Account: ",wallet.address);
  console.log("Sending AccountSet transaction...");
  console.log("  Enabling flag: RequireDestTag (asfRequireDest = 1)");

  const result = await client.submitAndWait(tx, { wallet });

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("RequireDestTag flag enabled successfully!");
    console.log("Now all incoming payments must include a DestinationTag.");

    // Verify that the flag was enabled
    const accountInfo = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const flags = accountInfo.result.account_data.Flags;
    console.log("Account flags (number):", flags);

    // lsfRequireDestTag = 0x00020000 = 131072
    const requireDestTag = (flags & 0x00020000) !== 0;
    console.log("RequireDestTag active:", requireDestTag);
  }

  await client.disconnect();
}

setRequireDestTag();`,
            jp: `const { Client, Wallet } = require("xahau");

async function setRequireDestTag() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // テストネットのウォレットを使用（シードを置き換えてください）
  const wallet = Wallet.fromSeed("sEdVHBhkL2next8NH9cMPyPJoXXXXXX", {algorithm: 'secp256k1'});

  // RequireDestTagを有効にするためのSetFlagを持つAccountSet
  const tx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // asfRequireDest = 1
    SetFlag: 1,
  };
  console.log("アカウント：", wallet.address);
  console.log("AccountSetトランザクションを送信中...");
  console.log("  フラグを有効化：RequireDestTag (asfRequireDest = 1)");

  const result = await client.submitAndWait(tx, { wallet });

  console.log("結果：", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("RequireDestTagフラグが正常に有効化されました！");
    console.log("すべての着信ペイメントにDestinationTagが必要になりました。");

    // フラグが有効化されたことを確認
    const accountInfo = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const flags = accountInfo.result.account_data.Flags;
    console.log("アカウントのフラグ（数値）：", flags);

    // lsfRequireDestTag = 0x00020000 = 131072
    const requireDestTag = (flags & 0x00020000) !== 0;
    console.log("RequireDestTag有効：", requireDestTag);
  }

  await client.disconnect();
}

setRequireDestTag();`,
            ko: `const { Client, Wallet } = require("xahau");

async function setRequireDestTag() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // testnet 지갑 사용(시드로 교체하세요)
  const wallet = Wallet.fromSeed("sEdVHBhkL2next8NH9cMPyPJoXXXXXX", {algorithm: 'secp256k1'});

  // RequireDestTag를 활성화하는 SetFlag가 포함된 AccountSet
  const tx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // asfRequireDest = 1
    SetFlag: 1,
  };
  console.log("계정:", wallet.address);
  console.log("AccountSet 트랜잭션 전송 중...");
  console.log("  활성화할 플래그: RequireDestTag (asfRequireDest = 1)");

  const result = await client.submitAndWait(tx, { wallet });

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("RequireDestTag 플래그가 성공적으로 활성화되었습니다!");
    console.log("이제 모든 수신 결제에는 DestinationTag가 필요합니다.");

    // 플래그가 활성화되었는지 확인
    const accountInfo = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const flags = accountInfo.result.account_data.Flags;
    console.log("계정 플래그(숫자 값):", flags);

    // lsfRequireDestTag = 0x00020000 = 131072
    const requireDestTag = (flags & 0x00020000) !== 0;
    console.log("RequireDestTag 활성 상태:", requireDestTag);
  }

  await client.disconnect();
}

setRequireDestTag();`,
            zh: `const { Client, Wallet } = require("xahau");

async function setRequireDestTag() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 使用测试网钱包（替换为你的 seed）
  const wallet = Wallet.fromSeed("sEdVHBhkL2next8NH9cMPyPJoXXXXXX", {algorithm: 'secp256k1'});

  // 带 SetFlag 的 AccountSet，用于启用 RequireDestTag
  const tx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // asfRequireDest = 1
    SetFlag: 1,
  };
  console.log("账户:", wallet.address);
  console.log("正在发送 AccountSet 交易...");
  console.log("  启用标志: RequireDestTag (asfRequireDest = 1)");

  const result = await client.submitAndWait(tx, { wallet });

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("RequireDestTag 标志启用成功！");
    console.log("现在所有收款都必须包含 DestinationTag。");

    // 验证标志是否已启用
    const accountInfo = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const flags = accountInfo.result.account_data.Flags;
    console.log("账户标志（数字值）:", flags);

    // lsfRequireDestTag = 0x00020000 = 131072
    const requireDestTag = (flags & 0x00020000) !== 0;
    console.log("RequireDestTag 已激活:", requireDestTag);
  }

  await client.disconnect();
}

setRequireDestTag();`,
          },
        },
        {
          title: {
            es: "Leer e interpretar los flags de una cuenta",
            pt: "Ler e interpretar os flags de uma conta",
            en: "Read and interpret account flags",
            jp: "アカウントのフラグを読み取り・解釈する",
            ko: "계정 플래그 읽고 해석하기",
            zh: "读取并解析账户标志",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function readAccountFlags(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    const flags = account.Flags;

    console.log("=== Información de la cuenta ===");
    console.log("Dirección:", account.Account);
    console.log("Balance:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("Flags (valor numérico):", flags);
    console.log("");

    // Interpretar cada flag individual
    // Los flags del ledger (lsf) tienen valores distintos a los de AccountSet (asf)
    const flagDefinitions = [
      { name: "lsfRequireDestTag", mask: 0x00020000, desc: "Requiere Destination Tag" },
      { name: "lsfRequireAuth", mask: 0x00040000, desc: "Requiere autorización de trust line" },
      { name: "lsfDisallowXRP", mask: 0x00080000, desc: "No desea recibir XAH" },
      { name: "lsfDisableMaster", mask: 0x00100000, desc: "Clave maestra desactivada" },
      { name: "lsfDefaultRipple", mask: 0x00800000, desc: "Rippling por defecto activado" },
    ];

    console.log("=== Flags activos ===");
    let anyActive = false;
    for (const flag of flagDefinitions) {
      const active = (flags & flag.mask) !== 0;
      if (active) {
        console.log(\` \${flag.name}: \${flag.desc}\`);
        anyActive = true;
      }
    }

    if (!anyActive) {
      console.log("  Sin flags especiales activos (configuración por defecto)");
    }

    console.log("");
    console.log("=== Otros campos ===");
    console.log("Dominio:", account.Domain
      ? Buffer.from(account.Domain, "hex").toString("utf-8")
      : "(no configurado)");
    console.log("EmailHash:", account.EmailHash || "(no configurado)");
    console.log("RegularKey:", account.RegularKey || "(no configurado)");
    console.log("Secuencia:", account.Sequence);
    console.log("Objetos propios:", account.OwnerCount);

  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("La cuenta no existe en el ledger.");
    } else {
      console.error("Error:", error.message);
    }
  }

  await client.disconnect();
}

// Reemplaza con una dirección de testnet
readAccountFlags("rYourXahauAddressHere");`,
            pt: `const { Client } = require("xahau");
async function readAccountFlags(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });
    const account = response.result.account_data;
    const flags = account.Flags;
    console.log("=== Informação da conta ===");
    console.log("Endereço:", account.Account);
    console.log("Saldo:", Number(account.Saldo) / 1_000_000, "XAH");
    console.log("Flags (valor numérico):", flags);
    console.log("");
    // Interpretar cada flag individual
    // Os flags do ledger (lsf) têm valores distintos a os de AccountSet (asf)
    const flagDefinitions = [
      { name: "lsfRequireDestTag", mask: 0x00020000, desc: "Exige Destination Tag" },
      { name: "lsfRequireAuth", mask: 0x00040000, desc: "Exige autorización de trust line" },
      { name: "lsfDisallowXRP", mask: 0x00080000, desc: "No desea recibir XAH" },
      { name: "lsfDisableMaster", mask: 0x00100000, desc: "Chave maestra desativada" },
      { name: "lsfDefaultRipple", mask: 0x00800000, desc: "Rippling por padrão ativado" },
    ];
    console.log("=== Flags activos ===");
    let anyActive = false;
    for (const flag of flagDefinitions) {
      const active = (flags & flag.mask) !== 0;
      if (active) {
        console.log(\` \${flag.name}: \${flag.desc}\`);
        anyActive = true;
      }
    }
    if (!anyActive) {
      console.log("  Sem flags especiales activos (configuração por padrão)");
    }
    console.log("");
    console.log("=== Otros campos ===");
    console.log("Dominio:", account.Domain
      ? Buffer.from(account.Domain, "hex").toString("utf-8")
      : "(no configurado)");
    console.log("EmailHash:", account.EmailHash || "(no configurado)");
    console.log("RegularKey:", account.RegularKey || "(no configurado)");
    console.log("Sequência:", account.Sequence);
    console.log("Objetos próprios:", account.OwnerCount);
  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("A conta não existe no ledger.");
    } else {
      console.error("Erro:", error.message);
    }
  }
  await client.disconnect();
}
// Reemplaza com uma endereço de testnet
readAccountFlags("rYourXahauAddressHere");`,
            en: `const { Client } = require("xahau");

async function readAccountFlags(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    const flags = account.Flags;

    console.log("=== Account information ===");
    console.log("Address:", account.Account);
    console.log("Balance:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("Flags (numeric value):", flags);
    console.log("");

    // Interpret each individual flag
    // Ledger flags (lsf) have different values than AccountSet flags (asf)
    const flagDefinitions = [
      { name: "lsfRequireDestTag", mask: 0x00020000, desc: "Requires Destination Tag" },
      { name: "lsfRequireAuth", mask: 0x00040000, desc: "Requires trust line authorization" },
      { name: "lsfDisallowXRP", mask: 0x00080000, desc: "Does not wish to receive XAH" },
      { name: "lsfDisableMaster", mask: 0x00100000, desc: "Master key disabled" },
      { name: "lsfDefaultRipple", mask: 0x00800000, desc: "Default rippling enabled" },
    ];

    console.log("=== Active flags ===");
    let anyActive = false;
    for (const flag of flagDefinitions) {
      const active = (flags & flag.mask) !== 0;
      if (active) {
        console.log(\` \${flag.name}: \${flag.desc}\`);
        anyActive = true;
      }
    }

    if (!anyActive) {
      console.log("  No special flags active (default configuration)");
    }

    console.log("");
    console.log("=== Other fields ===");
    console.log("Domain:", account.Domain
      ? Buffer.from(account.Domain, "hex").toString("utf-8")
      : "(not configured)");
    console.log("EmailHash:", account.EmailHash || "(not configured)");
    console.log("RegularKey:", account.RegularKey || "(not configured)");
    console.log("Sequence:", account.Sequence);
    console.log("OwnerCount:", account.OwnerCount);

  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("The account does not exist on the ledger.");
    } else {
      console.error("Error:", error.message);
    }
  }

  await client.disconnect();
}

// Replace with a testnet address
readAccountFlags("rYourXahauAddressHere");`,
            jp: `const { Client } = require("xahau");

async function readAccountFlags(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    const flags = account.Flags;

    console.log("=== アカウント情報 ===");
    console.log("アドレス：", account.Account);
    console.log("残高：", Number(account.Balance) / 1_000_000, "XAH");
    console.log("フラグ（数値）：", flags);
    console.log("");

    // 各フラグを個別に解釈する
    // レジャーフラグ（lsf）はAccountSetフラグ（asf）とは異なる値を持つ
    const flagDefinitions = [
      { name: "lsfRequireDestTag", mask: 0x00020000, desc: "デスティネーションタグを要求" },
      { name: "lsfRequireAuth", mask: 0x00040000, desc: "トラストラインの承認を要求" },
      { name: "lsfDisallowXRP", mask: 0x00080000, desc: "XAHを受け取ることを希望しない" },
      { name: "lsfDisableMaster", mask: 0x00100000, desc: "マスターキーが無効" },
      { name: "lsfDefaultRipple", mask: 0x00800000, desc: "デフォルトリップリングが有効" },
    ];

    console.log("=== 有効なフラグ ===");
    let anyActive = false;
    for (const flag of flagDefinitions) {
      const active = (flags & flag.mask) !== 0;
      if (active) {
        console.log(\` \${flag.name}: \${flag.desc}\`);
        anyActive = true;
      }
    }

    if (!anyActive) {
      console.log("  特別なフラグなし（デフォルト設定）");
    }

    console.log("");
    console.log("=== その他のフィールド ===");
    console.log("ドメイン：", account.Domain
      ? Buffer.from(account.Domain, "hex").toString("utf-8")
      : "（未設定）");
    console.log("EmailHash：", account.EmailHash || "（未設定）");
    console.log("RegularKey：", account.RegularKey || "（未設定）");
    console.log("シーケンス：", account.Sequence);
    console.log("OwnerCount：", account.OwnerCount);

  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("アカウントはレジャーに存在しません。");
    } else {
      console.error("エラー：", error.message);
    }
  }

  await client.disconnect();
}

// テストネットのアドレスに置き換えてください
readAccountFlags("rYourXahauAddressHere");`,
            ko: `const { Client } = require("xahau");

async function readAccountFlags(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    const flags = account.Flags;

    console.log("=== 계정 정보 ===");
    console.log("주소:", account.Account);
    console.log("잔액:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("플래그(숫자 값):", flags);
    console.log("");

    // 각 플래그를 개별적으로 해석
    // ledger 플래그(lsf)는 AccountSet 플래그(asf)와 값이 다름
    const flagDefinitions = [
      { name: "lsfRequireDestTag", mask: 0x00020000, desc: "Destination Tag 필요" },
      { name: "lsfRequireAuth", mask: 0x00040000, desc: "trust line 승인 필요" },
      { name: "lsfDisallowXRP", mask: 0x00080000, desc: "XAH 수신 비선호" },
      { name: "lsfDisableMaster", mask: 0x00100000, desc: "master key 비활성화" },
      { name: "lsfDefaultRipple", mask: 0x00800000, desc: "기본 rippling 활성화" },
    ];

    console.log("=== 활성 플래그 ===");
    let anyActive = false;
    for (const flag of flagDefinitions) {
      const active = (flags & flag.mask) !== 0;
      if (active) {
        console.log(\` \${flag.name}: \${flag.desc}\`);
        anyActive = true;
      }
    }

    if (!anyActive) {
      console.log("  특별한 플래그 없음(기본 설정)");
    }

    console.log("");
    console.log("=== 기타 필드 ===");
    console.log("도메인:", account.Domain
      ? Buffer.from(account.Domain, "hex").toString("utf-8")
      : "(설정 안 됨)");
    console.log("EmailHash:", account.EmailHash || "(설정 안 됨)");
    console.log("RegularKey:", account.RegularKey || "(설정 안 됨)");
    console.log("시퀀스:", account.Sequence);
    console.log("OwnerCount:", account.OwnerCount);

  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("계정이 ledger에 존재하지 않습니다.");
    } else {
      console.error("오류:", error.message);
    }
  }

  await client.disconnect();
}

// testnet 주소로 교체하세요
readAccountFlags("rYourXahauAddressHere");`,
            zh: `const { Client } = require("xahau");

async function readAccountFlags(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    const flags = account.Flags;

    console.log("=== 账户信息 ===");
    console.log("地址:", account.Account);
    console.log("余额:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("标志（数字值）:", flags);
    console.log("");

    // 逐一解析每个标志
    // 账本标志（lsf）的值与 AccountSet 标志（asf）不同
    const flagDefinitions = [
      { name: "lsfRequireDestTag", mask: 0x00020000, desc: "需要 Destination Tag" },
      { name: "lsfRequireAuth", mask: 0x00040000, desc: "需要 trust line 授权" },
      { name: "lsfDisallowXRP", mask: 0x00080000, desc: "不希望接收 XAH" },
      { name: "lsfDisableMaster", mask: 0x00100000, desc: "主密钥已禁用" },
      { name: "lsfDefaultRipple", mask: 0x00800000, desc: "默认 rippling 已启用" },
    ];

    console.log("=== 已激活标志 ===");
    let anyActive = false;
    for (const flag of flagDefinitions) {
      const active = (flags & flag.mask) !== 0;
      if (active) {
        console.log(\` \${flag.name}: \${flag.desc}\`);
        anyActive = true;
      }
    }

    if (!anyActive) {
      console.log("  无特殊标志（默认配置）");
    }

    console.log("");
    console.log("=== 其他字段 ===");
    console.log("域名:", account.Domain
      ? Buffer.from(account.Domain, "hex").toString("utf-8")
      : "（未配置）");
    console.log("EmailHash:", account.EmailHash || "（未配置）");
    console.log("RegularKey:", account.RegularKey || "（未配置）");
    console.log("序列号:", account.Sequence);
    console.log("OwnerCount:", account.OwnerCount);

  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("账户不存在于账本中。");
    } else {
      console.error("错误:", error.message);
    }
  }

  await client.disconnect();
}

// 替换为测试网地址
readAccountFlags("rYourXahauAddressHere");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "AccountSet: configura tu cuenta", pt: "AccountSet: configura sua conta", en: "AccountSet: configure your account", jp: "AccountSet：アカウントを設定する", ko: "AccountSet: 계정 설정", zh: "AccountSet：配置你的账户" },
          content: {
            es: "La transacción AccountSet modifica\nlos flags y propiedades de tu cuenta\n\nFlags principales:\n🏷️ RequireDestTag → Exigir tag en pagos\n🚫 DisallowXAH → Señal de no recibir XAH\n🔄 DefaultRipple → Para emisores de tokens\n🔐 RequireAuth → Autorizar trust lines",
            pt: "A transação AccountSet modifica\nlos flags e propriedadees de seu conta\n\nFlags principais:\n🏷️ RequireDestTag → Exigir tag em pagamentos\n🚫 DisallowXAH → Señao de não receber XAH\n🔄 DefaultRipple → Para emissores de tokens\n🔐 RequireAuth → Autorizar trust lines",
            en: "The AccountSet transaction modifies\nyour account's flags and properties\n\nMain flags:\n🏷️ RequireDestTag → Require tag on payments\n🚫 DisallowXAH → Signal not to receive XAH\n🔄 DefaultRipple → For token issuers\n🔐 RequireAuth → Authorize trust lines",
            jp: "AccountSetトランザクションは\nアカウントのフラグとプロパティを変更する\n\n主なフラグ：\n🏷️ RequireDestTag → ペイメントにタグを要求\n🚫 DisallowXAH → XAHを受け取らない信号\n🔄 DefaultRipple → トークン発行者向け\n🔐 RequireAuth → トラストラインを承認する",
            ko: "AccountSet 트랜잭션은\n계정의 플래그와 속성을 변경합니다\n\n주요 플래그:\n🏷️ RequireDestTag → 결제에 tag 요구\n🚫 DisallowXAH → XAH를 받지 않겠다는 신호\n🔄 DefaultRipple → 토큰 발행자용\n🔐 RequireAuth → trust line 승인 요구",
            zh: "AccountSet 交易修改\n账户的标志和属性\n\n主要标志：\n🏷️ RequireDestTag → 要求付款带 tag\n🚫 DisallowXAH → 表示不接收 XAH 的信号\n🔄 DefaultRipple → 适用于代币发行者\n🔐 RequireAuth → 授权 trust line",
          },
          visual: "⚙️",
        },
        {
          title: { es: "Flags como bits", pt: "Flags como bits", en: "Flags as bits", jp: "ビットとしてのフラグ", ko: "비트로 저장되는 플래그", zh: "标志作为位字段" },
          content: {
            es: "Los flags se almacenan como un número binario\nCada bit = un flag diferente\n\nActivar: campo SetFlag + ID del flag\nDesactivar: campo ClearFlag + ID del flag\n\n| Flag | ID |\n| RequireDest | 1 |\n| RequireAuth | 2 |\n| DisallowXRP | 3 |\n| DisableMaster | 4 |\n| DefaultRipple | 8 |",
            pt: "Os flags são armazenados como um número binário\nCada bit = um flag diferente\n\nAtivar: campo SetFlag + ID do flag\nDesativar: campo ClearFlag + ID do flag\n\n| Flag | ID |\n| RequireDest | 1 |\n| RequireAuth | 2 |\n| DisallowXRP | 3 |\n| DisableMaster | 4 |\n| DefaultRipple | 8 |",
            en: "Flags are stored as a binary number\nEach bit = a different flag\n\nEnable: SetFlag field + flag ID\nDisable: ClearFlag field + flag ID\n\n| Flag | ID |\n| RequireDest | 1 |\n| RequireAuth | 2 |\n| DisallowXRP | 3 |\n| DisableMaster | 4 |\n| DefaultRipple | 8 |",
            jp: "フラグはバイナリ数値として保存される\n各ビット = 異なるフラグ\n\n有効化：SetFlagフィールド + フラグID\n無効化：ClearFlagフィールド + フラグID\n\n| フラグ | ID |\n| RequireDest | 1 |\n| RequireAuth | 2 |\n| DisallowXRP | 3 |\n| DisableMaster | 4 |\n| DefaultRipple | 8 |",
            ko: "플래그는 이진수 값으로 저장됩니다\n각 비트 = 서로 다른 플래그\n\n활성화: SetFlag 필드 + 플래그 ID\n비활성화: ClearFlag 필드 + 플래그 ID\n\n| Flag | ID |\n| RequireDest | 1 |\n| RequireAuth | 2 |\n| DisallowXRP | 3 |\n| DisableMaster | 4 |\n| DefaultRipple | 8 |",
            zh: "标志以二进制数存储\n每一位 = 一个不同的标志\n\n启用：SetFlag 字段 + 标志 ID\n禁用：ClearFlag 字段 + 标志 ID\n\n| 标志 | ID |\n| RequireDest | 1 |\n| RequireAuth | 2 |\n| DisallowXRP | 3 |\n| DisableMaster | 4 |\n| DefaultRipple | 8 |",
          },
          visual: "🔢",
        },
      ],
    },
    {
      id: "m3l5",
      title: {
        es: "Cómo importar tu cuenta en Xaman",
        pt: "Como importar seu conta em Xaman",
        en: "How to import your account into Xaman",
        jp: "Xamanへのアカウントのインポート方法",
        ko: "계정을 Xaman으로 가져오는 방법",
        zh: "如何将账户导入 Xaman",
      },
      theory: {
        es: `**Xaman** (anteriormente XUMM) es la wallet móvil más utilizada del ecosistema XRPL y Xahau. Hasta ahora hemos trabajado con wallets desde código JavaScript, pero para gestionar tu cuenta de forma visual, firmar transacciones desde el móvil e interactuar con aplicaciones descentralizadas, necesitas importar tu cuenta en Xaman.

### ¿Qué es Xaman?

Xaman es una aplicación móvil disponible para **iOS** y **Android** que funciona como:
- **Wallet**: Almacena tus claves de forma segura en tu dispositivo
- **Firmador de transacciones**: Puedes aprobar transacciones escaneando un QR o desde una xApp
- **Gestor de cuentas**: Puedes gestionar múltiples cuentas de Xahau y XRPL
- **Puerta de entrada a xApps**: Aplicaciones descentralizadas integradas en Xaman

Descarga: [xaman.app](https://xaman.app)

### Instalar Xaman

1. Abre la **App Store** (iOS) o **Google Play** (Android)
2. Busca **"Xaman"** (antes se llamaba XUMM)
3. Descarga e instala la aplicación
4. Abre Xaman y sigue la configuración inicial:
   - Configura un **código PIN** o **biometría** (huella/Face ID)
   - Acepta los términos de uso

### Importar tu cuenta de testnet

Una vez instalado Xaman, puedes importar la cuenta que generaste por código usando tu **family seed** (la cadena que empieza por \`s\`):

1. Abre Xaman
2. Toca el botón **"Añadir cuenta"** (o el icono \`+\` arriba)
3. Selecciona **"Importar una cuenta existente"**
4. Selecciona **"Family Seed (s...)"** como método de importación
5. Introduce tu seed (la cadena que empieza por \`s\` que obtuviste al generar la wallet)
6. Selecciona el nivel de acceso:
   - **Acceso completo**: Puedes firmar transacciones (necesitas el seed)
   - **Solo lectura**: Solo puedes ver el balance y transacciones (solo necesitas la dirección)
7. Confirma con tu PIN o biometría
8. Tu cuenta aparecerá en la lista de cuentas de Xaman

### Añadir la red Xahau Testnet en Xaman

Por defecto, Xaman se conecta a **XRPL Mainnet**. Para trabajar con **Xahau Testnet**, debes añadir la red:

1. En Xaman, ve a **Ajustes** (icono de engranaje)
2. Busca la sección **"Advanced"** o **"Avanzado"**
3. Busca la sección **"Debug"**
4. Activa **Developer Mode** o **Modo Desarrollador**
5. Selecciona **Xahau Testnet** como red activa en el menú principal pulsando en la esquina superior derecha.
6. Ahora tu cuenta mostrará el balance de XAH en testnet

### Verificar la importación

Después de importar, verifica que todo es correcto:
- La **dirección** que muestra Xaman debe coincidir con la que generaste por código
- Puedes enviar una pequeña transacción de prueba para confirmar que la firma funciona

### Firmar transacciones con Xaman

Xaman puede firmar transacciones de dos formas:

**Desde la propia app**:
- Puedes enviar pagos directamente desde Xaman
- Toca **"Enviar"**, introduce la dirección destino y la cantidad
- Confirma con tu PIN o biometría

**Desde una xApp o sitio web (QR)**:
- Algunas aplicaciones muestran un código QR
- Escaneas el QR con Xaman
- Xaman te muestra los detalles de la transacción
- Apruebas o rechazas firmando con tu PIN

### Seguridad en Xaman

- Tu seed **nunca sale de tu dispositivo**. Xaman almacena las claves de forma encriptada en el almacenamiento seguro del sistema operativo (Keychain en iOS, Keystore en Android)
- Las transacciones se **firman localmente** en tu dispositivo
- Xaman **nunca envía** tu clave privada a ningún servidor
- Si pierdes tu dispositivo, puedes restaurar tu cuenta en otro dispositivo usando tu seed
- **Guarda siempre una copia de tu seed fuera del dispositivo** (papel, metal backup)
- Xaman no permite exportar tu seed desde la app por seguridad, así que asegúrate de tenerlo guardado antes de importar


### Importar con solo lectura

Si solo quieres **monitorizar** una cuenta sin poder firmar transacciones:

1. En Xaman, toca **"Añadir cuenta"**
2. Selecciona **"Importar una cuenta existente"**
3. Selecciona **"Dirección de la cuenta (r...)"**
4. Introduce la dirección \`r...\` (no el seed)
5. La cuenta se añade en modo solo lectura

Esto es útil para:
- Monitorizar cuentas de otros (exchanges, contratos)
- Vigilar tu cuenta de mainnet sin exponer el seed en el móvil
- Comprobar balances rápidamente`,
        pt: `**Xaman** (anteriormente XUMM) é a wallet móvel mais utilizada do ecossistema XRPL e Xahau. Até agora trabalhamos com wallets com código JavaScript, mas para gerenciar sua conta de forma visual, assinar transações pelo celular e interagir com aplicaciones descentralizadas, você precisa importar sua conta em Xaman.
### O que é Xaman?
Xaman é uma aplicación móvel disponible para **iOS** e **Android** que funciona como:
- **Wallet**: Armazena tus chaves de forma segura em tu dispositivo
- **Firmador de transações**: Você pode aprovar transações escaneando um QR ou desde uma xApp
- **Gestor de contas**: Você pode gerenciar múltiplas contas de Xahau e XRPL
- **Puerta de entradà xApps**: Aplicaciones descentralizadas integradas em Xaman
Descarga: [xaman.app](https://xaman.app)
### Instalar Xaman
1. Abra a **App Store** (iOS) ou **Google Play** (Android)
2. Busca **"Xaman"** (antes se llamaba XUMM)
3. Descarga e instala a aplicación
4. Abra Xaman e sigue a configuração inicial:
   - Configura um **código PIN** ou **biometría** (huella/Face ID)
   - Aceita os términos de uso
### Importar seu conta de testnet
Uma vez instalado Xaman, você pode importar a conta que geraste por código usando tu **family seed** (a cadeia que começa com \`s\`):
1. Abra Xaman
2. Toca o botón **"Añadir conta"** (ou o icono \`+\` arriba)
3. Selecione **"Importar uma conta existente"**
4. Selecione **"Family Seed (s...)"** como método de importação
5. Introduce tu seed (a cadeia que começa com \`s\` que obtuviste ao gerar a wallet)
6. Selecione o nivel de acceso:
   - **Acesso completo**: Você pode assinar transações (você precisa o seed)
   - **Solo lectura**: Solo você pode ver o balance e transações (solo você precisa a endereço)
7. Confirma com tu PIN ou biometría
8. Tu conta aparecerá na lista de contas de Xaman
### Añadir a rede Xahau Testnet em Xaman
Por defecto, Xaman se conectà **XRPL Mainnet**. Para trabalhar com **Xahau Testnet**, você deve añadir a rede:
1. Em Xaman, ve a **Ajustes** (icono de engranaje)
2. Busca a sección **"Advanced"** ou **"Avanzado"**
3. Busca a sección **"Debug"**
4. Activa **Developer Mode** ou **Modo Desarrollador**
5. Selecione **Xahau Testnet** como rede ativa no menú principal pulsando na esquina superior derecha.
6. Ahora sua conta mostrará o balance de XAH em testnet
### Verificar a importação
Después de importar, verifica que todo é correcto:
- A **endereço** que muestra Xaman deve coincidir com a que geraste por código
- Você pode enviar uma pequeña transação de prueba para confirmar que a assinatura funciona
### Assinar transações com Xaman
Xaman pode assinar transações de dos formas:
**Desde a propia app**:
- Você pode enviar pagos diretamente desde Xaman
- Toca **"Enviar"**, introduce a endereço destino e a quantidade
- Confirma com tu PIN ou biometría
**Desde uma xApp ou sitio web (QR)**:
- Algunas aplicaciones muestran um código QR
- Escaneas o QR com Xaman
- Xaman te muestra os detalhes da transação
- Apruebas ou rechazas firmando com tu PIN
### Segurança em Xaman
- Tu seed **nunca sale de tu dispositivo**. Xaman armazena as chaves de forma encriptada no armazenamiento seguro do sistema operativo (Keychain em iOS, Keystore em Android)
- As transações se **firman localmente** em tu dispositivo
- Xaman **nunca envia** sua chave privadà ningún servidor
- Se pierdes tu dispositivo, você pode restaurar sua conta em otro dispositivo usando tu seed
- **Guarda sempre uma cópia de tu seed fora do dispositivo** (papel, metal backup)
- Xaman no permite exportar tu seed desde a app por segurança, então asegúrate de tenerlo guardado antes de importar
### Importar com apenas leitura
Se solo quieres **monitorizar** uma conta sem poder assinar transações:
1. Em Xaman, toca **"Añadir conta"**
2. Selecione **"Importar uma conta existente"**
3. Selecione **"Endereço da conta (r...)"**
4. Introduce a endereço \`r...\` (no o seed)
5. A conta é adicionada em modo solo lectura
Esto é útil para:
- Monitorizar contas de otros (exchanges, contratos)
- Vigilar sua conta de mainnet sem exponer o seed no móvel
- Comprobar balances rápidamente`,
        en: `**Xaman** (formerly XUMM) is the most widely used mobile wallet in the XRPL and Xahau ecosystem. So far we have been working with wallets from JavaScript code, but to manage your account visually, sign transactions from your phone, and interact with decentralized applications, you need to import your account into Xaman.

### What is Xaman?

Xaman is a mobile application available for **iOS** and **Android** that works as:
- **Wallet**: Stores your keys securely on your device
- **Transaction signer**: You can approve transactions by scanning a QR or from an xApp
- **Account manager**: You can manage multiple Xahau and XRPL accounts
- **Gateway to xApps**: Decentralized applications integrated into Xaman

Download: [xaman.app](https://xaman.app)

### Install Xaman

1. Open the **App Store** (iOS) or **Google Play** (Android)
2. Search for **"Xaman"** (it was previously called XUMM)
3. Download and install the application
4. Open Xaman and follow the initial setup:
   - Set up a **PIN code** or **biometrics** (fingerprint/Face ID)
   - Accept the terms of use

### Import your testnet account

Once Xaman is installed, you can import the account you generated via code using your **family seed** (the string starting with \`s\`):

1. Open Xaman
2. Tap the **"Add account"** button (or the \`+\` icon at the top)
3. Select **"Import an existing account"**
4. Select **"Family Seed (s...)"** as the import method
5. Enter your seed (the string starting with \`s\` that you obtained when generating the wallet)
6. Select the access level:
   - **Full access**: You can sign transactions (requires the seed)
   - **Read-only**: You can only view balance and transactions (only requires the address)
7. Confirm with your PIN or biometrics
8. Your account will appear in the Xaman account list

### Add the Xahau Testnet in Xaman

By default, Xaman connects to **XRPL Mainnet**. To work with **Xahau Testnet**, you need to add the network:

1. In Xaman, go to **Settings** (gear icon)
2. Find the **"Advanced"** section
3. Find the **"Debug"** section
4. Enable **Developer Mode**
5. Select **Xahau Testnet** as the active network in the main menu by tapping in the upper right corner.
6. Now your account will show the XAH balance on testnet

### Verify the import

After importing, verify that everything is correct:
- The **address** shown in Xaman should match the one you generated via code
- You can send a small test transaction to confirm that signing works

### Sign transactions with Xaman

Xaman can sign transactions in two ways:

**From the app itself**:
- You can send payments directly from Xaman
- Tap **"Send"**, enter the destination address and amount
- Confirm with your PIN or biometrics

**From an xApp or website (QR)**:
- Some applications display a QR code
- You scan the QR with Xaman
- Xaman shows you the transaction details
- You approve or reject by signing with your PIN

### Security in Xaman

- Your seed **never leaves your device**. Xaman stores keys in encrypted form in the operating system's secure storage (Keychain on iOS, Keystore on Android)
- Transactions are **signed locally** on your device
- Xaman **never sends** your private key to any server
- If you lose your device, you can restore your account on another device using your seed
- **Always keep a copy of your seed outside the device** (paper, metal backup)
- Xaman does not allow exporting your seed from the app for security, so make sure you have it saved before importing


### Import as read-only

If you only want to **monitor** an account without being able to sign transactions:

1. In Xaman, tap **"Add account"**
2. Select **"Import an existing account"**
3. Select **"Account address (r...)"**
4. Enter the address \`r...\` (not the seed)
5. The account is added in read-only mode

This is useful for:
- Monitoring other accounts (exchanges, contracts)
- Watching your mainnet account without exposing the seed on your phone
- Checking balances quickly`,
        jp: `**Xaman**（以前はXumm）は、XRPLおよびXahauエコシステムで最も広く使用されているモバイルウォレットです。これまでJavaScriptコードからウォレットを操作してきましたが、アカウントを視覚的に管理し、スマートフォンからトランザクションに署名し、分散型アプリケーションと対話するには、アカウントをXamanにインポートする必要があります。

### Xamanとは？

Xamanは**iOS**と**Android**で利用できるモバイルアプリケーションで、次のような機能を提供します：
- **ウォレット**：デバイス上に鍵を安全に保存
- **トランザクションへの署名**：QRコードのスキャンまたはxAppからトランザクションを承認できる
- **アカウント**：複数のXahauおよびXRPLアカウントを管理できる
- **xAppsへのゲートウェイ**：Xamanに統合された分散型アプリケーション

ダウンロード：[xaman.app](https://xaman.app)

### Xamanのインストール

1. **App Store**（iOS）または**Google Play**（Android）を開く
2. **「Xaman」**を検索
3. アプリをダウンロードしてインストール
4. Xamanを開き、初期設定に従う：
   - **PINコード**または**生体認証**（指紋/Face ID）を設定する
   - 利用規約に同意する

### テストネットアカウントのインポート

Xamanをインストールしたら、コードで生成したアカウントを**ファミリーシード**（\`s\`で始まる文字列）を使用してインポートできます：

1. Xamanを開く
2. **「アカウントを追加」**ボタン（または上部の\`+\`アイコン）をタップ
3. **「既存のアカウントをインポート」**を選択
4. インポート方法として**「Family Seed（s...）」**を選択
5. シード（ウォレット生成時に取得した\`s\`で始まる文字列）を入力
6. アクセスレベルを選択：
   - **フルアクセス**：トランザクションに署名できる（シードが必要）
   - **読み取り専用**：残高とトランザクションのみ確認できる（アドレスのみ必要）
7. PINまたは生体認証で確認
8. アカウントがXamanのアカウントリストに表示される

### XamanにXahauテストネットを追加する

デフォルトでは、Xamanは**XRPLメインネット**に接続しています。**Xahauテストネット**で作業するには、ネットワークを追加する必要があります：

1. Xamanで**設定**（歯車アイコン）に移動
2. **「Advanced」（詳細）**セクションを見つける
3. **「Debug」**セクションを見つける
4. **開発者モード（Developer Mode）**を有効にする
5. メインメニューで右上隅をタップして**Xahau Testnet**をアクティブネットワークとして選択する
6. これでアカウントにテストネットのXAH残高が表示される

### インポートの確認

インポート後、すべてが正しいことを確認する：
- Xamanが表示する**アドレス**がコードで生成したものと一致するか確認する
- 署名が機能することを確認するために、小さなテストトランザクションを送信できる

### Xamanでトランザクションに署名する

Xamanは次の2つの方法でトランザクションに署名できます。

**アプリから直接**：
- Xamanから直接ペイメントを送れる
- **「送信」**をタップし、送信先アドレスと金額を入力
- PINまたは生体認証で確認

**xAppまたはWebサイト（QR）から**：
- 一部のアプリケーションがQRコードを表示する
- XamanでQRをスキャンする
- Xamanがトランザクションの詳細を表示する
- PINで署名して承認または拒否する

### Xamanのセキュリティ

- シードは**デバイスから絶対に出ない**。Xamanはオペレーティングシステムのセキュアストレージ（iOSではKeychain、AndroidではKeystore）に暗号化された形式で鍵を保存する
- トランザクションはデバイス上で**ローカルに署名される**
- Xamanは秘密鍵をサーバーに**送信することはない**
- デバイスを紛失した場合、シードを使用して別のデバイスでアカウントを復元できる
- **シードのコピーを常にデバイス外に保管する**（紙、金属バックアップ）
- Xamanはセキュリティのためにアプリからシードをエクスポートできないため、インポート前に保存してあることを確認すること


### 読み取り専用でのインポート

トランザクションに署名せずにアカウントを**監視**だけしたい場合は次のようにします。

1. Xamanで**「アカウントを追加」**をタップ
2. **「既存のアカウントをインポート」**を選択
3. **「アカウントアドレス（r...）」**を選択
4. アドレス\`r...\`を入力（シードではない）
5. アカウントが読み取り専用モードで追加される

これは次のような場合に役立ちます。
- 他のアカウント（取引所、コントラクト）の監視
- スマートフォンでシードを公開せずにメインネットアカウントを監視する
- 残高をすばやく確認する`,
        ko: `**Xaman**(이전 이름 XUMM)은 XRPL 및 Xahau 생태계에서 가장 널리 사용되는 모바일 지갑입니다. 지금까지는 JavaScript 코드에서 지갑을 다뤘지만, 계정을 시각적으로 관리하고 모바일에서 트랜잭션에 서명하며 분산형 앱과 상호작용하려면 계정을 Xaman으로 가져와야 합니다.

### Xaman이란?

Xaman은 **iOS**와 **Android**에서 사용할 수 있는 모바일 앱으로, 다음 역할을 합니다:
- **지갑**: 기기에 키를 안전하게 저장
- **트랜잭션 서명기**: QR 스캔이나 xApp을 통해 트랜잭션 승인
- **계정 관리자**: 여러 Xahau 및 XRPL 계정 관리
- **xApp 진입점**: Xaman에 통합된 분산형 앱 사용

다운로드: [xaman.app](https://xaman.app)

### Xaman 설치

1. **App Store**(iOS) 또는 **Google Play**(Android)를 엽니다
2. **"Xaman"** 을 검색합니다
3. 앱을 다운로드하고 설치합니다
4. Xaman을 열고 초기 설정을 진행합니다:
   - **PIN 코드** 또는 **생체 인증**(지문/Face ID) 설정
   - 이용 약관 동의

### Testnet 계정 가져오기

Xaman 설치 후, 코드로 생성한 계정을 **family seed**(\`s\`로 시작하는 문자열)로 가져올 수 있습니다:

1. Xaman을 엽니다
2. **"계정 추가"** 버튼(또는 상단의 \`+\` 아이콘)을 누릅니다
3. **"기존 계정 가져오기"** 를 선택합니다
4. 가져오기 방식으로 **"Family Seed (s...)"** 를 선택합니다
5. 지갑 생성 시 얻은 seed(\`s\`로 시작하는 문자열)를 입력합니다
6. 접근 수준을 선택합니다:
   - **전체 접근**: 트랜잭션 서명 가능(seed 필요)
   - **읽기 전용**: 잔액과 트랜잭션만 확인 가능(주소만 필요)
7. PIN 또는 생체 인증으로 확인합니다
8. 계정이 Xaman 계정 목록에 나타납니다

### Xaman에 Xahau Testnet 추가하기

기본적으로 Xaman은 **XRPL Mainnet**에 연결됩니다. **Xahau Testnet**에서 작업하려면 네트워크를 추가해야 합니다:

1. Xaman에서 **설정**(톱니바퀴 아이콘)으로 이동합니다
2. **"Advanced"** 섹션을 찾습니다
3. **"Debug"** 섹션을 찾습니다
4. **Developer Mode**를 활성화합니다
5. 메인 메뉴 오른쪽 상단에서 **Xahau Testnet**을 활성 네트워크로 선택합니다
6. 이제 계정에 testnet XAH 잔액이 표시됩니다

### 가져오기 확인

가져온 뒤 다음을 확인하세요:
- Xaman에 표시되는 **주소**가 코드에서 생성한 주소와 일치해야 합니다
- 작은 테스트 트랜잭션을 보내 서명이 정상 동작하는지 확인할 수 있습니다

### Xaman으로 트랜잭션 서명하기

Xaman은 두 가지 방식으로 트랜잭션에 서명할 수 있습니다:

**앱 내부에서 직접**:
- Xaman에서 직접 결제를 보낼 수 있습니다
- **"보내기"** 를 누르고 수신 주소와 금액을 입력합니다
- PIN 또는 생체 인증으로 확인합니다

**xApp 또는 웹사이트(QR)**:
- 일부 애플리케이션은 QR 코드를 표시합니다
- Xaman으로 QR을 스캔합니다
- Xaman이 트랜잭션 세부 정보를 보여줍니다
- PIN으로 서명해 승인하거나 거절합니다

### Xaman의 보안

- 시드는 **절대 기기를 벗어나지 않습니다**. Xaman은 운영체제의 보안 저장소(iOS의 Keychain, Android의 Keystore)에 키를 암호화해 저장합니다
- 트랜잭션은 기기에서 **로컬로 서명**됩니다
- Xaman은 개인 키를 어떤 서버에도 **전송하지 않습니다**
- 기기를 잃어버려도 시드를 이용해 다른 기기에서 계정을 복구할 수 있습니다
- **항상 시드 복사본을 기기 외부에 보관하세요**(종이, 금속 백업)
- Xaman은 보안을 위해 앱에서 시드를 내보내지 않으므로, 가져오기 전에 반드시 따로 보관해 두어야 합니다


### 읽기 전용으로 가져오기

트랜잭션 서명 없이 계정만 **모니터링**하려면:

1. Xaman에서 **"계정 추가"** 를 누릅니다
2. **"기존 계정 가져오기"** 를 선택합니다
3. **"계정 주소 (r...)"** 를 선택합니다
4. 주소 \`r...\`를 입력합니다(seed 아님)
5. 계정이 읽기 전용 모드로 추가됩니다

다음과 같은 경우에 유용합니다:
- 다른 계정(거래소, 컨트랙트) 모니터링
- 모바일에서 seed를 노출하지 않고 mainnet 계정 관찰
- 잔액을 빠르게 확인`,
        zh: `**Xaman**（前身为 XUMM）是 XRPL 和 Xahau 生态系统中使用最广泛的移动钱包。迄今为止，我们一直通过 JavaScript 代码操作钱包，但若要可视化管理账户、用手机签署交易并与去中心化应用交互，就需要将账户导入 Xaman。

### 什么是 Xaman？

Xaman 是一款支持 **iOS** 和 **Android** 的移动应用，具备以下功能：
- **钱包**：在设备上安全存储密钥
- **交易签名器**：通过扫描 QR 或 xApp 批准交易
- **账户管理**：管理多个 Xahau 和 XRPL 账户
- **xApp 入口**：访问集成在 Xaman 中的去中心化应用

下载：[xaman.app](https://xaman.app)

### 安装 Xaman

1. 打开 **App Store**（iOS）或 **Google Play**（Android）
2. 搜索 **"Xaman"**（原名 XUMM）
3. 下载并安装应用
4. 打开 Xaman 并完成初始设置：
   - 设置 **PIN 码**或**生物识别**（指纹/Face ID）
   - 同意使用条款

### 导入测试网账户

安装 Xaman 后，可以使用你的 **family seed**（以 \`s\` 开头的字符串）导入通过代码生成的账户：

1. 打开 Xaman
2. 点击**"添加账户"**按钮（或顶部的 \`+\` 图标）
3. 选择**"导入现有账户"**
4. 选择 **"Family Seed（s...）"** 作为导入方式
5. 输入你的 seed（生成钱包时获得的以 \`s\` 开头的字符串）
6. 选择访问级别：
   - **完全访问**：可签署交易（需要 seed）
   - **只读**：只能查看余额和交易（只需要地址）
7. 用 PIN 或生物识别确认
8. 账户将出现在 Xaman 账户列表中

### 在 Xaman 中添加 Xahau 测试网

默认情况下，Xaman 连接到 **XRPL 主网**。要使用 **Xahau 测试网**，需要添加该网络：

1. 在 Xaman 中进入**设置**（齿轮图标）
2. 找到 **"Advanced"** 部分
3. 找到 **"Debug"** 部分
4. 启用**开发者模式（Developer Mode）**
5. 在主菜单右上角点击，选择 **Xahau Testnet** 为活动网络
6. 现在账户将显示测试网 XAH 余额

### 验证导入

导入后，请确认以下内容：
- Xaman 显示的**地址**应与代码生成的地址一致
- 可以发送一笔小额测试交易来确认签名功能正常

### 用 Xaman 签署交易

Xaman 支持两种签署交易的方式：

**直接在应用中**：
- 可以直接从 Xaman 发送付款
- 点击**"发送"**，输入目标地址和金额
- 用 PIN 或生物识别确认

**通过 xApp 或网站（QR）**：
- 部分应用会显示二维码
- 用 Xaman 扫描二维码
- Xaman 显示交易详情
- 用 PIN 签名批准或拒绝

### Xaman 的安全机制

- 你的 seed **永远不会离开设备**。Xaman 以加密形式将密钥存储在操作系统的安全存储区（iOS 的 Keychain、Android 的 Keystore）
- 交易在设备上**本地签署**
- Xaman **绝不会**向任何服务器发送你的私钥
- 若丢失设备，可用 seed 在另一台设备上恢复账户
- **始终在设备外保留 seed 的副本**（纸质、金属备份）
- Xaman 出于安全原因不允许从应用导出 seed，请确保在导入前已妥善保存


### 只读导入

如果只想**监控**账户而不签署交易：

1. 在 Xaman 中点击**"添加账户"**
2. 选择**"导入现有账户"**
3. 选择**"账户地址（r...）"**
4. 输入地址 \`r...\`（不是 seed）
5. 账户以只读模式添加

适用场景：
- 监控其他账户（交易所、合约）
- 在手机上不暴露 seed 的情况下观察主网账户
- 快速查询余额`,
      },
      codeBlocks: [
        {
          title: {
            es: "Generar una wallet y preparar datos para importar en Xaman",
            pt: "Generar uma wallet e preparar dados para importar em Xaman",
            en: "Generate a wallet and prepare data for importing into Xaman",
            jp: "ウォレットを生成してXamanにインポートするためのデータを準備する",
            ko: "지갑 생성 후 Xaman 가져오기용 데이터 준비",
            zh: "生成钱包并准备导入 Xaman 的数据",
          },
          language: "javascript",
          code: {
            es: `const { Client, Wallet } = require("xahau");

async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Generar y financiar una wallet
  const wallet = Wallet.generate();
  console.log("Generando wallet de testnet...");
  await client.fundWallet(wallet);

  // Verificar balance
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== Datos para importar en Xaman ===");
  console.log("Dirección:", wallet.address);
  console.log("Seed:", wallet.seed);
  console.log("Balance:", balance, "XAH");
  console.log("=== Instrucciones ===");
  console.log("1. Abre Xaman en tu móvil");
  console.log("2. Toca 'Añadir cuenta' → 'Importar cuenta existente'");
  console.log("4. Selecciona Acceso Completo");
  console.log("5. Selecciona 'Family Seed (s...)'");
  console.log("6. Introduce el seed:", wallet.seed);
  console.log("  Recuerda: estamos en TESTNET.");
  console.log("    Asegúrate de seleccionar la red Xahau Testnet en Xaman.");

  await client.disconnect();
}

prepareForXaman();`,
            pt: `const { Client, Wallet } = require("xahau");
async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // Generar e financiar uma wallet
  const wallet = Wallet.generate();
  console.log("Generando wallet de testnet...");
  await client.fundWallet(wallet);
  // Verificar saldo
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });
  const balance = Number(response.result.account_data.Saldo) / 1_000_000;
  console.log("=== Dados para importar em Xaman ===");
  console.log("Endereço:", wallet.address);
  console.log("Seed:", wallet.seed);
  console.log("Saldo:", balance, "XAH");
  console.log("=== Instrucciones ===");
  console.log("1. Abra Xaman em seu móvel");
  console.log("2. Toca 'Añadir conta' → 'Importar conta existente'");
  console.log("4. Selecione Acesso Completo");
  console.log("5. Selecione 'Family Seed (s...)'");
  console.log("6. Introduce ou seed:", wallet.seed);
  console.log("  Recuerda: estamos em TESTNET.");
  console.log("    Certifique-se de seleccionar a rede Xahau Testnet em Xaman.");
  await client.disconnect();
}
prepareForXaman();`,
            en: `const { Client, Wallet } = require("xahau");

async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Generate and fund a wallet
  const wallet = Wallet.generate();
  console.log("Generating testnet wallet...");
  await client.fundWallet(wallet);

  // Check balance
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== Data for importing into Xaman ===");
  console.log("Address:", wallet.address);
  console.log("Seed:", wallet.seed);
  console.log("Balance:", balance, "XAH");
  console.log("=== Instructions ===");
  console.log("1. Open Xaman on your phone");
  console.log("2. Tap 'Add account' → 'Import existing account'");
  console.log("4. Select Full Access");
  console.log("5. Select 'Family Seed (s...)'");
  console.log("6. Enter the seed:", wallet.seed);
  console.log("  Remember: we are on TESTNET.");
  console.log("    Make sure to select the Xahau Testnet network in Xaman.");

  await client.disconnect();
}

prepareForXaman();`,
            jp: `const { Client, Wallet } = require("xahau");

async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // ウォレットを生成して資金を供給する
  const wallet = Wallet.generate();
  console.log("テストネットウォレットを生成中...");
  await client.fundWallet(wallet);

  // 残高を確認する
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== Xamanにインポートするためのデータ ===");
  console.log("アドレス：", wallet.address);
  console.log("シード：", wallet.seed);
  console.log("残高：", balance, "XAH");
  console.log("=== 手順 ===");
  console.log("1. スマートフォンでXamanを開く");
  console.log("2. 「アカウントを追加」→「既存のアカウントをインポート」をタップ");
  console.log("4. 「フルアクセス」を選択");
  console.log("5. 「Family Seed（s...）」を選択");
  console.log("6. シードを入力：", wallet.seed);
  console.log("  注意：テストネットを使用しています。");
  console.log("    Xamanで必ずXahau Testnetネットワークを選択してください。");

  await client.disconnect();
}

prepareForXaman();`,
            ko: `const { Client, Wallet } = require("xahau");

async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 지갑 생성 및 자금 지급
  const wallet = Wallet.generate();
  console.log("testnet 지갑 생성 중...");
  await client.fundWallet(wallet);

  // 잔액 확인
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== Xaman 가져오기용 데이터 ===");
  console.log("주소:", wallet.address);
  console.log("시드:", wallet.seed);
  console.log("잔액:", balance, "XAH");
  console.log("=== 안내 ===");
  console.log("1. 휴대폰에서 Xaman을 엽니다");
  console.log("2. '계정 추가' → '기존 계정 가져오기'를 누릅니다");
  console.log("4. 전체 접근을 선택합니다");
  console.log("5. 'Family Seed (s...)'를 선택합니다");
  console.log("6. 시드를 입력합니다:", wallet.seed);
  console.log("  주의: 지금은 TESTNET입니다.");
  console.log("    Xaman에서 반드시 Xahau Testnet 네트워크를 선택하세요.");

  await client.disconnect();
}

prepareForXaman();`,
            zh: `const { Client, Wallet } = require("xahau");

async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 生成钱包并获取资金
  const wallet = Wallet.generate();
  console.log("正在生成测试网钱包...");
  await client.fundWallet(wallet);

  // 验证余额
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== 导入 Xaman 所需数据 ===");
  console.log("地址:", wallet.address);
  console.log("Seed:", wallet.seed);
  console.log("余额:", balance, "XAH");
  console.log("=== 操作步骤 ===");
  console.log("1. 在手机上打开 Xaman");
  console.log("2. 点击'添加账户' → '导入现有账户'");
  console.log("4. 选择完全访问");
  console.log("5. 选择 'Family Seed (s...)'");
  console.log("6. 输入 seed:", wallet.seed);
  console.log("  注意：当前使用的是 TESTNET。");
  console.log("    请确保在 Xaman 中选择 Xahau Testnet 网络。");

  await client.disconnect();
}

prepareForXaman();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es Xaman?", pt: "¿Qué é Xaman?", en: "What is Xaman?", jp: "Xamanとは？", ko: "Xaman이란?", zh: "什么是 Xaman？" },
          content: {
            es: "Wallet móvil del ecosistema XRPL/Xahau\n\n• iOS y Android\n• Almacena claves de forma segura\n• Firma transacciones desde el móvil\n• Gestiona múltiples cuentas\n• Acceso a xApps\n\nDescarga: xaman.app",
            pt: "Wallet móvel do ecossistema XRPL/Xahau\n\n• iOS e Android\n• Armazena chaves de forma segura\n• Assinatura transações a partir do móvel\n• Gestiona múltiplas contas\n• Acesso a xApps\n\nDescarga: xaman.app",
            en: "Mobile wallet for the XRPL/Xahau ecosystem\n\n• iOS and Android\n• Stores keys securely\n• Sign transactions from your phone\n• Manage multiple accounts\n• Access to xApps\n\nDownload: xaman.app",
            jp: "XRPL/Xahauエコシステムのモバイルウォレット\n\n• iOSとAndroid\n• 鍵を安全に保存\n• スマートフォンからトランザクションに署名\n• 複数のアカウントを管理\n• xAppsへのアクセス\n\nダウンロード：xaman.app",
            ko: "XRPL/Xahau 생태계용 모바일 지갑\n\n• iOS 및 Android 지원\n• 키를 안전하게 저장\n• 모바일에서 트랜잭션 서명\n• 여러 계정 관리\n• xApp 접근 가능\n\n다운로드: xaman.app",
            zh: "XRPL/Xahau 生态系统的移动钱包\n\n• 支持 iOS 和 Android\n• 安全存储密钥\n• 用手机签署交易\n• 管理多个账户\n• 访问 xApp\n\n下载：xaman.app",
          },
          visual: "📱",
        },
        {
          title: { es: "Importar tu cuenta", pt: "Importar sua conta", en: "Import your account", jp: "アカウントのインポート", ko: "계정 가져오기", zh: "导入账户" },
          content: {
            es: "1️⃣ Abre Xaman → 'Añadir cuenta'\n2️⃣ 'Importar cuenta existente'\n3️⃣ Elige 'Acceso completo'\n4️⃣ Selecciona 'Family Seed (s...)\n5️⃣ Introduce tu seed\n6️⃣ Confirma con PIN/biometría\n\n⚠️ Selecciona red Xahau Testnet\nen Ajustes → Redes",
            pt: "1️⃣ Abra Xaman → 'Añadir conta'\n2️⃣ 'Importar conta existente'\n3️⃣ Escolha 'Acesso completo'\n4️⃣ Selecione 'Family Seed (s...)\n5️⃣ Introduce seu seed\n6️⃣ Conassinatura com PIN/biometría\n\n⚠️ Selecione rede Xahau Testnet\nen Ajustes → Redes",
            en: "1️⃣ Open Xaman → 'Add account'\n2️⃣ 'Import existing account'\n3️⃣ Choose 'Full access'\n4️⃣ Select 'Family Seed (s...)'\n5️⃣ Enter your seed\n6️⃣ Confirm with PIN/biometrics\n\n⚠️ Select Xahau Testnet network\nin Settings → Networks",
            jp: "1️⃣ Xamanを開く → 「アカウントを追加」\n2️⃣ 「既存のアカウントをインポート」\n3️⃣ 「フルアクセス」を選択\n4️⃣ 「Family Seed（s...）」を選択\n5️⃣ シードを入力\n6️⃣ PINまたは生体認証で確認\n\n⚠️ 設定 → ネットワークで\nXahau Testnetネットワークを選択",
            ko: "1️⃣ Xaman 열기 → '계정 추가'\n2️⃣ '기존 계정 가져오기'\n3️⃣ '전체 접근' 선택\n4️⃣ 'Family Seed (s...)' 선택\n5️⃣ 시드 입력\n6️⃣ PIN/생체 인증으로 확인\n\n⚠️ 설정 → 네트워크에서\nXahau Testnet을 선택하세요",
            zh: "1️⃣ 打开 Xaman → '添加账户'\n2️⃣ '导入现有账户'\n3️⃣ 选择'完全访问'\n4️⃣ 选择 'Family Seed (s...)'\n5️⃣ 输入你的 seed\n6️⃣ 用 PIN/生物识别确认\n\n⚠️ 在设置 → 网络中\n选择 Xahau Testnet",
          },
          visual: "🔑",
        },
        {
          title: { es: "Seguridad en Xaman", pt: "Segurança em Xaman", en: "Security in Xaman", jp: "Xamanのセキュリティ", ko: "Xaman 보안", zh: "Xaman 的安全机制" },
          content: {
            es: "🔐 El seed NUNCA sale del dispositivo\n📲 Firma local (no envía claves a servidores)\n🔒 Almacenamiento encriptado (Keychain/Keystore)\n\nModos de importación:\n• Acceso completo → Firmar transacciones\n• Solo lectura → Solo ver balance\n\n💡 Guarda siempre una copia del seed\nfuera del dispositivo",
            pt: "🔐 O seed NUNCA sale do dispositivo\n📲 Assinatura local (não envia chaves a servidores)\n🔒 Armazenamiento encriptado (Keychain/Keystore)\n\nModos de importação:\n• Acesso completo → Assinar transações\n• Apenas leitura → Apenas ver saldo\n\n💡 Salva sempre uma cópia do seed\nfora do dispositivo",
            en: "🔐 The seed NEVER leaves the device\n📲 Local signing (does not send keys to servers)\n🔒 Encrypted storage (Keychain/Keystore)\n\nImport modes:\n• Full access → Sign transactions\n• Read-only → Only view balance\n\n💡 Always keep a copy of the seed\noutside the device",
            jp: "🔐 シードはデバイスから絶対に出ない\n📲 ローカル署名（サーバーに鍵を送信しない）\n🔒 暗号化されたストレージ（Keychain/Keystore）\n\nインポートモード：\n• フルアクセス → トランザクションに署名\n• 読み取り専用 → 残高のみ確認\n\n💡 シードのコピーを\n常にデバイス外に保管する",
            ko: "🔐 시드는 절대 기기를 떠나지 않습니다\n📲 로컬 서명(서버로 키를 보내지 않음)\n🔒 암호화 저장소(Keychain/Keystore)\n\n가져오기 모드:\n• 전체 접근 → 트랜잭션 서명\n• 읽기 전용 → 잔액만 확인\n\n💡 항상 시드 사본을\n기기 밖에 보관하세요",
            zh: "🔐 seed 永远不会离开设备\n📲 本地签名（不向服务器发送密钥）\n🔒 加密存储（Keychain/Keystore）\n\n导入模式：\n• 完全访问 → 签署交易\n• 只读 → 仅查看余额\n\n💡 始终在设备外\n保留 seed 的副本",
          },
          visual: "🛡️",
        },
      ],
    },
  ],
}

const arabicModuleTranslations = {
  title: "إنشاء أول wallet لك",
  lessons: {
    m3l1: {
      title: "التشفير والمفاتيح في Xahau",
      theory: `قبل التفاعل مع Xahau تحتاج إلى **wallet**. الـ wallet ليست تطبيقا فقط؛ هي زوج مفاتيح تشفيرية يسمح لك بتوقيع المعاملات وإثبات ملكية الحساب.

### زوج المفاتيح

كل حساب يعتمد على تشفير المنحنيات الإهليلجية:

- **Private key / Seed**: قيمة سرية لا يجب مشاركتها أبدا. تستخدم لتوقيع المعاملات، وغالبا تظهر كـ family seed يبدأ بالحرف \`s\`.
- **Public key**: مشتق من المفتاح الخاص، ويستخدم للتحقق من التوقيعات.
- **Address / Account**: مشتق من المفتاح العام ويبدأ غالبا بالحرف \`r\`. هذا هو معرفك العام على الشبكة.

### خوارزميات التوقيع

يدعم Xahau خوارزميتين:

- **secp256k1**: نفس خوارزمية Bitcoin، وتستخدمها أمثلة كثيرة في هذه الدورة.
- **ed25519**: أحدث وأكثر كفاءة.

مكتبة \`xahau js\` قد تنشئ wallets بـ ed25519 إذا لم تحدد الخوارزمية. أمثلة faucet في testnet غالبا تستخدم \`secp256k1\`، لذلك ستراها محددة صراحة في الكود.

### تفعيل الحساب

في Xahau، العنوان المولد لا يوجد فعليا في ledger حتى يستقبل أول إيداع. يحتاج الحساب إلى reserve أساسي، مثل 1 XAH، حتى يصبح مفعلا.

### الأمان

لا تشارك seed أبدا. استخدم testnet للتجارب، واحفظ seeds الخاصة بـ mainnet في مكان آمن وغير متصل بالإنترنت.`,
      codeTitles: [
        "إنشاء wallet جديدة",
        "استعادة wallet من seed موجود",
      ],
      code: [
        `const { Wallet } = require("xahau");

// إنشاء wallet جديدة باستخدام secp256k1 مثل faucet الخاص بالـ testnet
const wallet = Wallet.generate("secp256k1");

console.log("=== Wallet جديدة ===");
console.log("العنوان:", wallet.address);
console.log("Seed:", wallet.seed);
console.log("Public key:", wallet.publicKey);

// مهم: لا تشارك seed أبدا، حتى في أمثلة تعليمية.`,
        `const { Wallet } = require("xahau");

// ضع seed موجودا هنا فقط في testnet أو من ملف .env
const seed = "sEdYourSeedHere";

// استعادة wallet من seed
const wallet = Wallet.fromSeed(seed, { algorithm: "secp256k1" });

console.log("العنوان:", wallet.address);
console.log("Public key:", wallet.publicKey);

// إذا كان seed صحيحا، ستحصل دائما على نفس العنوان.`,
      ],
      slides: [
        {
          title: "ما هي Wallet؟",
          content: "Wallet = مفاتيح تشفيرية\n\n• Seed / secret للتوقيع\n• Public key للتحقق\n• Address عام يبدأ غالبا بـ r\n\nالـ wallet تثبت ملكيتك للحساب.",
        },
        {
          title: "خوارزميات التوقيع",
          content: "Xahau يدعم:\n\n• secp256k1\n  مستخدم في Bitcoin وكثير من أمثلة testnet\n\n• ed25519\n  حديث وفعال\n\nحدد الخوارزمية بوضوح عند الحاجة.",
        },
        {
          title: "تفعيل الحساب",
          content: "العنوان يمكن إنشاؤه محليا\nلكن الحساب لا يظهر في ledger حتى يستلم XAH\n\n• يحتاج reserve أساسي\n• testnet faucet يرسل XAH مجانية\n• بعد التفعيل يمكن إرسال معاملات",
        },
      ],
    },
    m3l2: {
      title: "تفعيل wallet على testnet",
      theory: `بعد إنشاء wallet، تحتاج إلى تفعيلها على **Xahau Testnet**. التفعيل يعني أن الحساب يستلم أول XAH، فيظهر كـ \`AccountRoot\` داخل ledger.

### لماذا testnet؟

Testnet شبكة مخصصة للتجربة. XAH هناك لا قيمة حقيقية لها، ويمكنك استخدام faucet للحصول على رصيد مجاني. هذا يسمح لك بتجربة المعاملات دون مخاطرة.

### ما هو faucet؟

Faucet هو خدمة ترسل XAH اختبارية إلى عنوانك. في الدورة نستخدمه لإنشاء حسابات ممولة بسرعة.

### تدفق التفعيل

1. تولد wallet محليا.
2. ترسل عنوانها إلى faucet.
3. faucet يرسل XAH testnet.
4. يظهر الحساب في ledger.
5. تتحقق باستخدام \`account_info\`.

### التحقق من الرصيد

بعد التفعيل يمكنك استخدام \`account_info\` لمعرفة الرصيد، sequence، و flags. الرصيد يعرض غالبا بوحدة drops، حيث 1 XAH = 1,000,000 drops.`,
      codeTitles: [
        "إنشاء وتفعيل wallet على testnet باستخدام faucet",
        "فحص رصيد حساب موجود",
      ],
      code: [
        `const { Client, Wallet, xahToDrops } = require("xahau");

async function createAndFundWallet() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // إنشاء wallet جديدة على testnet
  const wallet = Wallet.generate("secp256k1");
  console.log("العنوان الجديد:", wallet.address);
  console.log("Seed:", wallet.seed);

  // طلب تمويل من faucet
  const funded = await client.fundWallet(wallet);
  console.log("تم تمويل الحساب:", funded.wallet.address);
  console.log("الرصيد:", funded.balance, "XAH");

  await client.disconnect();
}

createAndFundWallet().catch(console.error);`,
        `const { Client, dropsToXah } = require("xahau");

async function checkBalance() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const address = "rYourAddressHere";

  // account_info يرجع بيانات الحساب إذا كان مفعلا
  const response = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  });

  const account = response.result.account_data;
  console.log("العنوان:", account.Account);
  console.log("الرصيد:", dropsToXah(account.Balance), "XAH");
  console.log("Sequence:", account.Sequence);

  await client.disconnect();
}

checkBalance().catch(console.error);`,
      ],
      slides: [
        {
          title: "Xahau Testnet",
          content: "Testnet = شبكة للتجربة\n\n• XAH بلا قيمة حقيقية\n• Faucet مجاني\n• مناسبة للتعلم\n• لا تستخدم mainnet حتى تفهم الأمان جيدا",
        },
        {
          title: "تدفق التفعيل",
          content: "1. إنشاء wallet\n2. حفظ seed بأمان\n3. إرسال address إلى faucet\n4. استلام XAH testnet\n5. التحقق عبر account_info",
        },
        {
          title: "التحقق باستخدام account_info",
          content: "account_info يعرض:\n\n• Balance\n• Sequence\n• Flags\n• OwnerCount\n\nإذا لم يكن الحساب مفعلا، سترى خطأ مثل actNotFound.",
        },
      ],
    },
    m3l2b: {
      title: "فحص حسابك في block explorers",
      theory: `بمجرد تفعيل حسابك على الـ testnet (أو على mainnet)، يمكنك التحقق من حالته باستخدام **block explorers**: تطبيقات ويب تتيح لك الاستعلام عن أي حساب أو معاملة أو ledger بصريا ودون كتابة كود.

### ما هو block explorer؟

**Block explorer** هو أداة ويب تتصل بعُقد Xahau وتعرض معلومات البلوكتشين بصيغة سهلة القراءة. إنه أشبه بـ "محرك بحث" للبلوكتشين.

باستخدام explorer يمكنك:
- رؤية **الرصيد** و**tokens** الخاصة بأي حساب
- الاطلاع على **سجل المعاملات** الكامل
- فحص **تفاصيل** أي معاملة (hash، الحقول، النتيجة)
- رؤية **objects الـ ledger** المرتبطة بحساب (trust lines، offers، hooks)
- التحقق مما إذا كانت معاملة قد تمت معالجتها بنجاح

### Explorers الخاصة بـ Xahau Mainnet

**Xahau Explorer** — [xahauexplorer.com](https://xahauexplorer.com)
**XRPLWin Xahau** — [xahau.xrplwin.com](https://xahau.xrplwin.com)
**Xahau Network Explorer** — [explorer.xahau.network](https://explorer.xahau.network)
**XahScan** — [xahscan.com](https://xahscan.com)

### Explorers الخاصة بـ Xahau Testnet

للتحقق من حسابات **testnet** (وهي التي نستخدمها في هذه الدورة)، استخدم هذه الـ explorers:

- [test.xahauexplorer.com](https://test.xahauexplorer.com)
- [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
- [explorer.xahau-test.net](https://explorer.xahau-test.net)

### كيف تفحص حسابك

1. افتح أيا من explorers الخاصة بـ testnet
2. في شريط البحث، الصق **العنوان** (يبدأ بـ \`r\`)
3. اضغط Enter أو انقر على بحث
4. سترى معلومات حسابك:
   - **الرصيد** بـ XAH
   - **tokens** التي تملكها (trust lines)
   - **المعاملات** الأخيرة
   - **flags** وإعدادات الحساب
   - **objects** الـ ledger المرتبطة

### التحقق من معاملة

كل معاملة لها **hash** فريد (سلسلة hexadecimal طويلة). يمكنك البحث عن هذا الـ hash في الـ explorer لرؤية:
- **نوع** المعاملة (Payment، TrustSet، AccountSet، إلخ)
- حساب **المصدر** و**الوجهة**
- **المبلغ** المرسل
- **النتيجة** (tesSUCCESS، tecPATH_DRY، إلخ)
- **Fee** المدفوعة
- **الـ ledger** الذي أدرجت فيه
- **التغييرات** في حالة الـ ledger (AffectedNodes)

### لماذا نستخدم explorers؟

- **تحقق بصري**: تأكيد أن المعاملة تمت معالجتها بنجاح دون كتابة كود
- **Debugging**: عندما يفشل شيء ما، يعرض الـ explorer كل تفاصيل الخطأ
- **الشفافية**: يمكن لأي شخص التحقق من أي عملية على البلوكتشين
- **التعلم**: رؤية معاملات حقيقية تساعدك على فهم كيفية عمل الشبكة داخليا`,
      codeTitles: [],
      code: [],
      slides: [
        {
          title: "ما هو block explorer؟",
          content: "واجهة لقراءة البلوكتشين\n\n• حسابات\n• معاملات\n• Ledgers\n• أرصدة\n• Objects\n\nمفيد للتحقق دون كتابة كود.",
        },
        {
          title: "Xahau Explorers",
          content: "Mainnet و Testnet لهما explorers مختلفة\n\nأمثلة:\n• xahauexplorer.com\n• xahau.xrplwin.com\n• xahscan.com\n\nاستخدم testnet explorer لحسابات faucet.",
        },
        {
          title: "كيف تفحص حسابك؟",
          content: "1. انسخ address فقط\n2. افتح explorer مناسب\n3. الصق العنوان في البحث\n4. تحقق من Balance و Transactions\n\nلا تدخل seed في أي explorer.",
        },
      ],
    },
    m3l3: {
      title: "أمان الـ wallet وأفضل الممارسات",
      theory: `أمان الـ wallet هو أهم شيء عند العمل مع البلوكتشين. الـ wallet المخترقة تعني **خسارة كاملة ولا رجعة فيها** لأموالك. في هذا الدرس ستتعلم أفضل الممارسات لحماية حسابك.

### لا تشارك seed / المفتاح السري أبدا

الـ seed (المفتاح الخاص) هي **الطريقة الوحيدة للتحكم في حسابك**. أي شخص يملك seed الخاص بك يمكنه توقيع أي معاملة نيابة عنك: إرسال كل أموالك، تغيير الإعدادات، إلخ. لا توجد طريقة للتراجع عن ذلك.

قواعد أساسية:
- **لا ترسل أبدا** seed عبر chat أو email أو أي وسيلة رقمية
- **لا تدخلها أبدا** في مواقع أو تطبيقات ليست موثوقة تماما
- **لا تحفظها أبدا** كنص عادي على جهازك
- **لا تلتقط أبدا** لقطة شاشة أو صورة لـ seed الخاصة بك

### Hot Wallet مقابل Cold Wallet

**Hot Wallet**:
- متصلة بالإنترنت بشكل دائم
- مناسبة للمعاملات المتكررة
- خطر أعلى للتعرض للاختراق
- مثال: wallet في تطبيق ويب، bot للتداول

**Cold Wallet**:
- غير متصلة بالإنترنت
- أقصى درجة أمان للتخزين طويل المدى
- أقل ملاءمة للاستخدام اليومي
- مثال: wallet مولدة offline، hardware wallet، paper wallet

### ممارسات جيدة لحفظ seeds

1. **Offline**: ولّد واحفظ seeds على جهاز لا يتصل بالإنترنت أبدا
2. **Hardware wallet**: أجهزة متخصصة (Ledger، Trezor) تحفظ المفاتيح بأمان
3. **Paper wallet**: اكتب seed على ورق واحفظه في مكان آمن (خزنة، صندوق أمانات بنكي)
4. **نسخ متعددة**: احفظ نسخا في أماكن فعلية مختلفة تحسبا لحريق أو فيضان، إلخ
5. **Metal backup**: احفر seed على لوح معدني مقاوم للحريق والماء

### seeds الخاصة بـ testnet: الاستثناء

seeds الخاصة بـ **testnet** آمنة للمشاركة في سياقات تعليمية لأن:
- tokens الـ testnet **ليس لها قيمة حقيقية**
- يمكن إعادة تعيين testnet في أي وقت
- مفيدة لتصحيح المشاكل مع مطورين آخرين

مع ذلك، من الممارسات الجيدة التعامل معها بحذر لبناء عادات جيدة.

### احتيالات شائعة وكيفية تجنبها

**Phishing**:
- مواقع ويب مزيفة تقلد واجهات شرعية
- تطلب منك إدخال seed لـ"التحقق" من حسابك
- تحقق دائما من الـ URL ولا تنقر على روابط مشبوهة

**Fake dApps**:
- تطبيقات تعد بعوائد غير واقعية
- تطلب أذونات مفرطة أو seed الخاص بك مباشرة
- تحقق دائما من الكود المصدري وسمعة المشروع

**الهندسة الاجتماعية**:
- أشخاص يتظاهرون بأنهم دعم فني
- يعرضون "المساعدة" مقابل seed الخاص بك
- لا يطلب أي دعم فني شرعي مفتاحك الخاص أبدا

**Airdrops مزيفة**:
- tokens تظهر في wallet الخاصة بك دون طلبها
- عند محاولة التفاعل معها، تحولك إلى مواقع خبيثة
- تجاهل tokens المجهولة التي لم تكن تتوقع استلامها

### Regular Keys: تغيير مفتاح التوقيع

يقدم Xahau ميزة متقدمة تسمى **Regular Key**: يمكنك تعيين **زوج مفاتيح بديل** له صلاحية توقيع المعاملات نيابة عن حسابك.

المزايا:
- إذا تم اختراق الـ regular key، يمكنك تغييرها بأخرى جديدة دون تغيير عنوانك
- يمكنك تعطيل الـ master key واستخدام الـ regular key فقط للعمليات اليومية
- يبقى عنوان حسابك كما هو

### Master Key Disable: أمان متقدم

لأقصى درجة أمان، يمكنك **تعطيل الـ master key** الخاصة بك (master key disable):
1. أولا، تقوم بإعداد regular key
2. ثم، تعطل master key باستخدام flag على مستوى الحساب
3. الآن فقط regular key يمكنها توقيع المعاملات
4. إذا تم اختراق regular key، يمكنك إعادة تفعيل master key لاستعادة السيطرة

هذا يضيف طبقة حماية إضافية: حتى لو حصل شخص ما على master seed الخاصة بك، لن يستطيع استخدامها طالما أنها معطلة.

### Multi-signing: توقيعات متعددة

للحسابات ذات القيمة العالية أو حسابات الحوكمة، يدعم Xahau **multi-signing**:

- يتم إعداد قائمة موقعين مصرح لهم مع **quorum** (الحد الأدنى المطلوب من الوزن)
- لكل موقّع وزن محدد
- تكون المعاملة صالحة فقط إذا حصلت على توقيعات كافية للوصول إلى الـ quorum
- مثال: 3 موقعين بوزن 1 لكل منهم، quorum يساوي 2 ← يلزم توقيعان من أصل 3 على الأقل

Multi-signing مثالي لـ:
- خزائن المنظمات
- الحسابات المشتركة بين شركاء
- أي موقف لا ينبغي فيه أن يملك شخص واحد السيطرة الكاملة`,
      codeTitles: [],
      code: [],
      slides: [
        {
          title: "القاعدة الذهبية",
          content: "من يملك seed يملك الحساب\n\n• لا تشارك seed\n• لا ترفعه إلى Git\n• لا تدخله في مواقع عشوائية\n• لا تطبعه في logs\n\nلا يوجد زر استرجاع مركزي.",
        },
        {
          title: "Hot Wallet مقابل Cold Wallet",
          content: "Hot Wallet:\n• متصلة بالإنترنت\n• سهلة وسريعة\n• مخاطرة أعلى\n\nCold Wallet:\n• Offline أو جهاز مخصص\n• أبطأ\n• أنسب للمبالغ الكبيرة",
        },
        {
          title: "احتيالات شائعة",
          content: "• Faucet مزيف يطلب seed\n• دعم فني وهمي\n• روابط phishing\n• إضافات متصفح خبيثة\n• عروض airdrop تطلب توقيعا مشبوها\n\nلا تثق، تحقق.",
        },
        {
          title: "أمان متقدم في Xahau",
          content: "أدوات يمكن دراستها لاحقا:\n\n• Regular Key\n• Disable Master Key\n• Account flags\n• .env وبيئات منفصلة\n• حسابات testnet للتجارب\n\nاستخدمها بحذر.",
        },
      ],
    },
    m3l4: {
      title: "إعداد حسابك باستخدام AccountSet",
      theory: `في Xahau، حسابك لديه عدة خيارات إعداد يمكنك تفعيلها أو تعطيلها باستخدام معاملة **AccountSet**. هذه الإعدادات تتحكم في سلوك حسابك تجاه المدفوعات الواردة، trust lines، والمزيد.

### معاملة AccountSet

\`AccountSet\` هو نوع المعاملة الذي يتيح لك تعديل خصائص حسابك. لا يرسل أو يستقبل أموالا؛ فقط يغير **flags** وحقول الإعداد الأخرى لحسابك.

### Flags مهمة

**asfRequireDest (RequireDestTag)**
- يتطلب أن تتضمن جميع المدفوعات الواردة **Destination Tag**
- مفيد لـ exchanges والخدمات التي تستخدم tag لتحديد المستخدم
- بدون هذا الـ flag، يمكن لأي شخص إرسال XAH إليك بدون tag وسيكون من المستحيل معرفة من أرسله
- Flag ID: \`1\`

**asfDisallowXRP (DisallowXAH)**
- يشير إلى أن حسابك **لا يرغب في استقبال XAH مباشرة**
- إنه مجرد إشارة، من الناحية التقنية لا تزال المدفوعات قادرة على الوصول
- مفيد للحسابات التي تتعامل فقط مع tokens مصدرة (IOUs)
- Flag ID: \`3\`

**asfDefaultRipple**
- ذو صلة بـ **مصدري tokens** (سنغطيه بالتفصيل في وحدة tokens)
- يسمح لـ tokens الصادرة عن حسابك بالتدفق بين أطراف ثالثة (rippling)
- بدون هذا الـ flag، يمكن لـ tokens التحرك فقط مباشرة من/إلى المُصدر
- Flag ID: \`8\`

**asfRequireAuth**
- يتطلب أن يقوم حسابك **بتفويض** كل trust line قبل أن يتمكن أحد من حيازة tokens الخاصة بك
- مفيد لـ tokens الخاضعة للتنظيم حيث تحتاج للتحكم في من يمكنه حيازتها
- Flag ID: \`2\`

### حقول أخرى قابلة للإعداد

**Domain**: يمكنك ربط نطاق ويب بحسابك. يُحفظ كقيمة hexadecimal للنطاق. هذا يسمح بالتحقق من أن الحساب ملك لصاحب ذلك النطاق.

**EmailHash**: hash بصيغة MD5 لبريدك الإلكتروني، يُستخدم لعرض avatar (مثل Gravatar). لا يكشف بريدك الإلكتروني مباشرة.

### Flags كـ bits

تُحفظ flags الحساب كحقل رقمي حيث يمثل كل bit علامة flag. يمكنك تفعيل flags باستخدام حقل \`SetFlag\` وتعطيلها باستخدام \`ClearFlag\` في معاملة AccountSet.

| Flag | ID | الغرض |
|------|----|-----------|
| asfRequireDest | 1 | طلب Destination Tag |
| asfRequireAuth | 2 | طلب تفويض trust lines |
| asfDisallowXRP | 3 | الإشارة إلى عدم الرغبة في استقبال XAH |
| asfDisableMaster | 4 | تعطيل master key |
| asfDefaultRipple | 8 | السماح بـ rippling لـ tokens الصادرة |`,
      codeTitles: [
        "تفعيل RequireDestTag على حسابك",
        "قراءة وتفسير account flags",
      ],
      code: [
        `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function enableRequireDestTag() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // قراءة seed من .env بدلا من كتابته في الكود
  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  const accountSet = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    SetFlag: 1, // asfRequireDest
  };

  const prepared = await client.autofill(accountSet);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("النتيجة:", result.result.meta.TransactionResult);
  console.log("Hash:", signed.hash);

  await client.disconnect();
}

enableRequireDestTag().catch(console.error);`,
        `const { Client } = require("xahau");

async function readAccountFlags(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    const flags = account.Flags;

    console.log("=== معلومات الحساب ===");
    console.log("العنوان:", account.Account);
    console.log("الرصيد:", Number(account.Balance) / 1_000_000, "XAH");
    console.log("Flags (القيمة الرقمية):", flags);
    console.log("");

    // تفسير كل flag على حدة
    // flags الخاصة بـ ledger (lsf) لها قيم مختلفة عن flags الخاصة بـ AccountSet (asf)
    const flagDefinitions = [
      { name: "lsfRequireDestTag", mask: 0x00020000, desc: "يتطلب Destination Tag" },
      { name: "lsfRequireAuth", mask: 0x00040000, desc: "يتطلب تفويض trust line" },
      { name: "lsfDisallowXRP", mask: 0x00080000, desc: "لا يرغب في استقبال XAH" },
      { name: "lsfDisableMaster", mask: 0x00100000, desc: "master key معطلة" },
      { name: "lsfDefaultRipple", mask: 0x00800000, desc: "rippling الافتراضي مفعل" },
    ];

    console.log("=== Flags المفعّلة ===");
    let anyActive = false;
    for (const flag of flagDefinitions) {
      const active = (flags & flag.mask) !== 0;
      if (active) {
        console.log(\` \${flag.name}: \${flag.desc}\`);
        anyActive = true;
      }
    }

    if (!anyActive) {
      console.log("  لا توجد flags خاصة مفعّلة (الإعداد الافتراضي)");
    }

    console.log("");
    console.log("=== حقول أخرى ===");
    console.log("Domain:", account.Domain
      ? Buffer.from(account.Domain, "hex").toString("utf-8")
      : "(غير مُعد)");
    console.log("EmailHash:", account.EmailHash || "(غير مُعد)");
    console.log("RegularKey:", account.RegularKey || "(غير مُعد)");
    console.log("Sequence:", account.Sequence);
    console.log("OwnerCount:", account.OwnerCount);

  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("الحساب غير موجود في الـ ledger.");
    } else {
      console.error("خطأ:", error.message);
    }
  }

  await client.disconnect();
}

// استبدل بعنوان testnet خاص بك
readAccountFlags("rYourXahauAddressHere");`,
      ],
      slides: [
        {
          title: "AccountSet: إعداد حسابك",
          content: "AccountSet يغير إعدادات الحساب\n\n• تفعيل flags\n• تعطيل flags\n• ضبط سلوك الحساب\n• يجب أن يوقعه صاحب الحساب",
        },
        {
          title: "Flags كـ bits",
          content: "Flags تحفظ داخل رقم واحد\n\nكل bit يمثل إعدادا\n\nمثال:\nRequireDestTag مفيد للحسابات التي تستقبل إيداعات متعددة وتحتاج Destination Tag.",
        },
      ],
    },
    m3l5: {
      title: "كيفية استيراد حسابك إلى Xaman",
      theory: `**Xaman** (المعروفة سابقا بـ XUMM) هي wallet الموبايل الأكثر استخداما في منظومة XRPL و Xahau. حتى الآن عملنا مع wallets من خلال كود JavaScript، لكن لإدارة حسابك بصريا، وتوقيع المعاملات من هاتفك، والتفاعل مع تطبيقات لامركزية، تحتاج إلى استيراد حسابك إلى Xaman.

### ما هو Xaman؟

Xaman هو تطبيق موبايل متاح لـ **iOS** و **Android** يعمل كـ:
- **Wallet**: يحفظ مفاتيحك بأمان على جهازك
- **موقّع معاملات**: يمكنك الموافقة على المعاملات عن طريق مسح QR أو من خلال xApp
- **مدير حسابات**: يمكنك إدارة عدة حسابات Xahau و XRPL
- **بوابة إلى xApps**: تطبيقات لامركزية مدمجة في Xaman

التحميل: [xaman.app](https://xaman.app)

### تثبيت Xaman

1. افتح **App Store** (iOS) أو **Google Play** (Android)
2. ابحث عن **"Xaman"** (كانت تسمى سابقا XUMM)
3. حمّل التطبيق وثبّته
4. افتح Xaman واتبع الإعداد الأولي:
   - أعد **رمز PIN** أو **بصمة حيوية** (بصمة الإصبع/Face ID)
   - وافق على شروط الاستخدام

### استيراد حساب testnet الخاص بك

بمجرد تثبيت Xaman، يمكنك استيراد الحساب الذي أنشأته عبر الكود باستخدام **family seed** الخاص بك (السلسلة التي تبدأ بـ \`s\`):

1. افتح Xaman
2. اضغط على زر **"إضافة حساب"** (أو أيقونة \`+\` في الأعلى)
3. اختر **"استيراد حساب موجود"**
4. اختر **"Family Seed (s...)"** كطريقة للاستيراد
5. أدخل seed الخاص بك (السلسلة التي تبدأ بـ \`s\` والتي حصلت عليها عند إنشاء wallet)
6. اختر مستوى الوصول:
   - **وصول كامل**: يمكنك توقيع المعاملات (يتطلب seed)
   - **قراءة فقط**: يمكنك فقط رؤية الرصيد والمعاملات (يتطلب العنوان فقط)
7. أكد باستخدام PIN أو البصمة الحيوية
8. سيظهر حسابك في قائمة حسابات Xaman

### إضافة شبكة Xahau Testnet في Xaman

افتراضيا، يتصل Xaman بـ **XRPL Mainnet**. للعمل مع **Xahau Testnet**، تحتاج إلى إضافة الشبكة:

1. في Xaman، اذهب إلى **الإعدادات** (أيقونة الترس)
2. ابحث عن قسم **"Advanced"**
3. ابحث عن قسم **"Debug"**
4. فعّل **Developer Mode**
5. اختر **Xahau Testnet** كشبكة نشطة من القائمة الرئيسية بالضغط في الزاوية العلوية اليمنى.
6. الآن سيعرض حسابك رصيد XAH على testnet

### التحقق من الاستيراد

بعد الاستيراد، تحقق من أن كل شيء صحيح:
- يجب أن يتطابق **العنوان** الذي يعرضه Xaman مع الذي أنشأته عبر الكود
- يمكنك إرسال معاملة اختبارية صغيرة للتأكد من أن التوقيع يعمل

### توقيع المعاملات باستخدام Xaman

يمكن لـ Xaman توقيع المعاملات بطريقتين:

**من داخل التطبيق نفسه**:
- يمكنك إرسال مدفوعات مباشرة من Xaman
- اضغط **"إرسال"**، أدخل عنوان الوجهة والمبلغ
- أكد باستخدام PIN أو البصمة الحيوية

**من xApp أو موقع ويب (QR)**:
- بعض التطبيقات تعرض رمز QR
- تمسح رمز QR بواسطة Xaman
- يعرض لك Xaman تفاصيل المعاملة
- توافق أو ترفض بالتوقيع باستخدام PIN الخاص بك

### الأمان في Xaman

- seed الخاص بك **لا يغادر جهازك أبدا**. يحفظ Xaman المفاتيح بشكل مشفر في مساحة التخزين الآمنة لنظام التشغيل (Keychain في iOS، Keystore في Android)
- تُوقّع المعاملات **محليا** على جهازك
- Xaman **لا يرسل أبدا** مفتاحك الخاص إلى أي خادم
- إذا فقدت جهازك، يمكنك استعادة حسابك على جهاز آخر باستخدام seed الخاص بك
- **احتفظ دائما بنسخة من seed خارج الجهاز** (ورق، metal backup)
- لا يسمح Xaman بتصدير seed من التطبيق لأسباب أمنية، لذا تأكد من أنك احتفظت به قبل الاستيراد

### الاستيراد بوضع القراءة فقط

إذا كنت تريد فقط **مراقبة** حساب دون القدرة على توقيع المعاملات:

1. في Xaman، اضغط **"إضافة حساب"**
2. اختر **"استيراد حساب موجود"**
3. اختر **"عنوان الحساب (r...)"**
4. أدخل العنوان \`r...\` (وليس seed)
5. يُضاف الحساب في وضع القراءة فقط

هذا مفيد لـ:
- مراقبة حسابات أخرى (exchanges، عقود)
- مراقبة حساب mainnet الخاص بك دون كشف seed على الهاتف
- التحقق من الأرصدة بسرعة`,
      codeTitles: [
        "إنشاء wallet وتجهيز بيانات الاستيراد في Xaman",
      ],
      code: [
        `const { Client, Wallet } = require("xahau");

async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // إنشاء وتمويل wallet
  const wallet = Wallet.generate();
  console.log("جارٍ إنشاء wallet على testnet...");
  await client.fundWallet(wallet);

  // التحقق من الرصيد
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== بيانات الاستيراد إلى Xaman ===");
  console.log("العنوان:", wallet.address);
  console.log("Seed:", wallet.seed);
  console.log("الرصيد:", balance, "XAH");
  console.log("=== التعليمات ===");
  console.log("1. افتح Xaman على هاتفك");
  console.log("2. اضغط على 'إضافة حساب' ← 'استيراد حساب موجود'");
  console.log("4. اختر وصول كامل");
  console.log("5. اختر 'Family Seed (s...)'");
  console.log("6. أدخل seed:", wallet.seed);
  console.log("  تذكر: نحن على TESTNET.");
  console.log("    تأكد من اختيار شبكة Xahau Testnet في Xaman.");

  await client.disconnect();
}

prepareForXaman();`,
      ],
      slides: [
        {
          title: "ما هو Xaman؟",
          content: "Xaman = wallet موبايل\n\n• iOS و Android\n• إدارة حسابات XRPL/Xahau\n• توقيع معاملات\n• تجربة أقرب للمستخدم النهائي",
        },
        {
          title: "استيراد حسابك",
          content: "لاستيراد حساب تحتاج seed\n\n• تحقق من التطبيق الرسمي\n• اختر الشبكة الصحيحة\n• استخدم testnet للتعلم\n• احتفظ بالـ seed سرا",
        },
        {
          title: "الأمان في Xaman",
          content: "قبل التوقيع:\n\n• اقرأ تفاصيل المعاملة\n• تحقق من المبلغ والوجهة\n• انتبه للشبكة mainnet/testnet\n• لا توافق على طلبات غامضة\n• لا تشارك seed أبدا",
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
  title: "Générer ton premier wallet",
  lessons: {
    m3l1: {
      title: "Cryptographie et clés dans Xahau",
      theory: `Avant d'interagir avec Xahau, tu as besoin d'un **wallet**. Un wallet n'est rien de plus qu'une paire de clés cryptographiques qui te permet de signer des transactions et de prouver la propriété de ton compte.

### Paire de clés

Dans Xahau (et dans de nombreuses autres blockchains), chaque compte repose sur la cryptographie à courbe elliptique :

- **Clé privée (Secret/Seed)** : Une valeur secrète que tu ne dois JAMAIS partager. Elle sert à signer les transactions. Elle est généralement représentée sous la forme d'un « family seed » commençant par \`s\` (ex. : \`sEdV....\`)
- **Clé publique** : Dérivée de la clé privée. Utilisée pour vérifier les signatures
- **Adresse (Account)** : Dérivée de la clé publique. Commence par \`r\` (ex. : \`rHb9CJ...\`). C'est ton identifiant public sur le réseau

### Algorithmes pris en charge

Xahau prend en charge deux algorithmes de signature :
- **secp256k1** : Le même que celui utilisé par Bitcoin. C'est l'algorithme par défaut
- **ed25519** : Plus moderne et plus efficace. Recommandé pour les nouveaux comptes

**Remarque :** La bibliothèque \`xahau js\` utilise par défaut **ed25519** si aucun algorithme n'est précisé. Le faucet de [xahau-test.net](https://xahau-test.net) génère les wallets avec **secp256k1** ; c'est pourquoi tu verras que les exemples de code de ce cours précisent cet algorithme lors de la génération des wallets.

### Activation du compte

Contrairement à Ethereum, dans Xahau un compte **n'existe pas dans le ledger tant qu'il n'a pas reçu son premier dépôt**. Un minimum de **1 XAH** (réserve de base) est nécessaire pour activer un compte. Ce XAH reste bloqué comme réserve tant que le compte existe.

### Sécurité

- Ne partage jamais ta clé privée (seed/secret)
- Utilise la **testnet** pour tes tests (jetons sans valeur réelle)
- Conserve tes seeds mainnet dans un endroit sûr et hors ligne`,
      codeTitles: ["Générer un nouveau wallet", "Restaurer un wallet depuis un seed existant"],
      code: [
`// Générer un nouveau wallet Xahau
const { Wallet } = require("xahau");

const wallet = Wallet.generate();

console.log("Adresse publique :", wallet.address);
console.log("Seed SECRET :", wallet.seed);

// L'adresse peut être partagée.
// Le seed ne doit jamais être publié ni envoyé à quelqu'un.`,
`// Restaurer un wallet à partir d'un seed existant
const { Wallet } = require("xahau");

const seed = "sEdYourTestnetSeedHere";
const wallet = Wallet.fromSeed(seed, { algorithm: "secp256k1" });

console.log("Adresse restaurée :", wallet.address);

// Si le seed est correct, tu obtiens toujours le même compte.`,
      ],
      slides: [
        ["Qu'est-ce qu'un Wallet ?", "Un wallet contient les clés nécessaires pour signer\n\n• Adresse publique : recevoir et identifier\n• Seed : secret principal\n• Clé privée : signe les transactions\n• Signature : preuve d'autorisation"],
        ["Algorithmes de signature", "Xahau supporte différents algorithmes selon le type de seed\n\nPendant le cours, nous utiliserons surtout secp256k1 pour garder les exemples simples."],
        ["Activation du compte", "Une adresse générée n'est pas encore active\n\nElle doit recevoir assez de XAH pour satisfaire la réserve de base avant d'exister dans le ledger."],
      ],
    },
    m3l2: {
      title: "Activer ton wallet sur testnet",
      theory: `Créer une paire de clés ne suffit pas pour avoir un compte actif sur le ledger. Le compte apparaît lorsqu'il reçoit assez de XAH pour payer la réserve de base.

Sur testnet, on utilise un **faucet** pour recevoir des XAH de test. Ces fonds n'ont pas de valeur réelle, mais ils permettent d'envoyer des transactions et de tester les scripts.

Après le faucet, vérifie le compte avec \`account_info\`. Si le compte est actif, la réponse contient son solde, sa séquence et ses flags.`,
      codeTitles: [
        "Créer et activer un wallet sur testnet avec le faucet",
        "Vérifier le solde d'un compte existant",
      ],
      code: [
`// Créer un wallet et demander des fonds testnet au faucet
const { Client, Wallet } = require("xahau");

async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.generate();
  console.log("Nouveau compte :", wallet.address);
  console.log("Seed à garder secret :", wallet.seed);

  // Selon l'environnement, le faucet peut être appelé via une URL officielle
  // ou via un outil fourni par le SDK/documentation.
  console.log("Utilise le faucet testnet pour financer cette adresse.");

  await client.disconnect();
}

main().catch(console.error);`,
`// Vérifier le solde d'un compte avec account_info
const { Client, dropsToXah } = require("xahau");

async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const account = "rYourTestnetAddressHere";

  const response = await client.request({
    command: "account_info",
    account,
    ledger_index: "validated",
  });

  const balanceDrops = response.result.account_data.Balance;
  console.log("Solde XAH :", dropsToXah(balanceDrops));

  await client.disconnect();
}

main().catch(console.error);`,
      ],
      slides: [
        ["Xahau Testnet", "Réseau de test pour apprendre sans fonds réels\n\n• XAH de test\n• Même logique de transactions\n• Idéal pour scripts et exercices\n• Aucun risque financier réel"],
        ["Flux d'activation", "1. Générer un wallet\n2. Copier l'adresse\n3. Demander des XAH au faucet\n4. Attendre la transaction\n5. Vérifier avec account_info"],
        ["Vérifier avec account_info", "account_info confirme que le compte existe\n\nTu peux lire :\n• Balance\n• Sequence\n• Flags\n• OwnerCount\n\nC'est une des commandes les plus utiles."],
      ],
    },
    m3l2b: {
      title: "Vérifier ton compte dans les explorateurs de blocs",
      theory: `Une fois ton compte activé sur la testnet (ou sur mainnet), tu peux vérifier son état à l'aide des **block explorers** (explorateurs de blocs) : des applications web qui permettent de consulter n'importe quel compte, transaction ou ledger de façon visuelle et sans écrire de code.

### Qu'est-ce qu'un block explorer ?

Un **block explorer** est un outil web qui se connecte aux nœuds de Xahau et présente les informations de la blockchain sous une forme lisible. C'est un peu comme un « moteur de recherche » pour la blockchain.

Avec un explorer tu peux :
- Voir le **solde** et les **tokens** de n'importe quel compte
- Consulter l'**historique complet des transactions**
- Inspecter les **détails** de n'importe quelle transaction (hash, champs, résultat)
- Voir les **objets du ledger** associés à un compte (trust lines, offers, hooks)
- Vérifier si une transaction a été traitée avec succès

### Explorateurs de Xahau Mainnet

**Xahau Explorer** — [xahauexplorer.com](https://xahauexplorer.com)
**XRPLWin Xahau** — [xahau.xrplwin.com](https://xahau.xrplwin.com)
**Xahau Network Explorer** — [explorer.xahau.network](https://explorer.xahau.network)
**XahScan** — [xahscan.com](https://xahscan.com)

### Explorateurs de Xahau Testnet

Pour consulter les comptes de la **testnet** (celle que nous utilisons dans ce cours), utilise ces explorateurs :

- [test.xahauexplorer.com](https://test.xahauexplorer.com)
- [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
- [explorer.xahau-test.net](https://explorer.xahau-test.net)

### Comment vérifier ton compte

1. Ouvre l'un des explorateurs de testnet
2. Dans la barre de recherche, colle ton **adresse** (elle commence par \`r\`)
3. Appuie sur Entrée ou clique sur rechercher
4. Tu verras les informations de ton compte :
   - **Solde** en XAH
   - **Tokens** que tu détiens (trust lines)
   - **Transactions** récentes
   - **Flags** et configuration du compte
   - **Objets** du ledger associés

### Vérifier une transaction

Chaque transaction possède un **hash** unique (une longue chaîne hexadécimale). Tu peux rechercher ce hash dans l'explorateur pour voir :
- Le **type** de transaction (Payment, TrustSet, AccountSet, etc.)
- Le compte **source** et **destination**
- Le **montant** envoyé
- Le **résultat** (tesSUCCESS, tecPATH_DRY, etc.)
- Les **frais** payés
- Le **ledger** dans lequel elle a été incluse
- Les **changements** dans l'état du ledger (AffectedNodes)

### Pourquoi utiliser les explorateurs ?

- **Vérification visuelle** : confirmer qu'une transaction a été traitée avec succès sans écrire de code
- **Débogage** : quand quelque chose échoue, l'explorateur affiche tous les détails de l'erreur
- **Transparence** : n'importe qui peut vérifier n'importe quelle opération sur la blockchain
- **Apprentissage** : voir de vraies transactions t'aide à comprendre le fonctionnement interne du réseau`,
      slides: [
        ["Qu'est-ce qu'un explorateur de blocs ?", "Une interface web pour lire le ledger\n\n• Comptes\n• Transactions\n• Ledgers\n• Soldes\n• Objets associés"],
        ["Explorateurs Xahau", "Utilise un explorateur compatible Xahau et sélectionne le bon réseau\n\nTestnet pour les exercices\nMainnet pour les comptes réels"],
        ["Comment vérifier ton compte", "1. Copie ton adresse publique\n2. Ouvre l'explorateur\n3. Colle l'adresse\n4. Vérifie solde et transactions\n5. Compare avec account_info"],
      ],
    },
    m3l3: {
      title: "Sécurité du wallet et bonnes pratiques",
      theory: `La sécurité de ton wallet est la chose la plus importante lorsque tu travailles avec la blockchain. Un wallet compromis signifie la **perte totale et irréversible** de tes fonds. Dans cette leçon, tu apprendras les meilleures pratiques pour protéger ton compte.

### Ne partage jamais ton seed / ta clé secrète

Ton seed (clé privée) est le **seul moyen de contrôler ton compte**. Quiconque possède ton seed peut signer n'importe quelle transaction en ton nom : envoyer tous tes fonds, modifier des configurations, etc. Il n'y a aucun moyen d'annuler cela.

Règles fondamentales :
- Ne **jamais** envoyer ton seed par chat, e-mail ou tout autre moyen numérique
- Ne **jamais** le saisir sur des sites web ou applications qui ne sont pas absolument fiables
- Ne **jamais** le stocker en texte brut sur ton ordinateur
- Ne **jamais** faire de capture d'écran ou de photo de ton seed

### Hot Wallet vs Cold Wallet

**Hot Wallet** :
- Connecté en permanence à internet
- Pratique pour les transactions fréquentes
- Risque plus élevé d'être compromis
- Exemple : wallet dans une application web, bot de trading

**Cold Wallet** :
- Déconnecté d'internet
- Sécurité maximale pour le stockage à long terme
- Moins pratique pour un usage quotidien
- Exemple : wallet généré hors ligne, hardware wallet, paper wallet

### Bonnes pratiques pour stocker les seeds

1. **Hors ligne** : génère et stocke les seeds sur un appareil qui ne se connecte jamais à internet
2. **Hardware wallet** : appareils spécialisés (Ledger, Trezor) qui stockent les clés en toute sécurité
3. **Paper wallet** : écris le seed sur papier et conserve-le dans un endroit sûr (coffre-fort, coffre bancaire)
4. **Copies multiples** : conserve des copies dans différents lieux physiques en cas d'incendie, d'inondation, etc.
5. **Metal backup** : grave ton seed sur une plaque métallique résistante au feu et à l'eau

### Les seeds de testnet : l'exception

Les seeds de **testnet** peuvent être partagées sans risque dans un contexte pédagogique car :
- Les tokens de testnet **n'ont aucune valeur réelle**
- La testnet peut être réinitialisée à tout moment
- Elles sont utiles pour déboguer des problèmes avec d'autres développeurs

Malgré tout, il est recommandé de les traiter avec précaution afin de prendre de bonnes habitudes.

### Arnaques courantes et comment les éviter

**Phishing** :
- Faux sites web qui imitent des interfaces légitimes
- Ils te demandent de saisir ton seed pour « vérifier » ton compte
- Vérifie toujours l'URL et ne clique pas sur des liens suspects

**Fausses dApps** :
- Applications qui promettent des rendements irréalistes
- Elles demandent des permissions excessives ou ton seed directement
- Vérifie toujours le code source et la réputation du projet

**Ingénierie sociale** :
- Des personnes se faisant passer pour le support technique
- Elles proposent de l'« aide » en échange de ton seed
- Aucun support légitime ne te demandera jamais ta clé privée

**Faux airdrops** :
- Des tokens apparaissent dans ton wallet sans que tu les aies demandés
- En essayant d'interagir avec eux, tu es redirigé vers des sites malveillants
- Ignore les tokens inconnus que tu ne t'attendais pas à recevoir

### Regular Keys : changer la clé de signature

Xahau propose une fonctionnalité avancée appelée **Regular Key** : tu peux assigner une **paire de clés alternative** ayant la permission de signer des transactions au nom de ton compte.

Avantages :
- Si la regular key est compromise, tu peux la remplacer par une nouvelle sans changer ton adresse
- Tu peux désactiver la master key et n'utiliser que la regular key pour les opérations quotidiennes
- L'adresse de ton compte reste identique

### Master Key Disable : sécurité avancée

Pour une sécurité maximale, tu peux **désactiver ta master key** (master key disable) :
1. D'abord, tu configures une regular key
2. Ensuite, tu désactives la master key à l'aide d'un flag de compte
3. Désormais, seule la regular key peut signer des transactions
4. Si la regular key est compromise, tu peux réactiver la master key pour reprendre le contrôle

Cela ajoute une couche de protection supplémentaire : même si quelqu'un obtient ton master seed, il ne pourra pas l'utiliser tant qu'elle est désactivée.

### Multi-signing : signatures multiples

Pour les comptes à forte valeur ou de gouvernance, Xahau prend en charge le **multi-signing** :

- Une liste de signataires autorisés est configurée avec un **quorum** (poids minimum requis)
- Chaque signataire a un poids assigné
- Une transaction n'est valide que si elle reçoit suffisamment de signatures pour atteindre le quorum
- Exemple : 3 signataires avec un poids de 1 chacun, quorum de 2 → il faut au moins 2 signatures sur 3

Le multi-signing est idéal pour :
- Les trésoreries d'organisations
- Les comptes partagés entre partenaires
- Toute situation où une seule personne ne devrait pas avoir le contrôle total`,
      slides: [
        ["La règle d'or", "Seed secret = contrôle total du compte\n\nNe le partage jamais\nNe le publie jamais\nNe le colle jamais dans un site inconnu"],
        ["Hot Wallet vs Cold Wallet", "Hot wallet : pratique, connecté, plus exposé\n\nCold wallet : moins pratique, mieux isolé\n\nUtilise le bon niveau selon le risque."],
        ["Arnaques courantes", "• Faux faucets\n• Faux supports techniques\n• Sites qui demandent le seed\n• QR trompeurs\n• Transactions signées sans lecture\n\nLis toujours ce que tu signes."],
        ["Sécurité avancée dans Xahau", "Xahau permet de configurer certains comportements du compte avec AccountSet et d'autres mécanismes\n\nMais aucune option ne protège un seed déjà volé."],
      ],
    },
    m3l4: {
      title: "Configurer ton compte avec AccountSet",
      theory: `Dans Xahau, ton compte dispose de plusieurs options de configuration que tu peux activer ou désactiver à l'aide de la transaction **AccountSet**. Ces paramètres contrôlent le comportement de ton compte face aux paiements entrants, aux trust lines, et bien plus.

### La transaction AccountSet

\`AccountSet\` est le type de transaction qui te permet de modifier les propriétés de ton compte. Elle n'envoie ni ne reçoit de fonds ; elle change simplement les **flags** et les autres champs de configuration de ton compte.

### Flags importants

**asfRequireDest (RequireDestTag)**
- Exige que tous les paiements entrants incluent un **Destination Tag**
- Utile pour les exchanges et services qui utilisent un tag pour identifier l'utilisateur
- Sans ce flag, quelqu'un pourrait t'envoyer du XAH sans tag et il serait impossible de savoir de qui il provient
- Flag ID : \`1\`

**asfDisallowXRP (DisallowXAH)**
- Signale que ton compte **ne souhaite pas recevoir de XAH directement**
- Ce n'est qu'un signal ; techniquement, les paiements peuvent quand même arriver
- Utile pour les comptes qui ne travaillent qu'avec des tokens émis (IOU)
- Flag ID : \`3\`

**asfDefaultRipple**
- Pertinent pour les **émetteurs de tokens** (nous l'aborderons en détail dans le module tokens)
- Permet aux tokens émis par ton compte de circuler entre des tiers (rippling)
- Sans ce flag, les tokens ne peuvent bouger que directement vers/depuis l'émetteur
- Flag ID : \`8\`

**asfRequireAuth**
- Exige que ton compte **autorise** chaque trust line avant que quelqu'un puisse détenir tes tokens
- Utile pour les tokens réglementés où tu dois contrôler qui peut les détenir
- Flag ID : \`2\`

### Autres champs configurables

**Domain** : Tu peux associer un domaine web à ton compte. Il est stocké sous forme de valeur hexadécimale du domaine. Cela permet de vérifier que le compte appartient bien au propriétaire de ce domaine.

**EmailHash** : Hash MD5 de ton e-mail, utilisé pour afficher un avatar (comme Gravatar). Il n'expose pas directement ton e-mail.

### Les flags comme des bits

Les flags de compte sont stockés dans un champ numérique où chaque bit représente un flag. Tu peux activer des flags avec le champ \`SetFlag\` et les désactiver avec \`ClearFlag\` dans la transaction AccountSet.

| Flag | ID | Objectif |
|------|----|----------|
| asfRequireDest | 1 | Exiger un Destination Tag |
| asfRequireAuth | 2 | Exiger l'autorisation des trust lines |
| asfDisallowXRP | 3 | Signaler que le XAH n'est pas souhaité |
| asfDisableMaster | 4 | Désactiver la master key |
| asfDefaultRipple | 8 | Autoriser le rippling des tokens émis |`,
      codeTitles: [
        "Activer le flag RequireDestTag sur ton compte",
        "Lire et interpréter les flags d'un compte",
      ],
      code: [
`const { Client, Wallet } = require("xahau");

async function setRequireDestTag() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Utilise ton wallet testnet (remplace par ton seed)
  const wallet = Wallet.fromSeed("sEdVHBhkL2next8NH9cMPyPJoXXXXXX", {algorithm: 'secp256k1'});

  // AccountSet avec SetFlag pour activer RequireDestTag
  const tx = {
    TransactionType: "AccountSet",
    Account: wallet.address,
    // asfRequireDest = 1
    SetFlag: 1,
  };
  console.log("Compte : ",wallet.address);
  console.log("Envoi de la transaction AccountSet...");
  console.log("  Activation du flag : RequireDestTag (asfRequireDest = 1)");

  const result = await client.submitAndWait(tx, { wallet });

  console.log("Résultat :", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Flag RequireDestTag activé avec succès !");
    console.log("Désormais, tous les paiements entrants doivent inclure un DestinationTag.");

    // Vérifier que le flag a bien été activé
    const accountInfo = await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated",
    });

    const flags = accountInfo.result.account_data.Flags;
    console.log("Flags du compte (nombre) :", flags);

    // lsfRequireDestTag = 0x00020000 = 131072
    const requireDestTag = (flags & 0x00020000) !== 0;
    console.log("RequireDestTag actif :", requireDestTag);
  }

  await client.disconnect();
}

setRequireDestTag();`,
`const { Client } = require("xahau");

async function readAccountFlags(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  try {
    const response = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });

    const account = response.result.account_data;
    const flags = account.Flags;

    console.log("=== Informations du compte ===");
    console.log("Adresse :", account.Account);
    console.log("Solde :", Number(account.Balance) / 1_000_000, "XAH");
    console.log("Flags (valeur numérique) :", flags);
    console.log("");

    // Interpréter chaque flag individuellement
    // Les flags du ledger (lsf) ont des valeurs différentes de celles d'AccountSet (asf)
    const flagDefinitions = [
      { name: "lsfRequireDestTag", mask: 0x00020000, desc: "Exige un Destination Tag" },
      { name: "lsfRequireAuth", mask: 0x00040000, desc: "Exige l'autorisation des trust lines" },
      { name: "lsfDisallowXRP", mask: 0x00080000, desc: "Ne souhaite pas recevoir de XAH" },
      { name: "lsfDisableMaster", mask: 0x00100000, desc: "Master key désactivée" },
      { name: "lsfDefaultRipple", mask: 0x00800000, desc: "Rippling par défaut activé" },
    ];

    console.log("=== Flags actifs ===");
    let anyActive = false;
    for (const flag of flagDefinitions) {
      const active = (flags & flag.mask) !== 0;
      if (active) {
        console.log(\` \${flag.name}: \${flag.desc}\`);
        anyActive = true;
      }
    }

    if (!anyActive) {
      console.log("  Aucun flag spécial actif (configuration par défaut)");
    }

    console.log("");
    console.log("=== Autres champs ===");
    console.log("Domain :", account.Domain
      ? Buffer.from(account.Domain, "hex").toString("utf-8")
      : "(non configuré)");
    console.log("EmailHash :", account.EmailHash || "(non configuré)");
    console.log("RegularKey :", account.RegularKey || "(non configuré)");
    console.log("Sequence :", account.Sequence);
    console.log("OwnerCount :", account.OwnerCount);

  } catch (error) {
    if (error.data?.error === "actNotFound") {
      console.log("Le compte n'existe pas sur le ledger.");
    } else {
      console.error("Erreur :", error.message);
    }
  }

  await client.disconnect();
}

// Remplace par une adresse testnet
readAccountFlags("rYourXahauAddressHere");`,
      ],
      slides: [
        ["AccountSet : configurer ton compte", "AccountSet modifie les paramètres d'un compte\n\n• Activer des flags\n• Désactiver certains flags\n• Ajuster des options de compte\n• Signé par le propriétaire"],
        ["Les flags comme bits", "Les flags sont stockés dans un nombre\n\nChaque bit représente une option\n\nPour interpréter le résultat, compare avec les constantes du protocole."],
      ],
    },
    m3l5: {
      title: "Importer ton compte dans Xaman",
      theory: `**Xaman** (anciennement XUMM) est le wallet mobile le plus utilisé de l'écosystème XRPL et Xahau. Jusqu'à présent, nous avons travaillé avec des wallets depuis du code JavaScript, mais pour gérer ton compte visuellement, signer des transactions depuis ton téléphone et interagir avec des applications décentralisées, tu dois importer ton compte dans Xaman.

### Qu'est-ce que Xaman ?

Xaman est une application mobile disponible pour **iOS** et **Android** qui fonctionne comme :
- **Wallet** : Stocke tes clés en toute sécurité sur ton appareil
- **Signataire de transactions** : Tu peux approuver des transactions en scannant un QR ou depuis une xApp
- **Gestionnaire de comptes** : Tu peux gérer plusieurs comptes Xahau et XRPL
- **Passerelle vers les xApps** : Applications décentralisées intégrées à Xaman

Téléchargement : [xaman.app](https://xaman.app)

### Installer Xaman

1. Ouvre l'**App Store** (iOS) ou **Google Play** (Android)
2. Recherche **"Xaman"** (anciennement appelée XUMM)
3. Télécharge et installe l'application
4. Ouvre Xaman et suis la configuration initiale :
   - Configure un **code PIN** ou la **biométrie** (empreinte/Face ID)
   - Accepte les conditions d'utilisation

### Importer ton compte testnet

Une fois Xaman installé, tu peux importer le compte que tu as généré par code en utilisant ton **family seed** (la chaîne qui commence par \`s\`) :

1. Ouvre Xaman
2. Appuie sur le bouton **"Ajouter un compte"** (ou l'icône \`+\` en haut)
3. Sélectionne **"Importer un compte existant"**
4. Sélectionne **"Family Seed (s...)"** comme méthode d'importation
5. Saisis ton seed (la chaîne commençant par \`s\` obtenue lors de la génération du wallet)
6. Sélectionne le niveau d'accès :
   - **Accès complet** : Tu peux signer des transactions (nécessite le seed)
   - **Lecture seule** : Tu peux uniquement voir le solde et les transactions (nécessite seulement l'adresse)
7. Confirme avec ton PIN ou ta biométrie
8. Ton compte apparaîtra dans la liste des comptes de Xaman

### Ajouter le réseau Xahau Testnet dans Xaman

Par défaut, Xaman se connecte au **XRPL Mainnet**. Pour travailler avec **Xahau Testnet**, tu dois ajouter le réseau :

1. Dans Xaman, va dans **Paramètres** (icône d'engrenage)
2. Cherche la section **"Advanced"**
3. Cherche la section **"Debug"**
4. Active le **Developer Mode**
5. Sélectionne **Xahau Testnet** comme réseau actif dans le menu principal en appuyant en haut à droite.
6. Ton compte affichera maintenant le solde XAH sur testnet

### Vérifier l'importation

Après l'importation, vérifie que tout est correct :
- L'**adresse** affichée dans Xaman doit correspondre à celle générée par code
- Tu peux envoyer une petite transaction de test pour confirmer que la signature fonctionne

### Signer des transactions avec Xaman

Xaman peut signer des transactions de deux façons :

**Depuis l'application elle-même** :
- Tu peux envoyer des paiements directement depuis Xaman
- Appuie sur **"Envoyer"**, saisis l'adresse de destination et le montant
- Confirme avec ton PIN ou ta biométrie

**Depuis une xApp ou un site web (QR)** :
- Certaines applications affichent un code QR
- Tu scannes le QR avec Xaman
- Xaman t'affiche les détails de la transaction
- Tu approuves ou rejettes en signant avec ton PIN

### Sécurité dans Xaman

- Ton seed **ne quitte jamais ton appareil**. Xaman stocke les clés sous forme chiffrée dans le stockage sécurisé du système d'exploitation (Keychain sur iOS, Keystore sur Android)
- Les transactions sont **signées localement** sur ton appareil
- Xaman **n'envoie jamais** ta clé privée à un serveur
- Si tu perds ton appareil, tu peux restaurer ton compte sur un autre appareil en utilisant ton seed
- **Conserve toujours une copie de ton seed en dehors de l'appareil** (papier, sauvegarde métal)
- Xaman ne permet pas d'exporter ton seed depuis l'application pour des raisons de sécurité, alors assure-toi de l'avoir sauvegardé avant d'importer

### Importer en lecture seule

Si tu souhaites uniquement **surveiller** un compte sans pouvoir signer de transactions :

1. Dans Xaman, appuie sur **"Ajouter un compte"**
2. Sélectionne **"Importer un compte existant"**
3. Sélectionne **"Adresse du compte (r...)"**
4. Saisis l'adresse \`r...\` (pas le seed)
5. Le compte est ajouté en mode lecture seule

C'est utile pour :
- Surveiller d'autres comptes (exchanges, contrats)
- Surveiller ton compte mainnet sans exposer le seed sur ton téléphone
- Vérifier rapidement les soldes`,
      codeTitles: ["Générer un wallet et préparer les données pour l'importer dans Xaman"],
      code: [
`const { Client, Wallet } = require("xahau");

async function prepareForXaman() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Générer et financer un wallet
  const wallet = Wallet.generate();
  console.log("Génération du wallet testnet...");
  await client.fundWallet(wallet);

  // Vérifier le solde
  const response = await client.request({
    command: "account_info",
    account: wallet.address,
    ledger_index: "validated",
  });

  const balance = Number(response.result.account_data.Balance) / 1_000_000;

  console.log("=== Données à importer dans Xaman ===");
  console.log("Adresse :", wallet.address);
  console.log("Seed :", wallet.seed);
  console.log("Solde :", balance, "XAH");
  console.log("=== Instructions ===");
  console.log("1. Ouvre Xaman sur ton téléphone");
  console.log("2. Appuie sur 'Ajouter un compte' → 'Importer un compte existant'");
  console.log("4. Sélectionne Accès Complet");
  console.log("5. Sélectionne 'Family Seed (s...)'");
  console.log("6. Saisis le seed :", wallet.seed);
  console.log("  Rappel : nous sommes sur TESTNET.");
  console.log("    Assure-toi de sélectionner le réseau Xahau Testnet dans Xaman.");

  await client.disconnect();
}

prepareForXaman();`,
      ],
      slides: [
        ["Qu'est-ce que Xaman ?", "Un wallet pour XRPL/Xahau\n\n• Gère les comptes\n• Signe les transactions\n• Affiche les demandes de signature\n• Ne donne pas ton seed aux applications"],
        ["Importer ton compte", "1. Ouvre Xaman\n2. Choisis importer un compte\n3. Saisis le seed testnet\n4. Vérifie l'adresse\n5. Utilise-le pour signer les exercices"],
        ["Sécurité dans Xaman", "Télécharge uniquement l'application officielle\n\nVérifie chaque demande de signature\n\nUn wallet protège tes clés, mais tu dois toujours lire ce que tu approuves."],
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
