/**
 * Header - Navegação principal da aplicação
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../../../utils/constants.js';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">📰</span>
          <span className="header__logo-text">NYT News Reader</span>
        </Link>

        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li>
              <Link
                to="/"
                className={`header__nav-link ${isActive('/') ? 'header__nav-link--active' : ''}`}
              >
                Início
              </Link>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/category/${category.id}`}
                  className={`header__nav-link ${isActive(`/category/${category.id}`) ? 'header__nav-link--active' : ''}`}
                >
                  <span className="header__nav-icon">{category.icon}</span>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={`header__menu-toggle ${isMobileMenuOpen ? 'header__menu-toggle--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="header__menu-bar"></span>
          <span className="header__menu-bar"></span>
          <span className="header__menu-bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
