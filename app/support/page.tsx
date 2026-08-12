'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Home,
  Key,
  CreditCard,
  ShieldAlert,
  MessageSquare,
  PhoneCall,
} from 'lucide-react';

// FAQ Category Type
type Category = 'all' | 'tenants' | 'landlords' | 'payments' | 'safety';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Quick Action Categories
  const categories = [
    { id: 'all', label: 'All Topics', icon: HelpCircle },
    { id: 'tenants', label: 'For Tenants', icon: Home },
    { id: 'landlords', label: 'For Landlords', icon: Key },
    { id: 'payments', label: 'Payments & Fees', icon: CreditCard },
    { id: 'safety', label: 'Safety & Trust', icon: ShieldAlert },
  ];

  // FAQ Data
  const faqs = [
    {
      id: 1,
      category: 'tenants',
      question: 'How do I schedule a viewing for a property?',
      answer:
        'You can easily schedule a viewing by visiting the property page and clicking the "Request Viewing" or "Contact Landlord" button. The landlord will review your request and confirm the schedule.',
    },
    {
      id: 2,
      category: 'tenants',
      question: 'Is there any booking fee for tenants?',
      answer:
        'Searching and browsing properties on RentNest is completely free. Any reservation deposit or security deposit is paid directly through our secure platform during the agreement process.',
    },
    {
      id: 3,
      category: 'landlords',
      question: 'How do I list my property on RentNest?',
      answer:
        'Register as a Landlord, navigate to your Dashboard, and click "Add New Listing". Fill in the details, upload photos, set your price, and submit. Our team will verify and publish it within 24 hours.',
    },
    {
      id: 4,
      category: 'landlords',
      question: 'How does RentNest verify landlords?',
      answer:
        'We require official ID proof (NID/Passport), property ownership documents, and contact verification to ensure that only legitimate landlords list on our platform.',
    },
    {
      id: 5,
      category: 'payments',
      question: 'What payment methods are supported?',
      answer:
        'We support secure online payments including Cards (Visa, Mastercard), Mobile Banking (bKash, Nagad, Rocket), and Direct Bank Transfers.',
    },
    {
      id: 6,
      category: 'payments',
      question: 'Can I get a refund if a rental request is cancelled?',
      answer:
        'Yes! If a booking or rental request is rejected by the landlord before agreement signing, your full amount will be refunded according to our Refund Policy.',
    },
    {
      id: 7,
      category: 'safety',
      question: 'What should I do if I suspect a fake listing?',
      answer:
        'Click the "Report Property" flag on the property page or email our support team immediately at safety@rentnest.com. We investigate all complaints within 12 hours.',
    },
  ];

  // Filter Logic
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-14">
      {/* Hero & Search Bar */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200/60">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Support & FAQ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          How Can We Help You Today?
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Search for common questions or browse categories below to find quick answers.
        </p>

        {/* Search Bar Input */}
        <div className="relative mt-4 max-w-xl mx-auto">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions, keywords, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm shadow-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-gray-200/80 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition"
                >
                  <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-500 border-t border-gray-100 pt-3 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl border border-gray-200/80 space-y-2">
            <p className="font-medium text-gray-900 text-sm">No results found</p>
            <p className="text-xs text-gray-500">
              Try searching with a different word or select another category.
            </p>
          </div>
        )}
      </div>

      {/* Need More Help Banner */}
      <div className="bg-linear-to-r from-blue-700 to-blue-900 text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-lg sm:text-2xl font-bold">Still need help?</h2>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-md">
            Can’t find the answer you are looking for? Please reach out to our dedicated support team directly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-indigo-50 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Us a Message</span>
          </Link>
          <a
            href="tel:+8801700000000"
            className="inline-flex items-center justify-center gap-2 bg-blue-800/60 hover:bg-blue-800/80 border border-blue-400/30 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}