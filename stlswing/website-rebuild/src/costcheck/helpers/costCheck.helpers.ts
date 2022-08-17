import { timeUntil } from 'src/shared/utils'
import { Task, Option, Goal, Dev } from '../models'

// export const addTime = (prevTime: Date, task: Task) => {
//   const deadline = addDays(
//     prevTime,
//     timeUntil(task.timeline).days || 0,
//   ).getSeconds()

//   pipe(multiply(task.certainty))(deadline)
// }

export const getDevCost = (timeline: Date, devs: Dev[]) =>
  devs.reduce((total, dev) => {
    const addedCost = (timeUntil(timeline).hours || 0) * dev.hourlyRate
    return total + addedCost
  }, 0)

export const getGoalOptions = (goal: Goal, options: Option[]) =>
  options.filter((option) => option.id === goal.id)

export const getOptionTasks = (option: Option, tasks: Task[]) =>
  tasks.filter((task) => task.id === option.id)
