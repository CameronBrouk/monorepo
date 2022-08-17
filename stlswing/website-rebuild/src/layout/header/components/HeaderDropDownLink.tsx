import { useRouter } from '../../../shared/hooks/useRouter'
import React from 'react'

type Props = {
  closeMenu: () => void
  route: string
  description: string
  children?: React.ReactNode
}

export const HeaderDropDownLink = (props: Props) => {
  const { navigateTo } = useRouter()
  return (
    <button
      className='block transition duration-150 ease-in-out rounded-md sm:p-3 sm:-m-3 sm:w-56 hover:bg-gray-100'
      onClick={() => {
        navigateTo(props.route)
        props.closeMenu()
      }}
    >
      <p className='font-medium text-left text-gray-900'>{props.children}</p>
      <p className='mt-1 text-sm text-left text-gray-500'>
        {props.description}
      </p>
    </button>
  )
}
