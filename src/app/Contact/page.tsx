// src/app/contact/page.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageSquareText, MessageCircle } from "lucide-react"; // Added WhatsApp icon
import clsx from "clsx";
import { useTheme } from "@/app/context/ThemeContext";

export default function ContactPage() {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // In a real application, you would send this data to your backend API.
      // For this example, we'll simulate an API call.
      console.log("Contact form submitted:", formData);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Failed to send message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = clsx(
    "w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500",
    {
      "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500": theme === "light",
      "bg-gray-700 border-gray-600 text-white placeholder-gray-400": theme === "dark",
    }
  );

  const labelClasses = clsx(
    "block text-sm font-semibold mb-2",
    {
      "text-gray-700": theme === "light",
      "text-gray-300": theme === "dark",
    }
  );

  const cardClasses = clsx(
    "rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl",
    {
      "bg-white border-gray-200": theme === "light",
      "bg-gray-800 border-gray-700": theme === "dark",
    }
  );

  // WhatsApp numbers provided, formatted for wa.me links
  const whatsappNumbers = [
    "8801322902540", "8801322902541", "8801322902542", "8801322902543",
    "8801322902544", "8801322902545", "8801322902546", "8801322902548",
    "8801322902549"
  ];

  return (
    <div className={clsx("min-h-screen transition-colors duration-300 py-16", {
      "bg-gray-50": theme === "light",
      "bg-gray-900": theme === "dark",
    })}>
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We&apos;re here to help! Reach out to us for any inquiries or support.
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "12rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full mt-4"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${cardClasses} md:col-span-2`}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className={labelClasses}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className={labelClasses}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="Regarding my recent order"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className={labelClasses}>
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={clsx(inputClasses, "resize-none")}
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className={clsx(
                  "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200",
                  {
                    "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-md": !isSubmitting,
                    "bg-gray-400 cursor-not-allowed": isSubmitting,
                  }
                )}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageSquareText className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              {submitStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-green-600 dark:text-green-400 mt-4"
                >
                  Message sent successfully! We&apos;ll get back to you soon.
                </motion.p>
              )}
              {submitStatus === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-red-600 dark:text-red-400 mt-4"
                >
                  Failed to send message. Please try again later.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`${cardClasses} lg:col-span-1`}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Direct Contact</h2>
            <div className="space-y-6">
              {/* WhatsApp Numbers */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-500" /> WhatsApp Order
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {whatsappNumbers.map((number, index) => (
                    <li key={index}>
                      <a
                        href={`https://wa.me/${number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-500 transition-colors block"
                      >
                        {number.substring(2)} {/* Display number without country code prefix */}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complaints */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-500" /> Complaints
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  For any complaints, please contact us via:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li><a href="tel:+8801711461083" className="hover:text-red-500 transition-colors flex items-center gap-2">
                      <Phone className="w-4 h-4" /> 01711461083
                    </a></li>
                  <li><a href="mailto:admin@dhakaiaajamdani.com" className="hover:text-red-500 transition-colors flex items-center gap-2">
                      <Mail className="w-4 h-4" /> admin@dhakaiaajamdani.com
                    </a></li>
                </ul>
              </div>

              {/* General Inquiry Email (from footer) */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-purple-500" /> General Inquiry
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  For general questions, you can reach us at:
                </p>
                <a href="tel:+8801511100007" className="text-red-500 hover:underline transition-colors block">
                  <Phone className="w-4 h-4" /> +88 015 111 000 07
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
