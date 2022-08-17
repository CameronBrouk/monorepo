import React, { Children, useRef, useEffect } from 'react'
import { SliderAnimation } from './SliderAnimation'

type SliderContentProps = {
  selectedSlide: number
  children?: React.ReactNode
}

export const SliderContent = (props: SliderContentProps) => {
  const ref = useRef<HTMLDivElement>(null)

  // When navigating to a step, always reset the height
  useEffect(() => {
    if (!ref?.current) return
    ref.current.scrollTop = 0
  }, [props.selectedSlide])

  return (
    <div
      ref={ref}
      className='w-full h-full relative flex flex-1 flex-grow overflow-x-hidden overflow-y-auto'
    >
      {Children.map(
        Children.toArray(props.children).filter((child) => !!child),
        (child, i) => (
          <SliderAnimation selectedSlide={props.selectedSlide} order={i}>
            {child}
          </SliderAnimation>
        )
      )}
    </div>
  )
}
