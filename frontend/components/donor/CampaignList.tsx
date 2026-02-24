"use client";
import React from "react";
import CampaignCard from "./CampaignCard";

// Mock Data
const campaigns = [
  {
    id: "f1",
    category: "Emergency Relief",
    title: "Urgent Flood Relief for Families",
    location: "Southeast Asia",
    raised: 45000,
    goal: 50000,
    image: "https://images.unsplash.com/photo-emer-1?q=80", // Replace with real URLs
    featured: true,
  },
  {
    id: 1,
    category: "Medical",
    title: "Help Children Fight Cancer",
    location: "New York, USA",
    raised: 45000,
    goal: 50000,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    category: "Education",
    title: "Build a School in Rural Village",
    location: "Dhaka, BD",
    raised: 12000,
    goal: 30000,
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    category: "Environment",
    title: "Plant 10,000 Trees Initiative",
    location: "Amazon, BR",
    raised: 8500,
    goal: 15000,
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CampaignList() {
  // Separate featured campaign
  const featuredCampaign = campaigns.find((c) => c.featured);
  const activeCampaigns = campaigns.filter((c) => !c.featured);

  return (
    <section id="campaigns" className="py-16 bg-gray-50">
      <div className="container px-6 lg:px-20 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">
              Support Causes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
              Active Campaigns
            </h2>
          </div>
          <button className="text-sm text-green-700 hover:text-green-800 font-bold flex items-center gap-1 hover:underline underline-offset-4">
            View All Campaigns
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Featured Campaign Section */}
        {featuredCampaign && (
          <div className="mb-12">
            <CampaignCard
              key={featuredCampaign.id}
              {...featuredCampaign}
              isFeatured={true}
            />
          </div>
        )}

        {/* Grid for Other Campaigns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCampaigns.map((item) => (
            <CampaignCard key={item.id} {...item} isFeatured={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
