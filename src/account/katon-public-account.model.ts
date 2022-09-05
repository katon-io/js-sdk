import {
  CoinBalance,
  CoinBalanceListResponse,
  TokenBalanceListResponse,
  Coins,
  CoinUtils,
} from '../common'
import { KatonCtx, KatonPublicCtx } from '../context'
import { AccountDto } from './katon-account.interfaces'

export class KatonPublicAccount {
  protected _ctx: KatonCtx
  protected _uuid: string
  protected _account: AccountDto
  protected _coinBalances: any
  protected _tokenBalances: any

  constructor(ctx: KatonCtx, uuid: string, accountDto?: AccountDto) {
    console.assert(
      !!ctx,
      'KatonAccount: Should be initialized with a defined context.',
    )

    console.assert(
      !!ctx,
      'KatonAccount: Should be initialized with a defined uuid.',
    )

    this._ctx = ctx
    this._uuid = uuid
    this._account = accountDto
  }

  get id(): string {
    return this._uuid
  }

  get firstName(): string {
    return this._account?.userFirstName
  }

  get initialEmail(): string {
    return this._account?.initialEmail
  }

  get tag(): string {
    return this._account?.tag
  }

  get label(): string {
    return this._account?.label
  }

  get locked(): boolean {
    return this._account?.locked
  }

  get imgUrl(): string {
    return this._account?.imgUrl
  }

  async sync(withBalances = false): Promise<void> {
    const [account, coinBalances, tokenBalances] = await Promise.all([
      (this._ctx as KatonPublicCtx).doGet<AccountDto>(
        `/v1/accounts/${this._uuid}`,
      ),
      withBalances ? this.allBalances() : Promise.resolve(null),
      withBalances ? this.allTokenBalances() : Promise.resolve(null),
    ])

    this._account = account
    this._coinBalances = coinBalances
    this._tokenBalances = tokenBalances
  }

  async balance(coinOrNetworkId: Coins | string): Promise<CoinBalance> {
    return (this._ctx as KatonPublicCtx).doGet<CoinBalance>(
      `/v1/balances/coin/${CoinUtils.ctxNetworkId(
        this._ctx,
        coinOrNetworkId,
      )}?account=${this._uuid}`,
    )
  }

  async allBalances(
    limit: number = 10,
    offset: number = 0,
  ): Promise<CoinBalanceListResponse> {
    return (this._ctx as KatonPublicCtx).doGet<CoinBalanceListResponse>(
      `/v1/balances/coin/all?account=${this._uuid}&limit=${limit}&offset=${offset}`,
    )
  }

  async tokenBalance(networkId: string): Promise<CoinBalance> {
    return (this._ctx as KatonPublicCtx).doGet<CoinBalance>(
      `/v1/balances/token/${networkId}?account=${this._uuid}`,
    )
  }

  async allTokenBalances(
    limit: number = 10,
    offset: number = 0,
  ): Promise<TokenBalanceListResponse> {
    return (this._ctx as KatonPublicCtx).doGet<TokenBalanceListResponse>(
      `/v1/balances/token/all?account=${this._uuid}&limit=${limit}&offset=${offset}`,
    )
  }
}
