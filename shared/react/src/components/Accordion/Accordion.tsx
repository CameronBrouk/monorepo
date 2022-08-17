import React from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import useMeasure from 'react-use-measure'

export type AccordionProps = {
  title: string
  children?: React.ReactNode
  className?: string
}

export const Accordion = ({ children, title, className }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const [panelRef, { height: panelContentHeight }] = useMeasure()
  const animateContentHeight = useSpring({
    to: { height: panelContentHeight }
  })

  const svgClasses = isOpen ? 'rotate-180' : 'rotate-0'

  return (
    <dl className='mx-auto border border-gray-300 shadow-sm rounded-md'>
      <dt className={'leading-7'}>
        <button
          onClick={() => setIsOpen((o) => !o)}
          className='focus:outline-none focus:text-gray-900 hover:bg-gray-100 flex items-start justify-between w-full p-2 text-left text-gray-400 transition-all duration-500 cursor-pointer'
        >
          <h2 className='font-medium text-gray-700'>{title}</h2>
          <span className='h-7 flex items-center ml-6'>
            <div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`${svgClasses}  transform transition-all duration-300`}
              />
            </div>
          </span>
        </button>
      </dt>
      <animated.div style={animateContentHeight}>
        {isOpen && (
          <div ref={panelRef} className={className}>
            {children}
          </div>
        )}
      </animated.div>
    </dl>
  )
}
