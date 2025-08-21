import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';

import { CamisetasTab } from './components/CamisetasTab';
import { SwagsTab } from './components/SwagsTab';
import { SponsorTab } from './components/SponsorTab';

import { Menu, X, Sparkles } from 'lucide-react';
import { initializeFirebase } from './config/firebase';
import { firestoreService } from './services/firestore';

function AppContent() {
  const { dispatch } = useApp();
  const [activeSection, setActiveSection] = useState('camisetas');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Initialize Firebase and load data from Firestore
    const initializeApp = async () => {
      try {
        // eslint-disable-next-line no-console
        console.log('Initializing Firebase...');
        // Initialize Firebase
        await initializeFirebase();
        // eslint-disable-next-line no-console
        console.log('Firebase initialized successfully');
        
        // Load data from Firestore
        const [camisetas, swags, distribuicoes, sponsors] = await Promise.all([
          firestoreService.getCamisetas(),
          firestoreService.getSwags(),
          firestoreService.getDistribuicoes(),
          firestoreService.getSponsors()
        ]);
        
        // Update state with Firestore data
        dispatch({ type: 'SET_CAMISETAS', payload: camisetas });
        dispatch({ type: 'SET_SWAGS', payload: swags });
        dispatch({ type: 'SET_DISTRIBUICOES', payload: distribuicoes });
        dispatch({ type: 'SET_SPONSORS', payload: sponsors });
        
        // Set up real-time subscriptions
        const unsubscribeCamisetas = firestoreService.subscribeToCamisetas((camisetas) => {
          dispatch({ type: 'SET_CAMISETAS', payload: camisetas });
        });
        
        const unsubscribeSwags = firestoreService.subscribeToSwags((swags) => {
          dispatch({ type: 'SET_SWAGS', payload: swags });
        });
        
        const unsubscribeDistribuicoes = firestoreService.subscribeToDistribuicoes((distribuicoes) => {
          dispatch({ type: 'SET_DISTRIBUICOES', payload: distribuicoes });
        });
        
        const unsubscribeSponsors = firestoreService.subscribeToSponsors((sponsors) => {
          dispatch({ type: 'SET_SPONSORS', payload: sponsors });
        });
        
        // Cleanup subscriptions on unmount
        return () => {
          unsubscribeCamisetas();
          unsubscribeSwags();
          unsubscribeDistribuicoes();
          unsubscribeSponsors();
        };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to initialize Firebase:', error);
        // Initialize with empty data if Firebase fails
        dispatch({ type: 'INITIALIZE_DATA' });
      }
    };
    
    initializeApp();
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
      case 'sponsors':
        return <SponsorTab />;
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
                BBV Swag 
              </div>
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
