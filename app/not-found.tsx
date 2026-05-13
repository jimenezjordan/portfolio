import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-neutral-50 font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <FileQuestion size={48} className="mb-6 text-neutral-300" />
          <p className="text-8xl font-bold tracking-tight text-neutral-200">404</p>
          <h1 className="mt-4 text-2xl font-bold text-neutral-900">Page introuvable</h1>
          <p className="mt-3 max-w-sm text-neutral-500">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/"
              className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              Accueil
            </a>
            <a
              href="/projets"
              className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              Projets
            </a>
            <a
              href="/contact"
              className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              Contact
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
