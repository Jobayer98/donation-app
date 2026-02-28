"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  LayoutDashboard,
  Megaphone,
  HandCoins,
  Wallet,
  Settings,
  LogOut,
  Building2,
  Globe,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/fundraiser" },
  { icon: Megaphone, label: "Campaigns", href: "/fundraiser/campaigns" },
  { icon: HandCoins, label: "Donations", href: "/fundraiser/donations" },
  { icon: Wallet, label: "Payouts", href: "/fundraiser/payouts" },
  { icon: Globe, label: "Landing Page", href: "/fundraiser/landing-page" },
  { icon: Settings, label: "Settings", href: "/fundraiser/settings" },
];

export default function FundraiserSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-white h-screen sticky top-0">
      {/* Logo Section */}
      <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-800">
        <div className="p-1.5 bg-green-500 rounded-lg">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold text-white">EcoKind</span>
      </div>

      {/* Org Profile Mini Card */}
      <div className="p-4 mx-3 mt-4 bg-slate-800 rounded-xl">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-slate-700">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>ORG</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold text-white">Save The World</p>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Building2 className="h-3 w-3" />
              NGO Account
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
                  ? "bg-green-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-400 hover:text-red-500 hover:bg-slate-800"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </aside>
  );
}
