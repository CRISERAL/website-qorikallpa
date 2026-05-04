import Container from '@/src/components/templates/Container';
import { siteData } from '@/src/data/siteData';
import { ContactInfoEntity } from '@/src/types/pages/Contact';
import { useTranslations } from 'next-intl';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import ContactForm from '@/src/components/pages/contact/ContactForm';

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function InfoItem({ icon, label, value, href }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-10 h-10 bg-primary-500/10 flex items-center justify-center text-primary-500">
        {icon}
      </div>
      <div>
        <p className="text-xs text-tertiary-500 uppercase tracking-widest font-medium mb-0.5">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="text-sm text-tertiary-800 hover:text-primary-500 transition-colors leading-relaxed"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-tertiary-800 leading-relaxed">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function ContactInfo() {
  const t = useTranslations('contact.info');

  const items = [
    {
      icon: <FaMapMarkerAlt className="w-4 h-4" />,
      label: t('address.label'),
      value: siteData.contact.address,
      href: siteData.mapUrl,
    },
    {
      icon: <FaPhone className="w-4 h-4" />,
      label: t('phone.label'),
      value: siteData.contact.phone,
      href: `tel:${siteData.contact.phoneRaw}`,
    },
    {
      icon: <FaEnvelope className="w-4 h-4" />,
      label: t('email.label'),
      value: siteData.contact.email,
      href: `mailto:${siteData.contact.email}`,
    },
    {
      icon: <FaClock className="w-4 h-4" />,
      label: t('hours.label'),
      value: siteData.contact.hours,
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* Row 1: info (left) + form (right) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: contact details */}
          <div className="w-full lg:w-[42%] flex flex-col gap-6">
            <div>
              <p className="text-xs text-primary-500 uppercase tracking-[0.2em] font-medium">
                {t('subtitle')}
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-tertiary-900 mt-2 font-playfair">
                {t('title')}
              </h2>
              <div className="w-12 h-0.5 bg-secondary-500 mt-4" />
            </div>

            <p className="text-base text-tertiary-600 leading-relaxed font-lato">{t('description')}</p>

            <div className="flex flex-col gap-6 mt-2">
              {items.map((item) => (
                <InfoItem key={item.label} {...item} />
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="w-full lg:w-[58%]">
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <p className="text-xs text-primary-500 uppercase tracking-[0.2em] font-medium">
                  {t('form.subtitle')}
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-tertiary-900 mt-2 font-playfair">
                  {t('form.title')}
                </h2>
                <div className="w-12 h-0.5 bg-secondary-500 mt-4" />
              </div>
            </div>
            <ContactForm />
          </div>
        </div>

        {/* Row 2: map full width */}
        <div className="mt-12 lg:mt-16">
          <div className="bg-white p-2 pb-4 shadow-xl rounded-lg">
            <iframe
              title={t('mapTitle')}
              src={siteData.mapEmbedUrl}
              width="100%"
              height="400"
              className="w-full border-0 rounded"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
