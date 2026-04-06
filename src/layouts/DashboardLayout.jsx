import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';

export function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900 dark:text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 dark:opacity-20" />
      <div className="relative mx-auto flex min-h-screen max-w-[1820px]">
        <Sidebar />

        <div className="flex min-h-screen w-full flex-col">
          <Topbar />
          <main className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
            <div className="mx-auto max-w-[1240px] pb-8">{children}</div>
            <footer className="mx-auto mt-2 max-w-[1240px] pb-6 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
              <p>Copyright &copy; {new Date().getFullYear()} Zorvyn. All rights reserved.</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}