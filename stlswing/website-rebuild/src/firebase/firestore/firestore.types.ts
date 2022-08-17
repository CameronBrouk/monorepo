import { Operations } from '../hooks/useRevert'
import { ApiState } from './FirestoreContext'

export type CollectionNames = keyof ApiState
// | 'transactions'
// | 'users'
// | 'permissions'
// | 'groupClasses'
// | 'privateLessons'
// | 'events'
// | 'costs'
// | 'projections'
// | 'orders'
// | 'assets'
// | 'assetAssociations'
// | 'history'
// | 'faq'
// | 'changelog'

export type AddDocumentDefaults<Document, shouldAdd> = shouldAdd extends true
  ? Document & DocumentDefaults
  : Document

export type OmitDefaults<T> = Omit<T, keyof DocumentDefaults>

export type Document<T> = T & {
  id: string
  deleted?: boolean
  createdAt: string
  updatedAt: string
}

export type DocumentDefaults = {
  id: string
  deleted?: boolean
  hidden?: boolean
  draft?: boolean
  createdAt: string
  updatedAt: string
  updatedBy: string
  createdBy: string
}
export type History = {
  collection: Exclude<CollectionNames, 'history'>
  operation: Operations
  metadata: ApiState[keyof Omit<ApiState, 'history'>]
  previousState?: any
} & DocumentDefaults

export type NoDefaults<T> = Omit<T, keyof DocumentDefaults>
