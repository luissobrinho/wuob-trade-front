export interface InvestmentResponse {
  tipo_investimento_id: string;
  valor: string;
  amount: string;
  txn_id: string;
  address: string;
  confirms_needed: string;
  timeout: number;
  checkout_url: string;
  status_url: string;
  qrcode_url: string;
  user_id: number;
  modalidade_id: number;
  updated_at: string;
  created_at: string;
  id: number;
  coin:string;
}

export interface Investments{
  current_page?: number;
  data?: InvestmentResponse[];
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
