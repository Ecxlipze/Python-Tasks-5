interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search jobs..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border bg-white p-3 shadow-sm focus:border-blue-500 focus:outline-none"
    />
  );
}