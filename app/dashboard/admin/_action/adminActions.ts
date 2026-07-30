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