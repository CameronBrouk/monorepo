import React, { useState } from 'react'

type Props = {
  truncated?: boolean
  className?: string
  children?: React.ReactNode
}
export const TruncatedText = (props: Props) => {
  const [truncated, setTruncated] = useState(props.truncated)

  return (
    <div
      className={`
        transition-all delay-150 ${props.className}
      `}
    >
      <p className={truncated ? 'truncate' : ' '}>{props.children}</p>
      {
        <button
          className='text-blue-600'
          onClick={() => setTruncated((v) => !v)}
        >
          {truncated ? ' expand' : ' collapse'}
        </button>
      }
    </div>
  )
}
