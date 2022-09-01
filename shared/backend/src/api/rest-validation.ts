import { Request, Response } from 'express'
import { z, ZodObject } from 'zod'
import { zodValidateQuery } from './handle-query-params.js'
import {
  badRequestBody,
  badRequestParams,
  getZodError
} from './error-handling.js'

const zodValidateUrlLength = z.string().max(2048).optional()

// const zodValidateQueryLength = z.string().max(1024).optional()

const zodValidateIdParam = z
  .object({
    id: z.string()
  })
  .optional()

const hasValidQueryId = (req: Request, res: Response) => {
  const validation = zodValidateIdParam.safeParse(req.params)
  if (validation.success) return true
  res.status(400).json(getZodError(validation.error))
  return false
}

const hasValidQueryParams = (req: Request, res: Response) => {
  const validation = zodValidateQuery.safeParse(req.query)
  if (validation.success) return true
  res.status(400).json(badRequestParams)
  return false
}

// const hasValidatedQueryLength = (req: Request, res: Response) => {
//   console.log(req.query)
//   const validation = zodValidateQueryLength.safeParse(req.query)
//   if (validation.success) return true
//   const error = {
//     ...getZodError(validation.error),
//     title: 'Request Query Issues',
//     message: 'Request query was too long. It must be under 1024 characters.'
//   }
//   res.status(400).json(error)
//   return false
// }

const hasValidatedUrlLength = (req: Request, res: Response) => {
  const validation = zodValidateUrlLength.safeParse(req.url)
  if (validation.success) return true
  const error = {
    ...getZodError(validation.error),
    title: 'Request Query Issues',
    message: 'URL was too long.  It must be under 2048 characters'
  }
  res.status(400).json(error)
  return false
}

export const hasValidBody = (
  req: Request,
  res: Response,
  zodValidator?: ZodObject<any>
) => {
  if (!zodValidator) return true
  const validation = zodValidator.safeParse(req.body)
  if (validation.success) return true
  const error = {
    ...badRequestBody,
    meta: validation.error
  }
  res.status(400).json(error)
  return false
}

export const hasValidIdQuery = (req: Request, res: Response) => {
  // if (!hasValidatedQueryLength(req, res)) return false
  if (!hasValidatedUrlLength(req, res)) return false
  if (!hasValidQueryId(req, res)) return false
  return true
}

export const hasValidPaginationQuery = (req: Request, res: Response) => {
  // if (!hasValidatedQueryLength(req, res)) return false
  // if (!hasValidatedUrlLength(req, res)) return false
  if (!hasValidQueryParams(req, res)) return false
  return true
}

export const handleSuccess = (res: Response) => (dbResponse: any) =>
  res.status(200).json(dbResponse)
