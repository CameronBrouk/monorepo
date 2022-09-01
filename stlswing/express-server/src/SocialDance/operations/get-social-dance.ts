import { prisma } from '../../index.js'

export const eagerGetSocialDance = (id: number) => {
  return prisma.socialDance.findFirstOrThrow({
    where: { id },
    include: {
      createdBy: true,
      updatedBy: true,
      attendees: { include: { user: true } },
      product: {
        include: {
          orders: { include: { user: true } }
        }
      }
    }
  })
}

export const lazyGetSocialDance = async (id: number) => {
  return prisma.socialDance.findFirstOrThrow({
    where: { id }
  })
}
