import React, { useState } from 'react'
import { dayAbbreviations, formatDate } from '../../utils'
import { CalendarHeader, DayTile } from './components'
import { getDayTiles } from './helpers/calendar.helpers'
import { Modal } from '../Modal'
import { isSameDay, isSameMonth } from 'date-fns'
import { useSpring, animated } from '@react-spring/web'
import { Accordion } from '../Accordion'
import useMeasure from 'react-use-measure'
import { useIsMobile } from '../../../shared/hooks/useIsMobile'
import { useWindowSize } from '../../../shared/hooks/useWindowSize'

type CalendarEvent<T = Record<string | number, any>> = {
  date: Date
  name: string
  color: string
} & T

type Props<T extends Record<string | number, any>> = {
  date: Date
  events: CalendarEvent<T>[]
  renderEventItem?: (event: CalendarEvent<T>) => React.ReactNode
  renderEventDetails?: (event: CalendarEvent<T>) => React.ReactNode
  sidebarComponent?: React.ReactNode
}

export function Calendar<T extends Record<string, any>>(props: Props<T>) {
  const [windowHeight, windowWidth] = useWindowSize()
  const isMobile = useIsMobile()
  const [chosenDate, setChosenDate] = useState(props.date)
  const [sidebarVisible, setSidebarVisible] = useState(
    // hide on mobile by default.  if on desktop, only show if the user has denoted a sidebarComponent
    isMobile ? false : !!props.sidebarComponent
  )
  const [dayShowing, setDayShowing] = useState<Date>()
  const [calendarEventShowing, setCalendarEventShowing] =
    useState<CalendarEvent<T>>()

  const [ref, { width }] = useMeasure()

  const sidebarAnimation = useSpring({
    // if mobile, show full width. otherwise, stay 450px
    width: sidebarVisible ? (isMobile ? windowWidth : 450) : 0,
    maxHeight: windowHeight
  })

  const [daytilesRef, { height: dayTilesHeight }] = useMeasure()
  const [headerRef, { height: headerHeight }] = useMeasure()
  const [monthsRef, { height: monthsHeight }] = useMeasure()

  return (
    <>
      <section
        className='w-full relative flex flex-col'
        ref={ref}
        style={{ height: windowHeight, maxHeight: windowHeight }}
      >
        <CalendarHeader
          ref={headerRef}
          date={chosenDate}
          setDate={setChosenDate}
          useSidebar={
            props.sidebarComponent
              ? [sidebarVisible, setSidebarVisible]
              : undefined
          }
        />

        <div
          className='flex relative flex-1 flex-grow'
          style={
            {
              // height: windowHeight - headerHeight,
              // maxHeight: windowHeight - headerHeight,
            }
          }
        >
          <animated.div
            className={`${
              isMobile
                ? 'border border-t absolute z-20 bg-white top-0 border-r w-full'
                : ''
            } overflow-y-auto overflow-x-hidden`}
            style={sidebarAnimation}
          >
            {sidebarVisible && props.sidebarComponent}
          </animated.div>

          <div className='flex flex-col w-full h-full relative'>
            <div className='grid grid-cols-7 w-full' ref={monthsRef}>
              {dayAbbreviations.map((day) => (
                <p
                  className='text-xs sm:text-sm text-gray-500 border text-center'
                  key={day}
                >
                  {day}
                </p>
              ))}
            </div>

            <div className='border-b h-full relative' ref={daytilesRef}>
              <div
                className='grid grid-cols-7 grid-flow-row h-full'
                style={{
                  gridAutoRows: `minmax(0, 1fr)`
                  // gridTemplateRows: 'minmax(0, 1fr)',
                }}
              >
                {getDayTiles(chosenDate).map((date) => (
                  <DayTile
                    key={date.toISOString()}
                    date={date}
                    style={{}}
                    onClick={() => {
                      if (
                        props.events.filter((event) =>
                          isSameDay(event.date, date)
                        ).length === 0
                      )
                        return
                      setDayShowing(date)
                    }}
                    className={`border hover:bg-gray-50 ${
                      isSameMonth(date, chosenDate)
                        ? ''
                        : 'bg-gray-200  border-gray-300'
                    } ${
                      isSameDay(date, chosenDate)
                        ? 'bg-blue-200 border border-blue-800'
                        : ''
                    } overflow-hidden min-h-0`}
                  >
                    <div
                      className='space-y-0.5 min-h-0 overflow-hidden'
                      style={{
                        maxHeight: dayTilesHeight / 7
                      }}
                    >
                      {props.events
                        .filter((event) => isSameDay(event.date, date))
                        .map((event) => {
                          const color = event.color
                          return (
                            <button
                              key={event.date.toISOString() + event.name}
                              className={
                                `truncate w-full p-1 text-xs font-medium sm:text-sm flex items-center h-5 sm:h-7 rounded-sm` +
                                ' ' +
                                color
                              }
                              onClick={(e) => {
                                if (!props.renderEventDetails) return
                                e.stopPropagation()
                                setCalendarEventShowing(event)
                              }}
                            >
                              {event.name}
                            </button>
                          )
                        })}
                    </div>
                  </DayTile>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        className='w-screen sm:w-1/3 overflow-y-auto'
        title={dayShowing ? formatDate('readable', dayShowing) : ''}
        isOpen={!!dayShowing}
        onClose={() => setDayShowing(undefined)}
      >
        {dayShowing &&
          props.renderEventItem &&
          props.events
            .filter((event) => isSameDay(event.date, dayShowing))
            .map((event) => (
              <Accordion
                key={event.date.toISOString() + event.color}
                title={`${event.name} - ${formatDate('time', event.date)}`}
              >
                {props.renderEventItem && props.renderEventItem(event)}
              </Accordion>
            ))}
      </Modal>
      <Modal
        className='w-screen sm:w-1/3 overflow-y-auto'
        title={
          calendarEventShowing
            ? `${calendarEventShowing.name} - ${formatDate(
                'readable',
                calendarEventShowing.date
              )}`
            : ''
        }
        isOpen={!!calendarEventShowing}
        onClose={() => setDayShowing(undefined)}
      >
        {calendarEventShowing &&
          props.renderEventDetails &&
          props.renderEventDetails(calendarEventShowing)}
      </Modal>
    </>
  )
}
