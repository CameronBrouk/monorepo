import {
  faCalendar,
  faForward,
  faGear,
  faHome,
  faPeopleGroup
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRouter } from '../shared/hooks/useRouter'

const routes = [
  {
    text: 'Home',
    route: '/',
    faIcon: faHome
  },
  {
    text: 'Learn',
    route: '/learn',
    faIcon: faPeopleGroup
  },
  {
    text: 'Calendar',
    route: '/events',
    faIcon: faCalendar
  },
  {
    text: 'Info',
    route: '/more',
    faIcon: faForward
  },
  {
    text: 'Profile',
    route: '/profile',
    faIcon: faGear
  }
]

export const MobileBottomNav = React.forwardRef(() => {
  const { currentRoute } = useRouter()
  return (
    <div
      className='flex justify-between border-t bg-gray-900'
      style={{ height: 80 }}
    >
      {routes.map((route) => (
        <NavItem
          key={route.text}
          {...route}
          isActive={currentRoute === route.route}
        />
      ))}
    </div>
  )
})

type NavItemProps = {
  route: string
  text: string
  faIcon: FontAwesomeIconProps['icon']
  isActive?: boolean
}
const NavItem = (props: NavItemProps) => {
  const textColor = props.isActive ? '' : 'text-gray-200'
  return (
    <Link
      to={props.route}
      className={`flex flex-col items-center m-2 p-1 justify-center w-full sm:hidden ${
        props.isActive ? 'bg-blue-200 rounded-md' : ''
      }`}
    >
      <FontAwesomeIcon
        icon={props.faIcon}
        className={`${textColor} text-center`}
      />
      <p className={`${textColor} text-xs pt-1 font-medium text-center`}>
        {props.text}
      </p>
    </Link>
  )
}
