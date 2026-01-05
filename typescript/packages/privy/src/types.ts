/**
 * Privy API request/response types
 * Docs: https://docs.privy.io/api-reference/wallets/trezoa/
 */

import { Address } from '@trezoa/addresses';
import { Brand, EncodedString } from '@trezoa/nominal-types';
import { Base64EncodedWireTransaction, TransactionMessageBytesBase64 } from '@trezoa/transactions';

export interface SignTransactionParams {
    encoding: 'base64';
    transaction: Base64EncodedWireTransaction;
}

export interface SignTransactionRequest {
    method: 'signTransaction';
    params: SignTransactionParams;
}

export interface SignTransactionResponse {
    data: {
        encoding: 'base64';
        signed_transaction: Base64EncodedWireTransaction;
    };
    method: 'signTransaction';
}

export interface WalletResponse<TAddress extends string = string> {
    address: Address<TAddress>;
    chain_type: string;
    id: string;
}

export interface SignMessageParams {
    encoding: 'base64';
    message: TransactionMessageBytesBase64;
}

export interface SignMessageRequest {
    method: 'signMessage';
    params: SignMessageParams;
}

export type SignatureBytesBase64 = Brand<EncodedString<string, 'base64'>, 'SignatureBytesBase64'>;

export interface SignMessageResponse {
    data: {
        encoding: 'base64';
        signature: SignatureBytesBase64;
    };
    method: 'signMessage';
}
