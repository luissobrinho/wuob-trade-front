export interface UserNetwork {
  id: number;
  name: string;
  email: string;
  username: string;
  email_verified_at?: any;
  created_at: string;
  updated_at: string;
  network_down?: Networkdown[];
  treeStatus?: string;
  parentId?: number;
}

export interface Networkdown {
    id: number;
    user_id: number;
    referencia_id: number;
    user: UserNetwork;
  }