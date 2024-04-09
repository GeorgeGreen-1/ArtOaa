import { useState } from "react";
import { IconRatingStar, IconRatingStarEmpty } from "src/components/icons";

export const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleMouseOver = (index: number) => {
    if (rating === 0) {
      setHover(index);
    }
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const handleClick = (index: number) => {
    if (rating === 0) {
      setRating(index);
    }
  };

  return (
    <div className="flex h-full">
      {[...Array(5)].map((_, index) => {
        const starRating = index + 1;
        return (
          <div
            key={index}
            className="flex"
            onMouseOver={() => handleMouseOver(starRating)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starRating)}
          >
            {starRating <= (hover || rating) ? (
              <IconRatingStar />
            ) : (
              <IconRatingStarEmpty />
            )}
          </div>
        );
      })}
    </div>
  );
};
