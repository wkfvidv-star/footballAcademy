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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{t('coach.squad_view.title')}</h1>
                    <p className="text-zinc-400">{t('coach.squad_view.subtitle')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-primary text-black font-bold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors">
                        + {t('coach.dashboard.add_player')}
                    </button>
                    <button className="bg-white/5 border border-white/10 text-white font-medium px-4 py-2 rounded-xl hover:bg-white/10 transition-colors">
                        {t('coach.squad_view.export_report')}
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-card/30 border border-white/5 rounded-2xl">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder={t('coach.player_selector.search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-zinc-300 focus:outline-none focus:border-primary/50"
                    >
                        <option value="all">{t('coach.squad_view.all_status')}</option>
                        <option value="active">{t('common.status.fit')}</option>
                        <option value="injured">{t('common.status.injured')}</option>
                        <option value="rehab">{t('common.status.rehab')}</option>
                    </select>
                    <button className="p-2 border border-white/10 rounded-xl hover:bg-white/5 text-zinc-400">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card/50 border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider cursor-pointer hover:text-white group">
                                <div className="flex items-center gap-2">
                                    {t('coach.squad_view.header_name')}
                                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </th>
                            <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-center">{t('coach.squad_view.header_pos')}</th>
                            <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-center">{t('coach.squad_view.header_age')}</th>
                            <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-center">{t('coach.squad_view.header_status')}</th>
                            <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-center">{t('coach.squad_view.header_ovr')}</th>
                            <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-center">{t('coach.squad_view.header_last_eval')}</th>
                            <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-center">{t('coach.squad_view.header_attendance')}</th>
                            <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">{t('coach.squad_view.header_actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredSquad.map((player) => (
                            <tr
                                key={player.id}
                                onClick={() => navigate(`/coach/player/${player.id}`)}
                                className="group hover:bg-white/5 transition-colors cursor-pointer"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-white relative overflow-hidden">
                                            {player.name.charAt(0)}
                                            {/* Mock Avatar Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20"></div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white group-hover:text-primary transition-colors">{player.name}</div>
                                            <div className="text-[10px] text-zinc-500">ID: #{player.id.padStart(4, '0')}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="px-2 py-1 rounded bg-zinc-800 text-xs font-bold text-zinc-300 border border-zinc-700">
                                        {player.position}
                                    </span>
                                </td>
                                <td className="p-4 text-center text-sm text-zinc-300">{player.age}</td>
                                <td className="p-4 text-center">
                                    <StatusBadge status={player.status} showLabel={false} />
                                </td>
                                <td className="p-4 text-center">
                                    <span className={`font-bold ${player.ovr >= 90 ? 'text-emerald-400' : player.ovr >= 80 ? 'text-blue-400' : 'text-zinc-400'}`}>
                                        {player.ovr}
                                    </span>
                                </td>
                                <td className="p-4 text-center text-sm font-medium text-white">{player.lastEval}</td>
                                <td className="p-4 text-center">
                                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className="bg-primary h-full rounded-full"
                                            style={{ width: `${player.attendance}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-[10px] text-zinc-500 mt-1">{player.attendance}%</div>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-center text-xs text-zinc-500 mt-4">
                {t('coach.squad_view.footer_count', { count: filteredSquad.length })}
            </div>
        </div>
    );
}
