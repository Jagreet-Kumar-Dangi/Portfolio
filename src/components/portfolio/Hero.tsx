import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

import { heroStats, profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="top" className="grid-backdrop border-b border-border/60 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.3fr_1fr]">
        <div className="reveal">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Open to internships and collaboration
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-base text-primary md:text-lg">{profile.role}</p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              View Projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="/Jagreet_Kumar_Dangi_CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary"
            >
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </a>
            <div className="flex items-center gap-2">
              {[
                { href: profile.github, label: "GitHub", Icon: Github },
                { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-card px-4 py-3">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display text-xl font-bold text-primary md:text-2xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-muted-foreground">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal justify-self-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-2xl border border-primary/30" aria-hidden="true" />
            <img
              src={profile.photo}
              alt="Portrait of Jagreet Kumar Dangi"
              width={420}
              height={420}
              className="relative w-64 rounded-2xl object-cover shadow-glow md:w-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
