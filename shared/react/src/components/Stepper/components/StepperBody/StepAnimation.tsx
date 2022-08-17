import React, { useRef, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'

export default function usePrevious<T>(value: T): T | void {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

type Props = {
  selectedStep: number
  // Index is the current index of the Step inside of the Children.map function
  order: number
  children?: React.ReactNode
}

export const StepAnimation = ({ selectedStep, order, children }: Props) => {
  const previousStep = usePrevious(selectedStep)

  const goingForward = selectedStep > (previousStep || -1)
  const goingBackward = selectedStep < previousStep

  const slideOverAnimation = useTransition(selectedStep === order, {
    from: {
      transform: `translateX(${goingForward ? '100%' : '-100%'})`,
      opacity: 0
    },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: {
      transform: `translateX(${goingBackward ? '100%' : '-100%'})`,
      opacity: 0,
      position: 'absolute'
    }
  })

  return slideOverAnimation(
    (style, visible) =>
      visible && (
        <animated.div style={style} className={'w-full h-full'}>
          {children}
        </animated.div>
      )
  )
}
