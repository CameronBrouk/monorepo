// @ts-ignore
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { ZodError } from 'zod'

export type ErrorLevel =
  | 'Database'
  | 'Permissions'
  | 'Network'
  | 'Client Request'
  | 'Server'

export type ErrorResponse = {
  status: number
  level: ErrorLevel
  title: string
  description?: string
  message: string
  meta?: any
}

export const getZodError = (zodError: ZodError) => ({
  ...badRequestBody,
  meta: zodError
})

export const badRequestBody = {
  status: 400,
  level: 'Client Request',
  title: 'Request Body Incorrect',
  message:
    'The information provided had errors, please edit the information and try again.'
}

export const badRequestParams = {
  status: 400,
  level: 'Client Request',
  title: 'Request Query Params Incorrect',
  description:
    'Information sent in the request Query Params did not match our specifications'
}

export const unauthorized = {
  status: 401,
  level: 'Permissions',
  title: 'Account Required',
  description:
    'The request did not provide a suitable authorization header field',
  message: 'Please login or create an account'
}

export const forbidden = {
  status: 403,
  level: 'Permissions',
  title: 'Insufficient Permissions',
  description: 'Your user account does not contain the required permissions',
  message: 'Your account is missing permissions'
}

export const notFound = {
  status: 404,
  title: 'Not Found',
  description: 'The server cannot find the requested resource',
  message: `We cannot find the item you are looking for`
}

export const handlePrismaErrors =
  (req: Request, res: Response) =>
  <T extends Record<string, any>>(e: T) => {
    const error = {
      code: 500,
      title: 'Database',
      description:
        'An error occured when the Prisma ORM attempted to modify the database',
      message: 'A prisma error occured',
      meta: {
        previousRequest: req.body,
        ...e
      }
    }
    const modifyError = (message: string, desc?: string) => {
      res.status(500).json({
        ...error,
        query: req.query,
        body: req.body,
        params: req.params,
        description: desc || error.description,
        message
      })
    }

    if (
      e instanceof Prisma.PrismaClientValidationError ||
      e instanceof Prisma.PrismaClientKnownRequestError ||
      e instanceof Prisma.PrismaClientInitializationError ||
      e instanceof Prisma.PrismaClientRustPanicError ||
      e instanceof Prisma.PrismaClientUnknownRequestError
    ) {
      if (e instanceof Prisma.PrismaClientUnknownRequestError)
        modifyError(
          e.message.split('\n').join(' '),
          'Prisma Client Unkown Request'
        )

      if (e instanceof Prisma.PrismaClientKnownRequestError)
        modifyError(
          e.message.split('\n').join(' '),
          'Prisma Client Known Request'
        )

      if (e instanceof Prisma.PrismaClientInitializationError)
        modifyError(e.message, 'Prisma Client Initializiation')

      if (e instanceof Prisma.PrismaClientRustPanicError)
        modifyError(e.message, 'Prisma Client Rust Panic')

      if (e instanceof Prisma.PrismaClientValidationError)
        modifyError(
          e.message.split('\n').join(' ').replace(/{.*}/, '').trim(),
          'Prisma Client Validation Error'
        )
    }

    if (e.name === 'NotFoundError') {
      modifyError(
        'Could Not Find The Item you requested in our database',
        'Prisma NotFoundError'
      )
    }
  }
