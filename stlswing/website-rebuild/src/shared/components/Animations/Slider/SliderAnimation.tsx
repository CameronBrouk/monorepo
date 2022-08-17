import React from 'react'
import { useTransition, animated } from '@react-spring/web'
import usePrevious from '../../../hooks/usePrevious'

type Props = {
  selectedSlide: number
  // Index is the current index of the Step inside of the Children.map function
  order: number
  children?: React.ReactNode
}

export const SliderAnimation = ({ selectedSlide, order, children }: Props) => {
  const previousStep = usePrevious(selectedSlide)

  const goingForward = selectedSlide > (previousStep || -1)
  const goingBackward = selectedSlide < previousStep

  const slideOverAnimation = useTransition(selectedSlide === order, {
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
