import { useState } from 'react';
import { ArrowLeft, Send, Mic, MoreVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MessageBubble from './MessageBubble';

interface FeedbackViewProps {
    onBack: () => void;
}

export default function FeedbackView({ onBack }: FeedbackViewProps) {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([
        { id: 1, message: "Great job on the pitch today, Riyad! Your positioning was excellent.", isCoach: true, timestamp: "10:30 AM" },
        { id: 2, message: "Thanks Coach! I tried to focus on staying wide like we practiced.", isCoach: false, timestamp: "10:32 AM" },
        { id: 3, message: "I noticed your sprint recovery was a bit slow in the second half. Check the Nutrition plan I sent properly.", isCoach: true, timestamp: "10:33 AM" },
        { id: 4, message: "Will do. I think I didn't hydrate enough.", isCoach: false, timestamp: "10:35 AM" },
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        if (!inputValue.trim()) return;
        setMessages([...messages, {
            id: Date.now(),
            message: inputValue,
            isCoach: false,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setInputValue("");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-120px)] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="p-2 -ms-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-zinc-100" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary border border-white/10 overflow-hidden relative">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Coach" alt="Coach" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="font-bold text-white leading-none">{t('feedback.coach_name')}</div>
                            <div className="text-xs text-green-400">{t('feedback.online')}</div>
                        </div>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-white/10 text-zinc-400">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
                <div className="text-center text-xs text-zinc-500 my-4">{t('feedback.today')}</div>
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg.message}
                        isCoach={msg.isCoach}
                        timestamp={msg.timestamp}
                    />
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-white/5 pb-8">
                <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-2xl border border-white/5 focus-within:border-primary/50 transition-colors">
                    <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                        <Mic className="w-5 h-5" />
                    </button>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={t('feedback.placeholder')}
                        className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder:text-zinc-600 h-10"
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className="p-2 bg-primary text-background rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
