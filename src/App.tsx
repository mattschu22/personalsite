import { useCallback, useEffect, useRef, useState } from 'react';
import SectionBar from './components/SectionBar';
import IntroSection from './sections/IntroSection';
import WorkSection from './sections/WorkSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import type { Section, SectionId } from './types';

const sections: Section[] = [
  { id: 'intro', label: 'Paxos', component: IntroSection },
  { id: 'projects', label: 'Projects', component: ProjectsSection },
  { id: 'work', label: 'Work', component: WorkSection },
  { id: 'contact', label: 'About', component: ContactSection },
];

const SCROLL_COOLDOWN = 650;
const EDGE_THRESHOLD = 10;
const WHEEL_THRESHOLD = 180;

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('intro');
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollCooldownRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);

  const handleSectionChange = useCallback((sectionId: SectionId) => {
    if (isAnimating || sectionId === activeSection) return;

    setIsAnimating(true);
    setActiveSection(sectionId);
    scrollCooldownRef.current = true;
    wheelAccumulatorRef.current = 0;

    window.setTimeout(() => {
      scrollCooldownRef.current = false;
      wheelAccumulatorRef.current = 0;
    }, SCROLL_COOLDOWN);
    window.setTimeout(() => setIsAnimating(false), 600);
  }, [activeSection, isAnimating]);

  const navigateSection = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating || scrollCooldownRef.current) return false;
    const currentIndex = sections.findIndex((section) => section.id === activeSection);
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (!sections[nextIndex]) return false;
    handleSectionChange(sections[nextIndex].id);
    return true;
  }, [activeSection, handleSectionChange, isAnimating]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (window.innerWidth < 768 || isAnimating || scrollCooldownRef.current) return;
      const panel = document.querySelector('#desktop-layout [data-content-panel="true"]') as HTMLElement | null;
      if (!panel) return;

      const hasVerticalScroll = panel.scrollHeight > panel.clientHeight;
      const atTop = panel.scrollTop <= EDGE_THRESHOLD;
      const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - EDGE_THRESHOLD;
      const canChangeSection = !hasVerticalScroll || (event.deltaY > 0 ? atBottom : atTop);

      if (!canChangeSection) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      wheelAccumulatorRef.current += event.deltaY;
      if (wheelAccumulatorRef.current > WHEEL_THRESHOLD && navigateSection('next')) event.preventDefault();
      if (wheelAccumulatorRef.current < -WHEEL_THRESHOLD && navigateSection('prev')) event.preventDefault();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isAnimating, navigateSection]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnimating) return;
      const currentIndex = sections.findIndex((section) => section.id === activeSection);

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleSectionChange(sections[(currentIndex + 1) % sections.length].id);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handleSectionChange(sections[(currentIndex - 1 + sections.length) % sections.length].id);
      } else if (event.key >= '1' && event.key <= '4') {
        event.preventDefault();
        const section = sections[Number(event.key) - 1];
        if (section) handleSectionChange(section.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, handleSectionChange, isAnimating]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-surface-50">
      <div className="md:hidden h-full overflow-y-auto scroll-smooth">
        {sections.map((section) => {
          const SectionComponent = section.component;
          return (
            <section key={section.id} id={`mobile-${section.id}`} className="min-h-screen">
              {section.id === 'intro'
                ? <SectionComponent onNavigate={(id: SectionId) => document.getElementById(`mobile-${id}`)?.scrollIntoView({ behavior: 'smooth' })} />
                : <SectionComponent />}
            </section>
          );
        })}
      </div>

      <div id="desktop-layout" className="hidden md:flex h-full relative">
        {sections.map((section, index) => {
          const SectionComponent = section.component;
          const isActive = activeSection === section.id;
          return (
            <SectionBar key={section.id} id={section.id} label={section.label} index={index + 1} isActive={isActive} onClick={handleSectionChange}>
              {isActive && (section.id === 'intro' ? <SectionComponent onNavigate={handleSectionChange} /> : <SectionComponent />)}
            </SectionBar>
          );
        })}
      </div>
    </div>
  );
}
