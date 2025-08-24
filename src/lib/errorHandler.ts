export interface ErrorResponse {
  message: string;
  code?: string;
  status?: number;
}

export class AppError extends Error {
  public code: string;
  public status: number;
  public userMessage: string;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', status: number = 500, userMessage?: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
    this.userMessage = userMessage || this.getDefaultUserMessage(code);
  }

  private getDefaultUserMessage(code: string): string {
    const errorMessages: Record<string, string> = {
      // Network errors
      'NETWORK_ERROR': 'Unable to connect to the server. Please check your internet connection.',
      'TIMEOUT_ERROR': 'The request took too long to complete. Please try again.',
      
      // HTTP errors
      '400': 'Invalid request. Please check your input and try again.',
      '401': 'You are not authorized to perform this action. Please log in.',
      '403': 'Access denied. You don\'t have permission to perform this action.',
      '404': 'The requested resource was not found.',
      '500': 'Internal server error. Please try again later.',
      '502': 'Bad gateway. The server is temporarily unavailable.',
      '503': 'Service unavailable. Please try again later.',
      '504': 'Gateway timeout. The server took too long to respond.',
      
      // Vercel specific errors
      'FUNCTION_INVOCATION_FAILED': 'Server function failed to execute. Please try again.',
      'FUNCTION_INVOCATION_TIMEOUT': 'Server function timed out. Please try again.',
      'FUNCTION_PAYLOAD_TOO_LARGE': 'The request data is too large. Please reduce the size and try again.',
      'DEPLOYMENT_NOT_FOUND': 'Application deployment not found. Please contact support.',
      'DEPLOYMENT_DISABLED': 'Application is temporarily disabled. Please try again later.',
      
      // Default
      'UNKNOWN_ERROR': 'An unexpected error occurred. Please try again or contact support.'
    };

    return errorMessages[code] || errorMessages['UNKNOWN_ERROR'];
  }
}

export function handleApiError(error: any): AppError {
  if (error instanceof AppError) {
    return error;
  }

  // Handle fetch errors
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return new AppError(
      'Network request failed',
      'NETWORK_ERROR',
      0,
      'Unable to connect to the server. Please check your internet connection.'
    );
  }

  // Handle timeout errors
  if (error.name === 'AbortError') {
    return new AppError(
      'Request timeout',
      'TIMEOUT_ERROR',
      408,
      'The request took too long to complete. Please try again.'
    );
  }

  // Handle HTTP errors
  if (error.status) {
    return new AppError(
      error.message || `HTTP ${error.status}`,
      error.status.toString(),
      error.status
    );
  }

  // Handle Vercel function errors
  if (error.code && error.code.startsWith('FUNCTION_')) {
    return new AppError(
      error.message || 'Function execution failed',
      error.code,
      error.status || 500
    );
  }

  // Handle deployment errors
  if (error.code && error.code.startsWith('DEPLOYMENT_')) {
    return new AppError(
      error.message || 'Deployment error',
      error.code,
      error.status || 500
    );
  }

  // Fallback to generic error
  return new AppError(
    error.message || 'Unknown error occurred',
    'UNKNOWN_ERROR',
    500
  );
}

export function isRetryableError(error: AppError): boolean {
  const retryableCodes = [
    'NETWORK_ERROR',
    'TIMEOUT_ERROR',
    '500',
    '502',
    '503',
    '504',
    'FUNCTION_INVOCATION_FAILED',
    'FUNCTION_INVOCATION_TIMEOUT'
  ];
  
  return retryableCodes.includes(error.code);
}

export function getErrorAction(error: AppError): {
  action: string;
  actionText: string;
  actionHandler: () => void;
} {
  if (isRetryableError(error)) {
    return {
      action: 'retry',
      actionText: 'Try Again',
      actionHandler: () => window.location.reload()
    };
  }

  if (error.status === 401) {
    return {
      action: 'login',
      actionText: 'Log In',
      actionHandler: () => {
        // Redirect to login page or show login modal
        window.location.href = '/login';
      }
    };
  }

  if (error.status === 403) {
    return {
      action: 'contact',
      actionText: 'Contact Support',
      actionHandler: () => {
        // Open support contact form or redirect
        window.open('mailto:support@example.com', '_blank');
      }
    };
  }

  return {
    action: 'refresh',
    actionText: 'Refresh Page',
    actionHandler: () => window.location.reload()
  };
}
