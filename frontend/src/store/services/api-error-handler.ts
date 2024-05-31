import { AxiosError } from 'axios';

type ApiErrorDetail = {
  messages: string[];
};

type ApiErrorResponse = {
  message: string;
  details?: ApiErrorDetail[];
};

function handleApiError(error: unknown): string {
  if (error instanceof AxiosError && error.response) {
    const responseData = error.response.data as ApiErrorResponse;
    const { message, details } = responseData;
    const additionalMessages = details?.map((detail) => detail.messages.join(' ')).join(' ') ?? '';
    return additionalMessages ? `${message} ${additionalMessages}` : message;
  }
  return 'An unexpected error occurred while communicating with the API.';
}

export { handleApiError };
