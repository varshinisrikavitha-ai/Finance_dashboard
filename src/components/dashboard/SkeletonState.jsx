export function SkeletonState() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-3xl bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div
          className="h-[360px] rounded-3xl bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer"
          style={{
            animationDelay: '0.2s'
          }}
        />
        <div
          className="h-[360px] rounded-3xl bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer"
          style={{
            animationDelay: '0.3s'
          }}
        />
      </div>
      <div
        className="h-[420px] rounded-3xl bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer"
        style={{
          animationDelay: '0.4s'
        }}
      />
    </div>
  );
}