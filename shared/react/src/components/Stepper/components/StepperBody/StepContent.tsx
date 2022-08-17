import React, { Children, useRef, useEffect } from 'react'
import { StepAnimation } from './StepAnimation'

type Props = {
  selectedStep: number
  children?: React.ReactNode
}

export const StepContent = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  // When navigating to a step, always reset the height
  useEffect(() => {
    if (!ref?.current) return
    ref.current.scrollTop = 0
  }, [props.selectedStep])

  return (
    <div
      ref={ref}
      className='w-full h-full relative flex flex-1 flex-grow overflow-x-hidden overflow-y-auto'
    >
      {Children.map(
        Children.toArray(props.children).filter((child) => !!child),
        (child, i) => (
          <StepAnimation selectedStep={props.selectedStep} order={i}>
            {child}
          </StepAnimation>
        )
      )}
    </div>
  )
}
