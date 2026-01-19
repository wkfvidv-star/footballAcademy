import { useState } from 'react';
import { useTactical } from '../../../context/TacticalContext';
import Heatmap from './Heatmap';
import GPSStats from './GPSStats';
import TechnicalMap from './TechnicalMap';
import TechnicalStats from './TechnicalStats';
import { Map, ChevronDown, Activity, MousePointer2 } from 'lucide-react';

export default function GPSView() {
    const { matchLogs } = useTactical();
    const [selectedMatchId, setSelectedMatchId] = useState<string>(matchLogs[0]?.id || '');
    const [viewMode, setViewMode] = useState<'physical' | 'technical'>('physical');

    const selectedMatch = matchLogs.find(m => m.id === selectedMatchId) || matchLogs[0];

    if (!selectedMatch || !selectedMatch.gps) {
        return (
            <div className="p-8 text-center text-zinc-500 bg-white/5 rounded-2xl border border-white/5">
                <Map className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No GPS Data Available for this Session</p>
            </div>
        );
    }

    return (
        <div className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Map className="text-emerald-400" />
                        Location Analysis
                    </h2>
                    <p className="text-zinc-400 text-sm">{selectedMatch.date.split('T')[0]} vs {selectedMatch.opponent}</p>
                </div>

                <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 mr-auto ml-6">
                    <button
                        onClick={() => setViewMode('physical')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all ${viewMode === 'physical' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
                    >
                        <Activity size={16} />
                        Physical
                    </button>
                    <button
                        onClick={() => setViewMode('technical')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all ${viewMode === 'technical' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
                    >
                        <MousePointer2 size={16} />
                        Skillful
                    </button>
                </div>

                {matchLogs.length > 1 && (
                    <div className="relative">
                        <select
                            value={selectedMatchId}
                            onChange={(e) => setSelectedMatchId(e.target.value)}
                            className="appearance-none bg-black/40 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-emerald-500/50"
                        >
                            {matchLogs.map(match => (
                                <option key={match.id} value={match.id}>{match.date.split('T')[0]} - {match.opponent}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual */}
                {viewMode === 'physical' ? (
                    <Heatmap data={selectedMatch.gps.heatmap} />
                ) : (
                    <TechnicalMap data={selectedMatch.gps.technicalMap || []} />
                )}

                {/* Stats */}
                <div className="flex flex-col gap-6">
                    {viewMode === 'physical' ? (
                        <GPSStats data={selectedMatch.gps} />
                    ) : (
                        <TechnicalStats data={selectedMatch.gps.technicalMap || []} />
                    )}

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <h4 className="font-bold text-emerald-400 mb-2">Coach Insight</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                            "Excellent coverage of the central zones today. High intensity sprints in the second half show improved endurance levels. Keep maintaining this work rate."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
