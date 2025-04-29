import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../common/Toast";
import { validateEmail, validateRequired } from "../../utils/validation";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!validateRequired(formData.password)) {
      newErrors.password = "Password is required";
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
      const response = await api.loginUser(formData.email, formData.password);

      if (response.success && response.data) {
        showToast("Login successful!", "success");
        loginUser(response.data.user, response.data.user?.is_registered);
        localStorage.setItem("token", response.data.access_token);

        if (response.data?.user?.is_registered) {
          navigate("/main");
        } else {
          navigate("/select-faculty-class");
        }
      } else {
        showToast(response.error || "Login failed", "error");
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
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
