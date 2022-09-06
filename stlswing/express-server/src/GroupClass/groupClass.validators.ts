import { GroupClass } from '@prisma/client'
import { z } from 'zod'

export const validateGroupClass = z.object({
  start: z.date(),
  end: z.date(),
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

// Note:  the recurrence property is how you define if a class has multiple dates
export interface GroupClassPayload extends z.infer<typeof validateGroupClass> {
  start: Date // The time the dance starts
  end: Date // The time the class ends
  description: string
  name: string
  location: string
  danceType: string
  difficultyLevel: string
  stripeProductId: number
}
