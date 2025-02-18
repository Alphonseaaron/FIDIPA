import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: "Community Training Initiative",
    description: "Implementing comprehensive training programs and workshops to build capacity within communities.",
    imageUrl: "/image/DSC01363.JPG",
    status: "Ongoing"
  },
  {
    title: "Youth Development Program",
    description: "Supporting youth through education and outdoor activities to build life skills and community engagement.",
    imageUrl: "/image/SAM_0721.JPG",
    status: "Ongoing"
  },
  {
    title: "School Infrastructure Support",
    description: "Improving school facilities and infrastructure to enhance the learning environment for students.",
    imageUrl: "/image/SAM_0724.JPG",
    status: "Ongoing"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Our Projects
          </motion.h2>
          <Link 
            to="/projects"
            className="text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            View All Projects
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-dark shadow-lg dark:shadow-none rounded-lg overflow-hidden hover:shadow-xl dark:hover:bg-dark-accent transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-sm font-medium text-white">
                  {project.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <Link 
                  to={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
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