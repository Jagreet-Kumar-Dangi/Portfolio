import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-6xl px-5 py-16 md:py-24", className)}>
      <div className="reveal">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-bold md:text-4xl">{title}</h2>
        <div className="mt-4 h-px w-16 bg-primary" />
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "reveal rounded-xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/60",
        className,
      )}
    >
      {children}
    </div>
  );
}
