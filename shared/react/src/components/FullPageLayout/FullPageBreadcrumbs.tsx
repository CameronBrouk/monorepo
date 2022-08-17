import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from '../../hooks'
import React from 'react'

type FullPageBreadcrumbProps = {
  breadcrumbs: { title: string; route?: string }[]
  className?: string
  children?: React.ReactNode[]
}
export const Breadcrumbs = (props: FullPageBreadcrumbProps) => {
  const { navigateTo } = useRouter()

  const baseTitleClasses =
    'text-sm font-medium sm:w-full text-gray-800 p-2 text-2xl font-semibold '

  return (
    <ol className='flex items-center'>
      {props.breadcrumbs.map((breadcrumb, i) => (
        <li key={i}>
          <div className='flex items-center truncate space-x-1'>
            {breadcrumb.title !== props.breadcrumbs[0].title && (
              <FontAwesomeIcon icon={faChevronRight} />
            )}

            {!breadcrumb.route && (
              <div className={`${baseTitleClasses}`}>
                <h2 className='text-xl sm:text-4xl'>{breadcrumb.title}</h2>
              </div>
            )}

            {breadcrumb.route && (
              <button
                onClick={() => breadcrumb.route && navigateTo(breadcrumb.route)}
                className={`${baseTitleClasses} text-blue-500  hover:text-blue-700 hover:border hover:border-b`}
              >
                <h2 className='text-xl sm:text-4xl truncate max-w-sm'>
                  {breadcrumb.title}
                </h2>
              </button>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
