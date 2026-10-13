import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../../data/dreamLiveContent';
import SpotlightCard from '../animations/SpotlightCard';

export const ContactInfoCards = () => {
  const cards = [
    {
      icon: MapPin,
      title: 'Headquarters Address',
      primary: COMPANY_INFO.address,
      subtext: 'Vadodara, Gujarat, India',
      color: 'from-violet-600 to-purple-600',
      actionText: 'Get Directions',
      actionLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`,
    },
    {
      icon: Phone,
      title: 'Helpline & Support Phone',
      primary: COMPANY_INFO.phone,
      subtext: 'Direct hotline for urgent host & agency inquiries',
      color: 'from-cyan-500 to-blue-600',
      actionText: 'Call Hotline',
      actionLink: `tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: Mail,
      title: 'Official Care Email',
      primary: COMPANY_INFO.email,
      subtext: 'Account security, reports, and general feedback',
      color: 'from-fuchsia-600 to-pink-600',
      actionText: 'Send Email',
      actionLink: `mailto:${COMPANY_INFO.email}`,
    },
    {
      icon: Clock,
      title: 'Reaching Hours',
      primary: `Mon–Fri: ${COMPANY_INFO.hours.weekday}`,
      subtext: `Sat–Sun: ${COMPANY_INFO.hours.weekend}`,
      color: 'from-amber-400 to-orange-500',
      badge: 'Open 7 Days a Week',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <SpotlightCard
            key={idx}
            className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-950/30 transition-all flex flex-col justify-between group h-full"
          >
            <div className="space-y-3">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                {card.title}
              </h3>

              <p className="text-sm font-semibold text-slate-200 leading-snug">
                {card.primary}
              </p>

              <p className="text-xs text-slate-400 font-normal">
                {card.subtext}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5">
              {card.actionLink ? (
                <a
                  href={card.actionLink}
                  target={card.actionText === 'Get Directions' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-violet-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  {card.actionText} →
                </a>
              ) : (
                <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  {card.badge}
                </span>
              )}
            </div>
          </SpotlightCard>
        );
      })}
    </div>
  );
};

export default ContactInfoCards;
