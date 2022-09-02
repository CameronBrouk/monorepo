import { Request, Response } from 'express'
import { ZodObject } from 'zod'
import { QueryParams } from '../api/handle-query-params.js'
import {
  hasValidBody,
  hasValidIdQuery,
  hasValidPaginationQuery
} from '../api/rest-validation.js'
import { handlePrismaErrors } from '../api/error-handling.js'
import { handleSuccess } from './crud.helpers.js'

export const getList =
  (
    prismaFindMany: (params: QueryParams, body: any) => Promise<any[]>,
    zodValidator?: ZodObject<any>
  ) =>
  (req: Request, res: Response) => {
    if (!hasValidPaginationQuery(req, res)) return
    if (!hasValidBody(req, res, zodValidator)) return

    prismaFindMany(req.query, req.body)
      .then(handleSuccess(res))
      .catch(handlePrismaErrors(req, res))
  }

export const getSingle =
  <T>(prismaFindFirst: (id: number) => Promise<T>) =>
  (req: Request, res: Response) => {
    if (!hasValidIdQuery(req, res)) return

    prismaFindFirst(Number(req.params.id))
      .then(handleSuccess(res))
      .catch(handlePrismaErrors(req, res))
  }

export const createOne =
  <Body, R>(
    prismaCreate: (body: Body) => Promise<R>,
    zodValidator: ZodObject<any>
  ) =>
  (req: Request, res: Response) => {
    if (!hasValidBody(req, res, zodValidator)) return

    prismaCreate(req.body)
      .then(handleSuccess(res))
      .catch(handlePrismaErrors(req, res))
  }

type Dict = Record<string, any>
export const updateOne =
  (
    prismaUpdate: <Body extends Dict>(id: number, body: Body) => Promise<Dict>,
    zodValidator: ZodObject<any>
  ) =>
  (req: Request, res: Response) => {
    if (!hasValidIdQuery(req, res)) return
    if (!hasValidBody(req, res, zodValidator.partial())) return
    prismaUpdate(Number(req.params.id), req.body)
      .then(handleSuccess(res))
      .catch(handlePrismaErrors(req, res))
  }
