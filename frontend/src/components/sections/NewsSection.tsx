"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  slug: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Search For House Rent in a Property For Rent end.",
    excerpt:
      "The modern day technique can require considering knowledge compiled information and also options.",
    date: "July 23,2023",
    author: "Abdullah Mamun",
    image: "/images/about.jpg",
    slug: "search-house-rent-property-1",
  },
  {
    id: 2,
    title: "Search For House Rent in a Property For Rent end.",
    excerpt:
      "The modern day technique can require considering knowledge compiled information and also options.",
    date: "July 23,2023",
    author: "Abdullah Mamun",
    image: "/images/about.jpg",
    slug: "search-house-rent-property-2",
  },
  {
    id: 3,
    title: "Search For House Rent in a Property For Rent end.",
    excerpt:
      "The modern day technique can require considering knowledge compiled information and also options.",
    date: "July 23,2023",
    author: "Abdullah Mamun",
    image: "/images/about.jpg",
    slug: "search-house-rent-property-3",
  },
];

export const NewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">Get our Information</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Latest News
          </h2>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-56">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date and Author */}
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {article.date}
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500"
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
                    By {article.author}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {article.title}
                </h3>

                {/* Read More Link */}
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center text-gray-900 font-medium hover:text-blue-600 transition-colors"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
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
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
