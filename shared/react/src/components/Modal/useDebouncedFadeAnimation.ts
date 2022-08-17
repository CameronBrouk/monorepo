import { useState, useEffect } from 'react'
import { useTransition } from '@react-spring/web'

export const useDebouncedFadeAnimation = (visible: boolean, ms = 200) => {
  const [debounce, setDebounce] = useState(true)

  // After The Modal opens, wait 200 ms before displaying the content
  // This prevents the animation from being sluggish due to loads of JS loading at the same time
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setDebounce(false)
      }, ms)
    } else {
      setDebounce(true)
    }
  }, [visible])

  const fadeIn = useTransition(debounce, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opactiy: 0 }
  })

  return fadeIn
}
