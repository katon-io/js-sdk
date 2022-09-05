import { Blockchain } from './blockchain.enum'

export class SendCoinRequest {
  amount: number
  to: string
  fee?: number
}

export class WithdrawCoinRequest {
  amount: number
  toAddress: string
  fee?: number
}

export class ReceiveCoinRequest {
  amount: number
  from: string
  fee?: number
}

export class SendTokenRequest {
  amount: number
  to: string
}

export class WithdrawTokenRequest {
  amount: number
  toAddress: string
}

export class ReceiveTokenRequest {
  amount: number
  from: string
}

export class TransferResponse {
  tx: string
  blockchain: Blockchain
}
