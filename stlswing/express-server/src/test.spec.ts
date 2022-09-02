import { describe, expect, test } from 'vitest'
import { GroupClassPayload } from './GroupClass/groupClass.validators.js'
import { createGroupClass } from './GroupClass/operations/create-group-class'

const MOCK_DATE = new Date(1969, 6, 9)
type RemovePromise<T> = T extends Promise<infer U> ? U : never
type RemoveNullKeys<T extends Record<string, any>> = {
  [K in keyof T as T[K] extends NonNullable<T[K]> ? K : never]: T[K]
}
type GetNullKeysAsOptional<T extends Record<string, any>> = {
  [K in keyof T as T[K] extends NonNullable<T[K]> ? never : K]?: T[K]
}
type MakeNullOptional<T extends Record<string, any>> = RemoveNullKeys<T> &
  GetNullKeysAsOptional<T>
type RecursiveMakeNullOptional<T extends Record<string, any>> =
  MakeNullOptional<{
    [K in keyof T]: T[K] extends object ? RecursiveMakeNullOptional<T[K]> : T[K]
  }>

type CreateResponse = RecursiveMakeNullOptional<
  RemovePromise<ReturnType<typeof createGroupClass>>
>

const requestBody: GroupClassPayload = {
  danceType: 'test',
  description: '',
  difficultyLevel: '',
  end: MOCK_DATE,
  start: MOCK_DATE,
  location: '',
  name: '',
  stripeProductId: 1
}
const successResponse: CreateResponse = {
  id: 1,
  danceMoves: [],
  teachers: [],
  ...requestBody,
  createdAt: MOCK_DATE,
  updatedAt: MOCK_DATE,
  facebookEventId: null
}

describe('Run Passing Test', () => {
  test('Test', () => {
    expect(true).toBe(true)
  })
})
