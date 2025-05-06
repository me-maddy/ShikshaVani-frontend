import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Faculty } from "../../types";
import { api } from "../../utils/api";

const Home = () => {
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [stats, setStats] = useState({
    classes: 0,
    subjects: 0,
    feedbacks: 0,
  });

  useEffect(() => {
    const storedFaculty = localStorage.getItem("faculty");
    if (storedFaculty) {
      setFaculty(JSON.parse(storedFaculty));
    }

    const fetchSummary = async () => {
      const { success, data } = await api.getFacultySummary();
      if (!success || !data) return;
      setStats(data);
    };
    fetchSummary();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h1>

      {faculty && (
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Welcome, {faculty.name}!
          </h2>
          <p className="text-gray-600">
            This is your faculty dashboard where you can manage your classes,
            subjects, and view student feedback.
          </p>
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-blue-100 p-3">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.classes}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/faculty/dashboard/classes"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Manage Classes →
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-green-100 p-3">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Subjects
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.subjects}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/faculty/dashboard/subjects"
              className="text-sm font-medium text-green-600 hover:text-green-500"
            >
              Manage Subjects →
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-purple-100 p-3">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Feedbacks
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.feedbacks}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/faculty/dashboard/feedbacks"
              className="text-sm font-medium text-purple-600 hover:text-purple-500"
            >
              View Feedbacks →
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-700">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/faculty/dashboard/classes"
            className="flex items-center rounded-md border border-gray-200 p-4 transition-colors hover:bg-gray-50"
          >
            <div className="mr-4 rounded-full bg-blue-100 p-2">
              <svg
                className="h-5 w-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <span className="font-medium text-gray-700">Add New Class</span>
          </Link>

          <Link
            to="/faculty/dashboard/subjects"
            className="flex items-center rounded-md border border-gray-200 p-4 transition-colors hover:bg-gray-50"
          >
            <div className="mr-4 rounded-full bg-green-100 p-2">
              <svg
                className="h-5 w-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <span className="font-medium text-gray-700">Add New Subject</span>
          </Link>

          <Link
            to="/faculty/dashboard/feedbacks"
            className="flex items-center rounded-md border border-gray-200 p-4 transition-colors hover:bg-gray-50"
          >
            <div className="mr-4 rounded-full bg-purple-100 p-2">
              <svg
                className="h-5 w-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="font-medium text-gray-700">
              View Recent Feedbacks
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
