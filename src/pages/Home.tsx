import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
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
    const fetchSiteConfig = async () => {
      const { data } = await supabase
        .from('site_config')
        .select('sections')
        .single();
      
      if (data?.sections) {
        setVisibleSections(data.sections);
      }
    };

    fetchSiteConfig();
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