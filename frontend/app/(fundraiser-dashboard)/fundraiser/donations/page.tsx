"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, Filter } from "lucide-react";

const donations = [
  {
    id: 1,
    donor: "John Doe",
    campaign: "Clean Ocean Project",
    amount: "$100",
    date: "Oct 24, 2023",
    type: "One-time",
  },
  {
    id: 2,
    donor: "Anonymous",
    campaign: "Feed the Children",
    amount: "$50",
    date: "Oct 23, 2023",
    type: "One-time",
  },
  {
    id: 3,
    donor: "Jane Smith",
    campaign: "Clean Ocean Project",
    amount: "$25",
    date: "Oct 22, 2023",
    type: "Monthly",
  },
];

export default function FundraiserDonationsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Incoming Donations
          </h1>
          <p className="text-gray-500 text-sm">
            Track funds received for your campaigns.
          </p>
        </div>
        <button className="flex items-center gap-2 text-sm border px-3 py-1.5 rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Total This Month</p>
          <p className="text-2xl font-bold text-green-600">$12,450</p>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Total Donors</p>
          <p className="text-2xl font-bold text-gray-900">320</p>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Avg. Donation</p>
          <p className="text-2xl font-bold text-gray-900">$38</p>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="divide-y">
          {donations.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <ArrowDownLeft className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.donor}</p>
                  <p className="text-xs text-gray-500">{item.campaign}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{item.amount}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${item.type === "Monthly" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}
                >
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
