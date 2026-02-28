/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../axios";

const BASE_URL = "/fundraiser";

export const fundraiserApi = {
  // Overview
  getOverview: () => api.get(`${BASE_URL}/overview`),

  // Campaigns
  getCampaigns: () => api.get(`${BASE_URL}/campaigns`),
  getTopCampaigns: () => api.get(`${BASE_URL}/campaigns/top`),
  getCampaignById: (id: string) => api.get(`${BASE_URL}/campaigns/${id}`),
  createCampaign: (data: any) => api.post(`${BASE_URL}/campaigns`, data),
  updateCampaign: (id: string, data: any) =>
    api.put(`${BASE_URL}/campaigns/${id}`, data),
  publishCampaign: (id: string) =>
    api.patch(`${BASE_URL}/campaigns/${id}/publish`),
  closeCampaign: (id: string) => api.patch(`${BASE_URL}/campaigns/${id}/close`),

  // Donations
  getDonations: () => api.get(`${BASE_URL}/donations`),

  // Payment Providers
  getPaymentProviders: () => api.get(`${BASE_URL}/payment-providers`),
  createPaymentProvider: (data: any) =>
    api.post(`${BASE_URL}/payment-providers`, data),
  updatePaymentProvider: (id: string, data: any) =>
    api.put(`${BASE_URL}/payment-providers/${id}`, data),
  setDefaultProvider: (id: string) =>
    api.patch(`${BASE_URL}/payment-providers/${id}/default`),
  toggleProviderStatus: (id: string) =>
    api.patch(`${BASE_URL}/payment-providers/${id}/toggle`),
  deletePaymentProvider: (id: string) =>
    api.delete(`${BASE_URL}/payment-providers/${id}`),

  // Payouts
  getPayouts: () => api.get(`${BASE_URL}/payouts`),

  // Landing Page
  getLandingPageContent: () => api.get(`/landing-page/manage`),
  updateLandingPageContent: (data: FormData) =>
    api.patch(`/landing-page/manage`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Organization
  getOrganization: () => api.get(`/organizations`),
};
