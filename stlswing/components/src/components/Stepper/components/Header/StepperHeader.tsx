import React from 'react'
import { equals, last } from 'ramda'
import { StepProps } from '../../Step'
import { DesktopStepTitle } from './DesktopStepTitle'
import { MobileStepTitle } from './MobileStepTitle'
import { useIsMobile } from '../../../../hooks'

export type StepTitleProps = {
  type: 'complete' | 'current' | 'upcoming' | 'error'
  title: string
  stepNumber: number
  isLast?: boolean
  onClick: () => void
}

type Props = {
  currentStep: number
  stepPropsList: StepProps[]
  onClickTitle: (stepIndex: number) => void
}
export const StepperHeader = (props: Props) => {
  const isMobile = useIsMobile()
  const getTitleState = (titleIndex: number): StepTitleProps['type'] => {
    if (props.stepPropsList[titleIndex]?.errors?.length) return 'error'
    if (props.currentStep === titleIndex) return 'current'
    if (props.stepPropsList[titleIndex]?.completed) return 'complete'
    return 'upcoming'
  }
  return (
    <header className='w-full border-b flex h-16 grow-0'>
      {isMobile && (
        <nav
          className='flex items-center justify-between sm:hidden px-4 sm:justify-center sm:px-0 h-full w-full'
          aria-label='Progress'
        >
          <span className='text-md font-semibold text-indigo-600'>
            {props.stepPropsList[props.currentStep]?.title}
          </span>
          <ol role='list' className='flex items-center space-x-5'>
            {props.stepPropsList.map((stepProps, i) => (
              <MobileStepTitle
                key={i}
                title={stepProps.title}
                onClick={() => props.onClickTitle(i)}
                stepNumber={i + 1}
                type={getTitleState(i)}
              />
            ))}
          </ol>
        </nav>
      )}

      {!isMobile && (
        <nav className='h-full w-full px-2'>
          <ol className='flex w-full space-x-2 h-full min-w-full justify-evenly'>
            {props.stepPropsList.map((stepProps, index) => (
              <DesktopStepTitle
                key={index}
                title={stepProps.title}
                type={getTitleState(index)}
                stepNumber={index + 1}
                onClick={() => props.onClickTitle(index)}
                isLast={equals(last(props.stepPropsList), stepProps)}
              />
            ))}
          </ol>
        </nav>
      )}
    </header>
  )
}
