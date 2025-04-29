import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../common/Select";
import Button from "../common/Button";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../common/Toast";

const FacultyClassSelect: React.FC = () => {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<{
    facultyId: number | null;
    classId: number | null;
  }>({
    facultyId: null,
    classId: null,
  });

  const [errors, setErrors] = useState({
    facultyId: "",
    classId: "",
  });

  const [faculties, setFaculties] = useState<{ id: string; name: string }[]>(
    []
  );
  const [classes, setClasses] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const facultiesResponse = await api.getAllFaculties();
        if (facultiesResponse.success && facultiesResponse.data) {
          setFaculties(facultiesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
        showToast("Failed to load faculties", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (formData.facultyId) {
      const fetchClasses = async () => {
        try {
          const classesResponse = await api.getClasses(formData.facultyId!);
          if (classesResponse.success && classesResponse.data) {
            setClasses(classesResponse.data);
          }
        } catch (error) {
          console.error("Error fetching classes:", error);
          showToast("Failed to load classes", "error");
        }
      };

      fetchClasses();
    } else {
      setClasses([]);
    }
  }, [formData.facultyId]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "facultyId") {
      setFormData((prev) => ({ ...prev, classId: null }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.facultyId) {
      newErrors.facultyId = "Please select a faculty";
      isValid = false;
    }

    if (!formData.classId) {
      newErrors.classId = "Please select a class";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !user) return;

    setIsSubmitting(true);

    try {
      const response = await api.updateUserDetails(
        formData.facultyId!,
        formData.classId!
      );

      if (response.success && response.data) {
        showToast("Information updated successfully!", "success");
        loginUser({ ...response.data }, true);
        navigate("/main");
      } else {
        showToast(response.error || "Update failed", "error");
      }
    } catch (error) {
      showToast("Something went wrong", "error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Select
        id="facultyId"
        name="facultyId"
        label="Select Faculty"
        options={faculties.map((faculty) => ({
          value: faculty.id,
          label: faculty.name,
        }))}
        value={formData.facultyId ?? ""}
        onChange={handleChange}
        error={errors.facultyId}
        disabled={isLoading}
        required
      />

      <Select
        id="classId"
        name="classId"
        label="Select Class"
        options={classes.map((cls) => ({
          value: cls.id,
          label: cls.name,
        }))}
        value={formData.classId ?? ""}
        onChange={handleChange}
        error={errors.classId}
        disabled={!formData.facultyId || isLoading}
        required
      />

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
        disabled={isLoading}
        className="mt-2"
      >
        Continue
      </Button>
    </form>
  );
};

export default FacultyClassSelect;
