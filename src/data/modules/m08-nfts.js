const moduleData = {
  id: "m7",
  icon: "🎨",
  title: {
    es: "Creación y uso de NFTs",
    pt: "Creación e uso de NFTs",
    en: "Creating and Using NFTs",
    jp: "NFTの作成と使用",
    ko: "NFT 생성 및 사용",
    zh: "NFT 的创建与使用",
  },
  lessons: [
    {
      id: "m7l1",
      title: {
        es: "URITokens: NFTs nativos en Xahau",
        pt: "URITokens: NFTs nativos na Xahau",
        en: "URITokens: Native NFTs on Xahau",
        jp: "URITokens：XahauのネイティブNFT",
        ko: "URITokens: Xahau의 네이티브 NFT",
        zh: "URITokens：Xahau 的原生 NFT",
      },
      theory: {
        es: `En Xahau, los NFTs se implementan como **URITokens**, objetos nativos del ledger que representan tokens no fungibles con una URI asociada.

### ¿Qué es un URIToken?

Un URIToken es un objeto **único** en el ledger que contiene:
- **ID**: Identificador único del token (LedgerIndex)
- **URI**: Un enlace a los metadatos o contenido del NFT (imagen, JSON, etc.)
- **Digest**: Hash opcional del contenido al que apunta la URI (para verificar integridad)
- **Owner**: La cuenta propietaria actual
- **Issuer**: La cuenta que lo creó originalmente

### URIToken vs ERC-721

| Característica | ERC-721 (Ethereum) | URIToken (Xahau) |
|---|---|---|
| Crear colección | Desplegar contrato Solidity | No necesario |
| Mintear NFT | Función del contrato | Transacción \`URITokenMint\` |
| Transferir | Función del contrato | Transacción \`URITokenBuy\` |
| Metadata | tokenURI en contrato | URI nativa en el objeto |
| Coste | Gas costoso | Fee mínimo (~12 drops) |
| Verificación | Depende del contrato | Digest nativo en el ledger |

### Transacciones relacionadas con URITokens

- **URITokenMint**: Crear un nuevo URIToken
- **URITokenBurn**: Destruir un URIToken
- **URITokenCreateSellOffer**: Poner un URIToken a la venta
- **URITokenCancelSellOffer**: Cancelar la oferta de venta
- **URITokenBuy**: Comprar un URIToken que está a la venta

### Flags de URITokenMint

- **tfBurnable (1)**: Permite que el emisor pueda quemar el token aunque ya no sea el propietario`,
        pt: `Em Xahau, os NFTs são implementados como **URITokens**, objetos nativos do ledger que representam tokens não fungíveis com uma URI associada.
### OU que é um URIToken?
Um URIToken é um objeto **único** no ledger que contém:
- **ID**: Identificador único do token (LedgerIndex)
- **URI**: Um link a os metadados ou conteúdo do NFT (imagen, JSON, etc.)
- **Digest**: Hash opcional do conteúdo ao qual aponta a URI (para verificar integridade)
- **Owner**: A conta proprietária atual
- **Issuer**: A conta que lo criou originalmente
### URIToken vs ERC-721
| Característica | ERC-721 (Ethereum) | URIToken (Xahau) |
|---|---|---|
| Criar colección | Fazer deploy de contrato Solidity | Não necessário |
| Mintear NFT | Função do contrato | Transação \`URITokenMint\` |
| Transferir | Função do contrato | Transação \`URITokenBuy\` |
| Metadata | tokenURI em contrato | URI nativa no objeto |
| Custo | Gas costoso | Fee mínimo (~12 drops) |
| Verificação | Depende do contrato | Digest nativo no ledger |
### Transações relacionadas com URITokens
- **URITokenMint**: Criar um novo URIToken
- **URITokenBurn**: Destruir um URIToken
- **URITokenCreateSellOffer**: Colocar um URIToken à venda
- **URITokenCancelSellOffer**: Cancelar a oferta de venda
- **URITokenBuy**: Comprar um URIToken que está à venda
### Flags de URITokenMint
- **tfBurnable (1)**: Permite que o emissor possa queimar o token mesmo que já não seja o proprietário`,
        en: `On Xahau, NFTs are implemented as **URITokens**, native ledger objects that represent non-fungible tokens with an associated URI.

### What Is a URIToken?

A URIToken is a **unique** object on the ledger that contains:
- **ID**: Unique token identifier (LedgerIndex)
- **URI**: A link to the NFT's metadata or content (image, JSON, etc.)
- **Digest**: Optional hash of the content the URI points to (for integrity verification)
- **Owner**: The current owner account
- **Issuer**: The account that originally created it

### URIToken vs ERC-721

| Feature | ERC-721 (Ethereum) | URIToken (Xahau) |
|---|---|---|
| Create collection | Deploy Solidity contract | Not required |
| Mint NFT | Contract function | \`URITokenMint\` transaction |
| Transfer | Contract function | \`URITokenBuy\` transaction |
| Metadata | tokenURI in contract | Native URI on the object |
| Cost | Expensive gas | Minimal fee (~12 drops) |
| Verification | Depends on contract | Native Digest on the ledger |

### URIToken-Related Transactions

- **URITokenMint**: Create a new URIToken
- **URITokenBurn**: Destroy a URIToken
- **URITokenCreateSellOffer**: List a URIToken for sale
- **URITokenCancelSellOffer**: Cancel a sell offer
- **URITokenBuy**: Buy a URIToken that is listed for sale

### URITokenMint Flags

- **tfBurnable (1)**: Allows the issuer to burn the token even if they are no longer the owner`,
        jp: `XahauではNFTは**URIToken**として実装されています。これはレジャーのネイティブオブジェクトで、URIが関連付けられた非代替性トークンを表します。

### URITokenとは？

URITokenはレジャー上の**ユニークな**オブジェクトで、次のフィールドが含まれます。
- **ID**: トークンの一意識別子（LedgerIndex）
- **URI**: NFTのメタデータまたはコンテンツ（画像、JSONなど）へのリンク
- **Digest**: URIが指すコンテンツのオプションのハッシュ（整合性検証用）
- **Owner**: 現在の所有者アカウント
- **Issuer**: 最初に作成したアカウント

### URIToken vs ERC-721

| 特徴 | ERC-721 (Ethereum) | URIToken (Xahau) |
|---|---|---|
| コレクション作成 | Solidityコントラクトのデプロイ | 不要 |
| NFTのミント | コントラクト関数 | \`URITokenMint\`トランザクション |
| 転送 | コントラクト関数 | \`URITokenBuy\`トランザクション |
| メタデータ | コントラクト内のtokenURI | オブジェクト上のネイティブURI |
| コスト | 高価なガス代 | 最小限のFee（〜12 drops） |
| 検証 | コントラクトに依存 | レジャー上のネイティブDigest |

### URIToken関連のトランザクション

- **URITokenMint**: 新しいURITokenを作成する
- **URITokenBurn**: URITokenを破棄する
- **URITokenCreateSellOffer**: URITokenを売りに出す
- **URITokenCancelSellOffer**: 売りオファーをキャンセルする
- **URITokenBuy**: 売りに出ているURITokenを購入する

### URITokenMintのフラグ

- **tfBurnable (1)**: 発行者以外が保有している場合でも発行者によってトークンをバーンできるようにする`,
        ko: `Xahau에서 NFT는 **URIToken**으로 구현됩니다. 이는 연관된 URI를 가진 대체 불가능한 토큰을 나타내는 레저의 네이티브 객체입니다.

### URIToken이란?

URIToken은 레저 상의 **고유한** 객체로 다음 필드를 포함합니다:
- **ID**: 토큰의 고유 식별자 (LedgerIndex)
- **URI**: NFT의 메타데이터 또는 콘텐츠(이미지, JSON 등)에 대한 링크
- **Digest**: URI가 가리키는 콘텐츠의 선택적 해시 (무결성 검증용)
- **Owner**: 현재 소유자 계정
- **Issuer**: 최초 생성한 계정

### URIToken vs ERC-721

| 특성 | ERC-721 (Ethereum) | URIToken (Xahau) |
|---|---|---|
| 컬렉션 생성 | Solidity 컨트랙트 배포 | 불필요 |
| NFT 민팅 | 컨트랙트 함수 | \`URITokenMint\` 트랜잭션 |
| 전송 | 컨트랙트 함수 | \`URITokenBuy\` 트랜잭션 |
| 메타데이터 | 컨트랙트의 tokenURI | 객체의 네이티브 URI |
| 비용 | 비싼 가스비 | 최소 수수료 (~12 drops) |
| 검증 | 컨트랙트에 의존 | 레저의 네이티브 Digest |

### URIToken 관련 트랜잭션

- **URITokenMint**: 새 URIToken 생성
- **URITokenBurn**: URIToken 소각
- **URITokenCreateSellOffer**: URIToken 판매 등록
- **URITokenCancelSellOffer**: 판매 오퍼 취소
- **URITokenBuy**: 판매 중인 URIToken 구매

### URITokenMint 플래그

- **tfBurnable (1)**: 발행자가 더 이상 소유자가 아니더라도 토큰을 소각할 수 있도록 허용`,
        zh: `在 Xahau 中，NFT 通过 **URIToken** 实现，它是账本中的原生对象，用来表示带有关联 URI 的非同质化代币。

### 什么是 URIToken？

URIToken 是账本中的一个**唯一**对象，包含：
- **ID**：代币唯一标识符（LedgerIndex）
- **URI**：指向 NFT 元数据或内容的链接（图片、JSON 等）
- **Digest**：URI 指向内容的可选哈希（用于完整性校验）
- **Owner**：当前持有者账户
- **Issuer**：最初创建它的账户

### URIToken vs ERC-721

| 特性 | ERC-721 (Ethereum) | URIToken (Xahau) |
|---|---|---|
| 创建集合 | 部署 Solidity 合约 | 不需要 |
| Mint NFT | 合约函数 | \`URITokenMint\` 交易 |
| 转移 | 合约函数 | \`URITokenBuy\` 交易 |
| 元数据 | 合约中的 tokenURI | 对象中的原生 URI |
| 成本 | Gas 昂贵 | 最低手续费（约 12 drops） |
| 验证 | 依赖合约 | 账本中的原生 Digest |

### 与 URIToken 相关的交易

- **URITokenMint**：创建新的 URIToken
- **URITokenBurn**：销毁 URIToken
- **URITokenCreateSellOffer**：将 URIToken 挂牌出售
- **URITokenCancelSellOffer**：取消卖单
- **URITokenBuy**：购买正在出售的 URIToken

### URITokenMint 的标志

- **tfBurnable (1)**：即使发行方已经不是持有者，仍允许其销毁该代币`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear (mintear) un URIToken",
            pt: "Criar (mintar) um URIToken",
            en: "Create (Mint) a URIToken",
            jp: "URITokenを作成（ミント）する",
            ko: "URIToken 생성 (민팅)",
            zh: "创建（Mint）一个 URIToken",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function mintURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const creator = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Crear un URIToken con una URI que apunta a los metadatos
  const mint = {
    TransactionType: "URITokenMint",
    Account: creator.address,
    // URI de ejemplo (puede ser IPFS, HTTPS, etc.) - Ejemplo: ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json
    URI: toHex("https://ejemplo.com/nft/metadata.json"),
    Flags: 1, // tfBurnable: el emisor puede quemar el token
  };

  const prepared = await client.autofill(mint);
  const signed = creator.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken creado con éxito!");
    console.log("Hash tx:", signed.hash);

    // Buscar el URIToken creado en los nodos afectados
    const created = result.result.meta.AffectedNodes.find(
      (n) => n.CreatedNode?.LedgerEntryType === "URIToken"
    );
    if (created) {
      console.log("URIToken ID:", created.CreatedNode.LedgerIndex);
      console.log("Address:", creator.address);

    }
  }

  await client.disconnect();
}

mintURIToken();`,
            pt: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}
async function mintURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const criator = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // Criar um URIToken com uma URI que apuntà os metadados
  const mint = {
    TransactionType: "URITokenMint",
    Account: criator.address,
    // URI de exemplo (pode ser IPFS, HTTPS, etc.) - Exemplo: ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json
    URI: toHex("https://exemplo.com/nft/metadata.json"),
    Flags: 1, // tfBurnable: o emissor pode queimar o token
  };
  const prepared = await client.autofill(mint);
  const signed = criator.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken criado com éxito!");
    console.log("Hash tx:", signed.hash);
    // Buscar ou URIToken criado nos nós afetados
    const criated = result.result.meta.AffectedNodes.find(
      (n) => n.CreatedNode?.LedgerEntryType === "URIToken"
    );
    if (criated) {
      console.log("URIToken ID:", criated.CreatedNode.LedgerIndex);
      console.log("Address:", criator.address);
    }
  }
  await client.disconnect();
}
mintURIToken();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function mintURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const creator = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Create a URIToken with a URI pointing to the metadata
  const mint = {
    TransactionType: "URITokenMint",
    Account: creator.address,
    // Example URI (can be IPFS, HTTPS, etc.) - Example: ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json
    URI: toHex("https://example.com/nft/metadata.json"),
    Flags: 1, // tfBurnable: the issuer can burn the token
  };

  const prepared = await client.autofill(mint);
  const signed = creator.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken created successfully!");
    console.log("Tx hash:", signed.hash);

    // Find the created URIToken in the affected nodes
    const created = result.result.meta.AffectedNodes.find(
      (n) => n.CreatedNode?.LedgerEntryType === "URIToken"
    );
    if (created) {
      console.log("URIToken ID:", created.CreatedNode.LedgerIndex);
            console.log("Address:", creator.address);
    }
  }

  await client.disconnect();
}

mintURIToken();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function mintURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const creator = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // メタデータを指すURIでURITokenを作成する
  const mint = {
    TransactionType: "URITokenMint",
    Account: creator.address,
    // URIの例（IPFS、HTTPSなど可） - 例：ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json
    URI: toHex("https://example.com/nft/metadata.json"),
    Flags: 1, // tfBurnable：発行者がトークンをバーンできる
  };

  const prepared = await client.autofill(mint);
  const signed = creator.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URITokenを正常に作成しました！");
    console.log("Txハッシュ:", signed.hash);

    // 影響を受けたノードから作成されたURITokenを検索
    const created = result.result.meta.AffectedNodes.find(
      (n) => n.CreatedNode?.LedgerEntryType === "URIToken"
    );
    if (created) {
      console.log("URIToken ID:", created.CreatedNode.LedgerIndex);
      console.log("アドレス:", creator.address);

    }
  }

  await client.disconnect();
}

mintURIToken();`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function mintURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const creator = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 메타데이터를 가리키는 URI로 URIToken 생성
  const mint = {
    TransactionType: "URITokenMint",
    Account: creator.address,
    // URI 예시 (IPFS, HTTPS 등 가능) - 예: ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json
    URI: toHex("https://example.com/nft/metadata.json"),
    Flags: 1, // tfBurnable: 발행자가 토큰을 소각할 수 있음
  };

  const prepared = await client.autofill(mint);
  const signed = creator.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken이 성공적으로 생성되었습니다!");
    console.log("Tx 해시:", signed.hash);

    // 영향받은 노드에서 생성된 URIToken 찾기
    const created = result.result.meta.AffectedNodes.find(
      (n) => n.CreatedNode?.LedgerEntryType === "URIToken"
    );
    if (created) {
      console.log("URIToken ID:", created.CreatedNode.LedgerIndex);
      console.log("주소:", creator.address);

    }
  }

  await client.disconnect();
}

