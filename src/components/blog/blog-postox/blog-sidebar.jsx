import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "@/svg";

// Function to format date safely
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date"; // Return a fallback string if the date is invalid
  }
  return date.toLocaleDateString(); // Format the date as needed
};

const BlogSidebar = ({ latestBlog }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="tp-sidebar-wrapper tp-sidebar-ml--24">
      
      <div className="tp-sidebar-widget mb-35">
        <h3 className="tp-sidebar-widget-title">Latest Post</h3>
        <div className="tp-sidebar-widget-content">
          <div className="tp-sidebar-blog-item-wrapper">
            {latestBlog && latestBlog.length > 0 ? (
              latestBlog.map((blog) => (
                <div key={blog.id} className="tp-sidebar-blog-item d-flex align-items-center">
                  <div
                    className="tp-sidebar-blog-thumb"
                    style={{
                      height: "50px",
                      width: "100px",
                      marginRight: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <Link href={`/blog-details/${blog.id}`}>
                      <Image
                        className="mr-10"
                        width={100}
                        height={50}
                        src={blog.image_url}
                        alt="Latest blog img"
                        layout="responsive"
                      />
                    </Link>
                  </div>
                  <div className="tp-sidebar-blog-content">
                    <div className="tp-sidebar-blog-meta">
                      <span style={{ color: "black" }}>{formatDate(blog.created_at)}</span>
                    </div>
                    <h3 className="tp-sidebar-blog-title">
                      <Link style={{ color: "#000000", transition: "color 0.3s ease" }} // Initial color black with smooth transition
                onMouseEnter={(e) => {
                  e.target.style.color = "#990100"; // Change color to #990100 on hover
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#000000"; // Revert back to initial color
                }} href={`/blog-details/${blog.id}`}>
                        {blog.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <p>No latest blog available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
