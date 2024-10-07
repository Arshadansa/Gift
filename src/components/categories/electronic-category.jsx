import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// internal
import ErrorMsg from "../common/error-msg";
import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";
import HomeCateLoader from "../loader/home/home-cate-loader";

const ElectronicCategory = () => {
  const { data: categories, isLoading, isError } = useGetShowCategoryQuery();
  const router = useRouter();

  // Handle category route

  const handleCategoryRoute = (id) => {
    router.push(`/shop?category=${id}`);
  };

  // Decide what to render
  let content = null;

  if (isLoading) {
    content = <HomeCateLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.length > 0) {
    content = categories.map((item) => (
      <div className="col " key={item.id}>
        <div className="tp-product-category-item text-center mb-40">
          <div
            style={{
              backgroundColor: "#990100",
              paddingTop: "5vw", // Responsive padding using vw
              paddingBottom: "5vw", // Responsive padding using vw
              borderRadius: "50%", // Change to 50% to ensure a circular design
            }}
            className="border p-5 sm:p-10 fix" // Add responsive padding
          >
            <a
              className="cursor-pointer"
              onClick={() => handleCategoryRoute(item.id)}
            >
              <Image
                style={{ objectFit: "contain" }} // Ensure image fits within container
                src={item.image}
                alt={item.name}
                className="cover"
                width={120} // Make the image smaller for responsiveness
                height={120} // Adjust height accordingly
                sizes="(max-width: 768px) 50vw, 100px" // Responsive image sizes
              />
            </a>
          </div>

          <div className="tp-product-category-content">
            <h3 style={{ fontSize: "14px" }}>
              <a
                className="cursor-pointer"
                onClick={() => handleCategoryRoute(item.name)}
                style={{
                  fontSize: "14px",
                  transition: "color 0.3s",
                  textTransform: "uppercase",
                }} // Transition for smooth hover effect
                onMouseEnter={(e) => (e.target.style.color = "#990100")}
                onMouseLeave={(e) => (e.target.style.color = "")} // Reverts to original color on mouse leave
              >
                {item.name}
              </a>
            </h3>

            {/* Assuming you have a 'products' property in the category data */}
            <p>{item.products_count} Product</p>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <section className="tp-product-category pt-60 pb-15">
      <div className="container">
        <div className="row row-cols-xl-5 row-cols-lg-5 row-cols-md-4">
          {content}
        </div>
      </div>
    </section>
  );
};

export default ElectronicCategory;