mintURIToken();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

function toHex(str) {
  return Buffer.from(str, "utf8").toString("hex").toUpperCase();
}

async function mintURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const creator = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 使用指向元数据的 URI 创建一个 URIToken
  const mint = {
    TransactionType: "URITokenMint",
    Account: creator.address,
    // URI 示例（可以是 IPFS、HTTPS 等）- 例如：ipfs://bafybeieza5w4rkes55paw7jgpo4kzsbyywhw7ildltk3kjx2ttkmt7texa/106.json
    URI: toHex("https://example.com/nft/metadata.json"),
    Flags: 1, // tfBurnable：发行方可以销毁该代币
  };

  const prepared = await client.autofill(mint);
  const signed = creator.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken 创建成功！");
    console.log("交易哈希:", signed.hash);

    // 在受影响节点中查找创建出的 URIToken
    const created = result.result.meta.AffectedNodes.find(
      (n) => n.CreatedNode?.LedgerEntryType === "URIToken"
    );
    if (created) {
      console.log("URIToken ID:", created.CreatedNode.LedgerIndex);
      console.log("地址:", creator.address);

    }
  }

  await client.disconnect();
}

mintURIToken();`,
          },
        },
        {
          title: {
            es: "Consultar los URITokens de una cuenta",
            pt: "Consultar os URITokens de uma conta",
            en: "Query URITokens for an Account",
            jp: "アカウントのURITokenを照会する",
            ko: "계정의 URIToken 조회",
            zh: "查询账户的 URIToken",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function getURITokens(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "uri_token",
    ledger_index: "validated",
  });

  const tokens = response.result.account_objects;
  console.log(\`=== URITokens de \${address} ===\`);
  console.log(\`Total: \${tokens.length}\\n\`);

  for (const token of tokens) {
    const uri = Buffer.from(token.URI, "hex").toString("utf8");
    console.log(\`URIToken ID: \${token.index}\`);
    console.log(\`  URI: \${uri}\`);
    console.log(\`  Emisor: \${token.Issuer}\`);
    console.log(\`  Owner: \${token.Owner}\`);
    if (token.Digest) {
      console.log(\`  Digest: \${token.Digest}\`);
    }
    if (token.Amount) {
      console.log(\`  En venta por: \${Number(token.Amount) / 1_000_000} XAH\`);
    }
    console.log();
  }

  await client.disconnect();
}
// Reemplaza con la dirección que quieres consultar, por ejemplo r9oB9E7jnRjp88fTrxHzngAietepwCCcqV
getURITokens("rTuDireccionAqui");`,
            pt: `const { Client } = require("xahau");
async function getURITokens(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "uri_token",
    ledger_index: "validated",
  });
  const tokens = response.result.account_objects;
  console.log(\`=== URITokens de \${address} ===\`);
  console.log(\`Total: \${tokens.length}\\n\`);
  for (const token of tokens) {
    const uri = Buffer.from(token.URI, "hex").toString("utf8");
    console.log(\`URIToken ID: \${token.index}\`);
    console.log(\`  URI: \${uri}\`);
    console.log(\`  Emissor: \${token.Issuer}\`);
    console.log(\`  Owner: \${token.Owner}\`);
    if (token.Digest) {
      console.log(\`  Digest: \${token.Digest}\`);
    }
    if (token.Amount) {
      console.log(\`  Em venda por: \${Number(token.Amount) / 1_000_000} XAH\`);
    }
    console.log();
  }
  await client.disconnect();
}
// Substitua com o endereçou que quieres consultar, por exemplo r9oB9E7jnRjp88fTrxHzngAietepwCCcqV
getURITokens("rTuDireccionAqui");`,
            en: `const { Client } = require("xahau");

async function getURITokens(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "uri_token",
    ledger_index: "validated",
  });

  const tokens = response.result.account_objects;
  console.log(\`=== URITokens of \${address} ===\`);
  console.log(\`Total: \${tokens.length}\\n\`);

  for (const token of tokens) {
    const uri = Buffer.from(token.URI, "hex").toString("utf8");
    console.log(\`URIToken ID: \${token.index}\`);
    console.log(\`  URI: \${uri}\`);
    console.log(\`  Issuer: \${token.Issuer}\`);
    console.log(\`  Owner: \${token.Owner}\`);
    if (token.Digest) {
      console.log(\`  Digest: \${token.Digest}\`);
    }
    if (token.Amount) {
      console.log(\`  For sale at: \${Number(token.Amount) / 1_000_000} XAH\`);
    }
    console.log();
  }

  await client.disconnect();
}
// Insert the address you want to query, for example r9oB9E7jnRjp88fTrxHzngAietepwCCcqV
getURITokens("rYourAddressHere");`,
            jp: `const { Client } = require("xahau");

async function getURITokens(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "uri_token",
    ledger_index: "validated",
  });

  const tokens = response.result.account_objects;
  console.log(\`=== \${address} のURIToken ===\`);
  console.log(\`合計: \${tokens.length}\n\`);

  for (const token of tokens) {
    const uri = Buffer.from(token.URI, "hex").toString("utf8");
    console.log(\`URIToken ID: \${token.index}\`);
    console.log(\`  URI: \${uri}\`);
    console.log(\`  発行者: \${token.Issuer}\`);
    console.log(\`  所有者: \${token.Owner}\`);
    if (token.Digest) {
      console.log(\`  Digest: \${token.Digest}\`);
    }
    if (token.Amount) {
      console.log(\`  売り価格: \${Number(token.Amount) / 1_000_000} XAH\`);
    }
    console.log();
  }

  await client.disconnect();
}
// 照会したいアドレスに置き換えてください。例：r9oB9E7jnRjp88fTrxHzngAietepwCCcqV
getURITokens("rYourAddressHere");`,
            ko: `const { Client } = require("xahau");

async function getURITokens(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "uri_token",
    ledger_index: "validated",
  });

  const tokens = response.result.account_objects;
  console.log(\`=== \${address} 의 URIToken ===\`);
  console.log(\`총 개수: \${tokens.length}\\n\`);

  for (const token of tokens) {
    const uri = Buffer.from(token.URI, "hex").toString("utf8");
    console.log(\`URIToken ID: \${token.index}\`);
    console.log(\`  URI: \${uri}\`);
    console.log(\`  발행자: \${token.Issuer}\`);
    console.log(\`  소유자: \${token.Owner}\`);
    if (token.Digest) {
      console.log(\`  Digest: \${token.Digest}\`);
    }
    if (token.Amount) {
      console.log(\`  판매가: \${Number(token.Amount) / 1_000_000} XAH\`);
    }
    console.log();
  }

  await client.disconnect();
}
// 조회할 주소로 교체하세요. 예: r9oB9E7jnRjp88fTrxHzngAietepwCCcqV
getURITokens("rYourAddressHere");`,
            zh: `const { Client } = require("xahau");

async function getURITokens(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "uri_token",
    ledger_index: "validated",
  });

  const tokens = response.result.account_objects;
  console.log(\`=== \${address} 的 URIToken ===\`);
  console.log(\`总数: \${tokens.length}\\n\`);

  for (const token of tokens) {
    const uri = Buffer.from(token.URI, "hex").toString("utf8");
    console.log(\`URIToken ID: \${token.index}\`);
    console.log(\`  URI: \${uri}\`);
    console.log(\`  发行方: \${token.Issuer}\`);
    console.log(\`  持有者: \${token.Owner}\`);
    if (token.Digest) {
      console.log(\`  Digest: \${token.Digest}\`);
    }
    if (token.Amount) {
      console.log(\`  挂牌价格: \${Number(token.Amount) / 1_000_000} XAH\`);
    }
    console.log();
  }

  await client.disconnect();
}
// 替换成你要查询的地址，例如 r9oB9E7jnRjp88fTrxHzngAietepwCCcqV
getURITokens("rYourAddressHere");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "URITokens en Xahau", pt: "URITokens na Xahau", en: "URITokens on Xahau", jp: "XahauのURIToken", ko: "Xahau의 URIToken", zh: "Xahau 上的 URIToken" },
          content: {
            es: "NFTs nativos del ledger de Xahau\n\n• URI → Enlace a metadatos\n• Digest → Hash de verificación\n• Owner → Propietario actual\n• Issuer → Creador original\n\nSin necesidad de smart contracts",
            pt: "NFTs nativos do ledger da Xahau\n\n• URI → Enlace a metadados\n• Digest → Hash de verificação\n• Owner → Proprietário atual\n• Issuer → Creador original\n\nSin necessidade de smart contracts",
            en: "Native NFTs on the Xahau ledger\n\n• URI → Link to metadata\n• Digest → Verification hash\n• Owner → Current owner\n• Issuer → Original creator\n\nNo smart contracts needed",
            jp: "Xahauレジャーのネイティブ NFT\n\n• URI → メタデータへのリンク\n• Digest → 検証ハッシュ\n• Owner → 現在の所有者\n• Issuer → 元の作成者\n\nスマートコントラクト不要",
            ko: "Xahau 레저의 네이티브 NFT\n\n• URI → 메타데이터 링크\n• Digest → 검증 해시\n• Owner → 현재 소유자\n• Issuer → 최초 생성자\n\n스마트 컨트랙트 불필요",
            zh: "Xahau 账本中的原生 NFT\n\n• URI → 元数据链接\n• Digest → 校验哈希\n• Owner → 当前持有者\n• Issuer → 原始创建者\n\n不需要智能合约",
          },
          visual: "🎨",
        },
        {
          title: { es: "Operaciones con URITokens", pt: "Operações com URITokens", en: "URIToken Operations", jp: "URITokenの操作", ko: "URIToken 작업", zh: "URIToken 操作" },
          content: {
            es: "• URITokenMint → Crear NFT\n• URITokenBurn → Destruir NFT\n• URITokenCreateSellOffer → Vender\n• URITokenCancelSellOffer → Cancelar venta\n• URITokenBuy → Comprar",
            pt: "• URITokenMint → Criar NFT\n• URITokenBurn → Destruir NFT\n• URITokenCreateSellOffer → Vender\n• URITokenCancelSellOffer → Cancelar venda\n• URITokenBuy → Comprar",
            en: "• URITokenMint → Create NFT\n• URITokenBurn → Destroy NFT\n• URITokenCreateSellOffer → Sell\n• URITokenCancelSellOffer → Cancel sale\n• URITokenBuy → Buy",
            jp: "• URITokenMint → NFTを作成\n• URITokenBurn → NFTを破棄\n• URITokenCreateSellOffer → 売りに出す\n• URITokenCancelSellOffer → 売りをキャンセル\n• URITokenBuy → 購入する",
            ko: "• URITokenMint → NFT 생성\n• URITokenBurn → NFT 소각\n• URITokenCreateSellOffer → 판매 등록\n• URITokenCancelSellOffer → 판매 취소\n• URITokenBuy → 구매",
            zh: "• URITokenMint → 创建 NFT\n• URITokenBurn → 销毁 NFT\n• URITokenCreateSellOffer → 出售\n• URITokenCancelSellOffer → 取消出售\n• URITokenBuy → 购买",
          },
          visual: "🔧",
        },
        {
          title: { es: "URIToken vs ERC-721", pt: "URIToken vs ERC-721", en: "URIToken vs ERC-721", jp: "URIToken vs ERC-721", ko: "URIToken vs ERC-721", zh: "URIToken vs ERC-721" },
          content: {
            es: "URIToken (Xahau):\n• Nativo del ledger, sin contratos\n• Fee mínimo (~12 drops)\n• Digest nativo para verificación\n\nERC-721 (Ethereum):\n• Requiere contrato Solidity\n• Gas costoso y variable\n• Verificación depende del contrato",
            pt: "URIToken (Xahau):\n• Nativo do ledger, sem contratos\n• Fee mínimo (~12 drops)\n• Digest nativo para verificação\n\nERC-721 (Ethereum):\n• Requer contrato Solidity\n• Gas costoso e variável\n• Verificação depende do contrato",
            en: "URIToken (Xahau):\n• Native to the ledger, no contracts\n• Minimal fee (~12 drops)\n• Native Digest for verification\n\nERC-721 (Ethereum):\n• Requires Solidity contract\n• Expensive and variable gas\n• Verification depends on contract",
            jp: "URIToken（Xahau）：\n• レジャーネイティブ、コントラクト不要\n• 最小限のFee（〜12 drops）\n• 検証用のネイティブDigest\n\nERC-721（Ethereum）：\n• Solidityコントラクトが必要\n• 高価で変動するガス代\n• 検証はコントラクトに依存",
            ko: "URIToken (Xahau):\n• 레저 네이티브, 컨트랙트 불필요\n• 최소 수수료 (~12 drops)\n• 검증을 위한 네이티브 Digest\n\nERC-721 (Ethereum):\n• Solidity 컨트랙트 필요\n• 비싸고 가변적인 가스비\n• 검증이 컨트랙트에 의존",
            zh: "URIToken（Xahau）：\n• 账本原生，无需合约\n• 最低手续费（约 12 drops）\n• 使用原生 Digest 验证\n\nERC-721（Ethereum）：\n• 需要 Solidity 合约\n• Gas 昂贵且波动大\n• 验证依赖合约",
          },
          visual: "⚖️",
        },
      ],
    },
    {
      id: "m7l2",
      title: {
        es: "Compra-venta de URITokens",
        pt: "Compra-venda de URITokens",
        en: "Buying and Selling URITokens",
        jp: "URITokenの売買",
        ko: "URIToken 매매",
        zh: "URIToken 的买卖",
      },
      theory: {
        es: `Xahau incluye un sistema nativo para la compra-venta de URITokens, sin necesidad de marketplaces externos ni smart contracts.

