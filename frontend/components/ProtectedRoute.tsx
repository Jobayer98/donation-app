"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: ("DONOR" | "FUND_RAISER" | "ADMIN")[];
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    } else if (!loading && user && !allowedRoles.includes(user.role)) {
      router.push("/");
    }
  }, [user, loading, router, allowedRoles]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (!user || !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
