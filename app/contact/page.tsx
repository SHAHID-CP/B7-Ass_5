'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare, AlertCircle } from 'lucide-react';
import { ContactFormData, contactSchema } from '@/utils/contactValidation';


export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ২. React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched', 
  });

  const onSubmit = (data: ContactFormData) => {
    setSubmitting(true);
    console.log('Validated Form Data:', data);

    // Form Submission Simulation
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      reset(); 
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200/60">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          We’d Love to Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Have questions, feedback, or need support? Send us a message and our team will get back to you shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-start gap-4">
            <div className="p-3 bg-purple-50 text-blue-600 rounded-xl shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Email Us</h3>
              <p className="text-xs text-gray-500 mt-0.5">support@rentalsystem.com</p>
              <p className="text-xs text-gray-500">info@rentalsystem.com</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-start gap-4">
            <div className="p-3 bg-purple-50 text-blue-600 rounded-xl shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Call Us</h3>
              <p className="text-xs text-gray-500 mt-0.5">+880 1700-000000</p>
              <p className="text-xs text-gray-500">Sat - Thu: 9 AM - 7 PM</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-start gap-4">
            <div className="p-3 bg-purple-50 text-blue-600 rounded-xl shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Our Office</h3>
              <p className="text-xs text-gray-500 mt-0.5">Gulshan-2, Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Contact Form with Zod & React Hook Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                ✓
              </div>
              <h3 className="text-lg font-bold text-gray-900">Message Sent Successfully!</h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                Thank you for reaching out. We have received your query and will reply as soon as possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <h2 className="text-base font-bold text-gray-900">Send a Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register('name')}
                    className={`w-full border rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none transition ${
                      errors.name
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                        : 'border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.name.message}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Your Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register('email')}
                    className={`w-full border rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none transition ${
                      errors.email
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                        : 'border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email.message}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  {...register('subject')}
                  className={`w-full border rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none transition ${
                    errors.subject
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                      : 'border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {errors.subject && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.subject.message}</span>
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Message</label>
                <textarea
                  rows={4}
                  placeholder="Type your message here..."
                  {...register('message')}
                  className={`w-full border rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none transition resize-none ${
                    errors.message
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                      : 'border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.message.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}