### Flujo de venta

1. El propietario crea una **oferta de venta** con \`URITokenCreateSellOffer\`, indicando el precio en XAH o en otra divisa.
2. Cualquiera puede **comprar** el URIToken con \`URITokenBuy\`, pagando el precio establecido
3. El propietario puede **cancelar** la oferta con \`URITokenCancelSellOffer\`

### Venta a un destinatario específico

Puedes crear una oferta de venta dirigida a una cuenta específica usando el campo \`Destination\`. Solo esa cuenta podrá comprar el URIToken.

### Transferencia gratuita

Para transferir un URIToken sin coste (regalar), puedes crear una oferta de venta con \`Amount: "0"\` y un \`Destination\` específico.

### Quemar un URIToken

El propietario actual siempre puede quemar (destruir) su URIToken con \`URITokenBurn\`. Si el token fue creado con el flag \`tfBurnable\`, el emisor original también puede quemarlo.`,
        pt: `Xahau inclui um sistema nativo para a compra-venda de URITokens, sem necessidade de marketplaces externos nem smart contracts.
### Fluxo de venda
1. O proprietário cria uma **oferta de venda** com \`URITokenCreateSellOffer\`, indicando o precio em XAH ou em outra divisa.
2. Qualquer pessoa pode **comprar** o URIToken com \`URITokenBuy\`, pagando o preço definido
3. O proprietário pode **cancelar** a oferta com \`URITokenCancelSellOffer\`
### Vendà um destinatario específico
Você pode criar uma oferta de venda direcionada a uma conta específica usando o campo \`Destination\`. Somente essa conta poderá comprar o URIToken.
### Transferencia gratuita
Para transferir um URIToken sem custo (presentear), você pode criar uma oferta de venda com \`Amount: "0"\` e um \`Destination\` específico.
### Queimar um URIToken
O proprietário atual sempre pode queimar (destruir) seu URIToken com \`URITokenBurn\`. Se o token foi criado com o flag \`tfBurnable\`, o emissor original também pode queimarlo.`,
        en: `Xahau includes a native system for buying and selling URITokens, with no need for external marketplaces or smart contracts.

### Sale Flow

1. The owner creates a **sell offer** with \`URITokenCreateSellOffer\`, specifying the price in XAH or another currency.
2. Anyone can **buy** the URIToken with \`URITokenBuy\`, paying the listed price
3. The owner can **cancel** the offer with \`URITokenCancelSellOffer\`

### Sale to a Specific Recipient

You can create a sell offer directed at a specific account using the \`Destination\` field. Only that account will be able to buy the URIToken.

### Free Transfer

To transfer a URIToken at no cost (as a gift), you can create a sell offer with \`Amount: "0"\` and a specific \`Destination\`.

### Burning a URIToken

The current owner can always burn (destroy) their URIToken with \`URITokenBurn\`. If the token was created with the \`tfBurnable\` flag, the original issuer can also burn it.`,
        jp: `XahauにはURITokenの売買のためのネイティブシステムが含まれており、外部マーケットプレイスやスマートコントラクトは不要です。

### 売却フロー

1. 所有者が\`URITokenCreateSellOffer\`で**売りオファー**を作成し、XAHまたは他の通貨での価格を指定します
2. 誰でも\`URITokenBuy\`でURITokenを**購入**し、設定価格を支払います
3. 所有者は\`URITokenCancelSellOffer\`でオファーを**キャンセル**できます

### 特定の受取人への売却

\`Destination\`フィールドを使って特定のアカウント向けの売りオファーを作成できます。そのアカウントだけがURITokenを購入できます。

### 無料転送

コストなしでURITokenを転送（贈り物として）するには、\`Amount: "0"\`と特定の\`Destination\`を指定した売りオファーを作成します。

### URITokenのバーン

現在の所有者はいつでも\`URITokenBurn\`でURITokenをバーン（破棄）できます。\`tfBurnable\`フラグで作成されたトークンは、元の発行者もバーンできます。`,
        ko: `Xahau는 외부 마켓플레이스나 스마트 컨트랙트 없이 URIToken을 사고팔 수 있는 네이티브 시스템을 포함합니다.

### 판매 흐름

1. 소유자가 \`URITokenCreateSellOffer\`로 **판매 오퍼**를 생성하고 XAH 또는 다른 통화로 가격을 지정합니다.
2. 누구나 \`URITokenBuy\`로 URIToken을 **구매**하고 등록된 가격을 지불할 수 있습니다.
3. 소유자는 \`URITokenCancelSellOffer\`로 오퍼를 **취소**할 수 있습니다.

### 특정 수신자에게 판매

\`Destination\` 필드를 사용하여 특정 계정을 대상으로 한 판매 오퍼를 생성할 수 있습니다. 해당 계정만 URIToken을 구매할 수 있습니다.

### 무료 전송

URIToken을 비용 없이 전송(선물)하려면 \`Amount: "0"\`과 특정 \`Destination\`을 지정한 판매 오퍼를 생성하면 됩니다.

### URIToken 소각

현재 소유자는 언제든지 \`URITokenBurn\`으로 URIToken을 소각(파괴)할 수 있습니다. \`tfBurnable\` 플래그로 생성된 토큰은 원래 발행자도 소각할 수 있습니다.`,
        zh: `Xahau 内置了买卖 URIToken 的原生系统，不需要外部市场或智能合约。

### 出售流程

1. 持有者通过 \`URITokenCreateSellOffer\` 创建**卖单**，并指定 XAH 或其他货币的价格。
2. 任何人都可以通过 \`URITokenBuy\` **购买** URIToken，并支付标价。
3. 持有者可以通过 \`URITokenCancelSellOffer\` **取消**该卖单。

### 卖给指定接收者

你可以使用 \`Destination\` 字段创建面向特定账户的卖单。只有该账户才能购买这个 URIToken。

### 免费转移

如果你想免费转移一个 URIToken（例如赠送），可以创建一个 \`Amount: "0"\` 且带有特定 \`Destination\` 的卖单。

### 销毁 URIToken

当前持有者始终可以通过 \`URITokenBurn\` 销毁自己的 URIToken。如果该代币在创建时启用了 \`tfBurnable\` 标志，则最初的发行方也可以销毁它。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Poner un URIToken a la venta",
            pt: "Colocar um URIToken à venda",
            en: "List a URIToken for Sale",
            jp: "URITokenを売りに出す",
            ko: "URIToken 판매 등록",
            zh: "将 URIToken 挂牌出售",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function sellURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const owner = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Crear oferta de venta por 50 XAH
  const sellOffer = {
    TransactionType: "URITokenCreateSellOffer",
    Account: owner.address,
    URITokenID: "TU_URITOKEN_ID_AQUI", // ID del URIToken a vender
    Amount: xahToDrops(5), // Precio: 5 XAH
  };

  const prepared = await client.autofill(sellOffer);
  const signed = owner.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken puesto a la venta por 5 XAH!");
  }

  await client.disconnect();
}

sellURIToken();`,
            pt: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
