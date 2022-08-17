import React from 'react'
import { Divider } from '@fp-unimpaired/react'
import { useState } from 'react'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='max-w-full relative space-x-4 w-screen h-screen max-h-screen bg-white text-red-800 flex flex-col justify-center items-center text-xl'>
      <div className='p-4 border bg-blue-200'>
        test test test test test test test test test test test
      </div>
      <Divider text='Test' />

      <header className='bg-pink-200 p-4'>
        <span className='flex space-x-4'>
          <button onClick={() => setCount((count) => count + 1)}>count</button>
          <p>{count}</p>
        </span>
        <p>
          Edittttt <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
      </header>
    </div>
  )
}

export default App
