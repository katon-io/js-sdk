import { AxiosRequestHeaders } from 'axios'
import { Config } from '../../config'
import { Blockchain } from '../common/blockchain.enum'
import { KatonEnvironments } from '../katon-environments.enum'
import { KatonCtxOptions } from './katon-ctx-options.interface'

export abstract class KatonCtx {
  protected _project: string
  protected _options: KatonCtxOptions

  constructor(projectId: string, ctxOptions: KatonCtxOptions = {}) {
    console.assert(
      projectId !== null && projectId !== undefined,
      'KatonCtx: projectId is undefined.',
    )
    console.assert(
      typeof projectId === 'string',
      'KatonCtx: projectId should be a string.',
    )

    this._project = projectId
    this._options = {
      defaultChain: ctxOptions.defaultChain || Blockchain.elrond,
      env: ctxOptions.env || KatonEnvironments.prod,
    }
  }

  get options(): KatonCtxOptions {
    return this._options
  }

  get isProd(): boolean {
    return this._options.env === KatonEnvironments.prod
  }

  get isSandbox(): boolean {
    return this._options.env === KatonEnvironments.sandbox
  }

  get isLocal(): boolean {
    return this._options.env === KatonEnvironments.local
  }

  get blockchain(): Blockchain {
    return this._options.defaultChain
  }

  get baseUrl(): string {
    if (this.isSandbox) {
      return Config.sandboxApiUrl
    } else if (this.isLocal) {
      return Config.localApiUrl
    }
    return Config.prodApiUrl
  }

  abstract get canWrite(): boolean

  protected abstract baseHeaders(): AxiosRequestHeaders
}
