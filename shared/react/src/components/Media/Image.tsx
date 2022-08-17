import { animated, useSpring } from '@react-spring/web'
import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export type ImageProps = {
  src: string
  alt: string
  fit: 'contain' | 'cover'
  height?: string | number
  width?: string | number
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
export const Image = ({
  src,
  alt,
  fit,
  height = '100%',
  width = '100%',
  ...props
}: ImageProps) => {
  const sharedClasses = `absolute top-0 left-0`
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const { ref, inView } = useInView({ threshold: 0, delay: 300 })

  const imageFade = useSpring({
    opacity: loaded && inView ? 1 : 0
  })

  if (error) return <FailToLoad height={height} width={width} />
  return (
    <div
      ref={ref}
      style={{ height, width }}
      className={`relative ${checkClasses(height, width)} ${props.className}`}
    >
      {!loaded && <Skeleton height={height} width={width} />}

      {inView && (
        <animated.img
          style={imageFade}
          src={src}
          height={height}
          width={width}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`z-10 object-${fit} ${sharedClasses} h-full w-full`}
        />
      )}

      <Overlay {...props} height={height} width={width}>
        {props.children}
      </Overlay>
    </div>
  )
}

const checkClasses = (height: any | undefined, width: any | undefined) =>
  `${height ? '' : 'h-full'} ${width ? '' : 'w-full'}`

const FailToLoad = ({ height, width }: any) => (
  <div
    className={`flex flex-col items-center justify-center z-30 bg-slate-200 ${checkClasses(
      height,
      width
    )}`}
    style={{ height, width }}
  >
    <p className='font-medium text-md'>image failed to load</p>
  </div>
)

const Overlay = ({ height, width, blur, overlay, children }: any) => {
  const blurClasses = blur ? 'backdrop-blur-sm' : ''
  const overlayClasses = overlay ? 'bg-gray-800 bg-opacity-75' : ''

  return (
    <div
      style={{ height, width }}
      className={`${blurClasses} ${overlayClasses} ${checkClasses(
        height,
        width
      )} z-20 overflow-hidden absolute top-0 left-0`}
    >
      {children}
    </div>
  )
}

const Skeleton = ({ height, width }: any) => (
  <div
    className={`${checkClasses(height, width)} bg-slate-200 animate-pulse`}
    style={{ height, width }}
  />
)

export const Img = ({ src, className, height, width }: any) => {
  return
}
