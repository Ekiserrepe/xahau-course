/**
 * The course accounts: `create-accounts.js`, the `.env.example` it fills, and
 * the theory that explains them, in every language.
 *
 * Lessons from Module 5 on read their accounts from .env. Most use only
 * WALLET_SEED, but some need a second party (an issuer, a buyer, the receiver
 * of a Check). This one script creates all of them, so no lesson depends on a
 * step the reader was never shown. Module 3 lesson 2 (the faucet lesson) shows
 * it; the lessons that use a role link back to it and their scripts stop with
 * a message naming it when the role is missing.
 */

/** Role in .env -> lesson that first uses it, as { m, l } for a lesson link. */
const ROLE_LESSON = {
  WALLET_SEED: { m: 5, l: 0 },
  ISSUER_SEED: { m: 7, l: 0 },
  RESERVE_SEED: { m: 7, l: 1 },
  FROZEN_SEED: { m: 7, l: 4 },
  BUYER_SEED: { m: 8, l: 1 },
  CASH_SEED: { m: 10, l: 1 },
  ORACLE_SEED: { m: 10, l: 8 },
  HOLDER_SEED: { m: 10, l: 9 },
}
export const ROLES = Object.keys(ROLE_LESSON)

// Real testnet output of the script, run with an empty .env
const OUTPUT = `✔ WALLET   rBLuS1gEPkFMvyogRRyPyMQWZPfSMRZCqU funded by the faucet
✔ ISSUER   rDSFWxUH586ztyZ25SwUZzvArdicYJf82z created with 50 XAH
✔ RESERVE  rGohc7nUGLzbxnYymE8bEQfdPWVFDdhLPG created with 50 XAH
✔ FROZEN   r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7 created with 50 XAH
✔ BUYER    rwYEUZNkuH7ErBVsq8T3TVfC8iEb5HP7rj created with 50 XAH
✔ CASH     rD45SD1Udme8nsm6wzFPcT3uqSYZWWRxmv created with 50 XAH
✔ ORACLE   rD2CcPGmtAwpSA1C8r4h2p1mLqfRB72UBE created with 50 XAH
✔ HOLDER   r3Gd3Ek5HHEZY8L9kMithzwr6e1j2Ac4Se created with 50 XAH

Accounts in .env:
  WALLET   rBLuS1gEPkFMvyogRRyPyMQWZPfSMRZCqU  your main account
  ISSUER   rDSFWxUH586ztyZ25SwUZzvArdicYJf82z  issues a token (Module 7)
  RESERVE  rGohc7nUGLzbxnYymE8bEQfdPWVFDdhLPG  holds and distributes the token (Module 7)
  FROZEN   r3BWrzUfHx5QdSWdDjHoA6Km6jN8HRGde7  token holder whose TrustLine is frozen (Module 7)
  BUYER    rwYEUZNkuH7ErBVsq8T3TVfC8iEb5HP7rj  buys a URIToken (Module 8)
  CASH     rD45SD1Udme8nsm6wzFPcT3uqSYZWWRxmv  receives and cashes a Check (Module 10)
  ORACLE   rD2CcPGmtAwpSA1C8r4h2p1mLqfRB72UBE  publishes a price Oracle (Module 10)
  HOLDER   r3Gd3Ek5HHEZY8L9kMithzwr6e1j2Ac4Se  claims IOU rewards (Module 10)`

// ── Per-language text ───────────────────────────────────────────────────────
// `roles` are the script's own descriptions (printed in its output, so the
// English ones match OUTPUT above); `col` are the theory table's headers.

