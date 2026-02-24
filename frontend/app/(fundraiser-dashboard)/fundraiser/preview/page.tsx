"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, ArrowLeft, Edit } from "lucide-react";
import ProfileHeader from "@/components/public-profile/ProfileHeader";
import ProfileCampaignGrid from "@/components/public-profile/ProfileCampaignGrid";
import Link from "next/link";

// Mock Data fetching simulation
const orgData = {
  name: "Save The World Foundation",
  mission:
    "We are dedicated to environmental conservation and providing clean water to underserved communities globally.",
  location: "San Francisco, CA",
  website: "savetheworld.org",
  verified: true,
};

export default function PublicPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Preview Mode Banner */}
      <div className="sticky top-0 z-50 bg-yellow-50 border-b border-yellow-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-yellow-800">
          <Eye className="h-4 w-4" />
          <span className="text-sm font-medium">Preview Mode</span>
          <span className="text-xs text-yellow-600 hidden sm:inline">
            — This is how donors see your public profile.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/fundraiser/settings">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-yellow-800 border-yellow-300 hover:bg-yellow-100 hover:text-yellow-900"
            >
              <Edit className="h-3.5 w-3.5" /> Edit Page
            </Button>
          </Link>
          <Link href="/fundraiser">
            <Button
              variant="ghost"
              size="sm"
              className="text-yellow-800 hover:bg-yellow-100"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* The Actual Public Content */}
      <div>
        <ProfileHeader
          orgName={orgData.name}
          mission={orgData.mission}
          location={orgData.location}
          website={orgData.website}
          isVerified={orgData.verified}
        />

        {/* Stats Bar could go here */}

        <ProfileCampaignGrid />
      </div>
    </div>
  );
}
