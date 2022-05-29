import { ProjectAPI } from './project-api.type'

export class ProjectPublicAPI {
  protected static _obj: ProjectAPI

  protected constructor() {}

  static obj(): ProjectPublicAPI {
    if (!this._obj) {
      this._obj = new ProjectPublicAPI()
    }

    return this._obj as ProjectPublicAPI
  }
}
