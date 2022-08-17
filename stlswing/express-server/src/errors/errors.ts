import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError
} from '@prisma/client/runtime'
import { Response } from 'express'

export const handleError = (res: Response) => (e: any) => {
  res.send(500)
  if (e?.message) res.send(e?.message)
  if (typeof e === 'string') res.send(e)
  res.send(`An unkown error occured: ${e}`)
  return e
}

export type PrismaError = {
  code: number
  message: string
  meta: any
}
export const handlePrismaErrors = <T>(e: T): PrismaError => {
  if (typeof e === 'string') {
    return {
      code: 500,
      message: e,
      meta: {
        message: e
      }
    }
  }
  if (e instanceof PrismaClientValidationError) {
    return {
      code: 500,
      message: e.message,
      meta: e
    }
  }

  if (e instanceof PrismaClientKnownRequestError) {
    return {
      code: 500,
      message: e.message,
      meta: e
    }
  }

  if (e instanceof PrismaClientInitializationError) {
    return {
      code: 500,
      message: e.message,
      meta: e
    }
  }

  if (e instanceof PrismaClientRustPanicError) {
    return {
      code: 500,
      message: e.message,
      meta: e
    }
  }

  if (e instanceof PrismaClientUnknownRequestError) {
    return {
      code: 500,
      message: e.message,
      meta: e
    }
  }

  return {
    code: 500,
    message: 'An unkown error occured',
    meta: {
      message: 'An unkown error occured'
    }
  }
}
