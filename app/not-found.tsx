import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Lock, Home} from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-4xl font-bold">404</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              This page has been locked away. The password you&apos;re looking for doesn&apos;t exist.
            </p>
            <div className="pt-4">
              <Link href="/">
                <Button>
                  <Home className="mr-2 h-4 w-4" />
                  Return Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

