import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import ThemeToggle from "./ui/ThemeToggle";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { href: "/", label: "Home" },
        { href: "/Shop", label: "Shop" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Categories",
      links: [
        { href: "/Shop?category=Sharee", label: "Sharee" },
        { href: "/Shop?category=Panjabi", label: "Panjabi" },
        { href: "/Shop?category=Threepcs", label: "Three Piece" },
        { href: "/Shop", label: "All Products" },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { href: "/shipping", label: "Shipping Info" },
        { href: "/returns", label: "Returns" },
        { href: "/size-guide", label: "Size Guide" },
        { href: "/faq", label: "FAQ" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/dhakaiaajamdani",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/dhakaiaajamdani",
      label: "Instagram",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/dhakaiaajamdani",
      label: "Twitter",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@DhakaiaaJamdani",
      label: "YouTube",
    },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">ঢ</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  ঢাকাইয়া জামদানি
                </span>
              </Link>

              <p className="text-gray-300 leading-relaxed mb-6">
                Preserving the rich heritage of Bangladeshi traditional wear
                through authentic craftsmanship and timeless designs. Each piece
                tells a story of cultural pride and artistic excellence.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <span>Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-red-400" />
                  <span><a href="tel:+8801511100007" className="hover:text-red-500 transition-colors block">+88 015 111 000 07</a></span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-red-400" />
                  <span>admin@dhakaiaajamdani.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
{/* Location Map & Newsletter Side by Side */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Location Map */}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Visit Our Store
                  </h4>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-700">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.9975592530823!2d90.4386794!3d23.7117812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9ac0ecab693%3A0xb89c3987222e9e60!2sDhakaiaa%20Jamdani!5e0!3m2!1sen!2sbd!4v1751569466477!5m2!1sen!2sbd"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="transition-all duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full shadow-lg">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Newsletter Section */}
                <div className="flex-1 flex flex-col">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    News Letter
                  </h4>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-lg"
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-2">
                      Stay Updated with Our Latest Collections
                    </h3>
                    <p className="text-red-100 mb-4">
                      Subscribe to our newsletter and be the first to know about
                      new arrivals, exclusive offers, and traditional
                      craftsmanship stories.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Subscribe
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
        {/* Social Media & Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between pt-12 mt-12 border-t border-gray-700"
        >
          <div className="flex items-center gap-6 mb-6 sm:mb-0">
          <span className="text-gray-300 font-medium">Follow Us:</span>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
            </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">Theme:</span>
            <ThemeToggle />
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center pt-8 mt-8 border-t border-gray-700"
        >
          <p className="text-gray-400">
             {currentYear} Dhakaiaa Jamdani . All rights reserved. | Developed by{" "}
                  <a
                    href="https://withshawon.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-400 transition-colors text-blue-400"
                  >
                    Asif Bhuiyan Shawon
                  </a>{" "}
                  |
            <Link
              href="/privacy"
              className="hover:text-red-400 transition-colors ml-1"
            >
              Privacy Policy
            </Link>{" "}
            |
            <Link
              href="/terms"
              className="hover:text-red-400 transition-colors ml-1"
            >
              Terms of Service
            </Link>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
