import React, { useEffect, useState } from 'react'
import { animated, useTransition } from '@react-spring/web'
import { indexOf, tail } from 'ramda'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { capitalCase } from 'change-case'
import { useRouter } from '../../hooks/useRouter'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom'

type BreadCrumb = {
  text: string
  route: string
  icon?: IconProp
}

const GLOBAL_OVERRIDES: Record<string, string> = {}

export const translateRouteToCrumbs = (
  url: string,
  overrides: Record<string, Omit<BreadCrumb, 'route'>> = {}
) => {
  return tail(url)
    .split('/')
    .reduce((crumbList, currentRoute, i) => {
      const newCrumb = {
        route: `${crumbList[i - 1]?.route || ''}/${currentRoute}`,
        text: overrides[currentRoute]?.text || capitalCase(currentRoute),
        icon: overrides[currentRoute]?.icon
      }
      return [...crumbList, newCrumb]
    }, [] as BreadCrumb[])
}

type Props = {
  // By default, the current route is switch to an array of strings:
  // ex:  'learn/group-classes' -> ['Learn', 'Group Classes']
  // This property overrides this behavior.
  // ex: route: 'learn/group-classes'
  //     nameOverrides: { [`group-classes`]: 'Classes', [`learn`]: 'Learn To Dance' }
  //     newTitle:  ['Learn To Dance', 'Classes']
  nameOverrides?: {
    [route: string]: {
      text: string
      icon?: IconProp
    }
  }
  onClickTitle?: (title: string) => void
}

export const Breadcrumbs = ({ nameOverrides = {}, ...props }: Props) => {
  const [crumbs, setCrumbs] = useState<BreadCrumb[]>([])
  const [list, setList] = useState<BreadCrumb[]>([])
  const { currentRoute } = useRouter()

  useEffect(() => {
    setCrumbs(translateRouteToCrumbs(currentRoute, nameOverrides).slice(-3))
  }, [currentRoute])

  const animation = useTransition(crumbs, {
    from: {
      opacity: 0,
      transform: 'translateX(-20%)'
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0%)'
    }
  })

  if (currentRoute.split('/').length === 2) return null
  return (
    <nav>
      {/* <ol className='flex items-center'> */}
      <ol role='list' className='px-6 py-2 flex space-x-4 border-t bg-gray-800'>
        {crumbs.length > 3 && (
          <li className='flex items-center'>
            <div className='flex text-black items-center'>...</div>
          </li>
        )}

        {animation((style, crumb) => (
          <animated.li style={style} key={crumb.route} className='flex'>
            <div className='flex items-center space-x-1'>
              {/* {indexOf(crumb, crumbs) !== 0 && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className='w-5 h-5 text-black mx-2'
                />
              )} */}

              {/* <button className={`text-sm font-medium sm:w-full text-black`}>
                {crumb.text}
              </button> */}

              {indexOf(crumb, crumbs) !== 0 && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className='w-4 h-4 text-gray-400 mx-2'
                />
              )}

              <Link
                to={crumb.route}
                className='ml-4 text-sm font-medium text-gray-200 hover:text-gray-700'
              >
                {crumb.text}
              </Link>
            </div>
          </animated.li>
        ))}
      </ol>

      {/* <nav className='flex' aria-label='Breadcrumb'>
        <ol
          role='list'
          className='bg-white rounded-md shadow px-6 flex space-x-4'>
          {crumbs.map((crumb) => (
            <li key={crumb.text} className='flex'>
              <div className='flex items-center'>
                {indexOf(crumb, crumbs) !== 0 && (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className='w-6 h-6 text-gray-200 mx-2'
                  />
                )}

                <Link
                  to={crumb.route}
                  className='ml-4 text-sm font-medium text-gray-500 hover:text-gray-700'>
                  {crumb.text}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav> */}
    </nav>
  )
}
