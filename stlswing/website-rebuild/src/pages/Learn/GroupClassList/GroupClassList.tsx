import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getFirestoreCollection } from '../../../firebase/firestore/firestore.helpers'
import { GroupClassCard } from './components/GroupClassCard/GroupClassCard'
import { LogoLoader } from '../../../shared/components/Loaders/LogoLoader'
import logo from '../../../assets/images/logo-dark.png'
import {
  defaultFilters,
  GroupClassFilters
} from './components/GroupClassFilters/GroupClassFilters'
import { useInView } from 'react-intersection-observer'

type Props = {
  searchString?: string
}
export const GroupClassesListPage = ({ searchString = '' }: Props) => {
  const [filters, setFilters] = useState(defaultFilters)
  const { data: classes } = useQuery<any[]>('group-classes', () =>
    getFirestoreCollection('groupClasses')
  )
  const [ref, isInView] = useInView()

  return (
    <section className=''>
      <div className={`sticky top-0 z-40`}>
        <GroupClassFilters
          filters={filters}
          setFilters={setFilters}
          className={`${!isInView && 'bg-indigo-900'}`}
        />
      </div>
      <div className='bg-gray-800' ref={ref}>
        <p className='max-w-5xl mx-auto text-justify text-md text-white p-4 font-semibold'>
          Classes include free entry into our weekly 2 hour social event. Listen
          to amazing live music, practice what you learned, show off, meet new
          people and hound our instructions with incessent questions about your
          new obsession.
        </p>
      </div>
      {!classes && <LogoLoader size={80} logoSrc={logo} />}
      <div className='p-4 sm:grid sm:grid-cols-3 sm:max-w-7xl mx-auto'>
        {classes &&
          [...classes, ...classes, ...classes, ...classes].map(
            (groupClass, i) => (
              <GroupClassCard groupClass={groupClass} key={i} />
            )
          )}
      </div>
    </section>
  )
}

export default GroupClassesListPage
