import { useWindowSize } from './useWindowSize'

export const useIsMobile = () => {
  const [_, width] = useWindowSize()

  return width <= 750
}
