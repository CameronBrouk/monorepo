import React from 'react'
import { useRouter } from 'src/shared/hooks/useRouter'

type Props = {
  text?: string
  hideTerms?: boolean
  className?: string
  children?: React.ReactNode
}
export const LoggedInGuard = (props: Props) => {
  const { navigateTo } = useRouter()
  // const { userLoading } = useContext(CurrentUserContext)
  // const { isLoggedIn } = usePermissions()

  // if (userLoading) return <Loading className='w-16 h-16' />

  // if (true)
  //   return (
  //     <div
  //       className={`w-full flex justify-center items-center h-full ${
  //         props.className || ''
  //       }`}>
  //       <div className='sm:m-10 max-w-md mx-auto'>
  //         <p className='p-6 text-lg font-medium text-center text-red-500'>
  //           {props.text || 'Account Required'}
  //         </p>
  //         {!isWebview() ? (
  //           <GoogleOAuth afterLogin={() => {}} />
  //         ) : (
  //           <p className='sm:m-10 text-red-800'>
  //             We have detected that you are currently within a webview. Please
  //             open the website in a browser in order to login
  //           </p>
  //         )}
  //         {!props.hideTerms && (
  //           <p className='text-gray-800'>
  //             By signing up, you agree to our{' '}
  //             <button
  //               className='text-blue-500'
  //               onClick={() => navigateTo('/privacy-policy')}>
  //               privacy policy
  //             </button>{' '}
  //             and{' '}
  //             <button
  //               className='text-blue-500'
  //               onClick={() => navigateTo('/terms-of-service')}>
  //               terms of service
  //             </button>
  //           </p>
  //         )}
  //       </div>
  //     </div>
  //   )

  return props.children
}
