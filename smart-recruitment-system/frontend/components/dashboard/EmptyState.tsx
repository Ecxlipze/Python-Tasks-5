export default function EmptyState({
  title,
}: {
  title: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-10 text-center">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>
    </div>
  );
}