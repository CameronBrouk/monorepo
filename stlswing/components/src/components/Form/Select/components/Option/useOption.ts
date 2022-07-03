import { useEffect } from 'react'
import React from 'react'
import { fromEvent } from 'rxjs'
import { tap, pluck, filter } from 'rxjs/operators'
import {
  focusNextElementInList,
  focusPreviousElementInList
} from '../../select.helpers'

/**
 *  This Hook Gives a button element the same functionality
 *  as the HTML Native <option> element
 * @warning Three Conditions must be satisfied in order for this hook to work:
 *
 * 1:   It must be in a Component whose container is a focusable element
 *
 * 2:   It must be a direct sibling to another focusable element that contains this hook
 *
 * 3:   The list must contain only focusable elements
 *        - i.e. If you have a list of buttons and a loader at the end, wrap the list of options in a div.
 */
const useOption = (
  buttonRef: React.RefObject<HTMLButtonElement>,
  handleSelect: Function
) => {
  useEffect(() => {
    // @ts-ignore
    const keyEvents$ = fromEvent(buttonRef.current, 'keydown')
      .pipe(
        pluck('key'),
        filter((key: string) =>
          ['Enter', 'Space', 'ArrowUp', 'Tab', 'ArrowDown'].includes(key)
        ),
        tap((key) => {
          const { current: buttonElement } = buttonRef
          if (!buttonElement) return
          if (buttonElement !== document.activeElement) return

          if (key === 'Enter' || key === 'Space') handleSelect()
          if (key === 'ArrowUp') focusPreviousElementInList(buttonRef)
          if (key === 'ArrowDown') focusNextElementInList(buttonRef)
        })
      )
      .subscribe()

    return () => {
      keyEvents$.unsubscribe()
    }
  }, [buttonRef, handleSelect])
}

export default useOption
