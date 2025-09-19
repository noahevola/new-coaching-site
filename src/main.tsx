import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import TradersOS from './pages/TradersOS.tsx';
import TradersOSPage from './pages/TradersOSPage.tsx';
import DiagnosisPage from './pages/DiagnosisPage.tsx';
import BacktestingPage from './pages/Backtesting.tsx'
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TradersOSPage />} />
        <Route path="/form" element={<App />} />
        <Route path="/tradersos" element={<TradersOS />} />
        <Route path="/traders-os" element={<TradersOSPage />} />
        <Route path="/free-analysis" element={<DiagnosisPage />} />
        <Route path="/backtesting-method" element={<BacktestingPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
