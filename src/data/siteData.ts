/**
 * Central data file for the site.
 * Edit this file to update contact info, social links, map embed, and other
 * site-wide constants that appear across multiple components.
 */

export const siteData = {
  /** Hotel name shown in alt texts, titles, etc. */
  name: 'Hostal Koriqallpa',

  /** Short brand name used in the footer copyright */
  brandName: 'Qorikallpa',

  contact: {
    address: 'Calle Tandapata 354, San Blas, Cusco, Perú',
    /** Used for the tel: href */
    phone: '+51 984 123 456',
    phoneRaw: '+51984123456',
    /** Used for the mailto: href */
    email: 'reservas@hostalkoriqallpa.com',
    /** Reception opening hours — plain text */
    hours: 'Lun–Dom · 6:00 am – 10:00 pm',
  },

  /** Google Maps embed src — replace with your real embed URL from maps.google.com */
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.5!2d-71.9765!3d-13.5165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd5b5e8e5e5e5%3A0x0!2sCalle+Tandapata+354%2C+San+Blas%2C+Cusco!5e0!3m2!1sen!2spe!4v1',

  /** Google Maps link for the address anchor */
  mapUrl: 'https://maps.google.com/?q=Calle+Tandapata+354+San+Blas+Cusco+Peru',

  social: {
    instagram: 'https://instagram.com/hostalkoriqallpa',
    facebook: 'https://facebook.com/hostalkoriqallpa',
    whatsapp: 'https://wa.me/51984123456',
  },

  /** Logo path relative to /public */
  logo: '/logo.webp',
} as const;
