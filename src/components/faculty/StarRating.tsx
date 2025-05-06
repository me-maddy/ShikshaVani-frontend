import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5 }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }).map((_, index) => (
        <Star
          key={index}
          size={16}
          className={
            index < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
          }
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {rating}/{totalStars}
      </span>
    </div>
  );
};

export default StarRating;
