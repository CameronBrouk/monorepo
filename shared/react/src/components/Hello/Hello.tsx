export type HelloProps = {
  a?: string
  b?: string
}

export const Hello = (props: HelloProps) => (
  <p className='text-2xl  text-red-500'>{props?.a || 'fuck'}</p>
)

export const HelloFuck = (props: HelloProps) => (
  <p className='text-xl bg-blue-200'>{props?.a || 'fuck offf'}</p>
)
