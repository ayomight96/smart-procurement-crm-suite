export interface SupplierFeatures {
  supplierName: string;
  averageUnitPrice: number;
  averageDeliveryDays: number;
  rating: number;
  defectRate: number;
}

export interface PredictionResult {
  supplierName: string;
  selected: boolean;
  probability: number;
  probabilityFromLogit: number;
  logitSum: number;
  explanation: Record<string, number>;
  confidenceLevel: string;
}

export interface SupplierComparisonResponse {
  preferredSupplier: string;
  comparisonConfidence: string;
  rankedSuppliers: PredictionResult[];
}

export interface SupplierPair {
  suppliers: SupplierFeatures[];
}
