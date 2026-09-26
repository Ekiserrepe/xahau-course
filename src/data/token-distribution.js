/**
 * Step 4 of the token lesson (Module 7 lesson 2): `distribute-token.js`, which
 * sends part of the supply from RESERVE to a holder, in every language.
 *
 * This is the course's first IOU Payment. It lives here, right after the token
 * is issued, because both of its prerequisites (a token, and a TrustLine to its
 * issuer) are built in this module; Module 6 explains the IOU Amount and links
 * forward to it.
 */
import { MISSING_ROLE } from './course-accounts.js'

// Real testnet output, run right after the complete process
const OUTPUT = `TrustLine holder → issuer: tesSUCCESS
IOU Payment reserve → holder: tesSUCCESS
Reserve balance: 999900
Holder balance: 100`

const T = {
  en: {
    file: 'File',
    title: 'distribute-token.js — send part of the supply to a holder (IOU Payment)',
    c: [
      'Sends part of the token supply from RESERVE to a holder (WALLET): an IOU Payment.\n// Run it after the complete process above: ISSUER has DefaultRipple and RESERVE holds the supply.',
      'The same token as the complete process: "YourTokenName" is longer than 3 characters,\n// so its currency code is the name in hex, padded to 40 characters',
      '1. The holder trusts the issuer for this token. Without the TrustLine,\n  //    step 2 fails with tecPATH_DRY',
      '2. RESERVE pays the holder in the token. For an IOU, Amount is an object:\n  //    currency, issuer and value. The payment ripples through the issuer',
      "3. Each side's balance, read from its TrustLine to the issuer",
    ],
    theory: (out) => `### Step 4: send the token to a holder

The complete process leaves the whole supply in RESERVE. Distributing it means paying holders **in the token**: an IOU Payment, whose \`Amount\` is an object with \`currency\`, \`issuer\` and \`value\` instead of a string of drops ([Module 6](?m=6&l=0) covers its fields). Two things must already be in place:

| Requirement | Why | Where it is done |
|---|---|---|
| The holder has a TrustLine to the issuer for this exact currency code | No account can hold a token it hasn't accepted; without the line the payment fails with \`tecPATH_DRY\` | Step 1 of \`distribute-token.js\` |
| The issuer has DefaultRipple | A payment from RESERVE to a holder moves through the issuer's balances (rippling), which DefaultRipple allows | Step 1 of the complete process |

\`distribute-token.js\` (in the Code tab) creates the holder's TrustLine, pays 100 units from RESERVE to \`WALLET\`, and prints both balances. It uses \`WALLET_SEED\`, \`ISSUER_SEED\` and \`RESERVE_SEED\` from \`.env\`. Run it after the complete process:

\`\`\`bash
node distribute-token.js
\`\`\`

Output on testnet:

\`\`\`
${out}
\`\`\`

- **\`TrustLine holder → issuer: tesSUCCESS\`**: \`WALLET\` now accepts up to 1,000,000 units of the token from ISSUER. Running the script again updates the same line, so it succeeds again.
- **\`IOU Payment reserve → holder: tesSUCCESS\`**: 100 units moved from RESERVE to \`WALLET\`. Neither account's XAH changes, except for the fee.
- **\`Reserve balance: 999900\`, \`Holder balance: 100\`**: the supply didn't grow; it moved. Only the issuer can create new units, by paying from the issuing account.

**Cases to watch:**
- **\`tecPATH_DRY\` on the payment**: the holder has no TrustLine for exactly this currency code and issuer. A name longer than 3 characters is sent as its 40-character hex code, and both sides must use the same code.
- **\`tecPATH_DRY\` although both TrustLines exist**: rippling is blocked when both lines have NoRipple on the issuer's side, which happens when they were created before the issuer set DefaultRipple. Set DefaultRipple before anyone trusts the token.
- **\`tecNO_LINE_INSUF_RESERVE\` on the TrustLine**: the holder doesn't have enough XAH above its reserve for one more owned object.`,
  },
  es: {
    file: 'Archivo',
    title: 'distribute-token.js — enviar parte del supply a un holder (pago IOU)',
    c: [
      'Envía parte del supply del token desde RESERVE a un holder (WALLET): un pago IOU.\n// Ejecútalo después del proceso completo: ISSUER tiene DefaultRipple y RESERVE guarda el supply.',
      'El mismo token que en el proceso completo: "YourTokenName" tiene más de 3 caracteres,\n// así que su código de moneda es el nombre en hex, rellenado hasta 40 caracteres',
      '1. El holder confía en el emisor para este token. Sin la TrustLine,\n  //    el paso 2 falla con tecPATH_DRY',
      '2. RESERVE paga al holder en el token. En un IOU, Amount es un objeto:\n  //    currency, issuer y value. El pago pasa (ripple) por el emisor',
      '3. El saldo de cada parte, leído de su TrustLine hacia el emisor',
    ],
    theory: (out) => `### Paso 4: enviar el token a un holder

El proceso completo deja todo el supply en RESERVE. Distribuirlo significa pagar a los holders **en el token**: un pago IOU, cuyo \`Amount\` es un objeto con \`currency\`, \`issuer\` y \`value\` en lugar de un string de drops (el [módulo 6](?m=6&l=0) explica sus campos). Antes deben cumplirse dos condiciones:

| Requisito | Por qué | Dónde se hace |
|---|---|---|
| El holder tiene una TrustLine hacia el emisor para exactamente este código de moneda | Ninguna cuenta puede tener un token que no ha aceptado; sin la línea el pago falla con \`tecPATH_DRY\` | Paso 1 de \`distribute-token.js\` |
| El emisor tiene DefaultRipple | Un pago de RESERVE a un holder pasa por los saldos del emisor (rippling), y DefaultRipple lo permite | Paso 1 del proceso completo |

\`distribute-token.js\` (en la pestaña Código) crea la TrustLine del holder, paga 100 unidades de RESERVE a \`WALLET\` e imprime los dos saldos. Usa \`WALLET_SEED\`, \`ISSUER_SEED\` y \`RESERVE_SEED\` de \`.env\`. Ejecútalo después del proceso completo:

\`\`\`bash
node distribute-token.js
\`\`\`

Salida en testnet:

\`\`\`
${out}
\`\`\`

- **\`TrustLine holder → issuer: tesSUCCESS\`**: \`WALLET\` acepta ahora hasta 1.000.000 unidades del token de ISSUER. Si vuelves a ejecutar el script, actualiza la misma línea y vuelve a devolver éxito.
- **\`IOU Payment reserve → holder: tesSUCCESS\`**: 100 unidades pasaron de RESERVE a \`WALLET\`. El XAH de ninguna de las dos cuentas cambia, salvo por el fee.
- **\`Reserve balance: 999900\`, \`Holder balance: 100\`**: el supply no creció, se movió. Solo el emisor puede crear unidades nuevas, pagando desde la cuenta emisora.

**Casos a vigilar:**
- **\`tecPATH_DRY\` en el pago**: el holder no tiene TrustLine para exactamente este código de moneda y este emisor. Un nombre de más de 3 caracteres se envía como su código hex de 40 caracteres, y las dos partes deben usar el mismo código.
- **\`tecPATH_DRY\` aunque existan las dos TrustLines**: el rippling se bloquea cuando las dos líneas tienen NoRipple del lado del emisor, lo que ocurre si se crearon antes de que el emisor activara DefaultRipple. Activa DefaultRipple antes de que nadie confíe en el token.
- **\`tecNO_LINE_INSUF_RESERVE\` en la TrustLine**: el holder no tiene suficiente XAH por encima de su reserva para un objeto más.`,
  },
  pt: {
    file: 'Arquivo',
    title: 'distribute-token.js — enviar parte do supply para um holder (pagamento IOU)',
    c: [
      'Envia parte do supply do token da RESERVE para um holder (WALLET): um pagamento IOU.\n// Execute-o depois do processo completo: o ISSUER tem DefaultRipple e a RESERVE guarda o supply.',
      'O mesmo token do processo completo: "YourTokenName" tem mais de 3 caracteres,\n// então seu código de moeda é o nome em hex, preenchido até 40 caracteres',
      '1. O holder confia no emissor para este token. Sem a TrustLine,\n  //    o passo 2 falha com tecPATH_DRY',
      '2. A RESERVE paga o holder no token. Em um IOU, Amount é um objeto:\n  //    currency, issuer e value. O pagamento passa (ripple) pelo emissor',
      '3. O saldo de cada parte, lido da sua TrustLine para o emissor',
    ],
    theory: (out) => `### Passo 4: enviar o token para um holder

O processo completo deixa todo o supply na RESERVE. Distribuí-lo significa pagar os holders **no token**: um pagamento IOU, cujo \`Amount\` é um objeto com \`currency\`, \`issuer\` e \`value\` em vez de uma string de drops (o [módulo 6](?m=6&l=0) explica seus campos). Duas condições precisam estar cumpridas antes:

| Requisito | Por quê | Onde é feito |
|---|---|---|
| O holder tem uma TrustLine para o emissor com exatamente este código de moeda | Nenhuma conta pode ter um token que não aceitou; sem a linha o pagamento falha com \`tecPATH_DRY\` | Passo 1 de \`distribute-token.js\` |
| O emissor tem DefaultRipple | Um pagamento da RESERVE para um holder passa pelos saldos do emissor (rippling), o que o DefaultRipple permite | Passo 1 do processo completo |

\`distribute-token.js\` (na aba Código) cria a TrustLine do holder, paga 100 unidades da RESERVE para a \`WALLET\` e imprime os dois saldos. Usa \`WALLET_SEED\`, \`ISSUER_SEED\` e \`RESERVE_SEED\` do \`.env\`. Execute-o depois do processo completo:

\`\`\`bash
node distribute-token.js
\`\`\`

Saída na testnet:

\`\`\`
${out}
\`\`\`

- **\`TrustLine holder → issuer: tesSUCCESS\`**: a \`WALLET\` agora aceita até 1.000.000 unidades do token do ISSUER. Se você executar o script de novo, ele atualiza a mesma linha e retorna sucesso outra vez.
- **\`IOU Payment reserve → holder: tesSUCCESS\`**: 100 unidades passaram da RESERVE para a \`WALLET\`. O XAH de nenhuma das contas muda, exceto pelo fee.
- **\`Reserve balance: 999900\`, \`Holder balance: 100\`**: o supply não cresceu, ele se moveu. Só o emissor pode criar unidades novas, pagando a partir da conta emissora.

**Casos para observar:**
- **\`tecPATH_DRY\` no pagamento**: o holder não tem TrustLine para exatamente este código de moeda e este emissor. Um nome com mais de 3 caracteres é enviado como seu código hex de 40 caracteres, e as duas partes precisam usar o mesmo código.
- **\`tecPATH_DRY\` mesmo com as duas TrustLines**: o rippling é bloqueado quando as duas linhas têm NoRipple do lado do emissor, o que acontece se foram criadas antes de o emissor ativar o DefaultRipple. Ative o DefaultRipple antes que alguém confie no token.
- **\`tecNO_LINE_INSUF_RESERVE\` na TrustLine**: o holder não tem XAH suficiente acima da reserva para mais um objeto.`,
  },
  fr: {
    file: 'Fichier',
    title: 'distribute-token.js — envoyer une partie de la supply à un détenteur (paiement IOU)',
    c: [
      "Envoie une partie de la supply du token de RESERVE à un détenteur (WALLET) : un paiement IOU.\n// Lance-le après le processus complet : ISSUER a DefaultRipple et RESERVE détient la supply.",
      "Le même token que le processus complet : \"YourTokenName\" dépasse 3 caractères,\n// son code de devise est donc le nom en hex, complété à 40 caractères",
      "1. Le détenteur fait confiance à l'émetteur pour ce token. Sans la TrustLine,\n  //    l'étape 2 échoue avec tecPATH_DRY",
      "2. RESERVE paie le détenteur dans le token. Pour un IOU, Amount est un objet :\n  //    currency, issuer et value. Le paiement transite (ripple) par l'émetteur",
      "3. Le solde de chaque partie, lu sur sa TrustLine vers l'émetteur",
    ],
    theory: (out) => `### Étape 4 : envoyer le token à un détenteur

Le processus complet laisse toute la supply dans RESERVE. La distribuer, c'est payer les détenteurs **dans le token** : un paiement IOU, dont l'\`Amount\` est un objet avec \`currency\`, \`issuer\` et \`value\` au lieu d'une string de drops (le [module 6](?m=6&l=0) détaille ses champs). Deux conditions doivent être remplies avant :

| Condition | Pourquoi | Où c'est fait |
|---|---|---|
| Le détenteur a une TrustLine vers l'émetteur pour exactement ce code de devise | Aucun compte ne peut détenir un token qu'il n'a pas accepté ; sans la ligne, le paiement échoue avec \`tecPATH_DRY\` | Étape 1 de \`distribute-token.js\` |
| L'émetteur a DefaultRipple | Un paiement de RESERVE vers un détenteur transite par les soldes de l'émetteur (rippling), ce que DefaultRipple autorise | Étape 1 du processus complet |

\`distribute-token.js\` (dans l'onglet Code) crée la TrustLine du détenteur, paie 100 unités de RESERVE à \`WALLET\` et affiche les deux soldes. Il utilise \`WALLET_SEED\`, \`ISSUER_SEED\` et \`RESERVE_SEED\` de \`.env\`. Lance-le après le processus complet :

\`\`\`bash
node distribute-token.js
\`\`\`

Sortie sur le testnet :

\`\`\`
${out}
\`\`\`

- **\`TrustLine holder → issuer: tesSUCCESS\`** : \`WALLET\` accepte désormais jusqu'à 1 000 000 unités du token d'ISSUER. Relancé, le script met à jour la même ligne et réussit à nouveau.
- **\`IOU Payment reserve → holder: tesSUCCESS\`** : 100 unités sont passées de RESERVE à \`WALLET\`. Le XAH des deux comptes ne change pas, hormis les frais.
- **\`Reserve balance: 999900\`, \`Holder balance: 100\`** : la supply n'a pas augmenté, elle s'est déplacée. Seul l'émetteur peut créer de nouvelles unités, en payant depuis le compte émetteur.

**Cas à surveiller :**
- **\`tecPATH_DRY\` sur le paiement** : le détenteur n'a pas de TrustLine pour exactement ce code de devise et cet émetteur. Un nom de plus de 3 caractères est envoyé sous forme de code hex de 40 caractères, et les deux parties doivent utiliser le même code.
- **\`tecPATH_DRY\` alors que les deux TrustLines existent** : le rippling est bloqué quand les deux lignes ont NoRipple du côté de l'émetteur, ce qui arrive si elles ont été créées avant que l'émetteur n'active DefaultRipple. Active DefaultRipple avant que quiconque fasse confiance au token.
- **\`tecNO_LINE_INSUF_RESERVE\` sur la TrustLine** : le détenteur n'a pas assez de XAH au-dessus de sa réserve pour un objet de plus.`,
  },
  jp: {
    file: 'ファイル',
    title: 'distribute-token.js — 供給量の一部を保有者に送る（IOU 支払い）',
    c: [
      'トークンの供給量の一部を RESERVE から保有者（WALLET）に送ります: IOU 支払いです。\n// 上の完全なプロセスの後に実行します: ISSUER は DefaultRipple を設定済みで、RESERVE が供給量を保有しています。',
      '完全なプロセスと同じトークン: "YourTokenName" は3文字を超えるため、\n// 通貨コードは名前を hex にして40文字まで埋めたもの',
      '1. 保有者がこのトークンについて発行者を信頼する。TrustLine がないと\n  //    ステップ2は tecPATH_DRY で失敗する',
      '2. RESERVE が保有者にトークンで支払う。IOU では Amount はオブジェクト:\n  //    currency、issuer、value。支払いは発行者を経由（ripple）する',
      '3. 各当事者の残高（発行者への TrustLine から読み取る）',
    ],
    theory: (out) => `### ステップ4: トークンを保有者に送る

完全なプロセスでは、供給量はすべて RESERVE に残ります。配布とは、保有者に**トークンで**支払うことです。つまり IOU 支払いで、その \`Amount\` は drops の文字列ではなく \`currency\`、\`issuer\`、\`value\` を持つオブジェクトです（フィールドは[モジュール6](?m=6&l=0)で説明しています）。事前に2つの条件が必要です。

| 条件 | 理由 | 実施する場所 |
|---|---|---|
| 保有者が、まさにこの通貨コードについて発行者への TrustLine を持っている | 受け入れていないトークンはどのアカウントも保有できず、ラインがないと支払いは \`tecPATH_DRY\` で失敗する | \`distribute-token.js\` のステップ1 |
| 発行者が DefaultRipple を設定している | RESERVE から保有者への支払いは発行者の残高を経由（rippling）し、DefaultRipple がそれを許可する | 完全なプロセスのステップ1 |

\`distribute-token.js\`（コードタブ）は保有者の TrustLine を作成し、RESERVE から \`WALLET\` へ100単位を支払い、両方の残高を表示します。\`.env\` の \`WALLET_SEED\`、\`ISSUER_SEED\`、\`RESERVE_SEED\` を使います。完全なプロセスの後に実行してください。

\`\`\`bash
node distribute-token.js
\`\`\`

テストネットでの出力:

\`\`\`
${out}
\`\`\`

- **\`TrustLine holder → issuer: tesSUCCESS\`**: \`WALLET\` は ISSUER のトークンを最大 1,000,000 単位まで受け入れるようになりました。スクリプトを再実行すると同じラインを更新するため、再び成功します。
- **\`IOU Payment reserve → holder: tesSUCCESS\`**: 100単位が RESERVE から \`WALLET\` に移動しました。手数料以外、どちらのアカウントの XAH も変わりません。
- **\`Reserve balance: 999900\`、\`Holder balance: 100\`**: 供給量は増えておらず、移動しただけです。新しい単位を作れるのは発行者だけで、発行アカウントから支払うことで作ります。

**注意するケース:**
- **支払いで \`tecPATH_DRY\`**: 保有者が、まさにこの通貨コードと発行者の TrustLine を持っていません。3文字を超える名前は40文字の hex コードとして送られるため、両者が同じコードを使う必要があります。
- **両方の TrustLine があるのに \`tecPATH_DRY\`**: 両方のラインの発行者側に NoRipple がある場合、rippling はブロックされます。発行者が DefaultRipple を設定する前にラインが作成されると、こうなります。誰かがトークンを信頼する前に DefaultRipple を設定してください。
- **TrustLine で \`tecNO_LINE_INSUF_RESERVE\`**: 保有者のリザーブを超える XAH が、オブジェクトをもう1つ持つのに足りません。`,
  },
  ko: {
    file: '파일',
    title: 'distribute-token.js — 공급량 일부를 보유자에게 보내기 (IOU 결제)',
    c: [
      '토큰 공급량 일부를 RESERVE에서 보유자(WALLET)에게 보냅니다: IOU 결제입니다.\n// 위의 전체 과정 다음에 실행하세요: ISSUER에 DefaultRipple이 설정되어 있고 RESERVE가 공급량을 보유합니다.',
      '전체 과정과 같은 토큰: "YourTokenName"은 3자를 넘으므로\n// 통화 코드는 이름을 hex로 바꿔 40자로 채운 값',
      '1. 보유자가 이 토큰에 대해 발행자를 신뢰. TrustLine이 없으면\n  //    2단계가 tecPATH_DRY로 실패',
      '2. RESERVE가 보유자에게 토큰으로 지불. IOU의 Amount는 객체:\n  //    currency, issuer, value. 결제는 발행자를 거쳐(ripple) 이동',
      '3. 발행자로 향하는 TrustLine에서 읽은 각 당사자의 잔액',
    ],
    theory: (out) => `### 4단계: 보유자에게 토큰 보내기

전체 과정이 끝나면 공급량 전체가 RESERVE에 있습니다. 배포한다는 것은 보유자에게 **토큰으로** 지불하는 것, 즉 IOU 결제입니다. 이때 \`Amount\`는 drops 문자열이 아니라 \`currency\`, \`issuer\`, \`value\`를 가진 객체입니다(필드는 [모듈 6](?m=6&l=0)에서 설명합니다). 먼저 두 가지 조건이 갖춰져야 합니다.

| 조건 | 이유 | 처리하는 곳 |
|---|---|---|
| 보유자가 정확히 이 통화 코드에 대해 발행자로 향하는 TrustLine을 가짐 | 어떤 계정도 받아들이지 않은 토큰은 보유할 수 없으며, 라인이 없으면 결제가 \`tecPATH_DRY\`로 실패 | \`distribute-token.js\`의 1단계 |
| 발행자에 DefaultRipple이 설정됨 | RESERVE에서 보유자로 가는 결제는 발행자의 잔액을 거쳐(rippling) 이동하며, DefaultRipple이 이를 허용 | 전체 과정의 1단계 |

\`distribute-token.js\`(코드 탭)는 보유자의 TrustLine을 만들고, RESERVE에서 \`WALLET\`으로 100단위를 지불한 뒤 두 잔액을 출력합니다. \`.env\`의 \`WALLET_SEED\`, \`ISSUER_SEED\`, \`RESERVE_SEED\`를 사용합니다. 전체 과정 다음에 실행하세요.

\`\`\`bash
node distribute-token.js
\`\`\`

테스트넷 출력:

\`\`\`
${out}
\`\`\`

- **\`TrustLine holder → issuer: tesSUCCESS\`**: 이제 \`WALLET\`은 ISSUER의 토큰을 최대 1,000,000단위까지 받습니다. 스크립트를 다시 실행하면 같은 라인을 갱신하므로 다시 성공합니다.
- **\`IOU Payment reserve → holder: tesSUCCESS\`**: 100단위가 RESERVE에서 \`WALLET\`으로 이동했습니다. 수수료를 빼면 두 계정의 XAH는 변하지 않습니다.
- **\`Reserve balance: 999900\`, \`Holder balance: 100\`**: 공급량은 늘지 않고 이동했을 뿐입니다. 새 단위는 발행자만 발행 계정에서 지불해 만들 수 있습니다.

**주의할 경우:**
- **결제에서 \`tecPATH_DRY\`**: 보유자에게 정확히 이 통화 코드와 발행자에 대한 TrustLine이 없습니다. 3자를 넘는 이름은 40자 hex 코드로 전송되므로 양쪽이 같은 코드를 써야 합니다.
- **두 TrustLine이 모두 있는데 \`tecPATH_DRY\`**: 두 라인 모두 발행자 쪽에 NoRipple이 있으면 rippling이 막힙니다. 발행자가 DefaultRipple을 설정하기 전에 라인이 만들어지면 이렇게 됩니다. 누군가 토큰을 신뢰하기 전에 DefaultRipple을 설정하세요.
- **TrustLine에서 \`tecNO_LINE_INSUF_RESERVE\`**: 보유자의 준비금을 넘는 XAH가 객체 하나를 더 가지기에 부족합니다.`,
  },
  zh: {
    file: '文件',
    title: 'distribute-token.js — 把部分供应量发送给持有者（IOU 支付）',
    c: [
      '把部分代币供应量从 RESERVE 发送给持有者（WALLET）：一笔 IOU 支付。\n// 在上面的完整流程之后运行：ISSUER 已设置 DefaultRipple，RESERVE 持有全部供应量。',
      '与完整流程相同的代币："YourTokenName" 超过 3 个字符，\n// 所以它的货币代码是名称的 hex，补齐到 40 个字符',
      '1. 持有者为这个代币信任发行者。没有 TrustLine 时，\n  //    第 2 步会以 tecPATH_DRY 失败',
      '2. RESERVE 用代币向持有者付款。IOU 的 Amount 是一个对象：\n  //    currency、issuer 和 value。付款会经由发行者（ripple）',
      '3. 各方余额，从其指向发行者的 TrustLine 读取',
    ],
    theory: (out) => `### 第 4 步：把代币发送给持有者

完整流程结束后，全部供应量都在 RESERVE 中。分发就是**用代币**向持有者付款：一笔 IOU 支付，它的 \`Amount\` 不是 drops 字符串，而是包含 \`currency\`、\`issuer\` 和 \`value\` 的对象（字段说明见[模块6](?m=6&l=0)）。事先必须满足两个条件：

| 条件 | 原因 | 在哪里完成 |
|---|---|---|
| 持有者针对这个确切的货币代码建立了指向发行者的 TrustLine | 任何账户都不能持有未接受的代币；没有这条线，付款会以 \`tecPATH_DRY\` 失败 | \`distribute-token.js\` 的第 1 步 |
| 发行者已设置 DefaultRipple | 从 RESERVE 到持有者的付款会经过发行者的余额（rippling），DefaultRipple 允许这样做 | 完整流程的第 1 步 |

\`distribute-token.js\`（在代码标签页中）创建持有者的 TrustLine，从 RESERVE 向 \`WALLET\` 支付 100 个单位，并打印双方余额。它使用 \`.env\` 中的 \`WALLET_SEED\`、\`ISSUER_SEED\` 和 \`RESERVE_SEED\`。在完整流程之后运行：

\`\`\`bash
node distribute-token.js
\`\`\`

测试网上的输出：

\`\`\`
${out}
\`\`\`

- **\`TrustLine holder → issuer: tesSUCCESS\`**：\`WALLET\` 现在最多接受 ISSUER 的 1,000,000 个单位。再次运行脚本会更新同一条线，因此会再次成功。
- **\`IOU Payment reserve → holder: tesSUCCESS\`**：100 个单位从 RESERVE 转到了 \`WALLET\`。除手续费外，两个账户的 XAH 都没有变化。
- **\`Reserve balance: 999900\`、\`Holder balance: 100\`**：供应量没有增加，只是转移了。只有发行者能从发行账户付款来创建新单位。

**需要注意的情况：**
- **付款返回 \`tecPATH_DRY\`**：持有者没有针对这个确切货币代码和发行者的 TrustLine。超过 3 个字符的名称会以 40 字符的 hex 代码发送，双方必须使用相同的代码。
- **两条 TrustLine 都存在却仍是 \`tecPATH_DRY\`**：当两条线在发行者一侧都带有 NoRipple 时，rippling 会被阻止；如果这些线是在发行者设置 DefaultRipple 之前建立的，就会这样。在任何人信任该代币之前设置 DefaultRipple。
- **TrustLine 返回 \`tecNO_LINE_INSUF_RESERVE\`**：持有者超出储备的 XAH 不够再拥有一个对象。`,
  },
  ar: {
    file: 'الملف',
    title: 'distribute-token.js — إرسال جزء من المعروض إلى حامل (دفعة IOU)',
    c: [
      'يرسل جزءًا من معروض الـ token من RESERVE إلى حامل (WALLET): دفعة IOU.\n// شغّله بعد العملية الكاملة أعلاه: لدى ISSUER خاصية DefaultRipple، و RESERVE يحتفظ بالمعروض.',
      'نفس token العملية الكاملة: "YourTokenName" أطول من 3 أحرف،\n// لذلك رمز العملة هو الاسم بصيغة hex مكمَّلًا إلى 40 حرفًا',
      '1. الحامل يثق بالمُصدر لهذا الـ token. بدون TrustLine\n  //    تفشل الخطوة 2 بالنتيجة tecPATH_DRY',
      '2. RESERVE يدفع للحامل بالـ token. في IOU يكون Amount كائنًا:\n  //    currency و issuer و value. تمر الدفعة عبر المُصدر (ripple)',
      '3. رصيد كل طرف، مقروءًا من TrustLine الخاصة به نحو المُصدر',
    ],
    theory: (out) => `### الخطوة 4: إرسال الـ token إلى حامل

تترك العملية الكاملة المعروض كله في RESERVE. توزيعه يعني الدفع للحاملين **بالـ token**: دفعة IOU يكون فيها \`Amount\` كائنًا يحتوي \`currency\` و \`issuer\` و \`value\` بدل string من drops (تشرح [الوحدة 6](?m=6&l=0) حقوله). يجب أن يتوفر شرطان مسبقًا:

| الشرط | السبب | أين يُنفَّذ |
|---|---|---|
| لدى الحامل TrustLine نحو المُصدر لرمز العملة هذا بالضبط | لا يمكن لأي حساب أن يحمل token لم يقبله؛ وبدون الخط تفشل الدفعة بالنتيجة \`tecPATH_DRY\` | الخطوة 1 من \`distribute-token.js\` |
| لدى المُصدر DefaultRipple | الدفعة من RESERVE إلى الحامل تمر عبر أرصدة المُصدر (rippling)، و DefaultRipple يسمح بذلك | الخطوة 1 من العملية الكاملة |

\`distribute-token.js\` (في تبويب الكود) ينشئ TrustLine الحامل، ويدفع 100 وحدة من RESERVE إلى \`WALLET\`، ويطبع الرصيدين. يستخدم \`WALLET_SEED\` و \`ISSUER_SEED\` و \`RESERVE_SEED\` من \`.env\`. شغّله بعد العملية الكاملة:

\`\`\`bash
node distribute-token.js
\`\`\`

المخرجات على testnet:

\`\`\`
${out}
\`\`\`

- **\`TrustLine holder → issuer: tesSUCCESS\`**: أصبح \`WALLET\` يقبل حتى 1,000,000 وحدة من token الخاص بـ ISSUER. إعادة تشغيل السكربت تحدّث الخط نفسه، فتنجح مرة أخرى.
- **\`IOU Payment reserve → holder: tesSUCCESS\`**: انتقلت 100 وحدة من RESERVE إلى \`WALLET\`. لا يتغير XAH في أي من الحسابين باستثناء الرسوم.
- **\`Reserve balance: 999900\`، \`Holder balance: 100\`**: المعروض لم يزد، بل انتقل. وحده المُصدر يستطيع إنشاء وحدات جديدة بالدفع من حساب الإصدار.

**حالات يجب الانتباه لها:**
- **\`tecPATH_DRY\` على الدفعة**: ليس لدى الحامل TrustLine لرمز العملة هذا والمُصدر هذا بالضبط. الاسم الأطول من 3 أحرف يُرسل كرمز hex من 40 حرفًا، ويجب أن يستخدم الطرفان الرمز نفسه.
- **\`tecPATH_DRY\` رغم وجود الخطين**: يُحظر الـ rippling حين يحمل الخطان NoRipple من جهة المُصدر، وهذا يحدث إذا أُنشئا قبل أن يفعّل المُصدر DefaultRipple. فعّل DefaultRipple قبل أن يثق أي أحد بالـ token.
- **\`tecNO_LINE_INSUF_RESERVE\` على TrustLine**: ليس لدى الحامل ما يكفي من XAH فوق الاحتياطي لكائن إضافي.`,
  },
}

