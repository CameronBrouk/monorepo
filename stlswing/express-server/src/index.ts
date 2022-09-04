import { PrismaClient } from '@stlswing/database'
import {
  generateApi,
  logExpressRoutes,
  makeCrudEndpoints
} from '@unimpaired/backend'
import groupClassApi from './GroupClass/groupClass.api.js'
import { validateGroupClass } from './GroupClass/groupClass.validators.js'
import express, { Express } from 'express'
import socialDanceApi from './SocialDance/social-dance.api.js'
import { validateSocialDance } from './SocialDance/socialDance.validator.js'
import { environment } from './environment.js'

export const prisma = new PrismaClient({
  log: ['error', 'info', 'query', 'warn']
})
export const app: Express = express()

console.log(environment)
app.use(express.json())

app.listen(environment.PORT, () => {
  console.log(
    `==== App Has Started on port ${environment.PORT} in ${environment.NODE_ENV} ====`
  )
})

// Expanded API's w/ Nested updates/creates
generateApi(app, 'GroupClass', groupClassApi, validateGroupClass)
generateApi(app, 'SocialDance', socialDanceApi, validateSocialDance)
// Generic Crud Endpoints
makeCrudEndpoints('DanceMove', app, prisma)
makeCrudEndpoints('Teacher', app, prisma)
makeCrudEndpoints('Product', app, prisma)
makeCrudEndpoints('Ticket', app, prisma)
makeCrudEndpoints('Order', app, prisma)
makeCrudEndpoints('PrivateLesson', app, prisma)

logExpressRoutes(app)
