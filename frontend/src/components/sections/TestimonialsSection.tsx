"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Bessie Cooper",
    location: "Washington, DC",
    rating: 4.9,
    comment:
      "We've had the privilege of working with Alex Taylor as our project manager. Her upbeat attitude and strong leadership played an essential role in our decision to continue our partnership.",
    avatar: "/api/placeholder/60/60",
  },
  {
    id: 2,
    name: "John Smith",
    location: "New York, NY",
    rating: 5.0,
    comment:
      "Exceptional service and attention to detail. The team went above and beyond to help us find our dream home. Highly recommend their expertise and professionalism.",
    avatar: "/api/placeholder/60/60",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "Los Angeles, CA",
    rating: 4.8,
    comment:
      "Outstanding real estate experience! The agents were knowledgeable, responsive, and made the entire process smooth and stress-free. Couldn't be happier with our new home.",
    avatar: "/api/placeholder/60/60",
  },
  {
    id: 4,
    name: "Michael Davis",
    location: "Chicago, IL",
    rating: 4.9,
    comment:
      "Professional, reliable, and trustworthy. They helped us sell our property quickly at a great price. The marketing strategy was excellent and results exceeded our expectations.",
    avatar: "/api/placeholder/60/60",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="relative">
      <div
        className="py-16 overflow-hidden position-absolute top-0 left-0"
        style={{
          backgroundColor: "#140329",
          backgroundImage:
            "linear-gradient(rgba(20, 3, 41, 0.7), rgba(20, 3, 41, 0.7)), url('/images/features-list-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Do Clients Say
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-violet-500 hover:bg-violet-600 rounded-full flex items-center justify-center transition-colors z-10 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-violet-500 hover:bg-violet-600 rounded-full flex items-center justify-center transition-colors z-10 cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Testimonial Card */}
            <div className="mx-16">
              <Card className="bg-white shadow-2xl relative">
                {/* Speech Bubble Tail */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
                </div>

                <div className="p-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    &ldquo;{current.comment}&rdquo;
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-lg mr-4">
                        {current.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {current.name}
                        </h4>
                        <p className="text-gray-600">{current.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900 mr-2">
                        {current.rating}
                      </span>
                      <svg
                        className="w-6 h-6 text-violet-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? "bg-violet-500"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Background Overlay for better text readability */}
    </section>
  );
};
