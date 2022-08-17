import React from 'react'
import { useRouter } from '../../shared/hooks/useRouter'
import { Modal } from '../../shared/components/Modal'
import { isWebview } from './auth.helpers'
import { GoogleOAuth } from './GoogleOauth'

type Props = {
  isOpen: boolean
  title: string
  onClose: () => void
}
export const SignInModal = (props: Props) => {
  const { navigateTo } = useRouter()

  return (
    <Modal {...props} type='right-panel' className='text-black' disallowRouting>
      <div className='sm:m-10 m-5'>
        {!isWebview() ? (
          <GoogleOAuth afterLogin={props.onClose} />
        ) : (
          <p className='sm:m-10 text-red-800'>
            We have detected that you are currently within a webview. Please
            open the website in a browser in order to login
          </p>
        )}
        <p className='text-gray-800'>
          By signing up, you agree to our{' '}
          <button
            className='text-blue-500'
            onClick={() => navigateTo('/privacy-policy')}
          >
            privacy policy
          </button>{' '}
          and{' '}
          <button
            className='text-blue-500'
            onClick={() => navigateTo('/terms-of-service')}
          >
            terms of service
          </button>
        </p>
      </div>
      {/* <h2 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>
        {modalState === 'login' && 'Sign in to your account'}
        {modalState === 'register' && 'Create an Account'}
      </h2> */}

      {/* {modalState === 'login' && (
        <Login
          switchToRegister={() => setModalState('register')}
          afterLogin={props.onClose}
        />
      )} */}

      {/* {modalState === 'register' && (
        <Register
          switchToSignin={() => setModalState('login')}
          afterRegister={props.onClose}
        />
      )} */}
    </Modal>
  )
}
