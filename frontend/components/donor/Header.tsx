"use client";

import { Button } from "@/components/ui/button";
import { Heart, Menu } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100/50 bg-white/90 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo - Now links to home */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1.5 bg-green-600 rounded-lg">
            <Heart className="h-5 w-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-green-900">GiveFlow</span>
        </Link>

        {/* Public Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link
            href="#campaigns"
            className="hover:text-green-700 transition-colors"
          >
            Campaigns
          </Link>
          <Link href="#" className="hover:text-green-700 transition-colors">
            How it Works
          </Link>
          <Link href="#" className="hover:text-green-700 transition-colors">
            For NGOs
          </Link>
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          <Link href="/auth" className="hidden sm:block">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-green-700 hover:bg-green-50"
            >
              Sign In
            </Button>
          </Link>

          <Link href="/auth">
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-200">
              Start Fundraiser
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full text-gray-600"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
