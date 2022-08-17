import { useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import { tap, filter, takeWhile } from 'rxjs/operators'

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
  isOpen: boolean,
  handleClick: () => void
) => {
  const menuRef = useRef<T>(null)

  useEffect(() => {
    const divElement = menuRef?.current
    const clickOutsideMenu$ = fromEvent(document, 'mousedown')
      .pipe(
        takeWhile(() => isOpen),
        filter(clickedParentElement(divElement)),
        filter(clickedOutsideElement(divElement)),
        tap(handleClick)
      )
      .subscribe()

    return () => {
      clickOutsideMenu$.unsubscribe()
    }
  }, [isOpen, handleClick])

  return menuRef
}

const clickedOutsideElement = (element: HTMLElement | null) => (event: Event) =>
  !element?.contains(event.target as Node)

const clickedParentElement = (element: HTMLElement | null) => (event: Event) =>
  !element?.previousElementSibling?.contains(event.target as Node)
