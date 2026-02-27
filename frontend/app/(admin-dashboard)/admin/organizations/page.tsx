"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminApi } from "@/lib/api/admin";

export default function AdminNGOsPage() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    adminApi
      .getOrganizations(page, 20)
      .then((res) => {
        setOrganizations(res.data.data.organizations);
        setHasMore(res.data.data.length === 20);
      })
      .catch(console.error);
  }, [page]);

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
                Plan
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Campaigns
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {organizations.map((org) => (
              <tr key={org.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                      {org.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{org.name}</p>
                      <p className="text-xs text-gray-500">{org.ownerEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge
                    className={`text-xs ${org.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                  >
                    {org.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {org.planName || "No Plan"}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {org.campaignCount}
                </td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>
                        {org.isActive ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-4 border-t">
          <Button
            variant="outline"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">Page {page}</span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasMore}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
