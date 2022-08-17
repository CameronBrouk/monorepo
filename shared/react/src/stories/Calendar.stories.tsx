import React from 'react'
import * as C from '../components/Calendar/Calendar'
export const Calendar = (props) => {
  return <C.Calendar date={new Date()} events={[]}></C.Calendar>
}
