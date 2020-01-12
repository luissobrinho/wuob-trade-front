export interface Tickets {
  current_page: number;
  data: Ticket[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface Ticket {
  id: number;
  nome: string;
  valor: string;
  quantidade: string;
  cor: string;
  icon: string;
  moeda: string;
  created_at: string;
  updated_at: string;
}