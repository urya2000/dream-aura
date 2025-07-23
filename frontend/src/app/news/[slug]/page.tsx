"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  category: string;
}

// Sample blog data - In real app, this would come from API/database
const blogPosts: { [key: string]: BlogPost } = {
  "search-house-rent-property-1": {
    id: 1,
    title: "Search For House Rent in a Property For Rent end.",
    content: `The modern day technique can require considering knowledge compiled information and also options said should be focus that as you a different environments or information. You cannot think anything at different with the present.

The intended idea developed can require considering knowledge compiled information and also options what should note that as you a different. You cannot think anything at different with the present have been so you should say because today, you have read choice in the house market as you find the market and different.

The intended idea developed can require considering knowledge compiled information and also options what should note that as you a different. You cannot think anything at different with the present.

So actually that it we want any need agent right, the full suitable in real location & and suitable chance in choice like that choice market. You need the market choice become that as when think well as present even the choice it has been it.

The intended idea developed can require considering knowledge compiled information and also options what should note that as you a different. You cannot think anything at different with the present.`,
    date: "July 23,2023",
    author: "Abdullah Mamun",
    image: "/images/about.jpg",
    tags: ["Property", "House building", "Real Estate"],
    category: "Real Estate",
  },
  "search-house-rent-property-2": {
    id: 2,
    title: "Search For House Rent in a Property For Rent end.",
    content: `The modern day technique can require considering knowledge compiled information and also options said should be focus that as you a different environments or information. You cannot think anything at different with the present.

The intended idea developed can require considering knowledge compiled information and also options what should note that as you a different. You cannot think anything at different with the present have been so you should say because today, you have read choice in the house market as you find the market and different.`,
    date: "July 23,2023",
    author: "Abdullah Mamun",
    image: "/images/about.jpg",
    tags: ["Property", "House building"],
    category: "Real Estate",
  },
  "search-house-rent-property-3": {
    id: 3,
    title: "Search For House Rent in a Property For Rent end.",
    content: `The modern day technique can require considering knowledge compiled information and also options said should be focus that as you a different environments or information. You cannot think anything at different with the present.`,
    date: "July 23,2023",
    author: "Abdullah Mamun",
    image: "/images/about.jpg",
    tags: ["Property", "Real Estate"],
    category: "Real Estate",
  },
};

// Sidebar data
const latestPosts = [
  {
    title: "People with waterwise home connections",
    date: "01 May 2022",
    image: "/images/about.jpg",
  },
  {
    title: "People with waterwise City connections",
    date: "01 May 2022",
    image: "/images/about.jpg",
  },
  {
    title: "People with waterwise City connections",
    date: "01 May 2022",
    image: "/images/about.jpg",
  },
];

const categories = [
  { name: "Real Estate", count: 5 },
  { name: "Apartment", count: 3 },
  { name: "House", count: 6 },
  { name: "Villa", count: 2 },
  { name: "Buying Property", count: 4 },
  { name: "Interior and Lift", count: 3 },
];

const popularTags = [
  "Love life",
  "trending Content",
  "Property",
  "real estate",
  "buying home",
  "Cafe",
  "Car world",
];

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Home
            </Link>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>🏠 Admin</span>
              <span>📝 Blog 2022</span>
              <span>💬 25 Comment</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {post.title}
                </h1>

                <div className="flex items-center text-sm text-gray-500 mb-8 space-x-4">
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
                    {post.date}
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
                    By {post.author}
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {post.content.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-700 leading-relaxed mb-6"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Tags:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Latest Blog */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Latest Blog
                </h3>
                <div className="space-y-4">
                  {latestPosts.map((post, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blog Categories */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Blog Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-500">
                        ({category.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Follow Us */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <span className="text-sm">f</span>
                  </div>
                  <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white">
                    <span className="text-sm">t</span>
                  </div>
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white">
                    <span className="text-sm">i</span>
                  </div>
                  <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white">
                    <span className="text-sm">in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
