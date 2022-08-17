import { Outlet } from 'react-router'
import { Breadcrumbs } from '../../shared/components/Layout/Breadcrumbs'
import { RouteTitle } from '../../shared/components/Layout/RouteTitle'

const linkData = [
  {
    route: '/learn/group-classes',
    text: 'Group Classes',
    description:
      'Join a group of students to learn dance from a pair of instructors'
  },
  {
    route: '/online-videos',
    text: 'Online Videos',
    description: 'Check out a collection of our favorite videos for inspiration'
  },
  {
    route: '/practice-resources',
    text: 'Practice Resources',
    description:
      'Footwork excercises, practice music organized by tempo, recap videos.'
  }
]

export const Learn = () => {
  return (
    <div className='max-h-full h-full flex flex-col'>
      <div className='w-full grow max-h-full overflow-scroll'>
        <RouteTitle />

        <Outlet />
      </div>

      <Breadcrumbs nameOverrides={{}} />
    </div>
  )
}

export default Learn
