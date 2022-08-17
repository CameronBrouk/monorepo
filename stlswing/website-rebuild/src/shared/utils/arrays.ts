import { any, isEmpty, equals, pipe, without, reject, isNil } from 'ramda'

export const addOrRemove = <T>(element: T, list: T[]) => {
  if (any(equals(element), list)) return without([element], list)
  return [...list, element]
}

type NotUndefined<T> = T extends undefined ? never : T
type NotNull<T> = T extends null ? never : T
export const rejectEmpty = <T>(list: T[]) => reject(isEmpty, list)

export const rejectNull = <T>(list: T[]): NotNull<T>[] =>
  reject((item) => item === null, list) as NotNull<T>[]

export const rejectUndefined = <T>(list: T[]): NotUndefined<T>[] =>
  reject((item) => typeof item === 'undefined', list) as NotUndefined<T>[]

export const rejectNil = <T>(list: T[]) =>
  reject(isNil, list) as NonNullable<T>[]

export const onlyPopulatedValues = <T>(list: T[]) =>
  pipe(rejectNil, rejectEmpty)(list) as NonNullable<T>[]

export const exists = <T>(item: T) => !isNil(item) && !isEmpty(item)
