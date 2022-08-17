import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import {
  CurrentUserContext,
  Role,
  usePermissions
} from '../../../firebase/user'
import { Button } from '../../../shared/components/Button'
import { HeaderDropDown } from '../components/HeaderDropDown'

export const ViewAsMenu = () => {
  const { firebaseUser: user, setFirebaseUser: setUser } =
    useContext(CurrentUserContext)
  const [adminOpen, setAdminOpen] = useState(false)
  // prettier-ignore

  const { setPermissions, permissions } = useContext(CurrentUserContext)
  const { hasClearance } = usePermissions()

  const getClassName = (role: Role) =>
    role === permissions.role ? 'bg-blue-200 text-gray-200' : ''

  const ViewAsButton = (role: Role, label: string) => (
    <>
      <Button
        onClick={() => setPermissions((p) => ({ ...p, role }))}
        className={`flex space-x-2 items-center w-full ${getClassName(role)}`}
      >
        <FontAwesomeIcon icon={faEye} />
        <span>{label}</span>
      </Button>
    </>
  )

  return (
    <>
      <HeaderDropDown
        text='View As'
        isOpen={adminOpen}
        toggle={() => setAdminOpen((v) => !v)}
        close={() => setAdminOpen(false)}
      >
        <div className='h-screen sm:h-full sm:w-[500px] sm:p-8 flex flex-col items-start w-screen p-4 space-y-2'>
          {/* <UserSelect selectUser={setUser} userId={user?.id} /> */}
          {hasClearance(4) && ViewAsButton('admin', 'Admin')}
          {ViewAsButton('employee', 'Teacher')}
          {ViewAsButton('customer', 'Student')}
          {ViewAsButton('visitor', 'Not Logged In')}
        </div>
      </HeaderDropDown>
    </>
  )
}
