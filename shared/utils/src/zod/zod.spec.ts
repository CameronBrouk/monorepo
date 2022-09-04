import { describe, test, vi, expect } from 'vitest'
import { logSpacer } from '../logging/logging.js'
import { z } from 'zod'
import * as zodUtils from './zod.js'

describe('Zod Date', () => {
  test('Regular Date Parse succeeds', () => {
    const date = zodUtils.zodDateTime('startDate')
    const checked = date.safeParse(new Date())
    expect(checked.success).toBe(true)
  })
  test('String Date Parse succeeds', () => {
    const date = zodUtils.zodDateTime('startDate')
    const checked = date.safeParse('2022-01-12T00:00:00.000Z')
    expect(checked.success).toBe(true)
  })

  test('Date Displays Error', () => {
    const date = zodUtils.zodDateTime('Start Date')
    const checkedEmpty = date.safeParse('')
    expect(checkedEmpty.success).toBe(false)
    const checkedNumber = date.safeParse(25)
    expect(checkedNumber.success).toBe(false)
    const checkedInvalidString = date.safeParse('2022,01,02')
    expect(checkedInvalidString.success).toBe(false)
  })
})

describe('Zod prettify errors', () => {
  test('Invalid Type', () => {
    const test = z
      .strictObject({
        enum: z.enum(['fuck', 'test']),
        num: z.number(),
        start: zodUtils.zodDateTime('Start')
      })
      .strict()
      .required()

    const valid = test.safeParse({ enum: 'ahello' })
    expect(valid.success).toBe(false)
    if (valid.success) return
    logSpacer()
    // @ts-ignore
    if ('error' in valid) console.log(valid.error.issues)
    if ('error' in valid) console.log(zodUtils.prettifyZodError(valid.error))
    if ('issues' in valid)
      expect(zodUtils.prettifyZodError(valid)).toBeTypeOf('string')
  })
})
