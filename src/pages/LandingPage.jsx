import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import PopularDestinations from "../components/landing/PopularDestinations";
import Stats from "../components/landing/Stats";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";
import BackToTop from "../components/common/BackToTop";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <PopularDestinations />
        <Stats />
        <CTA />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default LandingPage;
