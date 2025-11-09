export interface User {
  uid: string;
  name: string | null;
  email: string | null;
  userName: string | null;
  registrationNumber: string | null;
  department: string | null;
  faculty: string | null;
  level: string | null;
  photoURL: string | null;
}

export interface Book {
  id: string;
  title: string;
  department: string;
  faculty: string;
  level: string;
  photoURL: string;
  type: string;
  price: number;
}

export interface AuthFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  remember: boolean;
  setRemember: (remember: boolean) => void;
}

export interface DashboardCard {
  id: number;
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

export interface AdminStats {
  totalUsers: number;
  totalBooks: number;
  activeReaders: number;
  totalCategories: number;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}
