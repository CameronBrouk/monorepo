import { useTransition, animated } from '@react-spring/web'
import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Video } from '../../../../../shared/components/Media'
import { formatDate } from '../../../../../shared/utils'
import { useRouter } from '../../../../../shared/hooks/useRouter'
import { EventDateStatusPill } from './components/EventDateStatusPill'
import video from '../../../../../assets/videos/ilhc-mobile.mp4'
import { Accordion } from '../../../../..//shared/components/Accordion'

type Props = {
  groupClass?: any
  className?: string
}

export const GroupClassCard = ({ groupClass, className }: Props) => {
  const { navigateTo } = useRouter()
  const [displayCard, setDisplayCard] = useState(false)

  const [ref, inView] = useInView()

  const animation = useTransition(groupClass, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    onRest: () => {
      setDisplayCard(true)
    }
  })

  // const getDefaultExperienceRequired = ({ level }: GroupClass) => {
  //   if (level === 'Intermediate') return 'Over 4 Months of Dancing'
  //   if (level === 'Advanced') return 'Over 1 year of Dancing'
  //   return 'No Experience Required, No Partner Required'
  // }

  return animation((style, groupClass) => (
    <animated.div style={style} ref={ref} className={className}>
      {!displayCard && (
        <div
          style={{ height: 400 }}
          className='w-full bg-slate-200 border shadow-xl animate-pulse my-8'
        ></div>
      )}

      {groupClass && displayCard && inView && (
        <section className='sm:m-5 sm:mt-8 relative flex flex-col mx-2 my-8 bg-white rounded-lg shadow-2xl'>
          <div className='absolute z-30 mt-2 ml-2'>
            <EventDateStatusPill dates={groupClass.dates} />
          </div>
          {/* Image */}
          <Video src={video} height={300} className='rounded-t-2xl bg-gray-500'>
            <div className='flex flex-col h-full text-white'>
              <div className='text-4xl font-bold flex  items-center justify-center text-center grow'>
                <h3 className='bg-red-900 bg-opacity-75 p-4'>
                  {groupClass.name}
                </h3>
              </div>
            </div>
          </Video>

          {/* Description */}
          <div className='sm:rounded-lg shadow-sm'>
            <div className='w-full flex border-b bg-gray-100'>
              <p className='w-full text-center p-3 font-bold text-gray-700'>
                4 Classes
              </p>
              <p className='w-full text-center p-3 border-r text-gray-700 font-bold'>
                Advanced
              </p>
              <p className='w-full text-center p-3 font-bold text-gray-700'>
                Lindy Hop
              </p>
            </div>
            <div className='sm:p-0 border-t border-gray-200'>
              <div className='divide-y divide-gray-400'>
                <h4 className='text-center text-gray-600 p-3'>
                  Take this if you've never danced swing before!
                </h4>
                <div>
                  <Accordion
                    title='Description'
                    containerClasses='p-0 m-0 w-full min-w-full w-full rounded-none border-none'
                    buttonClasses='m-0'
                    panelClasses='p-0 text-xs'
                    titleClasses='m-0 p-0 text-sm text-gray-500 font-medium'
                  >
                    No Bitches
                  </Accordion>
                </div>

                <div>
                  <Accordion
                    title='Dates'
                    containerClasses='p-0 m-0 w-full min-w-full w-full rounded-none border-none'
                    buttonClasses='m-0'
                    panelClasses='p-0 text-xs'
                    titleClasses='m-0 p-0 text-sm text-gray-500 font-medium'
                  >
                    <div>
                      {groupClass.dates.map((d: Date) =>
                        formatDate('readable', d)
                      )}
                    </div>
                  </Accordion>
                </div>

                <div>
                  <Accordion
                    title='Prerequisites'
                    containerClasses='p-0 m-0 w-full min-w-full w-full rounded-none border-none'
                    buttonClasses='m-0'
                    panelClasses='p-0 text-xs'
                    titleClasses='m-0 p-0 text-sm text-gray-500 font-medium'
                  >
                    No Bitches
                  </Accordion>
                </div>
                <div>
                  <Accordion
                    title='Location'
                    containerClasses='p-0 m-0 w-full min-w-full w-full rounded-none border-none'
                    buttonClasses='m-0'
                    panelClasses='p-0 text-xs'
                    titleClasses='m-0 p-0 text-sm text-gray-500 font-medium'
                  >
                    No Bitches
                  </Accordion>
                </div>

                <div>
                  <Accordion
                    title='Pricing'
                    containerClasses='p-0 m-0 w-full min-w-full w-full rounded-none border-none'
                    buttonClasses='m-0'
                    panelClasses='p-0 text-xs'
                    titleClasses='m-0 p-0 text-sm text-gray-500 font-medium'
                  >
                    No Bitches
                  </Accordion>
                </div>

                {/* <InfoSection title='Description'>
                  <TruncatedText truncated>
                    {groupClass.description}
                  </TruncatedText>
                </InfoSection>

                <InfoSection title='Price'>
                  {groupClass.dates.length > 1 ? '$25 / Week' : '$25'}
                </InfoSection> */}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              navigateTo('/learn/group-classes/' + groupClass.id)
            }}
            className='hover:bg-indigo-500 rounded-b-2xl flex justify-center w-full mt-auto text-white transition-all duration-200 bg-indigo-700 cursor-pointer'
          >
            <span className='p-3 text-2xl font-bold'>More Info</span>
          </button>
        </section>
      )}
    </animated.div>
  ))
}
