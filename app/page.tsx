import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Background from "./components/Background";
import Classes from "./components/Classes"
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";






export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero
          title="Varad Yogvarga"
          subtitle="Experience the Power of Spiritual Yoga"
        />
        <About />
        <Classes />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}