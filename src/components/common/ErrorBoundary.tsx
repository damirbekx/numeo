
import axios from 'axios';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };


  public componentDidMount() {
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
    window.addEventListener('error', this.handleGlobalError);
  }

  public componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
    window.removeEventListener('error', this.handleGlobalError);
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    this.sendErrorToTelegram(
      event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      { componentStack: 'Unhandled Promise Rejection' }
    );
  };

  private handleGlobalError = (event: ErrorEvent) => {
    this.sendErrorToTelegram(
      event.error instanceof Error ? event.error : new Error(event.message),
      { componentStack: 'Global Window Error' }
    );
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.sendErrorToTelegram(error, errorInfo);
  }

  private async sendErrorToTelegram(error: Error, errorInfo: ErrorInfo) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('Telegram credentials not found in environment variables.');
      return;
    }

    const message = `
🚨 *Error in Dashboard Application* 🚨

*Error:* ${error.toString()}

*Stack Component:*
\`\`\`
${errorInfo.componentStack}
\`\`\`
    `;

    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      });
    } catch (telegramError) {
      console.error('Failed to send error to Telegram:', telegramError);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4 text-center">
          <div className="max-w-md w-full rounded-lg bg-white p-8 shadow-xl">
            <h1 className="mb-4 text-2xl font-bold text-red-600">Something went wrong</h1>
            <p className="mb-6 text-gray-600">
              An unexpected error occurred. We have been notified and are working on a fix.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Reload Page
            </button>
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-6 text-left">
                <p className="mb-2 text-sm font-semibold text-gray-700">Error Details:</p>
                <div className="max-h-60 overflow-auto rounded bg-gray-100 p-4">
                  <pre className="text-xs text-red-500 whitespace-pre-wrap break-all font-mono">
                    {this.state.error.toString()}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
