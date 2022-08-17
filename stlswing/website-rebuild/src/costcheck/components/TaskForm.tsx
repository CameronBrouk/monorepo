import { useForm } from 'react-hook-form'
// import { doc, getFirestore, setDoc } from 'firebase/firestore'
// import { useState } from 'react'
// import { getCrud, useFirestore } from 'src/firebase/firestore'
// import { firebaseApp } from 'src/firebaseConfig'
// import { Button, SubmitButton } from 'src/shared/components/Button'
// import GoalForm from './GoalForm'
import { Input, Radio, Select, Textarea } from 'src/shared/components/Form'
import { Goal } from '../models'

interface GoalFormProps {
  goal: Goal
}
export default function TaskForm(props: GoalFormProps) {
  const form = useForm<any>()
  // const { createWithId: createTask } = getCrud('tasks')

  type FormData = {
    requirement: string
    time: string
    timeType: 'Weeks' | 'Days' | 'Months'
    uncertainty: string
    description?: string
  }
  const onSubmit = async (data: FormData) => {
    const daysRequired = getDays(data.timeType, data.time)
    const newTask = {
      goalId: props.goal.id,
      daysRequired: Number(daysRequired),
      name: data.requirement,
      uncertainty: Number(data.uncertainty),
      description: data.description
    }
    // await createTask(newTask)
  }

  const getDays = (type: FormData['timeType'], timeValue: string) => {
    const time = Number(timeValue)
    if (type === 'Weeks') return time * 7
    if (type === 'Months') return time * 30
    return time
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input form={form} name='requirement' label='Requirement' required />

      <div className='flex items-center justify-center'>
        <Input form={form} type='number' name='time' label='time' required />
        <Select
          name='timeType'
          form={form}
          label='timeType'
          defaultValues={['Weeks']}
        >
          <Select.Option label={'Weeks'} value='Weeks'></Select.Option>
          <Select.Option label={'Days'} value='Days'></Select.Option>
          <Select.Option label={'Months'} value='Months'></Select.Option>
        </Select>
      </div>

      <Radio
        required
        defaultValue={1.3}
        form={form}
        label='How Certain are you of this deadline?'
        name='uncertainty'
        options={[
          { name: 'lol IDK', value: 1.6 },
          { name: '...Pretty sure?', value: 1.3 },
          { name: 'No Doubt', value: 1.05 }
        ]}
      ></Radio>

      <Textarea form={form} name='description' label='description' />

      <input type='submit' value='submit' />
    </form>
  )
}
