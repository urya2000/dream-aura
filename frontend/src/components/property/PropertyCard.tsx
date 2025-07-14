import React from "react";
import Image from "next/image";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  imageUrl: string;
  type: string;
  agent?: {
    name: string;
    avatar: string;
  };
  featured?: boolean;
  forSale?: boolean;
}

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Property Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Left Badges */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {property.featured && (
            <span className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium">
              FEATURED
            </span>
          )}
          {property.forSale && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
              FOR SALE
            </span>
          )}
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-opacity-100">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          </button>
          <button className="bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-opacity-100">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-opacity-100">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>

        {/* Bottom Left Property Type */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white text-gray-900 px-3 py-1 rounded-md text-sm font-medium shadow-md">
            {property.type.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {property.title}
        </h3>

        <p className="text-gray-600 mb-4 flex items-center">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {property.location}
        </p>

        {/* Property Features */}
        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
            </svg>
            {property.bedrooms}
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11"
              />
            </svg>
            {property.bathrooms}
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0V0m0 4h4M4 8h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"
              />
            </svg>
            {property.area}
          </span>
        </div>

        {/* Bottom Section - Agent and Price */}
        <div className="flex items-center justify-between">
          {/* Agent Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
              {property.agent ? (
                <Image
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-500"
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
              )}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {property.agent?.name || "Arlene McCoy"}
            </span>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {property.price}
              <span className="text-sm font-normal text-gray-500">/SqFT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
