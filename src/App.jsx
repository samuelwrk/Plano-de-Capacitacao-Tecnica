/**
 * ============================================
 * Aplicação Principal - Electro Store
 * ============================================
 *
 * Este é o componente raiz da aplicação de e-commerce Electro Store.
 * Responsável por:
 * - Gerenciar o estado global da aplicação (loading, modais, navegação)
 * - Orquestrar a exibição dos componentes principais
 * - Controlar o fluxo de navegação entre categorias e produtos
 * - Gerenciar a abertura/fechamento de modais (carrinho, checkout, detalhes)
 *
 * Tecnologias utilizadas:
 * - React Hooks (useState, useCallback, useEffect)
 * - Context API para gerenciamento do carrinho
 * - Componentes funcionais com arrow functions
 */

import React, { useState, useCallback } from 'react';

// Importação do Provider do contexto do carrinho
// Fornece funcionalidades do carrinho para todos os componentes filhos
import { ProvedorCarrinho } from './context/CartContext';

// Importação dos componentes da interface (nomes originais para compatibilidade)
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Header from './components/Header/Header';
import Carousel from './components/Carousel/Carousel';
import ProductList from './components/ProductList/ProductList';
import ProductModal from './components/ProductModal/ProductModal';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import SuccessMessage from './components/SuccessMessage/SuccessMessage';

// Importação dos dados de produtos e categorias
import { products, categories } from './data/products';

// Importação dos estilos globais do componente App
import './App.css';

/**
 * ============================================
 * Componente: ConteudoPrincipal
 * ============================================
 * Contém toda a lógica de estado e renderização da aplicação
 * Este componente interno é usado para separar a lógica do App Provider
 */
