import { Camiseta, Swag, Distribuicao } from '../types';

// Dados de exemplo para camisetas (combinando tamanho + sponsor)
export const sampleCamisetas: Camiseta[] = [
  // Bugcrowd - Tamanhos mais populares
  {
    id: 'M-bugcrowd',
    tamanho: 'M',
    sponsor: 'Bugcrowd',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-bugcrowd',
    tamanho: 'L',
    sponsor: 'Bugcrowd',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-bugcrowd',
    tamanho: 'XL',
    sponsor: 'Bugcrowd',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  
  // Intigriti - Variedade de tamanhos
  {
    id: 'P-intigriti',
    tamanho: 'P',
    sponsor: 'Intigriti',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-intigriti',
    tamanho: 'M',
    sponsor: 'Intigriti',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-intigriti',
    tamanho: 'L',
    sponsor: 'Intigriti',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-intigriti',
    tamanho: 'XL',
    sponsor: 'Intigriti',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  
  // HackerOne - Foco em tamanhos grandes
  {
    id: 'M-hackerone',
    tamanho: 'M',
    sponsor: 'HackerOne',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-hackerone',
    tamanho: 'L',
    sponsor: 'HackerOne',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-hackerone',
    tamanho: 'XL',
    sponsor: 'HackerOne',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XXL-hackerone',
    tamanho: 'XXL',
    sponsor: 'HackerOne',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  
  // BugHunt - Tamanhos variados
  {
    id: 'P-bughunt',
    tamanho: 'P',
    sponsor: 'BugHunt',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-bughunt',
    tamanho: 'M',
    sponsor: 'BugHunt',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-bughunt',
    tamanho: 'L',
    sponsor: 'BugHunt',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  
  // PortSwigger - Tamanhos padrão
  {
    id: 'M-portswigger',
    tamanho: 'M',
    sponsor: 'PortSwigger',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-portswigger',
    tamanho: 'L',
    sponsor: 'PortSwigger',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-portswigger',
    tamanho: 'XL',
    sponsor: 'PortSwigger',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  }
];

// Dados de exemplo para swags
export const sampleSwags: Swag[] = [
  {
    id: '1',
    nome: 'Licença Caido',
    tipo: 'LICENCA',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: '2',
    nome: 'Licença PentesterLab',
    tipo: 'LICENCA',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: '3',
    nome: 'Licença HackTheBox',
    tipo: 'LICENCA',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: '4',
    nome: 'Caneca BBV',
    tipo: 'OUTRO',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: '5',
    nome: 'Coin BBV',
    tipo: 'OUTRO',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  }
];

// Dados de exemplo para distribuições (vazio - sem distribuições iniciais)
export const sampleDistribuicoes: Distribuicao[] = [];
