import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useIsMobile } from '../../../shared/hooks/useIsMobile'
import { useWindowSize } from '../../../shared/hooks/useWindowSize'
import PersonCard from './PersonCard'

/* This example requires Tailwind CSS v2.0+ */
interface TestimonialCardProps {
  image: string
  name: string
  quote: string
  subTitle: string
  subDescriptionTitle: string
  subDescription: React.ReactNode
}
export default function TestimonialCard(props: TestimonialCardProps) {
  const [_, width] = useWindowSize()
  const isMobile = useIsMobile()
  return (
    <PersonCard
      width={isMobile ? width * 0.8 : width * 0.4}
      image={props.image}
      name={props.name}
      subTitle={props.subTitle}
    >
      <blockquote className='relative p-1'>
        <FontAwesomeIcon
          icon={faQuoteLeft}
          size='4x'
          className='bg-transparent top-10 text-gray-200 -mb-6'
        />
        <p className='text-lg font-bold p-3 pt-0 text-justify'>{props.quote}</p>
      </blockquote>
      <div className='border-t p-4'>
        <p className='text-yellow-800 uppercase font-bold rounded-full w-fit text-xs'>
          {props.subDescriptionTitle}
        </p>
        <p className='text-sm text-gray-400'>{props.subDescription}</p>
      </div>
    </PersonCard>
  )
}
