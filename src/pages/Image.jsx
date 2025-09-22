import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

const Image = ({ className = "w-32 h-32", alt = "Profile" }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    content-length
115
content-type
application/json

    fetchImage();
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, []);

  if (!imageUrl) {
    return (
      <div
        className={`${className} bg-gray-100 rounded-full flex items-center justify-center`}
      >
        <span>No Image</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={`${className} object-cover rounded-full`}
    />
  );
};

export default Image;
