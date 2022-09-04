import { z } from 'zod'

export const validateSocialDance = z.object({
  name: z.string(),
  description: z.string(),
  start: z.string().transform((d) => new Date(d)),
  end: z.string().transform((d) => new Date(d)),
  recurrence: z.string().optional(),
  location: z.string(),
  stripeProductId: z.number()
})

export interface SocialDancePayload
  extends z.infer<typeof validateSocialDance> {
  name: string
  description: string
  start: Date
  end: Date
  location: string
  stripeProductId: number
}
