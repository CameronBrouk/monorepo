import * as D from './dates.js'
import { describe, expect, it, test, beforeEach, vi, afterAll } from 'vitest'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'

import { fromUnixTime, getUnixTime, parseISO, format, getDate } from 'date-fns'

const dateTimezone = new Date('2022-09-05T12:39:52.700Z')
const dateTime = new Date('2022-09-05T12:39:52.000Z')

describe('Timezones', () => {
  beforeEach(() => {
    vi.setSystemTime(dateTimezone)
  })

  afterAll(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  it('vite date shit works', () => {
    expect(new Date()).toEqual(dateTimezone)
  })

  it('utc offset is removed', () => {
    expect(D.toUTC(new Date()).toISOString()).toEqual(
      '2022-09-05T17:39:52.000Z'
    )
    expect(D.toUTC(dateTime).toISOString()).toEqual('2022-09-05T17:39:52.000Z')
  })
})
