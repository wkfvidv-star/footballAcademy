
import React from 'react';
import { X } from 'lucide-react';
import GPSView from '../../components/Dashboard/GPS/GPSView';

interface GPSAnalysisModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GPSAnalysisModal: React.FC<GPSAnalysisModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-black/40 hover:bg-white/10 text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="max-h-[90vh] overflow-y-auto p-1">
                    <GPSView />
                </div>
            </div>
        </div>
    );
};
