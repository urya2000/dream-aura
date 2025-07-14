"use client";

import React from "react";
import Image from "next/image";

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Images */}
          <div className="relative">
            {/* Main House Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <div className="h-96 relative">
                  {/* Real House Image */}
                  <Image
                    src="/images/about.jpg"
                    alt="Luxury Property with Pool"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Experience Badge - Top Left */}
              <div className="absolute top-6 left-6 z-10">
                <div className="bg-black bg-opacity-80 text-white px-6 py-4 rounded-xl backdrop-blur-sm">
                  <div className="text-3xl font-bold leading-tight">
                    5 Years
                  </div>
                  <div className="text-sm font-medium">Experience</div>
                </div>
              </div>

              {/* CEO Profile Card - Bottom Right */}
              <div className="absolute bottom-6 right-6 z-10">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl p-4 flex items-center space-x-4 min-w-[280px]">
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-base leading-tight">
                      Wade De Warren
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Homec Ceo & Founder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            {/* About Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-full mb-6">
              <span className="text-sm font-medium text-yellow-800">
                About Homeco
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Have done some Cool
              <br />
              Stuff with common users
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t look even
              slightly believable.
            </p>

            <p className="text-blue-600 font-medium mb-8 leading-relaxed">
              Over 5 years&apos; experience providing top quality house Booking
              in to the rant and sell for your Amazing Dream &amp; Make you
              Happy
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    90k+ Renters
                  </h3>
                  <p className="text-gray-600 text-sm">
                    believe in our service & Care
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    120k+ Renters
                  </h3>
                  <p className="text-gray-600 text-sm">
                    house ready for occupancy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