async function sellURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const owner = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});
  // Criar oferta de venda por 50 XAH
  const sellOffer = {
    TransactionType: "URITokenCreateSellOffer",
    Account: owner.address,
    URITokenID: "TU_URITOKEN_ID_AQUI", // ID do URIToken a vender
    Amount: xahToDrops(5), // Precio: 5 XAH
  };
  const prepared = await client.autofill(sellOffer);
  const signed = owner.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken puesto à venda por 5 XAH!");
  }
  await client.disconnect();
}
sellURIToken();`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function sellURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const owner = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Create a sell offer for 5 XAH
  const sellOffer = {
    TransactionType: "URITokenCreateSellOffer",
    Account: owner.address,
    URITokenID: "YOUR_URITOKEN_ID_HERE", // ID of the URIToken to sell
    Amount: xahToDrops(5), // Price: 5 XAH
  };

  const prepared = await client.autofill(sellOffer);
  const signed = owner.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken listed for sale at 5 XAH!");
  }

  await client.disconnect();
}

sellURIToken();`,
            jp: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function sellURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const owner = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 5 XAHで売りオファーを作成
  const sellOffer = {
    TransactionType: "URITokenCreateSellOffer",
    Account: owner.address,
    URITokenID: "YOUR_URITOKEN_ID_HERE", // 売りに出すURITokenのID
    Amount: xahToDrops(5), // 価格：5 XAH
  };

  const prepared = await client.autofill(sellOffer);
  const signed = owner.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URITokenを5 XAHで売りに出しました！");
  }

  await client.disconnect();
}

sellURIToken();`,
            ko: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function sellURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const owner = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 5 XAH에 판매 오퍼 생성
  const sellOffer = {
    TransactionType: "URITokenCreateSellOffer",
    Account: owner.address,
    URITokenID: "YOUR_URITOKEN_ID_HERE", // 판매할 URIToken의 ID
    Amount: xahToDrops(5), // 가격: 5 XAH
  };

  const prepared = await client.autofill(sellOffer);
  const signed = owner.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken을 5 XAH에 판매 등록했습니다!");
  }

  await client.disconnect();
}

sellURIToken();`,
            zh: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function sellURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const owner = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 创建一个售价为 5 XAH 的卖单
  const sellOffer = {
    TransactionType: "URITokenCreateSellOffer",
    Account: owner.address,
    URITokenID: "YOUR_URITOKEN_ID_HERE", // 要出售的 URIToken ID
    Amount: xahToDrops(5), // 价格：5 XAH
  };

  const prepared = await client.autofill(sellOffer);
  const signed = owner.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken 已以 5 XAH 挂牌出售！");
  }

  await client.disconnect();
}

sellURIToken();`,
          },
        },
        {
          title: {
            es: "Comprar un URIToken que está a la venta",
            pt: "Comprar um URIToken que está à venda",
            en: "Buy a URIToken That Is Listed for Sale",
            jp: "売りに出ているURITokenを購入する",
            ko: "판매 중인 URIToken 구매",
            zh: "购买正在出售的 URIToken",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function buyURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const buyer = Wallet.fromSeed(process.env.BUYER_SEED, {algorithm: 'secp256k1'});

  // Comprar el URIToken pagando el precio de venta
  const buy = {
    TransactionType: "URITokenBuy",
    Account: buyer.address,
    URITokenID: "TU_URITOKEN_ID_AQUI", // ID del URIToken a comprar
    Amount: xahToDrops(5), // Debe coincidir con el precio de venta
  };

  const prepared = await client.autofill(buy);
  const signed = buyer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken comprado con éxito!");
    console.log("El NFT ahora es tuyo.");
        console.log("Dirección del comprador:", buyer.address);
  }

  await client.disconnect();
}

buyURIToken();`,
            pt: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");
async function buyURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const buyer = Wallet.fromSeed(process.env.BUYER_SEED, {algorithm: 'secp256k1'});
  // Comprar ou URIToken pagando ou precio de venda
  const buy = {
    TransactionType: "URITokenBuy",
    Account: buyer.address,
    URITokenID: "TU_URITOKEN_ID_AQUI", // ID do URIToken a comprar
    Amount: xahToDrops(5), // Deve coincidir com o precio de venda
  };
  const prepared = await client.autofill(buy);
  const signed = buyer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("Resultado:", result.result.meta.TransactionResult);
  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡URIToken comprado com éxito!");
    console.log("O NFT ahora é tuyo.");
        console.log("Endereçou do comprador:", buyer.address);
  }
  await client.disconnect();
}
buyURIToken();`,
            en: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function buyURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const buyer = Wallet.fromSeed(process.env.BUYER_SEED, {algorithm: 'secp256k1'});

  // Buy the URIToken by paying the sale price
  const buy = {
    TransactionType: "URITokenBuy",
    Account: buyer.address,
    URITokenID: "YOUR_URITOKEN_ID_HERE", // ID of the URIToken to buy
    Amount: xahToDrops(5), // Must match the sale price
  };

  const prepared = await client.autofill(buy);
  const signed = buyer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken purchased successfully!");
    console.log("The NFT is now yours.");
    console.log("Buyer Address:", buyer.address);
  }

  await client.disconnect();
}

buyURIToken();`,
            jp: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function buyURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const buyer = Wallet.fromSeed(process.env.BUYER_SEED, {algorithm: 'secp256k1'});

  // 売り価格を支払ってURITokenを購入する
  const buy = {
    TransactionType: "URITokenBuy",
    Account: buyer.address,
    URITokenID: "YOUR_URITOKEN_ID_HERE", // 購入するURITokenのID
    Amount: xahToDrops(5), // 売り価格と一致する必要がある
  };

  const prepared = await client.autofill(buy);
  const signed = buyer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URITokenを正常に購入しました！");
    console.log("このNFTはあなたのものです。");
    console.log("購入者のアドレス:", buyer.address);
  }

  await client.disconnect();
}

