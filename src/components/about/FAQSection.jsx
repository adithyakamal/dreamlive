import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, ThumbsUp, ThumbsDown, CheckCircle2, Mail } from 'lucide-react';
import { FAQS, COMPANY_INFO } from '../../data/dreamLiveContent';
import SectionHeading from '../common/SectionHeading';

export const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(0);
  const [feedbackState, setFeedbackState] = useState({});

  const categories = ['All', ...new Set(FAQS.map((f) => f.category))];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFeedback = (idx, type) => {
    setFeedbackState((prev) => ({
      ...prev,
      [idx]: type,
    }));
  };

  return (
    <section id="faq" className="py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          badge="Support & Helpdesk"
          title="Frequently Asked"
          highlight="Questions"
          subtitle="Everything you need to know about broadcasting, safety controls, virtual gift payouts, and account security on DreamLive."
        />

        {/* Search & Category Filter Bar */}
        <div className="space-y-4 mb-10">
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search answers (e.g. update app, kickout harassment, level up, login)..."
              className="w-full pl-12 pr-4 py-3 rounded-full glass-panel-glow text-sm text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const hasGivenFeedback = feedbackState[idx];

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#1a0f35] border-violet-400/50 shadow-xl shadow-violet-950/60 ring-1 ring-violet-500/30'
                      : 'bg-[#150b2b] border-violet-500/30 hover:border-violet-400/60 hover:bg-[#1a0e36] shadow-md shadow-violet-950/40 hover:shadow-lg hover:shadow-violet-950/60'
                  }`}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-fuchsia-400 shrink-0 shadow-sm shadow-fuchsia-400/50" />
                      <span className="text-sm sm:text-base font-bold text-white leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-violet-300 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-fuchsia-400' : 'group-hover:text-white'
                      }`}
                    />
                  </button>

                  {/* Answer Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-3 text-xs sm:text-sm text-slate-200 leading-relaxed border-t border-violet-500/20 space-y-4">
                          <p className="whitespace-pre-line">{faq.answer}</p>

                          {/* Authentic Interactive 'Was this helpful?' feedback feature from original DreamLive site */}
                          <div className="pt-3 border-t border-violet-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <span className="text-slate-400 font-medium">
                              Is this answer helpful to you?
                            </span>

                            {hasGivenFeedback ? (
                              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" /> Thank you for your feedback!
                              </span>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleFeedback(idx, 'yes')}
                                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/10 text-slate-300 font-semibold flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <ThumbsUp className="w-3.5 h-3.5" /> Yes 👍
                                </button>
                                <button
                                  onClick={() => handleFeedback(idx, 'no')}
                                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 text-slate-300 font-semibold flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <ThumbsDown className="w-3.5 h-3.5" /> No 👎
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center glass-panel rounded-3xl space-y-2">
              <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm text-slate-300 font-semibold">
                No matching answers found for &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-slate-500">
                Need more help? Email our support team directly at{' '}
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-violet-400 underline">
                  {COMPANY_INFO.email}
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-950/40 via-purple-950/20 to-fuchsia-950/30 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Didn&#39;t find what you&#39;re looking for?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Our official support care team at {COMPANY_INFO.name} is here to help you 7 days a week.
            </p>
          </div>

          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs sm:text-sm font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            Email Support Care
          </a>
        </div>
      </div>
    </section>
  );
};
export default FAQSection;
