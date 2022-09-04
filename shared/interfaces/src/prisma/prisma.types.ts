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
  ? // ? Prisma.StringFilter
    any
  : T extends boolean
  ? // ? Prisma.BoolFilter
    any
  : T extends Date
  ? // ? Prisma.DateTimeFilter
    any
  : T extends number
  ? // ? Prisma.IntFilter
    any
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

export type RemovePromise<T> = T extends Promise<infer U> ? U : never
export type RemoveNullKeys<T extends Record<string, any>> = {
  [K in keyof T as T[K] extends NonNullable<T[K]> ? K : never]: T[K]
}
export type GetNullKeysAsOptional<T extends Record<string, any>> = {
  [K in keyof T as T[K] extends NonNullable<T[K]> ? never : K]?: T[K]
}
export type MakeNullOptional<T extends Record<string, any>> =
  RemoveNullKeys<T> & GetNullKeysAsOptional<T>
export type RecursiveMakeNullOptional<T extends Record<string, any>> =
  MakeNullOptional<{
    [K in keyof T]: T[K] extends object ? RecursiveMakeNullOptional<T[K]> : T[K]
  }>
