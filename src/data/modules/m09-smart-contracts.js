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
- \`cbak(uint32_t reserved)\` — Se ejecuta como callback de transacciones emitidas por el Hook. Es opcional

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
    // Callback vacío (Se puede omitir la declaracion cback si no se necesita)
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
          title: { es: "Hooks vs Smart Contracts EVM", en: "", jp: "" },
          content: {
            es: "Smart contracts nativos de Xahau\n\n• Escritos en C, compilados a WebAssembly\n• Modelo reactivo (no se invocan, reaccionan)\n• Fees fijos y bajos (no gas variable)\n• Estado aislado con namespaces\n• Despliegue con transacción SetHook",
            en: "",
            jp: "",
          },
          visual: "🪝",
        },
        {
          title: { es: "Modelo reactivo y funciones", en: "", jp: "" },
          content: {
            es: "EVM: Tú llamas al contrato\nHooks: Se ejecutan automáticamente\n\n• accept() → Aceptar transacción\n• rollback() → Rechazar transacción\n• emit() → Emitir nueva transacción\n• state() / state_set() → Estado persistente\n\nhook() obligatoria | cbak() opcional | _g() guard",
            en: "",
            jp: "",
          },
          visual: "⚡",
        },
        {
          title: { es: "Datos clave sobre Hooks", en: "", jp: "" },
          content: {
            es: "• Hasta 10 Hooks por cuenta\n• Cada Hook tiene su propio namespace\n• Puede acceder a namespaces ajenos con permisos\n• WASM deduplicado: mismo codigo = mismo hash\n• Instalar por HookHash sin acceso al codigo fuente",
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

### Desplegar un Hook

Una vez que tienes un hook listo para desplegar, el proceso general es generar una transacción \`SetHook\` con los campos adecuados, firmarla y enviarla a la red. El campo principal para el código del Hook es \`CreateCode\`, donde debes incluir el binario WASM en formato hexadecimal si es la primera vez que este Hook va a existir en la red.

Los entornos de prueba como [Hooks Builder](https://builder.xahau.network) te permiten compilar el código y subirlo usando un interfaz gráfico. Existen otros entornos graficos para tanto Xahau Testnet como Mainnnet, que te obligarán a usar tu seed para firmar la transacción de despliegue, como [xahau-testnet.xrplwin.com/tools](https://xahau-testnet.xrplwin.com/tools). Solo se recomienda utilizarlos en entorno de pruebas. Como práctica habitual, se recomienda aprender a utilizar la transacción \`SetHook\` con scripts personalizados usando la librería de \`xahau js\`, para posteriormente poder automatizar despliegues, actualizaciones y gestión de Hooks en producción.

### Transacción SetHook

La transacción \`SetHook\` es la única transacción necesaria para gestionar Hooks. Con ella puedes **instalar**, **actualizar** y **eliminar** Hooks de tu cuenta. Los campos principales del objeto Hook dentro del array \`Hooks\` son:

| Campo | Descripción |
|---|---|
| \`CreateCode\` | El binario WASM del Hook (en hexadecimal) |
| \`HookHash\` | Hash del Hook ya existente en el ledger (alternativa a CreateCode) |
| \`HookOn\` | Cadena que define qué tipos de transacción activan el Hook |
| \`HookNamespace\` | Nombre para el estado del Hook (32 bytes hex) |
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

### 3. Actualizar un Hook (Update Operation)

La operación de actualización se activa cuando el Hook ya existe en la posición, **no** se envía \`HookHash\` ni \`CreateCode\`, y se incluye al menos uno de estos campos: \`HookNamespace\`, \`HookParameters\` o \`HookGrants\`. Esto permite modificar la configuración del Hook **sin reemplazar el código WASM**.

**Lo que puedes modificar**:

- **HookNamespace**: Si envías un \`HookNamespace\` diferente al actual, el namespace del Hook se actualiza. Si además incluyes el flag \`hsfNSDelete\` (valor 2), **todas las entradas de estado del namespace anterior se eliminan**.
- **HookParameters**: Para cada entrada en \`HookParameters\`:
  - Si envías un parámetro con nombre y **sin valor**, ese parámetro se **elimina** del Hook
  - Si envías un parámetro con nombre **y valor**, se **añade o actualiza** ese parámetro
- **HookGrants**: Si incluyes \`HookGrants\`, el array completo de grants del Hook se **reemplaza** por el nuevo array proporcionado

\`\`\`
// Ejemplo: actualizar solo los parámetros de un Hook existente
Hook: {
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "4D494E",        // "MIN"
        HookParameterValue: "00E1F505"      // Nuevo valor
      }
    },
    {
      HookParameter: {
        HookParameterName: "4D4158",        // "MAX" — eliminar
        // Sin HookParameterValue = se elimina
      }
    }
  ]
}
\`\`\`

**Para reemplazar completamente un Hook** por otro código WASM diferente, envía un nuevo \`SetHook\` con \`CreateCode\` (o \`HookHash\`) en la misma posición y el flag \`hsfOverride\` (valor 1). El estado previo del Hook se **mantiene** si el namespace no cambia.

### 4. Eliminar un Hook (Delete Operation)

Para eliminar un Hook de una posición, deben cumplirse estas condiciones: el Hook debe existir en esa posición, el flag \`hsfOverride\` debe estar activo, **no** se envía \`HookHash\`, y \`CreateCode\` debe estar presente pero **vacío**:

\`\`\`
Hook: {
  CreateCode: "",       // Vacío = eliminar
  Flags: 1,             // hsfOverride
}
\`\`\`

Al eliminar:
- El **contador de referencias** del \`HookDefinition\` se decrementa. Si llega a cero (ninguna otra cuenta usa ese código), la definición se elimina del ledger
- El objeto Hook en esa posición se **elimina**, dejando la posición vacía

Si además quieres **limpiar todo el estado** del namespace de ese Hook, añade el flag \`hsfNSDelete\` (valor 2) combinado con \`hsfOverride\`: \`Flags: 3\`. Esto eliminará todas las entradas de \`HookState\` del namespace asociado.

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
            es: "Desplegar un Hook desde fichero .wasm con xahau.js",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Tu cuenta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Leer el WASM compilado del Hook
  const wasmBytes = fs.readFileSync("base.wasm"); // Utiliza el nombre del fichero .wasm que quieres desplegar
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // Construir la transacción SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64), // Todos los tipos de tx
          HookCanEmit: "0".repeat(64), // Todos los tipos de tx
          HookNamespace: "0".repeat(64), // Namespace por defecto
          HookApiVersion: 0,
          Flags: 1, // Flag hsfOVERRIDE para que el nuevo hook reemplace cualquier hook anterior en la cuenta
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Hook desplegado con éxito en la cuenta!", account.address);
  }

  await client.disconnect();
}

deployHook();`,
        },{
          title: {
            es: "Borrar un Hook de una cuenta con xahau.js",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Tu cuenta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Construir la transacción SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "", // Si está vacío, se asume que quieres borrar el hook que está en esta posición del array.
          Flags: 1, // Flag hsfOVERRIDE para que el nuevo hook reemplace cualquier hook anterior en la cuenta
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Hook eliminado con éxito en la cuenta!", account.address);
  }

  await client.disconnect();
}

