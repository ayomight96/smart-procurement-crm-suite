from interpret.glassbox import ExplainableBoostingClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.model_selection import train_test_split
from sklearn.utils import compute_sample_weight
from sklearn.metrics import classification_report, accuracy_score
import pandas as pd
import joblib

# Load data
df = pd.read_csv("data/procurement_data.csv")
features = ["avg_unit_price", "avg_delivery_days", "rating", "defect_rate"]
X = df[features]
y = df["chosen"]

# Step 1: Full train/test split
X_train_full, X_test, y_train_full, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# Step 2: Split training set into model training and calibration
X_model, X_calib, y_model, y_calib = train_test_split(
    X_train_full, y_train_full, test_size=0.25, stratify=y_train_full, random_state=42
)

# Step 3: Compute sample weights for model training
weights = compute_sample_weight(class_weight="balanced", y=y_model)

# Step 4: Train base EBM model
base_model = ExplainableBoostingClassifier(random_state=0)
base_model.fit(X_model, y_model, sample_weight=weights)

# Step 5: Calibrate using calibration set (cv='prefit' assumes model already trained)
calibrated_model = CalibratedClassifierCV(base_model, method="sigmoid", cv="prefit")
calibrated_model.fit(X_calib, y_calib)

# Step 6: Evaluate on test set
y_pred = calibrated_model.predict(X_test)
print("📊 Classification Report:")
print(classification_report(y_test, y_pred))
print("✅ Accuracy:", accuracy_score(y_test, y_pred))

# Optional: Inspect probability spread
probs = calibrated_model.predict_proba(X_test)[:, 1]
print("🔍 Sample probabilities:", probs[:10])

# Step 7: Save model
joblib.dump(calibrated_model, "model/ebm_procurement.pkl")
print("✅ Calibrated model saved to model/ebm_procurement.pkl")
