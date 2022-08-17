import { isEmpty } from 'lodash'

export const logObj = (name: string, object?: any) => {
  if (!object) return
  if (isEmpty(object)) return
  console.log(`${name.toUpperCase()}: `)
  console.group()
  console.table(object)
  console.groupEnd()
}

export const endpointLog = (
  title: string,
  endpoint: string,
  req: any,
  res: any,
  start: number
) => {
  endpointLogStart(start, title, endpoint)
  endpointLogComplete(req, res, start)
}

export const endpointLogStart = (
  date: number,
  title: string,
  endpoint: string
) => {
  logLine(title)
  console.group()
  console.log(`ENDPOINT: ${endpoint}`)
  console.log('TIMESTAMP: ', new Date(date).toISOString())
}

export const endpointLogComplete = (req: any, res: any, date: number) => {
  console.log(`ELAPSED TIME: ${new Date().getTime() - date} Milliseconds`)
  logObj('Query Params', req?.query)
  logObj('Body', req?.body)
  logObj('Response', res)
  console.groupEnd()
  console.log(
    '-------------------------------------------------------------------- \n \n'
  )
}

export const logLine = (message: string) => {
  console.log(
    `-------------------------- [${message}] --------------------------`
  )
}
