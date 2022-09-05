import { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { KatonPrivateAccounts } from '../account'
import { HttpHeaders, jsSdkOrigin } from '../common'
import { KatonCtxOptions } from './katon-ctx-options.interface'
import { KatonPublicCtx } from './katon-public-ctx.model'

export class KatonPrivateCtx extends KatonPublicCtx {
  accounts: KatonPrivateAccounts

  private _privateKey: string

  constructor(
    project: string,
    publicKey: string,
    privateKey: string,
    options: KatonCtxOptions,
  ) {
    super(project, publicKey, options, null)

    console.assert(
      privateKey !== null && privateKey !== undefined,
      'KatonCtx: privateKey is undefined.',
    )
    console.assert(
      typeof privateKey === 'string',
      'KatonCtx: privateKey should be a string.',
    )

    this._privateKey = privateKey
    this.accounts = KatonPrivateAccounts.obj(this)
  }

  get canWrite(): boolean {
    return true
  }

  async doPost<T, U>(path: string, body: U): Promise<T> {
    const response = await this._http
      .post<T, AxiosResponse<T>, U>(`${this.baseUrl}${path}`, body, {
        headers: this.baseHeaders(),
      })
      .catch((err: AxiosError) => Promise.reject(err.response.data))

    return response.data
  }

  async doPut<T, U>(path: string, body: U): Promise<T> {
    const response = await this._http
      .put<T, AxiosResponse<T>, U>(`${this.baseUrl}${path}`, body, {
        headers: this.baseHeaders(),
      })
      .catch((err: AxiosError) => Promise.reject(err.response.data))

    return response.data
  }

  async doPatch<T, U>(path: string, body: U): Promise<T> {
    const response = await this._http
      .patch<T, AxiosResponse<T>, U>(`${this.baseUrl}${path}`, body, {
        headers: this.baseHeaders(),
      })
      .catch((err: AxiosError) => Promise.reject(err.response.data))

    return response.data
  }

  async doDelete<T>(path: string): Promise<T> {
    const response = await this._http
      .delete<T, AxiosResponse<T>>(`${this.baseUrl}${path}`, {
        headers: this.baseHeaders(),
      })
      .catch((err: AxiosError) => Promise.reject(err.response.data))

    return response.data
  }

  protected baseHeaders(): AxiosRequestHeaders {
    return {
      [HttpHeaders.KatonOriginHeader]: jsSdkOrigin,
      [HttpHeaders.KatonContextProject]: this._project,
      [HttpHeaders.KatonPublicKeyHeader]: this._publicKey,
      [HttpHeaders.KatonPrivateKeyHeader]: this._privateKey,
    }
  }
}
