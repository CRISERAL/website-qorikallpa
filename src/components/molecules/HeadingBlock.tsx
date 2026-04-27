import { Link } from '@/src/i18n/navigation';
import { FaAngleRight } from 'react-icons/fa';

interface Props {
  subtitle?: string;
  title: string;
  description?: string;
  primaryButtonLabel?: string;
  href?: string;
  className?: string;
}

export default function HeadingBlock({
  subtitle,
  title,
  description,
  primaryButtonLabel,
  href,
  className = '',
}: Props) {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-start lg:w-64 shrink-0 space-y-4">
      <div>
        <p className="text-xs text-stone-500 uppercase">{subtitle}</p>
        <h2 className="text-3xl font-bold mt-1 leading-tight">{title}</h2>
      </div>
      <div className=" w-10 h-px bg-accent"></div>
      <p className="text-sm text-stone-600 leading-relaxed">{description}</p>

      {primaryButtonLabel && href && (
        <Link
          href={href}
          className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-xs font-semibold uppercase tracking-widest hover:bg-accent-light transition-colors"
        >
          {primaryButtonLabel}
          <FaAngleRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
