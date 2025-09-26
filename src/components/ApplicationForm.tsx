import React from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useSearchParams } from 'react-router-dom';

interface ApplicationFormProps {
  source?: string;
}

type FormState = {
  firstName: string;
  email: string;
  psychologyIssue: string;
  lastMajorLoss: string;
  fixOneAspect: string;
  contactMethod: string;
  contactHandle: string;
  contactNumber: string;
  optin: boolean;
};

export default function ApplicationForm({ source }: ApplicationFormProps) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = React.useState<FormState>({
    firstName: '',
    email: '',
    psychologyIssue: '',
    lastMajorLoss: '',
    fixOneAspect: '',
    contactMethod: '',
    contactHandle: '',
    contactNumber: '',
    optin: true,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState<string | null>(null);

  // Determine source robustly: prop -> URL param -> sessionStorage -> default
  const determineSource = (): string => {
    if (source && source.trim() !== '') {
      return source;
    }
    const urlSource = searchParams.get('source');
    if (urlSource && urlSource.trim() !== '') {
      return urlSource;
    }
    const sessionSource = sessionStorage.getItem('applicationSource');
    if (sessionSource && sessionSource.trim() !== '') {
      return sessionSource;
    }
    return 'direct';
  };

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

    return true;
  };

  // Generic state updater with single-set for contactMethod clearing
  const handleInputChange = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((s) => {
      // if contactMethod changed, clear conditional contact fields in same update
      if (key === 'contactMethod') {
        return {
          ...s,
          contactMethod: val as string,
          contactHandle: '',
          contactNumber: '',
        };
      }
      return { ...s, [key]: val };
    });
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

  const handleSubmit = async () => {
    if (!isFormValid() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const contactInfo =
        form.contactMethod === 'X' || form.contactMethod === 'Instagram'
          ? form.contactHandle
          : form.contactNumber;

      const finalSource = determineSource();

      // Log helpful debugging info to console
      console.log('Submitting application payload — form:', form);
      console.log('Determined source:', finalSource);

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
      };

      // <-- IMPORTANT: plain insert without .select()
      const { data, error } = await supabase.from('applications').insert([payload]);

      console.log('Supabase insert response:', { data, error });

      if (error) throw error;

      setSubmitMessage('I will be in touch within 24hrs, please keep an eye on your inbox');

      try {
        sessionStorage.removeItem('applicationSource');
      } catch (e) {
        // ignore
      }
    } catch (err: any) {
      console.error('Supabase insert error', err);
      setSubmitMessage('There was an error submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 md:mt-16 max-w-4xl mx-auto px-4 font-inter">
      <div className="p-4 md:p-8 rounded-lg shadow-2xl border border-gray-700 bg-gray-900/50">
        {/* (UI fields unchanged - omitted here for brevity in the snippet) */}
        {/* Copy your full form UI from the previous version here; the submission logic above is the important part. */}
        {/* ... */}
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

        {submitMessage && (
          <div className="mt-4 text-left text-sm text-gray-200">
            {submitMessage}
          </div>
        )}
      </div>
    </div>
  );
}


