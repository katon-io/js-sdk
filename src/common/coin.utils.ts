import { KatonCtx } from '../context'

export enum Coins {
  egld = 'EGLD',
  kton = 'KTON',
  eth = 'ETH',
  bnb = 'BNB',
  matic = 'MATIC',
  avax = 'AVAX',
}

export class CoinUtils {
  static ctxNetworkId(ctx: KatonCtx, coin: Coins | string): string {
    switch (coin) {
      case Coins.egld:
      case Coins.bnb:
      case Coins.avax:
      case Coins.eth:
      case Coins.matic:
        return coin
      case Coins.kton:
        return ctx.isProd ? 'KTON-e1626e' : 'KTON-c44673'
      default:
        return coin
    }
  }
}
