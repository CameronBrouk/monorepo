import React from 'react'
import { StepProps } from '../../Step'
import { exists, onlyPopulatedValues } from '../../../../utils'
import { Button } from '../../../Button'
import { navigateToSlideIndex } from '../../../Animations/Slider/slider.helpers'

type Props = {
  stepProps: StepProps[]
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>
  currentStepIndex: number
}
export const StepperFooter = ({ stepProps, ...props }: Props) => {
  const onLastStep = props.currentStepIndex === stepProps.length - 1
  const onFirstStep = props.currentStepIndex === 0
  const selectedStep = stepProps[props.currentStepIndex]

  return (
    <footer className='relative flex-grow-0 transition-all flex-none flex justify-between items-center w-full px-4 py-2 bg-white border-t'>
      {onFirstStep ? (
        <div />
      ) : (
        <Button
          variant='raised'
          onClick={() => {
            selectedStep?.onPrevious && selectedStep.onPrevious()
            props.setCurrentStepIndex(
              navigateToSlideIndex(
                props.currentStepIndex - 1,
                props.currentStepIndex,
                stepProps
              )
            )
          }}
        >
          Previous
        </Button>
      )}

      {exists(onlyPopulatedValues(selectedStep?.errors || [])) && (
        <p className='text-red-400 font-semibold max-w-5xl pt-2'>
          [ERROR]: {selectedStep?.errors?.join(', ')}
        </p>
      )}

      <Button
        color='primary'
        variant='raised'
        disabled={selectedStep?.disabled}
        onClick={() => {
          // If the 'onNext' prop was given, run that function
          // NOTE:  This is how the 'complete' is meant to be used.
          selectedStep?.onNext && selectedStep.onNext()

          // If On the Last Step, Don't do anything
          if (onLastStep) return

          if (selectedStep)
            props.setCurrentStepIndex(
              navigateToSlideIndex(
                props.currentStepIndex + 1,
                props.currentStepIndex,
                stepProps
              )
            )
        }}
      >
        {onLastStep ? 'Complete' : 'Next'}
      </Button>
    </footer>
  )
}
