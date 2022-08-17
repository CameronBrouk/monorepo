import React, { forwardRef } from 'react'

const TableContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    className={`min-w-full w-full h-full m-0 max-h-screen overflow-x-auto flex flex-col justify-between items-stretch overflow-hidden`}
  >
    {children}
  </div>
)

export default forwardRef(TableContainer)
