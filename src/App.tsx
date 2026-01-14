import { useState, useEffect, useCallback, useRef } from 'react';
import SectionBar from './components/SectionBar';
import IntroSection from './sections/IntroSection';
import AboutSection from './sections/AboutSection';
import WorkSection from './sections/WorkSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import type { Section, SectionId } from './types';

const sections: Section[] = [
  { id: 'intro', label: 'Intro', component: IntroSection },
  { id: 'about', label: 'About', component: AboutSection },
  { id: 'work', label: 'Work', component: WorkSection },
  { id: 'projects', label: 'Projects', component: ProjectsSection },
  { id: 'contact', label: 'Contact', component: ContactSection },
];

const SCROLL_COOLDOWN = 800; // Cooldown between section changes
const EDGE_THRESHOLD = 10; // Pixels from edge to consider "at edge"
const WHEEL_THRESHOLD = 200; // Accumulated wheel delta needed to trigger transition

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('intro');
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollCooldownRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);

  const handleSectionChange = useCallback((sectionId: SectionId) => {
    if (isAnimating || sectionId === activeSection) return;

    setIsAnimating(true);
    setActiveSection(sectionId);

    // Set scroll cooldown and kill momentum
    scrollCooldownRef.current = true;
    wheelAccumulatorRef.current = 0;

    // Reset scroll position of current panel to kill momentum
    const contentPanel = document.querySelector('[data-content-panel="true"]') as HTMLElement;
    if (contentPanel) {
      contentPanel.scrollTop = 0;
    }

    setTimeout(() => {
      scrollCooldownRef.current = false;
      wheelAccumulatorRef.current = 0;
    }, SCROLL_COOLDOWN);

    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, activeSection]);

  // Handle navigation to next/prev section
  const navigateSection = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating || scrollCooldownRef.current) return false;

    const currentIndex = sections.findIndex(s => s.id === activeSection);

    if (direction === 'next' && currentIndex < sections.length - 1) {
      handleSectionChange(sections[currentIndex + 1].id);
      return true;
    } else if (direction === 'prev' && currentIndex > 0) {
      handleSectionChange(sections[currentIndex - 1].id);
      return true;
    }
    return false;
  }, [activeSection, isAnimating, handleSectionChange]);

  // Wheel event handler for all scrolling (works even without scrollbar)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating || scrollCooldownRef.current) return;

      const contentPanel = document.querySelector('[data-content-panel="true"]') as HTMLElement;
      if (!contentPanel) return;

      const { scrollTop, scrollHeight, clientHeight } = contentPanel;
      const hasScrollbar = scrollHeight > clientHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - EDGE_THRESHOLD;
      const isAtTop = scrollTop <= EDGE_THRESHOLD;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // If no scrollbar, use wheel directly to navigate
      if (!hasScrollbar) {
        wheelAccumulatorRef.current += e.deltaY;

        if (wheelAccumulatorRef.current > WHEEL_THRESHOLD) {
          if (navigateSection('next')) {
            e.preventDefault();
          }
        } else if (wheelAccumulatorRef.current < -WHEEL_THRESHOLD) {
          if (navigateSection('prev')) {
            e.preventDefault();
          }
        }
        return;
      }

      // If has scrollbar, only navigate when truly at edge and continuing to scroll
      if (isAtBottom && scrollingDown) {
        // User is at bottom and still scrolling down - accumulate
        wheelAccumulatorRef.current += e.deltaY;
        if (wheelAccumulatorRef.current > WHEEL_THRESHOLD) {
          navigateSection('next');
        }
      } else if (isAtTop && scrollingUp) {
        // User is at top and still scrolling up - accumulate
        wheelAccumulatorRef.current += e.deltaY;
        if (wheelAccumulatorRef.current < -WHEEL_THRESHOLD) {
          navigateSection('prev');
        }
      } else {
        // Not at edge or scrolling in opposite direction - reset accumulator
        wheelAccumulatorRef.current = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, isAnimating, navigateSection]);

  // Reset wheel accumulator when section changes
  useEffect(() => {
    wheelAccumulatorRef.current = 0;
  }, [activeSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;

      const currentIndex = sections.findIndex(s => s.id === activeSection);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sections.length;
        handleSectionChange(sections[nextIndex].id);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        handleSectionChange(sections[prevIndex].id);
      } else if (e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        if (sections[index]) {
          handleSectionChange(sections[index].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isAnimating, handleSectionChange]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-surface-50">
      {/* Main container */}
      <div className="flex h-full relative">
        {sections.map((section, index) => {
          const SectionComponent = section.component;
          const isActive = activeSection === section.id;

          return (
            <SectionBar
              key={section.id}
              id={section.id}
              label={section.label}
              index={index + 1}
              isActive={isActive}
              onClick={handleSectionChange}
            >
              {isActive && (
                section.id === 'intro'
                  ? <SectionComponent onNavigate={handleSectionChange} />
                  : <SectionComponent />
              )}
            </SectionBar>
          );
        })}
      </div>
    </div>
  );
}
