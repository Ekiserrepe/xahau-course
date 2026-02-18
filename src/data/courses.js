/**
 * Course Data Index
 *
 * Import all module files and export them as an ordered array.
 * To add a new module:
 * 1. Create the module file in ./modules/
 * 2. Import it below
 * 3. Add it to the COURSE_DATA array in the desired order
 */

import m00 from './modules/m00-setup.js'
import m01 from './modules/m01-blockchain-no-evm.js'
import m02 from './modules/m02-consenso.js'
import m03 from './modules/m03-primera-wallet.js'
import m04 from './modules/m04-consulta-datos.js'
import m05 from './modules/m05-pagos.js'
import m05b from './modules/m05b-anatomia-transacciones.js'
import m06 from './modules/m06-tokens.js'
import m07 from './modules/m07-nfts.js'
import m08 from './modules/m08-smart-contracts.js'
import m09 from './modules/m09-dex.js'
import m10 from './modules/m10-herramientas.js'
import m11 from './modules/m11-proyecto-final.js'

export const COURSE_DATA = [
  m00,
  m01,
  m02,
  m03,
  m04,
  m05b,
  m05,
  m06,
  m07,
  m08,
  m09,
  m10,
  m11,
]
