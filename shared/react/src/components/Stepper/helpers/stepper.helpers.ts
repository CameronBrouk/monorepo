// import { toast } from 'react-toastify'
// prettier-ignore
import {isEmpty, map, pipe, prop } from 'ramda';
import { StepProps } from '../Step'
import { exists, onlyPopulatedValues } from '@unimpaired/utils'

export const getErrorSteps = (steps: StepProps[]) =>
  steps.filter(({ errors }) => exists(errors))
export const getErrorStepsTitles = pipe(getErrorSteps, map(prop('title')))
export const hasErrorStep = (steps: StepProps[]) =>
  !isEmpty(onlyPopulatedValues(getErrorStepsTitles(steps)))
export const stepHasError = (stepIndex: number, steps: StepProps[]): boolean =>
  !!steps[stepIndex]?.errors?.length

export const navigateToStepIndex = (
  toIndex: number,
  fromIndex: number,
  steps: StepProps[]
) => {
  const currentStep = steps[fromIndex]
  if (!currentStep) return fromIndex

  // Don't allow negative indexes
  if (toIndex < 0) {
    // toast.error('No previous steps')
    return fromIndex
  }

  // If the index is equal to the current index, don't navigate
  if (toIndex === fromIndex) return fromIndex

  // allow navigation to previous steps
  if (toIndex < fromIndex) return toIndex

  // If parent has disallowed the ability to continue, don't navigate
  if (steps[fromIndex]?.disabled) {
    // toast.error('Please complete the current step')
    return fromIndex
  }

  // If every step preceding the desired step allows continuation, then continue
  if (steps.slice(fromIndex, toIndex - 1).every((step) => !step.disabled))
    return toIndex

  return fromIndex
}
