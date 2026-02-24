"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ngos = [
  {
    id: 1,
    name: "Clean Water Initiative",
    email: "contact@cleanwater.org",
    status: "Active",
    raised: "$45,000",
  },
  {
    id: 2,
    name: "Education for All",
    email: "admin@eduall.org",
    status: "Pending Review",
    raised: "$0",
  },
  {
    id: 3,
    name: "Green Earth",
    email: "team@greenearth.org",
    status: "Suspended",
    raised: "$12,000",
  },
];

export default function AdminNGOsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Organization Management
        </h1>
        <p className="text-gray-500 text-sm">
          Verify and manage registered NGOs.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Organization
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Total Raised
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {ngos.map((ngo) => (
              <tr key={ngo.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                      {ngo.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{ngo.name}</p>
                      <p className="text-xs text-gray-500">{ngo.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge
                    className={`text-xs ${
                      ngo.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : ngo.status === "Pending Review"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {ngo.status}
                  </Badge>
                </td>
                <td className="p-4 text-sm text-gray-600">{ngo.raised}</td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Check className="h-4 w-4 text-green-600" /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
                        <X className="h-4 w-4" /> Suspend
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
  );
}
