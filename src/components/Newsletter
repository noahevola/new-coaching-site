import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Newsletter({ embedded }: { embedded?: boolean }) {
  const [open, setOpen] = useState<boolean>(!!embedded);
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    optin: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const isValid =
    form.firstName.trim() !== '' &&
    form.email.trim() !== '' &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim());

  function handleChange<K extends keyof typeof form>(key: K, val: typeof form[K]) {
    setForm((s) => ({ ...s, [key]: val }));
  }

  async function handleSubmit() {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const { error } = await supabase.from('Newsletter').insert([
        {
          first_name: form.firstName.trim(),
          email: form.email.trim().toLowerCase(),
          optin: form.optin,
        },
      ]);

      if (error) throw error;

      setSubmitMessage('Thanks — you are subscribed!');
      // Optionally close the popup after success if not embedded
      if (!embedded) {
        setTimeout(() => setOpen(false), 800);
      }
    } catch (err: any) {
      console.error('Supabase insert error', err);
      setSubmitMessage('There was an error submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // prevent background scroll when popup open (only for modal popup)
  useEffect(() => {
    if (!embedded) {
      document.body.style.overflow = open ? 'hidden' : '';
    }
    return () => {
      if (!embedded) document.body.style.overflow = '';
    };
  }, [open, embedded]);

  const Tablet = (
    <div className="max-w-xl mx-auto px-4 font-inter">
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black">
          <span className="bg-[#FFF041] text-black px-2 py-1">Join The Daily Dose</span>
        </h3>
        <p className="mt-3 text-sm md:text-base text-gray-300 font-semibold">
          Free newsletter to begin fixing your psychology.
        </p>
      </div>

      <div className="p-4 md:p-8 rounded-lg shadow-2xl border border-gray-700 bg-gray-900/50">
        {/* Name + Email */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-white font-medium mb-2 text-sm md:text-base">
              First Name
            </label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-[#FFF041] focus:outline-none"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-sm md:text-base">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-[#FFF041] focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Opt-in */}
        <div className="flex items-start space-x-3 mb-4">
          <input
            type="checkbox"
            id="newsletter-optin"
            checked={form.optin}
            onChange={(e) => handleChange('optin', e.target.checked)}
            className="mt-1 w-4 h-4 text-[#FFF041] bg-black border-gray-600 rounded focus:ring-[#FFF041] focus:ring-2"
          />
          <label htmlFor="newsletter-optin" className="text-xs text-gray-400 leading-tight">
            By subscribing, you agree to receive the Daily Dose and occasional updates. You can unsubscribe any time.
          </label>
        </div>

        {/* Submit button */}
        <div>
          <button
            type="button"
            disabled={!isValid || isSubmitting}
            aria-disabled={!isValid || isSubmitting}
            onClick={handleSubmit}
            className={`w-full text-black font-black py-3 md:py-4 px-4 md:px-6 rounded-lg transform transition-all duration-200 flex items-center justify-center space-x-2
              ${isValid && !isSubmitting
                ? 'bg-[#FFF041] hover:bg-[#E6D93A] shadow-lg hover:scale-[1.02] hover:shadow-xl cursor-pointer'
                : 'bg-[#FFF041] opacity-40 cursor-not-allowed pointer-events-none'
              } text-sm md:text-base lg:text-lg`}
          >
            <span>{isSubmitting ? 'Processing...' : 'Subscribe'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {submitMessage && (
          <div className="mt-4 text-left text-sm text-gray-200">{submitMessage}</div>
        )}
      </div>
    </div>
  );

  // Modal wrapper for popup usage
  return (
    <>
      {!embedded && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#FFF041] text-black font-bold px-4 py-3 rounded-lg shadow-lg"
            aria-label="Open Daily Dose signup"
          >
            Join The Daily Dose
          </button>
        </div>
      )}

      {/* Popup modal */}
      {open && !embedded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-xl z-10">{Tablet}</div>
        </div>
      )}

      {/* Embedded render */}
      {embedded && <div>{Tablet}</div>}
    </>
  );
}
