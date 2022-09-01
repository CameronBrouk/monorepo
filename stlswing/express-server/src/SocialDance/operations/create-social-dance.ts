import { prisma } from '../../index.js'
import { SocialDancePayload } from '../socialDance.validator.js'

export const createSocialDance = async (payload: SocialDancePayload) => {
  const { stripeProductId, ...eventData } = payload

  return prisma.socialDance.create({
    data: {
      ...eventData,
      product: {
        create: { stripeProductId }
      }
    }
  })
}
