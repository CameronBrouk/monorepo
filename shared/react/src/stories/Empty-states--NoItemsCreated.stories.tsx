import React from 'react'
import { NoItemsCreated } from '../components'

export const Basic = (props) => {
  return <NoItemsCreated title='No Items Created'></NoItemsCreated>
}

export const Enhanced = (props) => {
  return (
    <NoItemsCreated title='No Items Created' subtitle='More Information below'>
      Information is given from the children prop
    </NoItemsCreated>
  )
}

export const WithAction = (props) => {
  return (
    <NoItemsCreated title='No Items Created'>
      <button
        type='button'
        onClick={console.log}
        className='w-full border-2 border-gray-300 border-dashed rounded-lg p-4 m-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        Create New Item
      </button>
    </NoItemsCreated>
  )
}
