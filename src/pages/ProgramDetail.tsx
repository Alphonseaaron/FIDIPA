import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

export default function ProgramDetail() {
  const { slug } = useParams();

  const program = {
    title: "Gender Equality and Social Inclusion",
    description: "Empowering communities to address gender inequality and social inclusion through training community paralegals, youth, and women as community resource persons.",
    image: "/src/assets/images/DSC05379.JPG",
    content: `Our Gender Equality and Social Inclusion program is dedicated to promoting equal opportunities and social justice through comprehensive community-based initiatives.

    Through this program, we work closely with local communities to:
    • Train community paralegals to provide legal support
    • Empower youth and women as community resource persons
    • Address systemic barriers to inclusion
    • Promote gender-responsive development

    Our approach focuses on sustainable, community-led solutions that create lasting positive change.`,
    objectives: [
      "Train and support community paralegals",
      "Empower women and youth as leaders",
      "Promote inclusive development",
      "Address gender-based discrimination"
    ],
    impact: {
      beneficiaries: "5,000+",
      communities: "20",
      successRate: "90%"
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <BackButton />
      <div className="max-w-4xl mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="rounded-lg overflow-hidden h-[400px]">
            <img 
              src={program.image} 
              alt={program.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <h1 className="text-4xl font-bold">{program.title}</h1>
            
            <div className="prose prose-invert max-w-none">
              {program.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Key Objectives</h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {program.objectives.map((objective, index) => (
                  <li 
                    key={index}
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Program Impact</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-dark-lighter p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {program.impact.beneficiaries}
                  </div>
                  <div className="text-gray-300">People Reached</div>
                </div>
                <div className="bg-dark-lighter p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {program.impact.communities}
                  </div>
                  <div className="text-gray-300">Communities Served</div>
                </div>
                <div className="bg-dark-lighter p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {program.impact.successRate}
                  </div>
                  <div className="text-gray-300">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}