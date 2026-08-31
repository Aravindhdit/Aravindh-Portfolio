import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Resume from "../components/Resume";
import Certifications from "../components/Certifications";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import SocialLinks from "../components/SocialLinks";
import CredentialCTA from "../components/CredentialCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Resume />
        <Certifications />
        <Skills />
        <Projects />
        <Contact />
        <SocialLinks />
        <CredentialCTA />
      </main>
      <Footer />
    </div>
  );
}
