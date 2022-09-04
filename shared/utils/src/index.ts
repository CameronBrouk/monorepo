import { camelCase, snakeCase } from 'change-case'
import { any, isEmpty, equals, pipe, without, reject, isNil } from 'ramda'
export * from './search.js'
import * as R from 'ramda'
export * from './dates.js'

export const logHello = () => console.log('hello')

export const add = (n: number, n2: number) => n + n2
export const subtract = (n: number, n2: number) => n - n2

export const mapKeys = (transform: (key: string) => string) =>
  R.pipe(
    R.toPairs,
    R.map(([key, value]) => [transform(key), value] as [string, any]),
    R.fromPairs
  )

export const camelCaseKeys = mapKeys(camelCase)

export const snakeCaseKeys = mapKeys(snakeCase)

export const omitDefaults = R.omit([
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
  'draft',
  'deleted'
])

export const wait = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export const isDup =
  <T extends object>(list: T[]) =>
  (element: T) =>
    any(equals(element), list)

// export const isDupBy =
//   <T extends object>(array: T[], property: keyof T) =>
//   (selection: T): boolean =>
//     pipe(pluck(property), any(equals(selection[property])))(array)

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
