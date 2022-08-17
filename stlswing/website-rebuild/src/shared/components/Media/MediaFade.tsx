import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTransition, animated } from '@react-spring/web'
import React, { useState } from 'react'

interface MediaFadeProps {
  slides: string[]
  duration?: number
  height?: number
  width?: number
  className?: string
  carousel?: boolean
  children?: React.ReactNode
}

export const MediaFade = (props: MediaFadeProps) => {
  const [index, set] = useState(0)
  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: props.duration || 3000
    },
    onRest: (_a, _b, item) => {
      if (index === item) {
        set((state) => (state + 1) % props.slides.length)
      }
    },
    exitBeforeEnter: true
  })

  const getType = (src: string) => {
    const vidFormats = ['.mp4']
    const imgFormats = ['.jpg', '.png', '.gif']
    if (imgFormats.some((s) => src.includes(s))) return 'image'
    if (vidFormats.some((s) => src.includes(s))) return 'video'

    return ''
  }

  return (
    <div className={`flex relative z-0 fill center h-full ${props.className}`}>
      {props.carousel && (
        <div className='absolute z-10 left-0 top-1/2 h-full p-4 '>
          <NextButton
            direction='left'
            disabled={index === 1}
            onClick={() => {
              set((state) => state - 1)
            }}
          />
        </div>
      )}
      {transitions((style, i) => (
        <>
          {getType(props.slides[i] || '') === 'video' && (
            <animated.video
              muted
              autoPlay
              preload='auto'
              src={props.slides[i]}
              className={`w-full h-full object-cover`}
              style={{
                ...style,
                zIndex: 0,
                height: props.height || '100%',
                width: props.height || '100%'
              }}
            />
          )}

          {getType(props.slides[i] || '') === 'image' && (
            <animated.img
              src={props.slides[i]}
              className={`w-full h-full object-cover`}
              style={{
                ...style,
                zIndex: 0,
                height: props.height || '100%',
                width: props.height || '100%'
              }}
            />
          )}
        </>
      ))}

      {props.children && (
        <div className='absolute z-10 bottom-0'>{props.children}</div>
      )}

      {props.carousel && (
        <div className='absolute z-10 right-0 top-1/2 h-full p-4 '>
          <NextButton
            direction='right'
            onClick={() => {
              set((state) => (state + 1) % props.slides.length)
            }}
          />
        </div>
      )}
    </div>
  )
}

interface NextButtonProps {
  direction: 'left' | 'right'
  disabled?: boolean
  onClick: () => void
}
const NextButton = ({ direction, onClick, disabled }: NextButtonProps) => {
  const icon = direction === 'left' ? faChevronLeft : faChevronRight
  return (
    <button
      className='flex items-center justify-center'
      disabled={disabled}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={icon}
        size={direction === 'left' ? '2x' : '1x'}
        className={`text-white ${direction === 'right' ? '-mr-2' : ''}`}
      />
      <FontAwesomeIcon
        icon={icon}
        size={direction === 'right' ? '2x' : '1x'}
        className={`text-white font-bold ${
          direction === 'left' ? '-ml-2' : ''
        }`}
      />
    </button>
  )
}
