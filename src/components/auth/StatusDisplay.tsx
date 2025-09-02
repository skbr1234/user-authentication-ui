import Link from 'next/link';

interface StatusDisplayProps {
  status: 'loading' | 'success' | 'error';
  loadingText: string;
  successTitle: string;
  successMessage: string;
  successButtonText: string;
  successButtonHref: string;
  errorTitle: string;
  errorMessage: string;
  errorButtonText?: string;
  errorButtonHref?: string;
  errorSecondaryText?: string;
  errorSecondaryHref?: string;
}

export function StatusDisplay({
  status,
  loadingText,
  successTitle,
  successMessage,
  successButtonText,
  successButtonHref,
  errorTitle,
  errorMessage,
  errorButtonText,
  errorButtonHref,
  errorSecondaryText,
  errorSecondaryHref,
}: StatusDisplayProps) {
  return (
    <div className="text-center space-y-6">
      {status === 'loading' && (
        <>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <h2 className="text-xl font-bold text-gray-900">{loadingText}</h2>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{successTitle}</h2>
          <p className="text-gray-600">{successMessage}</p>
          <Link
            href={successButtonHref}
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {successButtonText}
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{errorTitle}</h2>
          <p className="text-gray-600">{errorMessage}</p>
          <div className="space-y-3">
            {errorButtonText && errorButtonHref && (
              <Link
                href={errorButtonHref}
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {errorButtonText}
              </Link>
            )}
            {errorSecondaryText && errorSecondaryHref && (
              <div>
                <Link href={errorSecondaryHref} className="text-sm text-blue-600 hover:text-blue-500">
                  {errorSecondaryText}
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}