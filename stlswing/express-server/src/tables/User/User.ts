import { z } from 'zod'

export const userPayload = z.object({
  email: z.string().min(1).email(),
  displayName: z.string().trim(),
  phone: z.string().max(10).min(1).optional(),
  photoUrl: z.string().url()
})
