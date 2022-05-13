import { Blockchains } from 'src/blockchains.enum'
import { Environments } from 'src/environments.enum'

export interface KatonCtxOptions {
  defaultChain?: Blockchains
  env?: Environments
}
