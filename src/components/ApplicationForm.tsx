import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase'; // make sure this exists and is configured

export default function ApplicationForm() {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    psychology: null as boolean | null,
    work: null as boolean | null,
    invest: null as boolean | null,
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

  function setAnswer(key: 'psychology' | 'work' | 'invest', val: boolean) {
    setForm((s) => ({ ...s, [key]: val }));
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

      // open Whop checkout in a new tab
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

  return (
    <div className="mt-8 md:mt-16 max-w-4xl mx-auto px-4 font-inter">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
          <span className="bg-[#FFF041] text-black px-2 py-1">
            The OS Programme Is Cheaper Than It Will Ever Be...
          </span>
        </h2>
      </div>

      <p className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white font-bold">
        But only while the programme is being built. Very limited spaces.
      </p>

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
          {/* Question 1 */}
          <fieldset className="space-y-2">
            <legend className="text-white font-medium text-sm md:text-base text-left">
              Do you need to fix your psychology?
            </legend>
            <div className="flex gap-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="psychology"
                  checked={form.psychology === true}
                  onChange={() => setAnswer('psychology', true)}
                  className="mr-2 w-4 h-4 text-[#FFF041] bg-black border-gray-600 rounded focus:ring-[#FFF041] focus:ring-2"
                />
                <span className="text-white">Yes</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="psychology"
                  checked={form.psychology === false}
                  onChange={() => setAnswer('psychology', false)}
                  className="mr-2 w-4 h-4 text-[#FFF041] bg-black border-gray-600 rounded focus:ring-[#FFF041] focus:ring-2"
                />
                <span className="text-white">No</span>
              </label>
            </div>
          </fieldset>

          {/* Question 2 */}
          <fieldset className="space-y-2">
            <legend className="text-white font-medium text-sm md:text-base text-left">
              Are you willing to put in the work?
            </legend>
            <div className="flex gap-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="work"
                  checked={form.work === true}
                  onChange={() => setAnswer('work', true)}
                  className="mr-2 w-4 h-4 text-[#FFF041] bg-black border-gray-600 rounded focus:ring-[#FFF041] focus:ring-2"
                />
                <span className="text-white">Yes</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="work"
                  checked={form.work === false}
                  onChange={() => setAnswer('work', false)}
                  className="mr-2 w-4 h-4 text-[#FFF041] bg-black border-gray-600 rounded focus:ring-[#FFF041] focus:ring-2"
                />
                <span className="text-white">No</span>
              </label>
            </div>
          </fieldset>

          {/* Question 3 */}
          <fieldset className="space-y-2">
            <legend className="text-white font-medium text-sm md:text-base text-left">
              Are you willing to invest in yourself?
            </legend>
            <div className="flex gap-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="invest"
                  checked={form.invest === true}
                  onChange={() => setAnswer('invest', true)}
                  className="mr-2 w-4 h-4 text-[#FFF041] bg-black border-gray-600 rounded focus:ring-[#FFF041] focus:ring-2"
                />
                <span className="text-white">Yes</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="invest"
                  checked={form.invest === false}
                  onChange={() => setAnswer('invest', false)}
                  className="mr-2 w-4 h-4 text-[#FFF041] bg-black border-gray-600 rounded focus:ring-[#FFF041] focus:ring-2"
                />
                <span className="text-white">No</span>
              </label>
            </div>
          </fieldset>

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
