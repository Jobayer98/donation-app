"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Save,
  Shield,
  Users,
  Building2,
  Mail,
  Trash2,
} from "lucide-react";

// Mock Team Members
const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@org.com",
    role: "Admin",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@org.com",
    role: "Editor",
    avatar: "https://github.com/shadcn.png",
  },
];

export default function FundraiserSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Organization Settings
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your organization profile, team, and preferences.
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
            value="team"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4 py-1.5 text-sm"
          >
            <Users className="h-4 w-4 mr-2" /> Team
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
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>ORG</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="gap-1.5">
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
                  defaultValue="Save The World Foundation"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Public Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="contact@savetheworld.org"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  type="url"
                  defaultValue="https://savetheworld.org"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <textarea
                  id="mission"
                  rows={3}
                  className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  defaultValue="Our mission is to empower communities and protect the environment for future generations."
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

        {/* Team Management Tab */}
        <TabsContent value="team">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">Team Members</h3>
                <p className="text-sm text-gray-500">
                  Manage who has access to your dashboard.
                </p>
              </div>
              <Button
                variant="outline"
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                + Invite Member
              </Button>
            </div>

            <div className="divide-y divide-gray-50">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal bg-gray-100 text-gray-600"
                    >
                      {member.role}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
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
              {/* Notification Toggle Item */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Donation Alerts
                  </p>
                  <p className="text-xs text-gray-500">
                    Receive an email for every new donation.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Campaign Milestones
                  </p>
                  <p className="text-xs text-gray-500">
                    Get notified when campaigns reach 50%, 75%, 100%.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
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
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
