export default {
  id: "m0",
  icon: "⚙️",
  title: {
    es: "Preparación del entorno de trabajo",
    en: "Setting Up the Development Environment",
    jp: "開発環境のセットアップ",
    ko: "개발 환경 설정",
    zh: "开发环境配置",
  },
  lessons: [
    {
      id: "m0l1",
      title: {
        es: "Instalación de Visual Studio Code",
        en: "Installing Visual Studio Code",
        jp: "Visual Studio Codeのインストール",
        ko: "Visual Studio Code 설치",
        zh: "安装 Visual Studio Code",
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
        ko: `**Visual Studio Code (VS Code)**는 이 과정 전반에서 사용할 기본 코드 에디터입니다. 가볍고 무료이며, JavaScript 개발과 Git 작업에 필요한 확장 기능이 매우 풍부합니다.

### 왜 VS Code를 쓰나요?

- **무료 오픈소스**이며 널리 사용됩니다
- **Windows, macOS, Linux** 모두 지원합니다
- **통합 터미널**이 있어 편집기 안에서 바로 명령을 실행할 수 있습니다
- **확장 기능**으로 포맷팅, 자동완성, 린팅을 쉽게 추가할 수 있습니다
- **Git 통합** 덕분에 변경 사항 확인과 커밋 작업이 편합니다

### 설치 시 기억할 점

1. [code.visualstudio.com](https://code.visualstudio.com)에서 운영체제에 맞는 설치 파일을 받습니다
2. 설치 과정에서 가능하면 \`code\` 명령을 PATH에 추가합니다
3. macOS에서는 명령 팔레트에서 **"Shell Command: Install 'code' command in PATH"**를 실행할 수 있습니다
4. 설치 후 터미널에서 \`code --version\`으로 정상 설치 여부를 확인합니다

### 운영체제별 참고

- **Windows**: \`.exe\` 설치 파일을 실행하고 추천 옵션을 활성화합니다
- **macOS**: \`.zip\` 압축을 풀고 앱을 **Applications** 폴더로 옮깁니다
- **Linux (Ubuntu/Debian/Fedora)**: 패키지 저장소를 추가한 뒤 \`apt\` 또는 \`dnf\`로 설치합니다

초반 개발 환경을 안정적으로 만드는 것이 이후 실습 속도를 크게 좌우합니다.`,
        zh: `**Visual Studio Code（VS Code）** 是我们在整个课程中使用的代码编辑器。它免费、轻量，拥有丰富的插件生态系统，能大大提升开发效率。

### 为什么选择 VS Code？

- **免费且开源**（由 Microsoft 维护）
- **跨平台**：支持 Windows、macOS 和 Linux
- **集成终端**：无需离开编辑器即可运行命令
- **插件丰富**：支持 JavaScript、自动格式化、智能补全等功能
- **内置 Git**：无需离开编辑器即可进行版本管理

### 在 Windows 上安装

1. 访问 [code.visualstudio.com](https://code.visualstudio.com)
2. 点击 **"Download for Windows"**
3. 运行下载的 \`.exe\` 安装程序
4. 安装过程中，勾选以下推荐选项：
   - ✅ 将"通过 Code 打开"添加到文件右键菜单
   - ✅ 将"通过 Code 打开"添加到目录右键菜单
   - ✅ 添加到 PATH（以便在终端中使用 \`code .\` 命令打开）
5. 点击 **安装** 并等待完成

### 在 macOS 上安装

1. 访问 [code.visualstudio.com](https://code.visualstudio.com)
2. 点击 **"Download for Mac"**
3. 解压下载的 \`.zip\` 文件
4. 将 **Visual Studio Code.app** 拖到 **应用程序** 文件夹
5. 若要在终端中使用 \`code\` 命令：
   - 打开 VS Code
   - 按 \`Cmd + Shift + P\` 打开命令面板
   - 输入 **"Shell Command: Install 'code' command in PATH"**
   - 选择该选项并确认

### 在 Linux（Ubuntu/Debian）上安装

1. 打开终端并执行以下命令：

\`\`\`
sudo apt update
sudo apt install software-properties-common apt-transport-https wget
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code
\`\`\`

2. 或者，从 [code.visualstudio.com](https://code.visualstudio.com) 下载 \`.deb\` 安装包，双击安装

### 在 Linux（Fedora/RHEL）上安装

1. 打开终端并执行：

\`\`\`
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\\nname=Visual Studio Code\\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\\nenabled=1\\ngpgcheck=1\\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
sudo dnf install code
\`\`\`

### 验证安装

安装完成后，打开终端（Windows 上打开命令提示符）并执行：

\`\`\`
code --version
\`\`\`

应该会显示已安装的版本号。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Verificar instalación de VS Code desde terminal",
            en: "Verify VS Code installation from the terminal",
            jp: "ターミナルからVS Codeのインストールを確認する",
            ko: "터미널에서 VS Code 설치 확인하기",
            zh: "从终端验证 VS Code 安装",
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
            ko: `# VS Code가 설치되어 있는지 확인
code --version

# 현재 디렉터리에서 VS Code 열기
code .

# 특정 파일 열기
code my-file.js`,
            zh: `# 验证 VS Code 是否已安装
code --version

# 在当前目录中打开 VS Code
code .

# 打开特定文件
code my-file.js`,
          },
        },
        {
          title: {
            es: "Extensiones recomendadas para el curso",
            en: "Recommended extensions for the course",
            jp: "コース用の推奨拡張機能",
            ko: "강좌용 추천 확장 기능",
            zh: "课程推荐插件",
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
            ko: `# 터미널에서 확장 기능 설치
# (VS Code의 Extensions 탭에서 직접 검색해도 됩니다)

# JavaScript/TypeScript 지원 강화
code --install-extension dbaeumer.vscode-eslint

# 자동 코드 포맷팅
code --install-extension esbenp.prettier-vscode

# 괄호 쌍 색상 표시
code --install-extension CoenraadS.bracket-pair-colorizer-2

# 파일 탐색기 아이콘
code --install-extension vscode-icons-team.vscode-icons`,
            zh: `# 从终端安装插件
# （也可以在 VS Code 的 Extensions 标签页中搜索安装）

# 增强 JavaScript/TypeScript 支持
code --install-extension dbaeumer.vscode-eslint

# 自动代码格式化
code --install-extension esbenp.prettier-vscode

# 括号对颜色高亮
code --install-extension CoenraadS.bracket-pair-colorizer-2

# 文件浏览器图标
code --install-extension vscode-icons-team.vscode-icons`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Visual Studio Code", en: "Visual Studio Code", jp: "Visual Studio Code", ko: "Visual Studio Code", zh: "Visual Studio Code" },
          content: {
            es: "Editor de código gratuito y multiplataforma\n\n• Windows, macOS y Linux\n• Terminal integrada\n• Miles de extensiones\n• Git integrado\n• Descarga: code.visualstudio.com",
            en: "Free and cross-platform code editor\n\n• Windows, macOS, and Linux\n• Integrated terminal\n• Thousands of extensions\n• Built-in Git\n• Download: code.visualstudio.com",
            jp: "無料のクロスプラットフォームコードエディタ\n\n• Windows、macOS、Linux対応\n• 統合ターミナル\n• 数千の拡張機能\n• Git統合\n• ダウンロード: code.visualstudio.com",
            ko: "무료 크로스플랫폼 코드 에디터\n\n• Windows, macOS, Linux 지원\n• 통합 터미널\n• 수천 개의 확장 기능\n• Git 통합\n• 다운로드: code.visualstudio.com",
            zh: "免费跨平台代码编辑器\n\n• 支持 Windows、macOS 和 Linux\n• 集成终端\n• 数千个插件\n• 内置 Git\n• 下载：code.visualstudio.com",
          },
          visual: "💻",
        },
        {
          title: { es: "Instalación rápida", en: "Quick Installation", jp: "クイックインストール", ko: "빠른 설치", zh: "快速安装" },
          content: {
            es: "🪟 Windows → Descargar .exe e instalar\n🍎 macOS → Descargar .zip, arrastrar a Aplicaciones\n🐧 Linux → apt install code / dnf install code\n\n✅ Verificar: code --version",
            en: "🪟 Windows → Download .exe and install\n🍎 macOS → Download .zip, drag to Applications\n🐧 Linux → apt install code / dnf install code\n\n✅ Verify: code --version",
            jp: "🪟 Windows → .exeをダウンロードしてインストール\n🍎 macOS → .zipをダウンロードしてアプリケーションにドラッグ\n🐧 Linux → apt install code / dnf install code\n\n✅ 確認: code --version",
            ko: "🪟 Windows → .exe 다운로드 후 설치\n🍎 macOS → .zip 다운로드 후 Applications로 이동\n🐧 Linux → apt install code / dnf install code\n\n✅ 확인: code --version",
            zh: "🪟 Windows → 下载 .exe 并安装\n🍎 macOS → 下载 .zip，拖到应用程序文件夹\n🐧 Linux → apt install code / dnf install code\n\n✅ 验证：code --version",
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
        ko: "Node.js 설치",
        zh: "安装 Node.js",
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
        ko: `**Node.js**는 이 강좌의 스크립트를 실행하는 데 필요한 JavaScript 런타임입니다. Xahau 블록체인과 상호작용하는 예제 코드는 모두 Node.js에서 실행됩니다.

### Node.js란?

Node.js를 사용하면 **브라우저 밖에서** JavaScript 코드를 직접 실행할 수 있습니다. 다음 도구가 함께 포함됩니다:
- **node**: JavaScript 실행기
- **npm**: 패키지 관리자 (\`xahau\` 같은 라이브러리 설치)
- **npx**: 전역 설치 없이 도구 실행

### 권장 버전

이 강좌에는 **Node.js v18 이상**이 필요합니다. 가능하면 최신 LTS 버전을 사용하는 것이 좋습니다.

### 설치 요약

- **Windows**: [nodejs.org](https://nodejs.org)에서 LTS \`.msi\` 설치 파일 다운로드
- **macOS**: 공식 \`.pkg\` 설치 파일 또는 Homebrew 사용
- **Linux**: NodeSource 저장소를 사용해 최신 버전 설치

### 설치 후 확인

새 터미널을 열고 다음을 실행합니다:

\`\`\`
node --version
npm --version
\`\`\`

### xahau 라이브러리 설치

Node.js를 설치한 뒤에는 강좌에서 사용할 프로젝트를 만들고 \`xahau\` 라이브러리를 설치합니다:

\`\`\`
mkdir xahau-curso
cd xahau-curso
npm init -y
npm install xahau
\`\`\`

이제 강좌 예제를 실행할 준비가 됩니다.`,
        zh: `**Node.js** 是运行本课程脚本所需的 JavaScript 运行环境。所有与 Xahau 区块链交互的代码示例均在 Node.js 中执行。

### 什么是 Node.js？

Node.js 允许你在**浏览器之外**直接在电脑上运行 JavaScript 代码。它包含：
- **node**：JavaScript 解释器（运行你的脚本）
- **npm**：包管理器（安装 \`xahau\` 等库）
- **npx**：包运行器（无需全局安装即可运行工具）

### 推荐版本

本课程需要 **Node.js v18 或更高版本**（推荐使用最新的 LTS 版本）。\`xahau\` 库至少需要 v18。

### 在 Windows 上安装

1. 访问 [nodejs.org](https://nodejs.org)
2. 下载 **LTS**（长期支持）版本
3. 运行 \`.msi\` 安装程序
4. 按默认选项完成安装向导
5. **重要**：如有提示，勾选"Automatically install the necessary tools"
6. 安装完成后重启终端

### 在 macOS 上安装

**方式 A — 官方安装包：**
1. 访问 [nodejs.org](https://nodejs.org)
2. 下载 macOS 版 **LTS**
3. 打开 \`.pkg\` 文件并按向导操作

**方式 B — 使用 Homebrew（推荐）：**
1. 若未安装 Homebrew，先从 [brew.sh](https://brew.sh) 安装
2. 在终端执行：

\`\`\`
brew install node@22
\`\`\`

### 在 Linux（Ubuntu/Debian）上安装

使用 NodeSource 官方仓库获取最新版本：

\`\`\`
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
\`\`\`

### 在 Linux（Fedora）上安装

\`\`\`
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf install -y nodejs
\`\`\`

### 验证安装

打开**新终端**（在 Windows 上尤为重要）并执行：

\`\`\`
node --version
npm --version
\`\`\`

应该分别显示类似 \`v22.x.x\` 和 \`10.x.x\` 的版本号。

### 安装 xahau 库

安装好 Node.js 后，即可安装本课程使用的库：

\`\`\`
mkdir xahau-curso
cd xahau-curso
npm init -y
npm install xahau
\`\`\`

这将创建你的项目并下载 \`xahau\` 库，使你能够运行课程中的所有示例。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Verificar instalación y crear el proyecto del curso",
            en: "Verify installation and create the course project",
            jp: "インストールを確認してコースプロジェクトを作成する",
            ko: "설치 확인 및 강좌 프로젝트 생성",
            zh: "验证安装并创建课程项目",
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
            ko: `# 1. Node.js가 설치되어 있는지 확인
node --version
# 예상값: v22.x.x (또는 v18+)

npm --version
# 예상값: 10.x.x

# 2. 강좌 프로젝트 디렉터리 생성
mkdir xahau-curso
cd xahau-curso

# 3. Node.js 프로젝트 초기화
npm init -y

# 4. xahau 라이브러리 설치
npm install xahau`,
            zh: `# 1. 验证 Node.js 是否已安装
node --version
# 预期：v22.x.x（或 v18+）

npm --version
# 预期：10.x.x

# 2. 创建课程项目目录
mkdir xahau-curso
cd xahau-curso

# 3. 初始化 Node.js 项目
npm init -y

# 4. 安装 xahau 库
npm install xahau`,
          },
        },
        {
          title: {
            es: "Tu primer script: Hola Xahau",
            en: "Your first script: Hello Xahau",
            jp: "はじめてのスクリプト: Hello Xahau",
            ko: "첫 번째 스크립트: Hello Xahau",
            zh: "你的第一个脚本：Hello Xahau",
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
            ko: `// 파일: hola-xahau.js
// 실행: node hola-xahau.js

const { Client } = require("xahau");

async function main() {
  console.log("Xahau에 연결 중...");

  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("연결 성공!");
  console.log("네트워크:", info.network_id);
  console.log("버전:", info.build_version);
  console.log("레저:", info.validated_ledger.seq);

  await client.disconnect();
  console.log("연결 종료. 개발 환경 준비 완료!");
}

main();`,
            zh: `// 文件：hola-xahau.js
// 运行方式：node hola-xahau.js

const { Client } = require("xahau");

async function main() {
  console.log("正在连接到 Xahau...");

  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("连接成功！");
  console.log("网络：", info.network_id);
  console.log("版本：", info.build_version);
  console.log("账本：", info.validated_ledger.seq);

  await client.disconnect();
  console.log("已断开连接。你的环境已准备就绪！");
}

main();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Qué es Node.js?", en: "What is Node.js?", jp: "Node.jsとは？", ko: "Node.js란?", zh: "什么是 Node.js？" },
          content: {
            es: "JavaScript fuera del navegador\n\n• node → Ejecuta tus scripts\n• npm → Instala librerías\n• npx → Ejecuta herramientas\n\nVersiones: v18+ (recomendado v22 LTS)",
            en: "JavaScript outside the browser\n\n• node → Runs your scripts\n• npm → Installs libraries\n• npx → Runs tools\n\nVersions: v18+ (recommended v22 LTS)",
            jp: "ブラウザの外側で動くJavaScript\n\n• node → スクリプトを実行する\n• npm → ライブラリをインストールする\n• npx → ツールを実行する\n\nバージョン: v18+ (v22 LTS推奨)",
            ko: "브라우저 밖에서 실행되는 JavaScript\n\n• node → 스크립트 실행\n• npm → 라이브러리 설치\n• npx → 도구 실행\n\n버전: v18+ (v22 LTS 권장)",
            zh: "在浏览器之外运行的 JavaScript\n\n• node → 运行脚本\n• npm → 安装库\n• npx → 运行工具\n\n版本要求：v18+（推荐 v22 LTS）",
          },
          visual: "🟢",
        },
        {
          title: { es: "Instalación rápida", en: "Quick Installation", jp: "クイックインストール", ko: "빠른 설치", zh: "快速安装" },
          content: {
            es: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ Verificar:\nnode --version\nnpm --version",
            en: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ Verify:\nnode --version\nnpm --version",
            jp: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ 確認:\nnode --version\nnpm --version",
            ko: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ 확인:\nnode --version\nnpm --version",
            zh: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ 验证：\nnode --version\nnpm --version",
          },
          visual: "📦",
        },
        {
          title: { es: "Preparar el proyecto", en: "Set Up the Project", jp: "プロジェクトの準備", ko: "프로젝트 준비", zh: "准备项目" },
          content: {
            es: "mkdir xahau-curso\ncd xahau-curso\nnpm init -y\nnpm install xahau\n\n¡Listo para ejecutar los scripts del curso!",
            en: "mkdir xahau-curso\ncd xahau-curso\nnpm init -y\nnpm install xahau\n\nReady to run the course scripts!",
            jp: "mkdir xahau-curso\ncd xahau-curso\nnpm init -y\nnpm install xahau\n\nコーススクリプトを実行する準備ができました！",
            ko: "mkdir xahau-curso\ncd xahau-curso\nnpm init -y\nnpm install xahau\n\n강좌 스크립트를 실행할 준비가 되었습니다!",
            zh: "mkdir xahau-curso\ncd xahau-curso\nnpm init -y\nnpm install xahau\n\n已准备好运行课程脚本！",
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
        ko: "온라인 대안: CodeSandbox",
        zh: "在线替代方案：CodeSandbox",
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
        ko: `컴퓨터에 소프트웨어를 설치하기 어렵다면 **CodeSandbox**를 온라인 개발 환경으로 사용할 수 있습니다. 브라우저만 있으면 Node.js 프로젝트를 만들고 실행할 수 있습니다.

### CodeSandbox란?

[CodeSandbox](https://codesandbox.io)는 설치 없이 코드 작성, 실행, 공유가 가능한 클라우드 IDE입니다. 무료 플랜만으로도 이 강좌를 따라가기에 충분합니다.

### 장점

- **설치 불필요**: 모든 것이 브라우저에서 동작
- **어느 기기에서나 접근 가능**
- **통합 터미널** 제공
- **공유 쉬움**: 샌드박스마다 고유 URL 존재

### 강좌용 준비 방법

1. [codesandbox.io](https://codesandbox.io)에서 계정을 만듭니다
2. **Create**에서 **Node.js** 템플릿 또는 **Devbox**를 선택합니다
3. 터미널을 열고 \`npm install xahau\`를 실행합니다
4. \`.js\` 파일을 만들어 예제 코드를 붙여 넣습니다
5. \`node hola-xahau.js\` 같은 명령으로 실행합니다

### 주의할 점

- 무료 샌드박스는 **공개**될 수 있습니다
- 메인넷 시드나 비밀키는 절대 넣지 마세요
- 강좌에서는 **테스트넷 키만** 사용하세요
- Hooks C 컴파일 같은 무거운 작업에는 적합하지 않습니다

빠르게 실습을 시작하기엔 좋지만, 메인넷 작업은 로컬 환경이 더 안전합니다.`,
        zh: `如果你不想或无法在电脑上安装软件，可以使用 **CodeSandbox**，这是一个免费的在线开发环境，直接在浏览器中运行。

### 什么是 CodeSandbox？

[CodeSandbox](https://codesandbox.io) 是一个云端 IDE，无需安装任何软件即可编写、运行和分享代码。其免费计划已涵盖本课程所需的一切。

### CodeSandbox 的优势

- **无需安装**：一切都在浏览器中运行
- **随时随地访问**：只需要网络连接
- **集成终端**：可以运行 npm 和 node 命令
- **代码分享**：每个沙盒都有唯一的 URL
- **免费**：免费计划足以完成本课程

### 创建账号

1. 访问 [codesandbox.io](https://codesandbox.io)
2. 点击右上角的 **"Sign In"**
3. 可使用 **GitHub**、**Google** 或 **邮箱** 账号注册
4. 登录后进入控制台

### 为课程创建沙盒

1. 在控制台中点击右上角的 **"Create"**
2. 选择 **"Import from GitHub"** 或搜索 **"Node.js"** 模板
3. 如果找不到 Node.js 模板：
   - 点击 **"Create"** → **"Devbox"**
   - 选择 **"Node.js"** 模板
4. 将创建一个预装 Node.js 的环境

### 为 Xahau 配置沙盒

进入沙盒后：

1. **打开终端**：点击底部面板的终端图标，或使用菜单 **Terminal → New Terminal**
2. **安装 xahau 库**：在终端执行：

\`\`\`
npm install xahau
\`\`\`

3. **创建第一个文件**：在文件浏览器（左侧面板）右键 → **New File** → 命名为 \`hola-xahau.js\`
4. **编写代码**：将课程中的示例代码复制进去
5. **运行脚本**：在终端执行：

\`\`\`
node hola-xahau.js
\`\`\`

### 免费计划的限制

- **公开沙盒**：你的代码对其他人可见（不要放主网私钥）
- **闲置暂停**：长时间不使用后沙盒会暂停（返回后会重新激活）
- **资源有限**：足以运行课程脚本，但不适合编译 C 语言 Hooks

### 安全建议

由于免费沙盒是公开的，**请勿在 CodeSandbox 中放置主网种子或私钥**。只使用**测试网密钥**（没有真实价值的代币）。若需使用主网，请在本地使用 VS Code 环境。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Instalar xahau en CodeSandbox (terminal)",
            en: "Install xahau in CodeSandbox (terminal)",
            jp: "CodeSandboxにxahauをインストールする（ターミナル）",
            ko: "CodeSandbox에서 xahau 설치하기 (터미널)",
            zh: "在 CodeSandbox 中安装 xahau（终端）",
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
            ko: `# CodeSandbox 터미널에서:

# 1. xahau 라이브러리 설치
npm install xahau

# 2. 테스트 파일 생성
touch hi-xahau.js

# 3. 코드 작성 후 스크립트 실행
node hi-xahau.js`,
            zh: `# 在 CodeSandbox 终端中：

# 1. 安装 xahau 库
npm install xahau

# 2. 创建测试文件
touch hi-xahau.js

# 3. 编写代码后运行脚本
node hi-xahau.js`,
          },
        },
        {
          title: {
            es: "Script de prueba para CodeSandbox",
            en: "Test script for CodeSandbox",
            jp: "CodeSandbox用テストスクリプト",
            ko: "CodeSandbox용 테스트 스크립트",
            zh: "CodeSandbox 测试脚本",
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
            ko: `// 파일: hi-xahau.js
// 이 코드를 샌드박스에 복사한 뒤 실행: node hi-xahau.js

const { Client } = require("xahau");

async function main() {
  console.log("=== Xahau Academy - 연결 테스트 ===");

  // Xahau 테스트넷에 연결
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  console.log("Xahau Testnet에 연결되었습니다");

  // 서버 정보 가져오기
  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("네트워크 ID:", info.network_id);
  console.log("레저:", info.validated_ledger.seq);
  console.log("버전:", info.build_version);

  await client.disconnect();
  console.log("CodeSandbox 환경 준비 완료!");
  console.log("이제 Xahau Academy 강좌를 계속 진행할 수 있습니다.");
}

main().catch(console.error);`,
            zh: `// 文件：hi-xahau.js
// 将此代码复制到沙盒中并运行：node hi-xahau.js

const { Client } = require("xahau");

async function main() {
  console.log("=== Xahau Academy - 连接测试 ===");

  // 连接到 Xahau 测试网
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  console.log("已连接到 Xahau Testnet");

  // 获取服务器信息
  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("网络 ID：", info.network_id);
  console.log("账本：", info.validated_ledger.seq);
  console.log("版本：", info.build_version);

  await client.disconnect();
  console.log("CodeSandbox 环境已准备就绪！");
  console.log("现在可以继续学习 Xahau Academy 课程了。");
}

main().catch(console.error);`,
          },
        },
      ],
      slides: [
        {
          title: { es: "CodeSandbox", en: "CodeSandbox", jp: "CodeSandbox", ko: "CodeSandbox", zh: "CodeSandbox" },
          content: {
            es: "IDE online gratuito en tu navegador\n\n• Sin instalar nada\n• Terminal integrada\n• Node.js preinstalado\n• codesandbox.io",
            en: "Free online IDE in your browser\n\n• No installation needed\n• Integrated terminal\n• Node.js preinstalled\n• codesandbox.io",
            jp: "ブラウザで使える無料のオンラインIDE\n\n• インストール不要\n• 統合ターミナル\n• Node.jsプリインストール\n• codesandbox.io",
            ko: "브라우저에서 쓰는 무료 온라인 IDE\n\n• 설치 불필요\n• 통합 터미널\n• Node.js 사전 설치\n• codesandbox.io",
            zh: "浏览器中的免费在线 IDE\n\n• 无需安装\n• 集成终端\n• 预装 Node.js\n• codesandbox.io",
          },
          visual: "☁️",
        },
        {
          title: { es: "Configurar para Xahau", en: "Configure for Xahau", jp: "Xahau用の設定", ko: "Xahau용 설정", zh: "为 Xahau 配置" },
          content: {
            es: "1️⃣ Crear cuenta en codesandbox.io\n2️⃣ Crear Devbox con plantilla Node.js\n3️⃣ npm install xahau\n4️⃣ Crear archivo .js y escribir código\n5️⃣ node mi-archivo.js",
            en: "1️⃣ Create account at codesandbox.io\n2️⃣ Create Devbox with Node.js template\n3️⃣ npm install xahau\n4️⃣ Create .js file and write code\n5️⃣ node mi-archivo.js",
            jp: "1️⃣ codesandbox.ioでアカウント作成\n2️⃣ Node.jsテンプレートでDevboxを作成\n3️⃣ npm install xahau\n4️⃣ .jsファイルを作成してコードを書く\n5️⃣ node mi-archivo.js",
            ko: "1️⃣ codesandbox.io에서 계정 생성\n2️⃣ Node.js 템플릿으로 Devbox 생성\n3️⃣ npm install xahau\n4️⃣ .js 파일 생성 후 코드 작성\n5️⃣ node my-file.js",
            zh: "1️⃣ 在 codesandbox.io 注册账号\n2️⃣ 使用 Node.js 模板创建 Devbox\n3️⃣ npm install xahau\n4️⃣ 创建 .js 文件并编写代码\n5️⃣ node my-file.js",
          },
          visual: "🛠️",
        },
        {
          title: { es: "Seguridad", en: "Security", jp: "セキュリティ", ko: "보안", zh: "安全须知" },
          content: {
            es: "⚠️ Los sandboxes gratuitos son PÚBLICOS\n\n• NUNCA pongas seeds de mainnet\n• Usa SOLO claves de testnet\n• Para mainnet → entorno local con VS Code",
            en: "⚠️ Free sandboxes are PUBLIC\n\n• NEVER put mainnet seeds\n• Use ONLY testnet keys\n• For mainnet → local environment with VS Code",
            jp: "⚠️ 無料のサンドボックスはパブリックです\n\n• メインネットのシードは絶対に入力しない\n• テストネットのキーのみ使用する\n• メインネット用 → VS Codeのローカル環境",
            ko: "⚠️ 무료 샌드박스는 공개될 수 있습니다\n\n• 메인넷 시드는 절대 넣지 마세요\n• 테스트넷 키만 사용하세요\n• 메인넷 작업 → VS Code 로컬 환경 사용",
            zh: "⚠️ 免费沙盒是公开的\n\n• 绝对不要放入主网种子\n• 只使用测试网密钥\n• 主网操作 → 使用本地 VS Code 环境",
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
        ko: "Node.js 프로젝트 구조",
        zh: "Node.js 项目结构",
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
        ko: `이제 Node.js와 \`xahau\` 라이브러리를 설치했으니, 블록체인 코드를 작성하기 전에 **Node.js 프로젝트가 어떻게 구성되는지** 이해하는 것이 중요합니다.

### package.json이란?

\`package.json\`은 프로젝트의 기본 정보와 설정을 담는 파일입니다. \`npm init -y\`를 실행하면 자동으로 생성되며 다음을 포함합니다:

- **name**: 프로젝트 이름
- **version**: 현재 버전
- **description**: 간단한 설명
- **main**: 기본 진입 파일
- **scripts**: \`npm run\`으로 실행할 명령
- **dependencies**: 프로젝트에 필요한 라이브러리 (\`xahau\` 등)

### node_modules/란?

\`node_modules/\`는 npm이 라이브러리를 설치하는 폴더입니다. 여기에 \`xahau\`와 그 내부 의존성이 함께 저장됩니다.

**중요한 규칙**: \`node_modules/\`는 저장소에 올리거나 다른 사람과 공유하지 않습니다. 필요할 때 \`npm install\`로 다시 만들 수 있습니다.

### require()로 라이브러리 가져오기

Node.js에서는 \`require()\`를 사용해 라이브러리나 자신의 파일을 가져옵니다:

\`\`\`
const { Client, Wallet } = require("xahau");
const utils = require("./utils.js");
\`\`\`

### 파일 구성

강좌 스크립트는 보통 각각의 \`.js\` 파일로 나눠 관리합니다. 예:

\`\`\`
xahau-curso/
├── package.json
├── node_modules/
├── 01-connection.js
├── 02-wallet.js
└── utils.js
\`\`\`

### async/await와 try/catch

블록체인과 통신하는 작업은 시간이 걸리므로 \`async/await\`가 필요합니다. 또한 연결 실패나 응답 오류에 대비해 항상 \`try/catch\`로 예외를 처리해야 합니다.

이 구조를 이해하면 강좌의 예제 파일이 많아져도 어디에 무엇이 있는지 쉽게 파악할 수 있습니다.`,
        zh: `现在你已经安装了 Node.js 并下载了 \`xahau\` 库，在编写与区块链交互的代码之前，了解 **Node.js 项目的组织结构**非常重要。

### 什么是 package.json？

\`package.json\` 文件是项目的**技术说明书**。运行 \`npm init -y\` 时会自动创建，包含以下内容：

- **name**：项目名称
- **version**：当前版本
- **description**：简短描述
- **main**：主文件（默认为 \`index.js\`）
- **scripts**：可通过 \`npm run\` 执行的自定义命令
- **dependencies**：项目所需的库（如 \`xahau\`）

执行 \`npm install xahau\` 时，npm 会下载该库并自动将其注册到 \`package.json\` 的 \`dependencies\` 字段中。

### 什么是 node_modules/？

\`node_modules/\` 文件夹是 npm 下载所有项目所需库的地方，包含：

- 你安装的 \`xahau\` 库
- 该库的所有**内部依赖**（它运行所需的其他库）
- 可能包含数百甚至数千个文件

**重要规则**：**永远不要将 \`node_modules/\` 提交到仓库或共享给他人。** 该文件夹可以随时通过运行 \`npm install\` 重新创建。使用 Git 时，请将 \`node_modules/\` 添加到 \`.gitignore\` 文件中。

### 什么是 require()？如何导入库？

在 Node.js 中，我们使用 \`require()\` 来**导入库**并在代码中使用：

\`\`\`
const { Client, Wallet } = require("xahau");
\`\`\`

你也可以导入自己的文件：

\`\`\`
const myUtils = require("./utils.js");
\`\`\`

开头的 \`./\` 表示文件在当前目录中。

### 创建和组织 .js 文件

课程中每个脚本都是独立的 \`.js\` 文件。推荐以下组织方式：

\`\`\`
xahau-curso/
├── package.json
├── node_modules/
├── 01-connection.js
├── 02-wallet.js
├── 03-balance.js
├── 04-payment.js
└── utils.js          ← 共享函数（可选）
\`\`\`

每个文件可通过 \`node 文件名.js\` 独立运行。

### async/await：异步操作

当你的代码与区块链通信时，操作**需要时间**（连接节点、发送交易、等待响应）。JavaScript 使用 **async/await** 来处理这些操作而不阻塞程序：

- **async**：标记一个异步函数（可以包含耗时操作）
- **await**：暂停执行直到操作完成并返回结果

### 使用 try/catch 处理错误

区块链操作可能会失败：节点可能宕机、网络可能很慢，或代码本身可能有错误。使用 **try/catch** 来受控地捕获这些错误：

\`\`\`
try {
  // 可能失败的代码
  await client.connect();
} catch (error) {
  // 出错时执行
  console.error("错误：", error.message);
}
\`\`\`

没有 \`try/catch\`，任何错误都会让整个程序突然停止。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Ejemplo de package.json explicado",
            en: "package.json example explained",
            jp: "package.jsonの例（解説付き）",
            ko: "설명과 함께 보는 package.json 예시",
            zh: "package.json 示例解析",
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
            ko: `// 파일: package.json (npm init -y로 생성)
// 이 파일을 직접 수정할 필요는 거의 없습니다.
// 라이브러리를 설치하면 npm이 자동으로 갱신합니다.

{
  "name": "xahau-course",       // 프로젝트 이름
  "version": "1.0.0",          // 프로젝트 버전
  "description": "",            // 설명
  "main": "index.js",          // 메인 파일
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "xahau": "^1.0.0"          // <-- npm install xahau가 추가한 항목
  }
}

// 참고: node_modules/는 npm install 시 자동 생성됩니다.
// 공유하지 말고 필요하면 다시 설치하세요.`,
            zh: `// 文件：package.json（由 npm init -y 创建）
// 通常不需要手动编辑此文件。
// 安装库时 npm 会自动更新它。

{
  "name": "xahau-course",       // 项目名称
  "version": "1.0.0",          // 项目版本
  "description": "",            // 描述（可填写）
  "main": "index.js",          // 主文件（课程中不使用）
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "xahau": "^1.0.0"          // <-- npm install xahau 添加了这一项
  }
}

// 注意：node_modules/ 由 npm install 自动创建。
// 不要共享它，可随时通过 npm install 重新生成。`,
          },
        },
        {
          title: {
            es: "Script básico con async/await y try/catch",
            en: "Basic script with async/await and try/catch",
            jp: "async/awaitとtry/catchを使った基本スクリプト",
            ko: "async/await와 try/catch를 사용하는 기본 스크립트",
            zh: "使用 async/await 和 try/catch 的基础脚本",
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
            ko: `// 파일: basic-structure.js
// 실행: node basic-structure.js

// 1. node_modules/에서 xahau 라이브러리 가져오기
const { Client, Wallet } = require("xahau");

// 2. 비동기(async) 함수 만들기
async function main() {
  console.log("=== Xahau 스크립트의 기본 구조 ===");

  // 3. try/catch로 오류 처리
  try {
    // 4. await는 각 작업이 끝날 때까지 기다립니다
    const client = new Client("wss://xahau-test.net");
    console.log("노드에 연결 중...");
    await client.connect();
    console.log("정상적으로 연결되었습니다.");

    // 5. 블록체인 질의
    const response = await client.request({
      command: "server_info"
    });

    const info = response.result.info;
    console.log("서버 정보:");
    console.log("네트워크:", info.network_id);
    console.log("버전:", info.build_version);
    console.log("레저:", info.validated_ledger.seq);

    // 6. 정상 종료
    await client.disconnect();
    console.log("정상적으로 연결을 종료했습니다.");

  } catch (error) {
    // 7. 문제가 생기면 프로그램을 깨지 않고 오류 출력
    console.error("오류가 발생했습니다!");
    console.error("종류:", error.name);
    console.error("메시지:", error.message);
  }
}

// 8. 메인 함수 실행
main();`,
            zh: `// 文件：basic-structure.js
// 运行方式：node basic-structure.js

// 1. 从 node_modules/ 导入 xahau 库
const { Client, Wallet } = require("xahau");

// 2. 创建异步（async）函数
async function main() {
  console.log("=== Xahau 脚本基础结构 ===");

  // 3. 使用 try/catch 处理错误
  try {
    // 4. await 等待每个操作完成
    const client = new Client("wss://xahau-test.net");
    console.log("正在连接节点...");
    await client.connect();
    console.log("连接成功。");

    // 5. 查询区块链
    const response = await client.request({
      command: "server_info"
    });

    const info = response.result.info;
    console.log("服务器信息：");
    console.log("网络：", info.network_id);
    console.log("版本：", info.build_version);
    console.log("账本：", info.validated_ledger.seq);

    // 6. 正常断开连接
    await client.disconnect();
    console.log("已正常断开连接。");

  } catch (error) {
    // 7. 出错时显示错误信息而不崩溃程序
    console.error("发现错误！");
    console.error("类型：", error.name);
    console.error("信息：", error.message);
  }
}

// 8. 执行主函数
main();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Anatomía de un proyecto Node.js", en: "Anatomy of a Node.js Project", jp: "Node.jsプロジェクトの構造", ko: "Node.js 프로젝트 구조", zh: "Node.js 项目结构" },
          content: {
            es: "package.json → Ficha técnica del proyecto\n\nnode_modules/ → Librerías descargadas\n  (nunca compartir, se regenera con npm install)\n\narchivo.js → Tu código\n  (se ejecuta con: node archivo.js)",
            en: "package.json → Project's technical spec sheet\n\nnode_modules/ → Downloaded libraries\n  (never share, regenerated with npm install)\n\nfile.js → Your code\n  (run with: node file.js)",
            jp: "package.json → プロジェクトの技術仕様書\n\nnode_modules/ → ダウンロードされたライブラリ\n  （共有しない、npm installで再生成可能）\n\nfile.js → あなたのコード\n  （実行: node file.js）",
            ko: "package.json → 프로젝트 설정 파일\n\nnode_modules/ → 설치된 라이브러리\n  (공유하지 않고 npm install로 재생성)\n\nfile.js → 내가 작성한 코드\n  (실행: node file.js)",
            zh: "package.json → 项目技术说明书\n\nnode_modules/ → 已下载的库\n  （不要共享，通过 npm install 重新生成）\n\nfile.js → 你的代码\n  （运行方式：node file.js）",
          },
          visual: "📁",
        },
        {
          title: { es: "require() e importaciones", en: "require() and imports", jp: "require()とインポート", ko: "require()와 import", zh: "require() 与导入" },
          content: {
            es: "Importar librerías instaladas:\nconst { Client, Wallet } = require(\"xahau\");\n\nImportar archivos propios:\nconst utils = require(\"./utils.js\");\n\nrequire() busca en node_modules/ o en la ruta indicada",
            en: "Import installed libraries:\nconst { Client, Wallet } = require(\"xahau\");\n\nImport your own files:\nconst utils = require(\"./utils.js\");\n\nrequire() searches in node_modules/ or in the specified path",
            jp: "インストール済みライブラリのインポート:\nconst { Client, Wallet } = require(\"xahau\");\n\n自分のファイルのインポート:\nconst utils = require(\"./utils.js\");\n\nrequire()はnode_modules/または指定されたパスを検索する",
            ko: "설치한 라이브러리 가져오기:\nconst { Client, Wallet } = require(\"xahau\");\n\n내 파일 가져오기:\nconst utils = require(\"./utils.js\");\n\nrequire()는 node_modules/ 또는 지정한 경로를 찾습니다",
            zh: "导入已安装的库：\nconst { Client, Wallet } = require(\"xahau\");\n\n导入自己的文件：\nconst utils = require(\"./utils.js\");\n\nrequire() 在 node_modules/ 或指定路径中查找",
          },
          visual: "📦",
        },
        {
          title: { es: "async/await y try/catch", en: "async/await and try/catch", jp: "async/awaitとtry/catch", ko: "async/await와 try/catch", zh: "async/await 与 try/catch" },
          content: {
            es: "async → Marca funciones que hacen operaciones lentas\nawait → Espera a que la operación termine\n\ntry { } → Intenta ejecutar el código\ncatch (error) { } → Captura errores sin romper el programa\n\nIndispensables para trabajar con blockchain",
            en: "async → Marks functions that perform slow operations\nawait → Waits for the operation to finish\n\ntry { } → Attempts to execute the code\ncatch (error) { } → Catches errors without crashing the program\n\nEssential for working with blockchain",
            jp: "async → 時間のかかる操作を行う関数をマーク\nawait → 操作の完了を待つ\n\ntry { } → コードの実行を試みる\ncatch (error) { } → プログラムをクラッシュさせずにエラーをキャッチ\n\nブロックチェーン操作に不可欠",
            ko: "async → 시간이 걸리는 함수를 표시\nawait → 작업이 끝날 때까지 대기\n\ntry { } → 코드 실행 시도\ncatch (error) { } → 프로그램을 멈추지 않고 오류 처리\n\n블록체인 작업에 필수",
            zh: "async → 标记执行耗时操作的函数\nawait → 等待操作完成\n\ntry { } → 尝试执行代码\ncatch (error) { } → 捕获错误而不崩溃程序\n\n区块链开发中不可或缺",
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
        ko: "스크립트 실행과 디버깅",
        zh: "运行和调试脚本",
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
        ko: `이제 Node.js 프로젝트 구조를 알았으니, 다음은 **스크립트를 실행하는 방법**과 **오류를 이해하고 고치는 방법**입니다.

### 스크립트 실행

JavaScript 파일은 다음처럼 실행합니다:

\`\`\`
node filename.js
\`\`\`

예:

\`\`\`
node hi-xahau.js
node 01-connection.js
node my-script.js
\`\`\`

### 오류 메시지 읽기

Node.js가 실패하면 **stack trace**를 출력합니다. 여기서 확인할 핵심은:

1. 오류가 난 **파일과 줄 번호**
2. **오류 종류** (\`SyntaxError\`, \`TypeError\`, \`ReferenceError\` 등)
3. 실제 **오류 메시지**
4. 실행 경로인 **stack trace**

### console.log로 디버깅하기

\`console.log()\`는 가장 기본적이면서도 강력한 디버깅 도구입니다. 변수 값, 응답 객체, 타입을 단계별로 확인하세요.

### 자주 보는 오류

- **Cannot find module 'xahau'** → \`npm install xahau\`
- **await is only valid in async functions** → \`async function\` 안으로 옮기기
- **Unexpected token** → 괄호, 쉼표, 중괄호 확인
- **connect ETIMEDOUT / ECONNREFUSED** → 인터넷 또는 노드 상태 확인
- **Account not found** → 주소 확인, 테스트넷이라면 faucet으로 활성화

### 디버깅 팁

1. 먼저 노드 연결부터 테스트
2. 항상 \`try/catch\` 사용
3. 노드 URL을 다시 확인
4. 작업 후 \`await client.disconnect()\` 호출
5. 너무 오래 걸리면 타임아웃이나 노드 과부하를 의심

오류를 무서워하기보다, 메시지를 차분히 읽고 원인을 좁혀가는 습관이 중요합니다.`,
        zh: `你已经了解了 Node.js 项目的结构，现在来学习如何**运行脚本**，以及最重要的——如何**理解和解决错误**。

### 使用 Node.js 运行脚本

要运行任何 JavaScript 文件，使用以下命令：

\`\`\`
node 文件名.js
\`\`\`

例如：
\`\`\`
node hi-xahau.js
node 01-connection.js
node my-script.js
\`\`\`

**重要**：你必须在文件所在目录中运行命令，或使用完整路径。

### 读懂错误信息（堆栈跟踪）

发生错误时，Node.js 会显示**堆栈跟踪**——包含错误信息的消息。学会读懂它：

1. **第一行**：发生错误的文件和行号（\`my-script.js:5\`）
2. **错误类型**：\`SyntaxError\`、\`TypeError\`、\`ReferenceError\` 等
3. **消息**：问题的说明
4. **堆栈跟踪**：导致错误的执行路径

### 使用 console.log 调试

\`console.log()\` 是你最好的调试工具。用它在代码任意位置查看变量的值：

\`\`\`
console.log("第一步：连接中...");
console.log("response 的值：", response);
console.log("数据类型：", typeof variable);
console.log("完整对象：", JSON.stringify(object, null, 2));
\`\`\`

### 常见错误及解决方法

**Cannot find module 'xahau'**
原因：未安装该库或不在正确目录。
解决：在项目文件夹中运行 \`npm install xahau\`。

**await is only valid in async functions**
原因：在未标记 \`async\` 的函数外使用了 \`await\`。
解决：将代码包裹在 \`async\` 函数中。

**Unexpected token**
原因：语法错误——缺少逗号、括号或花括号。
解决：检查提示的行及其前几行。

**connect ETIMEDOUT / ECONNREFUSED**
原因：无法连接到 Xahau 节点（网络断开、防火墙或无网络）。
解决：检查网络连接；如持续失败，尝试其他节点或稍后再试。

**Account not found**
原因：查询的账户在账本中不存在或未被激活。
解决：确认地址是否正确。在测试网上，使用水龙头激活账户。

### 区块链连接调试技巧

1. **先测试连接**：在执行复杂操作前，先确认能连接到节点
2. **始终使用 try/catch**：任何网络操作都可能失败
3. **检查节点 URL**：测试网 \`wss://xahau-test.net\`，主网 \`wss://xahau.network\`
4. **完成后断开连接**：使用 \`await client.disconnect()\` 释放资源
5. **注意超时**：操作耗时过长可能表示节点负载过高`,
      },
      codeBlocks: [
        {
          title: {
            es: "Script con manejo de errores y depuración",
            en: "Script with error handling and debugging",
            jp: "エラー処理とデバッグ付きスクリプト",
            ko: "오류 처리와 디버깅이 포함된 스크립트",
            zh: "包含错误处理和调试的脚本",
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
            ko: `// 파일: debug-errors.js
// 실행: node debug-errors.js
// 이 스크립트는 오류를 단계별로 다루는 방법을 보여줍니다.

const { Client } = require("xahau");

async function main() {
  console.log("=== Xahau 오류 디버깅 ===");

  // 1단계: 라이브러리 import 확인
  console.log("1. xahau 라이브러리 import 완료");
  console.log("   Client 타입:", typeof Client);

  // 2단계: 클라이언트 생성
  const client = new Client("wss://xahau-test.net");
  console.log("2. 다음 노드용 클라이언트 생성:", "wss://xahau-test.net");

  // 3단계: 연결 시도
  try {
    console.log("3. 연결 시도 중...");
    await client.connect();
    console.log("   정상적으로 연결되었습니다");
  } catch (error) {
    console.error("   연결 오류:", error.message);
    console.error("   가능한 원인:");
    console.error("   - 인터넷 연결 없음");
    console.error("   - 노드 다운");
    console.error("   - WebSocket 차단");
    return;
  }

  // 4단계: 질의 실행
  try {
    console.log("4. server_info 조회 중...");
    const response = await client.request({
      command: "server_info"
    });

    // 5단계: 응답 확인
    console.log("5. 응답 수신:");
    console.log("   타입:", typeof response);
    console.log("   키:", Object.keys(response.result));

    const info = response.result.info;
    console.log("   네트워크:", info.network_id);
    console.log("   레저:", info.validated_ledger.seq);
  } catch (error) {
    console.error("   질의 오류:", error.message);
  }

  // 6단계: 연결 종료
  try {
    await client.disconnect();
    console.log("6. 정상적으로 연결 종료");
  } catch (error) {
    console.error("   종료 오류:", error.message);
  }

  console.log("=== 디버깅 종료 ===");
}

main();`,
            zh: `// 文件：debug-errors.js
// 运行方式：node debug-errors.js
// 此脚本展示如何逐步处理错误。

const { Client } = require("xahau");

async function main() {
  console.log("=== Xahau 错误调试 ===");

  // 第一步：验证库是否正确导入
  console.log("1. xahau 库导入成功");
  console.log("   Client 类型：", typeof Client);

  // 第二步：创建客户端
  const client = new Client("wss://xahau-test.net");
  console.log("2. 已为以下节点创建客户端：", "wss://xahau-test.net");

  // 第三步：尝试连接并处理错误
  try {
    console.log("3. 尝试连接...");
    await client.connect();
    console.log("   连接成功");
  } catch (error) {
    console.error("   连接错误：", error.message);
    console.error("   可能的原因：");
    console.error("   - 无网络连接");
    console.error("   - 节点宕机");
    console.error("   - 防火墙阻止 WebSocket");
    return; // 无法连接时退出函数
  }

  // 第四步：发起查询
  try {
    console.log("4. 查询 server_info...");
    const response = await client.request({
      command: "server_info"
    });

    // 第五步：检查响应
    console.log("5. 收到响应：");
    console.log("   类型：", typeof response);
    console.log("   键：", Object.keys(response.result));

    const info = response.result.info;
    console.log("   网络：", info.network_id);
    console.log("   账本：", info.validated_ledger.seq);
  } catch (error) {
    console.error("   查询错误：", error.message);
  }

  // 第六步：断开连接
  try {
    await client.disconnect();
    console.log("6. 已正常断开连接");
  } catch (error) {
    console.error("   断开连接错误：", error.message);
  }

  console.log("=== 调试结束 ===");
}

main();`,
          },
        },
        {
          title: {
            es: "Test de conectividad y errores comunes",
            en: "Connectivity test and common errors",
            jp: "接続テストとよくあるエラー",
            ko: "연결 테스트와 자주 발생하는 오류",
            zh: "连接测试与常见错误",
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
            ko: `// 파일: connectivity-test.js
// 실행: node connectivity-test.js
// 연결을 테스트하고 자주 발생하는 오류를 확인합니다.

const { Client } = require("xahau");

// 연결 테스트용 헬퍼 함수
async function testConexion(url, nombre) {
  console.log("테스트 중:", nombre, "(" + url + ")");

  const client = new Client(url);

  try {
    await client.connect();
    const response = await client.request({ command: "server_info" });
    const ledger = response.result.info.validated_ledger.seq;
    console.log("연결됨 - 레저:", ledger);
    await client.disconnect();
    return true;
  } catch (error) {
    console.log("오류:", error.message);
    return false;
  }
}

async function main() {
  console.log("=== Xahau 연결 테스트 ===");

  // 테스트 1: testnet 연결
  await testConexion("wss://xahau-test.net", "Xahau Testnet");

  console.log("");

  // 테스트 2: mainnet 연결
  await testConexion("wss://xahau.network", "Xahau Mainnet");

  console.log("");

  // 테스트 3: 잘못된 URL
  await testConexion("wss://nodo-doesnt-exist.example.com", "잘못된 URL");

  console.log("=== 요약 ===");
  console.log("testnet과 mainnet이 연결되면 환경 준비 완료.");
  console.log("실패하면 인터넷 연결을 확인하세요.");
  console.log("잘못된 URL은 반드시 실패해야 합니다.");
}

main();`,
            zh: `// 文件：connectivity-test.js
// 运行方式：node connectivity-test.js
// 测试连接并展示常见错误。

const { Client } = require("xahau");

// 测试连接的辅助函数
async function testConexion(url, nombre) {
  console.log("测试中：", nombre, "(" + url + ")");

  const client = new Client(url);

  try {
    await client.connect();
    const response = await client.request({ command: "server_info" });
    const ledger = response.result.info.validated_ledger.seq;
    console.log("已连接 - 账本：", ledger);
    await client.disconnect();
    return true;
  } catch (error) {
    console.log("错误：", error.message);
    return false;
  }
}

async function main() {
  console.log("=== Xahau 连接测试 ===");

  // 测试 1：连接测试网（应该成功）
  await testConexion("wss://xahau-test.net", "Xahau Testnet");

  console.log("");

  // 测试 2：连接主网（应该成功）
  await testConexion("wss://xahau.network", "Xahau Mainnet");

  console.log("");

  // 测试 3：错误 URL（应该失败——错误示例）
  await testConexion("wss://nodo-doesnt-exist.example.com", "错误 URL");

  console.log("=== 总结 ===");
  console.log("如果测试网和主网都能连接：你的环境已就绪。");
  console.log("如果有失败：检查你的网络连接。");
  console.log("错误 URL 必须失败（这是错误测试）。");
}

main();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Ejecutar scripts", en: "Running Scripts", jp: "スクリプトの実行", ko: "스크립트 실행", zh: "运行脚本" },
          content: {
            es: "Comando básico:\nnode nombre-archivo.js\n\nDebes estar en la carpeta del proyecto\n(donde está package.json y node_modules/)\n\nEjemplo:\ncd xahau-curso\nnode hola-xahau.js",
            en: "Basic command:\nnode filename.js\n\nYou must be in the project folder\n(where package.json and node_modules/ are)\n\nExample:\ncd xahau-curso\nnode hola-xahau.js",
            jp: "基本コマンド:\nnode ファイル名.js\n\nプロジェクトフォルダにいる必要があります\n（package.jsonとnode_modules/がある場所）\n\n例:\ncd xahau-curso\nnode hola-xahau.js",
            ko: "기본 명령:\nnode filename.js\n\n프로젝트 폴더 안에서 실행해야 합니다\n(package.json과 node_modules/가 있는 위치)\n\n예시:\ncd xahau-curso\nnode hola-xahau.js",
            zh: "基本命令：\nnode 文件名.js\n\n必须在项目文件夹中运行\n（package.json 和 node_modules/ 所在位置）\n\n示例：\ncd xahau-curso\nnode hola-xahau.js",
          },
          visual: "▶️",
        },
        {
          title: { es: "Leer errores (stack trace)", en: "Reading Errors (Stack Trace)", jp: "エラーの読み方（スタックトレース）", ko: "오류 읽기 (스택 트레이스)", zh: "读懂错误（堆栈跟踪）" },
          content: {
            es: "1. Archivo y línea del error → mi-script.js:5\n2. Tipo de error → SyntaxError, TypeError...\n3. Mensaje → Qué salió mal\n4. Stack trace → Ruta de ejecución\n\nSiempre empieza leyendo el TIPO y el MENSAJE",
            en: "1. File and line of the error → mi-script.js:5\n2. Error type → SyntaxError, TypeError...\n3. Message → What went wrong\n4. Stack trace → Execution path\n\nAlways start by reading the TYPE and MESSAGE",
            jp: "1. エラーのファイルと行番号 → mi-script.js:5\n2. エラーの種類 → SyntaxError、TypeError...\n3. メッセージ → 何が問題だったか\n4. スタックトレース → 実行パス\n\nまず種類とメッセージを読むことから始める",
            ko: "1. 오류가 난 파일과 줄 → mi-script.js:5\n2. 오류 종류 → SyntaxError, TypeError...\n3. 메시지 → 무엇이 잘못됐는지\n4. 스택 트레이스 → 실행 경로\n\n항상 먼저 오류 종류와 메시지를 읽으세요",
            zh: "1. 错误的文件和行号 → mi-script.js:5\n2. 错误类型 → SyntaxError、TypeError...\n3. 消息 → 出了什么问题\n4. 堆栈跟踪 → 执行路径\n\n始终先读错误类型和消息",
          },
          visual: "🔍",
        },
        {
          title: { es: "Errores más comunes", en: "Most Common Errors", jp: "よくあるエラー", ko: "자주 발생하는 오류", zh: "最常见错误" },
          content: {
            es: "Cannot find module 'xahau'\n  → npm install xahau\n\nawait is only valid in async functions\n  → Envolver en async function\n\nconnect ETIMEDOUT\n  → Verificar internet / nodo\n\nUnexpected token\n  → Revisar sintaxis (comas, llaves)",
            en: "Cannot find module 'xahau'\n  → npm install xahau\n\nawait is only valid in async functions\n  → Wrap in async function\n\nconnect ETIMEDOUT\n  → Check internet / node\n\nUnexpected token\n  → Check syntax (commas, braces)",
            jp: "Cannot find module 'xahau'\n  → npm install xahau\n\nawait is only valid in async functions\n  → async関数でラップする\n\nconnect ETIMEDOUT\n  → インターネット/ノードを確認\n\nUnexpected token\n  → 構文を確認（カンマ、波括弧）",
            ko: "Cannot find module 'xahau'\n  → npm install xahau\n\nawait is only valid in async functions\n  → async function으로 감싸기\n\nconnect ETIMEDOUT\n  → 인터넷 / 노드 확인\n\nUnexpected token\n  → 문법 확인 (쉼표, 중괄호)",
            zh: "Cannot find module 'xahau'\n  → npm install xahau\n\nawait is only valid in async functions\n  → 包裹在 async function 中\n\nconnect ETIMEDOUT\n  → 检查网络 / 节点\n\nUnexpected token\n  → 检查语法（逗号、花括号）",
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
        ko: ".env로 키를 안전하게 저장하기",
        zh: "使用 .env 安全存储密钥",
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
        ko: `이 강좌에서는 Xahau 계정의 **시드(seed)**와 같은 민감한 정보를 다룹니다. 테스트넷이라도 처음부터 안전한 습관을 들이는 것이 중요합니다.

### 왜 키를 코드에 직접 넣으면 안 될까?

비밀키를 코드에 적어 두면:

- GitHub에 올리는 순간 노출될 수 있습니다
- 파일을 공유하면 키도 함께 공유됩니다
- 공개 저장소는 자동 스캐너가 감시할 수 있습니다
- 나중에 지워도 Git 기록에 남을 수 있습니다

### .env 파일이란?

\`.env\`는 시드, 노드 URL, API 키처럼 코드에 직접 두면 안 되는 값을 저장하는 텍스트 파일입니다.

\`\`\`
WALLET_A_SEED=sEdVxxxYourTestnetSeed
WALLET_B_SEED=sEdYyyAnotherTestnetSeed
XAHAU_NODE=wss://xahau-test.net
\`\`\`

### 기본 규칙

- \`.env\`는 항상 \`.gitignore\`에 추가
- 환경마다 별도 \`.env\` 사용 가능
- \`KEY=value\` 형식 사용
- 각 변수는 한 줄에 하나씩 작성

### dotenv 사용

\`dotenv\`는 \`.env\` 값을 \`process.env\`로 불러옵니다:

\`\`\`
npm install dotenv
require("dotenv").config();
\`\`\`

그 후에는 \`process.env.WALLET_A_SEED\`처럼 사용할 수 있습니다.

### 권장 흐름

1. \`.env\` 파일 생성
2. \`.gitignore\`에 \`.env\` 추가
3. 스크립트 시작 부분에서 dotenv 로드
4. \`process.env\`로 값 읽기
5. 공유용으로는 실제 값 없는 \`.env.example\` 생성

메인넷 비밀키는 한 번 노출되면 되돌릴 수 없으므로, 이 습관은 선택이 아니라 필수입니다.`,
        zh: `在整个课程中，我们将使用 Xahau 账户的**种子（seeds）**（私钥）。从一开始就学会安全存储它们非常重要——即使在测试网上也要如此，养成的好习惯将在主网上保护你。

### 为什么不应该把密钥直接写在代码里？

假设你的脚本中有这样的代码：

\`\`\`
const wallet = Wallet.fromSeed("sEdV9mHTYLPKPPPfBGB9xpGnFxsQo4r");
\`\`\`

这是**非常危险**的，原因如下：

- 如果你将代码上传到 **GitHub**（或其他仓库），任何人都能看到你的私钥并盗走资金
- 与他人分享文件（通过邮件、聊天等）就等于分享了你的密钥
- GitHub 上的机器人会**扫描公开仓库**寻找暴露的私钥，并在几秒内自动盗走资金
- 即使之后删除了密钥，Git 历史记录**仍然保留**，依然可以被访问

### 什么是 .env 文件？

\`.env\` 文件（"environment" 的缩写）是一个纯文本文件，用于存储**环境变量**——你的代码需要但不应出现在源代码中的敏感配置：

\`\`\`
WALLET_A_SEED=sEdVxxx你的测试网种子
WALLET_B_SEED=sEdYyy另一个测试网种子
XAHAU_NODE=wss://xahau-test.net
\`\`\`

### .env 文件规则

- **不要将 .env 提交到 Git**：始终将其添加到 \`.gitignore\`
- **每个环境一个 .env**：测试网和主网可以各有一个
- **不加引号**（除非值中包含空格）：\`KEY=value\`
- **等号两边不加空格**：\`KEY=value\`（正确）vs \`KEY = value\`（错误）
- **每个变量独占一行**

### 安装 dotenv

\`dotenv\` 库读取 \`.env\` 文件并将变量加载到 \`process.env\` 中：

\`\`\`
npm install dotenv
\`\`\`

### 在代码中使用 dotenv

在脚本开头添加一行：

\`\`\`
require("dotenv").config();
\`\`\`

这将把 \`.env\` 文件中的所有变量加载到 \`process.env\` 对象中。然后可以这样访问：

\`\`\`
const seed = process.env.WALLET_A_SEED;
const node = process.env.XAHAU_NODE;
\`\`\`

### 创建 .gitignore 文件

\`.gitignore\` 文件告诉 Git **不要跟踪或上传**哪些文件。在项目根目录创建一个名为 \`.gitignore\` 的文件，内容如下：

\`\`\`
.env
node_modules/
\`\`\`

这样可以同时保护你的密钥（\`.env\`）和已下载的库（\`node_modules/\`）。

### 推荐工作流

1. 创建包含密钥的 \`.env\` 文件
2. 创建或更新 \`.gitignore\` 以排除 \`.env\`
3. 每个脚本开头加载 dotenv：\`require("dotenv").config()\`
4. 通过 \`process.env.变量名\` 访问密钥
5. 分享代码时，创建不含真实值的 \`.env.example\` 文件，让其他人知道需要哪些变量

### 安全影响

- **测试网**：测试网种子泄露不会损失真实资金，但可能干扰你的测试
- **主网**：主网种子泄露，**你可能永久失去所有资金**。区块链上没有办法追回被盗资金
- **公开仓库**：一旦种子被上传到公开仓库，视为**已泄露**。立即将资金转移到新账户
- **Git 历史**：即使删除了文件，种子仍留在历史中。需要重写 Git 历史，操作复杂`,
      },
      codeBlocks: [
        {
          title: {
            es: "Crear el archivo .env",
            en: "Create the .env file",
            jp: ".envファイルを作成する",
            ko: ".env 파일 만들기",
            zh: "创建 .env 文件",
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
            ko: `# 1. dotenv 라이브러리 설치
npm install dotenv

# 2. .env 파일 생성 (프로젝트 루트)
# 중요: 이 파일은 Git에 올리지 않습니다

# .env 파일 내용:
# WALLET_A_SEED=sEdVxxxYourTestnetSeed
# WALLET_B_SEED=sEdYyyAnotherTestnetSeed
# XAHAU_NODE=wss://xahau-test.net

# 3. .gitignore 파일 생성
# .gitignore 내용:
# .env
# node_modules/

# 4. (선택) 변수 문서화를 위한 .env.example 생성
# .env.example 내용:
# WALLET_A_SEED=your_seed_here
# WALLET_B_SEED=your_seed_here
# XAHAU_NODE=wss://xahau-test.net`,
            zh: `# 1. 安装 dotenv 库
npm install dotenv

# 2. 创建 .env 文件（在项目根目录）
# 重要：此文件不上传到 Git

# .env 文件内容：
# WALLET_A_SEED=sEdVxxx你的测试网种子
# WALLET_B_SEED=sEdYyy另一个测试网种子
# XAHAU_NODE=wss://xahau-test.net

# 3. 创建 .gitignore 文件
# .gitignore 文件内容：
# .env
# node_modules/

# 4. （可选）创建 .env.example 来记录变量
# .env.example 文件内容：
# WALLET_A_SEED=在此填入你的种子
# WALLET_B_SEED=在此填入你的种子
# XAHAU_NODE=wss://xahau-test.net`,
          },
        },
        {
          title: {
            es: "Script que usa variables de entorno con dotenv",
            en: "Script that uses environment variables with dotenv",
            jp: "dotenvで環境変数を使用するスクリプト",
            ko: "dotenv로 환경 변수를 사용하는 스크립트",
            zh: "使用 dotenv 读取环境变量的脚本",
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
            ko: `// 파일: safe-payment.js
// 실행: node safe-payment.js
// 필요: WALLET_A_SEED, WALLET_B_SEED, XAHAU_NODE가 들어 있는 .env 파일

// 1. .env에서 환경 변수 로드
require("dotenv").config();

const { Client, Wallet } = require("xahau");

async function main() {
  // 2. 코드가 아니라 process.env에서 값 읽기
  const seedA = process.env.WALLET_A_SEED;
  const seedB = process.env.WALLET_B_SEED;
  const node = process.env.XAHAU_NODE;

  // 3. 값 존재 여부 확인
  if (!seedA || !seedB) {
    console.error("오류: .env 파일에 변수가 없습니다");
    console.error("WALLET_A_SEED와 WALLET_B_SEED가 정의되어 있는지 확인하세요.");
    console.error(".env.example을 .env로 복사한 뒤 값을 채우세요.");
    return;
  }

  if (!node) {
    console.error("오류: .env에 XAHAU_NODE가 없습니다");
    return;
  }

  console.log(".env에서 변수를 정상적으로 불러왔습니다");
  console.log("노드:", node);
  // 시드는 testnet이라도 절대 출력하지 마세요

  const client = new Client(node);
  await client.connect();

  // 4. .env의 시드로 지갑 생성
  const walletA = Wallet.fromSeed(seedA, {algorithm: 'secp256k1'});
  const walletB = Wallet.fromSeed(seedB, {algorithm: 'secp256k1'});

  console.log("Wallet A:", walletA.address);
  console.log("Wallet B:", walletB.address);

  // 5. A에서 B로 결제 전송
  const payment = {
    TransactionType: "Payment",
    Account: walletA.address,
    Destination: walletB.address,
    Amount: "10000000", // 10 XAH
  };

  const result = await client.submitAndWait(payment, { wallet: walletA });
  console.log("결과:", result.result.meta.TransactionResult);

  await client.disconnect();
}

main().catch(console.error);`,
            zh: `// 文件：safe-payment.js
// 运行方式：node safe-payment.js
// 需要：包含 WALLET_A_SEED、WALLET_B_SEED 和 XAHAU_NODE 的 .env 文件

// 1. 从 .env 加载环境变量
require("dotenv").config();

const { Client, Wallet } = require("xahau");

async function main() {
  // 2. 从 process.env 读取密钥（而非硬编码在代码中）
  const seedA = process.env.WALLET_A_SEED;
  const seedB = process.env.WALLET_B_SEED;
  const node = process.env.XAHAU_NODE;

  // 3. 验证变量是否存在
  if (!seedA || !seedB) {
    console.error("错误：.env 文件中缺少变量");
    console.error("请确保 WALLET_A_SEED 和 WALLET_B_SEED 已定义。");
    console.error("将 .env.example 复制为 .env 并填入真实值。");
    return;
  }

  if (!node) {
    console.error("错误：.env 中缺少 XAHAU_NODE");
    return;
  }

  console.log("已从 .env 正确加载变量");
  console.log("节点：", node);
  // 永远不要 console.log 种子——即使在测试网上也不行

  const client = new Client(node);
  await client.connect();

  // 4. 用 .env 中的种子创建钱包
  const walletA = Wallet.fromSeed(seedA, {algorithm: 'secp256k1'});
  const walletB = Wallet.fromSeed(seedB, {algorithm: 'secp256k1'});

  console.log("钱包 A：", walletA.address);
  console.log("钱包 B：", walletB.address);

  // 5. 从 A 向 B 发送付款
  const payment = {
    TransactionType: "Payment",
    Account: walletA.address,
    Destination: walletB.address,
    Amount: "10000000", // 10 XAH
  };

  const result = await client.submitAndWait(payment, { wallet: walletA });
  console.log("结果：", result.result.meta.TransactionResult);

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
            ko: "실제 키 없이 공유하는 .env.example 예시",
            zh: ".env.example 示例（共享时不含真实密钥）",
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
            ko: `# 파일: .env.example
# 이 파일을 .env로 복사한 뒤 실제 값을 입력하세요:
#   cp .env.example .env
#
# .env 파일은 절대 Git에 올리지 마세요.
# 이 .env.example 파일은 실제 키가 없으므로 공유해도 됩니다.

WALLET_A_SEED=your_testnet_seed_here
WALLET_B_SEED=your_testnet_seed_here
XAHAU_NODE=wss://xahau-test.net`,
            zh: `# 文件：.env.example
# 将此文件复制为 .env 并填入真实值：
#   cp .env.example .env
#
# 永远不要将 .env 文件上传到 Git。
# 这个 .env.example 文件没有真实密钥，可以共享。

WALLET_A_SEED=在此填入你的测试网种子
WALLET_B_SEED=在此填入你的测试网种子
XAHAU_NODE=wss://xahau-test.net`,
          },
        },
      ],
      slides: [
        {
          title: { es: "¿Por qué usar .env?", en: "Why use .env?", jp: "なぜ.envを使うのか？", ko: "왜 .env를 사용하나요?", zh: "为什么使用 .env？" },
          content: {
            es: "NUNCA pongas claves privadas en el código\n\n• Los bots escanean GitHub y roban fondos\n• El historial de Git conserva las claves\n• Compartir código = compartir claves\n\nSolución: archivo .env + .gitignore",
            en: "NEVER put private keys in the code\n\n• Bots scan GitHub and steal funds\n• Git history preserves the keys\n• Sharing code = sharing keys\n\nSolution: .env file + .gitignore",
            jp: "秘密鍵をコードに絶対入れない\n\n• ボットがGitHubをスキャンして資金を盗む\n• Gitの履歴がキーを保持する\n• コードを共有する = キーを共有する\n\n解決策: .envファイル + .gitignore",
            ko: "비밀키를 코드에 직접 넣지 마세요\n\n• 봇이 GitHub를 스캔해 자금을 탈취할 수 있음\n• Git 기록에 키가 남을 수 있음\n• 코드 공유 = 키 공유\n\n해결책: .env 파일 + .gitignore",
            zh: "永远不要将私钥写入代码\n\n• 机器人扫描 GitHub 并盗取资金\n• Git 历史记录会保留密钥\n• 共享代码 = 共享密钥\n\n解决方案：.env 文件 + .gitignore",
          },
          visual: "🔐",
        },
        {
          title: { es: "Cómo usar dotenv", en: "How to use dotenv", jp: "dotenvの使い方", ko: "dotenv 사용 방법", zh: "如何使用 dotenv" },
          content: {
            es: "1. npm install dotenv\n2. Crear .env con tus claves\n3. Añadir .env a .gitignore\n4. En tu script: require(\"dotenv\").config()\n5. Leer: process.env.NOMBRE_VARIABLE",
            en: "1. npm install dotenv\n2. Create .env with your keys\n3. Add .env to .gitignore\n4. In your script: require(\"dotenv\").config()\n5. Read: process.env.VARIABLE_NAME",
            jp: "1. npm install dotenv\n2. キーを含む.envを作成する\n3. .envを.gitignoreに追加する\n4. スクリプトで: require(\"dotenv\").config()\n5. 読み取り: process.env.変数名",
            ko: "1. npm install dotenv\n2. 키를 넣은 .env 생성\n3. .env를 .gitignore에 추가\n4. 스크립트에서: require(\"dotenv\").config()\n5. 읽기: process.env.VARIABLE_NAME",
            zh: "1. npm install dotenv\n2. 创建包含密钥的 .env\n3. 将 .env 添加到 .gitignore\n4. 脚本中：require(\"dotenv\").config()\n5. 读取：process.env.变量名",
          },
          visual: "📋",
        },
        {
          title: { es: "Buenas prácticas", en: "Best Practices", jp: "ベストプラクティス", ko: "모범 사례", zh: "最佳实践" },
          content: {
            es: "• .env → Claves reales (NO subir a Git)\n• .env.example → Plantilla sin claves (SÍ subir)\n• .gitignore → Excluir .env y node_modules/\n• Nunca hacer console.log de un seed\n• En mainnet: un seed filtrado = fondos perdidos",
            en: "• .env → Real keys (DO NOT upload to Git)\n• .env.example → Template without keys (DO upload)\n• .gitignore → Exclude .env and node_modules/\n• Never console.log a seed\n• On mainnet: a leaked seed = lost funds",
            jp: "• .env → 実際のキー（Gitにアップロードしない）\n• .env.example → キーなしのテンプレート（アップロード可）\n• .gitignore → .envとnode_modules/を除外する\n• シードをconsole.logしない\n• メインネット: シードが漏洩 = 資金を失う",
            ko: "• .env → 실제 키 (Git에 올리지 않기)\n• .env.example → 키 없는 템플릿 (공유 가능)\n• .gitignore → .env와 node_modules/ 제외\n• 시드는 절대 console.log 하지 않기\n• 메인넷: 시드 유출 = 자금 손실",
            zh: "• .env → 真实密钥（不上传到 Git）\n• .env.example → 无密钥模板（可上传）\n• .gitignore → 排除 .env 和 node_modules/\n• 永远不要 console.log 种子\n• 主网：种子泄露 = 资金损失",
          },
          visual: "✅",
        },
      ],
    },
  ],
}
