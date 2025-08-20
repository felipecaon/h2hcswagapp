export type TamanhoCamiseta = 'PP' | 'P' | 'M' | 'L' | 'XL' | 'XXL';
export type SexoCamiseta = 'homem' | 'mulher';

export interface Camiseta {
  id: string;
  tamanho: TamanhoCamiseta;
  sponsor: string;
  sexo: SexoCamiseta;
  quantidadeInicial: number;
  quantidadeAtual: number;
  quantidadeDistribuida: number;
}

export interface Swag {
  id: string;
  nome: string;
  tipo: 'LICENCA' | 'OUTRO';
  quantidadeInicial: number;
  quantidadeAtual: number;
  quantidadeDistribuida: number;
}

export interface Distribuicao {
  id: string;
  swagId: string;
  swagNome: string;
  swagTipo: string;
  quantidade: number;
  nomeGanhador?: string;
  emailGanhador?: string;
  data: Date;
}

export type EstoqueCamisetas = Record<TamanhoCamiseta, number>;
