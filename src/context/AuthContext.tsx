import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Faculty } from "../types";

interface AuthContextType {
  user: User | null;
  faculty: Faculty | null;
  isFullyRegistered: boolean;
  loading: boolean;
  loginUser: (user: User, isFullyRegistered: boolean) => void;
  loginFaculty: (faculty: Faculty, isFullyRegistered: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [isFullyRegistered, setIsFullyRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for user data on initial load
    const storedUser = localStorage.getItem("user");
    const storedFaculty = localStorage.getItem("faculty");
    const storedIsFullyRegistered = localStorage.getItem("isFullyRegistered");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsFullyRegistered(storedIsFullyRegistered === "true");
    } else if (storedFaculty) {
      setFaculty(JSON.parse(storedFaculty));
    }

    setLoading(false);
  }, []);

  const loginUser = (userData: User, fullyRegistered: boolean) => {
    setUser(userData);
    setFaculty(null);
    setIsFullyRegistered(fullyRegistered);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isFullyRegistered", String(fullyRegistered));
    localStorage.removeItem("faculty");
  };

  const loginFaculty = (facultyData: Faculty, fullyRegistered: boolean) => {
    setFaculty(facultyData);
    setUser(null);
    setIsFullyRegistered(fullyRegistered);

    localStorage.setItem("faculty", JSON.stringify(facultyData));
    localStorage.removeItem("user");
    localStorage.setItem("isFullyRegistered", String(fullyRegistered));
  };

  const logout = () => {
    setUser(null);
    setFaculty(null);
    setIsFullyRegistered(false);

    localStorage.removeItem("user");
    localStorage.removeItem("faculty");
    localStorage.removeItem("isFullyRegistered");
    localStorage.removeItem("token");
  };

  const value = {
    user,
    faculty,
    isFullyRegistered,
    loading,
    loginUser,
    loginFaculty,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
