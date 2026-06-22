import React, { useState } from 'react';
import { predictLoan } from '../services/api';
import { 
  User, DollarSign, Award, MapPin, 
  HelpCircle, AlertCircle, CheckCircle2, XCircle, Info
} from 'lucide-react';

const PredictionPage = () => {
  const [formData, setFormData] = useState({
    Applicant_Income: '',
    Coapplicant_Income: '',
    Employment_Status: 'Salaried',
    Age: '',
    Marital_Status: 'Single',
    Dependents: '',
    Credit_Score: '',
    Existing_Loans: '',
    DTI_Ratio: '',
    Savings: '',
    Collateral_Value: '',
    Loan_Amount: '',
    Loan_Term: '',
    Loan_Purpose: 'Personal',
    Property_Area: 'Urban',
    Education_Level: 'Graduate',
    Gender: 'Male',
    Employer_Category: 'Private'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const validateForm = () => {
    const tempErrors = {};
    
    // Validate Applicant Income
    if (!formData.Applicant_Income || isNaN(formData.Applicant_Income) || Number(formData.Applicant_Income) < 0) {
      tempErrors.Applicant_Income = "Enter a valid positive annual income.";
    }
    
    // Validate Coapplicant Income
    if (formData.Coapplicant_Income !== '' && (isNaN(formData.Coapplicant_Income) || Number(formData.Coapplicant_Income) < 0)) {
      tempErrors.Coapplicant_Income = "Enter a valid positive co-applicant income.";
    }
    
    // Validate Age
    if (!formData.Age || isNaN(formData.Age) || Number(formData.Age) < 21 || Number(formData.Age) > 60) {
      tempErrors.Age = "Applicant age must be between 21 and 60.";
    }
    
    // Validate Dependents
    if (!formData.Dependents || isNaN(formData.Dependents) || Number(formData.Dependents) < 0 || Number(formData.Dependents) > 3) {
      tempErrors.Dependents = "Enter dependents (0 to 3 max).";
    }

    // Validate Credit Score
    if (!formData.Credit_Score || isNaN(formData.Credit_Score) || Number(formData.Credit_Score) < 550 || Number(formData.Credit_Score) > 800) {
      tempErrors.Credit_Score = "Credit score must be between 550 and 800.";
    }

    // Validate Existing Loans
    if (formData.Existing_Loans === '' || isNaN(formData.Existing_Loans) || Number(formData.Existing_Loans) < 0 || Number(formData.Existing_Loans) > 4) {
      tempErrors.Existing_Loans = "Enter existing active loans (0 to 4 max).";
    }

    // Validate DTI Ratio
    if (!formData.DTI_Ratio || isNaN(formData.DTI_Ratio) || Number(formData.DTI_Ratio) < 0.1 || Number(formData.DTI_Ratio) > 0.6) {
      tempErrors.DTI_Ratio = "DTI ratio must be between 0.10 and 0.60.";
    }

    // Validate Savings
    if (!formData.Savings || isNaN(formData.Savings) || Number(formData.Savings) < 0) {
      tempErrors.Savings = "Enter valid positive savings amount.";
    }

    // Validate Collateral Value
    if (!formData.Collateral_Value || isNaN(formData.Collateral_Value) || Number(formData.Collateral_Value) < 0) {
      tempErrors.Collateral_Value = "Enter valid collateral worth.";
    }

    // Validate Loan Amount
    if (!formData.Loan_Amount || isNaN(formData.Loan_Amount) || Number(formData.Loan_Amount) < 1000 || Number(formData.Loan_Amount) > 40000) {
      tempErrors.Loan_Amount = "Loan Amount must be between $1,000 and $40,000.";
    }

    // Validate Loan Term
    if (!formData.Loan_Term || isNaN(formData.Loan_Term) || Number(formData.Loan_Term) < 12 || Number(formData.Loan_Term) > 84) {
      tempErrors.Loan_Term = "Enter active terms in months (12 to 84).";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setResult(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Cast numeric strings to numbers before posting
      const payload = {
        ...formData,
        Applicant_Income: Number(formData.Applicant_Income),
        Coapplicant_Income: formData.Coapplicant_Income !== '' ? Number(formData.Coapplicant_Income) : 0.0,
        Age: Number(formData.Age),
        Dependents: Number(formData.Dependents),
        Credit_Score: Number(formData.Credit_Score),
        Existing_Loans: Number(formData.Existing_Loans),
        DTI_Ratio: Number(formData.DTI_Ratio),
        Savings: Number(formData.Savings),
        Collateral_Value: Number(formData.Collateral_Value),
        Loan_Amount: Number(formData.Loan_Amount),
        Loan_Term: Number(formData.Loan_Term)
      };

      const response = await predictLoan(payload);
      setResult(response);
    } catch (err) {
      setApiError(err.message || "Something went wrong during model prediction.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (type) => {
    if (type === 'approve') {
      setFormData({
        Applicant_Income: '15000',
        Coapplicant_Income: '5000',
        Employment_Status: 'Salaried',
        Age: '45',
        Marital_Status: 'Married',
        Dependents: '1',
        Credit_Score: '760',
        Existing_Loans: '1',
        DTI_Ratio: '0.22',
        Savings: '12000',
        Collateral_Value: '45000',
        Loan_Amount: '20000',
        Loan_Term: '60',
        Loan_Purpose: 'Home',
        Property_Area: 'Urban',
        Education_Level: 'Graduate',
        Gender: 'Male',
        Employer_Category: 'Private'
      });
    } else {
      setFormData({
        Applicant_Income: '3500',
        Coapplicant_Income: '0',
        Employment_Status: 'Unemployed',
        Age: '24',
        Marital_Status: 'Single',
        Dependents: '3',
        Credit_Score: '560',
        Existing_Loans: '4',
        DTI_Ratio: '0.58',
        Savings: '100',
        Collateral_Value: '1000',
        Loan_Amount: '35000',
        Loan_Term: '84',
        Loan_Purpose: 'Personal',
        Property_Area: 'Rural',
        Education_Level: 'Not Graduate',
        Gender: 'Female',
        Employer_Category: 'Unemployed'
      });
    }
    setErrors({});
  };

  // SVG circular properties for gauge
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = result 
    ? circumference - (result.confidence * circumference) 
    : circumference;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>Loan Credit Simulator</h1>
        <p className="section-desc" style={{ marginLeft: 0 }}>
          Input the applicant's financial attributes below to predict approval outcome using the calibrated Gaussian Naive Bayes model.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => handleFillDemo('approve')}>
            Demo (Approve Case)
          </button>
          <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => handleFillDemo('reject')}>
            Demo (Reject Case)
          </button>
        </div>
      </div>

      <div className="form-layout">
        {/* Form panel */}
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2.5rem' }}>
          {/* Section 1 */}
          <div className="form-section-title">
            <User size={18} /> Personal Profile
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Age</label>
              <input type="text" name="Age" className="form-control" placeholder="Range: 21 - 60" value={formData.Age} onChange={handleInputChange} />
              {errors.Age && <div className="error-text">{errors.Age}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select name="Gender" className="form-control" value={formData.Gender} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Marital Status</label>
              <select name="Marital_Status" className="form-control" value={formData.Marital_Status} onChange={handleInputChange}>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Education Level</label>
              <select name="Education_Level" className="form-control" value={formData.Education_Level} onChange={handleInputChange}>
                <option value="Graduate">Graduate</option>
                <option value="Not Graduate">Not Graduate</option>
              </select>
            </div>
          </div>

          {/* Section 2 */}
          <div className="form-section-title">
            <DollarSign size={18} /> Employment & Financial
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Employment Status</label>
              <select name="Employment_Status" className="form-control" value={formData.Employment_Status} onChange={handleInputChange}>
                <option value="Salaried">Salaried</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Contract">Contract</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Employer Category</label>
              <select name="Employer_Category" className="form-control" value={formData.Employer_Category} onChange={handleInputChange}>
                <option value="Private">Private</option>
                <option value="Government">Government</option>
                <option value="MNC">MNC</option>
                <option value="Business">Business</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Applicant Income (Annual)</label>
              <input type="text" name="Applicant_Income" className="form-control" placeholder="Avg: $10,852" value={formData.Applicant_Income} onChange={handleInputChange} />
              {errors.Applicant_Income && <div className="error-text">{errors.Applicant_Income}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Coapplicant Income (Annual)</label>
              <input type="text" name="Coapplicant_Income" className="form-control" placeholder="Avg: $5,082" value={formData.Coapplicant_Income} onChange={handleInputChange} />
              {errors.Coapplicant_Income && <div className="error-text">{errors.Coapplicant_Income}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Liquid Savings</label>
              <input type="text" name="Savings" className="form-control" placeholder="Avg: $9,940" value={formData.Savings} onChange={handleInputChange} />
              {errors.Savings && <div className="error-text">{errors.Savings}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Active Dependents</label>
              <input type="text" name="Dependents" className="form-control" placeholder="Range: 0 - 3" value={formData.Dependents} onChange={handleInputChange} />
              {errors.Dependents && <div className="error-text">{errors.Dependents}</div>}
            </div>
          </div>

          {/* Section 3 */}
          <div className="form-section-title">
            <Award size={18} /> Credit Profile & Ratios
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Credit Score</label>
              <input type="text" name="Credit_Score" className="form-control" placeholder="Range: 550 - 800" value={formData.Credit_Score} onChange={handleInputChange} />
              {errors.Credit_Score && <div className="error-text">{errors.Credit_Score}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Debt-to-Income (DTI) Ratio</label>
              <input type="text" name="DTI_Ratio" className="form-control" placeholder="Range: 0.10 - 0.60" value={formData.DTI_Ratio} onChange={handleInputChange} />
              {errors.DTI_Ratio && <div className="error-text">{errors.DTI_Ratio}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Existing Active Loans</label>
              <input type="text" name="Existing_Loans" className="form-control" placeholder="Range: 0 - 4" value={formData.Existing_Loans} onChange={handleInputChange} />
              {errors.Existing_Loans && <div className="error-text">{errors.Existing_Loans}</div>}
            </div>
          </div>

          {/* Section 4 */}
          <div className="form-section-title">
            <MapPin size={18} /> Loan Requirement & Collateral
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Loan Amount Request</label>
              <input type="text" name="Loan_Amount" className="form-control" placeholder="Range: $1,000 - $40,000" value={formData.Loan_Amount} onChange={handleInputChange} />
              {errors.Loan_Amount && <div className="error-text">{errors.Loan_Amount}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Collateral Value</label>
              <input type="text" name="Collateral_Value" className="form-control" placeholder="Avg: $24,802" value={formData.Collateral_Value} onChange={handleInputChange} />
              {errors.Collateral_Value && <div className="error-text">{errors.Collateral_Value}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Loan Term (Months)</label>
              <input type="text" name="Loan_Term" className="form-control" placeholder="Range: 12 - 84" value={formData.Loan_Term} onChange={handleInputChange} />
              {errors.Loan_Term && <div className="error-text">{errors.Loan_Term}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Loan Purpose</label>
              <select name="Loan_Purpose" className="form-control" value={formData.Loan_Purpose} onChange={handleInputChange}>
                <option value="Personal">Personal</option>
                <option value="Car">Car</option>
                <option value="Business">Business</option>
                <option value="Home">Home</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Property Location</label>
              <select name="Property_Area" className="form-control" value={formData.Property_Area} onChange={handleInputChange}>
                <option value="Urban">Urban</option>
                <option value="Semiurban">Semiurban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? (
              <div className="pulse-loader">
                <div className="pulse-bubble"></div>
                <div className="pulse-bubble"></div>
                <div className="pulse-bubble"></div>
              </div>
            ) : "Submit Application"}
          </button>
        </form>

        {/* Results panel */}
        <div className="result-container">
          {apiError && (
            <div className="glass-card" style={{ borderLeft: '4px solid hsl(var(--accent-error))' }}>
              <div style={{ display: 'flex', gap: '0.75rem', color: 'hsl(var(--accent-error))' }}>
                <AlertCircle size={20} />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Connection Error</h3>
                  <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '0.25rem' }}>{apiError}</p>
                </div>
              </div>
            </div>
          )}

          {!result && !apiError && !loading && (
            <div className="glass-card flex-center" style={{ minHeight: '300px', flexDirection: 'column', color: 'hsl(var(--text-muted))' }}>
              <Info size={40} style={{ marginBottom: '1rem' }} />
              <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>Awaiting Application</p>
              <p style={{ fontSize: '0.8rem', textAlign: 'center', maxWidth: '240px', marginTop: '0.25rem' }}>
                Fill out the applicant details and submit to visualize loan scoring.
              </p>
            </div>
          )}

          {loading && (
            <div className="glass-card flex-center animate-pulse" style={{ minHeight: '300px', flexDirection: 'column', color: 'hsl(var(--text-secondary))' }}>
              <div className="pulse-loader" style={{ marginBottom: '1rem' }}>
                <div className="pulse-bubble" style={{ backgroundColor: 'hsl(var(--accent-secondary))' }}></div>
                <div className="pulse-bubble" style={{ backgroundColor: 'hsl(var(--accent-secondary))' }}></div>
                <div className="pulse-bubble" style={{ backgroundColor: 'hsl(var(--accent-secondary))' }}></div>
              </div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Analyzing Credit Risk Profile...</p>
            </div>
          )}

          {result && !loading && (
            <div className={`glass-card ${result.prediction === 'Approved' ? 'result-glow-success' : 'result-glow-error'}`}>
              <div style={{ textAlign: 'center' }}>
                <div className={`result-badge ${result.prediction === 'Approved' ? 'result-badge-success' : 'result-badge-error'}`}>
                  {result.prediction === 'Approved' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  {result.prediction}
                </div>
                <h2 className="result-title">
                  {result.prediction === 'Approved' ? 'Loan Pre-Approved' : 'Application Declined'}
                </h2>
                <p className="result-desc">
                  {result.prediction === 'Approved' 
                    ? 'Congratulations! The Naive Bayes risk model has classified this portfolio as safe.' 
                    : 'The model has flagged this profile as high credit risk based on target variables.'
                  }
                </p>

                {/* SVG Radial Confidence Indicator */}
                <div className="gauge-wrapper">
                  <svg width="140" height="140" className="gauge-svg">
                    <circle cx="70" cy="70" r={radius} className="gauge-bg" />
                    <circle 
                      cx="70" 
                      cy="70" 
                      r={radius} 
                      className={result.prediction === 'Approved' ? 'gauge-bar-success' : 'gauge-bar-error'}
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                    />
                  </svg>
                  <div className="gauge-text">
                    <div className="gauge-percent">{(result.confidence * 100).toFixed(1)}%</div>
                    <div className="gauge-label">Confidence</div>
                  </div>
                </div>

                {/* Fintech advice list */}
                {result.reasons && result.reasons.length > 0 && (
                  <ul className="reasons-list">
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'hsl(var(--text-muted))' }}>
                      Key Model Factors:
                    </p>
                    {result.reasons.map((reason, index) => (
                      <li key={index} className="reasons-item">
                        <span style={{ 
                          color: result.prediction === 'Approved' ? 'hsl(var(--accent-primary))' : 'hsl(var(--accent-error))',
                          fontWeight: 'bold',
                          marginRight: '2px'
                        }}>•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
