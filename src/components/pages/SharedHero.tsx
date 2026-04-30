import Container from '../templates/Container';

interface Props {
  title: string;
  description: string;
  backgroundImage: string;
}

export default function SharedHero({ title, description, backgroundImage }: Props) {
  return (
    <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center overflow-hidden bg-cream-100">
      {/* Background Image con máscara */}
      <div className="absolute right-0 top-0 z-0 hidden h-full w-1/2 lg:block">
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="
            h-full w-full object-cover object-center
            mask-[url('/mask2.png')]
            mask-size-[120%_100%]
            mask-position-left
            mask-no-repeat
            [-webkit-mask-image:url('/mask2.png')]
            [-webkit-mask-size:120%_100%]
            [-webkit-mask-position:left]
            [-webkit-mask-repeat:no-repeat]
          "
        />
      </div>

      {/* Background móvil */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="
            h-full w-full object-cover object-center opacity-60
            mask-[url('/mask2.png')]
            mask-[180%_auto]
            mask-center
            mask-no-repeat
            [-webkit-mask-image:url('/mask2.png')]
            [-webkit-mask-size:180%_auto]
            [-webkit-mask-repeat:no-repeat]
            [-webkit-mask-position:center]
          "
        />
      </div>

      <div className="absolute inset-0 z-0 bg-cream-100/70 lg:hidden" />

      <Container className="relative z-10 py-20 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="text-center lg:text-left">
            {/* Decorative Element */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="h-px w-12 bg-accent-500" />
              <span className="text-accent-500 text-sm">✦</span>
              <div className="h-px w-12 bg-accent-500" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brown-900 mb-6">
              {title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-brown-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
