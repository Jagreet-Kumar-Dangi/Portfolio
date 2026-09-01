import { ExternalLink, Github, Mail, MapPin, Phone, Award, Users, Linkedin, Download } from "lucide-react";

import { Card, Section } from "./Section";
import {
  achievements,
  certifications,
  education,
  profile,
  project,
  skillGroups,
  softSkills,
  training,
} from "@/data/portfolio";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Building, learning, and solving daily">
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <Card>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            I am a Bachelor of Technology student in Computer Science and Engineering at Lovely
            Professional University, currently holding a CGPA of 9.33. My work centres on software
            development with React and TypeScript, alongside a steady practice of data structures and
            algorithms — over 150 problems solved on LeetCode and a coding streak of more than 70 days.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            I am also building foundations in artificial intelligence through Oracle's Generative AI
            and Agentic AI certifications, and I enjoy turning ideas into deployed, responsive
            products such as CineAura.
          </p>
        </Card>
        <Card>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Soft Skills
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Technical toolkit">
      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <Card key={group.title}>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="What I have shipped">
      <Card className="md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold md:text-2xl">{project.name}</h3>
            <p className="mt-1 text-sm text-primary">{project.subtitle}</p>
          </div>
          <span className="text-xs text-muted-foreground">{project.date}</span>
        </div>

        <ul className="mt-6 space-y-3">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs text-primary"
            >
              {tech}
            </li>
          ))}
        </ul>

        {(project.repoUrl || project.liveUrl) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-primary"
              >
                <Github className="size-4" aria-hidden="true" /> GitHub Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <ExternalLink className="size-4" aria-hidden="true" /> Live Demo
              </a>
            )}
          </div>
        )}
      </Card>
    </Section>
  );
}

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Problem Solving"
      title="Achievements in numbers"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item) => (
          <a
            key={item.title}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="block cursor-pointer transition-transform duration-300 hover:-translate-y-1"
          >
            <Card>
              <p className="font-display text-3xl font-bold text-primary">
                {item.value}
              </p>

              <h3 className="mt-3 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </Card>
          </a>
        ))}
      </div>
    </Section>
  );
}

export function Certifications() {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Verified credentials">
      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((cert) => (
          <Card key={cert.name}>
            <Award className="size-5 text-primary" aria-hidden="true" />
            <h3 className="mt-4 text-sm font-semibold leading-snug">{cert.name}</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              {cert.issuer} · {cert.date}
            </p>
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                Verify <ExternalLink className="size-3" aria-hidden="true" />
              </a>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function Training() {
  return (
    <Section id="training" eyebrow="Training & Leadership" title="Community involvement">
      <Card className="md:p-8">
        <Users className="size-5 text-primary" aria-hidden="true" />
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">{training.title}</h3>
            <p className="mt-1 text-sm text-primary">{training.organization}</p>
          </div>
          <span className="text-xs text-muted-foreground">{training.date}</span>
        </div>
        <ul className="mt-6 space-y-3">
          {training.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>
        {training.url && (
          <a
            href={training.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            View details <ExternalLink className="size-3" aria-hidden="true" />
          </a>
        )}
      </Card>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic background">
      <ol className="relative space-y-5 border-l border-border pl-6">
        {education.map((item) => (
          <li key={item.school} className="relative">
            <span
              className="absolute -left-[31px] top-6 size-2.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            <Card>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-bold">{item.school}</h3>
                <span className="text-xs text-muted-foreground">{item.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{item.degree}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" /> {item.location}
                </span>
                <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-medium text-primary">
                  {item.score}
                </span>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Contact() {
  const links = [
    { label: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    { label: "linkedin.com/in/jagreet-kumar-dangi", href: profile.linkedin, Icon: Linkedin },
    { label: "github.com/Jagreet-Kumar-Dangi", href: profile.github, Icon: Github },
    { label: profile.phone, href: `tel:${profile.phone}`, Icon: Phone },
  ];

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something together">
      <Card className="md:p-8">
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          I am open to internships and collaboration on software development and AI projects. The
          fastest way to reach me is email or LinkedIn.
        </p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {links.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.cv}
          download
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Download className="size-4" aria-hidden="true" /> Download CV
        </a>
      </Card>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Jagreet Kumar Dangi</p>
        <p>Built with React, TypeScript and Tailwind CSS</p>
      </div>
    </footer>
  );
}
