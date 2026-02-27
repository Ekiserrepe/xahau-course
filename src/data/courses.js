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
import m01 from './modules/m01-blockchain-non-evm.js'
import m02 from './modules/m02-consensus.js'
import m03 from './modules/m03-first-wallet.js'
import m04 from './modules/m04-querying-data.js'
import m05 from './modules/m05-transaction-anatomy.js'
import m06 from './modules/m06-payments.js'
import m07 from './modules/m07-tokens.js'
import m08 from './modules/m08-nfts.js'
import m09 from './modules/m09-smart-contracts.js'
import m10 from './modules/m10-escrows-checks.js'
import m11 from './modules/m11-xaman-sdk.js'

export const COURSE_DATA = [
  m00,
  m01,
  m02,
  m03,
  m04,
  m05,
  m06,
  m07,
  m08,
  m09,
  m10,
  m11,
]
