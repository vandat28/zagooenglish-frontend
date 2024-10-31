"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import { User } from "@/types/User";
import { API_USER } from "@/constants/api";
import Cookies from "js-cookie";

// Định nghĩa kiểu dữ liệu cho context value
interface UserContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => void;
}

// Tạo context với giá trị mặc định
const UserContext = createContext<UserContextType | undefined>(undefined);

// Tạo provider component
interface UserProviderProps {
  children: ReactNode;
}

const defaultUser: User = {
  username: null,
  avatar: null,
  fullname: null,
  role: null,
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    const username = Cookies.get("user");
    if (username) {
      setLoading(true);
      try {
        const response = await axios.get(`${API_USER}/${JSON.parse(username)}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(defaultUser);
      } finally {
        setLoading(false);
      }
    } else {
      setUser(defaultUser);
      setLoading(false);
    }
  };

  // Lấy thông tin người dùng từ API khi component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Hàm để gọi lại API và cập nhật thông tin người dùng
  const refreshUser = () => {
    fetchUser();
  };

  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
