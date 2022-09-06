import { addYears, eachMinuteOfInterval } from 'date-fns'
import { RRuleSet, RRule, rrulestr } from 'rrule'
import { mobileDayAbbreviations, toUTC } from '../dates/dates'

// type RRuleParams = RRule['options']

// const rruleMap = {
//   freq: {
//     second: RRule.SECONDLY,
//     minute: RRule.MINUTELY,
//     week: RRule.WEEKLY,
//     hour: RRule.HOURLY,
//     day: RRule.DAILY,
//     month: RRule.MONTHLY,
//     year: RRule.YEARLY
//   },
//   days: {
//     sunday: RRule.SU,
//     monday: RRule.MO,
//     tuesday: RRule.TU,
//     wednesday: RRule.WE,
//     thursday: RRule.TH,
//     friday: RRule.FR,
//     saturday: RRule.SA
//   },
//   months: {
//     january: 0
//   }
// }

// type RRuleOptionsMap = typeof rruleMap
// type Days = keyof RRuleOptionsMap['days']
// type Frequency = keyof RRuleOptionsMap['freq']
// // type FrequencyTypes = 'day-of-month' | 'weekday' | 'month' | 'hour'

// type Params = {
//   start: Date // Beginning of Recurrence
//   recurEvery: recurEvery
//   maxOccurances?: number
//   lastPossibleDate?: Date // Last date of recurrence
//   skip?: number
//   // recurOn: [recurranceTypes, string][]
//   limitReccuranceTo: {
//     month: string
//     // week: 'first' | 'last' | 'second' | 'third' | 'fourth' | 'fifth'
//     day: day
//     time: `${hours}:${nums}${nums | 0}${'AM' | 'PM'}`
//     minute: minute
//   }
// }

// type nums = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
// type hours = nums | 10 | 11 | 12
// type day = `${options} ${Days}`
// type minute = `every ${nums}${nums | 0 | ''} minutes`
// type recurEvery = `${nums}${nums | 0 | ''} ${Frequency}${'s' | ''}`
// type options = 'every' | 'first' | 'last' | 'second' | 'third' | 'fourth'
// type Months =
//   | 'Jan'
//   | 'Feb'
//   | 'Mar'
//   | 'Apr'
//   | 'May'
//   | 'Jun'
//   | 'Jul'
//   | 'Aug'
//   | 'Sept'
//   | 'Oct'
//   | 'Nov'
//   | 'Dec'

// type rate = 'every ' | 'first ' | 'last ' | ''
// type value = Frequency

// type check = `${rate}${nums} ${value}${'s' | ''} ${string}`
// const f: check = 'every 1 day until '

// // const checkfuck = (month: string) => {

// // }

// const a: Params = {
//   recurEvery: '21 day',
//   start: new Date(2020, 8, 1),
//   lastPossibleDate: new Date(2200, 1, 1),
//   limitReccuranceTo: {
//     month: 'fe',
//     day: 'last saturday',
//     time: '10:10PM',
//     minute: 'every 2 minutes'
//   }
// }

// const test = {
//   recurEvery: {
//     rate: 1,
//     freq: 'year'
//   },
//   start: new Date(),
//   lastPossibleDate: new Date(),
//   limitReccuranceTo: {
//     month: 'february',
//     day: {
//       rate: 'first',
//       day: 'friday'
//     },
//     time: {
//       hour: 1,
//       minute: 10,
//       zome: 'PM'
//     },
//     minute: {
//       rate: 'every',
//       minute: 2
//     }
//   }
// }

// eachMinuteOfInterval({
//   start: new Date(),
//   end: addYears(new Date(), 3)
// })

// const reccurance_ = [
//   ['month', 'september'],
//   ['day', 'monday'],
//   ['week', 'first']
// ]
// const recurranc = {
//   month: {
//     value: ['sept'],
//     week: {
//       value: 'first',
//       day: {
//         value: 'monday'
//       }
//     }
//   }
// }

// type recurranceTypes =
//   | 'minute'
//   | 'hour'
//   | 'second'
//   | 'day'
//   | 'month'
//   | 'year'
//   | 'week'
// type days = typeof mobileDayAbbreviations[number]

// type IncludesBy<T extends string> = T extends `by${string}` ? T : never
// type RecurrenceOptions = keyof {
//   [K in keyof RRuleParams as IncludesBy<K>]: any
// }

// type Reccurance = [freq: RecurrenceOptions, values: Date[]]

// // const b: Reccurance = ['bymonth', [new Date(2022,2,2,2,2, 2)]

// export const createRuleset = (params: Params) => {
//   const ruleset = new RRuleSet()
//   ruleset.rrule(
//     new RRule({
//       dtstart: toUTC(params.start),
//       until: toUTC(params.lastPossibleDate)
//       // count: params.amountOfOccurances
//     })
//   )
// }

// // const a: RRuleParams = {
// //   byweekday: ,
// //   byeaster: 1
// // }
// const rrule = new RRule({
//   byweekday: [RRule.MO, RRule.FR]
// })
// const createRRule = (rule: RRuleParams) => new RRule(rule)

// const addDate = (rruleset: RRuleSet) => (date: Date) =>
//   rruleset.rdate(toUTC(date))
// const excludeDate = (rrule: RRuleSet) => (date: Date) =>
//   rrule.exdate(toUTC(date))

// export const getRRuleIsoDates = (ruleset: RRuleSet) => ruleset.all()
// export const getRRuleStr = (ruleset: RRuleSet) => ruleset.valueOf()
