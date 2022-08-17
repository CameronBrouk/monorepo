import { prisma } from '../index'
import { getPrismaCrud } from '../crud/getPrismaCrud'

type EndpointFunctions = ReturnType<typeof getPrismaCrud>

type ORM = typeof prisma

type OverridablePermissions<Token extends Record<string, any>> = Partial<{
  all: ((jwt: Token, prisma: ORM) => boolean) | true
  read: ((jwt: Token, prisma: ORM) => boolean) | true
  write: ((jwt: Token, prisma: ORM) => boolean) | true
  delete: ((jwt: Token, prisma: ORM) => boolean) | true
}>

type CheckPermissionsFn<JWTToken, Body> = (
  token: JWTToken,
  req: Body,
  prisma: ORM
) => boolean

export type PermissionsMap<T extends Record<string, any>> = {
  [endpoint in keyof EndpointFunctions]?: CheckPermissionsFn<
    T,
    Parameters<EndpointFunctions[endpoint]>[0]
  >
} & OverridablePermissions<T>
