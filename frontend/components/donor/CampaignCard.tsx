"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, User, UserX, ArrowRight, Heart } from "lucide-react";

interface CampaignCardProps {
  id: string | number;
  image: string;
  category: string;
  title: string;
  location: string;
  raised: number;
  goal: number;
  isFeatured?: boolean;
}

export default function CampaignCard({
  image,
  category,
  title,
  location,
  raised,
  goal,
  isFeatured = false,
}: CampaignCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const percentage = Math.round((raised / goal) * 100);

  // Featured Layout (Large Horizontal)
  if (isFeatured) {
    return (
      <div className="w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-green-100 flex flex-col md:flex-row group">
        {/* Image Side */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-white text-green-700 text-xs font-bold rounded-full shadow-sm uppercase tracking-wide">
              {category}
            </span>
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full shadow-sm flex items-center gap-1">
              <Heart className="h-3 w-3 fill-current" /> Featured
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <div className="flex items-center text-sm text-gray-500 gap-1 mb-4">
            <MapPin className="h-4 w-4 text-green-600" />
            <span>{location}</span>
          </div>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            This project has been handpicked by our team due to its urgent need
            and high transparency score. Your support can make an immediate
            difference.
          </p>

          {/* Progress */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-green-700 text-lg">
                ${raised.toLocaleString()}
              </span>
              <span className="text-gray-400 self-end">
                of ${goal.toLocaleString()}
              </span>
            </div>
            <Progress
              value={percentage}
              className="h-2.5 bg-green-100 [&>div]:bg-green-600"
            />
            <p className="text-xs text-gray-500">
              {percentage}% funded • 12 days left
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white shadow-md"
              >
                Donate to this Cause
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>

        {/* Re-adding Dialog for Featured Card to keep logic contained */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Choose Your Donation Method</DialogTitle>
              <DialogDescription>
                You can donate securely without an account, or sign in to track
                your impact history.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-4">
              {/* Same Donation Options as before */}
              <Button
                variant="outline"
                className="w-full h-auto py-4 justify-between border-green-200 hover:bg-green-50 hover:border-green-400 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <UserX className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-green-900">
                      Donate as Guest
                    </p>
                    <p className="text-xs text-gray-500">Quick, anonymous</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              <Button className="w-full h-auto py-4 justify-between bg-green-600 hover:bg-green-700 group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">Sign In & Donate</p>
                    <p className="text-xs text-white/80">Track your impact</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Default Layout (Vertical Card)
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
          <span className="absolute top-3 left-3 z-20 px-2.5 py-0.5 bg-white text-xs font-semibold text-green-700 rounded-full shadow-sm">
            {category}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center text-xs text-gray-500 gap-1 mb-4">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-green-700">${raised.toLocaleString()}</span>
              <span className="text-gray-400">{percentage}%</span>
            </div>
            <Progress
              value={percentage}
              className="h-1.5 bg-green-100 [&>div]:bg-green-600"
            />

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white">
                  Donate Now
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Dialog for Default Card */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Your Donation Method</DialogTitle>
            <DialogDescription>
              You can donate securely without an account, or sign in to track
              your impact history.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <Button
              variant="outline"
              className="w-full h-auto py-4 justify-between border-green-200 hover:bg-green-50 hover:border-green-400 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <UserX className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-green-900">
                    Donate as Guest
                  </p>
                  <p className="text-xs text-gray-500">Quick, anonymous</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button className="w-full h-auto py-4 justify-between bg-green-600 hover:bg-green-700 group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">Sign In & Donate</p>
                  <p className="text-xs text-white/80">Track your impact</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
