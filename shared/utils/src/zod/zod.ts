import { z, ZodError, ZodIssue } from 'zod'
import { fullIsoDateRegex, ISO_FORMAT } from '../dates.js'

type zodType = 'date' | 'number' | 'string' | 'array' | 'boolean'
export const getZodErrorMessages = (propName: string, type: zodType) => ({
  invalid_type_error: `${propName} must be a ${type}`,
  required_error: `${propName} is required`
})

export const zodNumber = (propName: string) =>
  z.number(getZodErrorMessages(propName, 'number'))

export const zodString = (propName: string) =>
  z.number(getZodErrorMessages(propName, 'string'))

export const zodBoolean = (propName: string) =>
  z.boolean(getZodErrorMessages(propName, 'boolean'))

export const zodFullIsoDateString = (propName: string) =>
  z
    .string({
      required_error: `${propName} is required`
    })
    .regex(fullIsoDateRegex, {
      message: `${propName} must match ISO specification: ${ISO_FORMAT}`
    })
    .transform((d) => new Date(d))

export const zodDateTime = (propName: string) =>
  z.union([
    zodFullIsoDateString(propName),
    z.date({
      required_error: `${propName} is required`,
      invalid_type_error: 'Please enter either a Date or ISO string'
    })
  ])

export const prettifyZodIssue = (issue: ZodIssue): string => {
  if (issue.code === 'invalid_enum_value') {
    return `The value given for {}.${issue.path.join('.')} was '${
      issue.received
    }' but must be ${issue.options.map((val) => `'${val}'`).join(' or ')}.`
  }

  if (issue.code === 'unrecognized_keys') {
    return `The key {}.${issue.path.join(
      '.'
    )} in recived object is not allowed.  It must be one of these keys (${issue.keys.join(
      ','
    )}).`
  }

  if (issue.code === 'invalid_string') {
    if (issue.validation === 'email') {
      return `The email received at ${issue.path.join('.')} was invalid.`
    }
    if (issue.validation === 'url') {
      return `The url received at ${issue.path.join('.')} was invalid.`
    }
  }

  if (issue.code === 'invalid_union') {
    return issue.unionErrors.reduce(
      // This is recursive logic FYI
      (acc, zodError, i) =>
        `${acc}${prettifyZodError(zodError)} ${
          i !== issue.unionErrors.length ? '\n' : ''
        }`,
      ''
    )
  }

  if (issue.code === 'invalid_type') {
    if (issue.message === 'Required')
      return `The property {}.${issue.path.join('.')} is missing.`
    return `The type of {}.${issue.path.join('.')} was '${
      issue.received
    }' but should be a ${issue.expected.replace('|', 'or')}.`
  }

  return 'An unkown Zod error occured'
}

export const prettifyZodError = (zodError: ZodError): string =>
  zodError.issues.reduce(
    (message, issue, i) =>
      `${message}${i > 0 ? '\n' : ''}${prettifyZodIssue(issue)}`,
    ''
  )
