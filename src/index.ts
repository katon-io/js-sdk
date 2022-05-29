import { KatonCtxOptions } from './context/katon-ctx-options.interface'
import { KatonPrivateCtx } from './context/katon-private-ctx.model'
import { KatonPublicCtx } from './context/katon-public-ctx.model'

export class KatonIO {
  /**
   * Create a new instance of KatonPublicCtx.
   * Public contexts allow read interactions with Katon.io APIs.
   * @param project - Identifier of the Katon.io project.
   * @param publicKey - Enabled public key of the project.
   * @param options - KatonCtxOptions.
   * @returns - New instance of KatonPublicCtx.
   */
  static publicCtx(
    project: string,
    publicKey: string,
    options: KatonCtxOptions,
  ): KatonPublicCtx {
    return new KatonPublicCtx(project, publicKey, options)
  }

  /**
   * Create a new instance of KatonPrivateCtx.
   * Private contexts allow read & write interactions with Katon.io APIs.
   * Should only be used on secure servers.
   * @param project - Identifier of the Katon.io project.
   * @param publicKey - Enabled public key of the project.
   * @param privateKey - Private key paired with the public key.
   * @param options - KatonCtxOptions.
   * @returns - New instance of KatonPrivateCtx.
   */
  static privateCtx(
    project: string,
    publicKey: string,
    privateKey: string,
    options: KatonCtxOptions,
  ): KatonPrivateCtx {
    return new KatonPrivateCtx(project, publicKey, privateKey, options)
  }
}
