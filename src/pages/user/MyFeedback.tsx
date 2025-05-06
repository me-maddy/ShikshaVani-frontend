import { useEffect, useState } from "react";
import FeedbackCard from "../../components/user/FeedbackCard";
import UserLayout from "../../components/layout/UserLayout";
import { api } from "../../utils/api";
import { useToast } from "../../components/common/Toast";

// Define the StudentFeedback interface
interface StudentFeedback {
  id: number;
  className: string;
  subjectName: string;
  rating: number; // 1 to 5
  comment?: string;
}

const MyFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<StudentFeedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { showToast } = useToast();

  useEffect(() => {
    // Mock APcks = asI call with setTimeout
    const fetchFeedbacks = async () => {
      const feedbacksResponse = await api.getStudentFeebacks();
      if (feedbacksResponse.success && feedbacksResponse.data) {
        setFeedbacks(feedbacksResponse.data);
      } else {
        showToast("Failed to load feedbacks", "error");
      }
      setLoading(false);
      // setTimeout(() => {
      //   const mockFeedbacks: StudentFeedback[] = [
      //     {
      //       id: 1,
      //       className: "Class 10-A",
      //       subjectName: "Mathematics",
      //       rating: 4,
      //       comment:
      //         "Excellent teaching methods, but wish we had more practice problems.",
      //     },
      //     {
      //       id: 2,
      //       className: "Class 10-A",
      //       subjectName: "Physics",
      //       rating: 5,
      //       comment:
      //         "Very engaging class with lots of practical demonstrations!",
      //     },
      //     {
      //       id: 3,
      //       className: "Class 10-A",
      //       subjectName: "Chemistry",
      //       rating: 3,
      //       comment: "Decent explanations but labs need better equipment.",
      //     },
      //     {
      //       id: 4,
      //       className: "Class 10-A",
      //       subjectName: "Biology",
      //       rating: 4,
      //     },
      //     {
      //       id: 5,
      //       className: "Class 10-A",
      //       subjectName: "English Literature",
      //       rating: 5,
      //       comment:
      //         "The teacher makes classic literature so interesting and relatable!",
      //     },
      //     {
      //       id: 6,
      //       className: "Class 10-A",
      //       subjectName: "Computer Science",
      //       rating: 4,
      //       comment:
      //         "Great practical sessions, would like more advanced topics.",
      //     },
      //   ];

      //   setFeedbacks(mockFeedbacks);
      //   setLoading(false);
      // }, 1000);
    };

    fetchFeedbacks();
  }, []);

  return (
    <UserLayout title="My Feedback">
      {loading ? (
        <div className="p-8 flex justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 py-5">
          {feedbacks.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No feedback submitted yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbacks.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
            </div>
          )}
        </div>
      )}
    </UserLayout>
  );
};

export default MyFeedback;
