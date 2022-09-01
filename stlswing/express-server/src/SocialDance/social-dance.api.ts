import { API } from '@unimpaired/backend'
import { createSocialDance } from './operations/create-social-dance.js'
import {
  eagerGetSocialDance,
  lazyGetSocialDance
} from './operations/get-social-dance.js'
import {
  eagerListSocialDances,
  lazyListSocialDances
} from './operations/list-social-dance.js'
import { updateSocialDance } from './operations/update-social-dance.js'

const socialDanceApi: API = {
  LIST: {
    '/social-dance': lazyListSocialDances,
    '/social-dance/data': eagerListSocialDances
  },
  GET_SINGLE: {
    '/social-dance/:id': lazyGetSocialDance,
    '/social-dance/data/:id': eagerGetSocialDance
  },
  CREATE: createSocialDance,
  UPDATE: updateSocialDance
}

export default socialDanceApi
