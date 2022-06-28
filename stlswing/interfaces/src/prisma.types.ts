import { Prisma } from '@prisma/client'

export type TableDefaults = {
  id: string
  draft?: boolean
  deleted?: boolean
  createdAt: Date
  updatedAt: Date
  createdBy?: number
  updatedBy?: number
}

type GetFilter<T> = T extends string
  ? Prisma.StringFilter
  : T extends boolean
  ? Prisma.BoolFilter
  : T extends Date
  ? Prisma.DateTimeFilter
  : T extends number
  ? Prisma.IntFilter
  : never

export type WhereFilters<T extends Record<string, any>> = {
  AND?: WhereFilters<T>
  OR?: WhereFilters<T>
  NOT?: WhereFilters<T>
} & Partial<{
  [key in keyof T]: GetFilter<T[key]> & { mode?: 'insensitive' }
}>

export type OrderBy<T extends Record<string, any>> = {
  [key in keyof T]: 'asc' | 'desc'
}

export type ValuesToBool<T extends Record<string, any>> = {
  [key in keyof T]?: boolean
}

export type QueryOptions<T extends Record<any, any>> = {
  skip?: number
  take?: number
  cursor?: {
    id?: string
  }
  where?: WhereFilters<T>
  orderBy?: OrderBy<T>
  select?: ValuesToBool<T>
}

export type OmitDefaults<T> = Omit<T, keyof TableDefaults>
