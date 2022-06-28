import { camelCase, snakeCase } from 'change-case'
import * as R from 'ramda'

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
