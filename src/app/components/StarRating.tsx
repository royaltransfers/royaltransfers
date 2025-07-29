import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex gap-1 text-yellow-400 text-md">
      {Array(fullStars)
        .fill(null)
        .map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}

      {hasHalfStar && <FaStarHalfAlt key="half" />}

      {Array(emptyStars)
        .fill(null)
        .map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
    </div>
  );
};
