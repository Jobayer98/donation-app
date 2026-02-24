"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, Search } from "lucide-react";

// Mock Data
const invoices = [
  {
    id: "INV-2023-001",
    date: "Oct 24, 2023",
    amount: "$250.00",
    status: "Paid",
    campaign: "Emergency Flood Relief",
  },
  {
    id: "INV-2023-002",
    date: "Oct 18, 2023",
    amount: "$50.00",
    status: "Paid",
    campaign: "Clean Water for All",
  },
  {
    id: "INV-2023-003",
    date: "Sep 05, 2023",
    amount: "$120.00",
    status: "Paid",
    campaign: "Education Fund",
  },
  {
    id: "INV-2023-004",
    date: "Aug 22, 2023",
    amount: "$75.00",
    status: "Paid",
    campaign: "Animal Shelter",
  },
];

export default function InvoicesPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Invoices & Receipts
          </h1>
          <p className="text-gray-500 text-sm">
            Download your official tax receipts.
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Invoice List */}
      <div className="space-y-3">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg hidden sm:block">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{invoice.id}</p>
                <p className="text-sm text-gray-500">{invoice.campaign}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:gap-8">
              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-500">{invoice.date}</p>
                <p className="font-bold text-gray-900">{invoice.amount}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-green-600 text-green-600 hover:bg-green-50"
              >
                <Download className="h-3.5 w-3.5" /> PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
