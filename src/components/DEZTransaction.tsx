import React from 'react';
import { useDEZ } from '@/src/hooks/useDEZ';
import { Transaction } from '@/types';

interface DEZTransactionProps {
    transaction: Transaction;
}

export function DEZTransaction({ transaction }: DEZTransactionProps) {
    const { complianceStatus, executeTransaction, error } = useDEZ();

    const handleExecute = async () => {
        try {
            const result = await executeTransaction(transaction);
            // Handle successful transaction
        } catch (error) {
            // Handle error
            console.error('Transaction failed:', error);
        }
    };

    if (!complianceStatus?.kycVerified) {
        return (
            <div className="p-4 bg-red-100 rounded">
                <p>KYC verification required before trading</p>
                {/* Add KYC verification flow */}
            </div>
        );
    }

    return (
        <div className="p-4 border rounded">
            <h3 className="text-lg font-bold">Transaction Details</h3>
            <div className="mt-2">
                <p>Type: {transaction.type}</p>
                <p>Amount: {transaction.amount}</p>
                <p>Token: {transaction.token}</p>
            </div>
            {error && (
                <div className="mt-2 text-red-500">
                    {error.message}
                </div>
            )}
            <button
                onClick={handleExecute}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Execute Transaction
            </button>
        </div>
    );
}