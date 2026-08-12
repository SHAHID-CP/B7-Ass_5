"use client";

import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, CheckCircle2 } from "lucide-react";


const slides = [
  {
    id: 1,
    title: "Find Your Dream Rental Home",
    description: "Browse verified apartments, flats, and rooms from trusted landlords across the city.",
    extraInfo: [
      "100% Verified Landlords",
      "No Hidden Broker Fees",
      "Instant Online Booking",
      "Prime City Locations",
    ],
    image: "https://i.ibb.co.com/zW1NWLSx/Eclectic-and-Plant-filled-Living-Space-1-1.png",
    buttonText: "Browse Properties",
    buttonLink: "/properties",
  },
  {
    id: 2,
    title: "Luxury Apartments & Villas",
    description: "Experience premium living spaces with modern amenities and high-end security.",
    extraInfo: [
      "Fully Furnished Modern Homes",
      "24/7 Security & CCTV",
      "Swimming Pool & Gym",
      "Flexible Lease Terms",
    ],
    image: "https://i.ibb.co.com/Sw7Mnhjm/Urban-Oasis-Industrial-Chic-Living-Room-1.png",
    buttonText: "View Luxury Homes",
    buttonLink: "/properties?category=luxury",
  },
  {
    id: 3,
    title: "Affordable Student & Bachelor Flats",
    description: "Budget-friendly shared flats and private studio rooms near top universities.",
    extraInfo: [
      "Low Security Deposit",
      "High-Speed Wi-Fi Included",
      "Close to Transport Hubs",
      "Move-in Ready Units",
    ],
    image: "https://i.ibb.co.com/HDr514gg/Sunny-Mid-Century-Modern-Living-Space-1.png",
    buttonText: "Find Student Housing",
    buttonLink: "/properties?category=bachelor",
  },
];

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.4 },
  }),
};

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-full h-[70vh] min-h-[550px] relative overflow-hidden bg-gray-900">
      <Carousel
        infiniteLoop
        autoPlay
        interval={5000}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        className="h-full"
        onChange={(index) => setCurrentSlide(index)}
      >
        {slides.map(({ id, title, description, extraInfo, image, buttonText, buttonLink }, index) => (
          <div key={id} className="relative h-[70vh] min-h-[550px] w-full overflow-hidden">
            
            {/* Background Image with Dark Overlay */}
            <motion.div 
              className="absolute inset-0 bg-black/50 z-10" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            
            <motion.img
              src={image}
              alt={title}
              className="object-cover w-full h-full filter brightness-90"
              initial={{ scale: 1.15 }}
              animate={
                currentSlide === index
                  ? { scale: 1 }
                  : { scale: 1.15 }
              }
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Center Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-16 max-w-5xl mx-auto space-y-5 sm:space-y-6">
              
              {/* Title */}
              <motion.h1
                className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md"
                initial={{ y: -25, opacity: 0 }}
                animate={
                  currentSlide === index ? { y: 0, opacity: 1 } : { y: -25, opacity: 0 }
                }
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {title}
              </motion.h1>

              {/* Sub-description */}
              <motion.p
                className="text-sm sm:text-lg md:text-xl text-blue-100 max-w-2xl font-light leading-relaxed"
                initial={{ y: -15, opacity: 0 }}
                animate={
                  currentSlide === index ? { y: 0, opacity: 1 } : { y: -15, opacity: 0 }
                }
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                {description}
              </motion.p>

              {/* Extra Info Cards (Glassmorphism effect) */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-3xl pt-2">
                {extraInfo.map((info, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-3 py-2 sm:py-2.5 rounded-xl shadow-lg text-xs sm:text-sm text-white font-medium"
                    custom={idx}
                    initial="hidden"
                    animate={currentSlide === index ? "visible" : "hidden"}
                    variants={listVariants}
                  >
                    <CheckCircle2 className="text-emerald-400 w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                    <span className="truncate text-left">{info}</span>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={
                  currentSlide === index ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                transition={{ delay: 0.7, duration: 0.5 }}
                className="pt-2"
              >
                <Link href={buttonLink}>
                  <button className="cursor-pointer inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-xl hover:shadow-blue-600/30 active:scale-95 transition-all text-sm sm:text-base">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    {buttonText}
                  </button>
                </Link>
              </motion.div>

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}