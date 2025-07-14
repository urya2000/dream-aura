import React from "react";
import { PropertyCard } from "./PropertyCard";

// Sample property data - in a real app, this would come from an API
const sampleProperties = [
  {
    id: "1",
    title: "Casa Lomas De Machali Machas",
    price: "$7250,00",
    location: "33 Maple Street, San Francisco, California",
    bedrooms: 3,
    bathrooms: 2,
    area: "600 SqFT",
    imageUrl: "/images/about.jpg",
    type: "Studio",
    featured: true,
    forSale: true,
    agent: {
      name: "Arlene McCoy",
      avatar: "/images/about.jpg",
    },
  },
  {
    id: "2",
    title: "Modern Downtown Luxury Apartment",
    price: "$1,200,000",
    location: "Manhattan, NY",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800 SqFT",
    imageUrl: "/images/banner-property-1.jpg",
    type: "Apartment",
    featured: false,
    forSale: true,
    agent: {
      name: "John Smith",
      avatar: "/images/banner-property-1.jpg",
    },
  },
  {
    id: "3",
    title: "Cozy Family House",
    price: "$650,000",
    location: "Austin, TX",
    bedrooms: 5,
    bathrooms: 3,
    area: "3,200 SqFT",
    imageUrl: "/images/about.jpg",
    type: "House",
    featured: true,
    forSale: false,
    agent: {
      name: "Sarah Johnson",
      avatar: "/images/about.jpg",
    },
  },
  {
    id: "4",
    title: "Beachfront Condo",
    price: "$950,000",
    location: "Miami, FL",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,500 SqFT",
    imageUrl: "/images/about.jpg",
    type: "Condo",
    featured: false,
    forSale: true,
    agent: {
      name: "Mike Wilson",
      avatar: "/images/about.jpg",
    },
  },
  {
    id: "5",
    title: "Mountain View Cabin",
    price: "$450,000",
    location: "Aspen, CO",
    bedrooms: 3,
    bathrooms: 2,
    area: "2,000 SqFT",
    imageUrl: "/images/about.jpg",
    type: "Villa",
    featured: true,
    forSale: false,
    agent: {
      name: "Emma Davis",
      avatar: "/images/about.jpg",
    },
  },
  {
    id: "6",
    title: "Urban Loft",
    price: "$750,000",
    location: "Seattle, WA",
    bedrooms: 2,
    bathrooms: 1,
    area: "1,200 SqFT",
    imageUrl: "/images/about.jpg",
    type: "Loft",
    featured: false,
    forSale: true,
    agent: {
      name: "David Brown",
      avatar: "/images/about.jpg",
    },
  },
];

export const PropertyGrid: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium properties that match
            your lifestyle and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md transition-colors text-lg font-medium">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};
