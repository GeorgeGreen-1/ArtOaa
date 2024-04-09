import { useState, useEffect } from "react";

const useTimeAgo = (timestamp: string): string => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date();
      const apiTime = new Date(timestamp);
      const timeDifference = currentTime.getTime() - apiTime.getTime();
      const minutes = Math.floor(timeDifference / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        setTimeAgo(`${days} day${days > 1 ? "s" : ""} ago`);
      } else if (hours > 0) {
        setTimeAgo(`${hours} hour${hours > 1 ? "s" : ""} ago`);
      } else if (minutes > 0) {
        setTimeAgo(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
      } else {
        setTimeAgo("Just now");
      }
    };

    calculateTimeAgo();

    const interval = setInterval(() => {
      calculateTimeAgo();
    }, 60000); 

    return () => clearInterval(interval);
  }, [timestamp]);

  return timeAgo;
};

export default useTimeAgo;