buyURIToken();`,
            ko: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function buyURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const buyer = Wallet.fromSeed(process.env.BUYER_SEED, {algorithm: 'secp256k1'});

  // 판매 가격을 지불하여 URIToken 구매
  const buy = {
    TransactionType: "URITokenBuy",
    Account: buyer.address,
    URITokenID: "YOUR_URITOKEN_ID_HERE", // 구매할 URIToken의 ID
    Amount: xahToDrops(5), // 판매 가격과 일치해야 함
  };

  const prepared = await client.autofill(buy);
  const signed = buyer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken을 성공적으로 구매했습니다!");
    console.log("이제 이 NFT는 당신의 것입니다.");
    console.log("구매자 주소:", buyer.address);
  }

  await client.disconnect();
}

buyURIToken();`,
            zh: `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function buyURIToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const buyer = Wallet.fromSeed(process.env.BUYER_SEED, {algorithm: 'secp256k1'});

  // 按照卖价支付并购买 URIToken
  const buy = {
    TransactionType: "URITokenBuy",
    Account: buyer.address,
    URITokenID: "YOUR_URITOKEN_ID_HERE", // 要购买的 URIToken ID
    Amount: xahToDrops(5), // 必须与卖价一致
  };

  const prepared = await client.autofill(buy);
  const signed = buyer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("URIToken 购买成功！");
    console.log("这个 NFT 现在属于你了。");
    console.log("买家地址:", buyer.address);
  }

  await client.disconnect();
}

buyURIToken();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Flujo de venta", pt: "Fluxo de venda", en: "Sale Flow", jp: "売却フロー", ko: "판매 흐름", zh: "出售流程" },
          content: {
            es: "1️⃣ URITokenCreateSellOffer → Poner precio\n2️⃣ URITokenBuy → Comprador paga\n3️⃣ Transferencia automática\n\nTodo nativo, sin marketplace externo",
            pt: "1️⃣ URITokenCreateSellOffer → Colocar precio\n2️⃣ URITokenBuy → Comprador paga\n3️⃣ Transferencia automática\n\nTodo nativo, sem marketplace externo",
            en: "1️⃣ URITokenCreateSellOffer → Set price\n2️⃣ URITokenBuy → Buyer pays\n3️⃣ Automatic transfer\n\nAll native, no external marketplace",
            jp: "1️⃣ URITokenCreateSellOffer → 価格を設定\n2️⃣ URITokenBuy → 購入者が支払う\n3️⃣ 自動転送\n\nすべてネイティブ、外部マーケットプレイス不要",
            ko: "1️⃣ URITokenCreateSellOffer → 가격 설정\n2️⃣ URITokenBuy → 구매자 지불\n3️⃣ 자동 전송\n\n모두 네이티브, 외부 마켓플레이스 불필요",
            zh: "1️⃣ URITokenCreateSellOffer → 设置价格\n2️⃣ URITokenBuy → 买家付款\n3️⃣ 自动转移\n\n全部为原生流程，无需外部市场",
          },
          visual: "💰",
        },
        {
          title: { es: "Transferir y quemar", pt: "Transferir e queimar", en: "Transfer and Burn", jp: "転送とバーン", ko: "전송과 소각", zh: "转移与销毁" },
          content: {
            es: "Transferir gratis:\n• SellOffer con Amount: 0 + Destination\n\nQuemar (destruir):\n• URITokenBurn por el propietario\n• O por el emisor si tiene flag tfBurnable",
            pt: "Transferir grátis:\n• SellOffer com Amount: 0 + Destination\n\nQueimar (destruir):\n• URITokenBurn por ou proprietário\n• OU por o emissor se tem flag tfBurnable",
            en: "Free transfer:\n• SellOffer with Amount: 0 + Destination\n\nBurn (destroy):\n• URITokenBurn by the owner\n• Or by the issuer if tfBurnable flag is set",
            jp: "無料転送：\n• Amount: 0 + DestinationのSellOffer\n\nバーン（破棄）：\n• 所有者によるURITokenBurn\n• またはtfBurnableフラグがあれば発行者も可",
            ko: "무료 전송:\n• Amount: 0 + Destination의 SellOffer\n\n소각 (파괴):\n• 소유자에 의한 URITokenBurn\n• 또는 tfBurnable 플래그가 있으면 발행자도 가능",
            zh: "免费转移：\n• 使用 Amount: 0 + Destination 的 SellOffer\n\n销毁：\n• 持有者执行 URITokenBurn\n• 或者在启用 tfBurnable 时由发行方执行",
          },
          visual: "🔥",
        },
        {
          title: { es: "Quemar URITokens en detalle", pt: "Queimar URITokens em detalhe", en: "Burning URITokens in Detail", jp: "URITokenのバーンの詳細", ko: "URIToken 소각 상세", zh: "URIToken 销毁详解" },
          content: {
            es: "Flag tfBurnable (1) al mintear:\n• Permite al emisor quemar el token\n• Incluso si ya no es propietario\n\nSin tfBurnable:\n• Solo el propietario actual puede quemar\n\nUsos: eliminar errores de minteo,\ncontenido expirado, tokens revocables",
            pt: "Flag tfBurnable (1) ao mintar:\n• Permite ao emissor queimar ou token\n• Incluso se já não é proprietário\n\nSin tfBurnable:\n• Apenas ou proprietário atual pode queimar\n\nUsos: eliminar erros de minteo,\nconteúdo expirado, tokens revocables",
            en: "tfBurnable flag (1) at mint time:\n• Allows the issuer to burn the token\n• Even if they are no longer the owner\n\nWithout tfBurnable:\n• Only the current owner can burn\n\nUse cases: fix minting errors,\nexpired content, revocable tokens",
            jp: "ミント時のtfBurnableフラグ（1）：\n• 発行者がトークンをバーンできる\n• もはや所有者でなくても\n\ntfBurnableなし：\n• 現在の所有者のみバーン可能\n\nユースケース：ミントエラーの修正、\n期限切れコンテンツ、取り消し可能なトークン",
            ko: "민팅 시 tfBurnable 플래그 (1):\n• 발행자가 토큰을 소각할 수 있음\n• 더 이상 소유자가 아니더라도\n\ntfBurnable 없음:\n• 현재 소유자만 소각 가능\n\n사용 사례: 민팅 오류 수정,\n만료된 콘텐츠, 취소 가능한 토큰",
            zh: "Mint 时的 tfBurnable 标志（1）：\n• 允许发行方销毁该代币\n• 即使其已不再是持有者\n\n没有 tfBurnable：\n• 只有当前持有者可以销毁\n\n使用场景：修复 mint 错误、\n过期内容、可撤销代币",
          },
          visual: "🗑️",
        },
      ],
    },
    {
      id: "m7l3",
      title: {
        es: "Metadatos y estándares para URITokens",
        pt: "Metadados e estándares para URITokens",
        en: "Metadata and Standards for URITokens",
        jp: "URITokenのメタデータと標準",
        ko: "URIToken의 메타데이터와 표준",
        zh: "URIToken 的元数据与标准",
      },
      theory: {
        es: `Los metadatos son la clave para que un NFT sea útil y verificable. En Xahau, los URITokens usan los campos **URI** y **Digest** para enlazar y verificar el contenido asociado.

### El campo URI: qué poner en él

La URI es un enlace que apunta al contenido o metadatos del NFT. Hay varias opciones:

