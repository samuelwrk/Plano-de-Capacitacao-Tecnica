/**
 * Footer - Rodapé da aplicação
 */

import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__brand">
            <span className="footer__logo">📰</span>
            <span className="footer__name">NYT News Reader</span>
          </div>

          <p className="footer__copyright">
            © {currentYear} NYT News Reader. Dados fornecidos por The New York Times.
          </p>

          <div className="footer__links">
            <a
              href="https://developer.nytimes.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              NYT Developer
            </a>
            <span className="footer__separator">•</span>
            <a
              href="https://www.nytimes.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              New York Times
            </a>
          </div>
        </div>

        <p className="footer__disclaimer">
          Este projeto é apenas para fins educacionais. O conteúdo pertence ao New York Times.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
