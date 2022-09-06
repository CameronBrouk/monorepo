import { addWeeks } from 'date-fns'
import * as D from './rrule'
import { RRuleSet, RRule, rrulestr } from 'rrule'
import { describe, expect, it, test, beforeEach, vi, afterAll } from 'vitest'
import { formatDate, toUTC } from '../dates/dates'

const mockDate = new Date(2022, 1, 1, 1, 1, 1)

describe('rrule-fp', () => {
  beforeEach(() => {
    vi.setSystemTime(mockDate)
  })

  afterAll(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  // const rule = new RRule({
  //   dtstart: toUTC(new Date(2021, 9, 0, 0)),
  //   freq: RRule.YEARLY,
  //   bymonth: 9,
  //   byweekday: RRule.MO,
  //   bysetpos: 1,
  // byminute: [1],
  // byweekday: [RRule.MO],
  // byhour: [toUTC(new Date(2022, 1, 1, 0)).getHours()],
  //   until: new Date(2025, 8, 2, 12, 50)
  // })

  // const ruleset = new RRuleSet()
  // ruleset.rrule(
  //   new RRule({
  //     dtstart: new Date(),
  //     until: addWeeks(new Date(), 4)
  //   })
  // )
  test('tests', () => {
    expect(true).toBe(true)
  })
})
