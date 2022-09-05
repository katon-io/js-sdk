import { KatonPrivateCtx } from '../context'
import { AccountDto, CreateAccountRequest } from './katon-account.interfaces'
import { KatonPrivateAccount } from './katon-private-account.model'
import { KatonPublicAccounts } from './katon-public-accounts.model'

export class KatonPrivateAccounts extends KatonPublicAccounts {
  protected _ctx: KatonPrivateCtx

  constructor(ctx: KatonPrivateCtx) {
    super(null)

    this._ctx = ctx
  }

  static obj(ctx: KatonPrivateCtx): KatonPrivateAccounts {
    if (!this._obj) {
      this._obj = new KatonPrivateAccounts(ctx)
    }

    return this._obj as KatonPrivateAccounts
  }

  withUuid(uuid: string): KatonPrivateAccount {
    return new KatonPrivateAccount(this._ctx, uuid)
  }

  async createOrFetch(
    initialEmail: string,
    tag?: string,
    label?: string,
    locked?: boolean,
    imgUrl?: string,
  ): Promise<KatonPrivateAccount> {
    const accountDto = await this._ctx.doPost<AccountDto, CreateAccountRequest>(
      '/v1/accounts',
      { initialEmail, tag, label, locked, imgUrl },
    )

    return new KatonPrivateAccount(this._ctx, accountDto.id, accountDto)
  }

  protected mapToKatonAccount(accountDto: AccountDto): KatonPrivateAccount {
    return new KatonPrivateAccount(this._ctx, accountDto.id, accountDto)
  }
}
