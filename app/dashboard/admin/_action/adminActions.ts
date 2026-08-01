'server only';

import { fetchWithAuth } from "../../_action/dashboardActions";

// ১. Fetch All Properties for Admin
export async function getAllPropertiesAdmin() {
  try {
    const res = await fetchWithAuth('/admin/properties', { method: 'GET' });
    return res;
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch properties' };
  }
}

// ২. Fetch All Rentals for Admin
export async function getAllRentalsAdmin() {
  try {
    const res = await fetchWithAuth('/admin/rentals', { method: 'GET' });
    return res;
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch rental requests' };
  }
}

// 1. Fetch Admin Overview Stats
export async function getAdminStats() {
  try {
    return await fetchWithAuth('/admin/stats');
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch admin stats' };
  }
}

// 2. Fetch Admin Users with Search, Filter & Pagination
export async function getAdminUsers(params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
}) {
  try {
    const query = new URLSearchParams();

    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.searchTerm) query.append('searchTerm', params.searchTerm);
    if (params?.role && params.role !== 'ALL') query.append('role', params.role);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return await fetchWithAuth(`/admin/users${queryString}`);
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch users' };
  }
}