import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const programs = [
  {
    title: "Gender Equality and Social Inclusion",
    description: "Empowering communities to address gender inequality and social inclusion through training community paralegals, youth, and women as community resource persons.",
    image: "/image/DSC05379.JPG",
    subPrograms: [
      "Women with Disability (WWD)",
      "Women in and out of prisons",
      "Young Widows Support",
      "Girls Education and Mentorship",
      "Women in Leadership"
    ]
  },
  {
    title: "Grandmothers and Orphans Support",
    description: "Supporting grandmothers caring for orphans and vulnerable children (OVC) through health, nutrition, and economic empowerment initiatives.",
    image: "/image/SAM_1418.JPG",
    subPrograms: [
      "Health Support",
      "Nutrition Programs",
      "Economic Empowerment",
      "Education Support"
    ]
  },
  {
    title: "Environment and Food Security",
    description: "Implementing sustainable farming methods and conservation agriculture to increase yields and promote drought-resistant crops.",
    image: "/image/kamulu dalawa 028.jpg",
    subPrograms: [
      "Sustainable Land Management",
      "Income Generation",
      "Natural Resource Management",
      "Climate Resilience"
    ]
  }
];

export default function Programs() {
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
          {programs.slice(0, 3).map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-dark-lighter/80 shadow-lg dark:shadow-none backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-xl dark:hover:bg-dark-accent/50 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{program.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">Key Components:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {program.subPrograms.slice(0, 3).map((sub, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link 
                  to={`/programs/${program.title.toLowerCase().replace(/\s+/g, '-')}`}
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