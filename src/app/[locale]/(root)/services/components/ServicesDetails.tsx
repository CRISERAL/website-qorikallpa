import Container from '@/src/components/templates/Container';
import React from 'react';

export default function ServicesDetails() {
  return (
    <section className="py-8">
      <Container>
        <div className="hidden lg:flex items-center gap-8">
          <div className="w-64 shrink-0 space-y-4"></div>
          <div className="flex-1 flex items-center justify-between gap-3 py-6"></div>
        </div>
      </Container>
    </section>
  );
}
