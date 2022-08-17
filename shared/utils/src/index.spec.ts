import { add, camelCaseKeys, snakeCaseKeys } from './index'

describe('add', () => {
  test('add 2', () => {
    expect(add(1, 1)).toEqual(2)
  })
})

describe('camelCaseKeys', () => {
  test('Changes keys from snake_case to camelCase', () => {
    expect(
      camelCaseKeys({ cameron_brouk: 'value1', brandon_brouk: 'value2' })
    ).toStrictEqual({ cameronBrouk: 'value1', brandonBrouk: 'value2' })
  })
})

describe('snakeCaseKeys', () => {
  test('Changes keys from camel_case to snake_case', () => {
    expect(
      snakeCaseKeys({ cameronBrouk: 'value1', brandonBrouk: 'value2' })
    ).toStrictEqual({ cameron_brouk: 'value1', brandon_brouk: 'value2' })
  })
})
