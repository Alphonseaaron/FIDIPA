import React from 'react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const programs = [
  {
    title: "Gender Equality and Social Inclusion",
    description: "Empowering communities to address gender inequality and social inclusion through training community paralegals, youth, and women as community resource persons.",
    image: "/image/DSC05379.JPG",
    subPrograms: [
      {
        name: "Women with Disability (WWD)",
        description: "Supporting and empowering women with disabilities to overcome challenges and achieve economic independence."
      },
      {
        name: "Women in and out of prisons",
        description: "Providing support and rehabilitation services for women affected by the justice system."
      },
      {
        name: "Young Widows Support",
        description: "Protecting and empowering young widows against cultural practices and economic challenges."
      },
      {
        name: "Girls Education and Mentorship",
        description: "Reducing teenage pregnancy and school dropout rates while improving education standards."
      },
      {
        name: "Women in Leadership",
        description: "Promoting women's participation in leadership, politics, and environmental positions."
      }
    ]
  },
  {
    title: "Grandmothers and Orphans Support",
    description: "Supporting grandmothers caring for orphans and vulnerable children (OVC) through health, nutrition, and economic empowerment initiatives.",
    image: "/image/SAM_1418.JPG",
    subPrograms: [
      {
        name: "Health Support",
        description: "Providing healthcare access and support for affected families."
      },
      {
        name: "Nutrition Programs",
        description: "Ensuring proper nutrition for vulnerable children and their caregivers."
      },
      {
        name: "Economic Empowerment",
        description: "Creating sustainable income opportunities for grandmother-led households."
      },
      {
        name: "Education Support",
        description: "Facilitating access to education for orphans and vulnerable children."
      }
    ]
  },
  {
    title: "Environment and Food Security",
    description: "Implementing sustainable farming methods and conservation agriculture to increase yields and promote drought-resistant crops.",
    image: "/image/kamulu dalawa 028.jpg",
    subPrograms: [
      {
        name: "Sustainable Land Management",
        description: "Promoting environmentally friendly farming practices and soil conservation."
      },
      {
        name: "Income Generation",
        description: "Creating sustainable income sources through agricultural activities."
      },
      {
        name: "Natural Resource Management",
        description: "Training communities in sustainable use of natural resources."
      },
      {
        name: "Climate Resilience",
        description: "Building community resilience against climate change impacts."
      }
    ]
  },
  {
    title: "Agriculture and Technology",
    description: "Enhancing technology adoption and promoting youth technical entrepreneurship in agriculture and infrastructure development.",
    image: "/image/SAM_0721.JPG",
    subPrograms: [
      {
        name: "Digital Agriculture",
        description: "Introducing modern farming technologies and digital solutions."
      },
      {
        name: "Smart Farming",
        description: "Training in advanced agricultural techniques and technologies."
      },
      {
        name: "Youth Empowerment",
        description: "Supporting youth participation in agricultural entrepreneurship."
      },
      {
        name: "Technical Training",
        description: "Providing technical skills for agricultural modernization."
      }
    ]
  },
  {
    title: "Soft Skills Training",
    description: "Supporting TVET and NITA graduates through business skills development, entrepreneurship training, and leadership development.",
    image: "/image/SAM_0724.JPG",
    subPrograms: [
      {
        name: "Business Start-up Skills",
        description: "Training in essential business development and management skills."
      },
      {
        name: "Entrepreneurial Mindset",
        description: "Developing entrepreneurial thinking and opportunity recognition."
      },
      {
        name: "Creative Thinking",
        description: "Fostering innovation and problem-solving abilities."
      },
      {
        name: "Visionary Leadership",
        description: "Building leadership capabilities for community development."
      }
    ]
  }
];

export default function Programs() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-light dark:bg-dark">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
        >
          Our Programs
        </motion.h1>
        
        <div className="space-y-12">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-lg dark:shadow-none"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{program.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{program.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {program.subPrograms.map((subProgram, idx) => (
                      <div 
                        key={idx}
                        className="bg-light-darker dark:bg-dark p-4 rounded-lg"
                      >
                        <h3 className="text-lg font-semibold mb-2 text-primary">
                          {subProgram.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {subProgram.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}