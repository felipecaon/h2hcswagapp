import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Camiseta, Swag, Distribuicao, TamanhoCamiseta } from '../types';
import { sampleCamisetas, sampleSwags, sampleDistribuicoes } from '../data/sampleData';

interface AppState {
  camisetas: Camiseta[];
  swags: Swag[];
  distribuicoes: Distribuicao[];
}

type AppAction =
  | { type: 'SET_CAMISETAS'; payload: Camiseta[] }
  | { type: 'ADD_CAMISETA'; payload: Camiseta }
  | { type: 'UPDATE_CAMISETA'; payload: { id: string; quantidade: number } }
  | { type: 'SET_SWAGS'; payload: Swag[] }
  | { type: 'ADD_SWAG'; payload: Swag }
  | { type: 'UPDATE_SWAG'; payload: { id: string; quantidade: number } }
  | { type: 'ADD_DISTRIBUICAO'; payload: Distribuicao }
  | { type: 'INITIALIZE_DATA' }
  | { type: 'LOAD_SAMPLE_DATA' };

const initialState: AppState = {
  camisetas: [],
  swags: [],
  distribuicoes: []
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CAMISETAS':
      return { ...state, camisetas: action.payload };
    

    
    case 'ADD_CAMISETA':
      return { ...state, camisetas: [...state.camisetas, action.payload] };
    
    case 'UPDATE_CAMISETA':
      return {
        ...state,
        camisetas: state.camisetas.map(camiseta =>
          camiseta.id === action.payload.id
            ? { ...camiseta, quantidadeAtual: action.payload.quantidade }
            : camiseta
        )
      };
    
    case 'SET_SWAGS':
      return { ...state, swags: action.payload };
    
    case 'ADD_SWAG':
      return { ...state, swags: [...state.swags, action.payload] };
    
    case 'UPDATE_SWAG':
      return {
        ...state,
        swags: state.swags.map(swag =>
          swag.id === action.payload.id
            ? { ...swag, quantidadeAtual: action.payload.quantidade }
            : swag
        )
      };
    
    case 'ADD_DISTRIBUICAO':
      return { ...state, distribuicoes: [...state.distribuicoes, action.payload] };
    
    case 'INITIALIZE_DATA':
      const tamanhos: TamanhoCamiseta[] = ['PP', 'P', 'M', 'L', 'XL', 'XXL'];
      const sponsors = ['Bugcrowd', 'Intigriti', 'HackerOne'];
      
      // Criar combinações de tamanho + sponsor
      const camisetasIniciais: Camiseta[] = [];
      tamanhos.forEach(tamanho => {
        sponsors.forEach(sponsor => {
          camisetasIniciais.push({
            id: `${tamanho}-${sponsor.toLowerCase()}`,
            tamanho,
            sponsor,
            quantidadeInicial: 0,
            quantidadeAtual: 0,
            quantidadeDistribuida: 0
          });
        });
      });
      
      return {
        ...state,
        camisetas: camisetasIniciais,
        swags: [],
        distribuicoes: []
      };
    
    case 'LOAD_SAMPLE_DATA':
      return {
        ...state,
        camisetas: sampleCamisetas,
        swags: sampleSwags,
        distribuicoes: sampleDistribuicoes
      };
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
