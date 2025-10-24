export type StatusOrdem = 'ABERTA' | 'EM_ANDAMENTO' | 'AGUARDANDO_PECAS' | 'CONCLUIDA' | 'CANCELADA';

export interface Servico {
  id: string;
  descricao: string;
  valor: number;
}

export interface OrdemServico {
  id: string;
  numero: number;
  clienteId?: string;
  veiculoId?: string;
  dataAbertura: string;
  dataConclusao?: string;
  status: StatusOrdem;
  defeito?: string;
  observacoes?: string;
  servicos: Servico[];
  valorTotal: number;
}

export interface Cliente {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  dataCadastro: string;
}