removeHook();`,
        },
        {
          title: {
            es: "Instalar un Hook con el HookHash con xahau.js",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Tu cuenta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Construir la transacción SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227", // El hash del hook que queremos instalar. Es necesario que se haya instalado previamente y esté disponible en la red en la que trabajamos.
          HookOn: "0".repeat(64), // Todos los tipos de tx
          HookCanEmit: "0".repeat(64), // Todos los tipos de tx
          HookNamespace: "0".repeat(64), // Namespace por defecto
          Flags: 1, // Flag hsfOVERRIDE para que el nuevo hook reemplace cualquier hook anterior en la cuenta
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Hook desplegado con éxito en la cuenta!", account.address);
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
  console.log(\`Total instalados: \${hooks.length}\n\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); //Si quieres ver toda la info del hook, descomenta esta línea

    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;

      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit}\`);
    }

    console.log();
  }

  await client.disconnect();
}
// Una dirección de ejemplo con un Hook en Testnet: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
checkHooks("rTuDireccionAqui");`,
        },
      ],
      slides: [
        {
          title: { es: "SetHook: campos principales", en: "", jp: "" },
          content: {
            es: "Transaccion unica para gestionar Hooks\n\n• CreateCode: WASM en hex\n• HookHash: instalar Hook existente por hash\n• HookOn: filtro de transacciones\n• HookNamespace: aislamiento de estado\n• HookParameters: configuracion sin recompilar\n• HookCanEmit: control de emisiones (seguridad)\n• Flags: hsfOverride | hsfNSDelete | hsfCollect",
            en: "",
            jp: "",
          },
          visual: "⚙️",
        },
        {
          title: { es: "4 fases de gestion de un Hook", en: "", jp: "" },
          content: {
            es: "1. Instalar (CreateCode) → WASM completo\n2. Instalar por HookHash → sin enviar WASM\n3. Actualizar (Update) → modificar namespace,\n   parametros o grants sin cambiar codigo\n4. Eliminar (Delete) → CreateCode vacio\n   + hsfOverride. hsfNSDelete limpia estado",
            en: "",
            jp: "",
          },
          visual: "🔄",
        },
        {
          title: { es: "HookOn y HookCanEmit", en: "", jp: "" },
          content: {
            es: "HookOn: que transacciones activan el Hook\nHookCanEmit: que transacciones puede emitir\n\n• Ambos usan la misma calculadora\n• Resultado hex sin 0x, en mayusculas\n• Principio de minimo privilegio\n• HookCanEmit opcional pero recomendado",
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
        es: `Los Hooks pueden almacenar **datos persistentes** entre ejecuciones usando el sistema de estado (\`state\`). Esto permite que un Hook tenga información disponible con la que trabajar en uno o varios \`Namespace\`.

### Estructura del estado

El Namespace se identifica con 32 bytes (256 bits) en hexadecimal. El estado se organiza como pares **clave-valor**:

- **Clave**: 32 bytes (256 bits). Si tu clave es más corta, se rellena con ceros
- **Valor**: hasta 256 bytes por entrada
- Cada entrada de estado se identifica por su clave dentro de un **Namespace**

### Limitaciones

- Una cuenta puede almacenar un máximo de 256 namespaces.
- Los registros de clave-valor dependerá de tus reservas de XAH.

### Funciones de estado

Estas son algunas funciones que podemos utilizar para leer o escribir información en \`Namespace\`.

- [state_set()](https://xahau.network/docs/hooks/functions/state/state/): Lee un valor del estado usando una clave
- [state_set()](https://xahau.network/docs/hooks/functions/state/state_set/): Escribe un valor en el estado para una clave
- [state_foreign()](https://xahau.network/docs/hooks/functions/state/state_foreign/): Lee el estado de un \`Namespace\`que no es el propio.
- [state_foreign_set()](https://xahau.network/docs/hooks/functions/state/state_foreign_set/): Escribe un valor en el estado de un \`Namespace\`que no es el propio.

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
      ],
      slides: [
        {
          title: { es: "Sistema de estado en Hooks", en: "", jp: "" },
          content: {
            es: "Datos persistentes entre ejecuciones\n\n• state() → Leer valor por clave\n• state_set() → Escribir valor\n• state_foreign() → Leer estado de otra cuenta\n\nClave: 32 bytes | Valor: hasta 256 bytes\nCada entrada vive dentro de un namespace",
            en: "",
            jp: "",
          },
          visual: "💾",
        },
        {
          title: { es: "Namespace y aislamiento", en: "", jp: "" },
          content: {
            es: "HookNamespace (32 bytes hex):\n\n• Aisla el estado de cada Hook\n• Distinto namespace = estado separado\n• Mismo namespace = estado compartido\n• Se define al instalar con SetHook\n\nstate_foreign() lee estado ajeno (solo lectura)",
            en: "",
            jp: "",
          },
          visual: "🔒",
        },
        {
          title: { es: "Usos practicos del estado", en: "", jp: "" },
          content: {
            es: "• Contadores de transacciones\n• Listas blancas / negras de direcciones\n• Configuracion dinamica del Hook\n• Tracking: ultima tx, timestamps\n• Acumuladores y balances internos",
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

1. **\`etxn_reserve(N)\`**: Reservar espacio para N emisiones
2. **Construir la transacción**: Llenar un buffer con los campos de la transacción serializada
3. **\`etxn_details()\`**: Preparar los detalles de emisión (genera el hash de emisión)
4. **\`emit()\`**: Enviar la transacción al ledger

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
- Las emisiones aumentan la carga computacional del Hook

### Enlaces útiles

- [Xahau Hooks 101](https://github.com/Handy4ndy/XahauHooks101): Una colección de hooks básicos para aprender a programar Hooks, entre ellos varios ejemplos de emisión por [@handy_andy](https://x.com/Handy_4ndy).
- [Xahau Hook Tx Builder](https://tx-builder.xahau.tools/): Un traductor de transacciones JSON a lenguaje C para Hooks por [@_tequ_](https://x.com/_tequ_).

`,
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
 * Hook: ten_percent_forwarder.c
 *
 * Cuando la cuenta recibe un pago en XAH, reenvía automáticamente
 * el 10% a la dirección hardcodeada en forward_to[].
 *
 * ── Cómo configurar la dirección destino ─────────────────────────────────
 * La dirección debe estar en formato Account ID (20 bytes en hex),
 * NO en formato rAddress. Para convertir usa una de estas herramientas:
 *   https://hooks.services/tools/raddress-to-accountid
 *   https://transia-rnd.github.io/xrpl-hex-visualizer/
 *
 * Ejemplo:
 *   rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
 *   → 4B50699E253C5098DEFE3A0872A79D129172F496
 *   → { 0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U }
 * ─────────────────────────────────────────────────────────────────────────
 */

int64_t hook(uint32_t reserved)
{
    //Las iteraciones de nuestro Hook, en este caso solo 1, ya que solo emitiremos una transacción y no tenemos bucles
    _g(1, 1);
    // Reservar espacio para 1 emisión
    etxn_reserve(1);

    // Dirección destino del 10% — reemplaza estos bytes con los de tu cuenta
    // rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r - Saca tu traducción en https://hooks.services/tools/raddress-to-accountid
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };

    // Solo procesar pagos (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: no es un pago"), __LINE__);

    // Obtener el destino de la transacción entrante
    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: no se pudo leer el destino"), __LINE__);

    // Obtener el Account ID de la cuenta que tiene el Hook instalado
    unsigned char hook_accid[20];
    hook_account(SBUF(hook_accid));

    // Solo actuar si el Hook es el destinatario del pago (pago entrante)
    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: pago saliente, ignorar"), __LINE__);

    // Leer el Amount — XAH nativo ocupa exactamente 8 bytes
    unsigned char amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: no es XAH nativo"), __LINE__);

    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);

    // Calcular el 10%
    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);

    if (drops_to_forward < 1)
        accept(SBUF("forwarder: importe demasiado pequeño"), __LINE__);

    // Preparar y emitir el pago del 10%
    unsigned char tx[PREPARE_PAYMENT_SIMPLE_SIZE];
    PREPARE_PAYMENT_SIMPLE(tx, drops_to_forward, forward_to, 0, 0);

    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));

    if (emit_result < 0)
        rollback(SBUF("forwarder: error al emitir el pago"), __LINE__);

    accept(SBUF("forwarder: 10% reenviado correctamente"), __LINE__);
    return 0;
}`,
        },
        
      ],
      slides: [
        {
          title: { es: "emit() — Transacciones autonomas", en: "", jp: "" },
          content: {
            es: "Los Hooks pueden crear transacciones nuevas\n\n• emit() envia transacciones al ledger\n• Se ejecutan como si la cuenta las enviara\n• Pagos, ofertas, cualquier tipo soportado\n• etxn_reserve(N) obligatorio antes de emitir",
            en: "",
            jp: "",
          },
          visual: "📤",
        },
        {
          title: { es: "Flujo de emision", en: "", jp: "" },
          content: {
            es: "1. etxn_reserve(N) → Reservar espacio\n2. Construir tx serializada en buffer\n3. etxn_details() → Preparar detalles\n4. emit() → Enviar al ledger\n\ncbak() se ejecuta cuando la emision\ncompleta (exito o fallo)",
            en: "",
            jp: "",
          },
          visual: "📝",
        },
        {
          title: { es: "Casos de uso y limitaciones", en: "", jp: "" },
          content: {
            es: "Casos de uso:\n• Auto-forwarding de pagos\n• Splitting entre varias cuentas\n• Refunds automaticos\n• Acciones programadas\n\nLimitaciones:\n• Maximo de emisiones por ejecucion\n• Fees propios por emision\n• _g() previene emisiones infinitas",
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
        es: "Parámetros, funciones y gestión de Hooks",
        en: "",
        jp: "",
      },
      theory: {
        es: `Los Hooks disponen de múltiples funciones con propósitos distintos y de gestión. En esta lección veremos algunos de ellos.

