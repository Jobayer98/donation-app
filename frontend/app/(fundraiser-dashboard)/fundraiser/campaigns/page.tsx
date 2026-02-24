"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const campaigns = [
  {
    id: 1,
    title: "Clean Ocean Project",
    status: "Active",
    raised: "$12,500",
    goal: "$20,000",
    date: "Oct 15, 2023",
  },
  {
    id: 2,
    title: "Feed the Children",
    status: "Pending Review",
    raised: "$0",
    goal: "$50,000",
    date: "Oct 20, 2023",
  },
  {
    id: 3,
    title: "School Renovation",
    status: "Completed",
    raised: "$35,000",
    goal: "$35,000",
    date: "Sep 05, 2023",
  },
];

export default function CampaignsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Campaign Management
          </h1>
          <p className="text-gray-500 text-sm">
            Create, edit, and track your fundraising campaigns.
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 gap-2 shadow-md">
          <Plus className="h-4 w-4" /> Create Campaign
        </Button>
      </div>

      {/* Campaigns List/Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Campaign Name
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Progress
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Created
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {campaigns.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{item.title}</p>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        item.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : item.status === "Completed"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {item.raised} / {item.goal}
                  </td>
                  <td className="p-4 text-sm text-gray-500">{item.date}</td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" /> Edit Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
