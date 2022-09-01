import { SocialDance } from '@stlswing/database'
import { getPrismaQueryParamFilters, QueryParams } from '@unimpaired/backend'
import { prisma } from '../../index.js'
import { WhereFilters } from '../../../../../shared/interfaces/lib/prisma.types.js'

export const lazyListSocialDances = async (
  queryParams: QueryParams,
  where?: WhereFilters<SocialDance>
) => {
  const params = getPrismaQueryParamFilters(queryParams)
  return prisma.socialDance.findMany({
    ...params,
    where: {
      ...(params?.where || {}),
      ...(where || {})
    },
    include: {
      _count: {
        select: {
          attendees: true
        }
      }
    }
  })
}

export const eagerListSocialDances = async (
  queryParams: QueryParams,
  where?: WhereFilters<SocialDance>
) => {
  const params = getPrismaQueryParamFilters(queryParams)
  return prisma.socialDance.findMany({
    ...params,
    where: {
      ...params?.where,
      ...where
    },
    include: {
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
      }
    }
  })
}
