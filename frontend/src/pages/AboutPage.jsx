import React from 'react';
import { BarChart3, ShieldCheck, Flame, GitMerge, FileSpreadsheet } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>Model Evaluation & Methodology</h1>
        <p className="section-desc" style={{ marginLeft: 0, maxWidth: '750px' }}>
          Explore the machine learning pipeline, performance metrics, and feature transformations behind the CreditWise predictive engine.
        </p>
      </div>

      <div className="form-layout" style={{ gridTemplateColumns: '1fr', gap: '3rem' }}>
        {/* Model Analysis Card */}
        <div className="glass-card">
          <h3 className="form-section-title" style={{ color: '#60a5fa' }}>
            <BarChart3 size={18} /> Model Selection & Benchmark Metrics
          </h3>
          <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Three classification models were trained and evaluated: Logistic Regression, K-Nearest Neighbors (KNN), and Gaussian Naive Bayes.
            The evaluation prioritized <strong>Precision</strong> to minimize false positives (approving a loan that would actually default).
          </p>

          <table className="metrics-table">
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Accuracy</th>
                <th>Precision (Approval Class)</th>
                <th>Recall (Approval Class)</th>
                <th>F1-Score</th>
                <th>Selection Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>K-Nearest Neighbors (KNN)</td>
                <td>80.5%</td>
                <td>73.2%</td>
                <td>68.9%</td>
                <td>71.0%</td>
                <td>Evaluated</td>
              </tr>
              <tr>
                <td>Logistic Regression</td>
                <td>82.0%</td>
                <td>76.4%</td>
                <td>72.1%</td>
                <td>74.2%</td>
                <td>Evaluated</td>
              </tr>
              <tr className="highlight-row">
                <td style={{ fontWeight: 'bold', color: '#ffffff' }}>Gaussian Naive Bayes (Fitted)</td>
                <td style={{ fontWeight: 'bold', color: '#ffffff' }}>86.5%</td>
                <td style={{ fontWeight: 'bold', color: '#34d399' }}>78.3%</td>
                <td style={{ fontWeight: 'bold', color: '#ffffff' }}>81.2%</td>
                <td style={{ fontWeight: 'bold', color: '#ffffff' }}>79.7%</td>
                <td>
                  <span className="highlight-badge">Selected Model</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', marginTop: '1rem', fontStyle: 'italic' }}>
            *Note: Metric benchmarks are recorded after running fit_transform on the final engineered 27 feature columns.
          </p>
        </div>

        {/* Feature Engineering Explainers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-card">
            <h4 className="form-section-title" style={{ color: '#10b981' }}>
              <ShieldCheck size={18} /> Feature Transformations
            </h4>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              To boost linear separability for Gaussian boundaries, we dropped raw <code>Credit_Score</code> and <code>DTI_Ratio</code>, replacing them with squared versions:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '0.5rem' }}>
              <li style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))' }}>
                <strong>1. DTI Ratio Squared:</strong> <code style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px 4px', borderRadius: '4px' }}>DTI_Ratio_sq = DTI_Ratio ^ 2</code>
              </li>
              <li style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))' }}>
                <strong>2. Credit Score Squared:</strong> <code style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px 4px', borderRadius: '4px' }}>Credit_Score_sq = Credit_Score ^ 2</code>
              </li>
            </ul>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.92rem', lineHeight: 1.6, marginTop: '1rem' }}>
              This emphasizes extreme outliers and high credit ranges, significantly increasing Gaussian Naive Bayes classifier precision by +4.2%.
            </p>
          </div>

          <div className="glass-card">
            <h4 className="form-section-title" style={{ color: '#fb7185' }}>
              <Flame size={18} /> Robust Imputation & Encoding
            </h4>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.92rem', lineHeight: 1.6 }}>
              The dataset contains scattered missing numerical values and categorical states. 
              The pipeline utilizes a mean imputer for numerical features and a mode imputer (most frequent value) for categorical variables.
            </p>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.92rem', lineHeight: 1.6, marginTop: '1rem' }}>
              One-Hot Encoding handles all nominal categorical columns (such as employment status, marital status, loan purpose, property location, gender, and employer category), converting them into sparse binary flags with unseen option protection enabled.
            </p>
          </div>
        </div>

        {/* Source of Truth note */}
        <div className="glass-card flex-center" style={{ gap: '1rem', justifyContent: 'flex-start', borderLeft: '4px solid hsl(var(--accent-secondary))' }}>
          <FileSpreadsheet size={32} style={{ color: '#60a5fa' }} />
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Single Source of Truth Preservation</h4>
            <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '0.25rem', lineHeight: 1.5 }}>
              The exact trained model and scaling parameters are extracted from the original Jupyter training notebook pipeline. No model variables, weights, threshold limits, or hyperparameters have been modified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
