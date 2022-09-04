import { TableDefaults } from '@unimpaired/interfaces'
import { z, ZodObject } from 'zod'
import { Request, Response } from 'express'
import { omit } from 'ramda'
import { logLine } from '../logging/logging.js'

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
    res.status(500)
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
  res.status(500).send(`An unkown error occured: ${e}`)
  return e
}

export const handleSuccess =
  (res: Response) => (data: any, onComplete?: () => void) => {
    if (typeof res === 'object') res.json(data)
    onComplete && onComplete()
    return data
  }

export const zodValidateCursor = z
  .object({
    cursor: z.number(),
    skip: z.number(),
    sortProp: z.string().min(1)
  })
  .strict()

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
  if (!queryValidation.success && 'error' in queryValidation)
    res.status(400).json(queryValidation.error)
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

  return true
}

export const validateReqestBody = (
  req: Request<any>,
  res: Response<any>,
  zod: ZodObject<any>
) => {
  // If a zod object is not given,
  const validated = zod.strict().safeParse(req.body)
  if (!validated.success && 'error' in validated) {
    res.status(400).json(validated.error.issues)
    return false
  }
  return true
}

export const QueryParams = z
  .object({
    searchProp: z.string().min(1),
    searchTerm: z.string(),
    skip: z.string().transform((val) => Number(val)),
    take: z.string().transform((val) => Number(val)),
    sortDirection: z.enum(['ASC', 'DESC']).default('ASC'),
    sortProp: z.string().min(1)
  })
  .partial()
  .strict()

export type QueryParams = z.TypeOf<typeof QueryParams>

const DEFAULT_PAGE_SIZE = 10

export const getPageOffset = (page?: number, pageSize?: number) => {
  const take = pageSize || DEFAULT_PAGE_SIZE
  return page ? page * take - take : 0
}

export const getPrismaQueryParamFilters = (
  query: z.infer<typeof isValidQuery>
) => {
  if (!query) return null
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

type RemovePromise<T> = T extends Promise<infer U> ? U : never
type Func = (...params: any[]) => any

type Dict = Record<string, any>
type ListFunc = <ResponseData extends Dict>(
  queryParams: QueryParams
) => Promise<{ count: number; page: number; data: ResponseData }>
type QueryFunc = <T extends Dict>(
  queryParams: QueryParams,
  where: T
) => Promise<{ count: number; page: number; data: any }>
type GetFunc = <T extends Dict>(
  id: number
) => Promise<{ count: number; page: number; data: T }>
type CreateOneFunc = <T extends Dict, V extends Dict>(body: T) => Promise<V>
type CreateManyFunc = <T extends Dict, V extends Dict>(body: T) => Promise<V>
type DeleteFunc = (id: number) => Promise<boolean>
type DeleteManyFunc = (id: number[]) => Promise<boolean>
type UpdateFunc = <T extends Dict, V extends Dict>(
  id: number,
  body: T
) => Promise<V>
type UpdateManyFunc = <T extends Dict, V extends Dict>(
  ids: number[],
  body: T
) => Promise<V[]>
type MultiplyFunc = <V extends Dict>(id: number, times: number) => V[]
type DuplicateFunc = <V extends Dict>(id: number) => V

type API = {
  LIST?: { [key: string]: ListFunc }
  QUERY?: { [key: string]: QueryFunc }
  GET_SINGLE?: { [key: string]: GetFunc }
  CREATE?: { [key: string]: CreateOneFunc }
  CREATE_MANY?: { [key: string]: CreateManyFunc }
  DELETE?: { [key: string]: DeleteFunc }
  DELETE_MANY?: { [key: string]: DeleteManyFunc }
  UPDATE?: { [key: string]: UpdateFunc }
  UPDATE_MANY?: { [key: string]: UpdateManyFunc }
  MULTIPLY?: { [key: string]: MultiplyFunc }
  DUPLICATE?: { [key: string]: DuplicateFunc }
}

export type GetApiTypes<T extends API> = {
  [Request in keyof T]: {
    [Operation in keyof T[Request]]: [
      request: Parameters<
        T[Request][Operation] extends Func ? T[Request][Operation] : never
      >[0],
      response: RemovePromise<
        ReturnType<
          T[Request][Operation] extends Func ? T[Request][Operation] : never
        >
      >
    ]
  }
}

// const getRequestValidators = <
//   Z extends ZodObject<any>,
//   Fn extends Promise<any>
// >(
//   dto: Z
// ) => {
//   const isValidGetAll = (req: Request, res: Response) => {
//     if (validateRequestQuery(req, res)) return true
//     return false
//   }

//   const isValidGetSingle = (req: Request, res: Response) => {
//     if (validateQueryStringLength(req, res)) return true
//     if (validateParamId(req, res)) return true
//     return false
//   }

//   const isValidQuery = (req: Request, res: Response) => {
//     if (validateQueryStringLength(req, res)) return true
//     if (validateRequestQuery(req, res)) return true
//     return false
//   }

//   const isValidCreateOne = (req: Request, res: Response) => {
//     if (validateReqestBody(req, res, dto)) return true
//     return false
//   }

//   const isValidUpdateOne = (req: Request, res: Response) => {
//     if (validateReqestBody(req, res, dto.partial())) return true
//     return false
//   }
// }
