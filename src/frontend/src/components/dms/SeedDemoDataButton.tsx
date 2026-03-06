import { Button } from "@/components/ui/button";
import { useSeedDemoData } from "@/hooks/dmsQueries";
import { CheckCircle2, Database, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SeedDemoDataButton() {
  const [showSuccess, setShowSuccess] = useState(false);
  const seedMutation = useSeedDemoData();

  const handleSeed = async () => {
    try {
      await seedMutation.mutateAsync();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to seed demo data:", error);
    }
  };

  return (
    <Button
      onClick={handleSeed}
      disabled={seedMutation.isPending || showSuccess}
      variant={showSuccess ? "outline" : "default"}
      className="gap-2"
    >
      {seedMutation.isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : showSuccess ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          Demo Data Loaded
        </>
      ) : (
        <>
          <Database className="h-4 w-4" />
          Load Demo Data
        </>
      )}
    </Button>
  );
}
