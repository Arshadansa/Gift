import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightLong } from "@/svg";

const BlogItem = ({ blog }) => {
  const formattedDate = new Date(blog.created_at).toLocaleDateString();

  const handleError = () => {
    setImgSrc("/fallback-image.png"); // Set to fallback image on error
  };

  return (
    <div className="tp-blog-item  mb-30">
      <div className="tp-blog-thumb p-relative fix">
        <Link href={`/blog-details/${blog.id}`}>
          <Image
            src={blog.image_url} // Use the state for the image
            alt={blog.title}
            layout="responsive"
            width={600}
            height={400}
            objectFit="cover"
            onError={handleError} // Handle image error
          />
        </Link>
        <div className="tp-blog-meta tp-blog-meta-date">
          <span>{formattedDate}</span>
        </div>
      </div>
      <div className="tp-blog-content">
        <h3 className="tp-blog-title">
          <Link href={`/blog-details/${blog.id}`}>{blog.title}</Link>
        </h3>

        <p>{blog.content}</p>

        <div className="tp-blog-author">
          <span>By: {blog.author}</span>
        </div>

        <div className="tp-blog-btn">
          <Link
            href={`/blog-details/${blog.id}`}
            style={{
              backgroundColor: "#990100", // Initial background color (black)
              color: "#FFFFFF", // Initial text color (white)
              padding: "10px 15px", // Optional: add some padding for better visibility
              display: "inline-flex", // Optional: align text and icon horizontally
              alignItems: "center",
              transition: "background-color 0.3s, color 0.3s", // Smooth transitions
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#000000"; // Change background to #990100 on hover
              e.target.style.color = "#FFFFFF"; // Ensure text remains white on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#990100"; // Revert background to black
              e.target.style.color = "#FFFFFF"; // Revert text color to white
            }}
          >
            Read More
            <ArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
