// @ts-nocheck
import { OmitDefaults, TableDefaults } from '@unimpaired/interfaces'
import { getPrismaQueryParamFilters, omitDefaults } from './crud.helpers.js'
import { omit, range, update } from 'ramda'
import { handlePrismaErrors } from '../api/error-handling.js'
import { Request } from 'express'

export const getPrismaCrud = <T extends TableDefaults>(
  tableName: string,
  prisma: any
) => {
  /** * Get a list of every record in the table */
  const getAll = async (req: Request) => {
    const queryObject = getPrismaQueryParamFilters(req.query)

    const [count, data] = await Promise.all([
      prisma[tableName].count(),
      prisma[tableName].findMany(queryObject)
    ])

    return { count, data }
  }

  /** * Get a list of data based on a complex query */
  const query = async (req: Request) => {
    const queryObject = update(
      ['where'],
      (prev) => ({ ...prev, ...req.body }),
      getPrismaQueryParamFilters(req.query)
    )

    const [count, data] = await Promise.all([
      prisma[tableName].count(),
      prisma[tableName].findMany(queryObject)
    ])

    return { count, data }
  }

  /** * Retrieve a record by it's ID */
  const getOne = async (id: number) => {
    return prisma[tableName]
      .findFirst({ where: { id } })
      .catch(handlePrismaErrors)
  }

  /** * Create a new row in the table */
  const createOne = async (data: OmitDefaults<T>) =>
    prisma[tableName].create({ data }).catch(handlePrismaErrors)

  /** * Modify one or more columns on an existing table row */
  const updateOne = async (id: number, data: Partial<OmitDefaults<T>>) => {
    return prisma[tableName]
      .update({ data, where: { id: Number(id) } })
      .catch(handlePrismaErrors)
  }

  /** * Delete one item in the DB */
  const deleteOne = async (id: number) =>
    prisma[tableName]
      .delete({ where: { id: Number(id) } })
      .catch(handlePrismaErrors)

  /** * Modify a record's data and use the result to create a new item in the DB */
  const duplicateOne = async (id: number, changes?: Partial<OmitDefaults<T>>) =>
    getOne(Number(id))
      .then((data) => {
        const prevItem = omit(['id'], omitDefaults(data))
        return createOne({ ...prevItem, ...changes })
      })
      .catch(handlePrismaErrors)

  /** * Copy and modify a records data and then create {total} duplicates in the DB */
  const multiplyOne = async (
    id: string,
    total: number,
    changes?: Partial<OmitDefaults<T>>
  ) => {
    const omitAll = (item: any) => omit(['id'], omitDefaults(item))
    const modifiedSingleItem = await getOne(Number(id)).then((data) => ({
      ...omitAll(data),
      ...changes
    }))
    const data = range(0, total).map((_) => modifiedSingleItem)
    return prisma[tableName].createMany({ data }).catch(handlePrismaErrors)
  }

  /** * Create multiple records in the database with the same data */
  const createMany = async (data: OmitDefaults<T>[]) => {
    // const { count } = await prisma[tableName]
    const { count } = await prisma[tableName]
      .createMany({ data, skipDuplicates: true })
      .catch(handlePrismaErrors)

    return count
  }

  /** * Make the same modification to multiple records in the DB */
  const updateMany = async (body: Record<string, Partial<OmitDefaults<T>>>) => {
    const { changes: data, ids } = body
    return prisma[tableName].updateMany({
      data,
      where: { id: { in: ids.map(Number) } }
    })
  }

  /** * Delete Many Records in the DB */
  const deleteMany = async (ids: number[]) => {
    const deletedItems = await prisma[tableName].findMany({
      where: { id: { in: ids } }
    })
    const { count } = await prisma[tableName].deleteMany({
      where: { id: { in: ids } }
    })
    return {
      deleted: count,
      deletedItems
    }
  }

  return {
    createOne,
    createMany,
    updateOne,
    updateMany,
    deleteOne,
    deleteMany,
    getAll,
    getOne,
    query,
    duplicateOne,
    multiplyOne
  }
}
