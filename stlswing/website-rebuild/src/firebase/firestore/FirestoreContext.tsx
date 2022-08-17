import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore'
import React, { createContext, useState, useEffect } from 'react'
import { firebaseApp } from '../../firebaseConfig'
import { usePermissions, User } from '../user'
import { CollectionNames } from './firestore.types'
// import { GroupClass, PrivateLesson, Event } from 'app/stlswing/stlswing.types'
// // prettier-ignore
// import { Cost, Order, Projection } from 'app/stlswing/components/Accounting/finance.types'
// import {
//   collection,
//   getFirestore,
//   query,
//   onSnapshot,
// } from '@firebase/firestore'
// import { firebaseApp } from 'environments'
import { indexBy, prop } from 'ramda'
// // prettier-ignore
// import { CollectionNames, User, Permissions, DocumentDefaults, History, usePermissions} from 'app/shared'
// import {
//   Asset,
//   AssetAssociation,
// } from 'app/shared/components/Assets/Assets.types'
// import { FAQ } from 'app/stlswing/components/FAQ/Faq.types'
// import { Changelog } from 'app/stlswing/components/Accounting/sections/ChangelogDashboard'
// import { Transaction } from 'app/stlswing/pages/CardReader'

export type ApiState = {
  permissions?: Record<string, Permissions>
  users?: Record<string, User>
  groupClasses?: Record<string, object>
  // privateLessons?: Record<string, PrivateLesson<true>>
  // events?: Record<string, Event<true>>
  // costs?: Record<string, Cost<true>>
  // projections?: Record<string, Projection<true>>
  // orders?: Record<string, Order>
  // assets?: Record<string, Asset>
  // assetAssociations?: Record<string, AssetAssociation>
  // history?: Record<string, History & DocumentDefaults>
  // faq?: Record<string, FAQ>
  // changelog?: Record<string, Changelog>
  // transactions?: Record<string, Transaction>
}

const publicCollections: CollectionNames[] = [
  // 'goals',
  // 'tasks',
  // 'options',
  //   'events',
  //   'groupClasses',
  //   'orders',
  //   'faq',
  //   'transactions',
]

const privateCollections: CollectionNames[] = [
  // 'costs',
  // 'history',
  // 'orders',
  'users',
  'permissions'
  // 'faq',
  // 'changelog',
  // 'assetAssociations',
  // 'assets',
]

export const firestoreRef = getFirestore(firebaseApp)

const defaultContext = {
  apiState: {},
  setApiState: () => {}
}

type Context = {
  apiState: ApiState
  setApiState: SetState<ApiState>
}

export const FirestoreContext = createContext<Context>(defaultContext)

export const FirestoreProvider = ({ children }: any) => {
  const [apiState, setApiState] = useState<ApiState>({})
  const { hasAnyRole, currentUserPermissions } = usePermissions()

  // Public Collections that Everyone Has Read Access too
  useEffect(() => {
    const listeners = publicCollections.map(collectionListener)
    return () => {
      Promise.all(listeners).then((listeners) => listeners.forEach((u) => u()))
    }
  }, [])

  useEffect(() => {
    if (!hasAnyRole(['admin', 'employee'])) return

    const listeners = privateCollections.map(collectionListener)
    return () => {
      Promise.all(listeners).then((listeners) => listeners.forEach((u) => u()))
    }
  }, [currentUserPermissions.role])

  async function collectionListener(collectionName: CollectionNames) {
    const queryRef = query(collection(firestoreRef, collectionName))

    return await onSnapshot(queryRef, (snapshot) => {
      setApiState((prev) => ({
        ...prev,
        [collectionName]: indexBy(
          // @ts-ignore
          prop('id'),
          snapshot.docs.map((d) => d.data())
        )
      }))
    })
  }

  return (
    <FirestoreContext.Provider value={{ apiState, setApiState }}>
      {children}
    </FirestoreContext.Provider>
  )
}
