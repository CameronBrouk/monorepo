import { prisma } from '../../index.js'
import { SocialDancePayload } from '../socialDance.validator.js'

export const updateSocialDance = async (
  id: number,
  data: Partial<SocialDancePayload>
) => {
  return prisma.groupClass.update({
    where: { id },
    data,
    include: { attendees: { include: { user: true } } }
  })
}
