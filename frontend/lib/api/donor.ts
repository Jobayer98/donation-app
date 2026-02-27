/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../axios";

const BASE_URL = "/donor";

export const donorApi = {
  // Dashboard
  getStats: () => api.get(`${BASE_URL}/stats`),

  // Donations
  getDonations: () => api.get(`${BASE_URL}/donations`),
  createDonation: (data: any) => api.post(`${BASE_URL}/donations`, data),

  // Invoices
  getInvoices: () => api.get(`${BASE_URL}/invoices`),
};
