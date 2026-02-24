"use client";

import CampaignCard from "../donor/CampaignCard";

// Mock Data for this Organization
const campaigns = [
  {
    id: 1,
    category: "Environment",
    title: "Clean Ocean Project",
    location: "Pacific Ocean",
    raised: 12000,
    goal: 20000,
    image:
      "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    category: "Education",
    title: "School Supplies for 500 Kids",
    location: "Kenya",
    raised: 5000,
    goal: 5000,
    image:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    category: "Medical",
    title: "Mobile Clinic Fund",
    location: "Remote Areas",
    raised: 2000,
    goal: 10000,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProfileCampaignGrid() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Active Campaigns
            </h2>
            <p className="text-gray-500">Support our ongoing initiatives</p>
          </div>
          {/* Filter or Sort could go here */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => (
            <CampaignCard key={camp.id} {...camp} />
          ))}
        </div>
      </div>
    </section>
  );
}
