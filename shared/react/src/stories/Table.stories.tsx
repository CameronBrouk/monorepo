import { Story } from '@ladle/react'
import * as T from '../components'
import { faker } from '@faker-js/faker'
import { prop, range, times } from 'ramda'
import { formatDate, wait } from '@unimpaired/utils'
import { ObjectDisplay } from '../components/Text/ObjectDisplay'
import React, { useEffect, useState } from 'react'

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

export const Basic: Story = (props) => {
  const [data, setData] = useState<any[]>()
  useEffect(() => {
    wait(1500).then(() => setData(people))
  }, [])
  const schema: T.TableSchema<Person, keyof Person> = {
    id: prop('id'),
    age: prop('age'),
    birthday: (person) => formatDate('month', person.birthday),
    email: prop('email'),
    name: prop('name'),
    phone: prop('phone')
  }
  return (
    <T.Table<Person>
      hideSearch
      tableSchema={schema}
      recordsList={data}
      defaultSort='id'
      {...props}
    />
  )
}

export const Selectable: Story = (props) => {
  const schema: T.TableSchema<Person, keyof Person> = {
    id: prop('id'),
    age: prop('age'),
    birthday: (person) => formatDate('month', person.birthday),
    email: prop('email'),
    name: prop('name'),
    phone: prop('phone')
  }
  return (
    <T.Table<Person>
      tableSchema={schema}
      recordsList={people}
      selectable={{
        onBulkEdit: console.log,
        onBulkDelete: console.log
      }}
      defaultSort='id'
      {...props}
    />
  )
}

export const Empty: Story = (props) => {
  const [data, setData] = useState<any[]>()
  useEffect(() => {
    wait(1500).then(() => setData([]))
  }, [])
  const schema: T.TableSchema<Person, keyof Person> = {
    id: prop('id'),
    age: prop('age'),
    birthday: (person) => formatDate('month', person.birthday),
    email: prop('email'),
    name: prop('name'),
    phone: prop('phone')
  }
  return <T.Table<Person> tableSchema={schema} recordsList={data} />
}

export const Advanced: Story = (props) => {
  const [data, setData] = useState<any[]>()
  useEffect(() => {
    wait(2500).then(() => setData(people))
  }, [])
  const schema: T.TableSchema<Person, keyof Person> = {
    id: prop('id'),
    age: prop('age'),
    birthday: (person) => formatDate('month', person.birthday),
    email: prop('email'),
    name: prop('name'),
    phone: prop('phone')
  }
  return (
    <T.Table<Person>
      tableSchema={schema}
      recordsList={data}
      selectable={{
        onBulkEdit: console.log,
        onBulkDelete: console.log
      }}
      expansion={{
        render: (person) => (
          <div className='p-4 bg-gray-100 h-full w-full'>
            <ObjectDisplay object={person} />
          </div>
        )
      }}
    />
  )
}

export const Expansion: Story = (props) => {
  const schema: T.TableSchema<Person, keyof Person> = {
    id: prop('id'),
    age: prop('age'),
    birthday: (person) => formatDate('month', person.birthday),
    email: prop('email'),
    name: prop('name'),
    phone: prop('phone')
  }
  return (
    <T.Table<Person>
      tableSchema={schema}
      recordsList={people}
      expansion={{
        render: (person) => (
          <div className='p-4 bg-gray-100 h-full w-full'>
            <ObjectDisplay object={person} />
          </div>
        )
      }}
      defaultSort='id'
      {...props}
    />
  )
}

const args = {
  hideSearch: false,
  hideHeader: false,
  rowsPerPage: 8
}
const argTypes = {
  defaultSort: {
    options: ['id', 'age', 'birthday', 'email', 'name', 'phone'],
    control: { type: 'select' },
    defaultValue: 'id'
  }
}

Basic.args = args
Basic.argTypes = argTypes
Selectable.args = args
Selectable.argTypes = argTypes
Expansion.args = args
Expansion.argTypes = argTypes
