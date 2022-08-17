interface InlineDescriptionSliderProps {
  name: string
  description: string
  checked?: boolean
  color?: string
  onClick: () => void
}

export const InlineDescriptionSlider = ({
  color = 'bg-indigo-500',
  ...props
}: InlineDescriptionSliderProps) => {
  return (
    <div className='py-4 flex items-center justify-between max-w-sm'>
      <div className='flex flex-col'>
        <p
          className='text-sm font-medium leading-5 text-gray-700'
          id={props.name}
        >
          {props.name}
        </p>
        {props.description && (
          <p className='text-sm text-gray-500' id={props.name + '-description'}>
            {props.description}
          </p>
        )}
      </div>

      <button
        type='button'
        onClick={props.onClick}
        className={`${
          props.checked ? color : 'bg-gray-200'
        } ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
        role='switch'
        aria-checked={props.checked}
        aria-labelledby={props.name}
        aria-describedby={props.name + '-description'}
      >
        <span
          aria-hidden='true'
          className={`${
            props.checked ? 'translate-x-5' : 'translate-x-0'
          } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
        ></span>
      </button>
    </div>
  )
}
