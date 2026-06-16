import {
  enrichRestaurant,
  overview,
  popularTimes,
  reservations,
  restaurants,
  trends,
} from '@/lib/mock-data';
import { DashboardOverview, Reservation, Restaurant, User } from '@/types/tablebook';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

let accessToken: string | null = null;

async function request<T>(path: string, options: RequestInit = {}, fallback?: T): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw error;
  }
}

export const api = {
  setAccessToken(token: string | null) {
    accessToken = token;
  },
  restaurants: async (search?: string) => {
    const fallback = search
      ? restaurants.filter((restaurant) =>
          `${restaurant.name} ${restaurant.city} ${restaurant.cuisine}`.toLowerCase().includes(search.toLowerCase()),
        )
      : restaurants;
    const data = await request<Restaurant[]>(`/restaurants${search ? `?search=${encodeURIComponent(search)}` : ''}`, {}, fallback);
    return data.map((restaurant) => enrichRestaurant(restaurant));
  },
  restaurant: async (slug: string) => {
    const fallback = restaurants.find((r) => r.slug === slug);
    const data = await request<Restaurant>(`/restaurants/${slug}`, {}, fallback ? enrichRestaurant(fallback) : undefined);
    return enrichRestaurant(data);
  },
  myReservations: () => request<Reservation[]>('/reservations/me', {}, reservations),
  adminReservations: () => request<Reservation[]>('/admin/reservations', {}, reservations),
  overview: () => request<DashboardOverview>('/admin/dashboard/overview', {}, overview),
  trends: () => request<typeof trends>('/admin/dashboard/trends', {}, trends),
  popularTimes: () => request<typeof popularTimes>('/admin/dashboard/popular-times', {}, popularTimes),
  login: async (email: string, password: string) => {
    const session = await request<{ accessToken: string; user: User }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
      {
        accessToken: 'demo-token',
        user: {
          id: email.includes('admin') ? 'admin' : 'guest',
          name: email.includes('admin') ? 'Farid Ibrahim' : 'Siti Aminah',
          email,
          role: email.includes('admin') ? 'ADMIN' : 'CUSTOMER',
        },
      },
    );
    accessToken = session.accessToken;
    return session;
  },
  register: async (name: string, email: string, password: string) => {
    const session = await request<{ accessToken: string; user: User }>(
      '/auth/register',
      { method: 'POST', body: JSON.stringify({ name, email, password }) },
      { accessToken: 'demo-token', user: { id: 'guest', name, email, role: 'CUSTOMER' } },
    );
    accessToken = session.accessToken;
    return session;
  },
  createReservation: (payload: unknown) =>
    request<Reservation>('/reservations', { method: 'POST', body: JSON.stringify(payload) }, reservations[0]),
};
