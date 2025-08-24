# Error Handling System

This project includes a comprehensive error handling system designed to prevent and gracefully handle Vercel deployment errors and other runtime issues.

## Components

### 1. ErrorBoundary
A React error boundary component that catches JavaScript errors anywhere in the component tree and displays a fallback UI.

**Usage:**
```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourComponent />
</ErrorBoundary>
```

### 2. ErrorDisplay
A flexible component for displaying errors with different variants and actions.

**Variants:**
- `inline`: Small inline error display
- `card`: Card-style error display (default)
- `fullscreen`: Full-screen error page

**Usage:**
```tsx
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { AppError } from '@/lib/errorHandler';

<ErrorDisplay 
  error={error}
  variant="card"
  showDetails={true}
  onRetry={handleRetry}
  onDismiss={handleDismiss}
/>
```

### 3. useErrorHandler Hook
A React hook for managing error states with retry logic and user feedback.

**Usage:**
```tsx
import { useErrorHandler } from '@/hooks/useErrorHandler';

function MyComponent() {
  const { error, handleError, retry, clearError, canRetry } = useErrorHandler({
    maxRetries: 3,
    retryDelay: 1000,
    onError: (error) => console.log('Error occurred:', error),
    onRetry: (error, attempt) => console.log(`Retry attempt ${attempt}`)
  });

  const handleApiCall = async () => {
    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      handleError(err);
    }
  };

  if (error) {
    return (
      <ErrorDisplay 
        error={error}
        onRetry={() => retry(handleApiCall)}
      />
    );
  }

  return <div>Your component content</div>;
}
```

## Error Types Handled

### Vercel Deployment Errors
- `FUNCTION_INVOCATION_FAILED` (500)
- `FUNCTION_INVOCATION_TIMEOUT` (504)
- `FUNCTION_PAYLOAD_TOO_LARGE` (413)
- `DEPLOYMENT_NOT_FOUND` (404)
- `DEPLOYMENT_DISABLED` (402)

### HTTP Errors
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
- 502: Bad Gateway
- 503: Service Unavailable
- 504: Gateway Timeout

### Network Errors
- Network connection failures
- Request timeouts
- Fetch API errors

## Configuration

### QueryClient Retry Configuration
The React Query client is configured with automatic retry logic:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    },
  },
});
```

### Vercel Configuration
The `vercel.json` file includes:
- Build and output directory configuration
- Function runtime settings
- Security headers
- SPA routing fallback

## Best Practices

### 1. Always Wrap API Calls
```tsx
const { handleError } = useErrorHandler();

try {
  const result = await apiCall();
  return result;
} catch (error) {
  handleError(error);
  throw error; // Re-throw if you want to handle it elsewhere
}
```

### 2. Use Appropriate Error Variants
- Use `inline` for form validation errors
- Use `card` for general application errors
- Use `fullscreen` for critical errors that prevent app usage

### 3. Provide Retry Options
Always provide retry functionality for recoverable errors:
```tsx
<ErrorDisplay 
  error={error}
  onRetry={handleRetry}
/>
```

### 4. Log Errors in Production
The ErrorBoundary automatically logs errors in production. Consider integrating with:
- Sentry
- LogRocket
- Custom logging service

## Error Monitoring

### Development
- Errors are logged to console
- Full error details are displayed

### Production
- Errors are logged with structured data
- User-friendly messages are shown
- Technical details are hidden by default

## Troubleshooting

### Common Issues

1. **Build Errors**: Run `npm run lint` to check for TypeScript/ESLint issues
2. **Runtime Errors**: Check browser console and network tab
3. **Vercel Deployment Errors**: Check Vercel dashboard for build logs

### Debug Mode
Enable detailed error information by setting `showDetails={true}` on ErrorDisplay components.

## Integration with Existing Code

The error handling system is designed to work with existing code without breaking changes. Simply:

1. Wrap your app with `ErrorBoundary`
2. Use `useErrorHandler` in components that make API calls
3. Display errors using `ErrorDisplay`

This provides immediate error handling benefits while allowing gradual adoption of more advanced features.
