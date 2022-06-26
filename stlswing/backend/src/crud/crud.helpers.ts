import { TableDefaults } from '@stlswing/interfaces'
import { z, ZodObject } from 'zod'
import { Request, Response } from 'express'
import { omit } from 'lodash/fp'
import { logLine } from '../logging/logging'

export const omitDefaults = omit([
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
  'draft',
  'deleted'
])
export const changeDefaults = <T extends TableDefaults>(data: T) => ({
  ...data,
  id: data.id.slice(0, 6) + '...',
  createdBy: data.createdBy?.toString()?.slice(0, 6) + '...',
  updatedBy: data.createdBy?.toString()?.slice(0, 6) + '...',
  createdAt: data.createdAt.toString(),
  updatedAt: data.createdBy?.toString()
})

export const isValidId = (id?: Request['query']['id']): id is string => {
  if (!id) {
    console.log('INVALID ID: undefined')
    return false
  }
  if (typeof id !== 'string') {
    console.log('INVALID ID: Not a string')
  }
  return true
}

export const handleError = (res: Response) => (e: any) => {
  if (e?.message) {
    logLine('error')
    console.log(e)
    logLine('end error')
    res.sendStatus(500)
    return e
  }
  if (typeof e === 'object') {
    console.log('OBJECT')
    res.status(500)
    return e
  }
  if (typeof e === 'string') {
    console.log('STRING')
    res.status(500)
    return e
  }
  res.sendStatus(500).send(`An unkown error occured: ${e}`)
  return e
}

export const handleSuccess =
  (res: Response) => (data: any, onComplete?: () => void) => {
    if (typeof res === 'object') res.json(data)
    onComplete && onComplete()
    return data
  }

export const isValidCursor = z.object({
  cursor: z.number(),
  skip: z.number(),
  sortBy: z.string().min(1)
})

export const isValidQuery = z
  .object({
    searchBy: z.string().min(1).optional(),
    searchTerm: z.string().optional(),
    cursor: z.string().optional(),
    skip: z.string().optional(),
    take: z.string().optional(),
    sortType: z.enum(['asc', 'desc']).optional(),
    sortBy: z.string().min(1).optional()
  })
  .partial()
  .strict()

export type ResponseQuery = z.infer<typeof isValidQuery>

export const isValidParamId = z.object({ id: z.string() })

export const validateRequestQuery = (req: Request, res: Response) => {
  const queryValidation = isValidQuery.safeParse(req.query)
  if (!queryValidation.success) res.status(400).json(queryValidation.error)
  return queryValidation.success
}

export const validateParamId = (req: Request, res: Response) => {
  const paramValidation = isValidParamId.safeParse(req.params)
  if (!paramValidation.success) res.status(400).send('No ID found in Query')
  return paramValidation.success
}

//https://stackoverflow.com/questions/812925/what-is-the-maximum-possible-length-of-a-query-string
export const validateQueryStringLength = (req: Request, res: Response) => {
  if (req.url.length > 2048) {
    res.status(400).send('URL was too long.  It must be under 2048 characters')
    return false
  }
  if (Object.values(req.query).join('&').length > 1024) {
    res
      .status(400)
      .send('Request query was too long. It must be under 1024 characters.')
    return false
  }

  if (req.url.length > 100) console.warn('Request greater than 100 characters.')

  return true
}

export const validateReqestBody = (
  req: Request<any>,
  res: Response<any>,
  zod: ZodObject<any>
) => {
  // If a zod object is not given,
  const validated = zod.strict().safeParse(req.body)
  if (!validated.success) {
    res.status(400).json(validated.error.issues)
    return false
  }
  return true
}

export const getPrismaQueryParamFilters = (
  query: z.infer<typeof isValidQuery>
) => {
  if (!query) return
  const take = !query.take ? {} : { take: Number(query.take) }
  const skip = !query.skip ? {} : { skip: Number(query.skip) }
  const orderBy =
    !query.sortBy && !query.sortType
      ? {}
      : { orderBy: { [`${query.sortBy}`]: query.sortType } }

  const search =
    !query.searchTerm && !query.searchBy
      ? {}
      : {
          where: {
            [`${query.searchBy}`]: {
              contains: query.searchTerm,
              mode: 'insensitive'
            }
          }
        }

  const cursor =
    !query.cursor || !query.sortType
      ? {}
      : {
          cursor: {
            id: Number(query.cursor)
          }
        }

  const queryObject = {
    ...take,
    ...skip,
    ...orderBy,
    ...cursor,
    ...search
  }

  return queryObject
}
