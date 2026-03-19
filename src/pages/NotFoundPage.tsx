/**
 * NotFoundPage - Página para rotas não encontradas
 */

import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page__content">
        <span className="not-found-page__icon">🔍</span>
        <h1 className="not-found-page__title">404</h1>
        <h2 className="not-found-page__subtitle">Página não encontrada</h2>
        <p className="not-found-page__description">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/" className="not-found-page__link">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
