import { GroupClass } from '@prisma/client'
import { getPrismaQueryParamFilters, QueryParams } from '@unimpaired/backend'
import { prisma } from '../../index.js'
import { prop, propEq } from 'ramda'
import { WhereFilters } from '@unimpaired/interfaces'

export const lazyListGroupClasses = async (
  queryParams: QueryParams,
  filters?: WhereFilters<GroupClass>
) => {
  const { where, cursor, orderBy, skip, take } =
    getPrismaQueryParamFilters(queryParams)
  return prisma.groupClass.findMany({
    cursor,
    orderBy,
    skip,
    take,
    where: {
      ...where,
      ...filters
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
  filters?: WhereFilters<GroupClass>
) => {
  const { where, cursor, orderBy, skip, take } =
    getPrismaQueryParamFilters(queryParams)
  const groupClasses = await prisma.groupClass.findMany({
    cursor,
    orderBy,
    skip,
    take,
    where: {
      ...filters,
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
