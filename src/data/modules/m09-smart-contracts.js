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

Los Hooks son como **filtros** o **interceptores** que reaccionan a las transacciones. Pueden:
- **Aceptar** la transacción (\`accept()\`)
- **Rechazar** la transacción (\`rollback()\`)
- **Emitir** nuevas transacciones (\`emit()\`)
- **Leer y escribir** estado persistente (\`state()\`, \`state_set()\`)

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
La forma más rápida de empezar. [hooks-builder.xrpl.org](https://hooks-builder.xrpl.org) te permite escribir, compilar y desplegar Hooks desde el navegador.

**2. Desarrollo local**
Para desarrollo local necesitas:
- **Compilador C** (clang)
- **wasm-cc**: Compilador de C a WebAssembly para Hooks
- **Node.js**: Para scripts de despliegue con \`xahau\`

### Transacción SetHook

La transacción \`SetHook\` instala, actualiza o elimina Hooks de tu cuenta:

- **CreateCode**: El binario WASM del Hook (en hexadecimal)
- **HookOn**: Máscara de bits que define qué tipos de transacción activan el Hook
- **HookNamespace**: Espacio de nombres para el estado del Hook (32 bytes hex)
- **HookApiVersion**: Versión de la API de Hooks (actualmente 0)
- **HookParameters**: Parámetros de configuración opcionales

### HookOn — Filtro de transacciones

El campo \`HookOn\` es una máscara de bits invertida que controla en qué tipos de transacción se activa el Hook:
- \`"0000000000000000"\` → Se activa en TODOS los tipos de transacción
- Puedes configurar bits específicos para activar o desactivar tipos

### Límites

- Máximo **10 Hooks** por cuenta
- Cada Hook tiene su propio **namespace** para estado
- El WASM tiene un tamaño máximo permitido`,
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
- Cada Hook puede tener su propio \`HookOn\` para activarse solo en ciertos tipos de transacción

### HookOn — Control granular

El campo \`HookOn\` es una **máscara de bits** que define qué tipos de transacción activan el Hook:

- \`"0000000000000000"\` → Se activa en **todos** los tipos
- Cada bit corresponde a un tipo de transacción
- Puedes configurar Hooks para que solo reaccionen a pagos, ofertas, etc.

### Actualizar un Hook

Para actualizar un Hook existente, envías una nueva transacción \`SetHook\` con el nuevo \`CreateCode\` (WASM) en la misma posición.

### Eliminar un Hook

Para eliminar un Hook de una posición, envías \`SetHook\` con un objeto Hook vacío (\`{}\`) en esa posición, junto con el flag de eliminación.

### Limpiar estado (Namespace reset)

Al eliminar un Hook o cambiar su namespace, puedes limpiar todo el estado almacenado. Esto es útil para "resetear" un Hook sin necesidad de limpiarlo manualmente clave por clave.`,
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
  ],
}
