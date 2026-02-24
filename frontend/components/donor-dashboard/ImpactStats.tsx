"use client";

import React from "react";
import { HandCoins, Heart, Sparkles, Trophy } from "lucide-react";

const stats = [
  {
    label: "Total Donated",
    value: "$12,450",
    icon: HandCoins,
    trend: "+$500 this month",
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Causes Supported",
    value: "24",
    icon: Heart,
    trend: "3 active",
    color: "bg-teal-100 text-teal-700",
  },
  {
    label: "Impact Score",
    value: "9.8",
    icon: Sparkles,
    trend: "Excellent",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    label: "Global Rank",
    value: "#142",
    icon: Trophy,
    trend: "Top 5%",
    color: "bg-purple-100 text-purple-700",
  },
];

export default function ImpactStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          <p className="text-xs text-green-600 mt-2 font-medium">
            {stat.trend}
          </p>
        </div>
      ))}
    </div>
  );
}
