import React, { ReactNode, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Menu, X, Users, BookOpen, MessageSquare } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";

interface FacultyLayoutProps {
  children: ReactNode;
}

const FacultyLayout: React.FC<FacultyLayoutProps> = ({ children }) => {
  const { logout, faculty } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/faculty/login");
  };

  const tabs = [
    {
      name: "Classes",
      path: "/faculty/dashboard/classes",
      icon: <Users size={20} />,
    },
    {
      name: "Subjects",
      path: "/faculty/dashboard/subjects",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Feedbacks",
      path: "/faculty/dashboard/feedbacks",
      icon: <MessageSquare size={20} />,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname === path + "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-purple-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-xl font-bold">Faculty Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              {faculty && (
                <span className="hidden md:inline-block text-sm">
                  {faculty.name}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-1 bg-transparent hover:bg-purple-600 !bg-purple-700 text-white border-white hover:border-transparent"
              >
                <LogOut size={16} />
                Logout
              </Button>
              <button
                className="md:hidden p-1 rounded-md hover:bg-purple-600 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-b">
            <nav>
              {tabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`
                    flex items-center px-4 py-3 border-l-4
                    ${
                      isActive(tab.path)
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-transparent text-gray-600 hover:bg-gray-50"
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Sidebar for desktop */}
        <div className="hidden md:block md:w-64 bg-white shadow-md">
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`
                  flex items-center px-4 py-3 rounded-md
                  ${
                    isActive(tab.path)
                      ? "bg-purple-50 text-purple-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }
                `}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main content area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
