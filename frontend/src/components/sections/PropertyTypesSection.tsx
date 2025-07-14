"use client";

import React from "react";

const propertyTypes = [
  { icon: "🏢", name: "Apartment", count: "567 Property" },
  { icon: "🏠", name: "Villa", count: "23 Property" },
  { icon: "🏨", name: "Studio", count: "45 Property" },
  { icon: "🏢", name: "Office", count: "434 Property" },
  { icon: "🏘️", name: "Townhouse", count: "321 Property" },
  { icon: "🏬", name: "Commercial", count: "87 Property" },
];

export const PropertyTypesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="text-violet-500">PROPERTY TYPE</span>
              <br />
              Try Searching For
            </h2>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all">
            View All Property →
          </button>
        </div>

        {/* Property Type Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {propertyTypes.map((type, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 ${
                index === 2
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="text-3xl mb-4 text-center">{type.icon}</div>
              <h3 className="font-semibold mb-2 text-center">{type.name}</h3>
              <p
                className={`text-sm text-center ${
                  index === 2 ? "text-red-100" : "text-gray-500"
                }`}
              >
                {type.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
