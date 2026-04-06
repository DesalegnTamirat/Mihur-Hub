'use client';

import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded bg-primary flex flex-col items-center justify-center">
            <span className="text-primary-foreground font-bold leading-none">M</span>
        </div>
        <span className="text-xl font-bold tracking-tight">Mihur-Hub</span>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">
            {user.name || user.email}
          </span>
        )}
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
          Log out
        </Button>
      </div>
    </nav>
  );
}
