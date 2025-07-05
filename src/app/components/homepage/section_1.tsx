'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const Section_1 = () => {
  const features = [
    {
      icon: '/images/fabric-pattern.png',
      title: 'Quality Fabric',
      description: 'Premium materials sourced from the finest textile artisans'
    },
    {
      icon: '/images/tag.png',
      title: 'Affordable Price',
      description: 'Competitive pricing without compromising on quality'
    },
    {
      icon: '/images/click.png',
      title: 'Rich Collection',
      description: 'Diverse range of traditional and contemporary designs'
    },
    {
      icon: '/images/shopping-cart.png',
      title: 'Hassle Free Shopping',
      description: 'Seamless shopping experience from browse to delivery'
    },
  ];

  return (
    <section className='container mx-auto py-16 px-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl my-16'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            What We Offer
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Experience the finest in traditional craftsmanship with modern convenience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="text-center group"
          >
            <div className="relative mb-6">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={feature.icon}
                  width={40}
                  height={40}
                  alt={feature.title}
                  className="object-contain"
                />
              </motion.div>
              
              {/* Floating background element */}
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-20 blur-sm"
              />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
              {feature.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Decorative elements */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-10 blur-xl"
      />
      
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-10 blur-2xl"
      />
    </section>
  );
};

export default Section_1;