import React, { useState, useEffect } from "react";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import StarRating from "../common/StarRating";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../common/Toast";
import { validateRequired } from "../../utils/validation";

const FeedbackForm: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<{
    subjectId: number | null;
    rating: number;
    message: string;
  }>({
    subjectId: null,
    rating: 0,
    message: "",
  });

  const [errors, setErrors] = useState({
    subjectId: "",
    rating: "",
    message: "",
  });

  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user?.class_id) return;

      setIsLoading(true);
      try {
        const response = await api.getSubjects(user.class_id);
        if (response.success && response.data) {
          setSubjects(response.data);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        showToast("Failed to load subjects", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, [user, showToast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));

    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.subjectId) {
      newErrors.subjectId = "Please select a subject";
      isValid = false;
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please provide a rating";
      isValid = false;
    }

    if (!validateRequired(formData.message)) {
      newErrors.message = "Please provide feedback";
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
      const response = await api.submitFeedback(
        formData.subjectId!,
        formData.rating,
        formData.message
      );

      if (response.success) {
        showToast("Feedback submitted successfully!", "success");
        // Reset form
        setFormData({
          subjectId: null,
          rating: 0,
          message: "",
        });
      } else {
        showToast(response.error || "Submission failed", "error");
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
        id="subjectId"
        name="subjectId"
        label="Select Subject"
        options={subjects.map((subject) => ({
          value: subject.id,
          label: subject.name,
        }))}
        value={formData.subjectId ?? ""}
        onChange={handleChange}
        error={errors.subjectId}
        disabled={isLoading}
        required
      />

      <StarRating
        rating={formData.rating}
        setRating={handleRatingChange}
        label="Rating"
        error={errors.rating}
      />

      <Textarea
        id="message"
        name="message"
        label="Feedback"
        placeholder="Write your feedback here..."
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        rows={4}
        required
      />

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
        disabled={isLoading}
        className="mt-2"
      >
        Submit Feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;
