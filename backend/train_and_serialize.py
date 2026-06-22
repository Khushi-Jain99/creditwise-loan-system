#!/usr/bin/env python
import os
import pickle
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler
from sklearn.naive_bayes import GaussianNB

def main():
    # 1. Load dataset
    dataset_path = "loan_approval_data.csv"
    if not os.path.exists(dataset_path):
        dataset_path = "../loan_approval_data.csv"
    
    print(f"Loading dataset from {dataset_path}...")
    df = pd.read_csv(dataset_path)
    
    # Identify column types
    categorical_cols = df.select_dtypes(include=["object"]).columns
    numerical_cols = df.select_dtypes(include=["number"]).columns
    
    # 2. Imputation
    print("Fitting imputers...")
    num_imp = SimpleImputer(strategy="mean")
    df[numerical_cols] = num_imp.fit_transform(df[numerical_cols])
    
    cat_imp = SimpleImputer(strategy="most_frequent")
    df[categorical_cols] = cat_imp.fit_transform(df[categorical_cols])
    
    # Drop Applicant_ID
    df = df.drop("Applicant_ID", axis=1)
    
    # 3. Encoding
    print("Fitting encoders...")
    # Education Level encoder
    le_edu = LabelEncoder()
    df["Education_Level"] = le_edu.fit_transform(df["Education_Level"])
    
    # Target variable encoder
    le_target = LabelEncoder()
    df["Loan_Approved"] = le_target.fit_transform(df["Loan_Approved"])
    
    # One-Hot Encoding for remaining nominal categories
    cols_to_encode = ["Employment_Status", "Marital_Status", "Loan_Purpose", "Property_Area", "Gender", "Employer_Category"]
    ohe = OneHotEncoder(drop="first", sparse_output=False, handle_unknown="ignore")
    encoded = ohe.fit_transform(df[cols_to_encode])
    
    encoded_df = pd.DataFrame(encoded, columns=ohe.get_feature_names_out(cols_to_encode), index=df.index)
    df = pd.concat([df.drop(columns=cols_to_encode), encoded_df], axis=1)
    
    # 4. Feature Engineering
    print("Adding engineered features...")
    df["DTI_Ratio_sq"] = df["DTI_Ratio"] ** 2
    df["Credit_Score_sq"] = df["Credit_Score"] ** 2
    
    # Define features and target (Drop Credit_Score and DTI_Ratio just like original script)
    X = df.drop(columns=["Loan_Approved", "Credit_Score", "DTI_Ratio"])
    y = df["Loan_Approved"]
    
    # Capture the exact feature column list
    feature_cols = list(X.columns)
    print(f"Number of final feature columns: {len(feature_cols)}")
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # 5. Scaling
    print("Fitting scaler...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # 6. Train Naive Bayes Model
    print("Training Naive Bayes model...")
    nb_model = GaussianNB()
    nb_model.fit(X_train_scaled, y_train)
    
    # Evaluate accuracy on test set
    y_pred = nb_model.predict(X_test_scaled)
    from sklearn.metrics import accuracy_score, precision_score
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    print(f"Naive Bayes Model trained successfully!")
    print(f"Test Accuracy: {acc:.4f}")
    print(f"Test Precision: {prec:.4f}")
    
    # 7. Serialize Artifacts
    print("Serializing objects...")
    
    # Ensure directories exist
    os.makedirs("backend", exist_ok=True)
    os.makedirs("backend/saved_models", exist_ok=True)
    
    # Save main outputs
    with open("backend/model.pkl", "wb") as f:
        pickle.dump(nb_model, f)
    with open("backend/scaler.pkl", "wb") as f:
        pickle.dump(scaler, f)
        
    # Save preprocessors
    with open("backend/saved_models/num_imputer.pkl", "wb") as f:
        pickle.dump(num_imp, f)
    with open("backend/saved_models/cat_imputer.pkl", "wb") as f:
        pickle.dump(cat_imp, f)
    with open("backend/saved_models/education_encoder.pkl", "wb") as f:
        pickle.dump(le_edu, f)
    with open("backend/saved_models/target_encoder.pkl", "wb") as f:
        pickle.dump(le_target, f)
    with open("backend/saved_models/ohe.pkl", "wb") as f:
        pickle.dump(ohe, f)
    with open("backend/saved_models/feature_cols.pkl", "wb") as f:
        pickle.dump(feature_cols, f)
        
    print("All serialized artifacts saved to backend/ directory successfully!")

if __name__ == "__main__":
    main()
