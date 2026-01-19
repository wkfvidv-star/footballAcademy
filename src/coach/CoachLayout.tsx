import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

export default function CoachLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-[#09090b]">
                {/* Helper layout container for content consistency */}
                <div className="p-6 lg:p-10 w-full max-w-[1600px] mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
