type Props = {
  value: string;
  label: string;
  dark?: boolean;
};

export default function StatCard({ value, label, dark = false }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <span className={`text-3xl font-bold tracking-tight ${dark ? 'text-white' : 'text-neutral-900'}`}>
        {value}
      </span>
      <span className={`text-sm ${dark ? 'text-neutral-500' : 'text-neutral-500'}`}>{label}</span>
    </div>
  );
}
