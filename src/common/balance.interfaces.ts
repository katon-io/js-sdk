import { Blockchain } from './blockchain.enum'
import { Metadata } from './metadata.interface'

export interface CoinBalance {
  coinId?: string
  coinNetworkIdentifier: string
  coinTicker: string
  coinName: string
  balanceOf: string
  balance: string
  decimals: number
  blockchain: Blockchain
  imgUrl?: string
}

export interface CoinBalanceListResponse {
  metadata: Metadata
  balances: CoinBalance[]
}

export interface TokenBalance {
  tokenId?: string
  description?: string
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
  supply?: string

  collectionId?: string
  collectionNetworkIdentifier: string
  collectionTicker: string
  collectionImgUrl?: string
  collectionName?: string

  balanceOf: string
  balance: string
  blockchain: Blockchain
}

export interface TokenInfo {
  tokenId?: string
  verified?: boolean
  description?: string
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

  supply?: string

  collectionId?: string
  collectionNetworkIdentifier: string
  collectionTicker: string
  collectionImgUrl?: string
  collectionName?: string
  blockchain: Blockchain
}

export interface TokenBalanceListResponse {
  metadata: Metadata
  balances: TokenBalance[]
}
