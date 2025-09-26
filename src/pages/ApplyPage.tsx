import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ApplicationFormProps {
  source?: string;
}

export function ApplicationForm({ source }: ApplicationFormProps) {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    psychologyIssue: '',
    lastMajorLoss: '',
    fixOneAspect: '',
    contactMethod: '',
    contactHandle: '',
    contactNumber: '',
    optin: true,
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const isFormValid = () => {
    const basicInfo =
      form.firstName.trim() !== '' &&
      form.email.trim() !== '' &&
      form.psychologyIssue.trim() !== '' &&
      form.lastMajorLoss.trim() !== '' &&
      form.fixOneAspect.trim() !== '' &&
      form.contactMethod !== '';

    if (!basicInfo) return false;

    if ((form.contactMethod === 'X' || form.contactMethod === 'Instagram') && form.contactHandle.trim() === '') {
      return false;
    }

    if ((form.contactMethod === 'WhatsApp' || form.contactMethod === 'Telegram') && form.contactNumber.trim() === '') {
      return false;
    }

    // honeypot should be empty
    if ((form as any).honeypot && (form as any).honeypot.trim() !== '') return false;

    return true;
  };

  const handleInputChange = <K extends keyof typeof form>(key: K, val: typeof form[K]) => {
    setForm((s) => {
      if (key === 'contactMethod') {
        // clear conditional fields on contact method change in the same update
        return { ...s, contactMethod: val as string, contactHandle: '', contactNumber: '' };
      }
      return { ...s, [key]: val };
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid() || isSubmitting) {
      if (!isFormValid()) setSubmitMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const contactInfo =
        form.contactMethod === 'X' || form.contactMethod === 'Instagram'
          ? form.contactHandle
          : form.contactNumber;

      // --- robust finalSource resolution ---
      // priority: URL param -> sessionStorage -> prop -> 'direct'
      let finalSource: string | null = null;

      // 1) URL param (current location)
      try {
        const params = new URLSearchParams(window.location.search);
        const urlSource = params.get('source');
        if (urlSource && urlSource.trim() !== '') {
          finalSource = urlSource.trim();
          // persist for fallback/navigation
          try {
            sessionStorage.setItem('applicationSource', finalSource);
          } catch (e) {
            // ignore sessionStorage errors
          }
        }
      } catch (e) {
        // ignore
      }

      // 2) sessionStorage fallback
      if (!finalSource) {
        try {
          const sessionSource = sessionStorage.getItem('applicationSource');
          if (sessionSource && sessionSource.trim() !== '') finalSource = sessionSource.trim();
        } catch (e) {
          // ignore
        }
      }

      // 3) prop fallback
      if (!finalSource && source && source.trim() !== '') {
        finalSource = source.trim();
      }

      // 4) final fallback
      if (!finalSource) finalSource = 'direct';
      // --- end finalSource resolution ---

      // debug log
      console.log('Application submit payload finalSource:', finalSource);

      const payload = {
        first_name: form.firstName.trim(),
        email: form.email.trim().toLowerCase(),
        psychology_issue: form.psychologyIssue.trim(),
        last_major_loss: form.lastMajorLoss.trim(),
        fix_one_aspect: form.fixOneAspect.trim(),
        contact_method: form.contactMethod,
        contact_info: (contactInfo || '').trim(),
        optin: form.optin,
        source: finalSource,
        created_at: new Date().toISOString(),
        honeypot: (form as any).honeypot ?? '',
      };

      // Plain insert (no .select())
      const { data, error } = await supabase.from('applications').insert([payload]);
      console.log('Supabase insert response:', { data, error });

      if (error) throw error;

      setSubmitMessage('I will be in touch within 24hrs, please keep an eye on your inbox');

      try {
        sessionStorage.removeItem('applicationSource');
      } catch (e) {
        // ignore
      }

      // reset form
      setForm({
        firstName: '',
        email: '',
        psychologyIssue: '',
        lastMajorLoss: '',
        fixOneAspect: '',
        contactMethod: '',
        contactHandle: '',
        contactNumber: '',
        optin: true,
        honeypot: '',
      });
    } catch (err: any) {
      console.error('Supabase insert error', err);
      setSubmitMessage('There was an error submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContactField = () => {
    if (!form.contactMethod) return null;

    if (form.contactMethod === 'X' || form.contactMethod === 'Instagram') {
      return (
        <div>
          <label className="block text-white font-medium mb-2 text-sm md:text-base">
            Your {form.contactMethod} Handle
          </label>
          <input
            type="text"
            value={form.contactHandle}
            onChange={(e) => handleInputChange('contactHandle', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder={form.contactMethod === 'X' ? '@yourhandle' : `@your${form.contactMethod.toLowerCase()}handle`}
          />
        </div>
      );
    }

    if (form.contactMethod === 'WhatsApp' || form.contactMethod === 'Telegram') {
      return (
        <div>
          <label className="block text-white font-medium mb-2 text-sm md:text-base">
            Your {form.contactMethod} Number
          </label>
          <input
            type="tel"
            value={form.contactNumber}
            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="+1234567890"
          />
        </div>
      );
    }

    return null;
  };

  // visible debug
  const resolvedSourceDebug = (() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('source') || sessionStorage.getItem('applicationSource') || source || 'direct';
    } catch (e) {
      return source || 'direct';
    }
  })();

  return (
    <div className="mt-8 md:mt-16 max-w-4xl mx-auto px-4 font-inter">
      <div className="mb-4 text-xs text-gray-300">
        <strong>Debug:</strong> resolved source = <span className="font-mono">{resolvedSourceDebug}</span>
      </div>

      <div className="p-4 md:p-8 rounded-lg shadow-2xl border border-gray-700 bg-gray-900/50">
        {/* Personal Info */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-white font-medium mb-2 text-sm md:text-base">First Name</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-sm md:text-base">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Trading Psychology Questions */}
        <div className="space-y-6 mb-6">
          <div>
            <label className="block text-white font-medium mb-2 text-sm md:text-base">
              What's the #1 trading psychology issue that's currently costing you money?
            </label>
            <textarea
              value={form.psychologyIssue}
              onChange={(e) => handleInputChange('psychologyIssue', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[80px]"
              placeholder="e.g., revenge trading, FOMO, cutting winners short..."
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-sm md:text-base">
              Describe your last major trading loss - what was going through your mind?
            </label>
            <textarea
              value={form.lastMajorLoss}
              onChange={(e) => handleInputChange('lastMajorLoss', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[100px]"
              placeholder="Tell me the story of what happened and what you were thinking/feeling..."
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-sm md:text-base">
              If you could only fix ONE aspect of your trading psychology in the next 12 weeks, what would have the biggest impact on your profits?
            </label>
            <textarea
              value={form.fixOneAspect}
              onChange={(e) => handleInputChange('fixOneAspect', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[80px]"
              placeholder="What's the one thing that would transform your trading results?"
            />
          </div>
        </div>

        {/* Contact Method */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-white font-medium mb-2 text-sm md:text-base">Where can I contact you?</label>
            <select
              value={form.contactMethod}
              onChange={(e) => handleInputChange('contactMethod', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select contact method</option>
              <option value="X">X (Twitter)</option>
              <option value="Instagram">Instagram</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Telegram">Telegram</option>
            </select>
          </div>

          {renderContactField()}
        </div>

        {/* Honeypot (invisible to human users) */}
        <div style={{ display: 'none' }}>
          <label>Leave this empty</label>
          <input
            type="text"
            value={form.honeypot}
            onChange={(e) => handleInputChange('honeypot', e.target.value)}
            name="honeypot"
            autoComplete="off"
          />
        </div>

        {/* Opt-in */}
        <div className="flex items-start space-x-3 mb-6">
          <input
            type="checkbox"
            id="popup-optin"
            checked={form.optin}
            onChange={(e) => handleInputChange('optin', e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-500 bg-black border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="popup-optin" className="text-xs text-gray-400 leading-tight">
            By subscribing, you agree to receive our newsletter and occasional updates. You can unsubscribe at any time via the link in our emails.
          </label>
        </div>

        {/* Submit button */}
        <div>
          <button
            type="button"
            disabled={!isFormValid() || isSubmitting}
            aria-disabled={!isFormValid() || isSubmitting}
            className={`w-full text-black font-black py-3 md:py-4 px-4 md:px-6 rounded-lg transform transition-all duration-200 flex items-center justify-center space-x-2
              ${
                isFormValid() && !isSubmitting
                  ? 'bg-[#FFF041] hover:bg-[#E6D93A] shadow-lg hover:scale-[1.02] hover:shadow-xl cursor-pointer'
                  : 'bg-[#FFF041] opacity-40 cursor-not-allowed pointer-events-none'
              } text-sm md:text-base lg:text-lg`}
            onClick={handleSubmit}
          >
            <span>{isSubmitting ? 'Processing...' : 'Apply Now'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {submitMessage && <div className="mt-4 text-left text-sm text-gray-200">{submitMessage}</div>}
      </div>
    </div>
  );
}

export default function ApplyPage() {
  const [searchParams] = useSearchParams();
  // initialize to empty so child can prefer URL/sessionStorage over a default value
  const [source, setSource] = useState<string>('');

  useEffect(() => {
    // Get source from URL params
    const urlSource = searchParams.get('source');
    if (urlSource) {
      setSource(urlSource);
      try {
        sessionStorage.setItem('applicationSource', urlSource);
      } catch (e) {
        // ignore sessionStorage errors (e.g., SSR)
      }
    } else {
      // Check sessionStorage for source if no URL param
      try {
        const sessionSource = sessionStorage.getItem('applicationSource');
        if (sessionSource) {
          setSource(sessionSource);
        }
      } catch (e) {
        // ignore
      }
    }
  }, [searchParams]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
            <span className="bg-[#FFF041] text-black px-2 py-1">Apply To The OS Programme</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white font-bold">
            The OS Programme is currently in beta - which means it's the cheapest it will ever be. Limited spaces, I can only take on a few people.
          </p>
        </div>
        <section id="apply-form" style={{ scrollMarginTop: '100px' }}>
          <ApplicationForm source={source} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
