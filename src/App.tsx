import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';

import { CamisetasTab } from './components/CamisetasTab';
import { SwagsTab } from './components/SwagsTab';

import { Menu, X, Sparkles } from 'lucide-react';
import { sampleCamisetas, sampleSwags, sampleDistribuicoes } from './data/sampleData';

function AppContent() {
  const { dispatch } = useApp();
  const [activeSection, setActiveSection] = useState('camisetas');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Inicializar dados ao carregar a aplicação
    dispatch({ type: 'INITIALIZE_DATA' });
    
    // Carregar dados salvos no localStorage
    const savedCamisetas = localStorage.getItem('camisetas');
    const savedSwags = localStorage.getItem('swags');
    const savedDistribuicoes = localStorage.getItem('distribuicoes');
    
    if (savedCamisetas) {
      dispatch({ type: 'SET_CAMISETAS', payload: JSON.parse(savedCamisetas) });
    }
    if (savedSwags) {
      dispatch({ type: 'SET_SWAGS', payload: JSON.parse(savedSwags) });
    }
    if (savedDistribuicoes) {
      const distribuicoes = JSON.parse(savedDistribuicoes).map((d: any) => ({
        ...d,
        data: new Date(d.data)
      }));
      dispatch({ type: 'ADD_DISTRIBUICAO', payload: distribuicoes[0] });
      if (distribuicoes.length > 1) {
        distribuicoes.slice(1).forEach((d: any) => {
          dispatch({ type: 'ADD_DISTRIBUICAO', payload: d });
        });
      }
    }
  }, [dispatch]);

  // Detectar tamanho da tela e ajustar sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Definir estado inicial baseado no tamanho da tela
    handleResize();

    // Adicionar listener para mudanças de tamanho
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'camisetas':
        return <CamisetasTab />;
      case 'swags':
        return <SwagsTab />;
      default:
        return <CamisetasTab />;
    }
  };

  return (
    <div className="app-layout">
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay active"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
      />
      
      <main className={`main-content ${!sidebarOpen ? 'full-width' : ''}`}>
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="flex items-center gap-4">
              <button
                className="mobile-menu-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="header-title">
                <Sparkles className="w-6 h-6 text-blue-600" />
                Swags Manager Pro
              </div>
            </div>
            
            <div className="header-actions">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  dispatch({ type: 'LOAD_SAMPLE_DATA' });
                  localStorage.setItem('camisetas', JSON.stringify(sampleCamisetas));
                  localStorage.setItem('swags', JSON.stringify(sampleSwags));
                  localStorage.setItem('distribuicoes', JSON.stringify(sampleDistribuicoes));
                  alert('✨ Dados de exemplo carregados com sucesso!');
                }}
              >
                <Sparkles size={16} />
                Demo Data
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
