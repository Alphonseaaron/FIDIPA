import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, PenTool, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = (phone: string) => {
    if ('tel' in window.navigator) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleWebsiteClick = () => {
    window.location.reload();
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
        >
          Contact Us
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg dark:shadow-none relative overflow-hidden group hover:shadow-xl dark:hover:bg-dark-accent transition-all duration-300"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300" />
            <div className="relative z-10">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Main Office</h3>
              <p className="text-gray-600 dark:text-gray-300">Kisumu Obambo next to St. John Anglican Church Obambo</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg dark:shadow-none relative overflow-hidden group hover:shadow-xl dark:hover:bg-dark-accent transition-all duration-300"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300" />
            <div className="relative z-10">
              <Building2 className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Liaison Office</h3>
              <p className="text-gray-600 dark:text-gray-300">Kayole Spine Road D2 Hse 383 Nairobi</p>
            </div>
          </motion.div>

          <motion.button
            onClick={() => handlePhoneClick('+254735443379')}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg dark:shadow-none text-left hover:shadow-xl dark:hover:bg-dark-accent transition-all duration-300 relative overflow-hidden group w-full"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300" />
            <div className="relative z-10">
              <Phone className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">+254 735 443 379</p>
            </div>
          </motion.button>

          <motion.div
            className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg dark:shadow-none text-left hover:shadow-xl dark:hover:bg-dark-accent transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300" />
            <div className="relative z-10">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Email</h3>
              <button 
                onClick={() => handleEmailClick('fidipakenya@gmail.com')}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors block"
              >
                fidipakenya@gmail.com
              </button>
              <button
                onClick={() => handleEmailClick('nyapaulj@gmail.com')}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors block"
              >
                nyapaulj@gmail.com
              </button>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg dark:shadow-none text-left hover:shadow-xl dark:hover:bg-dark-accent transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300" />
            <div className="relative z-10">
              <Globe className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Website & Address</h3>
              <p className="text-gray-600 dark:text-gray-300">www.fidipa.org</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">P.O. Box 62226, Code 00200 Nairobi</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link 
            to="/write-for-us"
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <PenTool size={20} />
            <span>Write for Us</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}