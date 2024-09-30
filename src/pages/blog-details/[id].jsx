import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter to access query parameters
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import BlogDetailsArea from "@/components/blog-details/blog-details-area";
import { useFetchBlogsQuery } from "@/redux/features/auth/authApi"; // Import your hook

const BlogDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currPage, setCurrPage] = useState(1);
  const countOfPage = 4; // Number of items per page

  // Fetch blog data
  const {
    data: blogData = {},
    isLoading,
    isError,
  } = useFetchBlogsQuery(currPage); // Fetching blog data based on current page

  // Handle loading and error states
  if (isLoading)
    return (
      <Wrapper>
        <HeaderTwo style_2={true} />
        <Footer primary_style={true} />
      </Wrapper>
    );
  if (isError)
    return (
      <Wrapper>
        <HeaderTwo style_2={true} />
        <div className="container mx-auto px-4 py-8">
        <div className="mt-20 mb-20">Error fetching blogs</div>
      </div>
        <Footer primary_style={true} />
      </Wrapper>
    );

  const { data: blogs = [] } = blogData; // Extracting the blogs data

  // Find the specific blog item using the ID
  const blogItem = blogs.find((blog) => blog.id === Number(id));

  // Check if the blog item exists
  if (!blogItem) {
    return (
      <Wrapper>
        <HeaderTwo style_2={true} />
        <div>Blog not found!</div>;
        <Footer primary_style={true} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle={blogItem.title || "Blog Details"} />
      <HeaderTwo style_2={true} />
      <BlogDetailsArea blog={blogItem} />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default BlogDetailsPage;
