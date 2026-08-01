'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { fetchWithAuth } from '../../_action/dashboardActions';



// ---------------- TENANT ACTIONS ----------------

// Fetch Rental Requests
export async function getTenantRentals() {
  try {
    return await fetchWithAuth('/rentals');
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Fetch Payment History
export async function getTenantPayments() {
  try {
    return await fetchWithAuth('/payments');
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Create Payment Session
export async function createPaymentSession(rentalRequestId: string) {
  try {
    return await fetchWithAuth('/payments/create', {
      method: 'POST',
      body: JSON.stringify({ rentalRequestId }),
    });
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Submit Property Review
export async function submitPropertyReview(payload: { propertyId: string; rating: number; comment: string }) {
  try {
    const res = await fetchWithAuth('/reviews', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    revalidatePath('/dashboard/tenant');
    return res;
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}