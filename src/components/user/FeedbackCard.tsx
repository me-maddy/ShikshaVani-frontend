import { Star, StarOff, StarHalf } from "lucide-react";

interface StudentFeedback {
  id: number;
  className: string;
  subjectName: string;
  rating: number;
  comment?: string;
}

interface FeedbackCardProps {
  feedback: StudentFeedback;
}

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  const renderStarRating = (rating: number) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(
          <Star key={i} className="w-5 h-5 text-yellow-500" fill="#F59E0B" />
        );
      } else if (i - 0.5 === rating) {
        // Half star
        stars.push(
          <StarHalf
            key={i}
            className="w-5 h-5 text-yellow-500"
            fill="#F59E0B"
          />
        );
      } else {
        // Empty star
        stars.push(<StarOff key={i} className="w-5 h-5 text-gray-300" />);
      }
    }

    return stars;
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition-shadow duration-300">
      <div className="mb-3">
        <h3 className="text-lg font-medium text-gray-900">
          {feedback.subjectName}
        </h3>
        <p className="text-sm text-gray-500">{feedback.className}</p>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex">{renderStarRating(feedback.rating)}</div>
        <span className="ml-2 text-sm text-gray-600">
          {feedback.rating.toFixed(1)}
        </span>
      </div>

      {feedback.comment && (
        <div className="mt-3">
          <p className="text-gray-700">{feedback.comment}</p>
        </div>
      )}

      {!feedback.comment && (
        <div className="mt-3">
          <p className="text-gray-400 italic">No comment provided</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;
