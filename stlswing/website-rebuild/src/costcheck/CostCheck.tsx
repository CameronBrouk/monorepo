import { useState } from 'react'
import { useWindowSize } from 'src/shared/hooks/useWindowSize'
import { Goal } from './models'

export default function () {
  const [height, width] = useWindowSize()
  const [selectedGoal, setSelectedGoal] = useState<Goal>()
  // const { list: goals } = useFirestore('goals')
  // const { list: options } = useFirestore('options')
  // const { list: tasks } = useFirestore('tasks')

  // useEffect(() => {
  //   if (!goals) return
  //   setSelectedGoal(goals[0])
  // }, [goals])

  return (
    <div className='min-w-full'>
      {/* <header className='flex items-center justify-center h-[60px] bg-gray-200'>
        <h1 className='p-4'>Cost Check</h1>
      </header>

      <div
        className='p-4 flex w-full border-r'
        style={{
          height: height - 60,
        }}>
        <div className='w-full'>
          <p>Goals</p>
          <div className='p-4'>{goals?.map(prop('name'))}</div>

          <p>Options</p>
          <div className='p-4'>{options?.map(prop('name'))}</div>

          <p>Tasks</p>
          <div className='p-4 flex flex-col'>
            {tasks?.map((task, i) => (
              <Draggable key={task.id}>
                <p>{task.name}</p>
              </Draggable>
            ))}
          </div>
        </div>

        <div className='w-full max-w-3xl border-l pl-2'>
          {!selectedGoal && (
            <>
              <Divider text='Make Goal' />
              <GoalForm />
            </>
          )}

          {selectedGoal && (
            <>
              <Divider text={`Add Task for ${selectedGoal?.name}`} />
              <TaskForm goal={selectedGoal} />
            </>
          )}
        </div>
      </div> */}
    </div>
  )
}

// export const Card = ({ isDragging, text }: any) => {
//   const [{ opacity }, dragRef] = useDrag(
//     () => ({
//       type: 'card',
//       item: { text },
//       collect: (monitor) => ({
//         opacity: monitor.isDragging() ? 0.5 : 1,
//       }),
//     }),
//     [],
//   )
//   return (
//     <div ref={dragRef} style={{ opacity }}>
//       {text}
//     </div>
//   )
// }
