"use client";

import React from "react";
import {
  DollarSign,
  Users,
  Building2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Revenue (Platform Fees)",
    value: "$124,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Total Donors",
    value: "24,500",
    change: "+3.2%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Active Organizations",
    value: "1,240",
    change: "+8",
    trend: "up",
    icon: Building2,
  },
  {
    label: "Donations Today",
    value: "1,230",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
        <p className="text-gray-500 text-sm">System-wide metrics and health.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                <stat.icon className="h-5 w-5" />
              </div>
              <span
                className={`text-xs font-medium flex items-center gap-0.5 ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links / Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold text-gray-900 mb-4">
            Recent Platform Activity
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              • New Organization{" "}
              <span className="font-medium text-gray-900">"Helping Hands"</span>{" "}
              registered.
            </p>
            <p>
              • Donation of{" "}
              <span className="font-medium text-gray-900">$5,000</span>{" "}
              processed via Stripe.
            </p>
            <p>
              • Payout initiated to{" "}
              <span className="font-medium text-gray-900">Clean Water Org</span>
              .
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">API Latency</span>{" "}
              <span className="text-green-600 font-medium text-sm">24ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Database Load</span>{" "}
              <span className="text-green-600 font-medium text-sm">12%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">CDN Status</span>{" "}
              <span className="text-green-600 font-medium text-sm">
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
