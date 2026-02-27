"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminApi } from "@/lib/api/admin";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  organizationCount: number;
  totalCampaigns: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    adminApi
      .getUsers(page, 20)
      .then((res) => {
        setUsers(res.data.data.users);
        setTotalPages(res.data.data.totalPages);
      })
      .catch(console.error);
  }, [page]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await adminApi.updateUserRole(userId, newRole);
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
      );
      toast.success("User role updated successfully");
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500 text-sm">
          Manage user roles and permissions.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                User
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Role
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Organizations
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Campaigns
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                Joined
              </th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge
                    className={`text-xs ${
                      user.role === "ADMIN"
                        ? "bg-purple-50 text-purple-700"
                        : user.role === "FUNDRAISER"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-green-50 text-green-700"
                    }`}
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {user.organizationCount}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {user.totalCampaigns}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user.role !== "ADMIN" && (
                        <DropdownMenuItem
                          onClick={() => handleRoleChange(user.id, "ADMIN")}
                        >
                          Make Admin
                        </DropdownMenuItem>
                      )}
                      {user.role !== "FUNDRAISER" && (
                        <DropdownMenuItem
                          onClick={() =>
                            handleRoleChange(user.id, "FUNDRAISER")
                          }
                        >
                          Make Fundraiser
                        </DropdownMenuItem>
                      )}
                      {user.role !== "DONOR" && (
                        <DropdownMenuItem
                          onClick={() => handleRoleChange(user.id, "DONOR")}
                        >
                          Make Donor
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-4 border-t">
          <Button variant="outline" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
            Previous
          </Button>
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          <Button variant="outline" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