function script(t, lang) {
  const msg = MISSING_ROLE[lang]('${role}')
  return `// ${t.file}: distribute-token.js
// ${t.c[0]}
require("dotenv").config();
for (const role of ["WALLET_SEED", "ISSUER_SEED", "RESERVE_SEED"]) {
  if (!process.env[role]) throw new Error(\`${msg}\`);
}
const { Client, Wallet } = require("xahau");

// ${t.c[1]}
const TOKEN_CURRENCY = Buffer.from("YourTokenName", "utf8").toString("hex").toUpperCase().padEnd(40, "0");
const AMOUNT = "100";

async function distributeToken() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const issuer = Wallet.fromSeed(process.env.ISSUER_SEED, {algorithm: 'secp256k1'});
  const reserve = Wallet.fromSeed(process.env.RESERVE_SEED, {algorithm: 'secp256k1'});
  const holder = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  async function submit(wallet, tx) {
    const prepared = await client.autofill(tx);
    const { result } = await client.submitAndWait(wallet.sign(prepared).tx_blob);
    return result.meta.TransactionResult;
  }

  // ${t.c[2]}
  const trust = await submit(holder, {
    TransactionType: "TrustSet",
    Account: holder.address,
    LimitAmount: { currency: TOKEN_CURRENCY, issuer: issuer.address, value: "1000000" },
  });
  console.log("TrustLine holder → issuer:", trust);
  if (trust !== "tesSUCCESS") return client.disconnect();

  // ${t.c[3]}
  const payment = await submit(reserve, {
    TransactionType: "Payment",
    Account: reserve.address,
    Destination: holder.address,
    Amount: { currency: TOKEN_CURRENCY, issuer: issuer.address, value: AMOUNT },
  });
  console.log("IOU Payment reserve → holder:", payment);

  // ${t.c[4]}
  for (const [name, wallet] of [["Reserve", reserve], ["Holder", holder]]) {
    const { result } = await client.request({
      command: "account_lines",
      account: wallet.address,
      peer: issuer.address,
      ledger_index: "validated",
    });
    const line = result.lines.find((l) => l.currency === TOKEN_CURRENCY);
    console.log(\`\${name} balance:\`, line?.balance ?? "0");
  }

  await client.disconnect();
}

distributeToken();`
}

/**
 * Adds step 4 to the token lesson: a theory section and the script, in every
 * language. Runs after the module's own translation merges.
 */
export function addDistributeToken(moduleData, lessonId) {
  const lesson = moduleData.lessons.find((l) => l.id === lessonId)
  const langs = Object.keys(T)
  for (const lang of langs) {
    lesson.theory[lang] = `${lesson.theory[lang] ?? lesson.theory.en}\n\n${T[lang].theory(OUTPUT)}`
  }
  lesson.codeBlocks.push({
    // Written in every language here, so the derived French and Arabic code skips it
    manual: true,
    title: Object.fromEntries(langs.map((lang) => [lang, T[lang].title])),
    language: 'javascript',
    code: Object.fromEntries(langs.map((lang) => [lang, script(T[lang], lang)])),
  })
}
