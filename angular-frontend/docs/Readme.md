# 🧠 Smart Procurement Assistant

An AI-powered demo platform that showcases how machine learning and explainability can enhance supplier selection in ERP systems.

---

## 📦 Features

- Predict whether a supplier bid is optimal.
- Compare multiple supplier bids with ranked results.
- Transparent explanations using logit contributions.
- Metrics like Accuracy and Log Loss shown in the UI.
- Built with Angular + ASP.NET Core + Python FastAPI.

---

## 🧪 Model Details

- **Type**: Explainable Boosting Machine (EBM) from `interpret` library.
- **Wrapper**: CalibratedClassifierCV using `sigmoid` to improve probability accuracy.
- **Training Steps**:
  - Stratified train/calibrate/test split.
  - Balanced weights for class imbalance.
  - Saved via `joblib` as `ebm_procurement.pkl`.

---

## 🔧 Features Used

- `avg_unit_price`: Lower is better.
- `avg_delivery_days`: Faster suppliers are better.
- `rating`: Quality rating (1–5).
- `defect_rate`: Lower means more reliable.

---

## 📈 Validation

- **Accuracy**: `92.4%`
- **Log Loss**: `0.216`
- Evaluation done using stratified sampling and model calibration.

---

## 🔍 Explainability

- Predictions include feature-level logit contributions.
- Probabilities are displayed from both:
  - `predict_proba()`
  - Manually derived logit sum → sigmoid transform.

---

## 🔌 API Architecture

- **FastAPI (Python)**:
  - `/predict`: Accepts one supplier and returns predicted result + breakdown.
  - `/bulk-predict`: Accepts a list of suppliers and returns predictions for each.
- **.NET Core API**: Middleware and orchestration layer.
- **Angular**: UI for single prediction, batch mode, and documentation.

---

## 🧭 Routes

| Route | Description |
|-------|-------------|
| `/smart-procurement` | Landing page |
| `/smart-procurement/demo` | Prediction + Comparison demo |
| `/smart-procurement/docs` | Full methodology & system explanation |

---

## 👨‍💻 Author

**Ayomide Adekoya**  
🔗 [GitHub](https://github.com/...)  
📅 v1.0.0 • July 2025
