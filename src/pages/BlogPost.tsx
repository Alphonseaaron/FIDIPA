import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const blogPosts = {
  'empowering-communities-through-sustainable-development': {
    title: "Empowering Communities Through Sustainable Development",
    description: "Our sustainable development initiatives are transforming rural communities...",
    content: `Our sustainable development initiatives are transforming rural communities through innovative approaches to poverty alleviation, environmental conservation, and economic empowerment. By implementing participatory development strategies and building local capacity, we're creating lasting positive change that benefits entire communities.

    Program Components:

    • Sustainable Agriculture
      - Introducing climate-smart farming techniques
      - Implementing drought-resistant crops
      - Developing sustainable irrigation systems
      - Training in modern farming methods

    • Renewable Energy
      - Implementing solar power solutions for homes
      - Installing community facility power systems
      - Training in system maintenance
      - Creating sustainable energy programs

    • Water Management
      - Developing sustainable water sources
      - Building irrigation systems
      - Training in water conservation
      - Implementing water quality monitoring

    • Economic Empowerment
      - Creating village savings groups
      - Supporting micro-enterprise development
      - Providing business skills training
      - Facilitating market access
    
    Impact and Achievements:

    • Agricultural Development
      - Increased crop yields by 40%
      - Introduced 5 new drought-resistant crops
      - Established 10 demonstration farms
      - Trained 200+ farmers in modern techniques

    • Energy Access
      - Provided clean energy to 500+ households
      - Installed 20 community solar systems
      - Reduced energy costs by 60%
      - Created 15 energy maintenance jobs

    • Water Infrastructure
      - Established 20 community water points
      - Improved water access for 1000+ families
      - Reduced water collection time by 70%
      - Trained 30 water management committees
    
    Community Engagement:
    Our approach emphasizes community ownership and participation at every stage:

    • Project Planning
      - Community needs assessment
      - Stakeholder consultations
      - Resource mapping
      - Implementation strategy development

    • Implementation
      - Local leadership involvement
      - Community volunteer programs
      - Skills transfer initiatives
      - Regular progress monitoring

    • Resource Management
      - Community-led maintenance
      - Local resource mobilization
      - Sustainable funding mechanisms
      - Environmental conservation
    
    Future Directions:

    • Technology Integration
      - Digital farming solutions
      - Smart water management systems
      - Remote monitoring capabilities
      - Data-driven decision making

    • Climate Adaptation
      - Weather monitoring systems
      - Resilient farming methods
      - Water conservation techniques
      - Environmental protection

    • Market Development
      - Value chain improvements
      - Market access programs
      - Product diversification
      - Quality control systems

    Through these comprehensive efforts, we're building resilient communities that can sustainably manage their resources and continue developing long after our initial intervention.`,
    author: "Jayne Wasonga",
    date: "2024-02-15",
    imageUrl: "/image/DSC05379.JPG"
  },
  'the-impact-of-gender-equality-programs': {
    title: "The Impact of Gender Equality Programs",
    content: `Our gender equality initiatives have demonstrated remarkable success in transforming communities and individual lives through targeted interventions and comprehensive support systems. These programs are creating lasting change by addressing systemic barriers and empowering women to take leadership roles in their communities.

    Program Components:

    • Women's Economic Empowerment
      - Business development training
      - Financial literacy education
      - Access to credit facilities
      - Market linkage support

    • Leadership Development
      - Community leadership training
      - Public speaking workshops
      - Decision-making skills
      - Advocacy techniques
    
    • Education Access
      - Scholarship programs
      - Mentorship initiatives
      - Skills development
      - Career guidance

    • Healthcare Initiatives
      - Reproductive health services
      - Mental health support
      - Nutrition programs
      - Health education
    
    Key Achievements:

    • Business Development
      - Established 25 women-led businesses
      - Created 3 women's cooperatives
      - Facilitated $50,000 in micro-loans
      - Achieved 90% business survival rate

    • Leadership Impact
      - Trained 100+ women leaders
      - Increased women's representation by 40%
      - Established 15 women's groups
      - Created 10 mentorship programs

    • Education Outcomes
      - Increased girls' enrollment by 35%
      - Reduced dropout rates by 50%
      - Supported 200 scholarships
      - Established 5 learning centers
    
    Success Stories:

    • Mary's Journey
      - From small-scale farmer to cooperative leader
      - Manages 50+ member organization
      - Increased household income by 300%
      - Mentors 15 other women

    • Sarah's Achievement
      - Elected to local government
      - Implements community projects
      - Advocates for women's rights
      - Influences policy changes

    • Women's Savings Group
      - 100+ active members
      - $25,000 in savings
      - 75 successful loans
      - 20 new businesses started
    
    Community Impact:

    • Economic Growth
      - Increased household incomes
      - New business development
      - Job creation
      - Market expansion

    • Social Progress
      - Improved gender relations
      - Reduced discrimination
      - Enhanced community cohesion
      - Greater women's participation

    • Health Outcomes
      - Better family health
      - Improved nutrition
      - Increased healthcare access
      - Enhanced well-being
    
    Looking Forward:

    • Program Expansion
      - Reaching remote areas
      - Scaling successful models
      - Introducing new initiatives
      - Building partnerships

    • Capacity Building
      - Advanced training programs
      - Leadership development
      - Technical skills enhancement
      - Professional development

    • Policy Advocacy
      - Gender-responsive policies
      - Legal framework improvement
      - Institutional strengthening
      - Rights protection

    • Sustainability
      - Resource mobilization
      - Local ownership
      - System strengthening
      - Impact measurement`,
    author: "Jayne Wasonga",
    date: "2024-02-10",
    imageUrl: "/image/SAM_0790.JPG"
  },
  'innovation-in-rural-healthcare-delivery': {
    title: "Innovation in Rural Healthcare Delivery",
    content: `We're revolutionizing healthcare delivery in remote and underserved areas through innovative approaches and community partnerships. Our integrated healthcare solutions are bringing essential medical services to previously unreached populations while building sustainable local capacity.

    Healthcare Innovations:

    • Mobile Health Clinics
      - Regular community visits
      - Essential health services
      - Preventive care programs
      - Emergency response capability

    • Telemedicine Solutions
      - Remote consultations
      - Specialist access
      - Digital health records
      - Real-time monitoring

    • Community Health Workers
      - Local capacity building
      - Health education
      - Basic care provision
      - Community outreach

    • Digital Health Systems
      - Patient tracking
      - Health data management
      - Resource optimization
      - Quality monitoring
    
    Impact Metrics:

    • Service Delivery
      - 5,000+ patients served
      - 20 communities reached
      - 500 emergency responses
      - 1,000 preventive screenings

    • Healthcare Access
      - 70% reduction in travel time
      - 24/7 emergency support
      - 90% service satisfaction
      - 40% cost reduction

    • Community Health
      - 50% improved health outcomes
      - 30% reduced complications
      - 80% vaccination coverage
      - 60% better health awareness
    
    Healthcare Services:

    • Primary Care
      - General consultations
      - Chronic disease management
      - Preventive services
      - Health screenings

    • Maternal Health
      - Prenatal care
      - Safe deliveries
      - Postnatal support
      - Family planning

    • Child Health
      - Growth monitoring
      - Immunizations
      - Nutrition programs
      - Pediatric care

    • Emergency Services
      - First response
      - Stabilization
      - Referral system
      - Transport coordination
    
    Community Benefits:

    • Improved Access
      - Reduced travel distance
      - Affordable care
      - Timely treatment
      - Better outcomes

    • Health Education
      - Disease prevention
      - Healthy lifestyle
      - Family health
      - Community hygiene

    • Economic Impact
      - Reduced medical costs
      - Less work days lost
      - Local employment
      - Skill development
    
    Future Expansion:

    • Service Enhancement
      - Additional specialties
      - Advanced equipment
      - Extended coverage
      - New programs

    • Technology Integration
      - AI diagnostics
      - Mobile apps
      - IoT monitoring
      - Cloud solutions

    • Capacity Building
      - Staff training
      - Facility upgrades
      - System improvements
      - Research initiatives`,
    author: "Jayne Wasonga",
    date: "2024-02-05",
    imageUrl: "/image/IMG_20141007_172002.jpg"
  }
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <BackButton />
      <article className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="rounded-lg overflow-hidden h-[400px] shadow-lg dark:shadow-none">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {post.author}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.split('\n\n').map((section, index) => {
                if (section.trim().startsWith('•')) {
                  const lines = section.trim().split('\n');
                  return (
                    <div key={index} className="bg-white dark:bg-dark-lighter p-6 rounded-lg shadow-sm mb-6">
                      {lines.map((line, lineIndex) => {
                        if (line.trim().startsWith('-')) {
                          return (
                            <div key={lineIndex} className="flex items-start space-x-3 ml-8 mb-2">
                              <div className="w-2 h-2 rounded-full bg-primary/60 mt-2"></div>
                              <p className="text-gray-600 dark:text-gray-300 flex-1">
                                {line.replace('-', '').trim()}
                              </p>
                            </div>
                          );
                        }
                        return (
                          <div key={lineIndex} className="flex items-start space-x-3 mb-3">
                            <div className="w-3 h-3 rounded-full bg-primary mt-1.5"></div>
                            <p className="text-gray-800 dark:text-gray-100 font-medium flex-1">
                              {line.replace('•', '').trim()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                return (
                  <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.trim()}
                  </p>
                );
              })}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}