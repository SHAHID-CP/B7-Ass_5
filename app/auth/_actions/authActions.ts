"use server"

import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type RegisterState = {
    success?: boolean;
    statusCode?: number;
    message?: string;
    data?: {
        accessToken: string;
        refreshToken: string;
    };
} | null;

export const registerAction = async (prevState: RegisterState, formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role") || "TENANT";

    const payload = {
        name,
        email,
        password,
        role
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success && result.data) {
        const cookieStore = await cookies();

        // Security-wise safe HTTP-only Cookies
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 1 day
            sameSite: "lax",
            path: "/"
        });

        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            sameSite: "lax",
            path: "/"
        });

        // Decode JWT to route based on Role
        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
        const userRole = decodedToken?.role || role;

        if (userRole === "ADMIN") {
            redirect("/dashboard/admin");
        } else if (userRole === "LANDLORD") {
            redirect("/dashboard/landlord");
        } else {
            redirect("/dashboard/tenant");
        }
    }

    return result;
}


export const loginAction = async (redirectTo: string, prevState: RegisterState, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
        email,
        password
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    // console.log(res.headers.get("set-cookie"));

    const result = await res.json();

    if (result.success && result.data) {
        const cookieStore = await cookies();

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 1 day
            sameSite: "lax",
            path: "/"
        });

        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            sameSite: "lax",
            path: "/"
        });

    
        if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
            redirect(redirectTo);
        }

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
        const userRole = decodedToken?.role;

        if (userRole === "ADMIN") {
            redirect("/dashboard/admin");
        } else if (userRole === "LANDLORD") {
            redirect("/dashboard/landlord");
        } else {
            redirect("/dashboard/tenant");
        }
    }

    return result;
}