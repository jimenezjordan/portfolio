export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}
