import { Star, StarHalf } from 'lucide-react';

interface StarRenderProps {
  rating?: number;
  maxStars?: number;
  size?: number;
  className?: string;
  fillColor?: string;
  emptyColor?: string;
}

export const StarRender = ({ 
  rating = 0, 
  maxStars = 5, 
  size = 24, 
  className = "",
  fillColor = "text-yellow-400",
  emptyColor = "text-gray-500"
}: StarRenderProps) => {
  const normalizedRating = Math.max(0, Math.min(rating, maxStars));
  
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  
  const renderStars = () => {
    const stars = [];
    
    // Étoiles pleines
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={size}
          className={`${fillColor} fill-current`}
          data-testid="star-full"
        />
      );
    }
    
    // Demi-étoile si nécessaire
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          size={size}
          className={`${fillColor} fill-current`}
          data-testid="star-half"
        />
      );
    }
    
    // Étoiles vides
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          size={size}
          className={emptyColor}
          data-testid="star-empty"
        />
      );
    }
    
    return stars;
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {renderStars()}
      </div>
    </div>
  );
};