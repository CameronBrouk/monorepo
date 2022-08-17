import { useRouter } from '../../../shared/hooks/useRouter'
import { Link } from 'react-router-dom'
import React from 'react'

type Props = {
  route: string
  dropDownLink?: boolean
  onClose?: () => void
  children?: React.ReactNode
  className?: string
}

export const HeaderLink = ({ children, route, ...props }: Props) => {
  const { currentRoute } = useRouter()

  const dropDownLinkStyles =
    'text-gray-500 hover:bg-gray-300 hover:border-white  hover:text-gray-900'

  const onClick = () => {
    if (props.onClose) props.onClose()
  }

  return (
    <Link
      to={route}
      {...props}
      onClick={onClick}
      className={`px-4 py-2 font-medium items-center jutify-center flex text-white cursor-pointer transition-all duration-500 border-b-2 border-transparent hover:border-white ${
        props.className
      } ${currentRoute === route ? 'border-white' : ''} ${
        props.dropDownLink ? dropDownLinkStyles : ''
      }`}
    >
      {children}
    </Link>
  )
}
