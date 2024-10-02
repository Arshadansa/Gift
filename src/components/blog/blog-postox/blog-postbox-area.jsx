import { useEffect, useState } from "react";
import { useFetchBlogsQuery } from "@/redux/features/auth/authApi"; // Adjust the path as necessary
import BlogSidebar from "./blog-sidebar";
import Pagination from "@/ui/Pagination";
import BlogItem from "./blog-item";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";

const BlogPostboxArea = () => {
  const [currPage, setCurrPage] = useState(1);
  const countOfPage = 4; // Number of items per page
  const { data: blogData = {}, isLoading, isError } = useFetchBlogsQuery(currPage); // Fetching blog data

  // Handle loading and error states
  let content = null;
  if (isLoading) {
    content = <Loader msg="Loading..." />;
  }
  if (isError) {
    content = <ErrorMsg msg="Error fetching blogs" />;
  }

  const { data: blogs = [] } = blogData; // Extracting the blogs data

  // Function to paginate data
  const paginatedData = (items, startPage, pageCount) => {
    return items.slice(startPage, startPage + pageCount);
  };

  // Determine the latest blog
  const getLatestBlog = (blogs) => {
    if (!blogs.length) return null; // Return null if no blogs
    return blogs.reduce((latest, blog) => {
      const blogDate = new Date(blog.date);
      return blogDate > latest.date ? blog : latest;
    }, blogs[0]); // Initial value as the first blog
  };

  const latestBlog = getLatestBlog(blogs); // Get the latest blog

  
  return (
    <section className="tp-postbox-area pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="tp-postbox-wrapper pr-50">
              {content}
              {paginatedData(blogs, (currPage - 1) * countOfPage, countOfPage).map((item) => (
                <BlogItem key={item.id} item={item} />
              ))}
              <div className="tp-blog-pagination mt-50">
                <div className="tp-pagination">
                  <Pagination
                    items={blogs}
                    countOfPage={countOfPage}
                    paginatedData={paginatedData}
                    currPage={currPage}
                    setCurrPage={setCurrPage}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <BlogSidebar latestBlog={latestBlog} /> {/* Pass latest blog as prop */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostboxArea;
