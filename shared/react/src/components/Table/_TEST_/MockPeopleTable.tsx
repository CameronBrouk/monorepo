import React from 'react'
import { useEffect, useState } from 'react'
import { Table } from '../Table'
import { TableSchema } from '../types'
import { getPeople, Person } from './mockData'

type MockProps = {
  hiddenSearch?: boolean
  hiddenFilters?: boolean
  hideAgeColumn?: boolean
  rowsPerPage?: number
}

export const MockPeopleTable = (props: MockProps) => {
  const [people, setPeople] = useState<Person[]>()

  useEffect(() => {
    getPeople(10).then(setPeople)
  }, [])

  const columnNames = ['Person Name', 'Person Age', 'Friends Ages'] as const
  type ColumnNames = typeof columnNames[number]

  const tableSchema: TableSchema<Person, ColumnNames> = {
    'Person Name': {
      tooltipText: 'Tooltip Text',
      render: (person) => person.name.toUpperCase()
    },
    'Person Age': {
      render: (person) => person.age + ' years old',
      hidden: props.hideAgeColumn
    },
    'Friends Ages': {
      tooltipText: 'See the ages of your friends',
      render: (person) =>
        person.friends.map((age) => (
          <p key={age} style={{ color: 'green' }}>
            {age}
          </p>
        ))
    }
  }

  // prettier-ignore
  const ExpansionPanel = (person: Person) => <p>{person.name} is {person.age} years old</p>

  return (
    <Table<Person>
      hideSearch={props.hiddenSearch}
      hideColumnFilter={props.hiddenFilters}
      recordsList={people}
      tableSchema={tableSchema}
      rowsPerPage={props.rowsPerPage || 4}
    />
  )
}
