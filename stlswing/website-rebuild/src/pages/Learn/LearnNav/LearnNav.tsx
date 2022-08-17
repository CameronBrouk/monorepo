import { animated, useTrail } from '@react-spring/web'
import { PageNavCardLink } from '../../../shared/components/Links/PageNavCardLink'

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
    description:
      'Join a group of students to learn dance from a pair of instructors'
  },
  {
    route: '/practice-resources',
    text: 'Practice Resources',
    description:
      'Join a group of students to learn dance from a pair of instructors'
  }
]

export const LearnNav = () => {
  const trail = useTrail(linkData.length, {
    config: { mass: 5, tension: 1500, friction: 200 },
    opacity: 1,
    transform: `translateX(0%)`,
    height: 100,
    from: { opacity: 0, height: 0, transform: `translate(-100%)` }
  })

  return (
    <nav>
      <ol role='list' className='space-y-4 p-4'>
        {trail.map((style, index) => (
          <animated.li style={style} key={index} className='list-none'>
            <PageNavCardLink
              route={linkData[index].route}
              descriptions={linkData[index]?.description}
            >
              {linkData[index].text}
            </PageNavCardLink>
          </animated.li>
        ))}
      </ol>
    </nav>
  )
}

export default LearnNav
