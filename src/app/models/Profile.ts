export interface Profile {
  id: number;
  name: string;
  email: string;
  username: string;
  email_verified_at?: any;
  created_at: string;
  updated_at: string;
  totalRendimento: number;
  totalRendimentoAcumulado: number;
  investimento: Investimento;
  totalQtdRendimento: number;
  totalInvestimento: number;
  totalBloqueado: number;
  totalQtdInvestimento: number;
  totalSaldo: number;
  totalTipoRendimento: TotalTipoRendimento[];
  totalReferencia: number;
  meta: Meta;
}

export interface Meta {
  id: number;
  user_id: number;
  referencia_id: number;
  referencia: string;
  pais?: any;
  phone?: any;
  photo?: any;
  is_active: number;
  activation_token: string;
  marketing: number;
  terms_and_cond: number;
  created_at: string;
  updated_at: string;
}

export interface TotalTipoRendimento {
  id: number;
  nome: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  valor: number;
}

export interface Investimento {
  id: number;
  user_id: number;
  modalidade_id: number;
  tipo_investimento_id: number;
  pacote_id: number;
  valor: string;
  status: number;
  txn_id: string;
  address: string;
  confirms_needed: string;
  checkout_url: string;
  status_url: string;
  qrcode_url: string;
  timeout: number;
  time_created: number;
  time_expires: number;
  time_completed: number;
  amount: number;
  amountf: string;
  received: number;
  receivedf: string;
  recv_confirms: number;
  status_text: string;
  type: string;
  coin: string;
  vez: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  tipo_investimento: Tipoinvestimento;
}

export interface Tipoinvestimento {
  id: number;
  nome: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}