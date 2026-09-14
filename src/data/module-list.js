/**
 * The course running order, as filenames.
 *
 * This is the one place a new module gets registered. The build script reads
 * it to generate the manifest, and courses.js maps it onto the lazy loaders
 * that Vite creates from the modules directory — so adding a module here is
 * all it takes, and no module is bundled into the initial download.
 */

export const MODULE_FILES = [
  'm00-setup.js',
  'm01-blockchain-non-evm.js',
  'm02-consensus.js',
  'm03-first-wallet.js',
  'm04-querying-data.js',
  'm05-transaction-anatomy.js',
  'm06-payments.js',
  'm07-tokens.js',
  'm08-nfts.js',
  'm09-smart-contracts.js',
  'm10-escrows-checks.js',
  'm11-xaman-sdk.js',
]
