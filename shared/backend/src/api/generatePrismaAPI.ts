import { Express } from 'express'
import { ZodObject } from 'zod'
import { paramCase } from 'change-case'
import {
  getList,
  createOne,
  getSingle,
  updateOne
} from '../crud/crud.functions.js'
import { QueryParams } from '../api/handle-query-params.js'

export const generateApi = <T extends API>(
  app: Express,
  tableName: string,
  api: T,
  zodValidator: ZodObject<any>
) => {
  const baseEndpoint = '/' + paramCase(tableName)
  // LIST
  if (typeof api.LIST === 'object') {
    Object.entries(api.LIST).map(([endpoint, prismaFn]) => {
      app.get(endpoint, getList(prismaFn))
    })
  }
  if (typeof api.LIST === 'function')
    app.get(`${baseEndpoint}`, getList(api.LIST))

  // GET
  if (typeof api.GET_SINGLE === 'object') {
    Object.entries(api.GET_SINGLE).map(([endpoint, prismaFn]) => {
      app.get(endpoint, getSingle(prismaFn))
    })
  }
  if (typeof api.GET_SINGLE === 'function')
    app.get(`${baseEndpoint}/:id`, getSingle(api.GET_SINGLE))

  // CREATE / POST
  if (typeof api.CREATE === 'object') {
    Object.entries(api.CREATE).map(([endpoint, prismaFn]) => {
      app.post(endpoint, createOne(prismaFn, zodValidator))
    })
  }
  if (typeof api.CREATE === 'function')
    app.post(`${baseEndpoint}`, createOne(api.CREATE, zodValidator))

  // UPDATE / PATCH
  if (typeof api.UPDATE === 'object') {
    Object.entries(api.UPDATE).map(([endpoint, prismaFn]) => {
      app.patch(endpoint, updateOne(prismaFn, zodValidator))
    })
  }

  if (typeof api.UPDATE === 'function')
    app.patch(`${baseEndpoint}/:id`, updateOne(api.UPDATE, zodValidator))
}

export type API = {
  LIST?: { [key: string]: ListFunc } | ListFunc
  GET_SINGLE?: { [key: `${string}/:id`]: GetFunc } | GetFunc
  CREATE?: { [key: string]: CreateOneFunc } | CreateOneFunc
  UPDATE?: { [key: `${string}/:id`]: UpdateFunc } | UpdateFunc
  DELETE?: { [key: `${string}/:id`]: DeleteFunc } | DeleteFunc
  // QUERY?: { [key: string]: QueryFunc }
  // CREATE_MANY?: { [key: string]: CreateManyFunc }
  // DELETE_MANY?: { [key: string]: DeleteManyFunc }
  // UPDATE_MANY?: { [key: string]: UpdateManyFunc }
  // MULTIPLY?: { [key: string]: MultiplyFunc }
  // DUPLICATE?: { [key: string]: DuplicateFunc }
  // AGGREGATE?: { [key: string]: AggregateFunc }
}

type Dict = Record<string, any>
type ListFunc = (queryParams: QueryParams, where?: Dict) => Promise<any[]>
type GetFunc = (id: number) => Promise<Dict>
type CreateOneFunc = (body: any) => Promise<Dict>
type DeleteFunc = (id: number) => Promise<boolean>
type UpdateFunc = (id: number, body: Dict) => Promise<Dict>
// type QueryFunc = (queryParams: QueryParams, where?: Dict) => Promise<Dict>
// type AggregateFunc = (queryParams: QueryParams, where?: Dict) => any
// type CreateManyFunc = <T extends Dict, V extends Dict>(body: T) => Promise<V>
// type DeleteManyFunc = (id: number[]) => Promise<boolean>
// type UpdateManyFunc = <T extends Dict, V extends Dict>(
//   ids: number[],
//   body: T
// ) => Promise<V[]>
// type MultiplyFunc = <V extends Dict>(id: number, times: number) => V[]
// type DuplicateFunc = <V extends Dict>(id: number) => V

// type RemovePromise<T> = T extends Promise<infer U> ? U : never
// type Func = (...params: any[]) => any
// export type GetApiTypes<T extends API> = {
//   [Request in keyof T]: {
//     [Operation in keyof T[Request]]: [
//       request: Parameters<
//         T[Request][Operation] extends Func ? T[Request][Operation] : never
//       >[0],
//       response: RemovePromise<
//         ReturnType<
//           T[Request][Operation] extends Func ? T[Request][Operation] : never
//         >
//       >
//     ]
//   }
// }

// type RemovePromise<T> = T extends Promise<infer U> ? U : never
// type Func = (...params: any[]) => any
// type API = {
//   GET?: { [key: string]: Func }
//   POST?: { [key: string]: Func }
//   PATCH?: { [key: string]: Func }
//   DELETE?: { [key: string]: Func }
// }

// export type GetApiTypes<T extends API> = {
//   [Request in keyof T]: {
//     [Operation in keyof T[Request]]: [
//       request: Parameters<
//         T[Request][Operation] extends Func ? T[Request][Operation] : never
//       >[0],
//       response: RemovePromise<
//         ReturnType<
//           T[Request][Operation] extends Func ? T[Request][Operation] : never
//         >
//       >
//     ]
//   }
// }
