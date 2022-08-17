import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

interface PageNavCardLinkProps {
  route: string
  children: React.ReactNode
  descriptions?: string
  icon?: string
}
export const PageNavCardLink = (props: PageNavCardLinkProps) => {
  return (
    <Link
      to={props.route}
      className='border-2 flex max-w-2xl items-center justify-between rounded-md p-4'
    >
      <div className='w-full'>
        <div className='w-full min-w-fit'>
          <p className='text-blue-600 font-medium'>{props.children}</p>
          {props.descriptions && (
            <p className='text-sm text-gray-500 w-3/4 mt-1'>
              {props.descriptions}
            </p>
          )}
        </div>
      </div>
      <FontAwesomeIcon icon={faChevronRight} />
    </Link>
  )
}
