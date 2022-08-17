import { animated, useTrail } from '@react-spring/web'
import { H1 } from '../..//shared/components/Text/H1'
import { PageNavCardLink } from '../../shared/components/Links/PageNavCardLink'

const linkData = [
  {
    route: '/gallery',
    text: 'Photo Gallery'
  },
  {
    route: '/more/faq',
    text: 'FAQ'
  },
  {
    route: '/about-us',
    text: 'About Us'
  },
  {
    route: '/contact-us',
    text: 'Contact Us'
  }
]

export const More = () => {
  const trail = useTrail(linkData.length, {
    config: { mass: 5, tension: 1500, friction: 200 },
    opacity: 1,
    transform: `translateX(0%)`,
    height: 80,
    from: { opacity: 0, height: 0, transform: `translate(-100%)` }
  })
  return (
    <div className='flex flex-col w-full h-full space-y-4 p-4'>
      <H1>More</H1>
      {trail.map((style, index) => (
        <animated.div style={style} key={index}>
          <PageNavCardLink route={linkData[index].route}>
            {linkData[index].text}
          </PageNavCardLink>
        </animated.div>
      ))}
    </div>
  )
}

export default More
