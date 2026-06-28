import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', type: 'Feedback', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSent(true);
      setFormData({ name: '', phone: '', email: '', type: 'Feedback', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }
  };

  const faqs = [
    {
      q: 'Are FLOFFI products completely organic and chemical-free?',
      a: 'Yes! All Floffi jams, spreads, and thokkus are prepared using 100% natural edible flower petals and fruit extracts. We promise zero artificial food colorings, chemical stabilizers, or synthetic preservatives.'
    },
    {
      q: 'Where do you source your edible flowers from?',
      a: 'We partner with sustainable local farming networks and women-led agricultural cooperatives across the country. Our Damask Roses, red hibiscus blossoms, and yellow Aavaram flowers are hand-picked and naturally sun-dried.'
    },
    {
      q: 'Do you offer distribution opportunities for supermarkets and local stores?',
      a: 'Yes, absolutely. We are actively expanding our supermarket shelf presence. Please choose "Distributorship / Partnering" in our contact inquiry form, and our sales team will reach out to you with catalog pricing.'
    },
    {
      q: 'What is the shelf life of FLOFFI preserves without preservatives?',
      a: 'Due to our traditional sun-curing processes, wood-pressed oils (for thokkus), and vacuum-sealed glass jar packaging, our products maintain a natural shelf life of 6 to 9 months. Keep in a cool, dry place and refrigerate after opening.'
    }
  ];

  return (
    <div className="pt-24 bg-white">
      {/* Banner */}
      <section className="py-16 bg-cream-dark" style={{ backgroundColor: 'var(--bg-cream-dark)' }}>
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-full mb-4 shadow-sm">
            <Sparkles size={14} style={{ color: 'var(--hibiscus-red)' }} />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-earthy-light">Get In Touch</span>
          </div>
          <h1 className="font-heading font-extrabold text-earthy-brown mb-4">Contact Us</h1>
          <p className="text-base text-earthy-light max-w-2xl mx-auto">
            Have questions about our floral ingredients, recipes, or stocking options? Reach out to the Floffi Customer Care team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 text-left space-y-8">
              <div>
                <span className="text-xs font-bold text-hibiscus-red uppercase tracking-wider block mb-2">Customer Care Directory</span>
                <h2 className="font-heading font-extrabold text-2xl text-earthy-brown">We’d Love to Hear from You</h2>
              </div>
              <p className="text-sm text-earthy-light leading-relaxed">
                Our support team is dedicated to helping households and distributors. Reach us through our toll-free customer care line or send us an email.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-floral-pink-light text-hibiscus-red flex items-center justify-center flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-earthy-brown mb-1">Toll-Free Support Line</h4>
                    <p className="text-sm font-semibold text-hibiscus-red" style={{ color: 'var(--hibiscus-red)' }}>+91 1800 102 2221</p>
                    <p className="text-xs text-earthy-light">Mon - Sat, 9 AM to 6 PM</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-leaf-green-light text-leaf-green flex items-center justify-center flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-earthy-brown mb-1">Email Inquiries</h4>
                    <p className="text-sm text-earthy-brown font-semibold">customercare@floffifoods.com</p>
                    <p className="text-xs text-earthy-light">For wholesale: sales@floffifoods.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-bg-cream-dark text-earthy-brown flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bg-cream-dark)' }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-earthy-brown mb-1">Registered Corporate Office</h4>
                    <p className="text-xs text-earthy-light leading-relaxed">
                      Floffi Foods Private Limited,<br />
                      Metro Plaza, 3rd Floor, Anna Salai,<br />
                      Chennai, Tamil Nadu, 600002, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="glass-card text-left relative">
                <AnimatePresence mode="wait">
                  {!isSent ? (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <h3 className="font-heading font-extrabold text-xl text-earthy-brown mb-4">Send Us a Message</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold text-earthy-light mb-1.5">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="bg-white form-input-premium py-3 px-4 text-sm text-earthy-brown"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold text-earthy-light mb-1.5">Phone Number</label>
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-white form-input-premium py-3 px-4 text-sm text-earthy-brown"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold text-earthy-light mb-1.5">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="bg-white form-input-premium py-3 px-4 text-sm text-earthy-brown"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs font-semibold text-earthy-light mb-1.5">Type of Inquiry *</label>
                          <select
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                            className="bg-white form-input-premium py-3 px-4 text-sm text-earthy-brown font-medium"
                          >
                            <option>Feedback</option>
                            <option>Distributorship / Partnering</option>
                            <option>Product Quality Inquiry</option>
                            <option>General Support</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-semibold text-earthy-light mb-1.5">Your Message *</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          className="bg-white form-input-premium py-3 px-4 text-sm text-earthy-brown resize-none"
                        />
                      </div>

                      <button type="submit" className="btn btn-primary w-full gap-2 py-3" style={{ borderRadius: '12px' }}>
                        <Send size={16} />
                        Submit Inquiry
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 px-6 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-leaf-green-light text-leaf-green flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle size={32} />
                      </div>
                      <h3 className="font-heading font-extrabold text-2xl text-earthy-brown">Message Sent Successfully!</h3>
                      <p className="text-sm text-earthy-light max-w-sm mx-auto">
                        Thank you for reaching out. A customer care representative from Floffi Foods will contact you shortly regarding your inquiry.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <hr className="border-earthy-brown/10 mb-20" />

          {/* FAQ Accordion Section */}
          <div className="max-w-3xl mx-auto text-left">
            <h2 className="font-heading font-extrabold text-2xl text-earthy-brown text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-earthy-brown/10 pb-4">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center text-left py-2 font-heading font-bold text-base md:text-lg text-earthy-brown transition-colors hover:text-hibiscus-red bg-transparent border-none cursor-pointer focus:outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle size={18} className="text-floral-pink" style={{ color: 'var(--floral-pink)' }} />
                      {faq.q}
                    </span>
                    <span className="text-xl font-bold text-earthy-light">{activeFaq === idx ? '−' : '+'}</span>
                  </button>

                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-earthy-light leading-relaxed pl-7 pt-2">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
