import { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import resumeData from '@/data/resume.json';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: 'Hiring',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length > 100) {
      newErrors.name = 'Name is required (max 100 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) || formData.email.length > 255) {
      newErrors.email = 'Valid email is required (max 255 characters)';
    }

    if (!formData.subject.trim() || formData.subject.length > 200) {
      newErrors.subject = 'Subject is required (max 200 characters)';
    }

    if (!formData.message.trim() || formData.message.length > 2000) {
      newErrors.message = 'Message is required (max 2000 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    // Create mailto link with form data
    const mailtoLink = `mailto:${resumeData.personal.email}?subject=${encodeURIComponent(
      `[${formData.inquiryType}] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
    
    toast.success('Opening email client...');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      inquiryType: 'Hiring',
      message: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="section-padding bg-canvas">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-16 reveal-slide-up">
          <span className="text-sm uppercase tracking-[0.3em] text-ink-60 font-medium">
            Get In Touch
          </span>
          <h2 className="font-display font-bold text-ink mt-4">
            Let's Work <span className="italic">Together</span>
          </h2>
          <p className="text-lg text-ink-60 mt-6 leading-relaxed">
            Looking for a data analyst who can transform complex data into actionable insights? 
            Let's discuss how I can help drive your business forward.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3 reveal-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-secondary border ${
                      errors.name ? 'border-red-500' : 'border-border'
                    } focus:border-ink focus:outline-none transition-colors text-ink`}
                    maxLength={100}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-secondary border ${
                      errors.email ? 'border-red-500' : 'border-border'
                    } focus:border-ink focus:outline-none transition-colors text-ink`}
                    maxLength={255}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-ink mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-secondary border ${
                      errors.subject ? 'border-red-500' : 'border-border'
                    } focus:border-ink focus:outline-none transition-colors text-ink`}
                    maxLength={200}
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-ink mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary border border-border focus:border-ink focus:outline-none transition-colors text-ink"
                  >
                    <option value="Hiring">Hiring</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-secondary border ${
                    errors.message ? 'border-red-500' : 'border-border'
                  } focus:border-ink focus:outline-none transition-colors text-ink resize-none`}
                  maxLength={2000}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                <p className="mt-1 text-xs text-ink-60">
                  {formData.message.length} / 2000 characters
                </p>
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" data-cursor="mail">
                <Send className="w-4 h-4" />
                Send Message
              </button>

              <p className="text-xs text-ink-60 text-center">
                Your message will open your email client. No data is stored.
              </p>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="lg:col-span-2 reveal-scale space-y-8">
            {/* Direct Contact */}
            <div className="border border-border p-8 bg-canvas">
              <h3 className="font-display text-xl font-bold text-ink mb-6">Direct Contact</h3>
              
              <div className="space-y-4">
                <a
                  href={`mailto:${resumeData.personal.email}`}
                  className="flex items-start gap-4 group hover:opacity-70 transition-opacity"
                  data-cursor="mail"
                >
                  <Mail className="w-5 h-5 text-ink-60 mt-0.5" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-ink-60 mb-1">Email</div>
                    <div className="text-ink font-medium">{resumeData.personal.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${resumeData.personal.phone}`}
                  className="flex items-start gap-4 group hover:opacity-70 transition-opacity"
                >
                  <Phone className="w-5 h-5 text-ink-60 mt-0.5" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-ink-60 mb-1">Phone</div>
                    <div className="text-ink font-medium">{resumeData.personal.phone}</div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-ink-60 mt-0.5" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-ink-60 mb-1">Location</div>
                    <div className="text-ink font-medium">India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Call */}
            <div className="bg-ink text-canvas p-8 relative overflow-hidden">
              <div className="absolute inset-0 pattern-halftone opacity-10" />
              <div className="relative z-10 space-y-4">
                <h3 className="font-display text-xl font-bold">Schedule a Chat</h3>
                <p className="text-canvas/80">
                  Prefer a quick call? Click below to send me your preferred time.
                </p>
                <a
                  href={`mailto:${resumeData.personal.email}?subject=Schedule%20a%20Chat`}
                  className="btn-outline border-canvas text-canvas hover:bg-canvas hover:text-ink inline-flex items-center gap-2"
                  data-cursor="mail"
                >
                  Schedule Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