### otxn_param() Parámetros de la transacción que para el Hook

\`otxn_param()\` lee parámetros incluidos **en la transacción que está ejecutando el Hook** en ese preciso momento (la transacción originante). A diferencia de \`hook_param\`, estos valores los envía quien realiza la transacción y **cambian en cada llamada**.

\`\`\`c
// Firma de la función
int64_t otxn_param(
    uint32_t write_ptr,  // buffer donde escribir el valor
    uint32_t write_len,  // tamaño del buffer (≥ 32 bytes recomendado)
    uint32_t read_ptr,   // buffer con el nombre del parámetro
    uint32_t read_len    // longitud del nombre
);
\`\`\`

**¿Cuándo usar otxn_param?**
- Datos dinámicos que el emisor quiere pasar al Hook en cada transacción
- Instrucciones de acción: "modo de operación", "identificador de referencia", "código de autorización"
- Cualquier valor que dependa de la transacción concreta, no de la configuración del Hook

### Diferencia clave entre hook_param y otxn_param

| | \`hook_param()\` | \`otxn_param()\` |
|---|---|---|
| **Origen** | SetHook (instalación) | Transacción que activa el Hook |
| **Quién lo pone** | El instalador del Hook | El emisor de cada tx |
| **Cuándo cambia** | Solo al actualizar el Hook | En cada transacción |
| **Uso típico** | Configuración estática | Instrucciones dinámicas |

### Cómo incluir HookParameters en una transacción desde JavaScript

Los parámetros de transacción se añaden en el campo \`HookParameters\` de cualquier tx que active el Hook. El nombre y el valor deben estar en hexadecimal:

\`\`\`javascript
// Nombre "ACCION" (hex: 414343494F4E) con valor "01" (hex)
const tx = {
  TransactionType: "Payment",
  Account: wallet.address,
  Destination: hookAccount,
  Amount: "1000000",
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "414343494F4E",  // "ACCION"
        HookParameterValue: "01",
      },
    },
  ],
};
\`\`\`

### Recursos para hacer tu vida más sencilla usando Hooks

A lo largo de tus primeros pasos desarrollando Hooks, te encontrarás con necesidades como traducir parámetros a valores legibles. Aquí tienes algunas páginas útiles:
- [Calculadora de HookOn](https://richardah.github.io/xrpl-hookon-calculator/): Calcula fácilmente el campo HookOn y HookCanEmit
- [Visualizador HEX](https://transia-rnd.github.io/xrpl-hex-visualizer/): Traduce strings a hex y viceversa en múltiples formatos
- [Visualizador de tiempo](https://transia-rnd.github.io/xrpl-time-visualizer/): Traduce entre el formato de tiempo de Xahau (Ripple Epoch) y fechas legibles
- [Servicios Hooks](https://hooks.services/): Traductores de valores y formatos relacionados con Hooks
- [Constructor de Transacciones](https://tx-builder.xahau.tools/): Genera código C para transacciones a emitir a partir de su JSON
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools): Herramientas visuales para instalar y gestionar Hooks`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Hook que lee un otxn_param y lo muestra con TRACE",
            en: "",
            jp: "",
          },
          language: "c",
          code: `#include "hookapi.h"

/**
 * Hook: otxn_param_demo.c
 *
 * Lee el parámetro "ACCION" de la transacción que activa el Hook
 * y muestra su valor por el Debug Stream con trace().
 *
 * Para probarlo, envía una transacción con HookParameters:
 *   HookParameterName:  "414343494F4E"  (= "ACCION" en hex)
 *   HookParameterValue: "01"            (cualquier valor hex)
 *
 * Convierte strings a hex en: https://hooks.services/tools/string-to-hex
 */

int64_t hook(uint32_t reserved)
{
    // Guard obligatorio: (id_iteracion, max_iteraciones)
    // Como no hay bucles en este Hook, basta con _g(1, 1)
    _g(1, 1);

    // Traza de inicio con 4 argumentos: (label_ptr, label_len, data_ptr, data_len, as_hex)
    // Cuando data_ptr y data_len son 0, solo se imprime la etiqueta
    trace(SBUF("otxn_param_demo: hook() iniciado"), 0, 0, 0);

    // ── Definir el nombre del parámetro a buscar ──────────────────────────────
    // "ACCION" en ASCII: A=41 C=43 C=43 I=49 O=4F N=4E
    // Usa https://hooks.services/tools/string-to-hex para convertir tus propios nombres
    uint8_t param_name[]    = { 0x41U, 0x43U, 0x43U, 0x49U, 0x4FU, 0x4EU };

    // Buffer de salida donde otxn_param() escribirá el valor encontrado (máx. 32 bytes)
    uint8_t param_value[32] = { 0 };

    // ── Leer el parámetro de la transacción originante ────────────────────────
    // otxn_param() busca en los HookParameters de la tx que activó este Hook.
    // Devuelve: bytes escritos (>0) si encontrado | negativo si error o no existe
    int64_t value_len = otxn_param(
        SBUF(param_value),   // buffer donde se escribe el valor del parámetro
        SBUF(param_name)     // nombre del parámetro que queremos leer
    );

    // ── Trazar el nombre del parámetro buscado ────────────────────────────────
    // TRACEVAR muestra el nombre de la variable y su contenido como valor numérico
    TRACEVAR(param_name);
    // TRACEHEX muestra el contenido del buffer en formato hexadecimal
    // Verás: 414343494F4E → que corresponde a "ACCION"
    TRACEHEX(param_name);

    // ── Trazar el valor recibido ──────────────────────────────────────────────
    // TRACEVAR del valor — útil para ver si el buffer tiene algo o está a ceros
    TRACEVAR(param_value);
    // TRACEHEX del valor — muestra los bytes exactos que envió el emisor de la tx
    TRACEHEX(param_value);

    // ── Mostrar el valor en dos formatos con trace() de 5 argumentos ─────────
    // trace(label_ptr, label_len, data_ptr, data_len, as_hex)
    //   as_hex = 0 → interpreta data como texto ASCII (legible si el valor es texto)
    //   as_hex = 1 → muestra data como cadena hexadecimal (siempre legible)

    // Como texto: útil cuando el valor es un string ("ON", "OFF", "MODO1", etc.)
    trace(SBUF("otxn_param_demo: valor ACCION (texto): "), SBUF(param_value), 0);

    // Como hex: siempre muestra los bytes exactos, ideal para valores binarios
    trace(SBUF("otxn_param_demo: valor ACCION (hex): "),   SBUF(param_value), 1);

    // Acepta la transacción. __LINE__ indica el número de línea exacto en el log,
    // lo que facilita saber por qué camino salió el Hook en el Debug Stream
    accept(SBUF("otxn_param_demo: parametro leido y trazado"), __LINE__);
    return 0;
}`,
        },
        {
          title: {
            es: "Enviar una transacción con HookParameters desde JavaScript",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function enviarConParametro() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // La cuenta que tiene el Hook instalado (puede ser la misma u otra)
  const HOOK_ACCOUNT = "rDireccionConHookAqui";

  // Convertir el nombre y valor del parámetro a hexadecimal
  // "ACCION" → 414343494F4E  (usa https://hooks.services/tools/string-to-hex)
  const paramName  = Buffer.from("ACCION").toString("hex").toUpperCase();
  const paramValue = "01"; // Valor 01 = modo activado

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000", // 1 XAH en drops
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,   // "414343494F4E"
          HookParameterValue: paramValue,  // "01"
        },
      },
    ],
  };

  console.log("Enviando Payment con HookParameters...");
  console.log("  Nombre param (hex): ", paramName, " = ACCION");
  console.log("  Valor param  (hex): ", paramValue);

  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("TX enviada. Revisa el Debug Stream en Hooks Builder");
    console.log("Deberías ver las trazas del Hook con el valor del parámetro.");
  }

  await client.disconnect();
}

