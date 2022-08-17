import React from 'react'
import { Story } from '@ladle/react'
import { wait } from '@fp-unimpaired/utils'
import { useEffect, useState } from 'react'

import { times } from 'ramda'
import { useForm } from 'react-hook-form'
import { Option, Select } from '../components'

export const Basic: Story<any> = (controls) => {
  const form = useForm()
  return (
    <form onSubmit={form.handleSubmit(console.log)} className='w-1/2'>
      <Select
        name='number'
        label='Number Select'
        defaultValues={[1]}
        required
        {...controls}
      >
        <Option label='1' value={1} />
        <Option label='2' value={2} />
        <Option label='3' value={3} />
      </Select>
    </form>
  )
}

export const Searchable: Story<any> = (controls) => {
  const form = useForm()
  return (
    <form onSubmit={form.handleSubmit(console.log)} className='w-1/2'>
      <Select
        name='number'
        label='Number Select'
        search
        defaultValues={[1]}
        required
      >
        <Option label='1' value={1} />
        <Option label='2' value={2} />
        <Option label='3' value={3} />
      </Select>
    </form>
  )
}

export const NoLabel: Story<any> = (controls) => {
  const form = useForm()
  return (
    <form onSubmit={form.handleSubmit(console.log)} className='w-1/2'>
      <Select
        noLabel
        name='number'
        label='Number Select'
        search
        defaultValues={[1]}
        required
      >
        <Option label='1' value={1} />
        <Option label='2' value={2} />
        <Option label='3' value={3} />
      </Select>
    </form>
  )
}

export const MultiSelect: Story<any> = (controls) => {
  const form = useForm()
  return (
    <form onSubmit={form.handleSubmit(console.log)} className='w-1/2'>
      <Select
        name='number'
        label='Number Select'
        multiple
        defaultValues={[1]}
        required
      >
        <Option label='1' role='checkbox' value={1} />
        <Option label='2' value={2} />
        <Option label='3' value={3} />
      </Select>
    </form>
  )
}

export const CustomOption: Story<any> = (controls) => {
  const form = useForm()
  return (
    <form onSubmit={form.handleSubmit(console.log)} className='w-1/2'>
      <Select
        name='number'
        label='Number Select'
        multiple
        defaultValues={[1]}
        required
      >
        <Option label='Cameron' value={1}>
          <p className='text-xs text-gray-500'>cameronbrouk@gmail.com</p>
        </Option>
        <Option label='Brandon' value={2}>
          <p className='text-xs text-gray-500'>brandonbrouk@gmail.com</p>
        </Option>
        <Option label='Dad' value={3}>
          <p className='text-xs text-gray-500'>dadbrouk@gmail.com</p>
        </Option>
      </Select>
    </form>
  )
}

export const async: Story<any> = (controls) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    wait(500).then(() => {
      setData(times((i) => i, 200))
    })
  }, [])

  const form = useForm()
  return (
    <form onSubmit={form.handleSubmit(console.log)} className='w-1/2'>
      <Select
        name='number'
        label='Number Select'
        multiple
        defaultValues={[1]}
        required
      >
        {data.map((n) => (
          <Option label={n} key={n} value={n} />
        ))}
      </Select>
    </form>
  )
}

const selectArgs = {
  multiple: false,
  search: false
}

Basic.args = selectArgs
