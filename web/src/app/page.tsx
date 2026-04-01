import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24 bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold tracking-tight">Mihur-Hub</CardTitle>
          <CardDescription className="text-lg mt-2">
            Premium E-commerce Experience
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center mt-4">
          <Button size="lg" className="w-full">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
