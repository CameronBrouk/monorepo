import { range } from 'ramda'

export type Person = {
  id: number
  name: string
  age: number
  friends: number[]
  born: Date
  died: Date
  object: {
    test: string
    object: {
      test: number
    }
  }
}

export const makePerson = (i: number): Person => ({
  id: i,
  name: 'person' + i,
  age: i,
  friends: [i + 1, i - 1],
  born: new Date('1-1-2020'),
  died: new Date('1-1-2021'),
  object: {
    test: '',
    object: {
      test: 0
    }
  }
})

export const getPeople = async (i: number) => {
  const people = await range(0, i).map(makePerson)

  return people
}
