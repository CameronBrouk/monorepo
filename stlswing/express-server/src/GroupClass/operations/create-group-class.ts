import { transformDanceMoveIds } from '../groupClass.helpers.js'
import { prisma } from '../../index.js'
import { GroupClassPayload } from '../groupClass.validators.js'

export const createGroupClass = async (payload: GroupClassPayload) => {
  const { requiredMoveIds, assetIds, teacherIds, stripeProductId, ...data } =
    payload
  return prisma.groupClass.create({
    data: {
      ...data,
      teachers: {
        createMany: {
          data: teacherIds?.map((teacherId) => ({ teacherId })) || []
        }
      },
      product: { create: { stripeProductId } },
      danceMoves: {
        createMany: {
          data: [
            ...transformDanceMoveIds('Required', payload.requiredMoveIds),
            ...transformDanceMoveIds('Taught', payload.taughtMoveIds)
          ]
        }
      }
    },
    include: {
      teachers: {
        include: { teacher: true }
      },
      danceMoves: { include: { danceMove: true } }
    }
  })
}
