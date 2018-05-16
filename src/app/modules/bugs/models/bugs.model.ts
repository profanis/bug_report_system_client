export interface Bug {
  id: string;
  title: string;
  description: string;
  priority: number;
  reporter?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
