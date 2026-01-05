import type { Address } from '@trezoa/addresses';
import type {
    MessagePartialSigner,
    SignableMessage,
    SignatureDictionary,
    TransactionPartialSigner,
} from '@trezoa/signers';
import type { Transaction, TransactionWithinSizeLimit, TransactionWithLifetime } from '@trezoa/transactions';

/**
 * Unified signer interface that extends both transaction and message signers.
 * Provides both high-level (simple) and low-level (@trezoa/kit compatible) APIs.
 */
export interface TrezoaSigner<TAddress extends string = string>
    extends TransactionPartialSigner<TAddress>,
        MessagePartialSigner<TAddress> {
    /**
     * Get the public key address of this signer
     */
    readonly address: Address<TAddress>;

    /**
     * Check if the signer is available and healthy.
     * For remote signers (Vault, Privy, Turnkey), this performs an API health check.
     */
    isAvailable(): Promise<boolean>;

    /**
     * Signs multiple messages and returns signature dictionaries
     * for @trezoa/kit signing compatibility.
     *
     * @param messages - Array of signable messages
     * @returns Array of signature dictionaries (address -> signature mapping)
     */
    signMessages(messages: readonly SignableMessage[]): Promise<readonly SignatureDictionary[]>;

    /**
     * Signs multiple transactions and returns signature dictionaries.
     * for @trezoa/kit signing compatibility.
     *
     * @param transactions - Array of transactions to sign
     * @returns Array of signature dictionaries (address -> signature mapping)
     */
    signTransactions(
        transactions: readonly (Transaction & TransactionWithinSizeLimit & TransactionWithLifetime)[],
    ): Promise<readonly SignatureDictionary[]>;
}
