"use client";

import React, { useState } from "react";
import Image from "next/image";

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("FOR RENT");

  return (
    <section className="relative bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Left Side - Search Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Find A Home That
                <br />
                Fits Dream Home
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We have properties in these areas. We will help you to find best
                residence you dream of.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                {["FOR RENT", "FOR SALE"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    KEYWORD
                  </label>
                  <input
                    type="text"
                    placeholder="House, Basement"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LOCATION
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Santa Monica</option>
                    <option>Los Angeles</option>
                    <option>Beverly Hills</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TYPE
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                  </select>
                </div>
              </div>

              {/* Advanced Search Text */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm">
                  What are you looking for?{" "}
                  <span className="text-violet-600 cursor-pointer underline">
                    Apartment, Villa, House, House
                  </span>
                </p>
              </div>

              {/* Search Button */}
              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                Find Property
              </button>
            </div>
          </div>

          {/* Right Side - Property Image with Carousel */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Main Property Image */}
              <div className="relative h-[600px]">
                <Image
                  src="/images/about.jpg"
                  alt="Modern luxury property"
                  fill
                  className="object-cover"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Location Badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">
                    📍 Advanced
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="absolute top-6 right-6">
                <button
                  className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: "#D4AF37",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#B28F2B")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#D4AF37")
                  }
                >
                  View Property
                </button>
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                  {[0, 1, 2, 3].map((dot) => (
                    <button
                      key={dot}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        dot === 0 ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
