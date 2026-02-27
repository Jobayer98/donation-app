/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/lib/api/admin";

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    adminApi
      .getRecentDonations(page, 20)
      .then((res) => {
        setDonations(res.data.data.donations);
        setHasMore(res.data.data.length === 20);
      })
      .catch(console.error);
  }, [page]);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Transactions</h1>
        <p className="text-gray-500 text-sm">
          Monitor financial flows and platform fees.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Donor
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Campaign
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Organization
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Amount
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {donations.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {d.donorName}
                      </p>
                      {d.donorEmail && (
                        <p className="text-xs text-gray-500">{d.donorEmail}</p>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {d.campaignTitle}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {d.organizationName}
                  </td>
                  <td className="p-4 text-sm font-bold text-green-600">
                    ${d.amount}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
