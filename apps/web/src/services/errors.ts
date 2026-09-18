import { isAxiosError } from 'axios'

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Ocorreu um erro. Tente novamente.',
): string {
  if (!isAxiosError(error)) {
    return fallback
  }

  const message = error.response?.data?.message

  if (Array.isArray(message)) {
    return message.join(', ')
  }

  if (typeof message === 'string' && message.length > 0) {
    return message
  }

  return fallback
}
