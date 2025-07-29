import { SupplierFeatures } from '../models/supplier.model';

const supplierNames = [
  'Beta Ltd',
  'Delta Group',
  'Alpha Co',
  'Gamma Inc',
  'Omega Supplies',
  'Sigma Partners',
  'Zeta Solutions',
  'Theta Enterprises',
  'Epsilon Corp',
  'Kappa Industries',
  'Lambda Services',
  'NuTech',
  'Xi Innovations',
  'Pi Logistics',
  'Rho Manufacturing',
  'Tau Systems',
  'Upsilon Technologies',
  'Chi Consulting',
  'Psi Solutions',
  'Omega Dynamics',
];

// Track used names (in-memory per session)
let usedSupplierNames: Set<string> = new Set();

export function generateMockBid(): SupplierFeatures {
  // Filter available names
  const availableNames = supplierNames.filter(
    (name) => !usedSupplierNames.has(name)
  );

  // Reset if exhausted
  if (availableNames.length === 0) {
    usedSupplierNames.clear();
    return generateMockBid();
  }

  // Pick a random name from the available list
  const name =
    availableNames[Math.floor(Math.random() * availableNames.length)];
  usedSupplierNames.add(name);

  return {
    supplierName: name,
    averageUnitPrice: parseFloat(randomNormal(5.0, 1.5).toFixed(2)),
    averageDeliveryDays: Math.max(1, Math.round(randomNormal(4, 1))),
    rating: parseFloat(boundValue(randomNormal(4.2, 0.5), 1.0, 5.0).toFixed(2)),
    defectRate: parseFloat(
      boundValue(randomNormal(0.03, 0.02), 0.0, 0.15).toFixed(3)
    ),
  };
}

// Helpers
function randomNormal(mean: number, stddev: number): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return (
    mean + stddev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  );
}

function boundValue(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}
