import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, SubmitButton } from 'src/shared/components/Button'
import { Input } from 'src/shared/components/Form'

type Props = {
  afterRegister?: (user: any) => void
  switchToSignin: () => void
}
export const Register = ({ switchToSignin }: Props) => {
  const [error /** setError **/] = useState('')
  const formProps = useForm()

  type FormData = {
    email: string
    password: string
    displayName: string
  }
  const onSubmit = () => {
    // auth
    //   .createUserWithEmailAndPassword(formData.email, formData.password)
    //   .then(({ user }) => {
    //     if (user) {
    //       createPermissions(user.uid, {
    //         clearance: 1,
    //         role: 'customer',
    //         groups: ['user'],
    //       })
    //       createUser(user.uid, {
    //         email: user.email || '',
    //         emailVerified: user.emailVerified,
    //         id: user.uid,
    //         stripeId: '',
    //         displayName: user.displayName || formData.displayName || '',
    //         phone: user.phoneNumber || '',
    //         photoUrl: user.photoURL || '',
    //         member: false,
    //         position: 'undecided',
    //         studentDiscount: false,
    //       })
    //       if (!!afterRegister) afterRegister(user)
    //     }
    //   })
    //   .catch(({ message }) => setError(message))
  }

  return (
    <form onSubmit={formProps.handleSubmit(onSubmit)}>
      <Input
        form={formProps}
        label='Display Name'
        autoFocus
        required
        name='displayName'
      />

      <Input
        form={formProps}
        label='Email'
        type='email'
        name='email'
        required
        pattern={{
          value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/,
          message: 'Invalid Email'
        }}
      />

      <Input
        form={formProps}
        label='Password'
        required
        type='password'
        name='password'
        minLength={8}
      />

      {error && <p className='text-red-400'>{error}</p>}

      <SubmitButton type='submit' variant='raised' className='mt-6'>
        Create an Account
      </SubmitButton>

      <Button type='button' onClick={switchToSignin} className='ml-2'>
        Sign In
      </Button>
    </form>
  )
}
