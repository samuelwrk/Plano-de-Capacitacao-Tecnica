/**
 * NewsCard - Cartão de exibição de notícia
 */

import { formatDateShort, getArticleImage, truncateText, extractAuthor } from '../../../utils/helpers.js';
import './NewsCard.css';

interface NewsCardProps {
  article: {
    title: string;
    abstract: string;
    byline: string;
    published_date: string;
    url: string;
    multimedia?: Array<{
      url: string;
      format: string;
      caption?: string;
    }>;
  };
  variant?: 'default' | 'featured';
}

const NewsCard = ({ article, variant = 'default' }: NewsCardProps) => {
  const imageUrl = getArticleImage(article);
  const author = extractAuthor(article.byline);
  const formattedDate = formatDateShort(article.published_date);
  const truncatedTitle = truncateText(article.title, variant === 'featured' ? 120 : 80);
  const truncatedAbstract = truncateText(article.abstract, variant === 'featured' ? 200 : 120);

  const handleClick = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      className={`news-card news-card--${variant}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="news-card__image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.title}
            className="news-card__image"
            loading="lazy"
          />
        ) : (
          <div className="news-card__image-placeholder">
            <span>📰</span>
          </div>
        )}
      </div>

      <div className="news-card__content">
        <h3 className="news-card__title">{truncatedTitle}</h3>
        <p className="news-card__abstract">{truncatedAbstract}</p>

        <div className="news-card__meta">
          <span className="news-card__author">{author}</span>
          <span className="news-card__separator">•</span>
          <time className="news-card__date" dateTime={article.published_date}>
            {formattedDate}
          </time>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
