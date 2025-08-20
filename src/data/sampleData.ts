import { Camiseta, Swag, Distribuicao } from '../types';

// Dados de exemplo para camisetas (combinando tamanho + sponsor + sexo)
export const sampleCamisetas: Camiseta[] = [
  // Bugcrowd - Todos os tamanhos para homens e mulheres
  {
    id: 'PP-bugcrowd-homem',
    tamanho: 'PP',
    sponsor: 'Bugcrowd',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'P-bugcrowd-homem',
    tamanho: 'P',
    sponsor: 'Bugcrowd',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-bugcrowd-homem',
    tamanho: 'M',
    sponsor: 'Bugcrowd',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-bugcrowd-homem',
    tamanho: 'L',
    sponsor: 'Bugcrowd',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-bugcrowd-homem',
    tamanho: 'XL',
    sponsor: 'Bugcrowd',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XXL-bugcrowd-homem',
    tamanho: 'XXL',
    sponsor: 'Bugcrowd',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'PP-bugcrowd-mulher',
    tamanho: 'PP',
    sponsor: 'Bugcrowd',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'P-bugcrowd-mulher',
    tamanho: 'P',
    sponsor: 'Bugcrowd',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-bugcrowd-mulher',
    tamanho: 'M',
    sponsor: 'Bugcrowd',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-bugcrowd-mulher',
    tamanho: 'L',
    sponsor: 'Bugcrowd',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-bugcrowd-mulher',
    tamanho: 'XL',
    sponsor: 'Bugcrowd',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XXL-bugcrowd-mulher',
    tamanho: 'XXL',
    sponsor: 'Bugcrowd',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  
  // Intigriti - Todos os tamanhos para homens e mulheres
  {
    id: 'PP-intigriti-homem',
    tamanho: 'PP',
    sponsor: 'Intigriti',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'P-intigriti-homem',
    tamanho: 'P',
    sponsor: 'Intigriti',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-intigriti-homem',
    tamanho: 'M',
    sponsor: 'Intigriti',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-intigriti-homem',
    tamanho: 'L',
    sponsor: 'Intigriti',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-intigriti-homem',
    tamanho: 'XL',
    sponsor: 'Intigriti',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XXL-intigriti-homem',
    tamanho: 'XXL',
    sponsor: 'Intigriti',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'PP-intigriti-mulher',
    tamanho: 'PP',
    sponsor: 'Intigriti',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'P-intigriti-mulher',
    tamanho: 'P',
    sponsor: 'Intigriti',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-intigriti-mulher',
    tamanho: 'M',
    sponsor: 'Intigriti',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-intigriti-mulher',
    tamanho: 'L',
    sponsor: 'Intigriti',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-intigriti-mulher',
    tamanho: 'XL',
    sponsor: 'Intigriti',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XXL-intigriti-mulher',
    tamanho: 'XXL',
    sponsor: 'Intigriti',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  
  // HackerOne - Todos os tamanhos para homens e mulheres
  {
    id: 'PP-hackerone-homem',
    tamanho: 'PP',
    sponsor: 'HackerOne',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'P-hackerone-homem',
    tamanho: 'P',
    sponsor: 'HackerOne',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-hackerone-homem',
    tamanho: 'M',
    sponsor: 'HackerOne',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-hackerone-homem',
    tamanho: 'L',
    sponsor: 'HackerOne',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-hackerone-homem',
    tamanho: 'XL',
    sponsor: 'HackerOne',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XXL-hackerone-homem',
    tamanho: 'XXL',
    sponsor: 'HackerOne',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'PP-hackerone-mulher',
    tamanho: 'PP',
    sponsor: 'HackerOne',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'P-hackerone-mulher',
    tamanho: 'P',
    sponsor: 'HackerOne',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-hackerone-mulher',
    tamanho: 'M',
    sponsor: 'HackerOne',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-hackerone-mulher',
    tamanho: 'L',
    sponsor: 'HackerOne',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-hackerone-mulher',
    tamanho: 'XL',
    sponsor: 'HackerOne',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XXL-hackerone-mulher',
    tamanho: 'XXL',
    sponsor: 'HackerOne',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  
  // BugHunt - Todos os tamanhos para homens e mulheres
  {
    id: 'PP-bughunt-homem',
    tamanho: 'PP',
    sponsor: 'BugHunt',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'P-bughunt-homem',
    tamanho: 'P',
    sponsor: 'BugHunt',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-bughunt-homem',
    tamanho: 'M',
    sponsor: 'BugHunt',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-bughunt-homem',
    tamanho: 'L',
    sponsor: 'BugHunt',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-bughunt-homem',
    tamanho: 'XL',
    sponsor: 'BugHunt',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XXL-bughunt-homem',
    tamanho: 'XXL',
    sponsor: 'BugHunt',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'PP-bughunt-mulher',
    tamanho: 'PP',
    sponsor: 'BugHunt',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'P-bughunt-mulher',
    tamanho: 'P',
    sponsor: 'BugHunt',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-bughunt-mulher',
    tamanho: 'M',
    sponsor: 'BugHunt',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-bughunt-mulher',
    tamanho: 'L',
    sponsor: 'BugHunt',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-bughunt-mulher',
    tamanho: 'XL',
    sponsor: 'BugHunt',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XXL-bughunt-mulher',
    tamanho: 'XXL',
    sponsor: 'BugHunt',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  
  // PortSwigger - Todos os tamanhos para homens e mulheres
  {
    id: 'PP-portswigger-homem',
    tamanho: 'PP',
    sponsor: 'PortSwigger',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'P-portswigger-homem',
    tamanho: 'P',
    sponsor: 'PortSwigger',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-portswigger-homem',
    tamanho: 'M',
    sponsor: 'PortSwigger',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-portswigger-homem',
    tamanho: 'L',
    sponsor: 'PortSwigger',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-portswigger-homem',
    tamanho: 'XL',
    sponsor: 'PortSwigger',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XXL-portswigger-homem',
    tamanho: 'XXL',
    sponsor: 'PortSwigger',
    sexo: 'homem',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'PP-portswigger-mulher',
    tamanho: 'PP',
    sponsor: 'PortSwigger',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'P-portswigger-mulher',
    tamanho: 'P',
    sponsor: 'PortSwigger',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'M-portswigger-mulher',
    tamanho: 'M',
    sponsor: 'PortSwigger',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'L-portswigger-mulher',
    tamanho: 'L',
    sponsor: 'PortSwigger',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XL-portswigger-mulher',
    tamanho: 'XL',
    sponsor: 'PortSwigger',
    sexo: 'mulher',
    quantidadeInicial: 0,
    quantidadeAtual: 0,
    quantidadeDistribuida: 0
  },
  {
    id: 'XXL-portswigger-mulher',
    tamanho: 'XXL',
    sponsor: 'PortSwigger',
    sexo: 'mulher',
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
    quantidadeInicial: 10,
    quantidadeAtual: 10,
    quantidadeDistribuida: 0
  },
  {
    id: '2',
    nome: 'Licença PentesterLab',
    tipo: 'LICENCA',
    quantidadeInicial: 10,
    quantidadeAtual: 10,
    quantidadeDistribuida: 0
  },
  {
    id: '3',
    nome: 'Licença HackTheBox',
    tipo: 'LICENCA',
    quantidadeInicial: 10,
    quantidadeAtual: 10,
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
    quantidadeInicial: 10,
    quantidadeAtual: 10,
    quantidadeDistribuida: 0
  }
];

// Dados de exemplo para distribuições (vazio - sem distribuições iniciais)
export const sampleDistribuicoes: Distribuicao[] = [];
