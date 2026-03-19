/**
 * LoadingSpinner - Indicador de carregamento
 */

import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner = ({ size = 'medium', color }: LoadingSpinnerProps) => {
  const spinnerStyle = color ? { borderTopColor: color } : {};

  return (
    <div className={`loading-spinner loading-spinner--${size}`}>
      <div className="loading-spinner__circle" style={spinnerStyle}></div>
      <span className="loading-spinner__text">Carregando...</span>
    </div>
  );
};

export default LoadingSpinner;
