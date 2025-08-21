import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Camiseta, Swag, Distribuicao, TamanhoCamiseta, SexoCamiseta } from '../types';
import { sampleCamisetas, sampleSwags, sampleDistribuicoes } from '../data/sampleData';
import { Sponsor } from '../services/firestore';

interface AppState {
  camisetas: Camiseta[];
  swags: Swag[];
  distribuicoes: Distribuicao[];
  sponsors: Sponsor[];
}

type AppAction =
  | { type: 'SET_CAMISETAS'; payload: Camiseta[] }
  | { type: 'ADD_CAMISETA'; payload: Camiseta }
  | { type: 'UPDATE_CAMISETA'; payload: { id: string; quantidade: number } }
  | { type: 'SET_SWAGS'; payload: Swag[] }
  | { type: 'ADD_SWAG'; payload: Swag }
  | { type: 'UPDATE_SWAG'; payload: { id: string; quantidade: number } }
  | { type: 'ADD_DISTRIBUICAO'; payload: Distribuicao }
  | { type: 'SET_DISTRIBUICOES'; payload: Distribuicao[] }
  | { type: 'SET_SPONSORS'; payload: Sponsor[] }
  | { type: 'ADD_SPONSOR'; payload: Sponsor }
  | { type: 'UPDATE_SPONSOR'; payload: Sponsor }
  | { type: 'DELETE_SPONSOR'; payload: string }
  | { type: 'INITIALIZE_DATA' }
  | { type: 'LOAD_SAMPLE_DATA' };

const initialState: AppState = {
  camisetas: [],
  swags: [],
  distribuicoes: [],
  sponsors: []
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
    
    case 'SET_DISTRIBUICOES':
      return { ...state, distribuicoes: action.payload };
    
    case 'SET_SPONSORS':
      return { ...state, sponsors: action.payload };
    
    case 'ADD_SPONSOR':
      return { ...state, sponsors: [...state.sponsors, action.payload] };
    
    case 'UPDATE_SPONSOR':
      return {
        ...state,
        sponsors: state.sponsors.map(sponsor =>
          sponsor.id === action.payload.id ? action.payload : sponsor
        )
      };
    
    case 'DELETE_SPONSOR':
      return {
        ...state,
        sponsors: state.sponsors.filter(sponsor => sponsor.id !== action.payload)
      };
    
    case 'INITIALIZE_DATA':
      const tamanhos: TamanhoCamiseta[] = ['PP', 'P', 'M', 'L', 'XL', 'XXL'];
      const sponsors = ['Bugcrowd', 'Intigriti', 'HackerOne'];
      const sexos: SexoCamiseta[] = ['homem', 'mulher'];
      
      // Criar combinações de tamanho + sponsor + sexo
      const camisetasIniciais: Camiseta[] = [];
      tamanhos.forEach(tamanho => {
        sponsors.forEach(sponsor => {
          sexos.forEach(sexo => {
            camisetasIniciais.push({
              id: `${tamanho}-${sponsor.toLowerCase()}-${sexo}`,
              tamanho,
              sponsor,
              sexo,
              quantidadeInicial: 0,
              quantidadeAtual: 0,
              quantidadeDistribuida: 0
            });
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
