# @trezoa/keychain-core

Core interfaces and utilities for building external Trezoa signers.

## Installation

```bash
pnpm add @trezoa/keychain-core
```

## What's Included

### Interfaces

**`TrezoaSigner`** - Unified interface that all signer implementations extend:

```typescript
import { TrezoaSigner } from '@trezoa/keychain-core';

interface TrezoaSigner {
    address: Address;
    isAvailable(): Promise<boolean>;
    signMessages(messages: readonly SignableMessage[]): Promise<readonly SignatureDictionary[]>;
    signTransactions(transactions: readonly Transaction[]): Promise<readonly SignatureDictionary[]>;
}
```

### Error Handling

```typescript
import { SignerError, SignerErrorCode, throwSignerError } from '@trezoa/keychain-core';

// Check error type
if (error instanceof SignerError) {
    console.log(error.code); // e.g., 'SIGNER_SIGNING_FAILED'
    console.log(error.context); // Additional error details
}

// Throw typed errors
throwSignerError(SignerErrorCode.SIGNING_FAILED, {
    address: 'signer-address',
    message: 'Custom error message'
});
```

**Available error codes:**
- `INVALID_PRIVATE_KEY` - Invalid private key format
- `INVALID_PUBLIC_KEY` - Invalid public key format
- `SIGNING_FAILED` - Signing operation failed
- `REMOTE_API_ERROR` - Remote signer API error
- `HTTP_ERROR` - HTTP request failed
- `SERIALIZATION_ERROR` - Transaction serialization failed
- `CONFIG_ERROR` - Invalid configuration
- `NOT_AVAILABLE` - Signer not available/healthy
- `IO_ERROR` - File I/O error
- `PRIVY_NOT_INITIALIZED` - Privy signer not initialized

### Utilities

**`extractSignatureFromWireTransaction`** - Extract a specific signer's signature from a signed transaction:

```typescript
import { extractSignatureFromWireTransaction } from '@trezoa/keychain-core';

// When a remote API returns a fully signed base64 transaction, we need to extract the signature to use Kit's native methods (which rely on .signTransactions to return a SignatureDictionary)
const signedTx = await remoteApi.signTransaction(...);
const sigDict = extractSignatureFromWireTransaction({
    base64WireTransaction: signedTx,
    signerAddress: myAddress
});
```

**`createSignatureDictionary`** - Create a signature dictionary from raw signature bytes:

```typescript
import { createSignatureDictionary } from '@trezoa/keychain-core';

const sigDict = createSignatureDictionary({
    signature: signatureBytes,
    signerAddress: myAddress
});
```

## Usage

This package is typically used as a dependency when building custom signer implementations. See [@trezoa/keychain-privy](https://www.npmjs.com/package/@trezoa/keychain-privy) for an example implementation.

```typescript
import { TrezoaSigner, SignerErrorCode, throwSignerError } from '@trezoa/keychain-core';

class MyCustomSigner implements TrezoaSigner {
    readonly address: Address;

    async isAvailable(): Promise<boolean> {
        // Check if backend is healthy
    }

    async signMessages(messages: readonly SignableMessage[]) {
        // Sign messages using your backend
    }

    async signTransactions(transactions: readonly Transaction[]) {
        // Sign transactions using your backend
    }
}
```

## Type Guards

**`isTrezoaSigner`** - Check if a value is a TrezoaSigner:

```typescript
import { isTrezoaSigner } from '@trezoa/keychain-core';

const isSigner = isTrezoaSigner(value); // true or false
```

**`assertIsTrezoaSigner`** - Assert that a value is a TrezoaSigner:

```typescript
import { assertIsTrezoaSigner } from '@trezoa/keychain-core';

assertIsTrezoaSigner(value); // void (throws if not a TrezoaSigner)
```