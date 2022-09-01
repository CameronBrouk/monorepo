import { z } from 'zod'

export type GroupClassPayload = z.infer<typeof validateGroupClass>
export const validateGroupClass = z.object({
  start: z.string().transform((d) => new Date(d)),
  end: z.string().transform((d) => new Date(d)),
  recurrence: z.string().optional(),
  description: z.string(),
  name: z.string(),
  location: z.string(),
  danceType: z.string(),
  difficultyLevel: z.string(),
  stripeProductId: z.number(),
  requiredMoveIds: z.array(z.number()).optional(),
  taughtMoveIds: z.array(z.number()).optional(),
  teacherIds: z.array(z.number()).optional(),
  assetIds: z.array(z.number()).optional()
})
