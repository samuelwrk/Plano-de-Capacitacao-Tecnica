/**
 * ============================================
 * Componente: Cabeçalho (Header)
 * ============================================
 *
 * Este componente representa o cabeçalho fixo da aplicação.
 * É exibido em todas as páginas e contém:
 * - Logo da loja (clicável para voltar à página inicial)
 * - Botão do carrinho de compras com indicador de quantidade
 *
 * O cabeçalho permanece visível mesmo durante o scroll da página,
 * garantindo acesso rápido ao carrinho a qualquer momento.
 */

import React from 'react';

// Hook personalizado para acessar o contexto do carrinho
// Fornece acesso à quantidade de itens no carrinho
import { useCarrinho } from '../../context/CartContext';
import './Header.css';

/**
 * Componente funcional do cabeçalho
 *
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onCartClick - Callback chamado ao clicar no botão do carrinho
 * @param {Function} props.onLogoClick - Callback chamado ao clicar no logo
 * @returns {JSX.Element} Elemento JSX do cabeçalho
 */
const Header = ({ onCartClick, onLogoClick }) => {
  // Hook que obtém a quantidade de itens no carrinho do contexto global
  const { quantidadeItens } = useCarrinho();

  /**
   * ============================================
   * Renderização do Cabeçalho
   ============================================
   */
  return (
    // Elemento semântico header do HTML5
    <header className="header">
      <div className="header-content">
        {/* Logo da loja - área clicável para voltar ao início */}
        <div className="logo" onClick={onLogoClick}>
          {/* Título principal do logo */}
          <h1>ElectroStore</h1>
          {/* Subtítulo descritivo */}
          <span className="logo-subtitle">Sua loja de eletrônicos</span>
        </div>

        {/* Botão do carrinho de compras */}
        <button className="cart-button" onClick={onCartClick}>
          {/* Ícone SVG de carrinho de compras (path representa um carrinho) */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Dois círculos representam as rodas do carrinho */}
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" fill="currentColor"/>
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" fill="currentColor"/>
            {/* Path principal representa o corpo do carrinho */}
            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {/* Badge de quantidade - exibido apenas se houver itens no carrinho */}
          {quantidadeItens > 0 && (
            <span className="cart-badge">{quantidadeItens}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
