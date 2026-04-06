'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/api/client';
import { ProjectCard } from './project-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export function ProjectList() {
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/projects');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse flex flex-col h-[230px] border-border/40">
            <CardHeader className="h-16 border-b border-border/30 flex flex-row items-center gap-3 pb-3">
              <div className="h-10 w-10 bg-muted rounded-md" />
              <div className="h-6 w-3/4 bg-muted rounded-md" />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col pt-4 pb-2">
              <div className="h-4 w-full bg-muted rounded-md mb-2" />
              <div className="h-4 w-5/6 bg-muted rounded-md mb-4" />
              <div className="h-3 w-1/3 bg-muted rounded-md mt-auto" />
            </CardContent>
            <div className="p-6 pt-0 border-t border-border/30 mt-4 flex gap-3 h-16 w-full">
               <div className="h-10 flex-1 bg-muted rounded-md" />
               <div className="h-10 w-10 bg-muted rounded-md" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 md:p-12 text-center border border-destructive/20 rounded-xl bg-destructive/5 text-destructive/90 max-w-2xl mx-auto mt-8">
        <h3 className="text-lg font-semibold tracking-tight mb-2">Oops! Something went wrong</h3>
        <p className="text-sm opacity-80">Failed to load your projects. Please check your connection and try refreshing the page.</p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-border/60 rounded-xl bg-card/30 max-w-3xl mx-auto mt-8 relative overflow-hidden">
        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 ring-8 ring-primary/5">
            <Plus className="h-10 w-10 text-primary opacity-80" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight mb-2">No projects yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto text-base">
          Get started by creating your first project. Projects help you organize your tasks, documents, and AI vector embeddings.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {projects.map((project: any) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
