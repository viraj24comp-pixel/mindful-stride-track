import { useState, useCallback, useRef } from 'react';
import { AppError, handleApiError, isRetryableError, getErrorAction } from '@/lib/errorHandler';

interface UseErrorHandlerOptions {
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: AppError) => void;
  onRetry?: (error: AppError, attempt: number) => void;
}

interface ErrorState {
  error: AppError | null;
  isRetrying: boolean;
  retryCount: number;
  lastErrorTime: number | null;
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    onError,
    onRetry
  } = options;

  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isRetrying: false,
    retryCount: 0,
    lastErrorTime: null
  });

  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleError = useCallback((error: any) => {
    const appError = handleApiError(error);
    
    setErrorState(prev => ({
      error: appError,
      isRetrying: false,
      retryCount: prev.retryCount,
      lastErrorTime: Date.now()
    }));

    onError?.(appError);
  }, [onError]);

  const retry = useCallback(async (retryFunction?: () => Promise<any>) => {
    if (!errorState.error || !isRetryableError(errorState.error)) {
      return;
    }

    if (errorState.retryCount >= maxRetries) {
      setErrorState(prev => ({
        ...prev,
        error: new AppError(
          'Maximum retry attempts reached',
          'MAX_RETRIES_EXCEEDED',
          500,
          'Maximum retry attempts reached. Please try again later or contact support.'
        )
      }));
      return;
    }

    setErrorState(prev => ({
      ...prev,
      isRetrying: true,
      retryCount: prev.retryCount + 1
    }));

    onRetry?.(errorState.error, errorState.retryCount + 1);

    // Clear any existing timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    // Wait before retrying
    retryTimeoutRef.current = setTimeout(async () => {
      try {
        if (retryFunction) {
          await retryFunction();
        }
        
        // Clear error state on success
        setErrorState({
          error: null,
          isRetrying: false,
          retryCount: 0,
          lastErrorTime: null
        });
      } catch (error) {
        // Handle retry error
        handleError(error);
      }
    }, retryDelay);
  }, [errorState.error, errorState.retryCount, maxRetries, retryDelay, onRetry, handleError]);

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isRetrying: false,
      retryCount: 0,
      lastErrorTime: null
    });

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  const getErrorActionInfo = useCallback(() => {
    if (!errorState.error) return null;
    return getErrorAction(errorState.error);
  }, [errorState.error]);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
  }, []);

  return {
    error: errorState.error,
    isRetrying: errorState.isRetrying,
    retryCount: errorState.retryCount,
    lastErrorTime: errorState.lastErrorTime,
    handleError,
    retry,
    clearError,
    getErrorActionInfo,
    cleanup,
    canRetry: errorState.error ? isRetryableError(errorState.error) && errorState.retryCount < maxRetries : false
  };
}
