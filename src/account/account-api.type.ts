import { AccountPrivateAPI } from './account-private-api.model'
import { AccountPublicAPI } from './account-public-api.model'

export type AccountAPI = AccountPublicAPI | AccountPrivateAPI
