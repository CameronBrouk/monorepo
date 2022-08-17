// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { getCrud, useFirestore } from 'src/firebase/firestore'
// import { Button, SubmitButton } from 'src/shared/components/Button'
// import { Input } from 'src/shared/components/Form'
// import FormModal from 'src/shared/components/Modal/FormModal'
// import { Task } from 'vitest'
import { Goal } from '../models'

interface GoalFormProps {
  goal?: Goal
}
export default function GoalForm(props: GoalFormProps) {
  // const form = useForm<any>()
  // const [loading, setLoading] = useState(false)
  // const [tasks, setTasks] = useState<Task[]>([])
  // const { create: createGoal, createId } = getCrud('goals')
  // const { createWithId: createOption } = getCrud('options')

  // type FormData = Omit<Goal, 'id' | 'options'>
  // const onSubmit = async ({ name }: FormData) => {
  //   const goalId = await createId()
  //   console.log('test 1')
  //   setLoading(true)

  //   createGoal(goalId, { name })

  //   createOption({
  //     goalId,
  //     name: 'MVP',
  //     devs: [{ name: 'Ryan', hourlyRate: 80 }],
  //   })

  //   createOption({
  //     goalId,
  //     name: 'Preferred',
  //     devs: [{ name: 'Cameron', hourlyRate: 80 }],
  //   })

  //   createOption({
  //     goalId,
  //     name: 'Polished',
  //     devs: [{ name: 'Cameron', hourlyRate: 80 }],
  //   })

  //   console.log('test 2')
  //   setLoading(false)
  // }

  // console.log(form.formState.isSubmitting)

  return (
    <div>
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className='flex'>
        <Input form={form} name='name' label='Goal' required />
      </form>
      <SubmitButton
        variant='raised'
        className='mt-8 bg-green-200 text-green-800'
        isSubmitting={loading}>
        Create Goal
      </SubmitButton> */}
    </div>
  )
}
