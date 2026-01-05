# @trezoa/keychain (TypeScript)

TypeScript packages for building custom Trezoa signers compatible with `@trezoa/kit` and `@trezoa/signers`

## Quick Example

```typescript
import { TrezoaSigner } from '@trezoa/keychain-core';
import { signTransactionMessageWithSigners } from '@trezoa/signers';

class MyCustomSigner implements TrezoaSigner {
    readonly address: Address;

    async isAvailable(): Promise<boolean> {
        return await myBackend.healthCheck();
    }

    async signTransactions(transactions) {
        return await myBackend.sign(transactions);
    }

    async signMessages(messages) {
        return await myBackend.signMessages(messages);
    }
}

const customSigner = new MyCustomSigner(config);
const transaction = pipe(
    createTransactionMessage({ version: 0 }),
    tx => setTransactionMessageFeePayerSigner(customSigner, tx),
    tx /* ... */
);
const signedTx = await signTransactionMessageWithSigners(transaction);
```
(see [test-signer.ts](./examples/test-signer.ts) for a complete example)

## Packages

| Package | Description |
|---------|-------------|
| [@trezoa/keychain-core](./packages/core) | Core interfaces, types, and utilities for building custom signers |
| [@trezoa/keychain-privy](./packages/privy) | Privy wallet signer implementation |
| [@trezoa/keychain-turnkey](./packages/turnkey) | Turnkey wallet signer implementation |
| [@trezoa/keychain-vault](./packages/vault) | HashiCorp Vault signer implementation |
| [@trezoa/keychain-aws-kms](./packages/aws-kms) | AWS KMS signer implementation |
| [@trezoa/keychain-fireblocks](./packages/fireblocks) | Fireblocks signer implementation |

## Installation

*note: not yet published to npm registry. must build locally to use*

```bash
# Core package (required for building custom signers)
pnpm add @trezoa/keychain-core

# Signer implementations
pnpm add @trezoa/keychain-aws-kms
pnpm add @trezoa/keychain-fireblocks
pnpm add @trezoa/keychain-privy
pnpm add @trezoa/keychain-turnkey
pnpm add @trezoa/keychain-vault
```
