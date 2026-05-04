'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaAngleRight, FaCheckCircle } from 'react-icons/fa';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const inputClass =
  'w-full bg-white border border-tertiary-300 px-4 py-3 text-sm text-tertiary-900 placeholder:text-tertiary-500/40 focus:outline-none focus:border-primary-500 transition-colors font-lato';

const labelClass = 'block text-xs font-bold text-tertiary-900 uppercase tracking-wide mb-2 font-lato';

export default function ContactForm() {
  const t = useTranslations('contact.info.form');

  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = t('required');
    if (!form.email.trim()) {
      errs.email = t('required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = t('invalidEmail');
    }
    if (!form.message.trim()) errs.message = t('required');
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('sending');

    try {
      // Replace with your actual API endpoint or email service
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-12 text-center bg-neutral-100 border border-tertiary-300 p-8 rounded-lg">
        <FaCheckCircle className="w-16 h-16 text-primary-500" />
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-tertiary-900 font-playfair">{t('successTitle')}</h3>
          <p className="text-sm text-tertiary-700 max-w-sm leading-relaxed font-lato">{t('successMessage')}</p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-primary-500 uppercase tracking-wide hover:text-primary-600 transition-colors"
        >
          ← Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            {t('name')} <span className="text-primary-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            {t('email')} <span className="text-primary-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          {t('phone')}
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={t('phonePlaceholder')}
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {t('message')} <span className="text-primary-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={t('messagePlaceholder')}
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{t('errorMessage')}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary-500 text-white text-xs font-bold uppercase tracking-wide hover:bg-primary-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md rounded"
        >
          {status === 'sending' ? t('sending') : t('submit')}
          {status !== 'sending' && <FaAngleRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </form>
  );
}
