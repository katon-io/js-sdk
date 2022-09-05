import { Blockchain } from './blockchain.enum'
import { Metadata } from './metadata.interface'
import { Scope } from './scope.enum'

export class CoinBalance {
  coinId?: string
  coinNetworkIdentifier: string
  coinName: string
  balanceOf: string
  balance: number
  decimals: number
  blockchain: Blockchain
  imgUrl?: string
  scope?: Scope
}

export class CoinBalanceListResponse {
  metadata: Metadata
  balances: CoinBalance[]
}

export class TokenBalance {
  tokenId?: string
  tokenNetworkIdentifier: string
  tokenName: string
  tokenMedias?: {
    url: string
    fileType: string
    fileSize: string
  }[]
  tokenUris: string[]
  tokenRoyalties: number
  tokenMetadata: any
  isNFT: boolean

  collectionId?: string
  collectionNetworkIdentifier: string
  collectionImgUrl?: string
  collectionName?: string
  collectionScope?: Scope

  balanceOf: string
  balance: number
  blockchain: Blockchain
}

export class TokenBalanceListResponse {
  metadata: Metadata
  balances: TokenBalance[]
}
