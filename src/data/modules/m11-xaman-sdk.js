export default {
  id: "m11",
  icon: "🔑",
  title: {
    es: "Integración con Xaman (XUMM SDK)",
    en: "Xaman Integration (XUMM SDK)",
    jp: "Xaman連携（XUMM SDK）",
  },
  lessons: [
    {
      id: "m11l1",
      title: {
        es: "El SDK de Xaman y el portal de desarrolladores",
        en: "The Xaman SDK and developer portal",
        jp: "Xaman SDKと開発者ポータル",
      },
      theory: {
        es: `**Xaman** (anteriormente XUMM) no es solo una wallet: es una plataforma de firma de transacciones que expone una **API REST y SDK** para desarrolladores. Gracias a ella puedes crear aplicaciones web o móviles que piden al usuario que firme transacciones en Xahau sin que nunca tengas acceso a sus claves privadas.

### ¿Qué es el XUMM SDK?

El paquete **xumm** (npm) es el SDK oficial que facilita la integración con la API de Xaman. Con él puedes:

- Autenticar usuarios mediante un **SignIn** que el usuario firma en su móvil
- Crear **payloads** (solicitudes de firma) con cualquier tipo de transacción de Xahau
- Mostrar un **código QR** que el usuario escanea con la app Xaman
- Recibir en tiempo real la respuesta (firmada o rechazada) mediante WebSocket
- Verificar que la transacción fue incluida en el ledger

### Obtener tus credenciales API

Antes de escribir código necesitas acceder al **portal de desarrolladores**:

1. Ve a [apps.xumm.dev](https://apps.xumm.dev) e inicia sesión con tu cuenta de Xaman
2. Haz clic en **"Create new application"**
3. Rellena el nombre, descripción e icono de tu aplicación y pulsa **Create application**.
4. Copia tu **API Key** (pública) y tu **API Secret** (privada)

**Importante**: El API Secret es como una contraseña. **Nunca lo incluyas en código frontend** que se entregue al navegador. Solo úsalo en tu servidor.

### Panel de control de desarrolladores

El dashboard de apps.xumm.dev te permite:

- **App details**: Nombre, descripción, URL del icono
- **Origin/redirect URLs**: Lista blanca de dominios que pueden usar tu API Key
- **Webhook URL**: Endpoint de tu servidor donde Xaman enviará notificaciones de firma
- **Estadísticas**: Número de payloads creados, firmados y rechazados
- **Logs**: Historial de llamadas a la API para debugging

### Revisar la documentación oficial

La documentación completa está en **docs.xumm.dev**:

- **Concepts** → entiende qué es un payload, el flujo de firma, los estados posibles
- **SDK Reference** → todos los métodos del SDK con ejemplos
- **API Reference** → documentación de los endpoints REST directos
- **Examples** → proyectos de ejemplo en GitHub

### Conceptos clave antes de programar

| Concepto | Descripción |
|----------|-------------|
| **Payload** | Una solicitud de firma: contiene la transacción a firmar |
| **UUID** | Identificador único de cada payload |
| **QR / Deep link** | Formas de enviar el payload al usuario |
| **SignIn** | Transacción especial para autenticar (no cuesta fees) |
| **Webhook** | Notificación HTTP que Xaman envía cuando el usuario firma |

### Flujo básico de integración

\`\`\`
Tu app                  Xaman API             Xaman (móvil)
  │                         │                      │
  │── Crear payload ───────▶│                      │
  │◀── UUID + QR URL ───────│                      │
  │                         │                      │
  │── Mostrar QR al usuario │                      │
  │                         │◀── Usuario escanea ──│
  │                         │                      │
  │◀── WebSocket: signed ───│◀── Usuario firma ────│
  │                         │                      │
  │── Verificar en ledger   │                      │
\`\`\``,
        en: `**Xaman** (formerly XUMM) is not just a wallet: it is a transaction signing platform that exposes a **REST API and SDK** for developers. With it you can build web or mobile apps that ask users to sign Xahau transactions without ever having access to their private keys.

### What is the XUMM SDK?

The **xumm** npm package is the official SDK that simplifies integration with the Xaman API. With it you can:

- Authenticate users via a **SignIn** they sign on their phone
- Create **payloads** (sign requests) for any Xahau transaction type
- Display a **QR code** the user scans with the Xaman app
- Receive real-time responses (signed or rejected) via WebSocket
- Verify that the transaction was included in the ledger

### Getting your API credentials

Before writing code you need to visit the **developer portal**:

1. Go to [apps.xumm.dev](https://apps.xumm.dev) and sign in with your Xaman account
2. Click **"Create a new application"**
3. Fill in the name, description and icon for your app
4. Copy your **API Key** (public) and **API Secret** (private)

> **Important**: The API Secret is like a password. **Never include it in frontend code** delivered to browsers. Only use it on your server.

### Developer dashboard

The apps.xumm.dev dashboard lets you:

- **App details**: Name, description, icon URL
- **Origin/redirect URLs**: Whitelist of domains allowed to use your API Key
- **Webhook URL**: Your server endpoint where Xaman sends signing notifications
- **Stats**: Number of payloads created, signed and rejected
- **Logs**: API call history for debugging

### Reading the official docs

Full documentation is at **docs.xumm.dev**:

- **Concepts** → understand payloads, the signing flow, possible states
- **SDK Reference** → all SDK methods with examples
- **API Reference** → direct REST endpoint documentation
- **Examples** → sample projects on GitHub

### Key concepts before coding

| Concept | Description |
|---------|-------------|
| **Payload** | A sign request: contains the transaction to sign |
| **UUID** | Unique identifier for each payload |
| **QR / Deep link** | Ways to deliver the payload to the user |
| **SignIn** | Special transaction for authentication (no fees) |
| **Webhook** | HTTP notification Xaman sends when the user signs |

### Basic integration flow
\`\`\`
Your app                  Xaman API             Xaman (mobile)
  │                         │                      │
  │── Create payload ──────▶│                      │
  │◀── UUID + QR URL ───────│                      │
  │                         │                      │
  │── Show QR to user       │                      │
  │                         │◀── User scans ─-----─│
  │                         │                      │
  │◀── WebSocket: signed ───│◀── User signs ──---──│
  │                         │                      │
  │── Verify on ledger      │                      │
\`\`\``,
        jp: `**Xaman**（旧XUMM）は単なるウォレットではなく、開発者向けに**REST APIとSDK**を公開しているトランザクション署名プラットフォームです。これを使うと、ユーザーの秘密鍵に触れることなく、XahauトランザクションへのユーザーのIDを確認できるWebやモバイルアプリを作成できます。

### XUMM SDKとは？

**xumm** npmパッケージはXaman APIとの連携を簡素化する公式SDKです。以下のことができます：

- ユーザーがスマホで署名する**SignIn**によるユーザー認証
- あらゆるXahauトランザクションタイプの**ペイロード**（署名リクエスト）の作成
- ユーザーがXamanアプリでスキャンする**QRコード**の表示
- WebSocketによるリアルタイムレスポンス（署名済みまたは拒否）の受信
- レジャーへのトランザクション記録の確認

### API認証情報の取得

コードを書く前に**開発者ポータル**にアクセスする必要があります：

1. **apps.xumm.dev**にアクセスし、Xamanアカウントでサインイン
2. **"Create a new app"**をクリック
3. アプリの名前、説明、アイコンを入力
4. **APIキー**（公開）と**APIシークレット**（非公開）をコピー

> **重要**: APIシークレットはパスワードと同様です。ブラウザに配信されるフロントエンドコードには**絶対に含めないでください**。サーバーのみで使用してください。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Instalación y configuración básica del SDK",
            en: "SDK installation and basic setup",
            jp: "SDKのインストールと基本設定",
          },
          language: "bash",
          code: {
            es: `# Instalar el SDK de Xaman
npm install xumm

# Para proyectos React/Vite también necesitas
npm install xumm

# Verifica la versión instalada
npm list xumm`,
            en: `# Install the Xaman SDK
npm install xumm

# For React/Vite projects you also need
npm install xumm

# Verify the installed version
npm list xumm`,
            jp: `# Xaman SDKをインストール
npm install xumm

# React/Viteプロジェクトにも必要
npm install xumm

# インストールされたバージョンを確認
npm list xumm`,
          },
        },
        {
          title: {
            es: "Inicialización: frontend vs backend",
            en: "Initialization: frontend vs backend",
            jp: "初期化：フロントエンドとバックエンド",
          },
          language: "javascript",
          code: {
            es: `import { Xumm } from "xumm";

// ─────────────────────────────────────────────
// FRONTEND (navegador) — solo API Key
// La API Key es pública y usa flujo PKCE seguro
// ─────────────────────────────────────────────
const xumm = new Xumm("tu-api-key-aqui");

// ─────────────────────────────────────────────
// BACKEND (Node.js servidor) — API Key + Secret
// El Secret NUNCA debe ir en el navegador
// ─────────────────────────────────────────────
const xummBackend = new Xumm("tu-api-key-aqui", "tu-api-secret-aqui");

// Verificar que la conexión funciona
const appInfo = await xumm.environment.getAppInfo();
console.log("App conectada:", appInfo?.name);
console.log("App UUID:", appInfo?.uuidv4);`,
            en: `import { Xumm } from "xumm";

// ─────────────────────────────────────────────
// FRONTEND (browser) — API Key only
// The API Key is public and uses the secure PKCE flow
// ─────────────────────────────────────────────
const xumm = new Xumm("your-api-key-here");

// ─────────────────────────────────────────────
// BACKEND (Node.js server) — API Key + Secret
// The Secret must NEVER go in the browser
// ─────────────────────────────────────────────
const xummBackend = new Xumm("your-api-key-here", "your-api-secret-here");

// Verify the connection works
const appInfo = await xumm.environment.getAppInfo();
console.log("App connected:", appInfo?.name);
console.log("App UUID:", appInfo?.uuidv4);`,
            jp: `import { Xumm } from "xumm";

// ─────────────────────────────────────────────
// FRONTEND (browser) — API Key only
// The API Key is public and uses the secure PKCE flow
// ─────────────────────────────────────────────
const xumm = new Xumm("your-api-key-here");

// ─────────────────────────────────────────────
// BACKEND (Node.js server) — API Key + Secret
// The Secret must NEVER go in the browser
// ─────────────────────────────────────────────
const xummBackend = new Xumm("your-api-key-here", "your-api-secret-here");

// Verify the connection works
const appInfo = await xumm.environment.getAppInfo();
console.log("App connected:", appInfo?.name);
console.log("App UUID:", appInfo?.uuidv4);`,
          },
        },
      ],
      slides: [
        {
          title: {
            es: "¿Qué es el XUMM SDK?",
            en: "What is the XUMM SDK?",
            jp: "XUMM SDKとは？",
          },
          content: {
            es: "SDK oficial para integrar Xaman en tu app\n\n• Autenticar usuarios con SignIn\n• Crear payloads (solicitudes de firma)\n• Mostrar QR — el usuario escanea con Xaman\n• WebSocket: respuesta en tiempo real\n• El usuario firma, tú nunca ves las claves",
            en: "Official SDK to integrate Xaman in your app\n\n• Authenticate users with SignIn\n• Create payloads (sign requests)\n• Show QR — user scans with Xaman\n• WebSocket: real-time response\n• User signs, you never see private keys",
            jp: "アプリにXamanを統合するための公式SDK\n\n• SignInによるユーザー認証\n• ペイロード（署名リクエスト）の作成\n• QR表示 — ユーザーがXamanでスキャン\n• WebSocket：リアルタイムレスポンス\n• ユーザーが署名、秘密鍵は見えない",
          },
          visual: "🔑",
        },
        {
          title: {
            es: "Portal de desarrolladores",
            en: "Developer portal",
            jp: "開発者ポータル",
          },
          content: {
            es: "apps.xumm.dev — tu centro de control\n\n• Crear app → obtener API Key + Secret\n• Whitelist de dominios permitidos\n• Configurar webhook URL\n• Ver estadísticas y logs de API\n\ndocs.xumm.dev — documentación completa",
            en: "apps.xumm.dev — your control center\n\n• Create app → get API Key + Secret\n• Whitelist of allowed domains\n• Configure webhook URL\n• View stats and API logs\n\ndocs.xumm.dev — full documentation",
            jp: "apps.xumm.dev — あなたのコントロールセンター\n\n• アプリ作成 → APIキー＋シークレット取得\n• 許可ドメインのホワイトリスト\n• WebhookURL設定\n• 統計とAPIログの確認\n\ndocs.xumm.dev — 完全なドキュメント",
          },
          visual: "🖥️",
        },
        {
          title: {
            es: "API Key vs API Secret",
            en: "API Key vs API Secret",
            jp: "APIキー対APIシークレット",
          },
          content: {
            es: "Dos credenciales con roles distintos:\n\nAPI Key (pública)\n• Segura en el navegador\n• Flujo PKCE — no necesita Secret\n• Va en el código React/JS del frontend\n\nAPI Secret (privada)\n• SOLO en el servidor (Node.js)\n• NUNCA en el navegador\n• Permisos de escritura completos",
            en: "Two credentials with different roles:\n\nAPI Key (public)\n• Safe in the browser\n• PKCE flow — no Secret needed\n• Goes in frontend React/JS code\n\nAPI Secret (private)\n• Server ONLY (Node.js)\n• NEVER in the browser\n• Full write permissions",
            jp: "異なる役割を持つ2つの認証情報：\n\nAPIキー（公開）\n• ブラウザで安全\n• PKCEフロー — シークレット不要\n• フロントエンドのReact/JSコードに記載\n\nAPIシークレット（非公開）\n• サーバーのみ（Node.js）\n• ブラウザには絶対に記載しない\n• 完全な書き込み権限",
          },
          visual: "🔐",
        },
      ],
    },
    {
      id: "m11l2",
      title: {
        es: "Frontend: autenticación con Xaman (Login con QR)",
        en: "Frontend: authentication with Xaman (QR Login)",
        jp: "フロントエンド：Xamanによる認証（QRログイン）",
      },
      theory: {
        es: `La primera integración que construirás es el **login con Xaman**: un flujo en el que el usuario escanea un QR con su app Xaman y queda autenticado en tu aplicación web. Es el equivalente a "Conectar con MetaMask" pero para el ecosistema Xahau.

### ¿Cómo funciona el login con Xaman?

1. Tu app crea un payload de tipo **SignIn** (transacción especial de autenticación)
2. Xaman devuelve una URL con un **código QR** y un UUID
3. Muestras el QR en pantalla al usuario
4. El usuario **escanea el QR** con su app Xaman
5. El usuario aprieta **"Sign"** en su móvil (no hay fee, es solo firma)
6. Tu app recibe por **WebSocket** la confirmación con la dirección del usuario
7. Guardas el account (dirección pública) como identidad del usuario

### Ventajas de este flujo

- **Sin contraseña**: el usuario no crea ni recuerda nada
- **No custodial**: nunca ves claves privadas
- **Verificable**: la firma criptográfica prueba que el usuario controla la cuenta
- **Móvil-first**: optimizado para la app Xaman
- **Deep link**: en móvil abre Xaman automáticamente sin escanear

### Proyecto de ejemplo: React + Vite

Crearás un proyecto React con Vite que tiene:
- Un botón **"Conectar con Xaman"** en la página principal
- Un **modal flotante** con el QR que aparece sobre el contenido sin reemplazar la página
- Deep link dentro del modal para abrir Xaman desde el móvil
- Estado de sesión: dirección conectada y opción de desconectar

### Instalación del proyecto

\`\`\`bash
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
npm run dev
\`\`\`

### Archivos que necesitas modificar

Vite genera el proyecto con varios archivos. Solo tienes que tocar **uno**:

| Archivo | Acción |
|---------|--------|
| \`src/App.jsx\` | **Sustituye todo su contenido** por el código del ejemplo |
| \`src/main.jsx\` | No tocar — lo genera Vite, arranca la app |
| \`index.html\` | No tocar — punto de entrada HTML |
| \`src/App.css\` | Puedes borrarlo — el ejemplo usa estilos inline |
| \`src/index.css\` | Puedes borrarlo o dejarlo — no afecta al ejemplo |

### Paso previo obligatorio, whitelist en apps.xumm.dev

Antes de ejecutar el código, debes registrar tu URL en el portal de Xaman:

1. Ve a **apps.xumm.dev** → tu aplicación → **Origin/Redirect URLs**
2. Añade tu localhost y port ejecutando tu proyecto web como: \`http://localhost:5173\`
3. Guarda los cambios

Sin este paso recibirás el error **"access_denied / Invalid client/redirect URL"**.

### Cómo funciona el QR en el modal del navegador

El SDK puede crear payloads directamente desde el browser usando **\`payload.createAndSubscribe()\`**. Para que funcione, la URL de tu app debe estar en la **whitelist** de apps.xumm.dev — el browser envía la cabecera Origin automáticamente, y Xaman la valida contra esa lista.

Una vez que el origen está permitido, el método:

1. Hace una petición a la API de Xaman con la API Key
2. Devuelve \`created.refs.qr_png\` — la URL de la imagen QR que puedes mostrar en tu modal
3. Abre un **WebSocket** y espera la respuesta del usuario
4. Cuando el usuario firma, \`resolved\` se resuelve con el resultado

\`\`\`javascript
const { created, resolved } = await xumm.payload.createAndSubscribe(
  { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
  (event) => {
    if (typeof event.data.signed !== "undefined") return event.data;
  }
);
const qrUrl   = created.refs.qr_png;  // imagen QR — muéstrala en tu modal
const deepLink = created.next.always; // deep link para móvil
const result   = await resolved;      // espera firma o rechazo
\`\`\``,
        en: `The first integration you'll build is **Xaman login**: a flow where the user scans a QR with the Xaman app and gets authenticated in your web application. It's the equivalent of "Connect with MetaMask" but for the Xahau ecosystem.

### How does Xaman login work?

1. Your app creates a **SignIn** payload (special authentication transaction)
2. Xaman returns a URL with a **QR code** and a UUID
3. You display the QR on screen for the user
4. The user **scans the QR** with their Xaman app
5. The user taps **"Sign"** on their phone (no fee — it's just a signature)
6. Your app receives via **WebSocket** the confirmation with the user's address
7. You save the account (public address) as the user's identity

### Advantages of this flow

- **No password**: the user creates and remembers nothing
- **Non-custodial**: you never see private keys
- **Verifiable**: the cryptographic signature proves the user controls the account
- **Mobile-first**: optimized for the Xaman app
- **Deep link**: on mobile opens Xaman automatically without scanning

### Project setup: React + Vite

\`\`\`bash
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
npm run dev
\`\`\`

### Files to create or modify

Vite scaffolds the project for you. You only need to touch **one file**:

| File | Action |
|------|--------|
| \`src/App.jsx\` | **Replace all its content** with the example code |
| \`src/main.jsx\` | Do not touch — generated by Vite, boots the app |
| \`index.html\` | Do not touch — HTML entry point |
| \`src/App.css\` | You can delete it — the example uses inline styles |
| \`src/index.css\` | You can delete it or leave it — does not affect the example |

### Required step first — whitelist in apps.xumm.dev

Before running the code, register your URL in the Xaman developer portal:

1. Go to **apps.xumm.dev** → your app → **Origin/Redirect URLs**
2. Add your localhost url and port web project like: \`http://localhost:5173\`
3. Save the changes

Without this step you will get **"access_denied / Invalid client/redirect URL"**.

### How the QR modal works in the browser

The SDK can create payloads directly from the browser using **\`payload.createAndSubscribe()\`**. For this to work, your app URL must be in the **whitelist** at apps.xumm.dev — the browser sends the Origin header automatically and Xaman validates it against that list.

Once the origin is allowed, the method:

1. Makes a request to the Xaman API with the API Key
2. Returns \`created.refs.qr_png\` — the QR image URL you display in your modal
3. Opens a **WebSocket** and waits for the user's response
4. When the user signs, \`resolved\` resolves with the result

> **Why did it hang before?** The origin \`http://localhost:5173\` wasn't in the whitelist. The CORS preflight was silently rejected and the promise never resolved. Now that you added it for \`authorize()\`, it also enables \`payload.createAndSubscribe()\` calls.

\`\`\`javascript
const { created, resolved } = await xumm.payload.createAndSubscribe(
  { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
  (event) => {
    if (typeof event.data.signed !== "undefined") return event.data;
  }
);
const qrUrl   = created.refs.qr_png;  // QR image — show it in your modal
const deepLink = created.next.always; // deep link for mobile
const result   = await resolved;      // wait for sign or reject
\`\`\``,
        jp: `最初に構築する連携は**Xamanログイン**です：ユーザーがXamanアプリでQRをスキャンし、あなたのWebアプリケーションに認証されるフローです。Xahauエコシステムにおける「MetaMaskで接続」に相当します。

### Xamanログインの仕組み

1. アプリが**SignIn**ペイロード（特別な認証トランザクション）を作成
2. XamanがQRコードとUUID付きのURLを返す
3. ユーザーに画面でQRを表示
4. ユーザーがXamanアプリでQRをスキャン
5. ユーザーがスマホで**「Sign」**をタップ（手数料なし — 署名のみ）
6. アプリがWebSocketでユーザーのアドレス付きの確認を受信
7. アカウント（公開アドレス）をユーザーのIDとして保存

### このフローの利点

- **パスワード不要**：ユーザーは何も作成・記憶しない
- **非カストディアル**：秘密鍵を見ることはない
- **検証可能**：暗号署名がユーザーのアカウント所有を証明
- **モバイルファースト**：Xamanアプリに最適化
- **ディープリンク**：モバイルではスキャンせずにXamanが自動起動

### プロジェクトのセットアップ：React + Vite

\`\`\`bash
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm
npm run dev
\`\`\`

### 作成・変更するファイル

Viteがプロジェクトを自動生成します。変更が必要なファイルは**1つだけ**です：

| ファイル | 操作 |
|---------|------|
| \`src/App.jsx\` | **内容を全て置き換える** — サンプルコードをここに貼る |
| \`src/main.jsx\` | 触らない — Viteが生成、アプリを起動 |
| \`index.html\` | 触らない — HTMLエントリーポイント |
| \`src/App.css\` | 削除可 — サンプルはインラインスタイルを使用 |
| \`src/index.css\` | 削除可またはそのまま — サンプルに影響しない |`,
      },
      codeBlocks: [
        {
          title: {
            es: "Instalación y configuración básica del proyecto",
            en: "SDK installation and project basic setup",
            jp: "SDKのインストールとプロジェクトの基本設定",
          },
          language: "bash",
          code: {
            es: `npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# Después de modificar src/App.jsx ejecutar:
npm run dev`,
            en: `npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# After modifying src/App.jsx run:
npm run dev`,
            jp: ``,
          },
        },
        {
          title: {
            es: "App.jsx — Login con QR",
            en: "App.jsx — QR modal login",
            jp: "App.jsx — QRモーダルログイン",
          },
          language: "javascript",
          code: {
            es: `// src/App.jsx — Login con QR modal en tu propia página
// ANTES DE EJECUTAR:
// En apps.xumm.dev → tu app → Origin/Redirect URLs → añade http://localhost:5173
// Añade la API Key de tu app: xumm = new Xumm("TU_API_KEY_AQUI");
//
// Mismo patrón que el ejercicio de pago con QR modal:
// createAndSubscribe() crea el payload y tú muestras el QR en tu propio modal.
// El usuario nunca sale de tu página para hacer login.

import { useState, useEffect } from "react";
import { Xumm } from "xumm";
import { Client } from "xahau";

const xumm = new Xumm("TU_API_KEY_AQUI");

async function obtenerInfoCuenta(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const res = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "current",
    });
    const info = res.result.account_data;
    return {
      balance: (Number(info.Balance) / 1_000_000).toFixed(6),
      sequence: info.Sequence,
    };
  } catch (err) {
    if (err.data?.error === "actNotFound") return { balance: "no activada", sequence: "—" };
    throw err;
  } finally {
    await client.disconnect();
  }
}

// ── Modal con el QR ───────────────────────────────────────────────────────────
function QRModal({ titulo, qrUrl, deepLink, onCancel }) {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: "2rem",
        textAlign: "center", maxWidth: 300, width: "90%",
      }}>
        <h2 style={{ marginTop: 0 }}>{titulo}</h2>
        <img src={qrUrl} alt="QR Xaman" width={220}
          style={{ display: "block", margin: "0 auto" }} />
        <p style={{ fontSize: "0.9rem" }}>
          ¿En móvil?{" "}
          <a href={deepLink} rel="noopener noreferrer">Abre Xaman directamente</a>
        </p>
        <button onClick={onCancel} style={{ marginTop: "0.5rem" }}>Cancelar</button>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function App() {
  const [account, setAccount]   = useState(null);
  const [balance, setBalance]   = useState(null);
  const [sequence, setSequence] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [qrUrl, setQrUrl]       = useState(null);
  const [deepLink, setDeepLink] = useState(null);

  // Restaurar sesión si el SDK ya tiene un token guardado
  useEffect(() => {
    xumm.on("ready", async () => {
      const me = await xumm.me;
      if (me?.account) {
        setAccount(me.account);
        const info = await obtenerInfoCuenta(me.account);
        setBalance(info.balance);
        setSequence(info.sequence);
      }
    });
  }, []);

  async function conectarConXaman() {
    setLoading(true);
    setError(null);
    try {
      const { created, resolved } = await xumm.payload.createAndSubscribe(
        { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
        (event) => {
          if (typeof event.data.signed !== "undefined") return event.data;
        }
      );

      setQrUrl(created.refs.qr_png);
      setDeepLink(created.next.always);

      const result = await resolved;
      setQrUrl(null);
      setDeepLink(null);

      if (result.signed) {
        const payloadResult = await xumm.payload.get(created.uuid);
        const userAccount = payloadResult.response.account;
        setAccount(userAccount);
        const info = await obtenerInfoCuenta(userAccount);
        setBalance(info.balance);
        setSequence(info.sequence);
      } else {
        setError("Login rechazado por el usuario");
      }
    } catch (err) {
      setError(\`Error: \${err.message || "No se pudo conectar"}\`);
    } finally {
      setLoading(false);
    }
  }

  function cancelar() {
    setQrUrl(null);
    setDeepLink(null);
    setLoading(false);
  }

  async function desconectar() {
    await xumm.logout();
    setAccount(null);
    setBalance(null);
    setSequence(null);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto" }}>
      <h1>Xaman Login — QR Modal</h1>

      {account ? (
        <div>
          <p>✅ Conectado</p>
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem" }}>
            <tbody>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Cuenta</td>
                <td><code style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>{account}</code></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Balance</td>
                <td><strong>{balance} XAH</strong></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Secuencia</td>
                <td>{sequence}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={desconectar}>Desconectar</button>
        </div>
      ) : (
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={conectarConXaman} disabled={loading}>
            {loading ? "Generando QR..." : "🔑 Conectar con Xaman"}
          </button>
        </div>
      )}

      {qrUrl && (
        <QRModal
          titulo="Inicia sesión con Xaman"
          qrUrl={qrUrl}
          deepLink={deepLink}
          onCancel={cancelar}
        />
      )}
    </div>
  );
}`,
            en: `// src/App.jsx — QR modal login in your own page
// BEFORE RUNNING:
// In apps.xumm.dev → your app → Origin/Redirect URLs → add http://localhost:5173
// Add your app's API Key: xumm = new Xumm("YOUR_API_KEY_HERE");
//
// Same pattern as the QR modal payment exercise:
// createAndSubscribe() creates the payload and you display the QR in your own modal.
// The user never leaves your page to log in.

import { useState, useEffect } from "react";
import { Xumm } from "xumm";
import { Client } from "xahau";

const xumm = new Xumm("YOUR_API_KEY_HERE");

async function getAccountInfo(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const res = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "current",
    });
    const info = res.result.account_data;
    return {
      balance: (Number(info.Balance) / 1_000_000).toFixed(6),
      sequence: info.Sequence,
    };
  } catch (err) {
    if (err.data?.error === "actNotFound") return { balance: "not activated", sequence: "—" };
    throw err;
  } finally {
    await client.disconnect();
  }
}

// ── QR Modal ──────────────────────────────────────────────────────────────────
function QRModal({ title, qrUrl, deepLink, onCancel }) {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: "2rem",
        textAlign: "center", maxWidth: 300, width: "90%",
      }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <img src={qrUrl} alt="QR Xaman" width={220}
          style={{ display: "block", margin: "0 auto" }} />
        <p style={{ fontSize: "0.9rem" }}>
          On mobile?{" "}
          <a href={deepLink} rel="noopener noreferrer">Open Xaman directly</a>
        </p>
        <button onClick={onCancel} style={{ marginTop: "0.5rem" }}>Cancel</button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function App() {
  const [account, setAccount]   = useState(null);
  const [balance, setBalance]   = useState(null);
  const [sequence, setSequence] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [qrUrl, setQrUrl]       = useState(null);
  const [deepLink, setDeepLink] = useState(null);

  // Restore session if the SDK already has a saved token
  useEffect(() => {
    xumm.on("ready", async () => {
      const me = await xumm.me;
      if (me?.account) {
        setAccount(me.account);
        const info = await getAccountInfo(me.account);
        setBalance(info.balance);
        setSequence(info.sequence);
      }
    });
  }, []);

  async function connectWithXaman() {
    setLoading(true);
    setError(null);
    try {
      const { created, resolved } = await xumm.payload.createAndSubscribe(
        { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
        (event) => {
          if (typeof event.data.signed !== "undefined") return event.data;
        }
      );

      setQrUrl(created.refs.qr_png);
      setDeepLink(created.next.always);

      const result = await resolved;
      setQrUrl(null);
      setDeepLink(null);

      if (result.signed) {
        const payloadResult = await xumm.payload.get(created.uuid);
        const userAccount = payloadResult.response.account;
        setAccount(userAccount);
        const info = await getAccountInfo(userAccount);
        setBalance(info.balance);
        setSequence(info.sequence);
      } else {
        setError("Login rejected by the user");
      }
    } catch (err) {
      setError(\`Error: \${err.message || "Could not connect"}\`);
    } finally {
      setLoading(false);
    }
  }

  function cancel() {
    setQrUrl(null);
    setDeepLink(null);
    setLoading(false);
  }

  async function disconnect() {
    await xumm.logout();
    setAccount(null);
    setBalance(null);
    setSequence(null);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto" }}>
      <h1>Xaman Login — QR Modal</h1>

      {account ? (
        <div>
          <p>✅ Connected</p>
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem" }}>
            <tbody>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Account</td>
                <td><code style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>{account}</code></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Balance</td>
                <td><strong>{balance} XAH</strong></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Sequence</td>
                <td>{sequence}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={connectWithXaman} disabled={loading}>
            {loading ? "Generating QR..." : "🔑 Connect with Xaman"}
          </button>
        </div>
      )}

      {qrUrl && (
        <QRModal
          title="Sign in with Xaman"
          qrUrl={qrUrl}
          deepLink={deepLink}
          onCancel={cancel}
        />
      )}
    </div>
  );
}`,
            jp: `// src/App.jsx — 自分のページでQRモーダルログイン
// 実行前に:
// apps.xumm.dev → あなたのアプリ → Origin/Redirect URLs → http://localhost:5173 を追加
// APIキーを設定: xumm = new Xumm("YOUR_API_KEY_HERE");
//
// 支払いQRモーダル演習と同じパターン:
// createAndSubscribe()でペイロードを作成し、自分のモーダルにQRを表示します。
// ログインのためにユーザーはページを離れません。

import { useState, useEffect } from "react";
import { Xumm } from "xumm";
import { Client } from "xahau";

const xumm = new Xumm("YOUR_API_KEY_HERE");

async function getAccountInfo(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const res = await client.request({ command: "account_info", account: address, ledger_index: "current" });
    const info = res.result.account_data;
    return { balance: (Number(info.Balance) / 1_000_000).toFixed(6), sequence: info.Sequence };
  } catch (err) {
    if (err.data?.error === "actNotFound") return { balance: "未アクティブ", sequence: "—" };
    throw err;
  } finally { await client.disconnect(); }
}

// ── QRモーダル ────────────────────────────────────────────────────────────────
function QRModal({ title, qrUrl, deepLink, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", textAlign: "center", maxWidth: 300, width: "90%" }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <img src={qrUrl} alt="QR Xaman" width={220} style={{ display: "block", margin: "0 auto" }} />
        <p style={{ fontSize: "0.9rem" }}>モバイルの場合?{" "}<a href={deepLink} rel="noopener noreferrer">Xamanを直接開く</a></p>
        <button onClick={onCancel} style={{ marginTop: "0.5rem" }}>キャンセル</button>
      </div>
    </div>
  );
}

export default function App() {
  const [account, setAccount]   = useState(null);
  const [balance, setBalance]   = useState(null);
  const [sequence, setSequence] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [qrUrl, setQrUrl]       = useState(null);
  const [deepLink, setDeepLink] = useState(null);

  useEffect(() => {
    xumm.on("ready", async () => {
      const me = await xumm.me;
      if (me?.account) {
        setAccount(me.account);
        const info = await getAccountInfo(me.account);
        setBalance(info.balance); setSequence(info.sequence);
      }
    });
  }, []);

  async function connectWithXaman() {
    setLoading(true); setError(null);
    try {
      const { created, resolved } = await xumm.payload.createAndSubscribe(
        { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
        (event) => { if (typeof event.data.signed !== "undefined") return event.data; }
      );
      setQrUrl(created.refs.qr_png); setDeepLink(created.next.always);
      const result = await resolved;
      setQrUrl(null); setDeepLink(null);
      if (result.signed) {
        const p = await xumm.payload.get(created.uuid);
        setAccount(p.response.account);
        const info = await getAccountInfo(p.response.account);
        setBalance(info.balance); setSequence(info.sequence);
      } else { setError("ログインがユーザーに拒否されました"); }
    } catch (err) { setError(\`エラー: \${err.message || "接続できませんでした"}\`); }
    finally { setLoading(false); }
  }

  function cancel() { setQrUrl(null); setDeepLink(null); setLoading(false); }

  async function disconnect() {
    await xumm.logout();
    setAccount(null); setBalance(null); setSequence(null);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto" }}>
      <h1>Xaman Login — QRモーダル</h1>
      {account ? (
        <div>
          <p>✅ 接続済み</p>
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem" }}>
            <tbody>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>アカウント</td><td><code style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>{account}</code></td></tr>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>残高</td><td><strong>{balance} XAH</strong></td></tr>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>シーケンス</td><td>{sequence}</td></tr>
            </tbody>
          </table>
          <button onClick={disconnect}>切断</button>
        </div>
      ) : (
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={connectWithXaman} disabled={loading}>
            {loading ? "QRを生成中..." : "🔑 Xamanで接続"}
          </button>
        </div>
      )}
      {qrUrl && (
        <QRModal
          title="Xamanでサインイン"
          qrUrl={qrUrl}
          deepLink={deepLink}
          onCancel={cancel}
        />
      )}
    </div>
  );
}`,
          },
        },

      ],
      slides: [
        {
          title: {
            es: "Flujo de login con Xaman",
            en: "Xaman login flow",
            jp: "Xamanログインフロー",
          },
          content: {
            es: "Autenticación sin contraseña:\n\n1. Tu app crea payload SignIn\n2. Muestras el QR al usuario\n3. Usuario escanea con Xaman\n4. Usuario toca 'Sign' (sin fee)\n5. WebSocket te entrega la dirección\n6. El usuario está autenticado ✓",
            en: "Passwordless authentication:\n\n1. Your app creates SignIn payload\n2. You show the QR to the user\n3. User scans with Xaman\n4. User taps 'Sign' (no fee)\n5. WebSocket delivers the address\n6. User is authenticated ✓",
            jp: "パスワードレス認証：\n\n1. アプリがSignInペイロードを作成\n2. ユーザーにQRを表示\n3. ユーザーがXamanでスキャン\n4. ユーザーが「Sign」をタップ（手数料なし）\n5. WebSocketがアドレスを配信\n6. ユーザーが認証済み ✓",
          },
          visual: "📱",
        },
        {
          title: {
            es: "Escritorio vs Móvil",
            en: "Desktop vs Mobile",
            jp: "デスクトップ対モバイル",
          },
          content: {
            es: "El modal maneja escritorio y móvil:\n\nEscritorio\n• El modal muestra la imagen QR (qr_png)\n• El usuario escanea con su app Xaman\n• El modal se cierra al confirmar la firma\n\nMóvil\n• El modal muestra el deep link (next.always)\n• Pulsa el enlace → abre Xaman automáticamente\n• Sin necesidad de escanear",
            en: "The modal handles desktop and mobile:\n\nDesktop\n• Modal shows the QR image (qr_png)\n• User scans with their Xaman app\n• Modal closes when signature is confirmed\n\nMobile\n• Modal shows the deep link (next.always)\n• Tap the link → Xaman opens automatically\n• No scanning needed",
            jp: "モーダルがデスクトップとモバイルを処理：\n\nデスクトップ\n• モーダルがQR画像（qr_png）を表示\n• ユーザーがXamanアプリでスキャン\n• 署名確認後にモーダルが閉じる\n\nモバイル\n• モーダルがディープリンク（next.always）を表示\n• リンクをタップ → Xamanが自動で起動\n• スキャン不要",
          },
          visual: "💻",
        },
        {
          title: {
            es: "Eventos del SDK",
            en: "SDK events",
            jp: "SDKイベント",
          },
          content: {
            es: "payload.createAndSubscribe() desde el browser:\n\n1. La origin http://localhost:5173 está en la whitelist\n2. El browser envía Origin header → Xaman valida el CORS\n3. Devuelve created.refs.qr_png → imagen del QR\n4. Muestra el QR dentro del modal de tu página\n5. WebSocket espera → usuario firma → modal se cierra\n\nNo se abre ninguna ventana externa",
            en: "payload.createAndSubscribe() from the browser:\n\n1. Origin http://localhost:5173 is in the whitelist\n2. Browser sends Origin header → Xaman validates CORS\n3. Returns created.refs.qr_png → QR image\n4. Shows QR inside your page modal\n5. WebSocket waits → user signs → modal closes\n\nNo external window is opened",
            jp: "ブラウザからのpayload.createAndSubscribe()：\n\n1. http://localhost:5173がホワイトリストにある\n2. ブラウザがOriginヘッダーを送信 → XamanがCORSを検証\n3. created.refs.qr_pngを返す → QR画像\n4. ページのモーダル内にQRを表示\n5. WebSocketが待機 → ユーザーが署名 → モーダルが閉じる\n\n外部ウィンドウは開かない",
          },
          visual: "📡",
        },
      ],
    },
    {
      id: "m11l3",
      title: {
        es: "Frontend: construir y firmar un Payment con Xaman",
        en: "Frontend: build and sign a Payment with Xaman",
        jp: "フロントエンド：XamanでPaymentを構築・署名",
      },
      theory: {
        es: `Una vez el usuario está autenticado con Xaman, puedes pedirle que firme cualquier transacción de Xahau. En esta lección construirás un formulario de pago donde el usuario introduce la **cantidad** y la **dirección destino**, se crea un payload y el usuario vuelve a escanear el QR para firmar el Payment.

### ¿Cómo funciona el flujo de pago?

1. Usuario ya está logado (tiene su cuenta conectada)
2. Muestra un formulario: dirección destino + cantidad en XAH
3. Al pulsar "Enviar", creas un payload con la transacción \`Payment\`
4. Xaman devuelve un nuevo QR (diferente al del login)
5. El usuario **escanea este segundo QR** con Xaman
6. En la app Xaman ve los detalles: origen, destino, cantidad
7. El usuario **aprueba y firma** (ahora sí hay fee de red)
8. Tu app recibe el resultado con el \`txid\` de la transacción

### Estructura de un Payment en Xahau

\`\`\`javascript
{
  TransactionType: "Payment",
  NetworkID: 21338,              // Xahau Testnet — evita firmar en otra red
  Account: "cuenta_origen",      // la del usuario logado
  Destination: "cuenta_destino",
  Amount: "1000000",             // en drops (1 XAH = 1,000,000 drops)
}
\`\`\`

La cantidad se expresa siempre en **drops** (la unidad más pequeña de XAH). Para convertir: \`drops = XAH * 1_000_000\`.

### Creación del payload con el SDK

\`\`\`javascript
const { created, resolved } = await xumm.payload.createAndSubscribe(
  { txjson: transaccion },
  (event) => {
    // Este callback se llama cada vez que hay un update
    if ("signed" in event.data) {
      return event.data;  // resuelve la promesa con el resultado
    }
  }
);
\`\`\`

- \`created\` contiene \`created.refs.qr_png\` (URL del QR) y \`created.next.always\` (deep link)
- \`resolved\` es una Promise que resuelve cuando el usuario firma o rechaza
- Si \`resolved.signed === true\` → firma exitosa, \`resolved.txid\` es el hash

### Validación antes de enviar

Siempre valida en el cliente antes de crear el payload:
- Que la dirección destino sea válida (empieza por \`r\` y tiene ~25-34 caracteres)
- Que la cantidad sea un número positivo
- Que no sea la misma cuenta que el origen

### Verificar el estado de la transacción desde Xaman

Tras la firma no necesitas conectarte al ledger: puedes consultar el payload con **\`xumm.payload.get(uuid)\`**. La respuesta incluye \`response.dispatched_result\`, que contiene el código de resultado del ledger:

- \`"tesSUCCESS"\` → transacción confirmada con éxito
- Cualquier otro valor (p.ej. \`"tecINSUF_RESERVE_LINE"\`) → error en el ledger

\`\`\`javascript
const payloadResult = await xumm.payload.get(created.uuid);
const status = payloadResult.response.dispatched_result; // "tesSUCCESS" o código error
const txid   = resultado.txid;                           // hash de la transacción
\`\`\``,
        en: `Once the user is authenticated with Xaman, you can ask them to sign any Xahau transaction. In this lesson you'll build a payment form where the user enters the **amount** and **destination address**, a payload is created, and the user scans the QR again to sign the Payment.

### How does the payment flow work?

1. User is already logged in (account connected)
2. Show a form: destination address + amount in XAH
3. On "Send", create a payload with the \`Payment\` transaction
4. Xaman returns a new QR (different from the login one)
5. User **scans this second QR** with Xaman
6. In the Xaman app they see the details: origin, destination, amount
7. User **approves and signs** (now there is a network fee)
8. Your app receives the result with the transaction \`txid\`

### Payment structure in Xahau

\`\`\`javascript
{
  TransactionType: "Payment",
  NetworkID: 21338,              // Xahau Testnet — avoid signing on other networks
  Account: "logged_account",      // the user's logged in account
  Destination: "destination_address",
  Amount: "1000000",             // in drops (1 XAH = 1,000,000 drops)
}
\`\`\`

The amount is always expressed in **drops** (smallest XAH unit). To convert: \`drops = XAH * 1_000_000\`.

### Creating the payload with the SDK

\`\`\`javascript
const { created, resolved } = await xumm.payload.createAndSubscribe(
  { txjson: transaction },
  (event) => {
    // This callback is called on every update
    if ("signed" in event.data) {
      return event.data;  // resolves the promise with the result
    }
  }
);
\`\`\`

- \`created\` contains \`created.refs.qr_png\` (QR URL) and \`created.next.always\` (deep link)
- \`resolved\` is a Promise that resolves when the user signs or rejects
- If \`resolved.signed === true\` → successful signature, \`resolved.txid\` is the hash

### Validation before sending

Always validate on the client before creating the payload:
- Destination address is valid (starts with \`r\`, ~25-34 chars)
- Amount is a positive number
- Not the same account as origin

### Check transaction status from Xaman

After signing you don't need to connect to the ledger: you can query the payload with **\`xumm.payload.get(uuid)\`**. The response includes \`response.dispatched_result\`, which contains the ledger result code:

- \`"tesSUCCESS"\` → transaction confirmed successfully
- Any other value (e.g. \`"tecINSUF_RESERVE_LINE"\`) → error in the ledger

\`\`\`javascript
const payloadResult = await xumm.payload.get(created.uuid);
const status = payloadResult.response.dispatched_result; // "tesSUCCESS" or error code
const txid   = result.txid;                              // transaction hash
\`\`\``,
        jp: `ユーザーがXamanで認証されると、あらゆるXahauトランザクションへの署名を求めることができます。このレッスンでは、ユーザーが**金額**と**宛先アドレス**を入力するペイメントフォームを構築し、ペイロードを作成して、ユーザーがQRを再スキャンしてPaymentに署名します。

### 支払いフローの仕組み

1. ユーザーはすでにログイン済み（アカウント接続済み）
2. フォームを表示：宛先アドレス＋XAHの金額
3. 「送信」時に\`Payment\`トランザクションのペイロードを作成
4. Xamanが新しいQRを返す（ログイン時のものとは別）
5. ユーザーがXamanでこの2枚目のQRをスキャン
6. Xamanアプリで詳細を確認：送信元、宛先、金額
7. ユーザーが承認・署名（ネットワーク手数料が発生）
8. アプリがトランザクションの\`txid\`付きの結果を受信

### XahauのPayment構造

\`\`\`javascript
{
  TransactionType: "Payment",
  NetworkID: 21338,              // Xahau Testnet — 他のネットワークで署名しないため
  Account: "送信元アカウント",      // ログイン中のユーザーのアカウント
  Destination: "宛先アカウント",
  Amount: "1000000",             // drops単位（1 XAH = 1,000,000 drops）
}
\`\`\`

金額は常に**drops**（XAHの最小単位）で表します。変換：\`drops = XAH × 1,000,000\`

### SDKでペイロードを作成する

\`\`\`javascript
const { created, resolved } = await xumm.payload.createAndSubscribe(
  { txjson: transaction },
  (event) => {
    // このコールバックは更新があるたびに呼ばれる
    if ("signed" in event.data) {
      return event.data;  // 結果でPromiseを解決
    }
  }
);
\`\`\`

- \`created\` には \`created.refs.qr_png\`（QR URL）と \`created.next.always\`（ディープリンク）が含まれる
- \`resolved\` はユーザーが署名または拒否したときに解決するPromise
- \`resolved.signed === true\` → 署名成功、\`resolved.txid\` がハッシュ

### 送信前のバリデーション

ペイロード作成前に必ずクライアント側でバリデーション：
- 宛先アドレスが有効（\`r\`で始まり、~25-34文字）
- 金額が正の数
- 送信元と同じアカウントではない

### Xamanからトランザクション状態を確認する

署名後にレジャーへ接続する必要はありません：**\`xumm.payload.get(uuid)\`**でペイロードを照会できます。レスポンスには\`response.dispatched_result\`が含まれ、レジャーの結果コードが入っています：

- \`"tesSUCCESS"\` → トランザクションが正常に確認された
- その他の値（例：\`"tecINSUF_RESERVE_LINE"\`）→ レジャーでエラー

\`\`\`javascript
const payloadResult = await xumm.payload.get(created.uuid);
const status = payloadResult.response.dispatched_result; // "tesSUCCESS" またはエラーコード
const txid   = result.txid;                              // トランザクションハッシュ
\`\`\``,
      },
      codeBlocks: [
        {
          title: {
            es: "Instalación y configuración básica del proyecto",
            en: "SDK installation and project basic setup",
            jp: "SDKのインストールとプロジェクトの基本設定",
          },
          language: "bash",
          code: {
            es: `# No hay necesitar de ejecutar esta parte si ya lo has hecho en la sección anterior
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# Después de modificar src/App.jsx ejecutar:
npm run dev`,
            en: `# No need to run this part if you already did it in the previous step
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# After modifying src/App.jsx run:
npm run dev`,
            jp: ``,
          },
        },
        {
          title: {
            es: "App.jsx — Login con QR modal + Payment con QR modal",
            en: "App.jsx — QR modal login + QR modal payment",
            jp: "App.jsx — QRモーダルログイン＋QRモーダルPayment",
          },
          language: "javascript",
          code: {
            es: `// src/App.jsx — Todo en tu propia página: QR modal para login y QR modal para pago
// ANTES DE EJECUTAR:
// En apps.xumm.dev → tu app → Origin/Redirect URLs → añade http://localhost:5173
// Añade la API Key de tu app: xumm = new Xumm("TU_API_KEY_AQUI");
//
// Un solo <QRModal> reutilizable sirve tanto para el login como para el pago.
// El usuario nunca sale de tu página — todo ocurre dentro de tu propio modal.

import { useState, useEffect } from "react";
import { Xumm } from "xumm";
import { Client } from "xahau";

const xumm = new Xumm("TU_API_KEY_AQUI");

function xahToDrops(xah) {
  return String(Math.floor(Number(xah) * 1_000_000));
}

function esRAddressValida(address) {
  return /^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(address);
}

async function obtenerInfoCuenta(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const res = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "current",
    });
    const info = res.result.account_data;
    return {
      balance: (Number(info.Balance) / 1_000_000).toFixed(6),
      sequence: info.Sequence,
    };
  } catch (err) {
    if (err.data?.error === "actNotFound") return { balance: "no activada", sequence: "—" };
    throw err;
  } finally {
    await client.disconnect();
  }
}

// ── Modal reutilizable — mismo componente para login y pago ──────────────────
function QRModal({ titulo, qrUrl, deepLink, onCancel }) {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: "2rem",
        textAlign: "center", maxWidth: 300, width: "90%",
      }}>
        <h2 style={{ marginTop: 0 }}>{titulo}</h2>
        <img src={qrUrl} alt="QR Xaman" width={220}
          style={{ display: "block", margin: "0 auto" }} />
        <p style={{ fontSize: "0.9rem" }}>
          ¿En móvil?{" "}
          <a href={deepLink} rel="noopener noreferrer">Abre Xaman directamente</a>
        </p>
        <button onClick={onCancel} style={{ marginTop: "0.5rem" }}>Cancelar</button>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function App() {
  const [account, setAccount]   = useState(null);
  const [balance, setBalance]   = useState(null);
  const [sequence, setSequence] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // Estado del pago
  const [destino, setDestino]   = useState("");
  const [cantidad, setCantidad] = useState("");
  const [txid, setTxid]         = useState(null);
  const [txStatus, setTxStatus] = useState(null);

  // Estado del QR modal (compartido entre login y pago)
  const [qrUrl, setQrUrl]         = useState(null);
  const [deepLink, setDeepLink]   = useState(null);
  const [qrTitulo, setQrTitulo]   = useState("");

  // Restaurar sesión si el SDK ya tiene un token guardado
  useEffect(() => {
    xumm.on("ready", async () => {
      const me = await xumm.me;
      if (me?.account) {
        setAccount(me.account);
        const info = await obtenerInfoCuenta(me.account);
        setBalance(info.balance);
        setSequence(info.sequence);
      }
    });
  }, []);

  // ── Login con QR modal ────────────────────────────────────────────────────
  async function conectarConXaman() {
    setLoading(true);
    setError(null);
    try {
      const { created, resolved } = await xumm.payload.createAndSubscribe(
        { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
        (event) => {
          if (typeof event.data.signed !== "undefined") return event.data;
        }
      );

      setQrTitulo("Inicia sesión con Xaman");
      setQrUrl(created.refs.qr_png);
      setDeepLink(created.next.always);

      const result = await resolved;
      setQrUrl(null);
      setDeepLink(null);

      if (result.signed) {
        const payloadResult = await xumm.payload.get(created.uuid);
        const userAccount = payloadResult.response.account;
        setAccount(userAccount);
        const info = await obtenerInfoCuenta(userAccount);
        setBalance(info.balance);
        setSequence(info.sequence);
      } else {
        setError("Login rechazado por el usuario");
      }
    } catch (err) {
      setError(\`Error: \${err.message || "No se pudo conectar"}\`);
    } finally {
      setLoading(false);
    }
  }

  // ── Pago con QR modal ─────────────────────────────────────────────────────
  async function enviarPago(e) {
    e.preventDefault();
    setError(null);
    setTxid(null);
    setTxStatus(null);

    if (!esRAddressValida(destino)) {
      setError("Dirección destino inválida (debe empezar por 'r')");
      return;
    }
    if (destino === account) {
      setError("No puedes enviarte a ti mismo");
      return;
    }
    const cantidadNum = Number(cantidad);
    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      setError("Introduce una cantidad válida mayor que 0");
      return;
    }

    setLoading(true);
    try {
      const { created, resolved } = await xumm.payload.createAndSubscribe(
        {
          txjson: {
            TransactionType: "Payment",
            NetworkID: 21338,
            Account: account,
            Destination: destino,
            Amount: xahToDrops(cantidadNum),
          },
        },
        (event) => {
          if (typeof event.data.signed !== "undefined") return event.data;
        }
      );

      setQrTitulo("Firma el pago con Xaman");
      setQrUrl(created.refs.qr_png);
      setDeepLink(created.next.always);

      const result = await resolved;
      setQrUrl(null);
      setDeepLink(null);

      if (result.signed) {
        const payloadResult = await xumm.payload.get(created.uuid);
        setTxid(result.txid);
        setTxStatus(payloadResult.response.dispatched_result);
      } else {
        setError("El usuario rechazó la transacción");
      }
    } catch (err) {
      setError(\`Error: \${err.message || "No se pudo crear el pago"}\`);
    } finally {
      setLoading(false);
    }
  }

  function cancelar() {
    setQrUrl(null);
    setDeepLink(null);
    setLoading(false);
  }

  async function desconectar() {
    await xumm.logout();
    setAccount(null);
    setBalance(null);
    setSequence(null);
    setTxid(null);
    setTxStatus(null);
    setDestino("");
    setCantidad("");
  }

  // ── Renderizado ────────────────────────────────────────────────────────────
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 520, margin: "0 auto" }}>
      <h1>💸 Xahau Payment — QR Modal</h1>

      {account ? (
        <div>
          <p>✅ Conectado</p>
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem" }}>
            <tbody>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Cuenta</td>
                <td><code style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>{account}</code></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Balance</td>
                <td><strong>{balance} XAH</strong></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Secuencia</td>
                <td>{sequence}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={desconectar}>Desconectar</button>
        </div>
      ) : (
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={conectarConXaman} disabled={loading}>
            {loading ? "Generando QR de login..." : "🔑 Conectar con Xaman"}
          </button>
        </div>
      )}

      {/* Formulario de pago */}
      {account && !qrUrl && (
        <form onSubmit={enviarPago} style={{ marginTop: "1.5rem", borderTop: "1px solid #ddd", paddingTop: "1.5rem" }}>
          <h2 style={{ marginTop: 0 }}>Enviar XAH</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: 4 }}>Dirección destino:</label>
            <input
              type="text"
              placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: 4 }}>Cantidad (XAH):</label>
            <input
              type="number"
              placeholder="0.01"
              min="0.000001"
              step="0.000001"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              style={{ width: 160, padding: 8 }}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Generando QR del pago..." : "📤 Enviar pago"}
          </button>
        </form>
      )}

      {/* Resultado del pago */}
      {txid && (
        <div style={{
          background: txStatus === "tesSUCCESS" ? "#1a3a1a" : "#3a1a1a",
          border: \`1px solid \${txStatus === "tesSUCCESS" ? "#4caf50" : "#e53935"}\`,
          padding: 16, borderRadius: 8, marginTop: "1.5rem",
          color: "#ffffff",
        }}>
          {txStatus === "tesSUCCESS" ? (
            <>
              <p style={{ margin: "0 0 8px", color: "#4caf50" }}>✅ <strong>¡Pago confirmado!</strong></p>
              <p style={{ margin: "0 0 4px", fontSize: "0.85rem", color: "#cccccc" }}>Hash de la transacción:</p>
              <p style={{ margin: "0 0 8px" }}>
                <code style={{ fontSize: "0.75rem", wordBreak: "break-all", color: "#ffffff" }}>{txid}</code>
              </p>
              <a
                href={\`https://xaman.app/explorer/21338/\${txid}\`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#66ccff" }}
              >
                🔍 Ver en Xaman Explorer
              </a>
            </>
          ) : (
            <p style={{ margin: 0, color: "#ff8080" }}>⚠️ <strong>Resultado: {txStatus}</strong></p>
          )}
        </div>
      )}

      {/* Un solo modal reutilizable para login y pago */}
      {qrUrl && <QRModal titulo={qrTitulo} qrUrl={qrUrl} deepLink={deepLink} onCancel={cancelar} />}
    </div>
  );
}`,
            en: `// src/App.jsx — Everything in your own page: QR modal for login and QR modal for payment
// BEFORE RUNNING:
// In apps.xumm.dev → your app → Origin/Redirect URLs → add http://localhost:5173
// Add your app's API Key: xumm = new Xumm("YOUR_API_KEY_HERE");
//
// A single reusable <QRModal> handles both login and payment.
// The user never leaves your page — everything happens inside your own modal.

import { useState, useEffect } from "react";
import { Xumm } from "xumm";
import { Client } from "xahau";

const xumm = new Xumm("YOUR_API_KEY_HERE");

function xahToDrops(xah) {
  return String(Math.floor(Number(xah) * 1_000_000));
}

function isValidRAddress(address) {
  return /^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(address);
}

async function getAccountInfo(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const res = await client.request({
      command: "account_info",
      account: address,
      ledger_index: "current",
    });
    const info = res.result.account_data;
    return {
      balance: (Number(info.Balance) / 1_000_000).toFixed(6),
      sequence: info.Sequence,
    };
  } catch (err) {
    if (err.data?.error === "actNotFound") return { balance: "not activated", sequence: "—" };
    throw err;
  } finally {
    await client.disconnect();
  }
}

// ── Reusable modal — same component for login and payment ────────────────────
function QRModal({ title, qrUrl, deepLink, onCancel }) {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: "2rem",
        textAlign: "center", maxWidth: 300, width: "90%",
      }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <img src={qrUrl} alt="QR Xaman" width={220}
          style={{ display: "block", margin: "0 auto" }} />
        <p style={{ fontSize: "0.9rem" }}>
          On mobile?{" "}
          <a href={deepLink} rel="noopener noreferrer">Open Xaman directly</a>
        </p>
        <button onClick={onCancel} style={{ marginTop: "0.5rem" }}>Cancel</button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function App() {
  const [account, setAccount]         = useState(null);
  const [balance, setBalance]         = useState(null);
  const [sequence, setSequence]       = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  // Payment state
  const [destination, setDestination] = useState("");
  const [amount, setAmount]           = useState("");
  const [txid, setTxid]               = useState(null);
  const [txStatus, setTxStatus]       = useState(null);

  // Shared QR modal state (login and payment)
  const [qrUrl, setQrUrl]             = useState(null);
  const [deepLink, setDeepLink]       = useState(null);
  const [qrTitle, setQrTitle]         = useState("");

  // Restore session if the SDK already has a saved token
  useEffect(() => {
    xumm.on("ready", async () => {
      const me = await xumm.me;
      if (me?.account) {
        setAccount(me.account);
        const info = await getAccountInfo(me.account);
        setBalance(info.balance);
        setSequence(info.sequence);
      }
    });
  }, []);

  // ── Login with QR modal ───────────────────────────────────────────────────
  async function connectWithXaman() {
    setLoading(true);
    setError(null);
    try {
      const { created, resolved } = await xumm.payload.createAndSubscribe(
        { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
        (event) => {
          if (typeof event.data.signed !== "undefined") return event.data;
        }
      );

      setQrTitle("Sign in with Xaman");
      setQrUrl(created.refs.qr_png);
      setDeepLink(created.next.always);

      const result = await resolved;
      setQrUrl(null);
      setDeepLink(null);

      if (result.signed) {
        const payloadResult = await xumm.payload.get(created.uuid);
        const userAccount = payloadResult.response.account;
        setAccount(userAccount);
        const info = await getAccountInfo(userAccount);
        setBalance(info.balance);
        setSequence(info.sequence);
      } else {
        setError("Login rejected by the user");
      }
    } catch (err) {
      setError(\`Error: \${err.message || "Could not connect"}\`);
    } finally {
      setLoading(false);
    }
  }

  // ── Payment with QR modal ─────────────────────────────────────────────────
  async function sendPayment(e) {
    e.preventDefault();
    setError(null);
    setTxid(null);
    setTxStatus(null);

    if (!isValidRAddress(destination)) {
      setError("Invalid destination address (must start with 'r')");
      return;
    }
    if (destination === account) {
      setError("You cannot send to yourself");
      return;
    }
    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Enter a valid amount greater than 0");
      return;
    }

    setLoading(true);
    try {
      const { created, resolved } = await xumm.payload.createAndSubscribe(
        {
          txjson: {
            TransactionType: "Payment",
            NetworkID: 21338,
            Account: account,
            Destination: destination,
            Amount: xahToDrops(amountNum),
          },
        },
        (event) => {
          if (typeof event.data.signed !== "undefined") return event.data;
        }
      );

      setQrTitle("Sign the payment with Xaman");
      setQrUrl(created.refs.qr_png);
      setDeepLink(created.next.always);

      const result = await resolved;
      setQrUrl(null);
      setDeepLink(null);

      if (result.signed) {
        const payloadResult = await xumm.payload.get(created.uuid);
        setTxid(result.txid);
        setTxStatus(payloadResult.response.dispatched_result);
      } else {
        setError("The user rejected the transaction");
      }
    } catch (err) {
      setError(\`Error: \${err.message || "Could not create the payment"}\`);
    } finally {
      setLoading(false);
    }
  }

  function cancel() {
    setQrUrl(null);
    setDeepLink(null);
    setLoading(false);
  }

  async function disconnect() {
    await xumm.logout();
    setAccount(null);
    setBalance(null);
    setSequence(null);
    setTxid(null);
    setTxStatus(null);
    setDestination("");
    setAmount("");
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 520, margin: "0 auto" }}>
      <h1>💸 Xahau Payment — QR Modal</h1>

      {account ? (
        <div>
          <p>✅ Connected</p>
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem" }}>
            <tbody>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Account</td>
                <td><code style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>{account}</code></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Balance</td>
                <td><strong>{balance} XAH</strong></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Sequence</td>
                <td>{sequence}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={connectWithXaman} disabled={loading}>
            {loading ? "Generating login QR..." : "🔑 Connect with Xaman"}
          </button>
        </div>
      )}

      {/* Payment form */}
      {account && !qrUrl && (
        <form onSubmit={sendPayment} style={{ marginTop: "1.5rem", borderTop: "1px solid #ddd", paddingTop: "1.5rem" }}>
          <h2 style={{ marginTop: 0 }}>Send XAH</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: 4 }}>Destination address:</label>
            <input
              type="text"
              placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: 4 }}>Amount (XAH):</label>
            <input
              type="number"
              placeholder="0.01"
              min="0.000001"
              step="0.000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: 160, padding: 8 }}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Generating payment QR..." : "📤 Send payment"}
          </button>
        </form>
      )}

      {/* Payment result */}
      {txid && (
        <div style={{
          background: txStatus === "tesSUCCESS" ? "#1a3a1a" : "#3a1a1a",
          border: \`1px solid \${txStatus === "tesSUCCESS" ? "#4caf50" : "#e53935"}\`,
          padding: 16, borderRadius: 8, marginTop: "1.5rem",
          color: "#ffffff",
        }}>
          {txStatus === "tesSUCCESS" ? (
            <>
              <p style={{ margin: "0 0 8px", color: "#4caf50" }}>✅ <strong>Payment confirmed!</strong></p>
              <p style={{ margin: "0 0 4px", fontSize: "0.85rem", color: "#cccccc" }}>Transaction hash:</p>
              <p style={{ margin: "0 0 8px" }}>
                <code style={{ fontSize: "0.75rem", wordBreak: "break-all", color: "#ffffff" }}>{txid}</code>
              </p>
              <a
                href={\`https://xaman.app/explorer/21338/\${txid}\`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#66ccff" }}
              >
                🔍 View on Xaman Explorer
              </a>
            </>
          ) : (
            <p style={{ margin: 0, color: "#ff8080" }}>⚠️ <strong>Result: {txStatus}</strong></p>
          )}
        </div>
      )}

      {/* Single reusable modal for login and payment */}
      {qrUrl && <QRModal title={qrTitle} qrUrl={qrUrl} deepLink={deepLink} onCancel={cancel} />}
    </div>
  );
}`,
            jp: `// src/App.jsx — すべて自分のページで：ログインもPaymentもQRモーダル
// 実行前に:
// apps.xumm.dev → あなたのアプリ → Origin/Redirect URLs → http://localhost:5173 を追加
// APIキーを設定: xumm = new Xumm("YOUR_API_KEY_HERE");
//
// 再利用可能な<QRModal>1つでログインと支払いの両方を処理します。
// ユーザーはページを離れません — すべてが自分のモーダル内で完結します。

import { useState, useEffect } from "react";
import { Xumm } from "xumm";
import { Client } from "xahau";

const xumm = new Xumm("YOUR_API_KEY_HERE");

function xahToDrops(xah) { return String(Math.floor(Number(xah) * 1_000_000)); }
function isValidRAddress(address) { return /^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(address); }

async function getAccountInfo(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const res = await client.request({ command: "account_info", account: address, ledger_index: "current" });
    const info = res.result.account_data;
    return { balance: (Number(info.Balance) / 1_000_000).toFixed(6), sequence: info.Sequence };
  } catch (err) {
    if (err.data?.error === "actNotFound") return { balance: "未アクティブ", sequence: "—" };
    throw err;
  } finally { await client.disconnect(); }
}

// ── 再利用可能モーダル — ログインと支払いで同じコンポーネント ────────────────
function QRModal({ title, qrUrl, deepLink, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", textAlign: "center", maxWidth: 300, width: "90%" }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <img src={qrUrl} alt="QR Xaman" width={220} style={{ display: "block", margin: "0 auto" }} />
        <p style={{ fontSize: "0.9rem" }}>モバイルの場合?{" "}<a href={deepLink} rel="noopener noreferrer">Xamanを直接開く</a></p>
        <button onClick={onCancel} style={{ marginTop: "0.5rem" }}>キャンセル</button>
      </div>
    </div>
  );
}

export default function App() {
  const [account, setAccount]         = useState(null);
  const [balance, setBalance]         = useState(null);
  const [sequence, setSequence]       = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [destination, setDestination] = useState("");
  const [amount, setAmount]           = useState("");
  const [txid, setTxid]               = useState(null);
  const [txStatus, setTxStatus]       = useState(null);
  const [qrUrl, setQrUrl]             = useState(null);
  const [deepLink, setDeepLink]       = useState(null);
  const [qrTitle, setQrTitle]         = useState("");

  useEffect(() => {
    xumm.on("ready", async () => {
      const me = await xumm.me;
      if (me?.account) {
        setAccount(me.account);
        const info = await getAccountInfo(me.account);
        setBalance(info.balance); setSequence(info.sequence);
      }
    });
  }, []);

  // ── QRモーダルでログイン ──────────────────────────────────────────────────
  async function connectWithXaman() {
    setLoading(true); setError(null);
    try {
      const { created, resolved } = await xumm.payload.createAndSubscribe(
        { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
        (event) => { if (typeof event.data.signed !== "undefined") return event.data; }
      );
      setQrTitle("Xamanでサインイン"); setQrUrl(created.refs.qr_png); setDeepLink(created.next.always);
      const result = await resolved;
      setQrUrl(null); setDeepLink(null);
      if (result.signed) {
        const p = await xumm.payload.get(created.uuid);
        setAccount(p.response.account);
        const info = await getAccountInfo(p.response.account);
        setBalance(info.balance); setSequence(info.sequence);
      } else { setError("ログインがユーザーに拒否されました"); }
    } catch (err) { setError(\`エラー: \${err.message || "接続できませんでした"}\`); }
    finally { setLoading(false); }
  }

  // ── QRモーダルで支払い ────────────────────────────────────────────────────
  async function sendPayment(e) {
    e.preventDefault(); setError(null); setTxid(null); setTxStatus(null);
    if (!isValidRAddress(destination)) { setError("無効な宛先アドレス（'r'で始まる必要があります）"); return; }
    if (destination === account) { setError("自分自身には送れません"); return; }
    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) { setError("0より大きい有効な金額を入力してください"); return; }
    setLoading(true);
    try {
      const { created, resolved } = await xumm.payload.createAndSubscribe(
        { txjson: { TransactionType: "Payment", NetworkID: 21338, Account: account, Destination: destination, Amount: xahToDrops(amountNum) } },
        (event) => { if (typeof event.data.signed !== "undefined") return event.data; }
      );
      setQrTitle("Xamanで支払いに署名"); setQrUrl(created.refs.qr_png); setDeepLink(created.next.always);
      const result = await resolved;
      setQrUrl(null); setDeepLink(null);
      if (result.signed) {
        const p = await xumm.payload.get(created.uuid);
        setTxid(result.txid); setTxStatus(p.response.dispatched_result);
      } else { setError("ユーザーがトランザクションを拒否しました"); }
    } catch (err) { setError(\`エラー: \${err.message || "支払いを作成できませんでした"}\`); }
    finally { setLoading(false); }
  }

  function cancel() { setQrUrl(null); setDeepLink(null); setLoading(false); }

  async function disconnect() {
    await xumm.logout();
    setAccount(null); setBalance(null); setSequence(null);
    setTxid(null); setTxStatus(null); setDestination(""); setAmount("");
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 520, margin: "0 auto" }}>
      <h1>💸 Xahau Payment — QRモーダル</h1>
      {account ? (
        <div>
          <p>✅ 接続済み</p>
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem" }}>
            <tbody>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>アカウント</td><td><code style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>{account}</code></td></tr>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>残高</td><td><strong>{balance} XAH</strong></td></tr>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>シーケンス</td><td>{sequence}</td></tr>
            </tbody>
          </table>
          <button onClick={disconnect}>切断</button>
        </div>
      ) : (
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={connectWithXaman} disabled={loading}>{loading ? "ログインQRを生成中..." : "🔑 Xamanで接続"}</button>
        </div>
      )}
      {account && !qrUrl && (
        <form onSubmit={sendPayment} style={{ marginTop: "1.5rem", borderTop: "1px solid #ddd", paddingTop: "1.5rem" }}>
          <h2 style={{ marginTop: 0 }}>XAHを送る</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: 4 }}>宛先アドレス:</label>
            <input type="text" placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" value={destination} onChange={(e) => setDestination(e.target.value)} style={{ width: "100%", padding: 8, boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: 4 }}>金額（XAH）:</label>
            <input type="number" placeholder="0.01" min="0.000001" step="0.000001" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: 160, padding: 8 }} />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>{loading ? "支払いQRを生成中..." : "📤 支払いを送る"}</button>
        </form>
      )}
      {txid && (
        <div style={{ background: txStatus === "tesSUCCESS" ? "#1a3a1a" : "#3a1a1a", border: \`1px solid \${txStatus === "tesSUCCESS" ? "#4caf50" : "#e53935"}\`, padding: 16, borderRadius: 8, marginTop: "1.5rem", color: "#ffffff" }}>
          {txStatus === "tesSUCCESS" ? (
            <>
              <p style={{ margin: "0 0 8px", color: "#4caf50" }}>✅ <strong>支払い確認済み！</strong></p>
              <p style={{ margin: "0 0 4px", fontSize: "0.85rem", color: "#cccccc" }}>トランザクションハッシュ:</p>
              <p style={{ margin: "0 0 8px" }}><code style={{ fontSize: "0.75rem", wordBreak: "break-all", color: "#ffffff" }}>{txid}</code></p>
              <a href={\`https://xaman.app/explorer/21338/\${txid}\`} target="_blank" rel="noopener noreferrer" style={{ color: "#66ccff" }}>🔍 Xaman Explorerで表示</a>
            </>
          ) : (
            <p style={{ margin: 0, color: "#ff8080" }}>⚠️ <strong>結果: {txStatus}</strong></p>
          )}
        </div>
      )}
      {/* ログインと支払いで共有する単一の再利用可能モーダル */}
      {qrUrl && <QRModal title={qrTitle} qrUrl={qrUrl} deepLink={deepLink} onCancel={cancel} />}
    </div>
  );
}`,
          },
        },
      ],
      slides: [
        {
          title: {
            es: "Flujo de pago con Xaman",
            en: "Payment flow with Xaman",
            jp: "Xamanを使った支払いフロー",
          },
          content: {
            es: "El usuario firma dos veces:\n\n1er QR — Login (SignIn, sin fee)\n• Identifica al usuario → obttienes su dirección\n\n2do QR — Pago (Payment, con fee)\n• Muestra destino y cantidad\n• Usuario revisa y aprueba\n• Recibes txid de la tx firmada",
            en: "The user scans twice:\n\n1st QR — Login (SignIn, no fee)\n• Identifies user → you get their address\n\n2nd QR — Payment (with fee)\n• Shows destination and amount\n• User reviews and approves\n• You receive txid of signed tx",
            jp: "ユーザーは2回スキャン：\n\n1枚目QR — ログイン（SignIn、手数料なし）\n• ユーザーを識別 → アドレスを取得\n\n2枚目QR — 支払い（手数料あり）\n• 宛先と金額を表示\n• ユーザーが確認・承認\n• 署名済みtxのtxidを受信",
          },
          visual: "💸",
        },
        {
          title: {
            es: "Drops: la unidad de XAH",
            en: "Drops: the XAH unit",
            jp: "Drops：XAHの単位",
          },
          content: {
            es: "Las cantidades se expresan en drops:\n\n1 XAH = 1,000,000 drops\n0.5 XAH = 500,000 drops\n0.000001 XAH = 1 drop (mínimo)\n\nConversión en código:\ndrops = Math.floor(xah * 1_000_000)\nxah = drops / 1_000_000\n\nSiempre usa strings para Amount en el JSON",
            en: "Amounts are expressed in drops:\n\n1 XAH = 1,000,000 drops\n0.5 XAH = 500,000 drops\n0.000001 XAH = 1 drop (minimum)\n\nConversion in code:\ndrops = Math.floor(xah * 1_000_000)\nxah = drops / 1_000_000\n\nAlways use strings for Amount in JSON",
            jp: "金額はdropsで表します：\n\n1 XAH = 1,000,000 drops\n0.5 XAH = 500,000 drops\n0.000001 XAH = 1 drop（最小単位）\n\nコードでの変換：\ndrops = Math.floor(xah × 1,000,000)\nxah = drops / 1,000,000\n\nJSONのAmountには常にstringを使用",
          },
          visual: "🔢",
        },
        {
          title: {
            es: "createAndSubscribe: el método clave",
            en: "createAndSubscribe: the key method",
            jp: "createAndSubscribe：重要なメソッド",
          },
          content: {
            es: "Un solo método para crear + escuchar:\n\nconst { created, resolved } = await\n  xumm.payload.createAndSubscribe(\n    { txjson: transaccion },\n    (event) => {\n      if ('signed' in event.data)\n        return event.data\n    }\n  )\n\ncreated.refs.qr_png → URL del QR\nawait resolved → firma o rechazo",
            en: "One method to create + listen:\n\nconst { created, resolved } = await\n  xumm.payload.createAndSubscribe(\n    { txjson: transaction },\n    (event) => {\n      if ('signed' in event.data)\n        return event.data\n    }\n  )\n\ncreated.refs.qr_png → QR URL\nawait resolved → sign or reject",
            jp: "作成＋リッスンを一つのメソッドで：\n\nconst { created, resolved } = await\n  xumm.payload.createAndSubscribe(\n    { txjson: transaction },\n    (event) => {\n      if ('signed' in event.data)\n        return event.data\n    }\n  )\n\ncreated.refs.qr_png → QR URL\nawait resolved → 署名または拒否",
          },
          visual: "🔄",
        },
      ],
    },
    {
      id: "m11l4",
      title: {
        es: "Backend: servidor Node.js con Express y Xaman",
        en: "Backend: Node.js server with Express and Xaman",
        jp: "バックエンド：ExpressとXamanを使ったNode.jsサーバー",
      },
      theory: {
        es: `En la lección anterior el frontend creaba los payloads directamente desde el navegador (usando solo el API Key). El enfoque **backend** añade una capa de seguridad y lógica de negocio: el servidor crea los payloads usando la API Key y el **API Secret**, y el frontend solo recibe el QR para mostrarlo.

### ¿Por qué usar un backend?

- **Lógica de negocio**: validar reglas de negocio antes de crear el pago
- **API Secret seguro**: el secret nunca llega al navegador
- **Auditoría**: guardar un registro de todas las transacciones en tu base de datos
- **Webhooks**: recibir notificaciones de Xaman en tu servidor cuando el usuario firma
- **Integración**: conectar con otros sistemas (email, CRM, contabilidad)

### Arquitectura del proyecto backend

\`\`\`
Frontend (React)          Backend (Express)          Xaman API
     │                          │                         │
     │── POST /pago ──────────▶ │                         │
     │   { destino, cantidad }  │── Crear payload ────────▶│
     │                          │◀── UUID + QR URL ────────│
     │◀── { qrUrl, uuid } ───── │                         │
     │                          │                         │
     │ (muestra QR al usuario)  │                         │
     │                          │◀── Webhook: signed ──────│
     │                          │   (usuario firmó)        │
     │                          │── Guardar en DB          │
     │                          │── Verificar ledger       │
\`\`\`

### Webhooks vs Suscripción WebSocket

Tienes dos formas de recibir la notificación de firma:

**Webhook** (recomendado para producción):
- Xaman hace un HTTP POST a tu servidor cuando el usuario firma
- Necesitas una URL pública (no funciona en localhost sin un túnel)
- Más robusto, no necesitas mantener conexión abierta

**Suscripción WebSocket** (más fácil para desarrollo):
- El SDK mantiene una conexión WebSocket con Xaman
- Recibes la notificación en tiempo real en tu código Node.js
- Funciona en localhost sin configuración extra

### Configurar el webhook en el dashboard

1. En **apps.xumm.dev**, ve a tu app
2. En "Webhook", introduce la URL de tu servidor: \`https://tu-servidor.com/webhook/xaman\`
3. Guarda los cambios
4. Xaman enviará un POST a esa URL con el resultado de cada payload

### Variables de entorno (nunca hardcodear secrets)

\`\`\`bash
# .env (nunca comitear este archivo a git)
XUMM_API_KEY=tu-api-key-aqui
XUMM_API_SECRET=tu-api-secret-aqui
PORT=3001
\`\`\`

Añade \`.env\` a tu \`.gitignore\` para que las credenciales nunca se suban a GitHub.

Si tienes sospechas de que tu API Secret ha sido comprometida, rota las credenciales desde el dashboard de Xumm: genera un nuevo par de API Key + API Secret, actualiza tu backend con las nuevas credenciales, y elimina las antiguas.

### Estructura del proyecto backend

\`\`\`
xaman-backend/
├── .env              # Credenciales (nunca a git)
├── .gitignore        # Incluye .env
├── package.json
├── server.js         # Servidor Express principal
└── src/
    ├── xumm.js       # Instancia compartida del SDK
    ├── routes/
    │   ├── auth.js   # Rutas de login
    │   └── pago.js   # Rutas de pago
    └── webhook.js    # Handler del webhook de Xaman
\`\`\``,
        en: `In the previous lesson the frontend created payloads directly from the browser (using only the API Key). The **backend** approach adds a security layer and business logic: the server creates payloads using the API Key and **API Secret**, and the frontend only receives the QR to display.

### Why use a backend?

- **Business logic**: validate rules before creating the payment
- **Secure API Secret**: the secret never reaches the browser
- **Audit trail**: save a record of all transactions in your database
- **Webhooks**: receive Xaman notifications when the user signs
- **Integration**: connect with other systems (email, CRM, accounting)

### Backend project architecture

\`\`\`
Frontend (React)          Backend (Express)          Xaman API
     │                          │                         │
     │── POST /payment ────────▶ │                         │
     │   { destination, amount } │── Create payload ───────▶│
     │                          │◀── UUID + QR URL ─────────│
     │◀── { qrUrl, uuid } ───── │                         │
     │                          │                         │
     │ (show QR to user)        │                         │
     │                          │◀── Webhook: signed ──────│
     │                          │   (user signed)          │
     │                          │── Save to DB             │
     │                          │── Verify ledger          │
\`\`\`

### Webhooks vs WebSocket subscription

You have two ways to receive the signing notification:

**Webhook** (recommended for production):
- Xaman sends an HTTP POST to your server when the user signs
- Needs a public URL (doesn't work on localhost without a tunnel)
- More robust — no need to keep a connection open

**WebSocket subscription** (easier for development):
- The SDK maintains a WebSocket connection with Xaman
- Real-time notification in your Node.js code
- Works on localhost without extra configuration

### Configure the webhook in the dashboard

1. In **apps.xumm.dev**, go to your app
2. Under "Webhook", enter your server URL: \`https://your-server.com/webhook/xaman\`
3. Save the changes
4. Xaman will send a POST to that URL with the result of each payload

### Environment variables (never hardcode secrets)

\`\`\`bash
# .env (never commit this file to git)
XUMM_API_KEY=your-api-key-here
XUMM_API_SECRET=your-api-secret-here
PORT=3001
\`\`\`

Add \`.env\` to your \`.gitignore\` so credentials never go to GitHub.

If you suspect your API Secret has been compromised, rotate the credentials from the Xumm dashboard: generate a new API Key + API Secret pair, update your backend with the new credentials, and delete the old ones.

### Backend project structure

\`\`\`
xaman-backend/
├── .env              # Credentials (never to git)
├── .gitignore        # Includes .env
├── package.json
├── server.js         # Main Express server
└── src/
    ├── xumm.js       # Shared SDK instance
    ├── routes/
    │   ├── auth.js   # Login routes
    │   └── payment.js # Payment routes
    └── webhook.js    # Xaman webhook handler
\`\`\``,
        jp: `前のレッスンではフロントエンドがブラウザから直接ペイロードを作成しました（APIキーのみ使用）。**バックエンド**アプローチはセキュリティレイヤーとビジネスロジックを追加します：サーバーがAPIキーと**APIシークレット**を使ってペイロードを作成し、フロントエンドは表示するQRのみを受け取ります。

### なぜバックエンドを使うのか？

- **ビジネスロジック**：支払い前にルールを検証
- **APIシークレットの保護**：シークレットがブラウザに届かない
- **監査証跡**：データベースに全トランザクションの記録を保存
- **Webhook**：ユーザーが署名した際にXamanから通知を受信
- **統合**：他のシステムとの連携（メール、CRM、会計）

### バックエンドプロジェクトのアーキテクチャ

\`\`\`
Frontend (React)          Backend (Express)          Xaman API
     │                          │                         │
     │── POST /payment ────────▶ │                         │
     │   { destination, amount } │── ペイロード作成 ────────▶│
     │                          │◀── UUID + QR URL ─────────│
     │◀── { qrUrl, uuid } ───── │                         │
     │                          │                         │
     │ （ユーザーにQR表示）       │                         │
     │                          │◀── Webhook: signed ──────│
     │                          │   （ユーザーが署名）       │
     │                          │── DBに保存               │
     │                          │── レジャーで確認          │
\`\`\`

### Webhookと WebSocketサブスクリプション

署名通知を受け取る方法は2つあります：

**Webhook**（本番環境推奨）：
- ユーザーが署名するとXamanがサーバーにHTTP POSTを送信
- 公開URLが必要（トンネルなしではlocalhostで動作しない）
- より堅牢 — 接続を維持する必要なし

**WebSocketサブスクリプション**（開発に最適）：
- SDKがXamanとWebSocket接続を維持
- Node.jsコードでリアルタイム通知
- 追加設定なしでlocalhostで動作

### ダッシュボードでWebhookを設定する

1. **apps.xumm.dev**でアプリに移動
2. 「Webhook」にサーバーURLを入力：\`https://your-server.com/webhook/xaman\`
3. 変更を保存
4. XamanがペイロードごとにそのURLへPOSTを送信する

### 環境変数（シークレットをハードコードしない）

\`\`\`bash
# .env （このファイルはgitにコミットしない）
XUMM_API_KEY=your-api-key-here
XUMM_API_SECRET=your-api-secret-here
PORT=3001
\`\`\`

\`.env\`を\`.gitignore\`に追加して認証情報がGitHubに上がらないようにしましょう。

APIシークレットが漏洩した疑いがある場合は、Xummダッシュボードから認証情報をローテーションしてください：新しいAPIキー＋APIシークレットのペアを生成し、バックエンドを新しい認証情報で更新して、古いものを削除します。

### バックエンドプロジェクトの構造

\`\`\`
xaman-backend/
├── .env              # 認証情報（gitには含めない）
├── .gitignore        # .envを含む
├── package.json
├── server.js         # メインExpressサーバー
└── src/
    ├── xumm.js       # 共有SDKインスタンス
    ├── routes/
    │   ├── auth.js   # ログインルート
    │   └── payment.js # 支払いルート
    └── webhook.js    # XamanのWebhookハンドラー
\`\`\``,
      },
      codeBlocks: [
        {
          title: {
            es: "Comandos de instalación",
            en: "Installation commands",
            jp: "インストールコマンド",
          },
          language: "bash",
          code: {
            es: `# 1. Crear el directorio del proyecto
mkdir xaman-backend
cd xaman-backend

# 2. Crear la carpeta para el frontend estático
mkdir public

# 3. Instalar dependencias
npm init -y
npm install express xumm dotenv cors
npm install --save-dev nodemon

# 4. Crear el .gitignore
printf ".env\\nnode_modules/\\n" > .gitignore

# 5. Arrancar en modo desarrollo (una vez que tengas package.json, server.js y public/index.html)
npm run dev
# Abre http://localhost:3001 en el navegador`,
            en: `# 1. Create the project directory
mkdir xaman-backend
cd xaman-backend

# 2. Create the folder for static frontend files
mkdir public

# 3. Install dependencies
npm init -y
npm install express xumm dotenv cors
npm install --save-dev nodemon

# 4. Create the .gitignore
printf ".env\\nnode_modules/\\n" > .gitignore

# 5. Start in development mode (once you have package.json, server.js and public/index.html)
npm run dev
# Open http://localhost:3001 in the browser`,
            jp: `# 1. Create the project directory
mkdir xaman-backend
cd xaman-backend

# 2. Create the folder for static frontend files
mkdir public

# 3. Install dependencies
npm init -y
npm install express xumm dotenv cors
npm install --save-dev nodemon

# 4. Create the .gitignore
printf ".env\\nnode_modules/\\n" > .gitignore

# 5. Start in development mode (once you have package.json, server.js and public/index.html)
npm run dev
# Open http://localhost:3001 in the browser`,
          },
        },
        {
          title: {
            es: "package.json — copia y pega este archivo completo",
            en: "package.json — copy and paste this complete file",
            jp: "package.json — このファイルをそのままコピー",
          },
          language: "json",
          code: `{
  "name": "xaman-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "xumm": "^1.8.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}`,
        },
        {
          title: {
            es: ".env — credenciales (nunca subir a git)",
            en: ".env — credentials (never push to git)",
            jp: ".env — 認証情報（gitにpushしない）",
          },
          language: "bash",
          code: {
            es: `# Crea el archivo .env en la raíz del proyecto xaman-backend/
# Sustituye los valores por los de tu app en apps.xumm.dev

XUMM_API_KEY=tu-api-key-aqui
XUMM_API_SECRET=tu-api-secret-aqui
PORT=3001`,
            en: `# Create the .env file in the root of the xaman-backend/ project
# Replace the values with those from your app at apps.xumm.dev

XUMM_API_KEY=your-api-key-here
XUMM_API_SECRET=your-api-secret-here
PORT=3001`,
            jp: `# Create the .env file in the root of the xaman-backend/ project
# Replace the values with those from your app at apps.xumm.dev

XUMM_API_KEY=your-api-key-here
XUMM_API_SECRET=your-api-secret-here
PORT=3001`,
          },
        },
        {
          title: {
            es: "server.js — Servidor Express completo con Xaman",
            en: "server.js — Full Express server with Xaman",
            jp: "server.js — XamanとExpressの完全なサーバー",
          },
          language: "javascript",
          code: {
            es: `// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { Xumm } from "xumm";

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middlewares ───────────────────────────────────────────────────────────────
app.use(cors());               // permite llamadas desde el mismo origen (public/)
app.use(express.json());
app.use(express.static("public")); // sirve public/index.html en http://localhost:3001

// ── SDK de Xaman (backend: API Key + API Secret) ──────────────────────────────
const xumm = new Xumm(
  process.env.XUMM_API_KEY,
  process.env.XUMM_API_SECRET
);

// ── Ruta: Login — crear payload SignIn ────────────────────────────────────────
app.post("/api/login", async (req, res) => {
  try {
    const payload = await xumm.payload.create({
      txjson: { TransactionType: "SignIn", NetworkID: 21338 },
    });

    // Devolver al frontend el QR y el UUID para seguir el estado
    res.json({
      uuid: payload.uuid,
      qrUrl: payload.refs.qr_png,
      deepLink: payload.next.always,
    });
  } catch (err) {
    console.error("Error creando SignIn:", err);
    res.status(500).json({ error: "No se pudo crear el payload de login" });
  }
});

// ── Ruta: Comprobar estado del login ──────────────────────────────────────────
app.get("/api/login/:uuid", async (req, res) => {
  try {
    const payload = await xumm.payload.get(req.params.uuid);

    if (!payload) {
      return res.status(404).json({ error: "Payload no encontrado" });
    }

    const signed  = payload.meta.signed;
    const account = payload.response?.account ?? null;

    if (signed) {
      res.json({ signed: true, account });
    } else {
      res.json({ signed: false, expired: payload.meta.expired });
    }
  } catch (err) {
    res.status(500).json({ error: "Error consultando el payload" });
  }
});

// ── Ruta: Crear pago ──────────────────────────────────────────────────────────
app.post("/api/pago", async (req, res) => {
  const { origen, destino, cantidadXAH } = req.body;

  // Validaciones de negocio en el servidor
  if (!origen || !destino || !cantidadXAH) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }
  if (!/^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(destino)) {
    return res.status(400).json({ error: "Dirección destino inválida" });
  }
  const cantidad = Number(cantidadXAH);
  if (isNaN(cantidad) || cantidad <= 0) {
    return res.status(400).json({ error: "Cantidad inválida" });
  }

  try {
    const drops = String(Math.floor(cantidad * 1_000_000));

    const payload = await xumm.payload.create({
      txjson: {
        TransactionType: "Payment",
        NetworkID: 21338,
        Account: origen,
        Destination: destino,
        Amount: drops,
      },
    });

    res.json({
      uuid: payload.uuid,
      qrUrl: payload.refs.qr_png,
      deepLink: payload.next.always,
    });
  } catch (err) {
    console.error("Error creando pago:", err);
    res.status(500).json({ error: "No se pudo crear el pago" });
  }
});

// ── Ruta: Comprobar estado del pago ──────────────────────────────────────────
app.get("/api/pago/:uuid", async (req, res) => {
  try {
    const payload = await xumm.payload.get(req.params.uuid);

    if (!payload) {
      return res.status(404).json({ error: "Payload no encontrado" });
    }

    const signed = payload.meta.signed;
    const txid   = payload.response?.txid ?? null;

    if (signed) {
      res.json({ signed: true, txid });
    } else {
      res.json({ signed: false, expired: payload.meta.expired });
    }
  } catch (err) {
    res.status(500).json({ error: "Error consultando el payload" });
  }
});

// ── Ruta: Webhook de Xaman ────────────────────────────────────────────────────
// Configura esta URL en apps.xumm.dev → tu app → Webhook
app.post("/webhook/xaman", (req, res) => {
  const body = req.body;
  console.log("Webhook recibido:", JSON.stringify(body, null, 2));

  // Confirmar recepción a Xaman (importante: responder 200 rápido)
  res.sendStatus(200);

  // Procesar de forma asíncrona
  if (body?.payloadResponse?.signed === true) {
    const { txid, account } = body.payloadResponse;
    console.log(\`✅ Pago firmado por \${account}. TXID: \${txid}\`);
    // Aquí puedes guardar en base de datos, enviar email, etc.
  } else if (body?.payloadResponse?.signed === false) {
    console.log("❌ Pago rechazado por el usuario");
  }
});

// ── Arrancar servidor ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(\`Servidor corriendo en http://localhost:\${PORT}\`);
  console.log(\`Abre en el navegador: http://localhost:\${PORT}\`);
});`,
            en: `// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { Xumm } from "xumm";

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middlewares ───────────────────────────────────────────────────────────────
app.use(cors());               // allow calls from the same origin (public/)
app.use(express.json());
app.use(express.static("public")); // serves public/index.html at http://localhost:3001

// ── Xaman SDK (backend: API Key + API Secret) ─────────────────────────────────
const xumm = new Xumm(
  process.env.XUMM_API_KEY,
  process.env.XUMM_API_SECRET
);

// ── Route: Login — create SignIn payload ──────────────────────────────────────
app.post("/api/login", async (req, res) => {
  try {
    const payload = await xumm.payload.create({
      txjson: { TransactionType: "SignIn", NetworkID: 21338 },
    });

    // Return the QR and UUID to the frontend to track the status
    res.json({
      uuid: payload.uuid,
      qrUrl: payload.refs.qr_png,
      deepLink: payload.next.always,
    });
  } catch (err) {
    console.error("Error creating SignIn:", err);
    res.status(500).json({ error: "Could not create the login payload" });
  }
});

// ── Route: Check login status ─────────────────────────────────────────────────
app.get("/api/login/:uuid", async (req, res) => {
  try {
    const payload = await xumm.payload.get(req.params.uuid);

    if (!payload) {
      return res.status(404).json({ error: "Payload not found" });
    }

    const signed  = payload.meta.signed;
    const account = payload.response?.account ?? null;

    if (signed) {
      res.json({ signed: true, account });
    } else {
      res.json({ signed: false, expired: payload.meta.expired });
    }
  } catch (err) {
    res.status(500).json({ error: "Error querying the payload" });
  }
});

// ── Route: Create payment ─────────────────────────────────────────────────────
app.post("/api/payment", async (req, res) => {
  const { origin, destination, amountXAH } = req.body;

  // Server-side business validations
  if (!origin || !destination || !amountXAH) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!/^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(destination)) {
    return res.status(400).json({ error: "Invalid destination address" });
  }
  const amount = Number(amountXAH);
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const drops = String(Math.floor(amount * 1_000_000));

    const payload = await xumm.payload.create({
      txjson: {
        TransactionType: "Payment",
        NetworkID: 21338,
        Account: origin,
        Destination: destination,
        Amount: drops,
      },
    });

    res.json({
      uuid: payload.uuid,
      qrUrl: payload.refs.qr_png,
      deepLink: payload.next.always,
    });
  } catch (err) {
    console.error("Error creating payment:", err);
    res.status(500).json({ error: "Could not create the payment" });
  }
});

// ── Route: Check payment status ───────────────────────────────────────────────
app.get("/api/payment/:uuid", async (req, res) => {
  try {
    const payload = await xumm.payload.get(req.params.uuid);

    if (!payload) {
      return res.status(404).json({ error: "Payload not found" });
    }

    const signed = payload.meta.signed;
    const txid   = payload.response?.txid ?? null;

    if (signed) {
      res.json({ signed: true, txid });
    } else {
      res.json({ signed: false, expired: payload.meta.expired });
    }
  } catch (err) {
    res.status(500).json({ error: "Error querying the payload" });
  }
});

// ── Route: Xaman Webhook ──────────────────────────────────────────────────────
// Configure this URL in apps.xumm.dev → your app → Webhook
app.post("/webhook/xaman", (req, res) => {
  const body = req.body;
  console.log("Webhook received:", JSON.stringify(body, null, 2));

  // Acknowledge receipt to Xaman (important: respond 200 quickly)
  res.sendStatus(200);

  // Process asynchronously
  if (body?.payloadResponse?.signed === true) {
    const { txid, account } = body.payloadResponse;
    console.log(\`✅ Payment signed by \${account}. TXID: \${txid}\`);
    // Here you can save to the database, send email, etc.
  } else if (body?.payloadResponse?.signed === false) {
    console.log("❌ Payment rejected by the user");
  }
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
  console.log(\`Open in browser: http://localhost:\${PORT}\`);
});`,
            jp: `// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { Xumm } from "xumm";

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const xumm = new Xumm(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);

app.post("/api/login", async (req, res) => {
  try {
    const payload = await xumm.payload.create({ txjson: { TransactionType: "SignIn", NetworkID: 21338 } });
    res.json({ uuid: payload.uuid, qrUrl: payload.refs.qr_png, deepLink: payload.next.always });
  } catch (err) {
    res.status(500).json({ error: "Could not create the login payload" });
  }
});

app.get("/api/login/:uuid", async (req, res) => {
  try {
    const payload = await xumm.payload.get(req.params.uuid);
    if (!payload) return res.status(404).json({ error: "Payload not found" });
    const signed = payload.meta.signed;
    const account = payload.response?.account ?? null;
    if (signed) { res.json({ signed: true, account }); }
    else { res.json({ signed: false, expired: payload.meta.expired }); }
  } catch (err) { res.status(500).json({ error: "Error querying the payload" }); }
});

app.post("/api/payment", async (req, res) => {
  const { origin, destination, amountXAH } = req.body;
  if (!origin || !destination || !amountXAH) return res.status(400).json({ error: "Missing required fields" });
  if (!/^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(destination)) return res.status(400).json({ error: "Invalid destination address" });
  const amount = Number(amountXAH);
  if (isNaN(amount) || amount <= 0) return res.status(400).json({ error: "Invalid amount" });
  try {
    const payload = await xumm.payload.create({ txjson: { TransactionType: "Payment", NetworkID: 21338, Account: origin, Destination: destination, Amount: String(Math.floor(amount * 1_000_000)) } });
    res.json({ uuid: payload.uuid, qrUrl: payload.refs.qr_png, deepLink: payload.next.always });
  } catch (err) { res.status(500).json({ error: "Could not create the payment" }); }
});

app.get("/api/payment/:uuid", async (req, res) => {
  try {
    const payload = await xumm.payload.get(req.params.uuid);
    if (!payload) return res.status(404).json({ error: "Payload not found" });
    const signed = payload.meta.signed;
    const txid = payload.response?.txid ?? null;
    if (signed) { res.json({ signed: true, txid }); }
    else { res.json({ signed: false, expired: payload.meta.expired }); }
  } catch (err) { res.status(500).json({ error: "Error querying the payload" }); }
});

app.post("/webhook/xaman", (req, res) => {
  const body = req.body;
  console.log("Webhook received:", JSON.stringify(body, null, 2));
  res.sendStatus(200);
  if (body?.payloadResponse?.signed === true) {
    console.log(\`✅ Payment signed by \${body.payloadResponse.account}. TXID: \${body.payloadResponse.txid}\`);
  }
});

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
  console.log(\`Open in browser: http://localhost:\${PORT}\`);
});`,
          },
        },
        {
          title: {
            es: "public/index.html — Interfaz completa (pégala en xaman-backend/public/)",
            en: "public/index.html — Full UI (paste into xaman-backend/public/)",
            jp: "public/index.html — 完全なUI（xaman-backend/public/に貼り付け）",
          },
          language: "html",
          code: {
            es: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Xaman Backend Demo</title>
  <style>
    body { font-family: sans-serif; background: #080818; color: #fff;
           max-width: 480px; margin: 0 auto; padding: 2rem; }
    h1   { color: #c8ff00; }
    h2   { color: #aaa; font-size: 1.1rem; margin-top: 1.5rem; }
    button { padding: 0.6rem 1.5rem; background: #6366f1; color: #fff;
             border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; }
    button:disabled { background: #444; cursor: not-allowed; }
    button.danger { background: #ef4444; }
    input { display: block; width: 100%; padding: 0.5rem; margin-bottom: 0.75rem;
            border-radius: 6px; border: 1px solid #333; background: #111;
            color: #fff; font-size: 0.9rem; box-sizing: border-box; }
    .card { background: #111; border: 1px solid #444;
            border-radius: 8px; padding: 1rem; margin-top: 1rem; }
    .card.ok  { border-color: #4caf50; }
    .card.err { border-color: #e53935; }
    .error-msg { color: #ff6b6b; margin: 0.5rem 0; }
    code  { font-family: monospace; word-break: break-all;
            font-size: 0.8rem; color: #c8ff00; }
    a     { color: #66ccff; }
    img   { border-radius: 8px; display: block; margin: 0.75rem auto; }
    hr    { border-color: #333; margin: 1.5rem 0; }
    #paymentSection { display: none; }
  </style>
</head>
<body>
  <h1>💸 Xaman Backend Demo</h1>

  <!-- ── LOGIN ─────────────────────────────────────────── -->
  <div id="loginSection">
    <p>Conéctate con Xaman para continuar.</p>
    <button id="btnLogin" onclick="handleLogin()">🔑 Conectar con Xaman</button>
    <div id="loginQR" class="card" style="display:none">
      <p>Escanea con Xaman:</p>
      <img id="qrLoginImg" src="" alt="QR Login" width="220" />
      <a id="deeplinkLogin" href="#" target="_blank">Abrir en Xaman (móvil)</a>
    </div>
    <p id="loginError" class="error-msg" style="display:none"></p>
  </div>

  <!-- ── PAGO ──────────────────────────────────────────── -->
  <div id="paymentSection">
    <div class="card ok">
      <p style="color:#4caf50; margin:0 0 6px">✅ Conectado como:</p>
      <code id="accountDisplay"></code>
      <br /><br />
      <button class="danger" onclick="logout()">Desconectar</button>
    </div>
    <hr />
    <h2>Enviar XAH</h2>
    <input id="inputDestino" placeholder="Dirección destino (r...)" />
    <input id="inputCantidad" type="number" min="0.000001" step="0.000001"
           placeholder="Cantidad en XAH" />
    <p id="pagoError" class="error-msg" style="display:none"></p>
    <button id="btnPago" onclick="handlePago()">📤 Enviar pago</button>

    <div id="pagoQR" class="card" style="display:none">
      <p>Escanea con Xaman para firmar:</p>
      <img id="qrPagoImg" src="" alt="QR Pago" width="220" />
      <a id="deeplinkPago" href="#" target="_blank">Abrir en Xaman (móvil)</a>
    </div>

    <div id="txResult" class="card ok" style="display:none">
      <p style="color:#4caf50; margin:0 0 6px">✅ <strong>¡Pago confirmado!</strong></p>
      <p style="color:#ccc; font-size:0.85rem; margin:0 0 4px">Hash de la transacción:</p>
      <code id="txidDisplay"></code><br /><br />
      <a id="explorerLink" href="#" target="_blank">🔍 Ver en Xaman Explorer</a>
    </div>
  </div>

  <script>
    const API = "/api";   // misma origin — no hace falta URL absoluta
    let account = null;
    let pollTimer = null;

    function setBtn(id, loading, label) {
      const b = document.getElementById(id);
      b.disabled = loading;
      if (label) b.textContent = loading ? "Esperando..." : label;
    }

    function showErr(id, msg) {
      const el = document.getElementById(id);
      el.style.display = msg ? "block" : "none";
      el.textContent = msg || "";
    }

    function startPoll(uuid, ruta, onDone) {
      pollTimer = setInterval(async () => {
        try {
          const r = await fetch(API + "/" + ruta + "/" + uuid);
          const data = await r.json();
          if (data.signed || data.expired) {
            clearInterval(pollTimer);
            onDone(data);
          }
        } catch (e) { /* red temporalmente caída — reintenta */ }
      }, 2000);
    }

    async function handleLogin() {
      setBtn("btnLogin", true, "🔑 Conectar con Xaman");
      showErr("loginError", "");
      try {
        const r = await fetch(API + "/login", { method: "POST" });
        const { uuid, qrUrl, deepLink } = await r.json();

        document.getElementById("qrLoginImg").src = qrUrl;
        document.getElementById("deeplinkLogin").href = deepLink;
        document.getElementById("loginQR").style.display = "block";

        startPoll(uuid, "login", (data) => {
          document.getElementById("loginQR").style.display = "none";
          setBtn("btnLogin", false, "🔑 Conectar con Xaman");
          if (data.signed) {
            account = data.account;
            document.getElementById("accountDisplay").textContent = account;
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("paymentSection").style.display = "block";
          } else {
            showErr("loginError", "Login expirado o rechazado");
          }
        });
      } catch (err) {
        showErr("loginError", "Error: " + err.message);
        setBtn("btnLogin", false, "🔑 Conectar con Xaman");
      }
    }

    async function handlePago() {
      const destino  = document.getElementById("inputDestino").value.trim();
      const cantidad = document.getElementById("inputCantidad").value;
      showErr("pagoError", "");
      document.getElementById("txResult").style.display = "none";
      setBtn("btnPago", true, "📤 Enviar pago");

      try {
        const r = await fetch(API + "/pago", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ origen: account, destino, cantidadXAH: Number(cantidad) }),
        });
        const data = await r.json();
        if (!r.ok) {
          showErr("pagoError", data.error || "Error creando el pago");
          setBtn("btnPago", false, "📤 Enviar pago");
          return;
        }

        document.getElementById("qrPagoImg").src = data.qrUrl;
        document.getElementById("deeplinkPago").href = data.deepLink;
        document.getElementById("pagoQR").style.display = "block";

        startPoll(data.uuid, "pago", (res) => {
          document.getElementById("pagoQR").style.display = "none";
          setBtn("btnPago", false, "📤 Enviar pago");
          if (res.signed) {
            document.getElementById("txidDisplay").textContent = res.txid;
            document.getElementById("explorerLink").href =
              "https://xaman.app/explorer/21338/" + res.txid;
            document.getElementById("txResult").style.display = "block";
          } else {
            showErr("pagoError", "Pago rechazado o expirado");
          }
        });
      } catch (err) {
        showErr("pagoError", "Error: " + err.message);
        setBtn("btnPago", false, "📤 Enviar pago");
      }
    }

    function logout() {
      clearInterval(pollTimer);
      account = null;
      document.getElementById("loginSection").style.display  = "block";
      document.getElementById("paymentSection").style.display = "none";
      document.getElementById("txResult").style.display       = "none";
      document.getElementById("inputDestino").value  = "";
      document.getElementById("inputCantidad").value = "";
    }
  </script>
</body>
</html>`,
            en: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Xaman Backend Demo</title>
  <style>
    body { font-family: sans-serif; background: #080818; color: #fff;
           max-width: 480px; margin: 0 auto; padding: 2rem; }
    h1   { color: #c8ff00; }
    h2   { color: #aaa; font-size: 1.1rem; margin-top: 1.5rem; }
    button { padding: 0.6rem 1.5rem; background: #6366f1; color: #fff;
             border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; }
    button:disabled { background: #444; cursor: not-allowed; }
    button.danger { background: #ef4444; }
    input { display: block; width: 100%; padding: 0.5rem; margin-bottom: 0.75rem;
            border-radius: 6px; border: 1px solid #333; background: #111;
            color: #fff; font-size: 0.9rem; box-sizing: border-box; }
    .card { background: #111; border: 1px solid #444;
            border-radius: 8px; padding: 1rem; margin-top: 1rem; }
    .card.ok  { border-color: #4caf50; }
    .card.err { border-color: #e53935; }
    .error-msg { color: #ff6b6b; margin: 0.5rem 0; }
    code  { font-family: monospace; word-break: break-all;
            font-size: 0.8rem; color: #c8ff00; }
    a     { color: #66ccff; }
    img   { border-radius: 8px; display: block; margin: 0.75rem auto; }
    hr    { border-color: #333; margin: 1.5rem 0; }
    #paymentSection { display: none; }
  </style>
</head>
<body>
  <h1>💸 Xaman Backend Demo</h1>

  <!-- ── LOGIN ─────────────────────────────────────────── -->
  <div id="loginSection">
    <p>Connect with Xaman to continue.</p>
    <button id="btnLogin" onclick="handleLogin()">🔑 Connect with Xaman</button>
    <div id="loginQR" class="card" style="display:none">
      <p>Scan with Xaman:</p>
      <img id="qrLoginImg" src="" alt="QR Login" width="220" />
      <a id="deeplinkLogin" href="#" target="_blank">Open in Xaman (mobile)</a>
    </div>
    <p id="loginError" class="error-msg" style="display:none"></p>
  </div>

  <!-- ── PAYMENT ────────────────────────────────────────── -->
  <div id="paymentSection">
    <div class="card ok">
      <p style="color:#4caf50; margin:0 0 6px">✅ Connected as:</p>
      <code id="accountDisplay"></code>
      <br /><br />
      <button class="danger" onclick="logout()">Disconnect</button>
    </div>
    <hr />
    <h2>Send XAH</h2>
    <input id="inputDestination" placeholder="Destination address (r...)" />
    <input id="inputAmount" type="number" min="0.000001" step="0.000001"
           placeholder="Amount in XAH" />
    <p id="paymentError" class="error-msg" style="display:none"></p>
    <button id="btnPayment" onclick="handlePayment()">📤 Send payment</button>

    <div id="paymentQR" class="card" style="display:none">
      <p>Scan with Xaman to sign:</p>
      <img id="qrPaymentImg" src="" alt="QR Payment" width="220" />
      <a id="deeplinkPayment" href="#" target="_blank">Open in Xaman (mobile)</a>
    </div>

    <div id="txResult" class="card ok" style="display:none">
      <p style="color:#4caf50; margin:0 0 6px">✅ <strong>Payment confirmed!</strong></p>
      <p style="color:#ccc; font-size:0.85rem; margin:0 0 4px">Transaction hash:</p>
      <code id="txidDisplay"></code><br /><br />
      <a id="explorerLink" href="#" target="_blank">🔍 View on Xaman Explorer</a>
    </div>
  </div>

  <script>
    const API = "/api";   // same origin — no absolute URL needed
    let account = null;
    let pollTimer = null;

    function setBtn(id, loading, label) {
      const b = document.getElementById(id);
      b.disabled = loading;
      if (label) b.textContent = loading ? "Waiting..." : label;
    }

    function showErr(id, msg) {
      const el = document.getElementById(id);
      el.style.display = msg ? "block" : "none";
      el.textContent = msg || "";
    }

    function startPoll(uuid, route, onDone) {
      pollTimer = setInterval(async () => {
        try {
          const r = await fetch(API + "/" + route + "/" + uuid);
          const data = await r.json();
          if (data.signed || data.expired) {
            clearInterval(pollTimer);
            onDone(data);
          }
        } catch (e) { /* network temporarily down — retry */ }
      }, 2000);
    }

    async function handleLogin() {
      setBtn("btnLogin", true, "🔑 Connect with Xaman");
      showErr("loginError", "");
      try {
        const r = await fetch(API + "/login", { method: "POST" });
        const { uuid, qrUrl, deepLink } = await r.json();

        document.getElementById("qrLoginImg").src = qrUrl;
        document.getElementById("deeplinkLogin").href = deepLink;
        document.getElementById("loginQR").style.display = "block";

        startPoll(uuid, "login", (data) => {
          document.getElementById("loginQR").style.display = "none";
          setBtn("btnLogin", false, "🔑 Connect with Xaman");
          if (data.signed) {
            account = data.account;
            document.getElementById("accountDisplay").textContent = account;
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("paymentSection").style.display = "block";
          } else {
            showErr("loginError", "Login expired or rejected");
          }
        });
      } catch (err) {
        showErr("loginError", "Error: " + err.message);
        setBtn("btnLogin", false, "🔑 Connect with Xaman");
      }
    }

    async function handlePayment() {
      const destination = document.getElementById("inputDestination").value.trim();
      const amount      = document.getElementById("inputAmount").value;
      showErr("paymentError", "");
      document.getElementById("txResult").style.display = "none";
      setBtn("btnPayment", true, "📤 Send payment");

      try {
        const r = await fetch(API + "/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ origin: account, destination, amountXAH: Number(amount) }),
        });
        const data = await r.json();
        if (!r.ok) {
          showErr("paymentError", data.error || "Error creating payment");
          setBtn("btnPayment", false, "📤 Send payment");
          return;
        }

        document.getElementById("qrPaymentImg").src = data.qrUrl;
        document.getElementById("deeplinkPayment").href = data.deepLink;
        document.getElementById("paymentQR").style.display = "block";

        startPoll(data.uuid, "payment", (res) => {
          document.getElementById("paymentQR").style.display = "none";
          setBtn("btnPayment", false, "📤 Send payment");
          if (res.signed) {
            document.getElementById("txidDisplay").textContent = res.txid;
            document.getElementById("explorerLink").href =
              "https://xaman.app/explorer/21338/" + res.txid;
            document.getElementById("txResult").style.display = "block";
          } else {
            showErr("paymentError", "Payment rejected or expired");
          }
        });
      } catch (err) {
        showErr("paymentError", "Error: " + err.message);
        setBtn("btnPayment", false, "📤 Send payment");
      }
    }

    function logout() {
      clearInterval(pollTimer);
      account = null;
      document.getElementById("loginSection").style.display  = "block";
      document.getElementById("paymentSection").style.display = "none";
      document.getElementById("txResult").style.display       = "none";
      document.getElementById("inputDestination").value = "";
      document.getElementById("inputAmount").value      = "";
    }
  </script>
</body>
</html>`,
            jp: `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Xaman Backend Demo</title>
  <style>
    body { font-family: sans-serif; background: #080818; color: #fff;
           max-width: 480px; margin: 0 auto; padding: 2rem; }
    h1   { color: #c8ff00; }
    h2   { color: #aaa; font-size: 1.1rem; margin-top: 1.5rem; }
    button { padding: 0.6rem 1.5rem; background: #6366f1; color: #fff;
             border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; }
    button:disabled { background: #444; cursor: not-allowed; }
    button.danger { background: #ef4444; }
    input { display: block; width: 100%; padding: 0.5rem; margin-bottom: 0.75rem;
            border-radius: 6px; border: 1px solid #333; background: #111;
            color: #fff; font-size: 0.9rem; box-sizing: border-box; }
    .card { background: #111; border: 1px solid #444;
            border-radius: 8px; padding: 1rem; margin-top: 1rem; }
    .card.ok  { border-color: #4caf50; }
    .card.err { border-color: #e53935; }
    .error-msg { color: #ff6b6b; margin: 0.5rem 0; }
    code  { font-family: monospace; word-break: break-all;
            font-size: 0.8rem; color: #c8ff00; }
    a     { color: #66ccff; }
    img   { border-radius: 8px; display: block; margin: 0.75rem auto; }
    hr    { border-color: #333; margin: 1.5rem 0; }
    #paymentSection { display: none; }
  </style>
</head>
<body>
  <h1>💸 Xaman Backend Demo</h1>

  <!-- ── ログイン ─────────────────────────────────────── -->
  <div id="loginSection">
    <p>Xamanで接続して続行してください。</p>
    <button id="btnLogin" onclick="handleLogin()">🔑 Xamanで接続</button>
    <div id="loginQR" class="card" style="display:none">
      <p>Xamanでスキャン：</p>
      <img id="qrLoginImg" src="" alt="QR Login" width="220" />
      <a id="deeplinkLogin" href="#" target="_blank">Xamanで開く（モバイル）</a>
    </div>
    <p id="loginError" class="error-msg" style="display:none"></p>
  </div>

  <!-- ── 送金 ──────────────────────────────────────────── -->
  <div id="paymentSection">
    <div class="card ok">
      <p style="color:#4caf50; margin:0 0 6px">✅ 接続済み：</p>
      <code id="accountDisplay"></code>
      <br /><br />
      <button class="danger" onclick="logout()">接続解除</button>
    </div>
    <hr />
    <h2>XAHを送る</h2>
    <input id="inputDestination" placeholder="宛先アドレス (r...)" />
    <input id="inputAmount" type="number" min="0.000001" step="0.000001"
           placeholder="XAHの金額" />
    <p id="paymentError" class="error-msg" style="display:none"></p>
    <button id="btnPayment" onclick="handlePayment()">📤 送金</button>

    <div id="paymentQR" class="card" style="display:none">
      <p>Xamanでスキャンして署名：</p>
      <img id="qrPaymentImg" src="" alt="QR Payment" width="220" />
      <a id="deeplinkPayment" href="#" target="_blank">Xamanで開く（モバイル）</a>
    </div>

    <div id="txResult" class="card ok" style="display:none">
      <p style="color:#4caf50; margin:0 0 6px">✅ <strong>送金確認済み！</strong></p>
      <p style="color:#ccc; font-size:0.85rem; margin:0 0 4px">トランザクションハッシュ：</p>
      <code id="txidDisplay"></code><br /><br />
      <a id="explorerLink" href="#" target="_blank">🔍 Xaman Explorerで確認</a>
    </div>
  </div>

  <script>
    const API = "/api";   // 同一オリジン — 絶対URLは不要
    let account = null;
    let pollTimer = null;

    function setBtn(id, loading, label) {
      const b = document.getElementById(id);
      b.disabled = loading;
      if (label) b.textContent = loading ? "待機中..." : label;
    }

    function showErr(id, msg) {
      const el = document.getElementById(id);
      el.style.display = msg ? "block" : "none";
      el.textContent = msg || "";
    }

    function startPoll(uuid, route, onDone) {
      pollTimer = setInterval(async () => {
        try {
          const r = await fetch(API + "/" + route + "/" + uuid);
          const data = await r.json();
          if (data.signed || data.expired) {
            clearInterval(pollTimer);
            onDone(data);
          }
        } catch (e) { /* ネットワーク一時停止 — 再試行 */ }
      }, 2000);
    }

    async function handleLogin() {
      setBtn("btnLogin", true, "🔑 Xamanで接続");
      showErr("loginError", "");
      try {
        const r = await fetch(API + "/login", { method: "POST" });
        const { uuid, qrUrl, deepLink } = await r.json();

        document.getElementById("qrLoginImg").src = qrUrl;
        document.getElementById("deeplinkLogin").href = deepLink;
        document.getElementById("loginQR").style.display = "block";

        startPoll(uuid, "login", (data) => {
          document.getElementById("loginQR").style.display = "none";
          setBtn("btnLogin", false, "🔑 Xamanで接続");
          if (data.signed) {
            account = data.account;
            document.getElementById("accountDisplay").textContent = account;
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("paymentSection").style.display = "block";
          } else {
            showErr("loginError", "ログイン期限切れまたは拒否");
          }
        });
      } catch (err) {
        showErr("loginError", "エラー: " + err.message);
        setBtn("btnLogin", false, "🔑 Xamanで接続");
      }
    }

    async function handlePayment() {
      const destination = document.getElementById("inputDestination").value.trim();
      const amount      = document.getElementById("inputAmount").value;
      showErr("paymentError", "");
      document.getElementById("txResult").style.display = "none";
      setBtn("btnPayment", true, "📤 送金");

      try {
        const r = await fetch(API + "/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ origin: account, destination, amountXAH: Number(amount) }),
        });
        const data = await r.json();
        if (!r.ok) {
          showErr("paymentError", data.error || "送金の作成エラー");
          setBtn("btnPayment", false, "📤 送金");
          return;
        }

        document.getElementById("qrPaymentImg").src = data.qrUrl;
        document.getElementById("deeplinkPayment").href = data.deepLink;
        document.getElementById("paymentQR").style.display = "block";

        startPoll(data.uuid, "payment", (res) => {
          document.getElementById("paymentQR").style.display = "none";
          setBtn("btnPayment", false, "📤 送金");
          if (res.signed) {
            document.getElementById("txidDisplay").textContent = res.txid;
            document.getElementById("explorerLink").href =
              "https://xaman.app/explorer/21338/" + res.txid;
            document.getElementById("txResult").style.display = "block";
          } else {
            showErr("paymentError", "支払い拒否または期限切れ");
          }
        });
      } catch (err) {
        showErr("paymentError", "エラー: " + err.message);
        setBtn("btnPayment", false, "📤 送金");
      }
    }

    function logout() {
      clearInterval(pollTimer);
      account = null;
      document.getElementById("loginSection").style.display  = "block";
      document.getElementById("paymentSection").style.display = "none";
      document.getElementById("txResult").style.display       = "none";
      document.getElementById("inputDestination").value = "";
      document.getElementById("inputAmount").value      = "";
    }
  </script>
</body>
</html>`,
          },
        },
        {
          title: {
            es: "src/App.jsx — Frontend React que consume el backend",
            en: "src/App.jsx — React frontend consuming the backend",
            jp: "src/App.jsx — バックエンドを使用するReactフロントエンド（ステータスポーリング）",
          },
          language: "javascript",
          code: {
            es: `// src/App.jsx — Frontend que usa el backend para crear payloads
import { useState } from "react";

const API = "http://localhost:3001/api";

// Espera con polling hasta que el payload esté firmado o expirado
async function esperarFirma(uuid, rutaEstado, intervalMs = 2000) {
  return new Promise((resolve) => {
    const intervalo = setInterval(async () => {
      try {
        const resp = await fetch(\`\${API}/\${rutaEstado}/\${uuid}\`);
        const data = await resp.json();

        if (data.signed || data.expired) {
          clearInterval(intervalo);
          resolve(data);
        }
      } catch (err) {
        console.error("Error polling:", err);
      }
    }, intervalMs);
  });
}

export default function App() {
  const [account, setAccount]   = useState(null);
  const [qrUrl, setQrUrl]       = useState(null);
  const [deepLink, setDeepLink] = useState(null);
  const [destino, setDestino]   = useState("");
  const [cantidad, setCantidad] = useState("");
  const [txid, setTxid]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // ── Login con QR via backend ────────────────────────────────────────────────
  async function handleLogin() {
    setLoading(true);
    setError(null);

    const resp = await fetch(\`\${API}/login\`, { method: "POST" });
    const { uuid, qrUrl: url, deepLink: link } = await resp.json();

    setQrUrl(url);
    setDeepLink(link);

    // Polling: cada 2s pregunta al backend si el usuario ya firmó
    const resultado = await esperarFirma(uuid, "login");

    setQrUrl(null);
    setDeepLink(null);

    if (resultado.signed) {
      setAccount(resultado.account);
    } else {
      setError("Login expirado o rechazado");
    }
    setLoading(false);
  }

  // ── Enviar pago via backend ─────────────────────────────────────────────────
  async function handlePago(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTxid(null);

    const resp = await fetch(\`\${API}/pago\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origen: account,
        destino,
        cantidadXAH: Number(cantidad),
      }),
    });

    if (!resp.ok) {
      const { error: msg } = await resp.json();
      setError(msg);
      setLoading(false);
      return;
    }

    const { uuid, qrUrl: url, deepLink: link } = await resp.json();
    setQrUrl(url);
    setDeepLink(link);

    // Polling hasta firma o expiración
    const resultado = await esperarFirma(uuid, "pago");
    setQrUrl(null);
    setDeepLink(null);

    if (resultado.signed) {
      setTxid(resultado.txid);
    } else {
      setError("Pago rechazado o expirado");
    }
    setLoading(false);
  }

  if (!account) {
    return (
      <div style={{ padding: 32, fontFamily: "sans-serif" }}>
        <h1>💸 Xahau Payment (Backend)</h1>
        {qrUrl ? (
          <>
            <img src={qrUrl} alt="QR Login" width={220} />
            <br />
            <a href={deepLink}>Abrir en Xaman</a>
          </>
        ) : (
          <button onClick={handleLogin} disabled={loading}>
            🔑 Conectar con Xaman
          </button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>💸 Xahau Payment (Backend)</h1>
      <p>
        Conectado: <code>{account}</code>{" "}
        <button onClick={() => setAccount(null)}>Salir</button>
      </p>
      <hr />
      {qrUrl && (
        <div>
          <p>Escanea en Xaman para firmar el pago:</p>
          <img src={qrUrl} alt="QR Pago" width={220} />
          <br /><a href={deepLink}>Abrir en Xaman (móvil)</a>
        </div>
      )}
      {txid && (
        <p>✅ Pago enviado! TXID: <code>{txid}</code></p>
      )}
      {!qrUrl && !txid && (
        <form onSubmit={handlePago}>
          <h2>Enviar XAH</h2>
          <input
            placeholder="Dirección destino"
            value={destino}
            onChange={e => setDestino(e.target.value)}
            style={{ display: "block", width: 340, padding: 8, marginBottom: 8 }}
          />
          <input
            type="number" placeholder="Cantidad en XAH" min="0.000001"
            value={cantidad} onChange={e => setCantidad(e.target.value)}
            style={{ display: "block", width: 200, padding: 8, marginBottom: 8 }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Esperando..." : "📤 Enviar"}
          </button>
        </form>
      )}
    </div>
  );
}`,
            en: `// src/App.jsx — Frontend consuming the backend to create payloads
import { useState } from "react";

const API = "http://localhost:3001/api";

// Waits with polling until the payload is signed or expired
async function waitForSignature(uuid, statusRoute, intervalMs = 2000) {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      try {
        const resp = await fetch(\`\${API}/\${statusRoute}/\${uuid}\`);
        const data = await resp.json();

        if (data.signed || data.expired) {
          clearInterval(interval);
          resolve(data);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, intervalMs);
  });
}

export default function App() {
  const [account, setAccount]   = useState(null);
  const [qrUrl, setQrUrl]       = useState(null);
  const [deepLink, setDeepLink] = useState(null);
  const [destination, setDestination] = useState("");
  const [amount, setAmount]           = useState("");
  const [txid, setTxid]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // ── QR Login via backend ────────────────────────────────────────────────
  async function handleLogin() {
    setLoading(true);
    setError(null);

    const resp = await fetch(\`\${API}/login\`, { method: "POST" });
    const { uuid, qrUrl: url, deepLink: link } = await resp.json();

    setQrUrl(url);
    setDeepLink(link);

    // Polling: every 2s asks the backend if the user has signed
    const result = await waitForSignature(uuid, "login");

    setQrUrl(null);
    setDeepLink(null);

    if (result.signed) {
      setAccount(result.account);
    } else {
      setError("Login expired or rejected");
    }
    setLoading(false);
  }

  // ── Send payment via backend ─────────────────────────────────────────────
  async function handlePayment(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTxid(null);

    const resp = await fetch(\`\${API}/payment\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: account,
        destination,
        amountXAH: Number(amount),
      }),
    });

    if (!resp.ok) {
      const { error: msg } = await resp.json();
      setError(msg);
      setLoading(false);
      return;
    }

    const { uuid, qrUrl: url, deepLink: link } = await resp.json();
    setQrUrl(url);
    setDeepLink(link);

    // Polling until signed or expired
    const result = await waitForSignature(uuid, "payment");
    setQrUrl(null);
    setDeepLink(null);

    if (result.signed) {
      setTxid(result.txid);
    } else {
      setError("Payment rejected or expired");
    }
    setLoading(false);
  }

  if (!account) {
    return (
      <div style={{ padding: 32, fontFamily: "sans-serif" }}>
        <h1>💸 Xahau Payment (Backend)</h1>
        {qrUrl ? (
          <>
            <img src={qrUrl} alt="QR Login" width={220} />
            <br />
            <a href={deepLink}>Open in Xaman</a>
          </>
        ) : (
          <button onClick={handleLogin} disabled={loading}>
            🔑 Connect with Xaman
          </button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>💸 Xahau Payment (Backend)</h1>
      <p>
        Connected: <code>{account}</code>{" "}
        <button onClick={() => setAccount(null)}>Log out</button>
      </p>
      <hr />
      {qrUrl && (
        <div>
          <p>Scan with Xaman to sign the payment:</p>
          <img src={qrUrl} alt="QR Payment" width={220} />
          <br /><a href={deepLink}>Open in Xaman (mobile)</a>
        </div>
      )}
      {txid && (
        <p>✅ Payment sent! TXID: <code>{txid}</code></p>
      )}
      {!qrUrl && !txid && (
        <form onSubmit={handlePayment}>
          <h2>Send XAH</h2>
          <input
            placeholder="Destination address"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            style={{ display: "block", width: 340, padding: 8, marginBottom: 8 }}
          />
          <input
            type="number" placeholder="Amount in XAH" min="0.000001"
            value={amount} onChange={e => setAmount(e.target.value)}
            style={{ display: "block", width: 200, padding: 8, marginBottom: 8 }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Waiting..." : "📤 Send"}
          </button>
        </form>
      )}
    </div>
  );
}`,
            jp: `// src/App.jsx — バックエンドを使用してペイロードを作成するフロントエンド
import { useState } from "react";

const API = "http://localhost:3001/api";

// 署名済みまたは期限切れになるまでポーリングで待機
async function waitForSignature(uuid, statusRoute, intervalMs = 2000) {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      try {
        const resp = await fetch(\`\${API}/\${statusRoute}/\${uuid}\`);
        const data = await resp.json();

        if (data.signed || data.expired) {
          clearInterval(interval);
          resolve(data);
        }
      } catch (err) {
        console.error("ポーリングエラー:", err);
      }
    }, intervalMs);
  });
}

export default function App() {
  const [account, setAccount]   = useState(null);
  const [qrUrl, setQrUrl]       = useState(null);
  const [deepLink, setDeepLink] = useState(null);
  const [destination, setDestination] = useState("");
  const [amount, setAmount]           = useState("");
  const [txid, setTxid]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // ── バックエンド経由QRログイン ────────────────────────────────────────────
  async function handleLogin() {
    setLoading(true);
    setError(null);

    const resp = await fetch(\`\${API}/login\`, { method: "POST" });
    const { uuid, qrUrl: url, deepLink: link } = await resp.json();

    setQrUrl(url);
    setDeepLink(link);

    // ポーリング：2秒ごとにバックエンドにユーザーが署名したか確認
    const result = await waitForSignature(uuid, "login");

    setQrUrl(null);
    setDeepLink(null);

    if (result.signed) {
      setAccount(result.account);
    } else {
      setError("ログイン期限切れまたは拒否");
    }
    setLoading(false);
  }

  // ── バックエンド経由で送金 ────────────────────────────────────────────────
  async function handlePayment(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTxid(null);

    const resp = await fetch(\`\${API}/payment\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: account,
        destination,
        amountXAH: Number(amount),
      }),
    });

    if (!resp.ok) {
      const { error: msg } = await resp.json();
      setError(msg);
      setLoading(false);
      return;
    }

    const { uuid, qrUrl: url, deepLink: link } = await resp.json();
    setQrUrl(url);
    setDeepLink(link);

    // 署名または期限切れまでポーリング
    const result = await waitForSignature(uuid, "payment");
    setQrUrl(null);
    setDeepLink(null);

    if (result.signed) {
      setTxid(result.txid);
    } else {
      setError("支払い拒否または期限切れ");
    }
    setLoading(false);
  }

  if (!account) {
    return (
      <div style={{ padding: 32, fontFamily: "sans-serif" }}>
        <h1>💸 Xahau Payment (Backend)</h1>
        {qrUrl ? (
          <>
            <img src={qrUrl} alt="QR Login" width={220} />
            <br />
            <a href={deepLink}>Xamanで開く</a>
          </>
        ) : (
          <button onClick={handleLogin} disabled={loading}>
            🔑 Xamanで接続
          </button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>💸 Xahau Payment (Backend)</h1>
      <p>
        接続済み: <code>{account}</code>{" "}
        <button onClick={() => setAccount(null)}>ログアウト</button>
      </p>
      <hr />
      {qrUrl && (
        <div>
          <p>Xamanでスキャンして支払いに署名してください：</p>
          <img src={qrUrl} alt="QR Payment" width={220} />
          <br /><a href={deepLink}>Xamanで開く（モバイル）</a>
        </div>
      )}
      {txid && (
        <p>✅ 送金完了！ TXID: <code>{txid}</code></p>
      )}
      {!qrUrl && !txid && (
        <form onSubmit={handlePayment}>
          <h2>XAHを送る</h2>
          <input
            placeholder="宛先アドレス"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            style={{ display: "block", width: 340, padding: 8, marginBottom: 8 }}
          />
          <input
            type="number" placeholder="XAHの金額" min="0.000001"
            value={amount} onChange={e => setAmount(e.target.value)}
            style={{ display: "block", width: 200, padding: 8, marginBottom: 8 }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "待機中..." : "📤 送金"}
          </button>
        </form>
      )}
    </div>
  );
}`,
          },
        },
      ],
      slides: [
        {
          title: {
            es: "Frontend vs Backend: cuándo usar cada uno",
            en: "Frontend vs Backend: when to use each",
            jp: "フロントエンド対バックエンド：使い分け",
          },
          content: {
            es: "Frontend (solo API Key)\n• Apps simples, demos, prototipos\n• Sin lógica de negocio compleja\n• El SDK crea los payloads en el navegador\n\nBackend (API Key + Secret)\n• Aplicaciones de producción\n• Validación y auditoría del servidor\n• Webhooks para notificaciones\n• Integración con base de datos",
            en: "Frontend (API Key only)\n• Simple apps, demos, prototypes\n• No complex business logic\n• SDK creates payloads in browser\n\nBackend (API Key + Secret)\n• Production applications\n• Server-side validation and audit\n• Webhooks for notifications\n• Database integration",
            jp: "フロントエンド（APIキーのみ）\n• シンプルなアプリ、デモ、プロトタイプ\n• 複雑なビジネスロジックなし\n• SDKがブラウザでペイロードを作成\n\nバックエンド（APIキー＋シークレット）\n• 本番アプリケーション\n• サーバーサイドの検証と監査\n• 通知用Webhook\n• データベース連携",
          },
          visual: "⚖️",
        },
        {
          title: {
            es: "Arquitectura: frontend + backend + Xaman",
            en: "Architecture: frontend + backend + Xaman",
            jp: "アーキテクチャ：フロントエンド＋バックエンド＋Xaman",
          },
          content: {
            es: "Flujo de datos completo:\n\n1. React → POST /api/pago → Express\n2. Express → crear payload → Xaman API\n3. Xaman API → uuid + QR → Express\n4. Express → qrUrl → React\n5. React muestra QR al usuario\n6. Usuario firma en Xaman app\n7. Xaman → webhook → Express\n8. Express guarda txid en BD",
            en: "Complete data flow:\n\n1. React → POST /api/pago → Express\n2. Express → create payload → Xaman API\n3. Xaman API → uuid + QR → Express\n4. Express → qrUrl → React\n5. React shows QR to user\n6. User signs in Xaman app\n7. Xaman → webhook → Express\n8. Express saves txid to DB",
            jp: "完全なデータフロー：\n\n1. React → POST /api/pago → Express\n2. Express → ペイロード作成 → Xaman API\n3. Xaman API → uuid + QR → Express\n4. Express → qrUrl → React\n5. ReactがユーザーにQRを表示\n6. ユーザーがXamanアプリで署名\n7. Xaman → webhook → Express\n8. ExpressがtxidをDBに保存",
          },
          visual: "🏗️",
        },
        {
          title: {
            es: "Webhooks: recibir la firma en el servidor",
            en: "Webhooks: receive the signature on the server",
            jp: "Webhook：サーバーで署名を受信",
          },
          content: {
            es: "Configura tu webhook en apps.xumm.dev\n\nXaman llama a tu endpoint cuando:\n• El usuario firma el payload ✅\n• El usuario rechaza el payload ❌\n• El payload expira ⏰\n\nTu servidor debe responder 200 rápido\nProcesa la lógica de forma asíncrona\nUsa ngrok para probar en local",
            en: "Configure your webhook at apps.xumm.dev\n\nXaman calls your endpoint when:\n• User signs the payload ✅\n• User rejects the payload ❌\n• Payload expires ⏰\n\nYour server must respond 200 quickly\nProcess logic asynchronously\nUse ngrok to test locally",
            jp: "apps.xumm.devでWebhookを設定\n\nXamanがエンドポイントを呼び出す時：\n• ユーザーがペイロードに署名 ✅\n• ユーザーがペイロードを拒否 ❌\n• ペイロードが期限切れ ⏰\n\nサーバーは素早く200で応答する必要あり\nロジックは非同期で処理\nローカルテストにはngrokを使用",
          },
          visual: "🔔",
        },
      ],
    },
    
  ],
};
