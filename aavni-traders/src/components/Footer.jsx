import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { BsBriefcase, BsGift } from "react-icons/bs";

const Footer = () => {
  const socialIcons = [
    { icon: FaLinkedinIn, label: "LinkedIn", color: "text-blue-600" },
    { icon: FaTwitter, label: "Twitter", color: "text-blue-400" },
    { icon: FaFacebookF, label: "Facebook", color: "text-blue-700" },
    { icon: FaInstagram, label: "Instagram", color: "text-pink-600" },
  ];

  const productCategories = [
    { name: "Corporate Gift Sets", link: "/gift-sets" },
    { name: "Executive Diaries", link: "/categories/diaries" },
    { name: "Premium Pens", link: "/categories/pens" },
    { name: "Branded Keychains", link: "/categories/keychains" },
    { name: "Stainless Steel Bottles", link: "/categories/bottles" },
    { name: "Travel Accessories", link: "/categories/travel" },
  ];

  const quickLinks = [
    { name: "Bulk Orders", link: "/corporate/bulk-orders" },
    { name: "Custom Branding", link: "/corporate/custom-branding" },
    { name: "Festive Collections", link: "/festive-collections" },
    { name: "About Us", link: "/about" },
    { name: "Testimonials", link: "/testimonials" },
    { name: "Contact Us", link: "/contact" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-blue-900 text-white pt-16 pb-8 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <img
              src="/logo-white.png"
              alt="Aavni Traders"
              className="h-10 mr-2"
            />
            <h2 className="text-xl font-bold">Aavni Traders</h2>
          </div>
          <p className="text-blue-100 text-sm mb-4">
            Premium corporate gifting solutions with a focus on quality and
            customization. We help businesses strengthen relationships through
            thoughtful, branded gifts.
          </p>
          <div className="flex gap-4 mt-6">
            {socialIcons.map(({ icon: Icon, label, color }, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                title={label}
                className={`cursor-pointer bg-blue-800 p-3 rounded-full hover:bg-blue-700 ${color}`}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Product Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BsGift className="mr-2" />
            Our Products
          </h3>
          <ul className="space-y-2">
            {productCategories.map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={link.link}
                  className="text-blue-100 hover:text-white transition-colors flex items-center text-sm"
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BsBriefcase className="mr-2" />
            Corporate Solutions
          </h3>
          <ul className="space-y-2">
            {quickLinks.map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={link.link}
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="text-blue-100 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <IoLocationOutline size={18} className="mt-1" />
              <span>
                123 Business Park, Mumbai
                <br />
                Maharashtra, India - 400001
              </span>
            </li>
            <li className="flex items-center gap-3">
              <IoCallOutline size={18} />
              <a href="tel:+919876543210" className="hover:text-white">
                +91 9876543210
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MdOutlineEmail size={18} />
              <a
                href="mailto:info@aavnitraders.com"
                className="hover:text-white"
              >
                info@aavnitraders.com
              </a>
            </li>
            <li className="mt-6">
              <p className="font-medium">Business Hours:</p>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center text-sm text-blue-200 border-t border-blue-800 pt-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>
            © {new Date().getFullYear()} Aavni Traders. All Rights Reserved.
          </p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Shipping Policy
            </a>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
