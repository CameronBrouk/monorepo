import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Image, Video } from '../../../shared/components/Media'
import { Modal } from '../../../shared/components/Modal'

export const MeetTheTeachersPanel = () => {
  const [ref, inView] = useInView()
  return (
    <div className='bg-white' ref={ref}>
      <div className='max-w-7xl sm:px-6 lg:px-8 lg:py-24 px-4 py-12 mx-auto'>
        <div className='lg:grid-cols-3 lg:gap-8 grid grid-cols-1 gap-12'>
          <div className='sm:space-y-4 space-y-5'>
            <h2 className='sm:text-4xl text-3xl font-extrabold tracking-tight'>
              Meet Our Teachers
            </h2>
            <p className='text-xl text-gray-500'>
              Our teachers are a band of degenerates who wasted their youth
              learning to dance. They specialize in creating a learning
              environment that's fun, informal, and productive.
            </p>
          </div>
          {inView && (
            <div className='lg:col-span-2'>
              <ul className='sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8 space-y-12'>
                <Teacher
                  name='Cameron Brouk'
                  role='The Addict'
                  img='cameron-face.jpg'
                  vid='images/cam-liz-vid.mp4'
                  exp='8 Years'
                  description={[
                    "At first glance, Cameron is the type of guy that seems friendly, sensible, and fun; the type of guy who you want to be friends with, but sooner or later you realize something is wrong. Most people don't notice, but self-loathing drives his everyday actions-making him an unbearable burden for those close to him.",
                    "Three nights out of the week you can find Cameron on the dance floor, and the other nights he usually just sits by himself at Applebee's Neighborhood Bar & Grill. When he is dancing, Cameron feels true joy. When he is at Applebee's, Cameron shouts loud and hurtful things at families and always ends up getting kicked out. More importantly - I guess - is that Cameron loves Lindy Hop. He wants to teach you how to have fun and be hardcore on the dance floor. By the end of Cameron's classes Cameron usually loses his voice, but will help you find yours."
                  ]}
                />
                <Teacher
                  name='Liz Schwarzkopf'
                  role='The Monster'
                  img='liz-face.jpg'
                  vid='videos/liz-video.mp4'
                  exp='10 Years'
                  description={[
                    "In 2017, professional rock climber Alex Honnold free soloed El Capitan in Yosemite.  To the average person, climbing 3000 feet without safety equipment is an impressive, monumental achievement.  To Liz Schwarzkopf, it's a soft Tuesday afternoon.  Liz eats pathetic weaklings like Alex Honnold for breakfast.  Why?  Because Liz is a monster.  ",
                    "Every full moon, Liz transforms into a Mountain Goat.  She then dashes into the wilderness, performing inhuman feats of fitness.  But when Liz isn't a mountain goat, she has a calm, average, and relatable life.  She likes to start her days with an easy 100-mile sprint, followed by a few hours fighting crime.  She then goes to her day job, where she works in a lab to find a cure for cancer.  Afterward, she goes on long walks with her talking dog.  But while Liz's day-to-day schedule might make her seem uninteresting and boring, she has one trait that eclipses the rest:  Her ability to teach swing dance.  After searching far and wide for a place to teach swing dance, Liz finally decided she fit in best at STL Swing.  Because despite being a were-Mountain Goat with a talking dog, she's still more normal than the rest of the teachers."
                  ]}
                />
                <Teacher
                  name='Christina Cacciatore'
                  role='The Angel'
                  img='christina-face.jpg'
                  vid='videos/josh-video.mp4'
                  exp='10 Years'
                  description={[
                    'Christina had been dancing with Josh for years before joining STL Swing Dance. Their partnership actually started when Josh saved her life after she had an extreme allergic reaction to a piece of avocado toast. She learned how to dance as part of her recovery, stayed away from avocados, and never stopped dancing. Dance has become all she needs in life, she is constantly learning and refining her style. She is happy to be here to share her knowledge with all of her students, and brings something fresh to every class she teaches.'
                  ]}
                />
                <Teacher
                  name='Josh Baumgartner'
                  role='The Jazz Machine'
                  img='josh-face.jpg'
                  vid='videos/josh-video.mp4'
                  exp='10 Years'
                  description={[
                    "You might look at Josh's credentials and think that he teaches out of good intentions.  A four-year degree in education?  Years spent traveling the US to compete and perform?  Is it possible that Josh loves dancing, loves to teach, and wants to combine them at STL Swing Dance?",
                    'Not a chance.',
                    'The real reason Josh teaches at STL Swing dance is to protect his partner, Christina Cacciatore.  He, for whatever reason, believes that our Balboa teacher, Thalia, is out to get her.  While his misplaced paranoia is unfortunate, STL Swing Dance is shamelessly taking advantage of his incredible teaching abilities.  Lucky us!  '
                  ]}
                />
                <Teacher
                  name='Xander Benziger'
                  role='The Man of Memes'
                  img='xander-face.jpg'
                  vid='videos/xander-video.mp4'
                  exp='5 Years'
                  description={[
                    '69 years ago, Xander created an addictive strain of avocados.  He shamelessly sold it on the black market, ruining countless lives.  He created an avocado empire, built upon the shattered dreams of those who became avocaddicted.  Several years and 420 million dollars later, Xander was depressed.  He felt empty.  Xander left his empire and went on a soul-searching journey.  For years he traveled nomadically, living off the land.  At the end of his journey, he found the answer.  Balboa.  This dance gave him true joy.  He wasted no time on the lesser needs such as food, water, or sleep.  With his training plan of 100 push-ups, 100 sit-ups, 100 squats, a 10-kilometer run, and 22 hours of balboa practice, he thrived.  Now, as a 30-year-old man, he has finally emerged to share his knowledge with the world as a teacher at STL Swing Dance.'
                  ]}
                />
                <Teacher
                  name='Thalia Dimitriou'
                  role='The Time Traveler'
                  vid='videos/thalia-video.mp4'
                  img='thalia-face.jpg'
                  exp='5 Years'
                  description={[
                    'In a world where avocado toast is unironically the only thing that everyone eats, the hero of earth, Thalia prepares for her trip to change the past to save the future. Thalia has been training since childhood, deemed humanity’s last hope against the avocadopocalypse. Generations of knowledge of the historic “swing dances” were passed on to her so that she could travel back to before the avocado take over, seek out the one who started this, and defeat them in a solo jazz battle. Thalia has been sent back to 2021 to find this person named “Christina”  who is rumored to be teaching at St Louis Swing. She has come with the skills to save the earth, but will her inevitable battle with Christina be enough to change the course of the future?'
                  ]}
                />
                <Teacher
                  name='Jony Navarro'
                  role='The Mastermind'
                  img='jony-face.jpg'
                  vid='videos/liz-video.mp4'
                  exp='10 Years'
                  description={[
                    'He’s only spoken of in whispers, in the darkest of alleys, amongst the shadiest company that you might find in your local speakeasy. Known only as “Jony”, his reputation on the avocado black market is legendary. People think that Xander is the one who created the worlds most addictive avocados, but only a select few know the truth…Jony planted that idea in Xander’s mind without him realizing. Legend has it that Jony’s solo jazz vocabulary ocean and musical genius mesmerized his opponent in a traditional fight for power; The Solo Jazz Battle. Emerging victorious from his battle and having planted an idea that would make him an avocadollinaire in his competitor, Jony is rumored to have taken up residence in St. Louis. While his real identity remains unknown, reports of a solo jazz god pop up here and there, and they all have one thing in common - he was wearing a pink beanie.'
                  ]}
                />
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Teacher = ({ name, role, img, vid, description, exp }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <li>
      <button
        className='hover:bg-gray-100 p-4 rounded-md cursor-pointer'
        onClick={() => setIsOpen((v) => !v)}
      >
        <div className='lg:space-x-6 flex items-center space-x-4'>
          <div className='overflow-hidden rounded-full w-16 h-16'>
            <Image
              className='rounded-full'
              src={`../../../assets/images/${img}`}
              alt={`${name} Face`}
              fit='cover'
            />
          </div>

          <div className='space-y-1 text-lg font-medium leading-6'>
            <h3 className='text-left text-indigo-600'>{name}</h3>
            <p className='text-left text-gray-500'>{role}</p>
          </div>
        </div>
      </button>
      <Modal
        title={name}
        isOpen={isOpen}
        className='w-screen h-3/4 sm:h-1/2'
        type='bottom-panel'
        onClose={() => setIsOpen(false)}
      >
        <div className='p-2'>
          <Video
            // height='500px'
            // width='500px'
            className='h-96 w-full mt-10'
            src={vid ? vid : 'videos/lindy-vocab-1.mp4'}
          />
          <dl className='flex flex-col justify-between'>
            <div className='divide-y divide-gray-200'>
              <div
                className={`py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className='text-sm font-medium text-gray-500'>
                  Experience
                </dt>
                <dd className='sm:mt-0 sm:col-span-2 mt-1 text-sm text-gray-900'>
                  {exp}
                </dd>
              </div>

              <div
                className={`py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className='text-sm font-medium text-gray-500'>
                  100% True Bio
                </dt>
                <dd className='sm:mt-0 sm:col-span-2 mt-1 text-sm text-gray-900'>
                  {description &&
                    description.map((d: string) => (
                      <div key={d}>
                        <p>{d ? d : ''}</p>
                        <br />
                      </div>
                    ))}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </Modal>
    </li>
  )
}

export default MeetTheTeachersPanel
