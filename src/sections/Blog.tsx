import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    title: "Empowering Communities Through Sustainable Development",
    content: "Exploring how sustainable development practices are transforming rural communities and creating lasting positive change...",
    author: "Jayne Wasonga",
    date: "2024-02-15",
    imageUrl: "/src/assets/images/DSC05379.JPG"
  },
  {
    title: "The Impact of Gender Equality Programs",
    description: "Examining the transformative effects of our gender equality initiatives on communities and individual lives...",
    author: "Jayne Wasonga",
    date: "2024-02-10",
    imageUrl: "/src/assets/images/SAM_0790.JPG"
  },
  {
    title: "Innovation in Rural Healthcare Delivery",
    content: "Discovering new approaches to delivering healthcare services in remote and underserved areas...",
    author: "Jayne Wasonga",
    date: "2024-02-05",
    imageUrl: "/src/assets/images/IMG_20141007_172002.jpg"
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 relative bg-light dark:bg-dark">
      <div className="absolute inset-0 bg-[url('/src/assets/images/DSC01363.JPG')] bg-fixed bg-cover bg-center opacity-50 dark:opacity-40" />
      <div className="absolute inset-0 bg-white/80 dark:bg-dark/60 backdrop-blur-[2px]" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Latest Updates
          </motion.h2>
          <Link 
            to="/blog"
            className="text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            View All Posts
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-dark-lighter/80 shadow-lg dark:shadow-none backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-xl dark:hover:bg-dark-accent/50 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Link 
                  to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-4 text-primary hover:text-primary/80 transition-colors flex items-center"
                >
                  Read More 
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}