// Enviar con acción 01
enviarConParametro();`,
        },
        {
          title: {
            es: "Script para instalar el Hook con hook_param de configuración",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs   = require("fs");
const crypto = require("crypto");

async function deployHookWithParams() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  const wasmBytes  = fs.readFileSync("./build/otxn_param_demo.wasm");
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // Namespace a partir del nombre del Hook (SHA-256)
  const namespace = crypto
    .createHash("sha256")
    .update("otxn_param_demo")
    .digest("hex")
    .toUpperCase();

  // HookParameters de configuración (hook_param, NO otxn_param):
  // Estos se almacenan junto al Hook y se leen con hook_param() desde el C
  // "CFG" en hex = 434647
  const cfgName  = Buffer.from("CFG").toString("hex").toUpperCase();
  const cfgValue = "FF"; // valor de configuración de ejemplo

  const setHook = {
    TransactionType: "SetHook",
    Account: wallet.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64),
          HookNamespace: namespace,
          HookApiVersion: 0,
          Flags: 1,
          // Estos son los hook_param (config estática)
          HookParameters: [
            {
              HookParameter: {
                HookParameterName:  cfgName,   // "CFG"
                HookParameterValue: cfgValue,
              },
            },
          ],
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado SetHook:", result.result.meta.TransactionResult);
  console.log("Namespace:", namespace);
  console.log("hook_param 'CFG' configurado con valor:", cfgValue);
  console.log("");
  console.log("Ahora puedes enviar transacciones con otxn_param 'ACCION'");
  console.log("y el Hook los leerá con otxn_param() en tiempo de ejecucion.");

  await client.disconnect();
}

deployHookWithParams();`,
        },
      ],
      slides: [
        {
          title: { es: "hook_param vs otxn_param", en: "", jp: "" },
          content: {
            es: "Dos sistemas de parámetros distintos:\n\nhook_param() — configuración estática\n• Se define en SetHook al instalar\n• Almacenado junto al Hook en el ledger\n• Cambia solo al actualizar el Hook\n• Ideal para umbrales, direcciones fijas\n\notxn_param() — datos dinámicos\n• Viene en la transacción que activa el Hook\n• Lo envía el emisor de cada tx\n• Cambia en cada ejecución\n• Ideal para instrucciones, modos, referencias",
            en: "",
            jp: "",
          },
          visual: "🎛️",
        },
        {
          title: { es: "otxn_param: firma y retornos", en: "", jp: "" },
          content: {
            es: "int64_t otxn_param(\n  write_ptr, write_len,  // buffer salida\n  read_ptr,  read_len    // nombre del param\n);\n\nRetornos:\n• > 0 → bytes escritos (encontrado)\n• DOESNT_EXIST → no está en la tx\n• TOO_SMALL → nombre vacío\n• TOO_BIG → nombre > 32 bytes\n• OUT_OF_BOUNDS → punteros inválidos\n\nNombre y valor en HEX en la transacción",
            en: "",
            jp: "",
          },
          visual: "📨",
        },
        {
          title: { es: "Namespace y recursos", en: "", jp: "" },
          content: {
            es: "HookNamespace (32 bytes hex):\n• Distinto namespace = estado aislado\n• Mismo namespace = estado compartido\n• SHA-256 del nombre → namespace único\n\nRecursos:\n• hooks.services → string ↔ hex\n• HookOn calculator\n• Visualizador tiempo (Ripple Epoch)\n• tx-builder.xahau.tools → C desde JSON",
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
        es: "Trazabilidad y debugging de Hooks",
        en: "",
        jp: "",
      },
      theory: {
        es: `Cuando un Hook falla o se comporta de forma inesperada, necesitas una forma de **observar su ejecución interna**. El sistema de Hooks proporciona tres funciones de traza que emiten mensajes visibles en el **Debug Stream** de Hooks Builder y en los logs del nodo \`xahaud\`.

### trace() — Mensaje de texto o buffer en hexadecimal

La función más general. Emite un mensaje de cadena o el contenido de un buffer en formato hex.

\`\`\`c
// Emitir un mensaje de texto plano
trace(SBUF("hook iniciado correctamente"), 0);  // 0 = mostrar como string

// Emitir el contenido de un buffer en hexadecimal
uint8_t account_buf[20];
otxn_field(SBUF(account_buf), sfAccount);
trace(SBUF(account_buf), 1);                    // 1 = mostrar como hex
\`\`\`

El tercer argumento controla el formato de salida:
- \`0\` → imprime el buffer como texto (útil para mensajes)
- \`1\` → imprime el buffer como hexadecimal (útil para datos binarios: cuentas, hashes, buffers de transacciones)

### trace_num() — Mensaje + número entero

Emite una etiqueta descriptiva junto a un valor numérico entero. Ideal para inspeccionar cantidades en drops, contadores, valores de retorno de funciones y códigos de error.

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("drops recibidos: "), drops);

// Ver el valor de retorno de una función para detectar errores
int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));
trace_num(SBUF("state_set resultado: "), result);
// Negativo = error; positivo o cero = éxito
\`\`\`

### trace_float() — Mensaje + número en coma flotante (XFL)

Los Hooks usan el formato **XFL** (eXtended Float) para representar cantidades no enteras. \`trace_float()\` formatea el XFL de forma legible en el Debug Stream.

\`\`\`c
// Obtener el amount como XFL desde un slot
int64_t slot_no = slot_set(SBUF(amount_buf), 0);
int64_t xfl_amount = slot_float(slot_no);
trace_float(SBUF("importe en XFL: "), xfl_amount);
\`\`\`

### ¿Dónde aparecen las trazas?

Las trazas son visibles en tres lugares:

1. **Hooks Builder → Debug Stream**: Selecciona la cuenta en el desplegable y verás todas las trazas en tiempo real para cada transacción procesada.
2. **Logs del nodo xahaud** en modo debug (desarrollo local): Aparecen en la salida estándar del proceso \`xahaud\`.
3. **Suscripción WebSocket al stream de debug**: Puedes recibirlas programáticamente desde Node.js (ver código de ejemplo más abajo).

### Trucos para mejorar el debugging

**1. Usa \`__LINE__\` como código de error en accept/rollback**

El segundo argumento de \`accept()\` y \`rollback()\` es un código numérico. Usar \`__LINE__\` automáticamente incluye el número de línea del código fuente, lo que te permite saber exactamente dónde terminó la ejecución sin leer los logs línea a línea.

\`\`\`c
accept(SBUF("min_payment: OK"), __LINE__);    // Sabrás que pasó por aquí
rollback(SBUF("min_payment: FAIL"), __LINE__); // Y que falló aquí
\`\`\`

**2. Prefijos descriptivos en los mensajes**

Usa un prefijo con el nombre del Hook en cada mensaje. Con varios Hooks en la misma cuenta, es fácil confundir qué Hook emitió cada traza.

\`\`\`c
trace(SBUF("mi_hook:inicio hook()"), 0);
trace(SBUF("mi_hook:tipo tx procesado"), 0);
trace(SBUF("mi_hook:aceptando"), 0);
\`\`\`

**3. Traza el valor de retorno de cada función crítica**

Todas las funciones de la API de Hooks devuelven un valor negativo en caso de error. Comprueba siempre el retorno de operaciones importantes para no perder errores silenciosos.

\`\`\`c
int64_t r = state_set(SBUF(val), SBUF(key));
trace_num(SBUF("state_set: "), r);  // Si r < 0, algo falló

int64_t r2 = emit(SBUF(emithash), SBUF(tx_buf));
trace_num(SBUF("emit resultado: "), r2);
\`\`\`

**4. Traza buffers binarios como hex**

Las cuentas, los hashes y los buffers de transacciones son datos binarios de 20-32 bytes. Mostrarlos como hex te permite compararlos con las direcciones y hashes que ves en los exploradores de bloques.

\`\`\`c
uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF(hook_acc), 1);  // Verás el account ID en hex (40 caracteres)
\`\`\`

**5. Marca las ramas de ejecución**

Añade una traza al inicio de cada rama \`if/else\` para seguir el flujo de ejecución. Cuando el Hook termina inesperadamente, verás hasta qué traza llegó antes de que parara.

\`\`\`c
if (tt == 0) {
    trace(SBUF("rama: es un pago"), 0);
    // ...
} else {
    trace(SBUF("rama: no es un pago, saliendo"), 0);
    accept(SBUF("ok"), __LINE__);
}
\`\`\`

**6. Traza en cbak() para depurar emisiones**

Cuando una transacción emitida falla silenciosamente, es difícil saberlo sin instrumentar \`cbak()\`.

\`\`\`c
int64_t cbak(uint32_t reserved) {
    _g(1, 1);
    uint8_t txtype[4];
    int64_t t = otxn_type();
    trace_num(SBUF("cbak: tipo de tx emitida: "), t);
    // Leer el resultado de la tx emitida
    int64_t result = otxn_field(...);
    trace_num(SBUF("cbak: resultado emission: "), result);
    return 0;
}
\`\`\`

**7. Elimina las trazas antes de ir a producción**

Las trazas tienen un coste en fees de ejecución y aumentan el tamaño del WASM. Una vez que el Hook funciona correctamente en testnet, elimina o comenta las llamadas a \`trace*\` antes de desplegarlo en Mainnet.`,
        en: "",
        jp: "",
      },
      codeBlocks: [
        {
          title: {
            es: "Hook instrumentado con todas las funciones de traza",
            en: "",
            jp: "",
          },
          language: "c",
          code: `#include "hookapi.h"

/**
 * Hook: debug_demo.c
 * Demuestra el uso de trace(), trace_num() y trace_float()
 * para inspeccionar la ejecución del Hook en tiempo real.
 * Solo acepta pagos en XAH y traza cada paso del proceso.
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // ── 1. Traza de inicio ──────────────────────────────────────────────────
    trace(SBUF("debug_demo:hook() iniciado"), 0);

    // ── 2. Trazar la cuenta que tiene el Hook instalado ─────────────────────
    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));
    trace(SBUF(hook_acc), 1);  // Imprime como hex: account ID de 20 bytes

    // ── 3. Tipo de transacción ───────────────────────────────────────────────
    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:tipo de tx (0=Payment): "), tt);

    if (tt != 0) {
        trace(SBUF("debug_demo:no es un pago — saliendo"), 0);
        accept(SBUF("debug_demo:ok (no payment)"), __LINE__);
    }

    trace(SBUF("debug_demo:rama pago alcanzada"), 0);

    // ── 4. Obtener el monto del pago ─────────────────────────────────────────
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:bytes leidos del Amount: "), amount_len);

    if (amount_len != 8) {
        trace(SBUF("debug_demo:Amount no es XAH (8 bytes) — rechazando"), 0);
        rollback(SBUF("debug_demo:solo XAH nativo"), __LINE__);
    }

    // ── 5. Trazar el valor en drops ──────────────────────────────────────────
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:drops recibidos: "), drops);

    // ── 6. Trazar como XFL (formato de coma flotante de Xahau) ───────────────
    int64_t slot_no = slot_set(SBUF(amount_buf), 0);
    if (slot_no >= 0) {
        int64_t xfl_val = slot_float(slot_no);
        trace_float(SBUF("debug_demo:monto como XFL: "), xfl_val);
    } else {
        trace_num(SBUF("debug_demo:slot_set fallo con: "), slot_no);
    }

    // ── 7. Trazar resultado de escribir estado ───────────────────────────────
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'L'; // 'L' de LastAmount

    int64_t write_result = state_set(SBUF(amount_buf), SBUF(state_key));
    trace_num(SBUF("debug_demo:state_set resultado (>= 0 ok): "), write_result);

    if (write_result < 0) {
        // Error al guardar — traza el código de error exacto
        trace_num(SBUF("debug_demo:ERROR en state_set, codigo: "), write_result);
        rollback(SBUF("debug_demo:fallo al guardar estado"), __LINE__);
    }

    // ── 8. Trazar el hash de la transacción entrante ─────────────────────────
    uint8_t txhash[32];
    int64_t hash_len = otxn_field(SBUF(txhash), sfTransactionHash);
    trace_num(SBUF("debug_demo:bytes del hash: "), hash_len);
    if (hash_len == 32) {
        trace(SBUF(txhash), 1);  // Hash en hex — puedes buscarlo en el explorador
    }

    // ── 9. Aceptar — __LINE__ te dice la línea exacta de salida ─────────────
    trace(SBUF("debug_demo:pago aceptado, saliendo"), 0);
    accept(SBUF("debug_demo:ok"), __LINE__);

    return 0;
}

int64_t cbak(uint32_t reserved) {
    _g(1, 1);

    // Trazar resultados de transacciones emitidas
    trace(SBUF("debug_demo:cbak() ejecutado"), 0);

    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:cbak tipo tx emitida: "), tt);

    return 0;
}`,
        },
        {
          title: {
            es: "Suscribirse al Debug Stream de xahaud desde Node.js",
            en: "",
            jp: "",
          },
          language: "javascript",
          code: `// debug-stream.js
// Suscríbete al stream de debug de un nodo xahaud para recibir
// las trazas de los Hooks en tiempo real desde Node.js.
// Solo disponible en nodos con modo debug activo (testnet / nodo local).

const WebSocket = require("ws");

const NODE_URL  = "wss://xahau-test.net";
const ACCOUNT   = "rTuDireccionConHookAqui"; // La cuenta con el Hook

const ws = new WebSocket(NODE_URL);

ws.on("open", () => {
  console.log("Conectado al nodo xahaud");

  // Suscribirse a las transacciones de la cuenta
  ws.send(JSON.stringify({
    command: "subscribe",
    accounts: [ACCOUNT],
  }));

  console.log(\`Escuchando transacciones de \${ACCOUNT}...\`);
  console.log("Las trazas del Hook aparecerán en el campo 'debug_info'");
  console.log("(Solo visible en nodos con debug habilitado)\\n");
});

ws.on("message", (data) => {
  const msg = JSON.parse(data.toString());

  // Filtrar solo eventos de transacción validada
  if (msg.type !== "transaction") return;
  if (msg.status !== "closed")   return;

  const tx   = msg.transaction;
  const meta = msg.meta;

  console.log("─".repeat(60));
  console.log("TX tipo:    ", tx.TransactionType);
  console.log("TX hash:    ", tx.hash);
  console.log("Resultado:  ", meta?.TransactionResult);

  // Las trazas del Hook aparecen en debug_info si el nodo lo expone
  if (msg.debug_info) {
    console.log("\\n=== TRAZAS DEL HOOK ===");
    for (const entry of msg.debug_info) {
      if (entry.trace) {
        console.log("[trace]      ", entry.trace);
      }
      if (entry.trace_num !== undefined) {
        console.log("[trace_num]  ", entry.label, "=", entry.trace_num);
      }
      if (entry.trace_float !== undefined) {
        console.log("[trace_float]", entry.label, "=", entry.trace_float);
      }
    }
    console.log("=".repeat(60));
  }

  // Ver HookExecutions en la metadata para saber si el Hook ejecutó
  if (meta?.HookExecutions) {
    console.log("\\n=== HOOK EXECUTIONS ===");
    for (const he of meta.HookExecutions) {
      const exec = he.HookExecution;
      console.log("Hook cuenta:  ", exec.HookAccount);
      console.log("Hook hash:    ", exec.HookHash);
      console.log("Return code:  ", exec.HookReturnCode);
      console.log("Return string:", Buffer.from(exec.HookReturnString, "hex").toString());
      console.log("Emit count:   ", exec.HookEmitCount);
    }
  }
});

ws.on("error", (err) => console.error("Error WebSocket:", err.message));
ws.on("close", ()  => console.log("Conexión cerrada"));`,
        },
      ],
      slides: [
        {
          title: { es: "Las tres funciones trace*", en: "", jp: "" },
          content: {
            es: "Instrumentar el Hook para ver su ejecución:\n\ntrace(SBUF(\"mensaje\"), 0);\n→ Texto plano en el Debug Stream\n\ntrace(SBUF(buffer), 1);\n→ Contenido del buffer como hex\n\ntrace_num(SBUF(\"label: \"), valor);\n→ Etiqueta + número entero (drops, retornos...)\n\ntrace_float(SBUF(\"label: \"), xfl);\n→ Etiqueta + XFL (coma flotante de Xahau)",
            en: "",
            jp: "",
          },
          visual: "🔍",
        },
        {
          title: { es: "Donde ver las trazas", en: "", jp: "" },
          content: {
            es: "Tres formas de leer la salida:\n\n1. Hooks Builder → Debug Stream\n   Selecciona la cuenta en el desplegable\n\n2. Logs del nodo xahaud\n   En modo debug (desarrollo local)\n\n3. WebSocket desde Node.js\n   Suscríbete a la cuenta y lee debug_info\n   + HookExecutions en la metadata de la tx",
            en: "",
            jp: "",
          },
          visual: "📡",
        },
        {
          title: { es: "Trucos clave de debugging", en: "", jp: "" },
          content: {
            es: "• __LINE__ en accept/rollback → linea exacta de salida\n• Prefijo 'mi_hook:' en cada mensaje\n• trace_num del retorno de CADA funcion critica\n  (negativo = error silencioso)\n• trace con hex=1 para buffers binarios\n• Una traza al inicio de cada rama if/else\n• Instrumenta cbak() para debug de emit()\n• Elimina trazas antes de ir a Mainnet",
            en: "",
            jp: "",
          },
          visual: "🐛",
        },
      ],
    },
    {
      id: "m8l7",
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
          title: { es: "Hooks Builder — Entorno online", en: "", jp: "" },
          content: {
            es: "builder.xahau.network (solo Testnet)\n\nTres pestanas:\n• Develop: escribir y compilar Hooks en C\n• Deploy: gestionar cuentas y desplegar\n• Test: probar con transacciones reales\n\nGuarda tus seeds antes de cerrar el navegador",
            en: "",
            jp: "",
          },
          visual: "🌐",
        },
        {
          title: { es: "Deploy: cuentas e instalacion", en: "", jp: "" },
          content: {
            es: "Cuentas:\n• Generate Account → nueva con faucet\n• Import Account → seed existente de testnet\n• Minimo 2 cuentas (Hook + pruebas)\n\nInstalacion:\n• Seleccionar cuenta + Set Hook\n• Configurar HookOn, Namespace, Parameters\n• Fee → Suggest si hay error de fee",
            en: "",
            jp: "",
          },
          visual: "🚀",
        },
        {
          title: { es: "Test: verificar tu Hook", en: "", jp: "" },
          content: {
            es: "• Elegir tipo de tx, cuenta origen, destino\n• Configurar Amount, Flags, Memos\n• Run Test → revisar Development Log\n• Debug Stream: elegir cuenta a monitorear\n\nPruebas recomendadas:\n  Positivos | Negativos | Limites | No esperados",
            en: "",
            jp: "",
          },
          visual: "🧪",
        },
      ],
    },
    {
      id: "m8l8",
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
          title: { es: "hooks-cli — Desarrollo local", en: "", jp: "" },
          content: {
            es: "CLI oficial para compilar Hooks\n\nnpm install -g hooks-cli\nhooks-cli init c mi-proyecto\ncd mi-proyecto && yarn install\nyarn run build\n\nPara desarrollo profesional y Mainnet",
            en: "",
            jp: "",
          },
          visual: "🔨",
        },
        {
          title: { es: "Estructura del proyecto", en: "", jp: "" },
          content: {
            es: "hooks-cli init c genera:\n\nmi-proyecto-hook/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\nCompilar: yarn run build\nAlternativa: hooks-cli compile-c contracts build/",
            en: "",
            jp: "",
          },
          visual: "📁",
        },
        {
          title: { es: "Despliegue y referencia", en: "", jp: "" },
          content: {
            es: "SetHook con xahau.js:\n• Leer .wasm → hex → CreateCode\n• Configurar HookOn, HookCanEmit, Namespace\n• crypto.createHash('sha256') para namespace\n\nReferencia:\n• github.com/Xahau/hooks-cli\n• hooks-toolkit.com",
            en: "",
            jp: "",
          },
          visual: "📚",
        },
      ],
    },
  ],
}
