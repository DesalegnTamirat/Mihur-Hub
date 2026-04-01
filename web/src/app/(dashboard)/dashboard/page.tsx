'use client';

import { useAuthStore } from '@/store/auth';
import { AuthGuard } from '@/components/auth-guard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen p-8 bg-background">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4 text-muted-foreground">
          Welcome back, <span className="font-semibold text-foreground">{user?.name || user?.email}</span>!
        </p>
        <div className="mt-8">
          <Button variant="destructive" onClick={handleLogout}>Log out</Button>
        </div>
      </div>
    </AuthGuard>
  );
}
