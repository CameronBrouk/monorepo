import { useContext, useState } from 'react'
import { SignInModal } from '../firebase/auth/SignInModal'
import { Button } from '../shared/components/Button'
import { Loading } from '../shared/components/Loaders'
import { Modal } from '../shared/components/Modal'
import { CurrentUserContext, usePermissions } from '../firebase/user'
import { useRouter } from '../shared/hooks/useRouter'
import { OpenSidebarButton } from './header/components/OpenSidebarButton'
import { ViewAsMenu } from './header/menus/ViewAsMenu'

const moreLinks: { name: string; route: string }[] = [
  { name: 'Resources', route: '/resources' },
  { name: 'About', route: '/about' }
  // { name: 'FAQ', route: '/faq' },
]
const links: { name: string; route: string }[] = [
  { name: 'Home', route: '/' },
  { name: 'Group Classes', route: '/swing-dance-classes/groupClasses' },
  { name: 'Dances and Events', route: '/swing-dance-events' },
  { name: 'Calendar', route: '/calendar' },
  ...moreLinks
]

export const MobileHeader = () => {
  const [signInOpen, setSignInOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const {
    firebaseUser: user,
    logout,
    userLoading
  } = useContext(CurrentUserContext)
  const { isLoggedIn, hasAnyRole, hasClearance } = usePermissions()
  const { navigateTo } = useRouter()

  const buttonClasses =
    'block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white'

  return (
    <div className='relative md:hidden w-screen'>
      <div className='absolute z-30 top-0 left-0 h-16 flex justify-between w-screen items-center'>
        {/* <h1 className='text-white font-medium text-xl ml-2'>STL Swing</h1> */}
        {/* <Breadcrumbs
            titles={['Home', 'Group Classes']}
            onClickTitle={() => console.log('')}
          /> */}
        <OpenSidebarButton toggleSidebar={() => setIsSidebarOpen((v) => !v)} />
      </div>

      <Modal
        className='!text-white !bg-gray-800 !w-screen'
        isOpen={isSidebarOpen}
        title='Navigation'
        onClose={() => setIsSidebarOpen(false)}
        type='left-panel'
      >
        <div className='max-w-screen max-w-7xl sm:px-6 lg:px-8 w-screen px-4 mx-auto'>
          {/* Admin Shit */}
          {hasClearance(3) && <ViewAsMenu />}
          {hasAnyRole(['admin', 'employee']) && (
            <button
              className={
                'border bg-gray-50 text-gray-800 ml-4 px-4 py-1 rounded-full font-medium'
              }
              onClick={() => navigateTo('/admin/products')}
            >
              Go To Admin Page
            </button>
          )}

          <div className='sm:hidden' id='mobile-menu'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {links.map(({ name, route }) => (
                <button
                  onClick={() => {
                    navigateTo(route)
                    setIsSidebarOpen(false)
                  }}
                  key={name}
                  className={buttonClasses}
                >
                  {name}
                </button>
              ))}
            </div>

            {userLoading && <Loading className='' />}

            {!isLoggedIn && !userLoading && (
              <>
                <div className='px-4 pt-4 pb-3 border-t border-gray-700'>
                  <Button variant='raised' onClick={() => setSignInOpen(true)}>
                    Login
                  </Button>
                </div>
                <SignInModal
                  title='Log In'
                  isOpen={signInOpen}
                  onClose={() => setSignInOpen(false)}
                />
              </>
            )}

            {/* User Shit */}
            {isLoggedIn && user && (
              <div className='pt-4 pb-3 border-t border-gray-700'>
                <div className='flex items-center px-5'>
                  <div className='flex-shrink-0'>
                    {/* {user.photoUrl && ( */}
                    {user.photoURL && (
                      <img
                        className='w-10 h-10 rounded-full'
                        // src={user.photoUrl}
                        src={user.photoURL}
                        alt=''
                      />
                    )}
                  </div>
                  <div className='ml-3'>
                    <div className='text-base font-medium text-white'>
                      {user.displayName}
                    </div>
                    <div className='text-sm font-medium text-gray-400'>
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className='px-2 mt-3 space-y-1'>
                  <Button variant='raised' className='ml-2' onClick={logout}>
                    Sign out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
