import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function About() {
  const [showMore, setShowMore] = useState(false);

  const content = [
    {
      title: "Our Vision",
      description: "A holistic peaceful and democratic society with justice for all.",
      icon: "👁️"
    },
    {
      title: "Our Mission",
      description: "To see the rural and urban poor populations challenge oppressive structures, access justice, and play a central role in gender equity, peace-making, good governance, economic justice, food security, adequate water, Environment, and enhanced livelihood.",
      icon: "🎯"
    },
    {
      title: "Our Values",
      description: "Integrity and Honesty, Commitment and Human Rights, Equality and Equity, Transparency and accountability, efficiency and effectiveness, professionalism and networking",
      icon: "⭐"
    }
  ];

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-light-darker via-light to-light-darker dark:from-dark-lighter dark:via-dark dark:to-dark-lighter min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">About Us</h2>
          <div className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            <p className="mb-4">
              Friendly Integrated Development Initiative in Poverty Alleviation (FIDIPA) 
              is a Non-Governmental Organization (NGO) registered in Kenya in 2007. FIDIPA has a highly qualified
              advisory board charged with the responsibility of formulation and review of the policy
              framework executed by the management committee.
            </p>
            
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: showMore ? 1 : 0, height: showMore ? "auto" : 0 }}
              className="overflow-hidden"
            >
              <p className="mb-4">
                FIDIPA was formed in response to the impact of HIV AIDS on Children, Women, and Youth. It
                is focused on gender equity, equality, and access to social-economic justice for both urban
                poor and rural communities.
              </p>
              <p className="mb-4">
                FIDIPA's work is grounded in a Human Rights Based Approach (HRBA) and centered on a 
                participatory model focused on the empowerment of women and girls to claim their rights. 
                It collaborates with other Civil Society Organizations both Faith-based and Community-Based 
                Organizations (CBOs) towards capacity building of groups and agencies that are committed to 
                improving the livelihood of both urban poor and rural poor.
              </p>
              <p className="mb-4">
                <strong>Scope of Authority:</strong><br />
                FIDIPA is a grassroots organization designed to foster unity, effective participation, and
                cooperation with urban and rural poor populations committed to gender-responsive
                development initiatives for socio-economic growth and sustainable development. The
                organization collaborates with Faith-Based Organizations, local NGOs, Community-Based
                Organizations (CBOs), and individuals in realizing their corporate goals in a respectful,
                responsible, and pleasurable expression of humanity, especially women's Rights.
              </p>
            </motion.div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center justify-center space-x-2 mx-auto mt-4 text-primary hover:text-primary/80 transition-colors"
            >
              <span>{showMore ? "Show Less" : "Read More"}</span>
              {showMore ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {content.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-dark-lighter/50 shadow-lg dark:shadow-none backdrop-blur-sm p-8 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary/30 transition-colors group"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="text-4xl mb-4"
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "18+", label: "Years Experience" },
            { number: "100+", label: "Projects Completed" },
            { number: "200K+", label: "Lives Impacted" },
            { number: "50+", label: "Community Partners" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg shadow-lg dark:shadow-none"
            >
              <h4 className="text-3xl font-bold text-primary mb-2">{stat.number}</h4>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}