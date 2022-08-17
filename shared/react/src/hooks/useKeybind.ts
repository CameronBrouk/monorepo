import { RefObject, useEffect } from 'react'
import { filter, tap } from 'rxjs/operators'
import { fromEvent } from 'rxjs'

// This List is Not Exhaustive, but Native Keyboard Event
// does not display a specific type
// prettier-ignore
type key = '/'| 'Escape' | 'Enter' | 'Control' | 'Alt' | 'Option' | 'Command' | 'ArrowLeft' | 'ArrowRight' | 'ArrowDown' | 'ArrowUp' | 'Tab' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

/**
 * Calls a Function when a key or series of keys are pressed - Optionally scoped to a single component
 * @param hotkey array of keys that make up hotkey(in order)
 * @param onPress function to call when hotkey is pressed
 * @param ref useRef object(optional)
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null)
 * useHotkey(['Tab'], onPress, ref)
 * useHotkey(['Ctrl', 'c'], onPress, ref)
 * const onPress = () => console.log('hotkey pressed')
 */
export const useKeybind = <T extends RefObject<HTMLElement> | null>(
  hotkey: key[],
  onPress: () => void,
  ref?: T
) => {
  useEffect(() => {
    const keydown$ = fromEvent<KeyboardEvent>(
      ref?.current || document,
      'keydown'
    )
      .pipe(
        filter(isHotkeyKey(hotkey)),
        tap((e) => {
          e.preventDefault()
        }),
        // scan(reduceToArray),
        // map(getLatestHotkeyEvent(hotkey.length)),
        // filter(matchesHotkey(hotkey)),
        tap(onPress)
      )
      .subscribe()

    return () => {
      keydown$.unsubscribe()
    }
  }, [])

  const isHotkeyKey =
    (hotkey: key[]) =>
    ({ key }: KeyboardEvent) =>
      hotkey.includes(key as key)

  // const reduceToArray = (previousEmissions: key[], currentEmission: key) => [
  //   ...previousEmissions,
  //   currentEmission,
  // ]

  // const getLatestHotkeyEvent = (hotkeyLength: number) => (keyEvents: key[]) =>
  //   keyEvents.slice(-hotkeyLength)

  // const matchesHotkey = (key: key[]) => (keyEvents: key[]) =>
  //   keyEvents.reduce((allMatch: boolean, key, index) => {
  //     const isMatch = key[index] === key
  //     return isMatch && allMatch
  //   }, true)
}
