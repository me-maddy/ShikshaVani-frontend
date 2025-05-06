import React from "react";
import { Feedback } from "../../types";
import StarRating from "./StarRating";

interface FeedbackCardProps {
  feedback: Feedback;
}

const FeedbackCardForFaculty: React.FC<FeedbackCardProps> = ({ feedback }) => {
  return (
    <article className="bg-white p-4 rounded-lg shadow-[0px_0px_4px] shadow-gray-200 mb-4">
      <div className="flex flex-wrap gap-2 justify-between items-start mb-3">
        <div>
          <h4 className="font-medium text-gray-800">{feedback.studentName}</h4>
          <p className="text-sm text-gray-500">{feedback.studentEmail}</p>
        </div>
        <StarRating rating={feedback.rating} />
      </div>
      <p className="text-gray-700">{feedback.comment}</p>
    </article>
  );
};

export default FeedbackCardForFaculty;
