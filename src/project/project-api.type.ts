import { ProjectPrivateAPI } from './project-private-api.model'
import { ProjectPublicAPI } from './project-public-api.model'

export type ProjectAPI = ProjectPublicAPI | ProjectPrivateAPI
