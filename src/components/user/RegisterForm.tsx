import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../common/Toast";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validation";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!validateName(formData.name)) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await api.registerUser(
        formData.name,
        formData.email,
        formData.password
      );

      if (response.success && response.data) {
        showToast("Registration successful!", "success");
        loginUser(response.data?.user, false);
        localStorage.setItem("token", response.data.access_token);
        navigate("/select-faculty-class");
      } else {
        showToast(response.error || "Registration failed", "error");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        id="name"
        name="name"
        type="text"
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="Create a password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />

      <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
