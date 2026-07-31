'use server';

import { revalidatePath } from 'next/cache';
import { fetchWithAuth } from '../../_action/dashboardActions';


export async function createProperty(data: {
  title: string;
  description: string;
  location: string;
  price: number;
  images: string;
  categoryId: string;
}) {
  try {
    const res = await fetchWithAuth('/landlord/properties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    revalidatePath('/dashboard/landlord');
    return res;
  } catch (err: any) {
    return { error: err.message || 'Failed to create property' };
  }
}


export async function getMyProperties() {
  try {
    const res = await fetchWithAuth('/landlord/requests', { method: 'GET' });
    return res;
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch properties' };
  }
}


export async function updateProperty(
  id: string,
  data: {
    title: string;
    description: string;
    location: string;
    price: number;
    categoryId: string;
    isAvailable: boolean;
  }
) {
  try {
    const res = await fetchWithAuth(`/landlord/properties/${id}`, {
      method: 'PUT', // or PATCH according to backend setup
      body: JSON.stringify(data),
    });
    revalidatePath('/dashboard/landlord');
    return res;
  } catch (err: any) {
    return { error: err.message || 'Failed to update property' };
  }
}


export async function deleteProperty(id: string) {
  try {
    const res = await fetchWithAuth(`/landlord/properties/${id}`, {
      method: 'DELETE',
    });
    revalidatePath('/dashboard/landlord');
    return res;
  } catch (err: any) {
    return { error: err.message || 'Failed to delete property' };
  }
}

export async function getLandlordRentalRequests() {
  try {
    const res = await fetchWithAuth('/rentals', { method: 'GET' });
    return { data: res };
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch rental requests' };
  }
}


export async function updateRentalRequestStatus(id: string, status: 'APPROVED' | 'REJECTED') {
  try {
    const res = await fetchWithAuth(`/landlord/requests/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });

    revalidatePath('/dashboard/landlord/requests');
    return { success: true, data: res };
  } catch (err: any) {
    return { error: err.message || 'Failed to update request status' };
  }
}

export async function getTenantHistory(tenantId: string) {
  try {
    const res = await fetchWithAuth(`/landlord/tenant-history/${tenantId}`, { method: 'GET' });
    return { success: true, data: res.data || res };
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch tenant history' };
  }
}