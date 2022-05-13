import { KatonCtxOptions } from './katon-ctx-options.interface'
import { KatonPublicCtx } from './katon-public-ctx.model'

declare const window: any

export class KatonPrivateCtx extends KatonPublicCtx {
  private _privateKey: string

  constructor(
    project: string,
    publicKey: string,
    privateKey: string,
    options: KatonCtxOptions,
  ) {
    super(project, publicKey, options)

    console.assert(
      privateKey !== null && privateKey !== undefined,
      'KatonCtx: privateKey is undefined.',
    )
    console.assert(
      typeof privateKey === 'string',
      'KatonCtx: privateKey should be a string.',
    )

    this._privateKey = privateKey

    if (window || this.isProd) {
      console.warn(
        '/!\\ Warning /!\\ Katon.io private contexts should only be used on secure servers.',
      )
    }
  }

  get canWrite(): boolean {
    return true
  }
}
