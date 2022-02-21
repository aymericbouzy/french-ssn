export type UnknownField = { unknown: true; error?: string }

export default (error?: string): UnknownField => ({
  unknown: true,
  ...(error ? { error } : {}),
})
