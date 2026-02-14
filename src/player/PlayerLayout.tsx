import { Outlet } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';

export default function PlayerLayout() {
    return (
        <div className="min-h-screen text-foreground flex">
            <Sidebar role="player" />
            <main className="flex-1 ml-72">
                <div className="p-8 lg:p-12 w-full max-w-[1600px] mx-auto min-h-screen">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
