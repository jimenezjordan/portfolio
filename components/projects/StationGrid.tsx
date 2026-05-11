import { useTranslations } from 'next-intl';
import { stations } from '@/lib/stations';

function distanceColor(dist: string) {
  const km = parseFloat(dist.replace(',', '.'));
  if (km <= 1) return 'text-emerald-600';
  if (km <= 5) return 'text-sky-600';
  return 'text-amber-600';
}

export default function StationGrid() {
  const t = useTranslations('ProjectDegresJours.stations');

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {stations.map((s) => (
          <div
            key={`${s.site}-${s.stationId}`}
            className="group rounded-xl border border-sky-100 bg-white p-4 transition hover:border-sky-200 hover:shadow-sm"
          >
            <p className="text-sm font-bold text-neutral-900">{s.site}</p>
            <p className="mt-1 font-mono text-xs text-neutral-500">{s.stationName}</p>
            <p className={`mt-1.5 font-mono text-xs font-semibold ${distanceColor(s.distance)}`}>
              {s.distance}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-6 text-xs text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> ≤ 1 km
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-sky-500" /> 1 – 5 km
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" /> &gt; 5 km
        </span>
      </div>
      <p className="mt-3 text-xs text-neutral-400">{t('description')}</p>
    </div>
  );
}
