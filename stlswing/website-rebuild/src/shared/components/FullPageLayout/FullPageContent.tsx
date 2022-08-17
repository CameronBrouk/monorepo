import React from 'react'
import { useWindowSize } from 'src/shared/hooks/useWindowSize'

interface FullPageContentProps {
  className?: string
  children?: React.ReactNode
}

export const FullPageContent = (props: FullPageContentProps) => {
  const [height] = useWindowSize()

  return (
    <div
      style={{ height: height - 60, maxHeight: height - 60 }}
      className={`w-full flex h-full flex-grow min-w-min overflow-y-auto relative ${props.className} `}
    >
      {props.children}
    </div>
  )
}
