import { animated } from '@react-spring/web'
import { useDateField } from '../hooks/useDateField'

interface Props {
  date: Date
  // setDate: SetState<Date>
  setDate: any
}

export const DateFieldLabel = ({ date, setDate }: Props) => {
  const { animations } = useDateField([date, setDate])

  return (
    <span className='w-full flex space-x-1 p-4'>
      {/* {Object.values(animations).map((animate))} */}
      {animations.day((style, day) => (
        <animated.p style={style}>{day}</animated.p>
      ))}
      ,{' '}
      {animations.month((style, month) => (
        <animated.p style={style}>{month}</animated.p>
      ))}
      {animations.date((style, month) => (
        <animated.p style={style}>{month}</animated.p>
      ))}
      ,
      {animations.year((style, year) => (
        <animated.p style={style}>{year}</animated.p>
      ))}
      , at{' '}
      {animations.time((style, time) => (
        <animated.p style={style}>{time}</animated.p>
      ))}
    </span>
  )
}
