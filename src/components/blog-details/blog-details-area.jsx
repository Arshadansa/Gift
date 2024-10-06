import React from 'react';
import Image from 'next/image';
// internal
import BlogSidebar from '../blog/blog-postox/blog-sidebar';
import BlogPostCommentForm from '../forms/blog-post-comment-form';
import BlogDetailsAuthor from './blog-details-author';
import BlogDetailsComments from './blog-details-comments';
import PostboxDetailsNav from './postbox-details-nav';
import PostboxDetailsTop from './postbox-details-top';
import shape_line from '@assets/img/blog/details/shape/line.png';
import shape_line_2 from '@assets/img/blog/details/shape/quote.png';
import social_data from '@/data/social-data';
import comment_data from '@/data/blog-comment-data';

const BlogDetailsArea = ({ blog }) => {
 
  
  return (
    <section className="tp-postbox-details-area pb-120 pt-95">
      <div className="container">
        <div className="row">
          <div className="col-xl-9">
            {/* PostboxDetailsTop */}
            <PostboxDetailsTop blog={blog} />
            {/* PostboxDetailsTop */}
          </div>
          <div className="col-xl-12">
            <div style={{ height: '300px', overflow: 'hidden' }}className="tp-postbox-details-thumb">
              <Image
                src={`${blog.image_url}`} // Added leading slash
                alt="blog-big-img"
                layout="responsive"
                width={200}
                height={400}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="tp-postbox-details-main-wrapper">
              <div className="tp-postbox-details-content">
                <p className="tp-dropcap">{blog.content.split('\r\n')[0]}</p>
                <p>{blog.content.split('\r\n').slice(1).join(' ')}</p>

                <h4 className="tp-postbox-details-heading">{blog.title}</h4>

                <div className="tp-postbox-details-desc-thumb text-center">
                  <Image
                    src={`${blog.image_url}`} // Added leading slash
                    alt="details-sm-img"
                    layout="responsive"
                    width={400}
                    height={200}
                  />
                  {/* <span className="tp-postbox-details-desc-thumb-caption">Gucci&lsquo;s Women&lsquo;s Cruise Collection 2023 Lookbook Has Arrived</span> */}
                </div>
                
                <div style={{backgroundColor:"#990100"}} className="tp-postbox-details-quote">
                  <blockquote style={{backgroundColor:"#990100"}}>
                    <div  className="tp-postbox-details-quote-shape">
                      <Image className="tp-postbox-details-quote-shape-1" src={shape_line} alt="shape" />
                      <Image className="tp-postbox-details-quote-shape-2" src={shape_line_2} alt="shape" />
                    </div>
                    <p>There is a way out of every box, a solution to every puzzle; it's just a matter of finding it.</p>
                    <cite>{blog.author}</cite>
                  </blockquote>
                </div>

                {/* <h4 className="tp-postbox-details-heading">Exploring the English Countryside</h4>
                <p>Lorem ligula eget dolor. Aenean massa. Cum sociis que penatibus et magnis dis parturient montes lorem, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque euro, pretium quis, sem. Nulla onsequat massa quis enim.</p> */}

                {/* <div className="tp-postbox-details-list">
                  <ul>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>At vero eos et accusamus et iusto odio.</li>
                    <li>Excepteur sint occaecat cupidatat non proident.</li>
                  </ul>
                </div> */}
                {/* <p>Rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer cidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae lorem.</p> */}

                {/* <div className="tp-postbox-details-share-wrapper">
                  <div className="row">
                    <div className="col-xl-8 col-lg-6">
                      <div className="tp-postbox-details-tags tagcloud">
                        <span>Tags:</span>
                        <a href="#">Lifestyle</a>
                        <a href="#">Awesome</a>
                        <a href="#">Winter</a>
                        <a href="#">Sunglasses</a>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                      <div className="tp-postbox-details-share text-md-end">
                        <span>Share:</span>
                        {social_data.map((s) => (
                          <a href={s.link} className="me-1" target="_blank" key={s.id}>
                            <i className={s.icon}></i>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* PostboxDetailsNav */}
                {/* <PostboxDetailsNav /> */}
                {/* PostboxDetailsNav */}

                {/* author details start */}
                {/* <BlogDetailsAuthor /> */}
                {/* author details end */}

                {/* <div className="tp-postbox-details-comment-wrapper">
                  <h3 className="tp-postbox-details-comment-title">Comments ({comment_data.length})</h3>
                 
                </div> */}

                {/* <div className="tp-postbox-details-form">
                  <h3 className="tp-postbox-details-form-title">Leave a Reply</h3>
                  <p>Your email address will not be published. Required fields are marked *</p>

              
                  <BlogPostCommentForm />
                
                </div> */}
              </div>
            </div>
          </div>
      
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsArea;
