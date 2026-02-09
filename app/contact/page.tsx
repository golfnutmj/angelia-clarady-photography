'use client';

import { useState, FormEvent } from 'react';
import Reveal from '@/components/Reveal';
import { Instagram, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      // Dynamic import to avoid loading Firebase on server
      const { submitContactForm } = await import('@/lib/collections');
      await submitContactForm(formData);
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
    }
  }

  return (
    <div className="pt-[60px]">
      {/* Header */}
      <section className="px-7 md:px-20 pt-20 pb-12 bg-ivory text-center">
        <Reveal>
          <h1 className="section-title mb-3">Get in Touch</h1>
          <div className="section-divider mb-6" />
          <p className="text-[0.95rem] font-light text-text-light max-w-lg mx-auto leading-relaxed">
            Whether you&apos;re interested in purchasing a print, commissioning work, or
            collaborating on a project — I&apos;d love to hear from you.
          </p>
        </Reveal>
      </section>

      {/* Contact form + info */}
      <section className="px-7 md:px-20 pb-24 bg-ivory">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-5xl mx-auto">
          {/* Form */}
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-normal tracking-wide-caps uppercase text-text-light mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-black/10 text-charcoal text-sm font-light
                             focus:outline-none focus:border-copper transition-colors duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-normal tracking-wide-caps uppercase text-text-light mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-black/10 text-charcoal text-sm font-light
                             focus:outline-none focus:border-copper transition-colors duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-normal tracking-wide-caps uppercase text-text-light mb-2"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-black/10 text-charcoal text-sm font-light
                             focus:outline-none focus:border-copper transition-colors duration-300 appearance-none"
                >
                  <option value="">Select a topic</option>
                  <option value="prints">Fine Art Prints</option>
                  <option value="commission">Custom Commission</option>
                  <option value="workshop">Photography Workshop</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-normal tracking-wide-caps uppercase text-text-light mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-black/10 text-charcoal text-sm font-light
                             focus:outline-none focus:border-copper transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-outline-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'sent' && (
                <p className="text-sm font-light text-copper">
                  Thank you! Your message has been sent. I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm font-light text-red-600">
                  Something went wrong. Please try emailing directly at hello@aclarady.com.
                </p>
              )}
            </form>
          </Reveal>

          {/* Contact info */}
          <Reveal delay={150}>
            <div className="md:pt-8">
              <h2 className="font-display text-2xl font-normal text-charcoal mb-3">
                Let&apos;s Connect
              </h2>
              <div className="w-12 h-0.5 bg-copper-light mb-8" />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-copper mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-normal tracking-wide-caps uppercase text-text-light mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:hello@aclarady.com"
                      className="text-sm font-light text-charcoal hover:text-copper transition-colors"
                    >
                      hello@aclarady.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Instagram className="w-5 h-5 text-copper mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-normal tracking-wide-caps uppercase text-text-light mb-1">
                      Instagram
                    </p>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-light text-charcoal hover:text-copper transition-colors"
                    >
                      @angeliaclarady
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-copper mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-normal tracking-wide-caps uppercase text-text-light mb-1">
                      Based In
                    </p>
                    <p className="text-sm font-light text-charcoal">Pacific Northwest, USA</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-sage">
                <h3 className="font-display text-lg font-normal text-charcoal mb-3">
                  Response Time
                </h3>
                <p className="text-sm font-light text-text-body leading-relaxed">
                  I typically respond within 24-48 hours. For print orders, please allow
                  2-3 weeks for production and shipping.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
