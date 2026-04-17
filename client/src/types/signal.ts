export interface Signal {
  _id: string;
  asset: string;
  action: string;
  confidence: number;
  executed: boolean;
  price?: number;
  change?: number;
  reason?: string;
  createdAt: string;
}