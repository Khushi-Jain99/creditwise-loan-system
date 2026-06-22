import React from 'react';
import { ShieldCheck, BarChart3, Clock, HelpCircle, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-badge animate-fade-in">
            <Sparkles size={14} /> Powered by Advanced Naive Bayes Classifier
          </div>
          <h1 className="hero-title">
            Predict Loan Approvals with <span>CreditWise</span> AI
          </h1>
          <p className="hero-desc">
            Instantly evaluate applicant creditworthiness, loan debt ratios, and risk metrics using our production-ready machine learning prediction engine.
          </p>
          <div className="btn-group">
            <button 
              className="btn btn-primary" 
              onClick={() => onNavigate('prediction')}
            >
              Start Simulator
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate('about')}
            >
              View Model Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container">
        <div className="stats-grid">
          <div className="glass-card stat-card">
            <div className="stat-label">
              <ShieldCheck size={16} className="text-emerald" /> Model Accuracy
            </div>
            <div className="stat-value">86.5%</div>
            <div className="stat-desc">Optimized Naive Bayes classification accuracy.</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-label">
              <Clock size={16} className="text-blue" /> Instant Evaluation
            </div>
            <div className="stat-value">&lt; 0.25s</div>
            <div className="stat-desc">Real-time inference response from Flask server.</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-label">
              <Activity size={16} className="text-purple" /> Min Credit Score
            </div>
            <div className="stat-value">550</div>
            <div className="stat-desc">Standard threshold required for risk evaluation.</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-label">
              <BarChart3 size={16} className="text-yellow" /> Feature Columns
            </div>
            <div className="stat-value">27</div>
            <div className="stat-desc">DTI scaling, collateral parameters, and one-hot states.</div>
          </div>
        </div>
      </section>

      {/* Feature Details Section */}
      <section className="feature-section container" style={{ marginTop: '5rem' }}>
        <div className="section-header">
          <div className="section-subtitle">Core Capabilities</div>
          <h2 className="section-title">Engineered for High-Trust Lending</h2>
          <p className="section-desc">
            A comprehensive suite of evaluation features designed to automate risk decisions while preserving full transparency.
          </p>
        </div>

        <div className="features-grid">
          <div className="glass-card">
            <div className="feature-icon-wrapper flex-center" style={{ color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 className="feature-title">Robust Imputation</h3>
            <p className="feature-desc">
              Automatic mean-imputation for missing numerical attributes and mode-imputation for categorical values, safeguarding system inputs against empty values.
            </p>
          </div>

          <div className="glass-card">
            <div className="feature-icon-wrapper flex-center" style={{ color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <Sparkles size={24} />
            </div>
            <h3 className="feature-title">Feature Squared Expansion</h3>
            <p className="feature-desc">
              Incorporates non-linear transformations by mapping <code>DTI_Ratio_sq</code> and <code>Credit_Score_sq</code> directly into the scaler, capturing high-order risk parameters.
            </p>
          </div>

          <div className="glass-card">
            <div className="feature-icon-wrapper flex-center" style={{ color: '#8b5cf6', backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
              <BarChart3 size={24} />
            </div>
            <h3 className="feature-title">One-Hot Encoding</h3>
            <p className="feature-desc">
              Transforms employment status, marital status, gender, loan purpose, and property area into high-dimensional binary vectors with unseen state protection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
