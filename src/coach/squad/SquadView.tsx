import { useState } from 'react';
import { Search, Filter, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import StatusBadge, { type PlayerStatus } from '../components/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Extended Player interface for the squad view
interface SquadPlayer {
    id: string;
    name: string;
    position: string;
    age: number;
    status: PlayerStatus;
    ovr: number;
    lastEval: number;
    attendance: number;
}

// Mock Data
const MOCK_SQUAD: SquadPlayer[] = [
    { id: '1', name: 'Riadh Necir', position: 'RW', age: 17, status: 'active', ovr: 87, lastEval: 8.5, attendance: 95 },
    { id: '2', name: 'Karim Benzema', position: 'ST', age: 17, status: 'injured', ovr: 89, lastEval: 9.2, attendance: 88 },
    { id: '3', name: 'Luka Modric', position: 'CM', age: 16, status: 'active', ovr: 85, lastEval: 8.0, attendance: 92 },
    { id: '4', name: 'Sergio Ramos', position: 'CB', age: 18, status: 'suspended', ovr: 88, lastEval: 8.8, attendance: 90 },
    { id: '5', name: 'Thibaut Courtois', position: 'GK', age: 18, status: 'active', ovr: 86, lastEval: 8.4, attendance: 98 },
    { id: '6', name: 'Vinicius Jr', position: 'LW', age: 17, status: 'rehab', ovr: 91, lastEval: 9.5, attendance: 85 },
];

export default function SquadView() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredSquad = MOCK_SQUAD.filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || player.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter mb-2">{t('coach.squad_view.title')}</h1>
                    <p className="text-zinc-500 text-[10px] md:text-sm font-black uppercase tracking-[0.2em]">{t('coach.squad_view.subtitle')}</p>
                </div>
                <div className="grid grid-cols-2 md:flex items-center gap-3">
                    <button className="h-12 md:h-14 px-4 md:px-6 rounded-2xl bg-primary text-zinc-900 flex items-center justify-center gap-2 shadow-xl shadow-primary/20 transition-all active:scale-95 font-black uppercase tracking-widest text-[10px]">
                        + {t('coach.dashboard.add_player')}
                    </button>
                    <button className="h-12 md:h-14 px-4 md:px-6 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center gap-2 transition-all active:scale-95 font-black uppercase tracking-widest text-[10px]">
                        {t('coach.squad_view.export_report')}
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-6 bg-zinc-900/50 border border-white/5 rounded-3xl">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder={t('coach.player_selector.search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 bg-black/20 border border-white/10 rounded-2xl pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-12 bg-black/20 border border-white/10 rounded-2xl px-4 text-sm text-zinc-300 focus:outline-none focus:border-primary/50 transition-colors flex-1 sm:flex-none"
                    >
                        <option value="all">{t('coach.squad_view.all_status')}</option>
                        <option value="active">{t('common.status.fit')}</option>
                        <option value="injured">{t('common.status.injured')}</option>
                        <option value="rehab">{t('common.status.rehab')}</option>
                    </select>
                    <button className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-2xl hover:bg-white/5 text-zinc-400">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto hide-scrollbar">
                    <table className="w-full text-left min-w-[900px]">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="p-6 cursor-pointer hover:text-white group" onClick={() => { }}>
                                    <div className="flex items-center gap-2">
                                        {t('coach.squad_view.header_name')}
                                        <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </th>
                                <th className="p-6 text-center">{t('coach.squad_view.header_pos')}</th>
                                <th className="p-6 text-center">{t('coach.squad_view.header_age')}</th>
                                <th className="p-6 text-center">{t('coach.squad_view.header_status')}</th>
                                <th className="p-6 text-center">{t('coach.squad_view.header_ovr')}</th>
                                <th className="p-6 text-center">{t('coach.squad_view.header_last_eval')}</th>
                                <th className="p-6 text-center">{t('coach.squad_view.header_attendance')}</th>
                                <th className="p-6 text-right">{t('coach.squad_view.header_actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/2">
                            {filteredSquad.map((player) => (
                                <tr
                                    key={player.id}
                                    onClick={() => navigate(`/coach/player/${player.id}`)}
                                    className="group hover:bg-white/2 transition-colors cursor-pointer"
                                >
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-2xl bg-zinc-800 flex items-center justify-center text-xs font-black text-white relative overflow-hidden border border-white/5">
                                                {player.name.charAt(0)}
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10"></div>
                                            </div>
                                            <div>
                                                <div className="font-black text-white italic uppercase tracking-tighter group-hover:text-primary transition-colors">{player.name}</div>
                                                <div className="text-[10px] text-zinc-500 font-bold">ID: #{player.id.padStart(4, '0')}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-center">
                                        <span className="px-2.5 py-1 rounded-xl bg-zinc-800 text-[10px] font-black text-zinc-400 border border-white/5 uppercase italic">
                                            {player.position}
                                        </span>
                                    </td>
                                    <td className="p-6 text-center text-sm font-black text-zinc-300 italic">{player.age}</td>
                                    <td className="p-6 text-center">
                                        <div className="flex justify-center">
                                            <StatusBadge status={player.status} showLabel={false} />
                                        </div>
                                    </td>
                                    <td className="p-6 text-center">
                                        <span className={`text-lg font-black italic ${player.ovr >= 90 ? 'text-emerald-400' : player.ovr >= 80 ? 'text-blue-400' : 'text-zinc-400'}`}>
                                            {player.ovr}
                                        </span>
                                    </td>
                                    <td className="p-6 text-center text-sm font-black text-white italic">{player.lastEval}</td>
                                    <td className="p-6 text-center">
                                        <div className="max-w-[100px] mx-auto">
                                            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden border border-white/5">
                                                <div
                                                    className="bg-primary h-full rounded-full"
                                                    style={{ width: `${player.attendance}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-[9px] font-black text-zinc-500 mt-1 uppercase tracking-tighter">{player.attendance}%</div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-500 hover:text-white transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredSquad.map((player) => (
                    <div
                        key={player.id}
                        onClick={() => navigate(`/coach/player/${player.id}`)}
                        className="bg-zinc-900 border border-white/5 p-5 rounded-3xl space-y-4 active:scale-98 transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-sm font-black text-white relative overflow-hidden border border-white/5">
                                    {player.name.charAt(0)}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10"></div>
                                </div>
                                <div>
                                    <div className="font-black text-white italic uppercase tracking-tighter">{player.name}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-black text-zinc-500">#{player.id.padStart(4, '0')}</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                                        <span className="text-[10px] font-black text-primary italic uppercase tracking-widest">{player.position}</span>
                                    </div>
                                </div>
                            </div>
                            <StatusBadge status={player.status} showLabel={false} />
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5">
                            <div className="text-center">
                                <div className="text-[8px] font-black text-zinc-500 uppercase mb-1 tracking-widest">{t('coach.squad_view.header_ovr')}</div>
                                <div className={`text-xl font-black italic ${player.ovr >= 90 ? 'text-emerald-400' : player.ovr >= 80 ? 'text-blue-400' : 'text-zinc-400'}`}>
                                    {player.ovr}
                                </div>
                            </div>
                            <div className="text-center border-x border-white/5">
                                <div className="text-[8px] font-black text-zinc-500 uppercase mb-1 tracking-widest">{t('coach.squad_view.header_last_eval')}</div>
                                <div className="text-xl font-black text-white italic">{player.lastEval}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-[8px] font-black text-zinc-500 uppercase mb-1 tracking-widest">{t('coach.squad_view.header_age')}</div>
                                <div className="text-xl font-black text-zinc-300 italic">{player.age}</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex-1 mr-6">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{t('coach.squad_view.header_attendance')}</span>
                                    <span className="text-[9px] font-black text-primary">{player.attendance}%</span>
                                </div>
                                <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full" style={{ width: `${player.attendance}%` }}></div>
                                </div>
                            </div>
                            <button className="p-2 rounded-xl bg-white/5 text-zinc-500">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-6">
                {t('coach.squad_view.footer_count', { count: filteredSquad.length })}
            </div>
        </div>
    );
}
