export interface Wallets {
  current_page?: number;
  data?: Wallet[];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: any;
  path?: string;
  per_page?: number;
  prev_page_url?: any;
  to?: number;
  total?: number;
}

export interface Wallet {
  id: number;
  nome: string;
  user_id: number;
  hash: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}
