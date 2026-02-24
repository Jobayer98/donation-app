"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowUpRight, Filter, Download } from "lucide-react";

// Mock Data for Donations
const donations = [
  {
    id: "DON-001",
    campaign: "Emergency Flood Relief",
    amount: 250,
    date: "Oct 24, 2023",
    status: "Completed",
    method: "Visa •••• 4242",
    recurring: false,
  },
  {
    id: "DON-002",
    campaign: "Clean Water for All",
    amount: 50,
    date: "Oct 18, 2023",
    status: "Completed",
    method: "Visa •••• 4242",
    recurring: true,
  },
  {
    id: "DON-003",
    campaign: "School Supplies Drive",
    amount: 100,
    date: "Oct 10, 2023",
    status: "Pending",
    method: "Bank Transfer",
    recurring: false,
  },
  {
    id: "DON-004",
    campaign: "Save the Forests",
    amount: 75,
    date: "Sep 28, 2023",
    status: "Completed",
    method: "Mastercard •••• 5555",
    recurring: false,
  },
];

export default function MyDonationsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Donations</h1>
          <p className="text-gray-500 text-sm">
            A complete history of your contributions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 text-gray-600">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" className="gap-2 text-gray-600">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Donations List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {donations.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.campaign}
                        </p>
                        {item.recurring && (
                          <span className="text-xs text-blue-600 font-medium">
                            Recurring
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-500 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {item.date}
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-900">
                    ${item.amount}
                  </td>
                  <td className="p-4 text-sm text-gray-500">{item.method}</td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        item.status === "Completed"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:bg-green-50 hover:text-green-700"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
