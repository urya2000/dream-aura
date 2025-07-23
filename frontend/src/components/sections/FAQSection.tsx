"use client";

import React, { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What are we for R Company?",
    answer:
      "We are a comprehensive property management company specializing in residential and commercial real estate services.",
  },
  {
    id: 2,
    question: "What happens if you delete social media apps?",
    answer:
      "We maintain our presence across multiple platforms and channels to ensure continuous communication with our clients.",
  },
  {
    id: 3,
    question: "What is social media in simple words?",
    answer:
      "Social media is our way of connecting with property owners and tenants, sharing updates, and building community relationships.",
  },
  {
    id: 4,
    question: "What is social media in simple words?",
    answer:
      "We use social media platforms to showcase properties, share success stories, and provide valuable real estate insights to our community.",
  },
];

export const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden" style={{background:'url(/images/bg-shape-five.png) no-repeat center center/cover'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Title and FAQ Items */}
          <div>
            {/* FAQ Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-violet-100 border border-violet-300 rounded-full mb-8">
              <span className="text-sm font-medium text-violet-800">FAQ</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              If you want to know
              <br />
              <span className="text-gray-800">Frequently Ask Questions</span>
            </h2>

            {/* FAQ Items */}
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg bg-white"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <h3 className="font-medium text-gray-900 text-base pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          openFAQ === faq.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {openFAQ === faq.id && (
                    <div className="px-4 pb-4">
                      <div className="border-t border-gray-100 pt-3">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative  rounded-3xl p-8 overflow-hidden">
              {/* Professional woman with house model */}
              <div className="relative z-10 flex items-center justify-center h-80">
                <div className="text-center text-white">
                  <div className="w-32 h-32 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-black"
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
                  <p className="text-sm font-medium">
                    Professional Support Agent
                  </p>
                </div>
              </div>

              {/* 24/7 Support Badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-purple-600 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      24/7 Support
                    </h3>
                    <p className="text-blue-100 text-sm">
                      Have Any Questions? Contact Us!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
