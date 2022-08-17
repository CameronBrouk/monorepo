import { Image } from '../Media'

/* This example requires Tailwind CSS v2.0+ */
interface PersonCardProps {
  image: string
  name: string
  subTitle: string
  height?: number
  width?: number
  className?: string
  children?: React.ReactNode
}
export default function PersonCard(props: PersonCardProps) {
  return (
    <div
      style={{
        width: props.width || '100%',
        height: props.height || '100%'
      }}
      className={`flex min-h-fit h-fit flex-col items-center bg-white justify-center border-2 shadow-md rounded-xl py-4 ${props.className}`}
    >
      <div className='flex justify-between'>
        <div className=''>
          <div className='rounded-full border-2 border-white'>
            <div className='overflow-hidden rounded-full w-32 h-32'>
              <Image
                className='rounded-full'
                src={props.image}
                fit='cover'
                alt={`Photo of ${props.name}`}
              />
            </div>
            {/* <img
              className='h-32 w-32 rounded-full'
              src={props.image}
              alt={`Photo of ${props.name}`}
            /> */}
          </div>
          <p className='text-lg font-semibold text-center'>{props.name}</p>
          <p className='text-xs font-semibold text-gray-400 text-center'>
            {props.subTitle}
          </p>
        </div>
      </div>
      {props.children}
    </div>
  )
}
