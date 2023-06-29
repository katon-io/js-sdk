import {
  Coins,
  CoinUtils,
  SendCoinRequest,
  SendTokenRequest,
  TxFundingStrategy,
  TxProcessing,
} from '../common'
import { KatonPrivateCtx } from '../context'
import {
  AccountDto,
  UpdateAccountImgUrl,
  UpdateAccountLabel,
  UpdateAccountLocked,
  UpdateAccountTag,
} from './katon-account.interfaces'
import { KatonAccount } from './katon-accounts.type'
import { KatonPublicAccount } from './katon-public-account.model'

export class KatonPrivateAccount extends KatonPublicAccount {
  constructor(ctx: KatonPrivateCtx, uuid: string, account?: AccountDto) {
    super(ctx, uuid, account)
  }

  async lock(): Promise<void> {
    const account = await (this._ctx as KatonPrivateCtx).doPut<
      AccountDto,
      UpdateAccountLocked
    >(`/v1/accounts/${this._uuid}/locked`, {
      locked: true,
    })
    this._account = account
  }

  async unlock(): Promise<void> {
    const account = await (this._ctx as KatonPrivateCtx).doPut<
      AccountDto,
      UpdateAccountLocked
    >(`/v1/accounts/${this._uuid}/locked`, {
      locked: false,
    })
    this._account = account
  }

  async updateLabel(label: string): Promise<void> {
    const account = await (this._ctx as KatonPrivateCtx).doPut<
      AccountDto,
      UpdateAccountLabel
    >(`/v1/accounts/${this._uuid}/label`, {
      label,
    })
    this._account = account
  }

  async updateTag(tag: string): Promise<void> {
    const account = await (this._ctx as KatonPrivateCtx).doPut<
      AccountDto,
      UpdateAccountTag
    >(`/v1/accounts/${this._uuid}/tag`, {
      tag,
    })
    this._account = account
  }

  async updateImgUrl(imgUrl: string): Promise<void> {
    const account = await (this._ctx as KatonPrivateCtx).doPut<
      AccountDto,
      UpdateAccountImgUrl
    >(`/v1/accounts/${this._uuid}/img-url`, {
      imgUrl,
    })
    this._account = account
  }

  async sendTokenToAccount(
    tokenNetworkIdentifier: Coins | string,
    amount: string,
    receiver: KatonAccount | string,
    txFundingStrategy: TxFundingStrategy = TxFundingStrategy.owner,
  ): Promise<TxProcessing> {
    return (this._ctx as KatonPrivateCtx).doPost<
      TxProcessing,
      SendTokenRequest
    >(
      `/v1/transfers/tokens/${tokenNetworkIdentifier}?account=${this._uuid}&txFundingStrategy=${txFundingStrategy}`,
      {
        amount,
        toAccount: typeof receiver === 'string' ? receiver : receiver.id,
      },
    )
  }

  async sendCoinToAccount(
    coinOrNetworkId: Coins | string,
    amount: string,
    receiver: KatonAccount | string,
    txFundingStrategy: TxFundingStrategy = TxFundingStrategy.owner,
  ): Promise<TxProcessing> {
    return (this._ctx as KatonPrivateCtx).doPost<TxProcessing, SendCoinRequest>(
      `/v1/transfers/coins/${CoinUtils.ctxNetworkId(
        this._ctx,
        coinOrNetworkId,
      )}?account=${this._uuid}&txFundingStrategy=${txFundingStrategy}`,
      {
        amount,
        toAccount: typeof receiver === 'string' ? receiver : receiver.id,
      },
    )
  }
}
