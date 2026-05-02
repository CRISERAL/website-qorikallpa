interface Props {
  photo: string;
  rotation?: string;
  caption?: string;
}

export default function Polaroid({ photo, rotation = '', caption }: Props) {
  return (
    <div
      className={`shrink-0 bg-white p-2 pb-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:rotate-0 ${rotation}`}
      style={{ width: '160px' }}
    >
      <div className="w-full aspect-square overflow-hidden bg-cream-200">
        <img src={photo} alt={caption ?? ''} className="w-full h-full object-cover" />
      </div>
      {caption && (
        <p className="mt-2 text-center text-[10px] text-brown-700/60 font-light italic leading-tight px-1">
          {caption}
        </p>
      )}
    </div>
  );
}
