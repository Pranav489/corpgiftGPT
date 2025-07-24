import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Info,
  ArrowRight,
} from "lucide-react";

const HeroSection = () => {
  const heroContent = [
    {
      id: 1,
      image_url:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Premium Corporate Gift Solutions",
      description:
        "Elevate your business relationships with our exclusive gifting collections",
      ctaHighlight: "New Arrivals",
      price: "₹1,299 - ₹5,999",
      category: "Executive Gift Sets",
      ctaLink: "/collections/executive-gifts",
    },
    {
      id: 2,
      image_url:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Custom Branded Gifts",
      description: "Personalized corporate gifts that make lasting impressions",
      ctaHighlight: "Best Sellers",
      price: "₹799 - ₹4,999",
      category: "Branded Merchandise",
      ctaLink: "/collections/branded-gifts",
    },
    {
      id: 3,
      image_url:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Bulk Order Discounts",
      description:
        "Special pricing for corporate bulk orders with custom packaging",
      ctaHighlight: "Limited Time",
      price: "Up to 40% Off",
      category: "Volume Discounts",
      ctaLink: "/collections/bulk-orders",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying || heroContent.length === 0) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextImage();
          return 0;
        }
        return prev + 100 / 50; // 5 seconds to fill (50 steps)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    setProgress(0);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroContent.length) % heroContent.length
    );
    setProgress(0);
  };

  const selectImage = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setProgress(0);
    }
  };

  const currentItem = heroContent[currentIndex] || {};

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Hero Slider */}
      <div
        className="relative w-full h-[80vh] min-h-[500px] flex items-center"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={currentItem.image_url}
              alt={currentItem.title}
              className="h-full w-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-2xl">
            {currentItem.ctaHighlight && (
              <motion.div
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full mb-4 text-sm font-medium"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentItem.ctaHighlight}
                <span className="text-xs">{currentItem.price}</span>
              </motion.div>
            )}

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentItem.title}
            </motion.h1>

            <motion.p
              className="text-xl text-gray-200 mb-8 max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentItem.description}
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href={currentItem.ctaLink}
                className="flex items-center gap-3 bg-white text-gray-900 px-6 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <ShoppingCart size={20} />
                Shop Collection
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.a>

              <motion.button
                className="flex items-center gap-3 bg-transparent border-2 border-white text-white px-6 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Info size={20} />
                Learn More
              </motion.button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {heroContent.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full z-10 backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="text-white w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full z-10 backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="text-white w-6 h-6" />
            </button>
          </>
        )}

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="container mx-auto px-6">
            <div className="flex gap-2">
              {heroContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`h-full ${
                      currentIndex === index ? "bg-white" : ""
                    }`}
                    style={{
                      width: currentIndex === index ? `${progress}%` : "0%",
                      transition: "width 0.1s linear",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
