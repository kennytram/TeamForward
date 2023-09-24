import React from "react";

import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  rating: number;
}

const RatingStar = ({ rating }: RatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center space-x-1">
      {/* Creating an Array with n elements to map */}
      {[...Array(fullStars)].map((itm, index) => (
        <Star key={index} color="#eab308" fill="#eab308" size="16" />
      ))}
      {hasHalfStar && <StarHalf color="#eab308" fill="#eab308" size="16" />}
    </div>
  );
};

export default RatingStar;
