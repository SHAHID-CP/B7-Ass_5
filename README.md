# 🏡 RentNest — Modern House Rental Platform
 
RentNest is a full-featured, responsive, and intuitive real-estate rental platform built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**.
 
It connects tenants searching for apartments, flats, and rooms with verified landlords and administrators in an effortless digital environment.
 
---
 
## 🔗 Live Demo
 
- **Live Site:** [https://rental-management-rent-nest.vercel.app/](https://rental-management-rent-nest.vercel.app/)
- **Backend API:** [https://prisma-ass-4.vercel.app/](https://prisma-ass-4.vercel.app/)
- **Backend Repo:** [https://github.com/SHAHID-CP/B7-Ass_4](https://github.com/SHAHID-CP/B7-Ass_4)
> ⚠️ Replace the links above with your actual deployed URLs.
 
---
 
## 🔑 Admin Credentials
 
For testing/grading purposes, use the following admin login on the live site:
 
| Field    | Value                                            |
| -------- | ------------------------------------------------- |
| Email    | `admin@gmail.com`                              |
| Password | `12345678`                                       |
 
> ⚠️ Replace with your actual seeded admin credentials before submitting.
 
---

## ✨ Features

### 👤 Public & Tenant Features
- **Dynamic Hero Section:** Interactive image carousel using Framer Motion with real-time property highlights and smooth animations.
- **Advanced Filtering & Search:** Search rental properties by location, min/max price range, and category with live debounce filtering.
- **URL Query Parameter Support:** Direct navigation to filtered states (e.g., `/properties?categoryId=...`).
- **Property Details View:** Detailed view with property specs, location details, landlord info, and responsive photo displays.

### 🏠 Landlord Dashboard
- **Property Management:** Easily post new properties with image previews, category selection, location details, and price configuration.
- **Form Validation:** Client and server-side validation using **Zod** and **React Hook Form**.
- **Interactive Management:** View, edit, or delete listings directly from the dashboard.

### 🛡️ Admin Dashboard
- **Category Management:** Create, view, update, and manage property categories dynamically.
- **System Overview:** Administrative control over platform listings and categories.

---

## 🛠️ Tech Stack & Libraries

- **Framework:** Next.js (App Router, Client & Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm
- **Animations:** Framer Motion, `react-responsive-carousel`
- **Icons:** Lucide React, React Icons
- **Form & Validation:** React Hook Form, Zod (`@hookform/resolvers`)
- **Database & ORM:** PostgreSQL / SQLite with Prisma ORM
- **Notifications:** Sonner (Toast notifications)

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your machine.

### 1. Prerequisites
Ensure you have Node.js (v18 or higher) and pnpm installed:

```bash
node -v
pnpm -v
```

> If pnpm isn't installed yet: `npm install -g pnpm`

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/rentnest.git
cd rentnest
```

### 3. Install Dependencies

```bash
pnpm install
```

> If you encounter peer dependency warnings, run `pnpm install --shamefully-hoist`

### 4. Configure Environment Variables

Create a `.env` or `.env.local` file in the root directory and add the following:

```env

# Backend / API Config
NEXT_PUBLIC_BACKEND_API_URL=your-backend-api-url

# JwT Setup
JWT_ACCESS_SECRET=access-secret-your
JWT_REFRESH_SECRET=refresh-secret-your
```

### 5. Setup Prisma Database

Push the schema to your database and generate the Prisma Client:

```bash
pnpm prisma db push
pnpm prisma generate
```

### 6. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.