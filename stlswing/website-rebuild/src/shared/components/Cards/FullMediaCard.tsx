import { Image } from '../Media'

/* This example requires Tailwind CSS v2.0+ */
export interface FullMediaCardProps {
  src: string
  size: 'sm' | 'lg' | 'md' | 'stretch'
  className?: string
  children?: React.ReactNode
}
export default function FullMediaCard(props: FullMediaCardProps) {
  const MD = { width: 313, height: 500 }
  const LG = {
    width: '100%',
    height: 600
  }
  const STRETCH = {
    width: '100%',
    height: 600
  }
  const SM = { width: 209, height: 335 }
  const getSize = (size: FullMediaCardProps['size']) => {
    if (size === 'sm') return SM
    if (size === 'md') return MD
    if (size === 'lg') return LG
    if (size === 'stretch') return STRETCH
    return undefined
  }
  return (
    <div
      style={getSize(props.size)}
      className={`flex h-full w-full flex-col items-center bg-white justify-center border-2 rounded-2xl overflow-hidden shadow-md ${props.className}`}
    >
      <Image
        fit='cover'
        overlay
        src={props.src}
        alt='Image Card'
        className='object-cover h-full w-full'
      />
      {props.children}
    </div>
  )
}
