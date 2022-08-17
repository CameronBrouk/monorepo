import TestimonialCard from '../../../shared/components/Cards/TestimonialCard'
import Swiper from '../../../shared/components/Swiper/Swiper'

// const exampleSrc =
//   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
const exampleSrc = 'https://images.unsplash.com/photo-1494790108377-be9c29b2933'

// EXAMPLE IMPLEMENTATION
export const TestimonialsPanel = () => {
  return (
    <section className='bg-gray-200 pb-6 mx-auto pt-6'>
      <h2 className='text-3xl mb-6 font-extrabold tracking-tight text-center text-gray-800 md:text-4xl lg:text-5xl'>
        These people said nice things about us
      </h2>

      <Swiper>
        {testimonials.map((testimonial, i) => (
          <TestimonialCard {...testimonial} key={i} />
        ))}
      </Swiper>
    </section>
  )
}
export default TestimonialsPanel

const JoshTestimonial = {
  image: exampleSrc,
  name: 'Josh Fadaie',
  subTitle: 'Member for 6 months',
  quote:
    "I would crawl through 10 miles of broken glass just to spend 30 seconds at one of STL Swing's events.",
  subDescriptionTitle: 'fun fact',
  subDescription: (
    <>
      Cameron, our CEO, threated to 'Eat Josh's blackened heart' if he did not
      give us a <span className='line-through'>good</span>
      completely unbiased review.
    </>
  )
}

const BezosTestimonial = {
  image: exampleSrc,
  name: 'Jeff Bezos',
  subTitle: 'Member for 1 year',
  quote:
    'I wish STL Swing existed in 1993 so I could have learned to dance instead of wasting my time starting amazon.',
  subDescriptionTitle: 'fun fact',
  subDescription: <>Swing Dancing is more rewarding than 100 billion dollars</>
}
const WaldTestimonial = {
  image: exampleSrc,
  name: 'Wald',
  subTitle: 'Talking dog',
  quote:
    'Bark Bark Bark Bark Bark Bark Bark Bark Bark Bark Bark Bark Bark Bark Bark Bark Bark Bark Bark Bark ',
  subDescriptionTitle: 'fun fact',
  subDescription: (
    <>Wald helps our Swing teacher Liz fight crime on a daily basis</>
  )
}

const testimonials = [BezosTestimonial, JoshTestimonial, WaldTestimonial]
