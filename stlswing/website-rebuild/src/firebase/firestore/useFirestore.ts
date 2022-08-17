import {
  deleteDoc,
  FirestoreError,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { pipe, propEq, reject, uniq, values } from 'ramda'
import { useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CurrentUserContext } from '../user'
import {
  addMetadata,
  createCollectionId,
  docExistsInCollection,
  getDocumentRef,
  updated
} from './firestore.helpers'
import { CollectionNames, DocumentDefaults } from './firestore.types'
import { ApiState, FirestoreContext } from './FirestoreContext'

/**
 * This hook is the single source of truth for API requests to the firestore database in this application, and is meant to be extended
 * It is a shorthand way to get the base api functions for any new collection.  See 'users/hooks/usePermissions' for an example
 * @param firestoreCollection name of the collection in firebase firestore
 */
export function useFirestore<T extends CollectionNames>(collectionName: T) {
  type InferValue<R> = R extends Record<string, infer V> ? V : never
  type Doc = InferValue<ApiState[T]>

  const { firebaseUser: user } = useContext(CurrentUserContext)
  const { apiState } = useContext(FirestoreContext)
  const [list, setList] = useState<Doc[]>()
  const [collectionMap, setCollectionMap] = useState<ApiState[T]>()

  useEffect(() => {
    const map = apiState[collectionName]
    if (!map) return
    setCollectionMap(map)
  }, [apiState])

  useEffect(() => {
    if (!collectionMap) return
    const filteredList = pipe(
      values,
      // @ts-ignore
      reject(propEq('deleted', true)),
      reject(propEq('hidden', true)),
      uniq
    )(collectionMap) as Doc[]
    setList(filteredList)
  }, [collectionMap])

  const getRef = getDocumentRef(collectionName)
  const docExists = docExistsInCollection(collectionName)
  const createId = createCollectionId(collectionName)
  //// const addHistory = addCollectionHistory(collectionName, user)
  //const addHistory = (...props: any[]) => {}

  /** Get A Single record from the db / cache */
  const getSingle = async (id: string) => {
    if (collectionMap && collectionMap[id]) return collectionMap[id]
    const document = await getDoc(getRef(id))
    return document.data() as Doc
  }

  /** Create a new record */
  const create = async (
    id: string,
    data: Omit<Doc, keyof DocumentDefaults>
  ) => {
    const payload = { id, ...data, ...addMetadata(user) }
    try {
      await setDoc(getRef(id), payload)
      toast.success(`Created ${collectionName}`)
      //await addHistory('CREATE', payload)
    } catch (err) {
      const e = err as FirestoreError
      toast.error(`Could not create ${collectionName}: ${e.message}`)
      //await addHistory('ERROR', getError(err), payload || {})
    }
  }

  /** Create a new record with a auto generated ID */
  const createWithId = useCallback(
    async (data: Omit<Doc, keyof DocumentDefaults>) => {
      const id = createId()
      const payload = { id, ...data, ...addMetadata(user) }

      try {
        await setDoc(getRef(id), payload)
        toast.success(`Created ${collectionName}`)
        //addHistory('CREATE', payload)
      } catch (err) {
        toast.error(`Could not create ${collectionName}. ${err}`)
        //await addHistory('ERROR', getError(err), payload || {})
      }
    },
    [user]
  )

  /** Update an existing record */
  const update = useCallback(
    async (id: string, data: Omit<Partial<Doc>, keyof DocumentDefaults>) => {
      const payload = { ...data, ...updated(user) }
      const previousRecord = collectionMap && collectionMap[id]

      try {
        await updateDoc(getRef(id), payload)
        // toast.success(`Updated ${collectionName} Record`)
        //addHistory('UPDATE', payload, previousRecord)
      } catch (err: any) {
        toast.error(`could not update ${collectionName}`)
        //addHistory('ERROR', err || {}, previousRecord)
      }
    },
    [user]
  )

  /** Add the deleted flag to a record */
  const remove = useCallback(
    async (id: string) => {
      const previousRecord = collectionMap && collectionMap[id]
      try {
        await updateDoc(getRef(id), { deleted: true })
        toast.success(`Record removed`)
        //addHistory('SOFT DELETE', { deleted: true }, previousRecord)
      } catch (err) {
        toast.error(`could not remove ${collectionName}`)
        //addHistory('ERROR', err, previousRecord)
      }
    },
    [user]
  )

  /** delete the record from the database */
  const hardDelete = useCallback(
    async (id: string) => {
      const previousRecord = collectionMap && collectionMap[id]
      try {
        await deleteDoc(getRef(id))
        toast.success(`deleted ${collectionName}`)
        //addHistory('HARD DELETE', {}, previousRecord)
      } catch (err) {
        toast.error(`could not delete ${collectionName}`)
        //addHistory('ERROR', err, previousRecord)
      }
    },
    [user]
  )

  return {
    apiState,
    list,
    map: collectionMap,
    collectionMap,
    getSingle,
    create,
    createWithId,
    update,
    remove,
    hardDelete,
    createId,
    docExists
  }
}

export const getCrud = <T extends CollectionNames>(collectionName: T) => {
  type InferValue<R> = R extends Record<string, infer V> ? V : never
  type Doc = InferValue<ApiState[T]>

  const getRef = getDocumentRef(collectionName)
  const createId = createCollectionId(collectionName)

  /** Get A Single record from the db / cache */
  const getSingle = async (id: string) => {
    const document = await getDoc(getRef(id))
    return document.data() as Doc
  }

  /** Create a new record */
  const create = async (
    id: string,
    data: Omit<Doc, keyof DocumentDefaults>
  ) => {
    const payload = { id, ...data }
    await setDoc(getRef(id), payload).then(console.log).catch(console.log)
    // try {
    //   await setDoc(getRef(id), payload)
    //   toast.success(`Created ${collectionName}`)
    // } catch (err) {
    //   const e = err as FirestoreError
    //   toast.error(`Could not create ${collectionName}: ${e.message}`)
    // }
  }

  /** Create a new record with a auto generated ID */
  const createWithId = async (data: Omit<Doc, keyof DocumentDefaults>) => {
    const id = createId()
    const payload = { id, ...data }

    await setDoc(getRef(id), payload).then(console.log).catch(console.log)

    // try {
    //   await setDoc(getRef(id), payload)
    //   console.log(`Created ${collectionName}`)
    // } catch (err) {
    //   console.log(`Could not create ${collectionName}. ${err}`)
    // }
  }

  return {
    getSingle,
    create,
    createWithId,
    createId
  }
}
