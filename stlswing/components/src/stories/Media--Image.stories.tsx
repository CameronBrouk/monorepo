import { Story } from '@ladle/react'
import '../../index.css'
import { faker } from '@faker-js/faker'
import { Image } from '../components/Media/Image'
import { range } from 'ramda'

const image = faker.image.image()
export const Basic: Story = (props: any) => {
  return (
    <Image
      src={image}
      overlay={props.overlay}
      blur={props.blur}
      height={400}
      width={300}
      alt='image from faker'
      fit='cover'
    />
  )
}

export const Overlay: Story = (props: any) => {
  return (
    <div className='w-1/2 h-1/2'>
      <Image src={image} overlay alt='image from faker' fit='cover' />
    </div>
  )
}

export const Blur: Story = (props: any) => {
  return (
    <div className='w-1/2 h-1/2'>
      <Image src={image} blur alt='image from faker' fit='cover' />
    </div>
  )
}

export const LazyLoading: Story = (props: any) => {
  return (
    <div className='gap-3 grid grid-cols-3 h-full w-full'>
      {range(0, 20).map((v, i) => (
        <div className='p-4' key={i}>
          <Image
            height={400}
            src={faker.image.image()}
            className='rounded-lg shadow-xl'
            alt='image from faker'
            fit='cover'
          />
        </div>
      ))}
    </div>
  )
}

export const Error: Story = (props: any) => {
  return (
    <div className='w-1/2 h-1/2'>
      <Image src={''} alt='image from faker' fit='cover' />
    </div>
  )
}

export const FlexHeight: Story = (props: any) => {
  return <Image src={image} alt='image from faker' fit='contain' />
}

Basic.args = {
  overlay: false,
  height: undefined,
  blur: false
}
Basic.argTypes = {
  // fit: {
  //   control: { type: 'select' },
  //   options: ['object-cover', 'object-contain'],
  //   defaultValue: 'object-contain'
  // }
}
