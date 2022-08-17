import { Video } from '../../shared/components/Media'
import { useWindowSize } from '../../shared/hooks/useWindowSize'
import { Hero } from './components/Hero'
import { WhatIsSwingDancingPanel } from './components/WhatIsSwingDancingPanel'
// const WhatIsSwingDancing = React.lazy(
//   () => import('./components/WhatIsSwingDancingPanel'),
// )
import vid1 from '../../assets/videos/battle-allskate.mp4'
// const MeetTeTeachers = React.lazy(
//   () => import('./components/MeetTheTeachersPanel'),
// )
import { MeetTheTeachersPanel } from './components/MeetTheTeachersPanel'
// const LearnToDance = React.lazy(() => import('./components/LearnToDancePanel'))
import { LearnToDancePanel } from './components/LearnToDancePanel'
import { useIsMobile } from '../../shared/hooks/useIsMobile'
import { useInView } from 'react-intersection-observer'
import React from 'react'

const MobileHome = () => {
  const [height] = useWindowSize()

  return (
    <div className='snap-y snap-proximity'>
      <div className=''>
        <Hero />
      </div>
      {/*
      <div className='snap-center snap-proximity'>
        <WhatIsSwingDancingPanel />
      </div> */}

      <Video src={vid1} height={height / 2} />

      {/* <WhatWeDoPanel /> */}

      {/* <LearnToDancePanel /> */}

      {/* <MeetTheTeachersPanel /> */}

      {/* <TestimonialsPanel /> */}
    </div>
  )
}

const Home = () => {
  const inView = useInView()
  const isMobile = useIsMobile()
  const [height] = useWindowSize()

  return (
    <div className=''>
      <div className=''>
        <Hero />
      </div>

      <div className=''>
        <WhatIsSwingDancingPanel />
      </div>

      {/* <Video src={vid1} height={height * 0.8} /> */}

      {/* <WhatWeDoPanel /> */}

      {/* <TestimonialsPanel /> */}

      <LearnToDancePanel />

      <MeetTheTeachersPanel />
    </div>
  )
}

export default Home
