import { getFunctions, httpsCallable } from 'firebase/functions'

import {
  collection,
  doc,
  FieldPath,
  FirestoreError,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  WhereFilterOp
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { User } from '../user'
import { CollectionNames } from './firestore.types'
import { firebaseApp } from '../../firebaseConfig'
import { Operations } from '../hooks/useRevert'

// export const addMetadata = (user?: User) => ({
export const addMetadata = (user?: any) => ({
  ...updated(user),
  ...created(user),
  deleted: false,
  hidden: false
})

// export const updated = (user?: User) => ({
export const updated = (user?: any) => ({
  updatedAt: new Date().toISOString(),
  updatedBy: user?.id
})

type FirestoreWhere<T extends Record<string, any>> = [
  keyof T extends FieldPath ? T : string,
  WhereFilterOp,
  any
]
type Options<T> = {
  where?: FirestoreWhere<T>[]
  limit?: number
  orderBy?: keyof T extends string ? string : FieldPath
}

export const getFirestoreCollection = async <T extends Record<string, any>>(
  collectionName: CollectionNames,
  options?: Options<T>
) => {
  const constraints =
    options?.where?.map((params) => {
      // @ts-ignore
      return where(...params)
    }) || []
  const amount = options?.limit ? [limit(options.limit)] : []
  const orderByProp = options?.orderBy ? [orderBy(options.orderBy)] : []
  const collectionQuery = query(
    collection(getFirestore(firebaseApp), collectionName),
    ...constraints,
    ...orderByProp,
    ...amount
  )
  const { docs } = await getDocs(collectionQuery)
  return docs.map((doc) => doc.data() as T)
}

export const created = (user?: User) => ({
  createdAt: new Date().toISOString(),
  createdBy: user?.id
})

export const getDocumentRef =
  (collectionName: CollectionNames) => (id: string) =>
    doc(getFirestore(firebaseApp), collectionName, id)

export const docExistsInCollection =
  (collectionName: CollectionNames) => async (id: string) => {
    const document = await getDoc(getDocumentRef(collectionName)(id))
    return document.exists()
  }

export const createCollectionId = (collectionName: CollectionNames) => () =>
  doc(collection(getFirestore(firebaseApp), collectionName)).id

/** This Function Appends  */
export const addCollectionHistory =
  (collectionName: CollectionNames, user?: User) =>
  async (operation: Operations, newState: any, previousState: any = {}) => {
    const id = doc(collection(getFirestore(firebaseApp), 'history')).id
    await setDoc(doc(getFirestore(firebaseApp), `history/${id}`), {
      id,
      collection: collectionName,
      operation,
      metadata: newState || {},
      previousState: previousState || {},
      ...created(user),
      ...updated(user)
    })
    // .then(() => toast.success('Added To History'))
    // .catch(() => toast.error('Could Not Add to History'))
  }

export const getError = (e: any) => {
  const error = e as FirestoreError
  if (!error) return {}
  return {
    message: error.message || 'No Message',
    code: error.code || '500',
    name: error.name || 'Firebase Error'
  }
}

export const errorToast = (message: string) => () =>
  toast.error(message || 'an unknown error occured')

export const successToast = (message: string) => () =>
  toast.error(message || 'an unknown error occured')

export const callFirebaseFunction = async <Request, Response>(
  name: string,
  params: Request
) => {
  const response = await httpsCallable<Request, Response>(
    getFunctions(firebaseApp),
    name
  )(params)
    .then((res) => res.data as Response)
    .catch((err) => toast.error(err))

  if (typeof response === 'string' || typeof response === 'number') return
  return response
}
