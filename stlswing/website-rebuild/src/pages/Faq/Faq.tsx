import { useState } from 'react'
import { H1 } from '../../shared/components/Text/H1'
import { Accordion } from '../../shared/components/Accordion'
import { Search } from '../../shared/components/Search'
import { fuzzySearch } from '../../shared/utils'
import { faqContent } from './faq.constants'
import { Breadcrumbs } from '../../shared/components/Layout/Breadcrumbs'

export const Faq = () => {
  const [term, setTerm] = useState('')

  return (
    <>
      <Breadcrumbs />
      <section className='relative z-0'>
        <H1>Frequently Asked Questions</H1>
        <div className='flex flex-col items-center'>
          <div className='w-screen bg-gray-200 p-4'>
            <div className='max-w-5xl mx-auto'>
              <Search onSearch={setTerm} />
            </div>
          </div>

          <ul className='sm:px-1/4 flex flex-col justify-center px-4 mt-10 align-middle divide-y divide-gray-200 sm:max-w-5xl'>
            {fuzzySearch(faqContent, term).map(({ question, answer }, i) => (
              <Accordion
                key={i}
                title={question}
                containerClasses='border-x-none w-full py-2'
                panelClasses='p-4'
              >
                {answer}
              </Accordion>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Faq
