"use client";

import React, { useState, useEffect } from "react";
import { ArrowDownLeft, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";

interface Donation {
  id: string;
  amount: string;
  donorName: string;
  status: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
}

interface DonationStats {
  totalDonor: number;
  totalDonationThisMonth: string;
  totalDonationCountThisMonth: number;
}

export default function FundraiserDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DonationStats>({
    totalDonor: 0,
    totalDonationThisMonth: "0",
    totalDonationCountThisMonth: 0,
  });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
  });

  const loadDonations = async (page: number) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/dashboard/fundraiser/donations?page=${page}&limit=10`,
      );
      const responseData = res.data.data;
      setDonations(
        Array.isArray(responseData.donations) ? responseData.donations : [],
      );
      if (responseData.pagination) {
        setPagination(responseData.pagination);
      }
      setStats({
        totalDonor: responseData.totalDonors || 0,
        totalDonationThisMonth: responseData.totalDonationThisMonth || "0",
        totalDonationCountThisMonth:
          responseData.totalDonationCountThisMonth || 0,
      });
    } catch (error) {
      console.error("Failed to fetch donations:", error);
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations(1);
  }, []);

  const totalPages = Math.ceil(pagination.total / pagination.limit);
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Total This Month</p>
          <p className="text-2xl font-bold text-green-600">
            ${stats.totalDonationThisMonth}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Donations Count</p>
          <p className="text-2xl font-bold text-blue-600">
            {stats.totalDonationCountThisMonth}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Total Donors</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalDonor}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Avg. Donation</p>
          <p className="text-2xl font-bold text-gray-900">
            $
            {stats.totalDonationCountThisMonth > 0
              ? (
                  parseFloat(stats.totalDonationThisMonth) /
                  stats.totalDonationCountThisMonth
                ).toFixed(2)
              : "0"}
          </p>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading donations...
          </div>
        ) : donations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No donations yet</div>
        ) : (
          <>
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
                      <p className="font-medium text-gray-900">
                        {item.donorName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${item.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <p className="text-sm text-gray-500">
                  Showing {donations.length} of {pagination.total} donations
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadDonations(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="px-3 py-1 text-sm">
                    Page {pagination.page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadDonations(pagination.page + 1)}
                    disabled={pagination.page === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
