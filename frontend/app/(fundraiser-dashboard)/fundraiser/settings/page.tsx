/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Building2, Mail } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function FundraiserSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [orgData, setOrgData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    mission: "",
    domain: "",
    logo: "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [notifPrefs, setNotifPrefs] = useState({
    donationAlert: false,
    donationAlertEmail: false,
    weeklySummary: false,
    monthlySummary: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orgRes, notifRes] = await Promise.all([
          api.get("/organizations"),
          api.get("/organizations/notification-preferences"),
        ]);

        const org = orgRes.data.data;
        setOrgData({
          id: org.id,
          name: org.name || "",
          email: org.email || "",
          phone: org.phone || "",
          mission: org.description || "",
          domain: org.customDomain || "",
          logo: org.logo || "",
        });

        setNotifPrefs(notifRes.data.data);
      } catch (error) {
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", orgData.name);
      formData.append("email", orgData.email);
      formData.append("phone", orgData.phone);
      formData.append("description", orgData.mission);
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      await api.patch(`/organizations/${orgData.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Organization updated successfully");
    } catch (error) {
      toast.error("Failed to update organization");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotifToggle = async (key: keyof typeof notifPrefs) => {
    const newPrefs = { ...notifPrefs, [key]: !notifPrefs[key] };
    setNotifPrefs(newPrefs);
    try {
      const res = await api.patch(
        `/organizations/${orgData.id}/notification-preferences`,
        newPrefs,
      );
      toast.success(res.data.message || "Notification preferences updated");
    } catch (error: any) {
      setNotifPrefs(notifPrefs);
      toast.error(
        error.response?.data?.message || "Failed to update preferences",
      );
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Organization Settings
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your organization profile and preferences.
        </p>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg">
          <TabsTrigger
            value="organization"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-1.5 text-sm"
          >
            <Building2 className="h-4 w-4 mr-2" /> Organization
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-1.5 text-sm"
          >
            <Mail className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
        </TabsList>

        {/* Organization Profile Tab */}
        <TabsContent value="organization">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
            {/* Logo Section */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Avatar className="h-20 w-20 rounded-lg">
                <AvatarImage
                  src={
                    logoPreview ||
                    orgData.logo ||
                    "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>ORG</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => document.getElementById("logo")?.click()}
                  type="button"
                >
                  <Camera className="h-3.5 w-3.5" /> Change Logo
                </Button>
                <p className="text-xs text-gray-400">
                  Square image, at least 200x200px.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  value={orgData.name}
                  onChange={(e) =>
                    setOrgData({ ...orgData, name: e.target.value })
                  }
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Public Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={orgData.email}
                  onChange={(e) =>
                    setOrgData({ ...orgData, email: e.target.value })
                  }
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={orgData.phone}
                  onChange={(e) =>
                    setOrgData({ ...orgData, phone: e.target.value })
                  }
                  className="bg-white"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <textarea
                  id="mission"
                  rows={3}
                  className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={orgData.mission}
                  onChange={(e) =>
                    setOrgData({ ...orgData, mission: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 gap-2"
                disabled={isLoading}
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
            <h3 className="font-semibold text-gray-900">
              Notification Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Donation Alerts
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive push notification for every new donation.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifPrefs.donationAlert}
                    onChange={() => handleNotifToggle("donationAlert")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Donation Email Alerts
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive an email for every new donation.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifPrefs.donationAlertEmail}
                    onChange={() => handleNotifToggle("donationAlertEmail")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Weekly Summary
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive a weekly performance report.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifPrefs.weeklySummary}
                    onChange={() => handleNotifToggle("weeklySummary")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Monthly Summary
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive a monthly performance report.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifPrefs.monthlySummary}
                    onChange={() => handleNotifToggle("monthlySummary")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
