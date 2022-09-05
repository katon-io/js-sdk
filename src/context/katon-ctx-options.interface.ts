import { Blockchain } from '../common/blockchain.enum'
import { KatonEnvironments } from '../katon-environments.enum'

export interface KatonCtxOptions {
  defaultChain?: Blockchain
  env?: KatonEnvironments
}
