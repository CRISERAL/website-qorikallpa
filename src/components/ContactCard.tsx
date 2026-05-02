import React from 'react';

interface Props {
  title: string;
  description: string;
}

export default function ContactCard({ title, description }: Props) {
  return (
    <div>
      <h2 className='font-playfair text-xl font-bold leading-tight text-accent-500 sm:max-w-none sm:text-2xl md:text-3xl'>
        {title}
      </h2>
      <p className='mt-3 text-sm leading-relaxed text-brown-700 md:text-base'>
        {description}
      </p>
    </div>
  );
}
