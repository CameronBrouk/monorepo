import { makeCrudEndpoints } from './crud/crud'
import { PrismaClient } from '@prisma/client'
import express from 'express'
import { userPayload } from './tables/User/User'

export type TableNames = 'todo' | 'todoList' | 'person' | 'user' | 'permission'

// Express and Prisma Assignment
export const prisma = new PrismaClient({
  log: [
    'query',
    { level: 'warn', emit: 'stdout' },
    { level: 'info', emit: 'stdout' },
    { level: 'error', emit: 'event' }
  ],
  rejectOnNotFound: true
})
const app = express()

// Express Server Config
app.use(express.json())

// API Endpoints
makeCrudEndpoints('todo', app)
makeCrudEndpoints('todoList', app)
makeCrudEndpoints('person', app)
makeCrudEndpoints('user', app, {
  zod: userPayload
})

app.get('/', () => {
  // test stuff
})

// Run Server
app.listen(4000, () => {
  console.log('App Has Started')
})
