/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../axios";

export const adminApi = {
  getOverview: () => api.get("/v1/admin/overview"),
  getCampaigns: (status?: string) =>
    api.get("/v1/admin/campaigns", { params: { status } }),
  updateCampaignStatus: (id: string, status: string) =>
    api.patch(`/v1/admin/campaigns/${id}/status`, { status }),
  getUsers: (page?: number, limit?: number) => api.get("/v1/admin/users", { params: { page, limit } }),
  updateUserRole: (id: string, role: string) =>
    api.patch(`/v1/admin/users/${id}/role`, { role }),
  getOrganizations: (page?: number, limit?: number) =>
    api.get("/v1/admin/organizations", { params: { page, limit } }),
  getRecentDonations: (page?: number, limit?: number) =>
    api.get("/v1/admin/donations/recent", { params: { page, limit } }),
  getPlans: () => api.get("/v1/admin/plans"),
  createPlan: (data: any) => api.post("/v1/admin/plans", data),
  updatePlan: (id: string, data: any) => api.put(`/v1/admin/plans/${id}`, data),
  togglePlanStatus: (id: string) => api.patch(`/v1/admin/plans/${id}/toggle`),
  getSubscriptions: (page?: number, limit?: number) =>
    api.get("/v1/admin/subscriptions", { params: { page, limit } }),
  getSubscriptionStats: () => api.get("/v1/admin/subscriptions/stats"),
};
