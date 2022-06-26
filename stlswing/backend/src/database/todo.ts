import { z } from 'zod'

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
  return new Date()
}, z.date())

export const defaults = z.object({
  id: z.string().uuid(),
  createdAt: dateSchema,
  updatedAt: dateSchema,
  createdBy: z.optional(z.string().uuid()),
  updatedBy: z.optional(z.string().uuid()),
  draft: z.optional(z.boolean())
})

export const makeEmptyError = (name: string) => ({
  invalid_type_error: `please make sure that ${name} is a string`,
  required_error: `please include ${name}`,
  message: `${name} is required`
})

export const todo = {
  deadline: dateSchema.optional(),
  title: z.string().min(1, makeEmptyError('name'))
}
