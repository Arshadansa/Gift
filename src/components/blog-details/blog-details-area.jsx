import React from "react";
import Image from "next/image";
// internal
import BlogSidebar from "../blog/blog-postox/blog-sidebar";
import BlogPostCommentForm from "../forms/blog-post-comment-form";
import BlogDetailsAuthor from "./blog-details-author";
import BlogDetailsComments from "./blog-details-comments";
import PostboxDetailsNav from "./postbox-details-nav";
import PostboxDetailsTop from "./postbox-details-top";
import shape_line from "@assets/img/blog/details/shape/line.png";
import shape_line_2 from "@assets/img/blog/details/shape/quote.png";
import social_data from "@/data/social-data";
import comment_data from "@/data/blog-comment-data";

const BlogDetailsArea = ({ blog }) => {
  return (
    <section className="tp-postbox-details-area pb-120 pt-95">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            {/* PostboxDetailsTop */}
            <PostboxDetailsTop blog={blog} />
            {/* PostboxDetailsTop */}
          </div>
          <div className="col-xl-12">
            <div
              style={{ height: "350px", overflow: "hidden" }}
              className="tp-postbox-details-thumb"
            >
              <Image
                src={`${blog.image_url}`} // Use blog's image URL
                alt="blog-big-img"
                layout="responsive"
                width={200}
                height={400}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 mt-40 col-lg-12">
            <div className="tp-postbox-details-main-wrapper">
              <div className="tp-postbox-details-content">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />

                <h4 className="tp-postbox-details-heading">{blog.title}</h4>

                <div className="tp-postbox-details-desc-thumb text-center">
                  <Image
                    src={`${blog.image_url}`} // Added leading slash
                    alt="details-sm-img"
                    layout="responsive"
                    width={400}
                    height={200}
                  />
                </div>

                <div
                  style={{ backgroundColor: "#990100" }}
                  className="tp-postbox-details-quote"
                >
                  <blockquote style={{ backgroundColor: "#990100" }}>
                    <div className="tp-postbox-details-quote-shape">
                      <Image
                        className="tp-postbox-details-quote-shape-1"
                        src={shape_line}
                        alt="shape"
                      />
                      <Image
                        className="tp-postbox-details-quote-shape-2"
                        src={shape_line_2}
                        alt="shape"
                      />
                    </div>
                    <p>
                      There is a way out of every box, a solution to every
                      puzzle; it's just a matter of finding it.
                    </p>
                    <cite>{blog.author}</cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsArea;
