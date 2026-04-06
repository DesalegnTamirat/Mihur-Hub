'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Trash2, FolderGit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/api/client';

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/projects/${project.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted');
    },
    onError: () => {
      toast.error('Failed to delete project');
    },
  });

  return (
    <Card className="flex flex-col h-full bg-card/60 backdrop-blur-sm border border-border/60 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
      <CardHeader className="pb-3 border-b border-border/30">
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10">
                <FolderGit2 className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="line-clamp-1 flex-1 text-lg">{project.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-4 pb-2">
        <CardDescription className="line-clamp-3 min-h-[60px] text-sm leading-relaxed">
          {project.description || 'No description provided.'}
        </CardDescription>
        <p className="text-xs text-muted-foreground mt-4 font-medium tracking-wide opacity-80 mt-auto pt-2">
          CREATED {new Date(project.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </CardContent>
      <CardFooter className="flex gap-3 pt-4 border-t border-border/30 bg-muted/20">
        <Button 
          variant="default"
          className="flex-1 shadow-sm font-medium" 
          onClick={() => router.push(`/dashboard/projects/${project.id}`)}
        >
          Open Project
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
          onClick={() => deleteMutation.mutate()}
          disabled={deleteMutation.isPending}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
