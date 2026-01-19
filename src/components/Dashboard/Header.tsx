import { MapPin, User, Globe, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Header() {
    const { t, i18n } = useTranslation();
    const [searchFocused, setSearchFocused] = useState(false);

    const toggleLanguage = () => {
        const current = i18n.language;
        const next = current === 'en' ? 'fr' : current === 'fr' ? 'ar' : 'en';
        i18n.changeLanguage(next);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Desktop Search Bar */}
            <div className="hidden lg:flex items-center justify-between gap-4">
                <div className={`flex-1 max-w-md relative transition-all ${searchFocused ? 'max-w-2xl' : ''
                    }`}>
                    <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder={t('search.placeholder')}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="w-full ps-11 pe-4 py-3 bg-secondary/50 border border-white/5 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/30 focus:bg-secondary transition-all"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleLanguage}
                        className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                        aria-label="Change Language"
                    >
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">{i18n.language}</span>
                    </button>
                    <div className="text-xs text-zinc-500">
                        <span className="text-zinc-400">{t('header.lastSynced')}</span> {t('time.minutesAgo', { count: 2 })}
                    </div>
                </div>
            </div>

            {/* Player Identity */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-secondary border-2 border-primary flex items-center justify-center overflow-hidden">
                        <User className="w-8 h-8 lg:w-10 lg:h-10 text-secondary-foreground opacity-50" />
                    </div>
                    <div className="absolute bottom-0 end-0 w-4 h-4 lg:w-5 lg:h-5 bg-primary rounded-full border-2 border-background"></div>
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl lg:text-4xl font-bold text-foreground tracking-tight">Riadh Necir</h1>
                        <button
                            onClick={toggleLanguage}
                            className="lg:hidden p-2 rounded-full hover:bg-white/10 text-zinc-400 transition-colors"
                            aria-label="Change Language"
                        >
                            <Globe className="w-4 h-4 lg:w-5 lg:h-5" />
                            <span className="sr-only">{i18n.language.toUpperCase()}</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-3 text-sm lg:text-base text-zinc-400 mt-1">
                        <span className="flex items-center gap-1">
                            <span className="px-2 py-0.5 rounded-full bg-secondary text-primary text-xs lg:text-sm font-semibold">{t('header.position')}</span>
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                        <span>{t('header.age')}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                            {t('header.location')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
