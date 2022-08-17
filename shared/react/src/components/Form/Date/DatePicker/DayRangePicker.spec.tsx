import React, { useState } from 'react'
import { screen, render } from '@testing-library/react'

import { set, reset } from 'mockdate'

test('mocked date works correctly', () => {
  // mock date to 2020
  set(new Date(2020, 2, 4))
  expect(new Date().getFullYear()).toBe(2020)

  reset() // sets back to current year
  expect(new Date().getFullYear()).toBe(2022)

  set(new Date(1969, 2, 4)) // mock date to 1969
  expect(new Date().getFullYear()).toBe(1969)
})

import { DayRangePicker } from './DayRangePicker'

const TestDayRangePicker = (defaultRange: Partial<Interval>) => {
  const [range, setRange] = useState(defaultRange)
  return (
    <DayRangePicker
      range={range}
      setRange={setRange}
      activeDate={'start'}
      setActiveDate={jest.fn}
    />
  )
}

describe('Day Range Picker', () => {
  test('Date Picker Has 35 days displayed in February 2022', () => {
    set(new Date(2022, 2, 4))
    render(<TestDayRangePicker />)
    expect(screen.getAllByTestId(/dayTile.*/).length).toEqual(35)
    reset()
  })

  test('Date Picker Has 42 days displayed in May 2021', () => {
    set(new Date(2021, 4, 4))
    render(<TestDayRangePicker />)
    expect(screen.getAllByTestId(/dayTile.*/).length).toEqual(42)
    reset()
  })
})
