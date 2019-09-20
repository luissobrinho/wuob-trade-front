export interface Profile {
  id: number;
  name: string;
  email: string;
  email_verified_at?: any;
  created_at: string;
  updated_at: string;
  meta: Meta;
}

export interface Meta {
  id: number;
  user_id: number;
  phone?: any;
  is_active: number;
  activation_token?: any;
  marketing: number;
  terms_and_cond: number;
  created_at: string;
  updated_at: string;
  referencia?: any;
  pais?: any;
}