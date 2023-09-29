import { InvalidValueError } from "./errors"

export const delay = (msec: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => resolve(), msec))
}

export const toBool = (s: string): boolean => {
  const lower = s.toLowerCase()
  if (lower === "true") {
    return true
  } else if (lower === "false") {
    return false
  } else {
    throw new InvalidValueError()
  }
}
