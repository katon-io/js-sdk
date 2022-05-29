import { AccountPublicAPI } from './account-public-api.model'

export class AccountPrivateAPI extends AccountPublicAPI {
  static obj(): AccountPrivateAPI {
    if (!this._obj) {
      this._obj = new AccountPrivateAPI()
    }

    return this._obj as AccountPrivateAPI
  }
}
