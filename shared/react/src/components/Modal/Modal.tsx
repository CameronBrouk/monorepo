import React, { useEffect, useState } from 'react'
import { Mask } from './Mask'
import {
  useKeybind,
  useLockBodyScroll,
  useRouter,
  useWindowSize,
  usePrevious
} from '../../hooks'
import { getModalTransition } from './modal.helpers'
import { useTransition, animated } from '@react-spring/web'
import { ModalHeader } from './ModalHeader'
import { equals } from 'ramda'
import { useDebouncedFadeAnimation } from './useDebouncedFadeAnimation'

export type ModalType =
  | 'modal'
  | 'right-panel'
  | 'left-panel'
  | 'top-panel'
  | 'bottom-panel'
export type ModalPosition = 'absolute' | 'inline'

export type ModalTypes = `${ModalPosition} ${ModalType}` | ModalType

export type ModalProps = {
  isOpen: boolean
  title?: React.ReactNode
  onClose: () => void
  type?: ModalTypes
  buttonClasses?: string
  titleClasses?: string
  hideTitle?: boolean
  allowRouting?: boolean
  disallowRouting?: boolean
  className?: string
  children?: React.ReactNode
}

export const Modal = ({
  children,
  isOpen,
  title,
  type = 'left-panel',
  ...props
}: ModalProps) => {
  const [visible, setVisible] = useState(isOpen)
  const [height] = useWindowSize()

  useLockBodyScroll(visible)
  useKeybind(['Escape'], () => onClose())

  // Animations
  const debouncedFadeIn = useDebouncedFadeAnimation(visible)
  const animation = useTransition(visible, {
    config: { duration: 200 },
    ...getModalTransition(type)
  })

  // If parent open/close state changes, set component state to parent
  useEffect(() => {
    setVisible(isOpen)
  }, [isOpen])

  const onClose = () => {
    setVisible(false)
    props.onClose()
  }

  return (
    <>
      {animation(
        (styles, isOpen) =>
          isOpen && (
            <animated.div
              style={{ ...styles, height: height, maxHeight: height }}
              className={`${getClasses(type)} ${props.className}`}
            >
              {/* Title(optional) */}
              {!props.hideTitle && title && typeof title === 'string' && (
                <ModalHeader
                  title={typeof title === 'string' ? title : 'modal'}
                  onClose={onClose}
                  titleClasses={props.titleClasses}
                  buttonClasses={props.buttonClasses}
                />
              )}

              {/* Modal Content */}
              {debouncedFadeIn(
                (styles, isDebouncing) =>
                  !isDebouncing && (
                    <animated.div style={styles}>{children}</animated.div>
                  )
              )}
            </animated.div>
          )
      )}

      <Mask isVisible={visible} onClick={onClose} />
    </>
  )
}

const getPanelClasses = (type: ModalTypes) => {
  if (type === 'left-panel') return `top-0 left-0`
  if (type === 'right-panel') return `top-0 right-0`
  if (type === 'bottom-panel') return `bottom-0 right-0 w-screen`
  return `top-0 left-0 h-screen`
}

const getClasses = (type: ModalTypes) => {
  const baseClasses = 'fixed bg-white z-50 resize-x'
  const panelClasses = getPanelClasses(type)
  return `${baseClasses} ${panelClasses}`
}
