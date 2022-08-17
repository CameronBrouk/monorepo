import { animated, useSpring } from '@react-spring/web'
import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export type VideoProps = {
  src: string
  alt: string
  fit: 'contain' | 'cover'
  height?: string | number
  overlay?: boolean
  blur?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * @param src name of image(with suffix)
 * @param alt image alt text
 * @param fit object-fit css property. contain or cover;
 */
export const Video = ({ src, alt, fit, ...props }: VideoProps) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const { ref, inView } = useInView({ threshold: 0, delay: 300 })

  const imageFade = useSpring({
    opacity: loaded && inView ? 1 : 0
  })

  const numberHeight =
    typeof props.height === 'number' ? props.height : undefined
  const classHeight = typeof props.height === 'string' ? props.height : 'h-full'

  if (error)
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center z-30 bg-slate-200 ${classHeight}`}
        style={{ height: numberHeight }}
      >
        <p className='font-medium text-md'>video failed to load</p>
      </div>
    )
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${props.className} ${classHeight}`}
      style={{ height: numberHeight || '100%' }}
    >
      {!loaded && (
        <div
          className={`w-full h-full z-20 bg-slate-200 animate-pulse ${classHeight}`}
          style={{ height: numberHeight }}
        ></div>
      )}

      {inView && (
        <animated.video
          src={src}
          style={imageFade}
          muted
          autoPlay
          loop
          playsInline
          height={numberHeight}
          onLoadedData={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`absolute z-10 top-0 left-0 object-cover h-full w-full`}
        />
      )}

      <div
        className={`z-30 overflow-hidden h-full w-full absolute top-0 left-0 ${
          props.overlay && loaded
            ? 'bg-gray-800 bg-opacity-75 bg-blend-overlay w-full h-full'
            : ''
        } ${props.blur && loaded ? 'backdrop-blur-sm w-full h-full' : ''}`}
      >
        {props.children}
      </div>
    </div>
  )
}
