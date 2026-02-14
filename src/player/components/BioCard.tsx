import type { BiologicalProfile } from '../../types/growth';
import { Activity, Ruler, TrendingUp, Heart, Wind, Droplets, Gauge } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlassCard } from '../../components/shared/GlassCard';

interface BioCardProps {
    profile: BiologicalProfile | null;
    onUpdateClick: () => void;
}

export const BioCard: React.FC<BioCardProps> = ({ profile, onUpdateClick }) => {
    const { t } = useTranslation();

    if (!profile) {
        return (
            <GlassCard
                title={t('bio.profile')}
                icon={Activity}
                headerAction={
                    <button
                        onClick={onUpdateClick}
                        className="text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1.5 rounded-xl hover:bg-primary/20 transition-colors"
                    >
                        {t('bio.add_data')}
                    </button>
                }
            >
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <Activity className="w-6 h-6 text-zinc-600" />
                    </div>
                    <p className="text-sm text-zinc-500 font-medium">{t('bio.no_data')}</p>
                </div>
            </GlassCard>
        );
    }

    const percentage = Math.min(100, Math.max(0, profile.currentPercentageAdultHeight));

    // Color logic for Bio-Band
    const bandColor = profile.bioBand === 'circa-phv' ? 'text-amber-400 border-amber-400/30 bg-amber-400/5' :
        profile.bioBand === 'post-phv' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5' :
            'text-blue-400 border-blue-400/30 bg-blue-400/5';

    const bandLabel = profile.bioBand === 'pre-phv' ? t('bio.pre_phv') :
        profile.bioBand === 'circa-phv' ? t('bio.circa_phv') : t('bio.post_phv');

    const maturityLabel = profile.maturityStatus === 'late' ? t('bio.late') :
        profile.maturityStatus === 'early' ? t('bio.early') : t('bio.on_time');

    return (
        <GlassCard
            title={t('bio.lab')}
            icon={Activity}
            headerAction={
                <button
                    onClick={onUpdateClick}
                    className="text-[10px] font-black uppercase tracking-widest bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-xl hover:bg-zinc-700 transition-colors"
                >
                    {t('bio.update')}
                </button>
            }
        >
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="text-[10px] text-zinc-500 uppercase font-black mb-1 flex items-center gap-1.5">
                        <Ruler className="w-3 h-3" /> {t('bio.predicted_adult')}
                    </div>
                    <div className="text-xl font-bold text-white tracking-tight">
                        {profile.predictedAdultHeightCm} <span className="text-xs text-zinc-500 font-medium uppercase font-sans">cm</span>
                    </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="text-[10px] text-zinc-500 uppercase font-black mb-1 flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3" /> {t('bio.maturity_status')}
                    </div>
                    <div className={`text-sm font-black uppercase italic ${profile.maturityStatus === 'late' ? 'text-blue-400' : profile.maturityStatus === 'early' ? 'text-emerald-400' : 'text-zinc-200'}`}>
                        {maturityLabel} <span className="text-[10px] opacity-70">{t('bio.bloomer')}</span>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-end text-[10px] mb-2 uppercase font-black tracking-widest">
                    <span className="text-zinc-500">{t('bio.current_progress')}</span>
                    <span className="text-primary font-mono text-xs">{profile.currentPercentageAdultHeight}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-primary to-emerald-400 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">{t('bio.phase')}:</span>
                <span className={`text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-full ${bandColor}`}>
                    {bandLabel}
                </span>
            </div>

            {/* Physiological Metrics Section */}
            {profile.physiological && (
                <div className="pt-6 border-t border-white/5">
                    <h4 className="text-[10px] font-black text-zinc-500 mb-4 uppercase tracking-widest">{t('bio.physiological_metrics')}</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-zinc-900/40 p-3 rounded-2xl border border-white/5 group hover:border-primary/20 transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                                <Heart className="w-3 h-3 text-red-500" />
                                <div className="text-[10px] text-zinc-500 uppercase font-black">{t('bio.resting_hr')}</div>
                            </div>
                            <div className="text-base font-black text-white italic">
                                {profile.physiological.restingHR} <span className="text-[10px] text-zinc-600 font-medium not-italic">bpm</span>
                            </div>
                        </div>
                        <div className="bg-zinc-900/40 p-3 rounded-2xl border border-white/5 group hover:border-primary/20 transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                                <Wind className="w-3 h-3 text-blue-500" />
                                <div className="text-[10px] text-zinc-500 uppercase font-black">{t('bio.vo2_max')}</div>
                            </div>
                            <div className="text-base font-black text-white italic">
                                {profile.physiological.vo2Max} <span className="text-[10px] text-zinc-600 font-medium not-italic">ml/kg</span>
                            </div>
                        </div>
                        <div className="bg-zinc-900/40 p-3 rounded-2xl border border-white/5 group hover:border-primary/20 transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                                <Gauge className="w-3 h-3 text-amber-500" />
                                <div className="text-[10px] text-zinc-500 uppercase font-black">{t('bio.blood_pressure')}</div>
                            </div>
                            <div className="text-base font-black text-white italic">{profile.physiological.bloodPressure}</div>
                        </div>
                        <div className="bg-zinc-900/40 p-3 rounded-2xl border border-white/5 group hover:border-primary/20 transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                                <Droplets className="w-3 h-3 text-emerald-500" />
                                <div className="text-[10px] text-zinc-500 uppercase font-black">{t('bio.body_fat')}</div>
                            </div>
                            <div className="text-base font-black text-white italic">
                                {profile.physiological.bodyFatPercentage}<span className="text-xs text-zinc-600 font-medium not-italic">%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </GlassCard>
    );
};
