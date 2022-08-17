import React, { useEffect, useState } from 'react'
import { Mask } from './Mask'
import { getModalTransition } from './modal.helpers'
import { useTransition, animated } from '@react-spring/web'
import { ModalHeader } from './ModalHeader'
import { useDebouncedFadeAnimation } from './useDebouncedFadeAnimation'
import { useWindowSize } from '../../../shared/hooks/useWindowSize'
import { useLockBodyScroll } from '../../../shared/hooks/useBodyLockScroll'
import { useKeybind } from '../../../shared/hooks/useKeybind'

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
  const [windowHeight, windowWidth] = useWindowSize()

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

  const height =
    type.includes('left') || type.includes('right') ? windowHeight : undefined
  const width =
    type.includes('bottom') || type.includes('top') ? windowWidth : undefined

  return (
    <>
      {animation(
        (styles, isOpen) =>
          isOpen && (
            <animated.div
              style={{
                ...styles,
                height,
                width,
                maxHeight: height,
                maxWidth: width
              }}
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
  if (type === 'bottom-panel') return `bottom-0 right-0`
  return `top-0 left-0`
}

const getClasses = (type: ModalTypes) => {
  const baseClasses = 'fixed bg-white z-50 resize-x'
  const panelClasses = getPanelClasses(type)
  return `${baseClasses} ${panelClasses}`
}
