import { useCallback, useMemo } from 'react'
import { Clearance, Role, Group } from './user.types'
import { CurrentUserContext } from './CurrentUserContext'
import { useContext } from 'react'

/**
 * This hook exposes helper functions that allow you to change a users
 * permissions, or check whether a user has a certain permission.
 * @warning This hook can only be used inside of a component wrapped with CurrentUserContext
 */
export const usePermissions = () => {
  const { permissions, firebaseUser } = useContext(CurrentUserContext)

  const { groups, role, clearance } = permissions

  const hasRole = useCallback(
    (requiredRole: Role) => role === requiredRole,
    [role]
  )

  const hasAnyRole = useCallback(
    (roles: Role[]) =>
      roles.reduce((hasPermission, currRole) => {
        if (hasPermission) return true
        return currRole === role
      }, false),
    [role]
  )

  const hasClearance = useCallback(
    (requiredClearance: Clearance) => clearance >= requiredClearance,
    [clearance]
  )

  const hasGroup = useCallback(
    (groupRequired: Group) => groups.includes(groupRequired),
    [groups]
  )

  const isLoggedIn = useMemo(() => role !== 'visitor' && !!firebaseUser, [role])

  return {
    hasAnyRole,
    hasRole,
    hasClearance,
    hasGroup,
    isLoggedIn,
    currentUserPermissions: permissions
  }
}
