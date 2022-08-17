// import {
//   PrismaClientInitializationError,
//   PrismaClientKnownRequestError,
//   PrismaClientRustPanicError,
//   PrismaClientUnknownRequestError,
//   PrismaClientValidationError
// } from '@prisma/client/runtime'

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

  // if (
  //   e instanceof PrismaClientValidationError ||
  //   e instanceof PrismaClientKnownRequestError ||
  //   e instanceof PrismaClientInitializationError ||
  //   e instanceof PrismaClientRustPanicError ||
  //   e instanceof PrismaClientUnknownRequestError
  // )
  //   return {
  //     code: 500,
  //     message: e.message,
  //     meta: e
  //   }

  return {
    code: 500,
    message: 'An unkown error occured',
    meta: {
      message: 'An unkown error occured'
    }
  }
}
