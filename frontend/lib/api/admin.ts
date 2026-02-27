/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../axios";

const BASE_URL = "/v1/admin";

export const adminApi = {
  // Overview
  getOverview: () => api.get(`${BASE_URL}/overview`),

  // Campaigns
  getCampaigns: (status?: string) =>
    api.get(`${BASE_URL}/campaigns`, { params: { status } }),
  updateCampaignStatus: (id: string, status: string) =>
    api.patch(`${BASE_URL}/campaigns/${id}/status`, { status }),

  // Users
  getUsers: (page?: number, limit?: number) =>
    api.get(`${BASE_URL}/users`, { params: { page, limit } }),
  updateUserRole: (id: string, role: string) =>
    api.patch(`${BASE_URL}/users/${id}/role`, { role }),

  // Organizations
  getOrganizations: (page?: number, limit?: number) =>
    api.get(`${BASE_URL}/organizations`, { params: { page, limit } }),

  // Donations
  getRecentDonations: (page?: number, limit?: number) =>
    api.get(`${BASE_URL}/donations/recent`, { params: { page, limit } }),

  // Plans
  getPlans: () => api.get(`${BASE_URL}/plans`),
  createPlan: (data: any) => api.post(`${BASE_URL}/plans`, data),
  updatePlan: (id: string, data: any) => api.put(`${BASE_URL}/plans/${id}`, data),
  togglePlanStatus: (id: string) => api.patch(`${BASE_URL}/plans/${id}/toggle`),

  // Subscriptions
  getSubscriptions: (page?: number, limit?: number) =>
    api.get(`${BASE_URL}/subscriptions`, { params: { page, limit } }),
  getSubscriptionStats: () => api.get(`${BASE_URL}/subscriptions/stats`),
};
