import { render, screen } from '@testing-library/react'
import React from 'react'
import { MockPeopleTable } from './MockPeopleTable'
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Data Table | On Mount', () => {
  beforeEach(() => {
    render(<MockPeopleTable />)
  })
  it.skip('Displays the Search Bar by default', () => {
    const searchTable = screen.getByPlaceholderText(/search/i)
    expect(searchTable).toBeInTheDocument()
  })

  // it('Hides Search if hideSearch prop is given', async () => {
  //   act(() => {
  //     render(<MockPeopleTable hiddenSearch />)
  //     const search = screen.queryByText(/Search table/i)
  //     expect(search).toBeFalsy()
  //   })
  // })

  // it('Hides columnFilter if hideColumnFilter prop is given', async () => {
  //   act(() => {
  //     render(<MockPeopleTable hiddenFilters />)
  //     const columnFilter = screen.queryByText(/Show \/ Hide Columns/i)
  //     expect(columnFilter).toBeFalsy()
  //   })
  // })

  it.skip('Displays the table header by default', () => {
    act(() => {
      // render(<MockPeopleTable />)
      const tableHeader = screen.getAllByText(/Person |Friends ./).length
      expect(tableHeader).toBe(3)
    })
  })

  it.skip('Displays the table rows by default', async () => {
    await act(async () => {
      // render(<MockPeopleTable />)
      const personNameRows = await screen.queryAllByText(/person\d/)
      expect(personNameRows.length).toBe(3)
    })
  })
})

// describe('Data Table | Tooltip Text', () => {
//   it('Shows tooltip when hovering the Person Name column', () => {
//     act(async () => {
//       render(<MockPeopleTable />)
//       await userEvent.hover(screen.getByText(/Person Name/i))
//       expect(screen.getByText(/.tooltip./i)).toBeTruthy()
//     })
//   })
// })

// describe('Data Table | Column Filters', () => {
//   it('hides column when specified in table schema', () => {
//     act(async () => {
//       render(<MockPeopleTable hideAgeColumn />)

//       const tableHeader = screen.getAllByText(/Person|Friends./)
//       expect(tableHeader.length).toBe(2)
//       const ageHeader = screen.getByText(/Person Age/)
//       expect(ageHeader).toBeFalsy()
//     })
//   })

//   it('hides the rows that would be displayed by that filter', () => {
//     act(async () => {
//       const screenWithAge = render(<MockPeopleTable />)
//       const withAgeColumn = await screenWithAge.findAllByText(/\d years old/)
//       expect(withAgeColumn.length).toBe(3)
//       const screenWithoutAge = render(<MockPeopleTable hideAgeColumn />)
//       const withoutAgeColumn = await screenWithoutAge.findAllByText(
//         /\d years old/,
//       )
//       expect(withoutAgeColumn).toBeFalsy()
//     })
//   })

//   it('toggles corresponding column and its rows when switch buttons are cilcked', () => {
//     act(async () => {
//       render(<MockPeopleTable />)
//       const columnFilterButton = screen.getByText(/Show \/ Hide Filters/i)
//       await userEvent.click(columnFilterButton)

//       // get all 3 toggle buttons
//       const toggles = await screen.findAllByRole('checkbox')

//       // click first toggle button -> Person Name Column
//       // clicking makes it false
//       await userEvent.click(toggles[0])
//       const personNameRows = await screen.queryAllByText(/person\d/)
//       const personNameTitle = await screen.queryByText(/Person Name/)
//       expect(personNameRows).toBeFalsy()
//       expect(personNameTitle).toBeFalsy()
//       // click first toggle button again, make it true
//       await userEvent.click(toggles[0])
//       expect(personNameTitle).toBeTruthy()
//       expect(personNameRows.length).toBe(3)

//       // click second toggle button -> Person Age column
//       await userEvent.click(toggles[1])
//       const personAgeRows = await screen.queryAllByText(/person\d/)
//       const personAgeTitle = await screen.queryByText(/Person Age/)
//       expect(personAgeRows).toBeFalsy()
//       expect(personAgeTitle).toBeFalsy()
//       // click first toggle button again, make it true
//       await userEvent.click(toggles[1])
//       expect(personAgeTitle).toBeTruthy()
//       expect(personAgeRows.length).toBe(3)

//       const secondColumnRows = await screen.queryAllByText(/\d years old/)
//       expect(secondColumnRows.length).toBe(3)
//     })
//   })
// })

// describe('Data Tabe | Expansion Panel', () => {
//   it('Displays Expansion Panel When Expansion Prop Is Given', () => {
//     act(async () => {
//       render(<MockPeopleTable />)
//       const expansion = await screen.findByText(/.is.years old./i)
//       expect(expansion).toBeTruthy()
//     })
//   })

//   it('Does not show expansion panel on rows that don\t match predicate', () => {
//     act(async () => {
//       render(<MockPeopleTable />)
//       const expansion = await screen.findAllByText(/.is.years old./i)
//       expect(expansion.length).toBe(1)
//     })
//   })
// })

// describe('Data Table | Pagination', () => {
//   it('Displays By Default', () => {
//     act(async () => {
//       render(<MockPeopleTable />)
//       const nextButton = await screen.getByTitle(/next page/i)
//       expect(nextButton).toBeTruthy()
//     })
//   })

//   it('Shows only specified rows per page', () => {
//     act(async () => {
//       render(<MockPeopleTable rowsPerPage={2} />)
//       const rows = await screen.findAllByText(/persion\d/i)
//       expect(rows.length).toBe(3)
//     })
//   })
// })

describe('Data Table | Search', () => {
  it.skip('displays only the row that matches the search term given', async () => {
    render(<MockPeopleTable />)
    const search = screen.getByPlaceholderText(/.Search./i)
    userEvent.type(search, '2 years old')
    expect(await screen.findByText(/1 years old/)).toBeFalsy()
    expect(await screen.findByText(/3 years old/)).toBeFalsy()
    expect(await screen.findByText(/2 years old/)).toBeTruthy()
    await userEvent.clear(search)
    expect(await screen.findByText(/1 years old/)).toBeTruthy()
    expect(await screen.findByText(/3 years old/)).toBeTruthy()
  })
})
