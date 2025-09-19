import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface TemperamentResponse {
  name: string;
  email: string;
  optin: boolean;
  q1_bucket: string;
  q2_bucket: string;
  q3_bucket: string;
  q4_bucket: string;
  q5_bucket: string;
  q6_bucket: string;
  q7_bucket: string;
  q8_bucket: string;
  q9_bucket: string;
  q10_bucket: string;
}

const questions = [
  {
    id: 'q1',
    prompt: "When your setup doesn't appear, how often do you still take a trade just to stay active?",
    scaleLeft: "Not often",
    scaleRight: "Very often"
  },
  {
    id: 'q2',
    prompt: "How often do you place trades that weren't in your plan?",
    scaleLeft: "Not often",
    scaleRight: "Very often"
  },
  {
    id: 'q3',
    prompt: "After a losing trade, how likely are you to take another one immediately to make back the loss?",
    scaleLeft: "Unlikely",
    scaleRight: "Very likely"
  },
  {
    id: 'q4',
    prompt: "How often do you find yourself taking more trades than planned?",
    scaleLeft: "Not often",
    scaleRight: "Very often"
  },
  {
    id: 'q5',
    prompt: "How often do you modify your stop loss mid-trade?",
    scaleLeft: "Not often",
    scaleRight: "Very often"
  },
  {
    id: 'q6',
    prompt: "How much does your mood outside trading spill into decisions?",
    scaleLeft: "Not much",
    scaleRight: "A lot"
  },
  {
    id: 'q7',
    prompt: "How often do you check trades obsessively or jump between charts?",
    scaleLeft: "Not often",
    scaleRight: "Very often"
  },
  {
    id: 'q8',
    prompt: "After a losing streak, how quickly do you return to trading normally?",
    scaleLeft: "Slowly",
    scaleRight: "Quickly"
  },
  {
    id: 'q9',
    prompt: "How often do you hesitate and miss trades that were in your plan?",
    scaleLeft: "Not often",
    scaleRight: "Very often"
  },
  {
    id: 'q10',
    prompt: "How consistently do you start with a written plan or checklist?",
    scaleLeft: "Inconsistently",
    scaleRight: "All the time"
  }
];

function DiagnosisPage() {
  const [formData, setFormData] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
    q6: 0,
    q7: 0,
    q8: 0,
    q9: 0,
    q10: 0
  });

  const [showPopup, setShowPopup] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    optin: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const mapToBucket = (value: number): string => {
    if (value >= 1 && value <= 2) return 'low';
    if (value >= 3 && value <= 4) return 'medium';
    if (value >= 5 && value <= 6) return 'high';
    return '';
  };

  const isValidEmail = (email: string): boolean => {
    return email.includes('@') && email.includes('.');
  };

  const areQuestionsComplete = (): boolean => {
    return questions.every(q => formData[q.id as keyof typeof formData] >= 1);
  };

  const isPersonalInfoValid = (): boolean => {
    return personalInfo.name.trim().length > 0 && isValidEmail(personalInfo.email);
  };

  const handleQuestionChange = (questionId: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCompleteClick = () => {
    if (areQuestionsComplete()) {
      setShowPopup(true);
    }
  };

  const handlePersonalInfoChange = (field: string, value: string | boolean) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!isPersonalInfoValid()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const responseData: TemperamentResponse = {
        name: personalInfo.name.trim(),
        email: personalInfo.email.trim(),
        optin: personalInfo.optin,
        q1_bucket: mapToBucket(formData.q1),
        q2_bucket: mapToBucket(formData.q2),
        q3_bucket: mapToBucket(formData.q3),
        q4_bucket: mapToBucket(formData.q4),
        q5_bucket: mapToBucket(formData.q5),
        q6_bucket: mapToBucket(formData.q6),
        q7_bucket: mapToBucket(formData.q7),
        q8_bucket: mapToBucket(formData.q8),
        q9_bucket: mapToBucket(formData.q9),
        q10_bucket: mapToBucket(formData.q10)
      };

      const { error } = await supabase
        .from('temperament_responses')
        .insert([responseData]);

      if (error) {
        throw error;
      }

      setShowSuccessPopup(true);
      setShowPopup(false);
      setSubmitMessage('');
      
    } catch (error) {
      console.error('Error submitting temperament scan:', error);
      setSubmitMessage('There was an error saving your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPersonalInfo({ name: '', email: '', optin: true });
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <>

      <Header />

      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex flex-row items-center justify-between mb-6">
              <div className="text-center mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
                  <span className="bg-[#FFF041] text-black px-2 py-1">
                    Get Your Analysis
                  </span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white font-bold
                max-w-2xl mx-auto">
                  Answer these questions honestly and I'll email you your personal analysis and what to focus on.
                </p>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6 mb-8 force-inter-font">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {index + 1}. {question.prompt}
                  </h3>
                </div>
                
                <div className="flex justify-between items-center space-x-2">
                  {[1, 2, 3, 4, 5, 6].map((value) => (
                    <label key={value} className="flex flex-col items-center cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value={value}
                        checked={formData[question.id as keyof typeof formData] === value}
                        onChange={() => handleQuestionChange(question.id, value)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 text-xs sm:text-sm md:text-base ${
                        formData[question.id as keyof typeof formData] === value
                          ? 'bg-[#FFF041] border-[#FFF041] text-black'
                          : 'border-gray-600 text-gray-400 hover:border-gray-400'
                      }`}>
                        {value}
                      </div>
                    </label>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>{question.scaleLeft}</span>
                  <span>{question.scaleRight}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Complete Button */}
          <div className="text-center">
            <button
              onClick={handleCompleteClick}
              disabled={!areQuestionsComplete()}
              className="bg-[#FFF041] text-black font-bold text-lg px-8 py-4 rounded-lg hover:bg-[#E6D93A] transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Get Analysis
            </button>
          </div>

          {/* Popup Modal */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full force-inter-font">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold mb-2">Get Your Analysis</h2>
                  <p className="text-gray-400">Enter your details so I can send you your analysis.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="popup-name" className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="popup-name"
                      value={personalInfo.name}
                      onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="popup-email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="popup-email"
                      value={personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="popup-optin"
                      checked={personalInfo.optin}
                      onChange={(e) => handlePersonalInfoChange('optin', e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#FFF041] bg-black border-gray-600 rounded focus:ring-[#FFF041] focus:ring-2"
                    />
                    <label htmlFor="popup-optin" className="text-xs text-gray-400 leading-tight">
                      By subscribing, you agree to receive our newsletter and occasional updates. You can unsubscribe at any time via the link in our emails.
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={closePopup}
                    className="flex-1 bg-gray-700 text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isPersonalInfoValid() || isSubmitting}
                    className="flex-1 bg-[#FFF041] text-black font-bold py-3 px-4 rounded-lg hover:bg-[#E6D93A] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : 'Get Results'}
                  </button>
                </div>

                {submitMessage && (
                  <div className={`text-center p-3 rounded-lg mt-4 ${
                    submitMessage.includes('error') || submitMessage.includes('Error')
                      ? 'bg-red-900/50 text-red-300 border border-red-700'
                      : 'bg-green-900/50 text-green-300 border border-green-700'
                  }`}>
                    {submitMessage}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Success Popup */}
          {showSuccessPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 max-w-md w-full text-center force-inter-font">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-white">All Done</h2>
                  <p className="text-gray-400">Check your email to find your blueprint</p>
                </div>
                <button
                  onClick={closeSuccessPopup}
                  className="bg-[#FFF041] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#E6D93A] transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default DiagnosisPage;