import { KatonCtx } from '../context/katon-ctx.abtract'

export enum Coins {
  egld = 'EGLD',
  kton = 'KTON',
}

export class CoinUtils {
  static ctxNetworkId(ctx: KatonCtx, coin: Coins | string): string {
    switch (coin) {
      case Coins.egld:
        return 'EGLD'
      case Coins.kton:
        return ctx.isProd ? 'KTON-e1626e' : 'KTON-2d3372'
      default:
        return coin
    }
  }
}
