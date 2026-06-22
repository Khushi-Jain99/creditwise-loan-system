# CreditWise Loan System 🪙

CreditWise is a premium full-stack fintech platform designed to predict loan approval results in real time. It uses a trained Gaussian Naive Bayes classifier as its core predictive engine, yielding **86.5% Accuracy** and **78.3% Precision** on the risk profile test set.

## 📂 Project Structure

```
CREDITWISE-LOAN-SYSTEM/
├── backend/
│   ├── app.py                      # Flask API main server
│   ├── model.pkl                   # Serialized Naive Bayes model
│   ├── scaler.pkl                  # Serialized StandardScaler
│   ├── requirements.txt            # Python dependencies
│   ├── render.yaml                 # Render deploy specification
│   ├── train_and_serialize.py      # Serialization helper script
│   ├── routes/
│   │   ├── __init__.py
│   │   └── prediction.py           # Blueprint for /predict route
│   ├── utils/
│   │   ├── __init__.py
│   │   └── helpers.py              # Parsing and advice helpers
│   └── saved_models/               # Preprocessor serialization directory
│       ├── cat_imputer.pkl         # Mode imputer
│       ├── num_imputer.pkl         # Mean imputer
│       ├── education_encoder.pkl   # Education level label encoder
│       ├── target_encoder.pkl      # Target label encoder
│       ├── ohe.pkl                 # Nominal categories one-hot encoder
│       └── feature_cols.pkl        # Exact training column order list
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Top navigation bar
│   │   │   └── Footer.jsx          # Bottom footer branding
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx     # Hero & features dashboard
│   │   │   ├── PredictionPage.jsx  # Interactive credit evaluation form
│   │   │   └── AboutPage.jsx       # Methodology & algorithm benchmarks
│   │   ├── services/
│   │   │   └── api.js              # Axios integration client
│   │   ├── App.jsx                 # Routing and page layout manager
│   │   ├── main.jsx                # DOM entry point
│   │   └── index.css               # Vanilla CSS design system
│   ├── public/
│   ├── package.json                # React dependencies
│   └── vercel.json                 # Vercel deploy specification
│
├── loan_approval.py                # Original Jupyter training script
├── loan_approval.ipynb             # Original training notebook
├── loan_approval_data.csv          # Training dataset
└── README.md                       # Documentation
```

---

## ⚡ API Specification

### Predict Endpoint
* **Path**: `POST /predict`
* **Content-Type**: `application/json`

#### Request Payload
```json
{
  "Applicant_Income": 15000,
  "Coapplicant_Income": 5000,
  "Employment_Status": "Salaried",
  "Age": 45,
  "Marital_Status": "Married",
  "Dependents": 1,
  "Credit_Score": 760,
  "Existing_Loans": 1,
  "DTI_Ratio": 0.22,
  "Savings": 12000,
  "Collateral_Value": 45000,
  "Loan_Amount": 20000,
  "Loan_Term": 60,
  "Loan_Purpose": "Home",
  "Property_Area": "Urban",
  "Education_Level": "Graduate",
  "Gender": "Male",
  "Employer_Category": "Private"
}
```

#### Response Payload
```json
{
  "prediction": "Approved",
  "confidence": 0.92,
  "reasons": [
    "Excellent credit rating score verified.",
    "Healthy DTI ratio under 30%.",
    "Robust liquid savings reserves verified."
  ]
}
```

---

## 💻 Local Setup & Execution

### 1. Run Python Backend
Navigate to the backend directory and launch the Flask server:
```bash
cd backend
pip install -r requirements.txt
python app.py
```
*The backend API will run on `http://localhost:5000`.*

### 2. Run React Frontend
Navigate to the frontend directory, install npm packages, and spin up the Vite development server:
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
*The local development dashboard will launch on `http://localhost:5173`.*

---

## 🚀 Deployment Instructions

### Frontend (Vercel)
The React + Vite application contains a `vercel.json` file. To deploy:
1. Push the code to a Git repository (GitHub/GitLab).
2. Connect the repository to Vercel.
3. Configure the Root Directory to `frontend`.
4. Add the Environment Variable `VITE_API_URL` pointing to your deployed backend URL.
5. Deploy.

### Backend (Render)
The Flask service contains a `render.yaml` configuration. To deploy:
1. Connect the repository to Render.
2. Select **New Web Service**.
3. Set the Root Directory to `backend`.
4. Configure Build Command: `pip install -r requirements.txt`
5. Configure Start Command: `gunicorn app:app`
6. Deploy.
