import { API } from '@unimpaired/backend'
import { createGroupClass } from './operations/create-group-class.js'
import {
  eagerGetGroupClass,
  lazyGetGroupClass
} from './operations/get-group-class.js'
import {
  eagerListGroupClasses,
  lazyListGroupClasses
} from './operations/list-group-class.js'
import { updateGroupClass } from './operations/update-group-class.js'

const groupClassApi: API = {
  LIST: {
    '/group-class': lazyListGroupClasses,
    '/group-class/data': eagerListGroupClasses
  },
  GET_SINGLE: {
    '/group-class/:id': lazyGetGroupClass,
    '/group-class/data/:id': eagerGetGroupClass
  },
  CREATE: createGroupClass,
  UPDATE: updateGroupClass
}

export default groupClassApi
