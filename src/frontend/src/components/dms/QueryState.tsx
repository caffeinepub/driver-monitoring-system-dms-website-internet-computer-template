import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

interface QueryStateProps {
  isLoading: boolean;
  error: Error | null;
  children: ReactNode;
  loadingComponent?: ReactNode;
}

export default function QueryState({
  isLoading,
  error,
  children,
  loadingComponent,
}: QueryStateProps) {
  if (isLoading) {
    return (
      loadingComponent || (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      )
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message ||
            "An error occurred while loading data. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}
