// import { useRouter } from 'app/shared/hooks'
import React from 'react'

export const LearnToDancePanel = () => {
  const navigateTo = (...t: any[]) => ''

  return (
    <div className='bg-gray-800 sm:bg-white'>
      {/* <!-- Header --> */}
      <div className='relative pb-32 bg-gray-800'>
        <div className='absolute inset-0'>
          <div
            className='absolute inset-0 bg-gray-800'
            aria-hidden='true'
          ></div>
        </div>
        <div className='relative px-4 py-24 mx-auto max-w-7xl sm:py-32 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl'>
            Learn To Dance
          </h1>
          <p className='max-w-3xl mt-6 text-xl text-gray-300'>
            No experience or partner required!
          </p>
        </div>
      </div>

      {/* <!-- Overlapping cards --> */}
      <section
        className='relative z-10 px-4 pb-32 mx-auto -mt-48 max-w-7xl sm:px-6 lg:px-8'
        aria-labelledby='contact-heading'
      >
        <h2 className='sr-only' id='contact-heading'>
          Learn To Dance
        </h2>
        <div className='grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8'>
          <div className='bg-white shadow-xl rounded-2xl'>
            <div className='relative px-6 pt-16 pb-8 md:px-8'>
              <h3 className='text-xl font-medium text-gray-900'>Beginner</h3>
              <p className='mt-4 text-base text-gray-500'>
                You've never done this before, but want to try it out
              </p>
            </div>
            <div className='p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8'>
              <button
                onClick={() =>
                  navigateTo('/swing-dance-classes/groupClasses/beginner')
                }
                className='text-base font-medium text-indigo-700 hover:text-indigo-600'
              >
                View Classes<span aria-hidden='true'> &rarr;</span>
              </button>
            </div>
          </div>

          <div className='bg-white shadow-xl rounded-2xl'>
            <div className='relative px-6 pt-16 pb-8 md:px-8'>
              <h3 className='text-xl font-medium text-gray-900'>
                Intermediate
              </h3>
              <p className='mt-4 text-base text-gray-500'>
                You know enough to be dangerous, but want more
              </p>
            </div>

            <div className='p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8'>
              <button
                onClick={() =>
                  navigateTo('/swing-dance-classes/groupClasses/intermediate')
                }
                className='text-base font-medium text-indigo-700 hover:text-indigo-600'
              >
                View Classes<span aria-hidden='true'> &rarr;</span>
              </button>
            </div>
          </div>

          <div className='bg-white shadow-xl rounded-2xl'>
            <div className='relative px-6 pt-16 pb-8 md:px-8'>
              <h3 className='text-xl font-medium text-gray-900'>Advanced</h3>
              <p className='mt-4 text-base text-gray-500'>
                You've become a hopeless addict. One of us.
              </p>
            </div>
            <div className='p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8'>
              <button
                onClick={() =>
                  navigateTo('/swing-dance-classes/groupClasses/advanced')
                }
                className='text-base font-medium text-indigo-700 hover:text-indigo-600'
              >
                View Classes<span aria-hidden='true'> &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LearnToDancePanel
