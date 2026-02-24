"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  Percent,
  Shield,
  Bell,
  Server,
  AlertTriangle,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-500 text-sm">
          Manage global configuration and security.
        </p>
      </div>

      <Tabs defaultValue="fees" className="space-y-6">
        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg">
          <TabsTrigger
            value="fees"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-1.5 text-sm"
          >
            <Percent className="h-4 w-4 mr-2" /> Fees & Billing
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-1.5 text-sm"
          >
            <Shield className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger
            value="maintenance"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-1.5 text-sm"
          >
            <Server className="h-4 w-4 mr-2" /> Maintenance
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-1.5 text-sm"
          >
            <Bell className="h-4 w-4 mr-2" /> Alerts
          </TabsTrigger>
        </TabsList>

        {/* 1. Fees & Billing Settings */}
        <TabsContent value="fees">
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Model
              </h3>
              <p className="text-sm text-gray-500">
                Configure how the platform collects fees.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="platform-fee">Platform Fee (%)</Label>
                <Input
                  id="platform-fee"
                  type="number"
                  defaultValue="2.5"
                  className="bg-white"
                />
                <p className="text-xs text-gray-400">
                  Percentage taken from each donation.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="processor-fee">Payment Processor Fee (%)</Label>
                <Input
                  id="processor-fee"
                  type="number"
                  defaultValue="2.9"
                  readOnly
                  className="bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-400">
                  External fee (e.g., Stripe). Read-only for reference.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 gap-2"
                disabled={isLoading}
              >
                <Save className="h-4 w-4" /> Save Fee Structure
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* 2. Security Settings */}
        <TabsContent value="security">
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Security Controls
              </h3>
              <p className="text-sm text-gray-500">
                Manage platform-wide security policies.
              </p>
            </div>

            <div className="space-y-4">
              {/* 2FA Toggle */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50">
                <div>
                  <p className="font-medium text-gray-900">
                    Mandatory 2FA for NGOs
                  </p>
                  <p className="text-xs text-gray-500">
                    Require all organization admins to enable Two-Factor
                    Authentication.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              {/* IP Whitelist */}
              <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50">
                <div>
                  <p className="font-medium text-gray-900">Strict API Mode</p>
                  <p className="text-xs text-gray-500">
                    Block suspicious IP addresses automatically.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 3. Maintenance Mode */}
        <TabsContent value="maintenance">
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                System Status
              </h3>
              <p className="text-sm text-gray-500">
                Control site availability.
              </p>
            </div>

            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-yellow-800">Maintenance Mode</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Enabling this will make the site unavailable to the public.
                  Only admins can access the dashboard.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenance-msg">Maintenance Message</Label>
              <textarea
                id="maintenance-msg"
                rows={2}
                className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue="We are currently performing scheduled updates. Please check back soon."
              />
            </div>

            <Button variant="destructive" className="gap-2">
              <Server className="h-4 w-4" /> Enable Maintenance Mode
            </Button>
          </div>
        </TabsContent>

        {/* 4. Alert Notifications */}
        <TabsContent value="notifications">
          <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Admin Alerts
              </h3>
              <p className="text-sm text-gray-500">
                Configure when the system alerts the team.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    High Volume Alerts
                  </p>
                  <p className="text-xs text-gray-500">
                    Alert if donations exceed $50,000 in 1 hour.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Failed Payouts</p>
                  <p className="text-xs text-gray-500">
                    Alert if a Stripe transfer fails.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
