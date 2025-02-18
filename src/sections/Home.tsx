import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Section {
  title: string;
  content: string;
  image_url: string;
}

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchSections();

    // Set up real-time subscription
    const channel = supabase
      .channel('sections-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'sections' },
        () => {
          fetchSections();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sections.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [sections.length]);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  if (sections.length === 0) {
    return null;
  }

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      <div className="relative h-screen">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              zIndex: currentSlide === index ? 1 : 0,
            }}
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: currentSlide === index ? 1 : 1.1 }}
              transition={{ duration: 5 }}
              className="absolute inset-0"
            >
              <img 
                src={section.image_url} 
                alt={section.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
            </motion.div>
          </motion.div>
        ))}

        <div className="relative z-10 h-full flex flex-col justify-center items-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0,
                  y: currentSlide === index ? 0 : 20 
                }}
                transition={{ duration: 0.8 }}
                className="absolute inset-x-0"
                style={{
                  display: currentSlide === index ? 'block' : 'none',
                }}
              >
                <motion.h1 
                  className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {section.title}
                </motion.h1>
                <motion.div
                  className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 }}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-32 flex justify-center space-x-2"
          >
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-primary w-8' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <ChevronDown 
            size={32} 
            className="text-primary animate-bounce cursor-pointer" 
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}