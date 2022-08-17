import { ModalTypes } from './Modal'

export const getModalTransition = (type?: ModalTypes) => {
  if (type === 'left-panel')
    return {
      enter: { transform: 'translateX(0%)', opacity: 1 },
      from: { transform: 'translateX(-100%)', opacity: 0 },
      leave: { transform: 'translateX(-100%)', opacity: 1 }
    }

  if (type === 'right-panel')
    return {
      enter: { transform: 'translateX(0%)', opacity: 1 },
      from: { transform: 'translateX(50%)', opacity: 0 },
      leave: { transform: 'translateX(100%)', opacity: 1 }
    }

  if (type === 'top-panel')
    return {
      enter: { transform: 'translateY(0%)', opacity: 1 },
      from: { transform: 'translateY(-100%)', opacity: 0 },
      leave: { transform: 'translateY(-100%)', opacity: 1 }
    }

  if (type === 'bottom-panel')
    return {
      enter: { transform: 'translateY(0%)', opacity: 1 },
      from: { transform: 'translateY(100%)', opacity: 0 },
      leave: { transform: 'translateY(100%)', opacity: 1 }
    }

  return {
    config: { friction: 32, mass: 1, tension: 600 },
    enter: { transform: 'translate3d(-50%, -50%, 0) scale(1)', opacity: 1 },
    from: { transform: 'translate3d(-50%, -10%, 0) scale(0.8)', opacity: 0 },
    leave: { transform: 'translate3d(-50%, -50%, 0) scale(0.8)', opacity: 0 }
  }
}
