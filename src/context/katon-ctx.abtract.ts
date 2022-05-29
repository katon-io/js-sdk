import { AccountAPI } from 'src/account/account-api.type'
import { Blockchains } from 'src/blockchains.enum'
import { Environments } from 'src/environments.enum'
import { ProjectAPI } from 'src/project/project-api.type'
import { KatonCtxOptions } from './katon-ctx-options.interface'

export abstract class KatonCtx {
  public accounts: AccountAPI
  public projects: ProjectAPI

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
      defaultChain: ctxOptions.defaultChain || Blockchains.elrond,
      env: ctxOptions.env || Environments.prod,
    }
  }

  get project(): string {
    return this.project
  }

  get options(): KatonCtxOptions {
    return this._options
  }

  get isProd(): boolean {
    return this._options.env === Environments.prod
  }

  abstract get canWrite(): boolean
}
