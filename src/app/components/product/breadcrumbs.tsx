import Link from 'next/link'
import React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'

const Breadcrumbs = ({category, title}:{category:String, title:String}) => {
    const breadcrumbItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/Shop", label: "Shop" },
        { href: `/Shop?category=${category}`, label: category },
        { href: "#", label: title, current: true }
    ];

    return (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center"
                >
                    {index > 0 && (
                        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 mx-2" />
                    )}
                    
                    {item.current ? (
                        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
                            {item.label}
                        </span>
                    ) : (
                        <Link
                            href={item.href}
                            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 group"
                        >
                            {item.icon && (
                                <item.icon className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-200" />
                            )}
                            <span className="group-hover:underline">{item.label}</span>
                        </Link>
                    )}
                </motion.div>
            ))}
        </nav>
    );
};

export default Breadcrumbs;