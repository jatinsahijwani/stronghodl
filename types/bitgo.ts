export interface BitGoWallet {
  id: string
  label: string
  coin: string
  balance: number
  confirmedBalance: number
  spendableBalance: number
  receiveAddress: { address: string }
  approvalsRequired: number
  coinSpecific?: Record<string, unknown>
}

export interface BitGoTransfer {
  id: string
  txid: string
  type: 'send' | 'receive'
  value: number
  valueString: string
  date: string
  state: 'confirmed' | 'unconfirmed' | 'failed' | 'pendingApproval'
  entries: Array<{ address: string; value: number }>
  comment?: string
}

export interface BitGoPendingApproval {
  id: string
  state: 'pending' | 'awaitingSignature' | 'pendingFinalApproval' | 'approved' | 'rejected'
  creator: string
  createDate: string
  info: {
    type: string
    transactionRequest?: {
      destinationAddress: string
      value: string
      coin: string
      comment?: string
    }
  }
  approvalsRequired: number
  approvers: Record<string, { user: string; date?: string }>
}

export interface EncryptedVote {
  approvalId: string
  encryptedPayload: string
  revealed: boolean
}

export interface GovernanceApproval {
  approval: BitGoPendingApproval
  votes: EncryptedVote[]
  thresholdMet: boolean
  revealedVotes?: Array<{
    signer: string
    decision: 'approve' | 'reject'
    timestamp: number
  }>
}