import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  count?: number;
  size?: number;
  label?: string;
  error?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
  count = 5,
  size = 24,
  label,
  error
}) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center">
        {[...Array(count)].map((_, i) => {
          const ratingValue = i + 1;
          
          return (
            <div
              key={i}
              className="cursor-pointer p-1"
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            >
              <Star
                size={size}
                className={`transition-colors ${
                  ratingValue <= (hover || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </div>
          );
        })}
        <span className="ml-2 text-gray-600 text-sm">
          {rating > 0 ? `${rating} of ${count}` : 'No rating selected'}
        </span>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default StarRating;