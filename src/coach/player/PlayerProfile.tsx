import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Activity, Calendar, Shield, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { useTranslation } from 'react-i18next';

export default function PlayerProfile() {
    const { id } = useParams();
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock Data - In real app, fetch by ID
    const player = {
        id: id || '1',
        name: 'Riadh Necir',
        position: 'Right Wing',
        number: 10,
        age: 17,
        height: '178cm',
        weight: '68kg',
        status: 'active' as const,
        joined: '2023-08-15',
        ovr: 87,
        stats: {
            physical: 85,
            technical: 88,
            tactical: 82,
            mental: 90
        }
    };

    const tabs = [
        { id: 'overview', label: t('coach.player_profile.tab_overview') },
        { id: 'history', label: t('coach.player_profile.tab_history') },
        { id: 'notes', label: t('coach.player_profile.tab_notes') },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link to="/coach/squad" className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5 ms-1" />
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-white">{t('coach.player_profile.title')}</h1>
                    <div className="text-xs text-zinc-400">{t('coach.player_profile.back_to_squad')}</div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-card/50 border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-32 h-32 rounded-full bg-zinc-800 border-4 border-zinc-700/50 flex items-center justify-center text-4xl font-bold text-zinc-600">
                        {player.name.charAt(0)}
                    </div>
                    <StatusBadge status={player.status} />
                </div>

                <div className="flex-1 relative z-10 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm font-bold text-primary mb-1">#{player.number} • {player.position}</div>
                            <h2 className="text-4xl font-black text-white tracking-tight">{player.name}</h2>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-zinc-400 mb-1">{t('coach.player_profile.overall_rating')}</div>
                            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                                {player.ovr}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                        <div>
                            <div className="text-xs text-zinc-500 mb-1">{t('coach.player_profile.age')}</div>
                            <div className="font-bold text-white">{player.age}</div>
                        </div>
                        <div>
                            <div className="text-xs text-zinc-500 mb-1">{t('coach.player_profile.height')}</div>
                            <div className="font-bold text-white">{player.height}</div>
                        </div>
                        <div>
                            <div className="text-xs text-zinc-500 mb-1">{t('coach.player_profile.weight')}</div>
                            <div className="font-bold text-white">{player.weight}</div>
                        </div>
                        <div>
                            <div className="text-xs text-zinc-500 mb-1">{t('coach.player_profile.joined')}</div>
                            <div className="font-bold text-white">{player.joined}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs & Content */}
            <div className="space-y-6">
                <div className="flex gap-2 border-b border-white/5 pb-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-sm font-bold transition-colors relative ${activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            {tab.label}
                            {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></div>}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-card/30 border border-white/5 p-5 rounded-2xl md:col-span-2 row-span-2">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-primary" /> {t('coach.player_profile.performance_radar')}
                            </h3>
                            <div className="h-64 flex items-center justify-center text-zinc-500 text-sm">
                                {t('coach.player_profile.radar_placeholder')}
                            </div>
                        </div>

                        <div className="bg-card/30 border border-white/5 p-5 rounded-2xl">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-amber-400" /> {t('coach.player_profile.recent_form')}
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm"><span>{t('coach.player_profile.avg_rating')}</span> <span className="text-white font-bold">8.4</span></div>
                                <div className="flex justify-between text-sm"><span>{t('coach.player_profile.last_match')}</span> <span className="text-white font-bold">9.0</span></div>
                                <div className="flex justify-between text-sm"><span>{t('coach.player_profile.training')}</span> <span className="text-white font-bold">8.2</span></div>
                            </div>
                        </div>

                        <div className="bg-card/30 border border-white/5 p-5 rounded-2xl">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-400" /> {t('coach.player_profile.availability')}
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm"><span>{t('coach.player_profile.attendance')}</span> <span className="text-green-400 font-bold">98%</span></div>
                                <div className="flex justify-between text-sm"><span>{t('coach.player_profile.injury_risk')}</span> <span className="text-green-400 font-bold">{t('evaluation.good')}</span></div>
                            </div>
                        </div>

                        <div className="bg-card/30 border border-white/5 p-5 rounded-2xl md:col-span-2">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-zinc-400" /> {t('coach.player_profile.upcoming_schedule')}
                            </h3>
                            <div className="space-y-2">
                                <div className="p-3 bg-white/5 rounded-xl text-sm flex justify-between items-center">
                                    <span className="text-white font-medium">{t('dashboard.teamTraining')}</span>
                                    <span className="text-zinc-500">{t('dashboard.tomorrow')}</span>
                                </div>
                                <div className="p-3 bg-white/5 rounded-xl text-sm flex justify-between items-center">
                                    <span className="text-white font-medium">Match vs Academy B</span>
                                    <span className="text-zinc-500">Sat, 15:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
