import React from 'react'
import { useTransition, animated } from '@react-spring/web'

export const Mask = (props: {
  isVisible: boolean
  className?: string
  onClick?: React.MouseEventHandler
}) => {
  const transitions = useTransition(props.isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  return (
    <>
      {transitions(
        (styles, item) =>
          item && (
            <animated.div
              className={`bg-black bg-opacity-75 fixed top-0 left-0 right-0 bottom-0 z-40 w-full h-full ${props.className}`}
              style={styles}
              key='mask'
              onClick={props.onClick}
            />
          )
      )}
    </>
  )
}
