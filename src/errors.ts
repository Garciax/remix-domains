import * as z from 'zod'
import type { ErrorWithMessage, SchemaError } from './types'

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return { message: maybeError.message }
  return { message: String(maybeError) }
}

const errorMessagesFor = (errors: SchemaError[], name: string) =>
  errors.filter(({ path }) => path.includes(name)).map(({ message }) => message)

const errorMessagesForSchema = <T extends z.AnyZodObject>(
  errors: SchemaError[],
  schema: T,
) => {
  type SchemaType = z.infer<T>
  const mappedErrors = {} as Record<keyof SchemaType, string[]>
  for (const stringKey in schema.shape) {
    const key = stringKey as keyof SchemaType
    mappedErrors[key] = errorMessagesFor(errors, stringKey)
  }
  return mappedErrors
}

export { errorMessagesFor, errorMessagesForSchema, toErrorWithMessage }
