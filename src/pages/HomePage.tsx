/**
 * HomePage - Página inicial com accordion horizontal de categorias
 */

import HorizontalAccordion from '../components/home/HorizontalAccordion/HorizontalAccordion';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="home-page__hero">
        <h1 className="home-page__title">NYT News Reader</h1>
        <p className="home-page__subtitle">
          As principais notícias do New York Times em tempo real
        </p>
      </section>

      <section className="home-page__categories">
        <h2 className="home-page__section-title">Explore as Categorias</h2>
        <HorizontalAccordion />
      </section>
    </div>
  );
};

export default HomePage;
