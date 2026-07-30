
'use server';

import { cookies } from 'next/headers';

const BASE_URL = process.env.BACKEND_API_URL;

async function customFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const cookieStore = await cookies();
  

  const cookieHeader = cookieStore.toString(); 

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API Call Failed');
  }

  return response.json();
}

export async function fetchDashboardData(role: 'TENANT' | 'LANDLORD' | 'ADMIN') {
  try {
    if (role === 'TENANT') {
      const history = await customFetch<{ rentals: any[] }>('/tenants/my-rentals');
      return { rentals: history.rentals || [] };
    }

    if (role === 'LANDLORD') {
      const [properties, requests] = await Promise.all([
        customFetch<any[]>('/landlords/my-properties'),
        customFetch<any[]>('/landlords/rental-requests'),
      ]);
      return { properties: properties || [], requests: requests || [] };
    }

    if (role === 'ADMIN') {
      const [users, properties, requests] = await Promise.all([
        customFetch<any[]>('/admin/users'),
        customFetch<any[]>('/admin/properties'),
        customFetch<any[]>('/admin/rental-requests'),
      ]);
      return {
        users: users || [],
        properties: properties || [],
        requests: requests || [],
      };
    }
  } catch (err) {
    console.error('Error in fetchDashboardData:', err);
    throw err;
  }
}


export async function processPayment(rentalId: string) {
  return await customFetch<{ url: string }>('/payments/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify({ rentalId }),
  });
}

export async function submitReviewAction(data: { propertyId: string; rating: number; comment: string }) {
  return await customFetch<{ success: boolean }>('/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}


export async function updateRentalStatusAction(requestId: string, status: 'APPROVED' | 'REJECTED') {
  return await customFetch<{ success: boolean }>(`/rental-requests/${requestId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}


export async function deletePropertyAction(propertyId: string) {
  return await customFetch<{ success: boolean }>(`/admin/properties/${propertyId}`, {
    method: 'DELETE',
  });
}