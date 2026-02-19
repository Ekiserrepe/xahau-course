export default {
  id: "m12",
  icon: "🧰",
  title: {
    es: "Herramientas del ecosistema Xahau",
    en: "",
    jp: "",
  },
  lessons: [
    {
      id: "m12l1",
      title: {
        es: "Xaman: la wallet principal de Xahau",
        en: "",
        jp: "",
      },
      theory: {
        es: `**Xaman** (anteriormente conocida como XUMM) es la wallet principal del ecosistema XRPL y Xahau. Es una aplicación móvil que te permite gestionar tus cuentas, firmar transacciones y conectarte con aplicaciones descentralizadas.

### ¿Qué es Xaman?

Xaman es una wallet no custodial, lo que significa que **tú controlas tus claves privadas**. Nadie más tiene acceso a tus fondos. Es la puerta de entrada al ecosistema Xahau para usuarios y desarrolladores.

### Instalación

- **iOS**: Busca "Xaman" en la [App Store](https://apps.apple.com/app/xaman-wallet-formerly-xumm/id1492302343).
- **Android**: Busca "Xaman" en [Google Play Store](https://play.google.com/store/apps/details?id=com.xrpllabs.xumm).
- La app es de descarga gratuita y está disponible en múltiples idiomas.

### Crear tu primera cuenta

1. Abre Xaman y selecciona "Crear nueva cuenta"
2. La app generará un par de claves (pública/privada)
3. **IMPORTANTE**: Anota tu secreto (family seed) en papel y guárdalo en un lugar seguro
4. Confirma que has guardado el secreto completando la verificación
5. Tu cuenta está creada, pero necesita ser activada con un depósito mínimo

### Importar una cuenta existente

Si ya tienes una cuenta de Xahau (por ejemplo, creada con código):
1. Ve a "Ajustes" → "Cuentas" → "Añadir cuenta"
2. Selecciona "Importar cuenta existente"
3. Introduce tu **family seed** (sEd...) o **mnemónico**
4. La app importará la cuenta con acceso completo

### Modo desarrollador (Testnet)

Para trabajar con testnet en Xaman:
1. Ve a "Ajustes" → "Avanzado" → "Nodo"
2. Cambia el nodo a \`wss://xahau-test.net\`
3. Ahora puedes usar tu cuenta de testnet en Xaman
4. Las transacciones de testnet no tienen valor real

### Firmar transacciones con Xaman

Xaman actúa como un **firmador seguro** de transacciones:
- Las dApps envían una solicitud de firma a Xaman
- Tú revisas los detalles de la transacción en la app
- Autorizas con biometría (huella/Face ID) o PIN
- La transacción firmada se envía al ledger

Las **xApps** son mini-aplicaciones que se ejecutan dentro de Xaman, proporcionando funcionalidad adicional directamente en la wallet.

### Seguridad

- **Bloqueo biométrico**: Face ID, Touch ID o huella dactilar
- **Cifrado**: Las claves privadas se cifran en el dispositivo
- **Firma local**: Las claves nunca salen del dispositivo
- **PIN de respaldo**: Por si falla la biometría
- **Modo de solo lectura**: Puedes añadir cuentas sin importar la clave privada

### Conexión con dApps

Las dApps se conectan a Xaman de dos formas:
- **Códigos QR**: Escaneas un QR que contiene la solicitud de transacción
- **Deep links**: Un enlace que abre directamente Xaman con la transacción pre-rellenada
- **xApps SDK**: Para desarrolladores que quieren integrar Xaman en sus aplicaciones`,
        en: "",
        jp: "",
      },
      codeBlocks: [],
      slides: [
        {
          title: {
            es: "¿Qué es Xaman?",
            en: "",
            jp: "",
          },
          content: {
            es: "Xaman (ex-XUMM) es la wallet principal de Xahau\n\n• Wallet no custodial — tú controlas tus claves\n• Disponible en iOS y Android\n• Firma segura con biometría\n• Conexión con dApps via QR / deep links",
            en: "",
            jp: "",
          },
          visual: "📱",
        },
        {
          title: {
            es: "Configurar Xaman para desarrollo",
            en: "",
            jp: "",
          },
          content: {
            es: "Para usar Xaman con testnet:\n\n1. Ajustes → Avanzado → Nodo\n2. Cambiar a wss://xahau-test.net\n3. Importar o crear cuenta de testnet\n4. ¡Las transacciones de test no cuestan nada real!",
            en: "",
            jp: "",
          },
          visual: "🔧",
        },
        {
          title: {
            es: "Seguridad en Xaman",
            en: "",
            jp: "",
          },
          content: {
            es: "Xaman protege tus fondos:\n\n• Claves cifradas en el dispositivo\n• Firma local — claves nunca salen del móvil\n• Bloqueo biométrico (Face ID / huella)\n• Modo solo lectura para monitoreo",
            en: "",
            jp: "",
          },
          visual: "🔐",
        },
      ],
    },
    {
      id: "m12l2",
      title: {
        es: "Exploradores de bloques",
        en: "",
        jp: "",
      },
      theory: {
        es: `Un **explorador de bloques** (block explorer) es una herramienta web que te permite navegar y buscar información en el ledger de Xahau de forma visual. Es como un "buscador" para la blockchain.

### ¿Por qué usar un explorador?

- Verificar que una transacción se ejecutó correctamente
- Inspeccionar el estado de una cuenta (balance, objetos, historial)
- Debuggear transacciones fallidas
- Entender qué pasó "bajo el capó" de una transacción

### Xahau Explorer

El explorador oficial de Xahau permite buscar:
- **Cuentas**: balance de XAH, tokens, objetos del ledger, historial de transacciones
- **Transacciones**: tipo, estado (éxito/fallo), detalles, metadata
- **Ledgers**: número, hash, timestamp, transacciones incluidas

### Buscar una cuenta

Al buscar una dirección (ej: \`rXXXXXX...\`) puedes ver:
- **Balance**: Cantidad de XAH disponible y reservado
- **Objetos**: Trust lines, ofertas DEX, URITokens, Hooks instalados
- **Historial**: Todas las transacciones enviadas y recibidas
- **Reserves**: XAH bloqueado por objetos en el ledger

### Buscar una transacción

Al buscar un hash de transacción puedes ver:
- **Tipo**: Payment, TrustSet, URITokenMint, SetHook, etc.
- **Estado**: \`tesSUCCESS\` (éxito) o código de error
- **Detalles**: Origen, destino, cantidad, memos, flags
- **Metadata**: Los nodos del ledger que fueron afectados (AffectedNodes)

### Buscar un ledger

Al buscar un número de ledger puedes ver:
- **Hash del ledger**: Identificador único
- **Timestamp**: Momento de cierre
- **Transacciones**: Lista de todas las transacciones incluidas
- **Número de transacciones**: Cuántas transacciones se procesaron

### Bithomp Explorer

Bithomp es otro explorador popular que soporta XRPL y Xahau:
- Interfaz limpia y fácil de usar
- Información detallada de cuentas y transacciones
- Herramientas adicionales como decodificador de transacciones

### Entender AffectedNodes

La metadata de cada transacción incluye \`AffectedNodes\`, que describe exactamente qué cambió en el ledger:
- **CreatedNode**: Se creó un nuevo objeto (ej: nueva trust line)
- **ModifiedNode**: Se modificó un objeto existente (ej: balance actualizado)
- **DeletedNode**: Se eliminó un objeto (ej: oferta completada)

Cada nodo afectado muestra el estado anterior (\`PreviousFields\`) y el nuevo estado (\`FinalFields\`).

### Debuggear transacciones fallidas

Cuando una transacción falla, el explorador te muestra:
1. El **código de error** (ej: \`tecUNFUNDED_PAYMENT\`, \`tecNO_LINE\`)
2. El **significado** del error
3. Los **campos de la transacción** para identificar el problema

### API endpoints de exploradores

Algunos exploradores ofrecen APIs públicas para consultar datos programáticamente, además de la interfaz web.`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Obtener y mostrar información de una transacción (como un explorador)",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client } = require("xahau");

async function explorarTransaccion(txHash) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Obtener la transacción con metadata
  const response = await client.request({
    command: "tx",
    transaction: txHash,
    binary: false,
  });

  const tx = response.result;

  console.log("=== EXPLORADOR DE TRANSACCION ===\\n");
  console.log("Hash:", txHash);
  console.log("Tipo:", tx.TransactionType);
  console.log("Estado:", tx.meta.TransactionResult);
  console.log("Ledger:", tx.ledger_index);
  console.log("Fecha:", new Date((tx.date + 946684800) * 1000).toISOString());
  console.log("Cuenta origen:", tx.Account);

  if (tx.Destination) {
    console.log("Cuenta destino:", tx.Destination);
  }

  if (tx.Amount) {
    if (typeof tx.Amount === "string") {
      console.log("Cantidad:", Number(tx.Amount) / 1000000, "XAH");
    } else {
      console.log("Cantidad:", tx.Amount.value, tx.Amount.currency);
    }
  }

  console.log("Fee:", Number(tx.Fee) / 1000000, "XAH");

  // Mostrar nodos afectados
  console.log("\\n=== NODOS AFECTADOS ===\\n");
  for (const node of tx.meta.AffectedNodes) {
    if (node.CreatedNode) {
      console.log("+ CREADO:", node.CreatedNode.LedgerEntryType);
    } else if (node.ModifiedNode) {
      console.log("~ MODIFICADO:", node.ModifiedNode.LedgerEntryType);
      if (node.ModifiedNode.PreviousFields) {
        console.log("  Antes:", JSON.stringify(node.ModifiedNode.PreviousFields));
      }
      if (node.ModifiedNode.FinalFields) {
        console.log("  Despues:", JSON.stringify(node.ModifiedNode.FinalFields));
      }
    } else if (node.DeletedNode) {
      console.log("- ELIMINADO:", node.DeletedNode.LedgerEntryType);
    }
  }

  await client.disconnect();
}

// Uso: reemplaza con un hash de transaccion real de testnet
explorarTransaccion("TU_HASH_DE_TRANSACCION_AQUI");`,
        },
      ],
      slides: [
        {
          title: {
            es: "¿Qué es un explorador de bloques?",
            en: "",
            jp: "",
          },
          content: {
            es: "Un explorador es un buscador para la blockchain\n\n• Buscar cuentas: balance, objetos, historial\n• Buscar transacciones: tipo, estado, metadata\n• Buscar ledgers: hash, transacciones incluidas\n• Herramienta esencial para desarrollo y debug",
            en: "",
            jp: "",
          },
          visual: "🔍",
        },
        {
          title: {
            es: "AffectedNodes: qué cambió en el ledger",
            en: "",
            jp: "",
          },
          content: {
            es: "Cada transacción modifica el ledger:\n\n• CreatedNode — nuevo objeto creado\n• ModifiedNode — objeto existente modificado\n• DeletedNode — objeto eliminado\n\nCada nodo muestra PreviousFields y FinalFields",
            en: "",
            jp: "",
          },
          visual: "📋",
        },
        {
          title: {
            es: "Debuggear con el explorador",
            en: "",
            jp: "",
          },
          content: {
            es: "Cuando una transacción falla:\n\n1. Busca el hash en el explorador\n2. Revisa el código de error (ej: tecUNFUNDED_PAYMENT)\n3. Inspecciona los campos de la transacción\n4. Compara con la documentación del error",
            en: "",
            jp: "",
          },
          visual: "🐛",
        },
      ],
    },
    {
      id: "m12l3",
      title: {
        es: "Hooks Builder: IDE online para smart contracts",
        en: "",
        jp: "",
      },
      theory: {
        es: `**Hooks Builder** es un entorno de desarrollo integrado (IDE) online que te permite escribir, compilar, desplegar y probar Hooks de Xahau directamente desde tu navegador.

### ¿Qué es Hooks Builder?

Hooks Builder está disponible en **hooks-builder.xrpl.org** y es la forma más rápida de empezar a desarrollar smart contracts para Xahau sin instalar nada en tu máquina.

### Características principales

- **Editor de código**: Editor con resaltado de sintaxis para C
- **Compilador**: Compila C a WebAssembly directamente en el navegador
- **Desplegador**: Despliega tu Hook en testnet con un clic
- **Debugger**: Lee las trazas de ejecución del Hook
- **Templates**: Biblioteca de Hooks pre-construidos para aprender

### Crear tu primer Hook paso a paso

1. Ve a **hooks-builder.xrpl.org**
2. Haz clic en "New Hook" o selecciona un template
3. Escribe tu código C en el editor
4. Haz clic en "Compile" para compilar a WebAssembly
5. Si la compilación es exitosa, haz clic en "Deploy"
6. Selecciona tu cuenta de testnet (o crea una nueva)
7. Confirma el despliegue y espera la confirmación

### La biblioteca de templates

Hooks Builder incluye varios ejemplos listos para usar:
- **Starter**: Hook mínimo que acepta todas las transacciones
- **Firewall**: Hook que bloquea transacciones de ciertas cuentas
- **Carbon**: Hook que cobra una "tasa de carbono" en cada pago
- **Notifier**: Hook que emite un dato cada vez que se ejecuta

Estos templates son excelentes para aprender los patrones comunes de desarrollo de Hooks.

### Compilación: C a WebAssembly

El proceso de compilación ocurre **en tu navegador**:
1. Tu código C se envía al compilador WASM integrado
2. Se verifica que usas las guard() correctamente
3. Se genera el archivo \`.wasm\` (WebAssembly)
4. Si hay errores, se muestran en la consola del IDE

### Testing: desplegar en testnet

Una vez compilado, puedes desplegar directamente en testnet:
1. El IDE genera la transacción \`SetHook\` automáticamente
2. Conecta con una cuenta de testnet (el IDE puede crear una)
3. La transacción se firma y envía
4. El Hook queda activo en tu cuenta de testnet

### Debugging: trazas de ejecución

Cuando tu Hook se ejecuta, puedes ver las trazas:
- Mensajes de \`trace()\` que hayas puesto en tu código
- El resultado del Hook (aceptar/rechazar)
- Errores de ejecución si los hay
- Estado del Hook (emisiones, cambios de estado)

### Limitaciones

- **Prototipado**: Ideal para experimentar y aprender
- **No para producción**: Para proyectos serios, usa un entorno local
- **Sin control de versiones**: No tiene git integrado
- **Compilador limitado**: Algunas optimizaciones avanzadas no están disponibles

### ¿Cuándo pasar a desarrollo local?

Considera migrar a un entorno local cuando:
- Tu Hook crece en complejidad
- Necesitas control de versiones (git)
- Quieres automatizar tests
- Vas a desplegar en mainnet
- Trabajas en equipo`,
        en: "",
        jp: "",
      },
      codeBlocks: [],
      slides: [
        {
          title: {
            es: "Hooks Builder: IDE online",
            en: "",
            jp: "",
          },
          content: {
            es: "hooks-builder.xrpl.org\n\n• Editor de código C con resaltado\n• Compilador C → WebAssembly en el navegador\n• Despliegue directo a testnet\n• Biblioteca de templates para aprender",
            en: "",
            jp: "",
          },
          visual: "💻",
        },
        {
          title: {
            es: "Flujo de trabajo en Hooks Builder",
            en: "",
            jp: "",
          },
          content: {
            es: "1. Escribe tu código C (o usa un template)\n2. Compila → se genera el .wasm\n3. Despliega → SetHook en testnet\n4. Prueba → envía transacciones al Hook\n5. Debuggea → lee las trazas de ejecución",
            en: "",
            jp: "",
          },
          visual: "🔄",
        },
        {
          title: {
            es: "¿Prototipo o producción?",
            en: "",
            jp: "",
          },
          content: {
            es: "Hooks Builder es ideal para:\n• Aprender y experimentar\n• Prototipos rápidos\n• Probar ideas\n\nPasa a desarrollo local cuando:\n• El Hook crece en complejidad\n• Necesitas git y CI/CD\n• Vas a desplegar en mainnet",
            en: "",
            jp: "",
          },
          visual: "⚖️",
        },
      ],
    },
    {
      id: "m12l4",
      title: {
        es: "Recursos para desarrolladores",
        en: "",
        jp: "",
      },
      theory: {
        es: `Como desarrollador de Xahau, tienes acceso a un ecosistema creciente de documentación, herramientas y comunidad. Aquí tienes los recursos más importantes.

### Documentación oficial

- **docs.xahau.network**: Documentación completa de Xahau, incluyendo transacciones, objetos del ledger, Hooks API y guías
- **xrpl.org/docs**: Gran parte de la documentación de XRPL aplica a Xahau (transacciones base, formato de datos, criptografía)

### Repositorios en GitHub

La organización de Xahau en GitHub contiene:
- **xahaud**: El servidor/nodo de Xahau (fork de rippled)
- **hooks-api**: Documentación y headers de la API de Hooks
- **Hooks examples**: Ejemplos de Hooks en C
- **xahau-py, xahau-js**: Librerías cliente

### Comunidad

- **Discord**: El canal principal de comunicación entre desarrolladores
- **Twitter/X**: Sigue las cuentas oficiales para anuncios y actualizaciones
- **GitHub Discussions**: Para preguntas técnicas y propuestas

### Xahau Foundation

La Xahau Foundation supervisa el desarrollo y gobernanza de la red:
- Coordina actualizaciones del protocolo
- Gestiona los fondos de desarrollo
- Organiza grants para desarrolladores

### Librerías útiles

Estas son las librerías que más usarás como desarrollador:

- **xahau** (JavaScript/TypeScript): La librería principal que usamos en este curso. Permite conectar con el ledger, crear wallets, firmar y enviar transacciones. Es un fork de xrpl.js adaptado para Xahau.

- **xrpl-client**: Cliente WebSocket ligero para conectar con nodos xahaud. Más simple que xahau.js, ideal para aplicaciones que solo necesitan leer datos.

- **xrpl-accountlib**: Librería para derivar cuentas, generar claves y firmar transacciones offline. Útil para gestión avanzada de claves.

- **xrpl-codec / xrpl-binary-codec**: Codificación y decodificación del formato binario del ledger. Necesario si trabajas con datos raw del ledger.

### Herramientas de testing

- **Testnet faucet**: Obtén XAH de prueba gratis en el faucet de testnet
- **Hooks Builder**: IDE online para prototipar Hooks (lo vimos en la lección anterior)
- **Xahau Explorer**: Explorador de bloques para verificar transacciones en testnet

### Mantenerte actualizado

El ecosistema evoluciona rápidamente. Para estar al día:
- Sigue **@XahauNetwork** y **@XRPLLabs** en Twitter/X
- Únete al **Discord** oficial
- Revisa los **releases** en GitHub para nuevas versiones
- Lee los **amendments** propuestos para entender hacia dónde va el protocolo
- Participa en las discusiones de gobernanza`,
        en: "",
        jp: "",
      },
      codeBlocks: [],
      slides: [
        {
          title: {
            es: "Documentación y repositorios",
            en: "",
            jp: "",
          },
          content: {
            es: "Recursos oficiales:\n\n• docs.xahau.network — documentación de Xahau\n• xrpl.org/docs — documentación XRPL (compatible)\n• GitHub Xahau — código fuente y ejemplos\n• Discord — comunidad de desarrolladores",
            en: "",
            jp: "",
          },
          visual: "📚",
        },
        {
          title: {
            es: "Librerías del ecosistema",
            en: "",
            jp: "",
          },
          content: {
            es: "Herramientas para desarrolladores:\n\n• xahau (JS/TS) — librería principal\n• xrpl-client — WebSocket ligero\n• xrpl-accountlib — derivación de cuentas\n• xrpl-codec — codificación binaria\n• Testnet faucet + Hooks Builder",
            en: "",
            jp: "",
          },
          visual: "🛠️",
        },
        {
          title: {
            es: "Comunidad y crecimiento",
            en: "",
            jp: "",
          },
          content: {
            es: "Mantente conectado:\n\n• Discord — canal principal de desarrolladores\n• Twitter/X — @XahauNetwork, @XRPLLabs\n• Xahau Foundation — grants para proyectos\n• GitHub — contribuye a repos open source\n• Amendments — sigue la evolución del protocolo",
            en: "",
            jp: "",
          },
          visual: "🌐",
        },
      ],
    },
  ],
}
