/**
 * CategoryPage - Página de detalhes de uma categoria específica
 */

import { useParams, Link } from 'react-router-dom';
import { getCategoryById } from '../utils/constants.js';
import { useNews } from '../hooks/useNews.js';
import NewsCard from '../components/common/NewsCard/NewsCard';
import LoadingSpinner from '../components/common/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage/ErrorMessage';
import './CategoryPage.css';

const CategoryPage = () => {
  const { slug } = useParams();
  const { articles, loading, error, refetch } = useNews(slug);

  const category = getCategoryById(slug);

  if (!category) {
    return (
      <div className="category-page">
        <div className="category-page__not-found">
          <h1>Categoria não encontrada</h1>
          <p>A categoria "{slug}" não existe.</p>
          <Link to="/" className="category-page__back-link">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <header className="category-page__header">
        <Link to="/" className="category-page__back">
          ← Voltar
        </Link>
        <div className="category-page__title-container">
          <span className="category-page__icon">{category.icon}</span>
          <h1 className="category-page__title">{category.name}</h1>
        </div>
        <p className="category-page__description">{category.description}</p>
        <span className="category-page__count">
          {articles.length} notícias encontradas
        </span>
      </header>

      <section className="category-page__content">
        {loading && <LoadingSpinner size="large" />}

        {error && (
          <ErrorMessage
            message="Erro ao carregar notícias"
            details={error}
            onRetry={refetch}
          />
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="category-page__empty">
            <span className="category-page__empty-icon">📭</span>
            <h2>Nenhuma notícia encontrada</h2>
            <p>Não há notícias disponíveis para esta categoria no momento.</p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="category-page__grid">
            {articles.map((article, index) => (
              <NewsCard
                key={`${article.url}-${index}`}
                article={article}
                variant={index === 0 ? 'featured' : 'default'}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
