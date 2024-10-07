import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightLong } from "@/svg";

const BlogItem = ({ blog }) => {
  const formattedDate = new Date(blog.created_at).toLocaleDateString();
  const [imgSrc, setImgSrc] = useState(blog.image_url); // State to handle image error

  const handleError = () => {
    setImgSrc("/fallback-image.png"); // Set to fallback image on error
  };

  return (
    <div
      style={{
        maxWidth: "400px", // Set a max width
        height: "400", // Let the height adjust automatically for responsiveness
      }}
      className="tp-blog-item mb-5 sm:mb-8 md:mb-12 lg:mb-16"
    >
      {/* Blog Thumbnail */}
      <div
        className="tp-blog-thumb p-relative fix w-full h-auto overflow-hidden"
        style={{ maxHeight: "250px" }} // Max height for larger screens
      >
        <Link href={`/blog-details/${blog.id}`}>
          <Image
            src={imgSrc} // Use the state for the image
            alt={blog.title}
            layout="responsive"
            width={600} // Fixed aspect ratio
            height={400}
            objectFit="cover" // Ensure image fits the space without stretching
            onError={handleError} // Handle image error
            className="w-full" // Make image take full width of container
          />
        </Link>
        <div
          className="tp-blog-meta tp-blog-meta-date"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "#000",
            color: "#fff",
            padding: "5px",
          }}
        >
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Blog Content */}
      <div className="tp-blog-content p-4">
        {/* Title with fixed height and ellipsis for overflow */}
        <h3
          className="tp-blog-title"
          style={{
            height: "45px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Link style={{ color: "black" }} href={`/blog-details/${blog.id}`}>
            {blog.title}
          </Link>
        </h3>

        {/* Blog Author */}
        <div
          style={{
            marginTop: "0px",
            marginBottom: "10px",
            fontSize: "14px",
            color: "#555",
          }}
          className="tp-blog-author"
        >
          <span>By: {blog.author}</span>
        </div>

        {/* Blog Button with hover effect */}
        <div className="tp-blog-btn">
          <Link
            href={`/blog-details/${blog.id}`}
            style={{
              backgroundColor: "#990100", // Initial background color
              color: "#FFFFFF", // Initial text color
              padding: "10px 20px", // Add some padding for visibility
              display: "inline-flex", // Align text and icon horizontally
              alignItems: "center",
              transition: "background-color 0.3s, color 0.3s", // Smooth transitions
              cursor: "pointer", // Add cursor pointer on hover
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#000000"; // Change background on hover
              e.target.style.color = "#FFFFFF"; // Ensure text remains white on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#990100"; // Revert background on leave
              e.target.style.color = "#FFFFFF"; // Revert text color
            }}
          >
            Read More
            <ArrowRightLong style={{ marginLeft: "8px" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
