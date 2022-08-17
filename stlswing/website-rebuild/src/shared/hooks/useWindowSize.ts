import { useLayoutEffect, useState } from 'react'

export const useWindowSize = () => {
  const [size, setSize] = useState<[height: number, width: number]>([0, 0])

  useLayoutEffect(() => {
    const updateSize = () => setSize([window.innerHeight, window.innerWidth])

    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}
