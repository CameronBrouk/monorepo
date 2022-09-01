import { transformDanceMoveIds } from '../groupClass.helpers.js'
import { prisma } from '../../index.js'
import { GroupClassPayload } from '../groupClass.validators.js'

export const updateGroupClass = async (
  id: number,
  body: Partial<GroupClassPayload>
) => {
  const {
    requiredMoveIds,
    taughtMoveIds,
    assetIds,
    teacherIds,
    stripeProductId,
    ...data
  } = body

  const newTeachers = body.teacherIds?.map((teacherId) => ({
    teacherId_groupClassId: {
      groupClassId: id,
      teacherId
    }
  }))

  const groupClass = await prisma.groupClass.update({
    where: { id },
    data: {
      ...data,
      teachers: { set: newTeachers },
      danceMoves: {
        createMany: {
          data: [
            ...transformDanceMoveIds('Required', requiredMoveIds),
            ...transformDanceMoveIds('Taught', taughtMoveIds)
          ]
        }
      }
    },
    include: {
      teachers: { include: { teacher: true } },
      danceMoves: { include: { danceMove: true } }
    }
  })

  return groupClass
}
