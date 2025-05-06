export interface User {
  id: number;
  name: string;
  email: string;
  faculty_id?: number;
  class_id?: number;
  is_registered?: boolean;
}

export interface Faculty {
  id: number;
  name: string;
  email: string;
  faculty_id?: number;
  faculty_name?: string;
  faculty_email?: string;
  is_registered?: boolean;
}

export interface Class {
  id: number;
  name: string;
  facultyId: number;
}

export interface Subject {
  id: number;
  name: string;
  classId: number;
}

export interface Feedback {
  id: number;
  userId: number;
  subjectId: number;
  rating: number;
  message: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Feedback {
  id: number;
  rating: number;
  comment: string;
  studentName: string;
  studentEmail: string;
}

export interface Subject {
  id: number;
  subjectName: string;
  feedbacks: Feedback[];
}

export interface ClassData {
  id: number;
  class: string;
  subjects: Subject[];
}

export interface Student {
  id: number;
  student_name: string;
  student_email: string;
  student_class_name: string;
}
