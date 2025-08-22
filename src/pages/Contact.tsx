import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, Send, CheckCircle, Globe, Users, Award, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SEO, { seoConfigs } from '../components/SEO';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setContentVisible(false);
    const timer = setTimeout(() => setContentVisible(true), 100);
    return () => clearTimeout(timer);
  }, [language]);

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields: Name, Email, and Message.');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address.');
      }

      // Check if we're in development or production
      const isDevelopment = import.meta.env.DEV || 
                           window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1';
      
      if (isDevelopment) {
        // Development mode: Simulate successful submission
        console.log('📧 DEVELOPMENT MODE - Form submitted:', formData);
        console.log('✅ In production, emails will be sent to:');
        console.log('   → Admin notification: contact@nexariza.com');
        console.log('   → User confirmation:', formData.email);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          service: ''
        });
        setTimeout(() => setIsSubmitted(false), 8000);
        return;
      }
      
      // Production mode: Send actual emails
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          service: ''
        });
        setTimeout(() => setIsSubmitted(false), 8000);
      } else {
        throw new Error(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    'Custom AI/ML Development',
    'Neural Networks & LLMs',
    'Computer Vision Solutions',
    'Natural Language Processing',
    'Full-Stack AI Integration',
    'Enterprise AI Consulting',
    'Business Process Automation',
    'AI Strategy & Planning',
    'Data Science & Analytics',
    'Cloud AI Deployment',
    'AI Training & Support',
    'Custom AI Solution'
  ];

  const contactInfo = {
    domain: 'www.nexariza.com',
    email: 'contact@nexariza.com',
    phone: 'Available upon request',
    consultation: 'Request a Free Consultation',
    discovery: 'Schedule a Discovery Call'
  };

  const whyChooseUs = [
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Direct collaboration with Ahmad Yasin and world-class AI specialists'
    },
    {
      icon: Award,
      title: 'Custom Solutions',
      description: 'Tailored AI systems built from scratch for your specific business needs'
    },
    {
      icon: Globe,
      title: 'Lifetime Partnership',
      description: 'Ongoing support, maintenance, and system evolution with guaranteed SLA'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <SEO {...seoConfigs.contact} />
      
      <AnimatePresence mode="wait">
        {contentVisible && (
          <motion.div
            key={language}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
          >
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
            {t('contact.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('contact.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700 p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Get Your Free AI Consultation</h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and our AI experts will get back to you within 24 hours with a custom solution proposal and project timeline. 
                <span className="text-blue-300 font-semibold"> You'll also receive an instant confirmation email with next steps.</span>
              </p>

              {/* Success Message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    className="mb-6 p-6 bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-700/50 rounded-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-green-300 font-semibold mb-2">Message Sent Successfully! 🎉</h3>
                        <p className="text-green-200 text-sm leading-relaxed">
                          Thank you for contacting Nexariza AI! We've received your message and will respond within 24 hours. 
                          Please check your email for a detailed confirmation with next steps.
                        </p>
                        <div className="mt-3 p-3 bg-green-800/20 rounded-lg">
                          <p className="text-green-300 text-xs">
                            📧 Confirmation emails sent to: {formData.email || 'your email'} and our team
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {submitError && (
                  <motion.div
                    className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg flex items-start space-x-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-300 text-sm">{submitError}</p>
                      <p className="text-red-400 text-xs mt-1">
                        You can also contact us directly at contact@nexariza.com
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.form.service')}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project, goals, and how we can help transform your business with AI..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>{t('contact.form.send')}</span>
                    </>
                  )}
                </button>

                <p className="text-center text-gray-400 text-sm">
                  By submitting this form, you agree to receive communications from Nexariza AI. 
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Business Hours</h3>
                </div>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                  <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700/30">
                    <p className="text-blue-300 text-sm">
                      <strong>24/7 Emergency Support</strong> available for enterprise clients with active projects
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Mail className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Contact Information</h3>
                </div>
                <div className="space-y-6">
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="font-semibold text-white mb-3">🌐 Website</h4>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-blue-400" />
                      <a 
                        href="https://www.nexariza.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        {contactInfo.domain}
                      </a>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="font-semibold text-white mb-3">📧 Email</h4>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-blue-400" />
                      <a 
                        href={`mailto:${contactInfo.email}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white">📞 Quick Actions</h4>
                    <div className="space-y-3">
                      <button 
                        onClick={() => window.location.href = `mailto:${contactInfo.email}?subject=Free AI Consultation Request&body=Hello Nexariza AI team,%0D%0A%0D%0AI'm interested in learning more about your AI solutions and would like to schedule a free consultation.%0D%0A%0D%0APlease let me know your availability.%0D%0A%0D%0AThank you!`}
                        className="w-full flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <Phone className="h-4 w-4" />
                        <span>📞 Request Free Consultation →</span>
                      </button>
                      
                      <button 
                        onClick={() => window.location.href = `mailto:${contactInfo.email}?subject=Discovery Call Request&body=Hello Nexariza AI team,%0D%0A%0D%0AI would like to schedule a discovery call to discuss my AI project requirements.%0D%0A%0D%0AProject details:%0D%0A- Industry: [Your Industry]%0D%0A- Goal: [Your Goal]%0D%0A- Timeline: [Your Timeline]%0D%0A%0D%0APlease let me know your availability.%0D%0A%0D%0AThank you!`}
                        className="w-full flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <Clock className="h-4 w-4" />
                        <span>📅 Schedule Discovery Call →</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl border border-green-700/30 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                  Response Time Guarantee
                </h3>
                <div className="space-y-3 text-green-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Initial response within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Detailed proposal within 48 hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Free consultation call within 72 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Nexariza Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Why Choose Nexariza AI?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join hundreds of companies that trust us to deliver world-class AI solutions with measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                className="group text-center p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 mx-auto group-hover:bg-blue-500 transition-colors duration-300">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">2024</div>
              <div className="text-gray-300">Founded by Ahmad Yasin</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-300">AI Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Premium Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Vision into Reality?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Get your free consultation with Ahmad Yasin and discover how Nexariza AI can build custom solutions that deliver real business value with lifetime support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = `mailto:${contactInfo.email}?subject=Free AI Consultation Request`}
              className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              Get Free Consultation
            </button>
            <button 
              onClick={() => window.location.href = '/portfolio'}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300"
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;