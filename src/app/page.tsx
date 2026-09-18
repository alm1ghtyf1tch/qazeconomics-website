import { About } from "./_components/about";
import { Articles } from "./_components/articles";
import { Events } from "./_components/events";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { StudentOfferings } from "./_components/student-offerings";
import { Volunteer } from "./_components/volunteer";

export default function Home() {
  return (
    <div className="min-h-dvh bg-white text-[var(--ink)]">
      <Header />
      <main id="main-content" className="scroll-mt-20">
        <Hero />
        <Articles />
        <Events />
        <StudentOfferings />
        <About />
        <Volunteer />
      </main>
      <Footer />
    </div>
  );
}
