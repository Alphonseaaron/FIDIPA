import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import About from '../sections/About';
import Programs from '../sections/Programs';
import Projects from '../sections/Projects';
import Blog from '../sections/Blog';
import Contact from '../sections/Contact';
import HomeHero from '../sections/Home';
import Team from '../sections/Team';

export default function Home() {
  const [visibleSections, setVisibleSections] = useState({
    home: true,
    about: true,
    programs: true,
    projects: true,
    team: true,
    blog: true,
    contact: true
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'site_config', 'sections'), (doc) => {
      if (doc.exists()) {
        setVisibleSections(doc.data() as Record<string, boolean>);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {visibleSections.home && <HomeHero />}
      {visibleSections.about && <About />}
      {visibleSections.programs && <Programs />}
      {visibleSections.projects && <Projects />}
      {visibleSections.team && <Team />}
      {visibleSections.blog && <Blog />}
      {visibleSections.contact && <Contact />}
    </div>
  );
}