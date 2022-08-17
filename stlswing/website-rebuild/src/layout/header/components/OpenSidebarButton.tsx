import React from 'react'

type Props = { toggleSidebar: () => void }
export const OpenSidebarButton = ({ toggleSidebar }: Props) => (
  <button
    className='px-4 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden'
    aria-label='Open sidebar'
    data-testid='open-mobile-header-button'
    onClick={toggleSidebar}
  >
    <svg className='w-6 h-6' stroke='#ffffff' fill='none' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M4 6h16M4 12h16M4 18h7'
      />
    </svg>
  </button>
)
