import { GroupClass } from '@stlswing/database'
import { getPrismaQueryParamFilters, QueryParams } from '@unimpaired/backend'
import { prisma } from '../../index.js'
import { WhereFilters } from '../../../../../shared/interfaces/lib/prisma.types.js'
import { prop, propEq } from 'ramda'

export const lazyListGroupClasses = async (
  queryParams: QueryParams,
  where?: WhereFilters<GroupClass>
) => {
  const params = getPrismaQueryParamFilters(queryParams)
  return prisma.groupClass.findMany({
    ...params,
    where: {
      ...(params?.where || {}),
      ...(where || {})
    },
    include: {
      _count: {
        select: {
          teachers: true,
          danceMoves: true,
          attendees: true
        }
      }
    }
  })
}

export const eagerListGroupClasses = async (
  queryParams: QueryParams,
  where?: WhereFilters<GroupClass>
) => {
  const params = getPrismaQueryParamFilters(queryParams)
  const groupClasses = await prisma.groupClass.findMany({
    ...params,
    where: {
      ...params?.where,
      ...where
    },
    include: {
      danceMoves: { include: { danceMove: true } },
      teachers: { include: { teacher: true } },
      createdBy: true,
      updatedBy: true,
      attendees: true,
      product: {
        include: {
          orders: {
            include: {
              ticket: true,
              user: true
            }
          }
        }
      },
      _count: {
        select: {
          teachers: true,
          danceMoves: true,
          attendees: true
        }
      }
    }
  })

  return groupClasses.map(({ danceMoves, ...groupClass }) => {
    const requiredMoves = danceMoves
      .filter((move) => move.type === 'Required')
      .map((move) => move.danceMove)
    const movesTaught = danceMoves
      .filter(propEq('type', 'Taught'))
      .map(prop('danceMove'))

    return {
      ...groupClass,
      requiredMoves,
      movesTaught
    }
  })
}
