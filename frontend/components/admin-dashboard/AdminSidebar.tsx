"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  LayoutDashboard,
  Building2,
  HandCoins,
  Settings,
  Shield,
  LogOut,
  User,
  CreditCard,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: User, label: "User", href: "/admin/users" },
  { icon: Building2, label: "Organizations", href: "/admin/organizations" },
  { icon: Package, label: "Plans", href: "/admin/plans" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: HandCoins, label: "Transactions", href: "/admin/donations" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex w-64 flex-col bg-slate-950 text-white h-screen sticky top-0 border-r border-slate-800">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-800">
        <div className="p-1.5 bg-white rounded-lg">
          <Leaf className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <span className="text-lg font-bold text-white block leading-tight">
            EcoKind
          </span>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
            Admin Portal
          </span>
        </div>
      </div>

      {/* Navigation */}
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

      {/* Admin User */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
            <Shield className="h-4 w-4 text-slate-300" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Super Admin</p>
          </div>
        </div>
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
