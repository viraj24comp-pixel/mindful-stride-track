import React from 'react';
import { AlertTriangle, RefreshCw, AlertCircle, X } from 'lucide-react';
import { AppError, getErrorAction } from '@/lib/errorHandler';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  error: AppError;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
  showDetails?: boolean;
  variant?: 'inline' | 'card' | 'fullscreen';
}

export function ErrorDisplay({
  error,
  onRetry,
  onDismiss,
  className,
  showDetails = false,
  variant = 'card'
}: ErrorDisplayProps) {
  const errorAction = getErrorAction(error);
  const isRetryable = errorAction.action === 'retry';

  const getIcon = () => {
    if (error.status >= 500) return <AlertTriangle className="h-5 w-5" />;
    if (error.status >= 400) return <AlertCircle className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  const getSeverityColor = () => {
    if (error.status >= 500) return 'text-red-600 bg-red-50 border-red-200';
    if (error.status >= 400) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'inline':
        return 'p-3 text-sm';
      case 'card':
        return 'p-6 rounded-lg border shadow-sm';
      case 'fullscreen':
        return 'min-h-screen flex items-center justify-center p-8';
      default:
        return 'p-6 rounded-lg border shadow-sm';
    }
  };

  if (variant === 'fullscreen') {
    return (
      <div className={cn('bg-background', getVariantStyles(), className)}>
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">⚠️</div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              {error.status === 404 ? 'Page Not Found' : 'Something went wrong'}
            </h1>
            <p className="text-muted-foreground">
              {error.userMessage}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isRetryable && onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            )}
            
            <button
              onClick={errorAction.actionHandler}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
            >
              {errorAction.actionText}
            </button>
          </div>

          {showDetails && (
            <details className="text-left text-sm text-muted-foreground">
              <summary className="cursor-pointer hover:text-foreground">
                Technical Details
              </summary>
              <div className="mt-2 p-3 bg-muted rounded text-xs font-mono">
                <div>Code: {error.code}</div>
                <div>Status: {error.status}</div>
                <div>Message: {error.message}</div>
              </div>
            </details>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'border rounded-lg',
      getVariantStyles(),
      getSeverityColor(),
      className
    )}>
      <div className="flex items-start gap-3">
        {getIcon()}
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">
              {error.status === 404 ? 'Page Not Found' : 'Error Occurred'}
            </h3>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <p className="text-sm">
            {error.userMessage}
          </p>

          <div className="flex flex-wrap gap-2">
            {isRetryable && onRetry && (
              <button
                onClick={onRetry}
                className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </button>
            )}
            
            <button
              onClick={errorAction.actionHandler}
              className="px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors"
            >
              {errorAction.actionText}
            </button>
          </div>

          {showDetails && (
            <details className="text-xs">
              <summary className="cursor-pointer hover:text-foreground">
                Technical Details
              </summary>
              <div className="mt-2 p-2 bg-background/50 rounded font-mono">
                <div>Code: {error.code}</div>
                <div>Status: {error.status}</div>
                <div>Message: {error.message}</div>
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
