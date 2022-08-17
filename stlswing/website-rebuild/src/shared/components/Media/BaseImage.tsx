import { animated } from '@react-spring/web'

type srcSet = {
  mobile?: string
  tablet?: string
  laptop?: string
  monitor?: string
}
export type BaseImageProps = {
  src: string
  alt: string
  srcSet?: srcSet
  onLoad?: () => void
  onError?: () => void
  className?: string
  height?: string | number
  width?: string | number
}

export const BaseImage = animated(
  ({ srcSet, src, ...props }: BaseImageProps) => (
    <picture
      className={props.className}
      style={{ height: props.height, width: props.width }}
    >
      <SrcSet srcSet={srcSet} {...props} />
      <img src={src} {...props} />
    </picture>
  )
)

interface BaseVideoProps extends BaseImageProps {
  playsInline?: boolean
  autoPlay?: boolean
  loop?: boolean
}

export const BaseVideo = animated(
  ({ srcSet, src, ...props }: BaseVideoProps) => (
    <video
      muted
      playsInline={props.playsInline || true}
      autoPlay={props.autoPlay || true}
      loop={props.loop || true}
    >
      <SrcSet srcSet={srcSet} {...props} type='video/mp4' />
      <SrcSet srcSet={srcSet} {...props} type='video/quicktime' />
      <SrcSet srcSet={srcSet} {...props} type='video/mov' />
      <video src={src} {...props} />
    </video>
  )
)

type SrcSetProps = Omit<BaseImageProps, 'src'> & { type?: string }

const SrcSet = ({ srcSet, ...props }: SrcSetProps) => (
  <>
    {srcSet?.mobile && (
      <source media='(min-width:320px)' srcSet={srcSet.mobile} {...props} />
    )}
    {srcSet?.tablet && (
      <source media='(min-width:768px)' srcSet={srcSet.tablet} {...props} />
    )}
    {srcSet?.laptop && (
      <source media='(min-width:1024px)' srcSet={srcSet.laptop} {...props} />
    )}
    {srcSet?.monitor && (
      <source media='(min-width:1500px)' srcSet={srcSet.monitor} {...props} />
    )}
  </>
)
