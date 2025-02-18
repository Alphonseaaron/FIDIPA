import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Program = Database['public']['Tables']['programs']['Row'];

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();

    const channel = supabase
      .channel('programs-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'programs' },
        () => {
          fetchPrograms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="programs" className="py-20 relative bg-light dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="programs" className="py-20 relative bg-light dark:bg-dark">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600')] bg-fixed bg-cover bg-center opacity-50 dark:opacity-40" />
      <div className="absolute inset-0 bg-white/80 dark:bg-dark/60 backdrop-blur-[2px]" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Our Programs
          </motion.h2>
          <Link 
            to="/programs"
            className="text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            View All Programs
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-dark-lighter/80 shadow-lg dark:shadow-none backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-xl dark:hover:bg-dark-accent/50 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={program.image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600'} 
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{program.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
                {program.content && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">Key Components:</h4>
                    <div 
                      className="text-sm text-gray-600 dark:text-gray-400 space-y-1"
                      dangerouslySetInnerHTML={{ 
                        __html: program.content
                          .split('\n')
                          .slice(0, 3)
                          .map(line => `
                            <div class="flex items-center">
                              <span class="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                              ${line}
                            </div>
                          `)
                          .join('')
                      }}
                    />
                  </div>
                )}
                <Link 
                  to={`/programs/${program.slug}`}
                  className="text-primary hover:text-primary/80 transition-colors flex items-center"
                >
                  Learn More 
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}