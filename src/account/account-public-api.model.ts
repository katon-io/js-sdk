import { AccountAPI } from './account-api.type'

export class AccountPublicAPI {
  protected static _obj: AccountAPI

  protected constructor() {}

  static obj(): AccountPublicAPI {
    if (!this._obj) {
      this._obj = new AccountPublicAPI()
    }

    return this._obj as AccountPublicAPI
  }
}
