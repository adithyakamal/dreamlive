import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

class RootErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('DreamLive Root Error Caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#0a0518', color: '#ff6b81', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#ff4757', fontSize: '24px', marginBottom: '16px' }}>⚠️ DreamLive Runtime Exception Caught</h1>
          <pre style={{ background: '#190a2e', padding: '16px', borderRadius: '8px', color: '#f1f2f6', overflow: 'auto', border: '1px solid #7158e2' }}>
            {this.state.error?.toString()}
          </pre>
          <pre style={{ background: '#190a2e', padding: '16px', borderRadius: '8px', color: '#a4b0be', overflow: 'auto', marginTop: '16px', border: '1px solid #574b90' }}>
            {this.state.errorInfo?.componentStack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '10px 20px', background: '#8e44ad', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RootErrorBoundary>
  </StrictMode>,
);
