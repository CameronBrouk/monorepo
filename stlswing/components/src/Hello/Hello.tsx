import { HelloProps } from './Hello.types'

export const Hello = (props: HelloProps) => (
  <p className='text-xl bg-red-200'>{props?.a || 'fuck'}</p>
)
