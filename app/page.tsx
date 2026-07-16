import Nav from './components/Nav';
import Hero from './components/Hero';
import Services from './components/Services';
import Approach from './components/Approach';
import Work from './components/Work';
import Results from './components/Results';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <div style={{ height: 1, background: '#E8E8E8' }} />
      <Services />
      <Approach />
      <Work />
      <Results />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
