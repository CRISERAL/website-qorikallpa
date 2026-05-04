interface Props {
  items: string[];
}

export default function ListText({ items }: Props) {
  return (
    <ul className="space-y-3 text-[13px] text-gray-700">
      {items.map((item, i) => (
        <li key={i} className="flex">
          <span className="mr-3">•</span>
          <span className="whitespace-pre-line">{item}</span>
        </li>
      ))}
    </ul>
  );
}
