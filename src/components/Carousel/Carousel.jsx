/**
 * ============================================
 * Componente: Carrossel de Categorias (Carousel)
 * ============================================
 *
 * Este componente exibe um carrossel rotativo de categorias de produtos.
 * Permite a navegação entre categorias através de:
 * - Botões anterior/próximo
 * - Navegação por pontos (dots)
 * - Clique direto na categoria
 *
 * Funcionalidades:
 * - Rotação automática a cada 5 segundos
 * - Animação suave entre slides
 * - Botões de navegação manual
 * - Indicadores de posição (dots)
 * - Feedback visual no slide ativo
 */

import React, { useState, useEffect } from 'react';
import './Carousel.css';

/**
 * Componente funcional do carrossel de categorias
 *
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.categories - Array de objetos de categoria
 * @param {Function} props.onCategorySelect - Callback chamado ao selecionar uma categoria
 * @returns {JSX.Element} Elemento JSX do carrossel
 */
const Carousel = ({ categories, onCategorySelect }) => {
  // Estado que armazena o índice do slide atualmente exibido
  // Controla qual categoria está visível no carrossel
  const [indiceAtual, setIndiceAtual] = useState(0);

  // Estado que controla se uma animação está em andamento
  // Evita que o usuário clique múltiplas vezes durante a transição
  const [estaAnimando, setEstaAnimando] = useState(false);

  /**
   * ============================================
   * Função: Avançar para Próximo Slide
   ============================================
   * Move o carrossel para o próximo slide de forma cíclica
   * Se estiver no último slide, volta para o primeiro
   */
  const avancarSlide = () => {
    // Bloqueia clique durante animação
    if (estaAnimando) return;
    setEstaAnimando(true);

    // Calcula próximo índice de forma cíclica (volta ao início se for o último)
    setIndiceAtual((indiceAnterior) => (indiceAnterior + 1) % categories.length);
  };

  /**
   * ============================================
   * Função: Voltar para Slide Anterior
   ============================================
   * Move o carrossel para o slide anterior de forma cíclica
   * Se estiver no primeiro slide, vai para o último
   */
  const voltarSlide = () => {
    // Bloqueia clique durante animação
    if (estaAnimando) return;
    setEstaAnimando(true);

    // Calcula índice anterior de forma cíclica
    setIndiceAtual((indiceAnterior) =>
      indiceAnterior === 0 ? categories.length - 1 : indiceAnterior - 1
    );
  };

  /**
   * ============================================
   * Efeito: Rotação Automática do Carrossel
   ============================================
   * Executado sempre que o índice atual ou estado de animação muda
   * Configura um intervalo que avança o slide automaticamente
   */
  useEffect(() => {
    // Cria um intervalo que avança o slide a cada 5 segundos
    const temporizador = setInterval(() => {
      avancarSlide();
    }, 5000);

    // Cleanup: limpa o intervalo quando o componente é desmontado
    // ou quando as dependências mudam
    return () => clearInterval(temporizador);
  }, [indiceAtual, estaAnimando]);

  /**
   * ============================================
   * Efeito: Resetar Estado de Animação
   ============================================
   * Após cada animação, reseta o estado para permitir nova transição
   */
  useEffect(() => {
    if (estaAnimando) {
      // Após 500ms (duração da animação), permite nova transição
      const temporizador = setTimeout(() => {
        setEstaAnimando(false);
      }, 500);
      return () => clearTimeout(temporizador);
    }
  }, [estaAnimando]);

  /**
   * ============================================
   * Função: Tratar Clique em Categoria
   ============================================
   * Dispara o callback para selecionar a categoria clicada
   *
   * @param {Object} categoria - Objeto da categoria selecionada
   */
  const tratarCliqueCategoria = (categoria) => {
    onCategorySelect(categoria.id);
  };

  /**
   * ============================================
   * Renderização do Carrossel
   ============================================
   */
  return (
    <div className="carousel-container">
      {/* Wrapper que contém os elementos do carrossel */}
      <div className="carousel-wrapper">
        {/* Botão de navegação anterior */}
        <button className="carousel-button prev" onClick={voltarSlide}>
          &#10094; {/* Símbolo de seta para esquerda */}
        </button>

        {/* Container da faixa de slides */}
        <div className="carousel-track-container">
          {/* Track que move os slides horizontalmente */}
          <div
            className="carousel-track"
            style={{
              // Move o track para a esquerda baseado no índice atual
              transform: `translateX(-${indiceAtual * (100 / categories.length)}%)`,
              // Largura total baseada no número de categorias
              width: `${categories.length * 100}%`
            }}
          >
            {/* Mapeia cada categoria para um slide */}
            {categories.map((categoria, indice) => (
              <div
                key={categoria.id}
                className="carousel-slide"
                style={{ width: `${100 / categories.length}%` }}
              >
                {/* Item clicável da categoria */}
                <div
                  className="carousel-item"
                  onClick={() => tratarCliqueCategoria(categoria)}
                >
                  {/* Imagem da categoria */}
                  <img
                    src={categoria.image}
                    alt={categoria.name}
                    className="carousel-image"
                  />
                  {/* Overlay com nome da categoria */}
                  <div className="carousel-overlay">
                    <h3 className="carousel-title">{categoria.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de navegação próximo */}
        <button className="carousel-button next" onClick={avancarSlide}>
          &#10095; {/* Símbolo de seta para direita */}
        </button>
      </div>

      {/* Indicadores de posição (dots) */}
      <div className="carousel-dots">
        {categories.map((_, indice) => (
          <button
            key={indice}
            // Adiciona classe 'active' se for o slide atual
            className={`carousel-dot ${indice === indiceAtual ? 'active' : ''}`}
            onClick={() => {
              setIndiceAtual(indice);
              setEstaAnimando(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
