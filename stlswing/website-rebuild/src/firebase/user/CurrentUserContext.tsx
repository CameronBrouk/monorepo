import { createContext, useEffect, useState } from 'react'
import { Permissions } from './user.types'
import {
  getAuth,
  onIdTokenChanged,
  signOut,
  User
} from 'firebase/auth'
import { firebaseApp } from '../../firebaseConfig'

type TCurrentUserContext = {
  firebaseUser?: User
  permissions: Permissions
  setPermissions: SetState<Permissions>
  setFirebaseUser: SetState<User | undefined>
  logout: () => void
  userLoading: boolean
  isLoggedIn: boolean
}

const auth = getAuth(firebaseApp)

const defaultPermissions: Permissions = {
  clearance: 0,
  role: 'visitor',
  groups: []
}

const defaultContext: TCurrentUserContext = {
  permissions: defaultPermissions,
  setPermissions: () => {},
  setFirebaseUser: () => {},
  logout: () => {},
  isLoggedIn: false,
  userLoading: false
}

export const CurrentUserContext =
  createContext<TCurrentUserContext>(defaultContext)

export const CurrentUserProvider = ({ children }: any) => {
  const [firebaseUser, setFirebaseUser] = useState<User>()
  const [permissions, setPermissions] = useState(defaultPermissions)
  const [userLoading, setUserLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    onIdTokenChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) return
      setUserLoading(true)

      setFirebaseUser(firebaseUser)

      setUserLoading(false)
      setIsLoggedIn(true)
      setPermissions({
        clearance: 1,
        groups: [],
        role: 'customer'
      })
    })
  }, [])

  const logout = () => {
    setFirebaseUser(undefined)
    setIsLoggedIn(false)
    setPermissions(defaultPermissions)
    signOut(auth)
  }

  return (
    <CurrentUserContext.Provider
      value={{
        firebaseUser,
        permissions,
        setPermissions,
        setFirebaseUser,
        logout,
        userLoading,
        isLoggedIn
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}