function ConteudoPrincipal() {
  /**
   * ============================================
   * Estados da Aplicação
   * ============================================
   * useState: gerencia o estado de cada funcionalidade da aplicação
   */

  // Estado que controla se a tela de carregamento está ativa
  const [estaCarregando, setEstaCarregando] = useState(true);

  // Estado que indica se o carregamento foi concluído (para animação)
  const [carregamentoConcluido, setCarregamentoConcluido] = useState(false);

  // Estado que armazena a categoria atualmente selecionada pelo usuário
  // 'all' = todas as categorias, caso contrário = ID da categoria específica
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('all');

  // Estado que armazena o produto atualmente selecionado para visualização no modal
  // null = nenhum produto selecionado, objeto produto = modal aberto
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Estados booleanos para controle de visibilidade dos modais
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [mostrarCheckout, setMostrarCheckout] = useState(false);
  const [mostrarSucesso, setMostrarSucesso] = useState(false);

  /**
   * ============================================
   * Função: Tratar Conclusão do Carregamento
   * ============================================
   * Callback executado quando a tela de carregamento termina sua animação
   * Usa useCallback para evitar recriações desnecessárias da função
   *
   * Fluxo:
   * 1. Marca carregamento como concluído (ativa animação de saída)
   * 2. Aguarda 500ms para animação de fade-out
   * 3. Remove completamente a tela de carregamento
   */
  const tratarCarregamentoConcluido = useCallback(() => {
    setCarregamentoConcluido(true);
    setTimeout(() => {
      setEstaCarregando(false);
    }, 500);
  }, []);

  /**
   * ============================================
   * Função: Tratar Seleção de Categoria
   * ============================================
   * Atualiza a categoria selecionada para filtrar os produtos exibidos
   *
   * @param {string} idCategoria - ID da categoria selecionada
   */
  const tratarSelecaoCategoria = (idCategoria) => {
    setCategoriaSelecionada(idCategoria);
  };

  /**
   * ============================================
   * Função: Tratar Clique em Produto
   * ============================================
   * Abre o modal de detalhes do produto clicado
   *
   * @param {Object} produto - Objeto do produto selecionado
   */
  const tratarCliqueProduto = (produto) => {
    setProdutoSelecionado(produto);
  };

  /**
   * ============================================
   * Função: Tratar Fechamento do Modal
   * ============================================
   * Fecha o modal de detalhes do produto
   */
  const tratarFechamentoModal = () => {
    setProdutoSelecionado(null);
  };

  /**
   * ============================================
   * Funções de Controle do Carrinho
   * ============================================
   * Abre/fecha o modal do carrinho de compras
   */
  const tratarCliqueCarrinho = () => {
    setMostrarCarrinho(true);
  };

  const tratarFechamentoCarrinho = () => {
    setMostrarCarrinho(false);
  };

  /**
   * ============================================
   * Funções de Controle do Checkout
   * ============================================
   * Gerencia a transição entre carrinho e checkout
   */
  const tratarCheckout = () => {
    setMostrarCarrinho(false);
    setMostrarCheckout(true);
  };

  const tratarFechamentoCheckout = () => {
    setMostrarCheckout(false);
  };

  /**
   * ============================================
   * Função: Tratar Compra Concluída
   * ============================================
   * Executada após finalização bem-sucedida da compra
   * Exibe mensagem de sucesso e reseta o estado da aplicação
   */
  const tratarCompraConcluida = () => {
    setMostrarCheckout(false);
    setMostrarSucesso(true);

    // Após 3 segundos, fecha a mensagem e volta para tela inicial
    setTimeout(() => {
      setMostrarSucesso(false);
      setCategoriaSelecionada('all');
    }, 3000);
  };

  /**
   * ============================================
   * Função: Obter Produtos Filtrados
   * ============================================
   * Retorna a lista de produtos baseada na categoria selecionada
   * Se nenhuma categoria específica estiver selecionada, retorna todos os produtos
   *
   * @returns {Array} Array de produtos filtrados
   */
  const obterProdutosFiltrados = () => {
    if (categoriaSelecionada === 'all') {
      return products;
    }
    return products.filter(produto => produto.category === categoriaSelecionada);
  };

  /**
   * ============================================
   * Renderização da Interface
   * ============================================
   */
  return (
    <div className="app">
      {/* Tela de carregamento exibida durante os primeiros 8 segundos */}
      {estaCarregando && (
        <LoadingScreen onLoaded={tratarCarregamentoConcluido} />
      )}

      {/* Conteúdo principal exibido após carregamento completo */}
      {!estaCarregando && (
        <>
          {/* Cabeçalho com logo e botão do carrinho */}
          <Header
            onCartClick={tratarCliqueCarrinho}
            onLogoClick={() => setCategoriaSelecionada('all')}
          />

          {/* Conteúdo principal da página */}
          <main className="main-content">
            {/* Seção do carrossel de categorias */}
            <section className="carousel-section">
              <Carousel
                categories={categories}
                onCategorySelect={tratarSelecaoCategoria}
              />
            </section>

            {/* Seção de listagem de produtos */}
            <section className="products-section">
              {/* Título dinâmico baseado na categoria selecionada */}
              <h2 className="section-title">
                {categoriaSelecionada === 'all'
                  ? 'Todos os Produtos'
                  : categories.find(c => c.id === categoriaSelecionada)?.name || 'Produtos'}
              </h2>

              {/* Lista de produtos filtrados */}
              <ProductList
                products={obterProdutosFiltrados()}
                onProductClick={tratarCliqueProduto}
              />
            </section>
          </main>

          {/* Modal de detalhes do produto */}
          {produtoSelecionado && (
            <ProductModal
              product={produtoSelecionado}
              onClose={tratarFechamentoModal}
            />
          )}

          {/* Modal do carrinho de compras */}
          {mostrarCarrinho && (
            <Cart
              onClose={tratarFechamentoCarrinho}
              onCheckout={tratarCheckout}
            />
          )}

          {/* Modal de checkout/finalização de compra */}
          {mostrarCheckout && (
            <Checkout
              onClose={tratarFechamentoCheckout}
              onPurchaseComplete={tratarCompraConcluida}
            />
          )}

          {/* Mensagem de sucesso após compra finalizada */}
          {mostrarSucesso && (
            <SuccessMessage />
          )}
        </>
      )}
    </div>
  );
}

/**
 * ============================================
 * Componente: App
 * ============================================
 * Componente raiz que envolve toda a aplicação
 * Fornece o contexto do carrinho para toda a árvore de componentes
 */
function App() {
  return (
    <ProvedorCarrinho>
      <ConteudoPrincipal />
    </ProvedorCarrinho>
  );
}

export default App;
