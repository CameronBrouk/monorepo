import React from 'react'

export type LoadingProps = {
  color?: 'purple' | 'light' | 'red' | 'pink' | 'sky' | 'mint'
  className?: string
}

export const Loading = ({ className, color }: LoadingProps) => {
  const getColor = () => {
    if (color === 'purple') return '#1E40AF'
    if (color === 'red') return '#8a2c0d'
    if (color === 'pink') return '#FECACA'
    if (color === 'sky') return '#BFDBFE'
    return '#DEF7EC'
  }

  return (
    <div
      className={
        'w-full h-full text-right flex justify-end items-end' + className
      }
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={`${className || 'h-20 w-20'}`}
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
      >
        <circle
          cx='50'
          cy='50'
          stroke={getColor()}
          strokeWidth='10'
          r='35'
          strokeDasharray='164.93361431346415 56.97787143782138'
        >
          <animateTransform
            attributeName='transform'
            type='rotate'
            repeatCount='indefinite'
            dur='1s'
            values='0 50 50;360 50 50'
            keyTimes='0;1'
          ></animateTransform>
        </circle>
      </svg>
    </div>
  )
}
