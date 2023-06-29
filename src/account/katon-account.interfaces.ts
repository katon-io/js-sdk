import { Metadata, Wallet } from '../common'

export interface AccountDto {
  id: string
  initialEmail: string
  wallet: Wallet
  locked: boolean
  userId?: string
  userFirstName?: string
  userLastName?: string
  userEmail?: string
  projectId: string
  projectName: string
  projectImgUrl?: string
  tag?: string
  imgUrl?: string
  label?: string
}

export interface AccountDtoListResponse {
  metadata: Metadata
  accounts: AccountDto[]
}

export interface KatonAccountListResponse<T> {
  metadata: Metadata
  accounts: T[]
}

export interface CreateAccountRequest {
  emailToBeHashed: string
  imgUrl?: string
  tag?: string
  label?: string
  locked?: boolean
}

export interface UpdateAccountLocked {
  locked: boolean
}

export interface UpdateAccountLabel {
  label: string
}

export interface UpdateAccountTag {
  tag: string
}

export interface UpdateAccountImgUrl {
  imgUrl: string
}

export interface AccountTagListResponse {
  metadata: Metadata
  tags: { tag: string }[]
}
