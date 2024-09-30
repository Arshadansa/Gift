import { useEffect, useState } from "react";
import { useFetchBlogsQuery } from "@/redux/features/auth/authApi"; // Adjust the path as necessary
import BlogSidebar from "./blog-sidebar";
import Pagination from "@/ui/Pagination";
import BlogItem from "./blog-item";
import ErrorMsg from "@/components/common/error-msg";

const BlogPostboxArea = () => {
  const [currPage, setCurrPage] = useState(1);
  const countOfPage = 4; // Number of items per page
  const { data: blogData = {}, isLoading, isError } = useFetchBlogsQuery(currPage); // Fetching blog data

  // Handle loading and error states
  let content = null;
  // if (isLoading){ content = <ErrorMsg msg="Loging" />};
  if (isError){ content = <ErrorMsg msg="Error fetching blogs" />};

  const { data: blogs = [] } = blogData; // Extracting the blogs data

  // Function to paginate data
  const paginatedData = (items, startPage, pageCount) => {
    return items.slice(startPage, startPage + pageCount);
  };

  return (
    <section className="tp-postbox-area pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="tp-postbox-wrapper pr-50">
              {paginatedData(blogs, (currPage - 1) * countOfPage, countOfPage).map((item) => (
                <BlogItem key={item.id} item={item} />
              ))}
              <div className="tp-blog-pagination mt-50">
                <div className="tp-pagination">
                  <Pagination
                    items={blogs} // Pass the full list of blogs for pagination
                    countOfPage={countOfPage} // Items per page
                    paginatedData={paginatedData} // Function to paginate data
                    currPage={currPage} // Current page state
                    setCurrPage={setCurrPage} // Function to set current page
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostboxArea;
