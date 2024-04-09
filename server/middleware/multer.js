import path from "path";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "artoaImages", // Optional, specify a folder name in Cloudinary
    format: async (req, file) => {
      // Extract the file extension from the originalname
      const fileExt = file.originalname.split(".").pop().toLowerCase();

      // Map common image formats to Cloudinary-supported formats
      const formatMapping = {
        jpg: "jpg",
        jpeg: "jpg",
        png: "png",
        gif: "gif",
        svg: "svg",
        // Add more formats as needed
      };

      // Use the mapped format or default to 'png'
      return formatMapping[fileExt] || "png";
    },
    // public_id: (req, file) => `user_${req.user._id}_timestamp_${Date.now()}`,
    public_id: (req, file) => generatePublicId(req),
  },
});



const generatePublicId = (req) => {
  // Generate a unique public ID based on user ID and timestamp
  const userId = req.user ? req.user._id : "guest"; // if user is not registered, use 'guest' as user ID
  return `user_${userId}_timestamp_${Date.now()}`;
};

const upload = multer({
  storage: storage,
});

export default upload;