- **IPFS links** (\`ipfs://QmXxx...\`): Almacenamiento descentralizado. El contenido es inmutable y direccionado por hash. Es la opción **recomendada** para producción
- **HTTPS links** (\`https://mi-servidor.com/metadata/1.json\`): Almacenamiento centralizado. Fácil de implementar pero depende de que el servidor esté disponible

### El campo Digest: verificación de integridad

El **Digest** es un hash SHA-256 del contenido al que apunta la URI. Permite a cualquiera verificar que el contenido no ha sido alterado desde que se creó el NFT. Se almacena como una cadena hexadecimal de 64 caracteres en el ledger.

### Estándar de metadatos JSON

Siguiendo un estándar similar a ERC-721, los metadatos JSON de un URIToken típicamente incluyen:

\`\`\`json
{
    "content": {
        "url": "ipfs://bafybeign6w3zkxxqohchtxyv4qot6zrwcrvosmmrz2c6ayijl67h42s3km/106.png"
    },
    "details": {
        "title": "Nombre de tu NFT",
        "categories": [
            "0001"
        ],
        "publisher": {
            "name": "Tu nombre",
            "url": "https://www.tuweb.com",
            "email": "tucorreo@gmail.com"
        },
        "group": {
            "title": "Título de tu colección"
        }
    }
}
\`\`\`

### Opciones de almacenamiento

| Opción | Ventajas | Desventajas |
|---|---|---|
| **IPFS** | Descentralizado, inmutable, direccionado por hash | Necesita pinning para persistencia |
| **Servidor centralizado** | Simple, rápido | Punto único de fallo, mutable |

### Buenas prácticas

- **Siempre establece el Digest**: Permite verificar la integridad del contenido en cualquier momento
- **Usa IPFS para producción**: La inmutabilidad y descentralización protegen el valor del NFT
- **Mantén el JSON consistente**: Sigue el estándar de metadatos para compatibilidad con marketplaces y exploradores
- **No pongas datos sensibles en la URI**: Todo es público en el ledger`,
        pt: `Os metadados são a chave para que um NFT sea útil e verificable. Em Xahau, os URITokens usam os campos **URI** e **Digest** para enlazar e verificar o conteúdo asociado.
### O campo URI: o que colocar nele
A URI é um link que aponta ao conteúdo ou metadados do NFT. Há várias opções:
- **IPFS links** (\`ipfs://QmXxx...\`): Armazenamento descentralizado. O conteúdo é imutável e direcionado por hash. É a opção **recomendada** para produção
- **HTTPS links** (\`https://mi-servidor.com/metadata/1.json\`): Armazenamento centralizado. Fácil de implementar mas depende de que o servidor esteja disponível
### O campo Digest: verificação de integridade
O **Digest** é um hash SHA-256 do conteúdo ao qual aponta a URI. Permite a qualquer pessoa verificar que o conteúdo não foi alterado desde que se criou o NFT. É armazenado como uma string hexadecimal de 64 caracteres no ledger.
### Estándar de metadados JSON
Siguiendo um estándar similar a ERC-721, os metadados JSON de um URIToken típicamente incluin:
\`\`\`json
{
    "content": {
        "url": "ipfs://bafybeign6w3zkxxqohchtxyv4qot6zrwcrvosmmrz2c6ayijl67h42s3km/106.png"
    },
    "details": {
        "title": "Nome do seu NFT",
        "categories": [
            "0001"
        ],
        "publisher": {
            "name": "Tu nome",
            "url": "https://www.tuweb.com",
            "email": "tucorreo@gmail.com"
        },
        "group": {
            "title": "Título da sua coleção"
        }
    }
}
\`\`\`
### Opções de armazenamento
| Opção | Vantagens | Desvantagens |
|---|---|---|
| **IPFS** | Descentralizado, imutável, direcionado por hash | Necesita pinning para persistencia |
| **Servidor centralizado** | Simple, rápido | Punto único de fallo, mutable |
### Boas práticas
- **Sempre defina o Digest**: Permite verificar a integridade do conteúdo em qualquer momento
- **Usa IPFS para produção**: A imutabilidade e descentralização protegem o valor do NFT
- **Mantén o JSON consistente**: Sigue o estándar de metadados para compatibilidad com marketplaces e exploradores
- **Não coloque dados sensíveis na URI**: Tudo é público no ledger`,
        en: `Metadata is the key to making an NFT useful and verifiable. On Xahau, URITokens use the **URI** and **Digest** fields to link to and verify associated content.

### The URI Field: What to Put in It

The URI is a link that points to the NFT's content or metadata. There are several options:

- **IPFS links** (\`ipfs://QmXxx...\`): Decentralized storage. Content is immutable and hash-addressed. This is the **recommended** option for production
- **HTTPS links** (\`https://my-server.com/metadata/1.json\`): Centralized storage. Easy to implement but depends on server availability

### The Digest Field: Integrity Verification

The **Digest** is a SHA-256 hash of the content the URI points to. It allows anyone to verify that the content has not been altered since the NFT was created. It is stored as a 64-character hexadecimal string on the ledger.

### JSON Metadata Standard

Following a standard similar to ERC-721, the JSON metadata for a URIToken typically includes:

\`\`\`json
{
    "content": {
        "url": "ipfs://bafybeign6w3zkxxqohchtxyv4qot6zrwcrvosmmrz2c6ayijl67h42s3km/106.png"
    },
    "details": {
        "title": "Your NFT Name",
        "categories": [
            "0001"
        ],
        "publisher": {
            "name": "Your name",
            "url": "https://www.yourwebsite.com",
            "email": "youremail@gmail.com"
        },
        "group": {
            "title": "Your Collection Title"
        }
    }
}
\`\`\`

### Storage Options

| Option | Advantages | Disadvantages |
|---|---|---|
| **IPFS** | Decentralized, immutable, hash-addressed | Requires pinning for persistence |
| **Centralized server** | Simple, fast | Single point of failure, mutable |

### Best Practices

- **Always set the Digest**: Allows verifying content integrity at any time
- **Use IPFS for production**: Immutability and decentralization protect the NFT's value
- **Keep JSON consistent**: Follow the metadata standard for compatibility with marketplaces and explorers
- **Do not put sensitive data in the URI**: Everything is public on the ledger`,
        jp: `メタデータはNFTを有用かつ検証可能にするための鍵です。XahauではURITokenが**URI**と**Digest**フィールドを使って関連コンテンツにリンクし、検証します。

### URIフィールド：何を入れるか

URIはNFTのコンテンツまたはメタデータを指すリンクです。次のようなオプションがあります。

- **IPFSリンク**（\`ipfs://QmXxx...\`）：分散型ストレージ。コンテンツは不変でハッシュアドレス指定されます。本番環境では**推奨**オプション
- **HTTPSリンク**（\`https://my-server.com/metadata/1.json\`）：集中型ストレージ。実装は簡単ですがサーバーの可用性に依存します

### Digestフィールド：整合性検証

**Digest**はURIが指すコンテンツのSHA-256ハッシュです。NFT作成以来コンテンツが改ざんされていないことを誰でも検証できます。レジャーに64文字の16進数文字列として保存されます。

### JSONメタデータ標準

ERC-721と同様の標準に従い、URITokenのJSONメタデータには通常次のようなフィールドが含まれます。

\`\`\`json
{
    "content": {
        "url": "ipfs://bafybeign6w3zkxxqohchtxyv4qot6zrwcrvosmmrz2c6ayijl67h42s3km/106.png"
    },
    "details": {
        "title": "あなたのNFT名",
        "categories": [
            "0001"
        ],
        "publisher": {
            "name": "あなたの名前",
            "url": "https://www.yourwebsite.com",
            "email": "youremail@gmail.com"
        },
        "group": {
            "title": "あなたのコレクションタイトル"
        }
    }
}
\`\`\`

### ストレージオプション

| オプション | メリット | デメリット |
|---|---|---|
| **IPFS** | 分散型、不変、ハッシュアドレス指定 | 永続化にピンニングが必要 |
| **集中型サーバー** | シンプル、高速 | 単一障害点、変更可能 |

### ベストプラクティス

- **常にDigestを設定する**：いつでもコンテンツの整合性を検証できます
- **本番環境ではIPFSを使用する**：不変性と分散化がNFTの価値を保護します
- **JSONを一貫して保つ**：マーケットプレイスやエクスプローラーとの互換性のためにメタデータ標準に従います
- **URIに機密データを入れない**：レジャー上のすべては公開情報です`,
        ko: `메타데이터는 NFT를 유용하고 검증 가능하게 만드는 핵심입니다. Xahau에서 URIToken은 **URI**와 **Digest** 필드를 사용하여 관련 콘텐츠에 연결하고 검증합니다.

### URI 필드: 무엇을 넣을까

URI는 NFT의 콘텐츠 또는 메타데이터를 가리키는 링크입니다. 여러 옵션이 있습니다:

- **IPFS 링크** (\`ipfs://QmXxx...\`): 분산형 스토리지. 콘텐츠는 불변이며 해시로 주소가 지정됩니다. 프로덕션 환경에서 **권장**되는 옵션
- **HTTPS 링크** (\`https://my-server.com/metadata/1.json\`): 중앙화된 스토리지. 구현이 쉽지만 서버 가용성에 의존합니다.

### Digest 필드: 무결성 검증

**Digest**는 URI가 가리키는 콘텐츠의 SHA-256 해시입니다. NFT가 생성된 이후 콘텐츠가 변경되지 않았음을 누구나 검증할 수 있습니다. 레저에 64자의 16진수 문자열로 저장됩니다.

### JSON 메타데이터 표준

ERC-721과 유사한 표준을 따라, URIToken의 JSON 메타데이터에는 일반적으로 다음 항목이 포함됩니다:

\`\`\`json
{
    "content": {
        "url": "ipfs://bafybeign6w3zkxxqohchtxyv4qot6zrwcrvosmmrz2c6ayijl67h42s3km/106.png"
    },
    "details": {
        "title": "당신의 NFT 이름",
        "categories": [
            "0001"
        ],
        "publisher": {
            "name": "당신의 이름",
            "url": "https://www.yourwebsite.com",
            "email": "youremail@gmail.com"
        },
        "group": {
            "title": "당신의 컬렉션 제목"
        }
    }
}
\`\`\`

### 스토리지 옵션

| 옵션 | 장점 | 단점 |
|---|---|---|
| **IPFS** | 분산형, 불변, 해시 주소 지정 | 지속성을 위해 피닝 필요 |
| **중앙화 서버** | 단순, 빠름 | 단일 장애점, 변경 가능 |

### 모범 사례

- **항상 Digest를 설정하세요**: 언제든지 콘텐츠 무결성을 검증할 수 있습니다.
- **프로덕션에는 IPFS를 사용하세요**: 불변성과 분산화가 NFT의 가치를 보호합니다.
- **JSON을 일관되게 유지하세요**: 마켓플레이스 및 탐색기와의 호환성을 위해 메타데이터 표준을 따르세요.
- **URI에 민감한 데이터를 넣지 마세요**: 레저의 모든 것은 공개 정보입니다.`,
        zh: `元数据是让 NFT 变得有用且可验证的关键。在 Xahau 中，URIToken 使用 **URI** 和 **Digest** 字段来链接并验证相关内容。

### URI 字段：应填写什么

URI 是指向 NFT 内容或元数据的链接，常见选择包括：

- **IPFS 链接**（\`ipfs://QmXxx...\`）：去中心化存储。内容不可变，并通过哈希寻址。这是生产环境中**推荐**的选择
- **HTTPS 链接**（\`https://my-server.com/metadata/1.json\`）：中心化存储。实现简单，但依赖服务器可用性

### Digest 字段：完整性验证

**Digest** 是 URI 所指向内容的 SHA-256 哈希。它允许任何人验证该内容自 NFT 创建以来是否被篡改。它以 64 个十六进制字符的形式存储在账本中。

### JSON 元数据标准

遵循与 ERC-721 类似的标准，URIToken 的 JSON 元数据通常包含：

\`\`\`json
{
    "content": {
        "url": "ipfs://bafybeign6w3zkxxqohchtxyv4qot6zrwcrvosmmrz2c6ayijl67h42s3km/106.png"
    },
    "details": {
        "title": "你的 NFT 名称",
        "categories": [
            "0001"
        ],
        "publisher": {
            "name": "你的名字",
            "url": "https://www.yourwebsite.com",
            "email": "youremail@gmail.com"
        },
        "group": {
            "title": "你的合集标题"
        }
    }
}
\`\`\`

### 存储选项

| 选项 | 优点 | 缺点 |
|---|---|---|
| **IPFS** | 去中心化、不可变、哈希寻址 | 需要 pinning 来保证持久性 |
| **中心化服务器** | 简单、快速 | 单点故障、可变 |

### 最佳实践

- **始终设置 Digest**：这样可以随时验证内容完整性
- **生产环境优先使用 IPFS**：不可变性和去中心化能保护 NFT 的价值
- **保持 JSON 结构一致**：遵循元数据标准有助于与市场和浏览器兼容
- **不要把敏感数据放进 URI**：账本上的一切都是公开的`,
      },
      codeBlocks: [

      ],
      slides: [
        {
          title: { es: "El campo URI: opciones de enlace", pt: "O campo URI: opções de link", en: "The URI Field: Link Options", jp: "URIフィールド：リンクの選択肢", ko: "URI 필드: 링크 옵션", zh: "URI 字段：链接选项" },
          content: {
            es: "¿A dónde apunta tu NFT?\n\n• ipfs://Qm... → Descentralizado e inmutable\n• https://... → Centralizado pero simple\n",
            pt: "Para onde aponta seu NFT?\n\n• ipfs://Qm... → Descentralizado e imutável\n• https://... → Centralizado mas simples\n",
            en: "Where does your NFT point to?\n\n• ipfs://Qm... → Decentralized and immutable\n• https://... → Centralized but simple\n",
            jp: "あなたのNFTはどこを指しているか？\n\n• ipfs://Qm... → 分散型かつ不変\n• https://... → 集中型だがシンプル\n",
            ko: "당신의 NFT는 어디를 가리키나요?\n\n• ipfs://Qm... → 분산형이며 불변\n• https://... → 중앙화되었지만 단순\n",
            zh: "你的 NFT 指向哪里？\n\n• ipfs://Qm... → 去中心化且不可变\n• https://... → 中心化但简单\n",
          },
          visual: "🔗",
        },
        {
          title: { es: "Digest: verificación de integridad", pt: "Digest: verificação de integridadee", en: "Digest: Integrity Verification", jp: "Digest：整合性検証", ko: "Digest: 무결성 검증", zh: "Digest：完整性验证" },
          content: {
            es: "SHA-256 del contenido → grabado en el ledger\n\n• Cualquiera puede verificar\n• Detecta alteraciones\n• 64 caracteres hexadecimales\n\nSiempre establece el Digest para proteger tu NFT",
            pt: "SHA-256 do conteúdo → gravado no ledger\n\n• Qualquer pessoa pode verificar\n• Detecta alterações\n• 64 caracteres hexadecimais\n\nSempre defina o Digest para proteger seu NFT",
            en: "SHA-256 of the content → recorded on the ledger\n\n• Anyone can verify\n• Detects tampering\n• 64 hexadecimal characters\n\nAlways set the Digest to protect your NFT",
            jp: "コンテンツのSHA-256 → レジャーに記録\n\n• 誰でも検証可能\n• 改ざんを検出\n• 64文字の16進数\n\nNFTを守るため常にDigestを設定すること",
            ko: "콘텐츠의 SHA-256 → 레저에 기록\n\n• 누구나 검증 가능\n• 변조 감지\n• 64자의 16진수 문자\n\nNFT를 보호하기 위해 항상 Digest를 설정하세요",
            zh: "内容的 SHA-256 → 记录在账本中\n\n• 任何人都可以验证\n• 能检测篡改\n• 64 个十六进制字符\n\n始终设置 Digest 来保护你的 NFT",
          },
          visual: "🔏",
        },
        {
          title: { es: "Estándar de metadatos JSON", pt: "Padrão de metadados JSON", en: "JSON Metadata Standard", jp: "JSONメタデータ標準", ko: "JSON 메타데이터 표준", zh: "JSON 元数据标准" },
          content: {
            es: "Estructura recomendada (similar a ERC-721):\n\n• name → Nombre del NFT\n• description → Descripción\n• image → Enlace a la imagen\n• attributes → Array de propiedades\n\nConsistencia = compatibilidad con exploradores",
            pt: "Estructura recomendada (similar a ERC-721):\n\n• name → Nome do NFT\n• description → Descripción\n• image → Enlace à imagen\n• attributes → Array de propriedades\n\nConsistencia = compatibilidad com exploradores",
            en: "Recommended structure (similar to ERC-721):\n\n• name → NFT name\n• description → Description\n• image → Link to image\n• attributes → Array of properties\n\nConsistency = compatibility with explorers",
            jp: "推奨構造（ERC-721と類似）：\n\n• name → NFT名\n• description → 説明\n• image → 画像へのリンク\n• attributes → プロパティの配列\n\n一貫性 = エクスプローラーとの互換性",
            ko: "권장 구조 (ERC-721과 유사):\n\n• name → NFT 이름\n• description → 설명\n• image → 이미지 링크\n• attributes → 속성 배열\n\n일관성 = 탐색기와의 호환성",
            zh: "推荐结构（类似 ERC-721）：\n\n• name → NFT 名称\n• description → 描述\n• image → 图片链接\n• attributes → 属性数组\n\n保持一致 = 更好兼容浏览器与市场",
          },
          visual: "📋",
        },
      ],
    },
  ],
}

