import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Feedback } from "@/components/sections/Feedback";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Blog } from "@/components/sections/Blog";
import { Marquee } from "@/components/sections/Marquee";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Clients />
        <About />
        <Projects />
        <Services />
        <Feedback />
        <Pricing />
        <Faq />
        {/* Blog is optional — remove this line and the import to drop it. */}
        <Blog />
        <Marquee />
      </main>
      <Footer />
    </>
  );
}
