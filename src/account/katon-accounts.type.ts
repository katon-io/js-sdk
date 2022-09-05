import { KatonPrivateAccount } from './katon-private-account.model'
import { KatonPrivateAccounts } from './katon-private-accounts.model'
import { KatonPublicAccount } from './katon-public-account.model'
import { KatonPublicAccounts } from './katon-public-accounts.model'

export type KatonAccounts = KatonPrivateAccounts | KatonPublicAccounts
export type KatonAccount = KatonPrivateAccount | KatonPublicAccount
