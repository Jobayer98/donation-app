"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Heart } from "lucide-react";

// Mock Data for the Banner Slides
const slides = [
  {
    id: 1,
    title: "Empower Communities",
    description:
      "Your kindness fuels sustainable projects that lift entire communities out of poverty.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1740&q=80",
    color: "from-green-900/70",
  },
  {
    id: 2,
    title: "Clean Water for All",
    description:
      "Every drop counts. Help us build wells and provide safe drinking water to those in need.",
    image:
      "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?auto=format&fit=crop&w=1740&q=80",
    color: "from-teal-900/70",
  },
  {
    id: 3,
    title: "Education Changes Lives",
    description:
      "Support a child's education today and pave the way for a brighter tomorrow.",
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1740&q=80",
    color: "from-emerald-900/70",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* --- Background Image Slider --- */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[12000ms] ease-out"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
            }}
          />
          {/* Gradient Overlay for Text Readability */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slide.color} to-transparent`}
          />
        </div>
      ))}

      {/* --- Content Layer --- */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container px-6 lg:px-20 mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left Side: Text Content (Changes with slide) */}
          <div className="flex flex-col justify-center space-y-6 text-white">
            <div className="space-y-2 overflow-hidden h-24">
              {" "}
              {/* Fixed height for title */}
              {slides.map((slide, index) => (
                <h1
                  key={slide.id}
                  className={`text-4xl md:text-5xl lg:text-6xl font-extrabold transition-all duration-700 transform ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8 absolute"
                  }`}
                >
                  {slide.title}
                </h1>
              ))}
            </div>

            <div className="overflow-hidden h-20">
              {" "}
              {/* Fixed height for description */}
              {slides.map((slide, index) => (
                <p
                  key={slide.id}
                  className={`text-lg md:text-xl text-white/90 max-w-md transition-all duration-700 delay-100 transform ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8 absolute"
                  }`}
                >
                  {slide.description}
                </p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-white shadow-xl shadow-green-900/30 gap-2 group"
              >
                Start Giving
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Side: Purpose Cards (Static) */}
          <div className="hidden lg:flex flex-col justify-center items-end space-y-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-sm transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Heart className="text-green-300 h-6 w-6" />
                </div>
                <h3 className="text-white font-bold text-xl">Our Purpose</h3>
              </div>
              <p className="text-white/80 text-sm">
                We connect generosity with necessity. EcoKind ensures every
                dollar goes directly to verified sustainable projects.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-sm transform hover:-translate-y-1 transition-transform delay-75">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-teal-500/20 rounded-lg">
                  <ShieldCheck className="text-teal-300 h-6 w-6" />
                </div>
                <h3 className="text-white font-bold text-xl">
                  100% Transparent
                </h3>
              </div>
              <p className="text-white/80 text-sm">
                Track your impact in real-time. We provide proof of delivery for
                every donation made.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Navigation Dots --- */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