const T = {
  en: {
    file: 'File',
    blockTitle: 'create-accounts.js — every account the course uses, saved in .env',
    envTitle: '.env.example — the roles create-accounts.js writes',
    envNote: 'Every account the course uses. create-accounts.js fills in the missing ones.',
    roles: {
      WALLET_SEED: 'your main account',
      ISSUER_SEED: 'issues a token (Module 7)',
      RESERVE_SEED: 'holds and distributes the token (Module 7)',
      FROZEN_SEED: 'token holder whose TrustLine is frozen (Module 7)',
      BUYER_SEED: 'buys a URIToken (Module 8)',
      CASH_SEED: 'receives and cashes a Check (Module 10)',
      ORACLE_SEED: 'publishes a price Oracle (Module 10)',
      HOLDER_SEED: 'claims IOU rewards (Module 10)',
    },
    c: {
      head: 'Creates every testnet account the course uses and saves its seed in .env.\n// Safe to run again: roles already in .env are kept, only missing ones are created.',
      roles: 'Role in .env → what the account does in the course',
      funding: 'XAH each extra role receives from WALLET',
      algo: 'Every seed is loaded as secp256k1 across the course, so generate them that way',
      faucet: '1. The main account comes from the faucet (one request per minute is allowed)',
      payment: '2. Every other role is created by a Payment from WALLET: an account exists\n  //    on the ledger once it receives at least the base reserve in XAH',
      unfunded: 'tecUNFUNDED_PAYMENT: WALLET has less than FUNDING XAH above its reserve',
      list: "3. Every role's address, to paste wherever a lesson asks for one",
    },
    m: {
      failed: (role, code) => `\`creating \${${role}} failed with \${${code}}. Is WALLET funded?\``,
    },
    col: ['Variable', 'Role', 'First used in'],
    module: 'Module',
    theory: (table, output) => `### The course accounts

From Module 5 on, the scripts read their accounts from \`.env\`. Most lessons need only your main account, but some need a second party: a token issuer, a buyer, the receiver of a Check. Each role has its own seed in \`.env\`:

${table}

\`create-accounts.js\` (in the Code tab) creates all of them in one run. It follows four rules:

1. **Only the main account comes from the faucet.** The testnet faucet accepts one request per minute and refuses the rest, so a script that asks it for eight accounts fails on the second one.
2. **Every other account is created by a Payment from \`WALLET\`.** An account exists on the ledger as soon as it receives at least the base reserve (1 XAH on testnet), so a 50 XAH Payment to a new address creates and funds it in one transaction.
3. **Keys are secp256k1.** Every script in the course loads seeds with \`{ algorithm: "secp256k1" }\`. A seed generated with the library's default (ed25519) would load as a different address.
4. **It never overwrites.** Roles already in \`.env\` are kept; running it again only creates what is missing.

Run it from your course folder, where \`.env\` lives:

\`\`\`bash
node create-accounts.js
\`\`\`

Output on testnet, with an empty \`.env\`:

\`\`\`
${output}
\`\`\`

- **\`funded by the faucet\`**: \`WALLET_SEED\` was missing, so the faucet created the account with 1,000 test XAH.
- **\`created with 50 XAH\`**: the Payment from \`WALLET\` returned \`tesSUCCESS\`, so the new account now exists and its seed is in \`.env\`.
- **\`Accounts in .env\`**: every role's address. When a lesson asks for an address (a destination, an issuer), it means one of these.

**Cases to watch:**
- **\`creating … failed with tecUNFUNDED_PAYMENT\`**: \`WALLET\` has less than 50 XAH above its reserve. Delete the \`WALLET_SEED\` line from \`.env\` and run the script again to get a fresh faucet account; the roles already created stay.
- **A faucet error on the first run** (the library reports it as \`Cannot read properties of undefined\`): the faucet refused a second request inside a minute. Wait a minute and run the script again.
- **A script stops with "… is not in .env: run create-accounts.js"**: the lesson uses a role you haven't created yet. Run this script; it only adds what is missing.
- These seeds are stored in plain text. Use them on testnet only, never on mainnet.

\`.env.example\` lists every role without its seed, so you can share the layout of your \`.env\` safely.`,
  },

  es: {
    file: 'Archivo',
    blockTitle: 'create-accounts.js — todas las cuentas del curso, guardadas en .env',
    envTitle: '.env.example — los roles que escribe create-accounts.js',
    envNote: 'Todas las cuentas que usa el curso. create-accounts.js crea las que falten.',
    roles: {
      WALLET_SEED: 'tu cuenta principal',
      ISSUER_SEED: 'emite un token (módulo 7)',
      RESERVE_SEED: 'guarda y distribuye el token (módulo 7)',
      FROZEN_SEED: 'holder del token cuya TrustLine se congela (módulo 7)',
      BUYER_SEED: 'compra un URIToken (módulo 8)',
      CASH_SEED: 'recibe y cobra un Check (módulo 10)',
      ORACLE_SEED: 'publica un Oracle de precios (módulo 10)',
      HOLDER_SEED: 'reclama recompensas IOU (módulo 10)',
    },
    c: {
      head: 'Crea todas las cuentas de testnet que usa el curso y guarda su seed en .env.\n// Puedes volver a ejecutarlo: los roles que ya están en .env se conservan y solo se crean los que faltan.',
      roles: 'Rol en .env → qué hace la cuenta en el curso',
      funding: 'XAH que recibe de WALLET cada rol adicional',
      algo: 'En todo el curso los seeds se cargan como secp256k1, así que se generan así',
      faucet: '1. La cuenta principal sale del faucet (admite una petición por minuto)',
      payment: '2. Los demás roles se crean con un Payment desde WALLET: una cuenta existe\n  //    en el ledger en cuanto recibe al menos la reserva base en XAH',
      unfunded: 'tecUNFUNDED_PAYMENT: WALLET tiene menos de FUNDING XAH por encima de su reserva',
      list: '3. La dirección de cada rol, para pegarla cuando una lección pida una',
    },
    m: {
      failed: (role, code) => `\`la creación de \${${role}} falló con \${${code}}. ¿Tiene fondos WALLET?\``,
    },
    col: ['Variable', 'Rol', 'Se usa desde'],
    module: 'Módulo',
    theory: (table, output) => `### Las cuentas del curso

A partir del módulo 5, los scripts leen sus cuentas de \`.env\`. La mayoría de las lecciones solo necesita tu cuenta principal, pero algunas necesitan una segunda parte: el emisor de un token, un comprador, quien recibe un Check. Cada rol tiene su propio seed en \`.env\`:

${table}

\`create-accounts.js\` (en la pestaña Código) las crea todas de una vez. Sigue cuatro reglas:

1. **Solo la cuenta principal sale del faucet.** El faucet de testnet acepta una petición por minuto y rechaza el resto, así que un script que le pida ocho cuentas falla en la segunda.
2. **Las demás cuentas se crean con un Payment desde \`WALLET\`.** Una cuenta existe en el ledger en cuanto recibe al menos la reserva base (1 XAH en testnet), así que un Payment de 50 XAH a una dirección nueva la crea y la financia en una sola transacción.
3. **Las claves son secp256k1.** Todos los scripts del curso cargan los seeds con \`{ algorithm: "secp256k1" }\`. Un seed generado con el algoritmo por defecto de la librería (ed25519) se cargaría como otra dirección.
4. **Nunca sobrescribe.** Los roles que ya están en \`.env\` se conservan; al volver a ejecutarlo solo crea lo que falta.

Ejecútalo desde la carpeta del curso, donde está \`.env\`:

\`\`\`bash
node create-accounts.js
\`\`\`

Salida en testnet, con un \`.env\` vacío:

\`\`\`
${output}
\`\`\`

- **\`funded by the faucet\`**: faltaba \`WALLET_SEED\`, así que el faucet creó la cuenta con 1.000 XAH de prueba.
- **\`created with 50 XAH\`**: el Payment desde \`WALLET\` devolvió \`tesSUCCESS\`; la cuenta nueva ya existe y su seed está en \`.env\`.
- **\`Accounts in .env\`**: la dirección de cada rol. Cuando una lección pide una dirección (un destino, un emisor), se refiere a una de estas.

**Casos a vigilar:**
- **\`… falló con tecUNFUNDED_PAYMENT\`**: \`WALLET\` tiene menos de 50 XAH por encima de su reserva. Borra la línea \`WALLET_SEED\` de \`.env\` y vuelve a ejecutar el script para obtener una cuenta nueva del faucet; los roles ya creados se conservan.
- **Un error del faucet en la primera ejecución** (la librería lo muestra como \`Cannot read properties of undefined\`): el faucet rechazó una segunda petición dentro del mismo minuto. Espera un minuto y vuelve a ejecutarlo.
- **Un script se detiene con "… no está en .env: ejecuta primero create-accounts.js"**: la lección usa un rol que aún no has creado. Ejecuta este script; solo añade lo que falta.
- Estos seeds se guardan en texto plano. Úsalos solo en testnet, nunca en mainnet.

\`.env.example\` enumera todos los roles sin su seed, para que puedas compartir la estructura de tu \`.env\` sin riesgo.`,
  },

  pt: {
    file: 'Arquivo',
    blockTitle: 'create-accounts.js — todas as contas do curso, salvas no .env',
    envTitle: '.env.example — os papéis que create-accounts.js escreve',
    envNote: 'Todas as contas que o curso usa. create-accounts.js cria as que faltarem.',
    roles: {
      WALLET_SEED: 'sua conta principal',
      ISSUER_SEED: 'emite um token (módulo 7)',
      RESERVE_SEED: 'guarda e distribui o token (módulo 7)',
      FROZEN_SEED: 'holder do token cuja TrustLine é congelada (módulo 7)',
      BUYER_SEED: 'compra um URIToken (módulo 8)',
      CASH_SEED: 'recebe e desconta um Check (módulo 10)',
      ORACLE_SEED: 'publica um Oracle de preços (módulo 10)',
      HOLDER_SEED: 'resgata recompensas IOU (módulo 10)',
    },
    c: {
      head: 'Cria todas as contas de testnet que o curso usa e salva a seed de cada uma no .env.\n// Pode ser executado de novo: os papéis que já estão no .env são mantidos e só os que faltam são criados.',
      roles: 'Papel no .env → o que a conta faz no curso',
      funding: 'XAH que cada papel adicional recebe da WALLET',
      algo: 'Em todo o curso as seeds são carregadas como secp256k1, então são geradas assim',
      faucet: '1. A conta principal vem do faucet (aceita uma solicitação por minuto)',
      payment: '2. Os demais papéis são criados com um Payment a partir da WALLET: uma conta existe\n  //    no ledger assim que recebe pelo menos a reserva base em XAH',
      unfunded: 'tecUNFUNDED_PAYMENT: a WALLET tem menos de FUNDING XAH acima da reserva',
      list: '3. O endereço de cada papel, para colar quando uma lição pedir um',
    },
    m: {
      failed: (role, code) => `\`a criação de \${${role}} falhou com \${${code}}. A WALLET tem fundos?\``,
    },
    col: ['Variável', 'Papel', 'Usada a partir de'],
    module: 'Módulo',
    theory: (table, output) => `### As contas do curso

A partir do módulo 5, os scripts leem suas contas do \`.env\`. A maioria das lições precisa apenas da sua conta principal, mas algumas precisam de uma segunda parte: o emissor de um token, um comprador, quem recebe um Check. Cada papel tem sua própria seed no \`.env\`:

${table}

\`create-accounts.js\` (na aba Código) cria todas de uma vez. Ele segue quatro regras:

1. **Só a conta principal vem do faucet.** O faucet da testnet aceita uma solicitação por minuto e recusa as demais, então um script que pede oito contas falha na segunda.
2. **As outras contas são criadas com um Payment a partir da \`WALLET\`.** Uma conta passa a existir no ledger assim que recebe pelo menos a reserva base (1 XAH na testnet), então um Payment de 50 XAH para um endereço novo cria e financia a conta em uma única transação.
3. **As chaves são secp256k1.** Todos os scripts do curso carregam as seeds com \`{ algorithm: "secp256k1" }\`. Uma seed gerada com o algoritmo padrão da biblioteca (ed25519) seria carregada como outro endereço.
4. **Nunca sobrescreve.** Os papéis que já estão no \`.env\` são mantidos; ao executar de novo, só cria o que falta.

Execute-o na pasta do curso, onde fica o \`.env\`:

\`\`\`bash
node create-accounts.js
\`\`\`

Saída na testnet, com um \`.env\` vazio:

\`\`\`
${output}
\`\`\`

- **\`funded by the faucet\`**: faltava \`WALLET_SEED\`, então o faucet criou a conta com 1.000 XAH de teste.
- **\`created with 50 XAH\`**: o Payment a partir da \`WALLET\` retornou \`tesSUCCESS\`; a conta nova já existe e sua seed está no \`.env\`.
- **\`Accounts in .env\`**: o endereço de cada papel. Quando uma lição pede um endereço (um destino, um emissor), é um destes.

**Casos para observar:**
- **\`… falhou com tecUNFUNDED_PAYMENT\`**: a \`WALLET\` tem menos de 50 XAH acima da reserva. Apague a linha \`WALLET_SEED\` do \`.env\` e execute o script de novo para obter uma conta nova do faucet; os papéis já criados são mantidos.
- **Um erro do faucet na primeira execução** (a biblioteca o mostra como \`Cannot read properties of undefined\`): o faucet recusou uma segunda solicitação dentro do mesmo minuto. Espere um minuto e execute de novo.
- **Um script para com "… não está no .env: execute primeiro create-accounts.js"**: a lição usa um papel que você ainda não criou. Execute este script; ele só adiciona o que falta.
- Essas seeds ficam em texto puro. Use-as só na testnet, nunca na mainnet.

\`.env.example\` lista todos os papéis sem a seed, para você compartilhar a estrutura do seu \`.env\` com segurança.`,
  },

  fr: {
    file: 'Fichier',
    blockTitle: 'create-accounts.js — tous les comptes du cours, enregistrés dans .env',
    envTitle: '.env.example — les rôles écrits par create-accounts.js',
    envNote: 'Tous les comptes utilisés par le cours. create-accounts.js crée ceux qui manquent.',
    roles: {
      WALLET_SEED: 'ton compte principal',
      ISSUER_SEED: 'émet un token (module 7)',
      RESERVE_SEED: 'détient et distribue le token (module 7)',
      FROZEN_SEED: 'détenteur du token dont la TrustLine est gelée (module 7)',
      BUYER_SEED: 'achète un URIToken (module 8)',
      CASH_SEED: 'reçoit et encaisse un Check (module 10)',
      ORACLE_SEED: 'publie un Oracle de prix (module 10)',
      HOLDER_SEED: 'réclame des récompenses IOU (module 10)',
    },
    c: {
      head: "Crée tous les comptes testnet utilisés par le cours et enregistre leur seed dans .env.\n// Tu peux le relancer : les rôles déjà présents dans .env sont conservés, seuls ceux qui manquent sont créés.",
      roles: 'Rôle dans .env → ce que fait le compte dans le cours',
      funding: 'XAH que chaque rôle supplémentaire reçoit de WALLET',
      algo: 'Dans tout le cours, les seeds sont chargés en secp256k1 : on les génère donc ainsi',
      faucet: '1. Le compte principal vient du faucet (une requête par minute est acceptée)',
      payment: "2. Les autres rôles sont créés par un Payment depuis WALLET : un compte existe\n  //    dans le ledger dès qu'il reçoit au moins la réserve de base en XAH",
      unfunded: 'tecUNFUNDED_PAYMENT : WALLET a moins de FUNDING XAH au-dessus de sa réserve',
      list: "3. L'adresse de chaque rôle, à coller quand une leçon en demande une",
    },
    m: {
      failed: (role, code) => `\`la création de \${${role}} a échoué avec \${${code}}. WALLET a-t-il des fonds ?\``,
    },
    col: ['Variable', 'Rôle', 'Utilisé à partir de'],
    module: 'Module',
    theory: (table, output) => `### Les comptes du cours

À partir du module 5, les scripts lisent leurs comptes dans \`.env\`. La plupart des leçons n'ont besoin que de ton compte principal, mais certaines ont besoin d'une deuxième partie : l'émetteur d'un token, un acheteur, le destinataire d'un Check. Chaque rôle a son propre seed dans \`.env\` :

${table}

\`create-accounts.js\` (dans l'onglet Code) les crée tous en une fois. Il suit quatre règles :

1. **Seul le compte principal vient du faucet.** Le faucet du testnet accepte une requête par minute et refuse les autres : un script qui lui demande huit comptes échoue dès le deuxième.
2. **Les autres comptes sont créés par un Payment depuis \`WALLET\`.** Un compte existe dans le ledger dès qu'il reçoit au moins la réserve de base (1 XAH sur le testnet) : un Payment de 50 XAH vers une nouvelle adresse le crée et le finance en une seule transaction.
3. **Les clés sont en secp256k1.** Tous les scripts du cours chargent les seeds avec \`{ algorithm: "secp256k1" }\`. Un seed généré avec l'algorithme par défaut de la bibliothèque (ed25519) donnerait une autre adresse.
4. **Il n'écrase jamais rien.** Les rôles déjà présents dans \`.env\` sont conservés ; relancé, il ne crée que ce qui manque.

Lance-le depuis le dossier du cours, là où se trouve \`.env\` :

\`\`\`bash
node create-accounts.js
\`\`\`

Sortie sur le testnet, avec un \`.env\` vide :

\`\`\`
${output}
\`\`\`

- **\`funded by the faucet\`** : \`WALLET_SEED\` manquait, le faucet a donc créé le compte avec 1 000 XAH de test.
- **\`created with 50 XAH\`** : le Payment depuis \`WALLET\` a renvoyé \`tesSUCCESS\` ; le nouveau compte existe et son seed est dans \`.env\`.
- **\`Accounts in .env\`** : l'adresse de chaque rôle. Quand une leçon demande une adresse (une destination, un émetteur), c'est l'une de celles-ci.

**Cas à surveiller :**
- **\`… a échoué avec tecUNFUNDED_PAYMENT\`** : \`WALLET\` a moins de 50 XAH au-dessus de sa réserve. Supprime la ligne \`WALLET_SEED\` de \`.env\` et relance le script pour obtenir un nouveau compte du faucet ; les rôles déjà créés sont conservés.
- **Une erreur du faucet au premier lancement** (la bibliothèque l'affiche comme \`Cannot read properties of undefined\`) : le faucet a refusé une deuxième requête dans la même minute. Attends une minute et relance.
- **Un script s'arrête avec « … absent de .env : exécute d'abord create-accounts.js »** : la leçon utilise un rôle que tu n'as pas encore créé. Lance ce script ; il n'ajoute que ce qui manque.
- Ces seeds sont stockés en clair. Utilise-les uniquement sur le testnet, jamais sur le mainnet.

\`.env.example\` liste tous les rôles sans leur seed, pour partager la structure de ton \`.env\` sans risque.`,
  },

  jp: {
    file: 'ファイル',
    blockTitle: 'create-accounts.js — コースで使うすべてのアカウントを .env に保存',
    envTitle: '.env.example — create-accounts.js が書き込むロール',
    envNote: 'コースで使うすべてのアカウント。足りないものは create-accounts.js が作成します。',
    roles: {
      WALLET_SEED: 'メインアカウント',
      ISSUER_SEED: 'トークンを発行する（モジュール7）',
      RESERVE_SEED: 'トークンを保有・配布する（モジュール7）',
      FROZEN_SEED: 'TrustLine を凍結されるトークン保有者（モジュール7）',
      BUYER_SEED: 'URIToken を購入する（モジュール8）',
      CASH_SEED: 'Check を受け取り換金する（モジュール10）',
      ORACLE_SEED: '価格 Oracle を公開する（モジュール10）',
      HOLDER_SEED: 'IOU リワードを請求する（モジュール10）',
    },
    c: {
      head: 'コースで使うテストネットのアカウントをすべて作成し、seed を .env に保存します。\n// 何度実行しても安全です。.env にあるロールはそのまま残し、足りないものだけを作成します。',
      roles: '.env のロール → コースでのアカウントの役割',
      funding: '追加の各ロールが WALLET から受け取る XAH',
      algo: 'コース全体で seed は secp256k1 として読み込むため、同じ方式で生成する',
      faucet: '1. メインアカウントは faucet から取得（リクエストは1分に1回まで）',
      payment: '2. その他のロールは WALLET からの Payment で作成: アカウントは\n  //    ベースリザーブ以上の XAH を受け取った時点でレジャー上に存在する',
      unfunded: 'tecUNFUNDED_PAYMENT: WALLET のリザーブを超える残高が FUNDING XAH 未満',
      list: '3. 各ロールのアドレス（レッスンでアドレスを求められたら貼り付ける）',
    },
    m: {
      failed: (role, code) => `\`\${${role}} の作成が \${${code}} で失敗しました。WALLET に残高はありますか？\``,
    },
    col: ['変数', 'ロール', '初めて使うレッスン'],
    module: 'モジュール',
    theory: (table, output) => `### コースのアカウント

モジュール5以降、スクリプトは \`.env\` からアカウントを読み込みます。ほとんどのレッスンはメインアカウントだけで足りますが、トークンの発行者、購入者、Check の受取人など、もう一方の当事者が必要なレッスンもあります。ロールごとに \`.env\` に専用の seed があります。

${table}

\`create-accounts.js\`（コードタブ）は、これらを一度にすべて作成します。次の4つのルールに従います。

1. **faucet から取得するのはメインアカウントだけです。** テストネットの faucet はリクエストを1分に1回しか受け付けないため、8つのアカウントを要求するスクリプトは2つ目で失敗します。
2. **その他のアカウントは \`WALLET\` からの Payment で作成します。** アカウントはベースリザーブ（テストネットでは 1 XAH）以上を受け取った時点でレジャー上に存在するため、新しいアドレスへの 50 XAH の Payment 1回で作成と入金が完了します。
3. **鍵は secp256k1 です。** コースのスクリプトはすべて \`{ algorithm: "secp256k1" }\` で seed を読み込みます。ライブラリのデフォルト（ed25519）で生成した seed は別のアドレスとして読み込まれます。
4. **上書きしません。** \`.env\` にあるロールはそのまま残り、再実行しても足りないものだけを作成します。

\`.env\` があるコースのフォルダで実行します。

\`\`\`bash
node create-accounts.js
\`\`\`

空の \`.env\` で実行したテストネットでの出力:

\`\`\`
${output}
\`\`\`

- **\`funded by the faucet\`**: \`WALLET_SEED\` がなかったため、faucet がテスト用 1,000 XAH でアカウントを作成しました。
- **\`created with 50 XAH\`**: \`WALLET\` からの Payment が \`tesSUCCESS\` を返し、新しいアカウントが作成され、その seed が \`.env\` に保存されました。
- **\`Accounts in .env\`**: 各ロールのアドレスです。レッスンでアドレス（送金先、発行者）を求められたら、このいずれかを指します。

**注意するケース:**
- **\`… が tecUNFUNDED_PAYMENT で失敗しました\`**: \`WALLET\` のリザーブを超える残高が 50 XAH 未満です。\`.env\` から \`WALLET_SEED\` の行を削除してスクリプトを再実行すると、faucet から新しいアカウントを取得します。作成済みのロールは残ります。
- **初回実行時の faucet エラー**（ライブラリは \`Cannot read properties of undefined\` と表示します）: 1分以内の2回目のリクエストを faucet が拒否しました。1分待って再実行してください。
- **スクリプトが「… が .env にありません。先に create-accounts.js を実行してください」で停止する**: レッスンがまだ作成していないロールを使っています。このスクリプトを実行してください。足りないものだけを追加します。
- これらの seed は平文で保存されます。テストネットでのみ使い、メインネットでは絶対に使わないでください。

\`.env.example\` はすべてのロールを seed なしで列挙しているので、\`.env\` の構成を安全に共有できます。`,
  },

  ko: {
    file: '파일',
    blockTitle: 'create-accounts.js — 강의에서 쓰는 모든 계정을 .env에 저장',
    envTitle: '.env.example — create-accounts.js가 기록하는 역할',
    envNote: '강의에서 쓰는 모든 계정. 없는 계정은 create-accounts.js가 만듭니다.',
    roles: {
      WALLET_SEED: '메인 계정',
      ISSUER_SEED: '토큰을 발행 (모듈 7)',
      RESERVE_SEED: '토큰을 보유하고 배포 (모듈 7)',
      FROZEN_SEED: 'TrustLine이 동결되는 토큰 보유자 (모듈 7)',
      BUYER_SEED: 'URIToken을 구매 (모듈 8)',
      CASH_SEED: 'Check를 받아 현금화 (모듈 10)',
      ORACLE_SEED: '가격 Oracle을 게시 (모듈 10)',
      HOLDER_SEED: 'IOU 보상을 청구 (모듈 10)',
    },
    c: {
      head: '강의에서 쓰는 모든 테스트넷 계정을 만들고 seed를 .env에 저장합니다.\n// 다시 실행해도 안전합니다. .env에 이미 있는 역할은 그대로 두고 없는 것만 만듭니다.',
      roles: '.env의 역할 → 강의에서 계정이 하는 일',
      funding: '추가 역할마다 WALLET에서 받는 XAH',
      algo: '강의 전체에서 seed를 secp256k1로 불러오므로 같은 방식으로 생성',
      faucet: '1. 메인 계정은 faucet에서 받음 (요청은 1분에 한 번만 허용)',
      payment: '2. 나머지 역할은 WALLET의 Payment로 생성: 계정은 기본 준비금 이상의\n  //    XAH를 받는 순간 레저에 존재하게 됨',
      unfunded: 'tecUNFUNDED_PAYMENT: WALLET의 준비금을 뺀 잔액이 FUNDING XAH보다 적음',
      list: '3. 각 역할의 주소 (레슨에서 주소를 요구하면 붙여 넣기)',
    },
    m: {
      failed: (role, code) => `\`\${${role}} 생성이 \${${code}}(으)로 실패했습니다. WALLET에 잔액이 있나요?\``,
    },
    col: ['변수', '역할', '처음 쓰는 레슨'],
    module: '모듈',
    theory: (table, output) => `### 강의 계정

모듈 5부터 스크립트는 \`.env\`에서 계정을 읽습니다. 대부분의 레슨은 메인 계정만 있으면 되지만, 토큰 발행자, 구매자, Check 수취인처럼 두 번째 당사자가 필요한 레슨도 있습니다. 역할마다 \`.env\`에 별도의 seed가 있습니다.

${table}

\`create-accounts.js\`(코드 탭)는 이 계정들을 한 번에 모두 만듭니다. 네 가지 규칙을 따릅니다.

1. **faucet에서 받는 것은 메인 계정뿐입니다.** 테스트넷 faucet은 요청을 1분에 한 번만 받고 나머지는 거부하므로, 계정 8개를 요청하는 스크립트는 두 번째에서 실패합니다.
2. **나머지 계정은 \`WALLET\`의 Payment로 만듭니다.** 계정은 기본 준비금(테스트넷에서 1 XAH) 이상을 받는 순간 레저에 존재하므로, 새 주소로 50 XAH를 보내는 Payment 하나로 계정 생성과 충전이 끝납니다.
3. **키는 secp256k1입니다.** 강의의 모든 스크립트는 \`{ algorithm: "secp256k1" }\`로 seed를 불러옵니다. 라이브러리 기본값(ed25519)으로 만든 seed는 다른 주소로 불러와집니다.
4. **덮어쓰지 않습니다.** \`.env\`에 이미 있는 역할은 유지되고, 다시 실행하면 없는 것만 만듭니다.

\`.env\`가 있는 강의 폴더에서 실행하세요.

\`\`\`bash
node create-accounts.js
\`\`\`

빈 \`.env\`로 실행한 테스트넷 출력:

\`\`\`
${output}
\`\`\`

- **\`funded by the faucet\`**: \`WALLET_SEED\`가 없어서 faucet이 테스트용 1,000 XAH로 계정을 만들었습니다.
- **\`created with 50 XAH\`**: \`WALLET\`의 Payment가 \`tesSUCCESS\`를 반환했으므로 새 계정이 생겼고 seed가 \`.env\`에 저장되었습니다.
- **\`Accounts in .env\`**: 각 역할의 주소입니다. 레슨에서 주소(수신자, 발행자)를 요구하면 이 중 하나를 뜻합니다.

**주의할 경우:**
- **\`… 생성이 tecUNFUNDED_PAYMENT(으)로 실패했습니다\`**: \`WALLET\`의 준비금을 뺀 잔액이 50 XAH보다 적습니다. \`.env\`에서 \`WALLET_SEED\` 줄을 지우고 스크립트를 다시 실행하면 faucet에서 새 계정을 받습니다. 이미 만든 역할은 그대로 남습니다.
- **첫 실행에서 faucet 오류**(라이브러리는 \`Cannot read properties of undefined\`로 표시): 1분 안에 들어온 두 번째 요청을 faucet이 거부했습니다. 1분 기다렸다가 다시 실행하세요.
- **스크립트가 "…가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요"로 멈춤**: 레슨이 아직 만들지 않은 역할을 사용합니다. 이 스크립트를 실행하세요. 없는 것만 추가합니다.
- 이 seed들은 평문으로 저장됩니다. 테스트넷에서만 쓰고 메인넷에서는 절대 쓰지 마세요.

\`.env.example\`은 모든 역할을 seed 없이 나열하므로 \`.env\`의 구성을 안전하게 공유할 수 있습니다.`,
  },

  zh: {
    file: '文件',
    blockTitle: 'create-accounts.js — 本课程用到的所有账户，保存到 .env',
    envTitle: '.env.example — create-accounts.js 写入的角色',
    envNote: '课程用到的所有账户。缺少的由 create-accounts.js 创建。',
    roles: {
      WALLET_SEED: '你的主账户',
      ISSUER_SEED: '发行代币（模块 7）',
      RESERVE_SEED: '持有并分发代币（模块 7）',
      FROZEN_SEED: 'TrustLine 被冻结的代币持有者（模块 7）',
      BUYER_SEED: '购买 URIToken（模块 8）',
      CASH_SEED: '接收并兑现 Check（模块 10）',
      ORACLE_SEED: '发布价格 Oracle（模块 10）',
      HOLDER_SEED: '领取 IOU 奖励（模块 10）',
    },
    c: {
      head: '创建课程用到的所有测试网账户，并把 seed 保存到 .env。\n// 可以重复运行：.env 中已有的角色会保留，只创建缺少的。',
      roles: '.env 中的角色 → 该账户在课程中的用途',
      funding: '每个额外角色从 WALLET 收到的 XAH',
      algo: '整个课程都以 secp256k1 加载 seed，所以也用它生成',
      faucet: '1. 主账户来自 faucet（每分钟只接受一次请求）',
      payment: '2. 其他角色都由 WALLET 发出的 Payment 创建：账户一旦收到\n  //    不少于基础储备的 XAH，就在账本上存在',
      unfunded: 'tecUNFUNDED_PAYMENT：WALLET 超出储备的余额少于 FUNDING XAH',
      list: '3. 每个角色的地址，课程要求填写地址时粘贴',
    },
    m: {
      failed: (role, code) => `\`创建 \${${role}} 失败：\${${code}}。WALLET 有余额吗？\``,
    },
    col: ['变量', '角色', '首次使用'],
    module: '模块',
    theory: (table, output) => `### 课程账户

从模块 5 开始，脚本从 \`.env\` 读取账户。大多数课程只需要你的主账户，但有些需要另一方：代币发行者、买家、Check 的收款人。每个角色在 \`.env\` 中都有自己的 seed：

${table}

\`create-accounts.js\`（在代码标签页中）一次创建所有这些账户。它遵循四条规则：

1. **只有主账户来自 faucet。** 测试网 faucet 每分钟只接受一次请求，其余的都会被拒绝，所以向它申请八个账户的脚本会在第二个就失败。
2. **其他账户都由 \`WALLET\` 发出的 Payment 创建。** 账户一旦收到不少于基础储备（测试网上为 1 XAH）的金额，就在账本上存在，所以向新地址发送 50 XAH 的 Payment 在一笔交易里完成创建和注资。
3. **密钥使用 secp256k1。** 课程中的每个脚本都用 \`{ algorithm: "secp256k1" }\` 加载 seed。用库的默认算法（ed25519）生成的 seed 会被加载成另一个地址。
4. **从不覆盖。** \`.env\` 中已有的角色会保留；再次运行只创建缺少的。

在存放 \`.env\` 的课程文件夹中运行：

\`\`\`bash
node create-accounts.js
\`\`\`

使用空 \`.env\` 时在测试网上的输出：

\`\`\`
${output}
\`\`\`

- **\`funded by the faucet\`**：缺少 \`WALLET_SEED\`，所以 faucet 用 1,000 测试 XAH 创建了该账户。
- **\`created with 50 XAH\`**：来自 \`WALLET\` 的 Payment 返回 \`tesSUCCESS\`，新账户已存在，它的 seed 已写入 \`.env\`。
- **\`Accounts in .env\`**：每个角色的地址。课程要求填写地址（收款方、发行者）时，指的就是其中之一。

**需要注意的情况：**
- **\`创建 … 失败：tecUNFUNDED_PAYMENT\`**：\`WALLET\` 超出储备的余额少于 50 XAH。从 \`.env\` 中删除 \`WALLET_SEED\` 这一行并重新运行脚本，就会从 faucet 获得新账户；已创建的角色会保留。
- **首次运行时 faucet 报错**（库显示为 \`Cannot read properties of undefined\`）：faucet 拒绝了一分钟内的第二次请求。等一分钟再运行。
- **脚本停在“… 不在 .env 中：请先运行 create-accounts.js”**：该课程用到了你还没创建的角色。运行这个脚本，它只会补上缺少的。
- 这些 seed 以明文保存。只在测试网使用，绝不要用在主网上。

\`.env.example\` 列出所有角色但不含 seed，可以放心地分享你的 \`.env\` 结构。`,
  },

  ar: {
    file: 'الملف',
    blockTitle: 'create-accounts.js — كل حسابات الدورة، محفوظة في .env',
    envTitle: '.env.example — الأدوار التي يكتبها create-accounts.js',
    envNote: 'كل الحسابات التي تستخدمها الدورة. create-accounts.js ينشئ الناقص منها.',
    roles: {
      WALLET_SEED: 'حسابك الرئيسي',
      ISSUER_SEED: 'يُصدر token (الوحدة 7)',
      RESERVE_SEED: 'يحتفظ بالـ token ويوزعه (الوحدة 7)',
      FROZEN_SEED: 'حامل token تُجمَّد TrustLine الخاصة به (الوحدة 7)',
      BUYER_SEED: 'يشتري URIToken (الوحدة 8)',
      CASH_SEED: 'يستلم Check ويصرفه (الوحدة 10)',
      ORACLE_SEED: 'ينشر Oracle للأسعار (الوحدة 10)',
      HOLDER_SEED: 'يطالب بمكافآت IOU (الوحدة 10)',
    },
    c: {
      head: 'ينشئ كل حسابات testnet التي تستخدمها الدورة ويحفظ seed كل منها في .env.\n// يمكن تشغيله مجددًا بأمان: الأدوار الموجودة في .env تبقى، ويُنشأ الناقص فقط.',
      roles: 'الدور في .env → ما يفعله الحساب في الدورة',
      funding: 'مقدار XAH الذي يتلقاه كل دور إضافي من WALLET',
      algo: 'كل seeds الدورة تُحمَّل بـ secp256k1، لذلك تُولَّد بها',
      faucet: '1. الحساب الرئيسي يأتي من faucet (طلب واحد في الدقيقة)',
      payment: '2. بقية الأدوار تُنشأ بـ Payment من WALLET: يوجد الحساب في ledger\n  //    بمجرد أن يتلقى على الأقل الاحتياطي الأساسي بالـ XAH',
      unfunded: 'tecUNFUNDED_PAYMENT: رصيد WALLET فوق الاحتياطي أقل من FUNDING XAH',
      list: '3. عنوان كل دور، لتلصقه حين يطلب درس عنوانًا',
    },
    m: {
      failed: (role, code) => `\`فشل إنشاء \${${role}} بالنتيجة \${${code}}. هل لدى WALLET رصيد؟\``,
    },
    col: ['المتغير', 'الدور', 'أول استخدام'],
    module: 'الوحدة',
    theory: (table, output) => `### حسابات الدورة

ابتداءً من الوحدة 5، تقرأ السكربتات حساباتها من \`.env\`. معظم الدروس تحتاج حسابك الرئيسي فقط، لكن بعضها يحتاج طرفًا ثانيًا: مُصدر token، أو مشترٍ، أو مستلم Check. لكل دور seed خاص به في \`.env\`:

${table}

\`create-accounts.js\` (في تبويب الكود) ينشئها كلها في تشغيل واحد، ويتبع أربع قواعد:

1. **الحساب الرئيسي وحده يأتي من faucet.** يقبل faucet الخاص بـ testnet طلبًا واحدًا في الدقيقة ويرفض الباقي، لذلك يفشل أي سكربت يطلب منه ثمانية حسابات عند الحساب الثاني.
2. **كل حساب آخر يُنشأ بـ Payment من \`WALLET\`.** يوجد الحساب في ledger بمجرد أن يتلقى على الأقل الاحتياطي الأساسي (1 XAH على testnet)، لذلك فإن Payment بقيمة 50 XAH إلى عنوان جديد ينشئه ويموله في معاملة واحدة.
3. **المفاتيح من نوع secp256k1.** كل سكربتات الدورة تحمّل الـ seeds بـ \`{ algorithm: "secp256k1" }\`. أما seed المولَّد بالخوارزمية الافتراضية للمكتبة (ed25519) فسيُحمَّل كعنوان مختلف.
4. **لا يكتب فوق أي شيء.** الأدوار الموجودة في \`.env\` تبقى، وعند تشغيله مجددًا ينشئ الناقص فقط.

شغّله من مجلد الدورة حيث يوجد \`.env\`:

\`\`\`bash
node create-accounts.js
\`\`\`

المخرجات على testnet مع \`.env\` فارغ:

\`\`\`
${output}
\`\`\`

- **\`funded by the faucet\`**: كان \`WALLET_SEED\` مفقودًا، فأنشأ faucet الحساب بـ 1,000 XAH تجريبية.
- **\`created with 50 XAH\`**: أعاد Payment من \`WALLET\` النتيجة \`tesSUCCESS\`، فالحساب الجديد موجود الآن و seed الخاص به في \`.env\`.
- **\`Accounts in .env\`**: عنوان كل دور. حين يطلب درس عنوانًا (وجهة أو مُصدرًا)، فالمقصود أحد هذه العناوين.

**حالات يجب الانتباه لها:**
- **\`فشل إنشاء … بالنتيجة tecUNFUNDED_PAYMENT\`**: رصيد \`WALLET\` فوق الاحتياطي أقل من 50 XAH. احذف سطر \`WALLET_SEED\` من \`.env\` وأعد تشغيل السكربت للحصول على حساب جديد من faucet؛ الأدوار التي أُنشئت تبقى.
- **خطأ من faucet في التشغيل الأول** (تعرضه المكتبة على شكل \`Cannot read properties of undefined\`): رفض faucet طلبًا ثانيًا خلال الدقيقة نفسها. انتظر دقيقة وأعد التشغيل.
- **يتوقف سكربت برسالة "… غير موجود في .env: شغّل create-accounts.js أولاً"**: الدرس يستخدم دورًا لم تنشئه بعد. شغّل هذا السكربت؛ فهو يضيف الناقص فقط.
- هذه الـ seeds محفوظة كنص صريح. استخدمها على testnet فقط، ولا تستخدمها أبدًا على mainnet.

\`.env.example\` يسرد كل الأدوار بدون الـ seeds، لتشارك بنية ملف \`.env\` بأمان.`,
  },
}

