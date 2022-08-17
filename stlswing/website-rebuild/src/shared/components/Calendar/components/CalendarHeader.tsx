import React, { useState } from 'react'
import { indexOf } from 'ramda'
import * as D from 'date-fns/fp'
import { getMonthsOfYear, monthDisplay } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faCaretDown,
  faChevronLeft,
  faChevronRight,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { Menu } from '../../Menu'
import { Button } from '../../Button'
import { useIsMobile } from '../../../../shared/hooks/useIsMobile'

type Props = {
  date: Date
  setDate: SetState<Date>
  useSidebar?: [boolean, SetState<boolean>]
}

export const Header = ({ date, setDate, ...props }: Props) => {
  const [choosingMonth, setChoosingMonth] = useState(false)
  const [sidebarVisible, setSidebarVisible] = props.useSidebar || []
  const isMobile = useIsMobile()

  return (
    <div>
      <header className='flex flex-grow-0 relative w-full justify-start items-center sm:space-x-2 sm:px-2 border-b'>
        {props.useSidebar && (
          <button
            className='hover:bg-gray-200 h-full p-5'
            onClick={() => setSidebarVisible && setSidebarVisible((v) => !v)}
          >
            <FontAwesomeIcon icon={sidebarVisible ? faTimes : faBars} />
          </button>
        )}

        <div className='h-full flex items-center'>
          <button
            className='h-full w-full p-3 sm:p-5 hover:bg-gray-200'
            onClick={() => {
              setDate(D.subMonths(1))
            }}
          >
            <FontAwesomeIcon
              className='text-gray-600 transition cursor-pointer hover:scale-105'
              icon={faChevronLeft}
            />
          </button>

          {/* Choose Month */}
          <div className='relative h-full flex items-center'>
            <button
              onClick={() => setChoosingMonth((v) => !v)}
              className='hover:bg-gray-200 sm:p-2 flex items-center justify-center space-x-2 cursor-pointer h-full'
            >
              <p className='text-2xl font-medium w-full'>
                {monthDisplay(date, isMobile ? 'condensed' : 'full')}
              </p>
              <p className='text-2xl font-medium w-full'>
                {date.getFullYear()}
              </p>
              <FontAwesomeIcon
                className='text-gray-600 transition cursor-pointer hover:scale-105'
                icon={faCaretDown}
              />
            </button>
          </div>

          <button
            className='h-full w-full p-3 sm:p-5 hover:bg-gray-200'
            onClick={() => {
              setDate(D.addMonths(1))
            }}
          >
            <FontAwesomeIcon
              className='text-gray-600 transition cursor-pointer hover:scale-105'
              icon={faChevronRight}
            />
          </button>
        </div>
      </header>
      <Menu
        isOpen={choosingMonth}
        onClose={() => setChoosingMonth(false)}
        className='bg-white min-w-fit'
      >
        <div className='w-full p-4 grid grid-cols-3 gap-3 -mb-44 bg-white'>
          {getMonthsOfYear('full').map((month, i) => (
            <Button
              key={month + i}
              onClick={() => {
                setDate(
                  (prevDate) =>
                    new Date(
                      prevDate.getFullYear(),
                      indexOf(month, getMonthsOfYear('full')),
                      prevDate.getDate()
                    )
                )
                setChoosingMonth(false)
              }}
              className='h-11'
            >
              {month}
            </Button>
          ))}
        </div>
      </Menu>
    </div>
  )
}

export const CalendarHeader = React.forwardRef(Header)
