import { ShieldAlert, Activity, Thermometer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InjuryPredictionService } from '../../services/injuryPredictionService';
import { GlassCard } from '../shared/GlassCard';

export default function InjuryDetectionDashboard() {
    const { t } = useTranslation();
    // Mock data for display
    const loadMetrics = { acwr: 1.6, chronicLoad: 1200, acuteLoad: 1920, freshnessIndex: 45, riskLevel: 'high' as const };
    const wellness = { soreness: 2, fatigue: 3 };
    const history = { previousInjuries: ['Hamstring'] };

    const risks = InjuryPredictionService.analyzeRisk(loadMetrics, wellness, history);

    return (
        <GlassCard
            title={t('injury_module.title')}
            icon={ShieldAlert}
            variant="default"
        >
            <div className="space-y-6">
                {/* Risk Overview */}
                <div className="flex items-center gap-6 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl group hover:bg-red-500/20 transition-all">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-zinc-800" />
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={176} strokeDashoffset={176 - (176 * 0.75)} className="text-red-500" />
                        </svg>
                        <span className="absolute text-sm font-black text-white">75%</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white uppercase italic tracking-tight">{t('injury_module.high_risk')}</h3>
                        <p className="text-xs text-zinc-400 font-medium">{t('injury_module.system_alert')}</p>
                    </div>
                </div>

                {/* Specific Areas */}
                <div className="space-y-4">
                    <h4 className="text-[10px] text-zinc-500 uppercase font-black tracking-widest px-1">{t('injury_module.at_risk_areas')}</h4>
                    <div className="grid grid-cols-1 gap-3">
                        {risks.map((risk, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-3 group hover:border-red-500/20 transition-all">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-black text-white italic uppercase">{t(risk.area)}</span>
                                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest ${risk.severity === 'critical' ? 'bg-red-500 text-zinc-900' :
                                            risk.severity === 'high' ? 'bg-orange-500 text-zinc-900' :
                                                'bg-yellow-500 text-zinc-900'
                                        }`}>
                                        {t(`injury_module.level.${risk.severity}`)}
                                    </span>
                                </div>
                                <div className="space-y-1.5">
                                    {risk.indicators.map((ind, j) => (
                                        <div key={j} className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                            {t(ind)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Internal Load Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl flex items-center gap-4 group hover:border-primary/20 transition-all">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Activity className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <div className="text-[10px] text-zinc-500 uppercase font-black mb-0.5">{t('injury_module.acwr')}</div>
                            <div className="text-lg font-black text-red-500 italic">1.60</div>
                        </div>
                    </div>
                    <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl flex items-center gap-4 group hover:border-primary/20 transition-all">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Thermometer className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <div className="text-[10px] text-zinc-500 uppercase font-black mb-0.5">{t('injury_module.fatigue')}</div>
                            <div className="text-lg font-black text-white italic uppercase">{t('injury_module.level.high')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
