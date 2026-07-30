export type Role = 'TENANT' | 'LANDLORD' | 'ADMIN';

export type UserStatus = 'ACTIVE' | 'BANNED' | 'SUSPENDED';

export type RentalStatus = 
  | 'PENDING' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'PAID' 
  | 'ACTIVE' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  phoneNumber?: string;
  profileImage?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Landlord {
  id: string;
  name: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  isAvailable: boolean;
  images: string; 
  createdAt: string;
  updatedAt: string;
  landlordId: string;
  categoryId: string;
  category: Category;
  landlord: Landlord;
}

export interface RentalRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice?: number;
  tenantId: string;
  tenantName: string;
  landlordId: string;
  status: RentalStatus;
  createdAt: string;
}

export interface Payment {
  id: string;
  rentalRequestId: string;
  amount: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  createdAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  tenantId: string;
  tenantName: string;
  rating: number;
  comment: string;
  createdAt: string;
}