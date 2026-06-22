import os
import sys
import pickle
import pandas as pd
from flask import Blueprint, request, jsonify

# Add backend directory and root workspace to path to resolve imports robustly
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.dirname(CURRENT_DIR)
WORKSPACE_DIR = os.path.dirname(BACKEND_DIR)

if BACKEND_DIR not in sys.path:
    sys.path.append(BACKEND_DIR)
if WORKSPACE_DIR not in sys.path:
    sys.path.append(WORKSPACE_DIR)

from utils.helpers import format_prediction_input, get_prediction_reasons

prediction_bp = Blueprint("prediction", __name__)

MODEL_PATH = os.path.join(BACKEND_DIR, "model.pkl")
SCALER_PATH = os.path.join(BACKEND_DIR, "scaler.pkl")
NUM_IMPUTER_PATH = os.path.join(BACKEND_DIR, "saved_models", "num_imputer.pkl")
CAT_IMPUTER_PATH = os.path.join(BACKEND_DIR, "saved_models", "cat_imputer.pkl")
EDU_ENCODER_PATH = os.path.join(BACKEND_DIR, "saved_models", "education_encoder.pkl")
TARGET_ENCODER_PATH = os.path.join(BACKEND_DIR, "saved_models", "target_encoder.pkl")
OHE_PATH = os.path.join(BACKEND_DIR, "saved_models", "ohe.pkl")
FEATURE_COLS_PATH = os.path.join(BACKEND_DIR, "saved_models", "feature_cols.pkl")

# Load model artifacts globally inside blueprint
try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    with open(SCALER_PATH, "rb") as f:
        scaler = pickle.load(f)
    with open(NUM_IMPUTER_PATH, "rb") as f:
        num_imputer = pickle.load(f)
    with open(CAT_IMPUTER_PATH, "rb") as f:
        cat_imputer = pickle.load(f)
    with open(EDU_ENCODER_PATH, "rb") as f:
        education_encoder = pickle.load(f)
    with open(TARGET_ENCODER_PATH, "rb") as f:
        target_encoder = pickle.load(f)
    with open(OHE_PATH, "rb") as f:
        ohe = pickle.load(f)
    with open(FEATURE_COLS_PATH, "rb") as f:
        feature_cols = pickle.load(f)
    print("Blueprint: Models loaded successfully!")
except Exception as e:
    print(f"Blueprint error loading models: {e}")
    model = None

# Defining column names expected by the imputer
NUMERICAL_COLS = [
    "Applicant_ID", "Applicant_Income", "Coapplicant_Income", "Age",
    "Dependents", "Credit_Score", "Existing_Loans", "DTI_Ratio",
    "Savings", "Collateral_Value", "Loan_Amount", "Loan_Term"
]

CATEGORICAL_COLS = [
    "Employment_Status", "Marital_Status", "Loan_Purpose", "Property_Area",
    "Education_Level", "Gender", "Employer_Category", "Loan_Approved"
]

COLS_TO_ENCODE = [
    "Employment_Status", "Marital_Status", "Loan_Purpose", "Property_Area",
    "Gender", "Employer_Category"
]

@prediction_bp.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Machine learning model artifacts are not loaded on server."}), 500
        
    try:
        request_data = request.get_json(force=True)
    except Exception:
        return jsonify({"error": "Invalid JSON request."}), 400

    try:
        # Preprocess input dictionary
        raw_data = format_prediction_input(request_data)
        df_input = pd.DataFrame(raw_data)
        
        # 1. Impute numerical & categorical columns
        df_input[NUMERICAL_COLS] = num_imputer.transform(df_input[NUMERICAL_COLS])
        df_input[CATEGORICAL_COLS] = cat_imputer.transform(df_input[CATEGORICAL_COLS])
        
        # 2. Drop Applicant_ID
        df_input = df_input.drop("Applicant_ID", axis=1)
        
        # 3. Label encode Education_Level and dummy target
        df_input["Education_Level"] = education_encoder.transform(df_input["Education_Level"])
        df_input["Loan_Approved"] = target_encoder.transform(df_input["Loan_Approved"])
        
        # 4. One-hot encode the target categorical columns
        encoded = ohe.transform(df_input[COLS_TO_ENCODE])
        encoded_df = pd.DataFrame(encoded, columns=ohe.get_feature_names_out(COLS_TO_ENCODE), index=df_input.index)
        df_input = pd.concat([df_input.drop(columns=COLS_TO_ENCODE), encoded_df], axis=1)
        
        # 5. Feature Engineering (DTI_Ratio_sq and Credit_Score_sq)
        df_input["DTI_Ratio_sq"] = df_input["DTI_Ratio"] ** 2
        df_input["Credit_Score_sq"] = df_input["Credit_Score"] ** 2
        
        # 6. Drop target and original fields (Loan_Approved, Credit_Score, DTI_Ratio)
        df_input = df_input.drop(columns=["Loan_Approved", "Credit_Score", "DTI_Ratio"])
        
        # 7. Re-index according to training feature columns list to guarantee ordering
        X_pred = df_input[feature_cols]
        
        # 8. Scale variables
        X_scaled = scaler.transform(X_pred)
        
        # 9. Perform model inference
        prediction_val = model.predict(X_scaled)[0]
        prediction_label = "Approved" if prediction_val == 1 else "Rejected"
        
        probabilities = model.predict_proba(X_scaled)[0]
        confidence = float(probabilities[prediction_val])
        
        # 10. Generate reviews
        reasons = get_prediction_reasons(prediction_label, request_data)
        
        return jsonify({
            "prediction": prediction_label,
            "confidence": round(confidence, 4),
            "reasons": reasons
        })
        
    except Exception as e:
        return jsonify({"error": f"Internal model scoring failed: {str(e)}"}), 500
