export function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string
) {
  return error instanceof Error ? error.message : fallbackMessage;
}
