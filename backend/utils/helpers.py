import numpy as np

def format_prediction_input(request_data):
    """
    Safely extract variables from request dictionary and map to float or NaN.
    """
    def safe_float(val):
        if val is None or val == "":
            return np.nan
        try:
            return float(val)
        except (ValueError, TypeError):
            return np.nan

    return {
        "Applicant_ID": 0.0,
        "Applicant_Income": safe_float(request_data.get("Applicant_Income")),
        "Coapplicant_Income": safe_float(request_data.get("Coapplicant_Income")),
        "Employment_Status": request_data.get("Employment_Status", np.nan),
        "Age": safe_float(request_data.get("Age")),
        "Marital_Status": request_data.get("Marital_Status", np.nan),
        "Dependents": safe_float(request_data.get("Dependents")),
        "Credit_Score": safe_float(request_data.get("Credit_Score")),
        "Existing_Loans": safe_float(request_data.get("Existing_Loans")),
        "DTI_Ratio": safe_float(request_data.get("DTI_Ratio")),
        "Savings": safe_float(request_data.get("Savings")),
        "Collateral_Value": safe_float(request_data.get("Collateral_Value")),
        "Loan_Amount": safe_float(request_data.get("Loan_Amount")),
        "Loan_Term": safe_float(request_data.get("Loan_Term")),
        "Loan_Purpose": request_data.get("Loan_Purpose", np.nan),
        "Property_Area": request_data.get("Property_Area", np.nan),
        "Education_Level": request_data.get("Education_Level", np.nan),
        "Gender": request_data.get("Gender", np.nan),
        "Employer_Category": request_data.get("Employer_Category", np.nan),
        "Loan_Approved": "No" # Dummy target for pipeline consistency
    }

def get_prediction_reasons(prediction_label, request_data):
    """
    Generate professional fintech advice based on applicant metrics.
    """
    reasons = []
    credit = float(request_data.get("Credit_Score") or 0)
    dti = float(request_data.get("DTI_Ratio") or 0)
    savings = float(request_data.get("Savings") or 0)
    loan = float(request_data.get("Loan_Amount") or 0)
    income = float(request_data.get("Applicant_Income") or 0)

    if prediction_label == "Rejected":
        if credit < 600:
            reasons.append("Credit score is below standard fintech recommendations (< 600).")
        if dti > 0.45:
            reasons.append("Debt-to-Income (DTI) ratio is exceptionally high (> 45%).")
        if savings < 1500:
            reasons.append("Low liquid savings reserve found on applicant portfolio.")
        if income > 0 and loan > (income * 3):
            reasons.append("Requested loan size exceeds 3x applicant annual income threshold.")
        if not reasons:
            reasons.append("Risk parameters evaluated exceed safe limits for standard Naive Bayes distribution.")
    else:
        if credit >= 700:
            reasons.append("Excellent credit rating score verified.")
        if dti <= 0.3:
            reasons.append("Healthy DTI ratio under 30%.")
        if savings >= 10000:
            reasons.append("Robust liquid savings reserves verified.")
            
    return reasons
