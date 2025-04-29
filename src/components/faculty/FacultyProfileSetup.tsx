import type React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Faculty } from "../../types";
import { api } from "../../utils/api";
import { useToast } from "../common/Toast";
import { useAuth } from "../../context/AuthContext";

export default function FacultyProfileSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    facultyName: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const { showToast } = useToast();
  const { loginFaculty } = useAuth();

  useEffect(() => {
    // Get faculty from localStorage
    const storedFaculty = localStorage.getItem("faculty");
    if (!storedFaculty) {
      navigate("/faculty/login");
      return;
    }

    const facultyData = JSON.parse(storedFaculty);
    setFaculty(facultyData);

    // Pre-fill form with existing data
    setFormData({
      facultyName: facultyData.faculty_name || "",
      email: facultyData.faculty_email || "",
    });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.facultyName.trim()) {
      newErrors.facultyName = "Faculty name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await api.uploadFacultyDetails(
        formData.facultyName,
        formData.email
      );

      if (response.success && response.data) {
        showToast("Details Uploaded", "success");
        if (faculty) {
          const updatedFaculty: Faculty = {
            ...faculty,
            faculty_name: formData.facultyName,
            faculty_email: formData.email,
            faculty_id: response.data.id,
            is_registered: true,
          };
          loginFaculty(updatedFaculty, true);
          navigate("/faculty/dashboard");
        }
      } else {
        showToast(
          response.error ??
            "Failed to save profile information. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Profile setup failed:", error);
      setErrors({
        form: "Failed to save profile information. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Faculty Profile Setup
        </h1>

        {errors.form && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="facultyName"
              className="block text-sm font-medium text-gray-700"
            >
              Faculty Name
            </label>
            <input
              id="facultyName"
              name="facultyName"
              type="text"
              value={formData.facultyName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.facultyName ? "border-red-300" : "border-gray-300"
              } px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm`}
            />
            {errors.facultyName && (
              <p className="mt-1 text-xs text-red-500">{errors.facultyName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Faculty Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.email ? "border-red-300" : "border-gray-300"
              } px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-purple-400"
            >
              {isLoading ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Continue to Dashboard"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
