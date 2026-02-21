export default {
  id: "m8",
  icon: "🪝",
  title: {
    es: "Introducción a smart contracts en entornos No-EVM",
    en: "",
    jp: "",
  },
  lessons: [
    {
      id: "m8l1",
      title: {
        es: "¿Qué son los Hooks?",
        en: "",
        jp: "",
      },
      theory: {
        es: `Los **Hooks** son el sistema de smart contracts nativo de Xahau. A diferencia de Solidity en Ethereum, los Hooks se escriben en **C** y se compilan a **WebAssembly (WASM)**.

### Hooks vs Smart Contracts EVM

| Característica | Smart Contracts EVM | Hooks (Xahau) |
|---|---|---|
| Lenguaje | Solidity / Vyper | C |
| Compilación | Bytecode EVM | WebAssembly (WASM) |
| Ejecución | En la EVM | Directamente en el nodo |
| Modelo | Se invocan activamente | Se ejecutan reactivamente |
| Gas/Fees | Gas variable | Fees fijos y bajos |
| Almacenamiento | Storage ilimitado | Estado con namespace |
| Despliegue | Transacción de creación | Transacción SetHook |

### Modelo reactivo

La diferencia más importante es el **modelo de ejecución**:

- En Ethereum, **tú llamas** al smart contract enviando una transacción al contrato
- En Xahau, los Hooks se **ejecutan automáticamente** cuando una transacción pasa por una cuenta que tiene un Hook instalado

Los Hooks son como **filtros** o **interceptores** que reaccionan a las transacciones. Entre muchas opciones, pueden:
- **Aceptar** la transacción (\`accept()\`)
- **Rechazar** la transacción (\`rollback()\`)
- **Emitir** nuevas transacciones (\`emit()\`)
- **Leer y escribir** estado persistente (\`state()\`, \`state_set()\`)

### Algunas datos curiosos

- Máximo **10 Hooks** por cuenta
- Cada Hook tiene su propio **namespace** para guardar información, pero puede utilizar otros que no son el propio  si tiene permisos
- La primera vez que se instala un Hook, el código WASM se almacena en el ledger y se le asigna un hash. Si otro usuario quiere instalar el mismo Hook, puede hacer uso del identificador y no necesita tener acceso al código fuente para instalarlo.

### Funciones obligatorias

Todo Hook debe implementar dos funciones:
- \`hook(uint32_t reserved)\` — Se ejecuta cuando una transacción llega a la cuenta. Es obligatoria
- \`cbak(uint32_t reserved)\` — Se ejecuta como callback de transacciones emitidas por el Hook. Es obligatoria pero puede estar vacía

### Guard (\`_g\`)

Cada Hook debe incluir una llamada a \`_g(id, maxiter)\` para evitar bucles infinitos. El guard define el máximo de iteraciones que puede ejecutar el Hook.`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Hook mínimo — Acepta todas las transacciones",
            en: "",
            jp: "",
          },
          language: "c",
          code: `#include "hookapi.h"

/**
 * Hook: accept_all.c
 * El Hook más simple posible.
 * Acepta todas las transacciones sin condiciones.
 */

int64_t hook(uint32_t reserved) {
    // Aceptar la transacción con un mensaje
    accept(SBUF("accept_all: Transacción aceptada."), __LINE__);

    // Guard: nunca se llega aquí, pero es obligatorio
    _g(1, 1);
    return 0;
}

int64_t cbak(uint32_t reserved) {
    // Callback vacío (obligatorio)
    return 0;
}`,
        },
        {
          title: {
            es: "Hook que rechaza pagos menores a un mínimo",
            en: "",
            jp: "",
          },
          language: "c",
          code: `#include "hookapi.h"

/**
 * Hook: min_payment.c
 * Rechaza pagos de XAH menores a 10 XAH.
 * Acepta todas las demás transacciones.
 */

int64_t hook(uint32_t reserved) {
    // Obtener el tipo de transacción
    int64_t tt = otxn_type();

    // Si no es un pago (tipo 0), aceptar
    if (tt != 0) {
        accept(SBUF("min_payment: No es un pago."), __LINE__);
    }

    // Obtener la cantidad del pago
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // Si no es XAH nativo (8 bytes), aceptar
    if (amount_len != 8) {
        accept(SBUF("min_payment: Pago no-XAH."), __LINE__);
    }

    // Convertir a drops y comparar
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops

    if (drops < min_drops) {
        // Rechazar: el pago es muy pequeño
        rollback(
            SBUF("min_payment: Pago rechazado. Mínimo 10 XAH."),
            __LINE__
        );
    }

    // Aceptar: el pago cumple el mínimo
    accept(SBUF("min_payment: Pago aceptado."), __LINE__);

    _g(1, 1);
    return 0;
}

int64_t cbak(uint32_t reserved) {
    return 0;
}`,
        },
      ],
      slides: [
        {
          title: { es: "¿Qué son los Hooks?", en: "", jp: "" },
          content: {
            es: "Smart contracts nativos de Xahau\n\n• Escritos en C\n• Compilados a WebAssembly\n• Se ejecutan reactivamente\n• Filtran/interceptan transacciones",
            en: "",
            jp: "",
          },
          visual: "🪝",
        },
        {
          title: { es: "Modelo reactivo", en: "", jp: "" },
          content: {
            es: "EVM: Tú llamas al contrato\nHooks: Se ejecutan automáticamente\n\n• accept() → Aceptar transacción\n• rollback() → Rechazar transacción\n• emit() → Emitir nueva transacción\n• state() → Leer/escribir estado",
            en: "",
            jp: "",
          },
          visual: "⚡",
        },
        {
          title: { es: "Estructura de un Hook", en: "", jp: "" },
          content: {
            es: "Dos funciones obligatorias:\n\n🪝 hook() → Punto de entrada principal\n🔄 cbak() → Callback de emisiones\n🛡️ _g() → Guard anti-bucles infinitos",
            en: "",
            jp: "",
          },
          visual: "📐",
        },
      ],
    },
    {
      id: "m8l2",
      title: {
        es: "Despliegue de un Hook en Xahau",
        en: "",
        jp: "",
      },
      theory: {
        es: `Una vez que tienes tu Hook escrito en C, necesitas **compilarlo a WebAssembly** y **desplegarlo** en tu cuenta de Xahau mediante una transacción \`SetHook\`.

### Opciones de desarrollo

**1. Hooks Builder (Online)**
La forma más rápida de empezar. [builder.xahau.network](https://builder.xahau.network) te permite escribir, compilar y desplegar Hooks desde el navegador. Incluye ejemplos, documentación y un entorno de desarrollo integrado. Ideal para pruebas rápidas y aprendizaje. Solo disponible para **Xahau Testnet**.

**2. Desarrollo local**
Para desarrollo local (y posteriormente Xahau Mainnet) necesitas [xahau-toolkit](https://hooks-toolkit.com/), incluye una librería completa para poder compilar tus hooks y desplegarlos con scripts personalizados.

### Transacción SetHook

La transacción \`SetHook\` es la única transacción necesaria para gestionar Hooks. Con ella puedes **instalar**, **actualizar** y **eliminar** Hooks de tu cuenta. Los campos principales del objeto Hook dentro del array \`Hooks\` son:

| Campo | Descripción |
|---|---|
| \`CreateCode\` | El binario WASM del Hook (en hexadecimal) |
| \`HookHash\` | Hash del Hook ya existente en el ledger (alternativa a CreateCode) |
| \`HookOn\` | Máscara de bits que define qué tipos de transacción activan el Hook |
| \`HookNamespace\` | Espacio de nombres para el estado del Hook (32 bytes hex) |
| \`HookApiVersion\` | Versión de la API de Hooks (actualmente 0) |
| \`HookParameters\` | Parámetros de configuración opcionales |
| \`HookCanEmit\` | Lista de transacciones que el Hook puede emitir (seguridad) |
| \`Flags\` | Flags de control (\`hsfOverride\`, \`hsfNSDelete\`, \`hsfCollect\`) |

### Fases de gestión de un Hook

### 1. Instalar un Hook por primera vez (con CreateCode)

Cuando despliegas un Hook nuevo que nunca ha existido en la red, usas el campo \`CreateCode\` con el binario WASM completo. El nodo calcula el hash del WASM y almacena el código en el ledger. Si otro usuario ya desplegó el mismo código exacto, Xahau reutiliza la definición existente (deduplicación automática).

\`\`\`
Hook: {
  CreateCode: "0061736D...",     // WASM en hex
  HookOn: "0000000000000000",    // Todos los tipos de tx
  HookNamespace: "00...00",      // 64 chars hex
  HookApiVersion: 0,
  Flags: 1,                      // hsfOverride
}
\`\`\`

### 2. Instalar un Hook existente por HookHash

Si un Hook ya fue desplegado antes (por ti o por otra cuenta), puedes instalarlo en tu cuenta **sin enviar todo el WASM otra vez**. Solo necesitas el \`HookHash\` (el hash SHA-256 del binario). Esto ahorra espacio y fees.

\`\`\`
Hook: {
  HookHash: "A5B6C7D8...",      // Hash del Hook existente
  HookOn: "0000000000000000",
  HookNamespace: "00...00",
  HookApiVersion: 0,
  Flags: 1,                      // hsfOverride
}
\`\`\`

El \`HookHash\` lo puedes obtener consultando los Hooks de una cuenta con \`account_objects\` o desde un explorador de bloques como [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com).

### 3. Actualizar un Hook

Para actualizar un Hook en una posición, envías un nuevo \`SetHook\` con el nuevo \`CreateCode\` (o \`HookHash\`) en la misma posición del array \`Hooks\`. El flag \`hsfOverride\` (valor 1) es necesario para reemplazar un Hook existente. El estado previo del Hook se **mantiene** si el namespace no cambia.

### 4. Eliminar un Hook

Para eliminar un Hook de una posición, envías \`SetHook\` con \`CreateCode\` vacío y el flag \`hsfOverride\`:

Si además quieres **limpiar todo el estado** del namespace de ese Hook, añade el flag \`hsfNSDelete\` (valor 2) combinado con \`hsfOverride\`: \`Flags: 3\`.

### Flags de SetHook

| Flag | Valor | Descripción |
|---|---|---|
| \`hsfOverride\` | 1 | Permite reemplazar o eliminar un Hook existente en esa posición |
| \`hsfNSDelete\` | 2 | Elimina todo el estado del namespace al desinstalar |
| \`hsfCollect\` | 4 | Recolecta los grants del Hook anterior |

### HookOn — Filtro de transacciones

El campo \`HookOn\` controla en qué tipos de transacción se activa el Hook:
- Puedes configurar bits específicos para activar o desactivar tipos usando esta [calculadora](https://richardah.github.io/xrpl-hookon-calculator/)
- Si marcamos solo que se active en transacciones de pago, el Hook solo se ejecutará cuando la cuenta reciba o envíe un pago. El resultado en la calculadora es \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. Debemos eliminar la parte de \`0x\`y pasar el resultado a mayúsculas para usarlo en el campo HookOn. Por ejemplo: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Se pueden marcar varias transacciones a la vez. Se recomienda precaución al configurar HookOn para no activar el Hook en tipos de transacción que no necesitas, ya que esto puede generar fees innecesarios y aumentar el riesgo de acciones que no esperemos.

### HookCanEmit — Control de emisión de transacciones

El campo \`HookCanEmit\` es un mecanismo de seguridad fundamental que limita qué transacciones puede emitir un Hook. Por defecto, un Hook tiene la capacidad de emitir transacciones autónomas (usando la función \`emit()\`), lo que podría representar un riesgo si el Hook tiene un bug o ha sido instalado sin revisar su código.

\`HookCanEmit\` es un array que define explícitamente qué tipos de transacción puede emitir el Hook. Si se configura, el Hook **solo podrá emitir las transacciones listadas**, cualquier intento de emitir un tipo no incluido será rechazado por la red. Funciona igual que \`HookOn\`, pero en lugar de controlar la activación del Hook, controla su capacidad de emisión.

- Puedes configurar bits específicos para activar o desactivar tipos usando esta [calculadora](https://richardah.github.io/xrpl-hookon-calculator/)
- Si marcamos solo que se permita emisión de transacciones de pago, el resultado en la calculadora es \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. Debemos eliminar la parte de \`0x\`y pasar el resultado a mayúsculas para usarlo en el campo \`HookCanEmit\`. Por ejemplo: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Aunque \`HookCanEmit\` es un campo opcional, se recomienda utilizarlo para no permitir que un Hook emita transacciones no deseadas, ya que esto puede generar acciones no desesadas de un Hook malicioso.

**¿Por qué es importante para la seguridad?**

- **Principio de mínimo privilegio**: Un Hook debería tener solo los permisos que necesita. Si tu Hook solo necesita enviar pagos, no debería poder emitir \`SetHook\`, \`AccountDelete\` u otras transacciones sensibles.
- **Protección ante bugs**: Si un Hook tiene una vulnerabilidad, \`HookCanEmit\` limita el daño potencial al restringir las acciones que puede ejecutar.
- **Auditoría y transparencia**: Al revisar un Hook instalado en una cuenta, \`HookCanEmit\` permite verificar rápidamente qué operaciones puede realizar de forma autónoma.
- **Buena práctica**: Siempre configura \`HookCanEmit\` con el conjunto mínimo de transacciones necesarias para la lógica de tu Hook.

### Más información

Para una referencia completa de \`SetHook\`, incluyendo todos los campos, flags, reglas de validación y casos especiales, consulta la [documentación oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/).`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Instalar dependencias para desarrollo de Hooks",
            en: "",
            jp: "",
          },
          language: "bash",
          code: `# Crear proyecto
mkdir mi-primer-hook
cd mi-primer-hook
npm init -y

# Instalar la librería xahau
npm install xahau`,
        },
        {
          title: {
            es: "Desplegar un Hook con xahau.js",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Tu cuenta de testnet
  const account = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

  // Leer el WASM compilado del Hook
  const wasmBytes = fs.readFileSync("./build/accept_all.wasm");
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // Construir la transacción SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0000000000000000", // Todos los tipos de tx
          HookNamespace: "0".repeat(64), // Namespace por defecto
          HookApiVersion: 0,
          Flags: 1,
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Hook desplegado con éxito!");
    console.log("Tu cuenta ahora ejecuta el Hook");
    console.log("en cada transacción entrante/saliente.");
  }

  await client.disconnect();
}

