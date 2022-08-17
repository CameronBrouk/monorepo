import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { animated, useTransition } from '@react-spring/web'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo-white.png'
import vid1 from '../../../assets/videos/ilhc-mobile.mp4'
import vid2 from '../../../assets/videos/lindy-vocab-1.mp4'
import vid3 from '../../../assets/videos/skye-frida-swingouts.mp4'
import { MediaFade } from '../../../shared/components/Media/MediaFade'
import { useWindowSize } from '../../../shared/hooks/useWindowSize'

const slides = [vid1, vid2, vid3]
const textSlides = ['Lindy Hop', 'Blues', 'Balboa', 'East Cost', 'Bachata']

export const Hero = () => {
  const [windowHeight] = useWindowSize()

  const animationDuration = 2000

  const [index, set] = useState(0)
  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: animationDuration
    },
    onRest: (_a, _b, item) => {
      if (index === item) {
        set((state) => (state + 1) % textSlides.length)
      }
    },
    exitBeforeEnter: true
  })

  return (
    <div
      style={{ maxHeight: windowHeight - 80, height: windowHeight - 80 }}
      className='relative'
    >
      <div className='absolute z-10 w-full'>
        <MediaFade
          height={windowHeight - 80}
          slides={slides}
          duration={animationDuration}
        >
          <div className='w-screen text-white bg-gray-800 flex bg-opacity-80 h-full'>
            <img
              src={logo}
              height={50}
              width={50}
              alt='logo'
              className={`object-contain grow sm:grow-0 p-2`}
            />
            <div className='h-full w-3/4 p-2 space-y-3'>
              {transitions((style, i) => (
                <animated.h1
                  className='text-3xl text-white  font-extrabold'
                  style={style}
                >
                  {textSlides[i]}
                </animated.h1>
              ))}
              <div className='flex space-x-2'>
                <HeroLink route={'/classes'}>View Classes</HeroLink>
                <HeroLink route={'/events'}>View Events</HeroLink>
                <a className='pt-2' href='/#what-is-swing-dancing'>
                  <p className='sr-only'>What We Do</p>
                  <FontAwesomeIcon
                    icon={faCircleChevronDown}
                    size='2x'
                    className='animate-bounce'
                  />
                </a>
              </div>
            </div>
          </div>
        </MediaFade>
      </div>
    </div>
  )
}

interface HeroLinkProps {
  route: string
  children: React.ReactNode
}
const HeroLink = (props: HeroLinkProps) => (
  <Link
    to={props.route}
    className='w-full rounded-md border min-w-fit border-blue-300 flex items-center justify-center p-2 font-medium text-blue-300'
  >
    {props.children}
  </Link>
)
