import { TxFundingStrategy } from '../common/tx-funding-startegy.enum'
import { Coins, CoinUtils } from '../common/coin.utils'
import {
  SendCoinRequest,
  SendTokenRequest,
  TransferResponse,
  WithdrawCoinRequest,
  WithdrawTokenRequest,
} from '../common/transfer.interfaces'
import { KatonPrivateCtx } from '../context/katon-private-ctx.model'
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

  async sendToken(
    tokenNetworkIdentifier: Coins | string,
    amount: number,
    receiver: KatonAccount | string,
    txFundingStrategy: TxFundingStrategy = TxFundingStrategy.owner,
  ): Promise<TransferResponse> {
    return (this._ctx as KatonPrivateCtx).doPost<
      TransferResponse,
      SendTokenRequest
    >(
      `/v1/transfers/token/${tokenNetworkIdentifier}/send?account=${this._uuid}&txFundingStrategy=${txFundingStrategy}`,
      {
        amount,
        to: typeof receiver === 'string' ? receiver : receiver.id,
      },
    )
  }

  async withdrawToken(
    tokenNetworkIdentifier: string,
    amount: number,
    toAddress: string,
    txFundingStrategy: TxFundingStrategy = TxFundingStrategy.owner,
  ): Promise<TransferResponse> {
    return (this._ctx as KatonPrivateCtx).doPost<
      TransferResponse,
      WithdrawTokenRequest
    >(
      `/v1/transfers/token/${tokenNetworkIdentifier}/withdraw?account=${this._uuid}&txFundingStrategy=${txFundingStrategy}`,
      {
        amount,
        toAddress,
      },
    )
  }

  async send(
    coinOrNetworkId: Coins | string,
    amount: number,
    receiver: KatonAccount | string,
    txFundingStrategy: TxFundingStrategy = TxFundingStrategy.owner,
    fee?: number,
  ): Promise<TransferResponse> {
    return (this._ctx as KatonPrivateCtx).doPost<
      TransferResponse,
      SendCoinRequest
    >(
      `/v1/transfers/coin/${CoinUtils.ctxNetworkId(
        this._ctx,
        coinOrNetworkId,
      )}/send?account=${this._uuid}&txFundingStrategy=${txFundingStrategy}`,
      {
        amount,
        to: typeof receiver === 'string' ? receiver : receiver.id,
        fee,
      },
    )
  }

  async withdraw(
    coinOrNetworkId: Coins | string,
    amount: number,
    toAddress: string,
    txFundingStrategy: TxFundingStrategy = TxFundingStrategy.owner,
    fee?: number,
  ): Promise<TransferResponse> {
    return (this._ctx as KatonPrivateCtx).doPost<
      TransferResponse,
      WithdrawCoinRequest
    >(
      `/v1/transfers/coin/${CoinUtils.ctxNetworkId(
        this._ctx,
        coinOrNetworkId,
      )}/withdraw?account=${this._uuid}&txFundingStrategy=${txFundingStrategy}`,
      {
        amount,
        toAddress,
        fee,
      },
    )
  }
}
