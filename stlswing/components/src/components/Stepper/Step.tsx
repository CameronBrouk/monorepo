import React from 'react'

export type StepProps = {
  title: string
  onNext?: () => void
  onPrevious?: () => void
  errors?: string[]
  disabled?: boolean
  canContinue?: boolean
  completed?: boolean // This is handled within Stepper component
  className?: string
  children?: React.ReactNode
}

// This component is meant to be used inside of the <Stepper /> component as a child
export const Step = ({ className, children }: StepProps) => (
  <div className={className + ' ' + ''}>{children}</div>
)
