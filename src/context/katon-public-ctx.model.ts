import { AccountPublicAPI } from 'src/account/account-public-api.model'
import { ProjectPublicAPI } from 'src/project/project-public-api.model'
import { KatonCtxOptions } from './katon-ctx-options.interface'
import { KatonCtx } from './katon-ctx.abtract'

export class KatonPublicCtx extends KatonCtx {
  protected _publicKey: string

  constructor(project: string, publicKey: string, options: KatonCtxOptions) {
    super(project, options)

    console.assert(
      publicKey !== null && publicKey !== undefined,
      'KatonCtx: publicKey is undefined.',
    )
    console.assert(
      typeof publicKey === 'string',
      'KatonCtx: publicKey should be a string.',
    )

    this._publicKey = publicKey

    this.accounts = AccountPublicAPI.obj()
    this.projects = ProjectPublicAPI.obj()
  }

  get canWrite(): boolean {
    return false
  }
}
