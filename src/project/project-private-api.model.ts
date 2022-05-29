import { ProjectPublicAPI } from './Project-public-api.model'

export class ProjectPrivateAPI extends ProjectPublicAPI {
  static obj(): ProjectPrivateAPI {
    if (!this._obj) {
      this._obj = new ProjectPrivateAPI()
    }

    return this._obj as ProjectPrivateAPI
  }
}
