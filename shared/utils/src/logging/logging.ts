import { format } from 'date-fns/fp'

const LINE_SPACER = '------------------------------------------------------ \n'
type logTypes = 'info' | 'warn' | 'error'

// type Options = {
//   severity?: 1 | 2 | 3
//   object?: Record<any, any>
//   code?: number
// }

export const logSpacer = () => console.log(LINE_SPACER)

export const log = (message: string, type: logTypes) => {
  // const bgTextLog = getBgColorFn(type)
  // const textLog = getTextColorFn(type)
  const timeStamp = getTimestamp(type)
  // getSpacer(textLog, options)
  // console.log(`${timeStamp}[${bgTextLog(type)}]: ${message}`)
  console.log(`${timeStamp}[${type}]: ${message}`)
  // getSpacer(textLog, options)
}

// const printObject = (options?: Options) => {
//   if (!options?.object) return
//   console.table(options.object)
// }

// const getSpacer = (chalk: ChalkInstance, options?: Options) => {
//   if (!options?.severity) return
//   if (options?.severity < 2) return
//   console.log(chalk(LINE_SPACER))
// }

const getTimestamp = (type: logTypes) => {
  if (type === 'warn') return ''
  const timeStamp = format('pp', new Date()).slice(0, 2)
  return timeStamp
}

// const getBgColorFn = (type: logTypes) => {
//   if (type === 'info') return chalk.bgBlue
//   if (type === 'warn') return chalk.bgYellow
//   if (type === 'error') return chalk.bgRed
//   return chalk.bgWhite
// }
// const getTextColorFn = (type: logTypes) => {
//   if (type === 'info') return chalk.blue
//   if (type === 'warn') return chalk.yellow
//   if (type === 'error') return chalk.red
//   return chalk.bgWhite
// }
