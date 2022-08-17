import img from '../../../assets/images/lhsl-home-cover.jpg'
import { Swiper } from '../../../shared/components/Swiper/Swiper'
import Tabs from '../../../shared/components/Tabs/Tabs'
import MediaActionCard from '../../../shared/components/Cards/MediaActionCard'

export const WhatWeDoPanel = () => {
  return (
    <section className='max-w-5xl sm:w-full py-4 mx-auto sm:my-10'>
      <h2 className='text-3xl font-extrabold tracking-tight text-center text-gray-800 md:text-4xl lg:text-5xl'>
        What We Do
      </h2>
      <p className='text-center text-gray-800 text-sm mt-1'>
        Live Music, Classes, Social Events
      </p>

      <Tabs>
        <Tabs.Tab title='Classes'>
          <p className='text-center p-4'>
            We have classes for all experience levels. Come with friends, your
            partner, or just yourself.
          </p>
          <Swiper>
            <MediaActionCard
              title='Swing'
              description='High energy, exciting, joyous. Having fun is the most important aspect of Swing dancing.'
              buttonText='Learn More'
              onClick={() => {}}
              src={img}
            />
            <MediaActionCard
              title='Solo Jazz'
              description='Creativity, Big Moves, Excitement.  Swing dancing without a partner.'
              buttonText=' Learn More '
              onClick={() => {}}
              src={img}
            />
            <MediaActionCard
              title='Blues'
              description='Expression, Slow, Smooth. '
              buttonText=' Learn More '
              onClick={() => {}}
              src={img}
            />
            <MediaActionCard
              title='Balboa'
              description='Starting Swing, Continuing Swing, and Blues'
              buttonText=' Learn More '
              onClick={() => {}}
              src={img}
            />
            <MediaActionCard
              title='Bachata'
              description='Sexy'
              buttonText=' Learn More '
              onClick={() => {}}
              src={img}
            />
          </Swiper>
        </Tabs.Tab>
        <Tabs.Tab title='Events'>
          <p className='text-center p-4'>
            Meet new people, have a great time, learn a new hobby while you're
            at it.
          </p>
          <Swiper>
            <MediaActionCard
              title='First Friday Swing'
              description='No-experience-required lesson, 7-piece band, performances, and drinks. Prime STL Swing.'
              buttonText=' Learn More '
              onClick={() => {}}
              src={img}
            />

            <MediaActionCard
              title='Live Music Wednesdays'
              description='Bi Weekly Social Event. Drinks, Music, Dancing and community.'
              buttonText=' Learn More '
              onClick={() => {}}
              src={img}
            />

            <MediaActionCard
              title='Classic Swing Night'
              description='A swing dance with Music played from Count Basie, Ella Fitzgerald, and our favorites from the 1920-40s'
              buttonText=' Learn More '
              onClick={() => {}}
              src={img}
            />

            <MediaActionCard
              title='Modern Swing Night'
              description='A swing dance with music played from our favorite modern swing bands'
              buttonText=' Learn More '
              onClick={() => {}}
              src={img}
            />
          </Swiper>
        </Tabs.Tab>
      </Tabs>
    </section>
  )
}

export default WhatWeDoPanel
