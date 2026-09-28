import { useState } from "react";

import Header from "./Header";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header onMenuClick={openSidebar} />

          <main className="min-w-0 flex-1 overflow-x-hidden pb-20 lg:pb-0">
            {children}
          </main>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}

export default DashboardLayout;
