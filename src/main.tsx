// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import TradersOS from './pages/TradersOS.tsx';
import TradersOSPage from './pages/TradersOSPage.tsx';
import DiagnosisPage from './pages/DiagnosisPage.tsx';
import BacktestingPage from './pages/Backtesting.tsx';
import ApplyPage from './pages/ApplyPage.tsx';
import NewsletterPage from './pages/NewsletterPage.tsx';
import OSProgramme from './pages/os-programme.tsx';

// Video pages
import LockedInPage from './pages/videos/LockedInPage.tsx';
import OSProgrammeNewsletter from './pages/videos/OSProgramme-Newsletter.tsx';
import Video1Page from './pages/videos/Video1Page.tsx';
import Video2Page from './pages/videos/Video2Page.tsx';
import Video3Page from './pages/videos/Video3Page.tsx';
import Video4Page from './pages/videos/Video4Page.tsx';
import Video5Page from './pages/videos/Video5Page.tsx';
import Video6Page from './pages/videos/Video6Page.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Core pages */}
        <Route path="/" element={<TradersOSPage />} />
        <Route path="/form" element={<App />} />
        <Route path="/tradersos" element={<TradersOS />} />
        <Route path="/traders-os" element={<TradersOSPage />} />
        <Route path="/free-analysis" element={<DiagnosisPage />} />
        <Route path="/backtesting-method" element={<BacktestingPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/os-programme" element={<OSProgramme />} />

        {/* Special pages */}
        <Route path="/locked-in" element={<LockedInPage />} />
        <Route path="/os-programme-newsletter" element={<OSProgrammeNewsletter />} />

        {/* Video pages */}
        <Route path="/video-1" element={<Video1Page />} />
        <Route path="/video-2" element={<Video2Page />} />
        <Route path="/video-3" element={<Video3Page />} />
        <Route path="/video-4" element={<Video4Page />} />
        <Route path="/video-5" element={<Video5Page />} />
        <Route path="/video-6" element={<Video6Page />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

