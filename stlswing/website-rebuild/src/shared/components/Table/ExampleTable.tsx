import { faker } from '@faker-js/faker'
import { prop, range } from 'ramda'
import React, { useEffect, useState } from 'react'
import { formatDate } from 'src/shared/utils'
import { Table } from './Table'
import { TableSchema } from './types'

const makePerson = (i: number) => ({
  id: i,
  name: faker.name.findName(),
  email: faker.internet.email(),
  imageUrl: faker.internet.avatar(),
  birthday: faker.date.birthdate().toISOString(),
  phone: faker.phone.number(),
  age: faker.datatype.number()
})
const makePeople = (amount: number) => range(1, amount).map(makePerson)
type Person = ReturnType<typeof makePerson>
const people = makePeople(101)

export const ExampleTable = (props: any) => {
  const [data, setData] = useState<any[]>()

  useEffect(() => {
    setTimeout(() => {
      setData(people)
    }, 1000)
  }, [])

  //prettier-ignore
  type ColumnNames = 'id' | 'age' | 'birthday' | 'email' | 'name' | 'phone' | 'fuck'

  const schema: TableSchema<Person> = {
    id: prop('id'),
    age: prop('age'),
    birthday: (person: any) => formatDate('month', person.birthday),
    email: prop('email'),
    name: prop('name'),
    phone: prop('phone')
  }
  return (
    <Table<Person>
      tableSchema={schema}
      selectable={{ onBulkEdit: console.log, onBulkDelete: console.log }}
      recordsList={data}
      defaultSort='email'
      {...props}
    />
  )
}
