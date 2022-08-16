import { useObservableCallback, useSubscription } from 'observable-hooks'
import { useState } from 'react'
import { auditTime, tap } from 'rxjs'
import { Loading } from '../../Loaders/Loading'
import { ButtonProps } from '../Button/Button'

export type SubmitButtonProps = {
  isSubmitting?: boolean
  onClick?: () => Promise<void>
} & Omit<ButtonProps, 'onClick'>

export const SubmitButton = ({
  isSubmitting,
  children,
  ...props
}: SubmitButtonProps) => {
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
