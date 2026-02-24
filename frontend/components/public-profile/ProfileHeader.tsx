"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Link as LinkIcon, CheckCircle } from "lucide-react";

interface ProfileHeaderProps {
  orgName: string;
  mission: string;
  location: string;
  website: string;
  isVerified: boolean;
}

export default function ProfileHeader({
  orgName,
  mission,
  location,
  website,
  isVerified,
}: ProfileHeaderProps) {
  return (
    <section className="relative bg-gradient-to-br from-green-700 to-teal-600 text-white">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>

      <div className="container mx-auto px-6 lg:px-20 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar / Branding Area */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center text-green-600 border-4 border-white/20">
              {/* Placeholder for Org Logo */}
              <span className="text-4xl font-bold">{orgName.charAt(0)}</span>
            </div>
            {isVerified && (
              <Badge className="bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm gap-1">
                <CheckCircle className="h-3 w-3 fill-white text-green-600" />{" "}
                Verified Organization
              </Badge>
            )}
          </div>

          {/* Info Area */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              {orgName}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/80 mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {location}
              </span>
              <a href="#" className="flex items-center gap-1 hover:underline">
                <LinkIcon className="h-4 w-4" /> {website}
              </a>
            </div>
            <p className="max-w-2xl text-white/90 text-lg leading-relaxed">
              {mission}
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-6">
              <Button className="bg-white text-green-700 hover:bg-gray-100 shadow-lg">
                Donate Now
              </Button>
              <Button
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10"
              >
                Share Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
