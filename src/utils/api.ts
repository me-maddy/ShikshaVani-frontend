import { ApiResponse } from "../types";
import ApplicationConfig from "../applicationConfig";

const classes = [
  { id: "1", name: "CS-101", facultyId: "1" },
  { id: "2", name: "CS-102", facultyId: "1" },
  { id: "3", name: "ENG-101", facultyId: "2" },
];

const subjects = [
  { id: "1", name: "Introduction to Programming", classId: "1" },
  { id: "2", name: "Data Structures", classId: "1" },
  { id: "3", name: "Database Systems", classId: "2" },
  { id: "4", name: "Mechanics", classId: "3" },
];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API functions
export const api = {
  // User API
  loginUser: async (
    email: string,
    password: string
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  registerUser: async (
    name: string,
    email: string,
    password: string
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/student/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  updateUserDetails: async (
    faculty_id: number,
    class_id: number
  ): Promise<ApiResponse<any>> => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/student/profile_details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ faculty_id, class_id }),
        }
      );
      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  // Faculty API
  loginFaculty: async (
    email: string,
    password: string
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  registerFaculty: async (
    name: string,
    email: string,
    password: string
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/faculty/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  // Class API
  getFacultyClasses: async (): Promise<ApiResponse<any>> => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/faculty/class/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  getClasses: async (faculty_id: number): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/faculty/class/${faculty_id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  addClass: async (name: string): Promise<ApiResponse<any>> => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/faculty/class/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        }
      );
      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  updateClass: async (id: string, name: string): Promise<ApiResponse<any>> => {
    await delay(600);
    const classIndex = classes.findIndex((c) => c.id === id);
    if (classIndex === -1) {
      return { success: false, error: "Class not found" };
    }
    classes[classIndex] = { ...classes[classIndex], name };
    return { success: true, data: classes[classIndex] };
  },

  deleteClass: async (id: string): Promise<ApiResponse<any>> => {
    await delay(600);
    const classIndex = classes.findIndex((c) => c.id === id);
    if (classIndex === -1) {
      return { success: false, error: "Class not found" };
    }
    classes.splice(classIndex, 1);
    return { success: true };
  },

  // Subject API
  getSubjects: async (classId: number): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/subjects/${classId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  getAllSubjects: async (): Promise<ApiResponse<any>> => {
    await delay(600);
    return { success: true, data: subjects };
  },

  addSubject: async (
    name: string,
    class_id: number
  ): Promise<ApiResponse<any>> => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/subjects/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ class_id, name }),
        }
      );
      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  updateSubject: async (
    id: number,
    name: string
  ): Promise<ApiResponse<any>> => {
    await delay(600);
    const subjectIndex = subjects.findIndex((s) => s.id === id);
    if (subjectIndex === -1) {
      return { success: false, error: "Subject not found" };
    }
    subjects[subjectIndex] = { ...subjects[subjectIndex], name };
    return { success: true, data: subjects[subjectIndex] };
  },

  deleteSubject: async (id: number): Promise<ApiResponse<any>> => {
    await delay(600);
    const subjectIndex = subjects.findIndex((s) => s.id === id);
    if (subjectIndex === -1) {
      return { success: false, error: "Subject not found" };
    }
    subjects.splice(subjectIndex, 1);
    return { success: true };
  },

  // Feedback API
  getFeedbacks: async (): Promise<ApiResponse<any>> => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/feedback/faculty`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  getStudentFeebacks: async (): Promise<ApiResponse<any>> => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/feedback/student`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }
      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  submitFeedback: async (
    subject_id: number,
    rating: number,
    comment: string
  ): Promise<ApiResponse<any>> => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/feedback/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subject_id, rating, comment }),
        }
      );
      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  // Helper functions
  getAllFaculties: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/faculty/`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  getFacultySummary: async (): Promise<ApiResponse<any>> => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/faculty/summary`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  getFacultyStudents: async (): Promise<ApiResponse<any>> => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/faculty/students`,
        { method: "GET", headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  getAllClasses: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/faculty/class/`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },

  uploadFacultyDetails: async (
    name: string,
    email: string
  ): Promise<ApiResponse<any>> => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${ApplicationConfig.BACKEND_URI}/faculty/faculty_profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, name }),
        }
      );
      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      return { success: true, data: data };
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";

      return { success: false, error: errorMsg };
    }
  },
};
