import { ButtonProps, Button } from '../Button/Button'
import React, { useState } from 'react'
import { Loading } from '../../Loaders/Loading'
import {
  useObservableCallback,
  useObservableState,
  useSubscription,
  pluckFirst,
  useObservable
} from 'observable-hooks'
import {
  audit,
  auditTime,
  from,
  map,
  skip,
  skipUntil,
  skipWhile,
  switchMap,
  tap,
  throttleTime,
  withLatestFrom
} from 'rxjs'

type Props = {
  isSubmitting?: boolean
  onClick?: () => Promise<void>
} & Omit<ButtonProps, 'onClick'>

export const SubmitButton = ({ isSubmitting, children, ...props }: Props) => {
  const [loading, setLoading] = useState(false)

  const [handleClick, clicks$] = useObservableCallback((cilck$) =>
    cilck$.pipe(
      tap(() => setLoading(true)),
      auditTime(1000),
      tap(() => setLoading(false))
    )
  )

  useSubscription(clicks$, props.onClick)

  return (
    <button variant='raised' type='submit' {...props} onSubmit={handleClick}>
      <div className='flex items-center space-x-2'>
        {(isSubmitting || loading) && <Loading className='w-6 h-6' />}
        <span>{children}</span>
      </div>
    </button>
  )
}
