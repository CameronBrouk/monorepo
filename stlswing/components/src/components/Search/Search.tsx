import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useObservableCallback, useSubscription } from 'observable-hooks'
import { debounceTime, distinctUntilChanged, pluck, tap } from 'rxjs'
import { Loading } from '../Loaders/Loading'

type Props = {
  onSearch: (event: string) => void
  onClick?: () => void
  placeholder?: string
  autoFocus?: boolean
  debounce?: boolean
  defaultValue?: string
  className?: string
}

export const Search = ({ onSearch, ...props }: Props) => {
  const ref = useRef<HTMLInputElement>(null)
  const placeholder = props.placeholder ? props.placeholder : 'Search'
  const [loading, setLoading] = useState(false)

  const [onChange, onSearch$] = useObservableCallback<
    any,
    React.FormEvent<HTMLInputElement>
  >((input$) =>
    input$.pipe(
      pluck('target', 'value'),
      tap(() => setLoading(true)),
      debounceTime(props.debounce ? 500 : 0),
      tap(() => setLoading(false)),
      distinctUntilChanged()
    )
  )

  useSubscription(onSearch$, onSearch)

  return (
    <div className='flex w-full grow border-b-2'>
      <div className='md:ml-0 flex w-full'>
        <label htmlFor='search_field' className='sr-only'>
          Search
        </label>
        <div className='focus-within:text-gray-600 relative w-full text-gray-400'>
          <div className='absolute inset-y-0 left-0 flex items-center ml-2 pointer-events-none'>
            {(!loading || !props.debounce) && (
              <FontAwesomeIcon icon={faSearch} />
            )}
            {loading && <Loading className='h-5 w-5 mt-2' color='purple' />}
          </div>
          <input
            onFocus={props.onClick}
            ref={ref}
            id='search_field'
            onChange={onChange}
            defaultValue={props.defaultValue || ''}
            autoFocus={props.autoFocus}
            autoComplete='off'
            className='focus:outline-none focus:placeholder-gray-400 sm:text-sm block w-full h-full py-4 pl-8 pr-3 text-gray-900 placeholder-gray-500 rounded-md'
            placeholder={`${placeholder}`}
            type='search'
          />
        </div>
      </div>
    </div>
  )
}
