
export type CostCheckerApi = {
  goals?: Record<string, Goal>
  options?: Record<string, Option>
  tasks?: Record<string, Task>
}

export interface Goal {
  id: string
  name: string
}

export interface Dev {
  name: string
  hourlyRate: number
}

export interface Option {
  id: string
  name: string
  goalId: string
  description?: string
  devs: Dev[]
}

export interface Task {
  id: string

  name: string
  daysRequired: number
  uncertainty: number // certainty is a percentage 10% 50% 100% sure of timeline

  optionId?: string
  goalId: string
  modifiers?: { taskId: string; change: number }[] // if an option includes this taskId, add changePercent to option timeline
  description?: string
}

export const makeMockGoal = (id: number, changes?: Partial<Goal>): Goal => ({
  id: id.toString(),
  name: 'Goal ' + id,
  ...changes
})

export const makeMockOption = (
  id: number,
  changes?: Partial<Option>
): Option => ({
  id: id.toString(),
  goalId: '1',
  devs: [{ name: 'Nate', hourlyRate: 80 }],
  name: 'Option ' + id,
  ...changes
})

export const makeMockTast = (id: number, changes?: Partial<Task>): Task => ({
  id: id.toString(),
  goalId: '1',
  name: 'Task ' + id,
  uncertainty: 1,
  daysRequired: 90,
  optionId: '1',
  ...changes
})
