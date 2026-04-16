import { Eye, LogOut, MoonStar, Plus, SunMedium, UserCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useFinance } from '../../context/FinanceContext';
import { useAuth } from '../../context/AuthContext';

export function Topbar() {
  const { state, toggleDarkMode, canManageTransactions, openEditor } = useFinance();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-4 z-40 mx-4 rounded-3xl border border-slate-200/80 bg-white/82 px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-950/78 sm:mx-6 xl:mx-10 xl:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex items-center gap-3">
          <img
            src="/company-logo.svg"
            alt="Zorvyn logo"
            className="h-12 w-12 object-contain drop-shadow-[0_1px_1px_rgba(15,23,42,0.18)]"
          />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Zorvyn Fintech</p>
            <h2 className="truncate text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">Treasury Intelligence Dashboard</h2>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-start gap-2 lg:w-auto lg:justify-end">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/85 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/60">
            <Badge tone={canManageTransactions ? 'warning' : 'info'} className="uppercase tracking-[0.08em]">
              {state.role}
            </Badge>
          </div>
          
          <Button
            variant="ghost"
            onClick={toggleDarkMode}
            className="border border-slate-200/80 bg-white/85 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-800"
            title="Toggle dark mode"
          >
            {state.darkMode ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </Button>

          <Button
            variant="primary"
            onClick={() => openEditor()}
            disabled={!canManageTransactions}
            title={canManageTransactions ? 'Create a new transaction' : 'Viewer mode is read-only'}
            className="gap-1.5 px-4"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Entry</span>
          </Button>

          <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/85 px-2 py-1 dark:border-slate-700 dark:bg-slate-900/60">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
              canManageTransactions
                ? 'bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950'
                : 'bg-gradient-to-br from-cyan-300 to-blue-500 text-white'
            }`}>
              {canManageTransactions ? (
                <UserCircle2 className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </div>
            <div className="hidden pr-2 text-left sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Profile</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name || 'Zorvyn User'}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{user?.email || 'local@zorvyn.app'}</p>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={logout}
            className="gap-1.5"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}