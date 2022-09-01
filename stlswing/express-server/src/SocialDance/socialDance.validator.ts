import { z } from 'zod'

export type SocialDancePayload = z.infer<typeof validateSocialDance>
export const validateSocialDance = z.object({
  name: z.string(),
  description: z.string(),
  start: z.string().transform((d) => new Date(d)),
  end: z.string().transform((d) => new Date(d)),
  recurrence: z.string().optional(),
  location: z.string(),
  stripeProductId: z.number()
})
