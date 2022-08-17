import React, { Children } from 'react'

interface SwiperProps {
  children: React.ReactNode
}
export const Swiper = (props: SwiperProps) => {
  return (
    <div className='snap-x snap-mandatory flex w-screen overflow-x-auto sm:overflow-hidden sm:max-w-screen'>
      {Children.map(props.children, (child) => (
        <div className='snap-center snap-mandatory flex px-2'>{child}</div>
      ))}
    </div>
  )
}

export default Swiper
