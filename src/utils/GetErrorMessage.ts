export const getErrorMessage = (error: unknown, baseMessage: string) => {
  if (error instanceof Error) {
    return `${baseMessage}: ${error.message}`;
  }
  return "";
}

export default getErrorMessage;