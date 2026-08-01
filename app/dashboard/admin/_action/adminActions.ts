'server only';

import { fetchWithAuth } from "../../_action/dashboardActions";

export async function getAllPropertiesAdmin() {
  try {
    const res = await fetchWithAuth('/admin/properties', { method: 'GET' });
    return res;
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch properties' };
  }
}

export async function getAllRentalsAdmin() {
  try {
    const res = await fetchWithAuth('/admin/rentals', { method: 'GET' });
    return res;
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch rental requests' };
  }
}


export async function getAdminStats() {
  try {
    return await fetchWithAuth('/admin/stats');
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch admin stats' };
  }
}


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