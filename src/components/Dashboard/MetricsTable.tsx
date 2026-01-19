import { ArrowUpDown, Check, Download, GitCompare, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MetricRow {
    id: string;
    name: string;
    category: string;
    score: number;
    change: number;
    date: string;
}

export default function MetricsTable() {
    const { t } = useTranslation();
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof MetricRow>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const metrics: MetricRow[] = [
        { id: '1', name: 'Short Passing', category: 'Technical', score: 88, change: 2, date: 'Yesterday' },
        { id: '2', name: 'Sprint Speed', category: 'Physical', score: 92, change: 1, date: '2 days ago' },
        { id: '3', name: 'Positioning', category: 'Tactical', score: 76, change: -1, date: 'Last week' },
        { id: '4', name: 'Focus', category: 'Mental', score: 84, change: 4, date: 'Last week' },
        { id: '5', name: 'Ball Control', category: 'Technical', score: 90, change: 3, date: '3 days ago' },
        { id: '6', name: 'Stamina', category: 'Physical', score: 87, change: 0, date: '4 days ago' },
    ];

    const handleSort = (column: keyof MetricRow) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const toggleRow = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        setSelectedRows(selectedRows.length === metrics.length ? [] : metrics.map((m) => m.id));
    };

    const sortedMetrics = [...metrics].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        const direction = sortDirection === 'asc' ? 1 : -1;
        return aVal > bVal ? direction : -direction;
    });

    return (
        <div className="bg-card/50 rounded-3xl border border-white/5 p-8">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">{t('metrics.recentEvaluations')}</h3>
                <button className="text-primary text-sm font-bold hover:underline">{t('metrics.viewAllAssessments')}</button>
            </div>

            {/* Batch Actions Bar */}
            {selectedRows.length > 0 && (
                <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">{t('metrics.selected', { count: selectedRows.length })}</span>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 hover:bg-primary/30 rounded-lg text-xs font-bold text-white transition-colors">
                            <GitCompare className="w-3.5 h-3.5" />
                            {t('metrics.compare')}
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 hover:bg-primary/30 rounded-lg text-xs font-bold text-white transition-colors">
                            <Download className="w-3.5 h-3.5" />
                            {t('metrics.export')}
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-xs font-bold text-red-400 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                            {t('metrics.delete')}
                        </button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-start">
                    <thead>
                        <tr className="text-zinc-500 text-xs uppercase tracking-widest border-b border-white/5">
                            <th className="pb-4 text-start">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.length === metrics.length}
                                    onChange={toggleAll}
                                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                                />
                            </th>
                            <th
                                className="pb-4 font-bold text-start cursor-pointer hover:text-primary transition-colors group"
                                onClick={() => handleSort('name')}
                            >
                                <div className="flex items-center gap-2">
                                    {t('metrics.metric')}
                                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </th>
                            <th
                                className="pb-4 font-bold text-start cursor-pointer hover:text-primary transition-colors group"
                                onClick={() => handleSort('category')}
                            >
                                <div className="flex items-center gap-2">
                                    {t('metrics.category')}
                                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </th>
                            <th
                                className="pb-4 font-bold text-start cursor-pointer hover:text-primary transition-colors group"
                                onClick={() => handleSort('score')}
                            >
                                <div className="flex items-center gap-2">
                                    {t('metrics.score')}
                                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </th>
                            <th
                                className="pb-4 font-bold text-start cursor-pointer hover:text-primary transition-colors group"
                                onClick={() => handleSort('change')}
                            >
                                <div className="flex items-center gap-2">
                                    {t('metrics.change')}
                                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </th>
                            <th
                                className="pb-4 font-bold text-start cursor-pointer hover:text-primary transition-colors group"
                                onClick={() => handleSort('date')}
                            >
                                <div className="flex items-center gap-2">
                                    {t('metrics.date')}
                                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {sortedMetrics.map((row) => (
                            <tr
                                key={row.id}
                                className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group cursor-pointer ${selectedRows.includes(row.id) ? 'bg-primary/5' : ''
                                    }`}
                                onClick={() => toggleRow(row.id)}
                            >
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(row.id)}
                                            onChange={() => toggleRow(row.id)}
                                            className="w-4 h-4 rounded accent-primary cursor-pointer"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        {selectedRows.includes(row.id) && (
                                            <Check className="w-3 h-3 text-primary" />
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 font-bold text-white group-hover:text-primary transition-colors">
                                    {row.name}
                                </td>
                                <td className="py-4 text-zinc-400">{row.category}</td>
                                <td className="py-4">
                                    <span className="bg-primary/10 text-primary px-2 py-1 rounded font-bold">
                                        {row.score}
                                    </span>
                                </td>
                                <td
                                    className={`py-4 font-bold ${row.change > 0
                                        ? 'text-emerald-400'
                                        : row.change < 0
                                            ? 'text-red-400'
                                            : 'text-zinc-500'
                                        }`}
                                >
                                    {row.change > 0 ? '+' : ''}
                                    {row.change}
                                </td>
                                <td className="py-4 text-zinc-500">{row.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
