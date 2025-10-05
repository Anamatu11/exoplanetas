import './index.css';
import AccessibilityBar from './components/AccessibilityBar';
import CommunitySection from './components/CommunitySection';
import Educators from './components/Educators'; 
import Descubrir from './components/Descubrir'; 

// Componente Home dentro del mismo archivo
const HomeSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Descubre Nuevos Mundos en el Cosmos</h1>
        <div className="separator"></div>
        <p className="hero-description">
          Únete a miles de exploradores cósmicos en la búsqueda de exoplanetas. 
          Tu contribución puede llevar al descubrimiento del próximo mundo habitable.
        </p>
        <div className="hero-buttons">
          <a href="#Descubrir" className="btn btn-primary">Comenzar Exploración</a>
          <a href="#demo" className="btn btn-secondary">Ver Demo</a>
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-header">
          <div className="logo-section">
            <div className="main-logo">COSMIC EXPLORERS</div>
            <div className="subtitle">Plataforma de Ciencia Ciudadana para Descubrimiento de Exoplanetas</div>
          </div>
          <a href="#login" className="login-btn">Iniciar Sesión</a>
        </div>
        
        <ul className="nav-main">
          <li><a href="#home">Home</a></li>
          <li><a href="#Descubrir">Descubrir</a></li>
          <li><a href="#comunidad">Comunidad</a></li>
          <li><a href="#educadores">Aprender</a></li>
        </ul>
      </nav>

      {/* Módulos de contenido - EN ORDEN CORRECTO */}
      <section id="home">
        <HomeSection />
      </section>
      
      <CommunitySection />
      
      <section id="Descubrir">
        <Descubrir/>
      </section>

      <section id="educadores">
        <Educators />
      </section>

      <AccessibilityBar />
    </div>
  );
}

export default App;