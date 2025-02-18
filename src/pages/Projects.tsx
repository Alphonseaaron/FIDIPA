import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

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
  },
  {
    title: "Water Access Program",
    description: "Improving access to clean water through infrastructure development and community management.",
    imageUrl: "/image/SAM_1409.JPG",
    status: "Ongoing"
  },
  {
    title: "Agricultural Skills Development",
    description: "Training students and community members in sustainable agricultural practices.",
    imageUrl: "/image/kamulu dalawa 028.jpg",
    status: "Ongoing"
  }
];

export default function Projects() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-light dark:bg-dark">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
        >
          Our Projects
        </motion.h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-lg hover:shadow-xl dark:shadow-none transform transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-sm font-medium text-white">
                  {project.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
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
    </div>
  );
}