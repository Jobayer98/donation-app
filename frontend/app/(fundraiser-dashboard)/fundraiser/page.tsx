"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, Megaphone, Target } from "lucide-react";
import Link from "next/link";
import CreateCampaignModal from "@/components/fundraiser-dashboard/CreateCampaignModal";
import api from "@/lib/axios";

interface OverviewStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalRaised: number;
  totalDonors: number;
}

const recentActivity = [
  {
    id: 1,
    type: "donation",
    donor: "Sarah Connor",
    amount: "$250",
    campaign: "Clean Water",
    time: "5 mins ago",
  },
  {
    id: 2,
    type: "donation",
    donor: "Mike Ross",
    amount: "$50",
    campaign: "Education Fund",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "campaign",
    title: "New Campaign Created",
    campaign: "Save Forests",
    time: "2 hours ago",
  },
  {
    id: 4,
    type: "donation",
    donor: "Anonymous",
    amount: "$100",
    campaign: "Medical Aid",
    time: "3 hours ago",
  },
];

export default function FundraiserOverviewPage() {
  const [stats, setStats] = useState<OverviewStats>({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalRaised: 0,
    totalDonors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const res = await api.get("/dashboard/fundraiser/overview");
        setStats(res.data.data);
      } catch (error) {
        console.error("Failed to fetch overview:", error);
      } finally {
        setLoading(false);
      }
    };
    loadOverview();
  }, []);

  const statsCards = [
    {
      label: "Total Raised",
      value: `$${stats.totalRaised}`,
      icon: DollarSign,
      color: "green",
    },
    {
      label: "Total Donors",
      value: stats.totalDonors,
      icon: Users,
      color: "blue",
    },
    {
      label: "Active Campaigns",
      value: stats.activeCampaigns,
      icon: Megaphone,
      color: "purple",
    },
    {
      label: "Total Campaigns",
      value: stats.totalCampaigns,
      icon: Target,
      color: "orange",
    },
  ];
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Organization Overview
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back! Here is how your organization is performing.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/fundraiser/preview">
            <Button variant="outline" className="text-gray-600 gap-2">
              View Public Page
            </Button>
          </Link>

          {/* Replace the old button with the Modal Component */}
          <CreateCampaignModal />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-4 text-center py-8 text-gray-500">
            Loading stats...
          </div>
        ) : (
          statsCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div
                  className={`p-2 bg-${stat.color}-50 rounded-lg text-${stat.color}-600`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed (Takes 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Recent Activity</h3>
            <Button variant="link" size="sm" className="text-green-600">
              View All
            </Button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center ${
                      item.type === "donation"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {item.type === "donation" ? (
                      <DollarSign className="h-4 w-4" />
                    ) : (
                      <Megaphone className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">
                      {item.type === "donation"
                        ? `${item.donor} donated`
                        : item.title}
                    </p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
                {item.type === "donation" && (
                  <span className="text-sm font-bold text-green-600">
                    +{item.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Top Campaigns */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white shadow-lg">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="secondary"
                className="w-full bg-white/10 hover:bg-white/20 text-white justify-start gap-2"
              >
                <Megaphone className="h-4 w-4" /> Launch Campaign
              </Button>
              <Button
                variant="secondary"
                className="w-full bg-white/10 hover:bg-white/20 text-white justify-start gap-2"
              >
                <Users className="h-4 w-4" /> Invite Team
              </Button>
            </div>
          </div>

          {/* Top Performing Campaign */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-3">Top Campaign</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Clean Water Initiative</span>
                <span className="font-bold text-green-600">$45,000</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 text-right">90% of goal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
