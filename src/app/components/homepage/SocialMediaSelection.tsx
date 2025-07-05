"use client";
import React from "react";
import { motion } from "framer-motion";
import FacebookPageEmbed from "./facebooakPage";

const SocialMediaSection = () => {
  const socialLinks = [
    {
      name: "Instagram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      url: "https://instagram.com/dhakaiaajamdani",
      color: "from-pink-500 to-purple-600"
    },
    {
      name: "X",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="w-8 h-8"
          stroke="currentColor"
          viewBox="0 0 50 50"
        >
          <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
        </svg>
      ),
      url: "https://twitter.com/dhakaiaajamdani",
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "YouTube",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      ),
      url: "https://youtube.com/@DhakaiaaJamdani",
      color: "from-red-500 to-red-600"
    },
    {
      name: "TikTok",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 1 5 5"></path>
        </svg>
      ),
      url: "https://tiktok.com/@dhakaiaa.jamdani",
      color: "from-gray-800 to-gray-900"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Join Our
            </span>
            <span className="text-gray-800 dark:text-gray-200"> Community</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Connect with us across social platforms and stay updated with our latest collections
          </p>
          
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "12rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Social Icons - Enhanced Layout */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-6 lg:gap-8"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex flex-col lg:flex-row items-center justify-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                <div className="lg:w-16 mb-4 lg:mb-0 lg:mr-4 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${social.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {social.icon}
                  </div>
                </div>
                
                <div className="text-center lg:text-left relative z-10">
                  <span className="text-xl font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                    {social.name}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Follow us
                  </p>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-20 blur-sm"
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Facebook Embed - Enhanced Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 max-w-3xl"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook Updates
                </h3>
              </div>
              <FacebookPageEmbed
                pageUrl="https://www.facebook.com/dhakaiaajamdani"
                tabName="timeline"
              />
            </div>
          </motion.div>
        </div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 15, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-10 blur-xl"
        />
        
        <motion.div
          animate={{ 
            y: [0, 25, 0],
            rotate: [0, -12, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-10 blur-2xl"
        />
      </div>
    </section>
  );
};

export default SocialMediaSection;