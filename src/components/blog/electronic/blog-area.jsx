import React, { useState } from "react";
import { useFetchBlogsQuery } from "@/redux/features/auth/authApi"; // Ensure this path is correct
import Link from "next/link"; // Adjust based on your routing
import BlogItem from "./blog-item";

import { ArrowRightLong } from "@/svg";
import { ShapeLine } from "@/svg";

const BlogArea = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: blogData = {},
    isLoading,
    isError,
  } = useFetchBlogsQuery(currentPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching blogs</div>;

  const { data: blogs = [], total_blogs } = blogData;

  return (
    <section className="tp-blog-area pt-50 pb-75">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-4 col-md-6">
            <div className="tp-section-title-wrapper mb-50">
              <h3 className="tp-section-title">
                Latest news & articles
                <ShapeLine />
              </h3>
            </div>
          </div>
          <div className="col-xl-8 col-md-6">
            <div className="tp-blog-more-wrapper d-flex justify-content-md-end">
              <div className="tp-blog-more mb-50 text-md-end">
                <Link
                  href="/blog"
                  className="cursor-pointer"
                  style={{
                    backgroundColor: "#000000", // Initial background color (black)
                    color: "#FFFFFF", // Initial text color (white)
                    padding: "10px 15px", // Optional: add some padding for better visibility
                    display: "inline-flex", // Optional: align text and icon horizontally
                    alignItems: "center",
                    transition: "background-color 0.3s, color 0.3s", // Smooth transitions
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#990100"; // Change background to #990100 on hover
                    e.target.style.color = "#FFFFFF"; // Ensure text remains white on hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#000000"; // Revert background to black
                    e.target.style.color = "#FFFFFF"; // Revert text color to white
                  }}
                >
                 View All Blog
                 <ArrowRightLong style={{ marginLeft: "10px" }} />
                </Link>

                <span className="tp-blog-more-border"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog grid layout */}
        <div className="row">
          {blogs.slice(0, 3).map((blog) => (
            <div key={blog.id} className="col-md-4">
              <BlogItem blog={blog} />
            </div>
          ))}
        </div>
        {/* 
        <div className="row">
          <div className="col-md-12 text-center">
            <button 
              className="tp-btn tp-btn-blue" 
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage * 3 >= total_blogs}
            >
              Load More
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default BlogArea;
