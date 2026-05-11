import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-neutral-200/70">
            <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
                <div className="text-sm text-neutral-500">
                    © {year} — {t('rights')}
                </div>

                <div className="flex items-center gap-4 text-neutral-500">
                    <a
                        href="https://github.com/ton-pseudo"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="hover:text-neutral-900"
                    >
                    </a>
                    <a
                        href="https://linkedin.com/in/ton-profil"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-neutral-900"
                    >
                    </a>
                    <a
                        href="mailto:ton@mail.com"
                        aria-label="Email"
                        className="hover:text-neutral-900"
                    >
                        <Mail size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
