import { KatonCtxOptions } from './context/katon-ctx-options.interface'
import { KatonPrivateCtx } from './context/katon-private.model'
import { KatonPublicCtx } from './context/katon-public-ctx.model'

export class KatonIO {
  /**
   * In-memory public context.
   */
  static _publicCtx?: KatonPublicCtx
  /**
   * In-memory private context.
   */
  static _privateCtx?: KatonPrivateCtx

  /**
   * Create a new instance of KatonPublicCtx.
   * Public contexts allow read interactions with Katon.io APIs.
   * @param project - Identifier of the Katon.io project.
   * @param publicKey - Enabled public key of the project.
   * @param options - KatonCtxOptions.
   * @returns - New instance of KatonPublicCtx.
   */
  static newPublicCtx(
    project: string,
    publicKey: string,
    options: KatonCtxOptions,
  ): KatonPublicCtx {
    return new KatonPublicCtx(project, publicKey, options)
  }

  /**
   * Returns in memory public context (or create a new one if none)
   * Public contexts allow read interactions with Katon.io APIs.
   * @param project - Identifier of the Katon.io project.
   * @param publicKey - Enabled public key of the project.
   * @param options - KatonCtxOptions.
   * @returns - New instance of KatonPublicCtx.
   */
  static initPublicCtx(
    project: string,
    publicKey: string,
    options: KatonCtxOptions,
  ): KatonPublicCtx {
    if (!this._publicCtx) {
      this._publicCtx = KatonIO.newPublicCtx(project, publicKey, options)
    }
    return this._publicCtx
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
  static newPrivateCtx(
    project: string,
    publicKey: string,
    privateKey: string,
    options: KatonCtxOptions,
  ): KatonPrivateCtx {
    return new KatonPrivateCtx(project, publicKey, privateKey, options)
  }

  /**
   * Returns in memory private context (or create a new one if none)
   * Private contexts allow read & write interactions with Katon.io APIs.
   * Should only be used on secure servers.
   * @param project - Identifier of the Katon.io project
   * @param publicKey - Enabled public key of the project.
   * @param privateKey - Private key paired with the public key.
   * @returns - New instance of KatonPrivateCtx
   */
  static initPrivateCtx(
    project: string,
    publicKey: string,
    privateKey: string,
    options: KatonCtxOptions,
  ): KatonPrivateCtx {
    if (!this._privateCtx) {
      this._privateCtx = this.newPrivateCtx(
        project,
        publicKey,
        privateKey,
        options,
      )
    }
    return this._privateCtx
  }
}
