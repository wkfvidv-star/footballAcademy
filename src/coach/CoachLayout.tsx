import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import MobileHeader from '../components/shared/MobileHeader';
import BottomNavigation from '../components/shared/BottomNavigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoachLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen text-foreground flex flex-col lg:flex-row">
            {/* Mobile Header */}
            <MobileHeader
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                role="coach"
            />

            {/* Sidebar - Desktop */}
            <div className="hidden lg:flex w-72 h-screen fixed left-0 top-0 border-r border-white/5 z-50">
                <Sidebar role="coach" />
            </div>

            {/* Sidebar - Mobile Drawer */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] z-[80] shadow-2xl"
                        >
                            <Sidebar role="coach" onClose={() => setIsSidebarOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main className="flex-1 lg:ml-72 pt-16 lg:pt-0 pb-20 lg:pb-0">
                <div className="p-4 md:p-8 lg:p-12 w-full max-w-[1600px] mx-auto min-h-screen">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <BottomNavigation role="coach" />
        </div>
    );
}
