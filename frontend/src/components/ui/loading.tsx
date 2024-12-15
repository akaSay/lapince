import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </div>
    </div>
  );
};
