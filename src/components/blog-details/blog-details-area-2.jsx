import React from 'react';
import Image from 'next/image';
// internal
import shape_line from '@assets/img/blog/details/shape/line.png';
import shape_line_2 from '@assets/img/blog/details/shape/quote.png';
import blog_details_big_img from '@assets/img/blog/details/blog-big-1.jpg';
import blog_details_sm_img from '@assets/img/blog/details/blog-details-sm-1.jpg';
import blogData from '@/data/blog-data';
import GridItem from '../blog/blog-grid/grid-item';
import BlogDetailsComments from './blog-details-comments';
import BlogPostCommentForm from '../forms/blog-post-comment-form';
import BlogDetailsAuthor from './blog-details-author';
import PostboxDetailsNav from './postbox-details-nav';
import PostboxDetailsTop from './postbox-details-top';
import social_data from '@/data/social-data';

// related_blogs
const related_blogs = blogData.filter(b => b.blog === 'blog-grid').slice(0, 3)

const BlogDetailsAreaTwo = ({blog}) => {
  return (
    <>
      <section className="tp-postbox-details-area pb-120 pt-95">
        <div className="container">
          <div className="row">
            <div className="col-xl-9">
              <PostboxDetailsTop blog={blog} />
            </div>
            <div className="col-xl-12">
              <div className="tp-postbox-details-thumb">
                <Image src={blog_details_big_img} alt="blog-big-img" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-2">
              <div className="tp-postbox-details-share-2">
                <span>Share Now</span>
                <ul>
                  {social_data.map(s => (
                  <li key={s.id}>
                    <a href={s.link} target="_blank" className='me-1'>
                      <i className={s.icon}></i>
                    </a>
                  </li>
                  )) }
                </ul>
              </div>
            </div>
           
          </div>
        </div>
        <div className="tp-postbox-related-area pt-115 pb-90 mb-110" style={{backgroundColor:'#F4F7F9'}}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-postbox-related">
                  <h3 className="tp-postbox-related-title">Related Articles</h3>

                  <div className="row">
                    {related_blogs.map((blog) => (
                      <div className="col-lg-4 col-md-6" key={blog.id}>
                        <GridItem blog={blog} style_2={true} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="tp-postbox-details-comment-wrapper">
                <h3 className="tp-postbox-details-comment-title">Comments (2)</h3>
               
                <BlogDetailsComments />
               
              </div>

              <div className="tp-postbox-details-form">
                <h3 className="tp-postbox-details-form-title">Leave a Reply</h3>
                <p>Your email address will not be published. Required fields are marked *</p>

             
                <BlogPostCommentForm />
             
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsAreaTwo;