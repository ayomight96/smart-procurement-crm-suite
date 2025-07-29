from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from typing import List

app = FastAPI()

model = joblib.load("model/ebm_procurement.pkl")

# Extract the actual EBM from calibrated wrapper
try:
    ebm = model.calibrated_classifiers_[0].estimator
except Exception:
    raise RuntimeError("❌ Could not extract fitted EBM from calibrated model.")

feature_names = ["avg_unit_price", "avg_delivery_days", "rating", "defect_rate"]


class SupplierFeatures(BaseModel):
    avg_unit_price: float
    avg_delivery_days: float
    rating: float
    defect_rate: float


class SupplierPair(BaseModel):
    supplier_a: SupplierFeatures
    supplier_b: SupplierFeatures


def predict_details(supplier: SupplierFeatures):
    X = np.array(
        [
            [
                supplier.avg_unit_price,
                supplier.avg_delivery_days,
                supplier.rating,
                supplier.defect_rate,
            ]
        ]
    )

    prob = float(model.predict_proba(X)[0][1])
    logit_terms = ebm.eval_terms(X)[0]
    logit_sum = sum(logit_terms) + ebm.intercept_[0]
    prob_from_logit = 1 / (1 + np.exp(-logit_sum))
    explanation = dict(zip(feature_names, logit_terms))

    return {
        "probability": round(prob, 4),
        "explanation_logit_contributions": explanation,
        "logit_sum": round(logit_sum, 4),
        "probability_from_logit": round(prob_from_logit, 4),
    }


@app.post("/predict")
def predict_supplier(features: SupplierFeatures):
    result = predict_details(features)
    result["selected"] = result["probability"] >= 0.5
    return result


@app.post("/bulk-predict")
def predict_supplier(supplier_list: List[SupplierFeatures]):
    results = []
    for features in supplier_list:
        result = predict_details(features)
        result["selected"] = result["probability"] >= 0.5
        results.append(result)
    return results

# Health check route
@app.get("/health")
def health():
    return {"status": "OK"}