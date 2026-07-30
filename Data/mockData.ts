import { Category, Payment, Property, RentalRequest, Review, User } from '@/lib/types';

export const mockUsers: User[] = [
  { id: 'usr-1', name: 'John Tenant', email: 'tenant@rentnest.com', role: 'TENANT', status: 'ACTIVE' },
  { id: 'usr-2', name: 'Sarah Landlord', email: 'landlord@rentnest.com', role: 'LANDLORD', status: 'ACTIVE' },
  { id: 'usr-3', name: 'System Admin', email: 'admin@rentnest.com', role: 'ADMIN', status: 'ACTIVE' },
  { id: 'usr-4', name: 'Banned User', email: 'banned@rentnest.com', role: 'TENANT', status: 'BANNED' },
];

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Apartment' },
  { id: 'cat-2', name: 'Studio' },
  { id: 'cat-3', name: 'Villa' },
  { id: 'cat-4', name: 'Duplex' },
];

export const mockProperties: Property[] = [
  {
    id: 'prop-101',
    title: 'Modern Luxury Apartment in Gulshan',
    description: 'Spacious 3-bedroom apartment with city views, modern kitchen, and 24/7 power backup.',
    location: 'Gulshan 2, Dhaka',
    price: 45000,
    categoryId: 'cat-1',
    categoryName: 'Apartment',
    landlordId: 'usr-2',
    landlordName: 'Sarah Landlord',
    isAvailable: true,
    images: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800',
  },
  {
    id: 'prop-102',
    title: 'Cozy Studio flat near University',
    description: 'Perfect studio flat for students or young professionals. Fully furnished with Wi-Fi.',
    location: 'Dhanmondi, Dhaka',
    price: 18000,
    categoryId: 'cat-2',
    categoryName: 'Studio',
    landlordId: 'usr-2',
    landlordName: 'Sarah Landlord',
    isAvailable: true,
    images: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800',
  },
  {
    id: 'prop-103',
    title: 'Exclusive Lakeside Villa',
    description: 'Peaceful waterfront villa with private garden, garage, and high security.',
    location: 'Uttara, Dhaka',
    price: 95000,
    categoryId: 'cat-3',
    categoryName: 'Villa',
    landlordId: 'usr-2',
    landlordName: 'Sarah Landlord',
    isAvailable: true,
    images: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800',
  },
];

export const mockRentals: RentalRequest[] = [
  {
    id: 'rent-201',
    propertyId: 'prop-101',
    propertyTitle: 'Modern Luxury Apartment in Gulshan',
    propertyPrice: 45000,
    tenantId: 'usr-1',
    tenantName: 'John Tenant',
    landlordId: 'usr-2',
    status: 'APPROVED',
    createdAt: '2026-07-20T10:00:00Z',
  },
  {
    id: 'rent-202',
    propertyId: 'prop-102',
    propertyTitle: 'Cozy Studio flat near University',
    propertyPrice: 18000,
    tenantId: 'usr-1',
    tenantName: 'John Tenant',
    landlordId: 'usr-2',
    status: 'PENDING',
    createdAt: '2026-07-28T12:00:00Z',
  },
];

export const mockPayments: Payment[] = [
  {
    id: 'pay-501',
    rentalRequestId: 'rent-201',
    amount: 45000,
    status: 'COMPLETED',
    createdAt: '2026-07-21T11:00:00Z',
  },
];

export const mockReviews: Review[] = [
  {
    id: 'rev-301',
    propertyId: 'prop-101',
    tenantId: 'usr-1',
    tenantName: 'John Tenant',
    rating: 5,
    comment: 'Great property! Landlord was super helpful and responsive.',
    createdAt: '2026-07-25T14:30:00Z',
  },
];