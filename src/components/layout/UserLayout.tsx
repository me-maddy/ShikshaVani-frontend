import React, { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";

interface UserLayoutProps {
  children: ReactNode;
  title: string;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children, title }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex">
              <Link to="/main" className="text-xl font-bold text-blue-600">
                <div className="w-16 h-16 relative">
                  <img
                    src="/images/Shikshavani_logo.png"
                    alt="Shikshavani Logo"
                    className="aspect-square w-full h-full"
                  />
                </div>
              </Link>
            </div>
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-1"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
