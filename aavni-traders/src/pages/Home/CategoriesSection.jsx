import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Gift,
  Notebook,
  PenTool,
  Key,
  Briefcase,
  Luggage,
  Cpu,
  BottleWine,
} from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      name: "Gift Sets",
      icon: <Gift className="h-8 w-8 text-blue-600" />,
      image:
        "https://images.unsplash.com/photo-1601593768790-1aaf56e7f718?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      link: "/category/gift-sets",
      color: "bg-blue-100",
    },
    {
      id: 2,
      name: "Office Diaries",
      icon: <Notebook className="h-8 w-8 text-green-600" />,
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      link: "/category/diaries",
      color: "bg-green-100",
    },
    {
      id: 3,
      name: "Premium Pens",
      icon: <PenTool className="h-8 w-8 text-purple-600" />,
      image:
        "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      link: "/category/pens",
      color: "bg-purple-100",
    },
    {
      id: 4,
      name: "Keychains",
      icon: <Key className="h-8 w-8 text-amber-600" />,
      image:
        "https://images.unsplash.com/photo-1601784551446-20f9a5d1a9c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      link: "/category/keychains",
      color: "bg-amber-100",
    },
    {
      id: 5,
      name: "Stainless Bottles",
      icon: <BottleWine className="h-8 w-8 text-red-600" />,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      link: "/category/bottles",
      color: "bg-red-100",
    },
    {
      id: 6,
      name: "Corporate Solutions",
      icon: <Briefcase className="h-8 w-8 text-indigo-600" />,
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      link: "/corporate",
      color: "bg-indigo-100",
    },
    {
      id: 7,
      name: "Travel Bags",
      icon: <Luggage className="h-8 w-8 text-teal-600" />,
      image:
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      link: "/category/travel-bags",
      color: "bg-teal-100",
    },
    {
      id: 8,
      name: "Tech Accessories",
      icon: <Cpu className="h-8 w-8 text-gray-600" />,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      link: "/category/tech",
      color: "bg-gray-100",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover premium corporate gifting solutions for every business need
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={category.link} className="block">
                <div className="relative overflow-hidden rounded-xl aspect-square bg-white shadow-sm hover:shadow-md transition-all duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col items-center justify-end p-6">
                    <div
                      className={`${category.color} p-3 rounded-full mb-3 group-hover:scale-110 transition-transform`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-white font-bold text-lg sm:text-xl text-center">
                      {category.name}
                    </h3>
                    <span className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Shop now →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
