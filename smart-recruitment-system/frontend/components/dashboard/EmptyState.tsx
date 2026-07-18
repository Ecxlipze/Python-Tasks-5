import { Button } from "@/components/ui/button";

export default function EmptyState({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-lg border bg-white p-10 text-center">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>
      {actionLabel && onAction ? (
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
