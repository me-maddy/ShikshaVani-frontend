import React, { useState, useEffect } from "react";
import Card from "../common/Card";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../common/Toast";
import { Star } from "lucide-react";

interface FeedbackWithDetails {
  id: string;
  userId: string;
  subjectId: string;
  rating: number;
  message: string;
  createdAt: string;
  subjectName: string;
  userName: string;
}

const FeedbacksTab: React.FC = () => {
  const { faculty } = useAuth();
  const { showToast } = useToast();

  const [feedbacks, setFeedbacks] = useState<FeedbackWithDetails[]>([]);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Student Feedbacks</h2>

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
            <Card
              key={feedback.id}
              className="hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <h3 className="font-medium text-lg text-blue-800">
                      {feedback.subjectName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      By {feedback.userName} on {formatDate(feedback.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < feedback.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {feedback.rating}/5
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">
                  {feedback.message}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbacksTab;
