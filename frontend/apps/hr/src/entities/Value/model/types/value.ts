export interface Quality {
  quality_id: number;
  quality_name: string;
}

export interface Value {
  value_id?: number;
  value_name: string;
  edit?: boolean;
  qualities: Quality[];
}

export interface ValueToPost {
  id?: number;
  name: string;
  quality1: string;
  quality2?: string;
  quality3?: string;
  quality4?: string;
  quality5?: string;
}
