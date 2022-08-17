import { TabProps } from '../Tab'
import { useIsMobile } from '../../../hooks/useIsMobile'
import useMeasure from 'react-use-measure'

export type StepTitleProps = {
  type: 'complete' | 'current' | 'upcoming' | 'error'
  title: string
  stepNumber: number
  isLast?: boolean
  onClick: () => void
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  currentStep: number
  stepPropsList: TabProps[]
  onClickTitle: (stepIndex: number) => void
}
export const TabHeader = (props: Props) => {
  const isMobile = useIsMobile()
  const [headerContainerRef, { width: containerWidth }] = useMeasure()
  const [tabsContainerRef, { width: tabsWidth }] = useMeasure()

  return (
    <header className='w-full border-b flex h-16 grow-0'>
      <nav
        className='flex items-center justify-between px-4 sm:justify-center sm:px-0 h-full w-full'
        aria-label='Tabs'
      >
        {props.stepPropsList.map((tab, i) => (
          <button
            key={tab.title}
            onClick={() => props.onClickTitle(i)}
            className={classNames(
              props.currentStep === i
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'py-4 px-1 text-center transition-all duration-150 w-full border-b-2 font-medium text-sm'
            )}
            aria-current={props.currentStep === i ? 'page' : undefined}
          >
            {tab.title}
          </button>
        ))}
      </nav>
    </header>
  )
}
