import React, { useEffect, useRef, useState } from 'react'
import { useObservableCallback, useSubscription } from 'observable-hooks'
import { ButtonProps, Button } from '../Button/Button'
import { debounce, debounceTime, delay, tap } from 'rxjs'

export const ConfirmationButton = ({ onClick, children }: ButtonProps) => {
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    // If they have double clicked, reset state
    if (confirmed) {
      setConfirmed(false)
      setConfirming(false)
      clearInterval(0)
      return
    }
    // if they are confirming, don't set a new timeout
    if (!confirming) return
    setTimeout(() => setConfirming(false), 2000)
  }, [confirming, confirmed])

  return (
    <Button
      variant={confirming ? 'warn' : 'raised'}
      type='button'
      onClick={(e) => {
        e.stopPropagation()
        if (confirming) {
          onClick()
          clearInterval(0)
          setConfirmed(true)
        } else {
          setConfirming(true)
        }
      }}
    >
      <div className='flex items-center space-x-2'>
        {!confirming ? children : 'confirm'}
      </div>
    </Button>
  )
}
