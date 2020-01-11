export interface Plans {
  current_page: number;
  data: Plan[];
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

export interface Plan {
  id: number;
  nome: string;
  valor: string;
  cor: string;
  icon: string;
  moeda: string;
  indica: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}