'use server';

import { fetchWithAuth } from "@/app/dashboard/_action/dashboardActions";

// ১. Fetch All Properties (with Query Parameters)
export async function getProperties(params?: {
  location?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  categoryId?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const query = new URLSearchParams();
    if (params?.location) query.append('location', params.location);
    if (params?.minPrice) query.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) query.append('maxPrice', params.maxPrice.toString());
    if (params?.categoryId) query.append('categoryId', params.categoryId);
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());

    // const url = `${BASE_URL}/api/properties?${query.toString()}`;
    // const res = await fetch(url, { cache: 'no-store' });

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties?${query.toString()}`, {
      cache: "no-store", // Realtime search results
    });
    if (!res.ok) return [];
    const data = await res.json();

    return { success: true, data: data?.data?.items || data?.data || [] };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch properties' };
  }
}

// ২. Fetch Single Property Details by ID
export async function getPropertyById(id: string) {
  try {
    // const res = await fetch(`${BASE_URL}/api/properties/${id}`, { cache: 'no-store' });

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
      cache: "no-store", // Realtime search results
    });
    if (!res.ok) return [];

    const data = await res.json();
    return { success: true, data: data?.data };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch property details' };
  }
}

// ৩. Fetch All Categories
export async function getCategories() {
  try {
    // const res = await fetch(`${BASE_URL}/api/categories`, { cache: 'no-store' });

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      next: { revalidate: 3600 }, // 1 hour caching
    });
    if (!res.ok) return [];
    const data = await res.json();
    return { success: true, data: data?.data || [] };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to fetch categories' };
  }
}


export async function createRentalRequests(propertyId: string) {
  try {
    const res = await fetchWithAuth('/rentals', {
          method: 'POST',
          body: JSON.stringify({ propertyId }),
        });
    return  res ;
  } catch (err: any) {
    return { success: false, error: err.message || 'Something went wrong' };
  }
}