// ── Builders ────────────────────────────────────────────────────────────────

function script(t) {
  const roles = ROLES.map((r) => `  ${r}: ${JSON.stringify(t.roles[r])},`).join('\n')
  return `// ${t.file}: create-accounts.js
// ${t.c.head}
require("dotenv").config();
const fs = require("fs");
const { Client, Wallet, ECDSA, xahToDrops } = require("xahau");

// ${t.c.roles}
const ROLES = {
${roles}
};
const FUNDING = "50"; // ${t.c.funding}

// ${t.c.algo}
const newWallet = () => Wallet.generate(ECDSA.secp256k1);
const load = (role) => Wallet.fromSeed(process.env[role], { algorithm: "secp256k1" });

function save(role, seed) {
  fs.appendFileSync(".env", \`\\n\${role}=\${seed}\\n\`);
  process.env[role] = seed;
}

async function createAccounts() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // ${t.c.faucet}
  if (!process.env.WALLET_SEED) {
    const wallet = newWallet();
    await client.fundWallet(wallet);
    save("WALLET_SEED", wallet.seed);
    console.log(\`✔ WALLET   \${wallet.address} funded by the faucet\`);
  }
  const main = load("WALLET_SEED");

  // ${t.c.payment}
  for (const role of Object.keys(ROLES).filter((r) => !process.env[r])) {
    const wallet = newWallet();
    const tx = await client.autofill({
      TransactionType: "Payment",
      Account: main.address,
      Destination: wallet.address,
      Amount: xahToDrops(FUNDING),
    });
    const { result } = await client.submitAndWait(main.sign(tx).tx_blob);
    const code = result.meta.TransactionResult;
    if (code !== "tesSUCCESS") {
      // ${t.c.unfunded}
      throw new Error(${t.m.failed('role', 'code')});
    }
    save(role, wallet.seed);
    console.log(\`✔ \${role.replace("_SEED", "").padEnd(8)} \${wallet.address} created with \${FUNDING} XAH\`);
  }

  // ${t.c.list}
  console.log("\\nAccounts in .env:");
  for (const [role, purpose] of Object.entries(ROLES)) {
    console.log(\`  \${role.replace("_SEED", "").padEnd(8)} \${load(role).address}  \${purpose}\`);
  }

  await client.disconnect();
}

createAccounts().catch((err) => {
  console.error("✘", err.message);
  process.exit(1);
});`
}

