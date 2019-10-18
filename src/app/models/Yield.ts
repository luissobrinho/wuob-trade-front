export interface Yields {
  current_page?: number;
  data?: Yield[];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: any;
  to?: number;
  total?: number;
}

export interface Yield {
  id: number;
  user_id: number;
  valor: string;
  investimento_usuario_id: number;
  movimentacao_investimento_id?: any;
  tipo: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}