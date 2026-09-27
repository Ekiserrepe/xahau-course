import { deriveCodeTranslations } from "../code-i18n.js";
import { addGlossaryLesson, addNewWords } from "../glossary.js";
const moduleData = {
  id: "m0",
  icon: "⚙️",
  title: {
    es: "Preparación del entorno de trabajo",
    pt: "Preparação do ambiente de trabalho",
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
        pt: "Instalação do Visual Studio Code",
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
        pt: `**Visual Studio Code (VS Code)** é o editor de código que usaremos durante todo o curso. Ele é gratuito, leve e tem um ecossistema enorme de extensões que facilitarão o desenvolvimento.
### Por que VS Code?
- **Gratuito e open source** (mantido pela Microsoft)
- **Multiplataforma**: funciona em Windows, macOS e Linux
- **Terminal integrado**: você pode executar comandos sem sair do editor
- **Extensões**: suporte para JavaScript, formatação automática, autocompletar inteligente e muito mais
- **Git integrado**: controle de versão sem sair do editor
### Instalação no Windows
1. Acesse [code.visualstudio.com](https://code.visualstudio.com)
2. Clique em **"Download for Windows"**
3. Execute o instalador \`.exe\` baixado
4. Durante a instalação, marque estas opções recomendadas:
   - ✅ Adicionar "Abrir com Code" ao menu contextual de arquivos
   - ✅ Adicionar "Abrir com Code" ao menu contextual de diretórios
   - ✅ Adicionar ao PATH (para poder abrir pelo terminal com \`code .\`)
5. Clique em **Instalar** e espere terminar
### Instalação no macOS
1. Acesse [code.visualstudio.com](https://code.visualstudio.com)
2. Clique em **"Download for Mac"**
3. Abra o arquivo \`.zip\` baixado
4. Arraste **Visual Studio Code.app** para a pasta **Aplicativos**
5. Para usar o comando \`code\` pelo terminal:
   - Abra VS Code
   - Pressione \`Cmd + Shift + P\` para abrir a paleta de comandos
   - Digite **"Shell Command: Install 'code' command in PATH"**
   - Selecione a opção e confirme
### Instalação no Linux (Ubuntu/Debian)
1. Abra um terminal e execute os seguintes comandos:
\`\`\`
sudo apt update
sudo apt install software-properties-common apt-transport-https wget
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code
\`\`\`
2. Como alternativa, baixe o pacote \`.deb\` em [code.visualstudio.com](https://code.visualstudio.com) e dê dois cliques para instalá-lo
### Instalação no Linux (Fedora/RHEL)
1. Abra um terminal e executa:
\`\`\`
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\\nname=Visual Studio Code\\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\\nenabled=1\\ngpgcheck=1\\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
sudo dnf install code
\`\`\`
### Verificar a instalação
Uma vez instalado, abra um terminal (ou o Prompt de Comando no Windows) e executa:
\`\`\`
code --version
\`\`\`
Ele deve mostrar o número da versão instalada.`,
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
            pt: "Verificar a instalação do VS Code pelo terminal",
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
            pt: `# Verificar se o VS Code está instalado
code --version
# Abrir o VS Code no diretório atual
code .
# Abrir um arquivo específico
code mi-arquivo.js`,
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
            pt: "Extensões recomendadas para o curso",
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
            pt: `# Instalar extensões pelo terminal
# (você também pode buscá-las na aba Extensões do VS Code)
# Suporte melhorado para JavaScript/TypeScript
code --install-extension dbaeumer.vscode-eslint
# Formatação automática de código
code --install-extension esbenp.prettier-vscode
# Cores para pares de colchetes
code --install-extension CoenraadS.bracket-pair-colorizer-2
# Ícones para o explorador de arquivos
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
          title: { es: "Visual Studio Code", pt: "Visual Studio Code", en: "Visual Studio Code", jp: "Visual Studio Code", ko: "Visual Studio Code", zh: "Visual Studio Code" },
          content: {
            es: "Editor de código gratuito y multiplataforma\n\n• Windows, macOS y Linux\n• Terminal integrada\n• Miles de extensiones\n• Git integrado\n• Descarga: code.visualstudio.com",
            pt: "Editor de código gratuito e multiplataforma\n\n• Windows, macOS e Linux\n• Terminal integrado\n• Milhares de extensões\n• Git integrado\n• Download: code.visualstudio.com",
            en: "Free and cross-platform code editor\n\n• Windows, macOS, and Linux\n• Integrated terminal\n• Thousands of extensions\n• Built-in Git\n• Download: code.visualstudio.com",
            jp: "無料のクロスプラットフォームコードエディタ\n\n• Windows、macOS、Linux対応\n• 統合ターミナル\n• 数千の拡張機能\n• Git統合\n• ダウンロード: code.visualstudio.com",
            ko: "무료 크로스플랫폼 코드 에디터\n\n• Windows, macOS, Linux 지원\n• 통합 터미널\n• 수천 개의 확장 기능\n• Git 통합\n• 다운로드: code.visualstudio.com",
            zh: "免费跨平台代码编辑器\n\n• 支持 Windows、macOS 和 Linux\n• 集成终端\n• 数千个插件\n• 内置 Git\n• 下载：code.visualstudio.com",
          },
          visual: "💻",
        },
        {
          title: { es: "Instalación rápida", pt: "Instalação rápida", en: "Quick Installation", jp: "クイックインストール", ko: "빠른 설치", zh: "快速安装" },
          content: {
            es: "🪟 Windows → Descargar .exe e instalar\n🍎 macOS → Descargar .zip, arrastrar a Aplicaciones\n🐧 Linux → apt install code / dnf install code\n\n✅ Verificar: code --version",
            pt: "🪟 Windows → Baixar .exe e instalar\n🍎 macOS → Baixar .zip e arrastar para Aplicativos\n🐧 Linux → apt install code / dnf install code\n\n✅ Verificar: code --version",
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
        pt: "Instalação do Node.js",
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
        pt: `**Node.js** é o ambiente de execução de JavaScript de que precisamos para executar os scripts do curso. Todos os exemplos de código que interagem com a blockchain Xahau são executados com Node.js.
### O que é Node.js?
O Node.js permite executar código JavaScript **fora do navegador**, diretamente no seu computador. Inclui:
- **node**: O intérprete de JavaScript (executa seus scripts)
- **npm**: O gerenciador de pacotes (instala bibliotecas como \`xahau\`)
- **npx**: Executor de pacotes (executa ferramentas sem instalar globalmente)
### Versão recomendada
Para este curso, você precisa do **Node.js v18 ou superior** (recomendamos a versão LTS mais recente). A biblioteca \`xahau\` exige pelo menos a v18.
### Instalação no Windows
1. Acesse [nodejs.org](https://nodejs.org)
2. Baixe a versão **LTS** (Long Term Support)
3. Execute o instalador \`.msi\`
4. Siga o assistente com as opções padrão
5. **Importante**: marque a caixa "Automatically install the necessary tools" se ela aparecer
6. Reinicie o terminal depois de instalar
### Instalação no macOS
**Opção A — Instalador oficial:**
1. Acesse [nodejs.org](https://nodejs.org)
2. Baixe a versão **LTS** para macOS
3. Abra o arquivo \`.pkg\` e siga o assistente
**Opção B — Com Homebrew (recomendado):**
1. Se você não tem o Homebrew, instale-o primeiro em [brew.sh](https://brew.sh)
2. Execute no terminal:
\`\`\`
brew install node@22
\`\`\`
### Instalação no Linux (Ubuntu/Debian)
Use o repositório oficial da NodeSource para obter a versão mais recente:
\`\`\`
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
\`\`\`
### Instalação no Linux (Fedora)
\`\`\`
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf install -y nodejs
\`\`\`
### Verificar a instalação
Abra um **novo terminal** (isso é importante, principalmente no Windows) e execute:
\`\`\`
node --version
npm --version
\`\`\`
Você deve ver algo como \`v22.x.x\` e \`10.x.x\` respectivamente.
### Instalar a biblioteca xahau
Com o Node.js instalado, você já pode instalar a biblioteca que usaremos em todo o curso:
\`\`\`
mkdir xahau-curso
cd xahau-curso
npm init -y
npm install xahau
\`\`\`
Isso criará seu projeto e baixará a biblioteca \`xahau\` para que você possa executar todos os exemplos do curso.`,
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
            pt: "Verificar a instalação e criar o projeto do curso",
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
            pt: `# 1. Verificar se o Node.js está instalado
node --version
# Esperado: v22.x.x (ou v18+)
npm --version
# Esperado: 10.x.x
# 2. Criar o diretório do projeto do curso
mkdir xahau-curso
cd xahau-curso
# 3. Inicializar um projeto Node.js
npm init -y
# 4. Instalar a biblioteca xahau
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
            pt: "Seu primeiro script: Olá, Xahau",
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
            pt: `// Arquivo: hola-xahau.js
// Executar com: node hola-xahau.js
const { Client } = require("xahau");
async function main() {
  console.log("Conectando a Xahau...");
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  const response = await client.request({
    command: "server_info"
  });
  const info = response.result.info;
  console.log("Conectado corretamente!");
  console.log("Rede:", info.network_id);
  console.log("Versão:", info.build_version);
  console.log("Ledger:", info.validated_ledger.seq);
  await client.disconnect();
  console.log("Desconectado. Seu ambiente está pronto!");
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
          title: { es: "¿Qué es Node.js?", pt: "O que é Node.js?", en: "What is Node.js?", jp: "Node.jsとは？", ko: "Node.js란?", zh: "什么是 Node.js？" },
          content: {
            es: "JavaScript fuera del navegador\n\n• node → Ejecuta tus scripts\n• npm → Instala librerías\n• npx → Ejecuta herramientas\n\nVersiones: v18+ (recomendado v22 LTS)",
            pt: "JavaScript fora do navegador\n\n• node → Execute seus scripts\n• npm → Instala bibliotecas\n• npx → Execute ferramentas\n\nVersões: v18+ (recomendado v22 LTS)",
            en: "JavaScript outside the browser\n\n• node → Runs your scripts\n• npm → Installs libraries\n• npx → Runs tools\n\nVersions: v18+ (recommended v22 LTS)",
            jp: "ブラウザの外側で動くJavaScript\n\n• node → スクリプトを実行する\n• npm → ライブラリをインストールする\n• npx → ツールを実行する\n\nバージョン: v18+ (v22 LTS推奨)",
            ko: "브라우저 밖에서 실행되는 JavaScript\n\n• node → 스크립트 실행\n• npm → 라이브러리 설치\n• npx → 도구 실행\n\n버전: v18+ (v22 LTS 권장)",
            zh: "在浏览器之外运行的 JavaScript\n\n• node → 运行脚本\n• npm → 安装库\n• npx → 运行工具\n\n版本要求：v18+（推荐 v22 LTS）",
          },
          visual: "🟢",
        },
        {
          title: { es: "Instalación rápida", pt: "Instalação rápida", en: "Quick Installation", jp: "クイックインストール", ko: "빠른 설치", zh: "快速安装" },
          content: {
            es: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ Verificar:\nnode --version\nnpm --version",
            pt: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ Verificar:\nnode --version\nnpm --version",
            en: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ Verify:\nnode --version\nnpm --version",
            jp: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ 確認:\nnode --version\nnpm --version",
            ko: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ 확인:\nnode --version\nnpm --version",
            zh: "🪟 Windows → nodejs.org → .msi\n🍎 macOS → brew install node@22\n🐧 Linux → NodeSource + apt/dnf\n\n✅ 验证：\nnode --version\nnpm --version",
          },
          visual: "📦",
        },
        {
          title: { es: "Preparar el proyecto", pt: "Preparar o projeto", en: "Set Up the Project", jp: "プロジェクトの準備", ko: "프로젝트 준비", zh: "准备项目" },
          content: {
            es: "mkdir xahau-curso\ncd xahau-curso\nnpm init -y\nnpm install xahau\n\n¡Listo para ejecutar los scripts del curso!",
            pt: "mkdir xahau-curso\ncd xahau-curso\nnpm init -y\nnpm install xahau\n\nPronto para executar os scripts do curso!",
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
        pt: "Alternativa online: CodeSandbox",
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
├── m05-transacciones.js  ← Scripts del módulo 5
├── m06-pagos.js          ← Scripts del módulo 6
├── m07-tokens.js         ← Scripts del módulo 7
├── m08-nfts.js           ← Scripts del módulo 8
├── m09-hooks.js          ← Scripts del módulo 9
└── m10-escrows-checks.js ← Scripts del módulo 10
\`\`\`

### Limitaciones del plan gratuito

- **Sandboxes públicos**: tu código es visible para otros (no pongas claves privadas de mainnet)
- **Tiempo de inactividad**: el sandbox se pausa tras un rato sin uso (se reactiva al volver)
- **Recursos limitados**: suficiente para los scripts del curso, pero no para compilar Hooks en C

### Recomendación de seguridad

Como los sandboxes gratuitos son públicos, **nunca pongas seeds o claves privadas de mainnet** en CodeSandbox. Usa únicamente claves de **testnet** (tokens sin valor real). Para trabajar con mainnet, usa un entorno local con VS Code.`,
        pt: `Se você não quer ou não pode instalar software no seu computador, pode usar o **CodeSandbox**, um ambiente de desenvolvimento online gratuito que funciona diretamente no navegador.
### O que é CodeSandbox?
[CodeSandbox](https://codesandbox.io) é uma IDE na nuvem que permite escrever, executar e compartilhar código sem instalar nada. O plano gratuito inclui tudo de que você precisa para este curso.
### Vantagens do CodeSandbox
- **Sem instalação**: todo funciona no navegador
- **Acesso a partir de qualquer dispositivo**: você só precisa de internet
- **Terminal integrado**: você pode executar comandos npm e node
- **Compartilhar código**: cada sandbox tem uma URL única
- **Grátis**: o plano gratuito é suficiente para o curso
### Criar sua conta
1. Acesse [codesandbox.io](https://codesandbox.io)
2. Clique em **"Sign In"** (no canto superior direito)
3. Você pode registrar-se com sua conta do **GitHub**, **Google** ou **e-mail**
4. Depois de entrar, você chegará ao seu dashboard
### Criar um sandbox para o curso
1. No seu dashboard, clique em **"Create"** (no canto superior direito)
2. Selecione **"Import from GitHub"** ou procure o modelo **"Node.js"**
3. Se não encontrar o modelo de Node.js:
   - Clique em **"Create"** → **"Devbox"**
   - Selecione **"Node.js"** como modelo
4. Isso criará um ambiente com Node.js pré-instalado
### Configurar ou sandbox para Xahau
Uma vez dentro do sandbox:
1. **Abrir o terminal**: clique no ícone do terminal no painel inferior, ou use o menu **Terminal → New Terminal**
2. **Instale a biblioteca xahau**: execute no terminal:
\`\`\`
npm install xahau
\`\`\`
3. **Crie seu primeiro arquivo**: clique com o botão direito no explorador de arquivos (painel esquerdo) → **New File** → dê ao arquivo o nome \`hola-xahau.js\`
4. **Escreva o código**: copie qualquer exemplo do curso para o arquivo
5. **Executer o script**: na terminal, executa:
\`\`\`
node hola-xahau.js
\`\`\`
### Estrutura recomendada do sandbox
Organize seus arquivos assim para acompanhar o curso:
\`\`\`
xahau-curso/
├── package.json          ← Criado automaticamente
├── node_modules/         ← Criado com npm install
├── m01-arquitectura.js   ← Scripts do módulo 1
├── m02-consenso.js       ← Scripts do módulo 2
├── m03-wallet.js         ← Scripts do módulo 3
├── m04-consultas.js      ← Scripts do módulo 4
├── m05-transacciones.js  ← Scripts do módulo 5
├── m06-pagos.js          ← Scripts do módulo 6
├── m07-tokens.js         ← Scripts do módulo 7
├── m08-nfts.js           ← Scripts do módulo 8
├── m09-hooks.js          ← Scripts do módulo 9
└── m10-escrows-checks.js ← Scripts do módulo 10
\`\`\`
### Limitações do plan gratuito
- **Sandboxes públicos**: seu código fica visível para outras pessoas (não coloque chaves privadas de mainnet)
- **Tempo de inatividade**: o sandbox é pausado depois de um tempo sem uso (e é reativado quando você volta)
- **Recursos limitados**: suficientes para os scripts do curso, mas não para compilar Hooks em C
### Recomendação de segurança
Como os sandboxes gratuitos são públicos, **nunca coloque seeds ou chaves privadas de mainnet** no CodeSandbox. Use apenas chaves de **testnet** (tokens sem valor real). Para trabalhar com a mainnet, use um ambiente local com o VS Code.`,
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
├── m05-transacciones.js  ← Module 5 scripts
├── m06-pagos.js          ← Module 6 scripts
├── m07-tokens.js         ← Module 7 scripts
├── m08-nfts.js           ← Module 8 scripts
├── m09-hooks.js          ← Module 9 scripts
└── m10-escrows-checks.js ← Module 10 scripts
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
├── m05-transacciones.js  ← モジュール5のスクリプト
├── m06-pagos.js          ← モジュール6のスクリプト
├── m07-tokens.js         ← モジュール7のスクリプト
├── m08-nfts.js           ← モジュール8のスクリプト
├── m09-hooks.js          ← モジュール9のスクリプト
└── m10-escrows-checks.js ← モジュール10のスクリプト
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
            pt: "Instalar xahau no CodeSandbox (terminal)",
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
            pt: `# No terminal do CodeSandbox:
# 1. Instalar a biblioteca xahau
npm install xahau
# 2. Criar um arquivo de teste
touch hola-xahau.js
# 3. Executar o script (depois de escrever o código)
node hola-xahau.js`,
            en: `# In the CodeSandbox terminal:

# 1. Install the xahau library
npm install xahau

# 2. Create a test file
touch hola-xahau.js

# 3. Run the script (after writing the code)
node hola-xahau.js`,
            jp: `# CodeSandboxのターミナルで:

# 1. xahauライブラリをインストールする
npm install xahau

# 2. テストファイルを作成する
touch hola-xahau.js

# 3. スクリプトを実行する（コードを書いた後）
node hola-xahau.js`,
            ko: `# CodeSandbox 터미널에서:

# 1. xahau 라이브러리 설치
npm install xahau

# 2. 테스트 파일 생성
touch hola-xahau.js

# 3. 코드 작성 후 스크립트 실행
node hola-xahau.js`,
            zh: `# 在 CodeSandbox 终端中：

# 1. 安装 xahau 库
npm install xahau

# 2. 创建测试文件
touch hola-xahau.js

# 3. 编写代码后运行脚本
node hola-xahau.js`,
          },
        },
        {
          title: {
            es: "Script de prueba para CodeSandbox",
            pt: "Script de teste para o CodeSandbox",
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
            pt: `// Arquivo: hola-xahau.js
// Copie este código no seu sandbox e execute: node hola-xahau.js
const { Client } = require("xahau");
async function main() {
  console.log("=== Xahau Academy - Teste de Conexão ===");
  // Conectar à testnet da Xahau
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  console.log("Conectado a Xahau Testnet");
  // Obter informação do servidor
  const response = await client.request({
    command: "server_info"
  });
  const info = response.result.info;
  console.log("ID de Rede:", info.network_id);
  console.log("Ledger:", info.validated_ledger.seq);
  console.log("Versão:", info.build_version);
  await client.disconnect();
  console.log("Seu ambiente do CodeSandbox está pronto!");
  console.log("Agora você pode seguir o curso da Xahau Academy.");
}
main().catch(console.error);`,
            en: `// File: hola-xahau.js
// Copy this code into your sandbox and run: node hola-xahau.js

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
            jp: `// ファイル: hola-xahau.js
// このコードをサンドボックスにコピーして実行: node hola-xahau.js

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
            ko: `// 파일: hola-xahau.js
// 이 코드를 샌드박스에 복사한 뒤 실행: node hola-xahau.js

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
            zh: `// 文件：hola-xahau.js
// 将此代码复制到沙盒中并运行：node hola-xahau.js

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
          title: { es: "CodeSandbox", pt: "CodeSandbox", en: "CodeSandbox", jp: "CodeSandbox", ko: "CodeSandbox", zh: "CodeSandbox" },
          content: {
            es: "IDE online gratuito en tu navegador\n\n• Sin instalar nada\n• Terminal integrada\n• Node.js preinstalado\n• codesandbox.io",
            pt: "IDE online gratuito em seu navegador\n\n• Sem instalar nada\n• Terminal integrado\n• Node.js preinstalado\n• codesandbox.io",
            en: "Free online IDE in your browser\n\n• No installation needed\n• Integrated terminal\n• Node.js preinstalled\n• codesandbox.io",
            jp: "ブラウザで使える無料のオンラインIDE\n\n• インストール不要\n• 統合ターミナル\n• Node.jsプリインストール\n• codesandbox.io",
            ko: "브라우저에서 쓰는 무료 온라인 IDE\n\n• 설치 불필요\n• 통합 터미널\n• Node.js 사전 설치\n• codesandbox.io",
            zh: "浏览器中的免费在线 IDE\n\n• 无需安装\n• 集成终端\n• 预装 Node.js\n• codesandbox.io",
          },
          visual: "☁️",
        },
        {
          title: { es: "Configurar para Xahau", pt: "Configurar para Xahau", en: "Configure for Xahau", jp: "Xahau用の設定", ko: "Xahau용 설정", zh: "为 Xahau 配置" },
          content: {
            es: "1️⃣ Crear cuenta en codesandbox.io\n2️⃣ Crear Devbox con plantilla Node.js\n3️⃣ npm install xahau\n4️⃣ Crear archivo .js y escribir código\n5️⃣ node mi-archivo.js",
            pt: "1️⃣ Criar conta em codesandbox.io\n2️⃣ Criar Devbox com modelo Node.js\n3️⃣ npm install xahau\n4️⃣ Criar arquivo .js e escrever código\n5️⃣ node mi-arquivo.js",
            en: "1️⃣ Create account at codesandbox.io\n2️⃣ Create Devbox with Node.js template\n3️⃣ npm install xahau\n4️⃣ Create .js file and write code\n5️⃣ node mi-archivo.js",
            jp: "1️⃣ codesandbox.ioでアカウント作成\n2️⃣ Node.jsテンプレートでDevboxを作成\n3️⃣ npm install xahau\n4️⃣ .jsファイルを作成してコードを書く\n5️⃣ node mi-archivo.js",
            ko: "1️⃣ codesandbox.io에서 계정 생성\n2️⃣ Node.js 템플릿으로 Devbox 생성\n3️⃣ npm install xahau\n4️⃣ .js 파일 생성 후 코드 작성\n5️⃣ node my-file.js",
            zh: "1️⃣ 在 codesandbox.io 注册账号\n2️⃣ 使用 Node.js 模板创建 Devbox\n3️⃣ npm install xahau\n4️⃣ 创建 .js 文件并编写代码\n5️⃣ node my-file.js",
          },
          visual: "🛠️",
        },
        {
          title: { es: "Seguridad", pt: "Segurança", en: "Security", jp: "セキュリティ", ko: "보안", zh: "安全须知" },
          content: {
            es: "⚠️ Los sandboxes gratuitos son PÚBLICOS\n\n• NUNCA pongas seeds de mainnet\n• Usa SOLO claves de testnet\n• Para mainnet → entorno local con VS Code",
            pt: "⚠️ Os sandboxes gratuitos são PÚBLICOS\n\n• NUNCA coloque seeds de mainnet\n• Usa APENAS chaves de testnet\n• Para mainnet → ambiente local com VS Code",
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
        pt: "Estrutura de um projeto Node.js",
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
        pt: `Agora que você tem o Node.js instalado e a biblioteca \`xahau\` baixada, é importante entender **como um projeto Node.js se organiza** antes de começar a escrever código que interaja com a blockchain.
### O que é package.json?
O arquivo \`package.json\` é a **ficha técnica do seu projeto**. Ele é criado automaticamente quando você executa \`npm init -y\` e contém:
- **name**: O nome do seu projeto
- **version**: A versão atual
- **description**: Uma descrição breve
- **main**: O arquivo principal (por padrão \`index.js\`)
- **scripts**: Comandos personalizados que você pode executar com \`npm run\`
- **dependencies**: As bibliotecas de que seu projeto precisa para funcionar (como \`xahau\`)
Quando você executa \`npm install xahau\`, o npm baixa a biblioteca e a registra automaticamente no campo \`dependencies\` do \`package.json\`.
### O que é node_modules/?
A pasta \`node_modules/\` é onde o npm baixa todas as bibliotecas de que seu projeto precisa. Contém:
- A biblioteca \`xahau\` que você instalou
- Todas as **dependências internas** dessa biblioteca (outras bibliotecas de que precisa para funcionar)
- Pode conter centenas ou milhares de arquivos
**Regra importante**: **Nunca compartilhe nem envie \`node_modules/\` para repositórios nem para outros computadores.** Esta pasta pode ser recriada a qualquer momento executando \`npm install\` (o npm lê o \`package.json\` e baixa tudo novamente). Se você usa Git, adicione \`node_modules/\` ao arquivo \`.gitignore\`.
### O que é require() e como importar bibliotecas?
Em Node.js, usamos \`require()\` para **importar bibliotecas** e usá-las no nosso código:
\`\`\`
const { Client, Wallet } = require("xahau");
\`\`\`
Esta linha faz o seguinte:
1. Procura a biblioteca \`xahau\` dentro de \`node_modules/\`
2. Importa os objetos \`Client\` e \`Wallet\` dessa biblioteca
3. Armazena-os em constantes que você pode usar em seu código
Você também pode importar arquivos próprios:
\`\`\`
const minhasFuncoes = require("./utils.js");
\`\`\`
O \`./\` no início indica que o arquivo está no diretório atual.
### Criar e organizar arquivos .js
Cada script do curso será um arquivo \`.js\` independente. Recomendamos esta organização:
\`\`\`
xahau-curso/
├── package.json
├── node_modules/
├── 01-conexion.js
├── 02-wallet.js
├── 03-balance.js
├── 04-pago.js
└── utils.js          ← Funções compartilhadas (opcional)
\`\`\`
Cada arquivo é executada de forma independente com \`node nome-arquivo.js\`.
### async/await: operações assíncronas
Quando seu código se comunica com a blockchain, as operações **levam algum tempo** (conectar-se ao nó, enviar transações, esperar respostas). JavaScript usa **async/await** para tratar essas operações sem bloquear o programa:
- **async**: marca uma função como assíncrona (pode conter operações demoradas)
- **await**: Pausa a execução até que a operação termine e retorne um resultado
\`\`\`
async function consultar() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();        // Espera a conexão
  const dados = await client.request({ command: "server_info" }); // Espera a resposta
  await client.disconnect();     // Espera a desconexão
}
\`\`\`
Sem \`await\`, o código tentaria usar a resposta antes de recebê-la, causando erros.
### Tratamento de erros com try/catch
As operações com a blockchain podem falhar: o nó pode estar fora do ar, a rede lenta, ou o código pode ter um erro. Usamos **try/catch** para capturar esses erros de forma controlada:
\`\`\`
try {
  // Código que pode falhar
  await client.connect();
} catch (error) {
  // Executa se algo falhar
  console.error("Erro:", error.message);
}
\`\`\`
**try** tenta executar o código. Se algo falhar, o fluxo pula diretamente para o bloco **catch**, onde você pode mostrar o erro ou tomar uma ação alternativa. Sem \`try/catch\`, um erro interromperia todo o programa abruptamente.`,
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
  const dados = await client.request({ command: "server_info" }); // Wait for the response
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
  const dados = await client.request({ command: "server_info" }); // レスポンスを待つ
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
            pt: "Exemplo de package.json explicado",
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
            pt: `// Arquivo: package.json (criado com npm init -y)
// Você NÃO precisa editar este arquivo manualmente.
// O npm o atualiza quando você instala bibliotecas.
{
  "name": "xahau-curso",       // Nome do projeto
  "version": "1.0.0",          // Versão do projeto
  "description": "",            // Descrição (você pode preenchê-la)
  "main": "index.js",          // Arquivo principal (não o usaremos)
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "xahau": "^1.0.0"          // <-- npm install xahau adicionou isto
  }
}
// NOTA: node_modules/ é criada automaticamente com npm install.
// Nunca compartilhe isso. Ele é recriado com: npm install`,
            en: `// File: package.json (created with npm init -y)
// You do NOT need to edit this file manually.
// npm updates it when you install libraries.

{
  "name": "xahau-course",       // Project name
  "version": "1.0.0",          // Project version
  "description": "",            // Description (you can fill it in)
  "main": "index.js",          // Main file (we won't use it)
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
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
    "test": "echo \"Error: no test specified\" && exit 1"
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
    "test": "echo \"Error: no test specified\" && exit 1"
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
    "test": "echo \"Error: no test specified\" && exit 1"
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
            pt: "Script básico com async/await e try/catch",
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
            pt: `// Arquivo: estrutura-basica.js
// Executar com: node estrutura-basica.js
// 1. Importar a biblioteca xahau a partir de node_modules/
const { Client, Wallet } = require("xahau");
// 2. Criar uma função assíncrona (async)
async function main() {
  console.log("=== Estrutura básica de um script Xahau ===");
  // 3. Usar try/catch para tratar erros
  try {
    // 4. await espera cada operação terminar
    const client = new Client("wss://xahau-test.net");
    console.log("Conectando ao nó...");
    await client.connect();
    console.log("Conectado corretamente.");
    // 5. Consultar a blockchain
    const response = await client.request({
      command: "server_info"
    });
    const info = response.result.info;
    console.log("Informação do servidor:");
    console.log("Rede:", info.network_id);
    console.log("Versão:", info.build_version);
    console.log("Ledger:", info.validated_ledger.seq);
    // 6. Desconectar limpiamente
    await client.disconnect();
    console.log("Desconectado corretamente.");
  } catch (error) {
    // 7. Se algo falhar, mostramos ou erro sem romper ou programa
    console.error("Erro encontrado!");
    console.error("Tipo:", error.name);
    console.error("Mensagem:", error.message);
  }
}
// 8. Executar a função principal
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
          title: { es: "Anatomía de un proyecto Node.js", pt: "Anatomia de um projeto Node.js", en: "Anatomy of a Node.js Project", jp: "Node.jsプロジェクトの構造", ko: "Node.js 프로젝트 구조", zh: "Node.js 项目结构" },
          content: {
            es: "package.json → Ficha técnica del proyecto\n\nnode_modules/ → Librerías descargadas\n  (nunca compartir, se regenera con npm install)\n\narchivo.js → Tu código\n  (se ejecuta con: node archivo.js)",
            pt: "package.json → Ficha técnica do projeto\n\nnode_modules/ → Bibliotecas baixadas\n  (nunca compartilhar; é recriada com npm install)\n\narquivo.js → Seu código\n  (é executado com: node arquivo.js)",
            en: "package.json → Project's technical spec sheet\n\nnode_modules/ → Downloaded libraries\n  (never share, regenerated with npm install)\n\nfile.js → Your code\n  (run with: node file.js)",
            jp: "package.json → プロジェクトの技術仕様書\n\nnode_modules/ → ダウンロードされたライブラリ\n  （共有しない、npm installで再生成可能）\n\nfile.js → あなたのコード\n  （実行: node file.js）",
            ko: "package.json → 프로젝트 설정 파일\n\nnode_modules/ → 설치된 라이브러리\n  (공유하지 않고 npm install로 재생성)\n\nfile.js → 내가 작성한 코드\n  (실행: node file.js)",
            zh: "package.json → 项目技术说明书\n\nnode_modules/ → 已下载的库\n  （不要共享，通过 npm install 重新生成）\n\nfile.js → 你的代码\n  （运行方式：node file.js）",
          },
          visual: "📁",
        },
        {
          title: { es: "require() e importaciones", pt: "require() e imports", en: "require() and imports", jp: "require()とインポート", ko: "require()와 import", zh: "require() 与导入" },
          content: {
            es: "Importar librerías instaladas:\nconst { Client, Wallet } = require(\"xahau\");\n\nImportar archivos propios:\nconst utils = require(\"./utils.js\");\n\nrequire() busca en node_modules/ o en la ruta indicada",
            pt: "Importar bibliotecas instaladas:\nconst { Client, Wallet } = require(\"xahau\");\n\nImportar arquivos próprios:\nconst utils = require(\"./utils.js\");\n\nrequire() busca em node_modules/ ou na rota indicada",
            en: "Import installed libraries:\nconst { Client, Wallet } = require(\"xahau\");\n\nImport your own files:\nconst utils = require(\"./utils.js\");\n\nrequire() searches in node_modules/ or in the specified path",
            jp: "インストール済みライブラリのインポート:\nconst { Client, Wallet } = require(\"xahau\");\n\n自分のファイルのインポート:\nconst utils = require(\"./utils.js\");\n\nrequire()はnode_modules/または指定されたパスを検索する",
            ko: "설치한 라이브러리 가져오기:\nconst { Client, Wallet } = require(\"xahau\");\n\n내 파일 가져오기:\nconst utils = require(\"./utils.js\");\n\nrequire()는 node_modules/ 또는 지정한 경로를 찾습니다",
            zh: "导入已安装的库：\nconst { Client, Wallet } = require(\"xahau\");\n\n导入自己的文件：\nconst utils = require(\"./utils.js\");\n\nrequire() 在 node_modules/ 或指定路径中查找",
          },
          visual: "📦",
        },
        {
          title: { es: "async/await y try/catch", pt: "async/await e try/catch", en: "async/await and try/catch", jp: "async/awaitとtry/catch", ko: "async/await와 try/catch", zh: "async/await 与 try/catch" },
          content: {
            es: "async → Marca funciones que hacen operaciones lentas\nawait → Espera a que la operación termine\n\ntry { } → Intenta ejecutar el código\ncatch (error) { } → Captura errores sin romper el programa\n\nIndispensables para trabajar con blockchain",
            pt: `async → Marca funções que fazem operações lentas
await → Espera a operação terminar

try { } → Tenta executar o código
catch (error) { } → Captura erros sem quebrar o programa

Indispensáveis para trabalhar com blockchain`,
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
        pt: "Executar e depurar scripts",
        en: "Running and Debugging Scripts",
        jp: "スクリプトの実行とデバッグ",
        ko: "스크립트 실행과 디버깅",
        zh: "运行和调试脚本",
      },
      theory: {
        es: `Tarde o temprano un script falla: falta un paquete, hay una errata, un nodo no responde. Esta lección explica qué hace Node.js con tu archivo, cómo leer el error que imprime y qué significan los errores de este curso.

### Ejecutar un script

\`node archivo.js\` ejecuta un archivo en dos fases. Primero Node lee el archivo entero y comprueba que es JavaScript válido. Después lo ejecuta de arriba abajo. Un error en la primera fase detiene el script antes de que se ejecute nada, así que no aparece ninguna de tus líneas de \`console.log\`. Un error en la segunda fase lo detiene en ese punto, y las líneas impresas antes siguen en pantalla.

Ejecuta los scripts desde la carpeta del proyecto, la que tiene \`package.json\` y \`node_modules/\`:

\`\`\`
cd xahau-course
node debug-errors.js
\`\`\`

De esa carpeta dependen dos cosas. Node busca \`debug-errors.js\` a partir de la carpeta en la que estás. Y \`require("xahau")\` busca la librería en \`node_modules/\`, empezando por la carpeta del script y subiendo.

### Leer un error

Cuando un script falla, Node imprime el error y se detiene. Por ejemplo:

\`\`\`
/Users/you/xahau-course/ledger.js:2
console.log(info.validated_ledger.seq);
                 ^

TypeError: Cannot read properties of undefined (reading 'validated_ledger')
    at Object.<anonymous> (/Users/you/xahau-course/ledger.js:2:18)
    at Module._compile (node:internal/modules/cjs/loader:1812:14)
    at Object..js (node:internal/modules/cjs/loader:1943:10)
\`\`\`

Léelo en este orden:

1. **La línea del error**: \`TypeError: Cannot read properties of undefined (reading 'validated_ledger')\`. El tipo dice qué clase de problema es; el mensaje dice qué pasó. Aquí \`info\` es \`undefined\`, así que no tiene \`validated_ledger\`.
2. **La ubicación**, arriba: el archivo y la línea (\`ledger.js:2\`), la línea de código y un \`^\` bajo el punto donde ocurrió el error.
3. **La pila**: las líneas \`at\`, de la más reciente a la más antigua. Las líneas con tus archivos muestran el camino que llevó al error. Las líneas \`node:internal\` son código del propio Node: sáltalas.

Los tipos que más verás:

| Tipo | Cuándo | Causa habitual |
|---|---|---|
| \`SyntaxError\` | Antes de ejecutar | El código no es JavaScript válido: falta un paréntesis, \`await\` fuera de una función \`async\` |
| \`ReferenceError\` | Al ejecutar | Un nombre que no existe: una errata, falta un \`require\` |
| \`TypeError\` | Al ejecutar | Un valor de otra clase, casi siempre \`undefined\` donde el código espera un objeto |
| \`XahaudError\` | Al ejecutar | El nodo de Xahau respondió a la petición con un error |

### Los errores de este curso

**Cannot find module 'xahau'**

\`\`\`
Error: Cannot find module 'xahau'
Require stack:
- /Users/you/Desktop/script.js
\`\`\`

Node no encontró la librería en ningún \`node_modules/\` desde la carpeta del script hacia arriba. O no está instalada, o el script está fuera del proyecto. Ejecuta \`npm install xahau\` en la carpeta del proyecto, y ejecuta el script desde ahí.

**await is only valid in async functions**

\`\`\`
  await client.connect();
  ^^^^^

SyntaxError: await is only valid in async functions and the top level bodies of modules
\`\`\`

Los scripts del curso son archivos CommonJS: cargan las librerías con \`require\`. En un archivo CommonJS, \`await\` solo funciona dentro de una función marcada como \`async\`. Escrito en el nivel superior de un archivo que usa \`require\`, Node da otro mensaje por la misma causa:

\`\`\`
ReferenceError: Cannot determine intended module format because both 'require' and top-level await are present.
\`\`\`

Pon el código en una función \`async\` y llámala, como hacen todos los scripts del curso:

\`\`\`js
async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // ...
}

main();
\`\`\`

**missing ) after argument list** y otros errores de sintaxis

\`\`\`
console.log("Client:", typeof Client;
                              ^^^^^^

SyntaxError: missing ) after argument list
\`\`\`

El \`^\` marca dónde notó Node el problema. El fallo está ahí o justo antes: aquí, el \`)\` que cierra \`console.log(\`. Busca paréntesis, llaves y comillas que se abren y no se cierran.

**Cannot read properties of undefined**

El \`TypeError\` del ejemplo de arriba. Suele aparecer después de una consulta, cuando la respuesta no tiene el campo que lee el código. Imprime la respuesta entera para ver qué contiene:

\`\`\`js
console.log("Response:", JSON.stringify(response.result, null, 2));
\`\`\`

**Account not found**

\`\`\`
XahaudError: Account not found.
\`\`\`

Este error viene del nodo, no de tu código: la cuenta no existe en el ledger. Una cuenta existe cuando ha recibido sus primeros XAH. Revisa la dirección, y revisa la red: una cuenta de testnet no existe en Mainnet. En testnet, el faucet crea y financia cuentas ([Módulo 3](?m=3&l=1)).

**ENOTFOUND, ETIMEDOUT, ECONNREFUSED**

\`\`\`
Error: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
\`\`\`

La conexión falló antes de cualquier petición. \`ENOTFOUND\` significa que el nombre del host no existe: revisa la URL. \`ETIMEDOUT\` y \`ECONNREFUSED\` significan que el host existe pero no respondió: revisa tu conexión y el firewall, o prueba otro nodo. Las URLs del curso son \`wss://xahau-test.net\` para testnet y \`wss://xahau.network\` para Mainnet.

### Ver qué hace un script

\`console.log\` muestra un valor en un punto del script. Imprime una línea antes y después de cada paso: cuando un script se detiene, la última línea impresa te dice a qué paso llegó. Dos formas ayudan con objetos y tipos:

- \`JSON.stringify(objeto, null, 2)\` imprime un objeto entero, con sangría de 2 espacios.
- \`typeof valor\` imprime el tipo: un \`"undefined"\` donde esperabas un objeto es el origen de la mayoría de los \`TypeError\`.

Una petición a la red puede fallar por motivos ajenos a tu código. \`try/catch\` captura el error, para que el script diga qué falló y termine de forma limpia. Termina con \`client.disconnect()\` en todos los casos: una conexión abierta mantiene Node en marcha, y el script no acaba.

### Los ejemplos

\`debug-errors.js\` ejecuta cada paso dentro de su propio \`try/catch\` y lo numera, así que un fallo muestra en qué paso fue. Salida en testnet:

\`\`\`
=== Depuración de Errores en Xahau ===
1. Librería xahau importada correctamente
   Tipo de Client: function
2. Cliente creado para: wss://xahau-test.net
3. Intentando conectar...
   Conectado correctamente
4. Consultando server_info...
5. Respuesta recibida:
   Tipo: object
   Claves: [ 'info', 'native_currency_code' ]
   Red: 21338
   Ledger: 12663294
6. Desconectado correctamente
=== Fin de la depuración ===
\`\`\`

\`Red: 21338\` es el ID de red de la testnet de Xahau.

\`connectivity-test.js\` se conecta a testnet, a Mainnet y a una URL que no existe. La tercera conexión debe fallar: muestra el error que obtienes con una URL equivocada. Salida:

\`\`\`
=== Test de Conectividad de Xahau ===
Probando: Xahau Testnet (wss://xahau-test.net)
Conectado - Ledger: 12663296

Probando: Xahau Mainnet (wss://xahau.network)
Conectado - Ledger: 26093967

Probando: URL incorrecta (wss://nodo-que-no-existe.example.com)
Error: getaddrinfo ENOTFOUND nodo-que-no-existe.example.com
=== Resumen ===
Si testnet y mainnet conectan: tu entorno está listo.
Si alguno falla: comprueba tu conexión a internet.
La URL incorrecta DEBE fallar (es un test de error).
\`\`\``,
        pt: `Mais cedo ou mais tarde um script falha: falta um pacote, há um erro de digitação, um nó não responde. Esta lição explica o que o Node.js faz com o seu arquivo, como ler o erro que ele imprime e o que significam os erros deste curso.

### Executar um script

\`node arquivo.js\` executa um arquivo em duas fases. Primeiro o Node lê o arquivo inteiro e verifica se é JavaScript válido. Depois o executa de cima para baixo. Um erro na primeira fase interrompe o script antes que qualquer coisa seja executada, então nenhuma das suas linhas de \`console.log\` aparece. Um erro na segunda fase o interrompe naquele ponto, e as linhas impressas antes continuam na tela.

Execute os scripts a partir da pasta do projeto, a que tem \`package.json\` e \`node_modules/\`:

\`\`\`
cd xahau-course
node debug-errors.js
\`\`\`

Duas coisas dependem dessa pasta. O Node procura \`debug-errors.js\` a partir da pasta em que você está. E \`require("xahau")\` procura a biblioteca em \`node_modules/\`, começando pela pasta do script e subindo.

### Ler um erro

Quando um script falha, o Node imprime o erro e para. Por exemplo:

\`\`\`
/Users/you/xahau-course/ledger.js:2
console.log(info.validated_ledger.seq);
                 ^

TypeError: Cannot read properties of undefined (reading 'validated_ledger')
    at Object.<anonymous> (/Users/you/xahau-course/ledger.js:2:18)
    at Module._compile (node:internal/modules/cjs/loader:1812:14)
    at Object..js (node:internal/modules/cjs/loader:1943:10)
\`\`\`

Leia nesta ordem:

1. **A linha do erro**: \`TypeError: Cannot read properties of undefined (reading 'validated_ledger')\`. O tipo diz que tipo de problema é; a mensagem diz o que aconteceu. Aqui \`info\` é \`undefined\`, então não tem \`validated_ledger\`.
2. **A localização**, no topo: o arquivo e a linha (\`ledger.js:2\`), a linha de código e um \`^\` sob o ponto onde o erro aconteceu.
3. **A pilha**: as linhas \`at\`, da mais recente à mais antiga. As linhas com os seus arquivos mostram o caminho que levou ao erro. As linhas \`node:internal\` são código do próprio Node: pule-as.

Os tipos que você verá com mais frequência:

| Tipo | Quando | Causa habitual |
|---|---|---|
| \`SyntaxError\` | Antes de executar | O código não é JavaScript válido: falta um parêntese, \`await\` fora de uma função \`async\` |
| \`ReferenceError\` | Ao executar | Um nome que não existe: um erro de digitação, falta um \`require\` |
| \`TypeError\` | Ao executar | Um valor de outro tipo, quase sempre \`undefined\` onde o código espera um objeto |
| \`XahaudError\` | Ao executar | O nó da Xahau respondeu à requisição com um erro |

### Os erros deste curso

**Cannot find module 'xahau'**

\`\`\`
Error: Cannot find module 'xahau'
Require stack:
- /Users/you/Desktop/script.js
\`\`\`

O Node não encontrou a biblioteca em nenhum \`node_modules/\` da pasta do script para cima. Ou ela não está instalada, ou o script está fora do projeto. Execute \`npm install xahau\` na pasta do projeto e execute o script a partir dela.

**await is only valid in async functions**

\`\`\`
  await client.connect();
  ^^^^^

SyntaxError: await is only valid in async functions and the top level bodies of modules
\`\`\`

Os scripts do curso são arquivos CommonJS: carregam as bibliotecas com \`require\`. Num arquivo CommonJS, \`await\` só funciona dentro de uma função marcada como \`async\`. Escrito no nível superior de um arquivo que usa \`require\`, o Node dá outra mensagem pela mesma causa:

\`\`\`
ReferenceError: Cannot determine intended module format because both 'require' and top-level await are present.
\`\`\`

Coloque o código numa função \`async\` e chame-a, como fazem todos os scripts do curso:

\`\`\`js
async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // ...
}

main();
\`\`\`

**missing ) after argument list** e outros erros de sintaxe

\`\`\`
console.log("Client:", typeof Client;
                              ^^^^^^

SyntaxError: missing ) after argument list
\`\`\`

O \`^\` marca onde o Node percebeu o problema. O erro está ali ou logo antes: aqui, o \`)\` que fecha \`console.log(\`. Procure parênteses, chaves e aspas que são abertos e não fechados.

**Cannot read properties of undefined**

O \`TypeError\` do exemplo acima. Costuma aparecer depois de uma consulta, quando a resposta não tem o campo que o código lê. Imprima a resposta inteira para ver o que ela contém:

\`\`\`js
console.log("Response:", JSON.stringify(response.result, null, 2));
\`\`\`

**Account not found**

\`\`\`
XahaudError: Account not found.
\`\`\`

Este erro vem do nó, não do seu código: a conta não existe no ledger. Uma conta existe quando recebe os seus primeiros XAH. Verifique o endereço e verifique a rede: uma conta da testnet não existe na Mainnet. Na testnet, o faucet cria e financia contas ([Módulo 3](?m=3&l=1)).

**ENOTFOUND, ETIMEDOUT, ECONNREFUSED**

\`\`\`
Error: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
\`\`\`

A conexão falhou antes de qualquer requisição. \`ENOTFOUND\` significa que o nome do host não existe: verifique a URL. \`ETIMEDOUT\` e \`ECONNREFUSED\` significam que o host existe, mas não respondeu: verifique a sua conexão e o firewall, ou tente outro nó. As URLs do curso são \`wss://xahau-test.net\` para a testnet e \`wss://xahau.network\` para a Mainnet.

### Ver o que um script faz

\`console.log\` mostra um valor num ponto do script. Imprima uma linha antes e depois de cada passo: quando um script para, a última linha impressa diz a que passo ele chegou. Duas formas ajudam com objetos e tipos:

- \`JSON.stringify(objeto, null, 2)\` imprime um objeto inteiro, com recuo de 2 espaços.
- \`typeof valor\` imprime o tipo: um \`"undefined"\` onde você esperava um objeto é a origem da maioria dos \`TypeError\`.

Uma requisição à rede pode falhar por motivos alheios ao seu código. \`try/catch\` captura o erro, para que o script diga o que falhou e termine de forma limpa. Termine com \`client.disconnect()\` em todos os casos: uma conexão aberta mantém o Node em execução, e o script não termina.

### Os exemplos

\`debug-errors.js\` executa cada passo dentro do seu próprio \`try/catch\` e o numera, então uma falha mostra em que passo foi. Saída na testnet:

\`\`\`
=== Depuração de Erros na Xahau ===
1. Biblioteca xahau importada corretamente
   Tipo de Client: function
2. Cliente criado para: wss://xahau-test.net
3. Tentando conectar...
   Conectado corretamente
4. Consultando server_info...
5. Resposta recebida:
   Tipo: object
   Chaves: [ 'info', 'native_currency_code' ]
   Rede: 21338
   Ledger: 12663295
6. Desconectado corretamente
=== Fim da depuração ===
\`\`\`

\`Rede: 21338\` é o ID de rede da testnet da Xahau.

\`connectivity-test.js\` se conecta à testnet, à Mainnet e a uma URL que não existe. A terceira conexão deve falhar: mostra o erro que você recebe com uma URL errada. Saída:

\`\`\`
=== Teste de Conectividade da Xahau ===
Testando: Xahau Testnet (wss://xahau-test.net)
Conectado - Ledger: 12663297

Testando: Xahau Mainnet (wss://xahau.network)
Conectado - Ledger: 26093967

Testando: URL incorreta (wss://no-que-nao-existe.example.com)
Erro: getaddrinfo ENOTFOUND no-que-nao-existe.example.com
=== Resumo ===
Se testnet e mainnet conectarem: seu ambiente está pronto.
Se alguma falhar: verifique sua conexão com a internet.
A URL incorreta DEVE falhar (é um teste de erro).
\`\`\``,
        en: `A script fails sooner or later: a missing package, a typo, a node that doesn't answer. This lesson explains what Node.js does with your file, how to read the error it prints, and what the errors of this course mean.

### Running a script

\`node file.js\` runs a file in two stages. First Node reads the whole file and checks that it is valid JavaScript. Then it runs it from top to bottom. An error in the first stage stops the script before anything runs, so none of your \`console.log\` lines appear. An error in the second stage stops it at that point, and the lines printed before it are still on screen.

Run the scripts from the project folder, the one with \`package.json\` and \`node_modules/\`:

\`\`\`
cd xahau-course
node debug-errors.js
\`\`\`

Two things depend on that folder. Node looks for \`debug-errors.js\` relative to the folder you are in. And \`require("xahau")\` looks for the library in \`node_modules/\`, starting from the script's folder and going up.

### Reading an error

When a script fails, Node prints the error and stops. For example:

\`\`\`
/Users/you/xahau-course/ledger.js:2
console.log(info.validated_ledger.seq);
                 ^

TypeError: Cannot read properties of undefined (reading 'validated_ledger')
    at Object.<anonymous> (/Users/you/xahau-course/ledger.js:2:18)
    at Module._compile (node:internal/modules/cjs/loader:1812:14)
    at Object..js (node:internal/modules/cjs/loader:1943:10)
\`\`\`

Read it in this order:

1. **The error line**: \`TypeError: Cannot read properties of undefined (reading 'validated_ledger')\`. The type says what kind of problem it is; the message says what happened. Here \`info\` is \`undefined\`, so it has no \`validated_ledger\`.
2. **The location**, at the top: the file and line (\`ledger.js:2\`), the line of code, and a \`^\` under the place where the error happened.
3. **The stack**: the \`at\` lines, most recent first. The lines with your files show the path that led to the error. The \`node:internal\` lines are Node's own code: skip them.

The types you will see most:

| Type | When | Usual cause |
|---|---|---|
| \`SyntaxError\` | Before running | The code isn't valid JavaScript: a missing bracket, \`await\` outside an \`async\` function |
| \`ReferenceError\` | While running | A name that doesn't exist: a typo, a missing \`require\` |
| \`TypeError\` | While running | A value of the wrong kind, usually \`undefined\` where the code expects an object |
| \`XahaudError\` | While running | The Xahau node answered the request with an error |

### The errors of this course

**Cannot find module 'xahau'**

\`\`\`
Error: Cannot find module 'xahau'
Require stack:
- /Users/you/Desktop/script.js
\`\`\`

Node didn't find the library in any \`node_modules/\` from the script's folder upwards. Either it isn't installed, or the script is outside the project. Run \`npm install xahau\` in the project folder, and run the script from there.

**await is only valid in async functions**

\`\`\`
  await client.connect();
  ^^^^^

SyntaxError: await is only valid in async functions and the top level bodies of modules
\`\`\`

The course scripts are CommonJS files: they load libraries with \`require\`. In a CommonJS file, \`await\` only works inside a function marked \`async\`. Written at the top level of a file that uses \`require\`, Node gives a different message for the same cause:

\`\`\`
ReferenceError: Cannot determine intended module format because both 'require' and top-level await are present.
\`\`\`

Put the code in an \`async\` function and call it, as every script of the course does:

\`\`\`js
async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // ...
}

main();
\`\`\`

**missing ) after argument list** and other syntax errors

\`\`\`
console.log("Client:", typeof Client;
                              ^^^^^^

SyntaxError: missing ) after argument list
\`\`\`

The \`^\` marks where Node noticed the problem. The mistake is there or just before it: here the \`)\` that closes \`console.log(\`. Look for brackets, braces and quotes that are opened and not closed.

**Cannot read properties of undefined**

The \`TypeError\` of the example above. It usually appears after a query, when the response doesn't have the field the code reads. Print the whole response to see what it contains:

\`\`\`js
console.log("Response:", JSON.stringify(response.result, null, 2));
\`\`\`

**Account not found**

\`\`\`
XahaudError: Account not found.
\`\`\`

This error comes from the node, not from your code: the account doesn't exist in the ledger. An account exists once it has received its first XAH. Check the address, and check the network: a testnet account doesn't exist on Mainnet. On testnet, the faucet creates and funds accounts ([Module 3](?m=3&l=1)).

**ENOTFOUND, ETIMEDOUT, ECONNREFUSED**

\`\`\`
Error: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
\`\`\`

The connection failed before any request. \`ENOTFOUND\` means the host name doesn't exist: check the URL. \`ETIMEDOUT\` and \`ECONNREFUSED\` mean the host exists but didn't answer: check your connection and firewall, or try another node. The URLs of the course are \`wss://xahau-test.net\` for testnet and \`wss://xahau.network\` for Mainnet.

### Seeing what a script does

\`console.log\` shows a value at a point of the script. Print a line before and after each step: when a script stops, the last line printed tells you which step it reached. Two forms help with objects and types:

- \`JSON.stringify(object, null, 2)\` prints a whole object, indented by 2 spaces.
- \`typeof value\` prints the type: \`"undefined"\` in place of an object is the start of most \`TypeError\`s.

A request to the network can fail for reasons outside your code. \`try/catch\` catches the error, so the script can say what failed and end cleanly. End with \`client.disconnect()\` in every case: an open connection keeps Node running, and the script doesn't finish.

### The examples

\`debug-errors.js\` runs each step inside its own \`try/catch\` and numbers it, so a failure shows which step it was. Output on testnet:

\`\`\`
=== Error Debugging in Xahau ===
1. xahau library imported correctly
   Type of Client: function
2. Client created for: wss://xahau-test.net
3. Attempting to connect...
   Connected successfully
4. Querying server_info...
5. Response received:
   Type: object
   Keys: [ 'info', 'native_currency_code' ]
   Network: 21338
   Ledger: 12663294
6. Disconnected correctly
=== End of debugging ===
\`\`\`

\`Network: 21338\` is the network ID of the Xahau testnet.

\`connectivity-test.js\` connects to testnet, to Mainnet and to a URL that doesn't exist. The third connection must fail: it shows the error you get from a wrong URL. Output:

\`\`\`
=== Xahau Connectivity Test ===
Testing: Xahau Testnet (wss://xahau-test.net)
Connected - Ledger: 12663295

Testing: Xahau Mainnet (wss://xahau.network)
Connected - Ledger: 26093966

Testing: Incorrect URL (wss://nodo-doesnt-exist.example.com)
Error: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
=== Summary ===
If testnet and mainnet connect: your environment is ready.
If any fails: check your internet connection.
The incorrect URL MUST fail (it's an error test).
\`\`\``,
        jp: `スクリプトはいずれ失敗します。パッケージが足りない、タイプミスがある、ノードが応答しない、といった理由です。このレッスンでは、Node.js がファイルをどう扱うか、表示されたエラーの読み方、そしてこのコースで出会うエラーの意味を説明します。

### スクリプトの実行

\`node file.js\` はファイルを2段階で実行します。まず Node はファイル全体を読み込み、有効な JavaScript かどうかを確認します。次に上から順に実行します。1段階目でエラーが起きると、何も実行されないうちにスクリプトが止まるため、\`console.log\` の行は1つも表示されません。2段階目でエラーが起きると、その時点で止まり、それまでに表示された行は画面に残ります。

スクリプトはプロジェクトのフォルダー、つまり \`package.json\` と \`node_modules/\` があるフォルダーから実行します。

\`\`\`
cd xahau-course
node debug-errors.js
\`\`\`

このフォルダーに依存することが2つあります。Node は \`debug-errors.js\` を今いるフォルダーを基準に探します。また \`require("xahau")\` は、スクリプトのフォルダーから上に向かって \`node_modules/\` の中のライブラリを探します。

### エラーの読み方

スクリプトが失敗すると、Node はエラーを表示して停止します。例えば次のとおりです。

\`\`\`
/Users/you/xahau-course/ledger.js:2
console.log(info.validated_ledger.seq);
                 ^

TypeError: Cannot read properties of undefined (reading 'validated_ledger')
    at Object.<anonymous> (/Users/you/xahau-course/ledger.js:2:18)
    at Module._compile (node:internal/modules/cjs/loader:1812:14)
    at Object..js (node:internal/modules/cjs/loader:1943:10)
\`\`\`

次の順に読みます。

1. **エラー行**：\`TypeError: Cannot read properties of undefined (reading 'validated_ledger')\`。型は問題の種類を、メッセージは何が起きたかを示します。ここでは \`info\` が \`undefined\` なので、\`validated_ledger\` がありません。
2. **場所**（先頭）：ファイルと行（\`ledger.js:2\`）、そのコード行、エラーが起きた位置を示す \`^\`。
3. **スタック**：\`at\` で始まる行で、新しいものから順に並びます。自分のファイルを含む行が、エラーに至った経路を示します。\`node:internal\` の行は Node 自身のコードなので読み飛ばします。

よく見る型は次のとおりです。

| 型 | いつ | よくある原因 |
|---|---|---|
| \`SyntaxError\` | 実行前 | 有効な JavaScript ではない：括弧の不足、\`async\` 関数の外の \`await\` |
| \`ReferenceError\` | 実行中 | 存在しない名前：タイプミス、\`require\` の不足 |
| \`TypeError\` | 実行中 | 想定と違う種類の値。多くはオブジェクトを期待する場所の \`undefined\` |
| \`XahaudError\` | 実行中 | Xahau のノードがリクエストにエラーで応答した |

### このコースで出会うエラー

**Cannot find module 'xahau'**

\`\`\`
Error: Cannot find module 'xahau'
Require stack:
- /Users/you/Desktop/script.js
\`\`\`

スクリプトのフォルダーから上のどの \`node_modules/\` にもライブラリが見つかりませんでした。インストールされていないか、スクリプトがプロジェクトの外にあります。プロジェクトのフォルダーで \`npm install xahau\` を実行し、そこからスクリプトを実行します。

**await is only valid in async functions**

\`\`\`
  await client.connect();
  ^^^^^

SyntaxError: await is only valid in async functions and the top level bodies of modules
\`\`\`

このコースのスクリプトは CommonJS ファイルで、\`require\` でライブラリを読み込みます。CommonJS ファイルでは、\`await\` は \`async\` を付けた関数の中でしか使えません。\`require\` を使うファイルの最上位に書くと、同じ原因で別のメッセージが表示されます。

\`\`\`
ReferenceError: Cannot determine intended module format because both 'require' and top-level await are present.
\`\`\`

コースのすべてのスクリプトと同じように、コードを \`async\` 関数に入れて呼び出します。

\`\`\`js
async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // ...
}

main();
\`\`\`

**missing ) after argument list** などの構文エラー

\`\`\`
console.log("Client:", typeof Client;
                              ^^^^^^

SyntaxError: missing ) after argument list
\`\`\`

\`^\` は Node が問題に気づいた位置を示します。誤りはその位置か、その直前にあります。ここでは \`console.log(\` を閉じる \`)\` です。開いたまま閉じていない括弧、波括弧、引用符を探します。

**Cannot read properties of undefined**

上の例の \`TypeError\` です。照会の後、コードが読むフィールドがレスポンスにないときによく起きます。レスポンス全体を表示して中身を確認します。

\`\`\`js
console.log("Response:", JSON.stringify(response.result, null, 2));
\`\`\`

**Account not found**

\`\`\`
XahaudError: Account not found.
\`\`\`

このエラーはコードではなくノードから返されたもので、アカウントが台帳に存在しないことを示します。アカウントは最初の XAH を受け取った時点で存在するようになります。アドレスとネットワークを確認します。テストネットのアカウントはメインネットには存在しません。テストネットでは、フォーセットがアカウントを作成して資金を送ります（[モジュール3](?m=3&l=1)）。

**ENOTFOUND、ETIMEDOUT、ECONNREFUSED**

\`\`\`
Error: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
\`\`\`

リクエストの前に接続が失敗しています。\`ENOTFOUND\` はホスト名が存在しないという意味なので、URL を確認します。\`ETIMEDOUT\` と \`ECONNREFUSED\` はホストは存在するが応答がなかったという意味なので、接続とファイアウォールを確認するか、別のノードを試します。このコースの URL は、テストネットが \`wss://xahau-test.net\`、メインネットが \`wss://xahau.network\` です。

### スクリプトの動きを確認する

\`console.log\` はスクリプトのある地点での値を表示します。各ステップの前後に1行ずつ表示しておくと、スクリプトが止まったとき、最後に表示された行からどのステップまで進んだかがわかります。オブジェクトと型には次の2つが役立ちます。

- \`JSON.stringify(object, null, 2)\` はオブジェクト全体を2スペースのインデントで表示します。
- \`typeof value\` は型を表示します。オブジェクトのはずの場所が \`"undefined"\` なら、それがほとんどの \`TypeError\` の原因です。

ネットワークへのリクエストは、コードとは関係のない理由で失敗することがあります。\`try/catch\` でエラーを捕まえれば、スクリプトは何が失敗したかを伝えてきれいに終了できます。どの場合も最後に \`client.disconnect()\` を呼びます。接続が開いたままだと Node が動き続け、スクリプトが終わりません。

### 例

\`debug-errors.js\` は各ステップをそれぞれの \`try/catch\` の中で実行し、番号を付けます。失敗したときに、どのステップだったかがわかります。テストネットでの出力です。

\`\`\`
=== Xahauのエラーデバッグ ===
1. xahauライブラリが正常にインポートされました
   Clientの型: function
2. クライアントを作成しました: wss://xahau-test.net
3. 接続を試みています...
   正常に接続しました
4. server_infoを照会中...
5. レスポンスを受信:
   型: object
   キー: [ 'info', 'native_currency_code' ]
   ネットワーク: 21338
   レジャー: 12663295
6. 正常に切断しました
=== デバッグ終了 ===
\`\`\`

\`ネットワーク: 21338\` は Xahau テストネットのネットワーク ID です。

\`connectivity-test.js\` はテストネット、メインネット、存在しない URL に接続します。3つ目の接続は失敗しなければなりません。間違った URL で出るエラーを示すためです。出力です。

\`\`\`
=== Xahau接続テスト ===
テスト中: Xahau Testnet (wss://xahau-test.net)
接続済み - レジャー: 12663296

テスト中: Xahau Mainnet (wss://xahau.network)
接続済み - レジャー: 26093967

テスト中: 無効なURL (wss://nodo-doesnt-exist.example.com)
エラー: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
=== まとめ ===
テストネットとメインネットが接続できれば: 環境の準備ができています。
いずれかが失敗した場合: インターネット接続を確認してください。
無効なURLは失敗しなければなりません（これはエラーテストです）。
\`\`\``,
        ko: `스크립트는 언젠가 실패합니다. 패키지가 없거나, 오타가 있거나, 노드가 응답하지 않기 때문입니다. 이 레슨에서는 Node.js가 파일을 어떻게 처리하는지, 출력된 오류를 어떻게 읽는지, 이 강좌에서 만나는 오류가 무슨 뜻인지 설명합니다.

### 스크립트 실행

\`node file.js\`는 파일을 두 단계로 실행합니다. 먼저 Node가 파일 전체를 읽고 올바른 JavaScript인지 확인합니다. 그다음 위에서 아래로 실행합니다. 첫 단계에서 오류가 나면 아무것도 실행되기 전에 스크립트가 멈추므로 \`console.log\` 줄이 하나도 표시되지 않습니다. 두 번째 단계에서 오류가 나면 그 지점에서 멈추고, 그전에 출력된 줄은 화면에 남습니다.

스크립트는 프로젝트 폴더, 즉 \`package.json\`과 \`node_modules/\`가 있는 폴더에서 실행합니다.

\`\`\`
cd xahau-course
node debug-errors.js
\`\`\`

이 폴더에 달린 것이 두 가지 있습니다. Node는 현재 폴더를 기준으로 \`debug-errors.js\`를 찾습니다. 그리고 \`require("xahau")\`는 스크립트 폴더에서 시작해 위로 올라가며 \`node_modules/\`에서 라이브러리를 찾습니다.

### 오류 읽기

스크립트가 실패하면 Node는 오류를 출력하고 멈춥니다. 예를 들면 다음과 같습니다.

\`\`\`
/Users/you/xahau-course/ledger.js:2
console.log(info.validated_ledger.seq);
                 ^

TypeError: Cannot read properties of undefined (reading 'validated_ledger')
    at Object.<anonymous> (/Users/you/xahau-course/ledger.js:2:18)
    at Module._compile (node:internal/modules/cjs/loader:1812:14)
    at Object..js (node:internal/modules/cjs/loader:1943:10)
\`\`\`

다음 순서로 읽습니다.

1. **오류 줄**: \`TypeError: Cannot read properties of undefined (reading 'validated_ledger')\`. 타입은 문제의 종류를, 메시지는 무슨 일이 일어났는지를 알려 줍니다. 여기서는 \`info\`가 \`undefined\`라서 \`validated_ledger\`가 없습니다.
2. **위치**(맨 위): 파일과 줄(\`ledger.js:2\`), 해당 코드 줄, 오류가 난 위치 아래의 \`^\`.
3. **스택**: \`at\`으로 시작하는 줄로, 가장 최근 것부터 나열됩니다. 내 파일이 있는 줄이 오류에 이른 경로를 보여 줍니다. \`node:internal\` 줄은 Node 자체의 코드이므로 건너뜁니다.

자주 보게 될 타입은 다음과 같습니다.

| 타입 | 시점 | 흔한 원인 |
|---|---|---|
| \`SyntaxError\` | 실행 전 | 올바른 JavaScript가 아님: 괄호 누락, \`async\` 함수 밖의 \`await\` |
| \`ReferenceError\` | 실행 중 | 존재하지 않는 이름: 오타, \`require\` 누락 |
| \`TypeError\` | 실행 중 | 다른 종류의 값. 대개 객체를 기대하는 곳의 \`undefined\` |
| \`XahaudError\` | 실행 중 | Xahau 노드가 요청에 오류로 응답함 |

### 이 강좌에서 만나는 오류

**Cannot find module 'xahau'**

\`\`\`
Error: Cannot find module 'xahau'
Require stack:
- /Users/you/Desktop/script.js
\`\`\`

스크립트 폴더에서 위쪽의 어떤 \`node_modules/\`에서도 라이브러리를 찾지 못했습니다. 설치되지 않았거나 스크립트가 프로젝트 밖에 있습니다. 프로젝트 폴더에서 \`npm install xahau\`를 실행하고, 그 폴더에서 스크립트를 실행합니다.

**await is only valid in async functions**

\`\`\`
  await client.connect();
  ^^^^^

SyntaxError: await is only valid in async functions and the top level bodies of modules
\`\`\`

이 강좌의 스크립트는 CommonJS 파일로, \`require\`로 라이브러리를 불러옵니다. CommonJS 파일에서 \`await\`는 \`async\`가 붙은 함수 안에서만 동작합니다. \`require\`를 쓰는 파일의 최상위에 쓰면 같은 원인으로 다른 메시지가 나옵니다.

\`\`\`
ReferenceError: Cannot determine intended module format because both 'require' and top-level await are present.
\`\`\`

강좌의 모든 스크립트처럼 코드를 \`async\` 함수에 넣고 호출합니다.

\`\`\`js
async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // ...
}

main();
\`\`\`

**missing ) after argument list** 등 문법 오류

\`\`\`
console.log("Client:", typeof Client;
                              ^^^^^^

SyntaxError: missing ) after argument list
\`\`\`

\`^\`는 Node가 문제를 알아챈 위치입니다. 실수는 그 위치나 바로 앞에 있습니다. 여기서는 \`console.log(\`를 닫는 \`)\`입니다. 열고 닫지 않은 괄호, 중괄호, 따옴표를 찾습니다.

**Cannot read properties of undefined**

위 예시의 \`TypeError\`입니다. 조회 후, 코드가 읽는 필드가 응답에 없을 때 자주 나타납니다. 응답 전체를 출력해 무엇이 들어 있는지 확인합니다.

\`\`\`js
console.log("Response:", JSON.stringify(response.result, null, 2));
\`\`\`

**Account not found**

\`\`\`
XahaudError: Account not found.
\`\`\`

이 오류는 코드가 아니라 노드에서 온 것으로, 계정이 원장에 존재하지 않는다는 뜻입니다. 계정은 첫 XAH를 받으면 존재하게 됩니다. 주소와 네트워크를 확인합니다. 테스트넷 계정은 메인넷에 존재하지 않습니다. 테스트넷에서는 faucet이 계정을 만들고 자금을 보냅니다([모듈 3](?m=3&l=1)).

**ENOTFOUND, ETIMEDOUT, ECONNREFUSED**

\`\`\`
Error: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
\`\`\`

요청 전에 연결이 실패했습니다. \`ENOTFOUND\`는 호스트 이름이 존재하지 않는다는 뜻이므로 URL을 확인합니다. \`ETIMEDOUT\`과 \`ECONNREFUSED\`는 호스트는 있지만 응답하지 않았다는 뜻이므로 연결과 방화벽을 확인하거나 다른 노드를 시도합니다. 이 강좌의 URL은 테스트넷이 \`wss://xahau-test.net\`, 메인넷이 \`wss://xahau.network\`입니다.

### 스크립트가 하는 일 보기

\`console.log\`는 스크립트의 한 지점에서 값을 보여 줍니다. 각 단계의 앞뒤에 한 줄씩 출력해 두면, 스크립트가 멈췄을 때 마지막으로 출력된 줄로 어느 단계까지 갔는지 알 수 있습니다. 객체와 타입에는 두 가지가 도움이 됩니다.

- \`JSON.stringify(object, null, 2)\`는 객체 전체를 2칸 들여쓰기로 출력합니다.
- \`typeof value\`는 타입을 출력합니다. 객체가 있어야 할 곳의 \`"undefined"\`가 대부분의 \`TypeError\`의 시작입니다.

네트워크 요청은 코드와 상관없는 이유로 실패할 수 있습니다. \`try/catch\`로 오류를 잡으면 스크립트가 무엇이 실패했는지 알리고 깔끔하게 끝날 수 있습니다. 어떤 경우든 마지막에 \`client.disconnect()\`를 호출합니다. 연결이 열려 있으면 Node가 계속 실행되어 스크립트가 끝나지 않습니다.

### 예제

\`debug-errors.js\`는 각 단계를 각자의 \`try/catch\` 안에서 실행하고 번호를 붙이므로, 실패하면 어느 단계였는지 보입니다. 테스트넷 출력입니다.

\`\`\`
=== Xahau 오류 디버깅 ===
1. xahau 라이브러리 import 완료
   Client 타입: function
2. 다음 노드용 클라이언트 생성: wss://xahau-test.net
3. 연결 시도 중...
   정상적으로 연결되었습니다
4. server_info 조회 중...
5. 응답 수신:
   타입: object
   키: [ 'info', 'native_currency_code' ]
   네트워크: 21338
   레저: 12663295
6. 정상적으로 연결 종료
=== 디버깅 종료 ===
\`\`\`

\`네트워크: 21338\`은 Xahau 테스트넷의 네트워크 ID입니다.

\`connectivity-test.js\`는 테스트넷, 메인넷, 존재하지 않는 URL에 연결합니다. 세 번째 연결은 실패해야 합니다. 잘못된 URL로 받는 오류를 보여 주기 위해서입니다. 출력입니다.

\`\`\`
=== Xahau 연결 테스트 ===
테스트 중: Xahau Testnet (wss://xahau-test.net)
연결됨 - 레저: 12663297

테스트 중: Xahau Mainnet (wss://xahau.network)
연결됨 - 레저: 26093967

테스트 중: 잘못된 URL (wss://nodo-doesnt-exist.example.com)
오류: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
=== 요약 ===
testnet과 mainnet이 연결되면 환경 준비 완료.
실패하면 인터넷 연결을 확인하세요.
잘못된 URL은 반드시 실패해야 합니다.
\`\`\``,
        zh: `脚本迟早会失败：缺少一个包、有一处拼写错误、某个节点没有响应。本课说明 Node.js 如何处理你的文件、如何阅读它打印的错误，以及本课程中各种错误的含义。

### 运行脚本

\`node file.js\` 分两个阶段运行文件。首先，Node 读取整个文件，检查它是否是有效的 JavaScript。然后从上到下执行。如果错误发生在第一阶段，脚本在执行任何代码之前就会停止，所以你的 \`console.log\` 行一行都不会出现。如果错误发生在第二阶段，脚本会在那一点停止，之前打印的行仍然留在屏幕上。

在项目文件夹中运行脚本，也就是包含 \`package.json\` 和 \`node_modules/\` 的文件夹：

\`\`\`
cd xahau-course
node debug-errors.js
\`\`\`

有两件事取决于这个文件夹。Node 会以你所在的文件夹为基准查找 \`debug-errors.js\`。而 \`require("xahau")\` 会从脚本所在的文件夹开始向上，在 \`node_modules/\` 中查找库。

### 阅读错误

脚本失败时，Node 会打印错误并停止。例如：

\`\`\`
/Users/you/xahau-course/ledger.js:2
console.log(info.validated_ledger.seq);
                 ^

TypeError: Cannot read properties of undefined (reading 'validated_ledger')
    at Object.<anonymous> (/Users/you/xahau-course/ledger.js:2:18)
    at Module._compile (node:internal/modules/cjs/loader:1812:14)
    at Object..js (node:internal/modules/cjs/loader:1943:10)
\`\`\`

按以下顺序阅读：

1. **错误行**：\`TypeError: Cannot read properties of undefined (reading 'validated_ledger')\`。类型说明问题的种类，消息说明发生了什么。这里 \`info\` 是 \`undefined\`，所以它没有 \`validated_ledger\`。
2. **位置**（顶部）：文件和行号（\`ledger.js:2\`）、那一行代码，以及出错位置下方的 \`^\`。
3. **调用栈**：以 \`at\` 开头的行，从最近到最早排列。包含你自己文件的行显示了导致错误的路径。\`node:internal\` 的行是 Node 自身的代码：跳过它们。

最常见的类型：

| 类型 | 何时 | 常见原因 |
|---|---|---|
| \`SyntaxError\` | 执行前 | 代码不是有效的 JavaScript：缺少括号、在 \`async\` 函数之外使用 \`await\` |
| \`ReferenceError\` | 执行中 | 名称不存在：拼写错误、缺少 \`require\` |
| \`TypeError\` | 执行中 | 值的种类不对，通常是代码期待对象的地方出现了 \`undefined\` |
| \`XahaudError\` | 执行中 | Xahau 节点以错误响应了请求 |

### 本课程中的错误

**Cannot find module 'xahau'**

\`\`\`
Error: Cannot find module 'xahau'
Require stack:
- /Users/you/Desktop/script.js
\`\`\`

Node 从脚本所在的文件夹向上，在所有 \`node_modules/\` 中都没有找到这个库。要么没有安装，要么脚本在项目之外。在项目文件夹中运行 \`npm install xahau\`，并在那里运行脚本。

**await is only valid in async functions**

\`\`\`
  await client.connect();
  ^^^^^

SyntaxError: await is only valid in async functions and the top level bodies of modules
\`\`\`

本课程的脚本是 CommonJS 文件：它们用 \`require\` 加载库。在 CommonJS 文件中，\`await\` 只能在标记为 \`async\` 的函数内使用。如果写在使用 \`require\` 的文件的顶层，Node 会因同样的原因给出另一条消息：

\`\`\`
ReferenceError: Cannot determine intended module format because both 'require' and top-level await are present.
\`\`\`

像本课程的所有脚本一样，把代码放进一个 \`async\` 函数并调用它：

\`\`\`js
async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // ...
}

main();
\`\`\`

**missing ) after argument list** 及其他语法错误

\`\`\`
console.log("Client:", typeof Client;
                              ^^^^^^

SyntaxError: missing ) after argument list
\`\`\`

\`^\` 标出 Node 发现问题的位置。错误就在那里或紧挨在它之前：这里是闭合 \`console.log(\` 的 \`)\`。查找打开后没有关闭的括号、花括号和引号。

**Cannot read properties of undefined**

就是上面示例中的 \`TypeError\`。它通常出现在查询之后，当响应中没有代码读取的字段时。打印整个响应，看看里面有什么：

\`\`\`js
console.log("Response:", JSON.stringify(response.result, null, 2));
\`\`\`

**Account not found**

\`\`\`
XahaudError: Account not found.
\`\`\`

这个错误来自节点，而不是你的代码：账本中不存在这个账户。账户在收到第一笔 XAH 后才存在。检查地址，也检查网络：测试网账户在主网上不存在。在测试网上，水龙头会创建账户并注资（[模块 3](?m=3&l=1)）。

**ENOTFOUND、ETIMEDOUT、ECONNREFUSED**

\`\`\`
Error: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
\`\`\`

连接在发出任何请求之前就失败了。\`ENOTFOUND\` 表示主机名不存在：检查 URL。\`ETIMEDOUT\` 和 \`ECONNREFUSED\` 表示主机存在但没有响应：检查你的网络连接和防火墙，或换一个节点。本课程的 URL 是测试网 \`wss://xahau-test.net\` 和主网 \`wss://xahau.network\`。

### 查看脚本在做什么

\`console.log\` 显示脚本某一点的值。在每个步骤前后各打印一行：脚本停止时，最后打印的那一行告诉你它执行到了哪一步。有两种写法对对象和类型很有帮助：

- \`JSON.stringify(object, null, 2)\` 以 2 个空格缩进打印整个对象。
- \`typeof value\` 打印类型：本该是对象的地方出现 \`"undefined"\`，是大多数 \`TypeError\` 的起因。

网络请求可能因为与代码无关的原因失败。\`try/catch\` 捕获错误，让脚本说明哪里失败并干净地结束。无论哪种情况，最后都调用 \`client.disconnect()\`：打开的连接会让 Node 继续运行，脚本就不会结束。

### 示例

\`debug-errors.js\` 在各自的 \`try/catch\` 中运行每个步骤并编号，所以失败时能看出是哪一步。测试网上的输出：

\`\`\`
=== Xahau 错误调试 ===
1. xahau 库导入成功
   Client 类型： function
2. 已为以下节点创建客户端： wss://xahau-test.net
3. 尝试连接...
   连接成功
4. 查询 server_info...
5. 收到响应：
   类型： object
   键： [ 'info', 'native_currency_code' ]
   网络： 21338
   账本： 12663295
6. 已正常断开连接
=== 调试结束 ===
\`\`\`

输出中的 21338 是 Xahau 测试网的网络 ID。

\`connectivity-test.js\` 连接测试网、主网和一个不存在的 URL。第三个连接必须失败：它展示了错误 URL 会得到的错误。输出：

\`\`\`
=== Xahau 连接测试 ===
测试中： Xahau Testnet (wss://xahau-test.net)
已连接 - 账本： 12663297

测试中： Xahau Mainnet (wss://xahau.network)
已连接 - 账本： 26093968

测试中： 错误 URL (wss://nodo-doesnt-exist.example.com)
错误： getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
=== 总结 ===
如果测试网和主网都能连接：你的环境已就绪。
如果有失败：检查你的网络连接。
错误 URL 必须失败（这是错误测试）。
\`\`\``,
      },
      codeBlocks: [
        {
          title: {
            es: "Script con manejo de errores y depuración",
            pt: "Script com tratamento de erros e depuração",
            en: "Script with error handling and debugging",
            jp: "エラー処理とデバッグ付きスクリプト",
            ko: "오류 처리와 디버깅이 포함된 스크립트",
            zh: "包含错误处理和调试的脚本",
          },
          language: "javascript",
          code: {
            es: `// Archivo: debug-errors.js
// Ejecutar con: node debug-errors.js
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
            pt: `// Arquivo: debug-errors.js
// Executar com: node debug-errors.js
// Este script mostra como tratar erros passo a passo.
const { Client } = require("xahau");
async function main() {
  console.log("=== Depuração de Erros na Xahau ===");
  // Passo 1: Verificar que a biblioteca foi importada corretamente
  console.log("1. Biblioteca xahau importada corretamente");
  console.log("   Tipo de Client:", typeof Client);
  // Passo 2: Criar o cliente
  const client = new Client("wss://xahau-test.net");
  console.log("2. Cliente criado para:", "wss://xahau-test.net");
  // Passo 3: Tentar conectar com tratamento de erros
  try {
    console.log("3. Tentando conectar...");
    await client.connect();
    console.log("   Conectado corretamente");
  } catch (error) {
    console.error("   ERRO ao conectar:", error.message);
    console.error("   Possíveis causas:");
    console.error("   - Sem conexão com a internet");
    console.error("   - O nó está fora do ar");
    console.error("   - Firewall bloqueando WebSocket");
    return; // Sair da função se não for possível conectar
  }
  // Passo 4: Fazer uma consulta
  try {
    console.log("4. Consultando server_info...");
    const response = await client.request({
      command: "server_info"
    });
    // Passo 5: Inspecionar a resposta
    console.log("5. Resposta recebida:");
    console.log("   Tipo:", typeof response);
    console.log("   Chaves:", Object.keys(response.result));
    const info = response.result.info;
    console.log("   Rede:", info.network_id);
    console.log("   Ledger:", info.validated_ledger.seq);
  } catch (error) {
    console.error("   ERRO na consulta:", error.message);
  }
  // Passo 6: Desconectar
  try {
    await client.disconnect();
    console.log("6. Desconectado corretamente");
  } catch (error) {
    console.error("   ERRO ao desconectar:", error.message);
  }
  console.log("=== Fim da depuração ===");
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
            pt: "Teste de conectividade e erros comuns",
            en: "Connectivity test and common errors",
            jp: "接続テストとよくあるエラー",
            ko: "연결 테스트와 자주 발생하는 오류",
            zh: "连接测试与常见错误",
          },
          language: "javascript",
          code: {
            es: `// Archivo: connectivity-test.js
// Ejecutar con: node connectivity-test.js
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
            pt: `// Arquivo: connectivity-test.js
// Executar com: node connectivity-test.js
// Testa a conexão e mostra erros comuns.
const { Client } = require("xahau");
// Função auxiliar para testar uma conexão
async function testConexao(url, nome) {
  console.log("Testando:", nome, "(" + url + ")");
  const client = new Client(url);
  try {
    await client.connect();
    const response = await client.request({ command: "server_info" });
    const ledger = response.result.info.validated_ledger.seq;
    console.log("Conectado - Ledger:", ledger);
    await client.disconnect();
    return true;
  } catch (error) {
    console.log("Erro:", error.message);
    return false;
  }
}
async function main() {
  console.log("=== Teste de Conectividade da Xahau ===");
  // Teste 1: Conexão à testnet (deve funcionar)
  await testConexao("wss://xahau-test.net", "Xahau Testnet");
  console.log("");
  // Teste 2: Conexão à mainnet (deve funcionar)
  await testConexao("wss://xahau.network", "Xahau Mainnet");
  console.log("");
  // Teste 3: URL incorreta (deve falhar - exemplo de erro)
  await testConexao("wss://no-que-nao-existe.example.com", "URL incorreta");
  console.log("=== Resumo ===");
  console.log("Se testnet e mainnet conectarem: seu ambiente está pronto.");
  console.log("Se alguma falhar: verifique sua conexão com a internet.");
  console.log("A URL incorreta DEVE falhar (é um teste de erro).");
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
          title: { es: "Ejecutar scripts", pt: "Executar scripts", en: "Running Scripts", jp: "スクリプトの実行", ko: "스크립트 실행", zh: "运行脚本" },
          content: {
            es: "Comando básico:\nnode nombre-archivo.js\n\nDebes estar en la carpeta del proyecto\n(donde está package.json y node_modules/)\n\nEjemplo:\ncd xahau-curso\nnode hola-xahau.js",
            pt: "Comando básico:\nnode nome-arquivo.js\n\nVocê deve estar na pasta do projeto\n(onde está package.json e node_modules/)\n\nExemplo:\ncd xahau-curso\nnode hola-xahau.js",
            en: "Basic command:\nnode filename.js\n\nYou must be in the project folder\n(where package.json and node_modules/ are)\n\nExample:\ncd xahau-curso\nnode hola-xahau.js",
            jp: "基本コマンド:\nnode ファイル名.js\n\nプロジェクトフォルダにいる必要があります\n（package.jsonとnode_modules/がある場所）\n\n例:\ncd xahau-curso\nnode hola-xahau.js",
            ko: "기본 명령:\nnode filename.js\n\n프로젝트 폴더 안에서 실행해야 합니다\n(package.json과 node_modules/가 있는 위치)\n\n예시:\ncd xahau-curso\nnode hola-xahau.js",
            zh: "基本命令：\nnode 文件名.js\n\n必须在项目文件夹中运行\n（package.json 和 node_modules/ 所在位置）\n\n示例：\ncd xahau-curso\nnode hola-xahau.js",
          },
          visual: "▶️",
        },
        {
          title: { es: `Leer un error`, pt: `Ler um erro`, en: `Reading an error`, jp: `エラーの読み方`, ko: `오류 읽기`, zh: `阅读错误` },
          content: {
            es: `1. La línea del error → tipo + mensaje
   TypeError: Cannot read properties of undefined

2. La ubicación → archivo:línea y ^

3. La pila → las líneas "at"
   Importan las tuyas; salta node:internal

SyntaxError → antes de ejecutar
TypeError, ReferenceError → al ejecutar`,
            pt: `1. A linha do erro → tipo + mensagem
   TypeError: Cannot read properties of undefined

2. A localização → arquivo:linha e ^

3. A pilha → as linhas "at"
   Importam as suas; pule node:internal

SyntaxError → antes de executar
TypeError, ReferenceError → ao executar`,
            en: `1. The error line → type + message
   TypeError: Cannot read properties of undefined

2. The location → file:line and ^

3. The stack → the "at" lines
   Yours matter; skip node:internal

SyntaxError → before running
TypeError, ReferenceError → while running`,
            jp: `1. エラー行 → 型 + メッセージ
   TypeError: Cannot read properties of undefined

2. 場所 → ファイル:行 と ^

3. スタック → 「at」の行
   自分のファイルの行を見る。node:internal は飛ばす

SyntaxError → 実行前
TypeError、ReferenceError → 実行中`,
            ko: `1. 오류 줄 → 타입 + 메시지
   TypeError: Cannot read properties of undefined

2. 위치 → 파일:줄과 ^

3. 스택 → "at" 줄
   내 파일 줄을 봄. node:internal은 건너뜀

SyntaxError → 실행 전
TypeError, ReferenceError → 실행 중`,
            zh: `1. 错误行 → 类型 + 消息
   TypeError: Cannot read properties of undefined

2. 位置 → 文件:行号 和 ^

3. 调用栈 → “at” 行
   看你自己的文件；跳过 node:internal

SyntaxError → 执行前
TypeError、ReferenceError → 执行中`,
          },
          visual: "🔍",
        },
        {
          title: { es: `Los errores de este curso`, pt: `Os erros deste curso`, en: `The errors of this course`, jp: `このコースで出会うエラー`, ko: `이 강좌에서 만나는 오류`, zh: `本课程中的错误` },
          content: {
            es: `Cannot find module 'xahau'
  → npm install xahau, ejecuta desde el proyecto

await is only valid in async functions
  → pon el código en una función async

Account not found
  → dirección o red; en testnet, financiarla

ENOTFOUND / ETIMEDOUT
  → revisa la URL / la conexión`,
            pt: `Cannot find module 'xahau'
  → npm install xahau, execute a partir do projeto

await is only valid in async functions
  → coloque o código numa função async

Account not found
  → endereço ou rede; na testnet, financie-a

ENOTFOUND / ETIMEDOUT
  → verifique a URL / a conexão`,
            en: `Cannot find module 'xahau'
  → npm install xahau, run from the project

await is only valid in async functions
  → put the code in an async function

Account not found
  → address or network; fund it on testnet

ENOTFOUND / ETIMEDOUT
  → check the URL / the connection`,
            jp: `Cannot find module 'xahau'
  → npm install xahau、プロジェクトから実行

await is only valid in async functions
  → コードを async 関数に入れる

Account not found
  → アドレスかネットワーク。テストネットなら資金を送る

ENOTFOUND / ETIMEDOUT
  → URL / 接続を確認`,
            ko: `Cannot find module 'xahau'
  → npm install xahau, 프로젝트에서 실행

await is only valid in async functions
  → 코드를 async 함수에 넣기

Account not found
  → 주소 또는 네트워크. 테스트넷에서는 자금 보내기

ENOTFOUND / ETIMEDOUT
  → URL / 연결 확인`,
            zh: `Cannot find module 'xahau'
  → npm install xahau，在项目中运行

await is only valid in async functions
  → 把代码放进 async 函数

Account not found
  → 检查地址或网络；在测试网上为它注资

ENOTFOUND / ETIMEDOUT
  → 检查 URL / 网络连接`,
          },
          visual: "⚠️",
        },
      ],
    },
    {
      id: "m0l6",
      title: {
        es: "Guardar claves de forma segura con .env",
        pt: "Salvar chaves de forma segura com .env",
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
        pt: `Ao longo do curso, vamos trabalhar com **seeds** (chaves privadas) de contas da Xahau. É fundamental aprender desde o início a guardá-las de forma segura, mesmo em testnet, para criar bons hábitos que protejam você na mainnet.
### Por que NÃO colocar chaves diretamente no código?
Imagine que você tem isto no seu script:
\`\`\`
const wallet = Wallet.fromSeed("sEdV9mHTYLPKPPPfBGB9xpGnFxsQo4r");
\`\`\`
Isso é **muito perigoso** por vários motivos:
- Se você enviar seu código ao **GitHub** (ou outro repositório), qualquer pessoa pode ver sua chave privada e roubar seus fundos
- Se você compartilhar o arquivo com alguém (por e-mail, chat, etc.), está compartilhando sua chave
- Os bots do GitHub **varrem repositórios públicos** em busca de chaves privadas expostas e roubam fundos automaticamente em segundos
- Mesmo que você apague a chave depois, o histórico do Git **a preserva** e ela continua acessível
### O que é um arquivo .env?
Um arquivo \`.env\` (de "environment", ambiente) é um arquivo de texto simples que armazena **variáveis de ambiente**, configurações sensíveis de que seu código precisa, mas que não devem ficar no código-fonte:
\`\`\`
WALLET_A_SEED=sEdVxxxTuSeedDeTestnet
WALLET_B_SEED=sEdYyyOtraSeedDeTestnet
XAHAU_NODE=wss://xahau-test.net
\`\`\`
### Regras do arquivo .env
- **Nunca envie o .env ao Git**: adicione-o sempre ao \`.gitignore\`
- **Um .env por ambiente**: você pode ter um para a testnet e outro para a mainnet
- **Sem aspas** (a menos que o valor tenha espaços): \`CHAVE=valor\`
- **Sem espaços** ao redor do \`=\`: \`CHAVE=valor\` (correto) vs \`CHAVE = valor\` (incorreto)
- **Cada variable em uma linha**
### Instalar dotenv
A biblioteca \`dotenv\` lê o arquivo \`.env\` e carrega as variáveis em \`process.env\`:
\`\`\`
npm install dotenv
\`\`\`
### Como usar dotenv em seu código
No início do seu script, adicione uma única linha:
\`\`\`
require("dotenv").config();
\`\`\`
Isso carrega todas as variáveis do arquivo \`.env\` no objeto \`process.env\`. Depois você pode acessá-las assim:
\`\`\`
const seed = process.env.WALLET_A_SEED;
const node = process.env.XAHAU_NODE;
\`\`\`
### Criar ou arquivo .gitignore
O arquivo \`.gitignore\` diz ao Git quais arquivos **não deve rastrear nem enviar** ao repositorio. Crie um arquivo chamado \`.gitignore\` na raiz do seu projeto com este conteúdo:
\`\`\`
.env
node_modules/
\`\`\`
Isso protege tanto suas chaves (\`.env\`) quanto as bibliotecas baixadas (\`node_modules/\`).
### Flujo de trabajo recomendado
1. Crie seu arquivo \`.env\` com as chaves
2. Crie ou atualize seu \`.gitignore\` para excluir \`.env\`
3. Em cada script, carga dotenv no início: \`require("dotenv").config()\`
4. Acesse as chaves com \`process.env.NOME_DA_VARIAVEL\`
5. Se você compartilhar seu código, crie um arquivo \`.env.example\` (sem valores reais) para que outras pessoas saibam quais variáveis são necessárias
### Implicações de segurança
- **Testnet**: Se vazar um seed de testnet, você não perde dinheiro real, mas alguém poderia interferir nos seus testes
- **Mainnet**: Se vazar um seed de mainnet, **você pode perder todos os seus fundos de forma irreversível**. Não há como recuperar fundos roubados em uma blockchain
- **Repositórios públicos**: Uma vez que um seed é enviado a um repositório público, considere-o **comprometido**. Mova seus fundos a uma nova conta inmediatamente
- **Histórico do Git**: Mesmo que você apague o arquivo, o seed continua no histórico. Você precisaria reescrever o histórico do Git, o que é complicado`,
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
            pt: "Criar o arquivo .env",
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
            pt: `# 1. Instalar a biblioteca dotenv
npm install dotenv
# 2. Criar o arquivo .env (na raiz do projeto)
# IMPORTANTE: Este arquivo NÃO se sube a Git
# Conteúdo do arquivo .env:
# WALLET_A_SEED=sEdVxxxTuSeedDeTestnet
# WALLET_B_SEED=sEdYyyOtraSeedDeTestnet
# XAHAU_NODE=wss://xahau-test.net
# 3. Criar ou arquivo .gitignore
# Conteúdo do arquivo .gitignore:
# .env
# node_modules/
# 4. (Opcional) Criar .env.example para documentar as variávels
# Conteúdo do arquivo .env.example:
# WALLET_A_SEED=sua_seed_aqui
# WALLET_B_SEED=sua_seed_aqui
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
            pt: "Script que usa variáveis de ambiente com dotenv",
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
            pt: `// Arquivo: safe-payment.js
// Executar com: node safe-payment.js
// Requiere: arquivo .env com WALLET_A_SEED, WALLET_B_SEED e XAHAU_NODE
// 1. Cargar variávels de ambiente a partir de .env
require("dotenv").config();
const { Client, Wallet } = require("xahau");
async function main() {
  // 2. Ler chaves de process.env (NÃO do código)
  const seedA = process.env.WALLET_A_SEED;
  const seedB = process.env.WALLET_B_SEED;
  const node = process.env.XAHAU_NODE;
  // 3. Verificar que as variávels existen
  if (!seedA || !seedB) {
    console.error("Erro: Faltam variáveis no arquivo .env");
    console.error("Certifique-se de que WALLET_A_SEED e WALLET_B_SEED estão definidas.");
    console.error("Copie .env.example para .env e preencha os valores.");
    return;
  }
  if (!node) {
    console.error("Erro: Falta XAHAU_NODE em .env");
    return;
  }
  console.log("Variáveis cargadas corretamente a partir de .env");
  console.log("Nó:", node);
  // NUNCA fazer console.log do seed — nem siquiera em testnet
  const client = new Client(node);
  await client.connect();
  // 4. Criar wallets a partir dos seeds do .env
  const walletA = Wallet.fromSeed(seedA, {algorithm: 'secp256k1'});
  const walletB = Wallet.fromSeed(seedB, {algorithm: 'secp256k1'});
  console.log("Wallet A:", walletA.address);
  console.log("Wallet B:", walletB.address);
  // 5. Enviar um pagamento de A a B
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
            pt: "Exemplo de .env.example (para compartilhar sem chaves reais)",
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
            pt: `# Arquivo: .env.example
# Copie este arquivo como .env e preenche com seus valores reais:
#   cp .env.example .env
#
# NUNCA envie ou arquivo .env a Git.
# Este arquivo .env.example PODE ser enviado, porque não tem chaves reais.
WALLET_A_SEED=sua_seed_de_testnet_aqui
WALLET_B_SEED=sua_seed_de_testnet_aqui
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
          title: { es: "¿Por qué usar .env?", pt: "Por que usar .env?", en: "Why use .env?", jp: "なぜ.envを使うのか？", ko: "왜 .env를 사용하나요?", zh: "为什么使用 .env？" },
          content: {
            es: "NUNCA pongas claves privadas en el código\n\n• Los bots escanean GitHub y roban fondos\n• El historial de Git conserva las claves\n• Compartir código = compartir claves\n\nSolución: archivo .env + .gitignore",
            pt: "NUNCA coloque chaves privadas no código\n\n• Os bots varrem o GitHub e roubam fundos\n• O histórico do Git preserva as chaves\n• Compartilhar código = compartilhar chaves\n\nSolução: arquivo .env + .gitignore",
            en: "NEVER put private keys in the code\n\n• Bots scan GitHub and steal funds\n• Git history preserves the keys\n• Sharing code = sharing keys\n\nSolution: .env file + .gitignore",
            jp: "秘密鍵をコードに絶対入れない\n\n• ボットがGitHubをスキャンして資金を盗む\n• Gitの履歴がキーを保持する\n• コードを共有する = キーを共有する\n\n解決策: .envファイル + .gitignore",
            ko: "비밀키를 코드에 직접 넣지 마세요\n\n• 봇이 GitHub를 스캔해 자금을 탈취할 수 있음\n• Git 기록에 키가 남을 수 있음\n• 코드 공유 = 키 공유\n\n해결책: .env 파일 + .gitignore",
            zh: "永远不要将私钥写入代码\n\n• 机器人扫描 GitHub 并盗取资金\n• Git 历史记录会保留密钥\n• 共享代码 = 共享密钥\n\n解决方案：.env 文件 + .gitignore",
          },
          visual: "🔐",
        },
        {
          title: { es: "Cómo usar dotenv", pt: "Como usar dotenv", en: "How to use dotenv", jp: "dotenvの使い方", ko: "dotenv 사용 방법", zh: "如何使用 dotenv" },
          content: {
            es: "1. npm install dotenv\n2. Crear .env con tus claves\n3. Añadir .env a .gitignore\n4. En tu script: require(\"dotenv\").config()\n5. Leer: process.env.NOMBRE_VARIABLE",
            pt: "1. npm install dotenv\n2. Criar .env com suas chaves\n3. Adicionar .env ao .gitignore\n4. Em seu script: require(\"dotenv\").config()\n5. Ler: process.env.NOME_DA_VARIAVEL",
            en: "1. npm install dotenv\n2. Create .env with your keys\n3. Add .env to .gitignore\n4. In your script: require(\"dotenv\").config()\n5. Read: process.env.VARIABLE_NAME",
            jp: "1. npm install dotenv\n2. キーを含む.envを作成する\n3. .envを.gitignoreに追加する\n4. スクリプトで: require(\"dotenv\").config()\n5. 読み取り: process.env.変数名",
            ko: "1. npm install dotenv\n2. 키를 넣은 .env 생성\n3. .env를 .gitignore에 추가\n4. 스크립트에서: require(\"dotenv\").config()\n5. 읽기: process.env.VARIABLE_NAME",
            zh: "1. npm install dotenv\n2. 创建包含密钥的 .env\n3. 将 .env 添加到 .gitignore\n4. 脚本中：require(\"dotenv\").config()\n5. 读取：process.env.变量名",
          },
          visual: "📋",
        },
        {
          title: { es: "Buenas prácticas", pt: "Boas práticas", en: "Best Practices", jp: "ベストプラクティス", ko: "모범 사례", zh: "最佳实践" },
          content: {
            es: "• .env → Claves reales (NO subir a Git)\n• .env.example → Plantilla sin claves (SÍ subir)\n• .gitignore → Excluir .env y node_modules/\n• Nunca hacer console.log de un seed\n• En mainnet: un seed filtrado = fondos perdidos",
            pt: "• .env → Chaves reais (NÃO enviar ao Git)\n• .env.example → Modelo sem chaves (pode enviar)\n• .gitignore → Excluir .env e node_modules/\n• Nunca fazer console.log de um seed\n• Em mainnet: um seed vazado = fundos perdidos",
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

const arabicModuleTranslations = {
  title: "إعداد بيئة التطوير",
  lessons: {
    m0l1: {
      title: "تثبيت Visual Studio Code",
      theory: `**Visual Studio Code (VS Code)** هو محرر الكود الذي سنستخدمه طوال الدورة. إنه مجاني وخفيف ويملك منظومة ضخمة من الإضافات التي تجعل التطوير أسهل.

### لماذا VS Code؟

- **مجاني ومفتوح المصدر** وتديره Microsoft
- **متعدد المنصات**: يعمل على Windows و macOS و Linux
- **طرفية مدمجة**: يمكنك تشغيل الأوامر دون مغادرة المحرر
- **إضافات كثيرة**: دعم JavaScript، تنسيق تلقائي، إكمال ذكي، وغير ذلك
- **Git مدمج**: إدارة الإصدارات من داخل المحرر

### التثبيت على Windows

1. افتح [code.visualstudio.com](https://code.visualstudio.com)
2. اضغط **"Download for Windows"**
3. شغّل ملف التثبيت \`.exe\`
4. أثناء التثبيت فعّل الخيارات الموصى بها:
   - إضافة "Open with Code" إلى قائمة الملفات
   - إضافة "Open with Code" إلى قائمة المجلدات
   - الإضافة إلى PATH حتى تستطيع فتحه من الطرفية باستخدام \`code .\`
5. اضغط **Install** وانتظر حتى يكتمل التثبيت

### التثبيت على macOS

1. افتح [code.visualstudio.com](https://code.visualstudio.com)
2. اضغط **"Download for Mac"**
3. افتح ملف \`.zip\`
4. اسحب **Visual Studio Code.app** إلى مجلد **Applications**
5. لاستخدام الأمر \`code\` من الطرفية:
   - افتح VS Code
   - اضغط \`Cmd + Shift + P\`
   - اكتب **"Shell Command: Install 'code' command in PATH"**
   - اختر الأمر وأكّد

### التثبيت على Linux

على Ubuntu/Debian يمكنك تثبيت VS Code من مستودع Microsoft أو تنزيل حزمة \`.deb\` من الموقع. على Fedora/RHEL يمكنك استخدام مستودع yum/dnf الرسمي. بعد التثبيت افتح طرفية ونفّذ:

\`\`\`
code --version
\`\`\`

إذا ظهر رقم الإصدار، فالتثبيت صحيح.`,
      codeTitles: [
        "التحقق من تثبيت VS Code من الطرفية",
        "الإضافات الموصى بها للدورة",
      ],
      slides: [
        {
          title: "Visual Studio Code",
          content: "محرر كود مجاني ومتعدد المنصات\n\n• Windows و macOS و Linux\n• طرفية مدمجة\n• آلاف الإضافات\n• Git مدمج\n• التحميل: code.visualstudio.com",
        },
        {
          title: "تثبيت سريع",
          content: "Windows → تنزيل .exe ثم التثبيت\nmacOS → تنزيل .zip ثم السحب إلى Applications\nLinux → apt install code / dnf install code\n\nالتحقق:\ncode --version",
        },
      ],
    },
    m0l2: {
      title: "تثبيت Node.js",
      theory: `**Node.js** هو بيئة تشغيل JavaScript التي نحتاجها لتشغيل سكربتات الدورة. كل أمثلة الكود التي تتفاعل مع بلوكتشين Xahau ستعمل باستخدام Node.js.

### لماذا نحتاج Node.js؟

JavaScript لا يعمل فقط داخل المتصفح. مع Node.js يمكنك تشغيل ملفات \`.js\` مباشرة على جهازك، والاتصال بعقد Xahau، وإرسال طلبات، وتثبيت مكتبات مثل \`xahau\`.

Node.js يأتي عادة مع:

- \`node\`: لتشغيل ملفات JavaScript
- \`npm\`: لتثبيت المكتبات وإدارة المشروع
- \`npx\`: لتشغيل أدوات مؤقتة دون تثبيتها عالميا

### الإصدار الموصى به

استخدم Node.js v18 أو أحدث. الأفضل للدورة هو إصدار LTS حديث مثل v22 LTS لأنه مستقر ومناسب للمشاريع التعليمية.

### التثبيت

على Windows نزّل ملف \`.msi\` من [nodejs.org](https://nodejs.org). على macOS يمكنك استخدام الموقع أو Homebrew:

\`\`\`
brew install node@22
\`\`\`

على Linux استخدم مدير الحزم أو NodeSource حسب التوزيعة. بعد التثبيت تحقق من الإصدارات:

\`\`\`
node --version
npm --version
\`\`\`

### إنشاء مشروع الدورة

سننشئ مجلدا خاصا بالدورة، نجهز \`package.json\`، ثم نثبت مكتبة \`xahau\`:

\`\`\`
mkdir xahau-curso
cd xahau-curso
npm init -y
npm install xahau
\`\`\`

بعد ذلك يمكنك إنشاء ملفات \`.js\` وتشغيلها باستخدام \`node nombre-archivo.js\`.`,
      codeTitles: [
        "التحقق من التثبيت وإنشاء مشروع الدورة",
        "أول سكربت لك: Hello Xahau",
      ],
      slides: [
        {
          title: "ما هو Node.js؟",
          content: "JavaScript خارج المتصفح\n\n• node → تشغيل السكربتات\n• npm → تثبيت المكتبات\n• npx → تشغيل الأدوات\n\nالإصدارات: v18+، ويفضل v22 LTS",
        },
        {
          title: "تثبيت سريع",
          content: "Windows → nodejs.org → .msi\nmacOS → brew install node@22\nLinux → NodeSource + apt/dnf\n\nالتحقق:\nnode --version\nnpm --version",
        },
        {
          title: "تجهيز المشروع",
          content: "mkdir xahau-curso\ncd xahau-curso\nnpm init -y\nnpm install xahau\n\nأصبحت جاهزا لتشغيل سكربتات الدورة.",
        },
      ],
    },
    m0l3: {
      title: "بديل عبر الإنترنت: CodeSandbox",
      theory: `إذا كنت لا تريد أو لا تستطيع تثبيت البرامج على جهازك، يمكنك استخدام **CodeSandbox**، وهي بيئة تطوير مجانية عبر الإنترنت تعمل مباشرة في المتصفح.

### ما هو CodeSandbox؟

[CodeSandbox](https://codesandbox.io) هو IDE سحابي يتيح لك كتابة الكود وتشغيله ومشاركته دون تثبيت أي شيء. تشمل خطته المجانية كل ما تحتاجه لهذه الدورة.

### مزايا CodeSandbox

- **بدون تثبيت**: كل شيء يعمل في المتصفح
- **الوصول من أي جهاز**: كل ما تحتاجه هو اتصال بالإنترنت
- **طرفية مدمجة**: يمكنك تشغيل أوامر \`npm\` و\`node\`
- **مشاركة الكود**: لكل sandbox رابط فريد
- **مجاني**: الخطة المجانية كافية للدورة

### إنشاء حسابك

1. اذهب إلى [codesandbox.io](https://codesandbox.io)
2. اضغط على **"Sign In"** (أعلى اليمين)
3. يمكنك التسجيل باستخدام حساب **GitHub** أو **Google** أو **البريد الإلكتروني**
4. بعد الدخول، ستصل إلى لوحة التحكم (dashboard) الخاصة بك

### إنشاء sandbox للدورة

1. من لوحة التحكم، اضغط على **"Create"** (أعلى اليمين)
2. اختر **"Import from GitHub"** أو ابحث عن قالب **"Node.js"**
3. إذا لم تجد قالب Node.js:
   - اضغط على **"Create"** ← **"Devbox"**
   - اختر **"Node.js"** كقالب
4. سينشئ هذا بيئة مع Node.js مثبّت مسبقا

### إعداد الـ sandbox من أجل Xahau

بمجرد دخولك إلى الـ sandbox:

1. **افتح الطرفية**: اضغط على أيقونة الطرفية في اللوحة السفلية، أو استخدم القائمة **Terminal → New Terminal**
2. **ثبّت مكتبة xahau**: نفّذ في الطرفية:

\`\`\`
npm install xahau
\`\`\`

3. **أنشئ ملفك الأول**: اضغط بزر الفأرة الأيمن في مستكشف الملفات (اللوحة اليسرى) ← **New File** ← سمّ الملف \`hola-xahau.js\`
4. **اكتب الكود**: انسخ أي مثال من الدورة إلى الملف
5. **شغّل السكربت**: في الطرفية، نفّذ:

\`\`\`
node hola-xahau.js
\`\`\`

### هيكل الـ sandbox الموصى به

نظّم ملفاتك على هذا النحو لمتابعة الدورة:

\`\`\`
xahau-curso/
├── package.json          ← يُنشأ تلقائيا
├── node_modules/         ← يُنشأ مع npm install
├── m01-arquitectura.js   ← سكربتات الوحدة 1
├── m02-consenso.js       ← سكربتات الوحدة 2
├── m03-wallet.js         ← سكربتات الوحدة 3
├── m04-consultas.js      ← سكربتات الوحدة 4
├── m05-transacciones.js  ← سكربتات الوحدة 5
├── m06-pagos.js          ← سكربتات الوحدة 6
├── m07-tokens.js         ← سكربتات الوحدة 7
├── m08-nfts.js           ← سكربتات الوحدة 8
├── m09-hooks.js          ← سكربتات الوحدة 9
└── m10-escrows-checks.js ← سكربتات الوحدة 10
\`\`\`

### قيود الخطة المجانية

- **sandboxes عامة**: كودك مرئي للآخرين (لا تضع مفاتيح خاصة بالـ mainnet)
- **مهلة عدم النشاط**: يتوقف الـ sandbox مؤقتا بعد فترة من عدم الاستخدام (يعاد تنشيطه عند عودتك)
- **موارد محدودة**: كافية لسكربتات الدورة، لكن غير كافية لتصريف Hooks بلغة C

### توصية أمنية

بما أن الـ sandboxes المجانية عامة، **لا تضع أبدا seeds أو مفاتيح خاصة بالـ mainnet** في CodeSandbox. استخدم فقط مفاتيح **testnet** (رموز بلا قيمة حقيقية). للعمل على mainnet، استخدم بيئة محلية مع VS Code.`,
      codeTitles: [
        "تثبيت xahau في CodeSandbox (الطرفية)",
        "سكربت اختبار لـ CodeSandbox",
      ],
      slides: [
        {
          title: "CodeSandbox",
          content: "IDE مجاني عبر الإنترنت داخل المتصفح\n\n• لا يحتاج إلى تثبيت\n• طرفية مدمجة\n• Node.js مثبت مسبقا\n• codesandbox.io",
        },
        {
          title: "إعداده لـ Xahau",
          content: "1. أنشئ حسابا في codesandbox.io\n2. أنشئ Devbox بقالب Node.js\n3. npm install xahau\n4. أنشئ ملف .js واكتب الكود\n5. node my-file.js",
        },
        {
          title: "الأمان",
          content: "الـ sandboxes المجانية قد تكون عامة\n\n• لا تضع أبدا seeds خاصة بالـ mainnet\n• استخدم فقط مفاتيح testnet\n• للـ mainnet استخدم بيئة محلية مع VS Code",
        },
      ],
    },
    m0l4: {
      title: "هيكل مشروع Node.js",
      theory: `الآن بعد أن ثبّتّ Node.js وحمّلت مكتبة \`xahau\`، من المهم أن تفهم **كيف يُنظَّم مشروع Node.js** قبل أن تبدأ في كتابة كود يتفاعل مع البلوكتشين.

### ما هو package.json؟

ملف \`package.json\` هو **بطاقة البيانات التقنية لمشروعك**. يُنشأ تلقائيا عند تشغيل \`npm init -y\` ويحتوي على:

- **name**: اسم مشروعك
- **version**: الإصدار الحالي
- **description**: وصف مختصر
- **main**: الملف الرئيسي (افتراضيا \`index.js\`)
- **scripts**: أوامر مخصصة يمكنك تشغيلها بواسطة \`npm run\`
- **dependencies**: المكتبات التي يحتاجها مشروعك ليعمل (مثل \`xahau\`)

عندما تشغّل \`npm install xahau\`، يقوم npm بتنزيل المكتبة ويسجّلها تلقائيا في حقل \`dependencies\` داخل \`package.json\`.

### ما هو node_modules/؟

مجلد \`node_modules/\` هو المكان الذي يُنزّل فيه npm كل المكتبات التي يحتاجها مشروعك. يحتوي على:

- مكتبة \`xahau\` التي ثبّتها
- كل **الاعتماديات الداخلية** لتلك المكتبة (مكتبات أخرى تحتاجها للعمل)
- يمكن أن يحتوي على مئات أو آلاف الملفات

**قاعدة مهمة**: **لا تشارك أو ترفع \`node_modules/\` أبدا إلى مستودعات أو أجهزة أخرى.** يمكن إعادة إنشاء هذا المجلد في أي وقت بتشغيل \`npm install\` (يقرأ npm ملف \`package.json\` ويعيد تنزيل كل شيء). إذا كنت تستخدم Git، أضف \`node_modules/\` إلى ملف \`.gitignore\`.

### ما هو require() وكيف تستورد المكتبات؟

في Node.js نستخدم \`require()\` **لاستيراد المكتبات** واستخدامها في كودنا:

\`\`\`
const { Client, Wallet } = require("xahau");
\`\`\`

هذا السطر يقوم بما يلي:
1. يبحث عن مكتبة \`xahau\` داخل \`node_modules/\`
2. يستورد الكائنين \`Client\` و\`Wallet\` من تلك المكتبة
3. يخزّنهما في ثوابت يمكنك استخدامها في كودك

يمكنك أيضا استيراد ملفاتك الخاصة:

\`\`\`
const misFunciones = require("./utils.js");
\`\`\`

الرمز \`./\` في البداية يشير إلى أن الملف موجود في المجلد الحالي.

### إنشاء وتنظيم ملفات .js

كل سكربت في الدورة سيكون ملف \`.js\` مستقلا. نوصي بهذا التنظيم:

\`\`\`
xahau-curso/
├── package.json
├── node_modules/
├── 01-conexion.js
├── 02-wallet.js
├── 03-balance.js
├── 04-pago.js
└── utils.js          ← دوال مشتركة (اختياري)
\`\`\`

يُشغَّل كل ملف بشكل مستقل باستخدام \`node اسم-الملف.js\`.

### async/await: العمليات غير المتزامنة

عندما يتواصل كودك مع البلوكتشين، تستغرق العمليات **بعض الوقت** (الاتصال بالعقدة، إرسال المعاملات، انتظار الردود). تستخدم JavaScript **async/await** للتعامل مع هذه العمليات دون إيقاف البرنامج:

- **async**: يميّز دالة كدالة غير متزامنة (يمكن أن تحتوي على عمليات تستغرق وقتا)
- **await**: يوقف التنفيذ إلى أن تنتهي العملية وتُعيد نتيجة

\`\`\`
async function consultar() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();        // ينتظر الاتصال
  const datos = await client.request({ command: "server_info" }); // ينتظر الرد
  await client.disconnect();     // ينتظر قطع الاتصال
}
\`\`\`

بدون \`await\`، سيحاول الكود استخدام الرد قبل استلامه، مما يسبب أخطاء.

### معالجة الأخطاء باستخدام try/catch

قد تفشل عمليات البلوكتشين: قد تكون العقدة متوقفة، أو الشبكة بطيئة، أو قد يحتوي الكود على خطأ. نستخدم **try/catch** لالتقاط هذه الأخطاء بطريقة منضبطة:

\`\`\`
try {
  // كود قد يفشل
  await client.connect();
} catch (error) {
  // يُنفَّذ إذا فشل شيء ما
  console.error("Error:", error.message);
}
\`\`\`

**try** يحاول تنفيذ الكود. إذا فشل شيء ما، ينتقل التنفيذ مباشرة إلى كتلة **catch**، حيث يمكنك عرض الخطأ أو اتخاذ إجراء بديل. بدون \`try/catch\`، سيوقف الخطأ البرنامج بأكمله فجأة.`,
      codeTitles: [
        "مثال package.json مع شرح",
        "سكربت أساسي باستخدام async/await و try/catch",
      ],
      slides: [
        {
          title: "تشريح مشروع Node.js",
          content: "package.json → بطاقة تعريف المشروع\n\nnode_modules/ → المكتبات المثبتة\n  لا تشاركه، يعاد إنشاؤه بـ npm install\n\nfile.js → كودك\n  التشغيل: node file.js",
        },
        {
          title: "require() والاستيراد",
          content: "استيراد مكتبة مثبتة:\nconst { Client, Wallet } = require(\"xahau\");\n\nاستيراد ملف من مشروعك:\nconst utils = require(\"./utils.js\");\n\nrequire() يبحث في node_modules/ أو في المسار المحدد",
        },
        {
          title: "async/await و try/catch",
          content: "async → يحدد دوال تنفذ عمليات بطيئة\nawait → ينتظر انتهاء العملية\n\ntry { } → يحاول تنفيذ الكود\ncatch (error) { } → يلتقط الأخطاء دون إسقاط البرنامج\n\nضرورية للعمل مع البلوكتشين",
        },
      ],
    },
    m0l5: {
      title: "تشغيل السكربتات وتصحيح الأخطاء",
      theory: `يفشل السكربت عاجلًا أو آجلًا: حزمة ناقصة، أو خطأ مطبعي، أو عقدة لا تستجيب. يشرح هذا الدرس ما يفعله Node.js بملفك، وكيف تقرأ الخطأ الذي يطبعه، وما معنى أخطاء هذه الدورة.

### تشغيل سكربت

يشغّل \`node file.js\` الملف على مرحلتين. أولًا يقرأ Node الملف كله ويتحقق من أنه JavaScript صالح. ثم ينفذه من الأعلى إلى الأسفل. الخطأ في المرحلة الأولى يوقف السكربت قبل تنفيذ أي شيء، فلا يظهر أي سطر من أسطر \`console.log\`. أما الخطأ في المرحلة الثانية فيوقفه عند تلك النقطة، وتبقى الأسطر المطبوعة قبله على الشاشة.

شغّل السكربتات من مجلد المشروع، وهو المجلد الذي يحتوي على \`package.json\` و\`node_modules/\`:

\`\`\`
cd xahau-course
node debug-errors.js
\`\`\`

يعتمد أمران على هذا المجلد. يبحث Node عن \`debug-errors.js\` انطلاقًا من المجلد الذي أنت فيه. ويبحث \`require("xahau")\` عن المكتبة في \`node_modules/\`، بدءًا من مجلد السكربت وصعودًا.

### قراءة الخطأ

عندما يفشل سكربت، يطبع Node الخطأ ويتوقف. مثلًا:

\`\`\`
/Users/you/xahau-course/ledger.js:2
console.log(info.validated_ledger.seq);
                 ^

TypeError: Cannot read properties of undefined (reading 'validated_ledger')
    at Object.<anonymous> (/Users/you/xahau-course/ledger.js:2:18)
    at Module._compile (node:internal/modules/cjs/loader:1812:14)
    at Object..js (node:internal/modules/cjs/loader:1943:10)
\`\`\`

اقرأه بهذا الترتيب:

1. **سطر الخطأ**: \`TypeError: Cannot read properties of undefined (reading 'validated_ledger')\`. يخبرك النوع بطبيعة المشكلة، وتخبرك الرسالة بما حدث. هنا \`info\` قيمته \`undefined\`، لذا لا يحتوي على \`validated_ledger\`.
2. **الموقع** في الأعلى: الملف والسطر (\`ledger.js:2\`)، وسطر الشيفرة، وعلامة \`^\` تحت موضع الخطأ.
3. **المكدس**: أسطر \`at\`، من الأحدث إلى الأقدم. الأسطر التي تحتوي على ملفاتك تُظهر المسار الذي أدى إلى الخطأ. أسطر \`node:internal\` هي شيفرة Node نفسه: تجاوزها.

الأنواع التي ستراها أكثر من غيرها:

| النوع | متى | السبب المعتاد |
|---|---|---|
| \`SyntaxError\` | قبل التنفيذ | الشيفرة ليست JavaScript صالحًا: قوس ناقص، أو \`await\` خارج دالة \`async\` |
| \`ReferenceError\` | أثناء التنفيذ | اسم غير موجود: خطأ مطبعي، أو \`require\` ناقص |
| \`TypeError\` | أثناء التنفيذ | قيمة من نوع مختلف، غالبًا \`undefined\` حيث تتوقع الشيفرة كائنًا |
| \`XahaudError\` | أثناء التنفيذ | عقدة Xahau ردّت على الطلب بخطأ |

### أخطاء هذه الدورة

**Cannot find module 'xahau'**

\`\`\`
Error: Cannot find module 'xahau'
Require stack:
- /Users/you/Desktop/script.js
\`\`\`

لم يجد Node المكتبة في أي \`node_modules/\` من مجلد السكربت صعودًا. إما أنها غير مثبتة، وإما أن السكربت خارج المشروع. شغّل \`npm install xahau\` في مجلد المشروع، وشغّل السكربت من هناك.

**await is only valid in async functions**

\`\`\`
  await client.connect();
  ^^^^^

SyntaxError: await is only valid in async functions and the top level bodies of modules
\`\`\`

سكربتات الدورة ملفات CommonJS: تحمّل المكتبات بـ \`require\`. في ملف CommonJS، لا يعمل \`await\` إلا داخل دالة معلّمة بـ \`async\`. وإذا كُتب في المستوى الأعلى من ملف يستخدم \`require\`، يعطي Node رسالة أخرى للسبب نفسه:

\`\`\`
ReferenceError: Cannot determine intended module format because both 'require' and top-level await are present.
\`\`\`

ضع الشيفرة في دالة \`async\` واستدعها، كما تفعل كل سكربتات الدورة:

\`\`\`js
async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // ...
}

main();
\`\`\`

**missing ) after argument list** وأخطاء الصياغة الأخرى

\`\`\`
console.log("Client:", typeof Client;
                              ^^^^^^

SyntaxError: missing ) after argument list
\`\`\`

تشير \`^\` إلى الموضع الذي لاحظ فيه Node المشكلة. الخطأ هناك أو قبله مباشرة: هنا القوس \`)\` الذي يغلق \`console.log(\`. ابحث عن الأقواس والأقواس المعقوفة وعلامات الاقتباس التي فُتحت ولم تُغلق.

**Cannot read properties of undefined**

هو \`TypeError\` المثال السابق. يظهر عادة بعد استعلام، عندما لا يحتوي الرد على الحقل الذي تقرؤه الشيفرة. اطبع الرد كاملًا لترى ما فيه:

\`\`\`js
console.log("Response:", JSON.stringify(response.result, null, 2));
\`\`\`

**Account not found**

\`\`\`
XahaudError: Account not found.
\`\`\`

هذا الخطأ صادر عن العقدة لا عن شيفرتك: الحساب غير موجود في الـ ledger. يوجد الحساب بعد أن يستلم أول XAH له. تحقق من العنوان ومن الشبكة: حساب testnet غير موجود على Mainnet. على testnet، ينشئ الـ faucet الحسابات ويموّلها ([الوحدة 3](?m=3&l=1)).

**ENOTFOUND وETIMEDOUT وECONNREFUSED**

\`\`\`
Error: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
\`\`\`

فشل الاتصال قبل أي طلب. \`ENOTFOUND\` يعني أن اسم المضيف غير موجود: تحقق من الـ URL. أما \`ETIMEDOUT\` و\`ECONNREFUSED\` فيعنيان أن المضيف موجود لكنه لم يستجب: تحقق من اتصالك والجدار الناري، أو جرّب عقدة أخرى. عناوين الدورة هي \`wss://xahau-test.net\` لـ testnet و\`wss://xahau.network\` لـ Mainnet.

### رؤية ما يفعله السكربت

يعرض \`console.log\` قيمة عند نقطة من السكربت. اطبع سطرًا قبل كل خطوة وبعدها: عندما يتوقف السكربت، يخبرك آخر سطر مطبوع بالخطوة التي وصل إليها. هناك صيغتان تساعدان مع الكائنات والأنواع:

- \`JSON.stringify(object, null, 2)\` يطبع كائنًا كاملًا بمسافة بادئة من مسافتين.
- \`typeof value\` يطبع النوع: ظهور \`"undefined"\` مكان كائن هو بداية معظم أخطاء \`TypeError\`.

قد يفشل طلب إلى الشبكة لأسباب خارجة عن شيفرتك. يلتقط \`try/catch\` الخطأ، فيستطيع السكربت أن يخبرك بما فشل وأن ينتهي بشكل نظيف. انتهِ بـ \`client.disconnect()\` في كل الحالات: الاتصال المفتوح يُبقي Node قيد التشغيل، فلا ينتهي السكربت.

### الأمثلة

ينفذ \`debug-errors.js\` كل خطوة داخل \`try/catch\` خاص بها ويرقّمها، لذا يُظهر الفشل الخطوة التي حدث فيها. المخرجات على testnet:

\`\`\`
=== تصحيح الأخطاء في Xahau ===
1. تم استيراد مكتبة xahau بشكل صحيح
   نوع Client: function
2. تم إنشاء العميل لـ: wss://xahau-test.net
3. محاولة الاتصال...
   تم الاتصال بنجاح
4. جارٍ الاستعلام عن server_info...
5. تم استلام الاستجابة:
   النوع: object
   المفاتيح: [ 'info', 'native_currency_code' ]
   الشبكة: 21338
   Ledger: 12663294
6. تم قطع الاتصال بشكل صحيح
=== نهاية التصحيح ===
\`\`\`

الرقم 21338 في سطر الشبكة هو معرّف شبكة Xahau التجريبية (testnet).

يتصل \`connectivity-test.js\` بـ testnet وبـ Mainnet وبـ URL غير موجود. يجب أن يفشل الاتصال الثالث: فهو يُظهر الخطأ الذي تحصل عليه مع URL خاطئ. المخرجات:

\`\`\`
=== اختبار الاتصال بـ Xahau ===
اختبار: Xahau Testnet (wss://xahau-test.net)
متصل - Ledger: 12663295

اختبار: Xahau Mainnet (wss://xahau.network)
متصل - Ledger: 26093966

اختبار: Incorrect URL (wss://nodo-doesnt-exist.example.com)
خطأ: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
=== الملخص ===
إذا نجح الاتصال بـ testnet و mainnet: بيئتك جاهزة.
إذا فشل أحدهما: تحقق من اتصالك بالإنترنت.
عنوان URL الخاطئ يجب أن يفشل (إنه اختبار خطأ).
\`\`\``,
      codeTitles: [
        "سكربت مع معالجة الأخطاء والتصحيح",
        "اختبار الاتصال والأخطاء الشائعة",
      ],
      slides: [
        {
          title: "تشغيل السكربتات",
          content: "الأمر الأساسي:\nnode filename.js\n\nيجب أن تكون داخل مجلد المشروع\nحيث توجد package.json و node_modules/\n\nمثال:\ncd xahau-curso\nnode hola-xahau.js",
        },
        {
          title: `قراءة الخطأ`,
          content: `1. سطر الخطأ ← النوع + الرسالة
   TypeError: Cannot read properties of undefined

2. الموقع ← file:line و^

3. المكدس ← أسطر "at"
   المهم أسطر ملفاتك؛ تجاوز node:internal

SyntaxError ← قبل التنفيذ
TypeError وReferenceError ← أثناء التنفيذ`,
        },
        {
          title: `أخطاء هذه الدورة`,
          content: `Cannot find module 'xahau'
  ← npm install xahau، وشغّل من المشروع

await is only valid in async functions
  ← ضع الشيفرة في دالة async

Account not found
  ← العنوان أو الشبكة؛ موّله على testnet

ENOTFOUND / ETIMEDOUT
  ← تحقق من الـ URL / الاتصال`,
        },
      ],
    },
    m0l6: {
      title: "حفظ المفاتيح بأمان باستخدام .env",
      theory: `طوال الدورة سنعمل مع **seeds** (مفاتيح خاصة) لحسابات Xahau. من الضروري أن تتعلم منذ البداية كيفية تخزينها بأمان، حتى على testnet، لبناء عادات جيدة تحميك على mainnet.

### لماذا لا تضع المفاتيح مباشرة في الكود؟

تخيل أن لديك هذا في سكربتك:

\`\`\`
const wallet = Wallet.fromSeed("sEdV9mHTYLPKPPPfBGB9xpGnFxsQo4r");
\`\`\`

هذا **خطير جدا** لعدة أسباب:

- إذا رفعت كودك إلى **GitHub** (أو أي مستودع آخر)، يمكن لأي شخص رؤية مفتاحك الخاص وسرقة أموالك
- إذا شاركت الملف مع شخص ما (عبر البريد الإلكتروني، الدردشة، إلخ)، فأنت تشارك مفتاحك
- روبوتات GitHub **تفحص المستودعات العامة** بحثا عن مفاتيح خاصة مكشوفة، وتسرق الأموال تلقائيا خلال ثوان
- حتى لو حذفت المفتاح لاحقا، يحتفظ سجل Git **به** ويظل قابلا للوصول إليه

### ما هو ملف .env؟

ملف \`.env\` (اختصار لـ "environment") هو ملف نصي عادي يخزن **متغيرات البيئة**، وهي إعدادات حساسة يحتاجها كودك لكن لا ينبغي أن تكون في الكود المصدري:

\`\`\`
WALLET_A_SEED=sEdVxxxYourTestnetSeed
WALLET_B_SEED=sEdYyyAnotherTestnetSeed
XAHAU_NODE=wss://xahau-test.net
\`\`\`

### قواعد ملف .env

- **لا ترفع .env إلى Git أبدا**: أضفه دائما إلى \`.gitignore\`
- **ملف .env واحد لكل بيئة**: يمكنك أن يكون لديك واحد لـ testnet وآخر لـ mainnet
- **بدون علامات اقتباس** (إلا إذا كانت القيمة تحتوي على مسافات): \`KEY=value\`
- **بدون مسافات** حول \`=\`: \`KEY=value\` (صحيح) مقابل \`KEY = value\` (خاطئ)
- **كل متغير في سطر منفصل**

### تثبيت dotenv

مكتبة \`dotenv\` تقرأ ملف \`.env\` وتحمّل المتغيرات في \`process.env\`:

\`\`\`
npm install dotenv
\`\`\`

### كيفية استخدام dotenv في كودك

في بداية سكربتك، أضف سطرا واحدا فقط:

\`\`\`
require("dotenv").config();
\`\`\`

هذا يحمّل كل المتغيرات من ملف \`.env\` إلى الكائن \`process.env\`. بعد ذلك يمكنك الوصول إليها هكذا:

\`\`\`
const seed = process.env.WALLET_A_SEED;
const node = process.env.XAHAU_NODE;
\`\`\`

### إنشاء ملف .gitignore

ملف \`.gitignore\` يخبر Git بالملفات التي **يجب ألا يتتبعها أو يرفعها** إلى المستودع. أنشئ ملفا باسم \`.gitignore\` في جذر مشروعك بهذا المحتوى:

\`\`\`
.env
node_modules/
\`\`\`

هذا يحمي مفاتيحك (\`.env\`) والمكتبات المُنزَّلة (\`node_modules/\`) على حد سواء.

### سير العمل الموصى به

1. أنشئ ملف \`.env\` الخاص بك مع المفاتيح
2. أنشئ أو حدّث \`.gitignore\` لاستبعاد \`.env\`
3. في كل سكربت، حمّل dotenv في البداية: \`require("dotenv").config()\`
4. اصل إلى المفاتيح باستخدام \`process.env.VARIABLE_NAME\`
5. إذا شاركت كودك، أنشئ ملف \`.env.example\` (بدون قيم حقيقية) حتى يعرف الآخرون المتغيرات التي يحتاجونها

### الآثار الأمنية

- **Testnet**: إذا تسرب seed خاص بـ testnet، لن تخسر أموالا حقيقية، لكن شخصا ما قد يتدخل في اختباراتك
- **Mainnet**: إذا تسرب seed خاص بـ mainnet، **يمكن أن تخسر كل أموالك بشكل لا رجعة فيه**. لا توجد طريقة لاسترداد الأموال المسروقة على البلوكتشين
- **المستودعات العامة**: بمجرد رفع seed إلى مستودع عام، اعتبره **مخترقا**. انقل أموالك إلى حساب جديد فورا
- **سجل Git**: حتى لو حذفت الملف، يبقى الـ seed في السجل. ستحتاج إلى إعادة كتابة سجل Git، وهو أمر معقد`,
      codeTitles: [
        "إنشاء ملف .env",
        "سكربت يستخدم متغيرات البيئة مع dotenv",
        "مثال .env.example للمشاركة دون مفاتيح حقيقية",
      ],
      slides: [
        {
          title: "لماذا نستخدم .env؟",
          content: "لا تضع المفاتيح الخاصة داخل الكود أبدا\n\n• أدوات آلية تفحص GitHub وتسرق الأموال\n• تاريخ Git قد يحتفظ بالمفاتيح\n• مشاركة الكود = مشاركة المفاتيح\n\nالحل: ملف .env + .gitignore",
        },
        {
          title: "كيفية استخدام dotenv",
          content: "1. npm install dotenv\n2. أنشئ .env وفيه مفاتيحك\n3. أضف .env إلى .gitignore\n4. في السكربت: require(\"dotenv\").config()\n5. اقرأ: process.env.VARIABLE_NAME",
        },
        {
          title: "أفضل الممارسات",
          content: "• .env → مفاتيح حقيقية، لا ترفعها إلى Git\n• .env.example → قالب بلا مفاتيح، يمكن رفعه\n• .gitignore → استبعد .env و node_modules/\n• لا تطبع seed أبدا\n• في mainnet: seed مسرب = أموال مفقودة",
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
  title: "Préparation de l'environnement de travail",
  lessons: {
    m0l1: {
      title: "Installation de Visual Studio Code",
      theory: `**Visual Studio Code (VS Code)** est l'éditeur de code que nous utiliserons pendant tout le cours. Il est gratuit, léger et possède un très grand écosystème d'extensions qui rendent le développement plus confortable.

### Pourquoi VS Code ?

- **Gratuit et open source**
- **Multiplateforme** : Windows, macOS et Linux
- **Terminal intégré** : tu peux exécuter des commandes sans quitter l'éditeur
- **Extensions** : JavaScript, formatage automatique, autocomplétion et bien plus
- **Git intégré** : gestion de versions directement dans l'éditeur

### Installation

Va sur [code.visualstudio.com](https://code.visualstudio.com), télécharge la version correspondant à ton système et suis l'assistant d'installation. Sur macOS, déplace l'application dans le dossier Applications. Sur Linux, tu peux utiliser le paquet \`.deb\`, \`.rpm\` ou le dépôt officiel.

### Commande \`code\`

Après l'installation, vérifie que la commande \`code\` fonctionne depuis le terminal. Elle permet d'ouvrir un dossier directement dans VS Code avec \`code .\`.

### Vérification

Ouvre un terminal et exécute :

\`\`\`
code --version
\`\`\`

Si une version s'affiche, VS Code est prêt.`,
      codeTitles: [
        "Vérifier l'installation de VS Code depuis le terminal",
        "Extensions recommandées pour le cours",
      ],
      slides: [
        {
          title: "Visual Studio Code",
          content: "L'éditeur que nous utiliserons pendant le cours\n\n• Gratuit et léger\n• Terminal intégré\n• Extensions utiles\n• Git intégré\n• Fonctionne sur Windows, macOS et Linux",
        },
        {
          title: "Installation rapide",
          content: "1. Va sur code.visualstudio.com\n2. Télécharge la version de ton système\n3. Installe VS Code\n4. Active la commande code si nécessaire\n5. Vérifie avec code --version",
        },
      ],
    },
    m0l2: {
      title: "Installation de Node.js",
      theory: `**Node.js** est l'environnement d'exécution JavaScript dont nous avons besoin pour lancer les scripts du cours. Tous les exemples de code qui interagissent avec la blockchain Xahau s'exécutent avec Node.js.

### Qu'est-ce que Node.js ?

Node.js permet d'exécuter du code JavaScript **en dehors du navigateur**, directement sur ton ordinateur. Il comprend :
- **node** : l'interpréteur JavaScript (exécute tes scripts)
- **npm** : le gestionnaire de paquets (installe des librairies comme \`xahau\`)
- **npx** : l'exécuteur de paquets (exécute des outils sans les installer globalement)

### Version recommandée

Pour ce cours, tu as besoin de **Node.js v18 ou supérieur** (nous recommandons la dernière version LTS). La librairie \`xahau\` nécessite au moins la v18.

### Installation sur Windows

1. Rends-toi sur [nodejs.org](https://nodejs.org)
2. Télécharge la version **LTS** (Long Term Support)
3. Exécute l'installeur \`.msi\`
4. Suis l'assistant avec les options par défaut
5. **Important** : coche la case « Automatically install the necessary tools » si elle apparaît
6. Redémarre le terminal après l'installation

### Installation sur macOS

**Option A — Installeur officiel :**
1. Rends-toi sur [nodejs.org](https://nodejs.org)
2. Télécharge la version **LTS** pour macOS
3. Ouvre le fichier \`.pkg\` et suis l'assistant

**Option B — Avec Homebrew (recommandé) :**
1. Si tu n'as pas Homebrew, installe-le d'abord depuis [brew.sh](https://brew.sh)
2. Exécute dans le terminal :

\`\`\`
brew install node@22
\`\`\`

### Installation sur Linux (Ubuntu/Debian)

Utilise le dépôt officiel NodeSource pour obtenir la version la plus récente :

\`\`\`
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
\`\`\`

### Installation sur Linux (Fedora)

\`\`\`
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf install -y nodejs
\`\`\`

### Vérifier l'installation

Ouvre un **nouveau terminal** (c'est important, surtout sur Windows) et exécute :

\`\`\`
node --version
npm --version
\`\`\`

Tu devrais voir quelque chose comme \`v22.x.x\` et \`10.x.x\` respectivement.

### Installer la librairie xahau

Une fois Node.js installé, tu peux installer la librairie que nous utiliserons tout au long du cours :

\`\`\`
mkdir xahau-course
cd xahau-course
npm init -y
npm install xahau
\`\`\`

Cela créera ton projet et téléchargera la librairie \`xahau\` afin que tu puisses exécuter tous les exemples du cours.`,
      codeTitles: [
        "Vérifier l'installation et créer le projet du cours",
        "Ton premier script : Hello Xahau",
      ],
      slides: [
        {
          title: "Qu'est-ce que Node.js ?",
          content: "Node.js exécute JavaScript hors du navigateur\n\n• Scripts en ligne de commande\n• Connexion aux noeuds Xahau\n• Installation de paquets avec npm\n• Base de tous les exemples du cours",
        },
        {
          title: "Installation rapide",
          content: "1. Va sur nodejs.org\n2. Télécharge la version LTS\n3. Installe Node.js\n4. Vérifie avec node --version\n5. Vérifie npm avec npm --version",
        },
        {
          title: "Préparer le projet",
          content: "mkdir xahau-course\ncd xahau-course\nnpm init -y\nnpm install xahau\n\nLe dossier contient package.json et node_modules/",
        },
      ],
    },
    m0l3: {
      title: "Alternative en ligne : CodeSandbox",
      theory: `Si tu ne veux pas ou ne peux pas installer de logiciel sur ton ordinateur, tu peux utiliser **CodeSandbox**, un environnement de développement en ligne gratuit qui fonctionne directement dans ton navigateur.

### Qu'est-ce que CodeSandbox ?

[CodeSandbox](https://codesandbox.io) est un IDE dans le cloud qui te permet d'écrire, d'exécuter et de partager du code sans rien installer. Son plan gratuit inclut tout ce dont tu as besoin pour ce cours.

### Avantages de CodeSandbox

- **Sans installation** : tout fonctionne dans le navigateur
- **Accès depuis n'importe quel appareil** : tu as juste besoin d'internet
- **Terminal intégré** : tu peux exécuter des commandes npm et node
- **Partage de code** : chaque sandbox a une URL unique
- **Gratuit** : le plan gratuit suffit pour le cours

### Créer ton compte

1. Rends-toi sur [codesandbox.io](https://codesandbox.io)
2. Clique sur **"Sign In"** (en haut à droite)
3. Tu peux t'inscrire avec ton compte **GitHub**, **Google** ou par **email**
4. Une fois connecté, tu arriveras sur ton dashboard

### Créer un sandbox pour le cours

1. Dans ton dashboard, clique sur **"Create"** (en haut à droite)
2. Sélectionne **"Import from GitHub"** ou recherche le modèle **"Node.js"**
3. Si tu ne trouves pas le modèle Node.js :
   - Clique sur **"Create"** → **"Devbox"**
   - Sélectionne **"Node.js"** comme modèle
4. Cela créera un environnement avec Node.js préinstallé

### Configurer le sandbox pour Xahau

Une fois à l'intérieur du sandbox :

1. **Ouvrir le terminal** : clique sur l'icône de terminal dans le panneau inférieur, ou utilise le menu **Terminal → New Terminal**
2. **Installer la librairie xahau** : exécute dans le terminal :

\`\`\`
npm install xahau
\`\`\`

3. **Créer ton premier fichier** : clic droit dans l'explorateur de fichiers (panneau gauche) → **New File** → nomme le fichier \`hola-xahau.js\`
4. **Écrire le code** : copie n'importe quel exemple du cours dans le fichier
5. **Exécuter le script** : dans le terminal, exécute :

\`\`\`
node hola-xahau.js
\`\`\`

### Structure de sandbox recommandée

Organise tes fichiers ainsi pour suivre le cours :

\`\`\`
xahau-curso/
├── package.json          ← Créé automatiquement
├── node_modules/         ← Créé avec npm install
├── m01-arquitectura.js   ← Scripts du module 1
├── m02-consenso.js       ← Scripts du module 2
├── m03-wallet.js         ← Scripts du module 3
├── m04-consultas.js      ← Scripts du module 4
├── m05-transacciones.js  ← Scripts du module 5
├── m06-pagos.js          ← Scripts du module 6
├── m07-tokens.js         ← Scripts du module 7
├── m08-nfts.js           ← Scripts du module 8
├── m09-hooks.js          ← Scripts du module 9
└── m10-escrows-checks.js ← Scripts du module 10
\`\`\`

### Limitations du plan gratuit

- **Sandboxes publics** : ton code est visible par les autres (ne mets pas de clés privées mainnet)
- **Délai d'inactivité** : le sandbox se met en pause après un moment d'inactivité (il se réactive à ton retour)
- **Ressources limitées** : suffisantes pour les scripts du cours, mais pas pour compiler des Hooks en C

### Recommandation de sécurité

Comme les sandboxes gratuits sont publics, **ne mets jamais de seeds ou de clés privées mainnet** dans CodeSandbox. Utilise uniquement des clés **testnet** (jetons sans valeur réelle). Pour travailler avec le mainnet, utilise un environnement local avec VS Code.`,
      codeTitles: [
        "Installer xahau dans CodeSandbox (terminal)",
        "Script de test pour CodeSandbox",
      ],
      slides: [
        {
          title: "CodeSandbox",
          content: "Un environnement de développement dans le navigateur\n\n• Pas d'installation locale\n• Terminal inclus\n• Pratique pour tester vite\n• Suffisant pour les premiers scripts",
        },
        {
          title: "Configurer pour Xahau",
          content: "1. Crée un projet Node.js\n2. Ouvre le terminal\n3. npm install xahau\n4. Crée un fichier .js\n5. Lance avec node fichier.js",
        },
        {
          title: "Sécurité",
          content: "N'utilise jamais de seed mainnet dans un sandbox\n\n• Les projets peuvent être partagés\n• Le code peut rester visible\n• Utilise uniquement testnet\n• Supprime les secrets avant de partager",
        },
      ],
    },
    m0l4: {
      title: "Structure d'un projet Node.js",
      theory: `Maintenant que tu as Node.js installé et la librairie \`xahau\` téléchargée, il est important de comprendre **comment est organisé un projet Node.js** avant de commencer à écrire du code qui interagit avec la blockchain.

### Qu'est-ce que package.json ?

Le fichier \`package.json\` est la **fiche technique de ton projet**. Il est créé automatiquement quand tu exécutes \`npm init -y\` et contient :

- **name** : le nom de ton projet
- **version** : la version actuelle
- **description** : une brève description
- **main** : le fichier principal (par défaut \`index.js\`)
- **scripts** : des commandes personnalisées que tu peux exécuter avec \`npm run\`
- **dependencies** : les librairies dont ton projet a besoin pour fonctionner (comme \`xahau\`)

Quand tu exécutes \`npm install xahau\`, npm télécharge la librairie et l'enregistre automatiquement dans le champ \`dependencies\` du \`package.json\`.

### Qu'est-ce que node_modules/ ?

Le dossier \`node_modules/\` est l'endroit où npm télécharge toutes les librairies dont ton projet a besoin. Il contient :

- La librairie \`xahau\` que tu as installée
- Toutes les **dépendances internes** de cette librairie (d'autres librairies dont elle a besoin pour fonctionner)
- Il peut contenir des centaines, voire des milliers de fichiers

**Règle importante** : **ne partage ni ne téléverse jamais \`node_modules/\` vers des dépôts ou d'autres ordinateurs.** Ce dossier peut être recréé à tout moment en exécutant \`npm install\` (npm lit le \`package.json\` et retélécharge tout). Si tu utilises Git, ajoute \`node_modules/\` au fichier \`.gitignore\`.

### Qu'est-ce que require() et comment importer des librairies ?

En Node.js, on utilise \`require()\` pour **importer des librairies** et les utiliser dans notre code :

\`\`\`
const { Client, Wallet } = require("xahau");
\`\`\`

Cette ligne fait ce qui suit :
1. Elle recherche la librairie \`xahau\` dans \`node_modules/\`
2. Elle importe les objets \`Client\` et \`Wallet\` de cette librairie
3. Elle les stocke dans des constantes que tu peux utiliser dans ton code

Tu peux aussi importer tes propres fichiers :

\`\`\`
const misFunciones = require("./utils.js");
\`\`\`

Le \`./\` au début indique que le fichier se trouve dans le répertoire courant.

### Créer et organiser des fichiers .js

Chaque script du cours sera un fichier \`.js\` indépendant. Nous recommandons cette organisation :

\`\`\`
xahau-curso/
├── package.json
├── node_modules/
├── 01-conexion.js
├── 02-wallet.js
├── 03-balance.js
├── 04-pago.js
└── utils.js          ← Fonctions partagées (facultatif)
\`\`\`

Chaque fichier s'exécute de façon indépendante avec \`node nom-du-fichier.js\`.

### async/await : opérations asynchrones

Quand ton code communique avec la blockchain, les opérations **prennent du temps** (connexion au noeud, envoi de transactions, attente des réponses). JavaScript utilise **async/await** pour gérer ces opérations sans bloquer le programme :

- **async** : marque une fonction comme asynchrone (elle peut contenir des opérations qui prennent du temps)
- **await** : met en pause l'exécution jusqu'à ce que l'opération se termine et retourne un résultat

\`\`\`
async function consultar() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();        // Attend la connexion
  const datos = await client.request({ command: "server_info" }); // Attend la réponse
  await client.disconnect();     // Attend la déconnexion
}
\`\`\`

Sans \`await\`, le code essaierait d'utiliser la réponse avant de l'avoir reçue, provoquant des erreurs.

### Gestion des erreurs avec try/catch

Les opérations avec la blockchain peuvent échouer : le noeud peut être hors service, le réseau lent, ou le code peut contenir une erreur. On utilise **try/catch** pour capturer ces erreurs de façon contrôlée :

\`\`\`
try {
  // Code qui peut échouer
  await client.connect();
} catch (error) {
  // S'exécute si quelque chose échoue
  console.error("Error:", error.message);
}
\`\`\`

**try** essaie d'exécuter le code. Si quelque chose échoue, le flux saute directement au bloc **catch**, où tu peux afficher l'erreur ou prendre une action alternative. Sans \`try/catch\`, une erreur arrêterait brutalement tout le programme.`,
      codeTitles: [
        "Exemple de package.json expliqué",
        "Script de base avec async/await et try/catch",
      ],
      slides: [
        {
          title: "Anatomie d'un projet Node.js",
          content: "package.json décrit le projet\nnode_modules/ contient les librairies\n.js contient ton code\n\nnpm install ajoute les dépendances\nnode fichier.js exécute un script",
        },
        {
          title: "require() et imports",
          content: "require(\"xahau\") charge la librairie Xahau\n\nOn récupère ensuite les outils utiles :\nClient, Wallet, xahToDrops...\n\nC'est la porte d'entrée vers le SDK.",
        },
        {
          title: "async/await et try/catch",
          content: "Les appels réseau prennent du temps\n\nawait attend la réponse\ntry/catch capture les erreurs\nfinally ferme proprement la connexion\n\nCette structure évite beaucoup de bugs.",
        },
      ],
    },
    m0l5: {
      title: "Exécuter et déboguer des scripts",
      theory: `Tôt ou tard, un script échoue : un paquet manque, une faute de frappe, un nœud ne répond pas. Cette leçon explique ce que Node.js fait de ton fichier, comment lire l'erreur qu'il affiche et ce que signifient les erreurs de ce cours.

### Exécuter un script

\`node fichier.js\` exécute un fichier en deux temps. D'abord, Node lit tout le fichier et vérifie qu'il s'agit de JavaScript valide. Ensuite, il l'exécute de haut en bas. Une erreur dans le premier temps arrête le script avant toute exécution : aucune de tes lignes \`console.log\` n'apparaît. Une erreur dans le second temps l'arrête à cet endroit, et les lignes affichées avant restent à l'écran.

Exécute les scripts depuis le dossier du projet, celui qui contient \`package.json\` et \`node_modules/\` :

\`\`\`
cd xahau-course
node debug-errors.js
\`\`\`

Deux choses dépendent de ce dossier. Node cherche \`debug-errors.js\` à partir du dossier où tu te trouves. Et \`require("xahau")\` cherche la bibliothèque dans \`node_modules/\`, en partant du dossier du script et en remontant.

### Lire une erreur

Quand un script échoue, Node affiche l'erreur et s'arrête. Par exemple :

\`\`\`
/Users/you/xahau-course/ledger.js:2
console.log(info.validated_ledger.seq);
                 ^

TypeError: Cannot read properties of undefined (reading 'validated_ledger')
    at Object.<anonymous> (/Users/you/xahau-course/ledger.js:2:18)
    at Module._compile (node:internal/modules/cjs/loader:1812:14)
    at Object..js (node:internal/modules/cjs/loader:1943:10)
\`\`\`

Lis-la dans cet ordre :

1. **La ligne d'erreur** : \`TypeError: Cannot read properties of undefined (reading 'validated_ledger')\`. Le type indique la nature du problème ; le message dit ce qui s'est passé. Ici, \`info\` vaut \`undefined\` et n'a donc pas de \`validated_ledger\`.
2. **L'emplacement**, en haut : le fichier et la ligne (\`ledger.js:2\`), la ligne de code et un \`^\` sous l'endroit où l'erreur s'est produite.
3. **La pile** : les lignes \`at\`, de la plus récente à la plus ancienne. Les lignes avec tes fichiers montrent le chemin qui a mené à l'erreur. Les lignes \`node:internal\` sont le code de Node lui-même : ignore-les.

Les types que tu verras le plus :

| Type | Quand | Cause habituelle |
|---|---|---|
| \`SyntaxError\` | Avant l'exécution | Le code n'est pas du JavaScript valide : une parenthèse manquante, \`await\` hors d'une fonction \`async\` |
| \`ReferenceError\` | Pendant l'exécution | Un nom qui n'existe pas : une faute de frappe, un \`require\` manquant |
| \`TypeError\` | Pendant l'exécution | Une valeur d'un autre genre, le plus souvent \`undefined\` là où le code attend un objet |
| \`XahaudError\` | Pendant l'exécution | Le nœud Xahau a répondu à la requête par une erreur |

### Les erreurs de ce cours

**Cannot find module 'xahau'**

\`\`\`
Error: Cannot find module 'xahau'
Require stack:
- /Users/you/Desktop/script.js
\`\`\`

Node n'a trouvé la bibliothèque dans aucun \`node_modules/\`, du dossier du script jusqu'à la racine. Soit elle n'est pas installée, soit le script est hors du projet. Lance \`npm install xahau\` dans le dossier du projet, et exécute le script depuis ce dossier.

**await is only valid in async functions**

\`\`\`
  await client.connect();
  ^^^^^

SyntaxError: await is only valid in async functions and the top level bodies of modules
\`\`\`

Les scripts du cours sont des fichiers CommonJS : ils chargent les bibliothèques avec \`require\`. Dans un fichier CommonJS, \`await\` ne fonctionne que dans une fonction marquée \`async\`. Écrit au niveau supérieur d'un fichier qui utilise \`require\`, Node donne un autre message pour la même cause :

\`\`\`
ReferenceError: Cannot determine intended module format because both 'require' and top-level await are present.
\`\`\`

Place le code dans une fonction \`async\` et appelle-la, comme le font tous les scripts du cours :

\`\`\`js
async function main() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();
  // ...
}

main();
\`\`\`

**missing ) after argument list** et autres erreurs de syntaxe

\`\`\`
console.log("Client:", typeof Client;
                              ^^^^^^

SyntaxError: missing ) after argument list
\`\`\`

Le \`^\` marque l'endroit où Node a remarqué le problème. L'erreur est là ou juste avant : ici, la \`)\` qui ferme \`console.log(\`. Cherche les parenthèses, accolades et guillemets ouverts et jamais fermés.

**Cannot read properties of undefined**

Le \`TypeError\` de l'exemple ci-dessus. Il apparaît souvent après une requête, quand la réponse n'a pas le champ que lit le code. Affiche la réponse entière pour voir ce qu'elle contient :

\`\`\`js
console.log("Response:", JSON.stringify(response.result, null, 2));
\`\`\`

**Account not found**

\`\`\`
XahaudError: Account not found.
\`\`\`

Cette erreur vient du nœud, pas de ton code : le compte n'existe pas dans le ledger. Un compte existe dès qu'il a reçu ses premiers XAH. Vérifie l'adresse, et vérifie le réseau : un compte du testnet n'existe pas sur le Mainnet. Sur le testnet, le faucet crée et approvisionne les comptes ([Module 3](?m=3&l=1)).

**ENOTFOUND, ETIMEDOUT, ECONNREFUSED**

\`\`\`
Error: getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
\`\`\`

La connexion a échoué avant toute requête. \`ENOTFOUND\` signifie que le nom d'hôte n'existe pas : vérifie l'URL. \`ETIMEDOUT\` et \`ECONNREFUSED\` signifient que l'hôte existe mais n'a pas répondu : vérifie ta connexion et ton pare-feu, ou essaie un autre nœud. Les URL du cours sont \`wss://xahau-test.net\` pour le testnet et \`wss://xahau.network\` pour le Mainnet.

### Voir ce que fait un script

\`console.log\` affiche une valeur à un endroit du script. Affiche une ligne avant et après chaque étape : quand un script s'arrête, la dernière ligne affichée indique l'étape atteinte. Deux formes aident avec les objets et les types :

- \`JSON.stringify(objet, null, 2)\` affiche un objet entier, indenté de 2 espaces.
- \`typeof valeur\` affiche le type : un \`"undefined"\` à la place d'un objet est à l'origine de la plupart des \`TypeError\`.

Une requête au réseau peut échouer pour des raisons extérieures à ton code. \`try/catch\` intercepte l'erreur, pour que le script dise ce qui a échoué et se termine proprement. Termine par \`client.disconnect()\` dans tous les cas : une connexion ouverte garde Node en marche, et le script ne se termine pas.

### Les exemples

\`debug-errors.js\` exécute chaque étape dans son propre \`try/catch\` et la numérote : un échec montre ainsi à quelle étape il s'est produit. Sortie sur le testnet :

\`\`\`
=== Débogage des erreurs dans Xahau ===
1. Bibliothèque xahau importée correctement
   Type de Client : function
2. Client créé pour : wss://xahau-test.net
3. Tentative de connexion...
   Connecté avec succès
4. Requête server_info...
5. Réponse reçue :
   Type : object
   Clés : [ 'info', 'native_currency_code' ]
   Réseau : 21338
   Ledger : 12663294
6. Déconnecté correctement
=== Fin du débogage ===
\`\`\`

\`Réseau : 21338\` est l'ID réseau du testnet de Xahau.

\`connectivity-test.js\` se connecte au testnet, au Mainnet et à une URL qui n'existe pas. La troisième connexion doit échouer : elle montre l'erreur obtenue avec une mauvaise URL. Sortie :

\`\`\`
=== Test de connectivité Xahau ===
Test : Xahau Testnet (wss://xahau-test.net)
Connecté - Ledger : 12663296

Test : Xahau Mainnet (wss://xahau.network)
Connecté - Ledger : 26093967

Test : Incorrect URL (wss://nodo-doesnt-exist.example.com)
Erreur : getaddrinfo ENOTFOUND nodo-doesnt-exist.example.com
=== Résumé ===
Si testnet et mainnet se connectent : ton environnement est prêt.
Si l'un échoue : vérifie ta connexion internet.
L'URL incorrecte DOIT échouer (c'est un test d'erreur).
\`\`\``,
      codeTitles: [
        "Script avec gestion d'erreurs et débogage",
        "Test de connectivité et erreurs courantes",
      ],
      slides: [
        {
          title: "Exécuter des scripts",
          content: "Commande de base :\nnode fichier.js\n\nPlace-toi dans le dossier du projet\nlà où se trouvent package.json et node_modules/\n\nExemple :\ncd xahau-course\nnode hello-xahau.js",
        },
        {
          title: `Lire une erreur`,
          content: `1. La ligne d'erreur → type + message
   TypeError: Cannot read properties of undefined

2. L'emplacement → fichier:ligne et ^

3. La pile → les lignes « at »
   Les tiennes comptent ; ignore node:internal

SyntaxError → avant l'exécution
TypeError, ReferenceError → pendant l'exécution`,
        },
        {
          title: `Les erreurs de ce cours`,
          content: `Cannot find module 'xahau'
  → npm install xahau, exécute depuis le projet

await is only valid in async functions
  → place le code dans une fonction async

Account not found
  → adresse ou réseau ; sur le testnet, l'approvisionner

ENOTFOUND / ETIMEDOUT
  → vérifie l'URL / la connexion`,
        },
      ],
    },
    m0l6: {
      title: "Stocker les clés en sécurité avec .env",
      theory: `Tout au long du cours, nous travaillerons avec des **seeds** (clés privées) de comptes Xahau. Il est essentiel d'apprendre dès le début à les stocker en sécurité, même sur testnet, pour construire de bonnes habitudes qui te protégeront sur mainnet.

### Pourquoi ne PAS mettre les clés directement dans le code ?

Imagine que tu as ceci dans ton script :

\`\`\`
const wallet = Wallet.fromSeed("sEdV9mHTYLPKPPPfBGB9xpGnFxsQo4r");
\`\`\`

C'est **très dangereux** pour plusieurs raisons :

- Si tu envoies ton code sur **GitHub** (ou un autre dépôt), n'importe qui peut voir ta clé privée et voler tes fonds
- Si tu partages le fichier avec quelqu'un (par email, chat, etc.), tu partages ta clé
- Les bots de GitHub **scannent les dépôts publics** à la recherche de clés privées exposées et volent les fonds automatiquement en quelques secondes
- Même si tu supprimes la clé par la suite, l'historique Git **la conserve** et elle reste accessible

### Qu'est-ce qu'un fichier .env ?

Un fichier \`.env\` (abréviation de "environment") est un fichier texte brut qui stocke des **variables d'environnement**, des configurations sensibles dont ton code a besoin mais qui ne doivent pas être dans le code source :

\`\`\`
WALLET_A_SEED=sEdVxxxYourTestnetSeed
WALLET_B_SEED=sEdYyyAnotherTestnetSeed
XAHAU_NODE=wss://xahau-test.net
\`\`\`

### Règles du fichier .env

- **Ne jamais envoyer .env sur Git** : ajoute-le toujours à \`.gitignore\`
- **Un .env par environnement** : tu peux en avoir un pour testnet et un autre pour mainnet
- **Pas de guillemets** (sauf si la valeur contient des espaces) : \`KEY=value\`
- **Pas d'espaces** autour du \`=\` : \`KEY=value\` (correct) vs \`KEY = value\` (incorrect)
- **Chaque variable sur sa propre ligne**

### Installer dotenv

La librairie \`dotenv\` lit le fichier \`.env\` et charge les variables dans \`process.env\` :

\`\`\`
npm install dotenv
\`\`\`

### Comment utiliser dotenv dans ton code

Au début de ton script, ajoute une seule ligne :

\`\`\`
require("dotenv").config();
\`\`\`

Cela charge toutes les variables du fichier \`.env\` dans l'objet \`process.env\`. Tu peux ensuite y accéder ainsi :

\`\`\`
const seed = process.env.WALLET_A_SEED;
const node = process.env.XAHAU_NODE;
\`\`\`

### Créer le fichier .gitignore

Le fichier \`.gitignore\` indique à Git quels fichiers **il ne doit pas suivre ni envoyer** vers le dépôt. Crée un fichier nommé \`.gitignore\` à la racine de ton projet avec ce contenu :

\`\`\`
.env
node_modules/
\`\`\`

Cela protège à la fois tes clés (\`.env\`) et les librairies téléchargées (\`node_modules/\`).

### Flux de travail recommandé

1. Crée ton fichier \`.env\` avec les clés
2. Crée ou mets à jour ton \`.gitignore\` pour exclure \`.env\`
3. Dans chaque script, charge dotenv au début : \`require("dotenv").config()\`
4. Accède aux clés avec \`process.env.VARIABLE_NAME\`
5. Si tu partages ton code, crée un fichier \`.env.example\` (sans valeurs réelles) pour que les autres sachent quelles variables sont nécessaires

### Implications de sécurité

- **Testnet** : si un seed de testnet fuite, tu ne perds pas d'argent réel, mais quelqu'un pourrait interférer avec tes tests
- **Mainnet** : si un seed de mainnet fuite, **tu peux perdre tous tes fonds de façon irréversible**. Il n'existe aucun moyen de récupérer des fonds volés sur une blockchain
- **Dépôts publics** : dès qu'un seed est envoyé sur un dépôt public, considère-le **compromis**. Déplace tes fonds vers un nouveau compte immédiatement
- **Historique Git** : même si tu supprimes le fichier, le seed reste dans l'historique. Tu devrais réécrire l'historique Git, ce qui est compliqué`,
      codeTitles: [
        "Créer le fichier .env",
        "Script qui utilise les variables d'environnement avec dotenv",
        "Exemple de .env.example à partager sans vraies clés",
      ],
      slides: [
        {
          title: "Pourquoi utiliser .env ?",
          content: "Ne mets jamais de clés privées dans le code\n\n• GitHub peut exposer l'historique\n• Des outils scannent les secrets\n• Partager le code ne doit pas partager les clés\n\nSolution : .env + .gitignore",
        },
        {
          title: "Comment utiliser dotenv",
          content: "1. npm install dotenv\n2. Crée .env avec tes clés\n3. Ajoute .env à .gitignore\n4. Dans le script : require(\"dotenv\").config()\n5. Lis : process.env.VARIABLE_NAME",
        },
        {
          title: "Bonnes pratiques",
          content: "• .env → vraies clés, jamais dans Git\n• .env.example → modèle sans secrets\n• .gitignore → exclut .env et node_modules/\n• N'affiche jamais un seed\n• Sur mainnet : seed exposé = fonds perdus",
        },
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
    });

    lesson.slides?.forEach((slide, index) => {
      slide.title.fr = translation.slides[index].title;
      slide.content.fr = translation.slides[index].content;
    });
  }
}

applyFrenchTranslations(moduleData);

// French and Arabic code: the English code, line by line, with its prose translated
deriveCodeTranslations(moduleData);

addNewWords(moduleData, 0);
addGlossaryLesson(moduleData);
export default moduleData;
