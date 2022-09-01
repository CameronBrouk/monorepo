import { TableDefaults } from '@unimpaired/interfaces'
import { Express, Request, Response } from 'express'
import { PermissionsMap } from '../permissions/permissions.js'
import { flatten, fromPairs } from 'ramda'
import { z, ZodObject } from 'zod'
import {
  handleError,
  handleSuccess,
  validateParamId,
  validateQueryStringLength,
  validateReqestBody,
  validateRequestQuery
} from './crud.helpers.js'
import { getPrismaCrud } from './getPrismaCrud.js'
import { handlePrismaErrors } from '../api/error-handling.js'

export const makeCrudEndpoints = <
  T extends TableDefaults,
  Z extends ZodObject<any> = ZodObject<any>
>(
  tableName: string,
  app: Express,
  prisma: any,
  options?: {
    permissions?: PermissionsMap<T>
    zod?: Z
  }
) => {
  // prettier-ignore
  const { getAll, getOne, createOne, updateOne, deleteOne, query, createMany, updateMany, deleteMany, duplicateOne, multiplyOne } = getPrismaCrud(tableName, prisma)

  // Get All
  app.get(`/${tableName}`, async (req: Request, res: Response) => {
    if (!validateRequestQuery(req, res)) return

    getAll(req).then(handleSuccess(res)).catch(handleError(res))
  })

  // Get One
  app.get(`/${tableName}/:id`, async (req, res) => {
    if (!validateQueryStringLength(req, res)) return
    if (!validateParamId(req, res)) return

    getOne(Number(req.params.id))
      .then(handleSuccess(res))
      .catch((e) => {
        res.status(500).json(`${e}`)
      })
  })

  // Make Complex Query
  app.post(`/query/${tableName}/`, async (req, res) => {
    query(req).then(handleSuccess(res)).catch(handleError(res))
  })

  // Create One
  app.post(`/${tableName}`, async (req, res) => {
    // Handle Optional Zod Validation
    if (options?.zod) {
      if (!validateReqestBody(req, res, options.zod)) return
      // console.log(Object.keys(options.zod))
    }

    // Create in DB
    createOne(req.body)
      .then(handleSuccess(res))
      .catch(handlePrismaErrors(req, res))
  })

  // Update One
  app.patch(`/${tableName}/:id`, async (req, res) => {
    if (!validateParamId(req, res)) return
    if (!validateQueryStringLength(req, res)) return
    if (!validateRequestQuery(req, res)) return
    if (options?.zod) {
      if (!validateReqestBody(req, res, options.zod.partial())) return
    }

    updateOne(Number(req.params.id), req.body)
      .then(handleSuccess(res))
      .catch(handlePrismaErrors(req, res))
  })

  // Duplicate One
  app.post(`/duplicate/${tableName}/:id`, (req, res) => {
    if (!validateParamId(req, res)) return
    if (!validateQueryStringLength(req, res)) return
    if (!validateRequestQuery(req, res)) return
    if (options?.zod) {
      if (!validateReqestBody(req, res, options.zod.partial())) return
    }

    duplicateOne(Number(req.params.id), req.body)
      .then(handleSuccess(res))
      .catch(handlePrismaErrors(req, res))
  })

  // Delete One
  app.delete(`/${tableName}/:id`, async (req, res) => {
    if (!validateParamId(req, res)) return
    if (!validateQueryStringLength(req, res)) return
    if (!validateRequestQuery(req, res)) return

    deleteOne(Number(req.params.id))
      .then(handleSuccess(res))
      .catch(handlePrismaErrors(req, res))
  })

  // Create Many
  app.post(`/batch/${tableName}/`, async (req, res) => {
    if (!validateQueryStringLength(req, res)) return
    if (!validateRequestQuery(req, res)) return

    // Handle Optional Zod Validation
    if (options?.zod && Array.isArray(req.body)) {
      if (!options.zod) return

      const errorPairs = flatten(req.body)
        .map((val) => options?.zod?.strict().safeParse(val))
        .map((zod, index) => [index, zod])
        .filter(([_, zod]: any) => !zod?.success)
        .map(
          ([index, zod]: any) =>
            [
              index,
              {
                errors: zod.error.issues,
                data: req.body[index]
              }
            ] as [string, object]
        )

      const errorMap = fromPairs(errorPairs)
      const successful = req.body.filter(
        (_, i) => !Object.keys(errorMap).includes(i.toString())
      )
      if (errorPairs.length === req.body.length) {
        // Every Pair Errored Out
        res.status(500).json(errorMap)
      }

      await createMany(successful)
        .then((count) => {
          res.status(200).json({
            created: count,
            successful,
            ...(Object.keys(errorMap).length > 0 ? errorMap : {})
          })
        })
        .catch(handleError(res))
      return
    }

    createMany(req.body)
      .then((successful) => {
        res.status(200).json({
          successful
        })
      })
      .catch(handleError(res))
  })

  // Update Many
  app.patch(`/batch/${tableName}/`, async (req, res) => {
    if (options?.zod) {
      if (!validateReqestBody(req, res, options.zod.partial())) return
    }

    await updateMany(req.body).catch(handleError(res))

    await query({
      // @ts-ignore
      where: {
        id: {
          in: req.body.ids
        }
      }
    })
      .then(handleSuccess(res))
      .catch(handleError(res))
  })

  // Delete Many
  app.delete(`/batch/${tableName}/`, async (req, res) => {
    const validation = z
      .object({
        ids: z.array(z.number()).min(1)
      })
      .safeParse(req.body)

    if (!validation.success) {
      res.status(500).json(validation.error.issues)
      return
    }

    // res.status(200).send(req.body)
    deleteMany(req.body.ids)
      .then((value) => {
        res.status(200).json(value)
      })
      .catch(handleError(res))
  })

  // Multiply One
  app.post(`/multiply/${tableName}/:id`, async (req, res) => {
    if (!validateQueryStringLength(req, res)) return
    if (!validateParamId(req, res)) return
    const validation = z
      .object({ ids: z.array(z.number()).min(1) })
      .safeParse(req.body)

    if (!validation.success) {
      res.status(500).send(validation.error.issues)
      return
    }

    multiplyOne(req.params.id, req.body.total, req.body.modifications)
      .then(handleSuccess(res))
      .catch(handleError(res))
  })
}
