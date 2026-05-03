import Container from '../templates/Container';

interface Props {
  title: string;
  description: string;
  backgroundImage: string;
}

export default function SharedHero({ title, description, backgroundImage }: Props) {
  return (
    <section className="relative min-h-screen  lg:min-h-[60vh] flex items-center overflow-hidden">
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
      <div className="absolute inset-0 z-0 lg:hidden">
        <img
          src="/bg-about-3.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-60 mask-[url('/mask2.png')] mask-[180%_auto] mask-center mask-no-repeat [-webkit-mask-image:url('/mask2.png')] [-webkit-mask-size:180%_auto] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]
          "
        />
      </div>

      <div className="absolute inset-0 z-0 bg-cream-100/70 lg:hidden" />

      <Container className="relative z-10 py-20 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="text-center lg:text-left">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary-5  00 mb-6">
              {title}
            </h1>
            <div className="my-4 flex justify-center lg:justify-start" aria-hidden="true">
              <svg viewBox="0 0 200 12" fill="none" width={200} height={12}>
                <path
                  d="M0 6 Q10 0 20 6 Q30 12 40 6 Q50 0 60 6 Q70 12 80 6 Q90 0 100 6 Q110 12 120 6 Q130 0 140 6 Q150 12 160 6 Q170 0 180 6 Q190 12 200 6"
                  stroke="var(--color-primary-500)"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </div>
            <p className="leading-relaxed max-w-xl mx-auto lg:mx-0">{description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
