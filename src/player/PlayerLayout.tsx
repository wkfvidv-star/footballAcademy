import { Outlet } from 'react-router-dom';
import MobileNav from './components/MobileNav';
import PlayerHeader from './components/Header';

export default function PlayerLayout() {
    return (
        <div className="min-h-screen bg-[#09090b] text-foreground pb-20">
            <PlayerHeader />
            <main className="px-4 py-2">
                <Outlet />
            </main>
            <MobileNav />
        </div>
    );
}
