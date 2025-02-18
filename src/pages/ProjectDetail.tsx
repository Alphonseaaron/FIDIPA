import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const projects = {
  'community-training-initiative': {
    title: "Community Training Initiative",
    description: "Implementing comprehensive training programs and workshops to build capacity within communities.",
    imageUrl: "/src/assets/images/DSC01363.JPG",
    status: "Ongoing",
    timeline: {
      start: "January 2024",
      end: "December 2024"
    },
    objectives: [
      "Enhance community leadership skills",
      "Promote sustainable development practices",
      "Build local capacity for project management",
      "Establish long-term community development frameworks"
    ],
    impact: {
      beneficiaries: "1,000+",
      communities: "15",
      workshops: "25",
      trainedLeaders: "100"
    },
    achievements: [
      "Conducted 25 leadership workshops",
      "Trained 100 community leaders",
      "Implemented 15 community projects",
      "Established 5 sustainable programs"
    ]
  },
  'youth-development-program': {
    title: "Youth Development Program",
    description: "Supporting youth through education and outdoor activities to build life skills and community engagement.",
    imageUrl: "/src/assets/images/SAM_0721.JPG",
    status: "Ongoing",
    timeline: {
      start: "March 2024",
      end: "February 2025"
    },
    objectives: [
      "Develop youth leadership capabilities",
      "Promote educational excellence",
      "Foster community engagement",
      "Build practical life skills"
    ],
    impact: {
      beneficiaries: "500+",
      communities: "10",
      workshops: "20",
      trainedLeaders: "50"
    },
    achievements: [
      "Established 5 youth centers",
      "Created 10 youth-led initiatives",
      "Organized 20 skill-building workshops",
      "Launched 3 mentorship programs"
    ]
  },
  'school-infrastructure-support': {
    title: "School Infrastructure Support",
    description: "Improving school facilities and infrastructure to enhance the learning environment for students.",
    imageUrl: "/src/assets/images/SAM_0724.JPG",
    status: "Ongoing",
    timeline: {
      start: "February 2024",
      end: "January 2025"
    },
    objectives: [
      "Upgrade classroom facilities",
      "Improve sanitation infrastructure",
      "Enhance learning resources",
      "Create safe learning spaces"
    ],
    impact: {
      beneficiaries: "2,000+",
      schools: "10",
      classrooms: "30",
      facilities: "15"
    },
    achievements: [
      "Renovated 30 classrooms",
      "Built 15 sanitation facilities",
      "Installed 5 computer labs",
      "Created 8 school libraries"
    ]
  },
  'water-access-program': {
    title: "Water Access Program",
    description: "Improving access to clean water through infrastructure development and community management.",
    imageUrl: "/src/assets/images/SAM_1409.JPG",
    status: "Ongoing",
    timeline: {
      start: "April 2024",
      end: "March 2025"
    },
    objectives: [
      "Develop water infrastructure",
      "Implement water management systems",
      "Train community water committees",
      "Ensure sustainable water access"
    ],
    impact: {
      beneficiaries: "5,000+",
      communities: "12",
      waterPoints: "20",
      committees: "12"
    },
    achievements: [
      "Installed 20 water points",
      "Trained 12 water committees",
      "Implemented 5 rainwater harvesting systems",
      "Established 12 maintenance programs"
    ]
  },
  'agricultural-skills-development': {
    title: "Agricultural Skills Development",
    description: "Training students and community members in sustainable agricultural practices.",
    imageUrl: "/src/assets/images/kamulu dalawa 028.jpg",
    status: "Ongoing",
    timeline: {
      start: "May 2024",
      end: "April 2025"
    },
    objectives: [
      "Train in sustainable farming",
      "Implement demonstration farms",
      "Develop agricultural skills",
      "Promote food security"
    ],
    impact: {
      beneficiaries: "800+",
      communities: "8",
      farms: "15",
      trainings: "30"
    },
    achievements: [
      "Established 15 demonstration farms",
      "Trained 200 farmers",
      "Implemented 10 irrigation systems",
      "Created 5 farmer cooperatives"
    ]
  }
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects[slug as keyof typeof projects];

  if (!project) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <BackButton />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="rounded-lg overflow-hidden h-[400px] relative">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-primary px-4 py-2 rounded-full text-sm font-medium text-white">
              {project.status}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{project.title}</h1>
              <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
                <span>Start: {project.timeline.start}</span>
                <span>•</span>
                <span>End: {project.timeline.end}</span>
              </div>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Project Objectives</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.objectives.map((objective, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-dark-lighter p-4 rounded-lg flex items-center space-x-3 shadow-sm"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Project Impact</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {Object.entries(project.impact).map(([key, value]) => (
                  <div key={key} className="bg-white dark:bg-dark-lighter p-6 rounded-lg text-center shadow-sm">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Key Achievements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-dark-lighter p-4 rounded-lg flex items-center space-x-3 shadow-sm"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}