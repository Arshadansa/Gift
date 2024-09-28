import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// internal
import user from '@assets/img/users/user-11.jpg';
import signature from '@assets/img/blog/signature/signature.png';
import { Search } from '@/svg';
import blogData from '@/data/blog-data';

// latest post
const latest_post = blogData.slice(0,3)

const BlogSidebar = () => {
  return (
    <>
      <div className="tp-sidebar-wrapper tp-sidebar-ml--24">
        <div className="tp-sidebar-widget mb-35">
          <div className="tp-sidebar-search">
            <form action="#">
              <div className="tp-sidebar-search-input">
                <input type="text" placeholder="Search..." />
                <button type="submit">
                  <Search/>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* about  */}
       
        {/* <!-- about end --> */}

        {/* <!-- latest post start --> */}
        <div className="tp-sidebar-widget mb-35">
          <h3 className="tp-sidebar-widget-title">Latest Posts</h3>
          <div className="tp-sidebar-widget-content">
            <div className="tp-sidebar-blog-item-wrapper">
              {latest_post.map(b => (
              <div key={b.id} className="tp-sidebar-blog-item d-flex align-items-center">
                <div className="tp-sidebar-blog-thumb">
                  <Link href={`/blog-details/${b.id}`}>
                    <Image src={b.img} alt="blog img" />
                  </Link>
                </div>
                <div className="tp-sidebar-blog-content">
                  <div className="tp-sidebar-blog-meta">
                    <span>{b.date}</span>
                  </div>
                  <h3 className="tp-sidebar-blog-title">
                    <Link href={`/blog-details/${b.id}`}>{b.title}</Link>
                  </h3>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
        {/* <!-- latest post end --> */}

        {/* <!-- categories start --> */}
       
        {/* <!-- categories end --> */}

        {/* <!-- tag cloud start --> */}
        
        {/* <!-- tag cloud end --> */}

      </div>
    </>
  );
};

export default BlogSidebar;