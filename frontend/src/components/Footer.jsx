import React from 'react';
import { Landmark } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', fontWeight: 'bold' }}>
          <Landmark size={18} style={{ color: '#60a5fa' }} />
          CreditWise AI
        </div>
        <p>© 2026 CreditWise Financial Technology. All rights reserved. Single source of truth model calibrated.</p>
        <ul className="footer-links">
          <li>
            <a href="#" className="footer-link" onClick={() => onNavigate('landing')}>Dashboard</a>
          </li>
          <li>
            <a href="#" className="footer-link" onClick={() => onNavigate('prediction')}>Simulator</a>
          </li>
          <li>
            <a href="#" className="footer-link" onClick={() => onNavigate('about')}>Metrics</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
