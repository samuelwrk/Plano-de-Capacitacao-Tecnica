/**
 * ErrorMessage - Componente para exibição de erros
 */

import './ErrorMessage.css';

interface ErrorMessageProps {
  message?: string;
  details?: string;
  onRetry?: () => void;
}

const ErrorMessage = ({
  message = 'Algo deu errado',
  details,
  onRetry
}: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <div className="error-message__icon">⚠️</div>
      <h3 className="error-message__title">{message}</h3>
      {details && (
        <p className="error-message__details">{details}</p>
      )}
      {onRetry && (
        <button
          className="error-message__retry"
          onClick={onRetry}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
