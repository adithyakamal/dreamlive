import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Shield, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from '../common/Button';
import ShinyText from '../animations/ShinyText';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Host / Creator Inquiry',
    userId: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details for your inquiry';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      topic: 'Host / Creator Inquiry',
      userId: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl glass-panel-glow border border-white/15 shadow-2xl">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-fuchsia-400" />
            <ShinyText>Send Us a Direct Message</ShinyText>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Our support desk responds within 24 hours. Fill out the details below.
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-bold text-white">
            Message Dispatched Successfully!
          </h4>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-fuchsia-400">{formData.name}</strong>. Your ticket regarding{' '}
            <strong className="text-white">&ldquo;{formData.topic}&rdquo;</strong> has been routed to{' '}
            <code className="text-xs bg-black/60 px-2 py-1 rounded text-violet-300">dreamlivecare@gmail.com</code>.
          </p>
          <div className="pt-4">
            <Button variant="primary" size="md" onClick={handleReset}>
              Send Another Inquiry
            </Button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Your Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className={`w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none ${
                  errors.name ? 'border-rose-500' : ''
                }`}
              />
              {errors.name && (
                <span className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none ${
                  errors.email ? 'border-rose-500' : ''
                }`}
              />
              {errors.email && (
                <span className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Topic & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Inquiry Topic *
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none bg-slate-900"
              >
                <option value="Host / Creator Inquiry">Host / Creator Inquiry</option>
                <option value="Talent Agency Partnership">Talent Agency Partnership</option>
                <option value="Account Recovery & Login Help">Account Recovery & Login Help</option>
                <option value="Coin Recharge & Diamond Payouts">Coin Recharge & Diamond Payouts</option>
                <option value="Community Safety & Harassment Report">Community Safety & Harassment Report</option>
                <option value="Business & General Feedback">Business & General Feedback</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Optional User ID */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              DreamLive User ID (If applicable)
            </label>
            <input
              type="text"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              placeholder="e.g. DL-884920"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none"
            />
          </div>

          {/* Message textarea */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Your Message / Details *
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your inquiry, agency portfolio, or support problem in detail..."
              className={`w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus:outline-none resize-none ${
                errors.message ? 'border-rose-500' : ''
              }`}
            />
            {errors.message && (
              <span className="text-[11px] text-rose-400 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" /> {errors.message}
              </span>
            )}
          </div>

          {/* Form Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              Direct Support by Top-Class Entertainment LLP
            </span>

            <Button
              type="submit"
              variant="primary"
              size="md"
              magnetic={true}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
              icon={Send}
              iconPosition="right"
            >
              {isSubmitting ? 'Dispatching Ticket...' : 'Send Message'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
export default ContactForm;
