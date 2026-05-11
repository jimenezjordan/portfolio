import { ReactNode } from 'react';

type Props = {
  kicker?: string;
  title: string;
  children: ReactNode;
};

export default function DecisionCallout({ kicker, title, children }: Props) {
  return (
    <div className="border-l-4 border-neutral-900 pl-6 py-1">
      {kicker && (
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          {kicker}
        </span>
      )}
      <h3 className="mt-1 text-lg font-medium text-neutral-900">{title}</h3>
      <div className="mt-3 text-neutral-600 leading-relaxed">{children}</div>
    </div>
  );
}
