"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const donations = [
  {
    id: 1,
    campaign: "Clean Water Initiative",
    amount: "$100",
    date: "Oct 24, 2023",
    status: "Completed",
  },
  {
    id: 2,
    campaign: "School Supplies for Kids",
    amount: "$50",
    date: "Oct 18, 2023",
    status: "Completed",
  },
  {
    id: 3,
    campaign: "Emergency Flood Relief",
    amount: "$250",
    date: "Oct 10, 2023",
    status: "Completed",
  },
];

export default function RecentDonations() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h3 className="font-bold text-gray-900">Recent Donations</h3>
        <button className="text-xs text-green-600 hover:underline font-medium flex items-center gap-1">
          View All <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      <div className="divide-y divide-gray-50">
        {donations.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.campaign}
                </p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{item.amount}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
