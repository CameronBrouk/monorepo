import React, { useLayoutEffect } from 'react'
import { animated, useTransition } from '@react-spring/web'
import { useClickOutside } from '../../../shared/hooks/useClickOutside'
import { useKeybind } from '../../../shared/hooks/useKeybind'

export type MenuProps = {
  isOpen: boolean
  onClose: () => void
  menuWidth?: string | number
  style?: Omit<React.CSSProperties, 'scale'>
  className?: string
  children?: React.ReactNode
}

export const Menu = ({ isOpen, onClose, ...props }: MenuProps) => {
  const menuRef = useClickOutside<HTMLDivElement>(isOpen, onClose)

  useLayoutEffect(() => {
    if (!menuRef.current) return
    // setPosition(menuRef.current)
  }, [menuRef.current])

  useKeybind(['Escape'], onClose, menuRef)

  const transitions = useTransition(isOpen, {
    config: {
      friction: 32,
      mass: 1,
      tension: 1000
    },
    enter: {
      transform: 'translate3d(0, 0px, 0)',
      opacity: 1
    },
    from: {
      transform: 'translate3d(0, -15px, 0)',
      opacity: 0
    },
    leave: {
      transform: 'translate3d(0, -15px, 0)',
      opacity: 0
    }
  })

  const menuWidth = props.menuWidth ? { width: props.menuWidth } : {}
  const defaultStyles = {
    ...props.style,
    ...menuWidth
  }

  return (
    <>
      {transitions(
        (animation, showAnimation) =>
          showAnimation && (
            <animated.div
              aria-expanded={isOpen}
              className={`${props.className} border bg-white rounded-md absolute z-40`}
              style={{ ...animation, ...defaultStyles }}
              ref={menuRef}
              onClick={(e) => e.stopPropagation()}
            >
              {props.children}
            </animated.div>
          )
      )}
    </>
  )
}
