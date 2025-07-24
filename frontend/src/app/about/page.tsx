import React from "react";
import { AboutSection, FeaturesSection } from "@/components/sections";
import { Footer, Header } from "@/components";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div>
        {/* Page Header */}
        <Header/>
        <div
          className="relative py-40 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/about-overlay-banner.jpg')",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Your trusted partner in finding the perfect property. We combine
              technology with personalized service to make your real estate
              dreams come true.
            </p>
          </div>
        </div>
        <AboutSection />
        {/* Features Section */}
        <FeaturesSection />
      </div>
      <Footer />
    </main>
  );
}
