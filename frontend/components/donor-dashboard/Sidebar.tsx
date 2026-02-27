"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  LayoutDashboard,
  Heart,
  Receipt,
  Settings,
  LogOut,
  BadgeCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Heart, label: "My Donations", href: "/dashboard/donations" },
  { icon: Receipt, label: "Invoices", href: "/dashboard/invoices" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-100 h-screen sticky top-0">
      {/* Logo Section */}
      <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-100">
        <div className="p-1.5 bg-green-600 rounded-lg">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">EcoKind</span>
      </div>

      {/* User Profile Mini Card */}
      <div className="p-4 mx-3 mt-4 bg-green-50 rounded-xl border border-green-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold text-gray-900">John Doe</p>
            <div className="flex items-center gap-1 text-xs text-green-700">
              <BadgeCheck className="h-3 w-3 fill-green-500 text-white" />
              Gold Donor
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-green-600 text-white shadow-md shadow-green-200"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-500 hover:text-red-600 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </aside>
  );
}
