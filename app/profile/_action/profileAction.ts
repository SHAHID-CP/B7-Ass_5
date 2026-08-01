import { fetchWithAuth } from "@/app/dashboard/_action/dashboardActions";

export async function getCurrentUserProfile() {
  try {
    return await fetchWithAuth('/auth/me');
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch profile' };
  }
}


export async function updateUserProfile(data: {
  name?: string;
  phoneNumber?: string;
  profileImage?: string;
}) {
  try {
    return await fetchWithAuth('/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  } catch (err: any) {
    return { error: err.message || 'Failed to update profile' };
  }
}