import { Blockchain } from './blockchain.enum'

export class Wallet {
  id: string
  userId?: string
  accountId?: string
  projectId?: string
  blockchainSpecificWallets: BlockchainSpecificWallet[]
}

export class BlockchainSpecificWallet {
  address: string
  blockchain: Blockchain
}
