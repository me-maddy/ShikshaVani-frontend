import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../common/Toast";
import ClassSection from "./ClassSection";
import { ClassData } from "../../types";

const FeedbacksTab: React.FC = () => {
  const { faculty } = useAuth();
  const { showToast } = useToast();

  const [feedbacks, setFeedbacks] = useState<ClassData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (faculty) {
      fetchFeedbacks();
    }
  }, [faculty]);

  const fetchFeedbacks = async () => {
    if (!faculty) return;

    setIsLoading(true);
    try {
      const response = await api.getFeedbacks();
      if (response.success && response.data) {
        setFeedbacks(response.data);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      showToast("Failed to load feedbacks", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Feedbacks</h1>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-500">No feedbacks received yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <ClassSection key={feedback.id} classData={feedback} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbacksTab;
