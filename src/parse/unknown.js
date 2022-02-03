export default (error) => ({ unknown: true, ...(error ? { error } : {}) })
