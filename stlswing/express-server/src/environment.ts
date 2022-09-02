import { z } from 'zod'
import * as dotenv from 'dotenv'

export const environment = z
  .object({
    PORT: z.string().transform((port) => Number(port)),
    DOMAIN: z.string(),
    NODE_ENV: z.enum(['dev', 'prod'])
  })
  .parse(dotenv.config().parsed)
