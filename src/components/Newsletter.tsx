// src/components/Newsletter.tsx
import React, { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Props = {
  embedded?: boolean;
  title?: string;
  subtitle?: string;
};

export default function Newsletter({ embedded, title, subtitle }: Props) {
  const defaultTitle = 'Join My Free Newsletter';
  const defaultSubtitle = 'Daily wisdom to speedrun trading psychology';

  const headerTitle = title ?? defaultTitle;
  const headerSubtitle = subtitle ?? defaultSubtitle;

  // open state: embedded true => open by default; popup => controlled by session
  const [open, setOpen] = useState<boolean>(() => !!embedded);

  const [form, setForm] = useState({ firstName: '', email: '', optin: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  // campaignSource = traffic slug (video-1, locked-in, etc)
  const [campaignSource, setCampaignSource] = useState<string | null>(null);

  // derive sourceChannel: 'page' if embedded (inline form on /newsletter), else 'popup'
  const sourceChannel = embedded ? 'page' : 'popup';

  const isValid =
    form.firstName.trim() !== '' &&
    form.email.trim() !== '' &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim());

  function handleChange<K extends keyof typeof form>(key: K, val: typeof form[K]) {
    setForm((s) => ({ ...s, [key]: val }));
  }

  // Resolve campaignSource on mount:
  // priority: URL param `?source=...` -> sessionStorage.applicationSource -> null
  useEffect(() => {
    try {
      // URL param
      const params = new URLSearchParams(window.location.search);
      const urlSource = params.get('source');
      if (urlSource && urlSource.trim() !== '') {
        setCampaignSource(urlSource.trim());
        // persist so other pages/forms can read it
        try { sessionStorage.setItem('applicationSource', urlSource.trim()); } catch (e) {}
        return;
      }
    } catch (e) {
      // ignore URL parse error
    }

    // fallback to sessionStorage
    try {
      const sessionSource = sessionStorage.getItem('applicationSource');
      if (sessionSource && sessionSource.trim() !== '') {
        setCampaignSource(sessionSource.trim());
      } else {
        setCampaignSource(null);
      }
    } catch (e) {
      setCampaignSource(null);
    }
  }, []);

  async function handleSubmit() {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const payload = {
        first_name: form.firstName.trim(),
        email: form.email.trim().toLowerCase(),
        optin: form.optin,
        source: sourceChannel, // 'page' or 'popup'
        campaign_source: campaignSource, // e.g. 'video-1' or null
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase.from('newsletter').insert([payload]);

      if (error) throw error;

      setSubmitMessage('Thanks — you are subscribed!');
      setForm({ firstName: '', email: '', optin: true });

      // if popup, close after small delay
      if (!embedded) setTimeout(() => setOpen(false), 800);
    } catch (err: any) {
      console.error('Supabase insert error:', err);
      setSubmitMessage('There was an error submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Auto-open popup once per session if not embedded
  useEffect(() => {
    if (!embedded && !sessionStorage.getItem('newsletterPopupShown')) {
      const t = setTimeout(() => setOpen(true), 250);
      sessionStorage.setItem('newsletterPopupShown', 'true');
      return () => clearTimeout(t);
    }
  }, [embedded]);

  // Prevent background scroll for popup
  useEffect(() => {
    if (!embedded) document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      if (!embedded) document.body.style.overflow = '';
    };
  }, [open, embedded]);

  const HeaderBlock = (
    <div className="text-center mb-6 px-2">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black">
        <span className="bg-[#FFF041] text-black px-2 py-1">{headerTitle}</span>
      </h3>
      <p className="mt-3 text-lg font-semibold">{headerSubtitle}</p>
      {/* Small debug row — remove for production if you want */}
      <div className="mt-2 text-xs text-gray-400">
        {campaignSource ? (
          <span>Referrer: <span className="font-mono">{campaignSource}</span></span>
        ) : (
          <span className="italic text-gray-500">No campaign source detected</span>
        )}
      </div>
    </div>
  );

  const FormBlock = (
    <div className="max-w-xl w-full mx-auto px-4 font-inter">
      <div className="p-4 md:p-8 rounded-lg shadow-2xl border border-gray-700 bg-gray-900/60">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-white font-medium mb-2 text-sm md:text-base">First Name</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-[#FFF041] focus:outline-none"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-sm md:text-base">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-[#FFF041] focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="flex items-start space-x-3 mb-4">
          <input
            type="checkbox"
            id="newsletter-optin"
            checked={form.optin}
            onChange={(e) => handleChange('optin', e.target.checked)}
            className="mt-1 w-4 h-4 text-[#FFF041] bg-black border-gray-600 rounded focus:ring-[#FFF041] focus:ring-2"
          />
          <label htmlFor="newsletter-optin" className="text-xs text-gray-400 leading-tight">
            By subscribing, you agree to receive the newsletter and occasional updates. You can unsubscribe any time.
          </label>
        </div>

        <button
          type="button"
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit}
          className={`w-full text-black font-black py-3 md:py-4 px-4 md:px-6 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200
            ${isValid && !isSubmitting
              ? 'bg-[#FFF041] hover:bg-[#E6D93A] shadow-lg hover:scale-[1.02] cursor-pointer'
              : 'bg-[#FFF041] opacity-40 cursor-not-allowed pointer-events-none'
            }`}
        >
          <span>{isSubmitting ? 'Processing...' : 'Subscribe'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {submitMessage && <div className="mt-4 text-left text-sm text-gray-200">{submitMessage}</div>}
      </div>
    </div>
  );

  // Embedded usage: render only the form (the NewsletterPage provides header)
  if (embedded) {
    return (
      <div className="w-full">
        {FormBlock}
      </div>
    );
  }

  // Popup usage: show header + form inside popup
  return (
    open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className="relative w-full max-w-xl z-10">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close newsletter popup"
            className="absolute -top-4 -right-4 z-20 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mx-2">
            <div className="mb-4">{HeaderBlock}</div>
            {FormBlock}
          </div>
        </div>
      </div>
    )
  );
}

