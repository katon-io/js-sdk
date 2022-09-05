import { KatonCtx } from '../context/katon-ctx.abtract'
import { KatonPublicCtx } from '../context/katon-public-ctx.model'
import {
  AccountDto,
  AccountDtoListResponse,
  KatonAccountListResponse,
} from './katon-account.interfaces'
import { KatonAccount, KatonAccounts } from './katon-accounts.type'
import { KatonPublicAccount } from './katon-public-account.model'

export class KatonPublicAccounts {
  protected static _obj: KatonAccounts

  protected _ctx: KatonCtx

  protected constructor(ctx: KatonCtx) {
    this._ctx = ctx
  }

  static obj(ctx: KatonCtx): KatonPublicAccounts {
    if (!this._obj) {
      this._obj = new KatonPublicAccounts(ctx)
    }

    return this._obj
  }

  withUuid(uuid: string): KatonPublicAccount {
    return new KatonPublicAccount(this._ctx, uuid)
  }

  async list(
    limit: number = 10,
    offset: number = 0,
    tag?: string,
    filter?: string,
  ): Promise<KatonAccountListResponse<KatonAccount>> {
    let path = `/v1/accounts?limit=${limit}&offset=${offset}`

    if (tag) {
      path += `&accountTag=${tag}`
    }

    if (filter) {
      path += `&filter=${filter}`
    }

    const res = await (
      this._ctx as KatonPublicCtx
    ).doGet<AccountDtoListResponse>(path)

    return {
      metadata: res.metadata,
      accounts: (res.accounts || []).map(this.mapToKatonAccount),
    }
  }

  protected mapToKatonAccount(accountDto: AccountDto): KatonPublicAccount {
    return new KatonPublicAccount(this._ctx, accountDto.id, accountDto)
  }
}
