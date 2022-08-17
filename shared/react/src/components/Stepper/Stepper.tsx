import React, { useState, Children, useEffect } from 'react'
import { StepProps } from './Step'
import { StepperHeader, StepContent, StepperFooter } from './components'
import { navigateToStepIndex } from './helpers/stepper.helpers'
import { useWindowSize } from '../../hooks'

type Props = {
  currentStep?: number
  className?: string
  children: (React.FunctionComponentElement<StepProps> | false)[] // Children Should have step props
  fullPage?: boolean
  hideFooter?: boolean
}

export const Stepper = (props: Props) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(
    (props.currentStep || 1) - 1
  )

  const [stepPropsList, setStepPropsList] = useState<StepProps[]>([])

  const [windowHeight] = useWindowSize()

  useEffect(() => {
    setStepPropsList(
      // @ts-ignore
      Children.toArray(props.children).map((child) => child.props)
    )
  }, [props.children])

  useEffect(() => {
    setStepPropsList((prevProps) =>
      prevProps.map((prop, i) => {
        if (i < currentStepIndex) return { ...prop, completed: true }
        return prop
      })
    )
  }, [currentStepIndex, props.currentStep])

  return (
    <section
      style={
        props.fullPage
          ? { height: windowHeight, maxHeight: windowHeight }
          : { height: '100%', minHeight: '100%', maxHeight: '100%' }
      }
      className='w-full overflow-hidden flex flex-col justify-between items-stretch'
    >
      <StepperHeader
        currentStep={currentStepIndex}
        stepPropsList={stepPropsList}
        onClickTitle={(stepIndex) => {
          setCurrentStepIndex(
            navigateToStepIndex(stepIndex, currentStepIndex, stepPropsList)
          )
        }}
      />

      <StepContent selectedStep={currentStepIndex}>
        {props.children}
      </StepContent>

      {!props.hideFooter && (
        <StepperFooter
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
          stepProps={stepPropsList}
        />
      )}
    </section>
  )
}
