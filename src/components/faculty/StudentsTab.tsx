import { useState, useEffect } from "react";
import { Class, Student } from "../../types";
import { api } from "../../utils/api";
import { useToast } from "../common/Toast";
import { SearchIcon } from "lucide-react";

export default function StudentsTab() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | "all">("all");
  const [uniqueClasses, setUniqueClasses] = useState<string[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    // Function to fetch students from the backend
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [studentsResponse, classesResponse] = await Promise.all([
          api.getFacultyStudents(),
          api.getFacultyClasses(),
        ]);
        if (!studentsResponse.success) {
          showToast(studentsResponse.error ?? "Something went wrong", "error");
          setError(studentsResponse.error ?? "Something went wrong");
          return;
        }
        setStudents(studentsResponse.data ?? []);
        if (!classesResponse.success || !classesResponse.data) {
          return;
        }
        setUniqueClasses(
          classesResponse.data.map((classDetails: Class) => classDetails.name)
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search term and selected class
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass === "all" || student.student_class_name === selectedClass;

    return matchesSearch && matchesClass;
  });

  // Loading state UI
  if (isLoading) {
    return (
      <div className="w-full">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Students</h1>
        <div className="flex flex-col space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex animate-pulse flex-col space-y-3">
                <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="w-full">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Students</h1>
        <div className="rounded-lg bg-red-50 p-6 text-center text-red-800">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-red-100 px-4 py-2 font-medium text-red-800 hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Students</h1>

      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-x-4 md:space-y-0">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
          >
            <option value="all">All Classes</option>
            {uniqueClasses.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students List */}
      {filteredStudents.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <p className="text-gray-500">
            No students found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Class</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {student.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {student.student_name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {student.student_email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                        {student.student_class_name}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Count */}
      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredStudents.length} of {students.length} students
      </div>
    </div>
  );
}
