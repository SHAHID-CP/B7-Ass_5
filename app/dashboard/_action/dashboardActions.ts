'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

// ---------------- TENANT ACTIONS ----------------
export async function getTenantRentals() {
  try {
    return await fetchWithAuth('/rentals');
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function getTenantPayments() {
  try {
    return await fetchWithAuth('/payments');
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function createPaymentSession(requestId: string) {
  try {
    return await fetchWithAuth('/payments/create', {
      method: 'POST',
      body: JSON.stringify({ requestId }),
    });
  } catch (err: any) {
    return { error: err.message };
  }
}

// ---------------- LANDLORD ACTIONS ----------------
export async function getLandlordProperties() {
  try {
    return await fetchWithAuth('/landlord/properties');
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function createProperty(data: any) {
  try {
    const res = await fetchWithAuth('/landlord/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    revalidatePath('/dashboard/landlord');
    return res;
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function getLandlordRequests() {
  try {
    return await fetchWithAuth('/landlord/requests');
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateLandlordRequestStatus(requestId: string, status: 'APPROVED' | 'REJECTED') {
  try {
    const res = await fetchWithAuth(`/landlord/requests/${requestId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    revalidatePath('/dashboard/landlord/requests');
    return res;
  } catch (err: any) {
    return { error: err.message };
  }
}

// ---------------- ADMIN ACTIONS ----------------
export async function getAdminUsers() {
  try {
    return await fetchWithAuth('/admin/users');
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateAdminUserRole(userId: string, role: string) {
  try {
    const res = await fetchWithAuth(`/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
    revalidatePath('/dashboard/admin');
    return res;
  } catch (err: any) {
    return { error: err.message };
  }
}