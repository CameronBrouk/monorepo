import React from 'react'

export const Newsletter = () => {
  return (
    <div className='bg-gray-800'>
      <div className='max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center px-4 py-12 mx-auto'>
        <div className='lg:w-0 lg:flex-1'>
          <h2
            className='sm:text-4xl text-3xl font-extrabold tracking-tight text-white'
            id='newsletter-headline'
          >
            Sign up for our newsletter
          </h2>
          <p className='max-w-3xl mt-3 text-lg leading-6 text-gray-300'>
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat.
          </p>
        </div>
        <div className='lg:mt-0 lg:ml-8 mt-8'>
          <form className='sm:flex'>
            <label htmlFor='emailAddress' className='sr-only'>
              Email address
            </label>
            <input
              id='emailAddress'
              name='emailAddress'
              type='email'
              autoComplete='email'
              required
              className='focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white sm:max-w-xs w-full px-5 py-3 placeholder-gray-500 border border-transparent rounded-md'
              placeholder='Enter your email'
            />
            <div className='sm:mt-0 sm:ml-3 sm:flex-shrink-0 mt-3 rounded-md shadow'>
              <button
                type='submit'
                className='hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md'
              >
                Notify me
              </button>
            </div>
          </form>
          <p className='mt-3 text-sm text-gray-300'>
            {/* We care about the protection of your data. Read our */}
            {/* <a href='#' className='font-medium text-white underline'>
              Privacy Policy.
            </a> */}
          </p>
        </div>
      </div>
    </div>
  )
}
