/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, Users, Building2, TrendingUp } from "lucide-react";
import { adminApi } from "@/lib/api/admin";

export default function AdminOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([adminApi.getOverview(), adminApi.getRecentDonations(5)])
      .then(([overviewRes, donationsRes]) => {
        setData(overviewRes.data.data);
        setDonations(donationsRes.data.data.donations);
      })
      .catch(console.error);
  }, []);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
        <p className="text-gray-500 text-sm">System-wide metrics and health.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {data.totalUsers}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Total Users</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
              <Building2 className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {data.totalOrganizations}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Total Organizations</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {data.totalCampaigns}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Total Campaigns</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {data.activeCampaigns}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Active Campaigns</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {data.totalDonations}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Total Donations</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            ${data.totalRevenue.toLocaleString()}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Total Revenue</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border">
        <h3 className="font-bold text-gray-900 mb-4">Recent Donations</h3>
        <div className="space-y-3 text-sm">
          {donations.map((d) => (
            <div key={d.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{d.donorName}</p>
                <p className="text-xs text-gray-500">
                  {d.campaignTitle} • {d.organizationName}
                </p>
              </div>
              <span className="font-bold text-green-600">${d.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
