import { ChevronDown, User, Users } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Player {
    id: string;
    name: string;
    position: string;
    age: number;
    ovr: number;
}

interface PlayerSelectorProps {
    currentPlayer: Player;
    players: Player[];
    onSelectPlayer: (player: Player) => void;
    onSelectSquadView?: () => void;
}

export default function PlayerSelector({
    currentPlayer,
    players,
    onSelectPlayer,
    onSelectSquadView
}: PlayerSelectorProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 bg-secondary/50 rounded-xl border border-white/5 hover:border-white/10 transition-all group"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-start">
                            <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">
                                {t('playerSelector.currentView')}
                            </div>
                            <div className="font-bold text-sm text-white group-hover:text-primary transition-colors">
                                {currentPlayer.name}
                            </div>
                            <div className="text-xs text-zinc-400">
                                {currentPlayer.position} • {currentPlayer.age}y • {currentPlayer.ovr} OVR
                            </div>
                        </div>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full mt-2 start-0 w-full bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                    {/* Search */}
                    <div className="p-3 border-b border-white/5">
                        <input
                            type="text"
                            placeholder={t('playerSelector.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 bg-secondary/50 border border-white/5 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/30"
                            autoFocus
                        />
                    </div>

                    {/* Squad View Option */}
                    {onSelectSquadView && (
                        <button
                            onClick={() => {
                                onSelectSquadView();
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors border-b border-white/5"
                        >
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-start">
                                <div className="font-bold text-sm text-white">{t('playerSelector.squadOverview')}</div>
                                <div className="text-xs text-zinc-400">{t('playerSelector.viewAllPlayers')}</div>
                            </div>
                        </button>
                    )}

                    {/* Player List */}
                    <div className="max-h-[300px] overflow-y-auto">
                        {filteredPlayers.length === 0 ? (
                            <div className="p-4 text-center text-sm text-zinc-500">
                                {t('playerSelector.noPlayersFound')}
                            </div>
                        ) : (
                            filteredPlayers.map((player) => (
                                <button
                                    key={player.id}
                                    onClick={() => {
                                        onSelectPlayer(player);
                                        setIsOpen(false);
                                        setSearchQuery('');
                                    }}
                                    className={`w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors ${player.id === currentPlayer.id ? 'bg-primary/10' : ''
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${player.id === currentPlayer.id
                                        ? 'bg-primary/20 border border-primary/30'
                                        : 'bg-secondary'
                                        }`}>
                                        <span className="text-sm font-bold">
                                            {player.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div className="flex-1 text-start">
                                        <div className={`font-bold text-sm ${player.id === currentPlayer.id ? 'text-primary' : 'text-white'
                                            }`}>
                                            {player.name}
                                        </div>
                                        <div className="text-xs text-zinc-400">
                                            {player.position} • {player.age}y • {player.ovr} OVR
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
