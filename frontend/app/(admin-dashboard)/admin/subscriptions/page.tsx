"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminApi } from "@/lib/api/admin";
import { TrendingUp, Users, XCircle } from "lucide-react";

interface Subscription {
  id: string;
  organizationId: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  plan: {
    id: string;
    name: string;
    type: string;
    price: string;
  };
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    Promise.all([
      adminApi.getSubscriptions(page, 20),
      adminApi.getSubscriptionStats()
    ])
      .then(([subsRes, statsRes]) => {
        setSubscriptions(subsRes.data.data.subscriptions);
        setTotalPages(subsRes.data.data.totalPages);
        setStats(statsRes.data.data);
      })
      .catch(console.error);
  }, [page]);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-500 text-sm">Monitor active subscriptions and revenue.</p>
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
            <p className="text-xs text-gray-500 mt-1">Total Subscriptions</p>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
            <p className="text-xs text-gray-500 mt-1">Active Subscriptions</p>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                <XCircle className="h-5 w-5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.canceled}</h3>
            <p className="text-xs text-gray-500 mt-1">Canceled Subscriptions</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Plan</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Price</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Start Date</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">End Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="p-4 text-sm font-medium text-gray-900">{sub.plan.name}</td>
                <td className="p-4 text-sm text-gray-600">{sub.plan.type}</td>
                <td className="p-4">
                  <Badge className={`text-xs ${
                    sub.status === "ACTIVE" ? "bg-green-50 text-green-700" :
                    sub.status === "EXPIRED" ? "bg-red-50 text-red-700" :
                    "bg-yellow-50 text-yellow-700"
                  }`}>
                    {sub.status}
                  </Badge>
                </td>
                <td className="p-4 text-sm font-bold text-green-600">${sub.plan.price}</td>
                <td className="p-4 text-sm text-gray-500">{new Date(sub.currentPeriodStart).toLocaleDateString()}</td>
                <td className="p-4 text-sm text-gray-500">{new Date(sub.currentPeriodEnd).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-4 border-t">
          <Button variant="outline" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
            Previous
          </Button>
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          <Button variant="outline" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