deployHook();`,
        },
        {
          title: {
            es: "Verificar los Hooks instalados en una cuenta",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client } = require("xahau");

async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });

  const hooks = response.result.account_objects;
  console.log(\`=== Hooks de \${address} ===\`);
  console.log(\`Total instalados: \${hooks.length}\\n\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    console.log(\`Hook #\${i + 1}:\`);
    console.log(\`  HookHash: \${hook.HookHash}\`);
    console.log(\`  HookOn: \${hook.HookOn}\`);
    if (hook.HookNamespace) {
      console.log(\`  Namespace: \${hook.HookNamespace}\`);
    }
    console.log();
  }

  await client.disconnect();
}

checkHooks("rTuDireccionAqui");`,
        },
      ],
      slides: [
        {
          title: { es: "SetHook", en: "", jp: "" },
          content: {
            es: "Transacción para gestionar Hooks\n\n• CreateCode → WASM del Hook\n• HookOn → Filtro de transacciones\n• HookNamespace → Estado aislado\n• Hasta 10 Hooks por cuenta",
            en: "",
            jp: "",
          },
          visual: "⚙️",
        },
        {
          title: { es: "Flujo de desarrollo", en: "", jp: "" },
          content: {
            es: "1️⃣ Escribir Hook en C\n2️⃣ Compilar a WebAssembly\n3️⃣ SetHook → Desplegar en cuenta\n4️⃣ ¡Hook activo!\n\n🌐 Online: hooks-builder.xrpl.org\n💻 Local: clang + wasm-cc + xahau.js",
            en: "",
            jp: "",
          },
          visual: "🚀",
        },
        {
          title: { es: "HookOn y límites de despliegue", en: "", jp: "" },
          content: {
            es: "HookOn — máscara de bits invertida:\n• \"0000000000000000\" → todos los tipos de tx\n• Configura bits para filtrar tipos específicos\n\nLímites de despliegue:\n• Máximo 10 Hooks por cuenta\n• Tamaño máximo de WASM limitado\n• Cada Hook tiene su propio namespace",
            en: "",
            jp: "",
          },
          visual: "🎯",
        },
      ],
    },
    {
      id: "m8l3",
      title: {
        es: "Estado persistente en Hooks",
        en: "",
        jp: "",
      },
      theory: {
        es: `Los Hooks pueden almacenar **datos persistentes** entre ejecuciones usando el sistema de estado (\`state\`). Esto permite que un Hook recuerde información entre transacciones.

### Funciones de estado

- \`state()\` — Lee un valor del estado usando una clave
- \`state_set()\` — Escribe un valor en el estado para una clave
- \`state_foreign()\` — Lee el estado de un Hook instalado en **otra cuenta**

### Estructura del estado

El estado se organiza como pares **clave-valor**:
- **Clave**: 32 bytes (256 bits). Si tu clave es más corta, se rellena con ceros
- **Valor**: hasta 256 bytes por entrada
- Cada entrada de estado se identifica por su clave dentro de un **namespace**

### HookNamespace — Aislamiento de estado

Cada Hook tiene un **HookNamespace** (32 bytes hex) que aísla su estado:

- Dos Hooks diferentes en la **misma cuenta** tienen estados separados si usan namespaces distintos
- Esto evita colisiones: un Hook no puede accidentalmente sobrescribir el estado de otro
- El namespace se define al instalar el Hook con \`SetHook\`

### state_foreign() — Leer estado ajeno

Con \`state_foreign()\` puedes leer el estado de un Hook en otra cuenta:
- Necesitas conocer la **cuenta**, el **namespace** y la **clave**
- Es de solo lectura: no puedes modificar el estado de otro Hook
- Útil para Hooks que necesitan consultar datos de otros Hooks

### Usos prácticos del estado

- **Contadores**: contar transacciones procesadas, pagos recibidos, etc.
- **Listas blancas/negras**: almacenar direcciones permitidas o bloqueadas
- **Configuración**: guardar parámetros que el Hook consulta en cada ejecución
- **Tracking**: registrar la última transacción procesada, timestamps, etc.
- **Acumuladores**: sumar montos, promediar valores, llevar balances internos`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Hook que cuenta pagos procesados",
            en: "",
            jp: "",
          },
          language: "c",
          code: `#include "hookapi.h"

/**
 * Hook: payment_counter.c
 * Cuenta cuántos pagos ha procesado la cuenta.
 * Almacena el contador en el estado del Hook.
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // Solo contar pagos (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: No es un pago."), __LINE__);
    }

    // Clave de estado para el contador (32 bytes, rellena con ceros)
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C'; // 'C' de Counter

    // Leer el contador actual del estado
    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));

    if (bytes_read == 8) {
        // El contador ya existe, leer su valor
        counter = *((int64_t*)counter_buf);
    }

    // Incrementar el contador
    counter++;

    // Escribir el nuevo valor en el estado
    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));

    if (result < 0) {
        rollback(SBUF("payment_counter: Error al guardar estado."), __LINE__);
    }

    // Aceptar la transacción
    accept(SBUF("payment_counter: Pago contado."), __LINE__);
    return 0;
}

int64_t cbak(uint32_t reserved) {
    return 0;
}`,
        },
        {
          title: {
            es: "Hook con lista blanca de remitentes",
            en: "",
            jp: "",
          },
          language: "c",
          code: `#include "hookapi.h"

/**
 * Hook: whitelist.c
 * Solo acepta pagos de direcciones que están en la
 * lista blanca almacenada en el estado del Hook.
 * Las direcciones se agregan al estado externamente
 * (por ejemplo, con un script de administración).
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // Solo filtrar pagos (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("whitelist: No es un pago, aceptado."), __LINE__);
    }

    // Obtener la cuenta de origen de la transacción (20 bytes)
    uint8_t sender_acc[20];
    int64_t sender_len = otxn_field(SBUF(sender_acc), sfAccount);

    if (sender_len != 20) {
        rollback(SBUF("whitelist: No se pudo leer el remitente."), __LINE__);
    }

    // Usar la cuenta del remitente como clave de estado
    // La clave es de 32 bytes; los primeros 20 son la cuenta
    uint8_t state_key[32] = { 0 };
    COPY_20(state_key, sender_acc);

    // Intentar leer el estado para esta clave
    uint8_t is_allowed[1] = { 0 };
    int64_t bytes_read = state(SBUF(is_allowed), SBUF(state_key));

    // Si existe una entrada y su valor es 1, está en la whitelist
    if (bytes_read == 1 && is_allowed[0] == 1) {
        accept(SBUF("whitelist: Remitente autorizado."), __LINE__);
    }

    // No está en la whitelist: rechazar
    rollback(
        SBUF("whitelist: Remitente no autorizado. Pago rechazado."),
        __LINE__
    );

    return 0;
}

int64_t cbak(uint32_t reserved) {
    return 0;
}`,
        },
      ],
      slides: [
        {
          title: { es: "Estado persistente", en: "", jp: "" },
          content: {
            es: "Los Hooks recuerdan datos entre ejecuciones\n\n• state() → Leer un valor por clave\n• state_set() → Escribir un valor\n• state_foreign() → Leer estado de otra cuenta\n\nPares clave-valor: clave 32 bytes, valor hasta 256 bytes",
            en: "",
            jp: "",
          },
          visual: "💾",
        },
        {
          title: { es: "HookNamespace", en: "", jp: "" },
          content: {
            es: "Aislamiento de estado entre Hooks\n\n• Cada Hook tiene su propio namespace\n• Evita colisiones entre Hooks en la misma cuenta\n• Se define al instalar con SetHook\n• 32 bytes hexadecimales",
            en: "",
            jp: "",
          },
          visual: "🔒",
        },
        {
          title: { es: "Usos prácticos del estado", en: "", jp: "" },
          content: {
            es: "• Contadores de transacciones\n• Listas blancas / negras\n• Configuración dinámica\n• Tracking y registros\n• Acumuladores y balances internos",
            en: "",
            jp: "",
          },
          visual: "📋",
        },
      ],
    },
    {
      id: "m8l4",
      title: {
        es: "Emitir transacciones desde un Hook",
        en: "",
        jp: "",
      },
      theory: {
        es: `Una de las capacidades más poderosas de los Hooks es la posibilidad de **emitir transacciones nuevas** de forma autónoma. Cuando un Hook emite una transacción, esta se ejecuta como si la cuenta del Hook la hubiera enviado.

### La función emit()

La función \`emit()\` permite que un Hook cree y envíe una **transacción emitida (etxn)**. Estas transacciones:
- Son creadas por el Hook, no por un usuario
- Se ejecutan de forma autónoma en el ledger
- Pueden ser pagos, ofertas, o cualquier tipo de transacción soportado

### Reservar espacio con etxn_reserve()

Antes de emitir, debes **reservar** cuántas transacciones vas a emitir en esta ejecución:

\`\`\`
etxn_reserve(1);  // Reservar espacio para 1 emisión
\`\`\`

Esto es obligatorio. Si intentas emitir sin reservar, el Hook fallará.

### Paso a paso para emitir

1. **\`etxn_reserve(N)\`** — Reservar espacio para N emisiones
2. **Construir la transacción** — Llenar un buffer con los campos de la transacción serializada
3. **\`etxn_details()\`** — Preparar los detalles de emisión (genera el hash de emisión)
4. **\`emit()\`** — Enviar la transacción al ledger

### La función cbak()

Cuando una transacción emitida se **completa** (con éxito o fallo), Xahau llama a la función \`cbak()\` del Hook que la emitió:

- \`cbak()\` recibe información sobre el resultado de la emisión
- Puedes usar \`cbak()\` para actualizar estado, registrar resultados, o tomar acciones adicionales
- Si no necesitas hacer nada, \`cbak()\` puede simplemente retornar 0

### Casos de uso

- **Auto-forwarding**: reenviar automáticamente un porcentaje de cada pago recibido
- **Splitting**: dividir un pago entrante entre varias cuentas
- **Refunds**: devolver pagos que no cumplen ciertas condiciones
- **Acciones programadas**: emitir transacciones basadas en condiciones de estado

### Limitaciones

- Existe un **máximo de emisiones por ejecución** del Hook
- Las transacciones emitidas tienen **requisitos de fees** propios
- No puedes emitir transacciones infinitas (el guard \`_g\` lo previene)
- Las emisiones aumentan la carga computacional del Hook`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Hook que reenvía el 10% de cada pago recibido",
            en: "",
            jp: "",
          },
          language: "c",
          code: `#include "hookapi.h"

/**
 * Hook: forward_ten_percent.c
 * Cuando la cuenta recibe un pago en XAH,
 * reenvía automáticamente el 10% a una dirección fija.
 */

// Dirección destino del 10% (account ID en hex, 20 bytes)
// Reemplazar con la dirección real deseada
#define FORWARD_TO "rDestinationAddressInHexHere0000"

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // Solo procesar pagos (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("forward10: No es un pago."), __LINE__);
    }

    // Verificar que somos el destino (pago entrante)
    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));

    uint8_t dest_acc[20];
    int64_t dest_len = otxn_field(SBUF(dest_acc), sfDestination);

    int is_incoming = 0;
    for (int i = 0; GUARD(20), i < 20; i++) {
        if (hook_acc[i] != dest_acc[i]) {
            is_incoming = 0;
            break;
        }
        if (i == 19) is_incoming = 1;
    }

    if (!is_incoming) {
        accept(SBUF("forward10: Pago saliente, ignorar."), __LINE__);
    }

    // Obtener el monto del pago
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // Solo XAH nativo (8 bytes)
    if (amount_len != 8) {
        accept(SBUF("forward10: No es XAH nativo."), __LINE__);
    }

    int64_t drops = AMOUNT_TO_DROPS(amount_buf);

    // Calcular el 10%
    int64_t forward_drops = drops / 10;

    if (forward_drops < 1) {
        accept(SBUF("forward10: Monto muy pequeño."), __LINE__);
    }

    // Reservar espacio para 1 emisión
    etxn_reserve(1);

    // Preparar la transacción emitida
    uint8_t tx_buf[PREPARE_PAYMENT_SIMPLE_SIZE];
    PREPARE_PAYMENT_SIMPLE(
        tx_buf,
        forward_drops,
        FORWARD_TO,
        0, 0
    );

    // Emitir la transacción
    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx_buf));

    if (emit_result < 0) {
        rollback(SBUF("forward10: Error al emitir."), __LINE__);
    }

    accept(SBUF("forward10: 10% reenviado."), __LINE__);
    return 0;
}

int64_t cbak(uint32_t reserved) {
    return 0;
}`,
        },
        {
          title: {
            es: "cbak() que registra el resultado de una emisión",
            en: "",
            jp: "",
          },
          language: "c",
          code: `#include "hookapi.h"

/**
 * Hook: cbak_logger.c
 * Ejemplo de cbak() que registra si la transacción
 * emitida fue exitosa o falló, guardando el resultado
 * en el estado del Hook.
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);
    // ... lógica del hook y emit() aquí ...
    accept(SBUF("cbak_logger: Hook ejecutado."), __LINE__);
    return 0;
}

int64_t cbak(uint32_t reserved) {
    _g(1, 1);

    // Clave de estado para el último resultado de emisión
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'E'; // 'E' de Emission result

    // Obtener el hash de la transacción emitida
    uint8_t emit_hash[32];
    int64_t hash_len = otxn_field(SBUF(emit_hash), sfTransactionHash);

    // Obtener el resultado de la transacción
    uint8_t meta[512];
    int64_t meta_len = otxn_field(SBUF(meta), sfTransactionResult);

    // Guardar el resultado en el estado
    // 1 = éxito, 0 = fallo
    uint8_t result_val[1];
    result_val[0] = (meta_len >= 0) ? 1 : 0;
    state_set(SBUF(result_val), SBUF(state_key));

    return 0;
}`,
        },
      ],
      slides: [
        {
          title: { es: "Emitir transacciones", en: "", jp: "" },
          content: {
            es: "Los Hooks pueden crear transacciones nuevas\n\n• emit() → Enviar una transacción al ledger\n• etxn_reserve() → Reservar espacio (obligatorio)\n• Las emisiones son autónomas\n• Se ejecutan como si la cuenta las enviara",
            en: "",
            jp: "",
          },
          visual: "📤",
        },
        {
          title: { es: "Paso a paso para emitir", en: "", jp: "" },
          content: {
            es: "1. etxn_reserve(N) → Reservar para N emisiones\n2. Construir la transacción en un buffer\n3. etxn_details() → Preparar detalles\n4. emit() → Enviar al ledger\n\ncbak() se llama cuando la emisión completa",
            en: "",
            jp: "",
          },
          visual: "📝",
        },
        {
          title: { es: "Casos de uso de emisiones", en: "", jp: "" },
          content: {
            es: "• Auto-forwarding de pagos\n• Splitting entre varias cuentas\n• Refunds automáticos\n• Acciones programadas\n\nLimitaciones: máximo de emisiones por ejecución y fees propios",
            en: "",
            jp: "",
          },
          visual: "🔀",
        },
      ],
    },
    {
      id: "m8l5",
      title: {
        es: "Parámetros, namespaces y gestión de Hooks",
        en: "",
        jp: "",
      },
      theory: {
        es: `Los Hooks ofrecen varias herramientas para configuración, organización y gestión avanzada. En esta lección veremos **HookParameters**, **HookNamespace** en profundidad, y cómo gestionar múltiples Hooks en una cuenta.

### HookParameters — Configuración sin recompilar

Los **HookParameters** permiten pasar configuración a un Hook **sin necesidad de recompilarlo**. Se definen al instalar el Hook con \`SetHook\`:

- Cada parámetro tiene un **HookParameterName** (clave) y un **HookParameterValue** (valor)
- Ambos son cadenas hexadecimales
- Dentro del Hook, se leen con \`hook_param()\`

**Casos de uso de parámetros**:
- Umbrales configurables (monto mínimo, máximo)
- Direcciones de destino configurables
- Feature flags (activar/desactivar funcionalidades)
- Cualquier valor que quieras cambiar sin recompilar el WASM

### hook_param() — Leer parámetros

Dentro del Hook, usas \`hook_param()\` para leer un parámetro por su nombre:

\`\`\`c
uint8_t value[32];
int64_t val_len = hook_param(SBUF(value), "MI_PARAM", 8);
\`\`\`

Si el parámetro existe, \`hook_param()\` devuelve la longitud del valor. Si no existe, devuelve un número negativo.

### HookNamespace en profundidad

El **HookNamespace** es un identificador de 32 bytes (64 caracteres hex) que:

- **Aísla el estado** de cada Hook en la cuenta
- Dos Hooks con **distinto namespace** no comparten estado
- Dos Hooks con el **mismo namespace** comparten estado (útil para colaboración entre Hooks)

**Cómo elegir un namespace**:
- Usa un hash del nombre de tu Hook para namespaces únicos
- Usa un namespace compartido si necesitas que dos Hooks lean/escriban los mismos datos
- El namespace \`"0".repeat(64)\` es el namespace por defecto

### Múltiples Hooks en una cuenta

Xahau permite **hasta 10 Hooks** por cuenta:

- Los Hooks se instalan en **posiciones** (0 a 9) del array \`Hooks\`
- **Orden de ejecución**: los Hooks se ejecutan en orden, empezando por la posición 0
- Si un Hook en posición 0 hace \`rollback()\`, los Hooks siguientes **no se ejecutan**
- Cada Hook puede tener su propio \`HookOn\` para activarse solo en ciertos tipos de transacción`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Hook que lee un monto mínimo desde un parámetro",
            en: "",
            jp: "",
          },
          language: "c",
          code: `#include "hookapi.h"

/**
 * Hook: configurable_min.c
 * Rechaza pagos menores a un mínimo configurable.
 * El mínimo se pasa como HookParameter llamado "MIN"
 * (en hex: 4D494E).
 * El valor del parámetro son los drops en formato int64.
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // Solo filtrar pagos (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("configurable_min: No es un pago."), __LINE__);
    }

    // Leer el parámetro "MIN" (3 bytes: 0x4D 0x49 0x4E)
    uint8_t min_buf[8] = { 0 };
    int64_t param_len = hook_param(
        SBUF(min_buf),
        "MIN", 3
    );

    // Si el parámetro no existe, usar 1 XAH por defecto
    int64_t min_drops = 1000000; // 1 XAH
    if (param_len == 8) {
        min_drops = *((int64_t*)min_buf);
    }

    // Obtener el monto del pago
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // Solo XAH nativo
    if (amount_len != 8) {
        accept(SBUF("configurable_min: No es XAH."), __LINE__);
    }

    int64_t drops = AMOUNT_TO_DROPS(amount_buf);

    if (drops < min_drops) {
        rollback(
            SBUF("configurable_min: Pago bajo el mínimo."),
            __LINE__
        );
    }

    accept(SBUF("configurable_min: Pago aceptado."), __LINE__);
    return 0;
}

int64_t cbak(uint32_t reserved) {
    return 0;
}`,
        },
        {
          title: {
            es: "Script para instalar un Hook con parámetros personalizados",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHookWithParams() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed("sEdVxxxTuSeedDeTestnet", {algorithm: 'secp256k1'});

  // Leer el WASM compilado
  const wasmBytes = fs.readFileSync("./build/configurable_min.wasm");
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // Definir parámetros del Hook
  // "MIN" en hex = 4D494E
  // Valor: 5000000 drops (5 XAH) como int64 little-endian
  const minDrops = BigInt(5000000);
  const minBuffer = Buffer.alloc(8);
  minBuffer.writeBigInt64LE(minDrops);
  const minValueHex = minBuffer.toString("hex").toUpperCase();

  const setHook = {
    TransactionType: "SetHook",
    Account: wallet.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0000000000000000",
          HookNamespace:
            "AABBCCDD".repeat(8), // Namespace personalizado
          HookApiVersion: 0,
          Flags: 1,
          HookParameters: [
            {
              HookParameter: {
                HookParameterName: "4D494E", // "MIN"
                HookParameterValue: minValueHex,
              },
            },
          ],
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook desplegado con parámetro MIN =", Number(minDrops), "drops");
    console.log("(equivalente a", Number(minDrops) / 1000000, "XAH)");
  }

  await client.disconnect();
}

deployHookWithParams();`,
        },
      ],
      slides: [
        {
          title: { es: "HookParameters", en: "", jp: "" },
          content: {
            es: "Configuración sin recompilar\n\n• Se definen al instalar con SetHook\n• Se leen con hook_param() dentro del Hook\n• Clave + Valor en hexadecimal\n• Ideal para umbrales, direcciones y flags",
            en: "",
            jp: "",
          },
          visual: "🎛️",
        },
        {
          title: { es: "Múltiples Hooks", en: "", jp: "" },
          content: {
            es: "Hasta 10 Hooks por cuenta\n\n• Posiciones 0 a 9\n• Se ejecutan en orden (0 primero)\n• rollback() en uno detiene los siguientes\n• Cada Hook tiene su propio HookOn",
            en: "",
            jp: "",
          },
          visual: "📚",
        },
        {
          title: { es: "Gestión de Hooks", en: "", jp: "" },
          content: {
            es: "• Actualizar: SetHook con nuevo CreateCode\n• Eliminar: SetHook con objeto vacío\n• Namespace reset: limpiar todo el estado\n• HookOn: control granular por tipo de tx",
            en: "",
            jp: "",
          },
          visual: "🔧",
        },
      ],
    },
    {
      id: "m8l6",
      title: {
        es: "Hooks Builder: Desarrollo online",
        en: "",
        jp: "",
      },
      theory: {
        es: `[Hooks Builder](https://builder.xahau.network) es el entorno de desarrollo online para Hooks en **Xahau Testnet**. Permite escribir, compilar, desplegar y probar Hooks directamente desde el navegador sin necesidad de instalar nada en tu equipo. **Nota:** Recuerda guardar tus avances y seeds antes de cerrar el navegador, puede que no se guarden una vez cerrada la sesión.

### Pestañas principales

El Builder tiene tres pestañas principales que cubren todo el flujo de desarrollo:

- **Develop**: Escribir y compilar Hooks en C
- **Deploy**: Gestionar cuentas y desplegar Hooks
- **Test**: Generar transacciones de prueba y ver logs

### Paso 1: Gestionar cuentas en Deploy

Antes de desarrollar, necesitas al menos una cuenta de testnet. En la pestaña **Deploy**:

**Crear una cuenta nueva**
1. Haz clic en **"Generate Account"** o el botón de crear cuenta
2. El Builder generará automáticamente un par de claves (dirección + seed) y fondeará la cuenta con XAH de testnet a través del faucet
3. Guarda el seed en un lugar seguro, lo necesitarás si cierras el navegador

**Importar una cuenta existente**
1. Haz clic en **"Import Account"** o el botón de importar
2. Introduce el **seed** (secret) de tu cuenta de testnet
3. La cuenta aparecerá en la lista con su balance y Hooks instalados

Es recomendable tener al menos **dos cuentas**: una para instalar el Hook y otra para enviarle transacciones de prueba. **No utilices seeds de cuentas de Xahau Mainnet en el Builder por seguridad**, si necesitas una nueva seed, genérala dentro del Builder o visita [xahau-test.net](https://xahau-test.net/).

### Paso 2: Desarrollar y compilar en Develop

En la pestaña **Develop**:

1. **Selecciona un ejemplo** del menú lateral o crea un archivo nuevo
2. **Escribe tu Hook en C**, el editor tiene resaltado de sintaxis y autocompletado básico
3. Haz clic en **"Compile To WASM"** para compilar el código C a WebAssembly
4. Si hay errores, aparecerán en la consola inferior, revisa la línea y el mensaje de error
5. Si la compilación es exitosa, recibirás el mensaje \`File xxxx.c compiled successfully. Ready to deploy.Go to deploy\`. El WASM resultante estará listo para desplegarse

**Consejos**:
- Empieza con los ejemplos incluidos para familiarizarte con la API
- Los errores de compilación más comunes son: olvidar incluir \`hookapi.h\`, no declarar el guard \`_g()\`, o errores de tipos en las funciones de la API

### Paso 3: Desplegar en Deploy

Una vez compilado tu Hook, vuelve a la pestaña **Deploy**:

1. **Selecciona la cuenta** donde quieres instalar el Hook y pulsa **Set Hook** para abrir el formulario de instalación
2. **Configura los parámetros**:
   - **Account**: la cuenta donde se instalará el Hook (ya seleccionada)
   - **Sequence**: deja que el Builder lo complete automáticamente
   - **Invoke on transactions** (HookOn): elige los tipos de transacción que activarán el Hook (puedes elegir varias)
   - **Hook Namespace Seed**: el nombre en string que quieres usar como seed para el Namespace.
   - **Hook Namespace (sha256)**: El sha256 generado a partir de la Seed utilizada en el campo anterior (no tocar).
   - **Hook Parameters**: si tu Hook usa parámetros, configúralos aquí (nombre y valor en hex)
   - **Fee**: pulsa en **Suggest** si el Hook da error de fee insuficiente, el Builder calculará el fee recomendado.
3. Haz clic en **"Set Hook"** para enviar la transacción \`SetHook\`
4. Confirma que el resultado es \`tesSUCCESS\` en la consola

### Paso 4: Probar en Test

La pestaña **Test** es donde verificas que tu Hook funciona correctamente:

1. **Transaction type**: Elige el tipo de transacción que quieres enviar (Payment, OfferCreate, etc.).
2. **Account**: El emisor de la transacción.
3. **Sequence**: Deja que el Builder lo complete automáticamente.
4. **Flags**: Configura los flags necesarios para la transacción.
5. **Destination**: La dirección de destino de la transacción.
6. **Amount**: El monto a enviar y el tipo (XAH o IOU), si aplica para la transacción.
7. **Fee**: Pulsa en **Suggest** para que el Builder calcule el fee recomendado.
8. **Hook parameters**: Si tu Hook usa parámetros, configúralos aquí (nombre y valor en hex).
9. **Memos**: Si tu transacción necesita memos, añádelos aquí (opcional).
10. Haz click en **Run Test**.

Deberás estar atento en las pantallas de **Development Log** y **Debug Stream**. En **Debug Stream** puedes elegir que parte del escenario quieres revisar: eligiendo la cuenta si hay varias implicadas.

**Flujo de pruebas recomendado**:

- **Casos positivos**: envía transacciones que deberían ser aceptadas y verifica que pasa.
- **Casos negativos**: envía transacciones que no deberían influir y verifica que es así.
- **Casos límite**: prueba con montos exactos al límite, transacciones de tipos no esperados, etc.
- **Casos no esperados**: prueba transacciones que no esperes por si el Hook las maneja de forma inesperada.
- **Revisa el estado**: si tu Hook usa \`state()\`, verifica que los valores se guardan correctamente consultando \`account_objects\` o la información de estado en el Builder

Una gran y consistente batería de pruebas es clave para asegurar que tu Hook se comporta correctamente en todas las situaciones. Si puedes, pide a otras personas que tambièn prueben tu Hook con casos que tú no hayas considerado.

### Limitaciones del Builder

- Solo funciona con **Xahau Testnet**, no con Mainnet
- Para desarrollo más avanzado o despliegue en producción, necesitarás un entorno local
- El estado de tus cuentas y Hooks se mantiene entre sesiones si no limpias el navegador. No suele ocurrir lo mismo con los Hooks.`,
        en: "",
        jp: "",
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "Hooks Builder — Pestañas", en: "", jp: "" },
          content: {
            es: "builder.xahau.network\n\n📝 Develop — Escribir y compilar Hooks\n🚀 Deploy — Gestionar cuentas y desplegar\n🧪 Test — Probar con transacciones reales\n\nTodo desde el navegador, sin instalar nada",
            en: "",
            jp: "",
          },
          visual: "🌐",
        },
        {
          title: { es: "Flujo de trabajo en el Builder", en: "", jp: "" },
          content: {
            es: "1. Deploy → Crear o importar cuentas de testnet\n2. Develop → Escribir Hook en C y compilar\n3. Deploy → Instalar Hook en la cuenta\n4. Test → Enviar transacciones de prueba\n5. Revisar logs y mensajes del Hook",
            en: "",
            jp: "",
          },
          visual: "🔄",
        },
        {
          title: { es: "Pestaña Test — Verificar tu Hook", en: "", jp: "" },
          content: {
            es: "• Seleccionar cuenta de origen (distinta al Hook)\n• Elegir tipo de transacción\n• Configurar campos y enviar\n• Revisar logs: accept(), rollback(), trace()\n\nProbar: caso positivo, negativo y límites",
            en: "",
            jp: "",
          },
          visual: "🧪",
        },
      ],
    },
    {
      id: "m8l7",
      title: {
        es: "Desarrollo local de Hooks con hooks-cli",
        en: "",
        jp: "",
      },
      theory: {
        es: `Para desarrollo profesional, despliegue en **Xahau Mainnet** o proyectos que requieran mayor control, necesitas un entorno de desarrollo local. La herramienta principal es [hooks-cli](https://github.com/Xahau/hooks-cli), una CLI oficial que permite compilar Hooks en C a WebAssembly desde tu terminal.

### ¿Qué es hooks-cli?

**hooks-cli** es una herramienta de línea de comandos que simplifica todo el proceso de compilación de Hooks:

- Compila código C a WebAssembly (.wasm) listo para desplegar
- Incluye todas las dependencias necesarias (compilador, headers, hookapi.h)
- No necesitas configurar manualmente clang, wasm-ld ni las cabeceras del API de Hooks
- Funciona en macOS, Linux y Windows

### Instalación

\`\`\`bash
# Instalar hooks-cli globalmente con npm
npm install -g hooks-cli
\`\`\`

Una vez instalado, el comando \`hooks-cli\` estará disponible en tu terminal.

### Crear carpeta de tu proyecto Hook

\`\`\`bash
# Crear una carpeta para tu proyecto Hook
hooks-cli init c mi-proyecto-hook
\`\`\`

El comando generará una estructura básica de proyecto con un ejemplo de Hook en C, un archivo .env para configuración, y archivos de configuración de TypeScript y npm:

\`\`\`bash
mi-proyecto-hook/
├── contracts/
│   ├── base.c
├── .env
├── package.json
├── tsconfig.json
└── src/
    └── index.ts
\`\`\`

### Instalar dependencias de tu proyecto

\`\`\`bash
# Crear una carpeta para tu proyecto Hook
cd mi-proyecto-hook
yarn install
\`\`\`

Dentro de esta carpeta, puedes organizar tu código fuente, archivos compilados y scripts de despliegue como prefieras. Una estructura común es tener una carpeta \`src/\` para el código C, una carpeta \`build/\` para los archivos .wasm compilados, y una carpeta \`scripts/\` para scripts de despliegue.

### Compilar un Hook

Para compilar un archivo C a WebAssembly (.wasm):

\`\`\`bash
# Compilar un Hook
yarn run build

#Otra opción
# hooks-cli compile-c contracts build/
# El resultado será my_hook.wasm en el /build de tu proyecto
\`\`\`

El archivo \`.wasm\` resultante es el binario que desplegarás en Xahau usando una transacción \`SetHook\`.

### Despliegue del Hook en Xahau

Una vez tengamos nuestro Hook en formato .wasm, necesitamos desplegarlo en Xahau. Para automatizar este proceso, puedes usar la librería \`xahau\` y generar una transacción \`SetHook\` que incluya el código del Hook en formato .wasm:

\`\`\`javascript
const createHook = {
      "TransactionType": "SetHook",
      "Account": mywallet.address,
      "Flags": 0,
      "Hooks": [
        {
          "Hook": {
            "CreateCode": fs.readFileSync('base.wasm').toString('hex').toUpperCase(),
            "HookOn": 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF', //https://richardah.github.io/xrpl-hookon-calculator/
            "HookCanEmit": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFFBFFFFF", //Can emit ClaimReward
            "HookNamespace": crypto.createHash('sha256').update('base').digest('hex').toUpperCase(),
            "Flags": 1,
            "HookApiVersion": 0
          }
        }
      ],
    };
\`\`\`


### Referencia y documentación

Para información completa sobre hooks-cli, opciones avanzadas de compilación y la API completa de Hooks, consulta:

- **hooks-cli**: [github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli) — Repositorio oficial con instrucciones de instalación y uso
- **Hooks Toolkit**: [hooks-toolkit.com](https://hooks-toolkit.com/) — Documentación completa del toolkit, incluye guías, referencia de la API de Hooks (\`hookapi.h\`), ejemplos y herramientas adicionales para el desarrollo de Hooks`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Script de despliegue de un Hook en .wasm",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function createHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const mywallet = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Comprar el URIToken pagando el precio de venta
      const createHook = {
      "TransactionType": "SetHook",
      "Account": mywallet.address,
      "Flags": 0,
      "Hooks": [
        {
          "Hook": {
            "CreateCode": fs.readFileSync('base.wasm').toString('hex').toUpperCase(),
            "HookOn": 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF', //https://richardah.github.io/xrpl-hookon-calculator/
            "HookCanEmit": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFFBFFFFF", //Can emit ClaimReward
            "HookNamespace": crypto.createHash('sha256').update('base').digest('hex').toUpperCase(),
            "Flags": 1,
            "HookApiVersion": 0
          }
        }
      ],
    };

  const prepared = await client.autofill(createHook);
  const signed = mywallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡La instalación del Hook fue exitosa! para ", mywallet.address);  }

  await client.disconnect();
}

createHook();`,
        },
      ],
      slides: [
        {
          title: { es: "hooks-cli — Compilación local", en: "", jp: "" },
          content: {
            es: "Herramienta oficial para compilar Hooks\n\nnpm install -g hooks-cli\nhooks-cli build my_hook.c\n\n• Compila C → WebAssembly\n• Incluye todas las dependencias\n• macOS, Linux y Windows",
            en: "",
            jp: "",
          },
          visual: "🔨",
        },
        {
          title: { es: "Estructura de proyecto", en: "", jp: "" },
          content: {
            es: "mi-proyecto-hook/\n├── src/my_hook.c\n├── build/my_hook.wasm\n├── scripts/deploy.js\n├── package.json\n└── .env\n\nFlujo: escribir → compilar → desplegar → probar",
            en: "",
            jp: "",
          },
          visual: "📁",
        },
        {
          title: { es: "Recursos de referencia", en: "", jp: "" },
          content: {
            es: "• hooks-cli: github.com/Xahau/hooks-cli\n  Repositorio oficial y guía de uso\n\n• Hooks Toolkit: hooks-toolkit.com\n  Documentación completa, API reference y ejemplos\n\n• Builder (testnet): builder.xahau.network",
            en: "",
            jp: "",
          },
          visual: "📚",
        },
      ],
    },
  ],
}
