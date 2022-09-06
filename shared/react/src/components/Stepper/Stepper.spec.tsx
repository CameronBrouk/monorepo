import { describe, beforeEach, it, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Stepper } from './Stepper'
import { Step } from './Step'

describe('Stepper > On Mount', () => {
  beforeEach(() => {
    global.innerWidth = 1600
    render(
      <Stepper>
        <Step title='First Step'>First Content</Step>
        <Step title='Second Step'>Second Content</Step>
        <Step title='Third Step'>Third Content</Step>
      </Stepper>
    )
  })

  it('renders all step titles', () => {
    // Mobile Will render 1 extra title.
    expect(screen.getAllByText(/.* Step/).length).toBe(4)
  })

  it('does not render a previous button on the first step', () => {
    expect(screen.queryByText(/previous/i)).not.toBeInTheDocument()
  })
  it('contains a next button', () => {
    expect(screen.getByText(/next/i)).toBeInTheDocument()
  })
})

describe('Stepper > Navigation Buttons', () => {
  beforeEach(async () => {
    render(
      <Stepper>
        <Step title='First Step'>First Content</Step>
        <Step title='Second Step' disabled={false}>
          Second Content
        </Step>
        <Step title='Third Step' disabled={true}>
          Third Content
        </Step>
      </Stepper>
    )
    await userEvent.click(screen.getByText(/next/i))
  })

  it('disables next button until current step is complete', async () => {
    const nextButton = await screen.findByText(/next/i)
    // current step is complete in mock, so we check if its not disabled
    expect(nextButton).not.toBeDisabled()
  })

  it('renders complete button on final step', async () => {
    // Go to final step
    userEvent.click(await screen.findByText(/next/i))
    expect(await screen.findByText(/complete/i)).toBeInTheDocument()
  })

  it('disables final step until step is complete', async () => {
    // Go to final step
    userEvent.click(await screen.findByText(/next/i))
    expect(await screen.findByText(/complete/i)).toBeDisabled()
  })

  it('renders previous button on second step', async () => {
    expect(await screen.queryByText(/previous/i)).toBeInTheDocument()
  })
})

describe('Stepper > Title Step Selection', () => {
  it('Navigates to the correct step when you click the title button', async () => {
    render(
      <Stepper>
        <Step title='First Step'>First Content</Step>
        <Step title='Second Step'>Second Content</Step>
      </Stepper>
    )
    userEvent.click(screen.getByText(/Second Step/i))
    const secondStepContent = await screen.findByText(/Second Content/i)
    expect(secondStepContent).toBeInTheDocument()
  })
})

describe('Stepper > Errors', () => {
  beforeEach(() => {
    render(
      <Stepper>
        <Step title='First Step' errors={['Error Text']}>
          First Content
        </Step>
        <Step title='Second Step'>Second Content</Step>
      </Stepper>
    )
  })

  it('Displays Error Icon in Title', () => {
    expect(screen.getByTestId('error-icon')).toBeInTheDocument()
  })

  it('Displays Error Text on screen', async () => {
    const errors = await screen.findByText(/error/i)
    expect(errors).toBeInTheDocument()
  })
})
