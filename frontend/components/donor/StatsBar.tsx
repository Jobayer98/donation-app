"use client";
import React from "react";
import { HandCoins, Users, TrendingUp } from "lucide-react";

const stats = [
  { icon: HandCoins, label: "Total Donated", value: "$1.2M+" },
  { icon: Users, label: "Active Donors", value: "12,450" },
  { icon: TrendingUp, label: "Impact Score", value: "9.8" },
];

export default function StatsBar() {
  return (
    <section className="py-12 border-y border-green-50 bg-white">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-green-50/50 rounded-xl border border-green-100"
            >
              <div className="p-3 bg-white rounded-lg shadow-sm border border-green-100">
                <stat.icon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
