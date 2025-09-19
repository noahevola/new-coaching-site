import React, { useState } from 'react';
import { supabase } from './lib/supabase';
import BacktestingHero from './components/BacktestingHero';
import type { FormSubmission } from './lib/supabase';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    tradingExperience: '',
    hasStrategy: '',
    strategyLearning: '',
    psychologyFix: '',
    fairPrice: '',
    email: '',
    countryCode: '+1',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const submissionData: Omit<FormSubmission, 'id' | 'created_at'> = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        trading_experience: formData.tradingExperience,
        has_strategy: formData.hasStrategy,
        strategy_learning: formData.strategyLearning,
        psychology_fix: formData.psychologyFix,
        fair_price: formData.fairPrice,
        email: formData.email,
        country_code: formData.countryCode,
        phone: formData.phone
      };

      const { error } = await supabase
        .from('form_submissions')
        .insert([submissionData]);

      if (error) {
        throw error;
      }

      setSubmitMessage('Thank you for your interest! We will contact you soon.');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        tradingExperience: '',
        hasStrategy: '',
        strategyLearning: '',
        psychologyFix: '',
        fairPrice: '',
        email: '',
        countryCode: '+1',
        phone: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="h-screen bg-black text-[#F5FBEF] flex flex-col overflow-hidden">
      <Header title="Trading Coaching" showApplyButton={false} />

      <div className="container mx-auto px-4 py-6 max-w-4xl flex-1 flex flex-col overflow-y-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-6xl font-black mb-4 leading-tight">
            HOW I CAN <span className="bg-[#FFF041] text-black px-2 py-0.5 whitespace-nowrap">HELP YOU:</span>
          </h1>
        </div>

        {/* Video Section */}
        <div className="mb-8">
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/4XDdR2rrRYs?si=bGYkEQoyD550PB27&autoplay=1&mute=1&rel=0&modestbranding=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto flex-1">
          <div className="p-6 rounded-lg shadow-2xl border border-gray-800" style={{ backgroundColor: '#F5FBEF' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-black">
              Ready to Become Profitable?
            </h2>
            <p className="text-center text-base md:text-lg opacity-80 mb-6 text-black">
              simply answer these questions and I will personally be in touch
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-black">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-[#F5FBEF] placeholder-gray-400"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-black">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-[#F5FBEF] placeholder-gray-400"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="tradingExperience" className="block text-sm font-medium mb-2 text-black">
                  How long have you been trading?
                </label>
                <select
                  id="tradingExperience"
                  name="tradingExperience"
                  value={formData.tradingExperience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-[#F5FBEF]"
                >
                  <option value="">Select your experience level</option>
                  <option value="less-than-one-year">Less than one year</option>
                  <option value="1-2-years">1-2 years</option>
                  <option value="2-3-years">2-3 years</option>
                  <option value="3-years-plus">3 years+</option>
                </select>
              </div>

              <div>
                <label htmlFor="hasStrategy" className="block text-sm font-medium mb-2 text-black">
                  Do you have a trading strategy?
                </label>
                <select
                  id="hasStrategy"
                  name="hasStrategy"
                  value={formData.hasStrategy}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-[#F5FBEF]"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label htmlFor="strategyLearning" className="block text-sm font-medium mb-2 text-black">
                  How did you learn your strategy?
                </label>
                <textarea
                  id="strategyLearning"
                  name="strategyLearning"
                  value={formData.strategyLearning}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-[#F5FBEF] placeholder-gray-400 resize-none"
                  placeholder="Tell me how you learned your trading strategy..."
                />
              </div>

              <div>
                <label htmlFor="psychologyFix" className="block text-sm font-medium mb-2 text-black">
                  Why do you need to fix your psychology?
                </label>
                <textarea
                  id="psychologyFix"
                  name="psychologyFix"
                  value={formData.psychologyFix}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-[#F5FBEF] placeholder-gray-400 resize-none"
                  placeholder="Describe what psychological challenges you face in trading..."
                />
              </div>

              <div>
                <label htmlFor="fairPrice" className="block text-sm font-medium mb-2 text-black">
                  What would you say is a fair price to completely fix your psychology?
                </label>
                <select
                  id="fairPrice"
                  name="fairPrice"
                  value={formData.fairPrice}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-[#F5FBEF]"
                >
                  <option value="">Select a price range</option>
                  <option value="100">$100</option>
                  <option value="1000">$1,000</option>
                  <option value="10000-plus">$10,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-[#F5FBEF] placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-black">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    required
                    className="px-3 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-[#F5FBEF]"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+32">🇧🇪 +32</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+43">🇦🇹 +43</option>
                    <option value="+45">🇩🇰 +45</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+47">🇳🇴 +47</option>
                    <option value="+358">🇫🇮 +358</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+64">🇳🇿 +64</option>
                    <option value="+1">🇨🇦 +1</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+852">🇭🇰 +852</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+27">🇿🇦 +27</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#FFF041] focus:border-transparent transition-all duration-200 text-[#F5FBEF] placeholder-gray-400"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white font-black py-3 px-6 rounded-lg hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-gray-600"
              >
                {isSubmitting ? 'Submitting...' : 'Fix My Psychology'}
              </button>

              {submitMessage && (
                <div className={`text-center p-4 rounded-lg ${
                  submitMessage.includes('error') || submitMessage.includes('Error')
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-green-100 text-green-800 border border-green-200'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>

            <p className="text-center text-xs md:text-sm opacity-60 mt-4 text-black">
              No spam. Your information is secure and will only be used to contact you about our coaching programs.
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-6 space-y-3 px-4 pb-4">
          <p className="text-sm md:text-lg opacity-80">
            Join the successful traders who finally fixed their psychology
          </p>
          <div className="flex justify-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-8 text-[#FFF041] font-semibold whitespace-nowrap overflow-hidden text-xs sm:text-sm md:text-base">
            <span>✓ The Paradigms</span>
            <span>✓ The Systems</span>
            <span>✓ The Implementation</span>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;