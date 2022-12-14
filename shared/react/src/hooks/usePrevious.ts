import { useRef, useEffect } from 'react'

export const usePrevious = <T>(value: T): T | void => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePrevious
