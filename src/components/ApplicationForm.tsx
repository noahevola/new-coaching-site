import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ApplicationForm() {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    psychology: false,
    work: false,
    invest: false,
    optin: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const allYes =
    form.psychology === true &&
    form.work === true &&
    form.invest === true &&
    form.firstName.trim() !== '' &&
    form.email.trim() !== '';

  function toggleAnswer(key: 'psychology' | 'work' | 'invest') {
    setForm((s) => ({ ...s, [key]: !s[key] }));
  }

  function handlePersonalInfoChange<K extends keyof typeof form>(
    key: K,
    val: typeof form[K]
  ) {
    setForm((s) => ({ ...s, [key]: val }));
  }

  async function handleInstallClick() {
    if (!allYes || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const { error } = await supabase.from('applications').insert([
        {
          first_name: form.firstName.trim(),
          email: form.email.trim().toLowerCase(),
          optin: form.optin,
        },
      ]);

      if (error) throw error;

      setSubmitMessage('Thanks — redirecting you now...');
      window.open(
        'https://whop.com/checkout/plan_deDYBAn2v2DdL?d2c=true',
        '_blank'
      );
    } catch (err: any) {
      console.error('Supabase insert error', err);
      setSubmitMessage('There was an error submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const questions: { key: 'psychology' | 'work' | 'invest'; text: string }[] = [
    { key: 'psychology', text: 'Do you need to fix your psychology?' },
    { key: 'work', text: 'Are you willing to put in the work?' },
    { key: 'invest', text: 'Are you willing to invest in yourself?' },
  ];

  return (
    <div className="mt-8 md:mt-16 max-w-4xl mx-auto px-4 font-inter">
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
              onChange={(e) =>
                handlePersonalInfoChange('firstName', e.target.value)
              }
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
              onChange={(e) =>
                handlePersonalInfoChange('email', e.target.value)
              }
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-[#FFF041] focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map(({ key, text }) => (
            <div key={key}>
              <label className="text-white font-medium text-sm md:text-base text-left mb-2 block">
                {text}
              </label>
              <div
                className="w-40 h-10 flex items-center rounded-full cursor-pointer"
                onClick={() => toggleAnswer(key)}
              >
                <div
                  className={`flex-1 text-center text-white font-bold rounded-full h-full flex items-center justify-center transition-all duration-300 ${
                    form[key]
                      ? 'bg-[#FFF041] order-2'
                      : 'bg-gray-600 order-1'
                  }`}
                  style={{ width: '50%' }}
                >
                  Yes
                </div>
                <div
                  className={`flex-1 text-center text-white font-bold rounded-full h-full flex items-center justify-center transition-all duration-300 ${
                    form[key]
                      ? 'bg-gray-600 order-1'
                      : 'bg-gray-600 order-2'
                  }`}
                  style={{ width: '50%' }}
                >
                  No
                </div>
              </div>
            </div>
          ))}

          {/* Opt-in */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="popup-optin"
              checked={form.optin}
              onChange={(e) =>
                handlePersonalInfoChange('optin', e.target.checked)
              }
              className="mt-1 w-4 h-4 text-[#FFF041] bg-black border-gray-600 rounded focus:ring-[#FFF041] focus:ring-2"
            />
            <label
              htmlFor="popup-optin"
              className="text-xs text-gray-400 leading-tight"
            >
              By subscribing, you agree to receive our newsletter and occasional
              updates. You can unsubscribe at any time via the link in our
              emails.
            </label>
          </div>

          {/* Install button */}
          <div>
            <button
              type="button"
              disabled={!allYes || isSubmitting}
              aria-disabled={!allYes || isSubmitting}
              className={`w-full text-black font-black py-3 md:py-4 px-4 md:px-6 rounded-lg transform transition-all duration-200 flex items-center justify-center space-x-2
                ${
                  allYes && !isSubmitting
                    ? 'bg-[#FFF041] hover:bg-[#E6D93A] shadow-lg hover:scale-[1.02] hover:shadow-xl cursor-pointer'
                    : 'bg-[#FFF041] opacity-40 cursor-not-allowed pointer-events-none'
                } text-sm md:text-base lg:text-lg`}
              onClick={handleInstallClick}
            >
              <span>{isSubmitting ? 'Processing...' : 'Install'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {submitMessage && (
            <div className="mt-4 text-left text-sm text-gray-200">
              {submitMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
