import { add } from './index'

describe('add', () => {
  test('add 2', () => {
    expect(add(1, 1)).toEqual(2)
  })
})
