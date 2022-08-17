import { useLayoutEffect } from 'react'

/** block body scrolling until component unmounts */
export const useLockBodyScroll = (shouldLock = false) => {
  useLayoutEffect(() => {
    if (!shouldLock) return
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden'
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [shouldLock]) // Empty array ensures effect is only run on mount and unmount
}
