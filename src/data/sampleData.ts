import { Camiseta, Swag, Distribuicao } from '../types';

// Dados de exemplo para camisetas (combinando tamanho + sponsor)
export const sampleCamisetas: Camiseta[] = [
  // Bugcrowd - Tamanhos mais populares
  {
    id: 'M-bugcrowd',
    tamanho: 'M',
    sponsor: 'Bugcrowd',
    quantidadeInicial: 50,
    quantidadeAtual: 42,
    quantidadeDistribuida: 8
  },
  {
    id: 'L-bugcrowd',
    tamanho: 'L',
    sponsor: 'Bugcrowd',
    quantidadeInicial: 45,
    quantidadeAtual: 38,
    quantidadeDistribuida: 7
  },
  {
    id: 'XL-bugcrowd',
    tamanho: 'XL',
    sponsor: 'Bugcrowd',
    quantidadeInicial: 40,
    quantidadeAtual: 35,
    quantidadeDistribuida: 5
  },
  
  // Intigriti - Variedade de tamanhos
  {
    id: 'P-intigriti',
    tamanho: 'P',
    sponsor: 'Intigriti',
    quantidadeInicial: 30,
    quantidadeAtual: 25,
    quantidadeDistribuida: 5
  },
  {
    id: 'M-intigriti',
    tamanho: 'M',
    sponsor: 'Intigriti',
    quantidadeInicial: 55,
    quantidadeAtual: 48,
    quantidadeDistribuida: 7
  },
  {
    id: 'L-intigriti',
    tamanho: 'L',
    sponsor: 'Intigriti',
    quantidadeInicial: 50,
    quantidadeAtual: 43,
    quantidadeDistribuida: 7
  },
  {
    id: 'XL-intigriti',
    tamanho: 'XL',
    sponsor: 'Intigriti',
    quantidadeInicial: 35,
    quantidadeAtual: 28,
    quantidadeDistribuida: 7
  },
  
  // HackerOne - Foco em tamanhos grandes
  {
    id: 'M-hackerone',
    tamanho: 'M',
    sponsor: 'HackerOne',
    quantidadeInicial: 60,
    quantidadeAtual: 52,
    quantidadeDistribuida: 8
  },
  {
    id: 'L-hackerone',
    tamanho: 'L',
    sponsor: 'HackerOne',
    quantidadeInicial: 55,
    quantidadeAtual: 47,
    quantidadeDistribuida: 8
  },
  {
    id: 'XL-hackerone',
    tamanho: 'XL',
    sponsor: 'HackerOne',
    quantidadeInicial: 45,
    quantidadeAtual: 38,
    quantidadeDistribuida: 7
  },
  {
    id: 'XXL-hackerone',
    tamanho: 'XXL',
    sponsor: 'HackerOne',
    quantidadeInicial: 40,
    quantidadeAtual: 32,
    quantidadeDistribuida: 8
  },
  
  // BugHunt - Tamanhos variados
  {
    id: 'P-bughunt',
    tamanho: 'P',
    sponsor: 'BugHunt',
    quantidadeInicial: 25,
    quantidadeAtual: 20,
    quantidadeDistribuida: 5
  },
  {
    id: 'M-bughunt',
    tamanho: 'M',
    sponsor: 'BugHunt',
    quantidadeInicial: 40,
    quantidadeAtual: 35,
    quantidadeDistribuida: 5
  },
  {
    id: 'L-bughunt',
    tamanho: 'L',
    sponsor: 'BugHunt',
    quantidadeInicial: 35,
    quantidadeAtual: 30,
    quantidadeDistribuida: 5
  },
  
  // PortSwigger - Tamanhos padrão
  {
    id: 'M-portswigger',
    tamanho: 'M',
    sponsor: 'PortSwigger',
    quantidadeInicial: 35,
    quantidadeAtual: 30,
    quantidadeDistribuida: 5
  },
  {
    id: 'L-portswigger',
    tamanho: 'L',
    sponsor: 'PortSwigger',
    quantidadeInicial: 30,
    quantidadeAtual: 25,
    quantidadeDistribuida: 5
  },
  {
    id: 'XL-portswigger',
    tamanho: 'XL',
    sponsor: 'PortSwigger',
    quantidadeInicial: 25,
    quantidadeAtual: 20,
    quantidadeDistribuida: 5
  }
];

// Dados de exemplo para swags
export const sampleSwags: Swag[] = [
  {
    id: '1',
    nome: 'Licença Caido',
    tipo: 'LICENCA',
    quantidadeInicial: 25,
    quantidadeAtual: 20,
    quantidadeDistribuida: 5
  },
  {
    id: '2',
    nome: 'Licença PentesterLab',
    tipo: 'LICENCA',
    quantidadeInicial: 30,
    quantidadeAtual: 25,
    quantidadeDistribuida: 5
  },
  {
    id: '3',
    nome: 'Licença HackTheBox',
    tipo: 'LICENCA',
    quantidadeInicial: 40,
    quantidadeAtual: 35,
    quantidadeDistribuida: 5
  },
  {
    id: '4',
    nome: 'Caneca BBV',
    tipo: 'CANECA',
    quantidadeInicial: 100,
    quantidadeAtual: 75,
    quantidadeDistribuida: 25
  },
  {
    id: '5',
    nome: 'Coin BBV',
    tipo: 'OUTRO',
    quantidadeInicial: 200,
    quantidadeAtual: 150,
    quantidadeDistribuida: 50
  }
];

// Dados de exemplo para distribuições
export const sampleDistribuicoes: Distribuicao[] = [
  {
    id: '1',
    swagId: '1',
    swagNome: 'Licença Caido',
    swagTipo: 'LICENCA',
    quantidade: 1,
    nomeGanhador: 'João Silva',
    emailGanhador: 'joao.silva@email.com',
    data: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    swagId: '2',
    swagNome: 'Licença PentesterLab',
    swagTipo: 'LICENCA',
    quantidade: 1,
    nomeGanhador: 'Maria Santos',
    emailGanhador: 'maria.santos@email.com',
    data: new Date('2024-01-15T11:00:00')
  },
  {
    id: '3',
    swagId: '3',
    swagNome: 'Licença HackTheBox',
    swagTipo: 'LICENCA',
    quantidade: 1,
    nomeGanhador: 'Pedro Costa',
    emailGanhador: 'pedro.costa@email.com',
    data: new Date('2024-01-15T11:15:00')
  },
  {
    id: '4',
    swagId: '4',
    swagNome: 'Caneca BBV',
    swagTipo: 'CANECA',
    quantidade: 5,
    data: new Date('2024-01-15T14:20:00')
  },
  {
    id: '5',
    swagId: '5',
    swagNome: 'Coin BBV',
    swagTipo: 'OUTRO',
    quantidade: 10,
    data: new Date('2024-01-15T15:00:00')
  }
];