const envExample = (t) =>
  `# ${t.file}: .env.example\n# ${t.envNote}\n` + ROLES.map((r) => `${r}=`).join('\n')

function table(t) {
  const rows = ROLES.map((r) => {
    const { m, l } = ROLE_LESSON[r]
    return `| \`${r}\` | ${t.roles[r].replace(/\s*[(（][^)）]*[)）]$/, '')} | [${t.module} ${m}](?m=${m}&l=${l}) |`
  })
  return [`| ${t.col.join(' | ')} |`, '|---|---|---|', ...rows].join('\n')
}

/**
 * Adds the course accounts to the faucet lesson (Module 3 lesson 2): a theory
 * section and two code blocks, in every language. Runs after a module's own
 * translation merges, so the index-based French and Arabic arrays are untouched.
 */
export function addCourseAccounts(moduleData, lessonId) {
  const lesson = moduleData.lessons.find((l) => l.id === lessonId)
  const langs = Object.keys(T)
  for (const lang of langs) {
    const t = T[lang]
    lesson.theory[lang] = `${lesson.theory[lang] ?? lesson.theory.en}\n\n${t.theory(table(t), OUTPUT)}`
  }
  // Written in every language here, so the derived French and Arabic code skips them
  const block = (title, language, code) => ({
    manual: true,
    title: Object.fromEntries(langs.map((lang) => [lang, title(T[lang])])),
    language,
    code: Object.fromEntries(langs.map((lang) => [lang, code(T[lang])])),
  })
  lesson.codeBlocks.push(
    block((t) => t.blockTitle, 'javascript', script),
    block((t) => t.envTitle, 'bash', envExample),
  )
}

/**
 * The line a script puts before loading a role's seed, so a missing role
 * stops it with a message naming what to run, in the lesson's language.
 */
export const MISSING_ROLE = {
  en: (r) => `${r} is not in .env: run create-accounts.js first (Module 3, lesson 2)`,
  es: (r) => `${r} no está en .env: ejecuta primero create-accounts.js (módulo 3, lección 2)`,
  pt: (r) => `${r} não está no .env: execute primeiro create-accounts.js (módulo 3, lição 2)`,
  fr: (r) => `${r} absent de .env : exécute d'abord create-accounts.js (module 3, leçon 2)`,
  jp: (r) => `${r} が .env にありません。先に create-accounts.js を実行してください（モジュール3・レッスン2）`,
  ko: (r) => `${r}가 .env에 없습니다. 먼저 create-accounts.js를 실행하세요 (모듈 3, 레슨 2)`,
  zh: (r) => `${r} 不在 .env 中：请先运行 create-accounts.js（模块 3，第 2 课）`,
  ar: (r) => `${r} غير موجود في .env: شغّل create-accounts.js أولاً (الوحدة 3، الدرس 2)`,
}
