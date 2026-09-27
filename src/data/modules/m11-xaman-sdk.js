import { deriveCodeTranslations } from "../code-i18n.js";
import { addNewWords } from "../glossary.js";
const moduleData = {
  id: "m11",
  icon: "🔑",
  title: {
    es: "Integración con Xaman (XUMM SDK)",
    pt: "Integração com Xaman (XUMM SDK)",
    en: "Xaman Integration (XUMM SDK)",
    jp: "Xaman連携（XUMM SDK）",
    ko: "Xaman 통합 (XUMM SDK)",
    zh: "Xaman 集成（XUMM SDK）",
  },
  lessons: [
    {
      id: "m11l1",
      title: {
        es: "El SDK de Xaman y el portal de desarrolladores",
        pt: "O SDK de Xaman e o portal de desenvolvedores",
        en: "The Xaman SDK and developer portal",
        jp: "Xaman SDKと開発者ポータル",
        ko: "Xaman SDK와 개발자 포털",
        zh: "Xaman SDK 与开发者门户",
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

1. Ve a [apps.xaman.dev](https://apps.xaman.dev) e inicia sesión con tu cuenta de Xaman
2. Haz clic en **"Create new application"**
3. Rellena el nombre, descripción e icono de tu aplicación y pulsa **Create application**.
4. Copia tu **API Key** (pública) y tu **API Secret** (privada)

**Importante**: El API Secret es como una contraseña. **Nunca lo incluyas en código frontend** que se entregue al navegador. Solo úsalo en tu servidor.

### Panel de control de desarrolladores

El dashboard de apps.xaman.dev te permite:

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
        pt: `**Xaman** (anteriormente XUMM) não é apenas uma wallet: é uma plataforma de assinatura de transações que expõe uma **API REST e SDK** para desenvolvedores. Graças a ela você pode criar aplicações web ou móveis que pedem ao usuário que firme transações na Xahau sem que nunca tenha acesso às suas chaves privadas.
### O que é ou XUMM SDK?
O pacote **xumm** (npm) é o SDK oficial que facilita a integração com a API de Xaman. Com ele você pode:
- Autenticar usuários por meio de um **SignIn** que o usuário assina em seu celular
- Criar **payloads** (solicitações de assinatura) com qualquer tipo de transação de Xahau
- Mostrar um **código QR** que o usuário escaneia com a app Xaman
- Receber em tempo real a resposta (assinada ou rejeitada) por WebSocket
- Verificar que a transação foi incluída no ledger
### Obter seus credenciais API
Antes de escrever código você precisa acceder ao **portal de desenvolvedores**:
1. Ve a [apps.xaman.dev](https://apps.xaman.dev) e inicia sessão com sua conta de Xaman
2. Clique em **"Create new application"**
3. Preencha o nome, descrição e ícone da sua aplicação e pressione **Create application**.
4. Copie sua **API Key** (pública) e seu **API Secret** (privado)
**Importante**: O API Secret é como uma senha. **Nunca o inclua em código frontend** que se entregue ao navegador. Use-o apenas em seu servidor.
### Panel de control de desenvolvedores
O dashboard de apps.xaman.dev te permite:
- **App details**: nome, descrição, URL do ícone
- **Origin/redirect URLs**: lista de domínios permitidos a usar sua API Key
- **Webhook URL**: endpoint do seu servidor para onde a Xaman enviará notificações de assinatura
- **Estadísticas**: Número de payloads criados, firmados e rejeitados
- **Logs**: histórico de chamadas à API, para depuração
### Revisar a documentacioun oficial
A documentacioun completa está em **docs.xumm.dev**:
- **Concepts** → entenda o que é um payload, o fluxo de assinatura e os estados possíveis
- **SDK Reference** → todos os métodos do SDK, com exemplos
- **API Reference** → documentacioun dos endpoints REST diretos
- **Examples** → proyectos de exemplo em GitHub
### Conceptos chave antes de programar
| Concepto | Descrição |
|----------|-------------|
| **Payload** | Uma solicitud de assinatura: contem a transação a assinar |
| **UUID** | Identificador único de cada payload |
| **QR / Deep link** | Formas de enviar o payload ao usuário |
| **SignIn** | Transação especial para autenticar (não custa fees) |
| **Webhook** | Notificacioun HTTP que Xaman envia quando o usuário assina |
### Fluxo básico de integração
\`\`\`
Seu app                  Xaman API             Xaman (celular)
  │                         │                      │
  │── Criar payload ───────▶│                      │
  │◀── UUID + QR URL ───────│                      │
  │                         │                      │
  │── Mostrar QR ao usuário │                      │
  │                         │◀── Usuário escaneia ──│
  │                         │                      │
  │◀── WebSocket: signed ───│◀── Usuário assina ─────│
  │                         │                      │
  │── Verificar em ledger   │                      │
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

1. Go to [apps.xaman.dev](https://apps.xaman.dev) and sign in with your Xaman account
2. Click **"Create a new application"**
3. Fill in the name, description and icon for your app
4. Copy your **API Key** (public) and **API Secret** (private)

> **Important**: The API Secret is like a password. **Never include it in frontend code** delivered to browsers. Only use it on your server.

### Developer dashboard

The apps.xaman.dev dashboard lets you:

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

**xumm** npmパッケージはXaman APIとの連携を簡素化する公式SDKです。次のようなことが可能です。

- ユーザーがスマホで署名する**SignIn**によるユーザー認証
- あらゆるXahauトランザクションタイプの**ペイロード**（署名リクエスト）の作成
- ユーザーがXamanアプリでスキャンする**QRコード**の表示
- WebSocketによるリアルタイムレスポンス（署名済みまたは拒否）の受信
- レジャーへのトランザクション記録の確認

### API認証情報の取得

コードを書く前に**開発者ポータル**にアクセスする必要があります：

1. **apps.xaman.dev**にアクセスし、Xamanアカウントでサインイン
2. **"Create a new app"**をクリック
3. アプリの名前、説明、アイコンを入力
4. **APIキー**（公開）と**APIシークレット**（非公開）をコピー

> **重要**: APIシークレットはパスワードと同様です。ブラウザに配信されるフロントエンドコードには**絶対に含めないでください**。サーバーのみで使用してください。`,
        ko: `**Xaman**은 단순 지갑이 아니라 개발자가 서명 요청 흐름을 만들 수 있는 **API와 SDK 플랫폼**입니다. 앱은 사용자의 개인키를 보지 않고도 안전하게 거래 서명을 요청할 수 있습니다.

### XUMM SDK로 할 수 있는 일

- SignIn 기반 로그인
- 임의 트랜잭션용 payload 생성
- QR 또는 딥링크 제공
- WebSocket으로 실시간 승인 결과 수신

### 시작 전 준비

- \`apps.xaman.dev\`에서 앱 생성
- \`API Key\`와 \`API Secret\` 발급
- Secret은 **백엔드에서만** 사용

이 구조를 이해하면 프론트엔드 로그인과 결제 요청 플로우를 쉽게 설계할 수 있습니다.`,
        zh: `**Xaman** 不只是钱包，它还是一个让开发者构建签名流程的 **API 与 SDK 平台**。应用可以在完全不接触用户私钥的情况下安全地请求交易签名。

### XUMM SDK 可以做什么

- 基于 SignIn 的登录
- 为任意交易创建 payload
- 提供二维码或深链接
- 通过 WebSocket 实时接收批准结果

### 开始前准备

- 在 \`apps.xaman.dev\` 创建应用
- 获取 \`API Key\` 和 \`API Secret\`
- Secret **只能放在后端**

理解这个结构后，就能更轻松地设计前端登录和支付请求流程。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Instalación y configuración básica del SDK",
            pt: "Instalacioun e configuração básica do SDK",
            en: "SDK installation and basic setup",
            jp: "SDKのインストールと基本設定",
            ko: "SDK 설치 및 기본 설정",
            zh: "SDK 安装与基础配置",
          },
          language: "bash",
          code: {
            es: `# Instalar el SDK de Xaman
npm install xumm

# Para proyectos React/Vite también necesitas
npm install xumm

# Verifica la versión instalada
npm list xumm`,
            pt: `# Instalar o SDK de Xaman
npm install xumm
# Para proyectos React/Vite também você precisa
npm install xumm
# Verificà versioun instalada
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
            ko: `# Xaman SDK 설치
npm install xumm

# React/Vite 프로젝트에도 필요
npm install xumm

# 설치된 버전 확인
npm list xumm`,
            zh: `# 安装 Xaman SDK
npm install xumm

# React/Vite 项目同样需要
npm install xumm

# 查看已安装版本
npm list xumm`,
          },
        },
        {
          title: {
            es: "Inicialización: frontend vs backend",
            pt: "Inicializacioun: frontend vs backend",
            en: "Initialization: frontend vs backend",
            jp: "初期化：フロントエンドとバックエンド",
            ko: "초기화: 프론트엔드 vs 백엔드",
            zh: "初始化：前端 vs 后端",
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
            pt: `import { Xumm } from "xumm";
// ─────────────────────────────────────────────
// FRONTEND (navegador) — apenas API Key
// A API Key é pública e usa fluxo PKCE seguro
// ─────────────────────────────────────────────
const xumm = new Xumm("sua-api-key-aqui");
// ─────────────────────────────────────────────
// BACKEND (Node.js servidor) — API Key + Secret
// O Secret NUNCA deve ir no navegador
// ─────────────────────────────────────────────
const xummBackend = new Xumm("sua-api-key-aqui", "seu-api-secret-aqui");
// Verificar que a conexão funciona
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
            ko: `import { Xumm } from "xumm";

// ─────────────────────────────────────────────
// 프론트엔드 (브라우저) — API Key만 사용
// API Key는 공개키이며 안전한 PKCE 흐름을 사용
// ─────────────────────────────────────────────
const xumm = new Xumm("your-api-key-here");

// ─────────────────────────────────────────────
// 백엔드 (Node.js 서버) — API Key + Secret
// Secret은 절대 브라우저에 노출되면 안 됨
// ─────────────────────────────────────────────
const xummBackend = new Xumm("your-api-key-here", "your-api-secret-here");

// 연결 확인
const appInfo = await xumm.environment.getAppInfo();
console.log("앱 연결됨:", appInfo?.name);
console.log("앱 UUID:", appInfo?.uuidv4);`,
            zh: `import { Xumm } from "xumm";

// ─────────────────────────────────────────────
// 前端（浏览器）— 仅使用 API Key
// API Key 是公开的，并走安全的 PKCE 流程
// ─────────────────────────────────────────────
const xumm = new Xumm("your-api-key-here");

// ─────────────────────────────────────────────
// 后端（Node.js 服务器）— API Key + Secret
// Secret 绝不能出现在浏览器中
// ─────────────────────────────────────────────
const xummBackend = new Xumm("your-api-key-here", "your-api-secret-here");

// 验证连接是否正常
const appInfo = await xumm.environment.getAppInfo();
console.log("应用已连接:", appInfo?.name);
console.log("应用 UUID:", appInfo?.uuidv4);`,
          },
        },
      ],
      slides: [
        {
          title: {
            es: "¿Qué es el XUMM SDK?",
            pt: "O que é ou XUMM SDK?",
            en: "What is the XUMM SDK?",
            jp: "XUMM SDKとは？",
            ko: "XUMM SDK란?",
            zh: "什么是 XUMM SDK？",
          },
          content: {
            es: "SDK oficial para integrar Xaman en tu app\n\n• Autenticar usuarios con SignIn\n• Crear payloads (solicitudes de firma)\n• Mostrar QR — el usuario escanea con Xaman\n• WebSocket: respuesta en tiempo real\n• El usuario firma, tú nunca ves las claves",
            pt: "SDK oficial para integrar Xaman em seu app\n\n• Autenticar usuários com SignIn\n• Criar payloads (solicitações de assinatura)\n• Mostrar QR — o usuário escaneia com Xaman\n• WebSocket: resposta em tempo real\n• O usuário assina, você nunca vê as chaves",
            en: "Official SDK to integrate Xaman in your app\n\n• Authenticate users with SignIn\n• Create payloads (sign requests)\n• Show QR — user scans with Xaman\n• WebSocket: real-time response\n• User signs, you never see private keys",
            jp: "アプリにXamanを統合するための公式SDK\n\n• SignInによるユーザー認証\n• ペイロード（署名リクエスト）の作成\n• QR表示 — ユーザーがXamanでスキャン\n• WebSocket：リアルタイムレスポンス\n• ユーザーが署名、秘密鍵は見えない",
            ko: "앱에 Xaman을 통합하는 공식 SDK\n\n• SignIn으로 사용자 인증\n• payload(서명 요청) 생성\n• QR 표시 — 사용자가 Xaman으로 스캔\n• WebSocket: 실시간 응답\n• 사용자가 서명, 개인키는 절대 노출 안 됨",
            zh: "将 Xaman 集成到应用中的官方 SDK\n\n• 使用 SignIn 认证用户\n• 创建 payload（签名请求）\n• 显示二维码，用户用 Xaman 扫描\n• WebSocket：实时响应\n• 用户自己签名，你不会看到私钥",
          },
          visual: "🔑",
        },
        {
          title: {
            es: "Portal de desarrolladores",
            pt: "Portal de desenvolvedores",
            en: "Developer portal",
            jp: "開発者ポータル",
            ko: "개발자 포털",
            zh: "开发者门户",
          },
          content: {
            es: "apps.xaman.dev — tu centro de control\n\n• Crear app → obtener API Key + Secret\n• Whitelist de dominios permitidos\n• Configurar webhook URL\n• Ver estadísticas y logs de API\n\ndocs.xumm.dev — documentación completa",
            pt: "apps.xaman.dev — seu centro de control\n\n• Criar app → obter API Key + Secret\n• Whitelist de dominios permitidos\n• Configurar webhook URL\n• Ver estadísticas e logs de API\n\ndocs.xumm.dev — documentacioun completa",
            en: "apps.xaman.dev — your control center\n\n• Create app → get API Key + Secret\n• Whitelist of allowed domains\n• Configure webhook URL\n• View stats and API logs\n\ndocs.xumm.dev — full documentation",
            jp: "apps.xaman.dev — あなたのコントロールセンター\n\n• アプリ作成 → APIキー＋シークレット取得\n• 許可ドメインのホワイトリスト\n• WebhookURL設定\n• 統計とAPIログの確認\n\ndocs.xumm.dev — 完全なドキュメント",
            ko: "apps.xaman.dev — 제어 센터\n\n• 앱 생성 → API Key + Secret 발급\n• 허용 도메인 화이트리스트\n• Webhook URL 설정\n• 통계 및 API 로그 확인\n\ndocs.xumm.dev — 전체 문서",
            zh: "apps.xaman.dev —— 你的控制中心\n\n• 创建应用 → 获取 API Key + Secret\n• 配置允许域名白名单\n• 设置 Webhook URL\n• 查看统计与 API 日志\n\ndocs.xumm.dev —— 完整文档",
          },
          visual: "🖥️",
        },
        {
          title: {
            es: "API Key vs API Secret",
            pt: "API Key vs API Secret",
            en: "API Key vs API Secret",
            jp: "APIキー対APIシークレット",
            ko: "API Key vs API Secret",
            zh: "API Key vs API Secret",
          },
          content: {
            es: "Dos credenciales con roles distintos:\n\nAPI Key (pública)\n• Segura en el navegador\n• Flujo PKCE — no necesita Secret\n• Va en el código React/JS del frontend\n\nAPI Secret (privada)\n• SOLO en el servidor (Node.js)\n• NUNCA en el navegador\n• Permisos de escritura completos",
            pt: "Duas credenciais com papéis distintos:\n\nAPI Key (pública)\n• Segura no navegador\n• Fluxo PKCE — não precisa Secret\n• Vai no código React/JS do frontend\n\nAPI Secret (privada)\n• APENAS no servidor (Node.js)\n• NUNCA no navegador\n• Permissões de escrita completas",
            en: "Two credentials with different papéis:\n\nAPI Key (public)\n• Safe in the browser\n• PKCE flow — no Secret needed\n• Goes in frontend React/JS code\n\nAPI Secret (private)\n• Server ONLY (Node.js)\n• NEVER in the browser\n• Full write permissions",
            jp: "異なる役割を持つ2つの認証情報：\n\nAPIキー（公開）\n• ブラウザで安全\n• PKCEフロー — シークレット不要\n• フロントエンドのReact/JSコードに記載\n\nAPIシークレット（非公開）\n• サーバーのみ（Node.js）\n• ブラウザには絶対に記載しない\n• 完全な書き込み権限",
            ko: "역할이 다른 두 가지 자격증명:\n\nAPI Key (공개)\n• 브라우저에서 안전\n• PKCE 흐름 — Secret 불필요\n• 프론트엔드 React/JS 코드에 사용\n\nAPI Secret (비공개)\n• 서버 전용 (Node.js)\n• 절대 브라우저에 노출 금지\n• 전체 쓰기 권한",
            zh: "两种职责不同的凭证：\n\nAPI Key（公开）\n• 可安全放在浏览器中\n• 使用 PKCE 流程，不需要 Secret\n• 放在前端 React/JS 代码中\n\nAPI Secret（私密）\n• 只能放在服务器（Node.js）\n• 绝不能暴露到浏览器\n• 拥有完整写权限",
          },
          visual: "🔐",
        },
      ],
    },
    {
      id: "m11l2",
      title: {
        es: "Frontend: autenticación con Xaman (Login con QR)",
        pt: "Frontend: autenticação com Xaman (Login com QR)",
        en: "Frontend: authentication with Xaman (QR Login)",
        jp: "フロントエンド：Xamanによる認証（QRログイン）",
        ko: "프론트엔드: Xaman 인증 (QR 로그인)",
        zh: "前端：使用 Xaman 认证（二维码登录）",
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

### Paso previo obligatorio, whitelist en apps.xaman.dev

Antes de ejecutar el código, debes registrar tu URL en el portal de Xaman:

1. Ve a **apps.xaman.dev** → tu aplicación → **Origin/Redirect URLs**
2. Añade tu localhost y port ejecutando tu proyecto web como: \`http://localhost:5173\`
3. Guarda los cambios

Sin este paso recibirás el error **"access_denied / Invalid client/redirect URL"**.

### Cómo funciona el QR en el modal del navegador

El SDK puede crear payloads directamente desde el browser usando **\`payload.createAndSubscribe()\`**. Para que funcione, la URL de tu app debe estar en la **whitelist** de apps.xaman.dev — el browser envía la cabecera Origin automáticamente, y Xaman la valida contra esa lista.

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
        pt: `A primeira integração que você construirá é o **login com Xaman**: um fluxo em que o usuário escaneia um QR com seu app Xaman e fica autenticado em sua aplicação web. É o equivalente a "Conectar com MetaMask" mas para o ecossistema Xahau.
### Como funcionao login com Xaman?
1. Seu app cria um payload de tipo **SignIn** (transação especial de autenticação)
2. Xaman retorna uma URL com um **código QR** e um UUID
3. Mostra o QR em tela ao usuário
4. O usuário **escaneia o QR** com seu app Xaman
5. O usuário toca **"Sign"** em seu celular (não há fee, é apenas assinatura)
6. Seu app recebe por **WebSocket** a confirmação com a endereço do usuário
7. Guardas o account (endereço público) como identidade do usuário
### Vantagens deste fluxo
- **Sem senha**: o usuário não cria nem lembra nada
- **Não custodial**: você nunca vê chaves privadas
- **Verificável**: a assinatura criptográfica prova que o usuário controla a conta
- **Celular-first**: optimizado para a app Xaman
- **Deep link**: no celular, abre a Xaman automaticamente sem escanear
### Proyecto de exemplo: React + Vite
Crearás um projeto React com Vite que tem:
- Um botoun **"Conectar com Xaman"** na página principal
- Um **modal flutuante** com o QR, que aparece sobre o conteúdo sem substituir a página
- Deep link dentro do modal para abrir Xaman desde o celular
- Estado de sessão: endereço conectada e opcioun de desconectar
### Instalacioun do projeto
\`\`\`bash
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
npm run dev
\`\`\`
### Arquivos que você precisa modificar
O Vite gera o projeto com vários arquivos. Você só precisa mexer em **um**:
| Arquivo | Accioun |
|---------|--------|
| \`src/App.jsx\` | **Substitua todo o conteúdo** pelo código do exemplo |
| \`src/main.jsx\` | Não mexa — gerado pelo Vite, inicia o app |
| \`index.html\` | No tocar — punto de entrada HTML |
| \`src/App.css\` | Você pode borrarlo — o exemplo usa estilos inline |
| \`src/index.css\` | Você pode borrarlo ou dejarlo — no afecta ao exemplo |
### Passo previo obrigatourio, whitelist em apps.xaman.dev
Antes de executar o código, você precisa registrar sua URL no portal da Xaman:
1. Vá a **apps.xaman.dev** → seu aplicativo → **Origin/Redirect URLs**
2. Adicione o localhost e a porta em que seu projeto web roda, por exemplo: \`http://localhost:5173\`
3. Salve as alterações
Sem este passo você receberá o erro **"access_denied / Invalid client/redirect URL"**.
### Como funcionao QR no modal do navegador
O SDK pode criar payloads diretamente pelo navegador usando **\`payload.createAndSubscribe()\`**. Para funcionar, a URL do seu app precisa estar na **whitelist** de apps.xaman.dev — o navegador envia o cabeçalho Origin automaticamente, e a Xaman o valida contra essa lista.
Uma vez que o origem está permitido, o método:
1. Faz uma requisição à API da Xaman com a API Key
2. Retorna \`created.refs.qr_png\` — a URL da imagem do QR que você pode mostrar no seu modal
3. Abre um **WebSocket** e espera a resposta do usuário
4. Quando o usuário assina, \`resolved\` é resolvida com o resultado
\`\`\`javascript
const { created, resolved } = await xumm.payload.createAndSubscribe(
  { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
  (event) => {
    if (typeof event.data.signed !== "undefined") return event.data;
  }
);
const qrUrl   = created.refs.qr_png;  // imagem do QR: mostre-a no seu modal
const deepLink = created.next.always; // deep link para celular
const result   = await resolved;      // espera a assinatura ou a rejeição
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

### Required step first — whitelist in apps.xaman.dev

Before running the code, register your URL in the Xaman developer portal:

1. Go to **apps.xaman.dev** → your app → **Origin/Redirect URLs**
2. Add your localhost url and port web project like: \`http://localhost:5173\`
3. Save the changes

Without this step you will get **"access_denied / Invalid client/redirect URL"**.

### How the QR modal works in the browser

The SDK can create payloads directly from the browser using **\`payload.createAndSubscribe()\`**. For this to work, your app URL must be in the **whitelist** at apps.xaman.dev — the browser sends the Origin header automatically and Xaman validates it against that list.

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
        jp: `最初に構築する連携はユーザーがXamanアプリでQRをスキャンし、あなたのWebアプリケーションに認証されるフローである**Xamanログイン**です。これはXahauエコシステムにおける「MetaMaskで接続」に相当します。

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
        ko: `Xaman 로그인은 사용자가 QR을 스캔하고 앱에서 서명해 웹앱에 인증하는 방식입니다. Web3에서 자주 보는 "지갑 연결" 흐름과 비슷합니다.

### 흐름 요약

1. 앱이 SignIn payload 생성
2. Xaman이 QR URL과 UUID 반환
3. 사용자가 앱으로 스캔
4. 휴대폰에서 승인
5. 앱이 계정 주소를 받아 로그인 처리

### 장점

- 비밀번호가 필요 없음
- 개인키를 서버가 보지 않음
- 모바일 UX에 최적화
- 딥링크 지원

프론트엔드 통합의 첫 단계로 가장 적합한 시나리오입니다.`,
        zh: `Xaman 登录是让用户扫描二维码并在应用中签名，从而登录网页应用的方式。它和 Web3 中常见的“连接钱包”流程非常相似。

### 流程概览

1. 应用创建 SignIn payload
2. Xaman 返回二维码 URL 与 UUID
3. 用户扫描并在手机上确认
4. 应用接收地址并完成登录

### 优点

- 无密码
- 非托管
- 可通过签名验证身份
- 对移动端非常友好

这是前端集成中最适合入门的场景。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Instalación y configuración básica del proyecto",
            pt: "Instalacioun e configuração básica do projeto",
            en: "SDK installation and project basic setup",
            jp: "SDKのインストールとプロジェクトの基本設定",
            ko: "SDK 설치 및 프로젝트 기본 설정",
            zh: "SDK 安装与项目基础配置",
          },
          language: "bash",
          code: {
            es: `npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# Después de modificar src/App.jsx ejecutar:
npm run dev`,
            pt: `npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# Depois de modificar src/App.jsx executar:
npm run dev`,
            en: `npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# After modifying src/App.jsx run:
npm run dev`,
            jp: `npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# src/App.jsx を変更したら次を実行：
npm run dev`,
            ko: `npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# src/App.jsx 수정 후 실행:
npm run dev`,
            zh: `npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# 修改 src/App.jsx 后执行：
npm run dev`,
          },
        },
        {
          title: {
            es: "App.jsx — Login con QR",
            pt: "App.jsx — Login com QR",
            en: "App.jsx — QR modal login",
            jp: "App.jsx — QRモーダルログイン",
            ko: "App.jsx — QR 모달 로그인",
            zh: "App.jsx —— 二维码弹窗登录",
          },
          language: "javascript",
          code: {
            es: `// src/App.jsx — Login con QR modal en tu propia página
// ANTES DE EJECUTAR:
// En apps.xaman.dev → tu app → Origin/Redirect URLs → añade http://localhost:5173
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
            pt: `// src/App.jsx — Login com QR modal em seu própria página
// ANTES DE EXECUTAR:
// Em apps.xaman.dev → seu app → Origin/Redirect URLs → adiciona http://localhost:5173
// Adicione a API Key do seu app: xumm = new Xumm("SUA_API_KEY_AQUI");
//
// Mesmo padrão que o exercício de pagamento com QR modal:
// createAndSubscribe() cria o payload e você mostra o QR no seu próprio modal.
// O usuário nunca sale de seu página para fazer login.
import { useState, useEffect } from "react";
import { Xumm } from "xumm";
import { Client } from "xahau";
const xumm = new Xumm("SUA_API_KEY_AQUI");
async function obterInfoCuenta(address) {
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
      saldo: (Number(info.Saldo) / 1_000_000).toFixed(6),
      sequence: info.Sequence,
    };
  } catch (err) {
    if (err.data?.error === "actNotFound") return { saldo: "não ativada", sequence: "—" };
    throw err;
  } finally {
    await client.disconnect();
  }
}
// ── Modal com o QR ───────────────────────────────────────────────────────────
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
          No celular?{" "}
          <a href={deepLink} rel="noopener noreferrer">Abra Xaman diretamente</a>
        </p>
        <button onClick={onCancel} style={{ marginTop: "0.5rem" }}>Cancelar</button>
      </div>
    </div>
  );
}
// ── Componente principal ──────────────────────────────────────────────────────
export default function App() {
  const [account, setAccount]   = useState(null);
  const [saldo, setBalance]   = useState(null);
  const [sequence, setSequence] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [qrUrl, setQrUrl]       = useState(null);
  const [deepLink, setDeepLink] = useState(null);
  // Restaurar sessão se o SDK já tem um token guardado
  useEffect(() => {
    xumm.on("ready", async () => {
      const me = await xumm.me;
      if (me?.account) {
        setAccount(me.account);
        const info = await obterInfoCuenta(me.account);
        setBalance(info.saldo);
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
        const info = await obterInfoCuenta(userAccount);
        setBalance(info.saldo);
        setSequence(info.sequence);
      } else {
        setError("Login rejeitado por o usuário");
      }
    } catch (err) {
      setError(\`Error: \${err.message || "Não foi possível conectar"}\`);
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
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Conta</td>
                <td><code style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>{account}</code></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Saldo</td>
                <td><strong>{saldo} XAH</strong></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Sequência</td>
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
            {loading ? "Generando QR..." : "🔑 Conectar com Xaman"}
          </button>
        </div>
      )}
      {qrUrl && (
        <QRModal
          titulo="Inicia sessão com Xaman"
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
// In apps.xaman.dev → your app → Origin/Redirect URLs → add http://localhost:5173
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
// apps.xaman.dev → あなたのアプリ → Origin/Redirect URLs → http://localhost:5173 を追加
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
            zh: `// src/App.jsx —— 在页面内用二维码弹窗完成 Xaman 登录
import { useEffect, useState } from "react";
import { Xumm } from "xumm";

const xumm = new Xumm("YOUR_API_KEY_HERE");

function QRModal({ title, qrUrl, deepLink, onCancel }) {
  return (
    <div>
      <h2>{title}</h2>
      <img src={qrUrl} alt="QR Xaman" width={220} />
      <p><a href={deepLink}>在手机中打开 Xaman</a></p>
      <button onClick={onCancel}>取消</button>
    </div>
  );
}

export default function App() {
  const [account, setAccount] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);
  const [deepLink, setDeepLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    xumm.on("ready", async () => {
      const me = await xumm.me;
      if (me?.account) setAccount(me.account);
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
        const payload = await xumm.payload.get(created.uuid);
        setAccount(payload.response.account);
      } else {
        setError("用户拒绝了登录");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Xaman 登录 —— 二维码弹窗</h1>
      {account ? <p>已连接：{account}</p> : <button onClick={connectWithXaman} disabled={loading}>{loading ? "正在生成二维码..." : "连接 Xaman"}</button>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {qrUrl && <QRModal title="使用 Xaman 登录" qrUrl={qrUrl} deepLink={deepLink} onCancel={() => setQrUrl(null)} />}
    </div>
  );
}`,
            ko: `// src/App.jsx — 자신의 페이지에서 QR 모달 로그인
// 실행 전:
// apps.xaman.dev → 앱 → Origin/Redirect URLs → http://localhost:5173 추가
// API Key 설정: xumm = new Xumm("YOUR_API_KEY_HERE");

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
    if (err.data?.error === "actNotFound") return { balance: "미활성화", sequence: "—" };
    throw err;
  } finally { await client.disconnect(); }
}

function QRModal({ title, qrUrl, deepLink, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", textAlign: "center", maxWidth: 300, width: "90%" }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <img src={qrUrl} alt="QR Xaman" width={220} style={{ display: "block", margin: "0 auto" }} />
        <p style={{ fontSize: "0.9rem" }}>모바일이신가요?{" "}<a href={deepLink} rel="noopener noreferrer">Xaman 직접 열기</a></p>
        <button onClick={onCancel} style={{ marginTop: "0.5rem" }}>취소</button>
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
      } else { setError("사용자가 로그인을 거부했습니다"); }
    } catch (err) { setError(\`오류: \${err.message || "연결할 수 없습니다"}\`); }
    finally { setLoading(false); }
  }

  function cancel() { setQrUrl(null); setDeepLink(null); setLoading(false); }

  async function disconnect() {
    await xumm.logout();
    setAccount(null); setBalance(null); setSequence(null);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto" }}>
      <h1>Xaman Login — QR 모달</h1>
      {account ? (
        <div>
          <p>✅ 연결됨</p>
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem" }}>
            <tbody>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>계정</td><td><code style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>{account}</code></td></tr>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>잔액</td><td><strong>{balance} XAH</strong></td></tr>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>시퀀스</td><td>{sequence}</td></tr>
            </tbody>
          </table>
          <button onClick={disconnect}>연결 해제</button>
        </div>
      ) : (
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={connectWithXaman} disabled={loading}>
            {loading ? "QR 생성 중..." : "🔑 Xaman으로 연결"}
          </button>
        </div>
      )}
      {qrUrl && (
        <QRModal
          title="Xaman으로 로그인"
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
            pt: "Fluxo de login com Xaman",
            en: "Xaman login flow",
            jp: "Xamanログインフロー",
            zh: "Xaman 登录流程",
            ko: "Xaman 로그인 흐름",
          },
          content: {
            es: "Autenticación sin contraseña:\n\n1. Tu app crea payload SignIn\n2. Muestras el QR al usuario\n3. Usuario escanea con Xaman\n4. Usuario toca 'Sign' (sin fee)\n5. WebSocket te entrega la dirección\n6. El usuario está autenticado ✓",
            pt: "Autenticacioun sem senha:\n\n1. Seu app cria payload SignIn\n2. Mostra o QR ao usuário\n3. Usuário escaneia com Xaman\n4. Usuário toca 'Sign' (sem fee)\n5. WebSocket entrega a você endereço\n6. O usuário está autenticado ✓",
            en: "Passwordless authentication:\n\n1. Your app creates SignIn payload\n2. You show the QR to the user\n3. User scans with Xaman\n4. User taps 'Sign' (no fee)\n5. WebSocket delivers the address\n6. User is authenticated ✓",
            jp: "パスワードレス認証：\n\n1. アプリがSignInペイロードを作成\n2. ユーザーにQRを表示\n3. ユーザーがXamanでスキャン\n4. ユーザーが「Sign」をタップ（手数料なし）\n5. WebSocketがアドレスを配信\n6. ユーザーが認証済み ✓",
            zh: "无密码认证流程：\n\n1. 应用创建 SignIn payload\n2. 向用户显示二维码\n3. 用户用 Xaman 扫码\n4. 用户点击“Sign”（无手续费）\n5. WebSocket 返回地址\n6. 用户完成认证 ✓",
            ko: "비밀번호 없는 인증:\n\n1. 앱이 SignIn payload 생성\n2. 사용자에게 QR 표시\n3. 사용자가 Xaman으로 스캔\n4. 사용자가 'Sign' 탭 (수수료 없음)\n5. WebSocket이 주소 전달\n6. 사용자 인증 완료 ✓",
          },
          visual: "📱",
        },
        {
          title: {
            es: "Escritorio vs Móvil",
            pt: "Desktop vs Celular",
            en: "Desktop vs Mobile",
            jp: "デスクトップ対モバイル",
            zh: "桌面端 vs 移动端",
            ko: "데스크톱 vs 모바일",
          },
          content: {
            es: "El modal maneja escritorio y móvil:\n\nEscritorio\n• El modal muestra la imagen QR (qr_png)\n• El usuario escanea con su app Xaman\n• El modal se cierra al confirmar la firma\n\nMóvil\n• El modal muestra el deep link (next.always)\n• Pulsa el enlace → abre Xaman automáticamente\n• Sin necesidad de escanear",
            pt: "O modal trata desktop e celular:\n\nDesktop\n• O modal mostra imagem QR (qr_png)\n• O usuário escaneia com sua app Xaman\n• O modal fecha ao confirmar a assinatura\n\nCelular\n• O modal mostra o deep link (next.always)\n• Toque no link → abre Xaman automaticamente\n• Sem necessidade de escanear",
            en: "The modal handles desktop and mobile:\n\nDesktop\n• Modal shows the QR image (qr_png)\n• User scans with their Xaman app\n• Modal closes when signature is confirmed\n\nMobile\n• Modal shows the deep link (next.always)\n• Tap the link → Xaman opens automatically\n• No scanning needed",
            jp: "モーダルがデスクトップとモバイルを処理：\n\nデスクトップ\n• モーダルがQR画像（qr_png）を表示\n• ユーザーがXamanアプリでスキャン\n• 署名確認後にモーダルが閉じる\n\nモバイル\n• モーダルがディープリンク（next.always）を表示\n• リンクをタップ → Xamanが自動で起動\n• スキャン不要",
            zh: "弹窗同时处理桌面端和移动端：\n\n桌面端\n• 弹窗显示二维码图片（qr_png）\n• 用户用 Xaman 应用扫码\n• 签名确认后弹窗关闭\n\n移动端\n• 弹窗显示深链（next.always）\n• 点击链接 → 自动打开 Xaman\n• 无需扫码",
            ko: "모달이 데스크톱과 모바일 모두 처리:\n\n데스크톱\n• 모달이 QR 이미지(qr_png) 표시\n• 사용자가 Xaman 앱으로 스캔\n• 서명 확인 후 모달 닫힘\n\n모바일\n• 모달이 딥링크(next.always) 표시\n• 링크 탭 → Xaman 자동 실행\n• 스캔 불필요",
          },
          visual: "💻",
        },
        {
          title: {
            es: "Eventos del SDK",
            pt: "Eventos do SDK",
            en: "SDK events",
            jp: "SDKイベント",
            zh: "SDK 事件",
            ko: "SDK 이벤트",
          },
          content: {
            es: "payload.createAndSubscribe() desde el browser:\n\n1. La origin http://localhost:5173 está en la whitelist\n2. El browser envía Origin header → Xaman valida el CORS\n3. Devuelve created.refs.qr_png → imagen del QR\n4. Muestra el QR dentro del modal de tu página\n5. WebSocket espera → usuario firma → modal se cierra\n\nNo se abre ninguna ventana externa",
            pt: "payload.createAndSubscribe() a partir do browser:\n\n1. A origin http://localhost:5173 está na whitelist\n2. O browser envia Origin header → Xaman valida o CORS\n3. Retorna created.refs.qr_png → imagem do QR\n4. Mostra o QR dentro do modal de seu página\n5. WebSocket espera → usuário assina → modal fecha\n\nNão se abre nenhuma janela externa",
            en: "payload.createAndSubscribe() from the browser:\n\n1. Origin http://localhost:5173 is in the whitelist\n2. Browser sends Origin header → Xaman validates CORS\n3. Returns created.refs.qr_png → QR image\n4. Shows QR inside your page modal\n5. WebSocket waits → user signs → modal closes\n\nNo external window is opened",
            jp: "ブラウザからのpayload.createAndSubscribe()：\n\n1. http://localhost:5173がホワイトリストにある\n2. ブラウザがOriginヘッダーを送信 → XamanがCORSを検証\n3. created.refs.qr_pngを返す → QR画像\n4. ページのモーダル内にQRを表示\n5. WebSocketが待機 → ユーザーが署名 → モーダルが閉じる\n\n外部ウィンドウは開かない",
            zh: "浏览器中的 payload.createAndSubscribe()：\n\n1. 将 http://localhost:5173 加入白名单\n2. 浏览器发送 Origin header → Xaman 校验 CORS\n3. 返回 created.refs.qr_png → 二维码图片\n4. 在页面弹窗中显示二维码\n5. WebSocket 等待 → 用户签名 → 弹窗关闭\n\n不会打开任何外部窗口",
            ko: "브라우저에서 payload.createAndSubscribe():\n\n1. http://localhost:5173이 화이트리스트에 있음\n2. 브라우저가 Origin 헤더 전송 → Xaman이 CORS 검증\n3. created.refs.qr_png 반환 → QR 이미지\n4. 페이지 모달 내에 QR 표시\n5. WebSocket 대기 → 사용자 서명 → 모달 닫힘\n\n외부 창은 열리지 않음",
          },
          visual: "📡",
        },
      ],
    },
    {
      id: "m11l3",
      title: {
        es: "Frontend: construir y firmar un Payment con Xaman",
        pt: "Frontend: construir e assinar um Payment com Xaman",
        en: "Frontend: build and sign a Payment with Xaman",
        jp: "フロントエンド：XamanでPaymentを構築・署名",
        zh: "前端：使用 Xaman 构建并签署 Payment",
        ko: "프론트엔드: Xaman으로 Payment 생성 및 서명",
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
        pt: `Depois que o usuário está autenticado com a Xaman, você pode pedir que ele assine qualquer transação da Xahau. Nesta lição você vai construir um formulário de pagamento em que o usuário informa a **quantidade** e o **endereço de destino**; um payload é criado e o usuário escaneia o QR de novo para assinar o Payment.
### Como funcionao fluxo de pagamento?
1. Usuário já está logado (tem sua conta conectada)
2. Mostra um formulário: endereço de destino + quantidade em XAH
3. Ao pulsar "Enviar", crias um payload com a transação \`Payment\`
4. Xaman retorna um novo QR (diferente ao do login)
5. O usuário **escaneia este segundo QR** com Xaman
6. Em a app Xaman ve os detalhes: origem, destino, quantidade
7. O usuário **aprova e assina** (agora sim há fee de rede)
8. Seu app recebe o resultado com o \`txid\` da transação
### Estrutura de um Payment na Xahau
\`\`\`javascript
{
  TransactionType: "Payment",
  NetworkID: 21338,              // Xahau Testnet — evita assinar em outra rede
  Account: "conta_origem",      // a do usuário logado
  Destination: "conta_destino",
  Amount: "1000000",             // em drops (1 XAH = 1,000,000 drops)
}
\`\`\`
A quantidade é expressa sempre em **drops** (a menor unidade de XAH). Para converter: \`drops = XAH * 1_000_000\`.
### Criação do payload com o SDK
\`\`\`javascript
const { created, resolved } = await xumm.payload.createAndSubscribe(
  { txjson: transação },
  (event) => {
    // Este callback é chamado a cada atualização
    if ("signed" in event.data) {
      return event.data;  // resolve a promessa com o resultado
    }
  }
);
\`\`\`
- \`created\` contem \`created.refs.qr_png\` (URL do QR) e \`created.next.always\` (deep link)
- \`resolved\` é uma Promise que se resolve quando o usuário assina ou rejeita
- Se \`resolved.signed === true\` → assinatura bem-sucedida, \`resolved.txid\` é o hash
### Validação antes de enviar
Sempre valida no cliente antes de criar o payload:
- Que o endereço de destino seja válido (comece por \`r\` e tem ~25-34 caracteres)
- Que a quantidade seja um número positivo
- Que não seja a mesma conta de origem
### Verificar ou estado da transação a partir de Xaman
Depois da assinatura você não precisa se conectar ao ledger: pode consultar o payload com **\`xumm.payload.get(uuid)\`**. A resposta inclui \`response.dispatched_result\`, que contém o código de resultado do ledger:
- \`"tesSUCCESS"\` → transação confirmada com sucesso
- Qualquer outro valor (por exemplo \`"tecINSUF_RESERVE_LINE"\`) → erro no ledger
\`\`\`javascript
const payloadResult = await xumm.payload.get(created.uuid);
const status = payloadResult.response.dispatched_result; // "tesSUCCESS" ou código de erro
const txid   = resultado.txid;                           // hash da transação
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

金額は常に**drops**（XAHの最小単位）で表します。\`drops = XAH × 1,000,000\`

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
        zh: `**用户登录后**，就可以通过 Xaman 请求实际的 **Payment 交易签名**。网页应用负责构造交易 JSON，用户在手机上做最终确认。

### 典型流程

1. 输入收款地址与金额
2. 创建 \`Payment\` payload
3. 显示新的二维码
4. 用户在 Xaman 中查看并批准
5. 应用接收 \`txid\` 和结果

### 注意点

- 金额始终要转换为 **drops**
- 明确设置当前网络 ID
- 批准后要确认交易是否真的写入了账本

把登录和支付分开理解，整个实现会清晰很多。`,
        ko: `사용자가 로그인한 뒤에는 Xaman을 통해 실제 **Payment 트랜잭션 서명**을 요청할 수 있습니다. 웹앱은 트랜잭션 JSON을 만들고, 사용자는 모바일에서 최종 승인을 합니다.

### 전형적인 흐름

1. 수신 주소와 금액 입력
2. \`Payment\` payload 생성
3. 새 QR 표시
4. 사용자가 Xaman에서 검토 후 승인
5. 앱이 \`txid\`와 결과를 수신

### 주의할 점

- 금액은 항상 **drops** 단위로 변환
- 현재 네트워크 ID를 명확히 설정
- 승인 후에는 실제로 레저에 포함되었는지 검증

로그인과 결제를 분리해서 생각하면 구현이 훨씬 명확해집니다.`,
      },
      codeBlocks: [
        {
          title: {
            es: "Instalación y configuración básica del proyecto",
            pt: "Instalacioun e configuração básica do projeto",
            en: "SDK installation and project basic setup",
            jp: "SDKのインストールとプロジェクトの基本設定",
            zh: "项目安装与基础配置",
            ko: "SDK 설치 및 프로젝트 기본 설정",
          },
          language: "bash",
          code: {
            es: `# No hay necesitar de ejecutar esta parte si ya lo has hecho en la sección anterior
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# Después de modificar src/App.jsx ejecutar:
npm run dev`,
            pt: `# Não é necessário executar esta parte se você já a fez na seção anterior
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# Depois de modificar src/App.jsx executar:
npm run dev`,
            en: `# No need to run this part if you already did it in the previous step
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# After modifying src/App.jsx run:
npm run dev`,
            jp: `# 前のステップで実行済みなら、この部分は不要です
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# src/App.jsx を変更したら次を実行：
npm run dev`,
            zh: `# 如果上一节已经做过，这一步可以跳过
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# 修改 src/App.jsx 后执行：
npm run dev`,
            ko: `# 이전 단계에서 이미 했다면 이 부분은 건너뛰어도 됩니다
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
# src/App.jsx 수정 후 실행:
npm run dev`,
          },
        },
        {
          title: {
            es: "App.jsx — Login con QR modal + Payment con QR modal",
            pt: "App.jsx — Login com QR modal + Payment com QR modal",
            en: "App.jsx — QR modal login + QR modal payment",
            jp: "App.jsx — QRモーダルログイン＋QRモーダルPayment",
            zh: "App.jsx —— 二维码弹窗登录 + 二维码弹窗支付",
            ko: "App.jsx — QR 모달 로그인 + QR 모달 Payment",
          },
          language: "javascript",
          code: {
            es: `// src/App.jsx — Todo en tu propia página: QR modal para login y QR modal para pago
// ANTES DE EJECUTAR:
// En apps.xaman.dev → tu app → Origin/Redirect URLs → añade http://localhost:5173
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
            pt: `// src/App.jsx — Todo em seu própria página: QR modal para login e QR modal para pagamento
// ANTES DE EXECUTAR:
// Em apps.xaman.dev → seu app → Origin/Redirect URLs → adiciona http://localhost:5173
// Adicione a API Key do seu app: xumm = new Xumm("SUA_API_KEY_AQUI");
//
// Um apenas <QRModal> reutilizável serve tanto parao login como parao pagamento.
// O usuário nunca sai da sua página — tudo acontece dentro do seu próprio modal.
import { useState, useEffect } from "react";
import { Xumm } from "xumm";
import { Client } from "xahau";
const xumm = new Xumm("SUA_API_KEY_AQUI");
function xahToDrops(xah) {
  return String(Math.floor(Number(xah) * 1_000_000));
}
function esRAddressValida(address) {
  return /^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(address);
}
async function obterInfoCuenta(address) {
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
      saldo: (Number(info.Saldo) / 1_000_000).toFixed(6),
      sequence: info.Sequence,
    };
  } catch (err) {
    if (err.data?.error === "actNotFound") return { saldo: "não ativada", sequence: "—" };
    throw err;
  } finally {
    await client.disconnect();
  }
}
// ── Modal reutilizável — o mesmo componente para login e pagamento ───────────────
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
          No celular?{" "}
          <a href={deepLink} rel="noopener noreferrer">Abra Xaman diretamente</a>
        </p>
        <button onClick={onCancel} style={{ marginTop: "0.5rem" }}>Cancelar</button>
      </div>
    </div>
  );
}
// ── Componente principal ──────────────────────────────────────────────────────
export default function App() {
  const [account, setAccount]   = useState(null);
  const [saldo, setBalance]   = useState(null);
  const [sequence, setSequence] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  // Estado do pagamento
  const [destino, setDestino]   = useState("");
  const [quantidade, setCantidad] = useState("");
  const [txid, setTxid]         = useState(null);
  const [txStatus, setTxStatus] = useState(null);
  // Estado do QR modal (compartilhado entre login e pagamento)
  const [qrUrl, setQrUrl]         = useState(null);
  const [deepLink, setDeepLink]   = useState(null);
  const [qrTitulo, setQrTitulo]   = useState("");
  // Restaurar sessão se o SDK já tem um token guardado
  useEffect(() => {
    xumm.on("ready", async () => {
      const me = await xumm.me;
      if (me?.account) {
        setAccount(me.account);
        const info = await obterInfoCuenta(me.account);
        setBalance(info.saldo);
        setSequence(info.sequence);
      }
    });
  }, []);
  // ── Login com QR modal ────────────────────────────────────────────────────
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
      setQrTitulo("Inicia sessão com Xaman");
      setQrUrl(created.refs.qr_png);
      setDeepLink(created.next.always);
      const result = await resolved;
      setQrUrl(null);
      setDeepLink(null);
      if (result.signed) {
        const payloadResult = await xumm.payload.get(created.uuid);
        const userAccount = payloadResult.response.account;
        setAccount(userAccount);
        const info = await obterInfoCuenta(userAccount);
        setBalance(info.saldo);
        setSequence(info.sequence);
      } else {
        setError("Login rejeitado por o usuário");
      }
    } catch (err) {
      setError(\`Error: \${err.message || "Não foi possível conectar"}\`);
    } finally {
      setLoading(false);
    }
  }
  // ── Pagamento com QR modal ─────────────────────────────────────────────────────
  async function enviarPagamento(e) {
    e.preventDefault();
    setError(null);
    setTxid(null);
    setTxStatus(null);
    if (!esRAddressValida(destino)) {
      setError("Endereço de destino inválido (deve começar com 'r')");
      return;
    }
    if (destino === account) {
      setError("Você não pode enviar para si mesmo");
      return;
    }
    const cantidadNum = Number(quantidade);
    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      setError("Digite uma quantidade válida maior que 0");
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
      setQrTitulo("Assine o pagamento com a Xaman");
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
        setError("O usuário rejeitou a transação");
      }
    } catch (err) {
      setError(\`Error: \${err.message || "Não foi possível criar o pagamento"}\`);
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
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Conta</td>
                <td><code style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>{account}</code></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Saldo</td>
                <td><strong>{saldo} XAH</strong></td>
              </tr>
              <tr>
                <td style={{ padding: "6px 12px 6px 0", color: "#666" }}>Sequência</td>
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
            {loading ? "Generando QR de login..." : "🔑 Conectar com Xaman"}
          </button>
        </div>
      )}
      {/* Formulário de pagamento */}
      {account && !qrUrl && (
        <form onSubmit={enviarPagamento} style={{ marginTop: "1.5rem", borderTop: "1px solid #ddd", paddingTop: "1.5rem" }}>
          <h2 style={{ marginTop: 0 }}>Enviar XAH</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: 4 }}>Endereço destino:</label>
            <input
              type="text"
              placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: 4 }}>Quantidade (XAH):</label>
            <input
              type="number"
              placeholder="0.01"
              min="0.000001"
              step="0.000001"
              value={quantidade}
              onChange={(e) => setCantidad(e.target.value)}
              style={{ width: 160, padding: 8 }}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Generando QR do pagamento..." : "📤 Enviar pagamento"}
          </button>
        </form>
      )}
      {/* Resultado do pagamento */}
      {txid && (
        <div style={{
          background: txStatus === "tesSUCCESS" ? "#1a3a1a" : "#3a1a1a",
          border: \`1px solid \${txStatus === "tesSUCCESS" ? "#4caf50" : "#e53935"}\`,
          padding: 16, borderRadius: 8, marginTop: "1.5rem",
          color: "#ffffff",
        }}>
          {txStatus === "tesSUCCESS" ? (
            <>
              <p style={{ margin: "0 0 8px", color: "#4caf50" }}>✅ <strong>Pagamento confirmado!</strong></p>
              <p style={{ margin: "0 0 4px", fontSize: "0.85rem", color: "#cccccc" }}>Hash da transação:</p>
              <p style={{ margin: "0 0 8px" }}>
                <code style={{ fontSize: "0.75rem", wordBreak: "break-all", color: "#ffffff" }}>{txid}</code>
              </p>
              <a
                href={\`https://xaman.app/explorer/21338/\${txid}\`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#66ccff" }}
              >
                🔍 Ver em Xaman Explorer
              </a>
            </>
          ) : (
            <p style={{ margin: 0, color: "#ff8080" }}>⚠️ <strong>Resultado: {txStatus}</strong></p>
          )}
        </div>
      )}
      {/* Um único modal reutilizável para login e pagamento */}
      {qrUrl && <QRModal titulo={qrTitulo} qrUrl={qrUrl} deepLink={deepLink} onCancel={cancelar} />}
    </div>
  );
}`,
            en: `// src/App.jsx — Everything in your own page: QR modal for login and QR modal for payment
// BEFORE RUNNING:
// In apps.xaman.dev → your app → Origin/Redirect URLs → add http://localhost:5173
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
            zh: `// src/App.jsx —— 同一页面内完成登录与 Payment 签名
import { useEffect, useState } from "react";
import { Xumm } from "xumm";

const xumm = new Xumm("YOUR_API_KEY_HERE");

function xahToDrops(xah) {
  return String(Math.floor(Number(xah) * 1_000_000));
}

export default function App() {
  const [account, setAccount] = useState(null);
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [qrUrl, setQrUrl] = useState(null);
  const [deepLink, setDeepLink] = useState(null);
  const [txid, setTxid] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    xumm.on("ready", async () => {
      const me = await xumm.me;
      if (me?.account) setAccount(me.account);
    });
  }, []);

  async function connectWithXaman() {
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
      const payload = await xumm.payload.get(created.uuid);
      setAccount(payload.response.account);
    }
  }

  async function sendPayment(e) {
    e.preventDefault();
    setError(null);
    const { created, resolved } = await xumm.payload.createAndSubscribe(
      {
        txjson: {
          TransactionType: "Payment",
          NetworkID: 21338,
          Account: account,
          Destination: destination,
          Amount: xahToDrops(amount),
        },
      },
      (event) => {
        if (typeof event.data.signed !== "undefined") return event.data;
      }
    );
    setQrUrl(created.refs.qr_png);
    setDeepLink(created.next.always);
    const result = await resolved;
    setQrUrl(null);
    setDeepLink(null);
    if (result.signed) setTxid(result.txid);
    else setError("用户拒绝了交易");
  }

  return (
    <div>
      <h1>Xaman Payment —— 二维码弹窗</h1>
      {!account ? <button onClick={connectWithXaman}>连接 Xaman</button> : null}
      {account && !qrUrl && !txid ? (
        <form onSubmit={sendPayment}>
          <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="收款地址" />
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="金额（XAH）" />
          <button type="submit">发送 Payment</button>
        </form>
      ) : null}
      {qrUrl && <a href={deepLink}>打开 Xaman</a>}
      {txid && <p>TXID: {txid}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}`,
            jp: `// src/App.jsx — すべて自分のページで：ログインもPaymentもQRモーダル
// 実行前に:
// apps.xaman.dev → あなたのアプリ → Origin/Redirect URLs → http://localhost:5173 を追加
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
            ko: `// src/App.jsx — 자신의 페이지에서 로그인과 결제 모두 QR 모달로 처리
// 실행 전:
// apps.xaman.dev → 앱 → Origin/Redirect URLs → http://localhost:5173 추가
// API Key 설정: xumm = new Xumm("YOUR_API_KEY_HERE");

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
    if (err.data?.error === "actNotFound") return { balance: "미활성화", sequence: "—" };
    throw err;
  } finally { await client.disconnect(); }
}

function QRModal({ title, qrUrl, deepLink, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", textAlign: "center", maxWidth: 300, width: "90%" }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <img src={qrUrl} alt="QR Xaman" width={220} style={{ display: "block", margin: "0 auto" }} />
        <p style={{ fontSize: "0.9rem" }}>모바일이신가요?{" "}<a href={deepLink} rel="noopener noreferrer">Xaman 직접 열기</a></p>
        <button onClick={onCancel} style={{ marginTop: "0.5rem" }}>취소</button>
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

  async function connectWithXaman() {
    setLoading(true); setError(null);
    try {
      const { created, resolved } = await xumm.payload.createAndSubscribe(
        { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
        (event) => { if (typeof event.data.signed !== "undefined") return event.data; }
      );
      setQrTitle("Xaman으로 로그인"); setQrUrl(created.refs.qr_png); setDeepLink(created.next.always);
      const result = await resolved;
      setQrUrl(null); setDeepLink(null);
      if (result.signed) {
        const p = await xumm.payload.get(created.uuid);
        setAccount(p.response.account);
        const info = await getAccountInfo(p.response.account);
        setBalance(info.balance); setSequence(info.sequence);
      } else { setError("사용자가 로그인을 거부했습니다"); }
    } catch (err) { setError(\`오류: \${err.message || "연결할 수 없습니다"}\`); }
    finally { setLoading(false); }
  }

  async function sendPayment(e) {
    e.preventDefault(); setError(null); setTxid(null); setTxStatus(null);
    if (!isValidRAddress(destination)) { setError("유효하지 않은 수신 주소('r'로 시작해야 함)"); return; }
    if (destination === account) { setError("자기 자신에게 보낼 수 없습니다"); return; }
    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) { setError("0보다 큰 유효한 금액을 입력하세요"); return; }
    setLoading(true);
    try {
      const { created, resolved } = await xumm.payload.createAndSubscribe(
        { txjson: { TransactionType: "Payment", NetworkID: 21338, Account: account, Destination: destination, Amount: xahToDrops(amountNum) } },
        (event) => { if (typeof event.data.signed !== "undefined") return event.data; }
      );
      setQrTitle("Xaman으로 결제 서명"); setQrUrl(created.refs.qr_png); setDeepLink(created.next.always);
      const result = await resolved;
      setQrUrl(null); setDeepLink(null);
      if (result.signed) {
        const p = await xumm.payload.get(created.uuid);
        setTxid(result.txid); setTxStatus(p.response.dispatched_result);
      } else { setError("사용자가 트랜잭션을 거부했습니다"); }
    } catch (err) { setError(\`오류: \${err.message || "결제를 생성할 수 없습니다"}\`); }
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
      <h1>💸 Xahau Payment — QR 모달</h1>
      {account ? (
        <div>
          <p>✅ 연결됨</p>
          <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "1rem" }}>
            <tbody>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>계정</td><td><code style={{ wordBreak: "break-all", fontSize: "0.85rem" }}>{account}</code></td></tr>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>잔액</td><td><strong>{balance} XAH</strong></td></tr>
              <tr><td style={{ padding: "6px 12px 6px 0", color: "#666" }}>시퀀스</td><td>{sequence}</td></tr>
            </tbody>
          </table>
          <button onClick={disconnect}>연결 해제</button>
        </div>
      ) : (
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={connectWithXaman} disabled={loading}>{loading ? "로그인 QR 생성 중..." : "🔑 Xaman으로 연결"}</button>
        </div>
      )}
      {account && !qrUrl && (
        <form onSubmit={sendPayment} style={{ marginTop: "1.5rem", borderTop: "1px solid #ddd", paddingTop: "1.5rem" }}>
          <h2 style={{ marginTop: 0 }}>XAH 보내기</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: 4 }}>수신 주소:</label>
            <input type="text" placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" value={destination} onChange={(e) => setDestination(e.target.value)} style={{ width: "100%", padding: 8, boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: 4 }}>금액 (XAH):</label>
            <input type="number" placeholder="0.01" min="0.000001" step="0.000001" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: 160, padding: 8 }} />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>{loading ? "결제 QR 생성 중..." : "📤 결제 보내기"}</button>
        </form>
      )}
      {txid && (
        <div style={{ background: txStatus === "tesSUCCESS" ? "#1a3a1a" : "#3a1a1a", border: \`1px solid \${txStatus === "tesSUCCESS" ? "#4caf50" : "#e53935"}\`, padding: 16, borderRadius: 8, marginTop: "1.5rem", color: "#ffffff" }}>
          {txStatus === "tesSUCCESS" ? (
            <>
              <p style={{ margin: "0 0 8px", color: "#4caf50" }}>✅ <strong>결제 확인됨!</strong></p>
              <p style={{ margin: "0 0 4px", fontSize: "0.85rem", color: "#cccccc" }}>트랜잭션 해시:</p>
              <p style={{ margin: "0 0 8px" }}><code style={{ fontSize: "0.75rem", wordBreak: "break-all", color: "#ffffff" }}>{txid}</code></p>
              <a href={\`https://xaman.app/explorer/21338/\${txid}\`} target="_blank" rel="noopener noreferrer" style={{ color: "#66ccff" }}>🔍 Xaman Explorer에서 보기</a>
            </>
          ) : (
            <p style={{ margin: 0, color: "#ff8080" }}>⚠️ <strong>결과: {txStatus}</strong></p>
          )}
        </div>
      )}
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
            pt: "Fluxo de pagamento com Xaman",
            en: "Payment flow with Xaman",
            jp: "Xamanを使った支払いフロー",
            zh: "使用 Xaman 的支付流程",
            ko: "Xaman을 사용한 결제 흐름",
          },
          content: {
            es: "El usuario firma dos veces:\n\n1er QR — Login (SignIn, sin fee)\n• Identifica al usuario → obttienes su dirección\n\n2do QR — Pago (Payment, con fee)\n• Muestra destino y cantidad\n• Usuario revisa y aprueba\n• Recibes txid de la tx firmada",
            pt: "O usuário assina dois vezes:\n\n1º QR — Login (SignIn, sem fee)\n• Identifica ao usuário → obttems sua endereço\n\n2º QR — Pagamento (Payment, com fee)\n• Mostra destino e quantidade\n• Usuário revisa e assina\n• Você recebe txid da tx assinada",
            en: "The user scans twice:\n\n1st QR — Login (SignIn, no fee)\n• Identifies user → you get their address\n\n2nd QR — Payment (with fee)\n• Shows destination and amount\n• User reviews and approves\n• You receive txid of signed tx",
            jp: "ユーザーは2回スキャン：\n\n1枚目QR — ログイン（SignIn、手数料なし）\n• ユーザーを識別 → アドレスを取得\n\n2枚目QR — 支払い（手数料あり）\n• 宛先と金額を表示\n• ユーザーが確認・承認\n• 署名済みtxのtxidを受信",
            zh: "用户需要扫描两次：\n\n第 1 个二维码 —— 登录（SignIn，无手续费）\n• 识别用户 → 获取其地址\n\n第 2 个二维码 —— 支付（Payment，有手续费）\n• 显示目标地址和金额\n• 用户检查并批准\n• 你收到已签名交易的 txid",
            ko: "사용자가 두 번 스캔:\n\n1번째 QR — 로그인 (SignIn, 수수료 없음)\n• 사용자 식별 → 주소 획득\n\n2번째 QR — 결제 (수수료 있음)\n• 수신 주소와 금액 표시\n• 사용자가 확인 후 승인\n• 서명된 tx의 txid 수신",
          },
          visual: "💸",
        },
        {
          title: {
            es: "Drops: la unidad de XAH",
            pt: "Drops: a unidade do XAH",
            en: "Drops: the XAH unit",
            jp: "Drops：XAHの単位",
            zh: "Drops：XAH 的单位",
            ko: "Drops: XAH 단위",
          },
          content: {
            es: "Las cantidades se expresan en drops:\n\n1 XAH = 1,000,000 drops\n0.5 XAH = 500,000 drops\n0.000001 XAH = 1 drop (mínimo)\n\nConversión en código:\ndrops = Math.floor(xah * 1_000_000)\nxah = drops / 1_000_000\n\nSiempre usa strings para Amount en el JSON",
            pt: "As quantidades são expressas em drops:\n\n1 XAH = 1,000,000 drops\n0.5 XAH = 500,000 drops\n0.000001 XAH = 1 drop (mínimo)\n\nConversão em código:\ndrops = Math.floor(xah * 1_000_000)\nxah = drops / 1_000_000\n\nSempre use strings para Amount no JSON",
            en: "Amounts are expressed in drops:\n\n1 XAH = 1,000,000 drops\n0.5 XAH = 500,000 drops\n0.000001 XAH = 1 drop (minimum)\n\nConversion in code:\ndrops = Math.floor(xah * 1_000_000)\nxah = drops / 1_000_000\n\nAlways use strings for Amount in JSON",
            jp: "金額はdropsで表します：\n\n1 XAH = 1,000,000 drops\n0.5 XAH = 500,000 drops\n0.000001 XAH = 1 drop（最小単位）\n\nコードでの変換：\ndrops = Math.floor(xah × 1,000,000)\nxah = drops / 1,000,000\n\nJSONのAmountには常にstringを使用",
            zh: "金额以 drops 表示：\n\n1 XAH = 1,000,000 drops\n0.5 XAH = 500,000 drops\n0.000001 XAH = 1 drop（最小单位）\n\n代码中的换算：\ndrops = Math.floor(xah * 1_000_000)\nxah = drops / 1_000_000\n\nJSON 中的 Amount 一律使用字符串",
            ko: "금액은 drops로 표현:\n\n1 XAH = 1,000,000 drops\n0.5 XAH = 500,000 drops\n0.000001 XAH = 1 drop (최소)\n\n코드에서 변환:\ndrops = Math.floor(xah * 1_000_000)\nxah = drops / 1_000_000\n\nJSON의 Amount에는 항상 string 사용",
          },
          visual: "🔢",
        },
        {
          title: {
            es: "createAndSubscribe: el método clave",
            pt: "createAndSubscribe: o método-chave",
            en: "createAndSubscribe: the key method",
            jp: "createAndSubscribe：重要なメソッド",
            zh: "createAndSubscribe：关键方法",
            ko: "createAndSubscribe: 핵심 메서드",
          },
          content: {
            es: "Un solo método para crear + escuchar:\n\nconst { created, resolved } = await\n  xumm.payload.createAndSubscribe(\n    { txjson: transaccion },\n    (event) => {\n      if ('signed' in event.data)\n        return event.data\n    }\n  )\n\ncreated.refs.qr_png → URL del QR\nawait resolved → firma o rechazo",
            pt: "Um único método para criar + escutar:\n\nconst { created, resolved } = await\n  xumm.payload.createAndSubscribe(\n    { txjson: transação },\n    (event) => {\n      if ('signed' in event.data)\n        return event.data\n    }\n  )\n\ncreated.refs.qr_png → URL do QR\nawait resolved → assinatura ou rejeição",
            en: "One method to create + listen:\n\nconst { created, resolved } = await\n  xumm.payload.createAndSubscribe(\n    { txjson: transaction },\n    (event) => {\n      if ('signed' in event.data)\n        return event.data\n    }\n  )\n\ncreated.refs.qr_png → QR URL\nawait resolved → sign or reject",
            jp: "作成＋リッスンを一つのメソッドで：\n\nconst { created, resolved } = await\n  xumm.payload.createAndSubscribe(\n    { txjson: transaction },\n    (event) => {\n      if ('signed' in event.data)\n        return event.data\n    }\n  )\n\ncreated.refs.qr_png → QR URL\nawait resolved → 署名または拒否",
            zh: "一个方法同时完成创建 + 监听：\n\nconst { created, resolved } = await\n  xumm.payload.createAndSubscribe(\n    { txjson: transaction },\n    (event) => {\n      if ('signed' in event.data)\n        return event.data\n    }\n  )\n\ncreated.refs.qr_png → 二维码 URL\nawait resolved → 签名或拒绝",
            ko: "생성 + 수신을 한 메서드로:\n\nconst { created, resolved } = await\n  xumm.payload.createAndSubscribe(\n    { txjson: transaction },\n    (event) => {\n      if ('signed' in event.data)\n        return event.data\n    }\n  )\n\ncreated.refs.qr_png → QR URL\nawait resolved → 서명 또는 거부",
          },
          visual: "🔄",
        },
      ],
    },
    {
      id: "m11l4",
      title: {
        es: "Backend: servidor Node.js con Express y Xaman",
        pt: "Backend: servidor Node.js com Express e Xaman",
        en: "Backend: Node.js server with Express and Xaman",
        jp: "バックエンド：ExpressとXamanを使ったNode.jsサーバー",
        zh: "后端：使用 Express 与 Xaman 的 Node.js 服务器",
        ko: "백엔드: Express와 Xaman을 사용하는 Node.js 서버",
      },
      theory: {
        es: `En la lección anterior el frontend creaba los payloads directamente desde el navegador, solo con la API Key. Un **backend** añade lo que no se le puede confiar a un navegador: el servidor crea los payloads con la API Key y el **API Secret**, aplica tus reglas de negocio y confirma el pago en el ledger antes de entregar nada. El frontend solo muestra el QR.

### Por qué un backend

| | Solo frontend | Con backend |
|---|---|---|
| API Secret | No se puede usar: todo lo que está en el navegador es público | Se queda en el servidor |
| Reglas de negocio (importes, destinos) | Se ejecutan en código que el usuario puede cambiar | Se aplican en el servidor |
| Saber que el pago ocurrió | Se confía en lo que dice el navegador | El servidor comprueba la transacción en la red Xahau |
| Notificaciones | Solo mientras la página está abierta | Los webhooks llegan al servidor aunque nadie esté mirando |

### Cómo se comunican las piezas

\`\`\`
Frontend                  Backend (Express)            Xaman API        Xahau Network
   │                           │                          │                  │
   │── POST /api/pago ─────▶│── crear payload ─────────────▶│                  │
   │◀── { qrUrl, uuid } ───────│◀── uuid + QR ────────────│                  │
   │   (mostrar QR)                │                          │                  │
   │── GET /api/pago/uuid ─▶│── leer payload ──────────────▶│                  │
   │                           │── tx (txid) ────────────────────────────────▶│
   │◀── { signed, validated,  ─│◀── ¿validada? ¿resultado? ──────────────────────────────────│
   │      result, delivered }  │                          │                  │
\`\`\`

1. El frontend pide un pago al backend. El servidor valida los campos y crea un payload de Xaman.
2. El usuario escanea el QR y firma en Xaman.
3. El frontend consulta \`GET /api/pago/:uuid\` periódicamente. Cuando el payload está firmado, el servidor busca el \`txid\` en la red Xahau y devuelve lo que encuentra.

### Notificaciones de firma: polling o webhook

| | Polling (\`GET /api/pago/:uuid\`) | Webhook (\`POST /webhook/xaman\`) |
|---|---|---|
| Quién pregunta | Tu frontend, cada pocos segundos | Xaman llama a tu servidor cuando el usuario actúa |
| Funciona en localhost | Sí | Solo con una URL pública (un túnel, en desarrollo) |
| Ideal para | Desarrollo, y páginas que el usuario mantiene abiertas | Producción: pedidos, recibos, todo lo que no se puede perder |

El servidor de la pestaña Código admite los dos. Para usar el webhook, pon su URL en **apps.xaman.dev** → tu app → Webhook: \`https://tu-servidor.com/webhook/xaman\`.

### Ejecútalo

1. Crea una app en **apps.xaman.dev** y copia su API Key y su API Secret en \`.env\`:

\`\`\`bash
# .env (nunca subas este archivo)
XUMM_API_KEY=your-api-key
XUMM_API_SECRET=your-api-secret
PORT=3001
\`\`\`

2. Ejecuta los comandos de instalación de la pestaña Código. Crean las carpetas, instalan \`express\`, \`xumm\`, \`xahau\`, \`dotenv\` y \`cors\`, y añaden \`.env\` a \`.gitignore\`.
3. Crea \`package.json\`, \`server.js\` y \`public/index.html\` a partir de la pestaña Código. El proyecto queda así:

\`\`\`
xaman-backend/
├── .env              ← API Key y Secret (nunca a git)
├── .gitignore        ← incluye .env
├── package.json
├── server.js         ← rutas, webhook y comprobación en el ledger
└── public/
    └── index.html    ← la interfaz, servida por Express
\`\`\`

4. Arranca el servidor con \`npm run dev\` y abre \`http://localhost:3001\`. Inicia sesión con Xaman y envía un pago.

El último bloque de la pestaña Código, \`src/App.jsx\`, es un frontend alternativo en React que llama a las mismas rutas.

### Qué significa el estado del pago

Cuando el payload está firmado, \`GET /api/pago/:uuid\` responde:

\`\`\`json
{ "signed": true, "txid": "…", "validated": true, "result": "tesSUCCESS", "delivered": "1000000" }
\`\`\`

- **\`signed\`**: el usuario aprobó el payload en Xaman. Por sí solo no demuestra nada sobre el ledger.
- **\`txid\`**: el hash de la transacción que envió Xaman.
- **\`validated\`**: la transacción está en un ledger validado. Mientras no lo esté, \`result\` es \`null\`: vuelve a consultar.
- **\`result\`**: el código de resultado de la transacción. Solo \`tesSUCCESS\` significa que el pago se aplicó.
- **\`delivered\`**: lo que llegó de verdad al destino (drops, en XAH). Compáralo con lo esperado antes de entregar nada.

### Casos a vigilar

- **Firmado no es pagado.** Un payload firmado aún puede fallar en el ledger (\`tecUNFUNDED_PAYMENT\`, por ejemplo) o no estar validado todavía. Entrega solo con \`validated: true\`, \`result: "tesSUCCESS"\` y el importe \`delivered\` correcto.
- **Cualquiera puede llamar a tu webhook.** Su URL es pública. Xaman firma cada webhook con un HMAC-SHA1 de la cabecera \`x-xumm-request-timestamp\` más el cuerpo, con tu API Secret sin guiones como clave, y lo envía en \`x-xumm-request-signature\`. El servidor lo recalcula y responde \`401\` si no coincide, antes de leer el cuerpo ([documentación de Xaman](https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates/webhooks/signature-verification)).
- **Los payloads caducan.** Si el usuario no firma a tiempo, el estado devuelve \`signed: false\` con \`expired: true\`. Crea un payload nuevo en vez de esperar.
- **Testnet y mainnet cambian en dos sitios.** Los payloads usan \`NetworkID: 21338\` (testnet; mainnet es \`21337\`), y \`verifyOnLedger\` se conecta a \`wss://xahau-test.net\`. Cambia los dos a la vez.
- **Un API Secret filtrado.** Rota las credenciales en apps.xaman.dev: genera una nueva API Key y un nuevo Secret, actualiza \`.env\` en el servidor y borra el par antiguo.`,
        pt: `Na lição anterior, o frontend criava os payloads direto do navegador, só com a API Key. Um **backend** acrescenta o que não se pode confiar a um navegador: o servidor cria os payloads com a API Key e o **API Secret**, aplica suas regras de negócio e confirma o pagamento no ledger antes de entregar qualquer coisa. O frontend só mostra o QR.

### Por que um backend

| | Só frontend | Com backend |
|---|---|---|
| API Secret | Não pode ser usado: tudo que está no navegador é público | Fica no servidor |
| Regras de negócio (valores, destinos) | Rodam em código que o usuário pode alterar | São aplicadas no servidor |
| Saber que o pagamento aconteceu | Confia no que o navegador informa | O servidor confere a transação na rede Xahau |
| Notificações | Só enquanto a página está aberta | Webhooks chegam ao servidor mesmo sem ninguém olhando |

### Como as partes se comunicam

\`\`\`
Frontend                  Backend (Express)            Xaman API        Xahau Network
   │                           │                          │                  │
   │── POST /api/pagamento ─────▶│── criar payload ─────────────▶│                  │
   │◀── { qrUrl, uuid } ───────│◀── uuid + QR ────────────│                  │
   │   (mostrar QR)                │                          │                  │
   │── GET /api/pagamento/uuid ─▶│── ler payload ──────────────▶│                  │
   │                           │── tx (txid) ────────────────────────────────▶│
   │◀── { signed, validated,  ─│◀── validada? resultado? ──────────────────────────────────│
   │      result, delivered }  │                          │                  │
\`\`\`

1. O frontend pede um pagamento ao backend. O servidor valida os campos e cria um payload da Xaman.
2. O usuário escaneia o QR e assina na Xaman.
3. O frontend consulta \`GET /api/pagamento/:uuid\` periodicamente. Quando o payload está assinado, o servidor procura o \`txid\` na rede Xahau e devolve o que encontrou.

### Notificações de assinatura: polling ou webhook

| | Polling (\`GET /api/pagamento/:uuid\`) | Webhook (\`POST /webhook/xaman\`) |
|---|---|---|
| Quem pergunta | Seu frontend, a cada poucos segundos | A Xaman chama seu servidor quando o usuário age |
| Funciona em localhost | Sim | Só com uma URL pública (um túnel, em desenvolvimento) |
| Ideal para | Desenvolvimento e páginas que o usuário mantém abertas | Produção: pedidos, recibos, tudo que não pode se perder |

O servidor da aba Código suporta os dois. Para usar o webhook, defina a URL em **apps.xaman.dev** → seu app → Webhook: \`https://seu-servidor.com/webhook/xaman\`.

### Execute

1. Crie um app em **apps.xaman.dev** e copie a API Key e o API Secret para o \`.env\`:

\`\`\`bash
# .env (nunca envie este arquivo ao git)
XUMM_API_KEY=your-api-key
XUMM_API_SECRET=your-api-secret
PORT=3001
\`\`\`

2. Execute os comandos de instalação da aba Código. Eles criam as pastas, instalam \`express\`, \`xumm\`, \`xahau\`, \`dotenv\` e \`cors\`, e adicionam \`.env\` ao \`.gitignore\`.
3. Crie \`package.json\`, \`server.js\` e \`public/index.html\` a partir da aba Código. O projeto fica assim:

\`\`\`
xaman-backend/
├── .env              ← API Key e Secret (nunca no git)
├── .gitignore        ← inclui .env
├── package.json
├── server.js         ← rotas, webhook e verificação no ledger
└── public/
    └── index.html    ← a interface, servida pelo Express
\`\`\`

4. Inicie o servidor com \`npm run dev\` e abra \`http://localhost:3001\`. Entre com a Xaman e envie um pagamento.

O último bloco da aba Código, \`src/App.jsx\`, é um frontend alternativo em React que chama as mesmas rotas.

### O que o status do pagamento significa

Quando o payload está assinado, \`GET /api/pagamento/:uuid\` responde:

\`\`\`json
{ "signed": true, "txid": "…", "validated": true, "result": "tesSUCCESS", "delivered": "1000000" }
\`\`\`

- **\`signed\`**: o usuário aprovou o payload na Xaman. Sozinho, isso não prova nada sobre o ledger.
- **\`txid\`**: o hash da transação que a Xaman enviou.
- **\`validated\`**: a transação está em um ledger validado. Enquanto não estiver, \`result\` é \`null\`: consulte de novo.
- **\`result\`**: o código de resultado da transação. Só \`tesSUCCESS\` significa que o pagamento foi aplicado.
- **\`delivered\`**: o que realmente chegou ao destino (drops, para XAH). Compare com o esperado antes de entregar qualquer coisa.

### Casos para observar

- **Assinado não é pago.** Um payload assinado ainda pode falhar no ledger (\`tecUNFUNDED_PAYMENT\`, por exemplo) ou ainda não estar validado. Entregue só com \`validated: true\`, \`result: "tesSUCCESS"\` e o valor \`delivered\` correto.
- **Qualquer um pode chamar seu webhook.** A URL é pública. A Xaman assina cada webhook com um HMAC-SHA1 do cabeçalho \`x-xumm-request-timestamp\` mais o corpo, com seu API Secret sem hifens como chave, e o envia em \`x-xumm-request-signature\`. O servidor o recalcula e responde \`401\` se não bater, antes de ler o corpo ([documentação da Xaman](https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates/webhooks/signature-verification)).
- **Payloads expiram.** Se o usuário não assinar a tempo, o status retorna \`signed: false\` com \`expired: true\`. Crie um payload novo em vez de esperar.
- **Testnet e mainnet mudam em dois lugares.** Os payloads usam \`NetworkID: 21338\` (testnet; mainnet é \`21337\`), e \`verifyOnLedger\` se conecta a \`wss://xahau-test.net\`. Mude os dois juntos.
- **Um API Secret vazado.** Troque as credenciais em apps.xaman.dev: gere uma nova API Key e um novo Secret, atualize o \`.env\` no servidor e apague o par antigo.`,
        en: `In the previous lesson the frontend created payloads directly from the browser, with the API Key only. A **backend** adds what a browser can't be trusted with: the server creates the payloads using the API Key and the **API Secret**, applies your business rules, and confirms the payment on the ledger before anything is delivered. The frontend only shows the QR.

### Why a backend

| | Frontend only | With a backend |
|---|---|---|
| API Secret | Can't be used: anything in the browser is public | Stays on the server |
| Business rules (amounts, destinations) | Run in code the user can change | Enforced on the server |
| Knowing the payment happened | Trusts what the browser reports | The server checks the transaction on the Xahau Network |
| Notifications | Only while the page is open | Webhooks reach the server even when nobody is watching |

### How the pieces talk

\`\`\`
Frontend                  Backend (Express)            Xaman API        Xahau Network
   │                           │                          │                  │
   │── POST /api/payment ─────▶│── create payload ─────────────▶│                  │
   │◀── { qrUrl, uuid } ───────│◀── uuid + QR ────────────│                  │
   │   (show QR)                │                          │                  │
   │── GET /api/payment/uuid ─▶│── get payload ──────────────▶│                  │
   │                           │── tx (txid) ────────────────────────────────▶│
   │◀── { signed, validated,  ─│◀── validated? result? ──────────────────────────────────│
   │      result, delivered }  │                          │                  │
\`\`\`

1. The frontend asks the backend for a payment. The server validates the fields and creates a Xaman payload.
2. The user scans the QR and signs in Xaman.
3. The frontend polls \`GET /api/payment/:uuid\`. Once the payload is signed, the server looks the \`txid\` up on the Xahau Network and returns what it found.

### Signing notifications: polling or webhook

| | Polling (\`GET /api/payment/:uuid\`) | Webhook (\`POST /webhook/xaman\`) |
|---|---|---|
| Who asks | Your frontend, every few seconds | Xaman calls your server once the user acts |
| Works on localhost | Yes | Only with a public URL (a tunnel, in development) |
| Best for | Development, and pages the user keeps open | Production: orders, receipts, anything that must not be missed |

The server in the Code tab supports both. To use the webhook, set its URL in **apps.xaman.dev** → your app → Webhook: \`https://your-server.com/webhook/xaman\`.

### Run it

1. Create an app in **apps.xaman.dev** and copy its API Key and API Secret into \`.env\`:

\`\`\`bash
# .env (never commit this file)
XUMM_API_KEY=your-api-key
XUMM_API_SECRET=your-api-secret
PORT=3001
\`\`\`

2. Run the installation commands in the Code tab. They create the folders, install \`express\`, \`xumm\`, \`xahau\`, \`dotenv\` and \`cors\`, and add \`.env\` to \`.gitignore\`.
3. Create \`package.json\`, \`server.js\` and \`public/index.html\` from the Code tab. The project then looks like this:

\`\`\`
xaman-backend/
├── .env              ← API Key and Secret (never to git)
├── .gitignore        ← includes .env
├── package.json
├── server.js         ← routes, webhook and ledger check
└── public/
    └── index.html    ← the UI, served by Express
\`\`\`

4. Start the server with \`npm run dev\` and open \`http://localhost:3001\`. Sign in with Xaman, then send a payment.

The last block in the Code tab, \`src/App.jsx\`, is an alternative React frontend that calls the same routes.

### What the payment status means

When the payload is signed, \`GET /api/payment/:uuid\` answers with:

\`\`\`json
{ "signed": true, "txid": "…", "validated": true, "result": "tesSUCCESS", "delivered": "1000000" }
\`\`\`

- **\`signed\`**: the user approved the payload in Xaman. On its own this proves nothing about the ledger.
- **\`txid\`**: the hash of the transaction Xaman submitted.
- **\`validated\`**: the transaction is in a validated ledger. Until it is, \`result\` is \`null\`: poll again.
- **\`result\`**: the transaction's result code. Only \`tesSUCCESS\` means the payment was applied.
- **\`delivered\`**: what actually reached the destination (drops for XAH). Compare it with what you expected before delivering anything.

### Cases to watch

- **Signed is not paid.** A signed payload can still fail on the ledger (\`tecUNFUNDED_PAYMENT\`, for example) or not be validated yet. Deliver only on \`validated: true\` with \`result: "tesSUCCESS"\` and the right \`delivered\` amount.
- **Anyone can call your webhook.** Its URL is public. Xaman signs every webhook with an HMAC-SHA1 of the \`x-xumm-request-timestamp\` header plus the body, keyed with your API Secret without dashes, and sends it in \`x-xumm-request-signature\`. The server recomputes it and answers \`401\` when it doesn't match, before reading the body ([Xaman's documentation](https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates/webhooks/signature-verification)).
- **Payloads expire.** If the user doesn't sign in time, the status returns \`signed: false\` with \`expired: true\`. Create a new payload instead of waiting.
- **Testnet and mainnet differ in two places.** The payloads use \`NetworkID: 21338\` (testnet; mainnet is \`21337\`), and \`verifyOnLedger\` connects to \`wss://xahau-test.net\`. Change both together.
- **A leaked API Secret.** Rotate the credentials in apps.xaman.dev: generate a new API Key and Secret, update \`.env\` on the server, and delete the old pair.`,
        jp: `前のレッスンでは、フロントエンドがブラウザから API Key だけで直接 payload を作成していました。**バックエンド**を置くと、ブラウザには任せられないことを担えます。サーバーは API Key と **API Secret** で payload を作成し、ビジネスルールを適用し、何かを引き渡す前にレジャー上で支払いを確認します。フロントエンドは QR を表示するだけです。

### なぜバックエンドなのか

| | フロントエンドのみ | バックエンドあり |
|---|---|---|
| API Secret | 使えない: ブラウザ内のものはすべて公開される | サーバーに置いたまま |
| ビジネスルール（金額、送金先） | ユーザーが改変できるコードで実行される | サーバーで強制される |
| 支払いが行われたかの確認 | ブラウザの報告を信じるしかない | サーバーが Xahau ネットワーク上でトランザクションを確認する |
| 通知 | ページを開いている間だけ | 誰も見ていなくても webhook がサーバーに届く |

### 各部分のやり取り

\`\`\`
Frontend                  Backend (Express)            Xaman API        Xahau Network
   │                           │                          │                  │
   │── POST /api/payment ─────▶│── payload 作成 ─────────────▶│                  │
   │◀── { qrUrl, uuid } ───────│◀── uuid + QR ────────────│                  │
   │   (QR を表示)                │                          │                  │
   │── GET /api/payment/uuid ─▶│── payload 取得 ──────────────▶│                  │
   │                           │── tx (txid) ────────────────────────────────▶│
   │◀── { signed, validated,  ─│◀── 検証済み？結果は？ ──────────────────────────────────│
   │      result, delivered }  │                          │                  │
\`\`\`

1. フロントエンドがバックエンドに支払いを依頼します。サーバーはフィールドを検証し、Xaman の payload を作成します。
2. ユーザーが QR をスキャンし、Xaman で署名します。
3. フロントエンドは \`GET /api/payment/:uuid\` を定期的に問い合わせます。payload が署名されると、サーバーは Xahau ネットワークで \`txid\` を調べ、その結果を返します。

### 署名の通知: ポーリングか webhook か

| | ポーリング（\`GET /api/payment/:uuid\`） | Webhook（\`POST /webhook/xaman\`） |
|---|---|---|
| 誰が問い合わせるか | フロントエンドが数秒ごとに | ユーザーが操作すると Xaman がサーバーを呼ぶ |
| localhost で動くか | はい | 公開 URL がある場合のみ（開発中はトンネル） |
| 向いている用途 | 開発、ユーザーが開いたままのページ | 本番: 注文、領収書など取りこぼせないもの |

コードタブのサーバーは両方に対応しています。webhook を使うには、**apps.xaman.dev** → アプリ → Webhook に URL を設定します: \`https://your-server.com/webhook/xaman\`。

### 実行する

1. **apps.xaman.dev** でアプリを作成し、API Key と API Secret を \`.env\` にコピーします。

\`\`\`bash
# .env（このファイルは絶対にコミットしない）
XUMM_API_KEY=your-api-key
XUMM_API_SECRET=your-api-secret
PORT=3001
\`\`\`

2. コードタブのインストールコマンドを実行します。フォルダを作成し、\`express\`、\`xumm\`、\`xahau\`、\`dotenv\`、\`cors\` をインストールし、\`.env\` を \`.gitignore\` に追加します。
3. コードタブから \`package.json\`、\`server.js\`、\`public/index.html\` を作成します。プロジェクトは次のようになります。

\`\`\`
xaman-backend/
├── .env              ← API Key と Secret（git に入れない）
├── .gitignore        ← .env を含む
├── package.json
├── server.js         ← ルート、webhook、レジャー確認
└── public/
    └── index.html    ← Express が配信する UI
\`\`\`

4. \`npm run dev\` でサーバーを起動し、\`http://localhost:3001\` を開きます。Xaman でサインインしてから支払いを送ります。

コードタブの最後のブロック \`src/App.jsx\` は、同じルートを呼び出す React 版の別フロントエンドです。

### 支払いステータスの意味

payload が署名されると、\`GET /api/payment/:uuid\` は次のように返します。

\`\`\`json
{ "signed": true, "txid": "…", "validated": true, "result": "tesSUCCESS", "delivered": "1000000" }
\`\`\`

- **\`signed\`**: ユーザーが Xaman で payload を承認した。これだけではレジャーについて何も証明しない。
- **\`txid\`**: Xaman が送信したトランザクションのハッシュ。
- **\`validated\`**: トランザクションが検証済みのレジャーに入っている。そうなるまで \`result\` は \`null\` なので、もう一度問い合わせる。
- **\`result\`**: トランザクションの結果コード。\`tesSUCCESS\` だけが支払いが適用されたことを意味する。
- **\`delivered\`**: 実際に送金先に届いた額（XAH なら drops）。何かを引き渡す前に期待額と比較する。

### 注意するケース

- **署名されても支払い済みとは限らない。** 署名された payload でも、レジャーで失敗したり（例: \`tecUNFUNDED_PAYMENT\`）、まだ検証されていなかったりします。\`validated: true\`、\`result: "tesSUCCESS"\`、正しい \`delivered\` 額がそろったときだけ引き渡してください。
- **webhook は誰でも呼べる。** URL は公開されています。Xaman はすべての webhook に、\`x-xumm-request-timestamp\` ヘッダーと本文をつないだものの HMAC-SHA1（キーはハイフンを除いた API Secret）で署名し、\`x-xumm-request-signature\` で送ります。サーバーは本文を読む前にこれを再計算し、一致しなければ \`401\` を返します（[Xaman のドキュメント](https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates/webhooks/signature-verification)）。
- **payload には有効期限がある。** ユーザーが時間内に署名しないと、ステータスは \`signed: false\` と \`expired: true\` を返します。待たずに新しい payload を作成してください。
- **テストネットとメインネットの違いは2か所。** payload は \`NetworkID: 21338\`（テストネット。メインネットは \`21337\`）を使い、\`verifyOnLedger\` は \`wss://xahau-test.net\` に接続します。両方を一緒に変更してください。
- **API Secret が漏れた。** apps.xaman.dev で認証情報をローテーションします。新しい API Key と Secret を発行し、サーバーの \`.env\` を更新して、古い組を削除します。`,
        zh: `上一课中，前端只用 API Key 直接在浏览器里创建 payload。**后端**补上了不能交给浏览器的部分：服务器用 API Key 和 **API Secret** 创建 payload，执行你的业务规则，并在交付任何东西之前在账本上确认付款。前端只负责显示二维码。

### 为什么需要后端

| | 仅前端 | 有后端 |
|---|---|---|
| API Secret | 无法使用：浏览器中的一切都是公开的 | 留在服务器上 |
| 业务规则（金额、收款方） | 运行在用户可以修改的代码中 | 由服务器强制执行 |
| 确认付款已发生 | 只能相信浏览器的说法 | 服务器在 Xahau 网络上核对交易 |
| 通知 | 仅在页面打开时 | 即使无人查看，webhook 也会到达服务器 |

### 各部分如何交互

\`\`\`
Frontend                  Backend (Express)            Xaman API        Xahau Network
   │                           │                          │                  │
   │── POST /api/payment ─────▶│── 创建 payload ─────────────▶│                  │
   │◀── { qrUrl, uuid } ───────│◀── uuid + QR ────────────│                  │
   │   (显示二维码)                │                          │                  │
   │── GET /api/payment/uuid ─▶│── 获取 payload ──────────────▶│                  │
   │                           │── tx (txid) ────────────────────────────────▶│
   │◀── { signed, validated,  ─│◀── 已验证？结果？ ──────────────────────────────────│
   │      result, delivered }  │                          │                  │
\`\`\`

1. 前端向后端请求付款。服务器校验字段并创建 Xaman payload。
2. 用户扫描二维码并在 Xaman 中签名。
3. 前端定期查询 \`GET /api/payment/:uuid\`。payload 签名后，服务器在 Xahau 网络上查询 \`txid\` 并返回结果。

### 签名通知：轮询还是 webhook

| | 轮询（\`GET /api/payment/:uuid\`） | Webhook（\`POST /webhook/xaman\`） |
|---|---|---|
| 谁来询问 | 你的前端，每隔几秒 | 用户操作后 Xaman 调用你的服务器 |
| 能否在 localhost 使用 | 可以 | 只有公开 URL 才行（开发时用隧道） |
| 适合 | 开发，以及用户一直打开的页面 | 生产：订单、收据等不能遗漏的事情 |

代码标签页中的服务器两者都支持。要使用 webhook，在 **apps.xaman.dev** → 你的应用 → Webhook 中填写 URL：\`https://your-server.com/webhook/xaman\`。

### 运行

1. 在 **apps.xaman.dev** 创建应用，把 API Key 和 API Secret 复制到 \`.env\`：

\`\`\`bash
# .env（绝不要提交这个文件）
XUMM_API_KEY=your-api-key
XUMM_API_SECRET=your-api-secret
PORT=3001
\`\`\`

2. 运行代码标签页中的安装命令。它们会创建文件夹，安装 \`express\`、\`xumm\`、\`xahau\`、\`dotenv\` 和 \`cors\`，并把 \`.env\` 加入 \`.gitignore\`。
3. 根据代码标签页创建 \`package.json\`、\`server.js\` 和 \`public/index.html\`。项目结构如下：

\`\`\`
xaman-backend/
├── .env              ← API Key 和 Secret（绝不进 git）
├── .gitignore        ← 包含 .env
├── package.json
├── server.js         ← 路由、webhook 和账本核对
└── public/
    └── index.html    ← 由 Express 提供的界面
\`\`\`

4. 用 \`npm run dev\` 启动服务器并打开 \`http://localhost:3001\`。用 Xaman 登录，然后发送付款。

代码标签页的最后一个代码块 \`src/App.jsx\` 是调用相同路由的 React 替代前端。

### 付款状态的含义

payload 签名后，\`GET /api/payment/:uuid\` 返回：

\`\`\`json
{ "signed": true, "txid": "…", "validated": true, "result": "tesSUCCESS", "delivered": "1000000" }
\`\`\`

- **\`signed\`**：用户在 Xaman 中批准了 payload。仅凭这一点并不能证明账本上发生了什么。
- **\`txid\`**：Xaman 提交的交易哈希。
- **\`validated\`**：交易已在已验证的账本中。在此之前 \`result\` 为 \`null\`：请再次查询。
- **\`result\`**：交易的结果代码。只有 \`tesSUCCESS\` 表示付款已被应用。
- **\`delivered\`**：实际到达收款方的金额（XAH 以 drops 计）。交付任何东西之前，先与预期金额比较。

### 需要注意的情况

- **已签名不等于已付款。** 已签名的 payload 仍可能在账本上失败（例如 \`tecUNFUNDED_PAYMENT\`），或者尚未验证。只有在 \`validated: true\`、\`result: "tesSUCCESS"\` 且 \`delivered\` 金额正确时才交付。
- **任何人都能调用你的 webhook。** 它的 URL 是公开的。Xaman 会用 \`x-xumm-request-timestamp\` 头加请求体的 HMAC-SHA1（密钥为去掉连字符的 API Secret）为每个 webhook 签名，并放在 \`x-xumm-request-signature\` 中发送。服务器在读取请求体之前重新计算，不匹配就返回 \`401\`（[Xaman 文档](https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates/webhooks/signature-verification)）。
- **payload 会过期。** 用户没有及时签名时，状态返回 \`signed: false\` 和 \`expired: true\`。请创建新的 payload，而不是继续等待。
- **测试网和主网有两处不同。** payload 使用 \`NetworkID: 21338\`（测试网；主网为 \`21337\`），\`verifyOnLedger\` 连接 \`wss://xahau-test.net\`。两处要一起修改。
- **API Secret 泄露。** 在 apps.xaman.dev 轮换凭证：生成新的 API Key 和 Secret，更新服务器上的 \`.env\`，并删除旧的一对。`,
        ko: `이전 레슨에서는 프런트엔드가 API Key만으로 브라우저에서 직접 payload를 만들었습니다. **백엔드**는 브라우저에 맡길 수 없는 일을 더합니다. 서버가 API Key와 **API Secret**으로 payload를 만들고, 비즈니스 규칙을 적용하며, 무엇이든 전달하기 전에 레저에서 결제를 확인합니다. 프런트엔드는 QR만 보여 줍니다.

### 왜 백엔드인가

| | 프런트엔드만 | 백엔드 사용 |
|---|---|---|
| API Secret | 쓸 수 없음: 브라우저 안의 것은 모두 공개됨 | 서버에 머묾 |
| 비즈니스 규칙(금액, 수신자) | 사용자가 바꿀 수 있는 코드에서 실행 | 서버에서 강제 |
| 결제가 이루어졌는지 확인 | 브라우저의 보고를 믿음 | 서버가 Xahau 네트워크에서 트랜잭션을 확인 |
| 알림 | 페이지가 열려 있는 동안만 | 아무도 보고 있지 않아도 webhook이 서버에 도착 |

### 구성 요소 간의 흐름

\`\`\`
Frontend                  Backend (Express)            Xaman API        Xahau Network
   │                           │                          │                  │
   │── POST /api/payment ─────▶│── payload 생성 ─────────────▶│                  │
   │◀── { qrUrl, uuid } ───────│◀── uuid + QR ────────────│                  │
   │   (QR 표시)                │                          │                  │
   │── GET /api/payment/uuid ─▶│── payload 조회 ──────────────▶│                  │
   │                           │── tx (txid) ────────────────────────────────▶│
   │◀── { signed, validated,  ─│◀── 검증됨? 결과? ──────────────────────────────────│
   │      result, delivered }  │                          │                  │
\`\`\`

1. 프런트엔드가 백엔드에 결제를 요청합니다. 서버는 필드를 검증하고 Xaman payload를 만듭니다.
2. 사용자가 QR을 스캔하고 Xaman에서 서명합니다.
3. 프런트엔드는 \`GET /api/payment/:uuid\`를 주기적으로 조회합니다. payload가 서명되면 서버는 Xahau 네트워크에서 \`txid\`를 조회하고 결과를 돌려줍니다.

### 서명 알림: 폴링 또는 webhook

| | 폴링(\`GET /api/payment/:uuid\`) | Webhook(\`POST /webhook/xaman\`) |
|---|---|---|
| 누가 묻는가 | 프런트엔드가 몇 초마다 | 사용자가 행동하면 Xaman이 서버를 호출 |
| localhost에서 동작 | 예 | 공개 URL이 있을 때만(개발 중에는 터널) |
| 적합한 용도 | 개발, 사용자가 열어 두는 페이지 | 운영: 주문, 영수증 등 놓치면 안 되는 것 |

코드 탭의 서버는 둘 다 지원합니다. webhook을 쓰려면 **apps.xaman.dev** → 앱 → Webhook에 URL을 설정하세요: \`https://your-server.com/webhook/xaman\`.

### 실행하기

1. **apps.xaman.dev**에서 앱을 만들고 API Key와 API Secret을 \`.env\`에 복사합니다.

\`\`\`bash
# .env (이 파일은 절대 커밋하지 마세요)
XUMM_API_KEY=your-api-key
XUMM_API_SECRET=your-api-secret
PORT=3001
\`\`\`

2. 코드 탭의 설치 명령을 실행합니다. 폴더를 만들고 \`express\`, \`xumm\`, \`xahau\`, \`dotenv\`, \`cors\`를 설치하며 \`.env\`를 \`.gitignore\`에 추가합니다.
3. 코드 탭을 보고 \`package.json\`, \`server.js\`, \`public/index.html\`을 만듭니다. 프로젝트는 다음과 같습니다.

\`\`\`
xaman-backend/
├── .env              ← API Key와 Secret (git에 넣지 않음)
├── .gitignore        ← .env 포함
├── package.json
├── server.js         ← 라우트, webhook, 레저 확인
└── public/
    └── index.html    ← Express가 제공하는 UI
\`\`\`

4. \`npm run dev\`로 서버를 시작하고 \`http://localhost:3001\`을 엽니다. Xaman으로 로그인한 뒤 결제를 보냅니다.

코드 탭의 마지막 블록 \`src/App.jsx\`는 같은 라우트를 호출하는 React 대체 프런트엔드입니다.

### 결제 상태의 의미

payload가 서명되면 \`GET /api/payment/:uuid\`는 다음과 같이 응답합니다.

\`\`\`json
{ "signed": true, "txid": "…", "validated": true, "result": "tesSUCCESS", "delivered": "1000000" }
\`\`\`

- **\`signed\`**: 사용자가 Xaman에서 payload를 승인했습니다. 이것만으로는 레저에 대해 아무것도 증명하지 않습니다.
- **\`txid\`**: Xaman이 제출한 트랜잭션의 해시.
- **\`validated\`**: 트랜잭션이 검증된 레저에 있습니다. 그 전까지 \`result\`는 \`null\`이므로 다시 조회하세요.
- **\`result\`**: 트랜잭션 결과 코드. \`tesSUCCESS\`만 결제가 적용되었다는 뜻입니다.
- **\`delivered\`**: 실제로 수신자에게 도착한 금액(XAH는 drops). 무엇이든 전달하기 전에 기대한 금액과 비교하세요.

### 주의할 경우

- **서명은 결제 완료가 아닙니다.** 서명된 payload도 레저에서 실패하거나(\`tecUNFUNDED_PAYMENT\` 등) 아직 검증되지 않았을 수 있습니다. \`validated: true\`, \`result: "tesSUCCESS"\`, 올바른 \`delivered\` 금액이 모두 확인될 때만 전달하세요.
- **누구나 webhook을 호출할 수 있습니다.** URL은 공개되어 있습니다. Xaman은 모든 webhook에 \`x-xumm-request-timestamp\` 헤더와 본문을 이은 값의 HMAC-SHA1(키는 하이픈을 뺀 API Secret)로 서명해 \`x-xumm-request-signature\`로 보냅니다. 서버는 본문을 읽기 전에 이를 다시 계산하고, 일치하지 않으면 \`401\`로 응답합니다([Xaman 문서](https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates/webhooks/signature-verification)).
- **payload는 만료됩니다.** 사용자가 제때 서명하지 않으면 상태는 \`signed: false\`와 \`expired: true\`를 반환합니다. 기다리지 말고 새 payload를 만드세요.
- **테스트넷과 메인넷은 두 곳이 다릅니다.** payload는 \`NetworkID: 21338\`(테스트넷, 메인넷은 \`21337\`)을 쓰고, \`verifyOnLedger\`는 \`wss://xahau-test.net\`에 연결합니다. 둘을 함께 바꾸세요.
- **API Secret이 유출되었다면.** apps.xaman.dev에서 자격 증명을 교체하세요. 새 API Key와 Secret을 만들고, 서버의 \`.env\`를 갱신한 뒤 이전 쌍을 삭제합니다.`,
      },
      codeBlocks: [
        {
          title: {
            es: "Comandos de instalación",
            pt: "Comandos de instalacioun",
            en: "Installation commands",
            jp: "インストールコマンド",
            zh: "安装命令",
            ko: "설치 명령어",
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
npm install express xumm xahau dotenv cors
npm install --save-dev nodemon

# 4. Crear el .gitignore
printf ".env\\nnode_modules/\\n" > .gitignore

# 5. Arrancar en modo desarrollo (una vez que tengas package.json, server.js y public/index.html)
npm run dev
# Abre http://localhost:3001 en el navegador`,
            pt: `# 1. Criar o diretório do projeto
mkdir xaman-backend
cd xaman-backend
# 2. Criar a pasta para o frontend estático
mkdir public
# 3. Instalar dependemcias
npm init -e
npm install express xumm xahau dotenv cors
npm install --save-dev nodemon
# 4. Criar ou .gitignore
printf ".env\\nnode_modules/\\n" > .gitignore
# 5. Iniciar em modo de desenvolvimento (quando você já tiver package.json, server.js e public/index.html)
npm run dev
# Abra http://localhost:3001 no navegador`,
            en: `# 1. Create the project directory
mkdir xaman-backend
cd xaman-backend

# 2. Create the folder for static frontend files
mkdir public

# 3. Install dependencies
npm init -y
npm install express xumm xahau dotenv cors
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
npm install express xumm xahau dotenv cors
npm install --save-dev nodemon

# 4. Create the .gitignore
printf ".env\\nnode_modules/\\n" > .gitignore

# 5. Start in development mode (once you have package.json, server.js and public/index.html)
npm run dev
# Open http://localhost:3001 in the browser`,
            zh: `# 1. 创建项目目录
mkdir xaman-backend
cd xaman-backend

# 2. 创建静态前端文件目录
mkdir public

# 3. 安装依赖
npm init -y
npm install express xumm xahau dotenv cors
npm install --save-dev nodemon

# 4. 创建 .gitignore
printf ".env\\nnode_modules/\\n" > .gitignore

# 5. 开发模式启动（准备好 package.json、server.js 和 public/index.html 之后）
npm run dev
# 在浏览器中打开 http://localhost:3001`,
            ko: `# 1. 프로젝트 디렉토리 생성
mkdir xaman-backend
cd xaman-backend

# 2. 정적 프론트엔드 파일 폴더 생성
mkdir public

# 3. 의존성 설치
npm init -y
npm install express xumm xahau dotenv cors
npm install --save-dev nodemon

# 4. .gitignore 생성
printf ".env\\nnode_modules/\\n" > .gitignore

# 5. 개발 모드로 시작 (package.json, server.js, public/index.html 준비 후)
npm run dev
# 브라우저에서 http://localhost:3001 열기`,
          },
        },
        {
          title: {
            es: "package.json — copia y pega este archivo completo",
            pt: "package.json — coupia e pega este arquivo completo",
            en: "package.json — copy and paste this complete file",
            jp: "package.json — このファイルをそのままコピー",
            zh: "package.json —— 直接复制整个文件",
            ko: "package.json — 이 파일 전체를 복사하세요",
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
    "xahau": "^4.1.1",
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
            pt: ".env — credenciais (nunca enviar a git)",
            en: ".env — credentials (never push to git)",
            jp: ".env — 認証情報（gitにpushしない）",
            zh: ".env —— 凭证（不要提交到 git）",
            ko: ".env — 자격증명 (git에 절대 올리지 마세요)",
          },
          language: "bash",
          code: {
            es: `# Crea el archivo .env en la raíz del proyecto xaman-backend/
# Sustituye los valores por los de tu app en apps.xaman.dev

XUMM_API_KEY=tu-api-key-aqui
XUMM_API_SECRET=tu-api-secret-aqui
PORT=3001`,
            pt: `# Crie o arquivo .env na raiz do projeto xaman-backend/
# Substitua os valores por os de seu app em apps.xaman.dev
XUMM_API_KEY=sua-api-key-aqui
XUMM_API_SECRET=seu-api-secret-aqui
PORT=3001`,
            en: `# Create the .env file in the root of the xaman-backend/ project
# Replace the values with those from your app at apps.xaman.dev

XUMM_API_KEY=your-api-key-here
XUMM_API_SECRET=your-api-secret-here
PORT=3001`,
            jp: `# Create the .env file in the root of the xaman-backend/ project
# Replace the values with those from your app at apps.xaman.dev

XUMM_API_KEY=your-api-key-here
XUMM_API_SECRET=your-api-secret-here
PORT=3001`,
            zh: `# 在 xaman-backend/ 项目根目录创建 .env 文件
# 用 apps.xaman.dev 中你的应用值替换下面内容

XUMM_API_KEY=your-api-key-here
XUMM_API_SECRET=your-api-secret-here
PORT=3001`,
            ko: `# xaman-backend/ 프로젝트 루트에 .env 파일 생성
# apps.xaman.dev에서 앱의 값으로 교체하세요

XUMM_API_KEY=your-api-key-here
XUMM_API_SECRET=your-api-secret-here
PORT=3001`,
          },
        },
        {
          title: {
            es: "server.js — Servidor Express completo con Xaman",
            pt: "server.js — Servidor Express completo com Xaman",
            en: "server.js — Full Express server with Xaman",
            jp: "server.js — XamanとExpressの完全なサーバー",
            zh: "server.js —— 完整的 Express + Xaman 服务端",
            ko: "server.js — Xaman과 Express 완전한 서버",
          },
          language: "javascript",
          code: {
            es: `// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { Xumm } from "xumm";
import crypto from "node:crypto";
import { Client } from "xahau";

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
      // Firmado en Xaman no es lo mismo que aplicado en el ledger: comprueba el resultado allí
      res.json({ signed: true, txid, ...(await verifyOnLedger(txid)) });
    } else {
      res.json({ signed: false, expired: payload.meta.expired });
    }
  } catch (err) {
    res.status(500).json({ error: "Error consultando el payload" });
  }
});

// ── Ruta: Webhook de Xaman ────────────────────────────────────────────────────
// Configura esta URL en apps.xaman.dev → tu app → Webhook
app.post("/webhook/xaman", (req, res) => {

  // Solo se confía en peticiones firmadas por Xaman: la firma es un HMAC-SHA1 de
  // timestamp + cuerpo, con tu API Secret (sin guiones) como clave
  const timestamp = req.headers["x-xumm-request-timestamp"] ?? "";
  const expected = crypto
    .createHmac("sha1", process.env.XUMM_API_SECRET.replace(/-/g, ""))
    .update(timestamp + JSON.stringify(req.body))
    .digest("hex");
  if (req.headers["x-xumm-request-signature"] !== expected) {
    return res.sendStatus(401);
  }
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

// Busca la transacción en la red Xahau. Solo un tesSUCCESS validado
// significa que el pago ocurrió; hasta entonces, no entregues nada
async function verifyOnLedger(txid) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const { result } = await client.request({ command: "tx", transaction: txid });
    return {
      validated: result.validated === true,
      result: result.meta?.TransactionResult ?? null,
      delivered: result.meta?.delivered_amount ?? null,
    };
  } catch {
    return { validated: false, result: null, delivered: null }; // not on the ledger yet
  } finally {
    await client.disconnect();
  }
}

// ── Arrancar servidor ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(\`Servidor corriendo en http://localhost:\${PORT}\`);
  console.log(\`Abre en el navegador: http://localhost:\${PORT}\`);
});`,
            pt: `// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { Xumm } from "xumm";
import crypto from "node:crypto";
import { Client } from "xahau";
const app  = express();
const PORT = process.env.PORT || 3001;
// ── Middlewares ───────────────────────────────────────────────────────────────
app.use(cors());               // permite chamadas da mesma origem (public/)
app.use(express.json());
app.use(express.static("public")); // sirve public/index.html em http://localhost:3001
// ── SDK de Xaman (backend: API Key + API Secret) ──────────────────────────────
const xumm = new Xumm(
  process.env.XUMM_API_KEY,
  process.env.XUMM_API_SECRET
);
// ── Rota: Login — criar payload SignIn ────────────────────────────────────────
app.post("/api/login", async (req, res) => {
  try {
    const payload = await xumm.payload.create({
      txjson: { TransactionType: "SignIn", NetworkID: 21338 },
    });
    // Devolver ao frontend o QR e o UUID para acompanhar o estado
    res.json({
      uuid: payload.uuid,
      qrUrl: payload.refs.qr_png,
      deepLink: payload.next.always,
    });
  } catch (err) {
    console.error("Erro criando SignIn:", err);
    res.status(500).json({ error: "Não foi possível criar o payload de login" });
  }
});
// ── Rota: Verificar estado do login ──────────────────────────────────────────
app.get("/api/login/:uuid", async (req, res) => {
  try {
    const payload = await xumm.payload.get(req.params.uuid);
    if (!payload) {
      return res.status(404).json({ error: "Payload não encontrado" });
    }
    const signed  = payload.meta.signed;
    const account = payload.response?.account ?? null;
    if (signed) {
      res.json({ signed: true, account });
    } else {
      res.json({ signed: false, expired: payload.meta.expired });
    }
  } catch (err) {
    res.status(500).json({ error: "Erro ao consultar o payload" });
  }
});
// ── Rota: Criar pagamento ──────────────────────────────────────────────────────────
app.post("/api/pagamento", async (req, res) => {
  const { origem, destino, cantidadXAH } = req.body;
  // Validações de negocio no servidor
  if (!origem || !destino || !cantidadXAH) {
    return res.status(400).json({ error: "Faltam campos exigidos" });
  }
  if (!/^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(destino)) {
    return res.status(400).json({ error: "Endereço de destino inválido" });
  }
  const quantidade = Number(cantidadXAH);
  if (isNaN(quantidade) || quantidade <= 0) {
    return res.status(400).json({ error: "Quantidade inválida" });
  }
  try {
    const drops = String(Math.floor(quantidade * 1_000_000));
    const payload = await xumm.payload.create({
      txjson: {
        TransactionType: "Payment",
        NetworkID: 21338,
        Account: origem,
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
    console.error("Erro criando pagamento:", err);
    res.status(500).json({ error: "Não foi possível criar o pagamento" });
  }
});
// ── Rota: Verificar estado do pagamento ──────────────────────────────────────────
app.get("/api/pagamento/:uuid", async (req, res) => {
  try {
    const payload = await xumm.payload.get(req.params.uuid);
    if (!payload) {
      return res.status(404).json({ error: "Payload não encontrado" });
    }
    const signed = payload.meta.signed;
    const txid   = payload.response?.txid ?? null;
    if (signed) {
      // Assinado na Xaman não é o mesmo que aplicado no ledger: confira o resultado lá
      res.json({ signed: true, txid, ...(await verifyOnLedger(txid)) });
    } else {
      res.json({ signed: false, expired: payload.meta.expired });
    }
  } catch (err) {
    res.status(500).json({ error: "Erro ao consultar o payload" });
  }
});
// ── Rota: Webhook de Xaman ────────────────────────────────────────────────────
// Configura esta URL em apps.xaman.dev → seu app → Webhook
app.post("/webhook/xaman", (req, res) => {

  // Só se confia em requisições assinadas pela Xaman: a assinatura é um HMAC-SHA1 de
  // timestamp + corpo, com seu API Secret (sem hifens) como chave
  const timestamp = req.headers["x-xumm-request-timestamp"] ?? "";
  const expected = crypto
    .createHmac("sha1", process.env.XUMM_API_SECRET.replace(/-/g, ""))
    .update(timestamp + JSON.stringify(req.body))
    .digest("hex");
  if (req.headers["x-xumm-request-signature"] !== expected) {
    return res.sendStatus(401);
  }
  const body = req.body;
  console.log("Webhook recibido:", JSON.stringify(body, null, 2));
  // Conassinar recepcioun a Xaman (importante: responder 200 rápido)
  res.sendStatus(200);
  // Procesar de forma assincrona
  if (body?.payloadResponse?.signed === true) {
    const { txid, account } = body.payloadResponse;
    console.log(\`✅ Pagamento firmado por \${account}. TXID: \${txid}\`);
    // Aqui você pode salvar em banco de dados, enviar email, etc.
  } else if (body?.payloadResponse?.signed === false) {
    console.log("❌ Pagamento rejeitado por o usuário");
  }
});
// Procura a transação na rede Xahau. Só um tesSUCCESS validado
// significa que o pagamento aconteceu; até lá, não entregue nada
async function verifyOnLedger(txid) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const { result } = await client.request({ command: "tx", transaction: txid });
    return {
      validated: result.validated === true,
      result: result.meta?.TransactionResult ?? null,
      delivered: result.meta?.delivered_amount ?? null,
    };
  } catch {
    return { validated: false, result: null, delivered: null }; // not on the ledger yet
  } finally {
    await client.disconnect();
  }
}

// ── Arrancar servidor ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(\`Servidor corriendo em http://localhost:\${PORT}\`);
  console.log(\`Abra no navegador: http://localhost:\${PORT}\`);
});`,
            en: `// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { Xumm } from "xumm";
import crypto from "node:crypto";
import { Client } from "xahau";

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
      // Signed in Xaman is not the same as applied on the ledger: check the result there
      res.json({ signed: true, txid, ...(await verifyOnLedger(txid)) });
    } else {
      res.json({ signed: false, expired: payload.meta.expired });
    }
  } catch (err) {
    res.status(500).json({ error: "Error querying the payload" });
  }
});

// ── Route: Xaman Webhook ──────────────────────────────────────────────────────
// Configure this URL in apps.xaman.dev → your app → Webhook
app.post("/webhook/xaman", (req, res) => {

  // Only requests signed by Xaman are trusted: the signature is an HMAC-SHA1 of
  // timestamp + body, keyed with your API Secret (without dashes)
  const timestamp = req.headers["x-xumm-request-timestamp"] ?? "";
  const expected = crypto
    .createHmac("sha1", process.env.XUMM_API_SECRET.replace(/-/g, ""))
    .update(timestamp + JSON.stringify(req.body))
    .digest("hex");
  if (req.headers["x-xumm-request-signature"] !== expected) {
    return res.sendStatus(401);
  }
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

// Look the transaction up on the Xahau Network. Only a validated tesSUCCESS
// means the payment happened; until then, don't deliver anything
async function verifyOnLedger(txid) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const { result } = await client.request({ command: "tx", transaction: txid });
    return {
      validated: result.validated === true,
      result: result.meta?.TransactionResult ?? null,
      delivered: result.meta?.delivered_amount ?? null,
    };
  } catch {
    return { validated: false, result: null, delivered: null }; // not on the ledger yet
  } finally {
    await client.disconnect();
  }
}

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
  console.log(\`Open in browser: http://localhost:\${PORT}\`);
});`,
            zh: `// server.js —— 使用 Express 与 Xaman 的最小后端示例
import "dotenv/config";
import express from "express";
import cors from "cors";
import { Xumm } from "xumm";
import crypto from "node:crypto";
import { Client } from "xahau";

const app = express();
const PORT = process.env.PORT || 3001;
const xumm = new Xumm(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/login", async (_req, res) => {
  const payload = await xumm.payload.create({
    txjson: { TransactionType: "SignIn", NetworkID: 21338 },
  });
  res.json({
    uuid: payload.uuid,
    qrUrl: payload.refs.qr_png,
    deepLink: payload.next.always,
  });
});

app.get("/api/login/:uuid", async (req, res) => {
  const payload = await xumm.payload.get(req.params.uuid);
  res.json({
    signed: payload.meta.signed,
    expired: payload.meta.expired,
    account: payload.response?.account ?? null,
  });
});

app.post("/api/payment", async (req, res) => {
  const { origin, destination, amountXAH } = req.body;
  const payload = await xumm.payload.create({
    txjson: {
      TransactionType: "Payment",
      NetworkID: 21338,
      Account: origin,
      Destination: destination,
      Amount: String(Math.floor(Number(amountXAH) * 1_000_000)),
    },
  });
  res.json({
    uuid: payload.uuid,
    qrUrl: payload.refs.qr_png,
    deepLink: payload.next.always,
  });
});

app.get("/api/payment/:uuid", async (req, res) => {
  const payload = await xumm.payload.get(req.params.uuid);
  const txid = payload.response?.txid ?? null;
  // 在 Xaman 中签名不等于已在账本上应用：到账本上核对结果
  res.json({
    signed: payload.meta.signed,
    expired: payload.meta.expired,
    txid,
    ...(payload.meta.signed ? await verifyOnLedger(txid) : {}),
  });
});

app.post("/webhook/xaman", (req, res) => {

  // 只信任 Xaman 签名的请求：签名是 timestamp + 请求体的 HMAC-SHA1，
  // 密钥是去掉连字符的 API Secret
  const timestamp = req.headers["x-xumm-request-timestamp"] ?? "";
  const expected = crypto
    .createHmac("sha1", process.env.XUMM_API_SECRET.replace(/-/g, ""))
    .update(timestamp + JSON.stringify(req.body))
    .digest("hex");
  if (req.headers["x-xumm-request-signature"] !== expected) {
    return res.sendStatus(401);
  }
  console.log("Webhook received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// 在 Xahau 网络上查询交易。只有已验证的 tesSUCCESS
// 才表示付款已完成；在此之前不要交付任何东西
async function verifyOnLedger(txid) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const { result } = await client.request({ command: "tx", transaction: txid });
    return {
      validated: result.validated === true,
      result: result.meta?.TransactionResult ?? null,
      delivered: result.meta?.delivered_amount ?? null,
    };
  } catch {
    return { validated: false, result: null, delivered: null }; // not on the ledger yet
  } finally {
    await client.disconnect();
  }
}

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});`,
            jp: `// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { Xumm } from "xumm";
import crypto from "node:crypto";
import { Client } from "xahau";

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
    // Xaman で署名されたこととレジャーに適用されたことは別: レジャーで結果を確認する
    if (signed) { res.json({ signed: true, txid, ...(await verifyOnLedger(txid)) }); }
    else { res.json({ signed: false, expired: payload.meta.expired }); }
  } catch (err) { res.status(500).json({ error: "Error querying the payload" }); }
});

app.post("/webhook/xaman", (req, res) => {

  // Xaman が署名したリクエストだけを信頼する: 署名は timestamp + 本文の HMAC-SHA1
  // （キーはハイフンを除いた API Secret）
  const timestamp = req.headers["x-xumm-request-timestamp"] ?? "";
  const expected = crypto
    .createHmac("sha1", process.env.XUMM_API_SECRET.replace(/-/g, ""))
    .update(timestamp + JSON.stringify(req.body))
    .digest("hex");
  if (req.headers["x-xumm-request-signature"] !== expected) {
    return res.sendStatus(401);
  }
  const body = req.body;
  console.log("Webhook received:", JSON.stringify(body, null, 2));
  res.sendStatus(200);
  if (body?.payloadResponse?.signed === true) {
    console.log(\`✅ Payment signed by \${body.payloadResponse.account}. TXID: \${body.payloadResponse.txid}\`);
  }
});

// Xahau ネットワークでトランザクションを調べる。検証済みの tesSUCCESS だけが
// 支払い完了を意味する。それまでは何も引き渡さない
async function verifyOnLedger(txid) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const { result } = await client.request({ command: "tx", transaction: txid });
    return {
      validated: result.validated === true,
      result: result.meta?.TransactionResult ?? null,
      delivered: result.meta?.delivered_amount ?? null,
    };
  } catch {
    return { validated: false, result: null, delivered: null }; // not on the ledger yet
  } finally {
    await client.disconnect();
  }
}

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
  console.log(\`Open in browser: http://localhost:\${PORT}\`);
});`,
            ko: `// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { Xumm } from "xumm";
import crypto from "node:crypto";
import { Client } from "xahau";

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
    res.status(500).json({ error: "로그인 payload를 생성할 수 없습니다" });
  }
});

app.get("/api/login/:uuid", async (req, res) => {
  try {
    const payload = await xumm.payload.get(req.params.uuid);
    if (!payload) return res.status(404).json({ error: "Payload를 찾을 수 없습니다" });
    const signed = payload.meta.signed;
    const account = payload.response?.account ?? null;
    if (signed) { res.json({ signed: true, account }); }
    else { res.json({ signed: false, expired: payload.meta.expired }); }
  } catch (err) { res.status(500).json({ error: "Payload 조회 오류" }); }
});

app.post("/api/payment", async (req, res) => {
  const { origin, destination, amountXAH } = req.body;
  if (!origin || !destination || !amountXAH) return res.status(400).json({ error: "필수 필드가 누락되었습니다" });
  if (!/^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(destination)) return res.status(400).json({ error: "유효하지 않은 수신 주소" });
  const amount = Number(amountXAH);
  if (isNaN(amount) || amount <= 0) return res.status(400).json({ error: "유효하지 않은 금액" });
  try {
    const payload = await xumm.payload.create({ txjson: { TransactionType: "Payment", NetworkID: 21338, Account: origin, Destination: destination, Amount: String(Math.floor(amount * 1_000_000)) } });
    res.json({ uuid: payload.uuid, qrUrl: payload.refs.qr_png, deepLink: payload.next.always });
  } catch (err) { res.status(500).json({ error: "결제를 생성할 수 없습니다" }); }
});

app.get("/api/payment/:uuid", async (req, res) => {
  try {
    const payload = await xumm.payload.get(req.params.uuid);
    if (!payload) return res.status(404).json({ error: "Payload를 찾을 수 없습니다" });
    const signed = payload.meta.signed;
    const txid = payload.response?.txid ?? null;
    // Xaman에서 서명된 것과 레저에 적용된 것은 다름: 레저에서 결과를 확인
    if (signed) { res.json({ signed: true, txid, ...(await verifyOnLedger(txid)) }); }
    else { res.json({ signed: false, expired: payload.meta.expired }); }
  } catch (err) { res.status(500).json({ error: "Payload 조회 오류" }); }
});

app.post("/webhook/xaman", (req, res) => {

  // Xaman이 서명한 요청만 신뢰: 서명은 timestamp + 본문의 HMAC-SHA1
  // (키는 하이픈을 뺀 API Secret)
  const timestamp = req.headers["x-xumm-request-timestamp"] ?? "";
  const expected = crypto
    .createHmac("sha1", process.env.XUMM_API_SECRET.replace(/-/g, ""))
    .update(timestamp + JSON.stringify(req.body))
    .digest("hex");
  if (req.headers["x-xumm-request-signature"] !== expected) {
    return res.sendStatus(401);
  }
  const body = req.body;
  console.log("Webhook 수신:", JSON.stringify(body, null, 2));
  res.sendStatus(200);
  if (body?.payloadResponse?.signed === true) {
    console.log(\`✅ \${body.payloadResponse.account}이 결제에 서명. TXID: \${body.payloadResponse.txid}\`);
  }
});

// Xahau 네트워크에서 트랜잭션을 조회. 검증된 tesSUCCESS만이
// 결제가 이루어졌다는 뜻이며, 그 전에는 아무것도 전달하지 않음
async function verifyOnLedger(txid) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  try {
    const { result } = await client.request({ command: "tx", transaction: txid });
    return {
      validated: result.validated === true,
      result: result.meta?.TransactionResult ?? null,
      delivered: result.meta?.delivered_amount ?? null,
    };
  } catch {
    return { validated: false, result: null, delivered: null }; // not on the ledger yet
  } finally {
    await client.disconnect();
  }
}

app.listen(PORT, () => {
  console.log(\`서버 실행 중: http://localhost:\${PORT}\`);
  console.log(\`브라우저에서 열기: http://localhost:\${PORT}\`);
});`,
          },
        },
        {
          title: {
            es: "public/index.html — Interfaz completa (pégala en xaman-backend/public/)",
            pt: "public/index.html — Interfaz completa (pégala em xaman-backend/public/)",
            en: "public/index.html — Full UI (paste into xaman-backend/public/)",
            jp: "public/index.html — 完全なUI（xaman-backend/public/に貼り付け）",
            zh: "public/index.html —— 完整界面（粘贴到 xaman-backend/public/）",
            ko: "public/index.html — 전체 UI (xaman-backend/public/에 붙여넣기)",
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
            pt: `<!DOCTYPE html>
<html lang="é">
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
    <p>Coméctate com Xaman para continuar.</p>
    <button id="btnLogin" onclick="handleLogin()">🔑 Conectar com Xaman</button>
    <div id="loginQR" class="card" style="display:none">
      <p>Escaneie com Xaman:</p>
      <img id="qrLoginImg" src="" alt="QR Login" width="220" />
      <a id="deeplinkLogin" href="#" target="_blank">Abrir em Xaman (celular)</a>
    </div>
    <p id="loginError" class="error-msg" style="display:none"></p>
  </div>
  <!-- ── PAGAMENTO ─────────────────────────────────────── -->
  <div id="paymentSection">
    <div class="card ok">
      <p style="color:#4caf50; margin:0 0 6px">✅ Conectado como:</p>
      <code id="accountDisplay"></code>
      <br /><br />
      <button class="danger" onclick="logout()">Desconectar</button>
    </div>
    <hr />
    <h2>Enviar XAH</h2>
    <input id="inputDestino" placeholder="Endereço destino (r...)" />
    <input id="inputCantidad" type="number" min="0.000001" step="0.000001"
           placeholder="Quantidade em XAH" />
    <p id="pagamentoError" class="error-msg" style="display:none"></p>
    <button id="btnPagamento" onclick="handlePagamento()">📤 Enviar pagamento</button>
    <div id="pagamentoQR" class="card" style="display:none">
      <p>Escaneie com Xaman para assinar:</p>
      <img id="qrPagamentoImg" src="" alt="QR Pagamento" width="220" />
      <a id="deeplinkPagamento" href="#" target="_blank">Abrir em Xaman (celular)</a>
    </div>
    <div id="txResult" class="card ok" style="display:none">
      <p style="color:#4caf50; margin:0 0 6px">✅ <strong>Pagamento confirmado!</strong></p>
      <p style="color:#ccc; font-size:0.85rem; margin:0 0 4px">Hash da transação:</p>
      <code id="txidDisplay"></code><br /><br />
      <a id="explorerLink" href="#" target="_blank">🔍 Ver em Xaman Explorer</a>
    </div>
  </div>
  <script>
    const API = "/api";   // mesma origin — não é necessária URL absoluta
    let account = null;
    let pollTimer = null;
    function setBtn(id, loading, label) {
      const b = document.getElementById(id);
      b.disabled = loading;
      if (label) b.textContent = loading ? "Esperando..." : label;
    }
    function showErr(id, msg) {
      const o = document.getElementById(id);
      o.style.display = msg ? "block" : "none";
      o.textContent = msg || "";
    }
    function startPoll(uuid, rota, onDone) {
      pollTimer = setInterval(async () => {
        try {
          const r = await fetch(API + "/" + rota + "/" + uuid);
          const data = await r.json();
          if (data.signed || data.expired) {
            clearInterval(pollTimer);
            onDone(data);
          }
        } catch (e) { /* rede temporariamente fora do ar — tente novamente */ }
      }, 2000);
    }
    async function handleLogin() {
      setBtn("btnLogin", true, "🔑 Conectar com Xaman");
      showErr("loginError", "");
      try {
        const r = await fetch(API + "/login", { method: "POST" });
        const { uuid, qrUrl, deepLink } = await r.json();
        document.getElementById("qrLoginImg").src = qrUrl;
        document.getElementById("deeplinkLogin").href = deepLink;
        document.getElementById("loginQR").style.display = "block";
        startPoll(uuid, "login", (data) => {
          document.getElementById("loginQR").style.display = "none";
          setBtn("btnLogin", false, "🔑 Conectar com Xaman");
          if (data.signed) {
            account = data.account;
            document.getElementById("accountDisplay").textContent = account;
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("paymentSection").style.display = "block";
          } else {
            showErr("loginError", "Login expirado ou rejeitado");
          }
        });
      } catch (err) {
        showErr("loginError", "Erro: " + err.message);
        setBtn("btnLogin", false, "🔑 Conectar com Xaman");
      }
    }
    async function handlePagamento() {
      const destino  = document.getElementById("inputDestino").value.trim();
      const quantidade = document.getElementById("inputCantidad").value;
      showErr("pagamentoError", "");
      document.getElementById("txResult").style.display = "none";
      setBtn("btnPagamento", true, "📤 Enviar pagamento");
      try {
        const r = await fetch(API + "/pagamento", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ origem: account, destino, cantidadXAH: Number(quantidade) }),
        });
        const data = await r.json();
        if (!r.ok) {
          showErr("pagamentoError", data.error || "Erro ao criar o pagamento");
          setBtn("btnPagamento", false, "📤 Enviar pagamento");
          return;
        }
        document.getElementById("qrPagamentoImg").src = data.qrUrl;
        document.getElementById("deeplinkPagamento").href = data.deepLink;
        document.getElementById("pagamentoQR").style.display = "block";
        startPoll(data.uuid, "pagamento", (res) => {
          document.getElementById("pagamentoQR").style.display = "none";
          setBtn("btnPagamento", false, "📤 Enviar pagamento");
          if (res.signed) {
            document.getElementById("txidDisplay").textContent = res.txid;
            document.getElementById("explorerLink").href =
              "https://xaman.app/explorer/21338/" + res.txid;
            document.getElementById("txResult").style.display = "block";
          } else {
            showErr("pagamentoError", "Pagamento rejeitado ou expirado");
          }
        });
      } catch (err) {
        showErr("pagamentoError", "Erro: " + err.message);
        setBtn("btnPagamento", false, "📤 Enviar pagamento");
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
            zh: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Xaman Backend Demo</title>
</head>
<body>
  <h1>💸 Xaman Backend Demo</h1>
  <p>这个页面通过后端创建登录与支付 payload。</p>

  <section>
    <button id="btnLogin">连接 Xaman</button>
    <div id="loginQR"></div>
  </section>

  <section>
    <input id="inputDestination" placeholder="收款地址" />
    <input id="inputAmount" placeholder="金额（XAH）" />
    <button id="btnPayment">发送 Payment</button>
    <div id="paymentQR"></div>
    <p id="result"></p>
  </section>

  <script>
    const API = "/api";

    async function waitForStatus(uuid, route) {
      return new Promise((resolve) => {
        const timer = setInterval(async () => {
          const res = await fetch(\`\${API}/\${route}/\${uuid}\`);
          const data = await res.json();
          if (data.signed || data.expired) {
            clearInterval(timer);
            resolve(data);
          }
        }, 2000);
      });
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
            ko: `<!DOCTYPE html>
<html lang="ko">
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

  <!-- ── 로그인 ─────────────────────────────────────── -->
  <div id="loginSection">
    <p>계속하려면 Xaman으로 연결하세요.</p>
    <button id="btnLogin" onclick="handleLogin()">🔑 Xaman으로 연결</button>
    <div id="loginQR" class="card" style="display:none">
      <p>Xaman으로 스캔:</p>
      <img id="qrLoginImg" src="" alt="QR Login" width="220" />
      <a id="deeplinkLogin" href="#" target="_blank">Xaman에서 열기 (모바일)</a>
    </div>
    <p id="loginError" class="error-msg" style="display:none"></p>
  </div>

  <!-- ── 결제 ──────────────────────────────────────── -->
  <div id="paymentSection">
    <div class="card ok">
      <p style="color:#4caf50; margin:0 0 6px">✅ 연결됨:</p>
      <code id="accountDisplay"></code>
      <br /><br />
      <button class="danger" onclick="logout()">연결 해제</button>
    </div>
    <hr />
    <h2>XAH 보내기</h2>
    <input id="inputDestination" placeholder="수신 주소 (r...)" />
    <input id="inputAmount" type="number" min="0.000001" step="0.000001"
           placeholder="XAH 금액" />
    <p id="paymentError" class="error-msg" style="display:none"></p>
    <button id="btnPayment" onclick="handlePayment()">📤 결제 보내기</button>

    <div id="paymentQR" class="card" style="display:none">
      <p>Xaman으로 스캔하여 서명:</p>
      <img id="qrPaymentImg" src="" alt="QR Payment" width="220" />
      <a id="deeplinkPayment" href="#" target="_blank">Xaman에서 열기 (모바일)</a>
    </div>

    <div id="txResult" class="card ok" style="display:none">
      <p style="color:#4caf50; margin:0 0 6px">✅ <strong>결제 확인됨!</strong></p>
      <p style="color:#ccc; font-size:0.85rem; margin:0 0 4px">트랜잭션 해시:</p>
      <code id="txidDisplay"></code><br /><br />
      <a id="explorerLink" href="#" target="_blank">🔍 Xaman Explorer에서 보기</a>
    </div>
  </div>

  <script>
    const API = "/api";   // 동일 오리진 — 절대 URL 불필요
    let account = null;
    let pollTimer = null;

    function setBtn(id, loading, label) {
      const b = document.getElementById(id);
      b.disabled = loading;
      if (label) b.textContent = loading ? "대기 중..." : label;
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
        } catch (e) { /* 네트워크 일시 중단 — 재시도 */ }
      }, 2000);
    }

    async function handleLogin() {
      setBtn("btnLogin", true, "🔑 Xaman으로 연결");
      showErr("loginError", "");
      try {
        const r = await fetch(API + "/login", { method: "POST" });
        const { uuid, qrUrl, deepLink } = await r.json();

        document.getElementById("qrLoginImg").src = qrUrl;
        document.getElementById("deeplinkLogin").href = deepLink;
        document.getElementById("loginQR").style.display = "block";

        startPoll(uuid, "login", (data) => {
          document.getElementById("loginQR").style.display = "none";
          setBtn("btnLogin", false, "🔑 Xaman으로 연결");
          if (data.signed) {
            account = data.account;
            document.getElementById("accountDisplay").textContent = account;
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("paymentSection").style.display = "block";
          } else {
            showErr("loginError", "로그인 만료 또는 거부됨");
          }
        });
      } catch (err) {
        showErr("loginError", "오류: " + err.message);
        setBtn("btnLogin", false, "🔑 Xaman으로 연결");
      }
    }

    async function handlePayment() {
      const destination = document.getElementById("inputDestination").value.trim();
      const amount      = document.getElementById("inputAmount").value;
      showErr("paymentError", "");
      document.getElementById("txResult").style.display = "none";
      setBtn("btnPayment", true, "📤 결제 보내기");

      try {
        const r = await fetch(API + "/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ origin: account, destination, amountXAH: Number(amount) }),
        });
        const data = await r.json();
        if (!r.ok) {
          showErr("paymentError", data.error || "결제 생성 오류");
          setBtn("btnPayment", false, "📤 결제 보내기");
          return;
        }

        document.getElementById("qrPaymentImg").src = data.qrUrl;
        document.getElementById("deeplinkPayment").href = data.deepLink;
        document.getElementById("paymentQR").style.display = "block";

        startPoll(data.uuid, "payment", (res) => {
          document.getElementById("paymentQR").style.display = "none";
          setBtn("btnPayment", false, "📤 결제 보내기");
          if (res.signed) {
            document.getElementById("txidDisplay").textContent = res.txid;
            document.getElementById("explorerLink").href =
              "https://xaman.app/explorer/21338/" + res.txid;
            document.getElementById("txResult").style.display = "block";
          } else {
            showErr("paymentError", "결제 거부 또는 만료됨");
          }
        });
      } catch (err) {
        showErr("paymentError", "오류: " + err.message);
        setBtn("btnPayment", false, "📤 결제 보내기");
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
            pt: "src/App.jsx — Frontend React que consome o backend",
            en: "src/App.jsx — React frontend consuming the backend",
            jp: "src/App.jsx — バックエンドを使用するReactフロントエンド（ステータスポーリング）",
            zh: "src/App.jsx —— 使用后端的 React 前端",
            ko: "src/App.jsx — 백엔드를 사용하는 React 프론트엔드 (상태 폴링)",
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
            pt: `// src/App.jsx — Frontend que usa o backend para criar payloads
import { useState } from "react";
const API = "http://localhost:3001/api";
// Espera com polling até que o payload esteja assinado ou expirado
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
        console.error("Erro polling:", err);
      }
    }, intervalMs);
  });
}
export default function App() {
  const [account, setAccount]   = useState(null);
  const [qrUrl, setQrUrl]       = useState(null);
  const [deepLink, setDeepLink] = useState(null);
  const [destino, setDestino]   = useState("");
  const [quantidade, setCantidad] = useState("");
  const [txid, setTxid]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  // ── Login com QR via backend ────────────────────────────────────────────────
  async function handleLogin() {
    setLoading(true);
    setError(null);
    const resp = await fetch(\`\${API}/login\`, { method: "POST" });
    const { uuid, qrUrl: url, deepLink: link } = await resp.json();
    setQrUrl(url);
    setDeepLink(link);
    // Polling: cada 2s pergunta ao backend se o usuário já firmou
    const resultado = await esperarFirma(uuid, "login");
    setQrUrl(null);
    setDeepLink(null);
    if (resultado.signed) {
      setAccount(resultado.account);
    } else {
      setError("Login expirado ou rejeitado");
    }
    setLoading(false);
  }
  // ── Enviar pagamento via backend ─────────────────────────────────────────────────
  async function handlePagamento(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTxid(null);
    const resp = await fetch(\`\${API}/pagamento\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origem: account,
        destino,
        cantidadXAH: Number(quantidade),
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
    // Polling até assinatura ou expiração
    const resultado = await esperarFirma(uuid, "pagamento");
    setQrUrl(null);
    setDeepLink(null);
    if (resultado.signed) {
      setTxid(resultado.txid);
    } else {
      setError("Pagamento rejeitado ou expirado");
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
            <a href={deepLink}>Abrir em Xaman</a>
          </>
        ) : (
          <button onClick={handleLogin} disabled={loading}>
            🔑 Conectar com Xaman
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
          <p>Escaneie em Xaman para assinar o pagamento:</p>
          <img src={qrUrl} alt="QR Pagamento" width={220} />
          <br /><a href={deepLink}>Abrir em Xaman (celular)</a>
        </div>
      )}
      {txid && (
        <p>✅ Pagamento enviado! TXID: <code>{txid}</code></p>
      )}
      {!qrUrl && !txid && (
        <form onSubmit={handlePagamento}>
          <h2>Enviar XAH</h2>
          <input
            placeholder="Endereço destino"
            value={destino}
            onChange={e => setDestino(e.target.value)}
            style={{ display: "block", width: 340, padding: 8, marginBottom: 8 }}
          />
          <input
            type="number" placeholder="Quantidade em XAH" min="0.000001"
            value={quantidade} onChange={e => setCantidad(e.target.value)}
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
            zh: `// src/App.jsx —— 通过后端创建 payload 的 React 前端
import { useState } from "react";

const API = "http://localhost:3001/api";

async function waitForSignature(uuid, route, intervalMs = 2000) {
  return new Promise((resolve) => {
    const timer = setInterval(async () => {
      const res = await fetch(\`\${API}/\${route}/\${uuid}\`);
      const data = await res.json();
      if (data.signed || data.expired) {
        clearInterval(timer);
        resolve(data);
      }
    }, intervalMs);
  });
}

export default function App() {
  const [account, setAccount] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);
  const [deepLink, setDeepLink] = useState(null);
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState(null);

  async function handleLogin() {
    const res = await fetch(\`\${API}/login\`, { method: "POST" });
    const data = await res.json();
    setQrUrl(data.qrUrl);
    setDeepLink(data.deepLink);
    const result = await waitForSignature(data.uuid, "login");
    setQrUrl(null);
    setDeepLink(null);
    if (result.signed) setAccount(result.account);
  }

  async function handlePayment(e) {
    e.preventDefault();
    const res = await fetch(\`\${API}/payment\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin: account, destination, amountXAH: Number(amount) }),
    });
    const data = await res.json();
    setQrUrl(data.qrUrl);
    setDeepLink(data.deepLink);
    const result = await waitForSignature(data.uuid, "payment");
    setQrUrl(null);
    setDeepLink(null);
    if (result.signed) setTxid(result.txid);
  }

  return (
    <div>
      <h1>💸 Xahau Payment (Backend)</h1>
      {!account ? <button onClick={handleLogin}>连接 Xaman</button> : <p>已连接：{account}</p>}
      {qrUrl ? <a href={deepLink}>在 Xaman 中打开</a> : null}
      {account && !txid ? (
        <form onSubmit={handlePayment}>
          <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="收款地址" />
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="金额（XAH）" />
          <button type="submit">发送</button>
        </form>
      ) : null}
      {txid ? <p>交易已发送：{txid}</p> : null}
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
            ko: `// src/App.jsx — 백엔드를 사용해 payload를 생성하는 프론트엔드
import { useState } from "react";

const API = "http://localhost:3001/api";

// 서명 완료 또는 만료될 때까지 폴링으로 대기
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
        console.error("폴링 오류:", err);
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

  // ── 백엔드를 통한 QR 로그인 ──────────────────────────────────────────────
  async function handleLogin() {
    setLoading(true);
    setError(null);

    const resp = await fetch(\`\${API}/login\`, { method: "POST" });
    const { uuid, qrUrl: url, deepLink: link } = await resp.json();

    setQrUrl(url);
    setDeepLink(link);

    // 폴링: 2초마다 백엔드에 사용자가 서명했는지 확인
    const result = await waitForSignature(uuid, "login");

    setQrUrl(null);
    setDeepLink(null);

    if (result.signed) {
      setAccount(result.account);
    } else {
      setError("로그인 만료 또는 거부됨");
    }
    setLoading(false);
  }

  // ── 백엔드를 통한 결제 보내기 ─────────────────────────────────────────────
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

    // 서명 또는 만료까지 폴링
    const result = await waitForSignature(uuid, "payment");
    setQrUrl(null);
    setDeepLink(null);

    if (result.signed) {
      setTxid(result.txid);
    } else {
      setError("결제 거부 또는 만료됨");
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
            <a href={deepLink}>Xaman에서 열기</a>
          </>
        ) : (
          <button onClick={handleLogin} disabled={loading}>
            🔑 Xaman으로 연결
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
        연결됨: <code>{account}</code>{" "}
        <button onClick={() => setAccount(null)}>로그아웃</button>
      </p>
      <hr />
      {qrUrl && (
        <div>
          <p>Xaman으로 스캔하여 결제에 서명하세요:</p>
          <img src={qrUrl} alt="QR Payment" width={220} />
          <br /><a href={deepLink}>Xaman에서 열기 (모바일)</a>
        </div>
      )}
      {txid && (
        <p>✅ 결제 완료! TXID: <code>{txid}</code></p>
      )}
      {!qrUrl && !txid && (
        <form onSubmit={handlePayment}>
          <h2>XAH 보내기</h2>
          <input
            placeholder="수신 주소"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            style={{ display: "block", width: 340, padding: 8, marginBottom: 8 }}
          />
          <input
            type="number" placeholder="XAH 금액" min="0.000001"
            value={amount} onChange={e => setAmount(e.target.value)}
            style={{ display: "block", width: 200, padding: 8, marginBottom: 8 }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "대기 중..." : "📤 보내기"}
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
            pt: "Frontend vs Backend: quando usar cada um",
            en: "Frontend vs Backend: when to use each",
            jp: "フロントエンド対バックエンド：使い分け",
            zh: "Frontend vs Backend：什么时候用哪一种",
            ko: "프론트엔드 vs 백엔드: 언제 무엇을 사용할지",
          },
          content: {
            es: "Frontend (solo API Key)\n• Apps simples, demos, prototipos\n• Sin lógica de negocio compleja\n• El SDK crea los payloads en el navegador\n\nBackend (API Key + Secret)\n• Aplicaciones de producción\n• Validación y auditoría del servidor\n• Webhooks para notificaciones\n• Integración con base de datos",
            pt: "Frontend (apenas API Key)\n• Apps simples, demos, protótipos\n• Sem lógica de negócio complexa\n• O SDK cria os payloads no navegador\n\nBackend (API Key + Secret)\n• Aplicações de produção\n• Validação e auditoria do servidor\n• Webhooks para notificações\n• Integração com banco de dados",
            en: "Frontend (API Key only)\n• Simple apps, demos, prototypes\n• No complex business logic\n• SDK creates payloads in browser\n\nBackend (API Key + Secret)\n• Production applications\n• Server-side validation and audit\n• Webhooks for notifications\n• Database integration",
            jp: "フロントエンド（APIキーのみ）\n• シンプルなアプリ、デモ、プロトタイプ\n• 複雑なビジネスロジックなし\n• SDKがブラウザでペイロードを作成\n\nバックエンド（APIキー＋シークレット）\n• 本番アプリケーション\n• サーバーサイドの検証と監査\n• 通知用Webhook\n• データベース連携",
            zh: "Frontend（仅 API Key）\n• 简单应用、演示、原型\n• 没有复杂业务逻辑\n• SDK 在浏览器中创建 payload\n\nBackend（API Key + Secret）\n• 生产环境应用\n• 服务器侧校验与审计\n• 用 Webhook 接收通知\n• 便于集成数据库",
            ko: "프론트엔드 (API Key만)\n• 간단한 앱, 데모, 프로토타입\n• 복잡한 비즈니스 로직 없음\n• SDK가 브라우저에서 payload 생성\n\n백엔드 (API Key + Secret)\n• 프로덕션 애플리케이션\n• 서버 측 검증 및 감사\n• 알림용 Webhook\n• 데이터베이스 연동",
          },
          visual: "⚖️",
        },
        {
          title: {
            es: "Arquitectura: frontend + backend + Xaman",
            pt: "Arquitectura: frontend + backend + Xaman",
            en: "Architecture: frontend + backend + Xaman",
            jp: "アーキテクチャ：フロントエンド＋バックエンド＋Xaman",
            zh: "架构：前端 + 后端 + Xaman",
            ko: "아키텍처: 프론트엔드 + 백엔드 + Xaman",
          },
          content: {
            es: "Flujo de datos completo:\n\n1. React → POST /api/pago → Express\n2. Express → crear payload → Xaman API\n3. Xaman API → uuid + QR → Express\n4. Express → qrUrl → React\n5. React muestra QR al usuario\n6. Usuario firma en Xaman app\n7. Xaman → webhook → Express\n8. Express guarda txid en BD",
            pt: "Fluxo de dados completo:\n\n1. React → POST /api/pagamento → Express\n2. Express → criar payload → Xaman API\n3. Xaman API → uuid + QR → Express\n4. Express → qrUrl → React\n5. React mostra QR ao usuário\n6. Usuário assina em Xaman app\n7. Xaman → webhook → Express\n8. Express salva txid em BD",
            en: "Complete data flow:\n\n1. React → POST /api/pago → Express\n2. Express → create payload → Xaman API\n3. Xaman API → uuid + QR → Express\n4. Express → qrUrl → React\n5. React shows QR to user\n6. User signs in Xaman app\n7. Xaman → webhook → Express\n8. Express saves txid to DB",
            jp: "完全なデータフロー：\n\n1. React → POST /api/pago → Express\n2. Express → ペイロード作成 → Xaman API\n3. Xaman API → uuid + QR → Express\n4. Express → qrUrl → React\n5. ReactがユーザーにQRを表示\n6. ユーザーがXamanアプリで署名\n7. Xaman → webhook → Express\n8. ExpressがtxidをDBに保存",
            zh: "完整的数据流：\n\n1. React → POST /api/payment → Express\n2. Express → 创建 payload → Xaman API\n3. Xaman API → uuid + QR → Express\n4. Express → qrUrl → React\n5. React 向用户显示二维码\n6. 用户在 Xaman 应用中签名\n7. Xaman → webhook → Express\n8. Express 将 txid 保存到数据库",
            ko: "완전한 데이터 흐름:\n\n1. React → POST /api/payment → Express\n2. Express → payload 생성 → Xaman API\n3. Xaman API → uuid + QR → Express\n4. Express → qrUrl → React\n5. React가 사용자에게 QR 표시\n6. 사용자가 Xaman 앱에서 서명\n7. Xaman → webhook → Express\n8. Express가 txid를 DB에 저장",
          },
          visual: "🏗️",
        },
        {
          title: {
            es: "Webhooks: recibir la firma en el servidor",
            pt: "Webhooks: receber a assinatura no servidor",
            en: "Webhooks: receive the signature on the server",
            jp: "Webhook：サーバーで署名を受信",
            zh: "Webhook：在服务器端接收签名",
            ko: "Webhook: 서버에서 서명 수신",
          },
          content: {
            es: "Configura tu webhook en apps.xaman.dev\n\nXaman llama a tu endpoint cuando:\n• El usuario firma el payload ✅\n• El usuario rechaza el payload ❌\n• El payload expira ⏰\n\nTu servidor debe responder 200 rápido\nProcesa la lógica de forma asíncrona\nUsa ngrok para probar en local",
            pt: "Configura seu webhook em apps.xaman.dev\n\nXaman chama seu endpoint quando:\n• O usuário assina o payload ✅\n• O usuário rejeita o payload ❌\n• O payload expira ⏰\n\nSeu servidor deve responder 200 rápido\nProcessa lógica de forma assincrona\nUsa ngrok para testar localmente",
            en: "Configure your webhook at apps.xaman.dev\n\nXaman calls your endpoint when:\n• User signs the payload ✅\n• User rejects the payload ❌\n• Payload expires ⏰\n\nYour server must respond 200 quickly\nProcess logic asynchronously\nUse ngrok to test locally",
            jp: "apps.xaman.devでWebhookを設定\n\nXamanがエンドポイントを呼び出す時：\n• ユーザーがペイロードに署名 ✅\n• ユーザーがペイロードを拒否 ❌\n• ペイロードが期限切れ ⏰\n\nサーバーは素早く200で応答する必要あり\nロジックは非同期で処理\nローカルテストにはngrokを使用",
            zh: "在 apps.xaman.dev 中配置你的 webhook\n\nXaman 会在以下情况调用你的端点：\n• 用户签署 payload ✅\n• 用户拒绝 payload ❌\n• payload 过期 ⏰\n\n服务器应尽快返回 200\n业务逻辑异步处理\n本地测试可使用 ngrok",
            ko: "apps.xaman.dev에서 webhook 설정\n\nXaman이 엔드포인트를 호출하는 경우:\n• 사용자가 payload에 서명 ✅\n• 사용자가 payload를 거부 ❌\n• Payload가 만료 ⏰\n\n서버는 빠르게 200으로 응답해야 함\n로직은 비동기로 처리\n로컬 테스트에는 ngrok 사용",
          },
          visual: "🔔",
        },
      ],
    },

  ],
};



const arabicModuleTranslations = {
  title: "تكامل Xaman (XUMM SDK)",
  lessons: {
    m11l1: {
      title: "Xaman SDK وبوابة المطورين",
      theory: `**Xaman** (المعروف سابقا باسم XUMM) ليس مجرد محفظة: إنه منصة لتوقيع المعاملات توفر **REST API وSDK** للمطورين. بواسطته يمكنك بناء تطبيقات ويب أو موبايل تطلب من المستخدمين توقيع معاملات Xahau من دون أن يحصل تطبيقك أبدا على مفاتيحهم الخاصة.

### ما هو XUMM SDK؟

حزمة npm باسم **xumm** هي الـ SDK الرسمي الذي يبسط التكامل مع Xaman API. يمكنك من خلاله:

- مصادقة المستخدمين عبر **SignIn** يوقعونه من الهاتف
- إنشاء **payloads**، أي طلبات توقيع، لأي نوع معاملة في Xahau
- عرض **QR code** يمسحه المستخدم بتطبيق Xaman
- استقبال الردود لحظيا، توقيع أو رفض، عبر WebSocket
- التحقق من أن المعاملة أدرجت في الـ ledger

### الحصول على بيانات API

قبل كتابة الكود، ادخل إلى **بوابة المطورين**:

1. افتح [apps.xaman.dev](https://apps.xaman.dev) وسجل الدخول بحساب Xaman
2. اضغط **"Create a new application"**
3. املأ اسم التطبيق والوصف والأيقونة
4. انسخ **API Key** العام و **API Secret** الخاص

> **مهم**: API Secret مثل كلمة مرور. **لا تضعه أبدا في كود frontend** يصل إلى المتصفح. استخدمه فقط على الخادم.

### لوحة تحكم المطورين

لوحة apps.xaman.dev تتيح لك إدارة:

- **تفاصيل التطبيق**: الاسم والوصف ورابط الأيقونة
- **Origin/redirect URLs**: قائمة الدومينات المسموح لها باستخدام API Key
- **Webhook URL**: endpoint الخادم الذي يستقبل إشعارات التوقيع من Xaman
- **Stats**: عدد الـ payloads التي أنشئت أو وقعت أو رفضت
- **Logs**: سجل نداءات API لتسهيل التصحيح

### قراءة الوثائق الرسمية

الوثائق الكاملة موجودة في **docs.xumm.dev**:

- **Concepts** → فهم payloads وتدفق التوقيع والحالات الممكنة
- **SDK Reference** → كل طرق SDK مع أمثلة
- **API Reference** → توثيق endpoints REST مباشرة
- **Examples** → مشاريع مثال على GitHub

### مفاهيم أساسية قبل البرمجة

| المفهوم | الوصف |
|---------|-------|
| **Payload** | طلب توقيع يحتوي المعاملة المطلوب توقيعها |
| **UUID** | معرف فريد لكل payload |
| **QR / Deep link** | طرق إيصال الـ payload إلى المستخدم |
| **SignIn** | معاملة خاصة للمصادقة، بلا رسوم |
| **Webhook** | إشعار HTTP يرسله Xaman عندما يوقع المستخدم |

### تدفق التكامل الأساسي

\`\`\`
تطبيقك                 Xaman API              Xaman (موبايل)
  │                         │                      │
  │── إنشاء payload ───────▶│                      │
  │◀── UUID + رابط QR ──────│                      │
  │                         │                      │
  │── عرض QR للمستخدم       │                      │
  │                         │◀── المستخدم يمسح ───│
  │                         │                      │
  │◀── WebSocket: تم التوقيع│◀── المستخدم يوقع ───│
  │                         │                      │
  │── التحقق على ledger     │                      │
\`\`\``,
      codeTitles: ["تثبيت SDK والإعداد الأساسي", "التهيئة: frontend مقابل backend"],
      slides: [
        ["ما هو XUMM SDK؟", "SDK لإنشاء طلبات توقيع في Xaman\n\n• يرسل payloads إلى Xaman API\n• يعيد QR وروابط فتح التطبيق\n• يتابع التوقيع أو الرفض\n• لا يطلب seed المستخدم أبدا"],
        ["بوابة المطورين", "apps.xaman.dev هي مكان إدارة التطبيقات\n\n• إنشاء API Key\n• ضبط Webhooks\n• متابعة إعدادات التطبيق\n• فصل بيئات الاختبار والإنتاج"],
        ["API Key مقابل API Secret", "API Key يعرّف التطبيق\n\nAPI Secret يثبت أن الطلب قادم من الخادم الموثوق\n\nلا تضع API Secret في React أو أي كود يصل إلى المتصفح"],
      ],
    },
    m11l2: {
      title: "Frontend: المصادقة باستخدام Xaman (QR Login)",
      theory: `أول تكامل ستبنيه هو **تسجيل الدخول عبر Xaman**: تدفق يمسح فيه المستخدم QR بتطبيق Xaman ويتم توثيقه في تطبيق الويب. هذا يشبه "Connect with MetaMask" ولكن في منظومة Xahau.

### كيف يعمل تسجيل الدخول عبر Xaman؟

1. ينشئ تطبيقك payload من نوع **SignIn**، وهي معاملة خاصة للمصادقة
2. يعيد Xaman رابطا يحتوي **QR code** وUUID
3. تعرض QR على الشاشة للمستخدم
4. **يمسح المستخدم QR** بتطبيق Xaman
5. يضغط المستخدم **"Sign"** على الهاتف، بلا رسوم لأنه مجرد توقيع
6. يستقبل تطبيقك عبر **WebSocket** التأكيد مع عنوان المستخدم
7. تحفظ الحساب، أي العنوان العام، كهوية للمستخدم

### مزايا هذا التدفق

- **لا توجد كلمة مرور**: المستخدم لا ينشئ شيئا ولا يحتاج تذكره
- **غير احتفاظي**: لا ترى المفاتيح الخاصة أبدا
- **قابل للتحقق**: التوقيع التشفيري يثبت أن المستخدم يتحكم في الحساب
- **مصمم للموبايل أولا**: محسن لتطبيق Xaman
- **Deep link**: على الهاتف يفتح Xaman تلقائيا من دون مسح QR

### إعداد المشروع: React + Vite

\`\`\`bash
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
npm run dev
\`\`\`

### الملفات التي ستنشئها أو تعدلها

Vite ينشئ المشروع لك. تحتاج لمس **ملف واحد فقط**:

| الملف | الإجراء |
|------|---------|
| \`src/App.jsx\` | **استبدل كل محتواه** بكود المثال |
| \`src/main.jsx\` | لا تلمسه، أنشأه Vite لتشغيل التطبيق |
| \`index.html\` | لا تلمسه، نقطة دخول HTML |
| \`src/App.css\` | يمكنك حذفه، المثال يستخدم inline styles |
| \`src/index.css\` | يمكنك حذفه أو تركه، لا يؤثر على المثال |

### خطوة إلزامية أولا: whitelist في apps.xaman.dev

قبل تشغيل الكود، سجل URL تطبيقك في بوابة مطوري Xaman:

1. اذهب إلى **apps.xaman.dev** → تطبيقك → **Origin/Redirect URLs**
2. أضف localhost والمنفذ الخاص بمشروع الويب، مثل: \`http://localhost:5173\`
3. احفظ التغييرات

من دون هذه الخطوة ستحصل على **"access_denied / Invalid client/redirect URL"**.

### كيف تعمل نافذة QR في المتصفح؟

يمكن للـ SDK إنشاء payloads مباشرة من المتصفح باستخدام **\`payload.createAndSubscribe()\`**. لكي يعمل ذلك، يجب أن يكون URL تطبيقك في **whitelist** داخل apps.xaman.dev، لأن المتصفح يرسل Origin header تلقائيا وXaman يطابقه مع تلك القائمة.

بعد السماح للـ origin، تقوم الطريقة بـ:

1. إرسال طلب إلى Xaman API باستخدام API Key
2. إرجاع \`created.refs.qr_png\`، وهو رابط صورة QR التي تعرضها في النافذة
3. فتح **WebSocket** وانتظار رد المستخدم
4. عند توقيع المستخدم، يتم حل \`resolved\` بالنتيجة

> **لماذا كان يتوقف سابقا؟** لأن origin \`http://localhost:5173\` لم يكن في whitelist. كان CORS preflight يرفض بصمت، فلا تنتهي الـ promise. بعد إضافته من أجل \`authorize()\`، تصبح نداءات \`payload.createAndSubscribe()\` مفعلة أيضا.

\`\`\`javascript
const { created, resolved } = await xumm.payload.createAndSubscribe(
  { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
  (event) => {
    if (typeof event.data.signed !== "undefined") return event.data;
  }
);
const qrUrl   = created.refs.qr_png;  // صورة QR لعرضها في النافذة
const deepLink = created.next.always; // رابط عميق للموبايل
const result   = await resolved;      // انتظار التوقيع أو الرفض
\`\`\``,
      codeTitles: ["تثبيت SDK وإعداد مشروع أساسي", "App.jsx - تسجيل دخول QR modal"],
      slides: [
        ["تدفق تسجيل الدخول مع Xaman", "1. التطبيق ينشئ SignIn payload\n2. المستخدم يمسح QR أو يفتح الرابط\n3. Xaman يعرض الطلب\n4. المستخدم يوقع\n5. التطبيق يستلم الحساب الموقع"],
        ["Desktop مقابل Mobile", "Desktop: QR هو المسار الطبيعي\n\nMobile: deep link يفتح Xaman مباشرة\n\nفي الحالتين payload هو نفس الفكرة، والاختلاف في طريقة عرض الرابط للمستخدم"],
        ["أحداث SDK", "createAndSubscribe يستمع للأحداث\n\n• signed: true عند التوقيع\n• signed: false عند الرفض\n• uuid لتتبع payload\n\nاستخدم النتيجة لتحديث واجهة المستخدم"],
      ],
    },
    m11l3: {
      title: "Frontend: بناء وتوقيع Payment مع Xaman",
      theory: `بعد مصادقة المستخدم عبر Xaman، يمكنك أن تطلب منه توقيع أي معاملة Xahau. في هذا الدرس ستبني نموذج دفع يدخل فيه المستخدم **المبلغ** و**عنوان الوجهة**، ثم ينشأ payload، ويمسح المستخدم QR مرة أخرى لتوقيع Payment.

### كيف يعمل تدفق الدفع؟

1. المستخدم مسجل الدخول بالفعل والحساب متصل
2. تعرض نموذجا: عنوان الوجهة + المبلغ بـ XAH
3. عند الضغط على "Send"، تنشئ payload يحتوي معاملة \`Payment\`
4. يعيد Xaman QR جديدا مختلفا عن QR تسجيل الدخول
5. **يمسح المستخدم هذا QR الثاني** باستخدام Xaman
6. في تطبيق Xaman يرى التفاصيل: المصدر، الوجهة، المبلغ
7. **يوافق المستخدم ويوقع**، وهذه المرة توجد رسوم شبكة
8. يستقبل تطبيقك النتيجة مع \`txid\` الخاص بالمعاملة

### بنية Payment في Xahau

\`\`\`javascript
{
  TransactionType: "Payment",
  NetworkID: 21338,              // Xahau Testnet — لتجنب التوقيع على شبكة أخرى
  Account: "logged_account",      // حساب المستخدم المسجل
  Destination: "destination_address",
  Amount: "1000000",             // بالدروبس (1 XAH = 1,000,000 drops)
}
\`\`\`

المبلغ يكتب دائما بـ **drops**، وهي أصغر وحدة في XAH. للتحويل: \`drops = XAH * 1_000_000\`.

### إنشاء payload بالـ SDK

\`\`\`javascript
const { created, resolved } = await xumm.payload.createAndSubscribe(
  { txjson: transaction },
  (event) => {
    // هذا callback يستدعى عند كل تحديث
    if ("signed" in event.data) {
      return event.data;  // يحل الـ promise بالنتيجة
    }
  }
);
\`\`\`

- \`created\` يحتوي \`created.refs.qr_png\`، رابط QR، و\`created.next.always\`، deep link
- \`resolved\` هو Promise ينتهي عندما يوقع المستخدم أو يرفض
- إذا كان \`resolved.signed === true\` فهذا توقيع ناجح، و\`resolved.txid\` هو hash

### التحقق قبل الإرسال

تحقق دائما في العميل قبل إنشاء payload:
- عنوان الوجهة صالح، يبدأ بـ \`r\` وطوله تقريبا 25 إلى 34 حرفا
- المبلغ رقم موجب
- الوجهة ليست نفس حساب المصدر

### فحص حالة المعاملة من Xaman

بعد التوقيع لا تحتاج الاتصال بالـ ledger: يمكنك طلب payload عبر **\`xumm.payload.get(uuid)\`**. الاستجابة تتضمن \`response.dispatched_result\`، وفيه كود نتيجة الـ ledger:

- \`"tesSUCCESS"\` → المعاملة تأكدت بنجاح
- أي قيمة أخرى، مثل \`"tecINSUF_RESERVE_LINE"\`، تعني خطأ في الـ ledger

\`\`\`javascript
const payloadResult = await xumm.payload.get(created.uuid);
const status = payloadResult.response.dispatched_result; // "tesSUCCESS" أو كود خطأ
const txid   = result.txid;                              // hash المعاملة
\`\`\``,
      codeTitles: ["تثبيت SDK وإعداد مشروع أساسي", "App.jsx - QR login + QR payment"],
      slides: [
        ["تدفق Payment مع Xaman", "1. المستخدم يربط حسابه\n2. التطبيق يبني txjson\n3. Xaman يعرض تفاصيل الدفع\n4. المستخدم يوقع أو يرفض\n5. التطبيق يقرأ txid إذا تم الإرسال"],
        ["Drops: وحدة XAH", "داخل Transaction JSON لا تكتب 1 XAH كنص عادي\n\nاستخدم drops:\n• 1 XAH = 1,000,000 drops\n• التحويل يقلل أخطاء الدقة\n• الواجهة يمكن أن تعرض XAH للمستخدم"],
        ["createAndSubscribe: الطريقة الأساسية", "تنشئ payload وتتابع نتيجته\n\n• ترجع QR/link\n• تنتظر التوقيع\n• تبسط إدارة الحالة\n• مناسبة لتجارب frontend مباشرة"],
      ],
    },
    m11l4: {
      title: "Backend: خادم Node.js مع Express وXaman",
      theory: `في الدرس السابق أنشأت الواجهة الأمامية الـ payloads مباشرة من المتصفح، باستخدام API Key وحده. أما **الخادم الخلفي (backend)** فيضيف ما لا يمكن ائتمان المتصفح عليه: ينشئ الخادم الـ payloads بـ API Key و **API Secret**، ويطبّق قواعد العمل، ويتأكد من الدفعة على الـ ledger قبل تسليم أي شيء. الواجهة الأمامية تعرض رمز QR فقط.

### لماذا خادم خلفي

| | واجهة أمامية فقط | مع خادم خلفي |
|---|---|---|
| API Secret | لا يمكن استخدامه: كل ما في المتصفح علني | يبقى على الخادم |
| قواعد العمل (المبالغ، الوجهات) | تعمل في كود يستطيع المستخدم تغييره | يفرضها الخادم |
| معرفة أن الدفعة تمت | الثقة بما يقوله المتصفح | يتحقق الخادم من المعاملة على شبكة Xahau |
| الإشعارات | فقط أثناء فتح الصفحة | تصل الـ webhooks إلى الخادم حتى لو لم يكن أحد يراقب |

### كيف تتواصل الأجزاء

\`\`\`
Frontend                  Backend (Express)            Xaman API        Xahau Network
   │                           │                          │                  │
   │── POST /api/payment ─────▶│── إنشاء payload ─────────────▶│                  │
   │◀── { qrUrl, uuid } ───────│◀── uuid + QR ────────────│                  │
   │   (عرض QR)                │                          │                  │
   │── GET /api/payment/uuid ─▶│── قراءة payload ──────────────▶│                  │
   │                           │── tx (txid) ────────────────────────────────▶│
   │◀── { signed, validated,  ─│◀── مُتحقَّق؟ النتيجة؟ ──────────────────────────────────│
   │      result, delivered }  │                          │                  │
\`\`\`

1. تطلب الواجهة الأمامية دفعة من الخادم. يتحقق الخادم من الحقول وينشئ payload في Xaman.
2. يمسح المستخدم رمز QR ويوقّع في Xaman.
3. تستعلم الواجهة الأمامية دوريًا عن \`GET /api/payment/:uuid\`. بعد توقيع الـ payload يبحث الخادم عن \`txid\` على شبكة Xahau ويعيد ما وجده.

### إشعارات التوقيع: الاستطلاع (polling) أم webhook

| | الاستطلاع (\`GET /api/payment/:uuid\`) | Webhook (\`POST /webhook/xaman\`) |
|---|---|---|
| من يسأل | واجهتك الأمامية كل بضع ثوانٍ | تستدعي Xaman خادمك عندما يتصرف المستخدم |
| يعمل على localhost | نعم | فقط مع عنوان URL علني (نفق أثناء التطوير) |
| الأنسب لـ | التطوير، والصفحات التي يبقيها المستخدم مفتوحة | الإنتاج: الطلبات والإيصالات وكل ما لا يجوز أن يضيع |

يدعم الخادم في تبويب الكود الطريقتين. لاستخدام الـ webhook، ضع عنوانه في **apps.xaman.dev** ← تطبيقك ← Webhook: \`https://your-server.com/webhook/xaman\`.

### شغّله

1. أنشئ تطبيقًا في **apps.xaman.dev** وانسخ API Key و API Secret إلى \`.env\`:

\`\`\`bash
# .env (لا ترفع هذا الملف إلى git أبدًا)
XUMM_API_KEY=your-api-key
XUMM_API_SECRET=your-api-secret
PORT=3001
\`\`\`

2. شغّل أوامر التثبيت في تبويب الكود. تنشئ المجلدات، وتثبّت \`express\` و \`xumm\` و \`xahau\` و \`dotenv\` و \`cors\`، وتضيف \`.env\` إلى \`.gitignore\`.
3. أنشئ \`package.json\` و \`server.js\` و \`public/index.html\` من تبويب الكود. يصبح المشروع هكذا:

\`\`\`
xaman-backend/
├── .env              ← API Key و Secret (لا تُرفع إلى git)
├── .gitignore        ← يتضمن .env
├── package.json
├── server.js         ← المسارات والـ webhook والتحقق على الـ ledger
└── public/
    └── index.html    ← الواجهة، يقدّمها Express
\`\`\`

4. شغّل الخادم بـ \`npm run dev\` وافتح \`http://localhost:3001\`. سجّل الدخول بـ Xaman ثم أرسل دفعة.

آخر كتلة في تبويب الكود، \`src/App.jsx\`، واجهة أمامية بديلة بـ React تستدعي المسارات نفسها.

### معنى حالة الدفعة

عندما يُوقَّع الـ payload، يجيب \`GET /api/payment/:uuid\` بـ:

\`\`\`json
{ "signed": true, "txid": "…", "validated": true, "result": "tesSUCCESS", "delivered": "1000000" }
\`\`\`

- **\`signed\`**: وافق المستخدم على الـ payload في Xaman. وهذا وحده لا يثبت شيئًا عن الـ ledger.
- **\`txid\`**: هاش المعاملة التي أرسلتها Xaman.
- **\`validated\`**: المعاملة في ledger مُتحقَّق منه. وإلى أن يحدث ذلك تكون \`result\` قيمة \`null\`: استعلم مجددًا.
- **\`result\`**: رمز نتيجة المعاملة. وحدها \`tesSUCCESS\` تعني أن الدفعة طُبّقت.
- **\`delivered\`**: ما وصل فعلًا إلى الوجهة (بالـ drops في XAH). قارنه بما تتوقعه قبل تسليم أي شيء.

### حالات يجب الانتباه لها

- **التوقيع ليس دفعًا.** قد يفشل payload موقّع على الـ ledger (مثل \`tecUNFUNDED_PAYMENT\`) أو لا يكون قد تُحقّق منه بعد. لا تسلّم إلا مع \`validated: true\` و \`result: "tesSUCCESS"\` ومبلغ \`delivered\` الصحيح.
- **يستطيع أي أحد استدعاء الـ webhook.** عنوانه علني. توقّع Xaman كل webhook بـ HMAC-SHA1 لترويسة \`x-xumm-request-timestamp\` مع جسم الطلب، ومفتاحه API Secret بدون الشرطات، وترسله في \`x-xumm-request-signature\`. يعيد الخادم حسابه ويرد بـ \`401\` إن لم يتطابق، قبل قراءة الجسم ([توثيق Xaman](https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates/webhooks/signature-verification)).
- **تنتهي صلاحية الـ payloads.** إن لم يوقّع المستخدم في الوقت المحدد تعيد الحالة \`signed: false\` مع \`expired: true\`. أنشئ payload جديدًا بدل الانتظار.
- **يختلف testnet عن mainnet في موضعين.** تستخدم الـ payloads القيمة \`NetworkID: 21338\` (لـ testnet؛ و mainnet هي \`21337\`)، ويتصل \`verifyOnLedger\` بـ \`wss://xahau-test.net\`. غيّر الاثنين معًا.
- **تسرّب API Secret.** بدّل بيانات الاعتماد في apps.xaman.dev: أنشئ API Key و Secret جديدين، وحدّث \`.env\` على الخادم، واحذف الزوج القديم.`,
      codeTitles: ["أوامر التثبيت", "package.json - انسخ هذا الملف كاملا", ".env - بيانات الاعتماد (لا ترفعها إلى Git)", "server.js - خادم Express كامل مع Xaman", "public/index.html - واجهة كاملة", "src/App.jsx - واجهة React تستهلك backend"],
      slides: [
        ["Frontend vs Backend: متى تستخدم كل واحد؟", "Frontend فقط (API Key)\n• تطبيقات بسيطة وعروض وتجارب\n• بدون منطق أعمال حساس\n• SDK ينشئ payloads من المتصفح\n\nBackend (API Key + Secret)\n• تطبيقات إنتاج\n• تحقق وتدقيق من الخادم\n• Webhooks للإشعارات\n• تكامل مع قاعدة بيانات"],
        ["المعمارية: frontend + backend + Xaman", "تدفق البيانات الكامل:\n\n1. React يرسل POST إلى Express\n2. Express ينشئ payload عبر Xaman API\n3. Xaman يعيد uuid وQR\n4. Express يعيد الرابط إلى React\n5. المستخدم يوقع في Xaman\n6. Xaman يستدعي webhook\n7. الخادم يحفظ النتيجة"],
        ["Webhooks: استقبال التوقيع على الخادم", "اضبط webhook في apps.xaman.dev\n\nXaman يستدعي endpoint عندما:\n• المستخدم يوقع payload\n• المستخدم يرفض payload\n• payload تنتهي صلاحيته\n\nيجب أن يرد الخادم 200 بسرعة ثم يعالج المنطق بشكل غير متزامن"],
      ],
    },
  },
};

function applyArabicTranslations(data) {
  data.title.ar = arabicModuleTranslations.title;

  for (const lesson of data.lessons) {
    const translation = arabicModuleTranslations.lessons[lesson.id];
    if (!translation) continue;

    lesson.title.ar = translation.title;
    lesson.theory.ar = translation.theory;

    lesson.codeBlocks?.forEach((block, index) => {
      block.title.ar = translation.codeTitles[index] ?? block.title.en ?? block.title.es;
      if (typeof block.code === "string") {
        block.code = { en: block.code };
      }
    });

    lesson.slides?.forEach((slide, index) => {
      const slideTranslation = translation.slides[index];
      if (!slideTranslation) return;
      slide.title.ar = slideTranslation[0];
      slide.content.ar = slideTranslation[1];
    });
  }
}

applyArabicTranslations(moduleData);

const frenchModuleTranslations = {
  title: "Intégration Xaman (XUMM SDK)",
  lessons: {
    m11l1: {
      title: "Le SDK Xaman et le portail développeur",
      theory: `**Xaman** (anciennement XUMM) n'est pas seulement un wallet : c'est une plateforme de signature de transactions qui expose une **API REST et un SDK** pour les développeurs. Avec Xaman, tu peux construire des applications web ou mobiles qui demandent aux utilisateurs de signer des transactions Xahau sans jamais accéder à leurs clés privées.

### Qu'est-ce que le SDK XUMM ?

Le paquet npm **xumm** est le SDK officiel qui simplifie l'intégration avec l'API Xaman. Il permet de :

- Authentifier les utilisateurs avec un **SignIn** qu'ils signent sur leur téléphone
- Créer des **payloads** (demandes de signature) pour n'importe quel type de transaction Xahau
- Afficher un **QR code** que l'utilisateur scanne avec l'app Xaman
- Recevoir des réponses en temps réel (signé ou refusé) via WebSocket
- Vérifier que la transaction a bien été incluse dans le ledger

### Obtenir tes identifiants API

Avant d'écrire du code, va dans le **portail développeur** :

1. Ouvre [apps.xaman.dev](https://apps.xaman.dev) et connecte-toi avec ton compte Xaman
2. Clique sur **"Create a new application"**
3. Renseigne le nom, la description et l'icône de ton application
4. Copie ton **API Key** (publique) et ton **API Secret** (privé)

> **Important** : l'API Secret est comme un mot de passe. **Ne l'inclus jamais dans du code frontend** livré aux navigateurs. Utilise-le uniquement sur ton serveur.

### Tableau de bord développeur

Le dashboard apps.xaman.dev permet de gérer :

- **Détails de l'app** : nom, description, URL de l'icône
- **Origin/redirect URLs** : liste blanche des domaines autorisés à utiliser ton API Key
- **Webhook URL** : endpoint serveur où Xaman envoie les notifications de signature
- **Stats** : nombre de payloads créés, signés et refusés
- **Logs** : historique des appels API pour le débogage

### Lire la documentation officielle

La documentation complète se trouve sur **docs.xumm.dev** :

- **Concepts** → comprendre les payloads, le flux de signature et les états possibles
- **SDK Reference** → toutes les méthodes du SDK avec exemples
- **API Reference** → documentation directe des endpoints REST
- **Examples** → projets d'exemple sur GitHub

### Concepts clés avant de coder

| Concept | Description |
|---------|-------------|
| **Payload** | Une demande de signature contenant la transaction à signer |
| **UUID** | Identifiant unique de chaque payload |
| **QR / Deep link** | Moyens de transmettre le payload à l'utilisateur |
| **SignIn** | Transaction spéciale d'authentification, sans frais |
| **Webhook** | Notification HTTP envoyée par Xaman quand l'utilisateur signe |

### Flux d'intégration de base

\`\`\`
Ton app                 Xaman API              Xaman (mobile)
  │                         │                      │
  │── Créer payload ───────▶│                      │
  │◀── UUID + URL QR ───────│                      │
  │                         │                      │
  │── Afficher QR           │                      │
  │                         │◀── Scan utilisateur ─│
  │                         │                      │
  │◀── WebSocket: signé ────│◀── Signature ────────│
  │                         │                      │
  │── Vérifier sur ledger   │                      │
\`\`\``,
      codeTitles: ["Installation du SDK et configuration de base", "Initialisation : frontend vs backend"],
      slides: [["Qu'est-ce que le SDK XUMM ?", "SDK pour créer des payloads Xaman\n\n• QR et liens de signature\n• Suivi du statut\n• SignIn ou transaction\n• Aucun seed utilisateur dans ton app"], ["Portail développeur", "apps.xaman.dev permet de créer les clés, configurer webhooks et gérer l'application."], ["API Key vs API Secret", "API Key identifie l'app\nAPI Secret authentifie le backend\n\nNe mets jamais l'API Secret dans le navigateur."]],
    },
    m11l2: {
      title: "Frontend : authentification avec Xaman (QR Login)",
      theory: `La première intégration que tu vas construire est le **login Xaman** : un flux où l'utilisateur scanne un QR avec l'application Xaman et s'authentifie dans ton application web. C'est l'équivalent de "Connect with MetaMask", mais pour l'écosystème Xahau.

### Comment fonctionne le login Xaman ?

1. Ton application crée un payload **SignIn** (transaction spéciale d'authentification)
2. Xaman renvoie une URL avec un **QR code** et un UUID
3. Tu affiches le QR à l'écran
4. L'utilisateur **scanne le QR** avec son application Xaman
5. L'utilisateur touche **"Sign"** sur son téléphone (aucun frais : c'est seulement une signature)
6. Ton application reçoit via **WebSocket** la confirmation avec l'adresse de l'utilisateur
7. Tu enregistres le compte (adresse publique) comme identité de l'utilisateur

### Avantages de ce flux

- **Pas de mot de passe** : l'utilisateur n'a rien à créer ni retenir
- **Non-custodial** : tu ne vois jamais les clés privées
- **Vérifiable** : la signature cryptographique prouve que l'utilisateur contrôle le compte
- **Mobile-first** : optimisé pour l'application Xaman
- **Deep link** : sur mobile, ouvre Xaman automatiquement sans scanner

### Configuration du projet : React + Vite

\`\`\`bash
npm create vite@latest xaman-login -- --template react
cd xaman-login
npm install xumm xahau
npm run dev
\`\`\`

### Fichiers à créer ou modifier

Vite génère le projet pour toi. Tu n'as besoin de toucher qu'**un seul fichier** :

| Fichier | Action |
|------|--------|
| \`src/App.jsx\` | **Remplacer tout son contenu** par le code d'exemple |
| \`src/main.jsx\` | Ne pas toucher : généré par Vite, démarre l'app |
| \`index.html\` | Ne pas toucher : point d'entrée HTML |
| \`src/App.css\` | Tu peux le supprimer : l'exemple utilise des styles inline |
| \`src/index.css\` | Tu peux le supprimer ou le laisser : il n'affecte pas l'exemple |

### Étape obligatoire d'abord : whitelist dans apps.xaman.dev

Avant d'exécuter le code, enregistre ton URL dans le portail développeur Xaman :

1. Va dans **apps.xaman.dev** → ton app → **Origin/Redirect URLs**
2. Ajoute l'URL localhost et le port de ton projet web, par exemple : \`http://localhost:5173\`
3. Enregistre les changements

Sans cette étape, tu obtiendras **"access_denied / Invalid client/redirect URL"**.

### Comment fonctionne la modale QR dans le navigateur

Le SDK peut créer des payloads directement depuis le navigateur avec **\`payload.createAndSubscribe()\`**. Pour que cela fonctionne, l'URL de ton app doit être dans la **whitelist** de apps.xaman.dev : le navigateur envoie automatiquement l'en-tête Origin et Xaman le valide avec cette liste.

Une fois l'origine autorisée, la méthode :

1. Envoie une requête à l'API Xaman avec l'API Key
2. Renvoie \`created.refs.qr_png\`, l'URL de l'image QR que tu affiches dans ta modale
3. Ouvre un **WebSocket** et attend la réponse de l'utilisateur
4. Quand l'utilisateur signe, \`resolved\` se résout avec le résultat

> **Pourquoi ça bloquait avant ?** L'origine \`http://localhost:5173\` n'était pas dans la whitelist. Le preflight CORS était rejeté silencieusement et la promesse ne se résolvait jamais. Maintenant que tu l'as ajoutée pour \`authorize()\`, cela active aussi les appels \`payload.createAndSubscribe()\`.

\`\`\`javascript
const { created, resolved } = await xumm.payload.createAndSubscribe(
  { txjson: { TransactionType: "SignIn", NetworkID: 21338 } },
  (event) => {
    if (typeof event.data.signed !== "undefined") return event.data;
  }
);
const qrUrl   = created.refs.qr_png;  // image QR à afficher dans la modale
const deepLink = created.next.always; // deep link pour mobile
const result   = await resolved;      // attendre signature ou refus
\`\`\``,
      codeTitles: ["Installation du SDK et configuration de projet", "App.jsx - login par QR modal"],
      slides: [["Flux de login Xaman", "Créer SignIn → afficher QR/lien → utilisateur signe → récupérer l'adresse signataire."], ["Desktop vs Mobile", "Desktop : QR\nMobile : lien direct vers Xaman\n\nLe payload reste le même."], ["Événements SDK", "createAndSubscribe suit signed true/false et permet de mettre à jour l'interface."]],
    },
    m11l3: {
      title: "Frontend : construire et signer un Payment avec Xaman",
      theory: `Une fois l'utilisateur authentifié avec Xaman, tu peux lui demander de signer n'importe quelle transaction Xahau. Dans cette leçon, tu vas construire un formulaire de paiement où l'utilisateur saisit le **montant** et l'**adresse de destination** ; un payload est créé, puis l'utilisateur scanne à nouveau un QR pour signer le Payment.

### Comment fonctionne le flux de paiement ?

1. L'utilisateur est déjà connecté (compte lié)
2. Tu affiches un formulaire : adresse de destination + montant en XAH
3. Au clic sur "Send", tu crées un payload avec la transaction \`Payment\`
4. Xaman renvoie un nouveau QR, différent de celui du login
5. L'utilisateur **scanne ce second QR** avec Xaman
6. Dans l'application Xaman, il voit les détails : origine, destination, montant
7. L'utilisateur **approuve et signe** (cette fois il y a des frais réseau)
8. Ton application reçoit le résultat avec le \`txid\` de la transaction

### Structure d'un Payment dans Xahau

\`\`\`javascript
{
  TransactionType: "Payment",
  NetworkID: 21338,              // Xahau Testnet — évite de signer sur un autre réseau
  Account: "logged_account",      // compte connecté de l'utilisateur
  Destination: "destination_address",
  Amount: "1000000",             // en drops (1 XAH = 1 000 000 drops)
}
\`\`\`

Le montant est toujours exprimé en **drops**, la plus petite unité de XAH. Conversion : \`drops = XAH * 1_000_000\`.

### Créer le payload avec le SDK

\`\`\`javascript
const { created, resolved } = await xumm.payload.createAndSubscribe(
  { txjson: transaction },
  (event) => {
    // Ce callback est appelé à chaque mise à jour
    if ("signed" in event.data) {
      return event.data;  // résout la promesse avec le résultat
    }
  }
);
\`\`\`

- \`created\` contient \`created.refs.qr_png\` (URL du QR) et \`created.next.always\` (deep link)
- \`resolved\` est une Promise qui se résout quand l'utilisateur signe ou refuse
- Si \`resolved.signed === true\` → signature réussie, \`resolved.txid\` est le hash

### Validation avant l'envoi

Valide toujours côté client avant de créer le payload :
- L'adresse de destination est valide (commence par \`r\`, environ 25 à 34 caractères)
- Le montant est un nombre positif
- La destination n'est pas le même compte que l'origine

### Vérifier le statut de transaction depuis Xaman

Après la signature, tu n'as pas besoin de te connecter au ledger : tu peux interroger le payload avec **\`xumm.payload.get(uuid)\`**. La réponse inclut \`response.dispatched_result\`, qui contient le code de résultat du ledger :

- \`"tesSUCCESS"\` → transaction confirmée avec succès
- Toute autre valeur, par exemple \`"tecINSUF_RESERVE_LINE"\`, indique une erreur ledger

\`\`\`javascript
const payloadResult = await xumm.payload.get(created.uuid);
const status = payloadResult.response.dispatched_result; // "tesSUCCESS" ou code d'erreur
const txid   = result.txid;                              // hash de transaction
\`\`\``,
      codeTitles: ["Installation du SDK et configuration de projet", "App.jsx - QR login + QR payment"],
      slides: [["Flux Payment avec Xaman", "Compte connecté → construire txjson → afficher demande Xaman → utilisateur signe → lire txid."], ["Drops : unité de XAH", "1 XAH = 1 000 000 drops\n\nLe Transaction JSON utilise drops pour les paiements natifs."], ["createAndSubscribe : méthode clé", "Crée le payload, retourne QR/lien et attend le résultat de signature."]],
    },
    m11l4: {
      title: "Backend : serveur Node.js avec Express et Xaman",
      theory: `Dans la leçon précédente, le frontend créait les payloads directement depuis le navigateur, avec la seule API Key. Un **backend** ajoute ce qu'on ne peut pas confier à un navigateur : le serveur crée les payloads avec l'API Key et l'**API Secret**, applique tes règles métier et confirme le paiement dans le ledger avant de livrer quoi que ce soit. Le frontend ne fait qu'afficher le QR.

### Pourquoi un backend

| | Frontend seul | Avec un backend |
|---|---|---|
| API Secret | Inutilisable : tout ce qui est dans le navigateur est public | Reste sur le serveur |
| Règles métier (montants, destinations) | S'exécutent dans du code que l'utilisateur peut modifier | Appliquées sur le serveur |
| Savoir que le paiement a eu lieu | On croit ce que dit le navigateur | Le serveur vérifie la transaction sur le réseau Xahau |
| Notifications | Seulement tant que la page est ouverte | Les webhooks atteignent le serveur même sans personne devant l'écran |

### Comment les éléments communiquent

\`\`\`
Frontend                  Backend (Express)            Xaman API        Xahau Network
   │                           │                          │                  │
   │── POST /api/payment ─────▶│── créer payload ─────────────▶│                  │
   │◀── { qrUrl, uuid } ───────│◀── uuid + QR ────────────│                  │
   │   (afficher QR)                │                          │                  │
   │── GET /api/payment/uuid ─▶│── lire payload ──────────────▶│                  │
   │                           │── tx (txid) ────────────────────────────────▶│
   │◀── { signed, validated,  ─│◀── validée ? résultat ? ──────────────────────────────────│
   │      result, delivered }  │                          │                  │
\`\`\`

1. Le frontend demande un paiement au backend. Le serveur valide les champs et crée un payload Xaman.
2. L'utilisateur scanne le QR et signe dans Xaman.
3. Le frontend interroge régulièrement \`GET /api/payment/:uuid\`. Une fois le payload signé, le serveur cherche le \`txid\` sur le réseau Xahau et renvoie ce qu'il trouve.

### Notifications de signature : polling ou webhook

| | Polling (\`GET /api/payment/:uuid\`) | Webhook (\`POST /webhook/xaman\`) |
|---|---|---|
| Qui interroge | Ton frontend, toutes les quelques secondes | Xaman appelle ton serveur quand l'utilisateur agit |
| Fonctionne en localhost | Oui | Seulement avec une URL publique (un tunnel, en développement) |
| Idéal pour | Le développement, et les pages que l'utilisateur garde ouvertes | La production : commandes, reçus, tout ce qui ne doit pas se perdre |

Le serveur de l'onglet Code gère les deux. Pour le webhook, indique son URL dans **apps.xaman.dev** → ton app → Webhook : \`https://ton-serveur.com/webhook/xaman\`.

### Lance-le

1. Crée une app dans **apps.xaman.dev** et copie son API Key et son API Secret dans \`.env\` :

\`\`\`bash
# .env (ne jamais committer ce fichier)
XUMM_API_KEY=your-api-key
XUMM_API_SECRET=your-api-secret
PORT=3001
\`\`\`

2. Lance les commandes d'installation de l'onglet Code. Elles créent les dossiers, installent \`express\`, \`xumm\`, \`xahau\`, \`dotenv\` et \`cors\`, et ajoutent \`.env\` au \`.gitignore\`.
3. Crée \`package.json\`, \`server.js\` et \`public/index.html\` à partir de l'onglet Code. Le projet ressemble alors à ceci :

\`\`\`
xaman-backend/
├── .env              ← API Key et Secret (jamais dans git)
├── .gitignore        ← contient .env
├── package.json
├── server.js         ← routes, webhook et vérification dans le ledger
└── public/
    └── index.html    ← l'interface, servie par Express
\`\`\`

4. Démarre le serveur avec \`npm run dev\` et ouvre \`http://localhost:3001\`. Connecte-toi avec Xaman, puis envoie un paiement.

Le dernier bloc de l'onglet Code, \`src/App.jsx\`, est un frontend React alternatif qui appelle les mêmes routes.

### Ce que signifie le statut du paiement

Quand le payload est signé, \`GET /api/payment/:uuid\` répond :

\`\`\`json
{ "signed": true, "txid": "…", "validated": true, "result": "tesSUCCESS", "delivered": "1000000" }
\`\`\`

- **\`signed\`** : l'utilisateur a approuvé le payload dans Xaman. À lui seul, cela ne prouve rien sur le ledger.
- **\`txid\`** : le hash de la transaction soumise par Xaman.
- **\`validated\`** : la transaction est dans un ledger validé. Tant que ce n'est pas le cas, \`result\` vaut \`null\` : interroge à nouveau.
- **\`result\`** : le code de résultat de la transaction. Seul \`tesSUCCESS\` signifie que le paiement a été appliqué.
- **\`delivered\`** : ce qui est réellement arrivé à destination (en drops pour le XAH). Compare-le à ce que tu attendais avant de livrer quoi que ce soit.

### Cas à surveiller

- **Signé ne veut pas dire payé.** Un payload signé peut encore échouer dans le ledger (\`tecUNFUNDED_PAYMENT\`, par exemple) ou ne pas être encore validé. Ne livre qu'avec \`validated: true\`, \`result: "tesSUCCESS"\` et le bon montant \`delivered\`.
- **N'importe qui peut appeler ton webhook.** Son URL est publique. Xaman signe chaque webhook avec un HMAC-SHA1 de l'en-tête \`x-xumm-request-timestamp\` suivi du corps, avec ton API Secret sans tirets comme clé, et l'envoie dans \`x-xumm-request-signature\`. Le serveur le recalcule et répond \`401\` s'il ne correspond pas, avant de lire le corps ([documentation Xaman](https://docs.xaman.dev/concepts/payloads-sign-requests/status-updates/webhooks/signature-verification)).
- **Les payloads expirent.** Si l'utilisateur ne signe pas à temps, le statut renvoie \`signed: false\` avec \`expired: true\`. Crée un nouveau payload au lieu d'attendre.
- **Testnet et mainnet diffèrent à deux endroits.** Les payloads utilisent \`NetworkID: 21338\` (testnet ; le mainnet est \`21337\`), et \`verifyOnLedger\` se connecte à \`wss://xahau-test.net\`. Change les deux ensemble.
- **Un API Secret compromis.** Renouvelle les identifiants dans apps.xaman.dev : génère une nouvelle API Key et un nouveau Secret, mets à jour \`.env\` sur le serveur et supprime l'ancienne paire.`,
      codeTitles: ["Commandes d'installation", "package.json - copie-colle ce fichier complet", ".env - identifiants (ne jamais pousser dans Git)", "server.js - serveur Express complet avec Xaman", "public/index.html - interface complète", "src/App.jsx - frontend React consommant le backend"],
      slides: [["Frontend vs Backend : quand utiliser chaque approche", "Frontend : prototypes avec API Key\nBackend : production, API Secret, validation, webhooks et base de données."], ["Architecture : frontend + backend + Xaman", "React → Express → Xaman API → QR/lien → utilisateur signe → webhook → serveur sauvegarde le résultat."], ["Webhooks : recevoir la signature sur le serveur", "Configure le webhook dans apps.xaman.dev\n\nRéponds vite 200, puis traite la logique de façon asynchrone."]],
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

const expandedM11Slides = {
  m11l1: {
    fr: [
      [
        "Qu'est-ce que le SDK XUMM ?",
        "SDK officiel pour intégrer Xaman dans ton application\n\n• Authentifier les utilisateurs avec SignIn\n• Créer des payloads (demandes de signature)\n• Afficher un QR que l'utilisateur scanne avec Xaman\n• Recevoir la réponse en temps réel via WebSocket\n• L'utilisateur signe, tu ne vois jamais ses clés privées",
      ],
      [
        "Portail développeur",
        "apps.xaman.dev est ton centre de contrôle\n\n• Créer une app et obtenir API Key + Secret\n• Définir la whitelist des domaines autorisés\n• Configurer l'URL de webhook\n• Voir les statistiques et les logs API\n\ndocs.xumm.dev contient la documentation complète",
      ],
      [
        "API Key vs API Secret",
        "Deux identifiants avec des rôles différents :\n\nAPI Key (publique)\n• Peut être utilisée dans le navigateur\n• Flux PKCE sans Secret\n• Va dans le code React/JS frontend\n\nAPI Secret (privée)\n• Serveur uniquement (Node.js)\n• JAMAIS dans le navigateur\n• Donne des permissions complètes d'écriture",
      ],
    ],
    ar: [
      [
        "ما هو XUMM SDK؟",
        "الـ SDK الرسمي لدمج Xaman في تطبيقك\n\n• مصادقة المستخدمين باستخدام SignIn\n• إنشاء payloads، أي طلبات توقيع\n• عرض QR يمسحه المستخدم بتطبيق Xaman\n• استقبال الرد لحظيا عبر WebSocket\n• المستخدم يوقع وأنت لا ترى مفاتيحه الخاصة أبدا",
      ],
      [
        "بوابة المطورين",
        "apps.xaman.dev هي مركز التحكم في تطبيقك\n\n• إنشاء تطبيق والحصول على API Key + Secret\n• تحديد قائمة الدومينات المسموح بها\n• إعداد رابط webhook\n• عرض الإحصائيات وسجلات API\n\ndocs.xumm.dev تحتوي الوثائق الكاملة",
      ],
      [
        "API Key مقابل API Secret",
        "بيانات اعتماد بدورين مختلفين:\n\nAPI Key (عام)\n• يمكن استخدامه في المتصفح\n• تدفق PKCE لا يحتاج Secret\n• يوضع في كود React/JS للواجهة\n\nAPI Secret (خاص)\n• للخادم فقط (Node.js)\n• لا يوضع أبدا في المتصفح\n• يمنح صلاحيات كتابة كاملة",
      ],
    ],
  },
  m11l2: {
    fr: [
      [
        "Flux de login Xaman",
        "Authentification sans mot de passe :\n\n1. Ton app crée un payload SignIn\n2. Tu affiches le QR à l'utilisateur\n3. L'utilisateur scanne avec Xaman\n4. Il appuie sur Sign (sans frais)\n5. Le WebSocket transmet son adresse\n6. L'utilisateur est authentifié",
      ],
      [
        "Desktop vs Mobile",
        "La modale gère desktop et mobile :\n\nDesktop\n• La modale affiche l'image QR (qr_png)\n• L'utilisateur scanne avec Xaman\n• La modale se ferme quand la signature est confirmée\n\nMobile\n• La modale affiche le deep link (next.always)\n• Le lien ouvre Xaman automatiquement\n• Aucun scan nécessaire",
      ],
      [
        "Événements SDK",
        "payload.createAndSubscribe() depuis le navigateur :\n\n1. Origin http://localhost:5173 est dans la whitelist\n2. Le navigateur envoie Origin et Xaman valide CORS\n3. created.refs.qr_png fournit l'image QR\n4. Le QR s'affiche dans la modale\n5. Le WebSocket attend la signature\n6. Quand l'utilisateur signe, la modale se ferme\n\nAucune fenêtre externe n'est nécessaire",
      ],
    ],
    ar: [
      [
        "تدفق تسجيل الدخول عبر Xaman",
        "مصادقة بلا كلمة مرور:\n\n1. ينشئ التطبيق payload من نوع SignIn\n2. تعرض QR للمستخدم\n3. يمسحه المستخدم بتطبيق Xaman\n4. يضغط Sign بلا رسوم\n5. يرسل WebSocket عنوان الحساب\n6. يصبح المستخدم موثقا",
      ],
      [
        "Desktop مقابل Mobile",
        "النافذة تدعم سطح المكتب والموبايل:\n\nDesktop\n• تعرض النافذة صورة QR (qr_png)\n• يمسحها المستخدم بتطبيق Xaman\n• تغلق النافذة عند تأكيد التوقيع\n\nMobile\n• تعرض النافذة deep link (next.always)\n• الضغط على الرابط يفتح Xaman تلقائيا\n• لا حاجة لمسح QR",
      ],
      [
        "أحداث SDK",
        "payload.createAndSubscribe() من المتصفح:\n\n1. Origin http://localhost:5173 موجود في whitelist\n2. يرسل المتصفح Origin وXaman يتحقق من CORS\n3. يرجع created.refs.qr_png صورة QR\n4. يظهر QR داخل نافذة الصفحة\n5. ينتظر WebSocket توقيع المستخدم\n6. بعد التوقيع تغلق النافذة\n\nلا تفتح نافذة خارجية",
      ],
    ],
  },
  m11l3: {
    fr: [
      [
        "Flux de paiement avec Xaman",
        "L'utilisateur scanne deux fois :\n\n1er QR - Login (SignIn, sans frais)\n• Identifie l'utilisateur\n• Tu récupères son adresse\n\n2e QR - Payment (avec frais)\n• Affiche destination et montant\n• L'utilisateur vérifie et approuve\n• Tu reçois le txid de la transaction signée",
      ],
      [
        "Drops : l'unité de XAH",
        "Les montants sont exprimés en drops :\n\n1 XAH = 1 000 000 drops\n0,5 XAH = 500 000 drops\n0,000001 XAH = 1 drop (minimum)\n\nConversion en code :\ndrops = Math.floor(xah * 1_000_000)\nxah = drops / 1_000_000\n\nUtilise toujours des strings pour Amount dans le JSON",
      ],
      [
        "createAndSubscribe : méthode clé",
        "Une seule méthode pour créer et écouter :\n\nconst { created, resolved } = await\n  xumm.payload.createAndSubscribe(\n    { txjson: transaction },\n    (event) => {\n      if ('signed' in event.data)\n        return event.data\n    }\n  )\n\ncreated.refs.qr_png → URL du QR\nawait resolved → signature ou refus",
      ],
    ],
    ar: [
      [
        "تدفق Payment مع Xaman",
        "يمسح المستخدم QR مرتين:\n\nQR الأول - Login (SignIn بلا رسوم)\n• يحدد هوية المستخدم\n• تحصل على عنوانه\n\nQR الثاني - Payment (برسوم)\n• يعرض الوجهة والمبلغ\n• يراجع المستخدم ويوافق\n• تستقبل txid للمعاملة الموقعة",
      ],
      [
        "Drops: وحدة XAH",
        "المبالغ تكتب بالدروبس:\n\n1 XAH = 1,000,000 drops\n0.5 XAH = 500,000 drops\n0.000001 XAH = 1 drop (الحد الأدنى)\n\nالتحويل في الكود:\ndrops = Math.floor(xah * 1_000_000)\nxah = drops / 1_000_000\n\nاستخدم دائما strings لحقل Amount في JSON",
      ],
      [
        "createAndSubscribe: الطريقة الأساسية",
        "طريقة واحدة للإنشاء والاستماع:\n\nconst { created, resolved } = await\n  xumm.payload.createAndSubscribe(\n    { txjson: transaction },\n    (event) => {\n      if ('signed' in event.data)\n        return event.data\n    }\n  )\n\ncreated.refs.qr_png → رابط QR\nawait resolved → توقيع أو رفض",
      ],
    ],
  },
  m11l4: {
    fr: [
      [
        "Frontend vs Backend : quand utiliser chaque approche",
        "Frontend (API Key seulement)\n• Applications simples, démos, prototypes\n• Pas de logique métier complexe\n• Le SDK crée les payloads dans le navigateur\n\nBackend (API Key + Secret)\n• Applications de production\n• Validation et audit côté serveur\n• Webhooks pour les notifications\n• Intégration avec une base de données",
      ],
      [
        "Architecture : frontend + backend + Xaman",
        "Flux de données complet :\n\n1. React → POST /api/pago → Express\n2. Express → créer payload → Xaman API\n3. Xaman API → uuid + QR → Express\n4. Express → qrUrl → React\n5. React affiche le QR à l'utilisateur\n6. L'utilisateur signe dans l'app Xaman\n7. Xaman → webhook → Express\n8. Express sauvegarde txid en base de données",
      ],
      [
        "Webhooks : recevoir la signature sur le serveur",
        "Configure ton webhook dans apps.xaman.dev\n\nXaman appelle ton endpoint quand :\n• L'utilisateur signe le payload\n• L'utilisateur refuse le payload\n• Le payload expire\n\nTon serveur doit répondre 200 rapidement\nTraite la logique de façon asynchrone\nUtilise ngrok pour tester en local",
      ],
    ],
    ar: [
      [
        "Frontend مقابل Backend: متى تستخدم كل واحد؟",
        "Frontend (API Key فقط)\n• تطبيقات بسيطة وعروض وتجارب أولية\n• بلا منطق أعمال معقد\n• ينشئ SDK الـ payloads في المتصفح\n\nBackend (API Key + Secret)\n• تطبيقات إنتاج\n• تحقق وتدقيق على الخادم\n• Webhooks للإشعارات\n• تكامل مع قاعدة بيانات",
      ],
      [
        "المعمارية: frontend + backend + Xaman",
        "تدفق البيانات الكامل:\n\n1. React → POST /api/pago → Express\n2. Express → إنشاء payload → Xaman API\n3. Xaman API → uuid + QR → Express\n4. Express → qrUrl → React\n5. React يعرض QR للمستخدم\n6. المستخدم يوقع في تطبيق Xaman\n7. Xaman → webhook → Express\n8. Express يحفظ txid في قاعدة البيانات",
      ],
      [
        "Webhooks: استقبال التوقيع على الخادم",
        "اضبط webhook في apps.xaman.dev\n\nيستدعي Xaman الـ endpoint عندما:\n• يوقع المستخدم payload\n• يرفض المستخدم payload\n• تنتهي صلاحية payload\n\nيجب أن يرد الخادم 200 بسرعة\nعالج المنطق بشكل غير متزامن\nاستخدم ngrok للاختبار المحلي",
      ],
    ],
  },
};

function applyExpandedM11Slides(module) {
  for (const lesson of module.lessons) {
    const translations = expandedM11Slides[lesson.id];
    if (!translations) continue;

    for (const lang of ["fr", "ar"]) {
      translations[lang].forEach(([title, content], index) => {
        lesson.slides[index].title[lang] = title;
        lesson.slides[index].content[lang] = content;
      });
    }
  }
}

applyExpandedM11Slides(moduleData);

// French and Arabic code: the English code, line by line, with its prose translated
deriveCodeTranslations(moduleData);

addNewWords(moduleData, 11);
export default moduleData;
