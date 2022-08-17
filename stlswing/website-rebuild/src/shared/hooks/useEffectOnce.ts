import { any } from 'ramda'
import { useEffect, useRef } from 'react'
import { useIsFirstRender } from './useIsFirstRender'

export const useEffectOnce = (fn: () => void, dep: (any | undefined)[]) => {
  const firstRender = useIsFirstRender()
  const hasRun = useRef(false)

  useEffect(() => {
    if (firstRender) return // Do not run on first render
    if (hasRun.current) return // Only run a single time
    if (any((item) => typeof item === 'undefined', dep)) return // only run if all dependencies are defined
    fn()

    hasRun.current = true
  }, dep)
}
