import { useEffect, useState } from 'react'

interface LogoLoaderProps {
  logoSrc: string
  color?: 'red' | 'blue'
  size?: number
}
export const LogoLoader = (props: LogoLoaderProps) => {
  const [debounced, setDebounced] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDebounced(true)
    }, 300)
  }, [])

  const getColor = () => {
    if (props.color === 'blue') return 'border-r-blue-800'
    return 'border-r-red-800'
  }

  // We debounce by 300ms because we want to prevent the U.I. from flickering on faster connections.
  // If we do not debounce and something only takes 50ms to load, the user will still notice a flash of loader.
  // It's cleaner to just wait a moment before showing it.
  if (!debounced) return null
  return (
    <div className='w-full relative flex flex-col h-full items-center justify-center'>
      <div className='relative'>
        <img
          src={props.logoSrc}
          height={props.size || 150}
          width={props.size || 150}
        />
        <div className='absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 scale-150'>
          <div
            className={`absolute left-0 top-0 w-full h-full rounded-full animate-spin border-8 border-4-r ${getColor()}`}
          ></div>
        </div>
      </div>
    </div>
  )
}
