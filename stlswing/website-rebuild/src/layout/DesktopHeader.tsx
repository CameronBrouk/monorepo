import React, { useContext, useState } from 'react'
import { SignInModal } from '../firebase/auth/SignInModal'
import { CurrentUserContext, usePermissions } from '../firebase/user'
import { Button } from '../shared/components/Button'
import { ClassesMenu, MoreMenu, ViewAsMenu, HeaderLink } from './header'

export const DesktopHeader = () => {
  const { hasRole, hasClearance, isLoggedIn } = usePermissions()
  // const { navigateTo } = useRouter()
  const { userLoading } = useContext(CurrentUserContext)
  const [loginVisible, setLoginVisible] = useState(false)

  return (
    <>
      {
        <div className='sm:justify-center sm:w-full flex bg-transparent'>
          <div className='absolute z-30 flex justify-between flex-shrink-0 w-full h-16'>
            {/* <OpenSidebarButton toggleSidebar={toggleSidebar} /> */}
            {/* <CurrentEvent isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}

            {/* Header Links  */}
            <div className='sm:flex justify-center hidden w-full'>
              <HeaderLink route='/'>Home</HeaderLink>

              {/* <HeaderLink route='/'>Home</HeaderLink> */}
              <HeaderLink route='/swing-dance-events'>Events</HeaderLink>

              <HeaderLink route='/calendar'>Calendar</HeaderLink>

              <ClassesMenu />

              <MoreMenu />

              {hasClearance(3) && <ViewAsMenu />}

              {isLoggedIn ? (
                <div className='flex items-center mr-3'>
                  {!userLoading && (
                    <Button
                      variant='raised'
                      onClick={() => setLoginVisible((v) => !v)}
                    >
                      Login
                    </Button>
                  )}
                </div>
              ) : (
                <div />
              )}

              {(hasRole('admin') || hasRole('employee')) && (
                <HeaderLink route='/admin'>
                  <p className='text-gray-800 border uppercase border-white rounded-md p-2 bg-sky-50'>
                    Admin
                  </p>
                </HeaderLink>
              )}
            </div>
          </div>
        </div>
      }

      {/* Sign In Modal */}
      <SignInModal
        title='Log In'
        isOpen={loginVisible}
        onClose={() => setLoginVisible(false)}
      />
    </>
  )
}
