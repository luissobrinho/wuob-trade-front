interface WithDrawals {
  current_page?: number;
  data?: WithDrawal[];
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

interface WithDrawal {
  id: number;
  user_id: number;
  carteira_id: number;
  valor: string;
  time_created: number;
  status: number;
  status_text: string;
  coin: string;
  amount: number;
  amountf: string;
  send_address?: string;
  send_txid: string;
  txid?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}