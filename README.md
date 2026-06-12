# 💳 CreditWise - Loan Approval Prediction System

## 📌 Overview

CreditWise is a Machine Learning-based Loan Approval Prediction System that helps financial institutions assess loan applications efficiently and accurately.

The project analyzes applicant financial and demographic information, performs data preprocessing, exploratory data analysis (EDA), feature engineering, and trains multiple machine learning models to predict whether a loan application should be approved or rejected.

---

## 🎯 Project Objective

The objective of this project is to:

* Automate loan approval prediction
* Reduce manual decision-making effort
* Identify important factors affecting loan approval
* Compare multiple machine learning algorithms
* Improve prediction performance using feature engineering

---

## 📊 Dataset Features

The dataset contains applicant-related information such as:

* Applicant ID
* Gender
* Marital Status
* Education Level
* Employment Status
* Applicant Income
* Co-applicant Income
* Credit Score
* Savings
* Debt-to-Income Ratio (DTI)
* Loan Purpose
* Property Area
* Employer Category
* Loan Amount
* Loan Tenure

### Target Variable

* Loan Approved (Yes / No)

---

## 🛠 Technologies Used

### Programming Language

* Python

### Libraries

* Pandas
* NumPy
* Matplotlib
* Seaborn
* Scikit-Learn

### Machine Learning Algorithms

* Logistic Regression
* K-Nearest Neighbors (KNN)
* Gaussian Naive Bayes

---

## 🔄 Project Workflow

### 1. Data Collection

* Import loan approval dataset
* Load data using Pandas

### 2. Data Preprocessing

* Handle missing numerical values using Mean Imputation
* Handle missing categorical values using Most Frequent Imputation
* Remove unnecessary columns

### 3. Exploratory Data Analysis (EDA)

Performed:

* Class distribution analysis
* Income distribution analysis
* Credit score analysis
* Loan approval trends
* Box plots for outlier detection
* Histograms and data visualization

### 4. Data Encoding

#### Label Encoding

Applied on:

* Education Level
* Loan Approved

#### One-Hot Encoding

Applied on:

* Employment Status
* Marital Status
* Loan Purpose
* Property Area
* Gender
* Employer Category

### 5. Correlation Analysis

* Generated correlation heatmap
* Identified important features influencing loan approval

### 6. Feature Scaling

Applied:

* StandardScaler

to normalize feature values before training.

### 7. Model Training

The following classification models were trained:

#### Logistic Regression

* Binary classification model
* Baseline model

#### K-Nearest Neighbors (KNN)

* Distance-based classification

#### Gaussian Naive Bayes

* Probabilistic classification model

---

## ⚙ Feature Engineering

Additional features created:

* DTI_Ratio²
* Credit_Score²

These engineered features helped improve model performance.

---

## 📈 Model Evaluation

Models were evaluated using:

* Accuracy
* Precision
* Recall
* F1 Score
* Confusion Matrix

### Best Performing Model

🏆 Gaussian Naive Bayes achieved the highest precision among the evaluated models.

---

## 📂 Project Structure

```bash
CreditWise/
│
├── loan_approval.ipynb
├── loan_approval_data.csv
├── README.md
│
└── outputs/
    ├── visualizations
    ├── correlation_heatmap
    └── model_results
```

---

## 🚀 How to Run

### Clone Repository

```bash
git clone https://github.com/your-username/CreditWise.git
```

### Install Dependencies

```bash
pip install pandas numpy matplotlib seaborn scikit-learn
```

### Run Notebook

```bash
jupyter notebook loan_approval.ipynb
```

---

## 📌 Key Learning Outcomes

* Data Cleaning
* Missing Value Handling
* Exploratory Data Analysis
* Feature Encoding
* Feature Engineering
* Classification Algorithms
* Model Evaluation
* Loan Risk Prediction

---

## 👩‍💻 Author

Khushi Jain

B.Tech CSE (AI & ML)

---

## 📜 License

This project is created for educational and learning purposes.
