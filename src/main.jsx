/**
 * ============================================
 * Ponto de Entrada da Aplicação React
 * ============================================
 *
 * Este arquivo é o ponto de entrada principal da aplicação React.
 * Responsável por:
 * - Inicializar o React no DOM
 * - Renderizar o componente raiz (App)
 * - Aplicar o StrictMode para desenvolvimento seguro
 *
 * O ReactDOM.createRoot cria a raiz da árvore de componentes
 * e o método render() exibe o componente App no elemento
 * com id="root" no arquivo HTML.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Criação da raiz do React no elemento DOM com id="root"
// O elemento root é definido no arquivo index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode ativa verificações adicionais em modo de desenvolvimento
  // Ajuda a identificar ciclos de vida problemáticos e efeitos colaterais
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
