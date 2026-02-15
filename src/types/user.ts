export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  country: string;
  city: string;
  occupation: string;
  phone_number: string;
  birth_date: string;
  address: string;
  bio: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export interface UserFilters {
  search?: string;
  country?: string;
  age?: number;
  is_active?: boolean;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;
  page_size?: number;
}
