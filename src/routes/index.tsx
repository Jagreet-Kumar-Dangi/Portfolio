import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/portfolio/Hero";
import { Nav } from "@/components/portfolio/Nav";
import {
  About,
  Achievements,
  Certifications,
  Contact,
  Education,
  Footer,
  Projects,
  Skills,
  Training,
} from "@/components/portfolio/Sections";

const title = "Jagreet Kumar Dangi — CSE Student & Software Developer";
const description =
  "Portfolio of Jagreet Kumar Dangi, B.Tech CSE student at Lovely Professional University (CGPA 9.33): React and TypeScript projects, 150+ LeetCode problems, Oracle AI certifications.";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jagreet Kumar Dangi",
  email: "mailto:jagreetgangi2007@gmail.com",
  telephone: "6204085054",
  jobTitle: "Computer Science and Engineering Student",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Lovely Professional University" },
    { "@type": "HighSchool", name: "Cambrian Public School" },
    { "@type": "HighSchool", name: "Guru Gobind Singh Public School" },
  ],
  knowsAbout: [
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "React",
    "TypeScript",
    "Firebase",
    "Supabase",
    "MySQL",
    "Data Structures and Algorithms",
  ],
  sameAs: [
    "https://github.com/Jagreet-Kumar-Dangi",
    "https://linkedin.com/in/jagreet-kumar-dangi",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(personJsonLd) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <Training />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
