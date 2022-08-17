import { MutableRefObject, useEffect, useState } from 'react'
import { Recoverable } from 'repl'

export const useOnScreen = <T extends Element = Element>(
  element: MutableRefObject<T>['current'] | null,
  rootMargin = '0px'
) => {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('observe')
        setIntersecting(entry.isIntersecting)
        console.log(entry.isIntersecting)
      },
      {
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [element])

  return isIntersecting
}
