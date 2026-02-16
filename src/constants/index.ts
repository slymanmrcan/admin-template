// Application-wide constants
// Collect all magic strings and numbers here

export const APP_CONSTANTS = {
  /** Default page size for paginated lists */
  PAGE_SIZE: 10,
  /** Max file upload size in bytes (5MB) */
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  /** Debounce delay for search inputs (ms) */
  SEARCH_DEBOUNCE: 300,
  /** Toast/notification auto-dismiss duration (ms) */
  TOAST_DURATION: 5000,
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export const DATE_FORMATS = {
  short: "dd/MM/yyyy",
  long: "dd MMMM yyyy",
  withTime: "dd/MM/yyyy HH:mm",
  iso: "yyyy-MM-dd",
} as const
