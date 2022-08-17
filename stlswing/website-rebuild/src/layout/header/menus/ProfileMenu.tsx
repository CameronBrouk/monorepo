import React, { useContext, useState } from 'react'
import { Loading } from '../../../shared/components/Loaders'
import { CurrentUserContext } from '../../../firebase/user'
import { HeaderDropDown } from '../components/HeaderDropDown'
import { Button } from '../../../shared/components/Button'

type Props = {
  openClasses?: () => void
  openEvents?: () => void
}
export const ProfileMenu = (props: Props) => {
  const {
    firebaseUser: user,
    logout,
    userLoading
  } = useContext(CurrentUserContext)
  const [open, setOpen] = useState(false)

  if (userLoading) return <Loading />

  return (
    <HeaderDropDown
      close={() => setOpen(false)}
      isOpen={open}
      toggle={() => setOpen((v) => !v)}
      text='My Profile'
    >
      <div className='sm:py-6 sm:gap-8 sm:p-8 relative grid items-start gap-2 px-5 py-3 pt-3 bg-white'>
        <button
          className='sm:p-3 sm:-m-3 sm:w-56 hover:bg-gray-100 block transition duration-150 ease-in-out rounded-md'
          onClick={() => {
            if (!props.openClasses) return
            props.openClasses()
            // navigateTo('/profile/Classes')
            setOpen(false)
          }}
        >
          <p className='font-medium text-left text-gray-900'>My Classes</p>
          <p className='mt-1 text-sm text-left text-gray-500'>
            View Information About Your Past and Current Classes
          </p>
        </button>
        <button
          className='sm:p-3 sm:-m-3 sm:w-56 hover:bg-gray-100 block transition duration-150 ease-in-out rounded-md'
          onClick={() => {
            if (!props.openEvents) return
            setOpen(false)
          }}
        >
          <p className='font-medium text-left text-gray-900'>My Events</p>
          <p className='mt-1 text-sm text-left text-gray-500'>
            View Information About Your Past and Current Events
          </p>
        </button>

        {/* {user && (
          <AvatarHeading
            image={user.photoUrl}
            subText={user.email}
            title={user.displayName}
          />
        )} */}

        <Button variant='raised' onClick={logout}>
          Log Out
        </Button>
      </div>
    </HeaderDropDown>
  )
}
