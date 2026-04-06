'use client';

import { AuthGuard } from '@/components/auth-guard';
import { Navbar } from '@/components/dashboard/navbar';
import { ProjectList } from '@/components/dashboard/project-list';
import { CreateProjectDialog } from '@/components/dashboard/create-project-dialog';

export default function Dashboard() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
        <Navbar />
        
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 pb-6 border-b border-border/40">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Your Projects</h1>
              <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-2xl font-medium">
                Manage all your active projects, documents, and vector embeddings in one place.
              </p>
            </div>
            <CreateProjectDialog />
          </div>

          <ProjectList />
        </main>
      </div>
    </AuthGuard>
  );
}
