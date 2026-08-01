'use server';

import { revalidatePath } from 'next/cache';
import { fetchWithAuth } from '../../_action/dashboardActions';


export async function getCategories() {
  try {
    const res = await fetchWithAuth('/categories', { method: 'GET' });
    return res;
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch categories' };
  }
}


export async function createCategory(name: string) {
  try {
    const res = await fetchWithAuth('/categories', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
    revalidatePath('/dashboard/admin/categories');
    return res;
  } catch (err: any) {
    return { error: err.message || 'Failed to create category' };
  }
}


export async function deleteCategory(id: string) {
  try {
    const res = await fetchWithAuth(`/categories/${id}`, {
      method: 'DELETE',
    });
    revalidatePath('/dashboard/admin/categories');
    return res;
  } catch (err: any) {
    return { error: err.message || 'Failed to delete category' };
  }
}