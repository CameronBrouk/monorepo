import FullMediaCard from './FullMediaCard'

interface MediaActionCardProps {
  src: string
  title: string
  description: string
  buttonText: string
  onClick: () => void
}
export default function MediaActionCard(props: MediaActionCardProps) {
  return (
    <div className='m-4 relative text-white'>
      <FullMediaCard size='sm' src={props.src}>
        <h1 className='font-extrabold absolute text-center z-50 top-12 text-2xl'>
          {props.title}
        </h1>

        <p className='text-xs absolute z-50 p-4'>{props.description}</p>
        <button
          onClick={props.onClick}
          className='bg-white uppercase text-xs rounded-full px-4 py-1.5 text-gray-800 font-semibold absolute z-50 bottom-12'
        >
          {props.buttonText}
        </button>
      </FullMediaCard>
    </div>
  )
}
