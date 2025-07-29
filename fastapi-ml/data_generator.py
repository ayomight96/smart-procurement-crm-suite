import pandas as pd
import numpy as np
import random

np.random.seed(42)
random.seed(42)

# Simulate 20 items and 50 suppliers
item_ids = np.random.randint(1000, 1100, size=20)
supplier_ids = np.random.randint(2000, 2100, size=50)

data = []
for _ in range(3001):
    item = random.choice(item_ids)
    supplier = random.choice(supplier_ids)
    
    avg_unit_price = round(np.random.normal(loc=5.0, scale=1.5), 2)
    avg_delivery_days = max(1, int(np.random.normal(loc=4, scale=1)))
    rating = round(min(5.0, max(1.0, np.random.normal(loc=4.2, scale=0.5))), 2)
    defect_rate = round(min(0.15, max(0.0, np.random.normal(loc=0.03, scale=0.02))), 3)

    # Simulate 'chosen' using some weighted logic
    score = (5 - avg_unit_price) + (5 - avg_delivery_days) + rating - (defect_rate * 20)
    chosen = 1 if score > 7.5 else 0

    data.append([item, supplier, avg_unit_price, avg_delivery_days, rating, defect_rate, chosen])

df = pd.DataFrame(data, columns=[
    'item_id', 'supplier_id', 'avg_unit_price', 
    'avg_delivery_days', 'rating', 'defect_rate', 'chosen'
])

df.to_csv('data/procurement_data.csv', index=False)
print("✅ Procurement dataset generated: data/procurement_data.csv")