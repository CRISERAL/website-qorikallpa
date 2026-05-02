interface Props {
  title: string;
  description: string;
}

export default function ContactCard({ title, description }: Props) {
  return (
    <div className="space-y-3">
      <h3 className="font-playfair text-xl text-brown-900 leading-snug">{title}</h3>
      <div className="my-4 flex justify-center lg:justify-start" aria-hidden="true">
        <svg viewBox="0 0 200 12" fill="none" width={100} height={12}>
          <path
            d="M0 6 Q10 0 20 6 Q30 12 40 6 Q50 0 60 6 Q70 12 80 6 Q90 0 100 6 Q110 12 120 6 Q130 0 140 6 Q150 12 160 6 Q170 0 180 6 Q190 12 200 6"
            stroke="var(--color-gold-500)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <p className="text-sm text-brown-800/70 leading-relaxed">{description}</p>
    </div>
  );
}