const arabicModuleTranslations = {
  title: "إنشاء واستخدام NFTs",
  lessons: {
    m7l1: {
      title: "URITokens: NFTs أصلية في Xahau",
      theory: `في Xahau، تمثل NFTs كـ **URITokens**: objects أصلية في ledger تحتوي URI يشير إلى metadata أو المحتوى المرتبط بالـ NFT.

### ما هو URIToken؟

URIToken هو object فريد يحتوي عادة على:

- **ID / LedgerIndex**: معرف فريد.
- **URI**: رابط إلى metadata أو صورة أو JSON.
- **Digest**: hash اختياري للتحقق من سلامة المحتوى.
- **Owner**: المالك الحالي.
- **Issuer**: الحساب الذي أنشأ token.

### URIToken مقابل ERC-721

في ERC-721 تحتاج غالبا إلى smart contract. في Xahau، mint و sale و buy و burn هي معاملات أصلية مثل \`URITokenMint\` و\`URITokenBuy\`. هذا يقلل التعقيد والرسوم.

### عمليات URIToken

يمكنك mint، burn، إنشاء sell offer، إلغاء offer، أو شراء token معروض للبيع. الحقول المهمة هي URI وDigest والـ flags مثل \`tfBurnable\`.`,
      codeTitles: [
        "إنشاء Mint لـ URIToken",
        "استعلام URITokens لحساب",
      ],
      code: [
        `require("dotenv").config();
const { Client, Wallet, convertStringToHex } = require("xahau");

async function mintUriToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // URI يشير إلى metadata أو ملف مرتبط بالـ NFT
  const tx = {
    TransactionType: "URITokenMint",
    Account: wallet.address,
    URI: convertStringToHex("ipfs://example-metadata.json"),
    Flags: 1, // tfBurnable: يسمح للـ issuer بحرق token لاحقا
  };

  const prepared = await client.autofill(tx);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("النتيجة:", result.result.meta.TransactionResult);
  console.log("Hash:", signed.hash);

  await client.disconnect();
}

mintUriToken().catch(console.error);`,
        `const { Client } = require("xahau");

async function queryUriTokens() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const account = "rYourAddressHere";

  // account_objects مع type يعرض URITokens التي يملكها الحساب
  const response = await client.request({
    command: "account_objects",
    account,
    type: "uri_token",
    ledger_index: "validated",
  });

  console.log("URITokens:", response.result.account_objects.length);
  console.log(response.result.account_objects);

  await client.disconnect();
}

queryUriTokens().catch(console.error);`,
      ],
      slides: [
        {
          title: "URITokens في Xahau",
          content: "NFTs أصلية في ledger\n\n• URI للmetadata\n• Digest للتحقق\n• Owner و Issuer\n• لا تحتاج ERC-721 contract",
        },
        {
          title: "عمليات URIToken",
          content: "• URITokenMint\n• URITokenBurn\n• URITokenCreateSellOffer\n• URITokenCancelSellOffer\n• URITokenBuy",
        },
        {
          title: "URIToken مقابل ERC-721",
          content: "ERC-721 يحتاج contract\nURIToken يستخدم معاملات أصلية\n\n• رسوم أقل\n• بنية أبسط\n• URI و Digest داخل ledger object",
        },
      ],
    },
    m7l2: {
      title: "شراء وبيع URITokens",
      theory: `بيع URIToken يتم عبر إنشاء sell offer. المالك يحدد token والسعر، والمشتري يستخدم \`URITokenBuy\` لقبول العرض.

### تدفق البيع

1. المالك يملك URIToken.
2. ينشئ \`URITokenCreateSellOffer\` بسعر معين.
3. يظهر token كمعروض للبيع.
4. المشتري يرسل \`URITokenBuy\`.
5. تنتقل الملكية ويدفع السعر.

### Burn

\`URITokenBurn\` يحذف token من ledger. إذا كان token burnable، يمكن للـ issuer حرقه حتى لو لم يعد هو المالك. هذه خاصية حساسة ويجب توضيحها للمستخدمين.

### Transfer

الشراء هو طريقة نقل الملكية عند وجود offer. لذلك البيع والشراء جزء من نموذج النقل الأصلي للـ URITokens.`,
      codeTitles: [
        "عرض URIToken للبيع",
        "شراء URIToken معروض للبيع",
      ],
      code: [
        `require("dotenv").config();
const { Client, Wallet, xahToDrops } = require("xahau");

async function listUriTokenForSale() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const seller = Wallet.fromSeed(process.env.SELLER_SEED, { algorithm: "secp256k1" });

  const tx = {
    TransactionType: "URITokenCreateSellOffer",
    Account: seller.address,
    URITokenID: process.env.URI_TOKEN_ID,
    Amount: xahToDrops("25"), // سعر البيع بـ XAH
  };

  const prepared = await client.autofill(tx);
  const signed = seller.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("النتيجة:", result.result.meta.TransactionResult);

  await client.disconnect();
}

listUriTokenForSale().catch(console.error);`,
        `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function buyUriToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const buyer = Wallet.fromSeed(process.env.BUYER_SEED, { algorithm: "secp256k1" });

  const tx = {
    TransactionType: "URITokenBuy",
    Account: buyer.address,
    URITokenID: process.env.URI_TOKEN_ID,
  };

  const prepared = await client.autofill(tx);
  const signed = buyer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);
  console.log("النتيجة:", result.result.meta.TransactionResult);

  await client.disconnect();
}

buyUriToken().catch(console.error);`,
      ],
      slides: [
        {
          title: "تدفق البيع",
          content: "1. المالك يملك URIToken\n2. ينشئ sell offer\n3. المشتري ينفذ URITokenBuy\n4. تنتقل الملكية\n5. يدفع السعر",
        },
        {
          title: "Transfer و Burn",
          content: "URITokenBuy ينقل الملكية عند وجود offer\n\nURITokenBurn يحذف token من ledger\n\nإذا كان burnable، قد يستطيع issuer حرقه لاحقا.",
        },
        {
          title: "حرق URITokens بالتفصيل",
          content: "Burn يعني حذف NFT نهائيا\n\nاستخدمه بحذر:\n• تحقق من URITokenID\n• افهم صلاحيات issuer\n• اشرح خاصية burnable للمستخدم",
        },
      ],
    },
    m7l3: {
      title: "Metadata ومعايير URITokens",
      theory: `Metadata هو المفتاح لجعل NFT مفيدا وقابلا للتحقق. في Xahau، تستخدم URITokens حقلي **URI** و**Digest** للربط بالمحتوى المرتبط والتحقق منه.

### حقل URI: ماذا نضع فيه

الـ URI هو رابط يشير إلى محتوى أو metadata الـ NFT. هناك عدة خيارات:

- **روابط IPFS** (\`ipfs://QmXxx...\`): تخزين لامركزي. المحتوى غير قابل للتغيير ومعنون بواسطة hash. هذا هو الخيار **الموصى به** للإنتاج
- **روابط HTTPS** (\`https://my-server.com/metadata/1.json\`): تخزين مركزي. سهل التنفيذ لكنه يعتمد على توفر الخادم

### حقل Digest: التحقق من السلامة

**Digest** هو hash من نوع SHA-256 للمحتوى الذي يشير إليه URI. يسمح لأي شخص بالتحقق من أن المحتوى لم يتغير منذ إنشاء NFT. يُخزَّن كسلسلة hexadecimal مكونة من 64 حرفا على ledger.

### معيار JSON Metadata

باتباع معيار مشابه لـ ERC-721، عادة ما تتضمن JSON metadata لـ URIToken:

\`\`\`json
{
    "content": {
        "url": "ipfs://bafybeign6w3zkxxqohchtxyv4qot6zrwcrvosmmrz2c6ayijl67h42s3km/106.png"
    },
    "details": {
        "title": "Your NFT Name",
        "categories": [
            "0001"
        ],
        "publisher": {
            "name": "Your name",
            "url": "https://www.yourwebsite.com",
            "email": "youremail@gmail.com"
        },
        "group": {
            "title": "Your Collection Title"
        }
    }
}
\`\`\`

### خيارات التخزين

| الخيار | المزايا | العيوب |
|---|---|---|
| **IPFS** | لامركزي، غير قابل للتغيير، معنون بواسطة hash | يتطلب pinning للاستمرارية |
| **خادم مركزي** | بسيط وسريع | نقطة فشل واحدة، وقابل للتغيير |

### أفضل الممارسات

- **حدد Digest دائما**: يسمح بالتحقق من سلامة المحتوى في أي وقت
- **استخدم IPFS للإنتاج**: عدم القابلية للتغيير واللامركزية يحميان قيمة NFT
- **حافظ على اتساق JSON**: اتبع معيار metadata للتوافق مع marketplaces والمستكشفات
- **لا تضع بيانات حساسة في URI**: كل شيء عام على ledger`,
      codeTitles: [],
      code: [],
      slides: [
        {
          title: "حقل URI: خيارات الروابط",
          content: "URI يمكن أن يشير إلى:\n\n• HTTPS JSON\n• IPFS metadata\n• صورة أو ملف\n• API خاص بالتطبيق\n\nالأفضل أن يكون المحتوى ثابتا وقابلا للتحقق.",
        },
        {
          title: "Digest: التحقق من السلامة",
          content: "Digest = hash للمحتوى\n\nيساعد على كشف تغيير metadata أو الملف\n\nمفيد عندما يكون URI خارج ledger.",
        },
        {
          title: "معيار JSON Metadata",
          content: "مثال حقول مفيدة:\n\n• name\n• description\n• image\n• attributes\n• external_url\n\nاجعل metadata سهلة القراءة للتطبيقات.",
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
  title: "Créer et utiliser des NFTs",
  lessons: {
    m7l1: {
      title: "URITokens : NFTs natifs sur Xahau",
      theory: `Sur Xahau, les NFTs sont implémentés sous forme de **URITokens**, des objets natifs du ledger qui représentent des tokens non fongibles avec une URI associée.

### Qu'est-ce qu'un URIToken ?

Un URIToken est un objet **unique** sur le ledger qui contient :
- **ID** : Identifiant unique du token (LedgerIndex)
- **URI** : Un lien vers les métadonnées ou le contenu du NFT (image, JSON, etc.)
- **Digest** : Hash optionnel du contenu pointé par l'URI (pour vérifier son intégrité)
- **Owner** : Le compte propriétaire actuel
- **Issuer** : Le compte qui l'a créé à l'origine

### URIToken vs ERC-721

| Caractéristique | ERC-721 (Ethereum) | URIToken (Xahau) |
|---|---|---|
| Créer une collection | Déployer un contrat Solidity | Non nécessaire |
| Mint du NFT | Fonction du contrat | Transaction \`URITokenMint\` |
| Transfert | Fonction du contrat | Transaction \`URITokenBuy\` |
| Métadonnées | tokenURI dans le contrat | URI native sur l'objet |
| Coût | Gas coûteux | Frais minimes (~12 drops) |
| Vérification | Dépend du contrat | Digest natif sur le ledger |

### Transactions liées aux URITokens

- **URITokenMint** : Crée un nouveau URIToken
- **URITokenBurn** : Détruit un URIToken
- **URITokenCreateSellOffer** : Met un URIToken en vente
- **URITokenCancelSellOffer** : Annule une offre de vente
- **URITokenBuy** : Achète un URIToken mis en vente

### Flags de URITokenMint

- **tfBurnable (1)** : Permet à l'émetteur de brûler le token même s'il n'en est plus le propriétaire`,
      codeTitles: ["Créer (mint) un URIToken", "Consulter les URITokens d'un compte"],
      slides: [
        ["URITokens sur Xahau", "NFT natif représenté par une URI\n\n• Transaction URITokenMint\n• Objet de ledger\n• Propriétaire identifiable\n• Pas de smart contract ERC-721"],
        ["Opérations URIToken", "Mint, vendre, acheter, transférer et brûler\n\nChaque action passe par une transaction native."],
        ["URIToken vs ERC-721", "ERC-721 dépend d'un contrat\nURIToken est intégré au protocole\n\nLe modèle est plus direct et plus structuré côté ledger."],
      ],
    },
    m7l2: {
      title: "Acheter et vendre des URITokens",
      theory: `Xahau inclut un système natif pour l'achat et la vente de URITokens, sans nécessiter de marketplaces externes ni de smart contracts.

### Flux de vente

1. Le propriétaire crée une **offre de vente** avec \`URITokenCreateSellOffer\`, en précisant le prix en XAH ou dans une autre devise.
2. N'importe qui peut **acheter** le URIToken avec \`URITokenBuy\`, en payant le prix indiqué
3. Le propriétaire peut **annuler** l'offre avec \`URITokenCancelSellOffer\`

### Vente à un destinataire spécifique

Tu peux créer une offre de vente destinée à un compte spécifique en utilisant le champ \`Destination\`. Seul ce compte pourra acheter le URIToken.

### Transfert gratuit

Pour transférer un URIToken sans frais (comme un cadeau), tu peux créer une offre de vente avec \`Amount: "0"\` et un \`Destination\` spécifique.

### Brûler un URIToken

Le propriétaire actuel peut toujours brûler (détruire) son URIToken avec \`URITokenBurn\`. Si le token a été créé avec le flag \`tfBurnable\`, l'émetteur d'origine peut également le brûler.`,
      codeTitles: ["Mettre un URIToken en vente", "Acheter un URIToken listé à la vente"],
      slides: [
        ["Flux de vente", "1. Le propriétaire liste l'URIToken\n2. L'acheteur envoie l'achat\n3. Le ledger transfère l'objet\n4. Le paiement est réglé"],
        ["Transférer et brûler", "Un URIToken peut être transféré à un autre compte ou détruit si le protocole et les règles de propriété le permettent."],
        ["Burn des URITokens en détail", "Burn supprime l'objet du ledger\n\nÀ utiliser quand l'actif ne doit plus circuler ou lorsque le cycle de vie est terminé."],
      ],
    },
    m7l3: {
      title: "Métadonnées et standards pour URITokens",
      theory: `Les métadonnées sont la clé pour rendre un NFT utile et vérifiable. Sur Xahau, les URITokens utilisent les champs **URI** et **Digest** pour lier et vérifier le contenu associé.

### Le champ URI : que mettre dedans

L'URI est un lien qui pointe vers le contenu ou les métadonnées du NFT. Plusieurs options existent :

- **Liens IPFS** (\`ipfs://QmXxx...\`) : Stockage décentralisé. Le contenu est immuable et adressé par hash. C'est l'option **recommandée** en production
- **Liens HTTPS** (\`https://my-server.com/metadata/1.json\`) : Stockage centralisé. Facile à mettre en œuvre mais dépend de la disponibilité du serveur

### Le champ Digest : vérification de l'intégrité

Le **Digest** est un hash SHA-256 du contenu pointé par l'URI. Il permet à quiconque de vérifier que le contenu n'a pas été altéré depuis la création du NFT. Il est stocké sous forme de chaîne hexadécimale de 64 caractères sur le ledger.

### Standard de métadonnées JSON

En suivant un standard similaire à ERC-721, les métadonnées JSON d'un URIToken incluent généralement :

\`\`\`json
{
    "content": {
        "url": "ipfs://bafybeign6w3zkxxqohchtxyv4qot6zrwcrvosmmrz2c6ayijl67h42s3km/106.png"
    },
    "details": {
        "title": "Your NFT Name",
        "categories": [
            "0001"
        ],
        "publisher": {
            "name": "Your name",
            "url": "https://www.yourwebsite.com",
            "email": "youremail@gmail.com"
        },
        "group": {
            "title": "Your Collection Title"
        }
    }
}
\`\`\`

### Options de stockage

| Option | Avantages | Inconvénients |
|---|---|---|
| **IPFS** | Décentralisé, immuable, adressé par hash | Nécessite un pinning pour la persistance |
| **Serveur centralisé** | Simple, rapide | Point de défaillance unique, modifiable |

### Bonnes pratiques

- **Toujours définir le Digest** : Permet de vérifier l'intégrité du contenu à tout moment
- **Utiliser IPFS en production** : L'immuabilité et la décentralisation protègent la valeur du NFT
- **Garder le JSON cohérent** : Suis le standard de métadonnées pour la compatibilité avec les marketplaces et les explorateurs
- **Ne pas mettre de données sensibles dans l'URI** : Tout est public sur le ledger`,
      slides: [
        ["Champ URI : options de lien", "L'URI peut pointer vers IPFS, HTTPS ou un autre système de stockage\n\nChoisis un stockage durable si l'actif doit rester consultable."],
        ["Digest : vérification d'intégrité", "Un digest permet de vérifier que le contenu référencé correspond à ce qui était attendu au moment du mint."],
        ["Standard JSON de métadonnées", "Champs courants :\n\nname\ndescription\nimage\nattributes\nexternal_url\n\nGarde un format lisible par les wallets et explorateurs."],
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
      if (typeof block.code === "string") block.code = { en: block.code };
      block.code.fr = localizeFrenchCode(
        `// ${translation.codeTitles[index]}\n// Exemple commenté en français : remplace les valeurs par celles de ton compte testnet.\n\n${block.code.en ?? block.code.es}`,
      );
    });
    lesson.slides?.forEach((slide, index) => {
      const slideTranslation = translation.slides[index];
      if (!slideTranslation) return;
      slide.title.fr = slideTranslation[0];
      slide.content.fr = slideTranslation[1];
    });
  }
}

function localizeFrenchCode(code) {
  return code
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("//") && !/[éèàùçîô]/i.test(trimmed)) {
        return `${line.match(/^\s*/)?.[0] ?? ""}// Note : adapte cette étape à ton compte testnet et à ton URIToken.`;
      }
      if (trimmed.startsWith("#") && /[A-Za-z]{4,}/.test(trimmed) && !/[éèàùçîô]/i.test(trimmed)) {
        return `${line.match(/^\s*/)?.[0] ?? ""}# Note : adapte cette étape à ton environnement local.`;
      }
      return line;
    })
    .join("\n");
}

applyFrenchTranslations(moduleData);

export default moduleData;
