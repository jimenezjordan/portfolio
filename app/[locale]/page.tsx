import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import ProjectsGrid from '@/components/home/ProjectsGrid';
import StackSection from '@/components/home/StackSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsGrid />
      <StackSection />
    </>
  );
}