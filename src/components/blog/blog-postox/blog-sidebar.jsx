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
  // State to manage the search input
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Check if latestBlog is a single object
  return (
    <div className="tp-sidebar-wrapper tp-sidebar-ml--24">
      <div className="tp-sidebar-widget mb-35">
        <div className="tp-sidebar-search">
          {/* <form action="#">
            <div className="tp-sidebar-search-input">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button type="submit">
                <Search />
              </button>
            </div>
          </form> */}
        </div>
      </div>
      <div className="tp-sidebar-widget mb-35">
        <h3 className="tp-sidebar-widget-title">Latest Post</h3>
        <div className="tp-sidebar-widget-content">
          <div className="tp-sidebar-blog-item-wrapper">
            {latestBlog ? (
              <div className="tp-sidebar-blog-item d-flex align-items-center">
                <div
                  className="tp-sidebar-blog-thumb"
                  style={{ height: "50px", width: "100px", marginRight: "10px", overflow: "hidden" }}
                >
                  <Link href={`/blog-details/${latestBlog.id}`}>
                    <Image
                      className="mr-10"
                      width={50}
                      height={50}
                      src={
                        latestBlog.image_url.startsWith("http") ||
                        latestBlog.image_url.startsWith("/")
                          ? latestBlog.image_url
                          : `/${latestBlog.image_url}`
                      }
                      alt="Latest blog img"
                      layout="responsive"
                    />
                  </Link>
                </div>
                <div className="tp-sidebar-blog-content">
                  <div className="tp-sidebar-blog-meta">
                    <span>{formatDate(latestBlog.created_at)}</span>
                  </div>
                  <h3 className="tp-sidebar-blog-title">
                    <Link href={`/blog-details/${latestBlog.id}`}>
                      {latestBlog.title}
                    </Link>
                  </h3>
                </div>
              </div>
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
