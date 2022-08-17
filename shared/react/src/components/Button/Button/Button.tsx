import React, { ButtonHTMLAttributes, useEffect, useState } from 'react'

export type ButtonProps = {
  variant?: 'raised' | 'warn' | 'outline' | 'link' | 'nav-link' | 'christmas'
  children: React.ReactNode
  debounce?: boolean
  disabled?: boolean
  onClick: (e?: any) => void
  className?: string
} & ButtonHTMLAttributes<any>

export const Button = ({
  variant,
  children,
  className,
  debounce,
  onClick,
  ...props
}: ButtonProps) => {
  const base =
    'text-gray-600 hover:bg-gray-300 hover:text-gray-900 border border-gray-300 min-w-fit bg-white'
  const defaultClasses =
    'px-4 py-1 font-medium transition-all duration-300 ease-in-out focus:outline-none rounded shadow-lg'

  const getButtonClasses = () => {
    const christmas = 'bg-gradient-to-r from-green-700 to-green-500 text-white'
    const navLink = 'text-indigo-600 hover:text-indigo-800'
    const raised =
      'bg-indigo-700 text-white border border-indigo-800 focus:shadow-outline hover:bg-indigo-600'
    const outline =
      'border border-white hover:border-indigo-900 hover:text-indigo-900 hover:bg-white'
    const warn = 'bg-red-500 hover:bg-red-600 text-white'
    const disabled = 'bg-gray-300 text-gray-600'

    if (props.disabled) return disabled
    if (variant === 'christmas') return christmas
    if (variant === 'nav-link') return navLink
    if (variant === 'raised') return raised
    if (variant === 'outline') return outline
    if (variant === 'warn') return warn
    return base
  }

  return (
    <button
      className={`${defaultClasses} ${getButtonClasses()} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
