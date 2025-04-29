import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="w-16 h-16 relative">
              <img
                src="/images/Shikshavani_logo.png"
                alt="Shikshavani Logo"
                className="aspect-square w-full h-full"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Welcome to our ShikshaVani
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Improve teaching and learning through constructive feedback
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                Student Portal
              </h3>
              <p className="mt-2 text-gray-600 text-center">
                Register or login to provide feedback for your courses
              </p>
              <div className="mt-6 flex justify-center space-x-3">
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-purple-100 rounded-full p-3">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                Faculty Portal
              </h3>
              <p className="mt-2 text-gray-600 text-center">
                Register or login to manage classes and view feedback
              </p>
              <div className="mt-6 flex justify-center space-x-3">
                <Link
                  to="/faculty/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Register
                </Link>
                <Link
                  to="/faculty/login"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ShikshaVani. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
