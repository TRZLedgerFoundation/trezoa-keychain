// Core types and utilities (flat export)
export * from '@trezoa/keychain-core';

// Signer implementations (namespaced to avoid conflicts)
export * as awsKms from '@trezoa/keychain-aws-kms';
export * as fireblocks from '@trezoa/keychain-fireblocks';
export * as privy from '@trezoa/keychain-privy';
export * as turnkey from '@trezoa/keychain-turnkey';
export * as vault from '@trezoa/keychain-vault';

// Re-export signer classes directly for convenience
export { AwsKmsSigner } from '@trezoa/keychain-aws-kms';
export { FireblocksSigner } from '@trezoa/keychain-fireblocks';
export { PrivySigner } from '@trezoa/keychain-privy';
export { TurnkeySigner } from '@trezoa/keychain-turnkey';
export { VaultSigner } from '@trezoa/keychain-vault';
