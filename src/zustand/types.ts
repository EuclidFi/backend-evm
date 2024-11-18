export interface ComplianceStatus {
    kycVerified: boolean;
    region: string;
    riskLevel: 'low' | 'medium' | 'high';
    tradingLimit: number;
    lastUpdated: Date;
}

export interface Transaction {
    id: string;
    type: 'swap' | 'loan' | 'stake';
    amount: number;
    token: string;
    timestamp: Date;
    status: 'pending' | 'completed' | 'failed';
}
