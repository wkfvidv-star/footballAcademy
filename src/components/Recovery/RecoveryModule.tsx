import React from 'react';
import { useTranslation } from 'react-i18next';
import { Waves, Footprints, Wind, Moon, Coffee, AlertCircle, Thermometer } from 'lucide-react';
import { RecoveryEngine } from '../../services/recoveryEngine';
import { useMedical } from '../../context/MedicalContext';
import { GlassCard } from '../shared/GlassCard';

export default function RecoveryModule() {
    const { t } = useTranslation();
    const { wellnessLogs, sessions } = useMedical();

    // Get latest data or defaults
    const latestWellness = wellnessLogs[0] || { fatigueLevel: 3, sorenessLevel: 3 };
    const latestSession = sessions[0] || { rpe: 5 };

    // Map RPE to 'Low' | 'Medium' | 'High'
    const intensity: 'Low' | 'Medium' | 'High' = latestSession.rpe > 7 ? 'High' : latestSession.rpe > 4 ? 'Medium' : 'Low';

    const recovery = RecoveryEngine.generatePlan(
        intensity,
        latestWellness.fatigueLevel,
        latestWellness.sorenessLevel
    );

    const getIcon = (title: string) => {
        if (title.includes('cold_water')) return <Thermometer className="w-5 h-5" />;
        if (title.includes('active_walk')) return <Footprints className="w-5 h-5" />;
        if (title.includes('foam_rolling')) return <Waves className="w-5 h-5" />;
        if (title.includes('dynamic_stretching')) return <Wind className="w-5 h-5" />;
        if (title.includes('contrast_showers')) return <Droplets className="w-5 h-5" />;
        if (title.includes('sleep_protocol')) return <Moon className="w-5 h-5" />;
        return <Coffee className="w-5 h-5" />;
    };

    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default: return 'bg-primary/10 text-primary border-primary/20';
        }
    };

    return (
        <GlassCard
            title={t('dashboard_new.recovery_protocol')}
            icon={Waves}
            headerAction={
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getPriorityStyles(recovery.priority)}`}>
                    {t(`dashboard_new.${recovery.priority === 'high' ? 'critical' : recovery.priority === 'medium' ? 'warning' : 'optimal'}`)}
                </div>
            }
        >
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                    <div className="text-[10px] text-zinc-500 uppercase font-black mb-1">{t('dashboard_new.fatigue_level')}</div>
                    <div className="text-lg font-black text-white italic">{latestWellness.fatigueLevel}<span className="text-zinc-600 not-italic">/5</span></div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                    <div className="text-[10px] text-zinc-500 uppercase font-black mb-1">{t('dashboard_new.muscle_soreness')}</div>
                    <div className="text-lg font-black text-white italic">{latestWellness.sorenessLevel}<span className="text-zinc-600 not-italic">/5</span></div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2 px-1">
                    {t(recovery.strategy)}
                </div>

                {recovery.activities.map((act, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-primary group-hover:bg-primary/10 transition-all shrink-0">
                            {getIcon(act.title)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-white italic uppercase tracking-tight">{t(act.title)}</span>
                                <span className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-500 rounded-lg font-mono italic">{act.duration}</span>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-snug mt-1 font-medium">{t(act.description)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-zinc-500 mb-3">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-black tracking-widest">{t('dashboard_new.nutrition_focus')}</span>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                    <p className="text-xs text-primary font-black leading-relaxed italic uppercase tracking-tight">
                        {t(recovery.nutritionFocus)}
                    </p>
                </div>
            </div>
        </GlassCard>
    );
}

// Helper icons needed by top level
const Droplets = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
);
