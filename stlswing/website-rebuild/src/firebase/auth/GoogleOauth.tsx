import React, { useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { firebaseApp } from '../../firebaseConfig'
import { Loading } from '../../shared/components/Loaders'

type Props = {
  afterLogin: () => void
}

export const GoogleOAuth = (props: Props) => {
  const [hasClicked, setHasClicked] = useState(false)

  const signInWithGoogle = () => {
    if (hasClicked) return
    setHasClicked(true)
    getAuth(firebaseApp)
    const provider = new GoogleAuthProvider()
    signInWithRedirect(getAuth(firebaseApp), provider).then(props.afterLogin)
  }

  return (
    <div
      onClick={signInWithGoogle}
      className='bg-gray-50 hover:bg-gray-200 flex w-full p-2 m-2 text-gray-800 transition-all duration-300 border border-gray-200 rounded-lg shadow-lg cursor-pointer'
    >
      <img
        className='w-8 h-8'
        alt='google logo'
        src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
      />
      <button
        className='flex items-center justify-between pl-2 font-medium text-center w-full'
        onClick={signInWithGoogle}
      >
        <p>Sign In With Google</p>
        {hasClicked && <Loading className='w-8 h-8' color='purple' />}
      </button>
    </div>
  )
}
