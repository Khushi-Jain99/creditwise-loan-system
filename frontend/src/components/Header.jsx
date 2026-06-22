import React from 'react';
import { Landmark, ArrowUpRight } from 'lucide-react';

const Header = ({ currentPage, onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="#" className="nav-logo" onClick={() => onNavigate('landing')}>
          <Landmark size={22} style={{ color: '#60a5fa' }} />
          Credit<span>Wise</span>
        </a>
        <ul className="nav-links">
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`}
              onClick={() => onNavigate('landing')}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'prediction' ? 'active' : ''}`}
              onClick={() => onNavigate('prediction')}
            >
              Simulator
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => onNavigate('about')}
            >
              Model Metrics
            </a>
          </li>
          <li>
            <button 
              className="btn nav-cta" 
              onClick={() => onNavigate('prediction')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            >
              Evaluate Loan <ArrowUpRight size={14} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
