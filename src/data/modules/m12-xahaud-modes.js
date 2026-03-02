/**
 * Module 12 — Configuración de xahaud en distintos modos
 *
 * Cubre los diferentes modos de operación de un nodo xahaud:
 * nodo de seguimiento, validador, historia completa, solo envío y hub.
 */

export default {
  id: "m12",
  icon: "🖥️",
  title: {
    es: "Configuración de Nodos xahaud",
    en: "xahaud Node Configuration",
    jp: "",
  },
  lessons: [
    // ─────────────────────────────────────────────────────────────────────────
    // LECCIÓN 1 — Tipos de nodos
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "m12l1",
      title: {
        es: "Tipos de nodos en la red Xahau",
        en: "Node Types in the Xahau Network",
        jp: "",
      },
      theory: {
        es: `La red Xahau está formada por distintos tipos de nodos, cada uno con un rol específico. Entender qué modo necesitas antes de instalar xahaud es fundamental para dimensionar correctamente tu infraestructura.

### Nodo de seguimiento (Tracking / Stock node)
Es el tipo más común. Sincroniza el libro mayor, valida transacciones y permite consultar el estado de la red. No participa en el consenso. Ideal para aplicaciones, exploradores de bloques y desarrollo.

### Nodo validador
Participa activamente en el proceso de consenso de la red. Emite votos sobre qué transacciones son válidas. Requiere una clave de validador única y una UNL (Unique Node List) configurada. Exige alta disponibilidad y seguridad.

### Nodo de historia completa (Full History node)
Almacena **todo** el historial del libro mayor desde el génesis. Ocupa gran cantidad de espacio en disco (varios terabytes). Se usa para auditorías, análisis histórico y servicios de datos.

### Nodo de solo envío (Submission-only node)
Configurado sin historial de ledger (\`ledger_history=none\`). Solo reenvía transacciones al resto de la red. Ocupa muy poco disco. Útil como proxy para envío masivo de transacciones.

### Nodo hub
Es un nodo bien conectado que actúa como punto de relay entre otros nodos de la red. No almacena historial ni valida, pero mantiene muchas conexiones de peer. Mejora la resiliencia de la red.

### Resumen comparativo

| Tipo | Historial | Consenso | Disco | Uso típico |
|------|-----------|----------|-------|------------|
| Seguimiento | Parcial (256) | No | Bajo | APIs, desarrollo |
| Validador | Parcial | Sí | Bajo | Consenso |
| Historia completa | Total | No | Muy alto | Auditoría |
| Solo envío | Ninguno | No | Mínimo | Proxy de envío |
| Hub | Parcial | No | Bajo | Relay de red |`,
        en: `The Xahau network is made up of different node types, each with a specific role. Understanding which mode you need before installing xahaud is essential for properly sizing your infrastructure.

### Tracking / Stock Node
The most common type. Synchronizes the ledger, validates transactions, and allows querying network state. Does not participate in consensus. Ideal for applications, block explorers, and development.

### Validator Node
Actively participates in the network consensus process. Votes on which transactions are valid. Requires a unique validator key and a configured UNL (Unique Node List). Demands high availability and security.

### Full History Node
Stores **all** ledger history from genesis. Requires large disk space (several terabytes). Used for audits, historical analysis, and data services.

### Submission-Only Node
Configured with no ledger history (\`ledger_history=none\`). Only forwards transactions to the rest of the network. Uses very little disk. Useful as a proxy for bulk transaction submission.

### Hub Node
A well-connected node that acts as a relay point between other network nodes. Does not store history or validate, but maintains many peer connections. Improves network resilience.

### Comparison Table

| Type | History | Consensus | Disk | Typical Use |
|------|---------|-----------|------|-------------|
| Tracking | Partial (256) | No | Low | APIs, development |
| Validator | Partial | Yes | Low | Consensus |
| Full History | Full | No | Very high | Auditing |
| Submission-only | None | No | Minimal | Send proxy |
| Hub | Partial | No | Low | Network relay |`,
        jp: "",
      },
      codeBlocks: [],
      slides: [
        {
          title: {
            es: "Tipos de nodos xahaud",
            en: "xahaud Node Types",
            jp: "",
          },
          content: {
            es: "Nodos en la red Xahau\n\n• Seguimiento — APIs y desarrollo\n• Validador — Participa en consenso\n• Historia completa — Toda la cadena\n• Solo envío — Proxy de transacciones\n• Hub — Relay de red",
            en: "Nodes in the Xahau network\n\n• Tracking — APIs and development\n• Validator — Participates in consensus\n• Full history — Entire chain\n• Submission-only — Transaction proxy\n• Hub — Network relay",
            jp: "",
          },
          visual: "🌐",
        },
        {
          title: {
            es: "¿Qué nodo necesitas?",
            en: "Which node do you need?",
            jp: "",
          },
          content: {
            es: "Elige según tu caso de uso\n\n• Desarrollo / dApp → Seguimiento\n• Participar en red → Validador\n• Datos históricos → Historia completa\n• Envío masivo → Solo envío\n• Mejorar la red → Hub",
            en: "Choose based on your use case\n\n• Development / dApp → Tracking\n• Participate in network → Validator\n• Historical data → Full history\n• Bulk sending → Submission-only\n• Improve network → Hub",
            jp: "",
          },
          visual: "🎯",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // LECCIÓN 2 — Instalación de xahaud
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "m12l2",
      title: {
        es: "Instalación de xahaud",
        en: "Installing xahaud",
        jp: "",
      },
      theory: {
        es: `xahaud es el daemon del nodo Xahau, equivalente a \`rippled\` en XRPL. Se distribuye como paquete \`.deb\` para sistemas Debian/Ubuntu y como paquete \`.rpm\` para sistemas basados en Red Hat.

### Requisitos mínimos (nodo de seguimiento)
- CPU: 4 núcleos (8 recomendados)
- RAM: 16 GB (32 GB recomendados para validadores)
- Disco: 500 GB SSD NVMe (historia completa requiere ≥ 4 TB)
- Red: 100 Mbps, IP pública estática
- OS: Ubuntu 22.04 LTS o Debian 11+

### Directorios principales
Después de instalar el paquete, los archivos se ubican en:
- \`/opt/xahau/\` — binarios del nodo
- \`/etc/opt/xahau/\` — archivos de configuración (\`xahaud.cfg\`, \`validators.txt\`)
- \`/var/lib/xahaud/\` — datos del libro mayor (NuDB)
- \`/var/log/xahaud/\` — logs

### Servicio systemd
xahaud se integra con systemd para arrancar automáticamente con el sistema. Los comandos habituales son:
- \`systemctl start xahaud\`
- \`systemctl stop xahaud\`
- \`systemctl status xahaud\`
- \`journalctl -fu xahaud\` — ver logs en tiempo real

### Archivo de configuración principal
Toda la configuración del nodo vive en \`/etc/opt/xahau/xahaud.cfg\`. Este archivo controla: conexiones de red, tipo de base de datos, historial de ledgers, peers, modo SSL y, si aplica, la clave de validador.`,
        en: `xahaud is the Xahau node daemon, equivalent to \`rippled\` on XRPL. It is distributed as a \`.deb\` package for Debian/Ubuntu systems and as a \`.rpm\` package for Red Hat-based systems.

### Minimum Requirements (tracking node)
- CPU: 4 cores (8 recommended)
- RAM: 16 GB (32 GB recommended for validators)
- Disk: 500 GB NVMe SSD (full history requires ≥ 4 TB)
- Network: 100 Mbps, static public IP
- OS: Ubuntu 22.04 LTS or Debian 11+

### Main Directories
After installing the package, files are located at:
- \`/opt/xahau/\` — node binaries
- \`/etc/opt/xahau/\` — config files (\`xahaud.cfg\`, \`validators.txt\`)
- \`/var/lib/xahaud/\` — ledger data (NuDB)
- \`/var/log/xahaud/\` — logs

### systemd Service
xahaud integrates with systemd to start automatically with the system. Common commands:
- \`systemctl start xahaud\`
- \`systemctl stop xahaud\`
- \`systemctl status xahaud\`
- \`journalctl -fu xahaud\` — view logs in real time

### Main Configuration File
All node configuration lives in \`/etc/opt/xahau/xahaud.cfg\`. This file controls: network connections, database type, ledger history, peers, SSL mode and, if applicable, the validator key.`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Instalación del paquete xahaud (Ubuntu/Debian)",
            en: "Installing xahaud package (Ubuntu/Debian)",
            jp: "",
          },
          language: "bash",
          code: {
            es: `# Agregar el repositorio oficial de Xahau
curl -s https://packagecloud.io/install/repositories/xahau/xahaud/script.deb.sh | sudo bash

# Instalar xahaud
sudo apt-get install xahaud

# Verificar la instalación
xahaud --version

# Habilitar el servicio para que arranque automáticamente
sudo systemctl enable xahaud

# Iniciar el servicio
sudo systemctl start xahaud

# Ver el estado del servicio
sudo systemctl status xahaud

# Ver logs en tiempo real
sudo journalctl -fu xahaud`,
            en: `# Add the official Xahau repository
curl -s https://packagecloud.io/install/repositories/xahau/xahaud/script.deb.sh | sudo bash

# Install xahaud
sudo apt-get install xahaud

# Verify installation
xahaud --version

# Enable the service to start automatically
sudo systemctl enable xahaud

# Start the service
sudo systemctl start xahaud

# View service status
sudo systemctl status xahaud

# View logs in real time
sudo journalctl -fu xahaud`,
            jp: "",
          },
        },
        {
          title: {
            es: "Directorios y archivos importantes",
            en: "Important directories and files",
            jp: "",
          },
          language: "bash",
          code: {
            es: `# Binarios del nodo
ls /opt/xahau/bin/

# Archivos de configuración
ls /etc/opt/xahau/
# xahaud.cfg  — configuración principal
# validators.txt — lista de validadores de confianza (UNL)

# Base de datos del libro mayor (NuDB)
ls /var/lib/xahaud/db/

# Logs del nodo
ls /var/log/xahaud/

# Consultar el estado actual del nodo (debe estar corriendo)
/opt/xahau/bin/xahaud server_info | grep -E "server_state|complete_ledgers|peers"`,
            en: `# Node binaries
ls /opt/xahau/bin/

# Configuration files
ls /etc/opt/xahau/
# xahaud.cfg  — main configuration
# validators.txt — trusted validator list (UNL)

# Ledger database (NuDB)
ls /var/lib/xahaud/db/

# Node logs
ls /var/log/xahaud/

# Query current node status (must be running)
/opt/xahau/bin/xahaud server_info | grep -E "server_state|complete_ledgers|peers"`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: {
            es: "Instalación de xahaud",
            en: "Installing xahaud",
            jp: "",
          },
          content: {
            es: "Pasos de instalación\n\n• Agregar repositorio oficial\n• apt-get install xahaud\n• systemctl enable xahaud\n• Editar /etc/opt/xahau/xahaud.cfg\n• systemctl start xahaud",
            en: "Installation steps\n\n• Add official repository\n• apt-get install xahaud\n• systemctl enable xahaud\n• Edit /etc/opt/xahau/xahaud.cfg\n• systemctl start xahaud",
            jp: "",
          },
          visual: "📦",
        },
        {
          title: {
            es: "Requisitos mínimos",
            en: "Minimum Requirements",
            jp: "",
          },
          content: {
            es: "Hardware recomendado\n\n• CPU: 4-8 núcleos\n• RAM: 16-32 GB\n• Disco: 500 GB NVMe SSD\n• Red: 100 Mbps + IP pública\n• OS: Ubuntu 22.04 LTS",
            en: "Recommended hardware\n\n• CPU: 4-8 cores\n• RAM: 16-32 GB\n• Disk: 500 GB NVMe SSD\n• Network: 100 Mbps + public IP\n• OS: Ubuntu 22.04 LTS",
            jp: "",
          },
          visual: "🖥️",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // LECCIÓN 3 — Nodo de seguimiento
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "m12l3",
      title: {
        es: "Nodo de seguimiento (Tracking node)",
        en: "Tracking Node",
        jp: "",
      },
      theory: {
        es: `El nodo de seguimiento (también llamado *stock node*) es la configuración base de xahaud. Sincroniza el libro mayor y permite consultar transacciones y cuentas, pero no participa en el consenso de la red.

### Configuración del archivo xahaud.cfg
El archivo de configuración se divide en secciones delimitadas por corchetes \`[section]\`. Las secciones más importantes para un nodo de seguimiento son:

- **[server]** — Puertos que escucha el nodo (WebSocket, RPC, peer)
- **[network_id]** — Identifica la red: \`21337\` para mainnet, \`21338\` para testnet
- **[node_db]** — Tipo y ubicación de la base de datos NuDB
- **[ledger_history]** — Cuántos ledgers históricos conservar (por defecto \`256\`)
- **[validators_file]** — Ruta al archivo con la UNL de validadores de confianza
- **[peer_private]** — Si es \`1\`, oculta la IP del nodo a otros peers (recomendado para validadores)

### Testnet vs Mainnet
La única diferencia de configuración entre testnet y mainnet es el \`network_id\` y la lista de peers/validadores. En testnet se usan los peers y validadores oficiales de la red de prueba de Xahau.

### ledger_history
- \`256\` — valor por defecto, suficiente para la mayoría de aplicaciones
- \`16384\` — conserva ~2 semanas de historia
- \`full\` — historia completa desde el génesis (requiere terabytes)
- \`none\` — sin historial (modo solo envío)`,
        en: `The tracking node (also called *stock node*) is the base xahaud configuration. It synchronizes the ledger and allows querying transactions and accounts, but does not participate in network consensus.

### Configuring xahaud.cfg
The configuration file is divided into sections delimited by brackets \`[section]\`. The most important sections for a tracking node are:

- **[server]** — Ports the node listens on (WebSocket, RPC, peer)
- **[network_id]** — Identifies the network: \`21337\` for mainnet, \`21338\` for testnet
- **[node_db]** — NuDB database type and location
- **[ledger_history]** — How many historical ledgers to keep (default \`256\`)
- **[validators_file]** — Path to the file with the trusted validator UNL
- **[peer_private]** — If \`1\`, hides the node's IP from other peers (recommended for validators)

### Testnet vs Mainnet
The only configuration difference between testnet and mainnet is the \`network_id\` and the list of peers/validators. Testnet uses the official Xahau test network peers and validators.

### ledger_history
- \`256\` — default value, sufficient for most applications
- \`16384\` — keeps ~2 weeks of history
- \`full\` — complete history from genesis (requires terabytes)
- \`none\` — no history (submission-only mode)`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "xahaud.cfg — Nodo de seguimiento en mainnet",
            en: "xahaud.cfg — Tracking node on mainnet",
            jp: "",
          },
          language: "bash",
          code: {
            es: `# /etc/opt/xahau/xahaud.cfg
# Configuración básica de nodo de seguimiento — Mainnet Xahau (network_id 21337)

[server]
port_rpc_admin_local
port_peer
port_ws_public

[port_rpc_admin_local]
port = 5005
ip = 127.0.0.1
admin = 127.0.0.1
protocol = http

[port_peer]
port = 21337
ip = 0.0.0.0
protocol = peer

[port_ws_public]
port = 6006
ip = 0.0.0.0
protocol = ws,wss

[node_size]
# tiny | small | medium | large | huge
medium

[network_id]
# 21337 = Xahau Mainnet
# 21338 = Xahau Testnet
21337

[node_db]
type = NuDB
path = /var/lib/xahaud/db/nudb
advisory_delete = 0

[database_path]
/var/lib/xahaud/db

[debug_logfile]
/var/log/xahaud/debug.log

[sntp_servers]
time.windows.com
time.apple.com
pool.ntp.org

[ledger_history]
# Cantidad de ledgers históricos a mantener
# 256 = valor por defecto (recomendado para nodo de seguimiento)
256

[validators_file]
/etc/opt/xahau/validators.txt

[rpc_startup]
{ "command": "log_level", "severity": "warn" }`,
            en: `# /etc/opt/xahau/xahaud.cfg
# Basic tracking node configuration — Xahau Mainnet (network_id 21337)

[server]
port_rpc_admin_local
port_peer
port_ws_public

[port_rpc_admin_local]
port = 5005
ip = 127.0.0.1
admin = 127.0.0.1
protocol = http

[port_peer]
port = 21337
ip = 0.0.0.0
protocol = peer

[port_ws_public]
port = 6006
ip = 0.0.0.0
protocol = ws,wss

[node_size]
# tiny | small | medium | large | huge
medium

[network_id]
# 21337 = Xahau Mainnet
# 21338 = Xahau Testnet
21337

[node_db]
type = NuDB
path = /var/lib/xahaud/db/nudb
advisory_delete = 0

[database_path]
/var/lib/xahaud/db

[debug_logfile]
/var/log/xahaud/debug.log

[sntp_servers]
time.windows.com
time.apple.com
pool.ntp.org

[ledger_history]
# Number of historical ledgers to keep
# 256 = default (recommended for tracking node)
256

[validators_file]
/etc/opt/xahau/validators.txt

[rpc_startup]
{ "command": "log_level", "severity": "warn" }`,
            jp: "",
          },
        },
        {
          title: {
            es: "validators.txt — UNL para mainnet de Xahau",
            en: "validators.txt — UNL for Xahau mainnet",
            jp: "",
          },
          language: "bash",
          code: {
            es: `# /etc/opt/xahau/validators.txt
# Lista de validadores de confianza (UNL) para Xahau Mainnet
# Fuente oficial: https://vl.xahau.org

[validator_list_sites]
https://vl.xahau.org

[validator_list_keys]
# Clave pública de la lista oficial de validadores de Xahau
ED264807102805220DA0F312E71FC2C69E1552C9C5790F6C25E3729DEB573D5860`,
            en: `# /etc/opt/xahau/validators.txt
# Trusted validator list (UNL) for Xahau Mainnet
# Official source: https://vl.xahau.org

[validator_list_sites]
https://vl.xahau.org

[validator_list_keys]
# Public key of the official Xahau validator list
ED264807102805220DA0F312E71FC2C69E1552C9C5790F6C25E3729DEB573D5860`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: {
            es: "Nodo de seguimiento",
            en: "Tracking Node",
            jp: "",
          },
          content: {
            es: "Stock node — configuración base\n\n• Sincroniza el libro mayor\n• No participa en consenso\n• Sirve APIs WebSocket y RPC\n• ledger_history = 256\n• Ideal para desarrollo y dApps",
            en: "Stock node — base configuration\n\n• Synchronizes the ledger\n• Does not participate in consensus\n• Serves WebSocket and RPC APIs\n• ledger_history = 256\n• Ideal for development and dApps",
            jp: "",
          },
          visual: "📡",
        },
        {
          title: {
            es: "Mainnet vs Testnet",
            en: "Mainnet vs Testnet",
            jp: "",
          },
          content: {
            es: "Diferencia de configuración\n\n• Mainnet: network_id = 21337\n• Testnet: network_id = 21338\n• Peers y validadores distintos\n• Misma estructura de cfg\n• Mismos comandos systemctl",
            en: "Configuration difference\n\n• Mainnet: network_id = 21337\n• Testnet: network_id = 21338\n• Different peers and validators\n• Same cfg structure\n• Same systemctl commands",
            jp: "",
          },
          visual: "🔀",
        },
        {
          title: {
            es: "Opciones de ledger_history",
            en: "ledger_history Options",
            jp: "",
          },
          content: {
            es: "Controla cuánto historial guardar\n\n• 256 — Por defecto (~15 min)\n• 16384 — ~2 semanas\n• full — Desde el génesis\n• none — Sin historial",
            en: "Controls how much history to keep\n\n• 256 — Default (~15 min)\n• 16384 — ~2 weeks\n• full — From genesis\n• none — No history",
            jp: "",
          },
          visual: "📚",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // LECCIÓN 4 — Nodo validador
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "m12l4",
      title: {
        es: "Nodo validador",
        en: "Validator Node",
        jp: "",
      },
      theory: {
        es: `Un nodo validador participa activamente en el proceso de consenso de Xahau. Para operar como validador se requiere:

1. Generar un par de claves de validador único
2. Publicar tu clave pública para que otros la incluyan en su UNL
3. Configurar el \`validator_token\` en \`xahaud.cfg\`
4. Mantener el nodo con alta disponibilidad (≥ 99.5 % de uptime)

### Generación de claves con validator-keys
La herramienta \`validator-keys\` se instala junto con xahaud. Genera un par de claves criptográficas (pública/privada) y crea un *token* que se pega en el archivo de configuración. **La clave privada nunca se copia al servidor**; solo el token cifrado.

### Token de validador
El \`validator_token\` es una cadena cifrada que contiene la clave de sesión del validador. Se regenera periódicamente (se recomienda rotar cada cierto tiempo) sin cambiar la clave pública, lo que permite rotar el token sin perder la identidad del validador.

### Buenas prácticas de seguridad
- Genera las claves en un equipo **offline** o air-gapped
- Guarda la clave privada en un lugar seguro (no en el servidor)
- Usa \`peer_private=1\` para no exponer la IP del validador a toda la red
- Configura firewall: solo permite el puerto peer (21337) desde IPs de confianza
- Monitoriza el uptime y las omisiones de validación

### ¿Debo operar un validador?
Operar un validador es un compromiso serio. Si el validador tiene caídas frecuentes, perjudica la salud de la red. Solo deberías operarlo si puedes garantizar alta disponibilidad y tienes experiencia en administración de sistemas.`,
        en: `A validator node actively participates in the Xahau consensus process. To operate as a validator you need to:

1. Generate a unique validator key pair
2. Publish your public key so others can include it in their UNL
3. Configure the \`validator_token\` in \`xahaud.cfg\`
4. Maintain the node with high availability (≥ 99.5% uptime)

### Key Generation with validator-keys
The \`validator-keys\` tool is installed alongside xahaud. It generates a cryptographic key pair (public/private) and creates a *token* that is pasted into the configuration file. **The private key is never copied to the server**; only the encrypted token is.

### Validator Token
The \`validator_token\` is an encrypted string containing the validator's session key. It is regenerated periodically (rotation is recommended) without changing the public key, allowing you to rotate the token without losing the validator's identity.

### Security Best Practices
- Generate keys on an **offline** or air-gapped machine
- Store the private key in a secure location (not on the server)
- Use \`peer_private=1\` to avoid exposing the validator's IP to the entire network
- Configure firewall: only allow the peer port (21337) from trusted IPs
- Monitor uptime and validation misses

### Should I Run a Validator?
Running a validator is a serious commitment. If the validator has frequent downtime, it harms network health. You should only run one if you can guarantee high availability and have system administration experience.`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Generar claves de validador con validator-keys",
            en: "Generate validator keys with validator-keys",
            jp: "",
          },
          language: "bash",
          code: {
            es: `# PASO 1: Generar las claves del validador
# Ejecutar esto en un equipo OFFLINE o air-gapped, NO en el servidor
validator-keys create_keys

# Salida de ejemplo:
# Validator keys stored in /home/user/.ripple/validator-keys.json
# This file should be stored securely and not shared.

# La clave pública es la que publicas para que otros te añadan a su UNL
# Ejemplo de clave pública:
# nHUon2tpyJEHHYGmxqeGu37cvPYHzrMtUNQFVdCgGNvEkjmCpTqK

# PASO 2: Crear el token de validador (se hace en el equipo offline)
# Requiere la clave maestra almacenada en validator-keys.json
validator-keys create_token --keyfile /home/user/.ripple/validator-keys.json

# Salida de ejemplo:
# [validator_token]
# eyJ2YWxpZGF0aW9uX3ByaXZhdGVfa2V5IjoiMDA3Nm...
# (cadena base64 larga)

# PASO 3: Copiar SOLO el token al servidor (nunca la clave privada)
# Pegar el bloque [validator_token] en /etc/opt/xahau/xahaud.cfg`,
            en: `# STEP 1: Generate validator keys
# Run this on an OFFLINE or air-gapped machine, NOT on the server
validator-keys create_keys

# Example output:
# Validator keys stored in /home/user/.ripple/validator-keys.json
# This file should be stored securely and not shared.

# The public key is what you publish so others can add you to their UNL
# Example public key:
# nHUon2tpyJEHHYGmxqeGu37cvPYHzrMtUNQFVdCgGNvEkjmCpTqK

# STEP 2: Create the validator token (done on the offline machine)
# Requires the master key stored in validator-keys.json
validator-keys create_token --keyfile /home/user/.ripple/validator-keys.json

# Example output:
# [validator_token]
# eyJ2YWxpZGF0aW9uX3ByaXZhdGVfa2V5IjoiMDA3Nm...
# (long base64 string)

# STEP 3: Copy ONLY the token to the server (never the private key)
# Paste the [validator_token] block into /etc/opt/xahau/xahaud.cfg`,
            jp: "",
          },
        },
        {
          title: {
            es: "xahaud.cfg — Configuración de validador",
            en: "xahaud.cfg — Validator configuration",
            jp: "",
          },
          language: "bash",
          code: {
            es: `# /etc/opt/xahau/xahaud.cfg
# Configuración de nodo validador — añadir al cfg base de seguimiento

# Ocultar la IP del validador a otros peers de la red
[peer_private]
1

# Token de validador (generado con validator-keys create_token)
# NUNCA compartas ni expongas este token
[validator_token]
eyJ2YWxpZGF0aW9uX3ByaXZhdGVfa2V5IjoiMDA3NmVkODZmZTQ2ZTM4YTVlY2Zl
YjE5NTgwNjhiMGNkYzRmYWUzYjJiZjQwN2E5YTZkNjQ2MjQxM2M3YjZiMzZkYzBl
ODE5ZGI5MjJkZGZhZWY4NjQxMmE0MzUifQ==

# Historial de ledgers (un validador no necesita historia completa)
[ledger_history]
256

# Puerto peer — los validadores solo deben aceptar peers de confianza
[port_peer]
port = 21337
ip = 0.0.0.0
protocol = peer

# Lista de peers fijos de confianza (otros validadores del cluster)
[fixed_ips]
# peer-validador-1.ejemplo.com 21337
# peer-validador-2.ejemplo.com 21337`,
            en: `# /etc/opt/xahau/xahaud.cfg
# Validator node configuration — add to the base tracking cfg

# Hide the validator's IP from other network peers
[peer_private]
1

# Validator token (generated with validator-keys create_token)
# NEVER share or expose this token
[validator_token]
eyJ2YWxpZGF0aW9uX3ByaXZhdGVfa2V5IjoiMDA3NmVkODZmZTQ2ZTM4YTVlY2Zl
YjE5NTgwNjhiMGNkYzRmYWUzYjJiZjQwN2E5YTZkNjQ2MjQxM2M3YjZiMzZkYzBl
ODE5ZGI5MjJkZGZhZWY4NjQxMmE0MzUifQ==

# Ledger history (a validator does not need full history)
[ledger_history]
256

# Peer port — validators should only accept trusted peers
[port_peer]
port = 21337
ip = 0.0.0.0
protocol = peer

# Fixed trusted peers (other validators in the cluster)
[fixed_ips]
# trusted-validator-1.example.com 21337
# trusted-validator-2.example.com 21337`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: {
            es: "Nodo validador",
            en: "Validator Node",
            jp: "",
          },
          content: {
            es: "Participa en el consenso\n\n• Genera claves con validator-keys\n• Clave privada → nunca en el servidor\n• validator_token en xahaud.cfg\n• peer_private = 1 por seguridad\n• Requiere alta disponibilidad",
            en: "Participates in consensus\n\n• Generate keys with validator-keys\n• Private key → never on the server\n• validator_token in xahaud.cfg\n• peer_private = 1 for security\n• Requires high availability",
            jp: "",
          },
          visual: "🔐",
        },
        {
          title: {
            es: "Seguridad del validador",
            en: "Validator Security",
            jp: "",
          },
          content: {
            es: "Buenas prácticas\n\n• Generar claves offline (air-gapped)\n• Guardar clave privada de forma segura\n• Rotar el token periódicamente\n• Firewall: solo peers de confianza\n• Monitorizar uptime continuamente",
            en: "Best practices\n\n• Generate keys offline (air-gapped)\n• Store private key securely\n• Rotate token periodically\n• Firewall: only trusted peers\n• Monitor uptime continuously",
            jp: "",
          },
          visual: "🛡️",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // LECCIÓN 5 — Nodo de historia completa
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "m12l5",
      title: {
        es: "Nodo de historia completa (Full History)",
        en: "Full History Node",
        jp: "",
      },
      theory: {
        es: `Un nodo de historia completa almacena **todos los ledgers** desde el bloque génesis. Es el tipo de nodo más costoso en términos de almacenamiento, pero es indispensable para:

- Servicios de exploración de bloques
- Auditorías y cumplimiento regulatorio
- Análisis histórico de transacciones y cuentas
- Herramientas de análisis de datos on-chain

### Requisitos de almacenamiento
La historia completa de Xahau requiere varios terabytes de almacenamiento NVMe. El tamaño crece con el tiempo. Se recomienda:
- Discos NVMe de alta velocidad (lectura/escritura >3 GB/s)
- RAID o almacenamiento redundante para evitar pérdida de datos
- Monitorización de espacio en disco

### online_delete
Cuando \`ledger_history\` es \`full\`, la opción \`online_delete\` debe estar **desactivada** o comentada para evitar que el nodo elimine ledgers antiguos. Si \`online_delete\` está activo, borra ledgers por encima del límite configurado.

### Snapshots y arranque rápido
Sincronizar un nodo de historia completa desde cero puede tardar días o semanas. Se recomienda usar *snapshots* (copias del estado de la base de datos) proporcionados por operadores de la red para reducir el tiempo de sincronización inicial.

### Acceso público
Los nodos de historia completa suelen ofrecer acceso WebSocket público para que exploradores y aplicaciones puedan consultar ledgers históricos. Considera implementar rate-limiting y autenticación si expones el endpoint.`,
        en: `A full history node stores **all ledgers** from the genesis block. It is the most storage-intensive node type, but is essential for:

- Block explorer services
- Audits and regulatory compliance
- Historical transaction and account analysis
- On-chain data analytics tools

### Storage Requirements
The full history of Xahau requires several terabytes of NVMe storage. The size grows over time. Recommended:
- High-speed NVMe drives (read/write >3 GB/s)
- RAID or redundant storage to prevent data loss
- Disk space monitoring

### online_delete
When \`ledger_history\` is \`full\`, the \`online_delete\` option must be **disabled** or commented out to prevent the node from deleting old ledgers. If \`online_delete\` is active, it deletes ledgers beyond the configured limit.

### Snapshots and Fast Bootstrap
Syncing a full history node from scratch can take days or weeks. It is recommended to use *snapshots* (database state copies) provided by network operators to reduce initial sync time.

### Public Access
Full history nodes typically offer public WebSocket access so explorers and applications can query historical ledgers. Consider implementing rate-limiting and authentication if you expose the endpoint.`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "xahaud.cfg — Nodo de historia completa",
            en: "xahaud.cfg — Full history node",
            jp: "",
          },
          language: "bash",
          code: {
            es: `# /etc/opt/xahau/xahaud.cfg
# Configuración de nodo de historia completa

# Historia completa desde el génesis
[ledger_history]
full

# Base de datos NuDB — desactivar online_delete para no borrar ledgers
[node_db]
type = NuDB
path = /var/lib/xahaud/db/nudb
advisory_delete = 0
# online_delete — NO configurar o dejar comentado para historia completa
# online_delete = 256

# Servidor con soporte WebSocket público para consultas históricas
[server]
port_rpc_admin_local
port_peer
port_ws_public

[port_ws_public]
port = 6006
ip = 0.0.0.0
protocol = ws,wss

# Tamaño del nodo: large o huge para historia completa
[node_size]
large

# ID de red
[network_id]
21337`,
            en: `# /etc/opt/xahau/xahaud.cfg
# Full history node configuration

# Full history from genesis
[ledger_history]
full

# NuDB database — disable online_delete to avoid deleting ledgers
[node_db]
type = NuDB
path = /var/lib/xahaud/db/nudb
advisory_delete = 0
# online_delete — do NOT configure or leave commented for full history
# online_delete = 256

# Server with public WebSocket support for historical queries
[server]
port_rpc_admin_local
port_peer
port_ws_public

[port_ws_public]
port = 6006
ip = 0.0.0.0
protocol = ws,wss

# Node size: large or huge for full history
[node_size]
large

# Network ID
[network_id]
21337`,
            jp: "",
          },
        },
        {
          title: {
            es: "Verificar la historia almacenada y estado de sincronización",
            en: "Check stored history and sync status",
            jp: "",
          },
          language: "bash",
          code: {
            es: `# Consultar el estado del servidor y los ledgers disponibles
/opt/xahau/bin/xahaud server_info | python3 -m json.tool | grep -A5 "complete_ledgers"

# Salida esperada cuando está sincronizando:
# "complete_ledgers": "32570-84022"

# Salida esperada cuando tiene historia completa:
# "complete_ledgers": "32570-14500000"

# Ver cuánto disco está usando la base de datos
du -sh /var/lib/xahaud/db/

# Monitorear el espacio disponible en disco
df -h /var/lib/xahaud/

# Ver el ledger más antiguo disponible
/opt/xahau/bin/xahaud ledger 32570 --full | grep -i "ledger_index"`,
            en: `# Query server status and available ledgers
/opt/xahau/bin/xahaud server_info | python3 -m json.tool | grep -A5 "complete_ledgers"

# Expected output while syncing:
# "complete_ledgers": "32570-84022"

# Expected output with full history:
# "complete_ledgers": "32570-14500000"

# See how much disk the database is using
du -sh /var/lib/xahaud/db/

# Monitor available disk space
df -h /var/lib/xahaud/

# View the oldest available ledger
/opt/xahau/bin/xahaud ledger 32570 --full | grep -i "ledger_index"`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: {
            es: "Nodo de historia completa",
            en: "Full History Node",
            jp: "",
          },
          content: {
            es: "Almacena todos los ledgers\n\n• ledger_history = full\n• online_delete desactivado\n• Requiere terabytes de NVMe\n• Ideal para exploradores\n• Sincronización inicial lenta",
            en: "Stores all ledgers\n\n• ledger_history = full\n• online_delete disabled\n• Requires terabytes of NVMe\n• Ideal for block explorers\n• Slow initial sync",
            jp: "",
          },
          visual: "🗄️",
        },
        {
          title: {
            es: "Arrancando con un snapshot",
            en: "Bootstrapping with a Snapshot",
            jp: "",
          },
          content: {
            es: "Acelerar la sincronización\n\n• Descarga snapshot de la red\n• Extrae en /var/lib/xahaud/db/\n• El nodo continúa desde ahí\n• Evita días de sincronización\n• Verifica integridad con hash",
            en: "Speed up synchronization\n\n• Download snapshot from network\n• Extract to /var/lib/xahaud/db/\n• Node continues from there\n• Avoids days of syncing\n• Verify integrity with hash",
            jp: "",
          },
          visual: "⚡",
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // LECCIÓN 6 — Nodo de solo envío y nodo hub
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: "m12l6",
      title: {
        es: "Nodo de solo envío y nodo hub",
        en: "Submission-Only and Hub Node",
        jp: "",
      },
      theory: {
        es: `### Nodo de solo envío (Submission-only)
Es un nodo xahaud configurado sin historial de ledger (\`ledger_history=none\`). Su único propósito es **recibir transacciones y reenviarlas a la red**. No almacena datos históricos ni sirve consultas de cuentas o ledgers pasados.

**Casos de uso:**
- Pasarelas de pago que solo necesitan enviar transacciones
- Sistemas de alto volumen donde el disco es un cuello de botella
- Proxy interno para firmar y enviar transacciones desde aplicaciones

**Ventajas:**
- Disco mínimo (solo el ledger actual en memoria)
- Menor carga de CPU y RAM
- Arranque casi instantáneo tras reinicio

**Limitaciones:**
- No puede responder a consultas históricas
- Necesita conexión a al menos un nodo de seguimiento o historia completa para funcionar

---

### Nodo hub
Un nodo hub es un nodo bien conectado que actúa como **punto de relay** entre otros nodos de la red. No valida ni almacena historia, pero mantiene un gran número de conexiones de peer simultáneas.

**Características:**
- Alto número de conexiones peer (\`peers_max\`)
- Buena conectividad de red (ancho de banda alto)
- Útil para mejorar la propagación de mensajes en la red
- Se usa en infraestructuras de red críticas

**Diferencia respecto al nodo de seguimiento:**
El nodo hub está optimizado para relay de mensajes y conexiones peer, mientras que el nodo de seguimiento está optimizado para servir consultas de API.`,
        en: `### Submission-Only Node
A xahaud node configured with no ledger history (\`ledger_history=none\`). Its only purpose is to **receive transactions and forward them to the network**. It does not store historical data or serve queries for past accounts or ledgers.

**Use cases:**
- Payment gateways that only need to submit transactions
- High-volume systems where disk is a bottleneck
- Internal proxy for signing and submitting transactions from applications

**Advantages:**
- Minimal disk (only current ledger in memory)
- Lower CPU and RAM load
- Near-instant startup after restart

**Limitations:**
- Cannot answer historical queries
- Needs connection to at least one tracking or full history node to work

---

### Hub Node
A hub node is a well-connected node that acts as a **relay point** between other network nodes. It neither validates nor stores history, but maintains a large number of simultaneous peer connections.

**Characteristics:**
- High number of peer connections (\`peers_max\`)
- Good network connectivity (high bandwidth)
- Useful for improving message propagation in the network
- Used in critical network infrastructure

**Difference from tracking node:**
The hub node is optimized for message relay and peer connections, while the tracking node is optimized for serving API queries.`,
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "xahaud.cfg — Nodo de solo envío",
            en: "xahaud.cfg — Submission-only node",
            jp: "",
          },
          language: "bash",
          code: {
            es: `# /etc/opt/xahau/xahaud.cfg
# Configuración de nodo de solo envío (Submission-only)

[server]
port_rpc_admin_local
port_peer
port_ws_local

[port_rpc_admin_local]
port = 5005
ip = 127.0.0.1
admin = 127.0.0.1
protocol = http

[port_ws_local]
# Solo WebSocket local — no exponer al exterior
port = 6006
ip = 127.0.0.1
protocol = ws

[port_peer]
port = 21337
ip = 0.0.0.0
protocol = peer

[node_size]
small

[network_id]
21337

[node_db]
type = NuDB
path = /var/lib/xahaud/db/nudb
advisory_delete = 0

[database_path]
/var/lib/xahaud/db

[debug_logfile]
/var/log/xahaud/debug.log

[sntp_servers]
pool.ntp.org

# Sin historial de ledgers — solo reenvía transacciones
[ledger_history]
none

[validators_file]
/etc/opt/xahau/validators.txt

# Peers fijos: conectar a nodos de seguimiento de confianza
[fixed_ips]
# nodo-seguimiento-1.ejemplo.com 21337
# nodo-seguimiento-2.ejemplo.com 21337`,
            en: `# /etc/opt/xahau/xahaud.cfg
# Submission-only node configuration

[server]
port_rpc_admin_local
port_peer
port_ws_local

[port_rpc_admin_local]
port = 5005
ip = 127.0.0.1
admin = 127.0.0.1
protocol = http

[port_ws_local]
# Local WebSocket only — do not expose externally
port = 6006
ip = 127.0.0.1
protocol = ws

[port_peer]
port = 21337
ip = 0.0.0.0
protocol = peer

[node_size]
small

[network_id]
21337

[node_db]
type = NuDB
path = /var/lib/xahaud/db/nudb
advisory_delete = 0

[database_path]
/var/lib/xahaud/db

[debug_logfile]
/var/log/xahaud/debug.log

[sntp_servers]
pool.ntp.org

# No ledger history — only forwards transactions
[ledger_history]
none

[validators_file]
/etc/opt/xahau/validators.txt

# Fixed peers: connect to trusted tracking nodes
[fixed_ips]
# tracking-node-1.example.com 21337
# tracking-node-2.example.com 21337`,
            jp: "",
          },
        },
        {
          title: {
            es: "xahaud.cfg — Nodo hub (relay de red)",
            en: "xahaud.cfg — Hub node (network relay)",
            jp: "",
          },
          language: "bash",
          code: {
            es: `# /etc/opt/xahau/xahaud.cfg
# Configuración de nodo hub (relay de red)

[server]
port_rpc_admin_local
port_peer

[port_rpc_admin_local]
port = 5005
ip = 127.0.0.1
admin = 127.0.0.1
protocol = http

[port_peer]
port = 21337
ip = 0.0.0.0
protocol = peer

# Un hub necesita más conexiones peer simultáneas
[peers_max]
200

[node_size]
medium

[network_id]
21337

[node_db]
type = NuDB
path = /var/lib/xahaud/db/nudb
advisory_delete = 0

[database_path]
/var/lib/xahaud/db

[debug_logfile]
/var/log/xahaud/debug.log

[sntp_servers]
pool.ntp.org

# Historial mínimo — el hub no necesita historia completa
[ledger_history]
256

[validators_file]
/etc/opt/xahau/validators.txt

# Conectarse a múltiples peers para maximizar la conectividad
[ips]
# Lista de peers conocidos de la red Xahau
# hub1.xahau.org 21337
# hub2.xahau.org 21337`,
            en: `# /etc/opt/xahau/xahaud.cfg
# Hub node configuration (network relay)

[server]
port_rpc_admin_local
port_peer

[port_rpc_admin_local]
port = 5005
ip = 127.0.0.1
admin = 127.0.0.1
protocol = http

[port_peer]
port = 21337
ip = 0.0.0.0
protocol = peer

# A hub needs more simultaneous peer connections
[peers_max]
200

[node_size]
medium

[network_id]
21337

[node_db]
type = NuDB
path = /var/lib/xahaud/db/nudb
advisory_delete = 0

[database_path]
/var/lib/xahaud/db

[debug_logfile]
/var/log/xahaud/debug.log

[sntp_servers]
pool.ntp.org

# Minimal history — the hub does not need full history
[ledger_history]
256

[validators_file]
/etc/opt/xahaud/validators.txt

# Connect to multiple peers to maximize connectivity
[ips]
# List of known Xahau network peers
# hub1.xahau.org 21337
# hub2.xahau.org 21337`,
            jp: "",
          },
        },
      ],
      slides: [
        {
          title: {
            es: "Nodo de solo envío",
            en: "Submission-Only Node",
            jp: "",
          },
          content: {
            es: "Proxy de transacciones\n\n• ledger_history = none\n• Solo reenvía transacciones\n• Disco mínimo\n• Arranque rápido\n• No responde consultas históricas",
            en: "Transaction proxy\n\n• ledger_history = none\n• Only forwards transactions\n• Minimal disk\n• Fast startup\n• Does not answer historical queries",
            jp: "",
          },
          visual: "📤",
        },
        {
          title: {
            es: "Nodo hub",
            en: "Hub Node",
            jp: "",
          },
          content: {
            es: "Relay de red\n\n• Muchas conexiones peer (peers_max)\n• No valida ni almacena historia\n• Mejora la propagación de mensajes\n• Requiere alto ancho de banda\n• Infraestructura crítica de red",
            en: "Network relay\n\n• Many peer connections (peers_max)\n• Does not validate or store history\n• Improves message propagation\n• Requires high bandwidth\n• Critical network infrastructure",
            jp: "",
          },
          visual: "🔀",
        },
        {
          title: {
            es: "Resumen de modos xahaud",
            en: "xahaud Modes Summary",
            jp: "",
          },
          content: {
            es: "Elige el modo adecuado\n\n• APIs/dApps → Seguimiento\n• Consenso → Validador\n• Datos históricos → Historia completa\n• Proxy de envío → Solo envío\n• Relay → Hub",
            en: "Choose the right mode\n\n• APIs/dApps → Tracking\n• Consensus → Validator\n• Historical data → Full history\n• Send proxy → Submission-only\n• Relay → Hub",
            jp: "",
          },
          visual: "🗺️",
        },
      ],
    },
  ],
}
