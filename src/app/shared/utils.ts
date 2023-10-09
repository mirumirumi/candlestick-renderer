export const delay = (msec: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => resolve(), msec))
}

export const isHalfWidth = (s: string) => {
  // biome-ignore lint:
  return !/[^\x00-\x7F]+/.test(s)
}

export const toBool = (s: string): boolean => {
  const lower = s.toLowerCase()
  if (lower === "true") {
    return true
  } else if (lower === "false") {
    return false
  } else {
    throw Error("Invalid value")
  }
}
