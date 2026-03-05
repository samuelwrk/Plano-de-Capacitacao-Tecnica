/**
 * ============================================
 * Componente: Tela de Carregamento (LoadingScreen)
 * ============================================
 *
 * Este componente exibe uma tela de carregamento animada enquanto a aplicação
 * está iniciando. É a primeira coisa que o usuário vê ao acessar o site.
 *
 * Funcionalidades:
 * - Animação SVG com 4 pontos coloridos em movimento
 * - Temporizador de 8 segundos para exibição obrigatória (marketing/experiência)
 * - Animação de fade-out ao final do carregamento
 * - Callback para notificar o componente pai quando o carregamento terminar
 *
 * @props {Function} onLoaded - Função callback chamada quando o carregamento termina
 */

import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

/**
 * Componente funcional que renderiza a tela de carregamento
 *
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onLoaded - Callback chamado quando o carregamento termina
 * @returns {JSX.Element} Elemento JSX da tela de carregamento
 */
const LoadingScreen = ({ onLoaded }) => {
  // Estado que controla a visibilidade da tela de carregamento
  // true = tela visível, false = tela oculta
  const [estaVisivel, setEstaVisivel] = useState(true);

  // Estado que controla a animação de saída (fade-out)
  // true = animação de saída ativa, false = animação normal
  const [estaSumindo, setEstaSumindo] = useState(false);

  /**
   * ============================================
   * Efeito Colateral: Temporizador de Carregamento
   ============================================
   * Executado uma vez ao montar o componente
   * Controla o tempo total de exibição da tela de carregamento
   */
  useEffect(() => {
    // Temporizador principal: após 8 segundos, inicia o fade-out
    const temporizadorAnimacao = setTimeout(() => {
      // Ativa o estado de fade-out para transição suave
      setEstaSumindo(true);

      // Segundo temporizador: após 500ms de animação, oculta a tela
      // e notifica o componente pai que o carregamento terminou
      setTimeout(() => {
        setEstaVisivel(false);
        if (onLoaded) {
          onLoaded();
        }
      }, 500);
    }, 8000); // 8 segundos de carregamento

    // Função de cleanup: limpa os temporizadores se o componente for desmontado
    return () => clearTimeout(temporizadorAnimacao);
  }, [onLoaded]);

  // Se a tela não estiver mais visível, não renderiza nada
  if (!estaVisivel) return null;

  /**
   * ============================================
   * Renderização da Tela de Carregamento
   ============================================
   */
  return (
    <div className={`loading-screen ${estaSumindo ? 'fade-out' : ''}`}>
      {/* SVG animado com 4 pontos coloridos em movimento circular */}
      <svg width="200" height="200" id="svg" className="loading-svg">
        {/* Cada círculo representa um ponto da animação
            Os IDs (dot1, dot2, dot3, dot4) são usados no CSS para animações */}
        <circle id="dot1" className="shape" />
        <circle id="dot2" className="shape" />
        <circle id="dot3" className="shape" />
        <circle id="dot4" className="shape" />
      </svg>

      {/* Texto indicativo de carregamento */}
      <p className="loading-text">Carregando...</p>
    </div>
  );
};

export default LoadingScreen;
