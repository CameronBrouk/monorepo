import React, { useState, Children, useEffect } from 'react'
import { TabProps, Tab } from './Tab'
import { TabHeader } from './components'
import { useWindowSize } from '../../hooks/useWindowSize'
import { SliderContent } from '../Animations/Slider/SliderContent'
import { navigateToSlideIndex } from '../Animations/Slider/slider.helpers'

type Props = {
  currentTab?: number
  className?: string
  children: (React.FunctionComponentElement<TabProps> | false)[] // Children Should have step props
  fullPage?: boolean
}

const Tabs = (props: Props) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(
    (props.currentTab || 1) - 1
  )

  const [stepPropsList, setTabPropsList] = useState<TabProps[]>([])

  const [windowHeight] = useWindowSize()

  useEffect(() => {
    setTabPropsList(
      // @ts-ignore
      Children.toArray(props.children).map((child) => child.props)
    )
  }, [props.children])

  useEffect(() => {
    setTabPropsList((prevProps) =>
      prevProps.map((prop, i) => {
        if (i < currentTabIndex) return { ...prop, completed: true }
        return prop
      })
    )
  }, [currentTabIndex, props.currentTab])

  return (
    <section
      style={
        props.fullPage
          ? { height: windowHeight, maxHeight: windowHeight }
          : { height: '100%', minHeight: '100%', maxHeight: '100%' }
      }
      className='w-full overflow-hidden flex flex-col justify-between items-stretch'
    >
      <TabHeader
        currentStep={currentTabIndex}
        stepPropsList={stepPropsList}
        onClickTitle={(tabIndex) => {
          setCurrentTabIndex(
            navigateToSlideIndex(tabIndex, currentTabIndex, stepPropsList)
          )
        }}
      />

      <SliderContent selectedSlide={currentTabIndex}>
        {props.children}
      </SliderContent>
    </section>
  )
}

Tabs.Tab = Tab

export default Tabs
