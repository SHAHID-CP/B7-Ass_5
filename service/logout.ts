"use server"

import { fetchWithAuth } from "@/app/dashboard/_action/dashboardActions";
import { cookies } from "next/headers";

export const logout = async () => {
    const cookieStore = await cookies();
    
    try {
        await fetchWithAuth('/auth/logout', {
          method: 'POST'
        });
      } catch (err: any) {
        return { error: err.message || 'Failed to create category' };
      }finally {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
      }

}