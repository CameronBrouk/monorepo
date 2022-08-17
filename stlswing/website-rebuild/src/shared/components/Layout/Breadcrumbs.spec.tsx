import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import * as C from './Breadcrumbs'

describe('translateRouteToCrumb', () => {
  it('Returns Defaults Translation', () => {
    expect(C.translateRouteToCrumbs(`/learn/classes`)).toStrictEqual([
      {
        route: '/learn',
        text: 'Learn',
        icon: undefined
      },
      {
        route: '/learn/classes',
        text: 'Classes',
        icon: undefined
      }
    ])
  })

  it('Returns translation with overrides', () => {
    const firstOverride = 'Learn To Dance'
    const secondOverride = 'Group Classes'
    const overrides = {
      learn: { text: firstOverride },
      classes: { text: secondOverride }
    }

    const translatedCrumbs = C.translateRouteToCrumbs(
      `/learn/classes`,
      overrides
    )
    expect(translatedCrumbs[0].text).toBe(firstOverride)

    expect(translatedCrumbs[1].text).toBe(secondOverride)
  })
})

describe('Breadcrumbs', () => {
  afterEach(() => {
    cleanup()
  })

  test('Truncates Long Routes', () => {
    render(
      <MemoryRouter initialEntries={['/1/2/3/4/5/6/7']}>
        <C.Breadcrumbs />
      </MemoryRouter>
    )
    expect(screen.getAllByText(/\d/).length).toBe(3)
  })

  test('Change RouteName Casing', () => {
    render(
      <MemoryRouter initialEntries={['/learn/classes']}>
        <C.Breadcrumbs />
      </MemoryRouter>
    )
    expect(screen.getByText('Learn')).toBeInTheDocument()
    expect(screen.getByText('Classes')).toBeInTheDocument()
  })
})
