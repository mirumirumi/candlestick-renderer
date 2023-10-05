export class ParseError extends Error {
  override readonly name = "ParseError" as const

  constructor(message: string, options?: { cause: unknown }) {
    super(message, options)
    this.cause = options?.cause
  }
}
