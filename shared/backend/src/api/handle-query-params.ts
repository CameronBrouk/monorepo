import { z } from 'zod'
export const zodValidateQuery = z
  .object({
    searchProp: z.string().min(1).optional(),
    searchTerm: z.string().optional(),
    cursor: z.string().optional(),
    skip: z
      .string()
      .optional()
      .transform((val) => Number(val)),
    take: z
      .string()
      .optional()
      .transform((val) => Number(val)),
    sortDirection: z.enum(['asc', 'desc']).optional(),
    sortProp: z.string().min(1).optional()
  })
  .partial()
  .strict()

export type QueryParams = z.infer<typeof zodValidateQuery>

const getSkip = (params: QueryParams) => {
  // If there is a cursor, we need to skip 1
  if (!params.skip && params.cursor) return 1
  // If there is a take but no skip, we probably fucked up
  if (!params.skip && params.take) return undefined
  // Otherwise, just return the given skip
  return params.skip
}

export const getPrismaQueryParamFilters = (query: QueryParams) => {
  if (!query) return
  const zodValidated = zodValidateQuery.safeParse(query)
  if (!zodValidated.success) return
  const validatedQuery = zodValidated.data

  const skip = getSkip(validatedQuery)
  const take = !validatedQuery.take ? {} : { take: Number(validatedQuery.take) }
  const orderBy =
    !validatedQuery.sortProp && !validatedQuery.sortDirection
      ? {}
      : {
          orderBy: {
            [`${validatedQuery.sortProp}`]: validatedQuery.sortDirection
          }
        }

  const search =
    !validatedQuery.searchTerm && !validatedQuery.searchProp
      ? {}
      : {
          where: {
            [`${validatedQuery.searchProp}`]: {
              contains: validatedQuery.searchTerm,
              mode: 'insensitive'
            }
          }
        }

  const cursor =
    !query.cursor || !query.sortProp
      ? {}
      : {
          cursor: {
            id: Number(query.cursor)
          }
        }

  const queryObject = {
    ...(skip ? { skip } : {}),
    ...take,
    ...orderBy,
    ...cursor,
    ...search
  }

  return queryObject
}
