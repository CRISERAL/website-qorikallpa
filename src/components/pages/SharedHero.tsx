import Container from '../templates/Container';

interface Props {
  title: string;
  description: string;
  backgroundImage: string;
}

export default function SharedHero({ title, description, backgroundImage }: Props) {
  return (
    <section className="relative h-[50vh] lg:h-[60vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
      </div>
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Decorative Element */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent text-sm">✦</span>
            <div className="h-px w-12 bg-accent" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {title}
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {description}
          </p>
        </div>
      </Container>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent z-10" />
    </section>
  );
}
