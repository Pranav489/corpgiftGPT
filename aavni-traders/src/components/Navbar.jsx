import React, { useState, useEffect, useContext } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  ShoppingCart,
  Gift,
  Briefcase,
  Notebook,
  PenTool,
  Key,
  Users,
  Info,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../Layout/Layout";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems, openCart } = useContext(CartContext);

  const navItems = [
    { label: "Home", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    {
      label: "Gift Sets",
      path: "/gift-sets",
      icon: <Gift className="h-4 w-4 mr-2" />,
      subItems: [
        "6 in 1 Combo Sets",
        "5 in 1 Combo Sets",
        "4 in 1 Combo Sets",
        "3 in 1 Combo Sets",
        "2 in 1 Combo Sets",
      ],
    },
    {
      label: "Categories",
      path: "/categories",
      icon: <Briefcase className="h-4 w-4 mr-2" />,
      subItems: [
        "Office Diaries",
        "Premium Pens",
        "Keychains",
        "Stainless Steel Bottles",
        "Travel Bags",
        "Office Accessories",
      ],
    },
    {
      label: "Corporate Solutions",
      path: "/corporate",
      icon: <Users className="h-4 w-4 mr-2" />,
      subItems: [
        "Bulk Orders",
        "Custom Branding",
        "Festive Collections",
        "Employee Gifting",
        "Client Gifting",
      ],
    },
    {
      label: "About Us",
      path: "/about",
      icon: <Info className="h-4 w-4 mr-2" />,
    },
    {
      label: "Contact",
      path: "/contact",
      icon: <Phone className="h-4 w-4 mr-2" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="fixed w-full z-50">
      {/* Top Contact Bar */}
      <div
        className={`bg-gradient-to-r from-blue-900 to-blue-700 text-white text-sm transition-all duration-300 ${
          scrolled ? "h-0 overflow-hidden" : "h-10"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a
              href="mailto:info@aavnitraders.com"
              className="flex items-center hover:text-blue-200 transition-colors"
            >
              <Mail className="h-4 w-4 mr-1" />
              info@aavnitraders.com
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center hover:text-blue-200 transition-colors"
            >
              <Phone className="h-4 w-4 mr-1" />
              +91 9876543210
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Mumbai, India</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`bg-white shadow-md transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-blue-700">
              <img
                src="/logo.png"
                alt="Aavni Traders"
                className="h-12 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center text-gray-800 hover:text-blue-600 transition-colors font-medium"
                    >
                      {item.icon}
                      {item.label}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-100"
                        >
                          <div className="py-1">
                            {item.subItems.map((subItem) => (
                              <a
                                key={subItem}
                                href={`/${item.path}/${subItem
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {subItem}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a
                    href={item.path}
                    className="flex items-center text-gray-800 hover:text-blue-600 transition-colors font-medium"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                )}
              </div>
            ))}

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems?.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-blue-600"
            >
              <ShoppingCart size={20} />
              {cartItems?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems?.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            <button
              className="text-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <img src="/logo.png" alt="Aavni Traders" className="h-10" />
                </div>
                <button onClick={toggleMenu} className="text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-gray-100 pb-2"
                  >
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className="flex items-center justify-between w-full py-3 text-gray-800 font-medium"
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              openDropdown === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-8 overflow-hidden"
                          >
                            <div className="py-2 space-y-2">
                              {item.subItems.map((subItem) => (
                                <a
                                  key={subItem}
                                  href={`/${item.path}/${subItem
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                  className="block py-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                  onClick={toggleMenu}
                                >
                                  {subItem}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <a
                        href={item.path}
                        className="flex items-center py-3 text-gray-800 hover:text-blue-600 transition-colors font-medium"
                        onClick={toggleMenu}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Us</h3>
                <a
                  href="mailto:info@aavnitraders.com"
                  className="flex items-center text-gray-700 mb-2 text-sm"
                >
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  info@aavnitraders.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center text-gray-700 mb-2 text-sm"
                >
                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                  +91 9876543210
                </a>
                <div className="flex items-start text-gray-700 text-sm">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600 mt-1" />
                  <span>
                    Corporate Office: 123 Business Park, Mumbai, India - 400001
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
