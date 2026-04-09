export default {
  id: "m0",
  icon: "⚙️",
  title: {
    es: "Preparación del entorno de trabajo",
    en: "Setting Up the Development Environment",
    jp: "開発環境のセットアップ",
  },
  lessons: [
    {
      id: "m0l1",
      title: {
        es: "Instalación de Visual Studio Code",
        en: "Installing Visual Studio Code",
        jp: "Visual Studio Codeのインストール",
      },
      theory: {
        es: `**Visual Studio Code (VS Code)** es el editor de código que usaremos durante todo el curso. Es gratuito, ligero y tiene un ecosistema enorme de extensiones que nos facilitarán el desarrollo.

### ¿Por qué VS Code?

- **Gratuito y open source** (mantenido por Microsoft)
- **Multiplataforma**: funciona en Windows, macOS y Linux
- **Terminal integrada**: puedes ejecutar comandos sin salir del editor
- **Extensiones**: soporte para JavaScript, formateo automático, autocompletado inteligente y mucho más
- **Git integrado**: gestión de versiones sin salir del editor

### Instalación en Windows

1. Ve a [code.visualstudio.com](https://code.visualstudio.com)
2. Haz clic en **"Download for Windows"**
3. Ejecuta el instalador \`.exe\` descargado
4. Durante la instalación, marca estas opciones recomendadas:
   - ✅ Agregar "Abrir con Code" al menú contextual de archivos
   - ✅ Agregar "Abrir con Code" al menú contextual de directorios
   - ✅ Agregar a PATH (para poder abrir desde terminal con \`code .\`)
5. Haz clic en **Instalar** y espera a que termine

### Instalación en macOS

1. Ve a [code.visualstudio.com](https://code.visualstudio.com)
2. Haz clic en **"Download for Mac"**
3. Abre el archivo \`.zip\` descargado
4. Arrastra **Visual Studio Code.app** a la carpeta **Aplicaciones**
5. Para usar el comando \`code\` desde la terminal:
   - Abre VS Code
   - Pulsa \`Cmd + Shift + P\` para abrir la paleta de comandos
   - Escribe **"Shell Command: Install 'code' command in PATH"**
   - Selecciona la opción y confirma

### Instalación en Linux (Ubuntu/Debian)

1. Abre una terminal y ejecuta los siguientes comandos:

\`\`\`
sudo apt update
sudo apt install software-properties-common apt-transport-https wget
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code
\`\`\`

2. Alternativamente, descarga el paquete \`.deb\` desde [code.visualstudio.com](https://code.visualstudio.com) y haz doble clic para instalarlo

### Instalación en Linux (Fedora/RHEL)

1. Abre una terminal y ejecuta:

\`\`\`
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\\nname=Visual Studio Code\\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\\nenabled=1\\ngpgcheck=1\\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
sudo dnf install code
\`\`\`

### Verificar la instalación

Una vez instalado, abre una terminal (o el Símbolo del sistema en Windows) y ejecuta:

\`\`\`
code --version
\`\`\`

Debería mostrar el número de versión instalada.`,
        en: `**Visual Studio Code (VS Code)** is the code editor we will use throughout the entire course. It is free, lightweight, and has a huge ecosystem of extensions that will make development easier for us.

### Why VS Code?

- **Free and open source** (maintained by Microsoft)
- **Cross-platform**: works on Windows, macOS, and Linux
- **Integrated terminal**: you can run commands without leaving the editor
- **Extensions**: support for JavaScript, automatic formatting, smart autocomplete, and much more
- **Built-in Git**: version control without leaving the editor

### Installation on Windows

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Click on **"Download for Windows"**
3. Run the downloaded \`.exe\` installer
4. During installation, check these recommended options:
   - ✅ Add "Open with Code" to the file context menu
   - ✅ Add "Open with Code" to the directory context menu
   - ✅ Add to PATH (to be able to open from terminal with \`code .\`)
5. Click **Install** and wait for it to finish

### Installation on macOS

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Click on **"Download for Mac"**
3. Open the downloaded \`.zip\` file
4. Drag **Visual Studio Code.app** to the **Applications** folder
5. To use the \`code\` command from the terminal:
   - Open VS Code
   - Press \`Cmd + Shift + P\` to open the command palette
   - Type **"Shell Command: Install 'code' command in PATH"**
   - Select the option and confirm

### Installation on Linux (Ubuntu/Debian)

1. Open a terminal and run the following commands:

\`\`\`
sudo apt update
sudo apt install software-properties-common apt-transport-https wget
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code
\`\`\`

2. Alternatively, download the \`.deb\` package from [code.visualstudio.com](https://code.visualstudio.com) and double-click to install it

### Installation on Linux (Fedora/RHEL)

1. Open a terminal and run:

\`\`\`
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\\nname=Visual Studio Code\\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\\nenabled=1\\ngpgcheck=1\\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
sudo dnf install code
\`\`\`

### Verify the installation

Once installed, open a terminal (or Command Prompt on Windows) and run:

\`\`\`
code --version
\`\`\`

It should display the installed version number.`,
        jp: `**Visual Studio Code (VS Code)** はこのコース全体で使用するコードエディタです。無料で軽量なうえ、開発を助ける拡張機能の豊富なエコシステムを備えています。

### VS Codeを使う理由

- **無料かつオープンソース**（Microsoftが管理）
- **クロスプラットフォーム**: Windows、macOS、Linuxで動作
- **統合ターミナル**: エディタを離れずにコマンドを実行可能
- **拡張機能**: JavaScript対応、自動フォーマット、スマートオートコンプリートなど多数
- **Git統合**: エディタを離れずにバージョン管理が可能

### Windowsへのインストール

1. [code.visualstudio.com](https://code.visualstudio.com) にアクセス
2. **"Download for Windows"** をクリック
3. ダウンロードした \`.exe\` インストーラを実行
4. インストール中、以下の推奨オプションにチェックを入れる:
   - ✅ ファイルのコンテキストメニューに「Codeで開く」を追加
   - ✅ ディレクトリのコンテキストメニューに「Codeで開く」を追加
   - ✅ PATHに追加（ターミナルから \`code .\` で開けるようにする）
5. **インストール** をクリックして完了を待つ

### macOSへのインストール

1. [code.visualstudio.com](https://code.visualstudio.com) にアクセス
2. **"Download for Mac"** をクリック
3. ダウンロードした \`.zip\` ファイルを開く
4. **Visual Studio Code.app** を **アプリケーション** フォルダにドラッグ
5. ターミナルから \`code\` コマンドを使用するには:
   - VS Codeを開く
   - \`Cmd + Shift + P\` でコマンドパレットを開く
   - **"Shell Command: Install 'code' command in PATH"** と入力
   - オプションを選択して確認

### Linux (Ubuntu/Debian) へのインストール

1. ターミナルを開き、以下のコマンドを実行:

\`\`\`
sudo apt update
sudo apt install software-properties-common apt-transport-https wget
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code
\`\`\`

2. または [code.visualstudio.com](https://code.visualstudio.com) から \`.deb\` パッケージをダウンロードしてダブルクリックでインストール

### Linux (Fedora/RHEL) へのインストール

1. ターミナルを開き、以下を実行:

\`\`\`
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\\nname=Visual Studio Code\\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\\nenabled=1\\ngpgcheck=1\\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
sudo dnf install code
\`\`\`

### インストールの確認

インストール後、ターミナル（Windowsではコマンドプロンプト）を開いて実行:

\`\`\`
code --version
\`\`\`

インストールされたバージョン番号が表示されるはずです。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Verificar instalación de VS Code desde terminal",
            en: "Verify VS Code installation from the terminal",
            jp: "ターミナルからVS Codeのインストールを確認する",
          },
          language: "bash",
          code: {
            es: `# Verificar que VS Code está instalado
code --version

# Abrir VS Code en el directorio actual
code .

# Abrir un archivo específico
code mi-archivo.js`,
            en: `# Verify that VS Code is installed
code --version

# Open VS Code in the current directory
code .

# Open a specific file
code mi-archivo.js`,
            jp: `# VS Codeのインストールを確認する
code --version

# 現在のディレクトリでVS Codeを開く
code .

# 特定のファイルを開く
code mi-archivo.js`,
          },
        },
        {
          title: {
            es: "Extensiones recomendadas para el curso",
            en: "Recommended extensions for the course",
            jp: "コース用の推奨拡張機能",
          },
          language: "bash",
          code: {
            es: `# Instalar extensiones desde la terminal
# (también puedes buscarlas en la pestaña Extensiones de VS Code)

# Soporte mejorado para JavaScript/TypeScript
code --install-extension dbaeumer.vscode-eslint

# Formateo automático de código
code --install-extension esbenp.prettier-vscode

# Colores para pares de corchetes
code --install-extension CoenraadS.bracket-pair-colorizer-2

# Iconos para el explorador de archivos
code --install-extension vscode-icons-team.vscode-icons`,
            en: `# Install extensions from the terminal
# (you can also search for them in the VS Code Extensions tab)

# Enhanced JavaScript/TypeScript support
code --install-extension dbaeumer.vscode-eslint

# Automatic code formatting
code --install-extension esbenp.prettier-vscode

# Bracket pair colorization
code --install-extension CoenraadS.bracket-pair-colorizer-2

# Icons for the file explorer
code --install-extension vscode-icons-team.vscode-icons`,
            jp: `# ターミナルから拡張機能をインストールする
# （VS CodeのExtensionsタブから検索することもできます）

# JavaScript/TypeScriptの強化サポート
code --install-extension dbaeumer.vscode-eslint

# コードの自動フォーマット
code --install-extension esbenp.prettier-vscode

# 対応する括弧のカラーリング
code --install-extension CoenraadS.bracket-pair-colorizer-2

# ファイルエクスプローラー用アイコン
code --install-extension vscode-icons-team.vscode-icons`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Visual Studio Code", en: "Visual Studio Code", jp: "Visual Studio Code" },
          content: {
            es: "Editor de código gratuito y multiplataforma\n\n• Windows, macOS y Linux\n• Terminal integrada\n• Miles de extensiones\n• Git integrado\n• Descarga: code.visualstudio.com",
            en: "Free and cross-platform code editor\n\n• Windows, macOS, and Linux\n• Integrated terminal\n• Thousands of extensions\n• Built-in Git\n• Download: code.visualstudio.com",
            jp: "無料のクロスプラットフォームコードエディタ\n\n• Windows、macOS、Linux対応\n• 統合ターミナル\n• 数千の拡張機能\n• Git統合\n• ダウンロード: code.visualstudio.com",
          },
          visual: "💻",
        },
        {
          title: { es: "Instalación rápida", en: "Quick Installation", jp: "クイックインストール" },
          content: {
            es: "🪟 Windows → Descargar .exe e instalar\n🍎 macOS → Descargar .zip, arrastrar a Aplicaciones\n🐧 Linux → apt install code / dnf install code\n\n✅ Verificar: code --version",
            en: "🪟 Windows → Download .exe and install\n🍎 macOS → Download .zip, drag to Applications\n🐧 Linux → apt install code / dnf install code\n\n✅ Verify: code --version",
            jp: "🪟 Windows → .exeをダウンロードしてインストール\n🍎 macOS → .zipをダウンロードしてアプリケーションにドラッグ\n🐧 Linux → apt install code / dnf install code\n\n✅ 確認: code --version",
          },
          visual: "📦",
        },
      ],
    },
    {
      id: "m0l2",
      title: {
        es: "Instalación de Node.js",
        en: "Installing Node.js",
        jp: "Node.jsのインストール",
      },
      theory: {
        es: `**Node.js** es el entorno de ejecución de JavaScript que necesitamos para ejecutar los scripts del curso. Todos los ejemplos de código que interactúan con la blockchain Xahau se ejecutan con Node.js.

### ¿Qué es Node.js?

Node.js permite ejecutar código JavaScript **fuera del navegador**, directamente en tu ordenador. Incluye:
- **node**: El intérprete de JavaScript (ejecuta tus scripts)
- **npm**: El gestor de paquetes (instala librerías como \`xahau\`)
- **npx**: Ejecutor de paquetes (ejecuta herramientas sin instalar globalmente)

### Versión recomendada

Para este curso necesitas **Node.js v18 o superior** (recomendamos la versión LTS más reciente). La librería \`xahau\` requiere al menos v18.

### Instalación en Windows

1. Ve a [nodejs.org](https://nodejs.org)
2. Descarga la versión **LTS** (Long Term Support)
3. Ejecuta el instalador \`.msi\`
4. Sigue el asistente con las opciones por defecto
5. **Importante**: marca la casilla "Automatically install the necessary tools" si aparece
6. Reinicia la terminal después de instalar

### Instalación en macOS

**Opción A — Instalador oficial:**
1. Ve a [nodejs.org](https://nodejs.org)
2. Descarga la versión **LTS** para macOS
3. Abre el archivo \`.pkg\` y sigue el asistente

**Opción B — Con Homebrew (recomendado):**
1. Si no tienes Homebrew, instálalo primero desde [brew.sh](https://brew.sh)
2. Ejecuta en la terminal:

\`\`\`
brew install node@22
\`\`\`

### Instalación en Linux (Ubuntu/Debian)

Usa el repositorio oficial de NodeSource para obtener la versión más reciente:

\`\`\`
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
\`\`\`

### Instalación en Linux (Fedora)

\`\`\`
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf install -y nodejs
\`\`\`

### Verificar la instalación

Abre una **nueva terminal** (esto es importante, sobre todo en Windows) y ejecuta:

\`\`\`
node --version
npm --version
\`\`\`

Deberías ver algo como \`v22.x.x\` y \`10.x.x\` respectivamente.

### Instalar la librería xahau

Con Node.js instalado, ya puedes instalar la librería que usaremos en todo el curso:

\`\`\`
mkdir xahau-curso
cd xahau-curso
npm init -y
npm install xahau
\`\`\`

Esto creará tu proyecto y descargará la librería \`xahau\` para que puedas ejecutar todos los ejemplos del curso.`,
        en: `**Node.js** is the JavaScript runtime environment we need to run the course scripts. All code examples that interact with the Xahau blockchain are executed with Node.js.

### What is Node.js?

Node.js allows you to run JavaScript code **outside the browser**, directly on your computer. It includes:
- **node**: The JavaScript interpreter (runs your scripts)
- **npm**: The package manager (installs libraries like \`xahau\`)
- **npx**: Package runner (runs tools without installing them globally)

### Recommended version

For this course you need **Node.js v18 or higher** (we recommend the latest LTS version). The \`xahau\` library requires at least v18.

### Installation on Windows

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** (Long Term Support) version
3. Run the \`.msi\` installer
4. Follow the wizard with the default options
5. **Important**: check the "Automatically install the necessary tools" box if it appears
6. Restart the terminal after installation

### Installation on macOS

**Option A — Official installer:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version for macOS
3. Open the \`.pkg\` file and follow the wizard

**Option B — With Homebrew (recommended):**
1. If you don't have Homebrew, install it first from [brew.sh](https://brew.sh)
2. Run in the terminal:

\`\`\`
brew install node@22
\`\`\`

### Installation on Linux (Ubuntu/Debian)

Use the official NodeSource repository to get the latest version:

\`\`\`
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
\`\`\`

### Installation on Linux (Fedora)

\`\`\`
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf install -y nodejs
\`\`\`

### Verify the installation

Open a **new terminal** (this is important, especially on Windows) and run:

\`\`\`
node --version
npm --version
\`\`\`

You should see something like \`v22.x.x\` and \`10.x.x\` respectively.

### Install the xahau library

With Node.js installed, you can now install the library we will use throughout the course:

\`\`\`
mkdir xahau-curso
cd xahau-curso
npm init -y
npm install xahau
\`\`\`

This will create your project and download the \`xahau\` library so you can run all the course examples.`,
        jp: `**Node.js** はこのコースのスクリプトを実行するために必要なJavaScriptランタイム環境です。Xahauブロックチェーンと連携するすべてのコード例はNode.jsで実行されます。

### Node.jsとは？

Node.jsを使うと、**ブラウザの外側**でJavaScriptコードをコンピュータ上で直接実行できます。以下を含みます:
- **node**: JavaScriptインタープリタ（スクリプトを実行する）
- **npm**: パッケージマネージャ（\`xahau\`などのライブラリをインストールする）
- **npx**: パッケージランナー（グローバルにインストールせずにツールを実行する）

### 推奨バージョン

このコースには **Node.js v18以上** が必要です（最新のLTSバージョンを推奨）。\`xahau\`ライブラリはv18以上が必要です。

### Windowsへのインストール

1. [nodejs.org](https://nodejs.org) にアクセス
2. **LTS**（長期サポート）バージョンをダウンロード
3. \`.msi\` インストーラを実行
4. デフォルトのオプションでウィザードに従う
5. **重要**: 表示された場合は「Automatically install the necessary tools」にチェックを入れる
6. インストール後にターミナルを再起動

### macOSへのインストール

**オプションA — 公式インストーラ:**
1. [nodejs.org](https://nodejs.org) にアクセス
2. macOS用の **LTS** バージョンをダウンロード
3. \`.pkg\` ファイルを開いてウィザードに従う

**オプションB — Homebrewを使用（推奨）:**
1. Homebrewがない場合は、まず [brew.sh](https://brew.sh) からインストール
2. ターミナルで実行:

\`\`\`
brew install node@22
\`\`\`

### Linux (Ubuntu/Debian) へのインストール

最新バージョンを取得するには、公式のNodeSourceリポジトリを使用:

\`\`\`
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
\`\`\`

### Linux (Fedora) へのインストール

\`\`\`
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf install -y nodejs
\`\`\`

### インストールの確認

**新しいターミナル**を開いて（特にWindowsでは重要）実行:

\`\`\`
node --version
npm --version
\`\`\`

それぞれ \`v22.x.x\` と \`10.x.x\` のような表示が確認できるはずです。

### xahauライブラリのインストール

Node.jsがインストールされたら、コース全体で使用するライブラリをインストールできます:

\`\`\`
mkdir xahau-curso
cd xahau-curso
npm init -y
npm install xahau
\`\`\`

これによりプロジェクトが作成され、コースのすべてのサンプルを実行できるように\`xahau\`ライブラリがダウンロードされます。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Verificar instalación y crear el proyecto del curso",
            en: "Verify installation and create the course project",
            jp: "インストールを確認してコースプロジェクトを作成する",
          },
          language: "bash",
          code: {
            es: `# 1. Verificar que Node.js está instalado
node --version
# Esperado: v22.x.x (o v18+)

npm --version
# Esperado: 10.x.x

# 2. Crear el directorio del proyecto del curso
mkdir xahau-curso
cd xahau-curso

# 3. Inicializar un proyecto Node.js
npm init -y

# 4. Instalar la librería xahau
npm install xahau`,
            en: `# 1. Verify that Node.js is installed
node --version
# Expected: v22.x.x (or v18+)

npm --version
# Expected: 10.x.x

# 2. Create the course project directory
mkdir xahau-curso
cd xahau-curso

# 3. Initialize a Node.js project
npm init -y

# 4. Install the xahau library
npm install xahau`,
            jp: `# 1. Node.jsがインストールされているか確認する
node --version
# 期待値: v22.x.x (またはv18+)

npm --version
# 期待値: 10.x.x

# 2. コースプロジェクトのディレクトリを作成する
mkdir xahau-curso
cd xahau-curso

# 3. Node.jsプロジェクトを初期化する
npm init -y

# 4. xahauライブラリをインストールする
npm install xahau`,
          },
        },
        {
          title: {
            es: "Tu primer script: Hola Xahau",
            en: "Your first script: Hello Xahau",
            jp: "はじめてのスクリプト: Hello Xahau",
          },
          language: "javascript",
          code: {
            es: `// Archivo: hola-xahau.js
// Ejecutar con: node hola-xahau.js

const { Client } = require("xahau");

async function main() {
  console.log("Conectando a Xahau...");

  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("¡Conectado correctamente!");
  console.log("Red:", info.network_id);
  console.log("Versión:", info.build_version);
  console.log("Ledger:", info.validated_ledger.seq);

  await client.disconnect();
  console.log("Desconectado. ¡Tu entorno está listo!");
}

main();`,
            en: `// File: hola-xahau.js
// Run with: node hola-xahau.js

const { Client } = require("xahau");

async function main() {
  console.log("Connecting to Xahau...");

  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("Successfully connected!");
  console.log("Network:", info.network_id);
  console.log("Version:", info.build_version);
  console.log("Ledger:", info.validated_ledger.seq);

  await client.disconnect();
  console.log("Disconnected. Your environment is ready!");
}

main();`,
            jp: `// ファイル: hola-xahau.js
// 実行: node hola-xahau.js

const { Client } = require("xahau");

async function main() {
  console.log("Xahauに接続中...");

  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("接続成功！");
  console.log("ネットワーク:", info.network_id);
  console.log("バージョン:", info.build_version);
  console.log("レジャー:", info.validated_ledger.seq);

  await client.disconnect();
  console.log("切断しました。環境の準備ができています！");
}

main();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es Node.js?", en: "What is Node.js?", jp: "Node.jsとは？" },
          content: {
            es: "JavaScript fuera del navegador\n\n• node → Ejecuta tus scripts\n• npm → Instala librerías\n• npx → Ejecuta herramientas\n\nVersiones: v18+ (recomendado v22 LTS)",
            en: "JavaScript outside the browser\n\n• node → Runs your scripts\n• npm → Installs libraries\n• npx → Runs tools\n\nVersions: v18+ (recommended v22 LTS)",
            jp: "ブラウザの外側で動くJavaScript\n\n• node → スクリプトを実行する\n• npm → ライブラリをインストールする\n• npx → ツールを実行する\n\nバージョン: v18+ (v22 LTS推奨)",
          },
          visual: "🟢",
        },
        {
          title: { es: "Instalación rápida", en: "Quick Installation", jp: "クイックインストール" },
          content: {
            es: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ Verificar:\nnode --version\nnpm --version",
            en: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ Verify:\nnode --version\nnpm --version",
            jp: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ 確認:\nnode --version\nnpm --version",
          },
          visual: "📦",
        },
        {
          title: { es: "Preparar el proyecto", en: "Set Up the Project", jp: "プロジェクトの準備" },
          content: {
            es: "mkdir xahau-curso\ncd xahau-curso\nnpm init -y\nnpm install xahau\n\n¡Listo para ejecutar los scripts del curso!",
            en: "mkdir xahau-curso\ncd xahau-curso\nnpm init -y\nnpm install xahau\n\nReady to run the course scripts!",
            jp: "mkdir xahau-curso\ncd xahau-curso\nnpm init -y\nnpm install xahau\n\nコーススクリプトを実行する準備ができました！",
          },
          visual: "🚀",
        },
      ],
    },
    {
      id: "m0l3",
      title: {
        es: "Alternativa online: CodeSandbox",
        en: "Online Alternative: CodeSandbox",
        jp: "オンライン代替: CodeSandbox",
      },
      theory: {
        es: `Si no quieres o no puedes instalar software en tu ordenador, puedes usar **CodeSandbox**, un entorno de desarrollo online gratuito que funciona directamente en tu navegador.

### ¿Qué es CodeSandbox?

[CodeSandbox](https://codesandbox.io) es un IDE en la nube que te permite escribir, ejecutar y compartir código sin instalar nada. Su plan gratuito incluye todo lo que necesitas para este curso.

### Ventajas de CodeSandbox

- **Sin instalación**: todo funciona en el navegador
- **Acceso desde cualquier dispositivo**: solo necesitas internet
- **Terminal integrada**: puedes ejecutar comandos npm y node
- **Compartir código**: cada sandbox tiene una URL única
- **Gratis**: el plan gratuito es suficiente para el curso

### Crear tu cuenta

1. Ve a [codesandbox.io](https://codesandbox.io)
2. Haz clic en **"Sign In"** (arriba a la derecha)
3. Puedes registrarte con tu cuenta de **GitHub**, **Google** o **email**
4. Una vez dentro, llegarás a tu dashboard

### Crear un sandbox para el curso

1. En tu dashboard, haz clic en **"Create"** (arriba a la derecha)
2. Selecciona **"Import from GitHub"** o busca la plantilla **"Node.js"**
3. Si no encuentras la plantilla de Node.js:
   - Haz clic en **"Create"** → **"Devbox"**
   - Selecciona **"Node.js"** como plantilla
4. Esto creará un entorno con Node.js preinstalado

### Configurar el sandbox para Xahau

Una vez dentro del sandbox:

1. **Abrir la terminal**: haz clic en el icono de terminal en el panel inferior, o usa el menú **Terminal → New Terminal**
2. **Instalar la librería xahau**: ejecuta en la terminal:

\`\`\`
npm install xahau
\`\`\`

3. **Crear tu primer archivo**: haz clic derecho en el explorador de archivos (panel izquierdo) → **New File** → nombra el archivo \`hola-xahau.js\`
4. **Escribir el código**: copia cualquier ejemplo del curso en el archivo
5. **Ejecutar el script**: en la terminal, ejecuta:

\`\`\`
node hola-xahau.js
\`\`\`

### Estructura recomendada del sandbox

Organiza tus archivos así para seguir el curso:

\`\`\`
xahau-curso/
├── package.json          ← Se crea automáticamente
├── node_modules/         ← Se crea con npm install
├── m01-arquitectura.js   ← Scripts del módulo 1
├── m02-consenso.js       ← Scripts del módulo 2
├── m03-wallet.js         ← Scripts del módulo 3
├── m04-consultas.js      ← Scripts del módulo 4
├── m05-pagos.js          ← Scripts del módulo 5
├── m06-tokens.js         ← Scripts del módulo 6
├── m07-nfts.js           ← Scripts del módulo 7
└── m08-hooks.js          ← Scripts del módulo 8
\`\`\`

### Limitaciones del plan gratuito

- **Sandboxes públicos**: tu código es visible para otros (no pongas claves privadas de mainnet)
- **Tiempo de inactividad**: el sandbox se pausa tras un rato sin uso (se reactiva al volver)
- **Recursos limitados**: suficiente para los scripts del curso, pero no para compilar Hooks en C

### Recomendación de seguridad

Como los sandboxes gratuitos son públicos, **nunca pongas seeds o claves privadas de mainnet** en CodeSandbox. Usa únicamente claves de **testnet** (tokens sin valor real). Para trabajar con mainnet, usa un entorno local con VS Code.`,
        en: `If you don't want to or can't install software on your computer, you can use **CodeSandbox**, a free online development environment that works directly in your browser.

### What is CodeSandbox?

[CodeSandbox](https://codesandbox.io) is a cloud IDE that allows you to write, run, and share code without installing anything. Its free plan includes everything you need for this course.

### Advantages of CodeSandbox

- **No installation**: everything works in the browser
- **Access from any device**: you only need internet
- **Integrated terminal**: you can run npm and node commands
- **Share code**: each sandbox has a unique URL
- **Free**: the free plan is sufficient for the course

### Create your account

1. Go to [codesandbox.io](https://codesandbox.io)
2. Click on **"Sign In"** (top right)
3. You can sign up with your **GitHub**, **Google**, or **email** account
4. Once inside, you will reach your dashboard

### Create a sandbox for the course

1. In your dashboard, click on **"Create"** (top right)
2. Select **"Import from GitHub"** or search for the **"Node.js"** template
3. If you can't find the Node.js template:
   - Click on **"Create"** → **"Devbox"**
   - Select **"Node.js"** as the template
4. This will create an environment with Node.js preinstalled

### Configure the sandbox for Xahau

Once inside the sandbox:

1. **Open the terminal**: click on the terminal icon in the bottom panel, or use the menu **Terminal → New Terminal**
2. **Install the xahau library**: run in the terminal:

\`\`\`
npm install xahau
\`\`\`

3. **Create your first file**: right-click in the file explorer (left panel) → **New File** → name the file \`hola-xahau.js\`
4. **Write the code**: copy any example from the course into the file
5. **Run the script**: in the terminal, run:

\`\`\`
node hola-xahau.js
\`\`\`

### Recommended sandbox structure

Organize your files like this to follow the course:

\`\`\`
xahau-curso/
├── package.json          ← Created automatically
├── node_modules/         ← Created with npm install
├── m01-arquitectura.js   ← Module 1 scripts
├── m02-consenso.js       ← Module 2 scripts
├── m03-wallet.js         ← Module 3 scripts
├── m04-consultas.js      ← Module 4 scripts
├── m05-pagos.js          ← Module 5 scripts
├── m06-tokens.js         ← Module 6 scripts
├── m07-nfts.js           ← Module 7 scripts
└── m08-hooks.js          ← Module 8 scripts
\`\`\`

### Free plan limitations

- **Public sandboxes**: your code is visible to others (don't put mainnet private keys)
- **Inactivity timeout**: the sandbox pauses after a while of inactivity (reactivates when you return)
- **Limited resources**: sufficient for course scripts, but not for compiling Hooks in C

### Security recommendation

Since free sandboxes are public, **never put mainnet seeds or private keys** in CodeSandbox. Only use **testnet** keys (tokens with no real value). To work with mainnet, use a local environment with VS Code.`,
        jp: `ソフトウェアをコンピュータにインストールしたくない、またはできない場合は、**CodeSandbox** を使用できます。ブラウザで直接動作する無料のオンライン開発環境です。

### CodeSandboxとは？

[CodeSandbox](https://codesandbox.io) はクラウドIDEで、何もインストールせずにコードを書いたり実行したり共有したりできます。無料プランにはこのコースに必要なすべてが含まれています。

### CodeSandboxのメリット

- **インストール不要**: ブラウザですべてが動作する
- **どのデバイスからでもアクセス可能**: インターネットさえあれば使える
- **統合ターミナル**: npmやnodeコマンドを実行できる
- **コードの共有**: 各サンドボックスに固有のURLがある
- **無料**: 無料プランでコースには十分

### アカウントの作成

1. [codesandbox.io](https://codesandbox.io) にアクセス
2. 右上の **"Sign In"** をクリック
3. **GitHub**、**Google**、または **メール** アカウントで登録可能
4. ログイン後、ダッシュボードが表示される

### コース用サンドボックスの作成

1. ダッシュボードで右上の **"Create"** をクリック
2. **"Import from GitHub"** を選択するか、**"Node.js"** テンプレートを検索
3. Node.jsテンプレートが見つからない場合:
   - **"Create"** → **"Devbox"** をクリック
   - テンプレートとして **"Node.js"** を選択
4. Node.jsがプリインストールされた環境が作成される

### XahauのためのサンドボックスDRの設定

サンドボックスに入ったら:

1. **ターミナルを開く**: 下部パネルのターミナルアイコンをクリック、または **Terminal → New Terminal** メニューを使用
2. **xahauライブラリをインストール**: ターミナルで実行:

\`\`\`
npm install xahau
\`\`\`

3. **最初のファイルを作成**: ファイルエクスプローラー（左パネル）で右クリック → **New File** → ファイル名を \`hola-xahau.js\` に設定
4. **コードを書く**: コースのサンプルをファイルにコピー
5. **スクリプトを実行**: ターミナルで実行:

\`\`\`
node hola-xahau.js
\`\`\`

### サンドボックスの推奨構造

コースに沿って次のようにファイルを整理:

\`\`\`
xahau-curso/
├── package.json          ← 自動的に作成される
├── node_modules/         ← npm installで作成される
├── m01-arquitectura.js   ← モジュール1のスクリプト
├── m02-consenso.js       ← モジュール2のスクリプト
├── m03-wallet.js         ← モジュール3のスクリプト
├── m04-consultas.js      ← モジュール4のスクリプト
├── m05-pagos.js          ← モジュール5のスクリプト
├── m06-tokens.js         ← モジュール6のスクリプト
├── m07-nfts.js           ← モジュール7のスクリプト
└── m08-hooks.js          ← モジュール8のスクリプト
\`\`\`

### 無料プランの制限

- **パブリックサンドボックス**: コードは他のユーザーから見える（メインネットの秘密鍵を入力しないこと）
- **非アクティブタイムアウト**: しばらく操作がないとサンドボックスが一時停止する（戻ると再起動）
- **限られたリソース**: コーススクリプトには十分だが、CでHooksをコンパイルするには不十分

### セキュリティに関する推奨事項

無料サンドボックスはパブリックなため、**メインネットのシードや秘密鍵を絶対にCodeSandboxに入力しないでください**。**テストネット** のキー（実際の価値のないトークン）のみ使用してください。メインネットで作業するには、VS Codeを使用したローカル環境を使用してください。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Instalar xahau en CodeSandbox (terminal)",
            en: "Install xahau in CodeSandbox (terminal)",
            jp: "CodeSandboxにxahauをインストールする（ターミナル）",
          },
          language: "bash",
          code: {
            es: `# En la terminal de CodeSandbox:

# 1. Instalar la librería xahau
npm install xahau

# 2. Crear un archivo de prueba
touch hola-xahau.js

# 3. Ejecutar el script (después de escribir el código)
node hola-xahau.js`,
            en: `# In the CodeSandbox terminal:

# 1. Install the xahau library
npm install xahau

# 2. Create a test file
touch hi-xahau.js

# 3. Run the script (after writing the code)
node hi-xahau.js`,
            jp: `# CodeSandboxのターミナルで:

# 1. xahauライブラリをインストールする
npm install xahau

# 2. テストファイルを作成する
touch hi-xahau.js

# 3. スクリプトを実行する（コードを書いた後）
node hi-xahau.js`,
          },
        },
        {
          title: {
            es: "Script de prueba para CodeSandbox",
            en: "Test script for CodeSandbox",
            jp: "CodeSandbox用テストスクリプト",
          },
          language: "javascript",
          code: {
            es: `// Archivo: hola-xahau.js
// Copia este código en tu sandbox y ejecuta: node hola-xahau.js

const { Client } = require("xahau");

async function main() {
  console.log("=== Xahau Academy - Test de Conexión ===");

  // Conectar al testnet de Xahau
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  console.log("Conectado a Xahau Testnet");

  // Obtener información del servidor
  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("ID de Red:", info.network_id);
  console.log("Ledger:", info.validated_ledger.seq);
  console.log("Versión:", info.build_version);

  await client.disconnect();
  console.log("¡Tu entorno de CodeSandbox está listo!");
  console.log("Ya puedes seguir el curso de Xahau Academy.");
}

main().catch(console.error);`,
            en: `// File: hi-xahau.js
// Copy this code into your sandbox and run: node hi-xahau.js

const { Client } = require("xahau");

async function main() {
  console.log("=== Xahau Academy - Connection Test ===");

  // Connect to the Xahau testnet
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  console.log("Connected to Xahau Testnet");

  // Get server info
  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("Network ID:", info.network_id);
  console.log("Ledger:", info.validated_ledger.seq);
  console.log("Version:", info.build_version);

  await client.disconnect();
  console.log("Your CodeSandbox environment is ready!");
  console.log("You can now follow the Xahau Academy course.");
}

main().catch(console.error);`,
            jp: `// ファイル: hi-xahau.js
// このコードをサンドボックスにコピーして実行: node hi-xahau.js

const { Client } = require("xahau");

async function main() {
  console.log("=== Xahau Academy - 接続テスト ===");

  // Xahauテストネットに接続する
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  console.log("Xahau Testnetに接続しました");

  // サーバー情報を取得する
  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("ネットワークID:", info.network_id);
  console.log("レジャー:", info.validated_ledger.seq);
  console.log("バージョン:", info.build_version);

  await client.disconnect();
  console.log("CodeSandbox環境の準備ができました！");
  console.log("Xahau Academyのコースを続けられます。");
}

main().catch(console.error);`,
          },
        },
      ],
      slides: [
        {
          title: { es: "CodeSandbox", en: "CodeSandbox", jp: "CodeSandbox" },
          content: {
            es: "IDE online gratuito en tu navegador\n\n• Sin instalar nada\n• Terminal integrada\n• Node.js preinstalado\n• codesandbox.io",
            en: "Free online IDE in your browser\n\n• No installation needed\n• Integrated terminal\n• Node.js preinstalled\n• codesandbox.io",
            jp: "ブラウザで使える無料のオンラインIDE\n\n• インストール不要\n• 統合ターミナル\n• Node.jsプリインストール\n• codesandbox.io",
          },
          visual: "☁️",
        },
        {
          title: { es: "Configurar para Xahau", en: "Configure for Xahau", jp: "Xahau用の設定" },
          content: {
            es: "1️⃣ Crear cuenta en codesandbox.io\n2️⃣ Crear Devbox con plantilla Node.js\n3️⃣ npm install xahau\n4️⃣ Crear archivo .js y escribir código\n5️⃣ node mi-archivo.js",
            en: "1️⃣ Create account at codesandbox.io\n2️⃣ Create Devbox with Node.js template\n3️⃣ npm install xahau\n4️⃣ Create .js file and write code\n5️⃣ node mi-archivo.js",
            jp: "1️⃣ codesandbox.ioでアカウント作成\n2️⃣ Node.jsテンプレートでDevboxを作成\n3️⃣ npm install xahau\n4️⃣ .jsファイルを作成してコードを書く\n5️⃣ node mi-archivo.js",
          },
          visual: "🛠️",
        },
        {
          title: { es: "Seguridad", en: "Security", jp: "セキュリティ" },
          content: {
            es: "⚠️ Los sandboxes gratuitos son PÚBLICOS\n\n• NUNCA pongas seeds de mainnet\n• Usa SOLO claves de testnet\n• Para mainnet → entorno local con VS Code",
            en: "⚠️ Free sandboxes are PUBLIC\n\n• NEVER put mainnet seeds\n• Use ONLY testnet keys\n• For mainnet → local environment with VS Code",
            jp: "⚠️ 無料のサンドボックスはパブリックです\n\n• メインネットのシードは絶対に入力しない\n• テストネットのキーのみ使用する\n• メインネット用 → VS Codeのローカル環境",
          },
          visual: "🔒",
        },
      ],
    },
    {
      id: "m0l4",
      title: {
        es: "Estructura de un proyecto Node.js",
        en: "Structure of a Node.js Project",
        jp: "Node.jsプロジェクトの構造",
      },
      theory: {
        es: `Ahora que tienes Node.js instalado y la librería \`xahau\` descargada, es importante entender **cómo se organiza un proyecto Node.js** antes de empezar a escribir código que interactúe con la blockchain.

### ¿Qué es package.json?

El archivo \`package.json\` es la **ficha técnica de tu proyecto**. Se crea automáticamente cuando ejecutas \`npm init -y\` y contiene:

- **name**: El nombre de tu proyecto
- **version**: La versión actual
- **description**: Una descripción breve
- **main**: El archivo principal (por defecto \`index.js\`)
- **scripts**: Comandos personalizados que puedes ejecutar con \`npm run\`
- **dependencies**: Las librerías que tu proyecto necesita para funcionar (como \`xahau\`)

Cuando ejecutas \`npm install xahau\`, npm descarga la librería y la registra automáticamente en el campo \`dependencies\` del \`package.json\`.

### ¿Qué es node_modules/?

La carpeta \`node_modules/\` es donde npm descarga todas las librerías que tu proyecto necesita. Contiene:

- La librería \`xahau\` que instalaste
- Todas las **dependencias internas** de esa librería (otras librerías que necesita para funcionar)
- Puede contener cientos o miles de archivos

**Regla importante**: **Nunca compartas ni subas \`node_modules/\` a repositorios ni a otros ordenadores.** Esta carpeta se puede recrear en cualquier momento ejecutando \`npm install\` (npm lee el \`package.json\` y descarga todo de nuevo). Si usas Git, añade \`node_modules/\` al archivo \`.gitignore\`.

### ¿Qué es require() y cómo importar librerías?

En Node.js, usamos \`require()\` para **importar librerías** y usarlas en nuestro código:

\`\`\`
const { Client, Wallet } = require("xahau");
\`\`\`

Esta línea hace lo siguiente:
1. Busca la librería \`xahau\` dentro de \`node_modules/\`
2. Importa los objetos \`Client\` y \`Wallet\` de esa librería
3. Los almacena en constantes que puedes usar en tu código

También puedes importar archivos propios:

\`\`\`
const misFunciones = require("./utils.js");
\`\`\`

El \`./\` al inicio indica que el archivo está en el directorio actual.

### Crear y organizar archivos .js

Cada script del curso será un archivo \`.js\` independiente. Recomendamos esta organización:

\`\`\`
xahau-curso/
├── package.json
├── node_modules/
├── 01-conexion.js
├── 02-wallet.js
├── 03-balance.js
├── 04-pago.js
└── utils.js          ← Funciones compartidas (opcional)
\`\`\`

Cada archivo se ejecuta de forma independiente con \`node nombre-archivo.js\`.

### async/await: operaciones asíncronas

Cuando tu código se comunica con la blockchain, las operaciones **tardan un tiempo** (conectarse al nodo, enviar transacciones, esperar respuestas). JavaScript usa **async/await** para manejar estas operaciones sin bloquear el programa:

- **async**: Marca una función como asíncrona (puede contener operaciones que tardan)
- **await**: Pausa la ejecución hasta que la operación termine y devuelva un resultado

\`\`\`
async function consultar() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();        // Espera a que se conecte
  const datos = await client.request({ command: "server_info" }); // Espera la respuesta
  await client.disconnect();     // Espera a que se desconecte
}
\`\`\`

Sin \`await\`, el código intentaría usar la respuesta antes de recibirla, causando errores.

### Manejo de errores con try/catch

Las operaciones con la blockchain pueden fallar: el nodo puede estar caído, la red lenta, o el código puede tener un error. Usamos **try/catch** para capturar estos errores de forma controlada:

\`\`\`
try {
  // Código que puede fallar
  await client.connect();
} catch (error) {
  // Se ejecuta si algo falla
  console.error("Error:", error.message);
}
\`\`\`

**try** intenta ejecutar el código. Si algo falla, el flujo salta directamente al bloque **catch**, donde puedes mostrar el error o tomar una acción alternativa. Sin \`try/catch\`, un error detendría todo el programa abruptamente.`,
        en: `Now that you have Node.js installed and the \`xahau\` library downloaded, it's important to understand **how a Node.js project is organized** before you start writing code that interacts with the blockchain.

### What is package.json?

The \`package.json\` file is your **project's technical spec sheet**. It is created automatically when you run \`npm init -y\` and contains:

- **name**: Your project's name
- **version**: The current version
- **description**: A brief description
- **main**: The main file (by default \`index.js\`)
- **scripts**: Custom commands you can run with \`npm run\`
- **dependencies**: The libraries your project needs to work (like \`xahau\`)

When you run \`npm install xahau\`, npm downloads the library and automatically registers it in the \`dependencies\` field of \`package.json\`.

### What is node_modules/?

The \`node_modules/\` folder is where npm downloads all the libraries your project needs. It contains:

- The \`xahau\` library you installed
- All the **internal dependencies** of that library (other libraries it needs to work)
- It can contain hundreds or thousands of files

**Important rule**: **Never share or upload \`node_modules/\` to repositories or other computers.** This folder can be recreated at any time by running \`npm install\` (npm reads the \`package.json\` and downloads everything again). If you use Git, add \`node_modules/\` to the \`.gitignore\` file.

### What is require() and how to import libraries?

In Node.js, we use \`require()\` to **import libraries** and use them in our code:

\`\`\`
const { Client, Wallet } = require("xahau");
\`\`\`

This line does the following:
1. Looks for the \`xahau\` library inside \`node_modules/\`
2. Imports the \`Client\` and \`Wallet\` objects from that library
3. Stores them in constants you can use in your code

You can also import your own files:

\`\`\`
const misFunciones = require("./utils.js");
\`\`\`

The \`./\` at the beginning indicates the file is in the current directory.

### Creating and organizing .js files

Each course script will be an independent \`.js\` file. We recommend this organization:

\`\`\`
xahau-curso/
├── package.json
├── node_modules/
├── 01-connection.js
├── 02-wallet.js
├── 03-balance.js
├── 04-payment.js
└── utils.js          ← Shared functions (optional)
\`\`\`

Each file is executed independently with \`node filename.js\`.

### async/await: asynchronous operations

When your code communicates with the blockchain, operations **take time** (connecting to the node, sending transactions, waiting for responses). JavaScript uses **async/await** to handle these operations without blocking the program:

- **async**: Marks a function as asynchronous (it can contain operations that take time)
- **await**: Pauses execution until the operation finishes and returns a result

\`\`\`
async function get() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();        // Wait for it to connect
  const datos = await client.request({ command: "server_info" }); // Wait for the response
  await client.disconnect();     // Wait for it to disconnect
}
\`\`\`

Without \`await\`, the code would try to use the response before receiving it, causing errors.

### Error handling with try/catch

Blockchain operations can fail: the node might be down, the network slow, or the code might have a bug. We use **try/catch** to capture these errors in a controlled way:

\`\`\`
try {
  // Code that might fail
  await client.connect();
} catch (error) {
  // Runs if something fails
  console.error("Error:", error.message);
}
\`\`\`

**try** attempts to execute the code. If something fails, the flow jumps directly to the **catch** block, where you can display the error or take an alternative action. Without \`try/catch\`, an error would stop the entire program abruptly.`,
        jp: `Node.jsがインストールされ、\`xahau\`ライブラリがダウンロードできたら、ブロックチェーンと連携するコードを書き始める前に、**Node.jsプロジェクトの構成方法**を理解することが重要です。

### package.jsonとは？

\`package.json\`ファイルはあなたの**プロジェクトの技術仕様書**です。\`npm init -y\`を実行すると自動的に作成され、以下を含みます:

- **name**: プロジェクト名
- **version**: 現在のバージョン
- **description**: 簡単な説明
- **main**: メインファイル（デフォルトは\`index.js\`）
- **scripts**: \`npm run\`で実行できるカスタムコマンド
- **dependencies**: プロジェクトが必要とするライブラリ（\`xahau\`など）

\`npm install xahau\`を実行すると、npmがライブラリをダウンロードして\`package.json\`の\`dependencies\`フィールドに自動的に登録します。

### node_modules/とは？

\`node_modules/\`フォルダはnpmがプロジェクトに必要なすべてのライブラリをダウンロードする場所です。以下を含みます:

- インストールした\`xahau\`ライブラリ
- そのライブラリのすべての**内部依存関係**（動作に必要な他のライブラリ）
- 数百〜数千のファイルが含まれる場合がある

**重要なルール**: **\`node_modules/\`はリポジトリや他のコンピュータに共有・アップロードしないでください。** このフォルダは\`npm install\`を実行するといつでも再作成できます（npmが\`package.json\`を読んですべてを再ダウンロードします）。Gitを使用する場合は、\`.gitignore\`ファイルに\`node_modules/\`を追加してください。

### require()とライブラリのインポート方法

Node.jsでは\`require()\`を使って**ライブラリをインポート**し、コードで使用します:

\`\`\`
const { Client, Wallet } = require("xahau");
\`\`\`

この行は以下を行います:
1. \`node_modules/\`内で\`xahau\`ライブラリを探す
2. そのライブラリから\`Client\`と\`Wallet\`オブジェクトをインポートする
3. コードで使用できる定数に格納する

自分のファイルもインポートできます:

\`\`\`
const misFunciones = require("./utils.js");
\`\`\`

先頭の\`./\`はファイルが現在のディレクトリにあることを示します。

### .jsファイルの作成と整理

コースの各スクリプトは独立した\`.js\`ファイルになります。以下の整理方法を推奨します:

\`\`\`
xahau-curso/
├── package.json
├── node_modules/
├── 01-connection.js
├── 02-wallet.js
├── 03-balance.js
├── 04-payment.js
└── utils.js          ← 共有関数（任意）
\`\`\`

各ファイルは\`node ファイル名.js\`で独立して実行されます。

### async/await: 非同期操作

コードがブロックチェーンと通信する際、操作には**時間がかかります**（ノードへの接続、トランザクションの送信、レスポンスの待機）。JavaScriptは**async/await**を使ってプログラムをブロックせずにこれらの操作を処理します:

- **async**: 関数を非同期としてマークする（時間のかかる操作を含むことができる）
- **await**: 操作が完了して結果が返るまで実行を一時停止する

\`\`\`
async function get() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();        // 接続を待つ
  const datos = await client.request({ command: "server_info" }); // レスポンスを待つ
  await client.disconnect();     // 切断を待つ
}
\`\`\`

\`await\`がないと、レスポンスを受信する前にコードがそれを使おうとしてエラーが発生します。

### try/catchによるエラー処理

ブロックチェーンの操作は失敗することがあります: ノードがダウンしていたり、ネットワークが遅かったり、コードにバグがあったりします。**try/catch**を使ってこれらのエラーを制御された方法でキャッチします:

\`\`\`
try {
  // 失敗する可能性があるコード
  await client.connect();
} catch (error) {
  // 何かが失敗した場合に実行される
  console.error("エラー:", error.message);
}
\`\`\`

**try**はコードの実行を試みます。何かが失敗すると、フローは直接**catch**ブロックにジャンプし、エラーを表示したり代替アクションをとったりできます。\`try/catch\`がないと、エラーがプログラム全体を突然停止させます。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Ejemplo de package.json explicado",
            en: "package.json example explained",
            jp: "package.jsonの例（解説付き）",
          },
          language: "javascript",
          code: {
            es: `// Archivo: package.json (creado con npm init -y)
// NO necesitas editar este archivo manualmente.
// npm lo actualiza cuando instalas librerías.

{
  "name": "xahau-curso",       // Nombre del proyecto
  "version": "1.0.0",          // Versión del proyecto
  "description": "",            // Descripción (puedes rellenarla)
  "main": "index.js",          // Archivo principal (no lo usaremos)
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "xahau": "^1.0.0"          // <-- npm install xahau añadió esto
  }
}

// NOTA: node_modules/ se crea automáticamente con npm install.
// Nunca lo compartas. Se regenera con: npm install`,
            en: `// File: package.json (created with npm init -y)
// You do NOT need to edit this file manually.
// npm updates it when you install libraries.

{
  "name": "xahau-course",       // Project name
  "version": "1.0.0",          // Project version
  "description": "",            // Description (you can fill it in)
  "main": "index.js",          // Main file (we won't use it)
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "xahau": "^1.0.0"          // <-- npm install xahau added this
  }
}

// NOTE: node_modules/ is created automatically with npm install.
// Never share it. It is regenerated with: npm install`,
            jp: `// ファイル: package.json (npm init -yで作成)
// このファイルを手動で編集する必要はありません。
// ライブラリをインストールするとnpmが自動的に更新します。

{
  "name": "xahau-course",       // プロジェクト名
  "version": "1.0.0",          // プロジェクトのバージョン
  "description": "",            // 説明（入力可能）
  "main": "index.js",          // メインファイル（使用しない）
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "xahau": "^1.0.0"          // <-- npm install xahauで追加された
  }
}

// 注意: node_modules/はnpm installで自動的に作成されます。
// 共有しないでください。npm installで再生成できます。`,
          },
        },
        {
          title: {
            es: "Script básico con async/await y try/catch",
            en: "Basic script with async/await and try/catch",
            jp: "async/awaitとtry/catchを使った基本スクリプト",
          },
          language: "javascript",
          code: {
            es: `// Archivo: estructura-basica.js
// Ejecutar con: node estructura-basica.js

// 1. Importar la librería xahau desde node_modules/
const { Client, Wallet } = require("xahau");

// 2. Crear una función asíncrona (async)
async function main() {
  console.log("=== Estructura básica de un script Xahau ===");

  // 3. Usar try/catch para manejar errores
  try {
    // 4. await espera a que cada operación termine
    const client = new Client("wss://xahau-test.net");
    console.log("Conectando al nodo...");
    await client.connect();
    console.log("Conectado correctamente.");

    // 5. Consultar la blockchain
    const response = await client.request({
      command: "server_info"
    });

    const info = response.result.info;
    console.log("Información del servidor:");
    console.log("Red:", info.network_id);
    console.log("Versión:", info.build_version);
    console.log("Ledger:", info.validated_ledger.seq);

    // 6. Desconectar limpiamente
    await client.disconnect();
    console.log("Desconectado correctamente.");

  } catch (error) {
    // 7. Si algo falla, mostramos el error sin romper el programa
    console.error("¡Error encontrado!");
    console.error("Tipo:", error.name);
    console.error("Mensaje:", error.message);
  }
}

// 8. Ejecutar la función principal
main();`,
            en: `// File:basic-structure.js
// Run with: node basic-structure.js

// 1. Import the xahau library from node_modules/
const { Client, Wallet } = require("xahau");

// 2. Create an asynchronous (async) function
async function main() {
  console.log("=== Basic structure of a Xahau script ===");

  // 3. Use try/catch to handle errors
  try {
    // 4. await waits for each operation to finish
    const client = new Client("wss://xahau-test.net");
    console.log("Connecting to the node...");
    await client.connect();
    console.log("Connected successfully.");

    // 5. Query the blockchain
    const response = await client.request({
      command: "server_info"
    });

    const info = response.result.info;
    console.log("Server information:");
    console.log("Network:", info.network_id);
    console.log("Version:", info.build_version);
    console.log("Ledger:", info.validated_ledger.seq);

    // 6. Disconnect cleanly
    await client.disconnect();
    console.log("Disconnected correctly.");

  } catch (error) {
    // 7. If something fails, we show the error without crashing the program
    console.error("Error found!");
    console.error("Type:", error.name);
    console.error("Message:", error.message);
  }
}

// 8. Execute the main function
main();`,
            jp: `// ファイル: basic-structure.js
// 実行: node basic-structure.js

// 1. node_modules/からxahauライブラリをインポート
const { Client, Wallet } = require("xahau");

// 2. 非同期(async)関数を作成する
async function main() {
  console.log("=== Xahauスクリプトの基本構造 ===");

  // 3. try/catchでエラーを処理する
  try {
    // 4. awaitで各操作の完了を待つ
    const client = new Client("wss://xahau-test.net");
    console.log("ノードに接続中...");
    await client.connect();
    console.log("正常に接続しました。");

    // 5. ブロックチェーンに問い合わせる
    const response = await client.request({
      command: "server_info"
    });

    const info = response.result.info;
    console.log("サーバー情報:");
    console.log("ネットワーク:", info.network_id);
    console.log("バージョン:", info.build_version);
    console.log("レジャー:", info.validated_ledger.seq);

    // 6. 正常に切断する
    await client.disconnect();
    console.log("正常に切断しました。");

  } catch (error) {
    // 7. 何かが失敗した場合、プログラムをクラッシュさせずにエラーを表示
    console.error("エラーが発生しました！");
    console.error("種類:", error.name);
    console.error("メッセージ:", error.message);
  }
}

// 8. メイン関数を実行する
main();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Anatomía de un proyecto Node.js", en: "Anatomy of a Node.js Project", jp: "Node.jsプロジェクトの構造" },
          content: {
            es: "package.json → Ficha técnica del proyecto\n\nnode_modules/ → Librerías descargadas\n  (nunca compartir, se regenera con npm install)\n\narchivo.js → Tu código\n  (se ejecuta con: node archivo.js)",
            en: "package.json → Project's technical spec sheet\n\nnode_modules/ → Downloaded libraries\n  (never share, regenerated with npm install)\n\nfile.js → Your code\n  (run with: node file.js)",
            jp: "package.json → プロジェクトの技術仕様書\n\nnode_modules/ → ダウンロードされたライブラリ\n  （共有しない、npm installで再生成可能）\n\nfile.js → あなたのコード\n  （実行: node file.js）",
          },
          visual: "📁",
        },
        {
          title: { es: "require() e importaciones", en: "require() and imports", jp: "require()とインポート" },
          content: {
            es: "Importar librerías instaladas:\nconst { Client, Wallet } = require(\"xahau\");\n\nImportar archivos propios:\nconst utils = require(\"./utils.js\");\n\nrequire() busca en node_modules/ o en la ruta indicada",
            en: "Import installed libraries:\nconst { Client, Wallet } = require(\"xahau\");\n\nImport your own files:\nconst utils = require(\"./utils.js\");\n\nrequire() searches in node_modules/ or in the specified path",
            jp: "インストール済みライブラリのインポート:\nconst { Client, Wallet } = require(\"xahau\");\n\n自分のファイルのインポート:\nconst utils = require(\"./utils.js\");\n\nrequire()はnode_modules/または指定されたパスを検索する",
          },
          visual: "📦",
        },
        {
          title: { es: "async/await y try/catch", en: "async/await and try/catch", jp: "async/awaitとtry/catch" },
          content: {
            es: "async → Marca funciones que hacen operaciones lentas\nawait → Espera a que la operación termine\n\ntry { } → Intenta ejecutar el código\ncatch (error) { } → Captura errores sin romper el programa\n\nIndispensables para trabajar con blockchain",
            en: "async → Marks functions that perform slow operations\nawait → Waits for the operation to finish\n\ntry { } → Attempts to execute the code\ncatch (error) { } → Catches errors without crashing the program\n\nEssential for working with blockchain",
            jp: "async → 時間のかかる操作を行う関数をマーク\nawait → 操作の完了を待つ\n\ntry { } → コードの実行を試みる\ncatch (error) { } → プログラムをクラッシュさせずにエラーをキャッチ\n\nブロックチェーン操作に不可欠",
          },
          visual: "⏳",
        },
      ],
    },
    {
      id: "m0l5",
      title: {
        es: "Ejecutar y depurar scripts",
        en: "Running and Debugging Scripts",
        jp: "スクリプトの実行とデバッグ",
      },
      theory: {
        es: `Ya sabes cómo se estructura un proyecto Node.js. Ahora vamos a aprender a **ejecutar scripts** y, lo más importante, a **entender y solucionar los errores** que inevitablemente aparecerán.

### Ejecutar scripts con Node.js

Para ejecutar cualquier archivo JavaScript, usa el comando:

\`\`\`
node nombre-del-archivo.js
\`\`\`

Por ejemplo:
\`\`\`
node hola-xahau.js
node 01-conexion.js
node mi-script.js
\`\`\`

**Importante**: Debes estar en el directorio donde está el archivo, o usar la ruta completa. Si el archivo no se encuentra, verás un error.

### Leer mensajes de error (stack traces)

Cuando algo falla, Node.js muestra un **stack trace** — un mensaje con información sobre el error. Aprende a leerlo:

\`\`\`
/Users/tu-nombre/xahau-curso/mi-script.js:5
  const response = await client.request({
                   ^^^^^
SyntaxError: await is only valid in async functions
    at Object.compileFunction (node:vm:360:18)
    at wrapSafe (node:internal/modules/cjs/loader:1124:15)
    at /Users/tu-nombre/xahau-curso/mi-script.js:5:20
\`\`\`

Cómo leerlo:
1. **Primera línea**: El archivo y la línea donde ocurrió el error (\`mi-script.js:5\`)
2. **Tipo de error**: \`SyntaxError\`, \`TypeError\`, \`ReferenceError\`, etc.
3. **Mensaje**: Explicación del problema (\`await is only valid in async functions\`)
4. **Stack trace**: Ruta de ejecución que llevó al error (de más reciente a más antiguo)

### Usar console.log para depurar

\`console.log()\` es tu mejor herramienta de depuración. Úsala para ver el valor de variables en cualquier punto del código:

\`\`\`
console.log("Paso 1: Conectando...");
console.log("Valor de response:", response);
console.log("Tipo de dato:", typeof variable);
console.log("Objeto completo:", JSON.stringify(objeto, null, 2));
\`\`\`

**Tip**: Usa \`JSON.stringify(objeto, null, 2)\` para imprimir objetos grandes de forma legible (con indentación de 2 espacios).

### Errores comunes y cómo solucionarlos

**Error: Cannot find module 'xahau'**
\`\`\`
Error: Cannot find module 'xahau'
\`\`\`
Causa: No has instalado la librería o no estás en el directorio correcto.
Solución: Ejecuta \`npm install xahau\` en la carpeta de tu proyecto.

**Error: await is only valid in async functions**
\`\`\`
SyntaxError: await is only valid in async functions
\`\`\`
Causa: Estás usando \`await\` fuera de una función marcada con \`async\`.
Solución: Envuelve tu código en una función \`async\`:
\`\`\`
async function main() { ... }
main();
\`\`\`

**Error: Unexpected token**
\`\`\`
SyntaxError: Unexpected token ')'
\`\`\`
Causa: Error de sintaxis — falta una coma, un paréntesis, una llave, etc.
Solución: Revisa la línea indicada y las líneas anteriores. Busca paréntesis o llaves sin cerrar.

**Error: connect ETIMEDOUT / ECONNREFUSED**
\`\`\`
Error: connect ETIMEDOUT wss://xahau-test.net
\`\`\`
Causa: No se puede conectar al nodo de Xahau (red caída, firewall, sin internet).
Solución: Verifica tu conexión a internet. Si persiste, prueba otro nodo o espera unos minutos.

**Error: Account not found**
\`\`\`
Error: Account not found.
\`\`\`
Causa: La cuenta que estás consultando no existe en el ledger o no ha sido activada.
Solución: Verifica que la dirección sea correcta. En testnet, usa el faucet para activar cuentas.

### Tips para depurar conexiones blockchain

1. **Prueba la conexión primero**: Antes de hacer operaciones complejas, verifica que puedes conectarte al nodo
2. **Usa try/catch siempre**: Cualquier operación de red puede fallar
3. **Revisa la URL del nodo**: \`wss://xahau-test.net\` para testnet, \`wss://xahau.network\` para mainnet
4. **Desconecta siempre al terminar**: Usa \`await client.disconnect()\` para liberar recursos
5. **Añade timeouts**: Si una operación tarda demasiado, puede que el nodo esté saturado`,
        en: `You already know how a Node.js project is structured. Now we are going to learn how to **run scripts** and, most importantly, how to **understand and fix the errors** that will inevitably appear.

### Running scripts with Node.js

To run any JavaScript file, use the command:

\`\`\`
node filename.js
\`\`\`

For example:
\`\`\`
node hi-xahau.js
node 01-connection.js
node my-script.js
\`\`\`

**Important**: You must be in the directory where the file is located, or use the full path. If the file is not found, you will see an error.

### Reading error messages (stack traces)

When something fails, Node.js displays a **stack trace** — a message with information about the error. Learn to read it:

\`\`\`
/Users/your-name/xahau-curso/mi-script.js:5
  const response = await client.request({
                   ^^^^^
SyntaxError: await is only valid in async functions
    at Object.compileFunction (node:vm:360:18)
    at wrapSafe (node:internal/modules/cjs/loader:1124:15)
    at /Users/your-name/xahau-curso/mi-script.js:5:20
\`\`\`

How to read it:
1. **First line**: The file and line where the error occurred (\`mi-script.js:5\`)
2. **Error type**: \`SyntaxError\`, \`TypeError\`, \`ReferenceError\`, etc.
3. **Message**: Explanation of the problem (\`await is only valid in async functions\`)
4. **Stack trace**: Execution path that led to the error (from most recent to oldest)

### Using console.log for debugging

\`console.log()\` is your best debugging tool. Use it to see the value of variables at any point in the code:

\`\`\`
console.log("Step 1: Connecting...");
console.log("Value of response:", response);
console.log("Data type:", typeof variable);
console.log("Full object:", JSON.stringify(object, null, 2));
\`\`\`

**Tip**: Use \`JSON.stringify(object, null, 2)\` to print large objects in a readable format (with 2-space indentation).

### Common errors and how to fix them

**Error: Cannot find module 'xahau'**
\`\`\`
Error: Cannot find module 'xahau'
\`\`\`
Cause: You haven't installed the library or you're not in the correct directory.
Solution: Run \`npm install xahau\` in your project folder.

**Error: await is only valid in async functions**
\`\`\`
SyntaxError: await is only valid in async functions
\`\`\`
Cause: You are using \`await\` outside of a function marked with \`async\`.
Solution: Wrap your code in an \`async\` function:
\`\`\`
async function main() { ... }
main();
\`\`\`

**Error: Unexpected token**
\`\`\`
SyntaxError: Unexpected token ')'
\`\`\`
Cause: Syntax error — a comma, parenthesis, brace, etc. is missing.
Solution: Check the indicated line and the lines before it. Look for unclosed parentheses or braces.

**Error: connect ETIMEDOUT / ECONNREFUSED**
\`\`\`
Error: connect ETIMEDOUT wss://xahau-test.net
\`\`\`
Cause: Cannot connect to the Xahau node (network down, firewall, no internet).
Solution: Check your internet connection. If it persists, try another node or wait a few minutes.

**Error: Account not found**
\`\`\`
Error: Account not found.
\`\`\`
Cause: The account you are querying does not exist in the ledger or has not been activated.
Solution: Verify that the address is correct. On testnet, use the faucet to activate accounts.

### Tips for debugging blockchain connections

1. **Test the connection first**: Before performing complex operations, verify that you can connect to the node
2. **Always use try/catch**: Any network operation can fail
3. **Check the node URL**: \`wss://xahau-test.net\` for testnet, \`wss://xahau.network\` for mainnet
4. **Always disconnect when done**: Use \`await client.disconnect()\` to free resources
5. **Add timeouts**: If an operation takes too long, the node might be overloaded`,
        jp: `Node.jsプロジェクトの構造について理解できました。次は**スクリプトの実行方法**と、最も重要なこと — 必ず発生する**エラーの理解と解決方法**を学びます。

### Node.jsでスクリプトを実行する

任意のJavaScriptファイルを実行するには、以下のコマンドを使用します:

\`\`\`
node ファイル名.js
\`\`\`

例えば:
\`\`\`
node hi-xahau.js
node 01-connection.js
node my-script.js
\`\`\`

**重要**: ファイルがあるディレクトリにいる必要があります（フルパスを使用することも可能）。ファイルが見つからない場合はエラーが表示されます。

### エラーメッセージの読み方（スタックトレース）

何かが失敗すると、Node.jsは**スタックトレース** — エラーに関する情報を含むメッセージを表示します。読み方を学びましょう:

\`\`\`
/Users/your-name/xahau-curso/mi-script.js:5
  const response = await client.request({
                   ^^^^^
SyntaxError: await is only valid in async functions
    at Object.compileFunction (node:vm:360:18)
    at wrapSafe (node:internal/modules/cjs/loader:1124:15)
    at /Users/your-name/xahau-curso/mi-script.js:5:20
\`\`\`

読み方:
1. **1行目**: エラーが発生したファイルと行番号（\`mi-script.js:5\`）
2. **エラーの種類**: \`SyntaxError\`、\`TypeError\`、\`ReferenceError\`など
3. **メッセージ**: 問題の説明（\`await is only valid in async functions\`）
4. **スタックトレース**: エラーに至った実行パス（最新から古い順）

### デバッグにconsole.logを使う

\`console.log()\`はあなたの最良のデバッグツールです。コードの任意の時点で変数の値を確認するために使用します:

\`\`\`
console.log("ステップ1: 接続中...");
console.log("responseの値:", response);
console.log("データ型:", typeof variable);
console.log("オブジェクト全体:", JSON.stringify(object, null, 2));
\`\`\`

**ヒント**: \`JSON.stringify(object, null, 2)\`を使って大きなオブジェクトを読みやすい形式（2スペースのインデント）で表示します。

### よくあるエラーとその解決方法

**Error: Cannot find module 'xahau'**
\`\`\`
Error: Cannot find module 'xahau'
\`\`\`
原因: ライブラリをインストールしていないか、正しいディレクトリにいない。
解決策: プロジェクトフォルダで\`npm install xahau\`を実行してください。

**Error: await is only valid in async functions**
\`\`\`
SyntaxError: await is only valid in async functions
\`\`\`
原因: \`async\`でマークされた関数の外で\`await\`を使用している。
解決策: コードを\`async\`関数で囲む:
\`\`\`
async function main() { ... }
main();
\`\`\`

**Error: Unexpected token**
\`\`\`
SyntaxError: Unexpected token ')'
\`\`\`
原因: 構文エラー — カンマ、括弧、波括弧などが不足している。
解決策: 示された行とその前の行を確認してください。閉じられていない括弧や波括弧を探してください。

**Error: connect ETIMEDOUT / ECONNREFUSED**
\`\`\`
Error: connect ETIMEDOUT wss://xahau-test.net
\`\`\`
原因: Xahauノードに接続できない（ネットワークダウン、ファイアウォール、インターネットなし）。
解決策: インターネット接続を確認してください。続く場合は別のノードを試すか数分待ってください。

**Error: Account not found**
\`\`\`
Error: Account not found.
\`\`\`
原因: 照会しているアカウントがレジャーに存在しないか、アクティブ化されていない。
解決策: アドレスが正しいか確認してください。テストネットではfaucetを使用してアカウントをアクティブ化してください。

### ブロックチェーン接続デバッグのヒント

1. **まず接続をテストする**: 複雑な操作を行う前に、ノードに接続できることを確認する
2. **常にtry/catchを使用する**: どんなネットワーク操作も失敗する可能性がある
3. **ノードのURLを確認する**: テストネットは\`wss://xahau-test.net\`、メインネットは\`wss://xahau.network\`
4. **終了時は常に切断する**: リソースを解放するために\`await client.disconnect()\`を使用する
5. **タイムアウトを追加する**: 操作に時間がかかりすぎる場合は、ノードが過負荷になっている可能性がある`,
      },
      codeBlocks: [
        {
          title: {
            es: "Script con manejo de errores y depuración",
            en: "Script with error handling and debugging",
            jp: "エラー処理とデバッグ付きスクリプト",
          },
          language: "javascript",
          code: {
            es: `// Archivo: depurar-errores.js
// Ejecutar con: node depurar-errores.js
// Este script muestra cómo manejar errores paso a paso.

const { Client } = require("xahau");

async function main() {
  console.log("=== Depuración de Errores en Xahau ===");

  // Paso 1: Verificar que la librería se importó correctamente
  console.log("1. Librería xahau importada correctamente");
  console.log("   Tipo de Client:", typeof Client);

  // Paso 2: Crear el cliente
  const client = new Client("wss://xahau-test.net");
  console.log("2. Cliente creado para:", "wss://xahau-test.net");

  // Paso 3: Intentar conectar con manejo de errores
  try {
    console.log("3. Intentando conectar...");
    await client.connect();
    console.log("   Conectado correctamente");
  } catch (error) {
    console.error("   ERROR al conectar:", error.message);
    console.error("   Posibles causas:");
    console.error("   - Sin conexión a internet");
    console.error("   - El nodo está caído");
    console.error("   - Firewall bloqueando WebSocket");
    return; // Salir de la función si no podemos conectar
  }

  // Paso 4: Hacer una consulta
  try {
    console.log("4. Consultando server_info...");
    const response = await client.request({
      command: "server_info"
    });

    // Paso 5: Inspeccionar la respuesta
    console.log("5. Respuesta recibida:");
    console.log("   Tipo:", typeof response);
    console.log("   Claves:", Object.keys(response.result));

    const info = response.result.info;
    console.log("   Red:", info.network_id);
    console.log("   Ledger:", info.validated_ledger.seq);
  } catch (error) {
    console.error("   ERROR en la consulta:", error.message);
  }

  // Paso 6: Desconectar
  try {
    await client.disconnect();
    console.log("6. Desconectado correctamente");
  } catch (error) {
    console.error("   ERROR al desconectar:", error.message);
  }

  console.log("=== Fin de la depuración ===");
}

main();`,
            en: `// File: debug-errors.js
// Run with: node debug-errors.js
// This script shows how to handle errors step by step.

const { Client } = require("xahau");

async function main() {
  console.log("=== Error Debugging in Xahau ===");

  // Step 1: Verify that the library was imported correctly
  console.log("1. xahau library imported correctly");
  console.log("   Type of Client:", typeof Client);

  // Step 2: Create the client
  const client = new Client("wss://xahau-test.net");
  console.log("2. Client created for:", "wss://xahau-test.net");

  // Step 3: Try to connect with error handling
  try {
    console.log("3. Attempting to connect...");
    await client.connect();
    console.log("   Connected successfully");
  } catch (error) {
    console.error("   ERROR connecting:", error.message);
    console.error("   Possible causes:");
    console.error("   - No internet connection");
    console.error("   - The node is down");
    console.error("   - Firewall blocking WebSocket");
    return; // Exit the function if we can't connect
  }

  // Step 4: Make a query
  try {
    console.log("4. Querying server_info...");
    const response = await client.request({
      command: "server_info"
    });

    // Step 5: Inspect the response
    console.log("5. Response received:");
    console.log("   Type:", typeof response);
    console.log("   Keys:", Object.keys(response.result));

    const info = response.result.info;
    console.log("   Network:", info.network_id);
    console.log("   Ledger:", info.validated_ledger.seq);
  } catch (error) {
    console.error("   ERROR in query:", error.message);
  }

  // Step 6: Disconnect
  try {
    await client.disconnect();
    console.log("6. Disconnected correctly");
  } catch (error) {
    console.error("   ERROR disconnecting:", error.message);
  }

  console.log("=== End of debugging ===");
}

main();`,
            jp: `// ファイル: debug-errors.js
// 実行: node debug-errors.js
// このスクリプトはエラーを段階的に処理する方法を示します。

const { Client } = require("xahau");

async function main() {
  console.log("=== Xahauのエラーデバッグ ===");

  // ステップ1: ライブラリが正しくインポートされたか確認する
  console.log("1. xahauライブラリが正常にインポートされました");
  console.log("   Clientの型:", typeof Client);

  // ステップ2: クライアントを作成する
  const client = new Client("wss://xahau-test.net");
  console.log("2. クライアントを作成しました:", "wss://xahau-test.net");

  // ステップ3: エラー処理付きで接続を試みる
  try {
    console.log("3. 接続を試みています...");
    await client.connect();
    console.log("   正常に接続しました");
  } catch (error) {
    console.error("   接続エラー:", error.message);
    console.error("   考えられる原因:");
    console.error("   - インターネット接続なし");
    console.error("   - ノードがダウンしている");
    console.error("   - WebSocketをブロックするファイアウォール");
    return; // 接続できない場合は関数を終了する
  }

  // ステップ4: 問い合わせを行う
  try {
    console.log("4. server_infoを照会中...");
    const response = await client.request({
      command: "server_info"
    });

    // ステップ5: レスポンスを確認する
    console.log("5. レスポンスを受信:");
    console.log("   型:", typeof response);
    console.log("   キー:", Object.keys(response.result));

    const info = response.result.info;
    console.log("   ネットワーク:", info.network_id);
    console.log("   レジャー:", info.validated_ledger.seq);
  } catch (error) {
    console.error("   照会エラー:", error.message);
  }

  // ステップ6: 切断する
  try {
    await client.disconnect();
    console.log("6. 正常に切断しました");
  } catch (error) {
    console.error("   切断エラー:", error.message);
  }

  console.log("=== デバッグ終了 ===");
}

main();`,
          },
        },
        {
          title: {
            es: "Test de conectividad y errores comunes",
            en: "Connectivity test and common errors",
            jp: "接続テストとよくあるエラー",
          },
          language: "javascript",
          code: {
            es: `// Archivo: test-conectividad.js
// Ejecutar con: node test-conectividad.js
// Prueba la conexión y muestra errores comunes.

const { Client } = require("xahau");

// Función auxiliar para probar una conexión
async function testConexion(url, nombre) {
  console.log("Probando:", nombre, "(" + url + ")");

  const client = new Client(url);

  try {
    await client.connect();
    const response = await client.request({ command: "server_info" });
    const ledger = response.result.info.validated_ledger.seq;
    console.log("Conectado - Ledger:", ledger);
    await client.disconnect();
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
}

async function main() {
  console.log("=== Test de Conectividad de Xahau ===");

  // Test 1: Conexión al testnet (debería funcionar)
  await testConexion("wss://xahau-test.net", "Xahau Testnet");

  console.log("");

  // Test 2: Conexión al mainnet (debería funcionar)
  await testConexion("wss://xahau.network", "Xahau Mainnet");

  console.log("");

  // Test 3: URL incorrecta (debería fallar - ejemplo de error)
  await testConexion("wss://nodo-que-no-existe.example.com", "URL incorrecta");

  console.log("=== Resumen ===");
  console.log("Si testnet y mainnet conectan: tu entorno está listo.");
  console.log("Si alguno falla: comprueba tu conexión a internet.");
  console.log("La URL incorrecta DEBE fallar (es un test de error).");
}

main();`,
            en: `// File: connectivity-test.js
// Run with: node connectivity-test.js
// Tests the connection and shows common errors.

const { Client } = require("xahau");

// Helper function to test a connection
async function testConexion(url, nombre) {
  console.log("Testing:", nombre, "(" + url + ")");

  const client = new Client(url);

  try {
    await client.connect();
    const response = await client.request({ command: "server_info" });
    const ledger = response.result.info.validated_ledger.seq;
    console.log("Connected - Ledger:", ledger);
    await client.disconnect();
    return true;
  } catch (error) {
    console.log("Error:", error.message);
    return false;
  }
}

async function main() {
  console.log("=== Xahau Connectivity Test ===");

  // Test 1: Connection to testnet (should work)
  await testConexion("wss://xahau-test.net", "Xahau Testnet");

  console.log("");

  // Test 2: Connection to mainnet (should work)
  await testConexion("wss://xahau.network", "Xahau Mainnet");

  console.log("");

  // Test 3: Incorrect URL (should fail - error example)
  await testConexion("wss://nodo-doesnt-exist.example.com", "Incorrect URL");

  console.log("=== Summary ===");
  console.log("If testnet and mainnet connect: your environment is ready.");
  console.log("If any fails: check your internet connection.");
  console.log("The incorrect URL MUST fail (it's an error test).");
}

main();`,
            jp: `// ファイル: connectivity-test.js
// 実行: node connectivity-test.js
// 接続をテストしてよくあるエラーを表示します。

const { Client } = require("xahau");

// 接続をテストするためのヘルパー関数
async function testConexion(url, nombre) {
  console.log("テスト中:", nombre, "(" + url + ")");

  const client = new Client(url);

  try {
    await client.connect();
    const response = await client.request({ command: "server_info" });
    const ledger = response.result.info.validated_ledger.seq;
    console.log("接続済み - レジャー:", ledger);
    await client.disconnect();
    return true;
  } catch (error) {
    console.log("エラー:", error.message);
    return false;
  }
}

async function main() {
  console.log("=== Xahau接続テスト ===");

  // テスト1: テストネットへの接続（動作するはず）
  await testConexion("wss://xahau-test.net", "Xahau Testnet");

  console.log("");

  // テスト2: メインネットへの接続（動作するはず）
  await testConexion("wss://xahau.network", "Xahau Mainnet");

  console.log("");

  // テスト3: 無効なURL（失敗するはず - エラーの例）
  await testConexion("wss://nodo-doesnt-exist.example.com", "無効なURL");

  console.log("=== まとめ ===");
  console.log("テストネットとメインネットが接続できれば: 環境の準備ができています。");
  console.log("いずれかが失敗した場合: インターネット接続を確認してください。");
  console.log("無効なURLは失敗しなければなりません（これはエラーテストです）。");
}

main();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Ejecutar scripts", en: "Running Scripts", jp: "スクリプトの実行" },
          content: {
            es: "Comando básico:\nnode nombre-archivo.js\n\nDebes estar en la carpeta del proyecto\n(donde está package.json y node_modules/)\n\nEjemplo:\ncd xahau-curso\nnode hola-xahau.js",
            en: "Basic command:\nnode filename.js\n\nYou must be in the project folder\n(where package.json and node_modules/ are)\n\nExample:\ncd xahau-curso\nnode hola-xahau.js",
            jp: "基本コマンド:\nnode ファイル名.js\n\nプロジェクトフォルダにいる必要があります\n（package.jsonとnode_modules/がある場所）\n\n例:\ncd xahau-curso\nnode hola-xahau.js",
          },
          visual: "▶️",
        },
        {
          title: { es: "Leer errores (stack trace)", en: "Reading Errors (Stack Trace)", jp: "エラーの読み方（スタックトレース）" },
          content: {
            es: "1. Archivo y línea del error → mi-script.js:5\n2. Tipo de error → SyntaxError, TypeError...\n3. Mensaje → Qué salió mal\n4. Stack trace → Ruta de ejecución\n\nSiempre empieza leyendo el TIPO y el MENSAJE",
            en: "1. File and line of the error → mi-script.js:5\n2. Error type → SyntaxError, TypeError...\n3. Message → What went wrong\n4. Stack trace → Execution path\n\nAlways start by reading the TYPE and MESSAGE",
            jp: "1. エラーのファイルと行番号 → mi-script.js:5\n2. エラーの種類 → SyntaxError、TypeError...\n3. メッセージ → 何が問題だったか\n4. スタックトレース → 実行パス\n\nまず種類とメッセージを読むことから始める",
          },
          visual: "🔍",
        },
        {
          title: { es: "Errores más comunes", en: "Most Common Errors", jp: "よくあるエラー" },
          content: {
            es: "Cannot find module 'xahau'\n  → npm install xahau\n\nawait is only valid in async functions\n  → Envolver en async function\n\nconnect ETIMEDOUT\n  → Verificar internet / nodo\n\nUnexpected token\n  → Revisar sintaxis (comas, llaves)",
            en: "Cannot find module 'xahau'\n  → npm install xahau\n\nawait is only valid in async functions\n  → Wrap in async function\n\nconnect ETIMEDOUT\n  → Check internet / node\n\nUnexpected token\n  → Check syntax (commas, braces)",
            jp: "Cannot find module 'xahau'\n  → npm install xahau\n\nawait is only valid in async functions\n  → async関数でラップする\n\nconnect ETIMEDOUT\n  → インターネット/ノードを確認\n\nUnexpected token\n  → 構文を確認（カンマ、波括弧）",
          },
          visual: "⚠️",
        },
      ],
    },
    {
      id: "m0l6",
      title: {
        es: "Guardar claves de forma segura con .env",
        en: "Storing Keys Securely with .env",
        jp: ".envで安全にキーを保管する",
      },
      theory: {
        es: `A lo largo del curso vamos a trabajar con **seeds** (claves privadas) de cuentas de Xahau. Es fundamental que aprendas desde el principio a guardarlas de forma segura, incluso en testnet, para crear buenos hábitos que te protejan en mainnet.

### ¿Por qué NO poner claves directamente en el código?

Imagina que tienes esto en tu script:

\`\`\`
const wallet = Wallet.fromSeed("sEdV9mHTYLPKPPPfBGB9xpGnFxsQo4r");
\`\`\`

Esto es **muy peligroso** por varias razones:

- Si subes tu código a **GitHub** (u otro repositorio), cualquiera puede ver tu clave privada y robar tus fondos
- Si compartes el archivo con alguien (por email, chat, etc.), estás compartiendo tu clave
- Los bots de GitHub **escanean repositorios públicos** buscando claves privadas expuestas y roban fondos automáticamente en segundos
- Incluso si borras la clave después, el historial de Git **la conserva** y sigue siendo accesible

### ¿Qué es un archivo .env?

Un archivo \`.env\` (de "environment", entorno) es un archivo de texto plano que almacena **variables de entorno**, configuraciones sensibles que tu código necesita pero que no deben estar en el código fuente:

\`\`\`
WALLET_A_SEED=sEdVxxxTuSeedDeTestnet
WALLET_B_SEED=sEdYyyOtraSeedDeTestnet
XAHAU_NODE=wss://xahau-test.net
\`\`\`

### Reglas del archivo .env

- **Nunca subas .env a Git**: Añádelo siempre a \`.gitignore\`
- **Un .env por entorno**: Puedes tener uno para testnet y otro para mainnet
- **Sin comillas** (a menos que el valor tenga espacios): \`CLAVE=valor\`
- **Sin espacios** alrededor del \`=\`: \`CLAVE=valor\` (correcto) vs \`CLAVE = valor\` (incorrecto)
- **Cada variable en una línea**

### Instalar dotenv

La librería \`dotenv\` lee el archivo \`.env\` y carga las variables en \`process.env\`:

\`\`\`
npm install dotenv
\`\`\`

### Cómo usar dotenv en tu código

Al inicio de tu script, añade una sola línea:

\`\`\`
require("dotenv").config();
\`\`\`

Esto carga todas las variables del archivo \`.env\` en el objeto \`process.env\`. Después puedes acceder a ellas así:

\`\`\`
const seed = process.env.WALLET_A_SEED;
const nodo = process.env.XAHAU_NODE;
\`\`\`

### Crear el archivo .gitignore

El archivo \`.gitignore\` le dice a Git qué archivos **no debe rastrear ni subir** al repositorio. Crea un archivo llamado \`.gitignore\` en la raíz de tu proyecto con este contenido:

\`\`\`
.env
node_modules/
\`\`\`

Esto protege tanto tus claves (\`.env\`) como las librerías descargadas (\`node_modules/\`).

### Flujo de trabajo recomendado

1. Crea tu archivo \`.env\` con las claves
2. Crea o actualiza tu \`.gitignore\` para excluir \`.env\`
3. En cada script, carga dotenv al inicio: \`require("dotenv").config()\`
4. Accede a las claves con \`process.env.NOMBRE_VARIABLE\`
5. Si compartes tu código, crea un archivo \`.env.example\` (sin valores reales) para que otros sepan qué variables necesitan

### Implicaciones de seguridad

- **Testnet**: Si se filtra un seed de testnet, no pierdes dinero real, pero alguien podría interferir con tus pruebas
- **Mainnet**: Si se filtra un seed de mainnet, **puedes perder todos tus fondos de forma irreversible**. No hay forma de recuperar fondos robados en una blockchain
- **Repositorios públicos**: Una vez que un seed se sube a un repo público, considéralo **comprometido**. Mueve tus fondos a una nueva cuenta inmediatamente
- **Historial de Git**: Incluso si borras el archivo, el seed sigue en el historial. Necesitarías reescribir la historia de Git, lo cual es complicado`,
        en: `Throughout the course we will work with **seeds** (private keys) of Xahau accounts. It is essential that you learn from the beginning how to store them securely, even on testnet, to build good habits that will protect you on mainnet.

### Why NOT put keys directly in the code?

Imagine you have this in your script:

\`\`\`
const wallet = Wallet.fromSeed("sEdV9mHTYLPKPPPfBGB9xpGnFxsQo4r");
\`\`\`

This is **very dangerous** for several reasons:

- If you upload your code to **GitHub** (or another repository), anyone can see your private key and steal your funds
- If you share the file with someone (via email, chat, etc.), you are sharing your key
- GitHub bots **scan public repositories** looking for exposed private keys and steal funds automatically within seconds
- Even if you delete the key afterwards, the Git history **preserves it** and it remains accessible

### What is a .env file?

A \`.env\` file (short for "environment") is a plain text file that stores **environment variables**, sensitive configurations your code needs but that should not be in the source code:

\`\`\`
WALLET_A_SEED=sEdVxxxYourTestnetSeed
WALLET_B_SEED=sEdYyyAnotherTestnetSeed
XAHAU_NODE=wss://xahau-test.net
\`\`\`

### .env file rules

- **Never upload .env to Git**: Always add it to \`.gitignore\`
- **One .env per environment**: You can have one for testnet and another for mainnet
- **No quotes** (unless the value has spaces): \`KEY=value\`
- **No spaces** around \`=\`: \`KEY=value\` (correct) vs \`KEY = value\` (incorrect)
- **Each variable on its own line**

### Install dotenv

The \`dotenv\` library reads the \`.env\` file and loads the variables into \`process.env\`:

\`\`\`
npm install dotenv
\`\`\`

### How to use dotenv in your code

At the beginning of your script, add a single line:

\`\`\`
require("dotenv").config();
\`\`\`

This loads all variables from the \`.env\` file into the \`process.env\` object. Then you can access them like this:

\`\`\`
const seed = process.env.WALLET_A_SEED;
const node = process.env.XAHAU_NODE;
\`\`\`

### Create the .gitignore file

The \`.gitignore\` file tells Git which files **it should not track or upload** to the repository. Create a file named \`.gitignore\` in the root of your project with this content:

\`\`\`
.env
node_modules/
\`\`\`

This protects both your keys (\`.env\`) and the downloaded libraries (\`node_modules/\`).

### Recommended workflow

1. Create your \`.env\` file with the keys
2. Create or update your \`.gitignore\` to exclude \`.env\`
3. In each script, load dotenv at the beginning: \`require("dotenv").config()\`
4. Access keys with \`process.env.VARIABLE_NAME\`
5. If you share your code, create a \`.env.example\` file (without real values) so others know which variables they need

### Security implications

- **Testnet**: If a testnet seed is leaked, you don't lose real money, but someone could interfere with your tests
- **Mainnet**: If a mainnet seed is leaked, **you can lose all your funds irreversibly**. There is no way to recover stolen funds on a blockchain
- **Public repositories**: Once a seed is uploaded to a public repo, consider it **compromised**. Move your funds to a new account immediately
- **Git history**: Even if you delete the file, the seed remains in the history. You would need to rewrite Git history, which is complicated`,
        jp: `コース全体を通じて、Xahauアカウントの**シード**（秘密鍵）を扱います。テストネットであっても、最初から安全に保管する方法を学ぶことが重要です。これがメインネットでの保護につながる良い習慣となります。

### なぜコードに直接キーを入れてはいけないのか？

スクリプトに次のようなコードがあるとします:

\`\`\`
const wallet = Wallet.fromSeed("sEdV9mHTYLPKPPPfBGB9xpGnFxsQo4r");
\`\`\`

これはいくつかの理由で**非常に危険**です:

- **GitHub**（または他のリポジトリ）にコードをアップロードすると、誰でもあなたの秘密鍵を見て資金を盗むことができる
- ファイルを誰かと共有すると（メール、チャットなど）、キーを共有することになる
- GitHubのボットは**公開リポジトリをスキャン**して露出した秘密鍵を探し、数秒以内に自動的に資金を盗む
- キーを後で削除してもGitの履歴が**それを保持**し、引き続きアクセス可能

### .envファイルとは？

\`.env\`ファイル（"environment"の略）は**環境変数**を保存するプレーンテキストファイルです。コードに必要だがソースコードにあるべきではない機密設定を格納します:

\`\`\`
WALLET_A_SEED=sEdVxxxYourTestnetSeed
WALLET_B_SEED=sEdYyyAnotherTestnetSeed
XAHAU_NODE=wss://xahau-test.net
\`\`\`

### .envファイルのルール

- **Gitに.envをアップロードしない**: 常に\`.gitignore\`に追加する
- **環境ごとに1つの.env**: テストネット用とメインネット用を別々に持てる
- **引用符なし**（値にスペースがある場合を除く）: \`KEY=value\`
- **\`=\`の前後にスペースなし**: \`KEY=value\`（正しい）vs \`KEY = value\`（誤り）
- **各変数は別々の行に**

### dotenvのインストール

\`dotenv\`ライブラリは\`.env\`ファイルを読んで変数を\`process.env\`にロードします:

\`\`\`
npm install dotenv
\`\`\`

### コードでdotenvを使う方法

スクリプトの先頭に1行追加します:

\`\`\`
require("dotenv").config();
\`\`\`

これにより\`.env\`ファイルのすべての変数が\`process.env\`オブジェクトにロードされます。その後、次のようにアクセスできます:

\`\`\`
const seed = process.env.WALLET_A_SEED;
const node = process.env.XAHAU_NODE;
\`\`\`

### .gitignoreファイルの作成

\`.gitignore\`ファイルはGitに**追跡やアップロードすべきでない**ファイルを伝えます。プロジェクトのルートに\`.gitignore\`というファイルを作成し、次の内容を記入します:

\`\`\`
.env
node_modules/
\`\`\`

これによりキー（\`.env\`）とダウンロードされたライブラリ（\`node_modules/\`）の両方が保護されます。

### 推奨ワークフロー

1. キーを含む\`.env\`ファイルを作成する
2. \`.env\`を除外するために\`.gitignore\`を作成または更新する
3. 各スクリプトの先頭でdotenvをロードする: \`require("dotenv").config()\`
4. \`process.env.変数名\`でキーにアクセスする
5. コードを共有する場合は、他の人が必要な変数を知るために\`.env.example\`ファイル（実際の値なし）を作成する

### セキュリティへの影響

- **テストネット**: テストネットのシードが漏洩しても実際のお金は失いませんが、テストに干渉される可能性があります。
- **メインネット**: メインネットのシードが漏洩すると、**すべての資金を永久に失う可能性があります**。ブロックチェーンでは盗まれた資金を回収する方法がありません。
- **パブリックリポジトリ**: シードがパブリックリポジトリにアップロードされたら、**侵害されたものとみなします**。直ちに資金を新しいアカウントに移動してください。
- **Gitの履歴**: ファイルを削除してもシードは履歴に残ります。Gitの履歴を書き直す必要があり、それは複雑な作業です。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear el archivo .env",
            en: "Create the .env file",
            jp: ".envファイルを作成する",
          },
          language: "bash",
          code: {
            es: `# 1. Instalar la librería dotenv
npm install dotenv

# 2. Crear el archivo .env (en la raíz del proyecto)
# IMPORTANTE: Este archivo NO se sube a Git

# Contenido del archivo .env:
# WALLET_A_SEED=sEdVxxxTuSeedDeTestnet
# WALLET_B_SEED=sEdYyyOtraSeedDeTestnet
# XAHAU_NODE=wss://xahau-test.net

# 3. Crear el archivo .gitignore
# Contenido del archivo .gitignore:
# .env
# node_modules/

# 4. (Opcional) Crear .env.example para documentar las variables
# Contenido del archivo .env.example:
# WALLET_A_SEED=tu_seed_aqui
# WALLET_B_SEED=tu_seed_aqui
# XAHAU_NODE=wss://xahau-test.net`,
            en: `# 1. Install the dotenv library
npm install dotenv

# 2. Create the .env file (in the root of your project)
# IMPORTANT: This file is NOT uploaded to Git

# Contents of the .env file:
# WALLET_A_SEED=sEdVxxxYourTestnetSeed
# WALLET_B_SEED=sEdYyyAnotherTestnetSeed
# XAHAU_NODE=wss://xahau-test.net

# 3. Create the .gitignore file
# Contents of the .gitignore file:
# .env
# node_modules/

# 4. (Optional) Create .env.example to document the variables
# Contents of the .env.example file:
# WALLET_A_SEED=your_seed_here
# WALLET_B_SEED=your_seed_here
# XAHAU_NODE=wss://xahau-test.net`,
            jp: `# 1. dotenvライブラリをインストールする
npm install dotenv

# 2. .envファイルを作成する（プロジェクトのルートに）
# 重要: このファイルはGitにアップロードしない

# .envファイルの内容:
# WALLET_A_SEED=sEdVxxxテストネットのシード
# WALLET_B_SEED=sEdYyy別のテストネットのシード
# XAHAU_NODE=wss://xahau-test.net

# 3. .gitignoreファイルを作成する
# .gitignoreファイルの内容:
# .env
# node_modules/

# 4. （任意）変数を文書化するための.env.exampleを作成する
# .env.exampleファイルの内容:
# WALLET_A_SEED=ここにシードを入力
# WALLET_B_SEED=ここにシードを入力
# XAHAU_NODE=wss://xahau-test.net`,
          },
        },
        {
          title: {
            es: "Script que usa variables de entorno con dotenv",
            en: "Script that uses environment variables with dotenv",
            jp: "dotenvで環境変数を使用するスクリプト",
          },
          language: "javascript",
          code: {
            es: `// Archivo: safe-payment.js
// Ejecutar con: node safe-payment.js
// Requiere: archivo .env con WALLET_A_SEED, WALLET_B_SEED y XAHAU_NODE

// 1. Cargar variables de entorno desde .env
require("dotenv").config();

const { Client, Wallet } = require("xahau");

async function main() {
  // 2. Leer claves de process.env (NO del código)
  const seedA = process.env.WALLET_A_SEED;
  const seedB = process.env.WALLET_B_SEED;
  const node = process.env.XAHAU_NODE;

  // 3. Verificar que las variables existen
  if (!seedA || !seedB) {
    console.error("Error: Faltan variables en el archivo .env");
    console.error("Asegúrate de que WALLET_A_SEED y WALLET_B_SEED están definidas.");
    console.error("Copia .env.example a .env y rellena los valores.");
    return;
  }

  if (!node) {
    console.error("Error: Falta XAHAU_NODE en .env");
    return;
  }

  console.log("Variables cargadas correctamente desde .env");
  console.log("Nodo:", node);
  // NUNCA hacer console.log del seed — ni siquiera en testnet

  const client = new Client(node);
  await client.connect();

  // 4. Crear wallets desde los seeds del .env
  const walletA = Wallet.fromSeed(seedA, {algorithm: 'secp256k1'});
  const walletB = Wallet.fromSeed(seedB, {algorithm: 'secp256k1'});

  console.log("Wallet A:", walletA.address);
  console.log("Wallet B:", walletB.address);

  // 5. Enviar un pago de A a B
  const payment = {
    TransactionType: "Payment",
    Account: walletA.address,
    Destination: walletB.address,
    Amount: "10000000", // 10 XAH
  };

  const result = await client.submitAndWait(payment, { wallet: walletA });
  console.log("Resultado:", result.result.meta.TransactionResult);

  await client.disconnect();
}

main().catch(console.error);`,
            en: `// File: pago-seguro.js
// Run with: node pago-seguro.js
// Requires: .env file with WALLET_A_SEED, WALLET_B_SEED, and XAHAU_NODE

// 1. Load environment variables from .env
require("dotenv").config();

const { Client, Wallet } = require("xahau");

async function main() {
  // 2. Read keys from process.env (NOT from the code)
  const seedA = process.env.WALLET_A_SEED;
  const seedB = process.env.WALLET_B_SEED;
  const node = process.env.XAHAU_NODE;

  // 3. Verify that the variables exist
  if (!seedA || !seedB) {
    console.error("Error: Missing variables in the .env file");
    console.error("Make sure WALLET_A_SEED and WALLET_B_SEED are defined.");
    console.error("Copy .env.example to .env and fill in the values.");
    return;
  }

  if (!node) {
    console.error("Error: XAHAU_NODE missing in .env");
    return;
  }

  console.log("Variables loaded correctly from .env");
  console.log("Node:", node);
  // NEVER console.log the seed — not even on testnet

  const client = new Client(node);
  await client.connect();

  // 4. Create wallets from the .env seeds
  const walletA = Wallet.fromSeed(seedA, {algorithm: 'secp256k1'});
  const walletB = Wallet.fromSeed(seedB, {algorithm: 'secp256k1'});

  console.log("Wallet A:", walletA.address);
  console.log("Wallet B:", walletB.address);

  // 5. Send a payment from A to B
  const payment = {
    TransactionType: "Payment",
    Account: walletA.address,
    Destination: walletB.address,
    Amount: "10000000", // 10 XAH
  };

  const result = await client.submitAndWait(payment, { wallet: walletA });
  console.log("Result:", result.result.meta.TransactionResult);

  await client.disconnect();
}

main().catch(console.error);`,
            jp: `// ファイル: safe-payment.js
// 実行: node safe-payment.js
// 必要: WALLET_A_SEED、WALLET_B_SEED、XAHAU_NODEを含む.envファイル

// 1. .envから環境変数をロードする
require("dotenv").config();

const { Client, Wallet } = require("xahau");

async function main() {
  // 2. process.envからキーを読む（コードからではない）
  const seedA = process.env.WALLET_A_SEED;
  const seedB = process.env.WALLET_B_SEED;
  const node = process.env.XAHAU_NODE;

  // 3. 変数が存在することを確認する
  if (!seedA || !seedB) {
    console.error("エラー: .envファイルに変数が不足しています");
    console.error("WALLET_A_SEEDとWALLET_B_SEEDが定義されていることを確認してください。");
    console.error(".env.exampleを.envにコピーして値を入力してください。");
    return;
  }

  if (!node) {
    console.error("エラー: .envにXAHAU_NODEが不足しています");
    return;
  }

  console.log(".envから変数が正常にロードされました");
  console.log("ノード:", node);
  // シードをconsole.logしない — テストネットでさえも

  const client = new Client(node);
  await client.connect();

  // 4. .envのシードからウォレットを作成する
  const walletA = Wallet.fromSeed(seedA, {algorithm: 'secp256k1'});
  const walletB = Wallet.fromSeed(seedB, {algorithm: 'secp256k1'});

  console.log("ウォレットA:", walletA.address);
  console.log("ウォレットB:", walletB.address);

  // 5. AからBへの支払いを送信する
  const payment = {
    TransactionType: "Payment",
    Account: walletA.address,
    Destination: walletB.address,
    Amount: "10000000", // 10 XAH
  };

  const result = await client.submitAndWait(payment, { wallet: walletA });
  console.log("結果:", result.result.meta.TransactionResult);

  await client.disconnect();
}

main().catch(console.error);`,
          },
        },
        {
          title: {
            es: "Ejemplo de .env.example (para compartir sin claves reales)",
            en: ".env.example example (for sharing without real keys)",
            jp: ".env.exampleの例（実際のキーなしで共有するため）",
          },
          language: "bash",
          code: {
            es: `# Archivo: .env.example
# Copia este archivo como .env y rellena con tus valores reales:
#   cp .env.example .env
#
# NUNCA subas el archivo .env a Git.
# Este archivo .env.example SÍ se puede subir porque no tiene claves reales.

WALLET_A_SEED=tu_seed_de_testnet_aqui
WALLET_B_SEED=tu_seed_de_testnet_aqui
XAHAU_NODE=wss://xahau-test.net`,
            en: `# File: .env.example
# Copy this file as .env and fill in with your real values:
#   cp .env.example .env
#
# NEVER upload the .env file to Git.
# This .env.example file CAN be uploaded because it has no real keys.

WALLET_A_SEED=your_testnet_seed_here
WALLET_B_SEED=your_testnet_seed_here
XAHAU_NODE=wss://xahau-test.net`,
            jp: `# ファイル: .env.example
# このファイルを.envとしてコピーして実際の値を入力する:
#   cp .env.example .env
#
# .envファイルをGitにアップロードしないでください。
# この.env.exampleファイルは実際のキーがないのでアップロード可能です。

WALLET_A_SEED=ここにテストネットのシードを入力
WALLET_B_SEED=ここにテストネットのシードを入力
XAHAU_NODE=wss://xahau-test.net`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Por qué usar .env?", en: "Why use .env?", jp: "なぜ.envを使うのか？" },
          content: {
            es: "NUNCA pongas claves privadas en el código\n\n• Los bots escanean GitHub y roban fondos\n• El historial de Git conserva las claves\n• Compartir código = compartir claves\n\nSolución: archivo .env + .gitignore",
            en: "NEVER put private keys in the code\n\n• Bots scan GitHub and steal funds\n• Git history preserves the keys\n• Sharing code = sharing keys\n\nSolution: .env file + .gitignore",
            jp: "秘密鍵をコードに絶対入れない\n\n• ボットがGitHubをスキャンして資金を盗む\n• Gitの履歴がキーを保持する\n• コードを共有する = キーを共有する\n\n解決策: .envファイル + .gitignore",
          },
          visual: "🔐",
        },
        {
          title: { es: "Cómo usar dotenv", en: "How to use dotenv", jp: "dotenvの使い方" },
          content: {
            es: "1. npm install dotenv\n2. Crear .env con tus claves\n3. Añadir .env a .gitignore\n4. En tu script: require(\"dotenv\").config()\n5. Leer: process.env.NOMBRE_VARIABLE",
            en: "1. npm install dotenv\n2. Create .env with your keys\n3. Add .env to .gitignore\n4. In your script: require(\"dotenv\").config()\n5. Read: process.env.VARIABLE_NAME",
            jp: "1. npm install dotenv\n2. キーを含む.envを作成する\n3. .envを.gitignoreに追加する\n4. スクリプトで: require(\"dotenv\").config()\n5. 読み取り: process.env.変数名",
          },
          visual: "📋",
        },
        {
          title: { es: "Buenas prácticas", en: "Best Practices", jp: "ベストプラクティス" },
          content: {
            es: "• .env → Claves reales (NO subir a Git)\n• .env.example → Plantilla sin claves (SÍ subir)\n• .gitignore → Excluir .env y node_modules/\n• Nunca hacer console.log de un seed\n• En mainnet: un seed filtrado = fondos perdidos",
            en: "• .env → Real keys (DO NOT upload to Git)\n• .env.example → Template without keys (DO upload)\n• .gitignore → Exclude .env and node_modules/\n• Never console.log a seed\n• On mainnet: a leaked seed = lost funds",
            jp: "• .env → 実際のキー（Gitにアップロードしない）\n• .env.example → キーなしのテンプレート（アップロード可）\n• .gitignore → .envとnode_modules/を除外する\n• シードをconsole.logしない\n• メインネット: シードが漏洩 = 資金を失う",
          },
          visual: "✅",
        },
      ],
    },
  ],
}
