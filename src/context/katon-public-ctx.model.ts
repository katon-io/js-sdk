import { KatonCtxOptions } from './katon-ctx-options.interface'
import { KatonCtx } from './katon-ctx.abtract'

import axios, {
  Axios,
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'
import { HttpHeaders, jsSdkOrigin } from '../common'
import { KatonAccounts } from '../account'

export class KatonPublicCtx extends KatonCtx {
  accounts: KatonAccounts

  protected _publicKey: string
  protected _http: Axios

  constructor(
    project: string,
    publicKey: string,
    options: KatonCtxOptions,
    accounts: KatonAccounts,
  ) {
    super(project, options)

    console.assert(
      publicKey !== null && publicKey !== undefined,
      'KatonCtx: publicKey is undefined.',
    )
    console.assert(
      typeof publicKey === 'string',
      'KatonCtx: publicKey should be a string.',
    )

    this._http = axios.create()
    this._publicKey = publicKey

    this.accounts = accounts
  }

  get canWrite(): boolean {
    return false
  }

  async tx(hash: string): Promise<any> {
    return this.doGet(`/v1/transactions/${hash}`)
  }

  async doGet<T>(path: string): Promise<T> {
    const response = await this._http
      .get<T, AxiosResponse<T>>(`${this.baseUrl}${path}`, {
        headers: this.baseHeaders(),
      })
      .catch((err: AxiosError) =>
        Promise.reject(err.response?.data || err.request || err.message),
      )
    return response.data
  }

  protected baseHeaders(): AxiosRequestHeaders {
    return {
      [HttpHeaders.KatonOriginHeader]: jsSdkOrigin,
      [HttpHeaders.KatonContextProject]: this._project,
      [HttpHeaders.KatonPublicKeyHeader]: this._publicKey,
    }
  }
}
