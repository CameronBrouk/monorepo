import { test, expect, vi, describe, beforeEach, afterEach } from 'vitest'
import express, { response } from 'express'
import {
  GroupClassPayload,
  validateGroupClass
} from './GroupClass/groupClass.validators.js'
import { createGroupClass } from './GroupClass/operations/create-group-class'
import supertest from 'supertest'
import { generateApi } from '@unimpaired/backend'
import groupClassApi from './GroupClass/groupClass.api.js'
import { app } from './index.js'

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
type HasObjectProperty<T extends Record<string, any>> = {
  [K in keyof T as T[K] extends Record<string, any> ? K : never]: T[K]
}
type RecursiveMakeNullOptional<T extends Record<string, any>> =
  MakeNullOptional<{
    [K in keyof T]: T[K] extends object ? RecursiveMakeNullOptional<T[K]> : T[K]
  }>
type HasAnyRequiredNull<T extends Record<string, any>> = {
  [K in keyof T]: never
}
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
  updatedAt: MOCK_DATE
}

describe('Group Class Endpoint', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(MOCK_DATE)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('POST group-class', async () => {
    const response = await supertest(app)
      .post('/group-class')
      .set('Accept', 'application/json')
      .send(requestBody)
      .expect(200)

    expect(true).toStrictEqual(true)
  })
})
